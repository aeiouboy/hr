
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
 * Model Employee
 * 
 */
export type Employee = $Result.DefaultSelection<Prisma.$EmployeePayload>
/**
 * Model Employment
 * 
 */
export type Employment = $Result.DefaultSelection<Prisma.$EmploymentPayload>
/**
 * Model Address
 * 
 */
export type Address = $Result.DefaultSelection<Prisma.$AddressPayload>
/**
 * Model EmergencyContact
 * 
 */
export type EmergencyContact = $Result.DefaultSelection<Prisma.$EmergencyContactPayload>
/**
 * Model Dependent
 * 
 */
export type Dependent = $Result.DefaultSelection<Prisma.$DependentPayload>
/**
 * Model WorkPermit
 * 
 */
export type WorkPermit = $Result.DefaultSelection<Prisma.$WorkPermitPayload>
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
 * // Fetch zero or more Employees
 * const employees = await prisma.employee.findMany()
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
   * // Fetch zero or more Employees
   * const employees = await prisma.employee.findMany()
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
   * `prisma.employee`: Exposes CRUD operations for the **Employee** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Employees
    * const employees = await prisma.employee.findMany()
    * ```
    */
  get employee(): Prisma.EmployeeDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.employment`: Exposes CRUD operations for the **Employment** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Employments
    * const employments = await prisma.employment.findMany()
    * ```
    */
  get employment(): Prisma.EmploymentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.address`: Exposes CRUD operations for the **Address** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Addresses
    * const addresses = await prisma.address.findMany()
    * ```
    */
  get address(): Prisma.AddressDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.emergencyContact`: Exposes CRUD operations for the **EmergencyContact** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more EmergencyContacts
    * const emergencyContacts = await prisma.emergencyContact.findMany()
    * ```
    */
  get emergencyContact(): Prisma.EmergencyContactDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.dependent`: Exposes CRUD operations for the **Dependent** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Dependents
    * const dependents = await prisma.dependent.findMany()
    * ```
    */
  get dependent(): Prisma.DependentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.workPermit`: Exposes CRUD operations for the **WorkPermit** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more WorkPermits
    * const workPermits = await prisma.workPermit.findMany()
    * ```
    */
  get workPermit(): Prisma.WorkPermitDelegate<ExtArgs, ClientOptions>;

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
    Employee: 'Employee',
    Employment: 'Employment',
    Address: 'Address',
    EmergencyContact: 'EmergencyContact',
    Dependent: 'Dependent',
    WorkPermit: 'WorkPermit',
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
      modelProps: "employee" | "employment" | "address" | "emergencyContact" | "dependent" | "workPermit" | "auditLog"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Employee: {
        payload: Prisma.$EmployeePayload<ExtArgs>
        fields: Prisma.EmployeeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.EmployeeFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.EmployeeFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeePayload>
          }
          findFirst: {
            args: Prisma.EmployeeFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.EmployeeFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeePayload>
          }
          findMany: {
            args: Prisma.EmployeeFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeePayload>[]
          }
          create: {
            args: Prisma.EmployeeCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeePayload>
          }
          createMany: {
            args: Prisma.EmployeeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.EmployeeCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeePayload>[]
          }
          delete: {
            args: Prisma.EmployeeDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeePayload>
          }
          update: {
            args: Prisma.EmployeeUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeePayload>
          }
          deleteMany: {
            args: Prisma.EmployeeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.EmployeeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.EmployeeUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeePayload>[]
          }
          upsert: {
            args: Prisma.EmployeeUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeePayload>
          }
          aggregate: {
            args: Prisma.EmployeeAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateEmployee>
          }
          groupBy: {
            args: Prisma.EmployeeGroupByArgs<ExtArgs>
            result: $Utils.Optional<EmployeeGroupByOutputType>[]
          }
          count: {
            args: Prisma.EmployeeCountArgs<ExtArgs>
            result: $Utils.Optional<EmployeeCountAggregateOutputType> | number
          }
        }
      }
      Employment: {
        payload: Prisma.$EmploymentPayload<ExtArgs>
        fields: Prisma.EmploymentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.EmploymentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmploymentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.EmploymentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmploymentPayload>
          }
          findFirst: {
            args: Prisma.EmploymentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmploymentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.EmploymentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmploymentPayload>
          }
          findMany: {
            args: Prisma.EmploymentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmploymentPayload>[]
          }
          create: {
            args: Prisma.EmploymentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmploymentPayload>
          }
          createMany: {
            args: Prisma.EmploymentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.EmploymentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmploymentPayload>[]
          }
          delete: {
            args: Prisma.EmploymentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmploymentPayload>
          }
          update: {
            args: Prisma.EmploymentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmploymentPayload>
          }
          deleteMany: {
            args: Prisma.EmploymentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.EmploymentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.EmploymentUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmploymentPayload>[]
          }
          upsert: {
            args: Prisma.EmploymentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmploymentPayload>
          }
          aggregate: {
            args: Prisma.EmploymentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateEmployment>
          }
          groupBy: {
            args: Prisma.EmploymentGroupByArgs<ExtArgs>
            result: $Utils.Optional<EmploymentGroupByOutputType>[]
          }
          count: {
            args: Prisma.EmploymentCountArgs<ExtArgs>
            result: $Utils.Optional<EmploymentCountAggregateOutputType> | number
          }
        }
      }
      Address: {
        payload: Prisma.$AddressPayload<ExtArgs>
        fields: Prisma.AddressFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AddressFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AddressPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AddressFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AddressPayload>
          }
          findFirst: {
            args: Prisma.AddressFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AddressPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AddressFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AddressPayload>
          }
          findMany: {
            args: Prisma.AddressFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AddressPayload>[]
          }
          create: {
            args: Prisma.AddressCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AddressPayload>
          }
          createMany: {
            args: Prisma.AddressCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AddressCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AddressPayload>[]
          }
          delete: {
            args: Prisma.AddressDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AddressPayload>
          }
          update: {
            args: Prisma.AddressUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AddressPayload>
          }
          deleteMany: {
            args: Prisma.AddressDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AddressUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AddressUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AddressPayload>[]
          }
          upsert: {
            args: Prisma.AddressUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AddressPayload>
          }
          aggregate: {
            args: Prisma.AddressAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAddress>
          }
          groupBy: {
            args: Prisma.AddressGroupByArgs<ExtArgs>
            result: $Utils.Optional<AddressGroupByOutputType>[]
          }
          count: {
            args: Prisma.AddressCountArgs<ExtArgs>
            result: $Utils.Optional<AddressCountAggregateOutputType> | number
          }
        }
      }
      EmergencyContact: {
        payload: Prisma.$EmergencyContactPayload<ExtArgs>
        fields: Prisma.EmergencyContactFieldRefs
        operations: {
          findUnique: {
            args: Prisma.EmergencyContactFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmergencyContactPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.EmergencyContactFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmergencyContactPayload>
          }
          findFirst: {
            args: Prisma.EmergencyContactFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmergencyContactPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.EmergencyContactFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmergencyContactPayload>
          }
          findMany: {
            args: Prisma.EmergencyContactFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmergencyContactPayload>[]
          }
          create: {
            args: Prisma.EmergencyContactCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmergencyContactPayload>
          }
          createMany: {
            args: Prisma.EmergencyContactCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.EmergencyContactCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmergencyContactPayload>[]
          }
          delete: {
            args: Prisma.EmergencyContactDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmergencyContactPayload>
          }
          update: {
            args: Prisma.EmergencyContactUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmergencyContactPayload>
          }
          deleteMany: {
            args: Prisma.EmergencyContactDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.EmergencyContactUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.EmergencyContactUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmergencyContactPayload>[]
          }
          upsert: {
            args: Prisma.EmergencyContactUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmergencyContactPayload>
          }
          aggregate: {
            args: Prisma.EmergencyContactAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateEmergencyContact>
          }
          groupBy: {
            args: Prisma.EmergencyContactGroupByArgs<ExtArgs>
            result: $Utils.Optional<EmergencyContactGroupByOutputType>[]
          }
          count: {
            args: Prisma.EmergencyContactCountArgs<ExtArgs>
            result: $Utils.Optional<EmergencyContactCountAggregateOutputType> | number
          }
        }
      }
      Dependent: {
        payload: Prisma.$DependentPayload<ExtArgs>
        fields: Prisma.DependentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DependentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DependentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DependentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DependentPayload>
          }
          findFirst: {
            args: Prisma.DependentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DependentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DependentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DependentPayload>
          }
          findMany: {
            args: Prisma.DependentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DependentPayload>[]
          }
          create: {
            args: Prisma.DependentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DependentPayload>
          }
          createMany: {
            args: Prisma.DependentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DependentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DependentPayload>[]
          }
          delete: {
            args: Prisma.DependentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DependentPayload>
          }
          update: {
            args: Prisma.DependentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DependentPayload>
          }
          deleteMany: {
            args: Prisma.DependentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DependentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.DependentUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DependentPayload>[]
          }
          upsert: {
            args: Prisma.DependentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DependentPayload>
          }
          aggregate: {
            args: Prisma.DependentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDependent>
          }
          groupBy: {
            args: Prisma.DependentGroupByArgs<ExtArgs>
            result: $Utils.Optional<DependentGroupByOutputType>[]
          }
          count: {
            args: Prisma.DependentCountArgs<ExtArgs>
            result: $Utils.Optional<DependentCountAggregateOutputType> | number
          }
        }
      }
      WorkPermit: {
        payload: Prisma.$WorkPermitPayload<ExtArgs>
        fields: Prisma.WorkPermitFieldRefs
        operations: {
          findUnique: {
            args: Prisma.WorkPermitFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkPermitPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.WorkPermitFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkPermitPayload>
          }
          findFirst: {
            args: Prisma.WorkPermitFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkPermitPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.WorkPermitFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkPermitPayload>
          }
          findMany: {
            args: Prisma.WorkPermitFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkPermitPayload>[]
          }
          create: {
            args: Prisma.WorkPermitCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkPermitPayload>
          }
          createMany: {
            args: Prisma.WorkPermitCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.WorkPermitCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkPermitPayload>[]
          }
          delete: {
            args: Prisma.WorkPermitDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkPermitPayload>
          }
          update: {
            args: Prisma.WorkPermitUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkPermitPayload>
          }
          deleteMany: {
            args: Prisma.WorkPermitDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.WorkPermitUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.WorkPermitUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkPermitPayload>[]
          }
          upsert: {
            args: Prisma.WorkPermitUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkPermitPayload>
          }
          aggregate: {
            args: Prisma.WorkPermitAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateWorkPermit>
          }
          groupBy: {
            args: Prisma.WorkPermitGroupByArgs<ExtArgs>
            result: $Utils.Optional<WorkPermitGroupByOutputType>[]
          }
          count: {
            args: Prisma.WorkPermitCountArgs<ExtArgs>
            result: $Utils.Optional<WorkPermitCountAggregateOutputType> | number
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
    employee?: EmployeeOmit
    employment?: EmploymentOmit
    address?: AddressOmit
    emergencyContact?: EmergencyContactOmit
    dependent?: DependentOmit
    workPermit?: WorkPermitOmit
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
   * Count Type EmployeeCountOutputType
   */

  export type EmployeeCountOutputType = {
    addresses: number
    emergency_contacts: number
    dependents: number
    work_permits: number
    audit_logs: number
  }

  export type EmployeeCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    addresses?: boolean | EmployeeCountOutputTypeCountAddressesArgs
    emergency_contacts?: boolean | EmployeeCountOutputTypeCountEmergency_contactsArgs
    dependents?: boolean | EmployeeCountOutputTypeCountDependentsArgs
    work_permits?: boolean | EmployeeCountOutputTypeCountWork_permitsArgs
    audit_logs?: boolean | EmployeeCountOutputTypeCountAudit_logsArgs
  }

  // Custom InputTypes
  /**
   * EmployeeCountOutputType without action
   */
  export type EmployeeCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmployeeCountOutputType
     */
    select?: EmployeeCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * EmployeeCountOutputType without action
   */
  export type EmployeeCountOutputTypeCountAddressesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AddressWhereInput
  }

  /**
   * EmployeeCountOutputType without action
   */
  export type EmployeeCountOutputTypeCountEmergency_contactsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EmergencyContactWhereInput
  }

  /**
   * EmployeeCountOutputType without action
   */
  export type EmployeeCountOutputTypeCountDependentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DependentWhereInput
  }

  /**
   * EmployeeCountOutputType without action
   */
  export type EmployeeCountOutputTypeCountWork_permitsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WorkPermitWhereInput
  }

  /**
   * EmployeeCountOutputType without action
   */
  export type EmployeeCountOutputTypeCountAudit_logsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AuditLogWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Employee
   */

  export type AggregateEmployee = {
    _count: EmployeeCountAggregateOutputType | null
    _min: EmployeeMinAggregateOutputType | null
    _max: EmployeeMaxAggregateOutputType | null
  }

  export type EmployeeMinAggregateOutputType = {
    id: string | null
    employee_id: string | null
    first_name_en: string | null
    first_name_th: string | null
    last_name_en: string | null
    last_name_th: string | null
    nickname: string | null
    gender: string | null
    date_of_birth: Date | null
    nationality: string | null
    national_id: string | null
    religion: string | null
    blood_type: string | null
    marital_status: string | null
    tax_id: string | null
    passport_number: string | null
    photo_url: string | null
    email: string | null
    personal_email: string | null
    business_phone: string | null
    personal_mobile: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type EmployeeMaxAggregateOutputType = {
    id: string | null
    employee_id: string | null
    first_name_en: string | null
    first_name_th: string | null
    last_name_en: string | null
    last_name_th: string | null
    nickname: string | null
    gender: string | null
    date_of_birth: Date | null
    nationality: string | null
    national_id: string | null
    religion: string | null
    blood_type: string | null
    marital_status: string | null
    tax_id: string | null
    passport_number: string | null
    photo_url: string | null
    email: string | null
    personal_email: string | null
    business_phone: string | null
    personal_mobile: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type EmployeeCountAggregateOutputType = {
    id: number
    employee_id: number
    first_name_en: number
    first_name_th: number
    last_name_en: number
    last_name_th: number
    nickname: number
    gender: number
    date_of_birth: number
    nationality: number
    national_id: number
    religion: number
    blood_type: number
    marital_status: number
    tax_id: number
    passport_number: number
    photo_url: number
    email: number
    personal_email: number
    business_phone: number
    personal_mobile: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type EmployeeMinAggregateInputType = {
    id?: true
    employee_id?: true
    first_name_en?: true
    first_name_th?: true
    last_name_en?: true
    last_name_th?: true
    nickname?: true
    gender?: true
    date_of_birth?: true
    nationality?: true
    national_id?: true
    religion?: true
    blood_type?: true
    marital_status?: true
    tax_id?: true
    passport_number?: true
    photo_url?: true
    email?: true
    personal_email?: true
    business_phone?: true
    personal_mobile?: true
    created_at?: true
    updated_at?: true
  }

  export type EmployeeMaxAggregateInputType = {
    id?: true
    employee_id?: true
    first_name_en?: true
    first_name_th?: true
    last_name_en?: true
    last_name_th?: true
    nickname?: true
    gender?: true
    date_of_birth?: true
    nationality?: true
    national_id?: true
    religion?: true
    blood_type?: true
    marital_status?: true
    tax_id?: true
    passport_number?: true
    photo_url?: true
    email?: true
    personal_email?: true
    business_phone?: true
    personal_mobile?: true
    created_at?: true
    updated_at?: true
  }

  export type EmployeeCountAggregateInputType = {
    id?: true
    employee_id?: true
    first_name_en?: true
    first_name_th?: true
    last_name_en?: true
    last_name_th?: true
    nickname?: true
    gender?: true
    date_of_birth?: true
    nationality?: true
    national_id?: true
    religion?: true
    blood_type?: true
    marital_status?: true
    tax_id?: true
    passport_number?: true
    photo_url?: true
    email?: true
    personal_email?: true
    business_phone?: true
    personal_mobile?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type EmployeeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Employee to aggregate.
     */
    where?: EmployeeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Employees to fetch.
     */
    orderBy?: EmployeeOrderByWithRelationInput | EmployeeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: EmployeeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Employees from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Employees.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Employees
    **/
    _count?: true | EmployeeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EmployeeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EmployeeMaxAggregateInputType
  }

  export type GetEmployeeAggregateType<T extends EmployeeAggregateArgs> = {
        [P in keyof T & keyof AggregateEmployee]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEmployee[P]>
      : GetScalarType<T[P], AggregateEmployee[P]>
  }




  export type EmployeeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EmployeeWhereInput
    orderBy?: EmployeeOrderByWithAggregationInput | EmployeeOrderByWithAggregationInput[]
    by: EmployeeScalarFieldEnum[] | EmployeeScalarFieldEnum
    having?: EmployeeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EmployeeCountAggregateInputType | true
    _min?: EmployeeMinAggregateInputType
    _max?: EmployeeMaxAggregateInputType
  }

  export type EmployeeGroupByOutputType = {
    id: string
    employee_id: string
    first_name_en: string | null
    first_name_th: string | null
    last_name_en: string | null
    last_name_th: string | null
    nickname: string | null
    gender: string | null
    date_of_birth: Date | null
    nationality: string | null
    national_id: string | null
    religion: string | null
    blood_type: string | null
    marital_status: string | null
    tax_id: string | null
    passport_number: string | null
    photo_url: string | null
    email: string | null
    personal_email: string | null
    business_phone: string | null
    personal_mobile: string | null
    created_at: Date
    updated_at: Date
    _count: EmployeeCountAggregateOutputType | null
    _min: EmployeeMinAggregateOutputType | null
    _max: EmployeeMaxAggregateOutputType | null
  }

  type GetEmployeeGroupByPayload<T extends EmployeeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EmployeeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EmployeeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EmployeeGroupByOutputType[P]>
            : GetScalarType<T[P], EmployeeGroupByOutputType[P]>
        }
      >
    >


  export type EmployeeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    employee_id?: boolean
    first_name_en?: boolean
    first_name_th?: boolean
    last_name_en?: boolean
    last_name_th?: boolean
    nickname?: boolean
    gender?: boolean
    date_of_birth?: boolean
    nationality?: boolean
    national_id?: boolean
    religion?: boolean
    blood_type?: boolean
    marital_status?: boolean
    tax_id?: boolean
    passport_number?: boolean
    photo_url?: boolean
    email?: boolean
    personal_email?: boolean
    business_phone?: boolean
    personal_mobile?: boolean
    created_at?: boolean
    updated_at?: boolean
    employment?: boolean | Employee$employmentArgs<ExtArgs>
    addresses?: boolean | Employee$addressesArgs<ExtArgs>
    emergency_contacts?: boolean | Employee$emergency_contactsArgs<ExtArgs>
    dependents?: boolean | Employee$dependentsArgs<ExtArgs>
    work_permits?: boolean | Employee$work_permitsArgs<ExtArgs>
    audit_logs?: boolean | Employee$audit_logsArgs<ExtArgs>
    _count?: boolean | EmployeeCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["employee"]>

  export type EmployeeSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    employee_id?: boolean
    first_name_en?: boolean
    first_name_th?: boolean
    last_name_en?: boolean
    last_name_th?: boolean
    nickname?: boolean
    gender?: boolean
    date_of_birth?: boolean
    nationality?: boolean
    national_id?: boolean
    religion?: boolean
    blood_type?: boolean
    marital_status?: boolean
    tax_id?: boolean
    passport_number?: boolean
    photo_url?: boolean
    email?: boolean
    personal_email?: boolean
    business_phone?: boolean
    personal_mobile?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["employee"]>

  export type EmployeeSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    employee_id?: boolean
    first_name_en?: boolean
    first_name_th?: boolean
    last_name_en?: boolean
    last_name_th?: boolean
    nickname?: boolean
    gender?: boolean
    date_of_birth?: boolean
    nationality?: boolean
    national_id?: boolean
    religion?: boolean
    blood_type?: boolean
    marital_status?: boolean
    tax_id?: boolean
    passport_number?: boolean
    photo_url?: boolean
    email?: boolean
    personal_email?: boolean
    business_phone?: boolean
    personal_mobile?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["employee"]>

  export type EmployeeSelectScalar = {
    id?: boolean
    employee_id?: boolean
    first_name_en?: boolean
    first_name_th?: boolean
    last_name_en?: boolean
    last_name_th?: boolean
    nickname?: boolean
    gender?: boolean
    date_of_birth?: boolean
    nationality?: boolean
    national_id?: boolean
    religion?: boolean
    blood_type?: boolean
    marital_status?: boolean
    tax_id?: boolean
    passport_number?: boolean
    photo_url?: boolean
    email?: boolean
    personal_email?: boolean
    business_phone?: boolean
    personal_mobile?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type EmployeeOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "employee_id" | "first_name_en" | "first_name_th" | "last_name_en" | "last_name_th" | "nickname" | "gender" | "date_of_birth" | "nationality" | "national_id" | "religion" | "blood_type" | "marital_status" | "tax_id" | "passport_number" | "photo_url" | "email" | "personal_email" | "business_phone" | "personal_mobile" | "created_at" | "updated_at", ExtArgs["result"]["employee"]>
  export type EmployeeInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    employment?: boolean | Employee$employmentArgs<ExtArgs>
    addresses?: boolean | Employee$addressesArgs<ExtArgs>
    emergency_contacts?: boolean | Employee$emergency_contactsArgs<ExtArgs>
    dependents?: boolean | Employee$dependentsArgs<ExtArgs>
    work_permits?: boolean | Employee$work_permitsArgs<ExtArgs>
    audit_logs?: boolean | Employee$audit_logsArgs<ExtArgs>
    _count?: boolean | EmployeeCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type EmployeeIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type EmployeeIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $EmployeePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Employee"
    objects: {
      employment: Prisma.$EmploymentPayload<ExtArgs> | null
      addresses: Prisma.$AddressPayload<ExtArgs>[]
      emergency_contacts: Prisma.$EmergencyContactPayload<ExtArgs>[]
      dependents: Prisma.$DependentPayload<ExtArgs>[]
      work_permits: Prisma.$WorkPermitPayload<ExtArgs>[]
      audit_logs: Prisma.$AuditLogPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      employee_id: string
      first_name_en: string | null
      first_name_th: string | null
      last_name_en: string | null
      last_name_th: string | null
      nickname: string | null
      gender: string | null
      date_of_birth: Date | null
      nationality: string | null
      national_id: string | null
      religion: string | null
      blood_type: string | null
      marital_status: string | null
      tax_id: string | null
      passport_number: string | null
      photo_url: string | null
      email: string | null
      personal_email: string | null
      business_phone: string | null
      personal_mobile: string | null
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["employee"]>
    composites: {}
  }

  type EmployeeGetPayload<S extends boolean | null | undefined | EmployeeDefaultArgs> = $Result.GetResult<Prisma.$EmployeePayload, S>

  type EmployeeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<EmployeeFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: EmployeeCountAggregateInputType | true
    }

  export interface EmployeeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Employee'], meta: { name: 'Employee' } }
    /**
     * Find zero or one Employee that matches the filter.
     * @param {EmployeeFindUniqueArgs} args - Arguments to find a Employee
     * @example
     * // Get one Employee
     * const employee = await prisma.employee.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends EmployeeFindUniqueArgs>(args: SelectSubset<T, EmployeeFindUniqueArgs<ExtArgs>>): Prisma__EmployeeClient<$Result.GetResult<Prisma.$EmployeePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Employee that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {EmployeeFindUniqueOrThrowArgs} args - Arguments to find a Employee
     * @example
     * // Get one Employee
     * const employee = await prisma.employee.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends EmployeeFindUniqueOrThrowArgs>(args: SelectSubset<T, EmployeeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__EmployeeClient<$Result.GetResult<Prisma.$EmployeePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Employee that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployeeFindFirstArgs} args - Arguments to find a Employee
     * @example
     * // Get one Employee
     * const employee = await prisma.employee.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends EmployeeFindFirstArgs>(args?: SelectSubset<T, EmployeeFindFirstArgs<ExtArgs>>): Prisma__EmployeeClient<$Result.GetResult<Prisma.$EmployeePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Employee that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployeeFindFirstOrThrowArgs} args - Arguments to find a Employee
     * @example
     * // Get one Employee
     * const employee = await prisma.employee.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends EmployeeFindFirstOrThrowArgs>(args?: SelectSubset<T, EmployeeFindFirstOrThrowArgs<ExtArgs>>): Prisma__EmployeeClient<$Result.GetResult<Prisma.$EmployeePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Employees that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployeeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Employees
     * const employees = await prisma.employee.findMany()
     * 
     * // Get first 10 Employees
     * const employees = await prisma.employee.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const employeeWithIdOnly = await prisma.employee.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends EmployeeFindManyArgs>(args?: SelectSubset<T, EmployeeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmployeePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Employee.
     * @param {EmployeeCreateArgs} args - Arguments to create a Employee.
     * @example
     * // Create one Employee
     * const Employee = await prisma.employee.create({
     *   data: {
     *     // ... data to create a Employee
     *   }
     * })
     * 
     */
    create<T extends EmployeeCreateArgs>(args: SelectSubset<T, EmployeeCreateArgs<ExtArgs>>): Prisma__EmployeeClient<$Result.GetResult<Prisma.$EmployeePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Employees.
     * @param {EmployeeCreateManyArgs} args - Arguments to create many Employees.
     * @example
     * // Create many Employees
     * const employee = await prisma.employee.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends EmployeeCreateManyArgs>(args?: SelectSubset<T, EmployeeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Employees and returns the data saved in the database.
     * @param {EmployeeCreateManyAndReturnArgs} args - Arguments to create many Employees.
     * @example
     * // Create many Employees
     * const employee = await prisma.employee.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Employees and only return the `id`
     * const employeeWithIdOnly = await prisma.employee.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends EmployeeCreateManyAndReturnArgs>(args?: SelectSubset<T, EmployeeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmployeePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Employee.
     * @param {EmployeeDeleteArgs} args - Arguments to delete one Employee.
     * @example
     * // Delete one Employee
     * const Employee = await prisma.employee.delete({
     *   where: {
     *     // ... filter to delete one Employee
     *   }
     * })
     * 
     */
    delete<T extends EmployeeDeleteArgs>(args: SelectSubset<T, EmployeeDeleteArgs<ExtArgs>>): Prisma__EmployeeClient<$Result.GetResult<Prisma.$EmployeePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Employee.
     * @param {EmployeeUpdateArgs} args - Arguments to update one Employee.
     * @example
     * // Update one Employee
     * const employee = await prisma.employee.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends EmployeeUpdateArgs>(args: SelectSubset<T, EmployeeUpdateArgs<ExtArgs>>): Prisma__EmployeeClient<$Result.GetResult<Prisma.$EmployeePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Employees.
     * @param {EmployeeDeleteManyArgs} args - Arguments to filter Employees to delete.
     * @example
     * // Delete a few Employees
     * const { count } = await prisma.employee.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends EmployeeDeleteManyArgs>(args?: SelectSubset<T, EmployeeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Employees.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployeeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Employees
     * const employee = await prisma.employee.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends EmployeeUpdateManyArgs>(args: SelectSubset<T, EmployeeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Employees and returns the data updated in the database.
     * @param {EmployeeUpdateManyAndReturnArgs} args - Arguments to update many Employees.
     * @example
     * // Update many Employees
     * const employee = await prisma.employee.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Employees and only return the `id`
     * const employeeWithIdOnly = await prisma.employee.updateManyAndReturn({
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
    updateManyAndReturn<T extends EmployeeUpdateManyAndReturnArgs>(args: SelectSubset<T, EmployeeUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmployeePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Employee.
     * @param {EmployeeUpsertArgs} args - Arguments to update or create a Employee.
     * @example
     * // Update or create a Employee
     * const employee = await prisma.employee.upsert({
     *   create: {
     *     // ... data to create a Employee
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Employee we want to update
     *   }
     * })
     */
    upsert<T extends EmployeeUpsertArgs>(args: SelectSubset<T, EmployeeUpsertArgs<ExtArgs>>): Prisma__EmployeeClient<$Result.GetResult<Prisma.$EmployeePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Employees.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployeeCountArgs} args - Arguments to filter Employees to count.
     * @example
     * // Count the number of Employees
     * const count = await prisma.employee.count({
     *   where: {
     *     // ... the filter for the Employees we want to count
     *   }
     * })
    **/
    count<T extends EmployeeCountArgs>(
      args?: Subset<T, EmployeeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EmployeeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Employee.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployeeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends EmployeeAggregateArgs>(args: Subset<T, EmployeeAggregateArgs>): Prisma.PrismaPromise<GetEmployeeAggregateType<T>>

    /**
     * Group by Employee.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployeeGroupByArgs} args - Group by arguments.
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
      T extends EmployeeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EmployeeGroupByArgs['orderBy'] }
        : { orderBy?: EmployeeGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, EmployeeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEmployeeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Employee model
   */
  readonly fields: EmployeeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Employee.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__EmployeeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    employment<T extends Employee$employmentArgs<ExtArgs> = {}>(args?: Subset<T, Employee$employmentArgs<ExtArgs>>): Prisma__EmploymentClient<$Result.GetResult<Prisma.$EmploymentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    addresses<T extends Employee$addressesArgs<ExtArgs> = {}>(args?: Subset<T, Employee$addressesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AddressPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    emergency_contacts<T extends Employee$emergency_contactsArgs<ExtArgs> = {}>(args?: Subset<T, Employee$emergency_contactsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmergencyContactPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    dependents<T extends Employee$dependentsArgs<ExtArgs> = {}>(args?: Subset<T, Employee$dependentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DependentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    work_permits<T extends Employee$work_permitsArgs<ExtArgs> = {}>(args?: Subset<T, Employee$work_permitsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WorkPermitPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    audit_logs<T extends Employee$audit_logsArgs<ExtArgs> = {}>(args?: Subset<T, Employee$audit_logsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Employee model
   */
  interface EmployeeFieldRefs {
    readonly id: FieldRef<"Employee", 'String'>
    readonly employee_id: FieldRef<"Employee", 'String'>
    readonly first_name_en: FieldRef<"Employee", 'String'>
    readonly first_name_th: FieldRef<"Employee", 'String'>
    readonly last_name_en: FieldRef<"Employee", 'String'>
    readonly last_name_th: FieldRef<"Employee", 'String'>
    readonly nickname: FieldRef<"Employee", 'String'>
    readonly gender: FieldRef<"Employee", 'String'>
    readonly date_of_birth: FieldRef<"Employee", 'DateTime'>
    readonly nationality: FieldRef<"Employee", 'String'>
    readonly national_id: FieldRef<"Employee", 'String'>
    readonly religion: FieldRef<"Employee", 'String'>
    readonly blood_type: FieldRef<"Employee", 'String'>
    readonly marital_status: FieldRef<"Employee", 'String'>
    readonly tax_id: FieldRef<"Employee", 'String'>
    readonly passport_number: FieldRef<"Employee", 'String'>
    readonly photo_url: FieldRef<"Employee", 'String'>
    readonly email: FieldRef<"Employee", 'String'>
    readonly personal_email: FieldRef<"Employee", 'String'>
    readonly business_phone: FieldRef<"Employee", 'String'>
    readonly personal_mobile: FieldRef<"Employee", 'String'>
    readonly created_at: FieldRef<"Employee", 'DateTime'>
    readonly updated_at: FieldRef<"Employee", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Employee findUnique
   */
  export type EmployeeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Employee
     */
    select?: EmployeeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Employee
     */
    omit?: EmployeeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeInclude<ExtArgs> | null
    /**
     * Filter, which Employee to fetch.
     */
    where: EmployeeWhereUniqueInput
  }

  /**
   * Employee findUniqueOrThrow
   */
  export type EmployeeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Employee
     */
    select?: EmployeeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Employee
     */
    omit?: EmployeeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeInclude<ExtArgs> | null
    /**
     * Filter, which Employee to fetch.
     */
    where: EmployeeWhereUniqueInput
  }

  /**
   * Employee findFirst
   */
  export type EmployeeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Employee
     */
    select?: EmployeeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Employee
     */
    omit?: EmployeeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeInclude<ExtArgs> | null
    /**
     * Filter, which Employee to fetch.
     */
    where?: EmployeeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Employees to fetch.
     */
    orderBy?: EmployeeOrderByWithRelationInput | EmployeeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Employees.
     */
    cursor?: EmployeeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Employees from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Employees.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Employees.
     */
    distinct?: EmployeeScalarFieldEnum | EmployeeScalarFieldEnum[]
  }

  /**
   * Employee findFirstOrThrow
   */
  export type EmployeeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Employee
     */
    select?: EmployeeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Employee
     */
    omit?: EmployeeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeInclude<ExtArgs> | null
    /**
     * Filter, which Employee to fetch.
     */
    where?: EmployeeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Employees to fetch.
     */
    orderBy?: EmployeeOrderByWithRelationInput | EmployeeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Employees.
     */
    cursor?: EmployeeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Employees from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Employees.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Employees.
     */
    distinct?: EmployeeScalarFieldEnum | EmployeeScalarFieldEnum[]
  }

  /**
   * Employee findMany
   */
  export type EmployeeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Employee
     */
    select?: EmployeeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Employee
     */
    omit?: EmployeeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeInclude<ExtArgs> | null
    /**
     * Filter, which Employees to fetch.
     */
    where?: EmployeeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Employees to fetch.
     */
    orderBy?: EmployeeOrderByWithRelationInput | EmployeeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Employees.
     */
    cursor?: EmployeeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Employees from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Employees.
     */
    skip?: number
    distinct?: EmployeeScalarFieldEnum | EmployeeScalarFieldEnum[]
  }

  /**
   * Employee create
   */
  export type EmployeeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Employee
     */
    select?: EmployeeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Employee
     */
    omit?: EmployeeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeInclude<ExtArgs> | null
    /**
     * The data needed to create a Employee.
     */
    data: XOR<EmployeeCreateInput, EmployeeUncheckedCreateInput>
  }

  /**
   * Employee createMany
   */
  export type EmployeeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Employees.
     */
    data: EmployeeCreateManyInput | EmployeeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Employee createManyAndReturn
   */
  export type EmployeeCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Employee
     */
    select?: EmployeeSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Employee
     */
    omit?: EmployeeOmit<ExtArgs> | null
    /**
     * The data used to create many Employees.
     */
    data: EmployeeCreateManyInput | EmployeeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Employee update
   */
  export type EmployeeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Employee
     */
    select?: EmployeeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Employee
     */
    omit?: EmployeeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeInclude<ExtArgs> | null
    /**
     * The data needed to update a Employee.
     */
    data: XOR<EmployeeUpdateInput, EmployeeUncheckedUpdateInput>
    /**
     * Choose, which Employee to update.
     */
    where: EmployeeWhereUniqueInput
  }

  /**
   * Employee updateMany
   */
  export type EmployeeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Employees.
     */
    data: XOR<EmployeeUpdateManyMutationInput, EmployeeUncheckedUpdateManyInput>
    /**
     * Filter which Employees to update
     */
    where?: EmployeeWhereInput
    /**
     * Limit how many Employees to update.
     */
    limit?: number
  }

  /**
   * Employee updateManyAndReturn
   */
  export type EmployeeUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Employee
     */
    select?: EmployeeSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Employee
     */
    omit?: EmployeeOmit<ExtArgs> | null
    /**
     * The data used to update Employees.
     */
    data: XOR<EmployeeUpdateManyMutationInput, EmployeeUncheckedUpdateManyInput>
    /**
     * Filter which Employees to update
     */
    where?: EmployeeWhereInput
    /**
     * Limit how many Employees to update.
     */
    limit?: number
  }

  /**
   * Employee upsert
   */
  export type EmployeeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Employee
     */
    select?: EmployeeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Employee
     */
    omit?: EmployeeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeInclude<ExtArgs> | null
    /**
     * The filter to search for the Employee to update in case it exists.
     */
    where: EmployeeWhereUniqueInput
    /**
     * In case the Employee found by the `where` argument doesn't exist, create a new Employee with this data.
     */
    create: XOR<EmployeeCreateInput, EmployeeUncheckedCreateInput>
    /**
     * In case the Employee was found with the provided `where` argument, update it with this data.
     */
    update: XOR<EmployeeUpdateInput, EmployeeUncheckedUpdateInput>
  }

  /**
   * Employee delete
   */
  export type EmployeeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Employee
     */
    select?: EmployeeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Employee
     */
    omit?: EmployeeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeInclude<ExtArgs> | null
    /**
     * Filter which Employee to delete.
     */
    where: EmployeeWhereUniqueInput
  }

  /**
   * Employee deleteMany
   */
  export type EmployeeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Employees to delete
     */
    where?: EmployeeWhereInput
    /**
     * Limit how many Employees to delete.
     */
    limit?: number
  }

  /**
   * Employee.employment
   */
  export type Employee$employmentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Employment
     */
    select?: EmploymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Employment
     */
    omit?: EmploymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmploymentInclude<ExtArgs> | null
    where?: EmploymentWhereInput
  }

  /**
   * Employee.addresses
   */
  export type Employee$addressesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Address
     */
    select?: AddressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Address
     */
    omit?: AddressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AddressInclude<ExtArgs> | null
    where?: AddressWhereInput
    orderBy?: AddressOrderByWithRelationInput | AddressOrderByWithRelationInput[]
    cursor?: AddressWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AddressScalarFieldEnum | AddressScalarFieldEnum[]
  }

  /**
   * Employee.emergency_contacts
   */
  export type Employee$emergency_contactsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmergencyContact
     */
    select?: EmergencyContactSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmergencyContact
     */
    omit?: EmergencyContactOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmergencyContactInclude<ExtArgs> | null
    where?: EmergencyContactWhereInput
    orderBy?: EmergencyContactOrderByWithRelationInput | EmergencyContactOrderByWithRelationInput[]
    cursor?: EmergencyContactWhereUniqueInput
    take?: number
    skip?: number
    distinct?: EmergencyContactScalarFieldEnum | EmergencyContactScalarFieldEnum[]
  }

  /**
   * Employee.dependents
   */
  export type Employee$dependentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Dependent
     */
    select?: DependentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Dependent
     */
    omit?: DependentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DependentInclude<ExtArgs> | null
    where?: DependentWhereInput
    orderBy?: DependentOrderByWithRelationInput | DependentOrderByWithRelationInput[]
    cursor?: DependentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DependentScalarFieldEnum | DependentScalarFieldEnum[]
  }

  /**
   * Employee.work_permits
   */
  export type Employee$work_permitsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkPermit
     */
    select?: WorkPermitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkPermit
     */
    omit?: WorkPermitOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkPermitInclude<ExtArgs> | null
    where?: WorkPermitWhereInput
    orderBy?: WorkPermitOrderByWithRelationInput | WorkPermitOrderByWithRelationInput[]
    cursor?: WorkPermitWhereUniqueInput
    take?: number
    skip?: number
    distinct?: WorkPermitScalarFieldEnum | WorkPermitScalarFieldEnum[]
  }

  /**
   * Employee.audit_logs
   */
  export type Employee$audit_logsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    where?: AuditLogWhereInput
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    cursor?: AuditLogWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * Employee without action
   */
  export type EmployeeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Employee
     */
    select?: EmployeeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Employee
     */
    omit?: EmployeeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeInclude<ExtArgs> | null
  }


  /**
   * Model Employment
   */

  export type AggregateEmployment = {
    _count: EmploymentCountAggregateOutputType | null
    _min: EmploymentMinAggregateOutputType | null
    _max: EmploymentMaxAggregateOutputType | null
  }

  export type EmploymentMinAggregateOutputType = {
    id: string | null
    employee_id: string | null
    hire_date: Date | null
    status: string | null
    probation_end_date: Date | null
    termination_date: Date | null
    job_title: string | null
    position_id: string | null
    department: string | null
    division: string | null
    location: string | null
    grade: string | null
    level: string | null
    manager_id: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type EmploymentMaxAggregateOutputType = {
    id: string | null
    employee_id: string | null
    hire_date: Date | null
    status: string | null
    probation_end_date: Date | null
    termination_date: Date | null
    job_title: string | null
    position_id: string | null
    department: string | null
    division: string | null
    location: string | null
    grade: string | null
    level: string | null
    manager_id: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type EmploymentCountAggregateOutputType = {
    id: number
    employee_id: number
    hire_date: number
    status: number
    probation_end_date: number
    termination_date: number
    job_title: number
    position_id: number
    department: number
    division: number
    location: number
    grade: number
    level: number
    manager_id: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type EmploymentMinAggregateInputType = {
    id?: true
    employee_id?: true
    hire_date?: true
    status?: true
    probation_end_date?: true
    termination_date?: true
    job_title?: true
    position_id?: true
    department?: true
    division?: true
    location?: true
    grade?: true
    level?: true
    manager_id?: true
    created_at?: true
    updated_at?: true
  }

  export type EmploymentMaxAggregateInputType = {
    id?: true
    employee_id?: true
    hire_date?: true
    status?: true
    probation_end_date?: true
    termination_date?: true
    job_title?: true
    position_id?: true
    department?: true
    division?: true
    location?: true
    grade?: true
    level?: true
    manager_id?: true
    created_at?: true
    updated_at?: true
  }

  export type EmploymentCountAggregateInputType = {
    id?: true
    employee_id?: true
    hire_date?: true
    status?: true
    probation_end_date?: true
    termination_date?: true
    job_title?: true
    position_id?: true
    department?: true
    division?: true
    location?: true
    grade?: true
    level?: true
    manager_id?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type EmploymentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Employment to aggregate.
     */
    where?: EmploymentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Employments to fetch.
     */
    orderBy?: EmploymentOrderByWithRelationInput | EmploymentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: EmploymentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Employments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Employments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Employments
    **/
    _count?: true | EmploymentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EmploymentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EmploymentMaxAggregateInputType
  }

  export type GetEmploymentAggregateType<T extends EmploymentAggregateArgs> = {
        [P in keyof T & keyof AggregateEmployment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEmployment[P]>
      : GetScalarType<T[P], AggregateEmployment[P]>
  }




  export type EmploymentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EmploymentWhereInput
    orderBy?: EmploymentOrderByWithAggregationInput | EmploymentOrderByWithAggregationInput[]
    by: EmploymentScalarFieldEnum[] | EmploymentScalarFieldEnum
    having?: EmploymentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EmploymentCountAggregateInputType | true
    _min?: EmploymentMinAggregateInputType
    _max?: EmploymentMaxAggregateInputType
  }

  export type EmploymentGroupByOutputType = {
    id: string
    employee_id: string
    hire_date: Date | null
    status: string
    probation_end_date: Date | null
    termination_date: Date | null
    job_title: string | null
    position_id: string | null
    department: string | null
    division: string | null
    location: string | null
    grade: string | null
    level: string | null
    manager_id: string | null
    created_at: Date
    updated_at: Date
    _count: EmploymentCountAggregateOutputType | null
    _min: EmploymentMinAggregateOutputType | null
    _max: EmploymentMaxAggregateOutputType | null
  }

  type GetEmploymentGroupByPayload<T extends EmploymentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EmploymentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EmploymentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EmploymentGroupByOutputType[P]>
            : GetScalarType<T[P], EmploymentGroupByOutputType[P]>
        }
      >
    >


  export type EmploymentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    employee_id?: boolean
    hire_date?: boolean
    status?: boolean
    probation_end_date?: boolean
    termination_date?: boolean
    job_title?: boolean
    position_id?: boolean
    department?: boolean
    division?: boolean
    location?: boolean
    grade?: boolean
    level?: boolean
    manager_id?: boolean
    created_at?: boolean
    updated_at?: boolean
    employee?: boolean | EmployeeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["employment"]>

  export type EmploymentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    employee_id?: boolean
    hire_date?: boolean
    status?: boolean
    probation_end_date?: boolean
    termination_date?: boolean
    job_title?: boolean
    position_id?: boolean
    department?: boolean
    division?: boolean
    location?: boolean
    grade?: boolean
    level?: boolean
    manager_id?: boolean
    created_at?: boolean
    updated_at?: boolean
    employee?: boolean | EmployeeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["employment"]>

  export type EmploymentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    employee_id?: boolean
    hire_date?: boolean
    status?: boolean
    probation_end_date?: boolean
    termination_date?: boolean
    job_title?: boolean
    position_id?: boolean
    department?: boolean
    division?: boolean
    location?: boolean
    grade?: boolean
    level?: boolean
    manager_id?: boolean
    created_at?: boolean
    updated_at?: boolean
    employee?: boolean | EmployeeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["employment"]>

  export type EmploymentSelectScalar = {
    id?: boolean
    employee_id?: boolean
    hire_date?: boolean
    status?: boolean
    probation_end_date?: boolean
    termination_date?: boolean
    job_title?: boolean
    position_id?: boolean
    department?: boolean
    division?: boolean
    location?: boolean
    grade?: boolean
    level?: boolean
    manager_id?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type EmploymentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "employee_id" | "hire_date" | "status" | "probation_end_date" | "termination_date" | "job_title" | "position_id" | "department" | "division" | "location" | "grade" | "level" | "manager_id" | "created_at" | "updated_at", ExtArgs["result"]["employment"]>
  export type EmploymentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    employee?: boolean | EmployeeDefaultArgs<ExtArgs>
  }
  export type EmploymentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    employee?: boolean | EmployeeDefaultArgs<ExtArgs>
  }
  export type EmploymentIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    employee?: boolean | EmployeeDefaultArgs<ExtArgs>
  }

  export type $EmploymentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Employment"
    objects: {
      employee: Prisma.$EmployeePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      employee_id: string
      hire_date: Date | null
      status: string
      probation_end_date: Date | null
      termination_date: Date | null
      job_title: string | null
      position_id: string | null
      department: string | null
      division: string | null
      location: string | null
      grade: string | null
      level: string | null
      manager_id: string | null
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["employment"]>
    composites: {}
  }

  type EmploymentGetPayload<S extends boolean | null | undefined | EmploymentDefaultArgs> = $Result.GetResult<Prisma.$EmploymentPayload, S>

  type EmploymentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<EmploymentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: EmploymentCountAggregateInputType | true
    }

  export interface EmploymentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Employment'], meta: { name: 'Employment' } }
    /**
     * Find zero or one Employment that matches the filter.
     * @param {EmploymentFindUniqueArgs} args - Arguments to find a Employment
     * @example
     * // Get one Employment
     * const employment = await prisma.employment.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends EmploymentFindUniqueArgs>(args: SelectSubset<T, EmploymentFindUniqueArgs<ExtArgs>>): Prisma__EmploymentClient<$Result.GetResult<Prisma.$EmploymentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Employment that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {EmploymentFindUniqueOrThrowArgs} args - Arguments to find a Employment
     * @example
     * // Get one Employment
     * const employment = await prisma.employment.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends EmploymentFindUniqueOrThrowArgs>(args: SelectSubset<T, EmploymentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__EmploymentClient<$Result.GetResult<Prisma.$EmploymentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Employment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmploymentFindFirstArgs} args - Arguments to find a Employment
     * @example
     * // Get one Employment
     * const employment = await prisma.employment.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends EmploymentFindFirstArgs>(args?: SelectSubset<T, EmploymentFindFirstArgs<ExtArgs>>): Prisma__EmploymentClient<$Result.GetResult<Prisma.$EmploymentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Employment that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmploymentFindFirstOrThrowArgs} args - Arguments to find a Employment
     * @example
     * // Get one Employment
     * const employment = await prisma.employment.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends EmploymentFindFirstOrThrowArgs>(args?: SelectSubset<T, EmploymentFindFirstOrThrowArgs<ExtArgs>>): Prisma__EmploymentClient<$Result.GetResult<Prisma.$EmploymentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Employments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmploymentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Employments
     * const employments = await prisma.employment.findMany()
     * 
     * // Get first 10 Employments
     * const employments = await prisma.employment.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const employmentWithIdOnly = await prisma.employment.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends EmploymentFindManyArgs>(args?: SelectSubset<T, EmploymentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmploymentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Employment.
     * @param {EmploymentCreateArgs} args - Arguments to create a Employment.
     * @example
     * // Create one Employment
     * const Employment = await prisma.employment.create({
     *   data: {
     *     // ... data to create a Employment
     *   }
     * })
     * 
     */
    create<T extends EmploymentCreateArgs>(args: SelectSubset<T, EmploymentCreateArgs<ExtArgs>>): Prisma__EmploymentClient<$Result.GetResult<Prisma.$EmploymentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Employments.
     * @param {EmploymentCreateManyArgs} args - Arguments to create many Employments.
     * @example
     * // Create many Employments
     * const employment = await prisma.employment.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends EmploymentCreateManyArgs>(args?: SelectSubset<T, EmploymentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Employments and returns the data saved in the database.
     * @param {EmploymentCreateManyAndReturnArgs} args - Arguments to create many Employments.
     * @example
     * // Create many Employments
     * const employment = await prisma.employment.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Employments and only return the `id`
     * const employmentWithIdOnly = await prisma.employment.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends EmploymentCreateManyAndReturnArgs>(args?: SelectSubset<T, EmploymentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmploymentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Employment.
     * @param {EmploymentDeleteArgs} args - Arguments to delete one Employment.
     * @example
     * // Delete one Employment
     * const Employment = await prisma.employment.delete({
     *   where: {
     *     // ... filter to delete one Employment
     *   }
     * })
     * 
     */
    delete<T extends EmploymentDeleteArgs>(args: SelectSubset<T, EmploymentDeleteArgs<ExtArgs>>): Prisma__EmploymentClient<$Result.GetResult<Prisma.$EmploymentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Employment.
     * @param {EmploymentUpdateArgs} args - Arguments to update one Employment.
     * @example
     * // Update one Employment
     * const employment = await prisma.employment.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends EmploymentUpdateArgs>(args: SelectSubset<T, EmploymentUpdateArgs<ExtArgs>>): Prisma__EmploymentClient<$Result.GetResult<Prisma.$EmploymentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Employments.
     * @param {EmploymentDeleteManyArgs} args - Arguments to filter Employments to delete.
     * @example
     * // Delete a few Employments
     * const { count } = await prisma.employment.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends EmploymentDeleteManyArgs>(args?: SelectSubset<T, EmploymentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Employments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmploymentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Employments
     * const employment = await prisma.employment.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends EmploymentUpdateManyArgs>(args: SelectSubset<T, EmploymentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Employments and returns the data updated in the database.
     * @param {EmploymentUpdateManyAndReturnArgs} args - Arguments to update many Employments.
     * @example
     * // Update many Employments
     * const employment = await prisma.employment.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Employments and only return the `id`
     * const employmentWithIdOnly = await prisma.employment.updateManyAndReturn({
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
    updateManyAndReturn<T extends EmploymentUpdateManyAndReturnArgs>(args: SelectSubset<T, EmploymentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmploymentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Employment.
     * @param {EmploymentUpsertArgs} args - Arguments to update or create a Employment.
     * @example
     * // Update or create a Employment
     * const employment = await prisma.employment.upsert({
     *   create: {
     *     // ... data to create a Employment
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Employment we want to update
     *   }
     * })
     */
    upsert<T extends EmploymentUpsertArgs>(args: SelectSubset<T, EmploymentUpsertArgs<ExtArgs>>): Prisma__EmploymentClient<$Result.GetResult<Prisma.$EmploymentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Employments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmploymentCountArgs} args - Arguments to filter Employments to count.
     * @example
     * // Count the number of Employments
     * const count = await prisma.employment.count({
     *   where: {
     *     // ... the filter for the Employments we want to count
     *   }
     * })
    **/
    count<T extends EmploymentCountArgs>(
      args?: Subset<T, EmploymentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EmploymentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Employment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmploymentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends EmploymentAggregateArgs>(args: Subset<T, EmploymentAggregateArgs>): Prisma.PrismaPromise<GetEmploymentAggregateType<T>>

    /**
     * Group by Employment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmploymentGroupByArgs} args - Group by arguments.
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
      T extends EmploymentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EmploymentGroupByArgs['orderBy'] }
        : { orderBy?: EmploymentGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, EmploymentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEmploymentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Employment model
   */
  readonly fields: EmploymentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Employment.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__EmploymentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    employee<T extends EmployeeDefaultArgs<ExtArgs> = {}>(args?: Subset<T, EmployeeDefaultArgs<ExtArgs>>): Prisma__EmployeeClient<$Result.GetResult<Prisma.$EmployeePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the Employment model
   */
  interface EmploymentFieldRefs {
    readonly id: FieldRef<"Employment", 'String'>
    readonly employee_id: FieldRef<"Employment", 'String'>
    readonly hire_date: FieldRef<"Employment", 'DateTime'>
    readonly status: FieldRef<"Employment", 'String'>
    readonly probation_end_date: FieldRef<"Employment", 'DateTime'>
    readonly termination_date: FieldRef<"Employment", 'DateTime'>
    readonly job_title: FieldRef<"Employment", 'String'>
    readonly position_id: FieldRef<"Employment", 'String'>
    readonly department: FieldRef<"Employment", 'String'>
    readonly division: FieldRef<"Employment", 'String'>
    readonly location: FieldRef<"Employment", 'String'>
    readonly grade: FieldRef<"Employment", 'String'>
    readonly level: FieldRef<"Employment", 'String'>
    readonly manager_id: FieldRef<"Employment", 'String'>
    readonly created_at: FieldRef<"Employment", 'DateTime'>
    readonly updated_at: FieldRef<"Employment", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Employment findUnique
   */
  export type EmploymentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Employment
     */
    select?: EmploymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Employment
     */
    omit?: EmploymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmploymentInclude<ExtArgs> | null
    /**
     * Filter, which Employment to fetch.
     */
    where: EmploymentWhereUniqueInput
  }

  /**
   * Employment findUniqueOrThrow
   */
  export type EmploymentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Employment
     */
    select?: EmploymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Employment
     */
    omit?: EmploymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmploymentInclude<ExtArgs> | null
    /**
     * Filter, which Employment to fetch.
     */
    where: EmploymentWhereUniqueInput
  }

  /**
   * Employment findFirst
   */
  export type EmploymentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Employment
     */
    select?: EmploymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Employment
     */
    omit?: EmploymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmploymentInclude<ExtArgs> | null
    /**
     * Filter, which Employment to fetch.
     */
    where?: EmploymentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Employments to fetch.
     */
    orderBy?: EmploymentOrderByWithRelationInput | EmploymentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Employments.
     */
    cursor?: EmploymentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Employments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Employments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Employments.
     */
    distinct?: EmploymentScalarFieldEnum | EmploymentScalarFieldEnum[]
  }

  /**
   * Employment findFirstOrThrow
   */
  export type EmploymentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Employment
     */
    select?: EmploymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Employment
     */
    omit?: EmploymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmploymentInclude<ExtArgs> | null
    /**
     * Filter, which Employment to fetch.
     */
    where?: EmploymentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Employments to fetch.
     */
    orderBy?: EmploymentOrderByWithRelationInput | EmploymentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Employments.
     */
    cursor?: EmploymentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Employments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Employments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Employments.
     */
    distinct?: EmploymentScalarFieldEnum | EmploymentScalarFieldEnum[]
  }

  /**
   * Employment findMany
   */
  export type EmploymentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Employment
     */
    select?: EmploymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Employment
     */
    omit?: EmploymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmploymentInclude<ExtArgs> | null
    /**
     * Filter, which Employments to fetch.
     */
    where?: EmploymentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Employments to fetch.
     */
    orderBy?: EmploymentOrderByWithRelationInput | EmploymentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Employments.
     */
    cursor?: EmploymentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Employments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Employments.
     */
    skip?: number
    distinct?: EmploymentScalarFieldEnum | EmploymentScalarFieldEnum[]
  }

  /**
   * Employment create
   */
  export type EmploymentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Employment
     */
    select?: EmploymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Employment
     */
    omit?: EmploymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmploymentInclude<ExtArgs> | null
    /**
     * The data needed to create a Employment.
     */
    data: XOR<EmploymentCreateInput, EmploymentUncheckedCreateInput>
  }

  /**
   * Employment createMany
   */
  export type EmploymentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Employments.
     */
    data: EmploymentCreateManyInput | EmploymentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Employment createManyAndReturn
   */
  export type EmploymentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Employment
     */
    select?: EmploymentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Employment
     */
    omit?: EmploymentOmit<ExtArgs> | null
    /**
     * The data used to create many Employments.
     */
    data: EmploymentCreateManyInput | EmploymentCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmploymentIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Employment update
   */
  export type EmploymentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Employment
     */
    select?: EmploymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Employment
     */
    omit?: EmploymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmploymentInclude<ExtArgs> | null
    /**
     * The data needed to update a Employment.
     */
    data: XOR<EmploymentUpdateInput, EmploymentUncheckedUpdateInput>
    /**
     * Choose, which Employment to update.
     */
    where: EmploymentWhereUniqueInput
  }

  /**
   * Employment updateMany
   */
  export type EmploymentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Employments.
     */
    data: XOR<EmploymentUpdateManyMutationInput, EmploymentUncheckedUpdateManyInput>
    /**
     * Filter which Employments to update
     */
    where?: EmploymentWhereInput
    /**
     * Limit how many Employments to update.
     */
    limit?: number
  }

  /**
   * Employment updateManyAndReturn
   */
  export type EmploymentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Employment
     */
    select?: EmploymentSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Employment
     */
    omit?: EmploymentOmit<ExtArgs> | null
    /**
     * The data used to update Employments.
     */
    data: XOR<EmploymentUpdateManyMutationInput, EmploymentUncheckedUpdateManyInput>
    /**
     * Filter which Employments to update
     */
    where?: EmploymentWhereInput
    /**
     * Limit how many Employments to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmploymentIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Employment upsert
   */
  export type EmploymentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Employment
     */
    select?: EmploymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Employment
     */
    omit?: EmploymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmploymentInclude<ExtArgs> | null
    /**
     * The filter to search for the Employment to update in case it exists.
     */
    where: EmploymentWhereUniqueInput
    /**
     * In case the Employment found by the `where` argument doesn't exist, create a new Employment with this data.
     */
    create: XOR<EmploymentCreateInput, EmploymentUncheckedCreateInput>
    /**
     * In case the Employment was found with the provided `where` argument, update it with this data.
     */
    update: XOR<EmploymentUpdateInput, EmploymentUncheckedUpdateInput>
  }

  /**
   * Employment delete
   */
  export type EmploymentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Employment
     */
    select?: EmploymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Employment
     */
    omit?: EmploymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmploymentInclude<ExtArgs> | null
    /**
     * Filter which Employment to delete.
     */
    where: EmploymentWhereUniqueInput
  }

  /**
   * Employment deleteMany
   */
  export type EmploymentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Employments to delete
     */
    where?: EmploymentWhereInput
    /**
     * Limit how many Employments to delete.
     */
    limit?: number
  }

  /**
   * Employment without action
   */
  export type EmploymentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Employment
     */
    select?: EmploymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Employment
     */
    omit?: EmploymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmploymentInclude<ExtArgs> | null
  }


  /**
   * Model Address
   */

  export type AggregateAddress = {
    _count: AddressCountAggregateOutputType | null
    _min: AddressMinAggregateOutputType | null
    _max: AddressMaxAggregateOutputType | null
  }

  export type AddressMinAggregateOutputType = {
    id: string | null
    employee_id: string | null
    address_type: string | null
    address_line_1: string | null
    address_line_2: string | null
    district: string | null
    sub_district: string | null
    province: string | null
    postal_code: string | null
    country: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type AddressMaxAggregateOutputType = {
    id: string | null
    employee_id: string | null
    address_type: string | null
    address_line_1: string | null
    address_line_2: string | null
    district: string | null
    sub_district: string | null
    province: string | null
    postal_code: string | null
    country: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type AddressCountAggregateOutputType = {
    id: number
    employee_id: number
    address_type: number
    address_line_1: number
    address_line_2: number
    district: number
    sub_district: number
    province: number
    postal_code: number
    country: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type AddressMinAggregateInputType = {
    id?: true
    employee_id?: true
    address_type?: true
    address_line_1?: true
    address_line_2?: true
    district?: true
    sub_district?: true
    province?: true
    postal_code?: true
    country?: true
    created_at?: true
    updated_at?: true
  }

  export type AddressMaxAggregateInputType = {
    id?: true
    employee_id?: true
    address_type?: true
    address_line_1?: true
    address_line_2?: true
    district?: true
    sub_district?: true
    province?: true
    postal_code?: true
    country?: true
    created_at?: true
    updated_at?: true
  }

  export type AddressCountAggregateInputType = {
    id?: true
    employee_id?: true
    address_type?: true
    address_line_1?: true
    address_line_2?: true
    district?: true
    sub_district?: true
    province?: true
    postal_code?: true
    country?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type AddressAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Address to aggregate.
     */
    where?: AddressWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Addresses to fetch.
     */
    orderBy?: AddressOrderByWithRelationInput | AddressOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AddressWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Addresses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Addresses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Addresses
    **/
    _count?: true | AddressCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AddressMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AddressMaxAggregateInputType
  }

  export type GetAddressAggregateType<T extends AddressAggregateArgs> = {
        [P in keyof T & keyof AggregateAddress]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAddress[P]>
      : GetScalarType<T[P], AggregateAddress[P]>
  }




  export type AddressGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AddressWhereInput
    orderBy?: AddressOrderByWithAggregationInput | AddressOrderByWithAggregationInput[]
    by: AddressScalarFieldEnum[] | AddressScalarFieldEnum
    having?: AddressScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AddressCountAggregateInputType | true
    _min?: AddressMinAggregateInputType
    _max?: AddressMaxAggregateInputType
  }

  export type AddressGroupByOutputType = {
    id: string
    employee_id: string
    address_type: string | null
    address_line_1: string | null
    address_line_2: string | null
    district: string | null
    sub_district: string | null
    province: string | null
    postal_code: string | null
    country: string
    created_at: Date
    updated_at: Date
    _count: AddressCountAggregateOutputType | null
    _min: AddressMinAggregateOutputType | null
    _max: AddressMaxAggregateOutputType | null
  }

  type GetAddressGroupByPayload<T extends AddressGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AddressGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AddressGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AddressGroupByOutputType[P]>
            : GetScalarType<T[P], AddressGroupByOutputType[P]>
        }
      >
    >


  export type AddressSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    employee_id?: boolean
    address_type?: boolean
    address_line_1?: boolean
    address_line_2?: boolean
    district?: boolean
    sub_district?: boolean
    province?: boolean
    postal_code?: boolean
    country?: boolean
    created_at?: boolean
    updated_at?: boolean
    employee?: boolean | EmployeeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["address"]>

  export type AddressSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    employee_id?: boolean
    address_type?: boolean
    address_line_1?: boolean
    address_line_2?: boolean
    district?: boolean
    sub_district?: boolean
    province?: boolean
    postal_code?: boolean
    country?: boolean
    created_at?: boolean
    updated_at?: boolean
    employee?: boolean | EmployeeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["address"]>

  export type AddressSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    employee_id?: boolean
    address_type?: boolean
    address_line_1?: boolean
    address_line_2?: boolean
    district?: boolean
    sub_district?: boolean
    province?: boolean
    postal_code?: boolean
    country?: boolean
    created_at?: boolean
    updated_at?: boolean
    employee?: boolean | EmployeeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["address"]>

  export type AddressSelectScalar = {
    id?: boolean
    employee_id?: boolean
    address_type?: boolean
    address_line_1?: boolean
    address_line_2?: boolean
    district?: boolean
    sub_district?: boolean
    province?: boolean
    postal_code?: boolean
    country?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type AddressOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "employee_id" | "address_type" | "address_line_1" | "address_line_2" | "district" | "sub_district" | "province" | "postal_code" | "country" | "created_at" | "updated_at", ExtArgs["result"]["address"]>
  export type AddressInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    employee?: boolean | EmployeeDefaultArgs<ExtArgs>
  }
  export type AddressIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    employee?: boolean | EmployeeDefaultArgs<ExtArgs>
  }
  export type AddressIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    employee?: boolean | EmployeeDefaultArgs<ExtArgs>
  }

  export type $AddressPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Address"
    objects: {
      employee: Prisma.$EmployeePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      employee_id: string
      address_type: string | null
      address_line_1: string | null
      address_line_2: string | null
      district: string | null
      sub_district: string | null
      province: string | null
      postal_code: string | null
      country: string
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["address"]>
    composites: {}
  }

  type AddressGetPayload<S extends boolean | null | undefined | AddressDefaultArgs> = $Result.GetResult<Prisma.$AddressPayload, S>

  type AddressCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AddressFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AddressCountAggregateInputType | true
    }

  export interface AddressDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Address'], meta: { name: 'Address' } }
    /**
     * Find zero or one Address that matches the filter.
     * @param {AddressFindUniqueArgs} args - Arguments to find a Address
     * @example
     * // Get one Address
     * const address = await prisma.address.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AddressFindUniqueArgs>(args: SelectSubset<T, AddressFindUniqueArgs<ExtArgs>>): Prisma__AddressClient<$Result.GetResult<Prisma.$AddressPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Address that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AddressFindUniqueOrThrowArgs} args - Arguments to find a Address
     * @example
     * // Get one Address
     * const address = await prisma.address.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AddressFindUniqueOrThrowArgs>(args: SelectSubset<T, AddressFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AddressClient<$Result.GetResult<Prisma.$AddressPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Address that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AddressFindFirstArgs} args - Arguments to find a Address
     * @example
     * // Get one Address
     * const address = await prisma.address.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AddressFindFirstArgs>(args?: SelectSubset<T, AddressFindFirstArgs<ExtArgs>>): Prisma__AddressClient<$Result.GetResult<Prisma.$AddressPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Address that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AddressFindFirstOrThrowArgs} args - Arguments to find a Address
     * @example
     * // Get one Address
     * const address = await prisma.address.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AddressFindFirstOrThrowArgs>(args?: SelectSubset<T, AddressFindFirstOrThrowArgs<ExtArgs>>): Prisma__AddressClient<$Result.GetResult<Prisma.$AddressPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Addresses that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AddressFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Addresses
     * const addresses = await prisma.address.findMany()
     * 
     * // Get first 10 Addresses
     * const addresses = await prisma.address.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const addressWithIdOnly = await prisma.address.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AddressFindManyArgs>(args?: SelectSubset<T, AddressFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AddressPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Address.
     * @param {AddressCreateArgs} args - Arguments to create a Address.
     * @example
     * // Create one Address
     * const Address = await prisma.address.create({
     *   data: {
     *     // ... data to create a Address
     *   }
     * })
     * 
     */
    create<T extends AddressCreateArgs>(args: SelectSubset<T, AddressCreateArgs<ExtArgs>>): Prisma__AddressClient<$Result.GetResult<Prisma.$AddressPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Addresses.
     * @param {AddressCreateManyArgs} args - Arguments to create many Addresses.
     * @example
     * // Create many Addresses
     * const address = await prisma.address.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AddressCreateManyArgs>(args?: SelectSubset<T, AddressCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Addresses and returns the data saved in the database.
     * @param {AddressCreateManyAndReturnArgs} args - Arguments to create many Addresses.
     * @example
     * // Create many Addresses
     * const address = await prisma.address.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Addresses and only return the `id`
     * const addressWithIdOnly = await prisma.address.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AddressCreateManyAndReturnArgs>(args?: SelectSubset<T, AddressCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AddressPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Address.
     * @param {AddressDeleteArgs} args - Arguments to delete one Address.
     * @example
     * // Delete one Address
     * const Address = await prisma.address.delete({
     *   where: {
     *     // ... filter to delete one Address
     *   }
     * })
     * 
     */
    delete<T extends AddressDeleteArgs>(args: SelectSubset<T, AddressDeleteArgs<ExtArgs>>): Prisma__AddressClient<$Result.GetResult<Prisma.$AddressPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Address.
     * @param {AddressUpdateArgs} args - Arguments to update one Address.
     * @example
     * // Update one Address
     * const address = await prisma.address.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AddressUpdateArgs>(args: SelectSubset<T, AddressUpdateArgs<ExtArgs>>): Prisma__AddressClient<$Result.GetResult<Prisma.$AddressPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Addresses.
     * @param {AddressDeleteManyArgs} args - Arguments to filter Addresses to delete.
     * @example
     * // Delete a few Addresses
     * const { count } = await prisma.address.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AddressDeleteManyArgs>(args?: SelectSubset<T, AddressDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Addresses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AddressUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Addresses
     * const address = await prisma.address.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AddressUpdateManyArgs>(args: SelectSubset<T, AddressUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Addresses and returns the data updated in the database.
     * @param {AddressUpdateManyAndReturnArgs} args - Arguments to update many Addresses.
     * @example
     * // Update many Addresses
     * const address = await prisma.address.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Addresses and only return the `id`
     * const addressWithIdOnly = await prisma.address.updateManyAndReturn({
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
    updateManyAndReturn<T extends AddressUpdateManyAndReturnArgs>(args: SelectSubset<T, AddressUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AddressPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Address.
     * @param {AddressUpsertArgs} args - Arguments to update or create a Address.
     * @example
     * // Update or create a Address
     * const address = await prisma.address.upsert({
     *   create: {
     *     // ... data to create a Address
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Address we want to update
     *   }
     * })
     */
    upsert<T extends AddressUpsertArgs>(args: SelectSubset<T, AddressUpsertArgs<ExtArgs>>): Prisma__AddressClient<$Result.GetResult<Prisma.$AddressPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Addresses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AddressCountArgs} args - Arguments to filter Addresses to count.
     * @example
     * // Count the number of Addresses
     * const count = await prisma.address.count({
     *   where: {
     *     // ... the filter for the Addresses we want to count
     *   }
     * })
    **/
    count<T extends AddressCountArgs>(
      args?: Subset<T, AddressCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AddressCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Address.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AddressAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends AddressAggregateArgs>(args: Subset<T, AddressAggregateArgs>): Prisma.PrismaPromise<GetAddressAggregateType<T>>

    /**
     * Group by Address.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AddressGroupByArgs} args - Group by arguments.
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
      T extends AddressGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AddressGroupByArgs['orderBy'] }
        : { orderBy?: AddressGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, AddressGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAddressGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Address model
   */
  readonly fields: AddressFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Address.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AddressClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    employee<T extends EmployeeDefaultArgs<ExtArgs> = {}>(args?: Subset<T, EmployeeDefaultArgs<ExtArgs>>): Prisma__EmployeeClient<$Result.GetResult<Prisma.$EmployeePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the Address model
   */
  interface AddressFieldRefs {
    readonly id: FieldRef<"Address", 'String'>
    readonly employee_id: FieldRef<"Address", 'String'>
    readonly address_type: FieldRef<"Address", 'String'>
    readonly address_line_1: FieldRef<"Address", 'String'>
    readonly address_line_2: FieldRef<"Address", 'String'>
    readonly district: FieldRef<"Address", 'String'>
    readonly sub_district: FieldRef<"Address", 'String'>
    readonly province: FieldRef<"Address", 'String'>
    readonly postal_code: FieldRef<"Address", 'String'>
    readonly country: FieldRef<"Address", 'String'>
    readonly created_at: FieldRef<"Address", 'DateTime'>
    readonly updated_at: FieldRef<"Address", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Address findUnique
   */
  export type AddressFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Address
     */
    select?: AddressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Address
     */
    omit?: AddressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AddressInclude<ExtArgs> | null
    /**
     * Filter, which Address to fetch.
     */
    where: AddressWhereUniqueInput
  }

  /**
   * Address findUniqueOrThrow
   */
  export type AddressFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Address
     */
    select?: AddressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Address
     */
    omit?: AddressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AddressInclude<ExtArgs> | null
    /**
     * Filter, which Address to fetch.
     */
    where: AddressWhereUniqueInput
  }

  /**
   * Address findFirst
   */
  export type AddressFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Address
     */
    select?: AddressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Address
     */
    omit?: AddressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AddressInclude<ExtArgs> | null
    /**
     * Filter, which Address to fetch.
     */
    where?: AddressWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Addresses to fetch.
     */
    orderBy?: AddressOrderByWithRelationInput | AddressOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Addresses.
     */
    cursor?: AddressWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Addresses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Addresses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Addresses.
     */
    distinct?: AddressScalarFieldEnum | AddressScalarFieldEnum[]
  }

  /**
   * Address findFirstOrThrow
   */
  export type AddressFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Address
     */
    select?: AddressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Address
     */
    omit?: AddressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AddressInclude<ExtArgs> | null
    /**
     * Filter, which Address to fetch.
     */
    where?: AddressWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Addresses to fetch.
     */
    orderBy?: AddressOrderByWithRelationInput | AddressOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Addresses.
     */
    cursor?: AddressWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Addresses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Addresses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Addresses.
     */
    distinct?: AddressScalarFieldEnum | AddressScalarFieldEnum[]
  }

  /**
   * Address findMany
   */
  export type AddressFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Address
     */
    select?: AddressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Address
     */
    omit?: AddressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AddressInclude<ExtArgs> | null
    /**
     * Filter, which Addresses to fetch.
     */
    where?: AddressWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Addresses to fetch.
     */
    orderBy?: AddressOrderByWithRelationInput | AddressOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Addresses.
     */
    cursor?: AddressWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Addresses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Addresses.
     */
    skip?: number
    distinct?: AddressScalarFieldEnum | AddressScalarFieldEnum[]
  }

  /**
   * Address create
   */
  export type AddressCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Address
     */
    select?: AddressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Address
     */
    omit?: AddressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AddressInclude<ExtArgs> | null
    /**
     * The data needed to create a Address.
     */
    data: XOR<AddressCreateInput, AddressUncheckedCreateInput>
  }

  /**
   * Address createMany
   */
  export type AddressCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Addresses.
     */
    data: AddressCreateManyInput | AddressCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Address createManyAndReturn
   */
  export type AddressCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Address
     */
    select?: AddressSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Address
     */
    omit?: AddressOmit<ExtArgs> | null
    /**
     * The data used to create many Addresses.
     */
    data: AddressCreateManyInput | AddressCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AddressIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Address update
   */
  export type AddressUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Address
     */
    select?: AddressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Address
     */
    omit?: AddressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AddressInclude<ExtArgs> | null
    /**
     * The data needed to update a Address.
     */
    data: XOR<AddressUpdateInput, AddressUncheckedUpdateInput>
    /**
     * Choose, which Address to update.
     */
    where: AddressWhereUniqueInput
  }

  /**
   * Address updateMany
   */
  export type AddressUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Addresses.
     */
    data: XOR<AddressUpdateManyMutationInput, AddressUncheckedUpdateManyInput>
    /**
     * Filter which Addresses to update
     */
    where?: AddressWhereInput
    /**
     * Limit how many Addresses to update.
     */
    limit?: number
  }

  /**
   * Address updateManyAndReturn
   */
  export type AddressUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Address
     */
    select?: AddressSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Address
     */
    omit?: AddressOmit<ExtArgs> | null
    /**
     * The data used to update Addresses.
     */
    data: XOR<AddressUpdateManyMutationInput, AddressUncheckedUpdateManyInput>
    /**
     * Filter which Addresses to update
     */
    where?: AddressWhereInput
    /**
     * Limit how many Addresses to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AddressIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Address upsert
   */
  export type AddressUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Address
     */
    select?: AddressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Address
     */
    omit?: AddressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AddressInclude<ExtArgs> | null
    /**
     * The filter to search for the Address to update in case it exists.
     */
    where: AddressWhereUniqueInput
    /**
     * In case the Address found by the `where` argument doesn't exist, create a new Address with this data.
     */
    create: XOR<AddressCreateInput, AddressUncheckedCreateInput>
    /**
     * In case the Address was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AddressUpdateInput, AddressUncheckedUpdateInput>
  }

  /**
   * Address delete
   */
  export type AddressDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Address
     */
    select?: AddressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Address
     */
    omit?: AddressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AddressInclude<ExtArgs> | null
    /**
     * Filter which Address to delete.
     */
    where: AddressWhereUniqueInput
  }

  /**
   * Address deleteMany
   */
  export type AddressDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Addresses to delete
     */
    where?: AddressWhereInput
    /**
     * Limit how many Addresses to delete.
     */
    limit?: number
  }

  /**
   * Address without action
   */
  export type AddressDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Address
     */
    select?: AddressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Address
     */
    omit?: AddressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AddressInclude<ExtArgs> | null
  }


  /**
   * Model EmergencyContact
   */

  export type AggregateEmergencyContact = {
    _count: EmergencyContactCountAggregateOutputType | null
    _min: EmergencyContactMinAggregateOutputType | null
    _max: EmergencyContactMaxAggregateOutputType | null
  }

  export type EmergencyContactMinAggregateOutputType = {
    id: string | null
    employee_id: string | null
    name: string | null
    relationship: string | null
    phone: string | null
    email: string | null
    address: string | null
    is_primary: boolean | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type EmergencyContactMaxAggregateOutputType = {
    id: string | null
    employee_id: string | null
    name: string | null
    relationship: string | null
    phone: string | null
    email: string | null
    address: string | null
    is_primary: boolean | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type EmergencyContactCountAggregateOutputType = {
    id: number
    employee_id: number
    name: number
    relationship: number
    phone: number
    email: number
    address: number
    is_primary: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type EmergencyContactMinAggregateInputType = {
    id?: true
    employee_id?: true
    name?: true
    relationship?: true
    phone?: true
    email?: true
    address?: true
    is_primary?: true
    created_at?: true
    updated_at?: true
  }

  export type EmergencyContactMaxAggregateInputType = {
    id?: true
    employee_id?: true
    name?: true
    relationship?: true
    phone?: true
    email?: true
    address?: true
    is_primary?: true
    created_at?: true
    updated_at?: true
  }

  export type EmergencyContactCountAggregateInputType = {
    id?: true
    employee_id?: true
    name?: true
    relationship?: true
    phone?: true
    email?: true
    address?: true
    is_primary?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type EmergencyContactAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which EmergencyContact to aggregate.
     */
    where?: EmergencyContactWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EmergencyContacts to fetch.
     */
    orderBy?: EmergencyContactOrderByWithRelationInput | EmergencyContactOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: EmergencyContactWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EmergencyContacts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EmergencyContacts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned EmergencyContacts
    **/
    _count?: true | EmergencyContactCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EmergencyContactMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EmergencyContactMaxAggregateInputType
  }

  export type GetEmergencyContactAggregateType<T extends EmergencyContactAggregateArgs> = {
        [P in keyof T & keyof AggregateEmergencyContact]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEmergencyContact[P]>
      : GetScalarType<T[P], AggregateEmergencyContact[P]>
  }




  export type EmergencyContactGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EmergencyContactWhereInput
    orderBy?: EmergencyContactOrderByWithAggregationInput | EmergencyContactOrderByWithAggregationInput[]
    by: EmergencyContactScalarFieldEnum[] | EmergencyContactScalarFieldEnum
    having?: EmergencyContactScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EmergencyContactCountAggregateInputType | true
    _min?: EmergencyContactMinAggregateInputType
    _max?: EmergencyContactMaxAggregateInputType
  }

  export type EmergencyContactGroupByOutputType = {
    id: string
    employee_id: string
    name: string
    relationship: string
    phone: string
    email: string | null
    address: string | null
    is_primary: boolean
    created_at: Date
    updated_at: Date
    _count: EmergencyContactCountAggregateOutputType | null
    _min: EmergencyContactMinAggregateOutputType | null
    _max: EmergencyContactMaxAggregateOutputType | null
  }

  type GetEmergencyContactGroupByPayload<T extends EmergencyContactGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EmergencyContactGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EmergencyContactGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EmergencyContactGroupByOutputType[P]>
            : GetScalarType<T[P], EmergencyContactGroupByOutputType[P]>
        }
      >
    >


  export type EmergencyContactSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    employee_id?: boolean
    name?: boolean
    relationship?: boolean
    phone?: boolean
    email?: boolean
    address?: boolean
    is_primary?: boolean
    created_at?: boolean
    updated_at?: boolean
    employee?: boolean | EmployeeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["emergencyContact"]>

  export type EmergencyContactSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    employee_id?: boolean
    name?: boolean
    relationship?: boolean
    phone?: boolean
    email?: boolean
    address?: boolean
    is_primary?: boolean
    created_at?: boolean
    updated_at?: boolean
    employee?: boolean | EmployeeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["emergencyContact"]>

  export type EmergencyContactSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    employee_id?: boolean
    name?: boolean
    relationship?: boolean
    phone?: boolean
    email?: boolean
    address?: boolean
    is_primary?: boolean
    created_at?: boolean
    updated_at?: boolean
    employee?: boolean | EmployeeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["emergencyContact"]>

  export type EmergencyContactSelectScalar = {
    id?: boolean
    employee_id?: boolean
    name?: boolean
    relationship?: boolean
    phone?: boolean
    email?: boolean
    address?: boolean
    is_primary?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type EmergencyContactOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "employee_id" | "name" | "relationship" | "phone" | "email" | "address" | "is_primary" | "created_at" | "updated_at", ExtArgs["result"]["emergencyContact"]>
  export type EmergencyContactInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    employee?: boolean | EmployeeDefaultArgs<ExtArgs>
  }
  export type EmergencyContactIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    employee?: boolean | EmployeeDefaultArgs<ExtArgs>
  }
  export type EmergencyContactIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    employee?: boolean | EmployeeDefaultArgs<ExtArgs>
  }

  export type $EmergencyContactPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "EmergencyContact"
    objects: {
      employee: Prisma.$EmployeePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      employee_id: string
      name: string
      relationship: string
      phone: string
      email: string | null
      address: string | null
      is_primary: boolean
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["emergencyContact"]>
    composites: {}
  }

  type EmergencyContactGetPayload<S extends boolean | null | undefined | EmergencyContactDefaultArgs> = $Result.GetResult<Prisma.$EmergencyContactPayload, S>

  type EmergencyContactCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<EmergencyContactFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: EmergencyContactCountAggregateInputType | true
    }

  export interface EmergencyContactDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['EmergencyContact'], meta: { name: 'EmergencyContact' } }
    /**
     * Find zero or one EmergencyContact that matches the filter.
     * @param {EmergencyContactFindUniqueArgs} args - Arguments to find a EmergencyContact
     * @example
     * // Get one EmergencyContact
     * const emergencyContact = await prisma.emergencyContact.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends EmergencyContactFindUniqueArgs>(args: SelectSubset<T, EmergencyContactFindUniqueArgs<ExtArgs>>): Prisma__EmergencyContactClient<$Result.GetResult<Prisma.$EmergencyContactPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one EmergencyContact that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {EmergencyContactFindUniqueOrThrowArgs} args - Arguments to find a EmergencyContact
     * @example
     * // Get one EmergencyContact
     * const emergencyContact = await prisma.emergencyContact.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends EmergencyContactFindUniqueOrThrowArgs>(args: SelectSubset<T, EmergencyContactFindUniqueOrThrowArgs<ExtArgs>>): Prisma__EmergencyContactClient<$Result.GetResult<Prisma.$EmergencyContactPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first EmergencyContact that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmergencyContactFindFirstArgs} args - Arguments to find a EmergencyContact
     * @example
     * // Get one EmergencyContact
     * const emergencyContact = await prisma.emergencyContact.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends EmergencyContactFindFirstArgs>(args?: SelectSubset<T, EmergencyContactFindFirstArgs<ExtArgs>>): Prisma__EmergencyContactClient<$Result.GetResult<Prisma.$EmergencyContactPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first EmergencyContact that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmergencyContactFindFirstOrThrowArgs} args - Arguments to find a EmergencyContact
     * @example
     * // Get one EmergencyContact
     * const emergencyContact = await prisma.emergencyContact.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends EmergencyContactFindFirstOrThrowArgs>(args?: SelectSubset<T, EmergencyContactFindFirstOrThrowArgs<ExtArgs>>): Prisma__EmergencyContactClient<$Result.GetResult<Prisma.$EmergencyContactPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more EmergencyContacts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmergencyContactFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all EmergencyContacts
     * const emergencyContacts = await prisma.emergencyContact.findMany()
     * 
     * // Get first 10 EmergencyContacts
     * const emergencyContacts = await prisma.emergencyContact.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const emergencyContactWithIdOnly = await prisma.emergencyContact.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends EmergencyContactFindManyArgs>(args?: SelectSubset<T, EmergencyContactFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmergencyContactPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a EmergencyContact.
     * @param {EmergencyContactCreateArgs} args - Arguments to create a EmergencyContact.
     * @example
     * // Create one EmergencyContact
     * const EmergencyContact = await prisma.emergencyContact.create({
     *   data: {
     *     // ... data to create a EmergencyContact
     *   }
     * })
     * 
     */
    create<T extends EmergencyContactCreateArgs>(args: SelectSubset<T, EmergencyContactCreateArgs<ExtArgs>>): Prisma__EmergencyContactClient<$Result.GetResult<Prisma.$EmergencyContactPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many EmergencyContacts.
     * @param {EmergencyContactCreateManyArgs} args - Arguments to create many EmergencyContacts.
     * @example
     * // Create many EmergencyContacts
     * const emergencyContact = await prisma.emergencyContact.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends EmergencyContactCreateManyArgs>(args?: SelectSubset<T, EmergencyContactCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many EmergencyContacts and returns the data saved in the database.
     * @param {EmergencyContactCreateManyAndReturnArgs} args - Arguments to create many EmergencyContacts.
     * @example
     * // Create many EmergencyContacts
     * const emergencyContact = await prisma.emergencyContact.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many EmergencyContacts and only return the `id`
     * const emergencyContactWithIdOnly = await prisma.emergencyContact.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends EmergencyContactCreateManyAndReturnArgs>(args?: SelectSubset<T, EmergencyContactCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmergencyContactPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a EmergencyContact.
     * @param {EmergencyContactDeleteArgs} args - Arguments to delete one EmergencyContact.
     * @example
     * // Delete one EmergencyContact
     * const EmergencyContact = await prisma.emergencyContact.delete({
     *   where: {
     *     // ... filter to delete one EmergencyContact
     *   }
     * })
     * 
     */
    delete<T extends EmergencyContactDeleteArgs>(args: SelectSubset<T, EmergencyContactDeleteArgs<ExtArgs>>): Prisma__EmergencyContactClient<$Result.GetResult<Prisma.$EmergencyContactPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one EmergencyContact.
     * @param {EmergencyContactUpdateArgs} args - Arguments to update one EmergencyContact.
     * @example
     * // Update one EmergencyContact
     * const emergencyContact = await prisma.emergencyContact.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends EmergencyContactUpdateArgs>(args: SelectSubset<T, EmergencyContactUpdateArgs<ExtArgs>>): Prisma__EmergencyContactClient<$Result.GetResult<Prisma.$EmergencyContactPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more EmergencyContacts.
     * @param {EmergencyContactDeleteManyArgs} args - Arguments to filter EmergencyContacts to delete.
     * @example
     * // Delete a few EmergencyContacts
     * const { count } = await prisma.emergencyContact.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends EmergencyContactDeleteManyArgs>(args?: SelectSubset<T, EmergencyContactDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more EmergencyContacts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmergencyContactUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many EmergencyContacts
     * const emergencyContact = await prisma.emergencyContact.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends EmergencyContactUpdateManyArgs>(args: SelectSubset<T, EmergencyContactUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more EmergencyContacts and returns the data updated in the database.
     * @param {EmergencyContactUpdateManyAndReturnArgs} args - Arguments to update many EmergencyContacts.
     * @example
     * // Update many EmergencyContacts
     * const emergencyContact = await prisma.emergencyContact.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more EmergencyContacts and only return the `id`
     * const emergencyContactWithIdOnly = await prisma.emergencyContact.updateManyAndReturn({
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
    updateManyAndReturn<T extends EmergencyContactUpdateManyAndReturnArgs>(args: SelectSubset<T, EmergencyContactUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmergencyContactPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one EmergencyContact.
     * @param {EmergencyContactUpsertArgs} args - Arguments to update or create a EmergencyContact.
     * @example
     * // Update or create a EmergencyContact
     * const emergencyContact = await prisma.emergencyContact.upsert({
     *   create: {
     *     // ... data to create a EmergencyContact
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the EmergencyContact we want to update
     *   }
     * })
     */
    upsert<T extends EmergencyContactUpsertArgs>(args: SelectSubset<T, EmergencyContactUpsertArgs<ExtArgs>>): Prisma__EmergencyContactClient<$Result.GetResult<Prisma.$EmergencyContactPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of EmergencyContacts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmergencyContactCountArgs} args - Arguments to filter EmergencyContacts to count.
     * @example
     * // Count the number of EmergencyContacts
     * const count = await prisma.emergencyContact.count({
     *   where: {
     *     // ... the filter for the EmergencyContacts we want to count
     *   }
     * })
    **/
    count<T extends EmergencyContactCountArgs>(
      args?: Subset<T, EmergencyContactCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EmergencyContactCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a EmergencyContact.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmergencyContactAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends EmergencyContactAggregateArgs>(args: Subset<T, EmergencyContactAggregateArgs>): Prisma.PrismaPromise<GetEmergencyContactAggregateType<T>>

    /**
     * Group by EmergencyContact.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmergencyContactGroupByArgs} args - Group by arguments.
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
      T extends EmergencyContactGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EmergencyContactGroupByArgs['orderBy'] }
        : { orderBy?: EmergencyContactGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, EmergencyContactGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEmergencyContactGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the EmergencyContact model
   */
  readonly fields: EmergencyContactFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for EmergencyContact.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__EmergencyContactClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    employee<T extends EmployeeDefaultArgs<ExtArgs> = {}>(args?: Subset<T, EmployeeDefaultArgs<ExtArgs>>): Prisma__EmployeeClient<$Result.GetResult<Prisma.$EmployeePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the EmergencyContact model
   */
  interface EmergencyContactFieldRefs {
    readonly id: FieldRef<"EmergencyContact", 'String'>
    readonly employee_id: FieldRef<"EmergencyContact", 'String'>
    readonly name: FieldRef<"EmergencyContact", 'String'>
    readonly relationship: FieldRef<"EmergencyContact", 'String'>
    readonly phone: FieldRef<"EmergencyContact", 'String'>
    readonly email: FieldRef<"EmergencyContact", 'String'>
    readonly address: FieldRef<"EmergencyContact", 'String'>
    readonly is_primary: FieldRef<"EmergencyContact", 'Boolean'>
    readonly created_at: FieldRef<"EmergencyContact", 'DateTime'>
    readonly updated_at: FieldRef<"EmergencyContact", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * EmergencyContact findUnique
   */
  export type EmergencyContactFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmergencyContact
     */
    select?: EmergencyContactSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmergencyContact
     */
    omit?: EmergencyContactOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmergencyContactInclude<ExtArgs> | null
    /**
     * Filter, which EmergencyContact to fetch.
     */
    where: EmergencyContactWhereUniqueInput
  }

  /**
   * EmergencyContact findUniqueOrThrow
   */
  export type EmergencyContactFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmergencyContact
     */
    select?: EmergencyContactSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmergencyContact
     */
    omit?: EmergencyContactOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmergencyContactInclude<ExtArgs> | null
    /**
     * Filter, which EmergencyContact to fetch.
     */
    where: EmergencyContactWhereUniqueInput
  }

  /**
   * EmergencyContact findFirst
   */
  export type EmergencyContactFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmergencyContact
     */
    select?: EmergencyContactSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmergencyContact
     */
    omit?: EmergencyContactOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmergencyContactInclude<ExtArgs> | null
    /**
     * Filter, which EmergencyContact to fetch.
     */
    where?: EmergencyContactWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EmergencyContacts to fetch.
     */
    orderBy?: EmergencyContactOrderByWithRelationInput | EmergencyContactOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for EmergencyContacts.
     */
    cursor?: EmergencyContactWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EmergencyContacts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EmergencyContacts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EmergencyContacts.
     */
    distinct?: EmergencyContactScalarFieldEnum | EmergencyContactScalarFieldEnum[]
  }

  /**
   * EmergencyContact findFirstOrThrow
   */
  export type EmergencyContactFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmergencyContact
     */
    select?: EmergencyContactSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmergencyContact
     */
    omit?: EmergencyContactOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmergencyContactInclude<ExtArgs> | null
    /**
     * Filter, which EmergencyContact to fetch.
     */
    where?: EmergencyContactWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EmergencyContacts to fetch.
     */
    orderBy?: EmergencyContactOrderByWithRelationInput | EmergencyContactOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for EmergencyContacts.
     */
    cursor?: EmergencyContactWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EmergencyContacts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EmergencyContacts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EmergencyContacts.
     */
    distinct?: EmergencyContactScalarFieldEnum | EmergencyContactScalarFieldEnum[]
  }

  /**
   * EmergencyContact findMany
   */
  export type EmergencyContactFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmergencyContact
     */
    select?: EmergencyContactSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmergencyContact
     */
    omit?: EmergencyContactOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmergencyContactInclude<ExtArgs> | null
    /**
     * Filter, which EmergencyContacts to fetch.
     */
    where?: EmergencyContactWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EmergencyContacts to fetch.
     */
    orderBy?: EmergencyContactOrderByWithRelationInput | EmergencyContactOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing EmergencyContacts.
     */
    cursor?: EmergencyContactWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EmergencyContacts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EmergencyContacts.
     */
    skip?: number
    distinct?: EmergencyContactScalarFieldEnum | EmergencyContactScalarFieldEnum[]
  }

  /**
   * EmergencyContact create
   */
  export type EmergencyContactCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmergencyContact
     */
    select?: EmergencyContactSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmergencyContact
     */
    omit?: EmergencyContactOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmergencyContactInclude<ExtArgs> | null
    /**
     * The data needed to create a EmergencyContact.
     */
    data: XOR<EmergencyContactCreateInput, EmergencyContactUncheckedCreateInput>
  }

  /**
   * EmergencyContact createMany
   */
  export type EmergencyContactCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many EmergencyContacts.
     */
    data: EmergencyContactCreateManyInput | EmergencyContactCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * EmergencyContact createManyAndReturn
   */
  export type EmergencyContactCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmergencyContact
     */
    select?: EmergencyContactSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the EmergencyContact
     */
    omit?: EmergencyContactOmit<ExtArgs> | null
    /**
     * The data used to create many EmergencyContacts.
     */
    data: EmergencyContactCreateManyInput | EmergencyContactCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmergencyContactIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * EmergencyContact update
   */
  export type EmergencyContactUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmergencyContact
     */
    select?: EmergencyContactSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmergencyContact
     */
    omit?: EmergencyContactOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmergencyContactInclude<ExtArgs> | null
    /**
     * The data needed to update a EmergencyContact.
     */
    data: XOR<EmergencyContactUpdateInput, EmergencyContactUncheckedUpdateInput>
    /**
     * Choose, which EmergencyContact to update.
     */
    where: EmergencyContactWhereUniqueInput
  }

  /**
   * EmergencyContact updateMany
   */
  export type EmergencyContactUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update EmergencyContacts.
     */
    data: XOR<EmergencyContactUpdateManyMutationInput, EmergencyContactUncheckedUpdateManyInput>
    /**
     * Filter which EmergencyContacts to update
     */
    where?: EmergencyContactWhereInput
    /**
     * Limit how many EmergencyContacts to update.
     */
    limit?: number
  }

  /**
   * EmergencyContact updateManyAndReturn
   */
  export type EmergencyContactUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmergencyContact
     */
    select?: EmergencyContactSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the EmergencyContact
     */
    omit?: EmergencyContactOmit<ExtArgs> | null
    /**
     * The data used to update EmergencyContacts.
     */
    data: XOR<EmergencyContactUpdateManyMutationInput, EmergencyContactUncheckedUpdateManyInput>
    /**
     * Filter which EmergencyContacts to update
     */
    where?: EmergencyContactWhereInput
    /**
     * Limit how many EmergencyContacts to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmergencyContactIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * EmergencyContact upsert
   */
  export type EmergencyContactUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmergencyContact
     */
    select?: EmergencyContactSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmergencyContact
     */
    omit?: EmergencyContactOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmergencyContactInclude<ExtArgs> | null
    /**
     * The filter to search for the EmergencyContact to update in case it exists.
     */
    where: EmergencyContactWhereUniqueInput
    /**
     * In case the EmergencyContact found by the `where` argument doesn't exist, create a new EmergencyContact with this data.
     */
    create: XOR<EmergencyContactCreateInput, EmergencyContactUncheckedCreateInput>
    /**
     * In case the EmergencyContact was found with the provided `where` argument, update it with this data.
     */
    update: XOR<EmergencyContactUpdateInput, EmergencyContactUncheckedUpdateInput>
  }

  /**
   * EmergencyContact delete
   */
  export type EmergencyContactDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmergencyContact
     */
    select?: EmergencyContactSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmergencyContact
     */
    omit?: EmergencyContactOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmergencyContactInclude<ExtArgs> | null
    /**
     * Filter which EmergencyContact to delete.
     */
    where: EmergencyContactWhereUniqueInput
  }

  /**
   * EmergencyContact deleteMany
   */
  export type EmergencyContactDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which EmergencyContacts to delete
     */
    where?: EmergencyContactWhereInput
    /**
     * Limit how many EmergencyContacts to delete.
     */
    limit?: number
  }

  /**
   * EmergencyContact without action
   */
  export type EmergencyContactDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmergencyContact
     */
    select?: EmergencyContactSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmergencyContact
     */
    omit?: EmergencyContactOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmergencyContactInclude<ExtArgs> | null
  }


  /**
   * Model Dependent
   */

  export type AggregateDependent = {
    _count: DependentCountAggregateOutputType | null
    _min: DependentMinAggregateOutputType | null
    _max: DependentMaxAggregateOutputType | null
  }

  export type DependentMinAggregateOutputType = {
    id: string | null
    employee_id: string | null
    name: string | null
    relationship_type: string | null
    date_of_birth: Date | null
    gender: string | null
    national_id: string | null
    is_tax_deductible: boolean | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type DependentMaxAggregateOutputType = {
    id: string | null
    employee_id: string | null
    name: string | null
    relationship_type: string | null
    date_of_birth: Date | null
    gender: string | null
    national_id: string | null
    is_tax_deductible: boolean | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type DependentCountAggregateOutputType = {
    id: number
    employee_id: number
    name: number
    relationship_type: number
    date_of_birth: number
    gender: number
    national_id: number
    is_tax_deductible: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type DependentMinAggregateInputType = {
    id?: true
    employee_id?: true
    name?: true
    relationship_type?: true
    date_of_birth?: true
    gender?: true
    national_id?: true
    is_tax_deductible?: true
    created_at?: true
    updated_at?: true
  }

  export type DependentMaxAggregateInputType = {
    id?: true
    employee_id?: true
    name?: true
    relationship_type?: true
    date_of_birth?: true
    gender?: true
    national_id?: true
    is_tax_deductible?: true
    created_at?: true
    updated_at?: true
  }

  export type DependentCountAggregateInputType = {
    id?: true
    employee_id?: true
    name?: true
    relationship_type?: true
    date_of_birth?: true
    gender?: true
    national_id?: true
    is_tax_deductible?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type DependentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Dependent to aggregate.
     */
    where?: DependentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Dependents to fetch.
     */
    orderBy?: DependentOrderByWithRelationInput | DependentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DependentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Dependents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Dependents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Dependents
    **/
    _count?: true | DependentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DependentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DependentMaxAggregateInputType
  }

  export type GetDependentAggregateType<T extends DependentAggregateArgs> = {
        [P in keyof T & keyof AggregateDependent]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDependent[P]>
      : GetScalarType<T[P], AggregateDependent[P]>
  }




  export type DependentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DependentWhereInput
    orderBy?: DependentOrderByWithAggregationInput | DependentOrderByWithAggregationInput[]
    by: DependentScalarFieldEnum[] | DependentScalarFieldEnum
    having?: DependentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DependentCountAggregateInputType | true
    _min?: DependentMinAggregateInputType
    _max?: DependentMaxAggregateInputType
  }

  export type DependentGroupByOutputType = {
    id: string
    employee_id: string
    name: string
    relationship_type: string
    date_of_birth: Date | null
    gender: string | null
    national_id: string | null
    is_tax_deductible: boolean
    created_at: Date
    updated_at: Date
    _count: DependentCountAggregateOutputType | null
    _min: DependentMinAggregateOutputType | null
    _max: DependentMaxAggregateOutputType | null
  }

  type GetDependentGroupByPayload<T extends DependentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DependentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DependentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DependentGroupByOutputType[P]>
            : GetScalarType<T[P], DependentGroupByOutputType[P]>
        }
      >
    >


  export type DependentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    employee_id?: boolean
    name?: boolean
    relationship_type?: boolean
    date_of_birth?: boolean
    gender?: boolean
    national_id?: boolean
    is_tax_deductible?: boolean
    created_at?: boolean
    updated_at?: boolean
    employee?: boolean | EmployeeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["dependent"]>

  export type DependentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    employee_id?: boolean
    name?: boolean
    relationship_type?: boolean
    date_of_birth?: boolean
    gender?: boolean
    national_id?: boolean
    is_tax_deductible?: boolean
    created_at?: boolean
    updated_at?: boolean
    employee?: boolean | EmployeeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["dependent"]>

  export type DependentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    employee_id?: boolean
    name?: boolean
    relationship_type?: boolean
    date_of_birth?: boolean
    gender?: boolean
    national_id?: boolean
    is_tax_deductible?: boolean
    created_at?: boolean
    updated_at?: boolean
    employee?: boolean | EmployeeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["dependent"]>

  export type DependentSelectScalar = {
    id?: boolean
    employee_id?: boolean
    name?: boolean
    relationship_type?: boolean
    date_of_birth?: boolean
    gender?: boolean
    national_id?: boolean
    is_tax_deductible?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type DependentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "employee_id" | "name" | "relationship_type" | "date_of_birth" | "gender" | "national_id" | "is_tax_deductible" | "created_at" | "updated_at", ExtArgs["result"]["dependent"]>
  export type DependentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    employee?: boolean | EmployeeDefaultArgs<ExtArgs>
  }
  export type DependentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    employee?: boolean | EmployeeDefaultArgs<ExtArgs>
  }
  export type DependentIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    employee?: boolean | EmployeeDefaultArgs<ExtArgs>
  }

  export type $DependentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Dependent"
    objects: {
      employee: Prisma.$EmployeePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      employee_id: string
      name: string
      relationship_type: string
      date_of_birth: Date | null
      gender: string | null
      national_id: string | null
      is_tax_deductible: boolean
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["dependent"]>
    composites: {}
  }

  type DependentGetPayload<S extends boolean | null | undefined | DependentDefaultArgs> = $Result.GetResult<Prisma.$DependentPayload, S>

  type DependentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<DependentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: DependentCountAggregateInputType | true
    }

  export interface DependentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Dependent'], meta: { name: 'Dependent' } }
    /**
     * Find zero or one Dependent that matches the filter.
     * @param {DependentFindUniqueArgs} args - Arguments to find a Dependent
     * @example
     * // Get one Dependent
     * const dependent = await prisma.dependent.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DependentFindUniqueArgs>(args: SelectSubset<T, DependentFindUniqueArgs<ExtArgs>>): Prisma__DependentClient<$Result.GetResult<Prisma.$DependentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Dependent that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {DependentFindUniqueOrThrowArgs} args - Arguments to find a Dependent
     * @example
     * // Get one Dependent
     * const dependent = await prisma.dependent.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DependentFindUniqueOrThrowArgs>(args: SelectSubset<T, DependentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DependentClient<$Result.GetResult<Prisma.$DependentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Dependent that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DependentFindFirstArgs} args - Arguments to find a Dependent
     * @example
     * // Get one Dependent
     * const dependent = await prisma.dependent.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DependentFindFirstArgs>(args?: SelectSubset<T, DependentFindFirstArgs<ExtArgs>>): Prisma__DependentClient<$Result.GetResult<Prisma.$DependentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Dependent that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DependentFindFirstOrThrowArgs} args - Arguments to find a Dependent
     * @example
     * // Get one Dependent
     * const dependent = await prisma.dependent.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DependentFindFirstOrThrowArgs>(args?: SelectSubset<T, DependentFindFirstOrThrowArgs<ExtArgs>>): Prisma__DependentClient<$Result.GetResult<Prisma.$DependentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Dependents that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DependentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Dependents
     * const dependents = await prisma.dependent.findMany()
     * 
     * // Get first 10 Dependents
     * const dependents = await prisma.dependent.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const dependentWithIdOnly = await prisma.dependent.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DependentFindManyArgs>(args?: SelectSubset<T, DependentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DependentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Dependent.
     * @param {DependentCreateArgs} args - Arguments to create a Dependent.
     * @example
     * // Create one Dependent
     * const Dependent = await prisma.dependent.create({
     *   data: {
     *     // ... data to create a Dependent
     *   }
     * })
     * 
     */
    create<T extends DependentCreateArgs>(args: SelectSubset<T, DependentCreateArgs<ExtArgs>>): Prisma__DependentClient<$Result.GetResult<Prisma.$DependentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Dependents.
     * @param {DependentCreateManyArgs} args - Arguments to create many Dependents.
     * @example
     * // Create many Dependents
     * const dependent = await prisma.dependent.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DependentCreateManyArgs>(args?: SelectSubset<T, DependentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Dependents and returns the data saved in the database.
     * @param {DependentCreateManyAndReturnArgs} args - Arguments to create many Dependents.
     * @example
     * // Create many Dependents
     * const dependent = await prisma.dependent.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Dependents and only return the `id`
     * const dependentWithIdOnly = await prisma.dependent.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DependentCreateManyAndReturnArgs>(args?: SelectSubset<T, DependentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DependentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Dependent.
     * @param {DependentDeleteArgs} args - Arguments to delete one Dependent.
     * @example
     * // Delete one Dependent
     * const Dependent = await prisma.dependent.delete({
     *   where: {
     *     // ... filter to delete one Dependent
     *   }
     * })
     * 
     */
    delete<T extends DependentDeleteArgs>(args: SelectSubset<T, DependentDeleteArgs<ExtArgs>>): Prisma__DependentClient<$Result.GetResult<Prisma.$DependentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Dependent.
     * @param {DependentUpdateArgs} args - Arguments to update one Dependent.
     * @example
     * // Update one Dependent
     * const dependent = await prisma.dependent.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DependentUpdateArgs>(args: SelectSubset<T, DependentUpdateArgs<ExtArgs>>): Prisma__DependentClient<$Result.GetResult<Prisma.$DependentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Dependents.
     * @param {DependentDeleteManyArgs} args - Arguments to filter Dependents to delete.
     * @example
     * // Delete a few Dependents
     * const { count } = await prisma.dependent.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DependentDeleteManyArgs>(args?: SelectSubset<T, DependentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Dependents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DependentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Dependents
     * const dependent = await prisma.dependent.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DependentUpdateManyArgs>(args: SelectSubset<T, DependentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Dependents and returns the data updated in the database.
     * @param {DependentUpdateManyAndReturnArgs} args - Arguments to update many Dependents.
     * @example
     * // Update many Dependents
     * const dependent = await prisma.dependent.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Dependents and only return the `id`
     * const dependentWithIdOnly = await prisma.dependent.updateManyAndReturn({
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
    updateManyAndReturn<T extends DependentUpdateManyAndReturnArgs>(args: SelectSubset<T, DependentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DependentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Dependent.
     * @param {DependentUpsertArgs} args - Arguments to update or create a Dependent.
     * @example
     * // Update or create a Dependent
     * const dependent = await prisma.dependent.upsert({
     *   create: {
     *     // ... data to create a Dependent
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Dependent we want to update
     *   }
     * })
     */
    upsert<T extends DependentUpsertArgs>(args: SelectSubset<T, DependentUpsertArgs<ExtArgs>>): Prisma__DependentClient<$Result.GetResult<Prisma.$DependentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Dependents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DependentCountArgs} args - Arguments to filter Dependents to count.
     * @example
     * // Count the number of Dependents
     * const count = await prisma.dependent.count({
     *   where: {
     *     // ... the filter for the Dependents we want to count
     *   }
     * })
    **/
    count<T extends DependentCountArgs>(
      args?: Subset<T, DependentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DependentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Dependent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DependentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends DependentAggregateArgs>(args: Subset<T, DependentAggregateArgs>): Prisma.PrismaPromise<GetDependentAggregateType<T>>

    /**
     * Group by Dependent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DependentGroupByArgs} args - Group by arguments.
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
      T extends DependentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DependentGroupByArgs['orderBy'] }
        : { orderBy?: DependentGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, DependentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDependentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Dependent model
   */
  readonly fields: DependentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Dependent.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DependentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    employee<T extends EmployeeDefaultArgs<ExtArgs> = {}>(args?: Subset<T, EmployeeDefaultArgs<ExtArgs>>): Prisma__EmployeeClient<$Result.GetResult<Prisma.$EmployeePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the Dependent model
   */
  interface DependentFieldRefs {
    readonly id: FieldRef<"Dependent", 'String'>
    readonly employee_id: FieldRef<"Dependent", 'String'>
    readonly name: FieldRef<"Dependent", 'String'>
    readonly relationship_type: FieldRef<"Dependent", 'String'>
    readonly date_of_birth: FieldRef<"Dependent", 'DateTime'>
    readonly gender: FieldRef<"Dependent", 'String'>
    readonly national_id: FieldRef<"Dependent", 'String'>
    readonly is_tax_deductible: FieldRef<"Dependent", 'Boolean'>
    readonly created_at: FieldRef<"Dependent", 'DateTime'>
    readonly updated_at: FieldRef<"Dependent", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Dependent findUnique
   */
  export type DependentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Dependent
     */
    select?: DependentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Dependent
     */
    omit?: DependentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DependentInclude<ExtArgs> | null
    /**
     * Filter, which Dependent to fetch.
     */
    where: DependentWhereUniqueInput
  }

  /**
   * Dependent findUniqueOrThrow
   */
  export type DependentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Dependent
     */
    select?: DependentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Dependent
     */
    omit?: DependentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DependentInclude<ExtArgs> | null
    /**
     * Filter, which Dependent to fetch.
     */
    where: DependentWhereUniqueInput
  }

  /**
   * Dependent findFirst
   */
  export type DependentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Dependent
     */
    select?: DependentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Dependent
     */
    omit?: DependentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DependentInclude<ExtArgs> | null
    /**
     * Filter, which Dependent to fetch.
     */
    where?: DependentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Dependents to fetch.
     */
    orderBy?: DependentOrderByWithRelationInput | DependentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Dependents.
     */
    cursor?: DependentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Dependents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Dependents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Dependents.
     */
    distinct?: DependentScalarFieldEnum | DependentScalarFieldEnum[]
  }

  /**
   * Dependent findFirstOrThrow
   */
  export type DependentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Dependent
     */
    select?: DependentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Dependent
     */
    omit?: DependentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DependentInclude<ExtArgs> | null
    /**
     * Filter, which Dependent to fetch.
     */
    where?: DependentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Dependents to fetch.
     */
    orderBy?: DependentOrderByWithRelationInput | DependentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Dependents.
     */
    cursor?: DependentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Dependents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Dependents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Dependents.
     */
    distinct?: DependentScalarFieldEnum | DependentScalarFieldEnum[]
  }

  /**
   * Dependent findMany
   */
  export type DependentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Dependent
     */
    select?: DependentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Dependent
     */
    omit?: DependentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DependentInclude<ExtArgs> | null
    /**
     * Filter, which Dependents to fetch.
     */
    where?: DependentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Dependents to fetch.
     */
    orderBy?: DependentOrderByWithRelationInput | DependentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Dependents.
     */
    cursor?: DependentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Dependents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Dependents.
     */
    skip?: number
    distinct?: DependentScalarFieldEnum | DependentScalarFieldEnum[]
  }

  /**
   * Dependent create
   */
  export type DependentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Dependent
     */
    select?: DependentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Dependent
     */
    omit?: DependentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DependentInclude<ExtArgs> | null
    /**
     * The data needed to create a Dependent.
     */
    data: XOR<DependentCreateInput, DependentUncheckedCreateInput>
  }

  /**
   * Dependent createMany
   */
  export type DependentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Dependents.
     */
    data: DependentCreateManyInput | DependentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Dependent createManyAndReturn
   */
  export type DependentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Dependent
     */
    select?: DependentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Dependent
     */
    omit?: DependentOmit<ExtArgs> | null
    /**
     * The data used to create many Dependents.
     */
    data: DependentCreateManyInput | DependentCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DependentIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Dependent update
   */
  export type DependentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Dependent
     */
    select?: DependentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Dependent
     */
    omit?: DependentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DependentInclude<ExtArgs> | null
    /**
     * The data needed to update a Dependent.
     */
    data: XOR<DependentUpdateInput, DependentUncheckedUpdateInput>
    /**
     * Choose, which Dependent to update.
     */
    where: DependentWhereUniqueInput
  }

  /**
   * Dependent updateMany
   */
  export type DependentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Dependents.
     */
    data: XOR<DependentUpdateManyMutationInput, DependentUncheckedUpdateManyInput>
    /**
     * Filter which Dependents to update
     */
    where?: DependentWhereInput
    /**
     * Limit how many Dependents to update.
     */
    limit?: number
  }

  /**
   * Dependent updateManyAndReturn
   */
  export type DependentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Dependent
     */
    select?: DependentSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Dependent
     */
    omit?: DependentOmit<ExtArgs> | null
    /**
     * The data used to update Dependents.
     */
    data: XOR<DependentUpdateManyMutationInput, DependentUncheckedUpdateManyInput>
    /**
     * Filter which Dependents to update
     */
    where?: DependentWhereInput
    /**
     * Limit how many Dependents to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DependentIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Dependent upsert
   */
  export type DependentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Dependent
     */
    select?: DependentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Dependent
     */
    omit?: DependentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DependentInclude<ExtArgs> | null
    /**
     * The filter to search for the Dependent to update in case it exists.
     */
    where: DependentWhereUniqueInput
    /**
     * In case the Dependent found by the `where` argument doesn't exist, create a new Dependent with this data.
     */
    create: XOR<DependentCreateInput, DependentUncheckedCreateInput>
    /**
     * In case the Dependent was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DependentUpdateInput, DependentUncheckedUpdateInput>
  }

  /**
   * Dependent delete
   */
  export type DependentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Dependent
     */
    select?: DependentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Dependent
     */
    omit?: DependentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DependentInclude<ExtArgs> | null
    /**
     * Filter which Dependent to delete.
     */
    where: DependentWhereUniqueInput
  }

  /**
   * Dependent deleteMany
   */
  export type DependentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Dependents to delete
     */
    where?: DependentWhereInput
    /**
     * Limit how many Dependents to delete.
     */
    limit?: number
  }

  /**
   * Dependent without action
   */
  export type DependentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Dependent
     */
    select?: DependentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Dependent
     */
    omit?: DependentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DependentInclude<ExtArgs> | null
  }


  /**
   * Model WorkPermit
   */

  export type AggregateWorkPermit = {
    _count: WorkPermitCountAggregateOutputType | null
    _min: WorkPermitMinAggregateOutputType | null
    _max: WorkPermitMaxAggregateOutputType | null
  }

  export type WorkPermitMinAggregateOutputType = {
    id: string | null
    employee_id: string | null
    permit_type: string | null
    permit_number: string | null
    issue_date: Date | null
    expiry_date: Date | null
    issuing_country: string | null
    status: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type WorkPermitMaxAggregateOutputType = {
    id: string | null
    employee_id: string | null
    permit_type: string | null
    permit_number: string | null
    issue_date: Date | null
    expiry_date: Date | null
    issuing_country: string | null
    status: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type WorkPermitCountAggregateOutputType = {
    id: number
    employee_id: number
    permit_type: number
    permit_number: number
    issue_date: number
    expiry_date: number
    issuing_country: number
    status: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type WorkPermitMinAggregateInputType = {
    id?: true
    employee_id?: true
    permit_type?: true
    permit_number?: true
    issue_date?: true
    expiry_date?: true
    issuing_country?: true
    status?: true
    created_at?: true
    updated_at?: true
  }

  export type WorkPermitMaxAggregateInputType = {
    id?: true
    employee_id?: true
    permit_type?: true
    permit_number?: true
    issue_date?: true
    expiry_date?: true
    issuing_country?: true
    status?: true
    created_at?: true
    updated_at?: true
  }

  export type WorkPermitCountAggregateInputType = {
    id?: true
    employee_id?: true
    permit_type?: true
    permit_number?: true
    issue_date?: true
    expiry_date?: true
    issuing_country?: true
    status?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type WorkPermitAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which WorkPermit to aggregate.
     */
    where?: WorkPermitWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WorkPermits to fetch.
     */
    orderBy?: WorkPermitOrderByWithRelationInput | WorkPermitOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: WorkPermitWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WorkPermits from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WorkPermits.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned WorkPermits
    **/
    _count?: true | WorkPermitCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: WorkPermitMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: WorkPermitMaxAggregateInputType
  }

  export type GetWorkPermitAggregateType<T extends WorkPermitAggregateArgs> = {
        [P in keyof T & keyof AggregateWorkPermit]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateWorkPermit[P]>
      : GetScalarType<T[P], AggregateWorkPermit[P]>
  }




  export type WorkPermitGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WorkPermitWhereInput
    orderBy?: WorkPermitOrderByWithAggregationInput | WorkPermitOrderByWithAggregationInput[]
    by: WorkPermitScalarFieldEnum[] | WorkPermitScalarFieldEnum
    having?: WorkPermitScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: WorkPermitCountAggregateInputType | true
    _min?: WorkPermitMinAggregateInputType
    _max?: WorkPermitMaxAggregateInputType
  }

  export type WorkPermitGroupByOutputType = {
    id: string
    employee_id: string
    permit_type: string
    permit_number: string
    issue_date: Date
    expiry_date: Date
    issuing_country: string
    status: string
    created_at: Date
    updated_at: Date
    _count: WorkPermitCountAggregateOutputType | null
    _min: WorkPermitMinAggregateOutputType | null
    _max: WorkPermitMaxAggregateOutputType | null
  }

  type GetWorkPermitGroupByPayload<T extends WorkPermitGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<WorkPermitGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof WorkPermitGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], WorkPermitGroupByOutputType[P]>
            : GetScalarType<T[P], WorkPermitGroupByOutputType[P]>
        }
      >
    >


  export type WorkPermitSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    employee_id?: boolean
    permit_type?: boolean
    permit_number?: boolean
    issue_date?: boolean
    expiry_date?: boolean
    issuing_country?: boolean
    status?: boolean
    created_at?: boolean
    updated_at?: boolean
    employee?: boolean | EmployeeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["workPermit"]>

  export type WorkPermitSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    employee_id?: boolean
    permit_type?: boolean
    permit_number?: boolean
    issue_date?: boolean
    expiry_date?: boolean
    issuing_country?: boolean
    status?: boolean
    created_at?: boolean
    updated_at?: boolean
    employee?: boolean | EmployeeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["workPermit"]>

  export type WorkPermitSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    employee_id?: boolean
    permit_type?: boolean
    permit_number?: boolean
    issue_date?: boolean
    expiry_date?: boolean
    issuing_country?: boolean
    status?: boolean
    created_at?: boolean
    updated_at?: boolean
    employee?: boolean | EmployeeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["workPermit"]>

  export type WorkPermitSelectScalar = {
    id?: boolean
    employee_id?: boolean
    permit_type?: boolean
    permit_number?: boolean
    issue_date?: boolean
    expiry_date?: boolean
    issuing_country?: boolean
    status?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type WorkPermitOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "employee_id" | "permit_type" | "permit_number" | "issue_date" | "expiry_date" | "issuing_country" | "status" | "created_at" | "updated_at", ExtArgs["result"]["workPermit"]>
  export type WorkPermitInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    employee?: boolean | EmployeeDefaultArgs<ExtArgs>
  }
  export type WorkPermitIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    employee?: boolean | EmployeeDefaultArgs<ExtArgs>
  }
  export type WorkPermitIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    employee?: boolean | EmployeeDefaultArgs<ExtArgs>
  }

  export type $WorkPermitPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "WorkPermit"
    objects: {
      employee: Prisma.$EmployeePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      employee_id: string
      permit_type: string
      permit_number: string
      issue_date: Date
      expiry_date: Date
      issuing_country: string
      status: string
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["workPermit"]>
    composites: {}
  }

  type WorkPermitGetPayload<S extends boolean | null | undefined | WorkPermitDefaultArgs> = $Result.GetResult<Prisma.$WorkPermitPayload, S>

  type WorkPermitCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<WorkPermitFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: WorkPermitCountAggregateInputType | true
    }

  export interface WorkPermitDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['WorkPermit'], meta: { name: 'WorkPermit' } }
    /**
     * Find zero or one WorkPermit that matches the filter.
     * @param {WorkPermitFindUniqueArgs} args - Arguments to find a WorkPermit
     * @example
     * // Get one WorkPermit
     * const workPermit = await prisma.workPermit.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends WorkPermitFindUniqueArgs>(args: SelectSubset<T, WorkPermitFindUniqueArgs<ExtArgs>>): Prisma__WorkPermitClient<$Result.GetResult<Prisma.$WorkPermitPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one WorkPermit that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {WorkPermitFindUniqueOrThrowArgs} args - Arguments to find a WorkPermit
     * @example
     * // Get one WorkPermit
     * const workPermit = await prisma.workPermit.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends WorkPermitFindUniqueOrThrowArgs>(args: SelectSubset<T, WorkPermitFindUniqueOrThrowArgs<ExtArgs>>): Prisma__WorkPermitClient<$Result.GetResult<Prisma.$WorkPermitPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first WorkPermit that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkPermitFindFirstArgs} args - Arguments to find a WorkPermit
     * @example
     * // Get one WorkPermit
     * const workPermit = await prisma.workPermit.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends WorkPermitFindFirstArgs>(args?: SelectSubset<T, WorkPermitFindFirstArgs<ExtArgs>>): Prisma__WorkPermitClient<$Result.GetResult<Prisma.$WorkPermitPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first WorkPermit that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkPermitFindFirstOrThrowArgs} args - Arguments to find a WorkPermit
     * @example
     * // Get one WorkPermit
     * const workPermit = await prisma.workPermit.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends WorkPermitFindFirstOrThrowArgs>(args?: SelectSubset<T, WorkPermitFindFirstOrThrowArgs<ExtArgs>>): Prisma__WorkPermitClient<$Result.GetResult<Prisma.$WorkPermitPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more WorkPermits that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkPermitFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all WorkPermits
     * const workPermits = await prisma.workPermit.findMany()
     * 
     * // Get first 10 WorkPermits
     * const workPermits = await prisma.workPermit.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const workPermitWithIdOnly = await prisma.workPermit.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends WorkPermitFindManyArgs>(args?: SelectSubset<T, WorkPermitFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WorkPermitPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a WorkPermit.
     * @param {WorkPermitCreateArgs} args - Arguments to create a WorkPermit.
     * @example
     * // Create one WorkPermit
     * const WorkPermit = await prisma.workPermit.create({
     *   data: {
     *     // ... data to create a WorkPermit
     *   }
     * })
     * 
     */
    create<T extends WorkPermitCreateArgs>(args: SelectSubset<T, WorkPermitCreateArgs<ExtArgs>>): Prisma__WorkPermitClient<$Result.GetResult<Prisma.$WorkPermitPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many WorkPermits.
     * @param {WorkPermitCreateManyArgs} args - Arguments to create many WorkPermits.
     * @example
     * // Create many WorkPermits
     * const workPermit = await prisma.workPermit.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends WorkPermitCreateManyArgs>(args?: SelectSubset<T, WorkPermitCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many WorkPermits and returns the data saved in the database.
     * @param {WorkPermitCreateManyAndReturnArgs} args - Arguments to create many WorkPermits.
     * @example
     * // Create many WorkPermits
     * const workPermit = await prisma.workPermit.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many WorkPermits and only return the `id`
     * const workPermitWithIdOnly = await prisma.workPermit.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends WorkPermitCreateManyAndReturnArgs>(args?: SelectSubset<T, WorkPermitCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WorkPermitPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a WorkPermit.
     * @param {WorkPermitDeleteArgs} args - Arguments to delete one WorkPermit.
     * @example
     * // Delete one WorkPermit
     * const WorkPermit = await prisma.workPermit.delete({
     *   where: {
     *     // ... filter to delete one WorkPermit
     *   }
     * })
     * 
     */
    delete<T extends WorkPermitDeleteArgs>(args: SelectSubset<T, WorkPermitDeleteArgs<ExtArgs>>): Prisma__WorkPermitClient<$Result.GetResult<Prisma.$WorkPermitPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one WorkPermit.
     * @param {WorkPermitUpdateArgs} args - Arguments to update one WorkPermit.
     * @example
     * // Update one WorkPermit
     * const workPermit = await prisma.workPermit.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends WorkPermitUpdateArgs>(args: SelectSubset<T, WorkPermitUpdateArgs<ExtArgs>>): Prisma__WorkPermitClient<$Result.GetResult<Prisma.$WorkPermitPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more WorkPermits.
     * @param {WorkPermitDeleteManyArgs} args - Arguments to filter WorkPermits to delete.
     * @example
     * // Delete a few WorkPermits
     * const { count } = await prisma.workPermit.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends WorkPermitDeleteManyArgs>(args?: SelectSubset<T, WorkPermitDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more WorkPermits.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkPermitUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many WorkPermits
     * const workPermit = await prisma.workPermit.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends WorkPermitUpdateManyArgs>(args: SelectSubset<T, WorkPermitUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more WorkPermits and returns the data updated in the database.
     * @param {WorkPermitUpdateManyAndReturnArgs} args - Arguments to update many WorkPermits.
     * @example
     * // Update many WorkPermits
     * const workPermit = await prisma.workPermit.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more WorkPermits and only return the `id`
     * const workPermitWithIdOnly = await prisma.workPermit.updateManyAndReturn({
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
    updateManyAndReturn<T extends WorkPermitUpdateManyAndReturnArgs>(args: SelectSubset<T, WorkPermitUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WorkPermitPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one WorkPermit.
     * @param {WorkPermitUpsertArgs} args - Arguments to update or create a WorkPermit.
     * @example
     * // Update or create a WorkPermit
     * const workPermit = await prisma.workPermit.upsert({
     *   create: {
     *     // ... data to create a WorkPermit
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the WorkPermit we want to update
     *   }
     * })
     */
    upsert<T extends WorkPermitUpsertArgs>(args: SelectSubset<T, WorkPermitUpsertArgs<ExtArgs>>): Prisma__WorkPermitClient<$Result.GetResult<Prisma.$WorkPermitPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of WorkPermits.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkPermitCountArgs} args - Arguments to filter WorkPermits to count.
     * @example
     * // Count the number of WorkPermits
     * const count = await prisma.workPermit.count({
     *   where: {
     *     // ... the filter for the WorkPermits we want to count
     *   }
     * })
    **/
    count<T extends WorkPermitCountArgs>(
      args?: Subset<T, WorkPermitCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], WorkPermitCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a WorkPermit.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkPermitAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends WorkPermitAggregateArgs>(args: Subset<T, WorkPermitAggregateArgs>): Prisma.PrismaPromise<GetWorkPermitAggregateType<T>>

    /**
     * Group by WorkPermit.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkPermitGroupByArgs} args - Group by arguments.
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
      T extends WorkPermitGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: WorkPermitGroupByArgs['orderBy'] }
        : { orderBy?: WorkPermitGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, WorkPermitGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetWorkPermitGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the WorkPermit model
   */
  readonly fields: WorkPermitFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for WorkPermit.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__WorkPermitClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    employee<T extends EmployeeDefaultArgs<ExtArgs> = {}>(args?: Subset<T, EmployeeDefaultArgs<ExtArgs>>): Prisma__EmployeeClient<$Result.GetResult<Prisma.$EmployeePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the WorkPermit model
   */
  interface WorkPermitFieldRefs {
    readonly id: FieldRef<"WorkPermit", 'String'>
    readonly employee_id: FieldRef<"WorkPermit", 'String'>
    readonly permit_type: FieldRef<"WorkPermit", 'String'>
    readonly permit_number: FieldRef<"WorkPermit", 'String'>
    readonly issue_date: FieldRef<"WorkPermit", 'DateTime'>
    readonly expiry_date: FieldRef<"WorkPermit", 'DateTime'>
    readonly issuing_country: FieldRef<"WorkPermit", 'String'>
    readonly status: FieldRef<"WorkPermit", 'String'>
    readonly created_at: FieldRef<"WorkPermit", 'DateTime'>
    readonly updated_at: FieldRef<"WorkPermit", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * WorkPermit findUnique
   */
  export type WorkPermitFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkPermit
     */
    select?: WorkPermitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkPermit
     */
    omit?: WorkPermitOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkPermitInclude<ExtArgs> | null
    /**
     * Filter, which WorkPermit to fetch.
     */
    where: WorkPermitWhereUniqueInput
  }

  /**
   * WorkPermit findUniqueOrThrow
   */
  export type WorkPermitFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkPermit
     */
    select?: WorkPermitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkPermit
     */
    omit?: WorkPermitOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkPermitInclude<ExtArgs> | null
    /**
     * Filter, which WorkPermit to fetch.
     */
    where: WorkPermitWhereUniqueInput
  }

  /**
   * WorkPermit findFirst
   */
  export type WorkPermitFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkPermit
     */
    select?: WorkPermitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkPermit
     */
    omit?: WorkPermitOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkPermitInclude<ExtArgs> | null
    /**
     * Filter, which WorkPermit to fetch.
     */
    where?: WorkPermitWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WorkPermits to fetch.
     */
    orderBy?: WorkPermitOrderByWithRelationInput | WorkPermitOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WorkPermits.
     */
    cursor?: WorkPermitWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WorkPermits from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WorkPermits.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WorkPermits.
     */
    distinct?: WorkPermitScalarFieldEnum | WorkPermitScalarFieldEnum[]
  }

  /**
   * WorkPermit findFirstOrThrow
   */
  export type WorkPermitFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkPermit
     */
    select?: WorkPermitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkPermit
     */
    omit?: WorkPermitOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkPermitInclude<ExtArgs> | null
    /**
     * Filter, which WorkPermit to fetch.
     */
    where?: WorkPermitWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WorkPermits to fetch.
     */
    orderBy?: WorkPermitOrderByWithRelationInput | WorkPermitOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WorkPermits.
     */
    cursor?: WorkPermitWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WorkPermits from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WorkPermits.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WorkPermits.
     */
    distinct?: WorkPermitScalarFieldEnum | WorkPermitScalarFieldEnum[]
  }

  /**
   * WorkPermit findMany
   */
  export type WorkPermitFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkPermit
     */
    select?: WorkPermitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkPermit
     */
    omit?: WorkPermitOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkPermitInclude<ExtArgs> | null
    /**
     * Filter, which WorkPermits to fetch.
     */
    where?: WorkPermitWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WorkPermits to fetch.
     */
    orderBy?: WorkPermitOrderByWithRelationInput | WorkPermitOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing WorkPermits.
     */
    cursor?: WorkPermitWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WorkPermits from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WorkPermits.
     */
    skip?: number
    distinct?: WorkPermitScalarFieldEnum | WorkPermitScalarFieldEnum[]
  }

  /**
   * WorkPermit create
   */
  export type WorkPermitCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkPermit
     */
    select?: WorkPermitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkPermit
     */
    omit?: WorkPermitOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkPermitInclude<ExtArgs> | null
    /**
     * The data needed to create a WorkPermit.
     */
    data: XOR<WorkPermitCreateInput, WorkPermitUncheckedCreateInput>
  }

  /**
   * WorkPermit createMany
   */
  export type WorkPermitCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many WorkPermits.
     */
    data: WorkPermitCreateManyInput | WorkPermitCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * WorkPermit createManyAndReturn
   */
  export type WorkPermitCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkPermit
     */
    select?: WorkPermitSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the WorkPermit
     */
    omit?: WorkPermitOmit<ExtArgs> | null
    /**
     * The data used to create many WorkPermits.
     */
    data: WorkPermitCreateManyInput | WorkPermitCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkPermitIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * WorkPermit update
   */
  export type WorkPermitUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkPermit
     */
    select?: WorkPermitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkPermit
     */
    omit?: WorkPermitOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkPermitInclude<ExtArgs> | null
    /**
     * The data needed to update a WorkPermit.
     */
    data: XOR<WorkPermitUpdateInput, WorkPermitUncheckedUpdateInput>
    /**
     * Choose, which WorkPermit to update.
     */
    where: WorkPermitWhereUniqueInput
  }

  /**
   * WorkPermit updateMany
   */
  export type WorkPermitUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update WorkPermits.
     */
    data: XOR<WorkPermitUpdateManyMutationInput, WorkPermitUncheckedUpdateManyInput>
    /**
     * Filter which WorkPermits to update
     */
    where?: WorkPermitWhereInput
    /**
     * Limit how many WorkPermits to update.
     */
    limit?: number
  }

  /**
   * WorkPermit updateManyAndReturn
   */
  export type WorkPermitUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkPermit
     */
    select?: WorkPermitSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the WorkPermit
     */
    omit?: WorkPermitOmit<ExtArgs> | null
    /**
     * The data used to update WorkPermits.
     */
    data: XOR<WorkPermitUpdateManyMutationInput, WorkPermitUncheckedUpdateManyInput>
    /**
     * Filter which WorkPermits to update
     */
    where?: WorkPermitWhereInput
    /**
     * Limit how many WorkPermits to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkPermitIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * WorkPermit upsert
   */
  export type WorkPermitUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkPermit
     */
    select?: WorkPermitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkPermit
     */
    omit?: WorkPermitOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkPermitInclude<ExtArgs> | null
    /**
     * The filter to search for the WorkPermit to update in case it exists.
     */
    where: WorkPermitWhereUniqueInput
    /**
     * In case the WorkPermit found by the `where` argument doesn't exist, create a new WorkPermit with this data.
     */
    create: XOR<WorkPermitCreateInput, WorkPermitUncheckedCreateInput>
    /**
     * In case the WorkPermit was found with the provided `where` argument, update it with this data.
     */
    update: XOR<WorkPermitUpdateInput, WorkPermitUncheckedUpdateInput>
  }

  /**
   * WorkPermit delete
   */
  export type WorkPermitDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkPermit
     */
    select?: WorkPermitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkPermit
     */
    omit?: WorkPermitOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkPermitInclude<ExtArgs> | null
    /**
     * Filter which WorkPermit to delete.
     */
    where: WorkPermitWhereUniqueInput
  }

  /**
   * WorkPermit deleteMany
   */
  export type WorkPermitDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which WorkPermits to delete
     */
    where?: WorkPermitWhereInput
    /**
     * Limit how many WorkPermits to delete.
     */
    limit?: number
  }

  /**
   * WorkPermit without action
   */
  export type WorkPermitDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkPermit
     */
    select?: WorkPermitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkPermit
     */
    omit?: WorkPermitOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkPermitInclude<ExtArgs> | null
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
    action: string | null
    entity_type: string | null
    entity_id: string | null
    performed_by: string | null
    changed_at: Date | null
  }

  export type AuditLogMaxAggregateOutputType = {
    id: string | null
    employee_id: string | null
    action: string | null
    entity_type: string | null
    entity_id: string | null
    performed_by: string | null
    changed_at: Date | null
  }

  export type AuditLogCountAggregateOutputType = {
    id: number
    employee_id: number
    action: number
    entity_type: number
    entity_id: number
    changes: number
    performed_by: number
    changed_at: number
    _all: number
  }


  export type AuditLogMinAggregateInputType = {
    id?: true
    employee_id?: true
    action?: true
    entity_type?: true
    entity_id?: true
    performed_by?: true
    changed_at?: true
  }

  export type AuditLogMaxAggregateInputType = {
    id?: true
    employee_id?: true
    action?: true
    entity_type?: true
    entity_id?: true
    performed_by?: true
    changed_at?: true
  }

  export type AuditLogCountAggregateInputType = {
    id?: true
    employee_id?: true
    action?: true
    entity_type?: true
    entity_id?: true
    changes?: true
    performed_by?: true
    changed_at?: true
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
    action: string
    entity_type: string
    entity_id: string | null
    changes: JsonValue | null
    performed_by: string
    changed_at: Date
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
    action?: boolean
    entity_type?: boolean
    entity_id?: boolean
    changes?: boolean
    performed_by?: boolean
    changed_at?: boolean
    employee?: boolean | EmployeeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["auditLog"]>

  export type AuditLogSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    employee_id?: boolean
    action?: boolean
    entity_type?: boolean
    entity_id?: boolean
    changes?: boolean
    performed_by?: boolean
    changed_at?: boolean
    employee?: boolean | EmployeeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["auditLog"]>

  export type AuditLogSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    employee_id?: boolean
    action?: boolean
    entity_type?: boolean
    entity_id?: boolean
    changes?: boolean
    performed_by?: boolean
    changed_at?: boolean
    employee?: boolean | EmployeeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["auditLog"]>

  export type AuditLogSelectScalar = {
    id?: boolean
    employee_id?: boolean
    action?: boolean
    entity_type?: boolean
    entity_id?: boolean
    changes?: boolean
    performed_by?: boolean
    changed_at?: boolean
  }

  export type AuditLogOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "employee_id" | "action" | "entity_type" | "entity_id" | "changes" | "performed_by" | "changed_at", ExtArgs["result"]["auditLog"]>
  export type AuditLogInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    employee?: boolean | EmployeeDefaultArgs<ExtArgs>
  }
  export type AuditLogIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    employee?: boolean | EmployeeDefaultArgs<ExtArgs>
  }
  export type AuditLogIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    employee?: boolean | EmployeeDefaultArgs<ExtArgs>
  }

  export type $AuditLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AuditLog"
    objects: {
      employee: Prisma.$EmployeePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      employee_id: string
      action: string
      entity_type: string
      entity_id: string | null
      changes: Prisma.JsonValue | null
      performed_by: string
      changed_at: Date
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
    employee<T extends EmployeeDefaultArgs<ExtArgs> = {}>(args?: Subset<T, EmployeeDefaultArgs<ExtArgs>>): Prisma__EmployeeClient<$Result.GetResult<Prisma.$EmployeePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
    readonly action: FieldRef<"AuditLog", 'String'>
    readonly entity_type: FieldRef<"AuditLog", 'String'>
    readonly entity_id: FieldRef<"AuditLog", 'String'>
    readonly changes: FieldRef<"AuditLog", 'Json'>
    readonly performed_by: FieldRef<"AuditLog", 'String'>
    readonly changed_at: FieldRef<"AuditLog", 'DateTime'>
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
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
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
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
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
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
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
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
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
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
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
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
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
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogIncludeCreateManyAndReturn<ExtArgs> | null
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
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
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
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogIncludeUpdateManyAndReturn<ExtArgs> | null
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
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
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
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
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
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
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


  export const EmployeeScalarFieldEnum: {
    id: 'id',
    employee_id: 'employee_id',
    first_name_en: 'first_name_en',
    first_name_th: 'first_name_th',
    last_name_en: 'last_name_en',
    last_name_th: 'last_name_th',
    nickname: 'nickname',
    gender: 'gender',
    date_of_birth: 'date_of_birth',
    nationality: 'nationality',
    national_id: 'national_id',
    religion: 'religion',
    blood_type: 'blood_type',
    marital_status: 'marital_status',
    tax_id: 'tax_id',
    passport_number: 'passport_number',
    photo_url: 'photo_url',
    email: 'email',
    personal_email: 'personal_email',
    business_phone: 'business_phone',
    personal_mobile: 'personal_mobile',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type EmployeeScalarFieldEnum = (typeof EmployeeScalarFieldEnum)[keyof typeof EmployeeScalarFieldEnum]


  export const EmploymentScalarFieldEnum: {
    id: 'id',
    employee_id: 'employee_id',
    hire_date: 'hire_date',
    status: 'status',
    probation_end_date: 'probation_end_date',
    termination_date: 'termination_date',
    job_title: 'job_title',
    position_id: 'position_id',
    department: 'department',
    division: 'division',
    location: 'location',
    grade: 'grade',
    level: 'level',
    manager_id: 'manager_id',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type EmploymentScalarFieldEnum = (typeof EmploymentScalarFieldEnum)[keyof typeof EmploymentScalarFieldEnum]


  export const AddressScalarFieldEnum: {
    id: 'id',
    employee_id: 'employee_id',
    address_type: 'address_type',
    address_line_1: 'address_line_1',
    address_line_2: 'address_line_2',
    district: 'district',
    sub_district: 'sub_district',
    province: 'province',
    postal_code: 'postal_code',
    country: 'country',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type AddressScalarFieldEnum = (typeof AddressScalarFieldEnum)[keyof typeof AddressScalarFieldEnum]


  export const EmergencyContactScalarFieldEnum: {
    id: 'id',
    employee_id: 'employee_id',
    name: 'name',
    relationship: 'relationship',
    phone: 'phone',
    email: 'email',
    address: 'address',
    is_primary: 'is_primary',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type EmergencyContactScalarFieldEnum = (typeof EmergencyContactScalarFieldEnum)[keyof typeof EmergencyContactScalarFieldEnum]


  export const DependentScalarFieldEnum: {
    id: 'id',
    employee_id: 'employee_id',
    name: 'name',
    relationship_type: 'relationship_type',
    date_of_birth: 'date_of_birth',
    gender: 'gender',
    national_id: 'national_id',
    is_tax_deductible: 'is_tax_deductible',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type DependentScalarFieldEnum = (typeof DependentScalarFieldEnum)[keyof typeof DependentScalarFieldEnum]


  export const WorkPermitScalarFieldEnum: {
    id: 'id',
    employee_id: 'employee_id',
    permit_type: 'permit_type',
    permit_number: 'permit_number',
    issue_date: 'issue_date',
    expiry_date: 'expiry_date',
    issuing_country: 'issuing_country',
    status: 'status',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type WorkPermitScalarFieldEnum = (typeof WorkPermitScalarFieldEnum)[keyof typeof WorkPermitScalarFieldEnum]


  export const AuditLogScalarFieldEnum: {
    id: 'id',
    employee_id: 'employee_id',
    action: 'action',
    entity_type: 'entity_type',
    entity_id: 'entity_id',
    changes: 'changes',
    performed_by: 'performed_by',
    changed_at: 'changed_at'
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
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    
  /**
   * Deep Input Types
   */


  export type EmployeeWhereInput = {
    AND?: EmployeeWhereInput | EmployeeWhereInput[]
    OR?: EmployeeWhereInput[]
    NOT?: EmployeeWhereInput | EmployeeWhereInput[]
    id?: StringFilter<"Employee"> | string
    employee_id?: StringFilter<"Employee"> | string
    first_name_en?: StringNullableFilter<"Employee"> | string | null
    first_name_th?: StringNullableFilter<"Employee"> | string | null
    last_name_en?: StringNullableFilter<"Employee"> | string | null
    last_name_th?: StringNullableFilter<"Employee"> | string | null
    nickname?: StringNullableFilter<"Employee"> | string | null
    gender?: StringNullableFilter<"Employee"> | string | null
    date_of_birth?: DateTimeNullableFilter<"Employee"> | Date | string | null
    nationality?: StringNullableFilter<"Employee"> | string | null
    national_id?: StringNullableFilter<"Employee"> | string | null
    religion?: StringNullableFilter<"Employee"> | string | null
    blood_type?: StringNullableFilter<"Employee"> | string | null
    marital_status?: StringNullableFilter<"Employee"> | string | null
    tax_id?: StringNullableFilter<"Employee"> | string | null
    passport_number?: StringNullableFilter<"Employee"> | string | null
    photo_url?: StringNullableFilter<"Employee"> | string | null
    email?: StringNullableFilter<"Employee"> | string | null
    personal_email?: StringNullableFilter<"Employee"> | string | null
    business_phone?: StringNullableFilter<"Employee"> | string | null
    personal_mobile?: StringNullableFilter<"Employee"> | string | null
    created_at?: DateTimeFilter<"Employee"> | Date | string
    updated_at?: DateTimeFilter<"Employee"> | Date | string
    employment?: XOR<EmploymentNullableScalarRelationFilter, EmploymentWhereInput> | null
    addresses?: AddressListRelationFilter
    emergency_contacts?: EmergencyContactListRelationFilter
    dependents?: DependentListRelationFilter
    work_permits?: WorkPermitListRelationFilter
    audit_logs?: AuditLogListRelationFilter
  }

  export type EmployeeOrderByWithRelationInput = {
    id?: SortOrder
    employee_id?: SortOrder
    first_name_en?: SortOrderInput | SortOrder
    first_name_th?: SortOrderInput | SortOrder
    last_name_en?: SortOrderInput | SortOrder
    last_name_th?: SortOrderInput | SortOrder
    nickname?: SortOrderInput | SortOrder
    gender?: SortOrderInput | SortOrder
    date_of_birth?: SortOrderInput | SortOrder
    nationality?: SortOrderInput | SortOrder
    national_id?: SortOrderInput | SortOrder
    religion?: SortOrderInput | SortOrder
    blood_type?: SortOrderInput | SortOrder
    marital_status?: SortOrderInput | SortOrder
    tax_id?: SortOrderInput | SortOrder
    passport_number?: SortOrderInput | SortOrder
    photo_url?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    personal_email?: SortOrderInput | SortOrder
    business_phone?: SortOrderInput | SortOrder
    personal_mobile?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    employment?: EmploymentOrderByWithRelationInput
    addresses?: AddressOrderByRelationAggregateInput
    emergency_contacts?: EmergencyContactOrderByRelationAggregateInput
    dependents?: DependentOrderByRelationAggregateInput
    work_permits?: WorkPermitOrderByRelationAggregateInput
    audit_logs?: AuditLogOrderByRelationAggregateInput
  }

  export type EmployeeWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    employee_id?: string
    AND?: EmployeeWhereInput | EmployeeWhereInput[]
    OR?: EmployeeWhereInput[]
    NOT?: EmployeeWhereInput | EmployeeWhereInput[]
    first_name_en?: StringNullableFilter<"Employee"> | string | null
    first_name_th?: StringNullableFilter<"Employee"> | string | null
    last_name_en?: StringNullableFilter<"Employee"> | string | null
    last_name_th?: StringNullableFilter<"Employee"> | string | null
    nickname?: StringNullableFilter<"Employee"> | string | null
    gender?: StringNullableFilter<"Employee"> | string | null
    date_of_birth?: DateTimeNullableFilter<"Employee"> | Date | string | null
    nationality?: StringNullableFilter<"Employee"> | string | null
    national_id?: StringNullableFilter<"Employee"> | string | null
    religion?: StringNullableFilter<"Employee"> | string | null
    blood_type?: StringNullableFilter<"Employee"> | string | null
    marital_status?: StringNullableFilter<"Employee"> | string | null
    tax_id?: StringNullableFilter<"Employee"> | string | null
    passport_number?: StringNullableFilter<"Employee"> | string | null
    photo_url?: StringNullableFilter<"Employee"> | string | null
    email?: StringNullableFilter<"Employee"> | string | null
    personal_email?: StringNullableFilter<"Employee"> | string | null
    business_phone?: StringNullableFilter<"Employee"> | string | null
    personal_mobile?: StringNullableFilter<"Employee"> | string | null
    created_at?: DateTimeFilter<"Employee"> | Date | string
    updated_at?: DateTimeFilter<"Employee"> | Date | string
    employment?: XOR<EmploymentNullableScalarRelationFilter, EmploymentWhereInput> | null
    addresses?: AddressListRelationFilter
    emergency_contacts?: EmergencyContactListRelationFilter
    dependents?: DependentListRelationFilter
    work_permits?: WorkPermitListRelationFilter
    audit_logs?: AuditLogListRelationFilter
  }, "id" | "employee_id">

  export type EmployeeOrderByWithAggregationInput = {
    id?: SortOrder
    employee_id?: SortOrder
    first_name_en?: SortOrderInput | SortOrder
    first_name_th?: SortOrderInput | SortOrder
    last_name_en?: SortOrderInput | SortOrder
    last_name_th?: SortOrderInput | SortOrder
    nickname?: SortOrderInput | SortOrder
    gender?: SortOrderInput | SortOrder
    date_of_birth?: SortOrderInput | SortOrder
    nationality?: SortOrderInput | SortOrder
    national_id?: SortOrderInput | SortOrder
    religion?: SortOrderInput | SortOrder
    blood_type?: SortOrderInput | SortOrder
    marital_status?: SortOrderInput | SortOrder
    tax_id?: SortOrderInput | SortOrder
    passport_number?: SortOrderInput | SortOrder
    photo_url?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    personal_email?: SortOrderInput | SortOrder
    business_phone?: SortOrderInput | SortOrder
    personal_mobile?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: EmployeeCountOrderByAggregateInput
    _max?: EmployeeMaxOrderByAggregateInput
    _min?: EmployeeMinOrderByAggregateInput
  }

  export type EmployeeScalarWhereWithAggregatesInput = {
    AND?: EmployeeScalarWhereWithAggregatesInput | EmployeeScalarWhereWithAggregatesInput[]
    OR?: EmployeeScalarWhereWithAggregatesInput[]
    NOT?: EmployeeScalarWhereWithAggregatesInput | EmployeeScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Employee"> | string
    employee_id?: StringWithAggregatesFilter<"Employee"> | string
    first_name_en?: StringNullableWithAggregatesFilter<"Employee"> | string | null
    first_name_th?: StringNullableWithAggregatesFilter<"Employee"> | string | null
    last_name_en?: StringNullableWithAggregatesFilter<"Employee"> | string | null
    last_name_th?: StringNullableWithAggregatesFilter<"Employee"> | string | null
    nickname?: StringNullableWithAggregatesFilter<"Employee"> | string | null
    gender?: StringNullableWithAggregatesFilter<"Employee"> | string | null
    date_of_birth?: DateTimeNullableWithAggregatesFilter<"Employee"> | Date | string | null
    nationality?: StringNullableWithAggregatesFilter<"Employee"> | string | null
    national_id?: StringNullableWithAggregatesFilter<"Employee"> | string | null
    religion?: StringNullableWithAggregatesFilter<"Employee"> | string | null
    blood_type?: StringNullableWithAggregatesFilter<"Employee"> | string | null
    marital_status?: StringNullableWithAggregatesFilter<"Employee"> | string | null
    tax_id?: StringNullableWithAggregatesFilter<"Employee"> | string | null
    passport_number?: StringNullableWithAggregatesFilter<"Employee"> | string | null
    photo_url?: StringNullableWithAggregatesFilter<"Employee"> | string | null
    email?: StringNullableWithAggregatesFilter<"Employee"> | string | null
    personal_email?: StringNullableWithAggregatesFilter<"Employee"> | string | null
    business_phone?: StringNullableWithAggregatesFilter<"Employee"> | string | null
    personal_mobile?: StringNullableWithAggregatesFilter<"Employee"> | string | null
    created_at?: DateTimeWithAggregatesFilter<"Employee"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"Employee"> | Date | string
  }

  export type EmploymentWhereInput = {
    AND?: EmploymentWhereInput | EmploymentWhereInput[]
    OR?: EmploymentWhereInput[]
    NOT?: EmploymentWhereInput | EmploymentWhereInput[]
    id?: StringFilter<"Employment"> | string
    employee_id?: StringFilter<"Employment"> | string
    hire_date?: DateTimeNullableFilter<"Employment"> | Date | string | null
    status?: StringFilter<"Employment"> | string
    probation_end_date?: DateTimeNullableFilter<"Employment"> | Date | string | null
    termination_date?: DateTimeNullableFilter<"Employment"> | Date | string | null
    job_title?: StringNullableFilter<"Employment"> | string | null
    position_id?: StringNullableFilter<"Employment"> | string | null
    department?: StringNullableFilter<"Employment"> | string | null
    division?: StringNullableFilter<"Employment"> | string | null
    location?: StringNullableFilter<"Employment"> | string | null
    grade?: StringNullableFilter<"Employment"> | string | null
    level?: StringNullableFilter<"Employment"> | string | null
    manager_id?: StringNullableFilter<"Employment"> | string | null
    created_at?: DateTimeFilter<"Employment"> | Date | string
    updated_at?: DateTimeFilter<"Employment"> | Date | string
    employee?: XOR<EmployeeScalarRelationFilter, EmployeeWhereInput>
  }

  export type EmploymentOrderByWithRelationInput = {
    id?: SortOrder
    employee_id?: SortOrder
    hire_date?: SortOrderInput | SortOrder
    status?: SortOrder
    probation_end_date?: SortOrderInput | SortOrder
    termination_date?: SortOrderInput | SortOrder
    job_title?: SortOrderInput | SortOrder
    position_id?: SortOrderInput | SortOrder
    department?: SortOrderInput | SortOrder
    division?: SortOrderInput | SortOrder
    location?: SortOrderInput | SortOrder
    grade?: SortOrderInput | SortOrder
    level?: SortOrderInput | SortOrder
    manager_id?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    employee?: EmployeeOrderByWithRelationInput
  }

  export type EmploymentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    employee_id?: string
    AND?: EmploymentWhereInput | EmploymentWhereInput[]
    OR?: EmploymentWhereInput[]
    NOT?: EmploymentWhereInput | EmploymentWhereInput[]
    hire_date?: DateTimeNullableFilter<"Employment"> | Date | string | null
    status?: StringFilter<"Employment"> | string
    probation_end_date?: DateTimeNullableFilter<"Employment"> | Date | string | null
    termination_date?: DateTimeNullableFilter<"Employment"> | Date | string | null
    job_title?: StringNullableFilter<"Employment"> | string | null
    position_id?: StringNullableFilter<"Employment"> | string | null
    department?: StringNullableFilter<"Employment"> | string | null
    division?: StringNullableFilter<"Employment"> | string | null
    location?: StringNullableFilter<"Employment"> | string | null
    grade?: StringNullableFilter<"Employment"> | string | null
    level?: StringNullableFilter<"Employment"> | string | null
    manager_id?: StringNullableFilter<"Employment"> | string | null
    created_at?: DateTimeFilter<"Employment"> | Date | string
    updated_at?: DateTimeFilter<"Employment"> | Date | string
    employee?: XOR<EmployeeScalarRelationFilter, EmployeeWhereInput>
  }, "id" | "employee_id">

  export type EmploymentOrderByWithAggregationInput = {
    id?: SortOrder
    employee_id?: SortOrder
    hire_date?: SortOrderInput | SortOrder
    status?: SortOrder
    probation_end_date?: SortOrderInput | SortOrder
    termination_date?: SortOrderInput | SortOrder
    job_title?: SortOrderInput | SortOrder
    position_id?: SortOrderInput | SortOrder
    department?: SortOrderInput | SortOrder
    division?: SortOrderInput | SortOrder
    location?: SortOrderInput | SortOrder
    grade?: SortOrderInput | SortOrder
    level?: SortOrderInput | SortOrder
    manager_id?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: EmploymentCountOrderByAggregateInput
    _max?: EmploymentMaxOrderByAggregateInput
    _min?: EmploymentMinOrderByAggregateInput
  }

  export type EmploymentScalarWhereWithAggregatesInput = {
    AND?: EmploymentScalarWhereWithAggregatesInput | EmploymentScalarWhereWithAggregatesInput[]
    OR?: EmploymentScalarWhereWithAggregatesInput[]
    NOT?: EmploymentScalarWhereWithAggregatesInput | EmploymentScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Employment"> | string
    employee_id?: StringWithAggregatesFilter<"Employment"> | string
    hire_date?: DateTimeNullableWithAggregatesFilter<"Employment"> | Date | string | null
    status?: StringWithAggregatesFilter<"Employment"> | string
    probation_end_date?: DateTimeNullableWithAggregatesFilter<"Employment"> | Date | string | null
    termination_date?: DateTimeNullableWithAggregatesFilter<"Employment"> | Date | string | null
    job_title?: StringNullableWithAggregatesFilter<"Employment"> | string | null
    position_id?: StringNullableWithAggregatesFilter<"Employment"> | string | null
    department?: StringNullableWithAggregatesFilter<"Employment"> | string | null
    division?: StringNullableWithAggregatesFilter<"Employment"> | string | null
    location?: StringNullableWithAggregatesFilter<"Employment"> | string | null
    grade?: StringNullableWithAggregatesFilter<"Employment"> | string | null
    level?: StringNullableWithAggregatesFilter<"Employment"> | string | null
    manager_id?: StringNullableWithAggregatesFilter<"Employment"> | string | null
    created_at?: DateTimeWithAggregatesFilter<"Employment"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"Employment"> | Date | string
  }

  export type AddressWhereInput = {
    AND?: AddressWhereInput | AddressWhereInput[]
    OR?: AddressWhereInput[]
    NOT?: AddressWhereInput | AddressWhereInput[]
    id?: StringFilter<"Address"> | string
    employee_id?: StringFilter<"Address"> | string
    address_type?: StringNullableFilter<"Address"> | string | null
    address_line_1?: StringNullableFilter<"Address"> | string | null
    address_line_2?: StringNullableFilter<"Address"> | string | null
    district?: StringNullableFilter<"Address"> | string | null
    sub_district?: StringNullableFilter<"Address"> | string | null
    province?: StringNullableFilter<"Address"> | string | null
    postal_code?: StringNullableFilter<"Address"> | string | null
    country?: StringFilter<"Address"> | string
    created_at?: DateTimeFilter<"Address"> | Date | string
    updated_at?: DateTimeFilter<"Address"> | Date | string
    employee?: XOR<EmployeeScalarRelationFilter, EmployeeWhereInput>
  }

  export type AddressOrderByWithRelationInput = {
    id?: SortOrder
    employee_id?: SortOrder
    address_type?: SortOrderInput | SortOrder
    address_line_1?: SortOrderInput | SortOrder
    address_line_2?: SortOrderInput | SortOrder
    district?: SortOrderInput | SortOrder
    sub_district?: SortOrderInput | SortOrder
    province?: SortOrderInput | SortOrder
    postal_code?: SortOrderInput | SortOrder
    country?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    employee?: EmployeeOrderByWithRelationInput
  }

  export type AddressWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AddressWhereInput | AddressWhereInput[]
    OR?: AddressWhereInput[]
    NOT?: AddressWhereInput | AddressWhereInput[]
    employee_id?: StringFilter<"Address"> | string
    address_type?: StringNullableFilter<"Address"> | string | null
    address_line_1?: StringNullableFilter<"Address"> | string | null
    address_line_2?: StringNullableFilter<"Address"> | string | null
    district?: StringNullableFilter<"Address"> | string | null
    sub_district?: StringNullableFilter<"Address"> | string | null
    province?: StringNullableFilter<"Address"> | string | null
    postal_code?: StringNullableFilter<"Address"> | string | null
    country?: StringFilter<"Address"> | string
    created_at?: DateTimeFilter<"Address"> | Date | string
    updated_at?: DateTimeFilter<"Address"> | Date | string
    employee?: XOR<EmployeeScalarRelationFilter, EmployeeWhereInput>
  }, "id">

  export type AddressOrderByWithAggregationInput = {
    id?: SortOrder
    employee_id?: SortOrder
    address_type?: SortOrderInput | SortOrder
    address_line_1?: SortOrderInput | SortOrder
    address_line_2?: SortOrderInput | SortOrder
    district?: SortOrderInput | SortOrder
    sub_district?: SortOrderInput | SortOrder
    province?: SortOrderInput | SortOrder
    postal_code?: SortOrderInput | SortOrder
    country?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: AddressCountOrderByAggregateInput
    _max?: AddressMaxOrderByAggregateInput
    _min?: AddressMinOrderByAggregateInput
  }

  export type AddressScalarWhereWithAggregatesInput = {
    AND?: AddressScalarWhereWithAggregatesInput | AddressScalarWhereWithAggregatesInput[]
    OR?: AddressScalarWhereWithAggregatesInput[]
    NOT?: AddressScalarWhereWithAggregatesInput | AddressScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Address"> | string
    employee_id?: StringWithAggregatesFilter<"Address"> | string
    address_type?: StringNullableWithAggregatesFilter<"Address"> | string | null
    address_line_1?: StringNullableWithAggregatesFilter<"Address"> | string | null
    address_line_2?: StringNullableWithAggregatesFilter<"Address"> | string | null
    district?: StringNullableWithAggregatesFilter<"Address"> | string | null
    sub_district?: StringNullableWithAggregatesFilter<"Address"> | string | null
    province?: StringNullableWithAggregatesFilter<"Address"> | string | null
    postal_code?: StringNullableWithAggregatesFilter<"Address"> | string | null
    country?: StringWithAggregatesFilter<"Address"> | string
    created_at?: DateTimeWithAggregatesFilter<"Address"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"Address"> | Date | string
  }

  export type EmergencyContactWhereInput = {
    AND?: EmergencyContactWhereInput | EmergencyContactWhereInput[]
    OR?: EmergencyContactWhereInput[]
    NOT?: EmergencyContactWhereInput | EmergencyContactWhereInput[]
    id?: StringFilter<"EmergencyContact"> | string
    employee_id?: StringFilter<"EmergencyContact"> | string
    name?: StringFilter<"EmergencyContact"> | string
    relationship?: StringFilter<"EmergencyContact"> | string
    phone?: StringFilter<"EmergencyContact"> | string
    email?: StringNullableFilter<"EmergencyContact"> | string | null
    address?: StringNullableFilter<"EmergencyContact"> | string | null
    is_primary?: BoolFilter<"EmergencyContact"> | boolean
    created_at?: DateTimeFilter<"EmergencyContact"> | Date | string
    updated_at?: DateTimeFilter<"EmergencyContact"> | Date | string
    employee?: XOR<EmployeeScalarRelationFilter, EmployeeWhereInput>
  }

  export type EmergencyContactOrderByWithRelationInput = {
    id?: SortOrder
    employee_id?: SortOrder
    name?: SortOrder
    relationship?: SortOrder
    phone?: SortOrder
    email?: SortOrderInput | SortOrder
    address?: SortOrderInput | SortOrder
    is_primary?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    employee?: EmployeeOrderByWithRelationInput
  }

  export type EmergencyContactWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: EmergencyContactWhereInput | EmergencyContactWhereInput[]
    OR?: EmergencyContactWhereInput[]
    NOT?: EmergencyContactWhereInput | EmergencyContactWhereInput[]
    employee_id?: StringFilter<"EmergencyContact"> | string
    name?: StringFilter<"EmergencyContact"> | string
    relationship?: StringFilter<"EmergencyContact"> | string
    phone?: StringFilter<"EmergencyContact"> | string
    email?: StringNullableFilter<"EmergencyContact"> | string | null
    address?: StringNullableFilter<"EmergencyContact"> | string | null
    is_primary?: BoolFilter<"EmergencyContact"> | boolean
    created_at?: DateTimeFilter<"EmergencyContact"> | Date | string
    updated_at?: DateTimeFilter<"EmergencyContact"> | Date | string
    employee?: XOR<EmployeeScalarRelationFilter, EmployeeWhereInput>
  }, "id">

  export type EmergencyContactOrderByWithAggregationInput = {
    id?: SortOrder
    employee_id?: SortOrder
    name?: SortOrder
    relationship?: SortOrder
    phone?: SortOrder
    email?: SortOrderInput | SortOrder
    address?: SortOrderInput | SortOrder
    is_primary?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: EmergencyContactCountOrderByAggregateInput
    _max?: EmergencyContactMaxOrderByAggregateInput
    _min?: EmergencyContactMinOrderByAggregateInput
  }

  export type EmergencyContactScalarWhereWithAggregatesInput = {
    AND?: EmergencyContactScalarWhereWithAggregatesInput | EmergencyContactScalarWhereWithAggregatesInput[]
    OR?: EmergencyContactScalarWhereWithAggregatesInput[]
    NOT?: EmergencyContactScalarWhereWithAggregatesInput | EmergencyContactScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"EmergencyContact"> | string
    employee_id?: StringWithAggregatesFilter<"EmergencyContact"> | string
    name?: StringWithAggregatesFilter<"EmergencyContact"> | string
    relationship?: StringWithAggregatesFilter<"EmergencyContact"> | string
    phone?: StringWithAggregatesFilter<"EmergencyContact"> | string
    email?: StringNullableWithAggregatesFilter<"EmergencyContact"> | string | null
    address?: StringNullableWithAggregatesFilter<"EmergencyContact"> | string | null
    is_primary?: BoolWithAggregatesFilter<"EmergencyContact"> | boolean
    created_at?: DateTimeWithAggregatesFilter<"EmergencyContact"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"EmergencyContact"> | Date | string
  }

  export type DependentWhereInput = {
    AND?: DependentWhereInput | DependentWhereInput[]
    OR?: DependentWhereInput[]
    NOT?: DependentWhereInput | DependentWhereInput[]
    id?: StringFilter<"Dependent"> | string
    employee_id?: StringFilter<"Dependent"> | string
    name?: StringFilter<"Dependent"> | string
    relationship_type?: StringFilter<"Dependent"> | string
    date_of_birth?: DateTimeNullableFilter<"Dependent"> | Date | string | null
    gender?: StringNullableFilter<"Dependent"> | string | null
    national_id?: StringNullableFilter<"Dependent"> | string | null
    is_tax_deductible?: BoolFilter<"Dependent"> | boolean
    created_at?: DateTimeFilter<"Dependent"> | Date | string
    updated_at?: DateTimeFilter<"Dependent"> | Date | string
    employee?: XOR<EmployeeScalarRelationFilter, EmployeeWhereInput>
  }

  export type DependentOrderByWithRelationInput = {
    id?: SortOrder
    employee_id?: SortOrder
    name?: SortOrder
    relationship_type?: SortOrder
    date_of_birth?: SortOrderInput | SortOrder
    gender?: SortOrderInput | SortOrder
    national_id?: SortOrderInput | SortOrder
    is_tax_deductible?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    employee?: EmployeeOrderByWithRelationInput
  }

  export type DependentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: DependentWhereInput | DependentWhereInput[]
    OR?: DependentWhereInput[]
    NOT?: DependentWhereInput | DependentWhereInput[]
    employee_id?: StringFilter<"Dependent"> | string
    name?: StringFilter<"Dependent"> | string
    relationship_type?: StringFilter<"Dependent"> | string
    date_of_birth?: DateTimeNullableFilter<"Dependent"> | Date | string | null
    gender?: StringNullableFilter<"Dependent"> | string | null
    national_id?: StringNullableFilter<"Dependent"> | string | null
    is_tax_deductible?: BoolFilter<"Dependent"> | boolean
    created_at?: DateTimeFilter<"Dependent"> | Date | string
    updated_at?: DateTimeFilter<"Dependent"> | Date | string
    employee?: XOR<EmployeeScalarRelationFilter, EmployeeWhereInput>
  }, "id">

  export type DependentOrderByWithAggregationInput = {
    id?: SortOrder
    employee_id?: SortOrder
    name?: SortOrder
    relationship_type?: SortOrder
    date_of_birth?: SortOrderInput | SortOrder
    gender?: SortOrderInput | SortOrder
    national_id?: SortOrderInput | SortOrder
    is_tax_deductible?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: DependentCountOrderByAggregateInput
    _max?: DependentMaxOrderByAggregateInput
    _min?: DependentMinOrderByAggregateInput
  }

  export type DependentScalarWhereWithAggregatesInput = {
    AND?: DependentScalarWhereWithAggregatesInput | DependentScalarWhereWithAggregatesInput[]
    OR?: DependentScalarWhereWithAggregatesInput[]
    NOT?: DependentScalarWhereWithAggregatesInput | DependentScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Dependent"> | string
    employee_id?: StringWithAggregatesFilter<"Dependent"> | string
    name?: StringWithAggregatesFilter<"Dependent"> | string
    relationship_type?: StringWithAggregatesFilter<"Dependent"> | string
    date_of_birth?: DateTimeNullableWithAggregatesFilter<"Dependent"> | Date | string | null
    gender?: StringNullableWithAggregatesFilter<"Dependent"> | string | null
    national_id?: StringNullableWithAggregatesFilter<"Dependent"> | string | null
    is_tax_deductible?: BoolWithAggregatesFilter<"Dependent"> | boolean
    created_at?: DateTimeWithAggregatesFilter<"Dependent"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"Dependent"> | Date | string
  }

  export type WorkPermitWhereInput = {
    AND?: WorkPermitWhereInput | WorkPermitWhereInput[]
    OR?: WorkPermitWhereInput[]
    NOT?: WorkPermitWhereInput | WorkPermitWhereInput[]
    id?: StringFilter<"WorkPermit"> | string
    employee_id?: StringFilter<"WorkPermit"> | string
    permit_type?: StringFilter<"WorkPermit"> | string
    permit_number?: StringFilter<"WorkPermit"> | string
    issue_date?: DateTimeFilter<"WorkPermit"> | Date | string
    expiry_date?: DateTimeFilter<"WorkPermit"> | Date | string
    issuing_country?: StringFilter<"WorkPermit"> | string
    status?: StringFilter<"WorkPermit"> | string
    created_at?: DateTimeFilter<"WorkPermit"> | Date | string
    updated_at?: DateTimeFilter<"WorkPermit"> | Date | string
    employee?: XOR<EmployeeScalarRelationFilter, EmployeeWhereInput>
  }

  export type WorkPermitOrderByWithRelationInput = {
    id?: SortOrder
    employee_id?: SortOrder
    permit_type?: SortOrder
    permit_number?: SortOrder
    issue_date?: SortOrder
    expiry_date?: SortOrder
    issuing_country?: SortOrder
    status?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    employee?: EmployeeOrderByWithRelationInput
  }

  export type WorkPermitWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: WorkPermitWhereInput | WorkPermitWhereInput[]
    OR?: WorkPermitWhereInput[]
    NOT?: WorkPermitWhereInput | WorkPermitWhereInput[]
    employee_id?: StringFilter<"WorkPermit"> | string
    permit_type?: StringFilter<"WorkPermit"> | string
    permit_number?: StringFilter<"WorkPermit"> | string
    issue_date?: DateTimeFilter<"WorkPermit"> | Date | string
    expiry_date?: DateTimeFilter<"WorkPermit"> | Date | string
    issuing_country?: StringFilter<"WorkPermit"> | string
    status?: StringFilter<"WorkPermit"> | string
    created_at?: DateTimeFilter<"WorkPermit"> | Date | string
    updated_at?: DateTimeFilter<"WorkPermit"> | Date | string
    employee?: XOR<EmployeeScalarRelationFilter, EmployeeWhereInput>
  }, "id">

  export type WorkPermitOrderByWithAggregationInput = {
    id?: SortOrder
    employee_id?: SortOrder
    permit_type?: SortOrder
    permit_number?: SortOrder
    issue_date?: SortOrder
    expiry_date?: SortOrder
    issuing_country?: SortOrder
    status?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: WorkPermitCountOrderByAggregateInput
    _max?: WorkPermitMaxOrderByAggregateInput
    _min?: WorkPermitMinOrderByAggregateInput
  }

  export type WorkPermitScalarWhereWithAggregatesInput = {
    AND?: WorkPermitScalarWhereWithAggregatesInput | WorkPermitScalarWhereWithAggregatesInput[]
    OR?: WorkPermitScalarWhereWithAggregatesInput[]
    NOT?: WorkPermitScalarWhereWithAggregatesInput | WorkPermitScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"WorkPermit"> | string
    employee_id?: StringWithAggregatesFilter<"WorkPermit"> | string
    permit_type?: StringWithAggregatesFilter<"WorkPermit"> | string
    permit_number?: StringWithAggregatesFilter<"WorkPermit"> | string
    issue_date?: DateTimeWithAggregatesFilter<"WorkPermit"> | Date | string
    expiry_date?: DateTimeWithAggregatesFilter<"WorkPermit"> | Date | string
    issuing_country?: StringWithAggregatesFilter<"WorkPermit"> | string
    status?: StringWithAggregatesFilter<"WorkPermit"> | string
    created_at?: DateTimeWithAggregatesFilter<"WorkPermit"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"WorkPermit"> | Date | string
  }

  export type AuditLogWhereInput = {
    AND?: AuditLogWhereInput | AuditLogWhereInput[]
    OR?: AuditLogWhereInput[]
    NOT?: AuditLogWhereInput | AuditLogWhereInput[]
    id?: StringFilter<"AuditLog"> | string
    employee_id?: StringFilter<"AuditLog"> | string
    action?: StringFilter<"AuditLog"> | string
    entity_type?: StringFilter<"AuditLog"> | string
    entity_id?: StringNullableFilter<"AuditLog"> | string | null
    changes?: JsonNullableFilter<"AuditLog">
    performed_by?: StringFilter<"AuditLog"> | string
    changed_at?: DateTimeFilter<"AuditLog"> | Date | string
    employee?: XOR<EmployeeScalarRelationFilter, EmployeeWhereInput>
  }

  export type AuditLogOrderByWithRelationInput = {
    id?: SortOrder
    employee_id?: SortOrder
    action?: SortOrder
    entity_type?: SortOrder
    entity_id?: SortOrderInput | SortOrder
    changes?: SortOrderInput | SortOrder
    performed_by?: SortOrder
    changed_at?: SortOrder
    employee?: EmployeeOrderByWithRelationInput
  }

  export type AuditLogWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AuditLogWhereInput | AuditLogWhereInput[]
    OR?: AuditLogWhereInput[]
    NOT?: AuditLogWhereInput | AuditLogWhereInput[]
    employee_id?: StringFilter<"AuditLog"> | string
    action?: StringFilter<"AuditLog"> | string
    entity_type?: StringFilter<"AuditLog"> | string
    entity_id?: StringNullableFilter<"AuditLog"> | string | null
    changes?: JsonNullableFilter<"AuditLog">
    performed_by?: StringFilter<"AuditLog"> | string
    changed_at?: DateTimeFilter<"AuditLog"> | Date | string
    employee?: XOR<EmployeeScalarRelationFilter, EmployeeWhereInput>
  }, "id">

  export type AuditLogOrderByWithAggregationInput = {
    id?: SortOrder
    employee_id?: SortOrder
    action?: SortOrder
    entity_type?: SortOrder
    entity_id?: SortOrderInput | SortOrder
    changes?: SortOrderInput | SortOrder
    performed_by?: SortOrder
    changed_at?: SortOrder
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
    action?: StringWithAggregatesFilter<"AuditLog"> | string
    entity_type?: StringWithAggregatesFilter<"AuditLog"> | string
    entity_id?: StringNullableWithAggregatesFilter<"AuditLog"> | string | null
    changes?: JsonNullableWithAggregatesFilter<"AuditLog">
    performed_by?: StringWithAggregatesFilter<"AuditLog"> | string
    changed_at?: DateTimeWithAggregatesFilter<"AuditLog"> | Date | string
  }

  export type EmployeeCreateInput = {
    id?: string
    employee_id: string
    first_name_en?: string | null
    first_name_th?: string | null
    last_name_en?: string | null
    last_name_th?: string | null
    nickname?: string | null
    gender?: string | null
    date_of_birth?: Date | string | null
    nationality?: string | null
    national_id?: string | null
    religion?: string | null
    blood_type?: string | null
    marital_status?: string | null
    tax_id?: string | null
    passport_number?: string | null
    photo_url?: string | null
    email?: string | null
    personal_email?: string | null
    business_phone?: string | null
    personal_mobile?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    employment?: EmploymentCreateNestedOneWithoutEmployeeInput
    addresses?: AddressCreateNestedManyWithoutEmployeeInput
    emergency_contacts?: EmergencyContactCreateNestedManyWithoutEmployeeInput
    dependents?: DependentCreateNestedManyWithoutEmployeeInput
    work_permits?: WorkPermitCreateNestedManyWithoutEmployeeInput
    audit_logs?: AuditLogCreateNestedManyWithoutEmployeeInput
  }

  export type EmployeeUncheckedCreateInput = {
    id?: string
    employee_id: string
    first_name_en?: string | null
    first_name_th?: string | null
    last_name_en?: string | null
    last_name_th?: string | null
    nickname?: string | null
    gender?: string | null
    date_of_birth?: Date | string | null
    nationality?: string | null
    national_id?: string | null
    religion?: string | null
    blood_type?: string | null
    marital_status?: string | null
    tax_id?: string | null
    passport_number?: string | null
    photo_url?: string | null
    email?: string | null
    personal_email?: string | null
    business_phone?: string | null
    personal_mobile?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    employment?: EmploymentUncheckedCreateNestedOneWithoutEmployeeInput
    addresses?: AddressUncheckedCreateNestedManyWithoutEmployeeInput
    emergency_contacts?: EmergencyContactUncheckedCreateNestedManyWithoutEmployeeInput
    dependents?: DependentUncheckedCreateNestedManyWithoutEmployeeInput
    work_permits?: WorkPermitUncheckedCreateNestedManyWithoutEmployeeInput
    audit_logs?: AuditLogUncheckedCreateNestedManyWithoutEmployeeInput
  }

  export type EmployeeUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    employee_id?: StringFieldUpdateOperationsInput | string
    first_name_en?: NullableStringFieldUpdateOperationsInput | string | null
    first_name_th?: NullableStringFieldUpdateOperationsInput | string | null
    last_name_en?: NullableStringFieldUpdateOperationsInput | string | null
    last_name_th?: NullableStringFieldUpdateOperationsInput | string | null
    nickname?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    date_of_birth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nationality?: NullableStringFieldUpdateOperationsInput | string | null
    national_id?: NullableStringFieldUpdateOperationsInput | string | null
    religion?: NullableStringFieldUpdateOperationsInput | string | null
    blood_type?: NullableStringFieldUpdateOperationsInput | string | null
    marital_status?: NullableStringFieldUpdateOperationsInput | string | null
    tax_id?: NullableStringFieldUpdateOperationsInput | string | null
    passport_number?: NullableStringFieldUpdateOperationsInput | string | null
    photo_url?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    personal_email?: NullableStringFieldUpdateOperationsInput | string | null
    business_phone?: NullableStringFieldUpdateOperationsInput | string | null
    personal_mobile?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    employment?: EmploymentUpdateOneWithoutEmployeeNestedInput
    addresses?: AddressUpdateManyWithoutEmployeeNestedInput
    emergency_contacts?: EmergencyContactUpdateManyWithoutEmployeeNestedInput
    dependents?: DependentUpdateManyWithoutEmployeeNestedInput
    work_permits?: WorkPermitUpdateManyWithoutEmployeeNestedInput
    audit_logs?: AuditLogUpdateManyWithoutEmployeeNestedInput
  }

  export type EmployeeUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    employee_id?: StringFieldUpdateOperationsInput | string
    first_name_en?: NullableStringFieldUpdateOperationsInput | string | null
    first_name_th?: NullableStringFieldUpdateOperationsInput | string | null
    last_name_en?: NullableStringFieldUpdateOperationsInput | string | null
    last_name_th?: NullableStringFieldUpdateOperationsInput | string | null
    nickname?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    date_of_birth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nationality?: NullableStringFieldUpdateOperationsInput | string | null
    national_id?: NullableStringFieldUpdateOperationsInput | string | null
    religion?: NullableStringFieldUpdateOperationsInput | string | null
    blood_type?: NullableStringFieldUpdateOperationsInput | string | null
    marital_status?: NullableStringFieldUpdateOperationsInput | string | null
    tax_id?: NullableStringFieldUpdateOperationsInput | string | null
    passport_number?: NullableStringFieldUpdateOperationsInput | string | null
    photo_url?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    personal_email?: NullableStringFieldUpdateOperationsInput | string | null
    business_phone?: NullableStringFieldUpdateOperationsInput | string | null
    personal_mobile?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    employment?: EmploymentUncheckedUpdateOneWithoutEmployeeNestedInput
    addresses?: AddressUncheckedUpdateManyWithoutEmployeeNestedInput
    emergency_contacts?: EmergencyContactUncheckedUpdateManyWithoutEmployeeNestedInput
    dependents?: DependentUncheckedUpdateManyWithoutEmployeeNestedInput
    work_permits?: WorkPermitUncheckedUpdateManyWithoutEmployeeNestedInput
    audit_logs?: AuditLogUncheckedUpdateManyWithoutEmployeeNestedInput
  }

  export type EmployeeCreateManyInput = {
    id?: string
    employee_id: string
    first_name_en?: string | null
    first_name_th?: string | null
    last_name_en?: string | null
    last_name_th?: string | null
    nickname?: string | null
    gender?: string | null
    date_of_birth?: Date | string | null
    nationality?: string | null
    national_id?: string | null
    religion?: string | null
    blood_type?: string | null
    marital_status?: string | null
    tax_id?: string | null
    passport_number?: string | null
    photo_url?: string | null
    email?: string | null
    personal_email?: string | null
    business_phone?: string | null
    personal_mobile?: string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type EmployeeUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    employee_id?: StringFieldUpdateOperationsInput | string
    first_name_en?: NullableStringFieldUpdateOperationsInput | string | null
    first_name_th?: NullableStringFieldUpdateOperationsInput | string | null
    last_name_en?: NullableStringFieldUpdateOperationsInput | string | null
    last_name_th?: NullableStringFieldUpdateOperationsInput | string | null
    nickname?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    date_of_birth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nationality?: NullableStringFieldUpdateOperationsInput | string | null
    national_id?: NullableStringFieldUpdateOperationsInput | string | null
    religion?: NullableStringFieldUpdateOperationsInput | string | null
    blood_type?: NullableStringFieldUpdateOperationsInput | string | null
    marital_status?: NullableStringFieldUpdateOperationsInput | string | null
    tax_id?: NullableStringFieldUpdateOperationsInput | string | null
    passport_number?: NullableStringFieldUpdateOperationsInput | string | null
    photo_url?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    personal_email?: NullableStringFieldUpdateOperationsInput | string | null
    business_phone?: NullableStringFieldUpdateOperationsInput | string | null
    personal_mobile?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmployeeUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    employee_id?: StringFieldUpdateOperationsInput | string
    first_name_en?: NullableStringFieldUpdateOperationsInput | string | null
    first_name_th?: NullableStringFieldUpdateOperationsInput | string | null
    last_name_en?: NullableStringFieldUpdateOperationsInput | string | null
    last_name_th?: NullableStringFieldUpdateOperationsInput | string | null
    nickname?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    date_of_birth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nationality?: NullableStringFieldUpdateOperationsInput | string | null
    national_id?: NullableStringFieldUpdateOperationsInput | string | null
    religion?: NullableStringFieldUpdateOperationsInput | string | null
    blood_type?: NullableStringFieldUpdateOperationsInput | string | null
    marital_status?: NullableStringFieldUpdateOperationsInput | string | null
    tax_id?: NullableStringFieldUpdateOperationsInput | string | null
    passport_number?: NullableStringFieldUpdateOperationsInput | string | null
    photo_url?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    personal_email?: NullableStringFieldUpdateOperationsInput | string | null
    business_phone?: NullableStringFieldUpdateOperationsInput | string | null
    personal_mobile?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmploymentCreateInput = {
    id?: string
    hire_date?: Date | string | null
    status?: string
    probation_end_date?: Date | string | null
    termination_date?: Date | string | null
    job_title?: string | null
    position_id?: string | null
    department?: string | null
    division?: string | null
    location?: string | null
    grade?: string | null
    level?: string | null
    manager_id?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    employee: EmployeeCreateNestedOneWithoutEmploymentInput
  }

  export type EmploymentUncheckedCreateInput = {
    id?: string
    employee_id: string
    hire_date?: Date | string | null
    status?: string
    probation_end_date?: Date | string | null
    termination_date?: Date | string | null
    job_title?: string | null
    position_id?: string | null
    department?: string | null
    division?: string | null
    location?: string | null
    grade?: string | null
    level?: string | null
    manager_id?: string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type EmploymentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    hire_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    probation_end_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    termination_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    job_title?: NullableStringFieldUpdateOperationsInput | string | null
    position_id?: NullableStringFieldUpdateOperationsInput | string | null
    department?: NullableStringFieldUpdateOperationsInput | string | null
    division?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    grade?: NullableStringFieldUpdateOperationsInput | string | null
    level?: NullableStringFieldUpdateOperationsInput | string | null
    manager_id?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    employee?: EmployeeUpdateOneRequiredWithoutEmploymentNestedInput
  }

  export type EmploymentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    employee_id?: StringFieldUpdateOperationsInput | string
    hire_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    probation_end_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    termination_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    job_title?: NullableStringFieldUpdateOperationsInput | string | null
    position_id?: NullableStringFieldUpdateOperationsInput | string | null
    department?: NullableStringFieldUpdateOperationsInput | string | null
    division?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    grade?: NullableStringFieldUpdateOperationsInput | string | null
    level?: NullableStringFieldUpdateOperationsInput | string | null
    manager_id?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmploymentCreateManyInput = {
    id?: string
    employee_id: string
    hire_date?: Date | string | null
    status?: string
    probation_end_date?: Date | string | null
    termination_date?: Date | string | null
    job_title?: string | null
    position_id?: string | null
    department?: string | null
    division?: string | null
    location?: string | null
    grade?: string | null
    level?: string | null
    manager_id?: string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type EmploymentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    hire_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    probation_end_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    termination_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    job_title?: NullableStringFieldUpdateOperationsInput | string | null
    position_id?: NullableStringFieldUpdateOperationsInput | string | null
    department?: NullableStringFieldUpdateOperationsInput | string | null
    division?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    grade?: NullableStringFieldUpdateOperationsInput | string | null
    level?: NullableStringFieldUpdateOperationsInput | string | null
    manager_id?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmploymentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    employee_id?: StringFieldUpdateOperationsInput | string
    hire_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    probation_end_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    termination_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    job_title?: NullableStringFieldUpdateOperationsInput | string | null
    position_id?: NullableStringFieldUpdateOperationsInput | string | null
    department?: NullableStringFieldUpdateOperationsInput | string | null
    division?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    grade?: NullableStringFieldUpdateOperationsInput | string | null
    level?: NullableStringFieldUpdateOperationsInput | string | null
    manager_id?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AddressCreateInput = {
    id?: string
    address_type?: string | null
    address_line_1?: string | null
    address_line_2?: string | null
    district?: string | null
    sub_district?: string | null
    province?: string | null
    postal_code?: string | null
    country?: string
    created_at?: Date | string
    updated_at?: Date | string
    employee: EmployeeCreateNestedOneWithoutAddressesInput
  }

  export type AddressUncheckedCreateInput = {
    id?: string
    employee_id: string
    address_type?: string | null
    address_line_1?: string | null
    address_line_2?: string | null
    district?: string | null
    sub_district?: string | null
    province?: string | null
    postal_code?: string | null
    country?: string
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type AddressUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    address_type?: NullableStringFieldUpdateOperationsInput | string | null
    address_line_1?: NullableStringFieldUpdateOperationsInput | string | null
    address_line_2?: NullableStringFieldUpdateOperationsInput | string | null
    district?: NullableStringFieldUpdateOperationsInput | string | null
    sub_district?: NullableStringFieldUpdateOperationsInput | string | null
    province?: NullableStringFieldUpdateOperationsInput | string | null
    postal_code?: NullableStringFieldUpdateOperationsInput | string | null
    country?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    employee?: EmployeeUpdateOneRequiredWithoutAddressesNestedInput
  }

  export type AddressUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    employee_id?: StringFieldUpdateOperationsInput | string
    address_type?: NullableStringFieldUpdateOperationsInput | string | null
    address_line_1?: NullableStringFieldUpdateOperationsInput | string | null
    address_line_2?: NullableStringFieldUpdateOperationsInput | string | null
    district?: NullableStringFieldUpdateOperationsInput | string | null
    sub_district?: NullableStringFieldUpdateOperationsInput | string | null
    province?: NullableStringFieldUpdateOperationsInput | string | null
    postal_code?: NullableStringFieldUpdateOperationsInput | string | null
    country?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AddressCreateManyInput = {
    id?: string
    employee_id: string
    address_type?: string | null
    address_line_1?: string | null
    address_line_2?: string | null
    district?: string | null
    sub_district?: string | null
    province?: string | null
    postal_code?: string | null
    country?: string
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type AddressUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    address_type?: NullableStringFieldUpdateOperationsInput | string | null
    address_line_1?: NullableStringFieldUpdateOperationsInput | string | null
    address_line_2?: NullableStringFieldUpdateOperationsInput | string | null
    district?: NullableStringFieldUpdateOperationsInput | string | null
    sub_district?: NullableStringFieldUpdateOperationsInput | string | null
    province?: NullableStringFieldUpdateOperationsInput | string | null
    postal_code?: NullableStringFieldUpdateOperationsInput | string | null
    country?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AddressUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    employee_id?: StringFieldUpdateOperationsInput | string
    address_type?: NullableStringFieldUpdateOperationsInput | string | null
    address_line_1?: NullableStringFieldUpdateOperationsInput | string | null
    address_line_2?: NullableStringFieldUpdateOperationsInput | string | null
    district?: NullableStringFieldUpdateOperationsInput | string | null
    sub_district?: NullableStringFieldUpdateOperationsInput | string | null
    province?: NullableStringFieldUpdateOperationsInput | string | null
    postal_code?: NullableStringFieldUpdateOperationsInput | string | null
    country?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmergencyContactCreateInput = {
    id?: string
    name: string
    relationship: string
    phone: string
    email?: string | null
    address?: string | null
    is_primary?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    employee: EmployeeCreateNestedOneWithoutEmergency_contactsInput
  }

  export type EmergencyContactUncheckedCreateInput = {
    id?: string
    employee_id: string
    name: string
    relationship: string
    phone: string
    email?: string | null
    address?: string | null
    is_primary?: boolean
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type EmergencyContactUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    relationship?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    is_primary?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    employee?: EmployeeUpdateOneRequiredWithoutEmergency_contactsNestedInput
  }

  export type EmergencyContactUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    employee_id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    relationship?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    is_primary?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmergencyContactCreateManyInput = {
    id?: string
    employee_id: string
    name: string
    relationship: string
    phone: string
    email?: string | null
    address?: string | null
    is_primary?: boolean
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type EmergencyContactUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    relationship?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    is_primary?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmergencyContactUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    employee_id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    relationship?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    is_primary?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DependentCreateInput = {
    id?: string
    name: string
    relationship_type: string
    date_of_birth?: Date | string | null
    gender?: string | null
    national_id?: string | null
    is_tax_deductible?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    employee: EmployeeCreateNestedOneWithoutDependentsInput
  }

  export type DependentUncheckedCreateInput = {
    id?: string
    employee_id: string
    name: string
    relationship_type: string
    date_of_birth?: Date | string | null
    gender?: string | null
    national_id?: string | null
    is_tax_deductible?: boolean
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type DependentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    relationship_type?: StringFieldUpdateOperationsInput | string
    date_of_birth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    national_id?: NullableStringFieldUpdateOperationsInput | string | null
    is_tax_deductible?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    employee?: EmployeeUpdateOneRequiredWithoutDependentsNestedInput
  }

  export type DependentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    employee_id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    relationship_type?: StringFieldUpdateOperationsInput | string
    date_of_birth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    national_id?: NullableStringFieldUpdateOperationsInput | string | null
    is_tax_deductible?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DependentCreateManyInput = {
    id?: string
    employee_id: string
    name: string
    relationship_type: string
    date_of_birth?: Date | string | null
    gender?: string | null
    national_id?: string | null
    is_tax_deductible?: boolean
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type DependentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    relationship_type?: StringFieldUpdateOperationsInput | string
    date_of_birth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    national_id?: NullableStringFieldUpdateOperationsInput | string | null
    is_tax_deductible?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DependentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    employee_id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    relationship_type?: StringFieldUpdateOperationsInput | string
    date_of_birth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    national_id?: NullableStringFieldUpdateOperationsInput | string | null
    is_tax_deductible?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WorkPermitCreateInput = {
    id?: string
    permit_type: string
    permit_number: string
    issue_date: Date | string
    expiry_date: Date | string
    issuing_country: string
    status?: string
    created_at?: Date | string
    updated_at?: Date | string
    employee: EmployeeCreateNestedOneWithoutWork_permitsInput
  }

  export type WorkPermitUncheckedCreateInput = {
    id?: string
    employee_id: string
    permit_type: string
    permit_number: string
    issue_date: Date | string
    expiry_date: Date | string
    issuing_country: string
    status?: string
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type WorkPermitUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    permit_type?: StringFieldUpdateOperationsInput | string
    permit_number?: StringFieldUpdateOperationsInput | string
    issue_date?: DateTimeFieldUpdateOperationsInput | Date | string
    expiry_date?: DateTimeFieldUpdateOperationsInput | Date | string
    issuing_country?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    employee?: EmployeeUpdateOneRequiredWithoutWork_permitsNestedInput
  }

  export type WorkPermitUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    employee_id?: StringFieldUpdateOperationsInput | string
    permit_type?: StringFieldUpdateOperationsInput | string
    permit_number?: StringFieldUpdateOperationsInput | string
    issue_date?: DateTimeFieldUpdateOperationsInput | Date | string
    expiry_date?: DateTimeFieldUpdateOperationsInput | Date | string
    issuing_country?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WorkPermitCreateManyInput = {
    id?: string
    employee_id: string
    permit_type: string
    permit_number: string
    issue_date: Date | string
    expiry_date: Date | string
    issuing_country: string
    status?: string
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type WorkPermitUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    permit_type?: StringFieldUpdateOperationsInput | string
    permit_number?: StringFieldUpdateOperationsInput | string
    issue_date?: DateTimeFieldUpdateOperationsInput | Date | string
    expiry_date?: DateTimeFieldUpdateOperationsInput | Date | string
    issuing_country?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WorkPermitUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    employee_id?: StringFieldUpdateOperationsInput | string
    permit_type?: StringFieldUpdateOperationsInput | string
    permit_number?: StringFieldUpdateOperationsInput | string
    issue_date?: DateTimeFieldUpdateOperationsInput | Date | string
    expiry_date?: DateTimeFieldUpdateOperationsInput | Date | string
    issuing_country?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogCreateInput = {
    id?: string
    action: string
    entity_type: string
    entity_id?: string | null
    changes?: NullableJsonNullValueInput | InputJsonValue
    performed_by: string
    changed_at?: Date | string
    employee: EmployeeCreateNestedOneWithoutAudit_logsInput
  }

  export type AuditLogUncheckedCreateInput = {
    id?: string
    employee_id: string
    action: string
    entity_type: string
    entity_id?: string | null
    changes?: NullableJsonNullValueInput | InputJsonValue
    performed_by: string
    changed_at?: Date | string
  }

  export type AuditLogUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    entity_type?: StringFieldUpdateOperationsInput | string
    entity_id?: NullableStringFieldUpdateOperationsInput | string | null
    changes?: NullableJsonNullValueInput | InputJsonValue
    performed_by?: StringFieldUpdateOperationsInput | string
    changed_at?: DateTimeFieldUpdateOperationsInput | Date | string
    employee?: EmployeeUpdateOneRequiredWithoutAudit_logsNestedInput
  }

  export type AuditLogUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    employee_id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    entity_type?: StringFieldUpdateOperationsInput | string
    entity_id?: NullableStringFieldUpdateOperationsInput | string | null
    changes?: NullableJsonNullValueInput | InputJsonValue
    performed_by?: StringFieldUpdateOperationsInput | string
    changed_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogCreateManyInput = {
    id?: string
    employee_id: string
    action: string
    entity_type: string
    entity_id?: string | null
    changes?: NullableJsonNullValueInput | InputJsonValue
    performed_by: string
    changed_at?: Date | string
  }

  export type AuditLogUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    entity_type?: StringFieldUpdateOperationsInput | string
    entity_id?: NullableStringFieldUpdateOperationsInput | string | null
    changes?: NullableJsonNullValueInput | InputJsonValue
    performed_by?: StringFieldUpdateOperationsInput | string
    changed_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    employee_id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    entity_type?: StringFieldUpdateOperationsInput | string
    entity_id?: NullableStringFieldUpdateOperationsInput | string | null
    changes?: NullableJsonNullValueInput | InputJsonValue
    performed_by?: StringFieldUpdateOperationsInput | string
    changed_at?: DateTimeFieldUpdateOperationsInput | Date | string
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

  export type EmploymentNullableScalarRelationFilter = {
    is?: EmploymentWhereInput | null
    isNot?: EmploymentWhereInput | null
  }

  export type AddressListRelationFilter = {
    every?: AddressWhereInput
    some?: AddressWhereInput
    none?: AddressWhereInput
  }

  export type EmergencyContactListRelationFilter = {
    every?: EmergencyContactWhereInput
    some?: EmergencyContactWhereInput
    none?: EmergencyContactWhereInput
  }

  export type DependentListRelationFilter = {
    every?: DependentWhereInput
    some?: DependentWhereInput
    none?: DependentWhereInput
  }

  export type WorkPermitListRelationFilter = {
    every?: WorkPermitWhereInput
    some?: WorkPermitWhereInput
    none?: WorkPermitWhereInput
  }

  export type AuditLogListRelationFilter = {
    every?: AuditLogWhereInput
    some?: AuditLogWhereInput
    none?: AuditLogWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type AddressOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type EmergencyContactOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type DependentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type WorkPermitOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AuditLogOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type EmployeeCountOrderByAggregateInput = {
    id?: SortOrder
    employee_id?: SortOrder
    first_name_en?: SortOrder
    first_name_th?: SortOrder
    last_name_en?: SortOrder
    last_name_th?: SortOrder
    nickname?: SortOrder
    gender?: SortOrder
    date_of_birth?: SortOrder
    nationality?: SortOrder
    national_id?: SortOrder
    religion?: SortOrder
    blood_type?: SortOrder
    marital_status?: SortOrder
    tax_id?: SortOrder
    passport_number?: SortOrder
    photo_url?: SortOrder
    email?: SortOrder
    personal_email?: SortOrder
    business_phone?: SortOrder
    personal_mobile?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type EmployeeMaxOrderByAggregateInput = {
    id?: SortOrder
    employee_id?: SortOrder
    first_name_en?: SortOrder
    first_name_th?: SortOrder
    last_name_en?: SortOrder
    last_name_th?: SortOrder
    nickname?: SortOrder
    gender?: SortOrder
    date_of_birth?: SortOrder
    nationality?: SortOrder
    national_id?: SortOrder
    religion?: SortOrder
    blood_type?: SortOrder
    marital_status?: SortOrder
    tax_id?: SortOrder
    passport_number?: SortOrder
    photo_url?: SortOrder
    email?: SortOrder
    personal_email?: SortOrder
    business_phone?: SortOrder
    personal_mobile?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type EmployeeMinOrderByAggregateInput = {
    id?: SortOrder
    employee_id?: SortOrder
    first_name_en?: SortOrder
    first_name_th?: SortOrder
    last_name_en?: SortOrder
    last_name_th?: SortOrder
    nickname?: SortOrder
    gender?: SortOrder
    date_of_birth?: SortOrder
    nationality?: SortOrder
    national_id?: SortOrder
    religion?: SortOrder
    blood_type?: SortOrder
    marital_status?: SortOrder
    tax_id?: SortOrder
    passport_number?: SortOrder
    photo_url?: SortOrder
    email?: SortOrder
    personal_email?: SortOrder
    business_phone?: SortOrder
    personal_mobile?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
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

  export type EmployeeScalarRelationFilter = {
    is?: EmployeeWhereInput
    isNot?: EmployeeWhereInput
  }

  export type EmploymentCountOrderByAggregateInput = {
    id?: SortOrder
    employee_id?: SortOrder
    hire_date?: SortOrder
    status?: SortOrder
    probation_end_date?: SortOrder
    termination_date?: SortOrder
    job_title?: SortOrder
    position_id?: SortOrder
    department?: SortOrder
    division?: SortOrder
    location?: SortOrder
    grade?: SortOrder
    level?: SortOrder
    manager_id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type EmploymentMaxOrderByAggregateInput = {
    id?: SortOrder
    employee_id?: SortOrder
    hire_date?: SortOrder
    status?: SortOrder
    probation_end_date?: SortOrder
    termination_date?: SortOrder
    job_title?: SortOrder
    position_id?: SortOrder
    department?: SortOrder
    division?: SortOrder
    location?: SortOrder
    grade?: SortOrder
    level?: SortOrder
    manager_id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type EmploymentMinOrderByAggregateInput = {
    id?: SortOrder
    employee_id?: SortOrder
    hire_date?: SortOrder
    status?: SortOrder
    probation_end_date?: SortOrder
    termination_date?: SortOrder
    job_title?: SortOrder
    position_id?: SortOrder
    department?: SortOrder
    division?: SortOrder
    location?: SortOrder
    grade?: SortOrder
    level?: SortOrder
    manager_id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type AddressCountOrderByAggregateInput = {
    id?: SortOrder
    employee_id?: SortOrder
    address_type?: SortOrder
    address_line_1?: SortOrder
    address_line_2?: SortOrder
    district?: SortOrder
    sub_district?: SortOrder
    province?: SortOrder
    postal_code?: SortOrder
    country?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type AddressMaxOrderByAggregateInput = {
    id?: SortOrder
    employee_id?: SortOrder
    address_type?: SortOrder
    address_line_1?: SortOrder
    address_line_2?: SortOrder
    district?: SortOrder
    sub_district?: SortOrder
    province?: SortOrder
    postal_code?: SortOrder
    country?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type AddressMinOrderByAggregateInput = {
    id?: SortOrder
    employee_id?: SortOrder
    address_type?: SortOrder
    address_line_1?: SortOrder
    address_line_2?: SortOrder
    district?: SortOrder
    sub_district?: SortOrder
    province?: SortOrder
    postal_code?: SortOrder
    country?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type EmergencyContactCountOrderByAggregateInput = {
    id?: SortOrder
    employee_id?: SortOrder
    name?: SortOrder
    relationship?: SortOrder
    phone?: SortOrder
    email?: SortOrder
    address?: SortOrder
    is_primary?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type EmergencyContactMaxOrderByAggregateInput = {
    id?: SortOrder
    employee_id?: SortOrder
    name?: SortOrder
    relationship?: SortOrder
    phone?: SortOrder
    email?: SortOrder
    address?: SortOrder
    is_primary?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type EmergencyContactMinOrderByAggregateInput = {
    id?: SortOrder
    employee_id?: SortOrder
    name?: SortOrder
    relationship?: SortOrder
    phone?: SortOrder
    email?: SortOrder
    address?: SortOrder
    is_primary?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type DependentCountOrderByAggregateInput = {
    id?: SortOrder
    employee_id?: SortOrder
    name?: SortOrder
    relationship_type?: SortOrder
    date_of_birth?: SortOrder
    gender?: SortOrder
    national_id?: SortOrder
    is_tax_deductible?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type DependentMaxOrderByAggregateInput = {
    id?: SortOrder
    employee_id?: SortOrder
    name?: SortOrder
    relationship_type?: SortOrder
    date_of_birth?: SortOrder
    gender?: SortOrder
    national_id?: SortOrder
    is_tax_deductible?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type DependentMinOrderByAggregateInput = {
    id?: SortOrder
    employee_id?: SortOrder
    name?: SortOrder
    relationship_type?: SortOrder
    date_of_birth?: SortOrder
    gender?: SortOrder
    national_id?: SortOrder
    is_tax_deductible?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type WorkPermitCountOrderByAggregateInput = {
    id?: SortOrder
    employee_id?: SortOrder
    permit_type?: SortOrder
    permit_number?: SortOrder
    issue_date?: SortOrder
    expiry_date?: SortOrder
    issuing_country?: SortOrder
    status?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type WorkPermitMaxOrderByAggregateInput = {
    id?: SortOrder
    employee_id?: SortOrder
    permit_type?: SortOrder
    permit_number?: SortOrder
    issue_date?: SortOrder
    expiry_date?: SortOrder
    issuing_country?: SortOrder
    status?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type WorkPermitMinOrderByAggregateInput = {
    id?: SortOrder
    employee_id?: SortOrder
    permit_type?: SortOrder
    permit_number?: SortOrder
    issue_date?: SortOrder
    expiry_date?: SortOrder
    issuing_country?: SortOrder
    status?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
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

  export type AuditLogCountOrderByAggregateInput = {
    id?: SortOrder
    employee_id?: SortOrder
    action?: SortOrder
    entity_type?: SortOrder
    entity_id?: SortOrder
    changes?: SortOrder
    performed_by?: SortOrder
    changed_at?: SortOrder
  }

  export type AuditLogMaxOrderByAggregateInput = {
    id?: SortOrder
    employee_id?: SortOrder
    action?: SortOrder
    entity_type?: SortOrder
    entity_id?: SortOrder
    performed_by?: SortOrder
    changed_at?: SortOrder
  }

  export type AuditLogMinOrderByAggregateInput = {
    id?: SortOrder
    employee_id?: SortOrder
    action?: SortOrder
    entity_type?: SortOrder
    entity_id?: SortOrder
    performed_by?: SortOrder
    changed_at?: SortOrder
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

  export type EmploymentCreateNestedOneWithoutEmployeeInput = {
    create?: XOR<EmploymentCreateWithoutEmployeeInput, EmploymentUncheckedCreateWithoutEmployeeInput>
    connectOrCreate?: EmploymentCreateOrConnectWithoutEmployeeInput
    connect?: EmploymentWhereUniqueInput
  }

  export type AddressCreateNestedManyWithoutEmployeeInput = {
    create?: XOR<AddressCreateWithoutEmployeeInput, AddressUncheckedCreateWithoutEmployeeInput> | AddressCreateWithoutEmployeeInput[] | AddressUncheckedCreateWithoutEmployeeInput[]
    connectOrCreate?: AddressCreateOrConnectWithoutEmployeeInput | AddressCreateOrConnectWithoutEmployeeInput[]
    createMany?: AddressCreateManyEmployeeInputEnvelope
    connect?: AddressWhereUniqueInput | AddressWhereUniqueInput[]
  }

  export type EmergencyContactCreateNestedManyWithoutEmployeeInput = {
    create?: XOR<EmergencyContactCreateWithoutEmployeeInput, EmergencyContactUncheckedCreateWithoutEmployeeInput> | EmergencyContactCreateWithoutEmployeeInput[] | EmergencyContactUncheckedCreateWithoutEmployeeInput[]
    connectOrCreate?: EmergencyContactCreateOrConnectWithoutEmployeeInput | EmergencyContactCreateOrConnectWithoutEmployeeInput[]
    createMany?: EmergencyContactCreateManyEmployeeInputEnvelope
    connect?: EmergencyContactWhereUniqueInput | EmergencyContactWhereUniqueInput[]
  }

  export type DependentCreateNestedManyWithoutEmployeeInput = {
    create?: XOR<DependentCreateWithoutEmployeeInput, DependentUncheckedCreateWithoutEmployeeInput> | DependentCreateWithoutEmployeeInput[] | DependentUncheckedCreateWithoutEmployeeInput[]
    connectOrCreate?: DependentCreateOrConnectWithoutEmployeeInput | DependentCreateOrConnectWithoutEmployeeInput[]
    createMany?: DependentCreateManyEmployeeInputEnvelope
    connect?: DependentWhereUniqueInput | DependentWhereUniqueInput[]
  }

  export type WorkPermitCreateNestedManyWithoutEmployeeInput = {
    create?: XOR<WorkPermitCreateWithoutEmployeeInput, WorkPermitUncheckedCreateWithoutEmployeeInput> | WorkPermitCreateWithoutEmployeeInput[] | WorkPermitUncheckedCreateWithoutEmployeeInput[]
    connectOrCreate?: WorkPermitCreateOrConnectWithoutEmployeeInput | WorkPermitCreateOrConnectWithoutEmployeeInput[]
    createMany?: WorkPermitCreateManyEmployeeInputEnvelope
    connect?: WorkPermitWhereUniqueInput | WorkPermitWhereUniqueInput[]
  }

  export type AuditLogCreateNestedManyWithoutEmployeeInput = {
    create?: XOR<AuditLogCreateWithoutEmployeeInput, AuditLogUncheckedCreateWithoutEmployeeInput> | AuditLogCreateWithoutEmployeeInput[] | AuditLogUncheckedCreateWithoutEmployeeInput[]
    connectOrCreate?: AuditLogCreateOrConnectWithoutEmployeeInput | AuditLogCreateOrConnectWithoutEmployeeInput[]
    createMany?: AuditLogCreateManyEmployeeInputEnvelope
    connect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
  }

  export type EmploymentUncheckedCreateNestedOneWithoutEmployeeInput = {
    create?: XOR<EmploymentCreateWithoutEmployeeInput, EmploymentUncheckedCreateWithoutEmployeeInput>
    connectOrCreate?: EmploymentCreateOrConnectWithoutEmployeeInput
    connect?: EmploymentWhereUniqueInput
  }

  export type AddressUncheckedCreateNestedManyWithoutEmployeeInput = {
    create?: XOR<AddressCreateWithoutEmployeeInput, AddressUncheckedCreateWithoutEmployeeInput> | AddressCreateWithoutEmployeeInput[] | AddressUncheckedCreateWithoutEmployeeInput[]
    connectOrCreate?: AddressCreateOrConnectWithoutEmployeeInput | AddressCreateOrConnectWithoutEmployeeInput[]
    createMany?: AddressCreateManyEmployeeInputEnvelope
    connect?: AddressWhereUniqueInput | AddressWhereUniqueInput[]
  }

  export type EmergencyContactUncheckedCreateNestedManyWithoutEmployeeInput = {
    create?: XOR<EmergencyContactCreateWithoutEmployeeInput, EmergencyContactUncheckedCreateWithoutEmployeeInput> | EmergencyContactCreateWithoutEmployeeInput[] | EmergencyContactUncheckedCreateWithoutEmployeeInput[]
    connectOrCreate?: EmergencyContactCreateOrConnectWithoutEmployeeInput | EmergencyContactCreateOrConnectWithoutEmployeeInput[]
    createMany?: EmergencyContactCreateManyEmployeeInputEnvelope
    connect?: EmergencyContactWhereUniqueInput | EmergencyContactWhereUniqueInput[]
  }

  export type DependentUncheckedCreateNestedManyWithoutEmployeeInput = {
    create?: XOR<DependentCreateWithoutEmployeeInput, DependentUncheckedCreateWithoutEmployeeInput> | DependentCreateWithoutEmployeeInput[] | DependentUncheckedCreateWithoutEmployeeInput[]
    connectOrCreate?: DependentCreateOrConnectWithoutEmployeeInput | DependentCreateOrConnectWithoutEmployeeInput[]
    createMany?: DependentCreateManyEmployeeInputEnvelope
    connect?: DependentWhereUniqueInput | DependentWhereUniqueInput[]
  }

  export type WorkPermitUncheckedCreateNestedManyWithoutEmployeeInput = {
    create?: XOR<WorkPermitCreateWithoutEmployeeInput, WorkPermitUncheckedCreateWithoutEmployeeInput> | WorkPermitCreateWithoutEmployeeInput[] | WorkPermitUncheckedCreateWithoutEmployeeInput[]
    connectOrCreate?: WorkPermitCreateOrConnectWithoutEmployeeInput | WorkPermitCreateOrConnectWithoutEmployeeInput[]
    createMany?: WorkPermitCreateManyEmployeeInputEnvelope
    connect?: WorkPermitWhereUniqueInput | WorkPermitWhereUniqueInput[]
  }

  export type AuditLogUncheckedCreateNestedManyWithoutEmployeeInput = {
    create?: XOR<AuditLogCreateWithoutEmployeeInput, AuditLogUncheckedCreateWithoutEmployeeInput> | AuditLogCreateWithoutEmployeeInput[] | AuditLogUncheckedCreateWithoutEmployeeInput[]
    connectOrCreate?: AuditLogCreateOrConnectWithoutEmployeeInput | AuditLogCreateOrConnectWithoutEmployeeInput[]
    createMany?: AuditLogCreateManyEmployeeInputEnvelope
    connect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type EmploymentUpdateOneWithoutEmployeeNestedInput = {
    create?: XOR<EmploymentCreateWithoutEmployeeInput, EmploymentUncheckedCreateWithoutEmployeeInput>
    connectOrCreate?: EmploymentCreateOrConnectWithoutEmployeeInput
    upsert?: EmploymentUpsertWithoutEmployeeInput
    disconnect?: EmploymentWhereInput | boolean
    delete?: EmploymentWhereInput | boolean
    connect?: EmploymentWhereUniqueInput
    update?: XOR<XOR<EmploymentUpdateToOneWithWhereWithoutEmployeeInput, EmploymentUpdateWithoutEmployeeInput>, EmploymentUncheckedUpdateWithoutEmployeeInput>
  }

  export type AddressUpdateManyWithoutEmployeeNestedInput = {
    create?: XOR<AddressCreateWithoutEmployeeInput, AddressUncheckedCreateWithoutEmployeeInput> | AddressCreateWithoutEmployeeInput[] | AddressUncheckedCreateWithoutEmployeeInput[]
    connectOrCreate?: AddressCreateOrConnectWithoutEmployeeInput | AddressCreateOrConnectWithoutEmployeeInput[]
    upsert?: AddressUpsertWithWhereUniqueWithoutEmployeeInput | AddressUpsertWithWhereUniqueWithoutEmployeeInput[]
    createMany?: AddressCreateManyEmployeeInputEnvelope
    set?: AddressWhereUniqueInput | AddressWhereUniqueInput[]
    disconnect?: AddressWhereUniqueInput | AddressWhereUniqueInput[]
    delete?: AddressWhereUniqueInput | AddressWhereUniqueInput[]
    connect?: AddressWhereUniqueInput | AddressWhereUniqueInput[]
    update?: AddressUpdateWithWhereUniqueWithoutEmployeeInput | AddressUpdateWithWhereUniqueWithoutEmployeeInput[]
    updateMany?: AddressUpdateManyWithWhereWithoutEmployeeInput | AddressUpdateManyWithWhereWithoutEmployeeInput[]
    deleteMany?: AddressScalarWhereInput | AddressScalarWhereInput[]
  }

  export type EmergencyContactUpdateManyWithoutEmployeeNestedInput = {
    create?: XOR<EmergencyContactCreateWithoutEmployeeInput, EmergencyContactUncheckedCreateWithoutEmployeeInput> | EmergencyContactCreateWithoutEmployeeInput[] | EmergencyContactUncheckedCreateWithoutEmployeeInput[]
    connectOrCreate?: EmergencyContactCreateOrConnectWithoutEmployeeInput | EmergencyContactCreateOrConnectWithoutEmployeeInput[]
    upsert?: EmergencyContactUpsertWithWhereUniqueWithoutEmployeeInput | EmergencyContactUpsertWithWhereUniqueWithoutEmployeeInput[]
    createMany?: EmergencyContactCreateManyEmployeeInputEnvelope
    set?: EmergencyContactWhereUniqueInput | EmergencyContactWhereUniqueInput[]
    disconnect?: EmergencyContactWhereUniqueInput | EmergencyContactWhereUniqueInput[]
    delete?: EmergencyContactWhereUniqueInput | EmergencyContactWhereUniqueInput[]
    connect?: EmergencyContactWhereUniqueInput | EmergencyContactWhereUniqueInput[]
    update?: EmergencyContactUpdateWithWhereUniqueWithoutEmployeeInput | EmergencyContactUpdateWithWhereUniqueWithoutEmployeeInput[]
    updateMany?: EmergencyContactUpdateManyWithWhereWithoutEmployeeInput | EmergencyContactUpdateManyWithWhereWithoutEmployeeInput[]
    deleteMany?: EmergencyContactScalarWhereInput | EmergencyContactScalarWhereInput[]
  }

  export type DependentUpdateManyWithoutEmployeeNestedInput = {
    create?: XOR<DependentCreateWithoutEmployeeInput, DependentUncheckedCreateWithoutEmployeeInput> | DependentCreateWithoutEmployeeInput[] | DependentUncheckedCreateWithoutEmployeeInput[]
    connectOrCreate?: DependentCreateOrConnectWithoutEmployeeInput | DependentCreateOrConnectWithoutEmployeeInput[]
    upsert?: DependentUpsertWithWhereUniqueWithoutEmployeeInput | DependentUpsertWithWhereUniqueWithoutEmployeeInput[]
    createMany?: DependentCreateManyEmployeeInputEnvelope
    set?: DependentWhereUniqueInput | DependentWhereUniqueInput[]
    disconnect?: DependentWhereUniqueInput | DependentWhereUniqueInput[]
    delete?: DependentWhereUniqueInput | DependentWhereUniqueInput[]
    connect?: DependentWhereUniqueInput | DependentWhereUniqueInput[]
    update?: DependentUpdateWithWhereUniqueWithoutEmployeeInput | DependentUpdateWithWhereUniqueWithoutEmployeeInput[]
    updateMany?: DependentUpdateManyWithWhereWithoutEmployeeInput | DependentUpdateManyWithWhereWithoutEmployeeInput[]
    deleteMany?: DependentScalarWhereInput | DependentScalarWhereInput[]
  }

  export type WorkPermitUpdateManyWithoutEmployeeNestedInput = {
    create?: XOR<WorkPermitCreateWithoutEmployeeInput, WorkPermitUncheckedCreateWithoutEmployeeInput> | WorkPermitCreateWithoutEmployeeInput[] | WorkPermitUncheckedCreateWithoutEmployeeInput[]
    connectOrCreate?: WorkPermitCreateOrConnectWithoutEmployeeInput | WorkPermitCreateOrConnectWithoutEmployeeInput[]
    upsert?: WorkPermitUpsertWithWhereUniqueWithoutEmployeeInput | WorkPermitUpsertWithWhereUniqueWithoutEmployeeInput[]
    createMany?: WorkPermitCreateManyEmployeeInputEnvelope
    set?: WorkPermitWhereUniqueInput | WorkPermitWhereUniqueInput[]
    disconnect?: WorkPermitWhereUniqueInput | WorkPermitWhereUniqueInput[]
    delete?: WorkPermitWhereUniqueInput | WorkPermitWhereUniqueInput[]
    connect?: WorkPermitWhereUniqueInput | WorkPermitWhereUniqueInput[]
    update?: WorkPermitUpdateWithWhereUniqueWithoutEmployeeInput | WorkPermitUpdateWithWhereUniqueWithoutEmployeeInput[]
    updateMany?: WorkPermitUpdateManyWithWhereWithoutEmployeeInput | WorkPermitUpdateManyWithWhereWithoutEmployeeInput[]
    deleteMany?: WorkPermitScalarWhereInput | WorkPermitScalarWhereInput[]
  }

  export type AuditLogUpdateManyWithoutEmployeeNestedInput = {
    create?: XOR<AuditLogCreateWithoutEmployeeInput, AuditLogUncheckedCreateWithoutEmployeeInput> | AuditLogCreateWithoutEmployeeInput[] | AuditLogUncheckedCreateWithoutEmployeeInput[]
    connectOrCreate?: AuditLogCreateOrConnectWithoutEmployeeInput | AuditLogCreateOrConnectWithoutEmployeeInput[]
    upsert?: AuditLogUpsertWithWhereUniqueWithoutEmployeeInput | AuditLogUpsertWithWhereUniqueWithoutEmployeeInput[]
    createMany?: AuditLogCreateManyEmployeeInputEnvelope
    set?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    disconnect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    delete?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    connect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    update?: AuditLogUpdateWithWhereUniqueWithoutEmployeeInput | AuditLogUpdateWithWhereUniqueWithoutEmployeeInput[]
    updateMany?: AuditLogUpdateManyWithWhereWithoutEmployeeInput | AuditLogUpdateManyWithWhereWithoutEmployeeInput[]
    deleteMany?: AuditLogScalarWhereInput | AuditLogScalarWhereInput[]
  }

  export type EmploymentUncheckedUpdateOneWithoutEmployeeNestedInput = {
    create?: XOR<EmploymentCreateWithoutEmployeeInput, EmploymentUncheckedCreateWithoutEmployeeInput>
    connectOrCreate?: EmploymentCreateOrConnectWithoutEmployeeInput
    upsert?: EmploymentUpsertWithoutEmployeeInput
    disconnect?: EmploymentWhereInput | boolean
    delete?: EmploymentWhereInput | boolean
    connect?: EmploymentWhereUniqueInput
    update?: XOR<XOR<EmploymentUpdateToOneWithWhereWithoutEmployeeInput, EmploymentUpdateWithoutEmployeeInput>, EmploymentUncheckedUpdateWithoutEmployeeInput>
  }

  export type AddressUncheckedUpdateManyWithoutEmployeeNestedInput = {
    create?: XOR<AddressCreateWithoutEmployeeInput, AddressUncheckedCreateWithoutEmployeeInput> | AddressCreateWithoutEmployeeInput[] | AddressUncheckedCreateWithoutEmployeeInput[]
    connectOrCreate?: AddressCreateOrConnectWithoutEmployeeInput | AddressCreateOrConnectWithoutEmployeeInput[]
    upsert?: AddressUpsertWithWhereUniqueWithoutEmployeeInput | AddressUpsertWithWhereUniqueWithoutEmployeeInput[]
    createMany?: AddressCreateManyEmployeeInputEnvelope
    set?: AddressWhereUniqueInput | AddressWhereUniqueInput[]
    disconnect?: AddressWhereUniqueInput | AddressWhereUniqueInput[]
    delete?: AddressWhereUniqueInput | AddressWhereUniqueInput[]
    connect?: AddressWhereUniqueInput | AddressWhereUniqueInput[]
    update?: AddressUpdateWithWhereUniqueWithoutEmployeeInput | AddressUpdateWithWhereUniqueWithoutEmployeeInput[]
    updateMany?: AddressUpdateManyWithWhereWithoutEmployeeInput | AddressUpdateManyWithWhereWithoutEmployeeInput[]
    deleteMany?: AddressScalarWhereInput | AddressScalarWhereInput[]
  }

  export type EmergencyContactUncheckedUpdateManyWithoutEmployeeNestedInput = {
    create?: XOR<EmergencyContactCreateWithoutEmployeeInput, EmergencyContactUncheckedCreateWithoutEmployeeInput> | EmergencyContactCreateWithoutEmployeeInput[] | EmergencyContactUncheckedCreateWithoutEmployeeInput[]
    connectOrCreate?: EmergencyContactCreateOrConnectWithoutEmployeeInput | EmergencyContactCreateOrConnectWithoutEmployeeInput[]
    upsert?: EmergencyContactUpsertWithWhereUniqueWithoutEmployeeInput | EmergencyContactUpsertWithWhereUniqueWithoutEmployeeInput[]
    createMany?: EmergencyContactCreateManyEmployeeInputEnvelope
    set?: EmergencyContactWhereUniqueInput | EmergencyContactWhereUniqueInput[]
    disconnect?: EmergencyContactWhereUniqueInput | EmergencyContactWhereUniqueInput[]
    delete?: EmergencyContactWhereUniqueInput | EmergencyContactWhereUniqueInput[]
    connect?: EmergencyContactWhereUniqueInput | EmergencyContactWhereUniqueInput[]
    update?: EmergencyContactUpdateWithWhereUniqueWithoutEmployeeInput | EmergencyContactUpdateWithWhereUniqueWithoutEmployeeInput[]
    updateMany?: EmergencyContactUpdateManyWithWhereWithoutEmployeeInput | EmergencyContactUpdateManyWithWhereWithoutEmployeeInput[]
    deleteMany?: EmergencyContactScalarWhereInput | EmergencyContactScalarWhereInput[]
  }

  export type DependentUncheckedUpdateManyWithoutEmployeeNestedInput = {
    create?: XOR<DependentCreateWithoutEmployeeInput, DependentUncheckedCreateWithoutEmployeeInput> | DependentCreateWithoutEmployeeInput[] | DependentUncheckedCreateWithoutEmployeeInput[]
    connectOrCreate?: DependentCreateOrConnectWithoutEmployeeInput | DependentCreateOrConnectWithoutEmployeeInput[]
    upsert?: DependentUpsertWithWhereUniqueWithoutEmployeeInput | DependentUpsertWithWhereUniqueWithoutEmployeeInput[]
    createMany?: DependentCreateManyEmployeeInputEnvelope
    set?: DependentWhereUniqueInput | DependentWhereUniqueInput[]
    disconnect?: DependentWhereUniqueInput | DependentWhereUniqueInput[]
    delete?: DependentWhereUniqueInput | DependentWhereUniqueInput[]
    connect?: DependentWhereUniqueInput | DependentWhereUniqueInput[]
    update?: DependentUpdateWithWhereUniqueWithoutEmployeeInput | DependentUpdateWithWhereUniqueWithoutEmployeeInput[]
    updateMany?: DependentUpdateManyWithWhereWithoutEmployeeInput | DependentUpdateManyWithWhereWithoutEmployeeInput[]
    deleteMany?: DependentScalarWhereInput | DependentScalarWhereInput[]
  }

  export type WorkPermitUncheckedUpdateManyWithoutEmployeeNestedInput = {
    create?: XOR<WorkPermitCreateWithoutEmployeeInput, WorkPermitUncheckedCreateWithoutEmployeeInput> | WorkPermitCreateWithoutEmployeeInput[] | WorkPermitUncheckedCreateWithoutEmployeeInput[]
    connectOrCreate?: WorkPermitCreateOrConnectWithoutEmployeeInput | WorkPermitCreateOrConnectWithoutEmployeeInput[]
    upsert?: WorkPermitUpsertWithWhereUniqueWithoutEmployeeInput | WorkPermitUpsertWithWhereUniqueWithoutEmployeeInput[]
    createMany?: WorkPermitCreateManyEmployeeInputEnvelope
    set?: WorkPermitWhereUniqueInput | WorkPermitWhereUniqueInput[]
    disconnect?: WorkPermitWhereUniqueInput | WorkPermitWhereUniqueInput[]
    delete?: WorkPermitWhereUniqueInput | WorkPermitWhereUniqueInput[]
    connect?: WorkPermitWhereUniqueInput | WorkPermitWhereUniqueInput[]
    update?: WorkPermitUpdateWithWhereUniqueWithoutEmployeeInput | WorkPermitUpdateWithWhereUniqueWithoutEmployeeInput[]
    updateMany?: WorkPermitUpdateManyWithWhereWithoutEmployeeInput | WorkPermitUpdateManyWithWhereWithoutEmployeeInput[]
    deleteMany?: WorkPermitScalarWhereInput | WorkPermitScalarWhereInput[]
  }

  export type AuditLogUncheckedUpdateManyWithoutEmployeeNestedInput = {
    create?: XOR<AuditLogCreateWithoutEmployeeInput, AuditLogUncheckedCreateWithoutEmployeeInput> | AuditLogCreateWithoutEmployeeInput[] | AuditLogUncheckedCreateWithoutEmployeeInput[]
    connectOrCreate?: AuditLogCreateOrConnectWithoutEmployeeInput | AuditLogCreateOrConnectWithoutEmployeeInput[]
    upsert?: AuditLogUpsertWithWhereUniqueWithoutEmployeeInput | AuditLogUpsertWithWhereUniqueWithoutEmployeeInput[]
    createMany?: AuditLogCreateManyEmployeeInputEnvelope
    set?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    disconnect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    delete?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    connect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    update?: AuditLogUpdateWithWhereUniqueWithoutEmployeeInput | AuditLogUpdateWithWhereUniqueWithoutEmployeeInput[]
    updateMany?: AuditLogUpdateManyWithWhereWithoutEmployeeInput | AuditLogUpdateManyWithWhereWithoutEmployeeInput[]
    deleteMany?: AuditLogScalarWhereInput | AuditLogScalarWhereInput[]
  }

  export type EmployeeCreateNestedOneWithoutEmploymentInput = {
    create?: XOR<EmployeeCreateWithoutEmploymentInput, EmployeeUncheckedCreateWithoutEmploymentInput>
    connectOrCreate?: EmployeeCreateOrConnectWithoutEmploymentInput
    connect?: EmployeeWhereUniqueInput
  }

  export type EmployeeUpdateOneRequiredWithoutEmploymentNestedInput = {
    create?: XOR<EmployeeCreateWithoutEmploymentInput, EmployeeUncheckedCreateWithoutEmploymentInput>
    connectOrCreate?: EmployeeCreateOrConnectWithoutEmploymentInput
    upsert?: EmployeeUpsertWithoutEmploymentInput
    connect?: EmployeeWhereUniqueInput
    update?: XOR<XOR<EmployeeUpdateToOneWithWhereWithoutEmploymentInput, EmployeeUpdateWithoutEmploymentInput>, EmployeeUncheckedUpdateWithoutEmploymentInput>
  }

  export type EmployeeCreateNestedOneWithoutAddressesInput = {
    create?: XOR<EmployeeCreateWithoutAddressesInput, EmployeeUncheckedCreateWithoutAddressesInput>
    connectOrCreate?: EmployeeCreateOrConnectWithoutAddressesInput
    connect?: EmployeeWhereUniqueInput
  }

  export type EmployeeUpdateOneRequiredWithoutAddressesNestedInput = {
    create?: XOR<EmployeeCreateWithoutAddressesInput, EmployeeUncheckedCreateWithoutAddressesInput>
    connectOrCreate?: EmployeeCreateOrConnectWithoutAddressesInput
    upsert?: EmployeeUpsertWithoutAddressesInput
    connect?: EmployeeWhereUniqueInput
    update?: XOR<XOR<EmployeeUpdateToOneWithWhereWithoutAddressesInput, EmployeeUpdateWithoutAddressesInput>, EmployeeUncheckedUpdateWithoutAddressesInput>
  }

  export type EmployeeCreateNestedOneWithoutEmergency_contactsInput = {
    create?: XOR<EmployeeCreateWithoutEmergency_contactsInput, EmployeeUncheckedCreateWithoutEmergency_contactsInput>
    connectOrCreate?: EmployeeCreateOrConnectWithoutEmergency_contactsInput
    connect?: EmployeeWhereUniqueInput
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type EmployeeUpdateOneRequiredWithoutEmergency_contactsNestedInput = {
    create?: XOR<EmployeeCreateWithoutEmergency_contactsInput, EmployeeUncheckedCreateWithoutEmergency_contactsInput>
    connectOrCreate?: EmployeeCreateOrConnectWithoutEmergency_contactsInput
    upsert?: EmployeeUpsertWithoutEmergency_contactsInput
    connect?: EmployeeWhereUniqueInput
    update?: XOR<XOR<EmployeeUpdateToOneWithWhereWithoutEmergency_contactsInput, EmployeeUpdateWithoutEmergency_contactsInput>, EmployeeUncheckedUpdateWithoutEmergency_contactsInput>
  }

  export type EmployeeCreateNestedOneWithoutDependentsInput = {
    create?: XOR<EmployeeCreateWithoutDependentsInput, EmployeeUncheckedCreateWithoutDependentsInput>
    connectOrCreate?: EmployeeCreateOrConnectWithoutDependentsInput
    connect?: EmployeeWhereUniqueInput
  }

  export type EmployeeUpdateOneRequiredWithoutDependentsNestedInput = {
    create?: XOR<EmployeeCreateWithoutDependentsInput, EmployeeUncheckedCreateWithoutDependentsInput>
    connectOrCreate?: EmployeeCreateOrConnectWithoutDependentsInput
    upsert?: EmployeeUpsertWithoutDependentsInput
    connect?: EmployeeWhereUniqueInput
    update?: XOR<XOR<EmployeeUpdateToOneWithWhereWithoutDependentsInput, EmployeeUpdateWithoutDependentsInput>, EmployeeUncheckedUpdateWithoutDependentsInput>
  }

  export type EmployeeCreateNestedOneWithoutWork_permitsInput = {
    create?: XOR<EmployeeCreateWithoutWork_permitsInput, EmployeeUncheckedCreateWithoutWork_permitsInput>
    connectOrCreate?: EmployeeCreateOrConnectWithoutWork_permitsInput
    connect?: EmployeeWhereUniqueInput
  }

  export type EmployeeUpdateOneRequiredWithoutWork_permitsNestedInput = {
    create?: XOR<EmployeeCreateWithoutWork_permitsInput, EmployeeUncheckedCreateWithoutWork_permitsInput>
    connectOrCreate?: EmployeeCreateOrConnectWithoutWork_permitsInput
    upsert?: EmployeeUpsertWithoutWork_permitsInput
    connect?: EmployeeWhereUniqueInput
    update?: XOR<XOR<EmployeeUpdateToOneWithWhereWithoutWork_permitsInput, EmployeeUpdateWithoutWork_permitsInput>, EmployeeUncheckedUpdateWithoutWork_permitsInput>
  }

  export type EmployeeCreateNestedOneWithoutAudit_logsInput = {
    create?: XOR<EmployeeCreateWithoutAudit_logsInput, EmployeeUncheckedCreateWithoutAudit_logsInput>
    connectOrCreate?: EmployeeCreateOrConnectWithoutAudit_logsInput
    connect?: EmployeeWhereUniqueInput
  }

  export type EmployeeUpdateOneRequiredWithoutAudit_logsNestedInput = {
    create?: XOR<EmployeeCreateWithoutAudit_logsInput, EmployeeUncheckedCreateWithoutAudit_logsInput>
    connectOrCreate?: EmployeeCreateOrConnectWithoutAudit_logsInput
    upsert?: EmployeeUpsertWithoutAudit_logsInput
    connect?: EmployeeWhereUniqueInput
    update?: XOR<XOR<EmployeeUpdateToOneWithWhereWithoutAudit_logsInput, EmployeeUpdateWithoutAudit_logsInput>, EmployeeUncheckedUpdateWithoutAudit_logsInput>
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

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
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

  export type EmploymentCreateWithoutEmployeeInput = {
    id?: string
    hire_date?: Date | string | null
    status?: string
    probation_end_date?: Date | string | null
    termination_date?: Date | string | null
    job_title?: string | null
    position_id?: string | null
    department?: string | null
    division?: string | null
    location?: string | null
    grade?: string | null
    level?: string | null
    manager_id?: string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type EmploymentUncheckedCreateWithoutEmployeeInput = {
    id?: string
    hire_date?: Date | string | null
    status?: string
    probation_end_date?: Date | string | null
    termination_date?: Date | string | null
    job_title?: string | null
    position_id?: string | null
    department?: string | null
    division?: string | null
    location?: string | null
    grade?: string | null
    level?: string | null
    manager_id?: string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type EmploymentCreateOrConnectWithoutEmployeeInput = {
    where: EmploymentWhereUniqueInput
    create: XOR<EmploymentCreateWithoutEmployeeInput, EmploymentUncheckedCreateWithoutEmployeeInput>
  }

  export type AddressCreateWithoutEmployeeInput = {
    id?: string
    address_type?: string | null
    address_line_1?: string | null
    address_line_2?: string | null
    district?: string | null
    sub_district?: string | null
    province?: string | null
    postal_code?: string | null
    country?: string
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type AddressUncheckedCreateWithoutEmployeeInput = {
    id?: string
    address_type?: string | null
    address_line_1?: string | null
    address_line_2?: string | null
    district?: string | null
    sub_district?: string | null
    province?: string | null
    postal_code?: string | null
    country?: string
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type AddressCreateOrConnectWithoutEmployeeInput = {
    where: AddressWhereUniqueInput
    create: XOR<AddressCreateWithoutEmployeeInput, AddressUncheckedCreateWithoutEmployeeInput>
  }

  export type AddressCreateManyEmployeeInputEnvelope = {
    data: AddressCreateManyEmployeeInput | AddressCreateManyEmployeeInput[]
    skipDuplicates?: boolean
  }

  export type EmergencyContactCreateWithoutEmployeeInput = {
    id?: string
    name: string
    relationship: string
    phone: string
    email?: string | null
    address?: string | null
    is_primary?: boolean
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type EmergencyContactUncheckedCreateWithoutEmployeeInput = {
    id?: string
    name: string
    relationship: string
    phone: string
    email?: string | null
    address?: string | null
    is_primary?: boolean
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type EmergencyContactCreateOrConnectWithoutEmployeeInput = {
    where: EmergencyContactWhereUniqueInput
    create: XOR<EmergencyContactCreateWithoutEmployeeInput, EmergencyContactUncheckedCreateWithoutEmployeeInput>
  }

  export type EmergencyContactCreateManyEmployeeInputEnvelope = {
    data: EmergencyContactCreateManyEmployeeInput | EmergencyContactCreateManyEmployeeInput[]
    skipDuplicates?: boolean
  }

  export type DependentCreateWithoutEmployeeInput = {
    id?: string
    name: string
    relationship_type: string
    date_of_birth?: Date | string | null
    gender?: string | null
    national_id?: string | null
    is_tax_deductible?: boolean
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type DependentUncheckedCreateWithoutEmployeeInput = {
    id?: string
    name: string
    relationship_type: string
    date_of_birth?: Date | string | null
    gender?: string | null
    national_id?: string | null
    is_tax_deductible?: boolean
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type DependentCreateOrConnectWithoutEmployeeInput = {
    where: DependentWhereUniqueInput
    create: XOR<DependentCreateWithoutEmployeeInput, DependentUncheckedCreateWithoutEmployeeInput>
  }

  export type DependentCreateManyEmployeeInputEnvelope = {
    data: DependentCreateManyEmployeeInput | DependentCreateManyEmployeeInput[]
    skipDuplicates?: boolean
  }

  export type WorkPermitCreateWithoutEmployeeInput = {
    id?: string
    permit_type: string
    permit_number: string
    issue_date: Date | string
    expiry_date: Date | string
    issuing_country: string
    status?: string
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type WorkPermitUncheckedCreateWithoutEmployeeInput = {
    id?: string
    permit_type: string
    permit_number: string
    issue_date: Date | string
    expiry_date: Date | string
    issuing_country: string
    status?: string
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type WorkPermitCreateOrConnectWithoutEmployeeInput = {
    where: WorkPermitWhereUniqueInput
    create: XOR<WorkPermitCreateWithoutEmployeeInput, WorkPermitUncheckedCreateWithoutEmployeeInput>
  }

  export type WorkPermitCreateManyEmployeeInputEnvelope = {
    data: WorkPermitCreateManyEmployeeInput | WorkPermitCreateManyEmployeeInput[]
    skipDuplicates?: boolean
  }

  export type AuditLogCreateWithoutEmployeeInput = {
    id?: string
    action: string
    entity_type: string
    entity_id?: string | null
    changes?: NullableJsonNullValueInput | InputJsonValue
    performed_by: string
    changed_at?: Date | string
  }

  export type AuditLogUncheckedCreateWithoutEmployeeInput = {
    id?: string
    action: string
    entity_type: string
    entity_id?: string | null
    changes?: NullableJsonNullValueInput | InputJsonValue
    performed_by: string
    changed_at?: Date | string
  }

  export type AuditLogCreateOrConnectWithoutEmployeeInput = {
    where: AuditLogWhereUniqueInput
    create: XOR<AuditLogCreateWithoutEmployeeInput, AuditLogUncheckedCreateWithoutEmployeeInput>
  }

  export type AuditLogCreateManyEmployeeInputEnvelope = {
    data: AuditLogCreateManyEmployeeInput | AuditLogCreateManyEmployeeInput[]
    skipDuplicates?: boolean
  }

  export type EmploymentUpsertWithoutEmployeeInput = {
    update: XOR<EmploymentUpdateWithoutEmployeeInput, EmploymentUncheckedUpdateWithoutEmployeeInput>
    create: XOR<EmploymentCreateWithoutEmployeeInput, EmploymentUncheckedCreateWithoutEmployeeInput>
    where?: EmploymentWhereInput
  }

  export type EmploymentUpdateToOneWithWhereWithoutEmployeeInput = {
    where?: EmploymentWhereInput
    data: XOR<EmploymentUpdateWithoutEmployeeInput, EmploymentUncheckedUpdateWithoutEmployeeInput>
  }

  export type EmploymentUpdateWithoutEmployeeInput = {
    id?: StringFieldUpdateOperationsInput | string
    hire_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    probation_end_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    termination_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    job_title?: NullableStringFieldUpdateOperationsInput | string | null
    position_id?: NullableStringFieldUpdateOperationsInput | string | null
    department?: NullableStringFieldUpdateOperationsInput | string | null
    division?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    grade?: NullableStringFieldUpdateOperationsInput | string | null
    level?: NullableStringFieldUpdateOperationsInput | string | null
    manager_id?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmploymentUncheckedUpdateWithoutEmployeeInput = {
    id?: StringFieldUpdateOperationsInput | string
    hire_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    probation_end_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    termination_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    job_title?: NullableStringFieldUpdateOperationsInput | string | null
    position_id?: NullableStringFieldUpdateOperationsInput | string | null
    department?: NullableStringFieldUpdateOperationsInput | string | null
    division?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    grade?: NullableStringFieldUpdateOperationsInput | string | null
    level?: NullableStringFieldUpdateOperationsInput | string | null
    manager_id?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AddressUpsertWithWhereUniqueWithoutEmployeeInput = {
    where: AddressWhereUniqueInput
    update: XOR<AddressUpdateWithoutEmployeeInput, AddressUncheckedUpdateWithoutEmployeeInput>
    create: XOR<AddressCreateWithoutEmployeeInput, AddressUncheckedCreateWithoutEmployeeInput>
  }

  export type AddressUpdateWithWhereUniqueWithoutEmployeeInput = {
    where: AddressWhereUniqueInput
    data: XOR<AddressUpdateWithoutEmployeeInput, AddressUncheckedUpdateWithoutEmployeeInput>
  }

  export type AddressUpdateManyWithWhereWithoutEmployeeInput = {
    where: AddressScalarWhereInput
    data: XOR<AddressUpdateManyMutationInput, AddressUncheckedUpdateManyWithoutEmployeeInput>
  }

  export type AddressScalarWhereInput = {
    AND?: AddressScalarWhereInput | AddressScalarWhereInput[]
    OR?: AddressScalarWhereInput[]
    NOT?: AddressScalarWhereInput | AddressScalarWhereInput[]
    id?: StringFilter<"Address"> | string
    employee_id?: StringFilter<"Address"> | string
    address_type?: StringNullableFilter<"Address"> | string | null
    address_line_1?: StringNullableFilter<"Address"> | string | null
    address_line_2?: StringNullableFilter<"Address"> | string | null
    district?: StringNullableFilter<"Address"> | string | null
    sub_district?: StringNullableFilter<"Address"> | string | null
    province?: StringNullableFilter<"Address"> | string | null
    postal_code?: StringNullableFilter<"Address"> | string | null
    country?: StringFilter<"Address"> | string
    created_at?: DateTimeFilter<"Address"> | Date | string
    updated_at?: DateTimeFilter<"Address"> | Date | string
  }

  export type EmergencyContactUpsertWithWhereUniqueWithoutEmployeeInput = {
    where: EmergencyContactWhereUniqueInput
    update: XOR<EmergencyContactUpdateWithoutEmployeeInput, EmergencyContactUncheckedUpdateWithoutEmployeeInput>
    create: XOR<EmergencyContactCreateWithoutEmployeeInput, EmergencyContactUncheckedCreateWithoutEmployeeInput>
  }

  export type EmergencyContactUpdateWithWhereUniqueWithoutEmployeeInput = {
    where: EmergencyContactWhereUniqueInput
    data: XOR<EmergencyContactUpdateWithoutEmployeeInput, EmergencyContactUncheckedUpdateWithoutEmployeeInput>
  }

  export type EmergencyContactUpdateManyWithWhereWithoutEmployeeInput = {
    where: EmergencyContactScalarWhereInput
    data: XOR<EmergencyContactUpdateManyMutationInput, EmergencyContactUncheckedUpdateManyWithoutEmployeeInput>
  }

  export type EmergencyContactScalarWhereInput = {
    AND?: EmergencyContactScalarWhereInput | EmergencyContactScalarWhereInput[]
    OR?: EmergencyContactScalarWhereInput[]
    NOT?: EmergencyContactScalarWhereInput | EmergencyContactScalarWhereInput[]
    id?: StringFilter<"EmergencyContact"> | string
    employee_id?: StringFilter<"EmergencyContact"> | string
    name?: StringFilter<"EmergencyContact"> | string
    relationship?: StringFilter<"EmergencyContact"> | string
    phone?: StringFilter<"EmergencyContact"> | string
    email?: StringNullableFilter<"EmergencyContact"> | string | null
    address?: StringNullableFilter<"EmergencyContact"> | string | null
    is_primary?: BoolFilter<"EmergencyContact"> | boolean
    created_at?: DateTimeFilter<"EmergencyContact"> | Date | string
    updated_at?: DateTimeFilter<"EmergencyContact"> | Date | string
  }

  export type DependentUpsertWithWhereUniqueWithoutEmployeeInput = {
    where: DependentWhereUniqueInput
    update: XOR<DependentUpdateWithoutEmployeeInput, DependentUncheckedUpdateWithoutEmployeeInput>
    create: XOR<DependentCreateWithoutEmployeeInput, DependentUncheckedCreateWithoutEmployeeInput>
  }

  export type DependentUpdateWithWhereUniqueWithoutEmployeeInput = {
    where: DependentWhereUniqueInput
    data: XOR<DependentUpdateWithoutEmployeeInput, DependentUncheckedUpdateWithoutEmployeeInput>
  }

  export type DependentUpdateManyWithWhereWithoutEmployeeInput = {
    where: DependentScalarWhereInput
    data: XOR<DependentUpdateManyMutationInput, DependentUncheckedUpdateManyWithoutEmployeeInput>
  }

  export type DependentScalarWhereInput = {
    AND?: DependentScalarWhereInput | DependentScalarWhereInput[]
    OR?: DependentScalarWhereInput[]
    NOT?: DependentScalarWhereInput | DependentScalarWhereInput[]
    id?: StringFilter<"Dependent"> | string
    employee_id?: StringFilter<"Dependent"> | string
    name?: StringFilter<"Dependent"> | string
    relationship_type?: StringFilter<"Dependent"> | string
    date_of_birth?: DateTimeNullableFilter<"Dependent"> | Date | string | null
    gender?: StringNullableFilter<"Dependent"> | string | null
    national_id?: StringNullableFilter<"Dependent"> | string | null
    is_tax_deductible?: BoolFilter<"Dependent"> | boolean
    created_at?: DateTimeFilter<"Dependent"> | Date | string
    updated_at?: DateTimeFilter<"Dependent"> | Date | string
  }

  export type WorkPermitUpsertWithWhereUniqueWithoutEmployeeInput = {
    where: WorkPermitWhereUniqueInput
    update: XOR<WorkPermitUpdateWithoutEmployeeInput, WorkPermitUncheckedUpdateWithoutEmployeeInput>
    create: XOR<WorkPermitCreateWithoutEmployeeInput, WorkPermitUncheckedCreateWithoutEmployeeInput>
  }

  export type WorkPermitUpdateWithWhereUniqueWithoutEmployeeInput = {
    where: WorkPermitWhereUniqueInput
    data: XOR<WorkPermitUpdateWithoutEmployeeInput, WorkPermitUncheckedUpdateWithoutEmployeeInput>
  }

  export type WorkPermitUpdateManyWithWhereWithoutEmployeeInput = {
    where: WorkPermitScalarWhereInput
    data: XOR<WorkPermitUpdateManyMutationInput, WorkPermitUncheckedUpdateManyWithoutEmployeeInput>
  }

  export type WorkPermitScalarWhereInput = {
    AND?: WorkPermitScalarWhereInput | WorkPermitScalarWhereInput[]
    OR?: WorkPermitScalarWhereInput[]
    NOT?: WorkPermitScalarWhereInput | WorkPermitScalarWhereInput[]
    id?: StringFilter<"WorkPermit"> | string
    employee_id?: StringFilter<"WorkPermit"> | string
    permit_type?: StringFilter<"WorkPermit"> | string
    permit_number?: StringFilter<"WorkPermit"> | string
    issue_date?: DateTimeFilter<"WorkPermit"> | Date | string
    expiry_date?: DateTimeFilter<"WorkPermit"> | Date | string
    issuing_country?: StringFilter<"WorkPermit"> | string
    status?: StringFilter<"WorkPermit"> | string
    created_at?: DateTimeFilter<"WorkPermit"> | Date | string
    updated_at?: DateTimeFilter<"WorkPermit"> | Date | string
  }

  export type AuditLogUpsertWithWhereUniqueWithoutEmployeeInput = {
    where: AuditLogWhereUniqueInput
    update: XOR<AuditLogUpdateWithoutEmployeeInput, AuditLogUncheckedUpdateWithoutEmployeeInput>
    create: XOR<AuditLogCreateWithoutEmployeeInput, AuditLogUncheckedCreateWithoutEmployeeInput>
  }

  export type AuditLogUpdateWithWhereUniqueWithoutEmployeeInput = {
    where: AuditLogWhereUniqueInput
    data: XOR<AuditLogUpdateWithoutEmployeeInput, AuditLogUncheckedUpdateWithoutEmployeeInput>
  }

  export type AuditLogUpdateManyWithWhereWithoutEmployeeInput = {
    where: AuditLogScalarWhereInput
    data: XOR<AuditLogUpdateManyMutationInput, AuditLogUncheckedUpdateManyWithoutEmployeeInput>
  }

  export type AuditLogScalarWhereInput = {
    AND?: AuditLogScalarWhereInput | AuditLogScalarWhereInput[]
    OR?: AuditLogScalarWhereInput[]
    NOT?: AuditLogScalarWhereInput | AuditLogScalarWhereInput[]
    id?: StringFilter<"AuditLog"> | string
    employee_id?: StringFilter<"AuditLog"> | string
    action?: StringFilter<"AuditLog"> | string
    entity_type?: StringFilter<"AuditLog"> | string
    entity_id?: StringNullableFilter<"AuditLog"> | string | null
    changes?: JsonNullableFilter<"AuditLog">
    performed_by?: StringFilter<"AuditLog"> | string
    changed_at?: DateTimeFilter<"AuditLog"> | Date | string
  }

  export type EmployeeCreateWithoutEmploymentInput = {
    id?: string
    employee_id: string
    first_name_en?: string | null
    first_name_th?: string | null
    last_name_en?: string | null
    last_name_th?: string | null
    nickname?: string | null
    gender?: string | null
    date_of_birth?: Date | string | null
    nationality?: string | null
    national_id?: string | null
    religion?: string | null
    blood_type?: string | null
    marital_status?: string | null
    tax_id?: string | null
    passport_number?: string | null
    photo_url?: string | null
    email?: string | null
    personal_email?: string | null
    business_phone?: string | null
    personal_mobile?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    addresses?: AddressCreateNestedManyWithoutEmployeeInput
    emergency_contacts?: EmergencyContactCreateNestedManyWithoutEmployeeInput
    dependents?: DependentCreateNestedManyWithoutEmployeeInput
    work_permits?: WorkPermitCreateNestedManyWithoutEmployeeInput
    audit_logs?: AuditLogCreateNestedManyWithoutEmployeeInput
  }

  export type EmployeeUncheckedCreateWithoutEmploymentInput = {
    id?: string
    employee_id: string
    first_name_en?: string | null
    first_name_th?: string | null
    last_name_en?: string | null
    last_name_th?: string | null
    nickname?: string | null
    gender?: string | null
    date_of_birth?: Date | string | null
    nationality?: string | null
    national_id?: string | null
    religion?: string | null
    blood_type?: string | null
    marital_status?: string | null
    tax_id?: string | null
    passport_number?: string | null
    photo_url?: string | null
    email?: string | null
    personal_email?: string | null
    business_phone?: string | null
    personal_mobile?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    addresses?: AddressUncheckedCreateNestedManyWithoutEmployeeInput
    emergency_contacts?: EmergencyContactUncheckedCreateNestedManyWithoutEmployeeInput
    dependents?: DependentUncheckedCreateNestedManyWithoutEmployeeInput
    work_permits?: WorkPermitUncheckedCreateNestedManyWithoutEmployeeInput
    audit_logs?: AuditLogUncheckedCreateNestedManyWithoutEmployeeInput
  }

  export type EmployeeCreateOrConnectWithoutEmploymentInput = {
    where: EmployeeWhereUniqueInput
    create: XOR<EmployeeCreateWithoutEmploymentInput, EmployeeUncheckedCreateWithoutEmploymentInput>
  }

  export type EmployeeUpsertWithoutEmploymentInput = {
    update: XOR<EmployeeUpdateWithoutEmploymentInput, EmployeeUncheckedUpdateWithoutEmploymentInput>
    create: XOR<EmployeeCreateWithoutEmploymentInput, EmployeeUncheckedCreateWithoutEmploymentInput>
    where?: EmployeeWhereInput
  }

  export type EmployeeUpdateToOneWithWhereWithoutEmploymentInput = {
    where?: EmployeeWhereInput
    data: XOR<EmployeeUpdateWithoutEmploymentInput, EmployeeUncheckedUpdateWithoutEmploymentInput>
  }

  export type EmployeeUpdateWithoutEmploymentInput = {
    id?: StringFieldUpdateOperationsInput | string
    employee_id?: StringFieldUpdateOperationsInput | string
    first_name_en?: NullableStringFieldUpdateOperationsInput | string | null
    first_name_th?: NullableStringFieldUpdateOperationsInput | string | null
    last_name_en?: NullableStringFieldUpdateOperationsInput | string | null
    last_name_th?: NullableStringFieldUpdateOperationsInput | string | null
    nickname?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    date_of_birth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nationality?: NullableStringFieldUpdateOperationsInput | string | null
    national_id?: NullableStringFieldUpdateOperationsInput | string | null
    religion?: NullableStringFieldUpdateOperationsInput | string | null
    blood_type?: NullableStringFieldUpdateOperationsInput | string | null
    marital_status?: NullableStringFieldUpdateOperationsInput | string | null
    tax_id?: NullableStringFieldUpdateOperationsInput | string | null
    passport_number?: NullableStringFieldUpdateOperationsInput | string | null
    photo_url?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    personal_email?: NullableStringFieldUpdateOperationsInput | string | null
    business_phone?: NullableStringFieldUpdateOperationsInput | string | null
    personal_mobile?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    addresses?: AddressUpdateManyWithoutEmployeeNestedInput
    emergency_contacts?: EmergencyContactUpdateManyWithoutEmployeeNestedInput
    dependents?: DependentUpdateManyWithoutEmployeeNestedInput
    work_permits?: WorkPermitUpdateManyWithoutEmployeeNestedInput
    audit_logs?: AuditLogUpdateManyWithoutEmployeeNestedInput
  }

  export type EmployeeUncheckedUpdateWithoutEmploymentInput = {
    id?: StringFieldUpdateOperationsInput | string
    employee_id?: StringFieldUpdateOperationsInput | string
    first_name_en?: NullableStringFieldUpdateOperationsInput | string | null
    first_name_th?: NullableStringFieldUpdateOperationsInput | string | null
    last_name_en?: NullableStringFieldUpdateOperationsInput | string | null
    last_name_th?: NullableStringFieldUpdateOperationsInput | string | null
    nickname?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    date_of_birth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nationality?: NullableStringFieldUpdateOperationsInput | string | null
    national_id?: NullableStringFieldUpdateOperationsInput | string | null
    religion?: NullableStringFieldUpdateOperationsInput | string | null
    blood_type?: NullableStringFieldUpdateOperationsInput | string | null
    marital_status?: NullableStringFieldUpdateOperationsInput | string | null
    tax_id?: NullableStringFieldUpdateOperationsInput | string | null
    passport_number?: NullableStringFieldUpdateOperationsInput | string | null
    photo_url?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    personal_email?: NullableStringFieldUpdateOperationsInput | string | null
    business_phone?: NullableStringFieldUpdateOperationsInput | string | null
    personal_mobile?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    addresses?: AddressUncheckedUpdateManyWithoutEmployeeNestedInput
    emergency_contacts?: EmergencyContactUncheckedUpdateManyWithoutEmployeeNestedInput
    dependents?: DependentUncheckedUpdateManyWithoutEmployeeNestedInput
    work_permits?: WorkPermitUncheckedUpdateManyWithoutEmployeeNestedInput
    audit_logs?: AuditLogUncheckedUpdateManyWithoutEmployeeNestedInput
  }

  export type EmployeeCreateWithoutAddressesInput = {
    id?: string
    employee_id: string
    first_name_en?: string | null
    first_name_th?: string | null
    last_name_en?: string | null
    last_name_th?: string | null
    nickname?: string | null
    gender?: string | null
    date_of_birth?: Date | string | null
    nationality?: string | null
    national_id?: string | null
    religion?: string | null
    blood_type?: string | null
    marital_status?: string | null
    tax_id?: string | null
    passport_number?: string | null
    photo_url?: string | null
    email?: string | null
    personal_email?: string | null
    business_phone?: string | null
    personal_mobile?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    employment?: EmploymentCreateNestedOneWithoutEmployeeInput
    emergency_contacts?: EmergencyContactCreateNestedManyWithoutEmployeeInput
    dependents?: DependentCreateNestedManyWithoutEmployeeInput
    work_permits?: WorkPermitCreateNestedManyWithoutEmployeeInput
    audit_logs?: AuditLogCreateNestedManyWithoutEmployeeInput
  }

  export type EmployeeUncheckedCreateWithoutAddressesInput = {
    id?: string
    employee_id: string
    first_name_en?: string | null
    first_name_th?: string | null
    last_name_en?: string | null
    last_name_th?: string | null
    nickname?: string | null
    gender?: string | null
    date_of_birth?: Date | string | null
    nationality?: string | null
    national_id?: string | null
    religion?: string | null
    blood_type?: string | null
    marital_status?: string | null
    tax_id?: string | null
    passport_number?: string | null
    photo_url?: string | null
    email?: string | null
    personal_email?: string | null
    business_phone?: string | null
    personal_mobile?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    employment?: EmploymentUncheckedCreateNestedOneWithoutEmployeeInput
    emergency_contacts?: EmergencyContactUncheckedCreateNestedManyWithoutEmployeeInput
    dependents?: DependentUncheckedCreateNestedManyWithoutEmployeeInput
    work_permits?: WorkPermitUncheckedCreateNestedManyWithoutEmployeeInput
    audit_logs?: AuditLogUncheckedCreateNestedManyWithoutEmployeeInput
  }

  export type EmployeeCreateOrConnectWithoutAddressesInput = {
    where: EmployeeWhereUniqueInput
    create: XOR<EmployeeCreateWithoutAddressesInput, EmployeeUncheckedCreateWithoutAddressesInput>
  }

  export type EmployeeUpsertWithoutAddressesInput = {
    update: XOR<EmployeeUpdateWithoutAddressesInput, EmployeeUncheckedUpdateWithoutAddressesInput>
    create: XOR<EmployeeCreateWithoutAddressesInput, EmployeeUncheckedCreateWithoutAddressesInput>
    where?: EmployeeWhereInput
  }

  export type EmployeeUpdateToOneWithWhereWithoutAddressesInput = {
    where?: EmployeeWhereInput
    data: XOR<EmployeeUpdateWithoutAddressesInput, EmployeeUncheckedUpdateWithoutAddressesInput>
  }

  export type EmployeeUpdateWithoutAddressesInput = {
    id?: StringFieldUpdateOperationsInput | string
    employee_id?: StringFieldUpdateOperationsInput | string
    first_name_en?: NullableStringFieldUpdateOperationsInput | string | null
    first_name_th?: NullableStringFieldUpdateOperationsInput | string | null
    last_name_en?: NullableStringFieldUpdateOperationsInput | string | null
    last_name_th?: NullableStringFieldUpdateOperationsInput | string | null
    nickname?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    date_of_birth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nationality?: NullableStringFieldUpdateOperationsInput | string | null
    national_id?: NullableStringFieldUpdateOperationsInput | string | null
    religion?: NullableStringFieldUpdateOperationsInput | string | null
    blood_type?: NullableStringFieldUpdateOperationsInput | string | null
    marital_status?: NullableStringFieldUpdateOperationsInput | string | null
    tax_id?: NullableStringFieldUpdateOperationsInput | string | null
    passport_number?: NullableStringFieldUpdateOperationsInput | string | null
    photo_url?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    personal_email?: NullableStringFieldUpdateOperationsInput | string | null
    business_phone?: NullableStringFieldUpdateOperationsInput | string | null
    personal_mobile?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    employment?: EmploymentUpdateOneWithoutEmployeeNestedInput
    emergency_contacts?: EmergencyContactUpdateManyWithoutEmployeeNestedInput
    dependents?: DependentUpdateManyWithoutEmployeeNestedInput
    work_permits?: WorkPermitUpdateManyWithoutEmployeeNestedInput
    audit_logs?: AuditLogUpdateManyWithoutEmployeeNestedInput
  }

  export type EmployeeUncheckedUpdateWithoutAddressesInput = {
    id?: StringFieldUpdateOperationsInput | string
    employee_id?: StringFieldUpdateOperationsInput | string
    first_name_en?: NullableStringFieldUpdateOperationsInput | string | null
    first_name_th?: NullableStringFieldUpdateOperationsInput | string | null
    last_name_en?: NullableStringFieldUpdateOperationsInput | string | null
    last_name_th?: NullableStringFieldUpdateOperationsInput | string | null
    nickname?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    date_of_birth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nationality?: NullableStringFieldUpdateOperationsInput | string | null
    national_id?: NullableStringFieldUpdateOperationsInput | string | null
    religion?: NullableStringFieldUpdateOperationsInput | string | null
    blood_type?: NullableStringFieldUpdateOperationsInput | string | null
    marital_status?: NullableStringFieldUpdateOperationsInput | string | null
    tax_id?: NullableStringFieldUpdateOperationsInput | string | null
    passport_number?: NullableStringFieldUpdateOperationsInput | string | null
    photo_url?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    personal_email?: NullableStringFieldUpdateOperationsInput | string | null
    business_phone?: NullableStringFieldUpdateOperationsInput | string | null
    personal_mobile?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    employment?: EmploymentUncheckedUpdateOneWithoutEmployeeNestedInput
    emergency_contacts?: EmergencyContactUncheckedUpdateManyWithoutEmployeeNestedInput
    dependents?: DependentUncheckedUpdateManyWithoutEmployeeNestedInput
    work_permits?: WorkPermitUncheckedUpdateManyWithoutEmployeeNestedInput
    audit_logs?: AuditLogUncheckedUpdateManyWithoutEmployeeNestedInput
  }

  export type EmployeeCreateWithoutEmergency_contactsInput = {
    id?: string
    employee_id: string
    first_name_en?: string | null
    first_name_th?: string | null
    last_name_en?: string | null
    last_name_th?: string | null
    nickname?: string | null
    gender?: string | null
    date_of_birth?: Date | string | null
    nationality?: string | null
    national_id?: string | null
    religion?: string | null
    blood_type?: string | null
    marital_status?: string | null
    tax_id?: string | null
    passport_number?: string | null
    photo_url?: string | null
    email?: string | null
    personal_email?: string | null
    business_phone?: string | null
    personal_mobile?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    employment?: EmploymentCreateNestedOneWithoutEmployeeInput
    addresses?: AddressCreateNestedManyWithoutEmployeeInput
    dependents?: DependentCreateNestedManyWithoutEmployeeInput
    work_permits?: WorkPermitCreateNestedManyWithoutEmployeeInput
    audit_logs?: AuditLogCreateNestedManyWithoutEmployeeInput
  }

  export type EmployeeUncheckedCreateWithoutEmergency_contactsInput = {
    id?: string
    employee_id: string
    first_name_en?: string | null
    first_name_th?: string | null
    last_name_en?: string | null
    last_name_th?: string | null
    nickname?: string | null
    gender?: string | null
    date_of_birth?: Date | string | null
    nationality?: string | null
    national_id?: string | null
    religion?: string | null
    blood_type?: string | null
    marital_status?: string | null
    tax_id?: string | null
    passport_number?: string | null
    photo_url?: string | null
    email?: string | null
    personal_email?: string | null
    business_phone?: string | null
    personal_mobile?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    employment?: EmploymentUncheckedCreateNestedOneWithoutEmployeeInput
    addresses?: AddressUncheckedCreateNestedManyWithoutEmployeeInput
    dependents?: DependentUncheckedCreateNestedManyWithoutEmployeeInput
    work_permits?: WorkPermitUncheckedCreateNestedManyWithoutEmployeeInput
    audit_logs?: AuditLogUncheckedCreateNestedManyWithoutEmployeeInput
  }

  export type EmployeeCreateOrConnectWithoutEmergency_contactsInput = {
    where: EmployeeWhereUniqueInput
    create: XOR<EmployeeCreateWithoutEmergency_contactsInput, EmployeeUncheckedCreateWithoutEmergency_contactsInput>
  }

  export type EmployeeUpsertWithoutEmergency_contactsInput = {
    update: XOR<EmployeeUpdateWithoutEmergency_contactsInput, EmployeeUncheckedUpdateWithoutEmergency_contactsInput>
    create: XOR<EmployeeCreateWithoutEmergency_contactsInput, EmployeeUncheckedCreateWithoutEmergency_contactsInput>
    where?: EmployeeWhereInput
  }

  export type EmployeeUpdateToOneWithWhereWithoutEmergency_contactsInput = {
    where?: EmployeeWhereInput
    data: XOR<EmployeeUpdateWithoutEmergency_contactsInput, EmployeeUncheckedUpdateWithoutEmergency_contactsInput>
  }

  export type EmployeeUpdateWithoutEmergency_contactsInput = {
    id?: StringFieldUpdateOperationsInput | string
    employee_id?: StringFieldUpdateOperationsInput | string
    first_name_en?: NullableStringFieldUpdateOperationsInput | string | null
    first_name_th?: NullableStringFieldUpdateOperationsInput | string | null
    last_name_en?: NullableStringFieldUpdateOperationsInput | string | null
    last_name_th?: NullableStringFieldUpdateOperationsInput | string | null
    nickname?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    date_of_birth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nationality?: NullableStringFieldUpdateOperationsInput | string | null
    national_id?: NullableStringFieldUpdateOperationsInput | string | null
    religion?: NullableStringFieldUpdateOperationsInput | string | null
    blood_type?: NullableStringFieldUpdateOperationsInput | string | null
    marital_status?: NullableStringFieldUpdateOperationsInput | string | null
    tax_id?: NullableStringFieldUpdateOperationsInput | string | null
    passport_number?: NullableStringFieldUpdateOperationsInput | string | null
    photo_url?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    personal_email?: NullableStringFieldUpdateOperationsInput | string | null
    business_phone?: NullableStringFieldUpdateOperationsInput | string | null
    personal_mobile?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    employment?: EmploymentUpdateOneWithoutEmployeeNestedInput
    addresses?: AddressUpdateManyWithoutEmployeeNestedInput
    dependents?: DependentUpdateManyWithoutEmployeeNestedInput
    work_permits?: WorkPermitUpdateManyWithoutEmployeeNestedInput
    audit_logs?: AuditLogUpdateManyWithoutEmployeeNestedInput
  }

  export type EmployeeUncheckedUpdateWithoutEmergency_contactsInput = {
    id?: StringFieldUpdateOperationsInput | string
    employee_id?: StringFieldUpdateOperationsInput | string
    first_name_en?: NullableStringFieldUpdateOperationsInput | string | null
    first_name_th?: NullableStringFieldUpdateOperationsInput | string | null
    last_name_en?: NullableStringFieldUpdateOperationsInput | string | null
    last_name_th?: NullableStringFieldUpdateOperationsInput | string | null
    nickname?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    date_of_birth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nationality?: NullableStringFieldUpdateOperationsInput | string | null
    national_id?: NullableStringFieldUpdateOperationsInput | string | null
    religion?: NullableStringFieldUpdateOperationsInput | string | null
    blood_type?: NullableStringFieldUpdateOperationsInput | string | null
    marital_status?: NullableStringFieldUpdateOperationsInput | string | null
    tax_id?: NullableStringFieldUpdateOperationsInput | string | null
    passport_number?: NullableStringFieldUpdateOperationsInput | string | null
    photo_url?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    personal_email?: NullableStringFieldUpdateOperationsInput | string | null
    business_phone?: NullableStringFieldUpdateOperationsInput | string | null
    personal_mobile?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    employment?: EmploymentUncheckedUpdateOneWithoutEmployeeNestedInput
    addresses?: AddressUncheckedUpdateManyWithoutEmployeeNestedInput
    dependents?: DependentUncheckedUpdateManyWithoutEmployeeNestedInput
    work_permits?: WorkPermitUncheckedUpdateManyWithoutEmployeeNestedInput
    audit_logs?: AuditLogUncheckedUpdateManyWithoutEmployeeNestedInput
  }

  export type EmployeeCreateWithoutDependentsInput = {
    id?: string
    employee_id: string
    first_name_en?: string | null
    first_name_th?: string | null
    last_name_en?: string | null
    last_name_th?: string | null
    nickname?: string | null
    gender?: string | null
    date_of_birth?: Date | string | null
    nationality?: string | null
    national_id?: string | null
    religion?: string | null
    blood_type?: string | null
    marital_status?: string | null
    tax_id?: string | null
    passport_number?: string | null
    photo_url?: string | null
    email?: string | null
    personal_email?: string | null
    business_phone?: string | null
    personal_mobile?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    employment?: EmploymentCreateNestedOneWithoutEmployeeInput
    addresses?: AddressCreateNestedManyWithoutEmployeeInput
    emergency_contacts?: EmergencyContactCreateNestedManyWithoutEmployeeInput
    work_permits?: WorkPermitCreateNestedManyWithoutEmployeeInput
    audit_logs?: AuditLogCreateNestedManyWithoutEmployeeInput
  }

  export type EmployeeUncheckedCreateWithoutDependentsInput = {
    id?: string
    employee_id: string
    first_name_en?: string | null
    first_name_th?: string | null
    last_name_en?: string | null
    last_name_th?: string | null
    nickname?: string | null
    gender?: string | null
    date_of_birth?: Date | string | null
    nationality?: string | null
    national_id?: string | null
    religion?: string | null
    blood_type?: string | null
    marital_status?: string | null
    tax_id?: string | null
    passport_number?: string | null
    photo_url?: string | null
    email?: string | null
    personal_email?: string | null
    business_phone?: string | null
    personal_mobile?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    employment?: EmploymentUncheckedCreateNestedOneWithoutEmployeeInput
    addresses?: AddressUncheckedCreateNestedManyWithoutEmployeeInput
    emergency_contacts?: EmergencyContactUncheckedCreateNestedManyWithoutEmployeeInput
    work_permits?: WorkPermitUncheckedCreateNestedManyWithoutEmployeeInput
    audit_logs?: AuditLogUncheckedCreateNestedManyWithoutEmployeeInput
  }

  export type EmployeeCreateOrConnectWithoutDependentsInput = {
    where: EmployeeWhereUniqueInput
    create: XOR<EmployeeCreateWithoutDependentsInput, EmployeeUncheckedCreateWithoutDependentsInput>
  }

  export type EmployeeUpsertWithoutDependentsInput = {
    update: XOR<EmployeeUpdateWithoutDependentsInput, EmployeeUncheckedUpdateWithoutDependentsInput>
    create: XOR<EmployeeCreateWithoutDependentsInput, EmployeeUncheckedCreateWithoutDependentsInput>
    where?: EmployeeWhereInput
  }

  export type EmployeeUpdateToOneWithWhereWithoutDependentsInput = {
    where?: EmployeeWhereInput
    data: XOR<EmployeeUpdateWithoutDependentsInput, EmployeeUncheckedUpdateWithoutDependentsInput>
  }

  export type EmployeeUpdateWithoutDependentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    employee_id?: StringFieldUpdateOperationsInput | string
    first_name_en?: NullableStringFieldUpdateOperationsInput | string | null
    first_name_th?: NullableStringFieldUpdateOperationsInput | string | null
    last_name_en?: NullableStringFieldUpdateOperationsInput | string | null
    last_name_th?: NullableStringFieldUpdateOperationsInput | string | null
    nickname?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    date_of_birth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nationality?: NullableStringFieldUpdateOperationsInput | string | null
    national_id?: NullableStringFieldUpdateOperationsInput | string | null
    religion?: NullableStringFieldUpdateOperationsInput | string | null
    blood_type?: NullableStringFieldUpdateOperationsInput | string | null
    marital_status?: NullableStringFieldUpdateOperationsInput | string | null
    tax_id?: NullableStringFieldUpdateOperationsInput | string | null
    passport_number?: NullableStringFieldUpdateOperationsInput | string | null
    photo_url?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    personal_email?: NullableStringFieldUpdateOperationsInput | string | null
    business_phone?: NullableStringFieldUpdateOperationsInput | string | null
    personal_mobile?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    employment?: EmploymentUpdateOneWithoutEmployeeNestedInput
    addresses?: AddressUpdateManyWithoutEmployeeNestedInput
    emergency_contacts?: EmergencyContactUpdateManyWithoutEmployeeNestedInput
    work_permits?: WorkPermitUpdateManyWithoutEmployeeNestedInput
    audit_logs?: AuditLogUpdateManyWithoutEmployeeNestedInput
  }

  export type EmployeeUncheckedUpdateWithoutDependentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    employee_id?: StringFieldUpdateOperationsInput | string
    first_name_en?: NullableStringFieldUpdateOperationsInput | string | null
    first_name_th?: NullableStringFieldUpdateOperationsInput | string | null
    last_name_en?: NullableStringFieldUpdateOperationsInput | string | null
    last_name_th?: NullableStringFieldUpdateOperationsInput | string | null
    nickname?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    date_of_birth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nationality?: NullableStringFieldUpdateOperationsInput | string | null
    national_id?: NullableStringFieldUpdateOperationsInput | string | null
    religion?: NullableStringFieldUpdateOperationsInput | string | null
    blood_type?: NullableStringFieldUpdateOperationsInput | string | null
    marital_status?: NullableStringFieldUpdateOperationsInput | string | null
    tax_id?: NullableStringFieldUpdateOperationsInput | string | null
    passport_number?: NullableStringFieldUpdateOperationsInput | string | null
    photo_url?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    personal_email?: NullableStringFieldUpdateOperationsInput | string | null
    business_phone?: NullableStringFieldUpdateOperationsInput | string | null
    personal_mobile?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    employment?: EmploymentUncheckedUpdateOneWithoutEmployeeNestedInput
    addresses?: AddressUncheckedUpdateManyWithoutEmployeeNestedInput
    emergency_contacts?: EmergencyContactUncheckedUpdateManyWithoutEmployeeNestedInput
    work_permits?: WorkPermitUncheckedUpdateManyWithoutEmployeeNestedInput
    audit_logs?: AuditLogUncheckedUpdateManyWithoutEmployeeNestedInput
  }

  export type EmployeeCreateWithoutWork_permitsInput = {
    id?: string
    employee_id: string
    first_name_en?: string | null
    first_name_th?: string | null
    last_name_en?: string | null
    last_name_th?: string | null
    nickname?: string | null
    gender?: string | null
    date_of_birth?: Date | string | null
    nationality?: string | null
    national_id?: string | null
    religion?: string | null
    blood_type?: string | null
    marital_status?: string | null
    tax_id?: string | null
    passport_number?: string | null
    photo_url?: string | null
    email?: string | null
    personal_email?: string | null
    business_phone?: string | null
    personal_mobile?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    employment?: EmploymentCreateNestedOneWithoutEmployeeInput
    addresses?: AddressCreateNestedManyWithoutEmployeeInput
    emergency_contacts?: EmergencyContactCreateNestedManyWithoutEmployeeInput
    dependents?: DependentCreateNestedManyWithoutEmployeeInput
    audit_logs?: AuditLogCreateNestedManyWithoutEmployeeInput
  }

  export type EmployeeUncheckedCreateWithoutWork_permitsInput = {
    id?: string
    employee_id: string
    first_name_en?: string | null
    first_name_th?: string | null
    last_name_en?: string | null
    last_name_th?: string | null
    nickname?: string | null
    gender?: string | null
    date_of_birth?: Date | string | null
    nationality?: string | null
    national_id?: string | null
    religion?: string | null
    blood_type?: string | null
    marital_status?: string | null
    tax_id?: string | null
    passport_number?: string | null
    photo_url?: string | null
    email?: string | null
    personal_email?: string | null
    business_phone?: string | null
    personal_mobile?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    employment?: EmploymentUncheckedCreateNestedOneWithoutEmployeeInput
    addresses?: AddressUncheckedCreateNestedManyWithoutEmployeeInput
    emergency_contacts?: EmergencyContactUncheckedCreateNestedManyWithoutEmployeeInput
    dependents?: DependentUncheckedCreateNestedManyWithoutEmployeeInput
    audit_logs?: AuditLogUncheckedCreateNestedManyWithoutEmployeeInput
  }

  export type EmployeeCreateOrConnectWithoutWork_permitsInput = {
    where: EmployeeWhereUniqueInput
    create: XOR<EmployeeCreateWithoutWork_permitsInput, EmployeeUncheckedCreateWithoutWork_permitsInput>
  }

  export type EmployeeUpsertWithoutWork_permitsInput = {
    update: XOR<EmployeeUpdateWithoutWork_permitsInput, EmployeeUncheckedUpdateWithoutWork_permitsInput>
    create: XOR<EmployeeCreateWithoutWork_permitsInput, EmployeeUncheckedCreateWithoutWork_permitsInput>
    where?: EmployeeWhereInput
  }

  export type EmployeeUpdateToOneWithWhereWithoutWork_permitsInput = {
    where?: EmployeeWhereInput
    data: XOR<EmployeeUpdateWithoutWork_permitsInput, EmployeeUncheckedUpdateWithoutWork_permitsInput>
  }

  export type EmployeeUpdateWithoutWork_permitsInput = {
    id?: StringFieldUpdateOperationsInput | string
    employee_id?: StringFieldUpdateOperationsInput | string
    first_name_en?: NullableStringFieldUpdateOperationsInput | string | null
    first_name_th?: NullableStringFieldUpdateOperationsInput | string | null
    last_name_en?: NullableStringFieldUpdateOperationsInput | string | null
    last_name_th?: NullableStringFieldUpdateOperationsInput | string | null
    nickname?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    date_of_birth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nationality?: NullableStringFieldUpdateOperationsInput | string | null
    national_id?: NullableStringFieldUpdateOperationsInput | string | null
    religion?: NullableStringFieldUpdateOperationsInput | string | null
    blood_type?: NullableStringFieldUpdateOperationsInput | string | null
    marital_status?: NullableStringFieldUpdateOperationsInput | string | null
    tax_id?: NullableStringFieldUpdateOperationsInput | string | null
    passport_number?: NullableStringFieldUpdateOperationsInput | string | null
    photo_url?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    personal_email?: NullableStringFieldUpdateOperationsInput | string | null
    business_phone?: NullableStringFieldUpdateOperationsInput | string | null
    personal_mobile?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    employment?: EmploymentUpdateOneWithoutEmployeeNestedInput
    addresses?: AddressUpdateManyWithoutEmployeeNestedInput
    emergency_contacts?: EmergencyContactUpdateManyWithoutEmployeeNestedInput
    dependents?: DependentUpdateManyWithoutEmployeeNestedInput
    audit_logs?: AuditLogUpdateManyWithoutEmployeeNestedInput
  }

  export type EmployeeUncheckedUpdateWithoutWork_permitsInput = {
    id?: StringFieldUpdateOperationsInput | string
    employee_id?: StringFieldUpdateOperationsInput | string
    first_name_en?: NullableStringFieldUpdateOperationsInput | string | null
    first_name_th?: NullableStringFieldUpdateOperationsInput | string | null
    last_name_en?: NullableStringFieldUpdateOperationsInput | string | null
    last_name_th?: NullableStringFieldUpdateOperationsInput | string | null
    nickname?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    date_of_birth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nationality?: NullableStringFieldUpdateOperationsInput | string | null
    national_id?: NullableStringFieldUpdateOperationsInput | string | null
    religion?: NullableStringFieldUpdateOperationsInput | string | null
    blood_type?: NullableStringFieldUpdateOperationsInput | string | null
    marital_status?: NullableStringFieldUpdateOperationsInput | string | null
    tax_id?: NullableStringFieldUpdateOperationsInput | string | null
    passport_number?: NullableStringFieldUpdateOperationsInput | string | null
    photo_url?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    personal_email?: NullableStringFieldUpdateOperationsInput | string | null
    business_phone?: NullableStringFieldUpdateOperationsInput | string | null
    personal_mobile?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    employment?: EmploymentUncheckedUpdateOneWithoutEmployeeNestedInput
    addresses?: AddressUncheckedUpdateManyWithoutEmployeeNestedInput
    emergency_contacts?: EmergencyContactUncheckedUpdateManyWithoutEmployeeNestedInput
    dependents?: DependentUncheckedUpdateManyWithoutEmployeeNestedInput
    audit_logs?: AuditLogUncheckedUpdateManyWithoutEmployeeNestedInput
  }

  export type EmployeeCreateWithoutAudit_logsInput = {
    id?: string
    employee_id: string
    first_name_en?: string | null
    first_name_th?: string | null
    last_name_en?: string | null
    last_name_th?: string | null
    nickname?: string | null
    gender?: string | null
    date_of_birth?: Date | string | null
    nationality?: string | null
    national_id?: string | null
    religion?: string | null
    blood_type?: string | null
    marital_status?: string | null
    tax_id?: string | null
    passport_number?: string | null
    photo_url?: string | null
    email?: string | null
    personal_email?: string | null
    business_phone?: string | null
    personal_mobile?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    employment?: EmploymentCreateNestedOneWithoutEmployeeInput
    addresses?: AddressCreateNestedManyWithoutEmployeeInput
    emergency_contacts?: EmergencyContactCreateNestedManyWithoutEmployeeInput
    dependents?: DependentCreateNestedManyWithoutEmployeeInput
    work_permits?: WorkPermitCreateNestedManyWithoutEmployeeInput
  }

  export type EmployeeUncheckedCreateWithoutAudit_logsInput = {
    id?: string
    employee_id: string
    first_name_en?: string | null
    first_name_th?: string | null
    last_name_en?: string | null
    last_name_th?: string | null
    nickname?: string | null
    gender?: string | null
    date_of_birth?: Date | string | null
    nationality?: string | null
    national_id?: string | null
    religion?: string | null
    blood_type?: string | null
    marital_status?: string | null
    tax_id?: string | null
    passport_number?: string | null
    photo_url?: string | null
    email?: string | null
    personal_email?: string | null
    business_phone?: string | null
    personal_mobile?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    employment?: EmploymentUncheckedCreateNestedOneWithoutEmployeeInput
    addresses?: AddressUncheckedCreateNestedManyWithoutEmployeeInput
    emergency_contacts?: EmergencyContactUncheckedCreateNestedManyWithoutEmployeeInput
    dependents?: DependentUncheckedCreateNestedManyWithoutEmployeeInput
    work_permits?: WorkPermitUncheckedCreateNestedManyWithoutEmployeeInput
  }

  export type EmployeeCreateOrConnectWithoutAudit_logsInput = {
    where: EmployeeWhereUniqueInput
    create: XOR<EmployeeCreateWithoutAudit_logsInput, EmployeeUncheckedCreateWithoutAudit_logsInput>
  }

  export type EmployeeUpsertWithoutAudit_logsInput = {
    update: XOR<EmployeeUpdateWithoutAudit_logsInput, EmployeeUncheckedUpdateWithoutAudit_logsInput>
    create: XOR<EmployeeCreateWithoutAudit_logsInput, EmployeeUncheckedCreateWithoutAudit_logsInput>
    where?: EmployeeWhereInput
  }

  export type EmployeeUpdateToOneWithWhereWithoutAudit_logsInput = {
    where?: EmployeeWhereInput
    data: XOR<EmployeeUpdateWithoutAudit_logsInput, EmployeeUncheckedUpdateWithoutAudit_logsInput>
  }

  export type EmployeeUpdateWithoutAudit_logsInput = {
    id?: StringFieldUpdateOperationsInput | string
    employee_id?: StringFieldUpdateOperationsInput | string
    first_name_en?: NullableStringFieldUpdateOperationsInput | string | null
    first_name_th?: NullableStringFieldUpdateOperationsInput | string | null
    last_name_en?: NullableStringFieldUpdateOperationsInput | string | null
    last_name_th?: NullableStringFieldUpdateOperationsInput | string | null
    nickname?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    date_of_birth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nationality?: NullableStringFieldUpdateOperationsInput | string | null
    national_id?: NullableStringFieldUpdateOperationsInput | string | null
    religion?: NullableStringFieldUpdateOperationsInput | string | null
    blood_type?: NullableStringFieldUpdateOperationsInput | string | null
    marital_status?: NullableStringFieldUpdateOperationsInput | string | null
    tax_id?: NullableStringFieldUpdateOperationsInput | string | null
    passport_number?: NullableStringFieldUpdateOperationsInput | string | null
    photo_url?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    personal_email?: NullableStringFieldUpdateOperationsInput | string | null
    business_phone?: NullableStringFieldUpdateOperationsInput | string | null
    personal_mobile?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    employment?: EmploymentUpdateOneWithoutEmployeeNestedInput
    addresses?: AddressUpdateManyWithoutEmployeeNestedInput
    emergency_contacts?: EmergencyContactUpdateManyWithoutEmployeeNestedInput
    dependents?: DependentUpdateManyWithoutEmployeeNestedInput
    work_permits?: WorkPermitUpdateManyWithoutEmployeeNestedInput
  }

  export type EmployeeUncheckedUpdateWithoutAudit_logsInput = {
    id?: StringFieldUpdateOperationsInput | string
    employee_id?: StringFieldUpdateOperationsInput | string
    first_name_en?: NullableStringFieldUpdateOperationsInput | string | null
    first_name_th?: NullableStringFieldUpdateOperationsInput | string | null
    last_name_en?: NullableStringFieldUpdateOperationsInput | string | null
    last_name_th?: NullableStringFieldUpdateOperationsInput | string | null
    nickname?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    date_of_birth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nationality?: NullableStringFieldUpdateOperationsInput | string | null
    national_id?: NullableStringFieldUpdateOperationsInput | string | null
    religion?: NullableStringFieldUpdateOperationsInput | string | null
    blood_type?: NullableStringFieldUpdateOperationsInput | string | null
    marital_status?: NullableStringFieldUpdateOperationsInput | string | null
    tax_id?: NullableStringFieldUpdateOperationsInput | string | null
    passport_number?: NullableStringFieldUpdateOperationsInput | string | null
    photo_url?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    personal_email?: NullableStringFieldUpdateOperationsInput | string | null
    business_phone?: NullableStringFieldUpdateOperationsInput | string | null
    personal_mobile?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    employment?: EmploymentUncheckedUpdateOneWithoutEmployeeNestedInput
    addresses?: AddressUncheckedUpdateManyWithoutEmployeeNestedInput
    emergency_contacts?: EmergencyContactUncheckedUpdateManyWithoutEmployeeNestedInput
    dependents?: DependentUncheckedUpdateManyWithoutEmployeeNestedInput
    work_permits?: WorkPermitUncheckedUpdateManyWithoutEmployeeNestedInput
  }

  export type AddressCreateManyEmployeeInput = {
    id?: string
    address_type?: string | null
    address_line_1?: string | null
    address_line_2?: string | null
    district?: string | null
    sub_district?: string | null
    province?: string | null
    postal_code?: string | null
    country?: string
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type EmergencyContactCreateManyEmployeeInput = {
    id?: string
    name: string
    relationship: string
    phone: string
    email?: string | null
    address?: string | null
    is_primary?: boolean
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type DependentCreateManyEmployeeInput = {
    id?: string
    name: string
    relationship_type: string
    date_of_birth?: Date | string | null
    gender?: string | null
    national_id?: string | null
    is_tax_deductible?: boolean
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type WorkPermitCreateManyEmployeeInput = {
    id?: string
    permit_type: string
    permit_number: string
    issue_date: Date | string
    expiry_date: Date | string
    issuing_country: string
    status?: string
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type AuditLogCreateManyEmployeeInput = {
    id?: string
    action: string
    entity_type: string
    entity_id?: string | null
    changes?: NullableJsonNullValueInput | InputJsonValue
    performed_by: string
    changed_at?: Date | string
  }

  export type AddressUpdateWithoutEmployeeInput = {
    id?: StringFieldUpdateOperationsInput | string
    address_type?: NullableStringFieldUpdateOperationsInput | string | null
    address_line_1?: NullableStringFieldUpdateOperationsInput | string | null
    address_line_2?: NullableStringFieldUpdateOperationsInput | string | null
    district?: NullableStringFieldUpdateOperationsInput | string | null
    sub_district?: NullableStringFieldUpdateOperationsInput | string | null
    province?: NullableStringFieldUpdateOperationsInput | string | null
    postal_code?: NullableStringFieldUpdateOperationsInput | string | null
    country?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AddressUncheckedUpdateWithoutEmployeeInput = {
    id?: StringFieldUpdateOperationsInput | string
    address_type?: NullableStringFieldUpdateOperationsInput | string | null
    address_line_1?: NullableStringFieldUpdateOperationsInput | string | null
    address_line_2?: NullableStringFieldUpdateOperationsInput | string | null
    district?: NullableStringFieldUpdateOperationsInput | string | null
    sub_district?: NullableStringFieldUpdateOperationsInput | string | null
    province?: NullableStringFieldUpdateOperationsInput | string | null
    postal_code?: NullableStringFieldUpdateOperationsInput | string | null
    country?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AddressUncheckedUpdateManyWithoutEmployeeInput = {
    id?: StringFieldUpdateOperationsInput | string
    address_type?: NullableStringFieldUpdateOperationsInput | string | null
    address_line_1?: NullableStringFieldUpdateOperationsInput | string | null
    address_line_2?: NullableStringFieldUpdateOperationsInput | string | null
    district?: NullableStringFieldUpdateOperationsInput | string | null
    sub_district?: NullableStringFieldUpdateOperationsInput | string | null
    province?: NullableStringFieldUpdateOperationsInput | string | null
    postal_code?: NullableStringFieldUpdateOperationsInput | string | null
    country?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmergencyContactUpdateWithoutEmployeeInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    relationship?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    is_primary?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmergencyContactUncheckedUpdateWithoutEmployeeInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    relationship?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    is_primary?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmergencyContactUncheckedUpdateManyWithoutEmployeeInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    relationship?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    is_primary?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DependentUpdateWithoutEmployeeInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    relationship_type?: StringFieldUpdateOperationsInput | string
    date_of_birth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    national_id?: NullableStringFieldUpdateOperationsInput | string | null
    is_tax_deductible?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DependentUncheckedUpdateWithoutEmployeeInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    relationship_type?: StringFieldUpdateOperationsInput | string
    date_of_birth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    national_id?: NullableStringFieldUpdateOperationsInput | string | null
    is_tax_deductible?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DependentUncheckedUpdateManyWithoutEmployeeInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    relationship_type?: StringFieldUpdateOperationsInput | string
    date_of_birth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    national_id?: NullableStringFieldUpdateOperationsInput | string | null
    is_tax_deductible?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WorkPermitUpdateWithoutEmployeeInput = {
    id?: StringFieldUpdateOperationsInput | string
    permit_type?: StringFieldUpdateOperationsInput | string
    permit_number?: StringFieldUpdateOperationsInput | string
    issue_date?: DateTimeFieldUpdateOperationsInput | Date | string
    expiry_date?: DateTimeFieldUpdateOperationsInput | Date | string
    issuing_country?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WorkPermitUncheckedUpdateWithoutEmployeeInput = {
    id?: StringFieldUpdateOperationsInput | string
    permit_type?: StringFieldUpdateOperationsInput | string
    permit_number?: StringFieldUpdateOperationsInput | string
    issue_date?: DateTimeFieldUpdateOperationsInput | Date | string
    expiry_date?: DateTimeFieldUpdateOperationsInput | Date | string
    issuing_country?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WorkPermitUncheckedUpdateManyWithoutEmployeeInput = {
    id?: StringFieldUpdateOperationsInput | string
    permit_type?: StringFieldUpdateOperationsInput | string
    permit_number?: StringFieldUpdateOperationsInput | string
    issue_date?: DateTimeFieldUpdateOperationsInput | Date | string
    expiry_date?: DateTimeFieldUpdateOperationsInput | Date | string
    issuing_country?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogUpdateWithoutEmployeeInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    entity_type?: StringFieldUpdateOperationsInput | string
    entity_id?: NullableStringFieldUpdateOperationsInput | string | null
    changes?: NullableJsonNullValueInput | InputJsonValue
    performed_by?: StringFieldUpdateOperationsInput | string
    changed_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogUncheckedUpdateWithoutEmployeeInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    entity_type?: StringFieldUpdateOperationsInput | string
    entity_id?: NullableStringFieldUpdateOperationsInput | string | null
    changes?: NullableJsonNullValueInput | InputJsonValue
    performed_by?: StringFieldUpdateOperationsInput | string
    changed_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogUncheckedUpdateManyWithoutEmployeeInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    entity_type?: StringFieldUpdateOperationsInput | string
    entity_id?: NullableStringFieldUpdateOperationsInput | string | null
    changes?: NullableJsonNullValueInput | InputJsonValue
    performed_by?: StringFieldUpdateOperationsInput | string
    changed_at?: DateTimeFieldUpdateOperationsInput | Date | string
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