import React, { useState, useEffect, useRef } from "react";
import "./AltManager.css";
import AltCard from "../../components/AltCard/AltCard";
import { OWAlt } from "../../models/OWAlt";
import { AltCardHeader } from "../../components/AltCard/AltCardHeader";
import Cookies from "js-cookie";
import { fetchPlayerSummary } from "./OWAltService";

const rawAlts = require("./OWAlts.json");
const OWAlts: OWAlt[] = rawAlts.map(
  (alt: any) =>
    new OWAlt(
      alt.userName,
      alt.userTag,
      alt.owner,
      alt.tags,
      alt.encryptedEmail ?? ""
    )
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
  const [season, setSeason] = useState<number>(
    getCurrentSeason(baseSeason, baseDate)
  );

  // load secret from cookie on first render
  const [secretInput, setSecretInput] = useState<string>(
    () => Cookies.get("secret") ?? ""
  );
  const [isSecretFocused, setIsSecretFocused] = useState<boolean>(false);

  // toast for clipboard copies — message + error state
  const [showCopiedToast, setShowCopiedToast] = useState(false);
  const [copiedMessage, setCopiedMessage] = useState<string>(
    "Copied to Clipboard"
  );
  const [copiedIsError, setCopiedIsError] = useState<boolean>(false);
  const timeoutRef = useRef<number | null>(null);

  const showClipboardToast = (
    message = "Copied to Clipboard",
    isError = false,
    ms = 3000
  ) => {
    // clear any existing timeout
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setCopiedMessage(message);
    setCopiedIsError(isError);
    setShowCopiedToast(true);
    timeoutRef.current = window.setTimeout(() => {
      setShowCopiedToast(false);
      timeoutRef.current = null;
    }, ms) as unknown as number;
  };

  useEffect(() => {
    const handler = (e: any) => {
      const detail = e?.detail ?? {};
      const message = detail.message ?? "Copied to Clipboard";
      const isError = !!detail.error;
      showClipboardToast(message, isError);
    };
    window.addEventListener("clipboard-copied", handler as EventListener);
    return () =>
      window.removeEventListener("clipboard-copied", handler as EventListener);
  }, []);

  function initializeRanks() {
    if (Cookies.get("FirstLoad1")) return;

    // Set FirstLoad so this only runs once
    Cookies.set("FirstLoad1", "true");

    const ranks: Record<string, string> = {
      "JoeysPP-1567_damage": `{"icon":"https://static.playoverwatch.com/img/pages/career/icons/rank/Rank_DiamondTier-d775ca9c43.png","tier":2,"rank":23,"season":17}`,
      "JoeysPP-1567_support": `{"icon":"https://static.playoverwatch.com/img/pages/career/icons/rank/Rank_DiamondTier-d775ca9c43.png","tier":2,"rank":23,"season":17}`,
      "HaydensPP-1687_damage": `{"icon":"https://static.playoverwatch.com/img/pages/career/icons/rank/Rank_DiamondTier-d775ca9c43.png","tier":2,"rank":23,"season":17}`,
      "HaydensPP-1687_support": `{"icon":"https://static.playoverwatch.com/img/pages/career/icons/rank/Rank_DiamondTier-d775ca9c43.png","tier":2,"rank":23,"season":17}`,
      "SylasPP-1809_tank": `{"icon":"https://static.playoverwatch.com/img/pages/career/icons/rank/Rank_DiamondTier-d775ca9c43.png","tier":3,"rank":22,"season":17}`,
      "SylasPP-1809_damage": `{"icon":"https://static.playoverwatch.com/img/pages/career/icons/rank/Rank_PlatinumTier-ccf57375a7.png","tier":3,"rank":17,"season":16}`,
      "GarrettNorth-1971_damage": `{"icon":"https://static.playoverwatch.com/img/pages/career/icons/rank/Rank_DiamondTier-d775ca9c43.png","tier":4,"rank":21,"season":17}`,
      "GarrettNorth-1971_support": `{"icon":"https://static.playoverwatch.com/img/pages/career/icons/rank/Rank_DiamondTier-d775ca9c43.png","tier":4,"rank":21,"season":17}`,
      "munchie-11378_tank": `{"icon":"https://static.playoverwatch.com/img/pages/career/icons/rank/Rank_MasterTier-7d3b85ba0d.png","tier":5,"rank":25,"season":17}`,
      "munchie-11378_support": `{"icon":"https://static.playoverwatch.com/img/pages/career/icons/rank/Rank_MasterTier-7d3b85ba0d.png","tier":4,"rank":26,"season":17}`,
      "Anubis-15133_tank": `{"icon":"https://static.playoverwatch.com/img/pages/career/icons/rank/Rank_PlatinumTier-ccf57375a7.png","tier":5,"rank":15,"season":17}`,
      "Anubis-15133_damage": `{"icon":"https://static.playoverwatch.com/img/pages/career/icons/rank/Rank_PlatinumTier-ccf57375a7.png","tier":3,"rank":17,"season":17}`,
      "AnonPianist-1109_tank": `{"icon":"https://static.playoverwatch.com/img/pages/career/icons/rank/Rank_GoldTier-16d20c7128.png","tier":1,"rank":14,"season":7}`,
      "AnonPianist-1109_support": `{"icon":"https://static.playoverwatch.com/img/pages/career/icons/rank/Rank_PlatinumTier-ccf57375a7.png","tier":2,"rank":18,"season":17}`,
      "GarrettsPP-1913_support": `{"icon":"https://static.playoverwatch.com/img/pages/career/icons/rank/Rank_PlatinumTier-ccf57375a7.png","tier":1,"rank":19,"season":15}`,
      "MunchiesPP-1765_damage": `{"icon":"https://static.playoverwatch.com/img/pages/career/icons/rank/Rank_DiamondTier-d775ca9c43.png","tier":3,"rank":22,"season":13}`,
      "MunchiesPP-1765_support": `{"icon":"https://static.playoverwatch.com/img/pages/career/icons/rank/Rank_PlatinumTier-ccf57375a7.png","tier":1,"rank":19,"season":16}`,
      "DarionBuns-1562_tank": `{"icon":"https://static.playoverwatch.com/img/pages/career/icons/rank/Rank_DiamondTier-d775ca9c43.png","tier":1,"rank":24,"season":16}`,
      "DarionBuns-1562_support": `{"icon":"https://static.playoverwatch.com/img/pages/career/icons/rank/Rank_DiamondTier-d775ca9c43.png","tier":5,"rank":20,"season":14}`,
      "fatwiener69-1980_tank": `{"icon":"https://static.playoverwatch.com/img/pages/career/icons/rank/Rank_GoldTier-16d20c7128.png","tier":1,"rank":14,"season":5}`,
      "fatwiener69-1980_damage": `{"icon":"https://static.playoverwatch.com/img/pages/career/icons/rank/Rank_GoldTier-16d20c7128.png","tier":5,"rank":10,"season":5}`,
      "fatwiener69-1980_support": `{"icon":"https://static.playoverwatch.com/img/pages/career/icons/rank/Rank_DiamondTier-d775ca9c43.png","tier":2,"rank":23,"season":7}`,
      "Ladiesman217-11267_damage": `{"icon":"https://static.playoverwatch.com/img/pages/career/icons/rank/Rank_PlatinumTier-ccf57375a7.png","tier":5,"rank":15,"season":14}`,
      "Ladiesman217-11267_support": `{"icon":"https://static.playoverwatch.com/img/pages/career/icons/rank/Rank_DiamondTier-d775ca9c43.png","tier":2,"rank":23,"season":7}`,
      "LucioOnly-1108_support": `{"icon":"https://static.playoverwatch.com/img/pages/career/icons/rank/Rank_PlatinumTier-ccf57375a7.png","tier":1,"rank":19,"season":14}`,
      "GarrettsPP-1913_tank": `{"icon":"https://static.playoverwatch.com/img/pages/career/icons/rank/Rank_DiamondTier-d775ca9c43.png","tier":2,"rank":23,"season":17}`,
      "GarrettsPP-1913_damage": `{"icon":"https://static.playoverwatch.com/img/pages/career/icons/rank/Rank_DiamondTier-d775ca9c43.png","tier":2,"rank":23,"season":17}`,
      "MunchiesPP-1765_tank": `{"icon":"https://static.playoverwatch.com/img/pages/career/icons/rank/Rank_DiamondTier-d775ca9c43.png","tier":3,"rank":22,"season":17}`,
      "JasonsPP-1581_damage": `{"icon":"https://static.playoverwatch.com/img/pages/career/icons/rank/Rank_DiamondTier-d775ca9c43.png","tier":2,"rank":23,"season":17}`,
      "JasonsPP-1581_support": `{"icon":"https://static.playoverwatch.com/img/pages/career/icons/rank/Rank_DiamondTier-d775ca9c43.png","tier":5,"rank":20,"season":17}`,
      "actrojan-1701_support": `{"icon":"https://static.playoverwatch.com/img/pages/career/icons/rank/Rank_MasterTier-7d3b85ba0d.png","tier":5,"rank":26,"season":"5"}`,
      "actrojan-1701_tank": `{"icon":"https://static.playoverwatch.com/img/pages/career/icons/rank/Rank_DiamondTier-d775ca9c43.png","tier":2,"rank":23,"season":"8"}`,
    };

    Object.entries(ranks).forEach(([key, value]) => {
      Cookies.set(key, value, { expires: 400 });
    });
  }

  initializeRanks();

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
        (alt: any) =>
          new OWAlt(
            alt.userName,
            alt.userTag,
            alt.owner,
            alt.tags,
            alt.encryptedEmail ?? ""
          )
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
        new OWAlt(
          userName,
          userTag,
          owner,
          [...tags],
          altToPin.encryptedEmail ?? ""
        ),
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

      // If API provided non-cached season values, compare and update global season state
      if (updatedAlt) {
        const roles: Array<"tank" | "damage" | "support"> = [
          "tank",
          "damage",
          "support",
        ];
        roles.forEach((role) => {
          const roleKey = role.charAt(0).toUpperCase() + role.slice(1);
          const isCachedFlag = (updatedAlt as any)[`isCached${roleKey}`];
          const apiSeason = (updatedAlt as any)[`${role}Season`];
          if (!isCachedFlag && apiSeason != null) {
            const apiSeasonNum =
              typeof apiSeason === "string" ? parseInt(apiSeason) : apiSeason;
            setSeason((prev) => {
              console.log(
                `Comparing seasons for ${updatedAlt.userTag} ${role}: currentSeason=${prev}, apiSeason=${apiSeasonNum}`
              );
              if (!Number.isNaN(apiSeasonNum) && apiSeasonNum > prev) {
                console.log(
                  `Updating current season from ${prev} to ${apiSeasonNum} based on ${updatedAlt.userTag} ${role}`
                );
                return apiSeasonNum;
              }
              return prev;
            });
          }
        });
      }

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

      <div className="altmanager-secret-container">
        <label className="altmanager-secret-label">Secret</label>
        <input
          className="altmanager-secret-input"
          type="text"
          value={isSecretFocused ? secretInput : "*".repeat(secretInput.length)}
          onChange={(e) => {
            const v = e.target.value;
            setSecretInput(v);
            Cookies.set("secret", v, { expires: 400 });
          }}
          onFocus={() => setIsSecretFocused(true)}
          onBlur={() => setIsSecretFocused(false)}
          placeholder="Input your secret here"
          aria-label="Secret input"
        />
        <button
          type="button"
          className="altmanager-secret-copy"
          onClick={async () => {
            try {
              await navigator.clipboard.writeText(secretInput);
              console.log(
                `Secret copied to clipboard (${secretInput.length} chars)`
              );
              // notify toast
              window.dispatchEvent(
                new CustomEvent("clipboard-copied", {
                  detail: { source: "secret" },
                })
              );
            } catch (err) {
              console.error("Failed to copy secret:", err);
            }
          }}
          aria-label="Copy secret to clipboard"
        >
          Copy
        </button>
      </div>

      {/* toast shown at bottom center */}
      {showCopiedToast ? (
        <div
          className={`clipboard-toast ${
            copiedIsError ? "clipboard-toast-error" : ""
          }`}
          role="status"
          aria-live="polite"
        >
          {copiedMessage}
        </div>
      ) : null}

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
