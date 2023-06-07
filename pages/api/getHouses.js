import { connectMongoDB } from "@/lib/MongoConnect";
import House from "@/models/HouseModel";

export default async function handler(req, res) {
    if(req.method !== "GET"){
        res.status(405).send({msg:"Only GET requests are allowed"})
        return;
    }

    try {
        await connectMongoDB();

        const allHouses = await House.find();
        res.status(200).send(allHouses)
    } catch (err) {
        console.error(err)
        res.status(400).send({err, msg:"Something went wrong"})
    }
}