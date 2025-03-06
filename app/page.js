import Link from "next/link";
import Image from "next/image";



export const metadata = {
  title: "Get me a chai",
  description: "A Fund project",
};

export default function Home() {
  return (<>
    {/* Hero Section */}
    <div className="container max-w-screen-lg px-4 md:pb-5 md:h-[50vh] h-[40vh] gap-5 mx-auto text-white flex flex-col text-center justify-center">
      <div className="flex justify-center items-center gap-4">
        <span className="font-bold text-2xl md:text-3xl">Get Me a Chai</span>
        <span>
          <Image className="md:w-[4vw] w-[12vw] mt-2 md:mt-0" src="/coffeecup-removebg.png" alt="chai" />
        </span>
      </div>
      <span className="text-sm md:text-base">
        A crowdfunding platform for creators to fund their projects
      </span>
      <span className="text-sm md:text-base">
        A place where your fans can buy you a chai. Unleash the power of your fans and get your projects funded.
      </span>
      <div className="flex flex-col md:flex-row justify-center gap-4">
        <Link href={"/login"}>
          <button type="button" className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-6 py-3">
            Start Here
          </button>
        </Link>
        <Link href={"/about"}>
          <button type="button" className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-6 py-3">
            Read More
          </button>
        </Link>
      </div>
    </div>
  
    <div className="bg-white h-1 opacity-25"></div>
  
    {/* Features Section */}
    <div className="container max-w-screen-lg px-4 flex flex-col justify-center pb-5 mt-3 md:mt-0 md:h-[50vh] gap-5 mx-auto text-white">
      <div className="flex justify-center font-bold text-xl md:text-2xl items-center pb-5">
        <h2>Your Fans can buy you a Chai</h2>
      </div>
      <div className="flex flex-col md:flex-row gap-10 md:gap-0 justify-evenly text-center">
        {/* Feature Cards */}
        {[
          { img: "/worker-removebg-preview.png", title: "Fans want to help", text: "Your fans are available to support you" },
          { img: "/goldcoin.gif", title: "Fans want to contribute", text: "Your fans are willing to contribute financially" },
          { img: "group.jpg", title: "Fans want to collaborate", text: "Your fans are ready to collaborate with you" },
        ].map((item, index) => (
          <div key={index} className="flex flex-col justify-center items-center">
            <Image className="bg-slate-500 w-20 h-20 rounded-full" src={item.img} alt="chai" />
            <span className="font-bold text-sm md:text-base">{item.title}</span>
            <span className="text-xs md:text-sm">{item.text}</span>
          </div>
        ))}
      </div>
    </div>
  
    <div className="bg-white h-1 opacity-25"></div>
  
    {/* Video Section */}
    <div className="container max-w-screen-lg px-4 flex flex-col justify-center pb-10 pt-10 gap-5 mx-auto text-white">
      <div className="flex justify-center font-bold text-xl md:text-2xl items-center pb-5">
        <h2>Learn more about us</h2>
      </div>
      <div className="flex justify-center">
        <iframe
          className="w-full md:w-[50vw] h-[30vh] md:h-[60vh]"
          src="https://www.youtube.com/embed/iF6ePni8XAQ?si=qvCdw6DUC-_dftQs"
          title="YouTube video player"
          style={{ border: "0" }}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  </>
  
  

  );
}
