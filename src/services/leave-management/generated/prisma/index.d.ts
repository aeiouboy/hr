
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
 * Model LeaveType
 * 
 */
export type LeaveType = $Result.DefaultSelection<Prisma.$LeaveTypePayload>
/**
 * Model LeaveBalance
 * 
 */
export type LeaveBalance = $Result.DefaultSelection<Prisma.$LeaveBalancePayload>
/**
 * Model LeaveRequest
 * 
 */
export type LeaveRequest = $Result.DefaultSelection<Prisma.$LeaveRequestPayload>
/**
 * Model LeaveCalendar
 * 
 */
export type LeaveCalendar = $Result.DefaultSelection<Prisma.$LeaveCalendarPayload>
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
 * // Fetch zero or more LeaveTypes
 * const leaveTypes = await prisma.leaveType.findMany()
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
   * // Fetch zero or more LeaveTypes
   * const leaveTypes = await prisma.leaveType.findMany()
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
   * `prisma.leaveType`: Exposes CRUD operations for the **LeaveType** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more LeaveTypes
    * const leaveTypes = await prisma.leaveType.findMany()
    * ```
    */
  get leaveType(): Prisma.LeaveTypeDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.leaveBalance`: Exposes CRUD operations for the **LeaveBalance** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more LeaveBalances
    * const leaveBalances = await prisma.leaveBalance.findMany()
    * ```
    */
  get leaveBalance(): Prisma.LeaveBalanceDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.leaveRequest`: Exposes CRUD operations for the **LeaveRequest** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more LeaveRequests
    * const leaveRequests = await prisma.leaveRequest.findMany()
    * ```
    */
  get leaveRequest(): Prisma.LeaveRequestDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.leaveCalendar`: Exposes CRUD operations for the **LeaveCalendar** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more LeaveCalendars
    * const leaveCalendars = await prisma.leaveCalendar.findMany()
    * ```
    */
  get leaveCalendar(): Prisma.LeaveCalendarDelegate<ExtArgs, ClientOptions>;

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
    LeaveType: 'LeaveType',
    LeaveBalance: 'LeaveBalance',
    LeaveRequest: 'LeaveRequest',
    LeaveCalendar: 'LeaveCalendar',
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
      modelProps: "leaveType" | "leaveBalance" | "leaveRequest" | "leaveCalendar" | "auditLog"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      LeaveType: {
        payload: Prisma.$LeaveTypePayload<ExtArgs>
        fields: Prisma.LeaveTypeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.LeaveTypeFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeaveTypePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.LeaveTypeFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeaveTypePayload>
          }
          findFirst: {
            args: Prisma.LeaveTypeFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeaveTypePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.LeaveTypeFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeaveTypePayload>
          }
          findMany: {
            args: Prisma.LeaveTypeFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeaveTypePayload>[]
          }
          create: {
            args: Prisma.LeaveTypeCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeaveTypePayload>
          }
          createMany: {
            args: Prisma.LeaveTypeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.LeaveTypeCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeaveTypePayload>[]
          }
          delete: {
            args: Prisma.LeaveTypeDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeaveTypePayload>
          }
          update: {
            args: Prisma.LeaveTypeUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeaveTypePayload>
          }
          deleteMany: {
            args: Prisma.LeaveTypeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.LeaveTypeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.LeaveTypeUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeaveTypePayload>[]
          }
          upsert: {
            args: Prisma.LeaveTypeUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeaveTypePayload>
          }
          aggregate: {
            args: Prisma.LeaveTypeAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateLeaveType>
          }
          groupBy: {
            args: Prisma.LeaveTypeGroupByArgs<ExtArgs>
            result: $Utils.Optional<LeaveTypeGroupByOutputType>[]
          }
          count: {
            args: Prisma.LeaveTypeCountArgs<ExtArgs>
            result: $Utils.Optional<LeaveTypeCountAggregateOutputType> | number
          }
        }
      }
      LeaveBalance: {
        payload: Prisma.$LeaveBalancePayload<ExtArgs>
        fields: Prisma.LeaveBalanceFieldRefs
        operations: {
          findUnique: {
            args: Prisma.LeaveBalanceFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeaveBalancePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.LeaveBalanceFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeaveBalancePayload>
          }
          findFirst: {
            args: Prisma.LeaveBalanceFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeaveBalancePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.LeaveBalanceFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeaveBalancePayload>
          }
          findMany: {
            args: Prisma.LeaveBalanceFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeaveBalancePayload>[]
          }
          create: {
            args: Prisma.LeaveBalanceCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeaveBalancePayload>
          }
          createMany: {
            args: Prisma.LeaveBalanceCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.LeaveBalanceCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeaveBalancePayload>[]
          }
          delete: {
            args: Prisma.LeaveBalanceDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeaveBalancePayload>
          }
          update: {
            args: Prisma.LeaveBalanceUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeaveBalancePayload>
          }
          deleteMany: {
            args: Prisma.LeaveBalanceDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.LeaveBalanceUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.LeaveBalanceUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeaveBalancePayload>[]
          }
          upsert: {
            args: Prisma.LeaveBalanceUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeaveBalancePayload>
          }
          aggregate: {
            args: Prisma.LeaveBalanceAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateLeaveBalance>
          }
          groupBy: {
            args: Prisma.LeaveBalanceGroupByArgs<ExtArgs>
            result: $Utils.Optional<LeaveBalanceGroupByOutputType>[]
          }
          count: {
            args: Prisma.LeaveBalanceCountArgs<ExtArgs>
            result: $Utils.Optional<LeaveBalanceCountAggregateOutputType> | number
          }
        }
      }
      LeaveRequest: {
        payload: Prisma.$LeaveRequestPayload<ExtArgs>
        fields: Prisma.LeaveRequestFieldRefs
        operations: {
          findUnique: {
            args: Prisma.LeaveRequestFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeaveRequestPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.LeaveRequestFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeaveRequestPayload>
          }
          findFirst: {
            args: Prisma.LeaveRequestFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeaveRequestPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.LeaveRequestFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeaveRequestPayload>
          }
          findMany: {
            args: Prisma.LeaveRequestFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeaveRequestPayload>[]
          }
          create: {
            args: Prisma.LeaveRequestCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeaveRequestPayload>
          }
          createMany: {
            args: Prisma.LeaveRequestCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.LeaveRequestCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeaveRequestPayload>[]
          }
          delete: {
            args: Prisma.LeaveRequestDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeaveRequestPayload>
          }
          update: {
            args: Prisma.LeaveRequestUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeaveRequestPayload>
          }
          deleteMany: {
            args: Prisma.LeaveRequestDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.LeaveRequestUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.LeaveRequestUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeaveRequestPayload>[]
          }
          upsert: {
            args: Prisma.LeaveRequestUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeaveRequestPayload>
          }
          aggregate: {
            args: Prisma.LeaveRequestAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateLeaveRequest>
          }
          groupBy: {
            args: Prisma.LeaveRequestGroupByArgs<ExtArgs>
            result: $Utils.Optional<LeaveRequestGroupByOutputType>[]
          }
          count: {
            args: Prisma.LeaveRequestCountArgs<ExtArgs>
            result: $Utils.Optional<LeaveRequestCountAggregateOutputType> | number
          }
        }
      }
      LeaveCalendar: {
        payload: Prisma.$LeaveCalendarPayload<ExtArgs>
        fields: Prisma.LeaveCalendarFieldRefs
        operations: {
          findUnique: {
            args: Prisma.LeaveCalendarFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeaveCalendarPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.LeaveCalendarFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeaveCalendarPayload>
          }
          findFirst: {
            args: Prisma.LeaveCalendarFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeaveCalendarPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.LeaveCalendarFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeaveCalendarPayload>
          }
          findMany: {
            args: Prisma.LeaveCalendarFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeaveCalendarPayload>[]
          }
          create: {
            args: Prisma.LeaveCalendarCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeaveCalendarPayload>
          }
          createMany: {
            args: Prisma.LeaveCalendarCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.LeaveCalendarCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeaveCalendarPayload>[]
          }
          delete: {
            args: Prisma.LeaveCalendarDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeaveCalendarPayload>
          }
          update: {
            args: Prisma.LeaveCalendarUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeaveCalendarPayload>
          }
          deleteMany: {
            args: Prisma.LeaveCalendarDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.LeaveCalendarUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.LeaveCalendarUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeaveCalendarPayload>[]
          }
          upsert: {
            args: Prisma.LeaveCalendarUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeaveCalendarPayload>
          }
          aggregate: {
            args: Prisma.LeaveCalendarAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateLeaveCalendar>
          }
          groupBy: {
            args: Prisma.LeaveCalendarGroupByArgs<ExtArgs>
            result: $Utils.Optional<LeaveCalendarGroupByOutputType>[]
          }
          count: {
            args: Prisma.LeaveCalendarCountArgs<ExtArgs>
            result: $Utils.Optional<LeaveCalendarCountAggregateOutputType> | number
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
    leaveType?: LeaveTypeOmit
    leaveBalance?: LeaveBalanceOmit
    leaveRequest?: LeaveRequestOmit
    leaveCalendar?: LeaveCalendarOmit
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
   * Count Type LeaveTypeCountOutputType
   */

  export type LeaveTypeCountOutputType = {
    balances: number
    requests: number
  }

  export type LeaveTypeCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    balances?: boolean | LeaveTypeCountOutputTypeCountBalancesArgs
    requests?: boolean | LeaveTypeCountOutputTypeCountRequestsArgs
  }

  // Custom InputTypes
  /**
   * LeaveTypeCountOutputType without action
   */
  export type LeaveTypeCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeaveTypeCountOutputType
     */
    select?: LeaveTypeCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * LeaveTypeCountOutputType without action
   */
  export type LeaveTypeCountOutputTypeCountBalancesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LeaveBalanceWhereInput
  }

  /**
   * LeaveTypeCountOutputType without action
   */
  export type LeaveTypeCountOutputTypeCountRequestsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LeaveRequestWhereInput
  }


  /**
   * Models
   */

  /**
   * Model LeaveType
   */

  export type AggregateLeaveType = {
    _count: LeaveTypeCountAggregateOutputType | null
    _avg: LeaveTypeAvgAggregateOutputType | null
    _sum: LeaveTypeSumAggregateOutputType | null
    _min: LeaveTypeMinAggregateOutputType | null
    _max: LeaveTypeMaxAggregateOutputType | null
  }

  export type LeaveTypeAvgAggregateOutputType = {
    max_days: number | null
    medical_cert_days: number | null
    max_per_career: number | null
  }

  export type LeaveTypeSumAggregateOutputType = {
    max_days: number | null
    medical_cert_days: number | null
    max_per_career: number | null
  }

  export type LeaveTypeMinAggregateOutputType = {
    id: string | null
    code: string | null
    name_en: string | null
    name_th: string | null
    max_days: number | null
    requires_medical_cert: boolean | null
    medical_cert_days: number | null
    applicable_gender: string | null
    max_per_career: number | null
    is_active: boolean | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type LeaveTypeMaxAggregateOutputType = {
    id: string | null
    code: string | null
    name_en: string | null
    name_th: string | null
    max_days: number | null
    requires_medical_cert: boolean | null
    medical_cert_days: number | null
    applicable_gender: string | null
    max_per_career: number | null
    is_active: boolean | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type LeaveTypeCountAggregateOutputType = {
    id: number
    code: number
    name_en: number
    name_th: number
    max_days: number
    requires_medical_cert: number
    medical_cert_days: number
    applicable_gender: number
    max_per_career: number
    is_active: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type LeaveTypeAvgAggregateInputType = {
    max_days?: true
    medical_cert_days?: true
    max_per_career?: true
  }

  export type LeaveTypeSumAggregateInputType = {
    max_days?: true
    medical_cert_days?: true
    max_per_career?: true
  }

  export type LeaveTypeMinAggregateInputType = {
    id?: true
    code?: true
    name_en?: true
    name_th?: true
    max_days?: true
    requires_medical_cert?: true
    medical_cert_days?: true
    applicable_gender?: true
    max_per_career?: true
    is_active?: true
    created_at?: true
    updated_at?: true
  }

  export type LeaveTypeMaxAggregateInputType = {
    id?: true
    code?: true
    name_en?: true
    name_th?: true
    max_days?: true
    requires_medical_cert?: true
    medical_cert_days?: true
    applicable_gender?: true
    max_per_career?: true
    is_active?: true
    created_at?: true
    updated_at?: true
  }

  export type LeaveTypeCountAggregateInputType = {
    id?: true
    code?: true
    name_en?: true
    name_th?: true
    max_days?: true
    requires_medical_cert?: true
    medical_cert_days?: true
    applicable_gender?: true
    max_per_career?: true
    is_active?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type LeaveTypeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which LeaveType to aggregate.
     */
    where?: LeaveTypeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LeaveTypes to fetch.
     */
    orderBy?: LeaveTypeOrderByWithRelationInput | LeaveTypeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: LeaveTypeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LeaveTypes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LeaveTypes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned LeaveTypes
    **/
    _count?: true | LeaveTypeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: LeaveTypeAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: LeaveTypeSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: LeaveTypeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: LeaveTypeMaxAggregateInputType
  }

  export type GetLeaveTypeAggregateType<T extends LeaveTypeAggregateArgs> = {
        [P in keyof T & keyof AggregateLeaveType]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLeaveType[P]>
      : GetScalarType<T[P], AggregateLeaveType[P]>
  }




  export type LeaveTypeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LeaveTypeWhereInput
    orderBy?: LeaveTypeOrderByWithAggregationInput | LeaveTypeOrderByWithAggregationInput[]
    by: LeaveTypeScalarFieldEnum[] | LeaveTypeScalarFieldEnum
    having?: LeaveTypeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: LeaveTypeCountAggregateInputType | true
    _avg?: LeaveTypeAvgAggregateInputType
    _sum?: LeaveTypeSumAggregateInputType
    _min?: LeaveTypeMinAggregateInputType
    _max?: LeaveTypeMaxAggregateInputType
  }

  export type LeaveTypeGroupByOutputType = {
    id: string
    code: string
    name_en: string
    name_th: string | null
    max_days: number
    requires_medical_cert: boolean
    medical_cert_days: number | null
    applicable_gender: string | null
    max_per_career: number | null
    is_active: boolean
    created_at: Date
    updated_at: Date
    _count: LeaveTypeCountAggregateOutputType | null
    _avg: LeaveTypeAvgAggregateOutputType | null
    _sum: LeaveTypeSumAggregateOutputType | null
    _min: LeaveTypeMinAggregateOutputType | null
    _max: LeaveTypeMaxAggregateOutputType | null
  }

  type GetLeaveTypeGroupByPayload<T extends LeaveTypeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<LeaveTypeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof LeaveTypeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], LeaveTypeGroupByOutputType[P]>
            : GetScalarType<T[P], LeaveTypeGroupByOutputType[P]>
        }
      >
    >


  export type LeaveTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    code?: boolean
    name_en?: boolean
    name_th?: boolean
    max_days?: boolean
    requires_medical_cert?: boolean
    medical_cert_days?: boolean
    applicable_gender?: boolean
    max_per_career?: boolean
    is_active?: boolean
    created_at?: boolean
    updated_at?: boolean
    balances?: boolean | LeaveType$balancesArgs<ExtArgs>
    requests?: boolean | LeaveType$requestsArgs<ExtArgs>
    _count?: boolean | LeaveTypeCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["leaveType"]>

  export type LeaveTypeSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    code?: boolean
    name_en?: boolean
    name_th?: boolean
    max_days?: boolean
    requires_medical_cert?: boolean
    medical_cert_days?: boolean
    applicable_gender?: boolean
    max_per_career?: boolean
    is_active?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["leaveType"]>

  export type LeaveTypeSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    code?: boolean
    name_en?: boolean
    name_th?: boolean
    max_days?: boolean
    requires_medical_cert?: boolean
    medical_cert_days?: boolean
    applicable_gender?: boolean
    max_per_career?: boolean
    is_active?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["leaveType"]>

  export type LeaveTypeSelectScalar = {
    id?: boolean
    code?: boolean
    name_en?: boolean
    name_th?: boolean
    max_days?: boolean
    requires_medical_cert?: boolean
    medical_cert_days?: boolean
    applicable_gender?: boolean
    max_per_career?: boolean
    is_active?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type LeaveTypeOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "code" | "name_en" | "name_th" | "max_days" | "requires_medical_cert" | "medical_cert_days" | "applicable_gender" | "max_per_career" | "is_active" | "created_at" | "updated_at", ExtArgs["result"]["leaveType"]>
  export type LeaveTypeInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    balances?: boolean | LeaveType$balancesArgs<ExtArgs>
    requests?: boolean | LeaveType$requestsArgs<ExtArgs>
    _count?: boolean | LeaveTypeCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type LeaveTypeIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type LeaveTypeIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $LeaveTypePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "LeaveType"
    objects: {
      balances: Prisma.$LeaveBalancePayload<ExtArgs>[]
      requests: Prisma.$LeaveRequestPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      code: string
      name_en: string
      name_th: string | null
      max_days: number
      requires_medical_cert: boolean
      medical_cert_days: number | null
      applicable_gender: string | null
      max_per_career: number | null
      is_active: boolean
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["leaveType"]>
    composites: {}
  }

  type LeaveTypeGetPayload<S extends boolean | null | undefined | LeaveTypeDefaultArgs> = $Result.GetResult<Prisma.$LeaveTypePayload, S>

  type LeaveTypeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<LeaveTypeFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: LeaveTypeCountAggregateInputType | true
    }

  export interface LeaveTypeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['LeaveType'], meta: { name: 'LeaveType' } }
    /**
     * Find zero or one LeaveType that matches the filter.
     * @param {LeaveTypeFindUniqueArgs} args - Arguments to find a LeaveType
     * @example
     * // Get one LeaveType
     * const leaveType = await prisma.leaveType.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends LeaveTypeFindUniqueArgs>(args: SelectSubset<T, LeaveTypeFindUniqueArgs<ExtArgs>>): Prisma__LeaveTypeClient<$Result.GetResult<Prisma.$LeaveTypePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one LeaveType that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {LeaveTypeFindUniqueOrThrowArgs} args - Arguments to find a LeaveType
     * @example
     * // Get one LeaveType
     * const leaveType = await prisma.leaveType.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends LeaveTypeFindUniqueOrThrowArgs>(args: SelectSubset<T, LeaveTypeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__LeaveTypeClient<$Result.GetResult<Prisma.$LeaveTypePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first LeaveType that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeaveTypeFindFirstArgs} args - Arguments to find a LeaveType
     * @example
     * // Get one LeaveType
     * const leaveType = await prisma.leaveType.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends LeaveTypeFindFirstArgs>(args?: SelectSubset<T, LeaveTypeFindFirstArgs<ExtArgs>>): Prisma__LeaveTypeClient<$Result.GetResult<Prisma.$LeaveTypePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first LeaveType that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeaveTypeFindFirstOrThrowArgs} args - Arguments to find a LeaveType
     * @example
     * // Get one LeaveType
     * const leaveType = await prisma.leaveType.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends LeaveTypeFindFirstOrThrowArgs>(args?: SelectSubset<T, LeaveTypeFindFirstOrThrowArgs<ExtArgs>>): Prisma__LeaveTypeClient<$Result.GetResult<Prisma.$LeaveTypePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more LeaveTypes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeaveTypeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all LeaveTypes
     * const leaveTypes = await prisma.leaveType.findMany()
     * 
     * // Get first 10 LeaveTypes
     * const leaveTypes = await prisma.leaveType.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const leaveTypeWithIdOnly = await prisma.leaveType.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends LeaveTypeFindManyArgs>(args?: SelectSubset<T, LeaveTypeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LeaveTypePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a LeaveType.
     * @param {LeaveTypeCreateArgs} args - Arguments to create a LeaveType.
     * @example
     * // Create one LeaveType
     * const LeaveType = await prisma.leaveType.create({
     *   data: {
     *     // ... data to create a LeaveType
     *   }
     * })
     * 
     */
    create<T extends LeaveTypeCreateArgs>(args: SelectSubset<T, LeaveTypeCreateArgs<ExtArgs>>): Prisma__LeaveTypeClient<$Result.GetResult<Prisma.$LeaveTypePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many LeaveTypes.
     * @param {LeaveTypeCreateManyArgs} args - Arguments to create many LeaveTypes.
     * @example
     * // Create many LeaveTypes
     * const leaveType = await prisma.leaveType.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends LeaveTypeCreateManyArgs>(args?: SelectSubset<T, LeaveTypeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many LeaveTypes and returns the data saved in the database.
     * @param {LeaveTypeCreateManyAndReturnArgs} args - Arguments to create many LeaveTypes.
     * @example
     * // Create many LeaveTypes
     * const leaveType = await prisma.leaveType.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many LeaveTypes and only return the `id`
     * const leaveTypeWithIdOnly = await prisma.leaveType.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends LeaveTypeCreateManyAndReturnArgs>(args?: SelectSubset<T, LeaveTypeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LeaveTypePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a LeaveType.
     * @param {LeaveTypeDeleteArgs} args - Arguments to delete one LeaveType.
     * @example
     * // Delete one LeaveType
     * const LeaveType = await prisma.leaveType.delete({
     *   where: {
     *     // ... filter to delete one LeaveType
     *   }
     * })
     * 
     */
    delete<T extends LeaveTypeDeleteArgs>(args: SelectSubset<T, LeaveTypeDeleteArgs<ExtArgs>>): Prisma__LeaveTypeClient<$Result.GetResult<Prisma.$LeaveTypePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one LeaveType.
     * @param {LeaveTypeUpdateArgs} args - Arguments to update one LeaveType.
     * @example
     * // Update one LeaveType
     * const leaveType = await prisma.leaveType.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends LeaveTypeUpdateArgs>(args: SelectSubset<T, LeaveTypeUpdateArgs<ExtArgs>>): Prisma__LeaveTypeClient<$Result.GetResult<Prisma.$LeaveTypePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more LeaveTypes.
     * @param {LeaveTypeDeleteManyArgs} args - Arguments to filter LeaveTypes to delete.
     * @example
     * // Delete a few LeaveTypes
     * const { count } = await prisma.leaveType.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends LeaveTypeDeleteManyArgs>(args?: SelectSubset<T, LeaveTypeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more LeaveTypes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeaveTypeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many LeaveTypes
     * const leaveType = await prisma.leaveType.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends LeaveTypeUpdateManyArgs>(args: SelectSubset<T, LeaveTypeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more LeaveTypes and returns the data updated in the database.
     * @param {LeaveTypeUpdateManyAndReturnArgs} args - Arguments to update many LeaveTypes.
     * @example
     * // Update many LeaveTypes
     * const leaveType = await prisma.leaveType.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more LeaveTypes and only return the `id`
     * const leaveTypeWithIdOnly = await prisma.leaveType.updateManyAndReturn({
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
    updateManyAndReturn<T extends LeaveTypeUpdateManyAndReturnArgs>(args: SelectSubset<T, LeaveTypeUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LeaveTypePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one LeaveType.
     * @param {LeaveTypeUpsertArgs} args - Arguments to update or create a LeaveType.
     * @example
     * // Update or create a LeaveType
     * const leaveType = await prisma.leaveType.upsert({
     *   create: {
     *     // ... data to create a LeaveType
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the LeaveType we want to update
     *   }
     * })
     */
    upsert<T extends LeaveTypeUpsertArgs>(args: SelectSubset<T, LeaveTypeUpsertArgs<ExtArgs>>): Prisma__LeaveTypeClient<$Result.GetResult<Prisma.$LeaveTypePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of LeaveTypes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeaveTypeCountArgs} args - Arguments to filter LeaveTypes to count.
     * @example
     * // Count the number of LeaveTypes
     * const count = await prisma.leaveType.count({
     *   where: {
     *     // ... the filter for the LeaveTypes we want to count
     *   }
     * })
    **/
    count<T extends LeaveTypeCountArgs>(
      args?: Subset<T, LeaveTypeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], LeaveTypeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a LeaveType.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeaveTypeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends LeaveTypeAggregateArgs>(args: Subset<T, LeaveTypeAggregateArgs>): Prisma.PrismaPromise<GetLeaveTypeAggregateType<T>>

    /**
     * Group by LeaveType.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeaveTypeGroupByArgs} args - Group by arguments.
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
      T extends LeaveTypeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: LeaveTypeGroupByArgs['orderBy'] }
        : { orderBy?: LeaveTypeGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, LeaveTypeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLeaveTypeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the LeaveType model
   */
  readonly fields: LeaveTypeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for LeaveType.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__LeaveTypeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    balances<T extends LeaveType$balancesArgs<ExtArgs> = {}>(args?: Subset<T, LeaveType$balancesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LeaveBalancePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    requests<T extends LeaveType$requestsArgs<ExtArgs> = {}>(args?: Subset<T, LeaveType$requestsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LeaveRequestPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the LeaveType model
   */
  interface LeaveTypeFieldRefs {
    readonly id: FieldRef<"LeaveType", 'String'>
    readonly code: FieldRef<"LeaveType", 'String'>
    readonly name_en: FieldRef<"LeaveType", 'String'>
    readonly name_th: FieldRef<"LeaveType", 'String'>
    readonly max_days: FieldRef<"LeaveType", 'Int'>
    readonly requires_medical_cert: FieldRef<"LeaveType", 'Boolean'>
    readonly medical_cert_days: FieldRef<"LeaveType", 'Int'>
    readonly applicable_gender: FieldRef<"LeaveType", 'String'>
    readonly max_per_career: FieldRef<"LeaveType", 'Int'>
    readonly is_active: FieldRef<"LeaveType", 'Boolean'>
    readonly created_at: FieldRef<"LeaveType", 'DateTime'>
    readonly updated_at: FieldRef<"LeaveType", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * LeaveType findUnique
   */
  export type LeaveTypeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeaveType
     */
    select?: LeaveTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LeaveType
     */
    omit?: LeaveTypeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeaveTypeInclude<ExtArgs> | null
    /**
     * Filter, which LeaveType to fetch.
     */
    where: LeaveTypeWhereUniqueInput
  }

  /**
   * LeaveType findUniqueOrThrow
   */
  export type LeaveTypeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeaveType
     */
    select?: LeaveTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LeaveType
     */
    omit?: LeaveTypeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeaveTypeInclude<ExtArgs> | null
    /**
     * Filter, which LeaveType to fetch.
     */
    where: LeaveTypeWhereUniqueInput
  }

  /**
   * LeaveType findFirst
   */
  export type LeaveTypeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeaveType
     */
    select?: LeaveTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LeaveType
     */
    omit?: LeaveTypeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeaveTypeInclude<ExtArgs> | null
    /**
     * Filter, which LeaveType to fetch.
     */
    where?: LeaveTypeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LeaveTypes to fetch.
     */
    orderBy?: LeaveTypeOrderByWithRelationInput | LeaveTypeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LeaveTypes.
     */
    cursor?: LeaveTypeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LeaveTypes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LeaveTypes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LeaveTypes.
     */
    distinct?: LeaveTypeScalarFieldEnum | LeaveTypeScalarFieldEnum[]
  }

  /**
   * LeaveType findFirstOrThrow
   */
  export type LeaveTypeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeaveType
     */
    select?: LeaveTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LeaveType
     */
    omit?: LeaveTypeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeaveTypeInclude<ExtArgs> | null
    /**
     * Filter, which LeaveType to fetch.
     */
    where?: LeaveTypeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LeaveTypes to fetch.
     */
    orderBy?: LeaveTypeOrderByWithRelationInput | LeaveTypeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LeaveTypes.
     */
    cursor?: LeaveTypeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LeaveTypes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LeaveTypes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LeaveTypes.
     */
    distinct?: LeaveTypeScalarFieldEnum | LeaveTypeScalarFieldEnum[]
  }

  /**
   * LeaveType findMany
   */
  export type LeaveTypeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeaveType
     */
    select?: LeaveTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LeaveType
     */
    omit?: LeaveTypeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeaveTypeInclude<ExtArgs> | null
    /**
     * Filter, which LeaveTypes to fetch.
     */
    where?: LeaveTypeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LeaveTypes to fetch.
     */
    orderBy?: LeaveTypeOrderByWithRelationInput | LeaveTypeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing LeaveTypes.
     */
    cursor?: LeaveTypeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LeaveTypes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LeaveTypes.
     */
    skip?: number
    distinct?: LeaveTypeScalarFieldEnum | LeaveTypeScalarFieldEnum[]
  }

  /**
   * LeaveType create
   */
  export type LeaveTypeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeaveType
     */
    select?: LeaveTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LeaveType
     */
    omit?: LeaveTypeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeaveTypeInclude<ExtArgs> | null
    /**
     * The data needed to create a LeaveType.
     */
    data: XOR<LeaveTypeCreateInput, LeaveTypeUncheckedCreateInput>
  }

  /**
   * LeaveType createMany
   */
  export type LeaveTypeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many LeaveTypes.
     */
    data: LeaveTypeCreateManyInput | LeaveTypeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * LeaveType createManyAndReturn
   */
  export type LeaveTypeCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeaveType
     */
    select?: LeaveTypeSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the LeaveType
     */
    omit?: LeaveTypeOmit<ExtArgs> | null
    /**
     * The data used to create many LeaveTypes.
     */
    data: LeaveTypeCreateManyInput | LeaveTypeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * LeaveType update
   */
  export type LeaveTypeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeaveType
     */
    select?: LeaveTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LeaveType
     */
    omit?: LeaveTypeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeaveTypeInclude<ExtArgs> | null
    /**
     * The data needed to update a LeaveType.
     */
    data: XOR<LeaveTypeUpdateInput, LeaveTypeUncheckedUpdateInput>
    /**
     * Choose, which LeaveType to update.
     */
    where: LeaveTypeWhereUniqueInput
  }

  /**
   * LeaveType updateMany
   */
  export type LeaveTypeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update LeaveTypes.
     */
    data: XOR<LeaveTypeUpdateManyMutationInput, LeaveTypeUncheckedUpdateManyInput>
    /**
     * Filter which LeaveTypes to update
     */
    where?: LeaveTypeWhereInput
    /**
     * Limit how many LeaveTypes to update.
     */
    limit?: number
  }

  /**
   * LeaveType updateManyAndReturn
   */
  export type LeaveTypeUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeaveType
     */
    select?: LeaveTypeSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the LeaveType
     */
    omit?: LeaveTypeOmit<ExtArgs> | null
    /**
     * The data used to update LeaveTypes.
     */
    data: XOR<LeaveTypeUpdateManyMutationInput, LeaveTypeUncheckedUpdateManyInput>
    /**
     * Filter which LeaveTypes to update
     */
    where?: LeaveTypeWhereInput
    /**
     * Limit how many LeaveTypes to update.
     */
    limit?: number
  }

  /**
   * LeaveType upsert
   */
  export type LeaveTypeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeaveType
     */
    select?: LeaveTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LeaveType
     */
    omit?: LeaveTypeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeaveTypeInclude<ExtArgs> | null
    /**
     * The filter to search for the LeaveType to update in case it exists.
     */
    where: LeaveTypeWhereUniqueInput
    /**
     * In case the LeaveType found by the `where` argument doesn't exist, create a new LeaveType with this data.
     */
    create: XOR<LeaveTypeCreateInput, LeaveTypeUncheckedCreateInput>
    /**
     * In case the LeaveType was found with the provided `where` argument, update it with this data.
     */
    update: XOR<LeaveTypeUpdateInput, LeaveTypeUncheckedUpdateInput>
  }

  /**
   * LeaveType delete
   */
  export type LeaveTypeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeaveType
     */
    select?: LeaveTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LeaveType
     */
    omit?: LeaveTypeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeaveTypeInclude<ExtArgs> | null
    /**
     * Filter which LeaveType to delete.
     */
    where: LeaveTypeWhereUniqueInput
  }

  /**
   * LeaveType deleteMany
   */
  export type LeaveTypeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which LeaveTypes to delete
     */
    where?: LeaveTypeWhereInput
    /**
     * Limit how many LeaveTypes to delete.
     */
    limit?: number
  }

  /**
   * LeaveType.balances
   */
  export type LeaveType$balancesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeaveBalance
     */
    select?: LeaveBalanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LeaveBalance
     */
    omit?: LeaveBalanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeaveBalanceInclude<ExtArgs> | null
    where?: LeaveBalanceWhereInput
    orderBy?: LeaveBalanceOrderByWithRelationInput | LeaveBalanceOrderByWithRelationInput[]
    cursor?: LeaveBalanceWhereUniqueInput
    take?: number
    skip?: number
    distinct?: LeaveBalanceScalarFieldEnum | LeaveBalanceScalarFieldEnum[]
  }

  /**
   * LeaveType.requests
   */
  export type LeaveType$requestsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeaveRequest
     */
    select?: LeaveRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LeaveRequest
     */
    omit?: LeaveRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeaveRequestInclude<ExtArgs> | null
    where?: LeaveRequestWhereInput
    orderBy?: LeaveRequestOrderByWithRelationInput | LeaveRequestOrderByWithRelationInput[]
    cursor?: LeaveRequestWhereUniqueInput
    take?: number
    skip?: number
    distinct?: LeaveRequestScalarFieldEnum | LeaveRequestScalarFieldEnum[]
  }

  /**
   * LeaveType without action
   */
  export type LeaveTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeaveType
     */
    select?: LeaveTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LeaveType
     */
    omit?: LeaveTypeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeaveTypeInclude<ExtArgs> | null
  }


  /**
   * Model LeaveBalance
   */

  export type AggregateLeaveBalance = {
    _count: LeaveBalanceCountAggregateOutputType | null
    _avg: LeaveBalanceAvgAggregateOutputType | null
    _sum: LeaveBalanceSumAggregateOutputType | null
    _min: LeaveBalanceMinAggregateOutputType | null
    _max: LeaveBalanceMaxAggregateOutputType | null
  }

  export type LeaveBalanceAvgAggregateOutputType = {
    year: number | null
    entitled: number | null
    used: number | null
    pending: number | null
    remaining: number | null
    carry_over: number | null
  }

  export type LeaveBalanceSumAggregateOutputType = {
    year: number | null
    entitled: number | null
    used: number | null
    pending: number | null
    remaining: number | null
    carry_over: number | null
  }

  export type LeaveBalanceMinAggregateOutputType = {
    id: string | null
    employee_id: string | null
    leave_type_id: string | null
    year: number | null
    entitled: number | null
    used: number | null
    pending: number | null
    remaining: number | null
    carry_over: number | null
    expiry_date: Date | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type LeaveBalanceMaxAggregateOutputType = {
    id: string | null
    employee_id: string | null
    leave_type_id: string | null
    year: number | null
    entitled: number | null
    used: number | null
    pending: number | null
    remaining: number | null
    carry_over: number | null
    expiry_date: Date | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type LeaveBalanceCountAggregateOutputType = {
    id: number
    employee_id: number
    leave_type_id: number
    year: number
    entitled: number
    used: number
    pending: number
    remaining: number
    carry_over: number
    expiry_date: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type LeaveBalanceAvgAggregateInputType = {
    year?: true
    entitled?: true
    used?: true
    pending?: true
    remaining?: true
    carry_over?: true
  }

  export type LeaveBalanceSumAggregateInputType = {
    year?: true
    entitled?: true
    used?: true
    pending?: true
    remaining?: true
    carry_over?: true
  }

  export type LeaveBalanceMinAggregateInputType = {
    id?: true
    employee_id?: true
    leave_type_id?: true
    year?: true
    entitled?: true
    used?: true
    pending?: true
    remaining?: true
    carry_over?: true
    expiry_date?: true
    created_at?: true
    updated_at?: true
  }

  export type LeaveBalanceMaxAggregateInputType = {
    id?: true
    employee_id?: true
    leave_type_id?: true
    year?: true
    entitled?: true
    used?: true
    pending?: true
    remaining?: true
    carry_over?: true
    expiry_date?: true
    created_at?: true
    updated_at?: true
  }

  export type LeaveBalanceCountAggregateInputType = {
    id?: true
    employee_id?: true
    leave_type_id?: true
    year?: true
    entitled?: true
    used?: true
    pending?: true
    remaining?: true
    carry_over?: true
    expiry_date?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type LeaveBalanceAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which LeaveBalance to aggregate.
     */
    where?: LeaveBalanceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LeaveBalances to fetch.
     */
    orderBy?: LeaveBalanceOrderByWithRelationInput | LeaveBalanceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: LeaveBalanceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LeaveBalances from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LeaveBalances.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned LeaveBalances
    **/
    _count?: true | LeaveBalanceCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: LeaveBalanceAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: LeaveBalanceSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: LeaveBalanceMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: LeaveBalanceMaxAggregateInputType
  }

  export type GetLeaveBalanceAggregateType<T extends LeaveBalanceAggregateArgs> = {
        [P in keyof T & keyof AggregateLeaveBalance]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLeaveBalance[P]>
      : GetScalarType<T[P], AggregateLeaveBalance[P]>
  }




  export type LeaveBalanceGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LeaveBalanceWhereInput
    orderBy?: LeaveBalanceOrderByWithAggregationInput | LeaveBalanceOrderByWithAggregationInput[]
    by: LeaveBalanceScalarFieldEnum[] | LeaveBalanceScalarFieldEnum
    having?: LeaveBalanceScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: LeaveBalanceCountAggregateInputType | true
    _avg?: LeaveBalanceAvgAggregateInputType
    _sum?: LeaveBalanceSumAggregateInputType
    _min?: LeaveBalanceMinAggregateInputType
    _max?: LeaveBalanceMaxAggregateInputType
  }

  export type LeaveBalanceGroupByOutputType = {
    id: string
    employee_id: string
    leave_type_id: string
    year: number
    entitled: number
    used: number
    pending: number
    remaining: number
    carry_over: number
    expiry_date: Date | null
    created_at: Date
    updated_at: Date
    _count: LeaveBalanceCountAggregateOutputType | null
    _avg: LeaveBalanceAvgAggregateOutputType | null
    _sum: LeaveBalanceSumAggregateOutputType | null
    _min: LeaveBalanceMinAggregateOutputType | null
    _max: LeaveBalanceMaxAggregateOutputType | null
  }

  type GetLeaveBalanceGroupByPayload<T extends LeaveBalanceGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<LeaveBalanceGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof LeaveBalanceGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], LeaveBalanceGroupByOutputType[P]>
            : GetScalarType<T[P], LeaveBalanceGroupByOutputType[P]>
        }
      >
    >


  export type LeaveBalanceSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    employee_id?: boolean
    leave_type_id?: boolean
    year?: boolean
    entitled?: boolean
    used?: boolean
    pending?: boolean
    remaining?: boolean
    carry_over?: boolean
    expiry_date?: boolean
    created_at?: boolean
    updated_at?: boolean
    leave_type?: boolean | LeaveTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["leaveBalance"]>

  export type LeaveBalanceSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    employee_id?: boolean
    leave_type_id?: boolean
    year?: boolean
    entitled?: boolean
    used?: boolean
    pending?: boolean
    remaining?: boolean
    carry_over?: boolean
    expiry_date?: boolean
    created_at?: boolean
    updated_at?: boolean
    leave_type?: boolean | LeaveTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["leaveBalance"]>

  export type LeaveBalanceSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    employee_id?: boolean
    leave_type_id?: boolean
    year?: boolean
    entitled?: boolean
    used?: boolean
    pending?: boolean
    remaining?: boolean
    carry_over?: boolean
    expiry_date?: boolean
    created_at?: boolean
    updated_at?: boolean
    leave_type?: boolean | LeaveTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["leaveBalance"]>

  export type LeaveBalanceSelectScalar = {
    id?: boolean
    employee_id?: boolean
    leave_type_id?: boolean
    year?: boolean
    entitled?: boolean
    used?: boolean
    pending?: boolean
    remaining?: boolean
    carry_over?: boolean
    expiry_date?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type LeaveBalanceOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "employee_id" | "leave_type_id" | "year" | "entitled" | "used" | "pending" | "remaining" | "carry_over" | "expiry_date" | "created_at" | "updated_at", ExtArgs["result"]["leaveBalance"]>
  export type LeaveBalanceInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    leave_type?: boolean | LeaveTypeDefaultArgs<ExtArgs>
  }
  export type LeaveBalanceIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    leave_type?: boolean | LeaveTypeDefaultArgs<ExtArgs>
  }
  export type LeaveBalanceIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    leave_type?: boolean | LeaveTypeDefaultArgs<ExtArgs>
  }

  export type $LeaveBalancePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "LeaveBalance"
    objects: {
      leave_type: Prisma.$LeaveTypePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      employee_id: string
      leave_type_id: string
      year: number
      entitled: number
      used: number
      pending: number
      remaining: number
      carry_over: number
      expiry_date: Date | null
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["leaveBalance"]>
    composites: {}
  }

  type LeaveBalanceGetPayload<S extends boolean | null | undefined | LeaveBalanceDefaultArgs> = $Result.GetResult<Prisma.$LeaveBalancePayload, S>

  type LeaveBalanceCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<LeaveBalanceFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: LeaveBalanceCountAggregateInputType | true
    }

  export interface LeaveBalanceDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['LeaveBalance'], meta: { name: 'LeaveBalance' } }
    /**
     * Find zero or one LeaveBalance that matches the filter.
     * @param {LeaveBalanceFindUniqueArgs} args - Arguments to find a LeaveBalance
     * @example
     * // Get one LeaveBalance
     * const leaveBalance = await prisma.leaveBalance.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends LeaveBalanceFindUniqueArgs>(args: SelectSubset<T, LeaveBalanceFindUniqueArgs<ExtArgs>>): Prisma__LeaveBalanceClient<$Result.GetResult<Prisma.$LeaveBalancePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one LeaveBalance that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {LeaveBalanceFindUniqueOrThrowArgs} args - Arguments to find a LeaveBalance
     * @example
     * // Get one LeaveBalance
     * const leaveBalance = await prisma.leaveBalance.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends LeaveBalanceFindUniqueOrThrowArgs>(args: SelectSubset<T, LeaveBalanceFindUniqueOrThrowArgs<ExtArgs>>): Prisma__LeaveBalanceClient<$Result.GetResult<Prisma.$LeaveBalancePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first LeaveBalance that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeaveBalanceFindFirstArgs} args - Arguments to find a LeaveBalance
     * @example
     * // Get one LeaveBalance
     * const leaveBalance = await prisma.leaveBalance.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends LeaveBalanceFindFirstArgs>(args?: SelectSubset<T, LeaveBalanceFindFirstArgs<ExtArgs>>): Prisma__LeaveBalanceClient<$Result.GetResult<Prisma.$LeaveBalancePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first LeaveBalance that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeaveBalanceFindFirstOrThrowArgs} args - Arguments to find a LeaveBalance
     * @example
     * // Get one LeaveBalance
     * const leaveBalance = await prisma.leaveBalance.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends LeaveBalanceFindFirstOrThrowArgs>(args?: SelectSubset<T, LeaveBalanceFindFirstOrThrowArgs<ExtArgs>>): Prisma__LeaveBalanceClient<$Result.GetResult<Prisma.$LeaveBalancePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more LeaveBalances that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeaveBalanceFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all LeaveBalances
     * const leaveBalances = await prisma.leaveBalance.findMany()
     * 
     * // Get first 10 LeaveBalances
     * const leaveBalances = await prisma.leaveBalance.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const leaveBalanceWithIdOnly = await prisma.leaveBalance.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends LeaveBalanceFindManyArgs>(args?: SelectSubset<T, LeaveBalanceFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LeaveBalancePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a LeaveBalance.
     * @param {LeaveBalanceCreateArgs} args - Arguments to create a LeaveBalance.
     * @example
     * // Create one LeaveBalance
     * const LeaveBalance = await prisma.leaveBalance.create({
     *   data: {
     *     // ... data to create a LeaveBalance
     *   }
     * })
     * 
     */
    create<T extends LeaveBalanceCreateArgs>(args: SelectSubset<T, LeaveBalanceCreateArgs<ExtArgs>>): Prisma__LeaveBalanceClient<$Result.GetResult<Prisma.$LeaveBalancePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many LeaveBalances.
     * @param {LeaveBalanceCreateManyArgs} args - Arguments to create many LeaveBalances.
     * @example
     * // Create many LeaveBalances
     * const leaveBalance = await prisma.leaveBalance.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends LeaveBalanceCreateManyArgs>(args?: SelectSubset<T, LeaveBalanceCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many LeaveBalances and returns the data saved in the database.
     * @param {LeaveBalanceCreateManyAndReturnArgs} args - Arguments to create many LeaveBalances.
     * @example
     * // Create many LeaveBalances
     * const leaveBalance = await prisma.leaveBalance.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many LeaveBalances and only return the `id`
     * const leaveBalanceWithIdOnly = await prisma.leaveBalance.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends LeaveBalanceCreateManyAndReturnArgs>(args?: SelectSubset<T, LeaveBalanceCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LeaveBalancePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a LeaveBalance.
     * @param {LeaveBalanceDeleteArgs} args - Arguments to delete one LeaveBalance.
     * @example
     * // Delete one LeaveBalance
     * const LeaveBalance = await prisma.leaveBalance.delete({
     *   where: {
     *     // ... filter to delete one LeaveBalance
     *   }
     * })
     * 
     */
    delete<T extends LeaveBalanceDeleteArgs>(args: SelectSubset<T, LeaveBalanceDeleteArgs<ExtArgs>>): Prisma__LeaveBalanceClient<$Result.GetResult<Prisma.$LeaveBalancePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one LeaveBalance.
     * @param {LeaveBalanceUpdateArgs} args - Arguments to update one LeaveBalance.
     * @example
     * // Update one LeaveBalance
     * const leaveBalance = await prisma.leaveBalance.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends LeaveBalanceUpdateArgs>(args: SelectSubset<T, LeaveBalanceUpdateArgs<ExtArgs>>): Prisma__LeaveBalanceClient<$Result.GetResult<Prisma.$LeaveBalancePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more LeaveBalances.
     * @param {LeaveBalanceDeleteManyArgs} args - Arguments to filter LeaveBalances to delete.
     * @example
     * // Delete a few LeaveBalances
     * const { count } = await prisma.leaveBalance.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends LeaveBalanceDeleteManyArgs>(args?: SelectSubset<T, LeaveBalanceDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more LeaveBalances.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeaveBalanceUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many LeaveBalances
     * const leaveBalance = await prisma.leaveBalance.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends LeaveBalanceUpdateManyArgs>(args: SelectSubset<T, LeaveBalanceUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more LeaveBalances and returns the data updated in the database.
     * @param {LeaveBalanceUpdateManyAndReturnArgs} args - Arguments to update many LeaveBalances.
     * @example
     * // Update many LeaveBalances
     * const leaveBalance = await prisma.leaveBalance.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more LeaveBalances and only return the `id`
     * const leaveBalanceWithIdOnly = await prisma.leaveBalance.updateManyAndReturn({
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
    updateManyAndReturn<T extends LeaveBalanceUpdateManyAndReturnArgs>(args: SelectSubset<T, LeaveBalanceUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LeaveBalancePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one LeaveBalance.
     * @param {LeaveBalanceUpsertArgs} args - Arguments to update or create a LeaveBalance.
     * @example
     * // Update or create a LeaveBalance
     * const leaveBalance = await prisma.leaveBalance.upsert({
     *   create: {
     *     // ... data to create a LeaveBalance
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the LeaveBalance we want to update
     *   }
     * })
     */
    upsert<T extends LeaveBalanceUpsertArgs>(args: SelectSubset<T, LeaveBalanceUpsertArgs<ExtArgs>>): Prisma__LeaveBalanceClient<$Result.GetResult<Prisma.$LeaveBalancePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of LeaveBalances.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeaveBalanceCountArgs} args - Arguments to filter LeaveBalances to count.
     * @example
     * // Count the number of LeaveBalances
     * const count = await prisma.leaveBalance.count({
     *   where: {
     *     // ... the filter for the LeaveBalances we want to count
     *   }
     * })
    **/
    count<T extends LeaveBalanceCountArgs>(
      args?: Subset<T, LeaveBalanceCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], LeaveBalanceCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a LeaveBalance.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeaveBalanceAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends LeaveBalanceAggregateArgs>(args: Subset<T, LeaveBalanceAggregateArgs>): Prisma.PrismaPromise<GetLeaveBalanceAggregateType<T>>

    /**
     * Group by LeaveBalance.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeaveBalanceGroupByArgs} args - Group by arguments.
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
      T extends LeaveBalanceGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: LeaveBalanceGroupByArgs['orderBy'] }
        : { orderBy?: LeaveBalanceGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, LeaveBalanceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLeaveBalanceGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the LeaveBalance model
   */
  readonly fields: LeaveBalanceFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for LeaveBalance.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__LeaveBalanceClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    leave_type<T extends LeaveTypeDefaultArgs<ExtArgs> = {}>(args?: Subset<T, LeaveTypeDefaultArgs<ExtArgs>>): Prisma__LeaveTypeClient<$Result.GetResult<Prisma.$LeaveTypePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the LeaveBalance model
   */
  interface LeaveBalanceFieldRefs {
    readonly id: FieldRef<"LeaveBalance", 'String'>
    readonly employee_id: FieldRef<"LeaveBalance", 'String'>
    readonly leave_type_id: FieldRef<"LeaveBalance", 'String'>
    readonly year: FieldRef<"LeaveBalance", 'Int'>
    readonly entitled: FieldRef<"LeaveBalance", 'Int'>
    readonly used: FieldRef<"LeaveBalance", 'Int'>
    readonly pending: FieldRef<"LeaveBalance", 'Int'>
    readonly remaining: FieldRef<"LeaveBalance", 'Int'>
    readonly carry_over: FieldRef<"LeaveBalance", 'Int'>
    readonly expiry_date: FieldRef<"LeaveBalance", 'DateTime'>
    readonly created_at: FieldRef<"LeaveBalance", 'DateTime'>
    readonly updated_at: FieldRef<"LeaveBalance", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * LeaveBalance findUnique
   */
  export type LeaveBalanceFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeaveBalance
     */
    select?: LeaveBalanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LeaveBalance
     */
    omit?: LeaveBalanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeaveBalanceInclude<ExtArgs> | null
    /**
     * Filter, which LeaveBalance to fetch.
     */
    where: LeaveBalanceWhereUniqueInput
  }

  /**
   * LeaveBalance findUniqueOrThrow
   */
  export type LeaveBalanceFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeaveBalance
     */
    select?: LeaveBalanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LeaveBalance
     */
    omit?: LeaveBalanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeaveBalanceInclude<ExtArgs> | null
    /**
     * Filter, which LeaveBalance to fetch.
     */
    where: LeaveBalanceWhereUniqueInput
  }

  /**
   * LeaveBalance findFirst
   */
  export type LeaveBalanceFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeaveBalance
     */
    select?: LeaveBalanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LeaveBalance
     */
    omit?: LeaveBalanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeaveBalanceInclude<ExtArgs> | null
    /**
     * Filter, which LeaveBalance to fetch.
     */
    where?: LeaveBalanceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LeaveBalances to fetch.
     */
    orderBy?: LeaveBalanceOrderByWithRelationInput | LeaveBalanceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LeaveBalances.
     */
    cursor?: LeaveBalanceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LeaveBalances from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LeaveBalances.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LeaveBalances.
     */
    distinct?: LeaveBalanceScalarFieldEnum | LeaveBalanceScalarFieldEnum[]
  }

  /**
   * LeaveBalance findFirstOrThrow
   */
  export type LeaveBalanceFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeaveBalance
     */
    select?: LeaveBalanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LeaveBalance
     */
    omit?: LeaveBalanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeaveBalanceInclude<ExtArgs> | null
    /**
     * Filter, which LeaveBalance to fetch.
     */
    where?: LeaveBalanceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LeaveBalances to fetch.
     */
    orderBy?: LeaveBalanceOrderByWithRelationInput | LeaveBalanceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LeaveBalances.
     */
    cursor?: LeaveBalanceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LeaveBalances from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LeaveBalances.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LeaveBalances.
     */
    distinct?: LeaveBalanceScalarFieldEnum | LeaveBalanceScalarFieldEnum[]
  }

  /**
   * LeaveBalance findMany
   */
  export type LeaveBalanceFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeaveBalance
     */
    select?: LeaveBalanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LeaveBalance
     */
    omit?: LeaveBalanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeaveBalanceInclude<ExtArgs> | null
    /**
     * Filter, which LeaveBalances to fetch.
     */
    where?: LeaveBalanceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LeaveBalances to fetch.
     */
    orderBy?: LeaveBalanceOrderByWithRelationInput | LeaveBalanceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing LeaveBalances.
     */
    cursor?: LeaveBalanceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LeaveBalances from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LeaveBalances.
     */
    skip?: number
    distinct?: LeaveBalanceScalarFieldEnum | LeaveBalanceScalarFieldEnum[]
  }

  /**
   * LeaveBalance create
   */
  export type LeaveBalanceCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeaveBalance
     */
    select?: LeaveBalanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LeaveBalance
     */
    omit?: LeaveBalanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeaveBalanceInclude<ExtArgs> | null
    /**
     * The data needed to create a LeaveBalance.
     */
    data: XOR<LeaveBalanceCreateInput, LeaveBalanceUncheckedCreateInput>
  }

  /**
   * LeaveBalance createMany
   */
  export type LeaveBalanceCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many LeaveBalances.
     */
    data: LeaveBalanceCreateManyInput | LeaveBalanceCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * LeaveBalance createManyAndReturn
   */
  export type LeaveBalanceCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeaveBalance
     */
    select?: LeaveBalanceSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the LeaveBalance
     */
    omit?: LeaveBalanceOmit<ExtArgs> | null
    /**
     * The data used to create many LeaveBalances.
     */
    data: LeaveBalanceCreateManyInput | LeaveBalanceCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeaveBalanceIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * LeaveBalance update
   */
  export type LeaveBalanceUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeaveBalance
     */
    select?: LeaveBalanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LeaveBalance
     */
    omit?: LeaveBalanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeaveBalanceInclude<ExtArgs> | null
    /**
     * The data needed to update a LeaveBalance.
     */
    data: XOR<LeaveBalanceUpdateInput, LeaveBalanceUncheckedUpdateInput>
    /**
     * Choose, which LeaveBalance to update.
     */
    where: LeaveBalanceWhereUniqueInput
  }

  /**
   * LeaveBalance updateMany
   */
  export type LeaveBalanceUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update LeaveBalances.
     */
    data: XOR<LeaveBalanceUpdateManyMutationInput, LeaveBalanceUncheckedUpdateManyInput>
    /**
     * Filter which LeaveBalances to update
     */
    where?: LeaveBalanceWhereInput
    /**
     * Limit how many LeaveBalances to update.
     */
    limit?: number
  }

  /**
   * LeaveBalance updateManyAndReturn
   */
  export type LeaveBalanceUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeaveBalance
     */
    select?: LeaveBalanceSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the LeaveBalance
     */
    omit?: LeaveBalanceOmit<ExtArgs> | null
    /**
     * The data used to update LeaveBalances.
     */
    data: XOR<LeaveBalanceUpdateManyMutationInput, LeaveBalanceUncheckedUpdateManyInput>
    /**
     * Filter which LeaveBalances to update
     */
    where?: LeaveBalanceWhereInput
    /**
     * Limit how many LeaveBalances to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeaveBalanceIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * LeaveBalance upsert
   */
  export type LeaveBalanceUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeaveBalance
     */
    select?: LeaveBalanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LeaveBalance
     */
    omit?: LeaveBalanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeaveBalanceInclude<ExtArgs> | null
    /**
     * The filter to search for the LeaveBalance to update in case it exists.
     */
    where: LeaveBalanceWhereUniqueInput
    /**
     * In case the LeaveBalance found by the `where` argument doesn't exist, create a new LeaveBalance with this data.
     */
    create: XOR<LeaveBalanceCreateInput, LeaveBalanceUncheckedCreateInput>
    /**
     * In case the LeaveBalance was found with the provided `where` argument, update it with this data.
     */
    update: XOR<LeaveBalanceUpdateInput, LeaveBalanceUncheckedUpdateInput>
  }

  /**
   * LeaveBalance delete
   */
  export type LeaveBalanceDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeaveBalance
     */
    select?: LeaveBalanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LeaveBalance
     */
    omit?: LeaveBalanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeaveBalanceInclude<ExtArgs> | null
    /**
     * Filter which LeaveBalance to delete.
     */
    where: LeaveBalanceWhereUniqueInput
  }

  /**
   * LeaveBalance deleteMany
   */
  export type LeaveBalanceDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which LeaveBalances to delete
     */
    where?: LeaveBalanceWhereInput
    /**
     * Limit how many LeaveBalances to delete.
     */
    limit?: number
  }

  /**
   * LeaveBalance without action
   */
  export type LeaveBalanceDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeaveBalance
     */
    select?: LeaveBalanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LeaveBalance
     */
    omit?: LeaveBalanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeaveBalanceInclude<ExtArgs> | null
  }


  /**
   * Model LeaveRequest
   */

  export type AggregateLeaveRequest = {
    _count: LeaveRequestCountAggregateOutputType | null
    _avg: LeaveRequestAvgAggregateOutputType | null
    _sum: LeaveRequestSumAggregateOutputType | null
    _min: LeaveRequestMinAggregateOutputType | null
    _max: LeaveRequestMaxAggregateOutputType | null
  }

  export type LeaveRequestAvgAggregateOutputType = {
    days: number | null
  }

  export type LeaveRequestSumAggregateOutputType = {
    days: number | null
  }

  export type LeaveRequestMinAggregateOutputType = {
    id: string | null
    employee_id: string | null
    leave_type_id: string | null
    start_date: Date | null
    end_date: Date | null
    days: number | null
    half_day: string | null
    reason: string | null
    status: string | null
    substitute_id: string | null
    approved_by: string | null
    approved_date: Date | null
    rejection_reason: string | null
    submitted_at: Date | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type LeaveRequestMaxAggregateOutputType = {
    id: string | null
    employee_id: string | null
    leave_type_id: string | null
    start_date: Date | null
    end_date: Date | null
    days: number | null
    half_day: string | null
    reason: string | null
    status: string | null
    substitute_id: string | null
    approved_by: string | null
    approved_date: Date | null
    rejection_reason: string | null
    submitted_at: Date | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type LeaveRequestCountAggregateOutputType = {
    id: number
    employee_id: number
    leave_type_id: number
    start_date: number
    end_date: number
    days: number
    half_day: number
    reason: number
    status: number
    substitute_id: number
    attachments: number
    approved_by: number
    approved_date: number
    rejection_reason: number
    submitted_at: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type LeaveRequestAvgAggregateInputType = {
    days?: true
  }

  export type LeaveRequestSumAggregateInputType = {
    days?: true
  }

  export type LeaveRequestMinAggregateInputType = {
    id?: true
    employee_id?: true
    leave_type_id?: true
    start_date?: true
    end_date?: true
    days?: true
    half_day?: true
    reason?: true
    status?: true
    substitute_id?: true
    approved_by?: true
    approved_date?: true
    rejection_reason?: true
    submitted_at?: true
    created_at?: true
    updated_at?: true
  }

  export type LeaveRequestMaxAggregateInputType = {
    id?: true
    employee_id?: true
    leave_type_id?: true
    start_date?: true
    end_date?: true
    days?: true
    half_day?: true
    reason?: true
    status?: true
    substitute_id?: true
    approved_by?: true
    approved_date?: true
    rejection_reason?: true
    submitted_at?: true
    created_at?: true
    updated_at?: true
  }

  export type LeaveRequestCountAggregateInputType = {
    id?: true
    employee_id?: true
    leave_type_id?: true
    start_date?: true
    end_date?: true
    days?: true
    half_day?: true
    reason?: true
    status?: true
    substitute_id?: true
    attachments?: true
    approved_by?: true
    approved_date?: true
    rejection_reason?: true
    submitted_at?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type LeaveRequestAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which LeaveRequest to aggregate.
     */
    where?: LeaveRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LeaveRequests to fetch.
     */
    orderBy?: LeaveRequestOrderByWithRelationInput | LeaveRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: LeaveRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LeaveRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LeaveRequests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned LeaveRequests
    **/
    _count?: true | LeaveRequestCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: LeaveRequestAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: LeaveRequestSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: LeaveRequestMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: LeaveRequestMaxAggregateInputType
  }

  export type GetLeaveRequestAggregateType<T extends LeaveRequestAggregateArgs> = {
        [P in keyof T & keyof AggregateLeaveRequest]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLeaveRequest[P]>
      : GetScalarType<T[P], AggregateLeaveRequest[P]>
  }




  export type LeaveRequestGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LeaveRequestWhereInput
    orderBy?: LeaveRequestOrderByWithAggregationInput | LeaveRequestOrderByWithAggregationInput[]
    by: LeaveRequestScalarFieldEnum[] | LeaveRequestScalarFieldEnum
    having?: LeaveRequestScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: LeaveRequestCountAggregateInputType | true
    _avg?: LeaveRequestAvgAggregateInputType
    _sum?: LeaveRequestSumAggregateInputType
    _min?: LeaveRequestMinAggregateInputType
    _max?: LeaveRequestMaxAggregateInputType
  }

  export type LeaveRequestGroupByOutputType = {
    id: string
    employee_id: string
    leave_type_id: string
    start_date: Date
    end_date: Date
    days: number
    half_day: string | null
    reason: string | null
    status: string
    substitute_id: string | null
    attachments: JsonValue | null
    approved_by: string | null
    approved_date: Date | null
    rejection_reason: string | null
    submitted_at: Date
    created_at: Date
    updated_at: Date
    _count: LeaveRequestCountAggregateOutputType | null
    _avg: LeaveRequestAvgAggregateOutputType | null
    _sum: LeaveRequestSumAggregateOutputType | null
    _min: LeaveRequestMinAggregateOutputType | null
    _max: LeaveRequestMaxAggregateOutputType | null
  }

  type GetLeaveRequestGroupByPayload<T extends LeaveRequestGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<LeaveRequestGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof LeaveRequestGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], LeaveRequestGroupByOutputType[P]>
            : GetScalarType<T[P], LeaveRequestGroupByOutputType[P]>
        }
      >
    >


  export type LeaveRequestSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    employee_id?: boolean
    leave_type_id?: boolean
    start_date?: boolean
    end_date?: boolean
    days?: boolean
    half_day?: boolean
    reason?: boolean
    status?: boolean
    substitute_id?: boolean
    attachments?: boolean
    approved_by?: boolean
    approved_date?: boolean
    rejection_reason?: boolean
    submitted_at?: boolean
    created_at?: boolean
    updated_at?: boolean
    leave_type?: boolean | LeaveTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["leaveRequest"]>

  export type LeaveRequestSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    employee_id?: boolean
    leave_type_id?: boolean
    start_date?: boolean
    end_date?: boolean
    days?: boolean
    half_day?: boolean
    reason?: boolean
    status?: boolean
    substitute_id?: boolean
    attachments?: boolean
    approved_by?: boolean
    approved_date?: boolean
    rejection_reason?: boolean
    submitted_at?: boolean
    created_at?: boolean
    updated_at?: boolean
    leave_type?: boolean | LeaveTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["leaveRequest"]>

  export type LeaveRequestSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    employee_id?: boolean
    leave_type_id?: boolean
    start_date?: boolean
    end_date?: boolean
    days?: boolean
    half_day?: boolean
    reason?: boolean
    status?: boolean
    substitute_id?: boolean
    attachments?: boolean
    approved_by?: boolean
    approved_date?: boolean
    rejection_reason?: boolean
    submitted_at?: boolean
    created_at?: boolean
    updated_at?: boolean
    leave_type?: boolean | LeaveTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["leaveRequest"]>

  export type LeaveRequestSelectScalar = {
    id?: boolean
    employee_id?: boolean
    leave_type_id?: boolean
    start_date?: boolean
    end_date?: boolean
    days?: boolean
    half_day?: boolean
    reason?: boolean
    status?: boolean
    substitute_id?: boolean
    attachments?: boolean
    approved_by?: boolean
    approved_date?: boolean
    rejection_reason?: boolean
    submitted_at?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type LeaveRequestOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "employee_id" | "leave_type_id" | "start_date" | "end_date" | "days" | "half_day" | "reason" | "status" | "substitute_id" | "attachments" | "approved_by" | "approved_date" | "rejection_reason" | "submitted_at" | "created_at" | "updated_at", ExtArgs["result"]["leaveRequest"]>
  export type LeaveRequestInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    leave_type?: boolean | LeaveTypeDefaultArgs<ExtArgs>
  }
  export type LeaveRequestIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    leave_type?: boolean | LeaveTypeDefaultArgs<ExtArgs>
  }
  export type LeaveRequestIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    leave_type?: boolean | LeaveTypeDefaultArgs<ExtArgs>
  }

  export type $LeaveRequestPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "LeaveRequest"
    objects: {
      leave_type: Prisma.$LeaveTypePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      employee_id: string
      leave_type_id: string
      start_date: Date
      end_date: Date
      days: number
      half_day: string | null
      reason: string | null
      status: string
      substitute_id: string | null
      attachments: Prisma.JsonValue | null
      approved_by: string | null
      approved_date: Date | null
      rejection_reason: string | null
      submitted_at: Date
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["leaveRequest"]>
    composites: {}
  }

  type LeaveRequestGetPayload<S extends boolean | null | undefined | LeaveRequestDefaultArgs> = $Result.GetResult<Prisma.$LeaveRequestPayload, S>

  type LeaveRequestCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<LeaveRequestFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: LeaveRequestCountAggregateInputType | true
    }

  export interface LeaveRequestDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['LeaveRequest'], meta: { name: 'LeaveRequest' } }
    /**
     * Find zero or one LeaveRequest that matches the filter.
     * @param {LeaveRequestFindUniqueArgs} args - Arguments to find a LeaveRequest
     * @example
     * // Get one LeaveRequest
     * const leaveRequest = await prisma.leaveRequest.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends LeaveRequestFindUniqueArgs>(args: SelectSubset<T, LeaveRequestFindUniqueArgs<ExtArgs>>): Prisma__LeaveRequestClient<$Result.GetResult<Prisma.$LeaveRequestPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one LeaveRequest that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {LeaveRequestFindUniqueOrThrowArgs} args - Arguments to find a LeaveRequest
     * @example
     * // Get one LeaveRequest
     * const leaveRequest = await prisma.leaveRequest.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends LeaveRequestFindUniqueOrThrowArgs>(args: SelectSubset<T, LeaveRequestFindUniqueOrThrowArgs<ExtArgs>>): Prisma__LeaveRequestClient<$Result.GetResult<Prisma.$LeaveRequestPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first LeaveRequest that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeaveRequestFindFirstArgs} args - Arguments to find a LeaveRequest
     * @example
     * // Get one LeaveRequest
     * const leaveRequest = await prisma.leaveRequest.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends LeaveRequestFindFirstArgs>(args?: SelectSubset<T, LeaveRequestFindFirstArgs<ExtArgs>>): Prisma__LeaveRequestClient<$Result.GetResult<Prisma.$LeaveRequestPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first LeaveRequest that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeaveRequestFindFirstOrThrowArgs} args - Arguments to find a LeaveRequest
     * @example
     * // Get one LeaveRequest
     * const leaveRequest = await prisma.leaveRequest.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends LeaveRequestFindFirstOrThrowArgs>(args?: SelectSubset<T, LeaveRequestFindFirstOrThrowArgs<ExtArgs>>): Prisma__LeaveRequestClient<$Result.GetResult<Prisma.$LeaveRequestPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more LeaveRequests that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeaveRequestFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all LeaveRequests
     * const leaveRequests = await prisma.leaveRequest.findMany()
     * 
     * // Get first 10 LeaveRequests
     * const leaveRequests = await prisma.leaveRequest.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const leaveRequestWithIdOnly = await prisma.leaveRequest.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends LeaveRequestFindManyArgs>(args?: SelectSubset<T, LeaveRequestFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LeaveRequestPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a LeaveRequest.
     * @param {LeaveRequestCreateArgs} args - Arguments to create a LeaveRequest.
     * @example
     * // Create one LeaveRequest
     * const LeaveRequest = await prisma.leaveRequest.create({
     *   data: {
     *     // ... data to create a LeaveRequest
     *   }
     * })
     * 
     */
    create<T extends LeaveRequestCreateArgs>(args: SelectSubset<T, LeaveRequestCreateArgs<ExtArgs>>): Prisma__LeaveRequestClient<$Result.GetResult<Prisma.$LeaveRequestPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many LeaveRequests.
     * @param {LeaveRequestCreateManyArgs} args - Arguments to create many LeaveRequests.
     * @example
     * // Create many LeaveRequests
     * const leaveRequest = await prisma.leaveRequest.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends LeaveRequestCreateManyArgs>(args?: SelectSubset<T, LeaveRequestCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many LeaveRequests and returns the data saved in the database.
     * @param {LeaveRequestCreateManyAndReturnArgs} args - Arguments to create many LeaveRequests.
     * @example
     * // Create many LeaveRequests
     * const leaveRequest = await prisma.leaveRequest.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many LeaveRequests and only return the `id`
     * const leaveRequestWithIdOnly = await prisma.leaveRequest.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends LeaveRequestCreateManyAndReturnArgs>(args?: SelectSubset<T, LeaveRequestCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LeaveRequestPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a LeaveRequest.
     * @param {LeaveRequestDeleteArgs} args - Arguments to delete one LeaveRequest.
     * @example
     * // Delete one LeaveRequest
     * const LeaveRequest = await prisma.leaveRequest.delete({
     *   where: {
     *     // ... filter to delete one LeaveRequest
     *   }
     * })
     * 
     */
    delete<T extends LeaveRequestDeleteArgs>(args: SelectSubset<T, LeaveRequestDeleteArgs<ExtArgs>>): Prisma__LeaveRequestClient<$Result.GetResult<Prisma.$LeaveRequestPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one LeaveRequest.
     * @param {LeaveRequestUpdateArgs} args - Arguments to update one LeaveRequest.
     * @example
     * // Update one LeaveRequest
     * const leaveRequest = await prisma.leaveRequest.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends LeaveRequestUpdateArgs>(args: SelectSubset<T, LeaveRequestUpdateArgs<ExtArgs>>): Prisma__LeaveRequestClient<$Result.GetResult<Prisma.$LeaveRequestPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more LeaveRequests.
     * @param {LeaveRequestDeleteManyArgs} args - Arguments to filter LeaveRequests to delete.
     * @example
     * // Delete a few LeaveRequests
     * const { count } = await prisma.leaveRequest.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends LeaveRequestDeleteManyArgs>(args?: SelectSubset<T, LeaveRequestDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more LeaveRequests.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeaveRequestUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many LeaveRequests
     * const leaveRequest = await prisma.leaveRequest.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends LeaveRequestUpdateManyArgs>(args: SelectSubset<T, LeaveRequestUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more LeaveRequests and returns the data updated in the database.
     * @param {LeaveRequestUpdateManyAndReturnArgs} args - Arguments to update many LeaveRequests.
     * @example
     * // Update many LeaveRequests
     * const leaveRequest = await prisma.leaveRequest.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more LeaveRequests and only return the `id`
     * const leaveRequestWithIdOnly = await prisma.leaveRequest.updateManyAndReturn({
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
    updateManyAndReturn<T extends LeaveRequestUpdateManyAndReturnArgs>(args: SelectSubset<T, LeaveRequestUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LeaveRequestPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one LeaveRequest.
     * @param {LeaveRequestUpsertArgs} args - Arguments to update or create a LeaveRequest.
     * @example
     * // Update or create a LeaveRequest
     * const leaveRequest = await prisma.leaveRequest.upsert({
     *   create: {
     *     // ... data to create a LeaveRequest
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the LeaveRequest we want to update
     *   }
     * })
     */
    upsert<T extends LeaveRequestUpsertArgs>(args: SelectSubset<T, LeaveRequestUpsertArgs<ExtArgs>>): Prisma__LeaveRequestClient<$Result.GetResult<Prisma.$LeaveRequestPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of LeaveRequests.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeaveRequestCountArgs} args - Arguments to filter LeaveRequests to count.
     * @example
     * // Count the number of LeaveRequests
     * const count = await prisma.leaveRequest.count({
     *   where: {
     *     // ... the filter for the LeaveRequests we want to count
     *   }
     * })
    **/
    count<T extends LeaveRequestCountArgs>(
      args?: Subset<T, LeaveRequestCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], LeaveRequestCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a LeaveRequest.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeaveRequestAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends LeaveRequestAggregateArgs>(args: Subset<T, LeaveRequestAggregateArgs>): Prisma.PrismaPromise<GetLeaveRequestAggregateType<T>>

    /**
     * Group by LeaveRequest.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeaveRequestGroupByArgs} args - Group by arguments.
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
      T extends LeaveRequestGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: LeaveRequestGroupByArgs['orderBy'] }
        : { orderBy?: LeaveRequestGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, LeaveRequestGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLeaveRequestGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the LeaveRequest model
   */
  readonly fields: LeaveRequestFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for LeaveRequest.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__LeaveRequestClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    leave_type<T extends LeaveTypeDefaultArgs<ExtArgs> = {}>(args?: Subset<T, LeaveTypeDefaultArgs<ExtArgs>>): Prisma__LeaveTypeClient<$Result.GetResult<Prisma.$LeaveTypePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the LeaveRequest model
   */
  interface LeaveRequestFieldRefs {
    readonly id: FieldRef<"LeaveRequest", 'String'>
    readonly employee_id: FieldRef<"LeaveRequest", 'String'>
    readonly leave_type_id: FieldRef<"LeaveRequest", 'String'>
    readonly start_date: FieldRef<"LeaveRequest", 'DateTime'>
    readonly end_date: FieldRef<"LeaveRequest", 'DateTime'>
    readonly days: FieldRef<"LeaveRequest", 'Float'>
    readonly half_day: FieldRef<"LeaveRequest", 'String'>
    readonly reason: FieldRef<"LeaveRequest", 'String'>
    readonly status: FieldRef<"LeaveRequest", 'String'>
    readonly substitute_id: FieldRef<"LeaveRequest", 'String'>
    readonly attachments: FieldRef<"LeaveRequest", 'Json'>
    readonly approved_by: FieldRef<"LeaveRequest", 'String'>
    readonly approved_date: FieldRef<"LeaveRequest", 'DateTime'>
    readonly rejection_reason: FieldRef<"LeaveRequest", 'String'>
    readonly submitted_at: FieldRef<"LeaveRequest", 'DateTime'>
    readonly created_at: FieldRef<"LeaveRequest", 'DateTime'>
    readonly updated_at: FieldRef<"LeaveRequest", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * LeaveRequest findUnique
   */
  export type LeaveRequestFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeaveRequest
     */
    select?: LeaveRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LeaveRequest
     */
    omit?: LeaveRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeaveRequestInclude<ExtArgs> | null
    /**
     * Filter, which LeaveRequest to fetch.
     */
    where: LeaveRequestWhereUniqueInput
  }

  /**
   * LeaveRequest findUniqueOrThrow
   */
  export type LeaveRequestFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeaveRequest
     */
    select?: LeaveRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LeaveRequest
     */
    omit?: LeaveRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeaveRequestInclude<ExtArgs> | null
    /**
     * Filter, which LeaveRequest to fetch.
     */
    where: LeaveRequestWhereUniqueInput
  }

  /**
   * LeaveRequest findFirst
   */
  export type LeaveRequestFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeaveRequest
     */
    select?: LeaveRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LeaveRequest
     */
    omit?: LeaveRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeaveRequestInclude<ExtArgs> | null
    /**
     * Filter, which LeaveRequest to fetch.
     */
    where?: LeaveRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LeaveRequests to fetch.
     */
    orderBy?: LeaveRequestOrderByWithRelationInput | LeaveRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LeaveRequests.
     */
    cursor?: LeaveRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LeaveRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LeaveRequests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LeaveRequests.
     */
    distinct?: LeaveRequestScalarFieldEnum | LeaveRequestScalarFieldEnum[]
  }

  /**
   * LeaveRequest findFirstOrThrow
   */
  export type LeaveRequestFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeaveRequest
     */
    select?: LeaveRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LeaveRequest
     */
    omit?: LeaveRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeaveRequestInclude<ExtArgs> | null
    /**
     * Filter, which LeaveRequest to fetch.
     */
    where?: LeaveRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LeaveRequests to fetch.
     */
    orderBy?: LeaveRequestOrderByWithRelationInput | LeaveRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LeaveRequests.
     */
    cursor?: LeaveRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LeaveRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LeaveRequests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LeaveRequests.
     */
    distinct?: LeaveRequestScalarFieldEnum | LeaveRequestScalarFieldEnum[]
  }

  /**
   * LeaveRequest findMany
   */
  export type LeaveRequestFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeaveRequest
     */
    select?: LeaveRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LeaveRequest
     */
    omit?: LeaveRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeaveRequestInclude<ExtArgs> | null
    /**
     * Filter, which LeaveRequests to fetch.
     */
    where?: LeaveRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LeaveRequests to fetch.
     */
    orderBy?: LeaveRequestOrderByWithRelationInput | LeaveRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing LeaveRequests.
     */
    cursor?: LeaveRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LeaveRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LeaveRequests.
     */
    skip?: number
    distinct?: LeaveRequestScalarFieldEnum | LeaveRequestScalarFieldEnum[]
  }

  /**
   * LeaveRequest create
   */
  export type LeaveRequestCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeaveRequest
     */
    select?: LeaveRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LeaveRequest
     */
    omit?: LeaveRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeaveRequestInclude<ExtArgs> | null
    /**
     * The data needed to create a LeaveRequest.
     */
    data: XOR<LeaveRequestCreateInput, LeaveRequestUncheckedCreateInput>
  }

  /**
   * LeaveRequest createMany
   */
  export type LeaveRequestCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many LeaveRequests.
     */
    data: LeaveRequestCreateManyInput | LeaveRequestCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * LeaveRequest createManyAndReturn
   */
  export type LeaveRequestCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeaveRequest
     */
    select?: LeaveRequestSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the LeaveRequest
     */
    omit?: LeaveRequestOmit<ExtArgs> | null
    /**
     * The data used to create many LeaveRequests.
     */
    data: LeaveRequestCreateManyInput | LeaveRequestCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeaveRequestIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * LeaveRequest update
   */
  export type LeaveRequestUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeaveRequest
     */
    select?: LeaveRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LeaveRequest
     */
    omit?: LeaveRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeaveRequestInclude<ExtArgs> | null
    /**
     * The data needed to update a LeaveRequest.
     */
    data: XOR<LeaveRequestUpdateInput, LeaveRequestUncheckedUpdateInput>
    /**
     * Choose, which LeaveRequest to update.
     */
    where: LeaveRequestWhereUniqueInput
  }

  /**
   * LeaveRequest updateMany
   */
  export type LeaveRequestUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update LeaveRequests.
     */
    data: XOR<LeaveRequestUpdateManyMutationInput, LeaveRequestUncheckedUpdateManyInput>
    /**
     * Filter which LeaveRequests to update
     */
    where?: LeaveRequestWhereInput
    /**
     * Limit how many LeaveRequests to update.
     */
    limit?: number
  }

  /**
   * LeaveRequest updateManyAndReturn
   */
  export type LeaveRequestUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeaveRequest
     */
    select?: LeaveRequestSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the LeaveRequest
     */
    omit?: LeaveRequestOmit<ExtArgs> | null
    /**
     * The data used to update LeaveRequests.
     */
    data: XOR<LeaveRequestUpdateManyMutationInput, LeaveRequestUncheckedUpdateManyInput>
    /**
     * Filter which LeaveRequests to update
     */
    where?: LeaveRequestWhereInput
    /**
     * Limit how many LeaveRequests to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeaveRequestIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * LeaveRequest upsert
   */
  export type LeaveRequestUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeaveRequest
     */
    select?: LeaveRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LeaveRequest
     */
    omit?: LeaveRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeaveRequestInclude<ExtArgs> | null
    /**
     * The filter to search for the LeaveRequest to update in case it exists.
     */
    where: LeaveRequestWhereUniqueInput
    /**
     * In case the LeaveRequest found by the `where` argument doesn't exist, create a new LeaveRequest with this data.
     */
    create: XOR<LeaveRequestCreateInput, LeaveRequestUncheckedCreateInput>
    /**
     * In case the LeaveRequest was found with the provided `where` argument, update it with this data.
     */
    update: XOR<LeaveRequestUpdateInput, LeaveRequestUncheckedUpdateInput>
  }

  /**
   * LeaveRequest delete
   */
  export type LeaveRequestDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeaveRequest
     */
    select?: LeaveRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LeaveRequest
     */
    omit?: LeaveRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeaveRequestInclude<ExtArgs> | null
    /**
     * Filter which LeaveRequest to delete.
     */
    where: LeaveRequestWhereUniqueInput
  }

  /**
   * LeaveRequest deleteMany
   */
  export type LeaveRequestDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which LeaveRequests to delete
     */
    where?: LeaveRequestWhereInput
    /**
     * Limit how many LeaveRequests to delete.
     */
    limit?: number
  }

  /**
   * LeaveRequest without action
   */
  export type LeaveRequestDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeaveRequest
     */
    select?: LeaveRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LeaveRequest
     */
    omit?: LeaveRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeaveRequestInclude<ExtArgs> | null
  }


  /**
   * Model LeaveCalendar
   */

  export type AggregateLeaveCalendar = {
    _count: LeaveCalendarCountAggregateOutputType | null
    _min: LeaveCalendarMinAggregateOutputType | null
    _max: LeaveCalendarMaxAggregateOutputType | null
  }

  export type LeaveCalendarMinAggregateOutputType = {
    id: string | null
    date: Date | null
    is_holiday: boolean | null
    holiday_name: string | null
    holiday_name_th: string | null
    created_at: Date | null
  }

  export type LeaveCalendarMaxAggregateOutputType = {
    id: string | null
    date: Date | null
    is_holiday: boolean | null
    holiday_name: string | null
    holiday_name_th: string | null
    created_at: Date | null
  }

  export type LeaveCalendarCountAggregateOutputType = {
    id: number
    date: number
    is_holiday: number
    holiday_name: number
    holiday_name_th: number
    created_at: number
    _all: number
  }


  export type LeaveCalendarMinAggregateInputType = {
    id?: true
    date?: true
    is_holiday?: true
    holiday_name?: true
    holiday_name_th?: true
    created_at?: true
  }

  export type LeaveCalendarMaxAggregateInputType = {
    id?: true
    date?: true
    is_holiday?: true
    holiday_name?: true
    holiday_name_th?: true
    created_at?: true
  }

  export type LeaveCalendarCountAggregateInputType = {
    id?: true
    date?: true
    is_holiday?: true
    holiday_name?: true
    holiday_name_th?: true
    created_at?: true
    _all?: true
  }

  export type LeaveCalendarAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which LeaveCalendar to aggregate.
     */
    where?: LeaveCalendarWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LeaveCalendars to fetch.
     */
    orderBy?: LeaveCalendarOrderByWithRelationInput | LeaveCalendarOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: LeaveCalendarWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LeaveCalendars from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LeaveCalendars.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned LeaveCalendars
    **/
    _count?: true | LeaveCalendarCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: LeaveCalendarMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: LeaveCalendarMaxAggregateInputType
  }

  export type GetLeaveCalendarAggregateType<T extends LeaveCalendarAggregateArgs> = {
        [P in keyof T & keyof AggregateLeaveCalendar]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLeaveCalendar[P]>
      : GetScalarType<T[P], AggregateLeaveCalendar[P]>
  }




  export type LeaveCalendarGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LeaveCalendarWhereInput
    orderBy?: LeaveCalendarOrderByWithAggregationInput | LeaveCalendarOrderByWithAggregationInput[]
    by: LeaveCalendarScalarFieldEnum[] | LeaveCalendarScalarFieldEnum
    having?: LeaveCalendarScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: LeaveCalendarCountAggregateInputType | true
    _min?: LeaveCalendarMinAggregateInputType
    _max?: LeaveCalendarMaxAggregateInputType
  }

  export type LeaveCalendarGroupByOutputType = {
    id: string
    date: Date
    is_holiday: boolean
    holiday_name: string | null
    holiday_name_th: string | null
    created_at: Date
    _count: LeaveCalendarCountAggregateOutputType | null
    _min: LeaveCalendarMinAggregateOutputType | null
    _max: LeaveCalendarMaxAggregateOutputType | null
  }

  type GetLeaveCalendarGroupByPayload<T extends LeaveCalendarGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<LeaveCalendarGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof LeaveCalendarGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], LeaveCalendarGroupByOutputType[P]>
            : GetScalarType<T[P], LeaveCalendarGroupByOutputType[P]>
        }
      >
    >


  export type LeaveCalendarSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    date?: boolean
    is_holiday?: boolean
    holiday_name?: boolean
    holiday_name_th?: boolean
    created_at?: boolean
  }, ExtArgs["result"]["leaveCalendar"]>

  export type LeaveCalendarSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    date?: boolean
    is_holiday?: boolean
    holiday_name?: boolean
    holiday_name_th?: boolean
    created_at?: boolean
  }, ExtArgs["result"]["leaveCalendar"]>

  export type LeaveCalendarSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    date?: boolean
    is_holiday?: boolean
    holiday_name?: boolean
    holiday_name_th?: boolean
    created_at?: boolean
  }, ExtArgs["result"]["leaveCalendar"]>

  export type LeaveCalendarSelectScalar = {
    id?: boolean
    date?: boolean
    is_holiday?: boolean
    holiday_name?: boolean
    holiday_name_th?: boolean
    created_at?: boolean
  }

  export type LeaveCalendarOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "date" | "is_holiday" | "holiday_name" | "holiday_name_th" | "created_at", ExtArgs["result"]["leaveCalendar"]>

  export type $LeaveCalendarPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "LeaveCalendar"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      date: Date
      is_holiday: boolean
      holiday_name: string | null
      holiday_name_th: string | null
      created_at: Date
    }, ExtArgs["result"]["leaveCalendar"]>
    composites: {}
  }

  type LeaveCalendarGetPayload<S extends boolean | null | undefined | LeaveCalendarDefaultArgs> = $Result.GetResult<Prisma.$LeaveCalendarPayload, S>

  type LeaveCalendarCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<LeaveCalendarFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: LeaveCalendarCountAggregateInputType | true
    }

  export interface LeaveCalendarDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['LeaveCalendar'], meta: { name: 'LeaveCalendar' } }
    /**
     * Find zero or one LeaveCalendar that matches the filter.
     * @param {LeaveCalendarFindUniqueArgs} args - Arguments to find a LeaveCalendar
     * @example
     * // Get one LeaveCalendar
     * const leaveCalendar = await prisma.leaveCalendar.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends LeaveCalendarFindUniqueArgs>(args: SelectSubset<T, LeaveCalendarFindUniqueArgs<ExtArgs>>): Prisma__LeaveCalendarClient<$Result.GetResult<Prisma.$LeaveCalendarPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one LeaveCalendar that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {LeaveCalendarFindUniqueOrThrowArgs} args - Arguments to find a LeaveCalendar
     * @example
     * // Get one LeaveCalendar
     * const leaveCalendar = await prisma.leaveCalendar.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends LeaveCalendarFindUniqueOrThrowArgs>(args: SelectSubset<T, LeaveCalendarFindUniqueOrThrowArgs<ExtArgs>>): Prisma__LeaveCalendarClient<$Result.GetResult<Prisma.$LeaveCalendarPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first LeaveCalendar that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeaveCalendarFindFirstArgs} args - Arguments to find a LeaveCalendar
     * @example
     * // Get one LeaveCalendar
     * const leaveCalendar = await prisma.leaveCalendar.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends LeaveCalendarFindFirstArgs>(args?: SelectSubset<T, LeaveCalendarFindFirstArgs<ExtArgs>>): Prisma__LeaveCalendarClient<$Result.GetResult<Prisma.$LeaveCalendarPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first LeaveCalendar that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeaveCalendarFindFirstOrThrowArgs} args - Arguments to find a LeaveCalendar
     * @example
     * // Get one LeaveCalendar
     * const leaveCalendar = await prisma.leaveCalendar.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends LeaveCalendarFindFirstOrThrowArgs>(args?: SelectSubset<T, LeaveCalendarFindFirstOrThrowArgs<ExtArgs>>): Prisma__LeaveCalendarClient<$Result.GetResult<Prisma.$LeaveCalendarPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more LeaveCalendars that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeaveCalendarFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all LeaveCalendars
     * const leaveCalendars = await prisma.leaveCalendar.findMany()
     * 
     * // Get first 10 LeaveCalendars
     * const leaveCalendars = await prisma.leaveCalendar.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const leaveCalendarWithIdOnly = await prisma.leaveCalendar.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends LeaveCalendarFindManyArgs>(args?: SelectSubset<T, LeaveCalendarFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LeaveCalendarPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a LeaveCalendar.
     * @param {LeaveCalendarCreateArgs} args - Arguments to create a LeaveCalendar.
     * @example
     * // Create one LeaveCalendar
     * const LeaveCalendar = await prisma.leaveCalendar.create({
     *   data: {
     *     // ... data to create a LeaveCalendar
     *   }
     * })
     * 
     */
    create<T extends LeaveCalendarCreateArgs>(args: SelectSubset<T, LeaveCalendarCreateArgs<ExtArgs>>): Prisma__LeaveCalendarClient<$Result.GetResult<Prisma.$LeaveCalendarPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many LeaveCalendars.
     * @param {LeaveCalendarCreateManyArgs} args - Arguments to create many LeaveCalendars.
     * @example
     * // Create many LeaveCalendars
     * const leaveCalendar = await prisma.leaveCalendar.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends LeaveCalendarCreateManyArgs>(args?: SelectSubset<T, LeaveCalendarCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many LeaveCalendars and returns the data saved in the database.
     * @param {LeaveCalendarCreateManyAndReturnArgs} args - Arguments to create many LeaveCalendars.
     * @example
     * // Create many LeaveCalendars
     * const leaveCalendar = await prisma.leaveCalendar.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many LeaveCalendars and only return the `id`
     * const leaveCalendarWithIdOnly = await prisma.leaveCalendar.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends LeaveCalendarCreateManyAndReturnArgs>(args?: SelectSubset<T, LeaveCalendarCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LeaveCalendarPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a LeaveCalendar.
     * @param {LeaveCalendarDeleteArgs} args - Arguments to delete one LeaveCalendar.
     * @example
     * // Delete one LeaveCalendar
     * const LeaveCalendar = await prisma.leaveCalendar.delete({
     *   where: {
     *     // ... filter to delete one LeaveCalendar
     *   }
     * })
     * 
     */
    delete<T extends LeaveCalendarDeleteArgs>(args: SelectSubset<T, LeaveCalendarDeleteArgs<ExtArgs>>): Prisma__LeaveCalendarClient<$Result.GetResult<Prisma.$LeaveCalendarPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one LeaveCalendar.
     * @param {LeaveCalendarUpdateArgs} args - Arguments to update one LeaveCalendar.
     * @example
     * // Update one LeaveCalendar
     * const leaveCalendar = await prisma.leaveCalendar.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends LeaveCalendarUpdateArgs>(args: SelectSubset<T, LeaveCalendarUpdateArgs<ExtArgs>>): Prisma__LeaveCalendarClient<$Result.GetResult<Prisma.$LeaveCalendarPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more LeaveCalendars.
     * @param {LeaveCalendarDeleteManyArgs} args - Arguments to filter LeaveCalendars to delete.
     * @example
     * // Delete a few LeaveCalendars
     * const { count } = await prisma.leaveCalendar.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends LeaveCalendarDeleteManyArgs>(args?: SelectSubset<T, LeaveCalendarDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more LeaveCalendars.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeaveCalendarUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many LeaveCalendars
     * const leaveCalendar = await prisma.leaveCalendar.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends LeaveCalendarUpdateManyArgs>(args: SelectSubset<T, LeaveCalendarUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more LeaveCalendars and returns the data updated in the database.
     * @param {LeaveCalendarUpdateManyAndReturnArgs} args - Arguments to update many LeaveCalendars.
     * @example
     * // Update many LeaveCalendars
     * const leaveCalendar = await prisma.leaveCalendar.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more LeaveCalendars and only return the `id`
     * const leaveCalendarWithIdOnly = await prisma.leaveCalendar.updateManyAndReturn({
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
    updateManyAndReturn<T extends LeaveCalendarUpdateManyAndReturnArgs>(args: SelectSubset<T, LeaveCalendarUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LeaveCalendarPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one LeaveCalendar.
     * @param {LeaveCalendarUpsertArgs} args - Arguments to update or create a LeaveCalendar.
     * @example
     * // Update or create a LeaveCalendar
     * const leaveCalendar = await prisma.leaveCalendar.upsert({
     *   create: {
     *     // ... data to create a LeaveCalendar
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the LeaveCalendar we want to update
     *   }
     * })
     */
    upsert<T extends LeaveCalendarUpsertArgs>(args: SelectSubset<T, LeaveCalendarUpsertArgs<ExtArgs>>): Prisma__LeaveCalendarClient<$Result.GetResult<Prisma.$LeaveCalendarPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of LeaveCalendars.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeaveCalendarCountArgs} args - Arguments to filter LeaveCalendars to count.
     * @example
     * // Count the number of LeaveCalendars
     * const count = await prisma.leaveCalendar.count({
     *   where: {
     *     // ... the filter for the LeaveCalendars we want to count
     *   }
     * })
    **/
    count<T extends LeaveCalendarCountArgs>(
      args?: Subset<T, LeaveCalendarCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], LeaveCalendarCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a LeaveCalendar.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeaveCalendarAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends LeaveCalendarAggregateArgs>(args: Subset<T, LeaveCalendarAggregateArgs>): Prisma.PrismaPromise<GetLeaveCalendarAggregateType<T>>

    /**
     * Group by LeaveCalendar.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeaveCalendarGroupByArgs} args - Group by arguments.
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
      T extends LeaveCalendarGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: LeaveCalendarGroupByArgs['orderBy'] }
        : { orderBy?: LeaveCalendarGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, LeaveCalendarGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLeaveCalendarGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the LeaveCalendar model
   */
  readonly fields: LeaveCalendarFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for LeaveCalendar.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__LeaveCalendarClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the LeaveCalendar model
   */
  interface LeaveCalendarFieldRefs {
    readonly id: FieldRef<"LeaveCalendar", 'String'>
    readonly date: FieldRef<"LeaveCalendar", 'DateTime'>
    readonly is_holiday: FieldRef<"LeaveCalendar", 'Boolean'>
    readonly holiday_name: FieldRef<"LeaveCalendar", 'String'>
    readonly holiday_name_th: FieldRef<"LeaveCalendar", 'String'>
    readonly created_at: FieldRef<"LeaveCalendar", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * LeaveCalendar findUnique
   */
  export type LeaveCalendarFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeaveCalendar
     */
    select?: LeaveCalendarSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LeaveCalendar
     */
    omit?: LeaveCalendarOmit<ExtArgs> | null
    /**
     * Filter, which LeaveCalendar to fetch.
     */
    where: LeaveCalendarWhereUniqueInput
  }

  /**
   * LeaveCalendar findUniqueOrThrow
   */
  export type LeaveCalendarFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeaveCalendar
     */
    select?: LeaveCalendarSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LeaveCalendar
     */
    omit?: LeaveCalendarOmit<ExtArgs> | null
    /**
     * Filter, which LeaveCalendar to fetch.
     */
    where: LeaveCalendarWhereUniqueInput
  }

  /**
   * LeaveCalendar findFirst
   */
  export type LeaveCalendarFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeaveCalendar
     */
    select?: LeaveCalendarSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LeaveCalendar
     */
    omit?: LeaveCalendarOmit<ExtArgs> | null
    /**
     * Filter, which LeaveCalendar to fetch.
     */
    where?: LeaveCalendarWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LeaveCalendars to fetch.
     */
    orderBy?: LeaveCalendarOrderByWithRelationInput | LeaveCalendarOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LeaveCalendars.
     */
    cursor?: LeaveCalendarWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LeaveCalendars from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LeaveCalendars.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LeaveCalendars.
     */
    distinct?: LeaveCalendarScalarFieldEnum | LeaveCalendarScalarFieldEnum[]
  }

  /**
   * LeaveCalendar findFirstOrThrow
   */
  export type LeaveCalendarFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeaveCalendar
     */
    select?: LeaveCalendarSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LeaveCalendar
     */
    omit?: LeaveCalendarOmit<ExtArgs> | null
    /**
     * Filter, which LeaveCalendar to fetch.
     */
    where?: LeaveCalendarWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LeaveCalendars to fetch.
     */
    orderBy?: LeaveCalendarOrderByWithRelationInput | LeaveCalendarOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LeaveCalendars.
     */
    cursor?: LeaveCalendarWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LeaveCalendars from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LeaveCalendars.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LeaveCalendars.
     */
    distinct?: LeaveCalendarScalarFieldEnum | LeaveCalendarScalarFieldEnum[]
  }

  /**
   * LeaveCalendar findMany
   */
  export type LeaveCalendarFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeaveCalendar
     */
    select?: LeaveCalendarSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LeaveCalendar
     */
    omit?: LeaveCalendarOmit<ExtArgs> | null
    /**
     * Filter, which LeaveCalendars to fetch.
     */
    where?: LeaveCalendarWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LeaveCalendars to fetch.
     */
    orderBy?: LeaveCalendarOrderByWithRelationInput | LeaveCalendarOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing LeaveCalendars.
     */
    cursor?: LeaveCalendarWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LeaveCalendars from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LeaveCalendars.
     */
    skip?: number
    distinct?: LeaveCalendarScalarFieldEnum | LeaveCalendarScalarFieldEnum[]
  }

  /**
   * LeaveCalendar create
   */
  export type LeaveCalendarCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeaveCalendar
     */
    select?: LeaveCalendarSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LeaveCalendar
     */
    omit?: LeaveCalendarOmit<ExtArgs> | null
    /**
     * The data needed to create a LeaveCalendar.
     */
    data: XOR<LeaveCalendarCreateInput, LeaveCalendarUncheckedCreateInput>
  }

  /**
   * LeaveCalendar createMany
   */
  export type LeaveCalendarCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many LeaveCalendars.
     */
    data: LeaveCalendarCreateManyInput | LeaveCalendarCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * LeaveCalendar createManyAndReturn
   */
  export type LeaveCalendarCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeaveCalendar
     */
    select?: LeaveCalendarSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the LeaveCalendar
     */
    omit?: LeaveCalendarOmit<ExtArgs> | null
    /**
     * The data used to create many LeaveCalendars.
     */
    data: LeaveCalendarCreateManyInput | LeaveCalendarCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * LeaveCalendar update
   */
  export type LeaveCalendarUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeaveCalendar
     */
    select?: LeaveCalendarSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LeaveCalendar
     */
    omit?: LeaveCalendarOmit<ExtArgs> | null
    /**
     * The data needed to update a LeaveCalendar.
     */
    data: XOR<LeaveCalendarUpdateInput, LeaveCalendarUncheckedUpdateInput>
    /**
     * Choose, which LeaveCalendar to update.
     */
    where: LeaveCalendarWhereUniqueInput
  }

  /**
   * LeaveCalendar updateMany
   */
  export type LeaveCalendarUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update LeaveCalendars.
     */
    data: XOR<LeaveCalendarUpdateManyMutationInput, LeaveCalendarUncheckedUpdateManyInput>
    /**
     * Filter which LeaveCalendars to update
     */
    where?: LeaveCalendarWhereInput
    /**
     * Limit how many LeaveCalendars to update.
     */
    limit?: number
  }

  /**
   * LeaveCalendar updateManyAndReturn
   */
  export type LeaveCalendarUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeaveCalendar
     */
    select?: LeaveCalendarSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the LeaveCalendar
     */
    omit?: LeaveCalendarOmit<ExtArgs> | null
    /**
     * The data used to update LeaveCalendars.
     */
    data: XOR<LeaveCalendarUpdateManyMutationInput, LeaveCalendarUncheckedUpdateManyInput>
    /**
     * Filter which LeaveCalendars to update
     */
    where?: LeaveCalendarWhereInput
    /**
     * Limit how many LeaveCalendars to update.
     */
    limit?: number
  }

  /**
   * LeaveCalendar upsert
   */
  export type LeaveCalendarUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeaveCalendar
     */
    select?: LeaveCalendarSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LeaveCalendar
     */
    omit?: LeaveCalendarOmit<ExtArgs> | null
    /**
     * The filter to search for the LeaveCalendar to update in case it exists.
     */
    where: LeaveCalendarWhereUniqueInput
    /**
     * In case the LeaveCalendar found by the `where` argument doesn't exist, create a new LeaveCalendar with this data.
     */
    create: XOR<LeaveCalendarCreateInput, LeaveCalendarUncheckedCreateInput>
    /**
     * In case the LeaveCalendar was found with the provided `where` argument, update it with this data.
     */
    update: XOR<LeaveCalendarUpdateInput, LeaveCalendarUncheckedUpdateInput>
  }

  /**
   * LeaveCalendar delete
   */
  export type LeaveCalendarDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeaveCalendar
     */
    select?: LeaveCalendarSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LeaveCalendar
     */
    omit?: LeaveCalendarOmit<ExtArgs> | null
    /**
     * Filter which LeaveCalendar to delete.
     */
    where: LeaveCalendarWhereUniqueInput
  }

  /**
   * LeaveCalendar deleteMany
   */
  export type LeaveCalendarDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which LeaveCalendars to delete
     */
    where?: LeaveCalendarWhereInput
    /**
     * Limit how many LeaveCalendars to delete.
     */
    limit?: number
  }

  /**
   * LeaveCalendar without action
   */
  export type LeaveCalendarDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeaveCalendar
     */
    select?: LeaveCalendarSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LeaveCalendar
     */
    omit?: LeaveCalendarOmit<ExtArgs> | null
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
    employee_id: string | null
    entity_type: string | null
    entity_id: string | null
    action: string | null
    performed_by: string | null
    created_at: Date | null
  }

  export type AuditLogMaxAggregateOutputType = {
    id: string | null
    employee_id: string | null
    entity_type: string | null
    entity_id: string | null
    action: string | null
    performed_by: string | null
    created_at: Date | null
  }

  export type AuditLogCountAggregateOutputType = {
    id: number
    employee_id: number
    entity_type: number
    entity_id: number
    action: number
    performed_by: number
    changes: number
    created_at: number
    _all: number
  }


  export type AuditLogMinAggregateInputType = {
    id?: true
    employee_id?: true
    entity_type?: true
    entity_id?: true
    action?: true
    performed_by?: true
    created_at?: true
  }

  export type AuditLogMaxAggregateInputType = {
    id?: true
    employee_id?: true
    entity_type?: true
    entity_id?: true
    action?: true
    performed_by?: true
    created_at?: true
  }

  export type AuditLogCountAggregateInputType = {
    id?: true
    employee_id?: true
    entity_type?: true
    entity_id?: true
    action?: true
    performed_by?: true
    changes?: true
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
    employee_id: string
    entity_type: string
    entity_id: string
    action: string
    performed_by: string
    changes: JsonValue | null
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
    employee_id?: boolean
    entity_type?: boolean
    entity_id?: boolean
    action?: boolean
    performed_by?: boolean
    changes?: boolean
    created_at?: boolean
  }, ExtArgs["result"]["auditLog"]>

  export type AuditLogSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    employee_id?: boolean
    entity_type?: boolean
    entity_id?: boolean
    action?: boolean
    performed_by?: boolean
    changes?: boolean
    created_at?: boolean
  }, ExtArgs["result"]["auditLog"]>

  export type AuditLogSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    employee_id?: boolean
    entity_type?: boolean
    entity_id?: boolean
    action?: boolean
    performed_by?: boolean
    changes?: boolean
    created_at?: boolean
  }, ExtArgs["result"]["auditLog"]>

  export type AuditLogSelectScalar = {
    id?: boolean
    employee_id?: boolean
    entity_type?: boolean
    entity_id?: boolean
    action?: boolean
    performed_by?: boolean
    changes?: boolean
    created_at?: boolean
  }

  export type AuditLogOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "employee_id" | "entity_type" | "entity_id" | "action" | "performed_by" | "changes" | "created_at", ExtArgs["result"]["auditLog"]>

  export type $AuditLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AuditLog"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      employee_id: string
      entity_type: string
      entity_id: string
      action: string
      performed_by: string
      changes: Prisma.JsonValue | null
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
    readonly employee_id: FieldRef<"AuditLog", 'String'>
    readonly entity_type: FieldRef<"AuditLog", 'String'>
    readonly entity_id: FieldRef<"AuditLog", 'String'>
    readonly action: FieldRef<"AuditLog", 'String'>
    readonly performed_by: FieldRef<"AuditLog", 'String'>
    readonly changes: FieldRef<"AuditLog", 'Json'>
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


  export const LeaveTypeScalarFieldEnum: {
    id: 'id',
    code: 'code',
    name_en: 'name_en',
    name_th: 'name_th',
    max_days: 'max_days',
    requires_medical_cert: 'requires_medical_cert',
    medical_cert_days: 'medical_cert_days',
    applicable_gender: 'applicable_gender',
    max_per_career: 'max_per_career',
    is_active: 'is_active',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type LeaveTypeScalarFieldEnum = (typeof LeaveTypeScalarFieldEnum)[keyof typeof LeaveTypeScalarFieldEnum]


  export const LeaveBalanceScalarFieldEnum: {
    id: 'id',
    employee_id: 'employee_id',
    leave_type_id: 'leave_type_id',
    year: 'year',
    entitled: 'entitled',
    used: 'used',
    pending: 'pending',
    remaining: 'remaining',
    carry_over: 'carry_over',
    expiry_date: 'expiry_date',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type LeaveBalanceScalarFieldEnum = (typeof LeaveBalanceScalarFieldEnum)[keyof typeof LeaveBalanceScalarFieldEnum]


  export const LeaveRequestScalarFieldEnum: {
    id: 'id',
    employee_id: 'employee_id',
    leave_type_id: 'leave_type_id',
    start_date: 'start_date',
    end_date: 'end_date',
    days: 'days',
    half_day: 'half_day',
    reason: 'reason',
    status: 'status',
    substitute_id: 'substitute_id',
    attachments: 'attachments',
    approved_by: 'approved_by',
    approved_date: 'approved_date',
    rejection_reason: 'rejection_reason',
    submitted_at: 'submitted_at',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type LeaveRequestScalarFieldEnum = (typeof LeaveRequestScalarFieldEnum)[keyof typeof LeaveRequestScalarFieldEnum]


  export const LeaveCalendarScalarFieldEnum: {
    id: 'id',
    date: 'date',
    is_holiday: 'is_holiday',
    holiday_name: 'holiday_name',
    holiday_name_th: 'holiday_name_th',
    created_at: 'created_at'
  };

  export type LeaveCalendarScalarFieldEnum = (typeof LeaveCalendarScalarFieldEnum)[keyof typeof LeaveCalendarScalarFieldEnum]


  export const AuditLogScalarFieldEnum: {
    id: 'id',
    employee_id: 'employee_id',
    entity_type: 'entity_type',
    entity_id: 'entity_id',
    action: 'action',
    performed_by: 'performed_by',
    changes: 'changes',
    created_at: 'created_at'
  };

  export type AuditLogScalarFieldEnum = (typeof AuditLogScalarFieldEnum)[keyof typeof AuditLogScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


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


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


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
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    
  /**
   * Deep Input Types
   */


  export type LeaveTypeWhereInput = {
    AND?: LeaveTypeWhereInput | LeaveTypeWhereInput[]
    OR?: LeaveTypeWhereInput[]
    NOT?: LeaveTypeWhereInput | LeaveTypeWhereInput[]
    id?: StringFilter<"LeaveType"> | string
    code?: StringFilter<"LeaveType"> | string
    name_en?: StringFilter<"LeaveType"> | string
    name_th?: StringNullableFilter<"LeaveType"> | string | null
    max_days?: IntFilter<"LeaveType"> | number
    requires_medical_cert?: BoolFilter<"LeaveType"> | boolean
    medical_cert_days?: IntNullableFilter<"LeaveType"> | number | null
    applicable_gender?: StringNullableFilter<"LeaveType"> | string | null
    max_per_career?: IntNullableFilter<"LeaveType"> | number | null
    is_active?: BoolFilter<"LeaveType"> | boolean
    created_at?: DateTimeFilter<"LeaveType"> | Date | string
    updated_at?: DateTimeFilter<"LeaveType"> | Date | string
    balances?: LeaveBalanceListRelationFilter
    requests?: LeaveRequestListRelationFilter
  }

  export type LeaveTypeOrderByWithRelationInput = {
    id?: SortOrder
    code?: SortOrder
    name_en?: SortOrder
    name_th?: SortOrderInput | SortOrder
    max_days?: SortOrder
    requires_medical_cert?: SortOrder
    medical_cert_days?: SortOrderInput | SortOrder
    applicable_gender?: SortOrderInput | SortOrder
    max_per_career?: SortOrderInput | SortOrder
    is_active?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    balances?: LeaveBalanceOrderByRelationAggregateInput
    requests?: LeaveRequestOrderByRelationAggregateInput
  }

  export type LeaveTypeWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    code?: string
    AND?: LeaveTypeWhereInput | LeaveTypeWhereInput[]
    OR?: LeaveTypeWhereInput[]
    NOT?: LeaveTypeWhereInput | LeaveTypeWhereInput[]
    name_en?: StringFilter<"LeaveType"> | string
    name_th?: StringNullableFilter<"LeaveType"> | string | null
    max_days?: IntFilter<"LeaveType"> | number
    requires_medical_cert?: BoolFilter<"LeaveType"> | boolean
    medical_cert_days?: IntNullableFilter<"LeaveType"> | number | null
    applicable_gender?: StringNullableFilter<"LeaveType"> | string | null
    max_per_career?: IntNullableFilter<"LeaveType"> | number | null
    is_active?: BoolFilter<"LeaveType"> | boolean
    created_at?: DateTimeFilter<"LeaveType"> | Date | string
    updated_at?: DateTimeFilter<"LeaveType"> | Date | string
    balances?: LeaveBalanceListRelationFilter
    requests?: LeaveRequestListRelationFilter
  }, "id" | "code">

  export type LeaveTypeOrderByWithAggregationInput = {
    id?: SortOrder
    code?: SortOrder
    name_en?: SortOrder
    name_th?: SortOrderInput | SortOrder
    max_days?: SortOrder
    requires_medical_cert?: SortOrder
    medical_cert_days?: SortOrderInput | SortOrder
    applicable_gender?: SortOrderInput | SortOrder
    max_per_career?: SortOrderInput | SortOrder
    is_active?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: LeaveTypeCountOrderByAggregateInput
    _avg?: LeaveTypeAvgOrderByAggregateInput
    _max?: LeaveTypeMaxOrderByAggregateInput
    _min?: LeaveTypeMinOrderByAggregateInput
    _sum?: LeaveTypeSumOrderByAggregateInput
  }

  export type LeaveTypeScalarWhereWithAggregatesInput = {
    AND?: LeaveTypeScalarWhereWithAggregatesInput | LeaveTypeScalarWhereWithAggregatesInput[]
    OR?: LeaveTypeScalarWhereWithAggregatesInput[]
    NOT?: LeaveTypeScalarWhereWithAggregatesInput | LeaveTypeScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"LeaveType"> | string
    code?: StringWithAggregatesFilter<"LeaveType"> | string
    name_en?: StringWithAggregatesFilter<"LeaveType"> | string
    name_th?: StringNullableWithAggregatesFilter<"LeaveType"> | string | null
    max_days?: IntWithAggregatesFilter<"LeaveType"> | number
    requires_medical_cert?: BoolWithAggregatesFilter<"LeaveType"> | boolean
    medical_cert_days?: IntNullableWithAggregatesFilter<"LeaveType"> | number | null
    applicable_gender?: StringNullableWithAggregatesFilter<"LeaveType"> | string | null
    max_per_career?: IntNullableWithAggregatesFilter<"LeaveType"> | number | null
    is_active?: BoolWithAggregatesFilter<"LeaveType"> | boolean
    created_at?: DateTimeWithAggregatesFilter<"LeaveType"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"LeaveType"> | Date | string
  }

  export type LeaveBalanceWhereInput = {
    AND?: LeaveBalanceWhereInput | LeaveBalanceWhereInput[]
    OR?: LeaveBalanceWhereInput[]
    NOT?: LeaveBalanceWhereInput | LeaveBalanceWhereInput[]
    id?: StringFilter<"LeaveBalance"> | string
    employee_id?: StringFilter<"LeaveBalance"> | string
    leave_type_id?: StringFilter<"LeaveBalance"> | string
    year?: IntFilter<"LeaveBalance"> | number
    entitled?: IntFilter<"LeaveBalance"> | number
    used?: IntFilter<"LeaveBalance"> | number
    pending?: IntFilter<"LeaveBalance"> | number
    remaining?: IntFilter<"LeaveBalance"> | number
    carry_over?: IntFilter<"LeaveBalance"> | number
    expiry_date?: DateTimeNullableFilter<"LeaveBalance"> | Date | string | null
    created_at?: DateTimeFilter<"LeaveBalance"> | Date | string
    updated_at?: DateTimeFilter<"LeaveBalance"> | Date | string
    leave_type?: XOR<LeaveTypeScalarRelationFilter, LeaveTypeWhereInput>
  }

  export type LeaveBalanceOrderByWithRelationInput = {
    id?: SortOrder
    employee_id?: SortOrder
    leave_type_id?: SortOrder
    year?: SortOrder
    entitled?: SortOrder
    used?: SortOrder
    pending?: SortOrder
    remaining?: SortOrder
    carry_over?: SortOrder
    expiry_date?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    leave_type?: LeaveTypeOrderByWithRelationInput
  }

  export type LeaveBalanceWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    employee_id_leave_type_id_year?: LeaveBalanceEmployee_idLeave_type_idYearCompoundUniqueInput
    AND?: LeaveBalanceWhereInput | LeaveBalanceWhereInput[]
    OR?: LeaveBalanceWhereInput[]
    NOT?: LeaveBalanceWhereInput | LeaveBalanceWhereInput[]
    employee_id?: StringFilter<"LeaveBalance"> | string
    leave_type_id?: StringFilter<"LeaveBalance"> | string
    year?: IntFilter<"LeaveBalance"> | number
    entitled?: IntFilter<"LeaveBalance"> | number
    used?: IntFilter<"LeaveBalance"> | number
    pending?: IntFilter<"LeaveBalance"> | number
    remaining?: IntFilter<"LeaveBalance"> | number
    carry_over?: IntFilter<"LeaveBalance"> | number
    expiry_date?: DateTimeNullableFilter<"LeaveBalance"> | Date | string | null
    created_at?: DateTimeFilter<"LeaveBalance"> | Date | string
    updated_at?: DateTimeFilter<"LeaveBalance"> | Date | string
    leave_type?: XOR<LeaveTypeScalarRelationFilter, LeaveTypeWhereInput>
  }, "id" | "employee_id_leave_type_id_year">

  export type LeaveBalanceOrderByWithAggregationInput = {
    id?: SortOrder
    employee_id?: SortOrder
    leave_type_id?: SortOrder
    year?: SortOrder
    entitled?: SortOrder
    used?: SortOrder
    pending?: SortOrder
    remaining?: SortOrder
    carry_over?: SortOrder
    expiry_date?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: LeaveBalanceCountOrderByAggregateInput
    _avg?: LeaveBalanceAvgOrderByAggregateInput
    _max?: LeaveBalanceMaxOrderByAggregateInput
    _min?: LeaveBalanceMinOrderByAggregateInput
    _sum?: LeaveBalanceSumOrderByAggregateInput
  }

  export type LeaveBalanceScalarWhereWithAggregatesInput = {
    AND?: LeaveBalanceScalarWhereWithAggregatesInput | LeaveBalanceScalarWhereWithAggregatesInput[]
    OR?: LeaveBalanceScalarWhereWithAggregatesInput[]
    NOT?: LeaveBalanceScalarWhereWithAggregatesInput | LeaveBalanceScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"LeaveBalance"> | string
    employee_id?: StringWithAggregatesFilter<"LeaveBalance"> | string
    leave_type_id?: StringWithAggregatesFilter<"LeaveBalance"> | string
    year?: IntWithAggregatesFilter<"LeaveBalance"> | number
    entitled?: IntWithAggregatesFilter<"LeaveBalance"> | number
    used?: IntWithAggregatesFilter<"LeaveBalance"> | number
    pending?: IntWithAggregatesFilter<"LeaveBalance"> | number
    remaining?: IntWithAggregatesFilter<"LeaveBalance"> | number
    carry_over?: IntWithAggregatesFilter<"LeaveBalance"> | number
    expiry_date?: DateTimeNullableWithAggregatesFilter<"LeaveBalance"> | Date | string | null
    created_at?: DateTimeWithAggregatesFilter<"LeaveBalance"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"LeaveBalance"> | Date | string
  }

  export type LeaveRequestWhereInput = {
    AND?: LeaveRequestWhereInput | LeaveRequestWhereInput[]
    OR?: LeaveRequestWhereInput[]
    NOT?: LeaveRequestWhereInput | LeaveRequestWhereInput[]
    id?: StringFilter<"LeaveRequest"> | string
    employee_id?: StringFilter<"LeaveRequest"> | string
    leave_type_id?: StringFilter<"LeaveRequest"> | string
    start_date?: DateTimeFilter<"LeaveRequest"> | Date | string
    end_date?: DateTimeFilter<"LeaveRequest"> | Date | string
    days?: FloatFilter<"LeaveRequest"> | number
    half_day?: StringNullableFilter<"LeaveRequest"> | string | null
    reason?: StringNullableFilter<"LeaveRequest"> | string | null
    status?: StringFilter<"LeaveRequest"> | string
    substitute_id?: StringNullableFilter<"LeaveRequest"> | string | null
    attachments?: JsonNullableFilter<"LeaveRequest">
    approved_by?: StringNullableFilter<"LeaveRequest"> | string | null
    approved_date?: DateTimeNullableFilter<"LeaveRequest"> | Date | string | null
    rejection_reason?: StringNullableFilter<"LeaveRequest"> | string | null
    submitted_at?: DateTimeFilter<"LeaveRequest"> | Date | string
    created_at?: DateTimeFilter<"LeaveRequest"> | Date | string
    updated_at?: DateTimeFilter<"LeaveRequest"> | Date | string
    leave_type?: XOR<LeaveTypeScalarRelationFilter, LeaveTypeWhereInput>
  }

  export type LeaveRequestOrderByWithRelationInput = {
    id?: SortOrder
    employee_id?: SortOrder
    leave_type_id?: SortOrder
    start_date?: SortOrder
    end_date?: SortOrder
    days?: SortOrder
    half_day?: SortOrderInput | SortOrder
    reason?: SortOrderInput | SortOrder
    status?: SortOrder
    substitute_id?: SortOrderInput | SortOrder
    attachments?: SortOrderInput | SortOrder
    approved_by?: SortOrderInput | SortOrder
    approved_date?: SortOrderInput | SortOrder
    rejection_reason?: SortOrderInput | SortOrder
    submitted_at?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    leave_type?: LeaveTypeOrderByWithRelationInput
  }

  export type LeaveRequestWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: LeaveRequestWhereInput | LeaveRequestWhereInput[]
    OR?: LeaveRequestWhereInput[]
    NOT?: LeaveRequestWhereInput | LeaveRequestWhereInput[]
    employee_id?: StringFilter<"LeaveRequest"> | string
    leave_type_id?: StringFilter<"LeaveRequest"> | string
    start_date?: DateTimeFilter<"LeaveRequest"> | Date | string
    end_date?: DateTimeFilter<"LeaveRequest"> | Date | string
    days?: FloatFilter<"LeaveRequest"> | number
    half_day?: StringNullableFilter<"LeaveRequest"> | string | null
    reason?: StringNullableFilter<"LeaveRequest"> | string | null
    status?: StringFilter<"LeaveRequest"> | string
    substitute_id?: StringNullableFilter<"LeaveRequest"> | string | null
    attachments?: JsonNullableFilter<"LeaveRequest">
    approved_by?: StringNullableFilter<"LeaveRequest"> | string | null
    approved_date?: DateTimeNullableFilter<"LeaveRequest"> | Date | string | null
    rejection_reason?: StringNullableFilter<"LeaveRequest"> | string | null
    submitted_at?: DateTimeFilter<"LeaveRequest"> | Date | string
    created_at?: DateTimeFilter<"LeaveRequest"> | Date | string
    updated_at?: DateTimeFilter<"LeaveRequest"> | Date | string
    leave_type?: XOR<LeaveTypeScalarRelationFilter, LeaveTypeWhereInput>
  }, "id">

  export type LeaveRequestOrderByWithAggregationInput = {
    id?: SortOrder
    employee_id?: SortOrder
    leave_type_id?: SortOrder
    start_date?: SortOrder
    end_date?: SortOrder
    days?: SortOrder
    half_day?: SortOrderInput | SortOrder
    reason?: SortOrderInput | SortOrder
    status?: SortOrder
    substitute_id?: SortOrderInput | SortOrder
    attachments?: SortOrderInput | SortOrder
    approved_by?: SortOrderInput | SortOrder
    approved_date?: SortOrderInput | SortOrder
    rejection_reason?: SortOrderInput | SortOrder
    submitted_at?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: LeaveRequestCountOrderByAggregateInput
    _avg?: LeaveRequestAvgOrderByAggregateInput
    _max?: LeaveRequestMaxOrderByAggregateInput
    _min?: LeaveRequestMinOrderByAggregateInput
    _sum?: LeaveRequestSumOrderByAggregateInput
  }

  export type LeaveRequestScalarWhereWithAggregatesInput = {
    AND?: LeaveRequestScalarWhereWithAggregatesInput | LeaveRequestScalarWhereWithAggregatesInput[]
    OR?: LeaveRequestScalarWhereWithAggregatesInput[]
    NOT?: LeaveRequestScalarWhereWithAggregatesInput | LeaveRequestScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"LeaveRequest"> | string
    employee_id?: StringWithAggregatesFilter<"LeaveRequest"> | string
    leave_type_id?: StringWithAggregatesFilter<"LeaveRequest"> | string
    start_date?: DateTimeWithAggregatesFilter<"LeaveRequest"> | Date | string
    end_date?: DateTimeWithAggregatesFilter<"LeaveRequest"> | Date | string
    days?: FloatWithAggregatesFilter<"LeaveRequest"> | number
    half_day?: StringNullableWithAggregatesFilter<"LeaveRequest"> | string | null
    reason?: StringNullableWithAggregatesFilter<"LeaveRequest"> | string | null
    status?: StringWithAggregatesFilter<"LeaveRequest"> | string
    substitute_id?: StringNullableWithAggregatesFilter<"LeaveRequest"> | string | null
    attachments?: JsonNullableWithAggregatesFilter<"LeaveRequest">
    approved_by?: StringNullableWithAggregatesFilter<"LeaveRequest"> | string | null
    approved_date?: DateTimeNullableWithAggregatesFilter<"LeaveRequest"> | Date | string | null
    rejection_reason?: StringNullableWithAggregatesFilter<"LeaveRequest"> | string | null
    submitted_at?: DateTimeWithAggregatesFilter<"LeaveRequest"> | Date | string
    created_at?: DateTimeWithAggregatesFilter<"LeaveRequest"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"LeaveRequest"> | Date | string
  }

  export type LeaveCalendarWhereInput = {
    AND?: LeaveCalendarWhereInput | LeaveCalendarWhereInput[]
    OR?: LeaveCalendarWhereInput[]
    NOT?: LeaveCalendarWhereInput | LeaveCalendarWhereInput[]
    id?: StringFilter<"LeaveCalendar"> | string
    date?: DateTimeFilter<"LeaveCalendar"> | Date | string
    is_holiday?: BoolFilter<"LeaveCalendar"> | boolean
    holiday_name?: StringNullableFilter<"LeaveCalendar"> | string | null
    holiday_name_th?: StringNullableFilter<"LeaveCalendar"> | string | null
    created_at?: DateTimeFilter<"LeaveCalendar"> | Date | string
  }

  export type LeaveCalendarOrderByWithRelationInput = {
    id?: SortOrder
    date?: SortOrder
    is_holiday?: SortOrder
    holiday_name?: SortOrderInput | SortOrder
    holiday_name_th?: SortOrderInput | SortOrder
    created_at?: SortOrder
  }

  export type LeaveCalendarWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    date?: Date | string
    AND?: LeaveCalendarWhereInput | LeaveCalendarWhereInput[]
    OR?: LeaveCalendarWhereInput[]
    NOT?: LeaveCalendarWhereInput | LeaveCalendarWhereInput[]
    is_holiday?: BoolFilter<"LeaveCalendar"> | boolean
    holiday_name?: StringNullableFilter<"LeaveCalendar"> | string | null
    holiday_name_th?: StringNullableFilter<"LeaveCalendar"> | string | null
    created_at?: DateTimeFilter<"LeaveCalendar"> | Date | string
  }, "id" | "date">

  export type LeaveCalendarOrderByWithAggregationInput = {
    id?: SortOrder
    date?: SortOrder
    is_holiday?: SortOrder
    holiday_name?: SortOrderInput | SortOrder
    holiday_name_th?: SortOrderInput | SortOrder
    created_at?: SortOrder
    _count?: LeaveCalendarCountOrderByAggregateInput
    _max?: LeaveCalendarMaxOrderByAggregateInput
    _min?: LeaveCalendarMinOrderByAggregateInput
  }

  export type LeaveCalendarScalarWhereWithAggregatesInput = {
    AND?: LeaveCalendarScalarWhereWithAggregatesInput | LeaveCalendarScalarWhereWithAggregatesInput[]
    OR?: LeaveCalendarScalarWhereWithAggregatesInput[]
    NOT?: LeaveCalendarScalarWhereWithAggregatesInput | LeaveCalendarScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"LeaveCalendar"> | string
    date?: DateTimeWithAggregatesFilter<"LeaveCalendar"> | Date | string
    is_holiday?: BoolWithAggregatesFilter<"LeaveCalendar"> | boolean
    holiday_name?: StringNullableWithAggregatesFilter<"LeaveCalendar"> | string | null
    holiday_name_th?: StringNullableWithAggregatesFilter<"LeaveCalendar"> | string | null
    created_at?: DateTimeWithAggregatesFilter<"LeaveCalendar"> | Date | string
  }

  export type AuditLogWhereInput = {
    AND?: AuditLogWhereInput | AuditLogWhereInput[]
    OR?: AuditLogWhereInput[]
    NOT?: AuditLogWhereInput | AuditLogWhereInput[]
    id?: StringFilter<"AuditLog"> | string
    employee_id?: StringFilter<"AuditLog"> | string
    entity_type?: StringFilter<"AuditLog"> | string
    entity_id?: StringFilter<"AuditLog"> | string
    action?: StringFilter<"AuditLog"> | string
    performed_by?: StringFilter<"AuditLog"> | string
    changes?: JsonNullableFilter<"AuditLog">
    created_at?: DateTimeFilter<"AuditLog"> | Date | string
  }

  export type AuditLogOrderByWithRelationInput = {
    id?: SortOrder
    employee_id?: SortOrder
    entity_type?: SortOrder
    entity_id?: SortOrder
    action?: SortOrder
    performed_by?: SortOrder
    changes?: SortOrderInput | SortOrder
    created_at?: SortOrder
  }

  export type AuditLogWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AuditLogWhereInput | AuditLogWhereInput[]
    OR?: AuditLogWhereInput[]
    NOT?: AuditLogWhereInput | AuditLogWhereInput[]
    employee_id?: StringFilter<"AuditLog"> | string
    entity_type?: StringFilter<"AuditLog"> | string
    entity_id?: StringFilter<"AuditLog"> | string
    action?: StringFilter<"AuditLog"> | string
    performed_by?: StringFilter<"AuditLog"> | string
    changes?: JsonNullableFilter<"AuditLog">
    created_at?: DateTimeFilter<"AuditLog"> | Date | string
  }, "id">

  export type AuditLogOrderByWithAggregationInput = {
    id?: SortOrder
    employee_id?: SortOrder
    entity_type?: SortOrder
    entity_id?: SortOrder
    action?: SortOrder
    performed_by?: SortOrder
    changes?: SortOrderInput | SortOrder
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
    employee_id?: StringWithAggregatesFilter<"AuditLog"> | string
    entity_type?: StringWithAggregatesFilter<"AuditLog"> | string
    entity_id?: StringWithAggregatesFilter<"AuditLog"> | string
    action?: StringWithAggregatesFilter<"AuditLog"> | string
    performed_by?: StringWithAggregatesFilter<"AuditLog"> | string
    changes?: JsonNullableWithAggregatesFilter<"AuditLog">
    created_at?: DateTimeWithAggregatesFilter<"AuditLog"> | Date | string
  }

  export type LeaveTypeCreateInput = {
    id?: string
    code: string
    name_en: string
    name_th?: string | null
    max_days: number
    requires_medical_cert?: boolean
    medical_cert_days?: number | null
    applicable_gender?: string | null
    max_per_career?: number | null
    is_active?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    balances?: LeaveBalanceCreateNestedManyWithoutLeave_typeInput
    requests?: LeaveRequestCreateNestedManyWithoutLeave_typeInput
  }

  export type LeaveTypeUncheckedCreateInput = {
    id?: string
    code: string
    name_en: string
    name_th?: string | null
    max_days: number
    requires_medical_cert?: boolean
    medical_cert_days?: number | null
    applicable_gender?: string | null
    max_per_career?: number | null
    is_active?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    balances?: LeaveBalanceUncheckedCreateNestedManyWithoutLeave_typeInput
    requests?: LeaveRequestUncheckedCreateNestedManyWithoutLeave_typeInput
  }

  export type LeaveTypeUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    name_en?: StringFieldUpdateOperationsInput | string
    name_th?: NullableStringFieldUpdateOperationsInput | string | null
    max_days?: IntFieldUpdateOperationsInput | number
    requires_medical_cert?: BoolFieldUpdateOperationsInput | boolean
    medical_cert_days?: NullableIntFieldUpdateOperationsInput | number | null
    applicable_gender?: NullableStringFieldUpdateOperationsInput | string | null
    max_per_career?: NullableIntFieldUpdateOperationsInput | number | null
    is_active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    balances?: LeaveBalanceUpdateManyWithoutLeave_typeNestedInput
    requests?: LeaveRequestUpdateManyWithoutLeave_typeNestedInput
  }

  export type LeaveTypeUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    name_en?: StringFieldUpdateOperationsInput | string
    name_th?: NullableStringFieldUpdateOperationsInput | string | null
    max_days?: IntFieldUpdateOperationsInput | number
    requires_medical_cert?: BoolFieldUpdateOperationsInput | boolean
    medical_cert_days?: NullableIntFieldUpdateOperationsInput | number | null
    applicable_gender?: NullableStringFieldUpdateOperationsInput | string | null
    max_per_career?: NullableIntFieldUpdateOperationsInput | number | null
    is_active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    balances?: LeaveBalanceUncheckedUpdateManyWithoutLeave_typeNestedInput
    requests?: LeaveRequestUncheckedUpdateManyWithoutLeave_typeNestedInput
  }

  export type LeaveTypeCreateManyInput = {
    id?: string
    code: string
    name_en: string
    name_th?: string | null
    max_days: number
    requires_medical_cert?: boolean
    medical_cert_days?: number | null
    applicable_gender?: string | null
    max_per_career?: number | null
    is_active?: boolean
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type LeaveTypeUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    name_en?: StringFieldUpdateOperationsInput | string
    name_th?: NullableStringFieldUpdateOperationsInput | string | null
    max_days?: IntFieldUpdateOperationsInput | number
    requires_medical_cert?: BoolFieldUpdateOperationsInput | boolean
    medical_cert_days?: NullableIntFieldUpdateOperationsInput | number | null
    applicable_gender?: NullableStringFieldUpdateOperationsInput | string | null
    max_per_career?: NullableIntFieldUpdateOperationsInput | number | null
    is_active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LeaveTypeUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    name_en?: StringFieldUpdateOperationsInput | string
    name_th?: NullableStringFieldUpdateOperationsInput | string | null
    max_days?: IntFieldUpdateOperationsInput | number
    requires_medical_cert?: BoolFieldUpdateOperationsInput | boolean
    medical_cert_days?: NullableIntFieldUpdateOperationsInput | number | null
    applicable_gender?: NullableStringFieldUpdateOperationsInput | string | null
    max_per_career?: NullableIntFieldUpdateOperationsInput | number | null
    is_active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LeaveBalanceCreateInput = {
    id?: string
    employee_id: string
    year: number
    entitled?: number
    used?: number
    pending?: number
    remaining?: number
    carry_over?: number
    expiry_date?: Date | string | null
    created_at?: Date | string
    updated_at?: Date | string
    leave_type: LeaveTypeCreateNestedOneWithoutBalancesInput
  }

  export type LeaveBalanceUncheckedCreateInput = {
    id?: string
    employee_id: string
    leave_type_id: string
    year: number
    entitled?: number
    used?: number
    pending?: number
    remaining?: number
    carry_over?: number
    expiry_date?: Date | string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type LeaveBalanceUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    employee_id?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    entitled?: IntFieldUpdateOperationsInput | number
    used?: IntFieldUpdateOperationsInput | number
    pending?: IntFieldUpdateOperationsInput | number
    remaining?: IntFieldUpdateOperationsInput | number
    carry_over?: IntFieldUpdateOperationsInput | number
    expiry_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    leave_type?: LeaveTypeUpdateOneRequiredWithoutBalancesNestedInput
  }

  export type LeaveBalanceUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    employee_id?: StringFieldUpdateOperationsInput | string
    leave_type_id?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    entitled?: IntFieldUpdateOperationsInput | number
    used?: IntFieldUpdateOperationsInput | number
    pending?: IntFieldUpdateOperationsInput | number
    remaining?: IntFieldUpdateOperationsInput | number
    carry_over?: IntFieldUpdateOperationsInput | number
    expiry_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LeaveBalanceCreateManyInput = {
    id?: string
    employee_id: string
    leave_type_id: string
    year: number
    entitled?: number
    used?: number
    pending?: number
    remaining?: number
    carry_over?: number
    expiry_date?: Date | string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type LeaveBalanceUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    employee_id?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    entitled?: IntFieldUpdateOperationsInput | number
    used?: IntFieldUpdateOperationsInput | number
    pending?: IntFieldUpdateOperationsInput | number
    remaining?: IntFieldUpdateOperationsInput | number
    carry_over?: IntFieldUpdateOperationsInput | number
    expiry_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LeaveBalanceUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    employee_id?: StringFieldUpdateOperationsInput | string
    leave_type_id?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    entitled?: IntFieldUpdateOperationsInput | number
    used?: IntFieldUpdateOperationsInput | number
    pending?: IntFieldUpdateOperationsInput | number
    remaining?: IntFieldUpdateOperationsInput | number
    carry_over?: IntFieldUpdateOperationsInput | number
    expiry_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LeaveRequestCreateInput = {
    id?: string
    employee_id: string
    start_date: Date | string
    end_date: Date | string
    days: number
    half_day?: string | null
    reason?: string | null
    status?: string
    substitute_id?: string | null
    attachments?: NullableJsonNullValueInput | InputJsonValue
    approved_by?: string | null
    approved_date?: Date | string | null
    rejection_reason?: string | null
    submitted_at?: Date | string
    created_at?: Date | string
    updated_at?: Date | string
    leave_type: LeaveTypeCreateNestedOneWithoutRequestsInput
  }

  export type LeaveRequestUncheckedCreateInput = {
    id?: string
    employee_id: string
    leave_type_id: string
    start_date: Date | string
    end_date: Date | string
    days: number
    half_day?: string | null
    reason?: string | null
    status?: string
    substitute_id?: string | null
    attachments?: NullableJsonNullValueInput | InputJsonValue
    approved_by?: string | null
    approved_date?: Date | string | null
    rejection_reason?: string | null
    submitted_at?: Date | string
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type LeaveRequestUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    employee_id?: StringFieldUpdateOperationsInput | string
    start_date?: DateTimeFieldUpdateOperationsInput | Date | string
    end_date?: DateTimeFieldUpdateOperationsInput | Date | string
    days?: FloatFieldUpdateOperationsInput | number
    half_day?: NullableStringFieldUpdateOperationsInput | string | null
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    substitute_id?: NullableStringFieldUpdateOperationsInput | string | null
    attachments?: NullableJsonNullValueInput | InputJsonValue
    approved_by?: NullableStringFieldUpdateOperationsInput | string | null
    approved_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rejection_reason?: NullableStringFieldUpdateOperationsInput | string | null
    submitted_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    leave_type?: LeaveTypeUpdateOneRequiredWithoutRequestsNestedInput
  }

  export type LeaveRequestUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    employee_id?: StringFieldUpdateOperationsInput | string
    leave_type_id?: StringFieldUpdateOperationsInput | string
    start_date?: DateTimeFieldUpdateOperationsInput | Date | string
    end_date?: DateTimeFieldUpdateOperationsInput | Date | string
    days?: FloatFieldUpdateOperationsInput | number
    half_day?: NullableStringFieldUpdateOperationsInput | string | null
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    substitute_id?: NullableStringFieldUpdateOperationsInput | string | null
    attachments?: NullableJsonNullValueInput | InputJsonValue
    approved_by?: NullableStringFieldUpdateOperationsInput | string | null
    approved_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rejection_reason?: NullableStringFieldUpdateOperationsInput | string | null
    submitted_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LeaveRequestCreateManyInput = {
    id?: string
    employee_id: string
    leave_type_id: string
    start_date: Date | string
    end_date: Date | string
    days: number
    half_day?: string | null
    reason?: string | null
    status?: string
    substitute_id?: string | null
    attachments?: NullableJsonNullValueInput | InputJsonValue
    approved_by?: string | null
    approved_date?: Date | string | null
    rejection_reason?: string | null
    submitted_at?: Date | string
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type LeaveRequestUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    employee_id?: StringFieldUpdateOperationsInput | string
    start_date?: DateTimeFieldUpdateOperationsInput | Date | string
    end_date?: DateTimeFieldUpdateOperationsInput | Date | string
    days?: FloatFieldUpdateOperationsInput | number
    half_day?: NullableStringFieldUpdateOperationsInput | string | null
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    substitute_id?: NullableStringFieldUpdateOperationsInput | string | null
    attachments?: NullableJsonNullValueInput | InputJsonValue
    approved_by?: NullableStringFieldUpdateOperationsInput | string | null
    approved_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rejection_reason?: NullableStringFieldUpdateOperationsInput | string | null
    submitted_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LeaveRequestUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    employee_id?: StringFieldUpdateOperationsInput | string
    leave_type_id?: StringFieldUpdateOperationsInput | string
    start_date?: DateTimeFieldUpdateOperationsInput | Date | string
    end_date?: DateTimeFieldUpdateOperationsInput | Date | string
    days?: FloatFieldUpdateOperationsInput | number
    half_day?: NullableStringFieldUpdateOperationsInput | string | null
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    substitute_id?: NullableStringFieldUpdateOperationsInput | string | null
    attachments?: NullableJsonNullValueInput | InputJsonValue
    approved_by?: NullableStringFieldUpdateOperationsInput | string | null
    approved_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rejection_reason?: NullableStringFieldUpdateOperationsInput | string | null
    submitted_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LeaveCalendarCreateInput = {
    id?: string
    date: Date | string
    is_holiday?: boolean
    holiday_name?: string | null
    holiday_name_th?: string | null
    created_at?: Date | string
  }

  export type LeaveCalendarUncheckedCreateInput = {
    id?: string
    date: Date | string
    is_holiday?: boolean
    holiday_name?: string | null
    holiday_name_th?: string | null
    created_at?: Date | string
  }

  export type LeaveCalendarUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    is_holiday?: BoolFieldUpdateOperationsInput | boolean
    holiday_name?: NullableStringFieldUpdateOperationsInput | string | null
    holiday_name_th?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LeaveCalendarUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    is_holiday?: BoolFieldUpdateOperationsInput | boolean
    holiday_name?: NullableStringFieldUpdateOperationsInput | string | null
    holiday_name_th?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LeaveCalendarCreateManyInput = {
    id?: string
    date: Date | string
    is_holiday?: boolean
    holiday_name?: string | null
    holiday_name_th?: string | null
    created_at?: Date | string
  }

  export type LeaveCalendarUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    is_holiday?: BoolFieldUpdateOperationsInput | boolean
    holiday_name?: NullableStringFieldUpdateOperationsInput | string | null
    holiday_name_th?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LeaveCalendarUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    is_holiday?: BoolFieldUpdateOperationsInput | boolean
    holiday_name?: NullableStringFieldUpdateOperationsInput | string | null
    holiday_name_th?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogCreateInput = {
    id?: string
    employee_id: string
    entity_type: string
    entity_id: string
    action: string
    performed_by: string
    changes?: NullableJsonNullValueInput | InputJsonValue
    created_at?: Date | string
  }

  export type AuditLogUncheckedCreateInput = {
    id?: string
    employee_id: string
    entity_type: string
    entity_id: string
    action: string
    performed_by: string
    changes?: NullableJsonNullValueInput | InputJsonValue
    created_at?: Date | string
  }

  export type AuditLogUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    employee_id?: StringFieldUpdateOperationsInput | string
    entity_type?: StringFieldUpdateOperationsInput | string
    entity_id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    performed_by?: StringFieldUpdateOperationsInput | string
    changes?: NullableJsonNullValueInput | InputJsonValue
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    employee_id?: StringFieldUpdateOperationsInput | string
    entity_type?: StringFieldUpdateOperationsInput | string
    entity_id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    performed_by?: StringFieldUpdateOperationsInput | string
    changes?: NullableJsonNullValueInput | InputJsonValue
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogCreateManyInput = {
    id?: string
    employee_id: string
    entity_type: string
    entity_id: string
    action: string
    performed_by: string
    changes?: NullableJsonNullValueInput | InputJsonValue
    created_at?: Date | string
  }

  export type AuditLogUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    employee_id?: StringFieldUpdateOperationsInput | string
    entity_type?: StringFieldUpdateOperationsInput | string
    entity_id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    performed_by?: StringFieldUpdateOperationsInput | string
    changes?: NullableJsonNullValueInput | InputJsonValue
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    employee_id?: StringFieldUpdateOperationsInput | string
    entity_type?: StringFieldUpdateOperationsInput | string
    entity_id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    performed_by?: StringFieldUpdateOperationsInput | string
    changes?: NullableJsonNullValueInput | InputJsonValue
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

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
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

  export type LeaveBalanceListRelationFilter = {
    every?: LeaveBalanceWhereInput
    some?: LeaveBalanceWhereInput
    none?: LeaveBalanceWhereInput
  }

  export type LeaveRequestListRelationFilter = {
    every?: LeaveRequestWhereInput
    some?: LeaveRequestWhereInput
    none?: LeaveRequestWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type LeaveBalanceOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type LeaveRequestOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type LeaveTypeCountOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    name_en?: SortOrder
    name_th?: SortOrder
    max_days?: SortOrder
    requires_medical_cert?: SortOrder
    medical_cert_days?: SortOrder
    applicable_gender?: SortOrder
    max_per_career?: SortOrder
    is_active?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type LeaveTypeAvgOrderByAggregateInput = {
    max_days?: SortOrder
    medical_cert_days?: SortOrder
    max_per_career?: SortOrder
  }

  export type LeaveTypeMaxOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    name_en?: SortOrder
    name_th?: SortOrder
    max_days?: SortOrder
    requires_medical_cert?: SortOrder
    medical_cert_days?: SortOrder
    applicable_gender?: SortOrder
    max_per_career?: SortOrder
    is_active?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type LeaveTypeMinOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    name_en?: SortOrder
    name_th?: SortOrder
    max_days?: SortOrder
    requires_medical_cert?: SortOrder
    medical_cert_days?: SortOrder
    applicable_gender?: SortOrder
    max_per_career?: SortOrder
    is_active?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type LeaveTypeSumOrderByAggregateInput = {
    max_days?: SortOrder
    medical_cert_days?: SortOrder
    max_per_career?: SortOrder
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

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
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

  export type LeaveTypeScalarRelationFilter = {
    is?: LeaveTypeWhereInput
    isNot?: LeaveTypeWhereInput
  }

  export type LeaveBalanceEmployee_idLeave_type_idYearCompoundUniqueInput = {
    employee_id: string
    leave_type_id: string
    year: number
  }

  export type LeaveBalanceCountOrderByAggregateInput = {
    id?: SortOrder
    employee_id?: SortOrder
    leave_type_id?: SortOrder
    year?: SortOrder
    entitled?: SortOrder
    used?: SortOrder
    pending?: SortOrder
    remaining?: SortOrder
    carry_over?: SortOrder
    expiry_date?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type LeaveBalanceAvgOrderByAggregateInput = {
    year?: SortOrder
    entitled?: SortOrder
    used?: SortOrder
    pending?: SortOrder
    remaining?: SortOrder
    carry_over?: SortOrder
  }

  export type LeaveBalanceMaxOrderByAggregateInput = {
    id?: SortOrder
    employee_id?: SortOrder
    leave_type_id?: SortOrder
    year?: SortOrder
    entitled?: SortOrder
    used?: SortOrder
    pending?: SortOrder
    remaining?: SortOrder
    carry_over?: SortOrder
    expiry_date?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type LeaveBalanceMinOrderByAggregateInput = {
    id?: SortOrder
    employee_id?: SortOrder
    leave_type_id?: SortOrder
    year?: SortOrder
    entitled?: SortOrder
    used?: SortOrder
    pending?: SortOrder
    remaining?: SortOrder
    carry_over?: SortOrder
    expiry_date?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type LeaveBalanceSumOrderByAggregateInput = {
    year?: SortOrder
    entitled?: SortOrder
    used?: SortOrder
    pending?: SortOrder
    remaining?: SortOrder
    carry_over?: SortOrder
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

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }
  export type JsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type LeaveRequestCountOrderByAggregateInput = {
    id?: SortOrder
    employee_id?: SortOrder
    leave_type_id?: SortOrder
    start_date?: SortOrder
    end_date?: SortOrder
    days?: SortOrder
    half_day?: SortOrder
    reason?: SortOrder
    status?: SortOrder
    substitute_id?: SortOrder
    attachments?: SortOrder
    approved_by?: SortOrder
    approved_date?: SortOrder
    rejection_reason?: SortOrder
    submitted_at?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type LeaveRequestAvgOrderByAggregateInput = {
    days?: SortOrder
  }

  export type LeaveRequestMaxOrderByAggregateInput = {
    id?: SortOrder
    employee_id?: SortOrder
    leave_type_id?: SortOrder
    start_date?: SortOrder
    end_date?: SortOrder
    days?: SortOrder
    half_day?: SortOrder
    reason?: SortOrder
    status?: SortOrder
    substitute_id?: SortOrder
    approved_by?: SortOrder
    approved_date?: SortOrder
    rejection_reason?: SortOrder
    submitted_at?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type LeaveRequestMinOrderByAggregateInput = {
    id?: SortOrder
    employee_id?: SortOrder
    leave_type_id?: SortOrder
    start_date?: SortOrder
    end_date?: SortOrder
    days?: SortOrder
    half_day?: SortOrder
    reason?: SortOrder
    status?: SortOrder
    substitute_id?: SortOrder
    approved_by?: SortOrder
    approved_date?: SortOrder
    rejection_reason?: SortOrder
    submitted_at?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type LeaveRequestSumOrderByAggregateInput = {
    days?: SortOrder
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type LeaveCalendarCountOrderByAggregateInput = {
    id?: SortOrder
    date?: SortOrder
    is_holiday?: SortOrder
    holiday_name?: SortOrder
    holiday_name_th?: SortOrder
    created_at?: SortOrder
  }

  export type LeaveCalendarMaxOrderByAggregateInput = {
    id?: SortOrder
    date?: SortOrder
    is_holiday?: SortOrder
    holiday_name?: SortOrder
    holiday_name_th?: SortOrder
    created_at?: SortOrder
  }

  export type LeaveCalendarMinOrderByAggregateInput = {
    id?: SortOrder
    date?: SortOrder
    is_holiday?: SortOrder
    holiday_name?: SortOrder
    holiday_name_th?: SortOrder
    created_at?: SortOrder
  }

  export type AuditLogCountOrderByAggregateInput = {
    id?: SortOrder
    employee_id?: SortOrder
    entity_type?: SortOrder
    entity_id?: SortOrder
    action?: SortOrder
    performed_by?: SortOrder
    changes?: SortOrder
    created_at?: SortOrder
  }

  export type AuditLogMaxOrderByAggregateInput = {
    id?: SortOrder
    employee_id?: SortOrder
    entity_type?: SortOrder
    entity_id?: SortOrder
    action?: SortOrder
    performed_by?: SortOrder
    created_at?: SortOrder
  }

  export type AuditLogMinOrderByAggregateInput = {
    id?: SortOrder
    employee_id?: SortOrder
    entity_type?: SortOrder
    entity_id?: SortOrder
    action?: SortOrder
    performed_by?: SortOrder
    created_at?: SortOrder
  }

  export type LeaveBalanceCreateNestedManyWithoutLeave_typeInput = {
    create?: XOR<LeaveBalanceCreateWithoutLeave_typeInput, LeaveBalanceUncheckedCreateWithoutLeave_typeInput> | LeaveBalanceCreateWithoutLeave_typeInput[] | LeaveBalanceUncheckedCreateWithoutLeave_typeInput[]
    connectOrCreate?: LeaveBalanceCreateOrConnectWithoutLeave_typeInput | LeaveBalanceCreateOrConnectWithoutLeave_typeInput[]
    createMany?: LeaveBalanceCreateManyLeave_typeInputEnvelope
    connect?: LeaveBalanceWhereUniqueInput | LeaveBalanceWhereUniqueInput[]
  }

  export type LeaveRequestCreateNestedManyWithoutLeave_typeInput = {
    create?: XOR<LeaveRequestCreateWithoutLeave_typeInput, LeaveRequestUncheckedCreateWithoutLeave_typeInput> | LeaveRequestCreateWithoutLeave_typeInput[] | LeaveRequestUncheckedCreateWithoutLeave_typeInput[]
    connectOrCreate?: LeaveRequestCreateOrConnectWithoutLeave_typeInput | LeaveRequestCreateOrConnectWithoutLeave_typeInput[]
    createMany?: LeaveRequestCreateManyLeave_typeInputEnvelope
    connect?: LeaveRequestWhereUniqueInput | LeaveRequestWhereUniqueInput[]
  }

  export type LeaveBalanceUncheckedCreateNestedManyWithoutLeave_typeInput = {
    create?: XOR<LeaveBalanceCreateWithoutLeave_typeInput, LeaveBalanceUncheckedCreateWithoutLeave_typeInput> | LeaveBalanceCreateWithoutLeave_typeInput[] | LeaveBalanceUncheckedCreateWithoutLeave_typeInput[]
    connectOrCreate?: LeaveBalanceCreateOrConnectWithoutLeave_typeInput | LeaveBalanceCreateOrConnectWithoutLeave_typeInput[]
    createMany?: LeaveBalanceCreateManyLeave_typeInputEnvelope
    connect?: LeaveBalanceWhereUniqueInput | LeaveBalanceWhereUniqueInput[]
  }

  export type LeaveRequestUncheckedCreateNestedManyWithoutLeave_typeInput = {
    create?: XOR<LeaveRequestCreateWithoutLeave_typeInput, LeaveRequestUncheckedCreateWithoutLeave_typeInput> | LeaveRequestCreateWithoutLeave_typeInput[] | LeaveRequestUncheckedCreateWithoutLeave_typeInput[]
    connectOrCreate?: LeaveRequestCreateOrConnectWithoutLeave_typeInput | LeaveRequestCreateOrConnectWithoutLeave_typeInput[]
    createMany?: LeaveRequestCreateManyLeave_typeInputEnvelope
    connect?: LeaveRequestWhereUniqueInput | LeaveRequestWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type LeaveBalanceUpdateManyWithoutLeave_typeNestedInput = {
    create?: XOR<LeaveBalanceCreateWithoutLeave_typeInput, LeaveBalanceUncheckedCreateWithoutLeave_typeInput> | LeaveBalanceCreateWithoutLeave_typeInput[] | LeaveBalanceUncheckedCreateWithoutLeave_typeInput[]
    connectOrCreate?: LeaveBalanceCreateOrConnectWithoutLeave_typeInput | LeaveBalanceCreateOrConnectWithoutLeave_typeInput[]
    upsert?: LeaveBalanceUpsertWithWhereUniqueWithoutLeave_typeInput | LeaveBalanceUpsertWithWhereUniqueWithoutLeave_typeInput[]
    createMany?: LeaveBalanceCreateManyLeave_typeInputEnvelope
    set?: LeaveBalanceWhereUniqueInput | LeaveBalanceWhereUniqueInput[]
    disconnect?: LeaveBalanceWhereUniqueInput | LeaveBalanceWhereUniqueInput[]
    delete?: LeaveBalanceWhereUniqueInput | LeaveBalanceWhereUniqueInput[]
    connect?: LeaveBalanceWhereUniqueInput | LeaveBalanceWhereUniqueInput[]
    update?: LeaveBalanceUpdateWithWhereUniqueWithoutLeave_typeInput | LeaveBalanceUpdateWithWhereUniqueWithoutLeave_typeInput[]
    updateMany?: LeaveBalanceUpdateManyWithWhereWithoutLeave_typeInput | LeaveBalanceUpdateManyWithWhereWithoutLeave_typeInput[]
    deleteMany?: LeaveBalanceScalarWhereInput | LeaveBalanceScalarWhereInput[]
  }

  export type LeaveRequestUpdateManyWithoutLeave_typeNestedInput = {
    create?: XOR<LeaveRequestCreateWithoutLeave_typeInput, LeaveRequestUncheckedCreateWithoutLeave_typeInput> | LeaveRequestCreateWithoutLeave_typeInput[] | LeaveRequestUncheckedCreateWithoutLeave_typeInput[]
    connectOrCreate?: LeaveRequestCreateOrConnectWithoutLeave_typeInput | LeaveRequestCreateOrConnectWithoutLeave_typeInput[]
    upsert?: LeaveRequestUpsertWithWhereUniqueWithoutLeave_typeInput | LeaveRequestUpsertWithWhereUniqueWithoutLeave_typeInput[]
    createMany?: LeaveRequestCreateManyLeave_typeInputEnvelope
    set?: LeaveRequestWhereUniqueInput | LeaveRequestWhereUniqueInput[]
    disconnect?: LeaveRequestWhereUniqueInput | LeaveRequestWhereUniqueInput[]
    delete?: LeaveRequestWhereUniqueInput | LeaveRequestWhereUniqueInput[]
    connect?: LeaveRequestWhereUniqueInput | LeaveRequestWhereUniqueInput[]
    update?: LeaveRequestUpdateWithWhereUniqueWithoutLeave_typeInput | LeaveRequestUpdateWithWhereUniqueWithoutLeave_typeInput[]
    updateMany?: LeaveRequestUpdateManyWithWhereWithoutLeave_typeInput | LeaveRequestUpdateManyWithWhereWithoutLeave_typeInput[]
    deleteMany?: LeaveRequestScalarWhereInput | LeaveRequestScalarWhereInput[]
  }

  export type LeaveBalanceUncheckedUpdateManyWithoutLeave_typeNestedInput = {
    create?: XOR<LeaveBalanceCreateWithoutLeave_typeInput, LeaveBalanceUncheckedCreateWithoutLeave_typeInput> | LeaveBalanceCreateWithoutLeave_typeInput[] | LeaveBalanceUncheckedCreateWithoutLeave_typeInput[]
    connectOrCreate?: LeaveBalanceCreateOrConnectWithoutLeave_typeInput | LeaveBalanceCreateOrConnectWithoutLeave_typeInput[]
    upsert?: LeaveBalanceUpsertWithWhereUniqueWithoutLeave_typeInput | LeaveBalanceUpsertWithWhereUniqueWithoutLeave_typeInput[]
    createMany?: LeaveBalanceCreateManyLeave_typeInputEnvelope
    set?: LeaveBalanceWhereUniqueInput | LeaveBalanceWhereUniqueInput[]
    disconnect?: LeaveBalanceWhereUniqueInput | LeaveBalanceWhereUniqueInput[]
    delete?: LeaveBalanceWhereUniqueInput | LeaveBalanceWhereUniqueInput[]
    connect?: LeaveBalanceWhereUniqueInput | LeaveBalanceWhereUniqueInput[]
    update?: LeaveBalanceUpdateWithWhereUniqueWithoutLeave_typeInput | LeaveBalanceUpdateWithWhereUniqueWithoutLeave_typeInput[]
    updateMany?: LeaveBalanceUpdateManyWithWhereWithoutLeave_typeInput | LeaveBalanceUpdateManyWithWhereWithoutLeave_typeInput[]
    deleteMany?: LeaveBalanceScalarWhereInput | LeaveBalanceScalarWhereInput[]
  }

  export type LeaveRequestUncheckedUpdateManyWithoutLeave_typeNestedInput = {
    create?: XOR<LeaveRequestCreateWithoutLeave_typeInput, LeaveRequestUncheckedCreateWithoutLeave_typeInput> | LeaveRequestCreateWithoutLeave_typeInput[] | LeaveRequestUncheckedCreateWithoutLeave_typeInput[]
    connectOrCreate?: LeaveRequestCreateOrConnectWithoutLeave_typeInput | LeaveRequestCreateOrConnectWithoutLeave_typeInput[]
    upsert?: LeaveRequestUpsertWithWhereUniqueWithoutLeave_typeInput | LeaveRequestUpsertWithWhereUniqueWithoutLeave_typeInput[]
    createMany?: LeaveRequestCreateManyLeave_typeInputEnvelope
    set?: LeaveRequestWhereUniqueInput | LeaveRequestWhereUniqueInput[]
    disconnect?: LeaveRequestWhereUniqueInput | LeaveRequestWhereUniqueInput[]
    delete?: LeaveRequestWhereUniqueInput | LeaveRequestWhereUniqueInput[]
    connect?: LeaveRequestWhereUniqueInput | LeaveRequestWhereUniqueInput[]
    update?: LeaveRequestUpdateWithWhereUniqueWithoutLeave_typeInput | LeaveRequestUpdateWithWhereUniqueWithoutLeave_typeInput[]
    updateMany?: LeaveRequestUpdateManyWithWhereWithoutLeave_typeInput | LeaveRequestUpdateManyWithWhereWithoutLeave_typeInput[]
    deleteMany?: LeaveRequestScalarWhereInput | LeaveRequestScalarWhereInput[]
  }

  export type LeaveTypeCreateNestedOneWithoutBalancesInput = {
    create?: XOR<LeaveTypeCreateWithoutBalancesInput, LeaveTypeUncheckedCreateWithoutBalancesInput>
    connectOrCreate?: LeaveTypeCreateOrConnectWithoutBalancesInput
    connect?: LeaveTypeWhereUniqueInput
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type LeaveTypeUpdateOneRequiredWithoutBalancesNestedInput = {
    create?: XOR<LeaveTypeCreateWithoutBalancesInput, LeaveTypeUncheckedCreateWithoutBalancesInput>
    connectOrCreate?: LeaveTypeCreateOrConnectWithoutBalancesInput
    upsert?: LeaveTypeUpsertWithoutBalancesInput
    connect?: LeaveTypeWhereUniqueInput
    update?: XOR<XOR<LeaveTypeUpdateToOneWithWhereWithoutBalancesInput, LeaveTypeUpdateWithoutBalancesInput>, LeaveTypeUncheckedUpdateWithoutBalancesInput>
  }

  export type LeaveTypeCreateNestedOneWithoutRequestsInput = {
    create?: XOR<LeaveTypeCreateWithoutRequestsInput, LeaveTypeUncheckedCreateWithoutRequestsInput>
    connectOrCreate?: LeaveTypeCreateOrConnectWithoutRequestsInput
    connect?: LeaveTypeWhereUniqueInput
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type LeaveTypeUpdateOneRequiredWithoutRequestsNestedInput = {
    create?: XOR<LeaveTypeCreateWithoutRequestsInput, LeaveTypeUncheckedCreateWithoutRequestsInput>
    connectOrCreate?: LeaveTypeCreateOrConnectWithoutRequestsInput
    upsert?: LeaveTypeUpsertWithoutRequestsInput
    connect?: LeaveTypeWhereUniqueInput
    update?: XOR<XOR<LeaveTypeUpdateToOneWithWhereWithoutRequestsInput, LeaveTypeUpdateWithoutRequestsInput>, LeaveTypeUncheckedUpdateWithoutRequestsInput>
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

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
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

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type LeaveBalanceCreateWithoutLeave_typeInput = {
    id?: string
    employee_id: string
    year: number
    entitled?: number
    used?: number
    pending?: number
    remaining?: number
    carry_over?: number
    expiry_date?: Date | string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type LeaveBalanceUncheckedCreateWithoutLeave_typeInput = {
    id?: string
    employee_id: string
    year: number
    entitled?: number
    used?: number
    pending?: number
    remaining?: number
    carry_over?: number
    expiry_date?: Date | string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type LeaveBalanceCreateOrConnectWithoutLeave_typeInput = {
    where: LeaveBalanceWhereUniqueInput
    create: XOR<LeaveBalanceCreateWithoutLeave_typeInput, LeaveBalanceUncheckedCreateWithoutLeave_typeInput>
  }

  export type LeaveBalanceCreateManyLeave_typeInputEnvelope = {
    data: LeaveBalanceCreateManyLeave_typeInput | LeaveBalanceCreateManyLeave_typeInput[]
    skipDuplicates?: boolean
  }

  export type LeaveRequestCreateWithoutLeave_typeInput = {
    id?: string
    employee_id: string
    start_date: Date | string
    end_date: Date | string
    days: number
    half_day?: string | null
    reason?: string | null
    status?: string
    substitute_id?: string | null
    attachments?: NullableJsonNullValueInput | InputJsonValue
    approved_by?: string | null
    approved_date?: Date | string | null
    rejection_reason?: string | null
    submitted_at?: Date | string
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type LeaveRequestUncheckedCreateWithoutLeave_typeInput = {
    id?: string
    employee_id: string
    start_date: Date | string
    end_date: Date | string
    days: number
    half_day?: string | null
    reason?: string | null
    status?: string
    substitute_id?: string | null
    attachments?: NullableJsonNullValueInput | InputJsonValue
    approved_by?: string | null
    approved_date?: Date | string | null
    rejection_reason?: string | null
    submitted_at?: Date | string
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type LeaveRequestCreateOrConnectWithoutLeave_typeInput = {
    where: LeaveRequestWhereUniqueInput
    create: XOR<LeaveRequestCreateWithoutLeave_typeInput, LeaveRequestUncheckedCreateWithoutLeave_typeInput>
  }

  export type LeaveRequestCreateManyLeave_typeInputEnvelope = {
    data: LeaveRequestCreateManyLeave_typeInput | LeaveRequestCreateManyLeave_typeInput[]
    skipDuplicates?: boolean
  }

  export type LeaveBalanceUpsertWithWhereUniqueWithoutLeave_typeInput = {
    where: LeaveBalanceWhereUniqueInput
    update: XOR<LeaveBalanceUpdateWithoutLeave_typeInput, LeaveBalanceUncheckedUpdateWithoutLeave_typeInput>
    create: XOR<LeaveBalanceCreateWithoutLeave_typeInput, LeaveBalanceUncheckedCreateWithoutLeave_typeInput>
  }

  export type LeaveBalanceUpdateWithWhereUniqueWithoutLeave_typeInput = {
    where: LeaveBalanceWhereUniqueInput
    data: XOR<LeaveBalanceUpdateWithoutLeave_typeInput, LeaveBalanceUncheckedUpdateWithoutLeave_typeInput>
  }

  export type LeaveBalanceUpdateManyWithWhereWithoutLeave_typeInput = {
    where: LeaveBalanceScalarWhereInput
    data: XOR<LeaveBalanceUpdateManyMutationInput, LeaveBalanceUncheckedUpdateManyWithoutLeave_typeInput>
  }

  export type LeaveBalanceScalarWhereInput = {
    AND?: LeaveBalanceScalarWhereInput | LeaveBalanceScalarWhereInput[]
    OR?: LeaveBalanceScalarWhereInput[]
    NOT?: LeaveBalanceScalarWhereInput | LeaveBalanceScalarWhereInput[]
    id?: StringFilter<"LeaveBalance"> | string
    employee_id?: StringFilter<"LeaveBalance"> | string
    leave_type_id?: StringFilter<"LeaveBalance"> | string
    year?: IntFilter<"LeaveBalance"> | number
    entitled?: IntFilter<"LeaveBalance"> | number
    used?: IntFilter<"LeaveBalance"> | number
    pending?: IntFilter<"LeaveBalance"> | number
    remaining?: IntFilter<"LeaveBalance"> | number
    carry_over?: IntFilter<"LeaveBalance"> | number
    expiry_date?: DateTimeNullableFilter<"LeaveBalance"> | Date | string | null
    created_at?: DateTimeFilter<"LeaveBalance"> | Date | string
    updated_at?: DateTimeFilter<"LeaveBalance"> | Date | string
  }

  export type LeaveRequestUpsertWithWhereUniqueWithoutLeave_typeInput = {
    where: LeaveRequestWhereUniqueInput
    update: XOR<LeaveRequestUpdateWithoutLeave_typeInput, LeaveRequestUncheckedUpdateWithoutLeave_typeInput>
    create: XOR<LeaveRequestCreateWithoutLeave_typeInput, LeaveRequestUncheckedCreateWithoutLeave_typeInput>
  }

  export type LeaveRequestUpdateWithWhereUniqueWithoutLeave_typeInput = {
    where: LeaveRequestWhereUniqueInput
    data: XOR<LeaveRequestUpdateWithoutLeave_typeInput, LeaveRequestUncheckedUpdateWithoutLeave_typeInput>
  }

  export type LeaveRequestUpdateManyWithWhereWithoutLeave_typeInput = {
    where: LeaveRequestScalarWhereInput
    data: XOR<LeaveRequestUpdateManyMutationInput, LeaveRequestUncheckedUpdateManyWithoutLeave_typeInput>
  }

  export type LeaveRequestScalarWhereInput = {
    AND?: LeaveRequestScalarWhereInput | LeaveRequestScalarWhereInput[]
    OR?: LeaveRequestScalarWhereInput[]
    NOT?: LeaveRequestScalarWhereInput | LeaveRequestScalarWhereInput[]
    id?: StringFilter<"LeaveRequest"> | string
    employee_id?: StringFilter<"LeaveRequest"> | string
    leave_type_id?: StringFilter<"LeaveRequest"> | string
    start_date?: DateTimeFilter<"LeaveRequest"> | Date | string
    end_date?: DateTimeFilter<"LeaveRequest"> | Date | string
    days?: FloatFilter<"LeaveRequest"> | number
    half_day?: StringNullableFilter<"LeaveRequest"> | string | null
    reason?: StringNullableFilter<"LeaveRequest"> | string | null
    status?: StringFilter<"LeaveRequest"> | string
    substitute_id?: StringNullableFilter<"LeaveRequest"> | string | null
    attachments?: JsonNullableFilter<"LeaveRequest">
    approved_by?: StringNullableFilter<"LeaveRequest"> | string | null
    approved_date?: DateTimeNullableFilter<"LeaveRequest"> | Date | string | null
    rejection_reason?: StringNullableFilter<"LeaveRequest"> | string | null
    submitted_at?: DateTimeFilter<"LeaveRequest"> | Date | string
    created_at?: DateTimeFilter<"LeaveRequest"> | Date | string
    updated_at?: DateTimeFilter<"LeaveRequest"> | Date | string
  }

  export type LeaveTypeCreateWithoutBalancesInput = {
    id?: string
    code: string
    name_en: string
    name_th?: string | null
    max_days: number
    requires_medical_cert?: boolean
    medical_cert_days?: number | null
    applicable_gender?: string | null
    max_per_career?: number | null
    is_active?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    requests?: LeaveRequestCreateNestedManyWithoutLeave_typeInput
  }

  export type LeaveTypeUncheckedCreateWithoutBalancesInput = {
    id?: string
    code: string
    name_en: string
    name_th?: string | null
    max_days: number
    requires_medical_cert?: boolean
    medical_cert_days?: number | null
    applicable_gender?: string | null
    max_per_career?: number | null
    is_active?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    requests?: LeaveRequestUncheckedCreateNestedManyWithoutLeave_typeInput
  }

  export type LeaveTypeCreateOrConnectWithoutBalancesInput = {
    where: LeaveTypeWhereUniqueInput
    create: XOR<LeaveTypeCreateWithoutBalancesInput, LeaveTypeUncheckedCreateWithoutBalancesInput>
  }

  export type LeaveTypeUpsertWithoutBalancesInput = {
    update: XOR<LeaveTypeUpdateWithoutBalancesInput, LeaveTypeUncheckedUpdateWithoutBalancesInput>
    create: XOR<LeaveTypeCreateWithoutBalancesInput, LeaveTypeUncheckedCreateWithoutBalancesInput>
    where?: LeaveTypeWhereInput
  }

  export type LeaveTypeUpdateToOneWithWhereWithoutBalancesInput = {
    where?: LeaveTypeWhereInput
    data: XOR<LeaveTypeUpdateWithoutBalancesInput, LeaveTypeUncheckedUpdateWithoutBalancesInput>
  }

  export type LeaveTypeUpdateWithoutBalancesInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    name_en?: StringFieldUpdateOperationsInput | string
    name_th?: NullableStringFieldUpdateOperationsInput | string | null
    max_days?: IntFieldUpdateOperationsInput | number
    requires_medical_cert?: BoolFieldUpdateOperationsInput | boolean
    medical_cert_days?: NullableIntFieldUpdateOperationsInput | number | null
    applicable_gender?: NullableStringFieldUpdateOperationsInput | string | null
    max_per_career?: NullableIntFieldUpdateOperationsInput | number | null
    is_active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    requests?: LeaveRequestUpdateManyWithoutLeave_typeNestedInput
  }

  export type LeaveTypeUncheckedUpdateWithoutBalancesInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    name_en?: StringFieldUpdateOperationsInput | string
    name_th?: NullableStringFieldUpdateOperationsInput | string | null
    max_days?: IntFieldUpdateOperationsInput | number
    requires_medical_cert?: BoolFieldUpdateOperationsInput | boolean
    medical_cert_days?: NullableIntFieldUpdateOperationsInput | number | null
    applicable_gender?: NullableStringFieldUpdateOperationsInput | string | null
    max_per_career?: NullableIntFieldUpdateOperationsInput | number | null
    is_active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    requests?: LeaveRequestUncheckedUpdateManyWithoutLeave_typeNestedInput
  }

  export type LeaveTypeCreateWithoutRequestsInput = {
    id?: string
    code: string
    name_en: string
    name_th?: string | null
    max_days: number
    requires_medical_cert?: boolean
    medical_cert_days?: number | null
    applicable_gender?: string | null
    max_per_career?: number | null
    is_active?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    balances?: LeaveBalanceCreateNestedManyWithoutLeave_typeInput
  }

  export type LeaveTypeUncheckedCreateWithoutRequestsInput = {
    id?: string
    code: string
    name_en: string
    name_th?: string | null
    max_days: number
    requires_medical_cert?: boolean
    medical_cert_days?: number | null
    applicable_gender?: string | null
    max_per_career?: number | null
    is_active?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    balances?: LeaveBalanceUncheckedCreateNestedManyWithoutLeave_typeInput
  }

  export type LeaveTypeCreateOrConnectWithoutRequestsInput = {
    where: LeaveTypeWhereUniqueInput
    create: XOR<LeaveTypeCreateWithoutRequestsInput, LeaveTypeUncheckedCreateWithoutRequestsInput>
  }

  export type LeaveTypeUpsertWithoutRequestsInput = {
    update: XOR<LeaveTypeUpdateWithoutRequestsInput, LeaveTypeUncheckedUpdateWithoutRequestsInput>
    create: XOR<LeaveTypeCreateWithoutRequestsInput, LeaveTypeUncheckedCreateWithoutRequestsInput>
    where?: LeaveTypeWhereInput
  }

  export type LeaveTypeUpdateToOneWithWhereWithoutRequestsInput = {
    where?: LeaveTypeWhereInput
    data: XOR<LeaveTypeUpdateWithoutRequestsInput, LeaveTypeUncheckedUpdateWithoutRequestsInput>
  }

  export type LeaveTypeUpdateWithoutRequestsInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    name_en?: StringFieldUpdateOperationsInput | string
    name_th?: NullableStringFieldUpdateOperationsInput | string | null
    max_days?: IntFieldUpdateOperationsInput | number
    requires_medical_cert?: BoolFieldUpdateOperationsInput | boolean
    medical_cert_days?: NullableIntFieldUpdateOperationsInput | number | null
    applicable_gender?: NullableStringFieldUpdateOperationsInput | string | null
    max_per_career?: NullableIntFieldUpdateOperationsInput | number | null
    is_active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    balances?: LeaveBalanceUpdateManyWithoutLeave_typeNestedInput
  }

  export type LeaveTypeUncheckedUpdateWithoutRequestsInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    name_en?: StringFieldUpdateOperationsInput | string
    name_th?: NullableStringFieldUpdateOperationsInput | string | null
    max_days?: IntFieldUpdateOperationsInput | number
    requires_medical_cert?: BoolFieldUpdateOperationsInput | boolean
    medical_cert_days?: NullableIntFieldUpdateOperationsInput | number | null
    applicable_gender?: NullableStringFieldUpdateOperationsInput | string | null
    max_per_career?: NullableIntFieldUpdateOperationsInput | number | null
    is_active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    balances?: LeaveBalanceUncheckedUpdateManyWithoutLeave_typeNestedInput
  }

  export type LeaveBalanceCreateManyLeave_typeInput = {
    id?: string
    employee_id: string
    year: number
    entitled?: number
    used?: number
    pending?: number
    remaining?: number
    carry_over?: number
    expiry_date?: Date | string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type LeaveRequestCreateManyLeave_typeInput = {
    id?: string
    employee_id: string
    start_date: Date | string
    end_date: Date | string
    days: number
    half_day?: string | null
    reason?: string | null
    status?: string
    substitute_id?: string | null
    attachments?: NullableJsonNullValueInput | InputJsonValue
    approved_by?: string | null
    approved_date?: Date | string | null
    rejection_reason?: string | null
    submitted_at?: Date | string
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type LeaveBalanceUpdateWithoutLeave_typeInput = {
    id?: StringFieldUpdateOperationsInput | string
    employee_id?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    entitled?: IntFieldUpdateOperationsInput | number
    used?: IntFieldUpdateOperationsInput | number
    pending?: IntFieldUpdateOperationsInput | number
    remaining?: IntFieldUpdateOperationsInput | number
    carry_over?: IntFieldUpdateOperationsInput | number
    expiry_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LeaveBalanceUncheckedUpdateWithoutLeave_typeInput = {
    id?: StringFieldUpdateOperationsInput | string
    employee_id?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    entitled?: IntFieldUpdateOperationsInput | number
    used?: IntFieldUpdateOperationsInput | number
    pending?: IntFieldUpdateOperationsInput | number
    remaining?: IntFieldUpdateOperationsInput | number
    carry_over?: IntFieldUpdateOperationsInput | number
    expiry_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LeaveBalanceUncheckedUpdateManyWithoutLeave_typeInput = {
    id?: StringFieldUpdateOperationsInput | string
    employee_id?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    entitled?: IntFieldUpdateOperationsInput | number
    used?: IntFieldUpdateOperationsInput | number
    pending?: IntFieldUpdateOperationsInput | number
    remaining?: IntFieldUpdateOperationsInput | number
    carry_over?: IntFieldUpdateOperationsInput | number
    expiry_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LeaveRequestUpdateWithoutLeave_typeInput = {
    id?: StringFieldUpdateOperationsInput | string
    employee_id?: StringFieldUpdateOperationsInput | string
    start_date?: DateTimeFieldUpdateOperationsInput | Date | string
    end_date?: DateTimeFieldUpdateOperationsInput | Date | string
    days?: FloatFieldUpdateOperationsInput | number
    half_day?: NullableStringFieldUpdateOperationsInput | string | null
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    substitute_id?: NullableStringFieldUpdateOperationsInput | string | null
    attachments?: NullableJsonNullValueInput | InputJsonValue
    approved_by?: NullableStringFieldUpdateOperationsInput | string | null
    approved_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rejection_reason?: NullableStringFieldUpdateOperationsInput | string | null
    submitted_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LeaveRequestUncheckedUpdateWithoutLeave_typeInput = {
    id?: StringFieldUpdateOperationsInput | string
    employee_id?: StringFieldUpdateOperationsInput | string
    start_date?: DateTimeFieldUpdateOperationsInput | Date | string
    end_date?: DateTimeFieldUpdateOperationsInput | Date | string
    days?: FloatFieldUpdateOperationsInput | number
    half_day?: NullableStringFieldUpdateOperationsInput | string | null
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    substitute_id?: NullableStringFieldUpdateOperationsInput | string | null
    attachments?: NullableJsonNullValueInput | InputJsonValue
    approved_by?: NullableStringFieldUpdateOperationsInput | string | null
    approved_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rejection_reason?: NullableStringFieldUpdateOperationsInput | string | null
    submitted_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LeaveRequestUncheckedUpdateManyWithoutLeave_typeInput = {
    id?: StringFieldUpdateOperationsInput | string
    employee_id?: StringFieldUpdateOperationsInput | string
    start_date?: DateTimeFieldUpdateOperationsInput | Date | string
    end_date?: DateTimeFieldUpdateOperationsInput | Date | string
    days?: FloatFieldUpdateOperationsInput | number
    half_day?: NullableStringFieldUpdateOperationsInput | string | null
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    substitute_id?: NullableStringFieldUpdateOperationsInput | string | null
    attachments?: NullableJsonNullValueInput | InputJsonValue
    approved_by?: NullableStringFieldUpdateOperationsInput | string | null
    approved_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rejection_reason?: NullableStringFieldUpdateOperationsInput | string | null
    submitted_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
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