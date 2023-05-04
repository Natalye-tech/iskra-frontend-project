// Панель с левым меню
import React, { useState } from 'react';
import {
  AppstoreOutlined,
  ScheduleOutlined,
  DesktopOutlined,
  DoubleRightOutlined,
  DoubleLeftOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Button, Space, ConfigProvider, Col, Row } from 'antd';
import type { MenuProps, MenuTheme } from 'antd/es/menu';
import { StyleProvider, legacyLogicalPropertiesTransformer } from '@ant-design/cssinjs';
import type { SizeType } from 'antd/es/config-provider/SizeContext';
import { AppColors, ButtonStyle, ImgLogoOpenStyle, ImgLogoCloseStyle, MainLeftDiv, LeftSlyderStyle, LeftSpaceStyle, LeftMenuStyle } from './CssSettings';
import {BrowserRouter, Route, Routes, Link, Navigate, useParams, useNavigate} from 'react-router-dom'

const { Sider } = Layout;
type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  style?: React.CSSProperties,
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const LeftMenu: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [size, setSize] = useState<SizeType>('large');
  const [current, setCurrent] = useState('obj');
  const navigate = useNavigate();

  const items: MenuItem[] = [
    getItem('Органайзер', 'Organizer', <ScheduleOutlined />),
    getItem('Объекты', 'Objects', <AppstoreOutlined />),
    getItem('Монитор', 'Screen', <DesktopOutlined />,
    [
      getItem('Монитор обработки', 'Screen_processing'),
      getItem('Журнал обработки', 'Journal_processing'),
    ]
  )];

  type MenuItem = Required<MenuProps>['items'][number];

  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ========', e);
    setCurrent(e.key);
    navigate("/" + e.key);
  };

  return (
    <div style={MainLeftDiv}>
      <Sider style={LeftSlyderStyle} trigger={null} collapsible collapsedWidth={50} collapsed={collapsed}>
        <Space
          style={LeftSpaceStyle}
          align="center">
          <img
            style={collapsed ? ImgLogoCloseStyle : ImgLogoOpenStyle}
            alt='Искра ФД'
            width={collapsed ? '60px' : '156px'}
            height='28px'
            src={collapsed ? 'iskra_znak.svg' : 'iskra1.svg'}
            >
          </img>
        </Space>

        <ConfigProvider
          theme={{
            token: {
              colorPrimary: '#ffffff',
              colorBgContainer: '#89d4ff',
              colorPrimaryBg: '#096dd9',
              colorPrimaryText: '#096dd9',
              colorText: '#096dd9',
              colorFillSecondary: '#e6f7ff',
              colorFillQuaternary: '#fafafa',
              colorBgLayout: '#ffffff',
              colorTextLightSolid: '#ffffff',
              colorFillAlter: '#fafafa',
              margin: 34
            },
          }}
        >
          <Menu
            style={LeftMenuStyle}
            defaultSelectedKeys={['1']}
            mode="inline"
            items={items}
            onClick={onClick}
            selectedKeys={[current]}
          />
        </ConfigProvider>

      </Sider>
      <div style={{ height: 48, width: '100%', textAlign: 'right' }}>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: '#096dd9',
            },
          }}
        >
          <Button
            type='primary'
            icon={collapsed ? <DoubleRightOutlined /> : <DoubleLeftOutlined />}
            onClick={() => {setCollapsed(!collapsed)}}
            style={ButtonStyle}
            size='middle'
            shape="circle"
          />
        </ConfigProvider>
      </div>
    </div>
  );
};

export default LeftMenu;
