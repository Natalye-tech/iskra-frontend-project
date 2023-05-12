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

interface DataTypeTMP {
  key?: React.Key;
  id: number;
  title: string;
  userId?: number;
  completed?: boolean;
};

// Тип объекта
type Object = {
  key?: React.Key;
  id: number;
  title: string;
  userId?: number;
  completed?: boolean;
}

export const ColumnsTMP: ColumnsType<Object> = [
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
  },
  {
    title: 'column 4',
    dataIndex: 'completed',
  },
];

export const Columns: ColumnsType<DataType> = [
  {
    title: 'Мнемокод',
    dataIndex: 'mcode',
  },
  {
    title: 'Название',
    dataIndex: 'name',
    render: (text: string) => <a>{text}</a>,
  },
  {
    title: 'Статус',
    dataIndex: 'status',
  },
  {
    title: 'Дата и время изменения',
    dataIndex: 'date_edit',
  },
  {
    title: 'Владелец',
    dataIndex: 'owner',
  },
  {
    title: 'Комментарий',
    dataIndex: 'comment',
  },
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
  },
  {
    key: '3',
    mcode: 'mcode 2',
    name: 'name 2',
    status: 2,
    date_edit: 'date_edit 2',
    owner: 'owner 2',
    comment: 'comment 2',
  },
  {
    key: '4',
    mcode: 'mcode 3',
    name: 'name 3',
    status: 3,
    date_edit: 'date_edit 3',
    owner: 'owner 3',
    comment: 'comment 3',
  },
  {
    key: '5',
    mcode: 'mcode 4',
    name: 'name 4',
    status: 4,
    date_edit: 'date_edit 4',
    owner: 'owner 4',
    comment: 'comment 4',
  },
  {
    key: '6',
    mcode: 'mcode 5',
    name: 'name 5',
    status: 5,
    date_edit: 'date_edit 5',
    owner: 'owner 5',
    comment: 'comment 5',
  },
  {
    key: '7',
    mcode: 'mcode 6',
    name: 'name 6',
    status: 6,
    date_edit: 'date_edit 6',
    owner: 'owner 6',
    comment: 'comment 6',
  },
  {
    key: '8',
    mcode: 'mcode 7',
    name: 'name 7',
    status: 7,
    date_edit: 'date_edit 7',
    owner: 'owner 7',
    comment: 'comment 7',
  },
];

export const DataTMP: DataTypeTMP[] = [
  {key: '1', id: 1, title: 'delectus aut autem', completed: false},
  {key: '2', userId: 1, id: 2, title: 'quis ut nam facilis et officia qui', completed: false},
  {key: '3', userId: 1, id: 3, title: 'fugiat veniam minus', completed: false},
  {key: '4', userId: 1, id: 4, title: 'et porro tempora', completed: true},
  {key: '5', userId: 1, id: 5, title: 'laboriosam mollitia et enim quasi adipisci quia provident illum', completed: false},
  {key: '6', userId: 1, id: 6, title: 'qui ullam ratione quibusdam voluptatem quia omnis', completed: false},
  {key: '7', userId: 1, id: 7, title: 'illo expedita consequatur quia in', completed: false},
  {key: '8', userId: 1, id: 8, title: 'quo adipisci enim quam ut ab', completed: true},
  {key: '9', userId: 1, id: 9, title: 'molestiae perspiciatis ipsa', completed: false},
  {key: '10', userId: 1, id: 10, title: 'illo est ratione doloremque quia maiores aut', completed: true},
]
