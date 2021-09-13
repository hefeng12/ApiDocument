import { FC, useEffect, useState } from 'react';
// import { Redirect, Route, Switch, withRouter } from 'react-router-dom';
// import { Routers } from './router';
import { Layout } from 'antd';
import SliderBar from './pages/sidebar';
import './App.css';
import axios from './htttp/axios';
import {Home} from './pages';

const { Header, Content, Footer } = Layout;


interface childNameType{
  name:string,
  id:string
}
export interface left{
  moduleName:string,
  childName:childNameType[]
}

const App:FC = ()=>{
  const [leftData,setLeftData]=useState<Array<left>>([]);
  const [apiData,setApiData]=useState([]);
  useEffect(()=>{
    axios.get('apis')
    .then(function (res) {
        // console.log(response);
        if(res.status===200){
          let data = res.data
          let sliderData:Array<left> = []
          let id:number = 0
          data.forEach((items:any)=>{
            let everyModule:left={
              moduleName:items.name,
              childName:[]
            }
            items.children.forEach((it:any,index:number)=>{
              everyModule.childName[index] = {name:it.name,id:id++ +''};
            })
            sliderData.push(everyModule);
          })
          id = 0;
          setLeftData(sliderData);
        }
    })
    .catch(function (error) {
        console.log(error);
    })
  },[]);
  return (
    <div>
      <div className='side-bar'>
        <Layout style={{ minHeight: '100vh' }}>
          <SliderBar data={leftData} />
          <Layout className="site-layout" style={{ marginLeft: 200 }}>
            <Header className="site-layout-background" style={{ padding: 0 }} />
            <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
              {/* <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>User</Breadcrumb.Item>
                <Breadcrumb.Item>Bill</Breadcrumb.Item>
              </Breadcrumb>
              <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                Bill is a cat.
              </div> */}
              <Home />
            </Content>
            <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
          </Layout>
        </Layout>
      </div>
    </div>
  )
}

// export default withRouter(App)
export default App