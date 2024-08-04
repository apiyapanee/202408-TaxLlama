import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import llary from '../assets/images/taxllama.png';

const Onboarding1 = () => {
  return (
    <div>
      <Navbar />
      <div className="container text-center mt-3">
        <img src={llary} alt="TaxLlama" className="mb-3" style={{ width: '150px', height: 'auto' }} />
      </div>
      <div className="container d-flex flex-column align-items-center justify-content-center" style={{ height: 'calc(100vh - 150px)' }}>
        <p className="h4 mb-4 font-weight-normal" style={{ fontWeight: 400 }}>
          Lets start by looking at your 1040 to understand your situation
        </p>
        <button
          className="btn btn-primary mb-3"
          style={{ backgroundColor: '#A3E4DB', color: 'black', border: '1px solid black'}}
        >
          Upload Files
        </button>
        <Link to="/next-step" className="text-decoration-none" style={{ color: 'black' }}>
          Skip this step -->
        </Link>
      </div>
    </div>
  );
};

export default Onboarding1;
