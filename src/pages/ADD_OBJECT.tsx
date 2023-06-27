import React from 'react'
import { useLocation } from 'react-router-dom';
import { SaveOutlined, ArrowLeftOutlined, PlusCircleOutlined, MinusCircleOutlined, CopyOutlined, ClearOutlined } from '@ant-design/icons';
import { AppColors, HeaderButtonStyle, HeaderButtonStyleRight, HeaderButtonStyleAddObject } from './../components/CssSettings';
import { Layout, ConfigProvider, Col, Row, Button, Space, Tooltip, Checkbox, Switch, Form, Input, Select } from 'antd';
import TopButtosLayout from './../components/TopButtosLayout';
import { fetchObjects, addNewObject } from './../store/objectSlice';
import { useAppDispatch, useAppSelector } from './../hooks/hook';
import { AddObjectForm } from './../components/ADD_OBJECT/AddObjectForm';
import { ListObjectFields } from './../components/ADD_OBJECT/ListObjectFields';

// <div>OBJECTEDIT  workflow code - <b>{workflow_id}</b>  object id = <b>{object_id}</b> </div>
export function ADDOBJECT() {
  const {state} = useLocation();
  const { workflow_id, object_id } = state;
  return (
    <>
      <AddObjectForm />
      {object_id ? <ListObjectFields /> : ''}
    </>
  )
}
