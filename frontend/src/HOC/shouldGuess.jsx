import React from 'react'
import { Navigate } from 'react-router-dom'
import useToken from '../state/token'

const shouldGuess = (Component) => {
    return (props) => {
        const token = useToken(state => state.token)
        if(!!token) return <Navigate to="/home" replace />
        
        return <Component {...props} />
    }
}

export default shouldGuess