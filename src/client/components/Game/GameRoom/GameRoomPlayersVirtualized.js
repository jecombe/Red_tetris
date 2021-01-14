/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-shadow */
import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import Paper from '@material-ui/core/Paper';
import { AutoSizer, Column, Table } from 'react-virtualized';
import { createStage } from '../../../../shared/stage';
import Stage from '../../Common/Stage';

const styles = (theme) => ({
    flexContainer: {
        display: 'flex',
        alignItems: 'center',
        boxSizing: 'border-box'
    },
    table: {
        // temporary right-to-left patch, waiting for
        // https://github.com/bvaughn/react-virtualized/issues/454
        '& .ReactVirtualized__Table__headerRow': {
            flip: false,
            paddingRight: theme.direction === 'rtl' ? '0 !important' : undefined
        }
    },
    tableRow: {
        cursor: 'pointer'
    },
    tableRowHover: {
        '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.3)'
        }
    },
    tableCell: {
        flex: 1
    },
    tableCellHeader: {
        fontWeight: 'bold'
    },
    noClick: {
        cursor: 'initial'
    }
});

const MuiVirtualizedTable = (props) => {
    const { classes, columns, rowHeight, headerHeight, ...tableProps } = props;

    const getRowClassName = ({ index }) => {
        const { classes } = props;

        return clsx(classes.tableRow, classes.flexContainer, {
            [classes.tableRowHover]: index !== -1
        });
    };

    const cellRenderer = ({ cellData, columnIndex }) => {
        const { columns, classes, rowHeight } = props;

        console.log(columnIndex);

        return (
            <TableCell
                component="div"
                className={clsx(classes.tableCell, classes.flexContainer, classes.noClick)}
                variant="body"
                style={{ height: rowHeight }}
                align={
                    (columnIndex != null && columns[columnIndex].numeric) || false
                        ? 'right'
                        : 'left'
                }>
                {columnIndex === 3 ? (
                    <Stage stage={cellData || createStage()} type="stagePlayers" />
                ) : (
                    cellData
                )}
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
                    classes.noClick
                )}
                variant="head"
                style={{ height: headerHeight }}
                align={columns[columnIndex].numeric || false ? 'right' : 'left'}>
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
                        direction: 'inherit'
                    }}
                    headerHeight={headerHeight}
                    className={classes.table}
                    {...tableProps}
                    rowClassName={getRowClassName}>
                    {columns.map(({ dataKey, ...other }, index) => (
                        <Column
                            key={dataKey}
                            headerRenderer={(headerProps) =>
                                headerRenderer({
                                    ...headerProps,
                                    columnIndex: index
                                })
                            }
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
    rowHeight: 48
};

MuiVirtualizedTable.propTypes = {
    classes: PropTypes.object.isRequired,
    columns: PropTypes.arrayOf(
        PropTypes.shape({
            dataKey: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired,
            numeric: PropTypes.bool,
            width: PropTypes.number.isRequired
        })
    ).isRequired,
    headerHeight: PropTypes.number,
    rowHeight: PropTypes.number
};

export default withStyles(styles)(MuiVirtualizedTable);

// ---

// const sample = [
//   ['Frozen yoghurt', 159, 6.0, 24],
//   ['Ice cream sandwich', 237, 9.0, 37],
//   ['Eclair', 262, 16.0, 24],
//   ['Cupcake', 305, 3.7, 67],
//   ['Gingerbread', 356, 16.0, 49],
// ];

// function createData(id, name, score, level, stage) {
//   return {
//     id, name, score, level, stage,
//   };
// }

// const rows = [];

// for (let i = 0; i < 3; i += 1) {
//   const randomSelection = sample[Math.floor(Math.random() * sample.length)];
//   rows.push(createData(i, ...randomSelection));
// }

// export default function ReactVirtualizedTable() {
//   return (
//     <Paper style={{ height: 400, width: '100%' }} elevation={0}>
//       <VirtualizedTable
//         rowCount={rows.length}
//         rowGetter={({ index }) => rows[index]}
//         columns={[
//           {
//             width: 200,
//             label: 'Name',
//             dataKey: 'name',
//           },
//           {
//             width: 120,
//             label: 'Score',
//             dataKey: 'score',
//             numeric: true,
//           },
//           {
//             width: 120,
//             label: 'Level',
//             dataKey: 'level',
//             numeric: true,
//           },
//           {
//             width: 120,
//             label: 'Stage',
//             dataKey: 'stage',
//             numeric: true,
//           },
//         ]}
//       />
//     </Paper>
//   );
// }
