import React from 'react';
import {
  List,
  Datagrid,
  TextField,
  EmailField,
  DateField,
  BooleanField,
  Edit,
  SimpleForm,
  TextInput,
  DateInput,
  BooleanInput,
  SelectInput,
  Show,
  SimpleShowLayout,
  required,
  email
} from 'react-admin';

export const UserList = () => (
  <List>
    <Datagrid rowClick="show">
      <TextField source="id" />
      <TextField source="fullName" label="Full Name" />
      <EmailField source="email" />
      <TextField source="roleName" label="Role" />
      <BooleanField source="gender" label="Gender" />
      <DateField source="birthDate" label="Birth Date" />
    </Datagrid>
  </List>
);

export const UserEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="fullName" validate={[required()]} />
      <TextInput source="email" validate={[required(), email()]} />
      <TextInput source="password" label="Password (leave empty to keep current)" type="password" />
      <SelectInput 
        source="roleId" 
        choices={[
          { id: 1, name: 'Admin' },
          { id: 2, name: 'User' },
        ]}
        validate={[required()]}
      />
      <DateInput source="birthDate" />
      <BooleanInput source="gender" label="Gender (Male/Female)" />
    </SimpleForm>
  </Edit>
);

export const UserShow = () => (
  <Show>
    <SimpleShowLayout>
      <TextField source="id" />
      <TextField source="fullName" label="Full Name" />
      <EmailField source="email" />
      <TextField source="roleName" label="Role" />
      <BooleanField source="gender" label="Gender" />
      <DateField source="birthDate" label="Birth Date" />
    </SimpleShowLayout>
  </Show>
);