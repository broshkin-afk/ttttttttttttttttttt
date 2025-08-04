import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Post, NewsState, ApiResponse } from '../types';
import { API_BASE_URL, POSTS_PER_PAGE } from '../constants';
import { generateRandomReactions } from '../utils';

const initialState: NewsState = {
  posts: [],
  loading: false,
  error: null,
  hasMore: true,
  skip: 0,
};

export const fetchPosts = createAsyncThunk(
  'news/fetchPosts',
  async (skip: number, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_BASE_URL}?limit=${POSTS_PER_PAGE}&skip=${skip}`);
      if (!response.ok) {
        throw new Error('Failed to fetch posts');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Unknown error');
    }
  }
);

const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    clearPosts: (state) => {
      state.posts = [];
      state.skip = 0;
      state.hasMore = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        const newPosts = action.payload.posts.map((post: any) => ({
          ...post,
          tags: post.tags || [],
          reactions: generateRandomReactions(),
        }));
        
        // Проверяем, что это первая загрузка или добавление новых постов
        if (state.skip === 0) {
          state.posts = newPosts;
        } else {
          // Проверяем на дубликаты по ID
          const existingIds = new Set(state.posts.map((post: Post) => post.id));
          const uniqueNewPosts = newPosts.filter((post: Post) => !existingIds.has(post.id));
          state.posts = [...state.posts, ...uniqueNewPosts];
        }
        
        state.skip += POSTS_PER_PAGE;
        state.hasMore = newPosts.length === POSTS_PER_PAGE;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearPosts } = newsSlice.actions;
export default newsSlice.reducer; 