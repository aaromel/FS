import { useState } from 'react'

const Statistics = ({ good, neutral, bad, all }) => {
  const avg = (good * 1 + neutral * 0 + bad * -1) / all
  const positive = (good / all) * 100

  if (all == 0) {
    return (
    <>
      <p>No feedback given</p>
    </>
    )
  }
  return (
    <table>
      <tbody>
        <StatisticLine text="good" value={good} />
        <StatisticLine text="neutral" value={neutral} />
        <StatisticLine text="bad" value={bad} />
        <StatisticLine text="all" value={all} />
        <StatisticLine text="average" value={avg} />
        <StatisticLine text="positive" value={positive + '%'} />
      </tbody>
    </table>
  )
}

const Button = ({ handleClick, text }) => {
  return <button onClick={handleClick}>{text}</button>
}

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [bad, setBad] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [all, setAll] = useState(0)

  const handleGood = () => {
    setGood(good + 1)
    setAll(all + 1)
  }

  const handleNeutral = () => {
    setNeutral(neutral + 1)
    setAll(all + 1)
  };

  const handleBad = () => {
    setBad(bad + 1)
    setAll(all + 1)
  };

  return (
    <div>
      <h1>give feedback</h1>
      <div>
        <Button handleClick={handleGood} text="good" />
        <Button handleClick={handleNeutral} text="neutral" />
        <Button handleClick={handleBad} text="bad" />
      </div>
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} all={all} />
    </div>
  )
}

export default App