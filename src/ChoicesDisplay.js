import React from 'react'
import cx from 'classnames-es'

const ChoicesDisplay = ({
  label,
  states,
  setValue,
  hoverValue,
  previousValue,
  nextValue,
  getContainerProps,
  getContainerLabelProps,
  getItemProps,
  getItemInputProps
}) => (
  <div {...getContainerProps()} className="Choices__container">
    <div {...getContainerLabelProps()} className="Choices__label">
      {label}
    </div>
    <div className="Choices__items">
      <button onClick={previousValue}>{'<'}</button>
      {states.map((state, idx) => (
        <button
          key={`Choices__item-${idx}`}
          {...getItemProps(state)}
          {...getItemInputProps(state)}
          className={cx('Choices__item', state.inputClassName, {
            'Choices__item--focused': state.focused,
            'Choices__item--hovered': state.hovered,
            'Choices__item--selected': state.selected
          })}
          onMouseOver={hoverValue.bind(null, state.value)}
          onClick={setValue.bind(null, state.value)}
        >
          {state.label}
        </button>
      ))}
      <button onClick={nextValue}>{'>'}</button>
    </div>
  </div>
)

export default ChoicesDisplay
