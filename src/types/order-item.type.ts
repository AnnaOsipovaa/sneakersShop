import { ProductType } from "./product.type"

export type OrderItemType = {
    id: number,
    sum: number,
    status: string,
    date_create: Date,
    products: ProductType[]
}