import { MongoClient } from "mongodb";

// /api/new-meetup
// POST /api/new-meetup

async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;

    const client = await MongoClient.connect(
      "mongodb+srv://Manikandan:Mani@1234@cluster0.l1fjx.mongodb.net/meetups?retryWrites=true&w=majority"
    )
    if(client){
      console.log("**successfull***")
    }else{
      console.log("error in db")
     
    }
    const db = client.db();

    const meetupsCollection = db.collection("meetups");

    const result = await meetupsCollection.insertOne(data);

    // console.log(result);

    client.close();

    res.status(201).json({ message: "Meetup inserted!" });
  }
}

export default handler;
