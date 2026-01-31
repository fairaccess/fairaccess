import type { users } from "@fairaccess/db";
import type { InferSelectModel } from "drizzle-orm";

export type User = InferSelectModel<typeof users>;
