import React, { createContext, useContext, useState, useEffect } from 'react';

const WatchlistContext = createContext();

export const STATUS = {
  WANT: 'Want to Watch',
  WATCHING: 'Watching',
  WATCHED: 'Watched',
};

export const WatchlistProvider = ({ children }) => {
  const [watchlist, setWatchlist] = useState(() => {
    try {
      const saved = localStorage.getItem('cinetrack-watchlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('cinetrack-watchlist', JSON.stringify(watchlist));
  }, [watchlist]);

  const addToWatchlist = (movie) => {
    setWatchlist((prev) => {
      if (prev.find((m) => m.id === movie.id)) return prev;
      return [...prev, { ...movie, status: STATUS.WANT, addedAt: new Date().toISOString() }];
    });
  };

  const removeFromWatchlist = (id) => {
    setWatchlist((prev) => prev.filter((m) => m.id !== id));
  };

  const updateStatus = (id, status) => {
    setWatchlist((prev) =>
      prev.map((m) => (m.id === id ? { ...m, status } : m))
    );
  };

  const isInWatchlist = (id) => watchlist.some((m) => m.id === id);

  const getStatus = (id) => {
    const item = watchlist.find((m) => m.id === id);
    return item ? item.status : null;
  };

  return (
    <WatchlistContext.Provider
      value={{ watchlist, addToWatchlist, removeFromWatchlist, updateStatus, isInWatchlist, getStatus }}
    >
      {children}
    </WatchlistContext.Provider>
  );
};

export const useWatchlist = () => useContext(WatchlistContext);
