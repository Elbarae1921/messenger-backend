import { HeartIcon, MessageCircle } from 'lucide-react';

import { Comment, Post, User } from '@/api/generated';

import { Card, CardContent, CardFooter, CardHeader } from './card';
import { UserAvatar } from './user-avatar';

type Props = {
  post: Pick<Post, 'content' | 'likes'> & {
    user: Pick<User, 'fullName' | 'image'>;
    comments: Pick<Comment, 'content' | 'id'>[];
  };
};

export const PostComponent = ({ post }: Props) => {
  return (
    <Card className="w-[500px]">
      <CardHeader>
        <div className="flex items-center gap-2 justify-start">
          <UserAvatar user={post.user} />
          <p>{post.user.fullName}</p>
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-start">
          <p>{post.content}</p>
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex gap-5">
          <div className="flex items-center gap-2">
            <HeartIcon className="hover:stroke-red-500 cursor-pointer" />
            <p>{post.likes}</p>
          </div>
          <div className="flex items-center gap-2">
            <MessageCircle className="hover:stroke-green-500 cursor-pointer" />
            <p>{post.comments.length}</p>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};
