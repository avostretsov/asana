import { expect, test } from '../../lib/fixture'
const tasks: string[] = [
	'Draft project brief',
	'Schedule kickoff meeting',
	'Share timeline with teammates'
]
test.describe('Project plan "Project" should include in "To do" column', () => {
	test.beforeEach(async ({ loginPage, leftNav, projPlanProjectPage }) => {
		await loginPage.login()
		await leftNav.selectProject('Cross-functional project plan, Project')
		await expect(projPlanProjectPage.heading).toBeVisible()
	})
	test(`${tasks[0]} item with "Non-Priority" and "On track" tags`, async ({ table }) => {
		await table.verifyColumnItem('To do', tasks[0])
		await table.verifyItemTags(tasks[0], ['Non-Priority', 'On track'])
	})
	test(`${tasks[1]} item with "Medium" and "At risk" tags`, async ({ table }) => {
		await table.verifyColumnItem('To do', tasks[1])
		await table.verifyItemTags(tasks[1], ['Medium', 'At risk'])
	})
	test(`${tasks[2]} item with "High" and "Off track" tags`, async ({ table }) => {
		await table.verifyColumnItem('To do', tasks[2])
		await table.verifyItemTags(tasks[2], ['High', 'Off track'])
	})
})