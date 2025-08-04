import React from 'react';
import { Provider } from 'react-redux';
import { ConfigProvider, Layout } from 'antd';
import ruRU from 'antd/locale/ru_RU';
import { store } from './store/store';
import Header from './components/Header';
import NewsFeed from './components/NewsFeed';
import { COLORS } from './constants';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <ConfigProvider locale={ruRU}>
        <Layout style={{ minHeight: '100vh', background: COLORS.background }}>
          <Header />
          <Layout.Content style={{ background: COLORS.background }}>
            <NewsFeed />
          </Layout.Content>
        </Layout>
      </ConfigProvider>
    </Provider>
  );
}

export default App;
