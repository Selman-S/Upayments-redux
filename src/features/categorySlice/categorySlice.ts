import { Category, CategoryState, Iconfig } from './../../types/types';
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit"
import axios from "axios"
import {category} from '../../helper/data'

const initialState:CategoryState = {

  data:null,
  loading:false,
  error:''

}


export const fetchCategory = createAsyncThunk("fetchCategory",async() =>{
  
  const token:string = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNkc3JobDI0QGdtYWlsLmNvbSIsImdpdGh1YiI6Imh0dHBzOi8vZ2l0aHViLmNvbS9TZWxtYW4tUyIsImlhdCI6MTY2NjU5OTAyMywiZXhwIjoxNjY3MDMxMDIzfQ.7r--Ac7Jhv3WsvXOj1P22jDIpbwGBuyTxQDdUEvuRPk"
  
  const getCategoryUrl:string = "https://upayments-studycase-api.herokuapp.com/api/categories/"

  const config:Iconfig = {
    headers: {
      Authorization:
        `Bearer ${token}`,
    },
  };
  
  try {
    const response = await axios.get<Category[]>(getCategoryUrl,config)
    

    return response.data
    
  } catch (error) {
        // if token is not valid
    return category
  }

})


const categorySlice = createSlice({

  name:'category',
  initialState,
  reducers:{},

  extraReducers:(builder)=>{
    builder.addCase(fetchCategory.pending, (state,action)=> {
      state.loading = true;
      state.error =''
    });

    builder.addCase(fetchCategory.fulfilled, (state,action:PayloadAction<any>)=> {
      state.data =action.payload;
      state.loading = false;
    });

    builder.addCase(fetchCategory.rejected, (state,action)=> {
      state.loading = false;
      state.error ='Error Fetchin category data'
    });

  },
})

export default categorySlice.reducer

