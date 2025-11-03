export type RootStackParamlist = {
    MainTabs:undefined,
    ProductDetail:{_id:string},
}

export type TabNavigatorParamlist = {
    Home : undefined;
    Cart:undefined;
    Profile:undefined;
}
export type ItemPrice = {
  currency: '$';
  size: 'S' | 'M' | 'L';
  quantity: number;
  price: number;
  // add quantity by code....
};

export type ProductCardType ={
    _id?:string,
    image?:string,
    name:string,
    brand:string,
    average_rate:number|string,
    price:number,
    onPress ?: ()=> void,
}
export type CartProductType = {
  _id?: string;
  images: string[];
  name: string;
  brand: string;
  prices: ItemPrice[];
};

export type CartSliceType = {
  cartList: CartProductType[];
  totalPrice: number; // -> calc the total price
  totalItems: number;
};