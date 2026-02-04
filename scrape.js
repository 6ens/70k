const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.goto(
    'https://www.frielingsdorf-datenservice.de/anmeldung/2026/marsch_mit_aussicht/',
    { waitUntil: 'networkidle' }
  );

  const selector = '#divRRRegStart > div.RRRegStart_Registrations > div > div > div > div:nth-child(2) > div:nth-child(3)';

  await page.waitForSelector(selector, { timeout: 15000 });

  const text = await page.locator(selector).textContent();

  const match = text.match(/\d+/);
  const zahl = match ? match[0] : null;

  console.log('Rohtext:', text.trim());
  console.log('Extrahierte Zahl:', zahl);

  await browser.close();
})();
