// Таблица объектов
import React, { useState, useEffect } from 'react';
import { Table, ConfigProvider } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { AppColors } from './CssSettings';
import { useAppDispatch, useAppSelector } from './../hooks/hook';

// Тип объекта
type Object = {
  key?: React.Key | null | undefined,
  id?: number | null | undefined,
  name?: string | null | undefined,
  code?: string | null | undefined,
};

const columns_: ColumnsType<Object> = [
  {
    key: 0 as number,
    title: "Name" as string,
    dataIndex: "name" as string
  },
];

const ObjectTable: React.FC = () => {
  const columnsData = useAppSelector(state => state.columns.list); // Получение данных для колонок из стора
  const [columnsTable, setColumnsTable] = useState<ColumnsType<Object> | ColumnsType<any>>(columns_);  // Преобразование для данных из стора
  const objects = useAppSelector(state => state.objects.list); // Получение данных из стора
  const [dataTable, setDataTable] = useState<Object[] | undefined>([]); // Преобразование данных из стора

  // Обработка данных колонок из стора перед загрузкой
  useEffect(() => {
      console.log(" Объекты Columns = ", columnsData[0], typeof columnsData[0] );
      setColumnsTable( columnsData.map((cl) => (
        {
          key: cl.id as number,
          title: cl.name as string,
          dataIndex: "column_"+cl.id as string
        }))
      );
  }, [columnsData]);

  // Обработка данных из стора перед загрузкой
  useEffect(() => {
    console.log(" Объекты из хранилища useEffect objects = ", objects );
    console.log(" Объекты Columns!!!!!!!!!! = ", columnsTable );
    setDataTable( objects.map((object) => (
        {
          'key': object.id,
          'column_30': object.id,
          'column_31': 1,
          'column_32': 1,
          'column_33': object.name,
        } as Object))
     );
  }, [objects]);

  //-------------------------------------------------------------------
  useEffect(() => {
    console.log(" \n\nCCCCCCCCCCCCCCCCCCCCCCCCCC = ", columnsTable );
  }, [columnsTable, setColumnsTable]);

  useEffect(() => {
    console.log(" \n\nDDDDDDDDDDDDDDDDDDDDDDDDDDDDD = ", dataTable );
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
        columns={columnsTable}
        dataSource={dataTable}
        size={'small'}
        style={{ margin: '10px' }}
      />
    </ConfigProvider>
  );
};

export default ObjectTable;


// [{"id":201,"workflow_id":1,"name":"Тестовый объект","code":"TIC_TEST","comment":"Тест","isHistory":0,"isSystem":0,"isExport":0,"status":100,"dtCreate":"2023-03-06T07:27:20.568+00:00","dtUpdate":"2023-03-06T07:27:20.568+00:00","userCreate":null,"userUpdate":null},{"id":200,"workflow_id":1,"name":"Справочник периодов","code":"TIL_PERIOD","comment":"ТЕСТ","isHistory":0,"isSystem":0,"isExport":0,"status":100,"dtCreate":"2023-03-03T10:16:19.974+00:00","dtUpdate":"2023-03-03T10:16:19.974+00:00","userCreate":null,"userUpdate":null},{"id":199,"workflow_id":1,"name":"Справочник эталонной разметки сделок точками продаж","code":"DEAL_SAMPLE_POINT_D","comment":"","isHistory":0,"isSystem":1,"isExport":0,"status":100,"dtCreate":"2023-01-12T08:57:17.194+00:00","dtUpdate":"2023-01-12T08:57:17.197+00:00","userCreate":null,"userUpdate":null},{"id":198,"workflow_id":1,"name":"Справочник эталонной разметки счетов точками продаж","code":"ACNT_SAMPLE_POINT_D","comment":"","isHistory":0,"isSystem":1,"isExport":0,"status":100,"dtCreate":"2023-01-12T08:59:22.046+00:00","dtUpdate":"2023-01-12T08:59:22.049+00:00","userCreate":null,"userUpdate":null},{"id":197,"workflow_id":1,"name":"Реестр раскраски сделок точками продаж","code":"DEAL_MARK_POINT_R","comment":"","isHistory":1,"isSystem":0,"isExport":0,"status":100,"dtCreate":"2023-01-12T08:48:00.731+00:00","dtUpdate":"2023-01-12T08:48:00.734+00:00","userCreate":null,"userUpdate":null},{"id":196,"workflow_id":1,"name":"Реестр раскраски счетов точками продаж","code":"ACNT_MARK_POINT_R","comment":"","isHistory":1,"isSystem":0,"isExport":0,"status":100,"dtCreate":"2023-01-12T08:38:17.943+00:00","dtUpdate":"2023-01-12T08:38:17.961+00:00","userCreate":null,"userUpdate":null},{"id":194,"workflow_id":1,"name":"test_name","code":"test_code","comment":"","isHistory":0,"isSystem":0,"isExport":0,"status":100,"dtCreate":"2023-01-12T03:12:30.759+00:00","dtUpdate":"2023-01-12T03:12:30.759+00:00","userCreate":null,"userUpdate":null},{"id":193,"workflow_id":1,"name":"Разработка","code":"test_001","comment":"comment","isHistory":1,"isSystem":0,"isExport":0,"status":100,"dtCreate":"2023-01-12T11:00:01.242+00:00","dtUpdate":"2023-01-12T11:00:01.299+00:00","userCreate":null,"userUpdate":null}]
