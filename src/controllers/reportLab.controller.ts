import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
// import bcrypt from 'bcrypt';

const prisma = new PrismaClient();





// GET all school reports
export const getAllSchoolReports = async (req: Request, res: Response): Promise<void> => {
    try {
      const allReports = await prisma.schoolReport.findMany();
      res.status(200).json({ data: allReports });
    } catch (error) {
      console.error("Error fetching school reports:", error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
};

// POST /school-reports
export const createSchoolReport = async (req: Request, res: Response): Promise<void> => {
    const {
      school,
      report_name,
      date,
      course,
      subject,
      student,
      title,
      objective,
      materials,
      procedure,
      dataResults,
      analysis,
      conclusions,
      references
    } = req.body;
  
    try {
      const newSchoolReport = await prisma.schoolReport.create({
        data: {
          school,
          report_name,
          date: new Date(date),
          course,
          subject,
          student,
          title,
          objective,
          materials,
          procedure,
          dataResults,
          analysis,
          conclusions,
          references
        }
      });
      res.status(201).json({ data: newSchoolReport });
    } catch (error) {
      console.error("Error creating school report:", error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
