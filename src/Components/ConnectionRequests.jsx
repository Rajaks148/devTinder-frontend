import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";

const ConnectionRequests = () => {
  const [requests, setNewRequests] = useState([]);

  const fetchConnectionRequests = async () => {
    try {
      const res = await axios.get(
        BASE_URL + "user/requests/interested",
        { withCredentials: true }
      );
      setNewRequests(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchConnectionRequests();
  }, []);

  


    const handleReqStatus = async (id, status) => {
        try {
            await axios.post(
                BASE_URL + `request/review/${status}/${id}`,
                {},
                { withCredentials: true }
            );

            fetchConnectionRequests(); 
            window.dispatchEvent(new Event("request-count-updated")); 

        } catch (err) {
            console.log(err);
        }
    };





  return (
    <div className="min-h-screen bg-base-200 py-14 px-6">
      <h1 className="text-4xl font-extrabold text-center mb-12 text-white">
        New Requests
      </h1>

      {/* No Requests UI */}
      {requests.length === 0 && (
        <div className="text-center text-xl text-gray-400 mt-10">
          No new requests
        </div>
      )}

      <div
        className="
        grid 
        grid-cols-1 
        sm:grid-cols-2 
        lg:grid-cols-3 
        xl:grid-cols-4 
        gap-10 
        max-w-7xl 
        mx-auto
      "
      >
        {requests.map((req) => {
          const user = req.fromUserId;

          return (
            <div
              key={req._id}
              className="card bg-base-100 rounded-2xl shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
            >
              <figure className="px-6 pt-6">
                <img
                  src={user.photoUrl}
                  alt={user.firstName}
                  className="rounded-xl w-full h-48 object-cover shadow-md"
                />
              </figure>

              <div className="card-body p-6">
                <h2 className="card-title text-lg font-semibold">
                  {user.firstName} {user.lastName}, {user.age}
                </h2>

                <p className="text-sm opacity-70 mb-4">{user.about}</p>

                <div className="flex gap-3 mt-auto">
                  <button
                    onClick={() => handleReqStatus(req._id, "accepted")}
                    className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 rounded-full font-medium transition"
                  >
                    Accept
                  </button>

                  <button
                    onClick={() => handleReqStatus(req._id, "rejected")}
                    className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-full font-medium transition"
                  >
                    Reject
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ConnectionRequests;
