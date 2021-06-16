import { useEffect, useState } from 'react'
import axios from 'axios'
const API_URL = 'http://data.fixer.io/api/latest?access_key=0a04b6abe9c86a06ca5a3c887294fe40\n'

type Currency = {
  [key: string]: number
}
export default function useCurrencies(): [Currency[], boolean, boolean] {
  const [currencies, setCurrencies] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    async function getCurrencies() {
      setIsError(false)
      setIsLoading(true)
      try {
        const result = await axios(API_URL)
        setCurrencies(result.data.rates)
      } catch (error) {
        setIsError(true)
      }
      setIsLoading(false)
    }

    getCurrencies()
  }, [])
  return [currencies, isError, isLoading]
}
