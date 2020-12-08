import React, { useState } from 'react';
import Board from '../src/components/Board.jsx';
import Head from 'next/head';

function Page(props) {
    const [state, setState] = useState({
        board: [[]]
    })

    return (
        <div>
            <Board />
        </div>
    )
}


export default Page;