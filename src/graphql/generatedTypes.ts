import { GraphQLResolveInfo } from 'graphql';
import { Context } from './context';
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

export type Category = {
  __typename?: 'Category';
  id: Scalars['Int'];
  name: Scalars['String'];
};

export type Image = {
  __typename?: 'Image';
  id: Scalars['Int'];
  url: Scalars['String'];
};

export type Link = {
  __typename?: 'Link';
  id: Scalars['Int'];
  isInternal: Scalars['Boolean'];
  label: Scalars['String'];
  type: LinkType;
  url: Scalars['String'];
};

export type LinkType = {
  __typename?: 'LinkType';
  id: Scalars['Int'];
  name: Scalars['String'];
};

export type PortfolioItem = {
  __typename?: 'PortfolioItem';
  categories: Array<Category>;
  description: Scalars['String'];
  homeImage: Image;
  id: Scalars['Int'];
  images: Array<Image>;
  links: Array<Link>;
  name: Scalars['String'];
  primaryImage: Image;
  products: Array<Product>;
  projectId: Scalars['String'];
};

export type Product = {
  __typename?: 'Product';
  id: Scalars['Int'];
  name: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  categories: Array<Category>;
  images: Array<Image>;
  linkTypes: Array<LinkType>;
  links: Array<Link>;
  portfolioItems: Array<PortfolioItem>;
  products: Array<Product>;
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
  Category: ResolverTypeWrapper<Category>;
  Image: ResolverTypeWrapper<Image>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Link: ResolverTypeWrapper<Link>;
  LinkType: ResolverTypeWrapper<LinkType>;
  PortfolioItem: ResolverTypeWrapper<PortfolioItem>;
  Product: ResolverTypeWrapper<Product>;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Boolean: Scalars['Boolean'];
  Category: Category;
  Image: Image;
  Int: Scalars['Int'];
  Link: Link;
  LinkType: LinkType;
  PortfolioItem: PortfolioItem;
  Product: Product;
  Query: {};
  String: Scalars['String'];
}>;

export type CategoryResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Category'] = ResolversParentTypes['Category']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ImageResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Image'] = ResolversParentTypes['Image']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type LinkResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Link'] = ResolversParentTypes['Link']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  isInternal?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  label?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['LinkType'], ParentType, ContextType>;
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type LinkTypeResolvers<ContextType = Context, ParentType extends ResolversParentTypes['LinkType'] = ResolversParentTypes['LinkType']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PortfolioItemResolvers<ContextType = Context, ParentType extends ResolversParentTypes['PortfolioItem'] = ResolversParentTypes['PortfolioItem']> = ResolversObject<{
  categories?: Resolver<Array<ResolversTypes['Category']>, ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  homeImage?: Resolver<ResolversTypes['Image'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  images?: Resolver<Array<ResolversTypes['Image']>, ParentType, ContextType>;
  links?: Resolver<Array<ResolversTypes['Link']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  primaryImage?: Resolver<ResolversTypes['Image'], ParentType, ContextType>;
  products?: Resolver<Array<ResolversTypes['Product']>, ParentType, ContextType>;
  projectId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ProductResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Product'] = ResolversParentTypes['Product']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type QueryResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  categories?: Resolver<Array<ResolversTypes['Category']>, ParentType, ContextType>;
  images?: Resolver<Array<ResolversTypes['Image']>, ParentType, ContextType>;
  linkTypes?: Resolver<Array<ResolversTypes['LinkType']>, ParentType, ContextType>;
  links?: Resolver<Array<ResolversTypes['Link']>, ParentType, ContextType>;
  portfolioItems?: Resolver<Array<ResolversTypes['PortfolioItem']>, ParentType, ContextType>;
  products?: Resolver<Array<ResolversTypes['Product']>, ParentType, ContextType>;
}>;

export type Resolvers<ContextType = Context> = ResolversObject<{
  Category?: CategoryResolvers<ContextType>;
  Image?: ImageResolvers<ContextType>;
  Link?: LinkResolvers<ContextType>;
  LinkType?: LinkTypeResolvers<ContextType>;
  PortfolioItem?: PortfolioItemResolvers<ContextType>;
  Product?: ProductResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
}>;

