import { database } from "firebase-admin";
import { set } from 'quick.db';

export default async function getMemeList() {
  const db = database();
  const ref = db.ref('memes');
  console.log('Fetching meme list');
  const memes = await ref.once('value');
  console.log('Meme list fetched');
  const memeList = memes.val();
  let map = new Map(Object.entries(memeList));
  const a: string[] = []
  map.forEach((value: any, key) => {
      a.push(value.id);
  })
  set('memesList', a)
  console.log('Meme list saved');
  return a;
}