import React, { useState } from "react";
import ReactDOM from "react-dom/client" 
import "./index.css";

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
        ingredients: "Tomato and mozzarella",
        price: 10,
        photoName: "pizzas/margherita.jpg",
        soldOut: false,
    },
    {
        name: "Pizza Spinaci",
        ingredients: "Tomato, mozzarella, spinach, and ricotta cheese",
        price: 12,
        photoName: "pizzas/spinaci.jpg",
        soldOut: false,
    },
    {
        name: "Pizza Funghi",
        ingredients: "Tomato, mozzarella, mushrooms, and onion",
        price: 12,
        photoName: "pizzas/funghi.jpg",
        soldOut: false,
    },
    {
        name: "Pizza Salamino",
        ingredients: "Tomato, mozzarella, and pepperoni",
        price: 15,
        photoName: "pizzas/salamino.jpg",
        soldOut: true,
    },
    {
        name: "Pizza Prosciutto",
        ingredients: "Tomato, mozzarella, ham, arugula, and burrata cheese",
        price: 18,
        photoName: "pizzas/prosciutto.jpg",
        soldOut: false,
    },
];

function App() {
    const [selectedPizzas, setSelectedPizzas] = useState({});
  
    // Update selected pizzas with their quantities
    const handleQuantityChange = (name, quantity) => {
      setSelectedPizzas((prev) => ({
        ...prev,
        [name]: quantity,
      }));
    };
  
    return (
      <div className="container">
        <Header />
        <Menu selectedPizzas={selectedPizzas} onQuantityChange={handleQuantityChange} />
        <Footer selectedPizzas={selectedPizzas} />
      </div>
    );
  }
  
  function Header() {
    return (
      <div style={{ textAlign: "center" }}>
        <h1 style={{ color: "Brown", fontSize: "48px", textTransform: "uppercase" }}>Shi Qi's Pizza Co.</h1>
        <p style={{ color: "Dark Grey", fontSize: "15px" }}>Crafted with passion, served with love</p>
      </div>
    );
  }
  
  function Menu({ selectedPizzas, onQuantityChange }) {
    const [searchTerm, setSearchTerm] = useState("");
  
    const filteredPizzas = pizzaData.filter((pizza) =>
      pizza.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  
    return (
      <div className="menu">
        <input
          type="text"
          placeholder="Search pizza by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            marginBottom: "20px",
            padding: "10px",
            fontSize: "16px",
            width: "100%",
            textAlign: "center",
          }}
        />
        {filteredPizzas.length > 0 ? (
          filteredPizzas.map((pizza) => (
            <Pizza
              key={pizza.name}
              {...pizza}
              quantity={selectedPizzas[pizza.name] || 0}
              onQuantityChange={onQuantityChange}
            />
          ))
        ) : (
          <p style={{ textAlign: "center" }}>No pizzas match your search.</p>
        )}
      </div>
    );
  }
  
  function Footer({ selectedPizzas }) {
    const currentTime = new Date().getHours();
    const isOpen = currentTime >= 10 && currentTime < 22;
  
    // Button click alert
    function clickAlert() {
      const orderDetails = Object.entries(selectedPizzas)
        .filter(([name, quantity]) => quantity > 0)
        .map(([name, quantity]) => `${quantity} x ${name}`)
        .join(", ");
      alert(`Your order has been placed! Order details: ${orderDetails}`);
    }
  
    return (
      <footer style={{ textAlign: "center", padding: "20px" }}>
        {isOpen ? (
          <div>
            <h1 style={{ margin: "0 0 10px" }}>We're currently open</h1>
            <button onClick={clickAlert} className="btn" style={{ padding: "10px 20px", fontSize: "16px" }}>
              Order
            </button>
          </div>
        ) : (
          <h1>Sorry, we're closed</h1>
        )}
      </footer>
    );
  }
  
  function Pizza({ name, ingredients, price, photoName, soldOut, quantity, onQuantityChange }) {
    return (
      <div className={`pizza ${soldOut ? "sold-out" : ""}`}>
        <img src={photoName} alt={name} />
        <h2>{name}</h2>
        <p1>{ingredients}</p1>
        <p2>${price}</p2>
        {soldOut ? (
          <span className="sold-out-text">Sold Out</span>
        ) : (
          <div>
            <label>Quantity: </label>
            <input
              type="number"
              min="0"
              value={quantity}
              onChange={(e) => onQuantityChange(name, parseInt(e.target.value, 10) || 0)}
              style={{ width: "50px", textAlign: "center" }}
            />
          </div>
        )}
      </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById("root")); 
root.render(<App/>);