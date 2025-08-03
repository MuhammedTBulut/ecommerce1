import React from 'react';
import {
  List,
  Datagrid,
  TextField,
  NumberField,
  DateField,
  Edit,
  SimpleForm,
  SelectInput,
  Show,
  SimpleShowLayout,
  required
} from 'react-admin';

export const OrderList = () => (
  <List>
    <Datagrid rowClick="show">
      <TextField source="id" />
      <TextField source="userName" label="Customer" />
      <DateField source="createdAt" label="Order Date" />
      <NumberField source="total" options={{ style: 'currency', currency: 'USD' }} />
      <TextField source="status" />
    </Datagrid>
  </List>
);

export const OrderEdit = () => (
  <Edit>
    <SimpleForm>
      <SelectInput 
        source="status" 
        choices={[
          { id: 'Pending', name: 'Pending' },
          { id: 'Processing', name: 'Processing' },
          { id: 'Shipped', name: 'Shipped' },
          { id: 'Delivered', name: 'Delivered' },
          { id: 'Cancelled', name: 'Cancelled' },
        ]}
        validate={[required()]}
      />
    </SimpleForm>
  </Edit>
);

export const OrderShow = () => (
  <Show>
    <SimpleShowLayout>
      <TextField source="id" />
      <TextField source="userName" label="Customer" />
      <DateField source="createdAt" label="Order Date" />
      <NumberField source="total" options={{ style: 'currency', currency: 'USD' }} />
      <TextField source="status" />
    </SimpleShowLayout>
  </Show>
);