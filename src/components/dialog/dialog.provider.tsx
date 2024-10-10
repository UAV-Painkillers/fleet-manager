import { useState, useCallback } from "react"
import { DialogType, DialogContext } from "./dialog.context";
import { DialogComponent } from "./dialog.component";

export function DialogProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [dialogType, setDialogType] = useState<DialogType>('alert')
  const [message, setMessage] = useState('')
  const [defaultValue, setDefaultValue] = useState('')
  const [resolve, setResolve] = useState<((value: any) => void) | null>(null)

  const openDialog = useCallback((type: DialogType, message: string, defaultValue: string = '') => {
    setIsOpen(true)
    setDialogType(type)
    setMessage(message)
    setDefaultValue(defaultValue)
    return new Promise((res) => {
      setResolve(() => res)
    })
  }, [])

  const alert = useCallback((message: string) => openDialog('alert', message) as Promise<void>, [openDialog])
  const confirm = useCallback((message: string) => openDialog('confirm', message) as Promise<boolean>, [openDialog])
  const prompt = useCallback((message: string, defaultValue: string = '') => 
    openDialog('prompt', message, defaultValue) as Promise<string | null>, [openDialog])

  const handleClose = (value: any) => {
    setIsOpen(false)
    if (resolve) resolve(value)
  }

  return (
    <DialogContext.Provider value={{ alert, confirm, prompt }}>
      {children}
      <DialogComponent
        isOpen={isOpen}
        type={dialogType}
        message={message}
        defaultValue={defaultValue}
        onClose={handleClose}
      />
    </DialogContext.Provider>
  )
}