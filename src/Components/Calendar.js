import React, {useState,useContext,useEffect} from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'
import RegularNav from './RegularNav';
import '../CSS/calendar.css'
import firebase from "../config";
import { useHistory, useParams } from 'react-router-dom';
import { AuthContext } from "../Auth";
import { getDatabase, ref, child, get } from "firebase/database";

function Calendar() {

  const {handle} = useParams();

  const[warning, setWarning] = useState("");

  const[reason, setReason] = useState("");

  const[dayStrFinal, setDayStrFinal] = useState("");

  const[userIDUnique, setUserIDUnique] = useState("");

  const[startHour, setStartHour] = useState("");
  const[startMin, setStartMin] = useState("");

  const[endHour, setEndHour] = useState("");
  const[endMin, setEndMin] = useState("");

  const[timeSlot, setTimeSlot] = useState("");

  const db = firebase.database();

  const { currentUser } = useContext(AuthContext);

  const[ex, setEx] = useState([{time:null,date:null}]);


  const handleSetEx=(finalWorks,yes)=>{
    let temp = [...ex];
    temp.push({
      time: finalWorks.getHours().toString(),
      date: yes,
      minutes:finalWorks.getMinutes().toString()
    });
    // console.log(temp);
    
    setEx(state => [...state, {
      time: finalWorks.getHours().toString(),
      date: yes,
      minutes:finalWorks.getMinutes().toString()
    }]);
    // console.log(ex);
  }
//add existing bookings to eclude dates array
  useEffect(() => {
  var query = firebase.database().ref("Users/" +handle+"/bookedTimes").orderByKey();
  query.once("value")
    .then(function(snapshot) {
      snapshot.forEach(function(childSnapshot) {

        if (snapshot.exists()) {
        var pass = childSnapshot.key;
        

        // console.log(userUniqueID);//userID here
        setUserIDUnique(pass);

        var maybe = childSnapshot.val().booking;
     
          var finalWorks = new Date(maybe);
        
          //console.log(finalWorks.getHours());
          const today = finalWorks;
          const yyyy = today.getFullYear();
          let mm = today.getMonth() + 1; // Months start at 0
          let dd = today.getDate();
          
          if (dd < 10) dd = '0' + dd;
          if (mm < 10) mm = '0' + mm;
          
          const yes = mm + '/' + dd + '/' + yyyy;
      
          handleSetEx(finalWorks,yes);
          
    
        } else {
          console.log("No bookings in db for this teacher");
        }
    });
  });
}, [])

  
const dbRef = ref(getDatabase());
//checks if student has a booking, will replace their booking
useEffect(() => {
  get(child(dbRef, `Users/`+ currentUser.uid + `/bookedTimes/` + handle)).then((snapshot) => {
    if (snapshot.exists()) {
      //make below show up on page as an h1 maybe
      setWarning(snapshot.val().booking);
       console.log("Warning, you already have an appointment booked for: "+snapshot.val().booking + ", if you create a new appointment your previous slot will be deleted");

    } else {
      console.log("No booking in db for this student");
    }
  }).catch((error) => {
    console.error(error);
  });
  // ex.map((val) =>{return console.log(val)});

}, [])

  // determines which days to render available
  get(child(dbRef, `Users/` + handle + `/availableHours/daysToInclude`)).then((snapshot) => {
    if (snapshot.exists()) {
      var tryMe = snapshot.val().dayString;
      setDayStrFinal(tryMe);
  
    } else {
      console.log("No snapshot value exists");
    }
  }).catch((error) => {
    console.error(error);
  });


  // determines which days to render available
  get(child(dbRef, `Users/` + handle + `/availableHours/timeSlotLength`)).then((snapshot) => {
    if (snapshot.exists()) {
    setTimeSlot(snapshot.val().length);
  
    } else {
      console.log("No snapshot value exists");
    }
  }).catch((error) => {
    console.error(error);
  });


    
  // determines which hours to render available
  get(child(dbRef, `Users/` + handle + `/availableHours/startAndEndTimes`)).then((snapshot) => {
    if (snapshot.exists()) {
      setEndHour(snapshot.val().endHour);
      setEndMin(snapshot.val().endMin);

      setStartHour(snapshot.val().startHour);
      setStartMin(snapshot.val().startMin);
      
  
    } else {
      console.log("No snapshot value exists");
    }
  }).catch((error) => {
    console.error(error);
  });





    const history = useHistory();
    
    const routeChangeOff = () =>{ 
      let path = `/`; 
      history.push(path);
    }


// taking teacher input of available days
const weekObj={
  monday:1,
  tuesday:2,
  wednesday:3,
  thursday:4,
  friday:5
  };
  
  for (let index = 0; index < dayStrFinal.length; index++) {
  
    if(dayStrFinal[index]===("1")){
      weekObj.monday= null;
    }
   else if(dayStrFinal[index]===("2")){
    weekObj.tuesday= null;
    }
    else if(dayStrFinal[index]===("3")){
      weekObj.wednesday= null;
    }
    else if(dayStrFinal[index]===("4")){
      weekObj.thursday= null;
    }
    else if(dayStrFinal[index]===("5")){
      weekObj.friday= null;
    }
    else{
      continue;
    }
  }

// determines which days are available by teacher input
const isWeekday = (date) => {

  const day = date.getDay();

  return day!==0 && day!==6 && day!==weekObj.monday && day!==weekObj.tuesday && day!==weekObj.wednesday && day!==weekObj.thursday && day!==weekObj.friday;
};


//handle booking submit below

const handleSubmit = (event) => {
  event.preventDefault();  

  const timeRef = db.ref("Users/" + currentUser.uid + "/bookedTimes/" + handle);
 
  const teacherRef = db.ref("Users/" + handle + "/bookedTimes");


  try{

     var booking = String(value);
     console.log(booking);

     try{
       const newTimeref = timeRef;
      newTimeref.set({
        booking:booking,
        reason: reason
      })}
      catch (error) {
        alert(error);
      }  
      
      try{
      
    var postData = {
      booking: booking,
      reason:reason
    };

    var newPostKey = db.ref("Users/" + handle).child(currentUser.uid).key;
    console.log(newPostKey);
    var updates = {};
    updates["Users/" + handle+'/bookedTimes/' + newPostKey] = postData;
   firebase.database().ref().update(updates);
  }
       catch (error) {
         alert(error);
       }  

    alert("Confirmed booking for: " + value);
    alert("Address for appointment: ")
    routeChangeOff();
  }
  catch (error) {
    alert(error);
  }
};
//value of selected date
  const [value, setValue] = useState();

  const divStyle = {
    width: '50%',
    fontSize: '14px',
    height: '120px'
  }

  return (
    <div>
    <RegularNav/>
    <div className="App">
      {warning!==""?(
     <div className="surrrrrpls">   <h1 className="warningcsss">Warning, you already have an appointment booked for: {warning}, if you create a new appointment your previous appointment will be deleted</h1></div>
      ):(<div className="surrrrrpls"> <h1 className="warningcss">Click on the input field below to get started</h1></div>)}
        <form onSubmit={handleSubmit}>
        <div className="ohContainer">
  
    <DatePicker
      filterDate={isWeekday}
      minTime={new Date(new Date().setHours(startHour, startMin))}
      maxTime={new Date(new Date().setHours(endHour,endMin))}
      excludeTimes={ex.map((exclude) => {
        const excDate = new Date(exclude.date);
        if(
          value &&
          excDate.getDate() === value.getDate() &&
          excDate.getFullYear() === value.getFullYear() &&
          excDate.getMonth() === value.getMonth()) 
         {
          return new Date(new Date().setHours(exclude.time, exclude.minutes));
         }
        return null;
      })}
      timeIntervals={timeSlot}
      showTimeSelect
      dateFormat="M/d/Y HH:mm"
      timeFormat="HH:mm"
      placeholderText="Choose an available time slot:"
      withPortal
      minDate= {new Date()} 
      onChange={(e) => {
        setValue(new Date(e));
      }}
      selected={value}
      required
      className="datepickah"
    />


      </div>

      <div className="reasoninput">
      <textarea className="centerreason" style={divStyle} required onChange={(e) => { setReason(e.target.value)}}  placeholder="Reason for appointment:"/>
      </div>

       <div className="buttonsurround">
         <input className="mesubmit" type="submit" />
       </div>
       </form>
      </div>
      </div>
  );
}
export default Calendar;