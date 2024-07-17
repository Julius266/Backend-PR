import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

type ReportData = {
    [key: string]: any;
};

const getReportData = async (reportType: string, reportId: number): Promise<ReportData | null> => {
    let reportData;
    switch (reportType) {
        case 'ReportLab':
            reportData = await prisma.reportLab.findUnique({
                where: { id: reportId }
            });
            break;
        case 'InternshipReport':
            reportData = await prisma.internshipReport.findUnique({
                where: { id: reportId }
            });
            break;
        case 'EssayReport':
            reportData = await prisma.essayReport.findUnique({
                where: { id: reportId }
            });
            break;
        case 'ResearchReport':
            reportData = await prisma.researchReport.findUnique({
                where: { id: reportId }
            });
            break;
        default:
            throw new Error('Unknown report type');
    }
    return reportData;
};

const getTemplatePath = (reportType: string): string => {
    switch (reportType) {
        case 'ReportLab':
            return path.resolve(__dirname, '../../public/informeLab-template.html');
        case 'InternshipReport':
            return path.resolve(__dirname, '../../public/internship-template.html');
        case 'EssayReport':
            return path.resolve(__dirname, '../../public/essay-template.html');
        case 'ResearchReport':
            return path.resolve(__dirname, '../../public/investigation-template.html');
        default:
            throw new Error('Unknown report type');
    }
};

export const downloadReportPDF = async (req: Request, res: Response): Promise<void> => {
    const { reportType, reportId } = req.params;

    try {
        const reportData = await getReportData(reportType, parseInt(reportId, 10));
        if (!reportData) {
            res.status(404).json({ error: 'Report not found' });
            return;
        }

        const templatePath = getTemplatePath(reportType);
        let template = fs.readFileSync(templatePath, 'utf8');

        for (const key in reportData) {
            if (Object.prototype.hasOwnProperty.call(reportData, key)) {
                template = template.replace(new RegExp(`{{${key}}}`, 'g'), reportData[key] as string);
            }
        }

        const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'] });
        const page = await browser.newPage();
        await page.setContent(template, { waitUntil: 'networkidle0' });
        const pdfBuffer = await page.pdf({ format: 'A4', timeout: 60000 });

        await browser.close();

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename=${reportType}-${reportId}.pdf`);
        res.send(pdfBuffer);
    } catch (error) {
        console.error("Error generating PDF:", error);
        res.status(500).json({ error: 'Error generating PDF' });
    }
};
