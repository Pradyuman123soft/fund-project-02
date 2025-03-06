"use client"
import React from 'react'
import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { metadata } from '../layout'

const Login = () => {
    const { data : session} = useSession();
    const router = useRouter()
    useEffect(() => {
        document.title = "Login - Get me a chai"
        if(session){
            router.push('/dashboard')
        }  
    }, [session, router])
    


  return (
    <div className="text-white flex flex-col container mx-auto justify-center items-center py-14 px-4 sm:px-8">
    <h2 className="font-bold text-3xl sm:text-4xl text-center">Login to Get Started</h2>
    
    <div className="flex flex-col gap-4 min-h-screen p-6 sm:p-10 justify-center items-center w-full">
      <button 
        onClick={() => signIn("github")}
        className="flex items-center w-full max-w-sm bg-white border border-gray-300 rounded-lg shadow-md px-6 py-3 text-sm sm:text-base font-medium text-gray-800 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
      >
        <svg className="h-6 w-6 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 73 73" version="1.1">
          <g id="team-collaboration/version-control/github" fill="none" fillRule="evenodd">
            <g id="container" transform="translate(2.000000, 2.000000)" fillRule="nonzero">
              <rect id="mask" stroke="#000000" strokeWidth="2" fill="#000000" x="-1" y="-1" width="71" height="71" rx="14"></rect>
              <path id="Shape" fill="#FFFFFF" d="M58.3067362,21.4281798 ..."></path>
            </g>
          </g>
        </svg>
        <span>Continue with Github</span>
      </button>
    </div>
  </div>
  
  )
}

export default Login
