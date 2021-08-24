import { default as axios } from 'axios';
import saveMemeToRRdb from './saveMemeToRRdb';
import { Meme } from '../types/memes';
export default async function fetchSubreddits(subreddits?: string | string[]): Promise<void> {
    console.log('Fetching subreddits...');
    try {
        const response = await axios.get('https://www.reddit.com/r/cursedcomments/hot.json?limit=100');
        const json = response.data;
        console.log(`Fetched ${json.data.children.length} posts`);
        let imagePosts = 0;
        for await (const post of json.data.children) {
            if (post.data.url) {
                if (post.data.url.endsWith('.jpg') || post.data.url.endsWith('.png') || post.data.url.endsWith('.gif')) {
                    console.log(post.data.title);
                    const url: string = post.data.url;
                    const id = url.split('/')[3].split('.')[0]
                    console.log(url);
                    imagePosts++;
                    const memeData: Meme = {
                        id,
                        title: post.data.title,
                        image: url,

                    }
                    await saveMemeToRRdb(memeData);
                }
            }
        }
        console.log(`Fetched ${imagePosts} images`);
        console.log('Done.');
    } catch (error) {
        console.error(error);
    }
    return;
}