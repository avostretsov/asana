import { expect, test } from '../lib/fixture'
import { scenarios } from '../lib/scenarios'
import { returnProjectScenarios } from '../lib/helper'

const projectName = 'Work Requests'
const projectScenarios = returnProjectScenarios(scenarios, projectName)

test.describe('Work Requests should have', () => {
	test.beforeEach(async ({ loginPage, leftNav, workRequestsPage }) => {
		await loginPage.login()
		await leftNav.selectProject('Work Requests')
		await expect(workRequestsPage.heading).toBeVisible()
	})
	projectScenarios.forEach(scenario => {
		test(`"${scenario.task}" item in "${scenario.columnName}" column with "${scenario.tags.join(', ')}" tags`, async ({ table }) => {
			await table.verifyColumnItem(scenario.columnName, scenario.task)
			await table.verifyItemTags(scenario.task, scenario.tags)
		})
	})
})