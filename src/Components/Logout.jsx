import axios from "axios";
import { useDispatch } from "react-redux";
import { removeUser } from "../Slice/userSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const logoutUser = async () => {
      try {
        await axios.post(
          BASE_URL+"logout",
          {},
          { withCredentials: true }
        );

        dispatch(removeUser());   
        navigate("/login");       
      } catch (error) {
        console.log("Logout error", error);
      }
    };

    logoutUser();
  }, []);

  return <div>Logging out...</div>;
};

export default Logout;