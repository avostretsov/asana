import { scenarios } from './scenarios'

export const projects = [
	{
		projectName: 'Cross-functional project plan, Project',
		pageType: 'projPlanProjectPage',
		scenarios: scenarios.filter(scenario => scenario.projectName === 'Cross-functional project plan, Project'),
	},
	{
		projectName: 'Work Requests',
		pageType: 'workRequestsPage',
		scenarios: scenarios.filter(scenario => scenario.projectName === 'Work Requests'),
	},
]
