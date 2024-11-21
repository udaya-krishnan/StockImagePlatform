import axios from "axios"
 const url=' http://localhost:5555'

import { createAsyncThunk } from "@reduxjs/toolkit";



export const registerUser = createAsyncThunk(
  "user/register",
  async ({ name, email, phoneNumber, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${url}/register`, {
        name,
        email,
        phoneNumber,
        password,
      });
      return response.data;
    } catch (error) {
      console.error("Error in registerUser:", error);
      // Reject with a message for proper error handling
      return rejectWithValue(error.response.data || "Something went wrong");
    }
  }
);

export const login= createAsyncThunk(
    'user/login',
    async({email,password},{rejectWithValue})=>{
        console.log(email,password)
        const response=await axios.post(`${url}/login`,{email,password},{withCredentials:true})
        console.log(response);
        return response.data
    }
)

export const uploadImage = createAsyncThunk(
    'user/upload',
    async ({ formData }, { rejectWithValue }) => {
      try {
        const response = await axios.post(
          `${url}/upload`,
          formData,  // Send the formData directly
          { withCredentials: true }
        );
        return response.data;
      } catch (error) {
        console.error('Error uploading image:', error);
        return rejectWithValue(error.response.data);
      }
    }
  );
  


  export const fetchImage= createAsyncThunk(
    'user/fetchImage',
    async(id,{rejectWithValue})=>{
        // console.log(email,password)
        const response=await axios.get(`${url}/fetchimages?id=${id}`,{withCredentials:true})
        console.log(response);
        return response.data
    }
)


export const updateImageTitle= createAsyncThunk(
  'user/updateImageTitle',
  async({id,title},{rejectWithValue})=>{
      // console.log(email,password)
      const response=await axios.put(`${url}/updateimagetitle`,{id,title},{withCredentials:true})
      console.log(response);
      return response.data
  }
)


export const updateImage= createAsyncThunk(
  'user/updateImage',
  async({formData},{rejectWithValue})=>{
      // console.log(email,password)
      const response=await axios.put(`${url}/updateimage`,formData,{withCredentials:true})
      console.log(response);
      return response.data
  }
)



export const deleteImage= createAsyncThunk(
  'user/deleteImage',
  async({id},{rejectWithValue})=>{
      // console.log(email,password)
      const response=await axios.delete(`${url}/deleteimage?id=${id}`,{withCredentials:true})
      console.log(response);
      return response.data
  }
)


// In your userThunk.js
export const fogortPassword = ({ email, password }) => async (dispatch) => {
  try {
    console.log(email, password, 'this'); // Log email and password

    // Call the API to reset the password
    const response = await axios.post(`${url}/forgot`, { email, password });

    // Dispatch the success action if the request succeeds
    dispatch({ type: 'PASSWORD_RESET_SUCCESS', payload: response.data });
  } catch (error) {
    console.error('Error resetting password:', error);
    // Dispatch an error action in case of failure
    
    dispatch({ type: 'PASSWORD_RESET_FAILURE', error: error.response?.data || error.message });
    throw error
  }
};




// export const fogortPassword= createAsyncThunk(
//   'user/fogortPassword',
//   async({email,password},{rejectWithValue})=>{
//       // console.log(email,password)
//       const response=await axios.post(`${url}/forgot`,{email,password},{withCredentials:true})
//       console.log(response);
//       return response.data
//   }
