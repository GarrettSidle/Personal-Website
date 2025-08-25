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

  constructor(
    userName: string,
    userTag: string,
    owner: string,
    tags: string[]
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
  }
}
