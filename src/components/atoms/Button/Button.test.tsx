import React from 'react'
import { render, screen } from '@testing-library/react'
import Button from './Button'

describe('Button', () => {
  it('should render with default styles', () => {
    render(<Button buttonType="primary">Default</Button>)

    expect(screen.getByText('Default')).toMatchSnapshot()
  })

  it('should render with disabled property', () => {
    render(
      <Button buttonType="primary" disabled>
        Disabled Button
      </Button>,
    )

    expect(screen.getByText('Disabled Button')).toHaveProperty('disabled', true)
  })
})
