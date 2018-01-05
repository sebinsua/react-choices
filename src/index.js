import Choices, { COMPONENT_NAME, COMPONENT_KEY } from './Choices'
import Template from './ChoicesDisplay'
import withLogic from './withLogic'
import reducer, { REDUCER_NAME } from './reducer'
import * as actions from './actions'

export {
  actions,
  reducer,
  Template,
  withLogic,
  REDUCER_NAME,
  COMPONENT_NAME,
  COMPONENT_KEY
}
export default Choices
