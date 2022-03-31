import TeachNav from './TeachNav';
import StudentNav from './StudentNav';
import { getDatabase, ref, child, get } from "firebase/database";
import React, { useState,useEffect, useContext } from 'react';
import "../CSS/index.css";
import { AuthContext } from "../Auth";
import firebase from "../config";

function Appointments() {

  // below for student to set the appointmetns they have by teacher
  const [studentAppointments, setStudentAppointments]=useState([]);

  const dbRef = ref(getDatabase());
  const { currentUser } = useContext(AuthContext);
  const [userType,setUserType]=useState(null);
// below for teachers to set the appointmetns they have
  const [teacherAppointments, setTeacherAppointments]=useState([]);

 
  const handleIt=(here,there)=>{
    let temp = [...studentAppointments];
    temp.push({
      teachName:here,
      appointmentDate:there
    });
    
    setStudentAppointments(state => [...state, {
      teachName:here,
      appointmentDate:there
    }]);
    // console.log(studentAppointments);
  }

  const handleTeach=(here,there)=>{
    let temp = [...teacherAppointments];
    temp.push({
      studentName:here,
      appointmentDate:there
    });

    
    setTeacherAppointments(state => [...state, {
      studentName:here,
      appointmentDate:there
    }]);
    // console.log(teacherAppointments);
  }


    useEffect(() => {
      get(child(dbRef, `Users/` + currentUser.uid + "/type")).then((snapshot) => {
        if (snapshot.exists()) {
          setUserType(snapshot.val());
        } else {
          console.log("No ");
        }
      }).catch((error) => {
        console.error(error);
      });

    }, [])


    // set student appointments
    useEffect(() => {
      
      var query = firebase.database().ref("Users/" + currentUser.uid + "/bookedTimes").orderByKey();
      query.once("value")
        .then(function(snapshot) {
          snapshot.forEach(function(childSnapshot) {
            
            var teachersID = childSnapshot.key;
            // console.log(teachersID);
      
            var bookingTimeForCertainTeach = childSnapshot.val().booking;
            //  console.log(bookingTimeForCertainTeach);

            var tryer = firebase.database().ref("Users/" + teachersID).orderByKey();
            tryer.once("value")
            .then(function(snapshot) {

                // console.log(snapshot.val().full_name);
                  handleIt(snapshot.val().full_name,bookingTimeForCertainTeach)
              })

        });
      });

    }, [])

        // set teacher appointments
        useEffect(() => {
      
          var query = firebase.database().ref("Users/" + currentUser.uid + "/bookedTimes").orderByKey();
          query.once("value")
            .then(function(snapshot) {
              snapshot.forEach(function(childSnapshot) {
                
                var studentID = childSnapshot.key;
                // console.log(teachersID);
          
                var bookingTimeForCertainTeach = childSnapshot.val();
                  console.log(bookingTimeForCertainTeach);
    
                var tryer = firebase.database().ref("Users/" + studentID).orderByKey();
                tryer.once("value")
                .then(function(snapshot) {
    
                    //  console.log(snapshot.val().full_name);

                    handleTeach(snapshot.val().full_name,bookingTimeForCertainTeach)
                  })
    
            });
          });
    
        }, [])


  return(
    <div>
        {userType === 'teacher'? (
          <div>
                <TeachNav/>
                <br></br>
                <h1 className="teachersList">My Appointments</h1>
                {teacherAppointments.map((element,index)=>{
               return <div><h2 className="apps">{index+1}. {element.studentName}</h2>   <h3 className="appsdate">{element.appointmentDate}</h3></div>
                
                       })}
          </div>
        ) : (
          <div>
                <StudentNav/>
                <br></br>
                <h1 className="teachersList">My Appointments</h1>
               {studentAppointments.map((element,index)=>{
               return <div><h2 className="apps">{index+1}. {element.teachName}</h2>   <h3 className="appsdate">{element.appointmentDate}</h3></div>
                
                       })}
                     
          </div>
        )}

    </div>
    
  );
};


export default Appointments;