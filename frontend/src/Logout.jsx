import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useToken from './state/token'

const Logout = () => {
    const dropToken = useToken(s => s.drop)
    const navigate = useNavigate();

    useEffect(() => { 
        try {
            dropToken()
            navigate("/login")
        } catch (er) {
            navigate('/home')
        }
    }, [])
}

export default Logout