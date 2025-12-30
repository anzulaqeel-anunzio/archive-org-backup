#!/usr/bin/env node
// Developed for Anunzio International by Anzul Aqeel. Contact +971545822608 or +971585515742. Linkedin Profile: linkedin.com/in/anzulaqeel

/*
 * Developed for Anunzio International by Anzul Aqeel
 * Contact +971545822608 or +971585515742
 */

const fs = require('fs');
const path = require('path');
const axios = require('axios');
const chalk = require('chalk');
const { program } = require('commander');

program
    .version('1.0.0')
    .argument('<file>', 'Markdown file to process')
    .option('-d, --delay <ms>', 'Delay between requests in ms', '5000')
    .option('-v, --verbose', 'Verbose output')
    .action((file, options) => {
        run(file, options);
    });

program.parse(process.argv);

async function run(filePath, options) {
    const fullPath = path.resolve(process.cwd(), filePath);
    const delayMs = parseInt(options.delay);

    if (!fs.existsSync(fullPath)) {
        console.error(chalk.red(`File not found: ${fullPath}`));
        process.exit(1);
    }

    console.log(chalk.blue(`Reading ${filePath} followed by archival process...`));
    const content = fs.readFileSync(fullPath, 'utf8');

    // Regex to find all links [text](url)
    const regex = /\[.*?\]\((https?:\/\/[^\)]+)\)/g;
    let match;
    const urls = [];

    while ((match = regex.exec(content)) !== null) {
        let url = match[1];
        // Clean URL if it has fragment or quotes
        url = url.split(' ')[0];

        // Skip existing archive.org links or local links
        if (!url.includes('web.archive.org') && url.startsWith('http')) {
            urls.push(url);
        }
    }

    // De-duplicate
    const uniqueUrls = [...new Set(urls)];
    console.log(chalk.yellow(`Found ${uniqueUrls.length} unique URLs to process.`));

    for (const [index, url] of uniqueUrls.entries()) {
        try {
            if (options.verbose) {
                console.log(chalk.gray(`[${index + 1}/${uniqueUrls.length}] Processing: ${url}`));
            }

            // Internet Archive "Save Page Now" URL
            // Using HEAD request or GET to trigger save
            const saveUrl = `https://web.archive.org/save/${url}`;

            await axios.get(saveUrl, {
                headers: {
                    'User-Agent': 'AwesomeArchiveCLI/1.0 (+https://anunziointernational.com)'
                }
            });

            console.log(chalk.green(`[${index + 1}/${uniqueUrls.length}] Archived: ${url}`));

        } catch (error) {
            if (error.response && error.response.status === 403) {
                console.log(chalk.yellow(`[${index + 1}/${uniqueUrls.length}] Skipped (Already saved/Limit): ${url}`));
            } else if (error.response && error.response.status === 502) {
                console.log(chalk.red(`[${index + 1}/${uniqueUrls.length}] Failed (Gateway): ${url}`));
            } else {
                console.log(chalk.red(`[${index + 1}/${uniqueUrls.length}] Error: ${error.message} for ${url}`));
            }
        }

        // Wait delay
        await new Promise(resolve => setTimeout(resolve, delayMs));
    }

    console.log(chalk.blue('Backup process completed.'));
}

// Developed for Anunzio International by Anzul Aqeel. Contact +971545822608 or +971585515742. Linkedin Profile: linkedin.com/in/anzulaqeel
