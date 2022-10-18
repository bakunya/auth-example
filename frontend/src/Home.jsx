import React, { useCallback, useState } from 'react'
import { Link, useLoaderData } from 'react-router-dom'
import shouldAuth from './HOC/shouldAuth'

const fetching = async () => {
    const token = JSON.parse(window.localStorage.getItem('auth'))?.state?.token
    if(!token) return new Response('Unauthenticated', { status: 401 })
    
    const res = await fetch('http://0.0.0.0:8000/post/all', {
        headers: {
            'Content-Type': 'application/json',
            'authorization': token
        }
    })
    if(res.status > 200) return new Response('Server Error', { status: 500 })
    return res.json()
}

const Home = ({ token }) => {
    const p = useLoaderData()
    const [posts, setPosts] = useState(p)

    const handleDelete = useCallback((e) => {
        const id = e?.target?.parentElement?.id
        if(!id) return
        fetch(`http://0.0.0.0:8000/post/${id}`, { method: 'delete', headers: { 'authorization': token } })
            .then(r => {
                if(r.status > 201) throw Error('server error')
            })
            .then(_ => {
                fetching().then(r => setPosts(r)).catch(e => console.log(e))
            })
            .catch(e => console.log(e))
    }, [token])
    
    return (
        <center>
            {
                Array.isArray(posts) && posts.map(itm => (
                    <div key={itm._id} id={itm._id}>
                        {itm.post}
                        <button onClick={handleDelete}>Delete</button>
                    </div>
                ))
            }
            <br />
            <Link to="/post">Create Post</Link>
        </center>
    )
}

export const homeLoader = async _ => (await fetching())
export default shouldAuth(Home)