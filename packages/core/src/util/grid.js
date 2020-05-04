//
// Copyright 2020 DxOS, Inc.
//

import * as d3 from 'd3';
import assert from 'assert';
import { useEffect, useState } from 'react';

/**
 * @param width
 * @param height
 * @returns {boolean}
 */
export const isNull = ({ width, height }) => (width === null || height === null);

/**
 * @param width
 * @param height
 * @returns {{x: number, y: number}}
 */
export const getCenter = ({ width, height }) => ({ x: width / 2, y: height / 2});

/**
 * @returns {{ size, center, scaleX, scaleY, ticks, zoom }}
 */
export const createGrid = ({ width, height, zoom = 1 }) => {
  assert(zoom);

  // https://observablehq.com/@d3/d3-scalelinear
  // https://github.com/d3/d3-scale#scaleLinear
  // https://github.com/d3/d3-scale#quantize_invertExtent

  // NOTE: Nominal user space bounds.
  // TODO(burdon): Keep extent the same and increase size (with scrollbars).
  const extent = 100 / zoom;

  // Ensure sqaure grid.
  const max = Math.max(width, height);

  // Depends on screen size.
  // TODO(burdon): Powers of two.
  const ticks = Math.floor(max / 32);

  const scaleX = d3.scaleLinear()
    .domain([-extent, extent])
    .range([-max / 2, max / 2]);

  // NOTE: Reversed scale (since SVG uses top-left coordinates).
  const scaleY = d3.scaleLinear()
    .domain([extent, -extent])
    .range([-max / 2, max / 2]);

  // Calculate the size between ticks.
  // TODO(burdon): Better way to get this?
  const interval = (scale, ticks) => {
    const values = scale.ticks(ticks);
    return Math.abs(values[0] - values[1]);
  };

  const i = interval(scaleX, ticks);
  const clamp = (value, unit) => Math.round(value / unit) * unit;
  const snapper = (value, scale) => scale(clamp(scale.invert(value), i));

  return {
    center: { x: 0, y: 0 },
    size: { width, height },
    snap: ({ x, y }) => ({ x: snapper(x, scaleX), y: snapper(y, scaleY) }),
    snapUser: ({ x, y }) => ({ x: clamp(x, i), y: clamp(y, i) }),
    project: ({ x, y }) => ({ x: scaleX(x), y: scaleY(y) }),
    scaleX,
    scaleY,
    ticks,
    zoom,
  };
};

export const useGrid = ({ width, height, zoom = 1 }) => {
  const [grid, setGrid] = useState(() => createGrid({ width, height, zoom }));

  useEffect(() => {
    setGrid(createGrid({ width, height, zoom }));
  }, [zoom, width, height]);

  return grid;
};