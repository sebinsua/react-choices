import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import cx from 'classnames-es'
import Choices from '..'

import './styles/basic.css'
import './styles/slider-like.css'

const choices = storiesOf('Choices', module)

choices.add('with default template', () => (
  <div className="choices__container">
    <input type="text" name="thing_1" value="unrelated" />
    <input type="text" name="thing_2" value="fields" />
    <Choices
      name="basic_speed"
      availableStates={[
        { value: '<S', settable: false },
        { value: 'S' },
        { value: 'S<M', settable: false },
        { value: 'M' },
        { value: 'M<F', settable: false },
        { value: 'F' },
        { value: '>F', settable: false }
      ]}
      defaultValue="M"
    />
  </div>
))

choices.add('with slider-like template', () => (
  <div className="choices__container">
    <input type="text" name="thing_1" value="unrelated" />
    <input type="text" name="thing_2" value="fields" />
    <Choices
      name="slider_like_speed"
      availableStates={[
        { value: '<S', settable: false },
        { value: 'S' },
        { value: 'S<M', settable: false },
        { value: 'M' },
        { value: 'M<F', settable: false },
        { value: 'F' },
        { value: '>F', settable: false }
      ]}
      defaultValue="M"
    >
      {({
        states,
        defaultValue,
        focusedValue,
        hoveredValue,
        selectedValue,
        setValue,
        hoverValue,
        previousValue,
        nextValue
      }) => (
        <div className="speed-choices-container">
          <div className="speed-choices">
            {states.map((state, idx) => (
              <div
                key={`choice-${idx}`}
                id={`choice-${state.value}`}
                onMouseOver={hoverValue.bind(null, state.value)}
                onClick={setValue.bind(null, state.value)}
                className={cx('speed-choice', {
                  'speed-choice__not-settable': state.settable === false,
                  'speed-choice__focused': state.value === focusedValue,
                  'speed-choice__hovered': state.value === hoveredValue,
                  'speed-choice__selected':
                    state.value === (selectedValue || defaultValue)
                })}
              >
                <div className="speed-choice__input-container">
                  <button
                    tabIndex={state.value === selectedValue ? 0 : -1}
                    className={cx('speed-choice__input', state.inputClassName)}
                  >
                    <span className="speed-choice__label">{state.value}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="speed-choices-background">
            <div className="speed-choices-horizontal-bar" />
          </div>
        </div>
      )}
    </Choices>
  </div>
))
