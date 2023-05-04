// Верхняя панель (верхний уровень)
import React from 'react'
import { Breadcrumb, Layout, Menu, ConfigProvider, Col, Row, Button, Space, Tooltip } from 'antd';
import { TopRight } from './TopRight'
import { BusinessProcessSelect } from './BusinessProcessSelect'
import { AppColors, TopLeftSpaceStyle, TopBreadcrumbSpaceStyle } from './CssSettings';
import { HomeOutlined, DesktopOutlined } from '@ant-design/icons';

export function TopLayout() {

  const items=[
      {
        href: '/',
        title: <HomeOutlined />,
      },
      {
        href: '/Screen',
        title: (
          <>
            <DesktopOutlined />
            <span>Монитор</span>
          </>
        ),
      },
      {
        title: 'Монитор обработки',
      },
    ];

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#1890ff',
        },
      }}
    >
    <Row>
      <Col flex="200px">
        <Space style={TopLeftSpaceStyle} align="center">
          <BusinessProcessSelect />
        </Space>
      </Col>
      <Col flex="auto">
        <Space style={TopBreadcrumbSpaceStyle} align="start">

          <ConfigProvider
            theme={{
              token: {
                colorPrimary: '#1890ff',
                colorBgTextHover: '#ffffff',
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
    </ConfigProvider>
  )
}
