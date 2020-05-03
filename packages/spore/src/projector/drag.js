//
// Copyright 2020 DxOS, Inc.
//

import * as d3 from 'd3';
import EventEmitter from 'events';

// TODO(burdon): Getter.
const value = v => (typeof v === 'function') ? v() : v;

/**
 * Drag handler for simulation.
 *
 * https://bl.ocks.org/mbostock/2b534b091d80a8de39219dd076b316cd
 * https://bl.ocks.org/mbostock/ad70335eeef6d167bc36fd3c04378048 (simulation)
 * https://observablehq.com/@d3/circle-dragging-i
 *
 * @param {Object|function} simulation
 * @return {{ create: function, on: function, off: function }}
 */
// TODO(burdon): If ForceLayout can have a stable instance, pass in here directly.
export const simulationDragHandler = simulation => {
  const emitter = new EventEmitter();

  const create = container => {
    const state = {
      moved: false
    };

    // TODO(burdon): Configure.
    const parent = () => d3.event.sourceEvent.target
      .closest(`g[id="${d3.event.subject.id}"]`);

    // https://github.com/d3/d3-drag#drag
    // https://observablehq.com/@d3/click-vs-drag
    return d3.drag()

      // Determine coordinates for events.
      // https://github.com/d3/d3-drag#drag_container
      .container(container)

      // Get the datum.
      // https://github.com/d3/d3-drag#drag_subject
      .subject(() => value(simulation).find(d3.event.x, d3.event.y))

    // Event handlers.
    // https://github.com/d3/d3-drag#drag_on
    // https://github.com/d3/d3-drag#drag-events

      .on('start', function () {
        const group = parent();

        if (!d3.event.active) {
          value(simulation).alphaTarget(0.3).restart();
        }

        // Find group and raise.
        d3.select(group).raise();

        d3.event.subject.fx = d3.event.subject.x;
        d3.event.subject.fy = d3.event.subject.y;
        state.moved = false;

        emitter.emit('start', d3.event.subject, group);
      })

      .on('drag', () => {
        const group = parent();

        d3.event.subject.fx = d3.event.x;
        d3.event.subject.fy = d3.event.y;
        state.moved = true;

        emitter.emit('drag', d3.event.subject, group);
      })

      .on('end', () => {
        const group = parent();

        if (!d3.event.active) {
          value(simulation).alphaTarget(0);
        }

        d3.event.subject.fx = null;
        d3.event.subject.fy = null;

        if (!state.moved) {
          emitter.emit('click', d3.event.subject, group);
        } else {
          emitter.emit('end', d3.event.subject, group);
        }
      });
  };

  return {
    create,
    on: emitter.on.bind(emitter),
    off: emitter.off.bind(emitter)
  };
};
