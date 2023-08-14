import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-white text-black py-6 relative overflow-hidden">
            <div className="container mx-auto flex flex-col md:flex-row items-center justify-center font-Special">
                <div className="text-center md:text-left mb-4 md:mb-0">
                    <h2 className="text-2xl font-semibold">Gaffor Grocery Outlet</h2>
                    <p className="text-sm">Your go-to Ecommerce Store for groceries</p>
                </div>
            </div>
            {/* Gradient Animation */}
            <div className="gradient-overlay"></div>
        </footer>
    );
};

export default Footer;


