import { FC, useEffect, useState, useRef } from 'react';
import { Button, Space, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { headers } from '../home/index';

interface childProps {
    setItemData: Function,
    setIsModalVisible: Function,
    headersData: Array<headers>,
    setHeadersData: Function,
    setTitle:Function
}

const Headers: FC<childProps> = (props) => {

    const headersColumns: ColumnsType<headers> = [
        {
            title: '字段名',
            dataIndex: 'fieldKey',
            width: '30%',
            align: 'center',
        },
        {
            title: '字段值',
            dataIndex: 'fieldValue',
            width: '40%',
            align: 'center',
        },
        {
            title: '操作',
            dataIndex: 'action',
            align: 'center',
            render: (text, record) => {
                return (<Space size="middle"><a onClick={() => deleteItem(record)}>删除</a><a onClick={() => editItem(record)}>编辑</a></Space>)
            },
        },
    ];
    function deleteItem(value: headers) {
        let data: Array<headers> = [];
        props.headersData.splice(value.key, 1);
        props.headersData.forEach((item: headers, index: number) => {
            let every = {
                key: index,
                fieldKey: item.fieldKey,
                fieldValue: item.fieldValue
            };
            data.push(every);
        })
        props.setHeadersData(data);
    };
    function editItem(value: headers) {
        props.setTitle('编辑请求头');
        props.setItemData(value);
        props.setIsModalVisible(true);
    }
    function addHeader(){
        props.setTitle('添加请求头');
        props.setItemData(null);
        props.setIsModalVisible(true);
    }


    return (
        <div className='request-headers'>
            <p>请求头：</p>
            <Table columns={headersColumns} dataSource={props.headersData} pagination={false} />
            <Button className='add-headers' onClick={addHeader}>添加请求头</Button>
        </div>
    )
}

export default Headers