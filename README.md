# Qualitech Électricité Inc. website

Static bilingual website for Qualitech Électricité Inc., a residential, commercial, and industrial electrical contractor, hosted on GitHub Pages.

## Pages

- `index.html`: French homepage and canonical default page.
- `index-en.html`: English homepage.
- `index-fr.html`: French compatibility page, canonicalized to `/`.
- `404.html`: bilingual not-found page served by GitHub Pages for missing URLs.
- `robots.txt`, `sitemap.xml`, and `llms.txt`: crawl and AI-discovery support files.

## Branding colours

The website uses an approximate palette derived from the company logo and branded vehicle photography.

| Colour | Value | Website role |
| --- | --- | --- |
| Carbon black | `#171B20` | Primary text, footer, and high-contrast details |
| Graphite | `#292E33` | Hero, industrial, and service-area backgrounds |
| Branded orange | `#F36A1D` | Primary calls to action and structural accents |
| Accessible dark orange | `#B84500` | Rating stars and small orange text on light surfaces |
| Electrical amber | `#FFAE00` | Sparks, energized effects, and accents on dark backgrounds |
| Electric blue | `#076BC7` | Links, focus states, borders, and accents on light backgrounds |
| Warm white | `#F5F5F2` | Page, banner, and primary content surfaces |

Supporting interface neutrals are panel grey `#EDEDEA`, line grey `#D4D5D3`, and muted text grey `#5B6064`.

For accessible contrast, orange buttons use carbon text, blue is used for small text on light surfaces, and amber is used for small accents on graphite. These screen colours are photo-derived approximations, not vehicle-wrap production specifications. Official Pantone, CMYK, vinyl-film, or sign-production values should supersede these approximations if they become available.

## Notes

The site is intentionally static so it can remain on GitHub Pages. French is the default language, with a complete English version available from the language switch. Public Google review links open in new tabs. Review excerpts are manually curated from the public Google listing; any future live review feed should use a serverless proxy or static sync process so no Google API key is exposed in browser JavaScript.

An explicit language choice is remembered on the visitor's device with the `qualitech-language` local-storage value. No cookie is created and no language preference is sent to the server. First-time visitors and visitors with unavailable browser storage receive the French default page.

## Online quote request status and limitations

The website's **Request a quote / Demander une soumission** buttons and quote forms are currently hidden while Qualitech chooses a submission method. The bilingual form markup and styling remain in the site for possible reuse, but visitors cannot reach or submit it through the rendered pages. Telephone contact remains available. Clicking the displayed email address copies it to the clipboard and shows a short confirmation toast; without JavaScript, the same element remains a standard `mailto:` link. If clipboard access fails, the script falls back to opening the `mailto:` link.

GitHub Pages publishes static files only. It cannot receive a form submission, store a lead, send an email, protect a mail-server credential, run server-side validation, or process an uploaded photograph. A complete online request workflow therefore needs a separate form backend or serverless endpoint even when the public website continues to be hosted on GitHub Pages.

The current dormant form handler prepares a structured `mailto:` message. It has important limitations and should not be exposed as the primary quote workflow:

- It depends on the visitor having a default email application or browser email-protocol handler configured.
- Visitors who only use browser-based Gmail, Outlook, or another webmail service may see nothing happen after pressing the button.
- The website cannot confirm that the visitor reviewed or sent the prepared email.
- Attachments cannot be added automatically; the visitor must attach photographs in their email application.
- Mobile and desktop operating systems may handle `mailto:` links differently.
- The website receives no delivery status, searchable submission record, spam filtering, retry mechanism, or notification if the handoff fails.

Any future automatic submission option must be assessed for:

- French and English form parity, validation messages, confirmation messages, and customer emails.
- Where customer names, phone numbers, email addresses, project locations, descriptions, and photographs are processed and retained.
- A privacy notice, retention/deletion policy, and any required consent language.
- Spam and abuse controls such as a honeypot, rate limiting, CAPTCHA, file-type checks, and upload-size limits.
- Email deliverability, sender-domain authentication, failure notifications, service quotas, recurring cost, vendor availability, and account ownership.
- Keeping mail-service credentials and API secrets outside the GitHub repository and browser JavaScript.
- A direct telephone and email fallback if the submission service is unavailable.

Possible approaches include a managed static-form backend or a Qualitech-controlled serverless endpoint connected to a transactional email provider. Neither option is part of GitHub Pages itself, and neither should be enabled until the company owner approves the provider, account ownership, data handling, expected cost, and operational responsibility.
