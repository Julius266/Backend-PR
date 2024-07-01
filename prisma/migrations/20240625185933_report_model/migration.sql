-- CreateTable
CREATE TABLE "InternshipReport" (
    "id" SERIAL NOT NULL,
    "student_name" TEXT NOT NULL,
    "student_year" TEXT NOT NULL,
    "internship_period" TIMESTAMP(3) NOT NULL,
    "company_name" TEXT NOT NULL,
    "company_address" TEXT NOT NULL,
    "company_phone" TEXT NOT NULL,
    "company_fax" TEXT NOT NULL,
    "company_email" TEXT NOT NULL,
    "supervisor_name" TEXT NOT NULL,
    "supervisor_position" TEXT NOT NULL,
    "supervisor_profession" TEXT NOT NULL,
    "supervisor_phone" TEXT NOT NULL,
    "supervisor_fax" TEXT NOT NULL,
    "supervisor_email" TEXT NOT NULL,
    "company_description" TEXT NOT NULL,
    "company_location" TEXT NOT NULL,
    "company_access" TEXT NOT NULL,
    "company_resources" TEXT NOT NULL,
    "company_economic_activity" TEXT NOT NULL,
    "company_organizational_structure" TEXT NOT NULL,
    "useful_subjects" TEXT NOT NULL,
    "missing_topics" TEXT NOT NULL,
    "week_1" TEXT NOT NULL,
    "week_2" TEXT NOT NULL,
    "week_3" TEXT NOT NULL,
    "week_4" TEXT NOT NULL,
    "week_5" TEXT NOT NULL,
    "week_6" TEXT NOT NULL,
    "week_7" TEXT NOT NULL,
    "department_name" TEXT NOT NULL,
    "objectives" TEXT NOT NULL,
    "specific_functions" TEXT NOT NULL,

    CONSTRAINT "InternshipReport_pkey" PRIMARY KEY ("id")
);