import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { ThemeProvider } from 'styled-components'
import CurrencyInput from '../CurrencyInput'
import { theme } from '../../theme'

test('renders text field', () => {
  const onChange = jest.fn()
  const { getByTestId } = render(
    <ThemeProvider theme={theme}>
      <CurrencyInput value={'10'} onChange={onChange} />
    </ThemeProvider>
  )
  expect(getByTestId('div_currency_textField')).toBeInTheDocument()
})
test('given value should be rendered', () => {
  const onChange = jest.fn()
  const { getByTestId } = render(
    <ThemeProvider theme={theme}>
      <CurrencyInput value={'30'} onChange={onChange} />
    </ThemeProvider>
  )
  const input: any = getByTestId('div_currency_textField').querySelector('input')
  expect(input.value).toBe('30')
  fireEvent.change(input, { target: { value: '' } })
  expect(onChange).toHaveBeenCalled()
})
