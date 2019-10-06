import React from 'react';
import './App.css';

class App extends React.Component{

  state ={
    boxes : Array(9).fill(null),
    curr : null,
    winner : null,
    tie : false
  };

  onBox = (i) =>{
    if(this.state.boxes[i] === null){
      const newboxes=this.state.boxes;
      newboxes[i] = this.state.curr;
      const newp = (this.state.curr === 'X')?'O':'X';
      this.setState({
        boxes : newboxes,
        curr : newp ,
      })
    }
    this.checker();
    this.tchecker();
  }

  tchecker =() =>{
    let x=0;
    for(let i=0 ; i<9 ;i++){
      x+=(this.state.boxes[i]!=null);
    }
    if(x === 9){
      this.setState({
        tie : true
      })
    }
  }

  checker =() =>{
    const A = [
      [0,1,2],
      [1,4,7],
      [0,4,8],
      [0,3,6],
      [2,5,8],
      [2,4,6],
      [3,4,5],
      [6,7,8]
    ];
    for(let i=0 ; i<8 ;i++){
      const[x,y,z]=A[i];
      if(this.state.boxes[x]!==null && this.state.boxes[x]===this.state.boxes[y] &&
        this.state.boxes[x]===this.state.boxes[z]){
          this.setState({
              winner :this.state.curr,
          })
          break;
        }
    }
  }
  reseter =() =>{
    this.setState({
      boxes : Array(9).fill(null),
      curr : 'X',
      winner : null,
      tie : false
    })
  }

  userReg =(e) =>{
    e.preventDefault();
    this.setState({curr : e.target.value});
  }
  render(){
   
    const board = this.state.boxes.map(
      (box,i) =>
        <div key={i} className='Box' onClick={()=>this.onBox(i)} >
          {box}
        </div>
    );

    return (
      <div className="App">
      <div>
        <h1>TIC TAC TOE </h1>
        <br/>
        
            {
              (this.state.curr === null)?
                <form onClick={(e)=>this.userReg(e)}>
                  Select your control<br/>
                  <input type="radio" name="gender" value="X"/>X<br/>
                  <input type="radio" name="gender" value="O"/> O<br/>
                  {/* <input type="submit" value="Submit"/> */}
                </form>
              :
              (this.state.winner !== null) ?
                <div>
                  The winner is {this.state.winner}
                </div>
              : 
              (!this.state.tie)?
                  <div className='board'>
                      {board}
                  </div>
              :   <h3>
                    It is a tie
                  </h3>
            }
      </div>
      <div>
          <br/><br/>
          {
            (this.state.curr !== null)?
            <button onClick={this.reseter}>Reset All</button>
            : null
          }
      </div>
      </div>
      );
  }
}

export default App;
