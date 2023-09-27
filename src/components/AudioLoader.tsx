
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

 function AudioLoader (setBuffers: (buffers: AudioBuffer[]) => void, urls:string[]) {
    const context = new AudioContext
    const promises:Promise<AudioBuffer>[] = urls.map((url: string) =>
        fetch(url)
        .then((res: Response) => res.arrayBuffer())
        .then((arrayBuffer: ArrayBuffer) => context.decodeAudioData(arrayBuffer)))

        Promise.all(promises)
            .then((buffers: Awaited<AudioBuffer>[]) => setBuffers(buffers))
            .catch(err => console.error(err))

}

export default AudioLoader
