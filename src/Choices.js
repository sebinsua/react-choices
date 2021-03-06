import { connectToState } from 'conventional-component'
import { compose } from './utils'

import ChoicesDisplay from './ChoicesDisplay'
import withLogic from './withLogic'
import reducer from './reducer'
import * as actions from './actions'

const COMPONENT_NAME = 'Choices'
const COMPONENT_KEY = 'name'

const enhance = compose(connectToState(reducer, actions), withLogic)

const Choices = enhance(ChoicesDisplay)

export { COMPONENT_NAME, COMPONENT_KEY }
export default Choices
