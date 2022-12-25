import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Paper
} from "@mui/material";
import { MoreButton } from "./MoreButton";

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = "asc" | "desc";

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string }
) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [ el, index ] as [ T, number ]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

export interface HeadCell {
  id: string;
  label: string;
  numeric: boolean;
}

export interface RowCell {
  name: string;

  [key: string]: string;
}

export interface EnhancedHeaderProps {
  header: HeadCell[];
  onRequestSort: (event: React.MouseEvent<unknown>, property: string) => void;
  order: Order;
  orderBy: string;
  isAdmin?: boolean;
  onAdmin?: (event: React.MouseEvent<HTMLElement>) => void;

}

export const EnhancedTableHead: React.FC<EnhancedHeaderProps> = ({
  header,
  order,
  orderBy,
  onRequestSort,
  isAdmin,
  onAdmin
}) => {
  const createSortHandler =
    (property: string) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  const handleAdmin = (event: React.MouseEvent<HTMLElement>) => {
    if (onAdmin) {
      onAdmin(event);
    }
    event.stopPropagation();
  };

  return (
    <TableHead>
      <TableRow>
        {header.map((headCell: HeadCell, columnIndex) => (
          <TableCell
            key={headCell.id}
            align="left"
            padding="normal"
            sortDirection={orderBy === headCell.id ? order : false}
          >
            {columnIndex === 0 && isAdmin && <MoreButton onClick={(event) => handleAdmin(event)} />}
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export interface EnhancedTableProps {
  header: HeadCell[];
  rows?: RowCell[];
  isAdmin?: boolean;
  onAdmin?: (event: React.MouseEvent<HTMLElement>, name: null | string) => void;
  onClick?: (event: React.MouseEvent<HTMLElement>, name: string) => void;
}

export const EnhancedTable: React.FC<EnhancedTableProps> = ({ header, rows, isAdmin, onAdmin, onClick }) => {
  const [ order, setOrder ] = React.useState<Order>("asc");
  const [ orderBy, setOrderBy ] = React.useState<string>("name");

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: string) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleAdmin = (event: React.MouseEvent<HTMLElement>, name: null | string) => {
    if (onAdmin) {
      onAdmin(event, name);
    }
    event.stopPropagation();
  };

  if (!rows) {
    return null;
  }

  return (
    <Paper sx={{ width: "100%", mb: 2 }}>
      <TableContainer>
        <Table size="medium">
          <EnhancedTableHead
            header={header}
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
            isAdmin={isAdmin}
            onAdmin={(event) => handleAdmin(event, null)}
          />
          <TableBody>
            {stableSort(rows, getComparator(order, orderBy))
              .map((row, index) => {
                return (
                  <TableRow
                    hover
                    onClick={(event) => onClick && onClick(event, row.name)}
                    tabIndex={-1}
                    key={row.name}
                  >
                    {Object.keys(row).map((key, columnIndex) => <TableCell
                      key={index + key}
                      padding="normal"
                      scope="row"
                    >
                      {columnIndex === 0 && isAdmin && <MoreButton onClick={(event) => handleAdmin(event, row.name)} />}
                      {row[key]}
                    </TableCell>)}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};
