import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect, useState } from "react";

export default function Connections() {

    const [connections, setConnections] = useState([]);

    const connectionsList = async () => {
        
        try {
            const response = await axios.get(BASE_URL+'user/connections', {withCredentials: true});
            setConnections(response.data.data);
        } catch(err) {
            console.log(err.message);
        }
    }

    useEffect(() => {
        connectionsList();
    }, []);


  

  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
  {connections.map((user) => (
    <div
      key={user._id}
      className="bg-[#1f242d] rounded-2xl shadow-xl p-5 hover:scale-[1.02] transition"
    >
      {/* Image */}
      <div className="w-full h-56 rounded-xl overflow-hidden">
        <img
          src={user.photoUrl}
          alt="Profile"
          className="w-full h-full object-cover object-top"
        />
      </div>

      {/* Name + age */}
      <div className="mt-5">
        <h2 className="text-xl font-bold flex items-center gap-3 text-white">
          {user.firstName} {user.lastName}
          <span className="badge badge-primary text-white px-3 py-3">
            {user.age}
          </span>
        </h2>

        <p className="text-gray-400 mt-2 text-sm">{user.about}</p>
      </div>

      {/* Contact Icons */}
      <div className="flex items-center justify-between mt-6">

        {/* Chat */}
        <button className="btn btn-circle bg-[#8b12ff] border-none hover:bg-[#a44aff] text-white">
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                viewBox="0 0 24 24" className="w-6 h-6">
                <path d="M12 3c-4.97 0-9 3.58-9 8 0 1.82.69 3.5 1.89 4.86L3 21l5.41-1.71C9.37 19.76 10.66 20 12 20c4.97 0 9-3.58 9-8s-4.03-9-9-9zm0 2c3.86 0 7 2.69 7 6s-3.14 6-7 6c-1.17 0-2.32-.23-3.3-.67l-.47-.21-.5.16-2.17.68.63-2.03.15-.48-.33-.38C5.7 13.88 5 12.5 5 11c0-3.31 3.14-6 7-6z"/>
            </svg>
        </button>

        {/* Email */}
        <button className="btn btn-circle bg-[#8b12ff] border-none hover:bg-[#a44aff] text-white">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
            strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25H4.5a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5H4.5a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.09 1.94l-6.91 3.882a2.25 2.25 0 01-2.21 0L3.34 8.933a2.25 2.25 0 01-1.09-1.94V6.75" />
          </svg>
        </button>

        {/* WhatsApp */}
        <button className="btn btn-circle bg-[#25D366] border-none hover:bg-[#1aaa52] text-white">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"
            className="w-6 h-6 fill-current">
            <path d="M16.02 3C9.38 3 4 8.38 4 15.02c0 2.64.86 5.09 2.32 7.07L4 29l7.15-2.29A12.9 12.9 0 0 0 16 27c6.63 0 12-5.38 12-11.98C28 8.38 22.65 3 16.02 3zm6.82 16.52c-.29.81-1.71 1.55-2.37 1.65-.61.1-1.39.14-2.25-.14-.52-.17-1.19-.39-2.06-.77-3.62-1.57-5.98-5.2-6.17-5.45-.19-.26-1.47-1.95-1.47-3.72 0-1.77.93-2.64 1.26-3 .33-.36.72-.45.96-.45.24 0 .48 0 .69.01.22.01.52-.08.81.62.29.71 1 2.45 1.09 2.63.09.19.14.4.03.65-.1.26-.15.41-.29.63-.15.22-.31.48-.44.65-.15.18-.31.38-.13.71.19.33.84 1.39 1.81 2.26 1.25 1.11 2.3 1.45 2.63 1.6.33.15.52.13.71-.08.19-.22.82-.95 1.04-1.28.22-.33.43-.28.72-.17.29.1 1.86.88 2.18 1.04.32.15.54.24.63.38.08.14.08.83-.21 1.64z" />
          </svg>
        </button>

        {/* Instagram */}
        <button className="btn btn-circle bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] border-none text-white">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none"
            viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"
            className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M7.5 3h9A4.5 4.5 0 0 1 21 7.5v9A4.5 4.5 0 0 1 16.5 21h-9A4.5 4.5 0 0 1 3 16.5v-9A4.5 4.5 0 0 1 7.5 3zm9 3.75h.008v.008H16.5V6.75zM12 9.75A3.75 3.75 0 1 0 12 17.25a3.75 3.75 0 0 0 0-7.5z" />
          </svg>
        </button>

      </div>
    </div>
  ))}
</div>



  );
}
