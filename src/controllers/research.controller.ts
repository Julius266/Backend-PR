import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

export const createResearchReport = async (req: Request, res: Response): Promise<void> => {
    const {
        researchTitle,
        researchDate,
        researcher,
        advisor,
        abstract,
        introduction,
        methodology,
        results,
        discussion,
        conclusion,
        references
    } = req.body;

    try {
        const newResearchReport = await prisma.researchReport.create({
            data: {
                researchTitle,
                researchDate: new Date(researchDate),
                researcher,
                advisor,
                abstract,
                introduction,
                methodology,
                results,
                discussion,
                conclusion,
                references
            },
        });

        console.log("Research report created successfully:", newResearchReport);

        const templatePath = path.resolve(__dirname, '../../public/investigation-template.html');
        let template = fs.readFileSync(templatePath, 'utf8');
        template = template.replace('{{researchTitle}}', researchTitle)
                           .replace('{{researchDate}}', researchDate)
                           .replace('{{researcher}}', researcher)
                           .replace('{{advisor}}', advisor)
                           .replace('{{abstract}}', abstract)
                           .replace('{{introduction}}', introduction)
                           .replace('{{methodology}}', methodology)
                           .replace('{{results}}', results)
                           .replace('{{discussion}}', discussion)
                           .replace('{{conclusion}}', conclusion)
                           .replace('{{references}}', references);

        const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'] });
        const page = await browser.newPage();
        await page.setContent(template, { waitUntil: 'networkidle0' });
        const pdfBuffer = await page.pdf({ format: 'A4', timeout: 60000 });

        await browser.close();

        console.log(`PDF for research report "${researchTitle}" generated successfully`);

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename=${researchTitle}.pdf`);
        res.send(pdfBuffer);
    } catch (error) {
        console.error("Error creating research report:", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const getAllResearchReports = async (req: Request, res: Response) => {
    try {
      const reports = await prisma.researchReport.findMany();
      res.status(200).json(reports);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching research reports' });
    }
  };
