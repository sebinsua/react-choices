import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import cx from 'classnames-es'
import Choices from '..'

import './styles/basic.css'
import './styles/slider-like.css'

const choices = storiesOf('Choices', module)

choices.add('with default template', () => (
  <div className="choices-container">
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
    id = `speed-choice-${value}`,
    inputClassName,
    onMouseOver,
    onClick
  }) {
    return (
      <div
        id={id}
        onMouseOver={onMouseOver}
        onClick={onClick}
        className={cx('speed-choice', {
          'speed-choice--not-settable': notSettable,
          'speed-choice--focused': focused,
          'speed-choice--hovered': hovered,
          'speed-choice--selected': selected
        })}
        role="radio"
        aria-checked={selected ? 'true' : 'false'}
        aria-labelledby={`speed-choice__label-${value}`}
      >
        <div className="speed-choice__input-container">
          <button
            tabIndex={selected ? 0 : -1}
            className={cx('speed-choice__input', inputClassName)}
          >
            <span
              id={`speed-choice__label-${value}`}
              className="speed-choice__label"
            >
              {label}
            </span>
          </button>
        </div>
      </div>
    )
  }

  function HorizontalBar() {
    return <div className="speed-choices-horizontal-bar" />
  }

  return (
    <div className="choices-container">
      <input type="text" name="thing_1" defaultValue="unrelated" />
      <input type="text" name="thing_2" defaultValue="fields" />
      <Choices
        name="slider_like_speed"
        label="Speed"
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
        {({ name, label, states, selectedValue, setValue, hoverValue }) => (
          <div className="speed-choices-container">
            <div
              className="speed-choices"
              role="radiogroup"
              aria-labelledby={`speed-choices__label-${name}`}
              aria-activedescendant={`speed-choice-${selectedValue}`}
            >
              <div
                id={`speed-choices__label-${name}`}
                className="speed-choices__label"
              >
                {label}
              </div>
              <div className="speed-choices__items">
                {states.map((state, idx) => (
                  <SpeedChoice
                    key={`speed-choice-${idx}`}
                    value={state.value}
                    label={state.label}
                    notSettable={state.notSettable}
                    focused={state.focused}
                    hovered={state.hovered}
                    selected={state.selected}
                    id={`speed-choice-${state.value}`}
                    inputClassName={state.inputClassName}
                    onMouseOver={hoverValue.bind(null, state.value)}
                    onClick={setValue.bind(null, state.value)}
                  />
                ))}
              </div>
            </div>
            <div className="speed-choices__background">
              <HorizontalBar />
            </div>
          </div>
        )}
      </Choices>
    </div>
  )
})
