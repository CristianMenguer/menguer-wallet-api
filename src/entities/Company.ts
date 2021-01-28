import Quote from "./Quote"

// Class Company and its constructor defined here

class Company {
    _id?: string
    id_api: number
    name: string
    code: string
    code_rdz: string
    economic_sector: string
    subsector: string
    segment: string
    quotes?: Quote[]
    created_at?: Date
    updated_at?: Date

	constructor(id_api: number, code_rdz: string, name: string, code: string, economic_sector: string, subsector: string, segment: string) {
        this.id_api = id_api
        this.code_rdz = code_rdz
        this.name = name
        this.code = code
        this.economic_sector = economic_sector
        this.subsector = subsector
        this.segment = segment
        this.created_at = new Date()
        this.updated_at = new Date()
    }
}

export default Company