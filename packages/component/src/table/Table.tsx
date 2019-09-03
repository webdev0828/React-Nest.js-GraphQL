import React from 'react';
import { ExtendedTableProps } from './Table-interface';
import { Table as AntdTable } from 'antd';
import _ from 'lodash';

const EditableCell = ({
  dataIndex,
  inputType,
  record,
  children,
  editable,
  Renderer,
  ...restProps
}) => {
  return <td {...restProps}>{editable ? Renderer : children}</td>;
};

export const Table: React.FC<ExtendedTableProps> = ({
  columns,
  dataSource,
  EditableCells,
  rowKey,
  components,
  ...otherProps
}) => {
  let editableColumns = columns;
  let editableComponents: any = components;

  if (EditableCell) {
    editableComponents = {
      body: {
        cell: EditableCell,
      },
    };
    const unEditableFields = _.filter(columns, col => !col.editable).length;
    const totalColumns = columns.length;
    editableColumns = columns.map((col, colIndex) => {
      return {
        ...col,
        onCell: (record, rowIndex) => {
          const cellIndex =
            (totalColumns - unEditableFields) * rowIndex +
            (colIndex - unEditableFields);
          const Cell = EditableCells && EditableCells[cellIndex];
          return {
            record,
            dataIndex: col.dataIndex,
            title: col.title,
            editable: col.editable,
            Renderer: Cell,
          };
        },
      };
    });
  }
  return (
    <AntdTable
      {...otherProps}
      components={editableComponents}
      columns={editableColumns}
      dataSource={dataSource}
      rowKey={rowKey || ((record, index) => String(index))}
    />
  );
};

export default Table;
