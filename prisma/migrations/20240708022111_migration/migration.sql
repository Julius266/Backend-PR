-- CreateTable
CREATE TABLE "EssayReport" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "course" TEXT NOT NULL,
    "instructor" TEXT NOT NULL,
    "dueDate" TIMESTAMP(3) NOT NULL,
    "abstract" TEXT NOT NULL,
    "introduction" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "conclusion" TEXT NOT NULL,
    "references" TEXT NOT NULL,

    CONSTRAINT "EssayReport_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ResearchReport" (
    "id" SERIAL NOT NULL,
    "researchTitle" TEXT NOT NULL,
    "researchDate" TIMESTAMP(3) NOT NULL,
    "researcher" TEXT NOT NULL,
    "advisor" TEXT NOT NULL,
    "abstract" TEXT NOT NULL,
    "introduction" TEXT NOT NULL,
    "methodology" TEXT NOT NULL,
    "results" TEXT NOT NULL,
    "discussion" TEXT NOT NULL,
    "conclusion" TEXT NOT NULL,
    "references" TEXT NOT NULL,

    CONSTRAINT "ResearchReport_pkey" PRIMARY KEY ("id")
);
