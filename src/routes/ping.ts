import { Request, Response } from 'express'

export default function (req: Request, res: Response) {
  res.send('<script>location = "https://www.youtube.com/watch?v=dQw4w9WgXcQ"</script>')
}
export const autoRegister = true