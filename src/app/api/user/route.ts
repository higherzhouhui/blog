import {NextRequest, NextResponse} from "next/server";
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // ... your Prisma Client queries will go here
  const result = await prisma.user.findMany()
  return result
}

export async function GET(request: NextRequest) {
  main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect())
  const bList = await main()
  
  return NextResponse.json({
    code: 200,
    data: {
      bList: bList
    }
  });
}