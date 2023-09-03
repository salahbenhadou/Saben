const { Builder, By, Key } = require('selenium-webdriver');
const safari = require('selenium-webdriver/safari');
const MAX_REFRESH_COUNT = 600; // Number of times to refresh (adjust as needed)
const REFRESH_INTERVAL_MS = 60000; // Refresh interval in milliseconds (60 seconds)

async function runBot() {
  // Set up Safari WebDriver
  const options = new safari.Options();
  const driver = await new Builder().forBrowser('safari').setSafariOptions(options).build();

  try {
    // Navigate to the initial URL
    await driver.get('https://visa-de.tlscontact.com/appointment/ma/maRBA2de/1969958'); // Replace with your target URL

    // Main automation loop
    let refreshCount = 0;
    while (refreshCount < MAX_REFRESH_COUNT) {
      // Find and click the first available slot (example selector)
      const slotButton = await driver.findElement(By.css('.tls-time-unit.-available'));
      await slotButton.click();

      // Perform other actions as needed (e.g., fill out forms, confirm appointments)

      // Refresh the page to check for more slots
      await driver.navigate().refresh();

      // Wait for a moment before checking again (adjust as needed)
      await driver.sleep(REFRESH_INTERVAL_MS);

      refreshCount++;
    }
  } catch (error) {
    console.error('An error occurred:', error);
  } finally {
    // Close the WebDriver when done
    await driver.quit();
  }
}

// Run the bot
runBot();
