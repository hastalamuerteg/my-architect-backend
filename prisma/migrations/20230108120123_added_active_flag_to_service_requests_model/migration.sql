-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_serviceRequests" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "requested" BOOLEAN NOT NULL DEFAULT true,
    "accepted" BOOLEAN NOT NULL DEFAULT false,
    "refused" BOOLEAN NOT NULL DEFAULT false,
    "customerId" TEXT NOT NULL,
    "architectId" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    CONSTRAINT "serviceRequests_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "customers" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "serviceRequests_architectId_fkey" FOREIGN KEY ("architectId") REFERENCES "architects" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_serviceRequests" ("accepted", "architectId", "createdAt", "customerId", "description", "id", "refused", "requested", "title", "updatedAt") SELECT "accepted", "architectId", "createdAt", "customerId", "description", "id", "refused", "requested", "title", "updatedAt" FROM "serviceRequests";
DROP TABLE "serviceRequests";
ALTER TABLE "new_serviceRequests" RENAME TO "serviceRequests";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
