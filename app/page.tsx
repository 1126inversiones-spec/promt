import { PromptGenerator } from "@/components/prompt-generator";
import { DemoAccess } from "@/components/demo-access";

export default function Page() {
  return (
    <DemoAccess>
      <PromptGenerator />
    </DemoAccess>
  );
}
