import { create } from 'zustand';
import SnareSound from './components/audio/snare-drum-808-3.wav'
import AudioLoader from './components/AudioLoader';

interface MetronomeState {
    bpm: number;
    beatsPerMeasure: number;
    isPlaying: boolean;
    buffers: AudioBuffer[];
    urls: Array<string>
    setBPM: (newBPM: number) => void;
    setBeats: (newBeats: number) => void;
    togglePlay: () => void;
    setBuffers: (newBuffers: AudioBuffer[]) => void;
    AudioLoader : typeof AudioLoader;
    startNum: number;
    setStartTime: (newStartTime: number) => void;
    soundNum: number;
    nextStart:  number;
    setNextStart:  (newStartNum: number) => void;
    startTime: number;
    isLoaded: boolean;
    setIsLoaded: () => void;

  }
  
  const useMetronomeStore = create<MetronomeState>((set) => ({
    bpm: 78,
    beatsPerMeasure: 4,
    isPlaying: false,
    isLoaded: false,
    buffers: [],
    urls: [SnareSound, SnareSound],
    startNum: 0,
    soundNum: 1,
    nextStart: 0,
    startTime: 0,
    setIsLoaded: () => set((state) => ({isLoaded: !state.isLoaded})),
    setStartTime: (newStartTime) => set({startTime: newStartTime}),
    setNextStart: (newNextStart) => set({nextStart : newNextStart}),
    setBPM: (newBPM) => set({ bpm: newBPM }),
    setBeats: (newBeats) => set({ beatsPerMeasure: newBeats }),
    togglePlay:() => set((state) => {
      console.log("Toggling play from:", state.isPlaying, "to:", !state.isPlaying);
      return { isPlaying: !state.isPlaying };
  }),
    setBuffers: (newBuffers) => set({ buffers: newBuffers}),
    AudioLoader: AudioLoader
  }));
  
  export default useMetronomeStore;
  