import React from 'react'
import RegularNav from './RegularNav'

export default function Pricing() {
  return (
    <div>
    <div><RegularNav/></div>
  
    <div className="pricingBox">
         <div className="welcomeCSS">
             <h1><u>Pricing estimates are as follows:</u></h1>
             <ul>
                 <li className='listPrice'>Thing 1</li>
                 <li className='listPrice'>Thing 1</li>
                 <li className='listPrice'>Thing 1</li>
                 <li className='listPrice'>Thing 1</li>
                 <li className='listPrice'>Thing 1</li>
             </ul>
        </div>    
    </div>
    </div>
  )
}
