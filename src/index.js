import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
/*一个app的实现过程
1.拆分组件
2.实现静态组件（只有静态界面，没有动态数据和交互）
3.实现动态组件
   1).实现初始化数据动态展示
   2).实现交互功能
*/

/*
一个组件的实现过程：
1.定义组件(两种方式)  
  组件标签名可以随便定义，但最好与组件实际功能想符合，另外第一个字母必须大写，为了与html原生标签相区分
  1).定义工厂函数组件(function MyComponent(){})
  2).定义ES6组件类(class MyComponent extends React.Component {})
2.渲染组件
  ReactDOM.render(<MyComponent />, document.getElementById(''))
*/

/*app功能是实现通过点击按钮将输入框中的数据添加到列表顶部*/
/*所以一共分为3个组件
	1.包含输入操作的组件(Add)
	2.包含列表的组件(List)
	3.包含整个页面的大组件(App)
最后，只需要渲染<App />组件标签就可以了
*/

/*组件的三大属性
  1. state 表示状态，用来处理组件内部的数据 this.state = {}
  2. props 表示属性，用于接收外部的数据 this.props = {}
  3. refs 用来代替id，用来标识虚拟dom，方便组件调用虚拟dom
*/

//实现动态数据即需要传入数据，通过两个子组件发现需要一个共同的数组用来帮助input存储数据和list取出数据
//所以将数组放在两个子组件的父组件的state中实现

/*此app交互就是通过点击按钮将框中数据写入数组中去，但点击操作在Add组件，
  子组件要改变父组件的状态，直接输入是不行的
  解决方法：
  父组件定义函数，将函数传入子组件，子组件调用函数来实现功能
*/
//1.定义组件
class App extends React.Component { //extends表示继承
	constructor(props){    //初始化状态只做一次
		super(props); //将props指向类App的父类Component
		this.state = {
			todos: ['吃饭','睡觉','写代码']
		}

		this.addtodo = this.addtodo.bind(this);
	}

	addtodo(x){
		const {todos} = this.state;
		todos.unshift(x);
		//仅仅修改state中数组值是不够的，还需要更新状态才行
		this.setState({todos});
	}

	render(){		//但每次渲染都会重新读取状态
		const {todos} = this.state; //ES6写法 等效于todos = this.state.todos
		return (
			<div>
				<h1>Simple Todo List</h1>
				<Add count={todos.length} addtodo={this.addtodo} />
				<List todos={todos}/>
			</div>
		)
	}
}

class Add extends React.Component {
	constructor(props){
		super(props);

		this.add = this.add.bind(this);
	}

	add() {
		const todo = this.input.value;
		if(!todo){
			return;
		}
		this.props.addtodo(todo);
		this.input.value = '';
	}

	render(){
		return (
			<div>
				<input type='text' ref={input => this.input = input} />
				<button onClick={this.add}>Add#{this.props.count+1}</button>
			</div>
		)
	}
}
//约束输入
Add.propTypes = {
	count: PropTypes.number.isRequired,
	addtodo: PropTypes.func.isRequired
}

class List extends React.Component {
	render(){
		return (
			<ul>
			{this.props.todos.map((todo,index) => (<li key={index}>{todo}</li>))}
			</ul>
		)
	}
}
//约束输入
List.propTypes = {
	todos: PropTypes.array.isRequired
}

//2.渲染组件
ReactDOM.render(<App />,document.getElementById('root'))