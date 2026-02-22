
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
 * Model ClaimRequest
 * 
 */
export type ClaimRequest = $Result.DefaultSelection<Prisma.$ClaimRequestPayload>
/**
 * Model PolicyRule
 * 
 */
export type PolicyRule = $Result.DefaultSelection<Prisma.$PolicyRulePayload>
/**
 * Model OCRResult
 * 
 */
export type OCRResult = $Result.DefaultSelection<Prisma.$OCRResultPayload>
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
 * // Fetch zero or more ClaimRequests
 * const claimRequests = await prisma.claimRequest.findMany()
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
   * // Fetch zero or more ClaimRequests
   * const claimRequests = await prisma.claimRequest.findMany()
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
   * `prisma.claimRequest`: Exposes CRUD operations for the **ClaimRequest** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ClaimRequests
    * const claimRequests = await prisma.claimRequest.findMany()
    * ```
    */
  get claimRequest(): Prisma.ClaimRequestDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.policyRule`: Exposes CRUD operations for the **PolicyRule** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PolicyRules
    * const policyRules = await prisma.policyRule.findMany()
    * ```
    */
  get policyRule(): Prisma.PolicyRuleDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.oCRResult`: Exposes CRUD operations for the **OCRResult** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more OCRResults
    * const oCRResults = await prisma.oCRResult.findMany()
    * ```
    */
  get oCRResult(): Prisma.OCRResultDelegate<ExtArgs, ClientOptions>;

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
    ClaimRequest: 'ClaimRequest',
    PolicyRule: 'PolicyRule',
    OCRResult: 'OCRResult',
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
      modelProps: "claimRequest" | "policyRule" | "oCRResult" | "auditLog"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      ClaimRequest: {
        payload: Prisma.$ClaimRequestPayload<ExtArgs>
        fields: Prisma.ClaimRequestFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ClaimRequestFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClaimRequestPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ClaimRequestFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClaimRequestPayload>
          }
          findFirst: {
            args: Prisma.ClaimRequestFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClaimRequestPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ClaimRequestFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClaimRequestPayload>
          }
          findMany: {
            args: Prisma.ClaimRequestFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClaimRequestPayload>[]
          }
          create: {
            args: Prisma.ClaimRequestCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClaimRequestPayload>
          }
          createMany: {
            args: Prisma.ClaimRequestCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ClaimRequestCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClaimRequestPayload>[]
          }
          delete: {
            args: Prisma.ClaimRequestDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClaimRequestPayload>
          }
          update: {
            args: Prisma.ClaimRequestUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClaimRequestPayload>
          }
          deleteMany: {
            args: Prisma.ClaimRequestDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ClaimRequestUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ClaimRequestUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClaimRequestPayload>[]
          }
          upsert: {
            args: Prisma.ClaimRequestUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClaimRequestPayload>
          }
          aggregate: {
            args: Prisma.ClaimRequestAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateClaimRequest>
          }
          groupBy: {
            args: Prisma.ClaimRequestGroupByArgs<ExtArgs>
            result: $Utils.Optional<ClaimRequestGroupByOutputType>[]
          }
          count: {
            args: Prisma.ClaimRequestCountArgs<ExtArgs>
            result: $Utils.Optional<ClaimRequestCountAggregateOutputType> | number
          }
        }
      }
      PolicyRule: {
        payload: Prisma.$PolicyRulePayload<ExtArgs>
        fields: Prisma.PolicyRuleFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PolicyRuleFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PolicyRulePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PolicyRuleFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PolicyRulePayload>
          }
          findFirst: {
            args: Prisma.PolicyRuleFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PolicyRulePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PolicyRuleFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PolicyRulePayload>
          }
          findMany: {
            args: Prisma.PolicyRuleFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PolicyRulePayload>[]
          }
          create: {
            args: Prisma.PolicyRuleCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PolicyRulePayload>
          }
          createMany: {
            args: Prisma.PolicyRuleCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PolicyRuleCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PolicyRulePayload>[]
          }
          delete: {
            args: Prisma.PolicyRuleDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PolicyRulePayload>
          }
          update: {
            args: Prisma.PolicyRuleUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PolicyRulePayload>
          }
          deleteMany: {
            args: Prisma.PolicyRuleDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PolicyRuleUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PolicyRuleUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PolicyRulePayload>[]
          }
          upsert: {
            args: Prisma.PolicyRuleUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PolicyRulePayload>
          }
          aggregate: {
            args: Prisma.PolicyRuleAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePolicyRule>
          }
          groupBy: {
            args: Prisma.PolicyRuleGroupByArgs<ExtArgs>
            result: $Utils.Optional<PolicyRuleGroupByOutputType>[]
          }
          count: {
            args: Prisma.PolicyRuleCountArgs<ExtArgs>
            result: $Utils.Optional<PolicyRuleCountAggregateOutputType> | number
          }
        }
      }
      OCRResult: {
        payload: Prisma.$OCRResultPayload<ExtArgs>
        fields: Prisma.OCRResultFieldRefs
        operations: {
          findUnique: {
            args: Prisma.OCRResultFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OCRResultPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.OCRResultFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OCRResultPayload>
          }
          findFirst: {
            args: Prisma.OCRResultFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OCRResultPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.OCRResultFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OCRResultPayload>
          }
          findMany: {
            args: Prisma.OCRResultFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OCRResultPayload>[]
          }
          create: {
            args: Prisma.OCRResultCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OCRResultPayload>
          }
          createMany: {
            args: Prisma.OCRResultCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.OCRResultCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OCRResultPayload>[]
          }
          delete: {
            args: Prisma.OCRResultDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OCRResultPayload>
          }
          update: {
            args: Prisma.OCRResultUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OCRResultPayload>
          }
          deleteMany: {
            args: Prisma.OCRResultDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.OCRResultUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.OCRResultUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OCRResultPayload>[]
          }
          upsert: {
            args: Prisma.OCRResultUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OCRResultPayload>
          }
          aggregate: {
            args: Prisma.OCRResultAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateOCRResult>
          }
          groupBy: {
            args: Prisma.OCRResultGroupByArgs<ExtArgs>
            result: $Utils.Optional<OCRResultGroupByOutputType>[]
          }
          count: {
            args: Prisma.OCRResultCountArgs<ExtArgs>
            result: $Utils.Optional<OCRResultCountAggregateOutputType> | number
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
    claimRequest?: ClaimRequestOmit
    policyRule?: PolicyRuleOmit
    oCRResult?: OCRResultOmit
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
   * Count Type PolicyRuleCountOutputType
   */

  export type PolicyRuleCountOutputType = {
    claims: number
  }

  export type PolicyRuleCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    claims?: boolean | PolicyRuleCountOutputTypeCountClaimsArgs
  }

  // Custom InputTypes
  /**
   * PolicyRuleCountOutputType without action
   */
  export type PolicyRuleCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PolicyRuleCountOutputType
     */
    select?: PolicyRuleCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PolicyRuleCountOutputType without action
   */
  export type PolicyRuleCountOutputTypeCountClaimsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ClaimRequestWhereInput
  }


  /**
   * Models
   */

  /**
   * Model ClaimRequest
   */

  export type AggregateClaimRequest = {
    _count: ClaimRequestCountAggregateOutputType | null
    _avg: ClaimRequestAvgAggregateOutputType | null
    _sum: ClaimRequestSumAggregateOutputType | null
    _min: ClaimRequestMinAggregateOutputType | null
    _max: ClaimRequestMaxAggregateOutputType | null
  }

  export type ClaimRequestAvgAggregateOutputType = {
    amount: Decimal | null
    ocr_confidence: number | null
  }

  export type ClaimRequestSumAggregateOutputType = {
    amount: Decimal | null
    ocr_confidence: number | null
  }

  export type ClaimRequestMinAggregateOutputType = {
    id: string | null
    employee_id: string | null
    claim_type: string | null
    amount: Decimal | null
    currency: string | null
    receipt_date: Date | null
    receipt_url: string | null
    ocr_result_id: string | null
    ocr_confidence: number | null
    policy_rule_id: string | null
    status: string | null
    rejection_reason: string | null
    submitted_at: Date | null
    approved_at: Date | null
    approved_by: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type ClaimRequestMaxAggregateOutputType = {
    id: string | null
    employee_id: string | null
    claim_type: string | null
    amount: Decimal | null
    currency: string | null
    receipt_date: Date | null
    receipt_url: string | null
    ocr_result_id: string | null
    ocr_confidence: number | null
    policy_rule_id: string | null
    status: string | null
    rejection_reason: string | null
    submitted_at: Date | null
    approved_at: Date | null
    approved_by: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type ClaimRequestCountAggregateOutputType = {
    id: number
    employee_id: number
    claim_type: number
    amount: number
    currency: number
    receipt_date: number
    receipt_url: number
    ocr_result_id: number
    ocr_confidence: number
    policy_rule_id: number
    status: number
    rejection_reason: number
    submitted_at: number
    approved_at: number
    approved_by: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type ClaimRequestAvgAggregateInputType = {
    amount?: true
    ocr_confidence?: true
  }

  export type ClaimRequestSumAggregateInputType = {
    amount?: true
    ocr_confidence?: true
  }

  export type ClaimRequestMinAggregateInputType = {
    id?: true
    employee_id?: true
    claim_type?: true
    amount?: true
    currency?: true
    receipt_date?: true
    receipt_url?: true
    ocr_result_id?: true
    ocr_confidence?: true
    policy_rule_id?: true
    status?: true
    rejection_reason?: true
    submitted_at?: true
    approved_at?: true
    approved_by?: true
    created_at?: true
    updated_at?: true
  }

  export type ClaimRequestMaxAggregateInputType = {
    id?: true
    employee_id?: true
    claim_type?: true
    amount?: true
    currency?: true
    receipt_date?: true
    receipt_url?: true
    ocr_result_id?: true
    ocr_confidence?: true
    policy_rule_id?: true
    status?: true
    rejection_reason?: true
    submitted_at?: true
    approved_at?: true
    approved_by?: true
    created_at?: true
    updated_at?: true
  }

  export type ClaimRequestCountAggregateInputType = {
    id?: true
    employee_id?: true
    claim_type?: true
    amount?: true
    currency?: true
    receipt_date?: true
    receipt_url?: true
    ocr_result_id?: true
    ocr_confidence?: true
    policy_rule_id?: true
    status?: true
    rejection_reason?: true
    submitted_at?: true
    approved_at?: true
    approved_by?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type ClaimRequestAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ClaimRequest to aggregate.
     */
    where?: ClaimRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ClaimRequests to fetch.
     */
    orderBy?: ClaimRequestOrderByWithRelationInput | ClaimRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ClaimRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ClaimRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ClaimRequests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ClaimRequests
    **/
    _count?: true | ClaimRequestCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ClaimRequestAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ClaimRequestSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ClaimRequestMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ClaimRequestMaxAggregateInputType
  }

  export type GetClaimRequestAggregateType<T extends ClaimRequestAggregateArgs> = {
        [P in keyof T & keyof AggregateClaimRequest]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateClaimRequest[P]>
      : GetScalarType<T[P], AggregateClaimRequest[P]>
  }




  export type ClaimRequestGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ClaimRequestWhereInput
    orderBy?: ClaimRequestOrderByWithAggregationInput | ClaimRequestOrderByWithAggregationInput[]
    by: ClaimRequestScalarFieldEnum[] | ClaimRequestScalarFieldEnum
    having?: ClaimRequestScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ClaimRequestCountAggregateInputType | true
    _avg?: ClaimRequestAvgAggregateInputType
    _sum?: ClaimRequestSumAggregateInputType
    _min?: ClaimRequestMinAggregateInputType
    _max?: ClaimRequestMaxAggregateInputType
  }

  export type ClaimRequestGroupByOutputType = {
    id: string
    employee_id: string
    claim_type: string
    amount: Decimal
    currency: string
    receipt_date: Date
    receipt_url: string | null
    ocr_result_id: string | null
    ocr_confidence: number | null
    policy_rule_id: string | null
    status: string
    rejection_reason: string | null
    submitted_at: Date | null
    approved_at: Date | null
    approved_by: string | null
    created_at: Date
    updated_at: Date
    _count: ClaimRequestCountAggregateOutputType | null
    _avg: ClaimRequestAvgAggregateOutputType | null
    _sum: ClaimRequestSumAggregateOutputType | null
    _min: ClaimRequestMinAggregateOutputType | null
    _max: ClaimRequestMaxAggregateOutputType | null
  }

  type GetClaimRequestGroupByPayload<T extends ClaimRequestGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ClaimRequestGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ClaimRequestGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ClaimRequestGroupByOutputType[P]>
            : GetScalarType<T[P], ClaimRequestGroupByOutputType[P]>
        }
      >
    >


  export type ClaimRequestSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    employee_id?: boolean
    claim_type?: boolean
    amount?: boolean
    currency?: boolean
    receipt_date?: boolean
    receipt_url?: boolean
    ocr_result_id?: boolean
    ocr_confidence?: boolean
    policy_rule_id?: boolean
    status?: boolean
    rejection_reason?: boolean
    submitted_at?: boolean
    approved_at?: boolean
    approved_by?: boolean
    created_at?: boolean
    updated_at?: boolean
    ocr_result?: boolean | ClaimRequest$ocr_resultArgs<ExtArgs>
    policy_rule?: boolean | ClaimRequest$policy_ruleArgs<ExtArgs>
  }, ExtArgs["result"]["claimRequest"]>

  export type ClaimRequestSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    employee_id?: boolean
    claim_type?: boolean
    amount?: boolean
    currency?: boolean
    receipt_date?: boolean
    receipt_url?: boolean
    ocr_result_id?: boolean
    ocr_confidence?: boolean
    policy_rule_id?: boolean
    status?: boolean
    rejection_reason?: boolean
    submitted_at?: boolean
    approved_at?: boolean
    approved_by?: boolean
    created_at?: boolean
    updated_at?: boolean
    policy_rule?: boolean | ClaimRequest$policy_ruleArgs<ExtArgs>
  }, ExtArgs["result"]["claimRequest"]>

  export type ClaimRequestSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    employee_id?: boolean
    claim_type?: boolean
    amount?: boolean
    currency?: boolean
    receipt_date?: boolean
    receipt_url?: boolean
    ocr_result_id?: boolean
    ocr_confidence?: boolean
    policy_rule_id?: boolean
    status?: boolean
    rejection_reason?: boolean
    submitted_at?: boolean
    approved_at?: boolean
    approved_by?: boolean
    created_at?: boolean
    updated_at?: boolean
    policy_rule?: boolean | ClaimRequest$policy_ruleArgs<ExtArgs>
  }, ExtArgs["result"]["claimRequest"]>

  export type ClaimRequestSelectScalar = {
    id?: boolean
    employee_id?: boolean
    claim_type?: boolean
    amount?: boolean
    currency?: boolean
    receipt_date?: boolean
    receipt_url?: boolean
    ocr_result_id?: boolean
    ocr_confidence?: boolean
    policy_rule_id?: boolean
    status?: boolean
    rejection_reason?: boolean
    submitted_at?: boolean
    approved_at?: boolean
    approved_by?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type ClaimRequestOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "employee_id" | "claim_type" | "amount" | "currency" | "receipt_date" | "receipt_url" | "ocr_result_id" | "ocr_confidence" | "policy_rule_id" | "status" | "rejection_reason" | "submitted_at" | "approved_at" | "approved_by" | "created_at" | "updated_at", ExtArgs["result"]["claimRequest"]>
  export type ClaimRequestInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    ocr_result?: boolean | ClaimRequest$ocr_resultArgs<ExtArgs>
    policy_rule?: boolean | ClaimRequest$policy_ruleArgs<ExtArgs>
  }
  export type ClaimRequestIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    policy_rule?: boolean | ClaimRequest$policy_ruleArgs<ExtArgs>
  }
  export type ClaimRequestIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    policy_rule?: boolean | ClaimRequest$policy_ruleArgs<ExtArgs>
  }

  export type $ClaimRequestPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ClaimRequest"
    objects: {
      ocr_result: Prisma.$OCRResultPayload<ExtArgs> | null
      policy_rule: Prisma.$PolicyRulePayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      employee_id: string
      claim_type: string
      amount: Prisma.Decimal
      currency: string
      receipt_date: Date
      receipt_url: string | null
      ocr_result_id: string | null
      ocr_confidence: number | null
      policy_rule_id: string | null
      status: string
      rejection_reason: string | null
      submitted_at: Date | null
      approved_at: Date | null
      approved_by: string | null
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["claimRequest"]>
    composites: {}
  }

  type ClaimRequestGetPayload<S extends boolean | null | undefined | ClaimRequestDefaultArgs> = $Result.GetResult<Prisma.$ClaimRequestPayload, S>

  type ClaimRequestCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ClaimRequestFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ClaimRequestCountAggregateInputType | true
    }

  export interface ClaimRequestDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ClaimRequest'], meta: { name: 'ClaimRequest' } }
    /**
     * Find zero or one ClaimRequest that matches the filter.
     * @param {ClaimRequestFindUniqueArgs} args - Arguments to find a ClaimRequest
     * @example
     * // Get one ClaimRequest
     * const claimRequest = await prisma.claimRequest.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ClaimRequestFindUniqueArgs>(args: SelectSubset<T, ClaimRequestFindUniqueArgs<ExtArgs>>): Prisma__ClaimRequestClient<$Result.GetResult<Prisma.$ClaimRequestPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ClaimRequest that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ClaimRequestFindUniqueOrThrowArgs} args - Arguments to find a ClaimRequest
     * @example
     * // Get one ClaimRequest
     * const claimRequest = await prisma.claimRequest.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ClaimRequestFindUniqueOrThrowArgs>(args: SelectSubset<T, ClaimRequestFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ClaimRequestClient<$Result.GetResult<Prisma.$ClaimRequestPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ClaimRequest that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClaimRequestFindFirstArgs} args - Arguments to find a ClaimRequest
     * @example
     * // Get one ClaimRequest
     * const claimRequest = await prisma.claimRequest.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ClaimRequestFindFirstArgs>(args?: SelectSubset<T, ClaimRequestFindFirstArgs<ExtArgs>>): Prisma__ClaimRequestClient<$Result.GetResult<Prisma.$ClaimRequestPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ClaimRequest that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClaimRequestFindFirstOrThrowArgs} args - Arguments to find a ClaimRequest
     * @example
     * // Get one ClaimRequest
     * const claimRequest = await prisma.claimRequest.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ClaimRequestFindFirstOrThrowArgs>(args?: SelectSubset<T, ClaimRequestFindFirstOrThrowArgs<ExtArgs>>): Prisma__ClaimRequestClient<$Result.GetResult<Prisma.$ClaimRequestPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ClaimRequests that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClaimRequestFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ClaimRequests
     * const claimRequests = await prisma.claimRequest.findMany()
     * 
     * // Get first 10 ClaimRequests
     * const claimRequests = await prisma.claimRequest.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const claimRequestWithIdOnly = await prisma.claimRequest.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ClaimRequestFindManyArgs>(args?: SelectSubset<T, ClaimRequestFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClaimRequestPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ClaimRequest.
     * @param {ClaimRequestCreateArgs} args - Arguments to create a ClaimRequest.
     * @example
     * // Create one ClaimRequest
     * const ClaimRequest = await prisma.claimRequest.create({
     *   data: {
     *     // ... data to create a ClaimRequest
     *   }
     * })
     * 
     */
    create<T extends ClaimRequestCreateArgs>(args: SelectSubset<T, ClaimRequestCreateArgs<ExtArgs>>): Prisma__ClaimRequestClient<$Result.GetResult<Prisma.$ClaimRequestPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ClaimRequests.
     * @param {ClaimRequestCreateManyArgs} args - Arguments to create many ClaimRequests.
     * @example
     * // Create many ClaimRequests
     * const claimRequest = await prisma.claimRequest.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ClaimRequestCreateManyArgs>(args?: SelectSubset<T, ClaimRequestCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ClaimRequests and returns the data saved in the database.
     * @param {ClaimRequestCreateManyAndReturnArgs} args - Arguments to create many ClaimRequests.
     * @example
     * // Create many ClaimRequests
     * const claimRequest = await prisma.claimRequest.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ClaimRequests and only return the `id`
     * const claimRequestWithIdOnly = await prisma.claimRequest.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ClaimRequestCreateManyAndReturnArgs>(args?: SelectSubset<T, ClaimRequestCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClaimRequestPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ClaimRequest.
     * @param {ClaimRequestDeleteArgs} args - Arguments to delete one ClaimRequest.
     * @example
     * // Delete one ClaimRequest
     * const ClaimRequest = await prisma.claimRequest.delete({
     *   where: {
     *     // ... filter to delete one ClaimRequest
     *   }
     * })
     * 
     */
    delete<T extends ClaimRequestDeleteArgs>(args: SelectSubset<T, ClaimRequestDeleteArgs<ExtArgs>>): Prisma__ClaimRequestClient<$Result.GetResult<Prisma.$ClaimRequestPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ClaimRequest.
     * @param {ClaimRequestUpdateArgs} args - Arguments to update one ClaimRequest.
     * @example
     * // Update one ClaimRequest
     * const claimRequest = await prisma.claimRequest.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ClaimRequestUpdateArgs>(args: SelectSubset<T, ClaimRequestUpdateArgs<ExtArgs>>): Prisma__ClaimRequestClient<$Result.GetResult<Prisma.$ClaimRequestPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ClaimRequests.
     * @param {ClaimRequestDeleteManyArgs} args - Arguments to filter ClaimRequests to delete.
     * @example
     * // Delete a few ClaimRequests
     * const { count } = await prisma.claimRequest.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ClaimRequestDeleteManyArgs>(args?: SelectSubset<T, ClaimRequestDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ClaimRequests.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClaimRequestUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ClaimRequests
     * const claimRequest = await prisma.claimRequest.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ClaimRequestUpdateManyArgs>(args: SelectSubset<T, ClaimRequestUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ClaimRequests and returns the data updated in the database.
     * @param {ClaimRequestUpdateManyAndReturnArgs} args - Arguments to update many ClaimRequests.
     * @example
     * // Update many ClaimRequests
     * const claimRequest = await prisma.claimRequest.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ClaimRequests and only return the `id`
     * const claimRequestWithIdOnly = await prisma.claimRequest.updateManyAndReturn({
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
    updateManyAndReturn<T extends ClaimRequestUpdateManyAndReturnArgs>(args: SelectSubset<T, ClaimRequestUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClaimRequestPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ClaimRequest.
     * @param {ClaimRequestUpsertArgs} args - Arguments to update or create a ClaimRequest.
     * @example
     * // Update or create a ClaimRequest
     * const claimRequest = await prisma.claimRequest.upsert({
     *   create: {
     *     // ... data to create a ClaimRequest
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ClaimRequest we want to update
     *   }
     * })
     */
    upsert<T extends ClaimRequestUpsertArgs>(args: SelectSubset<T, ClaimRequestUpsertArgs<ExtArgs>>): Prisma__ClaimRequestClient<$Result.GetResult<Prisma.$ClaimRequestPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ClaimRequests.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClaimRequestCountArgs} args - Arguments to filter ClaimRequests to count.
     * @example
     * // Count the number of ClaimRequests
     * const count = await prisma.claimRequest.count({
     *   where: {
     *     // ... the filter for the ClaimRequests we want to count
     *   }
     * })
    **/
    count<T extends ClaimRequestCountArgs>(
      args?: Subset<T, ClaimRequestCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ClaimRequestCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ClaimRequest.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClaimRequestAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ClaimRequestAggregateArgs>(args: Subset<T, ClaimRequestAggregateArgs>): Prisma.PrismaPromise<GetClaimRequestAggregateType<T>>

    /**
     * Group by ClaimRequest.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClaimRequestGroupByArgs} args - Group by arguments.
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
      T extends ClaimRequestGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ClaimRequestGroupByArgs['orderBy'] }
        : { orderBy?: ClaimRequestGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ClaimRequestGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetClaimRequestGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ClaimRequest model
   */
  readonly fields: ClaimRequestFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ClaimRequest.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ClaimRequestClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    ocr_result<T extends ClaimRequest$ocr_resultArgs<ExtArgs> = {}>(args?: Subset<T, ClaimRequest$ocr_resultArgs<ExtArgs>>): Prisma__OCRResultClient<$Result.GetResult<Prisma.$OCRResultPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    policy_rule<T extends ClaimRequest$policy_ruleArgs<ExtArgs> = {}>(args?: Subset<T, ClaimRequest$policy_ruleArgs<ExtArgs>>): Prisma__PolicyRuleClient<$Result.GetResult<Prisma.$PolicyRulePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the ClaimRequest model
   */
  interface ClaimRequestFieldRefs {
    readonly id: FieldRef<"ClaimRequest", 'String'>
    readonly employee_id: FieldRef<"ClaimRequest", 'String'>
    readonly claim_type: FieldRef<"ClaimRequest", 'String'>
    readonly amount: FieldRef<"ClaimRequest", 'Decimal'>
    readonly currency: FieldRef<"ClaimRequest", 'String'>
    readonly receipt_date: FieldRef<"ClaimRequest", 'DateTime'>
    readonly receipt_url: FieldRef<"ClaimRequest", 'String'>
    readonly ocr_result_id: FieldRef<"ClaimRequest", 'String'>
    readonly ocr_confidence: FieldRef<"ClaimRequest", 'Float'>
    readonly policy_rule_id: FieldRef<"ClaimRequest", 'String'>
    readonly status: FieldRef<"ClaimRequest", 'String'>
    readonly rejection_reason: FieldRef<"ClaimRequest", 'String'>
    readonly submitted_at: FieldRef<"ClaimRequest", 'DateTime'>
    readonly approved_at: FieldRef<"ClaimRequest", 'DateTime'>
    readonly approved_by: FieldRef<"ClaimRequest", 'String'>
    readonly created_at: FieldRef<"ClaimRequest", 'DateTime'>
    readonly updated_at: FieldRef<"ClaimRequest", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ClaimRequest findUnique
   */
  export type ClaimRequestFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClaimRequest
     */
    select?: ClaimRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClaimRequest
     */
    omit?: ClaimRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClaimRequestInclude<ExtArgs> | null
    /**
     * Filter, which ClaimRequest to fetch.
     */
    where: ClaimRequestWhereUniqueInput
  }

  /**
   * ClaimRequest findUniqueOrThrow
   */
  export type ClaimRequestFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClaimRequest
     */
    select?: ClaimRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClaimRequest
     */
    omit?: ClaimRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClaimRequestInclude<ExtArgs> | null
    /**
     * Filter, which ClaimRequest to fetch.
     */
    where: ClaimRequestWhereUniqueInput
  }

  /**
   * ClaimRequest findFirst
   */
  export type ClaimRequestFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClaimRequest
     */
    select?: ClaimRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClaimRequest
     */
    omit?: ClaimRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClaimRequestInclude<ExtArgs> | null
    /**
     * Filter, which ClaimRequest to fetch.
     */
    where?: ClaimRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ClaimRequests to fetch.
     */
    orderBy?: ClaimRequestOrderByWithRelationInput | ClaimRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ClaimRequests.
     */
    cursor?: ClaimRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ClaimRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ClaimRequests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ClaimRequests.
     */
    distinct?: ClaimRequestScalarFieldEnum | ClaimRequestScalarFieldEnum[]
  }

  /**
   * ClaimRequest findFirstOrThrow
   */
  export type ClaimRequestFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClaimRequest
     */
    select?: ClaimRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClaimRequest
     */
    omit?: ClaimRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClaimRequestInclude<ExtArgs> | null
    /**
     * Filter, which ClaimRequest to fetch.
     */
    where?: ClaimRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ClaimRequests to fetch.
     */
    orderBy?: ClaimRequestOrderByWithRelationInput | ClaimRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ClaimRequests.
     */
    cursor?: ClaimRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ClaimRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ClaimRequests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ClaimRequests.
     */
    distinct?: ClaimRequestScalarFieldEnum | ClaimRequestScalarFieldEnum[]
  }

  /**
   * ClaimRequest findMany
   */
  export type ClaimRequestFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClaimRequest
     */
    select?: ClaimRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClaimRequest
     */
    omit?: ClaimRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClaimRequestInclude<ExtArgs> | null
    /**
     * Filter, which ClaimRequests to fetch.
     */
    where?: ClaimRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ClaimRequests to fetch.
     */
    orderBy?: ClaimRequestOrderByWithRelationInput | ClaimRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ClaimRequests.
     */
    cursor?: ClaimRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ClaimRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ClaimRequests.
     */
    skip?: number
    distinct?: ClaimRequestScalarFieldEnum | ClaimRequestScalarFieldEnum[]
  }

  /**
   * ClaimRequest create
   */
  export type ClaimRequestCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClaimRequest
     */
    select?: ClaimRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClaimRequest
     */
    omit?: ClaimRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClaimRequestInclude<ExtArgs> | null
    /**
     * The data needed to create a ClaimRequest.
     */
    data: XOR<ClaimRequestCreateInput, ClaimRequestUncheckedCreateInput>
  }

  /**
   * ClaimRequest createMany
   */
  export type ClaimRequestCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ClaimRequests.
     */
    data: ClaimRequestCreateManyInput | ClaimRequestCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ClaimRequest createManyAndReturn
   */
  export type ClaimRequestCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClaimRequest
     */
    select?: ClaimRequestSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ClaimRequest
     */
    omit?: ClaimRequestOmit<ExtArgs> | null
    /**
     * The data used to create many ClaimRequests.
     */
    data: ClaimRequestCreateManyInput | ClaimRequestCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClaimRequestIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ClaimRequest update
   */
  export type ClaimRequestUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClaimRequest
     */
    select?: ClaimRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClaimRequest
     */
    omit?: ClaimRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClaimRequestInclude<ExtArgs> | null
    /**
     * The data needed to update a ClaimRequest.
     */
    data: XOR<ClaimRequestUpdateInput, ClaimRequestUncheckedUpdateInput>
    /**
     * Choose, which ClaimRequest to update.
     */
    where: ClaimRequestWhereUniqueInput
  }

  /**
   * ClaimRequest updateMany
   */
  export type ClaimRequestUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ClaimRequests.
     */
    data: XOR<ClaimRequestUpdateManyMutationInput, ClaimRequestUncheckedUpdateManyInput>
    /**
     * Filter which ClaimRequests to update
     */
    where?: ClaimRequestWhereInput
    /**
     * Limit how many ClaimRequests to update.
     */
    limit?: number
  }

  /**
   * ClaimRequest updateManyAndReturn
   */
  export type ClaimRequestUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClaimRequest
     */
    select?: ClaimRequestSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ClaimRequest
     */
    omit?: ClaimRequestOmit<ExtArgs> | null
    /**
     * The data used to update ClaimRequests.
     */
    data: XOR<ClaimRequestUpdateManyMutationInput, ClaimRequestUncheckedUpdateManyInput>
    /**
     * Filter which ClaimRequests to update
     */
    where?: ClaimRequestWhereInput
    /**
     * Limit how many ClaimRequests to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClaimRequestIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ClaimRequest upsert
   */
  export type ClaimRequestUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClaimRequest
     */
    select?: ClaimRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClaimRequest
     */
    omit?: ClaimRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClaimRequestInclude<ExtArgs> | null
    /**
     * The filter to search for the ClaimRequest to update in case it exists.
     */
    where: ClaimRequestWhereUniqueInput
    /**
     * In case the ClaimRequest found by the `where` argument doesn't exist, create a new ClaimRequest with this data.
     */
    create: XOR<ClaimRequestCreateInput, ClaimRequestUncheckedCreateInput>
    /**
     * In case the ClaimRequest was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ClaimRequestUpdateInput, ClaimRequestUncheckedUpdateInput>
  }

  /**
   * ClaimRequest delete
   */
  export type ClaimRequestDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClaimRequest
     */
    select?: ClaimRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClaimRequest
     */
    omit?: ClaimRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClaimRequestInclude<ExtArgs> | null
    /**
     * Filter which ClaimRequest to delete.
     */
    where: ClaimRequestWhereUniqueInput
  }

  /**
   * ClaimRequest deleteMany
   */
  export type ClaimRequestDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ClaimRequests to delete
     */
    where?: ClaimRequestWhereInput
    /**
     * Limit how many ClaimRequests to delete.
     */
    limit?: number
  }

  /**
   * ClaimRequest.ocr_result
   */
  export type ClaimRequest$ocr_resultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OCRResult
     */
    select?: OCRResultSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OCRResult
     */
    omit?: OCRResultOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OCRResultInclude<ExtArgs> | null
    where?: OCRResultWhereInput
  }

  /**
   * ClaimRequest.policy_rule
   */
  export type ClaimRequest$policy_ruleArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PolicyRule
     */
    select?: PolicyRuleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PolicyRule
     */
    omit?: PolicyRuleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PolicyRuleInclude<ExtArgs> | null
    where?: PolicyRuleWhereInput
  }

  /**
   * ClaimRequest without action
   */
  export type ClaimRequestDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClaimRequest
     */
    select?: ClaimRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClaimRequest
     */
    omit?: ClaimRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClaimRequestInclude<ExtArgs> | null
  }


  /**
   * Model PolicyRule
   */

  export type AggregatePolicyRule = {
    _count: PolicyRuleCountAggregateOutputType | null
    _avg: PolicyRuleAvgAggregateOutputType | null
    _sum: PolicyRuleSumAggregateOutputType | null
    _min: PolicyRuleMinAggregateOutputType | null
    _max: PolicyRuleMaxAggregateOutputType | null
  }

  export type PolicyRuleAvgAggregateOutputType = {
    max_amount: Decimal | null
    max_amount_per_month: Decimal | null
    auto_approve_threshold: Decimal | null
    min_days_notice: number | null
  }

  export type PolicyRuleSumAggregateOutputType = {
    max_amount: Decimal | null
    max_amount_per_month: Decimal | null
    auto_approve_threshold: Decimal | null
    min_days_notice: number | null
  }

  export type PolicyRuleMinAggregateOutputType = {
    id: string | null
    rule_name: string | null
    claim_type: string | null
    max_amount: Decimal | null
    max_amount_per_month: Decimal | null
    auto_approve_threshold: Decimal | null
    requires_receipt: boolean | null
    requires_doctor_cert: boolean | null
    min_days_notice: number | null
    effective_from: Date | null
    effective_to: Date | null
    is_active: boolean | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type PolicyRuleMaxAggregateOutputType = {
    id: string | null
    rule_name: string | null
    claim_type: string | null
    max_amount: Decimal | null
    max_amount_per_month: Decimal | null
    auto_approve_threshold: Decimal | null
    requires_receipt: boolean | null
    requires_doctor_cert: boolean | null
    min_days_notice: number | null
    effective_from: Date | null
    effective_to: Date | null
    is_active: boolean | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type PolicyRuleCountAggregateOutputType = {
    id: number
    rule_name: number
    claim_type: number
    max_amount: number
    max_amount_per_month: number
    auto_approve_threshold: number
    requires_receipt: number
    requires_doctor_cert: number
    min_days_notice: number
    effective_from: number
    effective_to: number
    eligible_grades: number
    is_active: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type PolicyRuleAvgAggregateInputType = {
    max_amount?: true
    max_amount_per_month?: true
    auto_approve_threshold?: true
    min_days_notice?: true
  }

  export type PolicyRuleSumAggregateInputType = {
    max_amount?: true
    max_amount_per_month?: true
    auto_approve_threshold?: true
    min_days_notice?: true
  }

  export type PolicyRuleMinAggregateInputType = {
    id?: true
    rule_name?: true
    claim_type?: true
    max_amount?: true
    max_amount_per_month?: true
    auto_approve_threshold?: true
    requires_receipt?: true
    requires_doctor_cert?: true
    min_days_notice?: true
    effective_from?: true
    effective_to?: true
    is_active?: true
    created_at?: true
    updated_at?: true
  }

  export type PolicyRuleMaxAggregateInputType = {
    id?: true
    rule_name?: true
    claim_type?: true
    max_amount?: true
    max_amount_per_month?: true
    auto_approve_threshold?: true
    requires_receipt?: true
    requires_doctor_cert?: true
    min_days_notice?: true
    effective_from?: true
    effective_to?: true
    is_active?: true
    created_at?: true
    updated_at?: true
  }

  export type PolicyRuleCountAggregateInputType = {
    id?: true
    rule_name?: true
    claim_type?: true
    max_amount?: true
    max_amount_per_month?: true
    auto_approve_threshold?: true
    requires_receipt?: true
    requires_doctor_cert?: true
    min_days_notice?: true
    effective_from?: true
    effective_to?: true
    eligible_grades?: true
    is_active?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type PolicyRuleAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PolicyRule to aggregate.
     */
    where?: PolicyRuleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PolicyRules to fetch.
     */
    orderBy?: PolicyRuleOrderByWithRelationInput | PolicyRuleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PolicyRuleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PolicyRules from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PolicyRules.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PolicyRules
    **/
    _count?: true | PolicyRuleCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PolicyRuleAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PolicyRuleSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PolicyRuleMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PolicyRuleMaxAggregateInputType
  }

  export type GetPolicyRuleAggregateType<T extends PolicyRuleAggregateArgs> = {
        [P in keyof T & keyof AggregatePolicyRule]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePolicyRule[P]>
      : GetScalarType<T[P], AggregatePolicyRule[P]>
  }




  export type PolicyRuleGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PolicyRuleWhereInput
    orderBy?: PolicyRuleOrderByWithAggregationInput | PolicyRuleOrderByWithAggregationInput[]
    by: PolicyRuleScalarFieldEnum[] | PolicyRuleScalarFieldEnum
    having?: PolicyRuleScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PolicyRuleCountAggregateInputType | true
    _avg?: PolicyRuleAvgAggregateInputType
    _sum?: PolicyRuleSumAggregateInputType
    _min?: PolicyRuleMinAggregateInputType
    _max?: PolicyRuleMaxAggregateInputType
  }

  export type PolicyRuleGroupByOutputType = {
    id: string
    rule_name: string
    claim_type: string
    max_amount: Decimal
    max_amount_per_month: Decimal
    auto_approve_threshold: Decimal | null
    requires_receipt: boolean
    requires_doctor_cert: boolean
    min_days_notice: number
    effective_from: Date
    effective_to: Date | null
    eligible_grades: JsonValue | null
    is_active: boolean
    created_at: Date
    updated_at: Date
    _count: PolicyRuleCountAggregateOutputType | null
    _avg: PolicyRuleAvgAggregateOutputType | null
    _sum: PolicyRuleSumAggregateOutputType | null
    _min: PolicyRuleMinAggregateOutputType | null
    _max: PolicyRuleMaxAggregateOutputType | null
  }

  type GetPolicyRuleGroupByPayload<T extends PolicyRuleGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PolicyRuleGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PolicyRuleGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PolicyRuleGroupByOutputType[P]>
            : GetScalarType<T[P], PolicyRuleGroupByOutputType[P]>
        }
      >
    >


  export type PolicyRuleSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    rule_name?: boolean
    claim_type?: boolean
    max_amount?: boolean
    max_amount_per_month?: boolean
    auto_approve_threshold?: boolean
    requires_receipt?: boolean
    requires_doctor_cert?: boolean
    min_days_notice?: boolean
    effective_from?: boolean
    effective_to?: boolean
    eligible_grades?: boolean
    is_active?: boolean
    created_at?: boolean
    updated_at?: boolean
    claims?: boolean | PolicyRule$claimsArgs<ExtArgs>
    _count?: boolean | PolicyRuleCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["policyRule"]>

  export type PolicyRuleSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    rule_name?: boolean
    claim_type?: boolean
    max_amount?: boolean
    max_amount_per_month?: boolean
    auto_approve_threshold?: boolean
    requires_receipt?: boolean
    requires_doctor_cert?: boolean
    min_days_notice?: boolean
    effective_from?: boolean
    effective_to?: boolean
    eligible_grades?: boolean
    is_active?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["policyRule"]>

  export type PolicyRuleSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    rule_name?: boolean
    claim_type?: boolean
    max_amount?: boolean
    max_amount_per_month?: boolean
    auto_approve_threshold?: boolean
    requires_receipt?: boolean
    requires_doctor_cert?: boolean
    min_days_notice?: boolean
    effective_from?: boolean
    effective_to?: boolean
    eligible_grades?: boolean
    is_active?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["policyRule"]>

  export type PolicyRuleSelectScalar = {
    id?: boolean
    rule_name?: boolean
    claim_type?: boolean
    max_amount?: boolean
    max_amount_per_month?: boolean
    auto_approve_threshold?: boolean
    requires_receipt?: boolean
    requires_doctor_cert?: boolean
    min_days_notice?: boolean
    effective_from?: boolean
    effective_to?: boolean
    eligible_grades?: boolean
    is_active?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type PolicyRuleOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "rule_name" | "claim_type" | "max_amount" | "max_amount_per_month" | "auto_approve_threshold" | "requires_receipt" | "requires_doctor_cert" | "min_days_notice" | "effective_from" | "effective_to" | "eligible_grades" | "is_active" | "created_at" | "updated_at", ExtArgs["result"]["policyRule"]>
  export type PolicyRuleInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    claims?: boolean | PolicyRule$claimsArgs<ExtArgs>
    _count?: boolean | PolicyRuleCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type PolicyRuleIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type PolicyRuleIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $PolicyRulePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PolicyRule"
    objects: {
      claims: Prisma.$ClaimRequestPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      rule_name: string
      claim_type: string
      max_amount: Prisma.Decimal
      max_amount_per_month: Prisma.Decimal
      auto_approve_threshold: Prisma.Decimal | null
      requires_receipt: boolean
      requires_doctor_cert: boolean
      min_days_notice: number
      effective_from: Date
      effective_to: Date | null
      eligible_grades: Prisma.JsonValue | null
      is_active: boolean
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["policyRule"]>
    composites: {}
  }

  type PolicyRuleGetPayload<S extends boolean | null | undefined | PolicyRuleDefaultArgs> = $Result.GetResult<Prisma.$PolicyRulePayload, S>

  type PolicyRuleCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PolicyRuleFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PolicyRuleCountAggregateInputType | true
    }

  export interface PolicyRuleDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PolicyRule'], meta: { name: 'PolicyRule' } }
    /**
     * Find zero or one PolicyRule that matches the filter.
     * @param {PolicyRuleFindUniqueArgs} args - Arguments to find a PolicyRule
     * @example
     * // Get one PolicyRule
     * const policyRule = await prisma.policyRule.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PolicyRuleFindUniqueArgs>(args: SelectSubset<T, PolicyRuleFindUniqueArgs<ExtArgs>>): Prisma__PolicyRuleClient<$Result.GetResult<Prisma.$PolicyRulePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one PolicyRule that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PolicyRuleFindUniqueOrThrowArgs} args - Arguments to find a PolicyRule
     * @example
     * // Get one PolicyRule
     * const policyRule = await prisma.policyRule.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PolicyRuleFindUniqueOrThrowArgs>(args: SelectSubset<T, PolicyRuleFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PolicyRuleClient<$Result.GetResult<Prisma.$PolicyRulePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PolicyRule that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PolicyRuleFindFirstArgs} args - Arguments to find a PolicyRule
     * @example
     * // Get one PolicyRule
     * const policyRule = await prisma.policyRule.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PolicyRuleFindFirstArgs>(args?: SelectSubset<T, PolicyRuleFindFirstArgs<ExtArgs>>): Prisma__PolicyRuleClient<$Result.GetResult<Prisma.$PolicyRulePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PolicyRule that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PolicyRuleFindFirstOrThrowArgs} args - Arguments to find a PolicyRule
     * @example
     * // Get one PolicyRule
     * const policyRule = await prisma.policyRule.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PolicyRuleFindFirstOrThrowArgs>(args?: SelectSubset<T, PolicyRuleFindFirstOrThrowArgs<ExtArgs>>): Prisma__PolicyRuleClient<$Result.GetResult<Prisma.$PolicyRulePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more PolicyRules that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PolicyRuleFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PolicyRules
     * const policyRules = await prisma.policyRule.findMany()
     * 
     * // Get first 10 PolicyRules
     * const policyRules = await prisma.policyRule.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const policyRuleWithIdOnly = await prisma.policyRule.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PolicyRuleFindManyArgs>(args?: SelectSubset<T, PolicyRuleFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PolicyRulePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a PolicyRule.
     * @param {PolicyRuleCreateArgs} args - Arguments to create a PolicyRule.
     * @example
     * // Create one PolicyRule
     * const PolicyRule = await prisma.policyRule.create({
     *   data: {
     *     // ... data to create a PolicyRule
     *   }
     * })
     * 
     */
    create<T extends PolicyRuleCreateArgs>(args: SelectSubset<T, PolicyRuleCreateArgs<ExtArgs>>): Prisma__PolicyRuleClient<$Result.GetResult<Prisma.$PolicyRulePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many PolicyRules.
     * @param {PolicyRuleCreateManyArgs} args - Arguments to create many PolicyRules.
     * @example
     * // Create many PolicyRules
     * const policyRule = await prisma.policyRule.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PolicyRuleCreateManyArgs>(args?: SelectSubset<T, PolicyRuleCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PolicyRules and returns the data saved in the database.
     * @param {PolicyRuleCreateManyAndReturnArgs} args - Arguments to create many PolicyRules.
     * @example
     * // Create many PolicyRules
     * const policyRule = await prisma.policyRule.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PolicyRules and only return the `id`
     * const policyRuleWithIdOnly = await prisma.policyRule.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PolicyRuleCreateManyAndReturnArgs>(args?: SelectSubset<T, PolicyRuleCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PolicyRulePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a PolicyRule.
     * @param {PolicyRuleDeleteArgs} args - Arguments to delete one PolicyRule.
     * @example
     * // Delete one PolicyRule
     * const PolicyRule = await prisma.policyRule.delete({
     *   where: {
     *     // ... filter to delete one PolicyRule
     *   }
     * })
     * 
     */
    delete<T extends PolicyRuleDeleteArgs>(args: SelectSubset<T, PolicyRuleDeleteArgs<ExtArgs>>): Prisma__PolicyRuleClient<$Result.GetResult<Prisma.$PolicyRulePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one PolicyRule.
     * @param {PolicyRuleUpdateArgs} args - Arguments to update one PolicyRule.
     * @example
     * // Update one PolicyRule
     * const policyRule = await prisma.policyRule.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PolicyRuleUpdateArgs>(args: SelectSubset<T, PolicyRuleUpdateArgs<ExtArgs>>): Prisma__PolicyRuleClient<$Result.GetResult<Prisma.$PolicyRulePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more PolicyRules.
     * @param {PolicyRuleDeleteManyArgs} args - Arguments to filter PolicyRules to delete.
     * @example
     * // Delete a few PolicyRules
     * const { count } = await prisma.policyRule.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PolicyRuleDeleteManyArgs>(args?: SelectSubset<T, PolicyRuleDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PolicyRules.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PolicyRuleUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PolicyRules
     * const policyRule = await prisma.policyRule.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PolicyRuleUpdateManyArgs>(args: SelectSubset<T, PolicyRuleUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PolicyRules and returns the data updated in the database.
     * @param {PolicyRuleUpdateManyAndReturnArgs} args - Arguments to update many PolicyRules.
     * @example
     * // Update many PolicyRules
     * const policyRule = await prisma.policyRule.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more PolicyRules and only return the `id`
     * const policyRuleWithIdOnly = await prisma.policyRule.updateManyAndReturn({
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
    updateManyAndReturn<T extends PolicyRuleUpdateManyAndReturnArgs>(args: SelectSubset<T, PolicyRuleUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PolicyRulePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one PolicyRule.
     * @param {PolicyRuleUpsertArgs} args - Arguments to update or create a PolicyRule.
     * @example
     * // Update or create a PolicyRule
     * const policyRule = await prisma.policyRule.upsert({
     *   create: {
     *     // ... data to create a PolicyRule
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PolicyRule we want to update
     *   }
     * })
     */
    upsert<T extends PolicyRuleUpsertArgs>(args: SelectSubset<T, PolicyRuleUpsertArgs<ExtArgs>>): Prisma__PolicyRuleClient<$Result.GetResult<Prisma.$PolicyRulePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of PolicyRules.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PolicyRuleCountArgs} args - Arguments to filter PolicyRules to count.
     * @example
     * // Count the number of PolicyRules
     * const count = await prisma.policyRule.count({
     *   where: {
     *     // ... the filter for the PolicyRules we want to count
     *   }
     * })
    **/
    count<T extends PolicyRuleCountArgs>(
      args?: Subset<T, PolicyRuleCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PolicyRuleCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PolicyRule.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PolicyRuleAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends PolicyRuleAggregateArgs>(args: Subset<T, PolicyRuleAggregateArgs>): Prisma.PrismaPromise<GetPolicyRuleAggregateType<T>>

    /**
     * Group by PolicyRule.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PolicyRuleGroupByArgs} args - Group by arguments.
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
      T extends PolicyRuleGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PolicyRuleGroupByArgs['orderBy'] }
        : { orderBy?: PolicyRuleGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, PolicyRuleGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPolicyRuleGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PolicyRule model
   */
  readonly fields: PolicyRuleFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PolicyRule.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PolicyRuleClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    claims<T extends PolicyRule$claimsArgs<ExtArgs> = {}>(args?: Subset<T, PolicyRule$claimsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClaimRequestPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the PolicyRule model
   */
  interface PolicyRuleFieldRefs {
    readonly id: FieldRef<"PolicyRule", 'String'>
    readonly rule_name: FieldRef<"PolicyRule", 'String'>
    readonly claim_type: FieldRef<"PolicyRule", 'String'>
    readonly max_amount: FieldRef<"PolicyRule", 'Decimal'>
    readonly max_amount_per_month: FieldRef<"PolicyRule", 'Decimal'>
    readonly auto_approve_threshold: FieldRef<"PolicyRule", 'Decimal'>
    readonly requires_receipt: FieldRef<"PolicyRule", 'Boolean'>
    readonly requires_doctor_cert: FieldRef<"PolicyRule", 'Boolean'>
    readonly min_days_notice: FieldRef<"PolicyRule", 'Int'>
    readonly effective_from: FieldRef<"PolicyRule", 'DateTime'>
    readonly effective_to: FieldRef<"PolicyRule", 'DateTime'>
    readonly eligible_grades: FieldRef<"PolicyRule", 'Json'>
    readonly is_active: FieldRef<"PolicyRule", 'Boolean'>
    readonly created_at: FieldRef<"PolicyRule", 'DateTime'>
    readonly updated_at: FieldRef<"PolicyRule", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * PolicyRule findUnique
   */
  export type PolicyRuleFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PolicyRule
     */
    select?: PolicyRuleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PolicyRule
     */
    omit?: PolicyRuleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PolicyRuleInclude<ExtArgs> | null
    /**
     * Filter, which PolicyRule to fetch.
     */
    where: PolicyRuleWhereUniqueInput
  }

  /**
   * PolicyRule findUniqueOrThrow
   */
  export type PolicyRuleFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PolicyRule
     */
    select?: PolicyRuleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PolicyRule
     */
    omit?: PolicyRuleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PolicyRuleInclude<ExtArgs> | null
    /**
     * Filter, which PolicyRule to fetch.
     */
    where: PolicyRuleWhereUniqueInput
  }

  /**
   * PolicyRule findFirst
   */
  export type PolicyRuleFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PolicyRule
     */
    select?: PolicyRuleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PolicyRule
     */
    omit?: PolicyRuleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PolicyRuleInclude<ExtArgs> | null
    /**
     * Filter, which PolicyRule to fetch.
     */
    where?: PolicyRuleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PolicyRules to fetch.
     */
    orderBy?: PolicyRuleOrderByWithRelationInput | PolicyRuleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PolicyRules.
     */
    cursor?: PolicyRuleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PolicyRules from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PolicyRules.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PolicyRules.
     */
    distinct?: PolicyRuleScalarFieldEnum | PolicyRuleScalarFieldEnum[]
  }

  /**
   * PolicyRule findFirstOrThrow
   */
  export type PolicyRuleFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PolicyRule
     */
    select?: PolicyRuleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PolicyRule
     */
    omit?: PolicyRuleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PolicyRuleInclude<ExtArgs> | null
    /**
     * Filter, which PolicyRule to fetch.
     */
    where?: PolicyRuleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PolicyRules to fetch.
     */
    orderBy?: PolicyRuleOrderByWithRelationInput | PolicyRuleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PolicyRules.
     */
    cursor?: PolicyRuleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PolicyRules from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PolicyRules.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PolicyRules.
     */
    distinct?: PolicyRuleScalarFieldEnum | PolicyRuleScalarFieldEnum[]
  }

  /**
   * PolicyRule findMany
   */
  export type PolicyRuleFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PolicyRule
     */
    select?: PolicyRuleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PolicyRule
     */
    omit?: PolicyRuleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PolicyRuleInclude<ExtArgs> | null
    /**
     * Filter, which PolicyRules to fetch.
     */
    where?: PolicyRuleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PolicyRules to fetch.
     */
    orderBy?: PolicyRuleOrderByWithRelationInput | PolicyRuleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PolicyRules.
     */
    cursor?: PolicyRuleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PolicyRules from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PolicyRules.
     */
    skip?: number
    distinct?: PolicyRuleScalarFieldEnum | PolicyRuleScalarFieldEnum[]
  }

  /**
   * PolicyRule create
   */
  export type PolicyRuleCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PolicyRule
     */
    select?: PolicyRuleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PolicyRule
     */
    omit?: PolicyRuleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PolicyRuleInclude<ExtArgs> | null
    /**
     * The data needed to create a PolicyRule.
     */
    data: XOR<PolicyRuleCreateInput, PolicyRuleUncheckedCreateInput>
  }

  /**
   * PolicyRule createMany
   */
  export type PolicyRuleCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PolicyRules.
     */
    data: PolicyRuleCreateManyInput | PolicyRuleCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PolicyRule createManyAndReturn
   */
  export type PolicyRuleCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PolicyRule
     */
    select?: PolicyRuleSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PolicyRule
     */
    omit?: PolicyRuleOmit<ExtArgs> | null
    /**
     * The data used to create many PolicyRules.
     */
    data: PolicyRuleCreateManyInput | PolicyRuleCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PolicyRule update
   */
  export type PolicyRuleUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PolicyRule
     */
    select?: PolicyRuleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PolicyRule
     */
    omit?: PolicyRuleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PolicyRuleInclude<ExtArgs> | null
    /**
     * The data needed to update a PolicyRule.
     */
    data: XOR<PolicyRuleUpdateInput, PolicyRuleUncheckedUpdateInput>
    /**
     * Choose, which PolicyRule to update.
     */
    where: PolicyRuleWhereUniqueInput
  }

  /**
   * PolicyRule updateMany
   */
  export type PolicyRuleUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PolicyRules.
     */
    data: XOR<PolicyRuleUpdateManyMutationInput, PolicyRuleUncheckedUpdateManyInput>
    /**
     * Filter which PolicyRules to update
     */
    where?: PolicyRuleWhereInput
    /**
     * Limit how many PolicyRules to update.
     */
    limit?: number
  }

  /**
   * PolicyRule updateManyAndReturn
   */
  export type PolicyRuleUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PolicyRule
     */
    select?: PolicyRuleSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PolicyRule
     */
    omit?: PolicyRuleOmit<ExtArgs> | null
    /**
     * The data used to update PolicyRules.
     */
    data: XOR<PolicyRuleUpdateManyMutationInput, PolicyRuleUncheckedUpdateManyInput>
    /**
     * Filter which PolicyRules to update
     */
    where?: PolicyRuleWhereInput
    /**
     * Limit how many PolicyRules to update.
     */
    limit?: number
  }

  /**
   * PolicyRule upsert
   */
  export type PolicyRuleUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PolicyRule
     */
    select?: PolicyRuleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PolicyRule
     */
    omit?: PolicyRuleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PolicyRuleInclude<ExtArgs> | null
    /**
     * The filter to search for the PolicyRule to update in case it exists.
     */
    where: PolicyRuleWhereUniqueInput
    /**
     * In case the PolicyRule found by the `where` argument doesn't exist, create a new PolicyRule with this data.
     */
    create: XOR<PolicyRuleCreateInput, PolicyRuleUncheckedCreateInput>
    /**
     * In case the PolicyRule was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PolicyRuleUpdateInput, PolicyRuleUncheckedUpdateInput>
  }

  /**
   * PolicyRule delete
   */
  export type PolicyRuleDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PolicyRule
     */
    select?: PolicyRuleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PolicyRule
     */
    omit?: PolicyRuleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PolicyRuleInclude<ExtArgs> | null
    /**
     * Filter which PolicyRule to delete.
     */
    where: PolicyRuleWhereUniqueInput
  }

  /**
   * PolicyRule deleteMany
   */
  export type PolicyRuleDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PolicyRules to delete
     */
    where?: PolicyRuleWhereInput
    /**
     * Limit how many PolicyRules to delete.
     */
    limit?: number
  }

  /**
   * PolicyRule.claims
   */
  export type PolicyRule$claimsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClaimRequest
     */
    select?: ClaimRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClaimRequest
     */
    omit?: ClaimRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClaimRequestInclude<ExtArgs> | null
    where?: ClaimRequestWhereInput
    orderBy?: ClaimRequestOrderByWithRelationInput | ClaimRequestOrderByWithRelationInput[]
    cursor?: ClaimRequestWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ClaimRequestScalarFieldEnum | ClaimRequestScalarFieldEnum[]
  }

  /**
   * PolicyRule without action
   */
  export type PolicyRuleDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PolicyRule
     */
    select?: PolicyRuleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PolicyRule
     */
    omit?: PolicyRuleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PolicyRuleInclude<ExtArgs> | null
  }


  /**
   * Model OCRResult
   */

  export type AggregateOCRResult = {
    _count: OCRResultCountAggregateOutputType | null
    _avg: OCRResultAvgAggregateOutputType | null
    _sum: OCRResultSumAggregateOutputType | null
    _min: OCRResultMinAggregateOutputType | null
    _max: OCRResultMaxAggregateOutputType | null
  }

  export type OCRResultAvgAggregateOutputType = {
    extracted_amount: Decimal | null
    confidence_score: number | null
    processing_time_ms: number | null
  }

  export type OCRResultSumAggregateOutputType = {
    extracted_amount: Decimal | null
    confidence_score: number | null
    processing_time_ms: number | null
  }

  export type OCRResultMinAggregateOutputType = {
    id: string | null
    claim_id: string | null
    raw_text: string | null
    extracted_amount: Decimal | null
    extracted_date: Date | null
    extracted_merchant: string | null
    extracted_tax_id: string | null
    confidence_score: number | null
    model_version: string | null
    processing_time_ms: number | null
    needs_manual_review: boolean | null
    created_at: Date | null
  }

  export type OCRResultMaxAggregateOutputType = {
    id: string | null
    claim_id: string | null
    raw_text: string | null
    extracted_amount: Decimal | null
    extracted_date: Date | null
    extracted_merchant: string | null
    extracted_tax_id: string | null
    confidence_score: number | null
    model_version: string | null
    processing_time_ms: number | null
    needs_manual_review: boolean | null
    created_at: Date | null
  }

  export type OCRResultCountAggregateOutputType = {
    id: number
    claim_id: number
    raw_text: number
    extracted_amount: number
    extracted_date: number
    extracted_merchant: number
    extracted_tax_id: number
    confidence_score: number
    model_version: number
    processing_time_ms: number
    needs_manual_review: number
    created_at: number
    _all: number
  }


  export type OCRResultAvgAggregateInputType = {
    extracted_amount?: true
    confidence_score?: true
    processing_time_ms?: true
  }

  export type OCRResultSumAggregateInputType = {
    extracted_amount?: true
    confidence_score?: true
    processing_time_ms?: true
  }

  export type OCRResultMinAggregateInputType = {
    id?: true
    claim_id?: true
    raw_text?: true
    extracted_amount?: true
    extracted_date?: true
    extracted_merchant?: true
    extracted_tax_id?: true
    confidence_score?: true
    model_version?: true
    processing_time_ms?: true
    needs_manual_review?: true
    created_at?: true
  }

  export type OCRResultMaxAggregateInputType = {
    id?: true
    claim_id?: true
    raw_text?: true
    extracted_amount?: true
    extracted_date?: true
    extracted_merchant?: true
    extracted_tax_id?: true
    confidence_score?: true
    model_version?: true
    processing_time_ms?: true
    needs_manual_review?: true
    created_at?: true
  }

  export type OCRResultCountAggregateInputType = {
    id?: true
    claim_id?: true
    raw_text?: true
    extracted_amount?: true
    extracted_date?: true
    extracted_merchant?: true
    extracted_tax_id?: true
    confidence_score?: true
    model_version?: true
    processing_time_ms?: true
    needs_manual_review?: true
    created_at?: true
    _all?: true
  }

  export type OCRResultAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which OCRResult to aggregate.
     */
    where?: OCRResultWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OCRResults to fetch.
     */
    orderBy?: OCRResultOrderByWithRelationInput | OCRResultOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: OCRResultWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OCRResults from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OCRResults.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned OCRResults
    **/
    _count?: true | OCRResultCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: OCRResultAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: OCRResultSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: OCRResultMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: OCRResultMaxAggregateInputType
  }

  export type GetOCRResultAggregateType<T extends OCRResultAggregateArgs> = {
        [P in keyof T & keyof AggregateOCRResult]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOCRResult[P]>
      : GetScalarType<T[P], AggregateOCRResult[P]>
  }




  export type OCRResultGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OCRResultWhereInput
    orderBy?: OCRResultOrderByWithAggregationInput | OCRResultOrderByWithAggregationInput[]
    by: OCRResultScalarFieldEnum[] | OCRResultScalarFieldEnum
    having?: OCRResultScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: OCRResultCountAggregateInputType | true
    _avg?: OCRResultAvgAggregateInputType
    _sum?: OCRResultSumAggregateInputType
    _min?: OCRResultMinAggregateInputType
    _max?: OCRResultMaxAggregateInputType
  }

  export type OCRResultGroupByOutputType = {
    id: string
    claim_id: string
    raw_text: string | null
    extracted_amount: Decimal | null
    extracted_date: Date | null
    extracted_merchant: string | null
    extracted_tax_id: string | null
    confidence_score: number
    model_version: string | null
    processing_time_ms: number | null
    needs_manual_review: boolean
    created_at: Date
    _count: OCRResultCountAggregateOutputType | null
    _avg: OCRResultAvgAggregateOutputType | null
    _sum: OCRResultSumAggregateOutputType | null
    _min: OCRResultMinAggregateOutputType | null
    _max: OCRResultMaxAggregateOutputType | null
  }

  type GetOCRResultGroupByPayload<T extends OCRResultGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<OCRResultGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof OCRResultGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], OCRResultGroupByOutputType[P]>
            : GetScalarType<T[P], OCRResultGroupByOutputType[P]>
        }
      >
    >


  export type OCRResultSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    claim_id?: boolean
    raw_text?: boolean
    extracted_amount?: boolean
    extracted_date?: boolean
    extracted_merchant?: boolean
    extracted_tax_id?: boolean
    confidence_score?: boolean
    model_version?: boolean
    processing_time_ms?: boolean
    needs_manual_review?: boolean
    created_at?: boolean
    claim?: boolean | ClaimRequestDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["oCRResult"]>

  export type OCRResultSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    claim_id?: boolean
    raw_text?: boolean
    extracted_amount?: boolean
    extracted_date?: boolean
    extracted_merchant?: boolean
    extracted_tax_id?: boolean
    confidence_score?: boolean
    model_version?: boolean
    processing_time_ms?: boolean
    needs_manual_review?: boolean
    created_at?: boolean
    claim?: boolean | ClaimRequestDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["oCRResult"]>

  export type OCRResultSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    claim_id?: boolean
    raw_text?: boolean
    extracted_amount?: boolean
    extracted_date?: boolean
    extracted_merchant?: boolean
    extracted_tax_id?: boolean
    confidence_score?: boolean
    model_version?: boolean
    processing_time_ms?: boolean
    needs_manual_review?: boolean
    created_at?: boolean
    claim?: boolean | ClaimRequestDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["oCRResult"]>

  export type OCRResultSelectScalar = {
    id?: boolean
    claim_id?: boolean
    raw_text?: boolean
    extracted_amount?: boolean
    extracted_date?: boolean
    extracted_merchant?: boolean
    extracted_tax_id?: boolean
    confidence_score?: boolean
    model_version?: boolean
    processing_time_ms?: boolean
    needs_manual_review?: boolean
    created_at?: boolean
  }

  export type OCRResultOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "claim_id" | "raw_text" | "extracted_amount" | "extracted_date" | "extracted_merchant" | "extracted_tax_id" | "confidence_score" | "model_version" | "processing_time_ms" | "needs_manual_review" | "created_at", ExtArgs["result"]["oCRResult"]>
  export type OCRResultInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    claim?: boolean | ClaimRequestDefaultArgs<ExtArgs>
  }
  export type OCRResultIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    claim?: boolean | ClaimRequestDefaultArgs<ExtArgs>
  }
  export type OCRResultIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    claim?: boolean | ClaimRequestDefaultArgs<ExtArgs>
  }

  export type $OCRResultPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "OCRResult"
    objects: {
      claim: Prisma.$ClaimRequestPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      claim_id: string
      raw_text: string | null
      extracted_amount: Prisma.Decimal | null
      extracted_date: Date | null
      extracted_merchant: string | null
      extracted_tax_id: string | null
      confidence_score: number
      model_version: string | null
      processing_time_ms: number | null
      needs_manual_review: boolean
      created_at: Date
    }, ExtArgs["result"]["oCRResult"]>
    composites: {}
  }

  type OCRResultGetPayload<S extends boolean | null | undefined | OCRResultDefaultArgs> = $Result.GetResult<Prisma.$OCRResultPayload, S>

  type OCRResultCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<OCRResultFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: OCRResultCountAggregateInputType | true
    }

  export interface OCRResultDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['OCRResult'], meta: { name: 'OCRResult' } }
    /**
     * Find zero or one OCRResult that matches the filter.
     * @param {OCRResultFindUniqueArgs} args - Arguments to find a OCRResult
     * @example
     * // Get one OCRResult
     * const oCRResult = await prisma.oCRResult.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends OCRResultFindUniqueArgs>(args: SelectSubset<T, OCRResultFindUniqueArgs<ExtArgs>>): Prisma__OCRResultClient<$Result.GetResult<Prisma.$OCRResultPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one OCRResult that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {OCRResultFindUniqueOrThrowArgs} args - Arguments to find a OCRResult
     * @example
     * // Get one OCRResult
     * const oCRResult = await prisma.oCRResult.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends OCRResultFindUniqueOrThrowArgs>(args: SelectSubset<T, OCRResultFindUniqueOrThrowArgs<ExtArgs>>): Prisma__OCRResultClient<$Result.GetResult<Prisma.$OCRResultPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first OCRResult that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OCRResultFindFirstArgs} args - Arguments to find a OCRResult
     * @example
     * // Get one OCRResult
     * const oCRResult = await prisma.oCRResult.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends OCRResultFindFirstArgs>(args?: SelectSubset<T, OCRResultFindFirstArgs<ExtArgs>>): Prisma__OCRResultClient<$Result.GetResult<Prisma.$OCRResultPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first OCRResult that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OCRResultFindFirstOrThrowArgs} args - Arguments to find a OCRResult
     * @example
     * // Get one OCRResult
     * const oCRResult = await prisma.oCRResult.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends OCRResultFindFirstOrThrowArgs>(args?: SelectSubset<T, OCRResultFindFirstOrThrowArgs<ExtArgs>>): Prisma__OCRResultClient<$Result.GetResult<Prisma.$OCRResultPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more OCRResults that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OCRResultFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all OCRResults
     * const oCRResults = await prisma.oCRResult.findMany()
     * 
     * // Get first 10 OCRResults
     * const oCRResults = await prisma.oCRResult.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const oCRResultWithIdOnly = await prisma.oCRResult.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends OCRResultFindManyArgs>(args?: SelectSubset<T, OCRResultFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OCRResultPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a OCRResult.
     * @param {OCRResultCreateArgs} args - Arguments to create a OCRResult.
     * @example
     * // Create one OCRResult
     * const OCRResult = await prisma.oCRResult.create({
     *   data: {
     *     // ... data to create a OCRResult
     *   }
     * })
     * 
     */
    create<T extends OCRResultCreateArgs>(args: SelectSubset<T, OCRResultCreateArgs<ExtArgs>>): Prisma__OCRResultClient<$Result.GetResult<Prisma.$OCRResultPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many OCRResults.
     * @param {OCRResultCreateManyArgs} args - Arguments to create many OCRResults.
     * @example
     * // Create many OCRResults
     * const oCRResult = await prisma.oCRResult.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends OCRResultCreateManyArgs>(args?: SelectSubset<T, OCRResultCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many OCRResults and returns the data saved in the database.
     * @param {OCRResultCreateManyAndReturnArgs} args - Arguments to create many OCRResults.
     * @example
     * // Create many OCRResults
     * const oCRResult = await prisma.oCRResult.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many OCRResults and only return the `id`
     * const oCRResultWithIdOnly = await prisma.oCRResult.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends OCRResultCreateManyAndReturnArgs>(args?: SelectSubset<T, OCRResultCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OCRResultPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a OCRResult.
     * @param {OCRResultDeleteArgs} args - Arguments to delete one OCRResult.
     * @example
     * // Delete one OCRResult
     * const OCRResult = await prisma.oCRResult.delete({
     *   where: {
     *     // ... filter to delete one OCRResult
     *   }
     * })
     * 
     */
    delete<T extends OCRResultDeleteArgs>(args: SelectSubset<T, OCRResultDeleteArgs<ExtArgs>>): Prisma__OCRResultClient<$Result.GetResult<Prisma.$OCRResultPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one OCRResult.
     * @param {OCRResultUpdateArgs} args - Arguments to update one OCRResult.
     * @example
     * // Update one OCRResult
     * const oCRResult = await prisma.oCRResult.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends OCRResultUpdateArgs>(args: SelectSubset<T, OCRResultUpdateArgs<ExtArgs>>): Prisma__OCRResultClient<$Result.GetResult<Prisma.$OCRResultPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more OCRResults.
     * @param {OCRResultDeleteManyArgs} args - Arguments to filter OCRResults to delete.
     * @example
     * // Delete a few OCRResults
     * const { count } = await prisma.oCRResult.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends OCRResultDeleteManyArgs>(args?: SelectSubset<T, OCRResultDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more OCRResults.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OCRResultUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many OCRResults
     * const oCRResult = await prisma.oCRResult.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends OCRResultUpdateManyArgs>(args: SelectSubset<T, OCRResultUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more OCRResults and returns the data updated in the database.
     * @param {OCRResultUpdateManyAndReturnArgs} args - Arguments to update many OCRResults.
     * @example
     * // Update many OCRResults
     * const oCRResult = await prisma.oCRResult.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more OCRResults and only return the `id`
     * const oCRResultWithIdOnly = await prisma.oCRResult.updateManyAndReturn({
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
    updateManyAndReturn<T extends OCRResultUpdateManyAndReturnArgs>(args: SelectSubset<T, OCRResultUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OCRResultPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one OCRResult.
     * @param {OCRResultUpsertArgs} args - Arguments to update or create a OCRResult.
     * @example
     * // Update or create a OCRResult
     * const oCRResult = await prisma.oCRResult.upsert({
     *   create: {
     *     // ... data to create a OCRResult
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the OCRResult we want to update
     *   }
     * })
     */
    upsert<T extends OCRResultUpsertArgs>(args: SelectSubset<T, OCRResultUpsertArgs<ExtArgs>>): Prisma__OCRResultClient<$Result.GetResult<Prisma.$OCRResultPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of OCRResults.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OCRResultCountArgs} args - Arguments to filter OCRResults to count.
     * @example
     * // Count the number of OCRResults
     * const count = await prisma.oCRResult.count({
     *   where: {
     *     // ... the filter for the OCRResults we want to count
     *   }
     * })
    **/
    count<T extends OCRResultCountArgs>(
      args?: Subset<T, OCRResultCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], OCRResultCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a OCRResult.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OCRResultAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends OCRResultAggregateArgs>(args: Subset<T, OCRResultAggregateArgs>): Prisma.PrismaPromise<GetOCRResultAggregateType<T>>

    /**
     * Group by OCRResult.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OCRResultGroupByArgs} args - Group by arguments.
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
      T extends OCRResultGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: OCRResultGroupByArgs['orderBy'] }
        : { orderBy?: OCRResultGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, OCRResultGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOCRResultGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the OCRResult model
   */
  readonly fields: OCRResultFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for OCRResult.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__OCRResultClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    claim<T extends ClaimRequestDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ClaimRequestDefaultArgs<ExtArgs>>): Prisma__ClaimRequestClient<$Result.GetResult<Prisma.$ClaimRequestPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the OCRResult model
   */
  interface OCRResultFieldRefs {
    readonly id: FieldRef<"OCRResult", 'String'>
    readonly claim_id: FieldRef<"OCRResult", 'String'>
    readonly raw_text: FieldRef<"OCRResult", 'String'>
    readonly extracted_amount: FieldRef<"OCRResult", 'Decimal'>
    readonly extracted_date: FieldRef<"OCRResult", 'DateTime'>
    readonly extracted_merchant: FieldRef<"OCRResult", 'String'>
    readonly extracted_tax_id: FieldRef<"OCRResult", 'String'>
    readonly confidence_score: FieldRef<"OCRResult", 'Float'>
    readonly model_version: FieldRef<"OCRResult", 'String'>
    readonly processing_time_ms: FieldRef<"OCRResult", 'Int'>
    readonly needs_manual_review: FieldRef<"OCRResult", 'Boolean'>
    readonly created_at: FieldRef<"OCRResult", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * OCRResult findUnique
   */
  export type OCRResultFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OCRResult
     */
    select?: OCRResultSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OCRResult
     */
    omit?: OCRResultOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OCRResultInclude<ExtArgs> | null
    /**
     * Filter, which OCRResult to fetch.
     */
    where: OCRResultWhereUniqueInput
  }

  /**
   * OCRResult findUniqueOrThrow
   */
  export type OCRResultFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OCRResult
     */
    select?: OCRResultSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OCRResult
     */
    omit?: OCRResultOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OCRResultInclude<ExtArgs> | null
    /**
     * Filter, which OCRResult to fetch.
     */
    where: OCRResultWhereUniqueInput
  }

  /**
   * OCRResult findFirst
   */
  export type OCRResultFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OCRResult
     */
    select?: OCRResultSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OCRResult
     */
    omit?: OCRResultOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OCRResultInclude<ExtArgs> | null
    /**
     * Filter, which OCRResult to fetch.
     */
    where?: OCRResultWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OCRResults to fetch.
     */
    orderBy?: OCRResultOrderByWithRelationInput | OCRResultOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OCRResults.
     */
    cursor?: OCRResultWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OCRResults from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OCRResults.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OCRResults.
     */
    distinct?: OCRResultScalarFieldEnum | OCRResultScalarFieldEnum[]
  }

  /**
   * OCRResult findFirstOrThrow
   */
  export type OCRResultFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OCRResult
     */
    select?: OCRResultSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OCRResult
     */
    omit?: OCRResultOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OCRResultInclude<ExtArgs> | null
    /**
     * Filter, which OCRResult to fetch.
     */
    where?: OCRResultWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OCRResults to fetch.
     */
    orderBy?: OCRResultOrderByWithRelationInput | OCRResultOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OCRResults.
     */
    cursor?: OCRResultWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OCRResults from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OCRResults.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OCRResults.
     */
    distinct?: OCRResultScalarFieldEnum | OCRResultScalarFieldEnum[]
  }

  /**
   * OCRResult findMany
   */
  export type OCRResultFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OCRResult
     */
    select?: OCRResultSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OCRResult
     */
    omit?: OCRResultOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OCRResultInclude<ExtArgs> | null
    /**
     * Filter, which OCRResults to fetch.
     */
    where?: OCRResultWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OCRResults to fetch.
     */
    orderBy?: OCRResultOrderByWithRelationInput | OCRResultOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing OCRResults.
     */
    cursor?: OCRResultWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OCRResults from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OCRResults.
     */
    skip?: number
    distinct?: OCRResultScalarFieldEnum | OCRResultScalarFieldEnum[]
  }

  /**
   * OCRResult create
   */
  export type OCRResultCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OCRResult
     */
    select?: OCRResultSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OCRResult
     */
    omit?: OCRResultOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OCRResultInclude<ExtArgs> | null
    /**
     * The data needed to create a OCRResult.
     */
    data: XOR<OCRResultCreateInput, OCRResultUncheckedCreateInput>
  }

  /**
   * OCRResult createMany
   */
  export type OCRResultCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many OCRResults.
     */
    data: OCRResultCreateManyInput | OCRResultCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * OCRResult createManyAndReturn
   */
  export type OCRResultCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OCRResult
     */
    select?: OCRResultSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the OCRResult
     */
    omit?: OCRResultOmit<ExtArgs> | null
    /**
     * The data used to create many OCRResults.
     */
    data: OCRResultCreateManyInput | OCRResultCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OCRResultIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * OCRResult update
   */
  export type OCRResultUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OCRResult
     */
    select?: OCRResultSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OCRResult
     */
    omit?: OCRResultOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OCRResultInclude<ExtArgs> | null
    /**
     * The data needed to update a OCRResult.
     */
    data: XOR<OCRResultUpdateInput, OCRResultUncheckedUpdateInput>
    /**
     * Choose, which OCRResult to update.
     */
    where: OCRResultWhereUniqueInput
  }

  /**
   * OCRResult updateMany
   */
  export type OCRResultUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update OCRResults.
     */
    data: XOR<OCRResultUpdateManyMutationInput, OCRResultUncheckedUpdateManyInput>
    /**
     * Filter which OCRResults to update
     */
    where?: OCRResultWhereInput
    /**
     * Limit how many OCRResults to update.
     */
    limit?: number
  }

  /**
   * OCRResult updateManyAndReturn
   */
  export type OCRResultUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OCRResult
     */
    select?: OCRResultSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the OCRResult
     */
    omit?: OCRResultOmit<ExtArgs> | null
    /**
     * The data used to update OCRResults.
     */
    data: XOR<OCRResultUpdateManyMutationInput, OCRResultUncheckedUpdateManyInput>
    /**
     * Filter which OCRResults to update
     */
    where?: OCRResultWhereInput
    /**
     * Limit how many OCRResults to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OCRResultIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * OCRResult upsert
   */
  export type OCRResultUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OCRResult
     */
    select?: OCRResultSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OCRResult
     */
    omit?: OCRResultOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OCRResultInclude<ExtArgs> | null
    /**
     * The filter to search for the OCRResult to update in case it exists.
     */
    where: OCRResultWhereUniqueInput
    /**
     * In case the OCRResult found by the `where` argument doesn't exist, create a new OCRResult with this data.
     */
    create: XOR<OCRResultCreateInput, OCRResultUncheckedCreateInput>
    /**
     * In case the OCRResult was found with the provided `where` argument, update it with this data.
     */
    update: XOR<OCRResultUpdateInput, OCRResultUncheckedUpdateInput>
  }

  /**
   * OCRResult delete
   */
  export type OCRResultDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OCRResult
     */
    select?: OCRResultSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OCRResult
     */
    omit?: OCRResultOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OCRResultInclude<ExtArgs> | null
    /**
     * Filter which OCRResult to delete.
     */
    where: OCRResultWhereUniqueInput
  }

  /**
   * OCRResult deleteMany
   */
  export type OCRResultDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which OCRResults to delete
     */
    where?: OCRResultWhereInput
    /**
     * Limit how many OCRResults to delete.
     */
    limit?: number
  }

  /**
   * OCRResult without action
   */
  export type OCRResultDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OCRResult
     */
    select?: OCRResultSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OCRResult
     */
    omit?: OCRResultOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OCRResultInclude<ExtArgs> | null
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


  export const ClaimRequestScalarFieldEnum: {
    id: 'id',
    employee_id: 'employee_id',
    claim_type: 'claim_type',
    amount: 'amount',
    currency: 'currency',
    receipt_date: 'receipt_date',
    receipt_url: 'receipt_url',
    ocr_result_id: 'ocr_result_id',
    ocr_confidence: 'ocr_confidence',
    policy_rule_id: 'policy_rule_id',
    status: 'status',
    rejection_reason: 'rejection_reason',
    submitted_at: 'submitted_at',
    approved_at: 'approved_at',
    approved_by: 'approved_by',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type ClaimRequestScalarFieldEnum = (typeof ClaimRequestScalarFieldEnum)[keyof typeof ClaimRequestScalarFieldEnum]


  export const PolicyRuleScalarFieldEnum: {
    id: 'id',
    rule_name: 'rule_name',
    claim_type: 'claim_type',
    max_amount: 'max_amount',
    max_amount_per_month: 'max_amount_per_month',
    auto_approve_threshold: 'auto_approve_threshold',
    requires_receipt: 'requires_receipt',
    requires_doctor_cert: 'requires_doctor_cert',
    min_days_notice: 'min_days_notice',
    effective_from: 'effective_from',
    effective_to: 'effective_to',
    eligible_grades: 'eligible_grades',
    is_active: 'is_active',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type PolicyRuleScalarFieldEnum = (typeof PolicyRuleScalarFieldEnum)[keyof typeof PolicyRuleScalarFieldEnum]


  export const OCRResultScalarFieldEnum: {
    id: 'id',
    claim_id: 'claim_id',
    raw_text: 'raw_text',
    extracted_amount: 'extracted_amount',
    extracted_date: 'extracted_date',
    extracted_merchant: 'extracted_merchant',
    extracted_tax_id: 'extracted_tax_id',
    confidence_score: 'confidence_score',
    model_version: 'model_version',
    processing_time_ms: 'processing_time_ms',
    needs_manual_review: 'needs_manual_review',
    created_at: 'created_at'
  };

  export type OCRResultScalarFieldEnum = (typeof OCRResultScalarFieldEnum)[keyof typeof OCRResultScalarFieldEnum]


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
   * Reference to a field of type 'Decimal'
   */
  export type DecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal'>
    


  /**
   * Reference to a field of type 'Decimal[]'
   */
  export type ListDecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal[]'>
    


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


  export type ClaimRequestWhereInput = {
    AND?: ClaimRequestWhereInput | ClaimRequestWhereInput[]
    OR?: ClaimRequestWhereInput[]
    NOT?: ClaimRequestWhereInput | ClaimRequestWhereInput[]
    id?: StringFilter<"ClaimRequest"> | string
    employee_id?: StringFilter<"ClaimRequest"> | string
    claim_type?: StringFilter<"ClaimRequest"> | string
    amount?: DecimalFilter<"ClaimRequest"> | Decimal | DecimalJsLike | number | string
    currency?: StringFilter<"ClaimRequest"> | string
    receipt_date?: DateTimeFilter<"ClaimRequest"> | Date | string
    receipt_url?: StringNullableFilter<"ClaimRequest"> | string | null
    ocr_result_id?: StringNullableFilter<"ClaimRequest"> | string | null
    ocr_confidence?: FloatNullableFilter<"ClaimRequest"> | number | null
    policy_rule_id?: StringNullableFilter<"ClaimRequest"> | string | null
    status?: StringFilter<"ClaimRequest"> | string
    rejection_reason?: StringNullableFilter<"ClaimRequest"> | string | null
    submitted_at?: DateTimeNullableFilter<"ClaimRequest"> | Date | string | null
    approved_at?: DateTimeNullableFilter<"ClaimRequest"> | Date | string | null
    approved_by?: StringNullableFilter<"ClaimRequest"> | string | null
    created_at?: DateTimeFilter<"ClaimRequest"> | Date | string
    updated_at?: DateTimeFilter<"ClaimRequest"> | Date | string
    ocr_result?: XOR<OCRResultNullableScalarRelationFilter, OCRResultWhereInput> | null
    policy_rule?: XOR<PolicyRuleNullableScalarRelationFilter, PolicyRuleWhereInput> | null
  }

  export type ClaimRequestOrderByWithRelationInput = {
    id?: SortOrder
    employee_id?: SortOrder
    claim_type?: SortOrder
    amount?: SortOrder
    currency?: SortOrder
    receipt_date?: SortOrder
    receipt_url?: SortOrderInput | SortOrder
    ocr_result_id?: SortOrderInput | SortOrder
    ocr_confidence?: SortOrderInput | SortOrder
    policy_rule_id?: SortOrderInput | SortOrder
    status?: SortOrder
    rejection_reason?: SortOrderInput | SortOrder
    submitted_at?: SortOrderInput | SortOrder
    approved_at?: SortOrderInput | SortOrder
    approved_by?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    ocr_result?: OCRResultOrderByWithRelationInput
    policy_rule?: PolicyRuleOrderByWithRelationInput
  }

  export type ClaimRequestWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ClaimRequestWhereInput | ClaimRequestWhereInput[]
    OR?: ClaimRequestWhereInput[]
    NOT?: ClaimRequestWhereInput | ClaimRequestWhereInput[]
    employee_id?: StringFilter<"ClaimRequest"> | string
    claim_type?: StringFilter<"ClaimRequest"> | string
    amount?: DecimalFilter<"ClaimRequest"> | Decimal | DecimalJsLike | number | string
    currency?: StringFilter<"ClaimRequest"> | string
    receipt_date?: DateTimeFilter<"ClaimRequest"> | Date | string
    receipt_url?: StringNullableFilter<"ClaimRequest"> | string | null
    ocr_result_id?: StringNullableFilter<"ClaimRequest"> | string | null
    ocr_confidence?: FloatNullableFilter<"ClaimRequest"> | number | null
    policy_rule_id?: StringNullableFilter<"ClaimRequest"> | string | null
    status?: StringFilter<"ClaimRequest"> | string
    rejection_reason?: StringNullableFilter<"ClaimRequest"> | string | null
    submitted_at?: DateTimeNullableFilter<"ClaimRequest"> | Date | string | null
    approved_at?: DateTimeNullableFilter<"ClaimRequest"> | Date | string | null
    approved_by?: StringNullableFilter<"ClaimRequest"> | string | null
    created_at?: DateTimeFilter<"ClaimRequest"> | Date | string
    updated_at?: DateTimeFilter<"ClaimRequest"> | Date | string
    ocr_result?: XOR<OCRResultNullableScalarRelationFilter, OCRResultWhereInput> | null
    policy_rule?: XOR<PolicyRuleNullableScalarRelationFilter, PolicyRuleWhereInput> | null
  }, "id">

  export type ClaimRequestOrderByWithAggregationInput = {
    id?: SortOrder
    employee_id?: SortOrder
    claim_type?: SortOrder
    amount?: SortOrder
    currency?: SortOrder
    receipt_date?: SortOrder
    receipt_url?: SortOrderInput | SortOrder
    ocr_result_id?: SortOrderInput | SortOrder
    ocr_confidence?: SortOrderInput | SortOrder
    policy_rule_id?: SortOrderInput | SortOrder
    status?: SortOrder
    rejection_reason?: SortOrderInput | SortOrder
    submitted_at?: SortOrderInput | SortOrder
    approved_at?: SortOrderInput | SortOrder
    approved_by?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: ClaimRequestCountOrderByAggregateInput
    _avg?: ClaimRequestAvgOrderByAggregateInput
    _max?: ClaimRequestMaxOrderByAggregateInput
    _min?: ClaimRequestMinOrderByAggregateInput
    _sum?: ClaimRequestSumOrderByAggregateInput
  }

  export type ClaimRequestScalarWhereWithAggregatesInput = {
    AND?: ClaimRequestScalarWhereWithAggregatesInput | ClaimRequestScalarWhereWithAggregatesInput[]
    OR?: ClaimRequestScalarWhereWithAggregatesInput[]
    NOT?: ClaimRequestScalarWhereWithAggregatesInput | ClaimRequestScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ClaimRequest"> | string
    employee_id?: StringWithAggregatesFilter<"ClaimRequest"> | string
    claim_type?: StringWithAggregatesFilter<"ClaimRequest"> | string
    amount?: DecimalWithAggregatesFilter<"ClaimRequest"> | Decimal | DecimalJsLike | number | string
    currency?: StringWithAggregatesFilter<"ClaimRequest"> | string
    receipt_date?: DateTimeWithAggregatesFilter<"ClaimRequest"> | Date | string
    receipt_url?: StringNullableWithAggregatesFilter<"ClaimRequest"> | string | null
    ocr_result_id?: StringNullableWithAggregatesFilter<"ClaimRequest"> | string | null
    ocr_confidence?: FloatNullableWithAggregatesFilter<"ClaimRequest"> | number | null
    policy_rule_id?: StringNullableWithAggregatesFilter<"ClaimRequest"> | string | null
    status?: StringWithAggregatesFilter<"ClaimRequest"> | string
    rejection_reason?: StringNullableWithAggregatesFilter<"ClaimRequest"> | string | null
    submitted_at?: DateTimeNullableWithAggregatesFilter<"ClaimRequest"> | Date | string | null
    approved_at?: DateTimeNullableWithAggregatesFilter<"ClaimRequest"> | Date | string | null
    approved_by?: StringNullableWithAggregatesFilter<"ClaimRequest"> | string | null
    created_at?: DateTimeWithAggregatesFilter<"ClaimRequest"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"ClaimRequest"> | Date | string
  }

  export type PolicyRuleWhereInput = {
    AND?: PolicyRuleWhereInput | PolicyRuleWhereInput[]
    OR?: PolicyRuleWhereInput[]
    NOT?: PolicyRuleWhereInput | PolicyRuleWhereInput[]
    id?: StringFilter<"PolicyRule"> | string
    rule_name?: StringFilter<"PolicyRule"> | string
    claim_type?: StringFilter<"PolicyRule"> | string
    max_amount?: DecimalFilter<"PolicyRule"> | Decimal | DecimalJsLike | number | string
    max_amount_per_month?: DecimalFilter<"PolicyRule"> | Decimal | DecimalJsLike | number | string
    auto_approve_threshold?: DecimalNullableFilter<"PolicyRule"> | Decimal | DecimalJsLike | number | string | null
    requires_receipt?: BoolFilter<"PolicyRule"> | boolean
    requires_doctor_cert?: BoolFilter<"PolicyRule"> | boolean
    min_days_notice?: IntFilter<"PolicyRule"> | number
    effective_from?: DateTimeFilter<"PolicyRule"> | Date | string
    effective_to?: DateTimeNullableFilter<"PolicyRule"> | Date | string | null
    eligible_grades?: JsonNullableFilter<"PolicyRule">
    is_active?: BoolFilter<"PolicyRule"> | boolean
    created_at?: DateTimeFilter<"PolicyRule"> | Date | string
    updated_at?: DateTimeFilter<"PolicyRule"> | Date | string
    claims?: ClaimRequestListRelationFilter
  }

  export type PolicyRuleOrderByWithRelationInput = {
    id?: SortOrder
    rule_name?: SortOrder
    claim_type?: SortOrder
    max_amount?: SortOrder
    max_amount_per_month?: SortOrder
    auto_approve_threshold?: SortOrderInput | SortOrder
    requires_receipt?: SortOrder
    requires_doctor_cert?: SortOrder
    min_days_notice?: SortOrder
    effective_from?: SortOrder
    effective_to?: SortOrderInput | SortOrder
    eligible_grades?: SortOrderInput | SortOrder
    is_active?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    claims?: ClaimRequestOrderByRelationAggregateInput
  }

  export type PolicyRuleWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: PolicyRuleWhereInput | PolicyRuleWhereInput[]
    OR?: PolicyRuleWhereInput[]
    NOT?: PolicyRuleWhereInput | PolicyRuleWhereInput[]
    rule_name?: StringFilter<"PolicyRule"> | string
    claim_type?: StringFilter<"PolicyRule"> | string
    max_amount?: DecimalFilter<"PolicyRule"> | Decimal | DecimalJsLike | number | string
    max_amount_per_month?: DecimalFilter<"PolicyRule"> | Decimal | DecimalJsLike | number | string
    auto_approve_threshold?: DecimalNullableFilter<"PolicyRule"> | Decimal | DecimalJsLike | number | string | null
    requires_receipt?: BoolFilter<"PolicyRule"> | boolean
    requires_doctor_cert?: BoolFilter<"PolicyRule"> | boolean
    min_days_notice?: IntFilter<"PolicyRule"> | number
    effective_from?: DateTimeFilter<"PolicyRule"> | Date | string
    effective_to?: DateTimeNullableFilter<"PolicyRule"> | Date | string | null
    eligible_grades?: JsonNullableFilter<"PolicyRule">
    is_active?: BoolFilter<"PolicyRule"> | boolean
    created_at?: DateTimeFilter<"PolicyRule"> | Date | string
    updated_at?: DateTimeFilter<"PolicyRule"> | Date | string
    claims?: ClaimRequestListRelationFilter
  }, "id">

  export type PolicyRuleOrderByWithAggregationInput = {
    id?: SortOrder
    rule_name?: SortOrder
    claim_type?: SortOrder
    max_amount?: SortOrder
    max_amount_per_month?: SortOrder
    auto_approve_threshold?: SortOrderInput | SortOrder
    requires_receipt?: SortOrder
    requires_doctor_cert?: SortOrder
    min_days_notice?: SortOrder
    effective_from?: SortOrder
    effective_to?: SortOrderInput | SortOrder
    eligible_grades?: SortOrderInput | SortOrder
    is_active?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: PolicyRuleCountOrderByAggregateInput
    _avg?: PolicyRuleAvgOrderByAggregateInput
    _max?: PolicyRuleMaxOrderByAggregateInput
    _min?: PolicyRuleMinOrderByAggregateInput
    _sum?: PolicyRuleSumOrderByAggregateInput
  }

  export type PolicyRuleScalarWhereWithAggregatesInput = {
    AND?: PolicyRuleScalarWhereWithAggregatesInput | PolicyRuleScalarWhereWithAggregatesInput[]
    OR?: PolicyRuleScalarWhereWithAggregatesInput[]
    NOT?: PolicyRuleScalarWhereWithAggregatesInput | PolicyRuleScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"PolicyRule"> | string
    rule_name?: StringWithAggregatesFilter<"PolicyRule"> | string
    claim_type?: StringWithAggregatesFilter<"PolicyRule"> | string
    max_amount?: DecimalWithAggregatesFilter<"PolicyRule"> | Decimal | DecimalJsLike | number | string
    max_amount_per_month?: DecimalWithAggregatesFilter<"PolicyRule"> | Decimal | DecimalJsLike | number | string
    auto_approve_threshold?: DecimalNullableWithAggregatesFilter<"PolicyRule"> | Decimal | DecimalJsLike | number | string | null
    requires_receipt?: BoolWithAggregatesFilter<"PolicyRule"> | boolean
    requires_doctor_cert?: BoolWithAggregatesFilter<"PolicyRule"> | boolean
    min_days_notice?: IntWithAggregatesFilter<"PolicyRule"> | number
    effective_from?: DateTimeWithAggregatesFilter<"PolicyRule"> | Date | string
    effective_to?: DateTimeNullableWithAggregatesFilter<"PolicyRule"> | Date | string | null
    eligible_grades?: JsonNullableWithAggregatesFilter<"PolicyRule">
    is_active?: BoolWithAggregatesFilter<"PolicyRule"> | boolean
    created_at?: DateTimeWithAggregatesFilter<"PolicyRule"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"PolicyRule"> | Date | string
  }

  export type OCRResultWhereInput = {
    AND?: OCRResultWhereInput | OCRResultWhereInput[]
    OR?: OCRResultWhereInput[]
    NOT?: OCRResultWhereInput | OCRResultWhereInput[]
    id?: StringFilter<"OCRResult"> | string
    claim_id?: StringFilter<"OCRResult"> | string
    raw_text?: StringNullableFilter<"OCRResult"> | string | null
    extracted_amount?: DecimalNullableFilter<"OCRResult"> | Decimal | DecimalJsLike | number | string | null
    extracted_date?: DateTimeNullableFilter<"OCRResult"> | Date | string | null
    extracted_merchant?: StringNullableFilter<"OCRResult"> | string | null
    extracted_tax_id?: StringNullableFilter<"OCRResult"> | string | null
    confidence_score?: FloatFilter<"OCRResult"> | number
    model_version?: StringNullableFilter<"OCRResult"> | string | null
    processing_time_ms?: IntNullableFilter<"OCRResult"> | number | null
    needs_manual_review?: BoolFilter<"OCRResult"> | boolean
    created_at?: DateTimeFilter<"OCRResult"> | Date | string
    claim?: XOR<ClaimRequestScalarRelationFilter, ClaimRequestWhereInput>
  }

  export type OCRResultOrderByWithRelationInput = {
    id?: SortOrder
    claim_id?: SortOrder
    raw_text?: SortOrderInput | SortOrder
    extracted_amount?: SortOrderInput | SortOrder
    extracted_date?: SortOrderInput | SortOrder
    extracted_merchant?: SortOrderInput | SortOrder
    extracted_tax_id?: SortOrderInput | SortOrder
    confidence_score?: SortOrder
    model_version?: SortOrderInput | SortOrder
    processing_time_ms?: SortOrderInput | SortOrder
    needs_manual_review?: SortOrder
    created_at?: SortOrder
    claim?: ClaimRequestOrderByWithRelationInput
  }

  export type OCRResultWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    claim_id?: string
    AND?: OCRResultWhereInput | OCRResultWhereInput[]
    OR?: OCRResultWhereInput[]
    NOT?: OCRResultWhereInput | OCRResultWhereInput[]
    raw_text?: StringNullableFilter<"OCRResult"> | string | null
    extracted_amount?: DecimalNullableFilter<"OCRResult"> | Decimal | DecimalJsLike | number | string | null
    extracted_date?: DateTimeNullableFilter<"OCRResult"> | Date | string | null
    extracted_merchant?: StringNullableFilter<"OCRResult"> | string | null
    extracted_tax_id?: StringNullableFilter<"OCRResult"> | string | null
    confidence_score?: FloatFilter<"OCRResult"> | number
    model_version?: StringNullableFilter<"OCRResult"> | string | null
    processing_time_ms?: IntNullableFilter<"OCRResult"> | number | null
    needs_manual_review?: BoolFilter<"OCRResult"> | boolean
    created_at?: DateTimeFilter<"OCRResult"> | Date | string
    claim?: XOR<ClaimRequestScalarRelationFilter, ClaimRequestWhereInput>
  }, "id" | "claim_id">

  export type OCRResultOrderByWithAggregationInput = {
    id?: SortOrder
    claim_id?: SortOrder
    raw_text?: SortOrderInput | SortOrder
    extracted_amount?: SortOrderInput | SortOrder
    extracted_date?: SortOrderInput | SortOrder
    extracted_merchant?: SortOrderInput | SortOrder
    extracted_tax_id?: SortOrderInput | SortOrder
    confidence_score?: SortOrder
    model_version?: SortOrderInput | SortOrder
    processing_time_ms?: SortOrderInput | SortOrder
    needs_manual_review?: SortOrder
    created_at?: SortOrder
    _count?: OCRResultCountOrderByAggregateInput
    _avg?: OCRResultAvgOrderByAggregateInput
    _max?: OCRResultMaxOrderByAggregateInput
    _min?: OCRResultMinOrderByAggregateInput
    _sum?: OCRResultSumOrderByAggregateInput
  }

  export type OCRResultScalarWhereWithAggregatesInput = {
    AND?: OCRResultScalarWhereWithAggregatesInput | OCRResultScalarWhereWithAggregatesInput[]
    OR?: OCRResultScalarWhereWithAggregatesInput[]
    NOT?: OCRResultScalarWhereWithAggregatesInput | OCRResultScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"OCRResult"> | string
    claim_id?: StringWithAggregatesFilter<"OCRResult"> | string
    raw_text?: StringNullableWithAggregatesFilter<"OCRResult"> | string | null
    extracted_amount?: DecimalNullableWithAggregatesFilter<"OCRResult"> | Decimal | DecimalJsLike | number | string | null
    extracted_date?: DateTimeNullableWithAggregatesFilter<"OCRResult"> | Date | string | null
    extracted_merchant?: StringNullableWithAggregatesFilter<"OCRResult"> | string | null
    extracted_tax_id?: StringNullableWithAggregatesFilter<"OCRResult"> | string | null
    confidence_score?: FloatWithAggregatesFilter<"OCRResult"> | number
    model_version?: StringNullableWithAggregatesFilter<"OCRResult"> | string | null
    processing_time_ms?: IntNullableWithAggregatesFilter<"OCRResult"> | number | null
    needs_manual_review?: BoolWithAggregatesFilter<"OCRResult"> | boolean
    created_at?: DateTimeWithAggregatesFilter<"OCRResult"> | Date | string
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

  export type ClaimRequestCreateInput = {
    id?: string
    employee_id: string
    claim_type: string
    amount: Decimal | DecimalJsLike | number | string
    currency?: string
    receipt_date: Date | string
    receipt_url?: string | null
    ocr_result_id?: string | null
    ocr_confidence?: number | null
    status?: string
    rejection_reason?: string | null
    submitted_at?: Date | string | null
    approved_at?: Date | string | null
    approved_by?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    ocr_result?: OCRResultCreateNestedOneWithoutClaimInput
    policy_rule?: PolicyRuleCreateNestedOneWithoutClaimsInput
  }

  export type ClaimRequestUncheckedCreateInput = {
    id?: string
    employee_id: string
    claim_type: string
    amount: Decimal | DecimalJsLike | number | string
    currency?: string
    receipt_date: Date | string
    receipt_url?: string | null
    ocr_result_id?: string | null
    ocr_confidence?: number | null
    policy_rule_id?: string | null
    status?: string
    rejection_reason?: string | null
    submitted_at?: Date | string | null
    approved_at?: Date | string | null
    approved_by?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    ocr_result?: OCRResultUncheckedCreateNestedOneWithoutClaimInput
  }

  export type ClaimRequestUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    employee_id?: StringFieldUpdateOperationsInput | string
    claim_type?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    currency?: StringFieldUpdateOperationsInput | string
    receipt_date?: DateTimeFieldUpdateOperationsInput | Date | string
    receipt_url?: NullableStringFieldUpdateOperationsInput | string | null
    ocr_result_id?: NullableStringFieldUpdateOperationsInput | string | null
    ocr_confidence?: NullableFloatFieldUpdateOperationsInput | number | null
    status?: StringFieldUpdateOperationsInput | string
    rejection_reason?: NullableStringFieldUpdateOperationsInput | string | null
    submitted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    approved_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    approved_by?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    ocr_result?: OCRResultUpdateOneWithoutClaimNestedInput
    policy_rule?: PolicyRuleUpdateOneWithoutClaimsNestedInput
  }

  export type ClaimRequestUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    employee_id?: StringFieldUpdateOperationsInput | string
    claim_type?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    currency?: StringFieldUpdateOperationsInput | string
    receipt_date?: DateTimeFieldUpdateOperationsInput | Date | string
    receipt_url?: NullableStringFieldUpdateOperationsInput | string | null
    ocr_result_id?: NullableStringFieldUpdateOperationsInput | string | null
    ocr_confidence?: NullableFloatFieldUpdateOperationsInput | number | null
    policy_rule_id?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    rejection_reason?: NullableStringFieldUpdateOperationsInput | string | null
    submitted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    approved_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    approved_by?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    ocr_result?: OCRResultUncheckedUpdateOneWithoutClaimNestedInput
  }

  export type ClaimRequestCreateManyInput = {
    id?: string
    employee_id: string
    claim_type: string
    amount: Decimal | DecimalJsLike | number | string
    currency?: string
    receipt_date: Date | string
    receipt_url?: string | null
    ocr_result_id?: string | null
    ocr_confidence?: number | null
    policy_rule_id?: string | null
    status?: string
    rejection_reason?: string | null
    submitted_at?: Date | string | null
    approved_at?: Date | string | null
    approved_by?: string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type ClaimRequestUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    employee_id?: StringFieldUpdateOperationsInput | string
    claim_type?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    currency?: StringFieldUpdateOperationsInput | string
    receipt_date?: DateTimeFieldUpdateOperationsInput | Date | string
    receipt_url?: NullableStringFieldUpdateOperationsInput | string | null
    ocr_result_id?: NullableStringFieldUpdateOperationsInput | string | null
    ocr_confidence?: NullableFloatFieldUpdateOperationsInput | number | null
    status?: StringFieldUpdateOperationsInput | string
    rejection_reason?: NullableStringFieldUpdateOperationsInput | string | null
    submitted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    approved_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    approved_by?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClaimRequestUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    employee_id?: StringFieldUpdateOperationsInput | string
    claim_type?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    currency?: StringFieldUpdateOperationsInput | string
    receipt_date?: DateTimeFieldUpdateOperationsInput | Date | string
    receipt_url?: NullableStringFieldUpdateOperationsInput | string | null
    ocr_result_id?: NullableStringFieldUpdateOperationsInput | string | null
    ocr_confidence?: NullableFloatFieldUpdateOperationsInput | number | null
    policy_rule_id?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    rejection_reason?: NullableStringFieldUpdateOperationsInput | string | null
    submitted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    approved_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    approved_by?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PolicyRuleCreateInput = {
    id?: string
    rule_name: string
    claim_type: string
    max_amount: Decimal | DecimalJsLike | number | string
    max_amount_per_month: Decimal | DecimalJsLike | number | string
    auto_approve_threshold?: Decimal | DecimalJsLike | number | string | null
    requires_receipt?: boolean
    requires_doctor_cert?: boolean
    min_days_notice?: number
    effective_from: Date | string
    effective_to?: Date | string | null
    eligible_grades?: NullableJsonNullValueInput | InputJsonValue
    is_active?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    claims?: ClaimRequestCreateNestedManyWithoutPolicy_ruleInput
  }

  export type PolicyRuleUncheckedCreateInput = {
    id?: string
    rule_name: string
    claim_type: string
    max_amount: Decimal | DecimalJsLike | number | string
    max_amount_per_month: Decimal | DecimalJsLike | number | string
    auto_approve_threshold?: Decimal | DecimalJsLike | number | string | null
    requires_receipt?: boolean
    requires_doctor_cert?: boolean
    min_days_notice?: number
    effective_from: Date | string
    effective_to?: Date | string | null
    eligible_grades?: NullableJsonNullValueInput | InputJsonValue
    is_active?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    claims?: ClaimRequestUncheckedCreateNestedManyWithoutPolicy_ruleInput
  }

  export type PolicyRuleUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    rule_name?: StringFieldUpdateOperationsInput | string
    claim_type?: StringFieldUpdateOperationsInput | string
    max_amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    max_amount_per_month?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    auto_approve_threshold?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    requires_receipt?: BoolFieldUpdateOperationsInput | boolean
    requires_doctor_cert?: BoolFieldUpdateOperationsInput | boolean
    min_days_notice?: IntFieldUpdateOperationsInput | number
    effective_from?: DateTimeFieldUpdateOperationsInput | Date | string
    effective_to?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    eligible_grades?: NullableJsonNullValueInput | InputJsonValue
    is_active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    claims?: ClaimRequestUpdateManyWithoutPolicy_ruleNestedInput
  }

  export type PolicyRuleUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    rule_name?: StringFieldUpdateOperationsInput | string
    claim_type?: StringFieldUpdateOperationsInput | string
    max_amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    max_amount_per_month?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    auto_approve_threshold?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    requires_receipt?: BoolFieldUpdateOperationsInput | boolean
    requires_doctor_cert?: BoolFieldUpdateOperationsInput | boolean
    min_days_notice?: IntFieldUpdateOperationsInput | number
    effective_from?: DateTimeFieldUpdateOperationsInput | Date | string
    effective_to?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    eligible_grades?: NullableJsonNullValueInput | InputJsonValue
    is_active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    claims?: ClaimRequestUncheckedUpdateManyWithoutPolicy_ruleNestedInput
  }

  export type PolicyRuleCreateManyInput = {
    id?: string
    rule_name: string
    claim_type: string
    max_amount: Decimal | DecimalJsLike | number | string
    max_amount_per_month: Decimal | DecimalJsLike | number | string
    auto_approve_threshold?: Decimal | DecimalJsLike | number | string | null
    requires_receipt?: boolean
    requires_doctor_cert?: boolean
    min_days_notice?: number
    effective_from: Date | string
    effective_to?: Date | string | null
    eligible_grades?: NullableJsonNullValueInput | InputJsonValue
    is_active?: boolean
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type PolicyRuleUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    rule_name?: StringFieldUpdateOperationsInput | string
    claim_type?: StringFieldUpdateOperationsInput | string
    max_amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    max_amount_per_month?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    auto_approve_threshold?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    requires_receipt?: BoolFieldUpdateOperationsInput | boolean
    requires_doctor_cert?: BoolFieldUpdateOperationsInput | boolean
    min_days_notice?: IntFieldUpdateOperationsInput | number
    effective_from?: DateTimeFieldUpdateOperationsInput | Date | string
    effective_to?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    eligible_grades?: NullableJsonNullValueInput | InputJsonValue
    is_active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PolicyRuleUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    rule_name?: StringFieldUpdateOperationsInput | string
    claim_type?: StringFieldUpdateOperationsInput | string
    max_amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    max_amount_per_month?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    auto_approve_threshold?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    requires_receipt?: BoolFieldUpdateOperationsInput | boolean
    requires_doctor_cert?: BoolFieldUpdateOperationsInput | boolean
    min_days_notice?: IntFieldUpdateOperationsInput | number
    effective_from?: DateTimeFieldUpdateOperationsInput | Date | string
    effective_to?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    eligible_grades?: NullableJsonNullValueInput | InputJsonValue
    is_active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OCRResultCreateInput = {
    id?: string
    raw_text?: string | null
    extracted_amount?: Decimal | DecimalJsLike | number | string | null
    extracted_date?: Date | string | null
    extracted_merchant?: string | null
    extracted_tax_id?: string | null
    confidence_score: number
    model_version?: string | null
    processing_time_ms?: number | null
    needs_manual_review?: boolean
    created_at?: Date | string
    claim: ClaimRequestCreateNestedOneWithoutOcr_resultInput
  }

  export type OCRResultUncheckedCreateInput = {
    id?: string
    claim_id: string
    raw_text?: string | null
    extracted_amount?: Decimal | DecimalJsLike | number | string | null
    extracted_date?: Date | string | null
    extracted_merchant?: string | null
    extracted_tax_id?: string | null
    confidence_score: number
    model_version?: string | null
    processing_time_ms?: number | null
    needs_manual_review?: boolean
    created_at?: Date | string
  }

  export type OCRResultUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    raw_text?: NullableStringFieldUpdateOperationsInput | string | null
    extracted_amount?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    extracted_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    extracted_merchant?: NullableStringFieldUpdateOperationsInput | string | null
    extracted_tax_id?: NullableStringFieldUpdateOperationsInput | string | null
    confidence_score?: FloatFieldUpdateOperationsInput | number
    model_version?: NullableStringFieldUpdateOperationsInput | string | null
    processing_time_ms?: NullableIntFieldUpdateOperationsInput | number | null
    needs_manual_review?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    claim?: ClaimRequestUpdateOneRequiredWithoutOcr_resultNestedInput
  }

  export type OCRResultUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    claim_id?: StringFieldUpdateOperationsInput | string
    raw_text?: NullableStringFieldUpdateOperationsInput | string | null
    extracted_amount?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    extracted_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    extracted_merchant?: NullableStringFieldUpdateOperationsInput | string | null
    extracted_tax_id?: NullableStringFieldUpdateOperationsInput | string | null
    confidence_score?: FloatFieldUpdateOperationsInput | number
    model_version?: NullableStringFieldUpdateOperationsInput | string | null
    processing_time_ms?: NullableIntFieldUpdateOperationsInput | number | null
    needs_manual_review?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OCRResultCreateManyInput = {
    id?: string
    claim_id: string
    raw_text?: string | null
    extracted_amount?: Decimal | DecimalJsLike | number | string | null
    extracted_date?: Date | string | null
    extracted_merchant?: string | null
    extracted_tax_id?: string | null
    confidence_score: number
    model_version?: string | null
    processing_time_ms?: number | null
    needs_manual_review?: boolean
    created_at?: Date | string
  }

  export type OCRResultUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    raw_text?: NullableStringFieldUpdateOperationsInput | string | null
    extracted_amount?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    extracted_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    extracted_merchant?: NullableStringFieldUpdateOperationsInput | string | null
    extracted_tax_id?: NullableStringFieldUpdateOperationsInput | string | null
    confidence_score?: FloatFieldUpdateOperationsInput | number
    model_version?: NullableStringFieldUpdateOperationsInput | string | null
    processing_time_ms?: NullableIntFieldUpdateOperationsInput | number | null
    needs_manual_review?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OCRResultUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    claim_id?: StringFieldUpdateOperationsInput | string
    raw_text?: NullableStringFieldUpdateOperationsInput | string | null
    extracted_amount?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    extracted_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    extracted_merchant?: NullableStringFieldUpdateOperationsInput | string | null
    extracted_tax_id?: NullableStringFieldUpdateOperationsInput | string | null
    confidence_score?: FloatFieldUpdateOperationsInput | number
    model_version?: NullableStringFieldUpdateOperationsInput | string | null
    processing_time_ms?: NullableIntFieldUpdateOperationsInput | number | null
    needs_manual_review?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
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

  export type DecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
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

  export type OCRResultNullableScalarRelationFilter = {
    is?: OCRResultWhereInput | null
    isNot?: OCRResultWhereInput | null
  }

  export type PolicyRuleNullableScalarRelationFilter = {
    is?: PolicyRuleWhereInput | null
    isNot?: PolicyRuleWhereInput | null
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type ClaimRequestCountOrderByAggregateInput = {
    id?: SortOrder
    employee_id?: SortOrder
    claim_type?: SortOrder
    amount?: SortOrder
    currency?: SortOrder
    receipt_date?: SortOrder
    receipt_url?: SortOrder
    ocr_result_id?: SortOrder
    ocr_confidence?: SortOrder
    policy_rule_id?: SortOrder
    status?: SortOrder
    rejection_reason?: SortOrder
    submitted_at?: SortOrder
    approved_at?: SortOrder
    approved_by?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type ClaimRequestAvgOrderByAggregateInput = {
    amount?: SortOrder
    ocr_confidence?: SortOrder
  }

  export type ClaimRequestMaxOrderByAggregateInput = {
    id?: SortOrder
    employee_id?: SortOrder
    claim_type?: SortOrder
    amount?: SortOrder
    currency?: SortOrder
    receipt_date?: SortOrder
    receipt_url?: SortOrder
    ocr_result_id?: SortOrder
    ocr_confidence?: SortOrder
    policy_rule_id?: SortOrder
    status?: SortOrder
    rejection_reason?: SortOrder
    submitted_at?: SortOrder
    approved_at?: SortOrder
    approved_by?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type ClaimRequestMinOrderByAggregateInput = {
    id?: SortOrder
    employee_id?: SortOrder
    claim_type?: SortOrder
    amount?: SortOrder
    currency?: SortOrder
    receipt_date?: SortOrder
    receipt_url?: SortOrder
    ocr_result_id?: SortOrder
    ocr_confidence?: SortOrder
    policy_rule_id?: SortOrder
    status?: SortOrder
    rejection_reason?: SortOrder
    submitted_at?: SortOrder
    approved_at?: SortOrder
    approved_by?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type ClaimRequestSumOrderByAggregateInput = {
    amount?: SortOrder
    ocr_confidence?: SortOrder
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

  export type DecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
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

  export type DecimalNullableFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
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

  export type ClaimRequestListRelationFilter = {
    every?: ClaimRequestWhereInput
    some?: ClaimRequestWhereInput
    none?: ClaimRequestWhereInput
  }

  export type ClaimRequestOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PolicyRuleCountOrderByAggregateInput = {
    id?: SortOrder
    rule_name?: SortOrder
    claim_type?: SortOrder
    max_amount?: SortOrder
    max_amount_per_month?: SortOrder
    auto_approve_threshold?: SortOrder
    requires_receipt?: SortOrder
    requires_doctor_cert?: SortOrder
    min_days_notice?: SortOrder
    effective_from?: SortOrder
    effective_to?: SortOrder
    eligible_grades?: SortOrder
    is_active?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type PolicyRuleAvgOrderByAggregateInput = {
    max_amount?: SortOrder
    max_amount_per_month?: SortOrder
    auto_approve_threshold?: SortOrder
    min_days_notice?: SortOrder
  }

  export type PolicyRuleMaxOrderByAggregateInput = {
    id?: SortOrder
    rule_name?: SortOrder
    claim_type?: SortOrder
    max_amount?: SortOrder
    max_amount_per_month?: SortOrder
    auto_approve_threshold?: SortOrder
    requires_receipt?: SortOrder
    requires_doctor_cert?: SortOrder
    min_days_notice?: SortOrder
    effective_from?: SortOrder
    effective_to?: SortOrder
    is_active?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type PolicyRuleMinOrderByAggregateInput = {
    id?: SortOrder
    rule_name?: SortOrder
    claim_type?: SortOrder
    max_amount?: SortOrder
    max_amount_per_month?: SortOrder
    auto_approve_threshold?: SortOrder
    requires_receipt?: SortOrder
    requires_doctor_cert?: SortOrder
    min_days_notice?: SortOrder
    effective_from?: SortOrder
    effective_to?: SortOrder
    is_active?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type PolicyRuleSumOrderByAggregateInput = {
    max_amount?: SortOrder
    max_amount_per_month?: SortOrder
    auto_approve_threshold?: SortOrder
    min_days_notice?: SortOrder
  }

  export type DecimalNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedDecimalNullableFilter<$PrismaModel>
    _sum?: NestedDecimalNullableFilter<$PrismaModel>
    _min?: NestedDecimalNullableFilter<$PrismaModel>
    _max?: NestedDecimalNullableFilter<$PrismaModel>
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

  export type ClaimRequestScalarRelationFilter = {
    is?: ClaimRequestWhereInput
    isNot?: ClaimRequestWhereInput
  }

  export type OCRResultCountOrderByAggregateInput = {
    id?: SortOrder
    claim_id?: SortOrder
    raw_text?: SortOrder
    extracted_amount?: SortOrder
    extracted_date?: SortOrder
    extracted_merchant?: SortOrder
    extracted_tax_id?: SortOrder
    confidence_score?: SortOrder
    model_version?: SortOrder
    processing_time_ms?: SortOrder
    needs_manual_review?: SortOrder
    created_at?: SortOrder
  }

  export type OCRResultAvgOrderByAggregateInput = {
    extracted_amount?: SortOrder
    confidence_score?: SortOrder
    processing_time_ms?: SortOrder
  }

  export type OCRResultMaxOrderByAggregateInput = {
    id?: SortOrder
    claim_id?: SortOrder
    raw_text?: SortOrder
    extracted_amount?: SortOrder
    extracted_date?: SortOrder
    extracted_merchant?: SortOrder
    extracted_tax_id?: SortOrder
    confidence_score?: SortOrder
    model_version?: SortOrder
    processing_time_ms?: SortOrder
    needs_manual_review?: SortOrder
    created_at?: SortOrder
  }

  export type OCRResultMinOrderByAggregateInput = {
    id?: SortOrder
    claim_id?: SortOrder
    raw_text?: SortOrder
    extracted_amount?: SortOrder
    extracted_date?: SortOrder
    extracted_merchant?: SortOrder
    extracted_tax_id?: SortOrder
    confidence_score?: SortOrder
    model_version?: SortOrder
    processing_time_ms?: SortOrder
    needs_manual_review?: SortOrder
    created_at?: SortOrder
  }

  export type OCRResultSumOrderByAggregateInput = {
    extracted_amount?: SortOrder
    confidence_score?: SortOrder
    processing_time_ms?: SortOrder
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

  export type OCRResultCreateNestedOneWithoutClaimInput = {
    create?: XOR<OCRResultCreateWithoutClaimInput, OCRResultUncheckedCreateWithoutClaimInput>
    connectOrCreate?: OCRResultCreateOrConnectWithoutClaimInput
    connect?: OCRResultWhereUniqueInput
  }

  export type PolicyRuleCreateNestedOneWithoutClaimsInput = {
    create?: XOR<PolicyRuleCreateWithoutClaimsInput, PolicyRuleUncheckedCreateWithoutClaimsInput>
    connectOrCreate?: PolicyRuleCreateOrConnectWithoutClaimsInput
    connect?: PolicyRuleWhereUniqueInput
  }

  export type OCRResultUncheckedCreateNestedOneWithoutClaimInput = {
    create?: XOR<OCRResultCreateWithoutClaimInput, OCRResultUncheckedCreateWithoutClaimInput>
    connectOrCreate?: OCRResultCreateOrConnectWithoutClaimInput
    connect?: OCRResultWhereUniqueInput
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type DecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
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

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type OCRResultUpdateOneWithoutClaimNestedInput = {
    create?: XOR<OCRResultCreateWithoutClaimInput, OCRResultUncheckedCreateWithoutClaimInput>
    connectOrCreate?: OCRResultCreateOrConnectWithoutClaimInput
    upsert?: OCRResultUpsertWithoutClaimInput
    disconnect?: OCRResultWhereInput | boolean
    delete?: OCRResultWhereInput | boolean
    connect?: OCRResultWhereUniqueInput
    update?: XOR<XOR<OCRResultUpdateToOneWithWhereWithoutClaimInput, OCRResultUpdateWithoutClaimInput>, OCRResultUncheckedUpdateWithoutClaimInput>
  }

  export type PolicyRuleUpdateOneWithoutClaimsNestedInput = {
    create?: XOR<PolicyRuleCreateWithoutClaimsInput, PolicyRuleUncheckedCreateWithoutClaimsInput>
    connectOrCreate?: PolicyRuleCreateOrConnectWithoutClaimsInput
    upsert?: PolicyRuleUpsertWithoutClaimsInput
    disconnect?: PolicyRuleWhereInput | boolean
    delete?: PolicyRuleWhereInput | boolean
    connect?: PolicyRuleWhereUniqueInput
    update?: XOR<XOR<PolicyRuleUpdateToOneWithWhereWithoutClaimsInput, PolicyRuleUpdateWithoutClaimsInput>, PolicyRuleUncheckedUpdateWithoutClaimsInput>
  }

  export type OCRResultUncheckedUpdateOneWithoutClaimNestedInput = {
    create?: XOR<OCRResultCreateWithoutClaimInput, OCRResultUncheckedCreateWithoutClaimInput>
    connectOrCreate?: OCRResultCreateOrConnectWithoutClaimInput
    upsert?: OCRResultUpsertWithoutClaimInput
    disconnect?: OCRResultWhereInput | boolean
    delete?: OCRResultWhereInput | boolean
    connect?: OCRResultWhereUniqueInput
    update?: XOR<XOR<OCRResultUpdateToOneWithWhereWithoutClaimInput, OCRResultUpdateWithoutClaimInput>, OCRResultUncheckedUpdateWithoutClaimInput>
  }

  export type ClaimRequestCreateNestedManyWithoutPolicy_ruleInput = {
    create?: XOR<ClaimRequestCreateWithoutPolicy_ruleInput, ClaimRequestUncheckedCreateWithoutPolicy_ruleInput> | ClaimRequestCreateWithoutPolicy_ruleInput[] | ClaimRequestUncheckedCreateWithoutPolicy_ruleInput[]
    connectOrCreate?: ClaimRequestCreateOrConnectWithoutPolicy_ruleInput | ClaimRequestCreateOrConnectWithoutPolicy_ruleInput[]
    createMany?: ClaimRequestCreateManyPolicy_ruleInputEnvelope
    connect?: ClaimRequestWhereUniqueInput | ClaimRequestWhereUniqueInput[]
  }

  export type ClaimRequestUncheckedCreateNestedManyWithoutPolicy_ruleInput = {
    create?: XOR<ClaimRequestCreateWithoutPolicy_ruleInput, ClaimRequestUncheckedCreateWithoutPolicy_ruleInput> | ClaimRequestCreateWithoutPolicy_ruleInput[] | ClaimRequestUncheckedCreateWithoutPolicy_ruleInput[]
    connectOrCreate?: ClaimRequestCreateOrConnectWithoutPolicy_ruleInput | ClaimRequestCreateOrConnectWithoutPolicy_ruleInput[]
    createMany?: ClaimRequestCreateManyPolicy_ruleInputEnvelope
    connect?: ClaimRequestWhereUniqueInput | ClaimRequestWhereUniqueInput[]
  }

  export type NullableDecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string | null
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
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

  export type ClaimRequestUpdateManyWithoutPolicy_ruleNestedInput = {
    create?: XOR<ClaimRequestCreateWithoutPolicy_ruleInput, ClaimRequestUncheckedCreateWithoutPolicy_ruleInput> | ClaimRequestCreateWithoutPolicy_ruleInput[] | ClaimRequestUncheckedCreateWithoutPolicy_ruleInput[]
    connectOrCreate?: ClaimRequestCreateOrConnectWithoutPolicy_ruleInput | ClaimRequestCreateOrConnectWithoutPolicy_ruleInput[]
    upsert?: ClaimRequestUpsertWithWhereUniqueWithoutPolicy_ruleInput | ClaimRequestUpsertWithWhereUniqueWithoutPolicy_ruleInput[]
    createMany?: ClaimRequestCreateManyPolicy_ruleInputEnvelope
    set?: ClaimRequestWhereUniqueInput | ClaimRequestWhereUniqueInput[]
    disconnect?: ClaimRequestWhereUniqueInput | ClaimRequestWhereUniqueInput[]
    delete?: ClaimRequestWhereUniqueInput | ClaimRequestWhereUniqueInput[]
    connect?: ClaimRequestWhereUniqueInput | ClaimRequestWhereUniqueInput[]
    update?: ClaimRequestUpdateWithWhereUniqueWithoutPolicy_ruleInput | ClaimRequestUpdateWithWhereUniqueWithoutPolicy_ruleInput[]
    updateMany?: ClaimRequestUpdateManyWithWhereWithoutPolicy_ruleInput | ClaimRequestUpdateManyWithWhereWithoutPolicy_ruleInput[]
    deleteMany?: ClaimRequestScalarWhereInput | ClaimRequestScalarWhereInput[]
  }

  export type ClaimRequestUncheckedUpdateManyWithoutPolicy_ruleNestedInput = {
    create?: XOR<ClaimRequestCreateWithoutPolicy_ruleInput, ClaimRequestUncheckedCreateWithoutPolicy_ruleInput> | ClaimRequestCreateWithoutPolicy_ruleInput[] | ClaimRequestUncheckedCreateWithoutPolicy_ruleInput[]
    connectOrCreate?: ClaimRequestCreateOrConnectWithoutPolicy_ruleInput | ClaimRequestCreateOrConnectWithoutPolicy_ruleInput[]
    upsert?: ClaimRequestUpsertWithWhereUniqueWithoutPolicy_ruleInput | ClaimRequestUpsertWithWhereUniqueWithoutPolicy_ruleInput[]
    createMany?: ClaimRequestCreateManyPolicy_ruleInputEnvelope
    set?: ClaimRequestWhereUniqueInput | ClaimRequestWhereUniqueInput[]
    disconnect?: ClaimRequestWhereUniqueInput | ClaimRequestWhereUniqueInput[]
    delete?: ClaimRequestWhereUniqueInput | ClaimRequestWhereUniqueInput[]
    connect?: ClaimRequestWhereUniqueInput | ClaimRequestWhereUniqueInput[]
    update?: ClaimRequestUpdateWithWhereUniqueWithoutPolicy_ruleInput | ClaimRequestUpdateWithWhereUniqueWithoutPolicy_ruleInput[]
    updateMany?: ClaimRequestUpdateManyWithWhereWithoutPolicy_ruleInput | ClaimRequestUpdateManyWithWhereWithoutPolicy_ruleInput[]
    deleteMany?: ClaimRequestScalarWhereInput | ClaimRequestScalarWhereInput[]
  }

  export type ClaimRequestCreateNestedOneWithoutOcr_resultInput = {
    create?: XOR<ClaimRequestCreateWithoutOcr_resultInput, ClaimRequestUncheckedCreateWithoutOcr_resultInput>
    connectOrCreate?: ClaimRequestCreateOrConnectWithoutOcr_resultInput
    connect?: ClaimRequestWhereUniqueInput
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type ClaimRequestUpdateOneRequiredWithoutOcr_resultNestedInput = {
    create?: XOR<ClaimRequestCreateWithoutOcr_resultInput, ClaimRequestUncheckedCreateWithoutOcr_resultInput>
    connectOrCreate?: ClaimRequestCreateOrConnectWithoutOcr_resultInput
    upsert?: ClaimRequestUpsertWithoutOcr_resultInput
    connect?: ClaimRequestWhereUniqueInput
    update?: XOR<XOR<ClaimRequestUpdateToOneWithWhereWithoutOcr_resultInput, ClaimRequestUpdateWithoutOcr_resultInput>, ClaimRequestUncheckedUpdateWithoutOcr_resultInput>
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

  export type NestedDecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
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

  export type NestedDecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
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

  export type NestedDecimalNullableFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedDecimalNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedDecimalNullableFilter<$PrismaModel>
    _sum?: NestedDecimalNullableFilter<$PrismaModel>
    _min?: NestedDecimalNullableFilter<$PrismaModel>
    _max?: NestedDecimalNullableFilter<$PrismaModel>
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

  export type OCRResultCreateWithoutClaimInput = {
    id?: string
    raw_text?: string | null
    extracted_amount?: Decimal | DecimalJsLike | number | string | null
    extracted_date?: Date | string | null
    extracted_merchant?: string | null
    extracted_tax_id?: string | null
    confidence_score: number
    model_version?: string | null
    processing_time_ms?: number | null
    needs_manual_review?: boolean
    created_at?: Date | string
  }

  export type OCRResultUncheckedCreateWithoutClaimInput = {
    id?: string
    raw_text?: string | null
    extracted_amount?: Decimal | DecimalJsLike | number | string | null
    extracted_date?: Date | string | null
    extracted_merchant?: string | null
    extracted_tax_id?: string | null
    confidence_score: number
    model_version?: string | null
    processing_time_ms?: number | null
    needs_manual_review?: boolean
    created_at?: Date | string
  }

  export type OCRResultCreateOrConnectWithoutClaimInput = {
    where: OCRResultWhereUniqueInput
    create: XOR<OCRResultCreateWithoutClaimInput, OCRResultUncheckedCreateWithoutClaimInput>
  }

  export type PolicyRuleCreateWithoutClaimsInput = {
    id?: string
    rule_name: string
    claim_type: string
    max_amount: Decimal | DecimalJsLike | number | string
    max_amount_per_month: Decimal | DecimalJsLike | number | string
    auto_approve_threshold?: Decimal | DecimalJsLike | number | string | null
    requires_receipt?: boolean
    requires_doctor_cert?: boolean
    min_days_notice?: number
    effective_from: Date | string
    effective_to?: Date | string | null
    eligible_grades?: NullableJsonNullValueInput | InputJsonValue
    is_active?: boolean
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type PolicyRuleUncheckedCreateWithoutClaimsInput = {
    id?: string
    rule_name: string
    claim_type: string
    max_amount: Decimal | DecimalJsLike | number | string
    max_amount_per_month: Decimal | DecimalJsLike | number | string
    auto_approve_threshold?: Decimal | DecimalJsLike | number | string | null
    requires_receipt?: boolean
    requires_doctor_cert?: boolean
    min_days_notice?: number
    effective_from: Date | string
    effective_to?: Date | string | null
    eligible_grades?: NullableJsonNullValueInput | InputJsonValue
    is_active?: boolean
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type PolicyRuleCreateOrConnectWithoutClaimsInput = {
    where: PolicyRuleWhereUniqueInput
    create: XOR<PolicyRuleCreateWithoutClaimsInput, PolicyRuleUncheckedCreateWithoutClaimsInput>
  }

  export type OCRResultUpsertWithoutClaimInput = {
    update: XOR<OCRResultUpdateWithoutClaimInput, OCRResultUncheckedUpdateWithoutClaimInput>
    create: XOR<OCRResultCreateWithoutClaimInput, OCRResultUncheckedCreateWithoutClaimInput>
    where?: OCRResultWhereInput
  }

  export type OCRResultUpdateToOneWithWhereWithoutClaimInput = {
    where?: OCRResultWhereInput
    data: XOR<OCRResultUpdateWithoutClaimInput, OCRResultUncheckedUpdateWithoutClaimInput>
  }

  export type OCRResultUpdateWithoutClaimInput = {
    id?: StringFieldUpdateOperationsInput | string
    raw_text?: NullableStringFieldUpdateOperationsInput | string | null
    extracted_amount?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    extracted_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    extracted_merchant?: NullableStringFieldUpdateOperationsInput | string | null
    extracted_tax_id?: NullableStringFieldUpdateOperationsInput | string | null
    confidence_score?: FloatFieldUpdateOperationsInput | number
    model_version?: NullableStringFieldUpdateOperationsInput | string | null
    processing_time_ms?: NullableIntFieldUpdateOperationsInput | number | null
    needs_manual_review?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OCRResultUncheckedUpdateWithoutClaimInput = {
    id?: StringFieldUpdateOperationsInput | string
    raw_text?: NullableStringFieldUpdateOperationsInput | string | null
    extracted_amount?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    extracted_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    extracted_merchant?: NullableStringFieldUpdateOperationsInput | string | null
    extracted_tax_id?: NullableStringFieldUpdateOperationsInput | string | null
    confidence_score?: FloatFieldUpdateOperationsInput | number
    model_version?: NullableStringFieldUpdateOperationsInput | string | null
    processing_time_ms?: NullableIntFieldUpdateOperationsInput | number | null
    needs_manual_review?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PolicyRuleUpsertWithoutClaimsInput = {
    update: XOR<PolicyRuleUpdateWithoutClaimsInput, PolicyRuleUncheckedUpdateWithoutClaimsInput>
    create: XOR<PolicyRuleCreateWithoutClaimsInput, PolicyRuleUncheckedCreateWithoutClaimsInput>
    where?: PolicyRuleWhereInput
  }

  export type PolicyRuleUpdateToOneWithWhereWithoutClaimsInput = {
    where?: PolicyRuleWhereInput
    data: XOR<PolicyRuleUpdateWithoutClaimsInput, PolicyRuleUncheckedUpdateWithoutClaimsInput>
  }

  export type PolicyRuleUpdateWithoutClaimsInput = {
    id?: StringFieldUpdateOperationsInput | string
    rule_name?: StringFieldUpdateOperationsInput | string
    claim_type?: StringFieldUpdateOperationsInput | string
    max_amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    max_amount_per_month?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    auto_approve_threshold?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    requires_receipt?: BoolFieldUpdateOperationsInput | boolean
    requires_doctor_cert?: BoolFieldUpdateOperationsInput | boolean
    min_days_notice?: IntFieldUpdateOperationsInput | number
    effective_from?: DateTimeFieldUpdateOperationsInput | Date | string
    effective_to?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    eligible_grades?: NullableJsonNullValueInput | InputJsonValue
    is_active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PolicyRuleUncheckedUpdateWithoutClaimsInput = {
    id?: StringFieldUpdateOperationsInput | string
    rule_name?: StringFieldUpdateOperationsInput | string
    claim_type?: StringFieldUpdateOperationsInput | string
    max_amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    max_amount_per_month?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    auto_approve_threshold?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    requires_receipt?: BoolFieldUpdateOperationsInput | boolean
    requires_doctor_cert?: BoolFieldUpdateOperationsInput | boolean
    min_days_notice?: IntFieldUpdateOperationsInput | number
    effective_from?: DateTimeFieldUpdateOperationsInput | Date | string
    effective_to?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    eligible_grades?: NullableJsonNullValueInput | InputJsonValue
    is_active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClaimRequestCreateWithoutPolicy_ruleInput = {
    id?: string
    employee_id: string
    claim_type: string
    amount: Decimal | DecimalJsLike | number | string
    currency?: string
    receipt_date: Date | string
    receipt_url?: string | null
    ocr_result_id?: string | null
    ocr_confidence?: number | null
    status?: string
    rejection_reason?: string | null
    submitted_at?: Date | string | null
    approved_at?: Date | string | null
    approved_by?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    ocr_result?: OCRResultCreateNestedOneWithoutClaimInput
  }

  export type ClaimRequestUncheckedCreateWithoutPolicy_ruleInput = {
    id?: string
    employee_id: string
    claim_type: string
    amount: Decimal | DecimalJsLike | number | string
    currency?: string
    receipt_date: Date | string
    receipt_url?: string | null
    ocr_result_id?: string | null
    ocr_confidence?: number | null
    status?: string
    rejection_reason?: string | null
    submitted_at?: Date | string | null
    approved_at?: Date | string | null
    approved_by?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    ocr_result?: OCRResultUncheckedCreateNestedOneWithoutClaimInput
  }

  export type ClaimRequestCreateOrConnectWithoutPolicy_ruleInput = {
    where: ClaimRequestWhereUniqueInput
    create: XOR<ClaimRequestCreateWithoutPolicy_ruleInput, ClaimRequestUncheckedCreateWithoutPolicy_ruleInput>
  }

  export type ClaimRequestCreateManyPolicy_ruleInputEnvelope = {
    data: ClaimRequestCreateManyPolicy_ruleInput | ClaimRequestCreateManyPolicy_ruleInput[]
    skipDuplicates?: boolean
  }

  export type ClaimRequestUpsertWithWhereUniqueWithoutPolicy_ruleInput = {
    where: ClaimRequestWhereUniqueInput
    update: XOR<ClaimRequestUpdateWithoutPolicy_ruleInput, ClaimRequestUncheckedUpdateWithoutPolicy_ruleInput>
    create: XOR<ClaimRequestCreateWithoutPolicy_ruleInput, ClaimRequestUncheckedCreateWithoutPolicy_ruleInput>
  }

  export type ClaimRequestUpdateWithWhereUniqueWithoutPolicy_ruleInput = {
    where: ClaimRequestWhereUniqueInput
    data: XOR<ClaimRequestUpdateWithoutPolicy_ruleInput, ClaimRequestUncheckedUpdateWithoutPolicy_ruleInput>
  }

  export type ClaimRequestUpdateManyWithWhereWithoutPolicy_ruleInput = {
    where: ClaimRequestScalarWhereInput
    data: XOR<ClaimRequestUpdateManyMutationInput, ClaimRequestUncheckedUpdateManyWithoutPolicy_ruleInput>
  }

  export type ClaimRequestScalarWhereInput = {
    AND?: ClaimRequestScalarWhereInput | ClaimRequestScalarWhereInput[]
    OR?: ClaimRequestScalarWhereInput[]
    NOT?: ClaimRequestScalarWhereInput | ClaimRequestScalarWhereInput[]
    id?: StringFilter<"ClaimRequest"> | string
    employee_id?: StringFilter<"ClaimRequest"> | string
    claim_type?: StringFilter<"ClaimRequest"> | string
    amount?: DecimalFilter<"ClaimRequest"> | Decimal | DecimalJsLike | number | string
    currency?: StringFilter<"ClaimRequest"> | string
    receipt_date?: DateTimeFilter<"ClaimRequest"> | Date | string
    receipt_url?: StringNullableFilter<"ClaimRequest"> | string | null
    ocr_result_id?: StringNullableFilter<"ClaimRequest"> | string | null
    ocr_confidence?: FloatNullableFilter<"ClaimRequest"> | number | null
    policy_rule_id?: StringNullableFilter<"ClaimRequest"> | string | null
    status?: StringFilter<"ClaimRequest"> | string
    rejection_reason?: StringNullableFilter<"ClaimRequest"> | string | null
    submitted_at?: DateTimeNullableFilter<"ClaimRequest"> | Date | string | null
    approved_at?: DateTimeNullableFilter<"ClaimRequest"> | Date | string | null
    approved_by?: StringNullableFilter<"ClaimRequest"> | string | null
    created_at?: DateTimeFilter<"ClaimRequest"> | Date | string
    updated_at?: DateTimeFilter<"ClaimRequest"> | Date | string
  }

  export type ClaimRequestCreateWithoutOcr_resultInput = {
    id?: string
    employee_id: string
    claim_type: string
    amount: Decimal | DecimalJsLike | number | string
    currency?: string
    receipt_date: Date | string
    receipt_url?: string | null
    ocr_result_id?: string | null
    ocr_confidence?: number | null
    status?: string
    rejection_reason?: string | null
    submitted_at?: Date | string | null
    approved_at?: Date | string | null
    approved_by?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    policy_rule?: PolicyRuleCreateNestedOneWithoutClaimsInput
  }

  export type ClaimRequestUncheckedCreateWithoutOcr_resultInput = {
    id?: string
    employee_id: string
    claim_type: string
    amount: Decimal | DecimalJsLike | number | string
    currency?: string
    receipt_date: Date | string
    receipt_url?: string | null
    ocr_result_id?: string | null
    ocr_confidence?: number | null
    policy_rule_id?: string | null
    status?: string
    rejection_reason?: string | null
    submitted_at?: Date | string | null
    approved_at?: Date | string | null
    approved_by?: string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type ClaimRequestCreateOrConnectWithoutOcr_resultInput = {
    where: ClaimRequestWhereUniqueInput
    create: XOR<ClaimRequestCreateWithoutOcr_resultInput, ClaimRequestUncheckedCreateWithoutOcr_resultInput>
  }

  export type ClaimRequestUpsertWithoutOcr_resultInput = {
    update: XOR<ClaimRequestUpdateWithoutOcr_resultInput, ClaimRequestUncheckedUpdateWithoutOcr_resultInput>
    create: XOR<ClaimRequestCreateWithoutOcr_resultInput, ClaimRequestUncheckedCreateWithoutOcr_resultInput>
    where?: ClaimRequestWhereInput
  }

  export type ClaimRequestUpdateToOneWithWhereWithoutOcr_resultInput = {
    where?: ClaimRequestWhereInput
    data: XOR<ClaimRequestUpdateWithoutOcr_resultInput, ClaimRequestUncheckedUpdateWithoutOcr_resultInput>
  }

  export type ClaimRequestUpdateWithoutOcr_resultInput = {
    id?: StringFieldUpdateOperationsInput | string
    employee_id?: StringFieldUpdateOperationsInput | string
    claim_type?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    currency?: StringFieldUpdateOperationsInput | string
    receipt_date?: DateTimeFieldUpdateOperationsInput | Date | string
    receipt_url?: NullableStringFieldUpdateOperationsInput | string | null
    ocr_result_id?: NullableStringFieldUpdateOperationsInput | string | null
    ocr_confidence?: NullableFloatFieldUpdateOperationsInput | number | null
    status?: StringFieldUpdateOperationsInput | string
    rejection_reason?: NullableStringFieldUpdateOperationsInput | string | null
    submitted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    approved_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    approved_by?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    policy_rule?: PolicyRuleUpdateOneWithoutClaimsNestedInput
  }

  export type ClaimRequestUncheckedUpdateWithoutOcr_resultInput = {
    id?: StringFieldUpdateOperationsInput | string
    employee_id?: StringFieldUpdateOperationsInput | string
    claim_type?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    currency?: StringFieldUpdateOperationsInput | string
    receipt_date?: DateTimeFieldUpdateOperationsInput | Date | string
    receipt_url?: NullableStringFieldUpdateOperationsInput | string | null
    ocr_result_id?: NullableStringFieldUpdateOperationsInput | string | null
    ocr_confidence?: NullableFloatFieldUpdateOperationsInput | number | null
    policy_rule_id?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    rejection_reason?: NullableStringFieldUpdateOperationsInput | string | null
    submitted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    approved_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    approved_by?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClaimRequestCreateManyPolicy_ruleInput = {
    id?: string
    employee_id: string
    claim_type: string
    amount: Decimal | DecimalJsLike | number | string
    currency?: string
    receipt_date: Date | string
    receipt_url?: string | null
    ocr_result_id?: string | null
    ocr_confidence?: number | null
    status?: string
    rejection_reason?: string | null
    submitted_at?: Date | string | null
    approved_at?: Date | string | null
    approved_by?: string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type ClaimRequestUpdateWithoutPolicy_ruleInput = {
    id?: StringFieldUpdateOperationsInput | string
    employee_id?: StringFieldUpdateOperationsInput | string
    claim_type?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    currency?: StringFieldUpdateOperationsInput | string
    receipt_date?: DateTimeFieldUpdateOperationsInput | Date | string
    receipt_url?: NullableStringFieldUpdateOperationsInput | string | null
    ocr_result_id?: NullableStringFieldUpdateOperationsInput | string | null
    ocr_confidence?: NullableFloatFieldUpdateOperationsInput | number | null
    status?: StringFieldUpdateOperationsInput | string
    rejection_reason?: NullableStringFieldUpdateOperationsInput | string | null
    submitted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    approved_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    approved_by?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    ocr_result?: OCRResultUpdateOneWithoutClaimNestedInput
  }

  export type ClaimRequestUncheckedUpdateWithoutPolicy_ruleInput = {
    id?: StringFieldUpdateOperationsInput | string
    employee_id?: StringFieldUpdateOperationsInput | string
    claim_type?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    currency?: StringFieldUpdateOperationsInput | string
    receipt_date?: DateTimeFieldUpdateOperationsInput | Date | string
    receipt_url?: NullableStringFieldUpdateOperationsInput | string | null
    ocr_result_id?: NullableStringFieldUpdateOperationsInput | string | null
    ocr_confidence?: NullableFloatFieldUpdateOperationsInput | number | null
    status?: StringFieldUpdateOperationsInput | string
    rejection_reason?: NullableStringFieldUpdateOperationsInput | string | null
    submitted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    approved_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    approved_by?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    ocr_result?: OCRResultUncheckedUpdateOneWithoutClaimNestedInput
  }

  export type ClaimRequestUncheckedUpdateManyWithoutPolicy_ruleInput = {
    id?: StringFieldUpdateOperationsInput | string
    employee_id?: StringFieldUpdateOperationsInput | string
    claim_type?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    currency?: StringFieldUpdateOperationsInput | string
    receipt_date?: DateTimeFieldUpdateOperationsInput | Date | string
    receipt_url?: NullableStringFieldUpdateOperationsInput | string | null
    ocr_result_id?: NullableStringFieldUpdateOperationsInput | string | null
    ocr_confidence?: NullableFloatFieldUpdateOperationsInput | number | null
    status?: StringFieldUpdateOperationsInput | string
    rejection_reason?: NullableStringFieldUpdateOperationsInput | string | null
    submitted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    approved_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    approved_by?: NullableStringFieldUpdateOperationsInput | string | null
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