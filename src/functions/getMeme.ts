import { Meme } from '../types/memes';
import getMemeFromLocalCache from './getMemeFromLocalCache';
import getMemeFromRdb from './getMemeFromRdb';
export default async function getMeme(id: string): Promise<Meme | null> {
  const meme = getMemeFromLocalCache(id)
  if (meme) {
    return meme
  }
  const memeFromRdb = await getMemeFromRdb(id)
  if (memeFromRdb) {
    return memeFromRdb
  }
  return null;  
}