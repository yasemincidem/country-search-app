import React from 'react'
import { mocked } from 'ts-jest/utils'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { ThemeProvider } from 'styled-components'
import { theme } from '../../theme'
import InfiniteList from '../InfiniteList'
import useCountries from '../../hooks/useCountries'
import useCurrencies from '../../hooks/useCurrencies'

const fetchMoreData = jest.fn()
jest.mock('../../hooks/useCountries')
jest.mock('../../hooks/useCurrencies')

describe('InfiniteList', () => {
  test('renders currencies error message', () => {
    mocked(useCountries).mockImplementation(() => [[], false, false, false, fetchMoreData])
    mocked(useCurrencies).mockImplementation(() => [[], true, false])
    const { getByText } = render(
      <ThemeProvider theme={theme}>
        <InfiniteList currencyInput={'0'} searchInput={''} />
      </ThemeProvider>
    )
    expect(getByText('Error loading currencies')).toBeInTheDocument()
  })
  test('renders loading', () => {
    mocked(useCountries).mockImplementation(() => [[], true, false, false, fetchMoreData])
    mocked(useCurrencies).mockImplementation(() => [[], false, false])
    const { getByTestId } = render(
      <ThemeProvider theme={theme}>
        <InfiniteList currencyInput={'0'} searchInput={''} />
      </ThemeProvider>
    )
    expect(getByTestId('div_inifiniteScroll_loading')).toBeInTheDocument()
  })
  test('renders countries error', () => {
    mocked(useCountries).mockImplementation(() => [[], false, true, false, fetchMoreData])
    mocked(useCurrencies).mockImplementation(() => [[], false, false])
    const { getByText } = render(
      <ThemeProvider theme={theme}>
        <InfiniteList currencyInput={'0'} searchInput={''} />
      </ThemeProvider>
    )
    expect(getByText('Nothing matched for your search term')).toBeInTheDocument()
  })
  test('Load more countries', () => {
    mocked(useCountries).mockImplementation(() => [[], false, false, true, fetchMoreData])
    mocked(useCurrencies).mockImplementation(() => [[], false, false])
    const { getByText } = render(
      <ThemeProvider theme={theme}>
        <InfiniteList currencyInput={'0'} searchInput={''} />
      </ThemeProvider>
    )
    expect(getByText('Loading...')).toBeInTheDocument()
  })
  test('renders infinite scroll list', () => {
    mocked(useCountries).mockImplementation(() => [
      [
        {
          name: 'Afghanistan',
          alpha2Code: 'AF',
          alpha3Code: 'AFG',
          capital: 'Kabul',
          population: 27657145,
          currencies: [
            {
              code: 'AFN',
              name: 'Afghan afghani',
              symbol: '؋',
            },
          ],
          flag: 'https://restcountries.eu/data/afg.svg',
        },
        {
          name: 'Åland Islands',
          alpha2Code: 'AX',
          alpha3Code: 'ALA',
          capital: 'Mariehamn',
          population: 28875,
          currencies: [
            {
              code: 'EUR',
              name: 'Euro',
              symbol: '€',
            },
          ],
          flag: 'https://restcountries.eu/data/ala.svg',
        },
      ],
      false,
      false,
      false,
      fetchMoreData,
    ])
    mocked(useCurrencies).mockImplementation(() => [[], false, false])
    const { getByTestId } = render(
      <ThemeProvider theme={theme}>
        <InfiniteList currencyInput={'0'} searchInput={''} />
      </ThemeProvider>
    )
    expect(getByTestId('div_inifiniteScroll_list')).toBeInTheDocument()
  })
})
