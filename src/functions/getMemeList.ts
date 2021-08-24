import { database } from "firebase-admin";
import { set } from 'quick.db';

export default async function getMemeList() {
  const db = database();
  const ref = db.ref('memes');
  const memes = await ref.once('value');
  const memeList = memes.val();
  let map = new Map(Object.entries(memeList));
  const a: string[] = []
  map.forEach((value: any, key) => {
      a.push(value.id);
      set(`memes.${value.id}`, {
        id: value.id,
        image: value.image,
        title: value.title,
        subreddit: value.subreddit,
        author: value.author,
    })
  })
  set('memesList', a)
  return a;
}