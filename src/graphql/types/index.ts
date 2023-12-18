import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export enum CacheControlScope {
  Private = 'PRIVATE',
  Public = 'PUBLIC'
}

export type Film = {
  __typename?: 'Film';
  characters: Array<Maybe<Scalars['String']['output']>>;
  created: Scalars['String']['output'];
  director: Scalars['String']['output'];
  edited: Scalars['String']['output'];
  episode_id: Scalars['String']['output'];
  opening_crawl: Scalars['String']['output'];
  planets: Array<Maybe<Scalars['String']['output']>>;
  producer: Scalars['String']['output'];
  release_date: Scalars['String']['output'];
  species: Array<Maybe<Scalars['String']['output']>>;
  starships: Array<Maybe<Scalars['String']['output']>>;
  title: Scalars['String']['output'];
  url: Scalars['String']['output'];
  vehicles: Array<Maybe<Scalars['String']['output']>>;
};

export type FilmsCollection = {
  __typename?: 'FilmsCollection';
  items: Array<Maybe<Film>>;
  total: Scalars['Int']['output'];
};

export type Planet = {
  __typename?: 'Planet';
  climate: Scalars['String']['output'];
  created: Scalars['String']['output'];
  diameter: Scalars['String']['output'];
  edited: Scalars['String']['output'];
  films: Array<Scalars['String']['output']>;
  gravity: Scalars['String']['output'];
  name: Scalars['String']['output'];
  orbital_period: Scalars['String']['output'];
  population: Scalars['String']['output'];
  residents: Array<Scalars['String']['output']>;
  rotation_period: Scalars['String']['output'];
  surface_water: Scalars['String']['output'];
  terrain: Scalars['String']['output'];
  url: Scalars['String']['output'];
};

export type PlanetsCollection = {
  __typename?: 'PlanetsCollection';
  items: Array<Maybe<Planet>>;
  total: Scalars['Int']['output'];
};

export type Query = {
  __typename?: 'Query';
  /** Returns all films. */
  getFilms?: Maybe<FilmsCollection>;
  /** Returns all planets. */
  getPlanets?: Maybe<PlanetsCollection>;
  /** Returns all species. */
  getSpecies?: Maybe<SpeciesCollection>;
  /** Returns all starships. */
  getStarships?: Maybe<StarshipsCollection>;
  /** Returns all vehicles. */
  getVehicles?: Maybe<VehiclesCollection>;
};


export type QueryGetFilmsArgs = {
  filter?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryGetPlanetsArgs = {
  filter?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryGetSpeciesArgs = {
  filter?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryGetStarshipsArgs = {
  filter?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryGetVehiclesArgs = {
  filter?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
};

export type Specie = {
  __typename?: 'Specie';
  average_height: Scalars['String']['output'];
  classification: Scalars['String']['output'];
  created: Scalars['String']['output'];
  designation: Scalars['String']['output'];
  edited: Scalars['String']['output'];
  eye_colors: Scalars['String']['output'];
  films: Array<Maybe<Scalars['String']['output']>>;
  hair_colors: Scalars['String']['output'];
  homeworld?: Maybe<Scalars['String']['output']>;
  language: Scalars['String']['output'];
  name: Scalars['String']['output'];
  people: Array<Maybe<Scalars['String']['output']>>;
  skin_colors: Scalars['String']['output'];
  url: Scalars['String']['output'];
};

export type SpeciesCollection = {
  __typename?: 'SpeciesCollection';
  items: Array<Maybe<Specie>>;
  total: Scalars['Int']['output'];
};

export type Starship = {
  __typename?: 'Starship';
  MGLT: Scalars['String']['output'];
  cargo_capacity: Scalars['String']['output'];
  consumables?: Maybe<Scalars['String']['output']>;
  cost_in_credits: Scalars['String']['output'];
  created: Scalars['String']['output'];
  crew: Scalars['String']['output'];
  edited: Scalars['String']['output'];
  films: Array<Scalars['String']['output']>;
  hyperdrive_rating: Scalars['String']['output'];
  length: Scalars['String']['output'];
  manufacturer: Scalars['String']['output'];
  max_atmosphering_speed: Scalars['String']['output'];
  model: Scalars['String']['output'];
  name: Scalars['String']['output'];
  passengers: Scalars['String']['output'];
  pilots: Array<Scalars['String']['output']>;
  starship_class: Scalars['String']['output'];
  url: Scalars['String']['output'];
};

export type StarshipsCollection = {
  __typename?: 'StarshipsCollection';
  items: Array<Maybe<Starship>>;
  total: Scalars['Int']['output'];
};

export type Vehicle = {
  __typename?: 'Vehicle';
  cargo_capacity: Scalars['String']['output'];
  consumables?: Maybe<Scalars['String']['output']>;
  cost_in_credits: Scalars['String']['output'];
  created: Scalars['String']['output'];
  crew: Scalars['String']['output'];
  edited: Scalars['String']['output'];
  films: Array<Scalars['String']['output']>;
  length: Scalars['String']['output'];
  manufacturer: Scalars['String']['output'];
  max_atmosphering_speed: Scalars['String']['output'];
  model: Scalars['String']['output'];
  name: Scalars['String']['output'];
  passengers: Scalars['String']['output'];
  pilots: Array<Scalars['String']['output']>;
  url: Scalars['String']['output'];
  vehicle_class: Scalars['String']['output'];
};

export type VehiclesCollection = {
  __typename?: 'VehiclesCollection';
  items: Array<Maybe<Vehicle>>;
  total: Scalars['Int']['output'];
};



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
export type ResolversTypes = {
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  CacheControlScope: CacheControlScope;
  Film: ResolverTypeWrapper<Film>;
  FilmsCollection: ResolverTypeWrapper<FilmsCollection>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Planet: ResolverTypeWrapper<Planet>;
  PlanetsCollection: ResolverTypeWrapper<PlanetsCollection>;
  Query: ResolverTypeWrapper<{}>;
  Specie: ResolverTypeWrapper<Specie>;
  SpeciesCollection: ResolverTypeWrapper<SpeciesCollection>;
  Starship: ResolverTypeWrapper<Starship>;
  StarshipsCollection: ResolverTypeWrapper<StarshipsCollection>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  Vehicle: ResolverTypeWrapper<Vehicle>;
  VehiclesCollection: ResolverTypeWrapper<VehiclesCollection>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean']['output'];
  Film: Film;
  FilmsCollection: FilmsCollection;
  Int: Scalars['Int']['output'];
  Planet: Planet;
  PlanetsCollection: PlanetsCollection;
  Query: {};
  Specie: Specie;
  SpeciesCollection: SpeciesCollection;
  Starship: Starship;
  StarshipsCollection: StarshipsCollection;
  String: Scalars['String']['output'];
  Vehicle: Vehicle;
  VehiclesCollection: VehiclesCollection;
};

export type CacheControlDirectiveArgs = {
  inheritMaxAge?: Maybe<Scalars['Boolean']['input']>;
  maxAge?: Maybe<Scalars['Int']['input']>;
  scope?: Maybe<CacheControlScope>;
};

export type CacheControlDirectiveResolver<Result, Parent, ContextType = any, Args = CacheControlDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type FilmResolvers<ContextType = any, ParentType extends ResolversParentTypes['Film'] = ResolversParentTypes['Film']> = {
  characters?: Resolver<Array<Maybe<ResolversTypes['String']>>, ParentType, ContextType>;
  created?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  director?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  edited?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  episode_id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  opening_crawl?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  planets?: Resolver<Array<Maybe<ResolversTypes['String']>>, ParentType, ContextType>;
  producer?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  release_date?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  species?: Resolver<Array<Maybe<ResolversTypes['String']>>, ParentType, ContextType>;
  starships?: Resolver<Array<Maybe<ResolversTypes['String']>>, ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  vehicles?: Resolver<Array<Maybe<ResolversTypes['String']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FilmsCollectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['FilmsCollection'] = ResolversParentTypes['FilmsCollection']> = {
  items?: Resolver<Array<Maybe<ResolversTypes['Film']>>, ParentType, ContextType>;
  total?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PlanetResolvers<ContextType = any, ParentType extends ResolversParentTypes['Planet'] = ResolversParentTypes['Planet']> = {
  climate?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  created?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  diameter?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  edited?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  films?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  gravity?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  orbital_period?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  population?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  residents?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  rotation_period?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  surface_water?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  terrain?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PlanetsCollectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['PlanetsCollection'] = ResolversParentTypes['PlanetsCollection']> = {
  items?: Resolver<Array<Maybe<ResolversTypes['Planet']>>, ParentType, ContextType>;
  total?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  getFilms?: Resolver<Maybe<ResolversTypes['FilmsCollection']>, ParentType, ContextType, Partial<QueryGetFilmsArgs>>;
  getPlanets?: Resolver<Maybe<ResolversTypes['PlanetsCollection']>, ParentType, ContextType, Partial<QueryGetPlanetsArgs>>;
  getSpecies?: Resolver<Maybe<ResolversTypes['SpeciesCollection']>, ParentType, ContextType, Partial<QueryGetSpeciesArgs>>;
  getStarships?: Resolver<Maybe<ResolversTypes['StarshipsCollection']>, ParentType, ContextType, Partial<QueryGetStarshipsArgs>>;
  getVehicles?: Resolver<Maybe<ResolversTypes['VehiclesCollection']>, ParentType, ContextType, Partial<QueryGetVehiclesArgs>>;
};

export type SpecieResolvers<ContextType = any, ParentType extends ResolversParentTypes['Specie'] = ResolversParentTypes['Specie']> = {
  average_height?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  classification?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  created?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  designation?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  edited?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  eye_colors?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  films?: Resolver<Array<Maybe<ResolversTypes['String']>>, ParentType, ContextType>;
  hair_colors?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  homeworld?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  language?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  people?: Resolver<Array<Maybe<ResolversTypes['String']>>, ParentType, ContextType>;
  skin_colors?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SpeciesCollectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['SpeciesCollection'] = ResolversParentTypes['SpeciesCollection']> = {
  items?: Resolver<Array<Maybe<ResolversTypes['Specie']>>, ParentType, ContextType>;
  total?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type StarshipResolvers<ContextType = any, ParentType extends ResolversParentTypes['Starship'] = ResolversParentTypes['Starship']> = {
  MGLT?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  cargo_capacity?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  consumables?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  cost_in_credits?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  created?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  crew?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  edited?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  films?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  hyperdrive_rating?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  length?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  manufacturer?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  max_atmosphering_speed?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  model?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  passengers?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  pilots?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  starship_class?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type StarshipsCollectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['StarshipsCollection'] = ResolversParentTypes['StarshipsCollection']> = {
  items?: Resolver<Array<Maybe<ResolversTypes['Starship']>>, ParentType, ContextType>;
  total?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type VehicleResolvers<ContextType = any, ParentType extends ResolversParentTypes['Vehicle'] = ResolversParentTypes['Vehicle']> = {
  cargo_capacity?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  consumables?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  cost_in_credits?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  created?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  crew?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  edited?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  films?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  length?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  manufacturer?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  max_atmosphering_speed?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  model?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  passengers?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  pilots?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  vehicle_class?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type VehiclesCollectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['VehiclesCollection'] = ResolversParentTypes['VehiclesCollection']> = {
  items?: Resolver<Array<Maybe<ResolversTypes['Vehicle']>>, ParentType, ContextType>;
  total?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Film?: FilmResolvers<ContextType>;
  FilmsCollection?: FilmsCollectionResolvers<ContextType>;
  Planet?: PlanetResolvers<ContextType>;
  PlanetsCollection?: PlanetsCollectionResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Specie?: SpecieResolvers<ContextType>;
  SpeciesCollection?: SpeciesCollectionResolvers<ContextType>;
  Starship?: StarshipResolvers<ContextType>;
  StarshipsCollection?: StarshipsCollectionResolvers<ContextType>;
  Vehicle?: VehicleResolvers<ContextType>;
  VehiclesCollection?: VehiclesCollectionResolvers<ContextType>;
};

export type DirectiveResolvers<ContextType = any> = {
  cacheControl?: CacheControlDirectiveResolver<any, any, ContextType>;
};
