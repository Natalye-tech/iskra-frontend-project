// Правая часть верхней панели с кнопками
import React, { useState } from 'react'
import { ConfigProvider, Col, Row, Button, Space, Tooltip } from 'antd';
import {
  PlusCircleOutlined,
  MinusCircleOutlined,
  CopyOutlined
} from '@ant-design/icons';
import { AppColors, HeaderButtonStyle } from './../CssSettings';
import { StructureObjectTable } from './StructureObjectTable';

export function ListObjectFields() {

  return (
    <>
      <Row gutter={150} style={{ padding: 0, marginTop: -12, marginLeft: 8, marginRight: 8 }}>
        <Col style={{ color: AppColors.darkGrey, backgroundColor: AppColors.mediumGrey, padding: 8, }} flex="auto">
          Структура объекта
        </Col>
      </Row>

      <Row>
        <Col style={HeaderButtonStyle} flex="auto">
              <Space size={6} align="start">
                    <Button
                      style={{ marginLeft: 4, marginBottom: 8, }}
                      htmlType="button"
                      icon={<PlusCircleOutlined />}>
                      Создать
                    </Button>
                    <Button
                      htmlType="button"
                      style={{ marginLeft: 0, marginBottom: 8 }}
                      icon={<MinusCircleOutlined />}>
                      Удалить
                    </Button>
                    <Button
                      htmlType="button"
                      style={{ marginLeft: 0, marginBottom: 8 }}
                      icon={<CopyOutlined />}>
                      Копировать
                    </Button>
              </Space>
        </Col>
      </Row>
      <StructureObjectTable />
    </>
  )
};
