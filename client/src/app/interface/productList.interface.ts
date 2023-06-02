export interface Product{
    productId: number,
    firstProduct: string,
    secondProduct: string,
    thirdProduct: string,
    productName: string,
    color: string[],
    price: number,
    stock: number,
    description: string
}

export interface Products{
    products:[{
        productId: number,
        firstProduct: string,
        secondProduct: string,
        thirdProduct: string,
        productName: string,
        color: any[],
        price: number,
        stock: number,
        description: string
    }]
}