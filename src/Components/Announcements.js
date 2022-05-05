import React, {useState,useEffect, useContext } from 'react';
import TeacherNav from './AdminNav';
import { getDatabase, ref, child, get } from "firebase/database";
import "../CSS/index.css";
import { AuthContext } from "../Auth";
import firebase from "../config";
import { useHistory } from 'react-router-dom';

export default function Announcements() {
    
    const dbRef = ref(getDatabase());
    const history = useHistory();

    const routeChange = () =>{ 
        let path = `/`; 
        history.push(path);
      }

    const { currentUser } = useContext(AuthContext);

    const db = firebase.database();

    const [announcement,setAnnoucement]=useState("");

    const [currentAnnouncement,setCurrentAnnouncement]=useState("");

    
    function handleSubmit(e) {
        e.preventDefault();
      

        const dayRef = db.ref("Users/" + currentUser.uid + "/announcementsInput");
        const newDayRef = dayRef;
      
        try{
         newDayRef.set({
            announcement:announcement
        })
      
        alert("Announcement has been updated!")
        routeChange();
      }catch(error){alert(error)}
      
      }

      useEffect(() => {
        get(child(dbRef, `Users/` + currentUser.uid + "/announcementsInput")).then((snapshot) => {
          if (snapshot.exists()) {
            setCurrentAnnouncement(snapshot.val().announcement);
          } else {
            console.log("No announcements ");
          }
        }).catch((error) => {
          console.error(error);
        });
  
      }, [])
    
    
    
    return (
        <div>
            <div>
                <TeacherNav/>
            </div>

        <div className="textertexter">Current Announcements are as follows: <br></br><br></br>
        {currentAnnouncement}
        </div>


            <form onSubmit={handleSubmit}>
        <div className="timecontainer">
    <textarea 
    type="textarea" 
    required
    name="announcement" 
    placeholder="Ex: Office hours have been changed" 
    onChange={(e)=>setAnnoucement(e.target.value)}
    className="announ"
    />
             </div>
             <div className="submitbutttt">
             <button type="submit">Submit</button>
             </div>
            </form>
         </div>
      
    )
}
