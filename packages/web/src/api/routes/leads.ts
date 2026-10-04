import { z } from "zod";
import { desc } from "drizzle-orm";
import { ORPCError } from "@orpc/server";
import { base } from "../__core/app";
import { db } from "../database";
import * as schema from "../database/schema";

const leadInput = z.object({
  name: z.string().trim().min(3).max(120),
  birthDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  phone: z.string().trim().min(10).max(20),
  email: z.string().trim().email().max(160),
});

export const leads = {
  create: base.input(leadInput).handler(async ({ input }) => {
    const [lead] = await db
      .insert(schema.leads)
      .values(input)
      .returning({ id: schema.leads.id });
    return { ok: true, id: lead.id };
  }),
  list: base
    .input(z.object({ password: z.string() }))
    .handler(async ({ input }) => {
      const expected = process.env.ADMIN_PASSWORD;
      if (!expected || input.password !== expected) {
        throw new ORPCError("UNAUTHORIZED", { message: "Senha inválida" });
      }
      return db.select().from(schema.leads).orderBy(desc(schema.leads.createdAt));
    }),
};
