import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import useUser from "../hooks/useUser";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Account from "../pages/Account";
import Events from "../pages/Events";
import Event from "../pages/Event";
import Messenger from "../pages/Messenger";
import Home from "../pages/Home";
import Footer from "./Footer";

export default function Navigation() {

  const user = useUser(),
  [open, setOpen] = useState(false),
  [width, setWidth] = React.useState(window.innerWidth),
  breakpoint = 1024,

  handleLogout = async(e)=>{
    e.preventDefault()
    try{
      await user.logout()
    }
    catch (error){
      console.log(error);
    }
  }

  useEffect(() => {
    const handleResizeWindow = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResizeWindow);
    return () => {
      window.removeEventListener("resize", handleResizeWindow);
    };
  }, []);

  return (
    <Router>
      <div className="relative min-h-100 lg:flex bg-gray-100">
          {/* mobile menu bar */}
          <div className="sticky top-0 z-50 lg:hidden min-w-full flex justify-between bg-gray-800 text-gray-200">
            <Link to="/">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 m-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"/>
              </svg>
            </Link>

            <button onClick={() => setOpen(!open)} className={`p-4 ${open && "focus:outline-none focus:bg-gray-700"}`}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"/>
              </svg>
            </button>
          </div>

          {/* Sidebar */}
          <div className={`sidebar lg:min-h-screen lg:sticky lg:top-0 space-y-6 text-white px-2 ${ width < breakpoint ? "bg-gray-600 absolute top-15 min-w-full z-[100]" : "bg-indigo-950 text-lg pt-8 w-[240px]"}
          transform-translate-x-full lg:relative lg:translate-x-0 transition duration-200 ease-in-out`}>
            { width > breakpoint && (
              <>
                <Link to="/" className="block min-w-[400px] text-2xl font-extrabold text-blue-100 space-x-3 px-4 pr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 inline pb-1 text-5xl">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"/>
                  </svg>
                  <span>Events App</span>
                </Link>
                <nav className="px-4">
                  <Link to={"/"} className="text-blue-100 block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-700">
                    Home
                  </Link>
                  <Link to={"/events"} onClick={() => setOpen(false)} className="text-blue-100 block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-700">
                    Events
                  </Link>
                  {!user.data && <>
                  <Link to={"/login"} className="text-blue-100 block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-700">
                    Login
                  </Link>
                  <Link to={"/register"} className="text-blue-100 block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-700">
                    Signup
                  </Link>
                  </>
                  }
                  { user?.data && <>
                    <Link to={"/account"} className="text-blue-100 block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-700" >
                      Account
                    </Link>
                    <Link to={"/messenger"} className="text-blue-100 block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-700" >
                      Messenger
                    </Link>
                    <div onClick={handleLogout} >
                      <Link  to={"/login"} className="text-blue-100 block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-700" >
                        Logout
                      </Link>
                    </div>
                    </>
                  }
                </nav>
              </>
            )}

            { width < breakpoint && open && (
              <nav className="py-4 top-20 text-white">
                <Link to={"/"} onClick={() => setOpen(false)} className="block py-2.5 px-4 hover:bg-gray-700 rounded transition duration-200"
                >
                  Home
                </Link>
                {!user.data && <>

                <Link to={"/login"}  onClick={() => setOpen(false)} className="block py-2.5 px-4 hover:bg-gray-700 rounded transition duration-200">
                  Login
                </Link>
                <Link to={"/register"} onClick={() => setOpen(false)} className="block py-2.5 px-4 hover:bg-gray-700 rounded transition duration-200">
                  Signup
                </Link>
                </>}
                <Link to={"/events"} onClick={() => setOpen(false)} className="block py-2.5 px-4 hover:bg-gray-700 rounded transition duration-200">
                  Events
                </Link>

                { user?.data && <> 

                <Link to={"/account"} onClick={() => setOpen(false)} className="block py-2.5 px-4 hover:bg-gray-700 rounded transition duration-200">
                  Account
                </Link>
                <Link to={"/messenger"} onClick={() => setOpen(false)} className="block py-2.5 px-4 hover:bg-gray-700 rounded transition duration-200">
                  Messenger
                </Link>
                <div onClick={handleLogout} >
                  <Link to={"/login"} className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700" >
                  Logout
                </Link>
                </div>
                </>}
              </nav>
            )}
          </div>

          {/* Routes / Pages */}
          <div className="max-w-screen mx-auto md:my-2 lg:my-0">
            <Routes>
              <Route path="/" element={<Home/>} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register/>} />
              <Route path="/account" element={<Account/>} />
              <Route path="/events" element={<Events/>} />
              <Route path="/events/:id" element={<Event/>} />
              <Route path="/messenger" element={<Messenger/>} />
            </Routes>
          </div>
      </div>
      <div  className='h-[5px] w-full bg-gray-800/50 px-8'/>
      <Footer/>
    </Router>
  );
}
