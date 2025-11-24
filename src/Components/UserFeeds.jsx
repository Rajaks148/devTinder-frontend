import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../Slice/feedSlice";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform
} from "framer-motion";
import { useState, useEffect } from "react";

const UserFeeds = ({ users }) => {
  const dispatch = useDispatch();

  const sendInterest = async (userId, status) => {
    try {
      await axios.post(
        `${BASE_URL}request/send/${status}/${userId}`,
        {},
        { withCredentials: true }
      );
    } catch (err) {
      console.log("SendInterest API Error:", err.response?.data || err.message);
    }
  };

  const handleSwipeComplete = (userId, direction) => {
    const status = direction === "right" ? "interested" : "ignored";
    sendInterest(userId, status);
    dispatch(removeUserFromFeed(userId));
  };

  const activeUser = users?.[0];
  const secondUser = users?.[1];
  const thirdUser = users?.[2];

  return (
    <div className="min-h-screen bg-base-300 flex items-center justify-center p-4 overflow-hidden">
      <div className="relative w-full max-w-sm h-[70vh]">

        {thirdUser && (
          <motion.div
            className="absolute inset-0 bg-base-200 rounded-2xl shadow-md"
            initial={{ scale: 0.85, y: 18, opacity: 0 }}
            animate={{ scale: 0.9, y: 8, opacity: 1 }}
          />
        )}

        {secondUser && (
          <motion.div
            className="absolute inset-0 bg-base-100 rounded-2xl shadow-lg"
            initial={{ scale: 0.92, y: 10, opacity: 0 }}
            animate={{ scale: 0.96, y: 3, opacity: 1 }}
          />
        )}

        <AnimatePresence>
          {activeUser && (
            <SwipeCard
              key={activeUser._id}
              user={activeUser}
              onSwipe={handleSwipeComplete}
            />
          )}
        </AnimatePresence>

      </div>
    </div>
  );
};



// ⭐ SwipeCard Component
const SwipeCard = ({ user, onSwipe }) => {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-150, 150], [-20, 20]);

  const interestedOpacity = useTransform(x, [40, 140], [0, 1]);
  const ignoredOpacity = useTransform(x, [-140, -40], [1, 0]);

  const [locked, setLocked] = useState(false);

  const handleDragEnd = (_, info) => {
    if (locked) return;

    const offset = info.offset.x;
    const velocity = info.velocity.x;

    if (offset > 150 || velocity > 800) {
      setLocked(true);
      onSwipe(user._id, "right");
      return;
    }

    if (offset < -150 || velocity < -800) {
      setLocked.true;
      onSwipe(user._id, "left");
      return;
    }
  };

  useEffect(() => {
    setLocked(false);
    x.set(0);
  }, [user._id]);

  const handleButtonClick = (type) => {
    if (locked) return;
    setLocked(true);

    if (type === "left") {
      x.set(-200);
      onSwipe(user._id, "left");
    } else {
      x.set(200);
      onSwipe(user._id, "right");
    }
  };

  return (
    <motion.div
      key={user._id}
      drag="x"
      style={{ x, rotate }}
      className="absolute inset-0 bg-base-100 rounded-2xl shadow-2xl overflow-hidden"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.25}
      onDragEnd={handleDragEnd}
      exit={{
        opacity: 0,
        x: x.get() > 0 ? 300 : -300,
        rotate: x.get() > 0 ? 25 : -25,
        transition: { duration: 0.35 }
      }}
    >

      {/* IMAGE */}
      <figure className="h-[72%] w-full relative">
        <img
          src={user.photoUrl}
          className="w-full h-full object-cover"
        />

        {/* ⭐ INTERESTED STAMP */}
        <motion.div
          style={{ opacity: interestedOpacity }}
          className="absolute top-4 left-4 border-2 border-green-500 text-green-500 px-4 py-1 text-xl font-bold rotate-[-20deg] rounded-lg"
        >
          INTERESTED
        </motion.div>

        {/* ⭐ IGNORED STAMP */}
        <motion.div
          style={{ opacity: ignoredOpacity }}
          className="absolute top-4 right-4 border-2 border-red-500 text-red-500 px-4 py-1 text-xl font-bold rotate-[20deg] rounded-lg"
        >
          IGNORED
        </motion.div>
      </figure>

      {/* BOTTOM INFO */}
      <div className="h-[28%] px-5 py-3 bg-base-100 flex flex-col justify-between">
        <div>
          <h2 className="text-lg font-bold leading-tight">
            {user.firstName} {user.lastName}, {user.age}
          </h2>
          <p className="text-gray-500 text-sm mt-1">{user.about}</p>
        </div>

        <div className="flex justify-between mt-2 px-2">
          <button
            className="btn btn-circle btn-error btn-outline text-xl"
            onClick={() => handleButtonClick("left")}
          >
            ✖
          </button>

          <button
            className="btn btn-circle btn-success btn-outline text-xl"
            onClick={() => handleButtonClick("right")}
          >
            ❤
          </button>
        </div>
      </div>

    </motion.div>
  );
};

export default UserFeeds;
