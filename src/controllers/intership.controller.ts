import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
// import bcrypt from 'bcrypt';

const prisma = new PrismaClient();





// getAllInterships
export const getAllInternshipReports = async (req: Request, res: Response): Promise<void> => {
  try {
    const allReports = await prisma.internshipReport.findMany();
    res.status(200).json({ data: allReports });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// POST /interships
export const createInternshipReport = async (req: Request, res: Response): Promise<void> => {
    const {
      student_name,
      report_name,
      student_year,
      internship_period,
      company_name,
      company_address,
      company_phone,
      company_fax,
      company_email,
      supervisor_name,
      supervisor_position,
      supervisor_profession,
      supervisor_phone,
      supervisor_fax,
      supervisor_email,
      company_description,
      company_location,
      company_access,
      company_resources,
      company_economic_activity,
      company_organizational_structure,
      useful_subjects,
      missing_topics,
      week_1,
      week_2,
      week_3,
      week_4,
      week_5,
      week_6,
      week_7,
      department_name,
      objectives,
      specific_functions
    } = req.body;
  
    try {
      const newInternship = await prisma.internshipReport.create({
        data: {
          student_name,
          report_name,
          student_year,
          internship_period: new Date(internship_period),
          company_name,
          company_address,
          company_phone,
          company_fax,
          company_email,
          supervisor_name,
          supervisor_position,
          supervisor_profession,
          supervisor_phone,
          supervisor_fax,
          supervisor_email,
          company_description,
          company_location,
          company_access,
          company_resources,
          company_economic_activity,
          company_organizational_structure,
          useful_subjects,
          missing_topics,
          week_1,
          week_2,
          week_3,
          week_4,
          week_5,
          week_6,
          week_7,
          department_name,
          objectives,
          specific_functions
        }
      });
      res.status(201).json({ data: newInternship });
    } catch (error) {
      console.error("Error creating internship report:", error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

 


