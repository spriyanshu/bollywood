import { useGame } from '../context/GameContext';
import './LandingScreen.css';

const LandingScreen = () => {
  const { startNewGame } = useGame();

  return (
    <div className="landing-screen">
      {/* Animated background */}
      <div className="bg-effects">
        <div className="glow-orb orb-1"></div>
        <div className="glow-orb orb-2"></div>
        <div className="glow-orb orb-3"></div>
        <div className="grid-overlay"></div>
      </div>

      {/* Floating film elements */}
      <div className="floating-elements">
        <svg className="float-icon icon-1" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18 4l2 4h-3l-2-4h-2l2 4h-3l-2-4H8l2 4H7L5 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4h-4z"/>
        </svg>
        <svg className="float-icon icon-2" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
        </svg>
        <svg className="float-icon icon-3" viewBox="0 0 24 24" fill="currentColor">
          <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"/>
        </svg>
        <div className="float-icon icon-4">🎬</div>
        <div className="float-icon icon-5">⭐</div>
        <div className="float-icon icon-6">🎭</div>
      </div>

      {/* Main content */}
      <main className="landing-content">
        {/* Badge */}
        <div className="edition-badge">
          <span className="badge-icon">🏆</span>
          <span className="badge-text">RETRO EDITION</span>
        </div>

        {/* Logo area */}
        <div className="logo-section">
          <div className="logo-icon">
            <svg viewBox="0 0 100 100" className="film-reel-svg">
              <circle cx="50" cy="50" r="45" fill="none" stroke="url(#goldGradient)" strokeWidth="4"/>
              <circle cx="50" cy="50" r="35" fill="none" stroke="url(#goldGradient)" strokeWidth="2"/>
              <circle cx="50" cy="25" r="8" fill="url(#goldGradient)"/>
              <circle cx="71.65" cy="37.5" r="8" fill="url(#goldGradient)"/>
              <circle cx="71.65" cy="62.5" r="8" fill="url(#goldGradient)"/>
              <circle cx="50" cy="75" r="8" fill="url(#goldGradient)"/>
              <circle cx="28.35" cy="62.5" r="8" fill="url(#goldGradient)"/>
              <circle cx="28.35" cy="37.5" r="8" fill="url(#goldGradient)"/>
              <circle cx="50" cy="50" r="12" fill="url(#pinkGradient)"/>
              <defs>
                <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FFD700"/>
                  <stop offset="100%" stopColor="#FFA500"/>
                </linearGradient>
                <linearGradient id="pinkGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FF2D55"/>
                  <stop offset="100%" stopColor="#FF6B8A"/>
                </linearGradient>
              </defs>
            </svg>
          </div>
          
          <h1 className="main-title">
            <span className="title-top">BOLLYWOOD</span>
            <span className="title-bottom">BATTLE</span>
          </h1>
          
          <p className="tagline">The Ultimate Movie Quiz Showdown!</p>
        </div>

        {/* Stats badges */}
        <div className="stats-row">
          <div className="stat-badge">
            <span className="stat-icon">🎯</span>
            <span className="stat-value">60+</span>
            <span className="stat-label">Questions</span>
          </div>
          <div className="stat-badge">
            <span className="stat-icon">🎬</span>
            <span className="stat-value">6</span>
            <span className="stat-label">Categories</span>
          </div>
          <div className="stat-badge">
            <span className="stat-icon">🌍</span>
            <span className="stat-value">2</span>
            <span className="stat-label">Industries</span>
          </div>
        </div>

        {/* CTA Button */}
        <button className="cta-button" onClick={startNewGame}>
          <span className="button-bg"></span>
          <span className="button-content">
            <svg className="play-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z"/>
            </svg>
            <span>START GAME</span>
          </span>
        </button>

        {/* Features */}
        <div className="features-row">
          <div className="feature">
            <span className="feature-icon">📱</span>
            <span className="feature-text">Host Controlled</span>
          </div>
          <div className="feature-divider"></div>
          <div className="feature">
            <span className="feature-icon">🎉</span>
            <span className="feature-text">Party Game</span>
          </div>
          <div className="feature-divider"></div>
          <div className="feature">
            <span className="feature-icon">⚡</span>
            <span className="feature-text">No Internet</span>
          </div>
        </div>
      </main>

      {/* Bottom decoration */}
      <div className="bottom-decoration">
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none">
          <path fill="url(#waveGradient)" d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,69.3C960,85,1056,107,1152,101.3C1248,96,1344,64,1392,48L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"/>
          <defs>
            <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FF2D55" stopOpacity="0.3"/>
              <stop offset="50%" stopColor="#FFD700" stopOpacity="0.2"/>
              <stop offset="100%" stopColor="#FF2D55" stopOpacity="0.3"/>
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
};

export default LandingScreen;
