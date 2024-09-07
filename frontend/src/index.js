import React from 'react';
import ReactDOM from 'react-dom/client';
import Create from './Components/Create/Create';
import ProductDetail from './Components/Product/ProductDetail/ProductDetail';
import Marketplace from './Components/ProductPage/products';
import Reward from './Components/Reward/Reward';
import App from './App';
import reportWebVitals from './reportWebVitals';
import "remixicon/fonts/remixicon.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import { AuctionProvider } from './Auction';

import { createBrowserRouter,  RouterProvider } from 'react-router-dom';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>
  },
  {
    path: "/create",
    element: <Create/>
  },
  {
    path: "/productDetail",
    element: <ProductDetail/>
  },
  {
    path: "/marketplace",
    element: <Marketplace/>
  },
  {
    path: "/reward",
    element: <Reward/>
  }

]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <AuctionProvider>
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
  </AuctionProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
