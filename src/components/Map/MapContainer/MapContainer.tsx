/* eslint-disable react-hooks/exhaustive-deps */
import {
    useRef,
    useState,
    ComponentClass,
    useEffect,
    ReactElement,
} from "react"
import {
    GoogleMap,
    withScriptjs,
    withGoogleMap,
    Marker,
    WithScriptjsProps,
    WithGoogleMapProps,
    Polyline
} from "react-google-maps"
import { MAP_SETTINGS } from "../mapSettings";
import { LatLng, LocationProps } from "../../../utils/types";

const {
    DEFAULT_ZOOM,
    DEFAULT_CENTER,
    DEFAULT_MAP_OPTIONS,
    STYLES
} = MAP_SETTINGS

const MapContainer: ComponentClass<WithGoogleMapProps & WithScriptjsProps & LocationProps> = withScriptjs(withGoogleMap(({
    mapClicked,
    setMapClicked,
    setDistance,
    gameOver,
    location: { position: { lat, lng } } }: LocationProps): ReactElement => {
    const mapRef = useRef(null)
    const [clickedCords, setClickedCords] = useState<LatLng>({ lat, lng })

    const onMapClick = (e: any): void => {
        if (mapClicked || gameOver) return

        setMapClicked(true)
        setClickedCords({ lat: e.latLng.lat(), lng: e.latLng.lng() })
    }

    const getDistanceInKM = (pos1: LatLng, pos2: LatLng): number => {
        // Radius of the Earth in km
        const R = 6371.0710

        // Convert degrees to radians
        const rlat1 = pos1.lat * (Math.PI / 180)
        const rlat2 = pos2.lat * (Math.PI / 180)

        // Radian difference (latitudes)
        const difflat = rlat2 - rlat1
        const difflon = (pos2.lng - pos1.lng) * (Math.PI / 180)

        const d = 2 * R * Math.asin(Math.sqrt(Math.sin(difflat / 2) * Math.sin(difflat / 2) + Math.cos(rlat1) * Math.cos(rlat2) * Math.sin(difflon / 2) * Math.sin(difflon / 2)))

        return Math.round(d)
    }

    useEffect(() => {
        const distanceInKM = getDistanceInKM({ lat, lng }, clickedCords)
        setDistance(distanceInKM)
    }, [clickedCords])

    return (
        <GoogleMap
            ref={mapRef}
            onClick={onMapClick}
            defaultZoom={DEFAULT_ZOOM}
            defaultCenter={DEFAULT_CENTER}
            options={{ ...DEFAULT_MAP_OPTIONS, styles: STYLES }}
        >
            {mapClicked && (
                <>
                    <Marker
                        position={clickedCords}
                        icon={"http://maps.google.com/mapfiles/ms/icons/red-dot.png"}
                    />
                    <Marker
                        icon={"http://maps.google.com/mapfiles/ms/icons/blue-dot.png"}
                        position={mapClicked ? { lat, lng } : undefined}
                    />
                    <Polyline path={[{ lat, lng }, clickedCords]} />
                </>
            )}
        </GoogleMap>
    );
}));

export default MapContainer
