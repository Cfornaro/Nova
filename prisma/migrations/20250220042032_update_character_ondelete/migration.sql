-- DropForeignKey
ALTER TABLE "Character" DROP CONSTRAINT "Character_playerUsername_fkey";

-- AddForeignKey
ALTER TABLE "Character" ADD CONSTRAINT "Character_playerUsername_fkey" FOREIGN KEY ("playerUsername") REFERENCES "Player"("username") ON DELETE CASCADE ON UPDATE CASCADE;
