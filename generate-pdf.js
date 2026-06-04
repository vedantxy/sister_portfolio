const puppeteer = require('puppeteer-core');
const path = require('path');

(async () => {
  try {
    console.log('Launching browser...');
    const browser = await puppeteer.launch({
      executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
      headless: true
    });
    const page = await browser.newPage();
    
    // Set desktop-like viewport
    await page.setViewport({ width: 1200, height: 1600, deviceScaleFactor: 2 });

    const filePath = path.resolve(__dirname, 'index.html');
    console.log(`Loading local file: ${filePath}`);
    await page.goto('file://' + filePath, { waitUntil: 'networkidle0' });

    console.log('Generating PDF...');
    await page.pdf({
      path: 'Priyaben_Patel_Portfolio.pdf',
      format: 'A4',
      printBackground: true,
      margin: {
        top: '12mm',
        bottom: '12mm',
        left: '12mm',
        right: '12mm'
      }
    });

    await browser.close();
    console.log('PDF generated successfully at Priyaben_Patel_Portfolio.pdf');
  } catch (error) {
    console.error('Error generating PDF:', error);
    process.exit(1);
  }
})();
