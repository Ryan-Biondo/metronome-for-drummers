import { create } from 'zustand';
import SnareSound from './components/audio/snare-drum-808-3.wav'
import HiHatSound from './components/audio/short-open-hi-hat.wav'
import AudioLoader from './components/AudioLoader';

interface MetronomeState {
  // Audio context
  audioContext: AudioContext;
  
  // Playback
  isPlaying: boolean;
  shouldDelay: boolean;
  togglePlay: () => void;
  setShouldDelay: (newVal: boolean) => void;
  
  // Timing
  bpm: number;
  subdivision: number;
  beatsPerMeasure: number;
  setBPM: (newBPM: number) => void;
  setBeats: (newBeats: number) => void;
  
  // Sound
  buffers: AudioBuffer[];
  urls: Array<string>;
  setBuffers: (newBuffers: AudioBuffer[]) => void;
  AudioLoader: typeof AudioLoader;
  isLoaded: boolean;
  setIsLoaded: () => void;
  
  // Current state
  currentBeat: number;
  startNum: number;
  soundNum: number;
  nextStart: number;
  startTime: number;
  setCurrentBeat: (newBeat: number) => void;
  setStartTime: (newStartTime: number) => void;
  setNextStart: (newStartNum: number) => void;
}

const useMetronomeStore = create<MetronomeState>((set) => ({
  // Audio context
  audioContext: new AudioContext(),
  
  // Playback
  isPlaying: false,
  shouldDelay: false,
  togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying })),
  setShouldDelay: (value: boolean) => set({ shouldDelay: value }),
  
  // Timing
  bpm: 120,
  subdivision: 3,
  beatsPerMeasure: 4,
  setBPM: (newBPM) => set({ bpm: newBPM }),
  setBeats: (newBeats) => set({ beatsPerMeasure: newBeats }),
  
  // Sound
  buffers: [],
  urls: [SnareSound, HiHatSound],
  setBuffers: (newBuffers) => set({ buffers: newBuffers }),
  AudioLoader: AudioLoader,
  isLoaded: false,
  setIsLoaded: () => set((state) => ({ isLoaded: !state.isLoaded })),
  
  // Current state
  currentBeat: 1,
  startNum: 0,
  soundNum: 1,
  nextStart: 0,
  startTime: 0,
  setCurrentBeat: (newBeat) => set({ currentBeat: newBeat }),
  setStartTime: (newStartTime) => set({ startTime: newStartTime }),
  setNextStart: (newNextStart) => set({ nextStart: newNextStart }),
}));

export default useMetronomeStore;
