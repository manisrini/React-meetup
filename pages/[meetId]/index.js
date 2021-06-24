import {MongoClient,ObjectId} from 'mongodb'
import { Fragment } from 'react';
import MeetupDetail from "../../components/meetups/MeetupDetail";
import Head from "next/head"

const MeetDetail = (props) => {
  return (
    <Fragment>
      <Head>
        <title>{props.meetupData.title}</title>
        <meta name="description"content={props.meetupData.description}/>
      </Head>
      <MeetupDetail
      image={props.meetupData.image}
      title={props.meetupData.title}
      address={props.meetupData.address}
      description={props.meetupData.description}
    />
    </Fragment>

  );

};

export async function getStaticPaths() {


    const client = await MongoClient.connect(
        "mongodb+srv://Manikandan:Mani@1234@cluster0.l1fjx.mongodb.net/meetups?retryWrites=true&w=majority"
      )

      const db = client.db();
  
      const meetupsCollection = db.collection("meetups");

      const  meetups= await meetupsCollection.find({},{_id : 1}).toArray()


    return{
        fallback : false,
        paths : meetups.map(meetup => ({
            params : {
                meetId : meetup._id.toString()
            }
        }))
       
}
}


export async function getStaticProps(context) {

    const meetId = context.params.meetId

    const client = await MongoClient.connect(
        "mongodb+srv://Manikandan:Mani@1234@cluster0.l1fjx.mongodb.net/meetups?retryWrites=true&w=majority"
      )

      const db = client.db();
  
      const meetupsCollection = db.collection("meetups");

      const selmeetup = await meetupsCollection.findOne({_id : ObjectId(meetId) })

    return{
        props : {
            meetupData : {
                image : selmeetup.image,
                id : selmeetup._id.toString(),
                description : selmeetup.description,
                title : selmeetup.title,
                address : selmeetup.address

            }
        }
    }
}

export default MeetDetail;
