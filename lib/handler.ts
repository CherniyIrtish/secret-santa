import { PDFOptions } from "puppeteer";


const puppeteer = require('puppeteer');
const pdfConfig: PDFOptions = {format: 'A4', printBackground: true, displayHeaderFooter: false};
// https://medium.com/@fmoessle/use-html-and-puppeteer-to-create-pdfs-in-node-js-566dbaf9d9ca
const pdfReport = async (files: any, req: any) => {
    const browser = await puppeteer.launch({headless: true});
    const page = await browser.newPage();
    const content = JSON.stringify(files.content);

    await page.setContent(files.template, {waitUntil: ['networkidle0', 'load', 'domcontentloaded']});

    await page.evaluate((content: any) => {
        let jq = document.createElement("script");
        jq.setAttribute('type', 'text/javascript');
        jq.innerHTML = 'window.template(' + content + ');';
        document.body.appendChild(jq);
    }, content);

    if (req.get('host') === '127.0.0.1:3000') {
        // save a pdf file
        await page.pdf({...pdfConfig, format: 'A4', path: 'files/invoice.pdf'});
    }

    return await page.pdf(pdfConfig);
}

export { pdfReport }
