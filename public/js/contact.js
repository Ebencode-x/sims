// Centralized contact + project links so they only need to be updated
// in one place.

const CONTACT = {
    email: "sims2025@gmail.com",
    github: "https://github.com/Ebencode-x/sims",
    whatsapp: "255762024012",
    facebook: "#",
    linkedin: "#",
    instagram: "#"
};

const ICONS = {
    mail: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 6l10 7 10-7"/></svg>`,
    github: `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.58 2 12.26c0 4.54 2.87 8.39 6.84 9.75.5.1.68-.22.68-.5 0-.24-.01-.87-.01-1.71-2.78.62-3.37-1.37-3.37-1.37-.46-1.19-1.11-1.51-1.11-1.51-.91-.63.07-.62.07-.62 1 .07 1.53 1.05 1.53 1.05.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.05 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.31.1-2.72 0 0 .84-.28 2.75 1.05a9.3 9.3 0 0 1 5 0c1.91-1.33 2.75-1.05 2.75-1.05.55 1.41.2 2.46.1 2.72.64.72 1.03 1.63 1.03 2.75 0 3.92-2.34 4.78-4.57 5.04.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .28.18.61.69.5A10.02 10.02 0 0 0 22 12.26C22 6.58 17.52 2 12 2z"/></svg>`,
    whatsapp: `<svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.79.47 3.47 1.28 4.93L2 22l5.28-1.38a9.9 9.9 0 0 0 4.76 1.21h.01c5.46 0 9.9-4.45 9.9-9.91 0-2.65-1.03-5.14-2.9-7.01A9.86 9.86 0 0 0 12.04 2zm5.8 14.13c-.24.68-1.4 1.32-1.93 1.4-.5.08-1.12.11-1.81-.11a17 17 0 0 1-1.7-.63c-2.98-1.29-4.92-4.3-5.07-4.5-.15-.2-1.22-1.62-1.22-3.1s.78-2.2 1.06-2.5c.28-.3.6-.37.8-.37h.58c.19 0 .43-.04.68.51.24.55.83 1.9.9 2.04.07.14.12.31.02.51-.1.2-.15.31-.3.48-.15.17-.31.38-.44.51-.15.15-.3.31-.13.6.17.3.76 1.24 1.62 2.01 1.12 1 2.06 1.31 2.36 1.46.3.15.47.13.65-.08.17-.2.73-.85.93-1.14.2-.3.4-.24.66-.14.27.1 1.71.81 2 .96.3.15.48.22.55.35.08.13.08.72-.16 1.41z"/></svg>`,
    facebook: `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.51 1.49-3.9 3.77-3.9 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.87h2.78l-.44 2.91h-2.34V22c4.78-.76 8.44-4.92 8.44-9.94z"/></svg>`,
    linkedin: `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zm7 0h3.8v1.64h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V21H18v-5.6c0-1.34-.02-3.06-1.87-3.06-1.87 0-2.16 1.46-2.16 2.96V21H10z"/></svg>`,
    instagram: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>`
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
            <div class="footer-icons">
                <a href="${CONTACT.facebook}" target="_blank" rel="noopener" class="icon-link" title="Facebook">${ICONS.facebook}</a>
                <a href="${CONTACT.linkedin}" target="_blank" rel="noopener" class="icon-link" title="LinkedIn">${ICONS.linkedin}</a>
                <a href="${CONTACT.instagram}" target="_blank" rel="noopener" class="icon-link" title="Instagram">${ICONS.instagram}</a>
            </div>
            <div class="footer-copy">
                Smart Inventory Management System &middot; Software Engineering Final Project &middot; MUST
            </div>
        </div>
    `;
}

function renderWhatsAppBubble() {
    const number = window.WHATSAPP_NUMBER || CONTACT.whatsapp;
    const bubble = document.createElement("a");
    bubble.href = `https://wa.me/${number}`;
    bubble.target = "_blank";
    bubble.rel = "noopener";
    bubble.className = "whatsapp-bubble";
    bubble.title = "Chat with us on WhatsApp";
    bubble.innerHTML = ICONS.whatsapp;
    document.body.appendChild(bubble);
}

document.addEventListener("DOMContentLoaded", renderWhatsAppBubble);
