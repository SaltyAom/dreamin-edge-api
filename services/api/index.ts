import fetch from "node-fetch"
import { APIResponse, MenuData, Menu, APICache } from "./types"

class MaidreaminAPI {
	cache: APICache

	constructor() {
		this.cache = {
			lastValidation: 0,
			data: []
		}
	}

	private async get(url: string): Promise<Menu> {
		let response = await fetch(url),
			{ data: menus }: APIResponse = await response.json()

		return menus
	}

	private getValidationTime(lastValidation: number) {
		let validationTime = new Date(lastValidation)

		return validationTime.setDate(validationTime.getHours() + 6)
	}

	private shouldValidateCache() {
		if (Object.keys(this.cache.data).length === 0) return true

		return (
			this.getValidationTime(this.cache.lastValidation) <
			this.cache.lastValidation
		)
	}

	private toArray(object: Object): any[] {
		// @ts-ignore
		return [].concat(...Object.values(object).map(Object.values))
	}

	private parse(menu: MenuData): MenuData {
		if (menu.name)
			return JSON.parse(`{
				"name": {
					"th": "${menu.name.th}",
					"en": "${menu.name.en}",
					"jp": "${menu.name.jp}"
				},
				"price": "${menu.price}"
			}`)

		return JSON.parse(`{
			"subMenu": [
				${
					typeof menu["sub menu"] !== "undefined"
						? menu["sub menu"].map((subMenu) => `\"${subMenu}\"`)
						: []
				}
			],
			"price": ${menu.price}
		}`)
	}

	public async getMenu() {
		if (!this.shouldValidateCache()) return this.cache.data

		let menus = this.toArray(
			await this.get("https://maidreamin.now.sh/menu")
		)

		let parsedMenu = menus.map((menu) => this.parse(menu))

		// Update Cache
		this.cache = {
			lastValidation: Date.now(),
			data: parsedMenu
		}

		return parsedMenu
	}
}

export default MaidreaminAPI
