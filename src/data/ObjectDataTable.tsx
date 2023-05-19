// Тестовые колонки и данные для таблицы
import React, { useState } from 'react';
import { Table, ConfigProvider } from 'antd';
import type { ColumnsType } from 'antd/es/table';

interface DataType {
  key: React.Key;
  mcode: string;
  name: string;
  status: number;
  date_edit: string;
  owner: string;
  comment: string;
}

// Тип объекта
type ColumnType = {
  id: number;
  title: string;
  dataIndex?: number;
}

export const ColumnsTMP: ColumnsType<ColumnType> = [
  {
    title: 'column 1',
    dataIndex: 'id',
  },
  {
    title: 'column 2',
    dataIndex: 'title',
  },
  {
    title: 'column 3',
    dataIndex: 'userId',
  }
];


export const Data: DataType[] = [
  {
    key: '1',
    mcode: 'mcode 0',
    name: 'name 0',
    status: 0,
    date_edit: 'date_edit 0',
    owner: 'owner 0',
    comment: 'comment 0',
  },
  {
    key: '2',
    mcode: 'mcode 1',
    name: 'name 1',
    status: 1,
    date_edit: 'date_edit 1',
    owner: 'owner 1',
    comment: 'comment 1',
  }
];
