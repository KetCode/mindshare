import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { User } from "@/types"
import { useMutation } from "@apollo/client/react"
import { UPDATE_USER } from "@/lib/graphql/mutations/Members"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface EditMemberDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  member: User | null
  onUpdated?: (user: User) => void
}

const ROLE_OPTIONS = [
  { value: "owner", label: "Owner" },
  { value: "admin", label: "Admin" },
  { value: "member", label: "Membro" },
  { value: "viewer", label: "Leitor" },
]

export function EditMemberDialog({ open, onOpenChange, member, onUpdated }: EditMemberDialogProps) {
  const [name, setName] = useState("")
  const [role, setRole] = useState<string>("member")

  useEffect(() => {
    setName(member?.name ?? "")
    setRole(member?.role ?? "member")
  }, [member])

  type UpdateUserMudationData = { updateUser: User }
  type UpdateUserVariables = {
    id: string
    data: { name?: string; role?: string }
  }

  const [updateUserMutation, { loading }] = useMutation<UpdateUserMudationData, UpdateUserVariables>(UPDATE_USER, {
    onCompleted: (res: UpdateUserMudationData) => {
      setName("")
      setRole("member")

      const updated = res.updateUser
      if (updated) onUpdated?.(updated)

      onOpenChange(false)
    },
  })

  const handleSubmit = async () => {
    if (!member) return
    await updateUserMutation({
      variables: {
        id: member.id,
        data: {
          name,
          role,
        },
      },
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar usuário</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="edit-name">Nome</Label>
            <Input id="edit-name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Nome" className="h-10" />
          </div>
          <div className="space-y-2">
            <Label>E-mail</Label>
            <Input value={member?.email ?? ""} className="h-10" disabled />
          </div>
          <div className="space-y-2">
            <Label htmlFor="edit-role">Permissão</Label>
            <Select value={role} onValueChange={setRole}>
              <SelectTrigger className="w-full h-10 bg-gray-50 border-gray-300 rounded-lg shadow-sm focus:ring-0">
                <SelectValue placeholder="Selecione uma permissão" />
              </SelectTrigger>
              <SelectContent>
              {ROLE_OPTIONS.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
              ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancelar</Button>
          <Button onClick={handleSubmit} disabled={loading}>Salvar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}