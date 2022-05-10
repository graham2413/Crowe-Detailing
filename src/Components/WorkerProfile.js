import React, {useState,useEffect } from 'react';
import RegularNav from './RegularNav';
import {useParams,Link} from "react-router-dom"
import { getDatabase, ref, child, get } from "firebase/database";
import '../CSS/index.css'

///Purpose is for students to be able to see all teachers to choose from

function WorkerProfile() {

const [user,setUser] =useState(null);
const [announcement,setAnnouncement] =useState("");
const [email,setEmail] =useState("");

const {handle} = useParams();

const dbRef = ref(getDatabase());

useEffect(() => {
get(child(dbRef, `Users/` + handle + `/full_name`)).then((snapshot) => {
  if (snapshot.exists()) {
    var tryMe = snapshot.val();
    setUser(tryMe);

  } else {
    console.log("No name exists");
  }
}).catch((error) => {
  console.error(error);
});
}, [])


useEffect(() => {
  get(child(dbRef, `Users/` + handle + "/announcementsInput")).then((snapshot) => {
    if (snapshot.exists()) {
      setAnnouncement(snapshot.val().announcement);
    } else {
      console.log("No announcement");
    }
  }).catch((error) => {
    console.error(error);
  });

}, [])

useEffect(() => {
  get(child(dbRef, `Users/` + handle + "/email")).then((snapshot) => {
    if (snapshot.exists()) {
      setEmail(snapshot.val());
    } else {
      console.log("No teacher email found");
    }
  }).catch((error) => {
    console.error(error);
  });

}, [])

function announFixer() {
  if(announcement.length===0){
    return <div className="announcetext">No announcements</div>
  }
  else{
    console.log("here");
    return  <div className="announcetext">{announcement}</div>
  }
}



  return(

      <div>
      
        <RegularNav/>

       
        <h1 className="teacherthing">{user}'s Profile</h1> 

     {announFixer()}


      <div className="announcer"> <u><b>Contact:</b></u> {email}</div>
        <div className="homebody">
        <Link to={`/schedule-appointment/${handle}`} className="appointmentLB">Schedule Appointment with {user}</Link>

        </div>
      </div>

  );
};
export default WorkerProfile;