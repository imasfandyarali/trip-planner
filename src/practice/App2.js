import { useState } from "react";

// Initial items (for demonstration purposes)
const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: false },
  { id: 3, description: "Charger", quantity: 8, packed: false },
];

export default function App() {
  // State to keep track of the items
  const [items, setItems] = useState([]);

  // Function to add items to the list
  function handleAddItems(newItem) {
    // Update the state with the new item
    setItems((prevItems) => [...prevItems, newItem]);
  }

  return (
    <div className="app">
      {/* Logo Component */}
      <Logo />

      {/* Form Component to add new items */}
      <Form onAddItems={handleAddItems} />

      {/* Display the list of items */}
      <PackingList items={items} />

      {/* Statistics Component */}
      <Stats />
    </div>
  );
}

// Logo Component
function Logo() {
  return <h1>🌴 Far Away 👜</h1>;
}

// Main Form Component for adding new items
function Form({ onAddItems }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  // Function to handle form submission (adding a new item)
  function handleSubmit(e) {
    e.preventDefault();

    // Clear input fields after form submission
    setDescription("");
    setQuantity(1);

    // Do not add if the description is empty
    if (!description) return;

    // Create a new item object with the current description, quantity, and other properties
    const newItem = { id: Date.now(), description, quantity, packed: false };

    // Call the onAddItems function to add the new item to the list
    onAddItems(newItem);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your 😍 trip?</h3>

      {/* Quantity dropdown */}
      <select
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        {/* Generate options for quantities from 1 to 20 */}
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>

      {/* Input item section */}
      <input
        type="text"
        placeholder="Item..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
}

// Component to display the list of items
function PackingList({ items }) {
  return (
    <div className="list">
      <ul>
        {/* Map through the items and create an Item component for each */}
        {items.map((item) => (
          <Item key={item.id} item={item} />
        ))}
      </ul>
    </div>
  );
}

// Component to represent each individual item in the list
function Item({ item }) {
  return (
    <li>
      {/* Apply line-through text decoration if the item is packed */}
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button>❌</button>
    </li>
  );
}

// Statistics Component (currently not implemented)
function Stats() {
  return (
    <footer className="stats">
      <em>💼 you have X items on your list, and you already packed X (X%)</em>
    </footer>
  );
}

/*
Sure! Let's go through the complete data flow step by step in the given React application:

1. **Initial State Setup**:
   - At the beginning, the `App` component is initialized with an empty array as the initial state for `items` using `useState`. The initial state is an empty array `[]`.

2. **Adding Items**:
   - When you enter an item's description and select its quantity in the `Form` component, and then click the "Add" button, the `handleSubmit` function is called.
   - `handleSubmit` prevents the default form submission, so the page doesn't reload on form submission.
   - It creates a new item object using the input values (description, quantity, packed status set to `false`) and a unique `id` generated using `Date.now()`.
   - This new item is passed to the `onAddItems` function, which is a prop passed down from the `App` component to the `Form` component.
   - The `onAddItems` function is responsible for updating the `items` state in the `App` component.
   - It uses the `setItems` function (from `useState`) to update the state with the new item. The new item is added to the existing items using the spread operator and the new array is stored as the updated state.

3. **Rendering the List of Items**:
   - The `App` component renders its child components, which include `Logo`, `Form`, `PackingList`, and `Stats`.
   - The `PackingList` component receives the `items` state as a prop and renders a list of items using the `Item` component.

4. **Item Component**:
   - The `Item` component receives an individual item object as a prop and renders the item's description and quantity.
   - If the item is marked as packed (`item.packed` is `true`), it applies a line-through text decoration to indicate that the item is packed.
   - It also displays a button (currently without functionality) represented by "❌".

5. **Updating the UI on State Changes**:
   - When a new item is added using the form, the state is updated in the `App` component. React automatically triggers a re-render of the components that use the updated state.
   - Since the `PackingList` component relies on the `items` state as a prop, it will be re-rendered with the updated list of items.
   - As a result, the new item will be displayed in the list of items on the UI.

Please note that the `Stats` component is not currently implemented, so it does not display any specific data. In a complete implementation, it could compute statistics based on the `items` state, such as the total number of items, the number of packed items, and the percentage of packed items.

Overall, this data flow allows users to add items to the packing list through the form, and the list of items is displayed dynamically on the UI as the state is updated.
*/
