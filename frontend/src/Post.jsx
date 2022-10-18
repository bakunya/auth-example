import React, { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import shouldAuth from './HOC/shouldAuth'
import useToken from './state/token'

const Post = ({ token }) => {
    const navigate = useNavigate()
    const dropToken = useToken(s => s.drop)

    const handleSubmit = useCallback((e) => {
        e.preventDefault()
        const storeData = {}
        const formData = new FormData(e.target)
        
        for (const data of formData.entries()) {
            storeData[data[0]] = data[1]
        }
        
        fetch('http://0.0.0.0:8000/post', {
            method: 'post',
            headers: { 
                'Content-Type': 'application/json',
                'authorization': token
            },
            body: JSON.stringify(storeData),
            credentials: 'include',
        })
            .then(res => {
                if(res.status > 201) {
                    if(res.status === 401) dropToken()
                    throw Error(res.statusText)
                }
                return navigate('/home')
            })
            .catch(er => console.log(er.message))
    }, [token])
    
    return (
        <center>
            <br />
            <form onSubmit={handleSubmit}>
                <input type="text" name="post" placeholder='type here' />
                <br />
                <button type="submit">save</button>
            </form>
        </center>
    )
}

export default shouldAuth(Post)