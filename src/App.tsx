import {Route, Routes} from 'react-router-dom'
import React, { useState, useEffect } from 'react';
import {OBJECT_LIST} from './pages/OBJECT_LIST'
import {OBJECT_AUDIT} from './pages/OBJECT_AUDIT'
import {TASK_LIST} from './pages/TASK_LIST'
import {TASK_TEMPLATE} from './pages/TASK_TEMPLATE'
import {TASK_SCHEDULE} from './pages/TASK_SCHEDULE'
import {TASK_MONITOR} from './pages/TASK_MONITOR'
import {TASK_AUDIT} from './pages/TASK_AUDIT'
import {ORGANIZER} from './pages/ORGANIZER'
import {AUDIT} from './pages/AUDIT'
import {TopLayout} from './components/TopLayout'
import TopButtosLayout from './components/TopButtosLayout';
import LeftMenu from './components/LeftMenu';
import { AppColors, MainLayoutStyle, MainLayoutStyle_, ContentLayoutStyle } from './components/CssSettings';
import { Layout, ConfigProvider } from 'antd';
import { useAppDispatch, useAppSelector } from './hooks/hook';
import { fetchMenuItems } from './store/menuSlice';
import { fetchActionTB } from './store/actionSlice';
import { fetchActionWorkflow } from './store/listWorkflowsSlice';

function App() {
  // const { loading_menu, error_menu } = useAppSelector(state => state.menuitems);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchMenuItems());
    dispatch(fetchActionTB());
    dispatch(fetchActionWorkflow());
  }, [dispatch]);

  return (
      <Layout style={MainLayoutStyle}>
        <LeftMenu />
        <Layout style={MainLayoutStyle_}>
          <TopLayout />
          <TopButtosLayout />
          <Layout style={ContentLayoutStyle}>
            <Routes>
              <Route path="/" element={ <OBJECT_LIST /> } />
              <Route path="/OBJECT_LIST" element={ <OBJECT_LIST /> } />
              <Route path="/OBJECT_AUDIT" element={ <OBJECT_AUDIT /> } />
              <Route path="/TASK_LIST" element={ <TASK_LIST /> } />
              <Route path="/TASK_TEMPLATE" element={ <TASK_TEMPLATE /> } />
              <Route path="/TASK_SCHEDULE" element={ <TASK_SCHEDULE /> } />
              <Route path="/TASK_MONITOR" element={ <TASK_MONITOR /> } />
              <Route path="/TASK_AUDIT" element={ <TASK_AUDIT /> } />
              <Route path="/ORGANIZER" element={ <ORGANIZER /> } />
              <Route path="/AUDIT" element={ <AUDIT /> } />
            </Routes>
          </Layout>
        </Layout>
      </Layout>
  )
}

export default App;
