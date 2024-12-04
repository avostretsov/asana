import { Locator, Page, expect } from '@playwright/test'

export class ProjPlanProjectPage {
	readonly page: Page
  readonly heading: Locator
	 
	constructor(page: Page) {
		this.page = page
    this.heading = this.page.getByRole('heading', { name: 'Cross-functional project plan, Project' })
	}
}
