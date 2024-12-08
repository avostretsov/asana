/**
 * Normalizes text by replacing HTML entity &nbsp; (non-breaking spaces) with regular spaces.
 * @param text The input string to normalize.
 * @returns The normalized string.
 */
export function normalizeText(text: string): string {
	return text.replace(/\u00A0/g, ' ')
}

/**
 * Normalizes and sorts an array of strings.
 * @param tags The array of strings to normalize and sort.
 * @returns The normalized and sorted array of strings.
 */
export function normalizeAndSortTags(tags: string[]): string[] {
	return tags.map(tag => normalizeText(tag).toLowerCase()).sort()
}
