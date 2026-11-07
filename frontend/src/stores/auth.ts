import { apolloClient } from '@/lib/apollo'
import { REGISTER } from '@/lib/graphql/mutation/Register'
import type { RegisterInput, User } from '@/types'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type RegisterMutationData = {
    register: {
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
}

export const useAuthStore = create<AuthState>() (
    persist(
        (set) => ({
            user: null,
            token: null,
            isAuthenticated: false,

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
            }
        }),
        {
            name: 'auth-storage',
        }
    )
)