-- CreateTable
CREATE TABLE "SurfSessionScreenshot" (
    "id" TEXT NOT NULL,
    "surfSessionId" TEXT NOT NULL,

    CONSTRAINT "SurfSessionScreenshot_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "SurfSessionScreenshot_surfSessionId_idx" ON "SurfSessionScreenshot"("surfSessionId");

-- AddForeignKey
ALTER TABLE "SurfSessionScreenshot" ADD CONSTRAINT "SurfSessionScreenshot_surfSessionId_fkey" FOREIGN KEY ("surfSessionId") REFERENCES "SurfSession"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
