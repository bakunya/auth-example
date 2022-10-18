import React from 'react'
import { Navigate } from 'react-router-dom'
import useToken from '../state/token'

const shouldAuth = (Component) => {
    return (props) => {
        const token = useToken(state => state.token)
        if(!token) return <Navigate to="/login" replace />
        
        return <Component token={token} {...props} />
    }
}

export default shouldAuth