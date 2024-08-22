import { collection, query, where, getDocs } from "firebase/firestore";  // Ensure you import `query` and `where`
import { db } from "../../../../lib/firebase";
import "./adduser.css";
import { useState } from "react";

const Adduser = () => {
  const [user, setUser] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault(); 

    const formData = new FormData(e.target);
    const username = formData.get("username");

    try {
      const userRef = collection(db, "users");


      const q = query(userRef, where("username", "==", username));

 
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
      
        setUser(querySnapshot.docs[0].data());
      } else {
        setUser(null); 
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="adduser">
      <form onSubmit={handleSearch}>
        <input type="text" placeholder="Username" name="username" />
        <button>Search</button>
      </form>
      {user && (
        <div className="user">
          <div className="detail">
            <img src={user.avatar || "./avatar.png"} alt="" />
            <span>{user.username}</span>
          </div>
          <button>Add User</button>
        </div>
      )}
    </div>
  );
};

export default Adduser;
