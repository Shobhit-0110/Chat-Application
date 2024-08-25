import "./chat.css";
import EmojiPicker from "emoji-picker-react";
import { arrayUnion, doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import React, { useEffect, useRef, useState } from 'react';
import { db } from "../../lib/firebase";
import { useChatStore } from "../../lib/chatStore";
import { useUserStore } from "../../lib/userStore";

// Function to upload an image to Firebase Storage and return the download URL
const upload = async (file) => {
  const storage = getStorage();
  const storageRef = ref(storage, `images/${file.name}`);
  const uploadTask = uploadBytesResumable(storageRef, file);

  return new Promise((resolve, reject) => {
    uploadTask.on(
      "state_changed",
      null,
      (error) => {
        reject(error);
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        resolve(downloadURL);
      }
    );
  });
};

const Chat = () => {
  const [chat, setChat] = useState(null);
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [img, setImg] = useState({
    file: null,
    url : "",
  });

  const { currentUser } = useUserStore();
  const { chatId, user, isCurrentUserBlocked, isReceiverBlocked } = useChatStore();
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat?.messages]);

  useEffect(() => {
    if (chatId) {
      const unSub = onSnapshot(doc(db, "chats", chatId), (res) => {
        setChat(res.data());
      });

      return () => {
        unSub();
      };
    }
  }, [chatId]);

  const handleEmoji = (e) => {
    setText((prev) => prev + e.emoji);
    setOpen(false);
  };

  const handleImg = (e) => {
    if (e.target.files[0]) {
      setImg({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0]),
      });
    }
  };

  const handleSend = async () => {
    if (text.trim() === "" && !img.file) return; // Ensure there's something to send

    try {
      let imgUrl = null;

      // Upload the image if there's one
      if (img.file) {
        console.log("Uploading image:", img.file);
        imgUrl = await upload(img.file); // Ensure `upload` returns the image URL
        console.log("Image uploaded, URL:", imgUrl);
      }

      // Prepare the message object
      const messageData = {
        senderId: currentUser.id,
        text,
        createdAt: new Date(),
        ...(imgUrl && { img: imgUrl }), // Add image URL if available
      };

      console.log("Sending message:", messageData);

      // Update the chat document with the new message
      await updateDoc(doc(db, "chats", chatId), {
        messages: arrayUnion(messageData),
      });

      // Update the user's chat list
      const userIDs = [currentUser.id, user.id];
      for (let id of userIDs) {
        const userChatsRef = doc(db, "userchats", id);
        const userChatsSnapshot = await getDoc(userChatsRef);

        if (userChatsSnapshot.exists()) {
          const userChatsData = userChatsSnapshot.data();
          const chatIndex = userChatsData.chats.findIndex(
            (c) => c.chatId === chatId
          );

          if (chatIndex !== -1) {
            userChatsData.chats[chatIndex].lastMessage = text || "Image";
            userChatsData.chats[chatIndex].isSeen = id === currentUser.id;
            userChatsData.chats[chatIndex].updatedAt = Date.now();

            await updateDoc(userChatsRef, {
              chats: userChatsData.chats,
            });
          }
        }
      }

      // Clear input fields after sending the message
      setText(""); // Reset text input
      setImg({ file: null, url: "" }); // Reset image input
    } catch (err) {
      console.error("Error sending message: ", err);
    }
  };

  return (
    <div className="chat">
      <div className="top">
        <div className="user">
          <img src={user?.avatar || "./avatar.png"} alt="" />
          <div className="texts">
            <span>{user?.username}</span>
            <p>{user?.status}</p>
          </div>
        </div>
        <div className="icons">
          <img src="./phone.png" alt="" />
          <img src="./video.png" alt="" />
          <img src="./info.png" alt="" />
        </div>
      </div>

      <div className="center">
        {chat?.messages?.map((message) => (
          <div className={message.senderId === currentUser.id ? "message own" : "message"} key={`${message.senderId}-${message.createdAt}`}>
            <div className="texts">
              {message.img && <img src={message.img} alt="" />}
              <p>{message.text}</p>
              <span>{new Date(message.createdAt).toLocaleTimeString()}</span>
            </div>
          </div>
        ))}

        {img.url && <div className="message own">
          <div className="texts">
            <img src={img.url} alt="" />
          </div>
        </div>}
        <div ref={endRef}></div>
      </div>

      <div className="bottom">
        <div className="icons">
          <label htmlFor="file">
            <img src="./img.png" alt="" />
          </label>
          <input type="file" id="file" style={{display: "none"}} 
            onChange={handleImg}/>
          <img src="./camera.png" alt="" />
          <img src="./mic.png" alt="" />
        </div>
        <input
          type="text"
          placeholder={
            (isCurrentUserBlocked || isReceiverBlocked) 
            ? "You cannot send a message" 
            :"Type a message..."}
          value={text}
          onChange={(e) => setText(e.target.value)}
          disabled = {isCurrentUserBlocked || isReceiverBlocked}
        />
        <div className="emoji">
          <img
            src="./emoji.png"
            alt=""
            onClick={() => setOpen((prev) => !prev)}
          />
          {open && (
            <div className="picker">
              <EmojiPicker onEmojiClick={handleEmoji} />
            </div>
          )}
        </div>
        <button className="sendButton" onClick={handleSend} disabled = {isCurrentUserBlocked || isReceiverBlocked} >Send</button>
      </div>
    </div>
  );
};

export default Chat;
