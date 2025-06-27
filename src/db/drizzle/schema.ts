import { sql } from "drizzle-orm";
import {
  foreignKey,
  pgPolicy,
  pgTable,
  text,
  timestamp,
  unique,
  uuid,
} from "drizzle-orm/pg-core";

export const users = pgTable(
  "users",
  {
    id: uuid().primaryKey().notNull(),
    fullName: text("full_name"),
    email: text(),
    avatarUrl: text("avatar_url"),
    createdAt: timestamp("created_at", { withTimezone: true, mode: "string" }),
    updatedAt: timestamp("updated_at", { withTimezone: true, mode: "string" }),
  },
  (table) => [
    foreignKey({
      columns: [table.id],
      foreignColumns: [table.id],
      name: "users_id_fkey",
    }).onDelete("cascade"),
    unique("users_email_key").on(table.email),
    pgPolicy("Users can update own profile.", {
      as: "permissive",
      for: "update",
      to: ["public"],
      using: sql`(( SELECT auth.uid() AS uid) = id)`,
    }),
    pgPolicy("Users can insert their own profile.", {
      as: "permissive",
      for: "insert",
      to: ["public"],
    }),
    pgPolicy("Public users are viewable by everyone.", {
      as: "permissive",
      for: "select",
      to: ["public"],
    }),
  ]
);
