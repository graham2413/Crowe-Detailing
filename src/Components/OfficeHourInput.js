//Below is my office hours input information component
import React, { useState, useEffect } from 'react';
import firebase from "./config";

function OfficeHourInput() {

  const [users, setUsers]=useState([]);
  const db = firebase.database();
//All data below
  useEffect(() => {

      db.ref('Users').on("value",(snapshot)=>{
        const data =  snapshot.val();
        setUsers(data);
      })
  }, []);

 const [form, setForm]=useState([]);

 const dataHandler = (event) => {
    event.preventDefault();
    console.log("Info as follows:",form)    

    var tempAr = [];
    for(var i=0; i<form.length;i++){
       if(form[i].dayPicked==="Monday"||"monday"){
        tempAr.push(1);
      }
      else if(form[i].dayPicked==="Tuesday"||"tuesday"){
        tempAr.push(2);
      }
      else if(form[i].dayPicked==="Wednesday"||"wednesday"){
        tempAr.push(3);
      }
      else if(form[i].dayPicked==="Thursday"||"thursday"){
        tempAr.push(4);
      }
      else if(form[i].dayPicked==="Friday"||"friday"){
        tempAr.push(5);
      }
    }
     console.log(tempAr);

    const timeRef = db.ref("Users/Teachers/testteacher/officeHoursAvailability");
    const newTimeref = timeRef;
    newTimeref.set({
      form
    })

  }
  
  function handleAddSlot(e){
    e.preventDefault();
      const inputState={
        startTime:"",
        endTime:"",
    };

  setForm(prev=>[...prev,inputState])

};
const onChange=(index,event)=>{

event.preventDefault();
event.persist();

setForm(prev=>{
 return prev.map((item,i)=>{

if (i!==index){
  return item;
}
return{
...item,
[event.target.name]:event.target.value,
}

  });

});
};

const handleRemove=(e,index)=>{
  e.preventDefault();

  setForm(prev=>prev.filter((item)=>item!==prev[index]));
}

const handleSelect=(e,index)=>{
  e.preventDefault();

  setForm(prev=>prev.filter((item)=>item!==prev[index]));
}


  return (
<div>
      <h1>Enter available times for the following days</h1>
      <h2>Format entry as follows -- Start time: 12:30  End Time: 16:00 (Military Time)</h2>
  
<form onSubmit={dataHandler}>
  
<button onClick={handleAddSlot}>Add time slot</button>   <br></br>  <br></br>
{
  form.map((item,index)=>(
 
 <div key={`item-${index}`}>
     <br></br> 
    <div>
        <input 
        type="text" 
        name="startTime" 
        placeholder="Start Time"
         value={item.start}
          onChange={(e)=>onChange(index,e)}
          />

    </div>
    <div>
        <input 
        type="text" 
        name="endTime" 
        placeholder="End Time"
         value={item.end}
          onChange={(e)=>onChange(index,e)}
          />
     <div>
     <input 
        type="text" 
        name="dayPicked" 
        placeholder="Desired Day"
         value={item.end}
          onChange={(e)=>onChange(index,e)}
          />
    </div>
    </div>
    

    <button onClick={(e)=>handleRemove(e,index)}>Remove Time Slot</button>
    </div>

  ))}
  <br></br>
  <input type="submit" />

</form>

</div>
  );
}
export default OfficeHourInput;