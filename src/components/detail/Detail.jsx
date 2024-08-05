import "./detail.css"

const Detail = () => {
  return (
    <div className="detail">
      <div className="user">
      <img src="./avatar.png" alt="" />
      <h2>Jhon Doe</h2>
      <p>Lorem ipsum dolor sit amet.</p>
      </div>
      <div className="info">

        <div className="option">
         <div className="title">
          <span>Chat Setting</span>
          <img src="./arrowUp.png" alt="" />
        </div>
        </div>

        <div className="option">
         <div className="title">
          <span>Privacy & Help</span>
          <img src="./arrowUp.png" alt="" />
        </div>
        </div>

      <div className="option">
         <div className="title">
           <span>Shared Photos</span>
           <img src="./arrowDown.png" alt="" />
        </div>
        <div className="photos">

           <div className="photoItem">
            <div className="photoDetail">
              <img src="https://imgs.search.brave.com/c0jRiYIhGxNTysIUbPfWl4KG-PfNcy8DLJR12znrTc8/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHJlbWl1bS1waG90/by9waG90by1iZWF1/dHktZWxlZ2FudC1i/dXR0ZXJmbHlfMTI1/ODcxNS00MTY3OC5q/cGc_c2l6ZT02MjYm/ZXh0PWpwZw" alt="" />
              <span>photo_2024_2.png</span>
            </div>
            <img src="./download.png" alt="" className="icon"/> 
           </div> 
           <div className="photoItem">
            <div className="photoDetail">
              <img src="https://imgs.search.brave.com/c0jRiYIhGxNTysIUbPfWl4KG-PfNcy8DLJR12znrTc8/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHJlbWl1bS1waG90/by9waG90by1iZWF1/dHktZWxlZ2FudC1i/dXR0ZXJmbHlfMTI1/ODcxNS00MTY3OC5q/cGc_c2l6ZT02MjYm/ZXh0PWpwZw" alt="" />
              <span>photo_2024_2.png</span>
            </div>
            <img src="./download.png" alt="" className="icon"/> 
           </div> 
           <div className="photoItem">
            <div className="photoDetail">
              <img src="https://imgs.search.brave.com/c0jRiYIhGxNTysIUbPfWl4KG-PfNcy8DLJR12znrTc8/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHJlbWl1bS1waG90/by9waG90by1iZWF1/dHktZWxlZ2FudC1i/dXR0ZXJmbHlfMTI1/ODcxNS00MTY3OC5q/cGc_c2l6ZT02MjYm/ZXh0PWpwZw" alt="" />
              <span>photo_2024_2.png</span>
            </div>
            <img src="./download.png" alt="" className="icon"/> 
           </div> 

        </div>
      </div>
        
        <div className="option">
         <div className="title">
          <span>Shared Files</span>
          <img src="./arrowUp.png" alt="" />
        </div>
        </div>
        <button>Block User</button>
        <button className="logout">Logout</button>
      </div>
      </div>
  )
}

export default Detail