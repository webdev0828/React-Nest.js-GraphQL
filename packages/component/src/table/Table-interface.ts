import { ColumnProps, TableProps } from 'antd/lib/table/interface';

export type ExtendedTableProps = {
  columns: (ColumnProps<any> & { editable?: boolean })[];
} & TableProps<any> & {
    EditableCells?: JSX.Element[];
    onCell?: () => any;
  };
