import { pgTableCreator } from "drizzle-orm/pg-core";

export const createTable = pgTableCreator(
  (name: string): string => `kira_${name}`,
);
