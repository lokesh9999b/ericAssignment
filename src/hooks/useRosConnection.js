import { useState, useEffect } from 'react'
import * as ROSLIB from 'roslib'

export function useRosConnection(url = 'ws://localhost:9090') {
  const [ros, setRos] = useState(null)
  const [connected, setConnected] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const rosInstance = new ROSLIB.Ros({
      url: url
    })

    rosInstance.on('connection', () => {
      console.log('Connected to websocket server.')
      setConnected(true)
      setError(null)
    })

    rosInstance.on('error', (error) => {
      console.log('Error connecting to websocket server: ', error)
      setConnected(false)
      setError('Connection error')
    })

    rosInstance.on('close', () => {
      console.log('Connection to websocket server closed.')
      setConnected(false)
    })

    setRos(rosInstance)

    return () => {
      rosInstance.close()
    }
  }, [url])

  return { ros, connected, error }
}
