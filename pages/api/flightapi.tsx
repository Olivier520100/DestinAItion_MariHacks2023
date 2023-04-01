import { NextApiRequest, NextApiResponse } from "next"
export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const body:  {origin: string, destination: string } = req.body as {origin: string, destination: string }


    let url = `https://www.cheapflights.ca/a/api/flightPricePrediction/coloredCalendar/oneWay?origin=${body.origin}}&destination=${body.destination}&dateMode=single&distinct=false`
    let response = await fetch(url)
    let data = await response.json()
    res.status(200).json(data)
    
}