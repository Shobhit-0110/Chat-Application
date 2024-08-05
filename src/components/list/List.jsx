import "./list.css";
import ChatList from "./chatList/ChatList"
import Info from "./info/Info" 

const List = () => {
  return (
    <div className='list'>
      <Info/>
      <ChatList/>
    </div>
  )
}

export default List;