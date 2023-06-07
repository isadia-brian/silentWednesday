import { connectMongoDB } from "@/lib/MongoConnect";
import House from "@/models/HouseModel";

export default async function handler(req, res) {
    if(req.method !== "POST"){
        res.status(405).send({msg:"Only Post requests are allowed"})
        return;
    }

    const {title,description,amount, noOfGuests,imageUrl,roomType} = req.body;

    try{

        await connectMongoDB()
        House.create({title,description,amount,noOfGuests,imageUrl,roomType}).then((data)=>{
            console.log(data);
            res.status(201).send(data)
        })

    }catch(err){
        console.error(err)
        res.status(400).send({err, msg:"Something went wrong"})

    }
  }