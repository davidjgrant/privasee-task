import { AvatarImage, AvatarFallback, Avatar } from '@/components/ui/avatar';
import { Button } from '../ui/button';

export const Header = () => {
  return (
    <header className="flex justify-between">
      <h1 className="text-2xl font-bold">CAIQ</h1>
      <div className="flex space-x-4">
        <Button variant="ghost">Sandbox</Button>
        <Avatar>
          <AvatarImage alt="User avatar" src="" />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
};
