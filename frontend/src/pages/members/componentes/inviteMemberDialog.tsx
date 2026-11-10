import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useMutation } from "@apollo/client/react"
import { CREATE_USER } from "@/lib/graphql/mutations/Members"
import { toast } from "sonner"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

interface InviteMemberProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onCreated?: () => void
}

export function InviteMemberDialog({ open, onOpenChange, onCreated }: InviteMemberProps) {
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [role, setRole] = useState("member")
  
  const [createUserMutation, { loading }] = useMutation(CREATE_USER, {
    onCompleted: () => {
      onOpenChange(false)
      setName("")
      setEmail("")
      setRole("member")
      onCreated?.()
    },
  })

  const handleSubmit = async () => {
    try {
      await createUserMutation({
        variables: {
          data: {
            name,
            role,
            email,
          },
        },
      })
    } catch (error: any) {
      toast.error("Erro ao cadastrar usuário.")
      console.log(error?.message)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adicione um novo usuário</DialogTitle>
          <DialogDescription>Informe o nome, e-mail e permissão</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="invite-name">Nome</Label>
            <Input id="invite-name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Digite o nome completo" className="h-10" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="invite-email">E-mail</Label>
            <Input id="invite-email" value={email} type="email" onChange={(e) => setEmail(e.target.value)} placeholder="email@exemplo.com" className="h-10" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="invite-role">Permissão</Label>
            <RadioGroup value={role} onValueChange={setRole} className="grid grid-cols-2 gap-2 w-full">
              <div className={`flex items-start gap-2 p-2 h-14 rounded-[10px] border cursor-pointer ${role === "member" ? "bg-indigo-50 border-indigo-300" : 'bg-gray-50 border-gray-300'}`} onClick={() => setRole("member")}>
                <RadioGroupItem value="member" className="mt-1 h-4 w-4 shrink-0 border-gray-300 text-indigo-600" />
                <div className="flex flex-col">
                  <span className="text-sm">Membro</span>
                  <span className="text-xs text-gray-500">
                    Pode ver e criar ideias
                  </span>
                </div>
              </div>
              <div className={`flex items-start gap-2 p-2 h-14 rounded-[10px] border cursor-pointer ${role === "viewer" ? "bg-indigo-50 border-indigo-300" : 'bg-gray-50 border-gray-300'}`} onClick={() => setRole("viewer")}>
                <RadioGroupItem value="viewer" className="mt-1 h-4 w-4 border-gray-300 text-indigo-600" />
                <div className="flex flex-col">
                  <span className="text-sm">Leitor</span>
                  <span className="text-xs text-gray-500">
                    Pode apenas visualizar
                  </span>
                </div>
              </div>
            </RadioGroup>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancelar</Button>
          <Button onClick={handleSubmit} disabled={!name || !email || loading}>Salvar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}