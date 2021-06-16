import React from 'react'
import styled from 'styled-components'
import InfiniteScroll from 'react-infinite-scroll-component'
import {
  Divider,
  ListItem,
  List,
  ListItemAvatar,
  Avatar,
  MenuList,
  Typography,
  MenuItem,
  CircularProgress,
} from '@material-ui/core'
import {
  Public as PublicIcon,
  LocationCity as LocationCityIcon,
  Money as MoneyIcon,
  SupervisedUserCircle as SupervisedUserCircleIcon,
} from '@material-ui/icons'
import { useCountries, useCurrencies } from '../hooks'

type Props = {
  searchInput: string
  currencyInput: string
}
type Currency = {
  name: string
  code: string
  symbol: string
}

const Loading = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 50px;
`
const formattedCurrency = (currencyInput: number, currentCurrency: Currency, currencies: any) => {
  const amount = currencies
    ? (currencies[currentCurrency.code] / currencies.SEK) * currencyInput
    : 0
  return currentCurrency
    ? `${Math.floor(amount)} ${currentCurrency.name} (${currentCurrency.code}-${
        currentCurrency.symbol
      })`
    : '--'
}

const InfiniteList = (props: Props): JSX.Element => {
  const { searchInput, currencyInput } = props
  const [items, isLoading, isError, hasMore, fetchMoreData] = useCountries(searchInput)
  const [currencies, isErrorCurrency] = useCurrencies()

  if (isError) return <div>Nothing matched for your search term</div>
  if (isErrorCurrency) return <div>Error loading currencies</div>
  if (isLoading)
    return (
      <Loading data-testid="div_inifiniteScroll_loading">
        <CircularProgress />
      </Loading>
    )

  return (
    <InfiniteScroll
      dataLength={items.length}
      next={fetchMoreData}
      hasMore={hasMore}
      loader={<h4>Loading...</h4>}
      endMessage={
        <p style={{ textAlign: 'center' }}>
          <b>You have seen it all</b>
        </p>
      }
    >
      <List data-testid="div_inifiniteScroll_list">
        {items.map((country: any) => (
          <div key={`${country.name}-${country.alpha2Code}-${country.alpha3Code}`}>
            <ListItem alignItems="center">
              <ListItemAvatar>
                <Avatar alt="Country Flag" src={country.flag} />
              </ListItemAvatar>
              <MenuList>
                <MenuItem>
                  <PublicIcon color="action" />
                  <Typography variant="body2" color="textSecondary">
                    {country.name}
                  </Typography>
                </MenuItem>
                <MenuItem>
                  <LocationCityIcon color="action" />
                  <Typography variant="body2" color="textSecondary" component="p">
                    {country.capital}
                  </Typography>
                </MenuItem>
                <MenuItem>
                  <SupervisedUserCircleIcon color="action" />
                  <Typography variant="body2" color="textSecondary" component="p">
                    {country.population}
                  </Typography>
                </MenuItem>
                {country.currencies.length
                  ? country.currencies.map((currency: Currency, index: number) => (
                      <MenuItem key={`${currency.symbol}-${index}`}>
                        <MoneyIcon color="action" />
                        <Typography variant="body2" color="textSecondary" component="p">
                          {formattedCurrency(+currencyInput, currency, currencies)}
                        </Typography>
                      </MenuItem>
                    ))
                  : null}
              </MenuList>
            </ListItem>
            <Divider variant="inset" component="li" />
          </div>
        ))}
      </List>
    </InfiniteScroll>
  )
}
export default InfiniteList
