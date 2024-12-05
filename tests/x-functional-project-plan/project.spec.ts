import { expect, test } from '../../lib/fixture'

const scenarios = [
	{
		columnName: 'To do',
		task: 'Draft project brief',
		tags: ['Non-Priority', 'On track']
	},
	{
		columnName: 'To do',
		task: 'Schedule kickoff meeting',
		tags: ['Medium', 'At risk']
	},
	{
		columnName: 'To do',
		task: 'Share timeline with teammates',
		tags: ['High', 'Off track']
	}
]

test.describe('Project plan "Project" should include in "To do" column', () => {
	test.beforeEach(async ({ loginPage, leftNav, projPlanProjectPage }) => {
		await loginPage.login()
		await leftNav.selectProject('Cross-functional project plan, Project')
		await expect(projPlanProjectPage.heading).toBeVisible()
	})
	scenarios.forEach(scenario => {
		test(`"${scenario.task}" item in "${scenario.columnName}" column with "${scenario.tags.join(', ')}" tags`, async ({ table }) => {
			await table.verifyColumnItem(scenario.columnName, scenario.task)
			await table.verifyItemTags(scenario.task, scenario.tags)
		})
	})
})