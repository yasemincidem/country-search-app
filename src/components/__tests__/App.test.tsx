import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import App from '../App'
import { ThemeProvider } from 'styled-components'
import { theme } from '../../theme'
test('renders AppBar', () => {
  const { getByTestId } = render(
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  )
  expect(getByTestId('div_app_header')).toBeInTheDocument()
})
test('AppBar should be sticky and have primaryLight background color', () => {
  const { getByTestId } = render(
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  )
  expect(getByTestId('div_app_header')).toHaveStyle(
    `background-color:  rgb(255, 255, 255); position:sticky`
  )
})
test('ToolBar should contain two input field', () => {
  const { getByTestId } = render(
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  )
  expect(getByTestId('div_app_toolbar').children.length).toBe(2)
})
