import { Locator, Page } from '@playwright/test'

export class Heading {
	readonly page: Page	
	 
	constructor(page: Page) {
		this.page = page
	}

	/**
	 * @param projectName Project name to be pulled from projectConnfig.ts
	 * @returns heading locator of the project page under test
	 */
	projectHeadingLocator(projectName: string): Locator {
		return this.page.getByRole('heading', { name: projectName })
	}
}