export interface Scenario {
    projectName: string
    columnName: string
    task: string
    tags: string[]
}

interface Project {
	projectName: string
	pageType: 'projPlanProjectPage' | 'workRequestsPage'
	scenarios: Scenario[]
}

export const projects: Project[] = [ /* ... */ ]
