import { create } from 'zustand';

interface MetronomeState {
    bpm: number;
    beatsPerMeasure: number;
    isPlaying: boolean;
    buffers: Array<object>;
    setBPM: (newBPM: number) => void;
    setBeats: (newBeats: number) => void;
    togglePlay: () => void;
    setBuffers: (newBuffers: Array<object>) => void;
  }
  
  const useMetronomeStore = create<MetronomeState>((set) => ({
    bpm: 120,
    beatsPerMeasure: 4,
    isPlaying: false,
    buffers: [],
    setBPM: (newBPM) => set({ bpm: newBPM }),
    setBeats: (newBeats) => set({ beatsPerMeasure: newBeats }),
    togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying })),
    setBuffers: (newBuffers) => set({ buffers: newBuffers})
  }));
  
  export default useMetronomeStore;
  