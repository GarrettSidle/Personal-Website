import { OWAlt } from "../../models/OWAlt";
import "./AltCard.css";
import PushPinIcon from "@mui/icons-material/PushPin";
import Cookies from "js-cookie";
import CryptoJS from "crypto-js";

export function AltCard({
  alt,
  onPinClick,
  isPinned,
  currentSeason,
}: {
  alt: OWAlt;
  onPinClick: () => void;
  isPinned: boolean;
  currentSeason: number;
}) {
  function getSeasonColor(season: number, currentSeason: number) {
    const diff = currentSeason - season;
    if (diff === 1) return "green"; // last season
    if (diff <= 3) return "yellow"; // 2-3 seasons ago
    return "red"; // more than 3 seasons ago
  }

  // Decrypt using CryptoJS AES
  async function decryptWithSecret(encrypted: string, secret: string) {
    try {
      const bytes = CryptoJS.AES.decrypt(encrypted, secret);
      const plaintext = bytes.toString(CryptoJS.enc.Utf8);
      if (!plaintext) {
        throw new Error("Decryption returned empty string");
      }
      return plaintext;
    } catch (err) {
      console.error("Decrypt failed:", err);
      return null;
    }
  }

  const handleCopyDecryptedEmail = async () => {
    const encrypted = alt.encryptedEmail;

    // Guard: ensure we have an encrypted string before attempting decryption
    if (!encrypted || encrypted.length === 0) {
      console.warn(`No encrypted email available for ${alt.userTag}`);
      window.dispatchEvent(
        new CustomEvent("clipboard-copied", {
          detail: {
            message: "ERROR: No encrypted email available",
            error: true,
            source: alt.userTag,
          },
        })
      );
      return;
    }

    const secret = Cookies.get("secret") ?? "";
    if (secret === "" || !secret) {
      console.warn("No secret available in cookies for decryption");
      window.dispatchEvent(
        new CustomEvent("clipboard-copied", {
          detail: {
            message: "ERROR: Incorrect or Empty Secret",
            error: true,
            source: alt.userTag,
          },
        })
      );
      return;
    }
    console.log(`Attempting to decrypt email for ${alt.userTag}`);
    try {
      const decrypted = await decryptWithSecret(encrypted, secret);
      if (decrypted && decrypted.length > 0) {
        await navigator.clipboard.writeText(decrypted);
        console.log(`Decrypted email copied for ${alt.userTag}`);
        // notify toast in parent/page (success)
        window.dispatchEvent(
          new CustomEvent("clipboard-copied", {
            detail: {
              message: "Copied to Clipboard",
              error: false,
              source: alt.userTag,
            },
          })
        );
      } else {
        console.warn(`Decryption returned null/empty for ${alt.userTag}`);
        window.dispatchEvent(
          new CustomEvent("clipboard-copied", {
            detail: {
              message: "ERROR: Incorrect or Empty Secret",
              error: true,
              source: alt.userTag,
            },
          })
        );
      }
    } catch (err) {
      console.error("Failed to copy decrypted email:", err);
      window.dispatchEvent(
        new CustomEvent("clipboard-copied", {
          detail: {
            message: "ERROR: Failed to copy to clipboard",
            error: true,
            source: alt.userTag,
          },
        })
      );
    }
  };

  return (
    <a
      target="_blank"
      rel="noreferrer"
      href={`https://tracker.gg/overwatch/profile/battlenet/${alt.userTag}/overview`}
      className={`Alt-Card ${alt.tankRankTier < 0 ? "hidden" : ""}`}
      key={alt.userTag}
    >
      <div className="altcard-avatar-wrapper">
        <img
          src={alt.avatarImagePath}
          alt="Avatar"
          className="altcard-avatar"
        />
        {(alt as any).isLoading && (alt as any).hasAnyCached ? (
          <div
            className="altcard-loading-icon"
            title="Updating..."
            aria-hidden={false}
          />
        ) : null}
      </div>
      <div className="altcard-username-container">
        <div className="altcard-username">{alt.userName}</div>
        <div className="altcard-last-updated">
          Last Updated: {alt.lastUpdated}
        </div>
      </div>
      <div className="altcard-role-img-wrapper">
        <img
          src={alt.tankRankImagePath}
          alt="Tank Rank"
          className="altcard-img"
        />
        {(alt as any).isLoading && (alt as any).isCachedTank ? (
          <div
            className="role-loading-icon"
            title="Updating rank"
            aria-hidden={false}
          />
        ) : null}
        <span
          className={`role-rank-overlay ${
            alt.tankRankTier <= 0 ? "hidden" : ""
          }`}
        >
          {alt.tankRankTier}
        </span>
        <span
          className={`season-overlay ${
            alt.tankSeason == currentSeason.toString() || alt.tankRankTier <= 0
              ? "hidden"
              : ""
          }`}
          style={{
            color:
              alt.tankSeason !== undefined
                ? getSeasonColor(parseInt(alt.tankSeason), currentSeason)
                : getSeasonColor(currentSeason - 1, currentSeason),
          }}
        >
          {alt.tankSeason !== undefined
            ? `S${alt.tankSeason}`
            : `S${currentSeason - 1}`}
        </span>
      </div>

      <div className="altcard-role-img-wrapper">
        <img
          src={alt.damageRankImagePath}
          alt="Damage Rank"
          className="altcard-img"
        />
        {(alt as any).isLoading && (alt as any).isCachedDamage ? (
          <div
            className="role-loading-icon"
            title="Updating rank"
            aria-hidden={false}
          />
        ) : null}
        <span
          className={`role-rank-overlay ${
            alt.damageRankTier <= 0 ? "hidden" : ""
          }`}
        >
          {alt.damageRankTier}
        </span>
        <span
          className={`season-overlay ${
            alt.damageSeason == currentSeason.toString() ||
            alt.damageRankTier <= 0
              ? "hidden"
              : ""
          }`}
          style={{
            color:
              alt.damageSeason !== undefined
                ? getSeasonColor(parseInt(alt.damageSeason), currentSeason)
                : getSeasonColor(currentSeason - 1, currentSeason),
          }}
        >
          {alt.damageSeason !== undefined
            ? `S${alt.damageSeason}`
            : `S${currentSeason - 1}`}
        </span>
      </div>

      <div className="altcard-role-img-wrapper">
        <img
          src={alt.supportRankImagePath}
          alt="Support Rank"
          className="altcard-img"
        />
        {(alt as any).isLoading && (alt as any).isCachedSupport ? (
          <div
            className="role-loading-icon"
            title="Updating rank"
            aria-hidden={false}
          />
        ) : null}
        <span
          className={`role-rank-overlay ${
            alt.supportRankTier <= 0 ? "hidden" : ""
          }`}
        >
          {alt.supportRankTier}
        </span>
        <span
          className={`season-overlay ${
            alt.supportSeason == currentSeason.toString() ||
            alt.supportRankTier <= 0
              ? "hidden"
              : ""
          }`}
          style={{
            color:
              alt.supportSeason !== undefined
                ? getSeasonColor(parseInt(alt.supportSeason), currentSeason)
                : getSeasonColor(currentSeason - 1, currentSeason),
          }}
        >
          {alt.supportSeason !== undefined
            ? `S${alt.supportSeason}`
            : `S${currentSeason - 1}`}
        </span>
      </div>
      <div className="altcard-owner">{alt.owner}</div>
      <div className="altcard-tags">
        {alt.tags.map((tag, idx) => (
          <div key={idx} className="altcard-tag">
            {tag}
          </div>
        ))}
      </div>
      <div
        className="altcard-pin-icon"
        onClick={(e) => {
          e.preventDefault();
          onPinClick();
        }}
      >
        <PushPinIcon style={{ color: isPinned ? "#ffffff" : "#000000ff" }} />
      </div>

      {alt.encryptedEmail && alt.encryptedEmail.length > 0 ? (
        <button
          type="button"
          className="altcard-copy-email"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleCopyDecryptedEmail();
          }}
          title="Decrypt & copy email"
          aria-label={`Decrypt and copy email for ${alt.userTag}`}
        >
          ⧉
        </button>
      ) : null}
    </a>
  );
}

export default AltCard;
