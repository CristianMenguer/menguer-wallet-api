class Quote {
    _id?: string
    id_api: number
    id_company: number
    code_stock: string
    open: number
    close: number
    max: number
    min: number
    volume: number
    dt_pregao: Date
    created_at?: Date
    updated_at?: Date

	constructor(id_api: number, id_company: number, code_stock: string, open: number, close: number, max: number, min: number, volume: number, dt_pregao: Date) {
        this.id_api = id_api
        this.id_company = id_company
        this.code_stock = code_stock
        this.open = open
        this.close = close
        this.max = max
        this.min = min
        this.volume = volume
        this.dt_pregao = dt_pregao
        this.created_at = new Date()
        this.updated_at = new Date()
    }
}

export default Quote