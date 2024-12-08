import { test as base } from '@playwright/test'
import { LoginPage } from '../pages/loginPage'
// import { matchers } from 'playwright-expect'
import { LeftNav } from '../pages/components/leftNav'
import { Table } from '../pages/components/table'
import { ProjPlanProjectPage } from '../pages/projPlanProjectPage'
import { WorkRequestsPage } from '../pages/workRequestsPage'

type MyFixtures = {
	loginPage: LoginPage,
	leftNav: LeftNav,
	projPlanProjectPage: ProjPlanProjectPage,
	workRequestsPage: WorkRequestsPage,
	table: Table
}

export const test = base.extend<MyFixtures>({
	loginPage: async ({ page }, use) => {
		await use(new LoginPage(page))
	},
	leftNav: async ({ page }, use) => {
		await use(new LeftNav(page))
	},
	table: async ({ page }, use) => {
		await use(new Table(page))
	},
	projPlanProjectPage: async ({ page }, use) => {
		await use(new ProjPlanProjectPage(page))
	},
	workRequestsPage: async ({ page }, use) => {
		await use(new WorkRequestsPage(page))
	}
})

export { expect } from '@playwright/test'
// export { matchers } from 'playwright-expect'