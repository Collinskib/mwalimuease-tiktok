// Screenshot helper: node shot.mjs <seek> <out.png>
import puppeteer from "puppeteer-core";

const seek = process.argv[2] || "0.5";
const out = process.argv[3] || "/tmp/3dshots/s.png";
const CHROME = "/home/collins/Documents/mwalimuease-tiktok/node_modules/.remotion/chrome-headless-shell/linux64/chrome-headless-shell-linux64/chrome-headless-shell";

const browser = await puppeteer.launch({
  executablePath: CHROME,
  args: ["--no-sandbox", "--disable-gpu-sandbox", "--use-gl=swiftshader",
    "--enable-unsafe-swiftshader", "--hide-scrollbars"],
});
const page = await browser.newPage();
await page.setViewport({width: 540, height: 960, deviceScaleFactor: 1});
const errors = [];
page.on("pageerror", e => errors.push("PAGEERR: " + e.message));
page.on("console", m => { if (m.type() === "error") errors.push("CONSOLE: " + m.text()); });
await page.goto(`http://localhost:8741/index.html?seek=${seek}`,
  {waitUntil: "domcontentloaded", timeout: 30000});
await new Promise(r => setTimeout(r, 9000));
await page.screenshot({path: out});
if (errors.length) console.log(errors.slice(0, 8).join("\n"));
await browser.close();
console.log("saved", out);
