import { Request, Response } from 'express'
import * as qdb from 'quick.db'
export default function (req: Request, res: Response) {
  console.log(qdb.all())
  return res.sendStatus(200);
}
export const autoRegister = true