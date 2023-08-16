import {BrowserRouter, Routes, Route} from 'react-router-dom'
import routes from './router';
import MainLayout from './layouts/main';
import { Fragment } from 'react';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {
          routes.map((route, index) => {
            let Layout = MainLayout
            const Comp = route.element

            if(route.layout){
              Layout = route.layout
            }else if(route.layout === null){
              Layout = Fragment
            }

            return <Route key={index} path={route.path} element={<Layout><Comp/></Layout>}/>
          })
        }
      </Routes>
    </BrowserRouter>
  );
}

export default App;
