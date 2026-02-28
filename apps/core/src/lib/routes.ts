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

export type LocalizedPath =
  | "/"
  | Exclude<LocalizedSuffix<LocalizedRouteId>, "">;

type LocalizedRouteParams = RouteParams<LocalizedRouteId>;

export function resolveWithLocale(
  path: LocalizedPath,
  params?: LocaleParams,
): string {
  const locale = params?.locale;
  const routeId: LocalizedRouteId =
    path === "/" ? "/[[locale=locale]]" : `/[[locale=locale]]${path}`;

  if (!locale || locale === DEFAULT_LOCALE) {
    return resolve(routeId, {} as LocalizedRouteParams);
  }

  return resolve(routeId, { locale } as LocalizedRouteParams);
}
