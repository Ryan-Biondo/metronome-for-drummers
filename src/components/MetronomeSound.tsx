import { useState } from 'react';
import AudioLoader from './AudioLoader';
import useMetronomeStore from '../store';
export default function MetronomeSound () {
    const {isPlaying, setBPM, bpm, buffers, setBuffers, urls, soundNum, setStartTime, nextStart, setNextStart} = useMetronomeStore();
    AudioLoader(setBuffers, urls);
    const audioContext = new AudioContext
    // private soundFiles: AudioLoader
    const source = audioContext.createBufferSource();
        // const newUrls = urls.map(name => urls + name)
    function stopPlaying() {
        setBPM(0)
        if (source) {
            source.disconnect()
        }
    }

    function schedule(): void {
        if (!isPlaying) {
            stopPlaying();
            return  
        }
        setNextStart(audioContext.currentTime)
        setStartTime(nextStart)
        setBPM(bpm)
        const bufIndex = soundNum - 1
        if (bufIndex >= buffers.length) {
            alert('Sound files are not yet loaded')
        } else if (bpm) {
            setNextStart(nextStart += 60 / bpm)
            if (source) {
                const selectedBuffer: AudioBuffer = buffers[bufIndex]
               source.buffer = (selectedBuffer)
               source.connect(audioContext.destination)
               source.onended = () => schedule()
               source.start(nextStart)
            }
        }
    }
    schedule();
}