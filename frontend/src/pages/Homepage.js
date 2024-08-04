import React from 'react';
import illustration from '../assets/images/llamahomepage.png';
import logo from '../assets/images/llamalogo.png';

const HomePage = () => {
  return (
    <div>
        <div>
            <nav className="navbar navbar-expand-lg navbar-light px-0 py-3">
                <div className="container-xl max-w-screen-xl">
                    {/* Logo */}
                    <a className="navbar-brand d-flex align-items-center" href="#">
                        <img
                            src={logo}
                            className="h-16"
                            alt="..."
                            style={{ height: '40px' }}
                        />
                        <span className= "" style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>TaxLlama</span>
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
                    <div className="collapse navbar-collapse" id="navbarCollapse">

                    <ul className="navbar-nav mx-lg-auto">
                        {/* <li className="nav-item">
                        <a className="nav-link" href="#">
                            Dashboard
                        </a>
                        </li>
                        <li className="nav-item">
                        <a className="nav-link" href="#">
                            Product
                        </a>
                        </li>
                        <li className="nav-item">
                        <a className="nav-link" href="#">
                            Features
                        </a>
                        </li>
                        <li className="nav-item">
                        <a className="nav-link" href="#">
                            Pricing
                        </a>
                        </li> */}
                    </ul>

                    {/* Action */}
                        <div class="navbar-nav ms-lg-4">
                            <a class="nav-item nav-link" href="/dashboard">Dashboard</a>
                        </div>
                        <div className="d-flex align-items-lg-center mt-3 mt-lg-0">
                            <a href="/start" className="btn btn-sm btn-neutral w-full w-lg-auto">
                            Get Started
                            </a>
                        </div>
                    </div>
                </div>
            </nav>
            <div className="py-md-32 position-relative">
                <div className="container-lg max-w-screen-xl">
                    <div className="row align-items-center">
                    <div className="col-lg-6 order-lg-1 ms-auto d-none d-lg-block">
                        <div className="mb-5 mb-lg-0 w-11/10 position-relative">
                        {/* Illustration */}
                        <div className="svg-fluid position-relative overlap-10">
                            <img src={illustration} alt="Illustration" style={{ maxWidth: '61%', height: 'auto', maskImage: 'radial-gradient(circle, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 70%)'}} className="img-fluid " />
                        </div>
                        {/* Decorations */}
                        <div className="position-absolute bottom-0 start-72 h-64 w-64 mt-n4 transform translate-y-n1/2 translate-x-n1/2 gradient-bottom-right start-purple-400 end-cyan-500 filter blur-100 rounded-4 p-5">
                            {" "}
                        </div>
                        </div>
                    </div>
                    <div className="col-lg-6 order-md-0">
                        {/* Surtitle */}
                        <h5 className="h5 mb-5 text-uppercase text-warning mb-5">
                        Say Hee-haw to Llarry the Tax Llama
                        </h5>
                        {/* Heading */}
                        <h1 className="ls-tight font-bolder display-3 mb-5">
                        The world's friendliest tax planner
                        </h1>
                        {/* Text */}
                        <p className="lead mb-10">
                        Understand how your Llife decisions impact your tax Lliability.
                        </p>
                        {/* Buttons */}
                        <div className="mx-n2">
                        <a
                            href="/start"
                            className="btn btn-lg btn-primary shadow-sm mx-2 px-lg-8"
                        >
                            Get started
                        </a>
                        <a href="/dashboard" class="btn btn-lg btn-neutral mx-2 px-lg-8">
                            Dashboard
                        </a>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

  );
};

export default HomePage;
