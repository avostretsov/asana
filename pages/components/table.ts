import { Locator, Page, expect } from '@playwright/test'

export class Table {
	readonly page: Page
  
	constructor(page: Page) {
		this.page = page
	}

	/**
	 * Function finds index any available column.
	 * @param columnName project plan column names: 'Doing', 'To do', 'Done', 'Untitled section';
	 * work requests column names: 'New Requests', 'Backlog', In Progress', 'Completed'
	 */
	async findColumnIndex(columnName: string): Promise<number> {
		const columnHeaders: string[] = await this.page
			.locator('.BoardColumnHeaderTitle')
			.allInnerTexts()
		// this replaces the HTML entity &nbsp; (non-breaking space) with regular space in the text
		const normalizeText = (text: string) => text.replace(/\u00A0/g, ' ')
		const normalizedHeaders = columnHeaders.map(normalizeText)
		const columnIndex: number = normalizedHeaders.indexOf(columnName)
		return columnIndex
	}

	/**
	 * Function returns all Task Names that are on the page
	 */
	async returnAllItems(): Promise<string[]> {
		let allItems = await this.page
			.locator('.BoardCard-taskName')
			.allInnerTexts()
		return allItems
	}

	/**
	 * Function returns all untagged Task Names that are on the page
	 */
	async returnUntaggedItems(): Promise<string[]> {
		const untaggedItems = await this.page
  		.locator(
    		'.BoardCardLayout-contentAboveSubtasks:not(:has(.BoardCardCustomPropertiesAndTags)) >> .BoardCard-taskName'
  		)
  		.allInnerTexts()
		return untaggedItems
	}

	/**
	 * Function returns all tagged Task Names that are on the page
	 */
	async returnAllTaggedItems(): Promise<string[]> {
		const allItems = await this.returnAllItems()
		const untaggedItems = await this.returnUntaggedItems()
		const allTaggedItems = allItems.filter(item => !untaggedItems.includes(item))
  	return allTaggedItems
	}

	/**
	 * Function returns all Task Names from particular column
	 * @param columnIndex Index of the column
	 */
	async returnColumnItems(columnIndex: number): Promise<string[]> {
		let columnItems = await this.page
			.locator('.CommentOnlyBoardColumnCardsContainer-itemList')
			.nth(columnIndex)
			.locator('.BoardCard-taskName')
			.allInnerTexts()
		return columnItems
	}
	
	/**
	 * Function verifies the Task is in the particular column
	 * @param columnName project plan column names: 'Doing', 'To do', 'Done', 'Untitled section';
	 * work requests column names: 'New Requests', 'Backlog', In Progress', 'Completed'
	 * @param item Task Name
	 */
	async verifyColumnItem(columnName: string, item: string): Promise<void> {
		const columnIndex = await this.findColumnIndex(columnName)
		const columnItems = await this.returnColumnItems(columnIndex)
		const matches = columnItems.some(columnItem => columnItem === item)
		expect(matches).toBe(true)
	}

	/**
	 * Function verifies the Task has particular tags
	 * @param item Task Name
	 * @param expectedTags Tag Names to verify
	 */
	async verifyItemTags(item: string, expectedTags: string[]): Promise<void> {
		let allTaggedItems = await this.returnAllTaggedItems()
		const allItems = await this.returnAllItems()
		const taggedTaskIndex = allTaggedItems.indexOf(item)
		let actualItemTags: string[] = await this.page
			.locator('.BoardCardCustomPropertiesAndTags')
			.nth(taggedTaskIndex)
			.locator('.TypographyPresentation')
			.allInnerTexts()
		const normalizedExpectedTags = expectedTags.map(tag => tag.toLowerCase()).sort()
		const normalizedActualTags = actualItemTags.map(tag => tag.toLowerCase()).sort()
		expect(normalizedExpectedTags).toEqual(normalizedActualTags)
	}
}