import { Project } from '../types'

export const projects: Project[] = [
	{
		projectName: 'Cross-functional project plan, Project',
		pageType: 'projPlanProjectPage',
		scenarios: [
			{
				columnName: 'To do',
				task: 'Draft project brief',
				tags: ['Non-Priority', 'On track']},
			{
				columnName: 'To do',
				task: 'Schedule kickoff meeting',
				tags: ['Medium', 'At risk']
			},
			{
				columnName: 'To do',
				task: 'Share timeline with teammates',
				tags: ['High', 'Off track']
			},
		]
	},
	{
		projectName: 'Work Requests',
		pageType: 'workRequestsPage',
		scenarios: [
			{
				columnName: 'New Requests',
				task: '[Example] Laptop setup for new hire',
				tags: ['Medium priority', 'Low effort', 'New hardware', 'Not Started']
			},
			{
				columnName: 'In Progress',
				task: '[Example] Password not working',
				tags: ['Low effort', 'Low priority', 'Password reset', 'Waiting']
			},
			{
				columnName: 'Completed',
				task: '[Example] New keycard for Daniela V',
				tags: ['Low effort', 'New hardware', 'High Priority', 'Done']
			}
		]
	}
]