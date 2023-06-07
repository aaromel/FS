const Header = ({ course }) => {
  return (
    <>
      <h1>{course}</h1>
    </>
    
  )
}

const Part = ({ props }) => {
  return (
    <>
      <p> {props.name} {props.exercises} </p>
    </>
  )
}

const Content = ({ props }) => {
  return (
    <div>
      <Part props = {props[0]} />
      <Part props = {props[1]} />
      <Part props = {props[2]} />
    </div>
  )
}

const Total = ({ props }) => {
  return (
    <>  
      <p>Number of exercises {props[0].exercises + props[1].exercises + props[2].exercises}</p>
    </>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course.name} />
      <Content props = {course.parts} />
      <Total props = {course.parts}/>
    </div>
  )
}

export default App
