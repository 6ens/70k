const { chromium } = require('playwright');

(async () => {
  const webhook = process.env.DISCORD_WEBHOOK;
  if (!webhook) {
    throw new Error('DISCORD_WEBHOOK fehlt');
  }

  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.goto(
    'https://www.frielingsdorf-datenservice.de/anmeldung/2026/marsch_mit_aussicht/',
    { waitUntil: 'networkidle' }
  );

  const selector =
    '#divRRRegStart > div.RRRegStart_Registrations > div > div > div > div:nth-child(2) > div:nth-child(3)';

  await page.waitForSelector(selector, { timeout: 15000 });

  const text = await page.locator(selector).textContent();
  const match = text.match(/\d+/);
  const zahl = match ? match[0] : 'unbekannt';

  const message = `💥 **MARSCH MIT AUSSICHT 2026** 💥
Bruder hör zu:

📊 Lagebericht:
${text.trim()}

🔢 Noch **${zahl} Plätze** am Start

🚬 Keine Panik, kein Stress,
Bot war da, Zahlen gecheckt.

⏰ ${new Date().toLocaleString('de-DE')}
💸 Scrape läuft täglich, so wie ich.`;


  await fetch(webhook, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content: message })
  });

  await browser.close();
})();
