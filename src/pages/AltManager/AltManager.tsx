import React, { useState, useEffect } from "react";
import "./AltManager.css";
import AltCard from "../../components/AltCard/AltCard";
import { OWAlt } from "../../models/OWAlt";
import { AltCardHeader } from "../../components/AltCard/AltCardHeader";
import Cookies from "js-cookie";
import { fetchPlayerSummary } from "./OWAltService";

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

export function AltManager() {
  const [summaries, setSummaries] = useState<any[]>(
    Array(OWAlts.length).fill(null)
  );
  const [sortedAlts, setSortedAlts] = useState<OWAlt[]>([...OWAlts]);
  const [sortField, setSortField] = useState<SortField>(null);
  const [sortAsc, setSortAsc] = useState<boolean>(true);
  const baseSeason = 18;
  const baseDate = new Date("2025-08-26"); // starting point
  const season = getCurrentSeason(baseSeason, baseDate);

  function getCurrentSeason(startSeason: number, startDate: Date): number {
    const today = new Date();
    const diffMs = today.getTime() - startDate.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    // Every 60 days = +1 season
    const increments = Math.floor(diffDays / 60);

    return startSeason + increments;
  }

  const initialPinnedAlts = () => {
    const storedPinnedAlts = Cookies.get("pinnedAlts");
    try {
      const parsed = storedPinnedAlts ? JSON.parse(storedPinnedAlts) : [];
      return parsed.map(
        (alt: any) => new OWAlt(alt.userName, alt.userTag, alt.owner, alt.tags)
      );
    } catch (e) {
      console.error("Failed to parse pinned alts from cookie:", e);
      return [];
    }
  };
  const [pinnedAlts, setPinnedAlts] = useState<OWAlt[]>(initialPinnedAlts);

  const storedOwners = Cookies.get("selectedOwners");
  const storedTags = Cookies.get("selectedTags");

  const [selectedOwners, setSelectedOwners] = useState<string[]>(
    storedOwners ? JSON.parse(storedOwners) : ownerOptions
  );
  const [selectedTags, setSelectedTags] = useState<string[]>(
    storedTags ? JSON.parse(storedTags) : tagOptions
  );

  const handlePinClick = (altToPin: OWAlt) => {
    const isPinned = pinnedAlts.some((alt) => alt.userTag === altToPin.userTag);
    if (isPinned) {
      setPinnedAlts(
        pinnedAlts.filter((alt) => alt.userTag !== altToPin.userTag)
      );
    } else {
      // Save only identity info (no ranks)
      const { userName, userTag, owner, tags } = altToPin;
      setPinnedAlts([
        ...pinnedAlts,
        new OWAlt(userName, userTag, owner, [...tags]),
      ]);
    }
  };

  useEffect(() => {
    // Strip down to minimal before writing
    const stripped = pinnedAlts.map(({ userName, userTag, owner, tags }) => ({
      userName,
      userTag,
      owner,
      tags,
    }));
    Cookies.set("pinnedAlts", JSON.stringify(stripped));
  }, [pinnedAlts]);
  useEffect(() => {
    const allAlts = [...OWAlts, ...pinnedAlts];
    allAlts.forEach(async (alt) => {
      const updatedAlt = await fetchPlayerSummary(alt);
      setSummaries((prev) => {
        const index = allAlts.findIndex((a) => a.userTag === alt.userTag);
        const newSummaries = [...prev];
        newSummaries[index] = updatedAlt;
        return newSummaries;
      });
    });
  }, [pinnedAlts]);

  useEffect(() => {
    Cookies.set("selectedOwners", JSON.stringify(selectedOwners));
  }, [selectedOwners]);

  useEffect(() => {
    Cookies.set("selectedTags", JSON.stringify(selectedTags));
  }, [selectedTags]);

  const handleSort = (field: SortField) => {
    let newSortAsc = sortField === field ? !sortAsc : true;

    let sorted = [...OWAlts];
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
  const isAltPinned = (alt: OWAlt) =>
    pinnedAlts.some((pinnedAlt) => pinnedAlt.userTag === alt.userTag);
  const filteredAlts = sortedAlts.filter((alt) => {
    const ownerMatch = selectedOwners.includes(alt.owner);
    const tagMatch = alt.tags.some((tag) => selectedTags.includes(tag));
    const isPinned = isAltPinned(alt);
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
          {pinnedAlts.map((alt) => {
            const summaryAlt = summaries.find(
              (s) => s && s.userTag === alt.userTag
            );
            return (
              <AltCard
                key={alt.userTag}
                alt={summaryAlt || alt}
                onPinClick={() => handlePinClick(alt)}
                isPinned={true}
                currentSeason={season}
              />
            );
          })}
        </div>
      </div>
      <div className="unpinned-section">
        <div className="alt-cards-container">
          {filteredAlts.map((alt, index) => (
            <AltCard
              key={alt.userTag}
              alt={alt}
              onPinClick={() => handlePinClick(alt)}
              isPinned={isAltPinned(alt)}
              currentSeason={season}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
