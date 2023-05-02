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
  CodeOutlined
} from '@ant-design/icons';
//import { TopRightSearch } from './TopRightSearch'
import SearchObject from './SearchObject'

const { Header } = Layout;

export function TopButtosLayout() {
  const { Header } = Layout;
  const [size, setSize] = useState(6);

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#1890ff',
          colorPrimaryText: '#096dd9',
        },
      }}
    >
    <Row>
      <Col style={HeaderButtonStyle} flex="auto">
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: '#89d4ff',
                colorPrimaryText: '#096dd9',
                colorText: '#000000',
                colorFillQuaternary: '#ff0000',
                colorFillSecondary: '#ff0000',
              },
            }}
          >
            <Space size={size} align="start">
              <Tooltip title="Создать">
                <Button style={{color: '#096dd9'}} type="primary" icon={<FileAddOutlined />} />
              </Tooltip>
              <Tooltip title="Просмотр">
                <Button style={{color: '#096dd9'}} type="primary" icon={<EyeOutlined />} />
              </Tooltip>
              <Tooltip title="Изменить">
                <Button style={{color: '#096dd9'}} type="primary" icon={<FormOutlined />} />
              </Tooltip>
              <Tooltip title="Удалить">
                <Button style={{color: '#096dd9'}} type="primary" icon={<DeleteOutlined />} />
              </Tooltip>
              <Tooltip title="Импорт">
                <Button style={{color: '#096dd9'}} type="primary" icon={<ImportOutlined />} />
              </Tooltip>
              <Tooltip title="Экспорт">
                <Button style={{color: '#096dd9'}} type="primary" icon={<ExportOutlined />} />
              </Tooltip>
              <Tooltip title="Очистить">
                <Button style={{color: '#096dd9'}} type="primary" icon={<ClearOutlined />} />
              </Tooltip>
              <Tooltip title="Копировать">
                <Button style={{color: '#096dd9'}} type="primary" icon={<CopyOutlined />} />
              </Tooltip>
              <Tooltip title="Выгрузить в скрипт">
                <Button style={{color: '#096dd9'}} type="primary" icon={<CodeOutlined />} />
              </Tooltip>
            </Space>

          </ConfigProvider>
      </Col>
      <Col style={HeaderButtonStyleRight} flex='200px'>
        <Space size={size} align="start">
          <SearchObject placeholder="текст для поиска..." style={{ width: 200 }}/>
        </Space>
      </Col>
    </Row>
    </ConfigProvider>
  )
}

export default TopButtosLayout;
