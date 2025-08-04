import React from 'react';
import { Spin, Typography } from 'antd';
import { MESSAGES, FONTS, COLORS } from '../constants';

const { Text } = Typography;

interface LoadingSpinnerProps {
  message?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ message = MESSAGES.loading }) => {
    return (
    <div style={{ 
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 16,
      zIndex: 1000,
      background: COLORS.white,
      padding: '32px',
      borderRadius: '8px',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
    }}>
      <Spin size="large" />
      <Text 
        style={{
          fontFamily: FONTS.primary,
          color: COLORS.text,
          fontSize: FONTS.body.size,
        }}
      >
        {message}
      </Text>
    </div>
  );
};

export default LoadingSpinner; 