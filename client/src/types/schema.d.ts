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

export type DataItem = {
  __typename?: 'DataItem';
  category?: Maybe<Scalars['String']>;
  delivery?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  setup?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};

export type DataItemSubscriptions = {
  __typename?: 'DataItemSubscriptions';
  dataItem?: Maybe<DataItem>;
};


export type DataItemSubscriptionsDataItemArgs = {
  itemId: Scalars['Int'];
};

export type DataItemsQuery = {
  __typename?: 'DataItemsQuery';
  dataItem?: Maybe<DataItem>;
};


export type DataItemsQueryDataItemArgs = {
  itemId: Scalars['Int'];
};
