import React from 'react';
import { Card, CardContent, CardHeader } from '@mui/material';
import { Title } from 'react-admin';

export const Dashboard = () => (
  <div>
    <Title title="E-Commerce Admin Dashboard" />
    <div style={{ margin: '1em' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1em' }}>
        <Card style={{ flex: '1 1 300px', minWidth: '300px' }}>
          <CardHeader title="Welcome to Admin Dashboard" />
          <CardContent>
            <p>Manage your e-commerce platform from this central dashboard.</p>
            <ul>
              <li>Users: Manage user accounts and roles</li>
              <li>Products: Add, edit, and remove products</li>
              <li>Categories: Organize product categories</li>
              <li>Orders: Track and update order status</li>
            </ul>
          </CardContent>
        </Card>
        
        <Card style={{ flex: '1 1 300px', minWidth: '300px' }}>
          <CardHeader title="Quick Statistics" />
          <CardContent>
            <p>View key metrics and performance indicators here.</p>
            <p>Statistics will be displayed when connected to the backend API.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  </div>
);