import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';



class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            weather: [],
            value: '',
        }
    }


    componentDidMount() {
           this.getWeather('cincinnati',10)

    }

    getNewWeather(e){
      e.preventDefault();
      this.getWeather(this.state.value,10);
    }
    getWeather(city, number){
      axios.get(`http://api.openweathermap.org/data/2.5/forecast/daily?q=${city}&units=imperial&cnt=${number}&APPID=b52a2c029fff494c5032a2860ad870f2`)
      .then((response)=> {
        this.setState({
          weather: response.data.list
        })
      });
    }

    changedInput(e){
      this.setState({
        value:e.target.value,
      })
    }



    render() {
      const weather = this.state.weather.map(day => {
    let url = `http://openweathermap.org/img/w/${day.weather[0].icon}.png`
        return ( <div className='col-md-12'>
          <p>High:{day.temp.max}</p>
          <p>{day.weather[0].description}</p>
          <p>Low:{day.temp.min}</p>
          <img src={url}/>
        </div>)
      });
      
        return ( 
          <div className= "App" >

          <form onSubmit={this.getNewWeather.bind(this)}>
            <input className="form-control" onChange={this.changedInput.bind(this)} type="text" placeholder="Enter City" />
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>

          <h3>{weather}</h3>
            <div className= "App-header" >
            <img src= { logo }
            className= "App-logo"
            alt= "logo" / >
            <h2> Welcome to React </h2> </div> <p className= "App-intro">
            To get started, edit <code> src / App.js </code> and save to reload. </p> </div>
        );
    }
}

export default App;
