import React, {useEffect, useState} from 'react'
import L from "leaflet"
import "leaflet-routing-machine/dist/leaflet-routing-machine.css"
import "leaflet-routing-machine"
import { useMap } from "react-leaflet"

L.Marker.prototype.options.icon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png"
})

const Routing = (props) => {
  const map = useMap()

  useEffect(() => {
    if (!map) return

    const routingControl = L.Routing.control({
      waypoints: [L.latLng(props.markers[0][0], props.markers[0][1]), L.latLng(props.markers[1][0], props.markers[1][1])],
      routeWhileDragging: true
    }).addTo(map)

    return () => map.removeControl(routingControl)
  }, [map])

  return null
}

export default Routing