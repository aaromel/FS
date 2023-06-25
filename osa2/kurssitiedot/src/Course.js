const Course = ({ course }) => {
    return (
      <div>
        <Header course={course.name} />
        <Content parts={course.parts} />
        <Total course={course}></Total>
      </div>
    )
  }
  
const Header = ({ course }) => {
  return (
    <>
      <h1>{course}</h1>
    </>
    
  )
}

const Part = ({ part }) => {
  return (
    <>
      <p> {part.name} {part.exercises} exercises</p>
    </>
  )
}

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((part) => (
        <Part key={part.id} part={part} />
      ))}
    </div>
  )
}

const Total = ({ course }) => {
  const total = course.parts.reduce((s, p) => s + p.exercises, 0)
  return (
    <>  
      <strong>total of {total} exercises</strong>
    </>
  )
}

export default Course