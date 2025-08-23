import React from "react";
import "./AltCardHeader.css";

type SortField = "username" | "tank" | "damage" | "support" | "owner" | null;

interface AltCardHeaderProps {
  sortField: SortField;
  sortAsc: boolean;
  onSort: (field: SortField) => void;
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
  onSort,
}: AltCardHeaderProps) {
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
      <div className="altcard-owner-header" onClick={() => onSort("owner")}>
        Owner {getIndicator(sortField === "owner", sortAsc)}
      </div>
      <div className="altcard-tags-header">
        <div className="altcard-tag-header">Tags</div>
      </div>
    </div>
  );
}

export default AltCardHeader;
