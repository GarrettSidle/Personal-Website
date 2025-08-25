import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import "./Filter.css";

interface FilterProps {
  items: string[];
  selectedItems: string[];
  setSelectedItems: React.Dispatch<React.SetStateAction<string[]>>;
  onClose: () => void;
  position: { top: number; left: number };
}

export function Filter({
  items,
  selectedItems,
  setSelectedItems,
  onClose,
  position,
}: FilterProps) {
  const filterRef = useRef<HTMLDivElement>(null);

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
    <div
      className="Alt-Card-Filter-Wrapper"
      style={{ top: position.top, left: position.left }}
    >
      <div
        className="Filter-Container"
        onMouseLeave={onClose}
        onMouseEnter={() => {}}
      >
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

  return ReactDOM.createPortal(content, document.body);
}

export default Filter;
