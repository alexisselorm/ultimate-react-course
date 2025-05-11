import {useState} from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

function Button({children,onClick}) {
    return <button className="button" onClick={onClick}>{children}</button>
}

export default function App(){
    const [showAddFriend, setShowAddFriend] = useState(false);
    const [friends, setFriends] = useState(initialFriends);
    const [selectedFriend, setSelectedFriend] = useState(null);

    function handleShowAddFriend(){
        setShowAddFriend(show=>!show);
    }

    function handleAddFriend(friend){
        setFriends(prevFriends=> [...prevFriends, friend]);
        setShowAddFriend(false);
    }

    function handleSelectedFriend(selectedFriend){
        // setSelectedFriend(selectedFriend);
        setSelectedFriend(selected=>selected?.id === selectedFriend?.id ? null: selectedFriend);
        setShowAddFriend(false);
    }

    function handleSplitBill(value){
        // console.log(value);
        setFriends(prevFriends=> prevFriends.map(friend=>(
            friend.id === selectedFriend.id ? {...friend,balance: friend.balance+value}:friend
        )));
        setSelectedFriend(null)
    }


    return (
      <div className="app">
        <div className="sidebar">
          <FriendsList friends={friends} selectedFriend={selectedFriend} onSelection={handleSelectedFriend} />
            {showAddFriend && <FormAddFriend onAddFriend={handleAddFriend} />}
          <Button onClick={handleShowAddFriend}>{!showAddFriend? "Add Friend":"Close"}</Button>
        </div>
          {selectedFriend && <FormSplitBill key={selectedFriend.id} onSplitBill={handleSplitBill} friend={selectedFriend}/>}
      </div>
  )
}



function FriendsList({friends,selectedFriend,onSelection}){
  return (
      <ul>
        {friends.map(friend => (
            <Friend friend={friend} key={friend.id} selectedFriend={selectedFriend} onSelection={onSelection} />
        ))}
      </ul>
  )
}

function Friend({friend,selectedFriend,onSelection}) {
    const isSelected = selectedFriend?.id === friend?.id;
  return <li className={isSelected ? "selected":""}>
    <img src={friend.image} alt={friend.name} />
    <h3>{friend.name}</h3>
    {friend.balance < 0 && (
        <p className="red">
          You owe {friend.name} {Math.abs(friend.balance)}
        </p>
    )}
    {friend.balance > 0 && (
        <p className="green">
          {friend.name} owes you {Math.abs(friend.balance)}
        </p>
    )}
    {friend.balance === 0 && (
        <p >
          You and {friend.name} are even
        </p>
    )}
    <Button onClick={()=>onSelection(friend)}>{isSelected ? "Close":"Select"}</Button>
  </li>
}



function FormAddFriend({onAddFriend}) {
    const [name,setName] = useState("");
    const [image, setImage] = useState("https://i.pravatar.cc/48");

    function handleSubmit(e){
        e.preventDefault();

        const id=crypto.randomUUID()
        const friend = {
            name,image:`${image}?=${id}`,balance:0,id
        };
        console.log(friend);
        onAddFriend(friend);
        setName("");
        setImage("https://i.pravatar.cc/48");
    }

  return (
      <form className="form-add-friend" onSubmit={handleSubmit}>
        <label>🗒Friend name</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />

        <label>🖼Image url</label>
        <input type=" text" value={image} onChange={(e) => setImage(e.target.value)} />
        <Button>Submit</Button>

      </form>
  )
}

function FormSplitBill({friend,onSplitBill}){
    const [bill,setBill] = useState("")
    const [paidByUser, setPaidByUser] = useState("")
    const [whoIsPaying, setWhoIsPaying] = useState("")
    const paidByFriend= bill ? bill - paidByUser:"";

    function handleSubmit(e){
        e.preventDefault();

        if (!bill || !paidByUser) return;
        onSplitBill(whoIsPaying ==='user'? -paidByFriend:paidByUser);

    }


  return (
      <form className="form-split-bill" onSubmit={handleSubmit}>
        <h2>Split a bill with {friend.name}</h2>

        <label>💸Bill Value</label>
        <input type=" text" value={bill} onChange={(e) => setBill(Number(e.target.value))} />

        <label>🕴Your expense</label>
        <input type=" text" value={paidByUser} onChange={(e) => setPaidByUser(Number(e.target.value) > bill ? paidByUser:Number(e.target.value))} />

        <label>👫{friend.name}'s expense</label>
        <input type=" text" value={paidByFriend} />

        <label> 🤑Who is paying</label>
        <select value={whoIsPaying} onChange={(e) => setWhoIsPaying(e.target.value)} >
          <option value="user">You</option>
          <option value={friend.name}>{friend.name}</option>
        </select>
        <Button>Split Bill</Button>
      </form>
  )
}