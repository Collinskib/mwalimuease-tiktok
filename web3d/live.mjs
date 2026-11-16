import puppeteer from "puppeteer-core";
const CHROME = "/home/collins/Documents/mwalimuease-tiktok/node_modules/.remotion/chrome-headless-shell/linux64/chrome-headless-shell-linux64/chrome-headless-shell";
const browser = await puppeteer.launch({
  executablePath: CHROME,
  args: ["--no-sandbox", "--use-gl=swiftshader", "--enable-unsafe-swiftshader",
    "--autoplay-policy=no-user-gesture-required", "--mute-audio", "--hide-scrollbars"],
});
const page = await browser.newPage();
await page.setViewport({width: 540, height: 960});
const errs = [];
page.on("pageerror", e => errs.push("PAGEERR: " + e.message));
for (let i = 0; i < 3; i++) {
  try { await page.goto("http://localhost:8741/index.html", {waitUntil: "domcontentloaded", timeout: 60000}); break; }
  catch (e) { console.log("goto retry", i, e.message); }
}
await page.waitForFunction("window.__ready === true", {timeout: 60000});
await new Promise(r => setTimeout(r, 1000));
await page.click("#play");
// wait until play overlay fades (audio loaded + timeline started)
await page.waitForFunction("getComputedStyle(document.getElementById('play')).opacity === '0' || document.getElementById('play').style.visibility === 'hidden'", {timeout: 90000}).catch(e => console.log("fade wait:", e.message));
for (const [ms, name] of [[9000, "live_9"], [6000, "live_15"], [7000, "live_22"]]) {
  await new Promise(r => setTimeout(r, ms));
  await page.screenshot({path: `/tmp/3dshots/${name}.png`});
}
const st = await page.evaluate(() => window.__tl_time || "n/a");
console.log("errors:", errs.slice(0, 6).join("\n") || "none");
await browser.close();
console.log("done", st);
