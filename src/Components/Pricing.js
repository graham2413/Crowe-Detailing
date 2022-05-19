import React from 'react'
import RegularNav from './RegularNav'

export default function Pricing() {
  return (
    <div>
    <div><RegularNav/></div>
  
    <div className="pricingBox">
         <div className="welcomeCSS">
             <h1><u>PRICING</u></h1>
<div className='pricingstuff'>
ALL PRICING IS A ROUGH ESTIMATE AND IS SUBJECT TO CHANGE BASED ON CAR CONDITION AND SIZE.
<br></br><b><u><div className='spacingfix'>Interior Options</div></u></b> 
 Carpet Vacuum, Interior Trim Cleaning, Seat Cleaning, Window Cleaning, Interior Dressing Application.
<br></br><b><u><div className='spacingfix'>Exterior Options</div></u></b>
Foam Bath, Maintenance Wash, Decontamination Wash, Wheel Cleaning, Spray-On Sealant Application, Spray-On Wax Application.</div>
             <ul className='listOfStuff'>
                 <li className='listPrice'>
                    <b>Coupe:</b> <br></br>
                    Interior:  $25-$60 <br></br>
                    Exterior:  $30-$70
                </li>
                <li className='listPrice'>
                    <b>Sedan:</b> <br></br>
                    Interior:  $30-$70 <br></br>
                    Exterior:  $40-$80
                </li>
                <li className='listPrice'>
                    <b>SUV:</b> <br></br>
                    Interior:  $40-$85 <br></br>
                    Exterior:  $50-$100
                </li>
                <li className='listPrice'>
                    <b>Truck:</b> <br></br>
                    Interior:  $45-$100 <br></br>
                    Exterior:  $60-$120
                </li>

             </ul>
        </div>    
    </div>
    </div>
  )
}