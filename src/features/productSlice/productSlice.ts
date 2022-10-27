import { Iconfig, Product, ProductState, RootProduct } from './../../types/types';
import {createAsyncThunk, createSlice, current, PayloadAction} from "@reduxjs/toolkit"
import axios from "axios"
import {products} from '../../helper/data'


const initialState:ProductState = {

  data:null,
  loading:false,
  error:'',
  filteredData:[],
  favorites:[]

}


export const fetchProduct = createAsyncThunk("fetchProduct",async() =>{
  
  const token:string = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNkc3JobDI0QGdtYWlsLmNvbSIsImdpdGh1YiI6Imh0dHBzOi8vZ2l0aHViLmNvbS9TZWxtYW4tUyIsImlhdCI6MTY2NjU5OTAyMywiZXhwIjoxNjY3MDMxMDIzfQ.7r--Ac7Jhv3WsvXOj1P22jDIpbwGBuyTxQDdUEvuRPk"
  
  const getProductUrl:string = "https://upayments-studycase-api.herokuapp.com/api/products"

  const config:Iconfig = {
    headers: {
      Authorization:
        `Bearer ${token}`,
    },
  };

  try {
    
    const response = await axios.get<RootProduct>(getProductUrl,config)
 
    return response.data.products
  } catch (error) {
    // if token is not valid
    return products
  }
})

export const postProduct = createAsyncThunk("postProduct",async(obj:any) =>{
  
  const token:string = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imd1bmR1emdlY2U1NDZAZ21haWwuY29tIiwiZ2l0aHViIjoiaHR0cHM6Ly9naXRodWIuY29tL1NlbG1hbi1TIiwiaWF0IjoxNjY1MzAwOTQzLCJleHAiOjE2NjU3MzI5NDN9.6kC34j4SpK-qcskuxPObcRFHrmAYC6JlKHgoJNh0EQk"
  
  const getProductUrl:string = "https://upayments-studycase-api.herokuapp.com/api/products"

  const config:Iconfig = {
    headers: {
      Authorization:
        `Bearer ${token}`,
    },
  };

  const response = await axios.post(getProductUrl,obj,config)
  return response.data.products
})

const productSlice = createSlice({

  name:'product',
  initialState,
  reducers:{
    filteredCategory:(state,action:PayloadAction<string>)=>{
      const newData = current(state).data?.filter((product)=>product.category===action.payload)
      state.filteredData = newData
   },
   addFavorite:(state,action:PayloadAction<Product>)=>{
    state.favorites?.push(action.payload)
    return state
   },
   removeFavorite:(state,action:PayloadAction<Product>)=>{
    state.favorites = state.favorites?.filter((fav)=> fav._id!==action.payload._id)
  
    return state
   },
   deleteProduct:(state,action:PayloadAction<Product>)=>{
    state.data = state.data?.filter((fav)=> fav._id!==action.payload._id)
  
    return state
   }
  },

  extraReducers:(builder)=>{
    builder.addCase(fetchProduct.pending, (state,action)=> {
      state.loading = true;
      state.error =''
    });

    builder.addCase(fetchProduct.fulfilled, (state,action:PayloadAction<any>)=> {
      state.data =action.payload;
      state.loading = false;
    });

    builder.addCase(fetchProduct.rejected, (state,action)=> {
      state.loading = false;
      state.error ='Error Fetchin product data'
    });

    builder.addCase(postProduct.pending, (state,action)=> {
      state.loading = false;
     state.error='Post is pending'
     console.log(state.error);
     
    });
    
    builder.addCase(postProduct.fulfilled, (state,action)=> {
      state.loading = false;
     state.error='post done' 
     console.log(state.error);
    });

    builder.addCase(postProduct.rejected, (state,action)=> {
      state.loading = false;
     state.error='Post is error'
     console.log(state.error);
    });

  },
})

export const {filteredCategory,addFavorite,removeFavorite,deleteProduct} = productSlice.actions
export default productSlice.reducer

