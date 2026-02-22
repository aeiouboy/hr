
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
 * Model Department
 * 
 */
export type Department = $Result.DefaultSelection<Prisma.$DepartmentPayload>
/**
 * Model Position
 * 
 */
export type Position = $Result.DefaultSelection<Prisma.$PositionPayload>
/**
 * Model Incumbent
 * 
 */
export type Incumbent = $Result.DefaultSelection<Prisma.$IncumbentPayload>
/**
 * Model OrgNode
 * 
 */
export type OrgNode = $Result.DefaultSelection<Prisma.$OrgNodePayload>
/**
 * Model ReportingLine
 * 
 */
export type ReportingLine = $Result.DefaultSelection<Prisma.$ReportingLinePayload>
/**
 * Model Transfer
 * 
 */
export type Transfer = $Result.DefaultSelection<Prisma.$TransferPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Departments
 * const departments = await prisma.department.findMany()
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
   * // Fetch zero or more Departments
   * const departments = await prisma.department.findMany()
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
   * `prisma.department`: Exposes CRUD operations for the **Department** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Departments
    * const departments = await prisma.department.findMany()
    * ```
    */
  get department(): Prisma.DepartmentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.position`: Exposes CRUD operations for the **Position** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Positions
    * const positions = await prisma.position.findMany()
    * ```
    */
  get position(): Prisma.PositionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.incumbent`: Exposes CRUD operations for the **Incumbent** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Incumbents
    * const incumbents = await prisma.incumbent.findMany()
    * ```
    */
  get incumbent(): Prisma.IncumbentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.orgNode`: Exposes CRUD operations for the **OrgNode** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more OrgNodes
    * const orgNodes = await prisma.orgNode.findMany()
    * ```
    */
  get orgNode(): Prisma.OrgNodeDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.reportingLine`: Exposes CRUD operations for the **ReportingLine** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ReportingLines
    * const reportingLines = await prisma.reportingLine.findMany()
    * ```
    */
  get reportingLine(): Prisma.ReportingLineDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.transfer`: Exposes CRUD operations for the **Transfer** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Transfers
    * const transfers = await prisma.transfer.findMany()
    * ```
    */
  get transfer(): Prisma.TransferDelegate<ExtArgs, ClientOptions>;
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
    Department: 'Department',
    Position: 'Position',
    Incumbent: 'Incumbent',
    OrgNode: 'OrgNode',
    ReportingLine: 'ReportingLine',
    Transfer: 'Transfer'
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
      modelProps: "department" | "position" | "incumbent" | "orgNode" | "reportingLine" | "transfer"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Department: {
        payload: Prisma.$DepartmentPayload<ExtArgs>
        fields: Prisma.DepartmentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DepartmentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DepartmentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DepartmentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DepartmentPayload>
          }
          findFirst: {
            args: Prisma.DepartmentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DepartmentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DepartmentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DepartmentPayload>
          }
          findMany: {
            args: Prisma.DepartmentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DepartmentPayload>[]
          }
          create: {
            args: Prisma.DepartmentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DepartmentPayload>
          }
          createMany: {
            args: Prisma.DepartmentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DepartmentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DepartmentPayload>[]
          }
          delete: {
            args: Prisma.DepartmentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DepartmentPayload>
          }
          update: {
            args: Prisma.DepartmentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DepartmentPayload>
          }
          deleteMany: {
            args: Prisma.DepartmentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DepartmentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.DepartmentUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DepartmentPayload>[]
          }
          upsert: {
            args: Prisma.DepartmentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DepartmentPayload>
          }
          aggregate: {
            args: Prisma.DepartmentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDepartment>
          }
          groupBy: {
            args: Prisma.DepartmentGroupByArgs<ExtArgs>
            result: $Utils.Optional<DepartmentGroupByOutputType>[]
          }
          count: {
            args: Prisma.DepartmentCountArgs<ExtArgs>
            result: $Utils.Optional<DepartmentCountAggregateOutputType> | number
          }
        }
      }
      Position: {
        payload: Prisma.$PositionPayload<ExtArgs>
        fields: Prisma.PositionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PositionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PositionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PositionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PositionPayload>
          }
          findFirst: {
            args: Prisma.PositionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PositionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PositionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PositionPayload>
          }
          findMany: {
            args: Prisma.PositionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PositionPayload>[]
          }
          create: {
            args: Prisma.PositionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PositionPayload>
          }
          createMany: {
            args: Prisma.PositionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PositionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PositionPayload>[]
          }
          delete: {
            args: Prisma.PositionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PositionPayload>
          }
          update: {
            args: Prisma.PositionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PositionPayload>
          }
          deleteMany: {
            args: Prisma.PositionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PositionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PositionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PositionPayload>[]
          }
          upsert: {
            args: Prisma.PositionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PositionPayload>
          }
          aggregate: {
            args: Prisma.PositionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePosition>
          }
          groupBy: {
            args: Prisma.PositionGroupByArgs<ExtArgs>
            result: $Utils.Optional<PositionGroupByOutputType>[]
          }
          count: {
            args: Prisma.PositionCountArgs<ExtArgs>
            result: $Utils.Optional<PositionCountAggregateOutputType> | number
          }
        }
      }
      Incumbent: {
        payload: Prisma.$IncumbentPayload<ExtArgs>
        fields: Prisma.IncumbentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.IncumbentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IncumbentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.IncumbentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IncumbentPayload>
          }
          findFirst: {
            args: Prisma.IncumbentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IncumbentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.IncumbentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IncumbentPayload>
          }
          findMany: {
            args: Prisma.IncumbentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IncumbentPayload>[]
          }
          create: {
            args: Prisma.IncumbentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IncumbentPayload>
          }
          createMany: {
            args: Prisma.IncumbentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.IncumbentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IncumbentPayload>[]
          }
          delete: {
            args: Prisma.IncumbentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IncumbentPayload>
          }
          update: {
            args: Prisma.IncumbentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IncumbentPayload>
          }
          deleteMany: {
            args: Prisma.IncumbentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.IncumbentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.IncumbentUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IncumbentPayload>[]
          }
          upsert: {
            args: Prisma.IncumbentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IncumbentPayload>
          }
          aggregate: {
            args: Prisma.IncumbentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateIncumbent>
          }
          groupBy: {
            args: Prisma.IncumbentGroupByArgs<ExtArgs>
            result: $Utils.Optional<IncumbentGroupByOutputType>[]
          }
          count: {
            args: Prisma.IncumbentCountArgs<ExtArgs>
            result: $Utils.Optional<IncumbentCountAggregateOutputType> | number
          }
        }
      }
      OrgNode: {
        payload: Prisma.$OrgNodePayload<ExtArgs>
        fields: Prisma.OrgNodeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.OrgNodeFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrgNodePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.OrgNodeFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrgNodePayload>
          }
          findFirst: {
            args: Prisma.OrgNodeFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrgNodePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.OrgNodeFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrgNodePayload>
          }
          findMany: {
            args: Prisma.OrgNodeFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrgNodePayload>[]
          }
          create: {
            args: Prisma.OrgNodeCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrgNodePayload>
          }
          createMany: {
            args: Prisma.OrgNodeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.OrgNodeCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrgNodePayload>[]
          }
          delete: {
            args: Prisma.OrgNodeDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrgNodePayload>
          }
          update: {
            args: Prisma.OrgNodeUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrgNodePayload>
          }
          deleteMany: {
            args: Prisma.OrgNodeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.OrgNodeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.OrgNodeUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrgNodePayload>[]
          }
          upsert: {
            args: Prisma.OrgNodeUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrgNodePayload>
          }
          aggregate: {
            args: Prisma.OrgNodeAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateOrgNode>
          }
          groupBy: {
            args: Prisma.OrgNodeGroupByArgs<ExtArgs>
            result: $Utils.Optional<OrgNodeGroupByOutputType>[]
          }
          count: {
            args: Prisma.OrgNodeCountArgs<ExtArgs>
            result: $Utils.Optional<OrgNodeCountAggregateOutputType> | number
          }
        }
      }
      ReportingLine: {
        payload: Prisma.$ReportingLinePayload<ExtArgs>
        fields: Prisma.ReportingLineFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ReportingLineFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReportingLinePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ReportingLineFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReportingLinePayload>
          }
          findFirst: {
            args: Prisma.ReportingLineFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReportingLinePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ReportingLineFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReportingLinePayload>
          }
          findMany: {
            args: Prisma.ReportingLineFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReportingLinePayload>[]
          }
          create: {
            args: Prisma.ReportingLineCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReportingLinePayload>
          }
          createMany: {
            args: Prisma.ReportingLineCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ReportingLineCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReportingLinePayload>[]
          }
          delete: {
            args: Prisma.ReportingLineDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReportingLinePayload>
          }
          update: {
            args: Prisma.ReportingLineUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReportingLinePayload>
          }
          deleteMany: {
            args: Prisma.ReportingLineDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ReportingLineUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ReportingLineUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReportingLinePayload>[]
          }
          upsert: {
            args: Prisma.ReportingLineUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReportingLinePayload>
          }
          aggregate: {
            args: Prisma.ReportingLineAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateReportingLine>
          }
          groupBy: {
            args: Prisma.ReportingLineGroupByArgs<ExtArgs>
            result: $Utils.Optional<ReportingLineGroupByOutputType>[]
          }
          count: {
            args: Prisma.ReportingLineCountArgs<ExtArgs>
            result: $Utils.Optional<ReportingLineCountAggregateOutputType> | number
          }
        }
      }
      Transfer: {
        payload: Prisma.$TransferPayload<ExtArgs>
        fields: Prisma.TransferFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TransferFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransferPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TransferFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransferPayload>
          }
          findFirst: {
            args: Prisma.TransferFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransferPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TransferFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransferPayload>
          }
          findMany: {
            args: Prisma.TransferFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransferPayload>[]
          }
          create: {
            args: Prisma.TransferCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransferPayload>
          }
          createMany: {
            args: Prisma.TransferCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TransferCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransferPayload>[]
          }
          delete: {
            args: Prisma.TransferDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransferPayload>
          }
          update: {
            args: Prisma.TransferUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransferPayload>
          }
          deleteMany: {
            args: Prisma.TransferDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TransferUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TransferUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransferPayload>[]
          }
          upsert: {
            args: Prisma.TransferUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransferPayload>
          }
          aggregate: {
            args: Prisma.TransferAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTransfer>
          }
          groupBy: {
            args: Prisma.TransferGroupByArgs<ExtArgs>
            result: $Utils.Optional<TransferGroupByOutputType>[]
          }
          count: {
            args: Prisma.TransferCountArgs<ExtArgs>
            result: $Utils.Optional<TransferCountAggregateOutputType> | number
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
    department?: DepartmentOmit
    position?: PositionOmit
    incumbent?: IncumbentOmit
    orgNode?: OrgNodeOmit
    reportingLine?: ReportingLineOmit
    transfer?: TransferOmit
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
   * Count Type DepartmentCountOutputType
   */

  export type DepartmentCountOutputType = {
    positions: number
  }

  export type DepartmentCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    positions?: boolean | DepartmentCountOutputTypeCountPositionsArgs
  }

  // Custom InputTypes
  /**
   * DepartmentCountOutputType without action
   */
  export type DepartmentCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DepartmentCountOutputType
     */
    select?: DepartmentCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * DepartmentCountOutputType without action
   */
  export type DepartmentCountOutputTypeCountPositionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PositionWhereInput
  }


  /**
   * Count Type PositionCountOutputType
   */

  export type PositionCountOutputType = {
    incumbents: number
  }

  export type PositionCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    incumbents?: boolean | PositionCountOutputTypeCountIncumbentsArgs
  }

  // Custom InputTypes
  /**
   * PositionCountOutputType without action
   */
  export type PositionCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PositionCountOutputType
     */
    select?: PositionCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PositionCountOutputType without action
   */
  export type PositionCountOutputTypeCountIncumbentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: IncumbentWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Department
   */

  export type AggregateDepartment = {
    _count: DepartmentCountAggregateOutputType | null
    _avg: DepartmentAvgAggregateOutputType | null
    _sum: DepartmentSumAggregateOutputType | null
    _min: DepartmentMinAggregateOutputType | null
    _max: DepartmentMaxAggregateOutputType | null
  }

  export type DepartmentAvgAggregateOutputType = {
    headcount: number | null
    budget: number | null
  }

  export type DepartmentSumAggregateOutputType = {
    headcount: number | null
    budget: number | null
  }

  export type DepartmentMinAggregateOutputType = {
    id: string | null
    code: string | null
    name_en: string | null
    name_th: string | null
    company_id: string | null
    parent_department_id: string | null
    cost_center: string | null
    headcount: number | null
    budget: number | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type DepartmentMaxAggregateOutputType = {
    id: string | null
    code: string | null
    name_en: string | null
    name_th: string | null
    company_id: string | null
    parent_department_id: string | null
    cost_center: string | null
    headcount: number | null
    budget: number | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type DepartmentCountAggregateOutputType = {
    id: number
    code: number
    name_en: number
    name_th: number
    company_id: number
    parent_department_id: number
    cost_center: number
    headcount: number
    budget: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type DepartmentAvgAggregateInputType = {
    headcount?: true
    budget?: true
  }

  export type DepartmentSumAggregateInputType = {
    headcount?: true
    budget?: true
  }

  export type DepartmentMinAggregateInputType = {
    id?: true
    code?: true
    name_en?: true
    name_th?: true
    company_id?: true
    parent_department_id?: true
    cost_center?: true
    headcount?: true
    budget?: true
    created_at?: true
    updated_at?: true
  }

  export type DepartmentMaxAggregateInputType = {
    id?: true
    code?: true
    name_en?: true
    name_th?: true
    company_id?: true
    parent_department_id?: true
    cost_center?: true
    headcount?: true
    budget?: true
    created_at?: true
    updated_at?: true
  }

  export type DepartmentCountAggregateInputType = {
    id?: true
    code?: true
    name_en?: true
    name_th?: true
    company_id?: true
    parent_department_id?: true
    cost_center?: true
    headcount?: true
    budget?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type DepartmentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Department to aggregate.
     */
    where?: DepartmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Departments to fetch.
     */
    orderBy?: DepartmentOrderByWithRelationInput | DepartmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DepartmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Departments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Departments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Departments
    **/
    _count?: true | DepartmentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: DepartmentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: DepartmentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DepartmentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DepartmentMaxAggregateInputType
  }

  export type GetDepartmentAggregateType<T extends DepartmentAggregateArgs> = {
        [P in keyof T & keyof AggregateDepartment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDepartment[P]>
      : GetScalarType<T[P], AggregateDepartment[P]>
  }




  export type DepartmentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DepartmentWhereInput
    orderBy?: DepartmentOrderByWithAggregationInput | DepartmentOrderByWithAggregationInput[]
    by: DepartmentScalarFieldEnum[] | DepartmentScalarFieldEnum
    having?: DepartmentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DepartmentCountAggregateInputType | true
    _avg?: DepartmentAvgAggregateInputType
    _sum?: DepartmentSumAggregateInputType
    _min?: DepartmentMinAggregateInputType
    _max?: DepartmentMaxAggregateInputType
  }

  export type DepartmentGroupByOutputType = {
    id: string
    code: string
    name_en: string
    name_th: string | null
    company_id: string
    parent_department_id: string | null
    cost_center: string | null
    headcount: number | null
    budget: number | null
    created_at: Date
    updated_at: Date
    _count: DepartmentCountAggregateOutputType | null
    _avg: DepartmentAvgAggregateOutputType | null
    _sum: DepartmentSumAggregateOutputType | null
    _min: DepartmentMinAggregateOutputType | null
    _max: DepartmentMaxAggregateOutputType | null
  }

  type GetDepartmentGroupByPayload<T extends DepartmentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DepartmentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DepartmentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DepartmentGroupByOutputType[P]>
            : GetScalarType<T[P], DepartmentGroupByOutputType[P]>
        }
      >
    >


  export type DepartmentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    code?: boolean
    name_en?: boolean
    name_th?: boolean
    company_id?: boolean
    parent_department_id?: boolean
    cost_center?: boolean
    headcount?: boolean
    budget?: boolean
    created_at?: boolean
    updated_at?: boolean
    positions?: boolean | Department$positionsArgs<ExtArgs>
    _count?: boolean | DepartmentCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["department"]>

  export type DepartmentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    code?: boolean
    name_en?: boolean
    name_th?: boolean
    company_id?: boolean
    parent_department_id?: boolean
    cost_center?: boolean
    headcount?: boolean
    budget?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["department"]>

  export type DepartmentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    code?: boolean
    name_en?: boolean
    name_th?: boolean
    company_id?: boolean
    parent_department_id?: boolean
    cost_center?: boolean
    headcount?: boolean
    budget?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["department"]>

  export type DepartmentSelectScalar = {
    id?: boolean
    code?: boolean
    name_en?: boolean
    name_th?: boolean
    company_id?: boolean
    parent_department_id?: boolean
    cost_center?: boolean
    headcount?: boolean
    budget?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type DepartmentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "code" | "name_en" | "name_th" | "company_id" | "parent_department_id" | "cost_center" | "headcount" | "budget" | "created_at" | "updated_at", ExtArgs["result"]["department"]>
  export type DepartmentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    positions?: boolean | Department$positionsArgs<ExtArgs>
    _count?: boolean | DepartmentCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type DepartmentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type DepartmentIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $DepartmentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Department"
    objects: {
      positions: Prisma.$PositionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      code: string
      name_en: string
      name_th: string | null
      company_id: string
      parent_department_id: string | null
      cost_center: string | null
      headcount: number | null
      budget: number | null
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["department"]>
    composites: {}
  }

  type DepartmentGetPayload<S extends boolean | null | undefined | DepartmentDefaultArgs> = $Result.GetResult<Prisma.$DepartmentPayload, S>

  type DepartmentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<DepartmentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: DepartmentCountAggregateInputType | true
    }

  export interface DepartmentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Department'], meta: { name: 'Department' } }
    /**
     * Find zero or one Department that matches the filter.
     * @param {DepartmentFindUniqueArgs} args - Arguments to find a Department
     * @example
     * // Get one Department
     * const department = await prisma.department.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DepartmentFindUniqueArgs>(args: SelectSubset<T, DepartmentFindUniqueArgs<ExtArgs>>): Prisma__DepartmentClient<$Result.GetResult<Prisma.$DepartmentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Department that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {DepartmentFindUniqueOrThrowArgs} args - Arguments to find a Department
     * @example
     * // Get one Department
     * const department = await prisma.department.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DepartmentFindUniqueOrThrowArgs>(args: SelectSubset<T, DepartmentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DepartmentClient<$Result.GetResult<Prisma.$DepartmentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Department that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DepartmentFindFirstArgs} args - Arguments to find a Department
     * @example
     * // Get one Department
     * const department = await prisma.department.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DepartmentFindFirstArgs>(args?: SelectSubset<T, DepartmentFindFirstArgs<ExtArgs>>): Prisma__DepartmentClient<$Result.GetResult<Prisma.$DepartmentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Department that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DepartmentFindFirstOrThrowArgs} args - Arguments to find a Department
     * @example
     * // Get one Department
     * const department = await prisma.department.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DepartmentFindFirstOrThrowArgs>(args?: SelectSubset<T, DepartmentFindFirstOrThrowArgs<ExtArgs>>): Prisma__DepartmentClient<$Result.GetResult<Prisma.$DepartmentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Departments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DepartmentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Departments
     * const departments = await prisma.department.findMany()
     * 
     * // Get first 10 Departments
     * const departments = await prisma.department.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const departmentWithIdOnly = await prisma.department.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DepartmentFindManyArgs>(args?: SelectSubset<T, DepartmentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DepartmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Department.
     * @param {DepartmentCreateArgs} args - Arguments to create a Department.
     * @example
     * // Create one Department
     * const Department = await prisma.department.create({
     *   data: {
     *     // ... data to create a Department
     *   }
     * })
     * 
     */
    create<T extends DepartmentCreateArgs>(args: SelectSubset<T, DepartmentCreateArgs<ExtArgs>>): Prisma__DepartmentClient<$Result.GetResult<Prisma.$DepartmentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Departments.
     * @param {DepartmentCreateManyArgs} args - Arguments to create many Departments.
     * @example
     * // Create many Departments
     * const department = await prisma.department.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DepartmentCreateManyArgs>(args?: SelectSubset<T, DepartmentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Departments and returns the data saved in the database.
     * @param {DepartmentCreateManyAndReturnArgs} args - Arguments to create many Departments.
     * @example
     * // Create many Departments
     * const department = await prisma.department.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Departments and only return the `id`
     * const departmentWithIdOnly = await prisma.department.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DepartmentCreateManyAndReturnArgs>(args?: SelectSubset<T, DepartmentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DepartmentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Department.
     * @param {DepartmentDeleteArgs} args - Arguments to delete one Department.
     * @example
     * // Delete one Department
     * const Department = await prisma.department.delete({
     *   where: {
     *     // ... filter to delete one Department
     *   }
     * })
     * 
     */
    delete<T extends DepartmentDeleteArgs>(args: SelectSubset<T, DepartmentDeleteArgs<ExtArgs>>): Prisma__DepartmentClient<$Result.GetResult<Prisma.$DepartmentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Department.
     * @param {DepartmentUpdateArgs} args - Arguments to update one Department.
     * @example
     * // Update one Department
     * const department = await prisma.department.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DepartmentUpdateArgs>(args: SelectSubset<T, DepartmentUpdateArgs<ExtArgs>>): Prisma__DepartmentClient<$Result.GetResult<Prisma.$DepartmentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Departments.
     * @param {DepartmentDeleteManyArgs} args - Arguments to filter Departments to delete.
     * @example
     * // Delete a few Departments
     * const { count } = await prisma.department.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DepartmentDeleteManyArgs>(args?: SelectSubset<T, DepartmentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Departments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DepartmentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Departments
     * const department = await prisma.department.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DepartmentUpdateManyArgs>(args: SelectSubset<T, DepartmentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Departments and returns the data updated in the database.
     * @param {DepartmentUpdateManyAndReturnArgs} args - Arguments to update many Departments.
     * @example
     * // Update many Departments
     * const department = await prisma.department.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Departments and only return the `id`
     * const departmentWithIdOnly = await prisma.department.updateManyAndReturn({
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
    updateManyAndReturn<T extends DepartmentUpdateManyAndReturnArgs>(args: SelectSubset<T, DepartmentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DepartmentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Department.
     * @param {DepartmentUpsertArgs} args - Arguments to update or create a Department.
     * @example
     * // Update or create a Department
     * const department = await prisma.department.upsert({
     *   create: {
     *     // ... data to create a Department
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Department we want to update
     *   }
     * })
     */
    upsert<T extends DepartmentUpsertArgs>(args: SelectSubset<T, DepartmentUpsertArgs<ExtArgs>>): Prisma__DepartmentClient<$Result.GetResult<Prisma.$DepartmentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Departments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DepartmentCountArgs} args - Arguments to filter Departments to count.
     * @example
     * // Count the number of Departments
     * const count = await prisma.department.count({
     *   where: {
     *     // ... the filter for the Departments we want to count
     *   }
     * })
    **/
    count<T extends DepartmentCountArgs>(
      args?: Subset<T, DepartmentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DepartmentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Department.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DepartmentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends DepartmentAggregateArgs>(args: Subset<T, DepartmentAggregateArgs>): Prisma.PrismaPromise<GetDepartmentAggregateType<T>>

    /**
     * Group by Department.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DepartmentGroupByArgs} args - Group by arguments.
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
      T extends DepartmentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DepartmentGroupByArgs['orderBy'] }
        : { orderBy?: DepartmentGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, DepartmentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDepartmentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Department model
   */
  readonly fields: DepartmentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Department.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DepartmentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    positions<T extends Department$positionsArgs<ExtArgs> = {}>(args?: Subset<T, Department$positionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PositionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Department model
   */
  interface DepartmentFieldRefs {
    readonly id: FieldRef<"Department", 'String'>
    readonly code: FieldRef<"Department", 'String'>
    readonly name_en: FieldRef<"Department", 'String'>
    readonly name_th: FieldRef<"Department", 'String'>
    readonly company_id: FieldRef<"Department", 'String'>
    readonly parent_department_id: FieldRef<"Department", 'String'>
    readonly cost_center: FieldRef<"Department", 'String'>
    readonly headcount: FieldRef<"Department", 'Int'>
    readonly budget: FieldRef<"Department", 'Int'>
    readonly created_at: FieldRef<"Department", 'DateTime'>
    readonly updated_at: FieldRef<"Department", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Department findUnique
   */
  export type DepartmentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Department
     */
    select?: DepartmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Department
     */
    omit?: DepartmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DepartmentInclude<ExtArgs> | null
    /**
     * Filter, which Department to fetch.
     */
    where: DepartmentWhereUniqueInput
  }

  /**
   * Department findUniqueOrThrow
   */
  export type DepartmentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Department
     */
    select?: DepartmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Department
     */
    omit?: DepartmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DepartmentInclude<ExtArgs> | null
    /**
     * Filter, which Department to fetch.
     */
    where: DepartmentWhereUniqueInput
  }

  /**
   * Department findFirst
   */
  export type DepartmentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Department
     */
    select?: DepartmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Department
     */
    omit?: DepartmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DepartmentInclude<ExtArgs> | null
    /**
     * Filter, which Department to fetch.
     */
    where?: DepartmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Departments to fetch.
     */
    orderBy?: DepartmentOrderByWithRelationInput | DepartmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Departments.
     */
    cursor?: DepartmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Departments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Departments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Departments.
     */
    distinct?: DepartmentScalarFieldEnum | DepartmentScalarFieldEnum[]
  }

  /**
   * Department findFirstOrThrow
   */
  export type DepartmentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Department
     */
    select?: DepartmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Department
     */
    omit?: DepartmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DepartmentInclude<ExtArgs> | null
    /**
     * Filter, which Department to fetch.
     */
    where?: DepartmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Departments to fetch.
     */
    orderBy?: DepartmentOrderByWithRelationInput | DepartmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Departments.
     */
    cursor?: DepartmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Departments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Departments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Departments.
     */
    distinct?: DepartmentScalarFieldEnum | DepartmentScalarFieldEnum[]
  }

  /**
   * Department findMany
   */
  export type DepartmentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Department
     */
    select?: DepartmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Department
     */
    omit?: DepartmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DepartmentInclude<ExtArgs> | null
    /**
     * Filter, which Departments to fetch.
     */
    where?: DepartmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Departments to fetch.
     */
    orderBy?: DepartmentOrderByWithRelationInput | DepartmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Departments.
     */
    cursor?: DepartmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Departments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Departments.
     */
    skip?: number
    distinct?: DepartmentScalarFieldEnum | DepartmentScalarFieldEnum[]
  }

  /**
   * Department create
   */
  export type DepartmentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Department
     */
    select?: DepartmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Department
     */
    omit?: DepartmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DepartmentInclude<ExtArgs> | null
    /**
     * The data needed to create a Department.
     */
    data: XOR<DepartmentCreateInput, DepartmentUncheckedCreateInput>
  }

  /**
   * Department createMany
   */
  export type DepartmentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Departments.
     */
    data: DepartmentCreateManyInput | DepartmentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Department createManyAndReturn
   */
  export type DepartmentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Department
     */
    select?: DepartmentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Department
     */
    omit?: DepartmentOmit<ExtArgs> | null
    /**
     * The data used to create many Departments.
     */
    data: DepartmentCreateManyInput | DepartmentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Department update
   */
  export type DepartmentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Department
     */
    select?: DepartmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Department
     */
    omit?: DepartmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DepartmentInclude<ExtArgs> | null
    /**
     * The data needed to update a Department.
     */
    data: XOR<DepartmentUpdateInput, DepartmentUncheckedUpdateInput>
    /**
     * Choose, which Department to update.
     */
    where: DepartmentWhereUniqueInput
  }

  /**
   * Department updateMany
   */
  export type DepartmentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Departments.
     */
    data: XOR<DepartmentUpdateManyMutationInput, DepartmentUncheckedUpdateManyInput>
    /**
     * Filter which Departments to update
     */
    where?: DepartmentWhereInput
    /**
     * Limit how many Departments to update.
     */
    limit?: number
  }

  /**
   * Department updateManyAndReturn
   */
  export type DepartmentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Department
     */
    select?: DepartmentSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Department
     */
    omit?: DepartmentOmit<ExtArgs> | null
    /**
     * The data used to update Departments.
     */
    data: XOR<DepartmentUpdateManyMutationInput, DepartmentUncheckedUpdateManyInput>
    /**
     * Filter which Departments to update
     */
    where?: DepartmentWhereInput
    /**
     * Limit how many Departments to update.
     */
    limit?: number
  }

  /**
   * Department upsert
   */
  export type DepartmentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Department
     */
    select?: DepartmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Department
     */
    omit?: DepartmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DepartmentInclude<ExtArgs> | null
    /**
     * The filter to search for the Department to update in case it exists.
     */
    where: DepartmentWhereUniqueInput
    /**
     * In case the Department found by the `where` argument doesn't exist, create a new Department with this data.
     */
    create: XOR<DepartmentCreateInput, DepartmentUncheckedCreateInput>
    /**
     * In case the Department was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DepartmentUpdateInput, DepartmentUncheckedUpdateInput>
  }

  /**
   * Department delete
   */
  export type DepartmentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Department
     */
    select?: DepartmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Department
     */
    omit?: DepartmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DepartmentInclude<ExtArgs> | null
    /**
     * Filter which Department to delete.
     */
    where: DepartmentWhereUniqueInput
  }

  /**
   * Department deleteMany
   */
  export type DepartmentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Departments to delete
     */
    where?: DepartmentWhereInput
    /**
     * Limit how many Departments to delete.
     */
    limit?: number
  }

  /**
   * Department.positions
   */
  export type Department$positionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Position
     */
    select?: PositionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Position
     */
    omit?: PositionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PositionInclude<ExtArgs> | null
    where?: PositionWhereInput
    orderBy?: PositionOrderByWithRelationInput | PositionOrderByWithRelationInput[]
    cursor?: PositionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PositionScalarFieldEnum | PositionScalarFieldEnum[]
  }

  /**
   * Department without action
   */
  export type DepartmentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Department
     */
    select?: DepartmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Department
     */
    omit?: DepartmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DepartmentInclude<ExtArgs> | null
  }


  /**
   * Model Position
   */

  export type AggregatePosition = {
    _count: PositionCountAggregateOutputType | null
    _avg: PositionAvgAggregateOutputType | null
    _sum: PositionSumAggregateOutputType | null
    _min: PositionMinAggregateOutputType | null
    _max: PositionMaxAggregateOutputType | null
  }

  export type PositionAvgAggregateOutputType = {
    headcount: number | null
    budget: number | null
  }

  export type PositionSumAggregateOutputType = {
    headcount: number | null
    budget: number | null
  }

  export type PositionMinAggregateOutputType = {
    id: string | null
    position_code: string | null
    title_en: string | null
    title_th: string | null
    department_id: string | null
    company_id: string | null
    job_grade: string | null
    job_family: string | null
    cost_center: string | null
    status: string | null
    reports_to_position_id: string | null
    matrix_reports_to_id: string | null
    headcount: number | null
    budget: number | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type PositionMaxAggregateOutputType = {
    id: string | null
    position_code: string | null
    title_en: string | null
    title_th: string | null
    department_id: string | null
    company_id: string | null
    job_grade: string | null
    job_family: string | null
    cost_center: string | null
    status: string | null
    reports_to_position_id: string | null
    matrix_reports_to_id: string | null
    headcount: number | null
    budget: number | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type PositionCountAggregateOutputType = {
    id: number
    position_code: number
    title_en: number
    title_th: number
    department_id: number
    company_id: number
    job_grade: number
    job_family: number
    cost_center: number
    status: number
    reports_to_position_id: number
    matrix_reports_to_id: number
    headcount: number
    budget: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type PositionAvgAggregateInputType = {
    headcount?: true
    budget?: true
  }

  export type PositionSumAggregateInputType = {
    headcount?: true
    budget?: true
  }

  export type PositionMinAggregateInputType = {
    id?: true
    position_code?: true
    title_en?: true
    title_th?: true
    department_id?: true
    company_id?: true
    job_grade?: true
    job_family?: true
    cost_center?: true
    status?: true
    reports_to_position_id?: true
    matrix_reports_to_id?: true
    headcount?: true
    budget?: true
    created_at?: true
    updated_at?: true
  }

  export type PositionMaxAggregateInputType = {
    id?: true
    position_code?: true
    title_en?: true
    title_th?: true
    department_id?: true
    company_id?: true
    job_grade?: true
    job_family?: true
    cost_center?: true
    status?: true
    reports_to_position_id?: true
    matrix_reports_to_id?: true
    headcount?: true
    budget?: true
    created_at?: true
    updated_at?: true
  }

  export type PositionCountAggregateInputType = {
    id?: true
    position_code?: true
    title_en?: true
    title_th?: true
    department_id?: true
    company_id?: true
    job_grade?: true
    job_family?: true
    cost_center?: true
    status?: true
    reports_to_position_id?: true
    matrix_reports_to_id?: true
    headcount?: true
    budget?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type PositionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Position to aggregate.
     */
    where?: PositionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Positions to fetch.
     */
    orderBy?: PositionOrderByWithRelationInput | PositionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PositionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Positions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Positions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Positions
    **/
    _count?: true | PositionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PositionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PositionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PositionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PositionMaxAggregateInputType
  }

  export type GetPositionAggregateType<T extends PositionAggregateArgs> = {
        [P in keyof T & keyof AggregatePosition]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePosition[P]>
      : GetScalarType<T[P], AggregatePosition[P]>
  }




  export type PositionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PositionWhereInput
    orderBy?: PositionOrderByWithAggregationInput | PositionOrderByWithAggregationInput[]
    by: PositionScalarFieldEnum[] | PositionScalarFieldEnum
    having?: PositionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PositionCountAggregateInputType | true
    _avg?: PositionAvgAggregateInputType
    _sum?: PositionSumAggregateInputType
    _min?: PositionMinAggregateInputType
    _max?: PositionMaxAggregateInputType
  }

  export type PositionGroupByOutputType = {
    id: string
    position_code: string
    title_en: string
    title_th: string | null
    department_id: string
    company_id: string
    job_grade: string | null
    job_family: string | null
    cost_center: string | null
    status: string
    reports_to_position_id: string | null
    matrix_reports_to_id: string | null
    headcount: number | null
    budget: number | null
    created_at: Date
    updated_at: Date
    _count: PositionCountAggregateOutputType | null
    _avg: PositionAvgAggregateOutputType | null
    _sum: PositionSumAggregateOutputType | null
    _min: PositionMinAggregateOutputType | null
    _max: PositionMaxAggregateOutputType | null
  }

  type GetPositionGroupByPayload<T extends PositionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PositionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PositionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PositionGroupByOutputType[P]>
            : GetScalarType<T[P], PositionGroupByOutputType[P]>
        }
      >
    >


  export type PositionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    position_code?: boolean
    title_en?: boolean
    title_th?: boolean
    department_id?: boolean
    company_id?: boolean
    job_grade?: boolean
    job_family?: boolean
    cost_center?: boolean
    status?: boolean
    reports_to_position_id?: boolean
    matrix_reports_to_id?: boolean
    headcount?: boolean
    budget?: boolean
    created_at?: boolean
    updated_at?: boolean
    department?: boolean | DepartmentDefaultArgs<ExtArgs>
    incumbents?: boolean | Position$incumbentsArgs<ExtArgs>
    _count?: boolean | PositionCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["position"]>

  export type PositionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    position_code?: boolean
    title_en?: boolean
    title_th?: boolean
    department_id?: boolean
    company_id?: boolean
    job_grade?: boolean
    job_family?: boolean
    cost_center?: boolean
    status?: boolean
    reports_to_position_id?: boolean
    matrix_reports_to_id?: boolean
    headcount?: boolean
    budget?: boolean
    created_at?: boolean
    updated_at?: boolean
    department?: boolean | DepartmentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["position"]>

  export type PositionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    position_code?: boolean
    title_en?: boolean
    title_th?: boolean
    department_id?: boolean
    company_id?: boolean
    job_grade?: boolean
    job_family?: boolean
    cost_center?: boolean
    status?: boolean
    reports_to_position_id?: boolean
    matrix_reports_to_id?: boolean
    headcount?: boolean
    budget?: boolean
    created_at?: boolean
    updated_at?: boolean
    department?: boolean | DepartmentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["position"]>

  export type PositionSelectScalar = {
    id?: boolean
    position_code?: boolean
    title_en?: boolean
    title_th?: boolean
    department_id?: boolean
    company_id?: boolean
    job_grade?: boolean
    job_family?: boolean
    cost_center?: boolean
    status?: boolean
    reports_to_position_id?: boolean
    matrix_reports_to_id?: boolean
    headcount?: boolean
    budget?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type PositionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "position_code" | "title_en" | "title_th" | "department_id" | "company_id" | "job_grade" | "job_family" | "cost_center" | "status" | "reports_to_position_id" | "matrix_reports_to_id" | "headcount" | "budget" | "created_at" | "updated_at", ExtArgs["result"]["position"]>
  export type PositionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    department?: boolean | DepartmentDefaultArgs<ExtArgs>
    incumbents?: boolean | Position$incumbentsArgs<ExtArgs>
    _count?: boolean | PositionCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type PositionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    department?: boolean | DepartmentDefaultArgs<ExtArgs>
  }
  export type PositionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    department?: boolean | DepartmentDefaultArgs<ExtArgs>
  }

  export type $PositionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Position"
    objects: {
      department: Prisma.$DepartmentPayload<ExtArgs>
      incumbents: Prisma.$IncumbentPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      position_code: string
      title_en: string
      title_th: string | null
      department_id: string
      company_id: string
      job_grade: string | null
      job_family: string | null
      cost_center: string | null
      status: string
      reports_to_position_id: string | null
      matrix_reports_to_id: string | null
      headcount: number | null
      budget: number | null
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["position"]>
    composites: {}
  }

  type PositionGetPayload<S extends boolean | null | undefined | PositionDefaultArgs> = $Result.GetResult<Prisma.$PositionPayload, S>

  type PositionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PositionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PositionCountAggregateInputType | true
    }

  export interface PositionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Position'], meta: { name: 'Position' } }
    /**
     * Find zero or one Position that matches the filter.
     * @param {PositionFindUniqueArgs} args - Arguments to find a Position
     * @example
     * // Get one Position
     * const position = await prisma.position.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PositionFindUniqueArgs>(args: SelectSubset<T, PositionFindUniqueArgs<ExtArgs>>): Prisma__PositionClient<$Result.GetResult<Prisma.$PositionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Position that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PositionFindUniqueOrThrowArgs} args - Arguments to find a Position
     * @example
     * // Get one Position
     * const position = await prisma.position.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PositionFindUniqueOrThrowArgs>(args: SelectSubset<T, PositionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PositionClient<$Result.GetResult<Prisma.$PositionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Position that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PositionFindFirstArgs} args - Arguments to find a Position
     * @example
     * // Get one Position
     * const position = await prisma.position.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PositionFindFirstArgs>(args?: SelectSubset<T, PositionFindFirstArgs<ExtArgs>>): Prisma__PositionClient<$Result.GetResult<Prisma.$PositionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Position that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PositionFindFirstOrThrowArgs} args - Arguments to find a Position
     * @example
     * // Get one Position
     * const position = await prisma.position.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PositionFindFirstOrThrowArgs>(args?: SelectSubset<T, PositionFindFirstOrThrowArgs<ExtArgs>>): Prisma__PositionClient<$Result.GetResult<Prisma.$PositionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Positions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PositionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Positions
     * const positions = await prisma.position.findMany()
     * 
     * // Get first 10 Positions
     * const positions = await prisma.position.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const positionWithIdOnly = await prisma.position.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PositionFindManyArgs>(args?: SelectSubset<T, PositionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PositionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Position.
     * @param {PositionCreateArgs} args - Arguments to create a Position.
     * @example
     * // Create one Position
     * const Position = await prisma.position.create({
     *   data: {
     *     // ... data to create a Position
     *   }
     * })
     * 
     */
    create<T extends PositionCreateArgs>(args: SelectSubset<T, PositionCreateArgs<ExtArgs>>): Prisma__PositionClient<$Result.GetResult<Prisma.$PositionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Positions.
     * @param {PositionCreateManyArgs} args - Arguments to create many Positions.
     * @example
     * // Create many Positions
     * const position = await prisma.position.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PositionCreateManyArgs>(args?: SelectSubset<T, PositionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Positions and returns the data saved in the database.
     * @param {PositionCreateManyAndReturnArgs} args - Arguments to create many Positions.
     * @example
     * // Create many Positions
     * const position = await prisma.position.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Positions and only return the `id`
     * const positionWithIdOnly = await prisma.position.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PositionCreateManyAndReturnArgs>(args?: SelectSubset<T, PositionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PositionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Position.
     * @param {PositionDeleteArgs} args - Arguments to delete one Position.
     * @example
     * // Delete one Position
     * const Position = await prisma.position.delete({
     *   where: {
     *     // ... filter to delete one Position
     *   }
     * })
     * 
     */
    delete<T extends PositionDeleteArgs>(args: SelectSubset<T, PositionDeleteArgs<ExtArgs>>): Prisma__PositionClient<$Result.GetResult<Prisma.$PositionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Position.
     * @param {PositionUpdateArgs} args - Arguments to update one Position.
     * @example
     * // Update one Position
     * const position = await prisma.position.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PositionUpdateArgs>(args: SelectSubset<T, PositionUpdateArgs<ExtArgs>>): Prisma__PositionClient<$Result.GetResult<Prisma.$PositionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Positions.
     * @param {PositionDeleteManyArgs} args - Arguments to filter Positions to delete.
     * @example
     * // Delete a few Positions
     * const { count } = await prisma.position.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PositionDeleteManyArgs>(args?: SelectSubset<T, PositionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Positions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PositionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Positions
     * const position = await prisma.position.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PositionUpdateManyArgs>(args: SelectSubset<T, PositionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Positions and returns the data updated in the database.
     * @param {PositionUpdateManyAndReturnArgs} args - Arguments to update many Positions.
     * @example
     * // Update many Positions
     * const position = await prisma.position.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Positions and only return the `id`
     * const positionWithIdOnly = await prisma.position.updateManyAndReturn({
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
    updateManyAndReturn<T extends PositionUpdateManyAndReturnArgs>(args: SelectSubset<T, PositionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PositionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Position.
     * @param {PositionUpsertArgs} args - Arguments to update or create a Position.
     * @example
     * // Update or create a Position
     * const position = await prisma.position.upsert({
     *   create: {
     *     // ... data to create a Position
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Position we want to update
     *   }
     * })
     */
    upsert<T extends PositionUpsertArgs>(args: SelectSubset<T, PositionUpsertArgs<ExtArgs>>): Prisma__PositionClient<$Result.GetResult<Prisma.$PositionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Positions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PositionCountArgs} args - Arguments to filter Positions to count.
     * @example
     * // Count the number of Positions
     * const count = await prisma.position.count({
     *   where: {
     *     // ... the filter for the Positions we want to count
     *   }
     * })
    **/
    count<T extends PositionCountArgs>(
      args?: Subset<T, PositionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PositionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Position.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PositionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends PositionAggregateArgs>(args: Subset<T, PositionAggregateArgs>): Prisma.PrismaPromise<GetPositionAggregateType<T>>

    /**
     * Group by Position.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PositionGroupByArgs} args - Group by arguments.
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
      T extends PositionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PositionGroupByArgs['orderBy'] }
        : { orderBy?: PositionGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, PositionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPositionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Position model
   */
  readonly fields: PositionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Position.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PositionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    department<T extends DepartmentDefaultArgs<ExtArgs> = {}>(args?: Subset<T, DepartmentDefaultArgs<ExtArgs>>): Prisma__DepartmentClient<$Result.GetResult<Prisma.$DepartmentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    incumbents<T extends Position$incumbentsArgs<ExtArgs> = {}>(args?: Subset<T, Position$incumbentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$IncumbentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Position model
   */
  interface PositionFieldRefs {
    readonly id: FieldRef<"Position", 'String'>
    readonly position_code: FieldRef<"Position", 'String'>
    readonly title_en: FieldRef<"Position", 'String'>
    readonly title_th: FieldRef<"Position", 'String'>
    readonly department_id: FieldRef<"Position", 'String'>
    readonly company_id: FieldRef<"Position", 'String'>
    readonly job_grade: FieldRef<"Position", 'String'>
    readonly job_family: FieldRef<"Position", 'String'>
    readonly cost_center: FieldRef<"Position", 'String'>
    readonly status: FieldRef<"Position", 'String'>
    readonly reports_to_position_id: FieldRef<"Position", 'String'>
    readonly matrix_reports_to_id: FieldRef<"Position", 'String'>
    readonly headcount: FieldRef<"Position", 'Int'>
    readonly budget: FieldRef<"Position", 'Int'>
    readonly created_at: FieldRef<"Position", 'DateTime'>
    readonly updated_at: FieldRef<"Position", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Position findUnique
   */
  export type PositionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Position
     */
    select?: PositionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Position
     */
    omit?: PositionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PositionInclude<ExtArgs> | null
    /**
     * Filter, which Position to fetch.
     */
    where: PositionWhereUniqueInput
  }

  /**
   * Position findUniqueOrThrow
   */
  export type PositionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Position
     */
    select?: PositionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Position
     */
    omit?: PositionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PositionInclude<ExtArgs> | null
    /**
     * Filter, which Position to fetch.
     */
    where: PositionWhereUniqueInput
  }

  /**
   * Position findFirst
   */
  export type PositionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Position
     */
    select?: PositionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Position
     */
    omit?: PositionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PositionInclude<ExtArgs> | null
    /**
     * Filter, which Position to fetch.
     */
    where?: PositionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Positions to fetch.
     */
    orderBy?: PositionOrderByWithRelationInput | PositionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Positions.
     */
    cursor?: PositionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Positions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Positions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Positions.
     */
    distinct?: PositionScalarFieldEnum | PositionScalarFieldEnum[]
  }

  /**
   * Position findFirstOrThrow
   */
  export type PositionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Position
     */
    select?: PositionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Position
     */
    omit?: PositionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PositionInclude<ExtArgs> | null
    /**
     * Filter, which Position to fetch.
     */
    where?: PositionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Positions to fetch.
     */
    orderBy?: PositionOrderByWithRelationInput | PositionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Positions.
     */
    cursor?: PositionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Positions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Positions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Positions.
     */
    distinct?: PositionScalarFieldEnum | PositionScalarFieldEnum[]
  }

  /**
   * Position findMany
   */
  export type PositionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Position
     */
    select?: PositionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Position
     */
    omit?: PositionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PositionInclude<ExtArgs> | null
    /**
     * Filter, which Positions to fetch.
     */
    where?: PositionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Positions to fetch.
     */
    orderBy?: PositionOrderByWithRelationInput | PositionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Positions.
     */
    cursor?: PositionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Positions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Positions.
     */
    skip?: number
    distinct?: PositionScalarFieldEnum | PositionScalarFieldEnum[]
  }

  /**
   * Position create
   */
  export type PositionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Position
     */
    select?: PositionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Position
     */
    omit?: PositionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PositionInclude<ExtArgs> | null
    /**
     * The data needed to create a Position.
     */
    data: XOR<PositionCreateInput, PositionUncheckedCreateInput>
  }

  /**
   * Position createMany
   */
  export type PositionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Positions.
     */
    data: PositionCreateManyInput | PositionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Position createManyAndReturn
   */
  export type PositionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Position
     */
    select?: PositionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Position
     */
    omit?: PositionOmit<ExtArgs> | null
    /**
     * The data used to create many Positions.
     */
    data: PositionCreateManyInput | PositionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PositionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Position update
   */
  export type PositionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Position
     */
    select?: PositionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Position
     */
    omit?: PositionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PositionInclude<ExtArgs> | null
    /**
     * The data needed to update a Position.
     */
    data: XOR<PositionUpdateInput, PositionUncheckedUpdateInput>
    /**
     * Choose, which Position to update.
     */
    where: PositionWhereUniqueInput
  }

  /**
   * Position updateMany
   */
  export type PositionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Positions.
     */
    data: XOR<PositionUpdateManyMutationInput, PositionUncheckedUpdateManyInput>
    /**
     * Filter which Positions to update
     */
    where?: PositionWhereInput
    /**
     * Limit how many Positions to update.
     */
    limit?: number
  }

  /**
   * Position updateManyAndReturn
   */
  export type PositionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Position
     */
    select?: PositionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Position
     */
    omit?: PositionOmit<ExtArgs> | null
    /**
     * The data used to update Positions.
     */
    data: XOR<PositionUpdateManyMutationInput, PositionUncheckedUpdateManyInput>
    /**
     * Filter which Positions to update
     */
    where?: PositionWhereInput
    /**
     * Limit how many Positions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PositionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Position upsert
   */
  export type PositionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Position
     */
    select?: PositionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Position
     */
    omit?: PositionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PositionInclude<ExtArgs> | null
    /**
     * The filter to search for the Position to update in case it exists.
     */
    where: PositionWhereUniqueInput
    /**
     * In case the Position found by the `where` argument doesn't exist, create a new Position with this data.
     */
    create: XOR<PositionCreateInput, PositionUncheckedCreateInput>
    /**
     * In case the Position was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PositionUpdateInput, PositionUncheckedUpdateInput>
  }

  /**
   * Position delete
   */
  export type PositionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Position
     */
    select?: PositionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Position
     */
    omit?: PositionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PositionInclude<ExtArgs> | null
    /**
     * Filter which Position to delete.
     */
    where: PositionWhereUniqueInput
  }

  /**
   * Position deleteMany
   */
  export type PositionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Positions to delete
     */
    where?: PositionWhereInput
    /**
     * Limit how many Positions to delete.
     */
    limit?: number
  }

  /**
   * Position.incumbents
   */
  export type Position$incumbentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Incumbent
     */
    select?: IncumbentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Incumbent
     */
    omit?: IncumbentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IncumbentInclude<ExtArgs> | null
    where?: IncumbentWhereInput
    orderBy?: IncumbentOrderByWithRelationInput | IncumbentOrderByWithRelationInput[]
    cursor?: IncumbentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: IncumbentScalarFieldEnum | IncumbentScalarFieldEnum[]
  }

  /**
   * Position without action
   */
  export type PositionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Position
     */
    select?: PositionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Position
     */
    omit?: PositionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PositionInclude<ExtArgs> | null
  }


  /**
   * Model Incumbent
   */

  export type AggregateIncumbent = {
    _count: IncumbentCountAggregateOutputType | null
    _min: IncumbentMinAggregateOutputType | null
    _max: IncumbentMaxAggregateOutputType | null
  }

  export type IncumbentMinAggregateOutputType = {
    id: string | null
    employee_id: string | null
    position_id: string | null
    start_date: Date | null
    end_date: Date | null
    is_primary: boolean | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type IncumbentMaxAggregateOutputType = {
    id: string | null
    employee_id: string | null
    position_id: string | null
    start_date: Date | null
    end_date: Date | null
    is_primary: boolean | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type IncumbentCountAggregateOutputType = {
    id: number
    employee_id: number
    position_id: number
    start_date: number
    end_date: number
    is_primary: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type IncumbentMinAggregateInputType = {
    id?: true
    employee_id?: true
    position_id?: true
    start_date?: true
    end_date?: true
    is_primary?: true
    created_at?: true
    updated_at?: true
  }

  export type IncumbentMaxAggregateInputType = {
    id?: true
    employee_id?: true
    position_id?: true
    start_date?: true
    end_date?: true
    is_primary?: true
    created_at?: true
    updated_at?: true
  }

  export type IncumbentCountAggregateInputType = {
    id?: true
    employee_id?: true
    position_id?: true
    start_date?: true
    end_date?: true
    is_primary?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type IncumbentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Incumbent to aggregate.
     */
    where?: IncumbentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Incumbents to fetch.
     */
    orderBy?: IncumbentOrderByWithRelationInput | IncumbentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: IncumbentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Incumbents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Incumbents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Incumbents
    **/
    _count?: true | IncumbentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: IncumbentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: IncumbentMaxAggregateInputType
  }

  export type GetIncumbentAggregateType<T extends IncumbentAggregateArgs> = {
        [P in keyof T & keyof AggregateIncumbent]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateIncumbent[P]>
      : GetScalarType<T[P], AggregateIncumbent[P]>
  }




  export type IncumbentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: IncumbentWhereInput
    orderBy?: IncumbentOrderByWithAggregationInput | IncumbentOrderByWithAggregationInput[]
    by: IncumbentScalarFieldEnum[] | IncumbentScalarFieldEnum
    having?: IncumbentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: IncumbentCountAggregateInputType | true
    _min?: IncumbentMinAggregateInputType
    _max?: IncumbentMaxAggregateInputType
  }

  export type IncumbentGroupByOutputType = {
    id: string
    employee_id: string
    position_id: string
    start_date: Date
    end_date: Date | null
    is_primary: boolean
    created_at: Date
    updated_at: Date
    _count: IncumbentCountAggregateOutputType | null
    _min: IncumbentMinAggregateOutputType | null
    _max: IncumbentMaxAggregateOutputType | null
  }

  type GetIncumbentGroupByPayload<T extends IncumbentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<IncumbentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof IncumbentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], IncumbentGroupByOutputType[P]>
            : GetScalarType<T[P], IncumbentGroupByOutputType[P]>
        }
      >
    >


  export type IncumbentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    employee_id?: boolean
    position_id?: boolean
    start_date?: boolean
    end_date?: boolean
    is_primary?: boolean
    created_at?: boolean
    updated_at?: boolean
    position?: boolean | PositionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["incumbent"]>

  export type IncumbentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    employee_id?: boolean
    position_id?: boolean
    start_date?: boolean
    end_date?: boolean
    is_primary?: boolean
    created_at?: boolean
    updated_at?: boolean
    position?: boolean | PositionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["incumbent"]>

  export type IncumbentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    employee_id?: boolean
    position_id?: boolean
    start_date?: boolean
    end_date?: boolean
    is_primary?: boolean
    created_at?: boolean
    updated_at?: boolean
    position?: boolean | PositionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["incumbent"]>

  export type IncumbentSelectScalar = {
    id?: boolean
    employee_id?: boolean
    position_id?: boolean
    start_date?: boolean
    end_date?: boolean
    is_primary?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type IncumbentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "employee_id" | "position_id" | "start_date" | "end_date" | "is_primary" | "created_at" | "updated_at", ExtArgs["result"]["incumbent"]>
  export type IncumbentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    position?: boolean | PositionDefaultArgs<ExtArgs>
  }
  export type IncumbentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    position?: boolean | PositionDefaultArgs<ExtArgs>
  }
  export type IncumbentIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    position?: boolean | PositionDefaultArgs<ExtArgs>
  }

  export type $IncumbentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Incumbent"
    objects: {
      position: Prisma.$PositionPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      employee_id: string
      position_id: string
      start_date: Date
      end_date: Date | null
      is_primary: boolean
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["incumbent"]>
    composites: {}
  }

  type IncumbentGetPayload<S extends boolean | null | undefined | IncumbentDefaultArgs> = $Result.GetResult<Prisma.$IncumbentPayload, S>

  type IncumbentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<IncumbentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: IncumbentCountAggregateInputType | true
    }

  export interface IncumbentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Incumbent'], meta: { name: 'Incumbent' } }
    /**
     * Find zero or one Incumbent that matches the filter.
     * @param {IncumbentFindUniqueArgs} args - Arguments to find a Incumbent
     * @example
     * // Get one Incumbent
     * const incumbent = await prisma.incumbent.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends IncumbentFindUniqueArgs>(args: SelectSubset<T, IncumbentFindUniqueArgs<ExtArgs>>): Prisma__IncumbentClient<$Result.GetResult<Prisma.$IncumbentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Incumbent that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {IncumbentFindUniqueOrThrowArgs} args - Arguments to find a Incumbent
     * @example
     * // Get one Incumbent
     * const incumbent = await prisma.incumbent.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends IncumbentFindUniqueOrThrowArgs>(args: SelectSubset<T, IncumbentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__IncumbentClient<$Result.GetResult<Prisma.$IncumbentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Incumbent that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IncumbentFindFirstArgs} args - Arguments to find a Incumbent
     * @example
     * // Get one Incumbent
     * const incumbent = await prisma.incumbent.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends IncumbentFindFirstArgs>(args?: SelectSubset<T, IncumbentFindFirstArgs<ExtArgs>>): Prisma__IncumbentClient<$Result.GetResult<Prisma.$IncumbentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Incumbent that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IncumbentFindFirstOrThrowArgs} args - Arguments to find a Incumbent
     * @example
     * // Get one Incumbent
     * const incumbent = await prisma.incumbent.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends IncumbentFindFirstOrThrowArgs>(args?: SelectSubset<T, IncumbentFindFirstOrThrowArgs<ExtArgs>>): Prisma__IncumbentClient<$Result.GetResult<Prisma.$IncumbentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Incumbents that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IncumbentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Incumbents
     * const incumbents = await prisma.incumbent.findMany()
     * 
     * // Get first 10 Incumbents
     * const incumbents = await prisma.incumbent.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const incumbentWithIdOnly = await prisma.incumbent.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends IncumbentFindManyArgs>(args?: SelectSubset<T, IncumbentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$IncumbentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Incumbent.
     * @param {IncumbentCreateArgs} args - Arguments to create a Incumbent.
     * @example
     * // Create one Incumbent
     * const Incumbent = await prisma.incumbent.create({
     *   data: {
     *     // ... data to create a Incumbent
     *   }
     * })
     * 
     */
    create<T extends IncumbentCreateArgs>(args: SelectSubset<T, IncumbentCreateArgs<ExtArgs>>): Prisma__IncumbentClient<$Result.GetResult<Prisma.$IncumbentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Incumbents.
     * @param {IncumbentCreateManyArgs} args - Arguments to create many Incumbents.
     * @example
     * // Create many Incumbents
     * const incumbent = await prisma.incumbent.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends IncumbentCreateManyArgs>(args?: SelectSubset<T, IncumbentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Incumbents and returns the data saved in the database.
     * @param {IncumbentCreateManyAndReturnArgs} args - Arguments to create many Incumbents.
     * @example
     * // Create many Incumbents
     * const incumbent = await prisma.incumbent.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Incumbents and only return the `id`
     * const incumbentWithIdOnly = await prisma.incumbent.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends IncumbentCreateManyAndReturnArgs>(args?: SelectSubset<T, IncumbentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$IncumbentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Incumbent.
     * @param {IncumbentDeleteArgs} args - Arguments to delete one Incumbent.
     * @example
     * // Delete one Incumbent
     * const Incumbent = await prisma.incumbent.delete({
     *   where: {
     *     // ... filter to delete one Incumbent
     *   }
     * })
     * 
     */
    delete<T extends IncumbentDeleteArgs>(args: SelectSubset<T, IncumbentDeleteArgs<ExtArgs>>): Prisma__IncumbentClient<$Result.GetResult<Prisma.$IncumbentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Incumbent.
     * @param {IncumbentUpdateArgs} args - Arguments to update one Incumbent.
     * @example
     * // Update one Incumbent
     * const incumbent = await prisma.incumbent.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends IncumbentUpdateArgs>(args: SelectSubset<T, IncumbentUpdateArgs<ExtArgs>>): Prisma__IncumbentClient<$Result.GetResult<Prisma.$IncumbentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Incumbents.
     * @param {IncumbentDeleteManyArgs} args - Arguments to filter Incumbents to delete.
     * @example
     * // Delete a few Incumbents
     * const { count } = await prisma.incumbent.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends IncumbentDeleteManyArgs>(args?: SelectSubset<T, IncumbentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Incumbents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IncumbentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Incumbents
     * const incumbent = await prisma.incumbent.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends IncumbentUpdateManyArgs>(args: SelectSubset<T, IncumbentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Incumbents and returns the data updated in the database.
     * @param {IncumbentUpdateManyAndReturnArgs} args - Arguments to update many Incumbents.
     * @example
     * // Update many Incumbents
     * const incumbent = await prisma.incumbent.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Incumbents and only return the `id`
     * const incumbentWithIdOnly = await prisma.incumbent.updateManyAndReturn({
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
    updateManyAndReturn<T extends IncumbentUpdateManyAndReturnArgs>(args: SelectSubset<T, IncumbentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$IncumbentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Incumbent.
     * @param {IncumbentUpsertArgs} args - Arguments to update or create a Incumbent.
     * @example
     * // Update or create a Incumbent
     * const incumbent = await prisma.incumbent.upsert({
     *   create: {
     *     // ... data to create a Incumbent
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Incumbent we want to update
     *   }
     * })
     */
    upsert<T extends IncumbentUpsertArgs>(args: SelectSubset<T, IncumbentUpsertArgs<ExtArgs>>): Prisma__IncumbentClient<$Result.GetResult<Prisma.$IncumbentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Incumbents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IncumbentCountArgs} args - Arguments to filter Incumbents to count.
     * @example
     * // Count the number of Incumbents
     * const count = await prisma.incumbent.count({
     *   where: {
     *     // ... the filter for the Incumbents we want to count
     *   }
     * })
    **/
    count<T extends IncumbentCountArgs>(
      args?: Subset<T, IncumbentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], IncumbentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Incumbent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IncumbentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends IncumbentAggregateArgs>(args: Subset<T, IncumbentAggregateArgs>): Prisma.PrismaPromise<GetIncumbentAggregateType<T>>

    /**
     * Group by Incumbent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IncumbentGroupByArgs} args - Group by arguments.
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
      T extends IncumbentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: IncumbentGroupByArgs['orderBy'] }
        : { orderBy?: IncumbentGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, IncumbentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetIncumbentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Incumbent model
   */
  readonly fields: IncumbentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Incumbent.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__IncumbentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    position<T extends PositionDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PositionDefaultArgs<ExtArgs>>): Prisma__PositionClient<$Result.GetResult<Prisma.$PositionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the Incumbent model
   */
  interface IncumbentFieldRefs {
    readonly id: FieldRef<"Incumbent", 'String'>
    readonly employee_id: FieldRef<"Incumbent", 'String'>
    readonly position_id: FieldRef<"Incumbent", 'String'>
    readonly start_date: FieldRef<"Incumbent", 'DateTime'>
    readonly end_date: FieldRef<"Incumbent", 'DateTime'>
    readonly is_primary: FieldRef<"Incumbent", 'Boolean'>
    readonly created_at: FieldRef<"Incumbent", 'DateTime'>
    readonly updated_at: FieldRef<"Incumbent", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Incumbent findUnique
   */
  export type IncumbentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Incumbent
     */
    select?: IncumbentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Incumbent
     */
    omit?: IncumbentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IncumbentInclude<ExtArgs> | null
    /**
     * Filter, which Incumbent to fetch.
     */
    where: IncumbentWhereUniqueInput
  }

  /**
   * Incumbent findUniqueOrThrow
   */
  export type IncumbentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Incumbent
     */
    select?: IncumbentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Incumbent
     */
    omit?: IncumbentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IncumbentInclude<ExtArgs> | null
    /**
     * Filter, which Incumbent to fetch.
     */
    where: IncumbentWhereUniqueInput
  }

  /**
   * Incumbent findFirst
   */
  export type IncumbentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Incumbent
     */
    select?: IncumbentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Incumbent
     */
    omit?: IncumbentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IncumbentInclude<ExtArgs> | null
    /**
     * Filter, which Incumbent to fetch.
     */
    where?: IncumbentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Incumbents to fetch.
     */
    orderBy?: IncumbentOrderByWithRelationInput | IncumbentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Incumbents.
     */
    cursor?: IncumbentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Incumbents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Incumbents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Incumbents.
     */
    distinct?: IncumbentScalarFieldEnum | IncumbentScalarFieldEnum[]
  }

  /**
   * Incumbent findFirstOrThrow
   */
  export type IncumbentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Incumbent
     */
    select?: IncumbentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Incumbent
     */
    omit?: IncumbentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IncumbentInclude<ExtArgs> | null
    /**
     * Filter, which Incumbent to fetch.
     */
    where?: IncumbentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Incumbents to fetch.
     */
    orderBy?: IncumbentOrderByWithRelationInput | IncumbentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Incumbents.
     */
    cursor?: IncumbentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Incumbents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Incumbents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Incumbents.
     */
    distinct?: IncumbentScalarFieldEnum | IncumbentScalarFieldEnum[]
  }

  /**
   * Incumbent findMany
   */
  export type IncumbentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Incumbent
     */
    select?: IncumbentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Incumbent
     */
    omit?: IncumbentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IncumbentInclude<ExtArgs> | null
    /**
     * Filter, which Incumbents to fetch.
     */
    where?: IncumbentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Incumbents to fetch.
     */
    orderBy?: IncumbentOrderByWithRelationInput | IncumbentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Incumbents.
     */
    cursor?: IncumbentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Incumbents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Incumbents.
     */
    skip?: number
    distinct?: IncumbentScalarFieldEnum | IncumbentScalarFieldEnum[]
  }

  /**
   * Incumbent create
   */
  export type IncumbentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Incumbent
     */
    select?: IncumbentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Incumbent
     */
    omit?: IncumbentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IncumbentInclude<ExtArgs> | null
    /**
     * The data needed to create a Incumbent.
     */
    data: XOR<IncumbentCreateInput, IncumbentUncheckedCreateInput>
  }

  /**
   * Incumbent createMany
   */
  export type IncumbentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Incumbents.
     */
    data: IncumbentCreateManyInput | IncumbentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Incumbent createManyAndReturn
   */
  export type IncumbentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Incumbent
     */
    select?: IncumbentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Incumbent
     */
    omit?: IncumbentOmit<ExtArgs> | null
    /**
     * The data used to create many Incumbents.
     */
    data: IncumbentCreateManyInput | IncumbentCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IncumbentIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Incumbent update
   */
  export type IncumbentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Incumbent
     */
    select?: IncumbentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Incumbent
     */
    omit?: IncumbentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IncumbentInclude<ExtArgs> | null
    /**
     * The data needed to update a Incumbent.
     */
    data: XOR<IncumbentUpdateInput, IncumbentUncheckedUpdateInput>
    /**
     * Choose, which Incumbent to update.
     */
    where: IncumbentWhereUniqueInput
  }

  /**
   * Incumbent updateMany
   */
  export type IncumbentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Incumbents.
     */
    data: XOR<IncumbentUpdateManyMutationInput, IncumbentUncheckedUpdateManyInput>
    /**
     * Filter which Incumbents to update
     */
    where?: IncumbentWhereInput
    /**
     * Limit how many Incumbents to update.
     */
    limit?: number
  }

  /**
   * Incumbent updateManyAndReturn
   */
  export type IncumbentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Incumbent
     */
    select?: IncumbentSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Incumbent
     */
    omit?: IncumbentOmit<ExtArgs> | null
    /**
     * The data used to update Incumbents.
     */
    data: XOR<IncumbentUpdateManyMutationInput, IncumbentUncheckedUpdateManyInput>
    /**
     * Filter which Incumbents to update
     */
    where?: IncumbentWhereInput
    /**
     * Limit how many Incumbents to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IncumbentIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Incumbent upsert
   */
  export type IncumbentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Incumbent
     */
    select?: IncumbentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Incumbent
     */
    omit?: IncumbentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IncumbentInclude<ExtArgs> | null
    /**
     * The filter to search for the Incumbent to update in case it exists.
     */
    where: IncumbentWhereUniqueInput
    /**
     * In case the Incumbent found by the `where` argument doesn't exist, create a new Incumbent with this data.
     */
    create: XOR<IncumbentCreateInput, IncumbentUncheckedCreateInput>
    /**
     * In case the Incumbent was found with the provided `where` argument, update it with this data.
     */
    update: XOR<IncumbentUpdateInput, IncumbentUncheckedUpdateInput>
  }

  /**
   * Incumbent delete
   */
  export type IncumbentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Incumbent
     */
    select?: IncumbentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Incumbent
     */
    omit?: IncumbentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IncumbentInclude<ExtArgs> | null
    /**
     * Filter which Incumbent to delete.
     */
    where: IncumbentWhereUniqueInput
  }

  /**
   * Incumbent deleteMany
   */
  export type IncumbentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Incumbents to delete
     */
    where?: IncumbentWhereInput
    /**
     * Limit how many Incumbents to delete.
     */
    limit?: number
  }

  /**
   * Incumbent without action
   */
  export type IncumbentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Incumbent
     */
    select?: IncumbentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Incumbent
     */
    omit?: IncumbentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IncumbentInclude<ExtArgs> | null
  }


  /**
   * Model OrgNode
   */

  export type AggregateOrgNode = {
    _count: OrgNodeCountAggregateOutputType | null
    _avg: OrgNodeAvgAggregateOutputType | null
    _sum: OrgNodeSumAggregateOutputType | null
    _min: OrgNodeMinAggregateOutputType | null
    _max: OrgNodeMaxAggregateOutputType | null
  }

  export type OrgNodeAvgAggregateOutputType = {
    headcount: number | null
    total_headcount: number | null
  }

  export type OrgNodeSumAggregateOutputType = {
    headcount: number | null
    total_headcount: number | null
  }

  export type OrgNodeMinAggregateOutputType = {
    id: string | null
    employee_id: string | null
    name_en: string | null
    name_th: string | null
    position_title_en: string | null
    position_title_th: string | null
    department_id: string | null
    company_id: string | null
    photo_url: string | null
    email: string | null
    phone: string | null
    headcount: number | null
    total_headcount: number | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type OrgNodeMaxAggregateOutputType = {
    id: string | null
    employee_id: string | null
    name_en: string | null
    name_th: string | null
    position_title_en: string | null
    position_title_th: string | null
    department_id: string | null
    company_id: string | null
    photo_url: string | null
    email: string | null
    phone: string | null
    headcount: number | null
    total_headcount: number | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type OrgNodeCountAggregateOutputType = {
    id: number
    employee_id: number
    name_en: number
    name_th: number
    position_title_en: number
    position_title_th: number
    department_id: number
    company_id: number
    photo_url: number
    email: number
    phone: number
    headcount: number
    total_headcount: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type OrgNodeAvgAggregateInputType = {
    headcount?: true
    total_headcount?: true
  }

  export type OrgNodeSumAggregateInputType = {
    headcount?: true
    total_headcount?: true
  }

  export type OrgNodeMinAggregateInputType = {
    id?: true
    employee_id?: true
    name_en?: true
    name_th?: true
    position_title_en?: true
    position_title_th?: true
    department_id?: true
    company_id?: true
    photo_url?: true
    email?: true
    phone?: true
    headcount?: true
    total_headcount?: true
    created_at?: true
    updated_at?: true
  }

  export type OrgNodeMaxAggregateInputType = {
    id?: true
    employee_id?: true
    name_en?: true
    name_th?: true
    position_title_en?: true
    position_title_th?: true
    department_id?: true
    company_id?: true
    photo_url?: true
    email?: true
    phone?: true
    headcount?: true
    total_headcount?: true
    created_at?: true
    updated_at?: true
  }

  export type OrgNodeCountAggregateInputType = {
    id?: true
    employee_id?: true
    name_en?: true
    name_th?: true
    position_title_en?: true
    position_title_th?: true
    department_id?: true
    company_id?: true
    photo_url?: true
    email?: true
    phone?: true
    headcount?: true
    total_headcount?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type OrgNodeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which OrgNode to aggregate.
     */
    where?: OrgNodeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OrgNodes to fetch.
     */
    orderBy?: OrgNodeOrderByWithRelationInput | OrgNodeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: OrgNodeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OrgNodes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OrgNodes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned OrgNodes
    **/
    _count?: true | OrgNodeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: OrgNodeAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: OrgNodeSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: OrgNodeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: OrgNodeMaxAggregateInputType
  }

  export type GetOrgNodeAggregateType<T extends OrgNodeAggregateArgs> = {
        [P in keyof T & keyof AggregateOrgNode]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOrgNode[P]>
      : GetScalarType<T[P], AggregateOrgNode[P]>
  }




  export type OrgNodeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrgNodeWhereInput
    orderBy?: OrgNodeOrderByWithAggregationInput | OrgNodeOrderByWithAggregationInput[]
    by: OrgNodeScalarFieldEnum[] | OrgNodeScalarFieldEnum
    having?: OrgNodeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: OrgNodeCountAggregateInputType | true
    _avg?: OrgNodeAvgAggregateInputType
    _sum?: OrgNodeSumAggregateInputType
    _min?: OrgNodeMinAggregateInputType
    _max?: OrgNodeMaxAggregateInputType
  }

  export type OrgNodeGroupByOutputType = {
    id: string
    employee_id: string
    name_en: string
    name_th: string | null
    position_title_en: string | null
    position_title_th: string | null
    department_id: string | null
    company_id: string | null
    photo_url: string | null
    email: string | null
    phone: string | null
    headcount: number | null
    total_headcount: number | null
    created_at: Date
    updated_at: Date
    _count: OrgNodeCountAggregateOutputType | null
    _avg: OrgNodeAvgAggregateOutputType | null
    _sum: OrgNodeSumAggregateOutputType | null
    _min: OrgNodeMinAggregateOutputType | null
    _max: OrgNodeMaxAggregateOutputType | null
  }

  type GetOrgNodeGroupByPayload<T extends OrgNodeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<OrgNodeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof OrgNodeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], OrgNodeGroupByOutputType[P]>
            : GetScalarType<T[P], OrgNodeGroupByOutputType[P]>
        }
      >
    >


  export type OrgNodeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    employee_id?: boolean
    name_en?: boolean
    name_th?: boolean
    position_title_en?: boolean
    position_title_th?: boolean
    department_id?: boolean
    company_id?: boolean
    photo_url?: boolean
    email?: boolean
    phone?: boolean
    headcount?: boolean
    total_headcount?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["orgNode"]>

  export type OrgNodeSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    employee_id?: boolean
    name_en?: boolean
    name_th?: boolean
    position_title_en?: boolean
    position_title_th?: boolean
    department_id?: boolean
    company_id?: boolean
    photo_url?: boolean
    email?: boolean
    phone?: boolean
    headcount?: boolean
    total_headcount?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["orgNode"]>

  export type OrgNodeSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    employee_id?: boolean
    name_en?: boolean
    name_th?: boolean
    position_title_en?: boolean
    position_title_th?: boolean
    department_id?: boolean
    company_id?: boolean
    photo_url?: boolean
    email?: boolean
    phone?: boolean
    headcount?: boolean
    total_headcount?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["orgNode"]>

  export type OrgNodeSelectScalar = {
    id?: boolean
    employee_id?: boolean
    name_en?: boolean
    name_th?: boolean
    position_title_en?: boolean
    position_title_th?: boolean
    department_id?: boolean
    company_id?: boolean
    photo_url?: boolean
    email?: boolean
    phone?: boolean
    headcount?: boolean
    total_headcount?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type OrgNodeOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "employee_id" | "name_en" | "name_th" | "position_title_en" | "position_title_th" | "department_id" | "company_id" | "photo_url" | "email" | "phone" | "headcount" | "total_headcount" | "created_at" | "updated_at", ExtArgs["result"]["orgNode"]>

  export type $OrgNodePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "OrgNode"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      employee_id: string
      name_en: string
      name_th: string | null
      position_title_en: string | null
      position_title_th: string | null
      department_id: string | null
      company_id: string | null
      photo_url: string | null
      email: string | null
      phone: string | null
      headcount: number | null
      total_headcount: number | null
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["orgNode"]>
    composites: {}
  }

  type OrgNodeGetPayload<S extends boolean | null | undefined | OrgNodeDefaultArgs> = $Result.GetResult<Prisma.$OrgNodePayload, S>

  type OrgNodeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<OrgNodeFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: OrgNodeCountAggregateInputType | true
    }

  export interface OrgNodeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['OrgNode'], meta: { name: 'OrgNode' } }
    /**
     * Find zero or one OrgNode that matches the filter.
     * @param {OrgNodeFindUniqueArgs} args - Arguments to find a OrgNode
     * @example
     * // Get one OrgNode
     * const orgNode = await prisma.orgNode.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends OrgNodeFindUniqueArgs>(args: SelectSubset<T, OrgNodeFindUniqueArgs<ExtArgs>>): Prisma__OrgNodeClient<$Result.GetResult<Prisma.$OrgNodePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one OrgNode that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {OrgNodeFindUniqueOrThrowArgs} args - Arguments to find a OrgNode
     * @example
     * // Get one OrgNode
     * const orgNode = await prisma.orgNode.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends OrgNodeFindUniqueOrThrowArgs>(args: SelectSubset<T, OrgNodeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__OrgNodeClient<$Result.GetResult<Prisma.$OrgNodePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first OrgNode that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrgNodeFindFirstArgs} args - Arguments to find a OrgNode
     * @example
     * // Get one OrgNode
     * const orgNode = await prisma.orgNode.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends OrgNodeFindFirstArgs>(args?: SelectSubset<T, OrgNodeFindFirstArgs<ExtArgs>>): Prisma__OrgNodeClient<$Result.GetResult<Prisma.$OrgNodePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first OrgNode that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrgNodeFindFirstOrThrowArgs} args - Arguments to find a OrgNode
     * @example
     * // Get one OrgNode
     * const orgNode = await prisma.orgNode.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends OrgNodeFindFirstOrThrowArgs>(args?: SelectSubset<T, OrgNodeFindFirstOrThrowArgs<ExtArgs>>): Prisma__OrgNodeClient<$Result.GetResult<Prisma.$OrgNodePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more OrgNodes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrgNodeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all OrgNodes
     * const orgNodes = await prisma.orgNode.findMany()
     * 
     * // Get first 10 OrgNodes
     * const orgNodes = await prisma.orgNode.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const orgNodeWithIdOnly = await prisma.orgNode.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends OrgNodeFindManyArgs>(args?: SelectSubset<T, OrgNodeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrgNodePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a OrgNode.
     * @param {OrgNodeCreateArgs} args - Arguments to create a OrgNode.
     * @example
     * // Create one OrgNode
     * const OrgNode = await prisma.orgNode.create({
     *   data: {
     *     // ... data to create a OrgNode
     *   }
     * })
     * 
     */
    create<T extends OrgNodeCreateArgs>(args: SelectSubset<T, OrgNodeCreateArgs<ExtArgs>>): Prisma__OrgNodeClient<$Result.GetResult<Prisma.$OrgNodePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many OrgNodes.
     * @param {OrgNodeCreateManyArgs} args - Arguments to create many OrgNodes.
     * @example
     * // Create many OrgNodes
     * const orgNode = await prisma.orgNode.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends OrgNodeCreateManyArgs>(args?: SelectSubset<T, OrgNodeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many OrgNodes and returns the data saved in the database.
     * @param {OrgNodeCreateManyAndReturnArgs} args - Arguments to create many OrgNodes.
     * @example
     * // Create many OrgNodes
     * const orgNode = await prisma.orgNode.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many OrgNodes and only return the `id`
     * const orgNodeWithIdOnly = await prisma.orgNode.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends OrgNodeCreateManyAndReturnArgs>(args?: SelectSubset<T, OrgNodeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrgNodePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a OrgNode.
     * @param {OrgNodeDeleteArgs} args - Arguments to delete one OrgNode.
     * @example
     * // Delete one OrgNode
     * const OrgNode = await prisma.orgNode.delete({
     *   where: {
     *     // ... filter to delete one OrgNode
     *   }
     * })
     * 
     */
    delete<T extends OrgNodeDeleteArgs>(args: SelectSubset<T, OrgNodeDeleteArgs<ExtArgs>>): Prisma__OrgNodeClient<$Result.GetResult<Prisma.$OrgNodePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one OrgNode.
     * @param {OrgNodeUpdateArgs} args - Arguments to update one OrgNode.
     * @example
     * // Update one OrgNode
     * const orgNode = await prisma.orgNode.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends OrgNodeUpdateArgs>(args: SelectSubset<T, OrgNodeUpdateArgs<ExtArgs>>): Prisma__OrgNodeClient<$Result.GetResult<Prisma.$OrgNodePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more OrgNodes.
     * @param {OrgNodeDeleteManyArgs} args - Arguments to filter OrgNodes to delete.
     * @example
     * // Delete a few OrgNodes
     * const { count } = await prisma.orgNode.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends OrgNodeDeleteManyArgs>(args?: SelectSubset<T, OrgNodeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more OrgNodes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrgNodeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many OrgNodes
     * const orgNode = await prisma.orgNode.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends OrgNodeUpdateManyArgs>(args: SelectSubset<T, OrgNodeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more OrgNodes and returns the data updated in the database.
     * @param {OrgNodeUpdateManyAndReturnArgs} args - Arguments to update many OrgNodes.
     * @example
     * // Update many OrgNodes
     * const orgNode = await prisma.orgNode.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more OrgNodes and only return the `id`
     * const orgNodeWithIdOnly = await prisma.orgNode.updateManyAndReturn({
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
    updateManyAndReturn<T extends OrgNodeUpdateManyAndReturnArgs>(args: SelectSubset<T, OrgNodeUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrgNodePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one OrgNode.
     * @param {OrgNodeUpsertArgs} args - Arguments to update or create a OrgNode.
     * @example
     * // Update or create a OrgNode
     * const orgNode = await prisma.orgNode.upsert({
     *   create: {
     *     // ... data to create a OrgNode
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the OrgNode we want to update
     *   }
     * })
     */
    upsert<T extends OrgNodeUpsertArgs>(args: SelectSubset<T, OrgNodeUpsertArgs<ExtArgs>>): Prisma__OrgNodeClient<$Result.GetResult<Prisma.$OrgNodePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of OrgNodes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrgNodeCountArgs} args - Arguments to filter OrgNodes to count.
     * @example
     * // Count the number of OrgNodes
     * const count = await prisma.orgNode.count({
     *   where: {
     *     // ... the filter for the OrgNodes we want to count
     *   }
     * })
    **/
    count<T extends OrgNodeCountArgs>(
      args?: Subset<T, OrgNodeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], OrgNodeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a OrgNode.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrgNodeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends OrgNodeAggregateArgs>(args: Subset<T, OrgNodeAggregateArgs>): Prisma.PrismaPromise<GetOrgNodeAggregateType<T>>

    /**
     * Group by OrgNode.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrgNodeGroupByArgs} args - Group by arguments.
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
      T extends OrgNodeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: OrgNodeGroupByArgs['orderBy'] }
        : { orderBy?: OrgNodeGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, OrgNodeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOrgNodeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the OrgNode model
   */
  readonly fields: OrgNodeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for OrgNode.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__OrgNodeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the OrgNode model
   */
  interface OrgNodeFieldRefs {
    readonly id: FieldRef<"OrgNode", 'String'>
    readonly employee_id: FieldRef<"OrgNode", 'String'>
    readonly name_en: FieldRef<"OrgNode", 'String'>
    readonly name_th: FieldRef<"OrgNode", 'String'>
    readonly position_title_en: FieldRef<"OrgNode", 'String'>
    readonly position_title_th: FieldRef<"OrgNode", 'String'>
    readonly department_id: FieldRef<"OrgNode", 'String'>
    readonly company_id: FieldRef<"OrgNode", 'String'>
    readonly photo_url: FieldRef<"OrgNode", 'String'>
    readonly email: FieldRef<"OrgNode", 'String'>
    readonly phone: FieldRef<"OrgNode", 'String'>
    readonly headcount: FieldRef<"OrgNode", 'Int'>
    readonly total_headcount: FieldRef<"OrgNode", 'Int'>
    readonly created_at: FieldRef<"OrgNode", 'DateTime'>
    readonly updated_at: FieldRef<"OrgNode", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * OrgNode findUnique
   */
  export type OrgNodeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrgNode
     */
    select?: OrgNodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrgNode
     */
    omit?: OrgNodeOmit<ExtArgs> | null
    /**
     * Filter, which OrgNode to fetch.
     */
    where: OrgNodeWhereUniqueInput
  }

  /**
   * OrgNode findUniqueOrThrow
   */
  export type OrgNodeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrgNode
     */
    select?: OrgNodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrgNode
     */
    omit?: OrgNodeOmit<ExtArgs> | null
    /**
     * Filter, which OrgNode to fetch.
     */
    where: OrgNodeWhereUniqueInput
  }

  /**
   * OrgNode findFirst
   */
  export type OrgNodeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrgNode
     */
    select?: OrgNodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrgNode
     */
    omit?: OrgNodeOmit<ExtArgs> | null
    /**
     * Filter, which OrgNode to fetch.
     */
    where?: OrgNodeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OrgNodes to fetch.
     */
    orderBy?: OrgNodeOrderByWithRelationInput | OrgNodeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OrgNodes.
     */
    cursor?: OrgNodeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OrgNodes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OrgNodes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OrgNodes.
     */
    distinct?: OrgNodeScalarFieldEnum | OrgNodeScalarFieldEnum[]
  }

  /**
   * OrgNode findFirstOrThrow
   */
  export type OrgNodeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrgNode
     */
    select?: OrgNodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrgNode
     */
    omit?: OrgNodeOmit<ExtArgs> | null
    /**
     * Filter, which OrgNode to fetch.
     */
    where?: OrgNodeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OrgNodes to fetch.
     */
    orderBy?: OrgNodeOrderByWithRelationInput | OrgNodeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OrgNodes.
     */
    cursor?: OrgNodeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OrgNodes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OrgNodes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OrgNodes.
     */
    distinct?: OrgNodeScalarFieldEnum | OrgNodeScalarFieldEnum[]
  }

  /**
   * OrgNode findMany
   */
  export type OrgNodeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrgNode
     */
    select?: OrgNodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrgNode
     */
    omit?: OrgNodeOmit<ExtArgs> | null
    /**
     * Filter, which OrgNodes to fetch.
     */
    where?: OrgNodeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OrgNodes to fetch.
     */
    orderBy?: OrgNodeOrderByWithRelationInput | OrgNodeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing OrgNodes.
     */
    cursor?: OrgNodeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OrgNodes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OrgNodes.
     */
    skip?: number
    distinct?: OrgNodeScalarFieldEnum | OrgNodeScalarFieldEnum[]
  }

  /**
   * OrgNode create
   */
  export type OrgNodeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrgNode
     */
    select?: OrgNodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrgNode
     */
    omit?: OrgNodeOmit<ExtArgs> | null
    /**
     * The data needed to create a OrgNode.
     */
    data: XOR<OrgNodeCreateInput, OrgNodeUncheckedCreateInput>
  }

  /**
   * OrgNode createMany
   */
  export type OrgNodeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many OrgNodes.
     */
    data: OrgNodeCreateManyInput | OrgNodeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * OrgNode createManyAndReturn
   */
  export type OrgNodeCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrgNode
     */
    select?: OrgNodeSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the OrgNode
     */
    omit?: OrgNodeOmit<ExtArgs> | null
    /**
     * The data used to create many OrgNodes.
     */
    data: OrgNodeCreateManyInput | OrgNodeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * OrgNode update
   */
  export type OrgNodeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrgNode
     */
    select?: OrgNodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrgNode
     */
    omit?: OrgNodeOmit<ExtArgs> | null
    /**
     * The data needed to update a OrgNode.
     */
    data: XOR<OrgNodeUpdateInput, OrgNodeUncheckedUpdateInput>
    /**
     * Choose, which OrgNode to update.
     */
    where: OrgNodeWhereUniqueInput
  }

  /**
   * OrgNode updateMany
   */
  export type OrgNodeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update OrgNodes.
     */
    data: XOR<OrgNodeUpdateManyMutationInput, OrgNodeUncheckedUpdateManyInput>
    /**
     * Filter which OrgNodes to update
     */
    where?: OrgNodeWhereInput
    /**
     * Limit how many OrgNodes to update.
     */
    limit?: number
  }

  /**
   * OrgNode updateManyAndReturn
   */
  export type OrgNodeUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrgNode
     */
    select?: OrgNodeSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the OrgNode
     */
    omit?: OrgNodeOmit<ExtArgs> | null
    /**
     * The data used to update OrgNodes.
     */
    data: XOR<OrgNodeUpdateManyMutationInput, OrgNodeUncheckedUpdateManyInput>
    /**
     * Filter which OrgNodes to update
     */
    where?: OrgNodeWhereInput
    /**
     * Limit how many OrgNodes to update.
     */
    limit?: number
  }

  /**
   * OrgNode upsert
   */
  export type OrgNodeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrgNode
     */
    select?: OrgNodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrgNode
     */
    omit?: OrgNodeOmit<ExtArgs> | null
    /**
     * The filter to search for the OrgNode to update in case it exists.
     */
    where: OrgNodeWhereUniqueInput
    /**
     * In case the OrgNode found by the `where` argument doesn't exist, create a new OrgNode with this data.
     */
    create: XOR<OrgNodeCreateInput, OrgNodeUncheckedCreateInput>
    /**
     * In case the OrgNode was found with the provided `where` argument, update it with this data.
     */
    update: XOR<OrgNodeUpdateInput, OrgNodeUncheckedUpdateInput>
  }

  /**
   * OrgNode delete
   */
  export type OrgNodeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrgNode
     */
    select?: OrgNodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrgNode
     */
    omit?: OrgNodeOmit<ExtArgs> | null
    /**
     * Filter which OrgNode to delete.
     */
    where: OrgNodeWhereUniqueInput
  }

  /**
   * OrgNode deleteMany
   */
  export type OrgNodeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which OrgNodes to delete
     */
    where?: OrgNodeWhereInput
    /**
     * Limit how many OrgNodes to delete.
     */
    limit?: number
  }

  /**
   * OrgNode without action
   */
  export type OrgNodeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrgNode
     */
    select?: OrgNodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrgNode
     */
    omit?: OrgNodeOmit<ExtArgs> | null
  }


  /**
   * Model ReportingLine
   */

  export type AggregateReportingLine = {
    _count: ReportingLineCountAggregateOutputType | null
    _min: ReportingLineMinAggregateOutputType | null
    _max: ReportingLineMaxAggregateOutputType | null
  }

  export type ReportingLineMinAggregateOutputType = {
    id: string | null
    from_employee_id: string | null
    to_employee_id: string | null
    type: string | null
    relationship_type: string | null
    label_en: string | null
    label_th: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type ReportingLineMaxAggregateOutputType = {
    id: string | null
    from_employee_id: string | null
    to_employee_id: string | null
    type: string | null
    relationship_type: string | null
    label_en: string | null
    label_th: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type ReportingLineCountAggregateOutputType = {
    id: number
    from_employee_id: number
    to_employee_id: number
    type: number
    relationship_type: number
    label_en: number
    label_th: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type ReportingLineMinAggregateInputType = {
    id?: true
    from_employee_id?: true
    to_employee_id?: true
    type?: true
    relationship_type?: true
    label_en?: true
    label_th?: true
    created_at?: true
    updated_at?: true
  }

  export type ReportingLineMaxAggregateInputType = {
    id?: true
    from_employee_id?: true
    to_employee_id?: true
    type?: true
    relationship_type?: true
    label_en?: true
    label_th?: true
    created_at?: true
    updated_at?: true
  }

  export type ReportingLineCountAggregateInputType = {
    id?: true
    from_employee_id?: true
    to_employee_id?: true
    type?: true
    relationship_type?: true
    label_en?: true
    label_th?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type ReportingLineAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ReportingLine to aggregate.
     */
    where?: ReportingLineWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ReportingLines to fetch.
     */
    orderBy?: ReportingLineOrderByWithRelationInput | ReportingLineOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ReportingLineWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ReportingLines from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ReportingLines.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ReportingLines
    **/
    _count?: true | ReportingLineCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ReportingLineMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ReportingLineMaxAggregateInputType
  }

  export type GetReportingLineAggregateType<T extends ReportingLineAggregateArgs> = {
        [P in keyof T & keyof AggregateReportingLine]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateReportingLine[P]>
      : GetScalarType<T[P], AggregateReportingLine[P]>
  }




  export type ReportingLineGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReportingLineWhereInput
    orderBy?: ReportingLineOrderByWithAggregationInput | ReportingLineOrderByWithAggregationInput[]
    by: ReportingLineScalarFieldEnum[] | ReportingLineScalarFieldEnum
    having?: ReportingLineScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ReportingLineCountAggregateInputType | true
    _min?: ReportingLineMinAggregateInputType
    _max?: ReportingLineMaxAggregateInputType
  }

  export type ReportingLineGroupByOutputType = {
    id: string
    from_employee_id: string
    to_employee_id: string
    type: string
    relationship_type: string | null
    label_en: string | null
    label_th: string | null
    created_at: Date
    updated_at: Date
    _count: ReportingLineCountAggregateOutputType | null
    _min: ReportingLineMinAggregateOutputType | null
    _max: ReportingLineMaxAggregateOutputType | null
  }

  type GetReportingLineGroupByPayload<T extends ReportingLineGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ReportingLineGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ReportingLineGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ReportingLineGroupByOutputType[P]>
            : GetScalarType<T[P], ReportingLineGroupByOutputType[P]>
        }
      >
    >


  export type ReportingLineSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    from_employee_id?: boolean
    to_employee_id?: boolean
    type?: boolean
    relationship_type?: boolean
    label_en?: boolean
    label_th?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["reportingLine"]>

  export type ReportingLineSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    from_employee_id?: boolean
    to_employee_id?: boolean
    type?: boolean
    relationship_type?: boolean
    label_en?: boolean
    label_th?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["reportingLine"]>

  export type ReportingLineSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    from_employee_id?: boolean
    to_employee_id?: boolean
    type?: boolean
    relationship_type?: boolean
    label_en?: boolean
    label_th?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["reportingLine"]>

  export type ReportingLineSelectScalar = {
    id?: boolean
    from_employee_id?: boolean
    to_employee_id?: boolean
    type?: boolean
    relationship_type?: boolean
    label_en?: boolean
    label_th?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type ReportingLineOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "from_employee_id" | "to_employee_id" | "type" | "relationship_type" | "label_en" | "label_th" | "created_at" | "updated_at", ExtArgs["result"]["reportingLine"]>

  export type $ReportingLinePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ReportingLine"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      from_employee_id: string
      to_employee_id: string
      type: string
      relationship_type: string | null
      label_en: string | null
      label_th: string | null
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["reportingLine"]>
    composites: {}
  }

  type ReportingLineGetPayload<S extends boolean | null | undefined | ReportingLineDefaultArgs> = $Result.GetResult<Prisma.$ReportingLinePayload, S>

  type ReportingLineCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ReportingLineFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ReportingLineCountAggregateInputType | true
    }

  export interface ReportingLineDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ReportingLine'], meta: { name: 'ReportingLine' } }
    /**
     * Find zero or one ReportingLine that matches the filter.
     * @param {ReportingLineFindUniqueArgs} args - Arguments to find a ReportingLine
     * @example
     * // Get one ReportingLine
     * const reportingLine = await prisma.reportingLine.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ReportingLineFindUniqueArgs>(args: SelectSubset<T, ReportingLineFindUniqueArgs<ExtArgs>>): Prisma__ReportingLineClient<$Result.GetResult<Prisma.$ReportingLinePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ReportingLine that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ReportingLineFindUniqueOrThrowArgs} args - Arguments to find a ReportingLine
     * @example
     * // Get one ReportingLine
     * const reportingLine = await prisma.reportingLine.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ReportingLineFindUniqueOrThrowArgs>(args: SelectSubset<T, ReportingLineFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ReportingLineClient<$Result.GetResult<Prisma.$ReportingLinePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ReportingLine that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReportingLineFindFirstArgs} args - Arguments to find a ReportingLine
     * @example
     * // Get one ReportingLine
     * const reportingLine = await prisma.reportingLine.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ReportingLineFindFirstArgs>(args?: SelectSubset<T, ReportingLineFindFirstArgs<ExtArgs>>): Prisma__ReportingLineClient<$Result.GetResult<Prisma.$ReportingLinePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ReportingLine that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReportingLineFindFirstOrThrowArgs} args - Arguments to find a ReportingLine
     * @example
     * // Get one ReportingLine
     * const reportingLine = await prisma.reportingLine.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ReportingLineFindFirstOrThrowArgs>(args?: SelectSubset<T, ReportingLineFindFirstOrThrowArgs<ExtArgs>>): Prisma__ReportingLineClient<$Result.GetResult<Prisma.$ReportingLinePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ReportingLines that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReportingLineFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ReportingLines
     * const reportingLines = await prisma.reportingLine.findMany()
     * 
     * // Get first 10 ReportingLines
     * const reportingLines = await prisma.reportingLine.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const reportingLineWithIdOnly = await prisma.reportingLine.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ReportingLineFindManyArgs>(args?: SelectSubset<T, ReportingLineFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReportingLinePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ReportingLine.
     * @param {ReportingLineCreateArgs} args - Arguments to create a ReportingLine.
     * @example
     * // Create one ReportingLine
     * const ReportingLine = await prisma.reportingLine.create({
     *   data: {
     *     // ... data to create a ReportingLine
     *   }
     * })
     * 
     */
    create<T extends ReportingLineCreateArgs>(args: SelectSubset<T, ReportingLineCreateArgs<ExtArgs>>): Prisma__ReportingLineClient<$Result.GetResult<Prisma.$ReportingLinePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ReportingLines.
     * @param {ReportingLineCreateManyArgs} args - Arguments to create many ReportingLines.
     * @example
     * // Create many ReportingLines
     * const reportingLine = await prisma.reportingLine.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ReportingLineCreateManyArgs>(args?: SelectSubset<T, ReportingLineCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ReportingLines and returns the data saved in the database.
     * @param {ReportingLineCreateManyAndReturnArgs} args - Arguments to create many ReportingLines.
     * @example
     * // Create many ReportingLines
     * const reportingLine = await prisma.reportingLine.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ReportingLines and only return the `id`
     * const reportingLineWithIdOnly = await prisma.reportingLine.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ReportingLineCreateManyAndReturnArgs>(args?: SelectSubset<T, ReportingLineCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReportingLinePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ReportingLine.
     * @param {ReportingLineDeleteArgs} args - Arguments to delete one ReportingLine.
     * @example
     * // Delete one ReportingLine
     * const ReportingLine = await prisma.reportingLine.delete({
     *   where: {
     *     // ... filter to delete one ReportingLine
     *   }
     * })
     * 
     */
    delete<T extends ReportingLineDeleteArgs>(args: SelectSubset<T, ReportingLineDeleteArgs<ExtArgs>>): Prisma__ReportingLineClient<$Result.GetResult<Prisma.$ReportingLinePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ReportingLine.
     * @param {ReportingLineUpdateArgs} args - Arguments to update one ReportingLine.
     * @example
     * // Update one ReportingLine
     * const reportingLine = await prisma.reportingLine.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ReportingLineUpdateArgs>(args: SelectSubset<T, ReportingLineUpdateArgs<ExtArgs>>): Prisma__ReportingLineClient<$Result.GetResult<Prisma.$ReportingLinePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ReportingLines.
     * @param {ReportingLineDeleteManyArgs} args - Arguments to filter ReportingLines to delete.
     * @example
     * // Delete a few ReportingLines
     * const { count } = await prisma.reportingLine.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ReportingLineDeleteManyArgs>(args?: SelectSubset<T, ReportingLineDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ReportingLines.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReportingLineUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ReportingLines
     * const reportingLine = await prisma.reportingLine.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ReportingLineUpdateManyArgs>(args: SelectSubset<T, ReportingLineUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ReportingLines and returns the data updated in the database.
     * @param {ReportingLineUpdateManyAndReturnArgs} args - Arguments to update many ReportingLines.
     * @example
     * // Update many ReportingLines
     * const reportingLine = await prisma.reportingLine.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ReportingLines and only return the `id`
     * const reportingLineWithIdOnly = await prisma.reportingLine.updateManyAndReturn({
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
    updateManyAndReturn<T extends ReportingLineUpdateManyAndReturnArgs>(args: SelectSubset<T, ReportingLineUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReportingLinePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ReportingLine.
     * @param {ReportingLineUpsertArgs} args - Arguments to update or create a ReportingLine.
     * @example
     * // Update or create a ReportingLine
     * const reportingLine = await prisma.reportingLine.upsert({
     *   create: {
     *     // ... data to create a ReportingLine
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ReportingLine we want to update
     *   }
     * })
     */
    upsert<T extends ReportingLineUpsertArgs>(args: SelectSubset<T, ReportingLineUpsertArgs<ExtArgs>>): Prisma__ReportingLineClient<$Result.GetResult<Prisma.$ReportingLinePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ReportingLines.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReportingLineCountArgs} args - Arguments to filter ReportingLines to count.
     * @example
     * // Count the number of ReportingLines
     * const count = await prisma.reportingLine.count({
     *   where: {
     *     // ... the filter for the ReportingLines we want to count
     *   }
     * })
    **/
    count<T extends ReportingLineCountArgs>(
      args?: Subset<T, ReportingLineCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ReportingLineCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ReportingLine.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReportingLineAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ReportingLineAggregateArgs>(args: Subset<T, ReportingLineAggregateArgs>): Prisma.PrismaPromise<GetReportingLineAggregateType<T>>

    /**
     * Group by ReportingLine.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReportingLineGroupByArgs} args - Group by arguments.
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
      T extends ReportingLineGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ReportingLineGroupByArgs['orderBy'] }
        : { orderBy?: ReportingLineGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ReportingLineGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetReportingLineGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ReportingLine model
   */
  readonly fields: ReportingLineFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ReportingLine.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ReportingLineClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the ReportingLine model
   */
  interface ReportingLineFieldRefs {
    readonly id: FieldRef<"ReportingLine", 'String'>
    readonly from_employee_id: FieldRef<"ReportingLine", 'String'>
    readonly to_employee_id: FieldRef<"ReportingLine", 'String'>
    readonly type: FieldRef<"ReportingLine", 'String'>
    readonly relationship_type: FieldRef<"ReportingLine", 'String'>
    readonly label_en: FieldRef<"ReportingLine", 'String'>
    readonly label_th: FieldRef<"ReportingLine", 'String'>
    readonly created_at: FieldRef<"ReportingLine", 'DateTime'>
    readonly updated_at: FieldRef<"ReportingLine", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ReportingLine findUnique
   */
  export type ReportingLineFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReportingLine
     */
    select?: ReportingLineSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReportingLine
     */
    omit?: ReportingLineOmit<ExtArgs> | null
    /**
     * Filter, which ReportingLine to fetch.
     */
    where: ReportingLineWhereUniqueInput
  }

  /**
   * ReportingLine findUniqueOrThrow
   */
  export type ReportingLineFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReportingLine
     */
    select?: ReportingLineSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReportingLine
     */
    omit?: ReportingLineOmit<ExtArgs> | null
    /**
     * Filter, which ReportingLine to fetch.
     */
    where: ReportingLineWhereUniqueInput
  }

  /**
   * ReportingLine findFirst
   */
  export type ReportingLineFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReportingLine
     */
    select?: ReportingLineSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReportingLine
     */
    omit?: ReportingLineOmit<ExtArgs> | null
    /**
     * Filter, which ReportingLine to fetch.
     */
    where?: ReportingLineWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ReportingLines to fetch.
     */
    orderBy?: ReportingLineOrderByWithRelationInput | ReportingLineOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ReportingLines.
     */
    cursor?: ReportingLineWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ReportingLines from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ReportingLines.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ReportingLines.
     */
    distinct?: ReportingLineScalarFieldEnum | ReportingLineScalarFieldEnum[]
  }

  /**
   * ReportingLine findFirstOrThrow
   */
  export type ReportingLineFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReportingLine
     */
    select?: ReportingLineSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReportingLine
     */
    omit?: ReportingLineOmit<ExtArgs> | null
    /**
     * Filter, which ReportingLine to fetch.
     */
    where?: ReportingLineWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ReportingLines to fetch.
     */
    orderBy?: ReportingLineOrderByWithRelationInput | ReportingLineOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ReportingLines.
     */
    cursor?: ReportingLineWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ReportingLines from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ReportingLines.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ReportingLines.
     */
    distinct?: ReportingLineScalarFieldEnum | ReportingLineScalarFieldEnum[]
  }

  /**
   * ReportingLine findMany
   */
  export type ReportingLineFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReportingLine
     */
    select?: ReportingLineSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReportingLine
     */
    omit?: ReportingLineOmit<ExtArgs> | null
    /**
     * Filter, which ReportingLines to fetch.
     */
    where?: ReportingLineWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ReportingLines to fetch.
     */
    orderBy?: ReportingLineOrderByWithRelationInput | ReportingLineOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ReportingLines.
     */
    cursor?: ReportingLineWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ReportingLines from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ReportingLines.
     */
    skip?: number
    distinct?: ReportingLineScalarFieldEnum | ReportingLineScalarFieldEnum[]
  }

  /**
   * ReportingLine create
   */
  export type ReportingLineCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReportingLine
     */
    select?: ReportingLineSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReportingLine
     */
    omit?: ReportingLineOmit<ExtArgs> | null
    /**
     * The data needed to create a ReportingLine.
     */
    data: XOR<ReportingLineCreateInput, ReportingLineUncheckedCreateInput>
  }

  /**
   * ReportingLine createMany
   */
  export type ReportingLineCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ReportingLines.
     */
    data: ReportingLineCreateManyInput | ReportingLineCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ReportingLine createManyAndReturn
   */
  export type ReportingLineCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReportingLine
     */
    select?: ReportingLineSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ReportingLine
     */
    omit?: ReportingLineOmit<ExtArgs> | null
    /**
     * The data used to create many ReportingLines.
     */
    data: ReportingLineCreateManyInput | ReportingLineCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ReportingLine update
   */
  export type ReportingLineUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReportingLine
     */
    select?: ReportingLineSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReportingLine
     */
    omit?: ReportingLineOmit<ExtArgs> | null
    /**
     * The data needed to update a ReportingLine.
     */
    data: XOR<ReportingLineUpdateInput, ReportingLineUncheckedUpdateInput>
    /**
     * Choose, which ReportingLine to update.
     */
    where: ReportingLineWhereUniqueInput
  }

  /**
   * ReportingLine updateMany
   */
  export type ReportingLineUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ReportingLines.
     */
    data: XOR<ReportingLineUpdateManyMutationInput, ReportingLineUncheckedUpdateManyInput>
    /**
     * Filter which ReportingLines to update
     */
    where?: ReportingLineWhereInput
    /**
     * Limit how many ReportingLines to update.
     */
    limit?: number
  }

  /**
   * ReportingLine updateManyAndReturn
   */
  export type ReportingLineUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReportingLine
     */
    select?: ReportingLineSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ReportingLine
     */
    omit?: ReportingLineOmit<ExtArgs> | null
    /**
     * The data used to update ReportingLines.
     */
    data: XOR<ReportingLineUpdateManyMutationInput, ReportingLineUncheckedUpdateManyInput>
    /**
     * Filter which ReportingLines to update
     */
    where?: ReportingLineWhereInput
    /**
     * Limit how many ReportingLines to update.
     */
    limit?: number
  }

  /**
   * ReportingLine upsert
   */
  export type ReportingLineUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReportingLine
     */
    select?: ReportingLineSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReportingLine
     */
    omit?: ReportingLineOmit<ExtArgs> | null
    /**
     * The filter to search for the ReportingLine to update in case it exists.
     */
    where: ReportingLineWhereUniqueInput
    /**
     * In case the ReportingLine found by the `where` argument doesn't exist, create a new ReportingLine with this data.
     */
    create: XOR<ReportingLineCreateInput, ReportingLineUncheckedCreateInput>
    /**
     * In case the ReportingLine was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ReportingLineUpdateInput, ReportingLineUncheckedUpdateInput>
  }

  /**
   * ReportingLine delete
   */
  export type ReportingLineDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReportingLine
     */
    select?: ReportingLineSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReportingLine
     */
    omit?: ReportingLineOmit<ExtArgs> | null
    /**
     * Filter which ReportingLine to delete.
     */
    where: ReportingLineWhereUniqueInput
  }

  /**
   * ReportingLine deleteMany
   */
  export type ReportingLineDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ReportingLines to delete
     */
    where?: ReportingLineWhereInput
    /**
     * Limit how many ReportingLines to delete.
     */
    limit?: number
  }

  /**
   * ReportingLine without action
   */
  export type ReportingLineDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReportingLine
     */
    select?: ReportingLineSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReportingLine
     */
    omit?: ReportingLineOmit<ExtArgs> | null
  }


  /**
   * Model Transfer
   */

  export type AggregateTransfer = {
    _count: TransferCountAggregateOutputType | null
    _min: TransferMinAggregateOutputType | null
    _max: TransferMaxAggregateOutputType | null
  }

  export type TransferMinAggregateOutputType = {
    id: string | null
    employee_id: string | null
    from_position_id: string | null
    to_position_id: string | null
    from_department_id: string | null
    to_department_id: string | null
    transfer_type: string | null
    effective_date: Date | null
    status: string | null
    reason: string | null
    rejection_reason: string | null
    requested_by: string | null
    approved_by: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type TransferMaxAggregateOutputType = {
    id: string | null
    employee_id: string | null
    from_position_id: string | null
    to_position_id: string | null
    from_department_id: string | null
    to_department_id: string | null
    transfer_type: string | null
    effective_date: Date | null
    status: string | null
    reason: string | null
    rejection_reason: string | null
    requested_by: string | null
    approved_by: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type TransferCountAggregateOutputType = {
    id: number
    employee_id: number
    from_position_id: number
    to_position_id: number
    from_department_id: number
    to_department_id: number
    transfer_type: number
    effective_date: number
    status: number
    reason: number
    rejection_reason: number
    requested_by: number
    approved_by: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type TransferMinAggregateInputType = {
    id?: true
    employee_id?: true
    from_position_id?: true
    to_position_id?: true
    from_department_id?: true
    to_department_id?: true
    transfer_type?: true
    effective_date?: true
    status?: true
    reason?: true
    rejection_reason?: true
    requested_by?: true
    approved_by?: true
    created_at?: true
    updated_at?: true
  }

  export type TransferMaxAggregateInputType = {
    id?: true
    employee_id?: true
    from_position_id?: true
    to_position_id?: true
    from_department_id?: true
    to_department_id?: true
    transfer_type?: true
    effective_date?: true
    status?: true
    reason?: true
    rejection_reason?: true
    requested_by?: true
    approved_by?: true
    created_at?: true
    updated_at?: true
  }

  export type TransferCountAggregateInputType = {
    id?: true
    employee_id?: true
    from_position_id?: true
    to_position_id?: true
    from_department_id?: true
    to_department_id?: true
    transfer_type?: true
    effective_date?: true
    status?: true
    reason?: true
    rejection_reason?: true
    requested_by?: true
    approved_by?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type TransferAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Transfer to aggregate.
     */
    where?: TransferWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Transfers to fetch.
     */
    orderBy?: TransferOrderByWithRelationInput | TransferOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TransferWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Transfers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Transfers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Transfers
    **/
    _count?: true | TransferCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TransferMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TransferMaxAggregateInputType
  }

  export type GetTransferAggregateType<T extends TransferAggregateArgs> = {
        [P in keyof T & keyof AggregateTransfer]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTransfer[P]>
      : GetScalarType<T[P], AggregateTransfer[P]>
  }




  export type TransferGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TransferWhereInput
    orderBy?: TransferOrderByWithAggregationInput | TransferOrderByWithAggregationInput[]
    by: TransferScalarFieldEnum[] | TransferScalarFieldEnum
    having?: TransferScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TransferCountAggregateInputType | true
    _min?: TransferMinAggregateInputType
    _max?: TransferMaxAggregateInputType
  }

  export type TransferGroupByOutputType = {
    id: string
    employee_id: string
    from_position_id: string | null
    to_position_id: string | null
    from_department_id: string | null
    to_department_id: string | null
    transfer_type: string
    effective_date: Date
    status: string
    reason: string | null
    rejection_reason: string | null
    requested_by: string
    approved_by: string | null
    created_at: Date
    updated_at: Date
    _count: TransferCountAggregateOutputType | null
    _min: TransferMinAggregateOutputType | null
    _max: TransferMaxAggregateOutputType | null
  }

  type GetTransferGroupByPayload<T extends TransferGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TransferGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TransferGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TransferGroupByOutputType[P]>
            : GetScalarType<T[P], TransferGroupByOutputType[P]>
        }
      >
    >


  export type TransferSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    employee_id?: boolean
    from_position_id?: boolean
    to_position_id?: boolean
    from_department_id?: boolean
    to_department_id?: boolean
    transfer_type?: boolean
    effective_date?: boolean
    status?: boolean
    reason?: boolean
    rejection_reason?: boolean
    requested_by?: boolean
    approved_by?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["transfer"]>

  export type TransferSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    employee_id?: boolean
    from_position_id?: boolean
    to_position_id?: boolean
    from_department_id?: boolean
    to_department_id?: boolean
    transfer_type?: boolean
    effective_date?: boolean
    status?: boolean
    reason?: boolean
    rejection_reason?: boolean
    requested_by?: boolean
    approved_by?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["transfer"]>

  export type TransferSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    employee_id?: boolean
    from_position_id?: boolean
    to_position_id?: boolean
    from_department_id?: boolean
    to_department_id?: boolean
    transfer_type?: boolean
    effective_date?: boolean
    status?: boolean
    reason?: boolean
    rejection_reason?: boolean
    requested_by?: boolean
    approved_by?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["transfer"]>

  export type TransferSelectScalar = {
    id?: boolean
    employee_id?: boolean
    from_position_id?: boolean
    to_position_id?: boolean
    from_department_id?: boolean
    to_department_id?: boolean
    transfer_type?: boolean
    effective_date?: boolean
    status?: boolean
    reason?: boolean
    rejection_reason?: boolean
    requested_by?: boolean
    approved_by?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type TransferOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "employee_id" | "from_position_id" | "to_position_id" | "from_department_id" | "to_department_id" | "transfer_type" | "effective_date" | "status" | "reason" | "rejection_reason" | "requested_by" | "approved_by" | "created_at" | "updated_at", ExtArgs["result"]["transfer"]>

  export type $TransferPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Transfer"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      employee_id: string
      from_position_id: string | null
      to_position_id: string | null
      from_department_id: string | null
      to_department_id: string | null
      transfer_type: string
      effective_date: Date
      status: string
      reason: string | null
      rejection_reason: string | null
      requested_by: string
      approved_by: string | null
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["transfer"]>
    composites: {}
  }

  type TransferGetPayload<S extends boolean | null | undefined | TransferDefaultArgs> = $Result.GetResult<Prisma.$TransferPayload, S>

  type TransferCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TransferFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TransferCountAggregateInputType | true
    }

  export interface TransferDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Transfer'], meta: { name: 'Transfer' } }
    /**
     * Find zero or one Transfer that matches the filter.
     * @param {TransferFindUniqueArgs} args - Arguments to find a Transfer
     * @example
     * // Get one Transfer
     * const transfer = await prisma.transfer.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TransferFindUniqueArgs>(args: SelectSubset<T, TransferFindUniqueArgs<ExtArgs>>): Prisma__TransferClient<$Result.GetResult<Prisma.$TransferPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Transfer that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TransferFindUniqueOrThrowArgs} args - Arguments to find a Transfer
     * @example
     * // Get one Transfer
     * const transfer = await prisma.transfer.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TransferFindUniqueOrThrowArgs>(args: SelectSubset<T, TransferFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TransferClient<$Result.GetResult<Prisma.$TransferPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Transfer that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransferFindFirstArgs} args - Arguments to find a Transfer
     * @example
     * // Get one Transfer
     * const transfer = await prisma.transfer.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TransferFindFirstArgs>(args?: SelectSubset<T, TransferFindFirstArgs<ExtArgs>>): Prisma__TransferClient<$Result.GetResult<Prisma.$TransferPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Transfer that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransferFindFirstOrThrowArgs} args - Arguments to find a Transfer
     * @example
     * // Get one Transfer
     * const transfer = await prisma.transfer.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TransferFindFirstOrThrowArgs>(args?: SelectSubset<T, TransferFindFirstOrThrowArgs<ExtArgs>>): Prisma__TransferClient<$Result.GetResult<Prisma.$TransferPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Transfers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransferFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Transfers
     * const transfers = await prisma.transfer.findMany()
     * 
     * // Get first 10 Transfers
     * const transfers = await prisma.transfer.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const transferWithIdOnly = await prisma.transfer.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TransferFindManyArgs>(args?: SelectSubset<T, TransferFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TransferPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Transfer.
     * @param {TransferCreateArgs} args - Arguments to create a Transfer.
     * @example
     * // Create one Transfer
     * const Transfer = await prisma.transfer.create({
     *   data: {
     *     // ... data to create a Transfer
     *   }
     * })
     * 
     */
    create<T extends TransferCreateArgs>(args: SelectSubset<T, TransferCreateArgs<ExtArgs>>): Prisma__TransferClient<$Result.GetResult<Prisma.$TransferPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Transfers.
     * @param {TransferCreateManyArgs} args - Arguments to create many Transfers.
     * @example
     * // Create many Transfers
     * const transfer = await prisma.transfer.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TransferCreateManyArgs>(args?: SelectSubset<T, TransferCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Transfers and returns the data saved in the database.
     * @param {TransferCreateManyAndReturnArgs} args - Arguments to create many Transfers.
     * @example
     * // Create many Transfers
     * const transfer = await prisma.transfer.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Transfers and only return the `id`
     * const transferWithIdOnly = await prisma.transfer.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TransferCreateManyAndReturnArgs>(args?: SelectSubset<T, TransferCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TransferPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Transfer.
     * @param {TransferDeleteArgs} args - Arguments to delete one Transfer.
     * @example
     * // Delete one Transfer
     * const Transfer = await prisma.transfer.delete({
     *   where: {
     *     // ... filter to delete one Transfer
     *   }
     * })
     * 
     */
    delete<T extends TransferDeleteArgs>(args: SelectSubset<T, TransferDeleteArgs<ExtArgs>>): Prisma__TransferClient<$Result.GetResult<Prisma.$TransferPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Transfer.
     * @param {TransferUpdateArgs} args - Arguments to update one Transfer.
     * @example
     * // Update one Transfer
     * const transfer = await prisma.transfer.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TransferUpdateArgs>(args: SelectSubset<T, TransferUpdateArgs<ExtArgs>>): Prisma__TransferClient<$Result.GetResult<Prisma.$TransferPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Transfers.
     * @param {TransferDeleteManyArgs} args - Arguments to filter Transfers to delete.
     * @example
     * // Delete a few Transfers
     * const { count } = await prisma.transfer.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TransferDeleteManyArgs>(args?: SelectSubset<T, TransferDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Transfers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransferUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Transfers
     * const transfer = await prisma.transfer.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TransferUpdateManyArgs>(args: SelectSubset<T, TransferUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Transfers and returns the data updated in the database.
     * @param {TransferUpdateManyAndReturnArgs} args - Arguments to update many Transfers.
     * @example
     * // Update many Transfers
     * const transfer = await prisma.transfer.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Transfers and only return the `id`
     * const transferWithIdOnly = await prisma.transfer.updateManyAndReturn({
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
    updateManyAndReturn<T extends TransferUpdateManyAndReturnArgs>(args: SelectSubset<T, TransferUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TransferPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Transfer.
     * @param {TransferUpsertArgs} args - Arguments to update or create a Transfer.
     * @example
     * // Update or create a Transfer
     * const transfer = await prisma.transfer.upsert({
     *   create: {
     *     // ... data to create a Transfer
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Transfer we want to update
     *   }
     * })
     */
    upsert<T extends TransferUpsertArgs>(args: SelectSubset<T, TransferUpsertArgs<ExtArgs>>): Prisma__TransferClient<$Result.GetResult<Prisma.$TransferPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Transfers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransferCountArgs} args - Arguments to filter Transfers to count.
     * @example
     * // Count the number of Transfers
     * const count = await prisma.transfer.count({
     *   where: {
     *     // ... the filter for the Transfers we want to count
     *   }
     * })
    **/
    count<T extends TransferCountArgs>(
      args?: Subset<T, TransferCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TransferCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Transfer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransferAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends TransferAggregateArgs>(args: Subset<T, TransferAggregateArgs>): Prisma.PrismaPromise<GetTransferAggregateType<T>>

    /**
     * Group by Transfer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransferGroupByArgs} args - Group by arguments.
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
      T extends TransferGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TransferGroupByArgs['orderBy'] }
        : { orderBy?: TransferGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, TransferGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTransferGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Transfer model
   */
  readonly fields: TransferFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Transfer.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TransferClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the Transfer model
   */
  interface TransferFieldRefs {
    readonly id: FieldRef<"Transfer", 'String'>
    readonly employee_id: FieldRef<"Transfer", 'String'>
    readonly from_position_id: FieldRef<"Transfer", 'String'>
    readonly to_position_id: FieldRef<"Transfer", 'String'>
    readonly from_department_id: FieldRef<"Transfer", 'String'>
    readonly to_department_id: FieldRef<"Transfer", 'String'>
    readonly transfer_type: FieldRef<"Transfer", 'String'>
    readonly effective_date: FieldRef<"Transfer", 'DateTime'>
    readonly status: FieldRef<"Transfer", 'String'>
    readonly reason: FieldRef<"Transfer", 'String'>
    readonly rejection_reason: FieldRef<"Transfer", 'String'>
    readonly requested_by: FieldRef<"Transfer", 'String'>
    readonly approved_by: FieldRef<"Transfer", 'String'>
    readonly created_at: FieldRef<"Transfer", 'DateTime'>
    readonly updated_at: FieldRef<"Transfer", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Transfer findUnique
   */
  export type TransferFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transfer
     */
    select?: TransferSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transfer
     */
    omit?: TransferOmit<ExtArgs> | null
    /**
     * Filter, which Transfer to fetch.
     */
    where: TransferWhereUniqueInput
  }

  /**
   * Transfer findUniqueOrThrow
   */
  export type TransferFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transfer
     */
    select?: TransferSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transfer
     */
    omit?: TransferOmit<ExtArgs> | null
    /**
     * Filter, which Transfer to fetch.
     */
    where: TransferWhereUniqueInput
  }

  /**
   * Transfer findFirst
   */
  export type TransferFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transfer
     */
    select?: TransferSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transfer
     */
    omit?: TransferOmit<ExtArgs> | null
    /**
     * Filter, which Transfer to fetch.
     */
    where?: TransferWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Transfers to fetch.
     */
    orderBy?: TransferOrderByWithRelationInput | TransferOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Transfers.
     */
    cursor?: TransferWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Transfers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Transfers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Transfers.
     */
    distinct?: TransferScalarFieldEnum | TransferScalarFieldEnum[]
  }

  /**
   * Transfer findFirstOrThrow
   */
  export type TransferFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transfer
     */
    select?: TransferSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transfer
     */
    omit?: TransferOmit<ExtArgs> | null
    /**
     * Filter, which Transfer to fetch.
     */
    where?: TransferWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Transfers to fetch.
     */
    orderBy?: TransferOrderByWithRelationInput | TransferOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Transfers.
     */
    cursor?: TransferWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Transfers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Transfers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Transfers.
     */
    distinct?: TransferScalarFieldEnum | TransferScalarFieldEnum[]
  }

  /**
   * Transfer findMany
   */
  export type TransferFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transfer
     */
    select?: TransferSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transfer
     */
    omit?: TransferOmit<ExtArgs> | null
    /**
     * Filter, which Transfers to fetch.
     */
    where?: TransferWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Transfers to fetch.
     */
    orderBy?: TransferOrderByWithRelationInput | TransferOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Transfers.
     */
    cursor?: TransferWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Transfers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Transfers.
     */
    skip?: number
    distinct?: TransferScalarFieldEnum | TransferScalarFieldEnum[]
  }

  /**
   * Transfer create
   */
  export type TransferCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transfer
     */
    select?: TransferSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transfer
     */
    omit?: TransferOmit<ExtArgs> | null
    /**
     * The data needed to create a Transfer.
     */
    data: XOR<TransferCreateInput, TransferUncheckedCreateInput>
  }

  /**
   * Transfer createMany
   */
  export type TransferCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Transfers.
     */
    data: TransferCreateManyInput | TransferCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Transfer createManyAndReturn
   */
  export type TransferCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transfer
     */
    select?: TransferSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Transfer
     */
    omit?: TransferOmit<ExtArgs> | null
    /**
     * The data used to create many Transfers.
     */
    data: TransferCreateManyInput | TransferCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Transfer update
   */
  export type TransferUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transfer
     */
    select?: TransferSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transfer
     */
    omit?: TransferOmit<ExtArgs> | null
    /**
     * The data needed to update a Transfer.
     */
    data: XOR<TransferUpdateInput, TransferUncheckedUpdateInput>
    /**
     * Choose, which Transfer to update.
     */
    where: TransferWhereUniqueInput
  }

  /**
   * Transfer updateMany
   */
  export type TransferUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Transfers.
     */
    data: XOR<TransferUpdateManyMutationInput, TransferUncheckedUpdateManyInput>
    /**
     * Filter which Transfers to update
     */
    where?: TransferWhereInput
    /**
     * Limit how many Transfers to update.
     */
    limit?: number
  }

  /**
   * Transfer updateManyAndReturn
   */
  export type TransferUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transfer
     */
    select?: TransferSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Transfer
     */
    omit?: TransferOmit<ExtArgs> | null
    /**
     * The data used to update Transfers.
     */
    data: XOR<TransferUpdateManyMutationInput, TransferUncheckedUpdateManyInput>
    /**
     * Filter which Transfers to update
     */
    where?: TransferWhereInput
    /**
     * Limit how many Transfers to update.
     */
    limit?: number
  }

  /**
   * Transfer upsert
   */
  export type TransferUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transfer
     */
    select?: TransferSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transfer
     */
    omit?: TransferOmit<ExtArgs> | null
    /**
     * The filter to search for the Transfer to update in case it exists.
     */
    where: TransferWhereUniqueInput
    /**
     * In case the Transfer found by the `where` argument doesn't exist, create a new Transfer with this data.
     */
    create: XOR<TransferCreateInput, TransferUncheckedCreateInput>
    /**
     * In case the Transfer was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TransferUpdateInput, TransferUncheckedUpdateInput>
  }

  /**
   * Transfer delete
   */
  export type TransferDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transfer
     */
    select?: TransferSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transfer
     */
    omit?: TransferOmit<ExtArgs> | null
    /**
     * Filter which Transfer to delete.
     */
    where: TransferWhereUniqueInput
  }

  /**
   * Transfer deleteMany
   */
  export type TransferDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Transfers to delete
     */
    where?: TransferWhereInput
    /**
     * Limit how many Transfers to delete.
     */
    limit?: number
  }

  /**
   * Transfer without action
   */
  export type TransferDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transfer
     */
    select?: TransferSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transfer
     */
    omit?: TransferOmit<ExtArgs> | null
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


  export const DepartmentScalarFieldEnum: {
    id: 'id',
    code: 'code',
    name_en: 'name_en',
    name_th: 'name_th',
    company_id: 'company_id',
    parent_department_id: 'parent_department_id',
    cost_center: 'cost_center',
    headcount: 'headcount',
    budget: 'budget',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type DepartmentScalarFieldEnum = (typeof DepartmentScalarFieldEnum)[keyof typeof DepartmentScalarFieldEnum]


  export const PositionScalarFieldEnum: {
    id: 'id',
    position_code: 'position_code',
    title_en: 'title_en',
    title_th: 'title_th',
    department_id: 'department_id',
    company_id: 'company_id',
    job_grade: 'job_grade',
    job_family: 'job_family',
    cost_center: 'cost_center',
    status: 'status',
    reports_to_position_id: 'reports_to_position_id',
    matrix_reports_to_id: 'matrix_reports_to_id',
    headcount: 'headcount',
    budget: 'budget',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type PositionScalarFieldEnum = (typeof PositionScalarFieldEnum)[keyof typeof PositionScalarFieldEnum]


  export const IncumbentScalarFieldEnum: {
    id: 'id',
    employee_id: 'employee_id',
    position_id: 'position_id',
    start_date: 'start_date',
    end_date: 'end_date',
    is_primary: 'is_primary',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type IncumbentScalarFieldEnum = (typeof IncumbentScalarFieldEnum)[keyof typeof IncumbentScalarFieldEnum]


  export const OrgNodeScalarFieldEnum: {
    id: 'id',
    employee_id: 'employee_id',
    name_en: 'name_en',
    name_th: 'name_th',
    position_title_en: 'position_title_en',
    position_title_th: 'position_title_th',
    department_id: 'department_id',
    company_id: 'company_id',
    photo_url: 'photo_url',
    email: 'email',
    phone: 'phone',
    headcount: 'headcount',
    total_headcount: 'total_headcount',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type OrgNodeScalarFieldEnum = (typeof OrgNodeScalarFieldEnum)[keyof typeof OrgNodeScalarFieldEnum]


  export const ReportingLineScalarFieldEnum: {
    id: 'id',
    from_employee_id: 'from_employee_id',
    to_employee_id: 'to_employee_id',
    type: 'type',
    relationship_type: 'relationship_type',
    label_en: 'label_en',
    label_th: 'label_th',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type ReportingLineScalarFieldEnum = (typeof ReportingLineScalarFieldEnum)[keyof typeof ReportingLineScalarFieldEnum]


  export const TransferScalarFieldEnum: {
    id: 'id',
    employee_id: 'employee_id',
    from_position_id: 'from_position_id',
    to_position_id: 'to_position_id',
    from_department_id: 'from_department_id',
    to_department_id: 'to_department_id',
    transfer_type: 'transfer_type',
    effective_date: 'effective_date',
    status: 'status',
    reason: 'reason',
    rejection_reason: 'rejection_reason',
    requested_by: 'requested_by',
    approved_by: 'approved_by',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type TransferScalarFieldEnum = (typeof TransferScalarFieldEnum)[keyof typeof TransferScalarFieldEnum]


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
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


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


  export type DepartmentWhereInput = {
    AND?: DepartmentWhereInput | DepartmentWhereInput[]
    OR?: DepartmentWhereInput[]
    NOT?: DepartmentWhereInput | DepartmentWhereInput[]
    id?: StringFilter<"Department"> | string
    code?: StringFilter<"Department"> | string
    name_en?: StringFilter<"Department"> | string
    name_th?: StringNullableFilter<"Department"> | string | null
    company_id?: StringFilter<"Department"> | string
    parent_department_id?: StringNullableFilter<"Department"> | string | null
    cost_center?: StringNullableFilter<"Department"> | string | null
    headcount?: IntNullableFilter<"Department"> | number | null
    budget?: IntNullableFilter<"Department"> | number | null
    created_at?: DateTimeFilter<"Department"> | Date | string
    updated_at?: DateTimeFilter<"Department"> | Date | string
    positions?: PositionListRelationFilter
  }

  export type DepartmentOrderByWithRelationInput = {
    id?: SortOrder
    code?: SortOrder
    name_en?: SortOrder
    name_th?: SortOrderInput | SortOrder
    company_id?: SortOrder
    parent_department_id?: SortOrderInput | SortOrder
    cost_center?: SortOrderInput | SortOrder
    headcount?: SortOrderInput | SortOrder
    budget?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    positions?: PositionOrderByRelationAggregateInput
  }

  export type DepartmentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    code?: string
    AND?: DepartmentWhereInput | DepartmentWhereInput[]
    OR?: DepartmentWhereInput[]
    NOT?: DepartmentWhereInput | DepartmentWhereInput[]
    name_en?: StringFilter<"Department"> | string
    name_th?: StringNullableFilter<"Department"> | string | null
    company_id?: StringFilter<"Department"> | string
    parent_department_id?: StringNullableFilter<"Department"> | string | null
    cost_center?: StringNullableFilter<"Department"> | string | null
    headcount?: IntNullableFilter<"Department"> | number | null
    budget?: IntNullableFilter<"Department"> | number | null
    created_at?: DateTimeFilter<"Department"> | Date | string
    updated_at?: DateTimeFilter<"Department"> | Date | string
    positions?: PositionListRelationFilter
  }, "id" | "code">

  export type DepartmentOrderByWithAggregationInput = {
    id?: SortOrder
    code?: SortOrder
    name_en?: SortOrder
    name_th?: SortOrderInput | SortOrder
    company_id?: SortOrder
    parent_department_id?: SortOrderInput | SortOrder
    cost_center?: SortOrderInput | SortOrder
    headcount?: SortOrderInput | SortOrder
    budget?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: DepartmentCountOrderByAggregateInput
    _avg?: DepartmentAvgOrderByAggregateInput
    _max?: DepartmentMaxOrderByAggregateInput
    _min?: DepartmentMinOrderByAggregateInput
    _sum?: DepartmentSumOrderByAggregateInput
  }

  export type DepartmentScalarWhereWithAggregatesInput = {
    AND?: DepartmentScalarWhereWithAggregatesInput | DepartmentScalarWhereWithAggregatesInput[]
    OR?: DepartmentScalarWhereWithAggregatesInput[]
    NOT?: DepartmentScalarWhereWithAggregatesInput | DepartmentScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Department"> | string
    code?: StringWithAggregatesFilter<"Department"> | string
    name_en?: StringWithAggregatesFilter<"Department"> | string
    name_th?: StringNullableWithAggregatesFilter<"Department"> | string | null
    company_id?: StringWithAggregatesFilter<"Department"> | string
    parent_department_id?: StringNullableWithAggregatesFilter<"Department"> | string | null
    cost_center?: StringNullableWithAggregatesFilter<"Department"> | string | null
    headcount?: IntNullableWithAggregatesFilter<"Department"> | number | null
    budget?: IntNullableWithAggregatesFilter<"Department"> | number | null
    created_at?: DateTimeWithAggregatesFilter<"Department"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"Department"> | Date | string
  }

  export type PositionWhereInput = {
    AND?: PositionWhereInput | PositionWhereInput[]
    OR?: PositionWhereInput[]
    NOT?: PositionWhereInput | PositionWhereInput[]
    id?: StringFilter<"Position"> | string
    position_code?: StringFilter<"Position"> | string
    title_en?: StringFilter<"Position"> | string
    title_th?: StringNullableFilter<"Position"> | string | null
    department_id?: StringFilter<"Position"> | string
    company_id?: StringFilter<"Position"> | string
    job_grade?: StringNullableFilter<"Position"> | string | null
    job_family?: StringNullableFilter<"Position"> | string | null
    cost_center?: StringNullableFilter<"Position"> | string | null
    status?: StringFilter<"Position"> | string
    reports_to_position_id?: StringNullableFilter<"Position"> | string | null
    matrix_reports_to_id?: StringNullableFilter<"Position"> | string | null
    headcount?: IntNullableFilter<"Position"> | number | null
    budget?: IntNullableFilter<"Position"> | number | null
    created_at?: DateTimeFilter<"Position"> | Date | string
    updated_at?: DateTimeFilter<"Position"> | Date | string
    department?: XOR<DepartmentScalarRelationFilter, DepartmentWhereInput>
    incumbents?: IncumbentListRelationFilter
  }

  export type PositionOrderByWithRelationInput = {
    id?: SortOrder
    position_code?: SortOrder
    title_en?: SortOrder
    title_th?: SortOrderInput | SortOrder
    department_id?: SortOrder
    company_id?: SortOrder
    job_grade?: SortOrderInput | SortOrder
    job_family?: SortOrderInput | SortOrder
    cost_center?: SortOrderInput | SortOrder
    status?: SortOrder
    reports_to_position_id?: SortOrderInput | SortOrder
    matrix_reports_to_id?: SortOrderInput | SortOrder
    headcount?: SortOrderInput | SortOrder
    budget?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    department?: DepartmentOrderByWithRelationInput
    incumbents?: IncumbentOrderByRelationAggregateInput
  }

  export type PositionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    position_code?: string
    AND?: PositionWhereInput | PositionWhereInput[]
    OR?: PositionWhereInput[]
    NOT?: PositionWhereInput | PositionWhereInput[]
    title_en?: StringFilter<"Position"> | string
    title_th?: StringNullableFilter<"Position"> | string | null
    department_id?: StringFilter<"Position"> | string
    company_id?: StringFilter<"Position"> | string
    job_grade?: StringNullableFilter<"Position"> | string | null
    job_family?: StringNullableFilter<"Position"> | string | null
    cost_center?: StringNullableFilter<"Position"> | string | null
    status?: StringFilter<"Position"> | string
    reports_to_position_id?: StringNullableFilter<"Position"> | string | null
    matrix_reports_to_id?: StringNullableFilter<"Position"> | string | null
    headcount?: IntNullableFilter<"Position"> | number | null
    budget?: IntNullableFilter<"Position"> | number | null
    created_at?: DateTimeFilter<"Position"> | Date | string
    updated_at?: DateTimeFilter<"Position"> | Date | string
    department?: XOR<DepartmentScalarRelationFilter, DepartmentWhereInput>
    incumbents?: IncumbentListRelationFilter
  }, "id" | "position_code">

  export type PositionOrderByWithAggregationInput = {
    id?: SortOrder
    position_code?: SortOrder
    title_en?: SortOrder
    title_th?: SortOrderInput | SortOrder
    department_id?: SortOrder
    company_id?: SortOrder
    job_grade?: SortOrderInput | SortOrder
    job_family?: SortOrderInput | SortOrder
    cost_center?: SortOrderInput | SortOrder
    status?: SortOrder
    reports_to_position_id?: SortOrderInput | SortOrder
    matrix_reports_to_id?: SortOrderInput | SortOrder
    headcount?: SortOrderInput | SortOrder
    budget?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: PositionCountOrderByAggregateInput
    _avg?: PositionAvgOrderByAggregateInput
    _max?: PositionMaxOrderByAggregateInput
    _min?: PositionMinOrderByAggregateInput
    _sum?: PositionSumOrderByAggregateInput
  }

  export type PositionScalarWhereWithAggregatesInput = {
    AND?: PositionScalarWhereWithAggregatesInput | PositionScalarWhereWithAggregatesInput[]
    OR?: PositionScalarWhereWithAggregatesInput[]
    NOT?: PositionScalarWhereWithAggregatesInput | PositionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Position"> | string
    position_code?: StringWithAggregatesFilter<"Position"> | string
    title_en?: StringWithAggregatesFilter<"Position"> | string
    title_th?: StringNullableWithAggregatesFilter<"Position"> | string | null
    department_id?: StringWithAggregatesFilter<"Position"> | string
    company_id?: StringWithAggregatesFilter<"Position"> | string
    job_grade?: StringNullableWithAggregatesFilter<"Position"> | string | null
    job_family?: StringNullableWithAggregatesFilter<"Position"> | string | null
    cost_center?: StringNullableWithAggregatesFilter<"Position"> | string | null
    status?: StringWithAggregatesFilter<"Position"> | string
    reports_to_position_id?: StringNullableWithAggregatesFilter<"Position"> | string | null
    matrix_reports_to_id?: StringNullableWithAggregatesFilter<"Position"> | string | null
    headcount?: IntNullableWithAggregatesFilter<"Position"> | number | null
    budget?: IntNullableWithAggregatesFilter<"Position"> | number | null
    created_at?: DateTimeWithAggregatesFilter<"Position"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"Position"> | Date | string
  }

  export type IncumbentWhereInput = {
    AND?: IncumbentWhereInput | IncumbentWhereInput[]
    OR?: IncumbentWhereInput[]
    NOT?: IncumbentWhereInput | IncumbentWhereInput[]
    id?: StringFilter<"Incumbent"> | string
    employee_id?: StringFilter<"Incumbent"> | string
    position_id?: StringFilter<"Incumbent"> | string
    start_date?: DateTimeFilter<"Incumbent"> | Date | string
    end_date?: DateTimeNullableFilter<"Incumbent"> | Date | string | null
    is_primary?: BoolFilter<"Incumbent"> | boolean
    created_at?: DateTimeFilter<"Incumbent"> | Date | string
    updated_at?: DateTimeFilter<"Incumbent"> | Date | string
    position?: XOR<PositionScalarRelationFilter, PositionWhereInput>
  }

  export type IncumbentOrderByWithRelationInput = {
    id?: SortOrder
    employee_id?: SortOrder
    position_id?: SortOrder
    start_date?: SortOrder
    end_date?: SortOrderInput | SortOrder
    is_primary?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    position?: PositionOrderByWithRelationInput
  }

  export type IncumbentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: IncumbentWhereInput | IncumbentWhereInput[]
    OR?: IncumbentWhereInput[]
    NOT?: IncumbentWhereInput | IncumbentWhereInput[]
    employee_id?: StringFilter<"Incumbent"> | string
    position_id?: StringFilter<"Incumbent"> | string
    start_date?: DateTimeFilter<"Incumbent"> | Date | string
    end_date?: DateTimeNullableFilter<"Incumbent"> | Date | string | null
    is_primary?: BoolFilter<"Incumbent"> | boolean
    created_at?: DateTimeFilter<"Incumbent"> | Date | string
    updated_at?: DateTimeFilter<"Incumbent"> | Date | string
    position?: XOR<PositionScalarRelationFilter, PositionWhereInput>
  }, "id">

  export type IncumbentOrderByWithAggregationInput = {
    id?: SortOrder
    employee_id?: SortOrder
    position_id?: SortOrder
    start_date?: SortOrder
    end_date?: SortOrderInput | SortOrder
    is_primary?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: IncumbentCountOrderByAggregateInput
    _max?: IncumbentMaxOrderByAggregateInput
    _min?: IncumbentMinOrderByAggregateInput
  }

  export type IncumbentScalarWhereWithAggregatesInput = {
    AND?: IncumbentScalarWhereWithAggregatesInput | IncumbentScalarWhereWithAggregatesInput[]
    OR?: IncumbentScalarWhereWithAggregatesInput[]
    NOT?: IncumbentScalarWhereWithAggregatesInput | IncumbentScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Incumbent"> | string
    employee_id?: StringWithAggregatesFilter<"Incumbent"> | string
    position_id?: StringWithAggregatesFilter<"Incumbent"> | string
    start_date?: DateTimeWithAggregatesFilter<"Incumbent"> | Date | string
    end_date?: DateTimeNullableWithAggregatesFilter<"Incumbent"> | Date | string | null
    is_primary?: BoolWithAggregatesFilter<"Incumbent"> | boolean
    created_at?: DateTimeWithAggregatesFilter<"Incumbent"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"Incumbent"> | Date | string
  }

  export type OrgNodeWhereInput = {
    AND?: OrgNodeWhereInput | OrgNodeWhereInput[]
    OR?: OrgNodeWhereInput[]
    NOT?: OrgNodeWhereInput | OrgNodeWhereInput[]
    id?: StringFilter<"OrgNode"> | string
    employee_id?: StringFilter<"OrgNode"> | string
    name_en?: StringFilter<"OrgNode"> | string
    name_th?: StringNullableFilter<"OrgNode"> | string | null
    position_title_en?: StringNullableFilter<"OrgNode"> | string | null
    position_title_th?: StringNullableFilter<"OrgNode"> | string | null
    department_id?: StringNullableFilter<"OrgNode"> | string | null
    company_id?: StringNullableFilter<"OrgNode"> | string | null
    photo_url?: StringNullableFilter<"OrgNode"> | string | null
    email?: StringNullableFilter<"OrgNode"> | string | null
    phone?: StringNullableFilter<"OrgNode"> | string | null
    headcount?: IntNullableFilter<"OrgNode"> | number | null
    total_headcount?: IntNullableFilter<"OrgNode"> | number | null
    created_at?: DateTimeFilter<"OrgNode"> | Date | string
    updated_at?: DateTimeFilter<"OrgNode"> | Date | string
  }

  export type OrgNodeOrderByWithRelationInput = {
    id?: SortOrder
    employee_id?: SortOrder
    name_en?: SortOrder
    name_th?: SortOrderInput | SortOrder
    position_title_en?: SortOrderInput | SortOrder
    position_title_th?: SortOrderInput | SortOrder
    department_id?: SortOrderInput | SortOrder
    company_id?: SortOrderInput | SortOrder
    photo_url?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    phone?: SortOrderInput | SortOrder
    headcount?: SortOrderInput | SortOrder
    total_headcount?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type OrgNodeWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    employee_id?: string
    AND?: OrgNodeWhereInput | OrgNodeWhereInput[]
    OR?: OrgNodeWhereInput[]
    NOT?: OrgNodeWhereInput | OrgNodeWhereInput[]
    name_en?: StringFilter<"OrgNode"> | string
    name_th?: StringNullableFilter<"OrgNode"> | string | null
    position_title_en?: StringNullableFilter<"OrgNode"> | string | null
    position_title_th?: StringNullableFilter<"OrgNode"> | string | null
    department_id?: StringNullableFilter<"OrgNode"> | string | null
    company_id?: StringNullableFilter<"OrgNode"> | string | null
    photo_url?: StringNullableFilter<"OrgNode"> | string | null
    email?: StringNullableFilter<"OrgNode"> | string | null
    phone?: StringNullableFilter<"OrgNode"> | string | null
    headcount?: IntNullableFilter<"OrgNode"> | number | null
    total_headcount?: IntNullableFilter<"OrgNode"> | number | null
    created_at?: DateTimeFilter<"OrgNode"> | Date | string
    updated_at?: DateTimeFilter<"OrgNode"> | Date | string
  }, "id" | "employee_id">

  export type OrgNodeOrderByWithAggregationInput = {
    id?: SortOrder
    employee_id?: SortOrder
    name_en?: SortOrder
    name_th?: SortOrderInput | SortOrder
    position_title_en?: SortOrderInput | SortOrder
    position_title_th?: SortOrderInput | SortOrder
    department_id?: SortOrderInput | SortOrder
    company_id?: SortOrderInput | SortOrder
    photo_url?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    phone?: SortOrderInput | SortOrder
    headcount?: SortOrderInput | SortOrder
    total_headcount?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: OrgNodeCountOrderByAggregateInput
    _avg?: OrgNodeAvgOrderByAggregateInput
    _max?: OrgNodeMaxOrderByAggregateInput
    _min?: OrgNodeMinOrderByAggregateInput
    _sum?: OrgNodeSumOrderByAggregateInput
  }

  export type OrgNodeScalarWhereWithAggregatesInput = {
    AND?: OrgNodeScalarWhereWithAggregatesInput | OrgNodeScalarWhereWithAggregatesInput[]
    OR?: OrgNodeScalarWhereWithAggregatesInput[]
    NOT?: OrgNodeScalarWhereWithAggregatesInput | OrgNodeScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"OrgNode"> | string
    employee_id?: StringWithAggregatesFilter<"OrgNode"> | string
    name_en?: StringWithAggregatesFilter<"OrgNode"> | string
    name_th?: StringNullableWithAggregatesFilter<"OrgNode"> | string | null
    position_title_en?: StringNullableWithAggregatesFilter<"OrgNode"> | string | null
    position_title_th?: StringNullableWithAggregatesFilter<"OrgNode"> | string | null
    department_id?: StringNullableWithAggregatesFilter<"OrgNode"> | string | null
    company_id?: StringNullableWithAggregatesFilter<"OrgNode"> | string | null
    photo_url?: StringNullableWithAggregatesFilter<"OrgNode"> | string | null
    email?: StringNullableWithAggregatesFilter<"OrgNode"> | string | null
    phone?: StringNullableWithAggregatesFilter<"OrgNode"> | string | null
    headcount?: IntNullableWithAggregatesFilter<"OrgNode"> | number | null
    total_headcount?: IntNullableWithAggregatesFilter<"OrgNode"> | number | null
    created_at?: DateTimeWithAggregatesFilter<"OrgNode"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"OrgNode"> | Date | string
  }

  export type ReportingLineWhereInput = {
    AND?: ReportingLineWhereInput | ReportingLineWhereInput[]
    OR?: ReportingLineWhereInput[]
    NOT?: ReportingLineWhereInput | ReportingLineWhereInput[]
    id?: StringFilter<"ReportingLine"> | string
    from_employee_id?: StringFilter<"ReportingLine"> | string
    to_employee_id?: StringFilter<"ReportingLine"> | string
    type?: StringFilter<"ReportingLine"> | string
    relationship_type?: StringNullableFilter<"ReportingLine"> | string | null
    label_en?: StringNullableFilter<"ReportingLine"> | string | null
    label_th?: StringNullableFilter<"ReportingLine"> | string | null
    created_at?: DateTimeFilter<"ReportingLine"> | Date | string
    updated_at?: DateTimeFilter<"ReportingLine"> | Date | string
  }

  export type ReportingLineOrderByWithRelationInput = {
    id?: SortOrder
    from_employee_id?: SortOrder
    to_employee_id?: SortOrder
    type?: SortOrder
    relationship_type?: SortOrderInput | SortOrder
    label_en?: SortOrderInput | SortOrder
    label_th?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type ReportingLineWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ReportingLineWhereInput | ReportingLineWhereInput[]
    OR?: ReportingLineWhereInput[]
    NOT?: ReportingLineWhereInput | ReportingLineWhereInput[]
    from_employee_id?: StringFilter<"ReportingLine"> | string
    to_employee_id?: StringFilter<"ReportingLine"> | string
    type?: StringFilter<"ReportingLine"> | string
    relationship_type?: StringNullableFilter<"ReportingLine"> | string | null
    label_en?: StringNullableFilter<"ReportingLine"> | string | null
    label_th?: StringNullableFilter<"ReportingLine"> | string | null
    created_at?: DateTimeFilter<"ReportingLine"> | Date | string
    updated_at?: DateTimeFilter<"ReportingLine"> | Date | string
  }, "id">

  export type ReportingLineOrderByWithAggregationInput = {
    id?: SortOrder
    from_employee_id?: SortOrder
    to_employee_id?: SortOrder
    type?: SortOrder
    relationship_type?: SortOrderInput | SortOrder
    label_en?: SortOrderInput | SortOrder
    label_th?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: ReportingLineCountOrderByAggregateInput
    _max?: ReportingLineMaxOrderByAggregateInput
    _min?: ReportingLineMinOrderByAggregateInput
  }

  export type ReportingLineScalarWhereWithAggregatesInput = {
    AND?: ReportingLineScalarWhereWithAggregatesInput | ReportingLineScalarWhereWithAggregatesInput[]
    OR?: ReportingLineScalarWhereWithAggregatesInput[]
    NOT?: ReportingLineScalarWhereWithAggregatesInput | ReportingLineScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ReportingLine"> | string
    from_employee_id?: StringWithAggregatesFilter<"ReportingLine"> | string
    to_employee_id?: StringWithAggregatesFilter<"ReportingLine"> | string
    type?: StringWithAggregatesFilter<"ReportingLine"> | string
    relationship_type?: StringNullableWithAggregatesFilter<"ReportingLine"> | string | null
    label_en?: StringNullableWithAggregatesFilter<"ReportingLine"> | string | null
    label_th?: StringNullableWithAggregatesFilter<"ReportingLine"> | string | null
    created_at?: DateTimeWithAggregatesFilter<"ReportingLine"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"ReportingLine"> | Date | string
  }

  export type TransferWhereInput = {
    AND?: TransferWhereInput | TransferWhereInput[]
    OR?: TransferWhereInput[]
    NOT?: TransferWhereInput | TransferWhereInput[]
    id?: StringFilter<"Transfer"> | string
    employee_id?: StringFilter<"Transfer"> | string
    from_position_id?: StringNullableFilter<"Transfer"> | string | null
    to_position_id?: StringNullableFilter<"Transfer"> | string | null
    from_department_id?: StringNullableFilter<"Transfer"> | string | null
    to_department_id?: StringNullableFilter<"Transfer"> | string | null
    transfer_type?: StringFilter<"Transfer"> | string
    effective_date?: DateTimeFilter<"Transfer"> | Date | string
    status?: StringFilter<"Transfer"> | string
    reason?: StringNullableFilter<"Transfer"> | string | null
    rejection_reason?: StringNullableFilter<"Transfer"> | string | null
    requested_by?: StringFilter<"Transfer"> | string
    approved_by?: StringNullableFilter<"Transfer"> | string | null
    created_at?: DateTimeFilter<"Transfer"> | Date | string
    updated_at?: DateTimeFilter<"Transfer"> | Date | string
  }

  export type TransferOrderByWithRelationInput = {
    id?: SortOrder
    employee_id?: SortOrder
    from_position_id?: SortOrderInput | SortOrder
    to_position_id?: SortOrderInput | SortOrder
    from_department_id?: SortOrderInput | SortOrder
    to_department_id?: SortOrderInput | SortOrder
    transfer_type?: SortOrder
    effective_date?: SortOrder
    status?: SortOrder
    reason?: SortOrderInput | SortOrder
    rejection_reason?: SortOrderInput | SortOrder
    requested_by?: SortOrder
    approved_by?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type TransferWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: TransferWhereInput | TransferWhereInput[]
    OR?: TransferWhereInput[]
    NOT?: TransferWhereInput | TransferWhereInput[]
    employee_id?: StringFilter<"Transfer"> | string
    from_position_id?: StringNullableFilter<"Transfer"> | string | null
    to_position_id?: StringNullableFilter<"Transfer"> | string | null
    from_department_id?: StringNullableFilter<"Transfer"> | string | null
    to_department_id?: StringNullableFilter<"Transfer"> | string | null
    transfer_type?: StringFilter<"Transfer"> | string
    effective_date?: DateTimeFilter<"Transfer"> | Date | string
    status?: StringFilter<"Transfer"> | string
    reason?: StringNullableFilter<"Transfer"> | string | null
    rejection_reason?: StringNullableFilter<"Transfer"> | string | null
    requested_by?: StringFilter<"Transfer"> | string
    approved_by?: StringNullableFilter<"Transfer"> | string | null
    created_at?: DateTimeFilter<"Transfer"> | Date | string
    updated_at?: DateTimeFilter<"Transfer"> | Date | string
  }, "id">

  export type TransferOrderByWithAggregationInput = {
    id?: SortOrder
    employee_id?: SortOrder
    from_position_id?: SortOrderInput | SortOrder
    to_position_id?: SortOrderInput | SortOrder
    from_department_id?: SortOrderInput | SortOrder
    to_department_id?: SortOrderInput | SortOrder
    transfer_type?: SortOrder
    effective_date?: SortOrder
    status?: SortOrder
    reason?: SortOrderInput | SortOrder
    rejection_reason?: SortOrderInput | SortOrder
    requested_by?: SortOrder
    approved_by?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: TransferCountOrderByAggregateInput
    _max?: TransferMaxOrderByAggregateInput
    _min?: TransferMinOrderByAggregateInput
  }

  export type TransferScalarWhereWithAggregatesInput = {
    AND?: TransferScalarWhereWithAggregatesInput | TransferScalarWhereWithAggregatesInput[]
    OR?: TransferScalarWhereWithAggregatesInput[]
    NOT?: TransferScalarWhereWithAggregatesInput | TransferScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Transfer"> | string
    employee_id?: StringWithAggregatesFilter<"Transfer"> | string
    from_position_id?: StringNullableWithAggregatesFilter<"Transfer"> | string | null
    to_position_id?: StringNullableWithAggregatesFilter<"Transfer"> | string | null
    from_department_id?: StringNullableWithAggregatesFilter<"Transfer"> | string | null
    to_department_id?: StringNullableWithAggregatesFilter<"Transfer"> | string | null
    transfer_type?: StringWithAggregatesFilter<"Transfer"> | string
    effective_date?: DateTimeWithAggregatesFilter<"Transfer"> | Date | string
    status?: StringWithAggregatesFilter<"Transfer"> | string
    reason?: StringNullableWithAggregatesFilter<"Transfer"> | string | null
    rejection_reason?: StringNullableWithAggregatesFilter<"Transfer"> | string | null
    requested_by?: StringWithAggregatesFilter<"Transfer"> | string
    approved_by?: StringNullableWithAggregatesFilter<"Transfer"> | string | null
    created_at?: DateTimeWithAggregatesFilter<"Transfer"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"Transfer"> | Date | string
  }

  export type DepartmentCreateInput = {
    id?: string
    code: string
    name_en: string
    name_th?: string | null
    company_id: string
    parent_department_id?: string | null
    cost_center?: string | null
    headcount?: number | null
    budget?: number | null
    created_at?: Date | string
    updated_at?: Date | string
    positions?: PositionCreateNestedManyWithoutDepartmentInput
  }

  export type DepartmentUncheckedCreateInput = {
    id?: string
    code: string
    name_en: string
    name_th?: string | null
    company_id: string
    parent_department_id?: string | null
    cost_center?: string | null
    headcount?: number | null
    budget?: number | null
    created_at?: Date | string
    updated_at?: Date | string
    positions?: PositionUncheckedCreateNestedManyWithoutDepartmentInput
  }

  export type DepartmentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    name_en?: StringFieldUpdateOperationsInput | string
    name_th?: NullableStringFieldUpdateOperationsInput | string | null
    company_id?: StringFieldUpdateOperationsInput | string
    parent_department_id?: NullableStringFieldUpdateOperationsInput | string | null
    cost_center?: NullableStringFieldUpdateOperationsInput | string | null
    headcount?: NullableIntFieldUpdateOperationsInput | number | null
    budget?: NullableIntFieldUpdateOperationsInput | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    positions?: PositionUpdateManyWithoutDepartmentNestedInput
  }

  export type DepartmentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    name_en?: StringFieldUpdateOperationsInput | string
    name_th?: NullableStringFieldUpdateOperationsInput | string | null
    company_id?: StringFieldUpdateOperationsInput | string
    parent_department_id?: NullableStringFieldUpdateOperationsInput | string | null
    cost_center?: NullableStringFieldUpdateOperationsInput | string | null
    headcount?: NullableIntFieldUpdateOperationsInput | number | null
    budget?: NullableIntFieldUpdateOperationsInput | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    positions?: PositionUncheckedUpdateManyWithoutDepartmentNestedInput
  }

  export type DepartmentCreateManyInput = {
    id?: string
    code: string
    name_en: string
    name_th?: string | null
    company_id: string
    parent_department_id?: string | null
    cost_center?: string | null
    headcount?: number | null
    budget?: number | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type DepartmentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    name_en?: StringFieldUpdateOperationsInput | string
    name_th?: NullableStringFieldUpdateOperationsInput | string | null
    company_id?: StringFieldUpdateOperationsInput | string
    parent_department_id?: NullableStringFieldUpdateOperationsInput | string | null
    cost_center?: NullableStringFieldUpdateOperationsInput | string | null
    headcount?: NullableIntFieldUpdateOperationsInput | number | null
    budget?: NullableIntFieldUpdateOperationsInput | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DepartmentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    name_en?: StringFieldUpdateOperationsInput | string
    name_th?: NullableStringFieldUpdateOperationsInput | string | null
    company_id?: StringFieldUpdateOperationsInput | string
    parent_department_id?: NullableStringFieldUpdateOperationsInput | string | null
    cost_center?: NullableStringFieldUpdateOperationsInput | string | null
    headcount?: NullableIntFieldUpdateOperationsInput | number | null
    budget?: NullableIntFieldUpdateOperationsInput | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PositionCreateInput = {
    id?: string
    position_code: string
    title_en: string
    title_th?: string | null
    company_id: string
    job_grade?: string | null
    job_family?: string | null
    cost_center?: string | null
    status?: string
    reports_to_position_id?: string | null
    matrix_reports_to_id?: string | null
    headcount?: number | null
    budget?: number | null
    created_at?: Date | string
    updated_at?: Date | string
    department: DepartmentCreateNestedOneWithoutPositionsInput
    incumbents?: IncumbentCreateNestedManyWithoutPositionInput
  }

  export type PositionUncheckedCreateInput = {
    id?: string
    position_code: string
    title_en: string
    title_th?: string | null
    department_id: string
    company_id: string
    job_grade?: string | null
    job_family?: string | null
    cost_center?: string | null
    status?: string
    reports_to_position_id?: string | null
    matrix_reports_to_id?: string | null
    headcount?: number | null
    budget?: number | null
    created_at?: Date | string
    updated_at?: Date | string
    incumbents?: IncumbentUncheckedCreateNestedManyWithoutPositionInput
  }

  export type PositionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    position_code?: StringFieldUpdateOperationsInput | string
    title_en?: StringFieldUpdateOperationsInput | string
    title_th?: NullableStringFieldUpdateOperationsInput | string | null
    company_id?: StringFieldUpdateOperationsInput | string
    job_grade?: NullableStringFieldUpdateOperationsInput | string | null
    job_family?: NullableStringFieldUpdateOperationsInput | string | null
    cost_center?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    reports_to_position_id?: NullableStringFieldUpdateOperationsInput | string | null
    matrix_reports_to_id?: NullableStringFieldUpdateOperationsInput | string | null
    headcount?: NullableIntFieldUpdateOperationsInput | number | null
    budget?: NullableIntFieldUpdateOperationsInput | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    department?: DepartmentUpdateOneRequiredWithoutPositionsNestedInput
    incumbents?: IncumbentUpdateManyWithoutPositionNestedInput
  }

  export type PositionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    position_code?: StringFieldUpdateOperationsInput | string
    title_en?: StringFieldUpdateOperationsInput | string
    title_th?: NullableStringFieldUpdateOperationsInput | string | null
    department_id?: StringFieldUpdateOperationsInput | string
    company_id?: StringFieldUpdateOperationsInput | string
    job_grade?: NullableStringFieldUpdateOperationsInput | string | null
    job_family?: NullableStringFieldUpdateOperationsInput | string | null
    cost_center?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    reports_to_position_id?: NullableStringFieldUpdateOperationsInput | string | null
    matrix_reports_to_id?: NullableStringFieldUpdateOperationsInput | string | null
    headcount?: NullableIntFieldUpdateOperationsInput | number | null
    budget?: NullableIntFieldUpdateOperationsInput | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    incumbents?: IncumbentUncheckedUpdateManyWithoutPositionNestedInput
  }

  export type PositionCreateManyInput = {
    id?: string
    position_code: string
    title_en: string
    title_th?: string | null
    department_id: string
    company_id: string
    job_grade?: string | null
    job_family?: string | null
    cost_center?: string | null
    status?: string
    reports_to_position_id?: string | null
    matrix_reports_to_id?: string | null
    headcount?: number | null
    budget?: number | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type PositionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    position_code?: StringFieldUpdateOperationsInput | string
    title_en?: StringFieldUpdateOperationsInput | string
    title_th?: NullableStringFieldUpdateOperationsInput | string | null
    company_id?: StringFieldUpdateOperationsInput | string
    job_grade?: NullableStringFieldUpdateOperationsInput | string | null
    job_family?: NullableStringFieldUpdateOperationsInput | string | null
    cost_center?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    reports_to_position_id?: NullableStringFieldUpdateOperationsInput | string | null
    matrix_reports_to_id?: NullableStringFieldUpdateOperationsInput | string | null
    headcount?: NullableIntFieldUpdateOperationsInput | number | null
    budget?: NullableIntFieldUpdateOperationsInput | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PositionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    position_code?: StringFieldUpdateOperationsInput | string
    title_en?: StringFieldUpdateOperationsInput | string
    title_th?: NullableStringFieldUpdateOperationsInput | string | null
    department_id?: StringFieldUpdateOperationsInput | string
    company_id?: StringFieldUpdateOperationsInput | string
    job_grade?: NullableStringFieldUpdateOperationsInput | string | null
    job_family?: NullableStringFieldUpdateOperationsInput | string | null
    cost_center?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    reports_to_position_id?: NullableStringFieldUpdateOperationsInput | string | null
    matrix_reports_to_id?: NullableStringFieldUpdateOperationsInput | string | null
    headcount?: NullableIntFieldUpdateOperationsInput | number | null
    budget?: NullableIntFieldUpdateOperationsInput | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IncumbentCreateInput = {
    id?: string
    employee_id: string
    start_date: Date | string
    end_date?: Date | string | null
    is_primary?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    position: PositionCreateNestedOneWithoutIncumbentsInput
  }

  export type IncumbentUncheckedCreateInput = {
    id?: string
    employee_id: string
    position_id: string
    start_date: Date | string
    end_date?: Date | string | null
    is_primary?: boolean
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type IncumbentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    employee_id?: StringFieldUpdateOperationsInput | string
    start_date?: DateTimeFieldUpdateOperationsInput | Date | string
    end_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    is_primary?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    position?: PositionUpdateOneRequiredWithoutIncumbentsNestedInput
  }

  export type IncumbentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    employee_id?: StringFieldUpdateOperationsInput | string
    position_id?: StringFieldUpdateOperationsInput | string
    start_date?: DateTimeFieldUpdateOperationsInput | Date | string
    end_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    is_primary?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IncumbentCreateManyInput = {
    id?: string
    employee_id: string
    position_id: string
    start_date: Date | string
    end_date?: Date | string | null
    is_primary?: boolean
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type IncumbentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    employee_id?: StringFieldUpdateOperationsInput | string
    start_date?: DateTimeFieldUpdateOperationsInput | Date | string
    end_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    is_primary?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IncumbentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    employee_id?: StringFieldUpdateOperationsInput | string
    position_id?: StringFieldUpdateOperationsInput | string
    start_date?: DateTimeFieldUpdateOperationsInput | Date | string
    end_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    is_primary?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrgNodeCreateInput = {
    id?: string
    employee_id: string
    name_en: string
    name_th?: string | null
    position_title_en?: string | null
    position_title_th?: string | null
    department_id?: string | null
    company_id?: string | null
    photo_url?: string | null
    email?: string | null
    phone?: string | null
    headcount?: number | null
    total_headcount?: number | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type OrgNodeUncheckedCreateInput = {
    id?: string
    employee_id: string
    name_en: string
    name_th?: string | null
    position_title_en?: string | null
    position_title_th?: string | null
    department_id?: string | null
    company_id?: string | null
    photo_url?: string | null
    email?: string | null
    phone?: string | null
    headcount?: number | null
    total_headcount?: number | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type OrgNodeUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    employee_id?: StringFieldUpdateOperationsInput | string
    name_en?: StringFieldUpdateOperationsInput | string
    name_th?: NullableStringFieldUpdateOperationsInput | string | null
    position_title_en?: NullableStringFieldUpdateOperationsInput | string | null
    position_title_th?: NullableStringFieldUpdateOperationsInput | string | null
    department_id?: NullableStringFieldUpdateOperationsInput | string | null
    company_id?: NullableStringFieldUpdateOperationsInput | string | null
    photo_url?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    headcount?: NullableIntFieldUpdateOperationsInput | number | null
    total_headcount?: NullableIntFieldUpdateOperationsInput | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrgNodeUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    employee_id?: StringFieldUpdateOperationsInput | string
    name_en?: StringFieldUpdateOperationsInput | string
    name_th?: NullableStringFieldUpdateOperationsInput | string | null
    position_title_en?: NullableStringFieldUpdateOperationsInput | string | null
    position_title_th?: NullableStringFieldUpdateOperationsInput | string | null
    department_id?: NullableStringFieldUpdateOperationsInput | string | null
    company_id?: NullableStringFieldUpdateOperationsInput | string | null
    photo_url?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    headcount?: NullableIntFieldUpdateOperationsInput | number | null
    total_headcount?: NullableIntFieldUpdateOperationsInput | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrgNodeCreateManyInput = {
    id?: string
    employee_id: string
    name_en: string
    name_th?: string | null
    position_title_en?: string | null
    position_title_th?: string | null
    department_id?: string | null
    company_id?: string | null
    photo_url?: string | null
    email?: string | null
    phone?: string | null
    headcount?: number | null
    total_headcount?: number | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type OrgNodeUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    employee_id?: StringFieldUpdateOperationsInput | string
    name_en?: StringFieldUpdateOperationsInput | string
    name_th?: NullableStringFieldUpdateOperationsInput | string | null
    position_title_en?: NullableStringFieldUpdateOperationsInput | string | null
    position_title_th?: NullableStringFieldUpdateOperationsInput | string | null
    department_id?: NullableStringFieldUpdateOperationsInput | string | null
    company_id?: NullableStringFieldUpdateOperationsInput | string | null
    photo_url?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    headcount?: NullableIntFieldUpdateOperationsInput | number | null
    total_headcount?: NullableIntFieldUpdateOperationsInput | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrgNodeUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    employee_id?: StringFieldUpdateOperationsInput | string
    name_en?: StringFieldUpdateOperationsInput | string
    name_th?: NullableStringFieldUpdateOperationsInput | string | null
    position_title_en?: NullableStringFieldUpdateOperationsInput | string | null
    position_title_th?: NullableStringFieldUpdateOperationsInput | string | null
    department_id?: NullableStringFieldUpdateOperationsInput | string | null
    company_id?: NullableStringFieldUpdateOperationsInput | string | null
    photo_url?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    headcount?: NullableIntFieldUpdateOperationsInput | number | null
    total_headcount?: NullableIntFieldUpdateOperationsInput | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReportingLineCreateInput = {
    id?: string
    from_employee_id: string
    to_employee_id: string
    type?: string
    relationship_type?: string | null
    label_en?: string | null
    label_th?: string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type ReportingLineUncheckedCreateInput = {
    id?: string
    from_employee_id: string
    to_employee_id: string
    type?: string
    relationship_type?: string | null
    label_en?: string | null
    label_th?: string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type ReportingLineUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    from_employee_id?: StringFieldUpdateOperationsInput | string
    to_employee_id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    relationship_type?: NullableStringFieldUpdateOperationsInput | string | null
    label_en?: NullableStringFieldUpdateOperationsInput | string | null
    label_th?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReportingLineUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    from_employee_id?: StringFieldUpdateOperationsInput | string
    to_employee_id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    relationship_type?: NullableStringFieldUpdateOperationsInput | string | null
    label_en?: NullableStringFieldUpdateOperationsInput | string | null
    label_th?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReportingLineCreateManyInput = {
    id?: string
    from_employee_id: string
    to_employee_id: string
    type?: string
    relationship_type?: string | null
    label_en?: string | null
    label_th?: string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type ReportingLineUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    from_employee_id?: StringFieldUpdateOperationsInput | string
    to_employee_id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    relationship_type?: NullableStringFieldUpdateOperationsInput | string | null
    label_en?: NullableStringFieldUpdateOperationsInput | string | null
    label_th?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReportingLineUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    from_employee_id?: StringFieldUpdateOperationsInput | string
    to_employee_id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    relationship_type?: NullableStringFieldUpdateOperationsInput | string | null
    label_en?: NullableStringFieldUpdateOperationsInput | string | null
    label_th?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TransferCreateInput = {
    id?: string
    employee_id: string
    from_position_id?: string | null
    to_position_id?: string | null
    from_department_id?: string | null
    to_department_id?: string | null
    transfer_type: string
    effective_date: Date | string
    status?: string
    reason?: string | null
    rejection_reason?: string | null
    requested_by: string
    approved_by?: string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type TransferUncheckedCreateInput = {
    id?: string
    employee_id: string
    from_position_id?: string | null
    to_position_id?: string | null
    from_department_id?: string | null
    to_department_id?: string | null
    transfer_type: string
    effective_date: Date | string
    status?: string
    reason?: string | null
    rejection_reason?: string | null
    requested_by: string
    approved_by?: string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type TransferUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    employee_id?: StringFieldUpdateOperationsInput | string
    from_position_id?: NullableStringFieldUpdateOperationsInput | string | null
    to_position_id?: NullableStringFieldUpdateOperationsInput | string | null
    from_department_id?: NullableStringFieldUpdateOperationsInput | string | null
    to_department_id?: NullableStringFieldUpdateOperationsInput | string | null
    transfer_type?: StringFieldUpdateOperationsInput | string
    effective_date?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    rejection_reason?: NullableStringFieldUpdateOperationsInput | string | null
    requested_by?: StringFieldUpdateOperationsInput | string
    approved_by?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TransferUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    employee_id?: StringFieldUpdateOperationsInput | string
    from_position_id?: NullableStringFieldUpdateOperationsInput | string | null
    to_position_id?: NullableStringFieldUpdateOperationsInput | string | null
    from_department_id?: NullableStringFieldUpdateOperationsInput | string | null
    to_department_id?: NullableStringFieldUpdateOperationsInput | string | null
    transfer_type?: StringFieldUpdateOperationsInput | string
    effective_date?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    rejection_reason?: NullableStringFieldUpdateOperationsInput | string | null
    requested_by?: StringFieldUpdateOperationsInput | string
    approved_by?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TransferCreateManyInput = {
    id?: string
    employee_id: string
    from_position_id?: string | null
    to_position_id?: string | null
    from_department_id?: string | null
    to_department_id?: string | null
    transfer_type: string
    effective_date: Date | string
    status?: string
    reason?: string | null
    rejection_reason?: string | null
    requested_by: string
    approved_by?: string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type TransferUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    employee_id?: StringFieldUpdateOperationsInput | string
    from_position_id?: NullableStringFieldUpdateOperationsInput | string | null
    to_position_id?: NullableStringFieldUpdateOperationsInput | string | null
    from_department_id?: NullableStringFieldUpdateOperationsInput | string | null
    to_department_id?: NullableStringFieldUpdateOperationsInput | string | null
    transfer_type?: StringFieldUpdateOperationsInput | string
    effective_date?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    rejection_reason?: NullableStringFieldUpdateOperationsInput | string | null
    requested_by?: StringFieldUpdateOperationsInput | string
    approved_by?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TransferUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    employee_id?: StringFieldUpdateOperationsInput | string
    from_position_id?: NullableStringFieldUpdateOperationsInput | string | null
    to_position_id?: NullableStringFieldUpdateOperationsInput | string | null
    from_department_id?: NullableStringFieldUpdateOperationsInput | string | null
    to_department_id?: NullableStringFieldUpdateOperationsInput | string | null
    transfer_type?: StringFieldUpdateOperationsInput | string
    effective_date?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    rejection_reason?: NullableStringFieldUpdateOperationsInput | string | null
    requested_by?: StringFieldUpdateOperationsInput | string
    approved_by?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
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

  export type PositionListRelationFilter = {
    every?: PositionWhereInput
    some?: PositionWhereInput
    none?: PositionWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type PositionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type DepartmentCountOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    name_en?: SortOrder
    name_th?: SortOrder
    company_id?: SortOrder
    parent_department_id?: SortOrder
    cost_center?: SortOrder
    headcount?: SortOrder
    budget?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type DepartmentAvgOrderByAggregateInput = {
    headcount?: SortOrder
    budget?: SortOrder
  }

  export type DepartmentMaxOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    name_en?: SortOrder
    name_th?: SortOrder
    company_id?: SortOrder
    parent_department_id?: SortOrder
    cost_center?: SortOrder
    headcount?: SortOrder
    budget?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type DepartmentMinOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    name_en?: SortOrder
    name_th?: SortOrder
    company_id?: SortOrder
    parent_department_id?: SortOrder
    cost_center?: SortOrder
    headcount?: SortOrder
    budget?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type DepartmentSumOrderByAggregateInput = {
    headcount?: SortOrder
    budget?: SortOrder
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

  export type DepartmentScalarRelationFilter = {
    is?: DepartmentWhereInput
    isNot?: DepartmentWhereInput
  }

  export type IncumbentListRelationFilter = {
    every?: IncumbentWhereInput
    some?: IncumbentWhereInput
    none?: IncumbentWhereInput
  }

  export type IncumbentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PositionCountOrderByAggregateInput = {
    id?: SortOrder
    position_code?: SortOrder
    title_en?: SortOrder
    title_th?: SortOrder
    department_id?: SortOrder
    company_id?: SortOrder
    job_grade?: SortOrder
    job_family?: SortOrder
    cost_center?: SortOrder
    status?: SortOrder
    reports_to_position_id?: SortOrder
    matrix_reports_to_id?: SortOrder
    headcount?: SortOrder
    budget?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type PositionAvgOrderByAggregateInput = {
    headcount?: SortOrder
    budget?: SortOrder
  }

  export type PositionMaxOrderByAggregateInput = {
    id?: SortOrder
    position_code?: SortOrder
    title_en?: SortOrder
    title_th?: SortOrder
    department_id?: SortOrder
    company_id?: SortOrder
    job_grade?: SortOrder
    job_family?: SortOrder
    cost_center?: SortOrder
    status?: SortOrder
    reports_to_position_id?: SortOrder
    matrix_reports_to_id?: SortOrder
    headcount?: SortOrder
    budget?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type PositionMinOrderByAggregateInput = {
    id?: SortOrder
    position_code?: SortOrder
    title_en?: SortOrder
    title_th?: SortOrder
    department_id?: SortOrder
    company_id?: SortOrder
    job_grade?: SortOrder
    job_family?: SortOrder
    cost_center?: SortOrder
    status?: SortOrder
    reports_to_position_id?: SortOrder
    matrix_reports_to_id?: SortOrder
    headcount?: SortOrder
    budget?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type PositionSumOrderByAggregateInput = {
    headcount?: SortOrder
    budget?: SortOrder
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

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type PositionScalarRelationFilter = {
    is?: PositionWhereInput
    isNot?: PositionWhereInput
  }

  export type IncumbentCountOrderByAggregateInput = {
    id?: SortOrder
    employee_id?: SortOrder
    position_id?: SortOrder
    start_date?: SortOrder
    end_date?: SortOrder
    is_primary?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type IncumbentMaxOrderByAggregateInput = {
    id?: SortOrder
    employee_id?: SortOrder
    position_id?: SortOrder
    start_date?: SortOrder
    end_date?: SortOrder
    is_primary?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type IncumbentMinOrderByAggregateInput = {
    id?: SortOrder
    employee_id?: SortOrder
    position_id?: SortOrder
    start_date?: SortOrder
    end_date?: SortOrder
    is_primary?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
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

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type OrgNodeCountOrderByAggregateInput = {
    id?: SortOrder
    employee_id?: SortOrder
    name_en?: SortOrder
    name_th?: SortOrder
    position_title_en?: SortOrder
    position_title_th?: SortOrder
    department_id?: SortOrder
    company_id?: SortOrder
    photo_url?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    headcount?: SortOrder
    total_headcount?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type OrgNodeAvgOrderByAggregateInput = {
    headcount?: SortOrder
    total_headcount?: SortOrder
  }

  export type OrgNodeMaxOrderByAggregateInput = {
    id?: SortOrder
    employee_id?: SortOrder
    name_en?: SortOrder
    name_th?: SortOrder
    position_title_en?: SortOrder
    position_title_th?: SortOrder
    department_id?: SortOrder
    company_id?: SortOrder
    photo_url?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    headcount?: SortOrder
    total_headcount?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type OrgNodeMinOrderByAggregateInput = {
    id?: SortOrder
    employee_id?: SortOrder
    name_en?: SortOrder
    name_th?: SortOrder
    position_title_en?: SortOrder
    position_title_th?: SortOrder
    department_id?: SortOrder
    company_id?: SortOrder
    photo_url?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    headcount?: SortOrder
    total_headcount?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type OrgNodeSumOrderByAggregateInput = {
    headcount?: SortOrder
    total_headcount?: SortOrder
  }

  export type ReportingLineCountOrderByAggregateInput = {
    id?: SortOrder
    from_employee_id?: SortOrder
    to_employee_id?: SortOrder
    type?: SortOrder
    relationship_type?: SortOrder
    label_en?: SortOrder
    label_th?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type ReportingLineMaxOrderByAggregateInput = {
    id?: SortOrder
    from_employee_id?: SortOrder
    to_employee_id?: SortOrder
    type?: SortOrder
    relationship_type?: SortOrder
    label_en?: SortOrder
    label_th?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type ReportingLineMinOrderByAggregateInput = {
    id?: SortOrder
    from_employee_id?: SortOrder
    to_employee_id?: SortOrder
    type?: SortOrder
    relationship_type?: SortOrder
    label_en?: SortOrder
    label_th?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type TransferCountOrderByAggregateInput = {
    id?: SortOrder
    employee_id?: SortOrder
    from_position_id?: SortOrder
    to_position_id?: SortOrder
    from_department_id?: SortOrder
    to_department_id?: SortOrder
    transfer_type?: SortOrder
    effective_date?: SortOrder
    status?: SortOrder
    reason?: SortOrder
    rejection_reason?: SortOrder
    requested_by?: SortOrder
    approved_by?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type TransferMaxOrderByAggregateInput = {
    id?: SortOrder
    employee_id?: SortOrder
    from_position_id?: SortOrder
    to_position_id?: SortOrder
    from_department_id?: SortOrder
    to_department_id?: SortOrder
    transfer_type?: SortOrder
    effective_date?: SortOrder
    status?: SortOrder
    reason?: SortOrder
    rejection_reason?: SortOrder
    requested_by?: SortOrder
    approved_by?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type TransferMinOrderByAggregateInput = {
    id?: SortOrder
    employee_id?: SortOrder
    from_position_id?: SortOrder
    to_position_id?: SortOrder
    from_department_id?: SortOrder
    to_department_id?: SortOrder
    transfer_type?: SortOrder
    effective_date?: SortOrder
    status?: SortOrder
    reason?: SortOrder
    rejection_reason?: SortOrder
    requested_by?: SortOrder
    approved_by?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type PositionCreateNestedManyWithoutDepartmentInput = {
    create?: XOR<PositionCreateWithoutDepartmentInput, PositionUncheckedCreateWithoutDepartmentInput> | PositionCreateWithoutDepartmentInput[] | PositionUncheckedCreateWithoutDepartmentInput[]
    connectOrCreate?: PositionCreateOrConnectWithoutDepartmentInput | PositionCreateOrConnectWithoutDepartmentInput[]
    createMany?: PositionCreateManyDepartmentInputEnvelope
    connect?: PositionWhereUniqueInput | PositionWhereUniqueInput[]
  }

  export type PositionUncheckedCreateNestedManyWithoutDepartmentInput = {
    create?: XOR<PositionCreateWithoutDepartmentInput, PositionUncheckedCreateWithoutDepartmentInput> | PositionCreateWithoutDepartmentInput[] | PositionUncheckedCreateWithoutDepartmentInput[]
    connectOrCreate?: PositionCreateOrConnectWithoutDepartmentInput | PositionCreateOrConnectWithoutDepartmentInput[]
    createMany?: PositionCreateManyDepartmentInputEnvelope
    connect?: PositionWhereUniqueInput | PositionWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
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

  export type PositionUpdateManyWithoutDepartmentNestedInput = {
    create?: XOR<PositionCreateWithoutDepartmentInput, PositionUncheckedCreateWithoutDepartmentInput> | PositionCreateWithoutDepartmentInput[] | PositionUncheckedCreateWithoutDepartmentInput[]
    connectOrCreate?: PositionCreateOrConnectWithoutDepartmentInput | PositionCreateOrConnectWithoutDepartmentInput[]
    upsert?: PositionUpsertWithWhereUniqueWithoutDepartmentInput | PositionUpsertWithWhereUniqueWithoutDepartmentInput[]
    createMany?: PositionCreateManyDepartmentInputEnvelope
    set?: PositionWhereUniqueInput | PositionWhereUniqueInput[]
    disconnect?: PositionWhereUniqueInput | PositionWhereUniqueInput[]
    delete?: PositionWhereUniqueInput | PositionWhereUniqueInput[]
    connect?: PositionWhereUniqueInput | PositionWhereUniqueInput[]
    update?: PositionUpdateWithWhereUniqueWithoutDepartmentInput | PositionUpdateWithWhereUniqueWithoutDepartmentInput[]
    updateMany?: PositionUpdateManyWithWhereWithoutDepartmentInput | PositionUpdateManyWithWhereWithoutDepartmentInput[]
    deleteMany?: PositionScalarWhereInput | PositionScalarWhereInput[]
  }

  export type PositionUncheckedUpdateManyWithoutDepartmentNestedInput = {
    create?: XOR<PositionCreateWithoutDepartmentInput, PositionUncheckedCreateWithoutDepartmentInput> | PositionCreateWithoutDepartmentInput[] | PositionUncheckedCreateWithoutDepartmentInput[]
    connectOrCreate?: PositionCreateOrConnectWithoutDepartmentInput | PositionCreateOrConnectWithoutDepartmentInput[]
    upsert?: PositionUpsertWithWhereUniqueWithoutDepartmentInput | PositionUpsertWithWhereUniqueWithoutDepartmentInput[]
    createMany?: PositionCreateManyDepartmentInputEnvelope
    set?: PositionWhereUniqueInput | PositionWhereUniqueInput[]
    disconnect?: PositionWhereUniqueInput | PositionWhereUniqueInput[]
    delete?: PositionWhereUniqueInput | PositionWhereUniqueInput[]
    connect?: PositionWhereUniqueInput | PositionWhereUniqueInput[]
    update?: PositionUpdateWithWhereUniqueWithoutDepartmentInput | PositionUpdateWithWhereUniqueWithoutDepartmentInput[]
    updateMany?: PositionUpdateManyWithWhereWithoutDepartmentInput | PositionUpdateManyWithWhereWithoutDepartmentInput[]
    deleteMany?: PositionScalarWhereInput | PositionScalarWhereInput[]
  }

  export type DepartmentCreateNestedOneWithoutPositionsInput = {
    create?: XOR<DepartmentCreateWithoutPositionsInput, DepartmentUncheckedCreateWithoutPositionsInput>
    connectOrCreate?: DepartmentCreateOrConnectWithoutPositionsInput
    connect?: DepartmentWhereUniqueInput
  }

  export type IncumbentCreateNestedManyWithoutPositionInput = {
    create?: XOR<IncumbentCreateWithoutPositionInput, IncumbentUncheckedCreateWithoutPositionInput> | IncumbentCreateWithoutPositionInput[] | IncumbentUncheckedCreateWithoutPositionInput[]
    connectOrCreate?: IncumbentCreateOrConnectWithoutPositionInput | IncumbentCreateOrConnectWithoutPositionInput[]
    createMany?: IncumbentCreateManyPositionInputEnvelope
    connect?: IncumbentWhereUniqueInput | IncumbentWhereUniqueInput[]
  }

  export type IncumbentUncheckedCreateNestedManyWithoutPositionInput = {
    create?: XOR<IncumbentCreateWithoutPositionInput, IncumbentUncheckedCreateWithoutPositionInput> | IncumbentCreateWithoutPositionInput[] | IncumbentUncheckedCreateWithoutPositionInput[]
    connectOrCreate?: IncumbentCreateOrConnectWithoutPositionInput | IncumbentCreateOrConnectWithoutPositionInput[]
    createMany?: IncumbentCreateManyPositionInputEnvelope
    connect?: IncumbentWhereUniqueInput | IncumbentWhereUniqueInput[]
  }

  export type DepartmentUpdateOneRequiredWithoutPositionsNestedInput = {
    create?: XOR<DepartmentCreateWithoutPositionsInput, DepartmentUncheckedCreateWithoutPositionsInput>
    connectOrCreate?: DepartmentCreateOrConnectWithoutPositionsInput
    upsert?: DepartmentUpsertWithoutPositionsInput
    connect?: DepartmentWhereUniqueInput
    update?: XOR<XOR<DepartmentUpdateToOneWithWhereWithoutPositionsInput, DepartmentUpdateWithoutPositionsInput>, DepartmentUncheckedUpdateWithoutPositionsInput>
  }

  export type IncumbentUpdateManyWithoutPositionNestedInput = {
    create?: XOR<IncumbentCreateWithoutPositionInput, IncumbentUncheckedCreateWithoutPositionInput> | IncumbentCreateWithoutPositionInput[] | IncumbentUncheckedCreateWithoutPositionInput[]
    connectOrCreate?: IncumbentCreateOrConnectWithoutPositionInput | IncumbentCreateOrConnectWithoutPositionInput[]
    upsert?: IncumbentUpsertWithWhereUniqueWithoutPositionInput | IncumbentUpsertWithWhereUniqueWithoutPositionInput[]
    createMany?: IncumbentCreateManyPositionInputEnvelope
    set?: IncumbentWhereUniqueInput | IncumbentWhereUniqueInput[]
    disconnect?: IncumbentWhereUniqueInput | IncumbentWhereUniqueInput[]
    delete?: IncumbentWhereUniqueInput | IncumbentWhereUniqueInput[]
    connect?: IncumbentWhereUniqueInput | IncumbentWhereUniqueInput[]
    update?: IncumbentUpdateWithWhereUniqueWithoutPositionInput | IncumbentUpdateWithWhereUniqueWithoutPositionInput[]
    updateMany?: IncumbentUpdateManyWithWhereWithoutPositionInput | IncumbentUpdateManyWithWhereWithoutPositionInput[]
    deleteMany?: IncumbentScalarWhereInput | IncumbentScalarWhereInput[]
  }

  export type IncumbentUncheckedUpdateManyWithoutPositionNestedInput = {
    create?: XOR<IncumbentCreateWithoutPositionInput, IncumbentUncheckedCreateWithoutPositionInput> | IncumbentCreateWithoutPositionInput[] | IncumbentUncheckedCreateWithoutPositionInput[]
    connectOrCreate?: IncumbentCreateOrConnectWithoutPositionInput | IncumbentCreateOrConnectWithoutPositionInput[]
    upsert?: IncumbentUpsertWithWhereUniqueWithoutPositionInput | IncumbentUpsertWithWhereUniqueWithoutPositionInput[]
    createMany?: IncumbentCreateManyPositionInputEnvelope
    set?: IncumbentWhereUniqueInput | IncumbentWhereUniqueInput[]
    disconnect?: IncumbentWhereUniqueInput | IncumbentWhereUniqueInput[]
    delete?: IncumbentWhereUniqueInput | IncumbentWhereUniqueInput[]
    connect?: IncumbentWhereUniqueInput | IncumbentWhereUniqueInput[]
    update?: IncumbentUpdateWithWhereUniqueWithoutPositionInput | IncumbentUpdateWithWhereUniqueWithoutPositionInput[]
    updateMany?: IncumbentUpdateManyWithWhereWithoutPositionInput | IncumbentUpdateManyWithWhereWithoutPositionInput[]
    deleteMany?: IncumbentScalarWhereInput | IncumbentScalarWhereInput[]
  }

  export type PositionCreateNestedOneWithoutIncumbentsInput = {
    create?: XOR<PositionCreateWithoutIncumbentsInput, PositionUncheckedCreateWithoutIncumbentsInput>
    connectOrCreate?: PositionCreateOrConnectWithoutIncumbentsInput
    connect?: PositionWhereUniqueInput
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type PositionUpdateOneRequiredWithoutIncumbentsNestedInput = {
    create?: XOR<PositionCreateWithoutIncumbentsInput, PositionUncheckedCreateWithoutIncumbentsInput>
    connectOrCreate?: PositionCreateOrConnectWithoutIncumbentsInput
    upsert?: PositionUpsertWithoutIncumbentsInput
    connect?: PositionWhereUniqueInput
    update?: XOR<XOR<PositionUpdateToOneWithWhereWithoutIncumbentsInput, PositionUpdateWithoutIncumbentsInput>, PositionUncheckedUpdateWithoutIncumbentsInput>
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

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
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

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type PositionCreateWithoutDepartmentInput = {
    id?: string
    position_code: string
    title_en: string
    title_th?: string | null
    company_id: string
    job_grade?: string | null
    job_family?: string | null
    cost_center?: string | null
    status?: string
    reports_to_position_id?: string | null
    matrix_reports_to_id?: string | null
    headcount?: number | null
    budget?: number | null
    created_at?: Date | string
    updated_at?: Date | string
    incumbents?: IncumbentCreateNestedManyWithoutPositionInput
  }

  export type PositionUncheckedCreateWithoutDepartmentInput = {
    id?: string
    position_code: string
    title_en: string
    title_th?: string | null
    company_id: string
    job_grade?: string | null
    job_family?: string | null
    cost_center?: string | null
    status?: string
    reports_to_position_id?: string | null
    matrix_reports_to_id?: string | null
    headcount?: number | null
    budget?: number | null
    created_at?: Date | string
    updated_at?: Date | string
    incumbents?: IncumbentUncheckedCreateNestedManyWithoutPositionInput
  }

  export type PositionCreateOrConnectWithoutDepartmentInput = {
    where: PositionWhereUniqueInput
    create: XOR<PositionCreateWithoutDepartmentInput, PositionUncheckedCreateWithoutDepartmentInput>
  }

  export type PositionCreateManyDepartmentInputEnvelope = {
    data: PositionCreateManyDepartmentInput | PositionCreateManyDepartmentInput[]
    skipDuplicates?: boolean
  }

  export type PositionUpsertWithWhereUniqueWithoutDepartmentInput = {
    where: PositionWhereUniqueInput
    update: XOR<PositionUpdateWithoutDepartmentInput, PositionUncheckedUpdateWithoutDepartmentInput>
    create: XOR<PositionCreateWithoutDepartmentInput, PositionUncheckedCreateWithoutDepartmentInput>
  }

  export type PositionUpdateWithWhereUniqueWithoutDepartmentInput = {
    where: PositionWhereUniqueInput
    data: XOR<PositionUpdateWithoutDepartmentInput, PositionUncheckedUpdateWithoutDepartmentInput>
  }

  export type PositionUpdateManyWithWhereWithoutDepartmentInput = {
    where: PositionScalarWhereInput
    data: XOR<PositionUpdateManyMutationInput, PositionUncheckedUpdateManyWithoutDepartmentInput>
  }

  export type PositionScalarWhereInput = {
    AND?: PositionScalarWhereInput | PositionScalarWhereInput[]
    OR?: PositionScalarWhereInput[]
    NOT?: PositionScalarWhereInput | PositionScalarWhereInput[]
    id?: StringFilter<"Position"> | string
    position_code?: StringFilter<"Position"> | string
    title_en?: StringFilter<"Position"> | string
    title_th?: StringNullableFilter<"Position"> | string | null
    department_id?: StringFilter<"Position"> | string
    company_id?: StringFilter<"Position"> | string
    job_grade?: StringNullableFilter<"Position"> | string | null
    job_family?: StringNullableFilter<"Position"> | string | null
    cost_center?: StringNullableFilter<"Position"> | string | null
    status?: StringFilter<"Position"> | string
    reports_to_position_id?: StringNullableFilter<"Position"> | string | null
    matrix_reports_to_id?: StringNullableFilter<"Position"> | string | null
    headcount?: IntNullableFilter<"Position"> | number | null
    budget?: IntNullableFilter<"Position"> | number | null
    created_at?: DateTimeFilter<"Position"> | Date | string
    updated_at?: DateTimeFilter<"Position"> | Date | string
  }

  export type DepartmentCreateWithoutPositionsInput = {
    id?: string
    code: string
    name_en: string
    name_th?: string | null
    company_id: string
    parent_department_id?: string | null
    cost_center?: string | null
    headcount?: number | null
    budget?: number | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type DepartmentUncheckedCreateWithoutPositionsInput = {
    id?: string
    code: string
    name_en: string
    name_th?: string | null
    company_id: string
    parent_department_id?: string | null
    cost_center?: string | null
    headcount?: number | null
    budget?: number | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type DepartmentCreateOrConnectWithoutPositionsInput = {
    where: DepartmentWhereUniqueInput
    create: XOR<DepartmentCreateWithoutPositionsInput, DepartmentUncheckedCreateWithoutPositionsInput>
  }

  export type IncumbentCreateWithoutPositionInput = {
    id?: string
    employee_id: string
    start_date: Date | string
    end_date?: Date | string | null
    is_primary?: boolean
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type IncumbentUncheckedCreateWithoutPositionInput = {
    id?: string
    employee_id: string
    start_date: Date | string
    end_date?: Date | string | null
    is_primary?: boolean
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type IncumbentCreateOrConnectWithoutPositionInput = {
    where: IncumbentWhereUniqueInput
    create: XOR<IncumbentCreateWithoutPositionInput, IncumbentUncheckedCreateWithoutPositionInput>
  }

  export type IncumbentCreateManyPositionInputEnvelope = {
    data: IncumbentCreateManyPositionInput | IncumbentCreateManyPositionInput[]
    skipDuplicates?: boolean
  }

  export type DepartmentUpsertWithoutPositionsInput = {
    update: XOR<DepartmentUpdateWithoutPositionsInput, DepartmentUncheckedUpdateWithoutPositionsInput>
    create: XOR<DepartmentCreateWithoutPositionsInput, DepartmentUncheckedCreateWithoutPositionsInput>
    where?: DepartmentWhereInput
  }

  export type DepartmentUpdateToOneWithWhereWithoutPositionsInput = {
    where?: DepartmentWhereInput
    data: XOR<DepartmentUpdateWithoutPositionsInput, DepartmentUncheckedUpdateWithoutPositionsInput>
  }

  export type DepartmentUpdateWithoutPositionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    name_en?: StringFieldUpdateOperationsInput | string
    name_th?: NullableStringFieldUpdateOperationsInput | string | null
    company_id?: StringFieldUpdateOperationsInput | string
    parent_department_id?: NullableStringFieldUpdateOperationsInput | string | null
    cost_center?: NullableStringFieldUpdateOperationsInput | string | null
    headcount?: NullableIntFieldUpdateOperationsInput | number | null
    budget?: NullableIntFieldUpdateOperationsInput | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DepartmentUncheckedUpdateWithoutPositionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    name_en?: StringFieldUpdateOperationsInput | string
    name_th?: NullableStringFieldUpdateOperationsInput | string | null
    company_id?: StringFieldUpdateOperationsInput | string
    parent_department_id?: NullableStringFieldUpdateOperationsInput | string | null
    cost_center?: NullableStringFieldUpdateOperationsInput | string | null
    headcount?: NullableIntFieldUpdateOperationsInput | number | null
    budget?: NullableIntFieldUpdateOperationsInput | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IncumbentUpsertWithWhereUniqueWithoutPositionInput = {
    where: IncumbentWhereUniqueInput
    update: XOR<IncumbentUpdateWithoutPositionInput, IncumbentUncheckedUpdateWithoutPositionInput>
    create: XOR<IncumbentCreateWithoutPositionInput, IncumbentUncheckedCreateWithoutPositionInput>
  }

  export type IncumbentUpdateWithWhereUniqueWithoutPositionInput = {
    where: IncumbentWhereUniqueInput
    data: XOR<IncumbentUpdateWithoutPositionInput, IncumbentUncheckedUpdateWithoutPositionInput>
  }

  export type IncumbentUpdateManyWithWhereWithoutPositionInput = {
    where: IncumbentScalarWhereInput
    data: XOR<IncumbentUpdateManyMutationInput, IncumbentUncheckedUpdateManyWithoutPositionInput>
  }

  export type IncumbentScalarWhereInput = {
    AND?: IncumbentScalarWhereInput | IncumbentScalarWhereInput[]
    OR?: IncumbentScalarWhereInput[]
    NOT?: IncumbentScalarWhereInput | IncumbentScalarWhereInput[]
    id?: StringFilter<"Incumbent"> | string
    employee_id?: StringFilter<"Incumbent"> | string
    position_id?: StringFilter<"Incumbent"> | string
    start_date?: DateTimeFilter<"Incumbent"> | Date | string
    end_date?: DateTimeNullableFilter<"Incumbent"> | Date | string | null
    is_primary?: BoolFilter<"Incumbent"> | boolean
    created_at?: DateTimeFilter<"Incumbent"> | Date | string
    updated_at?: DateTimeFilter<"Incumbent"> | Date | string
  }

  export type PositionCreateWithoutIncumbentsInput = {
    id?: string
    position_code: string
    title_en: string
    title_th?: string | null
    company_id: string
    job_grade?: string | null
    job_family?: string | null
    cost_center?: string | null
    status?: string
    reports_to_position_id?: string | null
    matrix_reports_to_id?: string | null
    headcount?: number | null
    budget?: number | null
    created_at?: Date | string
    updated_at?: Date | string
    department: DepartmentCreateNestedOneWithoutPositionsInput
  }

  export type PositionUncheckedCreateWithoutIncumbentsInput = {
    id?: string
    position_code: string
    title_en: string
    title_th?: string | null
    department_id: string
    company_id: string
    job_grade?: string | null
    job_family?: string | null
    cost_center?: string | null
    status?: string
    reports_to_position_id?: string | null
    matrix_reports_to_id?: string | null
    headcount?: number | null
    budget?: number | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type PositionCreateOrConnectWithoutIncumbentsInput = {
    where: PositionWhereUniqueInput
    create: XOR<PositionCreateWithoutIncumbentsInput, PositionUncheckedCreateWithoutIncumbentsInput>
  }

  export type PositionUpsertWithoutIncumbentsInput = {
    update: XOR<PositionUpdateWithoutIncumbentsInput, PositionUncheckedUpdateWithoutIncumbentsInput>
    create: XOR<PositionCreateWithoutIncumbentsInput, PositionUncheckedCreateWithoutIncumbentsInput>
    where?: PositionWhereInput
  }

  export type PositionUpdateToOneWithWhereWithoutIncumbentsInput = {
    where?: PositionWhereInput
    data: XOR<PositionUpdateWithoutIncumbentsInput, PositionUncheckedUpdateWithoutIncumbentsInput>
  }

  export type PositionUpdateWithoutIncumbentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    position_code?: StringFieldUpdateOperationsInput | string
    title_en?: StringFieldUpdateOperationsInput | string
    title_th?: NullableStringFieldUpdateOperationsInput | string | null
    company_id?: StringFieldUpdateOperationsInput | string
    job_grade?: NullableStringFieldUpdateOperationsInput | string | null
    job_family?: NullableStringFieldUpdateOperationsInput | string | null
    cost_center?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    reports_to_position_id?: NullableStringFieldUpdateOperationsInput | string | null
    matrix_reports_to_id?: NullableStringFieldUpdateOperationsInput | string | null
    headcount?: NullableIntFieldUpdateOperationsInput | number | null
    budget?: NullableIntFieldUpdateOperationsInput | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    department?: DepartmentUpdateOneRequiredWithoutPositionsNestedInput
  }

  export type PositionUncheckedUpdateWithoutIncumbentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    position_code?: StringFieldUpdateOperationsInput | string
    title_en?: StringFieldUpdateOperationsInput | string
    title_th?: NullableStringFieldUpdateOperationsInput | string | null
    department_id?: StringFieldUpdateOperationsInput | string
    company_id?: StringFieldUpdateOperationsInput | string
    job_grade?: NullableStringFieldUpdateOperationsInput | string | null
    job_family?: NullableStringFieldUpdateOperationsInput | string | null
    cost_center?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    reports_to_position_id?: NullableStringFieldUpdateOperationsInput | string | null
    matrix_reports_to_id?: NullableStringFieldUpdateOperationsInput | string | null
    headcount?: NullableIntFieldUpdateOperationsInput | number | null
    budget?: NullableIntFieldUpdateOperationsInput | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PositionCreateManyDepartmentInput = {
    id?: string
    position_code: string
    title_en: string
    title_th?: string | null
    company_id: string
    job_grade?: string | null
    job_family?: string | null
    cost_center?: string | null
    status?: string
    reports_to_position_id?: string | null
    matrix_reports_to_id?: string | null
    headcount?: number | null
    budget?: number | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type PositionUpdateWithoutDepartmentInput = {
    id?: StringFieldUpdateOperationsInput | string
    position_code?: StringFieldUpdateOperationsInput | string
    title_en?: StringFieldUpdateOperationsInput | string
    title_th?: NullableStringFieldUpdateOperationsInput | string | null
    company_id?: StringFieldUpdateOperationsInput | string
    job_grade?: NullableStringFieldUpdateOperationsInput | string | null
    job_family?: NullableStringFieldUpdateOperationsInput | string | null
    cost_center?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    reports_to_position_id?: NullableStringFieldUpdateOperationsInput | string | null
    matrix_reports_to_id?: NullableStringFieldUpdateOperationsInput | string | null
    headcount?: NullableIntFieldUpdateOperationsInput | number | null
    budget?: NullableIntFieldUpdateOperationsInput | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    incumbents?: IncumbentUpdateManyWithoutPositionNestedInput
  }

  export type PositionUncheckedUpdateWithoutDepartmentInput = {
    id?: StringFieldUpdateOperationsInput | string
    position_code?: StringFieldUpdateOperationsInput | string
    title_en?: StringFieldUpdateOperationsInput | string
    title_th?: NullableStringFieldUpdateOperationsInput | string | null
    company_id?: StringFieldUpdateOperationsInput | string
    job_grade?: NullableStringFieldUpdateOperationsInput | string | null
    job_family?: NullableStringFieldUpdateOperationsInput | string | null
    cost_center?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    reports_to_position_id?: NullableStringFieldUpdateOperationsInput | string | null
    matrix_reports_to_id?: NullableStringFieldUpdateOperationsInput | string | null
    headcount?: NullableIntFieldUpdateOperationsInput | number | null
    budget?: NullableIntFieldUpdateOperationsInput | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    incumbents?: IncumbentUncheckedUpdateManyWithoutPositionNestedInput
  }

  export type PositionUncheckedUpdateManyWithoutDepartmentInput = {
    id?: StringFieldUpdateOperationsInput | string
    position_code?: StringFieldUpdateOperationsInput | string
    title_en?: StringFieldUpdateOperationsInput | string
    title_th?: NullableStringFieldUpdateOperationsInput | string | null
    company_id?: StringFieldUpdateOperationsInput | string
    job_grade?: NullableStringFieldUpdateOperationsInput | string | null
    job_family?: NullableStringFieldUpdateOperationsInput | string | null
    cost_center?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    reports_to_position_id?: NullableStringFieldUpdateOperationsInput | string | null
    matrix_reports_to_id?: NullableStringFieldUpdateOperationsInput | string | null
    headcount?: NullableIntFieldUpdateOperationsInput | number | null
    budget?: NullableIntFieldUpdateOperationsInput | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IncumbentCreateManyPositionInput = {
    id?: string
    employee_id: string
    start_date: Date | string
    end_date?: Date | string | null
    is_primary?: boolean
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type IncumbentUpdateWithoutPositionInput = {
    id?: StringFieldUpdateOperationsInput | string
    employee_id?: StringFieldUpdateOperationsInput | string
    start_date?: DateTimeFieldUpdateOperationsInput | Date | string
    end_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    is_primary?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IncumbentUncheckedUpdateWithoutPositionInput = {
    id?: StringFieldUpdateOperationsInput | string
    employee_id?: StringFieldUpdateOperationsInput | string
    start_date?: DateTimeFieldUpdateOperationsInput | Date | string
    end_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    is_primary?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IncumbentUncheckedUpdateManyWithoutPositionInput = {
    id?: StringFieldUpdateOperationsInput | string
    employee_id?: StringFieldUpdateOperationsInput | string
    start_date?: DateTimeFieldUpdateOperationsInput | Date | string
    end_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    is_primary?: BoolFieldUpdateOperationsInput | boolean
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