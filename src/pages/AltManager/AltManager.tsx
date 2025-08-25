import React, { useState, useEffect } from "react";
import "./AltManager.css";
import AltCard from "../../components/AltCard/AltCard";
import { OWAlt } from "../../models/OWAlt";
import { AltCardHeader } from "../../components/AltCard/AltCardHeader";
import Cookies from "js-cookie";

const rawAlts = require("./OWAlts.json");
const OWAlts: OWAlt[] = rawAlts.map(
  (alt: any) => new OWAlt(alt.userName, alt.userTag, alt.owner, alt.tags)
);

let ownerOptions: string[] = [];
let tagOptions: string[] = [];

OWAlts.forEach((alt) => {
  if (!ownerOptions.includes(alt.owner)) ownerOptions.push(alt.owner);
  alt.tags.forEach((tag) => {
    if (!tagOptions.includes(tag)) tagOptions.push(tag);
  });
});

type SortField = "username" | "tank" | "damage" | "support" | null;

async function fetchWithBackoff(url: string, delay = 1000): Promise<any> {
  while (true) {
    try {
      const res = await fetch(url);
      if (res.status === 404) return { error: 404 };
      if (res.status === 429) {
        await new Promise((resolve) => setTimeout(resolve, delay));
        delay = Math.min(delay * 2, 60000);
        continue;
      }
      if (!res.ok) return null;
      return await res.json();
    } catch {
      return null;
    }
  }
}

function convertUnixToEST(timestamp: number): string {
  const milliseconds = timestamp * 1000;

  const date = new Date(milliseconds);

  const formattedDate = date.toLocaleDateString("en-US", {
    month: "2-digit",
    day: "2-digit",
    timeZone: "EST",
  });
  const formattedTime = date.toLocaleTimeString("en-US", {
    timeZone: "EST",
    hour: "numeric",
    minute: "numeric",
  });
  const estDateTime = `${formattedDate} ${formattedTime}`;

  return estDateTime;
}

export function AltManager() {
  const [summaries, setSummaries] = useState<any[]>(
    Array(OWAlts.length).fill(null)
  );
  const [sortedAlts, setSortedAlts] = useState<OWAlt[]>([...OWAlts]);
  const [sortField, setSortField] = useState<SortField>(null);
  const [sortAsc, setSortAsc] = useState<boolean>(true);

  const isAltPinned = (alt: OWAlt) =>
    pinnedAlts.some((pinnedAlt) => pinnedAlt.userTag === alt.userTag);

  const [pinnedAlts, setPinnedAlts] = useState<OWAlt[]>([]);

  const storedOwners = Cookies.get("selectedOwners");
  const storedTags = Cookies.get("selectedTags");

  const [selectedOwners, setSelectedOwners] = useState<string[]>(
    storedOwners ? JSON.parse(storedOwners) : ownerOptions
  );
  const [selectedTags, setSelectedTags] = useState<string[]>(
    storedTags ? JSON.parse(storedTags) : tagOptions
  );

  // New function to handle pinning/unpinning
  const handlePinClick = (altToPin: OWAlt) => {
    // Check if the alt is already pinned
    const isPinned = pinnedAlts.some((alt) => alt.userTag === altToPin.userTag);
    if (isPinned) {
      // Unpin: remove it from the pinned list
      setPinnedAlts(
        pinnedAlts.filter((alt) => alt.userTag !== altToPin.userTag)
      );
    } else {
      // Pin: add it to the pinned list
      setPinnedAlts([...pinnedAlts, altToPin]);
    }
  };

  useEffect(() => {
    OWAlts.forEach(async (alt, i) => {
      const summary = await fetchWithBackoff(
        `https://overfast-api.tekrop.fr/players/${alt.userTag}/summary`
      );
      if (summary?.error === 404) {
        const updatedAlts = [...OWAlts];
        updatedAlts[i].tankRankImagePath = "/assets/AltManager/Error.png";
        updatedAlts[i].damageRankImagePath = "/assets/AltManager/Error.png";
        updatedAlts[i].supportRankImagePath = "/assets/AltManager/Error.png";
        updatedAlts[i].avatarImagePath = "/assets/AltManager/Error.png";
        updatedAlts[i].tankRankTier = -1;
        updatedAlts[i].damageRankTier = -1;
        updatedAlts[i].supportRankTier = -1;
        updatedAlts[i].lastUpdated = "N/A";
        setSummaries((prev) => {
          const newSummaries = [...prev];
          newSummaries[i] = { error: 404 };
          return newSummaries;
        });
        return;
      }

      if (!summary) return;
      const updatedAlts = [...OWAlts];
      updatedAlts[i].avatarImagePath =
        summary.avatar || updatedAlts[i].avatarImagePath;
      updatedAlts[i].lastUpdated = convertUnixToEST(summary.last_updated_at);
      if (!summary.competitive?.pc) {
        updatedAlts[i].tankRankImagePath = "/assets/AltManager/Unranked.png";
        updatedAlts[i].tankRank = 0;
        updatedAlts[i].damageRankImagePath = "/assets/AltManager/Unranked.png";
        updatedAlts[i].damageRank = 0;
        updatedAlts[i].supportRankImagePath = "/assets/AltManager/Unranked.png";
        updatedAlts[i].supportRank = 0;
      } else {
        const convertRankToNumber = (
          division: string,
          tier: number
        ): number => {
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

        if (summary.competitive.pc.tank) {
          updatedAlts[i].tankRankImagePath =
            summary.competitive.pc.tank.rank_icon;
          updatedAlts[i].tankRankTier = summary.competitive.pc.tank.tier;
          updatedAlts[i].tankRank = convertRankToNumber(
            summary.competitive.pc.tank.division,
            summary.competitive.pc.tank.tier
          );
        } else {
          updatedAlts[i].tankRankImagePath = "/assets/AltManager/Unranked.png";
          updatedAlts[i].tankRank = 0;
        }

        if (summary.competitive.pc.damage) {
          updatedAlts[i].damageRankImagePath =
            summary.competitive.pc.damage.rank_icon;
          updatedAlts[i].damageRankTier = summary.competitive.pc.damage.tier;
          updatedAlts[i].damageRank = convertRankToNumber(
            summary.competitive.pc.damage.division,
            summary.competitive.pc.damage.tier
          );
        } else {
          updatedAlts[i].damageRankImagePath =
            "/assets/AltManager/Unranked.png";
          updatedAlts[i].damageRank = 0;
        }

        if (summary.competitive.pc.support) {
          updatedAlts[i].supportRankImagePath =
            summary.competitive.pc.support.rank_icon;
          updatedAlts[i].supportRankTier = summary.competitive.pc.support.tier;
          updatedAlts[i].supportRank = convertRankToNumber(
            summary.competitive.pc.support.division,
            summary.competitive.pc.support.tier
          );
        } else {
          updatedAlts[i].supportRankImagePath =
            "/assets/AltManager/Unranked.png";
          updatedAlts[i].supportRank = 0;
        }
      }
      setSummaries((prev) => {
        const newSummaries = [...prev];
        newSummaries[i] = summary;
        return newSummaries;
      });
    });
  }, []);

  useEffect(() => {
    Cookies.set("selectedOwners", JSON.stringify(selectedOwners));
  }, [selectedOwners]);

  useEffect(() => {
    Cookies.set("selectedTags", JSON.stringify(selectedTags));
  }, [selectedTags]);

  const handleSort = (field: SortField) => {
    let newSortAsc = sortField === field ? !sortAsc : true;

    let sorted = [...OWAlts]; // Start with the original data
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
      case null:
      default:
        sorted = [...OWAlts];
    }
    setSortedAlts(sorted);
    setSortField(field);
    setSortAsc(newSortAsc);
  };
  const filteredAlts = sortedAlts.filter((alt) => {
    const ownerMatch = selectedOwners.includes(alt.owner);
    const tagMatch = alt.tags.some((tag) => selectedTags.includes(tag));
    const isPinned = pinnedAlts.some(
      (pinnedAlt) => pinnedAlt.userTag === alt.userTag
    );
    return ownerMatch && tagMatch && !isPinned;
  });

  return (
    <div className="AltManager-Section Page" id="AltManager">
      <div className="extra-shape"></div>

      <AltCardHeader
        sortField={sortField}
        sortAsc={sortAsc}
        ownerOptions={ownerOptions}
        tagOptions={tagOptions}
        onSort={handleSort}
        selectedOwners={selectedOwners}
        setSelectedOwners={setSelectedOwners}
        selectedTags={selectedTags}
        setSelectedTags={setSelectedTags}
      />

      <div className="pinned-section">
        <div className="alt-cards-container">
          {pinnedAlts.map((alt) => (
            <AltCard
              key={alt.userTag}
              alt={alt}
              onPinClick={() => handlePinClick(alt)}
              isPinned={true} // Always true for cards in the pinned section
            />
          ))}
        </div>
      </div>
      <div className="unpinned-section">
        <div className="alt-cards-container">
          {filteredAlts.map((alt, index) => (
            <AltCard
              key={alt.userTag}
              alt={alt}
              onPinClick={() => handlePinClick(alt)}
              isPinned={isAltPinned(alt)} // Check if this specific alt is in the pinned list
            />
          ))}
        </div>
      </div>
    </div>
  );
}
