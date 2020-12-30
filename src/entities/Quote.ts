class Quote {
    _id?: string
    id_stock: string
    code_stock: string
    open: number
    close: number
    max: number
    min: number
    volume: number
    created_at?: Date
    updated_at?: Date

	constructor(id_stock: string, code_stock: string, open: number, close: number, max: number, min: number, volume: number) {
        this.id_stock = id_stock
        this.code_stock = code_stock
        this.open = open
        this.close = close
        this.max = max
        this.min = min
        this.volume = volume
        this.created_at = new Date()
        this.updated_at = new Date()
    }
}

export default Quote