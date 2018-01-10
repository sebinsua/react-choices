import React from 'react'
import cx from 'classnames-es'

const ChoicesDisplay = ({
  label,
  states,
  disabled,
  readOnly,
  setValue,
  hoverValue,
  previousValue,
  nextValue,
  getContainerProps,
  getContainerLabelProps,
  getItemProps,
  getItemInputProps
}) => (
  <div
    {...getContainerProps()}
    className={cx('Choices__container', {
      'Choices__container--disabled': disabled,
      'Choices__container--readonly': readOnly
    })}
  >
    <div {...getContainerLabelProps()} className="Choices__label">
      {label}
    </div>
    <div className="Choices__items">
      <button onClick={previousValue} disabled={disabled} readOnly={readOnly}>
        {'<'}
      </button>
      {states.map(state => (
        <button
          key={state.key}
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
      <button onClick={nextValue} disabled={disabled} readOnly={readOnly}>
        {'>'}
      </button>
    </div>
  </div>
)

export default ChoicesDisplay
