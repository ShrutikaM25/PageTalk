import React from 'react'
import Component from './infocard'
import { cn } from '@/lib/utils'

describe('<Component />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Component />)
  })
})