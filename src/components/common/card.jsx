import React, { Component } from 'react'
import { motion } from "framer-motion";


export class Cards extends Component {
    re=()=>{
        this.open();
        const {id } = this.props;
            document.getElementById(`front${id}`).style.transform= "rotateY(0deg)";
            document.getElementById(`back${id}`).style.transform= "rotateY(-180deg)";
    }
    componentDidMount() {
        const {start} = this.props;
        if(start) this.open()
    }
    
    open = () => {
        const {id} = this.props;
        console.log("open")
        setTimeout(() => {
            document.getElementById(`back${id}`).style.transform= "rotateY(0deg)";
            document.getElementById(`front${id}`).style.transform= "rotateY(180deg)";
            setTimeout(() => {
                document.getElementById(`back${id}`).style.transform= "rotateY(-180deg)";
            document.getElementById(`front${id}`).style.transform= "rotateY(0deg)";
            }, 1000);
        }, 1200);
        
    }
    render() {
        
        const {id , onClick, type, enable, img, restart} = this.props;
        if(restart) this.re()
        const frontCls = `sides front front${id}`;
        const backCls = `sides back back${id}`;
        const delay = id > 9 ? `1.${id-9}` : `.${id}`;
        const transition = {
            ease: "easeInOut", 
            duration: .3,
            delay: delay
        }
        
        return (
            <div className="cen">
                <motion.div 
                initial={{ opacity:0, scale:3, rotateY:"-180deg" }} 
                transition={transition} 
                animate={{ opacity:1, scale:1 , rotateY:0}} 
                className="one">
                    <button     
                        id={`front${id}`} 
                        onClick={()=>onClick(id,type)}
                        className={frontCls}
                        disabled={enable}
                    >
                        {/* {type} */}
                    </button>
                    <motion.img 
                        src={img} 
                        id={`back${id}`} 
                        className={backCls} 
                        width="100%" 
                        height="100%" 
                    />
            </motion.div>
            </div>
        )
    }
}

export default Cards
