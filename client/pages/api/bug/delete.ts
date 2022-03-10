import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../prisma'


// POST /api/post
// Required fields in body: title, authorEmail
// Optional fields in body: content
export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const result = await prisma.current_bug.delete({
    where:{ id:req.body},
  })
  res.json(result)
}