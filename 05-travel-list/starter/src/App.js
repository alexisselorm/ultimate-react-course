import { useState } from "react";


 
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

  return (<div className='app'>
    <Logo/>
    <Form onAddItems={handleItems}/>
    <PackingList items={items} onDeleteItem={deleteItem} onToggleItem={toggleItem}/>
    <Stats items={items}/>
  </div>)


}

function Logo(){
  return( <h1> Far away 🌴👜</h1>)
}

function Form({onAddItems}){
  const [description, setDescription] = useState();
  const [quantity, setQuantity] = useState(1);
  
  function handleSubmit(e){
    e.preventDefault();

    if(!description) return;

    const newItem = {
      description,quantity,packed:false,id:new Date()
    }
    onAddItems(newItem);
    setDescription("");
    setQuantity(1);
    
  }

  return( 
  <form className='add-form' onSubmit={handleSubmit}>
    <h3>What do you need for your trip 😍</h3>
    <select value={quantity} onChange={e=>setQuantity(+e.target.value)}>
      {Array.from({length:20},(_,i)=> i+1)
      .map(num=>(<option value={num} key={num}>{num}</option>)
      )}
    </select>
    <input type="text" placeholder="item..." value={description} onChange={(e)=>setDescription(e.target.value)}/>
    <button>Add</button>
  </form>
  )
}
function PackingList({items,onDeleteItem,onToggleItem}){
  return (
  <div className='list'>
    <ul>
    {items.map((item)=>(
      <Item key={item.id} onDeleteItem={onDeleteItem} onToggleItem={onToggleItem} item={item}/>
    ))}
  </ul>
    </div>
  )
}

function Item({item,onDeleteItem,onToggleItem}){
  return (
      <li>
        <input type="checkbox" value={item.packed} onChange={()=>onToggleItem(item.id)}/>
    <span style={item.packed ?{textDecoration:"line-through"}:{}}>
        {item.quantity} {item.description}
    </span>
    <button onClick={()=>onDeleteItem(item.id)}>❌</button>
        </li>
  )
}

function Stats({items}){
  const numItems = items.length;
  const packedItemsCounts = items.filter(item=>item.packed).length
  const packedPercentage = Math.round((packedItemsCounts/numItems)*100)



  return (
    <footer className="stats">
      <em>
        {packedPercentage===100 ?
        'You are ready to ✈':
        
        `👜You have ${numItems} items on your list, and you are already packed ${packedItemsCounts} (${packedPercentage}%)`
        }
        </em>
    </footer>
  )
}

export default App
