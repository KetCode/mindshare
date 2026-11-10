import { useState } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import logo from "@/assets/logo.svg"
import { Link } from "react-router-dom"
import { useAuthStore } from "@/stores/auth"
import { toast } from "sonner"

export function Signup() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const signup = useAuthStore((state) => state.signup)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
        const signupMutate = await signup({ name, email, password })
        if(signupMutate) {
            toast.success('Cadastro realizado com sucesso!')
        }
    } catch (error: any) {
        toast.error('Erro ao realizar o cadastro')
    } finally {
        setLoading(false)
    }
  }

  return (
    <div className="flex items-center min-h-[calc(100vh-4rem)] justify-center flex-col gap-6">
      <img src={logo} className="w-64 h-22" />
      <Card className="w-full max-w-sm rounded-xl">
        <CardHeader className="p-7">
          <CardTitle className="text-lg font-medium">Crie sua conta</CardTitle>
          <CardDescription>
            Informe seu nome, e-email e senha de acesso
          </CardDescription>
        </CardHeader>
        <CardContent className="px-7 pb-7">
          <form onSubmit={handleSubmit} className="space-y-7">
            <div className="space-y-4">
              <div className="space-y-1">
                <Label htmlFor="email">Nome</Label>
                <Input
                  id="name"
                  placeholder="Digite seu nome"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="h-10"
                  required
                  />
              </div>
              <div className="space-y-1">
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
              <div className="space-y-1">
                <Label htmlFor="email">Password</Label>
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
            <Button type="submit" className="w-full h-10" disabled={!name || !email || !password || loading}>
              Cadastrar
            </Button>
          </form>
        </CardContent>
      </Card>
      <Card className="w-full max-w-sm rounded-xl">
        <CardHeader className="px-7 pt-7 pb-5 space-y-0">
          <CardTitle className="text-lg font-mediumbold">
            Já tem uma conta?
          </CardTitle>
          <CardDescription>Entre agora mesmo</CardDescription>
        </CardHeader>
        <CardContent className="px-7 pb-7">
          <Button variant="outline" className="w-full h-10" asChild>
            <Link to="/login">Acessar conta</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}