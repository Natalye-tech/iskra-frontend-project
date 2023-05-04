// Таблица объектов
import React, { useState } from 'react';
import { Table, ConfigProvider } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Columns, Data } from './../data/ObjectDataTable'
import { AppColors, TopLeftSpaceStyle } from './CssSettings';

const ObjectTable: React.FC = () => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: AppColors.mainBlue,
          colorPrimaryBg: AppColors.lightBlue,
        },
      }}
    >
      <Table
        rowSelection={{
          type: 'checkbox',
        }}
        columns={Columns}
        dataSource={Data}
        size={'small'}
        style={{ margin: '10px' }}
      />
    </ConfigProvider>
  );
};

export default ObjectTable;
