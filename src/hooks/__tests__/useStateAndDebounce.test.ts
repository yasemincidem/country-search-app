import { renderHook, act } from '@testing-library/react-hooks'
import { useStateAndDebounce } from '../useStateAndDebounce'

const wait = (amount = 0) => new Promise((resolve: any) => setTimeout(resolve, amount))

test('set input value and debounced value', async () => {
  const { result } = renderHook(() => useStateAndDebounce(''))

  act(() => {
    result.current[2]({ target: { value: 'value' } })
  })
  expect(result.current[0]).toBe('value')
  await wait(1000)
  expect(result.current[1]).toBe('value')
})
