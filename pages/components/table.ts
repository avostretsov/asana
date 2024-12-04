import { Locator, Page, expect } from '@playwright/test'

export class Table {
	readonly page: Page
  
	constructor(page: Page) {
		this.page = page
	}

	/**
	 * Function finds index of To do column.
	 */
	async findColumnIndex(columnName: string): Promise<number> {
		const columnHeaders: string[] = await this.page.locator('.BoardColumnHeaderTitle').allInnerTexts()
		// this replaces the HTML entity &nbsp; (non-breaking space) with regular space in the text
		const normalizeText = (text: string) => text.replace(/\u00A0/g, ' ')
		const normalizedHeaders = columnHeaders.map(normalizeText)
		const columnIndex: number = normalizedHeaders.indexOf(columnName)
		return columnIndex
	}

	async returnAllItems(): Promise<string[]> {
		let allItems = await this.page
			.locator('.BoardCard-taskName')
			.allInnerTexts()
		return allItems
	}

	async returnUntaggedItems(): Promise<string[]> {
		const untaggedItems = await this.page
  		.locator(
    		'.BoardCardLayout-contentAboveSubtasks:not(:has(.BoardCardCustomPropertiesAndTags)) >> .BoardCard-taskName'
  		)
  		.allInnerTexts()
		return untaggedItems
	}

	async returnAllTaggedItems(): Promise<string[]> {
		const allItems = await this.returnAllItems()
		const untaggedItems = await this.returnUntaggedItems()
		const allTaggedItems = allItems.filter(item => !untaggedItems.includes(item))
  	return allTaggedItems
	}

	async returnColumnItems(columnIndex: number): Promise<string[]> {
		let columnItems = await this.page
			.locator('.CommentOnlyBoardColumnCardsContainer-itemList')
			.nth(columnIndex)
			.locator('.BoardCard-taskName')
			.allInnerTexts()
		return columnItems
	}
	
	async verifyColumnItem(columnName: string, item: string): Promise<void> {
		const columnIndex = await this.findColumnIndex(columnName)
		const columnItems = await this.returnColumnItems(columnIndex)
		const matches = columnItems.some(columnItem => columnItem === item)
		expect(matches).toBe(true)
	}

	async verifyItemTags(item: string, expectedTags: string[]): Promise<void> {
		let allTaggedItems = await this.returnAllTaggedItems()
		console.log(`TAGGED ITEMS: ${allTaggedItems}`)
		console.log(`TASK: ${item}`)
		const allItems = await this.returnAllItems()
		console.log(`ALL TASKS: ${allItems}`)
		const taggedTaskIndex = allTaggedItems.indexOf(item)
		console.log(`TAGGED TASK INDEX: ${taggedTaskIndex}`)
		let actualItemTags: string[] = await this.page
			.locator('.BoardCardCustomPropertiesAndTags')
			.nth(taggedTaskIndex)
			.locator('.TypographyPresentation')
			.allInnerTexts()
		console.log(`EXPECTED TAGS: ${expectedTags}`)
		console.log(`ACTUAL TAGS: ${actualItemTags}`)
		const normalizedExpectedTags = expectedTags.map(tag => tag.toLowerCase()).sort()
		const normalizedActualTags = actualItemTags.map(tag => tag.toLowerCase()).sort()
		console.log(`NORMALIZED EXPECTED TAGS: ${normalizedExpectedTags}`)
		console.log(`NORMALIZED ACTUAL TAGS: ${normalizedActualTags}`)
		expect(normalizedExpectedTags).toEqual(normalizedActualTags)
	}
}