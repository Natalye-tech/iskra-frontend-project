import {Route, Routes} from 'react-router-dom'
import {Objects} from './pages/Objects'
import {Data} from './pages/Data'
import {Structure} from './pages/Structure'
import {Organizer} from './pages/Organizer'
import {Screen} from './pages/Screen'
import {Screen_processing} from './pages/Screen_processing'
import {Journal_processing} from './pages/Journal_processing'
import {TopLayout} from './components/TopLayout'
import LeftMenu from './components/LeftMenu';
import { AppColors, MainLayoutStyle, ContentLayoutStyle } from './components/CssSettings';
import { Layout, ConfigProvider } from 'antd';

function App() {
  return (
      <Layout style={MainLayoutStyle}>
        <LeftMenu />
        <Layout>
          <TopLayout />
          <Layout style={ContentLayoutStyle}>
            <Routes>
              <Route path="/" element={ <Objects /> } />
              <Route path="/Objects" element={ <Objects /> } />
              <Route path="/Data" element={ <Data /> } />
              <Route path="/Structure" element={ <Structure /> } />
              <Route path="/Organizer" element={ <Organizer /> } />
              <Route path="/Screen" element={ <Screen /> } />Screen_processing
              <Route path="/Screen_processing" element={ <Screen_processing /> } />
              <Route path="/Journal_processing" element={ <Journal_processing /> } />
            </Routes>
          </Layout>
        </Layout>
      </Layout>
  )
}

export default App;
