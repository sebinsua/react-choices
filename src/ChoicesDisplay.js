import React from 'react'
import cx from 'classnames-es'

const ChoicesDisplay = ({
  name,
  label,
  states,
  selectedValue,
  setValue,
  hoverValue,
  previousValue,
  nextValue
}) => (
  <div
    className="choices"
    role="radiogroup"
    aria-labelledby={`choices__label-${name}`}
    aria-activedescendant={`choice-${selectedValue}`}
  >
    <div id={`choices__label-${name}`} className="choices__label">
      {label}
    </div>
    <div className="choices__items">
      <button onClick={previousValue}>{'<'}</button>
      {states.map((state, idx) => (
        <button
          key={`choice-${idx}`}
          id={`choice-${state.value}`}
          tabIndex={state.selected ? 0 : -1}
          className={cx('choice', state.inputClassName, {
            'choice--focused': state.focused,
            'choice--hovered': state.hovered,
            'choice--selected': state.selected
          })}
          onMouseOver={hoverValue.bind(null, state.value)}
          onClick={setValue.bind(null, state.value)}
          role="radio"
          aria-checked={state.selected ? 'true' : 'false'}
        >
          {state.label}
        </button>
      ))}
      <button onClick={nextValue}>{'>'}</button>
    </div>
  </div>
)

export default ChoicesDisplay
