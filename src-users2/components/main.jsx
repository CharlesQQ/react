import React from 'react'
import axios from 'axios'
import PubSub from 'pubsub-js'

export default class Main extends React.Component {

    state = {
        initView: true,
        loading: false,
        users: null,
        errorMsg: null
    };

    componentDidMount(){
        //订阅消息, 回调函数中的this 和实例this 不一样,为了保持一致,必须使用=>
        PubSub.subscribe('search', (msg, searchName) => {
            console.log(msg, searchName);
            this.setState({
                initView:false,
                loading:true
            });
            //发送ajax 请求
            const url = `https://api.github.com/search/users?q=${searchName}`;
            axios.get(url)
                .then(response=>{
                    //得到响应数据
                    const result = response.data;
                    console.log(result);
                    const users =  result.items.map(item =>({name: item.login, url: item.html_url, avatarUrl: item.avatar_url}))  //或者使用{return {name: item.login}}
                    //更新状态, 成功
                    this.setState({loading:false, users})
                }).catch(error=>{
                //更新状态失败
                this.setState({loading:false, errorMsg:error.message})
            })
        })
    }

    render() {
        const {initView, loading, users, errorMsg} = this.state;
        const {searchName} = this.props;
        console.log('render()',searchName);
        if(initView) {
            return <h2>请输入关键进行搜索</h2>
        }else if(loading) {
            return <h2>正在请求中...</h2>
        }else if (errorMsg){
            return <h2>{errorMsg}</h2>
        }else {
            return (
                <div className="row">
                    {
                        users.map((user, index) => (     //==>后面使用小括号, ()里面的内容就不用使用return
                                                            //==> 代表函数和返回
                            //map 下面的每一个div 都需要一个key属性
                            <div className="card" key={index}>
                                <a href={user.url} target="_blank">
                                    <img src={user.avatarUrl} style={{width: 100}}   />
                                </a>
                                <p className="card-text">{user.name}</p>
                            </div>
                        ))
                    }
                </div>
            )
        }

    }

}