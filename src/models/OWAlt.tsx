export class OWAlt {
  userName: string;
  userTag: string;
  owner: string;
  tags: string[];
  avatarImagePath: string;
  tankRankImagePath: string;
  tankRank: number;
  tankRankTier: number;
  damageRankImagePath: string;
  damageRank: number;
  damageRankTier: number;
  supportRankImagePath: string;
  supportRank: number;
  supportRankTier: number;
  lastUpdated?: string;
  isCachedTank?: boolean;
  isCachedDamage?: boolean;
  isCachedSupport?: boolean;
  tankSeason?: string;
  damageSeason?: string;
  supportSeason?: string;
  unrankedCachedTank?: boolean;
  unrankedCachedDamage?: boolean;
  unrankedCachedSupport?: boolean;
  encryptedEmail?: string;

  constructor(
    userName: string,
    userTag: string,
    owner: string,
    tags: string[],
    encryptedEmail: string
  ) {
    this.userName = userName;
    this.userTag = userTag;
    this.owner = owner;
    this.tags = tags;
    this.avatarImagePath = "/assets/AltManager/DefaultAvatar.png";
    this.tankRankImagePath = "/assets/AltManager/Loading.gif";
    this.tankRank = 0;
    this.tankRankTier = 0;
    this.damageRankImagePath = "/assets/AltManager/Loading.gif";
    this.damageRank = 0;
    this.damageRankTier = 0;
    this.supportRankImagePath = "/assets/AltManager/Loading.gif";
    this.supportRank = 0;
    this.supportRankTier = 0;
    this.lastUpdated = undefined;
    this.isCachedTank = false;
    this.isCachedDamage = false;
    this.isCachedSupport = false;
    this.tankSeason = undefined;
    this.damageSeason = undefined;
    this.supportSeason = undefined;
    this.unrankedCachedTank = false;
    this.unrankedCachedDamage = false;
    this.unrankedCachedSupport = false;
    this.encryptedEmail = encryptedEmail;
  }
}
