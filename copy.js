/**
 * A Node.js script to copy a static website by downloading its HTML and all linked assets.
 * It uses the 'axios' and 'cheerio' libraries, so make sure to install them first:
 * npm install axios cheerio
 */

const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");
const path = require("path");
const url = require("url");

// The target URL of the website to be copied.
const targetUrl = "http://jellydemos.com/html/murdock/index.html";

// The directory where the copied website will be saved.
const outputDir = "./copied-website";

/**
 * Main function to fetch the website, download assets, and save the modified HTML.
 * @param {string} targetUrl The URL of the website to copy.
 */
async function copyWebsite(targetUrl) {
  try {
    console.log(`Starting to copy website from: ${targetUrl}`);

    // Create the main output directory if it doesn't exist.
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
      console.log(`Created directory: ${outputDir}`);
    }

    // 1. Fetch the HTML content of the target URL.
    const response = await axios.get(targetUrl);
    const html = response.data;
    const $ = cheerio.load(html);

    // Get the base URL to resolve relative paths.
    const absoluteBaseUrl =
      url.parse(targetUrl).protocol + "//" + url.parse(targetUrl).host;

    // An array to hold promises for asset downloads.
    const downloadPromises = [];
    const assets = new Set();

    // 2. Find and process all asset tags (CSS, JS, images).
    $('link[rel="stylesheet"], script[src], img[src]').each((i, element) => {
      const attr = $(element).is("link") ? "href" : "src";
      let assetUrl = $(element).attr(attr);

      // Skip if the attribute is missing or empty.
      if (!assetUrl) {
        return;
      }

      // Resolve the full URL of the asset.
      if (assetUrl.startsWith("//")) {
        assetUrl = "http:" + assetUrl;
      } else if (!assetUrl.startsWith("http")) {
        assetUrl = url.resolve(targetUrl, assetUrl);
      }

      // Only download assets from the same domain to avoid external links.
      if (assetUrl.startsWith(absoluteBaseUrl)) {
        assets.add({
          originalUrl: assetUrl,
          element: element,
          attr: attr,
        });
      }
    });

    console.log(`Found ${assets.size} assets to download.`);

    // 3. Download and save each asset.
    for (const asset of assets) {
      const parsedUrl = url.parse(asset.originalUrl);
      const assetPath = path.join(outputDir, parsedUrl.pathname);
      const assetDir = path.dirname(assetPath);

      // Create subdirectories for assets if they don't exist.
      if (!fs.existsSync(assetDir)) {
        fs.mkdirSync(assetDir, { recursive: true });
      }

      // Replace the original URL in the HTML with the new local path.
      const localPath = path.relative(outputDir, assetPath);
      $(asset.element).attr(asset.attr, localPath);

      // Create a promise to handle the download.
      downloadPromises.push(
        axios
          .get(asset.originalUrl, { responseType: "stream" })
          .then((res) => {
            const writer = fs.createWriteStream(assetPath);
            res.data.pipe(writer);
            return new Promise((resolve, reject) => {
              writer.on("finish", () => {
                console.log(`Downloaded: ${asset.originalUrl}`);
                resolve();
              });
              writer.on("error", reject);
            });
          })
          .catch((error) => {
            console.error(
              `Error downloading ${asset.originalUrl}: ${error.message}`
            );
          })
      );
    }

    // Wait for all download promises to resolve.
    await Promise.all(downloadPromises);

    // 4. Save the modified HTML file.
    const modifiedHtml = $.html();
    const htmlFilePath = path.join(outputDir, "index.html");
    fs.writeFileSync(htmlFilePath, modifiedHtml);

    console.log(
      `\nSuccessfully copied the website to the '${outputDir}' directory.`
    );
    console.log(`Open '${htmlFilePath}' to view the copied site.`);
  } catch (error) {
    console.error("An error occurred:", error.message);
  }
}

// Call the main function to start the process.
copyWebsite(targetUrl);
