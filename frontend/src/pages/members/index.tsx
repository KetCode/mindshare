import { Page } from "@/components/page";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LIST_MEMBERS } from "@/lib/graphql/queries/members";
import { User } from "@/types";
import { useQuery } from "@apollo/client/react";
import { Plus, Search } from "lucide-react";
import { useState } from "react";
import { MemberCard } from "./componentes/memberCard";
import { useAuthStore } from "@/stores/auth";
import { InviteMemberDialog } from "./componentes/InviteMemberDialog";

export function Members() {
    const [searchQuery, setSearchQuery] = useState("")
    const [openDialog, setOpenDialog] = useState(false)
    const currentUserId = useAuthStore((state) => state.user?.id)
    const { data, loading, error, refetch} = useQuery<{listUsers: User[]}>(LIST_MEMBERS)

    const handleAddUser = () => {
        setOpenDialog(true)
    }

    const handleEditUser = (memberId: string) => {}

    const handleDeleteUser = (memberId: string) => {}

    const members = data?.listUsers ?? []

    return (
        <Page>
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-medium text-purple-600">Usuários</h1>
                        <p className="text-muted-foreground">Gerencie os membros e suas permissões</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="flex items-center gap-4 justify-end">
                            <Label htmlFor="search" className="text-sm whitespaces-nowrap">Busque membros:</Label>
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
                    <MemberCard key={member.id} member={member} isCurrentUser={member.id === currentUserId} onEdit={() => handleEditUser(member.id)} onDelete={() => handleDeleteUser(member.id)} />
                ))}
            </div>

            {/* <IdeaDetailDrawer open={openDrawer} onOpenChange={setOpenDrawer} ideaId={selectedIdeaId} />*/}

            <InviteMemberDialog open={openDialog} onOpenChange={setOpenDialog} />
        </Page>
    )
}