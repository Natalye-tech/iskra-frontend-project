import {Route, Routes} from 'react-router-dom'
import {ProductsPage} from './pages/ProductsPage'
import {AboutPage} from './pages/AboutPage'
import {Page1} from './pages/Page1'
import {Navigation} from './components/Navigation'

function App() {
  // 1112222333333333
  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={ <ProductsPage /> } />
        <Route path="/about" element={ <AboutPage /> } />
        <Route path="/page1" element={ <Page1 /> } />
      </Routes>
    </>
  )
}

export default App;
