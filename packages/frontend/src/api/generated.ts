import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Comment = {
  __typename?: 'Comment';
  content: Scalars['String'];
  id: Scalars['ID'];
  post: Post;
  user: User;
};

export type CreateCommentInput = {
  content: Scalars['String'];
  id: Scalars['Float'];
};

export type CreatePostInput = {
  content: Scalars['String'];
  isPrivate: Scalars['Boolean'];
};

export type FriendRequest = {
  __typename?: 'FriendRequest';
  id: Scalars['ID'];
  receiver: User;
  sender: User;
};

export type GetFriendRequestsOutput = {
  __typename?: 'GetFriendRequestsOutput';
  hasMore: Scalars['Boolean'];
  lastId?: Maybe<Scalars['Float']>;
  results: Array<FriendRequest>;
};

export type GetFriendsOutput = {
  __typename?: 'GetFriendsOutput';
  hasMore: Scalars['Boolean'];
  lastId?: Maybe<Scalars['Float']>;
  results: Array<User>;
};

export type GetPostsOutput = {
  __typename?: 'GetPostsOutput';
  hasMore: Scalars['Boolean'];
  lastId?: Maybe<Scalars['Float']>;
  results: Array<Post>;
};

export type IdInput = {
  id: Scalars['Float'];
};

export type LoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type LoginOutput = {
  __typename?: 'LoginOutput';
  user: User;
};

export type Mutation = {
  __typename?: 'Mutation';
  acceptFriendRequest: Scalars['Boolean'];
  cancelOrDeclineFriendRequest: Scalars['Boolean'];
  createComment: Comment;
  createPost: Post;
  deleteComment: Scalars['Boolean'];
  deletePost: Scalars['Boolean'];
  like: Scalars['Boolean'];
  login?: Maybe<LoginOutput>;
  logout: Scalars['Boolean'];
  register: LoginOutput;
  removeFriend: Scalars['Boolean'];
  sendFriendRequest: Scalars['Boolean'];
  unlike: Scalars['Boolean'];
};

export type MutationAcceptFriendRequestArgs = {
  data: IdInput;
};

export type MutationCancelOrDeclineFriendRequestArgs = {
  data: IdInput;
};

export type MutationCreateCommentArgs = {
  data: CreateCommentInput;
};

export type MutationCreatePostArgs = {
  data: CreatePostInput;
};

export type MutationDeleteCommentArgs = {
  data: IdInput;
};

export type MutationDeletePostArgs = {
  data: IdInput;
};

export type MutationLikeArgs = {
  data: IdInput;
};

export type MutationLoginArgs = {
  data: LoginInput;
};

export type MutationRegisterArgs = {
  data: RegisterInput;
};

export type MutationRemoveFriendArgs = {
  data: IdInput;
};

export type MutationSendFriendRequestArgs = {
  data: IdInput;
};

export type MutationUnlikeArgs = {
  data: IdInput;
};

export type PaginationInput = {
  cursor?: InputMaybe<Scalars['Float']>;
  limit?: InputMaybe<Scalars['Float']>;
};

export type Post = {
  __typename?: 'Post';
  comments: Array<Comment>;
  content: Scalars['String'];
  id: Scalars['ID'];
  isPrivate: Scalars['Boolean'];
  likers: Array<User>;
  likes: Scalars['Float'];
  user: User;
};

export type Query = {
  __typename?: 'Query';
  getFriendRequests: GetFriendRequestsOutput;
  getFriends: GetFriendsOutput;
  getPost?: Maybe<Post>;
  getPosts: GetPostsOutput;
  getUser?: Maybe<User>;
  me?: Maybe<User>;
  searchUsers: Array<User>;
};

export type QueryGetFriendRequestsArgs = {
  data: PaginationInput;
};

export type QueryGetFriendsArgs = {
  data: PaginationInput;
};

export type QueryGetPostArgs = {
  data: IdInput;
};

export type QueryGetPostsArgs = {
  data: PaginationInput;
};

export type QueryGetUserArgs = {
  data: IdInput;
};

export type QuerySearchUsersArgs = {
  data: SearchUsersInput;
};

export type RegisterInput = {
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  password: Scalars['String'];
};

export type SearchUsersInput = {
  term: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  email: Scalars['String'];
  firstName: Scalars['String'];
  friend: Scalars['Boolean'];
  fullName: Scalars['String'];
  id: Scalars['ID'];
  image?: Maybe<Scalars['String']>;
  invited: Scalars['Boolean'];
  inviting: Scalars['Boolean'];
  lastName: Scalars['String'];
};

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;

export type LoginMutation = {
  __typename?: 'Mutation';
  login?: { __typename?: 'LoginOutput'; user: { __typename?: 'User'; id: string } } | null;
};

export type LogoutMutationVariables = Exact<{ [key: string]: never }>;

export type LogoutMutation = { __typename?: 'Mutation'; logout: boolean };

export type MeQueryVariables = Exact<{ [key: string]: never }>;

export type MeQuery = {
  __typename?: 'Query';
  me?: {
    __typename?: 'User';
    id: string;
    firstName: string;
    lastName: string;
    fullName: string;
    image?: string | null;
    email: string;
  } | null;
};

export const LoginDocument = gql`
  mutation Login($email: String!, $password: String!) {
    login(data: { email: $email, password: $password }) {
      user {
        id
      }
    }
  }
`;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(
  baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
}
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<
  LoginMutation,
  LoginMutationVariables
>;
export const LogoutDocument = gql`
  mutation Logout {
    logout
  }
`;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(
  baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
}
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<
  LogoutMutation,
  LogoutMutationVariables
>;
export const MeDocument = gql`
  query Me {
    me {
      id
      firstName
      lastName
      fullName
      image
      email
    }
  }
`;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
}
export function useMeLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
}
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
