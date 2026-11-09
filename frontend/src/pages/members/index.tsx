import { Page } from "@/components/page";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LIST_MEMBERS } from "@/lib/graphql/queries/members";
import { User } from "@/types";
import { useQuery } from "@apollo/client/react";
import { Plus, Search } from "lucide-react";
import { useState } from "react";
import { MemberCard } from "./componentes/memberCard";
import { useAuthStore } from "@/stores/auth";
import { InviteMemberDialog } from "./componentes/inviteMemberDialog";
import { EditMemberDialog } from "./componentes/editMemberDialog";
import { DeleteMemberDialog } from "./componentes/deleteMemberDialog";

export function Members() {
    const [searchQuery, setSearchQuery] = useState("")
    const [openInviteDialog, setOpenInviteDialog] = useState(false)
    const [openEditDialog, setOpenEditDialog] = useState(false)
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
    const [member, setMember] = useState<User | null>(null)

    const currentUserId = useAuthStore((state) => state.user?.id)
    const { data, loading, refetch} = useQuery<{listUsers: User[]}>(LIST_MEMBERS)

    const handleAddUser = () => {
        setOpenInviteDialog(true)
    }

    const handleEditUser = (member: User) => {
        setMember(member)
        setOpenEditDialog(true)
    }

    const handleDeleteUser = (member: User) => {
        setMember(member)
        setOpenDeleteDialog(true)
    }

    const members = data?.listUsers ?? []

    return (
        <Page>
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-medium text-purple-600">Usuários</h1>
                        <p className="text-muted-foreground pb-3">Gerencie os membros e suas permissões</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="flex items-center gap-4 justify-end">
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input id="search" placeholder="Nome ou e-mail" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-9 max-w-[200px]" />
                            </div>
                        </div>
                        <Button onClick={handleAddUser}>
                            <Plus className="mr-2 h-4 w-4" />
                            Novo usuário
                        </Button>
                    </div>
                </div>
            </div>

            <div className="grid gap-4 xl:grid-cols-4">
                {!loading && members.map((member) => (
                    <MemberCard key={member.id} member={member} isCurrentUser={member.id === currentUserId} onEdit={() => handleEditUser(member)} onDelete={() => handleDeleteUser(member)} />
                ))}
            </div>

            <InviteMemberDialog open={openInviteDialog} onOpenChange={setOpenInviteDialog} onCreated={() => refetch()} />

            <EditMemberDialog open={openEditDialog} onOpenChange={setOpenEditDialog} onUpdated={() => refetch()} member={member} />

            <DeleteMemberDialog open={openDeleteDialog} onOpenChange={setOpenDeleteDialog} member={member} />
        </Page>
    )
}