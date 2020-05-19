//
// Copyright 2020 DxOS
//

import * as d3 from 'd3';
import React, { useEffect, useRef } from 'react';
import useResizeAware from 'react-resize-aware';

import { FullScreen, SVG } from '@dxos/gem-core';

export default {
  title: 'Experimental'
};

/*
<path d="m657.149,463.654 c0,-157.7 -100.247,-280.349 -289.596,-280.349 l-169.85,0 l0,562.049 l168.467,0 c183.773,0 290.979,-128.047 290.979,-281.7 m-657.149,450.177 l0,-899.004 l366.17,0 c290.979,0 492.855,179.261 492.855,448.827 c0,272.262 -201.876,450.177 -491.472,450.177 l-367.553,0Z"/>
<path d="m2154.38,465.007 c0,-168.483 -109.99,-295.179 -281.241,-295.179 c-172.642,0 -282.631,126.696 -282.631,295.179 c0,167.127 109.989,295.173 282.631,295.173 c171.251,0 281.241,-128.046 281.241,-295.173 m-767.144,0 c0,-270.917 204.667,-465.007 485.903,-465.007 c279.846,0 484.501,194.09 484.501,465.007 c0,270.905 -204.655,464.995 -484.501,464.995 c-281.236,0 -485.903,-194.09 -485.903,-464.995"/>
<path d="m2432.86,787.135 l108.595,-149.607 c65.442,66.044 167.078,122.655 295.159,122.655 c109.99,0 161.508,-47.179 161.508,-99.744 c0,-156.349 -534.631,-47.173 -534.631,-385.484 c0,-149.607 133.657,-273.607 352.241,-273.607 c147.579,0 270.103,43.132 361.99,125.351 l-109.984,142.87 c-75.185,-67.394 -175.426,-98.393 -270.103,-98.393 c-83.533,0 -130.872,35.045 -130.872,88.955 c0,141.525 533.236,45.822 533.236,381.438 c0,164.436 -122.518,288.436 -371.733,288.436 c-179.606,0 -307.687,-57.962 -395.406,-142.87"/>
<path d="m1118.97,344.372 l-218.555,-329.546 l437.109,0 l-218.554,329.546Z"/>
<path d="m1118.97,584.283 l-218.555,329.552 l437.109,0 l-218.554,-329.552Z"/>
 */

/**
 * Transformed by hand from SVG file.
 */
const Logo = {
  size: {
    width: 3196.69,
    height: 898.07,
  },

  characters: [
    // D
    [
      ['m', [657.149, 463.654]],
      ['c', [0,-157.7], [-100.247,-280.349], [-289.596,-280.349]],
      ['l', [-169.85, 0]],
      ['l', [0, 562.049]],
      ['l', [168.467, 0]],
      ['c', [183.773, 0], [290.979, -128.047], [290.979,-281.7]],
      ['m', [-657.149, 450.177]],
      ['l', [0, -899.004]],
      ['l', [366.17, 0]],
      ['c', [290.979, 0], [492.855, 179.261], [492.855, 448.827]],
      ['c', [0, 272.262], [-201.876, 450.177], [-491.472, 450.177]],
      ['l', [-367.553, 0]],
      ['z']
    ],
    // O
    [
      ['m', [2154.38, 465.007]],
      ['c', [0, -168.483], [-109.99, -295.179], [-281.241, -295.179]],
      ['c', [-172.642, 0], [-282.631, 126.696], [-282.631, 295.179]],
      ['c', [0, 167.127], [109.989, 295.173], [282.631, 295.173]],
      ['c', [171.251, 0], [281.241, -128.046], [281.241, -295.173]],
      ['m', [-767.144, 0]],
      ['c', [0, -270.917], [204.667, -465.007], [485.903, -465.007]],
      ['c', [279.846, 0], [484.501, 194.09], [484.501, 465.007]],
      ['c', [0, 270.905], [-204.655, 464.995], [-484.501, 464.995]],
      ['c', [-281.236, 0], [-485.903, -194.09], [-485.903, -464.995]],
    ],
    // S
    [
      ['m', [2432.86, 787.135]],
      ['l', [108.595, -149.607]],
      ['c', [65.442, 66.044], [167.078, 122.655], [295.159, 122.655]],
      ['c', [109.99, 0], [161.508, -47.179], [161.508, -99.744]],
      ['c', [0, -156.349], [-534.631, -47.173], [-534.631, -385.484]],
      ['c', [0, -149.607], [133.657, -273.607], [352.241, -273.607]],
      ['c', [147.579, 0], [270.103, 43.132], [361.99, 125.351]],
      ['l', [-109.984, 142.87]],
      ['c', [-75.185, -67.394], [-175.426, -98.393], [-270.103, -98.393]],
      ['c', [-83.533, 0], [-130.872, 35.045], [-130.872, 88.955]],
      ['c', [0, 141.525], [533.236, 45.822], [533.236, 381.438]],
      ['c', [0, 164.436], [-122.518, 288.436], [-371.733, 288.436]],
      ['c', [-179.606, 0], [-307.687, -57.962], [-395.406, -142.87]],
    ],
    // x
    [
      ['m', [1118.97, 344.372]],
      ['l', [-218.555, -329.546]],
      ['l', [437.109, 0]],
      ['l', [-218.554, 329.546]],
      ['z']
    ],
    [
      ['m', [1118.97, 584.283]],
      ['l', [-218.555, 329.552]],
      ['l', [437.109, 0]],
      ['l', [-218.554, -329.552]],
      ['z']
    ],
  ]
};

export const withLogo = () => {
  const [resizeListener, size] = useResizeAware();
  const { width, height } = size;
  const logo = useRef();

  const scale = .2;

  // TODO(burdon): Animate up/down icons.
  useEffect(() => {
    const data = Logo.characters.map(c => c.reduce((result, [type, ...values]) => {
      result.push(`${type} ${values.join(' ')}`);
      return result;
    }, []).join(' '));

    d3.select(logo.current)
      .selectAll('path')
      .data(data)
      .join('path')
      .attr('d', d => d);
  }, [Logo]);

  return (
    <FullScreen>
      {resizeListener}
      <SVG width={width} height={height}>
        <g ref={logo} transform={`translate(${-Logo.size.width / 2 * scale}, -${Logo.size.height / 2 * scale}) scale(${scale})`}>
        </g>
      </SVG>
    </FullScreen>
  );
};
