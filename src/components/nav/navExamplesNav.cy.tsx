import React from 'react'
import { ExamplesNav } from './nav'

describe('<ExamplesNav />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<ExamplesNav />)
  })
})