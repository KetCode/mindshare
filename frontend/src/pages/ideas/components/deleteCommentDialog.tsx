import { useMutation } from "@apollo/client/react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { LIST_IDEIAS } from "@/lib/graphql/queries/ideia"
import { toast } from "sonner"
import { DELETE_COMMENT } from "@/lib/graphql/mutations/Comment"

interface DeleteCommentDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  commentId: string | null
}

export function DeleteCommentDialog({ open, onOpenChange, commentId }: DeleteCommentDialogProps) {
  const [deleteCommentMutation, { loading }] = useMutation(DELETE_COMMENT, {
    onCompleted: () => {
      onOpenChange(false)
      toast.success("Comentário excluído com sucesso")
    },
    onError: (error) => {
      toast.error("Falha ao excluir comentário")
      console.error(error)
    },
    refetchQueries: [LIST_IDEIAS],
    awaitRefetchQueries: true,
  })

  const handledelete = async () => {
    if (!commentId || loading) return

    await deleteCommentMutation({
      variables: {
        id: commentId,
      },
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Remover comentário</DialogTitle>
        </DialogHeader>
        <p className="text-sm text-muted-foreground">
          Tem certeza que deseja remover? 
          Essa ação não poderá ser desfeita.
        </p>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}> Cancelar </Button>
          <Button variant="destructive" onClick={handledelete} disabled={loading || !commentId}>Remover</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}