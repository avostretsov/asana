export interface Scenario {
    columnName: string
    task: string
    tags: string[]
}

export interface Project {
    projectName: string
    scenarios: Scenario[]
}