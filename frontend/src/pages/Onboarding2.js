import React from 'react';
import NavbarWithLlama from '../components/NavbarWithLlama';
import { FaCheckCircle, FaEdit } from 'react-icons/fa'; // Assuming you are using react-icons


const Onboarding2 = () => {
    return (
        <div>
          <NavbarWithLlama />
          <div className="mt-20">   
            <div className="container mt-20">
                <h3 className="text-center mb-4">
                Ok! Based on your 1040, here are my assumptions about your situation! Do these look right?
                </h3>
                <div className="row">
                <div className="col-md-6">
                    <h5 className="text-center">Current state</h5>
                    <div className="border rounded p-3 mb-3 d-flex justify-content-between align-items-center">
                    <div>
                        <strong>Your name</strong>
                        <p>Homer Simpson</p>
                    </div>
                    <div>
                        <FaCheckCircle className="text-success" />
                        <FaEdit className="text-secondary ml-2" />
                    </div>
                    </div>
                    <div className="border rounded p-3 mb-3 d-flex justify-content-between align-items-center">
                    <div>
                        <strong>Marital Status</strong>
                        <p>👫 Married</p>
                    </div>
                    <div>
                        <FaCheckCircle className="text-success" />
                        <FaEdit className="text-secondary ml-2" />
                    </div>
                    </div>
                    <div className="border rounded p-3 mb-3 d-flex justify-content-between align-items-center">
                    <div>
                        <strong>Location</strong>
                        <p>California</p>
                    </div>
                    <div>
                        <FaCheckCircle className="text-success" />
                        <FaEdit className="text-secondary ml-2" />
                    </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <h5 className="text-center">Future assumptions</h5>
                    <div className="border rounded p-3 mb-3 d-flex justify-content-between align-items-center">
                    <div>
                        <strong>Future income</strong>
                        <p>10% increase YOY</p>
                    </div>
                    <div>
                        <FaCheckCircle className="text-success" />
                        <FaEdit className="text-secondary ml-2" />
                    </div>
                    </div>
                </div>
                </div>
            </div>
          </div>
        </div>
      );
};

export default Onboarding2;
