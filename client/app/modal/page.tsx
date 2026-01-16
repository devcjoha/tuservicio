import { Modal } from "@/components/ui/Modal";

export default function ModalPage() {
  return (
    <Modal isOpen={false} onClose={function (): void {
      throw new Error("Function not implemented.");
    } }    ></Modal>
  )
}