import { useState } from 'react';
import { useGame, SCREENS } from '../context/GameContext';
import './PlayerSetupScreen.css';

const PlayerSetupScreen = () => {
  const { players, addPlayer, removePlayer, setScreen } = useGame();
  const [newPlayerName, setNewPlayerName] = useState('');

  const handleAddPlayer = (e) => {
    e.preventDefault();
    if (newPlayerName.trim()) {
      addPlayer(newPlayerName);
      setNewPlayerName('');
    }
  };

  const canContinue = players.length >= 2;

  return (
    <div className="player-setup-screen">
      {/* Background */}
      <div className="bg-gradient"></div>
      
      {/* Header */}
      <header className="screen-header">
        <button className="back-btn" onClick={() => setScreen(SCREENS.LANDING)}>
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
          </svg>
        </button>
        <div className="header-center">
          <span className="step-badge">STEP 1 OF 2</span>
          <h1 className="screen-title">Add Players</h1>
        </div>
        <div className="player-count-badge">
          <span className="count-number">{players.length}</span>
          <span className="count-label">Players</span>
        </div>
      </header>

      {/* Main content */}
      <main className="setup-content">
        {/* Add player form */}
        <form className="add-player-form" onSubmit={handleAddPlayer}>
          <div className="input-wrapper">
            <svg className="input-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
            </svg>
            <input
              type="text"
              value={newPlayerName}
              onChange={(e) => setNewPlayerName(e.target.value)}
              placeholder="Enter player name..."
              className="player-input"
              maxLength={20}
              autoComplete="off"
            />
          </div>
          <button type="submit" className="add-btn" disabled={!newPlayerName.trim()}>
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
            </svg>
            <span>Add</span>
          </button>
        </form>

        {/* Player list */}
        <div className="player-list-container">
          {players.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
                </svg>
              </div>
              <p className="empty-text">Add at least 2 players to start</p>
              <p className="empty-hint">Everyone plays on the same device!</p>
            </div>
          ) : (
            <ul className="player-list">
              {players.map((player, index) => (
                <li key={player.id} className="player-item" style={{ animationDelay: `${index * 0.05}s` }}>
                  <div className="player-avatar">
                    <span>{player.name.charAt(0).toUpperCase()}</span>
                  </div>
                  <span className="player-name">{player.name}</span>
                  <button
                    className="remove-btn"
                    onClick={() => removePlayer(player.id)}
                    aria-label={`Remove ${player.name}`}
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                    </svg>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="setup-footer">
        {!canContinue && (
          <div className="min-players-hint">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
            </svg>
            <span>Need at least 2 players</span>
          </div>
        )}
        <button
          className="continue-btn"
          onClick={() => setScreen(SCREENS.GAME_SETTINGS)}
          disabled={!canContinue}
        >
          <span>Continue</span>
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/>
          </svg>
        </button>
      </footer>
    </div>
  );
};

export default PlayerSetupScreen;
