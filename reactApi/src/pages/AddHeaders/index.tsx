import { FC, useEffect, useState,useRef } from 'react';
import { Modal, Input } from 'antd';
import {headers} from '../home/index'


interface childProps{
    isModalVisible:boolean,
    setIsModalVisible:Function,
    handleOk:Function,
    itemData?:headers | null,
    title:string,
}

const AddHeaders:FC<childProps>=(props)=>{
    // const input1 = useRef<any>('');
    // const input2 = useRef<any>('');
    const [input1,setInput1] = useState('');
    const [input2,setInput2] = useState('');
    useEffect(()=>{
        if(props.itemData){
            setInput1(props.itemData.fieldKey);
            setInput2(props.itemData.fieldValue);
        }else{
            setInput1('');
            setInput2('');
        }
    },[props.isModalVisible])
    function Ok() {
        if(input1&&input2){
            let data = {
                fieldKey:input1,
                fieldValue:input2,
                key:-1,
            };
            if(props.itemData){
                data.key = props.itemData.key;
            }
            props.handleOk(data);
        }else{
            Modal.info({
                title: '添加失败',
                content: (
                  <div>
                    <p>输入的信息的请求头的字段名或字段值为空</p>
                  </div>
                ),
                onOk() {},
            });
            
        }
    }
    function changeInput(key:string,value:string){
        if(key==='input1'){
            setInput1(value);
        }else{
            setInput2(value);
        }
    }
    return (
        <div>
            <Modal 
                title={props.title}
                visible={props.isModalVisible} 
                onOk={Ok}
                onCancel={()=>props.setIsModalVisible(false)}
                okText='确定'
                cancelText='取消'
                wrapClassName='add-headers-modal'
            >
                <div>
                    <span>请求头字段名：</span>
                    <Input onChange={(value)=>changeInput('input1',value.target.value)} value={input1}/>
                </div>
                <div>
                    <span>请求头字段值：</span>
                    <Input onChange={(value)=>changeInput('input2',value.target.value)} value={input2}/>
                </div>
            </Modal>
        </div>
    )

}

export default AddHeaders