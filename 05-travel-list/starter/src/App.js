import { useState } from "react";
import Logo from "./components/Logo";
import Form from "./components/Form";
import PackingList from "./components/PackingList";
import Stats from "./components/Stats";


 
// const initialItems = [
//   { id: 1, description: "Passports", quantity: 2, packed: false },
//   { id: 2, description: "Socks", quantity: 12, packed: false },
//   { id: 3, description: "Charger", quantity: 1, packed: true },
// ];



function App() {
  const [items, setItem] = useState([]);

  function handleItems(item){
    setItem((items)=>[...items,item])
  }

  function deleteItem(id){
    console.log(id);
    setItem((items) => items.filter((item) => item.id !== id))
  }

  function toggleItem(id){
    setItem((items)=>
    items.map((item)=> item.id===id ? {...item,packed:!item.packed}:item))
  }

  function deleteAllItems(){
    const confirmed = window.confirm("Are you sure you want to clear the list?")
    confirmed && setItem([]);
  }

  return (<div className='app'>
    <Logo/>
    <Form onAddItems={handleItems}/>
    <PackingList items={items} onDeleteItem={deleteItem} onToggleItem={toggleItem} onDeleteAllItems={deleteAllItems}/>
    <Stats items={items}/>
  </div>)


}




export default App
