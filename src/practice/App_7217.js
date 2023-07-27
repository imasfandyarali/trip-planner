const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: false },
  { id: 3, description: "Charger", quantity: 9, packed: true },
];
export default function App() {
  return (
    <div className="app">
      <Logo />
      <Form />
      <PackingList />
      <Stats />
    </div>
  );
}
function Logo() {
  return <h1>Far Away App</h1>;
}
function Form() {
  function handleSubmit(e) {
    e.preventDefault();
    console.log(e);
  }
  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your trip?</h3>
      <select>
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input type="text" placeholder="Enter the text..."></input>
      <button>Add</button>
    </form>
  );
}
function PackingList() {
  return (
    <div className="list">
      <ul>
        {initialItems.map((item) => (
          <Item objitem={item} key={item.id} />
        ))}
      </ul>
    </div>
  );
}
function Item({ objitem }) {
  return (
    <li>
      <span style={objitem.packed ? { textDecoration: "line-through" } : {}}>
        {objitem.quantity}
        {objitem.description}
      </span>
      <button>❌</button>
    </li>
  );
}
function Stats() {
  return (
    <em>
      <footer className="stats">
        You have x items on your list and you already packed x (x%)
      </footer>
    </em>
  );
}
