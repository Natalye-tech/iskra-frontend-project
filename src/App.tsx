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

// select * from ubp_core.fn_list_dict_action('DRAWER');
// select * from ubp_core.dict_action where pid = 20;
// update ubp_core.dict_action set icon_name = 'AuditOutlined' where id = 43;
    // <meta name="viewport" content="initial-scale=1,width=device-width"/>

    // Npavlovskaya - login iskra1
//     Your identification has been saved in iskra
// Your public key has been saved in iskra.pub
// The key fingerprint is:
// SHA256:ZzRJgr9v724xiihkdD7+jCqgCjfJps6avoHSQqlC8OU NPavlovskaya@NPavlovskaya
// The key's randomart image is:
// +--[ED25519 256]--+
// |       .. .      |
// |      .  o .     |
// |.   .  .  +      |
// |...o. . .. .     |
// | +..Eo  S.o      |
// |*o .o o .o  o    |
// |OoBo . o o . o   |
// |**o.. oo. + .    |
// |X=...o..o. =+    |
// +----[SHA256]-----+

// IskraRsa1
// Your identification has been saved in iskra_rsa
// Your public key has been saved in iskra_rsa.pub
// The key fingerprint is:
// SHA256:OlhpGdyx0C34W1kPE40vwtJhIcKVzlbEFjmYMlVCyhQ NPavlovskaya@NPavlovskaya
// The key's randomart image is:
// +---[RSA 4096]----+
// |     .EBBO=+.+   |
// |     +==*=X = .  |
// |      =*oB = =   |
// |       +* * . o  |
// |      =.S+ . .   |
// |     + ..        |
// |    . o          |
// |       .         |
// |                 |
// +----[SHA256]-----+



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
