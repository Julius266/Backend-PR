-- CreateTable
CREATE TABLE "SchoolReport" (
    "id" SERIAL NOT NULL,
    "school" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "course" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "student" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "objective" TEXT NOT NULL,
    "materials" TEXT NOT NULL,
    "procedure" TEXT NOT NULL,
    "dataResults" TEXT NOT NULL,
    "analysis" TEXT NOT NULL,
    "conclusions" TEXT NOT NULL,
    "references" TEXT NOT NULL,

    CONSTRAINT "SchoolReport_pkey" PRIMARY KEY ("id")
);
