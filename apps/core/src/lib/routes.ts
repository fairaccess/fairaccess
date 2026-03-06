import { DEFAULT_LOCALE } from "@fairaccess/i18n";
import { resolve } from "$app/paths";
import type { RouteId, RouteParams } from "$app/types";

type LocaleParams = {
  locale?: string;
};

type LocaleOptionalOnlyRouteId = {
  [R in RouteId]: Exclude<keyof RouteParams<R>, "locale"> extends never
    ? R
    : never;
}[RouteId];

type LocalizedRouteId = Extract<
  LocaleOptionalOnlyRouteId,
  `/[[locale=locale]]${string}`
>;

type LocalizedSuffix<T extends string> = T extends "/[[locale=locale]]"
  ? ""
  : T extends `/[[locale=locale]]${infer Suffix}`
    ? Suffix
    : never;

// Route groups like (auth) are organizational only and never appear
// in URLs. SvelteKit prevents collisions between grouped and ungrouped routes,
// so stripping them produces a unique, user-friendly path. Paths whose suffix
// is only a group (e.g. `/(auth)`) are layout-only routes with no URL and are
// excluded via `never`.
type StripGroups<T extends string> =
  T extends `${infer A}(${string})/${infer B}`
    ? StripGroups<`${A}${B}`>
    : T extends `${string}(${string})${string}`
      ? never
      : T;

export type LocalizedPath =
  | "/"
  | Exclude<StripGroups<LocalizedSuffix<LocalizedRouteId>>, "">;

export function resolveWithLocale(
  path: LocalizedPath,
  params?: LocaleParams,
): string {
  const locale = params?.locale;
  const suffix = path === "/" ? "" : path;

  if (!locale || locale === DEFAULT_LOCALE) {
    return resolve(suffix || "/");
  }

  return resolve(`/${locale}${suffix}`);
}
