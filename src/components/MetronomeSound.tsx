import { useEffect, useRef } from 'react';
import useMetronomeStore from '../store';

interface MetronomeSoundProps {
    isPlaying: boolean;
}

const MetronomeSound: React.FC<MetronomeSoundProps> = ({ isPlaying }) => {
    const {
        setBPM,
        bpm,
        buffers,
        soundNum,
        setStartTime,
        nextStart,
        setNextStart
    } = useMetronomeStore();

    const audioContextRef = useRef<AudioContext>(new AudioContext());
    const currentSourceRef = useRef<AudioBufferSourceNode | null>(null);
    const shouldContinuePlayingRef = useRef<boolean>(true);
    console.log("AudioContext state:", audioContextRef.current.state);

    function stopPlaying(): void {
        shouldContinuePlayingRef.current = false;
        
        if (currentSourceRef.current) {
            currentSourceRef.current.stop();
            currentSourceRef.current.disconnect();
            currentSourceRef.current = null;
        }
    }

    function schedule(): void {
        if (!shouldContinuePlayingRef.current) return;

        const currentContextTime = audioContextRef.current.currentTime;
        const startTime = nextStart ?? currentContextTime;
        console.log("Current time:", currentContextTime);
console.log("Start time for next sound:", startTime);

        setStartTime(startTime);
        const bufIndex = soundNum - 1;

        if (bufIndex >= buffers.length) {
            alert('Sound files are not yet loaded');
            return;
        }

        if (bpm) {
            const interval = 60 / bpm;
            console.log("Interval (in seconds):", interval);
            const newNextStart = startTime + interval;
            
            if (isNaN(newNextStart) || !isFinite(newNextStart)) {
                console.error("Computed next start time is invalid:", newNextStart);
                return;
            }
            setNextStart(newNextStart);

            const newSource = audioContextRef.current.createBufferSource();
            const selectedBuffer: AudioBuffer = buffers[bufIndex];
            newSource.buffer = selectedBuffer;
            newSource.connect(audioContextRef.current.destination);
            newSource.onended = () => {
                console.log("Sound ended!");
                if (shouldContinuePlayingRef.current) {
                    schedule();
                }
            };
            newSource.start(startTime);
            console.log("Sound will start at:", startTime);
            currentSourceRef.current = newSource;
        }
    }

    useEffect(() => {
        if (isPlaying) {
            shouldContinuePlayingRef.current = true;
            schedule();
        } else {
            stopPlaying();
        }
    }, [isPlaying, bpm]);

    return null;
};

export default MetronomeSound;