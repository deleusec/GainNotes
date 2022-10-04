const fsp = require('fs').promises

export default async function handler(req, res) {
    try {
        if(req.method === "POST"){
            const sessions = req.body.sessions.filter((e)=> e.id !== req.body.deleteSessionID)
            const data = {"sessions":sessions}
            await fsp.writeFile("./data/sessions.json", JSON.stringify(data))
            res.status(200).json(data)
        }
    }
    catch (e) {
        console.log(e)
        res.status(500).json({error:'Error reading data'})
    }
}
