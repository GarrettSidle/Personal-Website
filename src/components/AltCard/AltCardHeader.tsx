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
  // State for popup visibility remains here
  const [showOwnerFilter, setShowOwnerFilter] = useState(false);
  const [showTagFilter, setShowTagFilter] = useState(false);

  console.log(tagOptions);
  console.log(selectedTags);

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

      <div className="altcard-owner-header">
        <span onClick={() => setShowOwnerFilter(true)}>Owner</span>
        <span className="filter-indicator">
          {selectedOwners.length != ownerOptions.length ? "•" : ""}
        </span>
      </div>

      <div
        className="altcard-tag-header"
        onClick={() => setShowTagFilter(true)}
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
          onClose={() => setShowOwnerFilter(false)}
        />
      )}

      {showTagFilter && (
        <Filter
          items={tagOptions}
          selectedItems={selectedTags}
          setSelectedItems={setSelectedTags}
          onClose={() => setShowTagFilter(false)}
        />
      )}
    </div>
  );
}

export default AltCardHeader;
