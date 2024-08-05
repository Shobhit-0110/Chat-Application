import React, { useState } from 'react';
import "./chatList.css"

const ChatList = () => {
  const [addMode, setAddMode] = useState(false);
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
        <div className="item">
            <img src="./mohit.jpg" alt="" />
            <div className="texts">
                <span>Batku Bhaiya</span>
                <p>Love you Baby!!</p>
            </div>
        </div>
        <div className="item">
            <img src="./gaurav.png" alt="" />
            <div className="texts">
                <span>Bordia</span>
                <p>Annu Ki Mummy Kaisi ho ??</p>
            </div>
        </div>
        <div className="item">
            <img src="./avatar.png" alt="" />
            <div className="texts">
                <span>Shore Bhai</span>
                <p>Chai peene Chloge??</p>
            </div>
        </div>
        
        <div className="item">
            <img src="./avatar.png" alt="" />
            <div className="texts">
                <span>Raj Bhai</span>
                <p>Khn ho bhai ??</p>
            </div>
        </div>
      
    </div>
  )
}

export default ChatList;