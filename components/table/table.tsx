import "./table.scss";
import { TABLE_CELLS_CAPPION } from "../../consts";
import { useAppDispatch } from "../../hooks/store";
import { copyTable, removeRow, removeTable, sendRowData } from "../../store/table-process/table-process";
import { TableRow, TTable } from "../../types";
import Button from "../button/button";
import { openModal } from "../../store/global-process/global-process";
import { nanoid } from "@reduxjs/toolkit";
import { memo } from 'react';

type TableProps = {
  tableData: TTable;
  rowsCount: number;
  className: string;
}

export default memo(function Table({ tableData, rowsCount, className }: TableProps) {
  const dispatch = useAppDispatch();
  const dataRowsCount = tableData.rows.length + 1;

  function getCellsWithData(row: TableRow) {
    return Object.values(row.data).map((cell, index) => {
      return (
        <td className="table__body-cell" key={index}>{cell}</td>
      );
    });
  }

  function getEmpyRows(tableCells: any, rowsCount: number, dataRowsCount: number) {
    if (rowsCount <= dataRowsCount) return (
      <tr key={nanoid()} className="table__body-row table__body-row--big">
        {tableCells.map((cell: { id: number, name: string }) =>
          (<td key={cell.id} className={`table__body-cell ${(cell.name === "") && "table__body-cell--centered"}`}></td>))}
      </tr>
    );

    const arr = [];

    for (let i = dataRowsCount; i <= rowsCount; i++) {
      const element =
        <tr key={nanoid()} className={`table__body-row ${(i === rowsCount) && "table__body-row--big"}`}>
          {tableCells.map((cell: { id: number, name: string }) =>
            (<td key={cell.id} className={`table__body-cell ${(cell.name === "") && "table__body-cell--centered"}`}></td>))}
        </tr>

      arr.push(element);
    }

    return arr;
  }

  function getTableBodyRows(rows: TableRow[]) {
    return rows.map((row) => {
      return (
        <tr className="table__body-row" key={row.id}>
          {getCellsWithData(row)}
          <td className="table__body-cell table__body-cell--centered">
            <Button
              disabled={false}
              className="table__row-button table__row-button--blue"
              modifier="withoutBG"
              onClick={() => {
                dispatch(openModal());
                dispatch(sendRowData({
                  tableId: tableData.id,
                  rowId: row.id,
                  data: { name: row.data.name, surname: row.data.surname, age: row.data.age, city: row.data.city }
                }))
              }}>Edit</Button>
          </td>
          <td className="table__body-cell table__body-cell--centered">
            <Button
              disabled={false}
              className="table__row-button table__row-button--red"
              modifier="withoutBG"
              onClick={() => dispatch(removeRow({ tableId: tableData.id, rowId: row.id }))}>
              Delete
            </Button>
          </td>
        </tr>
      );
    });
  }

  return (
    <div className={`${className} table`}>
      <div className="table__buttons-container">
        <Button
          disabled={tableData.copy ? false : true}
          className="table__button table__button-copy"
          modifier="withBG"
          onClick={() => dispatch(copyTable())}>
          Copy table
        </Button>
        <button
          disabled={tableData.deletion ? false : true}
          className="table__button table__button-delete"
          onClick={() => dispatch(removeTable(tableData.id))}>
          <svg className="table__delete-icon" width="14" height="14">
            <use xlinkHref="/icons-sprite.svg#icon-big-x"></use>
          </svg>
        </button>
      </div>
      <table className="table__table">
        <thead className="table__header">
          <tr className="table__header-row">
            {TABLE_CELLS_CAPPION.map((cell) => <td className="table__header-cell" key={cell.id}>{cell.name}</td>)}
          </tr>
        </thead>
        <tbody className="table__body">
          <>
            {getTableBodyRows(tableData.rows)}
            {getEmpyRows(TABLE_CELLS_CAPPION, rowsCount, dataRowsCount)}
          </>
        </tbody>
      </table>
    </div >
  );
})