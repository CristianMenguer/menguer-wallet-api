import Quote from "./Quote"

class Company {
    _id?: string
    name: string
    code: string
    economic_sector: string
    subsector: string
    segment: string
    quotes?: Quote[]
    created_at?: Date
    updated_at?: Date

	constructor(name: string, code: string, economic_sector: string, subsector: string, segment: string) {
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