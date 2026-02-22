
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
 * Model Shift
 * 
 */
export type Shift = $Result.DefaultSelection<Prisma.$ShiftPayload>
/**
 * Model AttendanceRecord
 * 
 */
export type AttendanceRecord = $Result.DefaultSelection<Prisma.$AttendanceRecordPayload>
/**
 * Model OvertimeRequest
 * 
 */
export type OvertimeRequest = $Result.DefaultSelection<Prisma.$OvertimeRequestPayload>
/**
 * Model Location
 * 
 */
export type Location = $Result.DefaultSelection<Prisma.$LocationPayload>
/**
 * Model EmployeeLocation
 * 
 */
export type EmployeeLocation = $Result.DefaultSelection<Prisma.$EmployeeLocationPayload>
/**
 * Model AttendanceConfig
 * 
 */
export type AttendanceConfig = $Result.DefaultSelection<Prisma.$AttendanceConfigPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Shifts
 * const shifts = await prisma.shift.findMany()
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
   * // Fetch zero or more Shifts
   * const shifts = await prisma.shift.findMany()
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
   * `prisma.shift`: Exposes CRUD operations for the **Shift** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Shifts
    * const shifts = await prisma.shift.findMany()
    * ```
    */
  get shift(): Prisma.ShiftDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.attendanceRecord`: Exposes CRUD operations for the **AttendanceRecord** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AttendanceRecords
    * const attendanceRecords = await prisma.attendanceRecord.findMany()
    * ```
    */
  get attendanceRecord(): Prisma.AttendanceRecordDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.overtimeRequest`: Exposes CRUD operations for the **OvertimeRequest** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more OvertimeRequests
    * const overtimeRequests = await prisma.overtimeRequest.findMany()
    * ```
    */
  get overtimeRequest(): Prisma.OvertimeRequestDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.location`: Exposes CRUD operations for the **Location** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Locations
    * const locations = await prisma.location.findMany()
    * ```
    */
  get location(): Prisma.LocationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.employeeLocation`: Exposes CRUD operations for the **EmployeeLocation** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more EmployeeLocations
    * const employeeLocations = await prisma.employeeLocation.findMany()
    * ```
    */
  get employeeLocation(): Prisma.EmployeeLocationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.attendanceConfig`: Exposes CRUD operations for the **AttendanceConfig** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AttendanceConfigs
    * const attendanceConfigs = await prisma.attendanceConfig.findMany()
    * ```
    */
  get attendanceConfig(): Prisma.AttendanceConfigDelegate<ExtArgs, ClientOptions>;
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
    Shift: 'Shift',
    AttendanceRecord: 'AttendanceRecord',
    OvertimeRequest: 'OvertimeRequest',
    Location: 'Location',
    EmployeeLocation: 'EmployeeLocation',
    AttendanceConfig: 'AttendanceConfig'
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
      modelProps: "shift" | "attendanceRecord" | "overtimeRequest" | "location" | "employeeLocation" | "attendanceConfig"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Shift: {
        payload: Prisma.$ShiftPayload<ExtArgs>
        fields: Prisma.ShiftFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ShiftFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShiftPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ShiftFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShiftPayload>
          }
          findFirst: {
            args: Prisma.ShiftFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShiftPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ShiftFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShiftPayload>
          }
          findMany: {
            args: Prisma.ShiftFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShiftPayload>[]
          }
          create: {
            args: Prisma.ShiftCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShiftPayload>
          }
          createMany: {
            args: Prisma.ShiftCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ShiftCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShiftPayload>[]
          }
          delete: {
            args: Prisma.ShiftDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShiftPayload>
          }
          update: {
            args: Prisma.ShiftUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShiftPayload>
          }
          deleteMany: {
            args: Prisma.ShiftDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ShiftUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ShiftUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShiftPayload>[]
          }
          upsert: {
            args: Prisma.ShiftUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShiftPayload>
          }
          aggregate: {
            args: Prisma.ShiftAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateShift>
          }
          groupBy: {
            args: Prisma.ShiftGroupByArgs<ExtArgs>
            result: $Utils.Optional<ShiftGroupByOutputType>[]
          }
          count: {
            args: Prisma.ShiftCountArgs<ExtArgs>
            result: $Utils.Optional<ShiftCountAggregateOutputType> | number
          }
        }
      }
      AttendanceRecord: {
        payload: Prisma.$AttendanceRecordPayload<ExtArgs>
        fields: Prisma.AttendanceRecordFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AttendanceRecordFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttendanceRecordPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AttendanceRecordFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttendanceRecordPayload>
          }
          findFirst: {
            args: Prisma.AttendanceRecordFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttendanceRecordPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AttendanceRecordFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttendanceRecordPayload>
          }
          findMany: {
            args: Prisma.AttendanceRecordFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttendanceRecordPayload>[]
          }
          create: {
            args: Prisma.AttendanceRecordCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttendanceRecordPayload>
          }
          createMany: {
            args: Prisma.AttendanceRecordCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AttendanceRecordCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttendanceRecordPayload>[]
          }
          delete: {
            args: Prisma.AttendanceRecordDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttendanceRecordPayload>
          }
          update: {
            args: Prisma.AttendanceRecordUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttendanceRecordPayload>
          }
          deleteMany: {
            args: Prisma.AttendanceRecordDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AttendanceRecordUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AttendanceRecordUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttendanceRecordPayload>[]
          }
          upsert: {
            args: Prisma.AttendanceRecordUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttendanceRecordPayload>
          }
          aggregate: {
            args: Prisma.AttendanceRecordAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAttendanceRecord>
          }
          groupBy: {
            args: Prisma.AttendanceRecordGroupByArgs<ExtArgs>
            result: $Utils.Optional<AttendanceRecordGroupByOutputType>[]
          }
          count: {
            args: Prisma.AttendanceRecordCountArgs<ExtArgs>
            result: $Utils.Optional<AttendanceRecordCountAggregateOutputType> | number
          }
        }
      }
      OvertimeRequest: {
        payload: Prisma.$OvertimeRequestPayload<ExtArgs>
        fields: Prisma.OvertimeRequestFieldRefs
        operations: {
          findUnique: {
            args: Prisma.OvertimeRequestFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OvertimeRequestPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.OvertimeRequestFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OvertimeRequestPayload>
          }
          findFirst: {
            args: Prisma.OvertimeRequestFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OvertimeRequestPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.OvertimeRequestFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OvertimeRequestPayload>
          }
          findMany: {
            args: Prisma.OvertimeRequestFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OvertimeRequestPayload>[]
          }
          create: {
            args: Prisma.OvertimeRequestCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OvertimeRequestPayload>
          }
          createMany: {
            args: Prisma.OvertimeRequestCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.OvertimeRequestCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OvertimeRequestPayload>[]
          }
          delete: {
            args: Prisma.OvertimeRequestDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OvertimeRequestPayload>
          }
          update: {
            args: Prisma.OvertimeRequestUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OvertimeRequestPayload>
          }
          deleteMany: {
            args: Prisma.OvertimeRequestDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.OvertimeRequestUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.OvertimeRequestUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OvertimeRequestPayload>[]
          }
          upsert: {
            args: Prisma.OvertimeRequestUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OvertimeRequestPayload>
          }
          aggregate: {
            args: Prisma.OvertimeRequestAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateOvertimeRequest>
          }
          groupBy: {
            args: Prisma.OvertimeRequestGroupByArgs<ExtArgs>
            result: $Utils.Optional<OvertimeRequestGroupByOutputType>[]
          }
          count: {
            args: Prisma.OvertimeRequestCountArgs<ExtArgs>
            result: $Utils.Optional<OvertimeRequestCountAggregateOutputType> | number
          }
        }
      }
      Location: {
        payload: Prisma.$LocationPayload<ExtArgs>
        fields: Prisma.LocationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.LocationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.LocationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocationPayload>
          }
          findFirst: {
            args: Prisma.LocationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.LocationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocationPayload>
          }
          findMany: {
            args: Prisma.LocationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocationPayload>[]
          }
          create: {
            args: Prisma.LocationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocationPayload>
          }
          createMany: {
            args: Prisma.LocationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.LocationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocationPayload>[]
          }
          delete: {
            args: Prisma.LocationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocationPayload>
          }
          update: {
            args: Prisma.LocationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocationPayload>
          }
          deleteMany: {
            args: Prisma.LocationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.LocationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.LocationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocationPayload>[]
          }
          upsert: {
            args: Prisma.LocationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocationPayload>
          }
          aggregate: {
            args: Prisma.LocationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateLocation>
          }
          groupBy: {
            args: Prisma.LocationGroupByArgs<ExtArgs>
            result: $Utils.Optional<LocationGroupByOutputType>[]
          }
          count: {
            args: Prisma.LocationCountArgs<ExtArgs>
            result: $Utils.Optional<LocationCountAggregateOutputType> | number
          }
        }
      }
      EmployeeLocation: {
        payload: Prisma.$EmployeeLocationPayload<ExtArgs>
        fields: Prisma.EmployeeLocationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.EmployeeLocationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeeLocationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.EmployeeLocationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeeLocationPayload>
          }
          findFirst: {
            args: Prisma.EmployeeLocationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeeLocationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.EmployeeLocationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeeLocationPayload>
          }
          findMany: {
            args: Prisma.EmployeeLocationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeeLocationPayload>[]
          }
          create: {
            args: Prisma.EmployeeLocationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeeLocationPayload>
          }
          createMany: {
            args: Prisma.EmployeeLocationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.EmployeeLocationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeeLocationPayload>[]
          }
          delete: {
            args: Prisma.EmployeeLocationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeeLocationPayload>
          }
          update: {
            args: Prisma.EmployeeLocationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeeLocationPayload>
          }
          deleteMany: {
            args: Prisma.EmployeeLocationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.EmployeeLocationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.EmployeeLocationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeeLocationPayload>[]
          }
          upsert: {
            args: Prisma.EmployeeLocationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeeLocationPayload>
          }
          aggregate: {
            args: Prisma.EmployeeLocationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateEmployeeLocation>
          }
          groupBy: {
            args: Prisma.EmployeeLocationGroupByArgs<ExtArgs>
            result: $Utils.Optional<EmployeeLocationGroupByOutputType>[]
          }
          count: {
            args: Prisma.EmployeeLocationCountArgs<ExtArgs>
            result: $Utils.Optional<EmployeeLocationCountAggregateOutputType> | number
          }
        }
      }
      AttendanceConfig: {
        payload: Prisma.$AttendanceConfigPayload<ExtArgs>
        fields: Prisma.AttendanceConfigFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AttendanceConfigFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttendanceConfigPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AttendanceConfigFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttendanceConfigPayload>
          }
          findFirst: {
            args: Prisma.AttendanceConfigFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttendanceConfigPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AttendanceConfigFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttendanceConfigPayload>
          }
          findMany: {
            args: Prisma.AttendanceConfigFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttendanceConfigPayload>[]
          }
          create: {
            args: Prisma.AttendanceConfigCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttendanceConfigPayload>
          }
          createMany: {
            args: Prisma.AttendanceConfigCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AttendanceConfigCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttendanceConfigPayload>[]
          }
          delete: {
            args: Prisma.AttendanceConfigDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttendanceConfigPayload>
          }
          update: {
            args: Prisma.AttendanceConfigUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttendanceConfigPayload>
          }
          deleteMany: {
            args: Prisma.AttendanceConfigDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AttendanceConfigUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AttendanceConfigUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttendanceConfigPayload>[]
          }
          upsert: {
            args: Prisma.AttendanceConfigUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttendanceConfigPayload>
          }
          aggregate: {
            args: Prisma.AttendanceConfigAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAttendanceConfig>
          }
          groupBy: {
            args: Prisma.AttendanceConfigGroupByArgs<ExtArgs>
            result: $Utils.Optional<AttendanceConfigGroupByOutputType>[]
          }
          count: {
            args: Prisma.AttendanceConfigCountArgs<ExtArgs>
            result: $Utils.Optional<AttendanceConfigCountAggregateOutputType> | number
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
    shift?: ShiftOmit
    attendanceRecord?: AttendanceRecordOmit
    overtimeRequest?: OvertimeRequestOmit
    location?: LocationOmit
    employeeLocation?: EmployeeLocationOmit
    attendanceConfig?: AttendanceConfigOmit
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
   * Count Type ShiftCountOutputType
   */

  export type ShiftCountOutputType = {
    attendance_records: number
  }

  export type ShiftCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    attendance_records?: boolean | ShiftCountOutputTypeCountAttendance_recordsArgs
  }

  // Custom InputTypes
  /**
   * ShiftCountOutputType without action
   */
  export type ShiftCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ShiftCountOutputType
     */
    select?: ShiftCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ShiftCountOutputType without action
   */
  export type ShiftCountOutputTypeCountAttendance_recordsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AttendanceRecordWhereInput
  }


  /**
   * Count Type LocationCountOutputType
   */

  export type LocationCountOutputType = {
    children: number
    employee_locations: number
  }

  export type LocationCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    children?: boolean | LocationCountOutputTypeCountChildrenArgs
    employee_locations?: boolean | LocationCountOutputTypeCountEmployee_locationsArgs
  }

  // Custom InputTypes
  /**
   * LocationCountOutputType without action
   */
  export type LocationCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LocationCountOutputType
     */
    select?: LocationCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * LocationCountOutputType without action
   */
  export type LocationCountOutputTypeCountChildrenArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LocationWhereInput
  }

  /**
   * LocationCountOutputType without action
   */
  export type LocationCountOutputTypeCountEmployee_locationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EmployeeLocationWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Shift
   */

  export type AggregateShift = {
    _count: ShiftCountAggregateOutputType | null
    _avg: ShiftAvgAggregateOutputType | null
    _sum: ShiftSumAggregateOutputType | null
    _min: ShiftMinAggregateOutputType | null
    _max: ShiftMaxAggregateOutputType | null
  }

  export type ShiftAvgAggregateOutputType = {
    break_minutes: number | null
    work_hours: number | null
  }

  export type ShiftSumAggregateOutputType = {
    break_minutes: number | null
    work_hours: number | null
  }

  export type ShiftMinAggregateOutputType = {
    id: string | null
    code: string | null
    name_en: string | null
    name_th: string | null
    start_time: string | null
    end_time: string | null
    is_flexible: boolean | null
    break_minutes: number | null
    work_hours: number | null
    is_active: boolean | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type ShiftMaxAggregateOutputType = {
    id: string | null
    code: string | null
    name_en: string | null
    name_th: string | null
    start_time: string | null
    end_time: string | null
    is_flexible: boolean | null
    break_minutes: number | null
    work_hours: number | null
    is_active: boolean | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type ShiftCountAggregateOutputType = {
    id: number
    code: number
    name_en: number
    name_th: number
    start_time: number
    end_time: number
    is_flexible: number
    break_minutes: number
    work_hours: number
    is_active: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type ShiftAvgAggregateInputType = {
    break_minutes?: true
    work_hours?: true
  }

  export type ShiftSumAggregateInputType = {
    break_minutes?: true
    work_hours?: true
  }

  export type ShiftMinAggregateInputType = {
    id?: true
    code?: true
    name_en?: true
    name_th?: true
    start_time?: true
    end_time?: true
    is_flexible?: true
    break_minutes?: true
    work_hours?: true
    is_active?: true
    created_at?: true
    updated_at?: true
  }

  export type ShiftMaxAggregateInputType = {
    id?: true
    code?: true
    name_en?: true
    name_th?: true
    start_time?: true
    end_time?: true
    is_flexible?: true
    break_minutes?: true
    work_hours?: true
    is_active?: true
    created_at?: true
    updated_at?: true
  }

  export type ShiftCountAggregateInputType = {
    id?: true
    code?: true
    name_en?: true
    name_th?: true
    start_time?: true
    end_time?: true
    is_flexible?: true
    break_minutes?: true
    work_hours?: true
    is_active?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type ShiftAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Shift to aggregate.
     */
    where?: ShiftWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Shifts to fetch.
     */
    orderBy?: ShiftOrderByWithRelationInput | ShiftOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ShiftWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Shifts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Shifts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Shifts
    **/
    _count?: true | ShiftCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ShiftAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ShiftSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ShiftMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ShiftMaxAggregateInputType
  }

  export type GetShiftAggregateType<T extends ShiftAggregateArgs> = {
        [P in keyof T & keyof AggregateShift]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateShift[P]>
      : GetScalarType<T[P], AggregateShift[P]>
  }




  export type ShiftGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ShiftWhereInput
    orderBy?: ShiftOrderByWithAggregationInput | ShiftOrderByWithAggregationInput[]
    by: ShiftScalarFieldEnum[] | ShiftScalarFieldEnum
    having?: ShiftScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ShiftCountAggregateInputType | true
    _avg?: ShiftAvgAggregateInputType
    _sum?: ShiftSumAggregateInputType
    _min?: ShiftMinAggregateInputType
    _max?: ShiftMaxAggregateInputType
  }

  export type ShiftGroupByOutputType = {
    id: string
    code: string
    name_en: string
    name_th: string | null
    start_time: string
    end_time: string
    is_flexible: boolean
    break_minutes: number
    work_hours: number
    is_active: boolean
    created_at: Date
    updated_at: Date
    _count: ShiftCountAggregateOutputType | null
    _avg: ShiftAvgAggregateOutputType | null
    _sum: ShiftSumAggregateOutputType | null
    _min: ShiftMinAggregateOutputType | null
    _max: ShiftMaxAggregateOutputType | null
  }

  type GetShiftGroupByPayload<T extends ShiftGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ShiftGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ShiftGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ShiftGroupByOutputType[P]>
            : GetScalarType<T[P], ShiftGroupByOutputType[P]>
        }
      >
    >


  export type ShiftSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    code?: boolean
    name_en?: boolean
    name_th?: boolean
    start_time?: boolean
    end_time?: boolean
    is_flexible?: boolean
    break_minutes?: boolean
    work_hours?: boolean
    is_active?: boolean
    created_at?: boolean
    updated_at?: boolean
    attendance_records?: boolean | Shift$attendance_recordsArgs<ExtArgs>
    _count?: boolean | ShiftCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["shift"]>

  export type ShiftSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    code?: boolean
    name_en?: boolean
    name_th?: boolean
    start_time?: boolean
    end_time?: boolean
    is_flexible?: boolean
    break_minutes?: boolean
    work_hours?: boolean
    is_active?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["shift"]>

  export type ShiftSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    code?: boolean
    name_en?: boolean
    name_th?: boolean
    start_time?: boolean
    end_time?: boolean
    is_flexible?: boolean
    break_minutes?: boolean
    work_hours?: boolean
    is_active?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["shift"]>

  export type ShiftSelectScalar = {
    id?: boolean
    code?: boolean
    name_en?: boolean
    name_th?: boolean
    start_time?: boolean
    end_time?: boolean
    is_flexible?: boolean
    break_minutes?: boolean
    work_hours?: boolean
    is_active?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type ShiftOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "code" | "name_en" | "name_th" | "start_time" | "end_time" | "is_flexible" | "break_minutes" | "work_hours" | "is_active" | "created_at" | "updated_at", ExtArgs["result"]["shift"]>
  export type ShiftInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    attendance_records?: boolean | Shift$attendance_recordsArgs<ExtArgs>
    _count?: boolean | ShiftCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ShiftIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type ShiftIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $ShiftPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Shift"
    objects: {
      attendance_records: Prisma.$AttendanceRecordPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      code: string
      name_en: string
      name_th: string | null
      start_time: string
      end_time: string
      is_flexible: boolean
      break_minutes: number
      work_hours: number
      is_active: boolean
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["shift"]>
    composites: {}
  }

  type ShiftGetPayload<S extends boolean | null | undefined | ShiftDefaultArgs> = $Result.GetResult<Prisma.$ShiftPayload, S>

  type ShiftCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ShiftFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ShiftCountAggregateInputType | true
    }

  export interface ShiftDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Shift'], meta: { name: 'Shift' } }
    /**
     * Find zero or one Shift that matches the filter.
     * @param {ShiftFindUniqueArgs} args - Arguments to find a Shift
     * @example
     * // Get one Shift
     * const shift = await prisma.shift.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ShiftFindUniqueArgs>(args: SelectSubset<T, ShiftFindUniqueArgs<ExtArgs>>): Prisma__ShiftClient<$Result.GetResult<Prisma.$ShiftPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Shift that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ShiftFindUniqueOrThrowArgs} args - Arguments to find a Shift
     * @example
     * // Get one Shift
     * const shift = await prisma.shift.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ShiftFindUniqueOrThrowArgs>(args: SelectSubset<T, ShiftFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ShiftClient<$Result.GetResult<Prisma.$ShiftPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Shift that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ShiftFindFirstArgs} args - Arguments to find a Shift
     * @example
     * // Get one Shift
     * const shift = await prisma.shift.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ShiftFindFirstArgs>(args?: SelectSubset<T, ShiftFindFirstArgs<ExtArgs>>): Prisma__ShiftClient<$Result.GetResult<Prisma.$ShiftPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Shift that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ShiftFindFirstOrThrowArgs} args - Arguments to find a Shift
     * @example
     * // Get one Shift
     * const shift = await prisma.shift.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ShiftFindFirstOrThrowArgs>(args?: SelectSubset<T, ShiftFindFirstOrThrowArgs<ExtArgs>>): Prisma__ShiftClient<$Result.GetResult<Prisma.$ShiftPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Shifts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ShiftFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Shifts
     * const shifts = await prisma.shift.findMany()
     * 
     * // Get first 10 Shifts
     * const shifts = await prisma.shift.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const shiftWithIdOnly = await prisma.shift.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ShiftFindManyArgs>(args?: SelectSubset<T, ShiftFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ShiftPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Shift.
     * @param {ShiftCreateArgs} args - Arguments to create a Shift.
     * @example
     * // Create one Shift
     * const Shift = await prisma.shift.create({
     *   data: {
     *     // ... data to create a Shift
     *   }
     * })
     * 
     */
    create<T extends ShiftCreateArgs>(args: SelectSubset<T, ShiftCreateArgs<ExtArgs>>): Prisma__ShiftClient<$Result.GetResult<Prisma.$ShiftPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Shifts.
     * @param {ShiftCreateManyArgs} args - Arguments to create many Shifts.
     * @example
     * // Create many Shifts
     * const shift = await prisma.shift.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ShiftCreateManyArgs>(args?: SelectSubset<T, ShiftCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Shifts and returns the data saved in the database.
     * @param {ShiftCreateManyAndReturnArgs} args - Arguments to create many Shifts.
     * @example
     * // Create many Shifts
     * const shift = await prisma.shift.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Shifts and only return the `id`
     * const shiftWithIdOnly = await prisma.shift.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ShiftCreateManyAndReturnArgs>(args?: SelectSubset<T, ShiftCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ShiftPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Shift.
     * @param {ShiftDeleteArgs} args - Arguments to delete one Shift.
     * @example
     * // Delete one Shift
     * const Shift = await prisma.shift.delete({
     *   where: {
     *     // ... filter to delete one Shift
     *   }
     * })
     * 
     */
    delete<T extends ShiftDeleteArgs>(args: SelectSubset<T, ShiftDeleteArgs<ExtArgs>>): Prisma__ShiftClient<$Result.GetResult<Prisma.$ShiftPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Shift.
     * @param {ShiftUpdateArgs} args - Arguments to update one Shift.
     * @example
     * // Update one Shift
     * const shift = await prisma.shift.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ShiftUpdateArgs>(args: SelectSubset<T, ShiftUpdateArgs<ExtArgs>>): Prisma__ShiftClient<$Result.GetResult<Prisma.$ShiftPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Shifts.
     * @param {ShiftDeleteManyArgs} args - Arguments to filter Shifts to delete.
     * @example
     * // Delete a few Shifts
     * const { count } = await prisma.shift.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ShiftDeleteManyArgs>(args?: SelectSubset<T, ShiftDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Shifts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ShiftUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Shifts
     * const shift = await prisma.shift.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ShiftUpdateManyArgs>(args: SelectSubset<T, ShiftUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Shifts and returns the data updated in the database.
     * @param {ShiftUpdateManyAndReturnArgs} args - Arguments to update many Shifts.
     * @example
     * // Update many Shifts
     * const shift = await prisma.shift.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Shifts and only return the `id`
     * const shiftWithIdOnly = await prisma.shift.updateManyAndReturn({
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
    updateManyAndReturn<T extends ShiftUpdateManyAndReturnArgs>(args: SelectSubset<T, ShiftUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ShiftPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Shift.
     * @param {ShiftUpsertArgs} args - Arguments to update or create a Shift.
     * @example
     * // Update or create a Shift
     * const shift = await prisma.shift.upsert({
     *   create: {
     *     // ... data to create a Shift
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Shift we want to update
     *   }
     * })
     */
    upsert<T extends ShiftUpsertArgs>(args: SelectSubset<T, ShiftUpsertArgs<ExtArgs>>): Prisma__ShiftClient<$Result.GetResult<Prisma.$ShiftPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Shifts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ShiftCountArgs} args - Arguments to filter Shifts to count.
     * @example
     * // Count the number of Shifts
     * const count = await prisma.shift.count({
     *   where: {
     *     // ... the filter for the Shifts we want to count
     *   }
     * })
    **/
    count<T extends ShiftCountArgs>(
      args?: Subset<T, ShiftCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ShiftCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Shift.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ShiftAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ShiftAggregateArgs>(args: Subset<T, ShiftAggregateArgs>): Prisma.PrismaPromise<GetShiftAggregateType<T>>

    /**
     * Group by Shift.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ShiftGroupByArgs} args - Group by arguments.
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
      T extends ShiftGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ShiftGroupByArgs['orderBy'] }
        : { orderBy?: ShiftGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ShiftGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetShiftGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Shift model
   */
  readonly fields: ShiftFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Shift.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ShiftClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    attendance_records<T extends Shift$attendance_recordsArgs<ExtArgs> = {}>(args?: Subset<T, Shift$attendance_recordsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AttendanceRecordPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Shift model
   */
  interface ShiftFieldRefs {
    readonly id: FieldRef<"Shift", 'String'>
    readonly code: FieldRef<"Shift", 'String'>
    readonly name_en: FieldRef<"Shift", 'String'>
    readonly name_th: FieldRef<"Shift", 'String'>
    readonly start_time: FieldRef<"Shift", 'String'>
    readonly end_time: FieldRef<"Shift", 'String'>
    readonly is_flexible: FieldRef<"Shift", 'Boolean'>
    readonly break_minutes: FieldRef<"Shift", 'Int'>
    readonly work_hours: FieldRef<"Shift", 'Float'>
    readonly is_active: FieldRef<"Shift", 'Boolean'>
    readonly created_at: FieldRef<"Shift", 'DateTime'>
    readonly updated_at: FieldRef<"Shift", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Shift findUnique
   */
  export type ShiftFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Shift
     */
    select?: ShiftSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Shift
     */
    omit?: ShiftOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShiftInclude<ExtArgs> | null
    /**
     * Filter, which Shift to fetch.
     */
    where: ShiftWhereUniqueInput
  }

  /**
   * Shift findUniqueOrThrow
   */
  export type ShiftFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Shift
     */
    select?: ShiftSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Shift
     */
    omit?: ShiftOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShiftInclude<ExtArgs> | null
    /**
     * Filter, which Shift to fetch.
     */
    where: ShiftWhereUniqueInput
  }

  /**
   * Shift findFirst
   */
  export type ShiftFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Shift
     */
    select?: ShiftSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Shift
     */
    omit?: ShiftOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShiftInclude<ExtArgs> | null
    /**
     * Filter, which Shift to fetch.
     */
    where?: ShiftWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Shifts to fetch.
     */
    orderBy?: ShiftOrderByWithRelationInput | ShiftOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Shifts.
     */
    cursor?: ShiftWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Shifts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Shifts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Shifts.
     */
    distinct?: ShiftScalarFieldEnum | ShiftScalarFieldEnum[]
  }

  /**
   * Shift findFirstOrThrow
   */
  export type ShiftFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Shift
     */
    select?: ShiftSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Shift
     */
    omit?: ShiftOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShiftInclude<ExtArgs> | null
    /**
     * Filter, which Shift to fetch.
     */
    where?: ShiftWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Shifts to fetch.
     */
    orderBy?: ShiftOrderByWithRelationInput | ShiftOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Shifts.
     */
    cursor?: ShiftWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Shifts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Shifts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Shifts.
     */
    distinct?: ShiftScalarFieldEnum | ShiftScalarFieldEnum[]
  }

  /**
   * Shift findMany
   */
  export type ShiftFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Shift
     */
    select?: ShiftSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Shift
     */
    omit?: ShiftOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShiftInclude<ExtArgs> | null
    /**
     * Filter, which Shifts to fetch.
     */
    where?: ShiftWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Shifts to fetch.
     */
    orderBy?: ShiftOrderByWithRelationInput | ShiftOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Shifts.
     */
    cursor?: ShiftWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Shifts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Shifts.
     */
    skip?: number
    distinct?: ShiftScalarFieldEnum | ShiftScalarFieldEnum[]
  }

  /**
   * Shift create
   */
  export type ShiftCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Shift
     */
    select?: ShiftSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Shift
     */
    omit?: ShiftOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShiftInclude<ExtArgs> | null
    /**
     * The data needed to create a Shift.
     */
    data: XOR<ShiftCreateInput, ShiftUncheckedCreateInput>
  }

  /**
   * Shift createMany
   */
  export type ShiftCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Shifts.
     */
    data: ShiftCreateManyInput | ShiftCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Shift createManyAndReturn
   */
  export type ShiftCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Shift
     */
    select?: ShiftSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Shift
     */
    omit?: ShiftOmit<ExtArgs> | null
    /**
     * The data used to create many Shifts.
     */
    data: ShiftCreateManyInput | ShiftCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Shift update
   */
  export type ShiftUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Shift
     */
    select?: ShiftSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Shift
     */
    omit?: ShiftOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShiftInclude<ExtArgs> | null
    /**
     * The data needed to update a Shift.
     */
    data: XOR<ShiftUpdateInput, ShiftUncheckedUpdateInput>
    /**
     * Choose, which Shift to update.
     */
    where: ShiftWhereUniqueInput
  }

  /**
   * Shift updateMany
   */
  export type ShiftUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Shifts.
     */
    data: XOR<ShiftUpdateManyMutationInput, ShiftUncheckedUpdateManyInput>
    /**
     * Filter which Shifts to update
     */
    where?: ShiftWhereInput
    /**
     * Limit how many Shifts to update.
     */
    limit?: number
  }

  /**
   * Shift updateManyAndReturn
   */
  export type ShiftUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Shift
     */
    select?: ShiftSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Shift
     */
    omit?: ShiftOmit<ExtArgs> | null
    /**
     * The data used to update Shifts.
     */
    data: XOR<ShiftUpdateManyMutationInput, ShiftUncheckedUpdateManyInput>
    /**
     * Filter which Shifts to update
     */
    where?: ShiftWhereInput
    /**
     * Limit how many Shifts to update.
     */
    limit?: number
  }

  /**
   * Shift upsert
   */
  export type ShiftUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Shift
     */
    select?: ShiftSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Shift
     */
    omit?: ShiftOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShiftInclude<ExtArgs> | null
    /**
     * The filter to search for the Shift to update in case it exists.
     */
    where: ShiftWhereUniqueInput
    /**
     * In case the Shift found by the `where` argument doesn't exist, create a new Shift with this data.
     */
    create: XOR<ShiftCreateInput, ShiftUncheckedCreateInput>
    /**
     * In case the Shift was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ShiftUpdateInput, ShiftUncheckedUpdateInput>
  }

  /**
   * Shift delete
   */
  export type ShiftDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Shift
     */
    select?: ShiftSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Shift
     */
    omit?: ShiftOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShiftInclude<ExtArgs> | null
    /**
     * Filter which Shift to delete.
     */
    where: ShiftWhereUniqueInput
  }

  /**
   * Shift deleteMany
   */
  export type ShiftDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Shifts to delete
     */
    where?: ShiftWhereInput
    /**
     * Limit how many Shifts to delete.
     */
    limit?: number
  }

  /**
   * Shift.attendance_records
   */
  export type Shift$attendance_recordsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AttendanceRecord
     */
    select?: AttendanceRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AttendanceRecord
     */
    omit?: AttendanceRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttendanceRecordInclude<ExtArgs> | null
    where?: AttendanceRecordWhereInput
    orderBy?: AttendanceRecordOrderByWithRelationInput | AttendanceRecordOrderByWithRelationInput[]
    cursor?: AttendanceRecordWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AttendanceRecordScalarFieldEnum | AttendanceRecordScalarFieldEnum[]
  }

  /**
   * Shift without action
   */
  export type ShiftDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Shift
     */
    select?: ShiftSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Shift
     */
    omit?: ShiftOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShiftInclude<ExtArgs> | null
  }


  /**
   * Model AttendanceRecord
   */

  export type AggregateAttendanceRecord = {
    _count: AttendanceRecordCountAggregateOutputType | null
    _avg: AttendanceRecordAvgAggregateOutputType | null
    _sum: AttendanceRecordSumAggregateOutputType | null
    _min: AttendanceRecordMinAggregateOutputType | null
    _max: AttendanceRecordMaxAggregateOutputType | null
  }

  export type AttendanceRecordAvgAggregateOutputType = {
    working_hours: number | null
    overtime_hours: number | null
    late_minutes: number | null
    early_minutes: number | null
  }

  export type AttendanceRecordSumAggregateOutputType = {
    working_hours: number | null
    overtime_hours: number | null
    late_minutes: number | null
    early_minutes: number | null
  }

  export type AttendanceRecordMinAggregateOutputType = {
    id: string | null
    employee_id: string | null
    date: Date | null
    shift_id: string | null
    scheduled_start: string | null
    scheduled_end: string | null
    actual_check_in: string | null
    actual_check_out: string | null
    check_in_source: string | null
    check_in_location: string | null
    check_out_source: string | null
    check_out_location: string | null
    working_hours: number | null
    overtime_hours: number | null
    is_late: boolean | null
    late_minutes: number | null
    is_early_departure: boolean | null
    early_minutes: number | null
    status: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type AttendanceRecordMaxAggregateOutputType = {
    id: string | null
    employee_id: string | null
    date: Date | null
    shift_id: string | null
    scheduled_start: string | null
    scheduled_end: string | null
    actual_check_in: string | null
    actual_check_out: string | null
    check_in_source: string | null
    check_in_location: string | null
    check_out_source: string | null
    check_out_location: string | null
    working_hours: number | null
    overtime_hours: number | null
    is_late: boolean | null
    late_minutes: number | null
    is_early_departure: boolean | null
    early_minutes: number | null
    status: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type AttendanceRecordCountAggregateOutputType = {
    id: number
    employee_id: number
    date: number
    shift_id: number
    scheduled_start: number
    scheduled_end: number
    actual_check_in: number
    actual_check_out: number
    check_in_source: number
    check_in_location: number
    check_out_source: number
    check_out_location: number
    working_hours: number
    overtime_hours: number
    is_late: number
    late_minutes: number
    is_early_departure: number
    early_minutes: number
    status: number
    anomalies: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type AttendanceRecordAvgAggregateInputType = {
    working_hours?: true
    overtime_hours?: true
    late_minutes?: true
    early_minutes?: true
  }

  export type AttendanceRecordSumAggregateInputType = {
    working_hours?: true
    overtime_hours?: true
    late_minutes?: true
    early_minutes?: true
  }

  export type AttendanceRecordMinAggregateInputType = {
    id?: true
    employee_id?: true
    date?: true
    shift_id?: true
    scheduled_start?: true
    scheduled_end?: true
    actual_check_in?: true
    actual_check_out?: true
    check_in_source?: true
    check_in_location?: true
    check_out_source?: true
    check_out_location?: true
    working_hours?: true
    overtime_hours?: true
    is_late?: true
    late_minutes?: true
    is_early_departure?: true
    early_minutes?: true
    status?: true
    created_at?: true
    updated_at?: true
  }

  export type AttendanceRecordMaxAggregateInputType = {
    id?: true
    employee_id?: true
    date?: true
    shift_id?: true
    scheduled_start?: true
    scheduled_end?: true
    actual_check_in?: true
    actual_check_out?: true
    check_in_source?: true
    check_in_location?: true
    check_out_source?: true
    check_out_location?: true
    working_hours?: true
    overtime_hours?: true
    is_late?: true
    late_minutes?: true
    is_early_departure?: true
    early_minutes?: true
    status?: true
    created_at?: true
    updated_at?: true
  }

  export type AttendanceRecordCountAggregateInputType = {
    id?: true
    employee_id?: true
    date?: true
    shift_id?: true
    scheduled_start?: true
    scheduled_end?: true
    actual_check_in?: true
    actual_check_out?: true
    check_in_source?: true
    check_in_location?: true
    check_out_source?: true
    check_out_location?: true
    working_hours?: true
    overtime_hours?: true
    is_late?: true
    late_minutes?: true
    is_early_departure?: true
    early_minutes?: true
    status?: true
    anomalies?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type AttendanceRecordAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AttendanceRecord to aggregate.
     */
    where?: AttendanceRecordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AttendanceRecords to fetch.
     */
    orderBy?: AttendanceRecordOrderByWithRelationInput | AttendanceRecordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AttendanceRecordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AttendanceRecords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AttendanceRecords.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AttendanceRecords
    **/
    _count?: true | AttendanceRecordCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AttendanceRecordAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AttendanceRecordSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AttendanceRecordMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AttendanceRecordMaxAggregateInputType
  }

  export type GetAttendanceRecordAggregateType<T extends AttendanceRecordAggregateArgs> = {
        [P in keyof T & keyof AggregateAttendanceRecord]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAttendanceRecord[P]>
      : GetScalarType<T[P], AggregateAttendanceRecord[P]>
  }




  export type AttendanceRecordGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AttendanceRecordWhereInput
    orderBy?: AttendanceRecordOrderByWithAggregationInput | AttendanceRecordOrderByWithAggregationInput[]
    by: AttendanceRecordScalarFieldEnum[] | AttendanceRecordScalarFieldEnum
    having?: AttendanceRecordScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AttendanceRecordCountAggregateInputType | true
    _avg?: AttendanceRecordAvgAggregateInputType
    _sum?: AttendanceRecordSumAggregateInputType
    _min?: AttendanceRecordMinAggregateInputType
    _max?: AttendanceRecordMaxAggregateInputType
  }

  export type AttendanceRecordGroupByOutputType = {
    id: string
    employee_id: string
    date: Date
    shift_id: string | null
    scheduled_start: string | null
    scheduled_end: string | null
    actual_check_in: string | null
    actual_check_out: string | null
    check_in_source: string | null
    check_in_location: string | null
    check_out_source: string | null
    check_out_location: string | null
    working_hours: number | null
    overtime_hours: number
    is_late: boolean
    late_minutes: number
    is_early_departure: boolean
    early_minutes: number
    status: string
    anomalies: string[]
    created_at: Date
    updated_at: Date
    _count: AttendanceRecordCountAggregateOutputType | null
    _avg: AttendanceRecordAvgAggregateOutputType | null
    _sum: AttendanceRecordSumAggregateOutputType | null
    _min: AttendanceRecordMinAggregateOutputType | null
    _max: AttendanceRecordMaxAggregateOutputType | null
  }

  type GetAttendanceRecordGroupByPayload<T extends AttendanceRecordGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AttendanceRecordGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AttendanceRecordGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AttendanceRecordGroupByOutputType[P]>
            : GetScalarType<T[P], AttendanceRecordGroupByOutputType[P]>
        }
      >
    >


  export type AttendanceRecordSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    employee_id?: boolean
    date?: boolean
    shift_id?: boolean
    scheduled_start?: boolean
    scheduled_end?: boolean
    actual_check_in?: boolean
    actual_check_out?: boolean
    check_in_source?: boolean
    check_in_location?: boolean
    check_out_source?: boolean
    check_out_location?: boolean
    working_hours?: boolean
    overtime_hours?: boolean
    is_late?: boolean
    late_minutes?: boolean
    is_early_departure?: boolean
    early_minutes?: boolean
    status?: boolean
    anomalies?: boolean
    created_at?: boolean
    updated_at?: boolean
    shift?: boolean | AttendanceRecord$shiftArgs<ExtArgs>
  }, ExtArgs["result"]["attendanceRecord"]>

  export type AttendanceRecordSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    employee_id?: boolean
    date?: boolean
    shift_id?: boolean
    scheduled_start?: boolean
    scheduled_end?: boolean
    actual_check_in?: boolean
    actual_check_out?: boolean
    check_in_source?: boolean
    check_in_location?: boolean
    check_out_source?: boolean
    check_out_location?: boolean
    working_hours?: boolean
    overtime_hours?: boolean
    is_late?: boolean
    late_minutes?: boolean
    is_early_departure?: boolean
    early_minutes?: boolean
    status?: boolean
    anomalies?: boolean
    created_at?: boolean
    updated_at?: boolean
    shift?: boolean | AttendanceRecord$shiftArgs<ExtArgs>
  }, ExtArgs["result"]["attendanceRecord"]>

  export type AttendanceRecordSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    employee_id?: boolean
    date?: boolean
    shift_id?: boolean
    scheduled_start?: boolean
    scheduled_end?: boolean
    actual_check_in?: boolean
    actual_check_out?: boolean
    check_in_source?: boolean
    check_in_location?: boolean
    check_out_source?: boolean
    check_out_location?: boolean
    working_hours?: boolean
    overtime_hours?: boolean
    is_late?: boolean
    late_minutes?: boolean
    is_early_departure?: boolean
    early_minutes?: boolean
    status?: boolean
    anomalies?: boolean
    created_at?: boolean
    updated_at?: boolean
    shift?: boolean | AttendanceRecord$shiftArgs<ExtArgs>
  }, ExtArgs["result"]["attendanceRecord"]>

  export type AttendanceRecordSelectScalar = {
    id?: boolean
    employee_id?: boolean
    date?: boolean
    shift_id?: boolean
    scheduled_start?: boolean
    scheduled_end?: boolean
    actual_check_in?: boolean
    actual_check_out?: boolean
    check_in_source?: boolean
    check_in_location?: boolean
    check_out_source?: boolean
    check_out_location?: boolean
    working_hours?: boolean
    overtime_hours?: boolean
    is_late?: boolean
    late_minutes?: boolean
    is_early_departure?: boolean
    early_minutes?: boolean
    status?: boolean
    anomalies?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type AttendanceRecordOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "employee_id" | "date" | "shift_id" | "scheduled_start" | "scheduled_end" | "actual_check_in" | "actual_check_out" | "check_in_source" | "check_in_location" | "check_out_source" | "check_out_location" | "working_hours" | "overtime_hours" | "is_late" | "late_minutes" | "is_early_departure" | "early_minutes" | "status" | "anomalies" | "created_at" | "updated_at", ExtArgs["result"]["attendanceRecord"]>
  export type AttendanceRecordInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    shift?: boolean | AttendanceRecord$shiftArgs<ExtArgs>
  }
  export type AttendanceRecordIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    shift?: boolean | AttendanceRecord$shiftArgs<ExtArgs>
  }
  export type AttendanceRecordIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    shift?: boolean | AttendanceRecord$shiftArgs<ExtArgs>
  }

  export type $AttendanceRecordPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AttendanceRecord"
    objects: {
      shift: Prisma.$ShiftPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      employee_id: string
      date: Date
      shift_id: string | null
      scheduled_start: string | null
      scheduled_end: string | null
      actual_check_in: string | null
      actual_check_out: string | null
      check_in_source: string | null
      check_in_location: string | null
      check_out_source: string | null
      check_out_location: string | null
      working_hours: number | null
      overtime_hours: number
      is_late: boolean
      late_minutes: number
      is_early_departure: boolean
      early_minutes: number
      status: string
      anomalies: string[]
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["attendanceRecord"]>
    composites: {}
  }

  type AttendanceRecordGetPayload<S extends boolean | null | undefined | AttendanceRecordDefaultArgs> = $Result.GetResult<Prisma.$AttendanceRecordPayload, S>

  type AttendanceRecordCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AttendanceRecordFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AttendanceRecordCountAggregateInputType | true
    }

  export interface AttendanceRecordDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AttendanceRecord'], meta: { name: 'AttendanceRecord' } }
    /**
     * Find zero or one AttendanceRecord that matches the filter.
     * @param {AttendanceRecordFindUniqueArgs} args - Arguments to find a AttendanceRecord
     * @example
     * // Get one AttendanceRecord
     * const attendanceRecord = await prisma.attendanceRecord.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AttendanceRecordFindUniqueArgs>(args: SelectSubset<T, AttendanceRecordFindUniqueArgs<ExtArgs>>): Prisma__AttendanceRecordClient<$Result.GetResult<Prisma.$AttendanceRecordPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AttendanceRecord that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AttendanceRecordFindUniqueOrThrowArgs} args - Arguments to find a AttendanceRecord
     * @example
     * // Get one AttendanceRecord
     * const attendanceRecord = await prisma.attendanceRecord.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AttendanceRecordFindUniqueOrThrowArgs>(args: SelectSubset<T, AttendanceRecordFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AttendanceRecordClient<$Result.GetResult<Prisma.$AttendanceRecordPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AttendanceRecord that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AttendanceRecordFindFirstArgs} args - Arguments to find a AttendanceRecord
     * @example
     * // Get one AttendanceRecord
     * const attendanceRecord = await prisma.attendanceRecord.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AttendanceRecordFindFirstArgs>(args?: SelectSubset<T, AttendanceRecordFindFirstArgs<ExtArgs>>): Prisma__AttendanceRecordClient<$Result.GetResult<Prisma.$AttendanceRecordPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AttendanceRecord that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AttendanceRecordFindFirstOrThrowArgs} args - Arguments to find a AttendanceRecord
     * @example
     * // Get one AttendanceRecord
     * const attendanceRecord = await prisma.attendanceRecord.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AttendanceRecordFindFirstOrThrowArgs>(args?: SelectSubset<T, AttendanceRecordFindFirstOrThrowArgs<ExtArgs>>): Prisma__AttendanceRecordClient<$Result.GetResult<Prisma.$AttendanceRecordPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AttendanceRecords that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AttendanceRecordFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AttendanceRecords
     * const attendanceRecords = await prisma.attendanceRecord.findMany()
     * 
     * // Get first 10 AttendanceRecords
     * const attendanceRecords = await prisma.attendanceRecord.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const attendanceRecordWithIdOnly = await prisma.attendanceRecord.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AttendanceRecordFindManyArgs>(args?: SelectSubset<T, AttendanceRecordFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AttendanceRecordPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AttendanceRecord.
     * @param {AttendanceRecordCreateArgs} args - Arguments to create a AttendanceRecord.
     * @example
     * // Create one AttendanceRecord
     * const AttendanceRecord = await prisma.attendanceRecord.create({
     *   data: {
     *     // ... data to create a AttendanceRecord
     *   }
     * })
     * 
     */
    create<T extends AttendanceRecordCreateArgs>(args: SelectSubset<T, AttendanceRecordCreateArgs<ExtArgs>>): Prisma__AttendanceRecordClient<$Result.GetResult<Prisma.$AttendanceRecordPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AttendanceRecords.
     * @param {AttendanceRecordCreateManyArgs} args - Arguments to create many AttendanceRecords.
     * @example
     * // Create many AttendanceRecords
     * const attendanceRecord = await prisma.attendanceRecord.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AttendanceRecordCreateManyArgs>(args?: SelectSubset<T, AttendanceRecordCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AttendanceRecords and returns the data saved in the database.
     * @param {AttendanceRecordCreateManyAndReturnArgs} args - Arguments to create many AttendanceRecords.
     * @example
     * // Create many AttendanceRecords
     * const attendanceRecord = await prisma.attendanceRecord.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AttendanceRecords and only return the `id`
     * const attendanceRecordWithIdOnly = await prisma.attendanceRecord.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AttendanceRecordCreateManyAndReturnArgs>(args?: SelectSubset<T, AttendanceRecordCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AttendanceRecordPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AttendanceRecord.
     * @param {AttendanceRecordDeleteArgs} args - Arguments to delete one AttendanceRecord.
     * @example
     * // Delete one AttendanceRecord
     * const AttendanceRecord = await prisma.attendanceRecord.delete({
     *   where: {
     *     // ... filter to delete one AttendanceRecord
     *   }
     * })
     * 
     */
    delete<T extends AttendanceRecordDeleteArgs>(args: SelectSubset<T, AttendanceRecordDeleteArgs<ExtArgs>>): Prisma__AttendanceRecordClient<$Result.GetResult<Prisma.$AttendanceRecordPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AttendanceRecord.
     * @param {AttendanceRecordUpdateArgs} args - Arguments to update one AttendanceRecord.
     * @example
     * // Update one AttendanceRecord
     * const attendanceRecord = await prisma.attendanceRecord.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AttendanceRecordUpdateArgs>(args: SelectSubset<T, AttendanceRecordUpdateArgs<ExtArgs>>): Prisma__AttendanceRecordClient<$Result.GetResult<Prisma.$AttendanceRecordPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AttendanceRecords.
     * @param {AttendanceRecordDeleteManyArgs} args - Arguments to filter AttendanceRecords to delete.
     * @example
     * // Delete a few AttendanceRecords
     * const { count } = await prisma.attendanceRecord.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AttendanceRecordDeleteManyArgs>(args?: SelectSubset<T, AttendanceRecordDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AttendanceRecords.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AttendanceRecordUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AttendanceRecords
     * const attendanceRecord = await prisma.attendanceRecord.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AttendanceRecordUpdateManyArgs>(args: SelectSubset<T, AttendanceRecordUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AttendanceRecords and returns the data updated in the database.
     * @param {AttendanceRecordUpdateManyAndReturnArgs} args - Arguments to update many AttendanceRecords.
     * @example
     * // Update many AttendanceRecords
     * const attendanceRecord = await prisma.attendanceRecord.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AttendanceRecords and only return the `id`
     * const attendanceRecordWithIdOnly = await prisma.attendanceRecord.updateManyAndReturn({
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
    updateManyAndReturn<T extends AttendanceRecordUpdateManyAndReturnArgs>(args: SelectSubset<T, AttendanceRecordUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AttendanceRecordPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one AttendanceRecord.
     * @param {AttendanceRecordUpsertArgs} args - Arguments to update or create a AttendanceRecord.
     * @example
     * // Update or create a AttendanceRecord
     * const attendanceRecord = await prisma.attendanceRecord.upsert({
     *   create: {
     *     // ... data to create a AttendanceRecord
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AttendanceRecord we want to update
     *   }
     * })
     */
    upsert<T extends AttendanceRecordUpsertArgs>(args: SelectSubset<T, AttendanceRecordUpsertArgs<ExtArgs>>): Prisma__AttendanceRecordClient<$Result.GetResult<Prisma.$AttendanceRecordPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AttendanceRecords.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AttendanceRecordCountArgs} args - Arguments to filter AttendanceRecords to count.
     * @example
     * // Count the number of AttendanceRecords
     * const count = await prisma.attendanceRecord.count({
     *   where: {
     *     // ... the filter for the AttendanceRecords we want to count
     *   }
     * })
    **/
    count<T extends AttendanceRecordCountArgs>(
      args?: Subset<T, AttendanceRecordCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AttendanceRecordCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AttendanceRecord.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AttendanceRecordAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends AttendanceRecordAggregateArgs>(args: Subset<T, AttendanceRecordAggregateArgs>): Prisma.PrismaPromise<GetAttendanceRecordAggregateType<T>>

    /**
     * Group by AttendanceRecord.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AttendanceRecordGroupByArgs} args - Group by arguments.
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
      T extends AttendanceRecordGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AttendanceRecordGroupByArgs['orderBy'] }
        : { orderBy?: AttendanceRecordGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, AttendanceRecordGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAttendanceRecordGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AttendanceRecord model
   */
  readonly fields: AttendanceRecordFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AttendanceRecord.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AttendanceRecordClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    shift<T extends AttendanceRecord$shiftArgs<ExtArgs> = {}>(args?: Subset<T, AttendanceRecord$shiftArgs<ExtArgs>>): Prisma__ShiftClient<$Result.GetResult<Prisma.$ShiftPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the AttendanceRecord model
   */
  interface AttendanceRecordFieldRefs {
    readonly id: FieldRef<"AttendanceRecord", 'String'>
    readonly employee_id: FieldRef<"AttendanceRecord", 'String'>
    readonly date: FieldRef<"AttendanceRecord", 'DateTime'>
    readonly shift_id: FieldRef<"AttendanceRecord", 'String'>
    readonly scheduled_start: FieldRef<"AttendanceRecord", 'String'>
    readonly scheduled_end: FieldRef<"AttendanceRecord", 'String'>
    readonly actual_check_in: FieldRef<"AttendanceRecord", 'String'>
    readonly actual_check_out: FieldRef<"AttendanceRecord", 'String'>
    readonly check_in_source: FieldRef<"AttendanceRecord", 'String'>
    readonly check_in_location: FieldRef<"AttendanceRecord", 'String'>
    readonly check_out_source: FieldRef<"AttendanceRecord", 'String'>
    readonly check_out_location: FieldRef<"AttendanceRecord", 'String'>
    readonly working_hours: FieldRef<"AttendanceRecord", 'Float'>
    readonly overtime_hours: FieldRef<"AttendanceRecord", 'Float'>
    readonly is_late: FieldRef<"AttendanceRecord", 'Boolean'>
    readonly late_minutes: FieldRef<"AttendanceRecord", 'Int'>
    readonly is_early_departure: FieldRef<"AttendanceRecord", 'Boolean'>
    readonly early_minutes: FieldRef<"AttendanceRecord", 'Int'>
    readonly status: FieldRef<"AttendanceRecord", 'String'>
    readonly anomalies: FieldRef<"AttendanceRecord", 'String[]'>
    readonly created_at: FieldRef<"AttendanceRecord", 'DateTime'>
    readonly updated_at: FieldRef<"AttendanceRecord", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AttendanceRecord findUnique
   */
  export type AttendanceRecordFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AttendanceRecord
     */
    select?: AttendanceRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AttendanceRecord
     */
    omit?: AttendanceRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttendanceRecordInclude<ExtArgs> | null
    /**
     * Filter, which AttendanceRecord to fetch.
     */
    where: AttendanceRecordWhereUniqueInput
  }

  /**
   * AttendanceRecord findUniqueOrThrow
   */
  export type AttendanceRecordFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AttendanceRecord
     */
    select?: AttendanceRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AttendanceRecord
     */
    omit?: AttendanceRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttendanceRecordInclude<ExtArgs> | null
    /**
     * Filter, which AttendanceRecord to fetch.
     */
    where: AttendanceRecordWhereUniqueInput
  }

  /**
   * AttendanceRecord findFirst
   */
  export type AttendanceRecordFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AttendanceRecord
     */
    select?: AttendanceRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AttendanceRecord
     */
    omit?: AttendanceRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttendanceRecordInclude<ExtArgs> | null
    /**
     * Filter, which AttendanceRecord to fetch.
     */
    where?: AttendanceRecordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AttendanceRecords to fetch.
     */
    orderBy?: AttendanceRecordOrderByWithRelationInput | AttendanceRecordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AttendanceRecords.
     */
    cursor?: AttendanceRecordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AttendanceRecords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AttendanceRecords.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AttendanceRecords.
     */
    distinct?: AttendanceRecordScalarFieldEnum | AttendanceRecordScalarFieldEnum[]
  }

  /**
   * AttendanceRecord findFirstOrThrow
   */
  export type AttendanceRecordFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AttendanceRecord
     */
    select?: AttendanceRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AttendanceRecord
     */
    omit?: AttendanceRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttendanceRecordInclude<ExtArgs> | null
    /**
     * Filter, which AttendanceRecord to fetch.
     */
    where?: AttendanceRecordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AttendanceRecords to fetch.
     */
    orderBy?: AttendanceRecordOrderByWithRelationInput | AttendanceRecordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AttendanceRecords.
     */
    cursor?: AttendanceRecordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AttendanceRecords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AttendanceRecords.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AttendanceRecords.
     */
    distinct?: AttendanceRecordScalarFieldEnum | AttendanceRecordScalarFieldEnum[]
  }

  /**
   * AttendanceRecord findMany
   */
  export type AttendanceRecordFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AttendanceRecord
     */
    select?: AttendanceRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AttendanceRecord
     */
    omit?: AttendanceRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttendanceRecordInclude<ExtArgs> | null
    /**
     * Filter, which AttendanceRecords to fetch.
     */
    where?: AttendanceRecordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AttendanceRecords to fetch.
     */
    orderBy?: AttendanceRecordOrderByWithRelationInput | AttendanceRecordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AttendanceRecords.
     */
    cursor?: AttendanceRecordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AttendanceRecords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AttendanceRecords.
     */
    skip?: number
    distinct?: AttendanceRecordScalarFieldEnum | AttendanceRecordScalarFieldEnum[]
  }

  /**
   * AttendanceRecord create
   */
  export type AttendanceRecordCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AttendanceRecord
     */
    select?: AttendanceRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AttendanceRecord
     */
    omit?: AttendanceRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttendanceRecordInclude<ExtArgs> | null
    /**
     * The data needed to create a AttendanceRecord.
     */
    data: XOR<AttendanceRecordCreateInput, AttendanceRecordUncheckedCreateInput>
  }

  /**
   * AttendanceRecord createMany
   */
  export type AttendanceRecordCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AttendanceRecords.
     */
    data: AttendanceRecordCreateManyInput | AttendanceRecordCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AttendanceRecord createManyAndReturn
   */
  export type AttendanceRecordCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AttendanceRecord
     */
    select?: AttendanceRecordSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AttendanceRecord
     */
    omit?: AttendanceRecordOmit<ExtArgs> | null
    /**
     * The data used to create many AttendanceRecords.
     */
    data: AttendanceRecordCreateManyInput | AttendanceRecordCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttendanceRecordIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * AttendanceRecord update
   */
  export type AttendanceRecordUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AttendanceRecord
     */
    select?: AttendanceRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AttendanceRecord
     */
    omit?: AttendanceRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttendanceRecordInclude<ExtArgs> | null
    /**
     * The data needed to update a AttendanceRecord.
     */
    data: XOR<AttendanceRecordUpdateInput, AttendanceRecordUncheckedUpdateInput>
    /**
     * Choose, which AttendanceRecord to update.
     */
    where: AttendanceRecordWhereUniqueInput
  }

  /**
   * AttendanceRecord updateMany
   */
  export type AttendanceRecordUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AttendanceRecords.
     */
    data: XOR<AttendanceRecordUpdateManyMutationInput, AttendanceRecordUncheckedUpdateManyInput>
    /**
     * Filter which AttendanceRecords to update
     */
    where?: AttendanceRecordWhereInput
    /**
     * Limit how many AttendanceRecords to update.
     */
    limit?: number
  }

  /**
   * AttendanceRecord updateManyAndReturn
   */
  export type AttendanceRecordUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AttendanceRecord
     */
    select?: AttendanceRecordSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AttendanceRecord
     */
    omit?: AttendanceRecordOmit<ExtArgs> | null
    /**
     * The data used to update AttendanceRecords.
     */
    data: XOR<AttendanceRecordUpdateManyMutationInput, AttendanceRecordUncheckedUpdateManyInput>
    /**
     * Filter which AttendanceRecords to update
     */
    where?: AttendanceRecordWhereInput
    /**
     * Limit how many AttendanceRecords to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttendanceRecordIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * AttendanceRecord upsert
   */
  export type AttendanceRecordUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AttendanceRecord
     */
    select?: AttendanceRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AttendanceRecord
     */
    omit?: AttendanceRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttendanceRecordInclude<ExtArgs> | null
    /**
     * The filter to search for the AttendanceRecord to update in case it exists.
     */
    where: AttendanceRecordWhereUniqueInput
    /**
     * In case the AttendanceRecord found by the `where` argument doesn't exist, create a new AttendanceRecord with this data.
     */
    create: XOR<AttendanceRecordCreateInput, AttendanceRecordUncheckedCreateInput>
    /**
     * In case the AttendanceRecord was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AttendanceRecordUpdateInput, AttendanceRecordUncheckedUpdateInput>
  }

  /**
   * AttendanceRecord delete
   */
  export type AttendanceRecordDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AttendanceRecord
     */
    select?: AttendanceRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AttendanceRecord
     */
    omit?: AttendanceRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttendanceRecordInclude<ExtArgs> | null
    /**
     * Filter which AttendanceRecord to delete.
     */
    where: AttendanceRecordWhereUniqueInput
  }

  /**
   * AttendanceRecord deleteMany
   */
  export type AttendanceRecordDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AttendanceRecords to delete
     */
    where?: AttendanceRecordWhereInput
    /**
     * Limit how many AttendanceRecords to delete.
     */
    limit?: number
  }

  /**
   * AttendanceRecord.shift
   */
  export type AttendanceRecord$shiftArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Shift
     */
    select?: ShiftSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Shift
     */
    omit?: ShiftOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShiftInclude<ExtArgs> | null
    where?: ShiftWhereInput
  }

  /**
   * AttendanceRecord without action
   */
  export type AttendanceRecordDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AttendanceRecord
     */
    select?: AttendanceRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AttendanceRecord
     */
    omit?: AttendanceRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttendanceRecordInclude<ExtArgs> | null
  }


  /**
   * Model OvertimeRequest
   */

  export type AggregateOvertimeRequest = {
    _count: OvertimeRequestCountAggregateOutputType | null
    _avg: OvertimeRequestAvgAggregateOutputType | null
    _sum: OvertimeRequestSumAggregateOutputType | null
    _min: OvertimeRequestMinAggregateOutputType | null
    _max: OvertimeRequestMaxAggregateOutputType | null
  }

  export type OvertimeRequestAvgAggregateOutputType = {
    hours: number | null
    rate: number | null
    hourly_rate: number | null
    amount: number | null
    night_hours: number | null
    night_premium_amount: number | null
    total_amount: number | null
  }

  export type OvertimeRequestSumAggregateOutputType = {
    hours: number | null
    rate: number | null
    hourly_rate: number | null
    amount: number | null
    night_hours: number | null
    night_premium_amount: number | null
    total_amount: number | null
  }

  export type OvertimeRequestMinAggregateOutputType = {
    id: string | null
    employee_id: string | null
    date: Date | null
    day_type: string | null
    start_time: string | null
    end_time: string | null
    hours: number | null
    ot_type: string | null
    rate: number | null
    hourly_rate: number | null
    amount: number | null
    has_night_premium: boolean | null
    night_hours: number | null
    night_premium_amount: number | null
    total_amount: number | null
    reason: string | null
    work_description: string | null
    pre_approved: boolean | null
    status: string | null
    submitted_at: Date | null
    approved_at: Date | null
    approved_by: string | null
    rejected_at: Date | null
    rejected_by: string | null
    rejection_reason: string | null
    post_confirmed: boolean | null
    post_confirmed_at: Date | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type OvertimeRequestMaxAggregateOutputType = {
    id: string | null
    employee_id: string | null
    date: Date | null
    day_type: string | null
    start_time: string | null
    end_time: string | null
    hours: number | null
    ot_type: string | null
    rate: number | null
    hourly_rate: number | null
    amount: number | null
    has_night_premium: boolean | null
    night_hours: number | null
    night_premium_amount: number | null
    total_amount: number | null
    reason: string | null
    work_description: string | null
    pre_approved: boolean | null
    status: string | null
    submitted_at: Date | null
    approved_at: Date | null
    approved_by: string | null
    rejected_at: Date | null
    rejected_by: string | null
    rejection_reason: string | null
    post_confirmed: boolean | null
    post_confirmed_at: Date | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type OvertimeRequestCountAggregateOutputType = {
    id: number
    employee_id: number
    date: number
    day_type: number
    start_time: number
    end_time: number
    hours: number
    ot_type: number
    rate: number
    hourly_rate: number
    amount: number
    has_night_premium: number
    night_hours: number
    night_premium_amount: number
    total_amount: number
    reason: number
    work_description: number
    pre_approved: number
    status: number
    submitted_at: number
    approved_at: number
    approved_by: number
    rejected_at: number
    rejected_by: number
    rejection_reason: number
    post_confirmed: number
    post_confirmed_at: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type OvertimeRequestAvgAggregateInputType = {
    hours?: true
    rate?: true
    hourly_rate?: true
    amount?: true
    night_hours?: true
    night_premium_amount?: true
    total_amount?: true
  }

  export type OvertimeRequestSumAggregateInputType = {
    hours?: true
    rate?: true
    hourly_rate?: true
    amount?: true
    night_hours?: true
    night_premium_amount?: true
    total_amount?: true
  }

  export type OvertimeRequestMinAggregateInputType = {
    id?: true
    employee_id?: true
    date?: true
    day_type?: true
    start_time?: true
    end_time?: true
    hours?: true
    ot_type?: true
    rate?: true
    hourly_rate?: true
    amount?: true
    has_night_premium?: true
    night_hours?: true
    night_premium_amount?: true
    total_amount?: true
    reason?: true
    work_description?: true
    pre_approved?: true
    status?: true
    submitted_at?: true
    approved_at?: true
    approved_by?: true
    rejected_at?: true
    rejected_by?: true
    rejection_reason?: true
    post_confirmed?: true
    post_confirmed_at?: true
    created_at?: true
    updated_at?: true
  }

  export type OvertimeRequestMaxAggregateInputType = {
    id?: true
    employee_id?: true
    date?: true
    day_type?: true
    start_time?: true
    end_time?: true
    hours?: true
    ot_type?: true
    rate?: true
    hourly_rate?: true
    amount?: true
    has_night_premium?: true
    night_hours?: true
    night_premium_amount?: true
    total_amount?: true
    reason?: true
    work_description?: true
    pre_approved?: true
    status?: true
    submitted_at?: true
    approved_at?: true
    approved_by?: true
    rejected_at?: true
    rejected_by?: true
    rejection_reason?: true
    post_confirmed?: true
    post_confirmed_at?: true
    created_at?: true
    updated_at?: true
  }

  export type OvertimeRequestCountAggregateInputType = {
    id?: true
    employee_id?: true
    date?: true
    day_type?: true
    start_time?: true
    end_time?: true
    hours?: true
    ot_type?: true
    rate?: true
    hourly_rate?: true
    amount?: true
    has_night_premium?: true
    night_hours?: true
    night_premium_amount?: true
    total_amount?: true
    reason?: true
    work_description?: true
    pre_approved?: true
    status?: true
    submitted_at?: true
    approved_at?: true
    approved_by?: true
    rejected_at?: true
    rejected_by?: true
    rejection_reason?: true
    post_confirmed?: true
    post_confirmed_at?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type OvertimeRequestAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which OvertimeRequest to aggregate.
     */
    where?: OvertimeRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OvertimeRequests to fetch.
     */
    orderBy?: OvertimeRequestOrderByWithRelationInput | OvertimeRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: OvertimeRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OvertimeRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OvertimeRequests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned OvertimeRequests
    **/
    _count?: true | OvertimeRequestCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: OvertimeRequestAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: OvertimeRequestSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: OvertimeRequestMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: OvertimeRequestMaxAggregateInputType
  }

  export type GetOvertimeRequestAggregateType<T extends OvertimeRequestAggregateArgs> = {
        [P in keyof T & keyof AggregateOvertimeRequest]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOvertimeRequest[P]>
      : GetScalarType<T[P], AggregateOvertimeRequest[P]>
  }




  export type OvertimeRequestGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OvertimeRequestWhereInput
    orderBy?: OvertimeRequestOrderByWithAggregationInput | OvertimeRequestOrderByWithAggregationInput[]
    by: OvertimeRequestScalarFieldEnum[] | OvertimeRequestScalarFieldEnum
    having?: OvertimeRequestScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: OvertimeRequestCountAggregateInputType | true
    _avg?: OvertimeRequestAvgAggregateInputType
    _sum?: OvertimeRequestSumAggregateInputType
    _min?: OvertimeRequestMinAggregateInputType
    _max?: OvertimeRequestMaxAggregateInputType
  }

  export type OvertimeRequestGroupByOutputType = {
    id: string
    employee_id: string
    date: Date
    day_type: string
    start_time: string
    end_time: string
    hours: number
    ot_type: string
    rate: number
    hourly_rate: number
    amount: number
    has_night_premium: boolean
    night_hours: number
    night_premium_amount: number
    total_amount: number
    reason: string
    work_description: string | null
    pre_approved: boolean
    status: string
    submitted_at: Date
    approved_at: Date | null
    approved_by: string | null
    rejected_at: Date | null
    rejected_by: string | null
    rejection_reason: string | null
    post_confirmed: boolean
    post_confirmed_at: Date | null
    created_at: Date
    updated_at: Date
    _count: OvertimeRequestCountAggregateOutputType | null
    _avg: OvertimeRequestAvgAggregateOutputType | null
    _sum: OvertimeRequestSumAggregateOutputType | null
    _min: OvertimeRequestMinAggregateOutputType | null
    _max: OvertimeRequestMaxAggregateOutputType | null
  }

  type GetOvertimeRequestGroupByPayload<T extends OvertimeRequestGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<OvertimeRequestGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof OvertimeRequestGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], OvertimeRequestGroupByOutputType[P]>
            : GetScalarType<T[P], OvertimeRequestGroupByOutputType[P]>
        }
      >
    >


  export type OvertimeRequestSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    employee_id?: boolean
    date?: boolean
    day_type?: boolean
    start_time?: boolean
    end_time?: boolean
    hours?: boolean
    ot_type?: boolean
    rate?: boolean
    hourly_rate?: boolean
    amount?: boolean
    has_night_premium?: boolean
    night_hours?: boolean
    night_premium_amount?: boolean
    total_amount?: boolean
    reason?: boolean
    work_description?: boolean
    pre_approved?: boolean
    status?: boolean
    submitted_at?: boolean
    approved_at?: boolean
    approved_by?: boolean
    rejected_at?: boolean
    rejected_by?: boolean
    rejection_reason?: boolean
    post_confirmed?: boolean
    post_confirmed_at?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["overtimeRequest"]>

  export type OvertimeRequestSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    employee_id?: boolean
    date?: boolean
    day_type?: boolean
    start_time?: boolean
    end_time?: boolean
    hours?: boolean
    ot_type?: boolean
    rate?: boolean
    hourly_rate?: boolean
    amount?: boolean
    has_night_premium?: boolean
    night_hours?: boolean
    night_premium_amount?: boolean
    total_amount?: boolean
    reason?: boolean
    work_description?: boolean
    pre_approved?: boolean
    status?: boolean
    submitted_at?: boolean
    approved_at?: boolean
    approved_by?: boolean
    rejected_at?: boolean
    rejected_by?: boolean
    rejection_reason?: boolean
    post_confirmed?: boolean
    post_confirmed_at?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["overtimeRequest"]>

  export type OvertimeRequestSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    employee_id?: boolean
    date?: boolean
    day_type?: boolean
    start_time?: boolean
    end_time?: boolean
    hours?: boolean
    ot_type?: boolean
    rate?: boolean
    hourly_rate?: boolean
    amount?: boolean
    has_night_premium?: boolean
    night_hours?: boolean
    night_premium_amount?: boolean
    total_amount?: boolean
    reason?: boolean
    work_description?: boolean
    pre_approved?: boolean
    status?: boolean
    submitted_at?: boolean
    approved_at?: boolean
    approved_by?: boolean
    rejected_at?: boolean
    rejected_by?: boolean
    rejection_reason?: boolean
    post_confirmed?: boolean
    post_confirmed_at?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["overtimeRequest"]>

  export type OvertimeRequestSelectScalar = {
    id?: boolean
    employee_id?: boolean
    date?: boolean
    day_type?: boolean
    start_time?: boolean
    end_time?: boolean
    hours?: boolean
    ot_type?: boolean
    rate?: boolean
    hourly_rate?: boolean
    amount?: boolean
    has_night_premium?: boolean
    night_hours?: boolean
    night_premium_amount?: boolean
    total_amount?: boolean
    reason?: boolean
    work_description?: boolean
    pre_approved?: boolean
    status?: boolean
    submitted_at?: boolean
    approved_at?: boolean
    approved_by?: boolean
    rejected_at?: boolean
    rejected_by?: boolean
    rejection_reason?: boolean
    post_confirmed?: boolean
    post_confirmed_at?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type OvertimeRequestOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "employee_id" | "date" | "day_type" | "start_time" | "end_time" | "hours" | "ot_type" | "rate" | "hourly_rate" | "amount" | "has_night_premium" | "night_hours" | "night_premium_amount" | "total_amount" | "reason" | "work_description" | "pre_approved" | "status" | "submitted_at" | "approved_at" | "approved_by" | "rejected_at" | "rejected_by" | "rejection_reason" | "post_confirmed" | "post_confirmed_at" | "created_at" | "updated_at", ExtArgs["result"]["overtimeRequest"]>

  export type $OvertimeRequestPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "OvertimeRequest"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      employee_id: string
      date: Date
      day_type: string
      start_time: string
      end_time: string
      hours: number
      ot_type: string
      rate: number
      hourly_rate: number
      amount: number
      has_night_premium: boolean
      night_hours: number
      night_premium_amount: number
      total_amount: number
      reason: string
      work_description: string | null
      pre_approved: boolean
      status: string
      submitted_at: Date
      approved_at: Date | null
      approved_by: string | null
      rejected_at: Date | null
      rejected_by: string | null
      rejection_reason: string | null
      post_confirmed: boolean
      post_confirmed_at: Date | null
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["overtimeRequest"]>
    composites: {}
  }

  type OvertimeRequestGetPayload<S extends boolean | null | undefined | OvertimeRequestDefaultArgs> = $Result.GetResult<Prisma.$OvertimeRequestPayload, S>

  type OvertimeRequestCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<OvertimeRequestFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: OvertimeRequestCountAggregateInputType | true
    }

  export interface OvertimeRequestDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['OvertimeRequest'], meta: { name: 'OvertimeRequest' } }
    /**
     * Find zero or one OvertimeRequest that matches the filter.
     * @param {OvertimeRequestFindUniqueArgs} args - Arguments to find a OvertimeRequest
     * @example
     * // Get one OvertimeRequest
     * const overtimeRequest = await prisma.overtimeRequest.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends OvertimeRequestFindUniqueArgs>(args: SelectSubset<T, OvertimeRequestFindUniqueArgs<ExtArgs>>): Prisma__OvertimeRequestClient<$Result.GetResult<Prisma.$OvertimeRequestPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one OvertimeRequest that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {OvertimeRequestFindUniqueOrThrowArgs} args - Arguments to find a OvertimeRequest
     * @example
     * // Get one OvertimeRequest
     * const overtimeRequest = await prisma.overtimeRequest.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends OvertimeRequestFindUniqueOrThrowArgs>(args: SelectSubset<T, OvertimeRequestFindUniqueOrThrowArgs<ExtArgs>>): Prisma__OvertimeRequestClient<$Result.GetResult<Prisma.$OvertimeRequestPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first OvertimeRequest that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OvertimeRequestFindFirstArgs} args - Arguments to find a OvertimeRequest
     * @example
     * // Get one OvertimeRequest
     * const overtimeRequest = await prisma.overtimeRequest.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends OvertimeRequestFindFirstArgs>(args?: SelectSubset<T, OvertimeRequestFindFirstArgs<ExtArgs>>): Prisma__OvertimeRequestClient<$Result.GetResult<Prisma.$OvertimeRequestPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first OvertimeRequest that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OvertimeRequestFindFirstOrThrowArgs} args - Arguments to find a OvertimeRequest
     * @example
     * // Get one OvertimeRequest
     * const overtimeRequest = await prisma.overtimeRequest.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends OvertimeRequestFindFirstOrThrowArgs>(args?: SelectSubset<T, OvertimeRequestFindFirstOrThrowArgs<ExtArgs>>): Prisma__OvertimeRequestClient<$Result.GetResult<Prisma.$OvertimeRequestPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more OvertimeRequests that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OvertimeRequestFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all OvertimeRequests
     * const overtimeRequests = await prisma.overtimeRequest.findMany()
     * 
     * // Get first 10 OvertimeRequests
     * const overtimeRequests = await prisma.overtimeRequest.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const overtimeRequestWithIdOnly = await prisma.overtimeRequest.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends OvertimeRequestFindManyArgs>(args?: SelectSubset<T, OvertimeRequestFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OvertimeRequestPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a OvertimeRequest.
     * @param {OvertimeRequestCreateArgs} args - Arguments to create a OvertimeRequest.
     * @example
     * // Create one OvertimeRequest
     * const OvertimeRequest = await prisma.overtimeRequest.create({
     *   data: {
     *     // ... data to create a OvertimeRequest
     *   }
     * })
     * 
     */
    create<T extends OvertimeRequestCreateArgs>(args: SelectSubset<T, OvertimeRequestCreateArgs<ExtArgs>>): Prisma__OvertimeRequestClient<$Result.GetResult<Prisma.$OvertimeRequestPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many OvertimeRequests.
     * @param {OvertimeRequestCreateManyArgs} args - Arguments to create many OvertimeRequests.
     * @example
     * // Create many OvertimeRequests
     * const overtimeRequest = await prisma.overtimeRequest.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends OvertimeRequestCreateManyArgs>(args?: SelectSubset<T, OvertimeRequestCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many OvertimeRequests and returns the data saved in the database.
     * @param {OvertimeRequestCreateManyAndReturnArgs} args - Arguments to create many OvertimeRequests.
     * @example
     * // Create many OvertimeRequests
     * const overtimeRequest = await prisma.overtimeRequest.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many OvertimeRequests and only return the `id`
     * const overtimeRequestWithIdOnly = await prisma.overtimeRequest.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends OvertimeRequestCreateManyAndReturnArgs>(args?: SelectSubset<T, OvertimeRequestCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OvertimeRequestPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a OvertimeRequest.
     * @param {OvertimeRequestDeleteArgs} args - Arguments to delete one OvertimeRequest.
     * @example
     * // Delete one OvertimeRequest
     * const OvertimeRequest = await prisma.overtimeRequest.delete({
     *   where: {
     *     // ... filter to delete one OvertimeRequest
     *   }
     * })
     * 
     */
    delete<T extends OvertimeRequestDeleteArgs>(args: SelectSubset<T, OvertimeRequestDeleteArgs<ExtArgs>>): Prisma__OvertimeRequestClient<$Result.GetResult<Prisma.$OvertimeRequestPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one OvertimeRequest.
     * @param {OvertimeRequestUpdateArgs} args - Arguments to update one OvertimeRequest.
     * @example
     * // Update one OvertimeRequest
     * const overtimeRequest = await prisma.overtimeRequest.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends OvertimeRequestUpdateArgs>(args: SelectSubset<T, OvertimeRequestUpdateArgs<ExtArgs>>): Prisma__OvertimeRequestClient<$Result.GetResult<Prisma.$OvertimeRequestPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more OvertimeRequests.
     * @param {OvertimeRequestDeleteManyArgs} args - Arguments to filter OvertimeRequests to delete.
     * @example
     * // Delete a few OvertimeRequests
     * const { count } = await prisma.overtimeRequest.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends OvertimeRequestDeleteManyArgs>(args?: SelectSubset<T, OvertimeRequestDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more OvertimeRequests.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OvertimeRequestUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many OvertimeRequests
     * const overtimeRequest = await prisma.overtimeRequest.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends OvertimeRequestUpdateManyArgs>(args: SelectSubset<T, OvertimeRequestUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more OvertimeRequests and returns the data updated in the database.
     * @param {OvertimeRequestUpdateManyAndReturnArgs} args - Arguments to update many OvertimeRequests.
     * @example
     * // Update many OvertimeRequests
     * const overtimeRequest = await prisma.overtimeRequest.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more OvertimeRequests and only return the `id`
     * const overtimeRequestWithIdOnly = await prisma.overtimeRequest.updateManyAndReturn({
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
    updateManyAndReturn<T extends OvertimeRequestUpdateManyAndReturnArgs>(args: SelectSubset<T, OvertimeRequestUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OvertimeRequestPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one OvertimeRequest.
     * @param {OvertimeRequestUpsertArgs} args - Arguments to update or create a OvertimeRequest.
     * @example
     * // Update or create a OvertimeRequest
     * const overtimeRequest = await prisma.overtimeRequest.upsert({
     *   create: {
     *     // ... data to create a OvertimeRequest
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the OvertimeRequest we want to update
     *   }
     * })
     */
    upsert<T extends OvertimeRequestUpsertArgs>(args: SelectSubset<T, OvertimeRequestUpsertArgs<ExtArgs>>): Prisma__OvertimeRequestClient<$Result.GetResult<Prisma.$OvertimeRequestPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of OvertimeRequests.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OvertimeRequestCountArgs} args - Arguments to filter OvertimeRequests to count.
     * @example
     * // Count the number of OvertimeRequests
     * const count = await prisma.overtimeRequest.count({
     *   where: {
     *     // ... the filter for the OvertimeRequests we want to count
     *   }
     * })
    **/
    count<T extends OvertimeRequestCountArgs>(
      args?: Subset<T, OvertimeRequestCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], OvertimeRequestCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a OvertimeRequest.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OvertimeRequestAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends OvertimeRequestAggregateArgs>(args: Subset<T, OvertimeRequestAggregateArgs>): Prisma.PrismaPromise<GetOvertimeRequestAggregateType<T>>

    /**
     * Group by OvertimeRequest.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OvertimeRequestGroupByArgs} args - Group by arguments.
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
      T extends OvertimeRequestGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: OvertimeRequestGroupByArgs['orderBy'] }
        : { orderBy?: OvertimeRequestGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, OvertimeRequestGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOvertimeRequestGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the OvertimeRequest model
   */
  readonly fields: OvertimeRequestFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for OvertimeRequest.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__OvertimeRequestClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the OvertimeRequest model
   */
  interface OvertimeRequestFieldRefs {
    readonly id: FieldRef<"OvertimeRequest", 'String'>
    readonly employee_id: FieldRef<"OvertimeRequest", 'String'>
    readonly date: FieldRef<"OvertimeRequest", 'DateTime'>
    readonly day_type: FieldRef<"OvertimeRequest", 'String'>
    readonly start_time: FieldRef<"OvertimeRequest", 'String'>
    readonly end_time: FieldRef<"OvertimeRequest", 'String'>
    readonly hours: FieldRef<"OvertimeRequest", 'Float'>
    readonly ot_type: FieldRef<"OvertimeRequest", 'String'>
    readonly rate: FieldRef<"OvertimeRequest", 'Float'>
    readonly hourly_rate: FieldRef<"OvertimeRequest", 'Float'>
    readonly amount: FieldRef<"OvertimeRequest", 'Float'>
    readonly has_night_premium: FieldRef<"OvertimeRequest", 'Boolean'>
    readonly night_hours: FieldRef<"OvertimeRequest", 'Float'>
    readonly night_premium_amount: FieldRef<"OvertimeRequest", 'Float'>
    readonly total_amount: FieldRef<"OvertimeRequest", 'Float'>
    readonly reason: FieldRef<"OvertimeRequest", 'String'>
    readonly work_description: FieldRef<"OvertimeRequest", 'String'>
    readonly pre_approved: FieldRef<"OvertimeRequest", 'Boolean'>
    readonly status: FieldRef<"OvertimeRequest", 'String'>
    readonly submitted_at: FieldRef<"OvertimeRequest", 'DateTime'>
    readonly approved_at: FieldRef<"OvertimeRequest", 'DateTime'>
    readonly approved_by: FieldRef<"OvertimeRequest", 'String'>
    readonly rejected_at: FieldRef<"OvertimeRequest", 'DateTime'>
    readonly rejected_by: FieldRef<"OvertimeRequest", 'String'>
    readonly rejection_reason: FieldRef<"OvertimeRequest", 'String'>
    readonly post_confirmed: FieldRef<"OvertimeRequest", 'Boolean'>
    readonly post_confirmed_at: FieldRef<"OvertimeRequest", 'DateTime'>
    readonly created_at: FieldRef<"OvertimeRequest", 'DateTime'>
    readonly updated_at: FieldRef<"OvertimeRequest", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * OvertimeRequest findUnique
   */
  export type OvertimeRequestFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OvertimeRequest
     */
    select?: OvertimeRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OvertimeRequest
     */
    omit?: OvertimeRequestOmit<ExtArgs> | null
    /**
     * Filter, which OvertimeRequest to fetch.
     */
    where: OvertimeRequestWhereUniqueInput
  }

  /**
   * OvertimeRequest findUniqueOrThrow
   */
  export type OvertimeRequestFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OvertimeRequest
     */
    select?: OvertimeRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OvertimeRequest
     */
    omit?: OvertimeRequestOmit<ExtArgs> | null
    /**
     * Filter, which OvertimeRequest to fetch.
     */
    where: OvertimeRequestWhereUniqueInput
  }

  /**
   * OvertimeRequest findFirst
   */
  export type OvertimeRequestFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OvertimeRequest
     */
    select?: OvertimeRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OvertimeRequest
     */
    omit?: OvertimeRequestOmit<ExtArgs> | null
    /**
     * Filter, which OvertimeRequest to fetch.
     */
    where?: OvertimeRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OvertimeRequests to fetch.
     */
    orderBy?: OvertimeRequestOrderByWithRelationInput | OvertimeRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OvertimeRequests.
     */
    cursor?: OvertimeRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OvertimeRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OvertimeRequests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OvertimeRequests.
     */
    distinct?: OvertimeRequestScalarFieldEnum | OvertimeRequestScalarFieldEnum[]
  }

  /**
   * OvertimeRequest findFirstOrThrow
   */
  export type OvertimeRequestFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OvertimeRequest
     */
    select?: OvertimeRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OvertimeRequest
     */
    omit?: OvertimeRequestOmit<ExtArgs> | null
    /**
     * Filter, which OvertimeRequest to fetch.
     */
    where?: OvertimeRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OvertimeRequests to fetch.
     */
    orderBy?: OvertimeRequestOrderByWithRelationInput | OvertimeRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OvertimeRequests.
     */
    cursor?: OvertimeRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OvertimeRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OvertimeRequests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OvertimeRequests.
     */
    distinct?: OvertimeRequestScalarFieldEnum | OvertimeRequestScalarFieldEnum[]
  }

  /**
   * OvertimeRequest findMany
   */
  export type OvertimeRequestFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OvertimeRequest
     */
    select?: OvertimeRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OvertimeRequest
     */
    omit?: OvertimeRequestOmit<ExtArgs> | null
    /**
     * Filter, which OvertimeRequests to fetch.
     */
    where?: OvertimeRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OvertimeRequests to fetch.
     */
    orderBy?: OvertimeRequestOrderByWithRelationInput | OvertimeRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing OvertimeRequests.
     */
    cursor?: OvertimeRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OvertimeRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OvertimeRequests.
     */
    skip?: number
    distinct?: OvertimeRequestScalarFieldEnum | OvertimeRequestScalarFieldEnum[]
  }

  /**
   * OvertimeRequest create
   */
  export type OvertimeRequestCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OvertimeRequest
     */
    select?: OvertimeRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OvertimeRequest
     */
    omit?: OvertimeRequestOmit<ExtArgs> | null
    /**
     * The data needed to create a OvertimeRequest.
     */
    data: XOR<OvertimeRequestCreateInput, OvertimeRequestUncheckedCreateInput>
  }

  /**
   * OvertimeRequest createMany
   */
  export type OvertimeRequestCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many OvertimeRequests.
     */
    data: OvertimeRequestCreateManyInput | OvertimeRequestCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * OvertimeRequest createManyAndReturn
   */
  export type OvertimeRequestCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OvertimeRequest
     */
    select?: OvertimeRequestSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the OvertimeRequest
     */
    omit?: OvertimeRequestOmit<ExtArgs> | null
    /**
     * The data used to create many OvertimeRequests.
     */
    data: OvertimeRequestCreateManyInput | OvertimeRequestCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * OvertimeRequest update
   */
  export type OvertimeRequestUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OvertimeRequest
     */
    select?: OvertimeRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OvertimeRequest
     */
    omit?: OvertimeRequestOmit<ExtArgs> | null
    /**
     * The data needed to update a OvertimeRequest.
     */
    data: XOR<OvertimeRequestUpdateInput, OvertimeRequestUncheckedUpdateInput>
    /**
     * Choose, which OvertimeRequest to update.
     */
    where: OvertimeRequestWhereUniqueInput
  }

  /**
   * OvertimeRequest updateMany
   */
  export type OvertimeRequestUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update OvertimeRequests.
     */
    data: XOR<OvertimeRequestUpdateManyMutationInput, OvertimeRequestUncheckedUpdateManyInput>
    /**
     * Filter which OvertimeRequests to update
     */
    where?: OvertimeRequestWhereInput
    /**
     * Limit how many OvertimeRequests to update.
     */
    limit?: number
  }

  /**
   * OvertimeRequest updateManyAndReturn
   */
  export type OvertimeRequestUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OvertimeRequest
     */
    select?: OvertimeRequestSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the OvertimeRequest
     */
    omit?: OvertimeRequestOmit<ExtArgs> | null
    /**
     * The data used to update OvertimeRequests.
     */
    data: XOR<OvertimeRequestUpdateManyMutationInput, OvertimeRequestUncheckedUpdateManyInput>
    /**
     * Filter which OvertimeRequests to update
     */
    where?: OvertimeRequestWhereInput
    /**
     * Limit how many OvertimeRequests to update.
     */
    limit?: number
  }

  /**
   * OvertimeRequest upsert
   */
  export type OvertimeRequestUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OvertimeRequest
     */
    select?: OvertimeRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OvertimeRequest
     */
    omit?: OvertimeRequestOmit<ExtArgs> | null
    /**
     * The filter to search for the OvertimeRequest to update in case it exists.
     */
    where: OvertimeRequestWhereUniqueInput
    /**
     * In case the OvertimeRequest found by the `where` argument doesn't exist, create a new OvertimeRequest with this data.
     */
    create: XOR<OvertimeRequestCreateInput, OvertimeRequestUncheckedCreateInput>
    /**
     * In case the OvertimeRequest was found with the provided `where` argument, update it with this data.
     */
    update: XOR<OvertimeRequestUpdateInput, OvertimeRequestUncheckedUpdateInput>
  }

  /**
   * OvertimeRequest delete
   */
  export type OvertimeRequestDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OvertimeRequest
     */
    select?: OvertimeRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OvertimeRequest
     */
    omit?: OvertimeRequestOmit<ExtArgs> | null
    /**
     * Filter which OvertimeRequest to delete.
     */
    where: OvertimeRequestWhereUniqueInput
  }

  /**
   * OvertimeRequest deleteMany
   */
  export type OvertimeRequestDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which OvertimeRequests to delete
     */
    where?: OvertimeRequestWhereInput
    /**
     * Limit how many OvertimeRequests to delete.
     */
    limit?: number
  }

  /**
   * OvertimeRequest without action
   */
  export type OvertimeRequestDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OvertimeRequest
     */
    select?: OvertimeRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OvertimeRequest
     */
    omit?: OvertimeRequestOmit<ExtArgs> | null
  }


  /**
   * Model Location
   */

  export type AggregateLocation = {
    _count: LocationCountAggregateOutputType | null
    _avg: LocationAvgAggregateOutputType | null
    _sum: LocationSumAggregateOutputType | null
    _min: LocationMinAggregateOutputType | null
    _max: LocationMaxAggregateOutputType | null
  }

  export type LocationAvgAggregateOutputType = {
    headcount: number | null
  }

  export type LocationSumAggregateOutputType = {
    headcount: number | null
  }

  export type LocationMinAggregateOutputType = {
    id: string | null
    location_code: string | null
    name_en: string | null
    name_th: string | null
    location_type: string | null
    parent_location_id: string | null
    status: string | null
    headcount: number | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type LocationMaxAggregateOutputType = {
    id: string | null
    location_code: string | null
    name_en: string | null
    name_th: string | null
    location_type: string | null
    parent_location_id: string | null
    status: string | null
    headcount: number | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type LocationCountAggregateOutputType = {
    id: number
    location_code: number
    name_en: number
    name_th: number
    location_type: number
    parent_location_id: number
    address: number
    coordinates: number
    status: number
    headcount: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type LocationAvgAggregateInputType = {
    headcount?: true
  }

  export type LocationSumAggregateInputType = {
    headcount?: true
  }

  export type LocationMinAggregateInputType = {
    id?: true
    location_code?: true
    name_en?: true
    name_th?: true
    location_type?: true
    parent_location_id?: true
    status?: true
    headcount?: true
    created_at?: true
    updated_at?: true
  }

  export type LocationMaxAggregateInputType = {
    id?: true
    location_code?: true
    name_en?: true
    name_th?: true
    location_type?: true
    parent_location_id?: true
    status?: true
    headcount?: true
    created_at?: true
    updated_at?: true
  }

  export type LocationCountAggregateInputType = {
    id?: true
    location_code?: true
    name_en?: true
    name_th?: true
    location_type?: true
    parent_location_id?: true
    address?: true
    coordinates?: true
    status?: true
    headcount?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type LocationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Location to aggregate.
     */
    where?: LocationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Locations to fetch.
     */
    orderBy?: LocationOrderByWithRelationInput | LocationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: LocationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Locations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Locations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Locations
    **/
    _count?: true | LocationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: LocationAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: LocationSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: LocationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: LocationMaxAggregateInputType
  }

  export type GetLocationAggregateType<T extends LocationAggregateArgs> = {
        [P in keyof T & keyof AggregateLocation]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLocation[P]>
      : GetScalarType<T[P], AggregateLocation[P]>
  }




  export type LocationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LocationWhereInput
    orderBy?: LocationOrderByWithAggregationInput | LocationOrderByWithAggregationInput[]
    by: LocationScalarFieldEnum[] | LocationScalarFieldEnum
    having?: LocationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: LocationCountAggregateInputType | true
    _avg?: LocationAvgAggregateInputType
    _sum?: LocationSumAggregateInputType
    _min?: LocationMinAggregateInputType
    _max?: LocationMaxAggregateInputType
  }

  export type LocationGroupByOutputType = {
    id: string
    location_code: string
    name_en: string
    name_th: string | null
    location_type: string
    parent_location_id: string | null
    address: JsonValue | null
    coordinates: JsonValue | null
    status: string
    headcount: number
    created_at: Date
    updated_at: Date
    _count: LocationCountAggregateOutputType | null
    _avg: LocationAvgAggregateOutputType | null
    _sum: LocationSumAggregateOutputType | null
    _min: LocationMinAggregateOutputType | null
    _max: LocationMaxAggregateOutputType | null
  }

  type GetLocationGroupByPayload<T extends LocationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<LocationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof LocationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], LocationGroupByOutputType[P]>
            : GetScalarType<T[P], LocationGroupByOutputType[P]>
        }
      >
    >


  export type LocationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    location_code?: boolean
    name_en?: boolean
    name_th?: boolean
    location_type?: boolean
    parent_location_id?: boolean
    address?: boolean
    coordinates?: boolean
    status?: boolean
    headcount?: boolean
    created_at?: boolean
    updated_at?: boolean
    parent?: boolean | Location$parentArgs<ExtArgs>
    children?: boolean | Location$childrenArgs<ExtArgs>
    employee_locations?: boolean | Location$employee_locationsArgs<ExtArgs>
    _count?: boolean | LocationCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["location"]>

  export type LocationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    location_code?: boolean
    name_en?: boolean
    name_th?: boolean
    location_type?: boolean
    parent_location_id?: boolean
    address?: boolean
    coordinates?: boolean
    status?: boolean
    headcount?: boolean
    created_at?: boolean
    updated_at?: boolean
    parent?: boolean | Location$parentArgs<ExtArgs>
  }, ExtArgs["result"]["location"]>

  export type LocationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    location_code?: boolean
    name_en?: boolean
    name_th?: boolean
    location_type?: boolean
    parent_location_id?: boolean
    address?: boolean
    coordinates?: boolean
    status?: boolean
    headcount?: boolean
    created_at?: boolean
    updated_at?: boolean
    parent?: boolean | Location$parentArgs<ExtArgs>
  }, ExtArgs["result"]["location"]>

  export type LocationSelectScalar = {
    id?: boolean
    location_code?: boolean
    name_en?: boolean
    name_th?: boolean
    location_type?: boolean
    parent_location_id?: boolean
    address?: boolean
    coordinates?: boolean
    status?: boolean
    headcount?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type LocationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "location_code" | "name_en" | "name_th" | "location_type" | "parent_location_id" | "address" | "coordinates" | "status" | "headcount" | "created_at" | "updated_at", ExtArgs["result"]["location"]>
  export type LocationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    parent?: boolean | Location$parentArgs<ExtArgs>
    children?: boolean | Location$childrenArgs<ExtArgs>
    employee_locations?: boolean | Location$employee_locationsArgs<ExtArgs>
    _count?: boolean | LocationCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type LocationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    parent?: boolean | Location$parentArgs<ExtArgs>
  }
  export type LocationIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    parent?: boolean | Location$parentArgs<ExtArgs>
  }

  export type $LocationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Location"
    objects: {
      parent: Prisma.$LocationPayload<ExtArgs> | null
      children: Prisma.$LocationPayload<ExtArgs>[]
      employee_locations: Prisma.$EmployeeLocationPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      location_code: string
      name_en: string
      name_th: string | null
      location_type: string
      parent_location_id: string | null
      address: Prisma.JsonValue | null
      coordinates: Prisma.JsonValue | null
      status: string
      headcount: number
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["location"]>
    composites: {}
  }

  type LocationGetPayload<S extends boolean | null | undefined | LocationDefaultArgs> = $Result.GetResult<Prisma.$LocationPayload, S>

  type LocationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<LocationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: LocationCountAggregateInputType | true
    }

  export interface LocationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Location'], meta: { name: 'Location' } }
    /**
     * Find zero or one Location that matches the filter.
     * @param {LocationFindUniqueArgs} args - Arguments to find a Location
     * @example
     * // Get one Location
     * const location = await prisma.location.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends LocationFindUniqueArgs>(args: SelectSubset<T, LocationFindUniqueArgs<ExtArgs>>): Prisma__LocationClient<$Result.GetResult<Prisma.$LocationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Location that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {LocationFindUniqueOrThrowArgs} args - Arguments to find a Location
     * @example
     * // Get one Location
     * const location = await prisma.location.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends LocationFindUniqueOrThrowArgs>(args: SelectSubset<T, LocationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__LocationClient<$Result.GetResult<Prisma.$LocationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Location that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LocationFindFirstArgs} args - Arguments to find a Location
     * @example
     * // Get one Location
     * const location = await prisma.location.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends LocationFindFirstArgs>(args?: SelectSubset<T, LocationFindFirstArgs<ExtArgs>>): Prisma__LocationClient<$Result.GetResult<Prisma.$LocationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Location that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LocationFindFirstOrThrowArgs} args - Arguments to find a Location
     * @example
     * // Get one Location
     * const location = await prisma.location.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends LocationFindFirstOrThrowArgs>(args?: SelectSubset<T, LocationFindFirstOrThrowArgs<ExtArgs>>): Prisma__LocationClient<$Result.GetResult<Prisma.$LocationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Locations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LocationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Locations
     * const locations = await prisma.location.findMany()
     * 
     * // Get first 10 Locations
     * const locations = await prisma.location.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const locationWithIdOnly = await prisma.location.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends LocationFindManyArgs>(args?: SelectSubset<T, LocationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LocationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Location.
     * @param {LocationCreateArgs} args - Arguments to create a Location.
     * @example
     * // Create one Location
     * const Location = await prisma.location.create({
     *   data: {
     *     // ... data to create a Location
     *   }
     * })
     * 
     */
    create<T extends LocationCreateArgs>(args: SelectSubset<T, LocationCreateArgs<ExtArgs>>): Prisma__LocationClient<$Result.GetResult<Prisma.$LocationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Locations.
     * @param {LocationCreateManyArgs} args - Arguments to create many Locations.
     * @example
     * // Create many Locations
     * const location = await prisma.location.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends LocationCreateManyArgs>(args?: SelectSubset<T, LocationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Locations and returns the data saved in the database.
     * @param {LocationCreateManyAndReturnArgs} args - Arguments to create many Locations.
     * @example
     * // Create many Locations
     * const location = await prisma.location.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Locations and only return the `id`
     * const locationWithIdOnly = await prisma.location.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends LocationCreateManyAndReturnArgs>(args?: SelectSubset<T, LocationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LocationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Location.
     * @param {LocationDeleteArgs} args - Arguments to delete one Location.
     * @example
     * // Delete one Location
     * const Location = await prisma.location.delete({
     *   where: {
     *     // ... filter to delete one Location
     *   }
     * })
     * 
     */
    delete<T extends LocationDeleteArgs>(args: SelectSubset<T, LocationDeleteArgs<ExtArgs>>): Prisma__LocationClient<$Result.GetResult<Prisma.$LocationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Location.
     * @param {LocationUpdateArgs} args - Arguments to update one Location.
     * @example
     * // Update one Location
     * const location = await prisma.location.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends LocationUpdateArgs>(args: SelectSubset<T, LocationUpdateArgs<ExtArgs>>): Prisma__LocationClient<$Result.GetResult<Prisma.$LocationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Locations.
     * @param {LocationDeleteManyArgs} args - Arguments to filter Locations to delete.
     * @example
     * // Delete a few Locations
     * const { count } = await prisma.location.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends LocationDeleteManyArgs>(args?: SelectSubset<T, LocationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Locations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LocationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Locations
     * const location = await prisma.location.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends LocationUpdateManyArgs>(args: SelectSubset<T, LocationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Locations and returns the data updated in the database.
     * @param {LocationUpdateManyAndReturnArgs} args - Arguments to update many Locations.
     * @example
     * // Update many Locations
     * const location = await prisma.location.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Locations and only return the `id`
     * const locationWithIdOnly = await prisma.location.updateManyAndReturn({
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
    updateManyAndReturn<T extends LocationUpdateManyAndReturnArgs>(args: SelectSubset<T, LocationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LocationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Location.
     * @param {LocationUpsertArgs} args - Arguments to update or create a Location.
     * @example
     * // Update or create a Location
     * const location = await prisma.location.upsert({
     *   create: {
     *     // ... data to create a Location
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Location we want to update
     *   }
     * })
     */
    upsert<T extends LocationUpsertArgs>(args: SelectSubset<T, LocationUpsertArgs<ExtArgs>>): Prisma__LocationClient<$Result.GetResult<Prisma.$LocationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Locations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LocationCountArgs} args - Arguments to filter Locations to count.
     * @example
     * // Count the number of Locations
     * const count = await prisma.location.count({
     *   where: {
     *     // ... the filter for the Locations we want to count
     *   }
     * })
    **/
    count<T extends LocationCountArgs>(
      args?: Subset<T, LocationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], LocationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Location.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LocationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends LocationAggregateArgs>(args: Subset<T, LocationAggregateArgs>): Prisma.PrismaPromise<GetLocationAggregateType<T>>

    /**
     * Group by Location.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LocationGroupByArgs} args - Group by arguments.
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
      T extends LocationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: LocationGroupByArgs['orderBy'] }
        : { orderBy?: LocationGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, LocationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLocationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Location model
   */
  readonly fields: LocationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Location.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__LocationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    parent<T extends Location$parentArgs<ExtArgs> = {}>(args?: Subset<T, Location$parentArgs<ExtArgs>>): Prisma__LocationClient<$Result.GetResult<Prisma.$LocationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    children<T extends Location$childrenArgs<ExtArgs> = {}>(args?: Subset<T, Location$childrenArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LocationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    employee_locations<T extends Location$employee_locationsArgs<ExtArgs> = {}>(args?: Subset<T, Location$employee_locationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmployeeLocationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Location model
   */
  interface LocationFieldRefs {
    readonly id: FieldRef<"Location", 'String'>
    readonly location_code: FieldRef<"Location", 'String'>
    readonly name_en: FieldRef<"Location", 'String'>
    readonly name_th: FieldRef<"Location", 'String'>
    readonly location_type: FieldRef<"Location", 'String'>
    readonly parent_location_id: FieldRef<"Location", 'String'>
    readonly address: FieldRef<"Location", 'Json'>
    readonly coordinates: FieldRef<"Location", 'Json'>
    readonly status: FieldRef<"Location", 'String'>
    readonly headcount: FieldRef<"Location", 'Int'>
    readonly created_at: FieldRef<"Location", 'DateTime'>
    readonly updated_at: FieldRef<"Location", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Location findUnique
   */
  export type LocationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Location
     */
    select?: LocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Location
     */
    omit?: LocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocationInclude<ExtArgs> | null
    /**
     * Filter, which Location to fetch.
     */
    where: LocationWhereUniqueInput
  }

  /**
   * Location findUniqueOrThrow
   */
  export type LocationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Location
     */
    select?: LocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Location
     */
    omit?: LocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocationInclude<ExtArgs> | null
    /**
     * Filter, which Location to fetch.
     */
    where: LocationWhereUniqueInput
  }

  /**
   * Location findFirst
   */
  export type LocationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Location
     */
    select?: LocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Location
     */
    omit?: LocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocationInclude<ExtArgs> | null
    /**
     * Filter, which Location to fetch.
     */
    where?: LocationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Locations to fetch.
     */
    orderBy?: LocationOrderByWithRelationInput | LocationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Locations.
     */
    cursor?: LocationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Locations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Locations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Locations.
     */
    distinct?: LocationScalarFieldEnum | LocationScalarFieldEnum[]
  }

  /**
   * Location findFirstOrThrow
   */
  export type LocationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Location
     */
    select?: LocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Location
     */
    omit?: LocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocationInclude<ExtArgs> | null
    /**
     * Filter, which Location to fetch.
     */
    where?: LocationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Locations to fetch.
     */
    orderBy?: LocationOrderByWithRelationInput | LocationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Locations.
     */
    cursor?: LocationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Locations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Locations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Locations.
     */
    distinct?: LocationScalarFieldEnum | LocationScalarFieldEnum[]
  }

  /**
   * Location findMany
   */
  export type LocationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Location
     */
    select?: LocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Location
     */
    omit?: LocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocationInclude<ExtArgs> | null
    /**
     * Filter, which Locations to fetch.
     */
    where?: LocationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Locations to fetch.
     */
    orderBy?: LocationOrderByWithRelationInput | LocationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Locations.
     */
    cursor?: LocationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Locations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Locations.
     */
    skip?: number
    distinct?: LocationScalarFieldEnum | LocationScalarFieldEnum[]
  }

  /**
   * Location create
   */
  export type LocationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Location
     */
    select?: LocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Location
     */
    omit?: LocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocationInclude<ExtArgs> | null
    /**
     * The data needed to create a Location.
     */
    data: XOR<LocationCreateInput, LocationUncheckedCreateInput>
  }

  /**
   * Location createMany
   */
  export type LocationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Locations.
     */
    data: LocationCreateManyInput | LocationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Location createManyAndReturn
   */
  export type LocationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Location
     */
    select?: LocationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Location
     */
    omit?: LocationOmit<ExtArgs> | null
    /**
     * The data used to create many Locations.
     */
    data: LocationCreateManyInput | LocationCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocationIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Location update
   */
  export type LocationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Location
     */
    select?: LocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Location
     */
    omit?: LocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocationInclude<ExtArgs> | null
    /**
     * The data needed to update a Location.
     */
    data: XOR<LocationUpdateInput, LocationUncheckedUpdateInput>
    /**
     * Choose, which Location to update.
     */
    where: LocationWhereUniqueInput
  }

  /**
   * Location updateMany
   */
  export type LocationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Locations.
     */
    data: XOR<LocationUpdateManyMutationInput, LocationUncheckedUpdateManyInput>
    /**
     * Filter which Locations to update
     */
    where?: LocationWhereInput
    /**
     * Limit how many Locations to update.
     */
    limit?: number
  }

  /**
   * Location updateManyAndReturn
   */
  export type LocationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Location
     */
    select?: LocationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Location
     */
    omit?: LocationOmit<ExtArgs> | null
    /**
     * The data used to update Locations.
     */
    data: XOR<LocationUpdateManyMutationInput, LocationUncheckedUpdateManyInput>
    /**
     * Filter which Locations to update
     */
    where?: LocationWhereInput
    /**
     * Limit how many Locations to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocationIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Location upsert
   */
  export type LocationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Location
     */
    select?: LocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Location
     */
    omit?: LocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocationInclude<ExtArgs> | null
    /**
     * The filter to search for the Location to update in case it exists.
     */
    where: LocationWhereUniqueInput
    /**
     * In case the Location found by the `where` argument doesn't exist, create a new Location with this data.
     */
    create: XOR<LocationCreateInput, LocationUncheckedCreateInput>
    /**
     * In case the Location was found with the provided `where` argument, update it with this data.
     */
    update: XOR<LocationUpdateInput, LocationUncheckedUpdateInput>
  }

  /**
   * Location delete
   */
  export type LocationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Location
     */
    select?: LocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Location
     */
    omit?: LocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocationInclude<ExtArgs> | null
    /**
     * Filter which Location to delete.
     */
    where: LocationWhereUniqueInput
  }

  /**
   * Location deleteMany
   */
  export type LocationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Locations to delete
     */
    where?: LocationWhereInput
    /**
     * Limit how many Locations to delete.
     */
    limit?: number
  }

  /**
   * Location.parent
   */
  export type Location$parentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Location
     */
    select?: LocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Location
     */
    omit?: LocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocationInclude<ExtArgs> | null
    where?: LocationWhereInput
  }

  /**
   * Location.children
   */
  export type Location$childrenArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Location
     */
    select?: LocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Location
     */
    omit?: LocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocationInclude<ExtArgs> | null
    where?: LocationWhereInput
    orderBy?: LocationOrderByWithRelationInput | LocationOrderByWithRelationInput[]
    cursor?: LocationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: LocationScalarFieldEnum | LocationScalarFieldEnum[]
  }

  /**
   * Location.employee_locations
   */
  export type Location$employee_locationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmployeeLocation
     */
    select?: EmployeeLocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmployeeLocation
     */
    omit?: EmployeeLocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeLocationInclude<ExtArgs> | null
    where?: EmployeeLocationWhereInput
    orderBy?: EmployeeLocationOrderByWithRelationInput | EmployeeLocationOrderByWithRelationInput[]
    cursor?: EmployeeLocationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: EmployeeLocationScalarFieldEnum | EmployeeLocationScalarFieldEnum[]
  }

  /**
   * Location without action
   */
  export type LocationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Location
     */
    select?: LocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Location
     */
    omit?: LocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocationInclude<ExtArgs> | null
  }


  /**
   * Model EmployeeLocation
   */

  export type AggregateEmployeeLocation = {
    _count: EmployeeLocationCountAggregateOutputType | null
    _min: EmployeeLocationMinAggregateOutputType | null
    _max: EmployeeLocationMaxAggregateOutputType | null
  }

  export type EmployeeLocationMinAggregateOutputType = {
    id: string | null
    employee_id: string | null
    location_id: string | null
    location_type: string | null
    effective_date: Date | null
    end_date: Date | null
    status: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type EmployeeLocationMaxAggregateOutputType = {
    id: string | null
    employee_id: string | null
    location_id: string | null
    location_type: string | null
    effective_date: Date | null
    end_date: Date | null
    status: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type EmployeeLocationCountAggregateOutputType = {
    id: number
    employee_id: number
    location_id: number
    location_type: number
    effective_date: number
    end_date: number
    status: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type EmployeeLocationMinAggregateInputType = {
    id?: true
    employee_id?: true
    location_id?: true
    location_type?: true
    effective_date?: true
    end_date?: true
    status?: true
    created_at?: true
    updated_at?: true
  }

  export type EmployeeLocationMaxAggregateInputType = {
    id?: true
    employee_id?: true
    location_id?: true
    location_type?: true
    effective_date?: true
    end_date?: true
    status?: true
    created_at?: true
    updated_at?: true
  }

  export type EmployeeLocationCountAggregateInputType = {
    id?: true
    employee_id?: true
    location_id?: true
    location_type?: true
    effective_date?: true
    end_date?: true
    status?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type EmployeeLocationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which EmployeeLocation to aggregate.
     */
    where?: EmployeeLocationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EmployeeLocations to fetch.
     */
    orderBy?: EmployeeLocationOrderByWithRelationInput | EmployeeLocationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: EmployeeLocationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EmployeeLocations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EmployeeLocations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned EmployeeLocations
    **/
    _count?: true | EmployeeLocationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EmployeeLocationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EmployeeLocationMaxAggregateInputType
  }

  export type GetEmployeeLocationAggregateType<T extends EmployeeLocationAggregateArgs> = {
        [P in keyof T & keyof AggregateEmployeeLocation]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEmployeeLocation[P]>
      : GetScalarType<T[P], AggregateEmployeeLocation[P]>
  }




  export type EmployeeLocationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EmployeeLocationWhereInput
    orderBy?: EmployeeLocationOrderByWithAggregationInput | EmployeeLocationOrderByWithAggregationInput[]
    by: EmployeeLocationScalarFieldEnum[] | EmployeeLocationScalarFieldEnum
    having?: EmployeeLocationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EmployeeLocationCountAggregateInputType | true
    _min?: EmployeeLocationMinAggregateInputType
    _max?: EmployeeLocationMaxAggregateInputType
  }

  export type EmployeeLocationGroupByOutputType = {
    id: string
    employee_id: string
    location_id: string
    location_type: string
    effective_date: Date
    end_date: Date | null
    status: string
    created_at: Date
    updated_at: Date
    _count: EmployeeLocationCountAggregateOutputType | null
    _min: EmployeeLocationMinAggregateOutputType | null
    _max: EmployeeLocationMaxAggregateOutputType | null
  }

  type GetEmployeeLocationGroupByPayload<T extends EmployeeLocationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EmployeeLocationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EmployeeLocationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EmployeeLocationGroupByOutputType[P]>
            : GetScalarType<T[P], EmployeeLocationGroupByOutputType[P]>
        }
      >
    >


  export type EmployeeLocationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    employee_id?: boolean
    location_id?: boolean
    location_type?: boolean
    effective_date?: boolean
    end_date?: boolean
    status?: boolean
    created_at?: boolean
    updated_at?: boolean
    location?: boolean | LocationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["employeeLocation"]>

  export type EmployeeLocationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    employee_id?: boolean
    location_id?: boolean
    location_type?: boolean
    effective_date?: boolean
    end_date?: boolean
    status?: boolean
    created_at?: boolean
    updated_at?: boolean
    location?: boolean | LocationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["employeeLocation"]>

  export type EmployeeLocationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    employee_id?: boolean
    location_id?: boolean
    location_type?: boolean
    effective_date?: boolean
    end_date?: boolean
    status?: boolean
    created_at?: boolean
    updated_at?: boolean
    location?: boolean | LocationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["employeeLocation"]>

  export type EmployeeLocationSelectScalar = {
    id?: boolean
    employee_id?: boolean
    location_id?: boolean
    location_type?: boolean
    effective_date?: boolean
    end_date?: boolean
    status?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type EmployeeLocationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "employee_id" | "location_id" | "location_type" | "effective_date" | "end_date" | "status" | "created_at" | "updated_at", ExtArgs["result"]["employeeLocation"]>
  export type EmployeeLocationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    location?: boolean | LocationDefaultArgs<ExtArgs>
  }
  export type EmployeeLocationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    location?: boolean | LocationDefaultArgs<ExtArgs>
  }
  export type EmployeeLocationIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    location?: boolean | LocationDefaultArgs<ExtArgs>
  }

  export type $EmployeeLocationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "EmployeeLocation"
    objects: {
      location: Prisma.$LocationPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      employee_id: string
      location_id: string
      location_type: string
      effective_date: Date
      end_date: Date | null
      status: string
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["employeeLocation"]>
    composites: {}
  }

  type EmployeeLocationGetPayload<S extends boolean | null | undefined | EmployeeLocationDefaultArgs> = $Result.GetResult<Prisma.$EmployeeLocationPayload, S>

  type EmployeeLocationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<EmployeeLocationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: EmployeeLocationCountAggregateInputType | true
    }

  export interface EmployeeLocationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['EmployeeLocation'], meta: { name: 'EmployeeLocation' } }
    /**
     * Find zero or one EmployeeLocation that matches the filter.
     * @param {EmployeeLocationFindUniqueArgs} args - Arguments to find a EmployeeLocation
     * @example
     * // Get one EmployeeLocation
     * const employeeLocation = await prisma.employeeLocation.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends EmployeeLocationFindUniqueArgs>(args: SelectSubset<T, EmployeeLocationFindUniqueArgs<ExtArgs>>): Prisma__EmployeeLocationClient<$Result.GetResult<Prisma.$EmployeeLocationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one EmployeeLocation that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {EmployeeLocationFindUniqueOrThrowArgs} args - Arguments to find a EmployeeLocation
     * @example
     * // Get one EmployeeLocation
     * const employeeLocation = await prisma.employeeLocation.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends EmployeeLocationFindUniqueOrThrowArgs>(args: SelectSubset<T, EmployeeLocationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__EmployeeLocationClient<$Result.GetResult<Prisma.$EmployeeLocationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first EmployeeLocation that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployeeLocationFindFirstArgs} args - Arguments to find a EmployeeLocation
     * @example
     * // Get one EmployeeLocation
     * const employeeLocation = await prisma.employeeLocation.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends EmployeeLocationFindFirstArgs>(args?: SelectSubset<T, EmployeeLocationFindFirstArgs<ExtArgs>>): Prisma__EmployeeLocationClient<$Result.GetResult<Prisma.$EmployeeLocationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first EmployeeLocation that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployeeLocationFindFirstOrThrowArgs} args - Arguments to find a EmployeeLocation
     * @example
     * // Get one EmployeeLocation
     * const employeeLocation = await prisma.employeeLocation.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends EmployeeLocationFindFirstOrThrowArgs>(args?: SelectSubset<T, EmployeeLocationFindFirstOrThrowArgs<ExtArgs>>): Prisma__EmployeeLocationClient<$Result.GetResult<Prisma.$EmployeeLocationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more EmployeeLocations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployeeLocationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all EmployeeLocations
     * const employeeLocations = await prisma.employeeLocation.findMany()
     * 
     * // Get first 10 EmployeeLocations
     * const employeeLocations = await prisma.employeeLocation.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const employeeLocationWithIdOnly = await prisma.employeeLocation.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends EmployeeLocationFindManyArgs>(args?: SelectSubset<T, EmployeeLocationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmployeeLocationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a EmployeeLocation.
     * @param {EmployeeLocationCreateArgs} args - Arguments to create a EmployeeLocation.
     * @example
     * // Create one EmployeeLocation
     * const EmployeeLocation = await prisma.employeeLocation.create({
     *   data: {
     *     // ... data to create a EmployeeLocation
     *   }
     * })
     * 
     */
    create<T extends EmployeeLocationCreateArgs>(args: SelectSubset<T, EmployeeLocationCreateArgs<ExtArgs>>): Prisma__EmployeeLocationClient<$Result.GetResult<Prisma.$EmployeeLocationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many EmployeeLocations.
     * @param {EmployeeLocationCreateManyArgs} args - Arguments to create many EmployeeLocations.
     * @example
     * // Create many EmployeeLocations
     * const employeeLocation = await prisma.employeeLocation.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends EmployeeLocationCreateManyArgs>(args?: SelectSubset<T, EmployeeLocationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many EmployeeLocations and returns the data saved in the database.
     * @param {EmployeeLocationCreateManyAndReturnArgs} args - Arguments to create many EmployeeLocations.
     * @example
     * // Create many EmployeeLocations
     * const employeeLocation = await prisma.employeeLocation.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many EmployeeLocations and only return the `id`
     * const employeeLocationWithIdOnly = await prisma.employeeLocation.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends EmployeeLocationCreateManyAndReturnArgs>(args?: SelectSubset<T, EmployeeLocationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmployeeLocationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a EmployeeLocation.
     * @param {EmployeeLocationDeleteArgs} args - Arguments to delete one EmployeeLocation.
     * @example
     * // Delete one EmployeeLocation
     * const EmployeeLocation = await prisma.employeeLocation.delete({
     *   where: {
     *     // ... filter to delete one EmployeeLocation
     *   }
     * })
     * 
     */
    delete<T extends EmployeeLocationDeleteArgs>(args: SelectSubset<T, EmployeeLocationDeleteArgs<ExtArgs>>): Prisma__EmployeeLocationClient<$Result.GetResult<Prisma.$EmployeeLocationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one EmployeeLocation.
     * @param {EmployeeLocationUpdateArgs} args - Arguments to update one EmployeeLocation.
     * @example
     * // Update one EmployeeLocation
     * const employeeLocation = await prisma.employeeLocation.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends EmployeeLocationUpdateArgs>(args: SelectSubset<T, EmployeeLocationUpdateArgs<ExtArgs>>): Prisma__EmployeeLocationClient<$Result.GetResult<Prisma.$EmployeeLocationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more EmployeeLocations.
     * @param {EmployeeLocationDeleteManyArgs} args - Arguments to filter EmployeeLocations to delete.
     * @example
     * // Delete a few EmployeeLocations
     * const { count } = await prisma.employeeLocation.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends EmployeeLocationDeleteManyArgs>(args?: SelectSubset<T, EmployeeLocationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more EmployeeLocations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployeeLocationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many EmployeeLocations
     * const employeeLocation = await prisma.employeeLocation.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends EmployeeLocationUpdateManyArgs>(args: SelectSubset<T, EmployeeLocationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more EmployeeLocations and returns the data updated in the database.
     * @param {EmployeeLocationUpdateManyAndReturnArgs} args - Arguments to update many EmployeeLocations.
     * @example
     * // Update many EmployeeLocations
     * const employeeLocation = await prisma.employeeLocation.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more EmployeeLocations and only return the `id`
     * const employeeLocationWithIdOnly = await prisma.employeeLocation.updateManyAndReturn({
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
    updateManyAndReturn<T extends EmployeeLocationUpdateManyAndReturnArgs>(args: SelectSubset<T, EmployeeLocationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmployeeLocationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one EmployeeLocation.
     * @param {EmployeeLocationUpsertArgs} args - Arguments to update or create a EmployeeLocation.
     * @example
     * // Update or create a EmployeeLocation
     * const employeeLocation = await prisma.employeeLocation.upsert({
     *   create: {
     *     // ... data to create a EmployeeLocation
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the EmployeeLocation we want to update
     *   }
     * })
     */
    upsert<T extends EmployeeLocationUpsertArgs>(args: SelectSubset<T, EmployeeLocationUpsertArgs<ExtArgs>>): Prisma__EmployeeLocationClient<$Result.GetResult<Prisma.$EmployeeLocationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of EmployeeLocations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployeeLocationCountArgs} args - Arguments to filter EmployeeLocations to count.
     * @example
     * // Count the number of EmployeeLocations
     * const count = await prisma.employeeLocation.count({
     *   where: {
     *     // ... the filter for the EmployeeLocations we want to count
     *   }
     * })
    **/
    count<T extends EmployeeLocationCountArgs>(
      args?: Subset<T, EmployeeLocationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EmployeeLocationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a EmployeeLocation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployeeLocationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends EmployeeLocationAggregateArgs>(args: Subset<T, EmployeeLocationAggregateArgs>): Prisma.PrismaPromise<GetEmployeeLocationAggregateType<T>>

    /**
     * Group by EmployeeLocation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployeeLocationGroupByArgs} args - Group by arguments.
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
      T extends EmployeeLocationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EmployeeLocationGroupByArgs['orderBy'] }
        : { orderBy?: EmployeeLocationGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, EmployeeLocationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEmployeeLocationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the EmployeeLocation model
   */
  readonly fields: EmployeeLocationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for EmployeeLocation.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__EmployeeLocationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    location<T extends LocationDefaultArgs<ExtArgs> = {}>(args?: Subset<T, LocationDefaultArgs<ExtArgs>>): Prisma__LocationClient<$Result.GetResult<Prisma.$LocationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the EmployeeLocation model
   */
  interface EmployeeLocationFieldRefs {
    readonly id: FieldRef<"EmployeeLocation", 'String'>
    readonly employee_id: FieldRef<"EmployeeLocation", 'String'>
    readonly location_id: FieldRef<"EmployeeLocation", 'String'>
    readonly location_type: FieldRef<"EmployeeLocation", 'String'>
    readonly effective_date: FieldRef<"EmployeeLocation", 'DateTime'>
    readonly end_date: FieldRef<"EmployeeLocation", 'DateTime'>
    readonly status: FieldRef<"EmployeeLocation", 'String'>
    readonly created_at: FieldRef<"EmployeeLocation", 'DateTime'>
    readonly updated_at: FieldRef<"EmployeeLocation", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * EmployeeLocation findUnique
   */
  export type EmployeeLocationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmployeeLocation
     */
    select?: EmployeeLocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmployeeLocation
     */
    omit?: EmployeeLocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeLocationInclude<ExtArgs> | null
    /**
     * Filter, which EmployeeLocation to fetch.
     */
    where: EmployeeLocationWhereUniqueInput
  }

  /**
   * EmployeeLocation findUniqueOrThrow
   */
  export type EmployeeLocationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmployeeLocation
     */
    select?: EmployeeLocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmployeeLocation
     */
    omit?: EmployeeLocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeLocationInclude<ExtArgs> | null
    /**
     * Filter, which EmployeeLocation to fetch.
     */
    where: EmployeeLocationWhereUniqueInput
  }

  /**
   * EmployeeLocation findFirst
   */
  export type EmployeeLocationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmployeeLocation
     */
    select?: EmployeeLocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmployeeLocation
     */
    omit?: EmployeeLocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeLocationInclude<ExtArgs> | null
    /**
     * Filter, which EmployeeLocation to fetch.
     */
    where?: EmployeeLocationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EmployeeLocations to fetch.
     */
    orderBy?: EmployeeLocationOrderByWithRelationInput | EmployeeLocationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for EmployeeLocations.
     */
    cursor?: EmployeeLocationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EmployeeLocations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EmployeeLocations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EmployeeLocations.
     */
    distinct?: EmployeeLocationScalarFieldEnum | EmployeeLocationScalarFieldEnum[]
  }

  /**
   * EmployeeLocation findFirstOrThrow
   */
  export type EmployeeLocationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmployeeLocation
     */
    select?: EmployeeLocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmployeeLocation
     */
    omit?: EmployeeLocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeLocationInclude<ExtArgs> | null
    /**
     * Filter, which EmployeeLocation to fetch.
     */
    where?: EmployeeLocationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EmployeeLocations to fetch.
     */
    orderBy?: EmployeeLocationOrderByWithRelationInput | EmployeeLocationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for EmployeeLocations.
     */
    cursor?: EmployeeLocationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EmployeeLocations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EmployeeLocations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EmployeeLocations.
     */
    distinct?: EmployeeLocationScalarFieldEnum | EmployeeLocationScalarFieldEnum[]
  }

  /**
   * EmployeeLocation findMany
   */
  export type EmployeeLocationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmployeeLocation
     */
    select?: EmployeeLocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmployeeLocation
     */
    omit?: EmployeeLocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeLocationInclude<ExtArgs> | null
    /**
     * Filter, which EmployeeLocations to fetch.
     */
    where?: EmployeeLocationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EmployeeLocations to fetch.
     */
    orderBy?: EmployeeLocationOrderByWithRelationInput | EmployeeLocationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing EmployeeLocations.
     */
    cursor?: EmployeeLocationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EmployeeLocations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EmployeeLocations.
     */
    skip?: number
    distinct?: EmployeeLocationScalarFieldEnum | EmployeeLocationScalarFieldEnum[]
  }

  /**
   * EmployeeLocation create
   */
  export type EmployeeLocationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmployeeLocation
     */
    select?: EmployeeLocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmployeeLocation
     */
    omit?: EmployeeLocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeLocationInclude<ExtArgs> | null
    /**
     * The data needed to create a EmployeeLocation.
     */
    data: XOR<EmployeeLocationCreateInput, EmployeeLocationUncheckedCreateInput>
  }

  /**
   * EmployeeLocation createMany
   */
  export type EmployeeLocationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many EmployeeLocations.
     */
    data: EmployeeLocationCreateManyInput | EmployeeLocationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * EmployeeLocation createManyAndReturn
   */
  export type EmployeeLocationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmployeeLocation
     */
    select?: EmployeeLocationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the EmployeeLocation
     */
    omit?: EmployeeLocationOmit<ExtArgs> | null
    /**
     * The data used to create many EmployeeLocations.
     */
    data: EmployeeLocationCreateManyInput | EmployeeLocationCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeLocationIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * EmployeeLocation update
   */
  export type EmployeeLocationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmployeeLocation
     */
    select?: EmployeeLocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmployeeLocation
     */
    omit?: EmployeeLocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeLocationInclude<ExtArgs> | null
    /**
     * The data needed to update a EmployeeLocation.
     */
    data: XOR<EmployeeLocationUpdateInput, EmployeeLocationUncheckedUpdateInput>
    /**
     * Choose, which EmployeeLocation to update.
     */
    where: EmployeeLocationWhereUniqueInput
  }

  /**
   * EmployeeLocation updateMany
   */
  export type EmployeeLocationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update EmployeeLocations.
     */
    data: XOR<EmployeeLocationUpdateManyMutationInput, EmployeeLocationUncheckedUpdateManyInput>
    /**
     * Filter which EmployeeLocations to update
     */
    where?: EmployeeLocationWhereInput
    /**
     * Limit how many EmployeeLocations to update.
     */
    limit?: number
  }

  /**
   * EmployeeLocation updateManyAndReturn
   */
  export type EmployeeLocationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmployeeLocation
     */
    select?: EmployeeLocationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the EmployeeLocation
     */
    omit?: EmployeeLocationOmit<ExtArgs> | null
    /**
     * The data used to update EmployeeLocations.
     */
    data: XOR<EmployeeLocationUpdateManyMutationInput, EmployeeLocationUncheckedUpdateManyInput>
    /**
     * Filter which EmployeeLocations to update
     */
    where?: EmployeeLocationWhereInput
    /**
     * Limit how many EmployeeLocations to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeLocationIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * EmployeeLocation upsert
   */
  export type EmployeeLocationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmployeeLocation
     */
    select?: EmployeeLocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmployeeLocation
     */
    omit?: EmployeeLocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeLocationInclude<ExtArgs> | null
    /**
     * The filter to search for the EmployeeLocation to update in case it exists.
     */
    where: EmployeeLocationWhereUniqueInput
    /**
     * In case the EmployeeLocation found by the `where` argument doesn't exist, create a new EmployeeLocation with this data.
     */
    create: XOR<EmployeeLocationCreateInput, EmployeeLocationUncheckedCreateInput>
    /**
     * In case the EmployeeLocation was found with the provided `where` argument, update it with this data.
     */
    update: XOR<EmployeeLocationUpdateInput, EmployeeLocationUncheckedUpdateInput>
  }

  /**
   * EmployeeLocation delete
   */
  export type EmployeeLocationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmployeeLocation
     */
    select?: EmployeeLocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmployeeLocation
     */
    omit?: EmployeeLocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeLocationInclude<ExtArgs> | null
    /**
     * Filter which EmployeeLocation to delete.
     */
    where: EmployeeLocationWhereUniqueInput
  }

  /**
   * EmployeeLocation deleteMany
   */
  export type EmployeeLocationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which EmployeeLocations to delete
     */
    where?: EmployeeLocationWhereInput
    /**
     * Limit how many EmployeeLocations to delete.
     */
    limit?: number
  }

  /**
   * EmployeeLocation without action
   */
  export type EmployeeLocationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmployeeLocation
     */
    select?: EmployeeLocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmployeeLocation
     */
    omit?: EmployeeLocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeLocationInclude<ExtArgs> | null
  }


  /**
   * Model AttendanceConfig
   */

  export type AggregateAttendanceConfig = {
    _count: AttendanceConfigCountAggregateOutputType | null
    _avg: AttendanceConfigAvgAggregateOutputType | null
    _sum: AttendanceConfigSumAggregateOutputType | null
    _min: AttendanceConfigMinAggregateOutputType | null
    _max: AttendanceConfigMaxAggregateOutputType | null
  }

  export type AttendanceConfigAvgAggregateOutputType = {
    late_threshold_minutes: number | null
    early_departure_threshold_minutes: number | null
    consecutive_absence_alert_days: number | null
    work_hours_per_day: number | null
    break_minutes: number | null
  }

  export type AttendanceConfigSumAggregateOutputType = {
    late_threshold_minutes: number | null
    early_departure_threshold_minutes: number | null
    consecutive_absence_alert_days: number | null
    work_hours_per_day: number | null
    break_minutes: number | null
  }

  export type AttendanceConfigMinAggregateOutputType = {
    id: string | null
    late_threshold_minutes: number | null
    early_departure_threshold_minutes: number | null
    overtime_approval_required: boolean | null
    consecutive_absence_alert_days: number | null
    work_hours_per_day: number | null
    break_minutes: number | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type AttendanceConfigMaxAggregateOutputType = {
    id: string | null
    late_threshold_minutes: number | null
    early_departure_threshold_minutes: number | null
    overtime_approval_required: boolean | null
    consecutive_absence_alert_days: number | null
    work_hours_per_day: number | null
    break_minutes: number | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type AttendanceConfigCountAggregateOutputType = {
    id: number
    late_threshold_minutes: number
    early_departure_threshold_minutes: number
    overtime_approval_required: number
    consecutive_absence_alert_days: number
    work_hours_per_day: number
    break_minutes: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type AttendanceConfigAvgAggregateInputType = {
    late_threshold_minutes?: true
    early_departure_threshold_minutes?: true
    consecutive_absence_alert_days?: true
    work_hours_per_day?: true
    break_minutes?: true
  }

  export type AttendanceConfigSumAggregateInputType = {
    late_threshold_minutes?: true
    early_departure_threshold_minutes?: true
    consecutive_absence_alert_days?: true
    work_hours_per_day?: true
    break_minutes?: true
  }

  export type AttendanceConfigMinAggregateInputType = {
    id?: true
    late_threshold_minutes?: true
    early_departure_threshold_minutes?: true
    overtime_approval_required?: true
    consecutive_absence_alert_days?: true
    work_hours_per_day?: true
    break_minutes?: true
    created_at?: true
    updated_at?: true
  }

  export type AttendanceConfigMaxAggregateInputType = {
    id?: true
    late_threshold_minutes?: true
    early_departure_threshold_minutes?: true
    overtime_approval_required?: true
    consecutive_absence_alert_days?: true
    work_hours_per_day?: true
    break_minutes?: true
    created_at?: true
    updated_at?: true
  }

  export type AttendanceConfigCountAggregateInputType = {
    id?: true
    late_threshold_minutes?: true
    early_departure_threshold_minutes?: true
    overtime_approval_required?: true
    consecutive_absence_alert_days?: true
    work_hours_per_day?: true
    break_minutes?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type AttendanceConfigAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AttendanceConfig to aggregate.
     */
    where?: AttendanceConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AttendanceConfigs to fetch.
     */
    orderBy?: AttendanceConfigOrderByWithRelationInput | AttendanceConfigOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AttendanceConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AttendanceConfigs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AttendanceConfigs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AttendanceConfigs
    **/
    _count?: true | AttendanceConfigCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AttendanceConfigAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AttendanceConfigSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AttendanceConfigMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AttendanceConfigMaxAggregateInputType
  }

  export type GetAttendanceConfigAggregateType<T extends AttendanceConfigAggregateArgs> = {
        [P in keyof T & keyof AggregateAttendanceConfig]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAttendanceConfig[P]>
      : GetScalarType<T[P], AggregateAttendanceConfig[P]>
  }




  export type AttendanceConfigGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AttendanceConfigWhereInput
    orderBy?: AttendanceConfigOrderByWithAggregationInput | AttendanceConfigOrderByWithAggregationInput[]
    by: AttendanceConfigScalarFieldEnum[] | AttendanceConfigScalarFieldEnum
    having?: AttendanceConfigScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AttendanceConfigCountAggregateInputType | true
    _avg?: AttendanceConfigAvgAggregateInputType
    _sum?: AttendanceConfigSumAggregateInputType
    _min?: AttendanceConfigMinAggregateInputType
    _max?: AttendanceConfigMaxAggregateInputType
  }

  export type AttendanceConfigGroupByOutputType = {
    id: string
    late_threshold_minutes: number
    early_departure_threshold_minutes: number
    overtime_approval_required: boolean
    consecutive_absence_alert_days: number
    work_hours_per_day: number
    break_minutes: number
    created_at: Date
    updated_at: Date
    _count: AttendanceConfigCountAggregateOutputType | null
    _avg: AttendanceConfigAvgAggregateOutputType | null
    _sum: AttendanceConfigSumAggregateOutputType | null
    _min: AttendanceConfigMinAggregateOutputType | null
    _max: AttendanceConfigMaxAggregateOutputType | null
  }

  type GetAttendanceConfigGroupByPayload<T extends AttendanceConfigGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AttendanceConfigGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AttendanceConfigGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AttendanceConfigGroupByOutputType[P]>
            : GetScalarType<T[P], AttendanceConfigGroupByOutputType[P]>
        }
      >
    >


  export type AttendanceConfigSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    late_threshold_minutes?: boolean
    early_departure_threshold_minutes?: boolean
    overtime_approval_required?: boolean
    consecutive_absence_alert_days?: boolean
    work_hours_per_day?: boolean
    break_minutes?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["attendanceConfig"]>

  export type AttendanceConfigSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    late_threshold_minutes?: boolean
    early_departure_threshold_minutes?: boolean
    overtime_approval_required?: boolean
    consecutive_absence_alert_days?: boolean
    work_hours_per_day?: boolean
    break_minutes?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["attendanceConfig"]>

  export type AttendanceConfigSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    late_threshold_minutes?: boolean
    early_departure_threshold_minutes?: boolean
    overtime_approval_required?: boolean
    consecutive_absence_alert_days?: boolean
    work_hours_per_day?: boolean
    break_minutes?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["attendanceConfig"]>

  export type AttendanceConfigSelectScalar = {
    id?: boolean
    late_threshold_minutes?: boolean
    early_departure_threshold_minutes?: boolean
    overtime_approval_required?: boolean
    consecutive_absence_alert_days?: boolean
    work_hours_per_day?: boolean
    break_minutes?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type AttendanceConfigOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "late_threshold_minutes" | "early_departure_threshold_minutes" | "overtime_approval_required" | "consecutive_absence_alert_days" | "work_hours_per_day" | "break_minutes" | "created_at" | "updated_at", ExtArgs["result"]["attendanceConfig"]>

  export type $AttendanceConfigPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AttendanceConfig"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      late_threshold_minutes: number
      early_departure_threshold_minutes: number
      overtime_approval_required: boolean
      consecutive_absence_alert_days: number
      work_hours_per_day: number
      break_minutes: number
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["attendanceConfig"]>
    composites: {}
  }

  type AttendanceConfigGetPayload<S extends boolean | null | undefined | AttendanceConfigDefaultArgs> = $Result.GetResult<Prisma.$AttendanceConfigPayload, S>

  type AttendanceConfigCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AttendanceConfigFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AttendanceConfigCountAggregateInputType | true
    }

  export interface AttendanceConfigDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AttendanceConfig'], meta: { name: 'AttendanceConfig' } }
    /**
     * Find zero or one AttendanceConfig that matches the filter.
     * @param {AttendanceConfigFindUniqueArgs} args - Arguments to find a AttendanceConfig
     * @example
     * // Get one AttendanceConfig
     * const attendanceConfig = await prisma.attendanceConfig.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AttendanceConfigFindUniqueArgs>(args: SelectSubset<T, AttendanceConfigFindUniqueArgs<ExtArgs>>): Prisma__AttendanceConfigClient<$Result.GetResult<Prisma.$AttendanceConfigPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AttendanceConfig that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AttendanceConfigFindUniqueOrThrowArgs} args - Arguments to find a AttendanceConfig
     * @example
     * // Get one AttendanceConfig
     * const attendanceConfig = await prisma.attendanceConfig.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AttendanceConfigFindUniqueOrThrowArgs>(args: SelectSubset<T, AttendanceConfigFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AttendanceConfigClient<$Result.GetResult<Prisma.$AttendanceConfigPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AttendanceConfig that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AttendanceConfigFindFirstArgs} args - Arguments to find a AttendanceConfig
     * @example
     * // Get one AttendanceConfig
     * const attendanceConfig = await prisma.attendanceConfig.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AttendanceConfigFindFirstArgs>(args?: SelectSubset<T, AttendanceConfigFindFirstArgs<ExtArgs>>): Prisma__AttendanceConfigClient<$Result.GetResult<Prisma.$AttendanceConfigPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AttendanceConfig that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AttendanceConfigFindFirstOrThrowArgs} args - Arguments to find a AttendanceConfig
     * @example
     * // Get one AttendanceConfig
     * const attendanceConfig = await prisma.attendanceConfig.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AttendanceConfigFindFirstOrThrowArgs>(args?: SelectSubset<T, AttendanceConfigFindFirstOrThrowArgs<ExtArgs>>): Prisma__AttendanceConfigClient<$Result.GetResult<Prisma.$AttendanceConfigPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AttendanceConfigs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AttendanceConfigFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AttendanceConfigs
     * const attendanceConfigs = await prisma.attendanceConfig.findMany()
     * 
     * // Get first 10 AttendanceConfigs
     * const attendanceConfigs = await prisma.attendanceConfig.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const attendanceConfigWithIdOnly = await prisma.attendanceConfig.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AttendanceConfigFindManyArgs>(args?: SelectSubset<T, AttendanceConfigFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AttendanceConfigPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AttendanceConfig.
     * @param {AttendanceConfigCreateArgs} args - Arguments to create a AttendanceConfig.
     * @example
     * // Create one AttendanceConfig
     * const AttendanceConfig = await prisma.attendanceConfig.create({
     *   data: {
     *     // ... data to create a AttendanceConfig
     *   }
     * })
     * 
     */
    create<T extends AttendanceConfigCreateArgs>(args: SelectSubset<T, AttendanceConfigCreateArgs<ExtArgs>>): Prisma__AttendanceConfigClient<$Result.GetResult<Prisma.$AttendanceConfigPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AttendanceConfigs.
     * @param {AttendanceConfigCreateManyArgs} args - Arguments to create many AttendanceConfigs.
     * @example
     * // Create many AttendanceConfigs
     * const attendanceConfig = await prisma.attendanceConfig.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AttendanceConfigCreateManyArgs>(args?: SelectSubset<T, AttendanceConfigCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AttendanceConfigs and returns the data saved in the database.
     * @param {AttendanceConfigCreateManyAndReturnArgs} args - Arguments to create many AttendanceConfigs.
     * @example
     * // Create many AttendanceConfigs
     * const attendanceConfig = await prisma.attendanceConfig.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AttendanceConfigs and only return the `id`
     * const attendanceConfigWithIdOnly = await prisma.attendanceConfig.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AttendanceConfigCreateManyAndReturnArgs>(args?: SelectSubset<T, AttendanceConfigCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AttendanceConfigPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AttendanceConfig.
     * @param {AttendanceConfigDeleteArgs} args - Arguments to delete one AttendanceConfig.
     * @example
     * // Delete one AttendanceConfig
     * const AttendanceConfig = await prisma.attendanceConfig.delete({
     *   where: {
     *     // ... filter to delete one AttendanceConfig
     *   }
     * })
     * 
     */
    delete<T extends AttendanceConfigDeleteArgs>(args: SelectSubset<T, AttendanceConfigDeleteArgs<ExtArgs>>): Prisma__AttendanceConfigClient<$Result.GetResult<Prisma.$AttendanceConfigPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AttendanceConfig.
     * @param {AttendanceConfigUpdateArgs} args - Arguments to update one AttendanceConfig.
     * @example
     * // Update one AttendanceConfig
     * const attendanceConfig = await prisma.attendanceConfig.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AttendanceConfigUpdateArgs>(args: SelectSubset<T, AttendanceConfigUpdateArgs<ExtArgs>>): Prisma__AttendanceConfigClient<$Result.GetResult<Prisma.$AttendanceConfigPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AttendanceConfigs.
     * @param {AttendanceConfigDeleteManyArgs} args - Arguments to filter AttendanceConfigs to delete.
     * @example
     * // Delete a few AttendanceConfigs
     * const { count } = await prisma.attendanceConfig.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AttendanceConfigDeleteManyArgs>(args?: SelectSubset<T, AttendanceConfigDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AttendanceConfigs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AttendanceConfigUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AttendanceConfigs
     * const attendanceConfig = await prisma.attendanceConfig.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AttendanceConfigUpdateManyArgs>(args: SelectSubset<T, AttendanceConfigUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AttendanceConfigs and returns the data updated in the database.
     * @param {AttendanceConfigUpdateManyAndReturnArgs} args - Arguments to update many AttendanceConfigs.
     * @example
     * // Update many AttendanceConfigs
     * const attendanceConfig = await prisma.attendanceConfig.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AttendanceConfigs and only return the `id`
     * const attendanceConfigWithIdOnly = await prisma.attendanceConfig.updateManyAndReturn({
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
    updateManyAndReturn<T extends AttendanceConfigUpdateManyAndReturnArgs>(args: SelectSubset<T, AttendanceConfigUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AttendanceConfigPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one AttendanceConfig.
     * @param {AttendanceConfigUpsertArgs} args - Arguments to update or create a AttendanceConfig.
     * @example
     * // Update or create a AttendanceConfig
     * const attendanceConfig = await prisma.attendanceConfig.upsert({
     *   create: {
     *     // ... data to create a AttendanceConfig
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AttendanceConfig we want to update
     *   }
     * })
     */
    upsert<T extends AttendanceConfigUpsertArgs>(args: SelectSubset<T, AttendanceConfigUpsertArgs<ExtArgs>>): Prisma__AttendanceConfigClient<$Result.GetResult<Prisma.$AttendanceConfigPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AttendanceConfigs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AttendanceConfigCountArgs} args - Arguments to filter AttendanceConfigs to count.
     * @example
     * // Count the number of AttendanceConfigs
     * const count = await prisma.attendanceConfig.count({
     *   where: {
     *     // ... the filter for the AttendanceConfigs we want to count
     *   }
     * })
    **/
    count<T extends AttendanceConfigCountArgs>(
      args?: Subset<T, AttendanceConfigCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AttendanceConfigCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AttendanceConfig.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AttendanceConfigAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends AttendanceConfigAggregateArgs>(args: Subset<T, AttendanceConfigAggregateArgs>): Prisma.PrismaPromise<GetAttendanceConfigAggregateType<T>>

    /**
     * Group by AttendanceConfig.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AttendanceConfigGroupByArgs} args - Group by arguments.
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
      T extends AttendanceConfigGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AttendanceConfigGroupByArgs['orderBy'] }
        : { orderBy?: AttendanceConfigGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, AttendanceConfigGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAttendanceConfigGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AttendanceConfig model
   */
  readonly fields: AttendanceConfigFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AttendanceConfig.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AttendanceConfigClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the AttendanceConfig model
   */
  interface AttendanceConfigFieldRefs {
    readonly id: FieldRef<"AttendanceConfig", 'String'>
    readonly late_threshold_minutes: FieldRef<"AttendanceConfig", 'Int'>
    readonly early_departure_threshold_minutes: FieldRef<"AttendanceConfig", 'Int'>
    readonly overtime_approval_required: FieldRef<"AttendanceConfig", 'Boolean'>
    readonly consecutive_absence_alert_days: FieldRef<"AttendanceConfig", 'Int'>
    readonly work_hours_per_day: FieldRef<"AttendanceConfig", 'Float'>
    readonly break_minutes: FieldRef<"AttendanceConfig", 'Int'>
    readonly created_at: FieldRef<"AttendanceConfig", 'DateTime'>
    readonly updated_at: FieldRef<"AttendanceConfig", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AttendanceConfig findUnique
   */
  export type AttendanceConfigFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AttendanceConfig
     */
    select?: AttendanceConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AttendanceConfig
     */
    omit?: AttendanceConfigOmit<ExtArgs> | null
    /**
     * Filter, which AttendanceConfig to fetch.
     */
    where: AttendanceConfigWhereUniqueInput
  }

  /**
   * AttendanceConfig findUniqueOrThrow
   */
  export type AttendanceConfigFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AttendanceConfig
     */
    select?: AttendanceConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AttendanceConfig
     */
    omit?: AttendanceConfigOmit<ExtArgs> | null
    /**
     * Filter, which AttendanceConfig to fetch.
     */
    where: AttendanceConfigWhereUniqueInput
  }

  /**
   * AttendanceConfig findFirst
   */
  export type AttendanceConfigFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AttendanceConfig
     */
    select?: AttendanceConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AttendanceConfig
     */
    omit?: AttendanceConfigOmit<ExtArgs> | null
    /**
     * Filter, which AttendanceConfig to fetch.
     */
    where?: AttendanceConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AttendanceConfigs to fetch.
     */
    orderBy?: AttendanceConfigOrderByWithRelationInput | AttendanceConfigOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AttendanceConfigs.
     */
    cursor?: AttendanceConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AttendanceConfigs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AttendanceConfigs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AttendanceConfigs.
     */
    distinct?: AttendanceConfigScalarFieldEnum | AttendanceConfigScalarFieldEnum[]
  }

  /**
   * AttendanceConfig findFirstOrThrow
   */
  export type AttendanceConfigFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AttendanceConfig
     */
    select?: AttendanceConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AttendanceConfig
     */
    omit?: AttendanceConfigOmit<ExtArgs> | null
    /**
     * Filter, which AttendanceConfig to fetch.
     */
    where?: AttendanceConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AttendanceConfigs to fetch.
     */
    orderBy?: AttendanceConfigOrderByWithRelationInput | AttendanceConfigOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AttendanceConfigs.
     */
    cursor?: AttendanceConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AttendanceConfigs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AttendanceConfigs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AttendanceConfigs.
     */
    distinct?: AttendanceConfigScalarFieldEnum | AttendanceConfigScalarFieldEnum[]
  }

  /**
   * AttendanceConfig findMany
   */
  export type AttendanceConfigFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AttendanceConfig
     */
    select?: AttendanceConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AttendanceConfig
     */
    omit?: AttendanceConfigOmit<ExtArgs> | null
    /**
     * Filter, which AttendanceConfigs to fetch.
     */
    where?: AttendanceConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AttendanceConfigs to fetch.
     */
    orderBy?: AttendanceConfigOrderByWithRelationInput | AttendanceConfigOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AttendanceConfigs.
     */
    cursor?: AttendanceConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AttendanceConfigs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AttendanceConfigs.
     */
    skip?: number
    distinct?: AttendanceConfigScalarFieldEnum | AttendanceConfigScalarFieldEnum[]
  }

  /**
   * AttendanceConfig create
   */
  export type AttendanceConfigCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AttendanceConfig
     */
    select?: AttendanceConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AttendanceConfig
     */
    omit?: AttendanceConfigOmit<ExtArgs> | null
    /**
     * The data needed to create a AttendanceConfig.
     */
    data: XOR<AttendanceConfigCreateInput, AttendanceConfigUncheckedCreateInput>
  }

  /**
   * AttendanceConfig createMany
   */
  export type AttendanceConfigCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AttendanceConfigs.
     */
    data: AttendanceConfigCreateManyInput | AttendanceConfigCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AttendanceConfig createManyAndReturn
   */
  export type AttendanceConfigCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AttendanceConfig
     */
    select?: AttendanceConfigSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AttendanceConfig
     */
    omit?: AttendanceConfigOmit<ExtArgs> | null
    /**
     * The data used to create many AttendanceConfigs.
     */
    data: AttendanceConfigCreateManyInput | AttendanceConfigCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AttendanceConfig update
   */
  export type AttendanceConfigUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AttendanceConfig
     */
    select?: AttendanceConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AttendanceConfig
     */
    omit?: AttendanceConfigOmit<ExtArgs> | null
    /**
     * The data needed to update a AttendanceConfig.
     */
    data: XOR<AttendanceConfigUpdateInput, AttendanceConfigUncheckedUpdateInput>
    /**
     * Choose, which AttendanceConfig to update.
     */
    where: AttendanceConfigWhereUniqueInput
  }

  /**
   * AttendanceConfig updateMany
   */
  export type AttendanceConfigUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AttendanceConfigs.
     */
    data: XOR<AttendanceConfigUpdateManyMutationInput, AttendanceConfigUncheckedUpdateManyInput>
    /**
     * Filter which AttendanceConfigs to update
     */
    where?: AttendanceConfigWhereInput
    /**
     * Limit how many AttendanceConfigs to update.
     */
    limit?: number
  }

  /**
   * AttendanceConfig updateManyAndReturn
   */
  export type AttendanceConfigUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AttendanceConfig
     */
    select?: AttendanceConfigSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AttendanceConfig
     */
    omit?: AttendanceConfigOmit<ExtArgs> | null
    /**
     * The data used to update AttendanceConfigs.
     */
    data: XOR<AttendanceConfigUpdateManyMutationInput, AttendanceConfigUncheckedUpdateManyInput>
    /**
     * Filter which AttendanceConfigs to update
     */
    where?: AttendanceConfigWhereInput
    /**
     * Limit how many AttendanceConfigs to update.
     */
    limit?: number
  }

  /**
   * AttendanceConfig upsert
   */
  export type AttendanceConfigUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AttendanceConfig
     */
    select?: AttendanceConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AttendanceConfig
     */
    omit?: AttendanceConfigOmit<ExtArgs> | null
    /**
     * The filter to search for the AttendanceConfig to update in case it exists.
     */
    where: AttendanceConfigWhereUniqueInput
    /**
     * In case the AttendanceConfig found by the `where` argument doesn't exist, create a new AttendanceConfig with this data.
     */
    create: XOR<AttendanceConfigCreateInput, AttendanceConfigUncheckedCreateInput>
    /**
     * In case the AttendanceConfig was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AttendanceConfigUpdateInput, AttendanceConfigUncheckedUpdateInput>
  }

  /**
   * AttendanceConfig delete
   */
  export type AttendanceConfigDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AttendanceConfig
     */
    select?: AttendanceConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AttendanceConfig
     */
    omit?: AttendanceConfigOmit<ExtArgs> | null
    /**
     * Filter which AttendanceConfig to delete.
     */
    where: AttendanceConfigWhereUniqueInput
  }

  /**
   * AttendanceConfig deleteMany
   */
  export type AttendanceConfigDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AttendanceConfigs to delete
     */
    where?: AttendanceConfigWhereInput
    /**
     * Limit how many AttendanceConfigs to delete.
     */
    limit?: number
  }

  /**
   * AttendanceConfig without action
   */
  export type AttendanceConfigDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AttendanceConfig
     */
    select?: AttendanceConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AttendanceConfig
     */
    omit?: AttendanceConfigOmit<ExtArgs> | null
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


  export const ShiftScalarFieldEnum: {
    id: 'id',
    code: 'code',
    name_en: 'name_en',
    name_th: 'name_th',
    start_time: 'start_time',
    end_time: 'end_time',
    is_flexible: 'is_flexible',
    break_minutes: 'break_minutes',
    work_hours: 'work_hours',
    is_active: 'is_active',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type ShiftScalarFieldEnum = (typeof ShiftScalarFieldEnum)[keyof typeof ShiftScalarFieldEnum]


  export const AttendanceRecordScalarFieldEnum: {
    id: 'id',
    employee_id: 'employee_id',
    date: 'date',
    shift_id: 'shift_id',
    scheduled_start: 'scheduled_start',
    scheduled_end: 'scheduled_end',
    actual_check_in: 'actual_check_in',
    actual_check_out: 'actual_check_out',
    check_in_source: 'check_in_source',
    check_in_location: 'check_in_location',
    check_out_source: 'check_out_source',
    check_out_location: 'check_out_location',
    working_hours: 'working_hours',
    overtime_hours: 'overtime_hours',
    is_late: 'is_late',
    late_minutes: 'late_minutes',
    is_early_departure: 'is_early_departure',
    early_minutes: 'early_minutes',
    status: 'status',
    anomalies: 'anomalies',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type AttendanceRecordScalarFieldEnum = (typeof AttendanceRecordScalarFieldEnum)[keyof typeof AttendanceRecordScalarFieldEnum]


  export const OvertimeRequestScalarFieldEnum: {
    id: 'id',
    employee_id: 'employee_id',
    date: 'date',
    day_type: 'day_type',
    start_time: 'start_time',
    end_time: 'end_time',
    hours: 'hours',
    ot_type: 'ot_type',
    rate: 'rate',
    hourly_rate: 'hourly_rate',
    amount: 'amount',
    has_night_premium: 'has_night_premium',
    night_hours: 'night_hours',
    night_premium_amount: 'night_premium_amount',
    total_amount: 'total_amount',
    reason: 'reason',
    work_description: 'work_description',
    pre_approved: 'pre_approved',
    status: 'status',
    submitted_at: 'submitted_at',
    approved_at: 'approved_at',
    approved_by: 'approved_by',
    rejected_at: 'rejected_at',
    rejected_by: 'rejected_by',
    rejection_reason: 'rejection_reason',
    post_confirmed: 'post_confirmed',
    post_confirmed_at: 'post_confirmed_at',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type OvertimeRequestScalarFieldEnum = (typeof OvertimeRequestScalarFieldEnum)[keyof typeof OvertimeRequestScalarFieldEnum]


  export const LocationScalarFieldEnum: {
    id: 'id',
    location_code: 'location_code',
    name_en: 'name_en',
    name_th: 'name_th',
    location_type: 'location_type',
    parent_location_id: 'parent_location_id',
    address: 'address',
    coordinates: 'coordinates',
    status: 'status',
    headcount: 'headcount',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type LocationScalarFieldEnum = (typeof LocationScalarFieldEnum)[keyof typeof LocationScalarFieldEnum]


  export const EmployeeLocationScalarFieldEnum: {
    id: 'id',
    employee_id: 'employee_id',
    location_id: 'location_id',
    location_type: 'location_type',
    effective_date: 'effective_date',
    end_date: 'end_date',
    status: 'status',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type EmployeeLocationScalarFieldEnum = (typeof EmployeeLocationScalarFieldEnum)[keyof typeof EmployeeLocationScalarFieldEnum]


  export const AttendanceConfigScalarFieldEnum: {
    id: 'id',
    late_threshold_minutes: 'late_threshold_minutes',
    early_departure_threshold_minutes: 'early_departure_threshold_minutes',
    overtime_approval_required: 'overtime_approval_required',
    consecutive_absence_alert_days: 'consecutive_absence_alert_days',
    work_hours_per_day: 'work_hours_per_day',
    break_minutes: 'break_minutes',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type AttendanceConfigScalarFieldEnum = (typeof AttendanceConfigScalarFieldEnum)[keyof typeof AttendanceConfigScalarFieldEnum]


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


  export type ShiftWhereInput = {
    AND?: ShiftWhereInput | ShiftWhereInput[]
    OR?: ShiftWhereInput[]
    NOT?: ShiftWhereInput | ShiftWhereInput[]
    id?: StringFilter<"Shift"> | string
    code?: StringFilter<"Shift"> | string
    name_en?: StringFilter<"Shift"> | string
    name_th?: StringNullableFilter<"Shift"> | string | null
    start_time?: StringFilter<"Shift"> | string
    end_time?: StringFilter<"Shift"> | string
    is_flexible?: BoolFilter<"Shift"> | boolean
    break_minutes?: IntFilter<"Shift"> | number
    work_hours?: FloatFilter<"Shift"> | number
    is_active?: BoolFilter<"Shift"> | boolean
    created_at?: DateTimeFilter<"Shift"> | Date | string
    updated_at?: DateTimeFilter<"Shift"> | Date | string
    attendance_records?: AttendanceRecordListRelationFilter
  }

  export type ShiftOrderByWithRelationInput = {
    id?: SortOrder
    code?: SortOrder
    name_en?: SortOrder
    name_th?: SortOrderInput | SortOrder
    start_time?: SortOrder
    end_time?: SortOrder
    is_flexible?: SortOrder
    break_minutes?: SortOrder
    work_hours?: SortOrder
    is_active?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    attendance_records?: AttendanceRecordOrderByRelationAggregateInput
  }

  export type ShiftWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    code?: string
    AND?: ShiftWhereInput | ShiftWhereInput[]
    OR?: ShiftWhereInput[]
    NOT?: ShiftWhereInput | ShiftWhereInput[]
    name_en?: StringFilter<"Shift"> | string
    name_th?: StringNullableFilter<"Shift"> | string | null
    start_time?: StringFilter<"Shift"> | string
    end_time?: StringFilter<"Shift"> | string
    is_flexible?: BoolFilter<"Shift"> | boolean
    break_minutes?: IntFilter<"Shift"> | number
    work_hours?: FloatFilter<"Shift"> | number
    is_active?: BoolFilter<"Shift"> | boolean
    created_at?: DateTimeFilter<"Shift"> | Date | string
    updated_at?: DateTimeFilter<"Shift"> | Date | string
    attendance_records?: AttendanceRecordListRelationFilter
  }, "id" | "code">

  export type ShiftOrderByWithAggregationInput = {
    id?: SortOrder
    code?: SortOrder
    name_en?: SortOrder
    name_th?: SortOrderInput | SortOrder
    start_time?: SortOrder
    end_time?: SortOrder
    is_flexible?: SortOrder
    break_minutes?: SortOrder
    work_hours?: SortOrder
    is_active?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: ShiftCountOrderByAggregateInput
    _avg?: ShiftAvgOrderByAggregateInput
    _max?: ShiftMaxOrderByAggregateInput
    _min?: ShiftMinOrderByAggregateInput
    _sum?: ShiftSumOrderByAggregateInput
  }

  export type ShiftScalarWhereWithAggregatesInput = {
    AND?: ShiftScalarWhereWithAggregatesInput | ShiftScalarWhereWithAggregatesInput[]
    OR?: ShiftScalarWhereWithAggregatesInput[]
    NOT?: ShiftScalarWhereWithAggregatesInput | ShiftScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Shift"> | string
    code?: StringWithAggregatesFilter<"Shift"> | string
    name_en?: StringWithAggregatesFilter<"Shift"> | string
    name_th?: StringNullableWithAggregatesFilter<"Shift"> | string | null
    start_time?: StringWithAggregatesFilter<"Shift"> | string
    end_time?: StringWithAggregatesFilter<"Shift"> | string
    is_flexible?: BoolWithAggregatesFilter<"Shift"> | boolean
    break_minutes?: IntWithAggregatesFilter<"Shift"> | number
    work_hours?: FloatWithAggregatesFilter<"Shift"> | number
    is_active?: BoolWithAggregatesFilter<"Shift"> | boolean
    created_at?: DateTimeWithAggregatesFilter<"Shift"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"Shift"> | Date | string
  }

  export type AttendanceRecordWhereInput = {
    AND?: AttendanceRecordWhereInput | AttendanceRecordWhereInput[]
    OR?: AttendanceRecordWhereInput[]
    NOT?: AttendanceRecordWhereInput | AttendanceRecordWhereInput[]
    id?: StringFilter<"AttendanceRecord"> | string
    employee_id?: StringFilter<"AttendanceRecord"> | string
    date?: DateTimeFilter<"AttendanceRecord"> | Date | string
    shift_id?: StringNullableFilter<"AttendanceRecord"> | string | null
    scheduled_start?: StringNullableFilter<"AttendanceRecord"> | string | null
    scheduled_end?: StringNullableFilter<"AttendanceRecord"> | string | null
    actual_check_in?: StringNullableFilter<"AttendanceRecord"> | string | null
    actual_check_out?: StringNullableFilter<"AttendanceRecord"> | string | null
    check_in_source?: StringNullableFilter<"AttendanceRecord"> | string | null
    check_in_location?: StringNullableFilter<"AttendanceRecord"> | string | null
    check_out_source?: StringNullableFilter<"AttendanceRecord"> | string | null
    check_out_location?: StringNullableFilter<"AttendanceRecord"> | string | null
    working_hours?: FloatNullableFilter<"AttendanceRecord"> | number | null
    overtime_hours?: FloatFilter<"AttendanceRecord"> | number
    is_late?: BoolFilter<"AttendanceRecord"> | boolean
    late_minutes?: IntFilter<"AttendanceRecord"> | number
    is_early_departure?: BoolFilter<"AttendanceRecord"> | boolean
    early_minutes?: IntFilter<"AttendanceRecord"> | number
    status?: StringFilter<"AttendanceRecord"> | string
    anomalies?: StringNullableListFilter<"AttendanceRecord">
    created_at?: DateTimeFilter<"AttendanceRecord"> | Date | string
    updated_at?: DateTimeFilter<"AttendanceRecord"> | Date | string
    shift?: XOR<ShiftNullableScalarRelationFilter, ShiftWhereInput> | null
  }

  export type AttendanceRecordOrderByWithRelationInput = {
    id?: SortOrder
    employee_id?: SortOrder
    date?: SortOrder
    shift_id?: SortOrderInput | SortOrder
    scheduled_start?: SortOrderInput | SortOrder
    scheduled_end?: SortOrderInput | SortOrder
    actual_check_in?: SortOrderInput | SortOrder
    actual_check_out?: SortOrderInput | SortOrder
    check_in_source?: SortOrderInput | SortOrder
    check_in_location?: SortOrderInput | SortOrder
    check_out_source?: SortOrderInput | SortOrder
    check_out_location?: SortOrderInput | SortOrder
    working_hours?: SortOrderInput | SortOrder
    overtime_hours?: SortOrder
    is_late?: SortOrder
    late_minutes?: SortOrder
    is_early_departure?: SortOrder
    early_minutes?: SortOrder
    status?: SortOrder
    anomalies?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    shift?: ShiftOrderByWithRelationInput
  }

  export type AttendanceRecordWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    employee_id_date?: AttendanceRecordEmployee_idDateCompoundUniqueInput
    AND?: AttendanceRecordWhereInput | AttendanceRecordWhereInput[]
    OR?: AttendanceRecordWhereInput[]
    NOT?: AttendanceRecordWhereInput | AttendanceRecordWhereInput[]
    employee_id?: StringFilter<"AttendanceRecord"> | string
    date?: DateTimeFilter<"AttendanceRecord"> | Date | string
    shift_id?: StringNullableFilter<"AttendanceRecord"> | string | null
    scheduled_start?: StringNullableFilter<"AttendanceRecord"> | string | null
    scheduled_end?: StringNullableFilter<"AttendanceRecord"> | string | null
    actual_check_in?: StringNullableFilter<"AttendanceRecord"> | string | null
    actual_check_out?: StringNullableFilter<"AttendanceRecord"> | string | null
    check_in_source?: StringNullableFilter<"AttendanceRecord"> | string | null
    check_in_location?: StringNullableFilter<"AttendanceRecord"> | string | null
    check_out_source?: StringNullableFilter<"AttendanceRecord"> | string | null
    check_out_location?: StringNullableFilter<"AttendanceRecord"> | string | null
    working_hours?: FloatNullableFilter<"AttendanceRecord"> | number | null
    overtime_hours?: FloatFilter<"AttendanceRecord"> | number
    is_late?: BoolFilter<"AttendanceRecord"> | boolean
    late_minutes?: IntFilter<"AttendanceRecord"> | number
    is_early_departure?: BoolFilter<"AttendanceRecord"> | boolean
    early_minutes?: IntFilter<"AttendanceRecord"> | number
    status?: StringFilter<"AttendanceRecord"> | string
    anomalies?: StringNullableListFilter<"AttendanceRecord">
    created_at?: DateTimeFilter<"AttendanceRecord"> | Date | string
    updated_at?: DateTimeFilter<"AttendanceRecord"> | Date | string
    shift?: XOR<ShiftNullableScalarRelationFilter, ShiftWhereInput> | null
  }, "id" | "employee_id_date">

  export type AttendanceRecordOrderByWithAggregationInput = {
    id?: SortOrder
    employee_id?: SortOrder
    date?: SortOrder
    shift_id?: SortOrderInput | SortOrder
    scheduled_start?: SortOrderInput | SortOrder
    scheduled_end?: SortOrderInput | SortOrder
    actual_check_in?: SortOrderInput | SortOrder
    actual_check_out?: SortOrderInput | SortOrder
    check_in_source?: SortOrderInput | SortOrder
    check_in_location?: SortOrderInput | SortOrder
    check_out_source?: SortOrderInput | SortOrder
    check_out_location?: SortOrderInput | SortOrder
    working_hours?: SortOrderInput | SortOrder
    overtime_hours?: SortOrder
    is_late?: SortOrder
    late_minutes?: SortOrder
    is_early_departure?: SortOrder
    early_minutes?: SortOrder
    status?: SortOrder
    anomalies?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: AttendanceRecordCountOrderByAggregateInput
    _avg?: AttendanceRecordAvgOrderByAggregateInput
    _max?: AttendanceRecordMaxOrderByAggregateInput
    _min?: AttendanceRecordMinOrderByAggregateInput
    _sum?: AttendanceRecordSumOrderByAggregateInput
  }

  export type AttendanceRecordScalarWhereWithAggregatesInput = {
    AND?: AttendanceRecordScalarWhereWithAggregatesInput | AttendanceRecordScalarWhereWithAggregatesInput[]
    OR?: AttendanceRecordScalarWhereWithAggregatesInput[]
    NOT?: AttendanceRecordScalarWhereWithAggregatesInput | AttendanceRecordScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AttendanceRecord"> | string
    employee_id?: StringWithAggregatesFilter<"AttendanceRecord"> | string
    date?: DateTimeWithAggregatesFilter<"AttendanceRecord"> | Date | string
    shift_id?: StringNullableWithAggregatesFilter<"AttendanceRecord"> | string | null
    scheduled_start?: StringNullableWithAggregatesFilter<"AttendanceRecord"> | string | null
    scheduled_end?: StringNullableWithAggregatesFilter<"AttendanceRecord"> | string | null
    actual_check_in?: StringNullableWithAggregatesFilter<"AttendanceRecord"> | string | null
    actual_check_out?: StringNullableWithAggregatesFilter<"AttendanceRecord"> | string | null
    check_in_source?: StringNullableWithAggregatesFilter<"AttendanceRecord"> | string | null
    check_in_location?: StringNullableWithAggregatesFilter<"AttendanceRecord"> | string | null
    check_out_source?: StringNullableWithAggregatesFilter<"AttendanceRecord"> | string | null
    check_out_location?: StringNullableWithAggregatesFilter<"AttendanceRecord"> | string | null
    working_hours?: FloatNullableWithAggregatesFilter<"AttendanceRecord"> | number | null
    overtime_hours?: FloatWithAggregatesFilter<"AttendanceRecord"> | number
    is_late?: BoolWithAggregatesFilter<"AttendanceRecord"> | boolean
    late_minutes?: IntWithAggregatesFilter<"AttendanceRecord"> | number
    is_early_departure?: BoolWithAggregatesFilter<"AttendanceRecord"> | boolean
    early_minutes?: IntWithAggregatesFilter<"AttendanceRecord"> | number
    status?: StringWithAggregatesFilter<"AttendanceRecord"> | string
    anomalies?: StringNullableListFilter<"AttendanceRecord">
    created_at?: DateTimeWithAggregatesFilter<"AttendanceRecord"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"AttendanceRecord"> | Date | string
  }

  export type OvertimeRequestWhereInput = {
    AND?: OvertimeRequestWhereInput | OvertimeRequestWhereInput[]
    OR?: OvertimeRequestWhereInput[]
    NOT?: OvertimeRequestWhereInput | OvertimeRequestWhereInput[]
    id?: StringFilter<"OvertimeRequest"> | string
    employee_id?: StringFilter<"OvertimeRequest"> | string
    date?: DateTimeFilter<"OvertimeRequest"> | Date | string
    day_type?: StringFilter<"OvertimeRequest"> | string
    start_time?: StringFilter<"OvertimeRequest"> | string
    end_time?: StringFilter<"OvertimeRequest"> | string
    hours?: FloatFilter<"OvertimeRequest"> | number
    ot_type?: StringFilter<"OvertimeRequest"> | string
    rate?: FloatFilter<"OvertimeRequest"> | number
    hourly_rate?: FloatFilter<"OvertimeRequest"> | number
    amount?: FloatFilter<"OvertimeRequest"> | number
    has_night_premium?: BoolFilter<"OvertimeRequest"> | boolean
    night_hours?: FloatFilter<"OvertimeRequest"> | number
    night_premium_amount?: FloatFilter<"OvertimeRequest"> | number
    total_amount?: FloatFilter<"OvertimeRequest"> | number
    reason?: StringFilter<"OvertimeRequest"> | string
    work_description?: StringNullableFilter<"OvertimeRequest"> | string | null
    pre_approved?: BoolFilter<"OvertimeRequest"> | boolean
    status?: StringFilter<"OvertimeRequest"> | string
    submitted_at?: DateTimeFilter<"OvertimeRequest"> | Date | string
    approved_at?: DateTimeNullableFilter<"OvertimeRequest"> | Date | string | null
    approved_by?: StringNullableFilter<"OvertimeRequest"> | string | null
    rejected_at?: DateTimeNullableFilter<"OvertimeRequest"> | Date | string | null
    rejected_by?: StringNullableFilter<"OvertimeRequest"> | string | null
    rejection_reason?: StringNullableFilter<"OvertimeRequest"> | string | null
    post_confirmed?: BoolFilter<"OvertimeRequest"> | boolean
    post_confirmed_at?: DateTimeNullableFilter<"OvertimeRequest"> | Date | string | null
    created_at?: DateTimeFilter<"OvertimeRequest"> | Date | string
    updated_at?: DateTimeFilter<"OvertimeRequest"> | Date | string
  }

  export type OvertimeRequestOrderByWithRelationInput = {
    id?: SortOrder
    employee_id?: SortOrder
    date?: SortOrder
    day_type?: SortOrder
    start_time?: SortOrder
    end_time?: SortOrder
    hours?: SortOrder
    ot_type?: SortOrder
    rate?: SortOrder
    hourly_rate?: SortOrder
    amount?: SortOrder
    has_night_premium?: SortOrder
    night_hours?: SortOrder
    night_premium_amount?: SortOrder
    total_amount?: SortOrder
    reason?: SortOrder
    work_description?: SortOrderInput | SortOrder
    pre_approved?: SortOrder
    status?: SortOrder
    submitted_at?: SortOrder
    approved_at?: SortOrderInput | SortOrder
    approved_by?: SortOrderInput | SortOrder
    rejected_at?: SortOrderInput | SortOrder
    rejected_by?: SortOrderInput | SortOrder
    rejection_reason?: SortOrderInput | SortOrder
    post_confirmed?: SortOrder
    post_confirmed_at?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type OvertimeRequestWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: OvertimeRequestWhereInput | OvertimeRequestWhereInput[]
    OR?: OvertimeRequestWhereInput[]
    NOT?: OvertimeRequestWhereInput | OvertimeRequestWhereInput[]
    employee_id?: StringFilter<"OvertimeRequest"> | string
    date?: DateTimeFilter<"OvertimeRequest"> | Date | string
    day_type?: StringFilter<"OvertimeRequest"> | string
    start_time?: StringFilter<"OvertimeRequest"> | string
    end_time?: StringFilter<"OvertimeRequest"> | string
    hours?: FloatFilter<"OvertimeRequest"> | number
    ot_type?: StringFilter<"OvertimeRequest"> | string
    rate?: FloatFilter<"OvertimeRequest"> | number
    hourly_rate?: FloatFilter<"OvertimeRequest"> | number
    amount?: FloatFilter<"OvertimeRequest"> | number
    has_night_premium?: BoolFilter<"OvertimeRequest"> | boolean
    night_hours?: FloatFilter<"OvertimeRequest"> | number
    night_premium_amount?: FloatFilter<"OvertimeRequest"> | number
    total_amount?: FloatFilter<"OvertimeRequest"> | number
    reason?: StringFilter<"OvertimeRequest"> | string
    work_description?: StringNullableFilter<"OvertimeRequest"> | string | null
    pre_approved?: BoolFilter<"OvertimeRequest"> | boolean
    status?: StringFilter<"OvertimeRequest"> | string
    submitted_at?: DateTimeFilter<"OvertimeRequest"> | Date | string
    approved_at?: DateTimeNullableFilter<"OvertimeRequest"> | Date | string | null
    approved_by?: StringNullableFilter<"OvertimeRequest"> | string | null
    rejected_at?: DateTimeNullableFilter<"OvertimeRequest"> | Date | string | null
    rejected_by?: StringNullableFilter<"OvertimeRequest"> | string | null
    rejection_reason?: StringNullableFilter<"OvertimeRequest"> | string | null
    post_confirmed?: BoolFilter<"OvertimeRequest"> | boolean
    post_confirmed_at?: DateTimeNullableFilter<"OvertimeRequest"> | Date | string | null
    created_at?: DateTimeFilter<"OvertimeRequest"> | Date | string
    updated_at?: DateTimeFilter<"OvertimeRequest"> | Date | string
  }, "id">

  export type OvertimeRequestOrderByWithAggregationInput = {
    id?: SortOrder
    employee_id?: SortOrder
    date?: SortOrder
    day_type?: SortOrder
    start_time?: SortOrder
    end_time?: SortOrder
    hours?: SortOrder
    ot_type?: SortOrder
    rate?: SortOrder
    hourly_rate?: SortOrder
    amount?: SortOrder
    has_night_premium?: SortOrder
    night_hours?: SortOrder
    night_premium_amount?: SortOrder
    total_amount?: SortOrder
    reason?: SortOrder
    work_description?: SortOrderInput | SortOrder
    pre_approved?: SortOrder
    status?: SortOrder
    submitted_at?: SortOrder
    approved_at?: SortOrderInput | SortOrder
    approved_by?: SortOrderInput | SortOrder
    rejected_at?: SortOrderInput | SortOrder
    rejected_by?: SortOrderInput | SortOrder
    rejection_reason?: SortOrderInput | SortOrder
    post_confirmed?: SortOrder
    post_confirmed_at?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: OvertimeRequestCountOrderByAggregateInput
    _avg?: OvertimeRequestAvgOrderByAggregateInput
    _max?: OvertimeRequestMaxOrderByAggregateInput
    _min?: OvertimeRequestMinOrderByAggregateInput
    _sum?: OvertimeRequestSumOrderByAggregateInput
  }

  export type OvertimeRequestScalarWhereWithAggregatesInput = {
    AND?: OvertimeRequestScalarWhereWithAggregatesInput | OvertimeRequestScalarWhereWithAggregatesInput[]
    OR?: OvertimeRequestScalarWhereWithAggregatesInput[]
    NOT?: OvertimeRequestScalarWhereWithAggregatesInput | OvertimeRequestScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"OvertimeRequest"> | string
    employee_id?: StringWithAggregatesFilter<"OvertimeRequest"> | string
    date?: DateTimeWithAggregatesFilter<"OvertimeRequest"> | Date | string
    day_type?: StringWithAggregatesFilter<"OvertimeRequest"> | string
    start_time?: StringWithAggregatesFilter<"OvertimeRequest"> | string
    end_time?: StringWithAggregatesFilter<"OvertimeRequest"> | string
    hours?: FloatWithAggregatesFilter<"OvertimeRequest"> | number
    ot_type?: StringWithAggregatesFilter<"OvertimeRequest"> | string
    rate?: FloatWithAggregatesFilter<"OvertimeRequest"> | number
    hourly_rate?: FloatWithAggregatesFilter<"OvertimeRequest"> | number
    amount?: FloatWithAggregatesFilter<"OvertimeRequest"> | number
    has_night_premium?: BoolWithAggregatesFilter<"OvertimeRequest"> | boolean
    night_hours?: FloatWithAggregatesFilter<"OvertimeRequest"> | number
    night_premium_amount?: FloatWithAggregatesFilter<"OvertimeRequest"> | number
    total_amount?: FloatWithAggregatesFilter<"OvertimeRequest"> | number
    reason?: StringWithAggregatesFilter<"OvertimeRequest"> | string
    work_description?: StringNullableWithAggregatesFilter<"OvertimeRequest"> | string | null
    pre_approved?: BoolWithAggregatesFilter<"OvertimeRequest"> | boolean
    status?: StringWithAggregatesFilter<"OvertimeRequest"> | string
    submitted_at?: DateTimeWithAggregatesFilter<"OvertimeRequest"> | Date | string
    approved_at?: DateTimeNullableWithAggregatesFilter<"OvertimeRequest"> | Date | string | null
    approved_by?: StringNullableWithAggregatesFilter<"OvertimeRequest"> | string | null
    rejected_at?: DateTimeNullableWithAggregatesFilter<"OvertimeRequest"> | Date | string | null
    rejected_by?: StringNullableWithAggregatesFilter<"OvertimeRequest"> | string | null
    rejection_reason?: StringNullableWithAggregatesFilter<"OvertimeRequest"> | string | null
    post_confirmed?: BoolWithAggregatesFilter<"OvertimeRequest"> | boolean
    post_confirmed_at?: DateTimeNullableWithAggregatesFilter<"OvertimeRequest"> | Date | string | null
    created_at?: DateTimeWithAggregatesFilter<"OvertimeRequest"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"OvertimeRequest"> | Date | string
  }

  export type LocationWhereInput = {
    AND?: LocationWhereInput | LocationWhereInput[]
    OR?: LocationWhereInput[]
    NOT?: LocationWhereInput | LocationWhereInput[]
    id?: StringFilter<"Location"> | string
    location_code?: StringFilter<"Location"> | string
    name_en?: StringFilter<"Location"> | string
    name_th?: StringNullableFilter<"Location"> | string | null
    location_type?: StringFilter<"Location"> | string
    parent_location_id?: StringNullableFilter<"Location"> | string | null
    address?: JsonNullableFilter<"Location">
    coordinates?: JsonNullableFilter<"Location">
    status?: StringFilter<"Location"> | string
    headcount?: IntFilter<"Location"> | number
    created_at?: DateTimeFilter<"Location"> | Date | string
    updated_at?: DateTimeFilter<"Location"> | Date | string
    parent?: XOR<LocationNullableScalarRelationFilter, LocationWhereInput> | null
    children?: LocationListRelationFilter
    employee_locations?: EmployeeLocationListRelationFilter
  }

  export type LocationOrderByWithRelationInput = {
    id?: SortOrder
    location_code?: SortOrder
    name_en?: SortOrder
    name_th?: SortOrderInput | SortOrder
    location_type?: SortOrder
    parent_location_id?: SortOrderInput | SortOrder
    address?: SortOrderInput | SortOrder
    coordinates?: SortOrderInput | SortOrder
    status?: SortOrder
    headcount?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    parent?: LocationOrderByWithRelationInput
    children?: LocationOrderByRelationAggregateInput
    employee_locations?: EmployeeLocationOrderByRelationAggregateInput
  }

  export type LocationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    location_code?: string
    AND?: LocationWhereInput | LocationWhereInput[]
    OR?: LocationWhereInput[]
    NOT?: LocationWhereInput | LocationWhereInput[]
    name_en?: StringFilter<"Location"> | string
    name_th?: StringNullableFilter<"Location"> | string | null
    location_type?: StringFilter<"Location"> | string
    parent_location_id?: StringNullableFilter<"Location"> | string | null
    address?: JsonNullableFilter<"Location">
    coordinates?: JsonNullableFilter<"Location">
    status?: StringFilter<"Location"> | string
    headcount?: IntFilter<"Location"> | number
    created_at?: DateTimeFilter<"Location"> | Date | string
    updated_at?: DateTimeFilter<"Location"> | Date | string
    parent?: XOR<LocationNullableScalarRelationFilter, LocationWhereInput> | null
    children?: LocationListRelationFilter
    employee_locations?: EmployeeLocationListRelationFilter
  }, "id" | "location_code">

  export type LocationOrderByWithAggregationInput = {
    id?: SortOrder
    location_code?: SortOrder
    name_en?: SortOrder
    name_th?: SortOrderInput | SortOrder
    location_type?: SortOrder
    parent_location_id?: SortOrderInput | SortOrder
    address?: SortOrderInput | SortOrder
    coordinates?: SortOrderInput | SortOrder
    status?: SortOrder
    headcount?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: LocationCountOrderByAggregateInput
    _avg?: LocationAvgOrderByAggregateInput
    _max?: LocationMaxOrderByAggregateInput
    _min?: LocationMinOrderByAggregateInput
    _sum?: LocationSumOrderByAggregateInput
  }

  export type LocationScalarWhereWithAggregatesInput = {
    AND?: LocationScalarWhereWithAggregatesInput | LocationScalarWhereWithAggregatesInput[]
    OR?: LocationScalarWhereWithAggregatesInput[]
    NOT?: LocationScalarWhereWithAggregatesInput | LocationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Location"> | string
    location_code?: StringWithAggregatesFilter<"Location"> | string
    name_en?: StringWithAggregatesFilter<"Location"> | string
    name_th?: StringNullableWithAggregatesFilter<"Location"> | string | null
    location_type?: StringWithAggregatesFilter<"Location"> | string
    parent_location_id?: StringNullableWithAggregatesFilter<"Location"> | string | null
    address?: JsonNullableWithAggregatesFilter<"Location">
    coordinates?: JsonNullableWithAggregatesFilter<"Location">
    status?: StringWithAggregatesFilter<"Location"> | string
    headcount?: IntWithAggregatesFilter<"Location"> | number
    created_at?: DateTimeWithAggregatesFilter<"Location"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"Location"> | Date | string
  }

  export type EmployeeLocationWhereInput = {
    AND?: EmployeeLocationWhereInput | EmployeeLocationWhereInput[]
    OR?: EmployeeLocationWhereInput[]
    NOT?: EmployeeLocationWhereInput | EmployeeLocationWhereInput[]
    id?: StringFilter<"EmployeeLocation"> | string
    employee_id?: StringFilter<"EmployeeLocation"> | string
    location_id?: StringFilter<"EmployeeLocation"> | string
    location_type?: StringFilter<"EmployeeLocation"> | string
    effective_date?: DateTimeFilter<"EmployeeLocation"> | Date | string
    end_date?: DateTimeNullableFilter<"EmployeeLocation"> | Date | string | null
    status?: StringFilter<"EmployeeLocation"> | string
    created_at?: DateTimeFilter<"EmployeeLocation"> | Date | string
    updated_at?: DateTimeFilter<"EmployeeLocation"> | Date | string
    location?: XOR<LocationScalarRelationFilter, LocationWhereInput>
  }

  export type EmployeeLocationOrderByWithRelationInput = {
    id?: SortOrder
    employee_id?: SortOrder
    location_id?: SortOrder
    location_type?: SortOrder
    effective_date?: SortOrder
    end_date?: SortOrderInput | SortOrder
    status?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    location?: LocationOrderByWithRelationInput
  }

  export type EmployeeLocationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    employee_id_location_id_location_type?: EmployeeLocationEmployee_idLocation_idLocation_typeCompoundUniqueInput
    AND?: EmployeeLocationWhereInput | EmployeeLocationWhereInput[]
    OR?: EmployeeLocationWhereInput[]
    NOT?: EmployeeLocationWhereInput | EmployeeLocationWhereInput[]
    employee_id?: StringFilter<"EmployeeLocation"> | string
    location_id?: StringFilter<"EmployeeLocation"> | string
    location_type?: StringFilter<"EmployeeLocation"> | string
    effective_date?: DateTimeFilter<"EmployeeLocation"> | Date | string
    end_date?: DateTimeNullableFilter<"EmployeeLocation"> | Date | string | null
    status?: StringFilter<"EmployeeLocation"> | string
    created_at?: DateTimeFilter<"EmployeeLocation"> | Date | string
    updated_at?: DateTimeFilter<"EmployeeLocation"> | Date | string
    location?: XOR<LocationScalarRelationFilter, LocationWhereInput>
  }, "id" | "employee_id_location_id_location_type">

  export type EmployeeLocationOrderByWithAggregationInput = {
    id?: SortOrder
    employee_id?: SortOrder
    location_id?: SortOrder
    location_type?: SortOrder
    effective_date?: SortOrder
    end_date?: SortOrderInput | SortOrder
    status?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: EmployeeLocationCountOrderByAggregateInput
    _max?: EmployeeLocationMaxOrderByAggregateInput
    _min?: EmployeeLocationMinOrderByAggregateInput
  }

  export type EmployeeLocationScalarWhereWithAggregatesInput = {
    AND?: EmployeeLocationScalarWhereWithAggregatesInput | EmployeeLocationScalarWhereWithAggregatesInput[]
    OR?: EmployeeLocationScalarWhereWithAggregatesInput[]
    NOT?: EmployeeLocationScalarWhereWithAggregatesInput | EmployeeLocationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"EmployeeLocation"> | string
    employee_id?: StringWithAggregatesFilter<"EmployeeLocation"> | string
    location_id?: StringWithAggregatesFilter<"EmployeeLocation"> | string
    location_type?: StringWithAggregatesFilter<"EmployeeLocation"> | string
    effective_date?: DateTimeWithAggregatesFilter<"EmployeeLocation"> | Date | string
    end_date?: DateTimeNullableWithAggregatesFilter<"EmployeeLocation"> | Date | string | null
    status?: StringWithAggregatesFilter<"EmployeeLocation"> | string
    created_at?: DateTimeWithAggregatesFilter<"EmployeeLocation"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"EmployeeLocation"> | Date | string
  }

  export type AttendanceConfigWhereInput = {
    AND?: AttendanceConfigWhereInput | AttendanceConfigWhereInput[]
    OR?: AttendanceConfigWhereInput[]
    NOT?: AttendanceConfigWhereInput | AttendanceConfigWhereInput[]
    id?: StringFilter<"AttendanceConfig"> | string
    late_threshold_minutes?: IntFilter<"AttendanceConfig"> | number
    early_departure_threshold_minutes?: IntFilter<"AttendanceConfig"> | number
    overtime_approval_required?: BoolFilter<"AttendanceConfig"> | boolean
    consecutive_absence_alert_days?: IntFilter<"AttendanceConfig"> | number
    work_hours_per_day?: FloatFilter<"AttendanceConfig"> | number
    break_minutes?: IntFilter<"AttendanceConfig"> | number
    created_at?: DateTimeFilter<"AttendanceConfig"> | Date | string
    updated_at?: DateTimeFilter<"AttendanceConfig"> | Date | string
  }

  export type AttendanceConfigOrderByWithRelationInput = {
    id?: SortOrder
    late_threshold_minutes?: SortOrder
    early_departure_threshold_minutes?: SortOrder
    overtime_approval_required?: SortOrder
    consecutive_absence_alert_days?: SortOrder
    work_hours_per_day?: SortOrder
    break_minutes?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type AttendanceConfigWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AttendanceConfigWhereInput | AttendanceConfigWhereInput[]
    OR?: AttendanceConfigWhereInput[]
    NOT?: AttendanceConfigWhereInput | AttendanceConfigWhereInput[]
    late_threshold_minutes?: IntFilter<"AttendanceConfig"> | number
    early_departure_threshold_minutes?: IntFilter<"AttendanceConfig"> | number
    overtime_approval_required?: BoolFilter<"AttendanceConfig"> | boolean
    consecutive_absence_alert_days?: IntFilter<"AttendanceConfig"> | number
    work_hours_per_day?: FloatFilter<"AttendanceConfig"> | number
    break_minutes?: IntFilter<"AttendanceConfig"> | number
    created_at?: DateTimeFilter<"AttendanceConfig"> | Date | string
    updated_at?: DateTimeFilter<"AttendanceConfig"> | Date | string
  }, "id">

  export type AttendanceConfigOrderByWithAggregationInput = {
    id?: SortOrder
    late_threshold_minutes?: SortOrder
    early_departure_threshold_minutes?: SortOrder
    overtime_approval_required?: SortOrder
    consecutive_absence_alert_days?: SortOrder
    work_hours_per_day?: SortOrder
    break_minutes?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: AttendanceConfigCountOrderByAggregateInput
    _avg?: AttendanceConfigAvgOrderByAggregateInput
    _max?: AttendanceConfigMaxOrderByAggregateInput
    _min?: AttendanceConfigMinOrderByAggregateInput
    _sum?: AttendanceConfigSumOrderByAggregateInput
  }

  export type AttendanceConfigScalarWhereWithAggregatesInput = {
    AND?: AttendanceConfigScalarWhereWithAggregatesInput | AttendanceConfigScalarWhereWithAggregatesInput[]
    OR?: AttendanceConfigScalarWhereWithAggregatesInput[]
    NOT?: AttendanceConfigScalarWhereWithAggregatesInput | AttendanceConfigScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AttendanceConfig"> | string
    late_threshold_minutes?: IntWithAggregatesFilter<"AttendanceConfig"> | number
    early_departure_threshold_minutes?: IntWithAggregatesFilter<"AttendanceConfig"> | number
    overtime_approval_required?: BoolWithAggregatesFilter<"AttendanceConfig"> | boolean
    consecutive_absence_alert_days?: IntWithAggregatesFilter<"AttendanceConfig"> | number
    work_hours_per_day?: FloatWithAggregatesFilter<"AttendanceConfig"> | number
    break_minutes?: IntWithAggregatesFilter<"AttendanceConfig"> | number
    created_at?: DateTimeWithAggregatesFilter<"AttendanceConfig"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"AttendanceConfig"> | Date | string
  }

  export type ShiftCreateInput = {
    id?: string
    code: string
    name_en: string
    name_th?: string | null
    start_time: string
    end_time: string
    is_flexible?: boolean
    break_minutes?: number
    work_hours?: number
    is_active?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    attendance_records?: AttendanceRecordCreateNestedManyWithoutShiftInput
  }

  export type ShiftUncheckedCreateInput = {
    id?: string
    code: string
    name_en: string
    name_th?: string | null
    start_time: string
    end_time: string
    is_flexible?: boolean
    break_minutes?: number
    work_hours?: number
    is_active?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    attendance_records?: AttendanceRecordUncheckedCreateNestedManyWithoutShiftInput
  }

  export type ShiftUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    name_en?: StringFieldUpdateOperationsInput | string
    name_th?: NullableStringFieldUpdateOperationsInput | string | null
    start_time?: StringFieldUpdateOperationsInput | string
    end_time?: StringFieldUpdateOperationsInput | string
    is_flexible?: BoolFieldUpdateOperationsInput | boolean
    break_minutes?: IntFieldUpdateOperationsInput | number
    work_hours?: FloatFieldUpdateOperationsInput | number
    is_active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    attendance_records?: AttendanceRecordUpdateManyWithoutShiftNestedInput
  }

  export type ShiftUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    name_en?: StringFieldUpdateOperationsInput | string
    name_th?: NullableStringFieldUpdateOperationsInput | string | null
    start_time?: StringFieldUpdateOperationsInput | string
    end_time?: StringFieldUpdateOperationsInput | string
    is_flexible?: BoolFieldUpdateOperationsInput | boolean
    break_minutes?: IntFieldUpdateOperationsInput | number
    work_hours?: FloatFieldUpdateOperationsInput | number
    is_active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    attendance_records?: AttendanceRecordUncheckedUpdateManyWithoutShiftNestedInput
  }

  export type ShiftCreateManyInput = {
    id?: string
    code: string
    name_en: string
    name_th?: string | null
    start_time: string
    end_time: string
    is_flexible?: boolean
    break_minutes?: number
    work_hours?: number
    is_active?: boolean
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type ShiftUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    name_en?: StringFieldUpdateOperationsInput | string
    name_th?: NullableStringFieldUpdateOperationsInput | string | null
    start_time?: StringFieldUpdateOperationsInput | string
    end_time?: StringFieldUpdateOperationsInput | string
    is_flexible?: BoolFieldUpdateOperationsInput | boolean
    break_minutes?: IntFieldUpdateOperationsInput | number
    work_hours?: FloatFieldUpdateOperationsInput | number
    is_active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ShiftUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    name_en?: StringFieldUpdateOperationsInput | string
    name_th?: NullableStringFieldUpdateOperationsInput | string | null
    start_time?: StringFieldUpdateOperationsInput | string
    end_time?: StringFieldUpdateOperationsInput | string
    is_flexible?: BoolFieldUpdateOperationsInput | boolean
    break_minutes?: IntFieldUpdateOperationsInput | number
    work_hours?: FloatFieldUpdateOperationsInput | number
    is_active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AttendanceRecordCreateInput = {
    id?: string
    employee_id: string
    date: Date | string
    scheduled_start?: string | null
    scheduled_end?: string | null
    actual_check_in?: string | null
    actual_check_out?: string | null
    check_in_source?: string | null
    check_in_location?: string | null
    check_out_source?: string | null
    check_out_location?: string | null
    working_hours?: number | null
    overtime_hours?: number
    is_late?: boolean
    late_minutes?: number
    is_early_departure?: boolean
    early_minutes?: number
    status?: string
    anomalies?: AttendanceRecordCreateanomaliesInput | string[]
    created_at?: Date | string
    updated_at?: Date | string
    shift?: ShiftCreateNestedOneWithoutAttendance_recordsInput
  }

  export type AttendanceRecordUncheckedCreateInput = {
    id?: string
    employee_id: string
    date: Date | string
    shift_id?: string | null
    scheduled_start?: string | null
    scheduled_end?: string | null
    actual_check_in?: string | null
    actual_check_out?: string | null
    check_in_source?: string | null
    check_in_location?: string | null
    check_out_source?: string | null
    check_out_location?: string | null
    working_hours?: number | null
    overtime_hours?: number
    is_late?: boolean
    late_minutes?: number
    is_early_departure?: boolean
    early_minutes?: number
    status?: string
    anomalies?: AttendanceRecordCreateanomaliesInput | string[]
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type AttendanceRecordUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    employee_id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    scheduled_start?: NullableStringFieldUpdateOperationsInput | string | null
    scheduled_end?: NullableStringFieldUpdateOperationsInput | string | null
    actual_check_in?: NullableStringFieldUpdateOperationsInput | string | null
    actual_check_out?: NullableStringFieldUpdateOperationsInput | string | null
    check_in_source?: NullableStringFieldUpdateOperationsInput | string | null
    check_in_location?: NullableStringFieldUpdateOperationsInput | string | null
    check_out_source?: NullableStringFieldUpdateOperationsInput | string | null
    check_out_location?: NullableStringFieldUpdateOperationsInput | string | null
    working_hours?: NullableFloatFieldUpdateOperationsInput | number | null
    overtime_hours?: FloatFieldUpdateOperationsInput | number
    is_late?: BoolFieldUpdateOperationsInput | boolean
    late_minutes?: IntFieldUpdateOperationsInput | number
    is_early_departure?: BoolFieldUpdateOperationsInput | boolean
    early_minutes?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    anomalies?: AttendanceRecordUpdateanomaliesInput | string[]
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    shift?: ShiftUpdateOneWithoutAttendance_recordsNestedInput
  }

  export type AttendanceRecordUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    employee_id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    shift_id?: NullableStringFieldUpdateOperationsInput | string | null
    scheduled_start?: NullableStringFieldUpdateOperationsInput | string | null
    scheduled_end?: NullableStringFieldUpdateOperationsInput | string | null
    actual_check_in?: NullableStringFieldUpdateOperationsInput | string | null
    actual_check_out?: NullableStringFieldUpdateOperationsInput | string | null
    check_in_source?: NullableStringFieldUpdateOperationsInput | string | null
    check_in_location?: NullableStringFieldUpdateOperationsInput | string | null
    check_out_source?: NullableStringFieldUpdateOperationsInput | string | null
    check_out_location?: NullableStringFieldUpdateOperationsInput | string | null
    working_hours?: NullableFloatFieldUpdateOperationsInput | number | null
    overtime_hours?: FloatFieldUpdateOperationsInput | number
    is_late?: BoolFieldUpdateOperationsInput | boolean
    late_minutes?: IntFieldUpdateOperationsInput | number
    is_early_departure?: BoolFieldUpdateOperationsInput | boolean
    early_minutes?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    anomalies?: AttendanceRecordUpdateanomaliesInput | string[]
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AttendanceRecordCreateManyInput = {
    id?: string
    employee_id: string
    date: Date | string
    shift_id?: string | null
    scheduled_start?: string | null
    scheduled_end?: string | null
    actual_check_in?: string | null
    actual_check_out?: string | null
    check_in_source?: string | null
    check_in_location?: string | null
    check_out_source?: string | null
    check_out_location?: string | null
    working_hours?: number | null
    overtime_hours?: number
    is_late?: boolean
    late_minutes?: number
    is_early_departure?: boolean
    early_minutes?: number
    status?: string
    anomalies?: AttendanceRecordCreateanomaliesInput | string[]
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type AttendanceRecordUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    employee_id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    scheduled_start?: NullableStringFieldUpdateOperationsInput | string | null
    scheduled_end?: NullableStringFieldUpdateOperationsInput | string | null
    actual_check_in?: NullableStringFieldUpdateOperationsInput | string | null
    actual_check_out?: NullableStringFieldUpdateOperationsInput | string | null
    check_in_source?: NullableStringFieldUpdateOperationsInput | string | null
    check_in_location?: NullableStringFieldUpdateOperationsInput | string | null
    check_out_source?: NullableStringFieldUpdateOperationsInput | string | null
    check_out_location?: NullableStringFieldUpdateOperationsInput | string | null
    working_hours?: NullableFloatFieldUpdateOperationsInput | number | null
    overtime_hours?: FloatFieldUpdateOperationsInput | number
    is_late?: BoolFieldUpdateOperationsInput | boolean
    late_minutes?: IntFieldUpdateOperationsInput | number
    is_early_departure?: BoolFieldUpdateOperationsInput | boolean
    early_minutes?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    anomalies?: AttendanceRecordUpdateanomaliesInput | string[]
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AttendanceRecordUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    employee_id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    shift_id?: NullableStringFieldUpdateOperationsInput | string | null
    scheduled_start?: NullableStringFieldUpdateOperationsInput | string | null
    scheduled_end?: NullableStringFieldUpdateOperationsInput | string | null
    actual_check_in?: NullableStringFieldUpdateOperationsInput | string | null
    actual_check_out?: NullableStringFieldUpdateOperationsInput | string | null
    check_in_source?: NullableStringFieldUpdateOperationsInput | string | null
    check_in_location?: NullableStringFieldUpdateOperationsInput | string | null
    check_out_source?: NullableStringFieldUpdateOperationsInput | string | null
    check_out_location?: NullableStringFieldUpdateOperationsInput | string | null
    working_hours?: NullableFloatFieldUpdateOperationsInput | number | null
    overtime_hours?: FloatFieldUpdateOperationsInput | number
    is_late?: BoolFieldUpdateOperationsInput | boolean
    late_minutes?: IntFieldUpdateOperationsInput | number
    is_early_departure?: BoolFieldUpdateOperationsInput | boolean
    early_minutes?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    anomalies?: AttendanceRecordUpdateanomaliesInput | string[]
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OvertimeRequestCreateInput = {
    id?: string
    employee_id: string
    date: Date | string
    day_type: string
    start_time: string
    end_time: string
    hours: number
    ot_type: string
    rate: number
    hourly_rate: number
    amount: number
    has_night_premium?: boolean
    night_hours?: number
    night_premium_amount?: number
    total_amount: number
    reason: string
    work_description?: string | null
    pre_approved?: boolean
    status?: string
    submitted_at?: Date | string
    approved_at?: Date | string | null
    approved_by?: string | null
    rejected_at?: Date | string | null
    rejected_by?: string | null
    rejection_reason?: string | null
    post_confirmed?: boolean
    post_confirmed_at?: Date | string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type OvertimeRequestUncheckedCreateInput = {
    id?: string
    employee_id: string
    date: Date | string
    day_type: string
    start_time: string
    end_time: string
    hours: number
    ot_type: string
    rate: number
    hourly_rate: number
    amount: number
    has_night_premium?: boolean
    night_hours?: number
    night_premium_amount?: number
    total_amount: number
    reason: string
    work_description?: string | null
    pre_approved?: boolean
    status?: string
    submitted_at?: Date | string
    approved_at?: Date | string | null
    approved_by?: string | null
    rejected_at?: Date | string | null
    rejected_by?: string | null
    rejection_reason?: string | null
    post_confirmed?: boolean
    post_confirmed_at?: Date | string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type OvertimeRequestUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    employee_id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    day_type?: StringFieldUpdateOperationsInput | string
    start_time?: StringFieldUpdateOperationsInput | string
    end_time?: StringFieldUpdateOperationsInput | string
    hours?: FloatFieldUpdateOperationsInput | number
    ot_type?: StringFieldUpdateOperationsInput | string
    rate?: FloatFieldUpdateOperationsInput | number
    hourly_rate?: FloatFieldUpdateOperationsInput | number
    amount?: FloatFieldUpdateOperationsInput | number
    has_night_premium?: BoolFieldUpdateOperationsInput | boolean
    night_hours?: FloatFieldUpdateOperationsInput | number
    night_premium_amount?: FloatFieldUpdateOperationsInput | number
    total_amount?: FloatFieldUpdateOperationsInput | number
    reason?: StringFieldUpdateOperationsInput | string
    work_description?: NullableStringFieldUpdateOperationsInput | string | null
    pre_approved?: BoolFieldUpdateOperationsInput | boolean
    status?: StringFieldUpdateOperationsInput | string
    submitted_at?: DateTimeFieldUpdateOperationsInput | Date | string
    approved_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    approved_by?: NullableStringFieldUpdateOperationsInput | string | null
    rejected_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rejected_by?: NullableStringFieldUpdateOperationsInput | string | null
    rejection_reason?: NullableStringFieldUpdateOperationsInput | string | null
    post_confirmed?: BoolFieldUpdateOperationsInput | boolean
    post_confirmed_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OvertimeRequestUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    employee_id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    day_type?: StringFieldUpdateOperationsInput | string
    start_time?: StringFieldUpdateOperationsInput | string
    end_time?: StringFieldUpdateOperationsInput | string
    hours?: FloatFieldUpdateOperationsInput | number
    ot_type?: StringFieldUpdateOperationsInput | string
    rate?: FloatFieldUpdateOperationsInput | number
    hourly_rate?: FloatFieldUpdateOperationsInput | number
    amount?: FloatFieldUpdateOperationsInput | number
    has_night_premium?: BoolFieldUpdateOperationsInput | boolean
    night_hours?: FloatFieldUpdateOperationsInput | number
    night_premium_amount?: FloatFieldUpdateOperationsInput | number
    total_amount?: FloatFieldUpdateOperationsInput | number
    reason?: StringFieldUpdateOperationsInput | string
    work_description?: NullableStringFieldUpdateOperationsInput | string | null
    pre_approved?: BoolFieldUpdateOperationsInput | boolean
    status?: StringFieldUpdateOperationsInput | string
    submitted_at?: DateTimeFieldUpdateOperationsInput | Date | string
    approved_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    approved_by?: NullableStringFieldUpdateOperationsInput | string | null
    rejected_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rejected_by?: NullableStringFieldUpdateOperationsInput | string | null
    rejection_reason?: NullableStringFieldUpdateOperationsInput | string | null
    post_confirmed?: BoolFieldUpdateOperationsInput | boolean
    post_confirmed_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OvertimeRequestCreateManyInput = {
    id?: string
    employee_id: string
    date: Date | string
    day_type: string
    start_time: string
    end_time: string
    hours: number
    ot_type: string
    rate: number
    hourly_rate: number
    amount: number
    has_night_premium?: boolean
    night_hours?: number
    night_premium_amount?: number
    total_amount: number
    reason: string
    work_description?: string | null
    pre_approved?: boolean
    status?: string
    submitted_at?: Date | string
    approved_at?: Date | string | null
    approved_by?: string | null
    rejected_at?: Date | string | null
    rejected_by?: string | null
    rejection_reason?: string | null
    post_confirmed?: boolean
    post_confirmed_at?: Date | string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type OvertimeRequestUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    employee_id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    day_type?: StringFieldUpdateOperationsInput | string
    start_time?: StringFieldUpdateOperationsInput | string
    end_time?: StringFieldUpdateOperationsInput | string
    hours?: FloatFieldUpdateOperationsInput | number
    ot_type?: StringFieldUpdateOperationsInput | string
    rate?: FloatFieldUpdateOperationsInput | number
    hourly_rate?: FloatFieldUpdateOperationsInput | number
    amount?: FloatFieldUpdateOperationsInput | number
    has_night_premium?: BoolFieldUpdateOperationsInput | boolean
    night_hours?: FloatFieldUpdateOperationsInput | number
    night_premium_amount?: FloatFieldUpdateOperationsInput | number
    total_amount?: FloatFieldUpdateOperationsInput | number
    reason?: StringFieldUpdateOperationsInput | string
    work_description?: NullableStringFieldUpdateOperationsInput | string | null
    pre_approved?: BoolFieldUpdateOperationsInput | boolean
    status?: StringFieldUpdateOperationsInput | string
    submitted_at?: DateTimeFieldUpdateOperationsInput | Date | string
    approved_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    approved_by?: NullableStringFieldUpdateOperationsInput | string | null
    rejected_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rejected_by?: NullableStringFieldUpdateOperationsInput | string | null
    rejection_reason?: NullableStringFieldUpdateOperationsInput | string | null
    post_confirmed?: BoolFieldUpdateOperationsInput | boolean
    post_confirmed_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OvertimeRequestUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    employee_id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    day_type?: StringFieldUpdateOperationsInput | string
    start_time?: StringFieldUpdateOperationsInput | string
    end_time?: StringFieldUpdateOperationsInput | string
    hours?: FloatFieldUpdateOperationsInput | number
    ot_type?: StringFieldUpdateOperationsInput | string
    rate?: FloatFieldUpdateOperationsInput | number
    hourly_rate?: FloatFieldUpdateOperationsInput | number
    amount?: FloatFieldUpdateOperationsInput | number
    has_night_premium?: BoolFieldUpdateOperationsInput | boolean
    night_hours?: FloatFieldUpdateOperationsInput | number
    night_premium_amount?: FloatFieldUpdateOperationsInput | number
    total_amount?: FloatFieldUpdateOperationsInput | number
    reason?: StringFieldUpdateOperationsInput | string
    work_description?: NullableStringFieldUpdateOperationsInput | string | null
    pre_approved?: BoolFieldUpdateOperationsInput | boolean
    status?: StringFieldUpdateOperationsInput | string
    submitted_at?: DateTimeFieldUpdateOperationsInput | Date | string
    approved_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    approved_by?: NullableStringFieldUpdateOperationsInput | string | null
    rejected_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rejected_by?: NullableStringFieldUpdateOperationsInput | string | null
    rejection_reason?: NullableStringFieldUpdateOperationsInput | string | null
    post_confirmed?: BoolFieldUpdateOperationsInput | boolean
    post_confirmed_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LocationCreateInput = {
    id?: string
    location_code: string
    name_en: string
    name_th?: string | null
    location_type: string
    address?: NullableJsonNullValueInput | InputJsonValue
    coordinates?: NullableJsonNullValueInput | InputJsonValue
    status?: string
    headcount?: number
    created_at?: Date | string
    updated_at?: Date | string
    parent?: LocationCreateNestedOneWithoutChildrenInput
    children?: LocationCreateNestedManyWithoutParentInput
    employee_locations?: EmployeeLocationCreateNestedManyWithoutLocationInput
  }

  export type LocationUncheckedCreateInput = {
    id?: string
    location_code: string
    name_en: string
    name_th?: string | null
    location_type: string
    parent_location_id?: string | null
    address?: NullableJsonNullValueInput | InputJsonValue
    coordinates?: NullableJsonNullValueInput | InputJsonValue
    status?: string
    headcount?: number
    created_at?: Date | string
    updated_at?: Date | string
    children?: LocationUncheckedCreateNestedManyWithoutParentInput
    employee_locations?: EmployeeLocationUncheckedCreateNestedManyWithoutLocationInput
  }

  export type LocationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    location_code?: StringFieldUpdateOperationsInput | string
    name_en?: StringFieldUpdateOperationsInput | string
    name_th?: NullableStringFieldUpdateOperationsInput | string | null
    location_type?: StringFieldUpdateOperationsInput | string
    address?: NullableJsonNullValueInput | InputJsonValue
    coordinates?: NullableJsonNullValueInput | InputJsonValue
    status?: StringFieldUpdateOperationsInput | string
    headcount?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    parent?: LocationUpdateOneWithoutChildrenNestedInput
    children?: LocationUpdateManyWithoutParentNestedInput
    employee_locations?: EmployeeLocationUpdateManyWithoutLocationNestedInput
  }

  export type LocationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    location_code?: StringFieldUpdateOperationsInput | string
    name_en?: StringFieldUpdateOperationsInput | string
    name_th?: NullableStringFieldUpdateOperationsInput | string | null
    location_type?: StringFieldUpdateOperationsInput | string
    parent_location_id?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableJsonNullValueInput | InputJsonValue
    coordinates?: NullableJsonNullValueInput | InputJsonValue
    status?: StringFieldUpdateOperationsInput | string
    headcount?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    children?: LocationUncheckedUpdateManyWithoutParentNestedInput
    employee_locations?: EmployeeLocationUncheckedUpdateManyWithoutLocationNestedInput
  }

  export type LocationCreateManyInput = {
    id?: string
    location_code: string
    name_en: string
    name_th?: string | null
    location_type: string
    parent_location_id?: string | null
    address?: NullableJsonNullValueInput | InputJsonValue
    coordinates?: NullableJsonNullValueInput | InputJsonValue
    status?: string
    headcount?: number
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type LocationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    location_code?: StringFieldUpdateOperationsInput | string
    name_en?: StringFieldUpdateOperationsInput | string
    name_th?: NullableStringFieldUpdateOperationsInput | string | null
    location_type?: StringFieldUpdateOperationsInput | string
    address?: NullableJsonNullValueInput | InputJsonValue
    coordinates?: NullableJsonNullValueInput | InputJsonValue
    status?: StringFieldUpdateOperationsInput | string
    headcount?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LocationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    location_code?: StringFieldUpdateOperationsInput | string
    name_en?: StringFieldUpdateOperationsInput | string
    name_th?: NullableStringFieldUpdateOperationsInput | string | null
    location_type?: StringFieldUpdateOperationsInput | string
    parent_location_id?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableJsonNullValueInput | InputJsonValue
    coordinates?: NullableJsonNullValueInput | InputJsonValue
    status?: StringFieldUpdateOperationsInput | string
    headcount?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmployeeLocationCreateInput = {
    id?: string
    employee_id: string
    location_type?: string
    effective_date: Date | string
    end_date?: Date | string | null
    status?: string
    created_at?: Date | string
    updated_at?: Date | string
    location: LocationCreateNestedOneWithoutEmployee_locationsInput
  }

  export type EmployeeLocationUncheckedCreateInput = {
    id?: string
    employee_id: string
    location_id: string
    location_type?: string
    effective_date: Date | string
    end_date?: Date | string | null
    status?: string
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type EmployeeLocationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    employee_id?: StringFieldUpdateOperationsInput | string
    location_type?: StringFieldUpdateOperationsInput | string
    effective_date?: DateTimeFieldUpdateOperationsInput | Date | string
    end_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    location?: LocationUpdateOneRequiredWithoutEmployee_locationsNestedInput
  }

  export type EmployeeLocationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    employee_id?: StringFieldUpdateOperationsInput | string
    location_id?: StringFieldUpdateOperationsInput | string
    location_type?: StringFieldUpdateOperationsInput | string
    effective_date?: DateTimeFieldUpdateOperationsInput | Date | string
    end_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmployeeLocationCreateManyInput = {
    id?: string
    employee_id: string
    location_id: string
    location_type?: string
    effective_date: Date | string
    end_date?: Date | string | null
    status?: string
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type EmployeeLocationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    employee_id?: StringFieldUpdateOperationsInput | string
    location_type?: StringFieldUpdateOperationsInput | string
    effective_date?: DateTimeFieldUpdateOperationsInput | Date | string
    end_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmployeeLocationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    employee_id?: StringFieldUpdateOperationsInput | string
    location_id?: StringFieldUpdateOperationsInput | string
    location_type?: StringFieldUpdateOperationsInput | string
    effective_date?: DateTimeFieldUpdateOperationsInput | Date | string
    end_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AttendanceConfigCreateInput = {
    id?: string
    late_threshold_minutes?: number
    early_departure_threshold_minutes?: number
    overtime_approval_required?: boolean
    consecutive_absence_alert_days?: number
    work_hours_per_day?: number
    break_minutes?: number
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type AttendanceConfigUncheckedCreateInput = {
    id?: string
    late_threshold_minutes?: number
    early_departure_threshold_minutes?: number
    overtime_approval_required?: boolean
    consecutive_absence_alert_days?: number
    work_hours_per_day?: number
    break_minutes?: number
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type AttendanceConfigUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    late_threshold_minutes?: IntFieldUpdateOperationsInput | number
    early_departure_threshold_minutes?: IntFieldUpdateOperationsInput | number
    overtime_approval_required?: BoolFieldUpdateOperationsInput | boolean
    consecutive_absence_alert_days?: IntFieldUpdateOperationsInput | number
    work_hours_per_day?: FloatFieldUpdateOperationsInput | number
    break_minutes?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AttendanceConfigUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    late_threshold_minutes?: IntFieldUpdateOperationsInput | number
    early_departure_threshold_minutes?: IntFieldUpdateOperationsInput | number
    overtime_approval_required?: BoolFieldUpdateOperationsInput | boolean
    consecutive_absence_alert_days?: IntFieldUpdateOperationsInput | number
    work_hours_per_day?: FloatFieldUpdateOperationsInput | number
    break_minutes?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AttendanceConfigCreateManyInput = {
    id?: string
    late_threshold_minutes?: number
    early_departure_threshold_minutes?: number
    overtime_approval_required?: boolean
    consecutive_absence_alert_days?: number
    work_hours_per_day?: number
    break_minutes?: number
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type AttendanceConfigUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    late_threshold_minutes?: IntFieldUpdateOperationsInput | number
    early_departure_threshold_minutes?: IntFieldUpdateOperationsInput | number
    overtime_approval_required?: BoolFieldUpdateOperationsInput | boolean
    consecutive_absence_alert_days?: IntFieldUpdateOperationsInput | number
    work_hours_per_day?: FloatFieldUpdateOperationsInput | number
    break_minutes?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AttendanceConfigUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    late_threshold_minutes?: IntFieldUpdateOperationsInput | number
    early_departure_threshold_minutes?: IntFieldUpdateOperationsInput | number
    overtime_approval_required?: BoolFieldUpdateOperationsInput | boolean
    consecutive_absence_alert_days?: IntFieldUpdateOperationsInput | number
    work_hours_per_day?: FloatFieldUpdateOperationsInput | number
    break_minutes?: IntFieldUpdateOperationsInput | number
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

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
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

  export type AttendanceRecordListRelationFilter = {
    every?: AttendanceRecordWhereInput
    some?: AttendanceRecordWhereInput
    none?: AttendanceRecordWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type AttendanceRecordOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ShiftCountOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    name_en?: SortOrder
    name_th?: SortOrder
    start_time?: SortOrder
    end_time?: SortOrder
    is_flexible?: SortOrder
    break_minutes?: SortOrder
    work_hours?: SortOrder
    is_active?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type ShiftAvgOrderByAggregateInput = {
    break_minutes?: SortOrder
    work_hours?: SortOrder
  }

  export type ShiftMaxOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    name_en?: SortOrder
    name_th?: SortOrder
    start_time?: SortOrder
    end_time?: SortOrder
    is_flexible?: SortOrder
    break_minutes?: SortOrder
    work_hours?: SortOrder
    is_active?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type ShiftMinOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    name_en?: SortOrder
    name_th?: SortOrder
    start_time?: SortOrder
    end_time?: SortOrder
    is_flexible?: SortOrder
    break_minutes?: SortOrder
    work_hours?: SortOrder
    is_active?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type ShiftSumOrderByAggregateInput = {
    break_minutes?: SortOrder
    work_hours?: SortOrder
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

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
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

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type ShiftNullableScalarRelationFilter = {
    is?: ShiftWhereInput | null
    isNot?: ShiftWhereInput | null
  }

  export type AttendanceRecordEmployee_idDateCompoundUniqueInput = {
    employee_id: string
    date: Date | string
  }

  export type AttendanceRecordCountOrderByAggregateInput = {
    id?: SortOrder
    employee_id?: SortOrder
    date?: SortOrder
    shift_id?: SortOrder
    scheduled_start?: SortOrder
    scheduled_end?: SortOrder
    actual_check_in?: SortOrder
    actual_check_out?: SortOrder
    check_in_source?: SortOrder
    check_in_location?: SortOrder
    check_out_source?: SortOrder
    check_out_location?: SortOrder
    working_hours?: SortOrder
    overtime_hours?: SortOrder
    is_late?: SortOrder
    late_minutes?: SortOrder
    is_early_departure?: SortOrder
    early_minutes?: SortOrder
    status?: SortOrder
    anomalies?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type AttendanceRecordAvgOrderByAggregateInput = {
    working_hours?: SortOrder
    overtime_hours?: SortOrder
    late_minutes?: SortOrder
    early_minutes?: SortOrder
  }

  export type AttendanceRecordMaxOrderByAggregateInput = {
    id?: SortOrder
    employee_id?: SortOrder
    date?: SortOrder
    shift_id?: SortOrder
    scheduled_start?: SortOrder
    scheduled_end?: SortOrder
    actual_check_in?: SortOrder
    actual_check_out?: SortOrder
    check_in_source?: SortOrder
    check_in_location?: SortOrder
    check_out_source?: SortOrder
    check_out_location?: SortOrder
    working_hours?: SortOrder
    overtime_hours?: SortOrder
    is_late?: SortOrder
    late_minutes?: SortOrder
    is_early_departure?: SortOrder
    early_minutes?: SortOrder
    status?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type AttendanceRecordMinOrderByAggregateInput = {
    id?: SortOrder
    employee_id?: SortOrder
    date?: SortOrder
    shift_id?: SortOrder
    scheduled_start?: SortOrder
    scheduled_end?: SortOrder
    actual_check_in?: SortOrder
    actual_check_out?: SortOrder
    check_in_source?: SortOrder
    check_in_location?: SortOrder
    check_out_source?: SortOrder
    check_out_location?: SortOrder
    working_hours?: SortOrder
    overtime_hours?: SortOrder
    is_late?: SortOrder
    late_minutes?: SortOrder
    is_early_departure?: SortOrder
    early_minutes?: SortOrder
    status?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type AttendanceRecordSumOrderByAggregateInput = {
    working_hours?: SortOrder
    overtime_hours?: SortOrder
    late_minutes?: SortOrder
    early_minutes?: SortOrder
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

  export type OvertimeRequestCountOrderByAggregateInput = {
    id?: SortOrder
    employee_id?: SortOrder
    date?: SortOrder
    day_type?: SortOrder
    start_time?: SortOrder
    end_time?: SortOrder
    hours?: SortOrder
    ot_type?: SortOrder
    rate?: SortOrder
    hourly_rate?: SortOrder
    amount?: SortOrder
    has_night_premium?: SortOrder
    night_hours?: SortOrder
    night_premium_amount?: SortOrder
    total_amount?: SortOrder
    reason?: SortOrder
    work_description?: SortOrder
    pre_approved?: SortOrder
    status?: SortOrder
    submitted_at?: SortOrder
    approved_at?: SortOrder
    approved_by?: SortOrder
    rejected_at?: SortOrder
    rejected_by?: SortOrder
    rejection_reason?: SortOrder
    post_confirmed?: SortOrder
    post_confirmed_at?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type OvertimeRequestAvgOrderByAggregateInput = {
    hours?: SortOrder
    rate?: SortOrder
    hourly_rate?: SortOrder
    amount?: SortOrder
    night_hours?: SortOrder
    night_premium_amount?: SortOrder
    total_amount?: SortOrder
  }

  export type OvertimeRequestMaxOrderByAggregateInput = {
    id?: SortOrder
    employee_id?: SortOrder
    date?: SortOrder
    day_type?: SortOrder
    start_time?: SortOrder
    end_time?: SortOrder
    hours?: SortOrder
    ot_type?: SortOrder
    rate?: SortOrder
    hourly_rate?: SortOrder
    amount?: SortOrder
    has_night_premium?: SortOrder
    night_hours?: SortOrder
    night_premium_amount?: SortOrder
    total_amount?: SortOrder
    reason?: SortOrder
    work_description?: SortOrder
    pre_approved?: SortOrder
    status?: SortOrder
    submitted_at?: SortOrder
    approved_at?: SortOrder
    approved_by?: SortOrder
    rejected_at?: SortOrder
    rejected_by?: SortOrder
    rejection_reason?: SortOrder
    post_confirmed?: SortOrder
    post_confirmed_at?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type OvertimeRequestMinOrderByAggregateInput = {
    id?: SortOrder
    employee_id?: SortOrder
    date?: SortOrder
    day_type?: SortOrder
    start_time?: SortOrder
    end_time?: SortOrder
    hours?: SortOrder
    ot_type?: SortOrder
    rate?: SortOrder
    hourly_rate?: SortOrder
    amount?: SortOrder
    has_night_premium?: SortOrder
    night_hours?: SortOrder
    night_premium_amount?: SortOrder
    total_amount?: SortOrder
    reason?: SortOrder
    work_description?: SortOrder
    pre_approved?: SortOrder
    status?: SortOrder
    submitted_at?: SortOrder
    approved_at?: SortOrder
    approved_by?: SortOrder
    rejected_at?: SortOrder
    rejected_by?: SortOrder
    rejection_reason?: SortOrder
    post_confirmed?: SortOrder
    post_confirmed_at?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type OvertimeRequestSumOrderByAggregateInput = {
    hours?: SortOrder
    rate?: SortOrder
    hourly_rate?: SortOrder
    amount?: SortOrder
    night_hours?: SortOrder
    night_premium_amount?: SortOrder
    total_amount?: SortOrder
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

  export type LocationNullableScalarRelationFilter = {
    is?: LocationWhereInput | null
    isNot?: LocationWhereInput | null
  }

  export type LocationListRelationFilter = {
    every?: LocationWhereInput
    some?: LocationWhereInput
    none?: LocationWhereInput
  }

  export type EmployeeLocationListRelationFilter = {
    every?: EmployeeLocationWhereInput
    some?: EmployeeLocationWhereInput
    none?: EmployeeLocationWhereInput
  }

  export type LocationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type EmployeeLocationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type LocationCountOrderByAggregateInput = {
    id?: SortOrder
    location_code?: SortOrder
    name_en?: SortOrder
    name_th?: SortOrder
    location_type?: SortOrder
    parent_location_id?: SortOrder
    address?: SortOrder
    coordinates?: SortOrder
    status?: SortOrder
    headcount?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type LocationAvgOrderByAggregateInput = {
    headcount?: SortOrder
  }

  export type LocationMaxOrderByAggregateInput = {
    id?: SortOrder
    location_code?: SortOrder
    name_en?: SortOrder
    name_th?: SortOrder
    location_type?: SortOrder
    parent_location_id?: SortOrder
    status?: SortOrder
    headcount?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type LocationMinOrderByAggregateInput = {
    id?: SortOrder
    location_code?: SortOrder
    name_en?: SortOrder
    name_th?: SortOrder
    location_type?: SortOrder
    parent_location_id?: SortOrder
    status?: SortOrder
    headcount?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type LocationSumOrderByAggregateInput = {
    headcount?: SortOrder
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

  export type LocationScalarRelationFilter = {
    is?: LocationWhereInput
    isNot?: LocationWhereInput
  }

  export type EmployeeLocationEmployee_idLocation_idLocation_typeCompoundUniqueInput = {
    employee_id: string
    location_id: string
    location_type: string
  }

  export type EmployeeLocationCountOrderByAggregateInput = {
    id?: SortOrder
    employee_id?: SortOrder
    location_id?: SortOrder
    location_type?: SortOrder
    effective_date?: SortOrder
    end_date?: SortOrder
    status?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type EmployeeLocationMaxOrderByAggregateInput = {
    id?: SortOrder
    employee_id?: SortOrder
    location_id?: SortOrder
    location_type?: SortOrder
    effective_date?: SortOrder
    end_date?: SortOrder
    status?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type EmployeeLocationMinOrderByAggregateInput = {
    id?: SortOrder
    employee_id?: SortOrder
    location_id?: SortOrder
    location_type?: SortOrder
    effective_date?: SortOrder
    end_date?: SortOrder
    status?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type AttendanceConfigCountOrderByAggregateInput = {
    id?: SortOrder
    late_threshold_minutes?: SortOrder
    early_departure_threshold_minutes?: SortOrder
    overtime_approval_required?: SortOrder
    consecutive_absence_alert_days?: SortOrder
    work_hours_per_day?: SortOrder
    break_minutes?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type AttendanceConfigAvgOrderByAggregateInput = {
    late_threshold_minutes?: SortOrder
    early_departure_threshold_minutes?: SortOrder
    consecutive_absence_alert_days?: SortOrder
    work_hours_per_day?: SortOrder
    break_minutes?: SortOrder
  }

  export type AttendanceConfigMaxOrderByAggregateInput = {
    id?: SortOrder
    late_threshold_minutes?: SortOrder
    early_departure_threshold_minutes?: SortOrder
    overtime_approval_required?: SortOrder
    consecutive_absence_alert_days?: SortOrder
    work_hours_per_day?: SortOrder
    break_minutes?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type AttendanceConfigMinOrderByAggregateInput = {
    id?: SortOrder
    late_threshold_minutes?: SortOrder
    early_departure_threshold_minutes?: SortOrder
    overtime_approval_required?: SortOrder
    consecutive_absence_alert_days?: SortOrder
    work_hours_per_day?: SortOrder
    break_minutes?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type AttendanceConfigSumOrderByAggregateInput = {
    late_threshold_minutes?: SortOrder
    early_departure_threshold_minutes?: SortOrder
    consecutive_absence_alert_days?: SortOrder
    work_hours_per_day?: SortOrder
    break_minutes?: SortOrder
  }

  export type AttendanceRecordCreateNestedManyWithoutShiftInput = {
    create?: XOR<AttendanceRecordCreateWithoutShiftInput, AttendanceRecordUncheckedCreateWithoutShiftInput> | AttendanceRecordCreateWithoutShiftInput[] | AttendanceRecordUncheckedCreateWithoutShiftInput[]
    connectOrCreate?: AttendanceRecordCreateOrConnectWithoutShiftInput | AttendanceRecordCreateOrConnectWithoutShiftInput[]
    createMany?: AttendanceRecordCreateManyShiftInputEnvelope
    connect?: AttendanceRecordWhereUniqueInput | AttendanceRecordWhereUniqueInput[]
  }

  export type AttendanceRecordUncheckedCreateNestedManyWithoutShiftInput = {
    create?: XOR<AttendanceRecordCreateWithoutShiftInput, AttendanceRecordUncheckedCreateWithoutShiftInput> | AttendanceRecordCreateWithoutShiftInput[] | AttendanceRecordUncheckedCreateWithoutShiftInput[]
    connectOrCreate?: AttendanceRecordCreateOrConnectWithoutShiftInput | AttendanceRecordCreateOrConnectWithoutShiftInput[]
    createMany?: AttendanceRecordCreateManyShiftInputEnvelope
    connect?: AttendanceRecordWhereUniqueInput | AttendanceRecordWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
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

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type AttendanceRecordUpdateManyWithoutShiftNestedInput = {
    create?: XOR<AttendanceRecordCreateWithoutShiftInput, AttendanceRecordUncheckedCreateWithoutShiftInput> | AttendanceRecordCreateWithoutShiftInput[] | AttendanceRecordUncheckedCreateWithoutShiftInput[]
    connectOrCreate?: AttendanceRecordCreateOrConnectWithoutShiftInput | AttendanceRecordCreateOrConnectWithoutShiftInput[]
    upsert?: AttendanceRecordUpsertWithWhereUniqueWithoutShiftInput | AttendanceRecordUpsertWithWhereUniqueWithoutShiftInput[]
    createMany?: AttendanceRecordCreateManyShiftInputEnvelope
    set?: AttendanceRecordWhereUniqueInput | AttendanceRecordWhereUniqueInput[]
    disconnect?: AttendanceRecordWhereUniqueInput | AttendanceRecordWhereUniqueInput[]
    delete?: AttendanceRecordWhereUniqueInput | AttendanceRecordWhereUniqueInput[]
    connect?: AttendanceRecordWhereUniqueInput | AttendanceRecordWhereUniqueInput[]
    update?: AttendanceRecordUpdateWithWhereUniqueWithoutShiftInput | AttendanceRecordUpdateWithWhereUniqueWithoutShiftInput[]
    updateMany?: AttendanceRecordUpdateManyWithWhereWithoutShiftInput | AttendanceRecordUpdateManyWithWhereWithoutShiftInput[]
    deleteMany?: AttendanceRecordScalarWhereInput | AttendanceRecordScalarWhereInput[]
  }

  export type AttendanceRecordUncheckedUpdateManyWithoutShiftNestedInput = {
    create?: XOR<AttendanceRecordCreateWithoutShiftInput, AttendanceRecordUncheckedCreateWithoutShiftInput> | AttendanceRecordCreateWithoutShiftInput[] | AttendanceRecordUncheckedCreateWithoutShiftInput[]
    connectOrCreate?: AttendanceRecordCreateOrConnectWithoutShiftInput | AttendanceRecordCreateOrConnectWithoutShiftInput[]
    upsert?: AttendanceRecordUpsertWithWhereUniqueWithoutShiftInput | AttendanceRecordUpsertWithWhereUniqueWithoutShiftInput[]
    createMany?: AttendanceRecordCreateManyShiftInputEnvelope
    set?: AttendanceRecordWhereUniqueInput | AttendanceRecordWhereUniqueInput[]
    disconnect?: AttendanceRecordWhereUniqueInput | AttendanceRecordWhereUniqueInput[]
    delete?: AttendanceRecordWhereUniqueInput | AttendanceRecordWhereUniqueInput[]
    connect?: AttendanceRecordWhereUniqueInput | AttendanceRecordWhereUniqueInput[]
    update?: AttendanceRecordUpdateWithWhereUniqueWithoutShiftInput | AttendanceRecordUpdateWithWhereUniqueWithoutShiftInput[]
    updateMany?: AttendanceRecordUpdateManyWithWhereWithoutShiftInput | AttendanceRecordUpdateManyWithWhereWithoutShiftInput[]
    deleteMany?: AttendanceRecordScalarWhereInput | AttendanceRecordScalarWhereInput[]
  }

  export type AttendanceRecordCreateanomaliesInput = {
    set: string[]
  }

  export type ShiftCreateNestedOneWithoutAttendance_recordsInput = {
    create?: XOR<ShiftCreateWithoutAttendance_recordsInput, ShiftUncheckedCreateWithoutAttendance_recordsInput>
    connectOrCreate?: ShiftCreateOrConnectWithoutAttendance_recordsInput
    connect?: ShiftWhereUniqueInput
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type AttendanceRecordUpdateanomaliesInput = {
    set?: string[]
    push?: string | string[]
  }

  export type ShiftUpdateOneWithoutAttendance_recordsNestedInput = {
    create?: XOR<ShiftCreateWithoutAttendance_recordsInput, ShiftUncheckedCreateWithoutAttendance_recordsInput>
    connectOrCreate?: ShiftCreateOrConnectWithoutAttendance_recordsInput
    upsert?: ShiftUpsertWithoutAttendance_recordsInput
    disconnect?: ShiftWhereInput | boolean
    delete?: ShiftWhereInput | boolean
    connect?: ShiftWhereUniqueInput
    update?: XOR<XOR<ShiftUpdateToOneWithWhereWithoutAttendance_recordsInput, ShiftUpdateWithoutAttendance_recordsInput>, ShiftUncheckedUpdateWithoutAttendance_recordsInput>
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type LocationCreateNestedOneWithoutChildrenInput = {
    create?: XOR<LocationCreateWithoutChildrenInput, LocationUncheckedCreateWithoutChildrenInput>
    connectOrCreate?: LocationCreateOrConnectWithoutChildrenInput
    connect?: LocationWhereUniqueInput
  }

  export type LocationCreateNestedManyWithoutParentInput = {
    create?: XOR<LocationCreateWithoutParentInput, LocationUncheckedCreateWithoutParentInput> | LocationCreateWithoutParentInput[] | LocationUncheckedCreateWithoutParentInput[]
    connectOrCreate?: LocationCreateOrConnectWithoutParentInput | LocationCreateOrConnectWithoutParentInput[]
    createMany?: LocationCreateManyParentInputEnvelope
    connect?: LocationWhereUniqueInput | LocationWhereUniqueInput[]
  }

  export type EmployeeLocationCreateNestedManyWithoutLocationInput = {
    create?: XOR<EmployeeLocationCreateWithoutLocationInput, EmployeeLocationUncheckedCreateWithoutLocationInput> | EmployeeLocationCreateWithoutLocationInput[] | EmployeeLocationUncheckedCreateWithoutLocationInput[]
    connectOrCreate?: EmployeeLocationCreateOrConnectWithoutLocationInput | EmployeeLocationCreateOrConnectWithoutLocationInput[]
    createMany?: EmployeeLocationCreateManyLocationInputEnvelope
    connect?: EmployeeLocationWhereUniqueInput | EmployeeLocationWhereUniqueInput[]
  }

  export type LocationUncheckedCreateNestedManyWithoutParentInput = {
    create?: XOR<LocationCreateWithoutParentInput, LocationUncheckedCreateWithoutParentInput> | LocationCreateWithoutParentInput[] | LocationUncheckedCreateWithoutParentInput[]
    connectOrCreate?: LocationCreateOrConnectWithoutParentInput | LocationCreateOrConnectWithoutParentInput[]
    createMany?: LocationCreateManyParentInputEnvelope
    connect?: LocationWhereUniqueInput | LocationWhereUniqueInput[]
  }

  export type EmployeeLocationUncheckedCreateNestedManyWithoutLocationInput = {
    create?: XOR<EmployeeLocationCreateWithoutLocationInput, EmployeeLocationUncheckedCreateWithoutLocationInput> | EmployeeLocationCreateWithoutLocationInput[] | EmployeeLocationUncheckedCreateWithoutLocationInput[]
    connectOrCreate?: EmployeeLocationCreateOrConnectWithoutLocationInput | EmployeeLocationCreateOrConnectWithoutLocationInput[]
    createMany?: EmployeeLocationCreateManyLocationInputEnvelope
    connect?: EmployeeLocationWhereUniqueInput | EmployeeLocationWhereUniqueInput[]
  }

  export type LocationUpdateOneWithoutChildrenNestedInput = {
    create?: XOR<LocationCreateWithoutChildrenInput, LocationUncheckedCreateWithoutChildrenInput>
    connectOrCreate?: LocationCreateOrConnectWithoutChildrenInput
    upsert?: LocationUpsertWithoutChildrenInput
    disconnect?: LocationWhereInput | boolean
    delete?: LocationWhereInput | boolean
    connect?: LocationWhereUniqueInput
    update?: XOR<XOR<LocationUpdateToOneWithWhereWithoutChildrenInput, LocationUpdateWithoutChildrenInput>, LocationUncheckedUpdateWithoutChildrenInput>
  }

  export type LocationUpdateManyWithoutParentNestedInput = {
    create?: XOR<LocationCreateWithoutParentInput, LocationUncheckedCreateWithoutParentInput> | LocationCreateWithoutParentInput[] | LocationUncheckedCreateWithoutParentInput[]
    connectOrCreate?: LocationCreateOrConnectWithoutParentInput | LocationCreateOrConnectWithoutParentInput[]
    upsert?: LocationUpsertWithWhereUniqueWithoutParentInput | LocationUpsertWithWhereUniqueWithoutParentInput[]
    createMany?: LocationCreateManyParentInputEnvelope
    set?: LocationWhereUniqueInput | LocationWhereUniqueInput[]
    disconnect?: LocationWhereUniqueInput | LocationWhereUniqueInput[]
    delete?: LocationWhereUniqueInput | LocationWhereUniqueInput[]
    connect?: LocationWhereUniqueInput | LocationWhereUniqueInput[]
    update?: LocationUpdateWithWhereUniqueWithoutParentInput | LocationUpdateWithWhereUniqueWithoutParentInput[]
    updateMany?: LocationUpdateManyWithWhereWithoutParentInput | LocationUpdateManyWithWhereWithoutParentInput[]
    deleteMany?: LocationScalarWhereInput | LocationScalarWhereInput[]
  }

  export type EmployeeLocationUpdateManyWithoutLocationNestedInput = {
    create?: XOR<EmployeeLocationCreateWithoutLocationInput, EmployeeLocationUncheckedCreateWithoutLocationInput> | EmployeeLocationCreateWithoutLocationInput[] | EmployeeLocationUncheckedCreateWithoutLocationInput[]
    connectOrCreate?: EmployeeLocationCreateOrConnectWithoutLocationInput | EmployeeLocationCreateOrConnectWithoutLocationInput[]
    upsert?: EmployeeLocationUpsertWithWhereUniqueWithoutLocationInput | EmployeeLocationUpsertWithWhereUniqueWithoutLocationInput[]
    createMany?: EmployeeLocationCreateManyLocationInputEnvelope
    set?: EmployeeLocationWhereUniqueInput | EmployeeLocationWhereUniqueInput[]
    disconnect?: EmployeeLocationWhereUniqueInput | EmployeeLocationWhereUniqueInput[]
    delete?: EmployeeLocationWhereUniqueInput | EmployeeLocationWhereUniqueInput[]
    connect?: EmployeeLocationWhereUniqueInput | EmployeeLocationWhereUniqueInput[]
    update?: EmployeeLocationUpdateWithWhereUniqueWithoutLocationInput | EmployeeLocationUpdateWithWhereUniqueWithoutLocationInput[]
    updateMany?: EmployeeLocationUpdateManyWithWhereWithoutLocationInput | EmployeeLocationUpdateManyWithWhereWithoutLocationInput[]
    deleteMany?: EmployeeLocationScalarWhereInput | EmployeeLocationScalarWhereInput[]
  }

  export type LocationUncheckedUpdateManyWithoutParentNestedInput = {
    create?: XOR<LocationCreateWithoutParentInput, LocationUncheckedCreateWithoutParentInput> | LocationCreateWithoutParentInput[] | LocationUncheckedCreateWithoutParentInput[]
    connectOrCreate?: LocationCreateOrConnectWithoutParentInput | LocationCreateOrConnectWithoutParentInput[]
    upsert?: LocationUpsertWithWhereUniqueWithoutParentInput | LocationUpsertWithWhereUniqueWithoutParentInput[]
    createMany?: LocationCreateManyParentInputEnvelope
    set?: LocationWhereUniqueInput | LocationWhereUniqueInput[]
    disconnect?: LocationWhereUniqueInput | LocationWhereUniqueInput[]
    delete?: LocationWhereUniqueInput | LocationWhereUniqueInput[]
    connect?: LocationWhereUniqueInput | LocationWhereUniqueInput[]
    update?: LocationUpdateWithWhereUniqueWithoutParentInput | LocationUpdateWithWhereUniqueWithoutParentInput[]
    updateMany?: LocationUpdateManyWithWhereWithoutParentInput | LocationUpdateManyWithWhereWithoutParentInput[]
    deleteMany?: LocationScalarWhereInput | LocationScalarWhereInput[]
  }

  export type EmployeeLocationUncheckedUpdateManyWithoutLocationNestedInput = {
    create?: XOR<EmployeeLocationCreateWithoutLocationInput, EmployeeLocationUncheckedCreateWithoutLocationInput> | EmployeeLocationCreateWithoutLocationInput[] | EmployeeLocationUncheckedCreateWithoutLocationInput[]
    connectOrCreate?: EmployeeLocationCreateOrConnectWithoutLocationInput | EmployeeLocationCreateOrConnectWithoutLocationInput[]
    upsert?: EmployeeLocationUpsertWithWhereUniqueWithoutLocationInput | EmployeeLocationUpsertWithWhereUniqueWithoutLocationInput[]
    createMany?: EmployeeLocationCreateManyLocationInputEnvelope
    set?: EmployeeLocationWhereUniqueInput | EmployeeLocationWhereUniqueInput[]
    disconnect?: EmployeeLocationWhereUniqueInput | EmployeeLocationWhereUniqueInput[]
    delete?: EmployeeLocationWhereUniqueInput | EmployeeLocationWhereUniqueInput[]
    connect?: EmployeeLocationWhereUniqueInput | EmployeeLocationWhereUniqueInput[]
    update?: EmployeeLocationUpdateWithWhereUniqueWithoutLocationInput | EmployeeLocationUpdateWithWhereUniqueWithoutLocationInput[]
    updateMany?: EmployeeLocationUpdateManyWithWhereWithoutLocationInput | EmployeeLocationUpdateManyWithWhereWithoutLocationInput[]
    deleteMany?: EmployeeLocationScalarWhereInput | EmployeeLocationScalarWhereInput[]
  }

  export type LocationCreateNestedOneWithoutEmployee_locationsInput = {
    create?: XOR<LocationCreateWithoutEmployee_locationsInput, LocationUncheckedCreateWithoutEmployee_locationsInput>
    connectOrCreate?: LocationCreateOrConnectWithoutEmployee_locationsInput
    connect?: LocationWhereUniqueInput
  }

  export type LocationUpdateOneRequiredWithoutEmployee_locationsNestedInput = {
    create?: XOR<LocationCreateWithoutEmployee_locationsInput, LocationUncheckedCreateWithoutEmployee_locationsInput>
    connectOrCreate?: LocationCreateOrConnectWithoutEmployee_locationsInput
    upsert?: LocationUpsertWithoutEmployee_locationsInput
    connect?: LocationWhereUniqueInput
    update?: XOR<XOR<LocationUpdateToOneWithWhereWithoutEmployee_locationsInput, LocationUpdateWithoutEmployee_locationsInput>, LocationUncheckedUpdateWithoutEmployee_locationsInput>
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

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
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

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
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

  export type AttendanceRecordCreateWithoutShiftInput = {
    id?: string
    employee_id: string
    date: Date | string
    scheduled_start?: string | null
    scheduled_end?: string | null
    actual_check_in?: string | null
    actual_check_out?: string | null
    check_in_source?: string | null
    check_in_location?: string | null
    check_out_source?: string | null
    check_out_location?: string | null
    working_hours?: number | null
    overtime_hours?: number
    is_late?: boolean
    late_minutes?: number
    is_early_departure?: boolean
    early_minutes?: number
    status?: string
    anomalies?: AttendanceRecordCreateanomaliesInput | string[]
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type AttendanceRecordUncheckedCreateWithoutShiftInput = {
    id?: string
    employee_id: string
    date: Date | string
    scheduled_start?: string | null
    scheduled_end?: string | null
    actual_check_in?: string | null
    actual_check_out?: string | null
    check_in_source?: string | null
    check_in_location?: string | null
    check_out_source?: string | null
    check_out_location?: string | null
    working_hours?: number | null
    overtime_hours?: number
    is_late?: boolean
    late_minutes?: number
    is_early_departure?: boolean
    early_minutes?: number
    status?: string
    anomalies?: AttendanceRecordCreateanomaliesInput | string[]
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type AttendanceRecordCreateOrConnectWithoutShiftInput = {
    where: AttendanceRecordWhereUniqueInput
    create: XOR<AttendanceRecordCreateWithoutShiftInput, AttendanceRecordUncheckedCreateWithoutShiftInput>
  }

  export type AttendanceRecordCreateManyShiftInputEnvelope = {
    data: AttendanceRecordCreateManyShiftInput | AttendanceRecordCreateManyShiftInput[]
    skipDuplicates?: boolean
  }

  export type AttendanceRecordUpsertWithWhereUniqueWithoutShiftInput = {
    where: AttendanceRecordWhereUniqueInput
    update: XOR<AttendanceRecordUpdateWithoutShiftInput, AttendanceRecordUncheckedUpdateWithoutShiftInput>
    create: XOR<AttendanceRecordCreateWithoutShiftInput, AttendanceRecordUncheckedCreateWithoutShiftInput>
  }

  export type AttendanceRecordUpdateWithWhereUniqueWithoutShiftInput = {
    where: AttendanceRecordWhereUniqueInput
    data: XOR<AttendanceRecordUpdateWithoutShiftInput, AttendanceRecordUncheckedUpdateWithoutShiftInput>
  }

  export type AttendanceRecordUpdateManyWithWhereWithoutShiftInput = {
    where: AttendanceRecordScalarWhereInput
    data: XOR<AttendanceRecordUpdateManyMutationInput, AttendanceRecordUncheckedUpdateManyWithoutShiftInput>
  }

  export type AttendanceRecordScalarWhereInput = {
    AND?: AttendanceRecordScalarWhereInput | AttendanceRecordScalarWhereInput[]
    OR?: AttendanceRecordScalarWhereInput[]
    NOT?: AttendanceRecordScalarWhereInput | AttendanceRecordScalarWhereInput[]
    id?: StringFilter<"AttendanceRecord"> | string
    employee_id?: StringFilter<"AttendanceRecord"> | string
    date?: DateTimeFilter<"AttendanceRecord"> | Date | string
    shift_id?: StringNullableFilter<"AttendanceRecord"> | string | null
    scheduled_start?: StringNullableFilter<"AttendanceRecord"> | string | null
    scheduled_end?: StringNullableFilter<"AttendanceRecord"> | string | null
    actual_check_in?: StringNullableFilter<"AttendanceRecord"> | string | null
    actual_check_out?: StringNullableFilter<"AttendanceRecord"> | string | null
    check_in_source?: StringNullableFilter<"AttendanceRecord"> | string | null
    check_in_location?: StringNullableFilter<"AttendanceRecord"> | string | null
    check_out_source?: StringNullableFilter<"AttendanceRecord"> | string | null
    check_out_location?: StringNullableFilter<"AttendanceRecord"> | string | null
    working_hours?: FloatNullableFilter<"AttendanceRecord"> | number | null
    overtime_hours?: FloatFilter<"AttendanceRecord"> | number
    is_late?: BoolFilter<"AttendanceRecord"> | boolean
    late_minutes?: IntFilter<"AttendanceRecord"> | number
    is_early_departure?: BoolFilter<"AttendanceRecord"> | boolean
    early_minutes?: IntFilter<"AttendanceRecord"> | number
    status?: StringFilter<"AttendanceRecord"> | string
    anomalies?: StringNullableListFilter<"AttendanceRecord">
    created_at?: DateTimeFilter<"AttendanceRecord"> | Date | string
    updated_at?: DateTimeFilter<"AttendanceRecord"> | Date | string
  }

  export type ShiftCreateWithoutAttendance_recordsInput = {
    id?: string
    code: string
    name_en: string
    name_th?: string | null
    start_time: string
    end_time: string
    is_flexible?: boolean
    break_minutes?: number
    work_hours?: number
    is_active?: boolean
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type ShiftUncheckedCreateWithoutAttendance_recordsInput = {
    id?: string
    code: string
    name_en: string
    name_th?: string | null
    start_time: string
    end_time: string
    is_flexible?: boolean
    break_minutes?: number
    work_hours?: number
    is_active?: boolean
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type ShiftCreateOrConnectWithoutAttendance_recordsInput = {
    where: ShiftWhereUniqueInput
    create: XOR<ShiftCreateWithoutAttendance_recordsInput, ShiftUncheckedCreateWithoutAttendance_recordsInput>
  }

  export type ShiftUpsertWithoutAttendance_recordsInput = {
    update: XOR<ShiftUpdateWithoutAttendance_recordsInput, ShiftUncheckedUpdateWithoutAttendance_recordsInput>
    create: XOR<ShiftCreateWithoutAttendance_recordsInput, ShiftUncheckedCreateWithoutAttendance_recordsInput>
    where?: ShiftWhereInput
  }

  export type ShiftUpdateToOneWithWhereWithoutAttendance_recordsInput = {
    where?: ShiftWhereInput
    data: XOR<ShiftUpdateWithoutAttendance_recordsInput, ShiftUncheckedUpdateWithoutAttendance_recordsInput>
  }

  export type ShiftUpdateWithoutAttendance_recordsInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    name_en?: StringFieldUpdateOperationsInput | string
    name_th?: NullableStringFieldUpdateOperationsInput | string | null
    start_time?: StringFieldUpdateOperationsInput | string
    end_time?: StringFieldUpdateOperationsInput | string
    is_flexible?: BoolFieldUpdateOperationsInput | boolean
    break_minutes?: IntFieldUpdateOperationsInput | number
    work_hours?: FloatFieldUpdateOperationsInput | number
    is_active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ShiftUncheckedUpdateWithoutAttendance_recordsInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    name_en?: StringFieldUpdateOperationsInput | string
    name_th?: NullableStringFieldUpdateOperationsInput | string | null
    start_time?: StringFieldUpdateOperationsInput | string
    end_time?: StringFieldUpdateOperationsInput | string
    is_flexible?: BoolFieldUpdateOperationsInput | boolean
    break_minutes?: IntFieldUpdateOperationsInput | number
    work_hours?: FloatFieldUpdateOperationsInput | number
    is_active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LocationCreateWithoutChildrenInput = {
    id?: string
    location_code: string
    name_en: string
    name_th?: string | null
    location_type: string
    address?: NullableJsonNullValueInput | InputJsonValue
    coordinates?: NullableJsonNullValueInput | InputJsonValue
    status?: string
    headcount?: number
    created_at?: Date | string
    updated_at?: Date | string
    parent?: LocationCreateNestedOneWithoutChildrenInput
    employee_locations?: EmployeeLocationCreateNestedManyWithoutLocationInput
  }

  export type LocationUncheckedCreateWithoutChildrenInput = {
    id?: string
    location_code: string
    name_en: string
    name_th?: string | null
    location_type: string
    parent_location_id?: string | null
    address?: NullableJsonNullValueInput | InputJsonValue
    coordinates?: NullableJsonNullValueInput | InputJsonValue
    status?: string
    headcount?: number
    created_at?: Date | string
    updated_at?: Date | string
    employee_locations?: EmployeeLocationUncheckedCreateNestedManyWithoutLocationInput
  }

  export type LocationCreateOrConnectWithoutChildrenInput = {
    where: LocationWhereUniqueInput
    create: XOR<LocationCreateWithoutChildrenInput, LocationUncheckedCreateWithoutChildrenInput>
  }

  export type LocationCreateWithoutParentInput = {
    id?: string
    location_code: string
    name_en: string
    name_th?: string | null
    location_type: string
    address?: NullableJsonNullValueInput | InputJsonValue
    coordinates?: NullableJsonNullValueInput | InputJsonValue
    status?: string
    headcount?: number
    created_at?: Date | string
    updated_at?: Date | string
    children?: LocationCreateNestedManyWithoutParentInput
    employee_locations?: EmployeeLocationCreateNestedManyWithoutLocationInput
  }

  export type LocationUncheckedCreateWithoutParentInput = {
    id?: string
    location_code: string
    name_en: string
    name_th?: string | null
    location_type: string
    address?: NullableJsonNullValueInput | InputJsonValue
    coordinates?: NullableJsonNullValueInput | InputJsonValue
    status?: string
    headcount?: number
    created_at?: Date | string
    updated_at?: Date | string
    children?: LocationUncheckedCreateNestedManyWithoutParentInput
    employee_locations?: EmployeeLocationUncheckedCreateNestedManyWithoutLocationInput
  }

  export type LocationCreateOrConnectWithoutParentInput = {
    where: LocationWhereUniqueInput
    create: XOR<LocationCreateWithoutParentInput, LocationUncheckedCreateWithoutParentInput>
  }

  export type LocationCreateManyParentInputEnvelope = {
    data: LocationCreateManyParentInput | LocationCreateManyParentInput[]
    skipDuplicates?: boolean
  }

  export type EmployeeLocationCreateWithoutLocationInput = {
    id?: string
    employee_id: string
    location_type?: string
    effective_date: Date | string
    end_date?: Date | string | null
    status?: string
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type EmployeeLocationUncheckedCreateWithoutLocationInput = {
    id?: string
    employee_id: string
    location_type?: string
    effective_date: Date | string
    end_date?: Date | string | null
    status?: string
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type EmployeeLocationCreateOrConnectWithoutLocationInput = {
    where: EmployeeLocationWhereUniqueInput
    create: XOR<EmployeeLocationCreateWithoutLocationInput, EmployeeLocationUncheckedCreateWithoutLocationInput>
  }

  export type EmployeeLocationCreateManyLocationInputEnvelope = {
    data: EmployeeLocationCreateManyLocationInput | EmployeeLocationCreateManyLocationInput[]
    skipDuplicates?: boolean
  }

  export type LocationUpsertWithoutChildrenInput = {
    update: XOR<LocationUpdateWithoutChildrenInput, LocationUncheckedUpdateWithoutChildrenInput>
    create: XOR<LocationCreateWithoutChildrenInput, LocationUncheckedCreateWithoutChildrenInput>
    where?: LocationWhereInput
  }

  export type LocationUpdateToOneWithWhereWithoutChildrenInput = {
    where?: LocationWhereInput
    data: XOR<LocationUpdateWithoutChildrenInput, LocationUncheckedUpdateWithoutChildrenInput>
  }

  export type LocationUpdateWithoutChildrenInput = {
    id?: StringFieldUpdateOperationsInput | string
    location_code?: StringFieldUpdateOperationsInput | string
    name_en?: StringFieldUpdateOperationsInput | string
    name_th?: NullableStringFieldUpdateOperationsInput | string | null
    location_type?: StringFieldUpdateOperationsInput | string
    address?: NullableJsonNullValueInput | InputJsonValue
    coordinates?: NullableJsonNullValueInput | InputJsonValue
    status?: StringFieldUpdateOperationsInput | string
    headcount?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    parent?: LocationUpdateOneWithoutChildrenNestedInput
    employee_locations?: EmployeeLocationUpdateManyWithoutLocationNestedInput
  }

  export type LocationUncheckedUpdateWithoutChildrenInput = {
    id?: StringFieldUpdateOperationsInput | string
    location_code?: StringFieldUpdateOperationsInput | string
    name_en?: StringFieldUpdateOperationsInput | string
    name_th?: NullableStringFieldUpdateOperationsInput | string | null
    location_type?: StringFieldUpdateOperationsInput | string
    parent_location_id?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableJsonNullValueInput | InputJsonValue
    coordinates?: NullableJsonNullValueInput | InputJsonValue
    status?: StringFieldUpdateOperationsInput | string
    headcount?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    employee_locations?: EmployeeLocationUncheckedUpdateManyWithoutLocationNestedInput
  }

  export type LocationUpsertWithWhereUniqueWithoutParentInput = {
    where: LocationWhereUniqueInput
    update: XOR<LocationUpdateWithoutParentInput, LocationUncheckedUpdateWithoutParentInput>
    create: XOR<LocationCreateWithoutParentInput, LocationUncheckedCreateWithoutParentInput>
  }

  export type LocationUpdateWithWhereUniqueWithoutParentInput = {
    where: LocationWhereUniqueInput
    data: XOR<LocationUpdateWithoutParentInput, LocationUncheckedUpdateWithoutParentInput>
  }

  export type LocationUpdateManyWithWhereWithoutParentInput = {
    where: LocationScalarWhereInput
    data: XOR<LocationUpdateManyMutationInput, LocationUncheckedUpdateManyWithoutParentInput>
  }

  export type LocationScalarWhereInput = {
    AND?: LocationScalarWhereInput | LocationScalarWhereInput[]
    OR?: LocationScalarWhereInput[]
    NOT?: LocationScalarWhereInput | LocationScalarWhereInput[]
    id?: StringFilter<"Location"> | string
    location_code?: StringFilter<"Location"> | string
    name_en?: StringFilter<"Location"> | string
    name_th?: StringNullableFilter<"Location"> | string | null
    location_type?: StringFilter<"Location"> | string
    parent_location_id?: StringNullableFilter<"Location"> | string | null
    address?: JsonNullableFilter<"Location">
    coordinates?: JsonNullableFilter<"Location">
    status?: StringFilter<"Location"> | string
    headcount?: IntFilter<"Location"> | number
    created_at?: DateTimeFilter<"Location"> | Date | string
    updated_at?: DateTimeFilter<"Location"> | Date | string
  }

  export type EmployeeLocationUpsertWithWhereUniqueWithoutLocationInput = {
    where: EmployeeLocationWhereUniqueInput
    update: XOR<EmployeeLocationUpdateWithoutLocationInput, EmployeeLocationUncheckedUpdateWithoutLocationInput>
    create: XOR<EmployeeLocationCreateWithoutLocationInput, EmployeeLocationUncheckedCreateWithoutLocationInput>
  }

  export type EmployeeLocationUpdateWithWhereUniqueWithoutLocationInput = {
    where: EmployeeLocationWhereUniqueInput
    data: XOR<EmployeeLocationUpdateWithoutLocationInput, EmployeeLocationUncheckedUpdateWithoutLocationInput>
  }

  export type EmployeeLocationUpdateManyWithWhereWithoutLocationInput = {
    where: EmployeeLocationScalarWhereInput
    data: XOR<EmployeeLocationUpdateManyMutationInput, EmployeeLocationUncheckedUpdateManyWithoutLocationInput>
  }

  export type EmployeeLocationScalarWhereInput = {
    AND?: EmployeeLocationScalarWhereInput | EmployeeLocationScalarWhereInput[]
    OR?: EmployeeLocationScalarWhereInput[]
    NOT?: EmployeeLocationScalarWhereInput | EmployeeLocationScalarWhereInput[]
    id?: StringFilter<"EmployeeLocation"> | string
    employee_id?: StringFilter<"EmployeeLocation"> | string
    location_id?: StringFilter<"EmployeeLocation"> | string
    location_type?: StringFilter<"EmployeeLocation"> | string
    effective_date?: DateTimeFilter<"EmployeeLocation"> | Date | string
    end_date?: DateTimeNullableFilter<"EmployeeLocation"> | Date | string | null
    status?: StringFilter<"EmployeeLocation"> | string
    created_at?: DateTimeFilter<"EmployeeLocation"> | Date | string
    updated_at?: DateTimeFilter<"EmployeeLocation"> | Date | string
  }

  export type LocationCreateWithoutEmployee_locationsInput = {
    id?: string
    location_code: string
    name_en: string
    name_th?: string | null
    location_type: string
    address?: NullableJsonNullValueInput | InputJsonValue
    coordinates?: NullableJsonNullValueInput | InputJsonValue
    status?: string
    headcount?: number
    created_at?: Date | string
    updated_at?: Date | string
    parent?: LocationCreateNestedOneWithoutChildrenInput
    children?: LocationCreateNestedManyWithoutParentInput
  }

  export type LocationUncheckedCreateWithoutEmployee_locationsInput = {
    id?: string
    location_code: string
    name_en: string
    name_th?: string | null
    location_type: string
    parent_location_id?: string | null
    address?: NullableJsonNullValueInput | InputJsonValue
    coordinates?: NullableJsonNullValueInput | InputJsonValue
    status?: string
    headcount?: number
    created_at?: Date | string
    updated_at?: Date | string
    children?: LocationUncheckedCreateNestedManyWithoutParentInput
  }

  export type LocationCreateOrConnectWithoutEmployee_locationsInput = {
    where: LocationWhereUniqueInput
    create: XOR<LocationCreateWithoutEmployee_locationsInput, LocationUncheckedCreateWithoutEmployee_locationsInput>
  }

  export type LocationUpsertWithoutEmployee_locationsInput = {
    update: XOR<LocationUpdateWithoutEmployee_locationsInput, LocationUncheckedUpdateWithoutEmployee_locationsInput>
    create: XOR<LocationCreateWithoutEmployee_locationsInput, LocationUncheckedCreateWithoutEmployee_locationsInput>
    where?: LocationWhereInput
  }

  export type LocationUpdateToOneWithWhereWithoutEmployee_locationsInput = {
    where?: LocationWhereInput
    data: XOR<LocationUpdateWithoutEmployee_locationsInput, LocationUncheckedUpdateWithoutEmployee_locationsInput>
  }

  export type LocationUpdateWithoutEmployee_locationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    location_code?: StringFieldUpdateOperationsInput | string
    name_en?: StringFieldUpdateOperationsInput | string
    name_th?: NullableStringFieldUpdateOperationsInput | string | null
    location_type?: StringFieldUpdateOperationsInput | string
    address?: NullableJsonNullValueInput | InputJsonValue
    coordinates?: NullableJsonNullValueInput | InputJsonValue
    status?: StringFieldUpdateOperationsInput | string
    headcount?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    parent?: LocationUpdateOneWithoutChildrenNestedInput
    children?: LocationUpdateManyWithoutParentNestedInput
  }

  export type LocationUncheckedUpdateWithoutEmployee_locationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    location_code?: StringFieldUpdateOperationsInput | string
    name_en?: StringFieldUpdateOperationsInput | string
    name_th?: NullableStringFieldUpdateOperationsInput | string | null
    location_type?: StringFieldUpdateOperationsInput | string
    parent_location_id?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableJsonNullValueInput | InputJsonValue
    coordinates?: NullableJsonNullValueInput | InputJsonValue
    status?: StringFieldUpdateOperationsInput | string
    headcount?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    children?: LocationUncheckedUpdateManyWithoutParentNestedInput
  }

  export type AttendanceRecordCreateManyShiftInput = {
    id?: string
    employee_id: string
    date: Date | string
    scheduled_start?: string | null
    scheduled_end?: string | null
    actual_check_in?: string | null
    actual_check_out?: string | null
    check_in_source?: string | null
    check_in_location?: string | null
    check_out_source?: string | null
    check_out_location?: string | null
    working_hours?: number | null
    overtime_hours?: number
    is_late?: boolean
    late_minutes?: number
    is_early_departure?: boolean
    early_minutes?: number
    status?: string
    anomalies?: AttendanceRecordCreateanomaliesInput | string[]
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type AttendanceRecordUpdateWithoutShiftInput = {
    id?: StringFieldUpdateOperationsInput | string
    employee_id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    scheduled_start?: NullableStringFieldUpdateOperationsInput | string | null
    scheduled_end?: NullableStringFieldUpdateOperationsInput | string | null
    actual_check_in?: NullableStringFieldUpdateOperationsInput | string | null
    actual_check_out?: NullableStringFieldUpdateOperationsInput | string | null
    check_in_source?: NullableStringFieldUpdateOperationsInput | string | null
    check_in_location?: NullableStringFieldUpdateOperationsInput | string | null
    check_out_source?: NullableStringFieldUpdateOperationsInput | string | null
    check_out_location?: NullableStringFieldUpdateOperationsInput | string | null
    working_hours?: NullableFloatFieldUpdateOperationsInput | number | null
    overtime_hours?: FloatFieldUpdateOperationsInput | number
    is_late?: BoolFieldUpdateOperationsInput | boolean
    late_minutes?: IntFieldUpdateOperationsInput | number
    is_early_departure?: BoolFieldUpdateOperationsInput | boolean
    early_minutes?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    anomalies?: AttendanceRecordUpdateanomaliesInput | string[]
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AttendanceRecordUncheckedUpdateWithoutShiftInput = {
    id?: StringFieldUpdateOperationsInput | string
    employee_id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    scheduled_start?: NullableStringFieldUpdateOperationsInput | string | null
    scheduled_end?: NullableStringFieldUpdateOperationsInput | string | null
    actual_check_in?: NullableStringFieldUpdateOperationsInput | string | null
    actual_check_out?: NullableStringFieldUpdateOperationsInput | string | null
    check_in_source?: NullableStringFieldUpdateOperationsInput | string | null
    check_in_location?: NullableStringFieldUpdateOperationsInput | string | null
    check_out_source?: NullableStringFieldUpdateOperationsInput | string | null
    check_out_location?: NullableStringFieldUpdateOperationsInput | string | null
    working_hours?: NullableFloatFieldUpdateOperationsInput | number | null
    overtime_hours?: FloatFieldUpdateOperationsInput | number
    is_late?: BoolFieldUpdateOperationsInput | boolean
    late_minutes?: IntFieldUpdateOperationsInput | number
    is_early_departure?: BoolFieldUpdateOperationsInput | boolean
    early_minutes?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    anomalies?: AttendanceRecordUpdateanomaliesInput | string[]
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AttendanceRecordUncheckedUpdateManyWithoutShiftInput = {
    id?: StringFieldUpdateOperationsInput | string
    employee_id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    scheduled_start?: NullableStringFieldUpdateOperationsInput | string | null
    scheduled_end?: NullableStringFieldUpdateOperationsInput | string | null
    actual_check_in?: NullableStringFieldUpdateOperationsInput | string | null
    actual_check_out?: NullableStringFieldUpdateOperationsInput | string | null
    check_in_source?: NullableStringFieldUpdateOperationsInput | string | null
    check_in_location?: NullableStringFieldUpdateOperationsInput | string | null
    check_out_source?: NullableStringFieldUpdateOperationsInput | string | null
    check_out_location?: NullableStringFieldUpdateOperationsInput | string | null
    working_hours?: NullableFloatFieldUpdateOperationsInput | number | null
    overtime_hours?: FloatFieldUpdateOperationsInput | number
    is_late?: BoolFieldUpdateOperationsInput | boolean
    late_minutes?: IntFieldUpdateOperationsInput | number
    is_early_departure?: BoolFieldUpdateOperationsInput | boolean
    early_minutes?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    anomalies?: AttendanceRecordUpdateanomaliesInput | string[]
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LocationCreateManyParentInput = {
    id?: string
    location_code: string
    name_en: string
    name_th?: string | null
    location_type: string
    address?: NullableJsonNullValueInput | InputJsonValue
    coordinates?: NullableJsonNullValueInput | InputJsonValue
    status?: string
    headcount?: number
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type EmployeeLocationCreateManyLocationInput = {
    id?: string
    employee_id: string
    location_type?: string
    effective_date: Date | string
    end_date?: Date | string | null
    status?: string
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type LocationUpdateWithoutParentInput = {
    id?: StringFieldUpdateOperationsInput | string
    location_code?: StringFieldUpdateOperationsInput | string
    name_en?: StringFieldUpdateOperationsInput | string
    name_th?: NullableStringFieldUpdateOperationsInput | string | null
    location_type?: StringFieldUpdateOperationsInput | string
    address?: NullableJsonNullValueInput | InputJsonValue
    coordinates?: NullableJsonNullValueInput | InputJsonValue
    status?: StringFieldUpdateOperationsInput | string
    headcount?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    children?: LocationUpdateManyWithoutParentNestedInput
    employee_locations?: EmployeeLocationUpdateManyWithoutLocationNestedInput
  }

  export type LocationUncheckedUpdateWithoutParentInput = {
    id?: StringFieldUpdateOperationsInput | string
    location_code?: StringFieldUpdateOperationsInput | string
    name_en?: StringFieldUpdateOperationsInput | string
    name_th?: NullableStringFieldUpdateOperationsInput | string | null
    location_type?: StringFieldUpdateOperationsInput | string
    address?: NullableJsonNullValueInput | InputJsonValue
    coordinates?: NullableJsonNullValueInput | InputJsonValue
    status?: StringFieldUpdateOperationsInput | string
    headcount?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    children?: LocationUncheckedUpdateManyWithoutParentNestedInput
    employee_locations?: EmployeeLocationUncheckedUpdateManyWithoutLocationNestedInput
  }

  export type LocationUncheckedUpdateManyWithoutParentInput = {
    id?: StringFieldUpdateOperationsInput | string
    location_code?: StringFieldUpdateOperationsInput | string
    name_en?: StringFieldUpdateOperationsInput | string
    name_th?: NullableStringFieldUpdateOperationsInput | string | null
    location_type?: StringFieldUpdateOperationsInput | string
    address?: NullableJsonNullValueInput | InputJsonValue
    coordinates?: NullableJsonNullValueInput | InputJsonValue
    status?: StringFieldUpdateOperationsInput | string
    headcount?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmployeeLocationUpdateWithoutLocationInput = {
    id?: StringFieldUpdateOperationsInput | string
    employee_id?: StringFieldUpdateOperationsInput | string
    location_type?: StringFieldUpdateOperationsInput | string
    effective_date?: DateTimeFieldUpdateOperationsInput | Date | string
    end_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmployeeLocationUncheckedUpdateWithoutLocationInput = {
    id?: StringFieldUpdateOperationsInput | string
    employee_id?: StringFieldUpdateOperationsInput | string
    location_type?: StringFieldUpdateOperationsInput | string
    effective_date?: DateTimeFieldUpdateOperationsInput | Date | string
    end_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmployeeLocationUncheckedUpdateManyWithoutLocationInput = {
    id?: StringFieldUpdateOperationsInput | string
    employee_id?: StringFieldUpdateOperationsInput | string
    location_type?: StringFieldUpdateOperationsInput | string
    effective_date?: DateTimeFieldUpdateOperationsInput | Date | string
    end_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
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