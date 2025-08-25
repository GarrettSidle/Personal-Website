import React from "react";
import ReactDOM from "react-dom";
import "./Filter.css";

interface FilterProps {
  items: string[];
  selectedItems: string[];
  setSelectedItems: React.Dispatch<React.SetStateAction<string[]>>;
  onClose: () => void;
}

export function Filter({
  items,
  selectedItems,
  setSelectedItems,
  onClose,
}: FilterProps) {
  const toggleItem = (item: string) => {
    if (selectedItems.includes(item)) {
      setSelectedItems(selectedItems.filter((i) => i !== item));
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };

  const selectAll = () => setSelectedItems(items);
  const selectNone = () => setSelectedItems([]);

  const content = (
    <div className="Alt-Card-Filter">
      <div className="Filter-Container">
        <button className="Filter-Close" onClick={onClose}>
          ✕
        </button>

        <h2 className="Filter-Title">Filter Items</h2>

        <div className="Filter-Buttons">
          <button onClick={selectAll} className="Filter-Button SelectAll">
            Select All
          </button>
          <button onClick={selectNone} className="Filter-Button SelectNone">
            Select None
          </button>
        </div>

        <div className="Filter-List">
          {items.map((item) => (
            <label key={item} className="Filter-Item">
              <input
                type="checkbox"
                checked={selectedItems.includes(item)}
                onChange={() => toggleItem(item)}
              />
              <span>{item}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  // Render into body, above all other stacking contexts
  return ReactDOM.createPortal(content, document.body);
}

export default Filter;
