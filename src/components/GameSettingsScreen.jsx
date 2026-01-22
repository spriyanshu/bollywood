import { useGame, SCREENS, CATEGORIES } from '../context/GameContext';
import './GameSettingsScreen.css';

const GameSettingsScreen = () => {
  const {
    industry,
    categories,
    pointsPerWin,
    setIndustry,
    toggleCategory,
    setPointsPerWin,
    setScreen,
    startGameplay
  } = useGame();

  return (
    <div className="game-settings-screen">
      {/* Background */}
      <div className="bg-gradient"></div>

      {/* Header */}
      <header className="screen-header">
        <button className="back-btn" onClick={() => setScreen(SCREENS.PLAYER_SETUP)}>
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
          </svg>
        </button>
        <div className="header-center">
          <span className="step-badge">STEP 2 OF 2</span>
          <h1 className="screen-title">Game Settings</h1>
        </div>
        <div className="spacer"></div>
      </header>

      {/* Main content */}
      <main className="settings-content">
        {/* Industry Selection */}
        <section className="settings-section">
          <div className="section-header">
            <div className="section-icon">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M18 4l2 4h-3l-2-4h-2l2 4h-3l-2-4H8l2 4H7L5 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4h-4z"/>
              </svg>
            </div>
            <h2 className="section-title">Choose Industry</h2>
          </div>
          <div className="industry-grid">
            <button
              className={`industry-card ${industry === 'Bollywood' ? 'selected' : ''}`}
              onClick={() => setIndustry('Bollywood')}
            >
              <div className="industry-flag">🇮🇳</div>
              <div className="industry-name">Bollywood</div>
              <div className="industry-desc">Hindi Cinema</div>
              {industry === 'Bollywood' && (
                <div className="selected-badge">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                  </svg>
                </div>
              )}
            </button>
            <button
              className={`industry-card ${industry === 'Hollywood' ? 'selected' : ''}`}
              onClick={() => setIndustry('Hollywood')}
            >
              <div className="industry-flag">🇺🇸</div>
              <div className="industry-name">Hollywood</div>
              <div className="industry-desc">English Cinema</div>
              {industry === 'Hollywood' && (
                <div className="selected-badge">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                  </svg>
                </div>
              )}
            </button>
          </div>
        </section>

        {/* Category Selection */}
        <section className="settings-section">
          <div className="section-header">
            <div className="section-icon">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z"/>
              </svg>
            </div>
            <h2 className="section-title">Select Categories</h2>
            <span className="section-hint">{categories.length} selected</span>
          </div>
          <div className="category-grid">
            {CATEGORIES.map((cat) => {
              const isSelected = categories.includes(cat.id);
              const icons = {
                MOVIE: '🎬',
                DIALOGUE: '💬',
                VILLAIN: '😈',
                ACTOR: '🌟',
                CHARACTER: '🎭',
                SONG: '🎵'
              };
              return (
                <button
                  key={cat.id}
                  className={`category-card ${isSelected ? 'selected' : ''}`}
                  onClick={() => toggleCategory(cat.id)}
                >
                  <span className="category-icon">{icons[cat.id]}</span>
                  <span className="category-label">{cat.label}</span>
                  <div className="category-checkbox">
                    {isSelected ? (
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                      </svg>
                    ) : (
                      <div className="checkbox-empty"></div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* Points Setting */}
        <section className="settings-section">
          <div className="section-header">
            <div className="section-icon">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 5h-2V3H7v2H5c-1.1 0-2 .9-2 2v1c0 2.55 1.92 4.63 4.39 4.94.63 1.5 1.98 2.63 3.61 2.96V19H7v2h10v-2h-4v-3.1c1.63-.33 2.98-1.46 3.61-2.96C19.08 12.63 21 10.55 21 8V7c0-1.1-.9-2-2-2z"/>
              </svg>
            </div>
            <h2 className="section-title">Points Per Win</h2>
          </div>
          <div className="points-control">
            <button
              className="points-btn minus"
              onClick={() => setPointsPerWin(pointsPerWin - 5)}
              disabled={pointsPerWin <= 5}
            >
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 13H5v-2h14v2z"/>
              </svg>
            </button>
            <div className="points-display">
              <span className="points-value">{pointsPerWin}</span>
              <span className="points-label">points</span>
            </div>
            <button
              className="points-btn plus"
              onClick={() => setPointsPerWin(pointsPerWin + 5)}
              disabled={pointsPerWin >= 100}
            >
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
              </svg>
            </button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="settings-footer">
        <button className="start-btn" onClick={startGameplay}>
          <svg className="start-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5v14l11-7z"/>
          </svg>
          <span>Start Game!</span>
        </button>
      </footer>
    </div>
  );
};

export default GameSettingsScreen;
