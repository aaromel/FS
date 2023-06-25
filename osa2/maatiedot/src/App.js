import { useState, useEffect } from 'react'
import axios from 'axios'

const apiKey = process.env.REACT_APP_API_KEY

const Filter = (props) => {
  return (
    <div>
      find countries: <input value={props.filter} onChange={props.handleFilterChange}/>
    </div>
  )
}

const Weather = ({ weatherData }) => {
  if (!weatherData) {
    return null
  }

  const { name, main, weather, wind} = weatherData
  const temperature = (main.temp - 273.15).toFixed(2)
  const imgUrl = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`

  return (
    <div>
      <h2>Weather in {name}</h2>
      <p>temperature {temperature} Celsius</p>
      <img src={imgUrl} width="120" />
      <p>wind {wind.speed} m/s</p>
    </div>
  )
}

const Country = (props) => {
  const [weatherData, setWeatherData] = useState(null)

  useEffect(() => {
    fetchWeather(country.capital)
      .then(data => {setWeatherData(data)
      console.log(data)})
      .catch(error => console.log(error))
  }, [])

  const fetchWeather = (city) => {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
  
    return axios.get(apiUrl)
      .then(response => response.data)
      .catch(error => {
        console.log(error)
        throw new Error('Failed to fetch weather data')
      })
    }

  let country = props.country

  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>capital {country.capital}</p>
      <p>area {country.area}</p>
      <h3>languages:</h3>
      <ul>
        {Object.values(country.languages).map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <img src={country.flags.png} width="150" />
      <Weather weatherData={weatherData} />
    </div>
  )
}

const Countries = (props) => {
  const [selectedCountry, setSelectedCountry] = useState(null)

  const handleShow = (country) => {
    setSelectedCountry(country);
  }

  if (selectedCountry) {
    return <Country country={selectedCountry} />;
  }

  return (
    <div>
      {props.countries.map((country) => (
        <div key={country.name.common}>
          {country.name.common}
          <button onClick={() => handleShow(country)}>show</button>
        </div>
      ))}
    </div>
  )
}

const Results = (props) => {
  let matches = props.countries.filter(country => country.name.common.toLowerCase().includes(props.filter.toLowerCase()))
  if (matches.length > 10) {
    return (
      <div>
        Too many matches, specify another filter
      </div>
    )
  }
  else if (1 < matches.length  && matches.length < 11) {
    return <Countries countries={matches}></Countries>
  }
  else if (matches.length == 1) {
    return (
      <Country country={matches[0]}></Country>
    )
  }
  else {
    return (
      <div>
        No matches found
      </div>
    )
  }
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  

  useEffect(() => {
    
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
        .then(response => {
          setCountries(response.data)
        })
  }, [])

  const handleChange = (event) => {
    setFilter(event.target.value)
  }

  return (
    <div>
      <Filter filter={filter} handleFilterChange={handleChange}/>
      <Results countries={countries} filter={filter}></Results>
    </div>
  )
}

export default App
