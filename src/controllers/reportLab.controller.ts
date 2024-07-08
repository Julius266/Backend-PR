import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

export const createReport = async (req: Request, res: Response) => {
  try {
    const {
      report_name,
      school,
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

    const report = await prisma.schoolReport.create({
      data: {
        report_name,
        school,
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
      },
    });

    res.status(201).json(report);
  } catch (error) {
    res.status(500).json({ error: 'Error creating report' });
  }
};

export const getReports = async (req: Request, res: Response) => {
  try {
    const reports = await prisma.schoolReport.findMany();
    res.status(200).json(reports);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching reports' });
  }
};
