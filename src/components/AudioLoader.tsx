
// export default class AudioLoader {
//     buffers: AudioBuffer[]

//     constructor(context: AudioContext, urls: string[]) {
//         this.buffers = []

//         const promises: Promise<AudioBuffer>[] = urls.map((url: string) =>
//             fetch(url)
//                 .then((response: Response) => response.arrayBuffer())
//                 .then((arrayBuffer: ArrayBuffer) => context.decodeAudioData(arrayBuffer)))

//         Promise.all(promises)
//             .then((buffers: Awaited<AudioBuffer>[]) => this.buffers = buffers)
//             .catch(error => console.error(error))
//     }
// }

function AudioLoader(
    setBuffers: (buffers: AudioBuffer[]) => void, 
    urls: string[]
  ): Promise<boolean> {
    const context = new AudioContext();
  
    // Map each URL to a promise that fetches and decodes the audio data
    const promises = urls.map((url) =>
      fetch(url)
        .then((res) => res.arrayBuffer())
        .then((arrayBuffer) => context.decodeAudioData(arrayBuffer))
    );
  
    return Promise.all(promises)
      .then((buffers) => {
        setBuffers(buffers); // Set the buffers in the store
        return true;  // Successfully loaded all audio files
      })
      .catch((err) => {
        console.error("Error loading audio files:", err);
        return false;  // Failed to load all audio files
      });
  }
  
  export default AudioLoader;