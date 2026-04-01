import { PrismaClient } from "@/app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function createPrismaClient(): PrismaClient {
  const databaseUrl = process.env.DATABASE_URL ?? "";

  // prisma+postgres:// URLs use Prisma Accelerate protocol
  // Standard postgres:// URLs use direct adapter
  if (databaseUrl.startsWith("prisma+postgres://")) {
    // Extract the real postgres URL from the base64-encoded api_key
    const url = new URL(databaseUrl);
    const apiKey = url.searchParams.get("api_key") ?? "";
    const decoded = JSON.parse(Buffer.from(apiKey, "base64").toString("utf-8"));
    const realUrl = decoded.databaseUrl as string;

    const pool = new Pool({ connectionString: realUrl });
    const adapter = new PrismaPg(pool);
    return new PrismaClient({ adapter }) as PrismaClient;
  }

  // Direct postgres URL
  const pool = new Pool({ connectionString: databaseUrl });
  const adapter = new PrismaPg(pool);
  return new PrismaClient({ adapter }) as PrismaClient;
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
