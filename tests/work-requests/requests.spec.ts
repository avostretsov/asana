import { expect, test } from '../../lib/fixture'
const tasks: string[] = [
	'[Example] Laptop setup for new hire',
	'[Example] Password not working',
	'[Example] New keycard for Daniela V'
]
test.describe('Work Requests should include', () => {
	test.beforeEach(async ({ loginPage, leftNav, workRequestsPage }) => {
		await loginPage.login(process.env.EMAIL!, process.env.PASSWORD!)
		await leftNav.selectProject('Work Requests')
		await expect(workRequestsPage.heading).toBeVisible()
	})
	test(`${tasks[0]} item in "New Requests" column with "Medium priority", "Low effort", "New hardware", and "Not Started" tags`, async ({ table }) => {
		await table.verifyColumnItem('New Requests', tasks[0])
		await table.verifyItemTags(tasks[0], ['Medium priority', 'Low effort', 'New hardware', 'Not Started'])
	})
	test(`${tasks[1]} item in "In Progress" column with "Low effort", "Low priority", "Password reset" and "Waiting" tags`, async ({ table }) => {
		await table.verifyColumnItem('In Progress', tasks[1])
		await table.verifyItemTags(tasks[1], ['Low priority', 'Password reset', 'Waiting'])
	})
	test(`${tasks[2]} item in "Completed" column with "Low effort", "New hardware", "High Priority", and "Done" tags`, async ({ table }) => {
		await table.verifyColumnItem('Completed', tasks[2])
		await table.verifyItemTags(tasks[2], ['Low effort', 'New hardware', 'High Priority', 'Done'])
	})
})