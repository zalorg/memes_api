import { Request, Response } from 'express'
import { database } from 'firebase-admin'
import { MessageEmbed } from 'discord.js'
import * as discordinteractions from 'discord-interactions'
import { Meme } from '../types/memes';
export default function (req: Request, res: Response) {
    const signature = req.get('X-Signature-Ed25519');
    const timestamp = req.get('X-Signature-Timestamp');
    if (!signature || !timestamp) {
        return res.status(403).send('Forbidden');
    }

    const isValidRequest = discordinteractions.verifyKey(JSON.stringify(req.body), signature, timestamp, 'e6c5e91e890ca8d545165563feb46d1324dff935424d28c96c34502f48f2eff8');

    if (!isValidRequest) {
        return res.status(401).end('invalid request signature');
    }

    if (req.body.type === 1) {
        return res.status(200).send({
            type: 1,
        });
    }
    console.log(req.body.member.user)
    const db = database();
    const command = req.body.data.name;
    if (command === 'meme') {
        console.log(req.body.data.options);
        if (req.body.data.options[0].name === 'get') {
            const embed = new MessageEmbed()
            const getOptions = req.body.data.options[0];
            if (typeof getOptions.options === 'object') {
                const id = req.body.data.options[0].options[0].value;
                return db.ref(`memes/${id}`).once('value', (snapshot) => {
                    const data: Meme = snapshot.val();
                    embed.setTitle(snapshot.val().title);
                    embed.setImage(snapshot.val().image);
                    embed.setDescription(`[${snapshot.val().subreddit}](https://reddit.com/r/${snapshot.val().subreddit}) \nMeme Id: ${snapshot.val().id}`);
                    embed.setFooter(`Meme from: u/${snapshot.val().author || 'Unknown'}`);
                    embed.setColor('#0099ff'); 
                    return res.status(200).send({
                        type: 4,
                        data: {
                            embeds: [ embed.toJSON() ],
                        },
                    });
                })
            }
            return db.ref('memes').once('value', (snapshot) => {
                const rndInt = Math.floor(Math.random() * snapshot.numChildren()) + 1
                console.log(rndInt);
                let a: Meme[] = [];
                let map = new Map(Object.entries(snapshot.val()));
                map.forEach((value: any, key) => {
                    a.push({
                        id: value.id,
                        image: value.image,
                        title: value.title,
                        subreddit: value.subreddit,
                        author: value.author,
                    });
                })
                console.log(a[rndInt]);
                if (a[rndInt].title) {
                    embed.setTitle(a[rndInt].title);
                }
                embed.setImage(a[rndInt].image);
                embed.setDescription(`[${a[rndInt].subreddit}](https://reddit.com/r/${a[rndInt].subreddit}) \nMeme Id: ${a[rndInt].id}`);
                embed.setFooter(`Meme from: u/${a[rndInt].author || 'Unknown'}`);
                embed.setColor('#0099ff'); 
                return res.status(200).send({
                    type: 4,
                    data: {
                        embeds: [ embed.toJSON() ],
                    },
                });
            })
        }
    }
}

export const autoRegister = true;