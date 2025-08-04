import { Post } from '../types';

export const generateRandomReactions = (): number => {
  return Math.floor(Math.random() * 50) + 1;
};

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
};

export const formatDate = (date: string): string => {
  return new Date(date).toLocaleDateString('ru-RU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const calculateTotalReactions = (posts: Post[]): number => {
  return posts.reduce((sum, post) => sum + post.reactions, 0);
};

export const calculateTotalTags = (posts: Post[]): number => {
  return posts.reduce((sum, post) => sum + (post.tags?.length || 0), 0);
}; 