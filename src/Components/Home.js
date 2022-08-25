import Nav from "./AdminNav"
import "../CSS/index.css"
import { useHistory, Link } from 'react-router-dom';
import firebase from "../config";
import { getDatabase, ref, child, get } from "firebase/database";
import React, { useState,useEffect,useContext } from 'react';
import { AuthContext } from "../Auth";
import AdminNav from "./AdminNav";
import RegularNav from "./RegularNav";


function Home() {
  
  const history = useHistory();
  const dbRef = ref(getDatabase());

  const [teacherName, setTeacherName]=useState(null);
  const { currentUser } = useContext(AuthContext);

  const [userType,setUserType]=useState(null);
  const [canc,setCanc]=useState([null]);
  
  const handleCanc=(val)=>{
 
    setCanc(state => [...state, [val]
    ]);
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
    
  useEffect(() => {
    get(child(dbRef, `Users/` + currentUser.uid + "/full_name")).then((snapshot) => {
      if (snapshot.exists()) {
        setTeacherName(snapshot.val());
      } else {
        console.log("No fullName exists");
      }
    }).catch((error) => {
      console.error(error);
    });
  }, []);

  useEffect(() => {
    firebase.database().ref(`Users/${currentUser.uid}/canceledSlot`).once('value', function(snapshot){
            snapshot.forEach(
                function(ChildSnapshot){
                // console.log(ChildSnapshot.val());
                handleCanc(ChildSnapshot.val().update);
    
                }
            );
        });
              }, [])   
 

    function cancRender() {
        
      if(canc!==null){

       return canc.map((element,index)=>{
          if(element!==null){
            return <div className="cancAppCont"> <div className="cancellation">CANCELLATION NOTICE</div><ol> <div><li>Your booking for {element} was cancelled.</li> <button onClick={() => clearNotif(element)}>Clear this notification</button></div></ol></div>
          }
        })
      }

    }

    function clearNotif(element) {

    
      firebase.database().ref(`Users/${currentUser.uid}/canceledSlot`).once("value").then(function(snapshot) {
        snapshot.forEach(function(child) {
          
          console.log(child.ref.key);
          if(child.ref.key===element[0]){
            try{
           child.ref.remove();
             //call below to refresh page after deletion
           window.location.reload(false);
          }
           catch(error){
             console.log(error);
           }
          }
        })
      });
    }

  return (

    <div>
        {userType === 'admin'? (
        <div>
          <AdminNav />
          <br></br>
        <div className="welcBox"> <h1 className="welcomeCSS">Welcome to Admin Home, {teacherName}</h1> </div>
          <div className="homebody">
        <div>  <Link to={`/inputAvailability`} className="appointmentLB">Change/Set your Available times here</Link> </div>      </div> <br></br><br></br>
          <Link to={`/inputAnnouncements`} className="appointmentLB">Change announcements here</Link>
        </div>

        ) : (
          <div>
          <RegularNav />
          <br></br>
          <div className="welcomeCSS">
            <h1>Welcome to Crowe Detailing, {teacherName}</h1>
       
       <div className="statementdiv">     We are a student owned and operated auto-detailing company in Oxford, MS. Our mission is to transform your vehicle to your likings using safe techniques and industry-leading products. Book your appointment today!</div>
       <div className="venmo"><a href="https://account.venmo.com/u/zouboo">Pay Here</a></div>
          <div className="insta">  <a href="https://instagram.com/crowe.detailing?igshid=YmMyMTA2M2Y="> Follow us on instagram!</a> </div>
            </div>
          
          <div className="homebody">
          <Link to={`/workers`} className="appointmentLB">Schedule Appointment</Link>
            <br></br>  <br></br>
 
            </div>
            {cancRender()}
        </div>
        )}
     
    </div>

  );
}
export default Home;