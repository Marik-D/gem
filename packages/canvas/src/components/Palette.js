//
// Copyright 2020 DxOS.org
//

import clsx from 'clsx';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import * as colors from '@material-ui/core/colors';

export const palette = [
  { id: 'style-1', color: 'grey' },
  { id: 'style-2', color: 'blueGrey' },
  { id: 'style-4', color: 'lightGreen' },
  { id: 'style-5', color: 'lightBlue' },
  { id: 'style-6', color: 'indigo' },
  { id: 'style-3', color: 'red' },
];

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    flexShrink: 0,
    height: 32,
    backgroundColor: colors['grey'][100]
  },

  colors: {
    display: 'flex',
    flexDirection: 'row',
  },

  box: {
    display: 'flex',
    width: 16,
    height: 16,
    margin: 7,
    border: '1px solid',
    padding: 1,
  },
  selected: {
    border: '2px solid',
    padding: 0
  }
}));

/**
 * Properties palette.
 */
const Palette = ({ object, onUpdate }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {object && (
        <div className={classes.colors}>
          {palette.map(({ id, color }) => {
            const style = {
              id,
              border: colors[color][300],
              background: colors[color][50]
            };

            return (
              <div
                key={color}
                onClick={() => onUpdate(object.id, { style })}
                className={clsx(classes.box,
                  (object.properties.style && id === object.properties.style.id) ? classes.selected : null)}
                style={{
                  borderColor: style.border,
                  backgroundColor: style.background
                }}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Palette;
