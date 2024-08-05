import "./chat.css"
import EmojiPicker from "emoji-picker-react";
import React, { useState } from 'react';

const Chat = () => {
  const [open,setOpen] = useState(false);
  const [text,setText] = useState("");

  const handleEmoji = e =>
  {
    setText((prev) => prev + e.emoji);
    setOpen(false)
  };
  return (
    <div className="chat">
      <div className="top">
        <div className="user">
          <img src="./avatar.png" alt="" />
          <div className="texts">
            <span>
              John Doe
            </span>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia nobis sed excepturi cupiditate harum, alias nam earum vel corporis et.</p>
          </div>
        </div>
        <div className="icons">
          <img src="./phone.png" alt="" />
          <img src="./video.png" alt="" />
          <img src="./info.png" alt="" />
        </div>

      </div>

      <div className="center">

      <div className="message">
        <img src="./avatar.png" alt="" />
        <div className="texts">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis consequatur numquam at iste labore. Sit sequi quidem voluptatem fuga suscipit.
          </p>
          <span>
            1 min ago
          </span>
        </div>
      </div>

      <div className="message own">
        <div className="texts">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis consequatur numquam at iste labore. Sit sequi quidem voluptatem fuga suscipit.
          </p>
          <span>
            1 min ago
          </span>
        </div>
      </div>

      <div className="message">
        <img src="./avatar.png" alt="" />
        <div className="texts">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis consequatur numquam at iste labore. Sit sequi quidem voluptatem fuga suscipit.
          </p>
          <span>
            1 min ago
          </span>
        </div>
      </div>

      <div className="message own">
        <div className="texts">
          <img src="https://imgs.search.brave.com/GtByrduGyaiER3r0M-2WcovHB6QfLOVG2ep1R1ISqGM/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS1waG90by9k/YWlzeS1maWVsZC1s/YW5kc2NhcGUtd2Fs/bHBhcGVyc18yMy0y/MTUwMjg3ODQxLmpw/Zz9zaXplPTYyNiZl/eHQ9anBn" alt="" />
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis consequatur numquam at iste labore. Sit sequi quidem voluptatem fuga suscipit.
          </p>
          <span>
            1 min ago
          </span>
        </div>
      </div>

      <div className="message">
        <img src="./avatar.png" alt="" />
        <div className="texts">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis consequatur numquam at iste labore. Sit sequi quidem voluptatem fuga suscipit.
          </p>
          <span>
            1 min ago
          </span>
        </div>
      </div>

      </div>

      <div className="bottom">
        <div className="icons">
          <img src="./img.png" alt="" />
          <img src="./camera.png" alt="" />
          <img src="./mic.png" alt="" />
        </div>
        <input
        type="text" 
        placeholder="Type a message..." 
        value={text}
        onChange={e =>setText(e.target.value)}
        />
        <div className="emoji">
          <img 
          src="./emoji.png"
          alt="" 
          onClick={()=> setOpen((prev) => !prev)}/>
          <div className="picker">
          <EmojiPicker open = {open} onEmojiClick={handleEmoji} /> 
          </div>
          
        </div>
        <button className="sendButton">Send</button>

      </div>      
      </div>
  )
}

export default Chat