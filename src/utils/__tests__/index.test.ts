import {
  generateRandomReactions,
  truncateText,
  formatDate,
  calculateTotalReactions,
  calculateTotalTags,
} from '../index';
import { Post } from '../../types';

describe('Utils', () => {
  describe('generateRandomReactions', () => {
    it('returns a number between 1 and 50', () => {
      const reactions = generateRandomReactions();
      expect(reactions).toBeGreaterThanOrEqual(1);
      expect(reactions).toBeLessThanOrEqual(50);
    });
  });

  describe('truncateText', () => {
    it('returns original text if length is less than maxLength', () => {
      const result = truncateText('Hello', 10);
      expect(result).toBe('Hello');
    });

    it('truncates text and adds ellipsis if longer than maxLength', () => {
      const result = truncateText('Hello World', 5);
      expect(result).toBe('Hello...');
    });
  });

  describe('formatDate', () => {
    it('formats date correctly', () => {
      const result = formatDate('2023-12-25');
      expect(result).toMatch(/\d+ \w+ \d{4}/);
    });
  });

  describe('calculateTotalReactions', () => {
    it('calculates total reactions correctly', () => {
      const posts: Post[] = [
        { id: 1, title: 'Test', body: 'Test', userId: 1, tags: [], reactions: 10 },
        { id: 2, title: 'Test2', body: 'Test2', userId: 1, tags: [], reactions: 20 },
      ];
      const result = calculateTotalReactions(posts);
      expect(result).toBe(30);
    });
  });

  describe('calculateTotalTags', () => {
    it('calculates total tags correctly', () => {
      const posts: Post[] = [
        { id: 1, title: 'Test', body: 'Test', userId: 1, tags: ['tag1', 'tag2'], reactions: 10 },
        { id: 2, title: 'Test2', body: 'Test2', userId: 1, tags: ['tag3'], reactions: 20 },
      ];
      const result = calculateTotalTags(posts);
      expect(result).toBe(3);
    });

    it('handles posts without tags', () => {
      const posts: Post[] = [
        { id: 1, title: 'Test', body: 'Test', userId: 1, tags: [], reactions: 10 },
        { id: 2, title: 'Test2', body: 'Test2', userId: 1, tags: [], reactions: 20 },
      ];
      const result = calculateTotalTags(posts);
      expect(result).toBe(0);
    });
  });
}); 