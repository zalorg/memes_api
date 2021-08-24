import { Request, Response } from 'express'
import getRandomMeme from '../../functions/getRandomMeme'
export default async function (req: Request, res: Response) {
  const meme = await getRandomMeme()
  res.json(meme)
}
export const autoRegister = true