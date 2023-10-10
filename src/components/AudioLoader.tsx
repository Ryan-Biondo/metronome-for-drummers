
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
    urls: string[],
    setIsLoaded: (status: boolean) => void
  ): Promise<boolean> {
    const context = new AudioContext();
  
    const promises: Promise<AudioBuffer>[] = urls.map((url: string) =>
      fetch(url)
        .then((res: Response) => res.arrayBuffer())
        .then((arrayBuffer: ArrayBuffer) => context.decodeAudioData(arrayBuffer))
    );
  
    return Promise.all(promises)
      .then((buffers: AudioBuffer[]) => {
        setBuffers(buffers);
        setIsLoaded(true);  // Set isLoaded to true here.
        return true;  // This will resolve the outer promise to true.
      })
      .catch(err => {
        console.error(err);
        setIsLoaded(false);  // If there's an error, ensure isLoaded is set to false.
        return false;  // This will resolve the outer promise to false.
      });
  }
  
  export default AudioLoader;
