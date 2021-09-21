import { FC, useEffect, useState, useRef } from 'react';
import { Button, Space, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { parameter } from '../home/index';

interface childProps {
    setItemData: Function,
    setIsModalVisible: Function,
    paramsData: Array<parameter>,
    setHeadersData: Function,
}

const Params: FC<childProps> = (props) => {

    const parameterColumns: ColumnsType<parameter> = [
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
        {
            title: '操作',
            dataIndex: 'action',
            align: 'center',
            render: (text, record) => {
                return (<Space size="middle"><a onClick={() => editItem(record)}>编辑</a></Space>)
            },
        },
    ];
    
    function editItem(value: parameter) {
        props.setItemData(value);
        props.setIsModalVisible(true);
    }

    return (
        <div className='request-headers'>
            <p>请求头：</p>
            <Table columns={parameterColumns} dataSource={props.paramsData} pagination={false} />
        </div>
    )
}

export default Params