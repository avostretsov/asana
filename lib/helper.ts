export function returnProjectScenarios(scenarios: any[], projectName: string): any[] {
    return scenarios.filter(scenario => scenario.projectName === projectName)
}
