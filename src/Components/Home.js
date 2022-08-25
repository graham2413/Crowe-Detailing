import Nav from "./AdminNav"
import "../CSS/index.css"
import { useHistory, Link } from 'react-router-dom';
import firebase from "../config";
import { getDatabase, ref, child, get } from "firebase/database";
import React, { useState,useEffect,useContext } from 'react';
import { AuthContext } from "../Auth";
import AdminNav from "./AdminNav";
import RegularNav from "./RegularNav";
import ImageSlider from "./ImageSlider";

function Home() {
  
  const history = useHistory();
  const dbRef = ref(getDatabase());
  const [isMobile, setIsMobile] = useState(false)
  const handleResize = () => {
    if (window.innerWidth < 580) {
        setIsMobile(true)
    } else {
        setIsMobile(false)
    }
  }
  useEffect(() => {
    window.addEventListener("resize", handleResize)
  })

  const slides = [
    {url:'https://crowe-detailing.web.app/201C7C14-EF8B-4BE8-8A96-E459C4AF0D4C.JPG',title:'Picture1'},
    {url:'https://crowe-detailing.web.app/842F8342-1264-4E6A-8D7B-CB58011A6231.JPG',title:'Picture2'},
    {url:'https://crowe-detailing.web.app/67253889701__9F7C48A1-65A3-441A-8DCE-F911706BD3AE.JPEG',title:'Picture3'},
    {url:'https://crowe-detailing.web.app/67388824160__1A74CC42-0F44-432D-A5DA-B9B3D77D8583.JPEG',title:'Picture4'},
    {url:'https://crowe-detailing.web.app/IMG_5762.JPEG',title:'Picture5'},
    {url:'https://crowe-detailing.web.app/67253888111__0B567B74-61D7-4CF4-B051-AA6755820949.JPEG',title:'Picture6'}
  ]
  const containerStyles={
    width: isMobile?'300px':'500px',
    height: isMobile?'200px':'280px',
    margin: '0 auto',
  }

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
            
            <div style={containerStyles}>
          <ImageSlider slides={slides}/>
          </div>
            {cancRender()}
        </div>
        )}
     
    </div>

  );
}
export default Home;