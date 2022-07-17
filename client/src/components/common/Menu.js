import { Menu } from 'antd';
import React from 'react';
const items = [
  {
    label: (
        <a href="/register">Register</a>
    ),
    key: 'register',
  },
  {
    label: (
        <a href="/login">Login</a>
    ),
    key: 'login',
  },
];

const MenuComponent = () => {
  return <Menu theme="dark" mode="horizontal" items={items}/>;
};

export default MenuComponent;