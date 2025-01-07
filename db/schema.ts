import { relations } from "drizzle-orm";
import { serial, text, timestamp, pgTable, uuid } from "drizzle-orm/pg-core";
import { userInfo } from "os";

export const user = pgTable("user", {
  //id: serial("id"),   // 자동 증가하는 4 바이트 정수 타입
  id: uuid("id").defaultRandom().notNull().primaryKey(),  // UUID 형식의 문자열을 id로 만들어줌
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),

  createdAt: timestamp("created_at").defaultNow().notNull(), // 데이터가 생성될 때의 시간
  updatedAt: timestamp("updated_at").defaultNow().notNull(), // 데이터가 업데이트될 때의 시간
});

export const usersRelation = relations(user, ({ many }) => ({
	conversations: many(conversation),
}));

export const conversation = pgTable("conversation", {
  id: uuid("id").defaultRandom().notNull().primaryKey(),
  name: text("name"),
  userId: uuid('userId').references(() => user.id, {onDelete: 'cascade'}).notNull(),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const conversationRelations = relations(conversation, ({ one, many }) => ({
	author: one(user, {
		fields: [conversation.userId],
		references: [user.id],
	}),
  messages: many(message),
}));

export const message = pgTable("message", {
  id: uuid("id").defaultRandom().notNull().primaryKey(),
  content: text("content"),
  role: text("role").$type<"user" | "assistant">(),
  conversationId: uuid('conversationId').references(() => conversation.id, {onDelete: 'cascade'}).notNull(),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const messageRelations = relations(message, ({ one }) => ({
	author: one(conversation, {
		fields: [message.conversationId],
		references: [conversation.id],
	}),
}))