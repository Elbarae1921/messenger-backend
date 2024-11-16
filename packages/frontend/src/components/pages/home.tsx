import { useGetPostsQuery } from '@/api/generated';

import { AppLayout } from '../layout/layout';
import { PostComponent } from '../ui/post';

export const Home = () => {
  const postsResults = useGetPostsQuery({ variables: { data: { limit: 10 } } });

  return (
    <AppLayout>
      <div className="flex gap-5 flex-col items-center">
        {postsResults.data?.getPosts.results.map(post => (
          <PostComponent key={post.id} post={post} />
        ))}
      </div>
    </AppLayout>
  );
};
