import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { BASE_URL } from '../utils/constants';



const Profile = () => {

    const user = useSelector(store => store.user);

    const dispatch = useDispatch();

    const [firstName, setFirstName] = useState(user?.firstName || "");
    const [lastName, setLastName] = useState(user?.lastName || "");
    const [age, setAge] = useState(user?.age || "");
    const [gender, setGender] = useState(user?.gender || "");
    const [about, setAbout] = useState(user?.about || "");
    const [photoUrl, setPhotoUrl] = useState(user?.photoUrl || "");
    const [skills, setSkills] = useState([]);
    
    useEffect(() => {
        if (user) {
            console.log("USER FROM REDUX:", user);
            setFirstName(user.firstName || "");
            setLastName(user.lastName || "");
            setAge(user.age || "");
            setGender(user.gender || "");
            setAbout(user.about || "");
            setPhotoUrl(user.photoUrl || "");
            setSkills(user.skills || []);
        }
        }, [user]);

    const handleEdit = async () => {
        try {
            const updateProfile = await axios.patch(BASE_URL+"profile/edit", {
            firstName,
            lastName,
            age,
            gender,
            about,
            photoUrl,
            skills
        },
        { withCredentials: true }  
    );
        console.log(updateProfile.data);
        dispatch(addUser(res.data.data));
        } catch(err) {
            console.log(err);
        }
        

    }

  return (
    <div className="min-h-screen bg-base-200 flex items-start justify-center py-10 px-4">
      <div className="w-full max-w-xl bg-base-100 shadow-xl rounded-2xl p-8">

        
        <h1 className="text-2xl font-bold mb-6 text-center">Edit Profile</h1>

        
        <div className="flex flex-col items-center mb-6">
          <div className="avatar">
            <div className="w-32 h-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 overflow-hidden">
              <img src={photoUrl} alt="Profile Preview" />
            </div>
          </div>

          <input
            type="text"
            placeholder="Enter Photo URL" value={photoUrl} onChange={(e) => setPhotoUrl(e.target.value)}
            className="input input-bordered w-full mt-4"
          />
        </div>

        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">First Name</span>
            </label>
            <input type="text" className="input input-bordered" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
          </div>

          
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Last Name</span>
            </label>
            <input type="text" className="input input-bordered" value={lastName} onChange={(e) => setLastName(e.target.value)} />
          </div>

          
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Age</span>
            </label>
            <input type="number" className="input input-bordered" value={age} onChange={(e) => setAge(e.target.value)} />
          </div>

          
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Gender</span>
            </label>
            <select className="select select-bordered w-full" value={gender}
    onChange={(e) => setGender(e.target.value)}>
              <option disabled>Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="others">Other</option>
            </select>
          </div>
        </div>

        
        <div className="form-control mt-4">
          <label className="label">
            <span className="label-text font-semibold">About</span>
          </label>
          <textarea
            className="textarea textarea-bordered min-h-[120px]"
            placeholder="Tell us about yourself..."
            value={about} onChange={(e) => setAbout(e.target.value)}
          ></textarea>
        </div>

        <div className="form-control mt-4">
            <label className="label">
                <span className="label-text font-semibold">Skills</span>
            </label>

            <div className="flex flex-wrap gap-2 mb-3">
                {skills.map((skill, index) => (
                <div
                    key={index}
                    className="badge badge-secondary gap-2 py-3 px-4 text-sm flex items-center"
                >
                    {skill}

                    {/* Remove button (X) */}
                    <button
                    onClick={() => {
                        const updated = skills.filter((s, i) => i !== index);
                        setSkills(updated);
                    }}
                    className="ml-2 text-xs bg-pink-600 hover:bg-pink-700 text-white rounded-full w-4 h-4 flex items-center justify-center"
                    >
                    ✕
                    </button>
                </div>
                ))}
            </div>

            <input
                type="text"
                placeholder="Add skill and press Enter"
                className="input input-bordered"
                onKeyDown={(e) => {
                if (e.key === "Enter" && e.target.value.trim() !== "") {
                    const newSkill = e.target.value.trim();

                    // prevent duplicate skills
                    if (!skills.includes(newSkill)) {
                    setSkills([...skills, newSkill]);
                    }

                    e.target.value = "";
                }
                }}
            />
        </div>

        
        <div className="mt-6 flex justify-center">
          <button className="btn btn-primary px-10" onClick={handleEdit}>Save Profile</button>
        </div>
      </div>
    </div>
  );
}

export default Profile
