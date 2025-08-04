import React, { useEffect, useCallback, useRef, useState } from 'react';
import { List, Alert, Typography, Button } from 'antd';
import { ArrowUpOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchPosts } from '../store/newsSlice';
import NewsCard from './NewsCard';
import LoadingSpinner from './LoadingSpinner';
import NewsStats from './NewsStats';
import NewsModal from './NewsModal';
import { COLORS, MESSAGES, FONTS } from '../constants';
import { Post } from '../types';

const { Title } = Typography;

const NewsFeed: React.FC = () => {
  const dispatch = useAppDispatch();
  const { posts, loading, error, hasMore, skip } = useAppSelector((state) => state.news);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadingRef = useRef<HTMLDivElement>(null);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Загрузка начальных данных
  useEffect(() => {
    if (posts.length === 0) {
      dispatch(fetchPosts(0));
    }
  }, [dispatch, posts.length]);

  // Обработчики для модального окна
  const handlePostClick = (post: Post) => {
    setSelectedPost(post);
    setModalVisible(true);
  };

  const handleModalClose = () => {
    setModalVisible(false);
    setSelectedPost(null);
  };

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Отслеживание скролла для показа кнопки
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Настройка Intersection Observer для бесконечной прокрутки
  const lastElementRef = useCallback((node: HTMLDivElement) => {
    if (loading) return;
    
    if (observerRef.current) {
      observerRef.current.disconnect();
    }
    
    observerRef.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore && !loading) {
        dispatch(fetchPosts(skip));
      }
    });
    
    if (node) {
      observerRef.current.observe(node);
    }
  }, [loading, hasMore, skip, dispatch]);

  if (error) {
    return (
      <Alert
        message="Ошибка загрузки"
        description={error}
        type="error"
        showIcon
        style={{ margin: 16 }}
      />
    );
  }

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: 16 }}>
      {posts.length > 0 && <NewsStats />}
      
      <List
        dataSource={posts}
        renderItem={(post, index) => (
          <List.Item style={{ padding: 0, border: 'none' }}>
            <div
              ref={index === posts.length - 1 ? lastElementRef : null}
              style={{ width: '100%' }}
            >
              <NewsCard post={post} onClick={handlePostClick} />
            </div>
          </List.Item>
        )}
        locale={{
          emptyText: loading ? MESSAGES.loading : MESSAGES.noPosts
        }}
      />
      
      {loading && <LoadingSpinner />}
      
      {!hasMore && posts.length > 0 && (
        <div style={{ textAlign: 'center', padding: 20, color: COLORS.text }}>
          {MESSAGES.noMorePosts}
        </div>
      )}
      
      <NewsModal
        post={selectedPost}
        visible={modalVisible}
        onClose={handleModalClose}
      />
      
      {showScrollTop && (
        <Button
          type="primary"
          icon={<ArrowUpOutlined />}
          onClick={handleScrollTop}
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            background: COLORS.accent,
            border: 'none',
            boxShadow: '0 4px 12px rgba(7, 108, 252, 0.3)',
            zIndex: 1000,
          }}
        />
      )}
    </div>
  );
};

export default NewsFeed; 