export interface PurchaseOrder{
  name: string
  address: string
  email: string
  deliveryDate: string
  rush: boolean
  lineItems: LineItem[]
}

export interface LineItem{
  itemName: string
  quantity: number
  unitPrice: number
}
