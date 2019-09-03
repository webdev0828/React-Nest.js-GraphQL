import { default as _ } from 'lodash';
import React from 'react';
import Table from 'src/table/Table';
import { IFormTable } from './Form--interface';

export const TableFormWrapper = ({
  table,
  ...props
}: {
  table: IFormTable;
  [propName: string]: any;
}) => {
  // transform to antd columns
  const columns = _(['', ...table.xLabels]) // Add empty cell for label
    .map((label, index) => {
      return {
        title: label,
        dataIndex: String(index),
        key: String(index),
        editable: index !== 0, // legend column is un editable
      };
    })
    .value();

  // transform to antd data source
  const dataSource = _(table.data)
    .map((row, index) => {
      // append y labels at legend column
      const newRow = [table.yLabels[index], ...row];

      return newRow.reduce((acc, value, colIndex) => {
        acc[`${colIndex}`] = value;
        return acc;
      }, {});
    })
    .value();

  return (
    <Table
      columns={columns}
      dataSource={dataSource}
      pagination={false}
      {...props}
    />
  );
};
