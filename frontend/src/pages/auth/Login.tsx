import { useState } from "react"
import logo from "@/assets/logo.svg"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { useAuthStore } from "@/stores/auth"
import { toast } from "sonner"

export function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)

    const login = useAuthStore((state) => state.login)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            const loginMutate = await login({ email, password })
            if(loginMutate) {
                toast.success('Login realizado com sucesso!')
            }
        } catch (error: any) {
            toast.error('Falha ao realizar login.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="flex flex-col min-h-[calc(100vh-4rem)] items-center justify-center gap-3">
            <img src={logo} className="w-64 h-22 mb-3" alt="Logo" />
            <Card className="w-full max-w-sm rounded-xl">
                <CardHeader className="p-7">
                    <CardTitle className="text-lg font-medium">Acesse a plataforma</CardTitle>
                    <CardDescription>Entre usando seu e-mail e senha cadastrados</CardDescription>
                </CardHeader>
                <CardContent className="px-7 pb-7">
                    <form onSubmit={handleSubmit} className="space-y-7">
                        <div className="space-y-4">
                            <div>
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="example@mail.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="h-10"
                                    required
                                    />
                            </div>
                            <div>
                                <Label htmlFor="password">Senha</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="Digite sua senha"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="h-10"
                                    required
                                    />
                            </div>
                        </div>
                        <Button type="submit" className="w-full h-10" disabled={!email || !password || loading}>
                            Entrar
                        </Button>
                    </form>
                </CardContent>
            </Card>
            <Card className="w-full max-w-sm rounded-xl">
                <CardHeader className="px-7 pt-7 pb-5 space-y-0">
                    <CardTitle className="text-lg font-medium">
                        Ainda não tem uma conta?
                    </CardTitle>
                    <CardDescription>Cadastre-se agora mesmo</CardDescription>
                </CardHeader>
                <CardContent className="px-7 pb-7">
                    <Button variant="secondary" className="w-full h-10 text-gray-700 border border-gray-200" asChild>
                        <Link to="/signup"> Criar conta </Link>
                    </Button>
                </CardContent>
            </Card>
        </div>
    )
}