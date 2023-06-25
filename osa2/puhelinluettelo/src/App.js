import personService from './services/personService'

import { useState , useEffect } from 'react'

const Filter = (props) => {
  return (
    <div>
      filter shown with: <input value={props.filter} onChange={props.handleFilterChange}/>
    </div>
  )
}

const PersonForm = (props) => {
  return (
    <form onSubmit={props.addPerson}>
      <div>
        name: <input value={props.newName} onChange={props.handleNameChange}/>
      </div>
      <div>
        number: <input value={props.newNumber} onChange={props.handleNumberChange}/>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Persons = (props) => {
  let filter = props.filter
  let contentToShow = filter.length == 0
    ? props.persons
    : props.persons.filter(p => p.name.toLowerCase().includes(filter.toLowerCase()))
  return (
    <ul>
      {contentToShow.map(person => 
        <li key={person.name}>
          {person.name} {person.number}
          <button onClick={() => props.handleDelete(person)}>delete</button>
        </li>
      )}
    </ul>
  )
}

const successStyle = {
  color: 'green',
  background: 'lightgreen',
  fontSize: '1.2rem',
  border: '5px solid green',
  padding: '0.5rem',
  marginBottom: '1rem',
}

const errorStyle = {
  color: 'red',
  background: 'lightgrey',
  fontSize: '1.2rem',
  border: '5px solid red',
  padding: '0.5rem',
  marginBottom: '1rem',
}

const Notification = ({ message, isSuccess }) => {
  if (message === null) {
    return null
  }
  const notificationStyle = isSuccess ? successStyle : errorStyle
  return (
    <div style={notificationStyle}>
      {message}
    </div>
  )
}

const App = () => {
  useEffect(() => {
    personService
      .getAll()
        .then(persons => {
          setPersons(persons)
        })
  }, [])

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState(null)
  const [isSuccess, setIsSuccess] = useState(true)

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const handleDelete = (person) => {
    if (window.confirm(`Delete ${person.name} ?`)) {
      personService
        .remove(person.id)
          .then(() => {
            setPersons(persons.filter(p => p.id != person.id))
            setIsSuccess(true)
            setMessage(`Deleted ${person.name}`);
            setTimeout(() => {
              setMessage(null)
            }, 5000)
          })
          .catch(error => {
            console.log(error)
            setIsSuccess(false)
            setMessage(`Error deleting ${person.name}`)
            setTimeout(() => {
              setMessage(null)
            }, 5000)
          })
    }
  }

  const addPerson = (event) => {
    event.preventDefault()
    const found = persons.findIndex((p) => p.name == newName)
    if (found != -1) {
      setIsSuccess(false)
      setMessage(`${newName} is already added to phonebook`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
    else {
      const newPerson = {
        name: newName,
        number: newNumber
      }
      setPersons(persons.concat(newPerson))
      personService
        .create(newPerson)
          .then(returnedPerson => {
            setPersons(persons.concat(returnedPerson))
            setIsSuccess(true)
            setMessage(`Added ${newPerson.name}`);
            setTimeout(() => {
              setMessage(null)
            }, 5000)
          })
          .catch(error => {
            console.log(error)
            setIsSuccess(false)
            setMessage(`Error removing infromation of ${newPerson.name}`)
            setTimeout(() => {
              setMessage(null)
            }, 5000)
          })
    }
    setNewName('')
    setNewNumber('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} isSuccess={isSuccess}/>
       <Filter filter={filter} handleFilterChange={handleFilterChange}/>
      <h2>add a new</h2>
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        addPerson={addPerson}
      />
      <h2>Numbers</h2>
      <Persons filter={filter} persons={persons} handleDelete={handleDelete}/>
    </div>
  )

}

export default App
