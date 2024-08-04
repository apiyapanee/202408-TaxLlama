import React from 'react';
import Navbar from '../components/Navbar';
import graph from  '../assets/images/placeholder_graph.png';

const Dashboard = () => {
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
              <li class="nav-item">
                <a class="nav-link" href="/accounts">Accounts</a>
              </li>
            </ul>
          </div>

          <div className="row pt-8">
            <div className="col-lg-8">

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
                <div className="mb-4 mt-14">
                  <h3 className="mb-4">Tax Savings Opportunities</h3>
                  <div className="row">
                    <div className="col-md-4 mb-4">
                      <div className="p-3 bg-white rounded shadow-sm">
                        <h4>Location</h4>
                        <p>+3M</p>
                        <p>Save up to +3M</p>
                      </div>
                    </div>
                    <div className="col-md-4 mb-4">
                      <div className="p-3 bg-white rounded shadow-sm">
                        <h4>Marital Status</h4>
                        <p>+2M</p>
                        <p>You and your partner make a joint income of $300,000. If you get married, you could save an additional $10k/year</p>
                        <button className="btn btn-outline-primary btn-sm">Learn More</button>
                      </div>
                    </div>
                    <div className="col-md-4 mb-4">
                      <div className="p-3 bg-white rounded shadow-sm">
                        <h4>Property</h4>
                        <p>+2M</p>
                        <p>You currently are renting! If you buy a property at a comparable price, you could save $15,000 in taxes</p>
                        <button className="btn btn-outline-primary btn-sm">Learn More</button>
                      </div>
                    </div>
                  </div>
                </div>
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
