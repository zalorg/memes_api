import { get } from 'quick.db'
import { Meme } from "../types/memes";
import getMeme from './getMeme';
import getMemeList from './getMemeList';
export default async function getRandomMeme(): Promise<Meme> {
    const memeList: string[] = get('memesList');
    if (!memeList) {
        await getMemeList()
        return await getRandomMeme();
    }
    const randomIndex: number = Math.floor(Math.random() * memeList.length);
    const meme = await getMeme(memeList[randomIndex]);
    if (meme === null) {
        throw new Error(`Could not find meme with id ${memeList[randomIndex]}`);
        
    }
    return meme;
}