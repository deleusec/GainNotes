// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  res.status(200).json({ sessions: {
      "02/10/2022" : "Hello World"
    } })
}
