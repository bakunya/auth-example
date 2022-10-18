import React, { useCallback } from 'react'
import shouldGuess from './HOC/shouldGuess'
import useToken from './state/token'

const Register = () => {
    const setToken = useToken(s => s.set)

    const handleSubmit = useCallback((e) => {
        e.preventDefault()
        const storeData = {}
        const formData = new FormData(e.target)
        
        for (const data of formData.entries()) {
            storeData[data[0]] = data[1]
        }
        
        fetch('http://0.0.0.0:8000/register', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(storeData)
        })
            .then(res => {
                if(res.status >= 201) throw Error(res.statusText)
                res.json()
            })
            .then(res => setToken(res))
            .catch(er => console.log(er.message))
    }, [])
    
    return (
        <center>
            <br />
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" placeholder='name' />
                <br />
                <input type="email" name="email" placeholder='email' />
                <br />
                <input type="password" name="password" placeholder='password' />
                <br />
                <button type="submit">register</button>
            </form>
        </center>
    )
}

export const registerLoader = _ => <>Loading</>
export default shouldGuess(Register)