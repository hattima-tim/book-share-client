import { Check, X } from "lucide-react";

const PasswordRequirement = ({ met, text }: { met: boolean; text: string }) => (
  <div
    className={`flex items-center gap-2 text-sm ${
      met ? "text-green-600" : "text-muted-foreground"
    }`}
  >
    {met ? (
      <Check className="h-4 w-4 text-green-600" />
    ) : (
      <X className="h-4 w-4 text-muted-foreground" />
    )}
    <span>{text}</span>
  </div>
);

export default PasswordRequirement;
