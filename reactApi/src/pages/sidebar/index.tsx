import { FC, useState, useEffect } from 'react';
import { Layout, Menu } from 'antd';
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import {left} from '../../App';
import './index.scss';


const { Sider } = Layout;
const { SubMenu } = Menu;

interface childProps{
    data:left[]
}

const SliderBar:FC<childProps> = (props)=>{
    const [allApis,setAllApis] = useState([]);
    return(
        <div>
            <Sider
                style={{
                    overflow: 'auto',
                    height: '100vh',
                    position: 'fixed',
                    left: 0,
                }}
            >
                <div className="logo" />
                {/* <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                    <Menu.Item key="1" icon={<PieChartOutlined />}>
                        Option 1
                    </Menu.Item>
                    <Menu.Item key="2" icon={<DesktopOutlined />}>
                        Option 2
                    </Menu.Item>
                    <SubMenu key="sub1" icon={<UserOutlined />} title="User">
                        <Menu.Item key="3">Tom</Menu.Item>
                        <Menu.Item key="4">Bill</Menu.Item>
                        <Menu.Item key="5">Alex</Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub2" icon={<TeamOutlined />} title="Team">
                        <Menu.Item key="6">Team 1</Menu.Item>
                        <Menu.Item key="8">Team 2</Menu.Item>
                    </SubMenu>
                    <Menu.Item key="9" icon={<FileOutlined />}>
                        Files
                    </Menu.Item>
                </Menu> */}
                <Menu theme="dark" defaultSelectedKeys={['0']} mode="inline" onSelect={(e)=>{console.log(e)}}>
                    {props.data&&props.data.map(item=>{
                        return (
                        <SubMenu key={item.moduleName} icon={<UserOutlined />} title={item.moduleName}>
                            {item.childName.map(it=>{
                                return <Menu.Item key={it.id}>{it.name}</Menu.Item>
                            })}
                        </SubMenu>)
                    })}
                </Menu>
            </Sider>
        </div>
    )
}

export default SliderBar