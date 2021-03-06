import { createContext, ReactNode, useState } from 'react';

interface IEpisodePlayer {
  title: string;
  members: string;
  thumbnail: string;
  duration: number;
  url: string;
}

interface IPlayerContext {
  episodeList: IEpisodePlayer[];
  currentEpisodeIndex: number;
  isPlaying: boolean;
  play: (episode: IEpisodePlayer) => void;
  togglePlay: () => void;
  setPlayingState: (state: boolean) => void;
  playList: (list: IEpisodePlayer[], index: number) => void;
  playNext: () => void;
  playPrevious: () => void;
}

export const PlayerContext = createContext({} as IPlayerContext);

interface PlayerContextProviderProps {
  children: ReactNode;
}

export function PlayerContextProvider({
  children,
}: PlayerContextProviderProps) {
  const [episodeList, setEpisodeList] = useState([]);
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  function play(episode: IEpisodePlayer) {
    setEpisodeList([episode]);
    setCurrentEpisodeIndex(0);
    setIsPlaying(true);
  }

  function playList(list: IEpisodePlayer[], index: number) {
    setEpisodeList(list);
    setCurrentEpisodeIndex(index);
    setIsPlaying(true);
  }

  function togglePlay() {
    setIsPlaying(!isPlaying);
  }
  function setPlayingState(state: boolean) {
    setIsPlaying(state);
  }

  function playNext() {
    const nextEpisodeIndex = currentEpisodeIndex + 1;
    if (nextEpisodeIndex > episodeList.length) {
      return;
    }
    setCurrentEpisodeIndex(nextEpisodeIndex);
  }

  function playPrevious() {
    const previousEpisodeIndex = currentEpisodeIndex - 1;
    if (previousEpisodeIndex > 0) {
      setCurrentEpisodeIndex(previousEpisodeIndex);
    }
  }
  return (
    <PlayerContext.Provider
      value={{
        episodeList,
        currentEpisodeIndex,
        isPlaying,
        play,
        togglePlay,
        setPlayingState,
        playList,
        playNext,
        playPrevious,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}
