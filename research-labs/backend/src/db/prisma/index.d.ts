
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model conferences
 * 
 */
export type conferences = $Result.DefaultSelection<Prisma.$conferencesPayload>
/**
 * Model groups
 * This table contains check constraints and requires additional setup for migrations. Visit https://pris.ly/d/check-constraints for more info.
 */
export type groups = $Result.DefaultSelection<Prisma.$groupsPayload>
/**
 * Model links
 * This table contains check constraints and requires additional setup for migrations. Visit https://pris.ly/d/check-constraints for more info.
 */
export type links = $Result.DefaultSelection<Prisma.$linksPayload>
/**
 * Model messages
 * This table contains check constraints and requires additional setup for migrations. Visit https://pris.ly/d/check-constraints for more info.
 */
export type messages = $Result.DefaultSelection<Prisma.$messagesPayload>
/**
 * Model notifications
 * 
 */
export type notifications = $Result.DefaultSelection<Prisma.$notificationsPayload>
/**
 * Model publication_files
 * 
 */
export type publication_files = $Result.DefaultSelection<Prisma.$publication_filesPayload>
/**
 * Model publications
 * This table contains check constraints and requires additional setup for migrations. Visit https://pris.ly/d/check-constraints for more info.
 */
export type publications = $Result.DefaultSelection<Prisma.$publicationsPayload>
/**
 * Model speaker
 * 
 */
export type speaker = $Result.DefaultSelection<Prisma.$speakerPayload>
/**
 * Model users
 * This table contains check constraints and requires additional setup for migrations. Visit https://pris.ly/d/check-constraints for more info.
 */
export type users = $Result.DefaultSelection<Prisma.$usersPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Conferences
 * const conferences = await prisma.conferences.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Conferences
   * const conferences = await prisma.conferences.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.conferences`: Exposes CRUD operations for the **conferences** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Conferences
    * const conferences = await prisma.conferences.findMany()
    * ```
    */
  get conferences(): Prisma.conferencesDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.groups`: Exposes CRUD operations for the **groups** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Groups
    * const groups = await prisma.groups.findMany()
    * ```
    */
  get groups(): Prisma.groupsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.links`: Exposes CRUD operations for the **links** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Links
    * const links = await prisma.links.findMany()
    * ```
    */
  get links(): Prisma.linksDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.messages`: Exposes CRUD operations for the **messages** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Messages
    * const messages = await prisma.messages.findMany()
    * ```
    */
  get messages(): Prisma.messagesDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.notifications`: Exposes CRUD operations for the **notifications** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Notifications
    * const notifications = await prisma.notifications.findMany()
    * ```
    */
  get notifications(): Prisma.notificationsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.publication_files`: Exposes CRUD operations for the **publication_files** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Publication_files
    * const publication_files = await prisma.publication_files.findMany()
    * ```
    */
  get publication_files(): Prisma.publication_filesDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.publications`: Exposes CRUD operations for the **publications** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Publications
    * const publications = await prisma.publications.findMany()
    * ```
    */
  get publications(): Prisma.publicationsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.speaker`: Exposes CRUD operations for the **speaker** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Speakers
    * const speakers = await prisma.speaker.findMany()
    * ```
    */
  get speaker(): Prisma.speakerDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.users`: Exposes CRUD operations for the **users** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.users.findMany()
    * ```
    */
  get users(): Prisma.usersDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.7.0
   * Query Engine version: 3cff47a7f5d65c3ea74883f1d736e41d68ce91ed
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    conferences: 'conferences',
    groups: 'groups',
    links: 'links',
    messages: 'messages',
    notifications: 'notifications',
    publication_files: 'publication_files',
    publications: 'publications',
    speaker: 'speaker',
    users: 'users'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "conferences" | "groups" | "links" | "messages" | "notifications" | "publication_files" | "publications" | "speaker" | "users"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      conferences: {
        payload: Prisma.$conferencesPayload<ExtArgs>
        fields: Prisma.conferencesFieldRefs
        operations: {
          findUnique: {
            args: Prisma.conferencesFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$conferencesPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.conferencesFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$conferencesPayload>
          }
          findFirst: {
            args: Prisma.conferencesFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$conferencesPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.conferencesFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$conferencesPayload>
          }
          findMany: {
            args: Prisma.conferencesFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$conferencesPayload>[]
          }
          create: {
            args: Prisma.conferencesCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$conferencesPayload>
          }
          createMany: {
            args: Prisma.conferencesCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.conferencesCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$conferencesPayload>[]
          }
          delete: {
            args: Prisma.conferencesDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$conferencesPayload>
          }
          update: {
            args: Prisma.conferencesUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$conferencesPayload>
          }
          deleteMany: {
            args: Prisma.conferencesDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.conferencesUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.conferencesUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$conferencesPayload>[]
          }
          upsert: {
            args: Prisma.conferencesUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$conferencesPayload>
          }
          aggregate: {
            args: Prisma.ConferencesAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateConferences>
          }
          groupBy: {
            args: Prisma.conferencesGroupByArgs<ExtArgs>
            result: $Utils.Optional<ConferencesGroupByOutputType>[]
          }
          count: {
            args: Prisma.conferencesCountArgs<ExtArgs>
            result: $Utils.Optional<ConferencesCountAggregateOutputType> | number
          }
        }
      }
      groups: {
        payload: Prisma.$groupsPayload<ExtArgs>
        fields: Prisma.groupsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.groupsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$groupsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.groupsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$groupsPayload>
          }
          findFirst: {
            args: Prisma.groupsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$groupsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.groupsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$groupsPayload>
          }
          findMany: {
            args: Prisma.groupsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$groupsPayload>[]
          }
          create: {
            args: Prisma.groupsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$groupsPayload>
          }
          createMany: {
            args: Prisma.groupsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.groupsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$groupsPayload>[]
          }
          delete: {
            args: Prisma.groupsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$groupsPayload>
          }
          update: {
            args: Prisma.groupsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$groupsPayload>
          }
          deleteMany: {
            args: Prisma.groupsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.groupsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.groupsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$groupsPayload>[]
          }
          upsert: {
            args: Prisma.groupsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$groupsPayload>
          }
          aggregate: {
            args: Prisma.GroupsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateGroups>
          }
          groupBy: {
            args: Prisma.groupsGroupByArgs<ExtArgs>
            result: $Utils.Optional<GroupsGroupByOutputType>[]
          }
          count: {
            args: Prisma.groupsCountArgs<ExtArgs>
            result: $Utils.Optional<GroupsCountAggregateOutputType> | number
          }
        }
      }
      links: {
        payload: Prisma.$linksPayload<ExtArgs>
        fields: Prisma.linksFieldRefs
        operations: {
          findUnique: {
            args: Prisma.linksFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$linksPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.linksFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$linksPayload>
          }
          findFirst: {
            args: Prisma.linksFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$linksPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.linksFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$linksPayload>
          }
          findMany: {
            args: Prisma.linksFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$linksPayload>[]
          }
          create: {
            args: Prisma.linksCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$linksPayload>
          }
          createMany: {
            args: Prisma.linksCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.linksCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$linksPayload>[]
          }
          delete: {
            args: Prisma.linksDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$linksPayload>
          }
          update: {
            args: Prisma.linksUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$linksPayload>
          }
          deleteMany: {
            args: Prisma.linksDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.linksUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.linksUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$linksPayload>[]
          }
          upsert: {
            args: Prisma.linksUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$linksPayload>
          }
          aggregate: {
            args: Prisma.LinksAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateLinks>
          }
          groupBy: {
            args: Prisma.linksGroupByArgs<ExtArgs>
            result: $Utils.Optional<LinksGroupByOutputType>[]
          }
          count: {
            args: Prisma.linksCountArgs<ExtArgs>
            result: $Utils.Optional<LinksCountAggregateOutputType> | number
          }
        }
      }
      messages: {
        payload: Prisma.$messagesPayload<ExtArgs>
        fields: Prisma.messagesFieldRefs
        operations: {
          findUnique: {
            args: Prisma.messagesFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$messagesPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.messagesFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$messagesPayload>
          }
          findFirst: {
            args: Prisma.messagesFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$messagesPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.messagesFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$messagesPayload>
          }
          findMany: {
            args: Prisma.messagesFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$messagesPayload>[]
          }
          create: {
            args: Prisma.messagesCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$messagesPayload>
          }
          createMany: {
            args: Prisma.messagesCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.messagesCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$messagesPayload>[]
          }
          delete: {
            args: Prisma.messagesDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$messagesPayload>
          }
          update: {
            args: Prisma.messagesUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$messagesPayload>
          }
          deleteMany: {
            args: Prisma.messagesDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.messagesUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.messagesUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$messagesPayload>[]
          }
          upsert: {
            args: Prisma.messagesUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$messagesPayload>
          }
          aggregate: {
            args: Prisma.MessagesAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMessages>
          }
          groupBy: {
            args: Prisma.messagesGroupByArgs<ExtArgs>
            result: $Utils.Optional<MessagesGroupByOutputType>[]
          }
          count: {
            args: Prisma.messagesCountArgs<ExtArgs>
            result: $Utils.Optional<MessagesCountAggregateOutputType> | number
          }
        }
      }
      notifications: {
        payload: Prisma.$notificationsPayload<ExtArgs>
        fields: Prisma.notificationsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.notificationsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$notificationsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.notificationsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$notificationsPayload>
          }
          findFirst: {
            args: Prisma.notificationsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$notificationsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.notificationsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$notificationsPayload>
          }
          findMany: {
            args: Prisma.notificationsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$notificationsPayload>[]
          }
          create: {
            args: Prisma.notificationsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$notificationsPayload>
          }
          createMany: {
            args: Prisma.notificationsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.notificationsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$notificationsPayload>[]
          }
          delete: {
            args: Prisma.notificationsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$notificationsPayload>
          }
          update: {
            args: Prisma.notificationsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$notificationsPayload>
          }
          deleteMany: {
            args: Prisma.notificationsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.notificationsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.notificationsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$notificationsPayload>[]
          }
          upsert: {
            args: Prisma.notificationsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$notificationsPayload>
          }
          aggregate: {
            args: Prisma.NotificationsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateNotifications>
          }
          groupBy: {
            args: Prisma.notificationsGroupByArgs<ExtArgs>
            result: $Utils.Optional<NotificationsGroupByOutputType>[]
          }
          count: {
            args: Prisma.notificationsCountArgs<ExtArgs>
            result: $Utils.Optional<NotificationsCountAggregateOutputType> | number
          }
        }
      }
      publication_files: {
        payload: Prisma.$publication_filesPayload<ExtArgs>
        fields: Prisma.publication_filesFieldRefs
        operations: {
          findUnique: {
            args: Prisma.publication_filesFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$publication_filesPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.publication_filesFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$publication_filesPayload>
          }
          findFirst: {
            args: Prisma.publication_filesFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$publication_filesPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.publication_filesFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$publication_filesPayload>
          }
          findMany: {
            args: Prisma.publication_filesFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$publication_filesPayload>[]
          }
          create: {
            args: Prisma.publication_filesCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$publication_filesPayload>
          }
          createMany: {
            args: Prisma.publication_filesCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.publication_filesCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$publication_filesPayload>[]
          }
          delete: {
            args: Prisma.publication_filesDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$publication_filesPayload>
          }
          update: {
            args: Prisma.publication_filesUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$publication_filesPayload>
          }
          deleteMany: {
            args: Prisma.publication_filesDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.publication_filesUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.publication_filesUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$publication_filesPayload>[]
          }
          upsert: {
            args: Prisma.publication_filesUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$publication_filesPayload>
          }
          aggregate: {
            args: Prisma.Publication_filesAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePublication_files>
          }
          groupBy: {
            args: Prisma.publication_filesGroupByArgs<ExtArgs>
            result: $Utils.Optional<Publication_filesGroupByOutputType>[]
          }
          count: {
            args: Prisma.publication_filesCountArgs<ExtArgs>
            result: $Utils.Optional<Publication_filesCountAggregateOutputType> | number
          }
        }
      }
      publications: {
        payload: Prisma.$publicationsPayload<ExtArgs>
        fields: Prisma.publicationsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.publicationsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$publicationsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.publicationsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$publicationsPayload>
          }
          findFirst: {
            args: Prisma.publicationsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$publicationsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.publicationsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$publicationsPayload>
          }
          findMany: {
            args: Prisma.publicationsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$publicationsPayload>[]
          }
          create: {
            args: Prisma.publicationsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$publicationsPayload>
          }
          createMany: {
            args: Prisma.publicationsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.publicationsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$publicationsPayload>[]
          }
          delete: {
            args: Prisma.publicationsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$publicationsPayload>
          }
          update: {
            args: Prisma.publicationsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$publicationsPayload>
          }
          deleteMany: {
            args: Prisma.publicationsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.publicationsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.publicationsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$publicationsPayload>[]
          }
          upsert: {
            args: Prisma.publicationsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$publicationsPayload>
          }
          aggregate: {
            args: Prisma.PublicationsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePublications>
          }
          groupBy: {
            args: Prisma.publicationsGroupByArgs<ExtArgs>
            result: $Utils.Optional<PublicationsGroupByOutputType>[]
          }
          count: {
            args: Prisma.publicationsCountArgs<ExtArgs>
            result: $Utils.Optional<PublicationsCountAggregateOutputType> | number
          }
        }
      }
      speaker: {
        payload: Prisma.$speakerPayload<ExtArgs>
        fields: Prisma.speakerFieldRefs
        operations: {
          findUnique: {
            args: Prisma.speakerFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$speakerPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.speakerFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$speakerPayload>
          }
          findFirst: {
            args: Prisma.speakerFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$speakerPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.speakerFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$speakerPayload>
          }
          findMany: {
            args: Prisma.speakerFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$speakerPayload>[]
          }
          create: {
            args: Prisma.speakerCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$speakerPayload>
          }
          createMany: {
            args: Prisma.speakerCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.speakerCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$speakerPayload>[]
          }
          delete: {
            args: Prisma.speakerDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$speakerPayload>
          }
          update: {
            args: Prisma.speakerUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$speakerPayload>
          }
          deleteMany: {
            args: Prisma.speakerDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.speakerUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.speakerUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$speakerPayload>[]
          }
          upsert: {
            args: Prisma.speakerUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$speakerPayload>
          }
          aggregate: {
            args: Prisma.SpeakerAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSpeaker>
          }
          groupBy: {
            args: Prisma.speakerGroupByArgs<ExtArgs>
            result: $Utils.Optional<SpeakerGroupByOutputType>[]
          }
          count: {
            args: Prisma.speakerCountArgs<ExtArgs>
            result: $Utils.Optional<SpeakerCountAggregateOutputType> | number
          }
        }
      }
      users: {
        payload: Prisma.$usersPayload<ExtArgs>
        fields: Prisma.usersFieldRefs
        operations: {
          findUnique: {
            args: Prisma.usersFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.usersFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          findFirst: {
            args: Prisma.usersFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.usersFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          findMany: {
            args: Prisma.usersFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>[]
          }
          create: {
            args: Prisma.usersCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          createMany: {
            args: Prisma.usersCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.usersCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>[]
          }
          delete: {
            args: Prisma.usersDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          update: {
            args: Prisma.usersUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          deleteMany: {
            args: Prisma.usersDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.usersUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.usersUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>[]
          }
          upsert: {
            args: Prisma.usersUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          aggregate: {
            args: Prisma.UsersAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUsers>
          }
          groupBy: {
            args: Prisma.usersGroupByArgs<ExtArgs>
            result: $Utils.Optional<UsersGroupByOutputType>[]
          }
          count: {
            args: Prisma.usersCountArgs<ExtArgs>
            result: $Utils.Optional<UsersCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    conferences?: conferencesOmit
    groups?: groupsOmit
    links?: linksOmit
    messages?: messagesOmit
    notifications?: notificationsOmit
    publication_files?: publication_filesOmit
    publications?: publicationsOmit
    speaker?: speakerOmit
    users?: usersOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type ConferencesCountOutputType
   */

  export type ConferencesCountOutputType = {
    publications: number
    speaker: number
  }

  export type ConferencesCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    publications?: boolean | ConferencesCountOutputTypeCountPublicationsArgs
    speaker?: boolean | ConferencesCountOutputTypeCountSpeakerArgs
  }

  // Custom InputTypes
  /**
   * ConferencesCountOutputType without action
   */
  export type ConferencesCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConferencesCountOutputType
     */
    select?: ConferencesCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ConferencesCountOutputType without action
   */
  export type ConferencesCountOutputTypeCountPublicationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: publicationsWhereInput
  }

  /**
   * ConferencesCountOutputType without action
   */
  export type ConferencesCountOutputTypeCountSpeakerArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: speakerWhereInput
  }


  /**
   * Count Type PublicationsCountOutputType
   */

  export type PublicationsCountOutputType = {
    groups: number
    publication_files: number
  }

  export type PublicationsCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    groups?: boolean | PublicationsCountOutputTypeCountGroupsArgs
    publication_files?: boolean | PublicationsCountOutputTypeCountPublication_filesArgs
  }

  // Custom InputTypes
  /**
   * PublicationsCountOutputType without action
   */
  export type PublicationsCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PublicationsCountOutputType
     */
    select?: PublicationsCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PublicationsCountOutputType without action
   */
  export type PublicationsCountOutputTypeCountGroupsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: groupsWhereInput
  }

  /**
   * PublicationsCountOutputType without action
   */
  export type PublicationsCountOutputTypeCountPublication_filesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: publication_filesWhereInput
  }


  /**
   * Count Type UsersCountOutputType
   */

  export type UsersCountOutputType = {
    groups: number
    links: number
    messages_messages_receiver_idTousers: number
    messages_messages_sender_idTousers: number
    notifications: number
    publications: number
    speaker: number
  }

  export type UsersCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    groups?: boolean | UsersCountOutputTypeCountGroupsArgs
    links?: boolean | UsersCountOutputTypeCountLinksArgs
    messages_messages_receiver_idTousers?: boolean | UsersCountOutputTypeCountMessages_messages_receiver_idTousersArgs
    messages_messages_sender_idTousers?: boolean | UsersCountOutputTypeCountMessages_messages_sender_idTousersArgs
    notifications?: boolean | UsersCountOutputTypeCountNotificationsArgs
    publications?: boolean | UsersCountOutputTypeCountPublicationsArgs
    speaker?: boolean | UsersCountOutputTypeCountSpeakerArgs
  }

  // Custom InputTypes
  /**
   * UsersCountOutputType without action
   */
  export type UsersCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsersCountOutputType
     */
    select?: UsersCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UsersCountOutputType without action
   */
  export type UsersCountOutputTypeCountGroupsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: groupsWhereInput
  }

  /**
   * UsersCountOutputType without action
   */
  export type UsersCountOutputTypeCountLinksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: linksWhereInput
  }

  /**
   * UsersCountOutputType without action
   */
  export type UsersCountOutputTypeCountMessages_messages_receiver_idTousersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: messagesWhereInput
  }

  /**
   * UsersCountOutputType without action
   */
  export type UsersCountOutputTypeCountMessages_messages_sender_idTousersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: messagesWhereInput
  }

  /**
   * UsersCountOutputType without action
   */
  export type UsersCountOutputTypeCountNotificationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: notificationsWhereInput
  }

  /**
   * UsersCountOutputType without action
   */
  export type UsersCountOutputTypeCountPublicationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: publicationsWhereInput
  }

  /**
   * UsersCountOutputType without action
   */
  export type UsersCountOutputTypeCountSpeakerArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: speakerWhereInput
  }


  /**
   * Models
   */

  /**
   * Model conferences
   */

  export type AggregateConferences = {
    _count: ConferencesCountAggregateOutputType | null
    _min: ConferencesMinAggregateOutputType | null
    _max: ConferencesMaxAggregateOutputType | null
  }

  export type ConferencesMinAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    location: string | null
    start_date: Date | null
    end_date: Date | null
  }

  export type ConferencesMaxAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    location: string | null
    start_date: Date | null
    end_date: Date | null
  }

  export type ConferencesCountAggregateOutputType = {
    id: number
    name: number
    description: number
    location: number
    start_date: number
    end_date: number
    _all: number
  }


  export type ConferencesMinAggregateInputType = {
    id?: true
    name?: true
    description?: true
    location?: true
    start_date?: true
    end_date?: true
  }

  export type ConferencesMaxAggregateInputType = {
    id?: true
    name?: true
    description?: true
    location?: true
    start_date?: true
    end_date?: true
  }

  export type ConferencesCountAggregateInputType = {
    id?: true
    name?: true
    description?: true
    location?: true
    start_date?: true
    end_date?: true
    _all?: true
  }

  export type ConferencesAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which conferences to aggregate.
     */
    where?: conferencesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of conferences to fetch.
     */
    orderBy?: conferencesOrderByWithRelationInput | conferencesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: conferencesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` conferences from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` conferences.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned conferences
    **/
    _count?: true | ConferencesCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ConferencesMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ConferencesMaxAggregateInputType
  }

  export type GetConferencesAggregateType<T extends ConferencesAggregateArgs> = {
        [P in keyof T & keyof AggregateConferences]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateConferences[P]>
      : GetScalarType<T[P], AggregateConferences[P]>
  }




  export type conferencesGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: conferencesWhereInput
    orderBy?: conferencesOrderByWithAggregationInput | conferencesOrderByWithAggregationInput[]
    by: ConferencesScalarFieldEnum[] | ConferencesScalarFieldEnum
    having?: conferencesScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ConferencesCountAggregateInputType | true
    _min?: ConferencesMinAggregateInputType
    _max?: ConferencesMaxAggregateInputType
  }

  export type ConferencesGroupByOutputType = {
    id: string
    name: string
    description: string
    location: string
    start_date: Date
    end_date: Date
    _count: ConferencesCountAggregateOutputType | null
    _min: ConferencesMinAggregateOutputType | null
    _max: ConferencesMaxAggregateOutputType | null
  }

  type GetConferencesGroupByPayload<T extends conferencesGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ConferencesGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ConferencesGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ConferencesGroupByOutputType[P]>
            : GetScalarType<T[P], ConferencesGroupByOutputType[P]>
        }
      >
    >


  export type conferencesSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    location?: boolean
    start_date?: boolean
    end_date?: boolean
    publications?: boolean | conferences$publicationsArgs<ExtArgs>
    speaker?: boolean | conferences$speakerArgs<ExtArgs>
    _count?: boolean | ConferencesCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["conferences"]>

  export type conferencesSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    location?: boolean
    start_date?: boolean
    end_date?: boolean
  }, ExtArgs["result"]["conferences"]>

  export type conferencesSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    location?: boolean
    start_date?: boolean
    end_date?: boolean
  }, ExtArgs["result"]["conferences"]>

  export type conferencesSelectScalar = {
    id?: boolean
    name?: boolean
    description?: boolean
    location?: boolean
    start_date?: boolean
    end_date?: boolean
  }

  export type conferencesOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "description" | "location" | "start_date" | "end_date", ExtArgs["result"]["conferences"]>
  export type conferencesInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    publications?: boolean | conferences$publicationsArgs<ExtArgs>
    speaker?: boolean | conferences$speakerArgs<ExtArgs>
    _count?: boolean | ConferencesCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type conferencesIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type conferencesIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $conferencesPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "conferences"
    objects: {
      publications: Prisma.$publicationsPayload<ExtArgs>[]
      speaker: Prisma.$speakerPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      description: string
      location: string
      start_date: Date
      end_date: Date
    }, ExtArgs["result"]["conferences"]>
    composites: {}
  }

  type conferencesGetPayload<S extends boolean | null | undefined | conferencesDefaultArgs> = $Result.GetResult<Prisma.$conferencesPayload, S>

  type conferencesCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<conferencesFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ConferencesCountAggregateInputType | true
    }

  export interface conferencesDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['conferences'], meta: { name: 'conferences' } }
    /**
     * Find zero or one Conferences that matches the filter.
     * @param {conferencesFindUniqueArgs} args - Arguments to find a Conferences
     * @example
     * // Get one Conferences
     * const conferences = await prisma.conferences.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends conferencesFindUniqueArgs>(args: SelectSubset<T, conferencesFindUniqueArgs<ExtArgs>>): Prisma__conferencesClient<$Result.GetResult<Prisma.$conferencesPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Conferences that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {conferencesFindUniqueOrThrowArgs} args - Arguments to find a Conferences
     * @example
     * // Get one Conferences
     * const conferences = await prisma.conferences.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends conferencesFindUniqueOrThrowArgs>(args: SelectSubset<T, conferencesFindUniqueOrThrowArgs<ExtArgs>>): Prisma__conferencesClient<$Result.GetResult<Prisma.$conferencesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Conferences that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {conferencesFindFirstArgs} args - Arguments to find a Conferences
     * @example
     * // Get one Conferences
     * const conferences = await prisma.conferences.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends conferencesFindFirstArgs>(args?: SelectSubset<T, conferencesFindFirstArgs<ExtArgs>>): Prisma__conferencesClient<$Result.GetResult<Prisma.$conferencesPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Conferences that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {conferencesFindFirstOrThrowArgs} args - Arguments to find a Conferences
     * @example
     * // Get one Conferences
     * const conferences = await prisma.conferences.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends conferencesFindFirstOrThrowArgs>(args?: SelectSubset<T, conferencesFindFirstOrThrowArgs<ExtArgs>>): Prisma__conferencesClient<$Result.GetResult<Prisma.$conferencesPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Conferences that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {conferencesFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Conferences
     * const conferences = await prisma.conferences.findMany()
     * 
     * // Get first 10 Conferences
     * const conferences = await prisma.conferences.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const conferencesWithIdOnly = await prisma.conferences.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends conferencesFindManyArgs>(args?: SelectSubset<T, conferencesFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$conferencesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Conferences.
     * @param {conferencesCreateArgs} args - Arguments to create a Conferences.
     * @example
     * // Create one Conferences
     * const Conferences = await prisma.conferences.create({
     *   data: {
     *     // ... data to create a Conferences
     *   }
     * })
     * 
     */
    create<T extends conferencesCreateArgs>(args: SelectSubset<T, conferencesCreateArgs<ExtArgs>>): Prisma__conferencesClient<$Result.GetResult<Prisma.$conferencesPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Conferences.
     * @param {conferencesCreateManyArgs} args - Arguments to create many Conferences.
     * @example
     * // Create many Conferences
     * const conferences = await prisma.conferences.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends conferencesCreateManyArgs>(args?: SelectSubset<T, conferencesCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Conferences and returns the data saved in the database.
     * @param {conferencesCreateManyAndReturnArgs} args - Arguments to create many Conferences.
     * @example
     * // Create many Conferences
     * const conferences = await prisma.conferences.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Conferences and only return the `id`
     * const conferencesWithIdOnly = await prisma.conferences.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends conferencesCreateManyAndReturnArgs>(args?: SelectSubset<T, conferencesCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$conferencesPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Conferences.
     * @param {conferencesDeleteArgs} args - Arguments to delete one Conferences.
     * @example
     * // Delete one Conferences
     * const Conferences = await prisma.conferences.delete({
     *   where: {
     *     // ... filter to delete one Conferences
     *   }
     * })
     * 
     */
    delete<T extends conferencesDeleteArgs>(args: SelectSubset<T, conferencesDeleteArgs<ExtArgs>>): Prisma__conferencesClient<$Result.GetResult<Prisma.$conferencesPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Conferences.
     * @param {conferencesUpdateArgs} args - Arguments to update one Conferences.
     * @example
     * // Update one Conferences
     * const conferences = await prisma.conferences.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends conferencesUpdateArgs>(args: SelectSubset<T, conferencesUpdateArgs<ExtArgs>>): Prisma__conferencesClient<$Result.GetResult<Prisma.$conferencesPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Conferences.
     * @param {conferencesDeleteManyArgs} args - Arguments to filter Conferences to delete.
     * @example
     * // Delete a few Conferences
     * const { count } = await prisma.conferences.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends conferencesDeleteManyArgs>(args?: SelectSubset<T, conferencesDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Conferences.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {conferencesUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Conferences
     * const conferences = await prisma.conferences.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends conferencesUpdateManyArgs>(args: SelectSubset<T, conferencesUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Conferences and returns the data updated in the database.
     * @param {conferencesUpdateManyAndReturnArgs} args - Arguments to update many Conferences.
     * @example
     * // Update many Conferences
     * const conferences = await prisma.conferences.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Conferences and only return the `id`
     * const conferencesWithIdOnly = await prisma.conferences.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends conferencesUpdateManyAndReturnArgs>(args: SelectSubset<T, conferencesUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$conferencesPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Conferences.
     * @param {conferencesUpsertArgs} args - Arguments to update or create a Conferences.
     * @example
     * // Update or create a Conferences
     * const conferences = await prisma.conferences.upsert({
     *   create: {
     *     // ... data to create a Conferences
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Conferences we want to update
     *   }
     * })
     */
    upsert<T extends conferencesUpsertArgs>(args: SelectSubset<T, conferencesUpsertArgs<ExtArgs>>): Prisma__conferencesClient<$Result.GetResult<Prisma.$conferencesPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Conferences.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {conferencesCountArgs} args - Arguments to filter Conferences to count.
     * @example
     * // Count the number of Conferences
     * const count = await prisma.conferences.count({
     *   where: {
     *     // ... the filter for the Conferences we want to count
     *   }
     * })
    **/
    count<T extends conferencesCountArgs>(
      args?: Subset<T, conferencesCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ConferencesCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Conferences.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConferencesAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ConferencesAggregateArgs>(args: Subset<T, ConferencesAggregateArgs>): Prisma.PrismaPromise<GetConferencesAggregateType<T>>

    /**
     * Group by Conferences.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {conferencesGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends conferencesGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: conferencesGroupByArgs['orderBy'] }
        : { orderBy?: conferencesGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, conferencesGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetConferencesGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the conferences model
   */
  readonly fields: conferencesFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for conferences.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__conferencesClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    publications<T extends conferences$publicationsArgs<ExtArgs> = {}>(args?: Subset<T, conferences$publicationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$publicationsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    speaker<T extends conferences$speakerArgs<ExtArgs> = {}>(args?: Subset<T, conferences$speakerArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$speakerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the conferences model
   */
  interface conferencesFieldRefs {
    readonly id: FieldRef<"conferences", 'String'>
    readonly name: FieldRef<"conferences", 'String'>
    readonly description: FieldRef<"conferences", 'String'>
    readonly location: FieldRef<"conferences", 'String'>
    readonly start_date: FieldRef<"conferences", 'DateTime'>
    readonly end_date: FieldRef<"conferences", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * conferences findUnique
   */
  export type conferencesFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the conferences
     */
    select?: conferencesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the conferences
     */
    omit?: conferencesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: conferencesInclude<ExtArgs> | null
    /**
     * Filter, which conferences to fetch.
     */
    where: conferencesWhereUniqueInput
  }

  /**
   * conferences findUniqueOrThrow
   */
  export type conferencesFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the conferences
     */
    select?: conferencesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the conferences
     */
    omit?: conferencesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: conferencesInclude<ExtArgs> | null
    /**
     * Filter, which conferences to fetch.
     */
    where: conferencesWhereUniqueInput
  }

  /**
   * conferences findFirst
   */
  export type conferencesFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the conferences
     */
    select?: conferencesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the conferences
     */
    omit?: conferencesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: conferencesInclude<ExtArgs> | null
    /**
     * Filter, which conferences to fetch.
     */
    where?: conferencesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of conferences to fetch.
     */
    orderBy?: conferencesOrderByWithRelationInput | conferencesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for conferences.
     */
    cursor?: conferencesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` conferences from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` conferences.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of conferences.
     */
    distinct?: ConferencesScalarFieldEnum | ConferencesScalarFieldEnum[]
  }

  /**
   * conferences findFirstOrThrow
   */
  export type conferencesFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the conferences
     */
    select?: conferencesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the conferences
     */
    omit?: conferencesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: conferencesInclude<ExtArgs> | null
    /**
     * Filter, which conferences to fetch.
     */
    where?: conferencesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of conferences to fetch.
     */
    orderBy?: conferencesOrderByWithRelationInput | conferencesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for conferences.
     */
    cursor?: conferencesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` conferences from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` conferences.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of conferences.
     */
    distinct?: ConferencesScalarFieldEnum | ConferencesScalarFieldEnum[]
  }

  /**
   * conferences findMany
   */
  export type conferencesFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the conferences
     */
    select?: conferencesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the conferences
     */
    omit?: conferencesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: conferencesInclude<ExtArgs> | null
    /**
     * Filter, which conferences to fetch.
     */
    where?: conferencesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of conferences to fetch.
     */
    orderBy?: conferencesOrderByWithRelationInput | conferencesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing conferences.
     */
    cursor?: conferencesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` conferences from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` conferences.
     */
    skip?: number
    distinct?: ConferencesScalarFieldEnum | ConferencesScalarFieldEnum[]
  }

  /**
   * conferences create
   */
  export type conferencesCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the conferences
     */
    select?: conferencesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the conferences
     */
    omit?: conferencesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: conferencesInclude<ExtArgs> | null
    /**
     * The data needed to create a conferences.
     */
    data: XOR<conferencesCreateInput, conferencesUncheckedCreateInput>
  }

  /**
   * conferences createMany
   */
  export type conferencesCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many conferences.
     */
    data: conferencesCreateManyInput | conferencesCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * conferences createManyAndReturn
   */
  export type conferencesCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the conferences
     */
    select?: conferencesSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the conferences
     */
    omit?: conferencesOmit<ExtArgs> | null
    /**
     * The data used to create many conferences.
     */
    data: conferencesCreateManyInput | conferencesCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * conferences update
   */
  export type conferencesUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the conferences
     */
    select?: conferencesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the conferences
     */
    omit?: conferencesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: conferencesInclude<ExtArgs> | null
    /**
     * The data needed to update a conferences.
     */
    data: XOR<conferencesUpdateInput, conferencesUncheckedUpdateInput>
    /**
     * Choose, which conferences to update.
     */
    where: conferencesWhereUniqueInput
  }

  /**
   * conferences updateMany
   */
  export type conferencesUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update conferences.
     */
    data: XOR<conferencesUpdateManyMutationInput, conferencesUncheckedUpdateManyInput>
    /**
     * Filter which conferences to update
     */
    where?: conferencesWhereInput
    /**
     * Limit how many conferences to update.
     */
    limit?: number
  }

  /**
   * conferences updateManyAndReturn
   */
  export type conferencesUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the conferences
     */
    select?: conferencesSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the conferences
     */
    omit?: conferencesOmit<ExtArgs> | null
    /**
     * The data used to update conferences.
     */
    data: XOR<conferencesUpdateManyMutationInput, conferencesUncheckedUpdateManyInput>
    /**
     * Filter which conferences to update
     */
    where?: conferencesWhereInput
    /**
     * Limit how many conferences to update.
     */
    limit?: number
  }

  /**
   * conferences upsert
   */
  export type conferencesUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the conferences
     */
    select?: conferencesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the conferences
     */
    omit?: conferencesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: conferencesInclude<ExtArgs> | null
    /**
     * The filter to search for the conferences to update in case it exists.
     */
    where: conferencesWhereUniqueInput
    /**
     * In case the conferences found by the `where` argument doesn't exist, create a new conferences with this data.
     */
    create: XOR<conferencesCreateInput, conferencesUncheckedCreateInput>
    /**
     * In case the conferences was found with the provided `where` argument, update it with this data.
     */
    update: XOR<conferencesUpdateInput, conferencesUncheckedUpdateInput>
  }

  /**
   * conferences delete
   */
  export type conferencesDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the conferences
     */
    select?: conferencesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the conferences
     */
    omit?: conferencesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: conferencesInclude<ExtArgs> | null
    /**
     * Filter which conferences to delete.
     */
    where: conferencesWhereUniqueInput
  }

  /**
   * conferences deleteMany
   */
  export type conferencesDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which conferences to delete
     */
    where?: conferencesWhereInput
    /**
     * Limit how many conferences to delete.
     */
    limit?: number
  }

  /**
   * conferences.publications
   */
  export type conferences$publicationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the publications
     */
    select?: publicationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the publications
     */
    omit?: publicationsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: publicationsInclude<ExtArgs> | null
    where?: publicationsWhereInput
    orderBy?: publicationsOrderByWithRelationInput | publicationsOrderByWithRelationInput[]
    cursor?: publicationsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PublicationsScalarFieldEnum | PublicationsScalarFieldEnum[]
  }

  /**
   * conferences.speaker
   */
  export type conferences$speakerArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the speaker
     */
    select?: speakerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the speaker
     */
    omit?: speakerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: speakerInclude<ExtArgs> | null
    where?: speakerWhereInput
    orderBy?: speakerOrderByWithRelationInput | speakerOrderByWithRelationInput[]
    cursor?: speakerWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SpeakerScalarFieldEnum | SpeakerScalarFieldEnum[]
  }

  /**
   * conferences without action
   */
  export type conferencesDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the conferences
     */
    select?: conferencesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the conferences
     */
    omit?: conferencesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: conferencesInclude<ExtArgs> | null
  }


  /**
   * Model groups
   */

  export type AggregateGroups = {
    _count: GroupsCountAggregateOutputType | null
    _min: GroupsMinAggregateOutputType | null
    _max: GroupsMaxAggregateOutputType | null
  }

  export type GroupsMinAggregateOutputType = {
    id: string | null
    title: string | null
    description: string | null
    status: string | null
    created_at: Date | null
    leader_id: string | null
    publication_id: string | null
  }

  export type GroupsMaxAggregateOutputType = {
    id: string | null
    title: string | null
    description: string | null
    status: string | null
    created_at: Date | null
    leader_id: string | null
    publication_id: string | null
  }

  export type GroupsCountAggregateOutputType = {
    id: number
    title: number
    description: number
    status: number
    created_at: number
    leader_id: number
    publication_id: number
    _all: number
  }


  export type GroupsMinAggregateInputType = {
    id?: true
    title?: true
    description?: true
    status?: true
    created_at?: true
    leader_id?: true
    publication_id?: true
  }

  export type GroupsMaxAggregateInputType = {
    id?: true
    title?: true
    description?: true
    status?: true
    created_at?: true
    leader_id?: true
    publication_id?: true
  }

  export type GroupsCountAggregateInputType = {
    id?: true
    title?: true
    description?: true
    status?: true
    created_at?: true
    leader_id?: true
    publication_id?: true
    _all?: true
  }

  export type GroupsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which groups to aggregate.
     */
    where?: groupsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of groups to fetch.
     */
    orderBy?: groupsOrderByWithRelationInput | groupsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: groupsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` groups from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` groups.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned groups
    **/
    _count?: true | GroupsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: GroupsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: GroupsMaxAggregateInputType
  }

  export type GetGroupsAggregateType<T extends GroupsAggregateArgs> = {
        [P in keyof T & keyof AggregateGroups]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateGroups[P]>
      : GetScalarType<T[P], AggregateGroups[P]>
  }




  export type groupsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: groupsWhereInput
    orderBy?: groupsOrderByWithAggregationInput | groupsOrderByWithAggregationInput[]
    by: GroupsScalarFieldEnum[] | GroupsScalarFieldEnum
    having?: groupsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: GroupsCountAggregateInputType | true
    _min?: GroupsMinAggregateInputType
    _max?: GroupsMaxAggregateInputType
  }

  export type GroupsGroupByOutputType = {
    id: string
    title: string
    description: string
    status: string
    created_at: Date
    leader_id: string
    publication_id: string
    _count: GroupsCountAggregateOutputType | null
    _min: GroupsMinAggregateOutputType | null
    _max: GroupsMaxAggregateOutputType | null
  }

  type GetGroupsGroupByPayload<T extends groupsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<GroupsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof GroupsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], GroupsGroupByOutputType[P]>
            : GetScalarType<T[P], GroupsGroupByOutputType[P]>
        }
      >
    >


  export type groupsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    status?: boolean
    created_at?: boolean
    leader_id?: boolean
    publication_id?: boolean
    users?: boolean | usersDefaultArgs<ExtArgs>
    publications?: boolean | publicationsDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["groups"]>

  export type groupsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    status?: boolean
    created_at?: boolean
    leader_id?: boolean
    publication_id?: boolean
    users?: boolean | usersDefaultArgs<ExtArgs>
    publications?: boolean | publicationsDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["groups"]>

  export type groupsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    status?: boolean
    created_at?: boolean
    leader_id?: boolean
    publication_id?: boolean
    users?: boolean | usersDefaultArgs<ExtArgs>
    publications?: boolean | publicationsDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["groups"]>

  export type groupsSelectScalar = {
    id?: boolean
    title?: boolean
    description?: boolean
    status?: boolean
    created_at?: boolean
    leader_id?: boolean
    publication_id?: boolean
  }

  export type groupsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "description" | "status" | "created_at" | "leader_id" | "publication_id", ExtArgs["result"]["groups"]>
  export type groupsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users?: boolean | usersDefaultArgs<ExtArgs>
    publications?: boolean | publicationsDefaultArgs<ExtArgs>
  }
  export type groupsIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users?: boolean | usersDefaultArgs<ExtArgs>
    publications?: boolean | publicationsDefaultArgs<ExtArgs>
  }
  export type groupsIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users?: boolean | usersDefaultArgs<ExtArgs>
    publications?: boolean | publicationsDefaultArgs<ExtArgs>
  }

  export type $groupsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "groups"
    objects: {
      users: Prisma.$usersPayload<ExtArgs>
      publications: Prisma.$publicationsPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      title: string
      description: string
      status: string
      created_at: Date
      leader_id: string
      publication_id: string
    }, ExtArgs["result"]["groups"]>
    composites: {}
  }

  type groupsGetPayload<S extends boolean | null | undefined | groupsDefaultArgs> = $Result.GetResult<Prisma.$groupsPayload, S>

  type groupsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<groupsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: GroupsCountAggregateInputType | true
    }

  export interface groupsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['groups'], meta: { name: 'groups' } }
    /**
     * Find zero or one Groups that matches the filter.
     * @param {groupsFindUniqueArgs} args - Arguments to find a Groups
     * @example
     * // Get one Groups
     * const groups = await prisma.groups.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends groupsFindUniqueArgs>(args: SelectSubset<T, groupsFindUniqueArgs<ExtArgs>>): Prisma__groupsClient<$Result.GetResult<Prisma.$groupsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Groups that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {groupsFindUniqueOrThrowArgs} args - Arguments to find a Groups
     * @example
     * // Get one Groups
     * const groups = await prisma.groups.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends groupsFindUniqueOrThrowArgs>(args: SelectSubset<T, groupsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__groupsClient<$Result.GetResult<Prisma.$groupsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Groups that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {groupsFindFirstArgs} args - Arguments to find a Groups
     * @example
     * // Get one Groups
     * const groups = await prisma.groups.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends groupsFindFirstArgs>(args?: SelectSubset<T, groupsFindFirstArgs<ExtArgs>>): Prisma__groupsClient<$Result.GetResult<Prisma.$groupsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Groups that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {groupsFindFirstOrThrowArgs} args - Arguments to find a Groups
     * @example
     * // Get one Groups
     * const groups = await prisma.groups.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends groupsFindFirstOrThrowArgs>(args?: SelectSubset<T, groupsFindFirstOrThrowArgs<ExtArgs>>): Prisma__groupsClient<$Result.GetResult<Prisma.$groupsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Groups that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {groupsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Groups
     * const groups = await prisma.groups.findMany()
     * 
     * // Get first 10 Groups
     * const groups = await prisma.groups.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const groupsWithIdOnly = await prisma.groups.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends groupsFindManyArgs>(args?: SelectSubset<T, groupsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$groupsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Groups.
     * @param {groupsCreateArgs} args - Arguments to create a Groups.
     * @example
     * // Create one Groups
     * const Groups = await prisma.groups.create({
     *   data: {
     *     // ... data to create a Groups
     *   }
     * })
     * 
     */
    create<T extends groupsCreateArgs>(args: SelectSubset<T, groupsCreateArgs<ExtArgs>>): Prisma__groupsClient<$Result.GetResult<Prisma.$groupsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Groups.
     * @param {groupsCreateManyArgs} args - Arguments to create many Groups.
     * @example
     * // Create many Groups
     * const groups = await prisma.groups.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends groupsCreateManyArgs>(args?: SelectSubset<T, groupsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Groups and returns the data saved in the database.
     * @param {groupsCreateManyAndReturnArgs} args - Arguments to create many Groups.
     * @example
     * // Create many Groups
     * const groups = await prisma.groups.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Groups and only return the `id`
     * const groupsWithIdOnly = await prisma.groups.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends groupsCreateManyAndReturnArgs>(args?: SelectSubset<T, groupsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$groupsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Groups.
     * @param {groupsDeleteArgs} args - Arguments to delete one Groups.
     * @example
     * // Delete one Groups
     * const Groups = await prisma.groups.delete({
     *   where: {
     *     // ... filter to delete one Groups
     *   }
     * })
     * 
     */
    delete<T extends groupsDeleteArgs>(args: SelectSubset<T, groupsDeleteArgs<ExtArgs>>): Prisma__groupsClient<$Result.GetResult<Prisma.$groupsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Groups.
     * @param {groupsUpdateArgs} args - Arguments to update one Groups.
     * @example
     * // Update one Groups
     * const groups = await prisma.groups.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends groupsUpdateArgs>(args: SelectSubset<T, groupsUpdateArgs<ExtArgs>>): Prisma__groupsClient<$Result.GetResult<Prisma.$groupsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Groups.
     * @param {groupsDeleteManyArgs} args - Arguments to filter Groups to delete.
     * @example
     * // Delete a few Groups
     * const { count } = await prisma.groups.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends groupsDeleteManyArgs>(args?: SelectSubset<T, groupsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Groups.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {groupsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Groups
     * const groups = await prisma.groups.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends groupsUpdateManyArgs>(args: SelectSubset<T, groupsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Groups and returns the data updated in the database.
     * @param {groupsUpdateManyAndReturnArgs} args - Arguments to update many Groups.
     * @example
     * // Update many Groups
     * const groups = await prisma.groups.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Groups and only return the `id`
     * const groupsWithIdOnly = await prisma.groups.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends groupsUpdateManyAndReturnArgs>(args: SelectSubset<T, groupsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$groupsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Groups.
     * @param {groupsUpsertArgs} args - Arguments to update or create a Groups.
     * @example
     * // Update or create a Groups
     * const groups = await prisma.groups.upsert({
     *   create: {
     *     // ... data to create a Groups
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Groups we want to update
     *   }
     * })
     */
    upsert<T extends groupsUpsertArgs>(args: SelectSubset<T, groupsUpsertArgs<ExtArgs>>): Prisma__groupsClient<$Result.GetResult<Prisma.$groupsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Groups.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {groupsCountArgs} args - Arguments to filter Groups to count.
     * @example
     * // Count the number of Groups
     * const count = await prisma.groups.count({
     *   where: {
     *     // ... the filter for the Groups we want to count
     *   }
     * })
    **/
    count<T extends groupsCountArgs>(
      args?: Subset<T, groupsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], GroupsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Groups.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends GroupsAggregateArgs>(args: Subset<T, GroupsAggregateArgs>): Prisma.PrismaPromise<GetGroupsAggregateType<T>>

    /**
     * Group by Groups.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {groupsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends groupsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: groupsGroupByArgs['orderBy'] }
        : { orderBy?: groupsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, groupsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetGroupsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the groups model
   */
  readonly fields: groupsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for groups.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__groupsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    users<T extends usersDefaultArgs<ExtArgs> = {}>(args?: Subset<T, usersDefaultArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    publications<T extends publicationsDefaultArgs<ExtArgs> = {}>(args?: Subset<T, publicationsDefaultArgs<ExtArgs>>): Prisma__publicationsClient<$Result.GetResult<Prisma.$publicationsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the groups model
   */
  interface groupsFieldRefs {
    readonly id: FieldRef<"groups", 'String'>
    readonly title: FieldRef<"groups", 'String'>
    readonly description: FieldRef<"groups", 'String'>
    readonly status: FieldRef<"groups", 'String'>
    readonly created_at: FieldRef<"groups", 'DateTime'>
    readonly leader_id: FieldRef<"groups", 'String'>
    readonly publication_id: FieldRef<"groups", 'String'>
  }
    

  // Custom InputTypes
  /**
   * groups findUnique
   */
  export type groupsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the groups
     */
    select?: groupsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the groups
     */
    omit?: groupsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: groupsInclude<ExtArgs> | null
    /**
     * Filter, which groups to fetch.
     */
    where: groupsWhereUniqueInput
  }

  /**
   * groups findUniqueOrThrow
   */
  export type groupsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the groups
     */
    select?: groupsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the groups
     */
    omit?: groupsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: groupsInclude<ExtArgs> | null
    /**
     * Filter, which groups to fetch.
     */
    where: groupsWhereUniqueInput
  }

  /**
   * groups findFirst
   */
  export type groupsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the groups
     */
    select?: groupsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the groups
     */
    omit?: groupsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: groupsInclude<ExtArgs> | null
    /**
     * Filter, which groups to fetch.
     */
    where?: groupsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of groups to fetch.
     */
    orderBy?: groupsOrderByWithRelationInput | groupsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for groups.
     */
    cursor?: groupsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` groups from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` groups.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of groups.
     */
    distinct?: GroupsScalarFieldEnum | GroupsScalarFieldEnum[]
  }

  /**
   * groups findFirstOrThrow
   */
  export type groupsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the groups
     */
    select?: groupsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the groups
     */
    omit?: groupsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: groupsInclude<ExtArgs> | null
    /**
     * Filter, which groups to fetch.
     */
    where?: groupsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of groups to fetch.
     */
    orderBy?: groupsOrderByWithRelationInput | groupsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for groups.
     */
    cursor?: groupsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` groups from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` groups.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of groups.
     */
    distinct?: GroupsScalarFieldEnum | GroupsScalarFieldEnum[]
  }

  /**
   * groups findMany
   */
  export type groupsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the groups
     */
    select?: groupsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the groups
     */
    omit?: groupsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: groupsInclude<ExtArgs> | null
    /**
     * Filter, which groups to fetch.
     */
    where?: groupsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of groups to fetch.
     */
    orderBy?: groupsOrderByWithRelationInput | groupsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing groups.
     */
    cursor?: groupsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` groups from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` groups.
     */
    skip?: number
    distinct?: GroupsScalarFieldEnum | GroupsScalarFieldEnum[]
  }

  /**
   * groups create
   */
  export type groupsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the groups
     */
    select?: groupsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the groups
     */
    omit?: groupsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: groupsInclude<ExtArgs> | null
    /**
     * The data needed to create a groups.
     */
    data: XOR<groupsCreateInput, groupsUncheckedCreateInput>
  }

  /**
   * groups createMany
   */
  export type groupsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many groups.
     */
    data: groupsCreateManyInput | groupsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * groups createManyAndReturn
   */
  export type groupsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the groups
     */
    select?: groupsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the groups
     */
    omit?: groupsOmit<ExtArgs> | null
    /**
     * The data used to create many groups.
     */
    data: groupsCreateManyInput | groupsCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: groupsIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * groups update
   */
  export type groupsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the groups
     */
    select?: groupsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the groups
     */
    omit?: groupsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: groupsInclude<ExtArgs> | null
    /**
     * The data needed to update a groups.
     */
    data: XOR<groupsUpdateInput, groupsUncheckedUpdateInput>
    /**
     * Choose, which groups to update.
     */
    where: groupsWhereUniqueInput
  }

  /**
   * groups updateMany
   */
  export type groupsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update groups.
     */
    data: XOR<groupsUpdateManyMutationInput, groupsUncheckedUpdateManyInput>
    /**
     * Filter which groups to update
     */
    where?: groupsWhereInput
    /**
     * Limit how many groups to update.
     */
    limit?: number
  }

  /**
   * groups updateManyAndReturn
   */
  export type groupsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the groups
     */
    select?: groupsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the groups
     */
    omit?: groupsOmit<ExtArgs> | null
    /**
     * The data used to update groups.
     */
    data: XOR<groupsUpdateManyMutationInput, groupsUncheckedUpdateManyInput>
    /**
     * Filter which groups to update
     */
    where?: groupsWhereInput
    /**
     * Limit how many groups to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: groupsIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * groups upsert
   */
  export type groupsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the groups
     */
    select?: groupsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the groups
     */
    omit?: groupsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: groupsInclude<ExtArgs> | null
    /**
     * The filter to search for the groups to update in case it exists.
     */
    where: groupsWhereUniqueInput
    /**
     * In case the groups found by the `where` argument doesn't exist, create a new groups with this data.
     */
    create: XOR<groupsCreateInput, groupsUncheckedCreateInput>
    /**
     * In case the groups was found with the provided `where` argument, update it with this data.
     */
    update: XOR<groupsUpdateInput, groupsUncheckedUpdateInput>
  }

  /**
   * groups delete
   */
  export type groupsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the groups
     */
    select?: groupsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the groups
     */
    omit?: groupsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: groupsInclude<ExtArgs> | null
    /**
     * Filter which groups to delete.
     */
    where: groupsWhereUniqueInput
  }

  /**
   * groups deleteMany
   */
  export type groupsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which groups to delete
     */
    where?: groupsWhereInput
    /**
     * Limit how many groups to delete.
     */
    limit?: number
  }

  /**
   * groups without action
   */
  export type groupsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the groups
     */
    select?: groupsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the groups
     */
    omit?: groupsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: groupsInclude<ExtArgs> | null
  }


  /**
   * Model links
   */

  export type AggregateLinks = {
    _count: LinksCountAggregateOutputType | null
    _min: LinksMinAggregateOutputType | null
    _max: LinksMaxAggregateOutputType | null
  }

  export type LinksMinAggregateOutputType = {
    id: string | null
    type: string | null
    link: string | null
    user_id: string | null
  }

  export type LinksMaxAggregateOutputType = {
    id: string | null
    type: string | null
    link: string | null
    user_id: string | null
  }

  export type LinksCountAggregateOutputType = {
    id: number
    type: number
    link: number
    user_id: number
    _all: number
  }


  export type LinksMinAggregateInputType = {
    id?: true
    type?: true
    link?: true
    user_id?: true
  }

  export type LinksMaxAggregateInputType = {
    id?: true
    type?: true
    link?: true
    user_id?: true
  }

  export type LinksCountAggregateInputType = {
    id?: true
    type?: true
    link?: true
    user_id?: true
    _all?: true
  }

  export type LinksAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which links to aggregate.
     */
    where?: linksWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of links to fetch.
     */
    orderBy?: linksOrderByWithRelationInput | linksOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: linksWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` links from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` links.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned links
    **/
    _count?: true | LinksCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: LinksMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: LinksMaxAggregateInputType
  }

  export type GetLinksAggregateType<T extends LinksAggregateArgs> = {
        [P in keyof T & keyof AggregateLinks]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLinks[P]>
      : GetScalarType<T[P], AggregateLinks[P]>
  }




  export type linksGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: linksWhereInput
    orderBy?: linksOrderByWithAggregationInput | linksOrderByWithAggregationInput[]
    by: LinksScalarFieldEnum[] | LinksScalarFieldEnum
    having?: linksScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: LinksCountAggregateInputType | true
    _min?: LinksMinAggregateInputType
    _max?: LinksMaxAggregateInputType
  }

  export type LinksGroupByOutputType = {
    id: string
    type: string | null
    link: string | null
    user_id: string
    _count: LinksCountAggregateOutputType | null
    _min: LinksMinAggregateOutputType | null
    _max: LinksMaxAggregateOutputType | null
  }

  type GetLinksGroupByPayload<T extends linksGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<LinksGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof LinksGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], LinksGroupByOutputType[P]>
            : GetScalarType<T[P], LinksGroupByOutputType[P]>
        }
      >
    >


  export type linksSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    type?: boolean
    link?: boolean
    user_id?: boolean
    users?: boolean | usersDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["links"]>

  export type linksSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    type?: boolean
    link?: boolean
    user_id?: boolean
    users?: boolean | usersDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["links"]>

  export type linksSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    type?: boolean
    link?: boolean
    user_id?: boolean
    users?: boolean | usersDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["links"]>

  export type linksSelectScalar = {
    id?: boolean
    type?: boolean
    link?: boolean
    user_id?: boolean
  }

  export type linksOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "type" | "link" | "user_id", ExtArgs["result"]["links"]>
  export type linksInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users?: boolean | usersDefaultArgs<ExtArgs>
  }
  export type linksIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users?: boolean | usersDefaultArgs<ExtArgs>
  }
  export type linksIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users?: boolean | usersDefaultArgs<ExtArgs>
  }

  export type $linksPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "links"
    objects: {
      users: Prisma.$usersPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      type: string | null
      link: string | null
      user_id: string
    }, ExtArgs["result"]["links"]>
    composites: {}
  }

  type linksGetPayload<S extends boolean | null | undefined | linksDefaultArgs> = $Result.GetResult<Prisma.$linksPayload, S>

  type linksCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<linksFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: LinksCountAggregateInputType | true
    }

  export interface linksDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['links'], meta: { name: 'links' } }
    /**
     * Find zero or one Links that matches the filter.
     * @param {linksFindUniqueArgs} args - Arguments to find a Links
     * @example
     * // Get one Links
     * const links = await prisma.links.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends linksFindUniqueArgs>(args: SelectSubset<T, linksFindUniqueArgs<ExtArgs>>): Prisma__linksClient<$Result.GetResult<Prisma.$linksPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Links that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {linksFindUniqueOrThrowArgs} args - Arguments to find a Links
     * @example
     * // Get one Links
     * const links = await prisma.links.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends linksFindUniqueOrThrowArgs>(args: SelectSubset<T, linksFindUniqueOrThrowArgs<ExtArgs>>): Prisma__linksClient<$Result.GetResult<Prisma.$linksPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Links that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {linksFindFirstArgs} args - Arguments to find a Links
     * @example
     * // Get one Links
     * const links = await prisma.links.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends linksFindFirstArgs>(args?: SelectSubset<T, linksFindFirstArgs<ExtArgs>>): Prisma__linksClient<$Result.GetResult<Prisma.$linksPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Links that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {linksFindFirstOrThrowArgs} args - Arguments to find a Links
     * @example
     * // Get one Links
     * const links = await prisma.links.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends linksFindFirstOrThrowArgs>(args?: SelectSubset<T, linksFindFirstOrThrowArgs<ExtArgs>>): Prisma__linksClient<$Result.GetResult<Prisma.$linksPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Links that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {linksFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Links
     * const links = await prisma.links.findMany()
     * 
     * // Get first 10 Links
     * const links = await prisma.links.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const linksWithIdOnly = await prisma.links.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends linksFindManyArgs>(args?: SelectSubset<T, linksFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$linksPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Links.
     * @param {linksCreateArgs} args - Arguments to create a Links.
     * @example
     * // Create one Links
     * const Links = await prisma.links.create({
     *   data: {
     *     // ... data to create a Links
     *   }
     * })
     * 
     */
    create<T extends linksCreateArgs>(args: SelectSubset<T, linksCreateArgs<ExtArgs>>): Prisma__linksClient<$Result.GetResult<Prisma.$linksPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Links.
     * @param {linksCreateManyArgs} args - Arguments to create many Links.
     * @example
     * // Create many Links
     * const links = await prisma.links.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends linksCreateManyArgs>(args?: SelectSubset<T, linksCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Links and returns the data saved in the database.
     * @param {linksCreateManyAndReturnArgs} args - Arguments to create many Links.
     * @example
     * // Create many Links
     * const links = await prisma.links.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Links and only return the `id`
     * const linksWithIdOnly = await prisma.links.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends linksCreateManyAndReturnArgs>(args?: SelectSubset<T, linksCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$linksPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Links.
     * @param {linksDeleteArgs} args - Arguments to delete one Links.
     * @example
     * // Delete one Links
     * const Links = await prisma.links.delete({
     *   where: {
     *     // ... filter to delete one Links
     *   }
     * })
     * 
     */
    delete<T extends linksDeleteArgs>(args: SelectSubset<T, linksDeleteArgs<ExtArgs>>): Prisma__linksClient<$Result.GetResult<Prisma.$linksPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Links.
     * @param {linksUpdateArgs} args - Arguments to update one Links.
     * @example
     * // Update one Links
     * const links = await prisma.links.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends linksUpdateArgs>(args: SelectSubset<T, linksUpdateArgs<ExtArgs>>): Prisma__linksClient<$Result.GetResult<Prisma.$linksPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Links.
     * @param {linksDeleteManyArgs} args - Arguments to filter Links to delete.
     * @example
     * // Delete a few Links
     * const { count } = await prisma.links.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends linksDeleteManyArgs>(args?: SelectSubset<T, linksDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Links.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {linksUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Links
     * const links = await prisma.links.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends linksUpdateManyArgs>(args: SelectSubset<T, linksUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Links and returns the data updated in the database.
     * @param {linksUpdateManyAndReturnArgs} args - Arguments to update many Links.
     * @example
     * // Update many Links
     * const links = await prisma.links.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Links and only return the `id`
     * const linksWithIdOnly = await prisma.links.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends linksUpdateManyAndReturnArgs>(args: SelectSubset<T, linksUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$linksPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Links.
     * @param {linksUpsertArgs} args - Arguments to update or create a Links.
     * @example
     * // Update or create a Links
     * const links = await prisma.links.upsert({
     *   create: {
     *     // ... data to create a Links
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Links we want to update
     *   }
     * })
     */
    upsert<T extends linksUpsertArgs>(args: SelectSubset<T, linksUpsertArgs<ExtArgs>>): Prisma__linksClient<$Result.GetResult<Prisma.$linksPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Links.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {linksCountArgs} args - Arguments to filter Links to count.
     * @example
     * // Count the number of Links
     * const count = await prisma.links.count({
     *   where: {
     *     // ... the filter for the Links we want to count
     *   }
     * })
    **/
    count<T extends linksCountArgs>(
      args?: Subset<T, linksCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], LinksCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Links.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LinksAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends LinksAggregateArgs>(args: Subset<T, LinksAggregateArgs>): Prisma.PrismaPromise<GetLinksAggregateType<T>>

    /**
     * Group by Links.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {linksGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends linksGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: linksGroupByArgs['orderBy'] }
        : { orderBy?: linksGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, linksGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLinksGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the links model
   */
  readonly fields: linksFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for links.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__linksClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    users<T extends usersDefaultArgs<ExtArgs> = {}>(args?: Subset<T, usersDefaultArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the links model
   */
  interface linksFieldRefs {
    readonly id: FieldRef<"links", 'String'>
    readonly type: FieldRef<"links", 'String'>
    readonly link: FieldRef<"links", 'String'>
    readonly user_id: FieldRef<"links", 'String'>
  }
    

  // Custom InputTypes
  /**
   * links findUnique
   */
  export type linksFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the links
     */
    select?: linksSelect<ExtArgs> | null
    /**
     * Omit specific fields from the links
     */
    omit?: linksOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: linksInclude<ExtArgs> | null
    /**
     * Filter, which links to fetch.
     */
    where: linksWhereUniqueInput
  }

  /**
   * links findUniqueOrThrow
   */
  export type linksFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the links
     */
    select?: linksSelect<ExtArgs> | null
    /**
     * Omit specific fields from the links
     */
    omit?: linksOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: linksInclude<ExtArgs> | null
    /**
     * Filter, which links to fetch.
     */
    where: linksWhereUniqueInput
  }

  /**
   * links findFirst
   */
  export type linksFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the links
     */
    select?: linksSelect<ExtArgs> | null
    /**
     * Omit specific fields from the links
     */
    omit?: linksOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: linksInclude<ExtArgs> | null
    /**
     * Filter, which links to fetch.
     */
    where?: linksWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of links to fetch.
     */
    orderBy?: linksOrderByWithRelationInput | linksOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for links.
     */
    cursor?: linksWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` links from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` links.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of links.
     */
    distinct?: LinksScalarFieldEnum | LinksScalarFieldEnum[]
  }

  /**
   * links findFirstOrThrow
   */
  export type linksFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the links
     */
    select?: linksSelect<ExtArgs> | null
    /**
     * Omit specific fields from the links
     */
    omit?: linksOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: linksInclude<ExtArgs> | null
    /**
     * Filter, which links to fetch.
     */
    where?: linksWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of links to fetch.
     */
    orderBy?: linksOrderByWithRelationInput | linksOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for links.
     */
    cursor?: linksWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` links from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` links.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of links.
     */
    distinct?: LinksScalarFieldEnum | LinksScalarFieldEnum[]
  }

  /**
   * links findMany
   */
  export type linksFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the links
     */
    select?: linksSelect<ExtArgs> | null
    /**
     * Omit specific fields from the links
     */
    omit?: linksOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: linksInclude<ExtArgs> | null
    /**
     * Filter, which links to fetch.
     */
    where?: linksWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of links to fetch.
     */
    orderBy?: linksOrderByWithRelationInput | linksOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing links.
     */
    cursor?: linksWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` links from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` links.
     */
    skip?: number
    distinct?: LinksScalarFieldEnum | LinksScalarFieldEnum[]
  }

  /**
   * links create
   */
  export type linksCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the links
     */
    select?: linksSelect<ExtArgs> | null
    /**
     * Omit specific fields from the links
     */
    omit?: linksOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: linksInclude<ExtArgs> | null
    /**
     * The data needed to create a links.
     */
    data: XOR<linksCreateInput, linksUncheckedCreateInput>
  }

  /**
   * links createMany
   */
  export type linksCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many links.
     */
    data: linksCreateManyInput | linksCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * links createManyAndReturn
   */
  export type linksCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the links
     */
    select?: linksSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the links
     */
    omit?: linksOmit<ExtArgs> | null
    /**
     * The data used to create many links.
     */
    data: linksCreateManyInput | linksCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: linksIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * links update
   */
  export type linksUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the links
     */
    select?: linksSelect<ExtArgs> | null
    /**
     * Omit specific fields from the links
     */
    omit?: linksOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: linksInclude<ExtArgs> | null
    /**
     * The data needed to update a links.
     */
    data: XOR<linksUpdateInput, linksUncheckedUpdateInput>
    /**
     * Choose, which links to update.
     */
    where: linksWhereUniqueInput
  }

  /**
   * links updateMany
   */
  export type linksUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update links.
     */
    data: XOR<linksUpdateManyMutationInput, linksUncheckedUpdateManyInput>
    /**
     * Filter which links to update
     */
    where?: linksWhereInput
    /**
     * Limit how many links to update.
     */
    limit?: number
  }

  /**
   * links updateManyAndReturn
   */
  export type linksUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the links
     */
    select?: linksSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the links
     */
    omit?: linksOmit<ExtArgs> | null
    /**
     * The data used to update links.
     */
    data: XOR<linksUpdateManyMutationInput, linksUncheckedUpdateManyInput>
    /**
     * Filter which links to update
     */
    where?: linksWhereInput
    /**
     * Limit how many links to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: linksIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * links upsert
   */
  export type linksUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the links
     */
    select?: linksSelect<ExtArgs> | null
    /**
     * Omit specific fields from the links
     */
    omit?: linksOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: linksInclude<ExtArgs> | null
    /**
     * The filter to search for the links to update in case it exists.
     */
    where: linksWhereUniqueInput
    /**
     * In case the links found by the `where` argument doesn't exist, create a new links with this data.
     */
    create: XOR<linksCreateInput, linksUncheckedCreateInput>
    /**
     * In case the links was found with the provided `where` argument, update it with this data.
     */
    update: XOR<linksUpdateInput, linksUncheckedUpdateInput>
  }

  /**
   * links delete
   */
  export type linksDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the links
     */
    select?: linksSelect<ExtArgs> | null
    /**
     * Omit specific fields from the links
     */
    omit?: linksOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: linksInclude<ExtArgs> | null
    /**
     * Filter which links to delete.
     */
    where: linksWhereUniqueInput
  }

  /**
   * links deleteMany
   */
  export type linksDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which links to delete
     */
    where?: linksWhereInput
    /**
     * Limit how many links to delete.
     */
    limit?: number
  }

  /**
   * links without action
   */
  export type linksDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the links
     */
    select?: linksSelect<ExtArgs> | null
    /**
     * Omit specific fields from the links
     */
    omit?: linksOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: linksInclude<ExtArgs> | null
  }


  /**
   * Model messages
   */

  export type AggregateMessages = {
    _count: MessagesCountAggregateOutputType | null
    _min: MessagesMinAggregateOutputType | null
    _max: MessagesMaxAggregateOutputType | null
  }

  export type MessagesMinAggregateOutputType = {
    id: string | null
    message: string | null
    created_at: Date | null
    status: string | null
    sender_id: string | null
    receiver_id: string | null
  }

  export type MessagesMaxAggregateOutputType = {
    id: string | null
    message: string | null
    created_at: Date | null
    status: string | null
    sender_id: string | null
    receiver_id: string | null
  }

  export type MessagesCountAggregateOutputType = {
    id: number
    message: number
    created_at: number
    status: number
    sender_id: number
    receiver_id: number
    _all: number
  }


  export type MessagesMinAggregateInputType = {
    id?: true
    message?: true
    created_at?: true
    status?: true
    sender_id?: true
    receiver_id?: true
  }

  export type MessagesMaxAggregateInputType = {
    id?: true
    message?: true
    created_at?: true
    status?: true
    sender_id?: true
    receiver_id?: true
  }

  export type MessagesCountAggregateInputType = {
    id?: true
    message?: true
    created_at?: true
    status?: true
    sender_id?: true
    receiver_id?: true
    _all?: true
  }

  export type MessagesAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which messages to aggregate.
     */
    where?: messagesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of messages to fetch.
     */
    orderBy?: messagesOrderByWithRelationInput | messagesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: messagesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` messages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` messages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned messages
    **/
    _count?: true | MessagesCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MessagesMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MessagesMaxAggregateInputType
  }

  export type GetMessagesAggregateType<T extends MessagesAggregateArgs> = {
        [P in keyof T & keyof AggregateMessages]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMessages[P]>
      : GetScalarType<T[P], AggregateMessages[P]>
  }




  export type messagesGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: messagesWhereInput
    orderBy?: messagesOrderByWithAggregationInput | messagesOrderByWithAggregationInput[]
    by: MessagesScalarFieldEnum[] | MessagesScalarFieldEnum
    having?: messagesScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MessagesCountAggregateInputType | true
    _min?: MessagesMinAggregateInputType
    _max?: MessagesMaxAggregateInputType
  }

  export type MessagesGroupByOutputType = {
    id: string
    message: string
    created_at: Date | null
    status: string | null
    sender_id: string
    receiver_id: string
    _count: MessagesCountAggregateOutputType | null
    _min: MessagesMinAggregateOutputType | null
    _max: MessagesMaxAggregateOutputType | null
  }

  type GetMessagesGroupByPayload<T extends messagesGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MessagesGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MessagesGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MessagesGroupByOutputType[P]>
            : GetScalarType<T[P], MessagesGroupByOutputType[P]>
        }
      >
    >


  export type messagesSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    message?: boolean
    created_at?: boolean
    status?: boolean
    sender_id?: boolean
    receiver_id?: boolean
    users_messages_receiver_idTousers?: boolean | usersDefaultArgs<ExtArgs>
    users_messages_sender_idTousers?: boolean | usersDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["messages"]>

  export type messagesSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    message?: boolean
    created_at?: boolean
    status?: boolean
    sender_id?: boolean
    receiver_id?: boolean
    users_messages_receiver_idTousers?: boolean | usersDefaultArgs<ExtArgs>
    users_messages_sender_idTousers?: boolean | usersDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["messages"]>

  export type messagesSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    message?: boolean
    created_at?: boolean
    status?: boolean
    sender_id?: boolean
    receiver_id?: boolean
    users_messages_receiver_idTousers?: boolean | usersDefaultArgs<ExtArgs>
    users_messages_sender_idTousers?: boolean | usersDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["messages"]>

  export type messagesSelectScalar = {
    id?: boolean
    message?: boolean
    created_at?: boolean
    status?: boolean
    sender_id?: boolean
    receiver_id?: boolean
  }

  export type messagesOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "message" | "created_at" | "status" | "sender_id" | "receiver_id", ExtArgs["result"]["messages"]>
  export type messagesInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users_messages_receiver_idTousers?: boolean | usersDefaultArgs<ExtArgs>
    users_messages_sender_idTousers?: boolean | usersDefaultArgs<ExtArgs>
  }
  export type messagesIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users_messages_receiver_idTousers?: boolean | usersDefaultArgs<ExtArgs>
    users_messages_sender_idTousers?: boolean | usersDefaultArgs<ExtArgs>
  }
  export type messagesIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users_messages_receiver_idTousers?: boolean | usersDefaultArgs<ExtArgs>
    users_messages_sender_idTousers?: boolean | usersDefaultArgs<ExtArgs>
  }

  export type $messagesPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "messages"
    objects: {
      users_messages_receiver_idTousers: Prisma.$usersPayload<ExtArgs>
      users_messages_sender_idTousers: Prisma.$usersPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      message: string
      created_at: Date | null
      status: string | null
      sender_id: string
      receiver_id: string
    }, ExtArgs["result"]["messages"]>
    composites: {}
  }

  type messagesGetPayload<S extends boolean | null | undefined | messagesDefaultArgs> = $Result.GetResult<Prisma.$messagesPayload, S>

  type messagesCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<messagesFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MessagesCountAggregateInputType | true
    }

  export interface messagesDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['messages'], meta: { name: 'messages' } }
    /**
     * Find zero or one Messages that matches the filter.
     * @param {messagesFindUniqueArgs} args - Arguments to find a Messages
     * @example
     * // Get one Messages
     * const messages = await prisma.messages.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends messagesFindUniqueArgs>(args: SelectSubset<T, messagesFindUniqueArgs<ExtArgs>>): Prisma__messagesClient<$Result.GetResult<Prisma.$messagesPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Messages that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {messagesFindUniqueOrThrowArgs} args - Arguments to find a Messages
     * @example
     * // Get one Messages
     * const messages = await prisma.messages.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends messagesFindUniqueOrThrowArgs>(args: SelectSubset<T, messagesFindUniqueOrThrowArgs<ExtArgs>>): Prisma__messagesClient<$Result.GetResult<Prisma.$messagesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Messages that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {messagesFindFirstArgs} args - Arguments to find a Messages
     * @example
     * // Get one Messages
     * const messages = await prisma.messages.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends messagesFindFirstArgs>(args?: SelectSubset<T, messagesFindFirstArgs<ExtArgs>>): Prisma__messagesClient<$Result.GetResult<Prisma.$messagesPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Messages that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {messagesFindFirstOrThrowArgs} args - Arguments to find a Messages
     * @example
     * // Get one Messages
     * const messages = await prisma.messages.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends messagesFindFirstOrThrowArgs>(args?: SelectSubset<T, messagesFindFirstOrThrowArgs<ExtArgs>>): Prisma__messagesClient<$Result.GetResult<Prisma.$messagesPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Messages that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {messagesFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Messages
     * const messages = await prisma.messages.findMany()
     * 
     * // Get first 10 Messages
     * const messages = await prisma.messages.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const messagesWithIdOnly = await prisma.messages.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends messagesFindManyArgs>(args?: SelectSubset<T, messagesFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$messagesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Messages.
     * @param {messagesCreateArgs} args - Arguments to create a Messages.
     * @example
     * // Create one Messages
     * const Messages = await prisma.messages.create({
     *   data: {
     *     // ... data to create a Messages
     *   }
     * })
     * 
     */
    create<T extends messagesCreateArgs>(args: SelectSubset<T, messagesCreateArgs<ExtArgs>>): Prisma__messagesClient<$Result.GetResult<Prisma.$messagesPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Messages.
     * @param {messagesCreateManyArgs} args - Arguments to create many Messages.
     * @example
     * // Create many Messages
     * const messages = await prisma.messages.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends messagesCreateManyArgs>(args?: SelectSubset<T, messagesCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Messages and returns the data saved in the database.
     * @param {messagesCreateManyAndReturnArgs} args - Arguments to create many Messages.
     * @example
     * // Create many Messages
     * const messages = await prisma.messages.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Messages and only return the `id`
     * const messagesWithIdOnly = await prisma.messages.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends messagesCreateManyAndReturnArgs>(args?: SelectSubset<T, messagesCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$messagesPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Messages.
     * @param {messagesDeleteArgs} args - Arguments to delete one Messages.
     * @example
     * // Delete one Messages
     * const Messages = await prisma.messages.delete({
     *   where: {
     *     // ... filter to delete one Messages
     *   }
     * })
     * 
     */
    delete<T extends messagesDeleteArgs>(args: SelectSubset<T, messagesDeleteArgs<ExtArgs>>): Prisma__messagesClient<$Result.GetResult<Prisma.$messagesPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Messages.
     * @param {messagesUpdateArgs} args - Arguments to update one Messages.
     * @example
     * // Update one Messages
     * const messages = await prisma.messages.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends messagesUpdateArgs>(args: SelectSubset<T, messagesUpdateArgs<ExtArgs>>): Prisma__messagesClient<$Result.GetResult<Prisma.$messagesPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Messages.
     * @param {messagesDeleteManyArgs} args - Arguments to filter Messages to delete.
     * @example
     * // Delete a few Messages
     * const { count } = await prisma.messages.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends messagesDeleteManyArgs>(args?: SelectSubset<T, messagesDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Messages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {messagesUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Messages
     * const messages = await prisma.messages.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends messagesUpdateManyArgs>(args: SelectSubset<T, messagesUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Messages and returns the data updated in the database.
     * @param {messagesUpdateManyAndReturnArgs} args - Arguments to update many Messages.
     * @example
     * // Update many Messages
     * const messages = await prisma.messages.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Messages and only return the `id`
     * const messagesWithIdOnly = await prisma.messages.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends messagesUpdateManyAndReturnArgs>(args: SelectSubset<T, messagesUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$messagesPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Messages.
     * @param {messagesUpsertArgs} args - Arguments to update or create a Messages.
     * @example
     * // Update or create a Messages
     * const messages = await prisma.messages.upsert({
     *   create: {
     *     // ... data to create a Messages
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Messages we want to update
     *   }
     * })
     */
    upsert<T extends messagesUpsertArgs>(args: SelectSubset<T, messagesUpsertArgs<ExtArgs>>): Prisma__messagesClient<$Result.GetResult<Prisma.$messagesPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Messages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {messagesCountArgs} args - Arguments to filter Messages to count.
     * @example
     * // Count the number of Messages
     * const count = await prisma.messages.count({
     *   where: {
     *     // ... the filter for the Messages we want to count
     *   }
     * })
    **/
    count<T extends messagesCountArgs>(
      args?: Subset<T, messagesCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MessagesCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Messages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessagesAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MessagesAggregateArgs>(args: Subset<T, MessagesAggregateArgs>): Prisma.PrismaPromise<GetMessagesAggregateType<T>>

    /**
     * Group by Messages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {messagesGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends messagesGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: messagesGroupByArgs['orderBy'] }
        : { orderBy?: messagesGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, messagesGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMessagesGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the messages model
   */
  readonly fields: messagesFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for messages.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__messagesClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    users_messages_receiver_idTousers<T extends usersDefaultArgs<ExtArgs> = {}>(args?: Subset<T, usersDefaultArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    users_messages_sender_idTousers<T extends usersDefaultArgs<ExtArgs> = {}>(args?: Subset<T, usersDefaultArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the messages model
   */
  interface messagesFieldRefs {
    readonly id: FieldRef<"messages", 'String'>
    readonly message: FieldRef<"messages", 'String'>
    readonly created_at: FieldRef<"messages", 'DateTime'>
    readonly status: FieldRef<"messages", 'String'>
    readonly sender_id: FieldRef<"messages", 'String'>
    readonly receiver_id: FieldRef<"messages", 'String'>
  }
    

  // Custom InputTypes
  /**
   * messages findUnique
   */
  export type messagesFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the messages
     */
    select?: messagesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the messages
     */
    omit?: messagesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: messagesInclude<ExtArgs> | null
    /**
     * Filter, which messages to fetch.
     */
    where: messagesWhereUniqueInput
  }

  /**
   * messages findUniqueOrThrow
   */
  export type messagesFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the messages
     */
    select?: messagesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the messages
     */
    omit?: messagesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: messagesInclude<ExtArgs> | null
    /**
     * Filter, which messages to fetch.
     */
    where: messagesWhereUniqueInput
  }

  /**
   * messages findFirst
   */
  export type messagesFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the messages
     */
    select?: messagesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the messages
     */
    omit?: messagesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: messagesInclude<ExtArgs> | null
    /**
     * Filter, which messages to fetch.
     */
    where?: messagesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of messages to fetch.
     */
    orderBy?: messagesOrderByWithRelationInput | messagesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for messages.
     */
    cursor?: messagesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` messages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` messages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of messages.
     */
    distinct?: MessagesScalarFieldEnum | MessagesScalarFieldEnum[]
  }

  /**
   * messages findFirstOrThrow
   */
  export type messagesFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the messages
     */
    select?: messagesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the messages
     */
    omit?: messagesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: messagesInclude<ExtArgs> | null
    /**
     * Filter, which messages to fetch.
     */
    where?: messagesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of messages to fetch.
     */
    orderBy?: messagesOrderByWithRelationInput | messagesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for messages.
     */
    cursor?: messagesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` messages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` messages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of messages.
     */
    distinct?: MessagesScalarFieldEnum | MessagesScalarFieldEnum[]
  }

  /**
   * messages findMany
   */
  export type messagesFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the messages
     */
    select?: messagesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the messages
     */
    omit?: messagesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: messagesInclude<ExtArgs> | null
    /**
     * Filter, which messages to fetch.
     */
    where?: messagesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of messages to fetch.
     */
    orderBy?: messagesOrderByWithRelationInput | messagesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing messages.
     */
    cursor?: messagesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` messages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` messages.
     */
    skip?: number
    distinct?: MessagesScalarFieldEnum | MessagesScalarFieldEnum[]
  }

  /**
   * messages create
   */
  export type messagesCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the messages
     */
    select?: messagesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the messages
     */
    omit?: messagesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: messagesInclude<ExtArgs> | null
    /**
     * The data needed to create a messages.
     */
    data: XOR<messagesCreateInput, messagesUncheckedCreateInput>
  }

  /**
   * messages createMany
   */
  export type messagesCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many messages.
     */
    data: messagesCreateManyInput | messagesCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * messages createManyAndReturn
   */
  export type messagesCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the messages
     */
    select?: messagesSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the messages
     */
    omit?: messagesOmit<ExtArgs> | null
    /**
     * The data used to create many messages.
     */
    data: messagesCreateManyInput | messagesCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: messagesIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * messages update
   */
  export type messagesUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the messages
     */
    select?: messagesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the messages
     */
    omit?: messagesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: messagesInclude<ExtArgs> | null
    /**
     * The data needed to update a messages.
     */
    data: XOR<messagesUpdateInput, messagesUncheckedUpdateInput>
    /**
     * Choose, which messages to update.
     */
    where: messagesWhereUniqueInput
  }

  /**
   * messages updateMany
   */
  export type messagesUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update messages.
     */
    data: XOR<messagesUpdateManyMutationInput, messagesUncheckedUpdateManyInput>
    /**
     * Filter which messages to update
     */
    where?: messagesWhereInput
    /**
     * Limit how many messages to update.
     */
    limit?: number
  }

  /**
   * messages updateManyAndReturn
   */
  export type messagesUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the messages
     */
    select?: messagesSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the messages
     */
    omit?: messagesOmit<ExtArgs> | null
    /**
     * The data used to update messages.
     */
    data: XOR<messagesUpdateManyMutationInput, messagesUncheckedUpdateManyInput>
    /**
     * Filter which messages to update
     */
    where?: messagesWhereInput
    /**
     * Limit how many messages to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: messagesIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * messages upsert
   */
  export type messagesUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the messages
     */
    select?: messagesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the messages
     */
    omit?: messagesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: messagesInclude<ExtArgs> | null
    /**
     * The filter to search for the messages to update in case it exists.
     */
    where: messagesWhereUniqueInput
    /**
     * In case the messages found by the `where` argument doesn't exist, create a new messages with this data.
     */
    create: XOR<messagesCreateInput, messagesUncheckedCreateInput>
    /**
     * In case the messages was found with the provided `where` argument, update it with this data.
     */
    update: XOR<messagesUpdateInput, messagesUncheckedUpdateInput>
  }

  /**
   * messages delete
   */
  export type messagesDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the messages
     */
    select?: messagesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the messages
     */
    omit?: messagesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: messagesInclude<ExtArgs> | null
    /**
     * Filter which messages to delete.
     */
    where: messagesWhereUniqueInput
  }

  /**
   * messages deleteMany
   */
  export type messagesDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which messages to delete
     */
    where?: messagesWhereInput
    /**
     * Limit how many messages to delete.
     */
    limit?: number
  }

  /**
   * messages without action
   */
  export type messagesDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the messages
     */
    select?: messagesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the messages
     */
    omit?: messagesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: messagesInclude<ExtArgs> | null
  }


  /**
   * Model notifications
   */

  export type AggregateNotifications = {
    _count: NotificationsCountAggregateOutputType | null
    _min: NotificationsMinAggregateOutputType | null
    _max: NotificationsMaxAggregateOutputType | null
  }

  export type NotificationsMinAggregateOutputType = {
    id: string | null
    message: string | null
    created_at: Date | null
    read_status: boolean | null
    user_id: string | null
  }

  export type NotificationsMaxAggregateOutputType = {
    id: string | null
    message: string | null
    created_at: Date | null
    read_status: boolean | null
    user_id: string | null
  }

  export type NotificationsCountAggregateOutputType = {
    id: number
    message: number
    created_at: number
    read_status: number
    user_id: number
    _all: number
  }


  export type NotificationsMinAggregateInputType = {
    id?: true
    message?: true
    created_at?: true
    read_status?: true
    user_id?: true
  }

  export type NotificationsMaxAggregateInputType = {
    id?: true
    message?: true
    created_at?: true
    read_status?: true
    user_id?: true
  }

  export type NotificationsCountAggregateInputType = {
    id?: true
    message?: true
    created_at?: true
    read_status?: true
    user_id?: true
    _all?: true
  }

  export type NotificationsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which notifications to aggregate.
     */
    where?: notificationsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of notifications to fetch.
     */
    orderBy?: notificationsOrderByWithRelationInput | notificationsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: notificationsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` notifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` notifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned notifications
    **/
    _count?: true | NotificationsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: NotificationsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: NotificationsMaxAggregateInputType
  }

  export type GetNotificationsAggregateType<T extends NotificationsAggregateArgs> = {
        [P in keyof T & keyof AggregateNotifications]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateNotifications[P]>
      : GetScalarType<T[P], AggregateNotifications[P]>
  }




  export type notificationsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: notificationsWhereInput
    orderBy?: notificationsOrderByWithAggregationInput | notificationsOrderByWithAggregationInput[]
    by: NotificationsScalarFieldEnum[] | NotificationsScalarFieldEnum
    having?: notificationsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: NotificationsCountAggregateInputType | true
    _min?: NotificationsMinAggregateInputType
    _max?: NotificationsMaxAggregateInputType
  }

  export type NotificationsGroupByOutputType = {
    id: string
    message: string
    created_at: Date | null
    read_status: boolean | null
    user_id: string
    _count: NotificationsCountAggregateOutputType | null
    _min: NotificationsMinAggregateOutputType | null
    _max: NotificationsMaxAggregateOutputType | null
  }

  type GetNotificationsGroupByPayload<T extends notificationsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<NotificationsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof NotificationsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], NotificationsGroupByOutputType[P]>
            : GetScalarType<T[P], NotificationsGroupByOutputType[P]>
        }
      >
    >


  export type notificationsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    message?: boolean
    created_at?: boolean
    read_status?: boolean
    user_id?: boolean
    users?: boolean | usersDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["notifications"]>

  export type notificationsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    message?: boolean
    created_at?: boolean
    read_status?: boolean
    user_id?: boolean
    users?: boolean | usersDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["notifications"]>

  export type notificationsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    message?: boolean
    created_at?: boolean
    read_status?: boolean
    user_id?: boolean
    users?: boolean | usersDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["notifications"]>

  export type notificationsSelectScalar = {
    id?: boolean
    message?: boolean
    created_at?: boolean
    read_status?: boolean
    user_id?: boolean
  }

  export type notificationsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "message" | "created_at" | "read_status" | "user_id", ExtArgs["result"]["notifications"]>
  export type notificationsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users?: boolean | usersDefaultArgs<ExtArgs>
  }
  export type notificationsIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users?: boolean | usersDefaultArgs<ExtArgs>
  }
  export type notificationsIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users?: boolean | usersDefaultArgs<ExtArgs>
  }

  export type $notificationsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "notifications"
    objects: {
      users: Prisma.$usersPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      message: string
      created_at: Date | null
      read_status: boolean | null
      user_id: string
    }, ExtArgs["result"]["notifications"]>
    composites: {}
  }

  type notificationsGetPayload<S extends boolean | null | undefined | notificationsDefaultArgs> = $Result.GetResult<Prisma.$notificationsPayload, S>

  type notificationsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<notificationsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: NotificationsCountAggregateInputType | true
    }

  export interface notificationsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['notifications'], meta: { name: 'notifications' } }
    /**
     * Find zero or one Notifications that matches the filter.
     * @param {notificationsFindUniqueArgs} args - Arguments to find a Notifications
     * @example
     * // Get one Notifications
     * const notifications = await prisma.notifications.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends notificationsFindUniqueArgs>(args: SelectSubset<T, notificationsFindUniqueArgs<ExtArgs>>): Prisma__notificationsClient<$Result.GetResult<Prisma.$notificationsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Notifications that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {notificationsFindUniqueOrThrowArgs} args - Arguments to find a Notifications
     * @example
     * // Get one Notifications
     * const notifications = await prisma.notifications.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends notificationsFindUniqueOrThrowArgs>(args: SelectSubset<T, notificationsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__notificationsClient<$Result.GetResult<Prisma.$notificationsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Notifications that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {notificationsFindFirstArgs} args - Arguments to find a Notifications
     * @example
     * // Get one Notifications
     * const notifications = await prisma.notifications.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends notificationsFindFirstArgs>(args?: SelectSubset<T, notificationsFindFirstArgs<ExtArgs>>): Prisma__notificationsClient<$Result.GetResult<Prisma.$notificationsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Notifications that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {notificationsFindFirstOrThrowArgs} args - Arguments to find a Notifications
     * @example
     * // Get one Notifications
     * const notifications = await prisma.notifications.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends notificationsFindFirstOrThrowArgs>(args?: SelectSubset<T, notificationsFindFirstOrThrowArgs<ExtArgs>>): Prisma__notificationsClient<$Result.GetResult<Prisma.$notificationsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Notifications that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {notificationsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Notifications
     * const notifications = await prisma.notifications.findMany()
     * 
     * // Get first 10 Notifications
     * const notifications = await prisma.notifications.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const notificationsWithIdOnly = await prisma.notifications.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends notificationsFindManyArgs>(args?: SelectSubset<T, notificationsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$notificationsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Notifications.
     * @param {notificationsCreateArgs} args - Arguments to create a Notifications.
     * @example
     * // Create one Notifications
     * const Notifications = await prisma.notifications.create({
     *   data: {
     *     // ... data to create a Notifications
     *   }
     * })
     * 
     */
    create<T extends notificationsCreateArgs>(args: SelectSubset<T, notificationsCreateArgs<ExtArgs>>): Prisma__notificationsClient<$Result.GetResult<Prisma.$notificationsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Notifications.
     * @param {notificationsCreateManyArgs} args - Arguments to create many Notifications.
     * @example
     * // Create many Notifications
     * const notifications = await prisma.notifications.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends notificationsCreateManyArgs>(args?: SelectSubset<T, notificationsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Notifications and returns the data saved in the database.
     * @param {notificationsCreateManyAndReturnArgs} args - Arguments to create many Notifications.
     * @example
     * // Create many Notifications
     * const notifications = await prisma.notifications.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Notifications and only return the `id`
     * const notificationsWithIdOnly = await prisma.notifications.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends notificationsCreateManyAndReturnArgs>(args?: SelectSubset<T, notificationsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$notificationsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Notifications.
     * @param {notificationsDeleteArgs} args - Arguments to delete one Notifications.
     * @example
     * // Delete one Notifications
     * const Notifications = await prisma.notifications.delete({
     *   where: {
     *     // ... filter to delete one Notifications
     *   }
     * })
     * 
     */
    delete<T extends notificationsDeleteArgs>(args: SelectSubset<T, notificationsDeleteArgs<ExtArgs>>): Prisma__notificationsClient<$Result.GetResult<Prisma.$notificationsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Notifications.
     * @param {notificationsUpdateArgs} args - Arguments to update one Notifications.
     * @example
     * // Update one Notifications
     * const notifications = await prisma.notifications.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends notificationsUpdateArgs>(args: SelectSubset<T, notificationsUpdateArgs<ExtArgs>>): Prisma__notificationsClient<$Result.GetResult<Prisma.$notificationsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Notifications.
     * @param {notificationsDeleteManyArgs} args - Arguments to filter Notifications to delete.
     * @example
     * // Delete a few Notifications
     * const { count } = await prisma.notifications.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends notificationsDeleteManyArgs>(args?: SelectSubset<T, notificationsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Notifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {notificationsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Notifications
     * const notifications = await prisma.notifications.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends notificationsUpdateManyArgs>(args: SelectSubset<T, notificationsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Notifications and returns the data updated in the database.
     * @param {notificationsUpdateManyAndReturnArgs} args - Arguments to update many Notifications.
     * @example
     * // Update many Notifications
     * const notifications = await prisma.notifications.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Notifications and only return the `id`
     * const notificationsWithIdOnly = await prisma.notifications.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends notificationsUpdateManyAndReturnArgs>(args: SelectSubset<T, notificationsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$notificationsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Notifications.
     * @param {notificationsUpsertArgs} args - Arguments to update or create a Notifications.
     * @example
     * // Update or create a Notifications
     * const notifications = await prisma.notifications.upsert({
     *   create: {
     *     // ... data to create a Notifications
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Notifications we want to update
     *   }
     * })
     */
    upsert<T extends notificationsUpsertArgs>(args: SelectSubset<T, notificationsUpsertArgs<ExtArgs>>): Prisma__notificationsClient<$Result.GetResult<Prisma.$notificationsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Notifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {notificationsCountArgs} args - Arguments to filter Notifications to count.
     * @example
     * // Count the number of Notifications
     * const count = await prisma.notifications.count({
     *   where: {
     *     // ... the filter for the Notifications we want to count
     *   }
     * })
    **/
    count<T extends notificationsCountArgs>(
      args?: Subset<T, notificationsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], NotificationsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Notifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends NotificationsAggregateArgs>(args: Subset<T, NotificationsAggregateArgs>): Prisma.PrismaPromise<GetNotificationsAggregateType<T>>

    /**
     * Group by Notifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {notificationsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends notificationsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: notificationsGroupByArgs['orderBy'] }
        : { orderBy?: notificationsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, notificationsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetNotificationsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the notifications model
   */
  readonly fields: notificationsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for notifications.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__notificationsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    users<T extends usersDefaultArgs<ExtArgs> = {}>(args?: Subset<T, usersDefaultArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the notifications model
   */
  interface notificationsFieldRefs {
    readonly id: FieldRef<"notifications", 'String'>
    readonly message: FieldRef<"notifications", 'String'>
    readonly created_at: FieldRef<"notifications", 'DateTime'>
    readonly read_status: FieldRef<"notifications", 'Boolean'>
    readonly user_id: FieldRef<"notifications", 'String'>
  }
    

  // Custom InputTypes
  /**
   * notifications findUnique
   */
  export type notificationsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the notifications
     */
    select?: notificationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the notifications
     */
    omit?: notificationsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: notificationsInclude<ExtArgs> | null
    /**
     * Filter, which notifications to fetch.
     */
    where: notificationsWhereUniqueInput
  }

  /**
   * notifications findUniqueOrThrow
   */
  export type notificationsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the notifications
     */
    select?: notificationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the notifications
     */
    omit?: notificationsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: notificationsInclude<ExtArgs> | null
    /**
     * Filter, which notifications to fetch.
     */
    where: notificationsWhereUniqueInput
  }

  /**
   * notifications findFirst
   */
  export type notificationsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the notifications
     */
    select?: notificationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the notifications
     */
    omit?: notificationsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: notificationsInclude<ExtArgs> | null
    /**
     * Filter, which notifications to fetch.
     */
    where?: notificationsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of notifications to fetch.
     */
    orderBy?: notificationsOrderByWithRelationInput | notificationsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for notifications.
     */
    cursor?: notificationsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` notifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` notifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of notifications.
     */
    distinct?: NotificationsScalarFieldEnum | NotificationsScalarFieldEnum[]
  }

  /**
   * notifications findFirstOrThrow
   */
  export type notificationsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the notifications
     */
    select?: notificationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the notifications
     */
    omit?: notificationsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: notificationsInclude<ExtArgs> | null
    /**
     * Filter, which notifications to fetch.
     */
    where?: notificationsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of notifications to fetch.
     */
    orderBy?: notificationsOrderByWithRelationInput | notificationsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for notifications.
     */
    cursor?: notificationsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` notifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` notifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of notifications.
     */
    distinct?: NotificationsScalarFieldEnum | NotificationsScalarFieldEnum[]
  }

  /**
   * notifications findMany
   */
  export type notificationsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the notifications
     */
    select?: notificationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the notifications
     */
    omit?: notificationsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: notificationsInclude<ExtArgs> | null
    /**
     * Filter, which notifications to fetch.
     */
    where?: notificationsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of notifications to fetch.
     */
    orderBy?: notificationsOrderByWithRelationInput | notificationsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing notifications.
     */
    cursor?: notificationsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` notifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` notifications.
     */
    skip?: number
    distinct?: NotificationsScalarFieldEnum | NotificationsScalarFieldEnum[]
  }

  /**
   * notifications create
   */
  export type notificationsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the notifications
     */
    select?: notificationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the notifications
     */
    omit?: notificationsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: notificationsInclude<ExtArgs> | null
    /**
     * The data needed to create a notifications.
     */
    data: XOR<notificationsCreateInput, notificationsUncheckedCreateInput>
  }

  /**
   * notifications createMany
   */
  export type notificationsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many notifications.
     */
    data: notificationsCreateManyInput | notificationsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * notifications createManyAndReturn
   */
  export type notificationsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the notifications
     */
    select?: notificationsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the notifications
     */
    omit?: notificationsOmit<ExtArgs> | null
    /**
     * The data used to create many notifications.
     */
    data: notificationsCreateManyInput | notificationsCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: notificationsIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * notifications update
   */
  export type notificationsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the notifications
     */
    select?: notificationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the notifications
     */
    omit?: notificationsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: notificationsInclude<ExtArgs> | null
    /**
     * The data needed to update a notifications.
     */
    data: XOR<notificationsUpdateInput, notificationsUncheckedUpdateInput>
    /**
     * Choose, which notifications to update.
     */
    where: notificationsWhereUniqueInput
  }

  /**
   * notifications updateMany
   */
  export type notificationsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update notifications.
     */
    data: XOR<notificationsUpdateManyMutationInput, notificationsUncheckedUpdateManyInput>
    /**
     * Filter which notifications to update
     */
    where?: notificationsWhereInput
    /**
     * Limit how many notifications to update.
     */
    limit?: number
  }

  /**
   * notifications updateManyAndReturn
   */
  export type notificationsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the notifications
     */
    select?: notificationsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the notifications
     */
    omit?: notificationsOmit<ExtArgs> | null
    /**
     * The data used to update notifications.
     */
    data: XOR<notificationsUpdateManyMutationInput, notificationsUncheckedUpdateManyInput>
    /**
     * Filter which notifications to update
     */
    where?: notificationsWhereInput
    /**
     * Limit how many notifications to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: notificationsIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * notifications upsert
   */
  export type notificationsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the notifications
     */
    select?: notificationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the notifications
     */
    omit?: notificationsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: notificationsInclude<ExtArgs> | null
    /**
     * The filter to search for the notifications to update in case it exists.
     */
    where: notificationsWhereUniqueInput
    /**
     * In case the notifications found by the `where` argument doesn't exist, create a new notifications with this data.
     */
    create: XOR<notificationsCreateInput, notificationsUncheckedCreateInput>
    /**
     * In case the notifications was found with the provided `where` argument, update it with this data.
     */
    update: XOR<notificationsUpdateInput, notificationsUncheckedUpdateInput>
  }

  /**
   * notifications delete
   */
  export type notificationsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the notifications
     */
    select?: notificationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the notifications
     */
    omit?: notificationsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: notificationsInclude<ExtArgs> | null
    /**
     * Filter which notifications to delete.
     */
    where: notificationsWhereUniqueInput
  }

  /**
   * notifications deleteMany
   */
  export type notificationsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which notifications to delete
     */
    where?: notificationsWhereInput
    /**
     * Limit how many notifications to delete.
     */
    limit?: number
  }

  /**
   * notifications without action
   */
  export type notificationsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the notifications
     */
    select?: notificationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the notifications
     */
    omit?: notificationsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: notificationsInclude<ExtArgs> | null
  }


  /**
   * Model publication_files
   */

  export type AggregatePublication_files = {
    _count: Publication_filesCountAggregateOutputType | null
    _min: Publication_filesMinAggregateOutputType | null
    _max: Publication_filesMaxAggregateOutputType | null
  }

  export type Publication_filesMinAggregateOutputType = {
    id: string | null
    file_type: string | null
    file_path: string | null
    publication_id: string | null
  }

  export type Publication_filesMaxAggregateOutputType = {
    id: string | null
    file_type: string | null
    file_path: string | null
    publication_id: string | null
  }

  export type Publication_filesCountAggregateOutputType = {
    id: number
    file_type: number
    file_path: number
    publication_id: number
    _all: number
  }


  export type Publication_filesMinAggregateInputType = {
    id?: true
    file_type?: true
    file_path?: true
    publication_id?: true
  }

  export type Publication_filesMaxAggregateInputType = {
    id?: true
    file_type?: true
    file_path?: true
    publication_id?: true
  }

  export type Publication_filesCountAggregateInputType = {
    id?: true
    file_type?: true
    file_path?: true
    publication_id?: true
    _all?: true
  }

  export type Publication_filesAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which publication_files to aggregate.
     */
    where?: publication_filesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of publication_files to fetch.
     */
    orderBy?: publication_filesOrderByWithRelationInput | publication_filesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: publication_filesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` publication_files from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` publication_files.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned publication_files
    **/
    _count?: true | Publication_filesCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Publication_filesMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Publication_filesMaxAggregateInputType
  }

  export type GetPublication_filesAggregateType<T extends Publication_filesAggregateArgs> = {
        [P in keyof T & keyof AggregatePublication_files]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePublication_files[P]>
      : GetScalarType<T[P], AggregatePublication_files[P]>
  }




  export type publication_filesGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: publication_filesWhereInput
    orderBy?: publication_filesOrderByWithAggregationInput | publication_filesOrderByWithAggregationInput[]
    by: Publication_filesScalarFieldEnum[] | Publication_filesScalarFieldEnum
    having?: publication_filesScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Publication_filesCountAggregateInputType | true
    _min?: Publication_filesMinAggregateInputType
    _max?: Publication_filesMaxAggregateInputType
  }

  export type Publication_filesGroupByOutputType = {
    id: string
    file_type: string
    file_path: string
    publication_id: string
    _count: Publication_filesCountAggregateOutputType | null
    _min: Publication_filesMinAggregateOutputType | null
    _max: Publication_filesMaxAggregateOutputType | null
  }

  type GetPublication_filesGroupByPayload<T extends publication_filesGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Publication_filesGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Publication_filesGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Publication_filesGroupByOutputType[P]>
            : GetScalarType<T[P], Publication_filesGroupByOutputType[P]>
        }
      >
    >


  export type publication_filesSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    file_type?: boolean
    file_path?: boolean
    publication_id?: boolean
    publications?: boolean | publicationsDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["publication_files"]>

  export type publication_filesSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    file_type?: boolean
    file_path?: boolean
    publication_id?: boolean
    publications?: boolean | publicationsDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["publication_files"]>

  export type publication_filesSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    file_type?: boolean
    file_path?: boolean
    publication_id?: boolean
    publications?: boolean | publicationsDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["publication_files"]>

  export type publication_filesSelectScalar = {
    id?: boolean
    file_type?: boolean
    file_path?: boolean
    publication_id?: boolean
  }

  export type publication_filesOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "file_type" | "file_path" | "publication_id", ExtArgs["result"]["publication_files"]>
  export type publication_filesInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    publications?: boolean | publicationsDefaultArgs<ExtArgs>
  }
  export type publication_filesIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    publications?: boolean | publicationsDefaultArgs<ExtArgs>
  }
  export type publication_filesIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    publications?: boolean | publicationsDefaultArgs<ExtArgs>
  }

  export type $publication_filesPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "publication_files"
    objects: {
      publications: Prisma.$publicationsPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      file_type: string
      file_path: string
      publication_id: string
    }, ExtArgs["result"]["publication_files"]>
    composites: {}
  }

  type publication_filesGetPayload<S extends boolean | null | undefined | publication_filesDefaultArgs> = $Result.GetResult<Prisma.$publication_filesPayload, S>

  type publication_filesCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<publication_filesFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Publication_filesCountAggregateInputType | true
    }

  export interface publication_filesDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['publication_files'], meta: { name: 'publication_files' } }
    /**
     * Find zero or one Publication_files that matches the filter.
     * @param {publication_filesFindUniqueArgs} args - Arguments to find a Publication_files
     * @example
     * // Get one Publication_files
     * const publication_files = await prisma.publication_files.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends publication_filesFindUniqueArgs>(args: SelectSubset<T, publication_filesFindUniqueArgs<ExtArgs>>): Prisma__publication_filesClient<$Result.GetResult<Prisma.$publication_filesPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Publication_files that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {publication_filesFindUniqueOrThrowArgs} args - Arguments to find a Publication_files
     * @example
     * // Get one Publication_files
     * const publication_files = await prisma.publication_files.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends publication_filesFindUniqueOrThrowArgs>(args: SelectSubset<T, publication_filesFindUniqueOrThrowArgs<ExtArgs>>): Prisma__publication_filesClient<$Result.GetResult<Prisma.$publication_filesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Publication_files that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {publication_filesFindFirstArgs} args - Arguments to find a Publication_files
     * @example
     * // Get one Publication_files
     * const publication_files = await prisma.publication_files.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends publication_filesFindFirstArgs>(args?: SelectSubset<T, publication_filesFindFirstArgs<ExtArgs>>): Prisma__publication_filesClient<$Result.GetResult<Prisma.$publication_filesPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Publication_files that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {publication_filesFindFirstOrThrowArgs} args - Arguments to find a Publication_files
     * @example
     * // Get one Publication_files
     * const publication_files = await prisma.publication_files.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends publication_filesFindFirstOrThrowArgs>(args?: SelectSubset<T, publication_filesFindFirstOrThrowArgs<ExtArgs>>): Prisma__publication_filesClient<$Result.GetResult<Prisma.$publication_filesPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Publication_files that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {publication_filesFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Publication_files
     * const publication_files = await prisma.publication_files.findMany()
     * 
     * // Get first 10 Publication_files
     * const publication_files = await prisma.publication_files.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const publication_filesWithIdOnly = await prisma.publication_files.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends publication_filesFindManyArgs>(args?: SelectSubset<T, publication_filesFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$publication_filesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Publication_files.
     * @param {publication_filesCreateArgs} args - Arguments to create a Publication_files.
     * @example
     * // Create one Publication_files
     * const Publication_files = await prisma.publication_files.create({
     *   data: {
     *     // ... data to create a Publication_files
     *   }
     * })
     * 
     */
    create<T extends publication_filesCreateArgs>(args: SelectSubset<T, publication_filesCreateArgs<ExtArgs>>): Prisma__publication_filesClient<$Result.GetResult<Prisma.$publication_filesPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Publication_files.
     * @param {publication_filesCreateManyArgs} args - Arguments to create many Publication_files.
     * @example
     * // Create many Publication_files
     * const publication_files = await prisma.publication_files.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends publication_filesCreateManyArgs>(args?: SelectSubset<T, publication_filesCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Publication_files and returns the data saved in the database.
     * @param {publication_filesCreateManyAndReturnArgs} args - Arguments to create many Publication_files.
     * @example
     * // Create many Publication_files
     * const publication_files = await prisma.publication_files.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Publication_files and only return the `id`
     * const publication_filesWithIdOnly = await prisma.publication_files.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends publication_filesCreateManyAndReturnArgs>(args?: SelectSubset<T, publication_filesCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$publication_filesPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Publication_files.
     * @param {publication_filesDeleteArgs} args - Arguments to delete one Publication_files.
     * @example
     * // Delete one Publication_files
     * const Publication_files = await prisma.publication_files.delete({
     *   where: {
     *     // ... filter to delete one Publication_files
     *   }
     * })
     * 
     */
    delete<T extends publication_filesDeleteArgs>(args: SelectSubset<T, publication_filesDeleteArgs<ExtArgs>>): Prisma__publication_filesClient<$Result.GetResult<Prisma.$publication_filesPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Publication_files.
     * @param {publication_filesUpdateArgs} args - Arguments to update one Publication_files.
     * @example
     * // Update one Publication_files
     * const publication_files = await prisma.publication_files.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends publication_filesUpdateArgs>(args: SelectSubset<T, publication_filesUpdateArgs<ExtArgs>>): Prisma__publication_filesClient<$Result.GetResult<Prisma.$publication_filesPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Publication_files.
     * @param {publication_filesDeleteManyArgs} args - Arguments to filter Publication_files to delete.
     * @example
     * // Delete a few Publication_files
     * const { count } = await prisma.publication_files.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends publication_filesDeleteManyArgs>(args?: SelectSubset<T, publication_filesDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Publication_files.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {publication_filesUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Publication_files
     * const publication_files = await prisma.publication_files.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends publication_filesUpdateManyArgs>(args: SelectSubset<T, publication_filesUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Publication_files and returns the data updated in the database.
     * @param {publication_filesUpdateManyAndReturnArgs} args - Arguments to update many Publication_files.
     * @example
     * // Update many Publication_files
     * const publication_files = await prisma.publication_files.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Publication_files and only return the `id`
     * const publication_filesWithIdOnly = await prisma.publication_files.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends publication_filesUpdateManyAndReturnArgs>(args: SelectSubset<T, publication_filesUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$publication_filesPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Publication_files.
     * @param {publication_filesUpsertArgs} args - Arguments to update or create a Publication_files.
     * @example
     * // Update or create a Publication_files
     * const publication_files = await prisma.publication_files.upsert({
     *   create: {
     *     // ... data to create a Publication_files
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Publication_files we want to update
     *   }
     * })
     */
    upsert<T extends publication_filesUpsertArgs>(args: SelectSubset<T, publication_filesUpsertArgs<ExtArgs>>): Prisma__publication_filesClient<$Result.GetResult<Prisma.$publication_filesPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Publication_files.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {publication_filesCountArgs} args - Arguments to filter Publication_files to count.
     * @example
     * // Count the number of Publication_files
     * const count = await prisma.publication_files.count({
     *   where: {
     *     // ... the filter for the Publication_files we want to count
     *   }
     * })
    **/
    count<T extends publication_filesCountArgs>(
      args?: Subset<T, publication_filesCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Publication_filesCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Publication_files.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Publication_filesAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Publication_filesAggregateArgs>(args: Subset<T, Publication_filesAggregateArgs>): Prisma.PrismaPromise<GetPublication_filesAggregateType<T>>

    /**
     * Group by Publication_files.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {publication_filesGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends publication_filesGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: publication_filesGroupByArgs['orderBy'] }
        : { orderBy?: publication_filesGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, publication_filesGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPublication_filesGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the publication_files model
   */
  readonly fields: publication_filesFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for publication_files.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__publication_filesClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    publications<T extends publicationsDefaultArgs<ExtArgs> = {}>(args?: Subset<T, publicationsDefaultArgs<ExtArgs>>): Prisma__publicationsClient<$Result.GetResult<Prisma.$publicationsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the publication_files model
   */
  interface publication_filesFieldRefs {
    readonly id: FieldRef<"publication_files", 'String'>
    readonly file_type: FieldRef<"publication_files", 'String'>
    readonly file_path: FieldRef<"publication_files", 'String'>
    readonly publication_id: FieldRef<"publication_files", 'String'>
  }
    

  // Custom InputTypes
  /**
   * publication_files findUnique
   */
  export type publication_filesFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the publication_files
     */
    select?: publication_filesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the publication_files
     */
    omit?: publication_filesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: publication_filesInclude<ExtArgs> | null
    /**
     * Filter, which publication_files to fetch.
     */
    where: publication_filesWhereUniqueInput
  }

  /**
   * publication_files findUniqueOrThrow
   */
  export type publication_filesFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the publication_files
     */
    select?: publication_filesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the publication_files
     */
    omit?: publication_filesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: publication_filesInclude<ExtArgs> | null
    /**
     * Filter, which publication_files to fetch.
     */
    where: publication_filesWhereUniqueInput
  }

  /**
   * publication_files findFirst
   */
  export type publication_filesFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the publication_files
     */
    select?: publication_filesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the publication_files
     */
    omit?: publication_filesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: publication_filesInclude<ExtArgs> | null
    /**
     * Filter, which publication_files to fetch.
     */
    where?: publication_filesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of publication_files to fetch.
     */
    orderBy?: publication_filesOrderByWithRelationInput | publication_filesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for publication_files.
     */
    cursor?: publication_filesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` publication_files from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` publication_files.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of publication_files.
     */
    distinct?: Publication_filesScalarFieldEnum | Publication_filesScalarFieldEnum[]
  }

  /**
   * publication_files findFirstOrThrow
   */
  export type publication_filesFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the publication_files
     */
    select?: publication_filesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the publication_files
     */
    omit?: publication_filesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: publication_filesInclude<ExtArgs> | null
    /**
     * Filter, which publication_files to fetch.
     */
    where?: publication_filesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of publication_files to fetch.
     */
    orderBy?: publication_filesOrderByWithRelationInput | publication_filesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for publication_files.
     */
    cursor?: publication_filesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` publication_files from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` publication_files.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of publication_files.
     */
    distinct?: Publication_filesScalarFieldEnum | Publication_filesScalarFieldEnum[]
  }

  /**
   * publication_files findMany
   */
  export type publication_filesFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the publication_files
     */
    select?: publication_filesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the publication_files
     */
    omit?: publication_filesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: publication_filesInclude<ExtArgs> | null
    /**
     * Filter, which publication_files to fetch.
     */
    where?: publication_filesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of publication_files to fetch.
     */
    orderBy?: publication_filesOrderByWithRelationInput | publication_filesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing publication_files.
     */
    cursor?: publication_filesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` publication_files from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` publication_files.
     */
    skip?: number
    distinct?: Publication_filesScalarFieldEnum | Publication_filesScalarFieldEnum[]
  }

  /**
   * publication_files create
   */
  export type publication_filesCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the publication_files
     */
    select?: publication_filesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the publication_files
     */
    omit?: publication_filesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: publication_filesInclude<ExtArgs> | null
    /**
     * The data needed to create a publication_files.
     */
    data: XOR<publication_filesCreateInput, publication_filesUncheckedCreateInput>
  }

  /**
   * publication_files createMany
   */
  export type publication_filesCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many publication_files.
     */
    data: publication_filesCreateManyInput | publication_filesCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * publication_files createManyAndReturn
   */
  export type publication_filesCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the publication_files
     */
    select?: publication_filesSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the publication_files
     */
    omit?: publication_filesOmit<ExtArgs> | null
    /**
     * The data used to create many publication_files.
     */
    data: publication_filesCreateManyInput | publication_filesCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: publication_filesIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * publication_files update
   */
  export type publication_filesUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the publication_files
     */
    select?: publication_filesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the publication_files
     */
    omit?: publication_filesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: publication_filesInclude<ExtArgs> | null
    /**
     * The data needed to update a publication_files.
     */
    data: XOR<publication_filesUpdateInput, publication_filesUncheckedUpdateInput>
    /**
     * Choose, which publication_files to update.
     */
    where: publication_filesWhereUniqueInput
  }

  /**
   * publication_files updateMany
   */
  export type publication_filesUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update publication_files.
     */
    data: XOR<publication_filesUpdateManyMutationInput, publication_filesUncheckedUpdateManyInput>
    /**
     * Filter which publication_files to update
     */
    where?: publication_filesWhereInput
    /**
     * Limit how many publication_files to update.
     */
    limit?: number
  }

  /**
   * publication_files updateManyAndReturn
   */
  export type publication_filesUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the publication_files
     */
    select?: publication_filesSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the publication_files
     */
    omit?: publication_filesOmit<ExtArgs> | null
    /**
     * The data used to update publication_files.
     */
    data: XOR<publication_filesUpdateManyMutationInput, publication_filesUncheckedUpdateManyInput>
    /**
     * Filter which publication_files to update
     */
    where?: publication_filesWhereInput
    /**
     * Limit how many publication_files to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: publication_filesIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * publication_files upsert
   */
  export type publication_filesUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the publication_files
     */
    select?: publication_filesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the publication_files
     */
    omit?: publication_filesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: publication_filesInclude<ExtArgs> | null
    /**
     * The filter to search for the publication_files to update in case it exists.
     */
    where: publication_filesWhereUniqueInput
    /**
     * In case the publication_files found by the `where` argument doesn't exist, create a new publication_files with this data.
     */
    create: XOR<publication_filesCreateInput, publication_filesUncheckedCreateInput>
    /**
     * In case the publication_files was found with the provided `where` argument, update it with this data.
     */
    update: XOR<publication_filesUpdateInput, publication_filesUncheckedUpdateInput>
  }

  /**
   * publication_files delete
   */
  export type publication_filesDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the publication_files
     */
    select?: publication_filesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the publication_files
     */
    omit?: publication_filesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: publication_filesInclude<ExtArgs> | null
    /**
     * Filter which publication_files to delete.
     */
    where: publication_filesWhereUniqueInput
  }

  /**
   * publication_files deleteMany
   */
  export type publication_filesDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which publication_files to delete
     */
    where?: publication_filesWhereInput
    /**
     * Limit how many publication_files to delete.
     */
    limit?: number
  }

  /**
   * publication_files without action
   */
  export type publication_filesDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the publication_files
     */
    select?: publication_filesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the publication_files
     */
    omit?: publication_filesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: publication_filesInclude<ExtArgs> | null
  }


  /**
   * Model publications
   */

  export type AggregatePublications = {
    _count: PublicationsCountAggregateOutputType | null
    _min: PublicationsMinAggregateOutputType | null
    _max: PublicationsMaxAggregateOutputType | null
  }

  export type PublicationsMinAggregateOutputType = {
    id: string | null
    title: string | null
    journal: string | null
    status: string | null
    visibility: string | null
    submitter_id: string | null
    conference_id: string | null
    submitted_at: Date | null
  }

  export type PublicationsMaxAggregateOutputType = {
    id: string | null
    title: string | null
    journal: string | null
    status: string | null
    visibility: string | null
    submitter_id: string | null
    conference_id: string | null
    submitted_at: Date | null
  }

  export type PublicationsCountAggregateOutputType = {
    id: number
    title: number
    journal: number
    status: number
    visibility: number
    submitter_id: number
    conference_id: number
    submitted_at: number
    _all: number
  }


  export type PublicationsMinAggregateInputType = {
    id?: true
    title?: true
    journal?: true
    status?: true
    visibility?: true
    submitter_id?: true
    conference_id?: true
    submitted_at?: true
  }

  export type PublicationsMaxAggregateInputType = {
    id?: true
    title?: true
    journal?: true
    status?: true
    visibility?: true
    submitter_id?: true
    conference_id?: true
    submitted_at?: true
  }

  export type PublicationsCountAggregateInputType = {
    id?: true
    title?: true
    journal?: true
    status?: true
    visibility?: true
    submitter_id?: true
    conference_id?: true
    submitted_at?: true
    _all?: true
  }

  export type PublicationsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which publications to aggregate.
     */
    where?: publicationsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of publications to fetch.
     */
    orderBy?: publicationsOrderByWithRelationInput | publicationsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: publicationsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` publications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` publications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned publications
    **/
    _count?: true | PublicationsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PublicationsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PublicationsMaxAggregateInputType
  }

  export type GetPublicationsAggregateType<T extends PublicationsAggregateArgs> = {
        [P in keyof T & keyof AggregatePublications]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePublications[P]>
      : GetScalarType<T[P], AggregatePublications[P]>
  }




  export type publicationsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: publicationsWhereInput
    orderBy?: publicationsOrderByWithAggregationInput | publicationsOrderByWithAggregationInput[]
    by: PublicationsScalarFieldEnum[] | PublicationsScalarFieldEnum
    having?: publicationsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PublicationsCountAggregateInputType | true
    _min?: PublicationsMinAggregateInputType
    _max?: PublicationsMaxAggregateInputType
  }

  export type PublicationsGroupByOutputType = {
    id: string
    title: string
    journal: string
    status: string
    visibility: string
    submitter_id: string
    conference_id: string | null
    submitted_at: Date
    _count: PublicationsCountAggregateOutputType | null
    _min: PublicationsMinAggregateOutputType | null
    _max: PublicationsMaxAggregateOutputType | null
  }

  type GetPublicationsGroupByPayload<T extends publicationsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PublicationsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PublicationsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PublicationsGroupByOutputType[P]>
            : GetScalarType<T[P], PublicationsGroupByOutputType[P]>
        }
      >
    >


  export type publicationsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    journal?: boolean
    status?: boolean
    visibility?: boolean
    submitter_id?: boolean
    conference_id?: boolean
    submitted_at?: boolean
    groups?: boolean | publications$groupsArgs<ExtArgs>
    publication_files?: boolean | publications$publication_filesArgs<ExtArgs>
    conferences?: boolean | publications$conferencesArgs<ExtArgs>
    users?: boolean | usersDefaultArgs<ExtArgs>
    _count?: boolean | PublicationsCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["publications"]>

  export type publicationsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    journal?: boolean
    status?: boolean
    visibility?: boolean
    submitter_id?: boolean
    conference_id?: boolean
    submitted_at?: boolean
    conferences?: boolean | publications$conferencesArgs<ExtArgs>
    users?: boolean | usersDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["publications"]>

  export type publicationsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    journal?: boolean
    status?: boolean
    visibility?: boolean
    submitter_id?: boolean
    conference_id?: boolean
    submitted_at?: boolean
    conferences?: boolean | publications$conferencesArgs<ExtArgs>
    users?: boolean | usersDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["publications"]>

  export type publicationsSelectScalar = {
    id?: boolean
    title?: boolean
    journal?: boolean
    status?: boolean
    visibility?: boolean
    submitter_id?: boolean
    conference_id?: boolean
    submitted_at?: boolean
  }

  export type publicationsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "journal" | "status" | "visibility" | "submitter_id" | "conference_id" | "submitted_at", ExtArgs["result"]["publications"]>
  export type publicationsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    groups?: boolean | publications$groupsArgs<ExtArgs>
    publication_files?: boolean | publications$publication_filesArgs<ExtArgs>
    conferences?: boolean | publications$conferencesArgs<ExtArgs>
    users?: boolean | usersDefaultArgs<ExtArgs>
    _count?: boolean | PublicationsCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type publicationsIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    conferences?: boolean | publications$conferencesArgs<ExtArgs>
    users?: boolean | usersDefaultArgs<ExtArgs>
  }
  export type publicationsIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    conferences?: boolean | publications$conferencesArgs<ExtArgs>
    users?: boolean | usersDefaultArgs<ExtArgs>
  }

  export type $publicationsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "publications"
    objects: {
      groups: Prisma.$groupsPayload<ExtArgs>[]
      publication_files: Prisma.$publication_filesPayload<ExtArgs>[]
      conferences: Prisma.$conferencesPayload<ExtArgs> | null
      users: Prisma.$usersPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      title: string
      journal: string
      status: string
      visibility: string
      submitter_id: string
      conference_id: string | null
      submitted_at: Date
    }, ExtArgs["result"]["publications"]>
    composites: {}
  }

  type publicationsGetPayload<S extends boolean | null | undefined | publicationsDefaultArgs> = $Result.GetResult<Prisma.$publicationsPayload, S>

  type publicationsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<publicationsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PublicationsCountAggregateInputType | true
    }

  export interface publicationsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['publications'], meta: { name: 'publications' } }
    /**
     * Find zero or one Publications that matches the filter.
     * @param {publicationsFindUniqueArgs} args - Arguments to find a Publications
     * @example
     * // Get one Publications
     * const publications = await prisma.publications.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends publicationsFindUniqueArgs>(args: SelectSubset<T, publicationsFindUniqueArgs<ExtArgs>>): Prisma__publicationsClient<$Result.GetResult<Prisma.$publicationsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Publications that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {publicationsFindUniqueOrThrowArgs} args - Arguments to find a Publications
     * @example
     * // Get one Publications
     * const publications = await prisma.publications.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends publicationsFindUniqueOrThrowArgs>(args: SelectSubset<T, publicationsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__publicationsClient<$Result.GetResult<Prisma.$publicationsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Publications that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {publicationsFindFirstArgs} args - Arguments to find a Publications
     * @example
     * // Get one Publications
     * const publications = await prisma.publications.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends publicationsFindFirstArgs>(args?: SelectSubset<T, publicationsFindFirstArgs<ExtArgs>>): Prisma__publicationsClient<$Result.GetResult<Prisma.$publicationsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Publications that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {publicationsFindFirstOrThrowArgs} args - Arguments to find a Publications
     * @example
     * // Get one Publications
     * const publications = await prisma.publications.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends publicationsFindFirstOrThrowArgs>(args?: SelectSubset<T, publicationsFindFirstOrThrowArgs<ExtArgs>>): Prisma__publicationsClient<$Result.GetResult<Prisma.$publicationsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Publications that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {publicationsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Publications
     * const publications = await prisma.publications.findMany()
     * 
     * // Get first 10 Publications
     * const publications = await prisma.publications.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const publicationsWithIdOnly = await prisma.publications.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends publicationsFindManyArgs>(args?: SelectSubset<T, publicationsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$publicationsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Publications.
     * @param {publicationsCreateArgs} args - Arguments to create a Publications.
     * @example
     * // Create one Publications
     * const Publications = await prisma.publications.create({
     *   data: {
     *     // ... data to create a Publications
     *   }
     * })
     * 
     */
    create<T extends publicationsCreateArgs>(args: SelectSubset<T, publicationsCreateArgs<ExtArgs>>): Prisma__publicationsClient<$Result.GetResult<Prisma.$publicationsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Publications.
     * @param {publicationsCreateManyArgs} args - Arguments to create many Publications.
     * @example
     * // Create many Publications
     * const publications = await prisma.publications.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends publicationsCreateManyArgs>(args?: SelectSubset<T, publicationsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Publications and returns the data saved in the database.
     * @param {publicationsCreateManyAndReturnArgs} args - Arguments to create many Publications.
     * @example
     * // Create many Publications
     * const publications = await prisma.publications.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Publications and only return the `id`
     * const publicationsWithIdOnly = await prisma.publications.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends publicationsCreateManyAndReturnArgs>(args?: SelectSubset<T, publicationsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$publicationsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Publications.
     * @param {publicationsDeleteArgs} args - Arguments to delete one Publications.
     * @example
     * // Delete one Publications
     * const Publications = await prisma.publications.delete({
     *   where: {
     *     // ... filter to delete one Publications
     *   }
     * })
     * 
     */
    delete<T extends publicationsDeleteArgs>(args: SelectSubset<T, publicationsDeleteArgs<ExtArgs>>): Prisma__publicationsClient<$Result.GetResult<Prisma.$publicationsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Publications.
     * @param {publicationsUpdateArgs} args - Arguments to update one Publications.
     * @example
     * // Update one Publications
     * const publications = await prisma.publications.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends publicationsUpdateArgs>(args: SelectSubset<T, publicationsUpdateArgs<ExtArgs>>): Prisma__publicationsClient<$Result.GetResult<Prisma.$publicationsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Publications.
     * @param {publicationsDeleteManyArgs} args - Arguments to filter Publications to delete.
     * @example
     * // Delete a few Publications
     * const { count } = await prisma.publications.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends publicationsDeleteManyArgs>(args?: SelectSubset<T, publicationsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Publications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {publicationsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Publications
     * const publications = await prisma.publications.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends publicationsUpdateManyArgs>(args: SelectSubset<T, publicationsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Publications and returns the data updated in the database.
     * @param {publicationsUpdateManyAndReturnArgs} args - Arguments to update many Publications.
     * @example
     * // Update many Publications
     * const publications = await prisma.publications.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Publications and only return the `id`
     * const publicationsWithIdOnly = await prisma.publications.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends publicationsUpdateManyAndReturnArgs>(args: SelectSubset<T, publicationsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$publicationsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Publications.
     * @param {publicationsUpsertArgs} args - Arguments to update or create a Publications.
     * @example
     * // Update or create a Publications
     * const publications = await prisma.publications.upsert({
     *   create: {
     *     // ... data to create a Publications
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Publications we want to update
     *   }
     * })
     */
    upsert<T extends publicationsUpsertArgs>(args: SelectSubset<T, publicationsUpsertArgs<ExtArgs>>): Prisma__publicationsClient<$Result.GetResult<Prisma.$publicationsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Publications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {publicationsCountArgs} args - Arguments to filter Publications to count.
     * @example
     * // Count the number of Publications
     * const count = await prisma.publications.count({
     *   where: {
     *     // ... the filter for the Publications we want to count
     *   }
     * })
    **/
    count<T extends publicationsCountArgs>(
      args?: Subset<T, publicationsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PublicationsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Publications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PublicationsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PublicationsAggregateArgs>(args: Subset<T, PublicationsAggregateArgs>): Prisma.PrismaPromise<GetPublicationsAggregateType<T>>

    /**
     * Group by Publications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {publicationsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends publicationsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: publicationsGroupByArgs['orderBy'] }
        : { orderBy?: publicationsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, publicationsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPublicationsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the publications model
   */
  readonly fields: publicationsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for publications.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__publicationsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    groups<T extends publications$groupsArgs<ExtArgs> = {}>(args?: Subset<T, publications$groupsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$groupsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    publication_files<T extends publications$publication_filesArgs<ExtArgs> = {}>(args?: Subset<T, publications$publication_filesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$publication_filesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    conferences<T extends publications$conferencesArgs<ExtArgs> = {}>(args?: Subset<T, publications$conferencesArgs<ExtArgs>>): Prisma__conferencesClient<$Result.GetResult<Prisma.$conferencesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    users<T extends usersDefaultArgs<ExtArgs> = {}>(args?: Subset<T, usersDefaultArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the publications model
   */
  interface publicationsFieldRefs {
    readonly id: FieldRef<"publications", 'String'>
    readonly title: FieldRef<"publications", 'String'>
    readonly journal: FieldRef<"publications", 'String'>
    readonly status: FieldRef<"publications", 'String'>
    readonly visibility: FieldRef<"publications", 'String'>
    readonly submitter_id: FieldRef<"publications", 'String'>
    readonly conference_id: FieldRef<"publications", 'String'>
    readonly submitted_at: FieldRef<"publications", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * publications findUnique
   */
  export type publicationsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the publications
     */
    select?: publicationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the publications
     */
    omit?: publicationsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: publicationsInclude<ExtArgs> | null
    /**
     * Filter, which publications to fetch.
     */
    where: publicationsWhereUniqueInput
  }

  /**
   * publications findUniqueOrThrow
   */
  export type publicationsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the publications
     */
    select?: publicationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the publications
     */
    omit?: publicationsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: publicationsInclude<ExtArgs> | null
    /**
     * Filter, which publications to fetch.
     */
    where: publicationsWhereUniqueInput
  }

  /**
   * publications findFirst
   */
  export type publicationsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the publications
     */
    select?: publicationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the publications
     */
    omit?: publicationsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: publicationsInclude<ExtArgs> | null
    /**
     * Filter, which publications to fetch.
     */
    where?: publicationsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of publications to fetch.
     */
    orderBy?: publicationsOrderByWithRelationInput | publicationsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for publications.
     */
    cursor?: publicationsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` publications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` publications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of publications.
     */
    distinct?: PublicationsScalarFieldEnum | PublicationsScalarFieldEnum[]
  }

  /**
   * publications findFirstOrThrow
   */
  export type publicationsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the publications
     */
    select?: publicationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the publications
     */
    omit?: publicationsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: publicationsInclude<ExtArgs> | null
    /**
     * Filter, which publications to fetch.
     */
    where?: publicationsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of publications to fetch.
     */
    orderBy?: publicationsOrderByWithRelationInput | publicationsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for publications.
     */
    cursor?: publicationsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` publications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` publications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of publications.
     */
    distinct?: PublicationsScalarFieldEnum | PublicationsScalarFieldEnum[]
  }

  /**
   * publications findMany
   */
  export type publicationsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the publications
     */
    select?: publicationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the publications
     */
    omit?: publicationsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: publicationsInclude<ExtArgs> | null
    /**
     * Filter, which publications to fetch.
     */
    where?: publicationsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of publications to fetch.
     */
    orderBy?: publicationsOrderByWithRelationInput | publicationsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing publications.
     */
    cursor?: publicationsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` publications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` publications.
     */
    skip?: number
    distinct?: PublicationsScalarFieldEnum | PublicationsScalarFieldEnum[]
  }

  /**
   * publications create
   */
  export type publicationsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the publications
     */
    select?: publicationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the publications
     */
    omit?: publicationsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: publicationsInclude<ExtArgs> | null
    /**
     * The data needed to create a publications.
     */
    data: XOR<publicationsCreateInput, publicationsUncheckedCreateInput>
  }

  /**
   * publications createMany
   */
  export type publicationsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many publications.
     */
    data: publicationsCreateManyInput | publicationsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * publications createManyAndReturn
   */
  export type publicationsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the publications
     */
    select?: publicationsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the publications
     */
    omit?: publicationsOmit<ExtArgs> | null
    /**
     * The data used to create many publications.
     */
    data: publicationsCreateManyInput | publicationsCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: publicationsIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * publications update
   */
  export type publicationsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the publications
     */
    select?: publicationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the publications
     */
    omit?: publicationsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: publicationsInclude<ExtArgs> | null
    /**
     * The data needed to update a publications.
     */
    data: XOR<publicationsUpdateInput, publicationsUncheckedUpdateInput>
    /**
     * Choose, which publications to update.
     */
    where: publicationsWhereUniqueInput
  }

  /**
   * publications updateMany
   */
  export type publicationsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update publications.
     */
    data: XOR<publicationsUpdateManyMutationInput, publicationsUncheckedUpdateManyInput>
    /**
     * Filter which publications to update
     */
    where?: publicationsWhereInput
    /**
     * Limit how many publications to update.
     */
    limit?: number
  }

  /**
   * publications updateManyAndReturn
   */
  export type publicationsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the publications
     */
    select?: publicationsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the publications
     */
    omit?: publicationsOmit<ExtArgs> | null
    /**
     * The data used to update publications.
     */
    data: XOR<publicationsUpdateManyMutationInput, publicationsUncheckedUpdateManyInput>
    /**
     * Filter which publications to update
     */
    where?: publicationsWhereInput
    /**
     * Limit how many publications to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: publicationsIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * publications upsert
   */
  export type publicationsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the publications
     */
    select?: publicationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the publications
     */
    omit?: publicationsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: publicationsInclude<ExtArgs> | null
    /**
     * The filter to search for the publications to update in case it exists.
     */
    where: publicationsWhereUniqueInput
    /**
     * In case the publications found by the `where` argument doesn't exist, create a new publications with this data.
     */
    create: XOR<publicationsCreateInput, publicationsUncheckedCreateInput>
    /**
     * In case the publications was found with the provided `where` argument, update it with this data.
     */
    update: XOR<publicationsUpdateInput, publicationsUncheckedUpdateInput>
  }

  /**
   * publications delete
   */
  export type publicationsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the publications
     */
    select?: publicationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the publications
     */
    omit?: publicationsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: publicationsInclude<ExtArgs> | null
    /**
     * Filter which publications to delete.
     */
    where: publicationsWhereUniqueInput
  }

  /**
   * publications deleteMany
   */
  export type publicationsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which publications to delete
     */
    where?: publicationsWhereInput
    /**
     * Limit how many publications to delete.
     */
    limit?: number
  }

  /**
   * publications.groups
   */
  export type publications$groupsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the groups
     */
    select?: groupsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the groups
     */
    omit?: groupsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: groupsInclude<ExtArgs> | null
    where?: groupsWhereInput
    orderBy?: groupsOrderByWithRelationInput | groupsOrderByWithRelationInput[]
    cursor?: groupsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: GroupsScalarFieldEnum | GroupsScalarFieldEnum[]
  }

  /**
   * publications.publication_files
   */
  export type publications$publication_filesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the publication_files
     */
    select?: publication_filesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the publication_files
     */
    omit?: publication_filesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: publication_filesInclude<ExtArgs> | null
    where?: publication_filesWhereInput
    orderBy?: publication_filesOrderByWithRelationInput | publication_filesOrderByWithRelationInput[]
    cursor?: publication_filesWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Publication_filesScalarFieldEnum | Publication_filesScalarFieldEnum[]
  }

  /**
   * publications.conferences
   */
  export type publications$conferencesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the conferences
     */
    select?: conferencesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the conferences
     */
    omit?: conferencesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: conferencesInclude<ExtArgs> | null
    where?: conferencesWhereInput
  }

  /**
   * publications without action
   */
  export type publicationsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the publications
     */
    select?: publicationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the publications
     */
    omit?: publicationsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: publicationsInclude<ExtArgs> | null
  }


  /**
   * Model speaker
   */

  export type AggregateSpeaker = {
    _count: SpeakerCountAggregateOutputType | null
    _avg: SpeakerAvgAggregateOutputType | null
    _sum: SpeakerSumAggregateOutputType | null
    _min: SpeakerMinAggregateOutputType | null
    _max: SpeakerMaxAggregateOutputType | null
  }

  export type SpeakerAvgAggregateOutputType = {
    id: number | null
  }

  export type SpeakerSumAggregateOutputType = {
    id: number | null
  }

  export type SpeakerMinAggregateOutputType = {
    id: number | null
    user_id: string | null
    conference_id: string | null
    affiliation: string | null
    title: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type SpeakerMaxAggregateOutputType = {
    id: number | null
    user_id: string | null
    conference_id: string | null
    affiliation: string | null
    title: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type SpeakerCountAggregateOutputType = {
    id: number
    user_id: number
    conference_id: number
    affiliation: number
    title: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type SpeakerAvgAggregateInputType = {
    id?: true
  }

  export type SpeakerSumAggregateInputType = {
    id?: true
  }

  export type SpeakerMinAggregateInputType = {
    id?: true
    user_id?: true
    conference_id?: true
    affiliation?: true
    title?: true
    created_at?: true
    updated_at?: true
  }

  export type SpeakerMaxAggregateInputType = {
    id?: true
    user_id?: true
    conference_id?: true
    affiliation?: true
    title?: true
    created_at?: true
    updated_at?: true
  }

  export type SpeakerCountAggregateInputType = {
    id?: true
    user_id?: true
    conference_id?: true
    affiliation?: true
    title?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type SpeakerAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which speaker to aggregate.
     */
    where?: speakerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of speakers to fetch.
     */
    orderBy?: speakerOrderByWithRelationInput | speakerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: speakerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` speakers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` speakers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned speakers
    **/
    _count?: true | SpeakerCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SpeakerAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SpeakerSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SpeakerMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SpeakerMaxAggregateInputType
  }

  export type GetSpeakerAggregateType<T extends SpeakerAggregateArgs> = {
        [P in keyof T & keyof AggregateSpeaker]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSpeaker[P]>
      : GetScalarType<T[P], AggregateSpeaker[P]>
  }




  export type speakerGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: speakerWhereInput
    orderBy?: speakerOrderByWithAggregationInput | speakerOrderByWithAggregationInput[]
    by: SpeakerScalarFieldEnum[] | SpeakerScalarFieldEnum
    having?: speakerScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SpeakerCountAggregateInputType | true
    _avg?: SpeakerAvgAggregateInputType
    _sum?: SpeakerSumAggregateInputType
    _min?: SpeakerMinAggregateInputType
    _max?: SpeakerMaxAggregateInputType
  }

  export type SpeakerGroupByOutputType = {
    id: number
    user_id: string
    conference_id: string
    affiliation: string | null
    title: string | null
    created_at: Date | null
    updated_at: Date | null
    _count: SpeakerCountAggregateOutputType | null
    _avg: SpeakerAvgAggregateOutputType | null
    _sum: SpeakerSumAggregateOutputType | null
    _min: SpeakerMinAggregateOutputType | null
    _max: SpeakerMaxAggregateOutputType | null
  }

  type GetSpeakerGroupByPayload<T extends speakerGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SpeakerGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SpeakerGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SpeakerGroupByOutputType[P]>
            : GetScalarType<T[P], SpeakerGroupByOutputType[P]>
        }
      >
    >


  export type speakerSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    conference_id?: boolean
    affiliation?: boolean
    title?: boolean
    created_at?: boolean
    updated_at?: boolean
    conferences?: boolean | conferencesDefaultArgs<ExtArgs>
    users?: boolean | usersDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["speaker"]>

  export type speakerSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    conference_id?: boolean
    affiliation?: boolean
    title?: boolean
    created_at?: boolean
    updated_at?: boolean
    conferences?: boolean | conferencesDefaultArgs<ExtArgs>
    users?: boolean | usersDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["speaker"]>

  export type speakerSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    conference_id?: boolean
    affiliation?: boolean
    title?: boolean
    created_at?: boolean
    updated_at?: boolean
    conferences?: boolean | conferencesDefaultArgs<ExtArgs>
    users?: boolean | usersDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["speaker"]>

  export type speakerSelectScalar = {
    id?: boolean
    user_id?: boolean
    conference_id?: boolean
    affiliation?: boolean
    title?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type speakerOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "user_id" | "conference_id" | "affiliation" | "title" | "created_at" | "updated_at", ExtArgs["result"]["speaker"]>
  export type speakerInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    conferences?: boolean | conferencesDefaultArgs<ExtArgs>
    users?: boolean | usersDefaultArgs<ExtArgs>
  }
  export type speakerIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    conferences?: boolean | conferencesDefaultArgs<ExtArgs>
    users?: boolean | usersDefaultArgs<ExtArgs>
  }
  export type speakerIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    conferences?: boolean | conferencesDefaultArgs<ExtArgs>
    users?: boolean | usersDefaultArgs<ExtArgs>
  }

  export type $speakerPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "speaker"
    objects: {
      conferences: Prisma.$conferencesPayload<ExtArgs>
      users: Prisma.$usersPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      user_id: string
      conference_id: string
      affiliation: string | null
      title: string | null
      created_at: Date | null
      updated_at: Date | null
    }, ExtArgs["result"]["speaker"]>
    composites: {}
  }

  type speakerGetPayload<S extends boolean | null | undefined | speakerDefaultArgs> = $Result.GetResult<Prisma.$speakerPayload, S>

  type speakerCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<speakerFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SpeakerCountAggregateInputType | true
    }

  export interface speakerDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['speaker'], meta: { name: 'speaker' } }
    /**
     * Find zero or one Speaker that matches the filter.
     * @param {speakerFindUniqueArgs} args - Arguments to find a Speaker
     * @example
     * // Get one Speaker
     * const speaker = await prisma.speaker.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends speakerFindUniqueArgs>(args: SelectSubset<T, speakerFindUniqueArgs<ExtArgs>>): Prisma__speakerClient<$Result.GetResult<Prisma.$speakerPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Speaker that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {speakerFindUniqueOrThrowArgs} args - Arguments to find a Speaker
     * @example
     * // Get one Speaker
     * const speaker = await prisma.speaker.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends speakerFindUniqueOrThrowArgs>(args: SelectSubset<T, speakerFindUniqueOrThrowArgs<ExtArgs>>): Prisma__speakerClient<$Result.GetResult<Prisma.$speakerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Speaker that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {speakerFindFirstArgs} args - Arguments to find a Speaker
     * @example
     * // Get one Speaker
     * const speaker = await prisma.speaker.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends speakerFindFirstArgs>(args?: SelectSubset<T, speakerFindFirstArgs<ExtArgs>>): Prisma__speakerClient<$Result.GetResult<Prisma.$speakerPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Speaker that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {speakerFindFirstOrThrowArgs} args - Arguments to find a Speaker
     * @example
     * // Get one Speaker
     * const speaker = await prisma.speaker.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends speakerFindFirstOrThrowArgs>(args?: SelectSubset<T, speakerFindFirstOrThrowArgs<ExtArgs>>): Prisma__speakerClient<$Result.GetResult<Prisma.$speakerPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Speakers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {speakerFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Speakers
     * const speakers = await prisma.speaker.findMany()
     * 
     * // Get first 10 Speakers
     * const speakers = await prisma.speaker.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const speakerWithIdOnly = await prisma.speaker.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends speakerFindManyArgs>(args?: SelectSubset<T, speakerFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$speakerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Speaker.
     * @param {speakerCreateArgs} args - Arguments to create a Speaker.
     * @example
     * // Create one Speaker
     * const Speaker = await prisma.speaker.create({
     *   data: {
     *     // ... data to create a Speaker
     *   }
     * })
     * 
     */
    create<T extends speakerCreateArgs>(args: SelectSubset<T, speakerCreateArgs<ExtArgs>>): Prisma__speakerClient<$Result.GetResult<Prisma.$speakerPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Speakers.
     * @param {speakerCreateManyArgs} args - Arguments to create many Speakers.
     * @example
     * // Create many Speakers
     * const speaker = await prisma.speaker.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends speakerCreateManyArgs>(args?: SelectSubset<T, speakerCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Speakers and returns the data saved in the database.
     * @param {speakerCreateManyAndReturnArgs} args - Arguments to create many Speakers.
     * @example
     * // Create many Speakers
     * const speaker = await prisma.speaker.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Speakers and only return the `id`
     * const speakerWithIdOnly = await prisma.speaker.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends speakerCreateManyAndReturnArgs>(args?: SelectSubset<T, speakerCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$speakerPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Speaker.
     * @param {speakerDeleteArgs} args - Arguments to delete one Speaker.
     * @example
     * // Delete one Speaker
     * const Speaker = await prisma.speaker.delete({
     *   where: {
     *     // ... filter to delete one Speaker
     *   }
     * })
     * 
     */
    delete<T extends speakerDeleteArgs>(args: SelectSubset<T, speakerDeleteArgs<ExtArgs>>): Prisma__speakerClient<$Result.GetResult<Prisma.$speakerPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Speaker.
     * @param {speakerUpdateArgs} args - Arguments to update one Speaker.
     * @example
     * // Update one Speaker
     * const speaker = await prisma.speaker.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends speakerUpdateArgs>(args: SelectSubset<T, speakerUpdateArgs<ExtArgs>>): Prisma__speakerClient<$Result.GetResult<Prisma.$speakerPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Speakers.
     * @param {speakerDeleteManyArgs} args - Arguments to filter Speakers to delete.
     * @example
     * // Delete a few Speakers
     * const { count } = await prisma.speaker.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends speakerDeleteManyArgs>(args?: SelectSubset<T, speakerDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Speakers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {speakerUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Speakers
     * const speaker = await prisma.speaker.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends speakerUpdateManyArgs>(args: SelectSubset<T, speakerUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Speakers and returns the data updated in the database.
     * @param {speakerUpdateManyAndReturnArgs} args - Arguments to update many Speakers.
     * @example
     * // Update many Speakers
     * const speaker = await prisma.speaker.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Speakers and only return the `id`
     * const speakerWithIdOnly = await prisma.speaker.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends speakerUpdateManyAndReturnArgs>(args: SelectSubset<T, speakerUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$speakerPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Speaker.
     * @param {speakerUpsertArgs} args - Arguments to update or create a Speaker.
     * @example
     * // Update or create a Speaker
     * const speaker = await prisma.speaker.upsert({
     *   create: {
     *     // ... data to create a Speaker
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Speaker we want to update
     *   }
     * })
     */
    upsert<T extends speakerUpsertArgs>(args: SelectSubset<T, speakerUpsertArgs<ExtArgs>>): Prisma__speakerClient<$Result.GetResult<Prisma.$speakerPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Speakers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {speakerCountArgs} args - Arguments to filter Speakers to count.
     * @example
     * // Count the number of Speakers
     * const count = await prisma.speaker.count({
     *   where: {
     *     // ... the filter for the Speakers we want to count
     *   }
     * })
    **/
    count<T extends speakerCountArgs>(
      args?: Subset<T, speakerCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SpeakerCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Speaker.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SpeakerAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SpeakerAggregateArgs>(args: Subset<T, SpeakerAggregateArgs>): Prisma.PrismaPromise<GetSpeakerAggregateType<T>>

    /**
     * Group by Speaker.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {speakerGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends speakerGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: speakerGroupByArgs['orderBy'] }
        : { orderBy?: speakerGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, speakerGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSpeakerGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the speaker model
   */
  readonly fields: speakerFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for speaker.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__speakerClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    conferences<T extends conferencesDefaultArgs<ExtArgs> = {}>(args?: Subset<T, conferencesDefaultArgs<ExtArgs>>): Prisma__conferencesClient<$Result.GetResult<Prisma.$conferencesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    users<T extends usersDefaultArgs<ExtArgs> = {}>(args?: Subset<T, usersDefaultArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the speaker model
   */
  interface speakerFieldRefs {
    readonly id: FieldRef<"speaker", 'Int'>
    readonly user_id: FieldRef<"speaker", 'String'>
    readonly conference_id: FieldRef<"speaker", 'String'>
    readonly affiliation: FieldRef<"speaker", 'String'>
    readonly title: FieldRef<"speaker", 'String'>
    readonly created_at: FieldRef<"speaker", 'DateTime'>
    readonly updated_at: FieldRef<"speaker", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * speaker findUnique
   */
  export type speakerFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the speaker
     */
    select?: speakerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the speaker
     */
    omit?: speakerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: speakerInclude<ExtArgs> | null
    /**
     * Filter, which speaker to fetch.
     */
    where: speakerWhereUniqueInput
  }

  /**
   * speaker findUniqueOrThrow
   */
  export type speakerFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the speaker
     */
    select?: speakerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the speaker
     */
    omit?: speakerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: speakerInclude<ExtArgs> | null
    /**
     * Filter, which speaker to fetch.
     */
    where: speakerWhereUniqueInput
  }

  /**
   * speaker findFirst
   */
  export type speakerFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the speaker
     */
    select?: speakerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the speaker
     */
    omit?: speakerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: speakerInclude<ExtArgs> | null
    /**
     * Filter, which speaker to fetch.
     */
    where?: speakerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of speakers to fetch.
     */
    orderBy?: speakerOrderByWithRelationInput | speakerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for speakers.
     */
    cursor?: speakerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` speakers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` speakers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of speakers.
     */
    distinct?: SpeakerScalarFieldEnum | SpeakerScalarFieldEnum[]
  }

  /**
   * speaker findFirstOrThrow
   */
  export type speakerFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the speaker
     */
    select?: speakerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the speaker
     */
    omit?: speakerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: speakerInclude<ExtArgs> | null
    /**
     * Filter, which speaker to fetch.
     */
    where?: speakerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of speakers to fetch.
     */
    orderBy?: speakerOrderByWithRelationInput | speakerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for speakers.
     */
    cursor?: speakerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` speakers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` speakers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of speakers.
     */
    distinct?: SpeakerScalarFieldEnum | SpeakerScalarFieldEnum[]
  }

  /**
   * speaker findMany
   */
  export type speakerFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the speaker
     */
    select?: speakerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the speaker
     */
    omit?: speakerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: speakerInclude<ExtArgs> | null
    /**
     * Filter, which speakers to fetch.
     */
    where?: speakerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of speakers to fetch.
     */
    orderBy?: speakerOrderByWithRelationInput | speakerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing speakers.
     */
    cursor?: speakerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` speakers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` speakers.
     */
    skip?: number
    distinct?: SpeakerScalarFieldEnum | SpeakerScalarFieldEnum[]
  }

  /**
   * speaker create
   */
  export type speakerCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the speaker
     */
    select?: speakerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the speaker
     */
    omit?: speakerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: speakerInclude<ExtArgs> | null
    /**
     * The data needed to create a speaker.
     */
    data: XOR<speakerCreateInput, speakerUncheckedCreateInput>
  }

  /**
   * speaker createMany
   */
  export type speakerCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many speakers.
     */
    data: speakerCreateManyInput | speakerCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * speaker createManyAndReturn
   */
  export type speakerCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the speaker
     */
    select?: speakerSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the speaker
     */
    omit?: speakerOmit<ExtArgs> | null
    /**
     * The data used to create many speakers.
     */
    data: speakerCreateManyInput | speakerCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: speakerIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * speaker update
   */
  export type speakerUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the speaker
     */
    select?: speakerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the speaker
     */
    omit?: speakerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: speakerInclude<ExtArgs> | null
    /**
     * The data needed to update a speaker.
     */
    data: XOR<speakerUpdateInput, speakerUncheckedUpdateInput>
    /**
     * Choose, which speaker to update.
     */
    where: speakerWhereUniqueInput
  }

  /**
   * speaker updateMany
   */
  export type speakerUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update speakers.
     */
    data: XOR<speakerUpdateManyMutationInput, speakerUncheckedUpdateManyInput>
    /**
     * Filter which speakers to update
     */
    where?: speakerWhereInput
    /**
     * Limit how many speakers to update.
     */
    limit?: number
  }

  /**
   * speaker updateManyAndReturn
   */
  export type speakerUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the speaker
     */
    select?: speakerSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the speaker
     */
    omit?: speakerOmit<ExtArgs> | null
    /**
     * The data used to update speakers.
     */
    data: XOR<speakerUpdateManyMutationInput, speakerUncheckedUpdateManyInput>
    /**
     * Filter which speakers to update
     */
    where?: speakerWhereInput
    /**
     * Limit how many speakers to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: speakerIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * speaker upsert
   */
  export type speakerUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the speaker
     */
    select?: speakerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the speaker
     */
    omit?: speakerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: speakerInclude<ExtArgs> | null
    /**
     * The filter to search for the speaker to update in case it exists.
     */
    where: speakerWhereUniqueInput
    /**
     * In case the speaker found by the `where` argument doesn't exist, create a new speaker with this data.
     */
    create: XOR<speakerCreateInput, speakerUncheckedCreateInput>
    /**
     * In case the speaker was found with the provided `where` argument, update it with this data.
     */
    update: XOR<speakerUpdateInput, speakerUncheckedUpdateInput>
  }

  /**
   * speaker delete
   */
  export type speakerDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the speaker
     */
    select?: speakerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the speaker
     */
    omit?: speakerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: speakerInclude<ExtArgs> | null
    /**
     * Filter which speaker to delete.
     */
    where: speakerWhereUniqueInput
  }

  /**
   * speaker deleteMany
   */
  export type speakerDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which speakers to delete
     */
    where?: speakerWhereInput
    /**
     * Limit how many speakers to delete.
     */
    limit?: number
  }

  /**
   * speaker without action
   */
  export type speakerDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the speaker
     */
    select?: speakerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the speaker
     */
    omit?: speakerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: speakerInclude<ExtArgs> | null
  }


  /**
   * Model users
   */

  export type AggregateUsers = {
    _count: UsersCountAggregateOutputType | null
    _min: UsersMinAggregateOutputType | null
    _max: UsersMaxAggregateOutputType | null
  }

  export type UsersMinAggregateOutputType = {
    id: string | null
    username: string | null
    email: string | null
    password_hash: string | null
    first_name: string | null
    last_name: string | null
    bio: string | null
    photo_url: string | null
    role: string | null
    status: string | null
    affiliation: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type UsersMaxAggregateOutputType = {
    id: string | null
    username: string | null
    email: string | null
    password_hash: string | null
    first_name: string | null
    last_name: string | null
    bio: string | null
    photo_url: string | null
    role: string | null
    status: string | null
    affiliation: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type UsersCountAggregateOutputType = {
    id: number
    username: number
    email: number
    password_hash: number
    first_name: number
    last_name: number
    bio: number
    photo_url: number
    role: number
    status: number
    affiliation: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type UsersMinAggregateInputType = {
    id?: true
    username?: true
    email?: true
    password_hash?: true
    first_name?: true
    last_name?: true
    bio?: true
    photo_url?: true
    role?: true
    status?: true
    affiliation?: true
    created_at?: true
    updated_at?: true
  }

  export type UsersMaxAggregateInputType = {
    id?: true
    username?: true
    email?: true
    password_hash?: true
    first_name?: true
    last_name?: true
    bio?: true
    photo_url?: true
    role?: true
    status?: true
    affiliation?: true
    created_at?: true
    updated_at?: true
  }

  export type UsersCountAggregateInputType = {
    id?: true
    username?: true
    email?: true
    password_hash?: true
    first_name?: true
    last_name?: true
    bio?: true
    photo_url?: true
    role?: true
    status?: true
    affiliation?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type UsersAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which users to aggregate.
     */
    where?: usersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: usersOrderByWithRelationInput | usersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: usersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned users
    **/
    _count?: true | UsersCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UsersMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UsersMaxAggregateInputType
  }

  export type GetUsersAggregateType<T extends UsersAggregateArgs> = {
        [P in keyof T & keyof AggregateUsers]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUsers[P]>
      : GetScalarType<T[P], AggregateUsers[P]>
  }




  export type usersGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: usersWhereInput
    orderBy?: usersOrderByWithAggregationInput | usersOrderByWithAggregationInput[]
    by: UsersScalarFieldEnum[] | UsersScalarFieldEnum
    having?: usersScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UsersCountAggregateInputType | true
    _min?: UsersMinAggregateInputType
    _max?: UsersMaxAggregateInputType
  }

  export type UsersGroupByOutputType = {
    id: string
    username: string
    email: string
    password_hash: string
    first_name: string | null
    last_name: string | null
    bio: string | null
    photo_url: string | null
    role: string
    status: string | null
    affiliation: string | null
    created_at: Date | null
    updated_at: Date | null
    _count: UsersCountAggregateOutputType | null
    _min: UsersMinAggregateOutputType | null
    _max: UsersMaxAggregateOutputType | null
  }

  type GetUsersGroupByPayload<T extends usersGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UsersGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UsersGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UsersGroupByOutputType[P]>
            : GetScalarType<T[P], UsersGroupByOutputType[P]>
        }
      >
    >


  export type usersSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    username?: boolean
    email?: boolean
    password_hash?: boolean
    first_name?: boolean
    last_name?: boolean
    bio?: boolean
    photo_url?: boolean
    role?: boolean
    status?: boolean
    affiliation?: boolean
    created_at?: boolean
    updated_at?: boolean
    groups?: boolean | users$groupsArgs<ExtArgs>
    links?: boolean | users$linksArgs<ExtArgs>
    messages_messages_receiver_idTousers?: boolean | users$messages_messages_receiver_idTousersArgs<ExtArgs>
    messages_messages_sender_idTousers?: boolean | users$messages_messages_sender_idTousersArgs<ExtArgs>
    notifications?: boolean | users$notificationsArgs<ExtArgs>
    publications?: boolean | users$publicationsArgs<ExtArgs>
    speaker?: boolean | users$speakerArgs<ExtArgs>
    _count?: boolean | UsersCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["users"]>

  export type usersSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    username?: boolean
    email?: boolean
    password_hash?: boolean
    first_name?: boolean
    last_name?: boolean
    bio?: boolean
    photo_url?: boolean
    role?: boolean
    status?: boolean
    affiliation?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["users"]>

  export type usersSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    username?: boolean
    email?: boolean
    password_hash?: boolean
    first_name?: boolean
    last_name?: boolean
    bio?: boolean
    photo_url?: boolean
    role?: boolean
    status?: boolean
    affiliation?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["users"]>

  export type usersSelectScalar = {
    id?: boolean
    username?: boolean
    email?: boolean
    password_hash?: boolean
    first_name?: boolean
    last_name?: boolean
    bio?: boolean
    photo_url?: boolean
    role?: boolean
    status?: boolean
    affiliation?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type usersOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "username" | "email" | "password_hash" | "first_name" | "last_name" | "bio" | "photo_url" | "role" | "status" | "affiliation" | "created_at" | "updated_at", ExtArgs["result"]["users"]>
  export type usersInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    groups?: boolean | users$groupsArgs<ExtArgs>
    links?: boolean | users$linksArgs<ExtArgs>
    messages_messages_receiver_idTousers?: boolean | users$messages_messages_receiver_idTousersArgs<ExtArgs>
    messages_messages_sender_idTousers?: boolean | users$messages_messages_sender_idTousersArgs<ExtArgs>
    notifications?: boolean | users$notificationsArgs<ExtArgs>
    publications?: boolean | users$publicationsArgs<ExtArgs>
    speaker?: boolean | users$speakerArgs<ExtArgs>
    _count?: boolean | UsersCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type usersIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type usersIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $usersPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "users"
    objects: {
      groups: Prisma.$groupsPayload<ExtArgs>[]
      links: Prisma.$linksPayload<ExtArgs>[]
      messages_messages_receiver_idTousers: Prisma.$messagesPayload<ExtArgs>[]
      messages_messages_sender_idTousers: Prisma.$messagesPayload<ExtArgs>[]
      notifications: Prisma.$notificationsPayload<ExtArgs>[]
      publications: Prisma.$publicationsPayload<ExtArgs>[]
      speaker: Prisma.$speakerPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      username: string
      email: string
      password_hash: string
      first_name: string | null
      last_name: string | null
      bio: string | null
      photo_url: string | null
      role: string
      status: string | null
      affiliation: string | null
      created_at: Date | null
      updated_at: Date | null
    }, ExtArgs["result"]["users"]>
    composites: {}
  }

  type usersGetPayload<S extends boolean | null | undefined | usersDefaultArgs> = $Result.GetResult<Prisma.$usersPayload, S>

  type usersCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<usersFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UsersCountAggregateInputType | true
    }

  export interface usersDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['users'], meta: { name: 'users' } }
    /**
     * Find zero or one Users that matches the filter.
     * @param {usersFindUniqueArgs} args - Arguments to find a Users
     * @example
     * // Get one Users
     * const users = await prisma.users.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends usersFindUniqueArgs>(args: SelectSubset<T, usersFindUniqueArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Users that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {usersFindUniqueOrThrowArgs} args - Arguments to find a Users
     * @example
     * // Get one Users
     * const users = await prisma.users.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends usersFindUniqueOrThrowArgs>(args: SelectSubset<T, usersFindUniqueOrThrowArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersFindFirstArgs} args - Arguments to find a Users
     * @example
     * // Get one Users
     * const users = await prisma.users.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends usersFindFirstArgs>(args?: SelectSubset<T, usersFindFirstArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Users that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersFindFirstOrThrowArgs} args - Arguments to find a Users
     * @example
     * // Get one Users
     * const users = await prisma.users.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends usersFindFirstOrThrowArgs>(args?: SelectSubset<T, usersFindFirstOrThrowArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.users.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.users.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const usersWithIdOnly = await prisma.users.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends usersFindManyArgs>(args?: SelectSubset<T, usersFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Users.
     * @param {usersCreateArgs} args - Arguments to create a Users.
     * @example
     * // Create one Users
     * const Users = await prisma.users.create({
     *   data: {
     *     // ... data to create a Users
     *   }
     * })
     * 
     */
    create<T extends usersCreateArgs>(args: SelectSubset<T, usersCreateArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {usersCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const users = await prisma.users.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends usersCreateManyArgs>(args?: SelectSubset<T, usersCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {usersCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const users = await prisma.users.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const usersWithIdOnly = await prisma.users.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends usersCreateManyAndReturnArgs>(args?: SelectSubset<T, usersCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Users.
     * @param {usersDeleteArgs} args - Arguments to delete one Users.
     * @example
     * // Delete one Users
     * const Users = await prisma.users.delete({
     *   where: {
     *     // ... filter to delete one Users
     *   }
     * })
     * 
     */
    delete<T extends usersDeleteArgs>(args: SelectSubset<T, usersDeleteArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Users.
     * @param {usersUpdateArgs} args - Arguments to update one Users.
     * @example
     * // Update one Users
     * const users = await prisma.users.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends usersUpdateArgs>(args: SelectSubset<T, usersUpdateArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {usersDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.users.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends usersDeleteManyArgs>(args?: SelectSubset<T, usersDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const users = await prisma.users.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends usersUpdateManyArgs>(args: SelectSubset<T, usersUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {usersUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const users = await prisma.users.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const usersWithIdOnly = await prisma.users.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends usersUpdateManyAndReturnArgs>(args: SelectSubset<T, usersUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Users.
     * @param {usersUpsertArgs} args - Arguments to update or create a Users.
     * @example
     * // Update or create a Users
     * const users = await prisma.users.upsert({
     *   create: {
     *     // ... data to create a Users
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Users we want to update
     *   }
     * })
     */
    upsert<T extends usersUpsertArgs>(args: SelectSubset<T, usersUpsertArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.users.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends usersCountArgs>(
      args?: Subset<T, usersCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UsersCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsersAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UsersAggregateArgs>(args: Subset<T, UsersAggregateArgs>): Prisma.PrismaPromise<GetUsersAggregateType<T>>

    /**
     * Group by Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends usersGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: usersGroupByArgs['orderBy'] }
        : { orderBy?: usersGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, usersGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUsersGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the users model
   */
  readonly fields: usersFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for users.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__usersClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    groups<T extends users$groupsArgs<ExtArgs> = {}>(args?: Subset<T, users$groupsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$groupsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    links<T extends users$linksArgs<ExtArgs> = {}>(args?: Subset<T, users$linksArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$linksPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    messages_messages_receiver_idTousers<T extends users$messages_messages_receiver_idTousersArgs<ExtArgs> = {}>(args?: Subset<T, users$messages_messages_receiver_idTousersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$messagesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    messages_messages_sender_idTousers<T extends users$messages_messages_sender_idTousersArgs<ExtArgs> = {}>(args?: Subset<T, users$messages_messages_sender_idTousersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$messagesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    notifications<T extends users$notificationsArgs<ExtArgs> = {}>(args?: Subset<T, users$notificationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$notificationsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    publications<T extends users$publicationsArgs<ExtArgs> = {}>(args?: Subset<T, users$publicationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$publicationsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    speaker<T extends users$speakerArgs<ExtArgs> = {}>(args?: Subset<T, users$speakerArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$speakerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the users model
   */
  interface usersFieldRefs {
    readonly id: FieldRef<"users", 'String'>
    readonly username: FieldRef<"users", 'String'>
    readonly email: FieldRef<"users", 'String'>
    readonly password_hash: FieldRef<"users", 'String'>
    readonly first_name: FieldRef<"users", 'String'>
    readonly last_name: FieldRef<"users", 'String'>
    readonly bio: FieldRef<"users", 'String'>
    readonly photo_url: FieldRef<"users", 'String'>
    readonly role: FieldRef<"users", 'String'>
    readonly status: FieldRef<"users", 'String'>
    readonly affiliation: FieldRef<"users", 'String'>
    readonly created_at: FieldRef<"users", 'DateTime'>
    readonly updated_at: FieldRef<"users", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * users findUnique
   */
  export type usersFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where: usersWhereUniqueInput
  }

  /**
   * users findUniqueOrThrow
   */
  export type usersFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where: usersWhereUniqueInput
  }

  /**
   * users findFirst
   */
  export type usersFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where?: usersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: usersOrderByWithRelationInput | usersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for users.
     */
    cursor?: usersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of users.
     */
    distinct?: UsersScalarFieldEnum | UsersScalarFieldEnum[]
  }

  /**
   * users findFirstOrThrow
   */
  export type usersFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where?: usersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: usersOrderByWithRelationInput | usersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for users.
     */
    cursor?: usersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of users.
     */
    distinct?: UsersScalarFieldEnum | UsersScalarFieldEnum[]
  }

  /**
   * users findMany
   */
  export type usersFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where?: usersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: usersOrderByWithRelationInput | usersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing users.
     */
    cursor?: usersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    distinct?: UsersScalarFieldEnum | UsersScalarFieldEnum[]
  }

  /**
   * users create
   */
  export type usersCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * The data needed to create a users.
     */
    data: XOR<usersCreateInput, usersUncheckedCreateInput>
  }

  /**
   * users createMany
   */
  export type usersCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many users.
     */
    data: usersCreateManyInput | usersCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * users createManyAndReturn
   */
  export type usersCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * The data used to create many users.
     */
    data: usersCreateManyInput | usersCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * users update
   */
  export type usersUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * The data needed to update a users.
     */
    data: XOR<usersUpdateInput, usersUncheckedUpdateInput>
    /**
     * Choose, which users to update.
     */
    where: usersWhereUniqueInput
  }

  /**
   * users updateMany
   */
  export type usersUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update users.
     */
    data: XOR<usersUpdateManyMutationInput, usersUncheckedUpdateManyInput>
    /**
     * Filter which users to update
     */
    where?: usersWhereInput
    /**
     * Limit how many users to update.
     */
    limit?: number
  }

  /**
   * users updateManyAndReturn
   */
  export type usersUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * The data used to update users.
     */
    data: XOR<usersUpdateManyMutationInput, usersUncheckedUpdateManyInput>
    /**
     * Filter which users to update
     */
    where?: usersWhereInput
    /**
     * Limit how many users to update.
     */
    limit?: number
  }

  /**
   * users upsert
   */
  export type usersUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * The filter to search for the users to update in case it exists.
     */
    where: usersWhereUniqueInput
    /**
     * In case the users found by the `where` argument doesn't exist, create a new users with this data.
     */
    create: XOR<usersCreateInput, usersUncheckedCreateInput>
    /**
     * In case the users was found with the provided `where` argument, update it with this data.
     */
    update: XOR<usersUpdateInput, usersUncheckedUpdateInput>
  }

  /**
   * users delete
   */
  export type usersDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter which users to delete.
     */
    where: usersWhereUniqueInput
  }

  /**
   * users deleteMany
   */
  export type usersDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which users to delete
     */
    where?: usersWhereInput
    /**
     * Limit how many users to delete.
     */
    limit?: number
  }

  /**
   * users.groups
   */
  export type users$groupsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the groups
     */
    select?: groupsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the groups
     */
    omit?: groupsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: groupsInclude<ExtArgs> | null
    where?: groupsWhereInput
    orderBy?: groupsOrderByWithRelationInput | groupsOrderByWithRelationInput[]
    cursor?: groupsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: GroupsScalarFieldEnum | GroupsScalarFieldEnum[]
  }

  /**
   * users.links
   */
  export type users$linksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the links
     */
    select?: linksSelect<ExtArgs> | null
    /**
     * Omit specific fields from the links
     */
    omit?: linksOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: linksInclude<ExtArgs> | null
    where?: linksWhereInput
    orderBy?: linksOrderByWithRelationInput | linksOrderByWithRelationInput[]
    cursor?: linksWhereUniqueInput
    take?: number
    skip?: number
    distinct?: LinksScalarFieldEnum | LinksScalarFieldEnum[]
  }

  /**
   * users.messages_messages_receiver_idTousers
   */
  export type users$messages_messages_receiver_idTousersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the messages
     */
    select?: messagesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the messages
     */
    omit?: messagesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: messagesInclude<ExtArgs> | null
    where?: messagesWhereInput
    orderBy?: messagesOrderByWithRelationInput | messagesOrderByWithRelationInput[]
    cursor?: messagesWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MessagesScalarFieldEnum | MessagesScalarFieldEnum[]
  }

  /**
   * users.messages_messages_sender_idTousers
   */
  export type users$messages_messages_sender_idTousersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the messages
     */
    select?: messagesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the messages
     */
    omit?: messagesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: messagesInclude<ExtArgs> | null
    where?: messagesWhereInput
    orderBy?: messagesOrderByWithRelationInput | messagesOrderByWithRelationInput[]
    cursor?: messagesWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MessagesScalarFieldEnum | MessagesScalarFieldEnum[]
  }

  /**
   * users.notifications
   */
  export type users$notificationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the notifications
     */
    select?: notificationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the notifications
     */
    omit?: notificationsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: notificationsInclude<ExtArgs> | null
    where?: notificationsWhereInput
    orderBy?: notificationsOrderByWithRelationInput | notificationsOrderByWithRelationInput[]
    cursor?: notificationsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: NotificationsScalarFieldEnum | NotificationsScalarFieldEnum[]
  }

  /**
   * users.publications
   */
  export type users$publicationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the publications
     */
    select?: publicationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the publications
     */
    omit?: publicationsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: publicationsInclude<ExtArgs> | null
    where?: publicationsWhereInput
    orderBy?: publicationsOrderByWithRelationInput | publicationsOrderByWithRelationInput[]
    cursor?: publicationsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PublicationsScalarFieldEnum | PublicationsScalarFieldEnum[]
  }

  /**
   * users.speaker
   */
  export type users$speakerArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the speaker
     */
    select?: speakerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the speaker
     */
    omit?: speakerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: speakerInclude<ExtArgs> | null
    where?: speakerWhereInput
    orderBy?: speakerOrderByWithRelationInput | speakerOrderByWithRelationInput[]
    cursor?: speakerWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SpeakerScalarFieldEnum | SpeakerScalarFieldEnum[]
  }

  /**
   * users without action
   */
  export type usersDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const ConferencesScalarFieldEnum: {
    id: 'id',
    name: 'name',
    description: 'description',
    location: 'location',
    start_date: 'start_date',
    end_date: 'end_date'
  };

  export type ConferencesScalarFieldEnum = (typeof ConferencesScalarFieldEnum)[keyof typeof ConferencesScalarFieldEnum]


  export const GroupsScalarFieldEnum: {
    id: 'id',
    title: 'title',
    description: 'description',
    status: 'status',
    created_at: 'created_at',
    leader_id: 'leader_id',
    publication_id: 'publication_id'
  };

  export type GroupsScalarFieldEnum = (typeof GroupsScalarFieldEnum)[keyof typeof GroupsScalarFieldEnum]


  export const LinksScalarFieldEnum: {
    id: 'id',
    type: 'type',
    link: 'link',
    user_id: 'user_id'
  };

  export type LinksScalarFieldEnum = (typeof LinksScalarFieldEnum)[keyof typeof LinksScalarFieldEnum]


  export const MessagesScalarFieldEnum: {
    id: 'id',
    message: 'message',
    created_at: 'created_at',
    status: 'status',
    sender_id: 'sender_id',
    receiver_id: 'receiver_id'
  };

  export type MessagesScalarFieldEnum = (typeof MessagesScalarFieldEnum)[keyof typeof MessagesScalarFieldEnum]


  export const NotificationsScalarFieldEnum: {
    id: 'id',
    message: 'message',
    created_at: 'created_at',
    read_status: 'read_status',
    user_id: 'user_id'
  };

  export type NotificationsScalarFieldEnum = (typeof NotificationsScalarFieldEnum)[keyof typeof NotificationsScalarFieldEnum]


  export const Publication_filesScalarFieldEnum: {
    id: 'id',
    file_type: 'file_type',
    file_path: 'file_path',
    publication_id: 'publication_id'
  };

  export type Publication_filesScalarFieldEnum = (typeof Publication_filesScalarFieldEnum)[keyof typeof Publication_filesScalarFieldEnum]


  export const PublicationsScalarFieldEnum: {
    id: 'id',
    title: 'title',
    journal: 'journal',
    status: 'status',
    visibility: 'visibility',
    submitter_id: 'submitter_id',
    conference_id: 'conference_id',
    submitted_at: 'submitted_at'
  };

  export type PublicationsScalarFieldEnum = (typeof PublicationsScalarFieldEnum)[keyof typeof PublicationsScalarFieldEnum]


  export const SpeakerScalarFieldEnum: {
    id: 'id',
    user_id: 'user_id',
    conference_id: 'conference_id',
    affiliation: 'affiliation',
    title: 'title',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type SpeakerScalarFieldEnum = (typeof SpeakerScalarFieldEnum)[keyof typeof SpeakerScalarFieldEnum]


  export const UsersScalarFieldEnum: {
    id: 'id',
    username: 'username',
    email: 'email',
    password_hash: 'password_hash',
    first_name: 'first_name',
    last_name: 'last_name',
    bio: 'bio',
    photo_url: 'photo_url',
    role: 'role',
    status: 'status',
    affiliation: 'affiliation',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type UsersScalarFieldEnum = (typeof UsersScalarFieldEnum)[keyof typeof UsersScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type conferencesWhereInput = {
    AND?: conferencesWhereInput | conferencesWhereInput[]
    OR?: conferencesWhereInput[]
    NOT?: conferencesWhereInput | conferencesWhereInput[]
    id?: UuidFilter<"conferences"> | string
    name?: StringFilter<"conferences"> | string
    description?: StringFilter<"conferences"> | string
    location?: StringFilter<"conferences"> | string
    start_date?: DateTimeFilter<"conferences"> | Date | string
    end_date?: DateTimeFilter<"conferences"> | Date | string
    publications?: PublicationsListRelationFilter
    speaker?: SpeakerListRelationFilter
  }

  export type conferencesOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    location?: SortOrder
    start_date?: SortOrder
    end_date?: SortOrder
    publications?: publicationsOrderByRelationAggregateInput
    speaker?: speakerOrderByRelationAggregateInput
  }

  export type conferencesWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: conferencesWhereInput | conferencesWhereInput[]
    OR?: conferencesWhereInput[]
    NOT?: conferencesWhereInput | conferencesWhereInput[]
    name?: StringFilter<"conferences"> | string
    description?: StringFilter<"conferences"> | string
    location?: StringFilter<"conferences"> | string
    start_date?: DateTimeFilter<"conferences"> | Date | string
    end_date?: DateTimeFilter<"conferences"> | Date | string
    publications?: PublicationsListRelationFilter
    speaker?: SpeakerListRelationFilter
  }, "id">

  export type conferencesOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    location?: SortOrder
    start_date?: SortOrder
    end_date?: SortOrder
    _count?: conferencesCountOrderByAggregateInput
    _max?: conferencesMaxOrderByAggregateInput
    _min?: conferencesMinOrderByAggregateInput
  }

  export type conferencesScalarWhereWithAggregatesInput = {
    AND?: conferencesScalarWhereWithAggregatesInput | conferencesScalarWhereWithAggregatesInput[]
    OR?: conferencesScalarWhereWithAggregatesInput[]
    NOT?: conferencesScalarWhereWithAggregatesInput | conferencesScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"conferences"> | string
    name?: StringWithAggregatesFilter<"conferences"> | string
    description?: StringWithAggregatesFilter<"conferences"> | string
    location?: StringWithAggregatesFilter<"conferences"> | string
    start_date?: DateTimeWithAggregatesFilter<"conferences"> | Date | string
    end_date?: DateTimeWithAggregatesFilter<"conferences"> | Date | string
  }

  export type groupsWhereInput = {
    AND?: groupsWhereInput | groupsWhereInput[]
    OR?: groupsWhereInput[]
    NOT?: groupsWhereInput | groupsWhereInput[]
    id?: UuidFilter<"groups"> | string
    title?: StringFilter<"groups"> | string
    description?: StringFilter<"groups"> | string
    status?: StringFilter<"groups"> | string
    created_at?: DateTimeFilter<"groups"> | Date | string
    leader_id?: UuidFilter<"groups"> | string
    publication_id?: UuidFilter<"groups"> | string
    users?: XOR<UsersScalarRelationFilter, usersWhereInput>
    publications?: XOR<PublicationsScalarRelationFilter, publicationsWhereInput>
  }

  export type groupsOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    status?: SortOrder
    created_at?: SortOrder
    leader_id?: SortOrder
    publication_id?: SortOrder
    users?: usersOrderByWithRelationInput
    publications?: publicationsOrderByWithRelationInput
  }

  export type groupsWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: groupsWhereInput | groupsWhereInput[]
    OR?: groupsWhereInput[]
    NOT?: groupsWhereInput | groupsWhereInput[]
    title?: StringFilter<"groups"> | string
    description?: StringFilter<"groups"> | string
    status?: StringFilter<"groups"> | string
    created_at?: DateTimeFilter<"groups"> | Date | string
    leader_id?: UuidFilter<"groups"> | string
    publication_id?: UuidFilter<"groups"> | string
    users?: XOR<UsersScalarRelationFilter, usersWhereInput>
    publications?: XOR<PublicationsScalarRelationFilter, publicationsWhereInput>
  }, "id">

  export type groupsOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    status?: SortOrder
    created_at?: SortOrder
    leader_id?: SortOrder
    publication_id?: SortOrder
    _count?: groupsCountOrderByAggregateInput
    _max?: groupsMaxOrderByAggregateInput
    _min?: groupsMinOrderByAggregateInput
  }

  export type groupsScalarWhereWithAggregatesInput = {
    AND?: groupsScalarWhereWithAggregatesInput | groupsScalarWhereWithAggregatesInput[]
    OR?: groupsScalarWhereWithAggregatesInput[]
    NOT?: groupsScalarWhereWithAggregatesInput | groupsScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"groups"> | string
    title?: StringWithAggregatesFilter<"groups"> | string
    description?: StringWithAggregatesFilter<"groups"> | string
    status?: StringWithAggregatesFilter<"groups"> | string
    created_at?: DateTimeWithAggregatesFilter<"groups"> | Date | string
    leader_id?: UuidWithAggregatesFilter<"groups"> | string
    publication_id?: UuidWithAggregatesFilter<"groups"> | string
  }

  export type linksWhereInput = {
    AND?: linksWhereInput | linksWhereInput[]
    OR?: linksWhereInput[]
    NOT?: linksWhereInput | linksWhereInput[]
    id?: UuidFilter<"links"> | string
    type?: StringNullableFilter<"links"> | string | null
    link?: StringNullableFilter<"links"> | string | null
    user_id?: UuidFilter<"links"> | string
    users?: XOR<UsersScalarRelationFilter, usersWhereInput>
  }

  export type linksOrderByWithRelationInput = {
    id?: SortOrder
    type?: SortOrderInput | SortOrder
    link?: SortOrderInput | SortOrder
    user_id?: SortOrder
    users?: usersOrderByWithRelationInput
  }

  export type linksWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: linksWhereInput | linksWhereInput[]
    OR?: linksWhereInput[]
    NOT?: linksWhereInput | linksWhereInput[]
    type?: StringNullableFilter<"links"> | string | null
    link?: StringNullableFilter<"links"> | string | null
    user_id?: UuidFilter<"links"> | string
    users?: XOR<UsersScalarRelationFilter, usersWhereInput>
  }, "id">

  export type linksOrderByWithAggregationInput = {
    id?: SortOrder
    type?: SortOrderInput | SortOrder
    link?: SortOrderInput | SortOrder
    user_id?: SortOrder
    _count?: linksCountOrderByAggregateInput
    _max?: linksMaxOrderByAggregateInput
    _min?: linksMinOrderByAggregateInput
  }

  export type linksScalarWhereWithAggregatesInput = {
    AND?: linksScalarWhereWithAggregatesInput | linksScalarWhereWithAggregatesInput[]
    OR?: linksScalarWhereWithAggregatesInput[]
    NOT?: linksScalarWhereWithAggregatesInput | linksScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"links"> | string
    type?: StringNullableWithAggregatesFilter<"links"> | string | null
    link?: StringNullableWithAggregatesFilter<"links"> | string | null
    user_id?: UuidWithAggregatesFilter<"links"> | string
  }

  export type messagesWhereInput = {
    AND?: messagesWhereInput | messagesWhereInput[]
    OR?: messagesWhereInput[]
    NOT?: messagesWhereInput | messagesWhereInput[]
    id?: UuidFilter<"messages"> | string
    message?: StringFilter<"messages"> | string
    created_at?: DateTimeNullableFilter<"messages"> | Date | string | null
    status?: StringNullableFilter<"messages"> | string | null
    sender_id?: UuidFilter<"messages"> | string
    receiver_id?: UuidFilter<"messages"> | string
    users_messages_receiver_idTousers?: XOR<UsersScalarRelationFilter, usersWhereInput>
    users_messages_sender_idTousers?: XOR<UsersScalarRelationFilter, usersWhereInput>
  }

  export type messagesOrderByWithRelationInput = {
    id?: SortOrder
    message?: SortOrder
    created_at?: SortOrderInput | SortOrder
    status?: SortOrderInput | SortOrder
    sender_id?: SortOrder
    receiver_id?: SortOrder
    users_messages_receiver_idTousers?: usersOrderByWithRelationInput
    users_messages_sender_idTousers?: usersOrderByWithRelationInput
  }

  export type messagesWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: messagesWhereInput | messagesWhereInput[]
    OR?: messagesWhereInput[]
    NOT?: messagesWhereInput | messagesWhereInput[]
    message?: StringFilter<"messages"> | string
    created_at?: DateTimeNullableFilter<"messages"> | Date | string | null
    status?: StringNullableFilter<"messages"> | string | null
    sender_id?: UuidFilter<"messages"> | string
    receiver_id?: UuidFilter<"messages"> | string
    users_messages_receiver_idTousers?: XOR<UsersScalarRelationFilter, usersWhereInput>
    users_messages_sender_idTousers?: XOR<UsersScalarRelationFilter, usersWhereInput>
  }, "id">

  export type messagesOrderByWithAggregationInput = {
    id?: SortOrder
    message?: SortOrder
    created_at?: SortOrderInput | SortOrder
    status?: SortOrderInput | SortOrder
    sender_id?: SortOrder
    receiver_id?: SortOrder
    _count?: messagesCountOrderByAggregateInput
    _max?: messagesMaxOrderByAggregateInput
    _min?: messagesMinOrderByAggregateInput
  }

  export type messagesScalarWhereWithAggregatesInput = {
    AND?: messagesScalarWhereWithAggregatesInput | messagesScalarWhereWithAggregatesInput[]
    OR?: messagesScalarWhereWithAggregatesInput[]
    NOT?: messagesScalarWhereWithAggregatesInput | messagesScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"messages"> | string
    message?: StringWithAggregatesFilter<"messages"> | string
    created_at?: DateTimeNullableWithAggregatesFilter<"messages"> | Date | string | null
    status?: StringNullableWithAggregatesFilter<"messages"> | string | null
    sender_id?: UuidWithAggregatesFilter<"messages"> | string
    receiver_id?: UuidWithAggregatesFilter<"messages"> | string
  }

  export type notificationsWhereInput = {
    AND?: notificationsWhereInput | notificationsWhereInput[]
    OR?: notificationsWhereInput[]
    NOT?: notificationsWhereInput | notificationsWhereInput[]
    id?: UuidFilter<"notifications"> | string
    message?: StringFilter<"notifications"> | string
    created_at?: DateTimeNullableFilter<"notifications"> | Date | string | null
    read_status?: BoolNullableFilter<"notifications"> | boolean | null
    user_id?: UuidFilter<"notifications"> | string
    users?: XOR<UsersScalarRelationFilter, usersWhereInput>
  }

  export type notificationsOrderByWithRelationInput = {
    id?: SortOrder
    message?: SortOrder
    created_at?: SortOrderInput | SortOrder
    read_status?: SortOrderInput | SortOrder
    user_id?: SortOrder
    users?: usersOrderByWithRelationInput
  }

  export type notificationsWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: notificationsWhereInput | notificationsWhereInput[]
    OR?: notificationsWhereInput[]
    NOT?: notificationsWhereInput | notificationsWhereInput[]
    message?: StringFilter<"notifications"> | string
    created_at?: DateTimeNullableFilter<"notifications"> | Date | string | null
    read_status?: BoolNullableFilter<"notifications"> | boolean | null
    user_id?: UuidFilter<"notifications"> | string
    users?: XOR<UsersScalarRelationFilter, usersWhereInput>
  }, "id">

  export type notificationsOrderByWithAggregationInput = {
    id?: SortOrder
    message?: SortOrder
    created_at?: SortOrderInput | SortOrder
    read_status?: SortOrderInput | SortOrder
    user_id?: SortOrder
    _count?: notificationsCountOrderByAggregateInput
    _max?: notificationsMaxOrderByAggregateInput
    _min?: notificationsMinOrderByAggregateInput
  }

  export type notificationsScalarWhereWithAggregatesInput = {
    AND?: notificationsScalarWhereWithAggregatesInput | notificationsScalarWhereWithAggregatesInput[]
    OR?: notificationsScalarWhereWithAggregatesInput[]
    NOT?: notificationsScalarWhereWithAggregatesInput | notificationsScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"notifications"> | string
    message?: StringWithAggregatesFilter<"notifications"> | string
    created_at?: DateTimeNullableWithAggregatesFilter<"notifications"> | Date | string | null
    read_status?: BoolNullableWithAggregatesFilter<"notifications"> | boolean | null
    user_id?: UuidWithAggregatesFilter<"notifications"> | string
  }

  export type publication_filesWhereInput = {
    AND?: publication_filesWhereInput | publication_filesWhereInput[]
    OR?: publication_filesWhereInput[]
    NOT?: publication_filesWhereInput | publication_filesWhereInput[]
    id?: UuidFilter<"publication_files"> | string
    file_type?: StringFilter<"publication_files"> | string
    file_path?: StringFilter<"publication_files"> | string
    publication_id?: UuidFilter<"publication_files"> | string
    publications?: XOR<PublicationsScalarRelationFilter, publicationsWhereInput>
  }

  export type publication_filesOrderByWithRelationInput = {
    id?: SortOrder
    file_type?: SortOrder
    file_path?: SortOrder
    publication_id?: SortOrder
    publications?: publicationsOrderByWithRelationInput
  }

  export type publication_filesWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: publication_filesWhereInput | publication_filesWhereInput[]
    OR?: publication_filesWhereInput[]
    NOT?: publication_filesWhereInput | publication_filesWhereInput[]
    file_type?: StringFilter<"publication_files"> | string
    file_path?: StringFilter<"publication_files"> | string
    publication_id?: UuidFilter<"publication_files"> | string
    publications?: XOR<PublicationsScalarRelationFilter, publicationsWhereInput>
  }, "id">

  export type publication_filesOrderByWithAggregationInput = {
    id?: SortOrder
    file_type?: SortOrder
    file_path?: SortOrder
    publication_id?: SortOrder
    _count?: publication_filesCountOrderByAggregateInput
    _max?: publication_filesMaxOrderByAggregateInput
    _min?: publication_filesMinOrderByAggregateInput
  }

  export type publication_filesScalarWhereWithAggregatesInput = {
    AND?: publication_filesScalarWhereWithAggregatesInput | publication_filesScalarWhereWithAggregatesInput[]
    OR?: publication_filesScalarWhereWithAggregatesInput[]
    NOT?: publication_filesScalarWhereWithAggregatesInput | publication_filesScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"publication_files"> | string
    file_type?: StringWithAggregatesFilter<"publication_files"> | string
    file_path?: StringWithAggregatesFilter<"publication_files"> | string
    publication_id?: UuidWithAggregatesFilter<"publication_files"> | string
  }

  export type publicationsWhereInput = {
    AND?: publicationsWhereInput | publicationsWhereInput[]
    OR?: publicationsWhereInput[]
    NOT?: publicationsWhereInput | publicationsWhereInput[]
    id?: UuidFilter<"publications"> | string
    title?: StringFilter<"publications"> | string
    journal?: StringFilter<"publications"> | string
    status?: StringFilter<"publications"> | string
    visibility?: StringFilter<"publications"> | string
    submitter_id?: UuidFilter<"publications"> | string
    conference_id?: UuidNullableFilter<"publications"> | string | null
    submitted_at?: DateTimeFilter<"publications"> | Date | string
    groups?: GroupsListRelationFilter
    publication_files?: Publication_filesListRelationFilter
    conferences?: XOR<ConferencesNullableScalarRelationFilter, conferencesWhereInput> | null
    users?: XOR<UsersScalarRelationFilter, usersWhereInput>
  }

  export type publicationsOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    journal?: SortOrder
    status?: SortOrder
    visibility?: SortOrder
    submitter_id?: SortOrder
    conference_id?: SortOrderInput | SortOrder
    submitted_at?: SortOrder
    groups?: groupsOrderByRelationAggregateInput
    publication_files?: publication_filesOrderByRelationAggregateInput
    conferences?: conferencesOrderByWithRelationInput
    users?: usersOrderByWithRelationInput
  }

  export type publicationsWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: publicationsWhereInput | publicationsWhereInput[]
    OR?: publicationsWhereInput[]
    NOT?: publicationsWhereInput | publicationsWhereInput[]
    title?: StringFilter<"publications"> | string
    journal?: StringFilter<"publications"> | string
    status?: StringFilter<"publications"> | string
    visibility?: StringFilter<"publications"> | string
    submitter_id?: UuidFilter<"publications"> | string
    conference_id?: UuidNullableFilter<"publications"> | string | null
    submitted_at?: DateTimeFilter<"publications"> | Date | string
    groups?: GroupsListRelationFilter
    publication_files?: Publication_filesListRelationFilter
    conferences?: XOR<ConferencesNullableScalarRelationFilter, conferencesWhereInput> | null
    users?: XOR<UsersScalarRelationFilter, usersWhereInput>
  }, "id">

  export type publicationsOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    journal?: SortOrder
    status?: SortOrder
    visibility?: SortOrder
    submitter_id?: SortOrder
    conference_id?: SortOrderInput | SortOrder
    submitted_at?: SortOrder
    _count?: publicationsCountOrderByAggregateInput
    _max?: publicationsMaxOrderByAggregateInput
    _min?: publicationsMinOrderByAggregateInput
  }

  export type publicationsScalarWhereWithAggregatesInput = {
    AND?: publicationsScalarWhereWithAggregatesInput | publicationsScalarWhereWithAggregatesInput[]
    OR?: publicationsScalarWhereWithAggregatesInput[]
    NOT?: publicationsScalarWhereWithAggregatesInput | publicationsScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"publications"> | string
    title?: StringWithAggregatesFilter<"publications"> | string
    journal?: StringWithAggregatesFilter<"publications"> | string
    status?: StringWithAggregatesFilter<"publications"> | string
    visibility?: StringWithAggregatesFilter<"publications"> | string
    submitter_id?: UuidWithAggregatesFilter<"publications"> | string
    conference_id?: UuidNullableWithAggregatesFilter<"publications"> | string | null
    submitted_at?: DateTimeWithAggregatesFilter<"publications"> | Date | string
  }

  export type speakerWhereInput = {
    AND?: speakerWhereInput | speakerWhereInput[]
    OR?: speakerWhereInput[]
    NOT?: speakerWhereInput | speakerWhereInput[]
    id?: IntFilter<"speaker"> | number
    user_id?: UuidFilter<"speaker"> | string
    conference_id?: UuidFilter<"speaker"> | string
    affiliation?: StringNullableFilter<"speaker"> | string | null
    title?: StringNullableFilter<"speaker"> | string | null
    created_at?: DateTimeNullableFilter<"speaker"> | Date | string | null
    updated_at?: DateTimeNullableFilter<"speaker"> | Date | string | null
    conferences?: XOR<ConferencesScalarRelationFilter, conferencesWhereInput>
    users?: XOR<UsersScalarRelationFilter, usersWhereInput>
  }

  export type speakerOrderByWithRelationInput = {
    id?: SortOrder
    user_id?: SortOrder
    conference_id?: SortOrder
    affiliation?: SortOrderInput | SortOrder
    title?: SortOrderInput | SortOrder
    created_at?: SortOrderInput | SortOrder
    updated_at?: SortOrderInput | SortOrder
    conferences?: conferencesOrderByWithRelationInput
    users?: usersOrderByWithRelationInput
  }

  export type speakerWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: speakerWhereInput | speakerWhereInput[]
    OR?: speakerWhereInput[]
    NOT?: speakerWhereInput | speakerWhereInput[]
    user_id?: UuidFilter<"speaker"> | string
    conference_id?: UuidFilter<"speaker"> | string
    affiliation?: StringNullableFilter<"speaker"> | string | null
    title?: StringNullableFilter<"speaker"> | string | null
    created_at?: DateTimeNullableFilter<"speaker"> | Date | string | null
    updated_at?: DateTimeNullableFilter<"speaker"> | Date | string | null
    conferences?: XOR<ConferencesScalarRelationFilter, conferencesWhereInput>
    users?: XOR<UsersScalarRelationFilter, usersWhereInput>
  }, "id">

  export type speakerOrderByWithAggregationInput = {
    id?: SortOrder
    user_id?: SortOrder
    conference_id?: SortOrder
    affiliation?: SortOrderInput | SortOrder
    title?: SortOrderInput | SortOrder
    created_at?: SortOrderInput | SortOrder
    updated_at?: SortOrderInput | SortOrder
    _count?: speakerCountOrderByAggregateInput
    _avg?: speakerAvgOrderByAggregateInput
    _max?: speakerMaxOrderByAggregateInput
    _min?: speakerMinOrderByAggregateInput
    _sum?: speakerSumOrderByAggregateInput
  }

  export type speakerScalarWhereWithAggregatesInput = {
    AND?: speakerScalarWhereWithAggregatesInput | speakerScalarWhereWithAggregatesInput[]
    OR?: speakerScalarWhereWithAggregatesInput[]
    NOT?: speakerScalarWhereWithAggregatesInput | speakerScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"speaker"> | number
    user_id?: UuidWithAggregatesFilter<"speaker"> | string
    conference_id?: UuidWithAggregatesFilter<"speaker"> | string
    affiliation?: StringNullableWithAggregatesFilter<"speaker"> | string | null
    title?: StringNullableWithAggregatesFilter<"speaker"> | string | null
    created_at?: DateTimeNullableWithAggregatesFilter<"speaker"> | Date | string | null
    updated_at?: DateTimeNullableWithAggregatesFilter<"speaker"> | Date | string | null
  }

  export type usersWhereInput = {
    AND?: usersWhereInput | usersWhereInput[]
    OR?: usersWhereInput[]
    NOT?: usersWhereInput | usersWhereInput[]
    id?: UuidFilter<"users"> | string
    username?: StringFilter<"users"> | string
    email?: StringFilter<"users"> | string
    password_hash?: StringFilter<"users"> | string
    first_name?: StringNullableFilter<"users"> | string | null
    last_name?: StringNullableFilter<"users"> | string | null
    bio?: StringNullableFilter<"users"> | string | null
    photo_url?: StringNullableFilter<"users"> | string | null
    role?: StringFilter<"users"> | string
    status?: StringNullableFilter<"users"> | string | null
    affiliation?: StringNullableFilter<"users"> | string | null
    created_at?: DateTimeNullableFilter<"users"> | Date | string | null
    updated_at?: DateTimeNullableFilter<"users"> | Date | string | null
    groups?: GroupsListRelationFilter
    links?: LinksListRelationFilter
    messages_messages_receiver_idTousers?: MessagesListRelationFilter
    messages_messages_sender_idTousers?: MessagesListRelationFilter
    notifications?: NotificationsListRelationFilter
    publications?: PublicationsListRelationFilter
    speaker?: SpeakerListRelationFilter
  }

  export type usersOrderByWithRelationInput = {
    id?: SortOrder
    username?: SortOrder
    email?: SortOrder
    password_hash?: SortOrder
    first_name?: SortOrderInput | SortOrder
    last_name?: SortOrderInput | SortOrder
    bio?: SortOrderInput | SortOrder
    photo_url?: SortOrderInput | SortOrder
    role?: SortOrder
    status?: SortOrderInput | SortOrder
    affiliation?: SortOrderInput | SortOrder
    created_at?: SortOrderInput | SortOrder
    updated_at?: SortOrderInput | SortOrder
    groups?: groupsOrderByRelationAggregateInput
    links?: linksOrderByRelationAggregateInput
    messages_messages_receiver_idTousers?: messagesOrderByRelationAggregateInput
    messages_messages_sender_idTousers?: messagesOrderByRelationAggregateInput
    notifications?: notificationsOrderByRelationAggregateInput
    publications?: publicationsOrderByRelationAggregateInput
    speaker?: speakerOrderByRelationAggregateInput
  }

  export type usersWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    username?: string
    email?: string
    AND?: usersWhereInput | usersWhereInput[]
    OR?: usersWhereInput[]
    NOT?: usersWhereInput | usersWhereInput[]
    password_hash?: StringFilter<"users"> | string
    first_name?: StringNullableFilter<"users"> | string | null
    last_name?: StringNullableFilter<"users"> | string | null
    bio?: StringNullableFilter<"users"> | string | null
    photo_url?: StringNullableFilter<"users"> | string | null
    role?: StringFilter<"users"> | string
    status?: StringNullableFilter<"users"> | string | null
    affiliation?: StringNullableFilter<"users"> | string | null
    created_at?: DateTimeNullableFilter<"users"> | Date | string | null
    updated_at?: DateTimeNullableFilter<"users"> | Date | string | null
    groups?: GroupsListRelationFilter
    links?: LinksListRelationFilter
    messages_messages_receiver_idTousers?: MessagesListRelationFilter
    messages_messages_sender_idTousers?: MessagesListRelationFilter
    notifications?: NotificationsListRelationFilter
    publications?: PublicationsListRelationFilter
    speaker?: SpeakerListRelationFilter
  }, "id" | "username" | "email">

  export type usersOrderByWithAggregationInput = {
    id?: SortOrder
    username?: SortOrder
    email?: SortOrder
    password_hash?: SortOrder
    first_name?: SortOrderInput | SortOrder
    last_name?: SortOrderInput | SortOrder
    bio?: SortOrderInput | SortOrder
    photo_url?: SortOrderInput | SortOrder
    role?: SortOrder
    status?: SortOrderInput | SortOrder
    affiliation?: SortOrderInput | SortOrder
    created_at?: SortOrderInput | SortOrder
    updated_at?: SortOrderInput | SortOrder
    _count?: usersCountOrderByAggregateInput
    _max?: usersMaxOrderByAggregateInput
    _min?: usersMinOrderByAggregateInput
  }

  export type usersScalarWhereWithAggregatesInput = {
    AND?: usersScalarWhereWithAggregatesInput | usersScalarWhereWithAggregatesInput[]
    OR?: usersScalarWhereWithAggregatesInput[]
    NOT?: usersScalarWhereWithAggregatesInput | usersScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"users"> | string
    username?: StringWithAggregatesFilter<"users"> | string
    email?: StringWithAggregatesFilter<"users"> | string
    password_hash?: StringWithAggregatesFilter<"users"> | string
    first_name?: StringNullableWithAggregatesFilter<"users"> | string | null
    last_name?: StringNullableWithAggregatesFilter<"users"> | string | null
    bio?: StringNullableWithAggregatesFilter<"users"> | string | null
    photo_url?: StringNullableWithAggregatesFilter<"users"> | string | null
    role?: StringWithAggregatesFilter<"users"> | string
    status?: StringNullableWithAggregatesFilter<"users"> | string | null
    affiliation?: StringNullableWithAggregatesFilter<"users"> | string | null
    created_at?: DateTimeNullableWithAggregatesFilter<"users"> | Date | string | null
    updated_at?: DateTimeNullableWithAggregatesFilter<"users"> | Date | string | null
  }

  export type conferencesCreateInput = {
    id: string
    name: string
    description: string
    location: string
    start_date: Date | string
    end_date: Date | string
    publications?: publicationsCreateNestedManyWithoutConferencesInput
    speaker?: speakerCreateNestedManyWithoutConferencesInput
  }

  export type conferencesUncheckedCreateInput = {
    id: string
    name: string
    description: string
    location: string
    start_date: Date | string
    end_date: Date | string
    publications?: publicationsUncheckedCreateNestedManyWithoutConferencesInput
    speaker?: speakerUncheckedCreateNestedManyWithoutConferencesInput
  }

  export type conferencesUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    start_date?: DateTimeFieldUpdateOperationsInput | Date | string
    end_date?: DateTimeFieldUpdateOperationsInput | Date | string
    publications?: publicationsUpdateManyWithoutConferencesNestedInput
    speaker?: speakerUpdateManyWithoutConferencesNestedInput
  }

  export type conferencesUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    start_date?: DateTimeFieldUpdateOperationsInput | Date | string
    end_date?: DateTimeFieldUpdateOperationsInput | Date | string
    publications?: publicationsUncheckedUpdateManyWithoutConferencesNestedInput
    speaker?: speakerUncheckedUpdateManyWithoutConferencesNestedInput
  }

  export type conferencesCreateManyInput = {
    id: string
    name: string
    description: string
    location: string
    start_date: Date | string
    end_date: Date | string
  }

  export type conferencesUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    start_date?: DateTimeFieldUpdateOperationsInput | Date | string
    end_date?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type conferencesUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    start_date?: DateTimeFieldUpdateOperationsInput | Date | string
    end_date?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type groupsCreateInput = {
    id: string
    title?: string
    description?: string
    status?: string
    created_at?: Date | string
    users: usersCreateNestedOneWithoutGroupsInput
    publications: publicationsCreateNestedOneWithoutGroupsInput
  }

  export type groupsUncheckedCreateInput = {
    id: string
    title?: string
    description?: string
    status?: string
    created_at?: Date | string
    leader_id: string
    publication_id: string
  }

  export type groupsUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: usersUpdateOneRequiredWithoutGroupsNestedInput
    publications?: publicationsUpdateOneRequiredWithoutGroupsNestedInput
  }

  export type groupsUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    leader_id?: StringFieldUpdateOperationsInput | string
    publication_id?: StringFieldUpdateOperationsInput | string
  }

  export type groupsCreateManyInput = {
    id: string
    title?: string
    description?: string
    status?: string
    created_at?: Date | string
    leader_id: string
    publication_id: string
  }

  export type groupsUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type groupsUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    leader_id?: StringFieldUpdateOperationsInput | string
    publication_id?: StringFieldUpdateOperationsInput | string
  }

  export type linksCreateInput = {
    id: string
    type?: string | null
    link?: string | null
    users: usersCreateNestedOneWithoutLinksInput
  }

  export type linksUncheckedCreateInput = {
    id: string
    type?: string | null
    link?: string | null
    user_id: string
  }

  export type linksUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: NullableStringFieldUpdateOperationsInput | string | null
    link?: NullableStringFieldUpdateOperationsInput | string | null
    users?: usersUpdateOneRequiredWithoutLinksNestedInput
  }

  export type linksUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: NullableStringFieldUpdateOperationsInput | string | null
    link?: NullableStringFieldUpdateOperationsInput | string | null
    user_id?: StringFieldUpdateOperationsInput | string
  }

  export type linksCreateManyInput = {
    id: string
    type?: string | null
    link?: string | null
    user_id: string
  }

  export type linksUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: NullableStringFieldUpdateOperationsInput | string | null
    link?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type linksUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: NullableStringFieldUpdateOperationsInput | string | null
    link?: NullableStringFieldUpdateOperationsInput | string | null
    user_id?: StringFieldUpdateOperationsInput | string
  }

  export type messagesCreateInput = {
    id: string
    message: string
    created_at?: Date | string | null
    status?: string | null
    users_messages_receiver_idTousers: usersCreateNestedOneWithoutMessages_messages_receiver_idTousersInput
    users_messages_sender_idTousers: usersCreateNestedOneWithoutMessages_messages_sender_idTousersInput
  }

  export type messagesUncheckedCreateInput = {
    id: string
    message: string
    created_at?: Date | string | null
    status?: string | null
    sender_id: string
    receiver_id: string
  }

  export type messagesUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    users_messages_receiver_idTousers?: usersUpdateOneRequiredWithoutMessages_messages_receiver_idTousersNestedInput
    users_messages_sender_idTousers?: usersUpdateOneRequiredWithoutMessages_messages_sender_idTousersNestedInput
  }

  export type messagesUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    sender_id?: StringFieldUpdateOperationsInput | string
    receiver_id?: StringFieldUpdateOperationsInput | string
  }

  export type messagesCreateManyInput = {
    id: string
    message: string
    created_at?: Date | string | null
    status?: string | null
    sender_id: string
    receiver_id: string
  }

  export type messagesUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type messagesUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    sender_id?: StringFieldUpdateOperationsInput | string
    receiver_id?: StringFieldUpdateOperationsInput | string
  }

  export type notificationsCreateInput = {
    id: string
    message: string
    created_at?: Date | string | null
    read_status?: boolean | null
    users: usersCreateNestedOneWithoutNotificationsInput
  }

  export type notificationsUncheckedCreateInput = {
    id: string
    message: string
    created_at?: Date | string | null
    read_status?: boolean | null
    user_id: string
  }

  export type notificationsUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    read_status?: NullableBoolFieldUpdateOperationsInput | boolean | null
    users?: usersUpdateOneRequiredWithoutNotificationsNestedInput
  }

  export type notificationsUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    read_status?: NullableBoolFieldUpdateOperationsInput | boolean | null
    user_id?: StringFieldUpdateOperationsInput | string
  }

  export type notificationsCreateManyInput = {
    id: string
    message: string
    created_at?: Date | string | null
    read_status?: boolean | null
    user_id: string
  }

  export type notificationsUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    read_status?: NullableBoolFieldUpdateOperationsInput | boolean | null
  }

  export type notificationsUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    read_status?: NullableBoolFieldUpdateOperationsInput | boolean | null
    user_id?: StringFieldUpdateOperationsInput | string
  }

  export type publication_filesCreateInput = {
    id: string
    file_type: string
    file_path: string
    publications: publicationsCreateNestedOneWithoutPublication_filesInput
  }

  export type publication_filesUncheckedCreateInput = {
    id: string
    file_type: string
    file_path: string
    publication_id: string
  }

  export type publication_filesUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    file_type?: StringFieldUpdateOperationsInput | string
    file_path?: StringFieldUpdateOperationsInput | string
    publications?: publicationsUpdateOneRequiredWithoutPublication_filesNestedInput
  }

  export type publication_filesUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    file_type?: StringFieldUpdateOperationsInput | string
    file_path?: StringFieldUpdateOperationsInput | string
    publication_id?: StringFieldUpdateOperationsInput | string
  }

  export type publication_filesCreateManyInput = {
    id: string
    file_type: string
    file_path: string
    publication_id: string
  }

  export type publication_filesUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    file_type?: StringFieldUpdateOperationsInput | string
    file_path?: StringFieldUpdateOperationsInput | string
  }

  export type publication_filesUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    file_type?: StringFieldUpdateOperationsInput | string
    file_path?: StringFieldUpdateOperationsInput | string
    publication_id?: StringFieldUpdateOperationsInput | string
  }

  export type publicationsCreateInput = {
    id: string
    title: string
    journal: string
    status?: string
    visibility?: string
    submitted_at?: Date | string
    groups?: groupsCreateNestedManyWithoutPublicationsInput
    publication_files?: publication_filesCreateNestedManyWithoutPublicationsInput
    conferences?: conferencesCreateNestedOneWithoutPublicationsInput
    users: usersCreateNestedOneWithoutPublicationsInput
  }

  export type publicationsUncheckedCreateInput = {
    id: string
    title: string
    journal: string
    status?: string
    visibility?: string
    submitter_id: string
    conference_id?: string | null
    submitted_at?: Date | string
    groups?: groupsUncheckedCreateNestedManyWithoutPublicationsInput
    publication_files?: publication_filesUncheckedCreateNestedManyWithoutPublicationsInput
  }

  export type publicationsUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    journal?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    visibility?: StringFieldUpdateOperationsInput | string
    submitted_at?: DateTimeFieldUpdateOperationsInput | Date | string
    groups?: groupsUpdateManyWithoutPublicationsNestedInput
    publication_files?: publication_filesUpdateManyWithoutPublicationsNestedInput
    conferences?: conferencesUpdateOneWithoutPublicationsNestedInput
    users?: usersUpdateOneRequiredWithoutPublicationsNestedInput
  }

  export type publicationsUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    journal?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    visibility?: StringFieldUpdateOperationsInput | string
    submitter_id?: StringFieldUpdateOperationsInput | string
    conference_id?: NullableStringFieldUpdateOperationsInput | string | null
    submitted_at?: DateTimeFieldUpdateOperationsInput | Date | string
    groups?: groupsUncheckedUpdateManyWithoutPublicationsNestedInput
    publication_files?: publication_filesUncheckedUpdateManyWithoutPublicationsNestedInput
  }

  export type publicationsCreateManyInput = {
    id: string
    title: string
    journal: string
    status?: string
    visibility?: string
    submitter_id: string
    conference_id?: string | null
    submitted_at?: Date | string
  }

  export type publicationsUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    journal?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    visibility?: StringFieldUpdateOperationsInput | string
    submitted_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type publicationsUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    journal?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    visibility?: StringFieldUpdateOperationsInput | string
    submitter_id?: StringFieldUpdateOperationsInput | string
    conference_id?: NullableStringFieldUpdateOperationsInput | string | null
    submitted_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type speakerCreateInput = {
    affiliation?: string | null
    title?: string | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    conferences: conferencesCreateNestedOneWithoutSpeakerInput
    users: usersCreateNestedOneWithoutSpeakerInput
  }

  export type speakerUncheckedCreateInput = {
    id?: number
    user_id: string
    conference_id: string
    affiliation?: string | null
    title?: string | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
  }

  export type speakerUpdateInput = {
    affiliation?: NullableStringFieldUpdateOperationsInput | string | null
    title?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    conferences?: conferencesUpdateOneRequiredWithoutSpeakerNestedInput
    users?: usersUpdateOneRequiredWithoutSpeakerNestedInput
  }

  export type speakerUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    user_id?: StringFieldUpdateOperationsInput | string
    conference_id?: StringFieldUpdateOperationsInput | string
    affiliation?: NullableStringFieldUpdateOperationsInput | string | null
    title?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type speakerCreateManyInput = {
    id?: number
    user_id: string
    conference_id: string
    affiliation?: string | null
    title?: string | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
  }

  export type speakerUpdateManyMutationInput = {
    affiliation?: NullableStringFieldUpdateOperationsInput | string | null
    title?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type speakerUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    user_id?: StringFieldUpdateOperationsInput | string
    conference_id?: StringFieldUpdateOperationsInput | string
    affiliation?: NullableStringFieldUpdateOperationsInput | string | null
    title?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type usersCreateInput = {
    id: string
    username: string
    email: string
    password_hash: string
    first_name?: string | null
    last_name?: string | null
    bio?: string | null
    photo_url?: string | null
    role: string
    status?: string | null
    affiliation?: string | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    groups?: groupsCreateNestedManyWithoutUsersInput
    links?: linksCreateNestedManyWithoutUsersInput
    messages_messages_receiver_idTousers?: messagesCreateNestedManyWithoutUsers_messages_receiver_idTousersInput
    messages_messages_sender_idTousers?: messagesCreateNestedManyWithoutUsers_messages_sender_idTousersInput
    notifications?: notificationsCreateNestedManyWithoutUsersInput
    publications?: publicationsCreateNestedManyWithoutUsersInput
    speaker?: speakerCreateNestedManyWithoutUsersInput
  }

  export type usersUncheckedCreateInput = {
    id: string
    username: string
    email: string
    password_hash: string
    first_name?: string | null
    last_name?: string | null
    bio?: string | null
    photo_url?: string | null
    role: string
    status?: string | null
    affiliation?: string | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    groups?: groupsUncheckedCreateNestedManyWithoutUsersInput
    links?: linksUncheckedCreateNestedManyWithoutUsersInput
    messages_messages_receiver_idTousers?: messagesUncheckedCreateNestedManyWithoutUsers_messages_receiver_idTousersInput
    messages_messages_sender_idTousers?: messagesUncheckedCreateNestedManyWithoutUsers_messages_sender_idTousersInput
    notifications?: notificationsUncheckedCreateNestedManyWithoutUsersInput
    publications?: publicationsUncheckedCreateNestedManyWithoutUsersInput
    speaker?: speakerUncheckedCreateNestedManyWithoutUsersInput
  }

  export type usersUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    first_name?: NullableStringFieldUpdateOperationsInput | string | null
    last_name?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    photo_url?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    status?: NullableStringFieldUpdateOperationsInput | string | null
    affiliation?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    groups?: groupsUpdateManyWithoutUsersNestedInput
    links?: linksUpdateManyWithoutUsersNestedInput
    messages_messages_receiver_idTousers?: messagesUpdateManyWithoutUsers_messages_receiver_idTousersNestedInput
    messages_messages_sender_idTousers?: messagesUpdateManyWithoutUsers_messages_sender_idTousersNestedInput
    notifications?: notificationsUpdateManyWithoutUsersNestedInput
    publications?: publicationsUpdateManyWithoutUsersNestedInput
    speaker?: speakerUpdateManyWithoutUsersNestedInput
  }

  export type usersUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    first_name?: NullableStringFieldUpdateOperationsInput | string | null
    last_name?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    photo_url?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    status?: NullableStringFieldUpdateOperationsInput | string | null
    affiliation?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    groups?: groupsUncheckedUpdateManyWithoutUsersNestedInput
    links?: linksUncheckedUpdateManyWithoutUsersNestedInput
    messages_messages_receiver_idTousers?: messagesUncheckedUpdateManyWithoutUsers_messages_receiver_idTousersNestedInput
    messages_messages_sender_idTousers?: messagesUncheckedUpdateManyWithoutUsers_messages_sender_idTousersNestedInput
    notifications?: notificationsUncheckedUpdateManyWithoutUsersNestedInput
    publications?: publicationsUncheckedUpdateManyWithoutUsersNestedInput
    speaker?: speakerUncheckedUpdateManyWithoutUsersNestedInput
  }

  export type usersCreateManyInput = {
    id: string
    username: string
    email: string
    password_hash: string
    first_name?: string | null
    last_name?: string | null
    bio?: string | null
    photo_url?: string | null
    role: string
    status?: string | null
    affiliation?: string | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
  }

  export type usersUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    first_name?: NullableStringFieldUpdateOperationsInput | string | null
    last_name?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    photo_url?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    status?: NullableStringFieldUpdateOperationsInput | string | null
    affiliation?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type usersUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    first_name?: NullableStringFieldUpdateOperationsInput | string | null
    last_name?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    photo_url?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    status?: NullableStringFieldUpdateOperationsInput | string | null
    affiliation?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type UuidFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidFilter<$PrismaModel> | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type PublicationsListRelationFilter = {
    every?: publicationsWhereInput
    some?: publicationsWhereInput
    none?: publicationsWhereInput
  }

  export type SpeakerListRelationFilter = {
    every?: speakerWhereInput
    some?: speakerWhereInput
    none?: speakerWhereInput
  }

  export type publicationsOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type speakerOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type conferencesCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    location?: SortOrder
    start_date?: SortOrder
    end_date?: SortOrder
  }

  export type conferencesMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    location?: SortOrder
    start_date?: SortOrder
    end_date?: SortOrder
  }

  export type conferencesMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    location?: SortOrder
    start_date?: SortOrder
    end_date?: SortOrder
  }

  export type UuidWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type UsersScalarRelationFilter = {
    is?: usersWhereInput
    isNot?: usersWhereInput
  }

  export type PublicationsScalarRelationFilter = {
    is?: publicationsWhereInput
    isNot?: publicationsWhereInput
  }

  export type groupsCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    status?: SortOrder
    created_at?: SortOrder
    leader_id?: SortOrder
    publication_id?: SortOrder
  }

  export type groupsMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    status?: SortOrder
    created_at?: SortOrder
    leader_id?: SortOrder
    publication_id?: SortOrder
  }

  export type groupsMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    status?: SortOrder
    created_at?: SortOrder
    leader_id?: SortOrder
    publication_id?: SortOrder
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type linksCountOrderByAggregateInput = {
    id?: SortOrder
    type?: SortOrder
    link?: SortOrder
    user_id?: SortOrder
  }

  export type linksMaxOrderByAggregateInput = {
    id?: SortOrder
    type?: SortOrder
    link?: SortOrder
    user_id?: SortOrder
  }

  export type linksMinOrderByAggregateInput = {
    id?: SortOrder
    type?: SortOrder
    link?: SortOrder
    user_id?: SortOrder
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type messagesCountOrderByAggregateInput = {
    id?: SortOrder
    message?: SortOrder
    created_at?: SortOrder
    status?: SortOrder
    sender_id?: SortOrder
    receiver_id?: SortOrder
  }

  export type messagesMaxOrderByAggregateInput = {
    id?: SortOrder
    message?: SortOrder
    created_at?: SortOrder
    status?: SortOrder
    sender_id?: SortOrder
    receiver_id?: SortOrder
  }

  export type messagesMinOrderByAggregateInput = {
    id?: SortOrder
    message?: SortOrder
    created_at?: SortOrder
    status?: SortOrder
    sender_id?: SortOrder
    receiver_id?: SortOrder
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type BoolNullableFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableFilter<$PrismaModel> | boolean | null
  }

  export type notificationsCountOrderByAggregateInput = {
    id?: SortOrder
    message?: SortOrder
    created_at?: SortOrder
    read_status?: SortOrder
    user_id?: SortOrder
  }

  export type notificationsMaxOrderByAggregateInput = {
    id?: SortOrder
    message?: SortOrder
    created_at?: SortOrder
    read_status?: SortOrder
    user_id?: SortOrder
  }

  export type notificationsMinOrderByAggregateInput = {
    id?: SortOrder
    message?: SortOrder
    created_at?: SortOrder
    read_status?: SortOrder
    user_id?: SortOrder
  }

  export type BoolNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableWithAggregatesFilter<$PrismaModel> | boolean | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBoolNullableFilter<$PrismaModel>
    _max?: NestedBoolNullableFilter<$PrismaModel>
  }

  export type publication_filesCountOrderByAggregateInput = {
    id?: SortOrder
    file_type?: SortOrder
    file_path?: SortOrder
    publication_id?: SortOrder
  }

  export type publication_filesMaxOrderByAggregateInput = {
    id?: SortOrder
    file_type?: SortOrder
    file_path?: SortOrder
    publication_id?: SortOrder
  }

  export type publication_filesMinOrderByAggregateInput = {
    id?: SortOrder
    file_type?: SortOrder
    file_path?: SortOrder
    publication_id?: SortOrder
  }

  export type UuidNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidNullableFilter<$PrismaModel> | string | null
  }

  export type GroupsListRelationFilter = {
    every?: groupsWhereInput
    some?: groupsWhereInput
    none?: groupsWhereInput
  }

  export type Publication_filesListRelationFilter = {
    every?: publication_filesWhereInput
    some?: publication_filesWhereInput
    none?: publication_filesWhereInput
  }

  export type ConferencesNullableScalarRelationFilter = {
    is?: conferencesWhereInput | null
    isNot?: conferencesWhereInput | null
  }

  export type groupsOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type publication_filesOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type publicationsCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    journal?: SortOrder
    status?: SortOrder
    visibility?: SortOrder
    submitter_id?: SortOrder
    conference_id?: SortOrder
    submitted_at?: SortOrder
  }

  export type publicationsMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    journal?: SortOrder
    status?: SortOrder
    visibility?: SortOrder
    submitter_id?: SortOrder
    conference_id?: SortOrder
    submitted_at?: SortOrder
  }

  export type publicationsMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    journal?: SortOrder
    status?: SortOrder
    visibility?: SortOrder
    submitter_id?: SortOrder
    conference_id?: SortOrder
    submitted_at?: SortOrder
  }

  export type UuidNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type ConferencesScalarRelationFilter = {
    is?: conferencesWhereInput
    isNot?: conferencesWhereInput
  }

  export type speakerCountOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    conference_id?: SortOrder
    affiliation?: SortOrder
    title?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type speakerAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type speakerMaxOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    conference_id?: SortOrder
    affiliation?: SortOrder
    title?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type speakerMinOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    conference_id?: SortOrder
    affiliation?: SortOrder
    title?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type speakerSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type LinksListRelationFilter = {
    every?: linksWhereInput
    some?: linksWhereInput
    none?: linksWhereInput
  }

  export type MessagesListRelationFilter = {
    every?: messagesWhereInput
    some?: messagesWhereInput
    none?: messagesWhereInput
  }

  export type NotificationsListRelationFilter = {
    every?: notificationsWhereInput
    some?: notificationsWhereInput
    none?: notificationsWhereInput
  }

  export type linksOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type messagesOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type notificationsOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type usersCountOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    email?: SortOrder
    password_hash?: SortOrder
    first_name?: SortOrder
    last_name?: SortOrder
    bio?: SortOrder
    photo_url?: SortOrder
    role?: SortOrder
    status?: SortOrder
    affiliation?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type usersMaxOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    email?: SortOrder
    password_hash?: SortOrder
    first_name?: SortOrder
    last_name?: SortOrder
    bio?: SortOrder
    photo_url?: SortOrder
    role?: SortOrder
    status?: SortOrder
    affiliation?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type usersMinOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    email?: SortOrder
    password_hash?: SortOrder
    first_name?: SortOrder
    last_name?: SortOrder
    bio?: SortOrder
    photo_url?: SortOrder
    role?: SortOrder
    status?: SortOrder
    affiliation?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type publicationsCreateNestedManyWithoutConferencesInput = {
    create?: XOR<publicationsCreateWithoutConferencesInput, publicationsUncheckedCreateWithoutConferencesInput> | publicationsCreateWithoutConferencesInput[] | publicationsUncheckedCreateWithoutConferencesInput[]
    connectOrCreate?: publicationsCreateOrConnectWithoutConferencesInput | publicationsCreateOrConnectWithoutConferencesInput[]
    createMany?: publicationsCreateManyConferencesInputEnvelope
    connect?: publicationsWhereUniqueInput | publicationsWhereUniqueInput[]
  }

  export type speakerCreateNestedManyWithoutConferencesInput = {
    create?: XOR<speakerCreateWithoutConferencesInput, speakerUncheckedCreateWithoutConferencesInput> | speakerCreateWithoutConferencesInput[] | speakerUncheckedCreateWithoutConferencesInput[]
    connectOrCreate?: speakerCreateOrConnectWithoutConferencesInput | speakerCreateOrConnectWithoutConferencesInput[]
    createMany?: speakerCreateManyConferencesInputEnvelope
    connect?: speakerWhereUniqueInput | speakerWhereUniqueInput[]
  }

  export type publicationsUncheckedCreateNestedManyWithoutConferencesInput = {
    create?: XOR<publicationsCreateWithoutConferencesInput, publicationsUncheckedCreateWithoutConferencesInput> | publicationsCreateWithoutConferencesInput[] | publicationsUncheckedCreateWithoutConferencesInput[]
    connectOrCreate?: publicationsCreateOrConnectWithoutConferencesInput | publicationsCreateOrConnectWithoutConferencesInput[]
    createMany?: publicationsCreateManyConferencesInputEnvelope
    connect?: publicationsWhereUniqueInput | publicationsWhereUniqueInput[]
  }

  export type speakerUncheckedCreateNestedManyWithoutConferencesInput = {
    create?: XOR<speakerCreateWithoutConferencesInput, speakerUncheckedCreateWithoutConferencesInput> | speakerCreateWithoutConferencesInput[] | speakerUncheckedCreateWithoutConferencesInput[]
    connectOrCreate?: speakerCreateOrConnectWithoutConferencesInput | speakerCreateOrConnectWithoutConferencesInput[]
    createMany?: speakerCreateManyConferencesInputEnvelope
    connect?: speakerWhereUniqueInput | speakerWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type publicationsUpdateManyWithoutConferencesNestedInput = {
    create?: XOR<publicationsCreateWithoutConferencesInput, publicationsUncheckedCreateWithoutConferencesInput> | publicationsCreateWithoutConferencesInput[] | publicationsUncheckedCreateWithoutConferencesInput[]
    connectOrCreate?: publicationsCreateOrConnectWithoutConferencesInput | publicationsCreateOrConnectWithoutConferencesInput[]
    upsert?: publicationsUpsertWithWhereUniqueWithoutConferencesInput | publicationsUpsertWithWhereUniqueWithoutConferencesInput[]
    createMany?: publicationsCreateManyConferencesInputEnvelope
    set?: publicationsWhereUniqueInput | publicationsWhereUniqueInput[]
    disconnect?: publicationsWhereUniqueInput | publicationsWhereUniqueInput[]
    delete?: publicationsWhereUniqueInput | publicationsWhereUniqueInput[]
    connect?: publicationsWhereUniqueInput | publicationsWhereUniqueInput[]
    update?: publicationsUpdateWithWhereUniqueWithoutConferencesInput | publicationsUpdateWithWhereUniqueWithoutConferencesInput[]
    updateMany?: publicationsUpdateManyWithWhereWithoutConferencesInput | publicationsUpdateManyWithWhereWithoutConferencesInput[]
    deleteMany?: publicationsScalarWhereInput | publicationsScalarWhereInput[]
  }

  export type speakerUpdateManyWithoutConferencesNestedInput = {
    create?: XOR<speakerCreateWithoutConferencesInput, speakerUncheckedCreateWithoutConferencesInput> | speakerCreateWithoutConferencesInput[] | speakerUncheckedCreateWithoutConferencesInput[]
    connectOrCreate?: speakerCreateOrConnectWithoutConferencesInput | speakerCreateOrConnectWithoutConferencesInput[]
    upsert?: speakerUpsertWithWhereUniqueWithoutConferencesInput | speakerUpsertWithWhereUniqueWithoutConferencesInput[]
    createMany?: speakerCreateManyConferencesInputEnvelope
    set?: speakerWhereUniqueInput | speakerWhereUniqueInput[]
    disconnect?: speakerWhereUniqueInput | speakerWhereUniqueInput[]
    delete?: speakerWhereUniqueInput | speakerWhereUniqueInput[]
    connect?: speakerWhereUniqueInput | speakerWhereUniqueInput[]
    update?: speakerUpdateWithWhereUniqueWithoutConferencesInput | speakerUpdateWithWhereUniqueWithoutConferencesInput[]
    updateMany?: speakerUpdateManyWithWhereWithoutConferencesInput | speakerUpdateManyWithWhereWithoutConferencesInput[]
    deleteMany?: speakerScalarWhereInput | speakerScalarWhereInput[]
  }

  export type publicationsUncheckedUpdateManyWithoutConferencesNestedInput = {
    create?: XOR<publicationsCreateWithoutConferencesInput, publicationsUncheckedCreateWithoutConferencesInput> | publicationsCreateWithoutConferencesInput[] | publicationsUncheckedCreateWithoutConferencesInput[]
    connectOrCreate?: publicationsCreateOrConnectWithoutConferencesInput | publicationsCreateOrConnectWithoutConferencesInput[]
    upsert?: publicationsUpsertWithWhereUniqueWithoutConferencesInput | publicationsUpsertWithWhereUniqueWithoutConferencesInput[]
    createMany?: publicationsCreateManyConferencesInputEnvelope
    set?: publicationsWhereUniqueInput | publicationsWhereUniqueInput[]
    disconnect?: publicationsWhereUniqueInput | publicationsWhereUniqueInput[]
    delete?: publicationsWhereUniqueInput | publicationsWhereUniqueInput[]
    connect?: publicationsWhereUniqueInput | publicationsWhereUniqueInput[]
    update?: publicationsUpdateWithWhereUniqueWithoutConferencesInput | publicationsUpdateWithWhereUniqueWithoutConferencesInput[]
    updateMany?: publicationsUpdateManyWithWhereWithoutConferencesInput | publicationsUpdateManyWithWhereWithoutConferencesInput[]
    deleteMany?: publicationsScalarWhereInput | publicationsScalarWhereInput[]
  }

  export type speakerUncheckedUpdateManyWithoutConferencesNestedInput = {
    create?: XOR<speakerCreateWithoutConferencesInput, speakerUncheckedCreateWithoutConferencesInput> | speakerCreateWithoutConferencesInput[] | speakerUncheckedCreateWithoutConferencesInput[]
    connectOrCreate?: speakerCreateOrConnectWithoutConferencesInput | speakerCreateOrConnectWithoutConferencesInput[]
    upsert?: speakerUpsertWithWhereUniqueWithoutConferencesInput | speakerUpsertWithWhereUniqueWithoutConferencesInput[]
    createMany?: speakerCreateManyConferencesInputEnvelope
    set?: speakerWhereUniqueInput | speakerWhereUniqueInput[]
    disconnect?: speakerWhereUniqueInput | speakerWhereUniqueInput[]
    delete?: speakerWhereUniqueInput | speakerWhereUniqueInput[]
    connect?: speakerWhereUniqueInput | speakerWhereUniqueInput[]
    update?: speakerUpdateWithWhereUniqueWithoutConferencesInput | speakerUpdateWithWhereUniqueWithoutConferencesInput[]
    updateMany?: speakerUpdateManyWithWhereWithoutConferencesInput | speakerUpdateManyWithWhereWithoutConferencesInput[]
    deleteMany?: speakerScalarWhereInput | speakerScalarWhereInput[]
  }

  export type usersCreateNestedOneWithoutGroupsInput = {
    create?: XOR<usersCreateWithoutGroupsInput, usersUncheckedCreateWithoutGroupsInput>
    connectOrCreate?: usersCreateOrConnectWithoutGroupsInput
    connect?: usersWhereUniqueInput
  }

  export type publicationsCreateNestedOneWithoutGroupsInput = {
    create?: XOR<publicationsCreateWithoutGroupsInput, publicationsUncheckedCreateWithoutGroupsInput>
    connectOrCreate?: publicationsCreateOrConnectWithoutGroupsInput
    connect?: publicationsWhereUniqueInput
  }

  export type usersUpdateOneRequiredWithoutGroupsNestedInput = {
    create?: XOR<usersCreateWithoutGroupsInput, usersUncheckedCreateWithoutGroupsInput>
    connectOrCreate?: usersCreateOrConnectWithoutGroupsInput
    upsert?: usersUpsertWithoutGroupsInput
    connect?: usersWhereUniqueInput
    update?: XOR<XOR<usersUpdateToOneWithWhereWithoutGroupsInput, usersUpdateWithoutGroupsInput>, usersUncheckedUpdateWithoutGroupsInput>
  }

  export type publicationsUpdateOneRequiredWithoutGroupsNestedInput = {
    create?: XOR<publicationsCreateWithoutGroupsInput, publicationsUncheckedCreateWithoutGroupsInput>
    connectOrCreate?: publicationsCreateOrConnectWithoutGroupsInput
    upsert?: publicationsUpsertWithoutGroupsInput
    connect?: publicationsWhereUniqueInput
    update?: XOR<XOR<publicationsUpdateToOneWithWhereWithoutGroupsInput, publicationsUpdateWithoutGroupsInput>, publicationsUncheckedUpdateWithoutGroupsInput>
  }

  export type usersCreateNestedOneWithoutLinksInput = {
    create?: XOR<usersCreateWithoutLinksInput, usersUncheckedCreateWithoutLinksInput>
    connectOrCreate?: usersCreateOrConnectWithoutLinksInput
    connect?: usersWhereUniqueInput
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type usersUpdateOneRequiredWithoutLinksNestedInput = {
    create?: XOR<usersCreateWithoutLinksInput, usersUncheckedCreateWithoutLinksInput>
    connectOrCreate?: usersCreateOrConnectWithoutLinksInput
    upsert?: usersUpsertWithoutLinksInput
    connect?: usersWhereUniqueInput
    update?: XOR<XOR<usersUpdateToOneWithWhereWithoutLinksInput, usersUpdateWithoutLinksInput>, usersUncheckedUpdateWithoutLinksInput>
  }

  export type usersCreateNestedOneWithoutMessages_messages_receiver_idTousersInput = {
    create?: XOR<usersCreateWithoutMessages_messages_receiver_idTousersInput, usersUncheckedCreateWithoutMessages_messages_receiver_idTousersInput>
    connectOrCreate?: usersCreateOrConnectWithoutMessages_messages_receiver_idTousersInput
    connect?: usersWhereUniqueInput
  }

  export type usersCreateNestedOneWithoutMessages_messages_sender_idTousersInput = {
    create?: XOR<usersCreateWithoutMessages_messages_sender_idTousersInput, usersUncheckedCreateWithoutMessages_messages_sender_idTousersInput>
    connectOrCreate?: usersCreateOrConnectWithoutMessages_messages_sender_idTousersInput
    connect?: usersWhereUniqueInput
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type usersUpdateOneRequiredWithoutMessages_messages_receiver_idTousersNestedInput = {
    create?: XOR<usersCreateWithoutMessages_messages_receiver_idTousersInput, usersUncheckedCreateWithoutMessages_messages_receiver_idTousersInput>
    connectOrCreate?: usersCreateOrConnectWithoutMessages_messages_receiver_idTousersInput
    upsert?: usersUpsertWithoutMessages_messages_receiver_idTousersInput
    connect?: usersWhereUniqueInput
    update?: XOR<XOR<usersUpdateToOneWithWhereWithoutMessages_messages_receiver_idTousersInput, usersUpdateWithoutMessages_messages_receiver_idTousersInput>, usersUncheckedUpdateWithoutMessages_messages_receiver_idTousersInput>
  }

  export type usersUpdateOneRequiredWithoutMessages_messages_sender_idTousersNestedInput = {
    create?: XOR<usersCreateWithoutMessages_messages_sender_idTousersInput, usersUncheckedCreateWithoutMessages_messages_sender_idTousersInput>
    connectOrCreate?: usersCreateOrConnectWithoutMessages_messages_sender_idTousersInput
    upsert?: usersUpsertWithoutMessages_messages_sender_idTousersInput
    connect?: usersWhereUniqueInput
    update?: XOR<XOR<usersUpdateToOneWithWhereWithoutMessages_messages_sender_idTousersInput, usersUpdateWithoutMessages_messages_sender_idTousersInput>, usersUncheckedUpdateWithoutMessages_messages_sender_idTousersInput>
  }

  export type usersCreateNestedOneWithoutNotificationsInput = {
    create?: XOR<usersCreateWithoutNotificationsInput, usersUncheckedCreateWithoutNotificationsInput>
    connectOrCreate?: usersCreateOrConnectWithoutNotificationsInput
    connect?: usersWhereUniqueInput
  }

  export type NullableBoolFieldUpdateOperationsInput = {
    set?: boolean | null
  }

  export type usersUpdateOneRequiredWithoutNotificationsNestedInput = {
    create?: XOR<usersCreateWithoutNotificationsInput, usersUncheckedCreateWithoutNotificationsInput>
    connectOrCreate?: usersCreateOrConnectWithoutNotificationsInput
    upsert?: usersUpsertWithoutNotificationsInput
    connect?: usersWhereUniqueInput
    update?: XOR<XOR<usersUpdateToOneWithWhereWithoutNotificationsInput, usersUpdateWithoutNotificationsInput>, usersUncheckedUpdateWithoutNotificationsInput>
  }

  export type publicationsCreateNestedOneWithoutPublication_filesInput = {
    create?: XOR<publicationsCreateWithoutPublication_filesInput, publicationsUncheckedCreateWithoutPublication_filesInput>
    connectOrCreate?: publicationsCreateOrConnectWithoutPublication_filesInput
    connect?: publicationsWhereUniqueInput
  }

  export type publicationsUpdateOneRequiredWithoutPublication_filesNestedInput = {
    create?: XOR<publicationsCreateWithoutPublication_filesInput, publicationsUncheckedCreateWithoutPublication_filesInput>
    connectOrCreate?: publicationsCreateOrConnectWithoutPublication_filesInput
    upsert?: publicationsUpsertWithoutPublication_filesInput
    connect?: publicationsWhereUniqueInput
    update?: XOR<XOR<publicationsUpdateToOneWithWhereWithoutPublication_filesInput, publicationsUpdateWithoutPublication_filesInput>, publicationsUncheckedUpdateWithoutPublication_filesInput>
  }

  export type groupsCreateNestedManyWithoutPublicationsInput = {
    create?: XOR<groupsCreateWithoutPublicationsInput, groupsUncheckedCreateWithoutPublicationsInput> | groupsCreateWithoutPublicationsInput[] | groupsUncheckedCreateWithoutPublicationsInput[]
    connectOrCreate?: groupsCreateOrConnectWithoutPublicationsInput | groupsCreateOrConnectWithoutPublicationsInput[]
    createMany?: groupsCreateManyPublicationsInputEnvelope
    connect?: groupsWhereUniqueInput | groupsWhereUniqueInput[]
  }

  export type publication_filesCreateNestedManyWithoutPublicationsInput = {
    create?: XOR<publication_filesCreateWithoutPublicationsInput, publication_filesUncheckedCreateWithoutPublicationsInput> | publication_filesCreateWithoutPublicationsInput[] | publication_filesUncheckedCreateWithoutPublicationsInput[]
    connectOrCreate?: publication_filesCreateOrConnectWithoutPublicationsInput | publication_filesCreateOrConnectWithoutPublicationsInput[]
    createMany?: publication_filesCreateManyPublicationsInputEnvelope
    connect?: publication_filesWhereUniqueInput | publication_filesWhereUniqueInput[]
  }

  export type conferencesCreateNestedOneWithoutPublicationsInput = {
    create?: XOR<conferencesCreateWithoutPublicationsInput, conferencesUncheckedCreateWithoutPublicationsInput>
    connectOrCreate?: conferencesCreateOrConnectWithoutPublicationsInput
    connect?: conferencesWhereUniqueInput
  }

  export type usersCreateNestedOneWithoutPublicationsInput = {
    create?: XOR<usersCreateWithoutPublicationsInput, usersUncheckedCreateWithoutPublicationsInput>
    connectOrCreate?: usersCreateOrConnectWithoutPublicationsInput
    connect?: usersWhereUniqueInput
  }

  export type groupsUncheckedCreateNestedManyWithoutPublicationsInput = {
    create?: XOR<groupsCreateWithoutPublicationsInput, groupsUncheckedCreateWithoutPublicationsInput> | groupsCreateWithoutPublicationsInput[] | groupsUncheckedCreateWithoutPublicationsInput[]
    connectOrCreate?: groupsCreateOrConnectWithoutPublicationsInput | groupsCreateOrConnectWithoutPublicationsInput[]
    createMany?: groupsCreateManyPublicationsInputEnvelope
    connect?: groupsWhereUniqueInput | groupsWhereUniqueInput[]
  }

  export type publication_filesUncheckedCreateNestedManyWithoutPublicationsInput = {
    create?: XOR<publication_filesCreateWithoutPublicationsInput, publication_filesUncheckedCreateWithoutPublicationsInput> | publication_filesCreateWithoutPublicationsInput[] | publication_filesUncheckedCreateWithoutPublicationsInput[]
    connectOrCreate?: publication_filesCreateOrConnectWithoutPublicationsInput | publication_filesCreateOrConnectWithoutPublicationsInput[]
    createMany?: publication_filesCreateManyPublicationsInputEnvelope
    connect?: publication_filesWhereUniqueInput | publication_filesWhereUniqueInput[]
  }

  export type groupsUpdateManyWithoutPublicationsNestedInput = {
    create?: XOR<groupsCreateWithoutPublicationsInput, groupsUncheckedCreateWithoutPublicationsInput> | groupsCreateWithoutPublicationsInput[] | groupsUncheckedCreateWithoutPublicationsInput[]
    connectOrCreate?: groupsCreateOrConnectWithoutPublicationsInput | groupsCreateOrConnectWithoutPublicationsInput[]
    upsert?: groupsUpsertWithWhereUniqueWithoutPublicationsInput | groupsUpsertWithWhereUniqueWithoutPublicationsInput[]
    createMany?: groupsCreateManyPublicationsInputEnvelope
    set?: groupsWhereUniqueInput | groupsWhereUniqueInput[]
    disconnect?: groupsWhereUniqueInput | groupsWhereUniqueInput[]
    delete?: groupsWhereUniqueInput | groupsWhereUniqueInput[]
    connect?: groupsWhereUniqueInput | groupsWhereUniqueInput[]
    update?: groupsUpdateWithWhereUniqueWithoutPublicationsInput | groupsUpdateWithWhereUniqueWithoutPublicationsInput[]
    updateMany?: groupsUpdateManyWithWhereWithoutPublicationsInput | groupsUpdateManyWithWhereWithoutPublicationsInput[]
    deleteMany?: groupsScalarWhereInput | groupsScalarWhereInput[]
  }

  export type publication_filesUpdateManyWithoutPublicationsNestedInput = {
    create?: XOR<publication_filesCreateWithoutPublicationsInput, publication_filesUncheckedCreateWithoutPublicationsInput> | publication_filesCreateWithoutPublicationsInput[] | publication_filesUncheckedCreateWithoutPublicationsInput[]
    connectOrCreate?: publication_filesCreateOrConnectWithoutPublicationsInput | publication_filesCreateOrConnectWithoutPublicationsInput[]
    upsert?: publication_filesUpsertWithWhereUniqueWithoutPublicationsInput | publication_filesUpsertWithWhereUniqueWithoutPublicationsInput[]
    createMany?: publication_filesCreateManyPublicationsInputEnvelope
    set?: publication_filesWhereUniqueInput | publication_filesWhereUniqueInput[]
    disconnect?: publication_filesWhereUniqueInput | publication_filesWhereUniqueInput[]
    delete?: publication_filesWhereUniqueInput | publication_filesWhereUniqueInput[]
    connect?: publication_filesWhereUniqueInput | publication_filesWhereUniqueInput[]
    update?: publication_filesUpdateWithWhereUniqueWithoutPublicationsInput | publication_filesUpdateWithWhereUniqueWithoutPublicationsInput[]
    updateMany?: publication_filesUpdateManyWithWhereWithoutPublicationsInput | publication_filesUpdateManyWithWhereWithoutPublicationsInput[]
    deleteMany?: publication_filesScalarWhereInput | publication_filesScalarWhereInput[]
  }

  export type conferencesUpdateOneWithoutPublicationsNestedInput = {
    create?: XOR<conferencesCreateWithoutPublicationsInput, conferencesUncheckedCreateWithoutPublicationsInput>
    connectOrCreate?: conferencesCreateOrConnectWithoutPublicationsInput
    upsert?: conferencesUpsertWithoutPublicationsInput
    disconnect?: conferencesWhereInput | boolean
    delete?: conferencesWhereInput | boolean
    connect?: conferencesWhereUniqueInput
    update?: XOR<XOR<conferencesUpdateToOneWithWhereWithoutPublicationsInput, conferencesUpdateWithoutPublicationsInput>, conferencesUncheckedUpdateWithoutPublicationsInput>
  }

  export type usersUpdateOneRequiredWithoutPublicationsNestedInput = {
    create?: XOR<usersCreateWithoutPublicationsInput, usersUncheckedCreateWithoutPublicationsInput>
    connectOrCreate?: usersCreateOrConnectWithoutPublicationsInput
    upsert?: usersUpsertWithoutPublicationsInput
    connect?: usersWhereUniqueInput
    update?: XOR<XOR<usersUpdateToOneWithWhereWithoutPublicationsInput, usersUpdateWithoutPublicationsInput>, usersUncheckedUpdateWithoutPublicationsInput>
  }

  export type groupsUncheckedUpdateManyWithoutPublicationsNestedInput = {
    create?: XOR<groupsCreateWithoutPublicationsInput, groupsUncheckedCreateWithoutPublicationsInput> | groupsCreateWithoutPublicationsInput[] | groupsUncheckedCreateWithoutPublicationsInput[]
    connectOrCreate?: groupsCreateOrConnectWithoutPublicationsInput | groupsCreateOrConnectWithoutPublicationsInput[]
    upsert?: groupsUpsertWithWhereUniqueWithoutPublicationsInput | groupsUpsertWithWhereUniqueWithoutPublicationsInput[]
    createMany?: groupsCreateManyPublicationsInputEnvelope
    set?: groupsWhereUniqueInput | groupsWhereUniqueInput[]
    disconnect?: groupsWhereUniqueInput | groupsWhereUniqueInput[]
    delete?: groupsWhereUniqueInput | groupsWhereUniqueInput[]
    connect?: groupsWhereUniqueInput | groupsWhereUniqueInput[]
    update?: groupsUpdateWithWhereUniqueWithoutPublicationsInput | groupsUpdateWithWhereUniqueWithoutPublicationsInput[]
    updateMany?: groupsUpdateManyWithWhereWithoutPublicationsInput | groupsUpdateManyWithWhereWithoutPublicationsInput[]
    deleteMany?: groupsScalarWhereInput | groupsScalarWhereInput[]
  }

  export type publication_filesUncheckedUpdateManyWithoutPublicationsNestedInput = {
    create?: XOR<publication_filesCreateWithoutPublicationsInput, publication_filesUncheckedCreateWithoutPublicationsInput> | publication_filesCreateWithoutPublicationsInput[] | publication_filesUncheckedCreateWithoutPublicationsInput[]
    connectOrCreate?: publication_filesCreateOrConnectWithoutPublicationsInput | publication_filesCreateOrConnectWithoutPublicationsInput[]
    upsert?: publication_filesUpsertWithWhereUniqueWithoutPublicationsInput | publication_filesUpsertWithWhereUniqueWithoutPublicationsInput[]
    createMany?: publication_filesCreateManyPublicationsInputEnvelope
    set?: publication_filesWhereUniqueInput | publication_filesWhereUniqueInput[]
    disconnect?: publication_filesWhereUniqueInput | publication_filesWhereUniqueInput[]
    delete?: publication_filesWhereUniqueInput | publication_filesWhereUniqueInput[]
    connect?: publication_filesWhereUniqueInput | publication_filesWhereUniqueInput[]
    update?: publication_filesUpdateWithWhereUniqueWithoutPublicationsInput | publication_filesUpdateWithWhereUniqueWithoutPublicationsInput[]
    updateMany?: publication_filesUpdateManyWithWhereWithoutPublicationsInput | publication_filesUpdateManyWithWhereWithoutPublicationsInput[]
    deleteMany?: publication_filesScalarWhereInput | publication_filesScalarWhereInput[]
  }

  export type conferencesCreateNestedOneWithoutSpeakerInput = {
    create?: XOR<conferencesCreateWithoutSpeakerInput, conferencesUncheckedCreateWithoutSpeakerInput>
    connectOrCreate?: conferencesCreateOrConnectWithoutSpeakerInput
    connect?: conferencesWhereUniqueInput
  }

  export type usersCreateNestedOneWithoutSpeakerInput = {
    create?: XOR<usersCreateWithoutSpeakerInput, usersUncheckedCreateWithoutSpeakerInput>
    connectOrCreate?: usersCreateOrConnectWithoutSpeakerInput
    connect?: usersWhereUniqueInput
  }

  export type conferencesUpdateOneRequiredWithoutSpeakerNestedInput = {
    create?: XOR<conferencesCreateWithoutSpeakerInput, conferencesUncheckedCreateWithoutSpeakerInput>
    connectOrCreate?: conferencesCreateOrConnectWithoutSpeakerInput
    upsert?: conferencesUpsertWithoutSpeakerInput
    connect?: conferencesWhereUniqueInput
    update?: XOR<XOR<conferencesUpdateToOneWithWhereWithoutSpeakerInput, conferencesUpdateWithoutSpeakerInput>, conferencesUncheckedUpdateWithoutSpeakerInput>
  }

  export type usersUpdateOneRequiredWithoutSpeakerNestedInput = {
    create?: XOR<usersCreateWithoutSpeakerInput, usersUncheckedCreateWithoutSpeakerInput>
    connectOrCreate?: usersCreateOrConnectWithoutSpeakerInput
    upsert?: usersUpsertWithoutSpeakerInput
    connect?: usersWhereUniqueInput
    update?: XOR<XOR<usersUpdateToOneWithWhereWithoutSpeakerInput, usersUpdateWithoutSpeakerInput>, usersUncheckedUpdateWithoutSpeakerInput>
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type groupsCreateNestedManyWithoutUsersInput = {
    create?: XOR<groupsCreateWithoutUsersInput, groupsUncheckedCreateWithoutUsersInput> | groupsCreateWithoutUsersInput[] | groupsUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: groupsCreateOrConnectWithoutUsersInput | groupsCreateOrConnectWithoutUsersInput[]
    createMany?: groupsCreateManyUsersInputEnvelope
    connect?: groupsWhereUniqueInput | groupsWhereUniqueInput[]
  }

  export type linksCreateNestedManyWithoutUsersInput = {
    create?: XOR<linksCreateWithoutUsersInput, linksUncheckedCreateWithoutUsersInput> | linksCreateWithoutUsersInput[] | linksUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: linksCreateOrConnectWithoutUsersInput | linksCreateOrConnectWithoutUsersInput[]
    createMany?: linksCreateManyUsersInputEnvelope
    connect?: linksWhereUniqueInput | linksWhereUniqueInput[]
  }

  export type messagesCreateNestedManyWithoutUsers_messages_receiver_idTousersInput = {
    create?: XOR<messagesCreateWithoutUsers_messages_receiver_idTousersInput, messagesUncheckedCreateWithoutUsers_messages_receiver_idTousersInput> | messagesCreateWithoutUsers_messages_receiver_idTousersInput[] | messagesUncheckedCreateWithoutUsers_messages_receiver_idTousersInput[]
    connectOrCreate?: messagesCreateOrConnectWithoutUsers_messages_receiver_idTousersInput | messagesCreateOrConnectWithoutUsers_messages_receiver_idTousersInput[]
    createMany?: messagesCreateManyUsers_messages_receiver_idTousersInputEnvelope
    connect?: messagesWhereUniqueInput | messagesWhereUniqueInput[]
  }

  export type messagesCreateNestedManyWithoutUsers_messages_sender_idTousersInput = {
    create?: XOR<messagesCreateWithoutUsers_messages_sender_idTousersInput, messagesUncheckedCreateWithoutUsers_messages_sender_idTousersInput> | messagesCreateWithoutUsers_messages_sender_idTousersInput[] | messagesUncheckedCreateWithoutUsers_messages_sender_idTousersInput[]
    connectOrCreate?: messagesCreateOrConnectWithoutUsers_messages_sender_idTousersInput | messagesCreateOrConnectWithoutUsers_messages_sender_idTousersInput[]
    createMany?: messagesCreateManyUsers_messages_sender_idTousersInputEnvelope
    connect?: messagesWhereUniqueInput | messagesWhereUniqueInput[]
  }

  export type notificationsCreateNestedManyWithoutUsersInput = {
    create?: XOR<notificationsCreateWithoutUsersInput, notificationsUncheckedCreateWithoutUsersInput> | notificationsCreateWithoutUsersInput[] | notificationsUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: notificationsCreateOrConnectWithoutUsersInput | notificationsCreateOrConnectWithoutUsersInput[]
    createMany?: notificationsCreateManyUsersInputEnvelope
    connect?: notificationsWhereUniqueInput | notificationsWhereUniqueInput[]
  }

  export type publicationsCreateNestedManyWithoutUsersInput = {
    create?: XOR<publicationsCreateWithoutUsersInput, publicationsUncheckedCreateWithoutUsersInput> | publicationsCreateWithoutUsersInput[] | publicationsUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: publicationsCreateOrConnectWithoutUsersInput | publicationsCreateOrConnectWithoutUsersInput[]
    createMany?: publicationsCreateManyUsersInputEnvelope
    connect?: publicationsWhereUniqueInput | publicationsWhereUniqueInput[]
  }

  export type speakerCreateNestedManyWithoutUsersInput = {
    create?: XOR<speakerCreateWithoutUsersInput, speakerUncheckedCreateWithoutUsersInput> | speakerCreateWithoutUsersInput[] | speakerUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: speakerCreateOrConnectWithoutUsersInput | speakerCreateOrConnectWithoutUsersInput[]
    createMany?: speakerCreateManyUsersInputEnvelope
    connect?: speakerWhereUniqueInput | speakerWhereUniqueInput[]
  }

  export type groupsUncheckedCreateNestedManyWithoutUsersInput = {
    create?: XOR<groupsCreateWithoutUsersInput, groupsUncheckedCreateWithoutUsersInput> | groupsCreateWithoutUsersInput[] | groupsUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: groupsCreateOrConnectWithoutUsersInput | groupsCreateOrConnectWithoutUsersInput[]
    createMany?: groupsCreateManyUsersInputEnvelope
    connect?: groupsWhereUniqueInput | groupsWhereUniqueInput[]
  }

  export type linksUncheckedCreateNestedManyWithoutUsersInput = {
    create?: XOR<linksCreateWithoutUsersInput, linksUncheckedCreateWithoutUsersInput> | linksCreateWithoutUsersInput[] | linksUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: linksCreateOrConnectWithoutUsersInput | linksCreateOrConnectWithoutUsersInput[]
    createMany?: linksCreateManyUsersInputEnvelope
    connect?: linksWhereUniqueInput | linksWhereUniqueInput[]
  }

  export type messagesUncheckedCreateNestedManyWithoutUsers_messages_receiver_idTousersInput = {
    create?: XOR<messagesCreateWithoutUsers_messages_receiver_idTousersInput, messagesUncheckedCreateWithoutUsers_messages_receiver_idTousersInput> | messagesCreateWithoutUsers_messages_receiver_idTousersInput[] | messagesUncheckedCreateWithoutUsers_messages_receiver_idTousersInput[]
    connectOrCreate?: messagesCreateOrConnectWithoutUsers_messages_receiver_idTousersInput | messagesCreateOrConnectWithoutUsers_messages_receiver_idTousersInput[]
    createMany?: messagesCreateManyUsers_messages_receiver_idTousersInputEnvelope
    connect?: messagesWhereUniqueInput | messagesWhereUniqueInput[]
  }

  export type messagesUncheckedCreateNestedManyWithoutUsers_messages_sender_idTousersInput = {
    create?: XOR<messagesCreateWithoutUsers_messages_sender_idTousersInput, messagesUncheckedCreateWithoutUsers_messages_sender_idTousersInput> | messagesCreateWithoutUsers_messages_sender_idTousersInput[] | messagesUncheckedCreateWithoutUsers_messages_sender_idTousersInput[]
    connectOrCreate?: messagesCreateOrConnectWithoutUsers_messages_sender_idTousersInput | messagesCreateOrConnectWithoutUsers_messages_sender_idTousersInput[]
    createMany?: messagesCreateManyUsers_messages_sender_idTousersInputEnvelope
    connect?: messagesWhereUniqueInput | messagesWhereUniqueInput[]
  }

  export type notificationsUncheckedCreateNestedManyWithoutUsersInput = {
    create?: XOR<notificationsCreateWithoutUsersInput, notificationsUncheckedCreateWithoutUsersInput> | notificationsCreateWithoutUsersInput[] | notificationsUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: notificationsCreateOrConnectWithoutUsersInput | notificationsCreateOrConnectWithoutUsersInput[]
    createMany?: notificationsCreateManyUsersInputEnvelope
    connect?: notificationsWhereUniqueInput | notificationsWhereUniqueInput[]
  }

  export type publicationsUncheckedCreateNestedManyWithoutUsersInput = {
    create?: XOR<publicationsCreateWithoutUsersInput, publicationsUncheckedCreateWithoutUsersInput> | publicationsCreateWithoutUsersInput[] | publicationsUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: publicationsCreateOrConnectWithoutUsersInput | publicationsCreateOrConnectWithoutUsersInput[]
    createMany?: publicationsCreateManyUsersInputEnvelope
    connect?: publicationsWhereUniqueInput | publicationsWhereUniqueInput[]
  }

  export type speakerUncheckedCreateNestedManyWithoutUsersInput = {
    create?: XOR<speakerCreateWithoutUsersInput, speakerUncheckedCreateWithoutUsersInput> | speakerCreateWithoutUsersInput[] | speakerUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: speakerCreateOrConnectWithoutUsersInput | speakerCreateOrConnectWithoutUsersInput[]
    createMany?: speakerCreateManyUsersInputEnvelope
    connect?: speakerWhereUniqueInput | speakerWhereUniqueInput[]
  }

  export type groupsUpdateManyWithoutUsersNestedInput = {
    create?: XOR<groupsCreateWithoutUsersInput, groupsUncheckedCreateWithoutUsersInput> | groupsCreateWithoutUsersInput[] | groupsUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: groupsCreateOrConnectWithoutUsersInput | groupsCreateOrConnectWithoutUsersInput[]
    upsert?: groupsUpsertWithWhereUniqueWithoutUsersInput | groupsUpsertWithWhereUniqueWithoutUsersInput[]
    createMany?: groupsCreateManyUsersInputEnvelope
    set?: groupsWhereUniqueInput | groupsWhereUniqueInput[]
    disconnect?: groupsWhereUniqueInput | groupsWhereUniqueInput[]
    delete?: groupsWhereUniqueInput | groupsWhereUniqueInput[]
    connect?: groupsWhereUniqueInput | groupsWhereUniqueInput[]
    update?: groupsUpdateWithWhereUniqueWithoutUsersInput | groupsUpdateWithWhereUniqueWithoutUsersInput[]
    updateMany?: groupsUpdateManyWithWhereWithoutUsersInput | groupsUpdateManyWithWhereWithoutUsersInput[]
    deleteMany?: groupsScalarWhereInput | groupsScalarWhereInput[]
  }

  export type linksUpdateManyWithoutUsersNestedInput = {
    create?: XOR<linksCreateWithoutUsersInput, linksUncheckedCreateWithoutUsersInput> | linksCreateWithoutUsersInput[] | linksUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: linksCreateOrConnectWithoutUsersInput | linksCreateOrConnectWithoutUsersInput[]
    upsert?: linksUpsertWithWhereUniqueWithoutUsersInput | linksUpsertWithWhereUniqueWithoutUsersInput[]
    createMany?: linksCreateManyUsersInputEnvelope
    set?: linksWhereUniqueInput | linksWhereUniqueInput[]
    disconnect?: linksWhereUniqueInput | linksWhereUniqueInput[]
    delete?: linksWhereUniqueInput | linksWhereUniqueInput[]
    connect?: linksWhereUniqueInput | linksWhereUniqueInput[]
    update?: linksUpdateWithWhereUniqueWithoutUsersInput | linksUpdateWithWhereUniqueWithoutUsersInput[]
    updateMany?: linksUpdateManyWithWhereWithoutUsersInput | linksUpdateManyWithWhereWithoutUsersInput[]
    deleteMany?: linksScalarWhereInput | linksScalarWhereInput[]
  }

  export type messagesUpdateManyWithoutUsers_messages_receiver_idTousersNestedInput = {
    create?: XOR<messagesCreateWithoutUsers_messages_receiver_idTousersInput, messagesUncheckedCreateWithoutUsers_messages_receiver_idTousersInput> | messagesCreateWithoutUsers_messages_receiver_idTousersInput[] | messagesUncheckedCreateWithoutUsers_messages_receiver_idTousersInput[]
    connectOrCreate?: messagesCreateOrConnectWithoutUsers_messages_receiver_idTousersInput | messagesCreateOrConnectWithoutUsers_messages_receiver_idTousersInput[]
    upsert?: messagesUpsertWithWhereUniqueWithoutUsers_messages_receiver_idTousersInput | messagesUpsertWithWhereUniqueWithoutUsers_messages_receiver_idTousersInput[]
    createMany?: messagesCreateManyUsers_messages_receiver_idTousersInputEnvelope
    set?: messagesWhereUniqueInput | messagesWhereUniqueInput[]
    disconnect?: messagesWhereUniqueInput | messagesWhereUniqueInput[]
    delete?: messagesWhereUniqueInput | messagesWhereUniqueInput[]
    connect?: messagesWhereUniqueInput | messagesWhereUniqueInput[]
    update?: messagesUpdateWithWhereUniqueWithoutUsers_messages_receiver_idTousersInput | messagesUpdateWithWhereUniqueWithoutUsers_messages_receiver_idTousersInput[]
    updateMany?: messagesUpdateManyWithWhereWithoutUsers_messages_receiver_idTousersInput | messagesUpdateManyWithWhereWithoutUsers_messages_receiver_idTousersInput[]
    deleteMany?: messagesScalarWhereInput | messagesScalarWhereInput[]
  }

  export type messagesUpdateManyWithoutUsers_messages_sender_idTousersNestedInput = {
    create?: XOR<messagesCreateWithoutUsers_messages_sender_idTousersInput, messagesUncheckedCreateWithoutUsers_messages_sender_idTousersInput> | messagesCreateWithoutUsers_messages_sender_idTousersInput[] | messagesUncheckedCreateWithoutUsers_messages_sender_idTousersInput[]
    connectOrCreate?: messagesCreateOrConnectWithoutUsers_messages_sender_idTousersInput | messagesCreateOrConnectWithoutUsers_messages_sender_idTousersInput[]
    upsert?: messagesUpsertWithWhereUniqueWithoutUsers_messages_sender_idTousersInput | messagesUpsertWithWhereUniqueWithoutUsers_messages_sender_idTousersInput[]
    createMany?: messagesCreateManyUsers_messages_sender_idTousersInputEnvelope
    set?: messagesWhereUniqueInput | messagesWhereUniqueInput[]
    disconnect?: messagesWhereUniqueInput | messagesWhereUniqueInput[]
    delete?: messagesWhereUniqueInput | messagesWhereUniqueInput[]
    connect?: messagesWhereUniqueInput | messagesWhereUniqueInput[]
    update?: messagesUpdateWithWhereUniqueWithoutUsers_messages_sender_idTousersInput | messagesUpdateWithWhereUniqueWithoutUsers_messages_sender_idTousersInput[]
    updateMany?: messagesUpdateManyWithWhereWithoutUsers_messages_sender_idTousersInput | messagesUpdateManyWithWhereWithoutUsers_messages_sender_idTousersInput[]
    deleteMany?: messagesScalarWhereInput | messagesScalarWhereInput[]
  }

  export type notificationsUpdateManyWithoutUsersNestedInput = {
    create?: XOR<notificationsCreateWithoutUsersInput, notificationsUncheckedCreateWithoutUsersInput> | notificationsCreateWithoutUsersInput[] | notificationsUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: notificationsCreateOrConnectWithoutUsersInput | notificationsCreateOrConnectWithoutUsersInput[]
    upsert?: notificationsUpsertWithWhereUniqueWithoutUsersInput | notificationsUpsertWithWhereUniqueWithoutUsersInput[]
    createMany?: notificationsCreateManyUsersInputEnvelope
    set?: notificationsWhereUniqueInput | notificationsWhereUniqueInput[]
    disconnect?: notificationsWhereUniqueInput | notificationsWhereUniqueInput[]
    delete?: notificationsWhereUniqueInput | notificationsWhereUniqueInput[]
    connect?: notificationsWhereUniqueInput | notificationsWhereUniqueInput[]
    update?: notificationsUpdateWithWhereUniqueWithoutUsersInput | notificationsUpdateWithWhereUniqueWithoutUsersInput[]
    updateMany?: notificationsUpdateManyWithWhereWithoutUsersInput | notificationsUpdateManyWithWhereWithoutUsersInput[]
    deleteMany?: notificationsScalarWhereInput | notificationsScalarWhereInput[]
  }

  export type publicationsUpdateManyWithoutUsersNestedInput = {
    create?: XOR<publicationsCreateWithoutUsersInput, publicationsUncheckedCreateWithoutUsersInput> | publicationsCreateWithoutUsersInput[] | publicationsUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: publicationsCreateOrConnectWithoutUsersInput | publicationsCreateOrConnectWithoutUsersInput[]
    upsert?: publicationsUpsertWithWhereUniqueWithoutUsersInput | publicationsUpsertWithWhereUniqueWithoutUsersInput[]
    createMany?: publicationsCreateManyUsersInputEnvelope
    set?: publicationsWhereUniqueInput | publicationsWhereUniqueInput[]
    disconnect?: publicationsWhereUniqueInput | publicationsWhereUniqueInput[]
    delete?: publicationsWhereUniqueInput | publicationsWhereUniqueInput[]
    connect?: publicationsWhereUniqueInput | publicationsWhereUniqueInput[]
    update?: publicationsUpdateWithWhereUniqueWithoutUsersInput | publicationsUpdateWithWhereUniqueWithoutUsersInput[]
    updateMany?: publicationsUpdateManyWithWhereWithoutUsersInput | publicationsUpdateManyWithWhereWithoutUsersInput[]
    deleteMany?: publicationsScalarWhereInput | publicationsScalarWhereInput[]
  }

  export type speakerUpdateManyWithoutUsersNestedInput = {
    create?: XOR<speakerCreateWithoutUsersInput, speakerUncheckedCreateWithoutUsersInput> | speakerCreateWithoutUsersInput[] | speakerUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: speakerCreateOrConnectWithoutUsersInput | speakerCreateOrConnectWithoutUsersInput[]
    upsert?: speakerUpsertWithWhereUniqueWithoutUsersInput | speakerUpsertWithWhereUniqueWithoutUsersInput[]
    createMany?: speakerCreateManyUsersInputEnvelope
    set?: speakerWhereUniqueInput | speakerWhereUniqueInput[]
    disconnect?: speakerWhereUniqueInput | speakerWhereUniqueInput[]
    delete?: speakerWhereUniqueInput | speakerWhereUniqueInput[]
    connect?: speakerWhereUniqueInput | speakerWhereUniqueInput[]
    update?: speakerUpdateWithWhereUniqueWithoutUsersInput | speakerUpdateWithWhereUniqueWithoutUsersInput[]
    updateMany?: speakerUpdateManyWithWhereWithoutUsersInput | speakerUpdateManyWithWhereWithoutUsersInput[]
    deleteMany?: speakerScalarWhereInput | speakerScalarWhereInput[]
  }

  export type groupsUncheckedUpdateManyWithoutUsersNestedInput = {
    create?: XOR<groupsCreateWithoutUsersInput, groupsUncheckedCreateWithoutUsersInput> | groupsCreateWithoutUsersInput[] | groupsUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: groupsCreateOrConnectWithoutUsersInput | groupsCreateOrConnectWithoutUsersInput[]
    upsert?: groupsUpsertWithWhereUniqueWithoutUsersInput | groupsUpsertWithWhereUniqueWithoutUsersInput[]
    createMany?: groupsCreateManyUsersInputEnvelope
    set?: groupsWhereUniqueInput | groupsWhereUniqueInput[]
    disconnect?: groupsWhereUniqueInput | groupsWhereUniqueInput[]
    delete?: groupsWhereUniqueInput | groupsWhereUniqueInput[]
    connect?: groupsWhereUniqueInput | groupsWhereUniqueInput[]
    update?: groupsUpdateWithWhereUniqueWithoutUsersInput | groupsUpdateWithWhereUniqueWithoutUsersInput[]
    updateMany?: groupsUpdateManyWithWhereWithoutUsersInput | groupsUpdateManyWithWhereWithoutUsersInput[]
    deleteMany?: groupsScalarWhereInput | groupsScalarWhereInput[]
  }

  export type linksUncheckedUpdateManyWithoutUsersNestedInput = {
    create?: XOR<linksCreateWithoutUsersInput, linksUncheckedCreateWithoutUsersInput> | linksCreateWithoutUsersInput[] | linksUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: linksCreateOrConnectWithoutUsersInput | linksCreateOrConnectWithoutUsersInput[]
    upsert?: linksUpsertWithWhereUniqueWithoutUsersInput | linksUpsertWithWhereUniqueWithoutUsersInput[]
    createMany?: linksCreateManyUsersInputEnvelope
    set?: linksWhereUniqueInput | linksWhereUniqueInput[]
    disconnect?: linksWhereUniqueInput | linksWhereUniqueInput[]
    delete?: linksWhereUniqueInput | linksWhereUniqueInput[]
    connect?: linksWhereUniqueInput | linksWhereUniqueInput[]
    update?: linksUpdateWithWhereUniqueWithoutUsersInput | linksUpdateWithWhereUniqueWithoutUsersInput[]
    updateMany?: linksUpdateManyWithWhereWithoutUsersInput | linksUpdateManyWithWhereWithoutUsersInput[]
    deleteMany?: linksScalarWhereInput | linksScalarWhereInput[]
  }

  export type messagesUncheckedUpdateManyWithoutUsers_messages_receiver_idTousersNestedInput = {
    create?: XOR<messagesCreateWithoutUsers_messages_receiver_idTousersInput, messagesUncheckedCreateWithoutUsers_messages_receiver_idTousersInput> | messagesCreateWithoutUsers_messages_receiver_idTousersInput[] | messagesUncheckedCreateWithoutUsers_messages_receiver_idTousersInput[]
    connectOrCreate?: messagesCreateOrConnectWithoutUsers_messages_receiver_idTousersInput | messagesCreateOrConnectWithoutUsers_messages_receiver_idTousersInput[]
    upsert?: messagesUpsertWithWhereUniqueWithoutUsers_messages_receiver_idTousersInput | messagesUpsertWithWhereUniqueWithoutUsers_messages_receiver_idTousersInput[]
    createMany?: messagesCreateManyUsers_messages_receiver_idTousersInputEnvelope
    set?: messagesWhereUniqueInput | messagesWhereUniqueInput[]
    disconnect?: messagesWhereUniqueInput | messagesWhereUniqueInput[]
    delete?: messagesWhereUniqueInput | messagesWhereUniqueInput[]
    connect?: messagesWhereUniqueInput | messagesWhereUniqueInput[]
    update?: messagesUpdateWithWhereUniqueWithoutUsers_messages_receiver_idTousersInput | messagesUpdateWithWhereUniqueWithoutUsers_messages_receiver_idTousersInput[]
    updateMany?: messagesUpdateManyWithWhereWithoutUsers_messages_receiver_idTousersInput | messagesUpdateManyWithWhereWithoutUsers_messages_receiver_idTousersInput[]
    deleteMany?: messagesScalarWhereInput | messagesScalarWhereInput[]
  }

  export type messagesUncheckedUpdateManyWithoutUsers_messages_sender_idTousersNestedInput = {
    create?: XOR<messagesCreateWithoutUsers_messages_sender_idTousersInput, messagesUncheckedCreateWithoutUsers_messages_sender_idTousersInput> | messagesCreateWithoutUsers_messages_sender_idTousersInput[] | messagesUncheckedCreateWithoutUsers_messages_sender_idTousersInput[]
    connectOrCreate?: messagesCreateOrConnectWithoutUsers_messages_sender_idTousersInput | messagesCreateOrConnectWithoutUsers_messages_sender_idTousersInput[]
    upsert?: messagesUpsertWithWhereUniqueWithoutUsers_messages_sender_idTousersInput | messagesUpsertWithWhereUniqueWithoutUsers_messages_sender_idTousersInput[]
    createMany?: messagesCreateManyUsers_messages_sender_idTousersInputEnvelope
    set?: messagesWhereUniqueInput | messagesWhereUniqueInput[]
    disconnect?: messagesWhereUniqueInput | messagesWhereUniqueInput[]
    delete?: messagesWhereUniqueInput | messagesWhereUniqueInput[]
    connect?: messagesWhereUniqueInput | messagesWhereUniqueInput[]
    update?: messagesUpdateWithWhereUniqueWithoutUsers_messages_sender_idTousersInput | messagesUpdateWithWhereUniqueWithoutUsers_messages_sender_idTousersInput[]
    updateMany?: messagesUpdateManyWithWhereWithoutUsers_messages_sender_idTousersInput | messagesUpdateManyWithWhereWithoutUsers_messages_sender_idTousersInput[]
    deleteMany?: messagesScalarWhereInput | messagesScalarWhereInput[]
  }

  export type notificationsUncheckedUpdateManyWithoutUsersNestedInput = {
    create?: XOR<notificationsCreateWithoutUsersInput, notificationsUncheckedCreateWithoutUsersInput> | notificationsCreateWithoutUsersInput[] | notificationsUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: notificationsCreateOrConnectWithoutUsersInput | notificationsCreateOrConnectWithoutUsersInput[]
    upsert?: notificationsUpsertWithWhereUniqueWithoutUsersInput | notificationsUpsertWithWhereUniqueWithoutUsersInput[]
    createMany?: notificationsCreateManyUsersInputEnvelope
    set?: notificationsWhereUniqueInput | notificationsWhereUniqueInput[]
    disconnect?: notificationsWhereUniqueInput | notificationsWhereUniqueInput[]
    delete?: notificationsWhereUniqueInput | notificationsWhereUniqueInput[]
    connect?: notificationsWhereUniqueInput | notificationsWhereUniqueInput[]
    update?: notificationsUpdateWithWhereUniqueWithoutUsersInput | notificationsUpdateWithWhereUniqueWithoutUsersInput[]
    updateMany?: notificationsUpdateManyWithWhereWithoutUsersInput | notificationsUpdateManyWithWhereWithoutUsersInput[]
    deleteMany?: notificationsScalarWhereInput | notificationsScalarWhereInput[]
  }

  export type publicationsUncheckedUpdateManyWithoutUsersNestedInput = {
    create?: XOR<publicationsCreateWithoutUsersInput, publicationsUncheckedCreateWithoutUsersInput> | publicationsCreateWithoutUsersInput[] | publicationsUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: publicationsCreateOrConnectWithoutUsersInput | publicationsCreateOrConnectWithoutUsersInput[]
    upsert?: publicationsUpsertWithWhereUniqueWithoutUsersInput | publicationsUpsertWithWhereUniqueWithoutUsersInput[]
    createMany?: publicationsCreateManyUsersInputEnvelope
    set?: publicationsWhereUniqueInput | publicationsWhereUniqueInput[]
    disconnect?: publicationsWhereUniqueInput | publicationsWhereUniqueInput[]
    delete?: publicationsWhereUniqueInput | publicationsWhereUniqueInput[]
    connect?: publicationsWhereUniqueInput | publicationsWhereUniqueInput[]
    update?: publicationsUpdateWithWhereUniqueWithoutUsersInput | publicationsUpdateWithWhereUniqueWithoutUsersInput[]
    updateMany?: publicationsUpdateManyWithWhereWithoutUsersInput | publicationsUpdateManyWithWhereWithoutUsersInput[]
    deleteMany?: publicationsScalarWhereInput | publicationsScalarWhereInput[]
  }

  export type speakerUncheckedUpdateManyWithoutUsersNestedInput = {
    create?: XOR<speakerCreateWithoutUsersInput, speakerUncheckedCreateWithoutUsersInput> | speakerCreateWithoutUsersInput[] | speakerUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: speakerCreateOrConnectWithoutUsersInput | speakerCreateOrConnectWithoutUsersInput[]
    upsert?: speakerUpsertWithWhereUniqueWithoutUsersInput | speakerUpsertWithWhereUniqueWithoutUsersInput[]
    createMany?: speakerCreateManyUsersInputEnvelope
    set?: speakerWhereUniqueInput | speakerWhereUniqueInput[]
    disconnect?: speakerWhereUniqueInput | speakerWhereUniqueInput[]
    delete?: speakerWhereUniqueInput | speakerWhereUniqueInput[]
    connect?: speakerWhereUniqueInput | speakerWhereUniqueInput[]
    update?: speakerUpdateWithWhereUniqueWithoutUsersInput | speakerUpdateWithWhereUniqueWithoutUsersInput[]
    updateMany?: speakerUpdateManyWithWhereWithoutUsersInput | speakerUpdateManyWithWhereWithoutUsersInput[]
    deleteMany?: speakerScalarWhereInput | speakerScalarWhereInput[]
  }

  export type NestedUuidFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidFilter<$PrismaModel> | string
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedUuidWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedBoolNullableFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableFilter<$PrismaModel> | boolean | null
  }

  export type NestedBoolNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableWithAggregatesFilter<$PrismaModel> | boolean | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBoolNullableFilter<$PrismaModel>
    _max?: NestedBoolNullableFilter<$PrismaModel>
  }

  export type NestedUuidNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidNullableFilter<$PrismaModel> | string | null
  }

  export type NestedUuidNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type publicationsCreateWithoutConferencesInput = {
    id: string
    title: string
    journal: string
    status?: string
    visibility?: string
    submitted_at?: Date | string
    groups?: groupsCreateNestedManyWithoutPublicationsInput
    publication_files?: publication_filesCreateNestedManyWithoutPublicationsInput
    users: usersCreateNestedOneWithoutPublicationsInput
  }

  export type publicationsUncheckedCreateWithoutConferencesInput = {
    id: string
    title: string
    journal: string
    status?: string
    visibility?: string
    submitter_id: string
    submitted_at?: Date | string
    groups?: groupsUncheckedCreateNestedManyWithoutPublicationsInput
    publication_files?: publication_filesUncheckedCreateNestedManyWithoutPublicationsInput
  }

  export type publicationsCreateOrConnectWithoutConferencesInput = {
    where: publicationsWhereUniqueInput
    create: XOR<publicationsCreateWithoutConferencesInput, publicationsUncheckedCreateWithoutConferencesInput>
  }

  export type publicationsCreateManyConferencesInputEnvelope = {
    data: publicationsCreateManyConferencesInput | publicationsCreateManyConferencesInput[]
    skipDuplicates?: boolean
  }

  export type speakerCreateWithoutConferencesInput = {
    affiliation?: string | null
    title?: string | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    users: usersCreateNestedOneWithoutSpeakerInput
  }

  export type speakerUncheckedCreateWithoutConferencesInput = {
    id?: number
    user_id: string
    affiliation?: string | null
    title?: string | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
  }

  export type speakerCreateOrConnectWithoutConferencesInput = {
    where: speakerWhereUniqueInput
    create: XOR<speakerCreateWithoutConferencesInput, speakerUncheckedCreateWithoutConferencesInput>
  }

  export type speakerCreateManyConferencesInputEnvelope = {
    data: speakerCreateManyConferencesInput | speakerCreateManyConferencesInput[]
    skipDuplicates?: boolean
  }

  export type publicationsUpsertWithWhereUniqueWithoutConferencesInput = {
    where: publicationsWhereUniqueInput
    update: XOR<publicationsUpdateWithoutConferencesInput, publicationsUncheckedUpdateWithoutConferencesInput>
    create: XOR<publicationsCreateWithoutConferencesInput, publicationsUncheckedCreateWithoutConferencesInput>
  }

  export type publicationsUpdateWithWhereUniqueWithoutConferencesInput = {
    where: publicationsWhereUniqueInput
    data: XOR<publicationsUpdateWithoutConferencesInput, publicationsUncheckedUpdateWithoutConferencesInput>
  }

  export type publicationsUpdateManyWithWhereWithoutConferencesInput = {
    where: publicationsScalarWhereInput
    data: XOR<publicationsUpdateManyMutationInput, publicationsUncheckedUpdateManyWithoutConferencesInput>
  }

  export type publicationsScalarWhereInput = {
    AND?: publicationsScalarWhereInput | publicationsScalarWhereInput[]
    OR?: publicationsScalarWhereInput[]
    NOT?: publicationsScalarWhereInput | publicationsScalarWhereInput[]
    id?: UuidFilter<"publications"> | string
    title?: StringFilter<"publications"> | string
    journal?: StringFilter<"publications"> | string
    status?: StringFilter<"publications"> | string
    visibility?: StringFilter<"publications"> | string
    submitter_id?: UuidFilter<"publications"> | string
    conference_id?: UuidNullableFilter<"publications"> | string | null
    submitted_at?: DateTimeFilter<"publications"> | Date | string
  }

  export type speakerUpsertWithWhereUniqueWithoutConferencesInput = {
    where: speakerWhereUniqueInput
    update: XOR<speakerUpdateWithoutConferencesInput, speakerUncheckedUpdateWithoutConferencesInput>
    create: XOR<speakerCreateWithoutConferencesInput, speakerUncheckedCreateWithoutConferencesInput>
  }

  export type speakerUpdateWithWhereUniqueWithoutConferencesInput = {
    where: speakerWhereUniqueInput
    data: XOR<speakerUpdateWithoutConferencesInput, speakerUncheckedUpdateWithoutConferencesInput>
  }

  export type speakerUpdateManyWithWhereWithoutConferencesInput = {
    where: speakerScalarWhereInput
    data: XOR<speakerUpdateManyMutationInput, speakerUncheckedUpdateManyWithoutConferencesInput>
  }

  export type speakerScalarWhereInput = {
    AND?: speakerScalarWhereInput | speakerScalarWhereInput[]
    OR?: speakerScalarWhereInput[]
    NOT?: speakerScalarWhereInput | speakerScalarWhereInput[]
    id?: IntFilter<"speaker"> | number
    user_id?: UuidFilter<"speaker"> | string
    conference_id?: UuidFilter<"speaker"> | string
    affiliation?: StringNullableFilter<"speaker"> | string | null
    title?: StringNullableFilter<"speaker"> | string | null
    created_at?: DateTimeNullableFilter<"speaker"> | Date | string | null
    updated_at?: DateTimeNullableFilter<"speaker"> | Date | string | null
  }

  export type usersCreateWithoutGroupsInput = {
    id: string
    username: string
    email: string
    password_hash: string
    first_name?: string | null
    last_name?: string | null
    bio?: string | null
    photo_url?: string | null
    role: string
    status?: string | null
    affiliation?: string | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    links?: linksCreateNestedManyWithoutUsersInput
    messages_messages_receiver_idTousers?: messagesCreateNestedManyWithoutUsers_messages_receiver_idTousersInput
    messages_messages_sender_idTousers?: messagesCreateNestedManyWithoutUsers_messages_sender_idTousersInput
    notifications?: notificationsCreateNestedManyWithoutUsersInput
    publications?: publicationsCreateNestedManyWithoutUsersInput
    speaker?: speakerCreateNestedManyWithoutUsersInput
  }

  export type usersUncheckedCreateWithoutGroupsInput = {
    id: string
    username: string
    email: string
    password_hash: string
    first_name?: string | null
    last_name?: string | null
    bio?: string | null
    photo_url?: string | null
    role: string
    status?: string | null
    affiliation?: string | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    links?: linksUncheckedCreateNestedManyWithoutUsersInput
    messages_messages_receiver_idTousers?: messagesUncheckedCreateNestedManyWithoutUsers_messages_receiver_idTousersInput
    messages_messages_sender_idTousers?: messagesUncheckedCreateNestedManyWithoutUsers_messages_sender_idTousersInput
    notifications?: notificationsUncheckedCreateNestedManyWithoutUsersInput
    publications?: publicationsUncheckedCreateNestedManyWithoutUsersInput
    speaker?: speakerUncheckedCreateNestedManyWithoutUsersInput
  }

  export type usersCreateOrConnectWithoutGroupsInput = {
    where: usersWhereUniqueInput
    create: XOR<usersCreateWithoutGroupsInput, usersUncheckedCreateWithoutGroupsInput>
  }

  export type publicationsCreateWithoutGroupsInput = {
    id: string
    title: string
    journal: string
    status?: string
    visibility?: string
    submitted_at?: Date | string
    publication_files?: publication_filesCreateNestedManyWithoutPublicationsInput
    conferences?: conferencesCreateNestedOneWithoutPublicationsInput
    users: usersCreateNestedOneWithoutPublicationsInput
  }

  export type publicationsUncheckedCreateWithoutGroupsInput = {
    id: string
    title: string
    journal: string
    status?: string
    visibility?: string
    submitter_id: string
    conference_id?: string | null
    submitted_at?: Date | string
    publication_files?: publication_filesUncheckedCreateNestedManyWithoutPublicationsInput
  }

  export type publicationsCreateOrConnectWithoutGroupsInput = {
    where: publicationsWhereUniqueInput
    create: XOR<publicationsCreateWithoutGroupsInput, publicationsUncheckedCreateWithoutGroupsInput>
  }

  export type usersUpsertWithoutGroupsInput = {
    update: XOR<usersUpdateWithoutGroupsInput, usersUncheckedUpdateWithoutGroupsInput>
    create: XOR<usersCreateWithoutGroupsInput, usersUncheckedCreateWithoutGroupsInput>
    where?: usersWhereInput
  }

  export type usersUpdateToOneWithWhereWithoutGroupsInput = {
    where?: usersWhereInput
    data: XOR<usersUpdateWithoutGroupsInput, usersUncheckedUpdateWithoutGroupsInput>
  }

  export type usersUpdateWithoutGroupsInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    first_name?: NullableStringFieldUpdateOperationsInput | string | null
    last_name?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    photo_url?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    status?: NullableStringFieldUpdateOperationsInput | string | null
    affiliation?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    links?: linksUpdateManyWithoutUsersNestedInput
    messages_messages_receiver_idTousers?: messagesUpdateManyWithoutUsers_messages_receiver_idTousersNestedInput
    messages_messages_sender_idTousers?: messagesUpdateManyWithoutUsers_messages_sender_idTousersNestedInput
    notifications?: notificationsUpdateManyWithoutUsersNestedInput
    publications?: publicationsUpdateManyWithoutUsersNestedInput
    speaker?: speakerUpdateManyWithoutUsersNestedInput
  }

  export type usersUncheckedUpdateWithoutGroupsInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    first_name?: NullableStringFieldUpdateOperationsInput | string | null
    last_name?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    photo_url?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    status?: NullableStringFieldUpdateOperationsInput | string | null
    affiliation?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    links?: linksUncheckedUpdateManyWithoutUsersNestedInput
    messages_messages_receiver_idTousers?: messagesUncheckedUpdateManyWithoutUsers_messages_receiver_idTousersNestedInput
    messages_messages_sender_idTousers?: messagesUncheckedUpdateManyWithoutUsers_messages_sender_idTousersNestedInput
    notifications?: notificationsUncheckedUpdateManyWithoutUsersNestedInput
    publications?: publicationsUncheckedUpdateManyWithoutUsersNestedInput
    speaker?: speakerUncheckedUpdateManyWithoutUsersNestedInput
  }

  export type publicationsUpsertWithoutGroupsInput = {
    update: XOR<publicationsUpdateWithoutGroupsInput, publicationsUncheckedUpdateWithoutGroupsInput>
    create: XOR<publicationsCreateWithoutGroupsInput, publicationsUncheckedCreateWithoutGroupsInput>
    where?: publicationsWhereInput
  }

  export type publicationsUpdateToOneWithWhereWithoutGroupsInput = {
    where?: publicationsWhereInput
    data: XOR<publicationsUpdateWithoutGroupsInput, publicationsUncheckedUpdateWithoutGroupsInput>
  }

  export type publicationsUpdateWithoutGroupsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    journal?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    visibility?: StringFieldUpdateOperationsInput | string
    submitted_at?: DateTimeFieldUpdateOperationsInput | Date | string
    publication_files?: publication_filesUpdateManyWithoutPublicationsNestedInput
    conferences?: conferencesUpdateOneWithoutPublicationsNestedInput
    users?: usersUpdateOneRequiredWithoutPublicationsNestedInput
  }

  export type publicationsUncheckedUpdateWithoutGroupsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    journal?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    visibility?: StringFieldUpdateOperationsInput | string
    submitter_id?: StringFieldUpdateOperationsInput | string
    conference_id?: NullableStringFieldUpdateOperationsInput | string | null
    submitted_at?: DateTimeFieldUpdateOperationsInput | Date | string
    publication_files?: publication_filesUncheckedUpdateManyWithoutPublicationsNestedInput
  }

  export type usersCreateWithoutLinksInput = {
    id: string
    username: string
    email: string
    password_hash: string
    first_name?: string | null
    last_name?: string | null
    bio?: string | null
    photo_url?: string | null
    role: string
    status?: string | null
    affiliation?: string | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    groups?: groupsCreateNestedManyWithoutUsersInput
    messages_messages_receiver_idTousers?: messagesCreateNestedManyWithoutUsers_messages_receiver_idTousersInput
    messages_messages_sender_idTousers?: messagesCreateNestedManyWithoutUsers_messages_sender_idTousersInput
    notifications?: notificationsCreateNestedManyWithoutUsersInput
    publications?: publicationsCreateNestedManyWithoutUsersInput
    speaker?: speakerCreateNestedManyWithoutUsersInput
  }

  export type usersUncheckedCreateWithoutLinksInput = {
    id: string
    username: string
    email: string
    password_hash: string
    first_name?: string | null
    last_name?: string | null
    bio?: string | null
    photo_url?: string | null
    role: string
    status?: string | null
    affiliation?: string | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    groups?: groupsUncheckedCreateNestedManyWithoutUsersInput
    messages_messages_receiver_idTousers?: messagesUncheckedCreateNestedManyWithoutUsers_messages_receiver_idTousersInput
    messages_messages_sender_idTousers?: messagesUncheckedCreateNestedManyWithoutUsers_messages_sender_idTousersInput
    notifications?: notificationsUncheckedCreateNestedManyWithoutUsersInput
    publications?: publicationsUncheckedCreateNestedManyWithoutUsersInput
    speaker?: speakerUncheckedCreateNestedManyWithoutUsersInput
  }

  export type usersCreateOrConnectWithoutLinksInput = {
    where: usersWhereUniqueInput
    create: XOR<usersCreateWithoutLinksInput, usersUncheckedCreateWithoutLinksInput>
  }

  export type usersUpsertWithoutLinksInput = {
    update: XOR<usersUpdateWithoutLinksInput, usersUncheckedUpdateWithoutLinksInput>
    create: XOR<usersCreateWithoutLinksInput, usersUncheckedCreateWithoutLinksInput>
    where?: usersWhereInput
  }

  export type usersUpdateToOneWithWhereWithoutLinksInput = {
    where?: usersWhereInput
    data: XOR<usersUpdateWithoutLinksInput, usersUncheckedUpdateWithoutLinksInput>
  }

  export type usersUpdateWithoutLinksInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    first_name?: NullableStringFieldUpdateOperationsInput | string | null
    last_name?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    photo_url?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    status?: NullableStringFieldUpdateOperationsInput | string | null
    affiliation?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    groups?: groupsUpdateManyWithoutUsersNestedInput
    messages_messages_receiver_idTousers?: messagesUpdateManyWithoutUsers_messages_receiver_idTousersNestedInput
    messages_messages_sender_idTousers?: messagesUpdateManyWithoutUsers_messages_sender_idTousersNestedInput
    notifications?: notificationsUpdateManyWithoutUsersNestedInput
    publications?: publicationsUpdateManyWithoutUsersNestedInput
    speaker?: speakerUpdateManyWithoutUsersNestedInput
  }

  export type usersUncheckedUpdateWithoutLinksInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    first_name?: NullableStringFieldUpdateOperationsInput | string | null
    last_name?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    photo_url?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    status?: NullableStringFieldUpdateOperationsInput | string | null
    affiliation?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    groups?: groupsUncheckedUpdateManyWithoutUsersNestedInput
    messages_messages_receiver_idTousers?: messagesUncheckedUpdateManyWithoutUsers_messages_receiver_idTousersNestedInput
    messages_messages_sender_idTousers?: messagesUncheckedUpdateManyWithoutUsers_messages_sender_idTousersNestedInput
    notifications?: notificationsUncheckedUpdateManyWithoutUsersNestedInput
    publications?: publicationsUncheckedUpdateManyWithoutUsersNestedInput
    speaker?: speakerUncheckedUpdateManyWithoutUsersNestedInput
  }

  export type usersCreateWithoutMessages_messages_receiver_idTousersInput = {
    id: string
    username: string
    email: string
    password_hash: string
    first_name?: string | null
    last_name?: string | null
    bio?: string | null
    photo_url?: string | null
    role: string
    status?: string | null
    affiliation?: string | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    groups?: groupsCreateNestedManyWithoutUsersInput
    links?: linksCreateNestedManyWithoutUsersInput
    messages_messages_sender_idTousers?: messagesCreateNestedManyWithoutUsers_messages_sender_idTousersInput
    notifications?: notificationsCreateNestedManyWithoutUsersInput
    publications?: publicationsCreateNestedManyWithoutUsersInput
    speaker?: speakerCreateNestedManyWithoutUsersInput
  }

  export type usersUncheckedCreateWithoutMessages_messages_receiver_idTousersInput = {
    id: string
    username: string
    email: string
    password_hash: string
    first_name?: string | null
    last_name?: string | null
    bio?: string | null
    photo_url?: string | null
    role: string
    status?: string | null
    affiliation?: string | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    groups?: groupsUncheckedCreateNestedManyWithoutUsersInput
    links?: linksUncheckedCreateNestedManyWithoutUsersInput
    messages_messages_sender_idTousers?: messagesUncheckedCreateNestedManyWithoutUsers_messages_sender_idTousersInput
    notifications?: notificationsUncheckedCreateNestedManyWithoutUsersInput
    publications?: publicationsUncheckedCreateNestedManyWithoutUsersInput
    speaker?: speakerUncheckedCreateNestedManyWithoutUsersInput
  }

  export type usersCreateOrConnectWithoutMessages_messages_receiver_idTousersInput = {
    where: usersWhereUniqueInput
    create: XOR<usersCreateWithoutMessages_messages_receiver_idTousersInput, usersUncheckedCreateWithoutMessages_messages_receiver_idTousersInput>
  }

  export type usersCreateWithoutMessages_messages_sender_idTousersInput = {
    id: string
    username: string
    email: string
    password_hash: string
    first_name?: string | null
    last_name?: string | null
    bio?: string | null
    photo_url?: string | null
    role: string
    status?: string | null
    affiliation?: string | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    groups?: groupsCreateNestedManyWithoutUsersInput
    links?: linksCreateNestedManyWithoutUsersInput
    messages_messages_receiver_idTousers?: messagesCreateNestedManyWithoutUsers_messages_receiver_idTousersInput
    notifications?: notificationsCreateNestedManyWithoutUsersInput
    publications?: publicationsCreateNestedManyWithoutUsersInput
    speaker?: speakerCreateNestedManyWithoutUsersInput
  }

  export type usersUncheckedCreateWithoutMessages_messages_sender_idTousersInput = {
    id: string
    username: string
    email: string
    password_hash: string
    first_name?: string | null
    last_name?: string | null
    bio?: string | null
    photo_url?: string | null
    role: string
    status?: string | null
    affiliation?: string | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    groups?: groupsUncheckedCreateNestedManyWithoutUsersInput
    links?: linksUncheckedCreateNestedManyWithoutUsersInput
    messages_messages_receiver_idTousers?: messagesUncheckedCreateNestedManyWithoutUsers_messages_receiver_idTousersInput
    notifications?: notificationsUncheckedCreateNestedManyWithoutUsersInput
    publications?: publicationsUncheckedCreateNestedManyWithoutUsersInput
    speaker?: speakerUncheckedCreateNestedManyWithoutUsersInput
  }

  export type usersCreateOrConnectWithoutMessages_messages_sender_idTousersInput = {
    where: usersWhereUniqueInput
    create: XOR<usersCreateWithoutMessages_messages_sender_idTousersInput, usersUncheckedCreateWithoutMessages_messages_sender_idTousersInput>
  }

  export type usersUpsertWithoutMessages_messages_receiver_idTousersInput = {
    update: XOR<usersUpdateWithoutMessages_messages_receiver_idTousersInput, usersUncheckedUpdateWithoutMessages_messages_receiver_idTousersInput>
    create: XOR<usersCreateWithoutMessages_messages_receiver_idTousersInput, usersUncheckedCreateWithoutMessages_messages_receiver_idTousersInput>
    where?: usersWhereInput
  }

  export type usersUpdateToOneWithWhereWithoutMessages_messages_receiver_idTousersInput = {
    where?: usersWhereInput
    data: XOR<usersUpdateWithoutMessages_messages_receiver_idTousersInput, usersUncheckedUpdateWithoutMessages_messages_receiver_idTousersInput>
  }

  export type usersUpdateWithoutMessages_messages_receiver_idTousersInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    first_name?: NullableStringFieldUpdateOperationsInput | string | null
    last_name?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    photo_url?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    status?: NullableStringFieldUpdateOperationsInput | string | null
    affiliation?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    groups?: groupsUpdateManyWithoutUsersNestedInput
    links?: linksUpdateManyWithoutUsersNestedInput
    messages_messages_sender_idTousers?: messagesUpdateManyWithoutUsers_messages_sender_idTousersNestedInput
    notifications?: notificationsUpdateManyWithoutUsersNestedInput
    publications?: publicationsUpdateManyWithoutUsersNestedInput
    speaker?: speakerUpdateManyWithoutUsersNestedInput
  }

  export type usersUncheckedUpdateWithoutMessages_messages_receiver_idTousersInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    first_name?: NullableStringFieldUpdateOperationsInput | string | null
    last_name?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    photo_url?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    status?: NullableStringFieldUpdateOperationsInput | string | null
    affiliation?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    groups?: groupsUncheckedUpdateManyWithoutUsersNestedInput
    links?: linksUncheckedUpdateManyWithoutUsersNestedInput
    messages_messages_sender_idTousers?: messagesUncheckedUpdateManyWithoutUsers_messages_sender_idTousersNestedInput
    notifications?: notificationsUncheckedUpdateManyWithoutUsersNestedInput
    publications?: publicationsUncheckedUpdateManyWithoutUsersNestedInput
    speaker?: speakerUncheckedUpdateManyWithoutUsersNestedInput
  }

  export type usersUpsertWithoutMessages_messages_sender_idTousersInput = {
    update: XOR<usersUpdateWithoutMessages_messages_sender_idTousersInput, usersUncheckedUpdateWithoutMessages_messages_sender_idTousersInput>
    create: XOR<usersCreateWithoutMessages_messages_sender_idTousersInput, usersUncheckedCreateWithoutMessages_messages_sender_idTousersInput>
    where?: usersWhereInput
  }

  export type usersUpdateToOneWithWhereWithoutMessages_messages_sender_idTousersInput = {
    where?: usersWhereInput
    data: XOR<usersUpdateWithoutMessages_messages_sender_idTousersInput, usersUncheckedUpdateWithoutMessages_messages_sender_idTousersInput>
  }

  export type usersUpdateWithoutMessages_messages_sender_idTousersInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    first_name?: NullableStringFieldUpdateOperationsInput | string | null
    last_name?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    photo_url?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    status?: NullableStringFieldUpdateOperationsInput | string | null
    affiliation?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    groups?: groupsUpdateManyWithoutUsersNestedInput
    links?: linksUpdateManyWithoutUsersNestedInput
    messages_messages_receiver_idTousers?: messagesUpdateManyWithoutUsers_messages_receiver_idTousersNestedInput
    notifications?: notificationsUpdateManyWithoutUsersNestedInput
    publications?: publicationsUpdateManyWithoutUsersNestedInput
    speaker?: speakerUpdateManyWithoutUsersNestedInput
  }

  export type usersUncheckedUpdateWithoutMessages_messages_sender_idTousersInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    first_name?: NullableStringFieldUpdateOperationsInput | string | null
    last_name?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    photo_url?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    status?: NullableStringFieldUpdateOperationsInput | string | null
    affiliation?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    groups?: groupsUncheckedUpdateManyWithoutUsersNestedInput
    links?: linksUncheckedUpdateManyWithoutUsersNestedInput
    messages_messages_receiver_idTousers?: messagesUncheckedUpdateManyWithoutUsers_messages_receiver_idTousersNestedInput
    notifications?: notificationsUncheckedUpdateManyWithoutUsersNestedInput
    publications?: publicationsUncheckedUpdateManyWithoutUsersNestedInput
    speaker?: speakerUncheckedUpdateManyWithoutUsersNestedInput
  }

  export type usersCreateWithoutNotificationsInput = {
    id: string
    username: string
    email: string
    password_hash: string
    first_name?: string | null
    last_name?: string | null
    bio?: string | null
    photo_url?: string | null
    role: string
    status?: string | null
    affiliation?: string | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    groups?: groupsCreateNestedManyWithoutUsersInput
    links?: linksCreateNestedManyWithoutUsersInput
    messages_messages_receiver_idTousers?: messagesCreateNestedManyWithoutUsers_messages_receiver_idTousersInput
    messages_messages_sender_idTousers?: messagesCreateNestedManyWithoutUsers_messages_sender_idTousersInput
    publications?: publicationsCreateNestedManyWithoutUsersInput
    speaker?: speakerCreateNestedManyWithoutUsersInput
  }

  export type usersUncheckedCreateWithoutNotificationsInput = {
    id: string
    username: string
    email: string
    password_hash: string
    first_name?: string | null
    last_name?: string | null
    bio?: string | null
    photo_url?: string | null
    role: string
    status?: string | null
    affiliation?: string | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    groups?: groupsUncheckedCreateNestedManyWithoutUsersInput
    links?: linksUncheckedCreateNestedManyWithoutUsersInput
    messages_messages_receiver_idTousers?: messagesUncheckedCreateNestedManyWithoutUsers_messages_receiver_idTousersInput
    messages_messages_sender_idTousers?: messagesUncheckedCreateNestedManyWithoutUsers_messages_sender_idTousersInput
    publications?: publicationsUncheckedCreateNestedManyWithoutUsersInput
    speaker?: speakerUncheckedCreateNestedManyWithoutUsersInput
  }

  export type usersCreateOrConnectWithoutNotificationsInput = {
    where: usersWhereUniqueInput
    create: XOR<usersCreateWithoutNotificationsInput, usersUncheckedCreateWithoutNotificationsInput>
  }

  export type usersUpsertWithoutNotificationsInput = {
    update: XOR<usersUpdateWithoutNotificationsInput, usersUncheckedUpdateWithoutNotificationsInput>
    create: XOR<usersCreateWithoutNotificationsInput, usersUncheckedCreateWithoutNotificationsInput>
    where?: usersWhereInput
  }

  export type usersUpdateToOneWithWhereWithoutNotificationsInput = {
    where?: usersWhereInput
    data: XOR<usersUpdateWithoutNotificationsInput, usersUncheckedUpdateWithoutNotificationsInput>
  }

  export type usersUpdateWithoutNotificationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    first_name?: NullableStringFieldUpdateOperationsInput | string | null
    last_name?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    photo_url?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    status?: NullableStringFieldUpdateOperationsInput | string | null
    affiliation?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    groups?: groupsUpdateManyWithoutUsersNestedInput
    links?: linksUpdateManyWithoutUsersNestedInput
    messages_messages_receiver_idTousers?: messagesUpdateManyWithoutUsers_messages_receiver_idTousersNestedInput
    messages_messages_sender_idTousers?: messagesUpdateManyWithoutUsers_messages_sender_idTousersNestedInput
    publications?: publicationsUpdateManyWithoutUsersNestedInput
    speaker?: speakerUpdateManyWithoutUsersNestedInput
  }

  export type usersUncheckedUpdateWithoutNotificationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    first_name?: NullableStringFieldUpdateOperationsInput | string | null
    last_name?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    photo_url?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    status?: NullableStringFieldUpdateOperationsInput | string | null
    affiliation?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    groups?: groupsUncheckedUpdateManyWithoutUsersNestedInput
    links?: linksUncheckedUpdateManyWithoutUsersNestedInput
    messages_messages_receiver_idTousers?: messagesUncheckedUpdateManyWithoutUsers_messages_receiver_idTousersNestedInput
    messages_messages_sender_idTousers?: messagesUncheckedUpdateManyWithoutUsers_messages_sender_idTousersNestedInput
    publications?: publicationsUncheckedUpdateManyWithoutUsersNestedInput
    speaker?: speakerUncheckedUpdateManyWithoutUsersNestedInput
  }

  export type publicationsCreateWithoutPublication_filesInput = {
    id: string
    title: string
    journal: string
    status?: string
    visibility?: string
    submitted_at?: Date | string
    groups?: groupsCreateNestedManyWithoutPublicationsInput
    conferences?: conferencesCreateNestedOneWithoutPublicationsInput
    users: usersCreateNestedOneWithoutPublicationsInput
  }

  export type publicationsUncheckedCreateWithoutPublication_filesInput = {
    id: string
    title: string
    journal: string
    status?: string
    visibility?: string
    submitter_id: string
    conference_id?: string | null
    submitted_at?: Date | string
    groups?: groupsUncheckedCreateNestedManyWithoutPublicationsInput
  }

  export type publicationsCreateOrConnectWithoutPublication_filesInput = {
    where: publicationsWhereUniqueInput
    create: XOR<publicationsCreateWithoutPublication_filesInput, publicationsUncheckedCreateWithoutPublication_filesInput>
  }

  export type publicationsUpsertWithoutPublication_filesInput = {
    update: XOR<publicationsUpdateWithoutPublication_filesInput, publicationsUncheckedUpdateWithoutPublication_filesInput>
    create: XOR<publicationsCreateWithoutPublication_filesInput, publicationsUncheckedCreateWithoutPublication_filesInput>
    where?: publicationsWhereInput
  }

  export type publicationsUpdateToOneWithWhereWithoutPublication_filesInput = {
    where?: publicationsWhereInput
    data: XOR<publicationsUpdateWithoutPublication_filesInput, publicationsUncheckedUpdateWithoutPublication_filesInput>
  }

  export type publicationsUpdateWithoutPublication_filesInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    journal?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    visibility?: StringFieldUpdateOperationsInput | string
    submitted_at?: DateTimeFieldUpdateOperationsInput | Date | string
    groups?: groupsUpdateManyWithoutPublicationsNestedInput
    conferences?: conferencesUpdateOneWithoutPublicationsNestedInput
    users?: usersUpdateOneRequiredWithoutPublicationsNestedInput
  }

  export type publicationsUncheckedUpdateWithoutPublication_filesInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    journal?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    visibility?: StringFieldUpdateOperationsInput | string
    submitter_id?: StringFieldUpdateOperationsInput | string
    conference_id?: NullableStringFieldUpdateOperationsInput | string | null
    submitted_at?: DateTimeFieldUpdateOperationsInput | Date | string
    groups?: groupsUncheckedUpdateManyWithoutPublicationsNestedInput
  }

  export type groupsCreateWithoutPublicationsInput = {
    id: string
    title?: string
    description?: string
    status?: string
    created_at?: Date | string
    users: usersCreateNestedOneWithoutGroupsInput
  }

  export type groupsUncheckedCreateWithoutPublicationsInput = {
    id: string
    title?: string
    description?: string
    status?: string
    created_at?: Date | string
    leader_id: string
  }

  export type groupsCreateOrConnectWithoutPublicationsInput = {
    where: groupsWhereUniqueInput
    create: XOR<groupsCreateWithoutPublicationsInput, groupsUncheckedCreateWithoutPublicationsInput>
  }

  export type groupsCreateManyPublicationsInputEnvelope = {
    data: groupsCreateManyPublicationsInput | groupsCreateManyPublicationsInput[]
    skipDuplicates?: boolean
  }

  export type publication_filesCreateWithoutPublicationsInput = {
    id: string
    file_type: string
    file_path: string
  }

  export type publication_filesUncheckedCreateWithoutPublicationsInput = {
    id: string
    file_type: string
    file_path: string
  }

  export type publication_filesCreateOrConnectWithoutPublicationsInput = {
    where: publication_filesWhereUniqueInput
    create: XOR<publication_filesCreateWithoutPublicationsInput, publication_filesUncheckedCreateWithoutPublicationsInput>
  }

  export type publication_filesCreateManyPublicationsInputEnvelope = {
    data: publication_filesCreateManyPublicationsInput | publication_filesCreateManyPublicationsInput[]
    skipDuplicates?: boolean
  }

  export type conferencesCreateWithoutPublicationsInput = {
    id: string
    name: string
    description: string
    location: string
    start_date: Date | string
    end_date: Date | string
    speaker?: speakerCreateNestedManyWithoutConferencesInput
  }

  export type conferencesUncheckedCreateWithoutPublicationsInput = {
    id: string
    name: string
    description: string
    location: string
    start_date: Date | string
    end_date: Date | string
    speaker?: speakerUncheckedCreateNestedManyWithoutConferencesInput
  }

  export type conferencesCreateOrConnectWithoutPublicationsInput = {
    where: conferencesWhereUniqueInput
    create: XOR<conferencesCreateWithoutPublicationsInput, conferencesUncheckedCreateWithoutPublicationsInput>
  }

  export type usersCreateWithoutPublicationsInput = {
    id: string
    username: string
    email: string
    password_hash: string
    first_name?: string | null
    last_name?: string | null
    bio?: string | null
    photo_url?: string | null
    role: string
    status?: string | null
    affiliation?: string | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    groups?: groupsCreateNestedManyWithoutUsersInput
    links?: linksCreateNestedManyWithoutUsersInput
    messages_messages_receiver_idTousers?: messagesCreateNestedManyWithoutUsers_messages_receiver_idTousersInput
    messages_messages_sender_idTousers?: messagesCreateNestedManyWithoutUsers_messages_sender_idTousersInput
    notifications?: notificationsCreateNestedManyWithoutUsersInput
    speaker?: speakerCreateNestedManyWithoutUsersInput
  }

  export type usersUncheckedCreateWithoutPublicationsInput = {
    id: string
    username: string
    email: string
    password_hash: string
    first_name?: string | null
    last_name?: string | null
    bio?: string | null
    photo_url?: string | null
    role: string
    status?: string | null
    affiliation?: string | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    groups?: groupsUncheckedCreateNestedManyWithoutUsersInput
    links?: linksUncheckedCreateNestedManyWithoutUsersInput
    messages_messages_receiver_idTousers?: messagesUncheckedCreateNestedManyWithoutUsers_messages_receiver_idTousersInput
    messages_messages_sender_idTousers?: messagesUncheckedCreateNestedManyWithoutUsers_messages_sender_idTousersInput
    notifications?: notificationsUncheckedCreateNestedManyWithoutUsersInput
    speaker?: speakerUncheckedCreateNestedManyWithoutUsersInput
  }

  export type usersCreateOrConnectWithoutPublicationsInput = {
    where: usersWhereUniqueInput
    create: XOR<usersCreateWithoutPublicationsInput, usersUncheckedCreateWithoutPublicationsInput>
  }

  export type groupsUpsertWithWhereUniqueWithoutPublicationsInput = {
    where: groupsWhereUniqueInput
    update: XOR<groupsUpdateWithoutPublicationsInput, groupsUncheckedUpdateWithoutPublicationsInput>
    create: XOR<groupsCreateWithoutPublicationsInput, groupsUncheckedCreateWithoutPublicationsInput>
  }

  export type groupsUpdateWithWhereUniqueWithoutPublicationsInput = {
    where: groupsWhereUniqueInput
    data: XOR<groupsUpdateWithoutPublicationsInput, groupsUncheckedUpdateWithoutPublicationsInput>
  }

  export type groupsUpdateManyWithWhereWithoutPublicationsInput = {
    where: groupsScalarWhereInput
    data: XOR<groupsUpdateManyMutationInput, groupsUncheckedUpdateManyWithoutPublicationsInput>
  }

  export type groupsScalarWhereInput = {
    AND?: groupsScalarWhereInput | groupsScalarWhereInput[]
    OR?: groupsScalarWhereInput[]
    NOT?: groupsScalarWhereInput | groupsScalarWhereInput[]
    id?: UuidFilter<"groups"> | string
    title?: StringFilter<"groups"> | string
    description?: StringFilter<"groups"> | string
    status?: StringFilter<"groups"> | string
    created_at?: DateTimeFilter<"groups"> | Date | string
    leader_id?: UuidFilter<"groups"> | string
    publication_id?: UuidFilter<"groups"> | string
  }

  export type publication_filesUpsertWithWhereUniqueWithoutPublicationsInput = {
    where: publication_filesWhereUniqueInput
    update: XOR<publication_filesUpdateWithoutPublicationsInput, publication_filesUncheckedUpdateWithoutPublicationsInput>
    create: XOR<publication_filesCreateWithoutPublicationsInput, publication_filesUncheckedCreateWithoutPublicationsInput>
  }

  export type publication_filesUpdateWithWhereUniqueWithoutPublicationsInput = {
    where: publication_filesWhereUniqueInput
    data: XOR<publication_filesUpdateWithoutPublicationsInput, publication_filesUncheckedUpdateWithoutPublicationsInput>
  }

  export type publication_filesUpdateManyWithWhereWithoutPublicationsInput = {
    where: publication_filesScalarWhereInput
    data: XOR<publication_filesUpdateManyMutationInput, publication_filesUncheckedUpdateManyWithoutPublicationsInput>
  }

  export type publication_filesScalarWhereInput = {
    AND?: publication_filesScalarWhereInput | publication_filesScalarWhereInput[]
    OR?: publication_filesScalarWhereInput[]
    NOT?: publication_filesScalarWhereInput | publication_filesScalarWhereInput[]
    id?: UuidFilter<"publication_files"> | string
    file_type?: StringFilter<"publication_files"> | string
    file_path?: StringFilter<"publication_files"> | string
    publication_id?: UuidFilter<"publication_files"> | string
  }

  export type conferencesUpsertWithoutPublicationsInput = {
    update: XOR<conferencesUpdateWithoutPublicationsInput, conferencesUncheckedUpdateWithoutPublicationsInput>
    create: XOR<conferencesCreateWithoutPublicationsInput, conferencesUncheckedCreateWithoutPublicationsInput>
    where?: conferencesWhereInput
  }

  export type conferencesUpdateToOneWithWhereWithoutPublicationsInput = {
    where?: conferencesWhereInput
    data: XOR<conferencesUpdateWithoutPublicationsInput, conferencesUncheckedUpdateWithoutPublicationsInput>
  }

  export type conferencesUpdateWithoutPublicationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    start_date?: DateTimeFieldUpdateOperationsInput | Date | string
    end_date?: DateTimeFieldUpdateOperationsInput | Date | string
    speaker?: speakerUpdateManyWithoutConferencesNestedInput
  }

  export type conferencesUncheckedUpdateWithoutPublicationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    start_date?: DateTimeFieldUpdateOperationsInput | Date | string
    end_date?: DateTimeFieldUpdateOperationsInput | Date | string
    speaker?: speakerUncheckedUpdateManyWithoutConferencesNestedInput
  }

  export type usersUpsertWithoutPublicationsInput = {
    update: XOR<usersUpdateWithoutPublicationsInput, usersUncheckedUpdateWithoutPublicationsInput>
    create: XOR<usersCreateWithoutPublicationsInput, usersUncheckedCreateWithoutPublicationsInput>
    where?: usersWhereInput
  }

  export type usersUpdateToOneWithWhereWithoutPublicationsInput = {
    where?: usersWhereInput
    data: XOR<usersUpdateWithoutPublicationsInput, usersUncheckedUpdateWithoutPublicationsInput>
  }

  export type usersUpdateWithoutPublicationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    first_name?: NullableStringFieldUpdateOperationsInput | string | null
    last_name?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    photo_url?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    status?: NullableStringFieldUpdateOperationsInput | string | null
    affiliation?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    groups?: groupsUpdateManyWithoutUsersNestedInput
    links?: linksUpdateManyWithoutUsersNestedInput
    messages_messages_receiver_idTousers?: messagesUpdateManyWithoutUsers_messages_receiver_idTousersNestedInput
    messages_messages_sender_idTousers?: messagesUpdateManyWithoutUsers_messages_sender_idTousersNestedInput
    notifications?: notificationsUpdateManyWithoutUsersNestedInput
    speaker?: speakerUpdateManyWithoutUsersNestedInput
  }

  export type usersUncheckedUpdateWithoutPublicationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    first_name?: NullableStringFieldUpdateOperationsInput | string | null
    last_name?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    photo_url?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    status?: NullableStringFieldUpdateOperationsInput | string | null
    affiliation?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    groups?: groupsUncheckedUpdateManyWithoutUsersNestedInput
    links?: linksUncheckedUpdateManyWithoutUsersNestedInput
    messages_messages_receiver_idTousers?: messagesUncheckedUpdateManyWithoutUsers_messages_receiver_idTousersNestedInput
    messages_messages_sender_idTousers?: messagesUncheckedUpdateManyWithoutUsers_messages_sender_idTousersNestedInput
    notifications?: notificationsUncheckedUpdateManyWithoutUsersNestedInput
    speaker?: speakerUncheckedUpdateManyWithoutUsersNestedInput
  }

  export type conferencesCreateWithoutSpeakerInput = {
    id: string
    name: string
    description: string
    location: string
    start_date: Date | string
    end_date: Date | string
    publications?: publicationsCreateNestedManyWithoutConferencesInput
  }

  export type conferencesUncheckedCreateWithoutSpeakerInput = {
    id: string
    name: string
    description: string
    location: string
    start_date: Date | string
    end_date: Date | string
    publications?: publicationsUncheckedCreateNestedManyWithoutConferencesInput
  }

  export type conferencesCreateOrConnectWithoutSpeakerInput = {
    where: conferencesWhereUniqueInput
    create: XOR<conferencesCreateWithoutSpeakerInput, conferencesUncheckedCreateWithoutSpeakerInput>
  }

  export type usersCreateWithoutSpeakerInput = {
    id: string
    username: string
    email: string
    password_hash: string
    first_name?: string | null
    last_name?: string | null
    bio?: string | null
    photo_url?: string | null
    role: string
    status?: string | null
    affiliation?: string | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    groups?: groupsCreateNestedManyWithoutUsersInput
    links?: linksCreateNestedManyWithoutUsersInput
    messages_messages_receiver_idTousers?: messagesCreateNestedManyWithoutUsers_messages_receiver_idTousersInput
    messages_messages_sender_idTousers?: messagesCreateNestedManyWithoutUsers_messages_sender_idTousersInput
    notifications?: notificationsCreateNestedManyWithoutUsersInput
    publications?: publicationsCreateNestedManyWithoutUsersInput
  }

  export type usersUncheckedCreateWithoutSpeakerInput = {
    id: string
    username: string
    email: string
    password_hash: string
    first_name?: string | null
    last_name?: string | null
    bio?: string | null
    photo_url?: string | null
    role: string
    status?: string | null
    affiliation?: string | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    groups?: groupsUncheckedCreateNestedManyWithoutUsersInput
    links?: linksUncheckedCreateNestedManyWithoutUsersInput
    messages_messages_receiver_idTousers?: messagesUncheckedCreateNestedManyWithoutUsers_messages_receiver_idTousersInput
    messages_messages_sender_idTousers?: messagesUncheckedCreateNestedManyWithoutUsers_messages_sender_idTousersInput
    notifications?: notificationsUncheckedCreateNestedManyWithoutUsersInput
    publications?: publicationsUncheckedCreateNestedManyWithoutUsersInput
  }

  export type usersCreateOrConnectWithoutSpeakerInput = {
    where: usersWhereUniqueInput
    create: XOR<usersCreateWithoutSpeakerInput, usersUncheckedCreateWithoutSpeakerInput>
  }

  export type conferencesUpsertWithoutSpeakerInput = {
    update: XOR<conferencesUpdateWithoutSpeakerInput, conferencesUncheckedUpdateWithoutSpeakerInput>
    create: XOR<conferencesCreateWithoutSpeakerInput, conferencesUncheckedCreateWithoutSpeakerInput>
    where?: conferencesWhereInput
  }

  export type conferencesUpdateToOneWithWhereWithoutSpeakerInput = {
    where?: conferencesWhereInput
    data: XOR<conferencesUpdateWithoutSpeakerInput, conferencesUncheckedUpdateWithoutSpeakerInput>
  }

  export type conferencesUpdateWithoutSpeakerInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    start_date?: DateTimeFieldUpdateOperationsInput | Date | string
    end_date?: DateTimeFieldUpdateOperationsInput | Date | string
    publications?: publicationsUpdateManyWithoutConferencesNestedInput
  }

  export type conferencesUncheckedUpdateWithoutSpeakerInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    start_date?: DateTimeFieldUpdateOperationsInput | Date | string
    end_date?: DateTimeFieldUpdateOperationsInput | Date | string
    publications?: publicationsUncheckedUpdateManyWithoutConferencesNestedInput
  }

  export type usersUpsertWithoutSpeakerInput = {
    update: XOR<usersUpdateWithoutSpeakerInput, usersUncheckedUpdateWithoutSpeakerInput>
    create: XOR<usersCreateWithoutSpeakerInput, usersUncheckedCreateWithoutSpeakerInput>
    where?: usersWhereInput
  }

  export type usersUpdateToOneWithWhereWithoutSpeakerInput = {
    where?: usersWhereInput
    data: XOR<usersUpdateWithoutSpeakerInput, usersUncheckedUpdateWithoutSpeakerInput>
  }

  export type usersUpdateWithoutSpeakerInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    first_name?: NullableStringFieldUpdateOperationsInput | string | null
    last_name?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    photo_url?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    status?: NullableStringFieldUpdateOperationsInput | string | null
    affiliation?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    groups?: groupsUpdateManyWithoutUsersNestedInput
    links?: linksUpdateManyWithoutUsersNestedInput
    messages_messages_receiver_idTousers?: messagesUpdateManyWithoutUsers_messages_receiver_idTousersNestedInput
    messages_messages_sender_idTousers?: messagesUpdateManyWithoutUsers_messages_sender_idTousersNestedInput
    notifications?: notificationsUpdateManyWithoutUsersNestedInput
    publications?: publicationsUpdateManyWithoutUsersNestedInput
  }

  export type usersUncheckedUpdateWithoutSpeakerInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    first_name?: NullableStringFieldUpdateOperationsInput | string | null
    last_name?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    photo_url?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    status?: NullableStringFieldUpdateOperationsInput | string | null
    affiliation?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    groups?: groupsUncheckedUpdateManyWithoutUsersNestedInput
    links?: linksUncheckedUpdateManyWithoutUsersNestedInput
    messages_messages_receiver_idTousers?: messagesUncheckedUpdateManyWithoutUsers_messages_receiver_idTousersNestedInput
    messages_messages_sender_idTousers?: messagesUncheckedUpdateManyWithoutUsers_messages_sender_idTousersNestedInput
    notifications?: notificationsUncheckedUpdateManyWithoutUsersNestedInput
    publications?: publicationsUncheckedUpdateManyWithoutUsersNestedInput
  }

  export type groupsCreateWithoutUsersInput = {
    id: string
    title?: string
    description?: string
    status?: string
    created_at?: Date | string
    publications: publicationsCreateNestedOneWithoutGroupsInput
  }

  export type groupsUncheckedCreateWithoutUsersInput = {
    id: string
    title?: string
    description?: string
    status?: string
    created_at?: Date | string
    publication_id: string
  }

  export type groupsCreateOrConnectWithoutUsersInput = {
    where: groupsWhereUniqueInput
    create: XOR<groupsCreateWithoutUsersInput, groupsUncheckedCreateWithoutUsersInput>
  }

  export type groupsCreateManyUsersInputEnvelope = {
    data: groupsCreateManyUsersInput | groupsCreateManyUsersInput[]
    skipDuplicates?: boolean
  }

  export type linksCreateWithoutUsersInput = {
    id: string
    type?: string | null
    link?: string | null
  }

  export type linksUncheckedCreateWithoutUsersInput = {
    id: string
    type?: string | null
    link?: string | null
  }

  export type linksCreateOrConnectWithoutUsersInput = {
    where: linksWhereUniqueInput
    create: XOR<linksCreateWithoutUsersInput, linksUncheckedCreateWithoutUsersInput>
  }

  export type linksCreateManyUsersInputEnvelope = {
    data: linksCreateManyUsersInput | linksCreateManyUsersInput[]
    skipDuplicates?: boolean
  }

  export type messagesCreateWithoutUsers_messages_receiver_idTousersInput = {
    id: string
    message: string
    created_at?: Date | string | null
    status?: string | null
    users_messages_sender_idTousers: usersCreateNestedOneWithoutMessages_messages_sender_idTousersInput
  }

  export type messagesUncheckedCreateWithoutUsers_messages_receiver_idTousersInput = {
    id: string
    message: string
    created_at?: Date | string | null
    status?: string | null
    sender_id: string
  }

  export type messagesCreateOrConnectWithoutUsers_messages_receiver_idTousersInput = {
    where: messagesWhereUniqueInput
    create: XOR<messagesCreateWithoutUsers_messages_receiver_idTousersInput, messagesUncheckedCreateWithoutUsers_messages_receiver_idTousersInput>
  }

  export type messagesCreateManyUsers_messages_receiver_idTousersInputEnvelope = {
    data: messagesCreateManyUsers_messages_receiver_idTousersInput | messagesCreateManyUsers_messages_receiver_idTousersInput[]
    skipDuplicates?: boolean
  }

  export type messagesCreateWithoutUsers_messages_sender_idTousersInput = {
    id: string
    message: string
    created_at?: Date | string | null
    status?: string | null
    users_messages_receiver_idTousers: usersCreateNestedOneWithoutMessages_messages_receiver_idTousersInput
  }

  export type messagesUncheckedCreateWithoutUsers_messages_sender_idTousersInput = {
    id: string
    message: string
    created_at?: Date | string | null
    status?: string | null
    receiver_id: string
  }

  export type messagesCreateOrConnectWithoutUsers_messages_sender_idTousersInput = {
    where: messagesWhereUniqueInput
    create: XOR<messagesCreateWithoutUsers_messages_sender_idTousersInput, messagesUncheckedCreateWithoutUsers_messages_sender_idTousersInput>
  }

  export type messagesCreateManyUsers_messages_sender_idTousersInputEnvelope = {
    data: messagesCreateManyUsers_messages_sender_idTousersInput | messagesCreateManyUsers_messages_sender_idTousersInput[]
    skipDuplicates?: boolean
  }

  export type notificationsCreateWithoutUsersInput = {
    id: string
    message: string
    created_at?: Date | string | null
    read_status?: boolean | null
  }

  export type notificationsUncheckedCreateWithoutUsersInput = {
    id: string
    message: string
    created_at?: Date | string | null
    read_status?: boolean | null
  }

  export type notificationsCreateOrConnectWithoutUsersInput = {
    where: notificationsWhereUniqueInput
    create: XOR<notificationsCreateWithoutUsersInput, notificationsUncheckedCreateWithoutUsersInput>
  }

  export type notificationsCreateManyUsersInputEnvelope = {
    data: notificationsCreateManyUsersInput | notificationsCreateManyUsersInput[]
    skipDuplicates?: boolean
  }

  export type publicationsCreateWithoutUsersInput = {
    id: string
    title: string
    journal: string
    status?: string
    visibility?: string
    submitted_at?: Date | string
    groups?: groupsCreateNestedManyWithoutPublicationsInput
    publication_files?: publication_filesCreateNestedManyWithoutPublicationsInput
    conferences?: conferencesCreateNestedOneWithoutPublicationsInput
  }

  export type publicationsUncheckedCreateWithoutUsersInput = {
    id: string
    title: string
    journal: string
    status?: string
    visibility?: string
    conference_id?: string | null
    submitted_at?: Date | string
    groups?: groupsUncheckedCreateNestedManyWithoutPublicationsInput
    publication_files?: publication_filesUncheckedCreateNestedManyWithoutPublicationsInput
  }

  export type publicationsCreateOrConnectWithoutUsersInput = {
    where: publicationsWhereUniqueInput
    create: XOR<publicationsCreateWithoutUsersInput, publicationsUncheckedCreateWithoutUsersInput>
  }

  export type publicationsCreateManyUsersInputEnvelope = {
    data: publicationsCreateManyUsersInput | publicationsCreateManyUsersInput[]
    skipDuplicates?: boolean
  }

  export type speakerCreateWithoutUsersInput = {
    affiliation?: string | null
    title?: string | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    conferences: conferencesCreateNestedOneWithoutSpeakerInput
  }

  export type speakerUncheckedCreateWithoutUsersInput = {
    id?: number
    conference_id: string
    affiliation?: string | null
    title?: string | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
  }

  export type speakerCreateOrConnectWithoutUsersInput = {
    where: speakerWhereUniqueInput
    create: XOR<speakerCreateWithoutUsersInput, speakerUncheckedCreateWithoutUsersInput>
  }

  export type speakerCreateManyUsersInputEnvelope = {
    data: speakerCreateManyUsersInput | speakerCreateManyUsersInput[]
    skipDuplicates?: boolean
  }

  export type groupsUpsertWithWhereUniqueWithoutUsersInput = {
    where: groupsWhereUniqueInput
    update: XOR<groupsUpdateWithoutUsersInput, groupsUncheckedUpdateWithoutUsersInput>
    create: XOR<groupsCreateWithoutUsersInput, groupsUncheckedCreateWithoutUsersInput>
  }

  export type groupsUpdateWithWhereUniqueWithoutUsersInput = {
    where: groupsWhereUniqueInput
    data: XOR<groupsUpdateWithoutUsersInput, groupsUncheckedUpdateWithoutUsersInput>
  }

  export type groupsUpdateManyWithWhereWithoutUsersInput = {
    where: groupsScalarWhereInput
    data: XOR<groupsUpdateManyMutationInput, groupsUncheckedUpdateManyWithoutUsersInput>
  }

  export type linksUpsertWithWhereUniqueWithoutUsersInput = {
    where: linksWhereUniqueInput
    update: XOR<linksUpdateWithoutUsersInput, linksUncheckedUpdateWithoutUsersInput>
    create: XOR<linksCreateWithoutUsersInput, linksUncheckedCreateWithoutUsersInput>
  }

  export type linksUpdateWithWhereUniqueWithoutUsersInput = {
    where: linksWhereUniqueInput
    data: XOR<linksUpdateWithoutUsersInput, linksUncheckedUpdateWithoutUsersInput>
  }

  export type linksUpdateManyWithWhereWithoutUsersInput = {
    where: linksScalarWhereInput
    data: XOR<linksUpdateManyMutationInput, linksUncheckedUpdateManyWithoutUsersInput>
  }

  export type linksScalarWhereInput = {
    AND?: linksScalarWhereInput | linksScalarWhereInput[]
    OR?: linksScalarWhereInput[]
    NOT?: linksScalarWhereInput | linksScalarWhereInput[]
    id?: UuidFilter<"links"> | string
    type?: StringNullableFilter<"links"> | string | null
    link?: StringNullableFilter<"links"> | string | null
    user_id?: UuidFilter<"links"> | string
  }

  export type messagesUpsertWithWhereUniqueWithoutUsers_messages_receiver_idTousersInput = {
    where: messagesWhereUniqueInput
    update: XOR<messagesUpdateWithoutUsers_messages_receiver_idTousersInput, messagesUncheckedUpdateWithoutUsers_messages_receiver_idTousersInput>
    create: XOR<messagesCreateWithoutUsers_messages_receiver_idTousersInput, messagesUncheckedCreateWithoutUsers_messages_receiver_idTousersInput>
  }

  export type messagesUpdateWithWhereUniqueWithoutUsers_messages_receiver_idTousersInput = {
    where: messagesWhereUniqueInput
    data: XOR<messagesUpdateWithoutUsers_messages_receiver_idTousersInput, messagesUncheckedUpdateWithoutUsers_messages_receiver_idTousersInput>
  }

  export type messagesUpdateManyWithWhereWithoutUsers_messages_receiver_idTousersInput = {
    where: messagesScalarWhereInput
    data: XOR<messagesUpdateManyMutationInput, messagesUncheckedUpdateManyWithoutUsers_messages_receiver_idTousersInput>
  }

  export type messagesScalarWhereInput = {
    AND?: messagesScalarWhereInput | messagesScalarWhereInput[]
    OR?: messagesScalarWhereInput[]
    NOT?: messagesScalarWhereInput | messagesScalarWhereInput[]
    id?: UuidFilter<"messages"> | string
    message?: StringFilter<"messages"> | string
    created_at?: DateTimeNullableFilter<"messages"> | Date | string | null
    status?: StringNullableFilter<"messages"> | string | null
    sender_id?: UuidFilter<"messages"> | string
    receiver_id?: UuidFilter<"messages"> | string
  }

  export type messagesUpsertWithWhereUniqueWithoutUsers_messages_sender_idTousersInput = {
    where: messagesWhereUniqueInput
    update: XOR<messagesUpdateWithoutUsers_messages_sender_idTousersInput, messagesUncheckedUpdateWithoutUsers_messages_sender_idTousersInput>
    create: XOR<messagesCreateWithoutUsers_messages_sender_idTousersInput, messagesUncheckedCreateWithoutUsers_messages_sender_idTousersInput>
  }

  export type messagesUpdateWithWhereUniqueWithoutUsers_messages_sender_idTousersInput = {
    where: messagesWhereUniqueInput
    data: XOR<messagesUpdateWithoutUsers_messages_sender_idTousersInput, messagesUncheckedUpdateWithoutUsers_messages_sender_idTousersInput>
  }

  export type messagesUpdateManyWithWhereWithoutUsers_messages_sender_idTousersInput = {
    where: messagesScalarWhereInput
    data: XOR<messagesUpdateManyMutationInput, messagesUncheckedUpdateManyWithoutUsers_messages_sender_idTousersInput>
  }

  export type notificationsUpsertWithWhereUniqueWithoutUsersInput = {
    where: notificationsWhereUniqueInput
    update: XOR<notificationsUpdateWithoutUsersInput, notificationsUncheckedUpdateWithoutUsersInput>
    create: XOR<notificationsCreateWithoutUsersInput, notificationsUncheckedCreateWithoutUsersInput>
  }

  export type notificationsUpdateWithWhereUniqueWithoutUsersInput = {
    where: notificationsWhereUniqueInput
    data: XOR<notificationsUpdateWithoutUsersInput, notificationsUncheckedUpdateWithoutUsersInput>
  }

  export type notificationsUpdateManyWithWhereWithoutUsersInput = {
    where: notificationsScalarWhereInput
    data: XOR<notificationsUpdateManyMutationInput, notificationsUncheckedUpdateManyWithoutUsersInput>
  }

  export type notificationsScalarWhereInput = {
    AND?: notificationsScalarWhereInput | notificationsScalarWhereInput[]
    OR?: notificationsScalarWhereInput[]
    NOT?: notificationsScalarWhereInput | notificationsScalarWhereInput[]
    id?: UuidFilter<"notifications"> | string
    message?: StringFilter<"notifications"> | string
    created_at?: DateTimeNullableFilter<"notifications"> | Date | string | null
    read_status?: BoolNullableFilter<"notifications"> | boolean | null
    user_id?: UuidFilter<"notifications"> | string
  }

  export type publicationsUpsertWithWhereUniqueWithoutUsersInput = {
    where: publicationsWhereUniqueInput
    update: XOR<publicationsUpdateWithoutUsersInput, publicationsUncheckedUpdateWithoutUsersInput>
    create: XOR<publicationsCreateWithoutUsersInput, publicationsUncheckedCreateWithoutUsersInput>
  }

  export type publicationsUpdateWithWhereUniqueWithoutUsersInput = {
    where: publicationsWhereUniqueInput
    data: XOR<publicationsUpdateWithoutUsersInput, publicationsUncheckedUpdateWithoutUsersInput>
  }

  export type publicationsUpdateManyWithWhereWithoutUsersInput = {
    where: publicationsScalarWhereInput
    data: XOR<publicationsUpdateManyMutationInput, publicationsUncheckedUpdateManyWithoutUsersInput>
  }

  export type speakerUpsertWithWhereUniqueWithoutUsersInput = {
    where: speakerWhereUniqueInput
    update: XOR<speakerUpdateWithoutUsersInput, speakerUncheckedUpdateWithoutUsersInput>
    create: XOR<speakerCreateWithoutUsersInput, speakerUncheckedCreateWithoutUsersInput>
  }

  export type speakerUpdateWithWhereUniqueWithoutUsersInput = {
    where: speakerWhereUniqueInput
    data: XOR<speakerUpdateWithoutUsersInput, speakerUncheckedUpdateWithoutUsersInput>
  }

  export type speakerUpdateManyWithWhereWithoutUsersInput = {
    where: speakerScalarWhereInput
    data: XOR<speakerUpdateManyMutationInput, speakerUncheckedUpdateManyWithoutUsersInput>
  }

  export type publicationsCreateManyConferencesInput = {
    id: string
    title: string
    journal: string
    status?: string
    visibility?: string
    submitter_id: string
    submitted_at?: Date | string
  }

  export type speakerCreateManyConferencesInput = {
    id?: number
    user_id: string
    affiliation?: string | null
    title?: string | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
  }

  export type publicationsUpdateWithoutConferencesInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    journal?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    visibility?: StringFieldUpdateOperationsInput | string
    submitted_at?: DateTimeFieldUpdateOperationsInput | Date | string
    groups?: groupsUpdateManyWithoutPublicationsNestedInput
    publication_files?: publication_filesUpdateManyWithoutPublicationsNestedInput
    users?: usersUpdateOneRequiredWithoutPublicationsNestedInput
  }

  export type publicationsUncheckedUpdateWithoutConferencesInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    journal?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    visibility?: StringFieldUpdateOperationsInput | string
    submitter_id?: StringFieldUpdateOperationsInput | string
    submitted_at?: DateTimeFieldUpdateOperationsInput | Date | string
    groups?: groupsUncheckedUpdateManyWithoutPublicationsNestedInput
    publication_files?: publication_filesUncheckedUpdateManyWithoutPublicationsNestedInput
  }

  export type publicationsUncheckedUpdateManyWithoutConferencesInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    journal?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    visibility?: StringFieldUpdateOperationsInput | string
    submitter_id?: StringFieldUpdateOperationsInput | string
    submitted_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type speakerUpdateWithoutConferencesInput = {
    affiliation?: NullableStringFieldUpdateOperationsInput | string | null
    title?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    users?: usersUpdateOneRequiredWithoutSpeakerNestedInput
  }

  export type speakerUncheckedUpdateWithoutConferencesInput = {
    id?: IntFieldUpdateOperationsInput | number
    user_id?: StringFieldUpdateOperationsInput | string
    affiliation?: NullableStringFieldUpdateOperationsInput | string | null
    title?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type speakerUncheckedUpdateManyWithoutConferencesInput = {
    id?: IntFieldUpdateOperationsInput | number
    user_id?: StringFieldUpdateOperationsInput | string
    affiliation?: NullableStringFieldUpdateOperationsInput | string | null
    title?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type groupsCreateManyPublicationsInput = {
    id: string
    title?: string
    description?: string
    status?: string
    created_at?: Date | string
    leader_id: string
  }

  export type publication_filesCreateManyPublicationsInput = {
    id: string
    file_type: string
    file_path: string
  }

  export type groupsUpdateWithoutPublicationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: usersUpdateOneRequiredWithoutGroupsNestedInput
  }

  export type groupsUncheckedUpdateWithoutPublicationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    leader_id?: StringFieldUpdateOperationsInput | string
  }

  export type groupsUncheckedUpdateManyWithoutPublicationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    leader_id?: StringFieldUpdateOperationsInput | string
  }

  export type publication_filesUpdateWithoutPublicationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    file_type?: StringFieldUpdateOperationsInput | string
    file_path?: StringFieldUpdateOperationsInput | string
  }

  export type publication_filesUncheckedUpdateWithoutPublicationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    file_type?: StringFieldUpdateOperationsInput | string
    file_path?: StringFieldUpdateOperationsInput | string
  }

  export type publication_filesUncheckedUpdateManyWithoutPublicationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    file_type?: StringFieldUpdateOperationsInput | string
    file_path?: StringFieldUpdateOperationsInput | string
  }

  export type groupsCreateManyUsersInput = {
    id: string
    title?: string
    description?: string
    status?: string
    created_at?: Date | string
    publication_id: string
  }

  export type linksCreateManyUsersInput = {
    id: string
    type?: string | null
    link?: string | null
  }

  export type messagesCreateManyUsers_messages_receiver_idTousersInput = {
    id: string
    message: string
    created_at?: Date | string | null
    status?: string | null
    sender_id: string
  }

  export type messagesCreateManyUsers_messages_sender_idTousersInput = {
    id: string
    message: string
    created_at?: Date | string | null
    status?: string | null
    receiver_id: string
  }

  export type notificationsCreateManyUsersInput = {
    id: string
    message: string
    created_at?: Date | string | null
    read_status?: boolean | null
  }

  export type publicationsCreateManyUsersInput = {
    id: string
    title: string
    journal: string
    status?: string
    visibility?: string
    conference_id?: string | null
    submitted_at?: Date | string
  }

  export type speakerCreateManyUsersInput = {
    id?: number
    conference_id: string
    affiliation?: string | null
    title?: string | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
  }

  export type groupsUpdateWithoutUsersInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    publications?: publicationsUpdateOneRequiredWithoutGroupsNestedInput
  }

  export type groupsUncheckedUpdateWithoutUsersInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    publication_id?: StringFieldUpdateOperationsInput | string
  }

  export type groupsUncheckedUpdateManyWithoutUsersInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    publication_id?: StringFieldUpdateOperationsInput | string
  }

  export type linksUpdateWithoutUsersInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: NullableStringFieldUpdateOperationsInput | string | null
    link?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type linksUncheckedUpdateWithoutUsersInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: NullableStringFieldUpdateOperationsInput | string | null
    link?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type linksUncheckedUpdateManyWithoutUsersInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: NullableStringFieldUpdateOperationsInput | string | null
    link?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type messagesUpdateWithoutUsers_messages_receiver_idTousersInput = {
    id?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    users_messages_sender_idTousers?: usersUpdateOneRequiredWithoutMessages_messages_sender_idTousersNestedInput
  }

  export type messagesUncheckedUpdateWithoutUsers_messages_receiver_idTousersInput = {
    id?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    sender_id?: StringFieldUpdateOperationsInput | string
  }

  export type messagesUncheckedUpdateManyWithoutUsers_messages_receiver_idTousersInput = {
    id?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    sender_id?: StringFieldUpdateOperationsInput | string
  }

  export type messagesUpdateWithoutUsers_messages_sender_idTousersInput = {
    id?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    users_messages_receiver_idTousers?: usersUpdateOneRequiredWithoutMessages_messages_receiver_idTousersNestedInput
  }

  export type messagesUncheckedUpdateWithoutUsers_messages_sender_idTousersInput = {
    id?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    receiver_id?: StringFieldUpdateOperationsInput | string
  }

  export type messagesUncheckedUpdateManyWithoutUsers_messages_sender_idTousersInput = {
    id?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    receiver_id?: StringFieldUpdateOperationsInput | string
  }

  export type notificationsUpdateWithoutUsersInput = {
    id?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    read_status?: NullableBoolFieldUpdateOperationsInput | boolean | null
  }

  export type notificationsUncheckedUpdateWithoutUsersInput = {
    id?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    read_status?: NullableBoolFieldUpdateOperationsInput | boolean | null
  }

  export type notificationsUncheckedUpdateManyWithoutUsersInput = {
    id?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    read_status?: NullableBoolFieldUpdateOperationsInput | boolean | null
  }

  export type publicationsUpdateWithoutUsersInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    journal?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    visibility?: StringFieldUpdateOperationsInput | string
    submitted_at?: DateTimeFieldUpdateOperationsInput | Date | string
    groups?: groupsUpdateManyWithoutPublicationsNestedInput
    publication_files?: publication_filesUpdateManyWithoutPublicationsNestedInput
    conferences?: conferencesUpdateOneWithoutPublicationsNestedInput
  }

  export type publicationsUncheckedUpdateWithoutUsersInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    journal?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    visibility?: StringFieldUpdateOperationsInput | string
    conference_id?: NullableStringFieldUpdateOperationsInput | string | null
    submitted_at?: DateTimeFieldUpdateOperationsInput | Date | string
    groups?: groupsUncheckedUpdateManyWithoutPublicationsNestedInput
    publication_files?: publication_filesUncheckedUpdateManyWithoutPublicationsNestedInput
  }

  export type publicationsUncheckedUpdateManyWithoutUsersInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    journal?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    visibility?: StringFieldUpdateOperationsInput | string
    conference_id?: NullableStringFieldUpdateOperationsInput | string | null
    submitted_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type speakerUpdateWithoutUsersInput = {
    affiliation?: NullableStringFieldUpdateOperationsInput | string | null
    title?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    conferences?: conferencesUpdateOneRequiredWithoutSpeakerNestedInput
  }

  export type speakerUncheckedUpdateWithoutUsersInput = {
    id?: IntFieldUpdateOperationsInput | number
    conference_id?: StringFieldUpdateOperationsInput | string
    affiliation?: NullableStringFieldUpdateOperationsInput | string | null
    title?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type speakerUncheckedUpdateManyWithoutUsersInput = {
    id?: IntFieldUpdateOperationsInput | number
    conference_id?: StringFieldUpdateOperationsInput | string
    affiliation?: NullableStringFieldUpdateOperationsInput | string | null
    title?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}