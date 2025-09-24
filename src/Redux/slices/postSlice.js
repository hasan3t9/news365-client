import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../Hook/useAxios"; // adjust path if needed

// ========== Async Thunks ==========

// Fetch all posts
export const fetchNewsPosts = createAsyncThunk(
  "posts/fetchNewsPosts",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("/all-news365");
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Delete a post
export const deleteNewsPost = createAsyncThunk(
  "posts/deleteNewsPost",
  async (id, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/all-news365/${id}`);
      return id; 
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Add a new post
export const addNewsPost = createAsyncThunk(
  "posts/addNewsPost",
  async (postData, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("/all-news365", postData);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Update a post
export const updateNewsPost = createAsyncThunk(
  "posts/updateNewsPost",
  async ({ id, postData }, { rejectWithValue }) => {
    console.log(postData);
    try {
      const res = await axiosInstance.put(`/update-news/${id}`, postData);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// ========== Slice ==========
const postSlice = createSlice({
  name: "posts",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder
      // ===== Fetch =====
      .addCase(fetchNewsPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNewsPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchNewsPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ===== Delete =====
      .addCase(deleteNewsPost.fulfilled, (state, action) => {
        state.data = state.data.filter((post) => post._id !== action.payload);
      })

      // ===== Add =====
      .addCase(addNewsPost.fulfilled, (state, action) => {
        state.data.unshift(action.payload); // add new at top
      })

      // ===== Update =====
      .addCase(updateNewsPost.fulfilled, (state, action) => {
        const index = state.data.findIndex(
          (post) => post._id === action.payload._id
        );
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      });
  },
});

export default postSlice.reducer;
