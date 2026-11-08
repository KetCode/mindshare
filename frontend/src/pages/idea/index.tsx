import { Page } from "@/components/page";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react"
import { useState } from "react";
import { CreateIdeaDialog } from "./components/createIdeaDialog";

export function IdeasPage () {
    const [openDialog, setOpenDialog] = useState(false)

    return (
        <Page>
            <div className="space-y-6">
                <div className="flex items-center justify-beetwen">
                    <Label className="text-3xl font-medium text-purple-600">Ideias</Label>
                    <Button onClick={() => setOpenDialog(true)}>
                        <Plus className="mr-2 h-4 w-4" />
                        Nova ideia
                    </Button>
                </div>
            </div>

            <CreateIdeaDialog open={openDialog} onOpenChange={setOpenDialog} />
        </Page>
    )
}