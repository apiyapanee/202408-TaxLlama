import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import NavbarWithLlama from '../components/NavbarWithLlama';
import llary from '../assets/images/taxllama.png';
import { FaCheckCircle, FaEdit } from 'react-icons/fa'; 
import llama from '../assets/gifs/llama.gif';


const Onboarding1 = () => {

    const [currentStep, setCurrentStep] = useState(1);
    const [currentTextIndex, setCurrentTextIndex] = useState(0);

    const handleNextStep = () => {
        setCurrentStep(currentStep + 1);
      };

    const handleUpload = () => {
        console.log("placeholder");
    }



    // loading screen junk is all below

    const texts = [
        'Llary is sorting through your expenses—making sure every bale of hay is accounted for...',
        'Llary is optimizing your deductions—finding every last bit of savings in the llama-verse!',
        'Llary is chewing over your data—getting all the details just right...'
      ];
    
    useEffect(() => {
        let timer;
        if (currentStep === 3 && currentTextIndex < texts.length) {
          timer = setTimeout(() => {
            setCurrentTextIndex(currentTextIndex + 1);
          }, 3000);
        }
        return () => clearTimeout(timer);
      }, [currentStep, currentTextIndex, texts.length]);

    const progressBarStyle = {
        width: '0%',
        animation: 'progress-animation 15s linear forwards',
      };
    
    const keyframes = `
    @keyframes progress-animation {
        0% { width: 0%; }
        100% { width: 100%; }
    }
    `;

    return (
        <div>
            <NavbarWithLlama />

            {currentStep === 1 && (
            
                <div className="container d-flex flex-column align-items-center justify-content-center" style={{ height: 'calc(100vh - 150px)' }}>
                    <p className="h2 mb-4 font-weight-normal" style={{ fontWeight: 400 }}>
                        Lets start by looking at your 1040 to understand your situation
                    </p>
                    <button
                        className="btn mt-8 btn-primary mb-3"
                        style={{ backgroundColor: '#A3E4DB', color: 'black', border: '1px solid black'}}
                        onClick={handleNextStep}
                    >
                        Upload Files
                    </button>
                </div>
            )}

            {currentStep === 2 && (
                <div className="mt-20">   
                    <div className="container mt-20">
                        <h3 className="text-center mb-4">
                            Great! Lets next fill out some final information - fill out as little or as much as you'd like!
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
                        <div className="d-flex justify-content-center mt-4">
                            <button
                            className="btn btn-primary"
                            onClick={handleNextStep}
                            >
                                Next Step
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {currentStep === 3 && (
                <div className="d-flex justify-content-center align-items-center vh-100">
                    <style>{keyframes}</style> {/* Include keyframes in a style tag */}
                    <div className="text-center">
                        <h3>One sec while I chew on those numbers</h3>
                        <img src={llama} alt="Loading..." className="mt-10 rounded-circle shadow-lg my-4" style={{ width: '300px', height: '300px', maskImage: 'radial-gradient(circle, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 70%)' }} />
                        <div className="progress mt-10" style={{ height: '8px' }}>
                            <div
                            className="progress-bar"
                            role="progressbar"
                            style={progressBarStyle}
                            aria-valuenow="50"
                            aria-valuemin="0"
                            aria-valuemax="100"
                            ></div>
                        </div>
                        <div className="mt-4">
                            {texts.map((text, index) => (
                                <p key={index} className="mt-4"style={{ display: index <= currentTextIndex ? 'block' : 'none' }}>{text}</p>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Onboarding1;
