// Комбобокс с бизнес-прцессами
import React, { useState, useEffect } from 'react';
import { Select, ConfigProvider, Col, Row, Space } from 'antd';
import { useDispatch } from 'react-redux';
import { AppColors, LeftSpaceStyle } from './CssSettings';
import { useAppDispatch, useAppSelector } from './../hooks/hook';
import { changeActiveItem } from './../store/listWorkflowsSlice';
import { getObject } from './../store/objectSlice';

export function BusinessProcessSelect() {
  const BusinesProcesList = useAppSelector(state => state.workflow.list); // Получение данных из стора
  const current = useAppSelector(state => state.workflow.active_item);
  const dispatch = useAppDispatch();

  const onChange = (value: string) => {
    // console.log(`77777777777777777+selected ${value}`);
    dispatch(changeActiveItem(value));
  };

  useEffect(() => {
    // console.log(" 55555 =========== ", BusinesProcesList[0], "aaaaaa", BusinesProcesList);
    // let value = BusinesProcesList[0] ? BusinesProcesList[0].name : "no";
    // dispatch(changeActiveItem(value));
  }, [ BusinesProcesList ]);

  useEffect(() => {
    // console.log(" 8888888 =========== ", BusinesProcesList[0], "aaaaaa", current);
  }, [ current ]);

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: AppColors.mediumGrey,
          colorBorder: AppColors.mainBlue
        },
      }}
    >
        <Select
          style={{ marginBottom: 25, }}
          placeholder="Выберите Бизнес-процесс"
          onChange={onChange}
          defaultValue={current}
          options={BusinesProcesList.map((province) => ({ label: province.name, value: province.code }))}
        />
    </ConfigProvider>
  )
}
