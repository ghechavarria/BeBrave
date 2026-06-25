/* ============================================================
   BeBrave! — interactive scenario "game" logic
   Vanilla JS. HUD, Bravery Points, answer feedback, mobile nav.
   ============================================================ */

const POINTS_PER_CORRECT = 10;
const TOTAL_STEPS = 3;
const STORAGE_KEY = "bebrave_points";
const SCENARIO_RE = /scenario([123])\.html$/;
const MOBILE_NAV_MQ = window.matchMedia("(max-width: 760px)");

const isScenarioPage = () => SCENARIO_RE.test(location.pathname);

const currentStep = () => Number(location.pathname.match(SCENARIO_RE)?.[1] || 1);

const readPoints = () => parseInt(sessionStorage.getItem(STORAGE_KEY) || "0", 10) || 0;

const writePoints = (value) => sessionStorage.setItem(STORAGE_KEY, String(value));

function buildHud() {
    document.getElementById("game-hud")?.remove();

    const scene = document.getElementById("scene");
    if (!scene) return;

    if (currentStep() === 1) writePoints(0);

    scene.insertAdjacentHTML("beforebegin", `
        <div class="game-hud" id="game-hud">
            <div class="hud-progress">
                <span class="hud-step">Level ${currentStep()} of ${TOTAL_STEPS}</span>
                <div class="progress-track">
                    <div class="progress-fill" id="progress-fill"></div>
                </div>
            </div>
            <div class="hud-points">
                <span class="star" aria-hidden="true">★</span>
                <span id="points-value">${readPoints()}</span>&nbsp;Bravery
            </div>
        </div>
    `);

    requestAnimationFrame(() => {
        document.getElementById("progress-fill").style.width =
            `${((currentStep() - 1) / TOTAL_STEPS) * 100}%`;
    });
}

function bankStepProgress() {
    const fill = document.getElementById("progress-fill");
    if (fill) fill.style.width = `${(currentStep() / TOTAL_STEPS) * 100}%`;
}

function animatePoints(newTotal) {
    const points = document.getElementById("points-value");
    const badge = document.querySelector(".hud-points");
    if (points) points.textContent = newTotal;
    if (!badge) return;
    badge.classList.add("points-pop");
    badge.addEventListener("animationend", () => badge.classList.remove("points-pop"), { once: true });
}

function showPanel(panel, bannerClass, bannerEmoji, bannerText) {
    document.getElementById("scene")?.classList.add("hidden");
    panel.querySelector(".result-banner")?.remove();

    if (bannerClass === "bad") {
        const form = panel.querySelector("form");
        if (form && !form.querySelector(".retry-btn")) {
            form.insertAdjacentHTML("afterbegin", `
                <button type="button" class="retry-btn">
                    <span class="retry-icon" aria-hidden="true">↺</span>${bannerText}
                </button>
            `);
        }
        panel.classList.add("shake");
        panel.addEventListener("animationend", () => panel.classList.remove("shake"), { once: true });
    } else {
        panel.insertAdjacentHTML("afterbegin", `
            <div class="result-banner ${bannerClass}">
                <span class="result-emoji" aria-hidden="true">${bannerEmoji}</span>${bannerText}
            </div>
        `);
    }

    panel.classList.remove("hidden");
    panel.classList.add("show-feedback");
    bankStepProgress();
}

function retryQuestion() {
    const wrong = document.getElementById("wrong-answer");
    if (wrong) {
        wrong.classList.add("hidden");
        wrong.classList.remove("show-feedback", "shake");
        wrong.querySelector(".retry-btn")?.remove();
    }
    document.getElementById("scene")?.classList.remove("hidden");
    const fill = document.getElementById("progress-fill");
    if (fill) fill.style.width = `${((currentStep() - 1) / TOTAL_STEPS) * 100}%`;
}

function showCorrect() {
    const next = readPoints() + POINTS_PER_CORRECT;
    writePoints(next);
    animatePoints(next);
    showPanel(
        document.getElementById("right-answer"),
        "good",
        "✓",
        `Brave choice! +${POINTS_PER_CORRECT} Bravery`
    );
}

function showWrong() {
    showPanel(
        document.getElementById("wrong-answer"),
        "bad",
        "↺",
        "Let's rethink that one"
    );
}

function initScenarioGame() {
    const scene = document.getElementById("scene");
    if (!scene) return;

    buildHud();

    scene.addEventListener("click", (event) => {
        const choice = event.target.closest(".answer[data-choice]")?.dataset.choice;
        if (choice === "correct") showCorrect();
        else if (choice === "wrong") showWrong();
    });
}

function closeNav(nav, toggle) {
    nav.classList.remove("nav-open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Open menu");
    nav.querySelectorAll(".has-dropdown").forEach((item) => item.classList.remove("dropdown-open"));
}

function initMobileNav() {
    const nav = document.querySelector("nav");
    if (!nav) return;

    const toggle = nav.querySelector(".nav-toggle");
    const menu = nav.querySelector("#nav-menu");
    if (!toggle || !menu) return;

    toggle.addEventListener("click", () => {
        if (nav.classList.contains("nav-open")) closeNav(nav, toggle);
        else {
            nav.classList.add("nav-open");
            toggle.setAttribute("aria-expanded", "true");
            toggle.setAttribute("aria-label", "Close menu");
        }
    });

    menu.addEventListener("click", (event) => {
        const link = event.target.closest("a");
        if (!link) return;

        const parent = link.parentElement;
        if (
            parent?.classList.contains("has-dropdown") &&
            link === parent.querySelector(":scope > a") &&
            MOBILE_NAV_MQ.matches
        ) {
            event.preventDefault();
            parent.classList.toggle("dropdown-open");
            return;
        }

        closeNav(nav, toggle);
    });

    document.addEventListener("click", (event) => {
        if (nav.classList.contains("nav-open") && !nav.contains(event.target)) closeNav(nav, toggle);
    });

    MOBILE_NAV_MQ.addEventListener("change", (event) => {
        if (!event.matches) closeNav(nav, toggle);
    });
}

document.addEventListener("click", (event) => {
    if (event.target.closest(".retry-btn")) retryQuestion();
});

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
} else {
    init();
}

function init() {
    if (isScenarioPage()) initScenarioGame();
    initMobileNav();
}
