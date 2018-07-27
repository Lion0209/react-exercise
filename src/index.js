import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

//方格
// class Square extends React.Component{

//   render(){
//     return(
//       <button 
//         className="square" 
//         onClick={()=>this.props.onClick()}
//       >
//         {this.props.value}
//       </button>
//     );
//   }
// }

//函数化方格
function Square(props){
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

//棋盘
class Board extends React.Component{




  renderSquare(i){
    return (
    <Square 
        value={this.props.squares[i]}
        onClick={()=>this.props.onClick(i)}
        />
    ); 
  }

  render(){


    return (
      <div>

        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    )
  }
}

//游戏
class Game extends React.Component{

  

  constructor(){
    super();
    this.state={
      history:[{
        squares:Array(9).fill(null),

      }],
      stepNumber:0,
      xIsNext:true,
    };
  }

  handleClick(i){
    const history = this.state.history.slice(0,this.state.stepNumber+1);
    const current = history[history.length-1];
    const squares = current.squares.slice();
    if(calculateWinner(squares)||squares[i]){
      return ;
    }
    squares[i]=this.state.xIsNext ? 'X':'O';
    this.setState({
      history:history.concat([{
        squares:squares,
      }]),
      stepNumber:history.length,
      xIsNext:!this.state.xIsNext,
    });
  }

  jumpTo(step){
    this.setState({
      stepNumber:step,
      xIsNext:(step%2)===0,
    });
  }

  render(){

    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const moves=history.map((step,move)=>{
      const desc=move?
        'Go to move#'+move:
        'Go to game start';
      return (
        <li key={move}>
          <button onClick={()=>this.jumpTo(move)}>{desc}</button>
        </li>
      )
    })

    let status;
    if(winner){
      status='Winner'+winner;
    }else{
      status='Next player'+(this.state.xIsNext ? 'X':'O');
    }

    return (
      <div className="game"> 
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i)=>this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    )
  }
}

//====================================================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

function calculateWinner(squares){
  const lines=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
  ];
  for(let i=0;i<lines.length;i++){
    const [a,b,c]=lines[i];
    if(squares[a]&&squares[a]===squares[b]&&squares[a]===squares[c]){
      return squares[a];
    }
  }
  return null;
}




//root2
function tick(){
  const element=(
    <div>
      
      <h2>It is {new Date().toLocaleTimeString()}.</h2>
    </div>
  );
  ReactDOM.render(element,document.getElementById('root2'));
}
tick();
setInterval(tick,1000);


//root3
//渲染一个组件，元素也可以代表用户定义的组件，当 React 遇到一个代表用户定义组件的元素时，
//它将 JSX 属性以一个单独对象的形式传递给相应的组件。 我们将其称为 “props” 对象。
function Welcome(props){
  return (
    <h2>Hello,{props.name}</h2>
  );
}
const element=<Welcome name="hfh"/>
ReactDOM.render(
  element,
  document.getElementById('root3'),
);


//root4
//合成组件，组件可以在它们的输出中引用其它组件。这使得我们可以使用同样的组件来抽象到任意层级。
//一个按钮，一个表单，一个对话框，一个屏幕：在 React 应用中，所有这些都通常描述为组件。
function App(){
  return (
    <div>
      <Welcome name="张三"/>
      <Welcome name="李四"/>
      <Welcome name="王五"/>
    </div>
  );
}
ReactDOM.render(
  <App/>,
  document.getElementById('root4'),
);

//root5
//提取组件



//clock
//封装时钟为函数组件
function Clock(props){
  return(
    <div>
      <h2>It is {props.date.toLocaleTimeString()}</h2>
    </div>
  );
}
function tick2(){
  ReactDOM.render(
    <Clock date={new Date()}/>,
    document.getElementById('clock1')
  );
}
tick2();
setInterval(tick2,1000);



//clock2
//将时钟函数组件转换为类组件
//只引用一个 Clock , 然后让它自动计时并更新:
class Clock2 extends React.Component{

  constructor(props){
    super(props),
    this.state={date:new Date()}
  }

  componentDidMount(){
    this.timerId=setInterval(
      ()=>this.tick3(),
      1000
    );
  }

  componentWillUnmount(){
    clearInterval(this.timerId);
  }

  tick3(){
    this.setState({
      date:new Date()
    });
  }

  render(){
    return(
      <h2>It is {this.state.date.toLocaleTimeString()}</h2>
    );
  }
} 

ReactDOM.render(
  <Clock2 />,
  document.getElementById('clock2')
);

