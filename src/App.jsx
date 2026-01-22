import { GameProvider, useGame, SCREENS } from './context/GameContext';
import LandingScreen from './components/LandingScreen';
import PlayerSetupScreen from './components/PlayerSetupScreen';
import GameSettingsScreen from './components/GameSettingsScreen';
import GameplayScreen from './components/GameplayScreen';
import GameEndScreen from './components/GameEndScreen';
import './App.css';

// Screen router component
const ScreenRouter = () => {
  const { screen } = useGame();

  switch (screen) {
    case SCREENS.LANDING:
      return <LandingScreen />;
    case SCREENS.PLAYER_SETUP:
      return <PlayerSetupScreen />;
    case SCREENS.GAME_SETTINGS:
      return <GameSettingsScreen />;
    case SCREENS.GAMEPLAY:
      return <GameplayScreen />;
    case SCREENS.GAME_END:
      return <GameEndScreen />;
    default:
      return <LandingScreen />;
  }
};

function App() {
  return (
    <GameProvider>
      <div className="app">
        <ScreenRouter />
      </div>
    </GameProvider>
  );
}

export default App;
