import React, { Component } from 'react'
import { withRenderProp, withLifecycleStateLogic } from 'conventional-component'
import { KEYCODE } from './utils'

import ChoicesDisplay from './ChoicesDisplay'

const toInputClassName = state => `Choices__input-${state.value}`

const createStates = (availableStates = []) => {
  return availableStates.map(availableState => ({
    ...availableState,
    inputClassName: toInputClassName(availableState)
  }))
}

class EventDetectionContainer extends Component {
  setContainer = ref => (this.container = ref)

  keyboardListener = event => {
    const isActiveControl = this.container.contains(document.activeElement)

    let handle = () => undefined
    if (isActiveControl) {
      handle = this.props.getKeyCodeHandler(event.keyCode)
    }

    return handle(event)
  }

  unfocusWhenOutside = event => {
    const isActiveControl = this.container.contains(document.activeElement)
    if (!isActiveControl) {
      this.props.unfocusValue()
    }
  }

  unhoverWhenOutside = event => {
    this.props.unhoverValue()
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

    focusInputElement = value => {
      const el = (document.getElementsByClassName(
        toInputClassName({ value })
      ) || [])[0]
      if (el) {
        requestAnimationFrame(() => el.focus())
      }
    }

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
      const templateProps = {
        name: this.props.name,
        states: createStates(this.props.availableStates),
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
        children = withRenderProp(templateProps)
      } else if (Template) {
        children = <Template {...templateProps} />
      }

      return (
        <EventDetectionContainer
          getKeyCodeHandler={keyCode => {
            switch (keyCode) {
              case KEYCODE.DOWN:
              case KEYCODE.LEFT:
                return this.focusPreviousValue
              case KEYCODE.UP:
              case KEYCODE.RIGHT:
                return this.focusNextValue
              case KEYCODE.ESC:
                return this.resetValue
              default:
                return () => undefined
            }
          }}
          unfocusValue={this.unfocusValue}
          unhoverValue={this.unhoverValue}
        >
          {children}
        </EventDetectionContainer>
      )
    }
  }

  return withLifecycleStateLogic({
    shouldDispatchReceiveNextProps: false
  })(Choices)
}

export default withLogic
