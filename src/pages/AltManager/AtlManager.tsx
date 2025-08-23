import { Component } from "react";

import "./AtlManager.css";
import AltCard from "../../components/AltCard/AltCard";
import { OWAlt } from "../../models/OWAlt";

const rawAlts = require("./OWAlts.json");
const OWAlts: OWAlt[] = rawAlts.map(
  (alt: any) => new OWAlt(alt.userName, alt.userTag, alt.owner, alt.tags)
);

interface AltManagerState {
  summaries: any[];
}

async function fetchWithBackoff(url: string, delay = 1000): Promise<any> {
  while (true) {
    try {
      const res = await fetch(url);
      if (res.status === 429) {
        // Exponential backoff
        await new Promise((resolve) => setTimeout(resolve, delay));
        delay = Math.min(delay * 2, 60000); // Cap delay at 60s
        continue;
      }
      if (!res.ok) return null;
      return await res.json();
    } catch {
      return null;
    }
  }
}

export class AltManager extends Component<{}, AltManagerState> {
  constructor(props: {}) {
    super(props);
    this.state = { summaries: Array(OWAlts.length).fill(null) };
  }

  async componentDidMount() {
    const requests = OWAlts.map((alt) =>
      fetchWithBackoff(
        `https://overfast-api.tekrop.fr/players/${alt.userTag}/summary`
      )
    );
    const summaries = await Promise.all(requests);

    // Update OWAlts with summary data
    summaries.forEach((summary, i) => {
      if (!summary) return;
      OWAlts[i].avatarImagePath = summary.avatar || OWAlts[i].avatarImagePath;

      // If competitive.pc is null, set all ranks to Unranked
      if (!summary.competitive?.pc) {
        OWAlts[i].tankRankImagePath = "/assets/AltManager/Unranked.png";
        OWAlts[i].tankRank = 0;
        OWAlts[i].damageRankImagePath = "/assets/AltManager/Unranked.png";
        OWAlts[i].damageRank = 0;
        OWAlts[i].supportRankImagePath = "/assets/AltManager/Unranked.png";
        OWAlts[i].supportRank = 0;
        return;
      }

      // Tank
      if (summary.competitive.pc.tank) {
        OWAlts[i].tankRankImagePath = summary.competitive.pc.tank.rank_icon;
        OWAlts[i].tankRank = summary.competitive.pc.tank.tier;
      } else {
        OWAlts[i].tankRankImagePath = "/assets/AltManager/Unranked.png";
        OWAlts[i].tankRank = 0;
      }

      // Damage
      if (summary.competitive.pc.damage) {
        OWAlts[i].damageRankImagePath = summary.competitive.pc.damage.rank_icon;
        OWAlts[i].damageRank = summary.competitive.pc.damage.tier;
      } else {
        OWAlts[i].damageRankImagePath = "/assets/AltManager/Unranked.png";
        OWAlts[i].damageRank = 0;
      }

      // Support
      if (summary.competitive.pc.support) {
        OWAlts[i].supportRankImagePath =
          summary.competitive.pc.support.rank_icon;
        OWAlts[i].supportRank = summary.competitive.pc.support.tier;
      } else {
        OWAlts[i].supportRankImagePath = "/assets/AltManager/Unranked.png";
        OWAlts[i].supportRank = 0;
      }
    });

    this.setState({ summaries });
  }

  public render() {
    return (
      <div className="AltManager-Section Page" id="AltManager">
        <div className="extra-shape"></div>
        <div className="altcard-header">
          <img
            src="/assets/AltManager/DefaultAvatar.png"
            alt="Avatar"
            className="altcard-avatar-header"
          />
          <div className="altcard-username-header">Username</div>
          <img
            src="/assets/AltManager/Tank.png"
            alt="Tank"
            className="altcard-img-header"
          />
          <img
            src="/assets/AltManager/Damage.png"
            alt="Damage"
            className="altcard-img-header"
          />
          <img
            src="/assets/AltManager/Support.png"
            alt="Support"
            className="altcard-img-header"
          />
          <div className="altcard-owner-header">Owner</div>
          <div className="altcard-tags-header">
            <div className="altcard-tag-header">Tags</div>
          </div>
        </div>
        {OWAlts.map((alt, index) => (
          <AltCard key={alt.userTag} alt={alt} />
        ))}
      </div>
    );
  }
}
export default AltManager;
