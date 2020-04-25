import React from 'react';
import SearchingAndBacktracking from '../sudoku/Algorithm.js'
import {createWorker, RecognizeResult} from 'tesseract.js';

var initialInput = [
    [5, 3, 0, 0, 7, 0, 0, 0, 0],
    [6, 0, 0, 1, 9, 5, 0, 0, 0],
    [0, 9, 8, 0, 0, 0, 0, 6, 0],
    [8, 0, 0, 0, 6, 0, 0, 0, 3],
    [4, 0, 0, 8, 0, 3, 0, 0, 1],
    [7, 0, 0, 0, 2, 0, 0, 0, 6],
    [0, 6, 0, 0, 0, 0, 2, 8, 0],
    [0, 0, 0, 4, 1, 9, 0, 0, 5],
    [0, 0, 0, 0, 8, 0, 0, 7, 9]
]
class Board extends React.Component {
    constructor(props){
        super(props);
        this.state = ({
            inputBoard : initialInput, uploadProgress: { status: "None", progress: 0}
        });
        this.updateBoard = this.updateBoard.bind(this);
    }

    updateBoard(updatedBoard){
        this.setState({
            inputBoard: updatedBoard
        })
    }

    getBoard(inputBoard){
        var _tr = inputBoard.map((item, index) => {
            return (
                <div className="row">
                    {
                        item.map((_item, _index) => {
                            var key = _index+index;
                            return (
                                <div className="col-1 border" style={{position: "relative"}}>
                                    {_item === 0 ? '' : _item}
                                </div>
                            )
                        })
                    }
                </div>
            )
        });
        return (
            <div className="container">
                {_tr}
            </div>
        );
    }

    async handleFileUpload(e)
    {
        var selectorFiles = e.target.files;
        var file = selectorFiles[0];
        const worker = createWorker({
            logger: m => {
                let uploadProgress = {status: m.status, progress: (m.progress*100).toFixed(2)}
                this.setState({
                    uploadProgress: uploadProgress
                })
                console.log(m)
            }
        });
        await worker.load();
        await worker.loadLanguage('eng');
        await worker.initialize('eng');
        const { data: { text } } = await worker.recognize(file);
        console.log(text);
        await worker.terminate();
    }

    render(){
        return (
            <div className="container">
                <div className="container">
                    <div className="row" style={{margin:"0 0 2vh 0"}}>
                        <button type="button"
                                onClick={SearchingAndBacktracking.SudokuUsingStack.main.bind(this, {inputBoard: this.state.inputBoard, updateBoard: this.updateBoard} )} >
                            Solve
                        </button>
                    </div>
                    <div className="row">
                        <div className="col-6">
                            {this.getBoard(initialInput)}
                        </div>
                        <div className="col-6">
                            {this.getBoard(this.state.inputBoard)}
                        </div>
                    </div>
                </div>

            </div>
        )
    }

}

export default Board;