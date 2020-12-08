import React, { useState } from 'react';
import SearchingAndBacktracking from '../sudoku/Algorithm.js'
import InputBoard from './InputBoard'

var initialInput = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0]
]

function Board(props) {
    const [state, setState] = useState({
        inputBoard: initialInput, updatedBoard: initialInput, uploadProgress: { status: "None", progress: 0 },
        solution: true, sleepTime: 0
    });

    let prepareInitialInput = (row, col, newValue) => {
        initialInput[row][col] = newValue;
        setState({
            ...state,
            inputBoard: initialInput,
            updateBoard: initialInput
        })
    }

    let updateBoard = (updatedBoard) => {
        setState({
            ...state,
            updatedBoard: updatedBoard
        })
    }

    let noSolution = () => {
        setState({
            ...state,
            solution: false
        })
    }

    let getResultBoard = () => {
        var _tr = state.updatedBoard.map((item, index) => {
            return (
                <div className="row" key={index}>
                    {
                        item.map((_item, _index) => {
                            var key = _index + index;
                            return (
                                <div className="col-1 border" key={key} style={{ position: "relative", margin: "2 2 2 2" }}>
                                    {_item === 0 ? 'x' : _item}
                                </div>
                            )
                        })
                    }
                </div>
            )
        });
        return (
            <div className="container" style={{ margin: "10%" }}>
                {_tr}
            </div>
        );
    }

    let resetResultBoard = () => {
        setState({
            ...state,
            updatedBoard: state.inputBoard
        })
    }

    let updateSleepTime = (e) => {
        setState({
            ...state,
            sleepTime: e.target.value
        })
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    <h4> Su-Do-Ku</h4>
                </div>
            </div>

            <div className="row">
                <div className="col-5">
                    <InputBoard updateBoard={prepareInitialInput} board={initialInput} />
                </div>
                <div className="col-5">
                    <button onClick={resetResultBoard}>reset</button>
                    {state.solution && getResultBoard()}
                </div>
            </div>
            <div className="row" style={{ margin: "0 0 10% 30%" }}>
                <button type="button"
                    onClick={SearchingAndBacktracking.SudokuUsingStack.main.bind(this, { inputBoard: state.inputBoard, updateBoard: updateBoard, noSolution: noSolution, sleepTime: state.sleepTime })} >
                    Solve
                </button>
            </div>


        </div>
    )
}

export default Board;