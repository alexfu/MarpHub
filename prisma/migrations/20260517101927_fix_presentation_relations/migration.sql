-- AddForeignKey
ALTER TABLE "Presentation" ADD CONSTRAINT "Presentation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
