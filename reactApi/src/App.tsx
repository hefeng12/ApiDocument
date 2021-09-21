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


export interface paramsType{
  name:string,
  value:string,
  type:string,
  description:string,
  isNecessary:boolean
}
export interface apiObject{
  id:number,
  name:string,
  methods:string,
  url:string,
  description:string,
  params?:paramsType[],
  data?:paramsType[],
  headers:object,
  success:object,
}

const App:FC = ()=>{
  const [leftData,setLeftData]=useState<left[]>([]);
  const [apiData,setApiData]=useState<any[]>([]);
  const [curentApiData,setCurentApiData]=useState<apiObject>({
    id:0,
    name:'xiaohe',
    methods:'get',
    url:'api',
    description:'描述',
    headers:{},
    success:{},
    params:[],
    data:[]
  });
  useEffect(()=>{
    axios.get('apis')
    .then(function (res) {
        // console.log(response);
        if(res.status===200){
          let data = res.data;
          let sliderData:Array<left> = [];
          let id:number = 0;
          let apiData:Array<any> = []
          data.forEach((items:any)=>{
            let everyModule:left={
              moduleName:items.name,
              childName:[]
            };
            items.children.forEach((it:any,index:number)=>{
              everyModule.childName[index] = {name:it.name,id:id++ +''};
              let obj = {
                id,
                name:it.name,
                methods:it.methods,
                url:it.url,
                description:it.description,
                headers:it.headers,
                success:it.success,
                params:it.params,
                data:it.data,
              }
              if(it.methods.toLocaleLowerCase()==='get'){
                delete obj.data;
              }else{
                delete obj.params;
              }
              apiData.push(obj);
            })
            sliderData.push(everyModule);
          })
          id = 0;
          setLeftData(sliderData);
          setApiData(apiData);
          setCurentApiData(apiData[0]);
        }
    })
    .catch(function (error) {
        console.log(error);
    })
  },[]);
  function changeData(index:number){
    setCurentApiData(apiData[index])
  }
  return (
    <div>
      <div className='side-bar'>
        <Layout style={{ minHeight: '100vh' }}>
          <SliderBar data={leftData} changeData={changeData}/>
          <Layout className="site-layout" style={{ marginLeft: 200 }}>
            <Header className="site-layout-background" style={{ padding: 0 }} />
            <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
              <Home currentData={curentApiData}/>
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