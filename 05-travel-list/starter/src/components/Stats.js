export default function Stats({items}){
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