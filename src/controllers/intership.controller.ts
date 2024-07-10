import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

export const createInternshipReport = async (req: Request, res: Response): Promise<void> => {
    const {
        report_name,
        student_name,
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
                report_name,
                student_name,
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
            },
        });

        const templatePath = path.resolve(__dirname, '../../public/internship-template.html');
        let template = fs.readFileSync(templatePath, 'utf8');
        template = template.replace('{{report_name}}', report_name)
                           .replace('{{student_name}}', student_name)
                           .replace('{{student_year}}', student_year)
                           .replace('{{internship_period}}', internship_period)
                           .replace('{{company_name}}', company_name)
                           .replace('{{company_address}}', company_address)
                           .replace('{{company_phone}}', company_phone)
                           .replace('{{company_fax}}', company_fax)
                           .replace('{{company_email}}', company_email)
                           .replace('{{supervisor_name}}', supervisor_name)
                           .replace('{{supervisor_position}}', supervisor_position)
                           .replace('{{supervisor_profession}}', supervisor_profession)
                           .replace('{{supervisor_phone}}', supervisor_phone)
                           .replace('{{supervisor_fax}}', supervisor_fax)
                           .replace('{{supervisor_email}}', supervisor_email)
                           .replace('{{company_description}}', company_description)
                           .replace('{{company_location}}', company_location)
                           .replace('{{company_access}}', company_access)
                           .replace('{{company_resources}}', company_resources)
                           .replace('{{company_economic_activity}}', company_economic_activity)
                           .replace('{{company_organizational_structure}}', company_organizational_structure)
                           .replace('{{useful_subjects}}', useful_subjects)
                           .replace('{{missing_topics}}', missing_topics)
                           .replace('{{week_1}}', week_1)
                           .replace('{{week_2}}', week_2)
                           .replace('{{week_3}}', week_3)
                           .replace('{{week_4}}', week_4)
                           .replace('{{week_5}}', week_5)
                           .replace('{{week_6}}', week_6)
                           .replace('{{week_7}}', week_7)
                           .replace('{{department_name}}', department_name)
                           .replace('{{objectives}}', objectives)
                           .replace('{{specific_functions}}', specific_functions);

        const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'] });
        const page = await browser.newPage();
        await page.setContent(template, { waitUntil: 'networkidle0' });
        const pdfBuffer = await page.pdf({ format: 'A4', timeout: 60000 });

        await browser.close();

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename=${report_name}.pdf`);
        res.send(pdfBuffer);
    } catch (error) {
        console.error("Error creating internship report:", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


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
