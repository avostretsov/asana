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
	test(`"${scenarios[0].task}" item in "${scenarios[0].columnName}" column with "${scenarios[0].tags.join(', ')}" tags`, async ({ table }) => {
		await table.verifyColumnItem(scenarios[0].columnName, scenarios[0].task)
		await table.verifyItemTags(scenarios[0].task, scenarios[0].tags)
	})
	test(`"${scenarios[1].task}" item in "${scenarios[1].columnName}" column with "${scenarios[1].tags.join(', ')}" tags`, async ({ table }) => {
		await table.verifyColumnItem(scenarios[1].columnName, scenarios[1].task)
		await table.verifyItemTags(scenarios[1].task, scenarios[1].tags)
	})
	test(`"${scenarios[2].task}" item in "${scenarios[2].columnName}" column with "${scenarios[2].tags.join(', ')}" tags`, async ({ table }) => {
		await table.verifyColumnItem(scenarios[2].columnName, scenarios[2].task)
		await table.verifyItemTags(scenarios[2].task, scenarios[2].tags)
	})
})