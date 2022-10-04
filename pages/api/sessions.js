const fsp = require('fs').promises

export default async function handler(req, res) {
    try {
        const fileData = await fsp.readFile('./data/sessions.json')

        if(req.method === "GET"){
            // Do stuff
            const json = JSON.parse(fileData)
            res.status(200).json(json)
        }
    }
    catch (e) {
        console.log(e)
        res.status(500).json({error:'Error reading data'})
    }
}
