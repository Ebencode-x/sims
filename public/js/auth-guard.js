// Include this on every page that requires a logged-in user.
// It checks the session, redirects to login.html if not authenticated,
// and injects a username + logout control into the topbar.

async function guardPage() {
    let session;
    try {
        const res = await fetch("/auth/me");
        session = await res.json();
    } catch (err) {
        window.location.href = "login.html";
        return;
    }

    if (!session.loggedIn) {
        window.location.href = "login.html";
        return;
    }

    const actions = document.getElementById("topbar-actions");
    if (actions) {
        actions.innerHTML = `
            <span class="mono" style="font-size:0.8rem; color: var(--muted);">${escapeHtml(session.username)}</span>
            <button class="btn btn-ghost btn-sm" id="logout-btn">Log out</button>
        `;
        document.getElementById("logout-btn").addEventListener("click", async () => {
            await fetch("/auth/logout", { method: "POST" });
            window.location.href = "index.html";
        });
    }
}

document.addEventListener("DOMContentLoaded", guardPage);
