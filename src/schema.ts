import { relations } from "drizzle-orm";
import { pgTable, text, timestamp, boolean, index, date, integer, pgEnum } from "drizzle-orm/pg-core";

export const roleStatus = pgEnum("role", ["user", "admin"]);

//tables crées par BetterAuth

export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name"),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").default(false).notNull(),
  image: text("image"),
  role: roleStatus("role").notNull().default("user"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull()
});

export const session = pgTable(
  "session",
  {
    id: text("id").primaryKey(),
    expiresAt: timestamp("expires_at").notNull(),
    token: text("token").notNull().unique(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
    ipAddress: text("ip_address"),
    userAgent: text("user_agent"),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
  },
  (table) => [index("session_userId_idx").on(table.userId)],
);

export const account = pgTable(
  "account",
  {
    id: text("id").primaryKey(),
    accountId: text("account_id").notNull(),
    providerId: text("provider_id").notNull(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    accessToken: text("access_token"),
    refreshToken: text("refresh_token"),
    idToken: text("id_token"),
    accessTokenExpiresAt: timestamp("access_token_expires_at"),
    refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
    scope: text("scope"),
    password: text("password"),
    banStatus: boolean("ban_status").default(false).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [index("account_userId_idx").on(table.userId)],
);

export const verification = pgTable(
  "verification",
  {
    id: text("id").primaryKey(),
    identifier: text("identifier").notNull(),
    value: text("value").notNull(),
    expiresAt: timestamp("expires_at").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [index("verification_identifier_idx").on(table.identifier)],
);

export const userRelations = relations(user, ({ many }) => ({
  sessions: many(session),
  accounts: many(account),
}));

export const sessionRelations = relations(session, ({ one }) => ({
  user: one(user, {
    fields: [session.userId],
    references: [user.id],
  }),
}));

export const accountRelations = relations(account, ({ one }) => ({
  user: one(user, {
    fields: [account.userId],
    references: [user.id],
  }),
}));

//tables spécifiques à Collab'

export const profile = pgTable("profile", {
  artistName: text("artist_name").notNull(),
  addressNumber: integer("address_number"),
  addressStreetName: text("address_street_name"),
  addressZipCode: integer("address_zip_code"),
  addressCountry: text("address_country"),
  birthdate: date("birthdate"),
  bio: text("bio"),
  contactLink: text("contact_link").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull()
});

export const UserMusicalInfluences = pgTable("user_musical_influences", {
  id: integer("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  influenceId: integer("influence_id")
});

export const musicalInfluences = pgTable("musical_influences", {
  id: integer("id").primaryKey(),
  artistName: text("artist_name")
    .notNull(),
  releaseName: text("release_name")
    .notNull(),
  releaseYear: integer("release_year")
    .notNull()
});

export const post = pgTable("post", {
  id: integer("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  content: text("content").notNull(),
  postActiveStatus: boolean("post_active_status").default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull()
});

export const postTag = pgTable("post_tag", {
  id: integer("id").primaryKey(),
  postId: integer("post_id")
    .notNull()
    .references(() => post.id, { onDelete: "cascade" }),
  tagId: integer("tag_id")
    .notNull()
    .references(() => tag.id, { onDelete: "cascade" })
});

export const tag = pgTable("tag", {
  id: integer("id").primaryKey(),
  tagName: text("tag_name").notNull(),
  categoryId: integer("category_id").notNull(),
});

export const tagCategory = pgTable("tag_category", {
  id: integer("id").primaryKey(),
  tagCategoryName: text("tag_category_name").notNull()
});

export const comment = pgTable("comment", {
  id: integer("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  postId: integer("post_id")
    .notNull()
    .references(() => post.id, { onDelete: "cascade" }),
  content: text("content").notNull(),
  commentActiveStatus: boolean("comment_active_status").default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull()
});

export const userFavoritePost = pgTable("user_favorite_post", {
  id: integer("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  postId: integer("post_id")
    .notNull()
    .references(() => post.id, { onDelete: "cascade" }),
});
