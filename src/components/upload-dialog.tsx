
import React from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { ResourceUpload } from "@/components/resource-upload";

export function UploadDialog() {
  const [open, setOpen] = React.useState(false);
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2" size={16} />
          Add Resource
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[550px]">
        <ResourceUpload 
          onCancel={() => setOpen(false)}
          onSuccess={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
