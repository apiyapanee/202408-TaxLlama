import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavbarWithLlama from '../components/NavbarWithLlama';
import { FaCheckCircle, FaEdit } from 'react-icons/fa'; 
import llama from '../assets/gifs/llama.gif';


const Onboarding1 = () => {

    const [currentStep, setCurrentStep] = useState(1);
    const [currentTextIndex, setCurrentTextIndex] = useState(0);
    const [file, setFile] = useState(null); // State to store the uploaded file
    const [uploadSuccess, setUploadSuccess] = useState(false); // State to manage upload success message
    const navigate = useNavigate(); // Create navigate instance

    const handleNextStep = () => {
        setCurrentStep(currentStep + 1);
      };

    const handleFileChange = async (event) => {
        const uploadedFile = event.target.files[0];
        if (uploadedFile) {
            const formData = new FormData();
            formData.append('file', uploadedFile);

            try {
                const response = await fetch('http://localhost:5001/upload', {
                    method: 'POST',
                    body: formData,  // Use FormData
                    mode: 'cors'  // Ensure CORS mode is set
                });

                if (response.ok) {
                    const result = await response.text();
                    console.log("Upload successful:", result);
                    setUploadSuccess(true);
                    setTimeout(() => {
                        setCurrentStep(2);
                    }, 2000);
                } else {
                    throw new Error('Failed to upload file');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }

    };

    const handleFileUploadClick = () => {
        document.getElementById('fileInput').click(); // Trigger the hidden file input
    };


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
                    <input
                        type="file"
                        id="fileInput"
                        style={{ display: 'none' }} // Hide the file input
                        onChange={handleFileChange}
                    />
                    <button
                        className="btn mt-8 btn-primary mb-3"
                        style={{ backgroundColor: '#A3E4DB', color: 'black', border: '1px solid black'}}
                        onClick={handleFileUploadClick} // Trigger file upload on button click
                    >
                        Upload Files
                    </button>
                    {uploadSuccess && <p className="mt-2">File uploaded successfully!</p>}
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
