import { Component } from 'react'

/**
 * Domain
 */

type Value = string
interface AvailableState {
  value: Value;
  label?: string;
  settable?: boolean;
}

/**
 * Actions
 */

type Action<Type, Payload> = { type: Type, payload: Payload }
type SetValueAction = Action<'react-choices/SET_VALUE', Value>
type HoverValueAction = Action<'react-choices/HOVER_VALUE', Value>
type PreviousValueAction = Action<'react-choices/PREVIOUS_VALUE', boolean>
type NextValueAction = Action<'react-choices/NEXT_VALUE', boolean>
type ChoicesActions =
  | SetValueAction
  | HoverValueAction
  | PreviousValueAction
  | NextValueAction

type SetValueFn = (value: Value) => SetValueAction
type HoverValueFn = (value: Value) => HoverValueAction
type PreviousValueFn = (shouldSelect: boolean) => PreviousValueAction
type NextValueFn = (shouldSelect: boolean) => NextValueAction

/**
 * Reducer
 */

interface ChoicesReducerState {
  name: string;
  label: string;
  blockName: string;
  states: Array<AvailableState>;
  defaultValue?: Value;
  focusedValue?: Value;
  hoveredValue?: Value;
  selectedValue?: Value;
}
type ChoicesReducer = (
  state: ChoicesReducerState,
  action: ChoicesActions
) => ChoicesReducerState

/**
 * Component
 */

type GetContainerPropsFn = () => {
  className: string,
  role: 'radiogroup',
  'aria-labelledby': string,
  'aria-activedescendant': string
}

type GetContainerLabelPropsFn = () => {
  id: string,
  className: string
}

type GetItemPropsFn = (
  state: AvailableState
) => {
  key: string,
  id: string,
  className: string,
  role: 'radio',
  'aria-checked': 'true' | 'false'
}

type GetItemInputPropsFn = (
  state: AvailableState
) => {
  tabIndex: 0 | -1,
  className: string
}

interface TemplateComponentProps {
  name: string;
  label: string;
  blockName: string;
  states: Array<AvailableState>;
  defaultValue?: Value;
  focusedValue?: Value;
  hoveredValue?: Value;
  selectedValue?: Value;
  setValue: SetValueFn;
  hoverValue: HoverValueFn;
  previousValue: PreviousValueFn;
  nextValue: NextValueFn;
  getContainerProps: GetContainerPropsFn;
  getContainerLabelProps: GetContainerLabelPropsFn;
  getItemProps: GetItemPropsFn;
  getItemInputProps: GetItemInputPropsFn;
}
type TemplateComponent = Component<TemplateComponentProps>

type OnChangeFn = (value: string) => any
interface ChoicesComponentProps {
  name: string;
  label: string;
  blockName: string;
  availableStates: Array<AvailableState>;
  defaultValue?: Value;
  focusedValue?: Value;
  hoveredValue?: Value;
  selectedValue?: Value;
  onChange: OnChangeFn;
  render?: TemplateComponent;
  children?: TemplateComponent;
}
type ChoicesComponent = Component<ChoicesComponentProps>

/**
 * WithLogicHoc
 */

type WithLogicHoc = (Template: TemplateComponent) => ChoicesComponent

/**
 * Exports
 */

declare var actions: {
  setValue: SetValueFn,
  hoverValue: HoverValueFn,
  previousValue: PreviousValueFn,
  nextValue: NextValueFn
}
declare var reducer: ChoicesReducer
declare var Template: TemplateComponent
declare var withLogic: WithLogicHoc
declare var Choices: ChoicesComponent
declare var REDUCER_NAME: string
declare var COMPONENT_NAME: string
declare var COMPONENT_KEY: string

export {
  actions,
  reducer,
  Template,
  withLogic,
  Choices,
  REDUCER_NAME,
  COMPONENT_NAME,
  COMPONENT_KEY
}
export default Choices
