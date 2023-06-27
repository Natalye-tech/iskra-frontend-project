// Таблица объектов
import React, { useState, useEffect, useRef } from 'react';
import { Table, Tooltip, ConfigProvider, Button, Input, Space, Col, Row, TableProps, InputRef, Pagination, PaginationProps } from 'antd';
import type { ColumnsType, FilterValue, SorterResult, ColumnType } from 'antd/es/table/interface';
import { AppColors, HeaderButtonStyle } from './../../components/CssSettings';
import { useAppDispatch, useAppSelector } from './../../hooks/hook';
import { fetchObjects } from './../../store/objectSlice';
import { fetchColumnItems } from './../../store/columnSlice';
import { getObject } from './../../store/objectSlice';
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
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

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
  isHistory?: boolean | number | null,
  isSystem?: boolean | number | null,
  isExport?: boolean | number | null,
  status?:  boolean | number | null,
  dtCreate?: string  | null,
  dtUpdate?: string | null,
  userCreate?: string | null,
  userUpdate?: string | null,
};

type DataIndex = keyof Object;

const ObjectTable: React.FC = () => {
  const columnsData = useAppSelector(state => state.columns.list); // Получение данных для колонок из стора
  const [columnsTable, setColumnsTable] = useState<ColumnsType<Object> | ColumnsType<any>>();  // Преобразование для данных из стора
  const objects = useAppSelector(state => state.objects.list); // Получение данных из стора
  const objects_ = useAppSelector(state => state.objects.list); // Получение данных из стора (для поиска)
  const search_substring = useAppSelector(state => state.objects.search_substring);
  const [dataTable, setDataTable] = useState<Object[] | undefined>([]); // Преобразование данных из стора
  const { loading, error } = useAppSelector(state => state.objects);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [filteredInfo, setFilteredInfo] = useState<Record<string, FilterValue | null>>({});
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef<InputRef>(null);
  const [total, setTotal] = useState(0);
  const currentWorkflowId = useAppSelector(state => state.workflow.active_item);
  const [tableParams, setTableParams] = useState<TableParams>({
        pagination: {
          current: 1,
          pageSize: 10,
          total: total,
          showSizeChanger: true,
          pageSizeOptions: [ 10, 20, 50, 100 ]
        },
  });


  useEffect(() => {
     // console.log('search_substring ************* ', search_substring);
     if ( search_substring && search_substring.toString().length > 2 ) {
       setDataTable(objects.filter(
         object => object.name.toString().toLowerCase().includes((search_substring as string).toLowerCase()) ||
         object.code.toString().toLowerCase().includes((search_substring as string).toLowerCase()) ||
         object.comment.toString().toLowerCase().includes((search_substring as string).toLowerCase())
       ).map((object_) => (
           {
             'EyeOutlined' :
                <Tooltip color={AppColors.mainBlue} title="Просмотр">
                  <Button type="text" icon={<BIcon id={'EyeOutlined' as string} />} size={'small'} />
                </Tooltip>,
             'FormOutlined':
                <Tooltip color={AppColors.mainBlue} title="Редактировать">
                  <Button type="text" icon={<BIcon id={'FormOutlined' as string} />} size={'small'} />
                </Tooltip>,
             ...object_,
             'key': object_.id + "_",
             'id': '',
             'isHistory': object_.isHistory,
             'isSystem': object_.isSystem,
             'isExport': object_.isExport,
             } as Object)
       ));
       setTotal(objects.length);
     }

     else {
       setDataTable( objects_.map((object) => (
           {
             'EyeOutlined':
               <Tooltip color={AppColors.mainBlue} title="Просмотр">
                 <Button
                   onClick={() => {
                       navigate('/object_data', { state: { object_id: object.id, workflow_id: currentWorkflowId } });
                       dispatch(getObject(object.id));
                     }
                   }
                   type="text"
                   icon={<BIcon id={'EyeOutlined' as string} />}
                   size={'small'} />
               </Tooltip>,
             'FormOutlined':
               <Tooltip color={AppColors.mainBlue} title="Редактировать">
                 <Button
                   onClick={() => {
                       navigate('/addObject', { state: { object_id: object.id, workflow_id: currentWorkflowId } });
                       dispatch(getObject(object.id));
                     }
                   }
                   type="text"
                   icon={<BIcon id={'FormOutlined' as string} />}
                   size={'small'} />
               </Tooltip>,
             ...object,
             'key': object.id,
             'id': '',
             'isHistory': object.isHistory,
             'isSystem': object.isSystem,
             'isExport': object.isExport,
             } as Object))
        );
        setTotal(objects_.length);
     }
  }, [search_substring]);


  // search **********************************************

  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndex,
  ) => {
    // console.log("/n handleSearch 00000000000 selectedKeys = ", selectedKeys);
    // console.log("/n handleSearch 00000000000 dataIndex = ", dataIndex);
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText('');
  };

  const getColumnSearchProps = (dataIndex: DataIndex, title?: string): ColumnType<Object> => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div style={{ padding: 8, paddingTop: 8, paddingBottom: 8, paddingRight: 8, width: 250 }} onKeyDown={(e) => e.stopPropagation()}>

        <Input
          allowClear
          ref={searchInput}
          placeholder={`Фильтровать по...`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
        />

        <Space style={{ margin: 8, marginBottom: 0,  marginLeft: 75 }}>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
            size="small"
          >
            Применить
          </Button>
          <Button
            onClick={() => {
              clearFilters && handleReset(clearFilters);
              handleSearch(selectedKeys as string[], confirm, dataIndex);
            }}
            size="small"
          >
            Отменить
          </Button>
        </Space>
      </div>
    ),

    filterIcon: (filtered: boolean) => (
      <FilterFilled style={{ color: filtered ? '#1677ff' : undefined }} />
    ),

    onFilter: (value, record) => {
        let recField: string = record[dataIndex] as string;
        return recField.toString().toLowerCase().includes((value as string).toLowerCase());
    },

    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        // console.log('searchInput', searchInput);
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },

    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#7cf00', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });
  // ********************************************** search end


  interface TableParams {
    pagination?: TablePaginationConfig;
    sortField?: string;
    sortOrder?: string;
    filters?: Record<number | string | boolean | any, FilterValue>;
  }

  const onChange: TableProps<Object>['onChange'] = (
      pagination: TablePaginationConfig,
      filters: Record<string, FilterValue> | any,
      sorter: any,
      extra: any) => {
        //
        console.log(" filters = ", filters);
        console.log(" dataTable = ", dataTable);
        console.log(" total = ", total);
        console.log(" extra = ", extra);

        setTableParams({
          pagination,
          filters,
        });
        if (pagination.pageSize !== tableParams.pagination?.pageSize) {

        }
  };

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
        let filtres: any = null;
        let onFilter: any = null;
        let render: any = null;
        let filterSearch: boolean = false;
        let width: number | null = null;
        let search: ColumnType<Object> | null = null;

        switch (cl.actionType) {
          case "ID":
            dataIndex = "id";
            width = 1;
            title = null
            break;

          case "TEXT":
            dataIndex = cl.dataField as string;
            // filtres = dataIndex === "code" ? ************** Фильтры, можно подключать вместо поиска
            //   [{ text: 'test', value: 'test' }, { text: 'ACNT', value: 'ACNT' }] :
            //   [{ text: 'Реестр', value: 'Реестр' },
            //   { text: 'Разработка', value: 'Разработка' },
            //   { text: 'Справочник', value: 'Справочник' },
            //   { text: 'объект', value: 'объект' }];
            // onFilter = (value: any, record: Record<number | string, FilterValue>) => {
            //   return record[dataIndex].toString().includes(value)};
            filterSearch = true;
            const ru = new Intl.Locale('ru-RU');
            const en = new Intl.Locale('en-En');
            sorter = (a: string | any, b: string | any) => {
              if ( dataIndex === "code" ) return a[dataIndex].toString().localeCompare(b[dataIndex].toString(), en);
              else return a[dataIndex].toString().localeCompare(b[dataIndex].toString(), ru, en);
            };
            let dataIndex_: DataIndex = cl.dataField as DataIndex;
            search = {...getColumnSearchProps(dataIndex_, title)};
            break;

          case "ICON_CHECK":
            dataIndex = cl.dataField;
            width = 20;
            title =
                <Tooltip color={AppColors.mainBlue} title={cl.name}>
                  <Button style={{ marginLeft: 0, marginRight: 0 }} type="text" icon={<BIcon id={cl.iconName as string} />}/>
                </Tooltip>;
            filtres = [{ text: ' - является', value: 1 }, { text: ' - не является', value: 0 }];
            onFilter = (value: any, record: Record<number | string, FilterValue>) => {
              return record[dataIndex].toString().indexOf(value.toString()) === 0
            };
            render = (text: string) => <Tooltip color={AppColors.mainBlue} title="Редактировать"><BIcon id={text} /></Tooltip>;
            break;

          case "BUTTON":
            dataIndex = cl.iconName;
            width = 20;
            title = null;
            break;
          default: break;
        };

        return {
          title: title,
          dataIndex: dataIndex as string,
          sorter: sorter,
          filters: filtres,
          onFilter: onFilter,
          render: render,
          filterSearch: filterSearch,
          width: width,
          ...search
        }
      });
      setColumnsTable(newColumns);
  }, [columnsData]);

   // onClick={console.log(object.id)}

  // Обработка данных из стора перед загрузкой
  useEffect(() => {
    setDataTable( objects.map((object) => (
        {
          'EyeOutlined':
            <Tooltip color={AppColors.mainBlue} title="Просмотр">
              <Button
                onClick={() => {
                    navigate('/object_data', { state: { object_id: object.id, workflow_id: currentWorkflowId } });
                    dispatch(getObject(object.id));
                  }
                }
                type="text"
                icon={<BIcon id={'EyeOutlined' as string} />}
                size={'small'} />
            </Tooltip>,
          'FormOutlined':
            <Tooltip color={AppColors.mainBlue} title="Редактировать">
              <Button
                onClick={() => {
                    navigate('/addObject', { state: { object_id: object.id, workflow_id: currentWorkflowId } });
                    dispatch(getObject(object.id));
                  }
                }
                type="text"
                icon={<BIcon id={'FormOutlined' as string} />}
                size={'small'} />
            </Tooltip>,
          ...object,
          'key': object.id,
          'id': '',
          'isHistory': object.isHistory,
          'isSystem': object.isSystem,
          'isExport': object.isExport,
          } as Object))
     );
     setTotal(objects.length);
  }, [objects]);

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

export default ObjectTable;
