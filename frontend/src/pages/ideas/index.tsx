import { Page } from "@/components/page";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react"
import { useState } from "react";
import { CreateIdeaDialog } from "./components/createIdeaDialog";
import { useQuery } from "@apollo/client/react";
import { LIST_IDEIAS } from "@/lib/graphql/queries/ideia";
import { Idea } from "@/types";
import { IdeaCard } from "./components/ideaCard";
import { IdeaDetailDrawer } from "./components/ideaDetailDrawer";

export function IdeasPage () {
    const [openDialog, setOpenDialog] = useState(false)
    const [openDrawer, setOpenDrawer] = useState(false)
    const {data, loading, refetch} = useQuery<{ listIdeas: Idea[] }>(LIST_IDEIAS)
    const [selectedIdeaId, setSelectedIdeaId] = useState<string | null>(null)

    const ideas = data?.listIdeas || []

    const handleIdeaClick = (ideaId: string) => {
        setSelectedIdeaId(ideaId)
        setOpenDrawer(true)
    }

    return (
        <Page>
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <Label className="text-3xl font-medium text-purple-600">Ideias</Label>
                    <Button onClick={() => setOpenDialog(true)}>
                        <Plus className="mr-2 h-4 w-4" />
                        Nova ideia
                    </Button>
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 pt-6">
                {ideas.map((idea) => (
                    <IdeaCard key={idea.id} idea={idea} onClick={() => handleIdeaClick(idea.id)} />
                ))}
            </div>

            <IdeaDetailDrawer open={openDrawer} onOpenChange={setOpenDrawer} ideaId={selectedIdeaId} />

            <CreateIdeaDialog open={openDialog} onOpenChange={setOpenDialog} />
        </Page>
    )
}