"use client"
import { useState, useEffect } from 'react'
import Image from "next/image";
import Script from 'next/script'
// import { useSession } from 'next-auth/react'
import { getUser, fetchpayments, initiate } from '@/actions/useractions'
import { useSearchParams } from 'next/navigation'
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation'


const PaymentPage = ({ username }) => {
   // const {  } = useSession()
  // const { data: session } = useSession()
  const searchParams = useSearchParams()
  const [paymentform, setpaymentform] = useState({})
  const [currentUser, setcurrentUser] = useState({})
  const [payments, setpayments] = useState([])
  const router = useRouter()
  useEffect(() => {
    getdata();
  }, [])

  useEffect(() => {
    const paymentDone = searchParams.get("paymentdone");

    if (paymentDone === "true") {
      console.log('Triggering toast');
      toast('Payment Done!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
    router.push(`/${username}`)
  }, [searchParams]);


  const handlechange = (e) => {
    setpaymentform({ ...paymentform, [e.target.name]: e.target.value })
  }

  const getdata = async (params) => {
    let u = await getUser()
    setcurrentUser(u);
    let dbpayments = await fetchpayments(username)
    setpayments(dbpayments)
  }
  const pay = async (amount) => {
    // get the orderid
    let a = await initiate(amount, username, paymentform)
    let orderId = a.id
    var options = {
      "key": currentUser.razorpayId, // Enter the Key ID generated from the Dashboard
      "amount": "50000", // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      "currency": "INR",
      "name": "Get Me A chai", //your business name
      "description": "Test Transaction",
      "image": "https://example.com/your_logo",
      "order_id": orderId, //This is a sample Order ID. Pass the id obtained in the response of Step 1
      "callback_url": `${process.env.NEXT_PUBLIC_URL}/api/razorpay`,
      "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
        "name": "Gaurav Kumar", //your customer's name
        "email": "gaurav.kumar@example.com",
        "contact": "9000090000" //Provide the customer's phone number for better conversion rates 
      },
      "notes": {
        "address": "Razorpay Corporate Office"
      },
      "theme": {
        "color": "#3399cc"
      }
    };
    var rzp1 = new Razorpay(options);
    rzp1.open();
  }


  return (<>
    <ToastContainer
      position='top-right'
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme='light'
      transition="Bounce"
    />
    <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>
  
    {/* Profile & Cover Section */}
    <div className='relative w-full'>
      <Image 
        src={currentUser.coverpic} 
        className='object-cover w-full md:h-[55vh] h-48' 
        alt="Background" 
      />
      <Image 
        className='md:w-[6vw] w-[17vw] absolute -bottom-[51px] md:right-[45%] right-[40%] border-4 border-white rounded-full' 
        src={currentUser.profilepic} 
        alt="Profile" 
      />
    </div>
  
    {/* User Info */}
    <div className="info flex flex-col items-center text-center pt-14">
      <span className='text-xl font-bold'>@{username}</span>
      <span className='text-gray-300'>Let&apos;s help {username} get a chai!</span>
      <span className='text-sm md:text-base'>
        {payments.length} Payments · ₹{payments.reduce((a, b) => a + b.amount, 0)} Raised
      </span>
    </div>
  
    {/* Payment & Donators Section */}
    <div className="paymentinfo container mx-auto py-10 flex flex-col md:flex-row gap-6 items-center px-4 md:px-0">
      
      {/* Donator List */}
      <div className="donator md:w-[40vw] w-full max-w-[90%] rounded-lg bg-slate-800 overflow-auto scrollbar-thumb-gray-950 scrollbar-thin scrollbar-track-gray-600 p-5 h-[45vh]">
        <h2 className='font-bold text-2xl mb-3 text-white'>Supporters</h2>
        <ul className='flex flex-col gap-3 text-sm text-gray-300'>
          {payments.length === 0 ? (
            <li className="text-center text-gray-400">No Payments yet</li>
          ) : (
            payments.map((p, i) => (
              <li key={i} className='flex items-center gap-3'>
                <Image className='w-10 h-10 rounded-full' src="/profile.webp" alt="Donor" />
                <span className='text-white'>{p.name} donated ₹{p.amount}</span>
                <span className="italic text-gray-400">"{p.message}"</span>
              </li>
            ))
          )}
        </ul>
      </div>
  
      {/* Payment Form */}
      <div className="payment md:w-[40vw] w-full max-w-[90%] bg-slate-800 rounded-lg p-5 h-[45vh]">
        <h2 className='font-bold text-2xl mb-3 text-white'>Make a Payment</h2>
        <div className='flex flex-col gap-3'>
          <input 
            onChange={handlechange} 
            className='bg-slate-700 w-full rounded-lg pl-4 py-2 text-white placeholder-gray-400' 
            value={paymentform?.name || ""} 
            placeholder='Enter Name' 
            type="text" 
            name="name" 
          />
          <input 
            onChange={handlechange} 
            className='bg-slate-700 w-full rounded-lg pl-4 py-2 text-white placeholder-gray-400' 
            value={paymentform?.message || ""} 
            placeholder='Enter Message' 
            type="text" 
            name="message" 
          />
          <input 
            onChange={handlechange} 
            className='bg-slate-700 w-full rounded-lg pl-4 py-2 text-white placeholder-gray-400' 
            value={paymentform?.amount || ""} 
            placeholder='Enter amount' 
            type="number" 
            name="amount" 
          />
  
          {/* Payment Button */}
          <button
            onClick={() => pay(Number.parseInt(paymentform.amount))}
            type="button"
            className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center disabled:bg-slate-500 disabled:from-slate-600"
            disabled={
              paymentform.name?.length < 3 ||
              paymentform.message?.length < 4 ||
              !paymentform.amount || isNaN(Number(paymentform.amount))
            }
          >
            Pay
          </button>
  
          {/* Quick Payment Buttons */}
          <div className='flex justify-center gap-3'>
            <button className='bg-slate-700 rounded-lg py-2 px-4 text-white' onClick={() => pay(10)}>₹10</button>
            <button className='bg-slate-700 rounded-lg py-2 px-4 text-white' onClick={() => pay(20)}>₹20</button>
            <button className='bg-slate-700 rounded-lg py-2 px-4 text-white' onClick={() => pay(30)}>₹30</button>
          </div>
        </div>
      </div>
    </div>
  </>
  )
}

export default PaymentPage
