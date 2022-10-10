export interface Category {
  _id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

export interface RootCategory {
  message: string;
  categories: Category[];
}

export interface CategoryState {
  data:RootCategory|null,
  loading:boolean,
  error:string
  }

export interface Iconfig{
  headers: {
    Authorization:
      string,
  },
};

export interface Product {
  _id: string;
  name: string;
  avatar: string;
  description: string;
  price: number;
  category: string;
  developerEmail: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

export interface RootProduct {
  message: string;
  products: Product[];
}

export interface ProductState {
  data:Product[]|null|undefined,
  loading:boolean,
  error:string,
  filteredData:Product[]|undefined
  }

 export interface IpostObj  {
    name: string,
    avatar: string,
    description: string,
    price: 1679,
    category: string,
    developerEmail: string,
  }