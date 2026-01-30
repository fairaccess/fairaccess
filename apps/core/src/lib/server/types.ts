import type { InferSelectModel } from "drizzle-orm";
import type { users } from "@fairaccess/db";

export type User = InferSelectModel<typeof users>;
