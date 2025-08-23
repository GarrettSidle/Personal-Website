export class OWAlt {
  userName: string;
  userTag: string;
  owner: string;
  tags: string[];
  avatarImagePath: string;
  tankRankImagePath: string;
  tankRank: number;
  damageRankImagePath: string;
  damageRank: number;
  supportRankImagePath: string;
  supportRank: number;

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
    this.tankRankImagePath = "/assets/AltManager/Loading.png";
    this.tankRank = 0;
    this.damageRankImagePath = "/assets/AltManager/Loading.png";
    this.damageRank = 0;
    this.supportRankImagePath = "/assets/AltManager/Loading.png";
    this.supportRank = 0;
  }
}
