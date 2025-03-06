"use client"
import {useState, useRef, useEffect} from 'react'
import Image from "next/image";
import Link from 'next/link'
import { useSession, signIn, signOut } from "next-auth/react"

const Navbar = () => {

  const {data:session  } = useSession()
  const [showDropDown, setshowDropDown] = useState(false)
  const dropDownRef = useRef(null)

  const handleClicOutside=(e)=>{
    if(dropDownRef.current && !dropDownRef.current.contains(e.target)){
      setshowDropDown(false);
    }
  }
  useEffect(() => {
    const handleClicOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClicOutside);
    return () => {
    document.removeEventListener('mousedown', handleClicOutside);
    };
  }, [handleClicOutside]);

  return (
    <nav className="bg-slate-700 h-16 md:h-20 flex justify-between text-white items-center px-4 md:px-8">
    {/* Logo Section */}
    <Link href="/">
      <div className="font-bold md:text-xl text-[15px] flex items-center gap-2">
        <span>!!GetMeAChai!!</span>
        <Image className="md:w-[4vw] w-[10vw] max-w-[50px]" src="/coffeecup-removebg.png" alt="Chai Logo" />
      </div>
    </Link>
  
    {/* User Menu / Login Section */}
    <div className="relative" ref={dropDownRef}>
      {session ? (
        <>
          {/* Large Screen Welcome Button */}
          <button 
            onClick={() => setshowDropDown(!showDropDown)}
            className="hidden lg:inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-4 py-2 w-[50vw] max-w-xs truncate overflow-hidden"
          >
            Welcome {session.user.email.split("@")[0]}
            <svg className="w-3 h-3 ml-2" aria-hidden="true" fill="none" viewBox="0 0 10 6">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
            </svg>
          </button>
  
          {/* Mobile Dropdown Toggle */}
          <button 
            onClick={() => setshowDropDown(!showDropDown)}
            className="lg:hidden bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm w-10 h-10 flex items-center justify-center"
          >
            {session.user.email.charAt(0).toUpperCase()}
            <svg className="w-3 h-3 ml-2" aria-hidden="true" fill="none" viewBox="0 0 10 6">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
            </svg>
          </button>
  
          {/* Dropdown Menu */}
          <div className={`absolute right-0 mt-2 w-44 bg-slate-800 text-white rounded-lg shadow-lg z-50 ${showDropDown ? "" : "hidden"}`}>
            <ul className="py-2 text-sm">
              <li><Link href="/" className="block px-4 py-2 hover:bg-gray-500">Home</Link></li>
              <li><Link href="/dashboard" className="block px-4 py-2 hover:bg-gray-500">Dashboard</Link></li>
              <li><Link href={`/${session.user.email.split("@")[0]}`} className="block px-4 py-2 hover:bg-gray-500">Your Page</Link></li>
              <li><button onClick={() => signOut()} className="block w-full text-left px-4 py-2 hover:bg-gray-500">Sign out</button></li>
            </ul>
          </div>
  
          {/* Logout Button for Larger Screens */}
          <button 
            onClick={() => signOut()}
            className="hidden md:inline-flex text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-4 py-2 ml-4"
          >
            Log Out
          </button>
        </>
      ) : (
        <Link href="/login">
          <button className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-4 py-2">
            Login
          </button>
        </Link>
      )}
    </div>
  </nav>
  
  )
}

export default Navbar
