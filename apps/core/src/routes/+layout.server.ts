import pkg from "../../package.json";

export function load({ url }) {
  return {
    version: pkg.version,
    path: url.pathname,
  };
}
