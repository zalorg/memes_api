import { Request, Response } from 'express'
import getMeme from '../../../functions/getMeme'
export default async function getMemeById(req: Request, res: Response) {
    const meme = await getMeme(req.params.id)
    if (meme) {
        return res.json(meme)
    }
    return res.status(404).send('Meme not found')
}

export const autoRegister = true