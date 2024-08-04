import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import graph from  '../assets/images/placeholder_graph.png';
import { getAuth } from 'firebase/auth';

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
const Dashboard = () => {

  const [jsonData, setJsonData] = useState()

  const learnMore = () => {
    console.log("Learn More");
  }

  const addItem = () => {
    console.log("Add Item");
  }

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      console.log("Authenticated user ID:", user.uid);
    } else {
      console.log("No authenticated user.");
    }
  }, []);

  useEffect(() => {
    const getJsonData = async () => {
      try {
        const response = await fetch('http://localhost:5001/data', {mode: 'cors'});
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setJsonData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
        setJsonData(jsonDataBackup)
      }
    }
    getJsonData()
  }, [])

  if (!jsonData) {
    return <div>
      <h3> Loading ...</h3>
    </div>
  }

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
                    <h2>$142,255</h2>
                    <p>Net Worth Today</p>
                  </div>
                  {/* Graph Section */}
                  <div className="mt-4" style={{ flex: '1', textAlign: 'center' }}>
                    {/* Placeholder for Graph */}
                    <img src={graph} alt="Net Worth Graph" style={{ maxWidth: '100%', width: '300px', height: '100px' }} className="img-fluid" />
                  </div>
                </div>
                {/* Tax Savings Opportunities Section */}
                {/* Dynamic Content Based on JSON */}
                {jsonData.categories.map((category, index) => (
                <div key={index} className="mb-4 mt-8 rounded">
                  <h3 className="mb-4">{category.name}</h3>
                  <div className="row">
                    {category.approaches.map((approach, index) => (
                      <div key={index} className="col-md-4 mb-4">
                        <div className="d-flex flex-column border rounded overflow-hidden" style={{ height: '380px' }}>
                        <div className="position-relative">
                          <img src={approach.imageUrl ? approach.imageUrl : "https://via.placeholder.com/150"} alt="Recipe" className="w-100" style={{ height: '150px', objectFit: 'cover', filter: 'brightness(50%)' }} />
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
                              <a href="#" className="btn btn-outline-primary btn-sm" onClick={addItem}>Add</a>
                            </div>
                        </div>
                      </div>
                  





                    //   <div key={index} className="col-md-4 mb-4" >
                    //     <div className="card bg-white rounded shadow-sm" style={{ height: '400px' }}>
                    //       <div className="mx-4 mt-4 bg-white">
                    //         <h5 className="mb-0">{approach.name}</h5>
                    //         <p className="text-success mb-0">+{approach.savings}</p>
                    //         <hr />
                    //       </div>
                    //       <img src="https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?q=80&w=1476&auto=format&fit=crop" alt="image for card" className="card-img-top" style={{ maxHeight: '100px', objectFit: 'cover' }} />
                    //       <div className="card-body">
                    //         <p className="card-text">{approach.details}</p>
                    //         <a href="#" className="btn btn-outline-primary btn-sm">Learn More</a>
                    //       </div>
                    //     </div>
                    // </div>
                    ))}
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
                  <div className="m-2">
                    <span className="badge bg-white text-black border border-black rounded-pill">Completed</span>
                  </div>
                </div>
                <div className="p-3 bg-white rounded shadow-sm mt-4">
                  <div className="mb-2">
                    <div className="d-flex align-items-center justify-content-between">
                      <h5>401k</h5>                    
                      <span className="text-success">+3,000,000</span>
                    </div>
                    <p className="mt-4">Set up a 401k to save up to $5,000,000 per year</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>

  );
};

export default Dashboard;