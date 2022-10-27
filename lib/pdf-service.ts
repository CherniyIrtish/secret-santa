export interface PdfService {
    getPdf(template: string, content: string): Promise<Buffer>;
}

import chromium = require('chrome-aws-lambda');
import puppeteer = require('puppeteer-core');

export class ChromePdfService implements PdfService {
    public async getPdf(template: string, content: string): Promise<Buffer> {

        let browser = null;
        try {
            browser = await puppeteer.launch({
                args: chromium.args,
                defaultViewport: chromium.defaultViewport,
                executablePath: await chromium.executablePath,
                headless: chromium.headless,
            });

            const page = await browser.newPage();

            await page.setContent(template, {
                waitUntil: ['networkidle0', 'load', 'domcontentloaded'],
            });

            let data = JSON.stringify(content);

            await page.evaluate((data) => {
                let jq = document.createElement("script");
                jq.setAttribute('type','text/javascript');
                jq.innerHTML = 'window.template(' + data + ');';
                document.body.appendChild(jq);

            }, data);


            const result = await page.pdf({
                format: 'A4',
                printBackground: true,
                displayHeaderFooter: false
            });
            console.log(`buffer size = ${result.length}`);
            return result;
        } catch (error) {
            throw new Error(`Failed to PDF. Error: ${JSON.stringify(error)}`);
        } finally {
            if (browser !== null) {
                await browser.close();
            }
        }
    }
}
