import { Table } from 'antd';
import _ from 'lodash';
import React, { useState } from 'react';
import Component from 'src/components/BuilderComponents/Component';
import { VariantTemplate } from 'src/components/BuilderComponents/Variant/VariantTemplate';
import { Variant } from 'src/components/Variant/Variant';
import { GET_VARIANT_INSTANCES } from 'src/components/Variant/Variant--queries';
import withPageProps from 'src/hoc/withPageProps';
import styled from 'styled-components';

const CustomTable = styled(Table)`
  table {
    background-color: white;
  }
`;

const VariantPage = () => {
  const [selectedRows, setSelectedRows] = useState([]);
  const rowSelection = {
    selectedRows,
    onChange: selectedRowKeys => {
      setSelectedRows(selectedRowKeys);
    },
  };
  const hasSelected = selectedRows.length > 0;
  return (
    <Query query={GET_VARIANT_INSTANCES()}>
      {({ data }) => {
        console.log(data);
        const columns = [
          {
            title: 'Variant',
            dataIndex: 'variant',
            sorter: (a, b) => a.variant.localeCompare(b.variant),
          },
          {
            title: 'Component',
            dataIndex: 'component',
            sorter: (a, b) => a.component.localeCompare(b.component),
            filters: Component.getFilterList(data.components),
            onFilter: (value, record) => record.component.indexOf(value) === 0,
          },
          {
            title: 'Category',
            dataIndex: 'category',
            sorter: (a, b) => a.category.localeCompare(b.category),
            filters: VariantTemplate.getFilterList(data.variantTemplates),
            onFilter: (value, record) => record.category.indexOf(value) === 0,
          },
          {
            title: 'Classes',
            dataIndex: 'classes',
            sorter: (a, b) => a.classes.localeCompare(b.classes),
          },
          {
            title: 'CSS',
            dataIndex: 'css',
          },
        ];
        const tableData = _.map(
          _.filter(data!.variantInstances, instance => {
            return instance.variant && instance.element;
          }),
          filteredItem => ({
            key: filteredItem.id,
            variant: filteredItem.variant.name,
            component: filteredItem.element.component.type,
            category: filteredItem.variant.variantCategory.name,
            classes: filteredItem.variant.classes
              .map(item => item.name)
              .join(','),
            css: filteredItem.variant.classes
              .map(cssClass => {
                return cssClass.css.map(item => {
                  return `${item.property.name}: ${item.option.value}`;
                });
              })
              .join(', '),
          }),
        );
        return (
          <section style={{ padding: 16 }}>
            <div style={{ marginBottom: 16 }}>
              <span style={{ marginLeft: 8 }}>
                {' '}
                {hasSelected
                  ? `Selected ${selectedRows.length} items`
                  : ''}{' '}
              </span>
            </div>
            <CustomTable
              bordered={true}
              rowSelection={rowSelection}
              columns={columns}
              dataSource={tableData}
            />
          </section>
        );
      }}
    </Query>
  );
};

export default withPageProps({ hasSidebar: true })(VariantPage);
