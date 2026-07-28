const yearSpan = document.getElementById("current-year");
const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.getElementById("site-nav");
const mobileCall = document.querySelector(".mobile-call");
const quoteForms = document.querySelectorAll("[data-quote-form]");
const emailCopyLinks = document.querySelectorAll("[data-copy-email]");
const languageSwitches = document.querySelectorAll(".language-switch");
const sectionLinks = siteNav ? Array.from(siteNav.querySelectorAll('a[href^="#"]')) : [];
const sections = sectionLinks
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter((section) => section instanceof HTMLElement);

if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
}

if (menuToggle && siteNav) {
    menuToggle.addEventListener("click", () => {
        const isOpen = siteNav.classList.toggle("is-open");
        menuToggle.setAttribute("aria-expanded", String(isOpen));
    });

    siteNav.addEventListener("click", (event) => {
        if (event.target instanceof HTMLAnchorElement) {
            siteNav.classList.remove("is-open");
            menuToggle.setAttribute("aria-expanded", "false");
        }
    });
}

if (mobileCall) {
    const updateMobileCall = () => {
        mobileCall.classList.toggle("is-visible", window.scrollY > 520);
    };

    updateMobileCall();
    window.addEventListener("scroll", updateMobileCall, { passive: true });
}

languageSwitches.forEach((link) => {
    link.addEventListener("click", () => {
        const target = new URL(link.getAttribute("href"), window.location.href);
        target.search = window.location.search;
        target.hash = window.location.hash;
        link.href = target.toString();
    });
});

let copyToastTimer;

const showCopyToast = (message) => {
    let toast = document.querySelector("[data-copy-toast]");
    if (!(toast instanceof HTMLElement)) {
        toast = document.createElement("div");
        toast.className = "copy-toast";
        toast.setAttribute("data-copy-toast", "");
        toast.setAttribute("role", "status");
        toast.setAttribute("aria-live", "polite");
        document.body.appendChild(toast);
    }

    toast.textContent = message;
    toast.classList.remove("is-visible");
    window.requestAnimationFrame(() => toast.classList.add("is-visible"));
    window.clearTimeout(copyToastTimer);
    copyToastTimer = window.setTimeout(() => {
        toast.classList.remove("is-visible");
    }, 2400);
};

const copyText = async (text) => {
    if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        return;
    }

    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.setAttribute("readonly", "");
    textArea.style.position = "fixed";
    textArea.style.opacity = "0";
    document.body.appendChild(textArea);
    textArea.select();
    const copied = document.execCommand("copy");
    textArea.remove();
    if (!copied) {
        throw new Error("Copy command was not accepted");
    }
};

emailCopyLinks.forEach((link) => {
    link.addEventListener("click", async (event) => {
        const email = link.getAttribute("data-copy-email");
        if (!email) {
            return;
        }

        event.preventDefault();
        try {
            await copyText(email);
            showCopyToast(link.getAttribute("data-copy-success") || "Email address copied");
        } catch {
            showCopyToast(link.getAttribute("data-copy-failure") || "Unable to copy; opening your email application.");
            window.setTimeout(() => {
                window.location.href = link.href;
            }, 500);
        }
    });
});

quoteForms.forEach((form) => {
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        if (!(form instanceof HTMLFormElement) || !form.reportValidity()) {
            return;
        }

        const fields = Array.from(form.querySelectorAll("[data-field-label]"));
        const messageLines = fields.flatMap((field) => {
            if (!(field instanceof HTMLInputElement || field instanceof HTMLSelectElement || field instanceof HTMLTextAreaElement)) {
                return [];
            }

            const value = field.value.trim();
            const label = field.getAttribute("data-field-label");
            return value && label ? [`${label}: ${value}`] : [];
        });
        const subject = form.getAttribute("data-subject") || "Qualitech website request";
        const status = form.querySelector("[data-form-status]");
        const readyMessage = form.getAttribute("data-ready-message");
        const mailto = `mailto:info@qualitechelectricite.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(messageLines.join("\n\n"))}`;

        if (status instanceof HTMLElement && readyMessage) {
            status.textContent = readyMessage;
        }
        window.location.href = mailto;
    });
});

if (sectionLinks.length && sections.length) {
    const setActiveSection = (sectionId) => {
        sectionLinks.forEach((link) => {
            if (link.getAttribute("href") === `#${sectionId}`) {
                link.setAttribute("aria-current", "location");
            } else {
                link.removeAttribute("aria-current");
            }
        });
    };

    if ("IntersectionObserver" in window) {
        const visibleSections = new Set();
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    visibleSections.add(entry.target.id);
                } else {
                    visibleSections.delete(entry.target.id);
                }
            });

            let activeSection;
            for (let index = sections.length - 1; index >= 0; index -= 1) {
                if (visibleSections.has(sections[index].id)) {
                    activeSection = sections[index];
                    break;
                }
            }
            setActiveSection(activeSection ? activeSection.id : "");
        }, {
            rootMargin: "-30% 0px -40% 0px",
            threshold: 0,
        });

        sections.forEach((section) => observer.observe(section));
    } else {
        const updateActiveSection = () => {
            const marker = window.innerHeight * 0.4;
            const activeSection = sections.find((section) => {
                const bounds = section.getBoundingClientRect();
                return bounds.top <= marker && bounds.bottom >= marker;
            });
            setActiveSection(activeSection ? activeSection.id : "");
        };

        updateActiveSection();
        window.addEventListener("scroll", updateActiveSection, { passive: true });
    }
}
