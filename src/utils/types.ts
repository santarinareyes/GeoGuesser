import { Dispatch, SetStateAction } from "react"

export type LocationProps = {
  location: LocationData
  mapClicked: boolean
  gameOver: boolean
  setMapClicked: Dispatch<SetStateAction<boolean>>
  setDistance: Dispatch<SetStateAction<number>>
}

export type LocationData = {
  name: string
  position: {
    lat: number
    lng: number
  }
}

export type LatLng = {
  lat: number
  lng: number
}
