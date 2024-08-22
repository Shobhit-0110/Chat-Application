import React, { useEffect, useState } from 'react';
import "./chatList.css"
import Adduser from './adduser/Adduser';
import { useUserStore } from '../../../lib/userStore';
import { doc, getDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../../../lib/firebase';

const ChatList = () => {
  const [chats, setChats] = useState([]);
  const [addMode, setAddMode] = useState(false);

  const {currentUser} = useUserStore();

  useEffect(()=>{
    const unSub = onSnapshot(doc(db,"userchats",currentUser.id),async (res)=>{
    const items = res.data().chats;
    
    const promises = items.map(async (item)=>{
        const userDocRef = doc(db, "users", item.receiverId);
        const userDocSnap = await getDoc(userDocRef);

        const user = userDocSnap.data();

        return {...item, user};

    });

    const chatData = await Promise.all(promises)    

    setChats(chatData.sort((a,b) => b.updatedAt - a.updatedAt));

    });

    return ()=>{
        unSub();
    };
  },[currentUser.id]);

  return (
    <div className='chatList'>
        <div className="search">
            <div className="searchBar">
                <img src="./search.png" alt="" />
                <input type="text" placeholder="Search" />
            </div>
            <img 
            src= {addMode ? "./minus.png" : "./plus.png"}
            alt="" 
            className="add"
            onClick={()=>setAddMode((prev) => !prev)}
           
            />
        </div>

        {chats.map((chat) => (
             <div className="item" key={chats.chatId}>
             <img src="./mohit.jpg" alt="" />
             <div className="texts">
                 <span>Batku Bhaiya</span>
                 <p>{chats.lastMessage}</p>
             </div>
         </div>
        ))}
       
     {addMode && <Adduser />}
    </div>
  )
}

export default ChatList;