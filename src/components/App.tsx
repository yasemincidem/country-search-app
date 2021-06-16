import React from 'react'
import { AppBar, Toolbar } from '@material-ui/core'
import CurrencyInput from './CurrencyInput'
import SearchBar from './SearchBar'
import InfiniteList from './InfiniteList'
import { useStateAndDebounce } from '../hooks'

const App = (): JSX.Element => {
  const [searchInput, debouncedStateSearch, handleSearchInput] = useStateAndDebounce('')

  const [currencyInput, debouncedCurrencyInput, handleCurrencyInput] = useStateAndDebounce('')

  return (
    <>
      <AppBar position="sticky" data-testid="div_app_header">
        <Toolbar data-testid="div_app_toolbar">
          <SearchBar value={searchInput} onChange={handleSearchInput} />
          <CurrencyInput value={currencyInput} onChange={handleCurrencyInput} />
        </Toolbar>
      </AppBar>
      <InfiniteList searchInput={debouncedStateSearch} currencyInput={debouncedCurrencyInput} />
    </>
  )
}
export default App
