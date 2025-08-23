import { OWAlt } from "../../models/OWAlt";
import "./AltCard.css";

export function AltCard({ alt }: { alt: OWAlt }) {
  return (
    <a
      target="_blank"
      href={`https://tracker.gg/overwatch/profile/battlenet/${alt.userTag}/overview`}
      className="Alt-Card"
      key={alt.userTag}
    >
      <img src={alt.avatarImagePath} alt="Avatar" className="altcard-avatar" />
      <div className="altcard-username">{alt.userName}</div>
      <img
        src={alt.tankRankImagePath}
        alt="Tank Rank"
        className="altcard-img"
      />
      <img
        src={alt.damageRankImagePath}
        alt="Damage Rank"
        className="altcard-img"
      />
      <img
        src={alt.supportRankImagePath}
        alt="Support Rank"
        className="altcard-img"
      />
      <div className="altcard-owner">{alt.owner}</div>
      <div className="altcard-tags">
        {alt.tags.map((tag, idx) => (
          <div key={idx} className="altcard-tag">
            {tag}
          </div>
        ))}
      </div>
    </a>
  );
}

export default AltCard;
