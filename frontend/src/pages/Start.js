import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebaseConfig';
import { collection, addDoc, setDoc, doc } from 'firebase/firestore';
import { getAuth, signInAnonymously } from 'firebase/auth';
import Navbar from '../components/Navbar';
import llary from '../assets/images/taxllama.png';

const Start = () => {
    const auth = getAuth();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const signInAnonymouslyAsync = async () => {
          try {
            const userCredential = await signInAnonymously(auth);
            console.log('Signed in anonymously');


            const user = userCredential.user;
            setUser(user);
            console.log(user);
    
            // Create a document in the users collection
            const userDoc = {
              uid: user.uid,
              name: 'Anonymous',
              email: 'anonymous@example.com',
              createdAt: new Date(),
            };

            await setDoc(doc(db, 'users', user.uid), userDoc);
            console.log("Document written with ID: ", user.uid);


          } catch (error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error('Error signing in anonymously:', errorCode, errorMessage);
          }
        };
    
        signInAnonymouslyAsync();
      }, [auth]);


      const handleNextClick = () => {
        navigate('/onboarding1');
      };


    return (
    <div>
         <Navbar />
         
        <div className="container ">
            <div className="mx-8 px-10">
                <div className="d-flex flex-column align-items-center justify-content-center">
                    <img src={llary} alt="TaxLlama" className="mb-4" style={{ width: '500px', height: 'auto' }} />
                    <p className="h1 mb-8 font-weight-normal text-center" style={{ fontWeight: 400 }}>
                        Hi! I'm Llary the Tax Llama! I'm here to help you understand how your personal life decisions may impact your tax outcomes.
                    </p>
                    <button
                        className="btn btn-primary mt-4"
                        style={{ backgroundColor: '#2BB1A5', color: 'white', border: '1px solid black'}}
                        onClick={handleNextClick}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    </div>
    );
};

export default Start;
