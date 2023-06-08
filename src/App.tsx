import {Route, Routes} from 'react-router-dom'
import React, { useState, useEffect } from 'react';
import {DRAWER_OBJECT_LIST} from './pages/DRAWER_OBJECT_LIST'
import {DRAWER_OBJECT_AUDIT} from './pages/DRAWER_OBJECT_AUDIT'
import {DRAWER_TASK_LIST} from './pages/DRAWER_TASK_LIST'
import {DRAWER_TASK_TEMPLATE} from './pages/DRAWER_TASK_TEMPLATE'
import {DRAWER_TASK_SCHEDULE} from './pages/DRAWER_TASK_SCHEDULE'
import {DRAWER_TASK_MONITOR} from './pages/DRAWER_TASK_MONITOR'
import {DRAWER_TASK_AUDIT} from './pages/DRAWER_TASK_AUDIT'
import {DRAWER_ORGANIZER} from './pages/DRAWER_ORGANIZER'
import {DRAWER_AUDIT} from './pages/DRAWER_AUDIT'
import {TopLayout} from './components/TopLayout'
import TopButtosLayout from './components/TopButtosLayout';
import LeftMenu from './components/LeftMenu';
import { AppColors, MainLayoutStyle, MainLayoutStyle_, ContentLayoutStyle } from './components/CssSettings';
import { Layout, ConfigProvider } from 'antd';
import { useAppDispatch, useAppSelector } from './hooks/hook';
import { fetchMenuItems } from './store/menuSlice';
import { fetchActionTB } from './store/actionSlice';
import { fetchActionWorkflow } from './store/listWorkflowsSlice';

// select * from ubp_core.fn_list_dict_action('DRAWER');
// select * from ubp_core.dict_action where pid = 20;
// update ubp_core.dict_action set icon_name = 'AuditOutlined' where id = 43;
    // <meta name="viewport" content="initial-scale=1,width=device-width"/>

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
              <Route path="/" element={ <DRAWER_OBJECT_LIST /> } />
              <Route path="/DRAWER_OBJECT_LIST" element={ <DRAWER_OBJECT_LIST /> } />
              <Route path="/DRAWER_OBJECT_AUDIT" element={ <DRAWER_OBJECT_AUDIT /> } />
              <Route path="/DRAWER_TASK_LIST" element={ <DRAWER_TASK_LIST /> } />
              <Route path="/DRAWER_TASK_TEMPLATE" element={ <DRAWER_TASK_TEMPLATE /> } />
              <Route path="/DRAWER_TASK_SCHEDULE" element={ <DRAWER_TASK_SCHEDULE /> } />
              <Route path="/DRAWER_TASK_MONITOR" element={ <DRAWER_TASK_MONITOR /> } />
              <Route path="/DRAWER_TASK_AUDIT" element={ <DRAWER_TASK_AUDIT /> } />
              <Route path="/DRAWER_ORGANIZER" element={ <DRAWER_ORGANIZER /> } />
              <Route path="/DRAWER_AUDIT" element={ <DRAWER_AUDIT /> } />
            </Routes>
          </Layout>
        </Layout>
      </Layout>
  )
}

export default App;
