import create from 'zustand'
import { persist } from 'zustand/middleware'

const useToken = create(persist(
    set => ({
        token: null,
        set: (token) => set(_ => ({ token: `Bearer ${token}` })),
        drop: () => set(_ => ({ token: null })),
    }),
    {
        name: 'auth'
    }
))

export default useToken