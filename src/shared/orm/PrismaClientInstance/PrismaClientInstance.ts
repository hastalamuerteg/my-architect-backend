import { PrismaClient } from '@prisma/client';

class PrismaClientInstance {
  private static prisma: PrismaClient;

  public static getInstance() {
    if (!PrismaClientInstance.prisma) {
      PrismaClientInstance.prisma = new PrismaClient();
    }

    return PrismaClientInstance.prisma;
  }
}

export { PrismaClientInstance };
