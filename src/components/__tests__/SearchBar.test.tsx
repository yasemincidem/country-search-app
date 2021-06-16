import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { ThemeProvider } from 'styled-components'
import { theme } from '../../theme'
import SearchBar from '../SearchBar'

test('renders search bar', () => {
  const onChange = jest.fn()
  const { getByTestId } = render(
    <ThemeProvider theme={theme}>
      <SearchBar value={'10'} onChange={onChange} />
    </ThemeProvider>
  )
  expect(getByTestId('div_search_container')).toBeInTheDocument()
})
test('given value should be rendered', () => {
  const onChange = jest.fn()
  const { getByTestId } = render(
    <ThemeProvider theme={theme}>
      <SearchBar value={'Turkey'} onChange={onChange} />
    </ThemeProvider>
  )
  const input: any = getByTestId('div_search_container').querySelector('input')
  expect(input.value).toBe('Turkey')
  fireEvent.change(input, { target: { value: '' } })
  expect(onChange).toHaveBeenCalled()
})
