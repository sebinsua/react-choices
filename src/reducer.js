import { INIT, RECEIVE_NEXT_PROPS } from 'conventional-component'
import { SET_VALUE, PREVIOUS_VALUE, NEXT_VALUE, HOVER_VALUE } from './actions'

const REDUCER_NAME = 'choices'

const initialState = {
  name: undefined,
  label: undefined,
  availableStates: [],
  defaultValue: undefined,
  focusedValue: undefined,
  hoveredValue: undefined,
  selectedValue: undefined
}

const firstValue = (availableStates = []) => (availableStates[0] || {}).value

const isSettable = state => state.settable !== false

const getPreviousValue = state => {
  const currentValue = state.focusedValue || state.selectedValue
  const currentStateIndex = state.availableStates.findIndex(
    as => as.value === currentValue
  )

  if (currentStateIndex > 0) {
    let previousSettableIndex = -1
    for (let idx = state.availableStates.length; idx >= 0; idx--) {
      if (idx < currentStateIndex && isSettable(state.availableStates[idx])) {
        previousSettableIndex = idx
        break
      }
    }

    if (previousSettableIndex !== -1) {
      return state.availableStates[previousSettableIndex].value
    }
  }

  return undefined
}

const getNextValue = state => {
  const currentValue = state.focusedValue || state.selectedValue
  const currentStateIndex = state.availableStates.findIndex(
    as => as.value === currentValue
  )

  if (currentStateIndex < state.availableStates.length - 1) {
    let nextSettableIndex = -1
    for (let idx = 0; idx < state.availableStates.length; idx++) {
      if (idx > currentStateIndex && isSettable(state.availableStates[idx])) {
        nextSettableIndex = idx
        break
      }
    }

    if (nextSettableIndex !== -1) {
      return state.availableStates[nextSettableIndex].value
    }
  }

  return undefined
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case INIT: {
      const availableStates = action.payload.availableStates
      return {
        ...state,
        name: action.payload.name,
        label: action.payload.label,
        availableStates,
        defaultValue: action.payload.defaultValue,
        selectedValue:
          action.payload.defaultValue || firstValue(availableStates)
      }
    }
    case RECEIVE_NEXT_PROPS: {
      return {
        ...state,
        name: action.payload.name,
        label: action.payload.label,
        availableStates: action.payload.availableStates,
        defaultValue: action.payload.defaultValue,
        selectedValue: action.payload.selectedValue
      }
    }
    case PREVIOUS_VALUE: {
      const { shouldSelect } = action.payload
      const previousValue = getPreviousValue(state)

      if (previousValue) {
        if (shouldSelect) {
          return {
            ...state,
            selectedValue: previousValue,
            focusedValue: previousValue
          }
        } else {
          return { ...state, focusedValue: previousValue }
        }
      }

      return state
    }
    case NEXT_VALUE: {
      const { shouldSelect } = action.payload
      const nextValue = getNextValue(state)

      if (nextValue) {
        if (shouldSelect) {
          return { ...state, selectedValue: nextValue, focusedValue: nextValue }
        } else {
          return { ...state, focusedValue: nextValue }
        }
      }

      return state
    }
    case SET_VALUE: {
      const value = action.payload
      const availableState = state.availableStates.find(
        as => as.value === value
      )

      if (availableState && isSettable(availableState)) {
        return { ...state, selectedValue: value, focusedValue: value }
      } else if (value === undefined) {
        return { ...state, focusedValue: undefined }
      }

      return state
    }
    case HOVER_VALUE: {
      const value = action.payload
      const availableState = state.availableStates.find(
        as => as.value === value
      )

      if (availableState) {
        return { ...state, hoveredValue: action.payload }
      } else if (value === undefined) {
        return { ...state, hoveredValue: undefined }
      }

      return state
    }
    default:
      return state
  }
}

export { initialState, REDUCER_NAME, getPreviousValue, getNextValue }
export default reducer
