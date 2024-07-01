import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

const templatePath = path.join(__dirname, '..', '..', 'public', 'informe-1.html');

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
        const parsedDate = new Date(date);
        if (isNaN(parsedDate.getTime())) {
            throw new Error('Invalid date format');
        }

        const newSchoolReport = await prisma.schoolReport.create({
            data: {
                school,
                date: parsedDate,
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

        // Verificar si el archivo de plantilla existe
        if (!fs.existsSync(templatePath)) {
            res.status(500).json({ error: 'Template file not found' });
            return;
        }

        // Leer la plantilla HTML
        let htmlTemplate = fs.readFileSync(templatePath, 'utf8');

        // Reemplazar los marcadores en la plantilla HTML con los datos del formulario
        htmlTemplate = htmlTemplate.replace('{{school}}', school)
            .replace('{{date}}', date)
            .replace('{{course}}', course)
            .replace('{{subject}}', subject)
            .replace('{{student}}', student)
            .replace('{{title}}', title)
            .replace('{{objective}}', objective)
            .replace('{{materials}}', materials)
            .replace('{{procedure}}', procedure)
            .replace('{{dataResults}}', dataResults)
            .replace('{{analysis}}', analysis)
            .replace('{{conclusions}}', conclusions)
            .replace('{{references}}', references);

        // Configuración de Puppeteer con Microsoft Edge
        const browser = await puppeteer.launch({
            executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe', // Ruta al ejecutable de Edge
            timeout: 60000 // Tiempo de espera aumentado a 60 segundos
        });

        const page = await browser.newPage();
        await page.setContent(htmlTemplate, { waitUntil: 'networkidle0' });
        const pdfBuffer = await page.pdf({ format: 'A4' });

        await browser.close();

        res.setHeader('Content-disposition', 'attachment; filename=reporte.pdf');
        res.setHeader('Content-type', 'application/pdf');
        res.send(pdfBuffer);

    } catch (error: unknown) {
        console.error("Error creating school report:", error);
        if (error instanceof Error) {
            console.error("Detalles del error:", error.stack);
            res.status(500).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
};