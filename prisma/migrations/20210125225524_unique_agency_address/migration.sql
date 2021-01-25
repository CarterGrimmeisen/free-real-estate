/*
  Warnings:

  - The migration will add a unique constraint covering the columns `[address]` on the table `Agency`. If there are existing duplicate values, the migration will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Agency.address_unique" ON "Agency"("address");
