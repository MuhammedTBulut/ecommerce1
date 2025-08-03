import React from 'react';
import {
  List,
  Datagrid,
  TextField,
  NumberField,
  Edit,
  Create,
  SimpleForm,
  TextInput,
  NumberInput,
  SelectInput,
  Show,
  SimpleShowLayout,
  required,
  minValue,
  ReferenceInput
} from 'react-admin';

export const ProductList = () => (
  <List>
    <Datagrid rowClick="show">
      <TextField source="id" />
      <TextField source="name" />
      <NumberField source="price" options={{ style: 'currency', currency: 'USD' }} />
      <TextField source="categoryName" label="Category" />
      <TextField source="imageUrl" label="Image URL" />
    </Datagrid>
  </List>
);

export const ProductEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="name" validate={[required()]} />
      <TextInput source="description" multiline rows={4} />
      <NumberInput source="price" validate={[required(), minValue(0)]} />
      <NumberInput source="stock" validate={[required(), minValue(0)]} />
      <ReferenceInput source="categoryId" reference="categories">
        <SelectInput optionText="name" validate={[required()]} />
      </ReferenceInput>
      <TextInput source="imageUrl" label="Image URL" />
    </SimpleForm>
  </Edit>
);

export const ProductCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="name" validate={[required()]} />
      <TextInput source="description" multiline rows={4} />
      <NumberInput source="price" validate={[required(), minValue(0)]} />
      <NumberInput source="stock" validate={[required(), minValue(0)]} />
      <ReferenceInput source="categoryId" reference="categories">
        <SelectInput optionText="name" validate={[required()]} />
      </ReferenceInput>
      <TextInput source="imageUrl" label="Image URL" />
    </SimpleForm>
  </Create>
);

export const ProductShow = () => (
  <Show>
    <SimpleShowLayout>
      <TextField source="id" />
      <TextField source="name" />
      <TextField source="description" />
      <NumberField source="price" options={{ style: 'currency', currency: 'USD' }} />
      <NumberField source="stock" />
      <TextField source="categoryName" label="Category" />
      <TextField source="imageUrl" label="Image URL" />
    </SimpleShowLayout>
  </Show>
);