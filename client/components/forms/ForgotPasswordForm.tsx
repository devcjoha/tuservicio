import { useAuth } from "@/hooks/useAuth";
import { ChangeEvent, FormEvent, useState } from "react";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import { useModal } from "@/hooks/useModal";

interface Props {
  closeForm: () => void;
}
export default function ForgotPasswordForm({ closeForm }: Props){
  const { forgotPassword, loading } = useAuth();
  const [email, setEmail] = useState<string>("");
  const { open, close } = useModal();

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
}
  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {   
      const res = await forgotPassword(email) as any;
    
      if (res && res.success) {
        closeForm()
        open({
          title: `Recuperar Contraseña`,
          message: res.message,
          variant: "success",
        });
      }
    } catch (err:any) {
        open({
          title: "Recuperar Contraseña",
          message: err.message,
          variant: "error",
        });
    } 
  };
  return (
    <form onSubmit={onSubmit} className="space-y-4 w-full">
      <Input
        name="email"
        placeholder="Email"
        type="email"
        value={email}
        onChange={handleInput}
      
      />
      <Button variant="secondary" size="lg"  type="submit" disabled={!email}>{email  ? (
        <>
          <span className="animate-pulse">Enviar...</span>
        </>
      ) : (
        "Escribe tu email"
      )}</Button>
    </form>
  )
};