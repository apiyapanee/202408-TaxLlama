import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import graph from  '../assets/images/placeholder_graph.png';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, updateDoc, arrayUnion, getDoc } from 'firebase/firestore';


import { Line } from 'react-chartjs-2';
import 'chart.js/auto';




const jsonDataBackup = {
 "categories": [
   {
     "name": "Maximize Deductions",
     "approaches": [
       {
         "name": "Bunch those donations!",
         "savings": "$500",
         "details": "Donate to your favorite charities in bulk to itemize and save!",
         "imageUrl": "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?q=80&w=1476&auto=format&fit=crop"
       },
       {
         "name": "Business use of home!",
         "savings": "$1,000",
         "details": "Claim that home office deduction, Amy!"
       },
       {
         "name": "Medical miles add up!",
         "savings": "$200",
         "details": "Track those medical miles, Amy, and deduct 'em!"
       }
     ]
   },
   {
     "name": "Optimize Investments",
     "approaches": [
       {
         "name": "Retirement savings rock!",
         "savings": "$1,500",
         "details": "Contribute more to your retirement accounts, Amy!"
       },
       {
         "name": "Tax-loss harvesting, yeah!",
         "savings": "$1,000",
         "details": "Offset gains with losses, Amy, and save!"
       },
       {
         "name": "Dividend-paying stocks, yay!",
         "savings": "$500",
         "details": "Invest in dividend-paying stocks, Amy, for tax efficiency!"
       }
     ]
   },
   {
     "name": "Education and Growth",
     "approaches": [
       {
         "name": "Learn and earn, Amy!",
         "savings": "$1,000",
         "details": "Take courses or get certified to boost income!"
       },
       {
         "name": "Education credits, explore!",
         "savings": "$500",
         "details": "Look into education credits, Amy, for future learning!"
       },
       {
         "name": "Professional fees, deduct 'em!",
         "savings": "$200",
         "details": "Claim those professional fees, Amy, and save!"
       }
     ]
   },
   {
     "name": "Home Sweet Home",
     "approaches": [
       {
         "name": "Buy a home, maybe?",
         "savings": "$2,000",
         "details": "Consider buying a home, Amy, for mortgage interest deductions!"
       },
       {
         "name": "Renting? Still deduct!",
         "savings": "$500",
         "details": "Claim that renter's deduction, Amy, if available!"
       },
       {
         "name": "Home office, again!",
         "savings": "$1,000",
         "details": "Maximize that home office deduction, Amy!"
       }
     ]
   },
   {
     "name": "Family and Future",
     "approaches": [
       {
         "name": "Get married, maybe?",
         "savings": "$1,500",
         "details": "Consider marriage, Amy, for joint filing benefits!"
       },
       {
         "name": "Start a family, someday?",
         "savings": "$2,000",
         "details": "Plan for kids, Amy, and claim those child tax credits!"
       },
       {
         "name": "Leave a legacy, Amy!",
         "savings": "$1,000",
         "details": "Consider estate planning, Amy, for future generations!"
       }
     ]
   }
 ]
};




// NEW


const imageLinks = [
  "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?q=80&w=1476&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1463620910506-d0458143143e?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1542744173-05336fcc7ad4?q=80&w=1402&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1612658876438-8bcb6ad0afce?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1554224154-26032ffc0d07?q=80&w=1426&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1616514197671-15d99ce7a6f8?q=80&w=1473&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1594392167934-30e4dc2fb647?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1434626881859-194d67b2b86f?q=80&w=1474&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
];

const imagesPerRow = 3; // Number of images to display per row




const Dashboard = () => {


 const [jsonData, setJsonData] = useState()
 const [selectedOptimizations, setSelectedOptimizations] = useState([]);


 const auth = getAuth();
 const db = getFirestore();


 const learnMore = () => {
   console.log("Learn More");
 }


 const addItem = async(item) => {
   const user = auth.currentUser;
   if (user) {
     try {
       const userDoc = doc(db, 'users', user.uid);
       await updateDoc(userDoc, {
         selectedOptimizations: arrayUnion(item)
       });
       setSelectedOptimizations(prev => [...prev, item]);
     } catch (error) {
       console.error("Error adding item: ", error);
     }
   } else {
     console.log("No authenticated user.");
   }
 }


 useEffect(() => {
   const fetchSelectedOptimizations = async () => {
     const user = auth.currentUser;
     if (user) {
       const userDoc = doc(db, 'users', user.uid);
       const docSnap = await getDoc(userDoc);
       if (docSnap.exists()) {
         setSelectedOptimizations(docSnap.data().selectedOptimizations || []);
       }
     }
   };
   console.log("fetching selectedOptimizations")
   fetchSelectedOptimizations();


   if (auth.currentUser) {
     console.log("Authenticated user ID:", auth.currentUser.uid);
   } else {
     console.log("No authenticated user.");
   }
 }, [auth]);


 const totalSavings = selectedOptimizations.reduce((total, item) => {
   const savingsStr = typeof item.savings === 'string' ? item.savings : `${item.savings}`;
   const savings = parseFloat(savingsStr.replace(/[^0-9.-]+/g, ""));
   console.log(`Item: ${item.name}, Savings: ${item.savings}, Parsed Savings: ${savings}`);
   return total + savings;
 }, 0) * 10;
 console.log(`Total Savings: ${totalSavings}`);




 // new code below


 const yearlySavings = selectedOptimizations.reduce((total, item) => {
   const savingsStr = typeof item.savings === 'string' ? item.savings : `${item.savings}`;
   const savings = parseFloat(savingsStr.replace(/[^0-9.-]+/g, ""));
   return total + savings;
 }, 0);


 const labels = Array.from({ length: 50 }, (_, i) => `Year ${i + 1}`);
 const data = {
   labels: labels,
   datasets: [
     {
       label: 'Cumulative Savings Over Time',
       data: labels.map((_, i) => yearlySavings * (i + 1)),
       fill: false,
       backgroundColor: 'rgb(75, 192, 192)',
       borderColor: 'rgba(75, 192, 192, 0.2)',
     },
   ],
 };


  return (
   <div>
     <Navbar />
     <div className="position-relative">
       <div className="container-lg max-w-screen-xl">


         <div style={{ display: 'flex', justifyContent: 'left' }}>
           <ul class="nav nav-tabs">
             <li class="nav-item">
               <a class="nav-link active" href="/dashboard">Dashboard</a>
             </li>
             {/* <li class="nav-item">
               <a class="nav-link" href="/accounts">Accounts</a>
             </li> */}
           </ul>
         </div>


         <div className="row pt-8">
           <div className="col-lg-8">
             <div className="mb-4">
             </div>
             {/* Net Worth Section */}
             <div className="mb-4 p-8 bg-gray-100 rounded shadow-sm">
               <div className="d-flex align-items-center">
                 <div className="flex-grow-1">
                   <h2>${totalSavings.toFixed(2)}</h2>
                   <p>10 year savings</p>
                 </div>
                 {/* Graph Section */}
                 <div className="mt-4" style={{ flex: '1', textAlign: 'center' }}>
                   {/* Placeholder for Graph */}
                   <Line data={data} />
                 </div>
               </div>
               {/* Tax Savings Opportunities Section */}
               {/* Dynamic Content Based on JSON */}
               {jsonDataBackup.categories.map((category, categoryIndex) => (
                 <div key={categoryIndex} className="mb-4 mt-8 rounded">
                   <h3 className="mb-4">{category.name}</h3>
                   <div className="row">
                     {category.approaches.map((approach, approachIndex) => {
                       // Calculate the starting index for the current row
                       const rowIndex = Math.floor(approachIndex / imagesPerRow);
                       const imageIndex = (rowIndex * imagesPerRow + (approachIndex % imagesPerRow)) % imageLinks.length;

                       return (
                        <div key={approachIndex} className="col-md-4 mb-4">
                        <div className="d-flex flex-column border rounded overflow-hidden" style={{ height: '380px' }}>
                          <div className="position-relative">
                            <img src={imageLinks[imageIndex]} alt="Approach" className="w-100" style={{ height: '150px', objectFit: 'cover', filter: 'brightness(50%)' }} />
                            <div className="position-absolute top-50 start-50 translate-middle text-center w-100">
                              <p className="text-success fw-bold" style={{ fontSize: '1.5rem' }}>{approach.savings}</p>
                            </div>
                          </div>
                          <div className="p-3" style={{ height: '150px' }}>
                            <h4>{approach.name}</h4>
                            <p>{approach.details}</p>
                          </div>
                          <div className="d-flex justify-content-between p-3">
                            <a href="#" className="btn btn-outline-primary btn-sm" onClick={learnMore}>Learn More</a>
                            <a
                              href="#"
                              className={`btn btn-sm ${selectedOptimizations.some(item => item.name === approach.name) ? 'btn-secondary' : 'btn-outline-primary'}`}
                              onClick={() => addItem(approach)}
                              disabled={selectedOptimizations.some(item => item.name === approach.name)}>
            
                                 Add
                               </a>
                             </div>
                           </div>
                         </div>
                       );
                     })}
                   </div>
                 </div>
               ))}
             </div>
           </div>
           {/* Right Column */}
           <div className="col-lg-4">
             {/* To Do Section */}
             <div className="mb-4 p-4 bg-gray-100 rounded shadow-sm">
               <div className="d-flex align-items-center">
                 <div className="m-2">
                   <span className="badge bg-black rounded-pill">To Do</span>
                 </div>
                 {/* <div className="m-2">
                   <span className="badge bg-white text-black border border-black rounded-pill">Completed</span>
                 </div> */}
               </div>
              


                 {selectedOptimizations.length > 0 ? (
                     selectedOptimizations.slice().reverse().map((item, index) => (
                       <div key={index} className="p-3 bg-white rounded shadow-sm mt-6 mb-2">
                         <div className="mb-4">
                           <div className="d-flex align-items-center justify-content-between">
                             <h5>{item.name}</h5>                   
                             <span className="text-success">+{item.savings}</span>
                           </div>
                           <p className="mt-4">{item.details}</p>
                         </div>
                       </div>
                     ))
                   ) : (
                     <p>No selected optimizations</p>
                   )}




                 {/* <div className="mb-2">
                   <div className="d-flex align-items-center justify-content-between">
                     <h5>401k</h5>                   
                     <span className="text-success">+3,000,000</span>
                   </div>
                   <p className="mt-4">Set up a 401k to save up to $5,000,000 per year</p>
                 </div> */}


             </div>
           </div>
         </div>
       </div>
     </div>


   </div>


 );
};


export default Dashboard;