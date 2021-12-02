export const GOOGLE_MAP_URL = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_API_KEY}&v=3.exp&libraries=geometry,drawing,places`

export const MAP_SETTINGS = {
  DEFAULT_MAP_OPTIONS: {
    mapTypeControl: false,
    fullscreenControl: false,
    streetViewControl: false,
  },
  STYLES: [
    {
      featureType: "administrative",
      elementType: "labels",
      stylers: [{ visibility: "off" }],
    },
    {
      featureType: "administrative.country",
      elementType: "labels",
      stylers: [{ visibility: "on" }],
    },
    {
      featureType: "poi",
      elementType: "labels",
      stylers: [{ visibility: "off" }],
    },
    {
      featureType: "transit",
      elementType: "labels",
      stylers: [{ visibility: "off" }],
    },
    {
      featureType: "road",
      elementType: "labels",
      stylers: [{ visibility: "off" }],
    },
    {
      featureType: "landscape",
      elementType: "labels",
      stylers: [{ visibility: "off" }],
    },
    {
      featureType: "water",
      elementType: "labels",
      stylers: [{ visibility: "off" }],
    },
  ],
  DEFAULT_CENTER: { lat: 57, lng: 21 },
  DEFAULT_ZOOM: 3,
}
