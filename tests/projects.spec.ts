import { expect, test } from '../lib/fixture'
import { projects } from '../lib/projectConfig'

projects.forEach(({ projectName, pageType, scenarios }) => {
	test.describe(`"${projectName}" should have`, () => {
		test.beforeEach(async ({ loginPage, leftNav, projPlanProjectPage, workRequestsPage }) => {
			// Map pageType to the corresponding fixture
			const pages = {
				projPlanProjectPage,
				workRequestsPage,
			};
		
			const page = pages[pageType]; // Select the appropriate page object
			if (!page) throw new Error(`Invalid page type: ${pageType}`)
		
			await loginPage.login();
			await leftNav.selectProject(projectName)
			await expect(page.heading).toBeVisible()
		});

		scenarios.forEach(scenario => {
			test(`"${scenario.task}" item in "${scenario.columnName}" column with "${scenario.tags.join(', ')}" tags`, async ({ table }) => {
				await table.verifyColumnItem(scenario.columnName, scenario.task)
				await table.verifyItemTags(scenario.task, scenario.tags)
			})
		})
	})
})
