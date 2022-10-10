import { Iconfig, Product, ProductState, RootProduct } from './../../types/types';
import {createAsyncThunk, createSlice, current, PayloadAction} from "@reduxjs/toolkit"
import axios from "axios"


const initialState:ProductState = {

  data:null,
  loading:false,
  error:'',
  filteredData:[]

}


export const fetchProduct = createAsyncThunk("fetchProduct",async() =>{
  
  const token:string = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imd1bmR1emdlY2U1NDZAZ21haWwuY29tIiwiZ2l0aHViIjoiaHR0cHM6Ly9naXRodWIuY29tL1NlbG1hbi1TIiwiaWF0IjoxNjY1MzAwOTQzLCJleHAiOjE2NjU3MzI5NDN9.6kC34j4SpK-qcskuxPObcRFHrmAYC6JlKHgoJNh0EQk"
  
  const getProductUrl:string = "https://upayments-studycase-api.herokuapp.com/api/products"

  const config:Iconfig = {
    headers: {
      Authorization:
        `Bearer ${token}`,
    },
  };

  const response = await axios.get<RootProduct>(getProductUrl,config)

  return response.data.products
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
    });
    
    builder.addCase(postProduct.fulfilled, (state,action)=> {
      state.loading = false;
     state.error='post done' 
    });

    builder.addCase(postProduct.rejected, (state,action)=> {
      state.loading = false;
     state.error='Post is error'
    });

  },
})

export const {filteredCategory} = productSlice.actions
export default productSlice.reducer

