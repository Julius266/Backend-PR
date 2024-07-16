import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

export const createReport = async (req: Request, res: Response) => {
  try {
    console.log("Solicitud recibida en el servidor:", req.body);
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

    const report = await prisma.reportLab.create({
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

    console.log("Reporte creado en la base de datos:", report);

    const templatePath = path.resolve(__dirname, '../../public/informe-1.html');
    let template = fs.readFileSync(templatePath, 'utf8');
    template = template.replace('{{title}}', title)
                       .replace('{{school}}', school)
                       .replace('{{date}}', date)
                       .replace('{{course}}', course)
                       .replace('{{subject}}', subject)
                       .replace('{{student}}', student)
                       .replace('{{objective}}', objective)
                       .replace('{{materials}}', materials)
                       .replace('{{procedure}}', procedure)
                       .replace('{{dataResults}}', dataResults)
                       .replace('{{analysis}}', analysis)
                       .replace('{{conclusions}}', conclusions)
                       .replace('{{references}}', references);

    const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'] });
    const page = await browser.newPage();
    await page.setContent(template, { waitUntil: 'networkidle0' });
    const pdfBuffer = await page.pdf({ format: 'A4', timeout: 60000 });

    await browser.close();

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=${report_name}.pdf`);
    res.send(pdfBuffer);
  } catch (error) {
    console.error('Error creating report:', error);
    res.status(500).json({ error: 'Error creating report' });
  }
};
export const getAllReportLabs = async (req: Request, res: Response) => {
  try {
    const reportLabs = await prisma.reportLab.findMany();
    res.status(200).json(reportLabs);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching report labs' });
  }
};