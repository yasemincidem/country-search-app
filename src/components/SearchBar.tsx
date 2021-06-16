import React from 'react'
import styled from 'styled-components'
import SearchIcon from '@material-ui/icons/Search'
import { fade, InputBase } from '@material-ui/core'

type Props = {
  value: string
  onChange: (value: React.ChangeEvent<HTMLInputElement>) => void
}

const Container = styled.div`
  position: relative;
  border-radius: ${({ theme }) => theme.border.radius.small};
  background-color: ${({ theme }) => fade(theme.palette.light, 0.15)};
  '&:hover': {
    background-color: ${({ theme }) => fade(theme.palette.light, 0.25)};
  }
  margin-right: ${({ theme }) => theme.spacing(2)}px;
  margin-left: 0;
  color: white;
  width: 100%;
`
const SearchIconWrapper = styled.div`
  padding: 0px 16px;
  height: 100%;
  position: absolute;
  pointer-events: none;
  display: flex;
  align-items: center;
  justify-content: center;
`
const InputBaseWrapper = styled(InputBase)`
  padding: 8px 8px 8px 0px;
  padding-left: calc(1em + 32px);
  width: 100%;
  && {
    color: white;
  }
`

const SearchBar = (props: Props): JSX.Element => {
  const { value, onChange } = props
  return (
    <Container data-testid="div_search_container">
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <InputBaseWrapper
        onChange={onChange}
        value={value}
        placeholder="Search…"
        inputProps={{ 'aria-label': 'search' }}
      />
    </Container>
  )
}
export default SearchBar
