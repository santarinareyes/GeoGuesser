/* eslint-disable react-hooks/exhaustive-deps */
import { ReactElement, useEffect, useState } from "react";
import { GOOGLE_MAP_URL } from "./mapSettings";
import { LOCATIONS_DATA } from "../../utils/locations.data";
import MapContainer from "./MapContainer/MapContainer";
import { IonButton, IonCol, IonRow } from "@ionic/react";
import { LocationData } from "../../utils/types";
import "./Map.css"

const Map = (): ReactElement => {
    const [rounds, setRounds] = useState<number>(0)
    const [highscore, setHighscore] = useState<number>(0)
    const [mapClicked, setMapClicked] = useState<boolean>(false)
    const [distance, setDistance] = useState<number>(0)
    const [distanceBank, setDistanceBank] = useState<number>(1500)
    const [points, setPoints] = useState<number>(0)
    const [location, setLocation] = useState<LocationData>({} as LocationData)

    const randomLocation = (): void => {
        const randIndex = Math.floor(Math.random() * LOCATIONS_DATA.length)
        setLocation(LOCATIONS_DATA[randIndex])
        setMapClicked(false)
        setRounds(rounds + 1)
    }

    const tryAgain = (): void => {
        setMapClicked(false)
        setDistance(0)
        setDistanceBank(1500)
        setPoints(0)
        randomLocation()
    }

    useEffect(() => {
        randomLocation()
    }, [])

    useEffect(() => {
        if (distance > 50) return setDistanceBank(distanceBank - distance)
        if (distance === 0) return
        setPoints(points + 1)
        setDistanceBank(distanceBank - distance)
    }, [distance])


    useEffect(() => {
        if (distanceBank >= 50 || highscore > points) return
        setHighscore(points)
    }, [distanceBank])

    const gameOver = distanceBank <= 0

    return (
        <IonCol>
            <MapContainer
                key={rounds}
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `400px` }} />}
                mapElement={<div style={{ height: `100%` }} />}
                googleMapURL={GOOGLE_MAP_URL}
                location={location}
                mapClicked={mapClicked}
                setMapClicked={setMapClicked}
                setDistance={setDistance}
                gameOver={gameOver}
            />
            <IonRow className="ion-justify-content-between">
                <div>Find: {location?.name}</div>
                <div>Points: {points}</div>
            </IonRow>
            <IonRow className="ion-justify-content-between">
                <div>Highscore: {highscore}</div>
                <div>Available distance: {distanceBank}</div>
            </IonRow>
            <div className="ion-text-center ion-align-self-baseline">
                {mapClicked && !gameOver && (
                    <IonCol>
                        <IonButton className="bottom" expand="full" onClick={randomLocation}>New Location</IonButton>
                    </IonCol>
                )}
                {mapClicked && <span>{distance}KM away from the target</span>}
                {gameOver && (
                    <>
                        <p>Game Over</p>
                        <IonCol>
                            <IonButton className="bottom" expand="full" onClick={tryAgain}>Try again</IonButton>
                        </IonCol>
                    </>
                )}
            </div>
        </IonCol>
    )
};

export default Map
