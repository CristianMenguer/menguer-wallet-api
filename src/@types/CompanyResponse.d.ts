//Interface used in the whole app to the Response of the API for companies
interface CompanyResponse {
    id: number
    cd_acao_rdz: string
    nm_empresa: string
    setor_economico: string
    subsetor: string
    segmento: string
    segmento_b3: string
    nm_segmento_b3: string
    cd_acao: string
    tx_cnpj: string
    vl_cnpj: string
    vl_medcreated_atio: string
    updated_at: string
}