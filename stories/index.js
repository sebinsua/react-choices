import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import Choices from '..'

import './styles.css'

const choices = storiesOf('Choices', module)

choices.add('with default template', () => (
  <div className="choices__container">
    <input type="text" name="thing_1" value="unrelated" />
    <input type="text" name="thing_2" value="fields" />
    <Choices
      name="speed"
      availableStates={[
        { value: '<S', settable: false },
        { value: 'S' },
        { value: 'S<M', settable: false },
        { value: 'M' },
        { value: 'M<F', settable: false },
        { value: 'F' },
        { value: '>F', settable: false }
      ]}
      defaultValue="M"
    />
  </div>
))
