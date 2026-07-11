// Centralized contact details so they only need to be updated in one place.

const CONTACT = {
    email: "ebenrm01@gmail.com",
    whatsapp: [
        { label: "0758 687 097", number: "255758687097" },
        { label: "0795 852 381", number: "255795852381" },
        { label: "0762 024 012", number: "255762024012" }
    ]
};

const ICONS = {
    whatsapp: `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.5 14.4c-.3-.1-1.6-.8-1.9-.9-.2-.1-.4-.1-.6.1-.2.3-.7.9-.8 1-.2.2-.3.2-.5.1-.3-.1-1.2-.4-2.2-1.4-.8-.7-1.4-1.6-1.5-1.9-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.1-.1.2-.3.2-.4.1-.2 0-.4 0-.5-.1-.1-.6-1.5-.8-2-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.2.3-.9.9-.9 2.1 0 1.2.9 2.4 1 2.6.1.2 1.8 2.8 4.4 3.9.6.3 1.1.4 1.5.5.6.2 1.2.2 1.6.1.5-.1 1.6-.6 1.8-1.3.2-.6.2-1.2.2-1.3-.1-.1-.3-.2-.6-.3z"/><path d="M12 2C6.5 2 2 6.5 2 12c0 1.8.5 3.5 1.3 5L2 22l5.1-1.3c1.4.8 3.1 1.2 4.9 1.2 5.5 0 10-4.5 10-10S17.5 2 12 2zm0 18c-1.6 0-3.1-.4-4.4-1.2l-.3-.2-3 .8.8-2.9-.2-.3C4.2 15 3.7 13.5 3.7 12c0-4.6 3.7-8.3 8.3-8.3s8.3 3.7 8.3 8.3-3.7 8.3-8.3 8.3z"/></svg>`,
    mail: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 6l10 7 10-7"/></svg>`,
    facebook: `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M13.5 21v-8h2.7l.4-3.1h-3.1V8c0-.9.2-1.5 1.5-1.5h1.6V3.7C15.9 3.6 15 3.5 13.9 3.5c-2.3 0-3.9 1.4-3.9 4v2.4H7.3V13h2.7v8h3.5z"/></svg>`,
    linkedin: `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5a2.5 2.5 0 11-.02 5 2.5 2.5 0 01.02-5zM3 9h4v12H3zM9 9h3.8v1.7h.05c.53-1 1.83-2 3.77-2 4.03 0 4.78 2.65 4.78 6.1V21H17.4v-5.4c0-1.3-.02-3-1.82-3-1.82 0-2.1 1.4-2.1 2.9V21H9z"/></svg>`
};

function renderFooterHTML() {
    const whatsappLinks = CONTACT.whatsapp.map(w => `
        <a href="https://wa.me/${w.number}" target="_blank" rel="noopener" class="social-link" title="WhatsApp ${w.label}">
            ${ICONS.whatsapp}<span>${w.label}</span>
        </a>
    `).join("");

    return `
        <div class="footer-inner">
            <div class="footer-social">
                ${whatsappLinks}
                <a href="mailto:${CONTACT.email}" class="social-link" title="Email">
                    ${ICONS.mail}<span>${CONTACT.email}</span>
                </a>
                <a href="#" class="social-link icon-only" title="Facebook">${ICONS.facebook}</a>
                <a href="#" class="social-link icon-only" title="LinkedIn">${ICONS.linkedin}</a>
            </div>
            <div class="footer-copy">
                Smart Inventory Management System &middot; IT 8114 Software Engineering &middot; Final Project
            </div>
        </div>
    `;
}

function injectWhatsAppBubble() {
    const bubble = document.createElement("a");
    bubble.href = `https://wa.me/${CONTACT.whatsapp[0].number}`;
    bubble.target = "_blank";
    bubble.rel = "noopener";
    bubble.className = "whatsapp-bubble";
    bubble.title = "Chat with us on WhatsApp";
    bubble.innerHTML = ICONS.whatsapp;
    document.body.appendChild(bubble);
}

document.addEventListener("DOMContentLoaded", injectWhatsAppBubble);
