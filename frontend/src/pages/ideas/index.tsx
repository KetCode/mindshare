import { Page } from "@/components/page";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { CalendarArrowDown, CalendarArrowUp, ChevronsUpDown, Lightbulb, Loader2, MessageSquare, Plus, ThumbsUp } from "lucide-react"
import { useState } from "react";
import { CreateIdeaDialog } from "./components/createIdeaDialog";
import { useQuery } from "@apollo/client/react";
import { LIST_IDEIAS } from "@/lib/graphql/queries/ideia";
import { Idea } from "@/types";
import { IdeaCard } from "./components/ideaCard";
import { IdeaDetailDrawer } from "./components/ideaDetailDrawer";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { StatsBagdes } from "@/components/statsBadges";
import { useAuthStore } from "@/stores/auth";

export function IdeasPage () {
    const [openDialog, setOpenDialog] = useState(false)
    const [openDrawer, setOpenDrawer] = useState(false)
    const {data, loading, refetch} = useQuery<{ listIdeas: Idea[] }>(LIST_IDEIAS)
    const [selectedIdeaId, setSelectedIdeaId] = useState<string | null>(null)
    const [dateOrder, setDateOrder] = useState<"newest" | "oldest">("newest")

    const ideas = data?.listIdeas || []
    const currentUserId = useAuthStore((state) => state.user?.id)

    const commentsCount = ideas.reduce((total, idea) => total + (idea.comments?.length ?? 0), 0)
    const votesCount = ideas.reduce((total, idea) => total + (idea.votes?.length ?? 0), 0)

    const handleIdeaClick = (ideaId: string) => {
        setSelectedIdeaId(ideaId)
        setOpenDrawer(true)
    }

    const filteredIdeas = [...ideas].sort((a, b) => {
        const dateA = new Date(a.createdAt).getTime()
        const dateB = new Date(b.createdAt).getTime()

        return dateOrder === "newest" ? dateB - dateA : dateA - dateB
    })

    return (
        <Page>
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div className="flex flex-col gap-3">
                        <Label className="text-3xl font-medium text-purple-600">Ideias</Label>
                        <StatsBagdes stats={[
                            {
                                label: "ideias",
                                count: ideas.length,
                                icon: Lightbulb,
                                color: "bg-purple-200",
                            },
                            {
                                label: "comentários",
                                count: commentsCount,
                                icon: MessageSquare,
                                color: "bg-indigo-200",
                            },
                            {
                                label: "votos",
                                count: votesCount,
                                icon: ThumbsUp,
                                color: "bg-green-200",
                            },
                        ]} />
                    </div>

                    <div className="flex items-center gap-4">
                        <Select value={dateOrder} onValueChange={(e) => setDateOrder(e as "newest" | "oldest")}>
                            <SelectTrigger className="w-44 h-9 bg-gray-50 border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-900 [&>svg:last-child]:hidden focus:ring-0">
                                { dateOrder === "newest" ? (
                                    <CalendarArrowDown className="h-4 w-4 text-gray-700" />
                                ) : (
                                    <CalendarArrowUp className="h-4 w-4 text-gray-700" />
                                )}
                                <SelectValue />
                                <ChevronsUpDown className="h-4 w-4 text-gray-700" />
                            </SelectTrigger>

                            <SelectContent position="item-aligned" className="w-[179px] -ml-[35px]">
                                <SelectGroup>
                                    <SelectItem value="newest">Mais recentes</SelectItem>
                                    <SelectItem value="oldest">Mais antigos</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>

                        <div className="h-8 w-px bg-gray-200" />

                        <Button onClick={() => setOpenDialog(true)}>
                            <Plus className="mr-2 h-4 w-4" />
                            Nova ideia
                        </Button>
                    </div>
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 pt-6">
                {filteredIdeas.map((idea) => (
                    <IdeaCard key={idea.id} idea={idea} isCurrentUser={idea.authorId === currentUserId} onClick={() => handleIdeaClick(idea.id)} />
                ))}
            </div>

            {!loading && ideas.length === 0 && (
                <div className="col-span-full flex flex-col items-center justify-center min-h-[60vh] text-center">
                    <Lightbulb className="h-10 w-10 text-gray-400 mb-3" />
                    <h3 className="font-medium text-gray-900">Nenhuma ideia cadastrada</h3>
                    <p className="text-sm text-muted-foreground mt-1">Que tal começar criando uma nova ideia?</p>
                </div>
            )}

            {loading && (
                <div className="col-span-full flex flex-col items-center justify-center min-h-[60vh] text-center">
                    <Loader2 className="h-9 w-9 text-purple-600 animate-spin" />
                </div>
            )}

            <IdeaDetailDrawer open={openDrawer} onOpenChange={setOpenDrawer} ideaId={selectedIdeaId} />

            <CreateIdeaDialog open={openDialog} onOpenChange={setOpenDialog} onUpdated={refetch} />
        </Page>
    )
}