import { expect, test } from '../lib/fixture'
import { projects } from '../lib/projectConfig'

projects.forEach(project => {
	// Define test suite dynamically for each project
	test.describe(`"${project.projectName}" should have`, () => {
		test.beforeEach(async ({ loginPage, leftNav, heading }) => {
			await loginPage.login()
			await leftNav.selectProject(project.projectName)
			await expect(heading.projectHeadingLocator(project.projectName)).toBeVisible()
		})

		project.scenarios.forEach(scenario => {
			test(`"${scenario.task}" item in "${scenario.columnName}" column with "${scenario.tags.join(', ')}" tags`, async ({ table }) => {
				await table.verifyColumnItem(scenario.columnName, scenario.task)
				await table.verifyItemTags(scenario.task, scenario.tags)
			})
		})
	})
})
