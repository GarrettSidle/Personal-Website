import React, { useState } from "react";
import "./AltCardHeader.css";
import Filter from "./Filter";

type SortField = "username" | "tank" | "damage" | "support" | null;

interface AltCardHeaderProps {
  sortField: SortField;
  sortAsc: boolean;
  ownerOptions: string[];
  tagOptions: string[];
  onSort: (field: SortField) => void;
  selectedOwners: string[];
  setSelectedOwners: React.Dispatch<React.SetStateAction<string[]>>;
  selectedTags: string[];
  setSelectedTags: React.Dispatch<React.SetStateAction<string[]>>;
}

const getIndicator = (active: boolean, asc: boolean) => {
  if (!active) return null;
  return asc ? (
    <span className="sort-indicator">▼</span>
  ) : (
    <span className="sort-indicator">▲</span>
  );
};

export function AltCardHeader({
  sortField,
  sortAsc,
  ownerOptions,
  tagOptions,
  onSort,
  selectedOwners,
  setSelectedOwners,
  selectedTags,
  setSelectedTags,
}: AltCardHeaderProps) {
  const [showOwnerFilter, setShowOwnerFilter] = useState(false);
  const [showTagFilter, setShowTagFilter] = useState(false);
  const [filterPosition, setFilterPosition] = useState({ top: 0, left: 0 });

  const handleFilterClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    filterType: "owner" | "tag"
  ) => {
    event.preventDefault();
    const rect = event.currentTarget.getBoundingClientRect();
    setFilterPosition({ top: rect.bottom, left: rect.left });
    if (filterType === "owner") {
      setShowOwnerFilter(true);
      setShowTagFilter(false); // Close other filter
    } else {
      setShowTagFilter(true);
      setShowOwnerFilter(false); // Close other filter
    }
  };

  const handleFilterClose = () => {
    setShowOwnerFilter(false);
    setShowTagFilter(false);
  };

  return (
    <div className="altcard-header">
      <div className="altcard-avatar-header" />
      <div
        className="altcard-username-header"
        onClick={() => onSort("username")}
      >
        Username {getIndicator(sortField === "username", sortAsc)}
      </div>

      <div className="altcard-img-header" onClick={() => onSort("tank")}>
        <img src="/assets/AltManager/Tank.png" alt="Tank" />
        {getIndicator(sortField === "tank", sortAsc)}
      </div>

      <div className="altcard-img-header" onClick={() => onSort("damage")}>
        <img src="/assets/AltManager/Damage.png" alt="Damage" />
        {getIndicator(sortField === "damage", sortAsc)}
      </div>

      <div className="altcard-img-header" onClick={() => onSort("support")}>
        <img src="/assets/AltManager/Support.png" alt="Support" />
        {getIndicator(sortField === "support", sortAsc)}
      </div>

      <div
        className="altcard-owner-header"
        onClick={(e) => handleFilterClick(e, "owner")}
      >
        <span>Owner</span>
        <span className="filter-indicator">
          {selectedOwners.length != ownerOptions.length ? "•" : ""}
        </span>
      </div>

      <div
        className="altcard-tag-header"
        onClick={(e) => handleFilterClick(e, "tag")}
      >
        <div className="altcard-tag-header">
          Tags
          <span className="filter-indicator">
            {selectedTags.length != tagOptions.length ? "•" : ""}
          </span>
        </div>
      </div>

      {showOwnerFilter && (
        <Filter
          items={ownerOptions}
          selectedItems={selectedOwners}
          setSelectedItems={setSelectedOwners}
          onClose={handleFilterClose}
          position={filterPosition}
        />
      )}

      {showTagFilter && (
        <Filter
          items={tagOptions}
          selectedItems={selectedTags}
          setSelectedItems={setSelectedTags}
          onClose={handleFilterClose}
          position={filterPosition}
        />
      )}
    </div>
  );
}

export default AltCardHeader;
