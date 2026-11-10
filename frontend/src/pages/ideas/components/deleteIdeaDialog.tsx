import { useMutation } from "@apollo/client/react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Idea } from "@/types"
import { DELETE_IDEA } from "@/lib/graphql/mutations/Idea"
import { LIST_IDEIAS } from "@/lib/graphql/queries/ideia"
import { toast } from "sonner"

interface DeleteIdealDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  idea: Idea | null
}

export function DeleteIdeaDialog({ open, onOpenChange, idea }: DeleteIdealDialogProps) {
  const [deleteIdeaMutation, { loading }] = useMutation(DELETE_IDEA, {
    onCompleted: () => {
      onOpenChange(false)
      toast.success("Ideia excluída com sucesso")
    },
    onError: (error) => {
      toast.error("Falha ao excluir a ideia")
      console.error(error)
    },
    refetchQueries: [LIST_IDEIAS],
    awaitRefetchQueries: true,
  })

  const handledelete = async () => {
    if (!idea) return

    await deleteIdeaMutation({
      variables: {
        id: idea.id,
      },
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Remover Usuário</DialogTitle>
        </DialogHeader>
        <p className="text-sm text-muted-foreground">
          Tem certeza que deseja remover
          <span className="font-medium"> "{idea?.title}"</span>? 
          Essa ação não poderá ser desfeita.
        </p>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}> Cancelar </Button>
          <Button variant="destructive" onClick={handledelete} disabled={loading || !idea}>Remover</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}