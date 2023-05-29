// Панель с левым меню
import React, { useState, useEffect } from 'react';
import {
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
  LeftSpaceStyle } from './CssSettings';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from './../hooks/hook';
import { changeActiveMenuItem } from './../store/menuSlice';
import { BIcon } from './bicons';
import { useDispatch } from 'react-redux';

const { Sider } = Layout;
type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode | null | undefined | any,
  style?: React.CSSProperties,
  children?: MenuItem[] | null | undefined,
  link?: string,
  level?: number,
  id?: number,
  pid?: number
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    style,
    link,
    level,
    id,
    pid
  } as MenuItem;
};

const LeftMenu: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const current = useAppSelector(state => state.menuitems.activ_menu_item);
  const navigate = useNavigate();
  const menuitems = useAppSelector(state => state.menuitems.list); // Получение данных из стора
  const [dataMenuItems, setDataMenuItems] = useState<MenuItem[] | undefined>([]); // Преобразование данных из стора
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(" current =========== ", current);
  }, [ current ]);

  // Обработка данных из стора перед загрузкой
  useEffect(() => {
    const newMenuItems: any[] = menuitems.map((menuElem, index) =>
      menuElem.level === 1 ?
      getItem(
        menuElem.name as React.ReactNode,
        menuElem.code as string,
        <BIcon id={menuElem.icon_name as string} />,
        MenuItemSt as React.CSSProperties,
        menuitems.map((menuElemItem, index) =>
          menuElemItem.pid === menuElem.id ? menuElemItem : null).filter(v1 => v1).length > 0 ?
            menuitems.map((menuElemItem, index) => menuElemItem.pid === menuElem.id ?
            getItem(
              menuElemItem.name as React.ReactNode,
              menuElemItem.code as string,
              <BIcon id={menuElemItem.icon_name as string} />,
              MenuItemSt as React.CSSProperties,
              null,
              menuElemItem.code as string,
              menuElemItem.level as number,
              menuElemItem.id as number,
              menuElemItem.pid as number
            ) : null).filter(v2 => v2) : null,
        menuElem.code as string,
        menuElem.level as number,
        menuElem.id as number,
        menuElem.pid as number
      ) : null).filter(v1 => v1);

    setDataMenuItems( newMenuItems );
  }, [menuitems]);


// Обработка данных из стора перед загрузкой (если это нужно будет)
  useEffect(() => {
    // console.log(" Меню = ", dataMenuItems );
  }, [dataMenuItems, setDataMenuItems]);


  // Стили левое меню
  const MenuItemSt: React.CSSProperties = {
    color: AppColors.mainBlue,
    minHeight: '40px',
    fontWeight: 'normal'
  };

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
      dispatch(changeActiveMenuItem(e.key));
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
            src={collapsed ? '/img/iskra_znak.svg' : '/img/iskra1.svg'}></img>
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
            defaultSelectedKeys={['1']}
            mode="inline"
            items={dataMenuItems}
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
