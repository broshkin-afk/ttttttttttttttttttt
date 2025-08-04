import React from 'react';
import { Row, Col, Card } from 'antd';
import { FileTextOutlined } from '@ant-design/icons';
import { useAppSelector } from '../store/hooks';
import { COLORS, FONTS } from '../constants';

const NewsStats: React.FC = () => {
  const { posts } = useAppSelector((state) => state.news);
  
  const totalPosts = posts.length;
  
  return (
    <Card 
      style={{ 
        marginBottom: 24, 
        borderRadius: '8px',
        background: COLORS.cardBackground,
        border: 'none',
      }}
      bodyStyle={{
        background: COLORS.cardBackground,
        fontFamily: FONTS.primary,
        borderRadius: '8px',
        padding: '12px 20px',
      }}
    >
      <Row gutter={16}>
        <Col span={24}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
          }}>
            <span style={{
              fontFamily: FONTS.primary,
              fontSize: FONTS.body.size,
              fontWeight: FONTS.body.weight,
              color: COLORS.text,
            }}>
              Показано новостей
            </span>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}>
              <FileTextOutlined style={{ color: COLORS.accent, fontSize: '16px' }} />
              <span style={{
                fontFamily: FONTS.primary,
                fontSize: FONTS.body.size,
                fontWeight: FONTS.body.weight,
                color: COLORS.accent,
              }}>
                {totalPosts}
              </span>
            </div>
          </div>
        </Col>
      </Row>
    </Card>
  );
};

export default NewsStats; 