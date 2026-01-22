import { createContext, useContext, useState, useEffect } from 'react';
import { getFilteredCards, shuffleArray } from '../data/cards';

const GameContext = createContext(null);

// Game screens/phases
export const SCREENS = {
  LANDING: 'LANDING',
  PLAYER_SETUP: 'PLAYER_SETUP',
  GAME_SETTINGS: 'GAME_SETTINGS',
  GAMEPLAY: 'GAMEPLAY',
  GAME_END: 'GAME_END'
};

// Category options
export const CATEGORIES = [
  { id: 'MOVIE', label: 'Guess the Movie' },
  { id: 'DIALOGUE', label: 'Guess the Dialogue' },
  { id: 'VILLAIN', label: 'Guess the Villain' },
  { id: 'ACTOR', label: 'Guess the Actor / Actress' },
  { id: 'CHARACTER', label: 'Guess the Character' },
  { id: 'SONG', label: 'Guess the Song' }
];

// Initial game state
const initialState = {
  screen: SCREENS.LANDING,
  industry: 'Bollywood',
  categories: ['MOVIE', 'DIALOGUE', 'SONG'],
  players: [],
  pointsPerWin: 10,
  cards: [],
  currentCardIndex: 0,
  isAnswerRevealed: false
};

// Load state from localStorage
const loadState = () => {
  try {
    const saved = localStorage.getItem('bollywoodBattle');
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    console.error('Failed to load game state:', e);
  }
  return initialState;
};

export const GameProvider = ({ children }) => {
  const [state, setState] = useState(loadState);

  // Save to localStorage on state change
  useEffect(() => {
    localStorage.setItem('bollywoodBattle', JSON.stringify(state));
  }, [state]);

  // Navigation
  const setScreen = (screen) => {
    setState(prev => ({ ...prev, screen }));
  };

  const startNewGame = () => {
    setState({ ...initialState, screen: SCREENS.PLAYER_SETUP });
  };

  // Player management
  const addPlayer = (name) => {
    if (!name.trim()) return;
    setState(prev => ({
      ...prev,
      players: [...prev.players, {
        id: Date.now(),
        name: name.trim(),
        score: 0
      }]
    }));
  };

  const removePlayer = (id) => {
    setState(prev => ({
      ...prev,
      players: prev.players.filter(p => p.id !== id)
    }));
  };

  // Game settings
  const setIndustry = (industry) => {
    setState(prev => ({ ...prev, industry }));
  };

  const toggleCategory = (categoryId) => {
    setState(prev => {
      const exists = prev.categories.includes(categoryId);
      if (exists && prev.categories.length === 1) {
        return prev; // Must have at least one category
      }
      return {
        ...prev,
        categories: exists
          ? prev.categories.filter(c => c !== categoryId)
          : [...prev.categories, categoryId]
      };
    });
  };

  const setPointsPerWin = (points) => {
    setState(prev => ({ ...prev, pointsPerWin: Math.max(1, parseInt(points) || 10) }));
  };

  // Start gameplay
  const startGameplay = () => {
    const filteredCards = getFilteredCards(state.industry, state.categories);
    const shuffledCards = shuffleArray(filteredCards);
    setState(prev => ({
      ...prev,
      cards: shuffledCards,
      currentCardIndex: 0,
      isAnswerRevealed: false,
      screen: SCREENS.GAMEPLAY
    }));
  };

  // Gameplay actions
  const revealAnswer = () => {
    setState(prev => ({ ...prev, isAnswerRevealed: true }));
  };

  const awardPoints = (playerIds) => {
    setState(prev => ({
      ...prev,
      players: prev.players.map(player =>
        playerIds.includes(player.id)
          ? { ...player, score: player.score + prev.pointsPerWin }
          : player
      )
    }));
  };

  const nextCard = () => {
    setState(prev => ({
      ...prev,
      currentCardIndex: prev.currentCardIndex + 1,
      isAnswerRevealed: false
    }));
  };

  const getCurrentCard = () => {
    return state.cards[state.currentCardIndex] || null;
  };

  const hasMoreCards = () => {
    return state.currentCardIndex < state.cards.length - 1;
  };

  // End game
  const endGame = () => {
    setState(prev => ({ ...prev, screen: SCREENS.GAME_END }));
  };

  const restartWithSamePlayers = () => {
    const filteredCards = getFilteredCards(state.industry, state.categories);
    const shuffledCards = shuffleArray(filteredCards);
    setState(prev => ({
      ...prev,
      cards: shuffledCards,
      currentCardIndex: 0,
      isAnswerRevealed: false,
      players: prev.players.map(p => ({ ...p, score: 0 })),
      screen: SCREENS.GAMEPLAY
    }));
  };

  const value = {
    ...state,
    setScreen,
    startNewGame,
    addPlayer,
    removePlayer,
    setIndustry,
    toggleCategory,
    setPointsPerWin,
    startGameplay,
    revealAnswer,
    awardPoints,
    nextCard,
    getCurrentCard,
    hasMoreCards,
    endGame,
    restartWithSamePlayers
  };

  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};
