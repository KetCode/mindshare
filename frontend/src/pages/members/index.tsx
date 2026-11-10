import { Page } from "@/components/page";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LIST_MEMBERS } from "@/lib/graphql/queries/members";
import { User } from "@/types";
import { useQuery } from "@apollo/client/react";
import { Crown, Eye, Loader2, Plus, Search, Users } from "lucide-react";
import { useState } from "react";
import { MemberCard } from "./componentes/memberCard";
import { useAuthStore } from "@/stores/auth";
import { InviteMemberDialog } from "./componentes/inviteMemberDialog";
import { EditMemberDialog } from "./componentes/editMemberDialog";
import { DeleteMemberDialog } from "./componentes/deleteMemberDialog";
import { StatsBagdes } from "@/components/statsBadges";

export function Members() {
    const [searchQuery, setSearchQuery] = useState("")
    const [openInviteDialog, setOpenInviteDialog] = useState(false)
    const [openEditDialog, setOpenEditDialog] = useState(false)
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
    const [member, setMember] = useState<User | null>(null)

    const currentUserId = useAuthStore((state) => state.user?.id)
    const currentUserRole = useAuthStore((state) => state.user?.role)
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

    const members = (data?.listUsers ?? []).filter((member) => {
        const search = searchQuery.toLowerCase().trim()

        return ( member.name.toLowerCase().includes(search) || member.email.toLowerCase().includes(search) )
    })

    const adminsCount = members.filter( (member) => member.role === "admin").length
    const membersCount = members.filter( (member) => member.role === "member").length
    const viewersCount = members.filter( (member) => member.role === "viewer" ).length

    return (
        <Page>
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div className="flex flex-col gap-3">
                        <h1 className="text-3xl font-medium text-purple-600">Usuários</h1>
                        <StatsBagdes stats={[
                            {
                                label: "admins",
                                count: adminsCount,
                                icon: Crown,
                                color: "bg-purple-200",
                            },
                            {
                                label: "membros",
                                count: membersCount,
                                icon: Users,
                                color: "bg-indigo-200",
                            },
                            {
                                label: "leitores",
                                count: viewersCount,
                                icon: Eye,
                                color: "bg-gray-200",
                            },
                        ]} />
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-4 justify-end">
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input id="search" placeholder="Nome ou e-mail" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-9 lg:w-[268px] max-w-[268px]" />
                            </div>
                        </div>

                        <div className="h-8 w-px bg-gray-200" />
                        
                        <Button onClick={handleAddUser}>
                            <Plus className="mr-2 h-4 w-4" />
                            Novo usuário
                        </Button>
                    </div>
                </div>
            </div>

            <div className="grid gap-4 lg:grid-cols-3 2xl:grid-cols-4 pt-6">
                {!loading && members.map((member) => (
                    <MemberCard key={member.id} member={member} isCurrentUser={member.id === currentUserId} currentUserRole={currentUserRole} onEdit={() => handleEditUser(member)} onDelete={() => handleDeleteUser(member)} />
                ))}
            </div>

            {!loading && members.length === 0 && (
                <div className="col-span-full flex flex-col items-center justify-center min-h-[60vh] text-center">
                    <Search className="h-10 w-10 text-gray-400 mb-3" />
                    <h3 className="font-medium text-gray-900">Nenhum usuário encontrado</h3>
                    <p className="text-sm text-muted-foreground mt-1">Tente pesquisar por outro nome ou e-mail.</p>
                </div>
            )}

            {loading && (
                <div className="col-span-full flex flex-col items-center justify-center min-h-[60vh] text-center">
                    <Loader2 className="h-9 w-9 text-purple-600 animate-spin" />
                </div>
            )}

            <InviteMemberDialog open={openInviteDialog} onOpenChange={setOpenInviteDialog} onCreated={() => refetch()} />

            <EditMemberDialog open={openEditDialog} onOpenChange={setOpenEditDialog} onUpdated={() => refetch()} member={member} />

            <DeleteMemberDialog open={openDeleteDialog} onOpenChange={setOpenDeleteDialog} member={member} />
        </Page>
    )
}