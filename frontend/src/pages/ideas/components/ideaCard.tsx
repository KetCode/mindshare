import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageSquare, ThumbsUp } from "lucide-react"
import type { Idea } from "@/types"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { formatRelativeDate, getInitials } from "@/lib/utils"

interface IdeaCardProps {
  idea: Idea
  isCurrentUser: boolean
  onClick: () => void
}

export function IdeaCard({ idea, isCurrentUser, onClick }: IdeaCardProps) {
  return (
    <Card
      key={idea.id}
      onClick={onClick}
      className="flex h-full flex-col hover:shadow-lg transition-shadow cursor-pointer"
    >
      <CardHeader className="p-5 pb-0">
        <CardTitle className="line-clamp-2">
          <div className="flex items-center gap-1.5">
            <Avatar className="h-6 w-6">
              <AvatarFallback className="bg-zinc-950 text-primary-foreground text-xs">{getInitials(idea.author?.name || "")} </AvatarFallback>
            </Avatar>
            <span className="text-sm font-medium line-clamp-1 text-gray-600">
              {idea.author?.name || "Usuário"}
            </span>
            {isCurrentUser && (
              <div className="flex min-h-6 items-center justify-center gap-2 rounded-lg border border-gray-200 px-2 py-1">
                <span className="text-xs font-medium text-gray-900">você</span>
              </div>
            )}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col p-5 pt-3">
        <div className="hover:text-primary transition-colors text-xl line-clamp-2 text-zinc-950">
          {idea.title}
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {idea.description || ""}
        </p>
        <div className="flex items-center justify-between pt-6 mt-auto">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-sm text-gray-900 py-1 px-3 border border-zinc-200 rounded-lg">
              <MessageSquare className="h-4 w-4 text-primary" />
              <span>{idea.comments?.length || 0}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-900 py-1 px-3 border border-zinc-200 rounded-lg">
              <ThumbsUp className="h-4 w-4 text-green-500" />
              <span>{idea.countVotes || 0}</span>
            </div>
          </div>
          <span className="text-sm text-muted-foreground">
            {formatRelativeDate(idea.createdAt)}
          </span>
        </div>
      </CardContent>
    </Card>
  )
}