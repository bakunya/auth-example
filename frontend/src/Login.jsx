import React, { useCallback } from 'react'
import shouldGuess from './HOC/shouldGuess'
import useToken from './state/token'

const Login = () => {
    const setToken = useToken(s => s.set)

    const handleSubmit = useCallback((e) => {
        e.preventDefault()
        const storeData = {}
        const formData = new FormData(e.target)
        
        for (const data of formData.entries()) {
            storeData[data[0]] = data[1]
        }
        
        fetch('http://0.0.0.0:8000/login', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(storeData),
            credentials: 'include',
        })
            .then(res => {
                if(res.status > 201) throw Error(res.statusText)
                return res.json()
            })
            .then(res => setToken(res.token))
            .catch(er => console.log(er.message))
    }, [])
    
    return (
        <center>
            <br />
            <form onSubmit={handleSubmit}>
                <input type="email" name="email" placeholder='email' />
                <br />
                <input type="password" name="password" placeholder='password' />
                <br />
                <button type="submit">login</button>
            </form>
        </center>
    )
}

export const loginLoader = _ => <>Loading</>
export default shouldGuess(Login)