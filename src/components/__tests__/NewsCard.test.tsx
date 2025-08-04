import React from 'react';
import { render, screen } from '@testing-library/react';
import NewsCard from '../NewsCard';
import { Post } from '../../types';

const mockPost: Post = {
  id: 1,
  title: 'Test Post Title',
  body: 'This is a test post body that should be displayed in the card component.',
  userId: 1,
  tags: ['test', 'news', 'react'],
  reactions: 25,
};

describe('NewsCard', () => {
  it('renders post title', () => {
    render(<NewsCard post={mockPost} />);
    expect(screen.getByText('Test Post Title')).toBeInTheDocument();
  });

  it('renders post body', () => {
    render(<NewsCard post={mockPost} />);
    expect(screen.getByText(/This is a test post body/)).toBeInTheDocument();
  });

  it('renders tags', () => {
    render(<NewsCard post={mockPost} />);
    expect(screen.getByText('test')).toBeInTheDocument();
    expect(screen.getByText('news')).toBeInTheDocument();
    expect(screen.getByText('react')).toBeInTheDocument();
  });

  it('renders reactions count', () => {
    render(<NewsCard post={mockPost} />);
    expect(screen.getByText('25 реакций')).toBeInTheDocument();
  });

  it('handles post without tags', () => {
    const postWithoutTags = { ...mockPost, tags: [] };
    render(<NewsCard post={postWithoutTags} />);
    expect(screen.getByText('Test Post Title')).toBeInTheDocument();
  });
}); 