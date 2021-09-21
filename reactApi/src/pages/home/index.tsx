// import { Link } from 'react-router-dom';
import { Button, Space, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useState, FC, useEffect } from 'react';

import {apiObject, paramsType} from '../../App';
import Headers from '../Headers'
import AddHeaders from '../AddHeaders';

import './index.scss';

export interface parameter {
    key: number;
    fieldKey: string;
    fieldValue: string;
    fieldType: string;
    isNecessary: string;
    description: string;
};

const parameterColumns:ColumnsType<parameter>=[
    {
        title: '字段名',
        dataIndex: 'fieldKey',
        // width: 150,
    },
    {
        title: '字段值',
        dataIndex: 'fieldValue',
        // width: 150,
    },
    {
        title: '字段类型',
        dataIndex: 'fieldType',
        // width: 150,
    },
    {
        title: '是否必选',
        dataIndex: 'isNecessary',
    },
    {
        title: '描述',
        dataIndex: 'description',
    },
];

export interface headers {
    key: number;
    fieldKey: string;
    fieldValue: string;
};

let itemData:headers | null = null;

const text = {
    code:200,
    msg:'success',
    data:{
        user:'789',
        token:'123456'
    }
}

function processingData(data:any){
    let allKeys = Object.keys(data);
    debugger
    return <div className='123'>
        {allKeys.map((item)=>{
            console.log(data[item])
            if(data[item] instanceof Object){
                processingData(data[item])
            }else{
                return item+'：'+data[item]+'，'
            }
        })}
    </div>
}

interface childProps{
    currentData:apiObject
}

const Home: FC<childProps> = (props) => {
    const [isModalVisible,setIsModalVisible] = useState<boolean>(false)
    const [title,setTitle] = useState<string>('添加请求')
    const [headersData,setHeadersData] = useState<Array<headers>>([])
    const [parameterDatas,setParameterDatas] = useState<Array<parameter>>([])
    useEffect(()=>{
        if(props.currentData.id){
            const keys1 = Object.keys(props.currentData.headers);
            let data1:Array<headers> = [];
            keys1.forEach((item,index)=>{
                data1.push({
                    key:index,
                    fieldKey:item,
                    fieldValue:props.currentData.headers[item]
                })
            });
            let data2:parameter[] = [];
            let keys2:paramsType[] | undefined = [];
            if(props.currentData.methods.toLocaleLowerCase()==='get'){
                keys2 = props.currentData.params;
            }else{
                keys2 = props.currentData.data;
            }
            if(keys2!==undefined){
                keys2.forEach((item:paramsType,index:number)=>{
                    data2.push({
                        key:index,
                        fieldKey:item.name,
                        fieldValue:item.value,
                        fieldType:item.type,
                        isNecessary:item.isNecessary?'是':'否',
                        description:item.description
                    })
                })
            }
            setHeadersData(data1);
            setParameterDatas(data2);
        }
    },[props.currentData.id])
    function setItemData(value:headers | null){
        itemData = value
    };
    
    function handleOk(data:headers){
        let newData = [...headersData];
        const num = newData.length;
        if(data.key!==-1){
            newData[data.key] = {
                key:data.key,
                fieldKey:data.fieldKey,
                fieldValue:data.fieldValue
            }
        }else{
            newData[newData.length] = {
                key:num,
                fieldKey:data.fieldKey,
                fieldValue:data.fieldValue
            };
        }
        setHeadersData(newData);
        setIsModalVisible(false);
        setItemData(null);
    }

    return (
        <div className='content'>
            {props.currentData.id&&<div>
                <header className='header'>
                    <p className='request-type'>{props.currentData.methods}</p>
                    <p className='request-url'>{props.currentData.url}</p>
                    <p className='request-name'>{props.currentData.name}</p>
                </header>
                <div className='request-description'>
                    <span>详细描述：</span>
                    <span>{props.currentData.description}</span>
                </div>
                <Headers 
                    setItemData={setItemData} 
                    setIsModalVisible={setIsModalVisible}
                    headersData={headersData}
                    setHeadersData={setHeadersData}
                    setTitle={setTitle}
                />
                <div className='request-parameter'>
                    <p>参数：</p>
                    <Table columns={parameterColumns} dataSource={parameterDatas} pagination={false}/>
                </div>
                <div className='success-description'>
                    <p>返回示例：</p>
                    <pre>{JSON.stringify(props.currentData.success,null,2)}</pre>
                </div>
                <Button>试一试</Button>
                <AddHeaders isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible} handleOk={handleOk} itemData={itemData} title={title}/>
            </div>}
        </div>
    )
}


export default Home