import { useState } from "react";

export default function App() {
  const [items, setItems] = useState([]);
  function handleAddItems(updatedItem) {
    setItems((prevItems) => [...prevItems, updatedItem]);
  }

  function handleDeleteItem(id) {
    setItems((individualItem) =>
      individualItem.filter((individualItem) => individualItem.id !== id)
    );
  }
  return (
    <div>
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList items={items} onDeleteItem={handleDeleteItem} />
      <Stats />
    </div>
  );
}

function Logo() {
  return (
    <div>
      <h1>PLAN YOUR TRIP</h1>
    </div>
  );
}

function Form({ onAddItems }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    if (!description) return;
    e.preventDefault();
    console.log(e);
    setDescription("");
    setQuantity(1);
    const newItem = { description, quantity, packed: false, id: Date.now() };
    console.log(newItem);
    onAddItems(newItem);
  }
  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you want to pack?</h3>
      <select value={quantity} onChange={(el) => setQuantity(el.target.value)}>
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        onChange={(el) => setDescription(el.target.value)}
        value={description}
        type="text"
        placeholder="Enter text"
      ></input>
      <button>Add</button>
    </form>
  );
}

function PackingList({ items, onDeleteItem }) {
  return (
    <div className="list">
      <ul>
        {items.map((e) => (
          <List thing={e} key={e.id} onDeleteItem={onDeleteItem} />
        ))}
      </ul>
    </div>
  );
}
function List({ thing, onDeleteItem }) {
  return (
    <li>
      <span style={thing.packed ? { textDecoration: "line-through" } : {}}>
        {thing.quantity}
        {thing.description}
        <button onClick={() => onDeleteItem(thing.id)}>❌</button>
      </span>
    </li>
  );
}

function Stats() {
  return (
    <footer className="stats">
      <em>this is footer</em>
    </footer>
  );
}
