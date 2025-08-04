import React from 'react';
import { Layout, Typography } from 'antd';
import { COLORS, FONTS } from '../constants';

const { Header: AntHeader } = Layout;
const { Text } = Typography;

const Header: React.FC = () => {
  const handleAuthorClick = () => {
    window.open('https://hh.ru/resume/0beac820ff0c4809370039ed1f4f7257303247', '_blank');
  };

  return (
    <AntHeader
      style={{
        background: COLORS.white,
        padding: '0 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: `1px solid ${COLORS.cardBackground}`,
        height: '64px',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <img
          src="https://static.tildacdn.com/tild6430-3765-4434-a437-626338323366/__NM_.svg"
          alt="News Media Holding"
          style={{ height: '32px', width: 'auto' }}
        />
      </div>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Text
          style={{
            fontFamily: FONTS.primary,
            fontSize: '14px',
            color: COLORS.text,
          }}
        >
          test assignment by
        </Text>
        <Text
          onClick={handleAuthorClick}
          style={{
            fontFamily: FONTS.primary,
            fontSize: '14px',
            color: COLORS.text,
            cursor: 'pointer',
            textDecoration: 'underline',
            transition: 'color 0.3s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = COLORS.accent;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = COLORS.text;
          }}
        >
          konstantin deryushkin
        </Text>
      </div>
    </AntHeader>
  );
};

export default Header; 