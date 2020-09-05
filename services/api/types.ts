export type Menu = Record<string, Record<string, MenuData>>

export interface MenuData {
	name?: {
		th: string
		en: string
		jp: string
	}
	'sub menu'?: string[]
	price: number
}

export interface APIResponse {
    success: boolean
    data: Menu
}

export interface APICache {
	lastValidation: number
	data: MenuData[]
}