import { toMatchImageSnapshot } from 'jest-image-snapshot';

expect.extend({ toMatchImageSnapshot });

const timeout = 5000;

describe(
    '/ (Home Page)',
    () => {
        let page;
        beforeAll(async () => {
            page = await globalThis.__BROWSER_GLOBAL__.newPage();
            await page.goto('http://localhost:5173/');
        }, timeout);


        it('should display the title', async () => {
			const title = await page.title();
			expect(title).toBe('Electricity App');
		});

        it('should match the screenshot of the page', async () => {
			const screenshot = await page.screenshot();
			expect(screenshot).toMatchImageSnapshot();
		});

        it('should click radio button with id of fifty, click buy button, and check unitsAvailable to be 56', async () => {
			await page.click('#fifty');
			await page.click('.topupNow');
			await page.waitForTimeout(1000);

			const unitsAvailable = await page.evaluate(() => {
				const unitsAvailableElement = document.querySelector('.unitsAvailable');
				return unitsAvailableElement.textContent;
			});
			expect(unitsAvailable).toBe('35');
		});

        it('should click radio button with id of stove, click use button, and check unitAvailable to be 25', async ()=> {
            await page.click('#stove');
			await page.click('.useNow');
			await page.waitForTimeout(1000);

			const unitsAvailable = await page.evaluate(() => {
				const unitsAvailableElement = document.querySelector('.unitsAvailable');
				return unitsAvailableElement.textContent;
			});
			expect(unitsAvailable).toBe('25');
        });

        it('should click radio button with id of tv, click use button, and check unitAvailable to be 22', async ()=> {
            await page.click('#tv');
			await page.click('.useNow');
			await page.waitForTimeout(1000);

			const unitsAvailable = await page.evaluate(() => {
				const unitsAvailableElement = document.querySelector('.unitsAvailable');
				return unitsAvailableElement.textContent;
			});
			expect(unitsAvailable).toBe('22');
        });

        it('should click radio button with id of fridge, click use button, and check unitAvailable to be 9', async ()=> {
            await page.click('#fridge');
			await page.click('.useNow');
			await page.waitForTimeout(1000);

			const unitsAvailable = await page.evaluate(() => {
				const unitsAvailableElement = document.querySelector('.unitsAvailable');
				return unitsAvailableElement.textContent;
			});
			expect(unitsAvailable).toBe('9');
        });

        it('should click radio button with id of kettle, click use button, and check unitAvailable to be 4', async ()=> {
            await page.click('#kettle');
			await page.click('.useNow');
			await page.waitForTimeout(1000);

			const unitsAvailable = await page.evaluate(() => {
				const unitsAvailableElement = document.querySelector('.unitsAvailable');
				return unitsAvailableElement.textContent;
			});
			expect(unitsAvailable).toBe('4');
        });

        it('should top up first with an advance, click the kettle button and use it, and check unitAvailable to be 20', async ()=> {
            await page.click('#advance');
			await page.click('.topupNow');
			await page.waitForTimeout(1000);

            await page.click('#kettle');
			await page.click('.useNow');
			await page.waitForTimeout(1000);

			const unitsAvailable = await page.evaluate(() => {
				const unitsAvailableElement = document.querySelector('.unitsAvailable');
				return unitsAvailableElement.textContent;
			});
			expect(unitsAvailable).toBe('20');
        });


    },
    timeout,
);