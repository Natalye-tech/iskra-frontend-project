// Правая часть верхней панели с кнопками
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
          colorPrimary: AppColors.mainBlue,
          colorPrimaryHover: AppColors.menuHoverButton,
        },
      }}
    >
      <Space style={TopRightSpaceStyle} size={6} align="center">
        <Tooltip color={AppColors.mainBlue} placement="bottom" title="Справка">
          <Button type="primary" icon={<QuestionCircleOutlined />} />
        </Tooltip>
        <Tooltip color={AppColors.mainBlue} placement="bottom" title="Настройки">
          <Button type="primary" icon={<SettingOutlined />} />
        </Tooltip>
        <Tooltip color={AppColors.mainBlue} placement="bottom" title="Обратная связь">
          <Button type="primary" icon={<MailOutlined />} />
        </Tooltip>
        <Tooltip color={AppColors.mainBlue} placement="bottom" title="Войти">
          <Button style={TopRightButtonStyle} size={size} shape="circle" type="primary" icon={<UserOutlined />} />
        </Tooltip>
      </Space>
    </ConfigProvider>
  )
}
