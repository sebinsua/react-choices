import React from 'react'
import cx from 'classnames-es'

const ChoicesDisplay = ({
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
  <div className="choices">
    <button onClick={previousValue}>{'<'}</button>
    {states.map((state, idx) => (
      <button
        key={`choice-${idx}`}
        id={`choice-${state.value}`}
        tabIndex={state.value === selectedValue ? 0 : -1}
        className={cx('choice', state.inputClassName, {
          choice__focused: state.value === focusedValue,
          choice__hovered: state.value === hoveredValue,
          choice__selected: state.value === (selectedValue || defaultValue)
        })}
        onMouseOver={hoverValue.bind(null, state.value)}
        onClick={setValue.bind(null, state.value)}
      >
        {state.value}
      </button>
    ))}
    <button onClick={nextValue}>{'>'}</button>
  </div>
)

export default ChoicesDisplay
