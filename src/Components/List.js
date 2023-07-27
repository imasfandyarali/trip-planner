export default function List({ thing, onDeleteItem, onToggleItems }) {
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
