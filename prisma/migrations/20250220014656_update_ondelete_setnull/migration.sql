-- DropForeignKey
ALTER TABLE "Team" DROP CONSTRAINT "Team_character1Id_fkey";

-- DropForeignKey
ALTER TABLE "Team" DROP CONSTRAINT "Team_character2Id_fkey";

-- DropForeignKey
ALTER TABLE "Team" DROP CONSTRAINT "Team_character3Id_fkey";

-- DropForeignKey
ALTER TABLE "Team" DROP CONSTRAINT "Team_character4Id_fkey";

-- DropForeignKey
ALTER TABLE "Team" DROP CONSTRAINT "Team_character5Id_fkey";

-- AlterTable
ALTER TABLE "Team" ALTER COLUMN "character1Id" DROP NOT NULL,
ALTER COLUMN "character2Id" DROP NOT NULL,
ALTER COLUMN "character3Id" DROP NOT NULL,
ALTER COLUMN "character4Id" DROP NOT NULL,
ALTER COLUMN "character5Id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Team" ADD CONSTRAINT "Team_character1Id_fkey" FOREIGN KEY ("character1Id") REFERENCES "Character"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Team" ADD CONSTRAINT "Team_character2Id_fkey" FOREIGN KEY ("character2Id") REFERENCES "Character"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Team" ADD CONSTRAINT "Team_character3Id_fkey" FOREIGN KEY ("character3Id") REFERENCES "Character"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Team" ADD CONSTRAINT "Team_character4Id_fkey" FOREIGN KEY ("character4Id") REFERENCES "Character"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Team" ADD CONSTRAINT "Team_character5Id_fkey" FOREIGN KEY ("character5Id") REFERENCES "Character"("id") ON DELETE SET NULL ON UPDATE CASCADE;
