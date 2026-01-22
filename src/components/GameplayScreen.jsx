import { useState } from 'react';
import { useGame, CATEGORIES } from '../context/GameContext';
import './GameplayScreen.css';

const GameplayScreen = () => {
  const {
    players,
    industry,
    pointsPerWin,
    currentCardIndex,
    cards,
    isAnswerRevealed,
    getCurrentCard,
    hasMoreCards,
    revealAnswer,
    awardPoints,
    nextCard,
    endGame
  } = useGame();

  const [selectedWinners, setSelectedWinners] = useState([]);
  const card = getCurrentCard();

  // Get sorted players for leaderboard
  const sortedPlayers = [...players].sort((a, b) => b.score - a.score);

  // Get category label
  const getCategoryLabel = (categoryId) => {
    const cat = CATEGORIES.find(c => c.id === categoryId);
    return cat ? cat.label : categoryId;
  };

  const categoryIcons = {
    MOVIE: '🎬',
    DIALOGUE: '💬',
    VILLAIN: '😈',
    ACTOR: '🌟',
    CHARACTER: '🎭',
    SONG: '🎵'
  };

  const handleToggleWinner = (playerId) => {
    setSelectedWinners(prev =>
      prev.includes(playerId)
        ? prev.filter(id => id !== playerId)
        : [...prev, playerId]
    );
  };

  const handleAwardPoints = () => {
    if (selectedWinners.length > 0) {
      awardPoints(selectedWinners);
    }
    setSelectedWinners([]);
    handleNextCard();
  };

  const handleSkip = () => {
    setSelectedWinners([]);
    handleNextCard();
  };

  const handleNextCard = () => {
    if (hasMoreCards()) {
      nextCard();
    } else {
      endGame();
    }
  };

  if (!card) {
    return (
      <div className="gameplay-screen">
        <div className="no-cards">
          <div className="no-cards-icon">🎬</div>
          <h2>No Cards Available</h2>
          <p>Try selecting different categories</p>
          <button className="btn-primary" onClick={endGame}>End Game</button>
        </div>
      </div>
    );
  }

  return (
    <div className="gameplay-screen">
      {/* Background */}
      <div className="bg-gradient"></div>

      {/* Header */}
      <header className="game-header">
        <div className="header-left">
          <span className="industry-tag">{industry === 'Bollywood' ? '🇮🇳' : '🇺🇸'} {industry}</span>
        </div>
        <div className="card-progress">
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${((currentCardIndex + 1) / cards.length) * 100}%` }}
            ></div>
          </div>
          <span className="progress-text">{currentCardIndex + 1} / {cards.length}</span>
        </div>
        <button className="end-btn" onClick={endGame}>
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
          </svg>
        </button>
      </header>

      {/* Main game area */}
      <main className="game-main">
        {/* Question Card */}
        <div className={`question-card ${isAnswerRevealed ? 'revealed' : ''}`}>
          {/* Category badge */}
          <div className="category-badge">
            <span className="category-icon">{categoryIcons[card.category]}</span>
            <span className="category-text">{getCategoryLabel(card.category)}</span>
          </div>

          {/* Question content */}
          <div className="card-content">
            <p className="question-text">{card.clues}</p>
            
            {card.media && (
              <div className="hint-box">
                <svg className="hint-icon" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
                </svg>
                <p className="hint-text">{card.media.content}</p>
              </div>
            )}
          </div>

          {/* Answer section */}
          {!isAnswerRevealed ? (
            <button className="reveal-btn" onClick={revealAnswer}>
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
              </svg>
              <span>Reveal Answer</span>
            </button>
          ) : (
            <div className="answer-box">
              <span className="answer-label">ANSWER</span>
              <span className="answer-text">{card.answer}</span>
            </div>
          )}
        </div>

        {/* Winner selection */}
        {isAnswerRevealed && (
          <div className="winner-section">
            <h3 className="winner-title">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 5h-2V3H7v2H5c-1.1 0-2 .9-2 2v1c0 2.55 1.92 4.63 4.39 4.94.63 1.5 1.98 2.63 3.61 2.96V19H7v2h10v-2h-4v-3.1c1.63-.33 2.98-1.46 3.61-2.96C19.08 12.63 21 10.55 21 8V7c0-1.1-.9-2-2-2z"/>
              </svg>
              Who got it right?
            </h3>
            <div className="winner-grid">
              {players.map(player => (
                <button
                  key={player.id}
                  className={`winner-btn ${selectedWinners.includes(player.id) ? 'selected' : ''}`}
                  onClick={() => handleToggleWinner(player.id)}
                >
                  <div className="winner-avatar">{player.name.charAt(0).toUpperCase()}</div>
                  <span className="winner-name">{player.name}</span>
                  {selectedWinners.includes(player.id) && (
                    <span className="winner-points">+{pointsPerWin}</span>
                  )}
                </button>
              ))}
            </div>
            <div className="action-btns">
              <button 
                className="award-btn" 
                onClick={handleAwardPoints}
              >
                {selectedWinners.length > 0 
                  ? `Award +${pointsPerWin * selectedWinners.length} Points` 
                  : hasMoreCards() ? 'Next Card' : 'Finish Game'}
              </button>
              {selectedWinners.length > 0 && (
                <button className="skip-btn" onClick={handleSkip}>
                  Skip (No Winner)
                </button>
              )}
            </div>
          </div>
        )}
      </main>

      {/* Leaderboard */}
      <aside className="leaderboard">
        <div className="leaderboard-header">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M7.5 21H2V9h5.5v12zm7.25-18h-5.5v18h5.5V3zM22 11h-5.5v10H22V11z"/>
          </svg>
          <span>Leaderboard</span>
        </div>
        <div className="leaderboard-list">
          {sortedPlayers.map((player, index) => (
            <div 
              key={player.id} 
              className={`leaderboard-item ${index === 0 && player.score > 0 ? 'leader' : ''}`}
            >
              <span className="lb-rank">
                {index === 0 && player.score > 0 ? '👑' : `#${index + 1}`}
              </span>
              <span className="lb-name">{player.name}</span>
              <span className="lb-score">{player.score}</span>
            </div>
          ))}
        </div>
      </aside>
    </div>
  );
};

export default GameplayScreen;
