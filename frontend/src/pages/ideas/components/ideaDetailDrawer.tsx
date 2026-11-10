import { Button } from "@/components/ui/button"
import { Drawer, DrawerContentRight } from "@/components/ui/drawer"
import { GET_IDEA } from "@/lib/graphql/queries/ideia"
import { Idea } from "@/types"
import { useLazyQuery, useMutation } from "@apollo/client/react"
import { X } from "lucide-react"
import { useEffect } from "react"
import { CommentsList } from "./CommentsList"
import { CommentArea } from "./CommentArea"
import { VOTE_IDEA } from "@/lib/graphql/mutations/Vote"
import { toast } from "sonner"

interface IdeaDetailDrawerProps {
    ideaId: string | null
    open: boolean
    onOpenChange: (open: boolean) => void
}

export function IdeaDetailDrawer({open, onOpenChange, ideaId}: IdeaDetailDrawerProps) {
    const [getIdeaQuery, {data, loading}] = useLazyQuery<{getIdea: Idea}>(GET_IDEA)
    const [voteIdeaMutation, {loading: voting}] = useMutation(VOTE_IDEA, {
        refetchQueries: [GET_IDEA],
        awaitRefetchQueries: true,
    })

    useEffect(() => {
        if (!open || !ideaId) return
        
        getIdeaQuery({
            variables: {
                ideaId
            }
        })
    }, [open, ideaId, getIdeaQuery])

    const { getIdea: idea } = data || {}

    const handleVote = async () => {
        if (!ideaId || voting) return
        
        try {
            await voteIdeaMutation({
            variables: {
                ideaId,
            },
        })
        } catch (error: any) {
            toast.error("Não foi possível atualizar o voto.")
            console.log(error?.message)
        }
    }

    return (
        <Drawer open={open} onOpenChange={onOpenChange} direction="right">
            <DrawerContentRight className="flex flex-col">
                <div className="flex-shrink-0 p-8 bg-slate-100">
                    <div className="flex items-start justify-between">
                        <h2 className="text-xl text-gray-900 font-bold pr-4 flex-1">{idea?.title || "Carregando..."}</h2>
                        <Button variant="ghost" size="icon" onClick={() => onOpenChange(false)} className="flex-shrink-0"><X className="h-5 w-5" /></Button>
                    </div>
                    {idea && (
                        <p className="text-gray-700 leading-relaxed">{idea?.description || ""}</p>
                    )}
                </div>

            <div className="flex-1 overflow-y-auto p-8 space-y-8">
                <CommentsList comments={idea?.comments || []} loading={loading && !idea} />
            </div>
            <CommentArea commentContent={""} setCommentContent={console.log} handleAddComment={console.log} handleVote={handleVote} idea={idea} voting={voting} />
            </DrawerContentRight>
        </Drawer>
    )
}