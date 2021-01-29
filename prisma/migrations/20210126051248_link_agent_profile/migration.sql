/*
  Warnings:

  - The migration will add a unique constraint covering the columns `[userId]` on the table `Agent`. If there are existing duplicate values, the migration will fail.
  - The migration will add a unique constraint covering the columns `[street,city,state,zipcode]` on the table `Home`. If there are existing duplicate values, the migration will fail.
  - Added the required column `userId` to the `Agent` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Agent" ADD COLUMN     "userId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Agent_userId_unique" ON "Agent"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Home.street_city_state_zipcode_unique" ON "Home"("street", "city", "state", "zipcode");

-- AddForeignKey
ALTER TABLE "Agent" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
