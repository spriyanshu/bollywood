import { useGame } from '../context/GameContext';
import './GameEndScreen.css';

const GameEndScreen = () => {
  const { players, restartWithSamePlayers, startNewGame } = useGame();

  // Sort players by score
  const sortedPlayers = [...players].sort((a, b) => b.score - a.score);
  const winner = sortedPlayers[0];
  const hasWinner = winner && winner.score > 0;

  // Check for ties
  const topScore = hasWinner ? winner.score : 0;
  const winners = sortedPlayers.filter(p => p.score === topScore && p.score > 0);
  const isTie = winners.length > 1;

  return (
    <div className="game-end-screen">
      {/* Background effects */}
      <div className="bg-effects">
        <div className="glow-orb orb-1"></div>
        <div className="glow-orb orb-2"></div>
      </div>

      {/* Confetti */}
      {hasWinner && (
        <div className="confetti-container">
          {[...Array(30)].map((_, i) => (
            <div 
              key={i} 
              className={`confetti confetti-${i % 5}`}
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      )}

      {/* Main content */}
      <main className="end-content">
        {/* Trophy section */}
        <div className="trophy-section">
          <div className="trophy-glow"></div>
          <div className="trophy-icon">🏆</div>
          <h1 className="end-title">Game Over!</h1>
        </div>

        {/* Winner announcement */}
        {hasWinner ? (
          <div className="winner-announcement">
            {isTie ? (
              <>
                <span className="winner-label">IT'S A TIE!</span>
                <div className="winner-names">
                  {winners.map((w, i) => (
                    <span key={w.id} className="winner-name-item">
                      {w.name}{i < winners.length - 1 ? ' & ' : ''}
                    </span>
                  ))}
                </div>
              </>
            ) : (
              <>
                <span className="winner-label">WINNER</span>
                <span className="winner-name">{winner.name}</span>
              </>
            )}
            <div className="winner-score-badge">
              <span className="score-value">{topScore}</span>
              <span className="score-label">Points</span>
            </div>
          </div>
        ) : (
          <div className="no-winner">
            <p>No points scored this round!</p>
            <span className="no-winner-emoji">🎬</span>
          </div>
        )}

        {/* Final standings */}
        <div className="standings-card">
          <h2 className="standings-title">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M7.5 21H2V9h5.5v12zm7.25-18h-5.5v18h5.5V3zM22 11h-5.5v10H22V11z"/>
            </svg>
            Final Standings
          </h2>
          <div className="standings-list">
            {sortedPlayers.map((player, index) => (
              <div 
                key={player.id} 
                className={`standing-item rank-${index + 1}`}
              >
                <div className="rank-medal">
                  {index === 0 && player.score > 0 ? '🥇' : 
                   index === 1 && player.score > 0 ? '🥈' : 
                   index === 2 && player.score > 0 ? '🥉' : 
                   <span className="rank-num">#{index + 1}</span>}
                </div>
                <div className="player-info">
                  <span className="player-name">{player.name}</span>
                </div>
                <div className="player-score">{player.score}</div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Action buttons */}
      <footer className="end-footer">
        <button className="restart-btn" onClick={restartWithSamePlayers}>
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/>
          </svg>
          Play Again
        </button>
        <button className="new-game-btn" onClick={startNewGame}>
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
          </svg>
          New Game
        </button>
      </footer>
    </div>
  );
};

export default GameEndScreen;
