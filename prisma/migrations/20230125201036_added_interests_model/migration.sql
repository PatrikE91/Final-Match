-- CreateTable
CREATE TABLE "Interests" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER,
    "favoriteGame" TEXT,
    "favoriteBook" TEXT,
    "favoriteMovie" TEXT,

    CONSTRAINT "Interests_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Interests_userId_key" ON "Interests"("userId");

-- AddForeignKey
ALTER TABLE "Interests" ADD CONSTRAINT "Interests_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
