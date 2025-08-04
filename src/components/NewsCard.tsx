import React from 'react';
import { Card, Tag, Space, Typography } from 'antd';
import { LikeOutlined } from '@ant-design/icons';
import { Post } from '../types';
import { COLORS, MAX_BODY_LINES, FONTS } from '../constants';

const { Title, Paragraph } = Typography;

interface NewsCardProps {
  post: Post;
  onClick: (post: Post) => void;
}

const NewsCard: React.FC<NewsCardProps> = ({ post, onClick }) => {
  return (
    <Card
      hoverable
      onClick={() => onClick(post)}
      style={{ 
        marginBottom: 16, 
        borderRadius: '8px',
        background: COLORS.cardBackground,
        cursor: 'pointer',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
      }}
      bodyStyle={{ 
        padding: 20,
        background: COLORS.cardBackground,
        borderRadius: '8px',
      }}
    >
      <Title 
        level={4} 
        style={{ 
          marginBottom: 12, 
          marginTop: 0,
          color: COLORS.text,
          fontFamily: FONTS.primary,
          fontSize: FONTS.subtitle.size,
          fontWeight: FONTS.subtitle.weight,
          lineHeight: 1.3,
        }}
      >
        {post.title}
      </Title>
      
      <Paragraph
        ellipsis={{ rows: MAX_BODY_LINES, expandable: false }}
        style={{ 
          fontSize: FONTS.body.size,
          fontWeight: FONTS.body.weight,
          lineHeight: 1.6, 
          color: COLORS.text,
          marginBottom: 16,
          fontFamily: FONTS.primary,
        }}
      >
        {post.body}
      </Paragraph>
      
      <Space direction="vertical" size="small" style={{ width: '100%' }}>
        {post.tags && post.tags.length > 0 && (
          <div>
            {post.tags.map((tag, index) => (
              <Tag 
                key={index} 
                style={{ 
                  marginBottom: 4,
                  background: COLORS.tagBackground,
                  color: COLORS.text,
                  border: 'none',
                  borderRadius: '16px',
                  padding: '4px 12px',
                  fontSize: '14px',
                  fontFamily: FONTS.primary,
                }}
              >
                {tag}
              </Tag>
            ))}
          </div>
        )}
        
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <LikeOutlined style={{ color: COLORS.accent }} />
          <span style={{ 
            fontSize: 14, 
            color: COLORS.text,
            fontFamily: FONTS.primary,
            fontWeight: 500,
          }}>
            {post.reactions} реакций
          </span>
        </div>
      </Space>
    </Card>
  );
};

export default NewsCard; 