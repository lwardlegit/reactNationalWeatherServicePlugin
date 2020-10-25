import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styles from './styles.module.css'

export default class WeatherAlert extends Component {  
  static propTypes = { 
     /**     * value: The default value for the input box. 
      * placeholder: The placeholder text for the input box.     */    
      lat: PropTypes.string,
      lon: PropTypes.string,   
     
    }
    state = { 
      weatherData: null,  
    }

    componentDidMount() { 
    
         //grab weather data  
         fetch(`https://api.weather.gov/points/${this.props.lat},${this.props.lon}`)
         .then(response => response.json())
         .then(body => {
          console.log(body, body.properties.gridX,body.properties.gridY)

          //use the grid coords from user location to get the exact weather/forecase


          fetch(`https://api.weather.gov/gridpoints/TOP/${body.properties.gridX},${body.properties.gridY}/forecast`)
          .then(response => response.json())

          .then(body=>{
            console.log("weather forecast finally")
            console.log(body)
            const current = body.properties.periods.filter((item)=> item.name == "Tonight")
            this.setState({weatherData:current})
          })  
         })  
        }

  
        inputNode = () => {  
          if(this.state.weatherData == null) {
            return(
              <div>
           
              </div>
            )
          }else{
          
           return <div className={styles.container}>
                    <p><b>conditions:</b></p>
                    <p>{this.state.weatherData[0].detailedForecast}</p>
                    <p><b>temperature:</b> {this.state.weatherData[0].temperature}</p>
                    <p><b>wind speed:</b> {this.state.weatherData[0].windSpeed}</p>
                  </div>
            }         
          }

          render() {  
            return <div className={styles.container}>{this.inputNode()}</div> 
           }
  }
