/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-shadow */
import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import { AutoSizer, Column, Table } from 'react-virtualized';
import Icon from '@material-ui/core/Icon';
import EmojiFlagsIcon from '@material-ui/icons/EmojiFlags';

import { createStage } from '../../../shared/stage';

import Stage from './Stage';

const styles = (theme) => ({
  flexContainer: {
    display: 'flex',
    alignItems: 'center',
    boxSizing: 'border-box',
  },
  table: {
    // temporary right-to-left patch, waiting for
    // https://github.com/bvaughn/react-virtualized/issues/454
    '& .ReactVirtualized__Table__headerRow': {
      flip: false,
      paddingRight: theme.direction === 'rtl' ? '0 !important' : undefined,
    },
  },
  tableRow: {
    cursor: 'pointer',
  },
  tableRowHover: {
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.3)',
    },
  },
  tableCell: {
    flex: 1,
  },
  tableCellHeader: {
    fontWeight: 'bold',
  },
  noClick: {
    cursor: 'initial',
  },
});

const MuiVirtualizedTable = (props) => {
  const {
    classes,
    owner,
    columns,
    rowHeight,
    headerHeight,
    ...tableProps
  } = props;

  const getRowClassName = ({ index }) => {
    const { classes } = props;

    return clsx(classes.tableRow, classes.flexContainer, {
      [classes.tableRowHover]: index !== -1,
    });
  };

  const cellRenderer = ({ cellData, columnIndex }) => {
    const { columns, classes, rowHeight } = props;

    return (
      <TableCell
        component="div"
        className={clsx(
          classes.tableCell,
          classes.flexContainer,
          classes.noClick,
        )}
        variant="body"
        style={{ height: rowHeight }}
        align={
          (columnIndex != null && columns[columnIndex].numeric) || false
            ? 'right'
            : 'left'
        }
      >
        {columns[columnIndex].dataKey === 'stage' ? (
          <Stage stage={cellData || createStage()} type="stagePlayers" />
        ) : (
          cellData
        )}
        {columns[columnIndex].dataKey === 'name' && cellData === owner ? (
          <Icon fontSize="small" color="primary">
            <EmojiFlagsIcon fontSize="small" />
          </Icon>
        ) : null}
      </TableCell>
    );
  };

  const headerRenderer = ({ label, columnIndex }) => {
    const { headerHeight, columns, classes } = props;

    return (
      <TableCell
        component="div"
        className={clsx(
          classes.tableCell,
          classes.tableCellHeader,
          classes.flexContainer,
          classes.noClick,
        )}
        variant="head"
        style={{ height: headerHeight }}
        align={columns[columnIndex].numeric || false ? 'right' : 'left'}
      >
        <span>{label}</span>
      </TableCell>
    );
  };

  return (
    <AutoSizer>
      {({ height, width }) => (
        <Table
          height={height}
          width={width}
          rowHeight={rowHeight}
          gridStyle={{
            direction: 'inherit',
          }}
          headerHeight={headerHeight}
          className={classes.table}
          {...tableProps}
          rowClassName={getRowClassName}
        >
          {columns.map(({ dataKey, ...other }, index) => (
            <Column
              key={dataKey}
              headerRenderer={(headerProps) =>
                headerRenderer({
                  ...headerProps,
                  columnIndex: index,
                  // eslint-disable-next-line prettier/prettier
                })}
              className={classes.flexContainer}
              cellRenderer={cellRenderer}
              dataKey={dataKey}
              {...other}
            />
          ))}
        </Table>
      )}
    </AutoSizer>
  );
};

MuiVirtualizedTable.defaultProps = {
  headerHeight: 48,
  rowHeight: 48,
  owner: '',
};

MuiVirtualizedTable.propTypes = {
  classes: PropTypes.object.isRequired,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      dataKey: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      numeric: PropTypes.bool,
      width: PropTypes.number.isRequired,
    }),
  ).isRequired,
  headerHeight: PropTypes.number,
  rowHeight: PropTypes.number,
  owner: PropTypes.string,
};

export default withStyles(styles)(MuiVirtualizedTable);
