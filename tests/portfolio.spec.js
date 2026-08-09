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

        // Wait for streaming animation
        await page.waitForTimeout(4500);

        // Check that the user message was added
        const lastUserMsg = chatbotWidget.locator('.chat-message-user').last();
        await expect(lastUserMsg).toBeVisible();
        await expect(lastUserMsg).toContainText("Tell me about your EXFO work experience");

        // Check that the AI response was added
        const lastAiMsg = chatbotWidget.locator('.chat-message-ai').last();
        await expect(lastAiMsg).toBeVisible();
        const aiText = await lastAiMsg.innerText();
        expect(aiText).toContain("EXFO");
    });
});

