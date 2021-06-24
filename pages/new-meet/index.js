import MeetupForm from '../../components/meetups/NewMeetupForm'
import {useRouter} from 'next/router'
import Head from "next/head"
import { Fragment } from 'react'

const MeetUp = () => {

   const router =  useRouter()

   const meetupHandler =  async  (enteredData) => {
        const res = await fetch("/api/new-meetup",{
            method : "POST",
            body : JSON.stringify(enteredData),
            headers : {
                "Content-Type" : "application/json"
            }
        })
        const data = await res.json()
        console.log(data);
        console.log("after req - done")
        router.replace("/")
    }

    return(<Fragment>
        <Head>
            <title>Add new meetup</title>
            <metadata name="description" content="add new meetups"></metadata>
        </Head>
        <MeetupForm onAddMeetup={meetupHandler}/>

    </Fragment>) 
}

export default MeetUp;