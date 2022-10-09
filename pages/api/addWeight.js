const fs = require('fs')

export default function handler(req, res) {
    try {
        if(req.method === "POST"){

            fs.readFile("./data/weight.json", 'utf8', async (err, data) => {
                if (err) {
                    console.log(err)
                } else {
                    const obj = JSON.parse(data);
                    let hasMatch = false;

                    const weights = obj.weights.map((e)=>{
                        if(e.date !== req.body.date){
                            return e;
                        } else {
                            hasMatch = true;
                            return req.body;
                        }
                    })
                    if(!hasMatch){
                        weights.push(req.body)
                    }
                    function GetSortOrder(prop) {
                        return function(a, b) {
                            if (a[prop] > b[prop]) {
                                return 1;
                            } else if (a[prop] < b[prop]) {
                                return -1;
                            }
                            return 0;
                        }
                    }

                    weights.sort(GetSortOrder("id"))
                    await fs.promises.writeFile("./data/weight.json", JSON.stringify({"weights": weights}))

                    res.status(200).json(obj)
                }
            })
        }
    }
    catch (e) {
        console.log(e)
        res.status(500).json({error:'Error reading data'})
    }
}
