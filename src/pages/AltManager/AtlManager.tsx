import { Component } from "react";

import "./AtlManager.css";
import AltCard from "../../components/AltCard/AltCard";
import { OWAlt } from "../../models/OWAlt";
import AltCardHeader from "../../components/AltCard/AltCardHeader";

const rawAlts = require("./OWAlts.json");
const OWAlts: OWAlt[] = rawAlts.map(
  (alt: any) => new OWAlt(alt.userName, alt.userTag, alt.owner, alt.tags)
);

type SortField = "username" | "tank" | "damage" | "support" | "owner" | null;

interface AltManagerState {
  summaries: any[];
  sortedAlts: OWAlt[];
  sortField: SortField;
  sortAsc: boolean;
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
    this.state = {
      summaries: Array(OWAlts.length).fill(null),
      sortedAlts: [...OWAlts],
      sortField: null,
      sortAsc: true,
    };
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
        OWAlts[i].tankRankImagePath = "/assets/AltManager/Unranked.jpg";
        OWAlts[i].tankRank = 0;
        OWAlts[i].damageRankImagePath = "/assets/AltManager/Unranked.jpg";
        OWAlts[i].damageRank = 0;
        OWAlts[i].supportRankImagePath = "/assets/AltManager/Unranked.jpg";
        OWAlts[i].supportRank = 0;
        return;
      }

      // Tank
      if (summary.competitive.pc.tank) {
        OWAlts[i].tankRankImagePath = summary.competitive.pc.tank.rank_icon;
        OWAlts[i].tankRankTier = summary.competitive.pc.tank.tier;
        OWAlts[i].tankRank = this.convertRankToNumber(
          summary.competitive.pc.tank.division,
          summary.competitive.pc.tank.tier
        );
      } else {
        OWAlts[i].tankRankImagePath = "/assets/AltManager/Unranked.jpg";
        OWAlts[i].tankRank = 0;
      }

      // Damage
      if (summary.competitive.pc.damage) {
        OWAlts[i].damageRankImagePath = summary.competitive.pc.damage.rank_icon;
        OWAlts[i].damageRankTier = summary.competitive.pc.damage.tier;
        OWAlts[i].damageRank = this.convertRankToNumber(
          summary.competitive.pc.damage.division,
          summary.competitive.pc.damage.tier
        );
      } else {
        OWAlts[i].damageRankImagePath = "/assets/AltManager/Unranked.jpg";
        OWAlts[i].damageRank = 0;
      }

      // Support
      if (summary.competitive.pc.support) {
        OWAlts[i].supportRankImagePath =
          summary.competitive.pc.support.rank_icon;
        OWAlts[i].supportRankTier = summary.competitive.pc.support.tier;
        OWAlts[i].supportRank = this.convertRankToNumber(
          summary.competitive.pc.support.division,
          summary.competitive.pc.support.tier
        );
      } else {
        OWAlts[i].supportRankImagePath = "/assets/AltManager/Unranked.jpg";
        OWAlts[i].supportRank = 0;
      }
    });

    this.setState({ summaries });
  }

  convertRankToNumber = (division: string, tier: number): number => {
    const divisionMap: { [key: string]: number } = {
      bronze: 0,
      silver: 1,
      gold: 2,
      platinum: 3,
      diamond: 4,
      master: 5,
      grandmaster: 6,
    };

    return divisionMap[division] * 5 + (5 - tier);
  };

  handleSort = (field: SortField) => {
    const { sortField, sortAsc, sortedAlts } = this.state;
    let newSortAsc = true;
    if (sortField === field) {
      newSortAsc = !sortAsc;
    }
    let sorted = [...sortedAlts];
    switch (field) {
      case "username":
        sorted.sort((a, b) => {
          if (a.userName < b.userName) return newSortAsc ? -1 : 1;
          if (a.userName > b.userName) return newSortAsc ? 1 : -1;
          return 0;
        });
        break;
      case "tank":
        sorted.sort((a, b) =>
          newSortAsc ? a.tankRank - b.tankRank : b.tankRank - a.tankRank
        );
        break;
      case "damage":
        sorted.sort((a, b) =>
          newSortAsc ? a.damageRank - b.damageRank : b.damageRank - a.damageRank
        );
        break;
      case "support":
        sorted.sort((a, b) =>
          newSortAsc
            ? a.supportRank - b.supportRank
            : b.supportRank - a.supportRank
        );
        break;
      case "owner":
        sorted.sort((a, b) => {
          if (a.owner < b.owner) return newSortAsc ? -1 : 1;
          if (a.owner > b.owner) return newSortAsc ? 1 : -1;
          return 0;
        });
        break;
      default:
        sorted = [...OWAlts];
    }
    this.setState({
      sortedAlts: sorted,
      sortField: field,
      sortAsc: newSortAsc,
    });
  };

  public render() {
    return (
      <div className="AltManager-Section Page" id="AltManager">
        <div className="extra-shape"></div>
        <AltCardHeader
          sortField={this.state.sortField}
          sortAsc={this.state.sortAsc}
          onSort={this.handleSort}
        />
        {this.state.sortedAlts.map((alt, index) => (
          <AltCard key={alt.userTag} alt={alt} />
        ))}
      </div>
    );
  }
}
export default AltManager;
