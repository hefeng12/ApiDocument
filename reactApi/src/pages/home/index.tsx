// import { Link } from 'react-router-dom';
import { Button, Space, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useState } from 'react';
import AddHeaders from '../AddHeaders';

import './index.scss';

interface parameter {
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
const parameterDatas:parameter[]=[
    {
        key:0,
        fieldKey:'user',
        fieldValue:'xiaohe',
        fieldType:'String',
        isNecessary:'是',
        description:'登录名'
    }
];

interface headers {
    key: number;
    fieldKey: string;
    fieldValue: string;
};

// const headersColumns:ColumnsType<headers>=[
//     {
//         title: '字段名',
//         dataIndex: 'fieldKey',
//         // width: 150,
//     },
//     {
//         title: '字段值',
//         dataIndex: 'fieldValue',
//         // width: 150,
//     },
//     {
//         title: '操作',
//         dataIndex: 'action',
//         key: 'action',
//         render: (text, record) => {
//             return(<Space size="middle"><a onClick={()=>deleteItem(record)}>删除</a></Space>)
//         },
//     },
// ];
// const headersData:headers[]=[
//     {
//         key:0,
//         fieldKey:'Content-Type',
//         fieldValue:'application/json;charset=UTF-8'
//     },
// ];



export default function Home(){

    const [isModalVisible,setIsModalVisible] = useState<boolean>(false)
    const [headersData,setHeadersData] = useState<Array<headers>>([
        {
            key:0,
            fieldKey:'Content-Type',
            fieldValue:'application/json;charset=UTF-8'
        }
    ])
    const headersColumns:ColumnsType<headers>=[
        {
            title: '字段名',
            dataIndex: 'fieldKey',
            width: '30%',
            align:'center',
        },
        {
            title: '字段值',
            dataIndex: 'fieldValue',
            width: '40%',
            align:'center',
        },
        {
            title: '操作',
            dataIndex: 'action',
            align:'center',
            render: (text, record) => {
                return(<Space size="middle"><a onClick={()=>deleteItem(record)}>删除</a></Space>)
            },
        },
    ];
    function deleteItem(value:headers){
        let data:Array<headers> = [];
        headersData.splice(value.key,1);
        headersData.forEach((item:headers,index:number)=>{
            let every = {
                key:index,
                fieldKey:item.fieldKey,
                fieldValue:item.fieldValue
            }
            data.push(every)
        })
        setHeadersData(data);
    };
    
    function handleOk(data:any){
        let newData = [...headersData];
        const num = newData.length;
        newData[newData.length] = {
            key:num,
            fieldKey:data.fieldKey,
            fieldValue:data.fieldValue
        };
        setHeadersData(newData);
        setIsModalVisible(false)
    }

    return (
        <div className='content'>
            <header className='header'>
                <p className='request-type'>get</p>
                <p className='request-url'>api/json</p>
                <p className='request-name'>这是请求的名字</p>
            </header>
            <div className='request-description'>
                <span>详细描述：</span>
                <span>无</span>
            </div>
            <div className='request-headers'>
                <p>请求头：</p>
                <Table columns={headersColumns} dataSource={headersData} pagination={false}/>
                <Button className='add-headers' onClick={()=>setIsModalVisible(true)}>添加请求头</Button>
            </div>
            <div className='request-parameter'>
                <p>参数：</p>
                <Table columns={parameterColumns} dataSource={parameterDatas} pagination={false}/>
            </div>

            
            <AddHeaders isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible} handleOk={handleOk}/>
        </div>
    )
}