import { Loader2 } from "lucide-react";
import { ReactNode } from "react";
import { Button } from "./ui/button";

type Props = {
  loading: boolean;
  children: ReactNode;
};
export default function SubmitButton({ loading, children }: Props) {
  return (
    <Button
      disabled={loading}
      type="submit"
      className="w-full flex items-center gap-x-2"
    >
      {loading && <Loader2 className="size-4 animate-spin" />} {children}
    </Button>
  );
}
