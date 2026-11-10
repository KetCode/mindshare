import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useAuthStore } from "@/stores/auth"
import { Idea } from "@/types"
import { ThumbsUp } from "lucide-react"

interface CommentAreaProps {
    commentContent: string
    setCommentContent: (value: string) => void
    handleAddComment: () => void
    handleVote: () => void
    voting: boolean
    commenting: boolean
    idea?: Idea
}

export function CommentArea({commentContent, setCommentContent, handleAddComment, handleVote, voting, commenting, idea}: CommentAreaProps) {
    const { user } = useAuthStore()

    const isRestrictedRole = user?.role === "viewer"

    return (
        <div>
            {!isRestrictedRole && (
                <div className="flex-shrink-0 p-6" >
                    <div className="flex items-start gap-4">
                        <Avatar className="h-8 w-8 flex-shrink-0">
                            <AvatarFallback className="bg-gray-900 text-white">{user?.name?.charAt(0).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 space-y-3">
                            <Textarea 
                                placeholder="Digite um comentário"
                                value={commentContent} 
                                onChange={(e) => setCommentContent(e.target.value)}
                                rows={3}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter" && !e.shiftKey) {
                                        e.preventDefault()
                                        if (commentContent.trim() && !commenting) {
                                            handleAddComment()
                                        }
                                    }
                                }}
                                className="resize-none rounded-xl"
                                disabled={commenting} 
                            />
                            <div className="flex items-center justify-between">
                                <Button variant="outline" onClick={handleVote} disabled={!user || !idea || voting} className={`${idea?.votes?.some((v) => v.userId === user?.id) ? "rounded-lg gap-1 p-3 bg-green-100 border-green-600 text-green-800" : "rounded-lg gap-1 p-3 border-zinc-200 text-gray-900 font-normal"} hover:bg-green-100 hover:border-green-600 hover:text-green-800`}>
                                    <ThumbsUp className="mr-2 h-4 w-4 text-green-600" />
                                    {idea?.countVotes || 0}
                                </Button>
                                <Button onClick={handleAddComment} disabled={!user || !idea || !commentContent.trim() || commenting} className="rounded-lg bg-blue-600 hover:bg-blue-700 text-white disable:opacity-50">Comentar</Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}