-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "id_telegram" TEXT NOT NULL,
    "email" TEXT,
    "name" TEXT
);

-- CreateTable
CREATE TABLE "Message" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "type" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL,
    "sender" TEXT NOT NULL,
    "receiver" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    CONSTRAINT "Message_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Message_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "Session" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "created_at" DATETIME NOT NULL,
    "update_at" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_id_telegram_key" ON "User"("id_telegram");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
