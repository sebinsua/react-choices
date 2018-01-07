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
    <input type="text" name="thing_1" defaultValue="unrelated" />
    <input type="text" name="thing_2" defaultValue="fields" />
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

choices.add('with slider-like template', () => {
  function SpeedChoice({
    value,
    label,
    notSettable = false,
    focused = false,
    hovered = false,
    selected = false,
    inputClassName,
    onMouseOver,
    onClick
  }) {
    return (
      <div
        id={`choice-${value}`}
        onMouseOver={onMouseOver}
        onClick={onClick}
        className={cx('speed-choice', {
          'speed-choice__not-settable': notSettable,
          'speed-choice__focused': focused,
          'speed-choice__hovered': hovered,
          'speed-choice__selected': selected
        })}
      >
        <div className="speed-choice__input-container">
          <button
            tabIndex={selected ? 0 : -1}
            className={cx('speed-choice__input', inputClassName)}
          >
            <span className="speed-choice__label">{label}</span>
          </button>
        </div>
      </div>
    )
  }

  function HorizontalBar() {
    return <div className="speed-choices-horizontal-bar" />
  }

  return (
    <div className="choices__container">
      <input type="text" name="thing_1" defaultValue="unrelated" />
      <input type="text" name="thing_2" defaultValue="fields" />
      <Choices
        name="slider_like_speed"
        availableStates={[
          { value: '<S', label: '', settable: false },
          { value: 'S' },
          { value: 'S<M', label: '', settable: false },
          { value: 'M' },
          { value: 'M<F', label: '', settable: false },
          { value: 'F' },
          { value: '>F', label: '', settable: false }
        ]}
        defaultValue="M"
      >
        {({ states, setValue, hoverValue }) => (
          <div className="speed-choices-container">
            <div className="speed-choices">
              {states.map((state, idx) => (
                <SpeedChoice
                  key={`choice-${idx}`}
                  value={state.value}
                  label={state.label}
                  notSettable={state.notSettable}
                  focused={state.focused}
                  hovered={state.hovered}
                  selected={state.selected}
                  inputClassName={state.inputClassName}
                  onMouseOver={hoverValue.bind(null, state.value)}
                  onClick={setValue.bind(null, state.value)}
                />
              ))}
            </div>
            <div className="speed-choices-background">
              <HorizontalBar />
            </div>
          </div>
        )}
      </Choices>
    </div>
  )
})
