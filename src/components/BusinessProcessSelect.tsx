// Комбобокс с бизнес-прцессами
import React from 'react'
import { Select, ConfigProvider, Col, Row, Space } from 'antd';
import { AppColors, LeftSpaceStyle } from './CssSettings';

export function BusinessProcessSelect() {

  const onChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  const onSearch = (value: string) => {
    console.log('search:', value);
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#1890ff',
          colorBorder: AppColors.mainBlue
        },
      }}
    >
        <Select
          showSearch
          style={{ marginBottom: 25, }}
          placeholder="Выберите Бизнес-процесс"
          optionFilterProp="children"
          onChange={onChange}
          onSearch={onSearch}
          filterOption={(input, option) =>
            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
          }
          options={[
            {
              value: 'bp1',
              label: 'Бизнес-процесс 1',
            },
            {
              value: 'bp2',
              label: 'Бизнес-процесс 2',
            },
            {
              value: 'bp3',
              label: 'Бизнес-процесс 3',
            },
            {
              value: 'bp4',
              label: 'Бизнес-процесс 4',
            },
            {
              value: 'bp5',
              label: 'Бизнес-процесс 5',
            },
          ]}
        />
    </ConfigProvider>
  )
}
