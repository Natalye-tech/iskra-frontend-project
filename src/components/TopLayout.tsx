// Верхняя панель (верхний уровень)
import React from 'react'
import { Breadcrumb, Layout, Menu, ConfigProvider, Col, Row, Button, Space, Tooltip } from 'antd';
import { TopRight } from './TopRight'
import { BusinessProcessSelect } from './BusinessProcessSelect'
import { AppColors, TopLeftSpaceStyle, TopBreadcrumbSpaceStyle } from './CssSettings';
import { HomeOutlined } from '@ant-design/icons';

export function TopLayout() {

  const items=[
      {
        href: '/',
        title: <HomeOutlined />,
        style: {color: AppColors.mainBg},
      },
      {
        href: '/DRAWER_OBJECT_LIST',
        title: (
          <>
            <span>Объекты</span>
          </>
        ),
      },
      {
        title: 'Список',
      },
    ];

  return (
    <Row>
      <Col flex="90px">
        <Space style={TopLeftSpaceStyle} align="center">
          <BusinessProcessSelect />
        </Space>
      </Col>
      <Col flex="auto">
        <Space style={TopBreadcrumbSpaceStyle} align="start">
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: AppColors.mainBg,
                colorBgTextHover: AppColors.menuHoverButton,
                colorText: AppColors.mainBg,
                colorTextDescription: AppColors.lightGrey,
              },
            }}
          >
            <Breadcrumb
              items={items}
            />
          </ConfigProvider>
        </Space>
      </Col>
      <Col>
        <TopRight />
      </Col>
    </Row>
  )
}
