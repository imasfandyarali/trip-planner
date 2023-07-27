export default function Stats({ quantityItems }) {
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
