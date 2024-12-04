import { Locator, Page, expect } from '@playwright/test'

export class LoginPage {
	readonly page: Page
	readonly emailField: Locator
	readonly passwordField: Locator
	readonly continueBtn: Locator
	readonly loginBtn: Locator
	 
	constructor(page: Page) {
		this.page = page
		this.emailField = this.page.locator('[type="email"]')
		this.passwordField = this.page.locator('[type="password"]')
		this.continueBtn = this.page.locator('.LoginEmailForm-continueButton')
		this.loginBtn = this.page.locator('.LoginButton')
	}

	/**
	 * Function enters email address and clicks Continue button.
	 * Then it enters password, clicks Log In button and verifies that homepage loads.
	 * @param email user's email address
	 * @param password user's password
	 */
	async login(email: string, password: string): Promise<void> {
		await this.page.goto('/-/login')
		await this.emailField.waitFor({ timeout: 30000 })
		await this.emailField.fill(email)
		await this.continueBtn.click()
		await this.passwordField.waitFor({ timeout: 30000 })
		await this.passwordField.fill(password)
		await this.loginBtn.click()
		await expect(this.page).toContainUrl('/home/', {timeout: 15000})
	}
}