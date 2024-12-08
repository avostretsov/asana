import { Page, expect } from '@playwright/test'
import { normalizeText, normalizeAndSortTags } from '../../lib/helper'

export class Table {
	readonly page: Page
  
	constructor(page: Page) {
		this.page = page
	}

	/**
	 * @param columnName project plan column names: 'Doing', 'To do', 'Done', 'Untitled section';
	 * work requests column names: 'New Requests', 'Backlog', In Progress', 'Completed'.
	 * The value to be pulled from projectConfig.ts
	 * @returns index of the column under test
	 */
	async findColumnIndex(columnName: string): Promise<number> {
		const columnHeaders: string[] = await this.page
			.locator('.BoardColumnHeaderTitle')
			.allInnerTexts()
		const normalizedHeaders = columnHeaders.map(normalizeText)
		const columnIndex: number = normalizedHeaders.indexOf(columnName)
		return columnIndex
	}

	/**
	 * @returns all Task Names on the page
	 */
	async returnAllItems(): Promise<string[]> {
		let allItems = await this.page
			.locator('.BoardCard-taskName')
			.allInnerTexts()
		return allItems
	}

	/**
	 * @returns all untagged Task Names on the page
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
	 * @returns all tagged Task Names on the page
	 */
	async returnAllTaggedItems(): Promise<string[]> {
		const allItems = await this.returnAllItems()
		const untaggedItems = await this.returnUntaggedItems()
		const allTaggedItems = allItems.filter(item => !untaggedItems.includes(item))
  	return allTaggedItems
	}

	/**
	 * @param columnIndex Index of the column
	 * @returns all Task Names from particular column
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
	 * work requests column names: 'New Requests', 'Backlog', In Progress', 'Completed'.
	 * The value to be pulled from projectConfig.ts

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
		let actualTags: string[] = await this.page
			.locator('.BoardCardCustomPropertiesAndTags')
			.nth(taggedTaskIndex)
			.locator('.TypographyPresentation')
			.allInnerTexts()
		const normalizedExpectedTags = normalizeAndSortTags(expectedTags)
		const normalizedActualTags = normalizeAndSortTags(actualTags)
		expect(normalizedExpectedTags).toEqual(normalizedActualTags)
	}
}