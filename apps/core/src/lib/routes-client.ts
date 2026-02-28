import { page } from "$app/state";
import { type LocalizedPath, resolveWithLocale } from "$lib/routes";

export function resolveWithCurrentLocale(path: LocalizedPath): string {
  return resolveWithLocale(path, {
    locale: (page.params as Record<string, string>).locale,
  });
}
