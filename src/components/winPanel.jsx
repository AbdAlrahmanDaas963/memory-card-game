import React, { Component } from 'react';
import { motion } from "framer-motion";

export class WinPanel extends Component {
    render() {
        const { show, flip, restart } = this.props;
        if (show === 8)
        return (
            <motion.div initial={{ scale:0 }} animate={{ scale: 1, x: "-50%", y: "-50%" }} className="win">
                <h1>You Win!</h1>
                <h2>{flip} flips</h2>
                <button onClick={restart} className="restart">
                    New game
                </button>
            </motion.div>
        )
        return null
    }
}

export default WinPanel
