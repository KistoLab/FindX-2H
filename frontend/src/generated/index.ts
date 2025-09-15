import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type CreateMatchInput = {
  scheduleAt: Scalars['String']['input'];
  slotA: Scalars['ID']['input'];
  slotB: Scalars['ID']['input'];
  task: Scalars['String']['input'];
  tournamentId: Scalars['ID']['input'];
};

export type MatchRoom = {
  __typename?: 'MatchRoom';
  id: Scalars['ID']['output'];
  loser?: Maybe<Scalars['ID']['output']>;
  round: Scalars['String']['output'];
  scheduleAt: Scalars['String']['output'];
  slotA: Scalars['ID']['output'];
  slotB: Scalars['ID']['output'];
  status: MatchStatus;
  task: Scalars['String']['output'];
  tournamentId: Scalars['ID']['output'];
  winner?: Maybe<Scalars['ID']['output']>;
};

export enum MatchStatus {
  Completed = 'COMPLETED',
  Pending = 'PENDING'
}

export type Mutation = {
  __typename?: 'Mutation';
  createMatch: Response;
  createPiWard: Response;
  createTournament: Response;
  deleteTournament: Response;
  registerStudentToTournament: Response;
  updateTournamentStatus: Response;
  updateWinner: Response;
};


export type MutationCreateMatchArgs = {
  input: CreateMatchInput;
};


export type MutationCreatePiWardArgs = {
  tournamentId: Scalars['ID']['input'];
};


export type MutationCreateTournamentArgs = {
  tournamentInput: TournamentInput;
};


export type MutationDeleteTournamentArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRegisterStudentToTournamentArgs = {
  studentId: Scalars['ID']['input'];
  tournamentId: Scalars['ID']['input'];
};


export type MutationUpdateTournamentStatusArgs = {
  id: Scalars['ID']['input'];
  status: Status;
};


export type MutationUpdateWinnerArgs = {
  input: UpdateWinnerInput;
};

export type PiWard = {
  __typename?: 'PiWard';
  createdAt: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  students: Array<PiWardStudent>;
  tournamentId: Scalars['ID']['output'];
  updatedAt: Scalars['String']['output'];
};

export type PiWardStudent = {
  __typename?: 'PiWardStudent';
  place: Scalars['Int']['output'];
  points: Scalars['Int']['output'];
  studentId: Scalars['ID']['output'];
};

export type Query = {
  __typename?: 'Query';
  getAllPiWards: Array<PiWard>;
  getMatchRoom?: Maybe<MatchRoom>;
  getMatchRooms: Array<MatchRoom>;
  getPiWard?: Maybe<PiWard>;
  getTournament?: Maybe<Tournament>;
  getTournaments: Array<Tournament>;
};


export type QueryGetMatchRoomArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetMatchRoomsArgs = {
  tournamentId: Scalars['ID']['input'];
};


export type QueryGetPiWardArgs = {
  tournamentId: Scalars['ID']['input'];
};


export type QueryGetTournamentArgs = {
  id: Scalars['ID']['input'];
};

export type Response = {
  __typename?: 'Response';
  message?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

export enum Status {
  Finished = 'FINISHED',
  Ongoing = 'ONGOING',
  Opening = 'OPENING'
}

export type Tournament = {
  __typename?: 'Tournament';
  closedAt: Scalars['String']['output'];
  createdAt: Scalars['String']['output'];
  date: Scalars['String']['output'];
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  maxScore: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  participants: Array<Scalars['ID']['output']>;
  piPoints: Scalars['Int']['output'];
  piWards: Array<Scalars['ID']['output']>;
  rounds: Array<MatchRoom>;
  size: Scalars['Int']['output'];
  status: Status;
  topic: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
};

export type TournamentInput = {
  closedAt: Scalars['String']['input'];
  date: Scalars['String']['input'];
  description: Scalars['String']['input'];
  maxScore: Scalars['Int']['input'];
  name: Scalars['String']['input'];
  piPoints: Scalars['Int']['input'];
  size: Scalars['Int']['input'];
  status?: InputMaybe<Status>;
  topic: Scalars['String']['input'];
};

export type UpdateWinnerInput = {
  loserId: Scalars['ID']['input'];
  matchId: Scalars['ID']['input'];
  winnerId: Scalars['ID']['input'];
};

export type GetTournamentQueryVariables = Exact<{
  getTournamentId: Scalars['ID']['input'];
}>;


export type GetTournamentQuery = { __typename?: 'Query', getTournament?: { __typename?: 'Tournament', id: string, name: string, description: string, date: string, size: number, maxScore: number, piPoints: number, piWards: Array<string>, closedAt: string, participants: Array<string>, status: Status, topic: string, createdAt: string, updatedAt: string, rounds: Array<{ __typename?: 'MatchRoom', id: string, task: string, round: string, scheduleAt: string, slotA: string, slotB: string, winner?: string | null, loser?: string | null, tournamentId: string, status: MatchStatus }> } | null };

export type CreateTournamentMutationVariables = Exact<{
  tournamentInput: TournamentInput;
}>;


export type CreateTournamentMutation = { __typename?: 'Mutation', createTournament: { __typename?: 'Response', success: boolean, message?: string | null } };


export const GetTournamentDocument = gql`
    query GetTournament($getTournamentId: ID!) {
  getTournament(id: $getTournamentId) {
    id
    name
    description
    date
    size
    maxScore
    piPoints
    piWards
    closedAt
    rounds {
      id
      task
      round
      scheduleAt
      slotA
      slotB
      winner
      loser
      tournamentId
      status
    }
    participants
    status
    topic
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useGetTournamentQuery__
 *
 * To run a query within a React component, call `useGetTournamentQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTournamentQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTournamentQuery({
 *   variables: {
 *      getTournamentId: // value for 'getTournamentId'
 *   },
 * });
 */
export function useGetTournamentQuery(baseOptions: Apollo.QueryHookOptions<GetTournamentQuery, GetTournamentQueryVariables> & ({ variables: GetTournamentQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTournamentQuery, GetTournamentQueryVariables>(GetTournamentDocument, options);
      }
export function useGetTournamentLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTournamentQuery, GetTournamentQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTournamentQuery, GetTournamentQueryVariables>(GetTournamentDocument, options);
        }
export function useGetTournamentSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetTournamentQuery, GetTournamentQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetTournamentQuery, GetTournamentQueryVariables>(GetTournamentDocument, options);
        }
export type GetTournamentQueryHookResult = ReturnType<typeof useGetTournamentQuery>;
export type GetTournamentLazyQueryHookResult = ReturnType<typeof useGetTournamentLazyQuery>;
export type GetTournamentSuspenseQueryHookResult = ReturnType<typeof useGetTournamentSuspenseQuery>;
export type GetTournamentQueryResult = Apollo.QueryResult<GetTournamentQuery, GetTournamentQueryVariables>;
export const CreateTournamentDocument = gql`
    mutation CreateTournament($tournamentInput: TournamentInput!) {
  createTournament(tournamentInput: $tournamentInput) {
    success
    message
  }
}
    `;
export type CreateTournamentMutationFn = Apollo.MutationFunction<CreateTournamentMutation, CreateTournamentMutationVariables>;

/**
 * __useCreateTournamentMutation__
 *
 * To run a mutation, you first call `useCreateTournamentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTournamentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTournamentMutation, { data, loading, error }] = useCreateTournamentMutation({
 *   variables: {
 *      tournamentInput: // value for 'tournamentInput'
 *   },
 * });
 */
export function useCreateTournamentMutation(baseOptions?: Apollo.MutationHookOptions<CreateTournamentMutation, CreateTournamentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateTournamentMutation, CreateTournamentMutationVariables>(CreateTournamentDocument, options);
      }
export type CreateTournamentMutationHookResult = ReturnType<typeof useCreateTournamentMutation>;
export type CreateTournamentMutationResult = Apollo.MutationResult<CreateTournamentMutation>;
export type CreateTournamentMutationOptions = Apollo.BaseMutationOptions<CreateTournamentMutation, CreateTournamentMutationVariables>;