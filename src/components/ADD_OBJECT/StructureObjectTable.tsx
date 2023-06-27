// Таблица структуры объектов
import React, { useState, useEffect, useRef } from 'react';
import { Table, Tooltip, ConfigProvider, Button, Input, Space, Col, Row, TableProps, InputRef, Pagination, PaginationProps } from 'antd';
import type { ColumnsType, FilterValue, SorterResult, ColumnType } from 'antd/es/table/interface';
import { AppColors, HeaderButtonStyle } from './../../components/CssSettings';
import { useAppDispatch, useAppSelector } from './../../hooks/hook';
import { fetchObjects } from './../../store/objectSlice';
import { fetchColumnItems } from './../../store/columnSlice';
import {
  EyeOutlined,
  EditOutlined,
  CloseSquareOutlined,
  ClearOutlined } from '@ant-design/icons';
import type { FilterConfirmProps } from 'antd/es/table/interface';
import { SearchOutlined, FilterFilled, CloseCircleOutlined, CheckCircleOutlined } from '@ant-design/icons';
import Highlighter from "react-highlight-words";
import type { TableRowSelection } from 'antd/es/table/interface';
import type { TablePaginationConfig } from 'antd/es/table';
import { BIcon } from './../../components/bicons';

interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: string;
  sortOrder?: string;
  filters?: Record<string, FilterValue>;
};

type Object = {
  key: React.Key,
  id: number,
  name: string,
  code: string,
  workflow_id: number,
  comment?: string | null,
};

type DataIndex = keyof Object;

export const StructureObjectTable: React.FC = () => {
  const columnsData = useAppSelector(state => state.columns.list); // Получение данных для колонок из стора
  const [columnsTable, setColumnsTable] = useState<ColumnsType<Object> | ColumnsType<any>>();  // Преобразование для данных из стора
  const objects = useAppSelector(state => state.objects.list); // Получение данных из стора
  const objects_ = useAppSelector(state => state.objects.list); // Получение данных из стора (для поиска)
  const search_substring = useAppSelector(state => state.objects.search_substring);
  const [dataTable, setDataTable] = useState<Object[] | undefined>([]); // Преобразование данных из стора
  const { loading, error } = useAppSelector(state => state.objects);
  const dispatch = useAppDispatch();
  const [data, setData] = useState<Object[]>();
  const [total, setTotal] = useState(0);
  const [tableParams, setTableParams] = useState<TableParams>({
        pagination: {
          current: 1,
          pageSize: 10,
          total: total,
          showSizeChanger: true,
          pageSizeOptions: [ 10, 20, 50, 100 ]
        },
  });

  const onChange: TableProps<Object>['onChange'] = (
      pagination: TablePaginationConfig,
      filters: Record<string, FilterValue> | any,
      sorter: SorterResult<Object> | any,
      extra: any) => {
        //
        // console.log(" filters = ", filters);
        // console.log(" dataTable = ", dataTable);

        setTableParams({
          pagination,
          filters,
        });
        if (pagination.pageSize !== tableParams.pagination?.pageSize) {
          setData([]);
        }
  };

  //-------------------------------------------------------------------
  useEffect(() => {
    // console.log(" \n\nЗагрузился список колонок = ", columnsTable );
  }, [columnsTable, setColumnsTable]);

  useEffect(() => {
    // console.log(" \n\nЗагрузились данные = ", dataTable );
  }, [dataTable, setDataTable]);

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: AppColors.mainBlue,
          colorPrimaryBg: AppColors.lightGrey,
          colorText: AppColors.darkGrey
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
        style={{ marginLeft: '8px', marginRight: '8px', marginTop: '0px' }}
        pagination={tableParams.pagination}
        onChange={onChange}
      />
    </ConfigProvider>
  );
};

export default StructureObjectTable;
