import {
  IonButton,
  IonCol,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar
} from '@ionic/react';
import { useState } from 'react';
import Map from '../../components/Map/Map';
import './Home.css';

const Home: React.FC = () => {
  const [gameStarted, setGameStarted] = useState(false)

  const handleStartGame = (): void => {
    setGameStarted(!gameStarted)
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Exopulse</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Exopulse</IonTitle>
          </IonToolbar>
        </IonHeader>
        {gameStarted ?
          <Map /> :
          <IonCol>
            <h2 className="ion-text-capitalize">Game rules:</h2>
            <p>You get a point if your guess is at least 50 KM away from the target.</p>
            <p>You start with a total of 1500 KM in your travel bank. Once it goes below 0 the game is over.</p>
            <h3 className="ion-text-capitalize">Example:</h3>
            <p>You need to find Stockholm and your guess is 60 KM away from the distance. You will now have 1440 KM left to play with.</p>
            <IonButton expand="full" className="bottom" onClick={handleStartGame}>Start Game</IonButton>
          </IonCol>
        }
      </IonContent>
    </IonPage>
  );
};

export default Home;
