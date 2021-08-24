import { get } from 'quick.db'
import { Meme } from '../types/memes'

export default function (id: string): Meme | null {
    const meme: Meme = get(`memes.${id}`)
    if(meme) {
        return meme;
    }
    return null;
}