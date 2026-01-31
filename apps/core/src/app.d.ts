// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
  namespace App {
    // interface Error {}
    interface Locals {
      session: Awaited<
        ReturnType<typeof import("$lib/server/auth").auth.api.getSession>
      >;
    }
    // interface PageData {}
    // interface PageState {}
    // interface Platform {}
  }
}

export {};
