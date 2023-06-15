// Панель с кнопками управления (сверху панель второй уровень)
import React, { useState, useEffect } from 'react'
import { Layout, ConfigProvider, Col, Row, Button, Space, Tooltip } from 'antd';
import { useNavigate } from 'react-router-dom';
import { AppColors, HeaderButtonStyle, HeaderButtonStyleRight } from './CssSettings';
import { useAppDispatch, useAppSelector } from './../hooks/hook';
import { fetchActionTB } from './../store/actionSlice';
import SearchObject from './SearchObject';
import { BIcon } from './bicons';

// Построение кнопки из данных
function getButton(
  key?: React.Key,
  title?: string,
  url?: string | null,
  icon?: React.ReactNode | null | undefined | any): React.ReactNode {
  return (
    <Tooltip color={AppColors.mainBlue} placement="bottom" key={key} title={title}>
      <Button style={{color: AppColors.mainBlue}} type="primary" icon={icon} onClick={() => {alert(url)}} />
    </Tooltip>) as React.ReactNode;
};

// Тулбар
const TopButtosLayout: React.FC = () => {
  const actions = useAppSelector(state => state.actionstb.list); // Получение данных из стора
  const [dataButtonItems, setDataButtonItems] = useState<React.ReactNode[]>([]); // Преобразование данных из стора
  const navigate = useNavigate();

  // Построение массива с кнопками
  useEffect(() => {
    const newButtonItems: React.ReactNode[] | any[] = actions.map((buttonElem, index) => {
       return getButton(
         buttonElem.id as React.Key,
         buttonElem.name as string,
         buttonElem.url as string,
         <BIcon id={buttonElem.iconName} />,
       )
    });
    setDataButtonItems(newButtonItems);
  }, [actions]);

  const onSearch = (value: string) => console.log(value);

  return (
    <Row>
      <Col style={HeaderButtonStyle} flex="auto">
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: AppColors.mainBg,
                colorPrimaryText: AppColors.mainBlue,
                colorPrimaryHover: AppColors.lightGrey,
              },
            }}
          >
            <Space size={6} align="start">
              {dataButtonItems}
            </Space>
          </ConfigProvider>
      </Col>
      <Col style={HeaderButtonStyleRight} flex='200px'>
        <Space size={6} align="start">
          <SearchObject />
        </Space>
      </Col>
    </Row>
  )
}

export default TopButtosLayout;
