import { Locator, Page } from '@playwright/test'

export class Heading {
	readonly page: Page	
	 
	constructor(page: Page) {
		this.page = page
	}

	/**
	 * Function heading locator of your choice
	 * @param projectName Project name to be pulled from projectConnfig.ts
	 */
	projectHeadingLocator(projectName: string): Locator {
		return this.page.getByRole('heading', { name: projectName })
	}
}