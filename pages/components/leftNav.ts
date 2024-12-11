import { Locator, Page } from '@playwright/test'

export class LeftNav {
	readonly page: Page
	 
	constructor(page: Page) {
		this.page = page
	}

	/**
	 * Function clicks on the project of your choice
	 * @param projectName Project name to be pulled from projectConnfig.ts
	 */
	async selectProject(projectName: string): Promise<void> {
		await this.page.locator(`span:has-text("${projectName}")`).click()
	}

}