import { Locator, Page } from '@playwright/test'

export class LeftNav {
	readonly page: Page
	readonly projectPlanProject: Locator
	readonly workRequests: Locator
	 
	constructor(page: Page) {
		this.page = page
		this.projectPlanProject = this.page.locator('span:has-text("Cross-functional project plan, Project")')
		this.workRequests = this.page.locator('span:has-text("Work Requests")')
	}

	/**
	 * Function clicks on the project of your choice
	 * @param projectName use 'Cross-functional project plan, Project' or 'Work Requests'
	 */
	async selectProject(projectName: string): Promise<void> {
		await this.page.locator(`span:has-text("${projectName}")`).click()
	}

}