import React from 'react'
import Pricing from './pricing'

describe('<Pricing />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Pricing />)
  })
})