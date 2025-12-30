# Awesome Archive

A CLI tool to backup all links in your Awesome List to the Wayback Machine (Internet Archive).

## Features

-   **Automatic Preservation**: Ensures your list's resources are saved for the future.
-   **Smart Skipping**: Skips links that are already from `web.archive.org`.
-   **Rate Limiting**: Includes built-in delays to respect Internet Archive's API.
-   **Progress Tracking**: Detailed console output of preservation status.

## Installation

```bash
npm install -g awesome-archive-cli
```

## Usage

Backup links from your README:

```bash
awesome-archive README.md
```

Options:
- `-v, --verbose`: Show detailed logs.
- `-d, --delay <ms>`: Delay between requests in ms (default: 5000).

## Note

This tool submits URLs to the Internet Archive's "Save Page Now" feature. Please use responsibly and do not hammer their servers.

## Contact

Developed for Anunzio International by Anzul Aqeel.
Contact +971545822608 or +971585515742.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.


---
### 🔗 Part of the "Ultimate Utility Toolkit"
This tool is part of the **[Anunzio International Utility Toolkit](https://github.com/anzulaqeel-anunzio/ultimate-utility-toolkit)**.
Check out the full collection of **180+ developer tools, scripts, and templates** in the master repository.

Developed for Anunzio International by Anzul Aqeel.
