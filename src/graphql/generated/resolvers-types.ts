import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type PortfolioItemLinkType = {
  __typename?: 'PortfolioItemLinkType';
  id: Scalars['Int'];
  isInternal?: Maybe<Scalars['Boolean']>;
  label: Scalars['String'];
  url: Scalars['String'];
};

export type PortfolioItemType = {
  __typename?: 'PortfolioItemType';
  categories: Array<Maybe<Scalars['String']>>;
  description: Scalars['String'];
  githubLinks?: Maybe<Array<Maybe<PortfolioItemLinkType>>>;
  homeImage: Scalars['String'];
  id: Scalars['Int'];
  images: Array<Maybe<Scalars['String']>>;
  name?: Maybe<Scalars['String']>;
  primaryImage: Scalars['String'];
  productLinks?: Maybe<Array<Maybe<PortfolioItemLinkType>>>;
  products: Array<Maybe<Scalars['String']>>;
  projectId: Scalars['String'];
  rowColor?: Maybe<Scalars['String']>;
  textColor?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  portfolioItemLinks: Array<Maybe<PortfolioItemLinkType>>;
  portfolioItems: Array<Maybe<PortfolioItemType>>;
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

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

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  PortfolioItemLinkType: ResolverTypeWrapper<PortfolioItemLinkType>;
  PortfolioItemType: ResolverTypeWrapper<PortfolioItemType>;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Boolean: Scalars['Boolean'];
  Int: Scalars['Int'];
  PortfolioItemLinkType: PortfolioItemLinkType;
  PortfolioItemType: PortfolioItemType;
  Query: {};
  String: Scalars['String'];
}>;

export type PortfolioItemLinkTypeResolvers<ContextType = any, ParentType extends ResolversParentTypes['PortfolioItemLinkType'] = ResolversParentTypes['PortfolioItemLinkType']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  isInternal?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  label?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PortfolioItemTypeResolvers<ContextType = any, ParentType extends ResolversParentTypes['PortfolioItemType'] = ResolversParentTypes['PortfolioItemType']> = ResolversObject<{
  categories?: Resolver<Array<Maybe<ResolversTypes['String']>>, ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  githubLinks?: Resolver<Maybe<Array<Maybe<ResolversTypes['PortfolioItemLinkType']>>>, ParentType, ContextType>;
  homeImage?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  images?: Resolver<Array<Maybe<ResolversTypes['String']>>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  primaryImage?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  productLinks?: Resolver<Maybe<Array<Maybe<ResolversTypes['PortfolioItemLinkType']>>>, ParentType, ContextType>;
  products?: Resolver<Array<Maybe<ResolversTypes['String']>>, ParentType, ContextType>;
  projectId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  rowColor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  textColor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  portfolioItemLinks?: Resolver<Array<Maybe<ResolversTypes['PortfolioItemLinkType']>>, ParentType, ContextType>;
  portfolioItems?: Resolver<Array<Maybe<ResolversTypes['PortfolioItemType']>>, ParentType, ContextType>;
}>;

export type Resolvers<ContextType = any> = ResolversObject<{
  PortfolioItemLinkType?: PortfolioItemLinkTypeResolvers<ContextType>;
  PortfolioItemType?: PortfolioItemTypeResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
}>;

