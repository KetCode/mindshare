import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useEffect, useState } from "react"
import { useMutation } from '@apollo/client/react'
import { CREATE_IDEA, UPDATE_IDEA } from "@/lib/graphql/mutations/Idea"
import { toast } from "sonner"
import { Idea } from "@/types"

interface CreateIdeaDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    onUpdated: () => void
    idea?: Idea
}

export function CreateIdeaDialog({ open, onOpenChange, onUpdated, idea }: CreateIdeaDialogProps) {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")

    const [ createIdea, { loading }] = useMutation(CREATE_IDEA, {
        onCompleted() {
            toast.success("Idea criada com sucesso")
            onUpdated()
            onOpenChange(false)
        },
        onError(error) {
            toast.error("Falha ao criar a ideia")
            console.log(error)
        }
    })

    const [updateIdea, { loading: updating }] = useMutation(UPDATE_IDEA, {
        onCompleted() {
            toast.success("Ideia atualizada com sucesso")
            onUpdated()
            onOpenChange(false)
        },
        onError(error) {
            toast.error("Falha ao editar a ideia")
            console.log(error)
        }
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (idea) {
            await updateIdea({
                variables: {
                    id: idea.id,
                    data: {
                        title,
                        description
                    }
                }
            })
        } else {
            await createIdea({
                variables: {
                    data: {
                        title,
                        description,
                    }
                }
            })
        }
    }

    const handleCancel = () => {
        setTitle("")
        setDescription("")
        onOpenChange(false)
    }

    useEffect(() => {
        if (open) {
            setTitle(idea?.title ?? "")
            setDescription(idea?.description ?? "")
        }
    }, [idea, open])

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent onOpenAutoFocus={(event) => event.preventDefault()}>
                <DialogHeader className="space-y-2">
                    <DialogTitle className="text-2xl font-bold leading-tight">Compartilhe sua ideia</DialogTitle>
                    <DialogDescription className="text-sm text-muted-foreground">Adicione uma nova ideia para seu time</DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-5 mt-4">
                    <div className="space-y-1">
                        <Label htmlFor="title" className="text-sm font-normal">Título</Label>
                        <Input id="title" placeholder="Dê um nome para sua ideia" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full" disabled={loading} />
                    </div>
                    
                    <div className="space-y-1">
                        <Label htmlFor="description" className="text-sm font-normal">Descrição</Label>
                        <Textarea id="description" placeholder="Descreva sua ideia" value={description} onChange={(e) => setDescription(e.target.value)} rows={6} className="resize-none" disabled={loading} />
                    </div>

                    <div className="flex justify-end gap-3 pt-2">
                        <Button type="button" variant="outline" onClick={handleCancel}>Cancelar</Button>
                        <Button type="submit" disabled={!title.trim() || loading || updating}>Salvar</Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}