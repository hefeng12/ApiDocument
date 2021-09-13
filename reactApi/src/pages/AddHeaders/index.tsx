import { FC, useEffect, useState,useRef } from 'react';
import { Modal, Input } from 'antd';


interface childProps{
    isModalVisible:boolean,
    setIsModalVisible:Function,
    handleOk:Function,
}

const AddHeaders:FC<childProps>=(props)=>{
    const input1 = useRef<any>('');
    const input2 = useRef<any>('');
    function Ok() {
        if(input1.current.state.value&&input2.current.state.value){
            let data = {
                fieldKey:input1.current.state.value,
                fieldValue:input2.current.state.value
            };
            props.handleOk(data);
            input1.current.state.value='';
            input2.current.state.value='';
        }else{
            Modal.info({
                title: '请检查输入的信息',
                content: (
                  <div>
                    <p>输入的信息的请求头的字段名或字段值为空</p>
                  </div>
                ),
                onOk() {},
            });
            
        }
    }
    return (
        <div>
            <Modal 
                title="添加请求头" 
                visible={props.isModalVisible} 
                onOk={Ok}
                onCancel={()=>props.setIsModalVisible(false)}
                okText='确定'
                cancelText='取消'
                wrapClassName='add-headers-modal'
            >
                <div>
                    <span>请求头字段名：</span>
                    <Input ref={input1}/>
                </div>
                <div>
                    <span>请求头字段值：</span>
                    <Input ref={input2}/>
                </div>
            </Modal>
        </div>
    )

}

export default AddHeaders