export interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
  tags: string[];
  reactions: number;
}

export interface NewsState {
  posts: Post[];
  loading: boolean;
  error: string | null;
  hasMore: boolean;
  skip: number;
}

export interface ApiResponse {
  posts: Post[];
  total: number;
  skip: number;
  limit: number;
} 