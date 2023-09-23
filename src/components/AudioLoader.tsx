import useMetronomeStore from '../store';
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

export default function AudioLoader(urls: string[], context: AudioContext) {
    const {setBuffers} = useMetronomeStore();
    const promises:Promise<AudioBuffer>[] = urls.map((url: string) =>
        fetch(url)
        .then((res: Response) => res.arrayBuffer())
        .then((arrayBuffer: ArrayBuffer) => context.decodeAudioData(arrayBuffer)))

        Promise.all(promises)
            .then((buffers: Awaited<AudioBuffer>[]) => setBuffers(buffers))
            .catch(err => console.error(err))

}
