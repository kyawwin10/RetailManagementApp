export type ProductAddPayload = {
    productName: string
    price: number
    stock: number
    profitPerItem: number
}

export type GetAllProductyPayload = {
    productID: string
    productName: string
    price: number
    stock: number
    profitPerItem: number
}

export type ProductUpdatePayload = {
    productID: string
    productName: string
    price: number
    stock: number
    profitPerItem: number
}

export type ProductDeletePayload = {
    productID: string
}

export type ProductSalePayload  = {
    productID: string
    quantitySold: number
}

export type GetAllSalePayload = {
    saleID: string
    productID: string
    quantitySold: number
    totalAmount: number
    totalProfit: number
    salesDate: string
}

export type SaleReportPayload = {
    totalPrice: number
    totalProfit: number
}

export type CartProductType = {
    productID: string
    productName: string
    price: number
    stock: number
    profitPerItem: number
    cartQuantity: number
}