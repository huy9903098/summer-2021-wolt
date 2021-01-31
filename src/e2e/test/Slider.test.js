describe('App tests', () => {
  let page = global.page;

  test('Loads all elements', async () => {
    await page.waitForSelector('.discovery-container');

    await page.click('.button.left');

    await page.waitFor(500);
    await page.click('.button.left');

    await page.waitFor(500);
    await page.waitForFunction(
      'document.querySelector(".carousel").innerText.includes("Real Pizza Factory")'
    );
  });
});
