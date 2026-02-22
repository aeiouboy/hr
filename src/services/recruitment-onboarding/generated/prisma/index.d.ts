
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
 * Model JobPosting
 * 
 */
export type JobPosting = $Result.DefaultSelection<Prisma.$JobPostingPayload>
/**
 * Model Candidate
 * 
 */
export type Candidate = $Result.DefaultSelection<Prisma.$CandidatePayload>
/**
 * Model Screening
 * 
 */
export type Screening = $Result.DefaultSelection<Prisma.$ScreeningPayload>
/**
 * Model OnboardingTemplate
 * 
 */
export type OnboardingTemplate = $Result.DefaultSelection<Prisma.$OnboardingTemplatePayload>
/**
 * Model OnboardingTask
 * 
 */
export type OnboardingTask = $Result.DefaultSelection<Prisma.$OnboardingTaskPayload>
/**
 * Model Resignation
 * 
 */
export type Resignation = $Result.DefaultSelection<Prisma.$ResignationPayload>
/**
 * Model ClearanceItem
 * 
 */
export type ClearanceItem = $Result.DefaultSelection<Prisma.$ClearanceItemPayload>
/**
 * Model AuditLog
 * 
 */
export type AuditLog = $Result.DefaultSelection<Prisma.$AuditLogPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more JobPostings
 * const jobPostings = await prisma.jobPosting.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
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
   * // Fetch zero or more JobPostings
   * const jobPostings = await prisma.jobPosting.findMany()
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
   * `prisma.jobPosting`: Exposes CRUD operations for the **JobPosting** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more JobPostings
    * const jobPostings = await prisma.jobPosting.findMany()
    * ```
    */
  get jobPosting(): Prisma.JobPostingDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.candidate`: Exposes CRUD operations for the **Candidate** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Candidates
    * const candidates = await prisma.candidate.findMany()
    * ```
    */
  get candidate(): Prisma.CandidateDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.screening`: Exposes CRUD operations for the **Screening** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Screenings
    * const screenings = await prisma.screening.findMany()
    * ```
    */
  get screening(): Prisma.ScreeningDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.onboardingTemplate`: Exposes CRUD operations for the **OnboardingTemplate** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more OnboardingTemplates
    * const onboardingTemplates = await prisma.onboardingTemplate.findMany()
    * ```
    */
  get onboardingTemplate(): Prisma.OnboardingTemplateDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.onboardingTask`: Exposes CRUD operations for the **OnboardingTask** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more OnboardingTasks
    * const onboardingTasks = await prisma.onboardingTask.findMany()
    * ```
    */
  get onboardingTask(): Prisma.OnboardingTaskDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.resignation`: Exposes CRUD operations for the **Resignation** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Resignations
    * const resignations = await prisma.resignation.findMany()
    * ```
    */
  get resignation(): Prisma.ResignationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.clearanceItem`: Exposes CRUD operations for the **ClearanceItem** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ClearanceItems
    * const clearanceItems = await prisma.clearanceItem.findMany()
    * ```
    */
  get clearanceItem(): Prisma.ClearanceItemDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.auditLog`: Exposes CRUD operations for the **AuditLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AuditLogs
    * const auditLogs = await prisma.auditLog.findMany()
    * ```
    */
  get auditLog(): Prisma.AuditLogDelegate<ExtArgs, ClientOptions>;
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
   * Prisma Client JS version: 6.19.2
   * Query Engine version: c2990dca591cba766e3b7ef5d9e8a84796e47ab7
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
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
    JobPosting: 'JobPosting',
    Candidate: 'Candidate',
    Screening: 'Screening',
    OnboardingTemplate: 'OnboardingTemplate',
    OnboardingTask: 'OnboardingTask',
    Resignation: 'Resignation',
    ClearanceItem: 'ClearanceItem',
    AuditLog: 'AuditLog'
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
      modelProps: "jobPosting" | "candidate" | "screening" | "onboardingTemplate" | "onboardingTask" | "resignation" | "clearanceItem" | "auditLog"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      JobPosting: {
        payload: Prisma.$JobPostingPayload<ExtArgs>
        fields: Prisma.JobPostingFieldRefs
        operations: {
          findUnique: {
            args: Prisma.JobPostingFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobPostingPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.JobPostingFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobPostingPayload>
          }
          findFirst: {
            args: Prisma.JobPostingFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobPostingPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.JobPostingFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobPostingPayload>
          }
          findMany: {
            args: Prisma.JobPostingFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobPostingPayload>[]
          }
          create: {
            args: Prisma.JobPostingCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobPostingPayload>
          }
          createMany: {
            args: Prisma.JobPostingCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.JobPostingCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobPostingPayload>[]
          }
          delete: {
            args: Prisma.JobPostingDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobPostingPayload>
          }
          update: {
            args: Prisma.JobPostingUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobPostingPayload>
          }
          deleteMany: {
            args: Prisma.JobPostingDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.JobPostingUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.JobPostingUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobPostingPayload>[]
          }
          upsert: {
            args: Prisma.JobPostingUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobPostingPayload>
          }
          aggregate: {
            args: Prisma.JobPostingAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateJobPosting>
          }
          groupBy: {
            args: Prisma.JobPostingGroupByArgs<ExtArgs>
            result: $Utils.Optional<JobPostingGroupByOutputType>[]
          }
          count: {
            args: Prisma.JobPostingCountArgs<ExtArgs>
            result: $Utils.Optional<JobPostingCountAggregateOutputType> | number
          }
        }
      }
      Candidate: {
        payload: Prisma.$CandidatePayload<ExtArgs>
        fields: Prisma.CandidateFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CandidateFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CandidatePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CandidateFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CandidatePayload>
          }
          findFirst: {
            args: Prisma.CandidateFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CandidatePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CandidateFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CandidatePayload>
          }
          findMany: {
            args: Prisma.CandidateFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CandidatePayload>[]
          }
          create: {
            args: Prisma.CandidateCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CandidatePayload>
          }
          createMany: {
            args: Prisma.CandidateCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CandidateCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CandidatePayload>[]
          }
          delete: {
            args: Prisma.CandidateDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CandidatePayload>
          }
          update: {
            args: Prisma.CandidateUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CandidatePayload>
          }
          deleteMany: {
            args: Prisma.CandidateDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CandidateUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CandidateUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CandidatePayload>[]
          }
          upsert: {
            args: Prisma.CandidateUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CandidatePayload>
          }
          aggregate: {
            args: Prisma.CandidateAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCandidate>
          }
          groupBy: {
            args: Prisma.CandidateGroupByArgs<ExtArgs>
            result: $Utils.Optional<CandidateGroupByOutputType>[]
          }
          count: {
            args: Prisma.CandidateCountArgs<ExtArgs>
            result: $Utils.Optional<CandidateCountAggregateOutputType> | number
          }
        }
      }
      Screening: {
        payload: Prisma.$ScreeningPayload<ExtArgs>
        fields: Prisma.ScreeningFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ScreeningFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScreeningPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ScreeningFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScreeningPayload>
          }
          findFirst: {
            args: Prisma.ScreeningFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScreeningPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ScreeningFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScreeningPayload>
          }
          findMany: {
            args: Prisma.ScreeningFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScreeningPayload>[]
          }
          create: {
            args: Prisma.ScreeningCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScreeningPayload>
          }
          createMany: {
            args: Prisma.ScreeningCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ScreeningCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScreeningPayload>[]
          }
          delete: {
            args: Prisma.ScreeningDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScreeningPayload>
          }
          update: {
            args: Prisma.ScreeningUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScreeningPayload>
          }
          deleteMany: {
            args: Prisma.ScreeningDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ScreeningUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ScreeningUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScreeningPayload>[]
          }
          upsert: {
            args: Prisma.ScreeningUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScreeningPayload>
          }
          aggregate: {
            args: Prisma.ScreeningAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateScreening>
          }
          groupBy: {
            args: Prisma.ScreeningGroupByArgs<ExtArgs>
            result: $Utils.Optional<ScreeningGroupByOutputType>[]
          }
          count: {
            args: Prisma.ScreeningCountArgs<ExtArgs>
            result: $Utils.Optional<ScreeningCountAggregateOutputType> | number
          }
        }
      }
      OnboardingTemplate: {
        payload: Prisma.$OnboardingTemplatePayload<ExtArgs>
        fields: Prisma.OnboardingTemplateFieldRefs
        operations: {
          findUnique: {
            args: Prisma.OnboardingTemplateFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OnboardingTemplatePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.OnboardingTemplateFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OnboardingTemplatePayload>
          }
          findFirst: {
            args: Prisma.OnboardingTemplateFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OnboardingTemplatePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.OnboardingTemplateFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OnboardingTemplatePayload>
          }
          findMany: {
            args: Prisma.OnboardingTemplateFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OnboardingTemplatePayload>[]
          }
          create: {
            args: Prisma.OnboardingTemplateCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OnboardingTemplatePayload>
          }
          createMany: {
            args: Prisma.OnboardingTemplateCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.OnboardingTemplateCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OnboardingTemplatePayload>[]
          }
          delete: {
            args: Prisma.OnboardingTemplateDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OnboardingTemplatePayload>
          }
          update: {
            args: Prisma.OnboardingTemplateUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OnboardingTemplatePayload>
          }
          deleteMany: {
            args: Prisma.OnboardingTemplateDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.OnboardingTemplateUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.OnboardingTemplateUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OnboardingTemplatePayload>[]
          }
          upsert: {
            args: Prisma.OnboardingTemplateUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OnboardingTemplatePayload>
          }
          aggregate: {
            args: Prisma.OnboardingTemplateAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateOnboardingTemplate>
          }
          groupBy: {
            args: Prisma.OnboardingTemplateGroupByArgs<ExtArgs>
            result: $Utils.Optional<OnboardingTemplateGroupByOutputType>[]
          }
          count: {
            args: Prisma.OnboardingTemplateCountArgs<ExtArgs>
            result: $Utils.Optional<OnboardingTemplateCountAggregateOutputType> | number
          }
        }
      }
      OnboardingTask: {
        payload: Prisma.$OnboardingTaskPayload<ExtArgs>
        fields: Prisma.OnboardingTaskFieldRefs
        operations: {
          findUnique: {
            args: Prisma.OnboardingTaskFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OnboardingTaskPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.OnboardingTaskFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OnboardingTaskPayload>
          }
          findFirst: {
            args: Prisma.OnboardingTaskFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OnboardingTaskPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.OnboardingTaskFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OnboardingTaskPayload>
          }
          findMany: {
            args: Prisma.OnboardingTaskFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OnboardingTaskPayload>[]
          }
          create: {
            args: Prisma.OnboardingTaskCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OnboardingTaskPayload>
          }
          createMany: {
            args: Prisma.OnboardingTaskCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.OnboardingTaskCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OnboardingTaskPayload>[]
          }
          delete: {
            args: Prisma.OnboardingTaskDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OnboardingTaskPayload>
          }
          update: {
            args: Prisma.OnboardingTaskUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OnboardingTaskPayload>
          }
          deleteMany: {
            args: Prisma.OnboardingTaskDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.OnboardingTaskUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.OnboardingTaskUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OnboardingTaskPayload>[]
          }
          upsert: {
            args: Prisma.OnboardingTaskUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OnboardingTaskPayload>
          }
          aggregate: {
            args: Prisma.OnboardingTaskAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateOnboardingTask>
          }
          groupBy: {
            args: Prisma.OnboardingTaskGroupByArgs<ExtArgs>
            result: $Utils.Optional<OnboardingTaskGroupByOutputType>[]
          }
          count: {
            args: Prisma.OnboardingTaskCountArgs<ExtArgs>
            result: $Utils.Optional<OnboardingTaskCountAggregateOutputType> | number
          }
        }
      }
      Resignation: {
        payload: Prisma.$ResignationPayload<ExtArgs>
        fields: Prisma.ResignationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ResignationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResignationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ResignationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResignationPayload>
          }
          findFirst: {
            args: Prisma.ResignationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResignationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ResignationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResignationPayload>
          }
          findMany: {
            args: Prisma.ResignationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResignationPayload>[]
          }
          create: {
            args: Prisma.ResignationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResignationPayload>
          }
          createMany: {
            args: Prisma.ResignationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ResignationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResignationPayload>[]
          }
          delete: {
            args: Prisma.ResignationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResignationPayload>
          }
          update: {
            args: Prisma.ResignationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResignationPayload>
          }
          deleteMany: {
            args: Prisma.ResignationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ResignationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ResignationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResignationPayload>[]
          }
          upsert: {
            args: Prisma.ResignationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResignationPayload>
          }
          aggregate: {
            args: Prisma.ResignationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateResignation>
          }
          groupBy: {
            args: Prisma.ResignationGroupByArgs<ExtArgs>
            result: $Utils.Optional<ResignationGroupByOutputType>[]
          }
          count: {
            args: Prisma.ResignationCountArgs<ExtArgs>
            result: $Utils.Optional<ResignationCountAggregateOutputType> | number
          }
        }
      }
      ClearanceItem: {
        payload: Prisma.$ClearanceItemPayload<ExtArgs>
        fields: Prisma.ClearanceItemFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ClearanceItemFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClearanceItemPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ClearanceItemFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClearanceItemPayload>
          }
          findFirst: {
            args: Prisma.ClearanceItemFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClearanceItemPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ClearanceItemFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClearanceItemPayload>
          }
          findMany: {
            args: Prisma.ClearanceItemFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClearanceItemPayload>[]
          }
          create: {
            args: Prisma.ClearanceItemCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClearanceItemPayload>
          }
          createMany: {
            args: Prisma.ClearanceItemCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ClearanceItemCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClearanceItemPayload>[]
          }
          delete: {
            args: Prisma.ClearanceItemDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClearanceItemPayload>
          }
          update: {
            args: Prisma.ClearanceItemUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClearanceItemPayload>
          }
          deleteMany: {
            args: Prisma.ClearanceItemDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ClearanceItemUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ClearanceItemUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClearanceItemPayload>[]
          }
          upsert: {
            args: Prisma.ClearanceItemUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClearanceItemPayload>
          }
          aggregate: {
            args: Prisma.ClearanceItemAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateClearanceItem>
          }
          groupBy: {
            args: Prisma.ClearanceItemGroupByArgs<ExtArgs>
            result: $Utils.Optional<ClearanceItemGroupByOutputType>[]
          }
          count: {
            args: Prisma.ClearanceItemCountArgs<ExtArgs>
            result: $Utils.Optional<ClearanceItemCountAggregateOutputType> | number
          }
        }
      }
      AuditLog: {
        payload: Prisma.$AuditLogPayload<ExtArgs>
        fields: Prisma.AuditLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AuditLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AuditLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          findFirst: {
            args: Prisma.AuditLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AuditLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          findMany: {
            args: Prisma.AuditLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>[]
          }
          create: {
            args: Prisma.AuditLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          createMany: {
            args: Prisma.AuditLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AuditLogCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>[]
          }
          delete: {
            args: Prisma.AuditLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          update: {
            args: Prisma.AuditLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          deleteMany: {
            args: Prisma.AuditLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AuditLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AuditLogUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>[]
          }
          upsert: {
            args: Prisma.AuditLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          aggregate: {
            args: Prisma.AuditLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAuditLog>
          }
          groupBy: {
            args: Prisma.AuditLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<AuditLogGroupByOutputType>[]
          }
          count: {
            args: Prisma.AuditLogCountArgs<ExtArgs>
            result: $Utils.Optional<AuditLogCountAggregateOutputType> | number
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
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
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
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory | null
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
    jobPosting?: JobPostingOmit
    candidate?: CandidateOmit
    screening?: ScreeningOmit
    onboardingTemplate?: OnboardingTemplateOmit
    onboardingTask?: OnboardingTaskOmit
    resignation?: ResignationOmit
    clearanceItem?: ClearanceItemOmit
    auditLog?: AuditLogOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

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
   * Count Type JobPostingCountOutputType
   */

  export type JobPostingCountOutputType = {
    candidates: number
  }

  export type JobPostingCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    candidates?: boolean | JobPostingCountOutputTypeCountCandidatesArgs
  }

  // Custom InputTypes
  /**
   * JobPostingCountOutputType without action
   */
  export type JobPostingCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobPostingCountOutputType
     */
    select?: JobPostingCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * JobPostingCountOutputType without action
   */
  export type JobPostingCountOutputTypeCountCandidatesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CandidateWhereInput
  }


  /**
   * Count Type CandidateCountOutputType
   */

  export type CandidateCountOutputType = {
    screenings: number
  }

  export type CandidateCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    screenings?: boolean | CandidateCountOutputTypeCountScreeningsArgs
  }

  // Custom InputTypes
  /**
   * CandidateCountOutputType without action
   */
  export type CandidateCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CandidateCountOutputType
     */
    select?: CandidateCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CandidateCountOutputType without action
   */
  export type CandidateCountOutputTypeCountScreeningsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ScreeningWhereInput
  }


  /**
   * Count Type OnboardingTemplateCountOutputType
   */

  export type OnboardingTemplateCountOutputType = {
    tasks: number
  }

  export type OnboardingTemplateCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tasks?: boolean | OnboardingTemplateCountOutputTypeCountTasksArgs
  }

  // Custom InputTypes
  /**
   * OnboardingTemplateCountOutputType without action
   */
  export type OnboardingTemplateCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OnboardingTemplateCountOutputType
     */
    select?: OnboardingTemplateCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * OnboardingTemplateCountOutputType without action
   */
  export type OnboardingTemplateCountOutputTypeCountTasksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OnboardingTaskWhereInput
  }


  /**
   * Count Type ResignationCountOutputType
   */

  export type ResignationCountOutputType = {
    clearance_items: number
  }

  export type ResignationCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    clearance_items?: boolean | ResignationCountOutputTypeCountClearance_itemsArgs
  }

  // Custom InputTypes
  /**
   * ResignationCountOutputType without action
   */
  export type ResignationCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResignationCountOutputType
     */
    select?: ResignationCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ResignationCountOutputType without action
   */
  export type ResignationCountOutputTypeCountClearance_itemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ClearanceItemWhereInput
  }


  /**
   * Models
   */

  /**
   * Model JobPosting
   */

  export type AggregateJobPosting = {
    _count: JobPostingCountAggregateOutputType | null
    _avg: JobPostingAvgAggregateOutputType | null
    _sum: JobPostingSumAggregateOutputType | null
    _min: JobPostingMinAggregateOutputType | null
    _max: JobPostingMaxAggregateOutputType | null
  }

  export type JobPostingAvgAggregateOutputType = {
    salary_range_min: number | null
    salary_range_max: number | null
    headcount: number | null
    filled_count: number | null
  }

  export type JobPostingSumAggregateOutputType = {
    salary_range_min: number | null
    salary_range_max: number | null
    headcount: number | null
    filled_count: number | null
  }

  export type JobPostingMinAggregateOutputType = {
    id: string | null
    position_id: string | null
    position_title: string | null
    position_title_th: string | null
    department: string | null
    department_th: string | null
    company: string | null
    location: string | null
    location_th: string | null
    job_family: string | null
    employment_type: string | null
    salary_range_min: number | null
    salary_range_max: number | null
    currency: string | null
    posting_date: Date | null
    closing_date: Date | null
    status: string | null
    headcount: number | null
    filled_count: number | null
    description: string | null
    description_th: string | null
    hiring_manager_id: string | null
    hr_recruiter_id: string | null
    is_internal: boolean | null
    is_external: boolean | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type JobPostingMaxAggregateOutputType = {
    id: string | null
    position_id: string | null
    position_title: string | null
    position_title_th: string | null
    department: string | null
    department_th: string | null
    company: string | null
    location: string | null
    location_th: string | null
    job_family: string | null
    employment_type: string | null
    salary_range_min: number | null
    salary_range_max: number | null
    currency: string | null
    posting_date: Date | null
    closing_date: Date | null
    status: string | null
    headcount: number | null
    filled_count: number | null
    description: string | null
    description_th: string | null
    hiring_manager_id: string | null
    hr_recruiter_id: string | null
    is_internal: boolean | null
    is_external: boolean | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type JobPostingCountAggregateOutputType = {
    id: number
    position_id: number
    position_title: number
    position_title_th: number
    department: number
    department_th: number
    company: number
    location: number
    location_th: number
    job_family: number
    employment_type: number
    salary_range_min: number
    salary_range_max: number
    currency: number
    posting_date: number
    closing_date: number
    status: number
    headcount: number
    filled_count: number
    description: number
    description_th: number
    requirements: number
    benefits: number
    hiring_manager_id: number
    hr_recruiter_id: number
    is_internal: number
    is_external: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type JobPostingAvgAggregateInputType = {
    salary_range_min?: true
    salary_range_max?: true
    headcount?: true
    filled_count?: true
  }

  export type JobPostingSumAggregateInputType = {
    salary_range_min?: true
    salary_range_max?: true
    headcount?: true
    filled_count?: true
  }

  export type JobPostingMinAggregateInputType = {
    id?: true
    position_id?: true
    position_title?: true
    position_title_th?: true
    department?: true
    department_th?: true
    company?: true
    location?: true
    location_th?: true
    job_family?: true
    employment_type?: true
    salary_range_min?: true
    salary_range_max?: true
    currency?: true
    posting_date?: true
    closing_date?: true
    status?: true
    headcount?: true
    filled_count?: true
    description?: true
    description_th?: true
    hiring_manager_id?: true
    hr_recruiter_id?: true
    is_internal?: true
    is_external?: true
    created_at?: true
    updated_at?: true
  }

  export type JobPostingMaxAggregateInputType = {
    id?: true
    position_id?: true
    position_title?: true
    position_title_th?: true
    department?: true
    department_th?: true
    company?: true
    location?: true
    location_th?: true
    job_family?: true
    employment_type?: true
    salary_range_min?: true
    salary_range_max?: true
    currency?: true
    posting_date?: true
    closing_date?: true
    status?: true
    headcount?: true
    filled_count?: true
    description?: true
    description_th?: true
    hiring_manager_id?: true
    hr_recruiter_id?: true
    is_internal?: true
    is_external?: true
    created_at?: true
    updated_at?: true
  }

  export type JobPostingCountAggregateInputType = {
    id?: true
    position_id?: true
    position_title?: true
    position_title_th?: true
    department?: true
    department_th?: true
    company?: true
    location?: true
    location_th?: true
    job_family?: true
    employment_type?: true
    salary_range_min?: true
    salary_range_max?: true
    currency?: true
    posting_date?: true
    closing_date?: true
    status?: true
    headcount?: true
    filled_count?: true
    description?: true
    description_th?: true
    requirements?: true
    benefits?: true
    hiring_manager_id?: true
    hr_recruiter_id?: true
    is_internal?: true
    is_external?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type JobPostingAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which JobPosting to aggregate.
     */
    where?: JobPostingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of JobPostings to fetch.
     */
    orderBy?: JobPostingOrderByWithRelationInput | JobPostingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: JobPostingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` JobPostings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` JobPostings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned JobPostings
    **/
    _count?: true | JobPostingCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: JobPostingAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: JobPostingSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: JobPostingMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: JobPostingMaxAggregateInputType
  }

  export type GetJobPostingAggregateType<T extends JobPostingAggregateArgs> = {
        [P in keyof T & keyof AggregateJobPosting]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateJobPosting[P]>
      : GetScalarType<T[P], AggregateJobPosting[P]>
  }




  export type JobPostingGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: JobPostingWhereInput
    orderBy?: JobPostingOrderByWithAggregationInput | JobPostingOrderByWithAggregationInput[]
    by: JobPostingScalarFieldEnum[] | JobPostingScalarFieldEnum
    having?: JobPostingScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: JobPostingCountAggregateInputType | true
    _avg?: JobPostingAvgAggregateInputType
    _sum?: JobPostingSumAggregateInputType
    _min?: JobPostingMinAggregateInputType
    _max?: JobPostingMaxAggregateInputType
  }

  export type JobPostingGroupByOutputType = {
    id: string
    position_id: string | null
    position_title: string
    position_title_th: string | null
    department: string
    department_th: string | null
    company: string
    location: string | null
    location_th: string | null
    job_family: string | null
    employment_type: string
    salary_range_min: number | null
    salary_range_max: number | null
    currency: string
    posting_date: Date
    closing_date: Date | null
    status: string
    headcount: number
    filled_count: number
    description: string | null
    description_th: string | null
    requirements: string[]
    benefits: string[]
    hiring_manager_id: string | null
    hr_recruiter_id: string | null
    is_internal: boolean
    is_external: boolean
    created_at: Date
    updated_at: Date
    _count: JobPostingCountAggregateOutputType | null
    _avg: JobPostingAvgAggregateOutputType | null
    _sum: JobPostingSumAggregateOutputType | null
    _min: JobPostingMinAggregateOutputType | null
    _max: JobPostingMaxAggregateOutputType | null
  }

  type GetJobPostingGroupByPayload<T extends JobPostingGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<JobPostingGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof JobPostingGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], JobPostingGroupByOutputType[P]>
            : GetScalarType<T[P], JobPostingGroupByOutputType[P]>
        }
      >
    >


  export type JobPostingSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    position_id?: boolean
    position_title?: boolean
    position_title_th?: boolean
    department?: boolean
    department_th?: boolean
    company?: boolean
    location?: boolean
    location_th?: boolean
    job_family?: boolean
    employment_type?: boolean
    salary_range_min?: boolean
    salary_range_max?: boolean
    currency?: boolean
    posting_date?: boolean
    closing_date?: boolean
    status?: boolean
    headcount?: boolean
    filled_count?: boolean
    description?: boolean
    description_th?: boolean
    requirements?: boolean
    benefits?: boolean
    hiring_manager_id?: boolean
    hr_recruiter_id?: boolean
    is_internal?: boolean
    is_external?: boolean
    created_at?: boolean
    updated_at?: boolean
    candidates?: boolean | JobPosting$candidatesArgs<ExtArgs>
    _count?: boolean | JobPostingCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["jobPosting"]>

  export type JobPostingSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    position_id?: boolean
    position_title?: boolean
    position_title_th?: boolean
    department?: boolean
    department_th?: boolean
    company?: boolean
    location?: boolean
    location_th?: boolean
    job_family?: boolean
    employment_type?: boolean
    salary_range_min?: boolean
    salary_range_max?: boolean
    currency?: boolean
    posting_date?: boolean
    closing_date?: boolean
    status?: boolean
    headcount?: boolean
    filled_count?: boolean
    description?: boolean
    description_th?: boolean
    requirements?: boolean
    benefits?: boolean
    hiring_manager_id?: boolean
    hr_recruiter_id?: boolean
    is_internal?: boolean
    is_external?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["jobPosting"]>

  export type JobPostingSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    position_id?: boolean
    position_title?: boolean
    position_title_th?: boolean
    department?: boolean
    department_th?: boolean
    company?: boolean
    location?: boolean
    location_th?: boolean
    job_family?: boolean
    employment_type?: boolean
    salary_range_min?: boolean
    salary_range_max?: boolean
    currency?: boolean
    posting_date?: boolean
    closing_date?: boolean
    status?: boolean
    headcount?: boolean
    filled_count?: boolean
    description?: boolean
    description_th?: boolean
    requirements?: boolean
    benefits?: boolean
    hiring_manager_id?: boolean
    hr_recruiter_id?: boolean
    is_internal?: boolean
    is_external?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["jobPosting"]>

  export type JobPostingSelectScalar = {
    id?: boolean
    position_id?: boolean
    position_title?: boolean
    position_title_th?: boolean
    department?: boolean
    department_th?: boolean
    company?: boolean
    location?: boolean
    location_th?: boolean
    job_family?: boolean
    employment_type?: boolean
    salary_range_min?: boolean
    salary_range_max?: boolean
    currency?: boolean
    posting_date?: boolean
    closing_date?: boolean
    status?: boolean
    headcount?: boolean
    filled_count?: boolean
    description?: boolean
    description_th?: boolean
    requirements?: boolean
    benefits?: boolean
    hiring_manager_id?: boolean
    hr_recruiter_id?: boolean
    is_internal?: boolean
    is_external?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type JobPostingOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "position_id" | "position_title" | "position_title_th" | "department" | "department_th" | "company" | "location" | "location_th" | "job_family" | "employment_type" | "salary_range_min" | "salary_range_max" | "currency" | "posting_date" | "closing_date" | "status" | "headcount" | "filled_count" | "description" | "description_th" | "requirements" | "benefits" | "hiring_manager_id" | "hr_recruiter_id" | "is_internal" | "is_external" | "created_at" | "updated_at", ExtArgs["result"]["jobPosting"]>
  export type JobPostingInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    candidates?: boolean | JobPosting$candidatesArgs<ExtArgs>
    _count?: boolean | JobPostingCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type JobPostingIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type JobPostingIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $JobPostingPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "JobPosting"
    objects: {
      candidates: Prisma.$CandidatePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      position_id: string | null
      position_title: string
      position_title_th: string | null
      department: string
      department_th: string | null
      company: string
      location: string | null
      location_th: string | null
      job_family: string | null
      employment_type: string
      salary_range_min: number | null
      salary_range_max: number | null
      currency: string
      posting_date: Date
      closing_date: Date | null
      status: string
      headcount: number
      filled_count: number
      description: string | null
      description_th: string | null
      requirements: string[]
      benefits: string[]
      hiring_manager_id: string | null
      hr_recruiter_id: string | null
      is_internal: boolean
      is_external: boolean
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["jobPosting"]>
    composites: {}
  }

  type JobPostingGetPayload<S extends boolean | null | undefined | JobPostingDefaultArgs> = $Result.GetResult<Prisma.$JobPostingPayload, S>

  type JobPostingCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<JobPostingFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: JobPostingCountAggregateInputType | true
    }

  export interface JobPostingDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['JobPosting'], meta: { name: 'JobPosting' } }
    /**
     * Find zero or one JobPosting that matches the filter.
     * @param {JobPostingFindUniqueArgs} args - Arguments to find a JobPosting
     * @example
     * // Get one JobPosting
     * const jobPosting = await prisma.jobPosting.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends JobPostingFindUniqueArgs>(args: SelectSubset<T, JobPostingFindUniqueArgs<ExtArgs>>): Prisma__JobPostingClient<$Result.GetResult<Prisma.$JobPostingPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one JobPosting that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {JobPostingFindUniqueOrThrowArgs} args - Arguments to find a JobPosting
     * @example
     * // Get one JobPosting
     * const jobPosting = await prisma.jobPosting.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends JobPostingFindUniqueOrThrowArgs>(args: SelectSubset<T, JobPostingFindUniqueOrThrowArgs<ExtArgs>>): Prisma__JobPostingClient<$Result.GetResult<Prisma.$JobPostingPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first JobPosting that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobPostingFindFirstArgs} args - Arguments to find a JobPosting
     * @example
     * // Get one JobPosting
     * const jobPosting = await prisma.jobPosting.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends JobPostingFindFirstArgs>(args?: SelectSubset<T, JobPostingFindFirstArgs<ExtArgs>>): Prisma__JobPostingClient<$Result.GetResult<Prisma.$JobPostingPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first JobPosting that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobPostingFindFirstOrThrowArgs} args - Arguments to find a JobPosting
     * @example
     * // Get one JobPosting
     * const jobPosting = await prisma.jobPosting.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends JobPostingFindFirstOrThrowArgs>(args?: SelectSubset<T, JobPostingFindFirstOrThrowArgs<ExtArgs>>): Prisma__JobPostingClient<$Result.GetResult<Prisma.$JobPostingPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more JobPostings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobPostingFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all JobPostings
     * const jobPostings = await prisma.jobPosting.findMany()
     * 
     * // Get first 10 JobPostings
     * const jobPostings = await prisma.jobPosting.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const jobPostingWithIdOnly = await prisma.jobPosting.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends JobPostingFindManyArgs>(args?: SelectSubset<T, JobPostingFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$JobPostingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a JobPosting.
     * @param {JobPostingCreateArgs} args - Arguments to create a JobPosting.
     * @example
     * // Create one JobPosting
     * const JobPosting = await prisma.jobPosting.create({
     *   data: {
     *     // ... data to create a JobPosting
     *   }
     * })
     * 
     */
    create<T extends JobPostingCreateArgs>(args: SelectSubset<T, JobPostingCreateArgs<ExtArgs>>): Prisma__JobPostingClient<$Result.GetResult<Prisma.$JobPostingPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many JobPostings.
     * @param {JobPostingCreateManyArgs} args - Arguments to create many JobPostings.
     * @example
     * // Create many JobPostings
     * const jobPosting = await prisma.jobPosting.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends JobPostingCreateManyArgs>(args?: SelectSubset<T, JobPostingCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many JobPostings and returns the data saved in the database.
     * @param {JobPostingCreateManyAndReturnArgs} args - Arguments to create many JobPostings.
     * @example
     * // Create many JobPostings
     * const jobPosting = await prisma.jobPosting.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many JobPostings and only return the `id`
     * const jobPostingWithIdOnly = await prisma.jobPosting.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends JobPostingCreateManyAndReturnArgs>(args?: SelectSubset<T, JobPostingCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$JobPostingPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a JobPosting.
     * @param {JobPostingDeleteArgs} args - Arguments to delete one JobPosting.
     * @example
     * // Delete one JobPosting
     * const JobPosting = await prisma.jobPosting.delete({
     *   where: {
     *     // ... filter to delete one JobPosting
     *   }
     * })
     * 
     */
    delete<T extends JobPostingDeleteArgs>(args: SelectSubset<T, JobPostingDeleteArgs<ExtArgs>>): Prisma__JobPostingClient<$Result.GetResult<Prisma.$JobPostingPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one JobPosting.
     * @param {JobPostingUpdateArgs} args - Arguments to update one JobPosting.
     * @example
     * // Update one JobPosting
     * const jobPosting = await prisma.jobPosting.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends JobPostingUpdateArgs>(args: SelectSubset<T, JobPostingUpdateArgs<ExtArgs>>): Prisma__JobPostingClient<$Result.GetResult<Prisma.$JobPostingPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more JobPostings.
     * @param {JobPostingDeleteManyArgs} args - Arguments to filter JobPostings to delete.
     * @example
     * // Delete a few JobPostings
     * const { count } = await prisma.jobPosting.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends JobPostingDeleteManyArgs>(args?: SelectSubset<T, JobPostingDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more JobPostings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobPostingUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many JobPostings
     * const jobPosting = await prisma.jobPosting.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends JobPostingUpdateManyArgs>(args: SelectSubset<T, JobPostingUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more JobPostings and returns the data updated in the database.
     * @param {JobPostingUpdateManyAndReturnArgs} args - Arguments to update many JobPostings.
     * @example
     * // Update many JobPostings
     * const jobPosting = await prisma.jobPosting.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more JobPostings and only return the `id`
     * const jobPostingWithIdOnly = await prisma.jobPosting.updateManyAndReturn({
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
    updateManyAndReturn<T extends JobPostingUpdateManyAndReturnArgs>(args: SelectSubset<T, JobPostingUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$JobPostingPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one JobPosting.
     * @param {JobPostingUpsertArgs} args - Arguments to update or create a JobPosting.
     * @example
     * // Update or create a JobPosting
     * const jobPosting = await prisma.jobPosting.upsert({
     *   create: {
     *     // ... data to create a JobPosting
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the JobPosting we want to update
     *   }
     * })
     */
    upsert<T extends JobPostingUpsertArgs>(args: SelectSubset<T, JobPostingUpsertArgs<ExtArgs>>): Prisma__JobPostingClient<$Result.GetResult<Prisma.$JobPostingPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of JobPostings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobPostingCountArgs} args - Arguments to filter JobPostings to count.
     * @example
     * // Count the number of JobPostings
     * const count = await prisma.jobPosting.count({
     *   where: {
     *     // ... the filter for the JobPostings we want to count
     *   }
     * })
    **/
    count<T extends JobPostingCountArgs>(
      args?: Subset<T, JobPostingCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], JobPostingCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a JobPosting.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobPostingAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends JobPostingAggregateArgs>(args: Subset<T, JobPostingAggregateArgs>): Prisma.PrismaPromise<GetJobPostingAggregateType<T>>

    /**
     * Group by JobPosting.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobPostingGroupByArgs} args - Group by arguments.
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
      T extends JobPostingGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: JobPostingGroupByArgs['orderBy'] }
        : { orderBy?: JobPostingGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, JobPostingGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetJobPostingGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the JobPosting model
   */
  readonly fields: JobPostingFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for JobPosting.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__JobPostingClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    candidates<T extends JobPosting$candidatesArgs<ExtArgs> = {}>(args?: Subset<T, JobPosting$candidatesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CandidatePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the JobPosting model
   */
  interface JobPostingFieldRefs {
    readonly id: FieldRef<"JobPosting", 'String'>
    readonly position_id: FieldRef<"JobPosting", 'String'>
    readonly position_title: FieldRef<"JobPosting", 'String'>
    readonly position_title_th: FieldRef<"JobPosting", 'String'>
    readonly department: FieldRef<"JobPosting", 'String'>
    readonly department_th: FieldRef<"JobPosting", 'String'>
    readonly company: FieldRef<"JobPosting", 'String'>
    readonly location: FieldRef<"JobPosting", 'String'>
    readonly location_th: FieldRef<"JobPosting", 'String'>
    readonly job_family: FieldRef<"JobPosting", 'String'>
    readonly employment_type: FieldRef<"JobPosting", 'String'>
    readonly salary_range_min: FieldRef<"JobPosting", 'Float'>
    readonly salary_range_max: FieldRef<"JobPosting", 'Float'>
    readonly currency: FieldRef<"JobPosting", 'String'>
    readonly posting_date: FieldRef<"JobPosting", 'DateTime'>
    readonly closing_date: FieldRef<"JobPosting", 'DateTime'>
    readonly status: FieldRef<"JobPosting", 'String'>
    readonly headcount: FieldRef<"JobPosting", 'Int'>
    readonly filled_count: FieldRef<"JobPosting", 'Int'>
    readonly description: FieldRef<"JobPosting", 'String'>
    readonly description_th: FieldRef<"JobPosting", 'String'>
    readonly requirements: FieldRef<"JobPosting", 'String[]'>
    readonly benefits: FieldRef<"JobPosting", 'String[]'>
    readonly hiring_manager_id: FieldRef<"JobPosting", 'String'>
    readonly hr_recruiter_id: FieldRef<"JobPosting", 'String'>
    readonly is_internal: FieldRef<"JobPosting", 'Boolean'>
    readonly is_external: FieldRef<"JobPosting", 'Boolean'>
    readonly created_at: FieldRef<"JobPosting", 'DateTime'>
    readonly updated_at: FieldRef<"JobPosting", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * JobPosting findUnique
   */
  export type JobPostingFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobPosting
     */
    select?: JobPostingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JobPosting
     */
    omit?: JobPostingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobPostingInclude<ExtArgs> | null
    /**
     * Filter, which JobPosting to fetch.
     */
    where: JobPostingWhereUniqueInput
  }

  /**
   * JobPosting findUniqueOrThrow
   */
  export type JobPostingFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobPosting
     */
    select?: JobPostingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JobPosting
     */
    omit?: JobPostingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobPostingInclude<ExtArgs> | null
    /**
     * Filter, which JobPosting to fetch.
     */
    where: JobPostingWhereUniqueInput
  }

  /**
   * JobPosting findFirst
   */
  export type JobPostingFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobPosting
     */
    select?: JobPostingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JobPosting
     */
    omit?: JobPostingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobPostingInclude<ExtArgs> | null
    /**
     * Filter, which JobPosting to fetch.
     */
    where?: JobPostingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of JobPostings to fetch.
     */
    orderBy?: JobPostingOrderByWithRelationInput | JobPostingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for JobPostings.
     */
    cursor?: JobPostingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` JobPostings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` JobPostings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of JobPostings.
     */
    distinct?: JobPostingScalarFieldEnum | JobPostingScalarFieldEnum[]
  }

  /**
   * JobPosting findFirstOrThrow
   */
  export type JobPostingFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobPosting
     */
    select?: JobPostingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JobPosting
     */
    omit?: JobPostingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobPostingInclude<ExtArgs> | null
    /**
     * Filter, which JobPosting to fetch.
     */
    where?: JobPostingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of JobPostings to fetch.
     */
    orderBy?: JobPostingOrderByWithRelationInput | JobPostingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for JobPostings.
     */
    cursor?: JobPostingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` JobPostings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` JobPostings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of JobPostings.
     */
    distinct?: JobPostingScalarFieldEnum | JobPostingScalarFieldEnum[]
  }

  /**
   * JobPosting findMany
   */
  export type JobPostingFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobPosting
     */
    select?: JobPostingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JobPosting
     */
    omit?: JobPostingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobPostingInclude<ExtArgs> | null
    /**
     * Filter, which JobPostings to fetch.
     */
    where?: JobPostingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of JobPostings to fetch.
     */
    orderBy?: JobPostingOrderByWithRelationInput | JobPostingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing JobPostings.
     */
    cursor?: JobPostingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` JobPostings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` JobPostings.
     */
    skip?: number
    distinct?: JobPostingScalarFieldEnum | JobPostingScalarFieldEnum[]
  }

  /**
   * JobPosting create
   */
  export type JobPostingCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobPosting
     */
    select?: JobPostingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JobPosting
     */
    omit?: JobPostingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobPostingInclude<ExtArgs> | null
    /**
     * The data needed to create a JobPosting.
     */
    data: XOR<JobPostingCreateInput, JobPostingUncheckedCreateInput>
  }

  /**
   * JobPosting createMany
   */
  export type JobPostingCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many JobPostings.
     */
    data: JobPostingCreateManyInput | JobPostingCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * JobPosting createManyAndReturn
   */
  export type JobPostingCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobPosting
     */
    select?: JobPostingSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the JobPosting
     */
    omit?: JobPostingOmit<ExtArgs> | null
    /**
     * The data used to create many JobPostings.
     */
    data: JobPostingCreateManyInput | JobPostingCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * JobPosting update
   */
  export type JobPostingUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobPosting
     */
    select?: JobPostingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JobPosting
     */
    omit?: JobPostingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobPostingInclude<ExtArgs> | null
    /**
     * The data needed to update a JobPosting.
     */
    data: XOR<JobPostingUpdateInput, JobPostingUncheckedUpdateInput>
    /**
     * Choose, which JobPosting to update.
     */
    where: JobPostingWhereUniqueInput
  }

  /**
   * JobPosting updateMany
   */
  export type JobPostingUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update JobPostings.
     */
    data: XOR<JobPostingUpdateManyMutationInput, JobPostingUncheckedUpdateManyInput>
    /**
     * Filter which JobPostings to update
     */
    where?: JobPostingWhereInput
    /**
     * Limit how many JobPostings to update.
     */
    limit?: number
  }

  /**
   * JobPosting updateManyAndReturn
   */
  export type JobPostingUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobPosting
     */
    select?: JobPostingSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the JobPosting
     */
    omit?: JobPostingOmit<ExtArgs> | null
    /**
     * The data used to update JobPostings.
     */
    data: XOR<JobPostingUpdateManyMutationInput, JobPostingUncheckedUpdateManyInput>
    /**
     * Filter which JobPostings to update
     */
    where?: JobPostingWhereInput
    /**
     * Limit how many JobPostings to update.
     */
    limit?: number
  }

  /**
   * JobPosting upsert
   */
  export type JobPostingUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobPosting
     */
    select?: JobPostingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JobPosting
     */
    omit?: JobPostingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobPostingInclude<ExtArgs> | null
    /**
     * The filter to search for the JobPosting to update in case it exists.
     */
    where: JobPostingWhereUniqueInput
    /**
     * In case the JobPosting found by the `where` argument doesn't exist, create a new JobPosting with this data.
     */
    create: XOR<JobPostingCreateInput, JobPostingUncheckedCreateInput>
    /**
     * In case the JobPosting was found with the provided `where` argument, update it with this data.
     */
    update: XOR<JobPostingUpdateInput, JobPostingUncheckedUpdateInput>
  }

  /**
   * JobPosting delete
   */
  export type JobPostingDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobPosting
     */
    select?: JobPostingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JobPosting
     */
    omit?: JobPostingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobPostingInclude<ExtArgs> | null
    /**
     * Filter which JobPosting to delete.
     */
    where: JobPostingWhereUniqueInput
  }

  /**
   * JobPosting deleteMany
   */
  export type JobPostingDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which JobPostings to delete
     */
    where?: JobPostingWhereInput
    /**
     * Limit how many JobPostings to delete.
     */
    limit?: number
  }

  /**
   * JobPosting.candidates
   */
  export type JobPosting$candidatesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Candidate
     */
    select?: CandidateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Candidate
     */
    omit?: CandidateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CandidateInclude<ExtArgs> | null
    where?: CandidateWhereInput
    orderBy?: CandidateOrderByWithRelationInput | CandidateOrderByWithRelationInput[]
    cursor?: CandidateWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CandidateScalarFieldEnum | CandidateScalarFieldEnum[]
  }

  /**
   * JobPosting without action
   */
  export type JobPostingDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobPosting
     */
    select?: JobPostingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JobPosting
     */
    omit?: JobPostingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobPostingInclude<ExtArgs> | null
  }


  /**
   * Model Candidate
   */

  export type AggregateCandidate = {
    _count: CandidateCountAggregateOutputType | null
    _min: CandidateMinAggregateOutputType | null
    _max: CandidateMaxAggregateOutputType | null
  }

  export type CandidateMinAggregateOutputType = {
    id: string | null
    job_posting_id: string | null
    first_name: string | null
    last_name: string | null
    email: string | null
    phone: string | null
    resume_url: string | null
    source: string | null
    status: string | null
    current_stage: string | null
    applied_date: Date | null
    notes: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type CandidateMaxAggregateOutputType = {
    id: string | null
    job_posting_id: string | null
    first_name: string | null
    last_name: string | null
    email: string | null
    phone: string | null
    resume_url: string | null
    source: string | null
    status: string | null
    current_stage: string | null
    applied_date: Date | null
    notes: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type CandidateCountAggregateOutputType = {
    id: number
    job_posting_id: number
    first_name: number
    last_name: number
    email: number
    phone: number
    resume_url: number
    source: number
    status: number
    current_stage: number
    applied_date: number
    notes: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type CandidateMinAggregateInputType = {
    id?: true
    job_posting_id?: true
    first_name?: true
    last_name?: true
    email?: true
    phone?: true
    resume_url?: true
    source?: true
    status?: true
    current_stage?: true
    applied_date?: true
    notes?: true
    created_at?: true
    updated_at?: true
  }

  export type CandidateMaxAggregateInputType = {
    id?: true
    job_posting_id?: true
    first_name?: true
    last_name?: true
    email?: true
    phone?: true
    resume_url?: true
    source?: true
    status?: true
    current_stage?: true
    applied_date?: true
    notes?: true
    created_at?: true
    updated_at?: true
  }

  export type CandidateCountAggregateInputType = {
    id?: true
    job_posting_id?: true
    first_name?: true
    last_name?: true
    email?: true
    phone?: true
    resume_url?: true
    source?: true
    status?: true
    current_stage?: true
    applied_date?: true
    notes?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type CandidateAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Candidate to aggregate.
     */
    where?: CandidateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Candidates to fetch.
     */
    orderBy?: CandidateOrderByWithRelationInput | CandidateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CandidateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Candidates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Candidates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Candidates
    **/
    _count?: true | CandidateCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CandidateMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CandidateMaxAggregateInputType
  }

  export type GetCandidateAggregateType<T extends CandidateAggregateArgs> = {
        [P in keyof T & keyof AggregateCandidate]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCandidate[P]>
      : GetScalarType<T[P], AggregateCandidate[P]>
  }




  export type CandidateGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CandidateWhereInput
    orderBy?: CandidateOrderByWithAggregationInput | CandidateOrderByWithAggregationInput[]
    by: CandidateScalarFieldEnum[] | CandidateScalarFieldEnum
    having?: CandidateScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CandidateCountAggregateInputType | true
    _min?: CandidateMinAggregateInputType
    _max?: CandidateMaxAggregateInputType
  }

  export type CandidateGroupByOutputType = {
    id: string
    job_posting_id: string
    first_name: string
    last_name: string
    email: string
    phone: string | null
    resume_url: string | null
    source: string | null
    status: string
    current_stage: string
    applied_date: Date
    notes: string | null
    created_at: Date
    updated_at: Date
    _count: CandidateCountAggregateOutputType | null
    _min: CandidateMinAggregateOutputType | null
    _max: CandidateMaxAggregateOutputType | null
  }

  type GetCandidateGroupByPayload<T extends CandidateGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CandidateGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CandidateGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CandidateGroupByOutputType[P]>
            : GetScalarType<T[P], CandidateGroupByOutputType[P]>
        }
      >
    >


  export type CandidateSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    job_posting_id?: boolean
    first_name?: boolean
    last_name?: boolean
    email?: boolean
    phone?: boolean
    resume_url?: boolean
    source?: boolean
    status?: boolean
    current_stage?: boolean
    applied_date?: boolean
    notes?: boolean
    created_at?: boolean
    updated_at?: boolean
    job_posting?: boolean | JobPostingDefaultArgs<ExtArgs>
    screenings?: boolean | Candidate$screeningsArgs<ExtArgs>
    _count?: boolean | CandidateCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["candidate"]>

  export type CandidateSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    job_posting_id?: boolean
    first_name?: boolean
    last_name?: boolean
    email?: boolean
    phone?: boolean
    resume_url?: boolean
    source?: boolean
    status?: boolean
    current_stage?: boolean
    applied_date?: boolean
    notes?: boolean
    created_at?: boolean
    updated_at?: boolean
    job_posting?: boolean | JobPostingDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["candidate"]>

  export type CandidateSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    job_posting_id?: boolean
    first_name?: boolean
    last_name?: boolean
    email?: boolean
    phone?: boolean
    resume_url?: boolean
    source?: boolean
    status?: boolean
    current_stage?: boolean
    applied_date?: boolean
    notes?: boolean
    created_at?: boolean
    updated_at?: boolean
    job_posting?: boolean | JobPostingDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["candidate"]>

  export type CandidateSelectScalar = {
    id?: boolean
    job_posting_id?: boolean
    first_name?: boolean
    last_name?: boolean
    email?: boolean
    phone?: boolean
    resume_url?: boolean
    source?: boolean
    status?: boolean
    current_stage?: boolean
    applied_date?: boolean
    notes?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type CandidateOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "job_posting_id" | "first_name" | "last_name" | "email" | "phone" | "resume_url" | "source" | "status" | "current_stage" | "applied_date" | "notes" | "created_at" | "updated_at", ExtArgs["result"]["candidate"]>
  export type CandidateInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    job_posting?: boolean | JobPostingDefaultArgs<ExtArgs>
    screenings?: boolean | Candidate$screeningsArgs<ExtArgs>
    _count?: boolean | CandidateCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type CandidateIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    job_posting?: boolean | JobPostingDefaultArgs<ExtArgs>
  }
  export type CandidateIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    job_posting?: boolean | JobPostingDefaultArgs<ExtArgs>
  }

  export type $CandidatePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Candidate"
    objects: {
      job_posting: Prisma.$JobPostingPayload<ExtArgs>
      screenings: Prisma.$ScreeningPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      job_posting_id: string
      first_name: string
      last_name: string
      email: string
      phone: string | null
      resume_url: string | null
      source: string | null
      status: string
      current_stage: string
      applied_date: Date
      notes: string | null
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["candidate"]>
    composites: {}
  }

  type CandidateGetPayload<S extends boolean | null | undefined | CandidateDefaultArgs> = $Result.GetResult<Prisma.$CandidatePayload, S>

  type CandidateCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CandidateFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CandidateCountAggregateInputType | true
    }

  export interface CandidateDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Candidate'], meta: { name: 'Candidate' } }
    /**
     * Find zero or one Candidate that matches the filter.
     * @param {CandidateFindUniqueArgs} args - Arguments to find a Candidate
     * @example
     * // Get one Candidate
     * const candidate = await prisma.candidate.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CandidateFindUniqueArgs>(args: SelectSubset<T, CandidateFindUniqueArgs<ExtArgs>>): Prisma__CandidateClient<$Result.GetResult<Prisma.$CandidatePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Candidate that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CandidateFindUniqueOrThrowArgs} args - Arguments to find a Candidate
     * @example
     * // Get one Candidate
     * const candidate = await prisma.candidate.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CandidateFindUniqueOrThrowArgs>(args: SelectSubset<T, CandidateFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CandidateClient<$Result.GetResult<Prisma.$CandidatePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Candidate that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CandidateFindFirstArgs} args - Arguments to find a Candidate
     * @example
     * // Get one Candidate
     * const candidate = await prisma.candidate.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CandidateFindFirstArgs>(args?: SelectSubset<T, CandidateFindFirstArgs<ExtArgs>>): Prisma__CandidateClient<$Result.GetResult<Prisma.$CandidatePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Candidate that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CandidateFindFirstOrThrowArgs} args - Arguments to find a Candidate
     * @example
     * // Get one Candidate
     * const candidate = await prisma.candidate.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CandidateFindFirstOrThrowArgs>(args?: SelectSubset<T, CandidateFindFirstOrThrowArgs<ExtArgs>>): Prisma__CandidateClient<$Result.GetResult<Prisma.$CandidatePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Candidates that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CandidateFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Candidates
     * const candidates = await prisma.candidate.findMany()
     * 
     * // Get first 10 Candidates
     * const candidates = await prisma.candidate.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const candidateWithIdOnly = await prisma.candidate.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CandidateFindManyArgs>(args?: SelectSubset<T, CandidateFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CandidatePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Candidate.
     * @param {CandidateCreateArgs} args - Arguments to create a Candidate.
     * @example
     * // Create one Candidate
     * const Candidate = await prisma.candidate.create({
     *   data: {
     *     // ... data to create a Candidate
     *   }
     * })
     * 
     */
    create<T extends CandidateCreateArgs>(args: SelectSubset<T, CandidateCreateArgs<ExtArgs>>): Prisma__CandidateClient<$Result.GetResult<Prisma.$CandidatePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Candidates.
     * @param {CandidateCreateManyArgs} args - Arguments to create many Candidates.
     * @example
     * // Create many Candidates
     * const candidate = await prisma.candidate.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CandidateCreateManyArgs>(args?: SelectSubset<T, CandidateCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Candidates and returns the data saved in the database.
     * @param {CandidateCreateManyAndReturnArgs} args - Arguments to create many Candidates.
     * @example
     * // Create many Candidates
     * const candidate = await prisma.candidate.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Candidates and only return the `id`
     * const candidateWithIdOnly = await prisma.candidate.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CandidateCreateManyAndReturnArgs>(args?: SelectSubset<T, CandidateCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CandidatePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Candidate.
     * @param {CandidateDeleteArgs} args - Arguments to delete one Candidate.
     * @example
     * // Delete one Candidate
     * const Candidate = await prisma.candidate.delete({
     *   where: {
     *     // ... filter to delete one Candidate
     *   }
     * })
     * 
     */
    delete<T extends CandidateDeleteArgs>(args: SelectSubset<T, CandidateDeleteArgs<ExtArgs>>): Prisma__CandidateClient<$Result.GetResult<Prisma.$CandidatePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Candidate.
     * @param {CandidateUpdateArgs} args - Arguments to update one Candidate.
     * @example
     * // Update one Candidate
     * const candidate = await prisma.candidate.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CandidateUpdateArgs>(args: SelectSubset<T, CandidateUpdateArgs<ExtArgs>>): Prisma__CandidateClient<$Result.GetResult<Prisma.$CandidatePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Candidates.
     * @param {CandidateDeleteManyArgs} args - Arguments to filter Candidates to delete.
     * @example
     * // Delete a few Candidates
     * const { count } = await prisma.candidate.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CandidateDeleteManyArgs>(args?: SelectSubset<T, CandidateDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Candidates.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CandidateUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Candidates
     * const candidate = await prisma.candidate.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CandidateUpdateManyArgs>(args: SelectSubset<T, CandidateUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Candidates and returns the data updated in the database.
     * @param {CandidateUpdateManyAndReturnArgs} args - Arguments to update many Candidates.
     * @example
     * // Update many Candidates
     * const candidate = await prisma.candidate.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Candidates and only return the `id`
     * const candidateWithIdOnly = await prisma.candidate.updateManyAndReturn({
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
    updateManyAndReturn<T extends CandidateUpdateManyAndReturnArgs>(args: SelectSubset<T, CandidateUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CandidatePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Candidate.
     * @param {CandidateUpsertArgs} args - Arguments to update or create a Candidate.
     * @example
     * // Update or create a Candidate
     * const candidate = await prisma.candidate.upsert({
     *   create: {
     *     // ... data to create a Candidate
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Candidate we want to update
     *   }
     * })
     */
    upsert<T extends CandidateUpsertArgs>(args: SelectSubset<T, CandidateUpsertArgs<ExtArgs>>): Prisma__CandidateClient<$Result.GetResult<Prisma.$CandidatePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Candidates.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CandidateCountArgs} args - Arguments to filter Candidates to count.
     * @example
     * // Count the number of Candidates
     * const count = await prisma.candidate.count({
     *   where: {
     *     // ... the filter for the Candidates we want to count
     *   }
     * })
    **/
    count<T extends CandidateCountArgs>(
      args?: Subset<T, CandidateCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CandidateCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Candidate.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CandidateAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends CandidateAggregateArgs>(args: Subset<T, CandidateAggregateArgs>): Prisma.PrismaPromise<GetCandidateAggregateType<T>>

    /**
     * Group by Candidate.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CandidateGroupByArgs} args - Group by arguments.
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
      T extends CandidateGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CandidateGroupByArgs['orderBy'] }
        : { orderBy?: CandidateGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, CandidateGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCandidateGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Candidate model
   */
  readonly fields: CandidateFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Candidate.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CandidateClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    job_posting<T extends JobPostingDefaultArgs<ExtArgs> = {}>(args?: Subset<T, JobPostingDefaultArgs<ExtArgs>>): Prisma__JobPostingClient<$Result.GetResult<Prisma.$JobPostingPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    screenings<T extends Candidate$screeningsArgs<ExtArgs> = {}>(args?: Subset<T, Candidate$screeningsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ScreeningPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Candidate model
   */
  interface CandidateFieldRefs {
    readonly id: FieldRef<"Candidate", 'String'>
    readonly job_posting_id: FieldRef<"Candidate", 'String'>
    readonly first_name: FieldRef<"Candidate", 'String'>
    readonly last_name: FieldRef<"Candidate", 'String'>
    readonly email: FieldRef<"Candidate", 'String'>
    readonly phone: FieldRef<"Candidate", 'String'>
    readonly resume_url: FieldRef<"Candidate", 'String'>
    readonly source: FieldRef<"Candidate", 'String'>
    readonly status: FieldRef<"Candidate", 'String'>
    readonly current_stage: FieldRef<"Candidate", 'String'>
    readonly applied_date: FieldRef<"Candidate", 'DateTime'>
    readonly notes: FieldRef<"Candidate", 'String'>
    readonly created_at: FieldRef<"Candidate", 'DateTime'>
    readonly updated_at: FieldRef<"Candidate", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Candidate findUnique
   */
  export type CandidateFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Candidate
     */
    select?: CandidateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Candidate
     */
    omit?: CandidateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CandidateInclude<ExtArgs> | null
    /**
     * Filter, which Candidate to fetch.
     */
    where: CandidateWhereUniqueInput
  }

  /**
   * Candidate findUniqueOrThrow
   */
  export type CandidateFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Candidate
     */
    select?: CandidateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Candidate
     */
    omit?: CandidateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CandidateInclude<ExtArgs> | null
    /**
     * Filter, which Candidate to fetch.
     */
    where: CandidateWhereUniqueInput
  }

  /**
   * Candidate findFirst
   */
  export type CandidateFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Candidate
     */
    select?: CandidateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Candidate
     */
    omit?: CandidateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CandidateInclude<ExtArgs> | null
    /**
     * Filter, which Candidate to fetch.
     */
    where?: CandidateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Candidates to fetch.
     */
    orderBy?: CandidateOrderByWithRelationInput | CandidateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Candidates.
     */
    cursor?: CandidateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Candidates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Candidates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Candidates.
     */
    distinct?: CandidateScalarFieldEnum | CandidateScalarFieldEnum[]
  }

  /**
   * Candidate findFirstOrThrow
   */
  export type CandidateFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Candidate
     */
    select?: CandidateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Candidate
     */
    omit?: CandidateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CandidateInclude<ExtArgs> | null
    /**
     * Filter, which Candidate to fetch.
     */
    where?: CandidateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Candidates to fetch.
     */
    orderBy?: CandidateOrderByWithRelationInput | CandidateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Candidates.
     */
    cursor?: CandidateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Candidates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Candidates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Candidates.
     */
    distinct?: CandidateScalarFieldEnum | CandidateScalarFieldEnum[]
  }

  /**
   * Candidate findMany
   */
  export type CandidateFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Candidate
     */
    select?: CandidateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Candidate
     */
    omit?: CandidateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CandidateInclude<ExtArgs> | null
    /**
     * Filter, which Candidates to fetch.
     */
    where?: CandidateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Candidates to fetch.
     */
    orderBy?: CandidateOrderByWithRelationInput | CandidateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Candidates.
     */
    cursor?: CandidateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Candidates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Candidates.
     */
    skip?: number
    distinct?: CandidateScalarFieldEnum | CandidateScalarFieldEnum[]
  }

  /**
   * Candidate create
   */
  export type CandidateCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Candidate
     */
    select?: CandidateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Candidate
     */
    omit?: CandidateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CandidateInclude<ExtArgs> | null
    /**
     * The data needed to create a Candidate.
     */
    data: XOR<CandidateCreateInput, CandidateUncheckedCreateInput>
  }

  /**
   * Candidate createMany
   */
  export type CandidateCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Candidates.
     */
    data: CandidateCreateManyInput | CandidateCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Candidate createManyAndReturn
   */
  export type CandidateCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Candidate
     */
    select?: CandidateSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Candidate
     */
    omit?: CandidateOmit<ExtArgs> | null
    /**
     * The data used to create many Candidates.
     */
    data: CandidateCreateManyInput | CandidateCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CandidateIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Candidate update
   */
  export type CandidateUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Candidate
     */
    select?: CandidateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Candidate
     */
    omit?: CandidateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CandidateInclude<ExtArgs> | null
    /**
     * The data needed to update a Candidate.
     */
    data: XOR<CandidateUpdateInput, CandidateUncheckedUpdateInput>
    /**
     * Choose, which Candidate to update.
     */
    where: CandidateWhereUniqueInput
  }

  /**
   * Candidate updateMany
   */
  export type CandidateUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Candidates.
     */
    data: XOR<CandidateUpdateManyMutationInput, CandidateUncheckedUpdateManyInput>
    /**
     * Filter which Candidates to update
     */
    where?: CandidateWhereInput
    /**
     * Limit how many Candidates to update.
     */
    limit?: number
  }

  /**
   * Candidate updateManyAndReturn
   */
  export type CandidateUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Candidate
     */
    select?: CandidateSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Candidate
     */
    omit?: CandidateOmit<ExtArgs> | null
    /**
     * The data used to update Candidates.
     */
    data: XOR<CandidateUpdateManyMutationInput, CandidateUncheckedUpdateManyInput>
    /**
     * Filter which Candidates to update
     */
    where?: CandidateWhereInput
    /**
     * Limit how many Candidates to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CandidateIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Candidate upsert
   */
  export type CandidateUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Candidate
     */
    select?: CandidateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Candidate
     */
    omit?: CandidateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CandidateInclude<ExtArgs> | null
    /**
     * The filter to search for the Candidate to update in case it exists.
     */
    where: CandidateWhereUniqueInput
    /**
     * In case the Candidate found by the `where` argument doesn't exist, create a new Candidate with this data.
     */
    create: XOR<CandidateCreateInput, CandidateUncheckedCreateInput>
    /**
     * In case the Candidate was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CandidateUpdateInput, CandidateUncheckedUpdateInput>
  }

  /**
   * Candidate delete
   */
  export type CandidateDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Candidate
     */
    select?: CandidateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Candidate
     */
    omit?: CandidateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CandidateInclude<ExtArgs> | null
    /**
     * Filter which Candidate to delete.
     */
    where: CandidateWhereUniqueInput
  }

  /**
   * Candidate deleteMany
   */
  export type CandidateDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Candidates to delete
     */
    where?: CandidateWhereInput
    /**
     * Limit how many Candidates to delete.
     */
    limit?: number
  }

  /**
   * Candidate.screenings
   */
  export type Candidate$screeningsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Screening
     */
    select?: ScreeningSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Screening
     */
    omit?: ScreeningOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScreeningInclude<ExtArgs> | null
    where?: ScreeningWhereInput
    orderBy?: ScreeningOrderByWithRelationInput | ScreeningOrderByWithRelationInput[]
    cursor?: ScreeningWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ScreeningScalarFieldEnum | ScreeningScalarFieldEnum[]
  }

  /**
   * Candidate without action
   */
  export type CandidateDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Candidate
     */
    select?: CandidateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Candidate
     */
    omit?: CandidateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CandidateInclude<ExtArgs> | null
  }


  /**
   * Model Screening
   */

  export type AggregateScreening = {
    _count: ScreeningCountAggregateOutputType | null
    _avg: ScreeningAvgAggregateOutputType | null
    _sum: ScreeningSumAggregateOutputType | null
    _min: ScreeningMinAggregateOutputType | null
    _max: ScreeningMaxAggregateOutputType | null
  }

  export type ScreeningAvgAggregateOutputType = {
    score: number | null
  }

  export type ScreeningSumAggregateOutputType = {
    score: number | null
  }

  export type ScreeningMinAggregateOutputType = {
    id: string | null
    candidate_id: string | null
    stage: string | null
    status: string | null
    scheduled_date: Date | null
    completed_date: Date | null
    interviewer_id: string | null
    score: number | null
    feedback: string | null
    recommendation: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type ScreeningMaxAggregateOutputType = {
    id: string | null
    candidate_id: string | null
    stage: string | null
    status: string | null
    scheduled_date: Date | null
    completed_date: Date | null
    interviewer_id: string | null
    score: number | null
    feedback: string | null
    recommendation: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type ScreeningCountAggregateOutputType = {
    id: number
    candidate_id: number
    stage: number
    status: number
    scheduled_date: number
    completed_date: number
    interviewer_id: number
    score: number
    feedback: number
    recommendation: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type ScreeningAvgAggregateInputType = {
    score?: true
  }

  export type ScreeningSumAggregateInputType = {
    score?: true
  }

  export type ScreeningMinAggregateInputType = {
    id?: true
    candidate_id?: true
    stage?: true
    status?: true
    scheduled_date?: true
    completed_date?: true
    interviewer_id?: true
    score?: true
    feedback?: true
    recommendation?: true
    created_at?: true
    updated_at?: true
  }

  export type ScreeningMaxAggregateInputType = {
    id?: true
    candidate_id?: true
    stage?: true
    status?: true
    scheduled_date?: true
    completed_date?: true
    interviewer_id?: true
    score?: true
    feedback?: true
    recommendation?: true
    created_at?: true
    updated_at?: true
  }

  export type ScreeningCountAggregateInputType = {
    id?: true
    candidate_id?: true
    stage?: true
    status?: true
    scheduled_date?: true
    completed_date?: true
    interviewer_id?: true
    score?: true
    feedback?: true
    recommendation?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type ScreeningAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Screening to aggregate.
     */
    where?: ScreeningWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Screenings to fetch.
     */
    orderBy?: ScreeningOrderByWithRelationInput | ScreeningOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ScreeningWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Screenings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Screenings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Screenings
    **/
    _count?: true | ScreeningCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ScreeningAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ScreeningSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ScreeningMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ScreeningMaxAggregateInputType
  }

  export type GetScreeningAggregateType<T extends ScreeningAggregateArgs> = {
        [P in keyof T & keyof AggregateScreening]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateScreening[P]>
      : GetScalarType<T[P], AggregateScreening[P]>
  }




  export type ScreeningGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ScreeningWhereInput
    orderBy?: ScreeningOrderByWithAggregationInput | ScreeningOrderByWithAggregationInput[]
    by: ScreeningScalarFieldEnum[] | ScreeningScalarFieldEnum
    having?: ScreeningScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ScreeningCountAggregateInputType | true
    _avg?: ScreeningAvgAggregateInputType
    _sum?: ScreeningSumAggregateInputType
    _min?: ScreeningMinAggregateInputType
    _max?: ScreeningMaxAggregateInputType
  }

  export type ScreeningGroupByOutputType = {
    id: string
    candidate_id: string
    stage: string
    status: string
    scheduled_date: Date | null
    completed_date: Date | null
    interviewer_id: string | null
    score: number | null
    feedback: string | null
    recommendation: string | null
    created_at: Date
    updated_at: Date
    _count: ScreeningCountAggregateOutputType | null
    _avg: ScreeningAvgAggregateOutputType | null
    _sum: ScreeningSumAggregateOutputType | null
    _min: ScreeningMinAggregateOutputType | null
    _max: ScreeningMaxAggregateOutputType | null
  }

  type GetScreeningGroupByPayload<T extends ScreeningGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ScreeningGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ScreeningGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ScreeningGroupByOutputType[P]>
            : GetScalarType<T[P], ScreeningGroupByOutputType[P]>
        }
      >
    >


  export type ScreeningSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    candidate_id?: boolean
    stage?: boolean
    status?: boolean
    scheduled_date?: boolean
    completed_date?: boolean
    interviewer_id?: boolean
    score?: boolean
    feedback?: boolean
    recommendation?: boolean
    created_at?: boolean
    updated_at?: boolean
    candidate?: boolean | CandidateDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["screening"]>

  export type ScreeningSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    candidate_id?: boolean
    stage?: boolean
    status?: boolean
    scheduled_date?: boolean
    completed_date?: boolean
    interviewer_id?: boolean
    score?: boolean
    feedback?: boolean
    recommendation?: boolean
    created_at?: boolean
    updated_at?: boolean
    candidate?: boolean | CandidateDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["screening"]>

  export type ScreeningSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    candidate_id?: boolean
    stage?: boolean
    status?: boolean
    scheduled_date?: boolean
    completed_date?: boolean
    interviewer_id?: boolean
    score?: boolean
    feedback?: boolean
    recommendation?: boolean
    created_at?: boolean
    updated_at?: boolean
    candidate?: boolean | CandidateDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["screening"]>

  export type ScreeningSelectScalar = {
    id?: boolean
    candidate_id?: boolean
    stage?: boolean
    status?: boolean
    scheduled_date?: boolean
    completed_date?: boolean
    interviewer_id?: boolean
    score?: boolean
    feedback?: boolean
    recommendation?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type ScreeningOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "candidate_id" | "stage" | "status" | "scheduled_date" | "completed_date" | "interviewer_id" | "score" | "feedback" | "recommendation" | "created_at" | "updated_at", ExtArgs["result"]["screening"]>
  export type ScreeningInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    candidate?: boolean | CandidateDefaultArgs<ExtArgs>
  }
  export type ScreeningIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    candidate?: boolean | CandidateDefaultArgs<ExtArgs>
  }
  export type ScreeningIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    candidate?: boolean | CandidateDefaultArgs<ExtArgs>
  }

  export type $ScreeningPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Screening"
    objects: {
      candidate: Prisma.$CandidatePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      candidate_id: string
      stage: string
      status: string
      scheduled_date: Date | null
      completed_date: Date | null
      interviewer_id: string | null
      score: number | null
      feedback: string | null
      recommendation: string | null
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["screening"]>
    composites: {}
  }

  type ScreeningGetPayload<S extends boolean | null | undefined | ScreeningDefaultArgs> = $Result.GetResult<Prisma.$ScreeningPayload, S>

  type ScreeningCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ScreeningFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ScreeningCountAggregateInputType | true
    }

  export interface ScreeningDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Screening'], meta: { name: 'Screening' } }
    /**
     * Find zero or one Screening that matches the filter.
     * @param {ScreeningFindUniqueArgs} args - Arguments to find a Screening
     * @example
     * // Get one Screening
     * const screening = await prisma.screening.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ScreeningFindUniqueArgs>(args: SelectSubset<T, ScreeningFindUniqueArgs<ExtArgs>>): Prisma__ScreeningClient<$Result.GetResult<Prisma.$ScreeningPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Screening that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ScreeningFindUniqueOrThrowArgs} args - Arguments to find a Screening
     * @example
     * // Get one Screening
     * const screening = await prisma.screening.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ScreeningFindUniqueOrThrowArgs>(args: SelectSubset<T, ScreeningFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ScreeningClient<$Result.GetResult<Prisma.$ScreeningPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Screening that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScreeningFindFirstArgs} args - Arguments to find a Screening
     * @example
     * // Get one Screening
     * const screening = await prisma.screening.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ScreeningFindFirstArgs>(args?: SelectSubset<T, ScreeningFindFirstArgs<ExtArgs>>): Prisma__ScreeningClient<$Result.GetResult<Prisma.$ScreeningPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Screening that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScreeningFindFirstOrThrowArgs} args - Arguments to find a Screening
     * @example
     * // Get one Screening
     * const screening = await prisma.screening.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ScreeningFindFirstOrThrowArgs>(args?: SelectSubset<T, ScreeningFindFirstOrThrowArgs<ExtArgs>>): Prisma__ScreeningClient<$Result.GetResult<Prisma.$ScreeningPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Screenings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScreeningFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Screenings
     * const screenings = await prisma.screening.findMany()
     * 
     * // Get first 10 Screenings
     * const screenings = await prisma.screening.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const screeningWithIdOnly = await prisma.screening.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ScreeningFindManyArgs>(args?: SelectSubset<T, ScreeningFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ScreeningPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Screening.
     * @param {ScreeningCreateArgs} args - Arguments to create a Screening.
     * @example
     * // Create one Screening
     * const Screening = await prisma.screening.create({
     *   data: {
     *     // ... data to create a Screening
     *   }
     * })
     * 
     */
    create<T extends ScreeningCreateArgs>(args: SelectSubset<T, ScreeningCreateArgs<ExtArgs>>): Prisma__ScreeningClient<$Result.GetResult<Prisma.$ScreeningPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Screenings.
     * @param {ScreeningCreateManyArgs} args - Arguments to create many Screenings.
     * @example
     * // Create many Screenings
     * const screening = await prisma.screening.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ScreeningCreateManyArgs>(args?: SelectSubset<T, ScreeningCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Screenings and returns the data saved in the database.
     * @param {ScreeningCreateManyAndReturnArgs} args - Arguments to create many Screenings.
     * @example
     * // Create many Screenings
     * const screening = await prisma.screening.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Screenings and only return the `id`
     * const screeningWithIdOnly = await prisma.screening.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ScreeningCreateManyAndReturnArgs>(args?: SelectSubset<T, ScreeningCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ScreeningPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Screening.
     * @param {ScreeningDeleteArgs} args - Arguments to delete one Screening.
     * @example
     * // Delete one Screening
     * const Screening = await prisma.screening.delete({
     *   where: {
     *     // ... filter to delete one Screening
     *   }
     * })
     * 
     */
    delete<T extends ScreeningDeleteArgs>(args: SelectSubset<T, ScreeningDeleteArgs<ExtArgs>>): Prisma__ScreeningClient<$Result.GetResult<Prisma.$ScreeningPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Screening.
     * @param {ScreeningUpdateArgs} args - Arguments to update one Screening.
     * @example
     * // Update one Screening
     * const screening = await prisma.screening.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ScreeningUpdateArgs>(args: SelectSubset<T, ScreeningUpdateArgs<ExtArgs>>): Prisma__ScreeningClient<$Result.GetResult<Prisma.$ScreeningPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Screenings.
     * @param {ScreeningDeleteManyArgs} args - Arguments to filter Screenings to delete.
     * @example
     * // Delete a few Screenings
     * const { count } = await prisma.screening.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ScreeningDeleteManyArgs>(args?: SelectSubset<T, ScreeningDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Screenings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScreeningUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Screenings
     * const screening = await prisma.screening.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ScreeningUpdateManyArgs>(args: SelectSubset<T, ScreeningUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Screenings and returns the data updated in the database.
     * @param {ScreeningUpdateManyAndReturnArgs} args - Arguments to update many Screenings.
     * @example
     * // Update many Screenings
     * const screening = await prisma.screening.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Screenings and only return the `id`
     * const screeningWithIdOnly = await prisma.screening.updateManyAndReturn({
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
    updateManyAndReturn<T extends ScreeningUpdateManyAndReturnArgs>(args: SelectSubset<T, ScreeningUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ScreeningPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Screening.
     * @param {ScreeningUpsertArgs} args - Arguments to update or create a Screening.
     * @example
     * // Update or create a Screening
     * const screening = await prisma.screening.upsert({
     *   create: {
     *     // ... data to create a Screening
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Screening we want to update
     *   }
     * })
     */
    upsert<T extends ScreeningUpsertArgs>(args: SelectSubset<T, ScreeningUpsertArgs<ExtArgs>>): Prisma__ScreeningClient<$Result.GetResult<Prisma.$ScreeningPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Screenings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScreeningCountArgs} args - Arguments to filter Screenings to count.
     * @example
     * // Count the number of Screenings
     * const count = await prisma.screening.count({
     *   where: {
     *     // ... the filter for the Screenings we want to count
     *   }
     * })
    **/
    count<T extends ScreeningCountArgs>(
      args?: Subset<T, ScreeningCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ScreeningCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Screening.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScreeningAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ScreeningAggregateArgs>(args: Subset<T, ScreeningAggregateArgs>): Prisma.PrismaPromise<GetScreeningAggregateType<T>>

    /**
     * Group by Screening.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScreeningGroupByArgs} args - Group by arguments.
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
      T extends ScreeningGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ScreeningGroupByArgs['orderBy'] }
        : { orderBy?: ScreeningGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ScreeningGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetScreeningGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Screening model
   */
  readonly fields: ScreeningFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Screening.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ScreeningClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    candidate<T extends CandidateDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CandidateDefaultArgs<ExtArgs>>): Prisma__CandidateClient<$Result.GetResult<Prisma.$CandidatePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the Screening model
   */
  interface ScreeningFieldRefs {
    readonly id: FieldRef<"Screening", 'String'>
    readonly candidate_id: FieldRef<"Screening", 'String'>
    readonly stage: FieldRef<"Screening", 'String'>
    readonly status: FieldRef<"Screening", 'String'>
    readonly scheduled_date: FieldRef<"Screening", 'DateTime'>
    readonly completed_date: FieldRef<"Screening", 'DateTime'>
    readonly interviewer_id: FieldRef<"Screening", 'String'>
    readonly score: FieldRef<"Screening", 'Float'>
    readonly feedback: FieldRef<"Screening", 'String'>
    readonly recommendation: FieldRef<"Screening", 'String'>
    readonly created_at: FieldRef<"Screening", 'DateTime'>
    readonly updated_at: FieldRef<"Screening", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Screening findUnique
   */
  export type ScreeningFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Screening
     */
    select?: ScreeningSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Screening
     */
    omit?: ScreeningOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScreeningInclude<ExtArgs> | null
    /**
     * Filter, which Screening to fetch.
     */
    where: ScreeningWhereUniqueInput
  }

  /**
   * Screening findUniqueOrThrow
   */
  export type ScreeningFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Screening
     */
    select?: ScreeningSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Screening
     */
    omit?: ScreeningOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScreeningInclude<ExtArgs> | null
    /**
     * Filter, which Screening to fetch.
     */
    where: ScreeningWhereUniqueInput
  }

  /**
   * Screening findFirst
   */
  export type ScreeningFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Screening
     */
    select?: ScreeningSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Screening
     */
    omit?: ScreeningOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScreeningInclude<ExtArgs> | null
    /**
     * Filter, which Screening to fetch.
     */
    where?: ScreeningWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Screenings to fetch.
     */
    orderBy?: ScreeningOrderByWithRelationInput | ScreeningOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Screenings.
     */
    cursor?: ScreeningWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Screenings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Screenings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Screenings.
     */
    distinct?: ScreeningScalarFieldEnum | ScreeningScalarFieldEnum[]
  }

  /**
   * Screening findFirstOrThrow
   */
  export type ScreeningFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Screening
     */
    select?: ScreeningSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Screening
     */
    omit?: ScreeningOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScreeningInclude<ExtArgs> | null
    /**
     * Filter, which Screening to fetch.
     */
    where?: ScreeningWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Screenings to fetch.
     */
    orderBy?: ScreeningOrderByWithRelationInput | ScreeningOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Screenings.
     */
    cursor?: ScreeningWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Screenings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Screenings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Screenings.
     */
    distinct?: ScreeningScalarFieldEnum | ScreeningScalarFieldEnum[]
  }

  /**
   * Screening findMany
   */
  export type ScreeningFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Screening
     */
    select?: ScreeningSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Screening
     */
    omit?: ScreeningOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScreeningInclude<ExtArgs> | null
    /**
     * Filter, which Screenings to fetch.
     */
    where?: ScreeningWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Screenings to fetch.
     */
    orderBy?: ScreeningOrderByWithRelationInput | ScreeningOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Screenings.
     */
    cursor?: ScreeningWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Screenings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Screenings.
     */
    skip?: number
    distinct?: ScreeningScalarFieldEnum | ScreeningScalarFieldEnum[]
  }

  /**
   * Screening create
   */
  export type ScreeningCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Screening
     */
    select?: ScreeningSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Screening
     */
    omit?: ScreeningOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScreeningInclude<ExtArgs> | null
    /**
     * The data needed to create a Screening.
     */
    data: XOR<ScreeningCreateInput, ScreeningUncheckedCreateInput>
  }

  /**
   * Screening createMany
   */
  export type ScreeningCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Screenings.
     */
    data: ScreeningCreateManyInput | ScreeningCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Screening createManyAndReturn
   */
  export type ScreeningCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Screening
     */
    select?: ScreeningSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Screening
     */
    omit?: ScreeningOmit<ExtArgs> | null
    /**
     * The data used to create many Screenings.
     */
    data: ScreeningCreateManyInput | ScreeningCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScreeningIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Screening update
   */
  export type ScreeningUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Screening
     */
    select?: ScreeningSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Screening
     */
    omit?: ScreeningOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScreeningInclude<ExtArgs> | null
    /**
     * The data needed to update a Screening.
     */
    data: XOR<ScreeningUpdateInput, ScreeningUncheckedUpdateInput>
    /**
     * Choose, which Screening to update.
     */
    where: ScreeningWhereUniqueInput
  }

  /**
   * Screening updateMany
   */
  export type ScreeningUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Screenings.
     */
    data: XOR<ScreeningUpdateManyMutationInput, ScreeningUncheckedUpdateManyInput>
    /**
     * Filter which Screenings to update
     */
    where?: ScreeningWhereInput
    /**
     * Limit how many Screenings to update.
     */
    limit?: number
  }

  /**
   * Screening updateManyAndReturn
   */
  export type ScreeningUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Screening
     */
    select?: ScreeningSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Screening
     */
    omit?: ScreeningOmit<ExtArgs> | null
    /**
     * The data used to update Screenings.
     */
    data: XOR<ScreeningUpdateManyMutationInput, ScreeningUncheckedUpdateManyInput>
    /**
     * Filter which Screenings to update
     */
    where?: ScreeningWhereInput
    /**
     * Limit how many Screenings to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScreeningIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Screening upsert
   */
  export type ScreeningUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Screening
     */
    select?: ScreeningSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Screening
     */
    omit?: ScreeningOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScreeningInclude<ExtArgs> | null
    /**
     * The filter to search for the Screening to update in case it exists.
     */
    where: ScreeningWhereUniqueInput
    /**
     * In case the Screening found by the `where` argument doesn't exist, create a new Screening with this data.
     */
    create: XOR<ScreeningCreateInput, ScreeningUncheckedCreateInput>
    /**
     * In case the Screening was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ScreeningUpdateInput, ScreeningUncheckedUpdateInput>
  }

  /**
   * Screening delete
   */
  export type ScreeningDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Screening
     */
    select?: ScreeningSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Screening
     */
    omit?: ScreeningOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScreeningInclude<ExtArgs> | null
    /**
     * Filter which Screening to delete.
     */
    where: ScreeningWhereUniqueInput
  }

  /**
   * Screening deleteMany
   */
  export type ScreeningDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Screenings to delete
     */
    where?: ScreeningWhereInput
    /**
     * Limit how many Screenings to delete.
     */
    limit?: number
  }

  /**
   * Screening without action
   */
  export type ScreeningDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Screening
     */
    select?: ScreeningSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Screening
     */
    omit?: ScreeningOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScreeningInclude<ExtArgs> | null
  }


  /**
   * Model OnboardingTemplate
   */

  export type AggregateOnboardingTemplate = {
    _count: OnboardingTemplateCountAggregateOutputType | null
    _min: OnboardingTemplateMinAggregateOutputType | null
    _max: OnboardingTemplateMaxAggregateOutputType | null
  }

  export type OnboardingTemplateMinAggregateOutputType = {
    id: string | null
    name_en: string | null
    name_th: string | null
    department: string | null
    is_default: boolean | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type OnboardingTemplateMaxAggregateOutputType = {
    id: string | null
    name_en: string | null
    name_th: string | null
    department: string | null
    is_default: boolean | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type OnboardingTemplateCountAggregateOutputType = {
    id: number
    name_en: number
    name_th: number
    department: number
    is_default: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type OnboardingTemplateMinAggregateInputType = {
    id?: true
    name_en?: true
    name_th?: true
    department?: true
    is_default?: true
    created_at?: true
    updated_at?: true
  }

  export type OnboardingTemplateMaxAggregateInputType = {
    id?: true
    name_en?: true
    name_th?: true
    department?: true
    is_default?: true
    created_at?: true
    updated_at?: true
  }

  export type OnboardingTemplateCountAggregateInputType = {
    id?: true
    name_en?: true
    name_th?: true
    department?: true
    is_default?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type OnboardingTemplateAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which OnboardingTemplate to aggregate.
     */
    where?: OnboardingTemplateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OnboardingTemplates to fetch.
     */
    orderBy?: OnboardingTemplateOrderByWithRelationInput | OnboardingTemplateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: OnboardingTemplateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OnboardingTemplates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OnboardingTemplates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned OnboardingTemplates
    **/
    _count?: true | OnboardingTemplateCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: OnboardingTemplateMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: OnboardingTemplateMaxAggregateInputType
  }

  export type GetOnboardingTemplateAggregateType<T extends OnboardingTemplateAggregateArgs> = {
        [P in keyof T & keyof AggregateOnboardingTemplate]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOnboardingTemplate[P]>
      : GetScalarType<T[P], AggregateOnboardingTemplate[P]>
  }




  export type OnboardingTemplateGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OnboardingTemplateWhereInput
    orderBy?: OnboardingTemplateOrderByWithAggregationInput | OnboardingTemplateOrderByWithAggregationInput[]
    by: OnboardingTemplateScalarFieldEnum[] | OnboardingTemplateScalarFieldEnum
    having?: OnboardingTemplateScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: OnboardingTemplateCountAggregateInputType | true
    _min?: OnboardingTemplateMinAggregateInputType
    _max?: OnboardingTemplateMaxAggregateInputType
  }

  export type OnboardingTemplateGroupByOutputType = {
    id: string
    name_en: string
    name_th: string | null
    department: string | null
    is_default: boolean
    created_at: Date
    updated_at: Date
    _count: OnboardingTemplateCountAggregateOutputType | null
    _min: OnboardingTemplateMinAggregateOutputType | null
    _max: OnboardingTemplateMaxAggregateOutputType | null
  }

  type GetOnboardingTemplateGroupByPayload<T extends OnboardingTemplateGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<OnboardingTemplateGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof OnboardingTemplateGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], OnboardingTemplateGroupByOutputType[P]>
            : GetScalarType<T[P], OnboardingTemplateGroupByOutputType[P]>
        }
      >
    >


  export type OnboardingTemplateSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name_en?: boolean
    name_th?: boolean
    department?: boolean
    is_default?: boolean
    created_at?: boolean
    updated_at?: boolean
    tasks?: boolean | OnboardingTemplate$tasksArgs<ExtArgs>
    _count?: boolean | OnboardingTemplateCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["onboardingTemplate"]>

  export type OnboardingTemplateSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name_en?: boolean
    name_th?: boolean
    department?: boolean
    is_default?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["onboardingTemplate"]>

  export type OnboardingTemplateSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name_en?: boolean
    name_th?: boolean
    department?: boolean
    is_default?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["onboardingTemplate"]>

  export type OnboardingTemplateSelectScalar = {
    id?: boolean
    name_en?: boolean
    name_th?: boolean
    department?: boolean
    is_default?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type OnboardingTemplateOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name_en" | "name_th" | "department" | "is_default" | "created_at" | "updated_at", ExtArgs["result"]["onboardingTemplate"]>
  export type OnboardingTemplateInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tasks?: boolean | OnboardingTemplate$tasksArgs<ExtArgs>
    _count?: boolean | OnboardingTemplateCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type OnboardingTemplateIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type OnboardingTemplateIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $OnboardingTemplatePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "OnboardingTemplate"
    objects: {
      tasks: Prisma.$OnboardingTaskPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name_en: string
      name_th: string | null
      department: string | null
      is_default: boolean
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["onboardingTemplate"]>
    composites: {}
  }

  type OnboardingTemplateGetPayload<S extends boolean | null | undefined | OnboardingTemplateDefaultArgs> = $Result.GetResult<Prisma.$OnboardingTemplatePayload, S>

  type OnboardingTemplateCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<OnboardingTemplateFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: OnboardingTemplateCountAggregateInputType | true
    }

  export interface OnboardingTemplateDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['OnboardingTemplate'], meta: { name: 'OnboardingTemplate' } }
    /**
     * Find zero or one OnboardingTemplate that matches the filter.
     * @param {OnboardingTemplateFindUniqueArgs} args - Arguments to find a OnboardingTemplate
     * @example
     * // Get one OnboardingTemplate
     * const onboardingTemplate = await prisma.onboardingTemplate.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends OnboardingTemplateFindUniqueArgs>(args: SelectSubset<T, OnboardingTemplateFindUniqueArgs<ExtArgs>>): Prisma__OnboardingTemplateClient<$Result.GetResult<Prisma.$OnboardingTemplatePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one OnboardingTemplate that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {OnboardingTemplateFindUniqueOrThrowArgs} args - Arguments to find a OnboardingTemplate
     * @example
     * // Get one OnboardingTemplate
     * const onboardingTemplate = await prisma.onboardingTemplate.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends OnboardingTemplateFindUniqueOrThrowArgs>(args: SelectSubset<T, OnboardingTemplateFindUniqueOrThrowArgs<ExtArgs>>): Prisma__OnboardingTemplateClient<$Result.GetResult<Prisma.$OnboardingTemplatePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first OnboardingTemplate that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OnboardingTemplateFindFirstArgs} args - Arguments to find a OnboardingTemplate
     * @example
     * // Get one OnboardingTemplate
     * const onboardingTemplate = await prisma.onboardingTemplate.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends OnboardingTemplateFindFirstArgs>(args?: SelectSubset<T, OnboardingTemplateFindFirstArgs<ExtArgs>>): Prisma__OnboardingTemplateClient<$Result.GetResult<Prisma.$OnboardingTemplatePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first OnboardingTemplate that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OnboardingTemplateFindFirstOrThrowArgs} args - Arguments to find a OnboardingTemplate
     * @example
     * // Get one OnboardingTemplate
     * const onboardingTemplate = await prisma.onboardingTemplate.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends OnboardingTemplateFindFirstOrThrowArgs>(args?: SelectSubset<T, OnboardingTemplateFindFirstOrThrowArgs<ExtArgs>>): Prisma__OnboardingTemplateClient<$Result.GetResult<Prisma.$OnboardingTemplatePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more OnboardingTemplates that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OnboardingTemplateFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all OnboardingTemplates
     * const onboardingTemplates = await prisma.onboardingTemplate.findMany()
     * 
     * // Get first 10 OnboardingTemplates
     * const onboardingTemplates = await prisma.onboardingTemplate.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const onboardingTemplateWithIdOnly = await prisma.onboardingTemplate.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends OnboardingTemplateFindManyArgs>(args?: SelectSubset<T, OnboardingTemplateFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OnboardingTemplatePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a OnboardingTemplate.
     * @param {OnboardingTemplateCreateArgs} args - Arguments to create a OnboardingTemplate.
     * @example
     * // Create one OnboardingTemplate
     * const OnboardingTemplate = await prisma.onboardingTemplate.create({
     *   data: {
     *     // ... data to create a OnboardingTemplate
     *   }
     * })
     * 
     */
    create<T extends OnboardingTemplateCreateArgs>(args: SelectSubset<T, OnboardingTemplateCreateArgs<ExtArgs>>): Prisma__OnboardingTemplateClient<$Result.GetResult<Prisma.$OnboardingTemplatePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many OnboardingTemplates.
     * @param {OnboardingTemplateCreateManyArgs} args - Arguments to create many OnboardingTemplates.
     * @example
     * // Create many OnboardingTemplates
     * const onboardingTemplate = await prisma.onboardingTemplate.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends OnboardingTemplateCreateManyArgs>(args?: SelectSubset<T, OnboardingTemplateCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many OnboardingTemplates and returns the data saved in the database.
     * @param {OnboardingTemplateCreateManyAndReturnArgs} args - Arguments to create many OnboardingTemplates.
     * @example
     * // Create many OnboardingTemplates
     * const onboardingTemplate = await prisma.onboardingTemplate.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many OnboardingTemplates and only return the `id`
     * const onboardingTemplateWithIdOnly = await prisma.onboardingTemplate.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends OnboardingTemplateCreateManyAndReturnArgs>(args?: SelectSubset<T, OnboardingTemplateCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OnboardingTemplatePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a OnboardingTemplate.
     * @param {OnboardingTemplateDeleteArgs} args - Arguments to delete one OnboardingTemplate.
     * @example
     * // Delete one OnboardingTemplate
     * const OnboardingTemplate = await prisma.onboardingTemplate.delete({
     *   where: {
     *     // ... filter to delete one OnboardingTemplate
     *   }
     * })
     * 
     */
    delete<T extends OnboardingTemplateDeleteArgs>(args: SelectSubset<T, OnboardingTemplateDeleteArgs<ExtArgs>>): Prisma__OnboardingTemplateClient<$Result.GetResult<Prisma.$OnboardingTemplatePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one OnboardingTemplate.
     * @param {OnboardingTemplateUpdateArgs} args - Arguments to update one OnboardingTemplate.
     * @example
     * // Update one OnboardingTemplate
     * const onboardingTemplate = await prisma.onboardingTemplate.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends OnboardingTemplateUpdateArgs>(args: SelectSubset<T, OnboardingTemplateUpdateArgs<ExtArgs>>): Prisma__OnboardingTemplateClient<$Result.GetResult<Prisma.$OnboardingTemplatePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more OnboardingTemplates.
     * @param {OnboardingTemplateDeleteManyArgs} args - Arguments to filter OnboardingTemplates to delete.
     * @example
     * // Delete a few OnboardingTemplates
     * const { count } = await prisma.onboardingTemplate.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends OnboardingTemplateDeleteManyArgs>(args?: SelectSubset<T, OnboardingTemplateDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more OnboardingTemplates.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OnboardingTemplateUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many OnboardingTemplates
     * const onboardingTemplate = await prisma.onboardingTemplate.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends OnboardingTemplateUpdateManyArgs>(args: SelectSubset<T, OnboardingTemplateUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more OnboardingTemplates and returns the data updated in the database.
     * @param {OnboardingTemplateUpdateManyAndReturnArgs} args - Arguments to update many OnboardingTemplates.
     * @example
     * // Update many OnboardingTemplates
     * const onboardingTemplate = await prisma.onboardingTemplate.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more OnboardingTemplates and only return the `id`
     * const onboardingTemplateWithIdOnly = await prisma.onboardingTemplate.updateManyAndReturn({
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
    updateManyAndReturn<T extends OnboardingTemplateUpdateManyAndReturnArgs>(args: SelectSubset<T, OnboardingTemplateUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OnboardingTemplatePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one OnboardingTemplate.
     * @param {OnboardingTemplateUpsertArgs} args - Arguments to update or create a OnboardingTemplate.
     * @example
     * // Update or create a OnboardingTemplate
     * const onboardingTemplate = await prisma.onboardingTemplate.upsert({
     *   create: {
     *     // ... data to create a OnboardingTemplate
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the OnboardingTemplate we want to update
     *   }
     * })
     */
    upsert<T extends OnboardingTemplateUpsertArgs>(args: SelectSubset<T, OnboardingTemplateUpsertArgs<ExtArgs>>): Prisma__OnboardingTemplateClient<$Result.GetResult<Prisma.$OnboardingTemplatePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of OnboardingTemplates.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OnboardingTemplateCountArgs} args - Arguments to filter OnboardingTemplates to count.
     * @example
     * // Count the number of OnboardingTemplates
     * const count = await prisma.onboardingTemplate.count({
     *   where: {
     *     // ... the filter for the OnboardingTemplates we want to count
     *   }
     * })
    **/
    count<T extends OnboardingTemplateCountArgs>(
      args?: Subset<T, OnboardingTemplateCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], OnboardingTemplateCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a OnboardingTemplate.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OnboardingTemplateAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends OnboardingTemplateAggregateArgs>(args: Subset<T, OnboardingTemplateAggregateArgs>): Prisma.PrismaPromise<GetOnboardingTemplateAggregateType<T>>

    /**
     * Group by OnboardingTemplate.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OnboardingTemplateGroupByArgs} args - Group by arguments.
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
      T extends OnboardingTemplateGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: OnboardingTemplateGroupByArgs['orderBy'] }
        : { orderBy?: OnboardingTemplateGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, OnboardingTemplateGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOnboardingTemplateGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the OnboardingTemplate model
   */
  readonly fields: OnboardingTemplateFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for OnboardingTemplate.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__OnboardingTemplateClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    tasks<T extends OnboardingTemplate$tasksArgs<ExtArgs> = {}>(args?: Subset<T, OnboardingTemplate$tasksArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OnboardingTaskPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the OnboardingTemplate model
   */
  interface OnboardingTemplateFieldRefs {
    readonly id: FieldRef<"OnboardingTemplate", 'String'>
    readonly name_en: FieldRef<"OnboardingTemplate", 'String'>
    readonly name_th: FieldRef<"OnboardingTemplate", 'String'>
    readonly department: FieldRef<"OnboardingTemplate", 'String'>
    readonly is_default: FieldRef<"OnboardingTemplate", 'Boolean'>
    readonly created_at: FieldRef<"OnboardingTemplate", 'DateTime'>
    readonly updated_at: FieldRef<"OnboardingTemplate", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * OnboardingTemplate findUnique
   */
  export type OnboardingTemplateFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OnboardingTemplate
     */
    select?: OnboardingTemplateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OnboardingTemplate
     */
    omit?: OnboardingTemplateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OnboardingTemplateInclude<ExtArgs> | null
    /**
     * Filter, which OnboardingTemplate to fetch.
     */
    where: OnboardingTemplateWhereUniqueInput
  }

  /**
   * OnboardingTemplate findUniqueOrThrow
   */
  export type OnboardingTemplateFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OnboardingTemplate
     */
    select?: OnboardingTemplateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OnboardingTemplate
     */
    omit?: OnboardingTemplateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OnboardingTemplateInclude<ExtArgs> | null
    /**
     * Filter, which OnboardingTemplate to fetch.
     */
    where: OnboardingTemplateWhereUniqueInput
  }

  /**
   * OnboardingTemplate findFirst
   */
  export type OnboardingTemplateFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OnboardingTemplate
     */
    select?: OnboardingTemplateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OnboardingTemplate
     */
    omit?: OnboardingTemplateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OnboardingTemplateInclude<ExtArgs> | null
    /**
     * Filter, which OnboardingTemplate to fetch.
     */
    where?: OnboardingTemplateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OnboardingTemplates to fetch.
     */
    orderBy?: OnboardingTemplateOrderByWithRelationInput | OnboardingTemplateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OnboardingTemplates.
     */
    cursor?: OnboardingTemplateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OnboardingTemplates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OnboardingTemplates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OnboardingTemplates.
     */
    distinct?: OnboardingTemplateScalarFieldEnum | OnboardingTemplateScalarFieldEnum[]
  }

  /**
   * OnboardingTemplate findFirstOrThrow
   */
  export type OnboardingTemplateFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OnboardingTemplate
     */
    select?: OnboardingTemplateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OnboardingTemplate
     */
    omit?: OnboardingTemplateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OnboardingTemplateInclude<ExtArgs> | null
    /**
     * Filter, which OnboardingTemplate to fetch.
     */
    where?: OnboardingTemplateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OnboardingTemplates to fetch.
     */
    orderBy?: OnboardingTemplateOrderByWithRelationInput | OnboardingTemplateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OnboardingTemplates.
     */
    cursor?: OnboardingTemplateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OnboardingTemplates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OnboardingTemplates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OnboardingTemplates.
     */
    distinct?: OnboardingTemplateScalarFieldEnum | OnboardingTemplateScalarFieldEnum[]
  }

  /**
   * OnboardingTemplate findMany
   */
  export type OnboardingTemplateFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OnboardingTemplate
     */
    select?: OnboardingTemplateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OnboardingTemplate
     */
    omit?: OnboardingTemplateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OnboardingTemplateInclude<ExtArgs> | null
    /**
     * Filter, which OnboardingTemplates to fetch.
     */
    where?: OnboardingTemplateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OnboardingTemplates to fetch.
     */
    orderBy?: OnboardingTemplateOrderByWithRelationInput | OnboardingTemplateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing OnboardingTemplates.
     */
    cursor?: OnboardingTemplateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OnboardingTemplates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OnboardingTemplates.
     */
    skip?: number
    distinct?: OnboardingTemplateScalarFieldEnum | OnboardingTemplateScalarFieldEnum[]
  }

  /**
   * OnboardingTemplate create
   */
  export type OnboardingTemplateCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OnboardingTemplate
     */
    select?: OnboardingTemplateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OnboardingTemplate
     */
    omit?: OnboardingTemplateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OnboardingTemplateInclude<ExtArgs> | null
    /**
     * The data needed to create a OnboardingTemplate.
     */
    data: XOR<OnboardingTemplateCreateInput, OnboardingTemplateUncheckedCreateInput>
  }

  /**
   * OnboardingTemplate createMany
   */
  export type OnboardingTemplateCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many OnboardingTemplates.
     */
    data: OnboardingTemplateCreateManyInput | OnboardingTemplateCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * OnboardingTemplate createManyAndReturn
   */
  export type OnboardingTemplateCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OnboardingTemplate
     */
    select?: OnboardingTemplateSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the OnboardingTemplate
     */
    omit?: OnboardingTemplateOmit<ExtArgs> | null
    /**
     * The data used to create many OnboardingTemplates.
     */
    data: OnboardingTemplateCreateManyInput | OnboardingTemplateCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * OnboardingTemplate update
   */
  export type OnboardingTemplateUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OnboardingTemplate
     */
    select?: OnboardingTemplateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OnboardingTemplate
     */
    omit?: OnboardingTemplateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OnboardingTemplateInclude<ExtArgs> | null
    /**
     * The data needed to update a OnboardingTemplate.
     */
    data: XOR<OnboardingTemplateUpdateInput, OnboardingTemplateUncheckedUpdateInput>
    /**
     * Choose, which OnboardingTemplate to update.
     */
    where: OnboardingTemplateWhereUniqueInput
  }

  /**
   * OnboardingTemplate updateMany
   */
  export type OnboardingTemplateUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update OnboardingTemplates.
     */
    data: XOR<OnboardingTemplateUpdateManyMutationInput, OnboardingTemplateUncheckedUpdateManyInput>
    /**
     * Filter which OnboardingTemplates to update
     */
    where?: OnboardingTemplateWhereInput
    /**
     * Limit how many OnboardingTemplates to update.
     */
    limit?: number
  }

  /**
   * OnboardingTemplate updateManyAndReturn
   */
  export type OnboardingTemplateUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OnboardingTemplate
     */
    select?: OnboardingTemplateSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the OnboardingTemplate
     */
    omit?: OnboardingTemplateOmit<ExtArgs> | null
    /**
     * The data used to update OnboardingTemplates.
     */
    data: XOR<OnboardingTemplateUpdateManyMutationInput, OnboardingTemplateUncheckedUpdateManyInput>
    /**
     * Filter which OnboardingTemplates to update
     */
    where?: OnboardingTemplateWhereInput
    /**
     * Limit how many OnboardingTemplates to update.
     */
    limit?: number
  }

  /**
   * OnboardingTemplate upsert
   */
  export type OnboardingTemplateUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OnboardingTemplate
     */
    select?: OnboardingTemplateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OnboardingTemplate
     */
    omit?: OnboardingTemplateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OnboardingTemplateInclude<ExtArgs> | null
    /**
     * The filter to search for the OnboardingTemplate to update in case it exists.
     */
    where: OnboardingTemplateWhereUniqueInput
    /**
     * In case the OnboardingTemplate found by the `where` argument doesn't exist, create a new OnboardingTemplate with this data.
     */
    create: XOR<OnboardingTemplateCreateInput, OnboardingTemplateUncheckedCreateInput>
    /**
     * In case the OnboardingTemplate was found with the provided `where` argument, update it with this data.
     */
    update: XOR<OnboardingTemplateUpdateInput, OnboardingTemplateUncheckedUpdateInput>
  }

  /**
   * OnboardingTemplate delete
   */
  export type OnboardingTemplateDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OnboardingTemplate
     */
    select?: OnboardingTemplateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OnboardingTemplate
     */
    omit?: OnboardingTemplateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OnboardingTemplateInclude<ExtArgs> | null
    /**
     * Filter which OnboardingTemplate to delete.
     */
    where: OnboardingTemplateWhereUniqueInput
  }

  /**
   * OnboardingTemplate deleteMany
   */
  export type OnboardingTemplateDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which OnboardingTemplates to delete
     */
    where?: OnboardingTemplateWhereInput
    /**
     * Limit how many OnboardingTemplates to delete.
     */
    limit?: number
  }

  /**
   * OnboardingTemplate.tasks
   */
  export type OnboardingTemplate$tasksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OnboardingTask
     */
    select?: OnboardingTaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OnboardingTask
     */
    omit?: OnboardingTaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OnboardingTaskInclude<ExtArgs> | null
    where?: OnboardingTaskWhereInput
    orderBy?: OnboardingTaskOrderByWithRelationInput | OnboardingTaskOrderByWithRelationInput[]
    cursor?: OnboardingTaskWhereUniqueInput
    take?: number
    skip?: number
    distinct?: OnboardingTaskScalarFieldEnum | OnboardingTaskScalarFieldEnum[]
  }

  /**
   * OnboardingTemplate without action
   */
  export type OnboardingTemplateDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OnboardingTemplate
     */
    select?: OnboardingTemplateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OnboardingTemplate
     */
    omit?: OnboardingTemplateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OnboardingTemplateInclude<ExtArgs> | null
  }


  /**
   * Model OnboardingTask
   */

  export type AggregateOnboardingTask = {
    _count: OnboardingTaskCountAggregateOutputType | null
    _avg: OnboardingTaskAvgAggregateOutputType | null
    _sum: OnboardingTaskSumAggregateOutputType | null
    _min: OnboardingTaskMinAggregateOutputType | null
    _max: OnboardingTaskMaxAggregateOutputType | null
  }

  export type OnboardingTaskAvgAggregateOutputType = {
    sort_order: number | null
  }

  export type OnboardingTaskSumAggregateOutputType = {
    sort_order: number | null
  }

  export type OnboardingTaskMinAggregateOutputType = {
    id: string | null
    template_id: string | null
    employee_id: string | null
    category: string | null
    title_en: string | null
    title_th: string | null
    description_en: string | null
    description_th: string | null
    required: boolean | null
    status: string | null
    due_date: Date | null
    completed_date: Date | null
    completed_by: string | null
    assigned_to: string | null
    sort_order: number | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type OnboardingTaskMaxAggregateOutputType = {
    id: string | null
    template_id: string | null
    employee_id: string | null
    category: string | null
    title_en: string | null
    title_th: string | null
    description_en: string | null
    description_th: string | null
    required: boolean | null
    status: string | null
    due_date: Date | null
    completed_date: Date | null
    completed_by: string | null
    assigned_to: string | null
    sort_order: number | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type OnboardingTaskCountAggregateOutputType = {
    id: number
    template_id: number
    employee_id: number
    category: number
    title_en: number
    title_th: number
    description_en: number
    description_th: number
    required: number
    status: number
    due_date: number
    completed_date: number
    completed_by: number
    assigned_to: number
    sort_order: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type OnboardingTaskAvgAggregateInputType = {
    sort_order?: true
  }

  export type OnboardingTaskSumAggregateInputType = {
    sort_order?: true
  }

  export type OnboardingTaskMinAggregateInputType = {
    id?: true
    template_id?: true
    employee_id?: true
    category?: true
    title_en?: true
    title_th?: true
    description_en?: true
    description_th?: true
    required?: true
    status?: true
    due_date?: true
    completed_date?: true
    completed_by?: true
    assigned_to?: true
    sort_order?: true
    created_at?: true
    updated_at?: true
  }

  export type OnboardingTaskMaxAggregateInputType = {
    id?: true
    template_id?: true
    employee_id?: true
    category?: true
    title_en?: true
    title_th?: true
    description_en?: true
    description_th?: true
    required?: true
    status?: true
    due_date?: true
    completed_date?: true
    completed_by?: true
    assigned_to?: true
    sort_order?: true
    created_at?: true
    updated_at?: true
  }

  export type OnboardingTaskCountAggregateInputType = {
    id?: true
    template_id?: true
    employee_id?: true
    category?: true
    title_en?: true
    title_th?: true
    description_en?: true
    description_th?: true
    required?: true
    status?: true
    due_date?: true
    completed_date?: true
    completed_by?: true
    assigned_to?: true
    sort_order?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type OnboardingTaskAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which OnboardingTask to aggregate.
     */
    where?: OnboardingTaskWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OnboardingTasks to fetch.
     */
    orderBy?: OnboardingTaskOrderByWithRelationInput | OnboardingTaskOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: OnboardingTaskWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OnboardingTasks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OnboardingTasks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned OnboardingTasks
    **/
    _count?: true | OnboardingTaskCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: OnboardingTaskAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: OnboardingTaskSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: OnboardingTaskMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: OnboardingTaskMaxAggregateInputType
  }

  export type GetOnboardingTaskAggregateType<T extends OnboardingTaskAggregateArgs> = {
        [P in keyof T & keyof AggregateOnboardingTask]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOnboardingTask[P]>
      : GetScalarType<T[P], AggregateOnboardingTask[P]>
  }




  export type OnboardingTaskGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OnboardingTaskWhereInput
    orderBy?: OnboardingTaskOrderByWithAggregationInput | OnboardingTaskOrderByWithAggregationInput[]
    by: OnboardingTaskScalarFieldEnum[] | OnboardingTaskScalarFieldEnum
    having?: OnboardingTaskScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: OnboardingTaskCountAggregateInputType | true
    _avg?: OnboardingTaskAvgAggregateInputType
    _sum?: OnboardingTaskSumAggregateInputType
    _min?: OnboardingTaskMinAggregateInputType
    _max?: OnboardingTaskMaxAggregateInputType
  }

  export type OnboardingTaskGroupByOutputType = {
    id: string
    template_id: string | null
    employee_id: string | null
    category: string
    title_en: string
    title_th: string | null
    description_en: string | null
    description_th: string | null
    required: boolean
    status: string
    due_date: Date | null
    completed_date: Date | null
    completed_by: string | null
    assigned_to: string | null
    sort_order: number
    created_at: Date
    updated_at: Date
    _count: OnboardingTaskCountAggregateOutputType | null
    _avg: OnboardingTaskAvgAggregateOutputType | null
    _sum: OnboardingTaskSumAggregateOutputType | null
    _min: OnboardingTaskMinAggregateOutputType | null
    _max: OnboardingTaskMaxAggregateOutputType | null
  }

  type GetOnboardingTaskGroupByPayload<T extends OnboardingTaskGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<OnboardingTaskGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof OnboardingTaskGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], OnboardingTaskGroupByOutputType[P]>
            : GetScalarType<T[P], OnboardingTaskGroupByOutputType[P]>
        }
      >
    >


  export type OnboardingTaskSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    template_id?: boolean
    employee_id?: boolean
    category?: boolean
    title_en?: boolean
    title_th?: boolean
    description_en?: boolean
    description_th?: boolean
    required?: boolean
    status?: boolean
    due_date?: boolean
    completed_date?: boolean
    completed_by?: boolean
    assigned_to?: boolean
    sort_order?: boolean
    created_at?: boolean
    updated_at?: boolean
    template?: boolean | OnboardingTask$templateArgs<ExtArgs>
  }, ExtArgs["result"]["onboardingTask"]>

  export type OnboardingTaskSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    template_id?: boolean
    employee_id?: boolean
    category?: boolean
    title_en?: boolean
    title_th?: boolean
    description_en?: boolean
    description_th?: boolean
    required?: boolean
    status?: boolean
    due_date?: boolean
    completed_date?: boolean
    completed_by?: boolean
    assigned_to?: boolean
    sort_order?: boolean
    created_at?: boolean
    updated_at?: boolean
    template?: boolean | OnboardingTask$templateArgs<ExtArgs>
  }, ExtArgs["result"]["onboardingTask"]>

  export type OnboardingTaskSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    template_id?: boolean
    employee_id?: boolean
    category?: boolean
    title_en?: boolean
    title_th?: boolean
    description_en?: boolean
    description_th?: boolean
    required?: boolean
    status?: boolean
    due_date?: boolean
    completed_date?: boolean
    completed_by?: boolean
    assigned_to?: boolean
    sort_order?: boolean
    created_at?: boolean
    updated_at?: boolean
    template?: boolean | OnboardingTask$templateArgs<ExtArgs>
  }, ExtArgs["result"]["onboardingTask"]>

  export type OnboardingTaskSelectScalar = {
    id?: boolean
    template_id?: boolean
    employee_id?: boolean
    category?: boolean
    title_en?: boolean
    title_th?: boolean
    description_en?: boolean
    description_th?: boolean
    required?: boolean
    status?: boolean
    due_date?: boolean
    completed_date?: boolean
    completed_by?: boolean
    assigned_to?: boolean
    sort_order?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type OnboardingTaskOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "template_id" | "employee_id" | "category" | "title_en" | "title_th" | "description_en" | "description_th" | "required" | "status" | "due_date" | "completed_date" | "completed_by" | "assigned_to" | "sort_order" | "created_at" | "updated_at", ExtArgs["result"]["onboardingTask"]>
  export type OnboardingTaskInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    template?: boolean | OnboardingTask$templateArgs<ExtArgs>
  }
  export type OnboardingTaskIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    template?: boolean | OnboardingTask$templateArgs<ExtArgs>
  }
  export type OnboardingTaskIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    template?: boolean | OnboardingTask$templateArgs<ExtArgs>
  }

  export type $OnboardingTaskPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "OnboardingTask"
    objects: {
      template: Prisma.$OnboardingTemplatePayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      template_id: string | null
      employee_id: string | null
      category: string
      title_en: string
      title_th: string | null
      description_en: string | null
      description_th: string | null
      required: boolean
      status: string
      due_date: Date | null
      completed_date: Date | null
      completed_by: string | null
      assigned_to: string | null
      sort_order: number
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["onboardingTask"]>
    composites: {}
  }

  type OnboardingTaskGetPayload<S extends boolean | null | undefined | OnboardingTaskDefaultArgs> = $Result.GetResult<Prisma.$OnboardingTaskPayload, S>

  type OnboardingTaskCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<OnboardingTaskFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: OnboardingTaskCountAggregateInputType | true
    }

  export interface OnboardingTaskDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['OnboardingTask'], meta: { name: 'OnboardingTask' } }
    /**
     * Find zero or one OnboardingTask that matches the filter.
     * @param {OnboardingTaskFindUniqueArgs} args - Arguments to find a OnboardingTask
     * @example
     * // Get one OnboardingTask
     * const onboardingTask = await prisma.onboardingTask.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends OnboardingTaskFindUniqueArgs>(args: SelectSubset<T, OnboardingTaskFindUniqueArgs<ExtArgs>>): Prisma__OnboardingTaskClient<$Result.GetResult<Prisma.$OnboardingTaskPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one OnboardingTask that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {OnboardingTaskFindUniqueOrThrowArgs} args - Arguments to find a OnboardingTask
     * @example
     * // Get one OnboardingTask
     * const onboardingTask = await prisma.onboardingTask.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends OnboardingTaskFindUniqueOrThrowArgs>(args: SelectSubset<T, OnboardingTaskFindUniqueOrThrowArgs<ExtArgs>>): Prisma__OnboardingTaskClient<$Result.GetResult<Prisma.$OnboardingTaskPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first OnboardingTask that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OnboardingTaskFindFirstArgs} args - Arguments to find a OnboardingTask
     * @example
     * // Get one OnboardingTask
     * const onboardingTask = await prisma.onboardingTask.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends OnboardingTaskFindFirstArgs>(args?: SelectSubset<T, OnboardingTaskFindFirstArgs<ExtArgs>>): Prisma__OnboardingTaskClient<$Result.GetResult<Prisma.$OnboardingTaskPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first OnboardingTask that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OnboardingTaskFindFirstOrThrowArgs} args - Arguments to find a OnboardingTask
     * @example
     * // Get one OnboardingTask
     * const onboardingTask = await prisma.onboardingTask.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends OnboardingTaskFindFirstOrThrowArgs>(args?: SelectSubset<T, OnboardingTaskFindFirstOrThrowArgs<ExtArgs>>): Prisma__OnboardingTaskClient<$Result.GetResult<Prisma.$OnboardingTaskPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more OnboardingTasks that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OnboardingTaskFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all OnboardingTasks
     * const onboardingTasks = await prisma.onboardingTask.findMany()
     * 
     * // Get first 10 OnboardingTasks
     * const onboardingTasks = await prisma.onboardingTask.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const onboardingTaskWithIdOnly = await prisma.onboardingTask.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends OnboardingTaskFindManyArgs>(args?: SelectSubset<T, OnboardingTaskFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OnboardingTaskPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a OnboardingTask.
     * @param {OnboardingTaskCreateArgs} args - Arguments to create a OnboardingTask.
     * @example
     * // Create one OnboardingTask
     * const OnboardingTask = await prisma.onboardingTask.create({
     *   data: {
     *     // ... data to create a OnboardingTask
     *   }
     * })
     * 
     */
    create<T extends OnboardingTaskCreateArgs>(args: SelectSubset<T, OnboardingTaskCreateArgs<ExtArgs>>): Prisma__OnboardingTaskClient<$Result.GetResult<Prisma.$OnboardingTaskPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many OnboardingTasks.
     * @param {OnboardingTaskCreateManyArgs} args - Arguments to create many OnboardingTasks.
     * @example
     * // Create many OnboardingTasks
     * const onboardingTask = await prisma.onboardingTask.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends OnboardingTaskCreateManyArgs>(args?: SelectSubset<T, OnboardingTaskCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many OnboardingTasks and returns the data saved in the database.
     * @param {OnboardingTaskCreateManyAndReturnArgs} args - Arguments to create many OnboardingTasks.
     * @example
     * // Create many OnboardingTasks
     * const onboardingTask = await prisma.onboardingTask.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many OnboardingTasks and only return the `id`
     * const onboardingTaskWithIdOnly = await prisma.onboardingTask.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends OnboardingTaskCreateManyAndReturnArgs>(args?: SelectSubset<T, OnboardingTaskCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OnboardingTaskPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a OnboardingTask.
     * @param {OnboardingTaskDeleteArgs} args - Arguments to delete one OnboardingTask.
     * @example
     * // Delete one OnboardingTask
     * const OnboardingTask = await prisma.onboardingTask.delete({
     *   where: {
     *     // ... filter to delete one OnboardingTask
     *   }
     * })
     * 
     */
    delete<T extends OnboardingTaskDeleteArgs>(args: SelectSubset<T, OnboardingTaskDeleteArgs<ExtArgs>>): Prisma__OnboardingTaskClient<$Result.GetResult<Prisma.$OnboardingTaskPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one OnboardingTask.
     * @param {OnboardingTaskUpdateArgs} args - Arguments to update one OnboardingTask.
     * @example
     * // Update one OnboardingTask
     * const onboardingTask = await prisma.onboardingTask.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends OnboardingTaskUpdateArgs>(args: SelectSubset<T, OnboardingTaskUpdateArgs<ExtArgs>>): Prisma__OnboardingTaskClient<$Result.GetResult<Prisma.$OnboardingTaskPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more OnboardingTasks.
     * @param {OnboardingTaskDeleteManyArgs} args - Arguments to filter OnboardingTasks to delete.
     * @example
     * // Delete a few OnboardingTasks
     * const { count } = await prisma.onboardingTask.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends OnboardingTaskDeleteManyArgs>(args?: SelectSubset<T, OnboardingTaskDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more OnboardingTasks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OnboardingTaskUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many OnboardingTasks
     * const onboardingTask = await prisma.onboardingTask.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends OnboardingTaskUpdateManyArgs>(args: SelectSubset<T, OnboardingTaskUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more OnboardingTasks and returns the data updated in the database.
     * @param {OnboardingTaskUpdateManyAndReturnArgs} args - Arguments to update many OnboardingTasks.
     * @example
     * // Update many OnboardingTasks
     * const onboardingTask = await prisma.onboardingTask.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more OnboardingTasks and only return the `id`
     * const onboardingTaskWithIdOnly = await prisma.onboardingTask.updateManyAndReturn({
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
    updateManyAndReturn<T extends OnboardingTaskUpdateManyAndReturnArgs>(args: SelectSubset<T, OnboardingTaskUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OnboardingTaskPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one OnboardingTask.
     * @param {OnboardingTaskUpsertArgs} args - Arguments to update or create a OnboardingTask.
     * @example
     * // Update or create a OnboardingTask
     * const onboardingTask = await prisma.onboardingTask.upsert({
     *   create: {
     *     // ... data to create a OnboardingTask
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the OnboardingTask we want to update
     *   }
     * })
     */
    upsert<T extends OnboardingTaskUpsertArgs>(args: SelectSubset<T, OnboardingTaskUpsertArgs<ExtArgs>>): Prisma__OnboardingTaskClient<$Result.GetResult<Prisma.$OnboardingTaskPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of OnboardingTasks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OnboardingTaskCountArgs} args - Arguments to filter OnboardingTasks to count.
     * @example
     * // Count the number of OnboardingTasks
     * const count = await prisma.onboardingTask.count({
     *   where: {
     *     // ... the filter for the OnboardingTasks we want to count
     *   }
     * })
    **/
    count<T extends OnboardingTaskCountArgs>(
      args?: Subset<T, OnboardingTaskCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], OnboardingTaskCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a OnboardingTask.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OnboardingTaskAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends OnboardingTaskAggregateArgs>(args: Subset<T, OnboardingTaskAggregateArgs>): Prisma.PrismaPromise<GetOnboardingTaskAggregateType<T>>

    /**
     * Group by OnboardingTask.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OnboardingTaskGroupByArgs} args - Group by arguments.
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
      T extends OnboardingTaskGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: OnboardingTaskGroupByArgs['orderBy'] }
        : { orderBy?: OnboardingTaskGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, OnboardingTaskGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOnboardingTaskGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the OnboardingTask model
   */
  readonly fields: OnboardingTaskFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for OnboardingTask.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__OnboardingTaskClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    template<T extends OnboardingTask$templateArgs<ExtArgs> = {}>(args?: Subset<T, OnboardingTask$templateArgs<ExtArgs>>): Prisma__OnboardingTemplateClient<$Result.GetResult<Prisma.$OnboardingTemplatePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the OnboardingTask model
   */
  interface OnboardingTaskFieldRefs {
    readonly id: FieldRef<"OnboardingTask", 'String'>
    readonly template_id: FieldRef<"OnboardingTask", 'String'>
    readonly employee_id: FieldRef<"OnboardingTask", 'String'>
    readonly category: FieldRef<"OnboardingTask", 'String'>
    readonly title_en: FieldRef<"OnboardingTask", 'String'>
    readonly title_th: FieldRef<"OnboardingTask", 'String'>
    readonly description_en: FieldRef<"OnboardingTask", 'String'>
    readonly description_th: FieldRef<"OnboardingTask", 'String'>
    readonly required: FieldRef<"OnboardingTask", 'Boolean'>
    readonly status: FieldRef<"OnboardingTask", 'String'>
    readonly due_date: FieldRef<"OnboardingTask", 'DateTime'>
    readonly completed_date: FieldRef<"OnboardingTask", 'DateTime'>
    readonly completed_by: FieldRef<"OnboardingTask", 'String'>
    readonly assigned_to: FieldRef<"OnboardingTask", 'String'>
    readonly sort_order: FieldRef<"OnboardingTask", 'Int'>
    readonly created_at: FieldRef<"OnboardingTask", 'DateTime'>
    readonly updated_at: FieldRef<"OnboardingTask", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * OnboardingTask findUnique
   */
  export type OnboardingTaskFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OnboardingTask
     */
    select?: OnboardingTaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OnboardingTask
     */
    omit?: OnboardingTaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OnboardingTaskInclude<ExtArgs> | null
    /**
     * Filter, which OnboardingTask to fetch.
     */
    where: OnboardingTaskWhereUniqueInput
  }

  /**
   * OnboardingTask findUniqueOrThrow
   */
  export type OnboardingTaskFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OnboardingTask
     */
    select?: OnboardingTaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OnboardingTask
     */
    omit?: OnboardingTaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OnboardingTaskInclude<ExtArgs> | null
    /**
     * Filter, which OnboardingTask to fetch.
     */
    where: OnboardingTaskWhereUniqueInput
  }

  /**
   * OnboardingTask findFirst
   */
  export type OnboardingTaskFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OnboardingTask
     */
    select?: OnboardingTaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OnboardingTask
     */
    omit?: OnboardingTaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OnboardingTaskInclude<ExtArgs> | null
    /**
     * Filter, which OnboardingTask to fetch.
     */
    where?: OnboardingTaskWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OnboardingTasks to fetch.
     */
    orderBy?: OnboardingTaskOrderByWithRelationInput | OnboardingTaskOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OnboardingTasks.
     */
    cursor?: OnboardingTaskWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OnboardingTasks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OnboardingTasks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OnboardingTasks.
     */
    distinct?: OnboardingTaskScalarFieldEnum | OnboardingTaskScalarFieldEnum[]
  }

  /**
   * OnboardingTask findFirstOrThrow
   */
  export type OnboardingTaskFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OnboardingTask
     */
    select?: OnboardingTaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OnboardingTask
     */
    omit?: OnboardingTaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OnboardingTaskInclude<ExtArgs> | null
    /**
     * Filter, which OnboardingTask to fetch.
     */
    where?: OnboardingTaskWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OnboardingTasks to fetch.
     */
    orderBy?: OnboardingTaskOrderByWithRelationInput | OnboardingTaskOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OnboardingTasks.
     */
    cursor?: OnboardingTaskWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OnboardingTasks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OnboardingTasks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OnboardingTasks.
     */
    distinct?: OnboardingTaskScalarFieldEnum | OnboardingTaskScalarFieldEnum[]
  }

  /**
   * OnboardingTask findMany
   */
  export type OnboardingTaskFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OnboardingTask
     */
    select?: OnboardingTaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OnboardingTask
     */
    omit?: OnboardingTaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OnboardingTaskInclude<ExtArgs> | null
    /**
     * Filter, which OnboardingTasks to fetch.
     */
    where?: OnboardingTaskWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OnboardingTasks to fetch.
     */
    orderBy?: OnboardingTaskOrderByWithRelationInput | OnboardingTaskOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing OnboardingTasks.
     */
    cursor?: OnboardingTaskWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OnboardingTasks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OnboardingTasks.
     */
    skip?: number
    distinct?: OnboardingTaskScalarFieldEnum | OnboardingTaskScalarFieldEnum[]
  }

  /**
   * OnboardingTask create
   */
  export type OnboardingTaskCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OnboardingTask
     */
    select?: OnboardingTaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OnboardingTask
     */
    omit?: OnboardingTaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OnboardingTaskInclude<ExtArgs> | null
    /**
     * The data needed to create a OnboardingTask.
     */
    data: XOR<OnboardingTaskCreateInput, OnboardingTaskUncheckedCreateInput>
  }

  /**
   * OnboardingTask createMany
   */
  export type OnboardingTaskCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many OnboardingTasks.
     */
    data: OnboardingTaskCreateManyInput | OnboardingTaskCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * OnboardingTask createManyAndReturn
   */
  export type OnboardingTaskCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OnboardingTask
     */
    select?: OnboardingTaskSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the OnboardingTask
     */
    omit?: OnboardingTaskOmit<ExtArgs> | null
    /**
     * The data used to create many OnboardingTasks.
     */
    data: OnboardingTaskCreateManyInput | OnboardingTaskCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OnboardingTaskIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * OnboardingTask update
   */
  export type OnboardingTaskUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OnboardingTask
     */
    select?: OnboardingTaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OnboardingTask
     */
    omit?: OnboardingTaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OnboardingTaskInclude<ExtArgs> | null
    /**
     * The data needed to update a OnboardingTask.
     */
    data: XOR<OnboardingTaskUpdateInput, OnboardingTaskUncheckedUpdateInput>
    /**
     * Choose, which OnboardingTask to update.
     */
    where: OnboardingTaskWhereUniqueInput
  }

  /**
   * OnboardingTask updateMany
   */
  export type OnboardingTaskUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update OnboardingTasks.
     */
    data: XOR<OnboardingTaskUpdateManyMutationInput, OnboardingTaskUncheckedUpdateManyInput>
    /**
     * Filter which OnboardingTasks to update
     */
    where?: OnboardingTaskWhereInput
    /**
     * Limit how many OnboardingTasks to update.
     */
    limit?: number
  }

  /**
   * OnboardingTask updateManyAndReturn
   */
  export type OnboardingTaskUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OnboardingTask
     */
    select?: OnboardingTaskSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the OnboardingTask
     */
    omit?: OnboardingTaskOmit<ExtArgs> | null
    /**
     * The data used to update OnboardingTasks.
     */
    data: XOR<OnboardingTaskUpdateManyMutationInput, OnboardingTaskUncheckedUpdateManyInput>
    /**
     * Filter which OnboardingTasks to update
     */
    where?: OnboardingTaskWhereInput
    /**
     * Limit how many OnboardingTasks to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OnboardingTaskIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * OnboardingTask upsert
   */
  export type OnboardingTaskUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OnboardingTask
     */
    select?: OnboardingTaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OnboardingTask
     */
    omit?: OnboardingTaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OnboardingTaskInclude<ExtArgs> | null
    /**
     * The filter to search for the OnboardingTask to update in case it exists.
     */
    where: OnboardingTaskWhereUniqueInput
    /**
     * In case the OnboardingTask found by the `where` argument doesn't exist, create a new OnboardingTask with this data.
     */
    create: XOR<OnboardingTaskCreateInput, OnboardingTaskUncheckedCreateInput>
    /**
     * In case the OnboardingTask was found with the provided `where` argument, update it with this data.
     */
    update: XOR<OnboardingTaskUpdateInput, OnboardingTaskUncheckedUpdateInput>
  }

  /**
   * OnboardingTask delete
   */
  export type OnboardingTaskDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OnboardingTask
     */
    select?: OnboardingTaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OnboardingTask
     */
    omit?: OnboardingTaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OnboardingTaskInclude<ExtArgs> | null
    /**
     * Filter which OnboardingTask to delete.
     */
    where: OnboardingTaskWhereUniqueInput
  }

  /**
   * OnboardingTask deleteMany
   */
  export type OnboardingTaskDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which OnboardingTasks to delete
     */
    where?: OnboardingTaskWhereInput
    /**
     * Limit how many OnboardingTasks to delete.
     */
    limit?: number
  }

  /**
   * OnboardingTask.template
   */
  export type OnboardingTask$templateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OnboardingTemplate
     */
    select?: OnboardingTemplateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OnboardingTemplate
     */
    omit?: OnboardingTemplateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OnboardingTemplateInclude<ExtArgs> | null
    where?: OnboardingTemplateWhereInput
  }

  /**
   * OnboardingTask without action
   */
  export type OnboardingTaskDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OnboardingTask
     */
    select?: OnboardingTaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OnboardingTask
     */
    omit?: OnboardingTaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OnboardingTaskInclude<ExtArgs> | null
  }


  /**
   * Model Resignation
   */

  export type AggregateResignation = {
    _count: ResignationCountAggregateOutputType | null
    _avg: ResignationAvgAggregateOutputType | null
    _sum: ResignationSumAggregateOutputType | null
    _min: ResignationMinAggregateOutputType | null
    _max: ResignationMaxAggregateOutputType | null
  }

  export type ResignationAvgAggregateOutputType = {
    settlement_amount: number | null
  }

  export type ResignationSumAggregateOutputType = {
    settlement_amount: number | null
  }

  export type ResignationMinAggregateOutputType = {
    id: string | null
    employee_id: string | null
    employee_name: string | null
    department: string | null
    position: string | null
    submission_date: Date | null
    last_working_date: Date | null
    reason_type: string | null
    reason_detail: string | null
    status: string | null
    manager_id: string | null
    manager_approved_at: Date | null
    manager_comments: string | null
    hr_clearance_completed: boolean | null
    hr_clearance_date: Date | null
    settlement_amount: number | null
    settlement_date: Date | null
    exit_interview_date: Date | null
    exit_interview_notes: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type ResignationMaxAggregateOutputType = {
    id: string | null
    employee_id: string | null
    employee_name: string | null
    department: string | null
    position: string | null
    submission_date: Date | null
    last_working_date: Date | null
    reason_type: string | null
    reason_detail: string | null
    status: string | null
    manager_id: string | null
    manager_approved_at: Date | null
    manager_comments: string | null
    hr_clearance_completed: boolean | null
    hr_clearance_date: Date | null
    settlement_amount: number | null
    settlement_date: Date | null
    exit_interview_date: Date | null
    exit_interview_notes: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type ResignationCountAggregateOutputType = {
    id: number
    employee_id: number
    employee_name: number
    department: number
    position: number
    submission_date: number
    last_working_date: number
    reason_type: number
    reason_detail: number
    status: number
    manager_id: number
    manager_approved_at: number
    manager_comments: number
    hr_clearance_completed: number
    hr_clearance_date: number
    settlement_amount: number
    settlement_date: number
    exit_interview_date: number
    exit_interview_notes: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type ResignationAvgAggregateInputType = {
    settlement_amount?: true
  }

  export type ResignationSumAggregateInputType = {
    settlement_amount?: true
  }

  export type ResignationMinAggregateInputType = {
    id?: true
    employee_id?: true
    employee_name?: true
    department?: true
    position?: true
    submission_date?: true
    last_working_date?: true
    reason_type?: true
    reason_detail?: true
    status?: true
    manager_id?: true
    manager_approved_at?: true
    manager_comments?: true
    hr_clearance_completed?: true
    hr_clearance_date?: true
    settlement_amount?: true
    settlement_date?: true
    exit_interview_date?: true
    exit_interview_notes?: true
    created_at?: true
    updated_at?: true
  }

  export type ResignationMaxAggregateInputType = {
    id?: true
    employee_id?: true
    employee_name?: true
    department?: true
    position?: true
    submission_date?: true
    last_working_date?: true
    reason_type?: true
    reason_detail?: true
    status?: true
    manager_id?: true
    manager_approved_at?: true
    manager_comments?: true
    hr_clearance_completed?: true
    hr_clearance_date?: true
    settlement_amount?: true
    settlement_date?: true
    exit_interview_date?: true
    exit_interview_notes?: true
    created_at?: true
    updated_at?: true
  }

  export type ResignationCountAggregateInputType = {
    id?: true
    employee_id?: true
    employee_name?: true
    department?: true
    position?: true
    submission_date?: true
    last_working_date?: true
    reason_type?: true
    reason_detail?: true
    status?: true
    manager_id?: true
    manager_approved_at?: true
    manager_comments?: true
    hr_clearance_completed?: true
    hr_clearance_date?: true
    settlement_amount?: true
    settlement_date?: true
    exit_interview_date?: true
    exit_interview_notes?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type ResignationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Resignation to aggregate.
     */
    where?: ResignationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Resignations to fetch.
     */
    orderBy?: ResignationOrderByWithRelationInput | ResignationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ResignationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Resignations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Resignations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Resignations
    **/
    _count?: true | ResignationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ResignationAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ResignationSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ResignationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ResignationMaxAggregateInputType
  }

  export type GetResignationAggregateType<T extends ResignationAggregateArgs> = {
        [P in keyof T & keyof AggregateResignation]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateResignation[P]>
      : GetScalarType<T[P], AggregateResignation[P]>
  }




  export type ResignationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ResignationWhereInput
    orderBy?: ResignationOrderByWithAggregationInput | ResignationOrderByWithAggregationInput[]
    by: ResignationScalarFieldEnum[] | ResignationScalarFieldEnum
    having?: ResignationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ResignationCountAggregateInputType | true
    _avg?: ResignationAvgAggregateInputType
    _sum?: ResignationSumAggregateInputType
    _min?: ResignationMinAggregateInputType
    _max?: ResignationMaxAggregateInputType
  }

  export type ResignationGroupByOutputType = {
    id: string
    employee_id: string
    employee_name: string
    department: string | null
    position: string | null
    submission_date: Date
    last_working_date: Date
    reason_type: string
    reason_detail: string | null
    status: string
    manager_id: string | null
    manager_approved_at: Date | null
    manager_comments: string | null
    hr_clearance_completed: boolean
    hr_clearance_date: Date | null
    settlement_amount: number | null
    settlement_date: Date | null
    exit_interview_date: Date | null
    exit_interview_notes: string | null
    created_at: Date
    updated_at: Date
    _count: ResignationCountAggregateOutputType | null
    _avg: ResignationAvgAggregateOutputType | null
    _sum: ResignationSumAggregateOutputType | null
    _min: ResignationMinAggregateOutputType | null
    _max: ResignationMaxAggregateOutputType | null
  }

  type GetResignationGroupByPayload<T extends ResignationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ResignationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ResignationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ResignationGroupByOutputType[P]>
            : GetScalarType<T[P], ResignationGroupByOutputType[P]>
        }
      >
    >


  export type ResignationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    employee_id?: boolean
    employee_name?: boolean
    department?: boolean
    position?: boolean
    submission_date?: boolean
    last_working_date?: boolean
    reason_type?: boolean
    reason_detail?: boolean
    status?: boolean
    manager_id?: boolean
    manager_approved_at?: boolean
    manager_comments?: boolean
    hr_clearance_completed?: boolean
    hr_clearance_date?: boolean
    settlement_amount?: boolean
    settlement_date?: boolean
    exit_interview_date?: boolean
    exit_interview_notes?: boolean
    created_at?: boolean
    updated_at?: boolean
    clearance_items?: boolean | Resignation$clearance_itemsArgs<ExtArgs>
    _count?: boolean | ResignationCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["resignation"]>

  export type ResignationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    employee_id?: boolean
    employee_name?: boolean
    department?: boolean
    position?: boolean
    submission_date?: boolean
    last_working_date?: boolean
    reason_type?: boolean
    reason_detail?: boolean
    status?: boolean
    manager_id?: boolean
    manager_approved_at?: boolean
    manager_comments?: boolean
    hr_clearance_completed?: boolean
    hr_clearance_date?: boolean
    settlement_amount?: boolean
    settlement_date?: boolean
    exit_interview_date?: boolean
    exit_interview_notes?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["resignation"]>

  export type ResignationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    employee_id?: boolean
    employee_name?: boolean
    department?: boolean
    position?: boolean
    submission_date?: boolean
    last_working_date?: boolean
    reason_type?: boolean
    reason_detail?: boolean
    status?: boolean
    manager_id?: boolean
    manager_approved_at?: boolean
    manager_comments?: boolean
    hr_clearance_completed?: boolean
    hr_clearance_date?: boolean
    settlement_amount?: boolean
    settlement_date?: boolean
    exit_interview_date?: boolean
    exit_interview_notes?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["resignation"]>

  export type ResignationSelectScalar = {
    id?: boolean
    employee_id?: boolean
    employee_name?: boolean
    department?: boolean
    position?: boolean
    submission_date?: boolean
    last_working_date?: boolean
    reason_type?: boolean
    reason_detail?: boolean
    status?: boolean
    manager_id?: boolean
    manager_approved_at?: boolean
    manager_comments?: boolean
    hr_clearance_completed?: boolean
    hr_clearance_date?: boolean
    settlement_amount?: boolean
    settlement_date?: boolean
    exit_interview_date?: boolean
    exit_interview_notes?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type ResignationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "employee_id" | "employee_name" | "department" | "position" | "submission_date" | "last_working_date" | "reason_type" | "reason_detail" | "status" | "manager_id" | "manager_approved_at" | "manager_comments" | "hr_clearance_completed" | "hr_clearance_date" | "settlement_amount" | "settlement_date" | "exit_interview_date" | "exit_interview_notes" | "created_at" | "updated_at", ExtArgs["result"]["resignation"]>
  export type ResignationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    clearance_items?: boolean | Resignation$clearance_itemsArgs<ExtArgs>
    _count?: boolean | ResignationCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ResignationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type ResignationIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $ResignationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Resignation"
    objects: {
      clearance_items: Prisma.$ClearanceItemPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      employee_id: string
      employee_name: string
      department: string | null
      position: string | null
      submission_date: Date
      last_working_date: Date
      reason_type: string
      reason_detail: string | null
      status: string
      manager_id: string | null
      manager_approved_at: Date | null
      manager_comments: string | null
      hr_clearance_completed: boolean
      hr_clearance_date: Date | null
      settlement_amount: number | null
      settlement_date: Date | null
      exit_interview_date: Date | null
      exit_interview_notes: string | null
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["resignation"]>
    composites: {}
  }

  type ResignationGetPayload<S extends boolean | null | undefined | ResignationDefaultArgs> = $Result.GetResult<Prisma.$ResignationPayload, S>

  type ResignationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ResignationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ResignationCountAggregateInputType | true
    }

  export interface ResignationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Resignation'], meta: { name: 'Resignation' } }
    /**
     * Find zero or one Resignation that matches the filter.
     * @param {ResignationFindUniqueArgs} args - Arguments to find a Resignation
     * @example
     * // Get one Resignation
     * const resignation = await prisma.resignation.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ResignationFindUniqueArgs>(args: SelectSubset<T, ResignationFindUniqueArgs<ExtArgs>>): Prisma__ResignationClient<$Result.GetResult<Prisma.$ResignationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Resignation that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ResignationFindUniqueOrThrowArgs} args - Arguments to find a Resignation
     * @example
     * // Get one Resignation
     * const resignation = await prisma.resignation.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ResignationFindUniqueOrThrowArgs>(args: SelectSubset<T, ResignationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ResignationClient<$Result.GetResult<Prisma.$ResignationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Resignation that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResignationFindFirstArgs} args - Arguments to find a Resignation
     * @example
     * // Get one Resignation
     * const resignation = await prisma.resignation.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ResignationFindFirstArgs>(args?: SelectSubset<T, ResignationFindFirstArgs<ExtArgs>>): Prisma__ResignationClient<$Result.GetResult<Prisma.$ResignationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Resignation that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResignationFindFirstOrThrowArgs} args - Arguments to find a Resignation
     * @example
     * // Get one Resignation
     * const resignation = await prisma.resignation.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ResignationFindFirstOrThrowArgs>(args?: SelectSubset<T, ResignationFindFirstOrThrowArgs<ExtArgs>>): Prisma__ResignationClient<$Result.GetResult<Prisma.$ResignationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Resignations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResignationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Resignations
     * const resignations = await prisma.resignation.findMany()
     * 
     * // Get first 10 Resignations
     * const resignations = await prisma.resignation.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const resignationWithIdOnly = await prisma.resignation.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ResignationFindManyArgs>(args?: SelectSubset<T, ResignationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ResignationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Resignation.
     * @param {ResignationCreateArgs} args - Arguments to create a Resignation.
     * @example
     * // Create one Resignation
     * const Resignation = await prisma.resignation.create({
     *   data: {
     *     // ... data to create a Resignation
     *   }
     * })
     * 
     */
    create<T extends ResignationCreateArgs>(args: SelectSubset<T, ResignationCreateArgs<ExtArgs>>): Prisma__ResignationClient<$Result.GetResult<Prisma.$ResignationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Resignations.
     * @param {ResignationCreateManyArgs} args - Arguments to create many Resignations.
     * @example
     * // Create many Resignations
     * const resignation = await prisma.resignation.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ResignationCreateManyArgs>(args?: SelectSubset<T, ResignationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Resignations and returns the data saved in the database.
     * @param {ResignationCreateManyAndReturnArgs} args - Arguments to create many Resignations.
     * @example
     * // Create many Resignations
     * const resignation = await prisma.resignation.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Resignations and only return the `id`
     * const resignationWithIdOnly = await prisma.resignation.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ResignationCreateManyAndReturnArgs>(args?: SelectSubset<T, ResignationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ResignationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Resignation.
     * @param {ResignationDeleteArgs} args - Arguments to delete one Resignation.
     * @example
     * // Delete one Resignation
     * const Resignation = await prisma.resignation.delete({
     *   where: {
     *     // ... filter to delete one Resignation
     *   }
     * })
     * 
     */
    delete<T extends ResignationDeleteArgs>(args: SelectSubset<T, ResignationDeleteArgs<ExtArgs>>): Prisma__ResignationClient<$Result.GetResult<Prisma.$ResignationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Resignation.
     * @param {ResignationUpdateArgs} args - Arguments to update one Resignation.
     * @example
     * // Update one Resignation
     * const resignation = await prisma.resignation.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ResignationUpdateArgs>(args: SelectSubset<T, ResignationUpdateArgs<ExtArgs>>): Prisma__ResignationClient<$Result.GetResult<Prisma.$ResignationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Resignations.
     * @param {ResignationDeleteManyArgs} args - Arguments to filter Resignations to delete.
     * @example
     * // Delete a few Resignations
     * const { count } = await prisma.resignation.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ResignationDeleteManyArgs>(args?: SelectSubset<T, ResignationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Resignations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResignationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Resignations
     * const resignation = await prisma.resignation.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ResignationUpdateManyArgs>(args: SelectSubset<T, ResignationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Resignations and returns the data updated in the database.
     * @param {ResignationUpdateManyAndReturnArgs} args - Arguments to update many Resignations.
     * @example
     * // Update many Resignations
     * const resignation = await prisma.resignation.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Resignations and only return the `id`
     * const resignationWithIdOnly = await prisma.resignation.updateManyAndReturn({
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
    updateManyAndReturn<T extends ResignationUpdateManyAndReturnArgs>(args: SelectSubset<T, ResignationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ResignationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Resignation.
     * @param {ResignationUpsertArgs} args - Arguments to update or create a Resignation.
     * @example
     * // Update or create a Resignation
     * const resignation = await prisma.resignation.upsert({
     *   create: {
     *     // ... data to create a Resignation
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Resignation we want to update
     *   }
     * })
     */
    upsert<T extends ResignationUpsertArgs>(args: SelectSubset<T, ResignationUpsertArgs<ExtArgs>>): Prisma__ResignationClient<$Result.GetResult<Prisma.$ResignationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Resignations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResignationCountArgs} args - Arguments to filter Resignations to count.
     * @example
     * // Count the number of Resignations
     * const count = await prisma.resignation.count({
     *   where: {
     *     // ... the filter for the Resignations we want to count
     *   }
     * })
    **/
    count<T extends ResignationCountArgs>(
      args?: Subset<T, ResignationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ResignationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Resignation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResignationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ResignationAggregateArgs>(args: Subset<T, ResignationAggregateArgs>): Prisma.PrismaPromise<GetResignationAggregateType<T>>

    /**
     * Group by Resignation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResignationGroupByArgs} args - Group by arguments.
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
      T extends ResignationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ResignationGroupByArgs['orderBy'] }
        : { orderBy?: ResignationGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ResignationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetResignationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Resignation model
   */
  readonly fields: ResignationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Resignation.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ResignationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    clearance_items<T extends Resignation$clearance_itemsArgs<ExtArgs> = {}>(args?: Subset<T, Resignation$clearance_itemsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClearanceItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Resignation model
   */
  interface ResignationFieldRefs {
    readonly id: FieldRef<"Resignation", 'String'>
    readonly employee_id: FieldRef<"Resignation", 'String'>
    readonly employee_name: FieldRef<"Resignation", 'String'>
    readonly department: FieldRef<"Resignation", 'String'>
    readonly position: FieldRef<"Resignation", 'String'>
    readonly submission_date: FieldRef<"Resignation", 'DateTime'>
    readonly last_working_date: FieldRef<"Resignation", 'DateTime'>
    readonly reason_type: FieldRef<"Resignation", 'String'>
    readonly reason_detail: FieldRef<"Resignation", 'String'>
    readonly status: FieldRef<"Resignation", 'String'>
    readonly manager_id: FieldRef<"Resignation", 'String'>
    readonly manager_approved_at: FieldRef<"Resignation", 'DateTime'>
    readonly manager_comments: FieldRef<"Resignation", 'String'>
    readonly hr_clearance_completed: FieldRef<"Resignation", 'Boolean'>
    readonly hr_clearance_date: FieldRef<"Resignation", 'DateTime'>
    readonly settlement_amount: FieldRef<"Resignation", 'Float'>
    readonly settlement_date: FieldRef<"Resignation", 'DateTime'>
    readonly exit_interview_date: FieldRef<"Resignation", 'DateTime'>
    readonly exit_interview_notes: FieldRef<"Resignation", 'String'>
    readonly created_at: FieldRef<"Resignation", 'DateTime'>
    readonly updated_at: FieldRef<"Resignation", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Resignation findUnique
   */
  export type ResignationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Resignation
     */
    select?: ResignationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Resignation
     */
    omit?: ResignationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResignationInclude<ExtArgs> | null
    /**
     * Filter, which Resignation to fetch.
     */
    where: ResignationWhereUniqueInput
  }

  /**
   * Resignation findUniqueOrThrow
   */
  export type ResignationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Resignation
     */
    select?: ResignationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Resignation
     */
    omit?: ResignationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResignationInclude<ExtArgs> | null
    /**
     * Filter, which Resignation to fetch.
     */
    where: ResignationWhereUniqueInput
  }

  /**
   * Resignation findFirst
   */
  export type ResignationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Resignation
     */
    select?: ResignationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Resignation
     */
    omit?: ResignationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResignationInclude<ExtArgs> | null
    /**
     * Filter, which Resignation to fetch.
     */
    where?: ResignationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Resignations to fetch.
     */
    orderBy?: ResignationOrderByWithRelationInput | ResignationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Resignations.
     */
    cursor?: ResignationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Resignations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Resignations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Resignations.
     */
    distinct?: ResignationScalarFieldEnum | ResignationScalarFieldEnum[]
  }

  /**
   * Resignation findFirstOrThrow
   */
  export type ResignationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Resignation
     */
    select?: ResignationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Resignation
     */
    omit?: ResignationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResignationInclude<ExtArgs> | null
    /**
     * Filter, which Resignation to fetch.
     */
    where?: ResignationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Resignations to fetch.
     */
    orderBy?: ResignationOrderByWithRelationInput | ResignationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Resignations.
     */
    cursor?: ResignationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Resignations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Resignations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Resignations.
     */
    distinct?: ResignationScalarFieldEnum | ResignationScalarFieldEnum[]
  }

  /**
   * Resignation findMany
   */
  export type ResignationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Resignation
     */
    select?: ResignationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Resignation
     */
    omit?: ResignationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResignationInclude<ExtArgs> | null
    /**
     * Filter, which Resignations to fetch.
     */
    where?: ResignationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Resignations to fetch.
     */
    orderBy?: ResignationOrderByWithRelationInput | ResignationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Resignations.
     */
    cursor?: ResignationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Resignations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Resignations.
     */
    skip?: number
    distinct?: ResignationScalarFieldEnum | ResignationScalarFieldEnum[]
  }

  /**
   * Resignation create
   */
  export type ResignationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Resignation
     */
    select?: ResignationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Resignation
     */
    omit?: ResignationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResignationInclude<ExtArgs> | null
    /**
     * The data needed to create a Resignation.
     */
    data: XOR<ResignationCreateInput, ResignationUncheckedCreateInput>
  }

  /**
   * Resignation createMany
   */
  export type ResignationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Resignations.
     */
    data: ResignationCreateManyInput | ResignationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Resignation createManyAndReturn
   */
  export type ResignationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Resignation
     */
    select?: ResignationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Resignation
     */
    omit?: ResignationOmit<ExtArgs> | null
    /**
     * The data used to create many Resignations.
     */
    data: ResignationCreateManyInput | ResignationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Resignation update
   */
  export type ResignationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Resignation
     */
    select?: ResignationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Resignation
     */
    omit?: ResignationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResignationInclude<ExtArgs> | null
    /**
     * The data needed to update a Resignation.
     */
    data: XOR<ResignationUpdateInput, ResignationUncheckedUpdateInput>
    /**
     * Choose, which Resignation to update.
     */
    where: ResignationWhereUniqueInput
  }

  /**
   * Resignation updateMany
   */
  export type ResignationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Resignations.
     */
    data: XOR<ResignationUpdateManyMutationInput, ResignationUncheckedUpdateManyInput>
    /**
     * Filter which Resignations to update
     */
    where?: ResignationWhereInput
    /**
     * Limit how many Resignations to update.
     */
    limit?: number
  }

  /**
   * Resignation updateManyAndReturn
   */
  export type ResignationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Resignation
     */
    select?: ResignationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Resignation
     */
    omit?: ResignationOmit<ExtArgs> | null
    /**
     * The data used to update Resignations.
     */
    data: XOR<ResignationUpdateManyMutationInput, ResignationUncheckedUpdateManyInput>
    /**
     * Filter which Resignations to update
     */
    where?: ResignationWhereInput
    /**
     * Limit how many Resignations to update.
     */
    limit?: number
  }

  /**
   * Resignation upsert
   */
  export type ResignationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Resignation
     */
    select?: ResignationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Resignation
     */
    omit?: ResignationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResignationInclude<ExtArgs> | null
    /**
     * The filter to search for the Resignation to update in case it exists.
     */
    where: ResignationWhereUniqueInput
    /**
     * In case the Resignation found by the `where` argument doesn't exist, create a new Resignation with this data.
     */
    create: XOR<ResignationCreateInput, ResignationUncheckedCreateInput>
    /**
     * In case the Resignation was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ResignationUpdateInput, ResignationUncheckedUpdateInput>
  }

  /**
   * Resignation delete
   */
  export type ResignationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Resignation
     */
    select?: ResignationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Resignation
     */
    omit?: ResignationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResignationInclude<ExtArgs> | null
    /**
     * Filter which Resignation to delete.
     */
    where: ResignationWhereUniqueInput
  }

  /**
   * Resignation deleteMany
   */
  export type ResignationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Resignations to delete
     */
    where?: ResignationWhereInput
    /**
     * Limit how many Resignations to delete.
     */
    limit?: number
  }

  /**
   * Resignation.clearance_items
   */
  export type Resignation$clearance_itemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClearanceItem
     */
    select?: ClearanceItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClearanceItem
     */
    omit?: ClearanceItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClearanceItemInclude<ExtArgs> | null
    where?: ClearanceItemWhereInput
    orderBy?: ClearanceItemOrderByWithRelationInput | ClearanceItemOrderByWithRelationInput[]
    cursor?: ClearanceItemWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ClearanceItemScalarFieldEnum | ClearanceItemScalarFieldEnum[]
  }

  /**
   * Resignation without action
   */
  export type ResignationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Resignation
     */
    select?: ResignationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Resignation
     */
    omit?: ResignationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResignationInclude<ExtArgs> | null
  }


  /**
   * Model ClearanceItem
   */

  export type AggregateClearanceItem = {
    _count: ClearanceItemCountAggregateOutputType | null
    _min: ClearanceItemMinAggregateOutputType | null
    _max: ClearanceItemMaxAggregateOutputType | null
  }

  export type ClearanceItemMinAggregateOutputType = {
    id: string | null
    resignation_id: string | null
    category: string | null
    item_name: string | null
    item_name_th: string | null
    required: boolean | null
    status: string | null
    completed_date: Date | null
    completed_by: string | null
    notes: string | null
  }

  export type ClearanceItemMaxAggregateOutputType = {
    id: string | null
    resignation_id: string | null
    category: string | null
    item_name: string | null
    item_name_th: string | null
    required: boolean | null
    status: string | null
    completed_date: Date | null
    completed_by: string | null
    notes: string | null
  }

  export type ClearanceItemCountAggregateOutputType = {
    id: number
    resignation_id: number
    category: number
    item_name: number
    item_name_th: number
    required: number
    status: number
    completed_date: number
    completed_by: number
    notes: number
    _all: number
  }


  export type ClearanceItemMinAggregateInputType = {
    id?: true
    resignation_id?: true
    category?: true
    item_name?: true
    item_name_th?: true
    required?: true
    status?: true
    completed_date?: true
    completed_by?: true
    notes?: true
  }

  export type ClearanceItemMaxAggregateInputType = {
    id?: true
    resignation_id?: true
    category?: true
    item_name?: true
    item_name_th?: true
    required?: true
    status?: true
    completed_date?: true
    completed_by?: true
    notes?: true
  }

  export type ClearanceItemCountAggregateInputType = {
    id?: true
    resignation_id?: true
    category?: true
    item_name?: true
    item_name_th?: true
    required?: true
    status?: true
    completed_date?: true
    completed_by?: true
    notes?: true
    _all?: true
  }

  export type ClearanceItemAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ClearanceItem to aggregate.
     */
    where?: ClearanceItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ClearanceItems to fetch.
     */
    orderBy?: ClearanceItemOrderByWithRelationInput | ClearanceItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ClearanceItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ClearanceItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ClearanceItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ClearanceItems
    **/
    _count?: true | ClearanceItemCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ClearanceItemMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ClearanceItemMaxAggregateInputType
  }

  export type GetClearanceItemAggregateType<T extends ClearanceItemAggregateArgs> = {
        [P in keyof T & keyof AggregateClearanceItem]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateClearanceItem[P]>
      : GetScalarType<T[P], AggregateClearanceItem[P]>
  }




  export type ClearanceItemGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ClearanceItemWhereInput
    orderBy?: ClearanceItemOrderByWithAggregationInput | ClearanceItemOrderByWithAggregationInput[]
    by: ClearanceItemScalarFieldEnum[] | ClearanceItemScalarFieldEnum
    having?: ClearanceItemScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ClearanceItemCountAggregateInputType | true
    _min?: ClearanceItemMinAggregateInputType
    _max?: ClearanceItemMaxAggregateInputType
  }

  export type ClearanceItemGroupByOutputType = {
    id: string
    resignation_id: string
    category: string
    item_name: string
    item_name_th: string | null
    required: boolean
    status: string
    completed_date: Date | null
    completed_by: string | null
    notes: string | null
    _count: ClearanceItemCountAggregateOutputType | null
    _min: ClearanceItemMinAggregateOutputType | null
    _max: ClearanceItemMaxAggregateOutputType | null
  }

  type GetClearanceItemGroupByPayload<T extends ClearanceItemGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ClearanceItemGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ClearanceItemGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ClearanceItemGroupByOutputType[P]>
            : GetScalarType<T[P], ClearanceItemGroupByOutputType[P]>
        }
      >
    >


  export type ClearanceItemSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    resignation_id?: boolean
    category?: boolean
    item_name?: boolean
    item_name_th?: boolean
    required?: boolean
    status?: boolean
    completed_date?: boolean
    completed_by?: boolean
    notes?: boolean
    resignation?: boolean | ResignationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["clearanceItem"]>

  export type ClearanceItemSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    resignation_id?: boolean
    category?: boolean
    item_name?: boolean
    item_name_th?: boolean
    required?: boolean
    status?: boolean
    completed_date?: boolean
    completed_by?: boolean
    notes?: boolean
    resignation?: boolean | ResignationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["clearanceItem"]>

  export type ClearanceItemSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    resignation_id?: boolean
    category?: boolean
    item_name?: boolean
    item_name_th?: boolean
    required?: boolean
    status?: boolean
    completed_date?: boolean
    completed_by?: boolean
    notes?: boolean
    resignation?: boolean | ResignationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["clearanceItem"]>

  export type ClearanceItemSelectScalar = {
    id?: boolean
    resignation_id?: boolean
    category?: boolean
    item_name?: boolean
    item_name_th?: boolean
    required?: boolean
    status?: boolean
    completed_date?: boolean
    completed_by?: boolean
    notes?: boolean
  }

  export type ClearanceItemOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "resignation_id" | "category" | "item_name" | "item_name_th" | "required" | "status" | "completed_date" | "completed_by" | "notes", ExtArgs["result"]["clearanceItem"]>
  export type ClearanceItemInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    resignation?: boolean | ResignationDefaultArgs<ExtArgs>
  }
  export type ClearanceItemIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    resignation?: boolean | ResignationDefaultArgs<ExtArgs>
  }
  export type ClearanceItemIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    resignation?: boolean | ResignationDefaultArgs<ExtArgs>
  }

  export type $ClearanceItemPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ClearanceItem"
    objects: {
      resignation: Prisma.$ResignationPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      resignation_id: string
      category: string
      item_name: string
      item_name_th: string | null
      required: boolean
      status: string
      completed_date: Date | null
      completed_by: string | null
      notes: string | null
    }, ExtArgs["result"]["clearanceItem"]>
    composites: {}
  }

  type ClearanceItemGetPayload<S extends boolean | null | undefined | ClearanceItemDefaultArgs> = $Result.GetResult<Prisma.$ClearanceItemPayload, S>

  type ClearanceItemCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ClearanceItemFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ClearanceItemCountAggregateInputType | true
    }

  export interface ClearanceItemDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ClearanceItem'], meta: { name: 'ClearanceItem' } }
    /**
     * Find zero or one ClearanceItem that matches the filter.
     * @param {ClearanceItemFindUniqueArgs} args - Arguments to find a ClearanceItem
     * @example
     * // Get one ClearanceItem
     * const clearanceItem = await prisma.clearanceItem.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ClearanceItemFindUniqueArgs>(args: SelectSubset<T, ClearanceItemFindUniqueArgs<ExtArgs>>): Prisma__ClearanceItemClient<$Result.GetResult<Prisma.$ClearanceItemPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ClearanceItem that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ClearanceItemFindUniqueOrThrowArgs} args - Arguments to find a ClearanceItem
     * @example
     * // Get one ClearanceItem
     * const clearanceItem = await prisma.clearanceItem.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ClearanceItemFindUniqueOrThrowArgs>(args: SelectSubset<T, ClearanceItemFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ClearanceItemClient<$Result.GetResult<Prisma.$ClearanceItemPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ClearanceItem that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClearanceItemFindFirstArgs} args - Arguments to find a ClearanceItem
     * @example
     * // Get one ClearanceItem
     * const clearanceItem = await prisma.clearanceItem.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ClearanceItemFindFirstArgs>(args?: SelectSubset<T, ClearanceItemFindFirstArgs<ExtArgs>>): Prisma__ClearanceItemClient<$Result.GetResult<Prisma.$ClearanceItemPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ClearanceItem that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClearanceItemFindFirstOrThrowArgs} args - Arguments to find a ClearanceItem
     * @example
     * // Get one ClearanceItem
     * const clearanceItem = await prisma.clearanceItem.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ClearanceItemFindFirstOrThrowArgs>(args?: SelectSubset<T, ClearanceItemFindFirstOrThrowArgs<ExtArgs>>): Prisma__ClearanceItemClient<$Result.GetResult<Prisma.$ClearanceItemPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ClearanceItems that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClearanceItemFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ClearanceItems
     * const clearanceItems = await prisma.clearanceItem.findMany()
     * 
     * // Get first 10 ClearanceItems
     * const clearanceItems = await prisma.clearanceItem.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const clearanceItemWithIdOnly = await prisma.clearanceItem.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ClearanceItemFindManyArgs>(args?: SelectSubset<T, ClearanceItemFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClearanceItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ClearanceItem.
     * @param {ClearanceItemCreateArgs} args - Arguments to create a ClearanceItem.
     * @example
     * // Create one ClearanceItem
     * const ClearanceItem = await prisma.clearanceItem.create({
     *   data: {
     *     // ... data to create a ClearanceItem
     *   }
     * })
     * 
     */
    create<T extends ClearanceItemCreateArgs>(args: SelectSubset<T, ClearanceItemCreateArgs<ExtArgs>>): Prisma__ClearanceItemClient<$Result.GetResult<Prisma.$ClearanceItemPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ClearanceItems.
     * @param {ClearanceItemCreateManyArgs} args - Arguments to create many ClearanceItems.
     * @example
     * // Create many ClearanceItems
     * const clearanceItem = await prisma.clearanceItem.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ClearanceItemCreateManyArgs>(args?: SelectSubset<T, ClearanceItemCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ClearanceItems and returns the data saved in the database.
     * @param {ClearanceItemCreateManyAndReturnArgs} args - Arguments to create many ClearanceItems.
     * @example
     * // Create many ClearanceItems
     * const clearanceItem = await prisma.clearanceItem.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ClearanceItems and only return the `id`
     * const clearanceItemWithIdOnly = await prisma.clearanceItem.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ClearanceItemCreateManyAndReturnArgs>(args?: SelectSubset<T, ClearanceItemCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClearanceItemPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ClearanceItem.
     * @param {ClearanceItemDeleteArgs} args - Arguments to delete one ClearanceItem.
     * @example
     * // Delete one ClearanceItem
     * const ClearanceItem = await prisma.clearanceItem.delete({
     *   where: {
     *     // ... filter to delete one ClearanceItem
     *   }
     * })
     * 
     */
    delete<T extends ClearanceItemDeleteArgs>(args: SelectSubset<T, ClearanceItemDeleteArgs<ExtArgs>>): Prisma__ClearanceItemClient<$Result.GetResult<Prisma.$ClearanceItemPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ClearanceItem.
     * @param {ClearanceItemUpdateArgs} args - Arguments to update one ClearanceItem.
     * @example
     * // Update one ClearanceItem
     * const clearanceItem = await prisma.clearanceItem.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ClearanceItemUpdateArgs>(args: SelectSubset<T, ClearanceItemUpdateArgs<ExtArgs>>): Prisma__ClearanceItemClient<$Result.GetResult<Prisma.$ClearanceItemPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ClearanceItems.
     * @param {ClearanceItemDeleteManyArgs} args - Arguments to filter ClearanceItems to delete.
     * @example
     * // Delete a few ClearanceItems
     * const { count } = await prisma.clearanceItem.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ClearanceItemDeleteManyArgs>(args?: SelectSubset<T, ClearanceItemDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ClearanceItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClearanceItemUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ClearanceItems
     * const clearanceItem = await prisma.clearanceItem.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ClearanceItemUpdateManyArgs>(args: SelectSubset<T, ClearanceItemUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ClearanceItems and returns the data updated in the database.
     * @param {ClearanceItemUpdateManyAndReturnArgs} args - Arguments to update many ClearanceItems.
     * @example
     * // Update many ClearanceItems
     * const clearanceItem = await prisma.clearanceItem.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ClearanceItems and only return the `id`
     * const clearanceItemWithIdOnly = await prisma.clearanceItem.updateManyAndReturn({
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
    updateManyAndReturn<T extends ClearanceItemUpdateManyAndReturnArgs>(args: SelectSubset<T, ClearanceItemUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClearanceItemPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ClearanceItem.
     * @param {ClearanceItemUpsertArgs} args - Arguments to update or create a ClearanceItem.
     * @example
     * // Update or create a ClearanceItem
     * const clearanceItem = await prisma.clearanceItem.upsert({
     *   create: {
     *     // ... data to create a ClearanceItem
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ClearanceItem we want to update
     *   }
     * })
     */
    upsert<T extends ClearanceItemUpsertArgs>(args: SelectSubset<T, ClearanceItemUpsertArgs<ExtArgs>>): Prisma__ClearanceItemClient<$Result.GetResult<Prisma.$ClearanceItemPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ClearanceItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClearanceItemCountArgs} args - Arguments to filter ClearanceItems to count.
     * @example
     * // Count the number of ClearanceItems
     * const count = await prisma.clearanceItem.count({
     *   where: {
     *     // ... the filter for the ClearanceItems we want to count
     *   }
     * })
    **/
    count<T extends ClearanceItemCountArgs>(
      args?: Subset<T, ClearanceItemCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ClearanceItemCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ClearanceItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClearanceItemAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ClearanceItemAggregateArgs>(args: Subset<T, ClearanceItemAggregateArgs>): Prisma.PrismaPromise<GetClearanceItemAggregateType<T>>

    /**
     * Group by ClearanceItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClearanceItemGroupByArgs} args - Group by arguments.
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
      T extends ClearanceItemGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ClearanceItemGroupByArgs['orderBy'] }
        : { orderBy?: ClearanceItemGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ClearanceItemGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetClearanceItemGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ClearanceItem model
   */
  readonly fields: ClearanceItemFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ClearanceItem.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ClearanceItemClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    resignation<T extends ResignationDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ResignationDefaultArgs<ExtArgs>>): Prisma__ResignationClient<$Result.GetResult<Prisma.$ResignationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the ClearanceItem model
   */
  interface ClearanceItemFieldRefs {
    readonly id: FieldRef<"ClearanceItem", 'String'>
    readonly resignation_id: FieldRef<"ClearanceItem", 'String'>
    readonly category: FieldRef<"ClearanceItem", 'String'>
    readonly item_name: FieldRef<"ClearanceItem", 'String'>
    readonly item_name_th: FieldRef<"ClearanceItem", 'String'>
    readonly required: FieldRef<"ClearanceItem", 'Boolean'>
    readonly status: FieldRef<"ClearanceItem", 'String'>
    readonly completed_date: FieldRef<"ClearanceItem", 'DateTime'>
    readonly completed_by: FieldRef<"ClearanceItem", 'String'>
    readonly notes: FieldRef<"ClearanceItem", 'String'>
  }
    

  // Custom InputTypes
  /**
   * ClearanceItem findUnique
   */
  export type ClearanceItemFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClearanceItem
     */
    select?: ClearanceItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClearanceItem
     */
    omit?: ClearanceItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClearanceItemInclude<ExtArgs> | null
    /**
     * Filter, which ClearanceItem to fetch.
     */
    where: ClearanceItemWhereUniqueInput
  }

  /**
   * ClearanceItem findUniqueOrThrow
   */
  export type ClearanceItemFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClearanceItem
     */
    select?: ClearanceItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClearanceItem
     */
    omit?: ClearanceItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClearanceItemInclude<ExtArgs> | null
    /**
     * Filter, which ClearanceItem to fetch.
     */
    where: ClearanceItemWhereUniqueInput
  }

  /**
   * ClearanceItem findFirst
   */
  export type ClearanceItemFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClearanceItem
     */
    select?: ClearanceItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClearanceItem
     */
    omit?: ClearanceItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClearanceItemInclude<ExtArgs> | null
    /**
     * Filter, which ClearanceItem to fetch.
     */
    where?: ClearanceItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ClearanceItems to fetch.
     */
    orderBy?: ClearanceItemOrderByWithRelationInput | ClearanceItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ClearanceItems.
     */
    cursor?: ClearanceItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ClearanceItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ClearanceItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ClearanceItems.
     */
    distinct?: ClearanceItemScalarFieldEnum | ClearanceItemScalarFieldEnum[]
  }

  /**
   * ClearanceItem findFirstOrThrow
   */
  export type ClearanceItemFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClearanceItem
     */
    select?: ClearanceItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClearanceItem
     */
    omit?: ClearanceItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClearanceItemInclude<ExtArgs> | null
    /**
     * Filter, which ClearanceItem to fetch.
     */
    where?: ClearanceItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ClearanceItems to fetch.
     */
    orderBy?: ClearanceItemOrderByWithRelationInput | ClearanceItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ClearanceItems.
     */
    cursor?: ClearanceItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ClearanceItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ClearanceItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ClearanceItems.
     */
    distinct?: ClearanceItemScalarFieldEnum | ClearanceItemScalarFieldEnum[]
  }

  /**
   * ClearanceItem findMany
   */
  export type ClearanceItemFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClearanceItem
     */
    select?: ClearanceItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClearanceItem
     */
    omit?: ClearanceItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClearanceItemInclude<ExtArgs> | null
    /**
     * Filter, which ClearanceItems to fetch.
     */
    where?: ClearanceItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ClearanceItems to fetch.
     */
    orderBy?: ClearanceItemOrderByWithRelationInput | ClearanceItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ClearanceItems.
     */
    cursor?: ClearanceItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ClearanceItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ClearanceItems.
     */
    skip?: number
    distinct?: ClearanceItemScalarFieldEnum | ClearanceItemScalarFieldEnum[]
  }

  /**
   * ClearanceItem create
   */
  export type ClearanceItemCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClearanceItem
     */
    select?: ClearanceItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClearanceItem
     */
    omit?: ClearanceItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClearanceItemInclude<ExtArgs> | null
    /**
     * The data needed to create a ClearanceItem.
     */
    data: XOR<ClearanceItemCreateInput, ClearanceItemUncheckedCreateInput>
  }

  /**
   * ClearanceItem createMany
   */
  export type ClearanceItemCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ClearanceItems.
     */
    data: ClearanceItemCreateManyInput | ClearanceItemCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ClearanceItem createManyAndReturn
   */
  export type ClearanceItemCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClearanceItem
     */
    select?: ClearanceItemSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ClearanceItem
     */
    omit?: ClearanceItemOmit<ExtArgs> | null
    /**
     * The data used to create many ClearanceItems.
     */
    data: ClearanceItemCreateManyInput | ClearanceItemCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClearanceItemIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ClearanceItem update
   */
  export type ClearanceItemUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClearanceItem
     */
    select?: ClearanceItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClearanceItem
     */
    omit?: ClearanceItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClearanceItemInclude<ExtArgs> | null
    /**
     * The data needed to update a ClearanceItem.
     */
    data: XOR<ClearanceItemUpdateInput, ClearanceItemUncheckedUpdateInput>
    /**
     * Choose, which ClearanceItem to update.
     */
    where: ClearanceItemWhereUniqueInput
  }

  /**
   * ClearanceItem updateMany
   */
  export type ClearanceItemUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ClearanceItems.
     */
    data: XOR<ClearanceItemUpdateManyMutationInput, ClearanceItemUncheckedUpdateManyInput>
    /**
     * Filter which ClearanceItems to update
     */
    where?: ClearanceItemWhereInput
    /**
     * Limit how many ClearanceItems to update.
     */
    limit?: number
  }

  /**
   * ClearanceItem updateManyAndReturn
   */
  export type ClearanceItemUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClearanceItem
     */
    select?: ClearanceItemSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ClearanceItem
     */
    omit?: ClearanceItemOmit<ExtArgs> | null
    /**
     * The data used to update ClearanceItems.
     */
    data: XOR<ClearanceItemUpdateManyMutationInput, ClearanceItemUncheckedUpdateManyInput>
    /**
     * Filter which ClearanceItems to update
     */
    where?: ClearanceItemWhereInput
    /**
     * Limit how many ClearanceItems to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClearanceItemIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ClearanceItem upsert
   */
  export type ClearanceItemUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClearanceItem
     */
    select?: ClearanceItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClearanceItem
     */
    omit?: ClearanceItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClearanceItemInclude<ExtArgs> | null
    /**
     * The filter to search for the ClearanceItem to update in case it exists.
     */
    where: ClearanceItemWhereUniqueInput
    /**
     * In case the ClearanceItem found by the `where` argument doesn't exist, create a new ClearanceItem with this data.
     */
    create: XOR<ClearanceItemCreateInput, ClearanceItemUncheckedCreateInput>
    /**
     * In case the ClearanceItem was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ClearanceItemUpdateInput, ClearanceItemUncheckedUpdateInput>
  }

  /**
   * ClearanceItem delete
   */
  export type ClearanceItemDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClearanceItem
     */
    select?: ClearanceItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClearanceItem
     */
    omit?: ClearanceItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClearanceItemInclude<ExtArgs> | null
    /**
     * Filter which ClearanceItem to delete.
     */
    where: ClearanceItemWhereUniqueInput
  }

  /**
   * ClearanceItem deleteMany
   */
  export type ClearanceItemDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ClearanceItems to delete
     */
    where?: ClearanceItemWhereInput
    /**
     * Limit how many ClearanceItems to delete.
     */
    limit?: number
  }

  /**
   * ClearanceItem without action
   */
  export type ClearanceItemDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClearanceItem
     */
    select?: ClearanceItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClearanceItem
     */
    omit?: ClearanceItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClearanceItemInclude<ExtArgs> | null
  }


  /**
   * Model AuditLog
   */

  export type AggregateAuditLog = {
    _count: AuditLogCountAggregateOutputType | null
    _min: AuditLogMinAggregateOutputType | null
    _max: AuditLogMaxAggregateOutputType | null
  }

  export type AuditLogMinAggregateOutputType = {
    id: string | null
    entity_type: string | null
    entity_id: string | null
    action: string | null
    performed_by: string | null
    details: string | null
    created_at: Date | null
  }

  export type AuditLogMaxAggregateOutputType = {
    id: string | null
    entity_type: string | null
    entity_id: string | null
    action: string | null
    performed_by: string | null
    details: string | null
    created_at: Date | null
  }

  export type AuditLogCountAggregateOutputType = {
    id: number
    entity_type: number
    entity_id: number
    action: number
    performed_by: number
    details: number
    created_at: number
    _all: number
  }


  export type AuditLogMinAggregateInputType = {
    id?: true
    entity_type?: true
    entity_id?: true
    action?: true
    performed_by?: true
    details?: true
    created_at?: true
  }

  export type AuditLogMaxAggregateInputType = {
    id?: true
    entity_type?: true
    entity_id?: true
    action?: true
    performed_by?: true
    details?: true
    created_at?: true
  }

  export type AuditLogCountAggregateInputType = {
    id?: true
    entity_type?: true
    entity_id?: true
    action?: true
    performed_by?: true
    details?: true
    created_at?: true
    _all?: true
  }

  export type AuditLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AuditLog to aggregate.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AuditLogs
    **/
    _count?: true | AuditLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AuditLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AuditLogMaxAggregateInputType
  }

  export type GetAuditLogAggregateType<T extends AuditLogAggregateArgs> = {
        [P in keyof T & keyof AggregateAuditLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAuditLog[P]>
      : GetScalarType<T[P], AggregateAuditLog[P]>
  }




  export type AuditLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AuditLogWhereInput
    orderBy?: AuditLogOrderByWithAggregationInput | AuditLogOrderByWithAggregationInput[]
    by: AuditLogScalarFieldEnum[] | AuditLogScalarFieldEnum
    having?: AuditLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AuditLogCountAggregateInputType | true
    _min?: AuditLogMinAggregateInputType
    _max?: AuditLogMaxAggregateInputType
  }

  export type AuditLogGroupByOutputType = {
    id: string
    entity_type: string
    entity_id: string
    action: string
    performed_by: string
    details: string | null
    created_at: Date
    _count: AuditLogCountAggregateOutputType | null
    _min: AuditLogMinAggregateOutputType | null
    _max: AuditLogMaxAggregateOutputType | null
  }

  type GetAuditLogGroupByPayload<T extends AuditLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AuditLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AuditLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AuditLogGroupByOutputType[P]>
            : GetScalarType<T[P], AuditLogGroupByOutputType[P]>
        }
      >
    >


  export type AuditLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    entity_type?: boolean
    entity_id?: boolean
    action?: boolean
    performed_by?: boolean
    details?: boolean
    created_at?: boolean
  }, ExtArgs["result"]["auditLog"]>

  export type AuditLogSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    entity_type?: boolean
    entity_id?: boolean
    action?: boolean
    performed_by?: boolean
    details?: boolean
    created_at?: boolean
  }, ExtArgs["result"]["auditLog"]>

  export type AuditLogSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    entity_type?: boolean
    entity_id?: boolean
    action?: boolean
    performed_by?: boolean
    details?: boolean
    created_at?: boolean
  }, ExtArgs["result"]["auditLog"]>

  export type AuditLogSelectScalar = {
    id?: boolean
    entity_type?: boolean
    entity_id?: boolean
    action?: boolean
    performed_by?: boolean
    details?: boolean
    created_at?: boolean
  }

  export type AuditLogOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "entity_type" | "entity_id" | "action" | "performed_by" | "details" | "created_at", ExtArgs["result"]["auditLog"]>

  export type $AuditLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AuditLog"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      entity_type: string
      entity_id: string
      action: string
      performed_by: string
      details: string | null
      created_at: Date
    }, ExtArgs["result"]["auditLog"]>
    composites: {}
  }

  type AuditLogGetPayload<S extends boolean | null | undefined | AuditLogDefaultArgs> = $Result.GetResult<Prisma.$AuditLogPayload, S>

  type AuditLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AuditLogFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AuditLogCountAggregateInputType | true
    }

  export interface AuditLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AuditLog'], meta: { name: 'AuditLog' } }
    /**
     * Find zero or one AuditLog that matches the filter.
     * @param {AuditLogFindUniqueArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AuditLogFindUniqueArgs>(args: SelectSubset<T, AuditLogFindUniqueArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AuditLog that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AuditLogFindUniqueOrThrowArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AuditLogFindUniqueOrThrowArgs>(args: SelectSubset<T, AuditLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AuditLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogFindFirstArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AuditLogFindFirstArgs>(args?: SelectSubset<T, AuditLogFindFirstArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AuditLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogFindFirstOrThrowArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AuditLogFindFirstOrThrowArgs>(args?: SelectSubset<T, AuditLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AuditLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AuditLogs
     * const auditLogs = await prisma.auditLog.findMany()
     * 
     * // Get first 10 AuditLogs
     * const auditLogs = await prisma.auditLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const auditLogWithIdOnly = await prisma.auditLog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AuditLogFindManyArgs>(args?: SelectSubset<T, AuditLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AuditLog.
     * @param {AuditLogCreateArgs} args - Arguments to create a AuditLog.
     * @example
     * // Create one AuditLog
     * const AuditLog = await prisma.auditLog.create({
     *   data: {
     *     // ... data to create a AuditLog
     *   }
     * })
     * 
     */
    create<T extends AuditLogCreateArgs>(args: SelectSubset<T, AuditLogCreateArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AuditLogs.
     * @param {AuditLogCreateManyArgs} args - Arguments to create many AuditLogs.
     * @example
     * // Create many AuditLogs
     * const auditLog = await prisma.auditLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AuditLogCreateManyArgs>(args?: SelectSubset<T, AuditLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AuditLogs and returns the data saved in the database.
     * @param {AuditLogCreateManyAndReturnArgs} args - Arguments to create many AuditLogs.
     * @example
     * // Create many AuditLogs
     * const auditLog = await prisma.auditLog.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AuditLogs and only return the `id`
     * const auditLogWithIdOnly = await prisma.auditLog.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AuditLogCreateManyAndReturnArgs>(args?: SelectSubset<T, AuditLogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AuditLog.
     * @param {AuditLogDeleteArgs} args - Arguments to delete one AuditLog.
     * @example
     * // Delete one AuditLog
     * const AuditLog = await prisma.auditLog.delete({
     *   where: {
     *     // ... filter to delete one AuditLog
     *   }
     * })
     * 
     */
    delete<T extends AuditLogDeleteArgs>(args: SelectSubset<T, AuditLogDeleteArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AuditLog.
     * @param {AuditLogUpdateArgs} args - Arguments to update one AuditLog.
     * @example
     * // Update one AuditLog
     * const auditLog = await prisma.auditLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AuditLogUpdateArgs>(args: SelectSubset<T, AuditLogUpdateArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AuditLogs.
     * @param {AuditLogDeleteManyArgs} args - Arguments to filter AuditLogs to delete.
     * @example
     * // Delete a few AuditLogs
     * const { count } = await prisma.auditLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AuditLogDeleteManyArgs>(args?: SelectSubset<T, AuditLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AuditLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AuditLogs
     * const auditLog = await prisma.auditLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AuditLogUpdateManyArgs>(args: SelectSubset<T, AuditLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AuditLogs and returns the data updated in the database.
     * @param {AuditLogUpdateManyAndReturnArgs} args - Arguments to update many AuditLogs.
     * @example
     * // Update many AuditLogs
     * const auditLog = await prisma.auditLog.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AuditLogs and only return the `id`
     * const auditLogWithIdOnly = await prisma.auditLog.updateManyAndReturn({
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
    updateManyAndReturn<T extends AuditLogUpdateManyAndReturnArgs>(args: SelectSubset<T, AuditLogUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one AuditLog.
     * @param {AuditLogUpsertArgs} args - Arguments to update or create a AuditLog.
     * @example
     * // Update or create a AuditLog
     * const auditLog = await prisma.auditLog.upsert({
     *   create: {
     *     // ... data to create a AuditLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AuditLog we want to update
     *   }
     * })
     */
    upsert<T extends AuditLogUpsertArgs>(args: SelectSubset<T, AuditLogUpsertArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AuditLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogCountArgs} args - Arguments to filter AuditLogs to count.
     * @example
     * // Count the number of AuditLogs
     * const count = await prisma.auditLog.count({
     *   where: {
     *     // ... the filter for the AuditLogs we want to count
     *   }
     * })
    **/
    count<T extends AuditLogCountArgs>(
      args?: Subset<T, AuditLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AuditLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AuditLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends AuditLogAggregateArgs>(args: Subset<T, AuditLogAggregateArgs>): Prisma.PrismaPromise<GetAuditLogAggregateType<T>>

    /**
     * Group by AuditLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogGroupByArgs} args - Group by arguments.
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
      T extends AuditLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AuditLogGroupByArgs['orderBy'] }
        : { orderBy?: AuditLogGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, AuditLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAuditLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AuditLog model
   */
  readonly fields: AuditLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AuditLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AuditLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
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
   * Fields of the AuditLog model
   */
  interface AuditLogFieldRefs {
    readonly id: FieldRef<"AuditLog", 'String'>
    readonly entity_type: FieldRef<"AuditLog", 'String'>
    readonly entity_id: FieldRef<"AuditLog", 'String'>
    readonly action: FieldRef<"AuditLog", 'String'>
    readonly performed_by: FieldRef<"AuditLog", 'String'>
    readonly details: FieldRef<"AuditLog", 'String'>
    readonly created_at: FieldRef<"AuditLog", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AuditLog findUnique
   */
  export type AuditLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog findUniqueOrThrow
   */
  export type AuditLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog findFirst
   */
  export type AuditLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AuditLogs.
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AuditLogs.
     */
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * AuditLog findFirstOrThrow
   */
  export type AuditLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AuditLogs.
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AuditLogs.
     */
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * AuditLog findMany
   */
  export type AuditLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Filter, which AuditLogs to fetch.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AuditLogs.
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * AuditLog create
   */
  export type AuditLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * The data needed to create a AuditLog.
     */
    data: XOR<AuditLogCreateInput, AuditLogUncheckedCreateInput>
  }

  /**
   * AuditLog createMany
   */
  export type AuditLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AuditLogs.
     */
    data: AuditLogCreateManyInput | AuditLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AuditLog createManyAndReturn
   */
  export type AuditLogCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * The data used to create many AuditLogs.
     */
    data: AuditLogCreateManyInput | AuditLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AuditLog update
   */
  export type AuditLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * The data needed to update a AuditLog.
     */
    data: XOR<AuditLogUpdateInput, AuditLogUncheckedUpdateInput>
    /**
     * Choose, which AuditLog to update.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog updateMany
   */
  export type AuditLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AuditLogs.
     */
    data: XOR<AuditLogUpdateManyMutationInput, AuditLogUncheckedUpdateManyInput>
    /**
     * Filter which AuditLogs to update
     */
    where?: AuditLogWhereInput
    /**
     * Limit how many AuditLogs to update.
     */
    limit?: number
  }

  /**
   * AuditLog updateManyAndReturn
   */
  export type AuditLogUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * The data used to update AuditLogs.
     */
    data: XOR<AuditLogUpdateManyMutationInput, AuditLogUncheckedUpdateManyInput>
    /**
     * Filter which AuditLogs to update
     */
    where?: AuditLogWhereInput
    /**
     * Limit how many AuditLogs to update.
     */
    limit?: number
  }

  /**
   * AuditLog upsert
   */
  export type AuditLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * The filter to search for the AuditLog to update in case it exists.
     */
    where: AuditLogWhereUniqueInput
    /**
     * In case the AuditLog found by the `where` argument doesn't exist, create a new AuditLog with this data.
     */
    create: XOR<AuditLogCreateInput, AuditLogUncheckedCreateInput>
    /**
     * In case the AuditLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AuditLogUpdateInput, AuditLogUncheckedUpdateInput>
  }

  /**
   * AuditLog delete
   */
  export type AuditLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Filter which AuditLog to delete.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog deleteMany
   */
  export type AuditLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AuditLogs to delete
     */
    where?: AuditLogWhereInput
    /**
     * Limit how many AuditLogs to delete.
     */
    limit?: number
  }

  /**
   * AuditLog without action
   */
  export type AuditLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
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


  export const JobPostingScalarFieldEnum: {
    id: 'id',
    position_id: 'position_id',
    position_title: 'position_title',
    position_title_th: 'position_title_th',
    department: 'department',
    department_th: 'department_th',
    company: 'company',
    location: 'location',
    location_th: 'location_th',
    job_family: 'job_family',
    employment_type: 'employment_type',
    salary_range_min: 'salary_range_min',
    salary_range_max: 'salary_range_max',
    currency: 'currency',
    posting_date: 'posting_date',
    closing_date: 'closing_date',
    status: 'status',
    headcount: 'headcount',
    filled_count: 'filled_count',
    description: 'description',
    description_th: 'description_th',
    requirements: 'requirements',
    benefits: 'benefits',
    hiring_manager_id: 'hiring_manager_id',
    hr_recruiter_id: 'hr_recruiter_id',
    is_internal: 'is_internal',
    is_external: 'is_external',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type JobPostingScalarFieldEnum = (typeof JobPostingScalarFieldEnum)[keyof typeof JobPostingScalarFieldEnum]


  export const CandidateScalarFieldEnum: {
    id: 'id',
    job_posting_id: 'job_posting_id',
    first_name: 'first_name',
    last_name: 'last_name',
    email: 'email',
    phone: 'phone',
    resume_url: 'resume_url',
    source: 'source',
    status: 'status',
    current_stage: 'current_stage',
    applied_date: 'applied_date',
    notes: 'notes',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type CandidateScalarFieldEnum = (typeof CandidateScalarFieldEnum)[keyof typeof CandidateScalarFieldEnum]


  export const ScreeningScalarFieldEnum: {
    id: 'id',
    candidate_id: 'candidate_id',
    stage: 'stage',
    status: 'status',
    scheduled_date: 'scheduled_date',
    completed_date: 'completed_date',
    interviewer_id: 'interviewer_id',
    score: 'score',
    feedback: 'feedback',
    recommendation: 'recommendation',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type ScreeningScalarFieldEnum = (typeof ScreeningScalarFieldEnum)[keyof typeof ScreeningScalarFieldEnum]


  export const OnboardingTemplateScalarFieldEnum: {
    id: 'id',
    name_en: 'name_en',
    name_th: 'name_th',
    department: 'department',
    is_default: 'is_default',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type OnboardingTemplateScalarFieldEnum = (typeof OnboardingTemplateScalarFieldEnum)[keyof typeof OnboardingTemplateScalarFieldEnum]


  export const OnboardingTaskScalarFieldEnum: {
    id: 'id',
    template_id: 'template_id',
    employee_id: 'employee_id',
    category: 'category',
    title_en: 'title_en',
    title_th: 'title_th',
    description_en: 'description_en',
    description_th: 'description_th',
    required: 'required',
    status: 'status',
    due_date: 'due_date',
    completed_date: 'completed_date',
    completed_by: 'completed_by',
    assigned_to: 'assigned_to',
    sort_order: 'sort_order',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type OnboardingTaskScalarFieldEnum = (typeof OnboardingTaskScalarFieldEnum)[keyof typeof OnboardingTaskScalarFieldEnum]


  export const ResignationScalarFieldEnum: {
    id: 'id',
    employee_id: 'employee_id',
    employee_name: 'employee_name',
    department: 'department',
    position: 'position',
    submission_date: 'submission_date',
    last_working_date: 'last_working_date',
    reason_type: 'reason_type',
    reason_detail: 'reason_detail',
    status: 'status',
    manager_id: 'manager_id',
    manager_approved_at: 'manager_approved_at',
    manager_comments: 'manager_comments',
    hr_clearance_completed: 'hr_clearance_completed',
    hr_clearance_date: 'hr_clearance_date',
    settlement_amount: 'settlement_amount',
    settlement_date: 'settlement_date',
    exit_interview_date: 'exit_interview_date',
    exit_interview_notes: 'exit_interview_notes',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type ResignationScalarFieldEnum = (typeof ResignationScalarFieldEnum)[keyof typeof ResignationScalarFieldEnum]


  export const ClearanceItemScalarFieldEnum: {
    id: 'id',
    resignation_id: 'resignation_id',
    category: 'category',
    item_name: 'item_name',
    item_name_th: 'item_name_th',
    required: 'required',
    status: 'status',
    completed_date: 'completed_date',
    completed_by: 'completed_by',
    notes: 'notes'
  };

  export type ClearanceItemScalarFieldEnum = (typeof ClearanceItemScalarFieldEnum)[keyof typeof ClearanceItemScalarFieldEnum]


  export const AuditLogScalarFieldEnum: {
    id: 'id',
    entity_type: 'entity_type',
    entity_id: 'entity_id',
    action: 'action',
    performed_by: 'performed_by',
    details: 'details',
    created_at: 'created_at'
  };

  export type AuditLogScalarFieldEnum = (typeof AuditLogScalarFieldEnum)[keyof typeof AuditLogScalarFieldEnum]


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
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    
  /**
   * Deep Input Types
   */


  export type JobPostingWhereInput = {
    AND?: JobPostingWhereInput | JobPostingWhereInput[]
    OR?: JobPostingWhereInput[]
    NOT?: JobPostingWhereInput | JobPostingWhereInput[]
    id?: StringFilter<"JobPosting"> | string
    position_id?: StringNullableFilter<"JobPosting"> | string | null
    position_title?: StringFilter<"JobPosting"> | string
    position_title_th?: StringNullableFilter<"JobPosting"> | string | null
    department?: StringFilter<"JobPosting"> | string
    department_th?: StringNullableFilter<"JobPosting"> | string | null
    company?: StringFilter<"JobPosting"> | string
    location?: StringNullableFilter<"JobPosting"> | string | null
    location_th?: StringNullableFilter<"JobPosting"> | string | null
    job_family?: StringNullableFilter<"JobPosting"> | string | null
    employment_type?: StringFilter<"JobPosting"> | string
    salary_range_min?: FloatNullableFilter<"JobPosting"> | number | null
    salary_range_max?: FloatNullableFilter<"JobPosting"> | number | null
    currency?: StringFilter<"JobPosting"> | string
    posting_date?: DateTimeFilter<"JobPosting"> | Date | string
    closing_date?: DateTimeNullableFilter<"JobPosting"> | Date | string | null
    status?: StringFilter<"JobPosting"> | string
    headcount?: IntFilter<"JobPosting"> | number
    filled_count?: IntFilter<"JobPosting"> | number
    description?: StringNullableFilter<"JobPosting"> | string | null
    description_th?: StringNullableFilter<"JobPosting"> | string | null
    requirements?: StringNullableListFilter<"JobPosting">
    benefits?: StringNullableListFilter<"JobPosting">
    hiring_manager_id?: StringNullableFilter<"JobPosting"> | string | null
    hr_recruiter_id?: StringNullableFilter<"JobPosting"> | string | null
    is_internal?: BoolFilter<"JobPosting"> | boolean
    is_external?: BoolFilter<"JobPosting"> | boolean
    created_at?: DateTimeFilter<"JobPosting"> | Date | string
    updated_at?: DateTimeFilter<"JobPosting"> | Date | string
    candidates?: CandidateListRelationFilter
  }

  export type JobPostingOrderByWithRelationInput = {
    id?: SortOrder
    position_id?: SortOrderInput | SortOrder
    position_title?: SortOrder
    position_title_th?: SortOrderInput | SortOrder
    department?: SortOrder
    department_th?: SortOrderInput | SortOrder
    company?: SortOrder
    location?: SortOrderInput | SortOrder
    location_th?: SortOrderInput | SortOrder
    job_family?: SortOrderInput | SortOrder
    employment_type?: SortOrder
    salary_range_min?: SortOrderInput | SortOrder
    salary_range_max?: SortOrderInput | SortOrder
    currency?: SortOrder
    posting_date?: SortOrder
    closing_date?: SortOrderInput | SortOrder
    status?: SortOrder
    headcount?: SortOrder
    filled_count?: SortOrder
    description?: SortOrderInput | SortOrder
    description_th?: SortOrderInput | SortOrder
    requirements?: SortOrder
    benefits?: SortOrder
    hiring_manager_id?: SortOrderInput | SortOrder
    hr_recruiter_id?: SortOrderInput | SortOrder
    is_internal?: SortOrder
    is_external?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    candidates?: CandidateOrderByRelationAggregateInput
  }

  export type JobPostingWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: JobPostingWhereInput | JobPostingWhereInput[]
    OR?: JobPostingWhereInput[]
    NOT?: JobPostingWhereInput | JobPostingWhereInput[]
    position_id?: StringNullableFilter<"JobPosting"> | string | null
    position_title?: StringFilter<"JobPosting"> | string
    position_title_th?: StringNullableFilter<"JobPosting"> | string | null
    department?: StringFilter<"JobPosting"> | string
    department_th?: StringNullableFilter<"JobPosting"> | string | null
    company?: StringFilter<"JobPosting"> | string
    location?: StringNullableFilter<"JobPosting"> | string | null
    location_th?: StringNullableFilter<"JobPosting"> | string | null
    job_family?: StringNullableFilter<"JobPosting"> | string | null
    employment_type?: StringFilter<"JobPosting"> | string
    salary_range_min?: FloatNullableFilter<"JobPosting"> | number | null
    salary_range_max?: FloatNullableFilter<"JobPosting"> | number | null
    currency?: StringFilter<"JobPosting"> | string
    posting_date?: DateTimeFilter<"JobPosting"> | Date | string
    closing_date?: DateTimeNullableFilter<"JobPosting"> | Date | string | null
    status?: StringFilter<"JobPosting"> | string
    headcount?: IntFilter<"JobPosting"> | number
    filled_count?: IntFilter<"JobPosting"> | number
    description?: StringNullableFilter<"JobPosting"> | string | null
    description_th?: StringNullableFilter<"JobPosting"> | string | null
    requirements?: StringNullableListFilter<"JobPosting">
    benefits?: StringNullableListFilter<"JobPosting">
    hiring_manager_id?: StringNullableFilter<"JobPosting"> | string | null
    hr_recruiter_id?: StringNullableFilter<"JobPosting"> | string | null
    is_internal?: BoolFilter<"JobPosting"> | boolean
    is_external?: BoolFilter<"JobPosting"> | boolean
    created_at?: DateTimeFilter<"JobPosting"> | Date | string
    updated_at?: DateTimeFilter<"JobPosting"> | Date | string
    candidates?: CandidateListRelationFilter
  }, "id">

  export type JobPostingOrderByWithAggregationInput = {
    id?: SortOrder
    position_id?: SortOrderInput | SortOrder
    position_title?: SortOrder
    position_title_th?: SortOrderInput | SortOrder
    department?: SortOrder
    department_th?: SortOrderInput | SortOrder
    company?: SortOrder
    location?: SortOrderInput | SortOrder
    location_th?: SortOrderInput | SortOrder
    job_family?: SortOrderInput | SortOrder
    employment_type?: SortOrder
    salary_range_min?: SortOrderInput | SortOrder
    salary_range_max?: SortOrderInput | SortOrder
    currency?: SortOrder
    posting_date?: SortOrder
    closing_date?: SortOrderInput | SortOrder
    status?: SortOrder
    headcount?: SortOrder
    filled_count?: SortOrder
    description?: SortOrderInput | SortOrder
    description_th?: SortOrderInput | SortOrder
    requirements?: SortOrder
    benefits?: SortOrder
    hiring_manager_id?: SortOrderInput | SortOrder
    hr_recruiter_id?: SortOrderInput | SortOrder
    is_internal?: SortOrder
    is_external?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: JobPostingCountOrderByAggregateInput
    _avg?: JobPostingAvgOrderByAggregateInput
    _max?: JobPostingMaxOrderByAggregateInput
    _min?: JobPostingMinOrderByAggregateInput
    _sum?: JobPostingSumOrderByAggregateInput
  }

  export type JobPostingScalarWhereWithAggregatesInput = {
    AND?: JobPostingScalarWhereWithAggregatesInput | JobPostingScalarWhereWithAggregatesInput[]
    OR?: JobPostingScalarWhereWithAggregatesInput[]
    NOT?: JobPostingScalarWhereWithAggregatesInput | JobPostingScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"JobPosting"> | string
    position_id?: StringNullableWithAggregatesFilter<"JobPosting"> | string | null
    position_title?: StringWithAggregatesFilter<"JobPosting"> | string
    position_title_th?: StringNullableWithAggregatesFilter<"JobPosting"> | string | null
    department?: StringWithAggregatesFilter<"JobPosting"> | string
    department_th?: StringNullableWithAggregatesFilter<"JobPosting"> | string | null
    company?: StringWithAggregatesFilter<"JobPosting"> | string
    location?: StringNullableWithAggregatesFilter<"JobPosting"> | string | null
    location_th?: StringNullableWithAggregatesFilter<"JobPosting"> | string | null
    job_family?: StringNullableWithAggregatesFilter<"JobPosting"> | string | null
    employment_type?: StringWithAggregatesFilter<"JobPosting"> | string
    salary_range_min?: FloatNullableWithAggregatesFilter<"JobPosting"> | number | null
    salary_range_max?: FloatNullableWithAggregatesFilter<"JobPosting"> | number | null
    currency?: StringWithAggregatesFilter<"JobPosting"> | string
    posting_date?: DateTimeWithAggregatesFilter<"JobPosting"> | Date | string
    closing_date?: DateTimeNullableWithAggregatesFilter<"JobPosting"> | Date | string | null
    status?: StringWithAggregatesFilter<"JobPosting"> | string
    headcount?: IntWithAggregatesFilter<"JobPosting"> | number
    filled_count?: IntWithAggregatesFilter<"JobPosting"> | number
    description?: StringNullableWithAggregatesFilter<"JobPosting"> | string | null
    description_th?: StringNullableWithAggregatesFilter<"JobPosting"> | string | null
    requirements?: StringNullableListFilter<"JobPosting">
    benefits?: StringNullableListFilter<"JobPosting">
    hiring_manager_id?: StringNullableWithAggregatesFilter<"JobPosting"> | string | null
    hr_recruiter_id?: StringNullableWithAggregatesFilter<"JobPosting"> | string | null
    is_internal?: BoolWithAggregatesFilter<"JobPosting"> | boolean
    is_external?: BoolWithAggregatesFilter<"JobPosting"> | boolean
    created_at?: DateTimeWithAggregatesFilter<"JobPosting"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"JobPosting"> | Date | string
  }

  export type CandidateWhereInput = {
    AND?: CandidateWhereInput | CandidateWhereInput[]
    OR?: CandidateWhereInput[]
    NOT?: CandidateWhereInput | CandidateWhereInput[]
    id?: StringFilter<"Candidate"> | string
    job_posting_id?: StringFilter<"Candidate"> | string
    first_name?: StringFilter<"Candidate"> | string
    last_name?: StringFilter<"Candidate"> | string
    email?: StringFilter<"Candidate"> | string
    phone?: StringNullableFilter<"Candidate"> | string | null
    resume_url?: StringNullableFilter<"Candidate"> | string | null
    source?: StringNullableFilter<"Candidate"> | string | null
    status?: StringFilter<"Candidate"> | string
    current_stage?: StringFilter<"Candidate"> | string
    applied_date?: DateTimeFilter<"Candidate"> | Date | string
    notes?: StringNullableFilter<"Candidate"> | string | null
    created_at?: DateTimeFilter<"Candidate"> | Date | string
    updated_at?: DateTimeFilter<"Candidate"> | Date | string
    job_posting?: XOR<JobPostingScalarRelationFilter, JobPostingWhereInput>
    screenings?: ScreeningListRelationFilter
  }

  export type CandidateOrderByWithRelationInput = {
    id?: SortOrder
    job_posting_id?: SortOrder
    first_name?: SortOrder
    last_name?: SortOrder
    email?: SortOrder
    phone?: SortOrderInput | SortOrder
    resume_url?: SortOrderInput | SortOrder
    source?: SortOrderInput | SortOrder
    status?: SortOrder
    current_stage?: SortOrder
    applied_date?: SortOrder
    notes?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    job_posting?: JobPostingOrderByWithRelationInput
    screenings?: ScreeningOrderByRelationAggregateInput
  }

  export type CandidateWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: CandidateWhereInput | CandidateWhereInput[]
    OR?: CandidateWhereInput[]
    NOT?: CandidateWhereInput | CandidateWhereInput[]
    job_posting_id?: StringFilter<"Candidate"> | string
    first_name?: StringFilter<"Candidate"> | string
    last_name?: StringFilter<"Candidate"> | string
    email?: StringFilter<"Candidate"> | string
    phone?: StringNullableFilter<"Candidate"> | string | null
    resume_url?: StringNullableFilter<"Candidate"> | string | null
    source?: StringNullableFilter<"Candidate"> | string | null
    status?: StringFilter<"Candidate"> | string
    current_stage?: StringFilter<"Candidate"> | string
    applied_date?: DateTimeFilter<"Candidate"> | Date | string
    notes?: StringNullableFilter<"Candidate"> | string | null
    created_at?: DateTimeFilter<"Candidate"> | Date | string
    updated_at?: DateTimeFilter<"Candidate"> | Date | string
    job_posting?: XOR<JobPostingScalarRelationFilter, JobPostingWhereInput>
    screenings?: ScreeningListRelationFilter
  }, "id">

  export type CandidateOrderByWithAggregationInput = {
    id?: SortOrder
    job_posting_id?: SortOrder
    first_name?: SortOrder
    last_name?: SortOrder
    email?: SortOrder
    phone?: SortOrderInput | SortOrder
    resume_url?: SortOrderInput | SortOrder
    source?: SortOrderInput | SortOrder
    status?: SortOrder
    current_stage?: SortOrder
    applied_date?: SortOrder
    notes?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: CandidateCountOrderByAggregateInput
    _max?: CandidateMaxOrderByAggregateInput
    _min?: CandidateMinOrderByAggregateInput
  }

  export type CandidateScalarWhereWithAggregatesInput = {
    AND?: CandidateScalarWhereWithAggregatesInput | CandidateScalarWhereWithAggregatesInput[]
    OR?: CandidateScalarWhereWithAggregatesInput[]
    NOT?: CandidateScalarWhereWithAggregatesInput | CandidateScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Candidate"> | string
    job_posting_id?: StringWithAggregatesFilter<"Candidate"> | string
    first_name?: StringWithAggregatesFilter<"Candidate"> | string
    last_name?: StringWithAggregatesFilter<"Candidate"> | string
    email?: StringWithAggregatesFilter<"Candidate"> | string
    phone?: StringNullableWithAggregatesFilter<"Candidate"> | string | null
    resume_url?: StringNullableWithAggregatesFilter<"Candidate"> | string | null
    source?: StringNullableWithAggregatesFilter<"Candidate"> | string | null
    status?: StringWithAggregatesFilter<"Candidate"> | string
    current_stage?: StringWithAggregatesFilter<"Candidate"> | string
    applied_date?: DateTimeWithAggregatesFilter<"Candidate"> | Date | string
    notes?: StringNullableWithAggregatesFilter<"Candidate"> | string | null
    created_at?: DateTimeWithAggregatesFilter<"Candidate"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"Candidate"> | Date | string
  }

  export type ScreeningWhereInput = {
    AND?: ScreeningWhereInput | ScreeningWhereInput[]
    OR?: ScreeningWhereInput[]
    NOT?: ScreeningWhereInput | ScreeningWhereInput[]
    id?: StringFilter<"Screening"> | string
    candidate_id?: StringFilter<"Screening"> | string
    stage?: StringFilter<"Screening"> | string
    status?: StringFilter<"Screening"> | string
    scheduled_date?: DateTimeNullableFilter<"Screening"> | Date | string | null
    completed_date?: DateTimeNullableFilter<"Screening"> | Date | string | null
    interviewer_id?: StringNullableFilter<"Screening"> | string | null
    score?: FloatNullableFilter<"Screening"> | number | null
    feedback?: StringNullableFilter<"Screening"> | string | null
    recommendation?: StringNullableFilter<"Screening"> | string | null
    created_at?: DateTimeFilter<"Screening"> | Date | string
    updated_at?: DateTimeFilter<"Screening"> | Date | string
    candidate?: XOR<CandidateScalarRelationFilter, CandidateWhereInput>
  }

  export type ScreeningOrderByWithRelationInput = {
    id?: SortOrder
    candidate_id?: SortOrder
    stage?: SortOrder
    status?: SortOrder
    scheduled_date?: SortOrderInput | SortOrder
    completed_date?: SortOrderInput | SortOrder
    interviewer_id?: SortOrderInput | SortOrder
    score?: SortOrderInput | SortOrder
    feedback?: SortOrderInput | SortOrder
    recommendation?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    candidate?: CandidateOrderByWithRelationInput
  }

  export type ScreeningWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ScreeningWhereInput | ScreeningWhereInput[]
    OR?: ScreeningWhereInput[]
    NOT?: ScreeningWhereInput | ScreeningWhereInput[]
    candidate_id?: StringFilter<"Screening"> | string
    stage?: StringFilter<"Screening"> | string
    status?: StringFilter<"Screening"> | string
    scheduled_date?: DateTimeNullableFilter<"Screening"> | Date | string | null
    completed_date?: DateTimeNullableFilter<"Screening"> | Date | string | null
    interviewer_id?: StringNullableFilter<"Screening"> | string | null
    score?: FloatNullableFilter<"Screening"> | number | null
    feedback?: StringNullableFilter<"Screening"> | string | null
    recommendation?: StringNullableFilter<"Screening"> | string | null
    created_at?: DateTimeFilter<"Screening"> | Date | string
    updated_at?: DateTimeFilter<"Screening"> | Date | string
    candidate?: XOR<CandidateScalarRelationFilter, CandidateWhereInput>
  }, "id">

  export type ScreeningOrderByWithAggregationInput = {
    id?: SortOrder
    candidate_id?: SortOrder
    stage?: SortOrder
    status?: SortOrder
    scheduled_date?: SortOrderInput | SortOrder
    completed_date?: SortOrderInput | SortOrder
    interviewer_id?: SortOrderInput | SortOrder
    score?: SortOrderInput | SortOrder
    feedback?: SortOrderInput | SortOrder
    recommendation?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: ScreeningCountOrderByAggregateInput
    _avg?: ScreeningAvgOrderByAggregateInput
    _max?: ScreeningMaxOrderByAggregateInput
    _min?: ScreeningMinOrderByAggregateInput
    _sum?: ScreeningSumOrderByAggregateInput
  }

  export type ScreeningScalarWhereWithAggregatesInput = {
    AND?: ScreeningScalarWhereWithAggregatesInput | ScreeningScalarWhereWithAggregatesInput[]
    OR?: ScreeningScalarWhereWithAggregatesInput[]
    NOT?: ScreeningScalarWhereWithAggregatesInput | ScreeningScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Screening"> | string
    candidate_id?: StringWithAggregatesFilter<"Screening"> | string
    stage?: StringWithAggregatesFilter<"Screening"> | string
    status?: StringWithAggregatesFilter<"Screening"> | string
    scheduled_date?: DateTimeNullableWithAggregatesFilter<"Screening"> | Date | string | null
    completed_date?: DateTimeNullableWithAggregatesFilter<"Screening"> | Date | string | null
    interviewer_id?: StringNullableWithAggregatesFilter<"Screening"> | string | null
    score?: FloatNullableWithAggregatesFilter<"Screening"> | number | null
    feedback?: StringNullableWithAggregatesFilter<"Screening"> | string | null
    recommendation?: StringNullableWithAggregatesFilter<"Screening"> | string | null
    created_at?: DateTimeWithAggregatesFilter<"Screening"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"Screening"> | Date | string
  }

  export type OnboardingTemplateWhereInput = {
    AND?: OnboardingTemplateWhereInput | OnboardingTemplateWhereInput[]
    OR?: OnboardingTemplateWhereInput[]
    NOT?: OnboardingTemplateWhereInput | OnboardingTemplateWhereInput[]
    id?: StringFilter<"OnboardingTemplate"> | string
    name_en?: StringFilter<"OnboardingTemplate"> | string
    name_th?: StringNullableFilter<"OnboardingTemplate"> | string | null
    department?: StringNullableFilter<"OnboardingTemplate"> | string | null
    is_default?: BoolFilter<"OnboardingTemplate"> | boolean
    created_at?: DateTimeFilter<"OnboardingTemplate"> | Date | string
    updated_at?: DateTimeFilter<"OnboardingTemplate"> | Date | string
    tasks?: OnboardingTaskListRelationFilter
  }

  export type OnboardingTemplateOrderByWithRelationInput = {
    id?: SortOrder
    name_en?: SortOrder
    name_th?: SortOrderInput | SortOrder
    department?: SortOrderInput | SortOrder
    is_default?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    tasks?: OnboardingTaskOrderByRelationAggregateInput
  }

  export type OnboardingTemplateWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: OnboardingTemplateWhereInput | OnboardingTemplateWhereInput[]
    OR?: OnboardingTemplateWhereInput[]
    NOT?: OnboardingTemplateWhereInput | OnboardingTemplateWhereInput[]
    name_en?: StringFilter<"OnboardingTemplate"> | string
    name_th?: StringNullableFilter<"OnboardingTemplate"> | string | null
    department?: StringNullableFilter<"OnboardingTemplate"> | string | null
    is_default?: BoolFilter<"OnboardingTemplate"> | boolean
    created_at?: DateTimeFilter<"OnboardingTemplate"> | Date | string
    updated_at?: DateTimeFilter<"OnboardingTemplate"> | Date | string
    tasks?: OnboardingTaskListRelationFilter
  }, "id">

  export type OnboardingTemplateOrderByWithAggregationInput = {
    id?: SortOrder
    name_en?: SortOrder
    name_th?: SortOrderInput | SortOrder
    department?: SortOrderInput | SortOrder
    is_default?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: OnboardingTemplateCountOrderByAggregateInput
    _max?: OnboardingTemplateMaxOrderByAggregateInput
    _min?: OnboardingTemplateMinOrderByAggregateInput
  }

  export type OnboardingTemplateScalarWhereWithAggregatesInput = {
    AND?: OnboardingTemplateScalarWhereWithAggregatesInput | OnboardingTemplateScalarWhereWithAggregatesInput[]
    OR?: OnboardingTemplateScalarWhereWithAggregatesInput[]
    NOT?: OnboardingTemplateScalarWhereWithAggregatesInput | OnboardingTemplateScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"OnboardingTemplate"> | string
    name_en?: StringWithAggregatesFilter<"OnboardingTemplate"> | string
    name_th?: StringNullableWithAggregatesFilter<"OnboardingTemplate"> | string | null
    department?: StringNullableWithAggregatesFilter<"OnboardingTemplate"> | string | null
    is_default?: BoolWithAggregatesFilter<"OnboardingTemplate"> | boolean
    created_at?: DateTimeWithAggregatesFilter<"OnboardingTemplate"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"OnboardingTemplate"> | Date | string
  }

  export type OnboardingTaskWhereInput = {
    AND?: OnboardingTaskWhereInput | OnboardingTaskWhereInput[]
    OR?: OnboardingTaskWhereInput[]
    NOT?: OnboardingTaskWhereInput | OnboardingTaskWhereInput[]
    id?: StringFilter<"OnboardingTask"> | string
    template_id?: StringNullableFilter<"OnboardingTask"> | string | null
    employee_id?: StringNullableFilter<"OnboardingTask"> | string | null
    category?: StringFilter<"OnboardingTask"> | string
    title_en?: StringFilter<"OnboardingTask"> | string
    title_th?: StringNullableFilter<"OnboardingTask"> | string | null
    description_en?: StringNullableFilter<"OnboardingTask"> | string | null
    description_th?: StringNullableFilter<"OnboardingTask"> | string | null
    required?: BoolFilter<"OnboardingTask"> | boolean
    status?: StringFilter<"OnboardingTask"> | string
    due_date?: DateTimeNullableFilter<"OnboardingTask"> | Date | string | null
    completed_date?: DateTimeNullableFilter<"OnboardingTask"> | Date | string | null
    completed_by?: StringNullableFilter<"OnboardingTask"> | string | null
    assigned_to?: StringNullableFilter<"OnboardingTask"> | string | null
    sort_order?: IntFilter<"OnboardingTask"> | number
    created_at?: DateTimeFilter<"OnboardingTask"> | Date | string
    updated_at?: DateTimeFilter<"OnboardingTask"> | Date | string
    template?: XOR<OnboardingTemplateNullableScalarRelationFilter, OnboardingTemplateWhereInput> | null
  }

  export type OnboardingTaskOrderByWithRelationInput = {
    id?: SortOrder
    template_id?: SortOrderInput | SortOrder
    employee_id?: SortOrderInput | SortOrder
    category?: SortOrder
    title_en?: SortOrder
    title_th?: SortOrderInput | SortOrder
    description_en?: SortOrderInput | SortOrder
    description_th?: SortOrderInput | SortOrder
    required?: SortOrder
    status?: SortOrder
    due_date?: SortOrderInput | SortOrder
    completed_date?: SortOrderInput | SortOrder
    completed_by?: SortOrderInput | SortOrder
    assigned_to?: SortOrderInput | SortOrder
    sort_order?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    template?: OnboardingTemplateOrderByWithRelationInput
  }

  export type OnboardingTaskWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: OnboardingTaskWhereInput | OnboardingTaskWhereInput[]
    OR?: OnboardingTaskWhereInput[]
    NOT?: OnboardingTaskWhereInput | OnboardingTaskWhereInput[]
    template_id?: StringNullableFilter<"OnboardingTask"> | string | null
    employee_id?: StringNullableFilter<"OnboardingTask"> | string | null
    category?: StringFilter<"OnboardingTask"> | string
    title_en?: StringFilter<"OnboardingTask"> | string
    title_th?: StringNullableFilter<"OnboardingTask"> | string | null
    description_en?: StringNullableFilter<"OnboardingTask"> | string | null
    description_th?: StringNullableFilter<"OnboardingTask"> | string | null
    required?: BoolFilter<"OnboardingTask"> | boolean
    status?: StringFilter<"OnboardingTask"> | string
    due_date?: DateTimeNullableFilter<"OnboardingTask"> | Date | string | null
    completed_date?: DateTimeNullableFilter<"OnboardingTask"> | Date | string | null
    completed_by?: StringNullableFilter<"OnboardingTask"> | string | null
    assigned_to?: StringNullableFilter<"OnboardingTask"> | string | null
    sort_order?: IntFilter<"OnboardingTask"> | number
    created_at?: DateTimeFilter<"OnboardingTask"> | Date | string
    updated_at?: DateTimeFilter<"OnboardingTask"> | Date | string
    template?: XOR<OnboardingTemplateNullableScalarRelationFilter, OnboardingTemplateWhereInput> | null
  }, "id">

  export type OnboardingTaskOrderByWithAggregationInput = {
    id?: SortOrder
    template_id?: SortOrderInput | SortOrder
    employee_id?: SortOrderInput | SortOrder
    category?: SortOrder
    title_en?: SortOrder
    title_th?: SortOrderInput | SortOrder
    description_en?: SortOrderInput | SortOrder
    description_th?: SortOrderInput | SortOrder
    required?: SortOrder
    status?: SortOrder
    due_date?: SortOrderInput | SortOrder
    completed_date?: SortOrderInput | SortOrder
    completed_by?: SortOrderInput | SortOrder
    assigned_to?: SortOrderInput | SortOrder
    sort_order?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: OnboardingTaskCountOrderByAggregateInput
    _avg?: OnboardingTaskAvgOrderByAggregateInput
    _max?: OnboardingTaskMaxOrderByAggregateInput
    _min?: OnboardingTaskMinOrderByAggregateInput
    _sum?: OnboardingTaskSumOrderByAggregateInput
  }

  export type OnboardingTaskScalarWhereWithAggregatesInput = {
    AND?: OnboardingTaskScalarWhereWithAggregatesInput | OnboardingTaskScalarWhereWithAggregatesInput[]
    OR?: OnboardingTaskScalarWhereWithAggregatesInput[]
    NOT?: OnboardingTaskScalarWhereWithAggregatesInput | OnboardingTaskScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"OnboardingTask"> | string
    template_id?: StringNullableWithAggregatesFilter<"OnboardingTask"> | string | null
    employee_id?: StringNullableWithAggregatesFilter<"OnboardingTask"> | string | null
    category?: StringWithAggregatesFilter<"OnboardingTask"> | string
    title_en?: StringWithAggregatesFilter<"OnboardingTask"> | string
    title_th?: StringNullableWithAggregatesFilter<"OnboardingTask"> | string | null
    description_en?: StringNullableWithAggregatesFilter<"OnboardingTask"> | string | null
    description_th?: StringNullableWithAggregatesFilter<"OnboardingTask"> | string | null
    required?: BoolWithAggregatesFilter<"OnboardingTask"> | boolean
    status?: StringWithAggregatesFilter<"OnboardingTask"> | string
    due_date?: DateTimeNullableWithAggregatesFilter<"OnboardingTask"> | Date | string | null
    completed_date?: DateTimeNullableWithAggregatesFilter<"OnboardingTask"> | Date | string | null
    completed_by?: StringNullableWithAggregatesFilter<"OnboardingTask"> | string | null
    assigned_to?: StringNullableWithAggregatesFilter<"OnboardingTask"> | string | null
    sort_order?: IntWithAggregatesFilter<"OnboardingTask"> | number
    created_at?: DateTimeWithAggregatesFilter<"OnboardingTask"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"OnboardingTask"> | Date | string
  }

  export type ResignationWhereInput = {
    AND?: ResignationWhereInput | ResignationWhereInput[]
    OR?: ResignationWhereInput[]
    NOT?: ResignationWhereInput | ResignationWhereInput[]
    id?: StringFilter<"Resignation"> | string
    employee_id?: StringFilter<"Resignation"> | string
    employee_name?: StringFilter<"Resignation"> | string
    department?: StringNullableFilter<"Resignation"> | string | null
    position?: StringNullableFilter<"Resignation"> | string | null
    submission_date?: DateTimeFilter<"Resignation"> | Date | string
    last_working_date?: DateTimeFilter<"Resignation"> | Date | string
    reason_type?: StringFilter<"Resignation"> | string
    reason_detail?: StringNullableFilter<"Resignation"> | string | null
    status?: StringFilter<"Resignation"> | string
    manager_id?: StringNullableFilter<"Resignation"> | string | null
    manager_approved_at?: DateTimeNullableFilter<"Resignation"> | Date | string | null
    manager_comments?: StringNullableFilter<"Resignation"> | string | null
    hr_clearance_completed?: BoolFilter<"Resignation"> | boolean
    hr_clearance_date?: DateTimeNullableFilter<"Resignation"> | Date | string | null
    settlement_amount?: FloatNullableFilter<"Resignation"> | number | null
    settlement_date?: DateTimeNullableFilter<"Resignation"> | Date | string | null
    exit_interview_date?: DateTimeNullableFilter<"Resignation"> | Date | string | null
    exit_interview_notes?: StringNullableFilter<"Resignation"> | string | null
    created_at?: DateTimeFilter<"Resignation"> | Date | string
    updated_at?: DateTimeFilter<"Resignation"> | Date | string
    clearance_items?: ClearanceItemListRelationFilter
  }

  export type ResignationOrderByWithRelationInput = {
    id?: SortOrder
    employee_id?: SortOrder
    employee_name?: SortOrder
    department?: SortOrderInput | SortOrder
    position?: SortOrderInput | SortOrder
    submission_date?: SortOrder
    last_working_date?: SortOrder
    reason_type?: SortOrder
    reason_detail?: SortOrderInput | SortOrder
    status?: SortOrder
    manager_id?: SortOrderInput | SortOrder
    manager_approved_at?: SortOrderInput | SortOrder
    manager_comments?: SortOrderInput | SortOrder
    hr_clearance_completed?: SortOrder
    hr_clearance_date?: SortOrderInput | SortOrder
    settlement_amount?: SortOrderInput | SortOrder
    settlement_date?: SortOrderInput | SortOrder
    exit_interview_date?: SortOrderInput | SortOrder
    exit_interview_notes?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    clearance_items?: ClearanceItemOrderByRelationAggregateInput
  }

  export type ResignationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ResignationWhereInput | ResignationWhereInput[]
    OR?: ResignationWhereInput[]
    NOT?: ResignationWhereInput | ResignationWhereInput[]
    employee_id?: StringFilter<"Resignation"> | string
    employee_name?: StringFilter<"Resignation"> | string
    department?: StringNullableFilter<"Resignation"> | string | null
    position?: StringNullableFilter<"Resignation"> | string | null
    submission_date?: DateTimeFilter<"Resignation"> | Date | string
    last_working_date?: DateTimeFilter<"Resignation"> | Date | string
    reason_type?: StringFilter<"Resignation"> | string
    reason_detail?: StringNullableFilter<"Resignation"> | string | null
    status?: StringFilter<"Resignation"> | string
    manager_id?: StringNullableFilter<"Resignation"> | string | null
    manager_approved_at?: DateTimeNullableFilter<"Resignation"> | Date | string | null
    manager_comments?: StringNullableFilter<"Resignation"> | string | null
    hr_clearance_completed?: BoolFilter<"Resignation"> | boolean
    hr_clearance_date?: DateTimeNullableFilter<"Resignation"> | Date | string | null
    settlement_amount?: FloatNullableFilter<"Resignation"> | number | null
    settlement_date?: DateTimeNullableFilter<"Resignation"> | Date | string | null
    exit_interview_date?: DateTimeNullableFilter<"Resignation"> | Date | string | null
    exit_interview_notes?: StringNullableFilter<"Resignation"> | string | null
    created_at?: DateTimeFilter<"Resignation"> | Date | string
    updated_at?: DateTimeFilter<"Resignation"> | Date | string
    clearance_items?: ClearanceItemListRelationFilter
  }, "id">

  export type ResignationOrderByWithAggregationInput = {
    id?: SortOrder
    employee_id?: SortOrder
    employee_name?: SortOrder
    department?: SortOrderInput | SortOrder
    position?: SortOrderInput | SortOrder
    submission_date?: SortOrder
    last_working_date?: SortOrder
    reason_type?: SortOrder
    reason_detail?: SortOrderInput | SortOrder
    status?: SortOrder
    manager_id?: SortOrderInput | SortOrder
    manager_approved_at?: SortOrderInput | SortOrder
    manager_comments?: SortOrderInput | SortOrder
    hr_clearance_completed?: SortOrder
    hr_clearance_date?: SortOrderInput | SortOrder
    settlement_amount?: SortOrderInput | SortOrder
    settlement_date?: SortOrderInput | SortOrder
    exit_interview_date?: SortOrderInput | SortOrder
    exit_interview_notes?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: ResignationCountOrderByAggregateInput
    _avg?: ResignationAvgOrderByAggregateInput
    _max?: ResignationMaxOrderByAggregateInput
    _min?: ResignationMinOrderByAggregateInput
    _sum?: ResignationSumOrderByAggregateInput
  }

  export type ResignationScalarWhereWithAggregatesInput = {
    AND?: ResignationScalarWhereWithAggregatesInput | ResignationScalarWhereWithAggregatesInput[]
    OR?: ResignationScalarWhereWithAggregatesInput[]
    NOT?: ResignationScalarWhereWithAggregatesInput | ResignationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Resignation"> | string
    employee_id?: StringWithAggregatesFilter<"Resignation"> | string
    employee_name?: StringWithAggregatesFilter<"Resignation"> | string
    department?: StringNullableWithAggregatesFilter<"Resignation"> | string | null
    position?: StringNullableWithAggregatesFilter<"Resignation"> | string | null
    submission_date?: DateTimeWithAggregatesFilter<"Resignation"> | Date | string
    last_working_date?: DateTimeWithAggregatesFilter<"Resignation"> | Date | string
    reason_type?: StringWithAggregatesFilter<"Resignation"> | string
    reason_detail?: StringNullableWithAggregatesFilter<"Resignation"> | string | null
    status?: StringWithAggregatesFilter<"Resignation"> | string
    manager_id?: StringNullableWithAggregatesFilter<"Resignation"> | string | null
    manager_approved_at?: DateTimeNullableWithAggregatesFilter<"Resignation"> | Date | string | null
    manager_comments?: StringNullableWithAggregatesFilter<"Resignation"> | string | null
    hr_clearance_completed?: BoolWithAggregatesFilter<"Resignation"> | boolean
    hr_clearance_date?: DateTimeNullableWithAggregatesFilter<"Resignation"> | Date | string | null
    settlement_amount?: FloatNullableWithAggregatesFilter<"Resignation"> | number | null
    settlement_date?: DateTimeNullableWithAggregatesFilter<"Resignation"> | Date | string | null
    exit_interview_date?: DateTimeNullableWithAggregatesFilter<"Resignation"> | Date | string | null
    exit_interview_notes?: StringNullableWithAggregatesFilter<"Resignation"> | string | null
    created_at?: DateTimeWithAggregatesFilter<"Resignation"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"Resignation"> | Date | string
  }

  export type ClearanceItemWhereInput = {
    AND?: ClearanceItemWhereInput | ClearanceItemWhereInput[]
    OR?: ClearanceItemWhereInput[]
    NOT?: ClearanceItemWhereInput | ClearanceItemWhereInput[]
    id?: StringFilter<"ClearanceItem"> | string
    resignation_id?: StringFilter<"ClearanceItem"> | string
    category?: StringFilter<"ClearanceItem"> | string
    item_name?: StringFilter<"ClearanceItem"> | string
    item_name_th?: StringNullableFilter<"ClearanceItem"> | string | null
    required?: BoolFilter<"ClearanceItem"> | boolean
    status?: StringFilter<"ClearanceItem"> | string
    completed_date?: DateTimeNullableFilter<"ClearanceItem"> | Date | string | null
    completed_by?: StringNullableFilter<"ClearanceItem"> | string | null
    notes?: StringNullableFilter<"ClearanceItem"> | string | null
    resignation?: XOR<ResignationScalarRelationFilter, ResignationWhereInput>
  }

  export type ClearanceItemOrderByWithRelationInput = {
    id?: SortOrder
    resignation_id?: SortOrder
    category?: SortOrder
    item_name?: SortOrder
    item_name_th?: SortOrderInput | SortOrder
    required?: SortOrder
    status?: SortOrder
    completed_date?: SortOrderInput | SortOrder
    completed_by?: SortOrderInput | SortOrder
    notes?: SortOrderInput | SortOrder
    resignation?: ResignationOrderByWithRelationInput
  }

  export type ClearanceItemWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ClearanceItemWhereInput | ClearanceItemWhereInput[]
    OR?: ClearanceItemWhereInput[]
    NOT?: ClearanceItemWhereInput | ClearanceItemWhereInput[]
    resignation_id?: StringFilter<"ClearanceItem"> | string
    category?: StringFilter<"ClearanceItem"> | string
    item_name?: StringFilter<"ClearanceItem"> | string
    item_name_th?: StringNullableFilter<"ClearanceItem"> | string | null
    required?: BoolFilter<"ClearanceItem"> | boolean
    status?: StringFilter<"ClearanceItem"> | string
    completed_date?: DateTimeNullableFilter<"ClearanceItem"> | Date | string | null
    completed_by?: StringNullableFilter<"ClearanceItem"> | string | null
    notes?: StringNullableFilter<"ClearanceItem"> | string | null
    resignation?: XOR<ResignationScalarRelationFilter, ResignationWhereInput>
  }, "id">

  export type ClearanceItemOrderByWithAggregationInput = {
    id?: SortOrder
    resignation_id?: SortOrder
    category?: SortOrder
    item_name?: SortOrder
    item_name_th?: SortOrderInput | SortOrder
    required?: SortOrder
    status?: SortOrder
    completed_date?: SortOrderInput | SortOrder
    completed_by?: SortOrderInput | SortOrder
    notes?: SortOrderInput | SortOrder
    _count?: ClearanceItemCountOrderByAggregateInput
    _max?: ClearanceItemMaxOrderByAggregateInput
    _min?: ClearanceItemMinOrderByAggregateInput
  }

  export type ClearanceItemScalarWhereWithAggregatesInput = {
    AND?: ClearanceItemScalarWhereWithAggregatesInput | ClearanceItemScalarWhereWithAggregatesInput[]
    OR?: ClearanceItemScalarWhereWithAggregatesInput[]
    NOT?: ClearanceItemScalarWhereWithAggregatesInput | ClearanceItemScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ClearanceItem"> | string
    resignation_id?: StringWithAggregatesFilter<"ClearanceItem"> | string
    category?: StringWithAggregatesFilter<"ClearanceItem"> | string
    item_name?: StringWithAggregatesFilter<"ClearanceItem"> | string
    item_name_th?: StringNullableWithAggregatesFilter<"ClearanceItem"> | string | null
    required?: BoolWithAggregatesFilter<"ClearanceItem"> | boolean
    status?: StringWithAggregatesFilter<"ClearanceItem"> | string
    completed_date?: DateTimeNullableWithAggregatesFilter<"ClearanceItem"> | Date | string | null
    completed_by?: StringNullableWithAggregatesFilter<"ClearanceItem"> | string | null
    notes?: StringNullableWithAggregatesFilter<"ClearanceItem"> | string | null
  }

  export type AuditLogWhereInput = {
    AND?: AuditLogWhereInput | AuditLogWhereInput[]
    OR?: AuditLogWhereInput[]
    NOT?: AuditLogWhereInput | AuditLogWhereInput[]
    id?: StringFilter<"AuditLog"> | string
    entity_type?: StringFilter<"AuditLog"> | string
    entity_id?: StringFilter<"AuditLog"> | string
    action?: StringFilter<"AuditLog"> | string
    performed_by?: StringFilter<"AuditLog"> | string
    details?: StringNullableFilter<"AuditLog"> | string | null
    created_at?: DateTimeFilter<"AuditLog"> | Date | string
  }

  export type AuditLogOrderByWithRelationInput = {
    id?: SortOrder
    entity_type?: SortOrder
    entity_id?: SortOrder
    action?: SortOrder
    performed_by?: SortOrder
    details?: SortOrderInput | SortOrder
    created_at?: SortOrder
  }

  export type AuditLogWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AuditLogWhereInput | AuditLogWhereInput[]
    OR?: AuditLogWhereInput[]
    NOT?: AuditLogWhereInput | AuditLogWhereInput[]
    entity_type?: StringFilter<"AuditLog"> | string
    entity_id?: StringFilter<"AuditLog"> | string
    action?: StringFilter<"AuditLog"> | string
    performed_by?: StringFilter<"AuditLog"> | string
    details?: StringNullableFilter<"AuditLog"> | string | null
    created_at?: DateTimeFilter<"AuditLog"> | Date | string
  }, "id">

  export type AuditLogOrderByWithAggregationInput = {
    id?: SortOrder
    entity_type?: SortOrder
    entity_id?: SortOrder
    action?: SortOrder
    performed_by?: SortOrder
    details?: SortOrderInput | SortOrder
    created_at?: SortOrder
    _count?: AuditLogCountOrderByAggregateInput
    _max?: AuditLogMaxOrderByAggregateInput
    _min?: AuditLogMinOrderByAggregateInput
  }

  export type AuditLogScalarWhereWithAggregatesInput = {
    AND?: AuditLogScalarWhereWithAggregatesInput | AuditLogScalarWhereWithAggregatesInput[]
    OR?: AuditLogScalarWhereWithAggregatesInput[]
    NOT?: AuditLogScalarWhereWithAggregatesInput | AuditLogScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AuditLog"> | string
    entity_type?: StringWithAggregatesFilter<"AuditLog"> | string
    entity_id?: StringWithAggregatesFilter<"AuditLog"> | string
    action?: StringWithAggregatesFilter<"AuditLog"> | string
    performed_by?: StringWithAggregatesFilter<"AuditLog"> | string
    details?: StringNullableWithAggregatesFilter<"AuditLog"> | string | null
    created_at?: DateTimeWithAggregatesFilter<"AuditLog"> | Date | string
  }

  export type JobPostingCreateInput = {
    id?: string
    position_id?: string | null
    position_title: string
    position_title_th?: string | null
    department: string
    department_th?: string | null
    company?: string
    location?: string | null
    location_th?: string | null
    job_family?: string | null
    employment_type?: string
    salary_range_min?: number | null
    salary_range_max?: number | null
    currency?: string
    posting_date?: Date | string
    closing_date?: Date | string | null
    status?: string
    headcount?: number
    filled_count?: number
    description?: string | null
    description_th?: string | null
    requirements?: JobPostingCreaterequirementsInput | string[]
    benefits?: JobPostingCreatebenefitsInput | string[]
    hiring_manager_id?: string | null
    hr_recruiter_id?: string | null
    is_internal?: boolean
    is_external?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    candidates?: CandidateCreateNestedManyWithoutJob_postingInput
  }

  export type JobPostingUncheckedCreateInput = {
    id?: string
    position_id?: string | null
    position_title: string
    position_title_th?: string | null
    department: string
    department_th?: string | null
    company?: string
    location?: string | null
    location_th?: string | null
    job_family?: string | null
    employment_type?: string
    salary_range_min?: number | null
    salary_range_max?: number | null
    currency?: string
    posting_date?: Date | string
    closing_date?: Date | string | null
    status?: string
    headcount?: number
    filled_count?: number
    description?: string | null
    description_th?: string | null
    requirements?: JobPostingCreaterequirementsInput | string[]
    benefits?: JobPostingCreatebenefitsInput | string[]
    hiring_manager_id?: string | null
    hr_recruiter_id?: string | null
    is_internal?: boolean
    is_external?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    candidates?: CandidateUncheckedCreateNestedManyWithoutJob_postingInput
  }

  export type JobPostingUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    position_id?: NullableStringFieldUpdateOperationsInput | string | null
    position_title?: StringFieldUpdateOperationsInput | string
    position_title_th?: NullableStringFieldUpdateOperationsInput | string | null
    department?: StringFieldUpdateOperationsInput | string
    department_th?: NullableStringFieldUpdateOperationsInput | string | null
    company?: StringFieldUpdateOperationsInput | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    location_th?: NullableStringFieldUpdateOperationsInput | string | null
    job_family?: NullableStringFieldUpdateOperationsInput | string | null
    employment_type?: StringFieldUpdateOperationsInput | string
    salary_range_min?: NullableFloatFieldUpdateOperationsInput | number | null
    salary_range_max?: NullableFloatFieldUpdateOperationsInput | number | null
    currency?: StringFieldUpdateOperationsInput | string
    posting_date?: DateTimeFieldUpdateOperationsInput | Date | string
    closing_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    headcount?: IntFieldUpdateOperationsInput | number
    filled_count?: IntFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    description_th?: NullableStringFieldUpdateOperationsInput | string | null
    requirements?: JobPostingUpdaterequirementsInput | string[]
    benefits?: JobPostingUpdatebenefitsInput | string[]
    hiring_manager_id?: NullableStringFieldUpdateOperationsInput | string | null
    hr_recruiter_id?: NullableStringFieldUpdateOperationsInput | string | null
    is_internal?: BoolFieldUpdateOperationsInput | boolean
    is_external?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    candidates?: CandidateUpdateManyWithoutJob_postingNestedInput
  }

  export type JobPostingUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    position_id?: NullableStringFieldUpdateOperationsInput | string | null
    position_title?: StringFieldUpdateOperationsInput | string
    position_title_th?: NullableStringFieldUpdateOperationsInput | string | null
    department?: StringFieldUpdateOperationsInput | string
    department_th?: NullableStringFieldUpdateOperationsInput | string | null
    company?: StringFieldUpdateOperationsInput | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    location_th?: NullableStringFieldUpdateOperationsInput | string | null
    job_family?: NullableStringFieldUpdateOperationsInput | string | null
    employment_type?: StringFieldUpdateOperationsInput | string
    salary_range_min?: NullableFloatFieldUpdateOperationsInput | number | null
    salary_range_max?: NullableFloatFieldUpdateOperationsInput | number | null
    currency?: StringFieldUpdateOperationsInput | string
    posting_date?: DateTimeFieldUpdateOperationsInput | Date | string
    closing_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    headcount?: IntFieldUpdateOperationsInput | number
    filled_count?: IntFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    description_th?: NullableStringFieldUpdateOperationsInput | string | null
    requirements?: JobPostingUpdaterequirementsInput | string[]
    benefits?: JobPostingUpdatebenefitsInput | string[]
    hiring_manager_id?: NullableStringFieldUpdateOperationsInput | string | null
    hr_recruiter_id?: NullableStringFieldUpdateOperationsInput | string | null
    is_internal?: BoolFieldUpdateOperationsInput | boolean
    is_external?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    candidates?: CandidateUncheckedUpdateManyWithoutJob_postingNestedInput
  }

  export type JobPostingCreateManyInput = {
    id?: string
    position_id?: string | null
    position_title: string
    position_title_th?: string | null
    department: string
    department_th?: string | null
    company?: string
    location?: string | null
    location_th?: string | null
    job_family?: string | null
    employment_type?: string
    salary_range_min?: number | null
    salary_range_max?: number | null
    currency?: string
    posting_date?: Date | string
    closing_date?: Date | string | null
    status?: string
    headcount?: number
    filled_count?: number
    description?: string | null
    description_th?: string | null
    requirements?: JobPostingCreaterequirementsInput | string[]
    benefits?: JobPostingCreatebenefitsInput | string[]
    hiring_manager_id?: string | null
    hr_recruiter_id?: string | null
    is_internal?: boolean
    is_external?: boolean
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type JobPostingUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    position_id?: NullableStringFieldUpdateOperationsInput | string | null
    position_title?: StringFieldUpdateOperationsInput | string
    position_title_th?: NullableStringFieldUpdateOperationsInput | string | null
    department?: StringFieldUpdateOperationsInput | string
    department_th?: NullableStringFieldUpdateOperationsInput | string | null
    company?: StringFieldUpdateOperationsInput | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    location_th?: NullableStringFieldUpdateOperationsInput | string | null
    job_family?: NullableStringFieldUpdateOperationsInput | string | null
    employment_type?: StringFieldUpdateOperationsInput | string
    salary_range_min?: NullableFloatFieldUpdateOperationsInput | number | null
    salary_range_max?: NullableFloatFieldUpdateOperationsInput | number | null
    currency?: StringFieldUpdateOperationsInput | string
    posting_date?: DateTimeFieldUpdateOperationsInput | Date | string
    closing_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    headcount?: IntFieldUpdateOperationsInput | number
    filled_count?: IntFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    description_th?: NullableStringFieldUpdateOperationsInput | string | null
    requirements?: JobPostingUpdaterequirementsInput | string[]
    benefits?: JobPostingUpdatebenefitsInput | string[]
    hiring_manager_id?: NullableStringFieldUpdateOperationsInput | string | null
    hr_recruiter_id?: NullableStringFieldUpdateOperationsInput | string | null
    is_internal?: BoolFieldUpdateOperationsInput | boolean
    is_external?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type JobPostingUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    position_id?: NullableStringFieldUpdateOperationsInput | string | null
    position_title?: StringFieldUpdateOperationsInput | string
    position_title_th?: NullableStringFieldUpdateOperationsInput | string | null
    department?: StringFieldUpdateOperationsInput | string
    department_th?: NullableStringFieldUpdateOperationsInput | string | null
    company?: StringFieldUpdateOperationsInput | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    location_th?: NullableStringFieldUpdateOperationsInput | string | null
    job_family?: NullableStringFieldUpdateOperationsInput | string | null
    employment_type?: StringFieldUpdateOperationsInput | string
    salary_range_min?: NullableFloatFieldUpdateOperationsInput | number | null
    salary_range_max?: NullableFloatFieldUpdateOperationsInput | number | null
    currency?: StringFieldUpdateOperationsInput | string
    posting_date?: DateTimeFieldUpdateOperationsInput | Date | string
    closing_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    headcount?: IntFieldUpdateOperationsInput | number
    filled_count?: IntFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    description_th?: NullableStringFieldUpdateOperationsInput | string | null
    requirements?: JobPostingUpdaterequirementsInput | string[]
    benefits?: JobPostingUpdatebenefitsInput | string[]
    hiring_manager_id?: NullableStringFieldUpdateOperationsInput | string | null
    hr_recruiter_id?: NullableStringFieldUpdateOperationsInput | string | null
    is_internal?: BoolFieldUpdateOperationsInput | boolean
    is_external?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CandidateCreateInput = {
    id?: string
    first_name: string
    last_name: string
    email: string
    phone?: string | null
    resume_url?: string | null
    source?: string | null
    status?: string
    current_stage?: string
    applied_date?: Date | string
    notes?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    job_posting: JobPostingCreateNestedOneWithoutCandidatesInput
    screenings?: ScreeningCreateNestedManyWithoutCandidateInput
  }

  export type CandidateUncheckedCreateInput = {
    id?: string
    job_posting_id: string
    first_name: string
    last_name: string
    email: string
    phone?: string | null
    resume_url?: string | null
    source?: string | null
    status?: string
    current_stage?: string
    applied_date?: Date | string
    notes?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    screenings?: ScreeningUncheckedCreateNestedManyWithoutCandidateInput
  }

  export type CandidateUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    first_name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    resume_url?: NullableStringFieldUpdateOperationsInput | string | null
    source?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    current_stage?: StringFieldUpdateOperationsInput | string
    applied_date?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    job_posting?: JobPostingUpdateOneRequiredWithoutCandidatesNestedInput
    screenings?: ScreeningUpdateManyWithoutCandidateNestedInput
  }

  export type CandidateUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    job_posting_id?: StringFieldUpdateOperationsInput | string
    first_name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    resume_url?: NullableStringFieldUpdateOperationsInput | string | null
    source?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    current_stage?: StringFieldUpdateOperationsInput | string
    applied_date?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    screenings?: ScreeningUncheckedUpdateManyWithoutCandidateNestedInput
  }

  export type CandidateCreateManyInput = {
    id?: string
    job_posting_id: string
    first_name: string
    last_name: string
    email: string
    phone?: string | null
    resume_url?: string | null
    source?: string | null
    status?: string
    current_stage?: string
    applied_date?: Date | string
    notes?: string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type CandidateUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    first_name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    resume_url?: NullableStringFieldUpdateOperationsInput | string | null
    source?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    current_stage?: StringFieldUpdateOperationsInput | string
    applied_date?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CandidateUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    job_posting_id?: StringFieldUpdateOperationsInput | string
    first_name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    resume_url?: NullableStringFieldUpdateOperationsInput | string | null
    source?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    current_stage?: StringFieldUpdateOperationsInput | string
    applied_date?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ScreeningCreateInput = {
    id?: string
    stage: string
    status?: string
    scheduled_date?: Date | string | null
    completed_date?: Date | string | null
    interviewer_id?: string | null
    score?: number | null
    feedback?: string | null
    recommendation?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    candidate: CandidateCreateNestedOneWithoutScreeningsInput
  }

  export type ScreeningUncheckedCreateInput = {
    id?: string
    candidate_id: string
    stage: string
    status?: string
    scheduled_date?: Date | string | null
    completed_date?: Date | string | null
    interviewer_id?: string | null
    score?: number | null
    feedback?: string | null
    recommendation?: string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type ScreeningUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    stage?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    scheduled_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completed_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    interviewer_id?: NullableStringFieldUpdateOperationsInput | string | null
    score?: NullableFloatFieldUpdateOperationsInput | number | null
    feedback?: NullableStringFieldUpdateOperationsInput | string | null
    recommendation?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    candidate?: CandidateUpdateOneRequiredWithoutScreeningsNestedInput
  }

  export type ScreeningUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    candidate_id?: StringFieldUpdateOperationsInput | string
    stage?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    scheduled_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completed_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    interviewer_id?: NullableStringFieldUpdateOperationsInput | string | null
    score?: NullableFloatFieldUpdateOperationsInput | number | null
    feedback?: NullableStringFieldUpdateOperationsInput | string | null
    recommendation?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ScreeningCreateManyInput = {
    id?: string
    candidate_id: string
    stage: string
    status?: string
    scheduled_date?: Date | string | null
    completed_date?: Date | string | null
    interviewer_id?: string | null
    score?: number | null
    feedback?: string | null
    recommendation?: string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type ScreeningUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    stage?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    scheduled_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completed_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    interviewer_id?: NullableStringFieldUpdateOperationsInput | string | null
    score?: NullableFloatFieldUpdateOperationsInput | number | null
    feedback?: NullableStringFieldUpdateOperationsInput | string | null
    recommendation?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ScreeningUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    candidate_id?: StringFieldUpdateOperationsInput | string
    stage?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    scheduled_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completed_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    interviewer_id?: NullableStringFieldUpdateOperationsInput | string | null
    score?: NullableFloatFieldUpdateOperationsInput | number | null
    feedback?: NullableStringFieldUpdateOperationsInput | string | null
    recommendation?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OnboardingTemplateCreateInput = {
    id?: string
    name_en: string
    name_th?: string | null
    department?: string | null
    is_default?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    tasks?: OnboardingTaskCreateNestedManyWithoutTemplateInput
  }

  export type OnboardingTemplateUncheckedCreateInput = {
    id?: string
    name_en: string
    name_th?: string | null
    department?: string | null
    is_default?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    tasks?: OnboardingTaskUncheckedCreateNestedManyWithoutTemplateInput
  }

  export type OnboardingTemplateUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name_en?: StringFieldUpdateOperationsInput | string
    name_th?: NullableStringFieldUpdateOperationsInput | string | null
    department?: NullableStringFieldUpdateOperationsInput | string | null
    is_default?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    tasks?: OnboardingTaskUpdateManyWithoutTemplateNestedInput
  }

  export type OnboardingTemplateUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name_en?: StringFieldUpdateOperationsInput | string
    name_th?: NullableStringFieldUpdateOperationsInput | string | null
    department?: NullableStringFieldUpdateOperationsInput | string | null
    is_default?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    tasks?: OnboardingTaskUncheckedUpdateManyWithoutTemplateNestedInput
  }

  export type OnboardingTemplateCreateManyInput = {
    id?: string
    name_en: string
    name_th?: string | null
    department?: string | null
    is_default?: boolean
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type OnboardingTemplateUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name_en?: StringFieldUpdateOperationsInput | string
    name_th?: NullableStringFieldUpdateOperationsInput | string | null
    department?: NullableStringFieldUpdateOperationsInput | string | null
    is_default?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OnboardingTemplateUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name_en?: StringFieldUpdateOperationsInput | string
    name_th?: NullableStringFieldUpdateOperationsInput | string | null
    department?: NullableStringFieldUpdateOperationsInput | string | null
    is_default?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OnboardingTaskCreateInput = {
    id?: string
    employee_id?: string | null
    category: string
    title_en: string
    title_th?: string | null
    description_en?: string | null
    description_th?: string | null
    required?: boolean
    status?: string
    due_date?: Date | string | null
    completed_date?: Date | string | null
    completed_by?: string | null
    assigned_to?: string | null
    sort_order?: number
    created_at?: Date | string
    updated_at?: Date | string
    template?: OnboardingTemplateCreateNestedOneWithoutTasksInput
  }

  export type OnboardingTaskUncheckedCreateInput = {
    id?: string
    template_id?: string | null
    employee_id?: string | null
    category: string
    title_en: string
    title_th?: string | null
    description_en?: string | null
    description_th?: string | null
    required?: boolean
    status?: string
    due_date?: Date | string | null
    completed_date?: Date | string | null
    completed_by?: string | null
    assigned_to?: string | null
    sort_order?: number
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type OnboardingTaskUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    employee_id?: NullableStringFieldUpdateOperationsInput | string | null
    category?: StringFieldUpdateOperationsInput | string
    title_en?: StringFieldUpdateOperationsInput | string
    title_th?: NullableStringFieldUpdateOperationsInput | string | null
    description_en?: NullableStringFieldUpdateOperationsInput | string | null
    description_th?: NullableStringFieldUpdateOperationsInput | string | null
    required?: BoolFieldUpdateOperationsInput | boolean
    status?: StringFieldUpdateOperationsInput | string
    due_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completed_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completed_by?: NullableStringFieldUpdateOperationsInput | string | null
    assigned_to?: NullableStringFieldUpdateOperationsInput | string | null
    sort_order?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    template?: OnboardingTemplateUpdateOneWithoutTasksNestedInput
  }

  export type OnboardingTaskUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    template_id?: NullableStringFieldUpdateOperationsInput | string | null
    employee_id?: NullableStringFieldUpdateOperationsInput | string | null
    category?: StringFieldUpdateOperationsInput | string
    title_en?: StringFieldUpdateOperationsInput | string
    title_th?: NullableStringFieldUpdateOperationsInput | string | null
    description_en?: NullableStringFieldUpdateOperationsInput | string | null
    description_th?: NullableStringFieldUpdateOperationsInput | string | null
    required?: BoolFieldUpdateOperationsInput | boolean
    status?: StringFieldUpdateOperationsInput | string
    due_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completed_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completed_by?: NullableStringFieldUpdateOperationsInput | string | null
    assigned_to?: NullableStringFieldUpdateOperationsInput | string | null
    sort_order?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OnboardingTaskCreateManyInput = {
    id?: string
    template_id?: string | null
    employee_id?: string | null
    category: string
    title_en: string
    title_th?: string | null
    description_en?: string | null
    description_th?: string | null
    required?: boolean
    status?: string
    due_date?: Date | string | null
    completed_date?: Date | string | null
    completed_by?: string | null
    assigned_to?: string | null
    sort_order?: number
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type OnboardingTaskUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    employee_id?: NullableStringFieldUpdateOperationsInput | string | null
    category?: StringFieldUpdateOperationsInput | string
    title_en?: StringFieldUpdateOperationsInput | string
    title_th?: NullableStringFieldUpdateOperationsInput | string | null
    description_en?: NullableStringFieldUpdateOperationsInput | string | null
    description_th?: NullableStringFieldUpdateOperationsInput | string | null
    required?: BoolFieldUpdateOperationsInput | boolean
    status?: StringFieldUpdateOperationsInput | string
    due_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completed_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completed_by?: NullableStringFieldUpdateOperationsInput | string | null
    assigned_to?: NullableStringFieldUpdateOperationsInput | string | null
    sort_order?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OnboardingTaskUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    template_id?: NullableStringFieldUpdateOperationsInput | string | null
    employee_id?: NullableStringFieldUpdateOperationsInput | string | null
    category?: StringFieldUpdateOperationsInput | string
    title_en?: StringFieldUpdateOperationsInput | string
    title_th?: NullableStringFieldUpdateOperationsInput | string | null
    description_en?: NullableStringFieldUpdateOperationsInput | string | null
    description_th?: NullableStringFieldUpdateOperationsInput | string | null
    required?: BoolFieldUpdateOperationsInput | boolean
    status?: StringFieldUpdateOperationsInput | string
    due_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completed_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completed_by?: NullableStringFieldUpdateOperationsInput | string | null
    assigned_to?: NullableStringFieldUpdateOperationsInput | string | null
    sort_order?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ResignationCreateInput = {
    id?: string
    employee_id: string
    employee_name: string
    department?: string | null
    position?: string | null
    submission_date?: Date | string
    last_working_date: Date | string
    reason_type: string
    reason_detail?: string | null
    status?: string
    manager_id?: string | null
    manager_approved_at?: Date | string | null
    manager_comments?: string | null
    hr_clearance_completed?: boolean
    hr_clearance_date?: Date | string | null
    settlement_amount?: number | null
    settlement_date?: Date | string | null
    exit_interview_date?: Date | string | null
    exit_interview_notes?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    clearance_items?: ClearanceItemCreateNestedManyWithoutResignationInput
  }

  export type ResignationUncheckedCreateInput = {
    id?: string
    employee_id: string
    employee_name: string
    department?: string | null
    position?: string | null
    submission_date?: Date | string
    last_working_date: Date | string
    reason_type: string
    reason_detail?: string | null
    status?: string
    manager_id?: string | null
    manager_approved_at?: Date | string | null
    manager_comments?: string | null
    hr_clearance_completed?: boolean
    hr_clearance_date?: Date | string | null
    settlement_amount?: number | null
    settlement_date?: Date | string | null
    exit_interview_date?: Date | string | null
    exit_interview_notes?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    clearance_items?: ClearanceItemUncheckedCreateNestedManyWithoutResignationInput
  }

  export type ResignationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    employee_id?: StringFieldUpdateOperationsInput | string
    employee_name?: StringFieldUpdateOperationsInput | string
    department?: NullableStringFieldUpdateOperationsInput | string | null
    position?: NullableStringFieldUpdateOperationsInput | string | null
    submission_date?: DateTimeFieldUpdateOperationsInput | Date | string
    last_working_date?: DateTimeFieldUpdateOperationsInput | Date | string
    reason_type?: StringFieldUpdateOperationsInput | string
    reason_detail?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    manager_id?: NullableStringFieldUpdateOperationsInput | string | null
    manager_approved_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    manager_comments?: NullableStringFieldUpdateOperationsInput | string | null
    hr_clearance_completed?: BoolFieldUpdateOperationsInput | boolean
    hr_clearance_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    settlement_amount?: NullableFloatFieldUpdateOperationsInput | number | null
    settlement_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    exit_interview_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    exit_interview_notes?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    clearance_items?: ClearanceItemUpdateManyWithoutResignationNestedInput
  }

  export type ResignationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    employee_id?: StringFieldUpdateOperationsInput | string
    employee_name?: StringFieldUpdateOperationsInput | string
    department?: NullableStringFieldUpdateOperationsInput | string | null
    position?: NullableStringFieldUpdateOperationsInput | string | null
    submission_date?: DateTimeFieldUpdateOperationsInput | Date | string
    last_working_date?: DateTimeFieldUpdateOperationsInput | Date | string
    reason_type?: StringFieldUpdateOperationsInput | string
    reason_detail?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    manager_id?: NullableStringFieldUpdateOperationsInput | string | null
    manager_approved_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    manager_comments?: NullableStringFieldUpdateOperationsInput | string | null
    hr_clearance_completed?: BoolFieldUpdateOperationsInput | boolean
    hr_clearance_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    settlement_amount?: NullableFloatFieldUpdateOperationsInput | number | null
    settlement_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    exit_interview_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    exit_interview_notes?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    clearance_items?: ClearanceItemUncheckedUpdateManyWithoutResignationNestedInput
  }

  export type ResignationCreateManyInput = {
    id?: string
    employee_id: string
    employee_name: string
    department?: string | null
    position?: string | null
    submission_date?: Date | string
    last_working_date: Date | string
    reason_type: string
    reason_detail?: string | null
    status?: string
    manager_id?: string | null
    manager_approved_at?: Date | string | null
    manager_comments?: string | null
    hr_clearance_completed?: boolean
    hr_clearance_date?: Date | string | null
    settlement_amount?: number | null
    settlement_date?: Date | string | null
    exit_interview_date?: Date | string | null
    exit_interview_notes?: string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type ResignationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    employee_id?: StringFieldUpdateOperationsInput | string
    employee_name?: StringFieldUpdateOperationsInput | string
    department?: NullableStringFieldUpdateOperationsInput | string | null
    position?: NullableStringFieldUpdateOperationsInput | string | null
    submission_date?: DateTimeFieldUpdateOperationsInput | Date | string
    last_working_date?: DateTimeFieldUpdateOperationsInput | Date | string
    reason_type?: StringFieldUpdateOperationsInput | string
    reason_detail?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    manager_id?: NullableStringFieldUpdateOperationsInput | string | null
    manager_approved_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    manager_comments?: NullableStringFieldUpdateOperationsInput | string | null
    hr_clearance_completed?: BoolFieldUpdateOperationsInput | boolean
    hr_clearance_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    settlement_amount?: NullableFloatFieldUpdateOperationsInput | number | null
    settlement_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    exit_interview_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    exit_interview_notes?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ResignationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    employee_id?: StringFieldUpdateOperationsInput | string
    employee_name?: StringFieldUpdateOperationsInput | string
    department?: NullableStringFieldUpdateOperationsInput | string | null
    position?: NullableStringFieldUpdateOperationsInput | string | null
    submission_date?: DateTimeFieldUpdateOperationsInput | Date | string
    last_working_date?: DateTimeFieldUpdateOperationsInput | Date | string
    reason_type?: StringFieldUpdateOperationsInput | string
    reason_detail?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    manager_id?: NullableStringFieldUpdateOperationsInput | string | null
    manager_approved_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    manager_comments?: NullableStringFieldUpdateOperationsInput | string | null
    hr_clearance_completed?: BoolFieldUpdateOperationsInput | boolean
    hr_clearance_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    settlement_amount?: NullableFloatFieldUpdateOperationsInput | number | null
    settlement_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    exit_interview_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    exit_interview_notes?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClearanceItemCreateInput = {
    id?: string
    category: string
    item_name: string
    item_name_th?: string | null
    required?: boolean
    status?: string
    completed_date?: Date | string | null
    completed_by?: string | null
    notes?: string | null
    resignation: ResignationCreateNestedOneWithoutClearance_itemsInput
  }

  export type ClearanceItemUncheckedCreateInput = {
    id?: string
    resignation_id: string
    category: string
    item_name: string
    item_name_th?: string | null
    required?: boolean
    status?: string
    completed_date?: Date | string | null
    completed_by?: string | null
    notes?: string | null
  }

  export type ClearanceItemUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    item_name?: StringFieldUpdateOperationsInput | string
    item_name_th?: NullableStringFieldUpdateOperationsInput | string | null
    required?: BoolFieldUpdateOperationsInput | boolean
    status?: StringFieldUpdateOperationsInput | string
    completed_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completed_by?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    resignation?: ResignationUpdateOneRequiredWithoutClearance_itemsNestedInput
  }

  export type ClearanceItemUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    resignation_id?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    item_name?: StringFieldUpdateOperationsInput | string
    item_name_th?: NullableStringFieldUpdateOperationsInput | string | null
    required?: BoolFieldUpdateOperationsInput | boolean
    status?: StringFieldUpdateOperationsInput | string
    completed_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completed_by?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ClearanceItemCreateManyInput = {
    id?: string
    resignation_id: string
    category: string
    item_name: string
    item_name_th?: string | null
    required?: boolean
    status?: string
    completed_date?: Date | string | null
    completed_by?: string | null
    notes?: string | null
  }

  export type ClearanceItemUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    item_name?: StringFieldUpdateOperationsInput | string
    item_name_th?: NullableStringFieldUpdateOperationsInput | string | null
    required?: BoolFieldUpdateOperationsInput | boolean
    status?: StringFieldUpdateOperationsInput | string
    completed_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completed_by?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ClearanceItemUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    resignation_id?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    item_name?: StringFieldUpdateOperationsInput | string
    item_name_th?: NullableStringFieldUpdateOperationsInput | string | null
    required?: BoolFieldUpdateOperationsInput | boolean
    status?: StringFieldUpdateOperationsInput | string
    completed_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completed_by?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AuditLogCreateInput = {
    id?: string
    entity_type: string
    entity_id: string
    action: string
    performed_by: string
    details?: string | null
    created_at?: Date | string
  }

  export type AuditLogUncheckedCreateInput = {
    id?: string
    entity_type: string
    entity_id: string
    action: string
    performed_by: string
    details?: string | null
    created_at?: Date | string
  }

  export type AuditLogUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    entity_type?: StringFieldUpdateOperationsInput | string
    entity_id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    performed_by?: StringFieldUpdateOperationsInput | string
    details?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    entity_type?: StringFieldUpdateOperationsInput | string
    entity_id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    performed_by?: StringFieldUpdateOperationsInput | string
    details?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogCreateManyInput = {
    id?: string
    entity_type: string
    entity_id: string
    action: string
    performed_by: string
    details?: string | null
    created_at?: Date | string
  }

  export type AuditLogUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    entity_type?: StringFieldUpdateOperationsInput | string
    entity_id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    performed_by?: StringFieldUpdateOperationsInput | string
    details?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    entity_type?: StringFieldUpdateOperationsInput | string
    entity_id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    performed_by?: StringFieldUpdateOperationsInput | string
    details?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
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

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
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

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type CandidateListRelationFilter = {
    every?: CandidateWhereInput
    some?: CandidateWhereInput
    none?: CandidateWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type CandidateOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type JobPostingCountOrderByAggregateInput = {
    id?: SortOrder
    position_id?: SortOrder
    position_title?: SortOrder
    position_title_th?: SortOrder
    department?: SortOrder
    department_th?: SortOrder
    company?: SortOrder
    location?: SortOrder
    location_th?: SortOrder
    job_family?: SortOrder
    employment_type?: SortOrder
    salary_range_min?: SortOrder
    salary_range_max?: SortOrder
    currency?: SortOrder
    posting_date?: SortOrder
    closing_date?: SortOrder
    status?: SortOrder
    headcount?: SortOrder
    filled_count?: SortOrder
    description?: SortOrder
    description_th?: SortOrder
    requirements?: SortOrder
    benefits?: SortOrder
    hiring_manager_id?: SortOrder
    hr_recruiter_id?: SortOrder
    is_internal?: SortOrder
    is_external?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type JobPostingAvgOrderByAggregateInput = {
    salary_range_min?: SortOrder
    salary_range_max?: SortOrder
    headcount?: SortOrder
    filled_count?: SortOrder
  }

  export type JobPostingMaxOrderByAggregateInput = {
    id?: SortOrder
    position_id?: SortOrder
    position_title?: SortOrder
    position_title_th?: SortOrder
    department?: SortOrder
    department_th?: SortOrder
    company?: SortOrder
    location?: SortOrder
    location_th?: SortOrder
    job_family?: SortOrder
    employment_type?: SortOrder
    salary_range_min?: SortOrder
    salary_range_max?: SortOrder
    currency?: SortOrder
    posting_date?: SortOrder
    closing_date?: SortOrder
    status?: SortOrder
    headcount?: SortOrder
    filled_count?: SortOrder
    description?: SortOrder
    description_th?: SortOrder
    hiring_manager_id?: SortOrder
    hr_recruiter_id?: SortOrder
    is_internal?: SortOrder
    is_external?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type JobPostingMinOrderByAggregateInput = {
    id?: SortOrder
    position_id?: SortOrder
    position_title?: SortOrder
    position_title_th?: SortOrder
    department?: SortOrder
    department_th?: SortOrder
    company?: SortOrder
    location?: SortOrder
    location_th?: SortOrder
    job_family?: SortOrder
    employment_type?: SortOrder
    salary_range_min?: SortOrder
    salary_range_max?: SortOrder
    currency?: SortOrder
    posting_date?: SortOrder
    closing_date?: SortOrder
    status?: SortOrder
    headcount?: SortOrder
    filled_count?: SortOrder
    description?: SortOrder
    description_th?: SortOrder
    hiring_manager_id?: SortOrder
    hr_recruiter_id?: SortOrder
    is_internal?: SortOrder
    is_external?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type JobPostingSumOrderByAggregateInput = {
    salary_range_min?: SortOrder
    salary_range_max?: SortOrder
    headcount?: SortOrder
    filled_count?: SortOrder
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

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
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

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type JobPostingScalarRelationFilter = {
    is?: JobPostingWhereInput
    isNot?: JobPostingWhereInput
  }

  export type ScreeningListRelationFilter = {
    every?: ScreeningWhereInput
    some?: ScreeningWhereInput
    none?: ScreeningWhereInput
  }

  export type ScreeningOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CandidateCountOrderByAggregateInput = {
    id?: SortOrder
    job_posting_id?: SortOrder
    first_name?: SortOrder
    last_name?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    resume_url?: SortOrder
    source?: SortOrder
    status?: SortOrder
    current_stage?: SortOrder
    applied_date?: SortOrder
    notes?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type CandidateMaxOrderByAggregateInput = {
    id?: SortOrder
    job_posting_id?: SortOrder
    first_name?: SortOrder
    last_name?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    resume_url?: SortOrder
    source?: SortOrder
    status?: SortOrder
    current_stage?: SortOrder
    applied_date?: SortOrder
    notes?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type CandidateMinOrderByAggregateInput = {
    id?: SortOrder
    job_posting_id?: SortOrder
    first_name?: SortOrder
    last_name?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    resume_url?: SortOrder
    source?: SortOrder
    status?: SortOrder
    current_stage?: SortOrder
    applied_date?: SortOrder
    notes?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type CandidateScalarRelationFilter = {
    is?: CandidateWhereInput
    isNot?: CandidateWhereInput
  }

  export type ScreeningCountOrderByAggregateInput = {
    id?: SortOrder
    candidate_id?: SortOrder
    stage?: SortOrder
    status?: SortOrder
    scheduled_date?: SortOrder
    completed_date?: SortOrder
    interviewer_id?: SortOrder
    score?: SortOrder
    feedback?: SortOrder
    recommendation?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type ScreeningAvgOrderByAggregateInput = {
    score?: SortOrder
  }

  export type ScreeningMaxOrderByAggregateInput = {
    id?: SortOrder
    candidate_id?: SortOrder
    stage?: SortOrder
    status?: SortOrder
    scheduled_date?: SortOrder
    completed_date?: SortOrder
    interviewer_id?: SortOrder
    score?: SortOrder
    feedback?: SortOrder
    recommendation?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type ScreeningMinOrderByAggregateInput = {
    id?: SortOrder
    candidate_id?: SortOrder
    stage?: SortOrder
    status?: SortOrder
    scheduled_date?: SortOrder
    completed_date?: SortOrder
    interviewer_id?: SortOrder
    score?: SortOrder
    feedback?: SortOrder
    recommendation?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type ScreeningSumOrderByAggregateInput = {
    score?: SortOrder
  }

  export type OnboardingTaskListRelationFilter = {
    every?: OnboardingTaskWhereInput
    some?: OnboardingTaskWhereInput
    none?: OnboardingTaskWhereInput
  }

  export type OnboardingTaskOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type OnboardingTemplateCountOrderByAggregateInput = {
    id?: SortOrder
    name_en?: SortOrder
    name_th?: SortOrder
    department?: SortOrder
    is_default?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type OnboardingTemplateMaxOrderByAggregateInput = {
    id?: SortOrder
    name_en?: SortOrder
    name_th?: SortOrder
    department?: SortOrder
    is_default?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type OnboardingTemplateMinOrderByAggregateInput = {
    id?: SortOrder
    name_en?: SortOrder
    name_th?: SortOrder
    department?: SortOrder
    is_default?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type OnboardingTemplateNullableScalarRelationFilter = {
    is?: OnboardingTemplateWhereInput | null
    isNot?: OnboardingTemplateWhereInput | null
  }

  export type OnboardingTaskCountOrderByAggregateInput = {
    id?: SortOrder
    template_id?: SortOrder
    employee_id?: SortOrder
    category?: SortOrder
    title_en?: SortOrder
    title_th?: SortOrder
    description_en?: SortOrder
    description_th?: SortOrder
    required?: SortOrder
    status?: SortOrder
    due_date?: SortOrder
    completed_date?: SortOrder
    completed_by?: SortOrder
    assigned_to?: SortOrder
    sort_order?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type OnboardingTaskAvgOrderByAggregateInput = {
    sort_order?: SortOrder
  }

  export type OnboardingTaskMaxOrderByAggregateInput = {
    id?: SortOrder
    template_id?: SortOrder
    employee_id?: SortOrder
    category?: SortOrder
    title_en?: SortOrder
    title_th?: SortOrder
    description_en?: SortOrder
    description_th?: SortOrder
    required?: SortOrder
    status?: SortOrder
    due_date?: SortOrder
    completed_date?: SortOrder
    completed_by?: SortOrder
    assigned_to?: SortOrder
    sort_order?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type OnboardingTaskMinOrderByAggregateInput = {
    id?: SortOrder
    template_id?: SortOrder
    employee_id?: SortOrder
    category?: SortOrder
    title_en?: SortOrder
    title_th?: SortOrder
    description_en?: SortOrder
    description_th?: SortOrder
    required?: SortOrder
    status?: SortOrder
    due_date?: SortOrder
    completed_date?: SortOrder
    completed_by?: SortOrder
    assigned_to?: SortOrder
    sort_order?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type OnboardingTaskSumOrderByAggregateInput = {
    sort_order?: SortOrder
  }

  export type ClearanceItemListRelationFilter = {
    every?: ClearanceItemWhereInput
    some?: ClearanceItemWhereInput
    none?: ClearanceItemWhereInput
  }

  export type ClearanceItemOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ResignationCountOrderByAggregateInput = {
    id?: SortOrder
    employee_id?: SortOrder
    employee_name?: SortOrder
    department?: SortOrder
    position?: SortOrder
    submission_date?: SortOrder
    last_working_date?: SortOrder
    reason_type?: SortOrder
    reason_detail?: SortOrder
    status?: SortOrder
    manager_id?: SortOrder
    manager_approved_at?: SortOrder
    manager_comments?: SortOrder
    hr_clearance_completed?: SortOrder
    hr_clearance_date?: SortOrder
    settlement_amount?: SortOrder
    settlement_date?: SortOrder
    exit_interview_date?: SortOrder
    exit_interview_notes?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type ResignationAvgOrderByAggregateInput = {
    settlement_amount?: SortOrder
  }

  export type ResignationMaxOrderByAggregateInput = {
    id?: SortOrder
    employee_id?: SortOrder
    employee_name?: SortOrder
    department?: SortOrder
    position?: SortOrder
    submission_date?: SortOrder
    last_working_date?: SortOrder
    reason_type?: SortOrder
    reason_detail?: SortOrder
    status?: SortOrder
    manager_id?: SortOrder
    manager_approved_at?: SortOrder
    manager_comments?: SortOrder
    hr_clearance_completed?: SortOrder
    hr_clearance_date?: SortOrder
    settlement_amount?: SortOrder
    settlement_date?: SortOrder
    exit_interview_date?: SortOrder
    exit_interview_notes?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type ResignationMinOrderByAggregateInput = {
    id?: SortOrder
    employee_id?: SortOrder
    employee_name?: SortOrder
    department?: SortOrder
    position?: SortOrder
    submission_date?: SortOrder
    last_working_date?: SortOrder
    reason_type?: SortOrder
    reason_detail?: SortOrder
    status?: SortOrder
    manager_id?: SortOrder
    manager_approved_at?: SortOrder
    manager_comments?: SortOrder
    hr_clearance_completed?: SortOrder
    hr_clearance_date?: SortOrder
    settlement_amount?: SortOrder
    settlement_date?: SortOrder
    exit_interview_date?: SortOrder
    exit_interview_notes?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type ResignationSumOrderByAggregateInput = {
    settlement_amount?: SortOrder
  }

  export type ResignationScalarRelationFilter = {
    is?: ResignationWhereInput
    isNot?: ResignationWhereInput
  }

  export type ClearanceItemCountOrderByAggregateInput = {
    id?: SortOrder
    resignation_id?: SortOrder
    category?: SortOrder
    item_name?: SortOrder
    item_name_th?: SortOrder
    required?: SortOrder
    status?: SortOrder
    completed_date?: SortOrder
    completed_by?: SortOrder
    notes?: SortOrder
  }

  export type ClearanceItemMaxOrderByAggregateInput = {
    id?: SortOrder
    resignation_id?: SortOrder
    category?: SortOrder
    item_name?: SortOrder
    item_name_th?: SortOrder
    required?: SortOrder
    status?: SortOrder
    completed_date?: SortOrder
    completed_by?: SortOrder
    notes?: SortOrder
  }

  export type ClearanceItemMinOrderByAggregateInput = {
    id?: SortOrder
    resignation_id?: SortOrder
    category?: SortOrder
    item_name?: SortOrder
    item_name_th?: SortOrder
    required?: SortOrder
    status?: SortOrder
    completed_date?: SortOrder
    completed_by?: SortOrder
    notes?: SortOrder
  }

  export type AuditLogCountOrderByAggregateInput = {
    id?: SortOrder
    entity_type?: SortOrder
    entity_id?: SortOrder
    action?: SortOrder
    performed_by?: SortOrder
    details?: SortOrder
    created_at?: SortOrder
  }

  export type AuditLogMaxOrderByAggregateInput = {
    id?: SortOrder
    entity_type?: SortOrder
    entity_id?: SortOrder
    action?: SortOrder
    performed_by?: SortOrder
    details?: SortOrder
    created_at?: SortOrder
  }

  export type AuditLogMinOrderByAggregateInput = {
    id?: SortOrder
    entity_type?: SortOrder
    entity_id?: SortOrder
    action?: SortOrder
    performed_by?: SortOrder
    details?: SortOrder
    created_at?: SortOrder
  }

  export type JobPostingCreaterequirementsInput = {
    set: string[]
  }

  export type JobPostingCreatebenefitsInput = {
    set: string[]
  }

  export type CandidateCreateNestedManyWithoutJob_postingInput = {
    create?: XOR<CandidateCreateWithoutJob_postingInput, CandidateUncheckedCreateWithoutJob_postingInput> | CandidateCreateWithoutJob_postingInput[] | CandidateUncheckedCreateWithoutJob_postingInput[]
    connectOrCreate?: CandidateCreateOrConnectWithoutJob_postingInput | CandidateCreateOrConnectWithoutJob_postingInput[]
    createMany?: CandidateCreateManyJob_postingInputEnvelope
    connect?: CandidateWhereUniqueInput | CandidateWhereUniqueInput[]
  }

  export type CandidateUncheckedCreateNestedManyWithoutJob_postingInput = {
    create?: XOR<CandidateCreateWithoutJob_postingInput, CandidateUncheckedCreateWithoutJob_postingInput> | CandidateCreateWithoutJob_postingInput[] | CandidateUncheckedCreateWithoutJob_postingInput[]
    connectOrCreate?: CandidateCreateOrConnectWithoutJob_postingInput | CandidateCreateOrConnectWithoutJob_postingInput[]
    createMany?: CandidateCreateManyJob_postingInputEnvelope
    connect?: CandidateWhereUniqueInput | CandidateWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type JobPostingUpdaterequirementsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type JobPostingUpdatebenefitsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type CandidateUpdateManyWithoutJob_postingNestedInput = {
    create?: XOR<CandidateCreateWithoutJob_postingInput, CandidateUncheckedCreateWithoutJob_postingInput> | CandidateCreateWithoutJob_postingInput[] | CandidateUncheckedCreateWithoutJob_postingInput[]
    connectOrCreate?: CandidateCreateOrConnectWithoutJob_postingInput | CandidateCreateOrConnectWithoutJob_postingInput[]
    upsert?: CandidateUpsertWithWhereUniqueWithoutJob_postingInput | CandidateUpsertWithWhereUniqueWithoutJob_postingInput[]
    createMany?: CandidateCreateManyJob_postingInputEnvelope
    set?: CandidateWhereUniqueInput | CandidateWhereUniqueInput[]
    disconnect?: CandidateWhereUniqueInput | CandidateWhereUniqueInput[]
    delete?: CandidateWhereUniqueInput | CandidateWhereUniqueInput[]
    connect?: CandidateWhereUniqueInput | CandidateWhereUniqueInput[]
    update?: CandidateUpdateWithWhereUniqueWithoutJob_postingInput | CandidateUpdateWithWhereUniqueWithoutJob_postingInput[]
    updateMany?: CandidateUpdateManyWithWhereWithoutJob_postingInput | CandidateUpdateManyWithWhereWithoutJob_postingInput[]
    deleteMany?: CandidateScalarWhereInput | CandidateScalarWhereInput[]
  }

  export type CandidateUncheckedUpdateManyWithoutJob_postingNestedInput = {
    create?: XOR<CandidateCreateWithoutJob_postingInput, CandidateUncheckedCreateWithoutJob_postingInput> | CandidateCreateWithoutJob_postingInput[] | CandidateUncheckedCreateWithoutJob_postingInput[]
    connectOrCreate?: CandidateCreateOrConnectWithoutJob_postingInput | CandidateCreateOrConnectWithoutJob_postingInput[]
    upsert?: CandidateUpsertWithWhereUniqueWithoutJob_postingInput | CandidateUpsertWithWhereUniqueWithoutJob_postingInput[]
    createMany?: CandidateCreateManyJob_postingInputEnvelope
    set?: CandidateWhereUniqueInput | CandidateWhereUniqueInput[]
    disconnect?: CandidateWhereUniqueInput | CandidateWhereUniqueInput[]
    delete?: CandidateWhereUniqueInput | CandidateWhereUniqueInput[]
    connect?: CandidateWhereUniqueInput | CandidateWhereUniqueInput[]
    update?: CandidateUpdateWithWhereUniqueWithoutJob_postingInput | CandidateUpdateWithWhereUniqueWithoutJob_postingInput[]
    updateMany?: CandidateUpdateManyWithWhereWithoutJob_postingInput | CandidateUpdateManyWithWhereWithoutJob_postingInput[]
    deleteMany?: CandidateScalarWhereInput | CandidateScalarWhereInput[]
  }

  export type JobPostingCreateNestedOneWithoutCandidatesInput = {
    create?: XOR<JobPostingCreateWithoutCandidatesInput, JobPostingUncheckedCreateWithoutCandidatesInput>
    connectOrCreate?: JobPostingCreateOrConnectWithoutCandidatesInput
    connect?: JobPostingWhereUniqueInput
  }

  export type ScreeningCreateNestedManyWithoutCandidateInput = {
    create?: XOR<ScreeningCreateWithoutCandidateInput, ScreeningUncheckedCreateWithoutCandidateInput> | ScreeningCreateWithoutCandidateInput[] | ScreeningUncheckedCreateWithoutCandidateInput[]
    connectOrCreate?: ScreeningCreateOrConnectWithoutCandidateInput | ScreeningCreateOrConnectWithoutCandidateInput[]
    createMany?: ScreeningCreateManyCandidateInputEnvelope
    connect?: ScreeningWhereUniqueInput | ScreeningWhereUniqueInput[]
  }

  export type ScreeningUncheckedCreateNestedManyWithoutCandidateInput = {
    create?: XOR<ScreeningCreateWithoutCandidateInput, ScreeningUncheckedCreateWithoutCandidateInput> | ScreeningCreateWithoutCandidateInput[] | ScreeningUncheckedCreateWithoutCandidateInput[]
    connectOrCreate?: ScreeningCreateOrConnectWithoutCandidateInput | ScreeningCreateOrConnectWithoutCandidateInput[]
    createMany?: ScreeningCreateManyCandidateInputEnvelope
    connect?: ScreeningWhereUniqueInput | ScreeningWhereUniqueInput[]
  }

  export type JobPostingUpdateOneRequiredWithoutCandidatesNestedInput = {
    create?: XOR<JobPostingCreateWithoutCandidatesInput, JobPostingUncheckedCreateWithoutCandidatesInput>
    connectOrCreate?: JobPostingCreateOrConnectWithoutCandidatesInput
    upsert?: JobPostingUpsertWithoutCandidatesInput
    connect?: JobPostingWhereUniqueInput
    update?: XOR<XOR<JobPostingUpdateToOneWithWhereWithoutCandidatesInput, JobPostingUpdateWithoutCandidatesInput>, JobPostingUncheckedUpdateWithoutCandidatesInput>
  }

  export type ScreeningUpdateManyWithoutCandidateNestedInput = {
    create?: XOR<ScreeningCreateWithoutCandidateInput, ScreeningUncheckedCreateWithoutCandidateInput> | ScreeningCreateWithoutCandidateInput[] | ScreeningUncheckedCreateWithoutCandidateInput[]
    connectOrCreate?: ScreeningCreateOrConnectWithoutCandidateInput | ScreeningCreateOrConnectWithoutCandidateInput[]
    upsert?: ScreeningUpsertWithWhereUniqueWithoutCandidateInput | ScreeningUpsertWithWhereUniqueWithoutCandidateInput[]
    createMany?: ScreeningCreateManyCandidateInputEnvelope
    set?: ScreeningWhereUniqueInput | ScreeningWhereUniqueInput[]
    disconnect?: ScreeningWhereUniqueInput | ScreeningWhereUniqueInput[]
    delete?: ScreeningWhereUniqueInput | ScreeningWhereUniqueInput[]
    connect?: ScreeningWhereUniqueInput | ScreeningWhereUniqueInput[]
    update?: ScreeningUpdateWithWhereUniqueWithoutCandidateInput | ScreeningUpdateWithWhereUniqueWithoutCandidateInput[]
    updateMany?: ScreeningUpdateManyWithWhereWithoutCandidateInput | ScreeningUpdateManyWithWhereWithoutCandidateInput[]
    deleteMany?: ScreeningScalarWhereInput | ScreeningScalarWhereInput[]
  }

  export type ScreeningUncheckedUpdateManyWithoutCandidateNestedInput = {
    create?: XOR<ScreeningCreateWithoutCandidateInput, ScreeningUncheckedCreateWithoutCandidateInput> | ScreeningCreateWithoutCandidateInput[] | ScreeningUncheckedCreateWithoutCandidateInput[]
    connectOrCreate?: ScreeningCreateOrConnectWithoutCandidateInput | ScreeningCreateOrConnectWithoutCandidateInput[]
    upsert?: ScreeningUpsertWithWhereUniqueWithoutCandidateInput | ScreeningUpsertWithWhereUniqueWithoutCandidateInput[]
    createMany?: ScreeningCreateManyCandidateInputEnvelope
    set?: ScreeningWhereUniqueInput | ScreeningWhereUniqueInput[]
    disconnect?: ScreeningWhereUniqueInput | ScreeningWhereUniqueInput[]
    delete?: ScreeningWhereUniqueInput | ScreeningWhereUniqueInput[]
    connect?: ScreeningWhereUniqueInput | ScreeningWhereUniqueInput[]
    update?: ScreeningUpdateWithWhereUniqueWithoutCandidateInput | ScreeningUpdateWithWhereUniqueWithoutCandidateInput[]
    updateMany?: ScreeningUpdateManyWithWhereWithoutCandidateInput | ScreeningUpdateManyWithWhereWithoutCandidateInput[]
    deleteMany?: ScreeningScalarWhereInput | ScreeningScalarWhereInput[]
  }

  export type CandidateCreateNestedOneWithoutScreeningsInput = {
    create?: XOR<CandidateCreateWithoutScreeningsInput, CandidateUncheckedCreateWithoutScreeningsInput>
    connectOrCreate?: CandidateCreateOrConnectWithoutScreeningsInput
    connect?: CandidateWhereUniqueInput
  }

  export type CandidateUpdateOneRequiredWithoutScreeningsNestedInput = {
    create?: XOR<CandidateCreateWithoutScreeningsInput, CandidateUncheckedCreateWithoutScreeningsInput>
    connectOrCreate?: CandidateCreateOrConnectWithoutScreeningsInput
    upsert?: CandidateUpsertWithoutScreeningsInput
    connect?: CandidateWhereUniqueInput
    update?: XOR<XOR<CandidateUpdateToOneWithWhereWithoutScreeningsInput, CandidateUpdateWithoutScreeningsInput>, CandidateUncheckedUpdateWithoutScreeningsInput>
  }

  export type OnboardingTaskCreateNestedManyWithoutTemplateInput = {
    create?: XOR<OnboardingTaskCreateWithoutTemplateInput, OnboardingTaskUncheckedCreateWithoutTemplateInput> | OnboardingTaskCreateWithoutTemplateInput[] | OnboardingTaskUncheckedCreateWithoutTemplateInput[]
    connectOrCreate?: OnboardingTaskCreateOrConnectWithoutTemplateInput | OnboardingTaskCreateOrConnectWithoutTemplateInput[]
    createMany?: OnboardingTaskCreateManyTemplateInputEnvelope
    connect?: OnboardingTaskWhereUniqueInput | OnboardingTaskWhereUniqueInput[]
  }

  export type OnboardingTaskUncheckedCreateNestedManyWithoutTemplateInput = {
    create?: XOR<OnboardingTaskCreateWithoutTemplateInput, OnboardingTaskUncheckedCreateWithoutTemplateInput> | OnboardingTaskCreateWithoutTemplateInput[] | OnboardingTaskUncheckedCreateWithoutTemplateInput[]
    connectOrCreate?: OnboardingTaskCreateOrConnectWithoutTemplateInput | OnboardingTaskCreateOrConnectWithoutTemplateInput[]
    createMany?: OnboardingTaskCreateManyTemplateInputEnvelope
    connect?: OnboardingTaskWhereUniqueInput | OnboardingTaskWhereUniqueInput[]
  }

  export type OnboardingTaskUpdateManyWithoutTemplateNestedInput = {
    create?: XOR<OnboardingTaskCreateWithoutTemplateInput, OnboardingTaskUncheckedCreateWithoutTemplateInput> | OnboardingTaskCreateWithoutTemplateInput[] | OnboardingTaskUncheckedCreateWithoutTemplateInput[]
    connectOrCreate?: OnboardingTaskCreateOrConnectWithoutTemplateInput | OnboardingTaskCreateOrConnectWithoutTemplateInput[]
    upsert?: OnboardingTaskUpsertWithWhereUniqueWithoutTemplateInput | OnboardingTaskUpsertWithWhereUniqueWithoutTemplateInput[]
    createMany?: OnboardingTaskCreateManyTemplateInputEnvelope
    set?: OnboardingTaskWhereUniqueInput | OnboardingTaskWhereUniqueInput[]
    disconnect?: OnboardingTaskWhereUniqueInput | OnboardingTaskWhereUniqueInput[]
    delete?: OnboardingTaskWhereUniqueInput | OnboardingTaskWhereUniqueInput[]
    connect?: OnboardingTaskWhereUniqueInput | OnboardingTaskWhereUniqueInput[]
    update?: OnboardingTaskUpdateWithWhereUniqueWithoutTemplateInput | OnboardingTaskUpdateWithWhereUniqueWithoutTemplateInput[]
    updateMany?: OnboardingTaskUpdateManyWithWhereWithoutTemplateInput | OnboardingTaskUpdateManyWithWhereWithoutTemplateInput[]
    deleteMany?: OnboardingTaskScalarWhereInput | OnboardingTaskScalarWhereInput[]
  }

  export type OnboardingTaskUncheckedUpdateManyWithoutTemplateNestedInput = {
    create?: XOR<OnboardingTaskCreateWithoutTemplateInput, OnboardingTaskUncheckedCreateWithoutTemplateInput> | OnboardingTaskCreateWithoutTemplateInput[] | OnboardingTaskUncheckedCreateWithoutTemplateInput[]
    connectOrCreate?: OnboardingTaskCreateOrConnectWithoutTemplateInput | OnboardingTaskCreateOrConnectWithoutTemplateInput[]
    upsert?: OnboardingTaskUpsertWithWhereUniqueWithoutTemplateInput | OnboardingTaskUpsertWithWhereUniqueWithoutTemplateInput[]
    createMany?: OnboardingTaskCreateManyTemplateInputEnvelope
    set?: OnboardingTaskWhereUniqueInput | OnboardingTaskWhereUniqueInput[]
    disconnect?: OnboardingTaskWhereUniqueInput | OnboardingTaskWhereUniqueInput[]
    delete?: OnboardingTaskWhereUniqueInput | OnboardingTaskWhereUniqueInput[]
    connect?: OnboardingTaskWhereUniqueInput | OnboardingTaskWhereUniqueInput[]
    update?: OnboardingTaskUpdateWithWhereUniqueWithoutTemplateInput | OnboardingTaskUpdateWithWhereUniqueWithoutTemplateInput[]
    updateMany?: OnboardingTaskUpdateManyWithWhereWithoutTemplateInput | OnboardingTaskUpdateManyWithWhereWithoutTemplateInput[]
    deleteMany?: OnboardingTaskScalarWhereInput | OnboardingTaskScalarWhereInput[]
  }

  export type OnboardingTemplateCreateNestedOneWithoutTasksInput = {
    create?: XOR<OnboardingTemplateCreateWithoutTasksInput, OnboardingTemplateUncheckedCreateWithoutTasksInput>
    connectOrCreate?: OnboardingTemplateCreateOrConnectWithoutTasksInput
    connect?: OnboardingTemplateWhereUniqueInput
  }

  export type OnboardingTemplateUpdateOneWithoutTasksNestedInput = {
    create?: XOR<OnboardingTemplateCreateWithoutTasksInput, OnboardingTemplateUncheckedCreateWithoutTasksInput>
    connectOrCreate?: OnboardingTemplateCreateOrConnectWithoutTasksInput
    upsert?: OnboardingTemplateUpsertWithoutTasksInput
    disconnect?: OnboardingTemplateWhereInput | boolean
    delete?: OnboardingTemplateWhereInput | boolean
    connect?: OnboardingTemplateWhereUniqueInput
    update?: XOR<XOR<OnboardingTemplateUpdateToOneWithWhereWithoutTasksInput, OnboardingTemplateUpdateWithoutTasksInput>, OnboardingTemplateUncheckedUpdateWithoutTasksInput>
  }

  export type ClearanceItemCreateNestedManyWithoutResignationInput = {
    create?: XOR<ClearanceItemCreateWithoutResignationInput, ClearanceItemUncheckedCreateWithoutResignationInput> | ClearanceItemCreateWithoutResignationInput[] | ClearanceItemUncheckedCreateWithoutResignationInput[]
    connectOrCreate?: ClearanceItemCreateOrConnectWithoutResignationInput | ClearanceItemCreateOrConnectWithoutResignationInput[]
    createMany?: ClearanceItemCreateManyResignationInputEnvelope
    connect?: ClearanceItemWhereUniqueInput | ClearanceItemWhereUniqueInput[]
  }

  export type ClearanceItemUncheckedCreateNestedManyWithoutResignationInput = {
    create?: XOR<ClearanceItemCreateWithoutResignationInput, ClearanceItemUncheckedCreateWithoutResignationInput> | ClearanceItemCreateWithoutResignationInput[] | ClearanceItemUncheckedCreateWithoutResignationInput[]
    connectOrCreate?: ClearanceItemCreateOrConnectWithoutResignationInput | ClearanceItemCreateOrConnectWithoutResignationInput[]
    createMany?: ClearanceItemCreateManyResignationInputEnvelope
    connect?: ClearanceItemWhereUniqueInput | ClearanceItemWhereUniqueInput[]
  }

  export type ClearanceItemUpdateManyWithoutResignationNestedInput = {
    create?: XOR<ClearanceItemCreateWithoutResignationInput, ClearanceItemUncheckedCreateWithoutResignationInput> | ClearanceItemCreateWithoutResignationInput[] | ClearanceItemUncheckedCreateWithoutResignationInput[]
    connectOrCreate?: ClearanceItemCreateOrConnectWithoutResignationInput | ClearanceItemCreateOrConnectWithoutResignationInput[]
    upsert?: ClearanceItemUpsertWithWhereUniqueWithoutResignationInput | ClearanceItemUpsertWithWhereUniqueWithoutResignationInput[]
    createMany?: ClearanceItemCreateManyResignationInputEnvelope
    set?: ClearanceItemWhereUniqueInput | ClearanceItemWhereUniqueInput[]
    disconnect?: ClearanceItemWhereUniqueInput | ClearanceItemWhereUniqueInput[]
    delete?: ClearanceItemWhereUniqueInput | ClearanceItemWhereUniqueInput[]
    connect?: ClearanceItemWhereUniqueInput | ClearanceItemWhereUniqueInput[]
    update?: ClearanceItemUpdateWithWhereUniqueWithoutResignationInput | ClearanceItemUpdateWithWhereUniqueWithoutResignationInput[]
    updateMany?: ClearanceItemUpdateManyWithWhereWithoutResignationInput | ClearanceItemUpdateManyWithWhereWithoutResignationInput[]
    deleteMany?: ClearanceItemScalarWhereInput | ClearanceItemScalarWhereInput[]
  }

  export type ClearanceItemUncheckedUpdateManyWithoutResignationNestedInput = {
    create?: XOR<ClearanceItemCreateWithoutResignationInput, ClearanceItemUncheckedCreateWithoutResignationInput> | ClearanceItemCreateWithoutResignationInput[] | ClearanceItemUncheckedCreateWithoutResignationInput[]
    connectOrCreate?: ClearanceItemCreateOrConnectWithoutResignationInput | ClearanceItemCreateOrConnectWithoutResignationInput[]
    upsert?: ClearanceItemUpsertWithWhereUniqueWithoutResignationInput | ClearanceItemUpsertWithWhereUniqueWithoutResignationInput[]
    createMany?: ClearanceItemCreateManyResignationInputEnvelope
    set?: ClearanceItemWhereUniqueInput | ClearanceItemWhereUniqueInput[]
    disconnect?: ClearanceItemWhereUniqueInput | ClearanceItemWhereUniqueInput[]
    delete?: ClearanceItemWhereUniqueInput | ClearanceItemWhereUniqueInput[]
    connect?: ClearanceItemWhereUniqueInput | ClearanceItemWhereUniqueInput[]
    update?: ClearanceItemUpdateWithWhereUniqueWithoutResignationInput | ClearanceItemUpdateWithWhereUniqueWithoutResignationInput[]
    updateMany?: ClearanceItemUpdateManyWithWhereWithoutResignationInput | ClearanceItemUpdateManyWithWhereWithoutResignationInput[]
    deleteMany?: ClearanceItemScalarWhereInput | ClearanceItemScalarWhereInput[]
  }

  export type ResignationCreateNestedOneWithoutClearance_itemsInput = {
    create?: XOR<ResignationCreateWithoutClearance_itemsInput, ResignationUncheckedCreateWithoutClearance_itemsInput>
    connectOrCreate?: ResignationCreateOrConnectWithoutClearance_itemsInput
    connect?: ResignationWhereUniqueInput
  }

  export type ResignationUpdateOneRequiredWithoutClearance_itemsNestedInput = {
    create?: XOR<ResignationCreateWithoutClearance_itemsInput, ResignationUncheckedCreateWithoutClearance_itemsInput>
    connectOrCreate?: ResignationCreateOrConnectWithoutClearance_itemsInput
    upsert?: ResignationUpsertWithoutClearance_itemsInput
    connect?: ResignationWhereUniqueInput
    update?: XOR<XOR<ResignationUpdateToOneWithWhereWithoutClearance_itemsInput, ResignationUpdateWithoutClearance_itemsInput>, ResignationUncheckedUpdateWithoutClearance_itemsInput>
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

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
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

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
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

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
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

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type CandidateCreateWithoutJob_postingInput = {
    id?: string
    first_name: string
    last_name: string
    email: string
    phone?: string | null
    resume_url?: string | null
    source?: string | null
    status?: string
    current_stage?: string
    applied_date?: Date | string
    notes?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    screenings?: ScreeningCreateNestedManyWithoutCandidateInput
  }

  export type CandidateUncheckedCreateWithoutJob_postingInput = {
    id?: string
    first_name: string
    last_name: string
    email: string
    phone?: string | null
    resume_url?: string | null
    source?: string | null
    status?: string
    current_stage?: string
    applied_date?: Date | string
    notes?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    screenings?: ScreeningUncheckedCreateNestedManyWithoutCandidateInput
  }

  export type CandidateCreateOrConnectWithoutJob_postingInput = {
    where: CandidateWhereUniqueInput
    create: XOR<CandidateCreateWithoutJob_postingInput, CandidateUncheckedCreateWithoutJob_postingInput>
  }

  export type CandidateCreateManyJob_postingInputEnvelope = {
    data: CandidateCreateManyJob_postingInput | CandidateCreateManyJob_postingInput[]
    skipDuplicates?: boolean
  }

  export type CandidateUpsertWithWhereUniqueWithoutJob_postingInput = {
    where: CandidateWhereUniqueInput
    update: XOR<CandidateUpdateWithoutJob_postingInput, CandidateUncheckedUpdateWithoutJob_postingInput>
    create: XOR<CandidateCreateWithoutJob_postingInput, CandidateUncheckedCreateWithoutJob_postingInput>
  }

  export type CandidateUpdateWithWhereUniqueWithoutJob_postingInput = {
    where: CandidateWhereUniqueInput
    data: XOR<CandidateUpdateWithoutJob_postingInput, CandidateUncheckedUpdateWithoutJob_postingInput>
  }

  export type CandidateUpdateManyWithWhereWithoutJob_postingInput = {
    where: CandidateScalarWhereInput
    data: XOR<CandidateUpdateManyMutationInput, CandidateUncheckedUpdateManyWithoutJob_postingInput>
  }

  export type CandidateScalarWhereInput = {
    AND?: CandidateScalarWhereInput | CandidateScalarWhereInput[]
    OR?: CandidateScalarWhereInput[]
    NOT?: CandidateScalarWhereInput | CandidateScalarWhereInput[]
    id?: StringFilter<"Candidate"> | string
    job_posting_id?: StringFilter<"Candidate"> | string
    first_name?: StringFilter<"Candidate"> | string
    last_name?: StringFilter<"Candidate"> | string
    email?: StringFilter<"Candidate"> | string
    phone?: StringNullableFilter<"Candidate"> | string | null
    resume_url?: StringNullableFilter<"Candidate"> | string | null
    source?: StringNullableFilter<"Candidate"> | string | null
    status?: StringFilter<"Candidate"> | string
    current_stage?: StringFilter<"Candidate"> | string
    applied_date?: DateTimeFilter<"Candidate"> | Date | string
    notes?: StringNullableFilter<"Candidate"> | string | null
    created_at?: DateTimeFilter<"Candidate"> | Date | string
    updated_at?: DateTimeFilter<"Candidate"> | Date | string
  }

  export type JobPostingCreateWithoutCandidatesInput = {
    id?: string
    position_id?: string | null
    position_title: string
    position_title_th?: string | null
    department: string
    department_th?: string | null
    company?: string
    location?: string | null
    location_th?: string | null
    job_family?: string | null
    employment_type?: string
    salary_range_min?: number | null
    salary_range_max?: number | null
    currency?: string
    posting_date?: Date | string
    closing_date?: Date | string | null
    status?: string
    headcount?: number
    filled_count?: number
    description?: string | null
    description_th?: string | null
    requirements?: JobPostingCreaterequirementsInput | string[]
    benefits?: JobPostingCreatebenefitsInput | string[]
    hiring_manager_id?: string | null
    hr_recruiter_id?: string | null
    is_internal?: boolean
    is_external?: boolean
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type JobPostingUncheckedCreateWithoutCandidatesInput = {
    id?: string
    position_id?: string | null
    position_title: string
    position_title_th?: string | null
    department: string
    department_th?: string | null
    company?: string
    location?: string | null
    location_th?: string | null
    job_family?: string | null
    employment_type?: string
    salary_range_min?: number | null
    salary_range_max?: number | null
    currency?: string
    posting_date?: Date | string
    closing_date?: Date | string | null
    status?: string
    headcount?: number
    filled_count?: number
    description?: string | null
    description_th?: string | null
    requirements?: JobPostingCreaterequirementsInput | string[]
    benefits?: JobPostingCreatebenefitsInput | string[]
    hiring_manager_id?: string | null
    hr_recruiter_id?: string | null
    is_internal?: boolean
    is_external?: boolean
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type JobPostingCreateOrConnectWithoutCandidatesInput = {
    where: JobPostingWhereUniqueInput
    create: XOR<JobPostingCreateWithoutCandidatesInput, JobPostingUncheckedCreateWithoutCandidatesInput>
  }

  export type ScreeningCreateWithoutCandidateInput = {
    id?: string
    stage: string
    status?: string
    scheduled_date?: Date | string | null
    completed_date?: Date | string | null
    interviewer_id?: string | null
    score?: number | null
    feedback?: string | null
    recommendation?: string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type ScreeningUncheckedCreateWithoutCandidateInput = {
    id?: string
    stage: string
    status?: string
    scheduled_date?: Date | string | null
    completed_date?: Date | string | null
    interviewer_id?: string | null
    score?: number | null
    feedback?: string | null
    recommendation?: string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type ScreeningCreateOrConnectWithoutCandidateInput = {
    where: ScreeningWhereUniqueInput
    create: XOR<ScreeningCreateWithoutCandidateInput, ScreeningUncheckedCreateWithoutCandidateInput>
  }

  export type ScreeningCreateManyCandidateInputEnvelope = {
    data: ScreeningCreateManyCandidateInput | ScreeningCreateManyCandidateInput[]
    skipDuplicates?: boolean
  }

  export type JobPostingUpsertWithoutCandidatesInput = {
    update: XOR<JobPostingUpdateWithoutCandidatesInput, JobPostingUncheckedUpdateWithoutCandidatesInput>
    create: XOR<JobPostingCreateWithoutCandidatesInput, JobPostingUncheckedCreateWithoutCandidatesInput>
    where?: JobPostingWhereInput
  }

  export type JobPostingUpdateToOneWithWhereWithoutCandidatesInput = {
    where?: JobPostingWhereInput
    data: XOR<JobPostingUpdateWithoutCandidatesInput, JobPostingUncheckedUpdateWithoutCandidatesInput>
  }

  export type JobPostingUpdateWithoutCandidatesInput = {
    id?: StringFieldUpdateOperationsInput | string
    position_id?: NullableStringFieldUpdateOperationsInput | string | null
    position_title?: StringFieldUpdateOperationsInput | string
    position_title_th?: NullableStringFieldUpdateOperationsInput | string | null
    department?: StringFieldUpdateOperationsInput | string
    department_th?: NullableStringFieldUpdateOperationsInput | string | null
    company?: StringFieldUpdateOperationsInput | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    location_th?: NullableStringFieldUpdateOperationsInput | string | null
    job_family?: NullableStringFieldUpdateOperationsInput | string | null
    employment_type?: StringFieldUpdateOperationsInput | string
    salary_range_min?: NullableFloatFieldUpdateOperationsInput | number | null
    salary_range_max?: NullableFloatFieldUpdateOperationsInput | number | null
    currency?: StringFieldUpdateOperationsInput | string
    posting_date?: DateTimeFieldUpdateOperationsInput | Date | string
    closing_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    headcount?: IntFieldUpdateOperationsInput | number
    filled_count?: IntFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    description_th?: NullableStringFieldUpdateOperationsInput | string | null
    requirements?: JobPostingUpdaterequirementsInput | string[]
    benefits?: JobPostingUpdatebenefitsInput | string[]
    hiring_manager_id?: NullableStringFieldUpdateOperationsInput | string | null
    hr_recruiter_id?: NullableStringFieldUpdateOperationsInput | string | null
    is_internal?: BoolFieldUpdateOperationsInput | boolean
    is_external?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type JobPostingUncheckedUpdateWithoutCandidatesInput = {
    id?: StringFieldUpdateOperationsInput | string
    position_id?: NullableStringFieldUpdateOperationsInput | string | null
    position_title?: StringFieldUpdateOperationsInput | string
    position_title_th?: NullableStringFieldUpdateOperationsInput | string | null
    department?: StringFieldUpdateOperationsInput | string
    department_th?: NullableStringFieldUpdateOperationsInput | string | null
    company?: StringFieldUpdateOperationsInput | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    location_th?: NullableStringFieldUpdateOperationsInput | string | null
    job_family?: NullableStringFieldUpdateOperationsInput | string | null
    employment_type?: StringFieldUpdateOperationsInput | string
    salary_range_min?: NullableFloatFieldUpdateOperationsInput | number | null
    salary_range_max?: NullableFloatFieldUpdateOperationsInput | number | null
    currency?: StringFieldUpdateOperationsInput | string
    posting_date?: DateTimeFieldUpdateOperationsInput | Date | string
    closing_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    headcount?: IntFieldUpdateOperationsInput | number
    filled_count?: IntFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    description_th?: NullableStringFieldUpdateOperationsInput | string | null
    requirements?: JobPostingUpdaterequirementsInput | string[]
    benefits?: JobPostingUpdatebenefitsInput | string[]
    hiring_manager_id?: NullableStringFieldUpdateOperationsInput | string | null
    hr_recruiter_id?: NullableStringFieldUpdateOperationsInput | string | null
    is_internal?: BoolFieldUpdateOperationsInput | boolean
    is_external?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ScreeningUpsertWithWhereUniqueWithoutCandidateInput = {
    where: ScreeningWhereUniqueInput
    update: XOR<ScreeningUpdateWithoutCandidateInput, ScreeningUncheckedUpdateWithoutCandidateInput>
    create: XOR<ScreeningCreateWithoutCandidateInput, ScreeningUncheckedCreateWithoutCandidateInput>
  }

  export type ScreeningUpdateWithWhereUniqueWithoutCandidateInput = {
    where: ScreeningWhereUniqueInput
    data: XOR<ScreeningUpdateWithoutCandidateInput, ScreeningUncheckedUpdateWithoutCandidateInput>
  }

  export type ScreeningUpdateManyWithWhereWithoutCandidateInput = {
    where: ScreeningScalarWhereInput
    data: XOR<ScreeningUpdateManyMutationInput, ScreeningUncheckedUpdateManyWithoutCandidateInput>
  }

  export type ScreeningScalarWhereInput = {
    AND?: ScreeningScalarWhereInput | ScreeningScalarWhereInput[]
    OR?: ScreeningScalarWhereInput[]
    NOT?: ScreeningScalarWhereInput | ScreeningScalarWhereInput[]
    id?: StringFilter<"Screening"> | string
    candidate_id?: StringFilter<"Screening"> | string
    stage?: StringFilter<"Screening"> | string
    status?: StringFilter<"Screening"> | string
    scheduled_date?: DateTimeNullableFilter<"Screening"> | Date | string | null
    completed_date?: DateTimeNullableFilter<"Screening"> | Date | string | null
    interviewer_id?: StringNullableFilter<"Screening"> | string | null
    score?: FloatNullableFilter<"Screening"> | number | null
    feedback?: StringNullableFilter<"Screening"> | string | null
    recommendation?: StringNullableFilter<"Screening"> | string | null
    created_at?: DateTimeFilter<"Screening"> | Date | string
    updated_at?: DateTimeFilter<"Screening"> | Date | string
  }

  export type CandidateCreateWithoutScreeningsInput = {
    id?: string
    first_name: string
    last_name: string
    email: string
    phone?: string | null
    resume_url?: string | null
    source?: string | null
    status?: string
    current_stage?: string
    applied_date?: Date | string
    notes?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    job_posting: JobPostingCreateNestedOneWithoutCandidatesInput
  }

  export type CandidateUncheckedCreateWithoutScreeningsInput = {
    id?: string
    job_posting_id: string
    first_name: string
    last_name: string
    email: string
    phone?: string | null
    resume_url?: string | null
    source?: string | null
    status?: string
    current_stage?: string
    applied_date?: Date | string
    notes?: string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type CandidateCreateOrConnectWithoutScreeningsInput = {
    where: CandidateWhereUniqueInput
    create: XOR<CandidateCreateWithoutScreeningsInput, CandidateUncheckedCreateWithoutScreeningsInput>
  }

  export type CandidateUpsertWithoutScreeningsInput = {
    update: XOR<CandidateUpdateWithoutScreeningsInput, CandidateUncheckedUpdateWithoutScreeningsInput>
    create: XOR<CandidateCreateWithoutScreeningsInput, CandidateUncheckedCreateWithoutScreeningsInput>
    where?: CandidateWhereInput
  }

  export type CandidateUpdateToOneWithWhereWithoutScreeningsInput = {
    where?: CandidateWhereInput
    data: XOR<CandidateUpdateWithoutScreeningsInput, CandidateUncheckedUpdateWithoutScreeningsInput>
  }

  export type CandidateUpdateWithoutScreeningsInput = {
    id?: StringFieldUpdateOperationsInput | string
    first_name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    resume_url?: NullableStringFieldUpdateOperationsInput | string | null
    source?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    current_stage?: StringFieldUpdateOperationsInput | string
    applied_date?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    job_posting?: JobPostingUpdateOneRequiredWithoutCandidatesNestedInput
  }

  export type CandidateUncheckedUpdateWithoutScreeningsInput = {
    id?: StringFieldUpdateOperationsInput | string
    job_posting_id?: StringFieldUpdateOperationsInput | string
    first_name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    resume_url?: NullableStringFieldUpdateOperationsInput | string | null
    source?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    current_stage?: StringFieldUpdateOperationsInput | string
    applied_date?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OnboardingTaskCreateWithoutTemplateInput = {
    id?: string
    employee_id?: string | null
    category: string
    title_en: string
    title_th?: string | null
    description_en?: string | null
    description_th?: string | null
    required?: boolean
    status?: string
    due_date?: Date | string | null
    completed_date?: Date | string | null
    completed_by?: string | null
    assigned_to?: string | null
    sort_order?: number
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type OnboardingTaskUncheckedCreateWithoutTemplateInput = {
    id?: string
    employee_id?: string | null
    category: string
    title_en: string
    title_th?: string | null
    description_en?: string | null
    description_th?: string | null
    required?: boolean
    status?: string
    due_date?: Date | string | null
    completed_date?: Date | string | null
    completed_by?: string | null
    assigned_to?: string | null
    sort_order?: number
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type OnboardingTaskCreateOrConnectWithoutTemplateInput = {
    where: OnboardingTaskWhereUniqueInput
    create: XOR<OnboardingTaskCreateWithoutTemplateInput, OnboardingTaskUncheckedCreateWithoutTemplateInput>
  }

  export type OnboardingTaskCreateManyTemplateInputEnvelope = {
    data: OnboardingTaskCreateManyTemplateInput | OnboardingTaskCreateManyTemplateInput[]
    skipDuplicates?: boolean
  }

  export type OnboardingTaskUpsertWithWhereUniqueWithoutTemplateInput = {
    where: OnboardingTaskWhereUniqueInput
    update: XOR<OnboardingTaskUpdateWithoutTemplateInput, OnboardingTaskUncheckedUpdateWithoutTemplateInput>
    create: XOR<OnboardingTaskCreateWithoutTemplateInput, OnboardingTaskUncheckedCreateWithoutTemplateInput>
  }

  export type OnboardingTaskUpdateWithWhereUniqueWithoutTemplateInput = {
    where: OnboardingTaskWhereUniqueInput
    data: XOR<OnboardingTaskUpdateWithoutTemplateInput, OnboardingTaskUncheckedUpdateWithoutTemplateInput>
  }

  export type OnboardingTaskUpdateManyWithWhereWithoutTemplateInput = {
    where: OnboardingTaskScalarWhereInput
    data: XOR<OnboardingTaskUpdateManyMutationInput, OnboardingTaskUncheckedUpdateManyWithoutTemplateInput>
  }

  export type OnboardingTaskScalarWhereInput = {
    AND?: OnboardingTaskScalarWhereInput | OnboardingTaskScalarWhereInput[]
    OR?: OnboardingTaskScalarWhereInput[]
    NOT?: OnboardingTaskScalarWhereInput | OnboardingTaskScalarWhereInput[]
    id?: StringFilter<"OnboardingTask"> | string
    template_id?: StringNullableFilter<"OnboardingTask"> | string | null
    employee_id?: StringNullableFilter<"OnboardingTask"> | string | null
    category?: StringFilter<"OnboardingTask"> | string
    title_en?: StringFilter<"OnboardingTask"> | string
    title_th?: StringNullableFilter<"OnboardingTask"> | string | null
    description_en?: StringNullableFilter<"OnboardingTask"> | string | null
    description_th?: StringNullableFilter<"OnboardingTask"> | string | null
    required?: BoolFilter<"OnboardingTask"> | boolean
    status?: StringFilter<"OnboardingTask"> | string
    due_date?: DateTimeNullableFilter<"OnboardingTask"> | Date | string | null
    completed_date?: DateTimeNullableFilter<"OnboardingTask"> | Date | string | null
    completed_by?: StringNullableFilter<"OnboardingTask"> | string | null
    assigned_to?: StringNullableFilter<"OnboardingTask"> | string | null
    sort_order?: IntFilter<"OnboardingTask"> | number
    created_at?: DateTimeFilter<"OnboardingTask"> | Date | string
    updated_at?: DateTimeFilter<"OnboardingTask"> | Date | string
  }

  export type OnboardingTemplateCreateWithoutTasksInput = {
    id?: string
    name_en: string
    name_th?: string | null
    department?: string | null
    is_default?: boolean
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type OnboardingTemplateUncheckedCreateWithoutTasksInput = {
    id?: string
    name_en: string
    name_th?: string | null
    department?: string | null
    is_default?: boolean
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type OnboardingTemplateCreateOrConnectWithoutTasksInput = {
    where: OnboardingTemplateWhereUniqueInput
    create: XOR<OnboardingTemplateCreateWithoutTasksInput, OnboardingTemplateUncheckedCreateWithoutTasksInput>
  }

  export type OnboardingTemplateUpsertWithoutTasksInput = {
    update: XOR<OnboardingTemplateUpdateWithoutTasksInput, OnboardingTemplateUncheckedUpdateWithoutTasksInput>
    create: XOR<OnboardingTemplateCreateWithoutTasksInput, OnboardingTemplateUncheckedCreateWithoutTasksInput>
    where?: OnboardingTemplateWhereInput
  }

  export type OnboardingTemplateUpdateToOneWithWhereWithoutTasksInput = {
    where?: OnboardingTemplateWhereInput
    data: XOR<OnboardingTemplateUpdateWithoutTasksInput, OnboardingTemplateUncheckedUpdateWithoutTasksInput>
  }

  export type OnboardingTemplateUpdateWithoutTasksInput = {
    id?: StringFieldUpdateOperationsInput | string
    name_en?: StringFieldUpdateOperationsInput | string
    name_th?: NullableStringFieldUpdateOperationsInput | string | null
    department?: NullableStringFieldUpdateOperationsInput | string | null
    is_default?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OnboardingTemplateUncheckedUpdateWithoutTasksInput = {
    id?: StringFieldUpdateOperationsInput | string
    name_en?: StringFieldUpdateOperationsInput | string
    name_th?: NullableStringFieldUpdateOperationsInput | string | null
    department?: NullableStringFieldUpdateOperationsInput | string | null
    is_default?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClearanceItemCreateWithoutResignationInput = {
    id?: string
    category: string
    item_name: string
    item_name_th?: string | null
    required?: boolean
    status?: string
    completed_date?: Date | string | null
    completed_by?: string | null
    notes?: string | null
  }

  export type ClearanceItemUncheckedCreateWithoutResignationInput = {
    id?: string
    category: string
    item_name: string
    item_name_th?: string | null
    required?: boolean
    status?: string
    completed_date?: Date | string | null
    completed_by?: string | null
    notes?: string | null
  }

  export type ClearanceItemCreateOrConnectWithoutResignationInput = {
    where: ClearanceItemWhereUniqueInput
    create: XOR<ClearanceItemCreateWithoutResignationInput, ClearanceItemUncheckedCreateWithoutResignationInput>
  }

  export type ClearanceItemCreateManyResignationInputEnvelope = {
    data: ClearanceItemCreateManyResignationInput | ClearanceItemCreateManyResignationInput[]
    skipDuplicates?: boolean
  }

  export type ClearanceItemUpsertWithWhereUniqueWithoutResignationInput = {
    where: ClearanceItemWhereUniqueInput
    update: XOR<ClearanceItemUpdateWithoutResignationInput, ClearanceItemUncheckedUpdateWithoutResignationInput>
    create: XOR<ClearanceItemCreateWithoutResignationInput, ClearanceItemUncheckedCreateWithoutResignationInput>
  }

  export type ClearanceItemUpdateWithWhereUniqueWithoutResignationInput = {
    where: ClearanceItemWhereUniqueInput
    data: XOR<ClearanceItemUpdateWithoutResignationInput, ClearanceItemUncheckedUpdateWithoutResignationInput>
  }

  export type ClearanceItemUpdateManyWithWhereWithoutResignationInput = {
    where: ClearanceItemScalarWhereInput
    data: XOR<ClearanceItemUpdateManyMutationInput, ClearanceItemUncheckedUpdateManyWithoutResignationInput>
  }

  export type ClearanceItemScalarWhereInput = {
    AND?: ClearanceItemScalarWhereInput | ClearanceItemScalarWhereInput[]
    OR?: ClearanceItemScalarWhereInput[]
    NOT?: ClearanceItemScalarWhereInput | ClearanceItemScalarWhereInput[]
    id?: StringFilter<"ClearanceItem"> | string
    resignation_id?: StringFilter<"ClearanceItem"> | string
    category?: StringFilter<"ClearanceItem"> | string
    item_name?: StringFilter<"ClearanceItem"> | string
    item_name_th?: StringNullableFilter<"ClearanceItem"> | string | null
    required?: BoolFilter<"ClearanceItem"> | boolean
    status?: StringFilter<"ClearanceItem"> | string
    completed_date?: DateTimeNullableFilter<"ClearanceItem"> | Date | string | null
    completed_by?: StringNullableFilter<"ClearanceItem"> | string | null
    notes?: StringNullableFilter<"ClearanceItem"> | string | null
  }

  export type ResignationCreateWithoutClearance_itemsInput = {
    id?: string
    employee_id: string
    employee_name: string
    department?: string | null
    position?: string | null
    submission_date?: Date | string
    last_working_date: Date | string
    reason_type: string
    reason_detail?: string | null
    status?: string
    manager_id?: string | null
    manager_approved_at?: Date | string | null
    manager_comments?: string | null
    hr_clearance_completed?: boolean
    hr_clearance_date?: Date | string | null
    settlement_amount?: number | null
    settlement_date?: Date | string | null
    exit_interview_date?: Date | string | null
    exit_interview_notes?: string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type ResignationUncheckedCreateWithoutClearance_itemsInput = {
    id?: string
    employee_id: string
    employee_name: string
    department?: string | null
    position?: string | null
    submission_date?: Date | string
    last_working_date: Date | string
    reason_type: string
    reason_detail?: string | null
    status?: string
    manager_id?: string | null
    manager_approved_at?: Date | string | null
    manager_comments?: string | null
    hr_clearance_completed?: boolean
    hr_clearance_date?: Date | string | null
    settlement_amount?: number | null
    settlement_date?: Date | string | null
    exit_interview_date?: Date | string | null
    exit_interview_notes?: string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type ResignationCreateOrConnectWithoutClearance_itemsInput = {
    where: ResignationWhereUniqueInput
    create: XOR<ResignationCreateWithoutClearance_itemsInput, ResignationUncheckedCreateWithoutClearance_itemsInput>
  }

  export type ResignationUpsertWithoutClearance_itemsInput = {
    update: XOR<ResignationUpdateWithoutClearance_itemsInput, ResignationUncheckedUpdateWithoutClearance_itemsInput>
    create: XOR<ResignationCreateWithoutClearance_itemsInput, ResignationUncheckedCreateWithoutClearance_itemsInput>
    where?: ResignationWhereInput
  }

  export type ResignationUpdateToOneWithWhereWithoutClearance_itemsInput = {
    where?: ResignationWhereInput
    data: XOR<ResignationUpdateWithoutClearance_itemsInput, ResignationUncheckedUpdateWithoutClearance_itemsInput>
  }

  export type ResignationUpdateWithoutClearance_itemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    employee_id?: StringFieldUpdateOperationsInput | string
    employee_name?: StringFieldUpdateOperationsInput | string
    department?: NullableStringFieldUpdateOperationsInput | string | null
    position?: NullableStringFieldUpdateOperationsInput | string | null
    submission_date?: DateTimeFieldUpdateOperationsInput | Date | string
    last_working_date?: DateTimeFieldUpdateOperationsInput | Date | string
    reason_type?: StringFieldUpdateOperationsInput | string
    reason_detail?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    manager_id?: NullableStringFieldUpdateOperationsInput | string | null
    manager_approved_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    manager_comments?: NullableStringFieldUpdateOperationsInput | string | null
    hr_clearance_completed?: BoolFieldUpdateOperationsInput | boolean
    hr_clearance_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    settlement_amount?: NullableFloatFieldUpdateOperationsInput | number | null
    settlement_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    exit_interview_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    exit_interview_notes?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ResignationUncheckedUpdateWithoutClearance_itemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    employee_id?: StringFieldUpdateOperationsInput | string
    employee_name?: StringFieldUpdateOperationsInput | string
    department?: NullableStringFieldUpdateOperationsInput | string | null
    position?: NullableStringFieldUpdateOperationsInput | string | null
    submission_date?: DateTimeFieldUpdateOperationsInput | Date | string
    last_working_date?: DateTimeFieldUpdateOperationsInput | Date | string
    reason_type?: StringFieldUpdateOperationsInput | string
    reason_detail?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    manager_id?: NullableStringFieldUpdateOperationsInput | string | null
    manager_approved_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    manager_comments?: NullableStringFieldUpdateOperationsInput | string | null
    hr_clearance_completed?: BoolFieldUpdateOperationsInput | boolean
    hr_clearance_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    settlement_amount?: NullableFloatFieldUpdateOperationsInput | number | null
    settlement_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    exit_interview_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    exit_interview_notes?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CandidateCreateManyJob_postingInput = {
    id?: string
    first_name: string
    last_name: string
    email: string
    phone?: string | null
    resume_url?: string | null
    source?: string | null
    status?: string
    current_stage?: string
    applied_date?: Date | string
    notes?: string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type CandidateUpdateWithoutJob_postingInput = {
    id?: StringFieldUpdateOperationsInput | string
    first_name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    resume_url?: NullableStringFieldUpdateOperationsInput | string | null
    source?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    current_stage?: StringFieldUpdateOperationsInput | string
    applied_date?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    screenings?: ScreeningUpdateManyWithoutCandidateNestedInput
  }

  export type CandidateUncheckedUpdateWithoutJob_postingInput = {
    id?: StringFieldUpdateOperationsInput | string
    first_name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    resume_url?: NullableStringFieldUpdateOperationsInput | string | null
    source?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    current_stage?: StringFieldUpdateOperationsInput | string
    applied_date?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    screenings?: ScreeningUncheckedUpdateManyWithoutCandidateNestedInput
  }

  export type CandidateUncheckedUpdateManyWithoutJob_postingInput = {
    id?: StringFieldUpdateOperationsInput | string
    first_name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    resume_url?: NullableStringFieldUpdateOperationsInput | string | null
    source?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    current_stage?: StringFieldUpdateOperationsInput | string
    applied_date?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ScreeningCreateManyCandidateInput = {
    id?: string
    stage: string
    status?: string
    scheduled_date?: Date | string | null
    completed_date?: Date | string | null
    interviewer_id?: string | null
    score?: number | null
    feedback?: string | null
    recommendation?: string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type ScreeningUpdateWithoutCandidateInput = {
    id?: StringFieldUpdateOperationsInput | string
    stage?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    scheduled_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completed_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    interviewer_id?: NullableStringFieldUpdateOperationsInput | string | null
    score?: NullableFloatFieldUpdateOperationsInput | number | null
    feedback?: NullableStringFieldUpdateOperationsInput | string | null
    recommendation?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ScreeningUncheckedUpdateWithoutCandidateInput = {
    id?: StringFieldUpdateOperationsInput | string
    stage?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    scheduled_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completed_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    interviewer_id?: NullableStringFieldUpdateOperationsInput | string | null
    score?: NullableFloatFieldUpdateOperationsInput | number | null
    feedback?: NullableStringFieldUpdateOperationsInput | string | null
    recommendation?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ScreeningUncheckedUpdateManyWithoutCandidateInput = {
    id?: StringFieldUpdateOperationsInput | string
    stage?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    scheduled_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completed_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    interviewer_id?: NullableStringFieldUpdateOperationsInput | string | null
    score?: NullableFloatFieldUpdateOperationsInput | number | null
    feedback?: NullableStringFieldUpdateOperationsInput | string | null
    recommendation?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OnboardingTaskCreateManyTemplateInput = {
    id?: string
    employee_id?: string | null
    category: string
    title_en: string
    title_th?: string | null
    description_en?: string | null
    description_th?: string | null
    required?: boolean
    status?: string
    due_date?: Date | string | null
    completed_date?: Date | string | null
    completed_by?: string | null
    assigned_to?: string | null
    sort_order?: number
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type OnboardingTaskUpdateWithoutTemplateInput = {
    id?: StringFieldUpdateOperationsInput | string
    employee_id?: NullableStringFieldUpdateOperationsInput | string | null
    category?: StringFieldUpdateOperationsInput | string
    title_en?: StringFieldUpdateOperationsInput | string
    title_th?: NullableStringFieldUpdateOperationsInput | string | null
    description_en?: NullableStringFieldUpdateOperationsInput | string | null
    description_th?: NullableStringFieldUpdateOperationsInput | string | null
    required?: BoolFieldUpdateOperationsInput | boolean
    status?: StringFieldUpdateOperationsInput | string
    due_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completed_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completed_by?: NullableStringFieldUpdateOperationsInput | string | null
    assigned_to?: NullableStringFieldUpdateOperationsInput | string | null
    sort_order?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OnboardingTaskUncheckedUpdateWithoutTemplateInput = {
    id?: StringFieldUpdateOperationsInput | string
    employee_id?: NullableStringFieldUpdateOperationsInput | string | null
    category?: StringFieldUpdateOperationsInput | string
    title_en?: StringFieldUpdateOperationsInput | string
    title_th?: NullableStringFieldUpdateOperationsInput | string | null
    description_en?: NullableStringFieldUpdateOperationsInput | string | null
    description_th?: NullableStringFieldUpdateOperationsInput | string | null
    required?: BoolFieldUpdateOperationsInput | boolean
    status?: StringFieldUpdateOperationsInput | string
    due_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completed_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completed_by?: NullableStringFieldUpdateOperationsInput | string | null
    assigned_to?: NullableStringFieldUpdateOperationsInput | string | null
    sort_order?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OnboardingTaskUncheckedUpdateManyWithoutTemplateInput = {
    id?: StringFieldUpdateOperationsInput | string
    employee_id?: NullableStringFieldUpdateOperationsInput | string | null
    category?: StringFieldUpdateOperationsInput | string
    title_en?: StringFieldUpdateOperationsInput | string
    title_th?: NullableStringFieldUpdateOperationsInput | string | null
    description_en?: NullableStringFieldUpdateOperationsInput | string | null
    description_th?: NullableStringFieldUpdateOperationsInput | string | null
    required?: BoolFieldUpdateOperationsInput | boolean
    status?: StringFieldUpdateOperationsInput | string
    due_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completed_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completed_by?: NullableStringFieldUpdateOperationsInput | string | null
    assigned_to?: NullableStringFieldUpdateOperationsInput | string | null
    sort_order?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClearanceItemCreateManyResignationInput = {
    id?: string
    category: string
    item_name: string
    item_name_th?: string | null
    required?: boolean
    status?: string
    completed_date?: Date | string | null
    completed_by?: string | null
    notes?: string | null
  }

  export type ClearanceItemUpdateWithoutResignationInput = {
    id?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    item_name?: StringFieldUpdateOperationsInput | string
    item_name_th?: NullableStringFieldUpdateOperationsInput | string | null
    required?: BoolFieldUpdateOperationsInput | boolean
    status?: StringFieldUpdateOperationsInput | string
    completed_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completed_by?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ClearanceItemUncheckedUpdateWithoutResignationInput = {
    id?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    item_name?: StringFieldUpdateOperationsInput | string
    item_name_th?: NullableStringFieldUpdateOperationsInput | string | null
    required?: BoolFieldUpdateOperationsInput | boolean
    status?: StringFieldUpdateOperationsInput | string
    completed_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completed_by?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ClearanceItemUncheckedUpdateManyWithoutResignationInput = {
    id?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    item_name?: StringFieldUpdateOperationsInput | string
    item_name_th?: NullableStringFieldUpdateOperationsInput | string | null
    required?: BoolFieldUpdateOperationsInput | boolean
    status?: StringFieldUpdateOperationsInput | string
    completed_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completed_by?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
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