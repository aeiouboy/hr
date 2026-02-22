
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
 * Model PayrollRun
 * 
 */
export type PayrollRun = $Result.DefaultSelection<Prisma.$PayrollRunPayload>
/**
 * Model Payslip
 * 
 */
export type Payslip = $Result.DefaultSelection<Prisma.$PayslipPayload>
/**
 * Model Compensation
 * 
 */
export type Compensation = $Result.DefaultSelection<Prisma.$CompensationPayload>
/**
 * Model TaxDeduction
 * 
 */
export type TaxDeduction = $Result.DefaultSelection<Prisma.$TaxDeductionPayload>
/**
 * Model GovernmentReport
 * 
 */
export type GovernmentReport = $Result.DefaultSelection<Prisma.$GovernmentReportPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more PayrollRuns
 * const payrollRuns = await prisma.payrollRun.findMany()
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
   * // Fetch zero or more PayrollRuns
   * const payrollRuns = await prisma.payrollRun.findMany()
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
   * `prisma.payrollRun`: Exposes CRUD operations for the **PayrollRun** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PayrollRuns
    * const payrollRuns = await prisma.payrollRun.findMany()
    * ```
    */
  get payrollRun(): Prisma.PayrollRunDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.payslip`: Exposes CRUD operations for the **Payslip** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Payslips
    * const payslips = await prisma.payslip.findMany()
    * ```
    */
  get payslip(): Prisma.PayslipDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.compensation`: Exposes CRUD operations for the **Compensation** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Compensations
    * const compensations = await prisma.compensation.findMany()
    * ```
    */
  get compensation(): Prisma.CompensationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.taxDeduction`: Exposes CRUD operations for the **TaxDeduction** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TaxDeductions
    * const taxDeductions = await prisma.taxDeduction.findMany()
    * ```
    */
  get taxDeduction(): Prisma.TaxDeductionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.governmentReport`: Exposes CRUD operations for the **GovernmentReport** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more GovernmentReports
    * const governmentReports = await prisma.governmentReport.findMany()
    * ```
    */
  get governmentReport(): Prisma.GovernmentReportDelegate<ExtArgs, ClientOptions>;
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
    PayrollRun: 'PayrollRun',
    Payslip: 'Payslip',
    Compensation: 'Compensation',
    TaxDeduction: 'TaxDeduction',
    GovernmentReport: 'GovernmentReport'
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
      modelProps: "payrollRun" | "payslip" | "compensation" | "taxDeduction" | "governmentReport"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      PayrollRun: {
        payload: Prisma.$PayrollRunPayload<ExtArgs>
        fields: Prisma.PayrollRunFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PayrollRunFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PayrollRunPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PayrollRunFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PayrollRunPayload>
          }
          findFirst: {
            args: Prisma.PayrollRunFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PayrollRunPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PayrollRunFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PayrollRunPayload>
          }
          findMany: {
            args: Prisma.PayrollRunFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PayrollRunPayload>[]
          }
          create: {
            args: Prisma.PayrollRunCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PayrollRunPayload>
          }
          createMany: {
            args: Prisma.PayrollRunCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PayrollRunCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PayrollRunPayload>[]
          }
          delete: {
            args: Prisma.PayrollRunDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PayrollRunPayload>
          }
          update: {
            args: Prisma.PayrollRunUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PayrollRunPayload>
          }
          deleteMany: {
            args: Prisma.PayrollRunDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PayrollRunUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PayrollRunUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PayrollRunPayload>[]
          }
          upsert: {
            args: Prisma.PayrollRunUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PayrollRunPayload>
          }
          aggregate: {
            args: Prisma.PayrollRunAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePayrollRun>
          }
          groupBy: {
            args: Prisma.PayrollRunGroupByArgs<ExtArgs>
            result: $Utils.Optional<PayrollRunGroupByOutputType>[]
          }
          count: {
            args: Prisma.PayrollRunCountArgs<ExtArgs>
            result: $Utils.Optional<PayrollRunCountAggregateOutputType> | number
          }
        }
      }
      Payslip: {
        payload: Prisma.$PayslipPayload<ExtArgs>
        fields: Prisma.PayslipFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PayslipFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PayslipPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PayslipFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PayslipPayload>
          }
          findFirst: {
            args: Prisma.PayslipFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PayslipPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PayslipFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PayslipPayload>
          }
          findMany: {
            args: Prisma.PayslipFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PayslipPayload>[]
          }
          create: {
            args: Prisma.PayslipCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PayslipPayload>
          }
          createMany: {
            args: Prisma.PayslipCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PayslipCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PayslipPayload>[]
          }
          delete: {
            args: Prisma.PayslipDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PayslipPayload>
          }
          update: {
            args: Prisma.PayslipUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PayslipPayload>
          }
          deleteMany: {
            args: Prisma.PayslipDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PayslipUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PayslipUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PayslipPayload>[]
          }
          upsert: {
            args: Prisma.PayslipUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PayslipPayload>
          }
          aggregate: {
            args: Prisma.PayslipAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePayslip>
          }
          groupBy: {
            args: Prisma.PayslipGroupByArgs<ExtArgs>
            result: $Utils.Optional<PayslipGroupByOutputType>[]
          }
          count: {
            args: Prisma.PayslipCountArgs<ExtArgs>
            result: $Utils.Optional<PayslipCountAggregateOutputType> | number
          }
        }
      }
      Compensation: {
        payload: Prisma.$CompensationPayload<ExtArgs>
        fields: Prisma.CompensationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CompensationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompensationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CompensationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompensationPayload>
          }
          findFirst: {
            args: Prisma.CompensationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompensationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CompensationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompensationPayload>
          }
          findMany: {
            args: Prisma.CompensationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompensationPayload>[]
          }
          create: {
            args: Prisma.CompensationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompensationPayload>
          }
          createMany: {
            args: Prisma.CompensationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CompensationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompensationPayload>[]
          }
          delete: {
            args: Prisma.CompensationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompensationPayload>
          }
          update: {
            args: Prisma.CompensationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompensationPayload>
          }
          deleteMany: {
            args: Prisma.CompensationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CompensationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CompensationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompensationPayload>[]
          }
          upsert: {
            args: Prisma.CompensationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompensationPayload>
          }
          aggregate: {
            args: Prisma.CompensationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCompensation>
          }
          groupBy: {
            args: Prisma.CompensationGroupByArgs<ExtArgs>
            result: $Utils.Optional<CompensationGroupByOutputType>[]
          }
          count: {
            args: Prisma.CompensationCountArgs<ExtArgs>
            result: $Utils.Optional<CompensationCountAggregateOutputType> | number
          }
        }
      }
      TaxDeduction: {
        payload: Prisma.$TaxDeductionPayload<ExtArgs>
        fields: Prisma.TaxDeductionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TaxDeductionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaxDeductionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TaxDeductionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaxDeductionPayload>
          }
          findFirst: {
            args: Prisma.TaxDeductionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaxDeductionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TaxDeductionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaxDeductionPayload>
          }
          findMany: {
            args: Prisma.TaxDeductionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaxDeductionPayload>[]
          }
          create: {
            args: Prisma.TaxDeductionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaxDeductionPayload>
          }
          createMany: {
            args: Prisma.TaxDeductionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TaxDeductionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaxDeductionPayload>[]
          }
          delete: {
            args: Prisma.TaxDeductionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaxDeductionPayload>
          }
          update: {
            args: Prisma.TaxDeductionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaxDeductionPayload>
          }
          deleteMany: {
            args: Prisma.TaxDeductionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TaxDeductionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TaxDeductionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaxDeductionPayload>[]
          }
          upsert: {
            args: Prisma.TaxDeductionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaxDeductionPayload>
          }
          aggregate: {
            args: Prisma.TaxDeductionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTaxDeduction>
          }
          groupBy: {
            args: Prisma.TaxDeductionGroupByArgs<ExtArgs>
            result: $Utils.Optional<TaxDeductionGroupByOutputType>[]
          }
          count: {
            args: Prisma.TaxDeductionCountArgs<ExtArgs>
            result: $Utils.Optional<TaxDeductionCountAggregateOutputType> | number
          }
        }
      }
      GovernmentReport: {
        payload: Prisma.$GovernmentReportPayload<ExtArgs>
        fields: Prisma.GovernmentReportFieldRefs
        operations: {
          findUnique: {
            args: Prisma.GovernmentReportFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GovernmentReportPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.GovernmentReportFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GovernmentReportPayload>
          }
          findFirst: {
            args: Prisma.GovernmentReportFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GovernmentReportPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.GovernmentReportFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GovernmentReportPayload>
          }
          findMany: {
            args: Prisma.GovernmentReportFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GovernmentReportPayload>[]
          }
          create: {
            args: Prisma.GovernmentReportCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GovernmentReportPayload>
          }
          createMany: {
            args: Prisma.GovernmentReportCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.GovernmentReportCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GovernmentReportPayload>[]
          }
          delete: {
            args: Prisma.GovernmentReportDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GovernmentReportPayload>
          }
          update: {
            args: Prisma.GovernmentReportUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GovernmentReportPayload>
          }
          deleteMany: {
            args: Prisma.GovernmentReportDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.GovernmentReportUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.GovernmentReportUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GovernmentReportPayload>[]
          }
          upsert: {
            args: Prisma.GovernmentReportUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GovernmentReportPayload>
          }
          aggregate: {
            args: Prisma.GovernmentReportAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateGovernmentReport>
          }
          groupBy: {
            args: Prisma.GovernmentReportGroupByArgs<ExtArgs>
            result: $Utils.Optional<GovernmentReportGroupByOutputType>[]
          }
          count: {
            args: Prisma.GovernmentReportCountArgs<ExtArgs>
            result: $Utils.Optional<GovernmentReportCountAggregateOutputType> | number
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
    payrollRun?: PayrollRunOmit
    payslip?: PayslipOmit
    compensation?: CompensationOmit
    taxDeduction?: TaxDeductionOmit
    governmentReport?: GovernmentReportOmit
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
   * Count Type PayrollRunCountOutputType
   */

  export type PayrollRunCountOutputType = {
    payslips: number
  }

  export type PayrollRunCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    payslips?: boolean | PayrollRunCountOutputTypeCountPayslipsArgs
  }

  // Custom InputTypes
  /**
   * PayrollRunCountOutputType without action
   */
  export type PayrollRunCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PayrollRunCountOutputType
     */
    select?: PayrollRunCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PayrollRunCountOutputType without action
   */
  export type PayrollRunCountOutputTypeCountPayslipsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PayslipWhereInput
  }


  /**
   * Models
   */

  /**
   * Model PayrollRun
   */

  export type AggregatePayrollRun = {
    _count: PayrollRunCountAggregateOutputType | null
    _avg: PayrollRunAvgAggregateOutputType | null
    _sum: PayrollRunSumAggregateOutputType | null
    _min: PayrollRunMinAggregateOutputType | null
    _max: PayrollRunMaxAggregateOutputType | null
  }

  export type PayrollRunAvgAggregateOutputType = {
    year: number | null
    month: number | null
    total_gross: number | null
    total_deductions: number | null
    total_net: number | null
    total_employer_cost: number | null
    employee_count: number | null
  }

  export type PayrollRunSumAggregateOutputType = {
    year: number | null
    month: number | null
    total_gross: number | null
    total_deductions: number | null
    total_net: number | null
    total_employer_cost: number | null
    employee_count: number | null
  }

  export type PayrollRunMinAggregateOutputType = {
    id: string | null
    period: string | null
    year: number | null
    month: number | null
    status: string | null
    type: string | null
    total_gross: number | null
    total_deductions: number | null
    total_net: number | null
    total_employer_cost: number | null
    employee_count: number | null
    created_by: string | null
    approved_by: string | null
    notes: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type PayrollRunMaxAggregateOutputType = {
    id: string | null
    period: string | null
    year: number | null
    month: number | null
    status: string | null
    type: string | null
    total_gross: number | null
    total_deductions: number | null
    total_net: number | null
    total_employer_cost: number | null
    employee_count: number | null
    created_by: string | null
    approved_by: string | null
    notes: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type PayrollRunCountAggregateOutputType = {
    id: number
    period: number
    year: number
    month: number
    status: number
    type: number
    total_gross: number
    total_deductions: number
    total_net: number
    total_employer_cost: number
    employee_count: number
    created_by: number
    approved_by: number
    notes: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type PayrollRunAvgAggregateInputType = {
    year?: true
    month?: true
    total_gross?: true
    total_deductions?: true
    total_net?: true
    total_employer_cost?: true
    employee_count?: true
  }

  export type PayrollRunSumAggregateInputType = {
    year?: true
    month?: true
    total_gross?: true
    total_deductions?: true
    total_net?: true
    total_employer_cost?: true
    employee_count?: true
  }

  export type PayrollRunMinAggregateInputType = {
    id?: true
    period?: true
    year?: true
    month?: true
    status?: true
    type?: true
    total_gross?: true
    total_deductions?: true
    total_net?: true
    total_employer_cost?: true
    employee_count?: true
    created_by?: true
    approved_by?: true
    notes?: true
    created_at?: true
    updated_at?: true
  }

  export type PayrollRunMaxAggregateInputType = {
    id?: true
    period?: true
    year?: true
    month?: true
    status?: true
    type?: true
    total_gross?: true
    total_deductions?: true
    total_net?: true
    total_employer_cost?: true
    employee_count?: true
    created_by?: true
    approved_by?: true
    notes?: true
    created_at?: true
    updated_at?: true
  }

  export type PayrollRunCountAggregateInputType = {
    id?: true
    period?: true
    year?: true
    month?: true
    status?: true
    type?: true
    total_gross?: true
    total_deductions?: true
    total_net?: true
    total_employer_cost?: true
    employee_count?: true
    created_by?: true
    approved_by?: true
    notes?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type PayrollRunAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PayrollRun to aggregate.
     */
    where?: PayrollRunWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PayrollRuns to fetch.
     */
    orderBy?: PayrollRunOrderByWithRelationInput | PayrollRunOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PayrollRunWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PayrollRuns from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PayrollRuns.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PayrollRuns
    **/
    _count?: true | PayrollRunCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PayrollRunAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PayrollRunSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PayrollRunMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PayrollRunMaxAggregateInputType
  }

  export type GetPayrollRunAggregateType<T extends PayrollRunAggregateArgs> = {
        [P in keyof T & keyof AggregatePayrollRun]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePayrollRun[P]>
      : GetScalarType<T[P], AggregatePayrollRun[P]>
  }




  export type PayrollRunGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PayrollRunWhereInput
    orderBy?: PayrollRunOrderByWithAggregationInput | PayrollRunOrderByWithAggregationInput[]
    by: PayrollRunScalarFieldEnum[] | PayrollRunScalarFieldEnum
    having?: PayrollRunScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PayrollRunCountAggregateInputType | true
    _avg?: PayrollRunAvgAggregateInputType
    _sum?: PayrollRunSumAggregateInputType
    _min?: PayrollRunMinAggregateInputType
    _max?: PayrollRunMaxAggregateInputType
  }

  export type PayrollRunGroupByOutputType = {
    id: string
    period: string
    year: number
    month: number
    status: string
    type: string
    total_gross: number
    total_deductions: number
    total_net: number
    total_employer_cost: number
    employee_count: number
    created_by: string
    approved_by: string | null
    notes: string | null
    created_at: Date
    updated_at: Date
    _count: PayrollRunCountAggregateOutputType | null
    _avg: PayrollRunAvgAggregateOutputType | null
    _sum: PayrollRunSumAggregateOutputType | null
    _min: PayrollRunMinAggregateOutputType | null
    _max: PayrollRunMaxAggregateOutputType | null
  }

  type GetPayrollRunGroupByPayload<T extends PayrollRunGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PayrollRunGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PayrollRunGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PayrollRunGroupByOutputType[P]>
            : GetScalarType<T[P], PayrollRunGroupByOutputType[P]>
        }
      >
    >


  export type PayrollRunSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    period?: boolean
    year?: boolean
    month?: boolean
    status?: boolean
    type?: boolean
    total_gross?: boolean
    total_deductions?: boolean
    total_net?: boolean
    total_employer_cost?: boolean
    employee_count?: boolean
    created_by?: boolean
    approved_by?: boolean
    notes?: boolean
    created_at?: boolean
    updated_at?: boolean
    payslips?: boolean | PayrollRun$payslipsArgs<ExtArgs>
    _count?: boolean | PayrollRunCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["payrollRun"]>

  export type PayrollRunSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    period?: boolean
    year?: boolean
    month?: boolean
    status?: boolean
    type?: boolean
    total_gross?: boolean
    total_deductions?: boolean
    total_net?: boolean
    total_employer_cost?: boolean
    employee_count?: boolean
    created_by?: boolean
    approved_by?: boolean
    notes?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["payrollRun"]>

  export type PayrollRunSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    period?: boolean
    year?: boolean
    month?: boolean
    status?: boolean
    type?: boolean
    total_gross?: boolean
    total_deductions?: boolean
    total_net?: boolean
    total_employer_cost?: boolean
    employee_count?: boolean
    created_by?: boolean
    approved_by?: boolean
    notes?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["payrollRun"]>

  export type PayrollRunSelectScalar = {
    id?: boolean
    period?: boolean
    year?: boolean
    month?: boolean
    status?: boolean
    type?: boolean
    total_gross?: boolean
    total_deductions?: boolean
    total_net?: boolean
    total_employer_cost?: boolean
    employee_count?: boolean
    created_by?: boolean
    approved_by?: boolean
    notes?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type PayrollRunOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "period" | "year" | "month" | "status" | "type" | "total_gross" | "total_deductions" | "total_net" | "total_employer_cost" | "employee_count" | "created_by" | "approved_by" | "notes" | "created_at" | "updated_at", ExtArgs["result"]["payrollRun"]>
  export type PayrollRunInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    payslips?: boolean | PayrollRun$payslipsArgs<ExtArgs>
    _count?: boolean | PayrollRunCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type PayrollRunIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type PayrollRunIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $PayrollRunPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PayrollRun"
    objects: {
      payslips: Prisma.$PayslipPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      period: string
      year: number
      month: number
      status: string
      type: string
      total_gross: number
      total_deductions: number
      total_net: number
      total_employer_cost: number
      employee_count: number
      created_by: string
      approved_by: string | null
      notes: string | null
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["payrollRun"]>
    composites: {}
  }

  type PayrollRunGetPayload<S extends boolean | null | undefined | PayrollRunDefaultArgs> = $Result.GetResult<Prisma.$PayrollRunPayload, S>

  type PayrollRunCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PayrollRunFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PayrollRunCountAggregateInputType | true
    }

  export interface PayrollRunDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PayrollRun'], meta: { name: 'PayrollRun' } }
    /**
     * Find zero or one PayrollRun that matches the filter.
     * @param {PayrollRunFindUniqueArgs} args - Arguments to find a PayrollRun
     * @example
     * // Get one PayrollRun
     * const payrollRun = await prisma.payrollRun.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PayrollRunFindUniqueArgs>(args: SelectSubset<T, PayrollRunFindUniqueArgs<ExtArgs>>): Prisma__PayrollRunClient<$Result.GetResult<Prisma.$PayrollRunPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one PayrollRun that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PayrollRunFindUniqueOrThrowArgs} args - Arguments to find a PayrollRun
     * @example
     * // Get one PayrollRun
     * const payrollRun = await prisma.payrollRun.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PayrollRunFindUniqueOrThrowArgs>(args: SelectSubset<T, PayrollRunFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PayrollRunClient<$Result.GetResult<Prisma.$PayrollRunPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PayrollRun that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PayrollRunFindFirstArgs} args - Arguments to find a PayrollRun
     * @example
     * // Get one PayrollRun
     * const payrollRun = await prisma.payrollRun.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PayrollRunFindFirstArgs>(args?: SelectSubset<T, PayrollRunFindFirstArgs<ExtArgs>>): Prisma__PayrollRunClient<$Result.GetResult<Prisma.$PayrollRunPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PayrollRun that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PayrollRunFindFirstOrThrowArgs} args - Arguments to find a PayrollRun
     * @example
     * // Get one PayrollRun
     * const payrollRun = await prisma.payrollRun.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PayrollRunFindFirstOrThrowArgs>(args?: SelectSubset<T, PayrollRunFindFirstOrThrowArgs<ExtArgs>>): Prisma__PayrollRunClient<$Result.GetResult<Prisma.$PayrollRunPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more PayrollRuns that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PayrollRunFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PayrollRuns
     * const payrollRuns = await prisma.payrollRun.findMany()
     * 
     * // Get first 10 PayrollRuns
     * const payrollRuns = await prisma.payrollRun.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const payrollRunWithIdOnly = await prisma.payrollRun.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PayrollRunFindManyArgs>(args?: SelectSubset<T, PayrollRunFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PayrollRunPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a PayrollRun.
     * @param {PayrollRunCreateArgs} args - Arguments to create a PayrollRun.
     * @example
     * // Create one PayrollRun
     * const PayrollRun = await prisma.payrollRun.create({
     *   data: {
     *     // ... data to create a PayrollRun
     *   }
     * })
     * 
     */
    create<T extends PayrollRunCreateArgs>(args: SelectSubset<T, PayrollRunCreateArgs<ExtArgs>>): Prisma__PayrollRunClient<$Result.GetResult<Prisma.$PayrollRunPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many PayrollRuns.
     * @param {PayrollRunCreateManyArgs} args - Arguments to create many PayrollRuns.
     * @example
     * // Create many PayrollRuns
     * const payrollRun = await prisma.payrollRun.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PayrollRunCreateManyArgs>(args?: SelectSubset<T, PayrollRunCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PayrollRuns and returns the data saved in the database.
     * @param {PayrollRunCreateManyAndReturnArgs} args - Arguments to create many PayrollRuns.
     * @example
     * // Create many PayrollRuns
     * const payrollRun = await prisma.payrollRun.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PayrollRuns and only return the `id`
     * const payrollRunWithIdOnly = await prisma.payrollRun.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PayrollRunCreateManyAndReturnArgs>(args?: SelectSubset<T, PayrollRunCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PayrollRunPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a PayrollRun.
     * @param {PayrollRunDeleteArgs} args - Arguments to delete one PayrollRun.
     * @example
     * // Delete one PayrollRun
     * const PayrollRun = await prisma.payrollRun.delete({
     *   where: {
     *     // ... filter to delete one PayrollRun
     *   }
     * })
     * 
     */
    delete<T extends PayrollRunDeleteArgs>(args: SelectSubset<T, PayrollRunDeleteArgs<ExtArgs>>): Prisma__PayrollRunClient<$Result.GetResult<Prisma.$PayrollRunPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one PayrollRun.
     * @param {PayrollRunUpdateArgs} args - Arguments to update one PayrollRun.
     * @example
     * // Update one PayrollRun
     * const payrollRun = await prisma.payrollRun.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PayrollRunUpdateArgs>(args: SelectSubset<T, PayrollRunUpdateArgs<ExtArgs>>): Prisma__PayrollRunClient<$Result.GetResult<Prisma.$PayrollRunPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more PayrollRuns.
     * @param {PayrollRunDeleteManyArgs} args - Arguments to filter PayrollRuns to delete.
     * @example
     * // Delete a few PayrollRuns
     * const { count } = await prisma.payrollRun.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PayrollRunDeleteManyArgs>(args?: SelectSubset<T, PayrollRunDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PayrollRuns.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PayrollRunUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PayrollRuns
     * const payrollRun = await prisma.payrollRun.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PayrollRunUpdateManyArgs>(args: SelectSubset<T, PayrollRunUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PayrollRuns and returns the data updated in the database.
     * @param {PayrollRunUpdateManyAndReturnArgs} args - Arguments to update many PayrollRuns.
     * @example
     * // Update many PayrollRuns
     * const payrollRun = await prisma.payrollRun.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more PayrollRuns and only return the `id`
     * const payrollRunWithIdOnly = await prisma.payrollRun.updateManyAndReturn({
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
    updateManyAndReturn<T extends PayrollRunUpdateManyAndReturnArgs>(args: SelectSubset<T, PayrollRunUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PayrollRunPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one PayrollRun.
     * @param {PayrollRunUpsertArgs} args - Arguments to update or create a PayrollRun.
     * @example
     * // Update or create a PayrollRun
     * const payrollRun = await prisma.payrollRun.upsert({
     *   create: {
     *     // ... data to create a PayrollRun
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PayrollRun we want to update
     *   }
     * })
     */
    upsert<T extends PayrollRunUpsertArgs>(args: SelectSubset<T, PayrollRunUpsertArgs<ExtArgs>>): Prisma__PayrollRunClient<$Result.GetResult<Prisma.$PayrollRunPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of PayrollRuns.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PayrollRunCountArgs} args - Arguments to filter PayrollRuns to count.
     * @example
     * // Count the number of PayrollRuns
     * const count = await prisma.payrollRun.count({
     *   where: {
     *     // ... the filter for the PayrollRuns we want to count
     *   }
     * })
    **/
    count<T extends PayrollRunCountArgs>(
      args?: Subset<T, PayrollRunCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PayrollRunCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PayrollRun.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PayrollRunAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends PayrollRunAggregateArgs>(args: Subset<T, PayrollRunAggregateArgs>): Prisma.PrismaPromise<GetPayrollRunAggregateType<T>>

    /**
     * Group by PayrollRun.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PayrollRunGroupByArgs} args - Group by arguments.
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
      T extends PayrollRunGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PayrollRunGroupByArgs['orderBy'] }
        : { orderBy?: PayrollRunGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, PayrollRunGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPayrollRunGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PayrollRun model
   */
  readonly fields: PayrollRunFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PayrollRun.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PayrollRunClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    payslips<T extends PayrollRun$payslipsArgs<ExtArgs> = {}>(args?: Subset<T, PayrollRun$payslipsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PayslipPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the PayrollRun model
   */
  interface PayrollRunFieldRefs {
    readonly id: FieldRef<"PayrollRun", 'String'>
    readonly period: FieldRef<"PayrollRun", 'String'>
    readonly year: FieldRef<"PayrollRun", 'Int'>
    readonly month: FieldRef<"PayrollRun", 'Int'>
    readonly status: FieldRef<"PayrollRun", 'String'>
    readonly type: FieldRef<"PayrollRun", 'String'>
    readonly total_gross: FieldRef<"PayrollRun", 'Float'>
    readonly total_deductions: FieldRef<"PayrollRun", 'Float'>
    readonly total_net: FieldRef<"PayrollRun", 'Float'>
    readonly total_employer_cost: FieldRef<"PayrollRun", 'Float'>
    readonly employee_count: FieldRef<"PayrollRun", 'Int'>
    readonly created_by: FieldRef<"PayrollRun", 'String'>
    readonly approved_by: FieldRef<"PayrollRun", 'String'>
    readonly notes: FieldRef<"PayrollRun", 'String'>
    readonly created_at: FieldRef<"PayrollRun", 'DateTime'>
    readonly updated_at: FieldRef<"PayrollRun", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * PayrollRun findUnique
   */
  export type PayrollRunFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PayrollRun
     */
    select?: PayrollRunSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PayrollRun
     */
    omit?: PayrollRunOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PayrollRunInclude<ExtArgs> | null
    /**
     * Filter, which PayrollRun to fetch.
     */
    where: PayrollRunWhereUniqueInput
  }

  /**
   * PayrollRun findUniqueOrThrow
   */
  export type PayrollRunFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PayrollRun
     */
    select?: PayrollRunSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PayrollRun
     */
    omit?: PayrollRunOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PayrollRunInclude<ExtArgs> | null
    /**
     * Filter, which PayrollRun to fetch.
     */
    where: PayrollRunWhereUniqueInput
  }

  /**
   * PayrollRun findFirst
   */
  export type PayrollRunFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PayrollRun
     */
    select?: PayrollRunSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PayrollRun
     */
    omit?: PayrollRunOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PayrollRunInclude<ExtArgs> | null
    /**
     * Filter, which PayrollRun to fetch.
     */
    where?: PayrollRunWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PayrollRuns to fetch.
     */
    orderBy?: PayrollRunOrderByWithRelationInput | PayrollRunOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PayrollRuns.
     */
    cursor?: PayrollRunWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PayrollRuns from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PayrollRuns.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PayrollRuns.
     */
    distinct?: PayrollRunScalarFieldEnum | PayrollRunScalarFieldEnum[]
  }

  /**
   * PayrollRun findFirstOrThrow
   */
  export type PayrollRunFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PayrollRun
     */
    select?: PayrollRunSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PayrollRun
     */
    omit?: PayrollRunOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PayrollRunInclude<ExtArgs> | null
    /**
     * Filter, which PayrollRun to fetch.
     */
    where?: PayrollRunWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PayrollRuns to fetch.
     */
    orderBy?: PayrollRunOrderByWithRelationInput | PayrollRunOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PayrollRuns.
     */
    cursor?: PayrollRunWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PayrollRuns from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PayrollRuns.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PayrollRuns.
     */
    distinct?: PayrollRunScalarFieldEnum | PayrollRunScalarFieldEnum[]
  }

  /**
   * PayrollRun findMany
   */
  export type PayrollRunFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PayrollRun
     */
    select?: PayrollRunSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PayrollRun
     */
    omit?: PayrollRunOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PayrollRunInclude<ExtArgs> | null
    /**
     * Filter, which PayrollRuns to fetch.
     */
    where?: PayrollRunWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PayrollRuns to fetch.
     */
    orderBy?: PayrollRunOrderByWithRelationInput | PayrollRunOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PayrollRuns.
     */
    cursor?: PayrollRunWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PayrollRuns from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PayrollRuns.
     */
    skip?: number
    distinct?: PayrollRunScalarFieldEnum | PayrollRunScalarFieldEnum[]
  }

  /**
   * PayrollRun create
   */
  export type PayrollRunCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PayrollRun
     */
    select?: PayrollRunSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PayrollRun
     */
    omit?: PayrollRunOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PayrollRunInclude<ExtArgs> | null
    /**
     * The data needed to create a PayrollRun.
     */
    data: XOR<PayrollRunCreateInput, PayrollRunUncheckedCreateInput>
  }

  /**
   * PayrollRun createMany
   */
  export type PayrollRunCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PayrollRuns.
     */
    data: PayrollRunCreateManyInput | PayrollRunCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PayrollRun createManyAndReturn
   */
  export type PayrollRunCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PayrollRun
     */
    select?: PayrollRunSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PayrollRun
     */
    omit?: PayrollRunOmit<ExtArgs> | null
    /**
     * The data used to create many PayrollRuns.
     */
    data: PayrollRunCreateManyInput | PayrollRunCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PayrollRun update
   */
  export type PayrollRunUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PayrollRun
     */
    select?: PayrollRunSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PayrollRun
     */
    omit?: PayrollRunOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PayrollRunInclude<ExtArgs> | null
    /**
     * The data needed to update a PayrollRun.
     */
    data: XOR<PayrollRunUpdateInput, PayrollRunUncheckedUpdateInput>
    /**
     * Choose, which PayrollRun to update.
     */
    where: PayrollRunWhereUniqueInput
  }

  /**
   * PayrollRun updateMany
   */
  export type PayrollRunUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PayrollRuns.
     */
    data: XOR<PayrollRunUpdateManyMutationInput, PayrollRunUncheckedUpdateManyInput>
    /**
     * Filter which PayrollRuns to update
     */
    where?: PayrollRunWhereInput
    /**
     * Limit how many PayrollRuns to update.
     */
    limit?: number
  }

  /**
   * PayrollRun updateManyAndReturn
   */
  export type PayrollRunUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PayrollRun
     */
    select?: PayrollRunSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PayrollRun
     */
    omit?: PayrollRunOmit<ExtArgs> | null
    /**
     * The data used to update PayrollRuns.
     */
    data: XOR<PayrollRunUpdateManyMutationInput, PayrollRunUncheckedUpdateManyInput>
    /**
     * Filter which PayrollRuns to update
     */
    where?: PayrollRunWhereInput
    /**
     * Limit how many PayrollRuns to update.
     */
    limit?: number
  }

  /**
   * PayrollRun upsert
   */
  export type PayrollRunUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PayrollRun
     */
    select?: PayrollRunSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PayrollRun
     */
    omit?: PayrollRunOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PayrollRunInclude<ExtArgs> | null
    /**
     * The filter to search for the PayrollRun to update in case it exists.
     */
    where: PayrollRunWhereUniqueInput
    /**
     * In case the PayrollRun found by the `where` argument doesn't exist, create a new PayrollRun with this data.
     */
    create: XOR<PayrollRunCreateInput, PayrollRunUncheckedCreateInput>
    /**
     * In case the PayrollRun was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PayrollRunUpdateInput, PayrollRunUncheckedUpdateInput>
  }

  /**
   * PayrollRun delete
   */
  export type PayrollRunDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PayrollRun
     */
    select?: PayrollRunSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PayrollRun
     */
    omit?: PayrollRunOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PayrollRunInclude<ExtArgs> | null
    /**
     * Filter which PayrollRun to delete.
     */
    where: PayrollRunWhereUniqueInput
  }

  /**
   * PayrollRun deleteMany
   */
  export type PayrollRunDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PayrollRuns to delete
     */
    where?: PayrollRunWhereInput
    /**
     * Limit how many PayrollRuns to delete.
     */
    limit?: number
  }

  /**
   * PayrollRun.payslips
   */
  export type PayrollRun$payslipsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payslip
     */
    select?: PayslipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payslip
     */
    omit?: PayslipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PayslipInclude<ExtArgs> | null
    where?: PayslipWhereInput
    orderBy?: PayslipOrderByWithRelationInput | PayslipOrderByWithRelationInput[]
    cursor?: PayslipWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PayslipScalarFieldEnum | PayslipScalarFieldEnum[]
  }

  /**
   * PayrollRun without action
   */
  export type PayrollRunDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PayrollRun
     */
    select?: PayrollRunSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PayrollRun
     */
    omit?: PayrollRunOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PayrollRunInclude<ExtArgs> | null
  }


  /**
   * Model Payslip
   */

  export type AggregatePayslip = {
    _count: PayslipCountAggregateOutputType | null
    _avg: PayslipAvgAggregateOutputType | null
    _sum: PayslipSumAggregateOutputType | null
    _min: PayslipMinAggregateOutputType | null
    _max: PayslipMaxAggregateOutputType | null
  }

  export type PayslipAvgAggregateOutputType = {
    base_salary: number | null
    total_earnings: number | null
    total_deductions: number | null
    tax_amount: number | null
    sso_amount: number | null
    provident_fund_employee: number | null
    provident_fund_employer: number | null
  }

  export type PayslipSumAggregateOutputType = {
    base_salary: number | null
    total_earnings: number | null
    total_deductions: number | null
    tax_amount: number | null
    sso_amount: number | null
    provident_fund_employee: number | null
    provident_fund_employer: number | null
  }

  export type PayslipMinAggregateOutputType = {
    id: string | null
    payroll_run_id: string | null
    employee_id: string | null
    base_salary: number | null
    gross_salary: string | null
    total_earnings: number | null
    total_deductions: number | null
    net_salary: string | null
    tax_amount: number | null
    sso_amount: number | null
    provident_fund_employee: number | null
    provident_fund_employer: number | null
    bank_code: string | null
    bank_account: string | null
    payment_status: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type PayslipMaxAggregateOutputType = {
    id: string | null
    payroll_run_id: string | null
    employee_id: string | null
    base_salary: number | null
    gross_salary: string | null
    total_earnings: number | null
    total_deductions: number | null
    net_salary: string | null
    tax_amount: number | null
    sso_amount: number | null
    provident_fund_employee: number | null
    provident_fund_employer: number | null
    bank_code: string | null
    bank_account: string | null
    payment_status: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type PayslipCountAggregateOutputType = {
    id: number
    payroll_run_id: number
    employee_id: number
    base_salary: number
    gross_salary: number
    total_earnings: number
    total_deductions: number
    net_salary: number
    tax_amount: number
    sso_amount: number
    provident_fund_employee: number
    provident_fund_employer: number
    earnings_detail: number
    deductions_detail: number
    bank_code: number
    bank_account: number
    payment_status: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type PayslipAvgAggregateInputType = {
    base_salary?: true
    total_earnings?: true
    total_deductions?: true
    tax_amount?: true
    sso_amount?: true
    provident_fund_employee?: true
    provident_fund_employer?: true
  }

  export type PayslipSumAggregateInputType = {
    base_salary?: true
    total_earnings?: true
    total_deductions?: true
    tax_amount?: true
    sso_amount?: true
    provident_fund_employee?: true
    provident_fund_employer?: true
  }

  export type PayslipMinAggregateInputType = {
    id?: true
    payroll_run_id?: true
    employee_id?: true
    base_salary?: true
    gross_salary?: true
    total_earnings?: true
    total_deductions?: true
    net_salary?: true
    tax_amount?: true
    sso_amount?: true
    provident_fund_employee?: true
    provident_fund_employer?: true
    bank_code?: true
    bank_account?: true
    payment_status?: true
    created_at?: true
    updated_at?: true
  }

  export type PayslipMaxAggregateInputType = {
    id?: true
    payroll_run_id?: true
    employee_id?: true
    base_salary?: true
    gross_salary?: true
    total_earnings?: true
    total_deductions?: true
    net_salary?: true
    tax_amount?: true
    sso_amount?: true
    provident_fund_employee?: true
    provident_fund_employer?: true
    bank_code?: true
    bank_account?: true
    payment_status?: true
    created_at?: true
    updated_at?: true
  }

  export type PayslipCountAggregateInputType = {
    id?: true
    payroll_run_id?: true
    employee_id?: true
    base_salary?: true
    gross_salary?: true
    total_earnings?: true
    total_deductions?: true
    net_salary?: true
    tax_amount?: true
    sso_amount?: true
    provident_fund_employee?: true
    provident_fund_employer?: true
    earnings_detail?: true
    deductions_detail?: true
    bank_code?: true
    bank_account?: true
    payment_status?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type PayslipAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Payslip to aggregate.
     */
    where?: PayslipWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Payslips to fetch.
     */
    orderBy?: PayslipOrderByWithRelationInput | PayslipOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PayslipWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Payslips from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Payslips.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Payslips
    **/
    _count?: true | PayslipCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PayslipAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PayslipSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PayslipMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PayslipMaxAggregateInputType
  }

  export type GetPayslipAggregateType<T extends PayslipAggregateArgs> = {
        [P in keyof T & keyof AggregatePayslip]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePayslip[P]>
      : GetScalarType<T[P], AggregatePayslip[P]>
  }




  export type PayslipGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PayslipWhereInput
    orderBy?: PayslipOrderByWithAggregationInput | PayslipOrderByWithAggregationInput[]
    by: PayslipScalarFieldEnum[] | PayslipScalarFieldEnum
    having?: PayslipScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PayslipCountAggregateInputType | true
    _avg?: PayslipAvgAggregateInputType
    _sum?: PayslipSumAggregateInputType
    _min?: PayslipMinAggregateInputType
    _max?: PayslipMaxAggregateInputType
  }

  export type PayslipGroupByOutputType = {
    id: string
    payroll_run_id: string
    employee_id: string
    base_salary: number
    gross_salary: string
    total_earnings: number
    total_deductions: number
    net_salary: string
    tax_amount: number
    sso_amount: number
    provident_fund_employee: number
    provident_fund_employer: number
    earnings_detail: JsonValue | null
    deductions_detail: JsonValue | null
    bank_code: string | null
    bank_account: string | null
    payment_status: string
    created_at: Date
    updated_at: Date
    _count: PayslipCountAggregateOutputType | null
    _avg: PayslipAvgAggregateOutputType | null
    _sum: PayslipSumAggregateOutputType | null
    _min: PayslipMinAggregateOutputType | null
    _max: PayslipMaxAggregateOutputType | null
  }

  type GetPayslipGroupByPayload<T extends PayslipGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PayslipGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PayslipGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PayslipGroupByOutputType[P]>
            : GetScalarType<T[P], PayslipGroupByOutputType[P]>
        }
      >
    >


  export type PayslipSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    payroll_run_id?: boolean
    employee_id?: boolean
    base_salary?: boolean
    gross_salary?: boolean
    total_earnings?: boolean
    total_deductions?: boolean
    net_salary?: boolean
    tax_amount?: boolean
    sso_amount?: boolean
    provident_fund_employee?: boolean
    provident_fund_employer?: boolean
    earnings_detail?: boolean
    deductions_detail?: boolean
    bank_code?: boolean
    bank_account?: boolean
    payment_status?: boolean
    created_at?: boolean
    updated_at?: boolean
    payroll_run?: boolean | PayrollRunDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["payslip"]>

  export type PayslipSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    payroll_run_id?: boolean
    employee_id?: boolean
    base_salary?: boolean
    gross_salary?: boolean
    total_earnings?: boolean
    total_deductions?: boolean
    net_salary?: boolean
    tax_amount?: boolean
    sso_amount?: boolean
    provident_fund_employee?: boolean
    provident_fund_employer?: boolean
    earnings_detail?: boolean
    deductions_detail?: boolean
    bank_code?: boolean
    bank_account?: boolean
    payment_status?: boolean
    created_at?: boolean
    updated_at?: boolean
    payroll_run?: boolean | PayrollRunDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["payslip"]>

  export type PayslipSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    payroll_run_id?: boolean
    employee_id?: boolean
    base_salary?: boolean
    gross_salary?: boolean
    total_earnings?: boolean
    total_deductions?: boolean
    net_salary?: boolean
    tax_amount?: boolean
    sso_amount?: boolean
    provident_fund_employee?: boolean
    provident_fund_employer?: boolean
    earnings_detail?: boolean
    deductions_detail?: boolean
    bank_code?: boolean
    bank_account?: boolean
    payment_status?: boolean
    created_at?: boolean
    updated_at?: boolean
    payroll_run?: boolean | PayrollRunDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["payslip"]>

  export type PayslipSelectScalar = {
    id?: boolean
    payroll_run_id?: boolean
    employee_id?: boolean
    base_salary?: boolean
    gross_salary?: boolean
    total_earnings?: boolean
    total_deductions?: boolean
    net_salary?: boolean
    tax_amount?: boolean
    sso_amount?: boolean
    provident_fund_employee?: boolean
    provident_fund_employer?: boolean
    earnings_detail?: boolean
    deductions_detail?: boolean
    bank_code?: boolean
    bank_account?: boolean
    payment_status?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type PayslipOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "payroll_run_id" | "employee_id" | "base_salary" | "gross_salary" | "total_earnings" | "total_deductions" | "net_salary" | "tax_amount" | "sso_amount" | "provident_fund_employee" | "provident_fund_employer" | "earnings_detail" | "deductions_detail" | "bank_code" | "bank_account" | "payment_status" | "created_at" | "updated_at", ExtArgs["result"]["payslip"]>
  export type PayslipInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    payroll_run?: boolean | PayrollRunDefaultArgs<ExtArgs>
  }
  export type PayslipIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    payroll_run?: boolean | PayrollRunDefaultArgs<ExtArgs>
  }
  export type PayslipIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    payroll_run?: boolean | PayrollRunDefaultArgs<ExtArgs>
  }

  export type $PayslipPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Payslip"
    objects: {
      payroll_run: Prisma.$PayrollRunPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      payroll_run_id: string
      employee_id: string
      base_salary: number
      gross_salary: string
      total_earnings: number
      total_deductions: number
      net_salary: string
      tax_amount: number
      sso_amount: number
      provident_fund_employee: number
      provident_fund_employer: number
      earnings_detail: Prisma.JsonValue | null
      deductions_detail: Prisma.JsonValue | null
      bank_code: string | null
      bank_account: string | null
      payment_status: string
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["payslip"]>
    composites: {}
  }

  type PayslipGetPayload<S extends boolean | null | undefined | PayslipDefaultArgs> = $Result.GetResult<Prisma.$PayslipPayload, S>

  type PayslipCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PayslipFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PayslipCountAggregateInputType | true
    }

  export interface PayslipDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Payslip'], meta: { name: 'Payslip' } }
    /**
     * Find zero or one Payslip that matches the filter.
     * @param {PayslipFindUniqueArgs} args - Arguments to find a Payslip
     * @example
     * // Get one Payslip
     * const payslip = await prisma.payslip.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PayslipFindUniqueArgs>(args: SelectSubset<T, PayslipFindUniqueArgs<ExtArgs>>): Prisma__PayslipClient<$Result.GetResult<Prisma.$PayslipPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Payslip that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PayslipFindUniqueOrThrowArgs} args - Arguments to find a Payslip
     * @example
     * // Get one Payslip
     * const payslip = await prisma.payslip.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PayslipFindUniqueOrThrowArgs>(args: SelectSubset<T, PayslipFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PayslipClient<$Result.GetResult<Prisma.$PayslipPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Payslip that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PayslipFindFirstArgs} args - Arguments to find a Payslip
     * @example
     * // Get one Payslip
     * const payslip = await prisma.payslip.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PayslipFindFirstArgs>(args?: SelectSubset<T, PayslipFindFirstArgs<ExtArgs>>): Prisma__PayslipClient<$Result.GetResult<Prisma.$PayslipPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Payslip that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PayslipFindFirstOrThrowArgs} args - Arguments to find a Payslip
     * @example
     * // Get one Payslip
     * const payslip = await prisma.payslip.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PayslipFindFirstOrThrowArgs>(args?: SelectSubset<T, PayslipFindFirstOrThrowArgs<ExtArgs>>): Prisma__PayslipClient<$Result.GetResult<Prisma.$PayslipPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Payslips that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PayslipFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Payslips
     * const payslips = await prisma.payslip.findMany()
     * 
     * // Get first 10 Payslips
     * const payslips = await prisma.payslip.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const payslipWithIdOnly = await prisma.payslip.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PayslipFindManyArgs>(args?: SelectSubset<T, PayslipFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PayslipPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Payslip.
     * @param {PayslipCreateArgs} args - Arguments to create a Payslip.
     * @example
     * // Create one Payslip
     * const Payslip = await prisma.payslip.create({
     *   data: {
     *     // ... data to create a Payslip
     *   }
     * })
     * 
     */
    create<T extends PayslipCreateArgs>(args: SelectSubset<T, PayslipCreateArgs<ExtArgs>>): Prisma__PayslipClient<$Result.GetResult<Prisma.$PayslipPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Payslips.
     * @param {PayslipCreateManyArgs} args - Arguments to create many Payslips.
     * @example
     * // Create many Payslips
     * const payslip = await prisma.payslip.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PayslipCreateManyArgs>(args?: SelectSubset<T, PayslipCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Payslips and returns the data saved in the database.
     * @param {PayslipCreateManyAndReturnArgs} args - Arguments to create many Payslips.
     * @example
     * // Create many Payslips
     * const payslip = await prisma.payslip.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Payslips and only return the `id`
     * const payslipWithIdOnly = await prisma.payslip.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PayslipCreateManyAndReturnArgs>(args?: SelectSubset<T, PayslipCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PayslipPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Payslip.
     * @param {PayslipDeleteArgs} args - Arguments to delete one Payslip.
     * @example
     * // Delete one Payslip
     * const Payslip = await prisma.payslip.delete({
     *   where: {
     *     // ... filter to delete one Payslip
     *   }
     * })
     * 
     */
    delete<T extends PayslipDeleteArgs>(args: SelectSubset<T, PayslipDeleteArgs<ExtArgs>>): Prisma__PayslipClient<$Result.GetResult<Prisma.$PayslipPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Payslip.
     * @param {PayslipUpdateArgs} args - Arguments to update one Payslip.
     * @example
     * // Update one Payslip
     * const payslip = await prisma.payslip.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PayslipUpdateArgs>(args: SelectSubset<T, PayslipUpdateArgs<ExtArgs>>): Prisma__PayslipClient<$Result.GetResult<Prisma.$PayslipPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Payslips.
     * @param {PayslipDeleteManyArgs} args - Arguments to filter Payslips to delete.
     * @example
     * // Delete a few Payslips
     * const { count } = await prisma.payslip.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PayslipDeleteManyArgs>(args?: SelectSubset<T, PayslipDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Payslips.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PayslipUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Payslips
     * const payslip = await prisma.payslip.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PayslipUpdateManyArgs>(args: SelectSubset<T, PayslipUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Payslips and returns the data updated in the database.
     * @param {PayslipUpdateManyAndReturnArgs} args - Arguments to update many Payslips.
     * @example
     * // Update many Payslips
     * const payslip = await prisma.payslip.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Payslips and only return the `id`
     * const payslipWithIdOnly = await prisma.payslip.updateManyAndReturn({
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
    updateManyAndReturn<T extends PayslipUpdateManyAndReturnArgs>(args: SelectSubset<T, PayslipUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PayslipPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Payslip.
     * @param {PayslipUpsertArgs} args - Arguments to update or create a Payslip.
     * @example
     * // Update or create a Payslip
     * const payslip = await prisma.payslip.upsert({
     *   create: {
     *     // ... data to create a Payslip
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Payslip we want to update
     *   }
     * })
     */
    upsert<T extends PayslipUpsertArgs>(args: SelectSubset<T, PayslipUpsertArgs<ExtArgs>>): Prisma__PayslipClient<$Result.GetResult<Prisma.$PayslipPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Payslips.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PayslipCountArgs} args - Arguments to filter Payslips to count.
     * @example
     * // Count the number of Payslips
     * const count = await prisma.payslip.count({
     *   where: {
     *     // ... the filter for the Payslips we want to count
     *   }
     * })
    **/
    count<T extends PayslipCountArgs>(
      args?: Subset<T, PayslipCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PayslipCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Payslip.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PayslipAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends PayslipAggregateArgs>(args: Subset<T, PayslipAggregateArgs>): Prisma.PrismaPromise<GetPayslipAggregateType<T>>

    /**
     * Group by Payslip.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PayslipGroupByArgs} args - Group by arguments.
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
      T extends PayslipGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PayslipGroupByArgs['orderBy'] }
        : { orderBy?: PayslipGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, PayslipGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPayslipGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Payslip model
   */
  readonly fields: PayslipFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Payslip.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PayslipClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    payroll_run<T extends PayrollRunDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PayrollRunDefaultArgs<ExtArgs>>): Prisma__PayrollRunClient<$Result.GetResult<Prisma.$PayrollRunPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the Payslip model
   */
  interface PayslipFieldRefs {
    readonly id: FieldRef<"Payslip", 'String'>
    readonly payroll_run_id: FieldRef<"Payslip", 'String'>
    readonly employee_id: FieldRef<"Payslip", 'String'>
    readonly base_salary: FieldRef<"Payslip", 'Float'>
    readonly gross_salary: FieldRef<"Payslip", 'String'>
    readonly total_earnings: FieldRef<"Payslip", 'Float'>
    readonly total_deductions: FieldRef<"Payslip", 'Float'>
    readonly net_salary: FieldRef<"Payslip", 'String'>
    readonly tax_amount: FieldRef<"Payslip", 'Float'>
    readonly sso_amount: FieldRef<"Payslip", 'Float'>
    readonly provident_fund_employee: FieldRef<"Payslip", 'Float'>
    readonly provident_fund_employer: FieldRef<"Payslip", 'Float'>
    readonly earnings_detail: FieldRef<"Payslip", 'Json'>
    readonly deductions_detail: FieldRef<"Payslip", 'Json'>
    readonly bank_code: FieldRef<"Payslip", 'String'>
    readonly bank_account: FieldRef<"Payslip", 'String'>
    readonly payment_status: FieldRef<"Payslip", 'String'>
    readonly created_at: FieldRef<"Payslip", 'DateTime'>
    readonly updated_at: FieldRef<"Payslip", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Payslip findUnique
   */
  export type PayslipFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payslip
     */
    select?: PayslipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payslip
     */
    omit?: PayslipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PayslipInclude<ExtArgs> | null
    /**
     * Filter, which Payslip to fetch.
     */
    where: PayslipWhereUniqueInput
  }

  /**
   * Payslip findUniqueOrThrow
   */
  export type PayslipFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payslip
     */
    select?: PayslipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payslip
     */
    omit?: PayslipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PayslipInclude<ExtArgs> | null
    /**
     * Filter, which Payslip to fetch.
     */
    where: PayslipWhereUniqueInput
  }

  /**
   * Payslip findFirst
   */
  export type PayslipFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payslip
     */
    select?: PayslipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payslip
     */
    omit?: PayslipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PayslipInclude<ExtArgs> | null
    /**
     * Filter, which Payslip to fetch.
     */
    where?: PayslipWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Payslips to fetch.
     */
    orderBy?: PayslipOrderByWithRelationInput | PayslipOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Payslips.
     */
    cursor?: PayslipWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Payslips from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Payslips.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Payslips.
     */
    distinct?: PayslipScalarFieldEnum | PayslipScalarFieldEnum[]
  }

  /**
   * Payslip findFirstOrThrow
   */
  export type PayslipFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payslip
     */
    select?: PayslipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payslip
     */
    omit?: PayslipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PayslipInclude<ExtArgs> | null
    /**
     * Filter, which Payslip to fetch.
     */
    where?: PayslipWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Payslips to fetch.
     */
    orderBy?: PayslipOrderByWithRelationInput | PayslipOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Payslips.
     */
    cursor?: PayslipWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Payslips from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Payslips.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Payslips.
     */
    distinct?: PayslipScalarFieldEnum | PayslipScalarFieldEnum[]
  }

  /**
   * Payslip findMany
   */
  export type PayslipFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payslip
     */
    select?: PayslipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payslip
     */
    omit?: PayslipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PayslipInclude<ExtArgs> | null
    /**
     * Filter, which Payslips to fetch.
     */
    where?: PayslipWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Payslips to fetch.
     */
    orderBy?: PayslipOrderByWithRelationInput | PayslipOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Payslips.
     */
    cursor?: PayslipWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Payslips from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Payslips.
     */
    skip?: number
    distinct?: PayslipScalarFieldEnum | PayslipScalarFieldEnum[]
  }

  /**
   * Payslip create
   */
  export type PayslipCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payslip
     */
    select?: PayslipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payslip
     */
    omit?: PayslipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PayslipInclude<ExtArgs> | null
    /**
     * The data needed to create a Payslip.
     */
    data: XOR<PayslipCreateInput, PayslipUncheckedCreateInput>
  }

  /**
   * Payslip createMany
   */
  export type PayslipCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Payslips.
     */
    data: PayslipCreateManyInput | PayslipCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Payslip createManyAndReturn
   */
  export type PayslipCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payslip
     */
    select?: PayslipSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Payslip
     */
    omit?: PayslipOmit<ExtArgs> | null
    /**
     * The data used to create many Payslips.
     */
    data: PayslipCreateManyInput | PayslipCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PayslipIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Payslip update
   */
  export type PayslipUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payslip
     */
    select?: PayslipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payslip
     */
    omit?: PayslipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PayslipInclude<ExtArgs> | null
    /**
     * The data needed to update a Payslip.
     */
    data: XOR<PayslipUpdateInput, PayslipUncheckedUpdateInput>
    /**
     * Choose, which Payslip to update.
     */
    where: PayslipWhereUniqueInput
  }

  /**
   * Payslip updateMany
   */
  export type PayslipUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Payslips.
     */
    data: XOR<PayslipUpdateManyMutationInput, PayslipUncheckedUpdateManyInput>
    /**
     * Filter which Payslips to update
     */
    where?: PayslipWhereInput
    /**
     * Limit how many Payslips to update.
     */
    limit?: number
  }

  /**
   * Payslip updateManyAndReturn
   */
  export type PayslipUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payslip
     */
    select?: PayslipSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Payslip
     */
    omit?: PayslipOmit<ExtArgs> | null
    /**
     * The data used to update Payslips.
     */
    data: XOR<PayslipUpdateManyMutationInput, PayslipUncheckedUpdateManyInput>
    /**
     * Filter which Payslips to update
     */
    where?: PayslipWhereInput
    /**
     * Limit how many Payslips to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PayslipIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Payslip upsert
   */
  export type PayslipUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payslip
     */
    select?: PayslipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payslip
     */
    omit?: PayslipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PayslipInclude<ExtArgs> | null
    /**
     * The filter to search for the Payslip to update in case it exists.
     */
    where: PayslipWhereUniqueInput
    /**
     * In case the Payslip found by the `where` argument doesn't exist, create a new Payslip with this data.
     */
    create: XOR<PayslipCreateInput, PayslipUncheckedCreateInput>
    /**
     * In case the Payslip was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PayslipUpdateInput, PayslipUncheckedUpdateInput>
  }

  /**
   * Payslip delete
   */
  export type PayslipDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payslip
     */
    select?: PayslipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payslip
     */
    omit?: PayslipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PayslipInclude<ExtArgs> | null
    /**
     * Filter which Payslip to delete.
     */
    where: PayslipWhereUniqueInput
  }

  /**
   * Payslip deleteMany
   */
  export type PayslipDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Payslips to delete
     */
    where?: PayslipWhereInput
    /**
     * Limit how many Payslips to delete.
     */
    limit?: number
  }

  /**
   * Payslip without action
   */
  export type PayslipDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payslip
     */
    select?: PayslipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payslip
     */
    omit?: PayslipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PayslipInclude<ExtArgs> | null
  }


  /**
   * Model Compensation
   */

  export type AggregateCompensation = {
    _count: CompensationCountAggregateOutputType | null
    _avg: CompensationAvgAggregateOutputType | null
    _sum: CompensationSumAggregateOutputType | null
    _min: CompensationMinAggregateOutputType | null
    _max: CompensationMaxAggregateOutputType | null
  }

  export type CompensationAvgAggregateOutputType = {
    position_allowance: number | null
    housing_allowance: number | null
    transportation_allowance: number | null
    meal_allowance: number | null
    provident_fund_rate: number | null
  }

  export type CompensationSumAggregateOutputType = {
    position_allowance: number | null
    housing_allowance: number | null
    transportation_allowance: number | null
    meal_allowance: number | null
    provident_fund_rate: number | null
  }

  export type CompensationMinAggregateOutputType = {
    id: string | null
    employee_id: string | null
    base_salary: string | null
    position_allowance: number | null
    housing_allowance: number | null
    transportation_allowance: number | null
    meal_allowance: number | null
    effective_date: Date | null
    currency: string | null
    grade: string | null
    level: string | null
    provident_fund_rate: number | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type CompensationMaxAggregateOutputType = {
    id: string | null
    employee_id: string | null
    base_salary: string | null
    position_allowance: number | null
    housing_allowance: number | null
    transportation_allowance: number | null
    meal_allowance: number | null
    effective_date: Date | null
    currency: string | null
    grade: string | null
    level: string | null
    provident_fund_rate: number | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type CompensationCountAggregateOutputType = {
    id: number
    employee_id: number
    base_salary: number
    position_allowance: number
    housing_allowance: number
    transportation_allowance: number
    meal_allowance: number
    other_allowances: number
    effective_date: number
    currency: number
    grade: number
    level: number
    provident_fund_rate: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type CompensationAvgAggregateInputType = {
    position_allowance?: true
    housing_allowance?: true
    transportation_allowance?: true
    meal_allowance?: true
    provident_fund_rate?: true
  }

  export type CompensationSumAggregateInputType = {
    position_allowance?: true
    housing_allowance?: true
    transportation_allowance?: true
    meal_allowance?: true
    provident_fund_rate?: true
  }

  export type CompensationMinAggregateInputType = {
    id?: true
    employee_id?: true
    base_salary?: true
    position_allowance?: true
    housing_allowance?: true
    transportation_allowance?: true
    meal_allowance?: true
    effective_date?: true
    currency?: true
    grade?: true
    level?: true
    provident_fund_rate?: true
    created_at?: true
    updated_at?: true
  }

  export type CompensationMaxAggregateInputType = {
    id?: true
    employee_id?: true
    base_salary?: true
    position_allowance?: true
    housing_allowance?: true
    transportation_allowance?: true
    meal_allowance?: true
    effective_date?: true
    currency?: true
    grade?: true
    level?: true
    provident_fund_rate?: true
    created_at?: true
    updated_at?: true
  }

  export type CompensationCountAggregateInputType = {
    id?: true
    employee_id?: true
    base_salary?: true
    position_allowance?: true
    housing_allowance?: true
    transportation_allowance?: true
    meal_allowance?: true
    other_allowances?: true
    effective_date?: true
    currency?: true
    grade?: true
    level?: true
    provident_fund_rate?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type CompensationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Compensation to aggregate.
     */
    where?: CompensationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Compensations to fetch.
     */
    orderBy?: CompensationOrderByWithRelationInput | CompensationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CompensationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Compensations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Compensations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Compensations
    **/
    _count?: true | CompensationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CompensationAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CompensationSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CompensationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CompensationMaxAggregateInputType
  }

  export type GetCompensationAggregateType<T extends CompensationAggregateArgs> = {
        [P in keyof T & keyof AggregateCompensation]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCompensation[P]>
      : GetScalarType<T[P], AggregateCompensation[P]>
  }




  export type CompensationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CompensationWhereInput
    orderBy?: CompensationOrderByWithAggregationInput | CompensationOrderByWithAggregationInput[]
    by: CompensationScalarFieldEnum[] | CompensationScalarFieldEnum
    having?: CompensationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CompensationCountAggregateInputType | true
    _avg?: CompensationAvgAggregateInputType
    _sum?: CompensationSumAggregateInputType
    _min?: CompensationMinAggregateInputType
    _max?: CompensationMaxAggregateInputType
  }

  export type CompensationGroupByOutputType = {
    id: string
    employee_id: string
    base_salary: string
    position_allowance: number
    housing_allowance: number
    transportation_allowance: number
    meal_allowance: number
    other_allowances: JsonValue | null
    effective_date: Date
    currency: string
    grade: string | null
    level: string | null
    provident_fund_rate: number
    created_at: Date
    updated_at: Date
    _count: CompensationCountAggregateOutputType | null
    _avg: CompensationAvgAggregateOutputType | null
    _sum: CompensationSumAggregateOutputType | null
    _min: CompensationMinAggregateOutputType | null
    _max: CompensationMaxAggregateOutputType | null
  }

  type GetCompensationGroupByPayload<T extends CompensationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CompensationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CompensationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CompensationGroupByOutputType[P]>
            : GetScalarType<T[P], CompensationGroupByOutputType[P]>
        }
      >
    >


  export type CompensationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    employee_id?: boolean
    base_salary?: boolean
    position_allowance?: boolean
    housing_allowance?: boolean
    transportation_allowance?: boolean
    meal_allowance?: boolean
    other_allowances?: boolean
    effective_date?: boolean
    currency?: boolean
    grade?: boolean
    level?: boolean
    provident_fund_rate?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["compensation"]>

  export type CompensationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    employee_id?: boolean
    base_salary?: boolean
    position_allowance?: boolean
    housing_allowance?: boolean
    transportation_allowance?: boolean
    meal_allowance?: boolean
    other_allowances?: boolean
    effective_date?: boolean
    currency?: boolean
    grade?: boolean
    level?: boolean
    provident_fund_rate?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["compensation"]>

  export type CompensationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    employee_id?: boolean
    base_salary?: boolean
    position_allowance?: boolean
    housing_allowance?: boolean
    transportation_allowance?: boolean
    meal_allowance?: boolean
    other_allowances?: boolean
    effective_date?: boolean
    currency?: boolean
    grade?: boolean
    level?: boolean
    provident_fund_rate?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["compensation"]>

  export type CompensationSelectScalar = {
    id?: boolean
    employee_id?: boolean
    base_salary?: boolean
    position_allowance?: boolean
    housing_allowance?: boolean
    transportation_allowance?: boolean
    meal_allowance?: boolean
    other_allowances?: boolean
    effective_date?: boolean
    currency?: boolean
    grade?: boolean
    level?: boolean
    provident_fund_rate?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type CompensationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "employee_id" | "base_salary" | "position_allowance" | "housing_allowance" | "transportation_allowance" | "meal_allowance" | "other_allowances" | "effective_date" | "currency" | "grade" | "level" | "provident_fund_rate" | "created_at" | "updated_at", ExtArgs["result"]["compensation"]>

  export type $CompensationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Compensation"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      employee_id: string
      base_salary: string
      position_allowance: number
      housing_allowance: number
      transportation_allowance: number
      meal_allowance: number
      other_allowances: Prisma.JsonValue | null
      effective_date: Date
      currency: string
      grade: string | null
      level: string | null
      provident_fund_rate: number
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["compensation"]>
    composites: {}
  }

  type CompensationGetPayload<S extends boolean | null | undefined | CompensationDefaultArgs> = $Result.GetResult<Prisma.$CompensationPayload, S>

  type CompensationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CompensationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CompensationCountAggregateInputType | true
    }

  export interface CompensationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Compensation'], meta: { name: 'Compensation' } }
    /**
     * Find zero or one Compensation that matches the filter.
     * @param {CompensationFindUniqueArgs} args - Arguments to find a Compensation
     * @example
     * // Get one Compensation
     * const compensation = await prisma.compensation.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CompensationFindUniqueArgs>(args: SelectSubset<T, CompensationFindUniqueArgs<ExtArgs>>): Prisma__CompensationClient<$Result.GetResult<Prisma.$CompensationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Compensation that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CompensationFindUniqueOrThrowArgs} args - Arguments to find a Compensation
     * @example
     * // Get one Compensation
     * const compensation = await prisma.compensation.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CompensationFindUniqueOrThrowArgs>(args: SelectSubset<T, CompensationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CompensationClient<$Result.GetResult<Prisma.$CompensationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Compensation that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompensationFindFirstArgs} args - Arguments to find a Compensation
     * @example
     * // Get one Compensation
     * const compensation = await prisma.compensation.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CompensationFindFirstArgs>(args?: SelectSubset<T, CompensationFindFirstArgs<ExtArgs>>): Prisma__CompensationClient<$Result.GetResult<Prisma.$CompensationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Compensation that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompensationFindFirstOrThrowArgs} args - Arguments to find a Compensation
     * @example
     * // Get one Compensation
     * const compensation = await prisma.compensation.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CompensationFindFirstOrThrowArgs>(args?: SelectSubset<T, CompensationFindFirstOrThrowArgs<ExtArgs>>): Prisma__CompensationClient<$Result.GetResult<Prisma.$CompensationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Compensations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompensationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Compensations
     * const compensations = await prisma.compensation.findMany()
     * 
     * // Get first 10 Compensations
     * const compensations = await prisma.compensation.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const compensationWithIdOnly = await prisma.compensation.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CompensationFindManyArgs>(args?: SelectSubset<T, CompensationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CompensationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Compensation.
     * @param {CompensationCreateArgs} args - Arguments to create a Compensation.
     * @example
     * // Create one Compensation
     * const Compensation = await prisma.compensation.create({
     *   data: {
     *     // ... data to create a Compensation
     *   }
     * })
     * 
     */
    create<T extends CompensationCreateArgs>(args: SelectSubset<T, CompensationCreateArgs<ExtArgs>>): Prisma__CompensationClient<$Result.GetResult<Prisma.$CompensationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Compensations.
     * @param {CompensationCreateManyArgs} args - Arguments to create many Compensations.
     * @example
     * // Create many Compensations
     * const compensation = await prisma.compensation.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CompensationCreateManyArgs>(args?: SelectSubset<T, CompensationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Compensations and returns the data saved in the database.
     * @param {CompensationCreateManyAndReturnArgs} args - Arguments to create many Compensations.
     * @example
     * // Create many Compensations
     * const compensation = await prisma.compensation.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Compensations and only return the `id`
     * const compensationWithIdOnly = await prisma.compensation.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CompensationCreateManyAndReturnArgs>(args?: SelectSubset<T, CompensationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CompensationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Compensation.
     * @param {CompensationDeleteArgs} args - Arguments to delete one Compensation.
     * @example
     * // Delete one Compensation
     * const Compensation = await prisma.compensation.delete({
     *   where: {
     *     // ... filter to delete one Compensation
     *   }
     * })
     * 
     */
    delete<T extends CompensationDeleteArgs>(args: SelectSubset<T, CompensationDeleteArgs<ExtArgs>>): Prisma__CompensationClient<$Result.GetResult<Prisma.$CompensationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Compensation.
     * @param {CompensationUpdateArgs} args - Arguments to update one Compensation.
     * @example
     * // Update one Compensation
     * const compensation = await prisma.compensation.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CompensationUpdateArgs>(args: SelectSubset<T, CompensationUpdateArgs<ExtArgs>>): Prisma__CompensationClient<$Result.GetResult<Prisma.$CompensationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Compensations.
     * @param {CompensationDeleteManyArgs} args - Arguments to filter Compensations to delete.
     * @example
     * // Delete a few Compensations
     * const { count } = await prisma.compensation.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CompensationDeleteManyArgs>(args?: SelectSubset<T, CompensationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Compensations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompensationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Compensations
     * const compensation = await prisma.compensation.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CompensationUpdateManyArgs>(args: SelectSubset<T, CompensationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Compensations and returns the data updated in the database.
     * @param {CompensationUpdateManyAndReturnArgs} args - Arguments to update many Compensations.
     * @example
     * // Update many Compensations
     * const compensation = await prisma.compensation.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Compensations and only return the `id`
     * const compensationWithIdOnly = await prisma.compensation.updateManyAndReturn({
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
    updateManyAndReturn<T extends CompensationUpdateManyAndReturnArgs>(args: SelectSubset<T, CompensationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CompensationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Compensation.
     * @param {CompensationUpsertArgs} args - Arguments to update or create a Compensation.
     * @example
     * // Update or create a Compensation
     * const compensation = await prisma.compensation.upsert({
     *   create: {
     *     // ... data to create a Compensation
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Compensation we want to update
     *   }
     * })
     */
    upsert<T extends CompensationUpsertArgs>(args: SelectSubset<T, CompensationUpsertArgs<ExtArgs>>): Prisma__CompensationClient<$Result.GetResult<Prisma.$CompensationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Compensations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompensationCountArgs} args - Arguments to filter Compensations to count.
     * @example
     * // Count the number of Compensations
     * const count = await prisma.compensation.count({
     *   where: {
     *     // ... the filter for the Compensations we want to count
     *   }
     * })
    **/
    count<T extends CompensationCountArgs>(
      args?: Subset<T, CompensationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CompensationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Compensation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompensationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends CompensationAggregateArgs>(args: Subset<T, CompensationAggregateArgs>): Prisma.PrismaPromise<GetCompensationAggregateType<T>>

    /**
     * Group by Compensation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompensationGroupByArgs} args - Group by arguments.
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
      T extends CompensationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CompensationGroupByArgs['orderBy'] }
        : { orderBy?: CompensationGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, CompensationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCompensationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Compensation model
   */
  readonly fields: CompensationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Compensation.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CompensationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the Compensation model
   */
  interface CompensationFieldRefs {
    readonly id: FieldRef<"Compensation", 'String'>
    readonly employee_id: FieldRef<"Compensation", 'String'>
    readonly base_salary: FieldRef<"Compensation", 'String'>
    readonly position_allowance: FieldRef<"Compensation", 'Float'>
    readonly housing_allowance: FieldRef<"Compensation", 'Float'>
    readonly transportation_allowance: FieldRef<"Compensation", 'Float'>
    readonly meal_allowance: FieldRef<"Compensation", 'Float'>
    readonly other_allowances: FieldRef<"Compensation", 'Json'>
    readonly effective_date: FieldRef<"Compensation", 'DateTime'>
    readonly currency: FieldRef<"Compensation", 'String'>
    readonly grade: FieldRef<"Compensation", 'String'>
    readonly level: FieldRef<"Compensation", 'String'>
    readonly provident_fund_rate: FieldRef<"Compensation", 'Float'>
    readonly created_at: FieldRef<"Compensation", 'DateTime'>
    readonly updated_at: FieldRef<"Compensation", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Compensation findUnique
   */
  export type CompensationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Compensation
     */
    select?: CompensationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Compensation
     */
    omit?: CompensationOmit<ExtArgs> | null
    /**
     * Filter, which Compensation to fetch.
     */
    where: CompensationWhereUniqueInput
  }

  /**
   * Compensation findUniqueOrThrow
   */
  export type CompensationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Compensation
     */
    select?: CompensationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Compensation
     */
    omit?: CompensationOmit<ExtArgs> | null
    /**
     * Filter, which Compensation to fetch.
     */
    where: CompensationWhereUniqueInput
  }

  /**
   * Compensation findFirst
   */
  export type CompensationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Compensation
     */
    select?: CompensationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Compensation
     */
    omit?: CompensationOmit<ExtArgs> | null
    /**
     * Filter, which Compensation to fetch.
     */
    where?: CompensationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Compensations to fetch.
     */
    orderBy?: CompensationOrderByWithRelationInput | CompensationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Compensations.
     */
    cursor?: CompensationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Compensations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Compensations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Compensations.
     */
    distinct?: CompensationScalarFieldEnum | CompensationScalarFieldEnum[]
  }

  /**
   * Compensation findFirstOrThrow
   */
  export type CompensationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Compensation
     */
    select?: CompensationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Compensation
     */
    omit?: CompensationOmit<ExtArgs> | null
    /**
     * Filter, which Compensation to fetch.
     */
    where?: CompensationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Compensations to fetch.
     */
    orderBy?: CompensationOrderByWithRelationInput | CompensationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Compensations.
     */
    cursor?: CompensationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Compensations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Compensations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Compensations.
     */
    distinct?: CompensationScalarFieldEnum | CompensationScalarFieldEnum[]
  }

  /**
   * Compensation findMany
   */
  export type CompensationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Compensation
     */
    select?: CompensationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Compensation
     */
    omit?: CompensationOmit<ExtArgs> | null
    /**
     * Filter, which Compensations to fetch.
     */
    where?: CompensationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Compensations to fetch.
     */
    orderBy?: CompensationOrderByWithRelationInput | CompensationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Compensations.
     */
    cursor?: CompensationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Compensations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Compensations.
     */
    skip?: number
    distinct?: CompensationScalarFieldEnum | CompensationScalarFieldEnum[]
  }

  /**
   * Compensation create
   */
  export type CompensationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Compensation
     */
    select?: CompensationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Compensation
     */
    omit?: CompensationOmit<ExtArgs> | null
    /**
     * The data needed to create a Compensation.
     */
    data: XOR<CompensationCreateInput, CompensationUncheckedCreateInput>
  }

  /**
   * Compensation createMany
   */
  export type CompensationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Compensations.
     */
    data: CompensationCreateManyInput | CompensationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Compensation createManyAndReturn
   */
  export type CompensationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Compensation
     */
    select?: CompensationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Compensation
     */
    omit?: CompensationOmit<ExtArgs> | null
    /**
     * The data used to create many Compensations.
     */
    data: CompensationCreateManyInput | CompensationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Compensation update
   */
  export type CompensationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Compensation
     */
    select?: CompensationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Compensation
     */
    omit?: CompensationOmit<ExtArgs> | null
    /**
     * The data needed to update a Compensation.
     */
    data: XOR<CompensationUpdateInput, CompensationUncheckedUpdateInput>
    /**
     * Choose, which Compensation to update.
     */
    where: CompensationWhereUniqueInput
  }

  /**
   * Compensation updateMany
   */
  export type CompensationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Compensations.
     */
    data: XOR<CompensationUpdateManyMutationInput, CompensationUncheckedUpdateManyInput>
    /**
     * Filter which Compensations to update
     */
    where?: CompensationWhereInput
    /**
     * Limit how many Compensations to update.
     */
    limit?: number
  }

  /**
   * Compensation updateManyAndReturn
   */
  export type CompensationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Compensation
     */
    select?: CompensationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Compensation
     */
    omit?: CompensationOmit<ExtArgs> | null
    /**
     * The data used to update Compensations.
     */
    data: XOR<CompensationUpdateManyMutationInput, CompensationUncheckedUpdateManyInput>
    /**
     * Filter which Compensations to update
     */
    where?: CompensationWhereInput
    /**
     * Limit how many Compensations to update.
     */
    limit?: number
  }

  /**
   * Compensation upsert
   */
  export type CompensationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Compensation
     */
    select?: CompensationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Compensation
     */
    omit?: CompensationOmit<ExtArgs> | null
    /**
     * The filter to search for the Compensation to update in case it exists.
     */
    where: CompensationWhereUniqueInput
    /**
     * In case the Compensation found by the `where` argument doesn't exist, create a new Compensation with this data.
     */
    create: XOR<CompensationCreateInput, CompensationUncheckedCreateInput>
    /**
     * In case the Compensation was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CompensationUpdateInput, CompensationUncheckedUpdateInput>
  }

  /**
   * Compensation delete
   */
  export type CompensationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Compensation
     */
    select?: CompensationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Compensation
     */
    omit?: CompensationOmit<ExtArgs> | null
    /**
     * Filter which Compensation to delete.
     */
    where: CompensationWhereUniqueInput
  }

  /**
   * Compensation deleteMany
   */
  export type CompensationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Compensations to delete
     */
    where?: CompensationWhereInput
    /**
     * Limit how many Compensations to delete.
     */
    limit?: number
  }

  /**
   * Compensation without action
   */
  export type CompensationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Compensation
     */
    select?: CompensationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Compensation
     */
    omit?: CompensationOmit<ExtArgs> | null
  }


  /**
   * Model TaxDeduction
   */

  export type AggregateTaxDeduction = {
    _count: TaxDeductionCountAggregateOutputType | null
    _avg: TaxDeductionAvgAggregateOutputType | null
    _sum: TaxDeductionSumAggregateOutputType | null
    _min: TaxDeductionMinAggregateOutputType | null
    _max: TaxDeductionMaxAggregateOutputType | null
  }

  export type TaxDeductionAvgAggregateOutputType = {
    tax_year: number | null
    annual_income: number | null
    personal_allowance: number | null
    expense_deduction: number | null
    spouse_allowance: number | null
    child_allowance: number | null
    parent_allowance: number | null
    life_insurance: number | null
    health_insurance: number | null
    provident_fund_deduction: number | null
    social_security_deduction: number | null
    home_loan_interest: number | null
    donation: number | null
    other_deductions: number | null
    total_deductions: number | null
    taxable_income: number | null
    calculated_tax: number | null
  }

  export type TaxDeductionSumAggregateOutputType = {
    tax_year: number | null
    annual_income: number | null
    personal_allowance: number | null
    expense_deduction: number | null
    spouse_allowance: number | null
    child_allowance: number | null
    parent_allowance: number | null
    life_insurance: number | null
    health_insurance: number | null
    provident_fund_deduction: number | null
    social_security_deduction: number | null
    home_loan_interest: number | null
    donation: number | null
    other_deductions: number | null
    total_deductions: number | null
    taxable_income: number | null
    calculated_tax: number | null
  }

  export type TaxDeductionMinAggregateOutputType = {
    id: string | null
    employee_id: string | null
    tax_year: number | null
    annual_income: number | null
    personal_allowance: number | null
    expense_deduction: number | null
    spouse_allowance: number | null
    child_allowance: number | null
    parent_allowance: number | null
    life_insurance: number | null
    health_insurance: number | null
    provident_fund_deduction: number | null
    social_security_deduction: number | null
    home_loan_interest: number | null
    donation: number | null
    other_deductions: number | null
    total_deductions: number | null
    taxable_income: number | null
    calculated_tax: number | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type TaxDeductionMaxAggregateOutputType = {
    id: string | null
    employee_id: string | null
    tax_year: number | null
    annual_income: number | null
    personal_allowance: number | null
    expense_deduction: number | null
    spouse_allowance: number | null
    child_allowance: number | null
    parent_allowance: number | null
    life_insurance: number | null
    health_insurance: number | null
    provident_fund_deduction: number | null
    social_security_deduction: number | null
    home_loan_interest: number | null
    donation: number | null
    other_deductions: number | null
    total_deductions: number | null
    taxable_income: number | null
    calculated_tax: number | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type TaxDeductionCountAggregateOutputType = {
    id: number
    employee_id: number
    tax_year: number
    annual_income: number
    personal_allowance: number
    expense_deduction: number
    spouse_allowance: number
    child_allowance: number
    parent_allowance: number
    life_insurance: number
    health_insurance: number
    provident_fund_deduction: number
    social_security_deduction: number
    home_loan_interest: number
    donation: number
    other_deductions: number
    total_deductions: number
    taxable_income: number
    calculated_tax: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type TaxDeductionAvgAggregateInputType = {
    tax_year?: true
    annual_income?: true
    personal_allowance?: true
    expense_deduction?: true
    spouse_allowance?: true
    child_allowance?: true
    parent_allowance?: true
    life_insurance?: true
    health_insurance?: true
    provident_fund_deduction?: true
    social_security_deduction?: true
    home_loan_interest?: true
    donation?: true
    other_deductions?: true
    total_deductions?: true
    taxable_income?: true
    calculated_tax?: true
  }

  export type TaxDeductionSumAggregateInputType = {
    tax_year?: true
    annual_income?: true
    personal_allowance?: true
    expense_deduction?: true
    spouse_allowance?: true
    child_allowance?: true
    parent_allowance?: true
    life_insurance?: true
    health_insurance?: true
    provident_fund_deduction?: true
    social_security_deduction?: true
    home_loan_interest?: true
    donation?: true
    other_deductions?: true
    total_deductions?: true
    taxable_income?: true
    calculated_tax?: true
  }

  export type TaxDeductionMinAggregateInputType = {
    id?: true
    employee_id?: true
    tax_year?: true
    annual_income?: true
    personal_allowance?: true
    expense_deduction?: true
    spouse_allowance?: true
    child_allowance?: true
    parent_allowance?: true
    life_insurance?: true
    health_insurance?: true
    provident_fund_deduction?: true
    social_security_deduction?: true
    home_loan_interest?: true
    donation?: true
    other_deductions?: true
    total_deductions?: true
    taxable_income?: true
    calculated_tax?: true
    created_at?: true
    updated_at?: true
  }

  export type TaxDeductionMaxAggregateInputType = {
    id?: true
    employee_id?: true
    tax_year?: true
    annual_income?: true
    personal_allowance?: true
    expense_deduction?: true
    spouse_allowance?: true
    child_allowance?: true
    parent_allowance?: true
    life_insurance?: true
    health_insurance?: true
    provident_fund_deduction?: true
    social_security_deduction?: true
    home_loan_interest?: true
    donation?: true
    other_deductions?: true
    total_deductions?: true
    taxable_income?: true
    calculated_tax?: true
    created_at?: true
    updated_at?: true
  }

  export type TaxDeductionCountAggregateInputType = {
    id?: true
    employee_id?: true
    tax_year?: true
    annual_income?: true
    personal_allowance?: true
    expense_deduction?: true
    spouse_allowance?: true
    child_allowance?: true
    parent_allowance?: true
    life_insurance?: true
    health_insurance?: true
    provident_fund_deduction?: true
    social_security_deduction?: true
    home_loan_interest?: true
    donation?: true
    other_deductions?: true
    total_deductions?: true
    taxable_income?: true
    calculated_tax?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type TaxDeductionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TaxDeduction to aggregate.
     */
    where?: TaxDeductionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TaxDeductions to fetch.
     */
    orderBy?: TaxDeductionOrderByWithRelationInput | TaxDeductionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TaxDeductionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TaxDeductions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TaxDeductions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TaxDeductions
    **/
    _count?: true | TaxDeductionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TaxDeductionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TaxDeductionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TaxDeductionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TaxDeductionMaxAggregateInputType
  }

  export type GetTaxDeductionAggregateType<T extends TaxDeductionAggregateArgs> = {
        [P in keyof T & keyof AggregateTaxDeduction]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTaxDeduction[P]>
      : GetScalarType<T[P], AggregateTaxDeduction[P]>
  }




  export type TaxDeductionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TaxDeductionWhereInput
    orderBy?: TaxDeductionOrderByWithAggregationInput | TaxDeductionOrderByWithAggregationInput[]
    by: TaxDeductionScalarFieldEnum[] | TaxDeductionScalarFieldEnum
    having?: TaxDeductionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TaxDeductionCountAggregateInputType | true
    _avg?: TaxDeductionAvgAggregateInputType
    _sum?: TaxDeductionSumAggregateInputType
    _min?: TaxDeductionMinAggregateInputType
    _max?: TaxDeductionMaxAggregateInputType
  }

  export type TaxDeductionGroupByOutputType = {
    id: string
    employee_id: string
    tax_year: number
    annual_income: number
    personal_allowance: number
    expense_deduction: number
    spouse_allowance: number
    child_allowance: number
    parent_allowance: number
    life_insurance: number
    health_insurance: number
    provident_fund_deduction: number
    social_security_deduction: number
    home_loan_interest: number
    donation: number
    other_deductions: number
    total_deductions: number
    taxable_income: number
    calculated_tax: number
    created_at: Date
    updated_at: Date
    _count: TaxDeductionCountAggregateOutputType | null
    _avg: TaxDeductionAvgAggregateOutputType | null
    _sum: TaxDeductionSumAggregateOutputType | null
    _min: TaxDeductionMinAggregateOutputType | null
    _max: TaxDeductionMaxAggregateOutputType | null
  }

  type GetTaxDeductionGroupByPayload<T extends TaxDeductionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TaxDeductionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TaxDeductionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TaxDeductionGroupByOutputType[P]>
            : GetScalarType<T[P], TaxDeductionGroupByOutputType[P]>
        }
      >
    >


  export type TaxDeductionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    employee_id?: boolean
    tax_year?: boolean
    annual_income?: boolean
    personal_allowance?: boolean
    expense_deduction?: boolean
    spouse_allowance?: boolean
    child_allowance?: boolean
    parent_allowance?: boolean
    life_insurance?: boolean
    health_insurance?: boolean
    provident_fund_deduction?: boolean
    social_security_deduction?: boolean
    home_loan_interest?: boolean
    donation?: boolean
    other_deductions?: boolean
    total_deductions?: boolean
    taxable_income?: boolean
    calculated_tax?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["taxDeduction"]>

  export type TaxDeductionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    employee_id?: boolean
    tax_year?: boolean
    annual_income?: boolean
    personal_allowance?: boolean
    expense_deduction?: boolean
    spouse_allowance?: boolean
    child_allowance?: boolean
    parent_allowance?: boolean
    life_insurance?: boolean
    health_insurance?: boolean
    provident_fund_deduction?: boolean
    social_security_deduction?: boolean
    home_loan_interest?: boolean
    donation?: boolean
    other_deductions?: boolean
    total_deductions?: boolean
    taxable_income?: boolean
    calculated_tax?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["taxDeduction"]>

  export type TaxDeductionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    employee_id?: boolean
    tax_year?: boolean
    annual_income?: boolean
    personal_allowance?: boolean
    expense_deduction?: boolean
    spouse_allowance?: boolean
    child_allowance?: boolean
    parent_allowance?: boolean
    life_insurance?: boolean
    health_insurance?: boolean
    provident_fund_deduction?: boolean
    social_security_deduction?: boolean
    home_loan_interest?: boolean
    donation?: boolean
    other_deductions?: boolean
    total_deductions?: boolean
    taxable_income?: boolean
    calculated_tax?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["taxDeduction"]>

  export type TaxDeductionSelectScalar = {
    id?: boolean
    employee_id?: boolean
    tax_year?: boolean
    annual_income?: boolean
    personal_allowance?: boolean
    expense_deduction?: boolean
    spouse_allowance?: boolean
    child_allowance?: boolean
    parent_allowance?: boolean
    life_insurance?: boolean
    health_insurance?: boolean
    provident_fund_deduction?: boolean
    social_security_deduction?: boolean
    home_loan_interest?: boolean
    donation?: boolean
    other_deductions?: boolean
    total_deductions?: boolean
    taxable_income?: boolean
    calculated_tax?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type TaxDeductionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "employee_id" | "tax_year" | "annual_income" | "personal_allowance" | "expense_deduction" | "spouse_allowance" | "child_allowance" | "parent_allowance" | "life_insurance" | "health_insurance" | "provident_fund_deduction" | "social_security_deduction" | "home_loan_interest" | "donation" | "other_deductions" | "total_deductions" | "taxable_income" | "calculated_tax" | "created_at" | "updated_at", ExtArgs["result"]["taxDeduction"]>

  export type $TaxDeductionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "TaxDeduction"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      employee_id: string
      tax_year: number
      annual_income: number
      personal_allowance: number
      expense_deduction: number
      spouse_allowance: number
      child_allowance: number
      parent_allowance: number
      life_insurance: number
      health_insurance: number
      provident_fund_deduction: number
      social_security_deduction: number
      home_loan_interest: number
      donation: number
      other_deductions: number
      total_deductions: number
      taxable_income: number
      calculated_tax: number
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["taxDeduction"]>
    composites: {}
  }

  type TaxDeductionGetPayload<S extends boolean | null | undefined | TaxDeductionDefaultArgs> = $Result.GetResult<Prisma.$TaxDeductionPayload, S>

  type TaxDeductionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TaxDeductionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TaxDeductionCountAggregateInputType | true
    }

  export interface TaxDeductionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['TaxDeduction'], meta: { name: 'TaxDeduction' } }
    /**
     * Find zero or one TaxDeduction that matches the filter.
     * @param {TaxDeductionFindUniqueArgs} args - Arguments to find a TaxDeduction
     * @example
     * // Get one TaxDeduction
     * const taxDeduction = await prisma.taxDeduction.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TaxDeductionFindUniqueArgs>(args: SelectSubset<T, TaxDeductionFindUniqueArgs<ExtArgs>>): Prisma__TaxDeductionClient<$Result.GetResult<Prisma.$TaxDeductionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one TaxDeduction that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TaxDeductionFindUniqueOrThrowArgs} args - Arguments to find a TaxDeduction
     * @example
     * // Get one TaxDeduction
     * const taxDeduction = await prisma.taxDeduction.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TaxDeductionFindUniqueOrThrowArgs>(args: SelectSubset<T, TaxDeductionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TaxDeductionClient<$Result.GetResult<Prisma.$TaxDeductionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TaxDeduction that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaxDeductionFindFirstArgs} args - Arguments to find a TaxDeduction
     * @example
     * // Get one TaxDeduction
     * const taxDeduction = await prisma.taxDeduction.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TaxDeductionFindFirstArgs>(args?: SelectSubset<T, TaxDeductionFindFirstArgs<ExtArgs>>): Prisma__TaxDeductionClient<$Result.GetResult<Prisma.$TaxDeductionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TaxDeduction that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaxDeductionFindFirstOrThrowArgs} args - Arguments to find a TaxDeduction
     * @example
     * // Get one TaxDeduction
     * const taxDeduction = await prisma.taxDeduction.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TaxDeductionFindFirstOrThrowArgs>(args?: SelectSubset<T, TaxDeductionFindFirstOrThrowArgs<ExtArgs>>): Prisma__TaxDeductionClient<$Result.GetResult<Prisma.$TaxDeductionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more TaxDeductions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaxDeductionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TaxDeductions
     * const taxDeductions = await prisma.taxDeduction.findMany()
     * 
     * // Get first 10 TaxDeductions
     * const taxDeductions = await prisma.taxDeduction.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const taxDeductionWithIdOnly = await prisma.taxDeduction.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TaxDeductionFindManyArgs>(args?: SelectSubset<T, TaxDeductionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TaxDeductionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a TaxDeduction.
     * @param {TaxDeductionCreateArgs} args - Arguments to create a TaxDeduction.
     * @example
     * // Create one TaxDeduction
     * const TaxDeduction = await prisma.taxDeduction.create({
     *   data: {
     *     // ... data to create a TaxDeduction
     *   }
     * })
     * 
     */
    create<T extends TaxDeductionCreateArgs>(args: SelectSubset<T, TaxDeductionCreateArgs<ExtArgs>>): Prisma__TaxDeductionClient<$Result.GetResult<Prisma.$TaxDeductionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many TaxDeductions.
     * @param {TaxDeductionCreateManyArgs} args - Arguments to create many TaxDeductions.
     * @example
     * // Create many TaxDeductions
     * const taxDeduction = await prisma.taxDeduction.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TaxDeductionCreateManyArgs>(args?: SelectSubset<T, TaxDeductionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many TaxDeductions and returns the data saved in the database.
     * @param {TaxDeductionCreateManyAndReturnArgs} args - Arguments to create many TaxDeductions.
     * @example
     * // Create many TaxDeductions
     * const taxDeduction = await prisma.taxDeduction.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many TaxDeductions and only return the `id`
     * const taxDeductionWithIdOnly = await prisma.taxDeduction.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TaxDeductionCreateManyAndReturnArgs>(args?: SelectSubset<T, TaxDeductionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TaxDeductionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a TaxDeduction.
     * @param {TaxDeductionDeleteArgs} args - Arguments to delete one TaxDeduction.
     * @example
     * // Delete one TaxDeduction
     * const TaxDeduction = await prisma.taxDeduction.delete({
     *   where: {
     *     // ... filter to delete one TaxDeduction
     *   }
     * })
     * 
     */
    delete<T extends TaxDeductionDeleteArgs>(args: SelectSubset<T, TaxDeductionDeleteArgs<ExtArgs>>): Prisma__TaxDeductionClient<$Result.GetResult<Prisma.$TaxDeductionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one TaxDeduction.
     * @param {TaxDeductionUpdateArgs} args - Arguments to update one TaxDeduction.
     * @example
     * // Update one TaxDeduction
     * const taxDeduction = await prisma.taxDeduction.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TaxDeductionUpdateArgs>(args: SelectSubset<T, TaxDeductionUpdateArgs<ExtArgs>>): Prisma__TaxDeductionClient<$Result.GetResult<Prisma.$TaxDeductionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more TaxDeductions.
     * @param {TaxDeductionDeleteManyArgs} args - Arguments to filter TaxDeductions to delete.
     * @example
     * // Delete a few TaxDeductions
     * const { count } = await prisma.taxDeduction.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TaxDeductionDeleteManyArgs>(args?: SelectSubset<T, TaxDeductionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TaxDeductions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaxDeductionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TaxDeductions
     * const taxDeduction = await prisma.taxDeduction.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TaxDeductionUpdateManyArgs>(args: SelectSubset<T, TaxDeductionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TaxDeductions and returns the data updated in the database.
     * @param {TaxDeductionUpdateManyAndReturnArgs} args - Arguments to update many TaxDeductions.
     * @example
     * // Update many TaxDeductions
     * const taxDeduction = await prisma.taxDeduction.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more TaxDeductions and only return the `id`
     * const taxDeductionWithIdOnly = await prisma.taxDeduction.updateManyAndReturn({
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
    updateManyAndReturn<T extends TaxDeductionUpdateManyAndReturnArgs>(args: SelectSubset<T, TaxDeductionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TaxDeductionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one TaxDeduction.
     * @param {TaxDeductionUpsertArgs} args - Arguments to update or create a TaxDeduction.
     * @example
     * // Update or create a TaxDeduction
     * const taxDeduction = await prisma.taxDeduction.upsert({
     *   create: {
     *     // ... data to create a TaxDeduction
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TaxDeduction we want to update
     *   }
     * })
     */
    upsert<T extends TaxDeductionUpsertArgs>(args: SelectSubset<T, TaxDeductionUpsertArgs<ExtArgs>>): Prisma__TaxDeductionClient<$Result.GetResult<Prisma.$TaxDeductionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of TaxDeductions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaxDeductionCountArgs} args - Arguments to filter TaxDeductions to count.
     * @example
     * // Count the number of TaxDeductions
     * const count = await prisma.taxDeduction.count({
     *   where: {
     *     // ... the filter for the TaxDeductions we want to count
     *   }
     * })
    **/
    count<T extends TaxDeductionCountArgs>(
      args?: Subset<T, TaxDeductionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TaxDeductionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TaxDeduction.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaxDeductionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends TaxDeductionAggregateArgs>(args: Subset<T, TaxDeductionAggregateArgs>): Prisma.PrismaPromise<GetTaxDeductionAggregateType<T>>

    /**
     * Group by TaxDeduction.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaxDeductionGroupByArgs} args - Group by arguments.
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
      T extends TaxDeductionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TaxDeductionGroupByArgs['orderBy'] }
        : { orderBy?: TaxDeductionGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, TaxDeductionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTaxDeductionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the TaxDeduction model
   */
  readonly fields: TaxDeductionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for TaxDeduction.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TaxDeductionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the TaxDeduction model
   */
  interface TaxDeductionFieldRefs {
    readonly id: FieldRef<"TaxDeduction", 'String'>
    readonly employee_id: FieldRef<"TaxDeduction", 'String'>
    readonly tax_year: FieldRef<"TaxDeduction", 'Int'>
    readonly annual_income: FieldRef<"TaxDeduction", 'Float'>
    readonly personal_allowance: FieldRef<"TaxDeduction", 'Float'>
    readonly expense_deduction: FieldRef<"TaxDeduction", 'Float'>
    readonly spouse_allowance: FieldRef<"TaxDeduction", 'Float'>
    readonly child_allowance: FieldRef<"TaxDeduction", 'Float'>
    readonly parent_allowance: FieldRef<"TaxDeduction", 'Float'>
    readonly life_insurance: FieldRef<"TaxDeduction", 'Float'>
    readonly health_insurance: FieldRef<"TaxDeduction", 'Float'>
    readonly provident_fund_deduction: FieldRef<"TaxDeduction", 'Float'>
    readonly social_security_deduction: FieldRef<"TaxDeduction", 'Float'>
    readonly home_loan_interest: FieldRef<"TaxDeduction", 'Float'>
    readonly donation: FieldRef<"TaxDeduction", 'Float'>
    readonly other_deductions: FieldRef<"TaxDeduction", 'Float'>
    readonly total_deductions: FieldRef<"TaxDeduction", 'Float'>
    readonly taxable_income: FieldRef<"TaxDeduction", 'Float'>
    readonly calculated_tax: FieldRef<"TaxDeduction", 'Float'>
    readonly created_at: FieldRef<"TaxDeduction", 'DateTime'>
    readonly updated_at: FieldRef<"TaxDeduction", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * TaxDeduction findUnique
   */
  export type TaxDeductionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaxDeduction
     */
    select?: TaxDeductionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TaxDeduction
     */
    omit?: TaxDeductionOmit<ExtArgs> | null
    /**
     * Filter, which TaxDeduction to fetch.
     */
    where: TaxDeductionWhereUniqueInput
  }

  /**
   * TaxDeduction findUniqueOrThrow
   */
  export type TaxDeductionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaxDeduction
     */
    select?: TaxDeductionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TaxDeduction
     */
    omit?: TaxDeductionOmit<ExtArgs> | null
    /**
     * Filter, which TaxDeduction to fetch.
     */
    where: TaxDeductionWhereUniqueInput
  }

  /**
   * TaxDeduction findFirst
   */
  export type TaxDeductionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaxDeduction
     */
    select?: TaxDeductionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TaxDeduction
     */
    omit?: TaxDeductionOmit<ExtArgs> | null
    /**
     * Filter, which TaxDeduction to fetch.
     */
    where?: TaxDeductionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TaxDeductions to fetch.
     */
    orderBy?: TaxDeductionOrderByWithRelationInput | TaxDeductionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TaxDeductions.
     */
    cursor?: TaxDeductionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TaxDeductions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TaxDeductions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TaxDeductions.
     */
    distinct?: TaxDeductionScalarFieldEnum | TaxDeductionScalarFieldEnum[]
  }

  /**
   * TaxDeduction findFirstOrThrow
   */
  export type TaxDeductionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaxDeduction
     */
    select?: TaxDeductionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TaxDeduction
     */
    omit?: TaxDeductionOmit<ExtArgs> | null
    /**
     * Filter, which TaxDeduction to fetch.
     */
    where?: TaxDeductionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TaxDeductions to fetch.
     */
    orderBy?: TaxDeductionOrderByWithRelationInput | TaxDeductionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TaxDeductions.
     */
    cursor?: TaxDeductionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TaxDeductions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TaxDeductions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TaxDeductions.
     */
    distinct?: TaxDeductionScalarFieldEnum | TaxDeductionScalarFieldEnum[]
  }

  /**
   * TaxDeduction findMany
   */
  export type TaxDeductionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaxDeduction
     */
    select?: TaxDeductionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TaxDeduction
     */
    omit?: TaxDeductionOmit<ExtArgs> | null
    /**
     * Filter, which TaxDeductions to fetch.
     */
    where?: TaxDeductionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TaxDeductions to fetch.
     */
    orderBy?: TaxDeductionOrderByWithRelationInput | TaxDeductionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TaxDeductions.
     */
    cursor?: TaxDeductionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TaxDeductions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TaxDeductions.
     */
    skip?: number
    distinct?: TaxDeductionScalarFieldEnum | TaxDeductionScalarFieldEnum[]
  }

  /**
   * TaxDeduction create
   */
  export type TaxDeductionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaxDeduction
     */
    select?: TaxDeductionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TaxDeduction
     */
    omit?: TaxDeductionOmit<ExtArgs> | null
    /**
     * The data needed to create a TaxDeduction.
     */
    data: XOR<TaxDeductionCreateInput, TaxDeductionUncheckedCreateInput>
  }

  /**
   * TaxDeduction createMany
   */
  export type TaxDeductionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many TaxDeductions.
     */
    data: TaxDeductionCreateManyInput | TaxDeductionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * TaxDeduction createManyAndReturn
   */
  export type TaxDeductionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaxDeduction
     */
    select?: TaxDeductionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TaxDeduction
     */
    omit?: TaxDeductionOmit<ExtArgs> | null
    /**
     * The data used to create many TaxDeductions.
     */
    data: TaxDeductionCreateManyInput | TaxDeductionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * TaxDeduction update
   */
  export type TaxDeductionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaxDeduction
     */
    select?: TaxDeductionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TaxDeduction
     */
    omit?: TaxDeductionOmit<ExtArgs> | null
    /**
     * The data needed to update a TaxDeduction.
     */
    data: XOR<TaxDeductionUpdateInput, TaxDeductionUncheckedUpdateInput>
    /**
     * Choose, which TaxDeduction to update.
     */
    where: TaxDeductionWhereUniqueInput
  }

  /**
   * TaxDeduction updateMany
   */
  export type TaxDeductionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update TaxDeductions.
     */
    data: XOR<TaxDeductionUpdateManyMutationInput, TaxDeductionUncheckedUpdateManyInput>
    /**
     * Filter which TaxDeductions to update
     */
    where?: TaxDeductionWhereInput
    /**
     * Limit how many TaxDeductions to update.
     */
    limit?: number
  }

  /**
   * TaxDeduction updateManyAndReturn
   */
  export type TaxDeductionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaxDeduction
     */
    select?: TaxDeductionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TaxDeduction
     */
    omit?: TaxDeductionOmit<ExtArgs> | null
    /**
     * The data used to update TaxDeductions.
     */
    data: XOR<TaxDeductionUpdateManyMutationInput, TaxDeductionUncheckedUpdateManyInput>
    /**
     * Filter which TaxDeductions to update
     */
    where?: TaxDeductionWhereInput
    /**
     * Limit how many TaxDeductions to update.
     */
    limit?: number
  }

  /**
   * TaxDeduction upsert
   */
  export type TaxDeductionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaxDeduction
     */
    select?: TaxDeductionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TaxDeduction
     */
    omit?: TaxDeductionOmit<ExtArgs> | null
    /**
     * The filter to search for the TaxDeduction to update in case it exists.
     */
    where: TaxDeductionWhereUniqueInput
    /**
     * In case the TaxDeduction found by the `where` argument doesn't exist, create a new TaxDeduction with this data.
     */
    create: XOR<TaxDeductionCreateInput, TaxDeductionUncheckedCreateInput>
    /**
     * In case the TaxDeduction was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TaxDeductionUpdateInput, TaxDeductionUncheckedUpdateInput>
  }

  /**
   * TaxDeduction delete
   */
  export type TaxDeductionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaxDeduction
     */
    select?: TaxDeductionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TaxDeduction
     */
    omit?: TaxDeductionOmit<ExtArgs> | null
    /**
     * Filter which TaxDeduction to delete.
     */
    where: TaxDeductionWhereUniqueInput
  }

  /**
   * TaxDeduction deleteMany
   */
  export type TaxDeductionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TaxDeductions to delete
     */
    where?: TaxDeductionWhereInput
    /**
     * Limit how many TaxDeductions to delete.
     */
    limit?: number
  }

  /**
   * TaxDeduction without action
   */
  export type TaxDeductionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaxDeduction
     */
    select?: TaxDeductionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TaxDeduction
     */
    omit?: TaxDeductionOmit<ExtArgs> | null
  }


  /**
   * Model GovernmentReport
   */

  export type AggregateGovernmentReport = {
    _count: GovernmentReportCountAggregateOutputType | null
    _avg: GovernmentReportAvgAggregateOutputType | null
    _sum: GovernmentReportSumAggregateOutputType | null
    _min: GovernmentReportMinAggregateOutputType | null
    _max: GovernmentReportMaxAggregateOutputType | null
  }

  export type GovernmentReportAvgAggregateOutputType = {
    year: number | null
    month: number | null
    total_employees: number | null
    total_amount: number | null
  }

  export type GovernmentReportSumAggregateOutputType = {
    year: number | null
    month: number | null
    total_employees: number | null
    total_amount: number | null
  }

  export type GovernmentReportMinAggregateOutputType = {
    id: string | null
    report_type: string | null
    period: string | null
    year: number | null
    month: number | null
    status: string | null
    file_url: string | null
    generated_at: Date | null
    submitted_at: Date | null
    submitted_by: string | null
    total_employees: number | null
    total_amount: number | null
    reference_number: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type GovernmentReportMaxAggregateOutputType = {
    id: string | null
    report_type: string | null
    period: string | null
    year: number | null
    month: number | null
    status: string | null
    file_url: string | null
    generated_at: Date | null
    submitted_at: Date | null
    submitted_by: string | null
    total_employees: number | null
    total_amount: number | null
    reference_number: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type GovernmentReportCountAggregateOutputType = {
    id: number
    report_type: number
    period: number
    year: number
    month: number
    status: number
    file_url: number
    data: number
    generated_at: number
    submitted_at: number
    submitted_by: number
    total_employees: number
    total_amount: number
    reference_number: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type GovernmentReportAvgAggregateInputType = {
    year?: true
    month?: true
    total_employees?: true
    total_amount?: true
  }

  export type GovernmentReportSumAggregateInputType = {
    year?: true
    month?: true
    total_employees?: true
    total_amount?: true
  }

  export type GovernmentReportMinAggregateInputType = {
    id?: true
    report_type?: true
    period?: true
    year?: true
    month?: true
    status?: true
    file_url?: true
    generated_at?: true
    submitted_at?: true
    submitted_by?: true
    total_employees?: true
    total_amount?: true
    reference_number?: true
    created_at?: true
    updated_at?: true
  }

  export type GovernmentReportMaxAggregateInputType = {
    id?: true
    report_type?: true
    period?: true
    year?: true
    month?: true
    status?: true
    file_url?: true
    generated_at?: true
    submitted_at?: true
    submitted_by?: true
    total_employees?: true
    total_amount?: true
    reference_number?: true
    created_at?: true
    updated_at?: true
  }

  export type GovernmentReportCountAggregateInputType = {
    id?: true
    report_type?: true
    period?: true
    year?: true
    month?: true
    status?: true
    file_url?: true
    data?: true
    generated_at?: true
    submitted_at?: true
    submitted_by?: true
    total_employees?: true
    total_amount?: true
    reference_number?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type GovernmentReportAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which GovernmentReport to aggregate.
     */
    where?: GovernmentReportWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GovernmentReports to fetch.
     */
    orderBy?: GovernmentReportOrderByWithRelationInput | GovernmentReportOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: GovernmentReportWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GovernmentReports from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GovernmentReports.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned GovernmentReports
    **/
    _count?: true | GovernmentReportCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: GovernmentReportAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: GovernmentReportSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: GovernmentReportMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: GovernmentReportMaxAggregateInputType
  }

  export type GetGovernmentReportAggregateType<T extends GovernmentReportAggregateArgs> = {
        [P in keyof T & keyof AggregateGovernmentReport]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateGovernmentReport[P]>
      : GetScalarType<T[P], AggregateGovernmentReport[P]>
  }




  export type GovernmentReportGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GovernmentReportWhereInput
    orderBy?: GovernmentReportOrderByWithAggregationInput | GovernmentReportOrderByWithAggregationInput[]
    by: GovernmentReportScalarFieldEnum[] | GovernmentReportScalarFieldEnum
    having?: GovernmentReportScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: GovernmentReportCountAggregateInputType | true
    _avg?: GovernmentReportAvgAggregateInputType
    _sum?: GovernmentReportSumAggregateInputType
    _min?: GovernmentReportMinAggregateInputType
    _max?: GovernmentReportMaxAggregateInputType
  }

  export type GovernmentReportGroupByOutputType = {
    id: string
    report_type: string
    period: string
    year: number
    month: number | null
    status: string
    file_url: string | null
    data: JsonValue | null
    generated_at: Date | null
    submitted_at: Date | null
    submitted_by: string | null
    total_employees: number
    total_amount: number
    reference_number: string | null
    created_at: Date
    updated_at: Date
    _count: GovernmentReportCountAggregateOutputType | null
    _avg: GovernmentReportAvgAggregateOutputType | null
    _sum: GovernmentReportSumAggregateOutputType | null
    _min: GovernmentReportMinAggregateOutputType | null
    _max: GovernmentReportMaxAggregateOutputType | null
  }

  type GetGovernmentReportGroupByPayload<T extends GovernmentReportGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<GovernmentReportGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof GovernmentReportGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], GovernmentReportGroupByOutputType[P]>
            : GetScalarType<T[P], GovernmentReportGroupByOutputType[P]>
        }
      >
    >


  export type GovernmentReportSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    report_type?: boolean
    period?: boolean
    year?: boolean
    month?: boolean
    status?: boolean
    file_url?: boolean
    data?: boolean
    generated_at?: boolean
    submitted_at?: boolean
    submitted_by?: boolean
    total_employees?: boolean
    total_amount?: boolean
    reference_number?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["governmentReport"]>

  export type GovernmentReportSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    report_type?: boolean
    period?: boolean
    year?: boolean
    month?: boolean
    status?: boolean
    file_url?: boolean
    data?: boolean
    generated_at?: boolean
    submitted_at?: boolean
    submitted_by?: boolean
    total_employees?: boolean
    total_amount?: boolean
    reference_number?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["governmentReport"]>

  export type GovernmentReportSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    report_type?: boolean
    period?: boolean
    year?: boolean
    month?: boolean
    status?: boolean
    file_url?: boolean
    data?: boolean
    generated_at?: boolean
    submitted_at?: boolean
    submitted_by?: boolean
    total_employees?: boolean
    total_amount?: boolean
    reference_number?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["governmentReport"]>

  export type GovernmentReportSelectScalar = {
    id?: boolean
    report_type?: boolean
    period?: boolean
    year?: boolean
    month?: boolean
    status?: boolean
    file_url?: boolean
    data?: boolean
    generated_at?: boolean
    submitted_at?: boolean
    submitted_by?: boolean
    total_employees?: boolean
    total_amount?: boolean
    reference_number?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type GovernmentReportOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "report_type" | "period" | "year" | "month" | "status" | "file_url" | "data" | "generated_at" | "submitted_at" | "submitted_by" | "total_employees" | "total_amount" | "reference_number" | "created_at" | "updated_at", ExtArgs["result"]["governmentReport"]>

  export type $GovernmentReportPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "GovernmentReport"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      report_type: string
      period: string
      year: number
      month: number | null
      status: string
      file_url: string | null
      data: Prisma.JsonValue | null
      generated_at: Date | null
      submitted_at: Date | null
      submitted_by: string | null
      total_employees: number
      total_amount: number
      reference_number: string | null
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["governmentReport"]>
    composites: {}
  }

  type GovernmentReportGetPayload<S extends boolean | null | undefined | GovernmentReportDefaultArgs> = $Result.GetResult<Prisma.$GovernmentReportPayload, S>

  type GovernmentReportCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<GovernmentReportFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: GovernmentReportCountAggregateInputType | true
    }

  export interface GovernmentReportDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['GovernmentReport'], meta: { name: 'GovernmentReport' } }
    /**
     * Find zero or one GovernmentReport that matches the filter.
     * @param {GovernmentReportFindUniqueArgs} args - Arguments to find a GovernmentReport
     * @example
     * // Get one GovernmentReport
     * const governmentReport = await prisma.governmentReport.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends GovernmentReportFindUniqueArgs>(args: SelectSubset<T, GovernmentReportFindUniqueArgs<ExtArgs>>): Prisma__GovernmentReportClient<$Result.GetResult<Prisma.$GovernmentReportPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one GovernmentReport that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {GovernmentReportFindUniqueOrThrowArgs} args - Arguments to find a GovernmentReport
     * @example
     * // Get one GovernmentReport
     * const governmentReport = await prisma.governmentReport.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends GovernmentReportFindUniqueOrThrowArgs>(args: SelectSubset<T, GovernmentReportFindUniqueOrThrowArgs<ExtArgs>>): Prisma__GovernmentReportClient<$Result.GetResult<Prisma.$GovernmentReportPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first GovernmentReport that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GovernmentReportFindFirstArgs} args - Arguments to find a GovernmentReport
     * @example
     * // Get one GovernmentReport
     * const governmentReport = await prisma.governmentReport.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends GovernmentReportFindFirstArgs>(args?: SelectSubset<T, GovernmentReportFindFirstArgs<ExtArgs>>): Prisma__GovernmentReportClient<$Result.GetResult<Prisma.$GovernmentReportPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first GovernmentReport that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GovernmentReportFindFirstOrThrowArgs} args - Arguments to find a GovernmentReport
     * @example
     * // Get one GovernmentReport
     * const governmentReport = await prisma.governmentReport.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends GovernmentReportFindFirstOrThrowArgs>(args?: SelectSubset<T, GovernmentReportFindFirstOrThrowArgs<ExtArgs>>): Prisma__GovernmentReportClient<$Result.GetResult<Prisma.$GovernmentReportPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more GovernmentReports that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GovernmentReportFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all GovernmentReports
     * const governmentReports = await prisma.governmentReport.findMany()
     * 
     * // Get first 10 GovernmentReports
     * const governmentReports = await prisma.governmentReport.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const governmentReportWithIdOnly = await prisma.governmentReport.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends GovernmentReportFindManyArgs>(args?: SelectSubset<T, GovernmentReportFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GovernmentReportPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a GovernmentReport.
     * @param {GovernmentReportCreateArgs} args - Arguments to create a GovernmentReport.
     * @example
     * // Create one GovernmentReport
     * const GovernmentReport = await prisma.governmentReport.create({
     *   data: {
     *     // ... data to create a GovernmentReport
     *   }
     * })
     * 
     */
    create<T extends GovernmentReportCreateArgs>(args: SelectSubset<T, GovernmentReportCreateArgs<ExtArgs>>): Prisma__GovernmentReportClient<$Result.GetResult<Prisma.$GovernmentReportPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many GovernmentReports.
     * @param {GovernmentReportCreateManyArgs} args - Arguments to create many GovernmentReports.
     * @example
     * // Create many GovernmentReports
     * const governmentReport = await prisma.governmentReport.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends GovernmentReportCreateManyArgs>(args?: SelectSubset<T, GovernmentReportCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many GovernmentReports and returns the data saved in the database.
     * @param {GovernmentReportCreateManyAndReturnArgs} args - Arguments to create many GovernmentReports.
     * @example
     * // Create many GovernmentReports
     * const governmentReport = await prisma.governmentReport.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many GovernmentReports and only return the `id`
     * const governmentReportWithIdOnly = await prisma.governmentReport.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends GovernmentReportCreateManyAndReturnArgs>(args?: SelectSubset<T, GovernmentReportCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GovernmentReportPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a GovernmentReport.
     * @param {GovernmentReportDeleteArgs} args - Arguments to delete one GovernmentReport.
     * @example
     * // Delete one GovernmentReport
     * const GovernmentReport = await prisma.governmentReport.delete({
     *   where: {
     *     // ... filter to delete one GovernmentReport
     *   }
     * })
     * 
     */
    delete<T extends GovernmentReportDeleteArgs>(args: SelectSubset<T, GovernmentReportDeleteArgs<ExtArgs>>): Prisma__GovernmentReportClient<$Result.GetResult<Prisma.$GovernmentReportPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one GovernmentReport.
     * @param {GovernmentReportUpdateArgs} args - Arguments to update one GovernmentReport.
     * @example
     * // Update one GovernmentReport
     * const governmentReport = await prisma.governmentReport.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends GovernmentReportUpdateArgs>(args: SelectSubset<T, GovernmentReportUpdateArgs<ExtArgs>>): Prisma__GovernmentReportClient<$Result.GetResult<Prisma.$GovernmentReportPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more GovernmentReports.
     * @param {GovernmentReportDeleteManyArgs} args - Arguments to filter GovernmentReports to delete.
     * @example
     * // Delete a few GovernmentReports
     * const { count } = await prisma.governmentReport.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends GovernmentReportDeleteManyArgs>(args?: SelectSubset<T, GovernmentReportDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more GovernmentReports.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GovernmentReportUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many GovernmentReports
     * const governmentReport = await prisma.governmentReport.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends GovernmentReportUpdateManyArgs>(args: SelectSubset<T, GovernmentReportUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more GovernmentReports and returns the data updated in the database.
     * @param {GovernmentReportUpdateManyAndReturnArgs} args - Arguments to update many GovernmentReports.
     * @example
     * // Update many GovernmentReports
     * const governmentReport = await prisma.governmentReport.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more GovernmentReports and only return the `id`
     * const governmentReportWithIdOnly = await prisma.governmentReport.updateManyAndReturn({
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
    updateManyAndReturn<T extends GovernmentReportUpdateManyAndReturnArgs>(args: SelectSubset<T, GovernmentReportUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GovernmentReportPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one GovernmentReport.
     * @param {GovernmentReportUpsertArgs} args - Arguments to update or create a GovernmentReport.
     * @example
     * // Update or create a GovernmentReport
     * const governmentReport = await prisma.governmentReport.upsert({
     *   create: {
     *     // ... data to create a GovernmentReport
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the GovernmentReport we want to update
     *   }
     * })
     */
    upsert<T extends GovernmentReportUpsertArgs>(args: SelectSubset<T, GovernmentReportUpsertArgs<ExtArgs>>): Prisma__GovernmentReportClient<$Result.GetResult<Prisma.$GovernmentReportPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of GovernmentReports.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GovernmentReportCountArgs} args - Arguments to filter GovernmentReports to count.
     * @example
     * // Count the number of GovernmentReports
     * const count = await prisma.governmentReport.count({
     *   where: {
     *     // ... the filter for the GovernmentReports we want to count
     *   }
     * })
    **/
    count<T extends GovernmentReportCountArgs>(
      args?: Subset<T, GovernmentReportCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], GovernmentReportCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a GovernmentReport.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GovernmentReportAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends GovernmentReportAggregateArgs>(args: Subset<T, GovernmentReportAggregateArgs>): Prisma.PrismaPromise<GetGovernmentReportAggregateType<T>>

    /**
     * Group by GovernmentReport.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GovernmentReportGroupByArgs} args - Group by arguments.
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
      T extends GovernmentReportGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: GovernmentReportGroupByArgs['orderBy'] }
        : { orderBy?: GovernmentReportGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, GovernmentReportGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetGovernmentReportGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the GovernmentReport model
   */
  readonly fields: GovernmentReportFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for GovernmentReport.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__GovernmentReportClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the GovernmentReport model
   */
  interface GovernmentReportFieldRefs {
    readonly id: FieldRef<"GovernmentReport", 'String'>
    readonly report_type: FieldRef<"GovernmentReport", 'String'>
    readonly period: FieldRef<"GovernmentReport", 'String'>
    readonly year: FieldRef<"GovernmentReport", 'Int'>
    readonly month: FieldRef<"GovernmentReport", 'Int'>
    readonly status: FieldRef<"GovernmentReport", 'String'>
    readonly file_url: FieldRef<"GovernmentReport", 'String'>
    readonly data: FieldRef<"GovernmentReport", 'Json'>
    readonly generated_at: FieldRef<"GovernmentReport", 'DateTime'>
    readonly submitted_at: FieldRef<"GovernmentReport", 'DateTime'>
    readonly submitted_by: FieldRef<"GovernmentReport", 'String'>
    readonly total_employees: FieldRef<"GovernmentReport", 'Int'>
    readonly total_amount: FieldRef<"GovernmentReport", 'Float'>
    readonly reference_number: FieldRef<"GovernmentReport", 'String'>
    readonly created_at: FieldRef<"GovernmentReport", 'DateTime'>
    readonly updated_at: FieldRef<"GovernmentReport", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * GovernmentReport findUnique
   */
  export type GovernmentReportFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GovernmentReport
     */
    select?: GovernmentReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GovernmentReport
     */
    omit?: GovernmentReportOmit<ExtArgs> | null
    /**
     * Filter, which GovernmentReport to fetch.
     */
    where: GovernmentReportWhereUniqueInput
  }

  /**
   * GovernmentReport findUniqueOrThrow
   */
  export type GovernmentReportFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GovernmentReport
     */
    select?: GovernmentReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GovernmentReport
     */
    omit?: GovernmentReportOmit<ExtArgs> | null
    /**
     * Filter, which GovernmentReport to fetch.
     */
    where: GovernmentReportWhereUniqueInput
  }

  /**
   * GovernmentReport findFirst
   */
  export type GovernmentReportFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GovernmentReport
     */
    select?: GovernmentReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GovernmentReport
     */
    omit?: GovernmentReportOmit<ExtArgs> | null
    /**
     * Filter, which GovernmentReport to fetch.
     */
    where?: GovernmentReportWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GovernmentReports to fetch.
     */
    orderBy?: GovernmentReportOrderByWithRelationInput | GovernmentReportOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for GovernmentReports.
     */
    cursor?: GovernmentReportWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GovernmentReports from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GovernmentReports.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of GovernmentReports.
     */
    distinct?: GovernmentReportScalarFieldEnum | GovernmentReportScalarFieldEnum[]
  }

  /**
   * GovernmentReport findFirstOrThrow
   */
  export type GovernmentReportFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GovernmentReport
     */
    select?: GovernmentReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GovernmentReport
     */
    omit?: GovernmentReportOmit<ExtArgs> | null
    /**
     * Filter, which GovernmentReport to fetch.
     */
    where?: GovernmentReportWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GovernmentReports to fetch.
     */
    orderBy?: GovernmentReportOrderByWithRelationInput | GovernmentReportOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for GovernmentReports.
     */
    cursor?: GovernmentReportWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GovernmentReports from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GovernmentReports.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of GovernmentReports.
     */
    distinct?: GovernmentReportScalarFieldEnum | GovernmentReportScalarFieldEnum[]
  }

  /**
   * GovernmentReport findMany
   */
  export type GovernmentReportFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GovernmentReport
     */
    select?: GovernmentReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GovernmentReport
     */
    omit?: GovernmentReportOmit<ExtArgs> | null
    /**
     * Filter, which GovernmentReports to fetch.
     */
    where?: GovernmentReportWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GovernmentReports to fetch.
     */
    orderBy?: GovernmentReportOrderByWithRelationInput | GovernmentReportOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing GovernmentReports.
     */
    cursor?: GovernmentReportWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GovernmentReports from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GovernmentReports.
     */
    skip?: number
    distinct?: GovernmentReportScalarFieldEnum | GovernmentReportScalarFieldEnum[]
  }

  /**
   * GovernmentReport create
   */
  export type GovernmentReportCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GovernmentReport
     */
    select?: GovernmentReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GovernmentReport
     */
    omit?: GovernmentReportOmit<ExtArgs> | null
    /**
     * The data needed to create a GovernmentReport.
     */
    data: XOR<GovernmentReportCreateInput, GovernmentReportUncheckedCreateInput>
  }

  /**
   * GovernmentReport createMany
   */
  export type GovernmentReportCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many GovernmentReports.
     */
    data: GovernmentReportCreateManyInput | GovernmentReportCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * GovernmentReport createManyAndReturn
   */
  export type GovernmentReportCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GovernmentReport
     */
    select?: GovernmentReportSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the GovernmentReport
     */
    omit?: GovernmentReportOmit<ExtArgs> | null
    /**
     * The data used to create many GovernmentReports.
     */
    data: GovernmentReportCreateManyInput | GovernmentReportCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * GovernmentReport update
   */
  export type GovernmentReportUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GovernmentReport
     */
    select?: GovernmentReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GovernmentReport
     */
    omit?: GovernmentReportOmit<ExtArgs> | null
    /**
     * The data needed to update a GovernmentReport.
     */
    data: XOR<GovernmentReportUpdateInput, GovernmentReportUncheckedUpdateInput>
    /**
     * Choose, which GovernmentReport to update.
     */
    where: GovernmentReportWhereUniqueInput
  }

  /**
   * GovernmentReport updateMany
   */
  export type GovernmentReportUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update GovernmentReports.
     */
    data: XOR<GovernmentReportUpdateManyMutationInput, GovernmentReportUncheckedUpdateManyInput>
    /**
     * Filter which GovernmentReports to update
     */
    where?: GovernmentReportWhereInput
    /**
     * Limit how many GovernmentReports to update.
     */
    limit?: number
  }

  /**
   * GovernmentReport updateManyAndReturn
   */
  export type GovernmentReportUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GovernmentReport
     */
    select?: GovernmentReportSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the GovernmentReport
     */
    omit?: GovernmentReportOmit<ExtArgs> | null
    /**
     * The data used to update GovernmentReports.
     */
    data: XOR<GovernmentReportUpdateManyMutationInput, GovernmentReportUncheckedUpdateManyInput>
    /**
     * Filter which GovernmentReports to update
     */
    where?: GovernmentReportWhereInput
    /**
     * Limit how many GovernmentReports to update.
     */
    limit?: number
  }

  /**
   * GovernmentReport upsert
   */
  export type GovernmentReportUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GovernmentReport
     */
    select?: GovernmentReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GovernmentReport
     */
    omit?: GovernmentReportOmit<ExtArgs> | null
    /**
     * The filter to search for the GovernmentReport to update in case it exists.
     */
    where: GovernmentReportWhereUniqueInput
    /**
     * In case the GovernmentReport found by the `where` argument doesn't exist, create a new GovernmentReport with this data.
     */
    create: XOR<GovernmentReportCreateInput, GovernmentReportUncheckedCreateInput>
    /**
     * In case the GovernmentReport was found with the provided `where` argument, update it with this data.
     */
    update: XOR<GovernmentReportUpdateInput, GovernmentReportUncheckedUpdateInput>
  }

  /**
   * GovernmentReport delete
   */
  export type GovernmentReportDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GovernmentReport
     */
    select?: GovernmentReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GovernmentReport
     */
    omit?: GovernmentReportOmit<ExtArgs> | null
    /**
     * Filter which GovernmentReport to delete.
     */
    where: GovernmentReportWhereUniqueInput
  }

  /**
   * GovernmentReport deleteMany
   */
  export type GovernmentReportDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which GovernmentReports to delete
     */
    where?: GovernmentReportWhereInput
    /**
     * Limit how many GovernmentReports to delete.
     */
    limit?: number
  }

  /**
   * GovernmentReport without action
   */
  export type GovernmentReportDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GovernmentReport
     */
    select?: GovernmentReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GovernmentReport
     */
    omit?: GovernmentReportOmit<ExtArgs> | null
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


  export const PayrollRunScalarFieldEnum: {
    id: 'id',
    period: 'period',
    year: 'year',
    month: 'month',
    status: 'status',
    type: 'type',
    total_gross: 'total_gross',
    total_deductions: 'total_deductions',
    total_net: 'total_net',
    total_employer_cost: 'total_employer_cost',
    employee_count: 'employee_count',
    created_by: 'created_by',
    approved_by: 'approved_by',
    notes: 'notes',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type PayrollRunScalarFieldEnum = (typeof PayrollRunScalarFieldEnum)[keyof typeof PayrollRunScalarFieldEnum]


  export const PayslipScalarFieldEnum: {
    id: 'id',
    payroll_run_id: 'payroll_run_id',
    employee_id: 'employee_id',
    base_salary: 'base_salary',
    gross_salary: 'gross_salary',
    total_earnings: 'total_earnings',
    total_deductions: 'total_deductions',
    net_salary: 'net_salary',
    tax_amount: 'tax_amount',
    sso_amount: 'sso_amount',
    provident_fund_employee: 'provident_fund_employee',
    provident_fund_employer: 'provident_fund_employer',
    earnings_detail: 'earnings_detail',
    deductions_detail: 'deductions_detail',
    bank_code: 'bank_code',
    bank_account: 'bank_account',
    payment_status: 'payment_status',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type PayslipScalarFieldEnum = (typeof PayslipScalarFieldEnum)[keyof typeof PayslipScalarFieldEnum]


  export const CompensationScalarFieldEnum: {
    id: 'id',
    employee_id: 'employee_id',
    base_salary: 'base_salary',
    position_allowance: 'position_allowance',
    housing_allowance: 'housing_allowance',
    transportation_allowance: 'transportation_allowance',
    meal_allowance: 'meal_allowance',
    other_allowances: 'other_allowances',
    effective_date: 'effective_date',
    currency: 'currency',
    grade: 'grade',
    level: 'level',
    provident_fund_rate: 'provident_fund_rate',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type CompensationScalarFieldEnum = (typeof CompensationScalarFieldEnum)[keyof typeof CompensationScalarFieldEnum]


  export const TaxDeductionScalarFieldEnum: {
    id: 'id',
    employee_id: 'employee_id',
    tax_year: 'tax_year',
    annual_income: 'annual_income',
    personal_allowance: 'personal_allowance',
    expense_deduction: 'expense_deduction',
    spouse_allowance: 'spouse_allowance',
    child_allowance: 'child_allowance',
    parent_allowance: 'parent_allowance',
    life_insurance: 'life_insurance',
    health_insurance: 'health_insurance',
    provident_fund_deduction: 'provident_fund_deduction',
    social_security_deduction: 'social_security_deduction',
    home_loan_interest: 'home_loan_interest',
    donation: 'donation',
    other_deductions: 'other_deductions',
    total_deductions: 'total_deductions',
    taxable_income: 'taxable_income',
    calculated_tax: 'calculated_tax',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type TaxDeductionScalarFieldEnum = (typeof TaxDeductionScalarFieldEnum)[keyof typeof TaxDeductionScalarFieldEnum]


  export const GovernmentReportScalarFieldEnum: {
    id: 'id',
    report_type: 'report_type',
    period: 'period',
    year: 'year',
    month: 'month',
    status: 'status',
    file_url: 'file_url',
    data: 'data',
    generated_at: 'generated_at',
    submitted_at: 'submitted_at',
    submitted_by: 'submitted_by',
    total_employees: 'total_employees',
    total_amount: 'total_amount',
    reference_number: 'reference_number',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type GovernmentReportScalarFieldEnum = (typeof GovernmentReportScalarFieldEnum)[keyof typeof GovernmentReportScalarFieldEnum]


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


  export type PayrollRunWhereInput = {
    AND?: PayrollRunWhereInput | PayrollRunWhereInput[]
    OR?: PayrollRunWhereInput[]
    NOT?: PayrollRunWhereInput | PayrollRunWhereInput[]
    id?: StringFilter<"PayrollRun"> | string
    period?: StringFilter<"PayrollRun"> | string
    year?: IntFilter<"PayrollRun"> | number
    month?: IntFilter<"PayrollRun"> | number
    status?: StringFilter<"PayrollRun"> | string
    type?: StringFilter<"PayrollRun"> | string
    total_gross?: FloatFilter<"PayrollRun"> | number
    total_deductions?: FloatFilter<"PayrollRun"> | number
    total_net?: FloatFilter<"PayrollRun"> | number
    total_employer_cost?: FloatFilter<"PayrollRun"> | number
    employee_count?: IntFilter<"PayrollRun"> | number
    created_by?: StringFilter<"PayrollRun"> | string
    approved_by?: StringNullableFilter<"PayrollRun"> | string | null
    notes?: StringNullableFilter<"PayrollRun"> | string | null
    created_at?: DateTimeFilter<"PayrollRun"> | Date | string
    updated_at?: DateTimeFilter<"PayrollRun"> | Date | string
    payslips?: PayslipListRelationFilter
  }

  export type PayrollRunOrderByWithRelationInput = {
    id?: SortOrder
    period?: SortOrder
    year?: SortOrder
    month?: SortOrder
    status?: SortOrder
    type?: SortOrder
    total_gross?: SortOrder
    total_deductions?: SortOrder
    total_net?: SortOrder
    total_employer_cost?: SortOrder
    employee_count?: SortOrder
    created_by?: SortOrder
    approved_by?: SortOrderInput | SortOrder
    notes?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    payslips?: PayslipOrderByRelationAggregateInput
  }

  export type PayrollRunWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    period_type?: PayrollRunPeriodTypeCompoundUniqueInput
    AND?: PayrollRunWhereInput | PayrollRunWhereInput[]
    OR?: PayrollRunWhereInput[]
    NOT?: PayrollRunWhereInput | PayrollRunWhereInput[]
    period?: StringFilter<"PayrollRun"> | string
    year?: IntFilter<"PayrollRun"> | number
    month?: IntFilter<"PayrollRun"> | number
    status?: StringFilter<"PayrollRun"> | string
    type?: StringFilter<"PayrollRun"> | string
    total_gross?: FloatFilter<"PayrollRun"> | number
    total_deductions?: FloatFilter<"PayrollRun"> | number
    total_net?: FloatFilter<"PayrollRun"> | number
    total_employer_cost?: FloatFilter<"PayrollRun"> | number
    employee_count?: IntFilter<"PayrollRun"> | number
    created_by?: StringFilter<"PayrollRun"> | string
    approved_by?: StringNullableFilter<"PayrollRun"> | string | null
    notes?: StringNullableFilter<"PayrollRun"> | string | null
    created_at?: DateTimeFilter<"PayrollRun"> | Date | string
    updated_at?: DateTimeFilter<"PayrollRun"> | Date | string
    payslips?: PayslipListRelationFilter
  }, "id" | "period_type">

  export type PayrollRunOrderByWithAggregationInput = {
    id?: SortOrder
    period?: SortOrder
    year?: SortOrder
    month?: SortOrder
    status?: SortOrder
    type?: SortOrder
    total_gross?: SortOrder
    total_deductions?: SortOrder
    total_net?: SortOrder
    total_employer_cost?: SortOrder
    employee_count?: SortOrder
    created_by?: SortOrder
    approved_by?: SortOrderInput | SortOrder
    notes?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: PayrollRunCountOrderByAggregateInput
    _avg?: PayrollRunAvgOrderByAggregateInput
    _max?: PayrollRunMaxOrderByAggregateInput
    _min?: PayrollRunMinOrderByAggregateInput
    _sum?: PayrollRunSumOrderByAggregateInput
  }

  export type PayrollRunScalarWhereWithAggregatesInput = {
    AND?: PayrollRunScalarWhereWithAggregatesInput | PayrollRunScalarWhereWithAggregatesInput[]
    OR?: PayrollRunScalarWhereWithAggregatesInput[]
    NOT?: PayrollRunScalarWhereWithAggregatesInput | PayrollRunScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"PayrollRun"> | string
    period?: StringWithAggregatesFilter<"PayrollRun"> | string
    year?: IntWithAggregatesFilter<"PayrollRun"> | number
    month?: IntWithAggregatesFilter<"PayrollRun"> | number
    status?: StringWithAggregatesFilter<"PayrollRun"> | string
    type?: StringWithAggregatesFilter<"PayrollRun"> | string
    total_gross?: FloatWithAggregatesFilter<"PayrollRun"> | number
    total_deductions?: FloatWithAggregatesFilter<"PayrollRun"> | number
    total_net?: FloatWithAggregatesFilter<"PayrollRun"> | number
    total_employer_cost?: FloatWithAggregatesFilter<"PayrollRun"> | number
    employee_count?: IntWithAggregatesFilter<"PayrollRun"> | number
    created_by?: StringWithAggregatesFilter<"PayrollRun"> | string
    approved_by?: StringNullableWithAggregatesFilter<"PayrollRun"> | string | null
    notes?: StringNullableWithAggregatesFilter<"PayrollRun"> | string | null
    created_at?: DateTimeWithAggregatesFilter<"PayrollRun"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"PayrollRun"> | Date | string
  }

  export type PayslipWhereInput = {
    AND?: PayslipWhereInput | PayslipWhereInput[]
    OR?: PayslipWhereInput[]
    NOT?: PayslipWhereInput | PayslipWhereInput[]
    id?: StringFilter<"Payslip"> | string
    payroll_run_id?: StringFilter<"Payslip"> | string
    employee_id?: StringFilter<"Payslip"> | string
    base_salary?: FloatFilter<"Payslip"> | number
    gross_salary?: StringFilter<"Payslip"> | string
    total_earnings?: FloatFilter<"Payslip"> | number
    total_deductions?: FloatFilter<"Payslip"> | number
    net_salary?: StringFilter<"Payslip"> | string
    tax_amount?: FloatFilter<"Payslip"> | number
    sso_amount?: FloatFilter<"Payslip"> | number
    provident_fund_employee?: FloatFilter<"Payslip"> | number
    provident_fund_employer?: FloatFilter<"Payslip"> | number
    earnings_detail?: JsonNullableFilter<"Payslip">
    deductions_detail?: JsonNullableFilter<"Payslip">
    bank_code?: StringNullableFilter<"Payslip"> | string | null
    bank_account?: StringNullableFilter<"Payslip"> | string | null
    payment_status?: StringFilter<"Payslip"> | string
    created_at?: DateTimeFilter<"Payslip"> | Date | string
    updated_at?: DateTimeFilter<"Payslip"> | Date | string
    payroll_run?: XOR<PayrollRunScalarRelationFilter, PayrollRunWhereInput>
  }

  export type PayslipOrderByWithRelationInput = {
    id?: SortOrder
    payroll_run_id?: SortOrder
    employee_id?: SortOrder
    base_salary?: SortOrder
    gross_salary?: SortOrder
    total_earnings?: SortOrder
    total_deductions?: SortOrder
    net_salary?: SortOrder
    tax_amount?: SortOrder
    sso_amount?: SortOrder
    provident_fund_employee?: SortOrder
    provident_fund_employer?: SortOrder
    earnings_detail?: SortOrderInput | SortOrder
    deductions_detail?: SortOrderInput | SortOrder
    bank_code?: SortOrderInput | SortOrder
    bank_account?: SortOrderInput | SortOrder
    payment_status?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    payroll_run?: PayrollRunOrderByWithRelationInput
  }

  export type PayslipWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    payroll_run_id_employee_id?: PayslipPayroll_run_idEmployee_idCompoundUniqueInput
    AND?: PayslipWhereInput | PayslipWhereInput[]
    OR?: PayslipWhereInput[]
    NOT?: PayslipWhereInput | PayslipWhereInput[]
    payroll_run_id?: StringFilter<"Payslip"> | string
    employee_id?: StringFilter<"Payslip"> | string
    base_salary?: FloatFilter<"Payslip"> | number
    gross_salary?: StringFilter<"Payslip"> | string
    total_earnings?: FloatFilter<"Payslip"> | number
    total_deductions?: FloatFilter<"Payslip"> | number
    net_salary?: StringFilter<"Payslip"> | string
    tax_amount?: FloatFilter<"Payslip"> | number
    sso_amount?: FloatFilter<"Payslip"> | number
    provident_fund_employee?: FloatFilter<"Payslip"> | number
    provident_fund_employer?: FloatFilter<"Payslip"> | number
    earnings_detail?: JsonNullableFilter<"Payslip">
    deductions_detail?: JsonNullableFilter<"Payslip">
    bank_code?: StringNullableFilter<"Payslip"> | string | null
    bank_account?: StringNullableFilter<"Payslip"> | string | null
    payment_status?: StringFilter<"Payslip"> | string
    created_at?: DateTimeFilter<"Payslip"> | Date | string
    updated_at?: DateTimeFilter<"Payslip"> | Date | string
    payroll_run?: XOR<PayrollRunScalarRelationFilter, PayrollRunWhereInput>
  }, "id" | "payroll_run_id_employee_id">

  export type PayslipOrderByWithAggregationInput = {
    id?: SortOrder
    payroll_run_id?: SortOrder
    employee_id?: SortOrder
    base_salary?: SortOrder
    gross_salary?: SortOrder
    total_earnings?: SortOrder
    total_deductions?: SortOrder
    net_salary?: SortOrder
    tax_amount?: SortOrder
    sso_amount?: SortOrder
    provident_fund_employee?: SortOrder
    provident_fund_employer?: SortOrder
    earnings_detail?: SortOrderInput | SortOrder
    deductions_detail?: SortOrderInput | SortOrder
    bank_code?: SortOrderInput | SortOrder
    bank_account?: SortOrderInput | SortOrder
    payment_status?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: PayslipCountOrderByAggregateInput
    _avg?: PayslipAvgOrderByAggregateInput
    _max?: PayslipMaxOrderByAggregateInput
    _min?: PayslipMinOrderByAggregateInput
    _sum?: PayslipSumOrderByAggregateInput
  }

  export type PayslipScalarWhereWithAggregatesInput = {
    AND?: PayslipScalarWhereWithAggregatesInput | PayslipScalarWhereWithAggregatesInput[]
    OR?: PayslipScalarWhereWithAggregatesInput[]
    NOT?: PayslipScalarWhereWithAggregatesInput | PayslipScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Payslip"> | string
    payroll_run_id?: StringWithAggregatesFilter<"Payslip"> | string
    employee_id?: StringWithAggregatesFilter<"Payslip"> | string
    base_salary?: FloatWithAggregatesFilter<"Payslip"> | number
    gross_salary?: StringWithAggregatesFilter<"Payslip"> | string
    total_earnings?: FloatWithAggregatesFilter<"Payslip"> | number
    total_deductions?: FloatWithAggregatesFilter<"Payslip"> | number
    net_salary?: StringWithAggregatesFilter<"Payslip"> | string
    tax_amount?: FloatWithAggregatesFilter<"Payslip"> | number
    sso_amount?: FloatWithAggregatesFilter<"Payslip"> | number
    provident_fund_employee?: FloatWithAggregatesFilter<"Payslip"> | number
    provident_fund_employer?: FloatWithAggregatesFilter<"Payslip"> | number
    earnings_detail?: JsonNullableWithAggregatesFilter<"Payslip">
    deductions_detail?: JsonNullableWithAggregatesFilter<"Payslip">
    bank_code?: StringNullableWithAggregatesFilter<"Payslip"> | string | null
    bank_account?: StringNullableWithAggregatesFilter<"Payslip"> | string | null
    payment_status?: StringWithAggregatesFilter<"Payslip"> | string
    created_at?: DateTimeWithAggregatesFilter<"Payslip"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"Payslip"> | Date | string
  }

  export type CompensationWhereInput = {
    AND?: CompensationWhereInput | CompensationWhereInput[]
    OR?: CompensationWhereInput[]
    NOT?: CompensationWhereInput | CompensationWhereInput[]
    id?: StringFilter<"Compensation"> | string
    employee_id?: StringFilter<"Compensation"> | string
    base_salary?: StringFilter<"Compensation"> | string
    position_allowance?: FloatFilter<"Compensation"> | number
    housing_allowance?: FloatFilter<"Compensation"> | number
    transportation_allowance?: FloatFilter<"Compensation"> | number
    meal_allowance?: FloatFilter<"Compensation"> | number
    other_allowances?: JsonNullableFilter<"Compensation">
    effective_date?: DateTimeFilter<"Compensation"> | Date | string
    currency?: StringFilter<"Compensation"> | string
    grade?: StringNullableFilter<"Compensation"> | string | null
    level?: StringNullableFilter<"Compensation"> | string | null
    provident_fund_rate?: FloatFilter<"Compensation"> | number
    created_at?: DateTimeFilter<"Compensation"> | Date | string
    updated_at?: DateTimeFilter<"Compensation"> | Date | string
  }

  export type CompensationOrderByWithRelationInput = {
    id?: SortOrder
    employee_id?: SortOrder
    base_salary?: SortOrder
    position_allowance?: SortOrder
    housing_allowance?: SortOrder
    transportation_allowance?: SortOrder
    meal_allowance?: SortOrder
    other_allowances?: SortOrderInput | SortOrder
    effective_date?: SortOrder
    currency?: SortOrder
    grade?: SortOrderInput | SortOrder
    level?: SortOrderInput | SortOrder
    provident_fund_rate?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type CompensationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    employee_id?: string
    AND?: CompensationWhereInput | CompensationWhereInput[]
    OR?: CompensationWhereInput[]
    NOT?: CompensationWhereInput | CompensationWhereInput[]
    base_salary?: StringFilter<"Compensation"> | string
    position_allowance?: FloatFilter<"Compensation"> | number
    housing_allowance?: FloatFilter<"Compensation"> | number
    transportation_allowance?: FloatFilter<"Compensation"> | number
    meal_allowance?: FloatFilter<"Compensation"> | number
    other_allowances?: JsonNullableFilter<"Compensation">
    effective_date?: DateTimeFilter<"Compensation"> | Date | string
    currency?: StringFilter<"Compensation"> | string
    grade?: StringNullableFilter<"Compensation"> | string | null
    level?: StringNullableFilter<"Compensation"> | string | null
    provident_fund_rate?: FloatFilter<"Compensation"> | number
    created_at?: DateTimeFilter<"Compensation"> | Date | string
    updated_at?: DateTimeFilter<"Compensation"> | Date | string
  }, "id" | "employee_id">

  export type CompensationOrderByWithAggregationInput = {
    id?: SortOrder
    employee_id?: SortOrder
    base_salary?: SortOrder
    position_allowance?: SortOrder
    housing_allowance?: SortOrder
    transportation_allowance?: SortOrder
    meal_allowance?: SortOrder
    other_allowances?: SortOrderInput | SortOrder
    effective_date?: SortOrder
    currency?: SortOrder
    grade?: SortOrderInput | SortOrder
    level?: SortOrderInput | SortOrder
    provident_fund_rate?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: CompensationCountOrderByAggregateInput
    _avg?: CompensationAvgOrderByAggregateInput
    _max?: CompensationMaxOrderByAggregateInput
    _min?: CompensationMinOrderByAggregateInput
    _sum?: CompensationSumOrderByAggregateInput
  }

  export type CompensationScalarWhereWithAggregatesInput = {
    AND?: CompensationScalarWhereWithAggregatesInput | CompensationScalarWhereWithAggregatesInput[]
    OR?: CompensationScalarWhereWithAggregatesInput[]
    NOT?: CompensationScalarWhereWithAggregatesInput | CompensationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Compensation"> | string
    employee_id?: StringWithAggregatesFilter<"Compensation"> | string
    base_salary?: StringWithAggregatesFilter<"Compensation"> | string
    position_allowance?: FloatWithAggregatesFilter<"Compensation"> | number
    housing_allowance?: FloatWithAggregatesFilter<"Compensation"> | number
    transportation_allowance?: FloatWithAggregatesFilter<"Compensation"> | number
    meal_allowance?: FloatWithAggregatesFilter<"Compensation"> | number
    other_allowances?: JsonNullableWithAggregatesFilter<"Compensation">
    effective_date?: DateTimeWithAggregatesFilter<"Compensation"> | Date | string
    currency?: StringWithAggregatesFilter<"Compensation"> | string
    grade?: StringNullableWithAggregatesFilter<"Compensation"> | string | null
    level?: StringNullableWithAggregatesFilter<"Compensation"> | string | null
    provident_fund_rate?: FloatWithAggregatesFilter<"Compensation"> | number
    created_at?: DateTimeWithAggregatesFilter<"Compensation"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"Compensation"> | Date | string
  }

  export type TaxDeductionWhereInput = {
    AND?: TaxDeductionWhereInput | TaxDeductionWhereInput[]
    OR?: TaxDeductionWhereInput[]
    NOT?: TaxDeductionWhereInput | TaxDeductionWhereInput[]
    id?: StringFilter<"TaxDeduction"> | string
    employee_id?: StringFilter<"TaxDeduction"> | string
    tax_year?: IntFilter<"TaxDeduction"> | number
    annual_income?: FloatFilter<"TaxDeduction"> | number
    personal_allowance?: FloatFilter<"TaxDeduction"> | number
    expense_deduction?: FloatFilter<"TaxDeduction"> | number
    spouse_allowance?: FloatFilter<"TaxDeduction"> | number
    child_allowance?: FloatFilter<"TaxDeduction"> | number
    parent_allowance?: FloatFilter<"TaxDeduction"> | number
    life_insurance?: FloatFilter<"TaxDeduction"> | number
    health_insurance?: FloatFilter<"TaxDeduction"> | number
    provident_fund_deduction?: FloatFilter<"TaxDeduction"> | number
    social_security_deduction?: FloatFilter<"TaxDeduction"> | number
    home_loan_interest?: FloatFilter<"TaxDeduction"> | number
    donation?: FloatFilter<"TaxDeduction"> | number
    other_deductions?: FloatFilter<"TaxDeduction"> | number
    total_deductions?: FloatFilter<"TaxDeduction"> | number
    taxable_income?: FloatFilter<"TaxDeduction"> | number
    calculated_tax?: FloatFilter<"TaxDeduction"> | number
    created_at?: DateTimeFilter<"TaxDeduction"> | Date | string
    updated_at?: DateTimeFilter<"TaxDeduction"> | Date | string
  }

  export type TaxDeductionOrderByWithRelationInput = {
    id?: SortOrder
    employee_id?: SortOrder
    tax_year?: SortOrder
    annual_income?: SortOrder
    personal_allowance?: SortOrder
    expense_deduction?: SortOrder
    spouse_allowance?: SortOrder
    child_allowance?: SortOrder
    parent_allowance?: SortOrder
    life_insurance?: SortOrder
    health_insurance?: SortOrder
    provident_fund_deduction?: SortOrder
    social_security_deduction?: SortOrder
    home_loan_interest?: SortOrder
    donation?: SortOrder
    other_deductions?: SortOrder
    total_deductions?: SortOrder
    taxable_income?: SortOrder
    calculated_tax?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type TaxDeductionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    employee_id_tax_year?: TaxDeductionEmployee_idTax_yearCompoundUniqueInput
    AND?: TaxDeductionWhereInput | TaxDeductionWhereInput[]
    OR?: TaxDeductionWhereInput[]
    NOT?: TaxDeductionWhereInput | TaxDeductionWhereInput[]
    employee_id?: StringFilter<"TaxDeduction"> | string
    tax_year?: IntFilter<"TaxDeduction"> | number
    annual_income?: FloatFilter<"TaxDeduction"> | number
    personal_allowance?: FloatFilter<"TaxDeduction"> | number
    expense_deduction?: FloatFilter<"TaxDeduction"> | number
    spouse_allowance?: FloatFilter<"TaxDeduction"> | number
    child_allowance?: FloatFilter<"TaxDeduction"> | number
    parent_allowance?: FloatFilter<"TaxDeduction"> | number
    life_insurance?: FloatFilter<"TaxDeduction"> | number
    health_insurance?: FloatFilter<"TaxDeduction"> | number
    provident_fund_deduction?: FloatFilter<"TaxDeduction"> | number
    social_security_deduction?: FloatFilter<"TaxDeduction"> | number
    home_loan_interest?: FloatFilter<"TaxDeduction"> | number
    donation?: FloatFilter<"TaxDeduction"> | number
    other_deductions?: FloatFilter<"TaxDeduction"> | number
    total_deductions?: FloatFilter<"TaxDeduction"> | number
    taxable_income?: FloatFilter<"TaxDeduction"> | number
    calculated_tax?: FloatFilter<"TaxDeduction"> | number
    created_at?: DateTimeFilter<"TaxDeduction"> | Date | string
    updated_at?: DateTimeFilter<"TaxDeduction"> | Date | string
  }, "id" | "employee_id_tax_year">

  export type TaxDeductionOrderByWithAggregationInput = {
    id?: SortOrder
    employee_id?: SortOrder
    tax_year?: SortOrder
    annual_income?: SortOrder
    personal_allowance?: SortOrder
    expense_deduction?: SortOrder
    spouse_allowance?: SortOrder
    child_allowance?: SortOrder
    parent_allowance?: SortOrder
    life_insurance?: SortOrder
    health_insurance?: SortOrder
    provident_fund_deduction?: SortOrder
    social_security_deduction?: SortOrder
    home_loan_interest?: SortOrder
    donation?: SortOrder
    other_deductions?: SortOrder
    total_deductions?: SortOrder
    taxable_income?: SortOrder
    calculated_tax?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: TaxDeductionCountOrderByAggregateInput
    _avg?: TaxDeductionAvgOrderByAggregateInput
    _max?: TaxDeductionMaxOrderByAggregateInput
    _min?: TaxDeductionMinOrderByAggregateInput
    _sum?: TaxDeductionSumOrderByAggregateInput
  }

  export type TaxDeductionScalarWhereWithAggregatesInput = {
    AND?: TaxDeductionScalarWhereWithAggregatesInput | TaxDeductionScalarWhereWithAggregatesInput[]
    OR?: TaxDeductionScalarWhereWithAggregatesInput[]
    NOT?: TaxDeductionScalarWhereWithAggregatesInput | TaxDeductionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"TaxDeduction"> | string
    employee_id?: StringWithAggregatesFilter<"TaxDeduction"> | string
    tax_year?: IntWithAggregatesFilter<"TaxDeduction"> | number
    annual_income?: FloatWithAggregatesFilter<"TaxDeduction"> | number
    personal_allowance?: FloatWithAggregatesFilter<"TaxDeduction"> | number
    expense_deduction?: FloatWithAggregatesFilter<"TaxDeduction"> | number
    spouse_allowance?: FloatWithAggregatesFilter<"TaxDeduction"> | number
    child_allowance?: FloatWithAggregatesFilter<"TaxDeduction"> | number
    parent_allowance?: FloatWithAggregatesFilter<"TaxDeduction"> | number
    life_insurance?: FloatWithAggregatesFilter<"TaxDeduction"> | number
    health_insurance?: FloatWithAggregatesFilter<"TaxDeduction"> | number
    provident_fund_deduction?: FloatWithAggregatesFilter<"TaxDeduction"> | number
    social_security_deduction?: FloatWithAggregatesFilter<"TaxDeduction"> | number
    home_loan_interest?: FloatWithAggregatesFilter<"TaxDeduction"> | number
    donation?: FloatWithAggregatesFilter<"TaxDeduction"> | number
    other_deductions?: FloatWithAggregatesFilter<"TaxDeduction"> | number
    total_deductions?: FloatWithAggregatesFilter<"TaxDeduction"> | number
    taxable_income?: FloatWithAggregatesFilter<"TaxDeduction"> | number
    calculated_tax?: FloatWithAggregatesFilter<"TaxDeduction"> | number
    created_at?: DateTimeWithAggregatesFilter<"TaxDeduction"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"TaxDeduction"> | Date | string
  }

  export type GovernmentReportWhereInput = {
    AND?: GovernmentReportWhereInput | GovernmentReportWhereInput[]
    OR?: GovernmentReportWhereInput[]
    NOT?: GovernmentReportWhereInput | GovernmentReportWhereInput[]
    id?: StringFilter<"GovernmentReport"> | string
    report_type?: StringFilter<"GovernmentReport"> | string
    period?: StringFilter<"GovernmentReport"> | string
    year?: IntFilter<"GovernmentReport"> | number
    month?: IntNullableFilter<"GovernmentReport"> | number | null
    status?: StringFilter<"GovernmentReport"> | string
    file_url?: StringNullableFilter<"GovernmentReport"> | string | null
    data?: JsonNullableFilter<"GovernmentReport">
    generated_at?: DateTimeNullableFilter<"GovernmentReport"> | Date | string | null
    submitted_at?: DateTimeNullableFilter<"GovernmentReport"> | Date | string | null
    submitted_by?: StringNullableFilter<"GovernmentReport"> | string | null
    total_employees?: IntFilter<"GovernmentReport"> | number
    total_amount?: FloatFilter<"GovernmentReport"> | number
    reference_number?: StringNullableFilter<"GovernmentReport"> | string | null
    created_at?: DateTimeFilter<"GovernmentReport"> | Date | string
    updated_at?: DateTimeFilter<"GovernmentReport"> | Date | string
  }

  export type GovernmentReportOrderByWithRelationInput = {
    id?: SortOrder
    report_type?: SortOrder
    period?: SortOrder
    year?: SortOrder
    month?: SortOrderInput | SortOrder
    status?: SortOrder
    file_url?: SortOrderInput | SortOrder
    data?: SortOrderInput | SortOrder
    generated_at?: SortOrderInput | SortOrder
    submitted_at?: SortOrderInput | SortOrder
    submitted_by?: SortOrderInput | SortOrder
    total_employees?: SortOrder
    total_amount?: SortOrder
    reference_number?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type GovernmentReportWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: GovernmentReportWhereInput | GovernmentReportWhereInput[]
    OR?: GovernmentReportWhereInput[]
    NOT?: GovernmentReportWhereInput | GovernmentReportWhereInput[]
    report_type?: StringFilter<"GovernmentReport"> | string
    period?: StringFilter<"GovernmentReport"> | string
    year?: IntFilter<"GovernmentReport"> | number
    month?: IntNullableFilter<"GovernmentReport"> | number | null
    status?: StringFilter<"GovernmentReport"> | string
    file_url?: StringNullableFilter<"GovernmentReport"> | string | null
    data?: JsonNullableFilter<"GovernmentReport">
    generated_at?: DateTimeNullableFilter<"GovernmentReport"> | Date | string | null
    submitted_at?: DateTimeNullableFilter<"GovernmentReport"> | Date | string | null
    submitted_by?: StringNullableFilter<"GovernmentReport"> | string | null
    total_employees?: IntFilter<"GovernmentReport"> | number
    total_amount?: FloatFilter<"GovernmentReport"> | number
    reference_number?: StringNullableFilter<"GovernmentReport"> | string | null
    created_at?: DateTimeFilter<"GovernmentReport"> | Date | string
    updated_at?: DateTimeFilter<"GovernmentReport"> | Date | string
  }, "id">

  export type GovernmentReportOrderByWithAggregationInput = {
    id?: SortOrder
    report_type?: SortOrder
    period?: SortOrder
    year?: SortOrder
    month?: SortOrderInput | SortOrder
    status?: SortOrder
    file_url?: SortOrderInput | SortOrder
    data?: SortOrderInput | SortOrder
    generated_at?: SortOrderInput | SortOrder
    submitted_at?: SortOrderInput | SortOrder
    submitted_by?: SortOrderInput | SortOrder
    total_employees?: SortOrder
    total_amount?: SortOrder
    reference_number?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: GovernmentReportCountOrderByAggregateInput
    _avg?: GovernmentReportAvgOrderByAggregateInput
    _max?: GovernmentReportMaxOrderByAggregateInput
    _min?: GovernmentReportMinOrderByAggregateInput
    _sum?: GovernmentReportSumOrderByAggregateInput
  }

  export type GovernmentReportScalarWhereWithAggregatesInput = {
    AND?: GovernmentReportScalarWhereWithAggregatesInput | GovernmentReportScalarWhereWithAggregatesInput[]
    OR?: GovernmentReportScalarWhereWithAggregatesInput[]
    NOT?: GovernmentReportScalarWhereWithAggregatesInput | GovernmentReportScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"GovernmentReport"> | string
    report_type?: StringWithAggregatesFilter<"GovernmentReport"> | string
    period?: StringWithAggregatesFilter<"GovernmentReport"> | string
    year?: IntWithAggregatesFilter<"GovernmentReport"> | number
    month?: IntNullableWithAggregatesFilter<"GovernmentReport"> | number | null
    status?: StringWithAggregatesFilter<"GovernmentReport"> | string
    file_url?: StringNullableWithAggregatesFilter<"GovernmentReport"> | string | null
    data?: JsonNullableWithAggregatesFilter<"GovernmentReport">
    generated_at?: DateTimeNullableWithAggregatesFilter<"GovernmentReport"> | Date | string | null
    submitted_at?: DateTimeNullableWithAggregatesFilter<"GovernmentReport"> | Date | string | null
    submitted_by?: StringNullableWithAggregatesFilter<"GovernmentReport"> | string | null
    total_employees?: IntWithAggregatesFilter<"GovernmentReport"> | number
    total_amount?: FloatWithAggregatesFilter<"GovernmentReport"> | number
    reference_number?: StringNullableWithAggregatesFilter<"GovernmentReport"> | string | null
    created_at?: DateTimeWithAggregatesFilter<"GovernmentReport"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"GovernmentReport"> | Date | string
  }

  export type PayrollRunCreateInput = {
    id?: string
    period: string
    year: number
    month: number
    status?: string
    type?: string
    total_gross?: number
    total_deductions?: number
    total_net?: number
    total_employer_cost?: number
    employee_count?: number
    created_by: string
    approved_by?: string | null
    notes?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    payslips?: PayslipCreateNestedManyWithoutPayroll_runInput
  }

  export type PayrollRunUncheckedCreateInput = {
    id?: string
    period: string
    year: number
    month: number
    status?: string
    type?: string
    total_gross?: number
    total_deductions?: number
    total_net?: number
    total_employer_cost?: number
    employee_count?: number
    created_by: string
    approved_by?: string | null
    notes?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    payslips?: PayslipUncheckedCreateNestedManyWithoutPayroll_runInput
  }

  export type PayrollRunUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    period?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    month?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    total_gross?: FloatFieldUpdateOperationsInput | number
    total_deductions?: FloatFieldUpdateOperationsInput | number
    total_net?: FloatFieldUpdateOperationsInput | number
    total_employer_cost?: FloatFieldUpdateOperationsInput | number
    employee_count?: IntFieldUpdateOperationsInput | number
    created_by?: StringFieldUpdateOperationsInput | string
    approved_by?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    payslips?: PayslipUpdateManyWithoutPayroll_runNestedInput
  }

  export type PayrollRunUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    period?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    month?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    total_gross?: FloatFieldUpdateOperationsInput | number
    total_deductions?: FloatFieldUpdateOperationsInput | number
    total_net?: FloatFieldUpdateOperationsInput | number
    total_employer_cost?: FloatFieldUpdateOperationsInput | number
    employee_count?: IntFieldUpdateOperationsInput | number
    created_by?: StringFieldUpdateOperationsInput | string
    approved_by?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    payslips?: PayslipUncheckedUpdateManyWithoutPayroll_runNestedInput
  }

  export type PayrollRunCreateManyInput = {
    id?: string
    period: string
    year: number
    month: number
    status?: string
    type?: string
    total_gross?: number
    total_deductions?: number
    total_net?: number
    total_employer_cost?: number
    employee_count?: number
    created_by: string
    approved_by?: string | null
    notes?: string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type PayrollRunUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    period?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    month?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    total_gross?: FloatFieldUpdateOperationsInput | number
    total_deductions?: FloatFieldUpdateOperationsInput | number
    total_net?: FloatFieldUpdateOperationsInput | number
    total_employer_cost?: FloatFieldUpdateOperationsInput | number
    employee_count?: IntFieldUpdateOperationsInput | number
    created_by?: StringFieldUpdateOperationsInput | string
    approved_by?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PayrollRunUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    period?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    month?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    total_gross?: FloatFieldUpdateOperationsInput | number
    total_deductions?: FloatFieldUpdateOperationsInput | number
    total_net?: FloatFieldUpdateOperationsInput | number
    total_employer_cost?: FloatFieldUpdateOperationsInput | number
    employee_count?: IntFieldUpdateOperationsInput | number
    created_by?: StringFieldUpdateOperationsInput | string
    approved_by?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PayslipCreateInput = {
    id?: string
    employee_id: string
    base_salary: number
    gross_salary: string
    total_earnings: number
    total_deductions: number
    net_salary: string
    tax_amount: number
    sso_amount: number
    provident_fund_employee?: number
    provident_fund_employer?: number
    earnings_detail?: NullableJsonNullValueInput | InputJsonValue
    deductions_detail?: NullableJsonNullValueInput | InputJsonValue
    bank_code?: string | null
    bank_account?: string | null
    payment_status?: string
    created_at?: Date | string
    updated_at?: Date | string
    payroll_run: PayrollRunCreateNestedOneWithoutPayslipsInput
  }

  export type PayslipUncheckedCreateInput = {
    id?: string
    payroll_run_id: string
    employee_id: string
    base_salary: number
    gross_salary: string
    total_earnings: number
    total_deductions: number
    net_salary: string
    tax_amount: number
    sso_amount: number
    provident_fund_employee?: number
    provident_fund_employer?: number
    earnings_detail?: NullableJsonNullValueInput | InputJsonValue
    deductions_detail?: NullableJsonNullValueInput | InputJsonValue
    bank_code?: string | null
    bank_account?: string | null
    payment_status?: string
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type PayslipUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    employee_id?: StringFieldUpdateOperationsInput | string
    base_salary?: FloatFieldUpdateOperationsInput | number
    gross_salary?: StringFieldUpdateOperationsInput | string
    total_earnings?: FloatFieldUpdateOperationsInput | number
    total_deductions?: FloatFieldUpdateOperationsInput | number
    net_salary?: StringFieldUpdateOperationsInput | string
    tax_amount?: FloatFieldUpdateOperationsInput | number
    sso_amount?: FloatFieldUpdateOperationsInput | number
    provident_fund_employee?: FloatFieldUpdateOperationsInput | number
    provident_fund_employer?: FloatFieldUpdateOperationsInput | number
    earnings_detail?: NullableJsonNullValueInput | InputJsonValue
    deductions_detail?: NullableJsonNullValueInput | InputJsonValue
    bank_code?: NullableStringFieldUpdateOperationsInput | string | null
    bank_account?: NullableStringFieldUpdateOperationsInput | string | null
    payment_status?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    payroll_run?: PayrollRunUpdateOneRequiredWithoutPayslipsNestedInput
  }

  export type PayslipUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    payroll_run_id?: StringFieldUpdateOperationsInput | string
    employee_id?: StringFieldUpdateOperationsInput | string
    base_salary?: FloatFieldUpdateOperationsInput | number
    gross_salary?: StringFieldUpdateOperationsInput | string
    total_earnings?: FloatFieldUpdateOperationsInput | number
    total_deductions?: FloatFieldUpdateOperationsInput | number
    net_salary?: StringFieldUpdateOperationsInput | string
    tax_amount?: FloatFieldUpdateOperationsInput | number
    sso_amount?: FloatFieldUpdateOperationsInput | number
    provident_fund_employee?: FloatFieldUpdateOperationsInput | number
    provident_fund_employer?: FloatFieldUpdateOperationsInput | number
    earnings_detail?: NullableJsonNullValueInput | InputJsonValue
    deductions_detail?: NullableJsonNullValueInput | InputJsonValue
    bank_code?: NullableStringFieldUpdateOperationsInput | string | null
    bank_account?: NullableStringFieldUpdateOperationsInput | string | null
    payment_status?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PayslipCreateManyInput = {
    id?: string
    payroll_run_id: string
    employee_id: string
    base_salary: number
    gross_salary: string
    total_earnings: number
    total_deductions: number
    net_salary: string
    tax_amount: number
    sso_amount: number
    provident_fund_employee?: number
    provident_fund_employer?: number
    earnings_detail?: NullableJsonNullValueInput | InputJsonValue
    deductions_detail?: NullableJsonNullValueInput | InputJsonValue
    bank_code?: string | null
    bank_account?: string | null
    payment_status?: string
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type PayslipUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    employee_id?: StringFieldUpdateOperationsInput | string
    base_salary?: FloatFieldUpdateOperationsInput | number
    gross_salary?: StringFieldUpdateOperationsInput | string
    total_earnings?: FloatFieldUpdateOperationsInput | number
    total_deductions?: FloatFieldUpdateOperationsInput | number
    net_salary?: StringFieldUpdateOperationsInput | string
    tax_amount?: FloatFieldUpdateOperationsInput | number
    sso_amount?: FloatFieldUpdateOperationsInput | number
    provident_fund_employee?: FloatFieldUpdateOperationsInput | number
    provident_fund_employer?: FloatFieldUpdateOperationsInput | number
    earnings_detail?: NullableJsonNullValueInput | InputJsonValue
    deductions_detail?: NullableJsonNullValueInput | InputJsonValue
    bank_code?: NullableStringFieldUpdateOperationsInput | string | null
    bank_account?: NullableStringFieldUpdateOperationsInput | string | null
    payment_status?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PayslipUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    payroll_run_id?: StringFieldUpdateOperationsInput | string
    employee_id?: StringFieldUpdateOperationsInput | string
    base_salary?: FloatFieldUpdateOperationsInput | number
    gross_salary?: StringFieldUpdateOperationsInput | string
    total_earnings?: FloatFieldUpdateOperationsInput | number
    total_deductions?: FloatFieldUpdateOperationsInput | number
    net_salary?: StringFieldUpdateOperationsInput | string
    tax_amount?: FloatFieldUpdateOperationsInput | number
    sso_amount?: FloatFieldUpdateOperationsInput | number
    provident_fund_employee?: FloatFieldUpdateOperationsInput | number
    provident_fund_employer?: FloatFieldUpdateOperationsInput | number
    earnings_detail?: NullableJsonNullValueInput | InputJsonValue
    deductions_detail?: NullableJsonNullValueInput | InputJsonValue
    bank_code?: NullableStringFieldUpdateOperationsInput | string | null
    bank_account?: NullableStringFieldUpdateOperationsInput | string | null
    payment_status?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CompensationCreateInput = {
    id?: string
    employee_id: string
    base_salary: string
    position_allowance?: number
    housing_allowance?: number
    transportation_allowance?: number
    meal_allowance?: number
    other_allowances?: NullableJsonNullValueInput | InputJsonValue
    effective_date: Date | string
    currency?: string
    grade?: string | null
    level?: string | null
    provident_fund_rate?: number
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type CompensationUncheckedCreateInput = {
    id?: string
    employee_id: string
    base_salary: string
    position_allowance?: number
    housing_allowance?: number
    transportation_allowance?: number
    meal_allowance?: number
    other_allowances?: NullableJsonNullValueInput | InputJsonValue
    effective_date: Date | string
    currency?: string
    grade?: string | null
    level?: string | null
    provident_fund_rate?: number
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type CompensationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    employee_id?: StringFieldUpdateOperationsInput | string
    base_salary?: StringFieldUpdateOperationsInput | string
    position_allowance?: FloatFieldUpdateOperationsInput | number
    housing_allowance?: FloatFieldUpdateOperationsInput | number
    transportation_allowance?: FloatFieldUpdateOperationsInput | number
    meal_allowance?: FloatFieldUpdateOperationsInput | number
    other_allowances?: NullableJsonNullValueInput | InputJsonValue
    effective_date?: DateTimeFieldUpdateOperationsInput | Date | string
    currency?: StringFieldUpdateOperationsInput | string
    grade?: NullableStringFieldUpdateOperationsInput | string | null
    level?: NullableStringFieldUpdateOperationsInput | string | null
    provident_fund_rate?: FloatFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CompensationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    employee_id?: StringFieldUpdateOperationsInput | string
    base_salary?: StringFieldUpdateOperationsInput | string
    position_allowance?: FloatFieldUpdateOperationsInput | number
    housing_allowance?: FloatFieldUpdateOperationsInput | number
    transportation_allowance?: FloatFieldUpdateOperationsInput | number
    meal_allowance?: FloatFieldUpdateOperationsInput | number
    other_allowances?: NullableJsonNullValueInput | InputJsonValue
    effective_date?: DateTimeFieldUpdateOperationsInput | Date | string
    currency?: StringFieldUpdateOperationsInput | string
    grade?: NullableStringFieldUpdateOperationsInput | string | null
    level?: NullableStringFieldUpdateOperationsInput | string | null
    provident_fund_rate?: FloatFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CompensationCreateManyInput = {
    id?: string
    employee_id: string
    base_salary: string
    position_allowance?: number
    housing_allowance?: number
    transportation_allowance?: number
    meal_allowance?: number
    other_allowances?: NullableJsonNullValueInput | InputJsonValue
    effective_date: Date | string
    currency?: string
    grade?: string | null
    level?: string | null
    provident_fund_rate?: number
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type CompensationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    employee_id?: StringFieldUpdateOperationsInput | string
    base_salary?: StringFieldUpdateOperationsInput | string
    position_allowance?: FloatFieldUpdateOperationsInput | number
    housing_allowance?: FloatFieldUpdateOperationsInput | number
    transportation_allowance?: FloatFieldUpdateOperationsInput | number
    meal_allowance?: FloatFieldUpdateOperationsInput | number
    other_allowances?: NullableJsonNullValueInput | InputJsonValue
    effective_date?: DateTimeFieldUpdateOperationsInput | Date | string
    currency?: StringFieldUpdateOperationsInput | string
    grade?: NullableStringFieldUpdateOperationsInput | string | null
    level?: NullableStringFieldUpdateOperationsInput | string | null
    provident_fund_rate?: FloatFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CompensationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    employee_id?: StringFieldUpdateOperationsInput | string
    base_salary?: StringFieldUpdateOperationsInput | string
    position_allowance?: FloatFieldUpdateOperationsInput | number
    housing_allowance?: FloatFieldUpdateOperationsInput | number
    transportation_allowance?: FloatFieldUpdateOperationsInput | number
    meal_allowance?: FloatFieldUpdateOperationsInput | number
    other_allowances?: NullableJsonNullValueInput | InputJsonValue
    effective_date?: DateTimeFieldUpdateOperationsInput | Date | string
    currency?: StringFieldUpdateOperationsInput | string
    grade?: NullableStringFieldUpdateOperationsInput | string | null
    level?: NullableStringFieldUpdateOperationsInput | string | null
    provident_fund_rate?: FloatFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TaxDeductionCreateInput = {
    id?: string
    employee_id: string
    tax_year: number
    annual_income?: number
    personal_allowance?: number
    expense_deduction?: number
    spouse_allowance?: number
    child_allowance?: number
    parent_allowance?: number
    life_insurance?: number
    health_insurance?: number
    provident_fund_deduction?: number
    social_security_deduction?: number
    home_loan_interest?: number
    donation?: number
    other_deductions?: number
    total_deductions?: number
    taxable_income?: number
    calculated_tax?: number
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type TaxDeductionUncheckedCreateInput = {
    id?: string
    employee_id: string
    tax_year: number
    annual_income?: number
    personal_allowance?: number
    expense_deduction?: number
    spouse_allowance?: number
    child_allowance?: number
    parent_allowance?: number
    life_insurance?: number
    health_insurance?: number
    provident_fund_deduction?: number
    social_security_deduction?: number
    home_loan_interest?: number
    donation?: number
    other_deductions?: number
    total_deductions?: number
    taxable_income?: number
    calculated_tax?: number
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type TaxDeductionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    employee_id?: StringFieldUpdateOperationsInput | string
    tax_year?: IntFieldUpdateOperationsInput | number
    annual_income?: FloatFieldUpdateOperationsInput | number
    personal_allowance?: FloatFieldUpdateOperationsInput | number
    expense_deduction?: FloatFieldUpdateOperationsInput | number
    spouse_allowance?: FloatFieldUpdateOperationsInput | number
    child_allowance?: FloatFieldUpdateOperationsInput | number
    parent_allowance?: FloatFieldUpdateOperationsInput | number
    life_insurance?: FloatFieldUpdateOperationsInput | number
    health_insurance?: FloatFieldUpdateOperationsInput | number
    provident_fund_deduction?: FloatFieldUpdateOperationsInput | number
    social_security_deduction?: FloatFieldUpdateOperationsInput | number
    home_loan_interest?: FloatFieldUpdateOperationsInput | number
    donation?: FloatFieldUpdateOperationsInput | number
    other_deductions?: FloatFieldUpdateOperationsInput | number
    total_deductions?: FloatFieldUpdateOperationsInput | number
    taxable_income?: FloatFieldUpdateOperationsInput | number
    calculated_tax?: FloatFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TaxDeductionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    employee_id?: StringFieldUpdateOperationsInput | string
    tax_year?: IntFieldUpdateOperationsInput | number
    annual_income?: FloatFieldUpdateOperationsInput | number
    personal_allowance?: FloatFieldUpdateOperationsInput | number
    expense_deduction?: FloatFieldUpdateOperationsInput | number
    spouse_allowance?: FloatFieldUpdateOperationsInput | number
    child_allowance?: FloatFieldUpdateOperationsInput | number
    parent_allowance?: FloatFieldUpdateOperationsInput | number
    life_insurance?: FloatFieldUpdateOperationsInput | number
    health_insurance?: FloatFieldUpdateOperationsInput | number
    provident_fund_deduction?: FloatFieldUpdateOperationsInput | number
    social_security_deduction?: FloatFieldUpdateOperationsInput | number
    home_loan_interest?: FloatFieldUpdateOperationsInput | number
    donation?: FloatFieldUpdateOperationsInput | number
    other_deductions?: FloatFieldUpdateOperationsInput | number
    total_deductions?: FloatFieldUpdateOperationsInput | number
    taxable_income?: FloatFieldUpdateOperationsInput | number
    calculated_tax?: FloatFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TaxDeductionCreateManyInput = {
    id?: string
    employee_id: string
    tax_year: number
    annual_income?: number
    personal_allowance?: number
    expense_deduction?: number
    spouse_allowance?: number
    child_allowance?: number
    parent_allowance?: number
    life_insurance?: number
    health_insurance?: number
    provident_fund_deduction?: number
    social_security_deduction?: number
    home_loan_interest?: number
    donation?: number
    other_deductions?: number
    total_deductions?: number
    taxable_income?: number
    calculated_tax?: number
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type TaxDeductionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    employee_id?: StringFieldUpdateOperationsInput | string
    tax_year?: IntFieldUpdateOperationsInput | number
    annual_income?: FloatFieldUpdateOperationsInput | number
    personal_allowance?: FloatFieldUpdateOperationsInput | number
    expense_deduction?: FloatFieldUpdateOperationsInput | number
    spouse_allowance?: FloatFieldUpdateOperationsInput | number
    child_allowance?: FloatFieldUpdateOperationsInput | number
    parent_allowance?: FloatFieldUpdateOperationsInput | number
    life_insurance?: FloatFieldUpdateOperationsInput | number
    health_insurance?: FloatFieldUpdateOperationsInput | number
    provident_fund_deduction?: FloatFieldUpdateOperationsInput | number
    social_security_deduction?: FloatFieldUpdateOperationsInput | number
    home_loan_interest?: FloatFieldUpdateOperationsInput | number
    donation?: FloatFieldUpdateOperationsInput | number
    other_deductions?: FloatFieldUpdateOperationsInput | number
    total_deductions?: FloatFieldUpdateOperationsInput | number
    taxable_income?: FloatFieldUpdateOperationsInput | number
    calculated_tax?: FloatFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TaxDeductionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    employee_id?: StringFieldUpdateOperationsInput | string
    tax_year?: IntFieldUpdateOperationsInput | number
    annual_income?: FloatFieldUpdateOperationsInput | number
    personal_allowance?: FloatFieldUpdateOperationsInput | number
    expense_deduction?: FloatFieldUpdateOperationsInput | number
    spouse_allowance?: FloatFieldUpdateOperationsInput | number
    child_allowance?: FloatFieldUpdateOperationsInput | number
    parent_allowance?: FloatFieldUpdateOperationsInput | number
    life_insurance?: FloatFieldUpdateOperationsInput | number
    health_insurance?: FloatFieldUpdateOperationsInput | number
    provident_fund_deduction?: FloatFieldUpdateOperationsInput | number
    social_security_deduction?: FloatFieldUpdateOperationsInput | number
    home_loan_interest?: FloatFieldUpdateOperationsInput | number
    donation?: FloatFieldUpdateOperationsInput | number
    other_deductions?: FloatFieldUpdateOperationsInput | number
    total_deductions?: FloatFieldUpdateOperationsInput | number
    taxable_income?: FloatFieldUpdateOperationsInput | number
    calculated_tax?: FloatFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GovernmentReportCreateInput = {
    id?: string
    report_type: string
    period: string
    year: number
    month?: number | null
    status?: string
    file_url?: string | null
    data?: NullableJsonNullValueInput | InputJsonValue
    generated_at?: Date | string | null
    submitted_at?: Date | string | null
    submitted_by?: string | null
    total_employees?: number
    total_amount?: number
    reference_number?: string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type GovernmentReportUncheckedCreateInput = {
    id?: string
    report_type: string
    period: string
    year: number
    month?: number | null
    status?: string
    file_url?: string | null
    data?: NullableJsonNullValueInput | InputJsonValue
    generated_at?: Date | string | null
    submitted_at?: Date | string | null
    submitted_by?: string | null
    total_employees?: number
    total_amount?: number
    reference_number?: string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type GovernmentReportUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    report_type?: StringFieldUpdateOperationsInput | string
    period?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    month?: NullableIntFieldUpdateOperationsInput | number | null
    status?: StringFieldUpdateOperationsInput | string
    file_url?: NullableStringFieldUpdateOperationsInput | string | null
    data?: NullableJsonNullValueInput | InputJsonValue
    generated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    submitted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    submitted_by?: NullableStringFieldUpdateOperationsInput | string | null
    total_employees?: IntFieldUpdateOperationsInput | number
    total_amount?: FloatFieldUpdateOperationsInput | number
    reference_number?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GovernmentReportUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    report_type?: StringFieldUpdateOperationsInput | string
    period?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    month?: NullableIntFieldUpdateOperationsInput | number | null
    status?: StringFieldUpdateOperationsInput | string
    file_url?: NullableStringFieldUpdateOperationsInput | string | null
    data?: NullableJsonNullValueInput | InputJsonValue
    generated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    submitted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    submitted_by?: NullableStringFieldUpdateOperationsInput | string | null
    total_employees?: IntFieldUpdateOperationsInput | number
    total_amount?: FloatFieldUpdateOperationsInput | number
    reference_number?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GovernmentReportCreateManyInput = {
    id?: string
    report_type: string
    period: string
    year: number
    month?: number | null
    status?: string
    file_url?: string | null
    data?: NullableJsonNullValueInput | InputJsonValue
    generated_at?: Date | string | null
    submitted_at?: Date | string | null
    submitted_by?: string | null
    total_employees?: number
    total_amount?: number
    reference_number?: string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type GovernmentReportUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    report_type?: StringFieldUpdateOperationsInput | string
    period?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    month?: NullableIntFieldUpdateOperationsInput | number | null
    status?: StringFieldUpdateOperationsInput | string
    file_url?: NullableStringFieldUpdateOperationsInput | string | null
    data?: NullableJsonNullValueInput | InputJsonValue
    generated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    submitted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    submitted_by?: NullableStringFieldUpdateOperationsInput | string | null
    total_employees?: IntFieldUpdateOperationsInput | number
    total_amount?: FloatFieldUpdateOperationsInput | number
    reference_number?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GovernmentReportUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    report_type?: StringFieldUpdateOperationsInput | string
    period?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    month?: NullableIntFieldUpdateOperationsInput | number | null
    status?: StringFieldUpdateOperationsInput | string
    file_url?: NullableStringFieldUpdateOperationsInput | string | null
    data?: NullableJsonNullValueInput | InputJsonValue
    generated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    submitted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    submitted_by?: NullableStringFieldUpdateOperationsInput | string | null
    total_employees?: IntFieldUpdateOperationsInput | number
    total_amount?: FloatFieldUpdateOperationsInput | number
    reference_number?: NullableStringFieldUpdateOperationsInput | string | null
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

  export type PayslipListRelationFilter = {
    every?: PayslipWhereInput
    some?: PayslipWhereInput
    none?: PayslipWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type PayslipOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PayrollRunPeriodTypeCompoundUniqueInput = {
    period: string
    type: string
  }

  export type PayrollRunCountOrderByAggregateInput = {
    id?: SortOrder
    period?: SortOrder
    year?: SortOrder
    month?: SortOrder
    status?: SortOrder
    type?: SortOrder
    total_gross?: SortOrder
    total_deductions?: SortOrder
    total_net?: SortOrder
    total_employer_cost?: SortOrder
    employee_count?: SortOrder
    created_by?: SortOrder
    approved_by?: SortOrder
    notes?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type PayrollRunAvgOrderByAggregateInput = {
    year?: SortOrder
    month?: SortOrder
    total_gross?: SortOrder
    total_deductions?: SortOrder
    total_net?: SortOrder
    total_employer_cost?: SortOrder
    employee_count?: SortOrder
  }

  export type PayrollRunMaxOrderByAggregateInput = {
    id?: SortOrder
    period?: SortOrder
    year?: SortOrder
    month?: SortOrder
    status?: SortOrder
    type?: SortOrder
    total_gross?: SortOrder
    total_deductions?: SortOrder
    total_net?: SortOrder
    total_employer_cost?: SortOrder
    employee_count?: SortOrder
    created_by?: SortOrder
    approved_by?: SortOrder
    notes?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type PayrollRunMinOrderByAggregateInput = {
    id?: SortOrder
    period?: SortOrder
    year?: SortOrder
    month?: SortOrder
    status?: SortOrder
    type?: SortOrder
    total_gross?: SortOrder
    total_deductions?: SortOrder
    total_net?: SortOrder
    total_employer_cost?: SortOrder
    employee_count?: SortOrder
    created_by?: SortOrder
    approved_by?: SortOrder
    notes?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type PayrollRunSumOrderByAggregateInput = {
    year?: SortOrder
    month?: SortOrder
    total_gross?: SortOrder
    total_deductions?: SortOrder
    total_net?: SortOrder
    total_employer_cost?: SortOrder
    employee_count?: SortOrder
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

  export type PayrollRunScalarRelationFilter = {
    is?: PayrollRunWhereInput
    isNot?: PayrollRunWhereInput
  }

  export type PayslipPayroll_run_idEmployee_idCompoundUniqueInput = {
    payroll_run_id: string
    employee_id: string
  }

  export type PayslipCountOrderByAggregateInput = {
    id?: SortOrder
    payroll_run_id?: SortOrder
    employee_id?: SortOrder
    base_salary?: SortOrder
    gross_salary?: SortOrder
    total_earnings?: SortOrder
    total_deductions?: SortOrder
    net_salary?: SortOrder
    tax_amount?: SortOrder
    sso_amount?: SortOrder
    provident_fund_employee?: SortOrder
    provident_fund_employer?: SortOrder
    earnings_detail?: SortOrder
    deductions_detail?: SortOrder
    bank_code?: SortOrder
    bank_account?: SortOrder
    payment_status?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type PayslipAvgOrderByAggregateInput = {
    base_salary?: SortOrder
    total_earnings?: SortOrder
    total_deductions?: SortOrder
    tax_amount?: SortOrder
    sso_amount?: SortOrder
    provident_fund_employee?: SortOrder
    provident_fund_employer?: SortOrder
  }

  export type PayslipMaxOrderByAggregateInput = {
    id?: SortOrder
    payroll_run_id?: SortOrder
    employee_id?: SortOrder
    base_salary?: SortOrder
    gross_salary?: SortOrder
    total_earnings?: SortOrder
    total_deductions?: SortOrder
    net_salary?: SortOrder
    tax_amount?: SortOrder
    sso_amount?: SortOrder
    provident_fund_employee?: SortOrder
    provident_fund_employer?: SortOrder
    bank_code?: SortOrder
    bank_account?: SortOrder
    payment_status?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type PayslipMinOrderByAggregateInput = {
    id?: SortOrder
    payroll_run_id?: SortOrder
    employee_id?: SortOrder
    base_salary?: SortOrder
    gross_salary?: SortOrder
    total_earnings?: SortOrder
    total_deductions?: SortOrder
    net_salary?: SortOrder
    tax_amount?: SortOrder
    sso_amount?: SortOrder
    provident_fund_employee?: SortOrder
    provident_fund_employer?: SortOrder
    bank_code?: SortOrder
    bank_account?: SortOrder
    payment_status?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type PayslipSumOrderByAggregateInput = {
    base_salary?: SortOrder
    total_earnings?: SortOrder
    total_deductions?: SortOrder
    tax_amount?: SortOrder
    sso_amount?: SortOrder
    provident_fund_employee?: SortOrder
    provident_fund_employer?: SortOrder
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

  export type CompensationCountOrderByAggregateInput = {
    id?: SortOrder
    employee_id?: SortOrder
    base_salary?: SortOrder
    position_allowance?: SortOrder
    housing_allowance?: SortOrder
    transportation_allowance?: SortOrder
    meal_allowance?: SortOrder
    other_allowances?: SortOrder
    effective_date?: SortOrder
    currency?: SortOrder
    grade?: SortOrder
    level?: SortOrder
    provident_fund_rate?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type CompensationAvgOrderByAggregateInput = {
    position_allowance?: SortOrder
    housing_allowance?: SortOrder
    transportation_allowance?: SortOrder
    meal_allowance?: SortOrder
    provident_fund_rate?: SortOrder
  }

  export type CompensationMaxOrderByAggregateInput = {
    id?: SortOrder
    employee_id?: SortOrder
    base_salary?: SortOrder
    position_allowance?: SortOrder
    housing_allowance?: SortOrder
    transportation_allowance?: SortOrder
    meal_allowance?: SortOrder
    effective_date?: SortOrder
    currency?: SortOrder
    grade?: SortOrder
    level?: SortOrder
    provident_fund_rate?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type CompensationMinOrderByAggregateInput = {
    id?: SortOrder
    employee_id?: SortOrder
    base_salary?: SortOrder
    position_allowance?: SortOrder
    housing_allowance?: SortOrder
    transportation_allowance?: SortOrder
    meal_allowance?: SortOrder
    effective_date?: SortOrder
    currency?: SortOrder
    grade?: SortOrder
    level?: SortOrder
    provident_fund_rate?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type CompensationSumOrderByAggregateInput = {
    position_allowance?: SortOrder
    housing_allowance?: SortOrder
    transportation_allowance?: SortOrder
    meal_allowance?: SortOrder
    provident_fund_rate?: SortOrder
  }

  export type TaxDeductionEmployee_idTax_yearCompoundUniqueInput = {
    employee_id: string
    tax_year: number
  }

  export type TaxDeductionCountOrderByAggregateInput = {
    id?: SortOrder
    employee_id?: SortOrder
    tax_year?: SortOrder
    annual_income?: SortOrder
    personal_allowance?: SortOrder
    expense_deduction?: SortOrder
    spouse_allowance?: SortOrder
    child_allowance?: SortOrder
    parent_allowance?: SortOrder
    life_insurance?: SortOrder
    health_insurance?: SortOrder
    provident_fund_deduction?: SortOrder
    social_security_deduction?: SortOrder
    home_loan_interest?: SortOrder
    donation?: SortOrder
    other_deductions?: SortOrder
    total_deductions?: SortOrder
    taxable_income?: SortOrder
    calculated_tax?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type TaxDeductionAvgOrderByAggregateInput = {
    tax_year?: SortOrder
    annual_income?: SortOrder
    personal_allowance?: SortOrder
    expense_deduction?: SortOrder
    spouse_allowance?: SortOrder
    child_allowance?: SortOrder
    parent_allowance?: SortOrder
    life_insurance?: SortOrder
    health_insurance?: SortOrder
    provident_fund_deduction?: SortOrder
    social_security_deduction?: SortOrder
    home_loan_interest?: SortOrder
    donation?: SortOrder
    other_deductions?: SortOrder
    total_deductions?: SortOrder
    taxable_income?: SortOrder
    calculated_tax?: SortOrder
  }

  export type TaxDeductionMaxOrderByAggregateInput = {
    id?: SortOrder
    employee_id?: SortOrder
    tax_year?: SortOrder
    annual_income?: SortOrder
    personal_allowance?: SortOrder
    expense_deduction?: SortOrder
    spouse_allowance?: SortOrder
    child_allowance?: SortOrder
    parent_allowance?: SortOrder
    life_insurance?: SortOrder
    health_insurance?: SortOrder
    provident_fund_deduction?: SortOrder
    social_security_deduction?: SortOrder
    home_loan_interest?: SortOrder
    donation?: SortOrder
    other_deductions?: SortOrder
    total_deductions?: SortOrder
    taxable_income?: SortOrder
    calculated_tax?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type TaxDeductionMinOrderByAggregateInput = {
    id?: SortOrder
    employee_id?: SortOrder
    tax_year?: SortOrder
    annual_income?: SortOrder
    personal_allowance?: SortOrder
    expense_deduction?: SortOrder
    spouse_allowance?: SortOrder
    child_allowance?: SortOrder
    parent_allowance?: SortOrder
    life_insurance?: SortOrder
    health_insurance?: SortOrder
    provident_fund_deduction?: SortOrder
    social_security_deduction?: SortOrder
    home_loan_interest?: SortOrder
    donation?: SortOrder
    other_deductions?: SortOrder
    total_deductions?: SortOrder
    taxable_income?: SortOrder
    calculated_tax?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type TaxDeductionSumOrderByAggregateInput = {
    tax_year?: SortOrder
    annual_income?: SortOrder
    personal_allowance?: SortOrder
    expense_deduction?: SortOrder
    spouse_allowance?: SortOrder
    child_allowance?: SortOrder
    parent_allowance?: SortOrder
    life_insurance?: SortOrder
    health_insurance?: SortOrder
    provident_fund_deduction?: SortOrder
    social_security_deduction?: SortOrder
    home_loan_interest?: SortOrder
    donation?: SortOrder
    other_deductions?: SortOrder
    total_deductions?: SortOrder
    taxable_income?: SortOrder
    calculated_tax?: SortOrder
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

  export type GovernmentReportCountOrderByAggregateInput = {
    id?: SortOrder
    report_type?: SortOrder
    period?: SortOrder
    year?: SortOrder
    month?: SortOrder
    status?: SortOrder
    file_url?: SortOrder
    data?: SortOrder
    generated_at?: SortOrder
    submitted_at?: SortOrder
    submitted_by?: SortOrder
    total_employees?: SortOrder
    total_amount?: SortOrder
    reference_number?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type GovernmentReportAvgOrderByAggregateInput = {
    year?: SortOrder
    month?: SortOrder
    total_employees?: SortOrder
    total_amount?: SortOrder
  }

  export type GovernmentReportMaxOrderByAggregateInput = {
    id?: SortOrder
    report_type?: SortOrder
    period?: SortOrder
    year?: SortOrder
    month?: SortOrder
    status?: SortOrder
    file_url?: SortOrder
    generated_at?: SortOrder
    submitted_at?: SortOrder
    submitted_by?: SortOrder
    total_employees?: SortOrder
    total_amount?: SortOrder
    reference_number?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type GovernmentReportMinOrderByAggregateInput = {
    id?: SortOrder
    report_type?: SortOrder
    period?: SortOrder
    year?: SortOrder
    month?: SortOrder
    status?: SortOrder
    file_url?: SortOrder
    generated_at?: SortOrder
    submitted_at?: SortOrder
    submitted_by?: SortOrder
    total_employees?: SortOrder
    total_amount?: SortOrder
    reference_number?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type GovernmentReportSumOrderByAggregateInput = {
    year?: SortOrder
    month?: SortOrder
    total_employees?: SortOrder
    total_amount?: SortOrder
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

  export type PayslipCreateNestedManyWithoutPayroll_runInput = {
    create?: XOR<PayslipCreateWithoutPayroll_runInput, PayslipUncheckedCreateWithoutPayroll_runInput> | PayslipCreateWithoutPayroll_runInput[] | PayslipUncheckedCreateWithoutPayroll_runInput[]
    connectOrCreate?: PayslipCreateOrConnectWithoutPayroll_runInput | PayslipCreateOrConnectWithoutPayroll_runInput[]
    createMany?: PayslipCreateManyPayroll_runInputEnvelope
    connect?: PayslipWhereUniqueInput | PayslipWhereUniqueInput[]
  }

  export type PayslipUncheckedCreateNestedManyWithoutPayroll_runInput = {
    create?: XOR<PayslipCreateWithoutPayroll_runInput, PayslipUncheckedCreateWithoutPayroll_runInput> | PayslipCreateWithoutPayroll_runInput[] | PayslipUncheckedCreateWithoutPayroll_runInput[]
    connectOrCreate?: PayslipCreateOrConnectWithoutPayroll_runInput | PayslipCreateOrConnectWithoutPayroll_runInput[]
    createMany?: PayslipCreateManyPayroll_runInputEnvelope
    connect?: PayslipWhereUniqueInput | PayslipWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type PayslipUpdateManyWithoutPayroll_runNestedInput = {
    create?: XOR<PayslipCreateWithoutPayroll_runInput, PayslipUncheckedCreateWithoutPayroll_runInput> | PayslipCreateWithoutPayroll_runInput[] | PayslipUncheckedCreateWithoutPayroll_runInput[]
    connectOrCreate?: PayslipCreateOrConnectWithoutPayroll_runInput | PayslipCreateOrConnectWithoutPayroll_runInput[]
    upsert?: PayslipUpsertWithWhereUniqueWithoutPayroll_runInput | PayslipUpsertWithWhereUniqueWithoutPayroll_runInput[]
    createMany?: PayslipCreateManyPayroll_runInputEnvelope
    set?: PayslipWhereUniqueInput | PayslipWhereUniqueInput[]
    disconnect?: PayslipWhereUniqueInput | PayslipWhereUniqueInput[]
    delete?: PayslipWhereUniqueInput | PayslipWhereUniqueInput[]
    connect?: PayslipWhereUniqueInput | PayslipWhereUniqueInput[]
    update?: PayslipUpdateWithWhereUniqueWithoutPayroll_runInput | PayslipUpdateWithWhereUniqueWithoutPayroll_runInput[]
    updateMany?: PayslipUpdateManyWithWhereWithoutPayroll_runInput | PayslipUpdateManyWithWhereWithoutPayroll_runInput[]
    deleteMany?: PayslipScalarWhereInput | PayslipScalarWhereInput[]
  }

  export type PayslipUncheckedUpdateManyWithoutPayroll_runNestedInput = {
    create?: XOR<PayslipCreateWithoutPayroll_runInput, PayslipUncheckedCreateWithoutPayroll_runInput> | PayslipCreateWithoutPayroll_runInput[] | PayslipUncheckedCreateWithoutPayroll_runInput[]
    connectOrCreate?: PayslipCreateOrConnectWithoutPayroll_runInput | PayslipCreateOrConnectWithoutPayroll_runInput[]
    upsert?: PayslipUpsertWithWhereUniqueWithoutPayroll_runInput | PayslipUpsertWithWhereUniqueWithoutPayroll_runInput[]
    createMany?: PayslipCreateManyPayroll_runInputEnvelope
    set?: PayslipWhereUniqueInput | PayslipWhereUniqueInput[]
    disconnect?: PayslipWhereUniqueInput | PayslipWhereUniqueInput[]
    delete?: PayslipWhereUniqueInput | PayslipWhereUniqueInput[]
    connect?: PayslipWhereUniqueInput | PayslipWhereUniqueInput[]
    update?: PayslipUpdateWithWhereUniqueWithoutPayroll_runInput | PayslipUpdateWithWhereUniqueWithoutPayroll_runInput[]
    updateMany?: PayslipUpdateManyWithWhereWithoutPayroll_runInput | PayslipUpdateManyWithWhereWithoutPayroll_runInput[]
    deleteMany?: PayslipScalarWhereInput | PayslipScalarWhereInput[]
  }

  export type PayrollRunCreateNestedOneWithoutPayslipsInput = {
    create?: XOR<PayrollRunCreateWithoutPayslipsInput, PayrollRunUncheckedCreateWithoutPayslipsInput>
    connectOrCreate?: PayrollRunCreateOrConnectWithoutPayslipsInput
    connect?: PayrollRunWhereUniqueInput
  }

  export type PayrollRunUpdateOneRequiredWithoutPayslipsNestedInput = {
    create?: XOR<PayrollRunCreateWithoutPayslipsInput, PayrollRunUncheckedCreateWithoutPayslipsInput>
    connectOrCreate?: PayrollRunCreateOrConnectWithoutPayslipsInput
    upsert?: PayrollRunUpsertWithoutPayslipsInput
    connect?: PayrollRunWhereUniqueInput
    update?: XOR<XOR<PayrollRunUpdateToOneWithWhereWithoutPayslipsInput, PayrollRunUpdateWithoutPayslipsInput>, PayrollRunUncheckedUpdateWithoutPayslipsInput>
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
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

  export type PayslipCreateWithoutPayroll_runInput = {
    id?: string
    employee_id: string
    base_salary: number
    gross_salary: string
    total_earnings: number
    total_deductions: number
    net_salary: string
    tax_amount: number
    sso_amount: number
    provident_fund_employee?: number
    provident_fund_employer?: number
    earnings_detail?: NullableJsonNullValueInput | InputJsonValue
    deductions_detail?: NullableJsonNullValueInput | InputJsonValue
    bank_code?: string | null
    bank_account?: string | null
    payment_status?: string
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type PayslipUncheckedCreateWithoutPayroll_runInput = {
    id?: string
    employee_id: string
    base_salary: number
    gross_salary: string
    total_earnings: number
    total_deductions: number
    net_salary: string
    tax_amount: number
    sso_amount: number
    provident_fund_employee?: number
    provident_fund_employer?: number
    earnings_detail?: NullableJsonNullValueInput | InputJsonValue
    deductions_detail?: NullableJsonNullValueInput | InputJsonValue
    bank_code?: string | null
    bank_account?: string | null
    payment_status?: string
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type PayslipCreateOrConnectWithoutPayroll_runInput = {
    where: PayslipWhereUniqueInput
    create: XOR<PayslipCreateWithoutPayroll_runInput, PayslipUncheckedCreateWithoutPayroll_runInput>
  }

  export type PayslipCreateManyPayroll_runInputEnvelope = {
    data: PayslipCreateManyPayroll_runInput | PayslipCreateManyPayroll_runInput[]
    skipDuplicates?: boolean
  }

  export type PayslipUpsertWithWhereUniqueWithoutPayroll_runInput = {
    where: PayslipWhereUniqueInput
    update: XOR<PayslipUpdateWithoutPayroll_runInput, PayslipUncheckedUpdateWithoutPayroll_runInput>
    create: XOR<PayslipCreateWithoutPayroll_runInput, PayslipUncheckedCreateWithoutPayroll_runInput>
  }

  export type PayslipUpdateWithWhereUniqueWithoutPayroll_runInput = {
    where: PayslipWhereUniqueInput
    data: XOR<PayslipUpdateWithoutPayroll_runInput, PayslipUncheckedUpdateWithoutPayroll_runInput>
  }

  export type PayslipUpdateManyWithWhereWithoutPayroll_runInput = {
    where: PayslipScalarWhereInput
    data: XOR<PayslipUpdateManyMutationInput, PayslipUncheckedUpdateManyWithoutPayroll_runInput>
  }

  export type PayslipScalarWhereInput = {
    AND?: PayslipScalarWhereInput | PayslipScalarWhereInput[]
    OR?: PayslipScalarWhereInput[]
    NOT?: PayslipScalarWhereInput | PayslipScalarWhereInput[]
    id?: StringFilter<"Payslip"> | string
    payroll_run_id?: StringFilter<"Payslip"> | string
    employee_id?: StringFilter<"Payslip"> | string
    base_salary?: FloatFilter<"Payslip"> | number
    gross_salary?: StringFilter<"Payslip"> | string
    total_earnings?: FloatFilter<"Payslip"> | number
    total_deductions?: FloatFilter<"Payslip"> | number
    net_salary?: StringFilter<"Payslip"> | string
    tax_amount?: FloatFilter<"Payslip"> | number
    sso_amount?: FloatFilter<"Payslip"> | number
    provident_fund_employee?: FloatFilter<"Payslip"> | number
    provident_fund_employer?: FloatFilter<"Payslip"> | number
    earnings_detail?: JsonNullableFilter<"Payslip">
    deductions_detail?: JsonNullableFilter<"Payslip">
    bank_code?: StringNullableFilter<"Payslip"> | string | null
    bank_account?: StringNullableFilter<"Payslip"> | string | null
    payment_status?: StringFilter<"Payslip"> | string
    created_at?: DateTimeFilter<"Payslip"> | Date | string
    updated_at?: DateTimeFilter<"Payslip"> | Date | string
  }

  export type PayrollRunCreateWithoutPayslipsInput = {
    id?: string
    period: string
    year: number
    month: number
    status?: string
    type?: string
    total_gross?: number
    total_deductions?: number
    total_net?: number
    total_employer_cost?: number
    employee_count?: number
    created_by: string
    approved_by?: string | null
    notes?: string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type PayrollRunUncheckedCreateWithoutPayslipsInput = {
    id?: string
    period: string
    year: number
    month: number
    status?: string
    type?: string
    total_gross?: number
    total_deductions?: number
    total_net?: number
    total_employer_cost?: number
    employee_count?: number
    created_by: string
    approved_by?: string | null
    notes?: string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type PayrollRunCreateOrConnectWithoutPayslipsInput = {
    where: PayrollRunWhereUniqueInput
    create: XOR<PayrollRunCreateWithoutPayslipsInput, PayrollRunUncheckedCreateWithoutPayslipsInput>
  }

  export type PayrollRunUpsertWithoutPayslipsInput = {
    update: XOR<PayrollRunUpdateWithoutPayslipsInput, PayrollRunUncheckedUpdateWithoutPayslipsInput>
    create: XOR<PayrollRunCreateWithoutPayslipsInput, PayrollRunUncheckedCreateWithoutPayslipsInput>
    where?: PayrollRunWhereInput
  }

  export type PayrollRunUpdateToOneWithWhereWithoutPayslipsInput = {
    where?: PayrollRunWhereInput
    data: XOR<PayrollRunUpdateWithoutPayslipsInput, PayrollRunUncheckedUpdateWithoutPayslipsInput>
  }

  export type PayrollRunUpdateWithoutPayslipsInput = {
    id?: StringFieldUpdateOperationsInput | string
    period?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    month?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    total_gross?: FloatFieldUpdateOperationsInput | number
    total_deductions?: FloatFieldUpdateOperationsInput | number
    total_net?: FloatFieldUpdateOperationsInput | number
    total_employer_cost?: FloatFieldUpdateOperationsInput | number
    employee_count?: IntFieldUpdateOperationsInput | number
    created_by?: StringFieldUpdateOperationsInput | string
    approved_by?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PayrollRunUncheckedUpdateWithoutPayslipsInput = {
    id?: StringFieldUpdateOperationsInput | string
    period?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    month?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    total_gross?: FloatFieldUpdateOperationsInput | number
    total_deductions?: FloatFieldUpdateOperationsInput | number
    total_net?: FloatFieldUpdateOperationsInput | number
    total_employer_cost?: FloatFieldUpdateOperationsInput | number
    employee_count?: IntFieldUpdateOperationsInput | number
    created_by?: StringFieldUpdateOperationsInput | string
    approved_by?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PayslipCreateManyPayroll_runInput = {
    id?: string
    employee_id: string
    base_salary: number
    gross_salary: string
    total_earnings: number
    total_deductions: number
    net_salary: string
    tax_amount: number
    sso_amount: number
    provident_fund_employee?: number
    provident_fund_employer?: number
    earnings_detail?: NullableJsonNullValueInput | InputJsonValue
    deductions_detail?: NullableJsonNullValueInput | InputJsonValue
    bank_code?: string | null
    bank_account?: string | null
    payment_status?: string
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type PayslipUpdateWithoutPayroll_runInput = {
    id?: StringFieldUpdateOperationsInput | string
    employee_id?: StringFieldUpdateOperationsInput | string
    base_salary?: FloatFieldUpdateOperationsInput | number
    gross_salary?: StringFieldUpdateOperationsInput | string
    total_earnings?: FloatFieldUpdateOperationsInput | number
    total_deductions?: FloatFieldUpdateOperationsInput | number
    net_salary?: StringFieldUpdateOperationsInput | string
    tax_amount?: FloatFieldUpdateOperationsInput | number
    sso_amount?: FloatFieldUpdateOperationsInput | number
    provident_fund_employee?: FloatFieldUpdateOperationsInput | number
    provident_fund_employer?: FloatFieldUpdateOperationsInput | number
    earnings_detail?: NullableJsonNullValueInput | InputJsonValue
    deductions_detail?: NullableJsonNullValueInput | InputJsonValue
    bank_code?: NullableStringFieldUpdateOperationsInput | string | null
    bank_account?: NullableStringFieldUpdateOperationsInput | string | null
    payment_status?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PayslipUncheckedUpdateWithoutPayroll_runInput = {
    id?: StringFieldUpdateOperationsInput | string
    employee_id?: StringFieldUpdateOperationsInput | string
    base_salary?: FloatFieldUpdateOperationsInput | number
    gross_salary?: StringFieldUpdateOperationsInput | string
    total_earnings?: FloatFieldUpdateOperationsInput | number
    total_deductions?: FloatFieldUpdateOperationsInput | number
    net_salary?: StringFieldUpdateOperationsInput | string
    tax_amount?: FloatFieldUpdateOperationsInput | number
    sso_amount?: FloatFieldUpdateOperationsInput | number
    provident_fund_employee?: FloatFieldUpdateOperationsInput | number
    provident_fund_employer?: FloatFieldUpdateOperationsInput | number
    earnings_detail?: NullableJsonNullValueInput | InputJsonValue
    deductions_detail?: NullableJsonNullValueInput | InputJsonValue
    bank_code?: NullableStringFieldUpdateOperationsInput | string | null
    bank_account?: NullableStringFieldUpdateOperationsInput | string | null
    payment_status?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PayslipUncheckedUpdateManyWithoutPayroll_runInput = {
    id?: StringFieldUpdateOperationsInput | string
    employee_id?: StringFieldUpdateOperationsInput | string
    base_salary?: FloatFieldUpdateOperationsInput | number
    gross_salary?: StringFieldUpdateOperationsInput | string
    total_earnings?: FloatFieldUpdateOperationsInput | number
    total_deductions?: FloatFieldUpdateOperationsInput | number
    net_salary?: StringFieldUpdateOperationsInput | string
    tax_amount?: FloatFieldUpdateOperationsInput | number
    sso_amount?: FloatFieldUpdateOperationsInput | number
    provident_fund_employee?: FloatFieldUpdateOperationsInput | number
    provident_fund_employer?: FloatFieldUpdateOperationsInput | number
    earnings_detail?: NullableJsonNullValueInput | InputJsonValue
    deductions_detail?: NullableJsonNullValueInput | InputJsonValue
    bank_code?: NullableStringFieldUpdateOperationsInput | string | null
    bank_account?: NullableStringFieldUpdateOperationsInput | string | null
    payment_status?: StringFieldUpdateOperationsInput | string
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