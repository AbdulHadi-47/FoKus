import React, { useEffect } from 'react'
import { useState } from 'react'
import api from '../api'

function Fokus() {

  const [time, setTime] = useState<string>('')
  const [taskName, setTaskName] = useState<string>('')
  const [error, setError] = useState('')
  const [tasks, setTasks] = useState<{ name: string, hours: number , minutes: number, seconds: number, isRunning: boolean, _id: string}[]>([])
  const [seconds, setSeconds] = useState(0)
  const [isRunning, setIsRunning] = useState<{running: boolean}[]>([])


  useEffect(() => {
    api.get('/tasks')
    .then(res => setTasks(res.data))
    .catch(err => setError('Failed to fetch tasks'))
  }, [])

  useEffect(() => {
    const runningIndex = tasks.findIndex(task => task.isRunning);
    if (runningIndex === -1) return;

    const interval = setInterval(() => {
      setTasks(prevTasks => prevTasks.map((task, i) => {
        if (i !== runningIndex) return task
        let {hours, minutes, seconds} = task;
        if (hours === 0 && minutes === 0 && seconds === 0) {
          return {...task, isRunning: false}
        }  
        if (seconds > 0) {
          seconds -= 1
        } else if ( minutes > 0) {
          minutes -= 1
          seconds = 59;
        } else if (hours > 0) {
          hours -= 1;
          minutes = 59
          seconds = 59
        }
        return {...task, hours, minutes, seconds}
      }))
    }, 1000);
    return () => clearInterval(interval)
  }, [tasks])

  const handleSubmit = () => {
    const numTime = Number(time)

    if (numTime === 0 || isNaN(numTime)  || taskName === '') {
      setError("please enter task and time")
      return;
    }
      const hours = Math.floor(numTime / 60)
      const minutes = numTime % 60 

      api.post('/tasks', {name: taskName, hours: hours, minutes: minutes, seconds: 0})
      .then(() => {
        setError('')
        setTime('')
        setTaskName('')
        return api.get('/tasks')
      })
      .then(res => setTasks(res.data))
      .catch(err => setError('Failed to add task'))
  }

   useEffect(() => {
      console.log('Task updated:', tasks)
    }, [tasks])

    useEffect(() => {
      console.log('status:', isRunning);
    }, [isRunning])


  const handleDelete = (_id: string) => {
    api.delete(`/tasks/${_id}`)
    .then(() => api.get('/tasks'))
    .then(res => setTasks(res.data))
    .catch(err => setError('Failed to delete task'))
  }
  
  const handleStart = (_id: string) => {
    setTasks(tasks.map((task, i) => 
      task._id === _id 
    ? {...task, isRunning: true}
    : {...task, isRunning: false}
    ))
  }


  return (
    <div className=''>
      <div className='bg-black min-h-screen text-white text-2xl pt-24'>
      <div className='text-center rounded-4xl py-10 px-8 mx-auto max-w-md bg-gray-800'>
        <div className='m-10'>Enter Task</div>
        <input
         type="text" 
         placeholder='read book'
         className='bg-gray-600 text-center rounded-2xl' 
         value={taskName} 
         onChange={(e) => setTaskName(e.target.value)}
         />
        <div className='my-6'>
        <label htmlFor="taskDuration" className="block mb-4 ">Set Duration (minutes):</label>
        <input
        type="number"
        value={time}
        onChange={(e) => setTime(e.target.value)}
        id="taskDuration"
        name="taskDuration"
        min="1"
        max="180"
        placeholder="25"
        className="bg-gray-600 rounded-xl text-black px-2 text-center"
        />
        </div>
        <button type='submit' className='bg-blue-700 p-1 rounded-2xl text-base hover:bg-blue-800 active:bg-blue-900' onClick={handleSubmit} >Add Task</button>
        <div className='text-red-500'>{error}</div>
        <div>
          <div className='m-10'>Tasks</div>
          <div>{tasks.map((i, z) => <div className='' key={i._id}>
            <span className='text-base'>{i.name} | {i.hours}h : {i.minutes}m : {i.seconds}s</span>
            <button 
            className='bg-red-500 mx-1 text-sm text-wrap text-black px-1 rounded-2xl hover:bg-red-600 active:bg-red-900'
             onClick={() => handleDelete(i._id)}>Delete</button>
            <button onClick={() => handleStart(i._id)} className='bg-blue-100 mx-1 text-black text-sm px-2 rounded-2xl hover:bg-blue-200 active:bg-blue-300'>Start</button>
          </div>)}</div>
        </div>  
      </div>
      </div>
      </div>
  )
}


export default Fokus
