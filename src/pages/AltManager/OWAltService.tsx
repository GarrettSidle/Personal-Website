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

  if (!summary.competitive?.pc) {
    alt.tankRankImagePath = "/assets/AltManager/Unranked.png";
    alt.tankRank = 0;
    alt.damageRankImagePath = "/assets/AltManager/Unranked.png";
    alt.damageRank = 0;
    alt.supportRankImagePath = "/assets/AltManager/Unranked.png";
    alt.supportRank = 0;
  } else {
    if (summary.competitive.pc.tank) {
      alt.tankRankImagePath = summary.competitive.pc.tank.rank_icon;
      alt.tankRankTier = summary.competitive.pc.tank.tier;
      alt.tankRank = convertRankToNumber(
        summary.competitive.pc.tank.division,
        summary.competitive.pc.tank.tier
      );
    } else {
      alt.tankRankImagePath = "/assets/AltManager/Unranked.png";
      alt.tankRank = 0;
    }

    if (summary.competitive.pc.damage) {
      alt.damageRankImagePath = summary.competitive.pc.damage.rank_icon;
      alt.damageRankTier = summary.competitive.pc.damage.tier;
      alt.damageRank = convertRankToNumber(
        summary.competitive.pc.damage.division,
        summary.competitive.pc.damage.tier
      );
    } else {
      alt.damageRankImagePath = "/assets/AltManager/Unranked.png";
      alt.damageRank = 0;
    }

    if (summary.competitive.pc.support) {
      alt.supportRankImagePath = summary.competitive.pc.support.rank_icon;
      alt.supportRankTier = summary.competitive.pc.support.tier;
      alt.supportRank = convertRankToNumber(
        summary.competitive.pc.support.division,
        summary.competitive.pc.support.tier
      );
    } else {
      alt.supportRankImagePath = "/assets/AltManager/Unranked.png";
      alt.supportRank = 0;
    }
  }

  return alt;
}
