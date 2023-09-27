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

  }
  
  const useMetronomeStore = create<MetronomeState>((set) => ({
    bpm: 120,
    beatsPerMeasure: 4,
    isPlaying: false,
    buffers: [],
    urls: [SnareSound, SnareSound],
    startNum: 0,
    soundNum: 0,
    nextStart: 1,
    startTime: 0,
    setStartTime: (newStartTime) => set({startTime: newStartTime}),
    setNextStart: (newNextStart) => set({nextStart : newNextStart}),
    setBPM: (newBPM) => set({ bpm: newBPM }),
    setBeats: (newBeats) => set({ beatsPerMeasure: newBeats }),
    togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying })),
    setBuffers: (newBuffers) => set({ buffers: newBuffers}),
    AudioLoader: AudioLoader
  }));
  
  export default useMetronomeStore;
  