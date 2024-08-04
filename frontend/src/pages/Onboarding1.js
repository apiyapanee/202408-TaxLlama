import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavbarWithLlama from '../components/NavbarWithLlama';
import { FaCheckCircle, FaEdit } from 'react-icons/fa'; 
import llama from '../assets/gifs/llama.gif';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';


const Onboarding1 = () => {

    const [currentStep, setCurrentStep] = useState(2);
    const [currentTextIndex, setCurrentTextIndex] = useState(0);
    const [file, setFile] = useState(null); // State to store the uploaded file
    const [uploadSuccess, setUploadSuccess] = useState(false); // State to manage upload success message
    const navigate = useNavigate(); // Create navigate instance
    const [userId, setUserId] = useState(null);
    const [formData, setFormData] = useState({
        shortTermPriority: null,
        longTermGoal: null,
        investingFeelings: null,
        lifeChanges: [],
        financialFlexibility: null,
    });

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

    // Handle authentication state
    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUserId(user.uid);
                console.log('Authenticated user ID:', user.uid);
            } else {
                console.log('No authenticated user.');
            }
        });
        return unsubscribe;
    }, []);


    const handleInputChange = (event) => {
        const { name, value, type, checked } = event.target;
        if (type === 'checkbox') {
            setFormData((prevData) => {
                const newLifeChanges = checked
                    ? [...prevData.lifeChanges, value]
                    : prevData.lifeChanges.filter((item) => item !== value);
                return { ...prevData, lifeChanges: newLifeChanges };
            });
        } else {
            setFormData((prevData) => ({ ...prevData, [name]: value }));
        }
    };

    // Handle form submission
    const handleFormSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);

        const data = {
            shortTermPriority: formData.get('shortTermPriority'),
            longTermGoal: formData.get('longTermGoal'),
            investingFeelings: formData.get('investingFeelings'),
            lifeChanges: formData.getAll('lifeChanges'),
            financialFlexibility: formData.get('financialFlexibility')
        };

        if (userId) {
            try {
                const db = getFirestore();
                await setDoc(doc(db, 'users', userId), data, { merge: true });
                console.log('Data saved successfully');
                setCurrentStep(3);
            } catch (error) {
                console.error('Error saving data:', error);
            }
        } else {
            console.error('User ID is not available');
        }
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
                            <form onSubmit={handleFormSubmit}>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label htmlFor="shortTermPriority" className="form-label">What's your top short-term financial priority?</label>
                                            <select id="shortTermPriority" name="shortTermPriority" className="form-select" value={formData.shortTermPriority || ''} onChange={handleInputChange}>
                                                <option value="" disabled>Select an option</option>
                                                <option value="Building an emergency fund">Building an emergency fund</option>
                                                <option value="Paying off high-interest debt">Paying off high-interest debt</option>
                                                <option value="Saving for a specific expense">Saving for a specific expense</option>
                                                <option value="Investing in stocks or real estate">Investing in stocks or real estate</option>
                                            </select>
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="longTermGoal" className="form-label">What's your main long-term financial goal?</label>
                                            <select id="longTermGoal" name="longTermGoal" className="form-select" value={formData.longTermGoal || ''} onChange={handleInputChange}>
                                                <option value="" disabled>Select an option</option>
                                                <option value="Retirement savings">Retirement savings</option>
                                                <option value="Buying a home">Buying a home</option>
                                                <option value="Funding education expenses">Funding education expenses</option>
                                                <option value="Leaving a legacy or inheritance">Leaving a legacy or inheritance</option>
                                            </select>
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="investingFeelings" className="form-label">How do you feel about investing?</label>
                                            <select id="investingFeelings" name="investingFeelings" className="form-select" value={formData.investingFeelings || ''} onChange={handleInputChange}>
                                                <option value="" disabled>Select an option</option>
                                                <option value="Play it safe (low-risk)">Play it safe (low-risk)</option>
                                                <option value="Balanced (some risk, some stability)">Balanced (some risk, some stability)</option>
                                                <option value="Go for growth (higher risk)">Go for growth (higher risk)</option>
                                                <option value="Not sure (new to investing)">Not sure (new to investing)</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label htmlFor="lifeChanges" className="form-label">Are there any big life changes on the horizon for you? (Select all that apply)</label>
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" value="Getting married" id="lifeChanges1" name="lifeChanges" checked={formData.lifeChanges.includes("Getting married")} onChange={handleInputChange} />
                                                <label className="form-check-label" htmlFor="lifeChanges1">Getting married</label>
                                            </div>
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" value="Having a child" id="lifeChanges2" name="lifeChanges" checked={formData.lifeChanges.includes("Having a child")} onChange={handleInputChange} />
                                                <label className="form-check-label" htmlFor="lifeChanges2">Having a child</label>
                                            </div>
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" value="Switching jobs or careers" id="lifeChanges3" name="lifeChanges" checked={formData.lifeChanges.includes("Switching jobs or careers")} onChange={handleInputChange} />
                                                <label className="form-check-label" htmlFor="lifeChanges3">Switching jobs or careers</label>
                                            </div>
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" value="Moving to a new home" id="lifeChanges4" name="lifeChanges" checked={formData.lifeChanges.includes("Moving to a new home")} onChange={handleInputChange} />
                                                <label className="form-check-label" htmlFor="lifeChanges4">Moving to a new home</label>
                                            </div>
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" value="Other" id="lifeChanges5" name="lifeChanges" checked={formData.lifeChanges.includes("Other")} onChange={handleInputChange} />
                                                <label className="form-check-label" htmlFor="lifeChanges5">Other (please share)</label>
                                            </div>
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="financialFlexibility" className="form-label">How important is financial flexibility to you?</label>
                                            <select id="financialFlexibility" name="financialFlexibility" className="form-select" value={formData.financialFlexibility || ''} onChange={handleInputChange}>
                                                <option value="" disabled>Select an option</option>
                                                <option value="Very important - I want to be able to make big purchases or take risks">Very important - I want to be able to make big purchases or take risks</option>
                                                <option value="Somewhat important - I want to have some freedom, but also prioritize stability">Somewhat important - I want to have some freedom, but also prioritize stability</option>
                                                <option value="Not very important - I prioritize security and predictability">Not very important - I prioritize security and predictability</option>
                                                <option value="Unsure">Unsure</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-center mt-4">
                                    <button type="submit" className="btn btn-primary">
                                        Next Step
                                    </button>
                                </div>
                            </form>
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
