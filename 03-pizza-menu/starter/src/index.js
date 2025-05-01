import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
// import { getPizzas } from "../public/data";

const pizzaData = [
  {
    name: "Focaccia",
    ingredients: "Bread with italian olive oil and rosemary",
    price: 6,
    photoName: "pizzas/focaccia.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Margherita",
    ingredients: "Tomato and mozarella",
    price: 10,
    photoName: "pizzas/margherita.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Spinaci",
    ingredients: "Tomato, mozarella, spinach, and ricotta cheese",
    price: 12,
    photoName: "pizzas/spinaci.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Funghi",
    ingredients: "Tomato, mozarella, mushrooms, and onion",
    price: 12,
    photoName: "pizzas/funghi.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Salamino",
    ingredients: "Tomato, mozarella, and pepperoni",
    price: 15,
    photoName: "pizzas/salamino.jpg",
    soldOut: true,
  },
  {
    name: "Pizza Prosciutto",
    ingredients: "Tomato, mozarella, ham, aragula, and burrata cheese",
    price: 18,
    photoName: "pizzas/prosciutto.jpg",
    soldOut: false,
  },
];


function App(){
  return (
  <div className="container">
  <Header/>
  <Menu/>
  <Footer/>
  </div>
)
}

function Header(){
  return (
    <header className="header">
      <h1>Fast React Pizaa Co.</h1>
    </header>
)

}
function Menu(){

  return (
    <main className="menu">
    <h2>Our menu</h2>
    {
      pizzaData.length >0 ?(
      <>
       <p>Authentic Italian Cuisine. 6 creative dishes to choose from. All from our stone oven. all organic, all delicious.</p>
        <ul className="pizzas">
        {pizzaData.map(pizza=>(
          <Pizza key={pizza.name} name={pizza.name} ingredient={pizza.ingredients} photoName={pizza.photoName} price={pizza.price} soldOut={pizza.soldOut}/>
        ))}
        </ul>
      </>
      ) : <p>Nothing to show you here right now</p>
    }

  
    </main>
  )
}
function Footer(){
  const hour = new Date().getHours()
  const openHour =12
  const closeHour =22
  const isOpen=hour >=openHour && hour <=closeHour
  console.log(isOpen);

  return (
    <footer className="footer"> {isOpen ? (
      <Order openHour={openHour} closeHour={closeHour}/>
   ) : <p>We're happing to welcome you between {openHour}:00  and {closeHour}:00</p>
}
</footer>
  )
}

function Order({closeHour}){
  return (
    <div className="order">
    <p>We're open until {closeHour}:00. Come visit us or order online</p>
    <button className="btn">Order Now</button>
      </div>
  )
}


function Pizza(props){
 return (

  <div className={`pizza ${props.soldOut? "sold-out":""}`}>
  <img src={props.photoName} alt={props.name} />
  <div>
  <h3>{props.name}</h3>
  <p>{props.ingredient}</p>
  <span>{props.soldOut ? "SOLD OUT" :props.price}</span>
  </div>
 </div>

 )
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
<StrictMode>
<App/>
</StrictMode>
)