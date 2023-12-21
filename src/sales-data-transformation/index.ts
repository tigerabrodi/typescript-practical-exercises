import inputJSON from './sample.json'

type Product = {
  name: string
  category: string
  price: number
}

type Customer = {
  name: string
  location: string
}

type Sale = {
  saleId: string
  product: Product
  customer: Customer
  quantity: number
  date: string
}

const salesData: Array<Sale> = inputJSON.salesData

function getCurrentDate(): string {
  const date = new Date()
  return date.toLocaleDateString('en-US')
}

function getSalesRecords(): number {
  return salesData.length
}

function getTotalRevenue(): number {
  return salesData.reduce(
    (acc, sale) => acc + sale.product.price * sale.quantity,
    0
  )
}

function getTotalUnits(): number {
  return salesData.reduce((acc, sale) => acc + sale.quantity, 0)
}

type SellingProduct = {
  name: string
  quantity: number
  revenue: number
}

function getBestSellingProducts(): Array<SellingProduct> {
  const bestSellingProductsMap = new Map<string, SellingProduct>()

  salesData.forEach((record) => {
    const currentProduct = bestSellingProductsMap.get(record.product.name) || {
      name: record.product.name,
      quantity: 0,
      revenue: 0,
    }

    bestSellingProductsMap.set(record.product.name, {
      name: record.product.name,
      quantity: currentProduct.quantity + record.quantity,
      revenue: currentProduct.revenue + record.product.price * record.quantity,
    })
  })

  return Array.from(bestSellingProductsMap.values())
    .sort((a, b) => b.quantity - a.quantity)
    .slice(0, 3)
}

type LocationProduct = {
  location: string
  salesCount: number
  revenue: number
}

function getCustomerTrendsByLocation(): Array<LocationProduct> {
  const customerTrendsByLocationMap = new Map<string, LocationProduct>()

  salesData.forEach((record) => {
    const currentLocation = customerTrendsByLocationMap.get(
      record.customer.location
    ) || {
      location: record.customer.location,
      salesCount: 0,
      revenue: 0,
    }

    customerTrendsByLocationMap.set(record.customer.location, {
      location: record.customer.location,
      salesCount: currentLocation.salesCount + 1,
      revenue: currentLocation.revenue + record.product.price * record.quantity,
    })
  })

  return Array.from(customerTrendsByLocationMap.values())
    .sort((a, b) => b.salesCount - a.salesCount)
    .slice(0, 3)
}

// Example usage of the functions
console.log(`Current Date: ${getCurrentDate()}`)
console.log(`Total Sales Records: ${getSalesRecords()}`)
console.log(`Total Revenue: $${getTotalRevenue()}`)
console.log(`Total Units Sold: ${getTotalUnits()}`)

console.log('Best Selling Products:')
getBestSellingProducts().forEach((product, index) => {
  console.log(
    `${index + 1}. ${product.name}, Quantity Sold: ${
      product.quantity
    }, Revenue: $${product.revenue.toFixed(2)}`
  )
})

console.log('Customer Buying Trends by Location:')
getCustomerTrendsByLocation().forEach((location, index) => {
  console.log(
    `${index + 1}. Location: ${location.location}, Sales Count: ${
      location.salesCount
    }, Revenue: $${location.revenue.toFixed(2)}`
  )
})
