import React from 'react'

const footer = () => {
  const currentYear = new Date().getFullYear();


  return (
    <footer className="bg-slate-700 w-full py-4 text-white text-sm md:text-lg flex justify-center items-center text-center">
  <p>Copyright &copy; {currentYear} Get Me a Chai - All Rights Reserved</p>
</footer>

  )
}

export default footer
