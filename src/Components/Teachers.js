import React, {useState,useEffect } from 'react';
import StudentNav from './StudentNav';
import { getDatabase, ref, child, get } from "firebase/database";
import { Link } from "react-router-dom";
import "../CSS/index.css";
import firebase from "../config"


function Teachers() {

  const [teachers, setTeachers]=useState([]);
  const [searchTerm, setSearchTerm]=useState('');

function teachHand(name, uid) {

  setTeachers(prevState => ({
 
        ...prevState,
        [name]: uid
   }));
}

useEffect(() => {
  firebase.database().ref('Users').once('value', function(snapshot){
          snapshot.forEach(
              function(ChildSnapshot){

      if(ChildSnapshot.val().type=== "admin"){

         teachHand(ChildSnapshot.val().full_name,ChildSnapshot.val().uid);
      }
              }
          );
      });
            }, [])

  return(

      <div>

        <StudentNav/>
        <h1 className="teachersList">Choose desired worker from below</h1>
        <input onChange={event => setSearchTerm(event.target.value)} className="searchbar" type="text" placeholder="Search..."/>
        <div>
          <ul>

       {Object.entries(teachers).filter((val)=>{
         if(searchTerm === ""){
        return val;
        
         }
         else if(val[0].toLowerCase().includes(searchTerm.toLowerCase())){
           return val;
         }
       }).map((value, index) => {

        return <Link to={`/teacherProfile/${value[1]}`} className="eachTeach" key={index}>{value[0]}</Link>
        })}
      </ul>
      </div>

      </div>

  );
};
export default Teachers;