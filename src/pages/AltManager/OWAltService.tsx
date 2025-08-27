import Cookies from "js-cookie";
import { OWAlt } from "../../models/OWAlt";

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

  return `${formattedDate} ${formattedTime}`;
}

function convertRankToNumber(division: string, tier: number): number {
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
}

// ----- Types for stored cookies -----
interface CachedRank {
  icon: string;
  tier: number;
  rank: number;
  season?: number;
}

type Role = "tank" | "damage" | "support";

function saveRankToCookie(userTag: string, role: Role, rank: CachedRank): void {
  const key = `${userTag}_${role}`;
  Cookies.set(key, JSON.stringify(rank));
}

function loadRankFromCookie(userTag: string, role: Role): CachedRank | null {
  const key = `${userTag}_${role}`;
  const data = Cookies.get(key);
  return data ? (JSON.parse(data) as CachedRank) : null;
}

export async function fetchPlayerSummary(alt: OWAlt): Promise<OWAlt> {
  const summary = await fetchWithBackoff(
    `https://overfast-api.tekrop.fr/players/${alt.userTag}/summary`
  );

  if (summary?.error === 404) {
    alt.tankRankImagePath = "/assets/AltManager/Error.png";
    alt.damageRankImagePath = "/assets/AltManager/Error.png";
    alt.supportRankImagePath = "/assets/AltManager/Error.png";
    alt.avatarImagePath = "/assets/AltManager/Error.png";
    alt.tankRankTier = -1;
    alt.damageRankTier = -1;
    alt.supportRankTier = -1;
    alt.lastUpdated = "N/A";
    return alt;
  }

  if (!summary) return alt;

  alt.avatarImagePath = summary.avatar || alt.avatarImagePath;
  alt.lastUpdated = convertUnixToEST(summary.last_updated_at);

  const roles: Role[] = ["tank", "damage", "support"];
  for (const role of roles) {
    const roleData = summary.competitive?.pc?.[role];
    const roleKey = role.charAt(0).toUpperCase() + role.slice(1); // "Tank", "Damage", "Support"
    if (roleData) {
      // Found a rank
      const rankNumber = convertRankToNumber(roleData.division, roleData.tier);
      (alt as any)[`${role}RankImagePath`] = roleData.rank_icon;
      (alt as any)[`${role}RankTier`] = roleData.tier;
      (alt as any)[`${role}Rank`] = rankNumber;
      (alt as any)[`isCached${roleKey}`] = false;
      (alt as any)[`${role}Season`] = summary.competitive?.pc?.season;

      saveRankToCookie(alt.userTag, role, {
        icon: roleData.rank_icon,
        tier: roleData.tier,
        rank: rankNumber,
        season: summary.competitive?.pc?.season,
      });
    } else {
      // Not ranked -> check cookie
      const cached = loadRankFromCookie(alt.userTag, role);
      if (cached) {
        (alt as any)[`${role}RankImagePath`] = cached.icon;
        (alt as any)[`${role}RankTier`] = cached.tier;
        (alt as any)[`${role}Rank`] = cached.rank;
        (alt as any)[`${role}Season`] = cached.season ? cached.season : 17;
        (alt as any)[`isCached${roleKey}`] = true;
      } else {
        (alt as any)[`${role}RankImagePath`] =
          "/assets/AltManager/Unranked.png";
        (alt as any)[`${role}RankTier`] = 0;
        (alt as any)[`${role}Rank`] = 0;
        (alt as any)[`${role}Season`] = 1;
        (alt as any)[`isCached${roleKey}`] = false;
      }
    }
  }

  return alt;
}
