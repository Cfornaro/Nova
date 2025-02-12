-- CreateTable
CREATE TABLE "Player" (
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "ranking" INTEGER NOT NULL,
    "level" INTEGER NOT NULL,
    "victories" INTEGER NOT NULL,
    "defeats" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Player_pkey" PRIMARY KEY ("username")
);

-- CreateTable
CREATE TABLE "Team" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "player1Username" TEXT NOT NULL,
    "player2Username" TEXT NOT NULL,
    "player3Username" TEXT NOT NULL,
    "player4Username" TEXT NOT NULL,
    "player5Username" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Team_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Character" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "health" INTEGER NOT NULL,
    "attack" INTEGER NOT NULL,
    "defense" INTEGER NOT NULL,
    "speed" INTEGER NOT NULL,
    "playerUsername" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Character_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Player_email_key" ON "Player"("email");

-- CreateIndex
CREATE INDEX "Team_player1Username_idx" ON "Team"("player1Username");

-- CreateIndex
CREATE INDEX "Team_player2Username_idx" ON "Team"("player2Username");

-- CreateIndex
CREATE INDEX "Team_player3Username_idx" ON "Team"("player3Username");

-- CreateIndex
CREATE INDEX "Team_player4Username_idx" ON "Team"("player4Username");

-- CreateIndex
CREATE INDEX "Team_player5Username_idx" ON "Team"("player5Username");

-- CreateIndex
CREATE INDEX "Character_playerUsername_idx" ON "Character"("playerUsername");

-- AddForeignKey
ALTER TABLE "Team" ADD CONSTRAINT "Team_player1Username_fkey" FOREIGN KEY ("player1Username") REFERENCES "Player"("username") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Team" ADD CONSTRAINT "Team_player2Username_fkey" FOREIGN KEY ("player2Username") REFERENCES "Player"("username") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Team" ADD CONSTRAINT "Team_player3Username_fkey" FOREIGN KEY ("player3Username") REFERENCES "Player"("username") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Team" ADD CONSTRAINT "Team_player4Username_fkey" FOREIGN KEY ("player4Username") REFERENCES "Player"("username") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Team" ADD CONSTRAINT "Team_player5Username_fkey" FOREIGN KEY ("player5Username") REFERENCES "Player"("username") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Character" ADD CONSTRAINT "Character_playerUsername_fkey" FOREIGN KEY ("playerUsername") REFERENCES "Player"("username") ON DELETE RESTRICT ON UPDATE CASCADE;
