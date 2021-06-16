import { useCallback, useState } from 'react'
import _ from 'lodash'

type Dispatch<A> = (value: A) => void
export function useDebounce(obj: string = '', wait: number = 1000): [string, Dispatch<any>] {
  const [state, setState] = useState(obj)

  const setDebouncedState = (_val: any) => {
    debounce(_val)
  }

  const debounce = useCallback(
    _.debounce((_prop: string) => {
      setState(_prop)
    }, wait),
    []
  )

  return [state, setDebouncedState]
}
