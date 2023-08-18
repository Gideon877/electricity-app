
import { toMatchImageSnapshot } from 'jest-image-snapshot';

expect.extend({ toMatchImageSnapshot });

const timeout = 5000;

describe(
	'/ (Home Page)',
	() => {
		let page;
		beforeAll(async () => {
			page = await globalThis.__BROWSER_GLOBAL__.newPage();
			await page.goto(process.env.APP_URL || 'http://localhost:5173/');
		}, timeout);


		it('should display the title', async () => {
			const title = await page.title();
			expect(title).toBe('Electricity App');
		});

		it('should match the screenshot of the page', async () => {
			const screenshot = await page.screenshot();
			expect(screenshot).toMatchImageSnapshot();
		});

		it('should have the "Top-up electricity" section', async () => {
			const section = await page.$('.section h2');
			const text = await page.evaluate(section => section.textContent, section);
			expect(text).toBe('Top-up electricity');
		});

		it('should have radio buttons for top-up amounts', async () => {
			const radioButtons = await page.$$('.topup');
			expect(radioButtons.length).toBe(4);
		});

		it('should have radio buttons for usage amounts', async () => {
			const radioButtons = await page.$$('.usage');
			expect(radioButtons.length).toBe(4);
		});

		it('should click radio button with id of ten, click buy button, and check unitsAvailable to be 7', async () => {
			await page.click('#ten');
			await page.click('.topupNow');
			await page.waitForTimeout(1000);

			const unitsAvailable = await page.evaluate(() => {
				const unitsAvailableElement = document.querySelector('.unitsAvailable');
				return unitsAvailableElement.textContent;
			});

			expect(unitsAvailable).toBe('7');
		});

		it('should click radio button with id of twenty, click buy button, and check unitsAvailable to be 21', async () => {
			await page.click('#twenty');
			await page.click('.topupNow');
			await page.waitForTimeout(1000);

			const unitsAvailable = await page.evaluate(() => {
				const unitsAvailableElement = document.querySelector('.unitsAvailable');
				return unitsAvailableElement.textContent;
			});

			expect(unitsAvailable).toBe('21');
		});

		it('should click radio button with id of fifty, click buy button, and check unitsAvailable to be 56', async () => {
			await page.click('#fifty');
			await page.click('.topupNow');
			await page.waitForTimeout(1000);

			const unitsAvailable = await page.evaluate(() => {
				const unitsAvailableElement = document.querySelector('.unitsAvailable');
				return unitsAvailableElement.textContent;
			});
			expect(unitsAvailable).toBe('56');
		});

		it('should click radio button with id of advance, click buy button, and check unitsAvailable to be 77', async () => {
			await page.click('#advance');
			await page.click('.topupNow');
			await page.waitForTimeout(1000);

			const unitsAvailable = await page.evaluate(() => {
				const unitsAvailableElement = document.querySelector('.unitsAvailable');
				return unitsAvailableElement.textContent;
			});
			expect(unitsAvailable).toBe('77');
		});

		it('should click radio button with id of advance, click buy button, and check unitsAvailable to be 77 as advance is already taken', async () => {
			await page.click('#advance');
			await page.click('.topupNow');
			await page.waitForTimeout(1000);

			const unitsAvailable = await page.evaluate(() => {
				const unitsAvailableElement = document.querySelector('.unitsAvailable');
				return unitsAvailableElement.textContent;
			});
			expect(unitsAvailable).toBe('77');
		});


	},
	timeout,
);