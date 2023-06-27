import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { SaveOutlined, ArrowLeftOutlined, PlusCircleOutlined, MinusCircleOutlined, CopyOutlined, ClearOutlined } from '@ant-design/icons';
import { AppColors, HeaderButtonStyle, HeaderButtonStyleRight, HeaderButtonStyleAddObject } from './../CssSettings';
import { Layout, ConfigProvider, Col, Row, Button, Space, Tooltip, Checkbox, Switch, Form, Input, Select } from 'antd';
import TopButtosLayout from './../TopButtosLayout';
import { fetchObjects, addNewObject } from './../../store/objectSlice';
import { useAppDispatch, useAppSelector } from './../../hooks/hook';
import { useNavigate } from 'react-router-dom';


export const AddObjectForm: React.FC = () => {
  const {state} = useLocation();
  const { workflow_id, object_id } = state;
  const dispatch = useAppDispatch();
  const { TextArea } = Input;
  const { Option } = Select;
  const [form] = Form.useForm();
  const current_object = useAppSelector(state => state.objects.current_object);
  const navigate = useNavigate();
  const defCode = useAppSelector(state => state.objects.current_object_code);
  const defName = useAppSelector(state => state.objects.current_object_name);
  const defComment = useAppSelector(state => state.objects.current_object_comment);
  const defIsHistory = useAppSelector(state => state.objects.current_object_isHistory);
  const defIsSystem = useAppSelector(state => state.objects.current_object_isSystem);
  const defIsExport = useAppSelector(state => state.objects.current_object_isExport);
  const defStatus: boolean = useAppSelector(state => state.objects.current_object_status) === 1 ? true : false;

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const onFinish = (value: any) => {
    console.log(value);
    dispatch(addNewObject(value));
  };

  const validateMessages = {
    required: "'${name}' is required!",
  };

  useEffect(() => {
     // console.log(" 8888888 =========== defStatus ", defStatus);
  }, [ defStatus ]);

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: AppColors.mainBlue,
          colorPrimaryText: AppColors.mainBlue,
          colorBgContainer: AppColors.mainBg,
          paddingContentHorizontal: 10,
          paddingXS: 10,
        },
      }}
    >
    <Form
      validateMessages={validateMessages}
      name="basic"
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 18 }}
      style={{ maxWidth: '100%' }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
          <Row>
            <Col style={HeaderButtonStyle} flex="auto">
                  <Space size={6} align="start">
                      <Form.Item>
                        <Button
                          type="primary"
                          style={{ marginLeft: 4, marginBottom: 0, }}
                          htmlType="submit"
                          icon={<SaveOutlined />}>
                          Сохранить
                        </Button>
                      </Form.Item>
                      <Form.Item>
                        <Button
                        htmlType="reset"
                        icon={<ClearOutlined />}>
                        Очистить форму</Button>
                      </Form.Item>
                      <Form.Item>
                        <Button
                          htmlType="button"
                          onClick={() => navigate("/OBJECT_LIST")}
                          style={{ marginLeft: 0, marginBottom: 0 }}
                          icon={<ArrowLeftOutlined />}>
                          Выход
                        </Button>
                      </Form.Item>
                  </Space>
            </Col>
          </Row>

          <Row gutter={150} style={{ padding: 0, paddingTop: -10, paddingRight: 0, marginTop: 0, marginLeft: 8, marginRight: 8 }}>
            <Col style={{ color: AppColors.darkGrey, backgroundColor: AppColors.mediumGrey, padding: 6, }} flex="70%">
              Свойства объекта
            </Col>
            <Col style={{ color: AppColors.darkGrey, backgroundColor: AppColors.mainBg, padding: 0, }} flex="8px">
            </Col>
            <Col style={{ color: AppColors.darkGrey, backgroundColor: AppColors.mediumGrey, padding: 6, }} flex="auto">
              Опции объекта
            </Col>
          </Row>

          <Row gutter={150} style={{ padding: 0, paddingTop: 0, paddingRight: 0, marginLeft: 8, marginRight: 8 }}>
            <Col style={{ color: AppColors.darkGrey, padding: 12, }} flex="70%">
                <Form.Item
                  wrapperCol={{ offset: 0 }}
                  label="Мнемокод"
                  name="code"
                  initialValue={defCode}
                  rules={[
                    { required: true,
                        message: 'Заполните поле Мнемокод' },{
                        pattern: /^[a-zA-Z0-9_]+$/ || /^[a-zA-Z].*$/,
                        message: 'Заполните поле Мнемокод корректным значением',
                    }
                  ]}>
                  <Input/>
                </Form.Item>
                <Form.Item
                  wrapperCol={{ offset: 0 }}
                  label="Название"
                  name="name"
                  initialValue={defName}
                  rules={[{ required: true, message: 'Заполните поле Название' },{
                        pattern: /^[a-zA-Zа-яА-Я0-9_ ]+$/,
                        message: 'Заполните поле Название корректным значением',
                    }
                  ]}>
                  <Input />
                </Form.Item>
                <Form.Item initialValue="object" name="type" label="Тип" rules={[{ required: true }]}>
                  <Select
                    placeholder="Выберите тип из списка...">
                    <Option value="object">Объект</Option>
                    <Option value="registry">Реестр</Option>
                    <Option value="system_reference">Системный справочник</Option>
                  </Select>
                </Form.Item>
                <Form.Item initialValue={defComment} name="comment" label="Комментарий">
                  <TextArea rows={4} />
                </Form.Item>
            </Col>
            <Col style={{ color: AppColors.darkGrey, padding: 0, }} flex="8px">
            </Col>
            <Col style={{ color: AppColors.darkGrey, padding: 12, paddingLeft: 12, paddingBottom: 0 }} flex="auto">
              <Form.Item name="status" initialValue={defStatus} valuePropName="checked" wrapperCol={{ offset: 0 }}>
                <Checkbox>Активен</Checkbox>
              </Form.Item>
              <Form.Item name="isHistory" initialValue={defIsHistory} valuePropName="checked" wrapperCol={{ offset: 0 }}>
                <Checkbox>Историческая таблица</Checkbox>
              </Form.Item>
              <Form.Item name="isSystem" initialValue={defIsSystem} valuePropName="checked" wrapperCol={{ offset: 0 }}>
                <Checkbox>Системный справочник</Checkbox>
              </Form.Item>
              <Form.Item name="isExport" initialValue={defIsExport} valuePropName="checked" wrapperCol={{ offset: 0 }}>
                <Checkbox>Экспортное представление</Checkbox>
              </Form.Item>
            </Col>
          </Row>
        </Form>
    </ConfigProvider>
  )
}
