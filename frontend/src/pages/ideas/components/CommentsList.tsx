import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Textarea } from "@/components/ui/textarea"
import { getInitials } from "@/lib/utils"
import { useAuthStore } from "@/stores/auth"
import { Comment } from "@/types"
import { Check, Loader2, MoreHorizontal, Pencil, Trash, X } from "lucide-react"
import { useState } from "react"

interface CommentsListProps {
    comments: Comment[],
    loading: boolean
    onEdit: (comment: Comment, content: string) => void
    onDelete: (comment: Comment) => void
    updating: boolean
}

export function CommentsList({comments, loading, onEdit, onDelete, updating}: CommentsListProps) {
    const { user } = useAuthStore()
    const [commentId, setCommentId] = useState<string | null>(null)
    const [editContent, setEditContent] = useState("")

    const handleEditing = (comment: Comment) => {
        setCommentId(comment.id)
        setEditContent(comment.content)
    }

    const handleCancelEdit = () => {
        setCommentId(null)
        setEditContent("")
    }

    const handleSaveEdit = (comment: Comment) => {
        if (!editContent.trim()) return

        onEdit(comment, editContent.trim())
        setCommentId(null)
        setEditContent("")
    }
    
    return (
        <div>
            {loading ? (
                <p className="text-muted-foreground">Carregando comentários...</p>
            ) : comments.length > 0 ? (
                <div className="space-y-8">
                    {comments.map((comment) => {
                        const isCurrentUser = comment.author?.id === user?.id
                        const isEditing = commentId === comment.id

                        return (
                        <div key={comment.id} className="grid grid-cols-[2rem_minmax(0,1fr)] items-center gap-x-2.5 gap-y-1">
                            <Avatar className="h-8 w-8 flex-shrink-0">
                                <AvatarFallback className="bg-gray-900 text-white">
                                    {getInitials(comment.author?.name || "")}
                                </AvatarFallback>
                            </Avatar>
                            <div className="flex items-center justify-between">
                                <p className="font-semibold text-gray-800">{comment.author?.name || "Usuário"}</p>
                                {isCurrentUser && !isEditing && (
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button type="button" variant="ghost" size="icon" className="h-8 w-8 shrink-0 rounded-lg text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900 focus-visible:ring-0" onClick={(event) => event.stopPropagation()}>
                                                <MoreHorizontal className="h-4 w-4" />
                                                <span className="sr-only">Ações do comentário</span>
                                            </Button>
                                        </DropdownMenuTrigger>

                                        <DropdownMenuContent align="end" sideOffset={4} className="w-44 rounded-lg" onClick={(event) => event.stopPropagation()}>
                                            <DropdownMenuItem className="cursor-pointer gap-2" onSelect={() => handleEditing(comment)}>
                                                <Pencil className="h-4 w-4" />
                                                Editar comentário
                                            </DropdownMenuItem>

                                            <DropdownMenuItem className="cursor-pointer gap-2 text-red-600 focus:bg-red-50 focus:text-red-700" onSelect={() => onDelete(comment)}>
                                                <Trash className="h-4 w-4" />
                                                Excluir comentário
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                )}
                            </div>

                            <div className="col-start-2 w-full">
                                {isEditing ? (
                                    <div className="flex items-start gap-2">
                                        <Textarea 
                                            value={editContent}
                                            onChange={(e) => setEditContent(e.target.value)}
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter" && !e.shiftKey) {
                                                    e.preventDefault()
                                                    if (editContent.trim() && !updating) {
                                                        handleSaveEdit(comment)
                                                    }
                                                }
                                            }}
                                            rows={3} 
                                            className="resize-none rounded-xl" 
                                        />
                                        <div className="flex flex-col gap-2">
                                            <Button 
                                                size="icon"
                                                className="bg-blue-600 hover:bg-blue-700"
                                                onClick={() => handleSaveEdit(comment)}
                                                disabled={!editContent.trim() || updating}
                                            >
                                                {updating ? (
                                                    <Loader2 className="h-4 w-4 animate-spin" />
                                                ) : (
                                                    <Check className="h-4 w-4" />
                                                )}
                                            </Button>
                                            <Button type="button" size="icon" variant="outline" onClick={handleCancelEdit} disabled={updating}><X className="h-4 w-4" /></Button>
                                        </div>
                                    </div>
                                ) : (
                                    <p className="col-start-2 text-sm text-gray-600 whitespace-pre-wrap break-words">{comment.content}</p>
                                )}
                            </div>
                        </div>
                    )})}
                </div>
            ) : null}
        </div>
    )
}