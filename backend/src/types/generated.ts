import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T;
export type InputMaybe<T> = T;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
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



export type ResolverTypeWrapper<T> = Promise<T> | T;

export type Resolver<TResult, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>, TArgs = Record<PropertyKey, never>> = ResolverFn<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>, TArgs = Record<PropertyKey, never>> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = Record<PropertyKey, never>, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>, TArgs = Record<PropertyKey, never>> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;





/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  CreateMatchInput: CreateMatchInput;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  MatchRoom: ResolverTypeWrapper<MatchRoom>;
  MatchStatus: MatchStatus;
  Mutation: ResolverTypeWrapper<Record<PropertyKey, never>>;
  PiWard: ResolverTypeWrapper<PiWard>;
  PiWardStudent: ResolverTypeWrapper<PiWardStudent>;
  Query: ResolverTypeWrapper<Record<PropertyKey, never>>;
  Response: ResolverTypeWrapper<Response>;
  Status: Status;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  Tournament: ResolverTypeWrapper<Tournament>;
  TournamentInput: TournamentInput;
  UpdateWinnerInput: UpdateWinnerInput;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean']['output'];
  CreateMatchInput: CreateMatchInput;
  ID: Scalars['ID']['output'];
  Int: Scalars['Int']['output'];
  MatchRoom: MatchRoom;
  Mutation: Record<PropertyKey, never>;
  PiWard: PiWard;
  PiWardStudent: PiWardStudent;
  Query: Record<PropertyKey, never>;
  Response: Response;
  String: Scalars['String']['output'];
  Tournament: Tournament;
  TournamentInput: TournamentInput;
  UpdateWinnerInput: UpdateWinnerInput;
};

export type MatchRoomResolvers<ContextType = Context, ParentType extends ResolversParentTypes['MatchRoom'] = ResolversParentTypes['MatchRoom']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  loser?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  round?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  scheduleAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  slotA?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  slotB?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['MatchStatus'], ParentType, ContextType>;
  task?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  tournamentId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  winner?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
};

export type MutationResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createMatch?: Resolver<ResolversTypes['Response'], ParentType, ContextType, RequireFields<MutationCreateMatchArgs, 'input'>>;
  createPiWard?: Resolver<ResolversTypes['Response'], ParentType, ContextType, RequireFields<MutationCreatePiWardArgs, 'tournamentId'>>;
  createTournament?: Resolver<ResolversTypes['Response'], ParentType, ContextType, RequireFields<MutationCreateTournamentArgs, 'tournamentInput'>>;
  deleteTournament?: Resolver<ResolversTypes['Response'], ParentType, ContextType, RequireFields<MutationDeleteTournamentArgs, 'id'>>;
  registerStudentToTournament?: Resolver<ResolversTypes['Response'], ParentType, ContextType, RequireFields<MutationRegisterStudentToTournamentArgs, 'studentId' | 'tournamentId'>>;
  updateTournamentStatus?: Resolver<ResolversTypes['Response'], ParentType, ContextType, RequireFields<MutationUpdateTournamentStatusArgs, 'id' | 'status'>>;
  updateWinner?: Resolver<ResolversTypes['Response'], ParentType, ContextType, RequireFields<MutationUpdateWinnerArgs, 'input'>>;
};

export type PiWardResolvers<ContextType = Context, ParentType extends ResolversParentTypes['PiWard'] = ResolversParentTypes['PiWard']> = {
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  students?: Resolver<Array<ResolversTypes['PiWardStudent']>, ParentType, ContextType>;
  tournamentId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};

export type PiWardStudentResolvers<ContextType = Context, ParentType extends ResolversParentTypes['PiWardStudent'] = ResolversParentTypes['PiWardStudent']> = {
  place?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  points?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  studentId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
};

export type QueryResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  getAllPiWards?: Resolver<Array<ResolversTypes['PiWard']>, ParentType, ContextType>;
  getMatchRoom?: Resolver<Maybe<ResolversTypes['MatchRoom']>, ParentType, ContextType, RequireFields<QueryGetMatchRoomArgs, 'id'>>;
  getMatchRooms?: Resolver<Array<ResolversTypes['MatchRoom']>, ParentType, ContextType, RequireFields<QueryGetMatchRoomsArgs, 'tournamentId'>>;
  getPiWard?: Resolver<Maybe<ResolversTypes['PiWard']>, ParentType, ContextType, RequireFields<QueryGetPiWardArgs, 'tournamentId'>>;
  getTournament?: Resolver<Maybe<ResolversTypes['Tournament']>, ParentType, ContextType, RequireFields<QueryGetTournamentArgs, 'id'>>;
  getTournaments?: Resolver<Array<ResolversTypes['Tournament']>, ParentType, ContextType>;
};

export type ResponseResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Response'] = ResolversParentTypes['Response']> = {
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
};

export type TournamentResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Tournament'] = ResolversParentTypes['Tournament']> = {
  closedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  date?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  maxScore?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  participants?: Resolver<Array<ResolversTypes['ID']>, ParentType, ContextType>;
  piPoints?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  piWards?: Resolver<Array<ResolversTypes['ID']>, ParentType, ContextType>;
  rounds?: Resolver<Array<ResolversTypes['MatchRoom']>, ParentType, ContextType>;
  size?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['Status'], ParentType, ContextType>;
  topic?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};

export type Resolvers<ContextType = Context> = {
  MatchRoom?: MatchRoomResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  PiWard?: PiWardResolvers<ContextType>;
  PiWardStudent?: PiWardStudentResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Response?: ResponseResolvers<ContextType>;
  Tournament?: TournamentResolvers<ContextType>;
};

