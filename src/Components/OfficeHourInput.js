import TeachNav from './TeachNav';
import React, { useState, useContext} from 'react';
import "../CSS/index.css"
import { AuthContext } from "../Auth";
import { useHistory } from 'react-router-dom';
import firebase from "../config";

export default function OfficeHourInput() {


  const { currentUser } = useContext(AuthContext);
  const db = firebase.database();

  const history = useHistory();
  
  const routeChange = () =>{ 
    let path = `/`; 
    history.push(path);
  }

  const [startTime,setStartTimeHour]=useState("");
  const [startTimemin,setStartTimeMin]=useState("");

  const [endTime,setEndTime]=useState("");
  const [endTimeMin,setEndTimeMin]=useState("");


  const [timeslot,setTimeSlot]=useState("");
  const [monday,setMonday]=useState(false);
  const [tuesday,setTuesday]=useState(false);
  const [wednesday,setWednesday]=useState(false);
  const [thursday,setThursday]=useState(false);
  const [friday,setFriday]=useState(false);



function handleSubmit(e) {
  e.preventDefault();

  console.log("Data:" + startTime +" "+ endTime +" "+ monday);

  var tempStr = "";
  if(monday===true){
    tempStr+= "1";
  }
  if(tuesday===true){
    tempStr+= "2";
  }
  if(wednesday===true){
    tempStr+= "3";
  }
  if(thursday===true){
    tempStr+= "4";
  }
  if(friday===true){
    tempStr+= "5";
  }
// add days to db
  const dayRef = db.ref("Users/" + currentUser.uid + "/officeHoursInfo/daysToInclude");
  const newDayRef = dayRef;

  // add timeslot to db
const tsRef = db.ref("Users/" + currentUser.uid + "/officeHoursInfo/timeSlotLength");
const newTs = tsRef;

//add start and end time to db
const startandend = db.ref("Users/" + currentUser.uid + "/officeHoursInfo/startAndEndTimes");
const newstartandend = startandend;


  try{
   newDayRef.set({
    dayString:tempStr
  })

  newTs.set({
    length:timeslot
  })
  newstartandend.set({
    startHour:startTime,
    startMin:startTimemin,
    endHour:endTime,
    endMin:endTimeMin
  })

  alert("Days, Timeslot, and Start/End Times are all Updated!")
  routeChange();
}catch(error){alert(error)}

}

  return (
    <div>
      <TeachNav/> <br></br>

      <form onSubmit={handleSubmit}>
    <input type="text" name="startTime" placeholder="Start Time Hour" onChange={(e)=>setStartTimeHour(e.target.value)}/>
    <input type="text" name="startTimeMin" placeholder="Start Time Minute" onChange={(e)=>setStartTimeMin(e.target.value)}/>

    <input type="text" name="endTime" placeholder="End Time Hour" onChange={(e)=>setEndTime(e.target.value)}/> <br></br>
    <input type="text" name="endTimeMin" placeholder="End Time Minute" onChange={(e)=>setEndTimeMin(e.target.value)}/>

    <input type="text" name="timeslot" placeholder="Desired Time Slot Length" onChange={(e)=>setTimeSlot(e.target.value)}/> <br></br>


    <input type="checkbox" onChange={(e)=>setMonday(e.target.checked)}/> Monday<br></br>
    <input type="checkbox" onChange={(e)=>setTuesday(e.target.checked)}/> Tuesday<br></br>
    <input type="checkbox" onChange={(e)=>setWednesday(e.target.checked)}/> Wednesday<br></br>
    <input type="checkbox" onChange={(e)=>setThursday(e.target.checked)}/> Thursday<br></br>
    <input type="checkbox" onChange={(e)=>setFriday(e.target.checked)}/> Friday<br></br>

    <button type="submit">Submit</button>
      </form>

    </div>
  )
}
