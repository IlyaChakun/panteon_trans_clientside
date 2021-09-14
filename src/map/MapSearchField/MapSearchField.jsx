import React, { useEffect } from 'react'
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch'
import { useMap } from 'react-leaflet'

const SearchField = () => {
  const provider = new OpenStreetMapProvider()

  const searchControl = new GeoSearchControl({
    provider: provider,
    onSubmit: (res) => { console.log('ress:', res)},
    resultFormat: ({ result }) => {
      console.log('result: ', searchControl)
      return result.label
    }
  })
  console.log('search control: ', searchControl)
  const map = useMap()

  map.on('geosearch/showlocation', (result) => {
    console.log('1342143', result)
  })

  useEffect(() => {
    map.addControl(searchControl)
    return () => map.removeControl(searchControl)
  }, [])

  return null
}

export default SearchField