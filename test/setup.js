import { promises as fs } from 'fs';
import os from 'os';
import path from 'path';
import puppeteer from 'puppeteer';

const DIR = path.join(os.tmpdir(), 'jest_puppeteer_global_setup');

export default async function setupPuppeteer() {
    const browser = await puppeteer.launch();
    // store the browser instance to teardown later
    // this global is available in teardown but not TestEnvironments
    globalThis.__BROWSER_GLOBAL__ = browser;

    // use file system to expose wsEndpoint for TestEnvironments
    await fs.mkdir(DIR, { recursive: true });
    await fs.writeFile(path.join(DIR, 'wsEndpoint'), browser.wsEndpoint());
}
