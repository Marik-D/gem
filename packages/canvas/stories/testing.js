//
// Copyright 2020 Wireline, Inc.
//

import { createObject } from '../src';

export const data = [
  createObject('ellipse', {
    order: 3,
    bounds: { x: -40, y: -10, width: 20, height: 20 }
  }),
  createObject('rect', {
    order: 3,
    bounds: { x: 20, y: -10, width: 20, height: 20 }
  }),
  createObject('path', {
    order: 2,
    bounds: { x: -20, y: 0 },
    points: [{ x: 0, y: 0 }, { x: 40, y: 0}]
  }),
  createObject('path', {
    order: 2,
    bounds: { x: -30, y: 0 },
    points: [{ x: 0, y: -10 }, { x: 0, y: -20 }, { x: 60, y: -20 }, { x: 60, y: -10}]
  }),
  createObject('text', {
    order: 1,
    bounds: { x: -40, y: -5, width: 20, height: 10 },
    text: 'A'
  }),
  createObject('text', {
    order: 1,
    bounds: { x: 20, y: -5, width: 20, height: 10 },
    text: 'B'
  }),
  createObject('text', {
    order: 1,
    bounds: { x: -20, y: 0, width: 40, height: 10 },
    text: 'Canvas'
  }),
];