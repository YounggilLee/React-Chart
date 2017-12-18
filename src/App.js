import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Chart from './components/Chart';
import autobahn from 'autobahn';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      chartData:{}
        }   
  }
 
  componentWillMount(){
    this.getChartData();
  }

  getChartData(){      
    
    var tempInfo = [];

        // Websocket calls
        const connection = new autobahn.Connection({
          url: 'localhost:9000', 
          realm: 'realm1'
        });

     
        connection.onopen = function (session) {
          console.log('websocket is connected ...')              
          
          session.subscribe('com.test.temp', function (message) {
                
             console.log(message);
               tempInfo.push(message[0])
        
             console.log(tempInfo.length);


             this.setState({                 
              chartData:{
                labels: ['Boston', 'Worcester', 'Springfield', 'Lowell', 'Cambridge', 'New Bedford'],
                datasets:[
                  {
                    label:'Population',
                    data: tempInfo,
                    backgroundColor:[
                      'rgba(255, 99, 132, 0.6)',
                      'rgba(54, 162, 235, 0.6)',
                      'rgba(255, 206, 86, 0.6)',
                      'rgba(75, 192, 192, 0.6)',
                      'rgba(153, 102, 255, 0.6)',
                      'rgba(255, 159, 64, 0.6)',
                      'rgba(255, 99, 132, 0.6)'
                    ]
                  }
                ]
              }
            });//end setState
             
          });//end subcribe
         
        }//end session
        
        connection.open();        

        

  }//end getData function

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <Chart chartData={this.state.chartData} location="Massachusetts" legendPosition="bottom"/>
      </div>
    );
  }
}

export default App;
