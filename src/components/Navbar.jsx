import React from 'react'
// border-green-600 border-2 

const Navbar = () => {
  return (
    <nav className='w-[100vw] px-6 bg-slate-800 flex justify-between items-center text-yellow-50 h-14 hover:bg-slate-700  transition-all duration-500 overflow-hidden'> 
      <div className="brand m-5 font-bold text-xl bg-[#ff6a00] w-24 text-center h-8 rounded-md">Day It</div>
      <div className="options w-1/2 flex justify-end items-center h-full">
        <ul className='flex justify-center items-center gap-1 text-base h-full'>
            <li className='hover:text-lg h-10 flex justify-center items-center w-[88px]  transition-all duration-100 antialiased cursor-pointer'>Home</li>
            <li className='hover:text-lg h-10 w-28 flex justify-center items-center transition-all duration-100 cursor-pointer'>About</li>
            <li className='hover:text-lg h-10 w-28 flex justify-center items-center transition-all duration-100 cursor-pointer'>Contact Us</li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
