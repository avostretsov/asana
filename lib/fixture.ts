import { test as base } from '@playwright/test'
import { LoginPage } from '../pages/loginPage'
import { LeftNav } from '../pages/components/leftNav'
import { Heading } from '../pages/components/heading'
import { Table } from '../pages/components/table'
type MyFixtures = {
	loginPage: LoginPage,
	leftNav: LeftNav,
	heading: Heading,
	table: Table
}

export const test = base.extend<MyFixtures>({
	loginPage: async ({ page }, use) => {
		await use(new LoginPage(page))
	},
	leftNav: async ({ page }, use) => {
		await use(new LeftNav(page))
	},
	heading: async ({ page }, use) => {
		await use(new Heading(page))
	},
	table: async ({ page }, use) => {
		await use(new Table(page))
	}
})

export { expect } from '@playwright/test'
