import { renderHook, act } from '@testing-library/react-hooks'
import { useDebounce } from '../useDebounce'

const wait = (amount = 0) => new Promise((resolve: any) => setTimeout(resolve, amount))

test('set input value and debounced value', async () => {
  const { result } = renderHook(() => useDebounce('value'))

  act(() => {
    result.current[1]('value')
  })
  await wait(1000)
  expect(result.current[0]).toBe('value')
})
