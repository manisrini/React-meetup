import MeetupList from "../components/meetups/MeetupList";
import {MongoClient} from 'mongodb'
import Head from "next/head"
import { Fragment } from "react";


const HomePage = (props) => {

  return(
    <Fragment>
      <Head>
        <title>React meetup</title>
        <meta name="description"content="Browse about react meetups !!Just a practice dummy app "></meta>
      </Head>
      <MeetupList meetups={props.meetups}/>

    </Fragment>
  ) 
      
      
  }

export async function getStaticProps() {

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

      const dbmeetups = await meetupsCollection.find().toArray();
  
    return{
        props :{
            meetups : dbmeetups.map(meetup =>({ 
                id : meetup._id.toString(),
                image : meetup.image,
                address : meetup.address,
                title : meetup.title
                

            }))
        },
        revalidate : 1
    }
}


export default HomePage;
