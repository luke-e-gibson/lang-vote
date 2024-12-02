"use client"

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription, DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { cached_getUser, registerLang } from "@/server/queries";
import { useLocalStorage } from "@rehooks/local-storage";
import { useRouter } from "next/navigation";

export function AddLangDialog(){
  const [browserId] = useLocalStorage("fingerprint", "");
  const [name, setName] = useState("");
  const [open, setOpen] = useState(false);
  const [description, setDescription] = useState("");
  const router = useRouter()

  async function addLang() {
    if (browserId === "") throw new Error("No browser id");
    const user = await cached_getUser(browserId);
    if(!user?.id) throw new Error("User is not registered");

    await registerLang({ name, description }, user.browserId);
    void router.refresh();
    void setOpen(false);
    void setName("")
    void setDescription("")
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild><Button>Add Lang</Button></DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a language</DialogTitle>
          <DialogDescription>Is your favourite language not in the list add it here</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              id="name"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Description
            </Label>
            <Input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              id="name"
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={addLang}>Add language</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}