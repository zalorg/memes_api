import { database } from 'firebase-admin'
import { Meme } from '../types/memes'
export default async function (meme: Meme) {
    const db = database();

    const ref = db.ref(`memes/${meme.id}`);

    return await ref.set(meme)
}