import React from 'react';
import { Admin, Resource } from 'react-admin';
import { dataProvider } from './dataProvider';
import { authProvider } from './authProvider';

// Import components
import { UserList, UserEdit, UserShow } from './resources/users';
import { ProductList, ProductEdit, ProductShow, ProductCreate } from './resources/products';
import { CategoryList, CategoryEdit, CategoryShow, CategoryCreate } from './resources/categories';
import { OrderList, OrderEdit, OrderShow } from './resources/orders';
import { Dashboard } from './Dashboard';

// Import icons
import PeopleIcon from '@mui/icons-material/People';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CategoryIcon from '@mui/icons-material/Category';
import ReceiptIcon from '@mui/icons-material/Receipt';

const App = () => (
  <Admin
    dataProvider={dataProvider}
    authProvider={authProvider}
    dashboard={Dashboard}
    title="E-Commerce Admin"
  >
    <Resource
      name="users"
      list={UserList}
      edit={UserEdit}
      show={UserShow}
      icon={PeopleIcon}
      options={{ label: 'Users' }}
    />
    <Resource
      name="products"
      list={ProductList}
      edit={ProductEdit}
      show={ProductShow}
      create={ProductCreate}
      icon={ShoppingCartIcon}
      options={{ label: 'Products' }}
    />
    <Resource
      name="categories"
      list={CategoryList}
      edit={CategoryEdit}
      show={CategoryShow}
      create={CategoryCreate}
      icon={CategoryIcon}
      options={{ label: 'Categories' }}
    />
    <Resource
      name="orders"
      list={OrderList}
      edit={OrderEdit}
      show={OrderShow}
      icon={ReceiptIcon}
      options={{ label: 'Orders' }}
    />
  </Admin>
);

export default App;
