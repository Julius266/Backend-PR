import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

export const createEssayReport = async (req: Request, res: Response): Promise<void> => {
    const {
        title,
        author,
        course,
        instructor,
        dueDate,
        abstract,
        introduction,
        body,
        conclusion,
        references
    } = req.body;

    try {
        const newEssayReport = await prisma.essayReport.create({
            data: {
                title,
                author,
                course,
                instructor,
                dueDate: new Date(dueDate),
                abstract,
                introduction,
                body,
                conclusion,
                references
            },
        });

        console.log("Essay report created successfully:", newEssayReport);

        const templatePath = path.resolve(__dirname, '../../public/essay-template.html');
        let template = fs.readFileSync(templatePath, 'utf8');
        template = template.replace('{{title}}', title)
                           .replace('{{author}}', author)
                           .replace('{{course}}', course)
                           .replace('{{instructor}}', instructor)
                           .replace('{{dueDate}}', dueDate)
                           .replace('{{abstract}}', abstract)
                           .replace('{{introduction}}', introduction)
                           .replace('{{body}}', body)
                           .replace('{{conclusion}}', conclusion)
                           .replace('{{references}}', references);

        const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'] });
        const page = await browser.newPage();
        await page.setContent(template, { waitUntil: 'networkidle0' });
        const pdfBuffer = await page.pdf({ format: 'A4', timeout: 60000 });

        await browser.close();

        console.log(`PDF for essay report "${title}" generated successfully`);

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename=${title}.pdf`);
        res.send(pdfBuffer);
    } catch (error) {
        console.error("Error creating essay report:", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const getAllEssayReports = async (req: Request, res: Response): Promise<void> => {
    try {
        const allReports = await prisma.essayReport.findMany();
        res.status(200).json({ data: allReports });
    } catch (e) {
        console.log(e);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
