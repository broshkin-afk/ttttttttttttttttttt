import React from 'react';
import { Modal, Typography, Tag, Space, Divider } from 'antd';
import { LikeOutlined, CloseOutlined } from '@ant-design/icons';
import { Post } from '../types';
import { COLORS, FONTS } from '../constants';

const { Title, Paragraph } = Typography;

interface NewsModalProps {
  post: Post | null;
  visible: boolean;
  onClose: () => void;
}

const NewsModal: React.FC<NewsModalProps> = ({ post, visible, onClose }) => {
  if (!post) return null;

  return (
    <Modal
      open={visible}
      onCancel={onClose}
      footer={null}
      width={800}
      centered
      closeIcon={<CloseOutlined style={{ color: COLORS.text }} />}
      bodyStyle={{
        padding: '32px',
        background: COLORS.white,
        borderRadius: '8px',
      }}
    >
      <div style={{ position: 'relative' }}>
        <Title
          level={2}
          style={{
            fontFamily: FONTS.primary,
            fontSize: FONTS.subtitle.size,
            fontWeight: FONTS.subtitle.weight,
            color: COLORS.text,
            marginBottom: '24px',
            lineHeight: 1.3,
          }}
        >
          {post.title}
        </Title>
        
        <Divider style={{ margin: '24px 0' }} />
        
        <Paragraph
          style={{
            fontFamily: FONTS.primary,
            fontSize: FONTS.body.size,
            fontWeight: FONTS.body.weight,
            color: COLORS.text,
            lineHeight: 1.6,
            marginBottom: '24px',
            whiteSpace: 'pre-wrap',
          }}
        >
          {post.body}
        </Paragraph>
        
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          {post.tags && post.tags.length > 0 && (
            <div>
              <Title
                level={5}
                style={{
                  fontFamily: FONTS.primary,
                  fontSize: '16px',
                  fontWeight: 600,
                  color: COLORS.text,
                  marginBottom: '12px',
                }}
              >
                Теги:
              </Title>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {post.tags.map((tag, index) => (
                  <Tag
                    key={index}
                    style={{
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
            </div>
          )}
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <LikeOutlined style={{ color: COLORS.accent, fontSize: '18px' }} />
            <span
              style={{
                fontFamily: FONTS.primary,
                fontSize: '16px',
                fontWeight: 500,
                color: COLORS.text,
              }}
            >
              {post.reactions} реакций
            </span>
          </div>
        </Space>
      </div>
    </Modal>
  );
};

export default NewsModal; 