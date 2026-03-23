/** Paths to files under `public/` (served at `/…` in dev). Use this so assets resolve when the app is not hosted at the domain root — set `homepage` in package.json to your deployed URL, or use `homepage: "."` for relative deployment. */
export function publicAssetUrl(path: string): string {
  const base = process.env.PUBLIC_URL ?? "";
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${base}${normalized}`;
}
