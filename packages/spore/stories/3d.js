//
// Copyright 2020 DxOS
//

import React, { useEffect, useRef, useState } from 'react';
import { ForceGraph3D } from 'react-force-graph';

export default {
  title: '3D'
};

// TODO(burdon): Factor out.
function genRandomTree(N = 300, reverse = false) {
  return {
    nodes: [...Array(N).keys()].map(i => ({ id: i })),
    links: [...Array(N).keys()]
      .filter(id => id)
      .map(id => ({
        [reverse ? 'target' : 'source']: id,
        [reverse ? 'source' : 'target']: Math.round(Math.random() * (id - 1))
      }))
  };
}

/**
 * https://www.npmjs.com/package/react-force-graph
 * @param distance
 */
export const use3D = ({ distance = 1000 }) => {
  const graph = useRef();
  const [data] = useState(() => genRandomTree());

  // Rotation.
  useEffect(() => {
    if (!graph.current.cameraPosition) {
      return;
    }

    graph.current.cameraPosition({ z: distance });

    // camera orbit
    let angle = 0;
    const interval = setInterval(() => {
      graph.current.cameraPosition({
        x: distance * Math.sin(angle),
        z: distance * Math.cos(angle)
      });

      // TODO(burdon): By time.
      angle += Math.PI / 300;

      if (distance > 750) {
        distance -= 1;
      }
    }, 50);

    return () => {
      clearInterval(interval);
    };
  }, []);

  // TODO(burdon): Auto-size.
  // https://github.com/vasturiano/react-force-graph/blob/master/src/forcegraph-proptypes.js

  return (
    <ForceGraph3D
      ref={graph}
      graphData={data}
      enableNodeDrag={false}
      enableNavigationControls={true}
      showNavInfo={false}
      nodeColor={() => '#CCCCCC'}
      nodeRelSize={5}
      nodeLabel={node => String(node.id)}
      linkColor={() => '#AAAAAA'}
      linkWidth={2}
      backgroundColor="#333333"
    />
  );
};
