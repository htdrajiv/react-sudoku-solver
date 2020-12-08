import React, { useState } from 'react';
import Head from 'next/head';

export default function InputBoard(props) {
    const { board } = props;
    let updateBoard = (row, col) => (e) => {
        if (e.target.value.trim() !== "" && !/^[1-9]$/.test(e.target.value)) {
            alert("Allowed input:1-9")
            return;
        }
        let newValue = e.target.value === '' ? 0 : parseInt(e.target.value);
        props.updateBoard(row, col, newValue);
    }

    let makeBoardTable = () => {
        let boardTableRows = [];
        for (var i = 0; i < 9; i++) {
            if (typeof board[i] === 'undefined')
                board[i] = [];
            boardTableRows.push(
                <tr key={i}>
                    <td> <input type="text" value={board[i][0] !== 0 ? board[i][0] : ""} className="board-input " onChange={updateBoard(i, 0)} /> </td>
                    <td> <input type="text" value={board[i][1] !== 0 ? board[i][1] : ""} className="board-input " onChange={updateBoard(i, 1)} /> </td>
                    <td> <input type="text" value={board[i][2] !== 0 ? board[i][2] : ""} className="board-input " onChange={updateBoard(i, 2)} /> </td>
                    <td> <input type="text" value={board[i][3] !== 0 ? board[i][3] : ""} className="board-input " onChange={updateBoard(i, 3)} /> </td>
                    <td> <input type="text" value={board[i][4] !== 0 ? board[i][4] : ""} className="board-input " onChange={updateBoard(i, 4)} /> </td>
                    <td> <input type="text" value={board[i][5] !== 0 ? board[i][5] : ""} className="board-input " onChange={updateBoard(i, 5)} /> </td>
                    <td> <input type="text" value={board[i][6] !== 0 ? board[i][6] : ""} className="board-input " onChange={updateBoard(i, 6)} /> </td>
                    <td> <input type="text" value={board[i][7] !== 0 ? board[i][7] : ""} className="board-input " onChange={updateBoard(i, 7)} /> </td>
                    <td> <input type="text" value={board[i][8] !== 0 ? board[i][8] : ""} className="board-input " onChange={updateBoard(i, 8)} /> </td>
                </tr>
            )
        }
        return (
            <table>
                <tbody>
                    {boardTableRows}
                </tbody>
            </table>
        )
    }
    return (
        <div>
            {makeBoardTable()}
        </div>
    )
}