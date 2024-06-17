/*
  Warnings:

  - Added the required column `expiration` to the `Session` table without a default value. This is not possible if the table is not empty.
  - Added the required column `token` to the `Session` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Session` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Session" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "token" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Invalid',
    "userId" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL,
    "expiration" DATETIME NOT NULL,
    "update_at" DATETIME NOT NULL,
    CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Session" ("created_at", "id", "update_at") SELECT "created_at", "id", "update_at" FROM "Session";
DROP TABLE "Session";
ALTER TABLE "new_Session" RENAME TO "Session";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
