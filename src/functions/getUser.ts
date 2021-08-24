import { set } from 'quick.db'
import { Client, User } from 'discord.js'
export default async function getUser(userID: string): Promise<User> {
    const client = new Client({ intents : ['GUILD_MEMBERS'] });
    await client.login(process.env.PERSONAL_DISCORD_BOT_TOKEN);
    const user = await client.users.fetch(userID);
    client.destroy();
    if (user) {
        set(`user.${userID}`, user);
        return user;
    }
    throw new Error('User not found');
}