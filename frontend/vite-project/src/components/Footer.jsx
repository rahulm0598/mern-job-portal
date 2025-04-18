import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 rounded-lg shadow-lg m-4">
      <div className="w-full max-w-7xl mx-auto p-6 md:py-10">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <a
            href="https://flowbite.com/"
            className="flex items-center mb-6 sm:mb-0 space-x-3"
          >
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              className="h-10"
              alt="Jobify Logo"
            />
            <span className="text-2xl font-semibold text-white">Jobify</span>
          </a>
          <ul className="flex flex-wrap items-center text-sm font-medium">
            <li>
              <Link to="/" className="hover:text-orange-500 transition-colors me-4">
                Home
              </Link>
            </li>
            <li>
              <Link to="/jobs" className="hover:text-orange-500 transition-colors me-4">
                Jobs
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-orange-500 transition-colors">
                Browsing
              </Link>
            </li>
          </ul>
        </div>
        <hr className="my-6 border-gray-700" />
        <span className="block text-sm text-center text-gray-400">
          © 2025{' '}
          <a href="https://flowbite.com/" className="hover:text-orange-500">
            Jobify™
          </a>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
};

export default Footer;