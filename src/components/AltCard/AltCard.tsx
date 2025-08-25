import { OWAlt } from "../../models/OWAlt";
import "./AltCard.css";
import PushPinIcon from "@mui/icons-material/PushPin";

export function AltCard({
  alt,
  onPinClick,
  isPinned, // New prop
}: {
  alt: OWAlt;
  onPinClick: () => void;
  isPinned: boolean; // New prop type
}) {
  return (
    <a
      target="_blank"
      href={`https://tracker.gg/overwatch/profile/battlenet/${alt.userTag}/overview`}
      className="Alt-Card"
      key={alt.userTag}
    >
      <img src={alt.avatarImagePath} alt="Avatar" className="altcard-avatar" />
      <div className="altcard-username-container">
        <div className="altcard-username">{alt.userName}</div>
        <div className="altcard-last-updated">
          Last Updated: {alt.lastUpdated}
        </div>
      </div>
      <div className="altcard-role-img-wrapper">
        <img
          src={alt.tankRankImagePath}
          alt="Tank Rank"
          className="altcard-img"
        />
        <span
          className={`role-rank-overlay ${
            alt.tankRankTier <= 0 ? "hidden" : ""
          }`}
        >
          {alt.tankRankTier}
        </span>
        <span className="cached-overlay">Cached</span>
      </div>
      <div className="altcard-role-img-wrapper">
        <img
          src={alt.damageRankImagePath}
          alt="Damage Rank"
          className="altcard-img"
        />
        <span
          className={`role-rank-overlay ${
            alt.damageRankTier <= 0 ? "hidden" : ""
          }`}
        >
          {alt.damageRankTier}
        </span>
        <span className="cached-overlay">Cached</span>
      </div>
      <div className="altcard-role-img-wrapper">
        <img
          src={alt.supportRankImagePath}
          alt="Support Rank"
          className="altcard-img"
        />
        <span
          className={`role-rank-overlay ${
            alt.supportRankTier <= 0 ? "hidden" : ""
          }`}
        >
          {alt.supportRankTier}
        </span>
        <span className="cached-overlay">Cached</span>
      </div>
      <div className="altcard-owner">{alt.owner}</div>
      <div className="altcard-tags">
        {alt.tags.map((tag, idx) => (
          <div key={idx} className="altcard-tag">
            {tag}
          </div>
        ))}
      </div>
      <div
        className="altcard-pin-icon"
        onClick={(e) => {
          e.preventDefault();
          onPinClick();
        }}
      >
        <PushPinIcon style={{ color: isPinned ? "#ffffff" : "#000000ff" }} />
      </div>
    </a>
  );
}

export default AltCard;
