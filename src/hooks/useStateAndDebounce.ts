import React, { useState } from 'react'
import { useDebounce } from './useDebounce'

type Event = {
  event: Target
}
type Target = {
  target: Value
}
type Value = {
  value: string
}
type Dispatch<S> = (value: any) => void

export function useStateAndDebounce(
  initialState: string
): [string, string, Dispatch<React.ChangeEvent<HTMLInputElement>>] {
  const [searchInput, setSearchInput] = useState(initialState)
  const [debouncedStateSearch, setDebouncedStateSearch] = useDebounce(searchInput)
  const handleSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value)
    setDebouncedStateSearch(event.target.value)
  }
  return [searchInput, debouncedStateSearch, handleSearchInput]
}
