import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import { ConfigProvider, Col, Row, Button, Space, Tooltip } from 'antd';
import type { SizeType } from 'antd/es/config-provider/SizeContext';
import {
  QuestionCircleOutlined,
  SettingOutlined,
  UserOutlined,
  MailOutlined
} from '@ant-design/icons';
import { AppColors, TopRightSpaceStyle, TopRightButtonStyle } from './CssSettings';

export function TopRight() {
  const [size, setSize] = useState<SizeType>('large');

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#096dd9',
        },
      }}
    >
      <Space style={TopRightSpaceStyle} align="center">
        <Tooltip title="Справка">
          <Button type="primary" icon={<QuestionCircleOutlined />} />
        </Tooltip>
        <Tooltip title="Настройки">
          <Button type="primary" icon={<SettingOutlined />} />
        </Tooltip>
        <Tooltip title="Обратная связь">
          <Button type="primary" icon={<MailOutlined />} />
        </Tooltip>
        <Tooltip title="Войти">
          <Button style={TopRightButtonStyle} size={size} shape="circle" type="primary" icon={<UserOutlined />} />
        </Tooltip>
      </Space>
    </ConfigProvider>
  )
}
