/*
  Warnings:

  - You are about to drop the column `player1Username` on the `Team` table. All the data in the column will be lost.
  - You are about to drop the column `player2Username` on the `Team` table. All the data in the column will be lost.
  - You are about to drop the column `player3Username` on the `Team` table. All the data in the column will be lost.
  - You are about to drop the column `player4Username` on the `Team` table. All the data in the column will be lost.
  - You are about to drop the column `player5Username` on the `Team` table. All the data in the column will be lost.
  - Added the required column `character1Id` to the `Team` table without a default value. This is not possible if the table is not empty.
  - Added the required column `character2Id` to the `Team` table without a default value. This is not possible if the table is not empty.
  - Added the required column `character3Id` to the `Team` table without a default value. This is not possible if the table is not empty.
  - Added the required column `character4Id` to the `Team` table without a default value. This is not possible if the table is not empty.
  - Added the required column `character5Id` to the `Team` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Team" DROP CONSTRAINT "Team_player1Username_fkey";

-- DropForeignKey
ALTER TABLE "Team" DROP CONSTRAINT "Team_player2Username_fkey";

-- DropForeignKey
ALTER TABLE "Team" DROP CONSTRAINT "Team_player3Username_fkey";

-- DropForeignKey
ALTER TABLE "Team" DROP CONSTRAINT "Team_player4Username_fkey";

-- DropForeignKey
ALTER TABLE "Team" DROP CONSTRAINT "Team_player5Username_fkey";

-- DropIndex
DROP INDEX "Team_player1Username_idx";

-- DropIndex
DROP INDEX "Team_player2Username_idx";

-- DropIndex
DROP INDEX "Team_player3Username_idx";

-- DropIndex
DROP INDEX "Team_player4Username_idx";

-- DropIndex
DROP INDEX "Team_player5Username_idx";

-- AlterTable
ALTER TABLE "Team" DROP COLUMN "player1Username",
DROP COLUMN "player2Username",
DROP COLUMN "player3Username",
DROP COLUMN "player4Username",
DROP COLUMN "player5Username",
ADD COLUMN     "character1Id" INTEGER NOT NULL,
ADD COLUMN     "character2Id" INTEGER NOT NULL,
ADD COLUMN     "character3Id" INTEGER NOT NULL,
ADD COLUMN     "character4Id" INTEGER NOT NULL,
ADD COLUMN     "character5Id" INTEGER NOT NULL;

-- CreateIndex
CREATE INDEX "Team_character1Id_idx" ON "Team"("character1Id");

-- CreateIndex
CREATE INDEX "Team_character2Id_idx" ON "Team"("character2Id");

-- CreateIndex
CREATE INDEX "Team_character3Id_idx" ON "Team"("character3Id");

-- CreateIndex
CREATE INDEX "Team_character4Id_idx" ON "Team"("character4Id");

-- CreateIndex
CREATE INDEX "Team_character5Id_idx" ON "Team"("character5Id");

-- AddForeignKey
ALTER TABLE "Team" ADD CONSTRAINT "Team_character1Id_fkey" FOREIGN KEY ("character1Id") REFERENCES "Character"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Team" ADD CONSTRAINT "Team_character2Id_fkey" FOREIGN KEY ("character2Id") REFERENCES "Character"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Team" ADD CONSTRAINT "Team_character3Id_fkey" FOREIGN KEY ("character3Id") REFERENCES "Character"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Team" ADD CONSTRAINT "Team_character4Id_fkey" FOREIGN KEY ("character4Id") REFERENCES "Character"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Team" ADD CONSTRAINT "Team_character5Id_fkey" FOREIGN KEY ("character5Id") REFERENCES "Character"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
