// Таблица объектов
import React, { useState, useEffect, useRef } from 'react';
import { Table, Tooltip, ConfigProvider, Button, Input, Space, TableProps, InputRef, Pagination, PaginationProps } from 'antd';
import type { ColumnsType, FilterValue, SorterResult, ColumnType } from 'antd/es/table/interface';
import { AppColors } from './CssSettings';
import { useAppDispatch, useAppSelector } from './../hooks/hook';
import { fetchObjects } from './../store/objectSlice';
import { fetchColumnItems } from './../store/columnSlice';
import { EyeOutlined, EditOutlined } from '@ant-design/icons';
import type { FilterConfirmProps } from 'antd/es/table/interface';
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from "react-highlight-words";
import type { TablePaginationConfig } from 'antd/es/table';
import { BIcon } from './bicons';

const pagination = <Pagination showQuickJumper defaultCurrent={2} total={500}/>

interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: string;
  sortOrder?: string;
  filters?: Record<string, FilterValue>;
};

// Тип объекта
type Object = {
  key?: React.Key | null | undefined,
  id?: number | null | undefined,
  name?: string | null | undefined,
  code?: string | null | undefined,
  workflow_id?: number | null | undefined,
  comment?: string | null | undefined,
  isHistory?: boolean | number | null | undefined,
  isSystem?: boolean | number | null | undefined,
  isExport?: boolean | number | null | undefined,
  status?: number | null | undefined,
  dtCreate?: string  | null | undefined,
  dtUpdate?: string | null | undefined,
  userCreate?: string | null | undefined,
  userUpdate?: string | null | undefined,
};

type DataIndex = keyof Object;

const ObjectTable: React.FC = () => {
  const columnsData = useAppSelector(state => state.columns.list); // Получение данных для колонок из стора
  const [columnsTable, setColumnsTable] = useState<ColumnsType<Object> | ColumnsType<any>>();  // Преобразование для данных из стора
  const objects = useAppSelector(state => state.objects.list); // Получение данных из стора
  const [dataTable, setDataTable] = useState<Object[] | undefined>([]); // Преобразование данных из стора
  const { loading, error } = useAppSelector(state => state.objects);
  const dispatch = useAppDispatch();
  const [filteredInfo, setFilteredInfo] = useState<Record<string, FilterValue | null>>({});
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef<InputRef>(null);
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });

  const onChange: TableProps<Object>['onChange'] = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };

  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndex,
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText('');
  };

  const getColumnSearchProps = (dataIndex: DataIndex): ColumnType<Object> => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Поиск
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Очистить
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText((selectedKeys as string[])[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Отфильтровать
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            Закрыть
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />
    ),
    // onFilter: (value, record) => alert(value),
      // record[dataIndex]
      //   .toString()
      //   .toLowerCase()
      //   .includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  useEffect(() => {
    dispatch(fetchObjects());
    dispatch(fetchColumnItems());
  }, [dispatch]);

  // Обработка данных колонок из стора перед загрузкой
  useEffect(() => {
      let newColumns: any[] = [];

      newColumns = columnsData.map((cl) => {

        let dataIndex: any = "";
        let title: string | Element | any = cl.name as string;
        let sorter: any = null;
        let search: ColumnType<Object> | null = null;

        switch (cl.actionType) {
          case "ID":
            dataIndex = "id";
            sorter = (a: any, b: any) => a[dataIndex] - b[dataIndex];
            break;
          case "TEXT":
            dataIndex = cl.dataField;
            sorter = (a: any, b: any) => a[dataIndex] - b[dataIndex];
            search = {...getColumnSearchProps(dataIndex)};
            break;
          case "ICON_CHECK":
            dataIndex = cl.dataField;
            title = <BIcon id={cl.iconName as string} />;
            break;
          case "BUTTON":
            dataIndex = cl.iconName;
            title = <BIcon id={cl.iconName as string} />;
            break;
          default:
            dataIndex = null;
        }

        return cl.actionType === "TEXT" ? {
          key: cl.id as number,
          title: title,
          dataIndex: dataIndex as string,
          sorter: sorter,
          ...getColumnSearchProps(dataIndex)
        } : {
          key: cl.id as number,
          title: title,
          dataIndex: dataIndex as string,
          sorter: sorter
        }
      });

      setColumnsTable(newColumns);
  }, [columnsData]);

  // Обработка данных из стора перед загрузкой
  useEffect(() => {
    console.log("++++++++ Объекты из хранилища useEffect objects = ", objects );
    setDataTable( objects.map((object) => (
        {
          'key': object.id,
          'EyeOutlined': <Tooltip title="Просмотр"><Button type="text" icon={<BIcon id={'EyeOutlined' as string} />} size={'small'} /></Tooltip>,
          'FormOutlined': <Tooltip title="Редактировать"><Button type="text" icon={<BIcon id={'FormOutlined' as string} />} size={'small'} /></Tooltip>,
          ...object,
          'isHistory': <BIcon id={object.isHistory as string} />,
          'isSystem': <BIcon id={object.isSystem as string} />,
          'isExport': <BIcon id={object.isExport as string} />,
          } as Object))
     );
  }, [objects]);

  //-------------------------------------------------------------------
  useEffect(() => {
    console.log(" \n\nЗагрузился список колонок = ", columnsTable );
  }, [columnsTable, setColumnsTable]);

  useEffect(() => {
    console.log(" \n\nЗагрузились данные = ", dataTable );
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
        style={{ margin: '10px' }}
        pagination={tableParams.pagination}
        onChange={onChange}
      />
    </ConfigProvider>
  );
};

export default ObjectTable;
