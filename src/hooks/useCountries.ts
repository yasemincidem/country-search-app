import axios from 'axios'
import { useState, useEffect } from 'react'

const API_URL = 'https://restcountries.eu/rest/v2'

type Country = {}
type Fn = () => any

const getFilteredItems = (data: Country[] | null): any => {
  if (data && data.length) {
    return data.filter((item: any, index: number) => index < 10)
  }
  return []
}
export default function useCountries(
  name: string = ''
): [Country[], boolean, boolean, boolean, Fn] {
  const [countries, setCountries] = useState([])
  const [items, setItems] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [hasMore, setHasMore] = useState(false)

  useEffect(() => {
    if (name) return
    async function getCountries() {
      setIsError(false)
      setIsLoading(true)
      try {
        const result = await axios(`${API_URL}/all`)
        setCountries(result.data)
        const filteredItems = result.data.filter((item: any, index: number) => index < 10)
        setItems(filteredItems)
        setHasMore(result.data.length === filteredItems.length ? false : true)
      } catch (error) {
        setIsError(true)
      }
      setIsLoading(false)
    }

    getCountries()
  }, [!name])

  useEffect(() => {
    if (!name) return
    async function getCountry() {
      setIsError(false)
      setIsLoading(true)
      try {
        const uri = `${API_URL}/name/${name}`
        const encodedUrl = encodeURI(uri)
        const result = await axios(encodedUrl)
        setCountries(result.data)
        const filteredItems = getFilteredItems(result.data)
        setItems(filteredItems)
        setHasMore(result.data.length === filteredItems.length ? false : true)
      } catch (error) {
        setIsError(true)
      }
      setIsLoading(false)
    }

    getCountry()
  }, [name])

  const fetchMoreData = () => {
    if (items.length === countries.length) {
      setHasMore(false)
      return
    }
    // 10 more records in .5 secs
    setTimeout(() => {
      const moreItems = items.concat(
        countries.filter((country, index) => index > items.length - 1 && index < items.length + 10)
      )
      setItems(moreItems)
    }, 500)
  }
  return [items, isLoading, isError, hasMore, fetchMoreData]
}
