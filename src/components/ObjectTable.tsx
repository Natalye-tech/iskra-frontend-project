// Таблица объектов
import React, { useState, useEffect } from 'react';
import { Table, ConfigProvider } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Columns, Data, ColumnsTMP, DataTMP } from './../data/ObjectDataTable'
import { AppColors } from './CssSettings';
import { useAppDispatch, useAppSelector } from './../hooks/hook';
import { fetchObjects, addNewObject } from './../store/objectSlice';

// Тип объекта
type Object = {
  key?: React.Key;
  id: number;
  title: string;
  userId?: number;
  completed?: boolean;
}

const ObjectTable: React.FC = () => {
  const objects = useAppSelector(state => state.objects.list); // Получение данных из стора
  const [dataTable, setDataTable] = useState<Object[] | undefined>([]); // Преобразование данных из стора

  // Обработка данных из стора перед загрузкой (если это нужно будет)
  useEffect(() => {
    console.log(" Объекты из хранилища useEffect objects = ", objects );
    setDataTable( objects.map((object) => (
        {
          'key': object.id,
          'id': object.id,
          'title': object.title,
          'userId': object.userId,
          'completed': object.completed
        } as Object))
     );
  }, [objects]);

  // Обработка данных из стора перед загрузкой (если это нужно будет)
    useEffect(() => {
      console.log(" Объекты как грузятся в таблицу useEffect dataTable = ", dataTable );
    }, [dataTable, setDataTable]);

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: AppColors.mainBlue,
          colorPrimaryBg: AppColors.lightGrey,
        },
      }}
    >
      <Table
        rowSelection={{
          type: 'checkbox',
        }}
        columns={ColumnsTMP}
        dataSource={dataTable}
        size={'small'}
        style={{ margin: '10px' }}
      />
    </ConfigProvider>
  );
};

export default ObjectTable;
