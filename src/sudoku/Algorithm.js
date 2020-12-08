/* Generated from Java with JSweet 2.2.0-SNAPSHOT - http://www.jsweet.org */
var SearchingAndBacktracking = {};
var SudokuUsingStack = {};

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

var SudokuNode = (function () {
    function SudokuNode(x, y) {
        if (this.x === undefined)
            this.x = 0;
        if (this.y === undefined)
            this.y = 0;
        if (this.value === undefined)
            this.value = 0;
        this.x = x;
        this.y = y;
    }
    /**
     *
     * @param {*} obj
     * @return {boolean}
     */
    SudokuNode.prototype.equals = function (obj) {
        var n2 = obj;
        return this.value === n2.value;
    };
    /**
     *
     * @return {string}
     */
    SudokuNode.prototype.toString = function () {
        return "[(" + this.x + "," + this.y + ")=" + this.value + "]";
    };
    SudokuNode.prototype.getX = function () {
        return this.x;
    };
    SudokuNode.prototype.setX = function (x) {
        this.x = x;
    };
    SudokuNode.prototype.getY = function () {
        return this.y;
    };
    SudokuNode.prototype.setY = function (y) {
        this.y = y;
    };
    SudokuNode.prototype.getValue = function () {
        return this.value;
    };
    SudokuNode.prototype.setValue = function (value) {
        this.value = value;
    };
    return SudokuNode;
}());

SearchingAndBacktracking.SudokuNode = SudokuNode;

SudokuUsingStack.main = async function (args) {
    var givenBoard = args.inputBoard;
    var dimX = 9;
    var dimY = 9;
    var low = 1;
    var sudoku = (function (dims) {
        var allocate = function (dims) {
            if (dims.length == 0) {
                return 0;
            }
            else {
                var array = [];
                for (var i = 0; i < dims[0]; i++) {
                    array.push(allocate(dims.slice(1)));
                }
                return array;
            }
        }; return allocate(dims);
    })([dimX, dimY]);
    for (var i = 0; i < dimX; i++) {
        {
            /* arraycopy */ (function (srcPts, srcOff, dstPts, dstOff, size) {
                if (srcPts !== dstPts || dstOff >= srcOff + size) {
                    while (--size >= 0)
                        dstPts[dstOff++] = srcPts[srcOff++];
                }
                else {
                    var tmp = srcPts.slice(srcOff, srcOff + size);
                    for (var i_1 = 0; i_1 < size; i_1++)
                        dstPts[dstOff++] = tmp[i_1];
                }
            })(givenBoard[i], 0, sudoku[i], 0, dimY);
        }
        ;
    }
    var stack = ([]);

    for (var i = 0; i < dimX; i++) {
        {
            for (var j = 0; j < dimY; j++) {
                {
                    var node = new SearchingAndBacktracking.SudokuNode(i, j);
                    var isPositionAvailable = SudokuUsingStack.isPosAvailable(node, givenBoard);
                    //console.info("Node = " + node.toString() + ", isPositionAvailable = " + isPositionAvailable);

                    break1: if (isPositionAvailable) {

                        for (var num = low; num <= 9; num++) {
                            {
                                node.setValue(num);
                                var isValidEntry = SudokuUsingStack.isValidEntry(node, sudoku);
                                //console.info("Node = " + node.toString() + ", isValidEntry = " + isValidEntry);
                                if (isValidEntry) {
                                    /* push */ stack.push(node);
                                    sudoku[i][j] = node.getValue();
                                    //console.info("stack.toString() = " + ('[' + stack.join(', ') + ']'));
                                    args.updateBoard(sudoku);
                                    await sleep(args.sleepTime)
                                    low = 0;
                                    break break1;
                                }
                            }
                            ;
                        }
                        //await sleep(300);
                        var sn = stack.pop();
                        sudoku[i][j] = 0;
                        i = sn.getX();
                        j = sn.getY() - 1;
                        low = sn.getValue();
                    }
                }
                ;
            }
        }
        ;
    }
    console.info("final stack.toString() = " + ('[' + stack.join(', ') + ']'));
    SudokuUsingStack.printBoard(sudoku, dimX, dimY, args);
};
/*private*/ SudokuUsingStack.printBoard = function (sudokuBoard, dimX, dimY, args) {
    allTheWayOut: for (var i = 0; i < dimX; i++) {
        {
            for (var j = 0; j < dimY; j++) {
                {
                    if (sudokuBoard[i][j] === 0) {
                        console.info("Couldn\'t find solution for this board!!");
                        args.noSolution();
                        break allTheWayOut;
                    }
                    console.log(sudokuBoard[i][j] + "  ");
                }
                ;
            }
            console.log("");
        }
    }
};
/*private*/ SudokuUsingStack.isPosAvailable = function (node, sudoku) {
    return sudoku[node.getX()][node.getY()] === 0;
};
/*private*/ SudokuUsingStack.isValidEntry = function (node, sudoku) {
    for (var i = 0; i < 9; i++) {
        {
            if (sudoku[node.getX()][i] === node.getValue()) {
                return false;
            }
        }
        ;
    }
    for (var i = 0; i < 9; i++) {
        {
            if (sudoku[i][node.getY()] === node.getValue()) {
                return false;
            }
        }
        ;
    }
    var x = node.getX() - node.getX() % 3;
    var y = node.getY() - node.getY() % 3;
    for (var i = x; i < x + 3; i++) {
        {
            for (var j = y; j < y + 3; j++) {
                {
                    if (sudoku[i][j] === node.getValue()) {
                        return false;
                    }
                }
                ;
            }
        }
        ;
    }
    return true;
};

SearchingAndBacktracking.SudokuUsingStack = SudokuUsingStack;



export default SearchingAndBacktracking;
