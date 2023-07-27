import { useState } from "react";
export default function Form({ onAddItems }) {
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
      <h3>What do you need for your trip 😍?</h3>
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
