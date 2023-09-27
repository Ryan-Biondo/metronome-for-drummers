import AudioLoader from './AudioLoader';
import {useEffect} from 'react';
import useMetronomeStore from '../store';
 const MetronomeSound = () => {
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
        const newSource = audioContext.createBufferSource();  
        if (bufIndex >= buffers.length) {
            alert('Sound files are not yet loaded')
        } else if (bpm) {
            const newNextStart = nextStart + 60 / bpm;
            setNextStart(newNextStart);
        const selectedBuffer: AudioBuffer = buffers[bufIndex];
        newSource.buffer = selectedBuffer;  // Use new instance
        newSource.connect(audioContext.destination);
        newSource.onended = () => schedule();
        newSource.start(nextStart);  // Call start on the new instance
            }
        }
        useEffect(() => {
            if (isPlaying) {
                schedule();
            } else {
                stopPlaying();
            }
    
            // Cleanup logic if needed
            return () => {
                stopPlaying();
            };
        }, [isPlaying, bpm]);
      return null
}


export default MetronomeSound