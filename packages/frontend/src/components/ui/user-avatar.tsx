import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';

import { User } from '@/api/generated';
import { cn } from '@/lib/utils';

type Props = {
  user: Pick<User, 'fullName' | 'image'>;
  className?: string;
};

export const UserAvatar = ({ user, className }: Props) => {
  return (
    <Avatar className={cn('h-10 w-10', className)}>
      <AvatarImage src={user.image ?? ''} alt={user.fullName} />
      <AvatarFallback>{user.fullName}</AvatarFallback>
    </Avatar>
  );
};
