import { useState } from "react";

export default function App() {
  const [items, setItems] = useState([]);
  function handleAddItems(updatedItem) {
    setItems((prevItems) => [...prevItems, updatedItem]);
  }

  function handleDeleteItem(CheckId) {
    setItems((individualItem) =>
      individualItem.filter((individualItem) => individualItem.id !== CheckId)
    );
  }

  function handleToggleItem(checkId) {
    setItems((toggleItem) =>
      toggleItem.map((el) =>
        el.id === checkId ? { ...el, packed: !el.packed } : el
      )
    );
  }
  function handleClearList() {
    const confirmed = window.confirm(
      "Are you sure you want to clear the list?"
    );
    if (confirmed) setItems([]);
  }

  return (
    <div>
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList
        items={items}
        onDeleteItem={handleDeleteItem}
        onToggleItems={handleToggleItem}
        clearList={handleClearList}
      />
      <Stats quantityItems={items} />
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

function PackingList({ items, onDeleteItem, onToggleItems, clearList }) {
  const [sortBy, setSortBy] = useState("input");
  let sortedItems;
  if (sortBy === "input") sortedItems = items;
  if (sortBy === "description")
    sortedItems = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));
  if (sortBy === "packed")
    sortedItems = items
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));
  return (
    <div className="list">
      <ul>
        {sortedItems.map((e) => (
          <List
            thing={e}
            key={e.id}
            onDeleteItem={onDeleteItem}
            onToggleItems={onToggleItems}
          />
        ))}
      </ul>
      <div className="actions">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">Sort by the input order</option>
          <option value="description">Sort by the description</option>
          <option value="packed">Sort by the packed status</option>
        </select>
        <button onClick={clearList}>Clear List</button>
      </div>
    </div>
  );
}
function List({ thing, onDeleteItem, onToggleItems }) {
  return (
    <li>
      <input
        type="checkbox"
        value={thing.packed}
        onChange={() => onToggleItems(thing.id)}
      />
      <span style={thing.packed ? { textDecoration: "line-through" } : {}}>
        {thing.quantity} {thing.description}
        <button onClick={() => onDeleteItem(thing.id)}>❌</button>
      </span>
    </li>
  );
}

function Stats({ quantityItems }) {
  if (!quantityItems.length)
    return (
      <p className="stats">
        <em>Start adding items to your packing list 🚀</em>
      </p>
    );
  const numItems = quantityItems.length;
  const numPacked = quantityItems.filter(
    (quantityItems) => quantityItems.packed
  ).length;
  const percentage = Math.round((numPacked / numItems) * 100);
  return (
    <footer className="stats">
      <em>
        {percentage === 100
          ? "You got everything packed 💼"
          : `You have ${numItems} items on the list, and you already packed
              ${numPacked} items (${percentage}%)`}
      </em>
    </footer>
  );
}
