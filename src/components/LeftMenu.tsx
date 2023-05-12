// Панель с левым меню
import React, { useState } from 'react';
import {
  AppstoreOutlined,
  ScheduleOutlined,
  DesktopOutlined,
  DoubleRightOutlined,
  DoubleLeftOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Button, Space, ConfigProvider } from 'antd';
import type { MenuProps } from 'antd/es/menu';
import {
  AppColors,
  ButtonStyle,
  ImgLogoOpenStyle,
  ImgLogoCloseStyle,
  MainLeftDiv,
  LeftSlyderStyle,
  LeftSpaceStyle,
  LeftMenuStyle,
  LeftMenuItemStyle } from './CssSettings';
import { useNavigate } from 'react-router-dom'

const { Sider } = Layout;
type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  style?: React.CSSProperties,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    style
  } as MenuItem;
}

const LeftMenu: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [current, setCurrent] = useState('');
  const navigate = useNavigate();

  // Стили левое меню
  const MenuItemSt: React.CSSProperties = {
    color: AppColors.mainBlue,
    height: '40px',
    fontWeight: 'normal'
  };

  const MenuItemStActive: React.CSSProperties = {
    color: AppColors.mainBlue,
    height: '40px',
    fontWeight: 'bold'
  };

  const items: MenuItem[] = [
    getItem('Органайзер', 'Organizer', <ScheduleOutlined />, MenuItemSt),
    getItem('Объекты', 'Objects', <AppstoreOutlined />, MenuItemSt),
    getItem('Монитор', 'Screen', <DesktopOutlined />, MenuItemSt,
    [
      getItem('Монитор обработки', 'Screen_processing', null, MenuItemSt),
      getItem('Журнал обработки', 'Journal_processing', null, MenuItemSt),
    ]
  )];

  type MenuItem = Required<MenuProps>['items'][number];

  const onClick: MenuProps['onClick'] = (e) => {
     // console.log('click ========', e.item);
    // e.item.style.fontWeight = 'bold';
    // if (e.key === 'Organizer') // Пример внешней ссылки
    // {
    //   window.open('https://dzen.ru/?yredirect=true','_blank', 'rel=noopener noreferrer');
    // }
    // else
    // {
      setCurrent(e.key);
      navigate("/" + e.key);
    // }
  };

  return (
    <div style={MainLeftDiv}>
      <Sider style={LeftSlyderStyle} trigger={null} collapsible collapsedWidth={45} collapsed={collapsed}>
        <Space
          style={LeftSpaceStyle}
          align="center">
          <img
            style={collapsed ? ImgLogoCloseStyle : ImgLogoOpenStyle}
            alt='Искра ФД'
            width={collapsed ? '45px' : '156px'}
            height='28px'
            src={collapsed ? 'iskra_znak.svg' : 'iskra1.svg'}></img>
        </Space>

        <ConfigProvider
          theme={{
            token: {
              colorPrimary: AppColors.mainBlue,
              colorBgContainer: AppColors.lightGrey,
              colorPrimaryBg: AppColors.mediumGrey,
              colorPrimaryText: AppColors.mainBlue,
              colorText: AppColors.mainBlue,
              colorFillSecondary: AppColors.mediumGrey,
              colorFillQuaternary: AppColors.mediumGrey,
              colorBgLayout: AppColors.mediumGrey,
              colorTextLightSolid: AppColors.mainBg,
              colorFillAlter: AppColors.lightGrey
            },
          }}
        >
          <Menu
          //  style={LeftMenuStyle}
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
              colorPrimary: AppColors.lightGrey,
              colorText: AppColors.mainBlue,
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
