//Interface used in the whole app to the Response of the API for insertion of companies
interface CompanyResponseInsert {
    ops: Company[]
    insertedId: string
}