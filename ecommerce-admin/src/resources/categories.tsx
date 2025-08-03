import React from 'react';
import {
  List,
  Datagrid,
  TextField,
  Edit,
  Create,
  SimpleForm,
  TextInput,
  Show,
  SimpleShowLayout,
  required
} from 'react-admin';

export const CategoryList = () => (
  <List>
    <Datagrid rowClick="show">
      <TextField source="id" />
      <TextField source="name" />
    </Datagrid>
  </List>
);

export const CategoryEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="name" validate={[required()]} />
    </SimpleForm>
  </Edit>
);

export const CategoryCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="name" validate={[required()]} />
    </SimpleForm>
  </Create>
);

export const CategoryShow = () => (
  <Show>
    <SimpleShowLayout>
      <TextField source="id" />
      <TextField source="name" />
    </SimpleShowLayout>
  </Show>
);