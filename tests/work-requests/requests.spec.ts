import { expect, test } from '../../lib/fixture'

const scenarios = [
	{
		columnName: 'New Requests',
		task: '[Example] Laptop setup for new hire',
		tags: ['Medium priority', 'Low effort', 'New hardware', 'Not Started']
	},
	{
		columnName: 'In Progress',
		task: '[Example] Password not working',
		tags: ['Low priority', 'Password reset', 'Waiting']
	},
	{
		columnName: 'Completed',
		task: '[Example] New keycard for Daniela V',
		tags: ['Low effort', 'New hardware', 'High Priority', 'Done']
	}
]
test.describe('Work Requests should include', () => {
	test.beforeEach(async ({ loginPage, leftNav, workRequestsPage }) => {
		await loginPage.login()
		await leftNav.selectProject('Work Requests')
		await expect(workRequestsPage.heading).toBeVisible()
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