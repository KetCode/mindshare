import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { apolloClient } from '@/lib/apollo'
import { REGISTER } from '@/lib/graphql/mutations/Register'
import type { LoginInput, RegisterInput, User } from '@/types'
import { LOGIN } from '@/lib/graphql/mutations/Login'

type RegisterMutationData = {
    register: {
        token: string
        refreshToken: string
        user: User
    }
}

type LoginMutationData = {
    login: {
        token: string
        refreshToken: string
        user: User
    }
}

interface AuthState {
    user: User | null
    token: string | null
    isAuthenticated: boolean
    signup: (data: RegisterInput) => Promise<boolean>
    login: (data: LoginInput) => Promise<boolean>
    logout: () => void
}

export const useAuthStore = create<AuthState>() (
    persist(
        (set) => ({
            user: null,
            token: null,
            isAuthenticated: false,
            login: async (LoginData: LoginInput) => {
                try {
                    const { data } = await apolloClient.mutate<LoginMutationData, { data: LoginInput }>({
                        mutation: LOGIN,
                        variables: {
                            data: {
                                email: LoginData.email,
                                password: LoginData.password
                            }
                        }
                    })
                    if(data?.login) {
                        const { token, user } = data.login
                        set({ 
                            token, 
                            user: {
                                id: user.id,
                                name: user.name,
                                email: user.email,
                                role: user.role,
                                createdAt: user.createdAt,
                                updatedAt: user.updatedAt
                            }, 
                            isAuthenticated: true
                        })
                        return true
                    }
                    return false
                } catch (error) {
                    console.log('Erro ao fazer o login')
                    throw error
                }
            },
            signup: async (registerData: RegisterInput) => {
                try {
                    const { data } = await apolloClient.mutate<RegisterMutationData, { data: RegisterInput }>({
                        mutation: REGISTER,
                        variables: {
                            data: {
                                name: registerData.name,
                                email: registerData.email,
                                password: registerData.password
                            }
                        }
                    })
                    if(data?.register) {
                        const { token, user } = data.register
                        set({ 
                            token, 
                            user: {
                                id: user.id,
                                name: user.name,
                                email: user.email,
                                role: user.role,
                                createdAt: user.createdAt,
                                updatedAt: user.updatedAt
                            }, 
                            isAuthenticated: true
                        })
                        return true
                    }
                    return false
                } catch (error) {
                    console.log('Erro ao fazer o cadastro')
                    throw error
                }
            },
            logout: () => {
                set({
                    user: null,
                    token: null,
                    isAuthenticated: false
                })
                apolloClient.clearStore()
            }

        }),
        {
            name: 'auth-storage',
        }
    )
)