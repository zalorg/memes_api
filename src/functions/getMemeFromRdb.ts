import { database } from "firebase-admin";
import { Meme } from "../types/memes";
import { set } from 'quick.db'

export default async function fetchMemeFromDB(id: string): Promise<Meme> {
    const db = database();
    const dbRef = db.ref(`memes/${id}`);
    const meme = await dbRef.once("value");
    set(`memes.${id}`, meme.val());
    return meme.val();
}