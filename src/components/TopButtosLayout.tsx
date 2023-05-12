// Панель с кнопками управления (сверху панель второй уровень)
import React, { useState } from 'react'
import { Layout, Menu, ConfigProvider, Col, Row, Button, Space, Tooltip } from 'antd';
import { AppColors, HeaderButtonStyle, HeaderButtonStyleRight } from './CssSettings';

import {
  FileAddOutlined,
  SettingOutlined,
  EyeOutlined,
  FormOutlined,
  DeleteOutlined,
  ImportOutlined,
  ExportOutlined,
  ClearOutlined,
  CopyOutlined,
  CodeOutlined,
  VerticalAlignBottomOutlined,
  VerticalAlignTopOutlined
} from '@ant-design/icons';
import SearchObject from './SearchObject'

const { Header } = Layout;

export function TopButtosLayout() {
  const { Header } = Layout;

  return (
    <Row>
      <Col style={HeaderButtonStyle} flex="auto">
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: AppColors.mainBg,
                colorPrimaryText: AppColors.mainBlue,
                colorPrimaryHover: AppColors.lightGrey,
              },
            }}
          >
            <Space size={6} align="start">
              <Tooltip title="Создать">
                <Button style={{color: AppColors.mainBlue}} type="primary" icon={<FileAddOutlined />} />
              </Tooltip>
              <Tooltip title="Просмотр">
                <Button style={{color: AppColors.mainBlue}} type="primary" icon={<EyeOutlined />} />
              </Tooltip>
              <Tooltip title="Изменить">
                <Button style={{color: AppColors.mainBlue}} type="primary" icon={<FormOutlined />} />
              </Tooltip>
              <Tooltip title="Удалить">
                <Button style={{color: AppColors.mainBlue}} type="primary" icon={<DeleteOutlined />} />
              </Tooltip>
              <Tooltip title="Импорт">
                <Button style={{color: AppColors.mainBlue}} type="primary" icon={<VerticalAlignBottomOutlined />} />
              </Tooltip>
              <Tooltip title="Экспорт">
                <Button style={{color: AppColors.mainBlue}} type="primary" icon={<VerticalAlignTopOutlined />} />
              </Tooltip>
              <Tooltip title="Очистить">
                <Button style={{color: AppColors.mainBlue}} type="primary" icon={<ClearOutlined />} />
              </Tooltip>
              <Tooltip title="Копировать">
                <Button style={{color: AppColors.mainBlue}} type="primary" icon={<CopyOutlined />} />
              </Tooltip>
              <Tooltip title="Выгрузить в скрипт">
                <Button style={{color: AppColors.mainBlue}} type="primary" icon={<CodeOutlined />} />
              </Tooltip>
            </Space>

          </ConfigProvider>
      </Col>
      <Col style={HeaderButtonStyleRight} flex='200px'>
        <Space size={6} align="start">
          <SearchObject placeholder="текст для поиска..." style={{ width: 200 }}/>
        </Space>
      </Col>
    </Row>
  )
}

export default TopButtosLayout;
