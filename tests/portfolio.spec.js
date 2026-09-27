const { test, expect } = require('@playwright/test');
const path = require('path');

test.describe('Portfolio Page Tests', () => {
    test.beforeEach(async ({ page }) => {
        const filePath = path.resolve(__dirname, '../index.html');
        // On Windows, the file URL must be properly formatted
        const fileUrl = `file:///${filePath.replace(/\\/g, '/')}`;
        await page.goto(fileUrl);
    });

    test('Page title contains Prasad Rane', async ({ page }) => {
        await expect(page).toHaveTitle(/Prasad Rane/);
    });

    test('Navigation bar is present and contains correct sections', async ({ page }) => {
        const navbar = page.locator('.navbar');
        await expect(navbar).toBeVisible();

        const navLinks = page.locator('.nav-link');
        await expect(navLinks).toHaveCount(7); // Home, About, Skills, Experience, Certifications, Projects, Contact
    });

    test('Flagship project Prasad-Resumes-GraphRAG is featured', async ({ page }) => {
        const chatbotProject = page.locator('.project-card-graphrag');
        await expect(chatbotProject).toBeVisible();

        // Check for project title
        const title = chatbotProject.locator('.project-title');
        await expect(title).toContainText(/Resume AI Chatbot & Tailoring Engine/i);

        // Check that repository is marked as private
        const privateBadge = chatbotProject.locator('.private-repo-badge');
        await expect(privateBadge).toBeVisible();
        await expect(privateBadge).toContainText(/Private/i);

        // Check hosted app button link
        const hostedBtn = chatbotProject.locator('a[href="https://prasad-resumes-graphrag.vercel.app/"]');
        await expect(hostedBtn).toBeVisible();
        await expect(hostedBtn).toContainText(/Launch App/i);
    });

    test('Theme toggle switcher works', async ({ page }) => {
        const themeToggle = page.locator('#theme-toggle-btn');
        await expect(themeToggle).toBeVisible();

        // Default theme class checks
        const body = page.locator('body');
        
        // Default is now light theme
        const isLight = await body.evaluate(el => el.classList.contains('light-theme'));
        expect(isLight).toBe(true);

        // Click toggle to switch to dark mode
        await themeToggle.click({ force: true });
        const isDark = await body.evaluate(el => el.classList.contains('dark-theme'));
        expect(isDark).toBe(true);

        // Click again to switch back to light mode
        await themeToggle.click({ force: true });
        const isLightAgain = await body.evaluate(el => el.classList.contains('light-theme'));
        expect(isLightAgain).toBe(true);
    });

    test('Interactive mock chatbot widget in the project card works', async ({ page }) => {
        const chatbotWidget = page.locator('.mock-chatbot-widget');
        await expect(chatbotWidget).toBeVisible();

        const questionButtons = chatbotWidget.locator('.chat-preset-btn');
        await expect(questionButtons.first()).toBeVisible();

        // Click on the first question button
        await questionButtons.first().click({ force: true });

        // Wait for streaming animation response to complete (simulated time)
        await page.waitForTimeout(1000);

        // Check that the user message was added
        const lastUserMsg = chatbotWidget.locator('.chat-message-user').last();
        await expect(lastUserMsg).toBeVisible();
        await expect(lastUserMsg).toContainText("What AI features did Prasad build");

        // Check that the AI response was added
        const lastAiMsg = chatbotWidget.locator('.chat-message-ai').last();
        await expect(lastAiMsg).toBeVisible();
        const aiText = await lastAiMsg.innerText();
        expect(aiText.length).toBeGreaterThan(0);
    });

    test('Floating chatbot widget can be collapsed and expanded', async ({ page }) => {
        const chatbotContainer = page.locator('.mock-chatbot-widget-container');
        await expect(chatbotContainer).toBeVisible();
        await expect(chatbotContainer).not.toHaveClass(/collapsed/);

        // Collapse chatbot by executing the global toggle function (bypasses sticky header overlap coordinates)
        await page.evaluate(() => toggleChatbot(true));
        await expect(chatbotContainer).toHaveClass(/collapsed/);

        // Check that launcher button is now active
        const launcherBtn = chatbotContainer.locator('.chatbot-launcher-btn');
        await expect(launcherBtn).toBeVisible();

        // Expand chatbot by executing the global toggle function
        await page.evaluate(() => toggleChatbot(false));
        await expect(chatbotContainer).not.toHaveClass(/collapsed/);
    });

    test('Chatbot is labeled as a preview and links to the live GraphRAG app', async ({ page }) => {
        const status = page.locator('.mock-chatbot-widget .chat-status');
        await expect(status).toContainText(/Preview/i);
        await expect(status).not.toContainText(/Active GraphRAG Index/i);
        await expect(status.locator('a.chat-live-link')).toHaveAttribute('href', 'https://prasad-resumes-graphrag.vercel.app/');
    });

    test('Unmatched questions point to the live app', async ({ page }) => {
        const chatbotWidget = page.locator('.mock-chatbot-widget');
        await chatbotWidget.locator('#chat-input-field').fill('What is your favorite color?');
        await chatbotWidget.locator('#chat-send-btn').click({ force: true });
        const lastAiMsg = chatbotWidget.locator('.chat-message-ai').last();
        await expect(lastAiMsg.locator('a.chat-live-link')).toHaveAttribute('href', 'https://prasad-resumes-graphrag.vercel.app/', { timeout: 10000 });
    });

    test('View Resume buttons point to correct hosted app link', async ({ page }) => {
        const viewResumeBtn = page.locator('#downloadResumeBtn');
        await expect(viewResumeBtn).toBeVisible();
        await expect(viewResumeBtn).toContainText(/View Resume/i);
        await expect(viewResumeBtn).toHaveAttribute('href', 'https://prasad-resumes-graphrag.vercel.app/');
        await expect(viewResumeBtn).toHaveAttribute('target', '_blank');

        const footerResumeBtn = page.locator('#downloadResumeBtnFooter');
        await expect(footerResumeBtn).toBeVisible();
        await expect(footerResumeBtn).toContainText(/View Resume/i);
        await expect(footerResumeBtn).toHaveAttribute('href', 'https://prasad-resumes-graphrag.vercel.app/');
        await expect(footerResumeBtn).toHaveAttribute('target', '_blank');
    });

    test('Recruiter can type a custom question and send it', async ({ page }) => {
        // Scroll to top to ensure navbar and chatbot are separated
        await page.evaluate(() => window.scrollTo(0, 0));
        await page.waitForTimeout(500);

        const chatbotWidget = page.locator('.mock-chatbot-widget');
        await expect(chatbotWidget).toBeVisible();

        const inputField = chatbotWidget.locator('#chat-input-field');
        await expect(inputField).toBeVisible();

        // Type a custom question
        await inputField.fill('Tell me about your EXFO work experience');
        
        const sendBtn = chatbotWidget.locator('#chat-send-btn');
        await expect(sendBtn).toBeVisible();
        await sendBtn.click({ force: true });

        // Check that the user message was added
        const lastUserMsg = chatbotWidget.locator('.chat-message-user').last();
        await expect(lastUserMsg).toBeVisible();
        await expect(lastUserMsg).toContainText("Tell me about your EXFO work experience");

        // Check that the AI response was added
        const lastAiMsg = chatbotWidget.locator('.chat-message-ai').last();
        await expect(lastAiMsg).toBeVisible();
        await expect(lastAiMsg).toContainText("EXFO", { timeout: 10000 });
    });

    test('Lenis smooth scrolling library is initialized', async ({ page }) => {
        // Check if the Lenis script is loaded and defined on the window
        const isLenisDefined = await page.evaluate(() => typeof Lenis !== 'undefined');
        expect(isLenisDefined).toBe(true);

        // Check if window.lenis is initialized
        const isLenisInitialized = await page.evaluate(() => typeof window.lenis !== 'undefined');
        expect(isLenisInitialized).toBe(true);
    });

    test('Page still works when the Lenis script fails to load', async ({ page }) => {
        const errors = [];
        page.on('pageerror', e => errors.push(e.message));
        await page.route(/lenis/, route => route.abort());
        await page.reload();

        await expect(page.locator('#home')).toHaveClass(/active-section/);
        const chatbotWidget = page.locator('.mock-chatbot-widget');
        await chatbotWidget.locator('.chat-preset-btn').first().click({ force: true });
        await expect(chatbotWidget.locator('.chat-message-ai').last()).toContainText('Rocket Mortgage', { timeout: 10000 });
        expect(errors).toEqual([]);
    });

    test('Chat suggestions shrink to one chip after a question so the answer has room', async ({ page }) => {
        const chatbotWidget = page.locator('.mock-chatbot-widget');
        const presetButtons = chatbotWidget.locator('.chat-preset-btn');
        const toggle = chatbotWidget.locator('.chat-presets-toggle');
        await expect(toggle).toBeHidden();

        await presetButtons.first().click({ force: true });
        await expect(presetButtons.first()).toBeHidden();
        await expect(toggle).toBeVisible();

        await toggle.click({ force: true });
        await expect(presetButtons.first()).toBeVisible();
    });

    test('Color theme tokens match orange-yellow amber palette and legacy blue is removed', async ({ page }) => {
        const rootStyles = await page.evaluate(() => {
            const root = document.documentElement;
            const style = getComputedStyle(root);
            return {
                lightPrimary: style.getPropertyValue('--m3-light-primary').trim(),
                darkPrimary: style.getPropertyValue('--m3-dark-primary').trim(),
                lightPrimaryContainer: style.getPropertyValue('--m3-light-primary-container').trim()
            };
        });

        // Ensure legacy blue tokens are replaced
        expect(rootStyles.lightPrimary).not.toBe('#0b57d0');
        expect(rootStyles.darkPrimary).not.toBe('#a8c7fa');

        // Verify warm amber/orange primary tokens
        expect(rootStyles.lightPrimary.toLowerCase()).toBe('#a85300');
        expect(rootStyles.darkPrimary.toLowerCase()).toBe('#fbbf24');
    });

    test('Mobile menu toggle is a keyboard-accessible button', async ({ page }) => {
        await page.setViewportSize({ width: 390, height: 800 });
        const toggle = page.locator('button.hamburger');
        await expect(toggle).toBeVisible();
        await expect(toggle).toHaveAttribute('aria-controls', 'nav-menu');
        await expect(toggle).toHaveAttribute('aria-expanded', 'false');

        await toggle.focus();
        await page.keyboard.press('Enter');
        await expect(toggle).toHaveAttribute('aria-expanded', 'true');
        await expect(page.locator('#nav-menu')).toHaveClass(/active/);

        await page.keyboard.press('Escape');
        await expect(toggle).toHaveAttribute('aria-expanded', 'false');
        await expect(page.locator('#nav-menu')).not.toHaveClass(/active/);
    });

    test('Profile photo is rendered in About Me card and loads successfully', async ({ page }) => {
        const profileImg = page.locator('.profile-avatar img, img.profile-avatar-img');
        await expect(profileImg).toBeVisible();
        await expect(profileImg).toHaveAttribute('src', /assets\/images\/prasad-photo\.webp/);
        await expect(profileImg).toHaveAttribute('alt', /Prasad Rane/i);

        // Check that the image actually loaded successfully
        const isLoaded = await profileImg.evaluate((img) => img.complete && img.naturalWidth > 0);
        expect(isLoaded).toBe(true);
    });

    test('Contact info has no phone number', async ({ page }) => {
        await expect(page.locator('a[href^="tel:"]')).toHaveCount(0);
    });

    test.describe('on a phone', () => {
        test.use({ viewport: { width: 375, height: 667 } });

        test('Chatbot starts collapsed and fits the screen when opened', async ({ page }) => {
            const container = page.locator('.mock-chatbot-widget-container');
            await expect(container).toHaveClass(/collapsed/);
            await expect(container.locator('.chatbot-launcher-btn')).toBeVisible();

            await page.evaluate(() => toggleChatbot(false));
            const widget = page.locator('.mock-chatbot-widget');
            await expect(widget).toBeVisible();
            await page.waitForTimeout(500);
            const box = await widget.boundingBox();
            expect(box.x).toBeGreaterThanOrEqual(0);
            expect(box.y).toBeGreaterThanOrEqual(0);
            expect(box.x + box.width).toBeLessThanOrEqual(375);
            expect(box.y + box.height).toBeLessThanOrEqual(667);
            await expect(widget.locator('#chat-input-field')).toBeInViewport();
        });
    });
});
