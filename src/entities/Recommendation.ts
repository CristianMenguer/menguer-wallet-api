// Class Recommendation and its constructor defined here
class Recommendation {
    _id?: string
    id_strategy: number
    date: Date
    code_stock: string
    //result => 'buy' | 'sell' | 'nothing'
    result: string
    created_at?: Date
    updated_at?: Date

    constructor(id_strategy: number, date: Date, code_stock: string, result: string) {
        this.id_strategy = id_strategy
        this.date = date
        this.code_stock = code_stock
        this.result = result
        this.created_at = new Date()
        this.updated_at = new Date()
    }
}

export default Recommendation