import { useState } from "react";
import Item from "./Item";

export default function PackingList({items,onDeleteItem,onToggleItem,onDeleteAllItems}){

  const [sortBy, setSortBy] = useState("input");

  let sortedItems;
  if (sortBy ==="input") sortedItems=items 
  if (sortBy ==="description") sortedItems=items.slice().sort((a,b)=>a.description.localeCompare(b.description)) 
  if (sortBy ==="packed") sortedItems=items.slice().sort((a,b)=>+a.packed - +b.packed) 
  
  return (
  <div className='list'>
    <ul>
    {sortedItems.map((item)=>(
      <Item key={item.id} onDeleteItem={onDeleteItem} onToggleItem={onToggleItem} item={item}/>
    ))}
  </ul>

  <div className="actions" onChange={e=>setSortBy(e.target.value)}>
    <select>
      <option value='input'>Sort by input</option>
      <option value='description'>Sort by description</option>
      <option value='packed'>Sort by packed status</option>
    </select>
    <button onClick={onDeleteAllItems}>Clear List</button>
  </div>
    </div>
  )
}
