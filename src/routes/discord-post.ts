import { Request, Response } from 'express'
import { MessageEmbed } from 'discord.js'
import * as discordinteractions from 'discord-interactions'
import { Meme } from '../types/memes';
import getRandomMeme from '../functions/getRandomMeme';
import getMeme from '../functions/getMeme'
export default async function (req: Request, res: Response) {
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
    const command = req.body.data.name;
    if (command === 'meme') {
        console.log(req.body.data.options);
        if (req.body.data.options[0].name === 'get') {
            const getOptions = req.body.data.options[0];
            if (typeof getOptions.options === 'object') {
                const id = req.body.data.options[0].options[0].value;
                const data = await getMeme(id);
                    if (!data) return res.status(200).send({
                        type: 4,
                        data: {
                            content: 'Meme not found!',
                        },
                    });
                    const embed = getEmbed(data); 
                    return res.status(200).send({
                        type: 4,
                        data: {
                            embeds: [ embed.toJSON() ],
                        },
                    });
            }
            const randomMeme = await getRandomMeme();
            console.log(randomMeme);
            const embed = getEmbed(randomMeme); 
                return res.status(200).send({
                    type: 4,
                    data: {
                        embeds: [ embed.toJSON() ],
                    },
                });
        }
    }
}

function getEmbed (meme: Meme): MessageEmbed {
    const embed = new MessageEmbed()
    embed.setTitle(meme.title);
    embed.setImage(meme.image);
    embed.setDescription(`[${meme.subreddit}](https://reddit.com/r/${meme.subreddit}) \nMeme Id: ${meme.id}`);
    embed.setFooter(`Meme from: u/${meme.author || 'Unknown'}`);
    embed.setColor('#0099ff'); 
    return embed;
}

export const autoRegister = true;