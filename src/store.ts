import { create } from 'zustand';

interface MetronomeState {
    bpm: number;
    beatsPerMeasure: number;
    isPlaying: boolean;
    setBPM: (newBPM: number) => void;
    setBeats: (newBeats: number) => void;
    togglePlay: () => void;
  }
  
  const useMetronomeStore = create<MetronomeState>((set) => ({
    bpm: 120,
    beatsPerMeasure: 4,
    isPlaying: false,
    setBPM: (newBPM) => set({ bpm: newBPM }),
    setBeats: (newBeats) => set({ beatsPerMeasure: newBeats }),
    togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying })),
  }));
  
  export default useMetronomeStore;
  