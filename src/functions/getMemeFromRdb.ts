import { database } from "firebase-admin";
import { Meme } from "../types/memes";
import { set } from 'quick.db'

export default async function fetchMemeFromDB(id: string): Promise<Meme> {
    const db = database();
    const dbRef = db.ref(`memes/${id}`);
    console.log(`Fetching meme with id ${id}`);
    const meme = await dbRef.once("value");
    set(`memes.${id}`, meme.val());
    console.log(`Meme ${id} fetched`);
    return meme.val();
}