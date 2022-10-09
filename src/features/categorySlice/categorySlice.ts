import { Category, CategoryState, Iconfig, RootCategory } from './../../types/types';
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit"
import axios from "axios"


const initialState:CategoryState = {

  data:null,
  loading:false,
  error:''

}


export const fetchCategory = createAsyncThunk("fetchCategory",async() =>{
  
  const token:string = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imd1bmR1emdlY2U1NDZAZ21haWwuY29tIiwiZ2l0aHViIjoiaHR0cHM6Ly9naXRodWIuY29tL1NlbG1hbi1TIiwiaWF0IjoxNjY1MzAwOTQzLCJleHAiOjE2NjU3MzI5NDN9.6kC34j4SpK-qcskuxPObcRFHrmAYC6JlKHgoJNh0EQk"
  
  const getCategoryUrl:string = "https://upayments-studycase-api.herokuapp.com/api/categories/"

  const config:Iconfig = {
    headers: {
      Authorization:
        `Bearer ${token}`,
    },
  };
  
  const response = await axios.get<Category>(getCategoryUrl,config)
  return response.data

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
      console.log(action.payload);
    });

    builder.addCase(fetchCategory.rejected, (state,action)=> {
      state.loading = false;
      state.error ='Error Fetchin category data'
    });

  },
})

export default categorySlice.reducer

