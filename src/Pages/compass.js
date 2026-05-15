/**
 * Compass Component
 * A simple compass component that displays a compass with a rotation arrow
 * and optional labels for direction and degree.
 * 
 * @author Tomas Malio
 * @email tomasmalio@gmail.com
 * 
 */
import React from 'react';
import '../index.css';

// This function converts a degree value to a compass direction
const getDirection = (deg) => {
  const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  const index = Math.round(deg / 45) % 8;
  return directions[index];
};

/**
 * Compass
 *
 * @param {value} number - value to display the orientation of the arrow
 * @param {displayLabel} boolean - display or not the label (degree and orientation)
 * @param {width} number - width of the compass
 * @param {height} number - height of the compass
 * @param {borderColor} string - color of the border of the compass
 * @param {backgroundColor} string - color of the background of the compass
 * @param {labelColor} string - color of the label
 * @param {displayCompassLine} boolean - display or not the vertical and horizontal line
 * @param {displayCompassTick} boolean - display the lines between each direction
 * @returns Compass
 */
const Compass = ({ value = 0, displayLabel = false, width = null, height = null, borderColor = null, backgroundColor = null, labelColor = null, displayCompassLine = true, displayCompassTick = true }) => {
  const direction = getDirection(value);

  return React.createElement(
    'div',
    {
      className: 'compass',
      style: {
        ...(width != null ? { width } : {}),
        ...(height != null ? { height } : {}),
      },
    },
    React.createElement(
      'div',
      {
        className: 'compass__circle',
        style: {
          ...(borderColor != null ? { borderColor } : {}),
          ...(backgroundColor != null ? { backgroundColor } : {}),
        },
      },
      displayCompassLine && React.createElement(
        React.Fragment,
        null,
        React.createElement('div', { className: 'compass__line compass__line--vertical' }),
        React.createElement('div', { className: 'compass__line compass__line--horizontal' })
      ),
      displayCompassTick && React.createElement(
        'div',
        { className: 'compass__ticks' },
        [...Array(12)].map((_, i) =>
          React.createElement(
            'div',
            {
              key: i,
              className: 'compass__tick',
              style: {
                transform: `rotate(${i * 30}deg)`,
              },
            },
            React.createElement('span', null)
          )
        )
      ),
      React.createElement('div', { className: 'compass__pivot' }),    
      React.createElement(
        'div',
        {
          className: 'compass__arrow-wrapper',
          style: {
            transform: `translate(-50%, -50%) rotate(${value}deg)`,
          },
        },
        React.createElement('div', {
          className: 'compass__arrow',
        })
      ),
      displayLabel && React.createElement(
        'div',
        {
          className: 'compass__label',
          style: {
            ...(labelColor != null ? { labelColor } : {}),
          },
        },
        React.createElement('div', { className: 'degree' }, `${Math.round(value)}°`),
        React.createElement('div', { className: 'direction' }, direction)
      ),
      React.createElement(
        'div',
        { className: 'compass__cardinals' },
        React.createElement('span', { className: 'N' }, 'N'),
        React.createElement('span', { className: 'S' }, 'S'),
        React.createElement('span', { className: 'E' }, 'E'),
        React.createElement('span', { className: 'W' }, 'W')
      )
    )
  );
};

export default Compass;