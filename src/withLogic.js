import React, { Component } from 'react'
import { withRenderProp, withLifecycleStateLogic } from 'conventional-component'
import cx from 'classnames-es'
import { KEYCODE, whenDifferent } from './utils'

import { COMPONENT_NAME } from './Choices'
import ChoicesDisplay from './ChoicesDisplay'

const toInputClassName = state =>
  `${[state.blockName, state.name].join('-')}__input-${state.value}`

const defaultGetKeyCodeHandler = (keyCode, parentInstance) => {
  switch (keyCode) {
    case KEYCODE.NUMPAD_2:
    case KEYCODE.NUMPAD_4:
    case KEYCODE.DOWN:
    case KEYCODE.LEFT:
      return parentInstance.focusPreviousValue
    case KEYCODE.NUMPAD_8:
    case KEYCODE.NUMPAD_6:
    case KEYCODE.UP:
    case KEYCODE.RIGHT:
      return parentInstance.focusNextValue
    case KEYCODE.ESC:
      return parentInstance.resetValue
    default:
      return () => undefined
  }
}

const createStates = (props = {}, availableStates = []) => {
  return availableStates.map(availableState => ({
    ...availableState,
    label:
      typeof availableState.label !== 'undefined'
        ? availableState.label
        : availableState.value,
    notSettable: availableState.settable === false,
    focused: availableState.value === props.focusedValue,
    hovered: availableState.value === props.hoveredValue,
    selected:
      availableState.value === (props.selectedValue || props.defaultValue),
    inputClassName: toInputClassName({
      ...availableState,
      blockName: props.blockName,
      name: props.name
    })
  }))
}

class EventDetectionContainer extends Component {
  setContainer = ref => (this.container = ref)

  keyboardListener = event => {
    const isActiveControl = this.container.contains(document.activeElement)

    let handle = () => undefined
    if (isActiveControl) {
      handle = this.props.getKeyCodeHandler(
        event.keyCode,
        this.props.parentInstance
      )
    }

    return handle(event)
  }

  unfocusWhenOutside = event => {
    const isActiveControl = this.container.contains(document.activeElement)
    if (!isActiveControl) {
      const unfocusValue =
        this.props.unfocusValue || this.props.parentInstance.unfocusValue
      if (unfocusValue) {
        return unfocusValue()
      }
    }
  }

  unhoverWhenOutside = event => {
    const unhoverValue =
      this.props.unhoverValue || this.props.parentInstance.unhoverValue
    if (unhoverValue) {
      return unhoverValue()
    }
  }

  componentDidMount() {
    document.addEventListener('keydown', this.keyboardListener)
    document.addEventListener('focusin', this.unfocusWhenOutside)
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.keyboardListener)
    document.removeEventListener('focusin', this.unfocusWhenOutside)
  }

  render() {
    const { children } = this.props
    return (
      <div
        className="EventDetection-container"
        ref={this.setContainer}
        onMouseOut={this.unhoverWhenOutside}
      >
        {children}
      </div>
    )
  }
}

function withLogic(Template = ChoicesDisplay) {
  class Choices extends Component {
    static defaultProps = {
      blockName: COMPONENT_NAME
    }

    componentWillReceiveProps(nextProps) {
      const hasNewSelectedValue =
        this.props.selectedValue &&
        nextProps.selectedValue !== this.props.selectedValue
      const hasNewFocusedValue = !!nextProps.focusedValue
      if (hasNewSelectedValue) {
        this.focusInputElement(nextProps.selectedValue)
      } else if (hasNewFocusedValue) {
        this.focusInputElement(nextProps.focusedValue)
      }
    }

    createClassName = (element, modifier = undefined) =>
      `${this.props.blockName}__${element}` + (modifier ? `--${modifier}` : '')

    focusInputElement = value => {
      const el = (document.getElementsByClassName(
        toInputClassName({
          blockName: this.props.blockName,
          name: this.props.name,
          value
        })
      ) || [])[0]
      if (el) {
        requestAnimationFrame(() => el.focus())
      }
    }

    getContainerProps = () => ({
      className: this.createClassName('container'),
      role: 'radiogroup',
      'aria-labelledby': this.createClassName(`label-${this.props.name}`),
      'aria-activedescendant': this.createClassName(
        `item-${this.props.selectedValue}`
      )
    })

    getContainerLabelProps = () => ({
      id: this.createClassName(`label-${this.props.name}`),
      className: this.createClassName('label')
    })

    getItemProps = state => ({
      id: this.createClassName(`item-${state.value}`),
      className: this.createClassName('item'),
      role: 'radio',
      'aria-checked': state.selected ? 'true' : 'false'
    })

    getItemInputProps = state => ({
      tabIndex: state.selected ? 0 : -1,
      className: cx(this.createClassName('item__input'), state.inputClassName)
    })

    resetValue = event => {
      this.props.setValue(this.props.defaultValue)
    }

    setValue = (value, event) => {
      event && event.preventDefault()
      this.props.setValue(value)
    }

    unfocusValue = this.setValue.bind(null, undefined)

    hoverValue = (value, event) => {
      event && event.preventDefault()
      this.props.hoverValue(value)
    }

    unhoverValue = this.hoverValue.bind(null, undefined)

    focusPreviousValue = event => {
      event && event.preventDefault()
      this.props.previousValue(false)
    }

    focusNextValue = event => {
      event && event.preventDefault()
      this.props.nextValue(false)
    }

    previousValue = event => {
      event && event.preventDefault()
      this.props.previousValue(true)
    }

    nextValue = event => {
      event && event.preventDefault()
      this.props.nextValue(true)
    }

    render() {
      const getKeyCodeHandler =
        this.props.getKeyCodeHandler || defaultGetKeyCodeHandler

      const templateProps = {
        createClassName: this.createClassName,
        getContainerProps: this.getContainerProps,
        getContainerLabelProps: this.getContainerLabelProps,
        getItemProps: this.getItemProps,
        getItemInputProps: this.getItemInputProps,

        name: this.props.name,
        label: this.props.label,
        blockName: this.props.blockName,
        states: createStates(this.props, this.props.availableStates),
        defaultValue: this.props.defaultValue,
        focusedValue: this.props.focusedValue,
        hoveredValue: this.props.hoveredValue,
        selectedValue: this.props.selectedValue,

        resetValue: this.resetValue,
        setValue: this.setValue,
        hoverValue: this.hoverValue,
        previousValue: this.previousValue,
        nextValue: this.nextValue
      }

      let children = null
      if (
        typeof this.props.render === 'function' ||
        typeof this.props.children === 'function'
      ) {
        children = withRenderProp({
          ...templateProps,
          render: this.props.render,
          children: this.props.children
        })
      } else if (Template) {
        children = <Template {...templateProps} />
      }

      return (
        <EventDetectionContainer
          parentInstance={this}
          getKeyCodeHandler={getKeyCodeHandler}
          unfocusValue={this.unfocusValue}
          unhoverValue={this.unhoverValue}
        >
          {children}
        </EventDetectionContainer>
      )
    }
  }

  return withLifecycleStateLogic({
    shouldDispatchReceiveNextProps: whenDifferent([
      'name',
      'label',
      'blockName',
      'availableStates',
      'defaultValue',
      'selectedValue'
    ])
  })(Choices)
}

export default withLogic
