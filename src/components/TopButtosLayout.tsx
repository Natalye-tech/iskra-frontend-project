// Панель с кнопками управления (сверху панель второй уровень)
import React, { useState, useEffect } from 'react'
import { Layout, ConfigProvider, Col, Row, Button, Space, Tooltip } from 'antd';
import { useNavigate } from 'react-router-dom';
import { AppColors, HeaderButtonStyle, HeaderButtonStyleRight } from './CssSettings';
import { useAppDispatch, useAppSelector } from './../hooks/hook';
import { fetchActionTB } from './../store/actionSlice';
import { getObject } from './../store/objectSlice';
import SearchObject from './SearchObject';
import { BIcon } from './bicons';

// Тулбар
const TopButtosLayout: React.FC = () => {
  const actions = useAppSelector(state => state.actionstb.list); // Получение данных из стора
  const [dataButtonItems, setDataButtonItems] = useState<React.ReactNode[]>([]); // Преобразование данных из стора
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // Построение кнопки из данных
  const getButton = (
    key?: React.Key,
    title?: string,
    url?: string | null,
    icon?: React.ReactNode | null | undefined | any) => {

      return (
        <Tooltip color={AppColors.mainBlue} placement="bottom" key={key} title={title}>
          <Button style={{color: AppColors.mainBlue}} type="primary" icon={icon} onClick={() =>
            {

              let url_: string = "/";

              if (url) {
                if (url_.startsWith('mw_')) { // модальное окно

                }
                else if (url_.startsWith('fn_')) { // вызов функции

                }
                else { // переход по ссылке
                  url_ = url.toString().split('?')[0];
                  if (!url_.startsWith('/')) url_ = '/' + url_;
                  if (url_ === '/addObject') {
                    dispatch(getObject(null));
                  }
                }
              }

              navigate(url_, { state: { workflow_id: 1, object_id: null } }); console.log('click ========', url_, url);
            }} />
        </Tooltip>) as React.ReactNode;
  };

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
