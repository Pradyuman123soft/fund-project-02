"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
// import { fetchuser, updateProfile } from "@/actions/useractions";
import { createOrUpdateUser, getUser, deleteUser } from "@/actions/useractions";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useForm } from "react-hook-form";

export default function Dashboard() {
  const { data: session } = useSession();
  // const [form, setform] = useState({});
  const [user, setUser] = useState(null);
  const { register, handleSubmit, setValue } = useForm();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  
  useEffect(() => {
    document.title = "Login - Get me a chai";
    // if (session) {
    //   getdata();
    // } else {
    //   router.push("/login");
    // }
    async function FetchData() {
      const userData = await getUser();
      if (userData) {
        setUser(userData);
        setValue("name", userData.name);
        setValue("username", userData.username);
        setValue("profilepic", userData.profilepic);
        setValue("coverpic", userData.coverpic);
      }
      setLoading(false);
    }
    FetchData();
  }, [setValue]);

  const onSubmit = async(data) => {
    const userData = {...data};
    const res = await createOrUpdateUser(userData);
    if(res.error){
      setMessage("Error in Updation and Creation");
    }else{
      setUser(res.user);
      setMessage("Signup successful");
      
        toast("Profile Updated!", {
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
  }

  return (
    <>
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
      transition="Bounce"
    ></ToastContainer>
    <div className="container mx-auto flex flex-col gap-5 items-center p-4 md:p-8 w-full max-w-2xl">
      <h1 className="font-bold text-2xl md:text-3xl text-center">
        Welcome To Your Dashboard
      </h1>
      <div className="w-full">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 w-full">
          <div className="flex flex-col w-full">
            <label htmlFor="name" className="text-sm md:text-base font-medium">Full Name</label>
            <input
              {...register("name")}
              type="text"
              className="bg-slate-700 text-white rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              name="name"
              id="name"
            />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="email" className="text-sm md:text-base font-medium">Email</label>
            <input
              className="bg-slate-700 text-white rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              type="email"
              name="email"
              id="email"
              value={session?.user?.email}
              disabled
            />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="username" className="text-sm md:text-base font-medium">Username</label>
            <input
              {...register("username")}
              type="text"
              className="bg-slate-700 text-white rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              name="username"
              id="username"
            />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="profilepic" className="text-sm md:text-base font-medium">Profile Picture URL</label>
            <input
              {...register("profilepic")}
              type="url"
              className="bg-slate-700 text-white rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              name="profilepic"
              id="profilepic"
            />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="coverpic" className="text-sm md:text-base font-medium">Cover Picture URL</label>
            <input
              {...register("coverpic")}
              type="url"
              className="bg-slate-700 text-white rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              name="coverpic"
              id="coverpic"
            />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 w-full md:w-96"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  </>
  );
};

// export default Dashboard;
