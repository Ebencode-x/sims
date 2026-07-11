// Centralized contact + project links so they only need to be updated
// in one place.

const CONTACT = {
    email: "ebenrm01@gmail.com",
    github: "https://github.com/Ebencode-x/sims"
};

const ICONS = {
    mail: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 6l10 7 10-7"/></svg>`,
    github: `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.58 2 12.26c0 4.54 2.87 8.39 6.84 9.75.5.1.68-.22.68-.5 0-.24-.01-.87-.01-1.71-2.78.62-3.37-1.37-3.37-1.37-.46-1.19-1.11-1.51-1.11-1.51-.91-.63.07-.62.07-.62 1 .07 1.53 1.05 1.53 1.05.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.05 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.31.1-2.72 0 0 .84-.28 2.75 1.05a9.3 9.3 0 0 1 5 0c1.91-1.33 2.75-1.05 2.75-1.05.55 1.41.2 2.46.1 2.72.64.72 1.03 1.63 1.03 2.75 0 3.92-2.34 4.78-4.57 5.04.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .28.18.61.69.5A10.02 10.02 0 0 0 22 12.26C22 6.58 17.52 2 12 2z"/></svg>`
};

function renderFooterHTML() {
    return `
        <div class="footer-inner">
            <div class="footer-social">
                <a href="mailto:${CONTACT.email}" class="social-link" title="Email">
                    ${ICONS.mail}<span>${CONTACT.email}</span>
                </a>
                <a href="${CONTACT.github}" target="_blank" rel="noopener" class="social-link" title="Source on GitHub">
                    ${ICONS.github}<span>Source on GitHub</span>
                </a>
            </div>
            <div class="footer-copy">
                Smart Inventory Management System &middot; Software Engineering Final Project &middot; MUST
            </div>
        </div>
    `;
}
