import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAppContext } from "../context/AppContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false); // State to control menu toggle
  const { user, logout, setShowUserLogin } = useAppContext(); // Use AppContext for user state and logout
  
  const toggleMenu = () => {
    setIsOpen(!isOpen); // Toggle the mobile menu
  };

  const handleLinkClick = () => {
    setIsOpen(false); // Close the menu when a link is clicked
  };

  return (
    <header className="flex flex-wrap md:justify-start md:flex-nowrap z-50 w-full bg-primary">
      <nav className="relative max-w-5xl w-full md:flex md:items-center md:justify-between md:gap-3 mx-auto px-4 sm:px-6 lg:px-8 py-2">
        {/* Logo w/ Collapse Button */}
        <div className="flex items-center justify-between">
          <NavLink to="/">
            <img className='flex-none focus:opacity-80 focus:outline-hidden max-w-20 mt-2 mb-2' draggable="false" src="/src/assets/logo.png" alt="logo" />
          </NavLink>

          {/* Collapse Button */}
          <div className="md:hidden">
            <button 
              type="button" 
              onClick={toggleMenu} // Toggle the mobile menu on click
              className="hs-collapse-toggle relative size-9 flex justify-center items-center text-sm font-semibold rounded-lg border border-white/50 text-white hover:bg-white/10 focus:outline-hidden focus:bg-white/10 disabled:opacity-50 disabled:pointer-events-none" 
              aria-expanded={isOpen ? "true" : "false"} 
              aria-controls="hs-base-header" 
              aria-label="Toggle navigation"
            >
              {/* Hamburger icon when menu is closed */}
              <svg className={`hs-collapse-open:hidden size-4 ${isOpen ? 'hidden' : ''}`} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" x2="21" y1="6" y2="6"/>
                <line x1="3" x2="21" y1="12" y2="12"/>
                <line x1="3" x2="21" y1="18" y2="18"/>
              </svg>
              {/* Close icon when menu is open */}
              <svg className={`hs-collapse-open:block shrink-0 ${!isOpen ? 'hidden' : ''} size-4`} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6 6 18"/>
                <path d="m6 6 12 12"/>
              </svg>
              <span className="sr-only">Toggle navigation</span>
            </button>
          </div>
          {/* End Collapse Button */}
        </div>
        {/* End Logo w/ Collapse Button */}

        {/* Collapse */}
        {/* Button Group */}
        <div id="hs-base-header" className={`hs-collapse ${isOpen ? 'block' : 'hidden'} overflow-hidden transition-all duration-300 basis-full grow md:block`} aria-labelledby="hs-base-header-collapse">
          <div className="overflow-hidden overflow-y-auto max-h-[75vh] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500">
            <div className="py-2 md:py-0 flex flex-col md:flex-row md:items-center md:justify-end gap-0.5 md:gap-1">
              <NavLink to="/" className="p-2 flex items-center text-sm text-white/80 hover:text-white focus:outline-hidden focus:text-white" aria-current="page" onClick={handleLinkClick}>
                <svg className="shrink-0 size-4 me-3 md:me-2 block md:hidden" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/><path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>
                Home
              </NavLink>

              <NavLink to="/#about" className="p-2 flex items-center text-sm text-white/80 hover:text-white focus:outline-hidden focus:text-white" href="#" onClick={handleLinkClick}>
                <svg className="shrink-0 size-4 me-3 md:me-2 block md:hidden" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"/></svg>
                About Us
              </NavLink>
              {user && <>
              <NavLink to="/profile" className="p-2 flex items-center text-sm text-white/80 hover:text-white focus:outline-hidden focus:text-white" onClick={handleLinkClick} aria-label="Profile">
                <svg className="shrink-0 size-4 me-3 md:me-2 block md:hidden" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
                Profile
              </NavLink>
              <NavLink to="/historytransaction" className="p-2 flex items-center text-sm text-white/80 hover:text-white focus:outline-hidden focus:text-white" onClick={handleLinkClick} aria-label="History Transaction">
                <svg className="shrink-0 size-4 me-3 md:me-2 block md:hidden" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
                History
              </NavLink>
              </>}

              <div className="relative flex flex-wrap items-center gap-x-1.5 md:ps-2.5 mt-1 md:mt-0 md:ms-1.5 before:block before:absolute before:top-1/2 before:-start-px before:w-px before:h-4 before:bg-white/30 before:-translate-y-1/2">
              
               {/* If not logged in, show login. If logged in, show logout */}
              {!user ? (
                <NavLink to="/login" className="p-2 w-full flex items-center text-sm text-white/80 hover:text-white focus:outline-hidden focus:text-white" onClick={()=>{setIsOpen(false); setShowUserLogin(true);}}>
                  <svg className="shrink-0 size-4 me-3 md:me-2" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75"/></svg>
                  Log in
                </NavLink>
              ) : (
                <NavLink to="/logout" className="p-2 w-full flex items-center text-sm text-white/80 hover:text-white focus:outline-hidden focus:text-white" onClick={logout}>
                  <svg className="shrink-0 size-4 me-3 md:me-2" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"/></svg>
                  Log out
                </NavLink>
              )}
              </div>
            </div>
          </div>
        </div>
        {/* End Collapse */}
      </nav>
    </header>
  );
}

export default Navbar;
