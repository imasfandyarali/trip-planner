import { useState } from "react";
import Logo from "./Logo";
import Form from "./Form";
import PackingList from "./PackingList";
import Stats from "./Stats";

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
