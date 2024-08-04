import React from 'react';
import { Link } from 'react-router-dom';
import NavbarWithLlama from '../components/NavbarWithLlama';
import llary from '../assets/images/taxllama.png';

const Onboarding1 = () => {
  return (
    <div>
      <NavbarWithLlama />
      
      <div className="container d-flex flex-column align-items-center justify-content-center" style={{ height: 'calc(100vh - 150px)' }}>
        <p className="h2 mb-4 font-weight-normal" style={{ fontWeight: 400 }}>
          Lets start by looking at your 1040 to understand your situation
        </p>
        <button
          className="btn mt-8 btn-primary mb-3"
          style={{ backgroundColor: '#A3E4DB', color: 'black', border: '1px solid black'}}
        >
          Upload Files
        </button>
        <Link to="/onboarding2" className="text-decoration-none" style={{ color: 'black' }}>
          Skip this step -->
        </Link>
      </div>
    </div>
  );
};

export default Onboarding1;
