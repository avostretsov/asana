import { expect, test } from '../lib/fixture'
import { scenarios } from '../lib/scenarios'

const projectName = 'Cross-functional project plan, Project'
const projectScenarios = scenarios.filter(scenario => scenario.projectName === projectName)

test.describe(`"${projectName}" should have`, () => {
	test.beforeEach(async ({ loginPage, leftNav, projPlanProjectPage }) => {
		await loginPage.login()
		await leftNav.selectProject(`${projectName}`)
		await expect(projPlanProjectPage.heading).toBeVisible()
	})
	projectScenarios.forEach(scenario => {
		test(`"${scenario.task}" item in "${scenario.columnName}" column with "${scenario.tags.join(', ')}" tags`, async ({ table }) => {
			await table.verifyColumnItem(scenario.columnName, scenario.task)
			await table.verifyItemTags(scenario.task, scenario.tags)
		})
	})
})
