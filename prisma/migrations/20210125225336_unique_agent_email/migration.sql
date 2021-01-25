/*
  Warnings:

  - The migration will add a unique constraint covering the columns `[email]` on the table `Agent`. If there are existing duplicate values, the migration will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Agent.email_unique" ON "Agent"("email");
