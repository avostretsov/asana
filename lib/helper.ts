export function returnProjectScenarios(scenarios: Scenario[], projectName: string): Scenario[] {
	const projectScenarios = scenarios.filter(scenario => scenario.projectName === projectName)
	if (projectScenarios.length === 0) {
		throw new Error(`No scenarios found for project: ${projectName}`)
	}
return projectScenarios
}