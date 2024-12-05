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
	scenarios.forEach(scenario => {
		test(`"${scenario.task}" item in "${scenario.columnName}" column with "${scenario.tags.join(', ')}" tags`, async ({ table }) => {
			await table.verifyColumnItem(scenario.columnName, scenario.task)
			await table.verifyItemTags(scenario.task, scenario.tags)
		})
	})
})