import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addFeed } from '../Slice/feedSlice';
import UserFeeds from './UserFeeds';


const Feed = () => {

    const dispatch = useDispatch();
    
    const fetchFeed = async () => {
        const res = await axios.get(BASE_URL+"user/feed", {
            withCredentials: true,
        });
        //console.log(res.data);
        dispatch(addFeed(res.data.data));
    }

    const feed = useSelector(store => store.feed);

    useEffect(() => {
        //if(feed) return;
        fetchFeed();
    }, []);


  return (
    <>
    <UserFeeds users={feed} />
    </>

  );
}

export default Feed
