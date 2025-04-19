import React from 'react';
import { NavLink } from 'react-router-dom'


const Footer = () => {
  return (
    <footer className="px-6 md:px-16 lg:px-24 xl:px-32 pt-8 w-full bg-primary text-white/80 ">
      <div className="flex flex-col md:flex-row justify-between w-full gap-10 border-b border-gray-500/30 pb-6">
        <div className="md:max-w-96">
          <img 
            className="h-20" src="/src/assets/logo.png" alt="logo" 
          />
          <p className="mt-6 text-sm hover:text-white">
          QRENT terlahir untuk menghadirkan pengalaman menyewa mobil impian, memberikan kebebasan untuk mengemudi dengan gaya dan kenyamanan.
          </p>
        </div>
        <div className="flex-1 flex items-start md:justify-end gap-20">
          <div>
            <h2 className="font-semibold mb-5 text-white">Company</h2>
            <ul className="text-sm space-y-2 ">
              <li><NavLink className="hover:text-white" to="/">Home</NavLink></li>
              <li><NavLink className="hover:text-white" to="/#about" >About Us</NavLink></li>
            </ul>
          </div>
          <div>
            <h2 className="font-semibold mb-5 text-white">Get in touch</h2>
            <div className="text-sm space-y-2">
              <p className="hover:text-white">+62 21-123-456-789</p>
              <p className="hover:text-white" >contact@qrent.com</p>
            </div>
          </div>
        </div>
      </div>
      <p className="pt-4 text-center text-xs md:text-sm pb-5 hover:text-white">
        Copyright 2025 © QRENT. All Right Reserved.
      </p>
    </footer>
  );
};

export default Footer;
