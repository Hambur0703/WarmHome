import React from 'react';
import './index.scss';
import { Modal, Button } from 'antd';
import {  HeartFilled  } from '@ant-design/icons';
import axios from 'axios';


export default class Card extends React.Component {
    state={
        show:false,
        likeState:false
    }
    
    componentDidMount(){
        const {info:{aptLike}} = this.props;
        this.setState({likeState: aptLike === 'like'})

    }

    showModal = () => {
        this.setState({ show: true});
    };
     
    handleOk = () => {
        this.setState({ show: false});
    };
     
    handleCancel = () => {
        this.setState({ show: false});
    };

    // infoFunction = (info) => {
    //     Modal.info({
    //       title: 'This is a notification message',
    //       content: (
    //         <>
    //             <div>{info.aptDes}</div>
    //             <div>Price:<span>{info.aptPrice}</span></div>
    //             <div>{info.aptAddress}</div>
    //         </>
    //       ),
    //       onOk() {},
    //     });}

    setLike = (id) =>{
        return () =>{
            const {likeState} = this.state;
            const like = !likeState ? 'like' :'unlike';
            this.setState({likeState:!likeState})
            axios.put('http://localhost:3002/apt/' + id, {aptLike:like})

            console.log("chieck_Likeid:",id,like)
        }
    }

    render(){
        const {info} = this.props;//解析props的info属性
        const {show,likeState} = this.state;//内层获取的，即组件自身的
        console.log(info)
        console.log("info_id:",info._id)
        return (
        <div className="card">
            <div className="cardInside">
                <div className="aptImage"><img src={info.aptImage}></img></div>
                <div className="aptName">{info.aptName}</div>
                <div className="aptPrice">&#36;{info.aptPrice}/Month</div>
                <div className="bottomPart">
                    <Button type="dashed" onClick={this.showModal}>
                        Check detail
                    </Button>
                    <HeartFilled style={ { color:likeState?'OrangeRed':'Gainsboro',fontSize:20}} onClick={this.setLike(info._id)}/>
                </div>
                
            </div>
            <Modal 
                title={info.aptName} 
                visible={show} 
                onCancel={this.handleCancel} 
                onOk={this.handleOk}
                footer={[<Button type="primary" onClick={this.handleOk} >OK</Button>]}//rewrite button to remove cancel
            >
                <div>{info.aptDes}</div>
                <div>Price:<span>{info.aptPrice}</span></div>
                <div>Address:{info.aptAddress}</div>
            </Modal>
            
        </div>
        )
        
    }
}


