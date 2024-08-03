import React from 'react';
import logo from '../assets/images/taxllama.png'; // Adjust the path if necessary

const Navbar = () => {
  return (
    <div>
        <nav className="navbar navbar-expand-lg navbar-light px-0 py-0">
            <div className="container-xl max-w-screen-xl">
                {/* Logo */}
                <a className="navbar-brand d-flex align-items-center" href="/">
                <img
                    src={logo}
                    className="h-16"
                    alt="..."
                    style={{ height: '40px', marginRight: '10px' }} // Adjust the size and margin as needed
                />
                <span style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>TaxLlama</span>
                </a>
                {/* Navbar toggle */}
                <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarCollapse"
                aria-controls="navbarCollapse"
                aria-expanded="false"
                aria-label="Toggle navigation"
                >
                <span className="navbar-toggler-icon" />
                </button>
                {/* Collapse */}
            </div>
        </nav>
        <hr style={{ margin: 0 }}/>
    </div>
  );
};

export default Navbar;
