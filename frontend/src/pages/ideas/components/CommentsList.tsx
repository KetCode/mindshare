import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { getInitials } from "@/lib/utils"
import { Comment } from "@/types"

interface CommentsListProps {
    comments: Comment[],
    loading: boolean
}

export function CommentsList({comments, loading}: CommentsListProps) {
    return (
        <div>
            {loading ? (
                <p className="text-muted-foreground">Carregando comentários...</p>
            ) : comments.length > 0 ? (
                <div className="space-y-8">
                    {comments.map((comment) => (
                        <div key={comment.id} className="grid grid-cols-[2rem_minmax(0,1fr)] items-center gap-x-2.5 gap-y-1">
                            <Avatar className="h-8 w-8 flex-shrink-0">
                                <AvatarFallback className="bg-gray-900 text-white">
                                    {getInitials(comment.author?.name || "")}
                                </AvatarFallback>
                            </Avatar>
                            <p className="font-semibold text-gray-800">{comment.author?.name || "Usuário"}</p>
                            <p className="col-start-2 text-sm text-gray-600 whitespace-pre-wrap break-words">{comment.content}</p>
                        </div>
                    ))}
                </div>
            ) : null}
        </div>
    )
}