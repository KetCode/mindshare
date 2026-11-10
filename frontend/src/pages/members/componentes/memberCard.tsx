import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Edit, Crown, User as UserIcon, ShieldCheck, Eye, Trash } from "lucide-react"
import type { User } from "@/types"
import { getInitials } from "@/lib/utils"

const roleConfig = {
  owner: {
    label: "Owner",
    className: "text-amber-700",
    icon: ShieldCheck,
  },
  admin: {
    label: "Admin",
    className: "text-purple-700",
    icon: Crown,
  },
  member: {
    label: "Membro",
    className: "text-blue-700",
    icon: UserIcon,
  },
  viewer: {
    label: "Leitor",
    className: "text-gray-700",
    icon: Eye,
  }
}

interface MemberCardProps {
  member: User
  isCurrentUser: boolean
  currentUserRole?: string
  onEdit: () => void
  onDelete: () => void
}

export function MemberCard({ member, isCurrentUser, currentUserRole, onEdit, onDelete }: MemberCardProps) {
  const role = member.role ? roleConfig[member.role as keyof typeof roleConfig] : null

  const canManageMembers = currentUserRole === "owner" || (currentUserRole === "admin" && member.role !== "owner")
  const canEdit = canManageMembers
  const canDelete = canManageMembers && !isCurrentUser

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <Avatar className="h-10 w-10 flex-shrink-0">
            <AvatarFallback className="bg-zinc-950 text-white text-xl">{getInitials(member.name)}</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-base truncate">{member.name}</p>
                <p className="text-sm text-muted-foreground truncate">{member.email}</p>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <Button variant="outline" size="icon" className="h-8 w-8" onClick={onDelete} disabled={!canDelete}><Trash className="h-4 w-4" /></Button>
                <Button variant="outline" size="icon" className="h-8 w-8" onClick={onEdit} disabled={!canEdit}><Edit className="h-4 w-4" /></Button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 mt-6 flex-wrap">
          {role && (
            <div className="flex min-h-6 items-center justify-center gap-2 rounded-lg border border-gray-200 px-2 py-1">
              <role.icon className={`h-4 w-4 shrink-0 ${role.className}`} strokeWidth={2.5} />
              <span className={`text-xs font-medium text-gray-700`}>{role.label}</span>
            </div>
          )}
          {isCurrentUser && (
            <div className="flex min-h-6 items-center justify-center gap-2 rounded-lg border border-gray-200 px-2 py-1">
              <span className="text-xs font-medium text-gray-700">Você</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}