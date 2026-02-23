
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
 * Model BenefitPlan
 * 
 */
export type BenefitPlan = $Result.DefaultSelection<Prisma.$BenefitPlanPayload>
/**
 * Model BenefitEnrollment
 * 
 */
export type BenefitEnrollment = $Result.DefaultSelection<Prisma.$BenefitEnrollmentPayload>
/**
 * Model BenefitDependent
 * 
 */
export type BenefitDependent = $Result.DefaultSelection<Prisma.$BenefitDependentPayload>
/**
 * Model BenefitClaim
 * 
 */
export type BenefitClaim = $Result.DefaultSelection<Prisma.$BenefitClaimPayload>
/**
 * Model ClaimRequest
 * 
 */
export type ClaimRequest = $Result.DefaultSelection<Prisma.$ClaimRequestPayload>
/**
 * Model OCRResult
 * 
 */
export type OCRResult = $Result.DefaultSelection<Prisma.$OCRResultPayload>
/**
 * Model PolicyRule
 * 
 */
export type PolicyRule = $Result.DefaultSelection<Prisma.$PolicyRulePayload>
/**
 * Model PolicyCheck
 * 
 */
export type PolicyCheck = $Result.DefaultSelection<Prisma.$PolicyCheckPayload>
/**
 * Model HospitalReferral
 * 
 */
export type HospitalReferral = $Result.DefaultSelection<Prisma.$HospitalReferralPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more BenefitPlans
 * const benefitPlans = await prisma.benefitPlan.findMany()
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
   * // Fetch zero or more BenefitPlans
   * const benefitPlans = await prisma.benefitPlan.findMany()
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
   * `prisma.benefitPlan`: Exposes CRUD operations for the **BenefitPlan** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more BenefitPlans
    * const benefitPlans = await prisma.benefitPlan.findMany()
    * ```
    */
  get benefitPlan(): Prisma.BenefitPlanDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.benefitEnrollment`: Exposes CRUD operations for the **BenefitEnrollment** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more BenefitEnrollments
    * const benefitEnrollments = await prisma.benefitEnrollment.findMany()
    * ```
    */
  get benefitEnrollment(): Prisma.BenefitEnrollmentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.benefitDependent`: Exposes CRUD operations for the **BenefitDependent** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more BenefitDependents
    * const benefitDependents = await prisma.benefitDependent.findMany()
    * ```
    */
  get benefitDependent(): Prisma.BenefitDependentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.benefitClaim`: Exposes CRUD operations for the **BenefitClaim** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more BenefitClaims
    * const benefitClaims = await prisma.benefitClaim.findMany()
    * ```
    */
  get benefitClaim(): Prisma.BenefitClaimDelegate<ExtArgs, ClientOptions>;

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
   * `prisma.oCRResult`: Exposes CRUD operations for the **OCRResult** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more OCRResults
    * const oCRResults = await prisma.oCRResult.findMany()
    * ```
    */
  get oCRResult(): Prisma.OCRResultDelegate<ExtArgs, ClientOptions>;

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
   * `prisma.policyCheck`: Exposes CRUD operations for the **PolicyCheck** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PolicyChecks
    * const policyChecks = await prisma.policyCheck.findMany()
    * ```
    */
  get policyCheck(): Prisma.PolicyCheckDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.hospitalReferral`: Exposes CRUD operations for the **HospitalReferral** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more HospitalReferrals
    * const hospitalReferrals = await prisma.hospitalReferral.findMany()
    * ```
    */
  get hospitalReferral(): Prisma.HospitalReferralDelegate<ExtArgs, ClientOptions>;
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
    BenefitPlan: 'BenefitPlan',
    BenefitEnrollment: 'BenefitEnrollment',
    BenefitDependent: 'BenefitDependent',
    BenefitClaim: 'BenefitClaim',
    ClaimRequest: 'ClaimRequest',
    OCRResult: 'OCRResult',
    PolicyRule: 'PolicyRule',
    PolicyCheck: 'PolicyCheck',
    HospitalReferral: 'HospitalReferral'
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
      modelProps: "benefitPlan" | "benefitEnrollment" | "benefitDependent" | "benefitClaim" | "claimRequest" | "oCRResult" | "policyRule" | "policyCheck" | "hospitalReferral"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      BenefitPlan: {
        payload: Prisma.$BenefitPlanPayload<ExtArgs>
        fields: Prisma.BenefitPlanFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BenefitPlanFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BenefitPlanPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BenefitPlanFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BenefitPlanPayload>
          }
          findFirst: {
            args: Prisma.BenefitPlanFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BenefitPlanPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BenefitPlanFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BenefitPlanPayload>
          }
          findMany: {
            args: Prisma.BenefitPlanFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BenefitPlanPayload>[]
          }
          create: {
            args: Prisma.BenefitPlanCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BenefitPlanPayload>
          }
          createMany: {
            args: Prisma.BenefitPlanCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.BenefitPlanCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BenefitPlanPayload>[]
          }
          delete: {
            args: Prisma.BenefitPlanDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BenefitPlanPayload>
          }
          update: {
            args: Prisma.BenefitPlanUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BenefitPlanPayload>
          }
          deleteMany: {
            args: Prisma.BenefitPlanDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BenefitPlanUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.BenefitPlanUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BenefitPlanPayload>[]
          }
          upsert: {
            args: Prisma.BenefitPlanUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BenefitPlanPayload>
          }
          aggregate: {
            args: Prisma.BenefitPlanAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBenefitPlan>
          }
          groupBy: {
            args: Prisma.BenefitPlanGroupByArgs<ExtArgs>
            result: $Utils.Optional<BenefitPlanGroupByOutputType>[]
          }
          count: {
            args: Prisma.BenefitPlanCountArgs<ExtArgs>
            result: $Utils.Optional<BenefitPlanCountAggregateOutputType> | number
          }
        }
      }
      BenefitEnrollment: {
        payload: Prisma.$BenefitEnrollmentPayload<ExtArgs>
        fields: Prisma.BenefitEnrollmentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BenefitEnrollmentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BenefitEnrollmentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BenefitEnrollmentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BenefitEnrollmentPayload>
          }
          findFirst: {
            args: Prisma.BenefitEnrollmentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BenefitEnrollmentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BenefitEnrollmentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BenefitEnrollmentPayload>
          }
          findMany: {
            args: Prisma.BenefitEnrollmentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BenefitEnrollmentPayload>[]
          }
          create: {
            args: Prisma.BenefitEnrollmentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BenefitEnrollmentPayload>
          }
          createMany: {
            args: Prisma.BenefitEnrollmentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.BenefitEnrollmentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BenefitEnrollmentPayload>[]
          }
          delete: {
            args: Prisma.BenefitEnrollmentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BenefitEnrollmentPayload>
          }
          update: {
            args: Prisma.BenefitEnrollmentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BenefitEnrollmentPayload>
          }
          deleteMany: {
            args: Prisma.BenefitEnrollmentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BenefitEnrollmentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.BenefitEnrollmentUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BenefitEnrollmentPayload>[]
          }
          upsert: {
            args: Prisma.BenefitEnrollmentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BenefitEnrollmentPayload>
          }
          aggregate: {
            args: Prisma.BenefitEnrollmentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBenefitEnrollment>
          }
          groupBy: {
            args: Prisma.BenefitEnrollmentGroupByArgs<ExtArgs>
            result: $Utils.Optional<BenefitEnrollmentGroupByOutputType>[]
          }
          count: {
            args: Prisma.BenefitEnrollmentCountArgs<ExtArgs>
            result: $Utils.Optional<BenefitEnrollmentCountAggregateOutputType> | number
          }
        }
      }
      BenefitDependent: {
        payload: Prisma.$BenefitDependentPayload<ExtArgs>
        fields: Prisma.BenefitDependentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BenefitDependentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BenefitDependentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BenefitDependentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BenefitDependentPayload>
          }
          findFirst: {
            args: Prisma.BenefitDependentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BenefitDependentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BenefitDependentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BenefitDependentPayload>
          }
          findMany: {
            args: Prisma.BenefitDependentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BenefitDependentPayload>[]
          }
          create: {
            args: Prisma.BenefitDependentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BenefitDependentPayload>
          }
          createMany: {
            args: Prisma.BenefitDependentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.BenefitDependentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BenefitDependentPayload>[]
          }
          delete: {
            args: Prisma.BenefitDependentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BenefitDependentPayload>
          }
          update: {
            args: Prisma.BenefitDependentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BenefitDependentPayload>
          }
          deleteMany: {
            args: Prisma.BenefitDependentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BenefitDependentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.BenefitDependentUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BenefitDependentPayload>[]
          }
          upsert: {
            args: Prisma.BenefitDependentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BenefitDependentPayload>
          }
          aggregate: {
            args: Prisma.BenefitDependentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBenefitDependent>
          }
          groupBy: {
            args: Prisma.BenefitDependentGroupByArgs<ExtArgs>
            result: $Utils.Optional<BenefitDependentGroupByOutputType>[]
          }
          count: {
            args: Prisma.BenefitDependentCountArgs<ExtArgs>
            result: $Utils.Optional<BenefitDependentCountAggregateOutputType> | number
          }
        }
      }
      BenefitClaim: {
        payload: Prisma.$BenefitClaimPayload<ExtArgs>
        fields: Prisma.BenefitClaimFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BenefitClaimFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BenefitClaimPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BenefitClaimFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BenefitClaimPayload>
          }
          findFirst: {
            args: Prisma.BenefitClaimFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BenefitClaimPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BenefitClaimFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BenefitClaimPayload>
          }
          findMany: {
            args: Prisma.BenefitClaimFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BenefitClaimPayload>[]
          }
          create: {
            args: Prisma.BenefitClaimCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BenefitClaimPayload>
          }
          createMany: {
            args: Prisma.BenefitClaimCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.BenefitClaimCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BenefitClaimPayload>[]
          }
          delete: {
            args: Prisma.BenefitClaimDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BenefitClaimPayload>
          }
          update: {
            args: Prisma.BenefitClaimUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BenefitClaimPayload>
          }
          deleteMany: {
            args: Prisma.BenefitClaimDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BenefitClaimUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.BenefitClaimUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BenefitClaimPayload>[]
          }
          upsert: {
            args: Prisma.BenefitClaimUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BenefitClaimPayload>
          }
          aggregate: {
            args: Prisma.BenefitClaimAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBenefitClaim>
          }
          groupBy: {
            args: Prisma.BenefitClaimGroupByArgs<ExtArgs>
            result: $Utils.Optional<BenefitClaimGroupByOutputType>[]
          }
          count: {
            args: Prisma.BenefitClaimCountArgs<ExtArgs>
            result: $Utils.Optional<BenefitClaimCountAggregateOutputType> | number
          }
        }
      }
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
      PolicyCheck: {
        payload: Prisma.$PolicyCheckPayload<ExtArgs>
        fields: Prisma.PolicyCheckFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PolicyCheckFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PolicyCheckPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PolicyCheckFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PolicyCheckPayload>
          }
          findFirst: {
            args: Prisma.PolicyCheckFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PolicyCheckPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PolicyCheckFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PolicyCheckPayload>
          }
          findMany: {
            args: Prisma.PolicyCheckFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PolicyCheckPayload>[]
          }
          create: {
            args: Prisma.PolicyCheckCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PolicyCheckPayload>
          }
          createMany: {
            args: Prisma.PolicyCheckCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PolicyCheckCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PolicyCheckPayload>[]
          }
          delete: {
            args: Prisma.PolicyCheckDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PolicyCheckPayload>
          }
          update: {
            args: Prisma.PolicyCheckUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PolicyCheckPayload>
          }
          deleteMany: {
            args: Prisma.PolicyCheckDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PolicyCheckUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PolicyCheckUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PolicyCheckPayload>[]
          }
          upsert: {
            args: Prisma.PolicyCheckUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PolicyCheckPayload>
          }
          aggregate: {
            args: Prisma.PolicyCheckAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePolicyCheck>
          }
          groupBy: {
            args: Prisma.PolicyCheckGroupByArgs<ExtArgs>
            result: $Utils.Optional<PolicyCheckGroupByOutputType>[]
          }
          count: {
            args: Prisma.PolicyCheckCountArgs<ExtArgs>
            result: $Utils.Optional<PolicyCheckCountAggregateOutputType> | number
          }
        }
      }
      HospitalReferral: {
        payload: Prisma.$HospitalReferralPayload<ExtArgs>
        fields: Prisma.HospitalReferralFieldRefs
        operations: {
          findUnique: {
            args: Prisma.HospitalReferralFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HospitalReferralPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.HospitalReferralFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HospitalReferralPayload>
          }
          findFirst: {
            args: Prisma.HospitalReferralFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HospitalReferralPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.HospitalReferralFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HospitalReferralPayload>
          }
          findMany: {
            args: Prisma.HospitalReferralFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HospitalReferralPayload>[]
          }
          create: {
            args: Prisma.HospitalReferralCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HospitalReferralPayload>
          }
          createMany: {
            args: Prisma.HospitalReferralCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.HospitalReferralCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HospitalReferralPayload>[]
          }
          delete: {
            args: Prisma.HospitalReferralDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HospitalReferralPayload>
          }
          update: {
            args: Prisma.HospitalReferralUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HospitalReferralPayload>
          }
          deleteMany: {
            args: Prisma.HospitalReferralDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.HospitalReferralUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.HospitalReferralUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HospitalReferralPayload>[]
          }
          upsert: {
            args: Prisma.HospitalReferralUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HospitalReferralPayload>
          }
          aggregate: {
            args: Prisma.HospitalReferralAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateHospitalReferral>
          }
          groupBy: {
            args: Prisma.HospitalReferralGroupByArgs<ExtArgs>
            result: $Utils.Optional<HospitalReferralGroupByOutputType>[]
          }
          count: {
            args: Prisma.HospitalReferralCountArgs<ExtArgs>
            result: $Utils.Optional<HospitalReferralCountAggregateOutputType> | number
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
    benefitPlan?: BenefitPlanOmit
    benefitEnrollment?: BenefitEnrollmentOmit
    benefitDependent?: BenefitDependentOmit
    benefitClaim?: BenefitClaimOmit
    claimRequest?: ClaimRequestOmit
    oCRResult?: OCRResultOmit
    policyRule?: PolicyRuleOmit
    policyCheck?: PolicyCheckOmit
    hospitalReferral?: HospitalReferralOmit
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
   * Count Type BenefitPlanCountOutputType
   */

  export type BenefitPlanCountOutputType = {
    enrollments: number
  }

  export type BenefitPlanCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    enrollments?: boolean | BenefitPlanCountOutputTypeCountEnrollmentsArgs
  }

  // Custom InputTypes
  /**
   * BenefitPlanCountOutputType without action
   */
  export type BenefitPlanCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BenefitPlanCountOutputType
     */
    select?: BenefitPlanCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * BenefitPlanCountOutputType without action
   */
  export type BenefitPlanCountOutputTypeCountEnrollmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BenefitEnrollmentWhereInput
  }


  /**
   * Count Type BenefitEnrollmentCountOutputType
   */

  export type BenefitEnrollmentCountOutputType = {
    dependents: number
  }

  export type BenefitEnrollmentCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    dependents?: boolean | BenefitEnrollmentCountOutputTypeCountDependentsArgs
  }

  // Custom InputTypes
  /**
   * BenefitEnrollmentCountOutputType without action
   */
  export type BenefitEnrollmentCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BenefitEnrollmentCountOutputType
     */
    select?: BenefitEnrollmentCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * BenefitEnrollmentCountOutputType without action
   */
  export type BenefitEnrollmentCountOutputTypeCountDependentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BenefitDependentWhereInput
  }


  /**
   * Count Type ClaimRequestCountOutputType
   */

  export type ClaimRequestCountOutputType = {
    policy_checks: number
  }

  export type ClaimRequestCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    policy_checks?: boolean | ClaimRequestCountOutputTypeCountPolicy_checksArgs
  }

  // Custom InputTypes
  /**
   * ClaimRequestCountOutputType without action
   */
  export type ClaimRequestCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClaimRequestCountOutputType
     */
    select?: ClaimRequestCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ClaimRequestCountOutputType without action
   */
  export type ClaimRequestCountOutputTypeCountPolicy_checksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PolicyCheckWhereInput
  }


  /**
   * Count Type OCRResultCountOutputType
   */

  export type OCRResultCountOutputType = {
    claims: number
  }

  export type OCRResultCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    claims?: boolean | OCRResultCountOutputTypeCountClaimsArgs
  }

  // Custom InputTypes
  /**
   * OCRResultCountOutputType without action
   */
  export type OCRResultCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OCRResultCountOutputType
     */
    select?: OCRResultCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * OCRResultCountOutputType without action
   */
  export type OCRResultCountOutputTypeCountClaimsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ClaimRequestWhereInput
  }


  /**
   * Models
   */

  /**
   * Model BenefitPlan
   */

  export type AggregateBenefitPlan = {
    _count: BenefitPlanCountAggregateOutputType | null
    _avg: BenefitPlanAvgAggregateOutputType | null
    _sum: BenefitPlanSumAggregateOutputType | null
    _min: BenefitPlanMinAggregateOutputType | null
    _max: BenefitPlanMaxAggregateOutputType | null
  }

  export type BenefitPlanAvgAggregateOutputType = {
    coverage_amount: number | null
    employer_contribution: number | null
    employee_contribution: number | null
  }

  export type BenefitPlanSumAggregateOutputType = {
    coverage_amount: number | null
    employer_contribution: number | null
    employee_contribution: number | null
  }

  export type BenefitPlanMinAggregateOutputType = {
    id: string | null
    code: string | null
    name_en: string | null
    name_th: string | null
    category: string | null
    description_en: string | null
    description_th: string | null
    coverage_amount: number | null
    employer_contribution: number | null
    employee_contribution: number | null
    is_active: boolean | null
    effective_date: Date | null
    end_date: Date | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type BenefitPlanMaxAggregateOutputType = {
    id: string | null
    code: string | null
    name_en: string | null
    name_th: string | null
    category: string | null
    description_en: string | null
    description_th: string | null
    coverage_amount: number | null
    employer_contribution: number | null
    employee_contribution: number | null
    is_active: boolean | null
    effective_date: Date | null
    end_date: Date | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type BenefitPlanCountAggregateOutputType = {
    id: number
    code: number
    name_en: number
    name_th: number
    category: number
    description_en: number
    description_th: number
    coverage_amount: number
    employer_contribution: number
    employee_contribution: number
    is_active: number
    effective_date: number
    end_date: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type BenefitPlanAvgAggregateInputType = {
    coverage_amount?: true
    employer_contribution?: true
    employee_contribution?: true
  }

  export type BenefitPlanSumAggregateInputType = {
    coverage_amount?: true
    employer_contribution?: true
    employee_contribution?: true
  }

  export type BenefitPlanMinAggregateInputType = {
    id?: true
    code?: true
    name_en?: true
    name_th?: true
    category?: true
    description_en?: true
    description_th?: true
    coverage_amount?: true
    employer_contribution?: true
    employee_contribution?: true
    is_active?: true
    effective_date?: true
    end_date?: true
    created_at?: true
    updated_at?: true
  }

  export type BenefitPlanMaxAggregateInputType = {
    id?: true
    code?: true
    name_en?: true
    name_th?: true
    category?: true
    description_en?: true
    description_th?: true
    coverage_amount?: true
    employer_contribution?: true
    employee_contribution?: true
    is_active?: true
    effective_date?: true
    end_date?: true
    created_at?: true
    updated_at?: true
  }

  export type BenefitPlanCountAggregateInputType = {
    id?: true
    code?: true
    name_en?: true
    name_th?: true
    category?: true
    description_en?: true
    description_th?: true
    coverage_amount?: true
    employer_contribution?: true
    employee_contribution?: true
    is_active?: true
    effective_date?: true
    end_date?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type BenefitPlanAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BenefitPlan to aggregate.
     */
    where?: BenefitPlanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BenefitPlans to fetch.
     */
    orderBy?: BenefitPlanOrderByWithRelationInput | BenefitPlanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BenefitPlanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BenefitPlans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BenefitPlans.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned BenefitPlans
    **/
    _count?: true | BenefitPlanCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: BenefitPlanAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: BenefitPlanSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BenefitPlanMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BenefitPlanMaxAggregateInputType
  }

  export type GetBenefitPlanAggregateType<T extends BenefitPlanAggregateArgs> = {
        [P in keyof T & keyof AggregateBenefitPlan]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBenefitPlan[P]>
      : GetScalarType<T[P], AggregateBenefitPlan[P]>
  }




  export type BenefitPlanGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BenefitPlanWhereInput
    orderBy?: BenefitPlanOrderByWithAggregationInput | BenefitPlanOrderByWithAggregationInput[]
    by: BenefitPlanScalarFieldEnum[] | BenefitPlanScalarFieldEnum
    having?: BenefitPlanScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BenefitPlanCountAggregateInputType | true
    _avg?: BenefitPlanAvgAggregateInputType
    _sum?: BenefitPlanSumAggregateInputType
    _min?: BenefitPlanMinAggregateInputType
    _max?: BenefitPlanMaxAggregateInputType
  }

  export type BenefitPlanGroupByOutputType = {
    id: string
    code: string
    name_en: string
    name_th: string | null
    category: string
    description_en: string | null
    description_th: string | null
    coverage_amount: number | null
    employer_contribution: number
    employee_contribution: number
    is_active: boolean
    effective_date: Date
    end_date: Date | null
    created_at: Date
    updated_at: Date
    _count: BenefitPlanCountAggregateOutputType | null
    _avg: BenefitPlanAvgAggregateOutputType | null
    _sum: BenefitPlanSumAggregateOutputType | null
    _min: BenefitPlanMinAggregateOutputType | null
    _max: BenefitPlanMaxAggregateOutputType | null
  }

  type GetBenefitPlanGroupByPayload<T extends BenefitPlanGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BenefitPlanGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BenefitPlanGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BenefitPlanGroupByOutputType[P]>
            : GetScalarType<T[P], BenefitPlanGroupByOutputType[P]>
        }
      >
    >


  export type BenefitPlanSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    code?: boolean
    name_en?: boolean
    name_th?: boolean
    category?: boolean
    description_en?: boolean
    description_th?: boolean
    coverage_amount?: boolean
    employer_contribution?: boolean
    employee_contribution?: boolean
    is_active?: boolean
    effective_date?: boolean
    end_date?: boolean
    created_at?: boolean
    updated_at?: boolean
    enrollments?: boolean | BenefitPlan$enrollmentsArgs<ExtArgs>
    _count?: boolean | BenefitPlanCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["benefitPlan"]>

  export type BenefitPlanSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    code?: boolean
    name_en?: boolean
    name_th?: boolean
    category?: boolean
    description_en?: boolean
    description_th?: boolean
    coverage_amount?: boolean
    employer_contribution?: boolean
    employee_contribution?: boolean
    is_active?: boolean
    effective_date?: boolean
    end_date?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["benefitPlan"]>

  export type BenefitPlanSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    code?: boolean
    name_en?: boolean
    name_th?: boolean
    category?: boolean
    description_en?: boolean
    description_th?: boolean
    coverage_amount?: boolean
    employer_contribution?: boolean
    employee_contribution?: boolean
    is_active?: boolean
    effective_date?: boolean
    end_date?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["benefitPlan"]>

  export type BenefitPlanSelectScalar = {
    id?: boolean
    code?: boolean
    name_en?: boolean
    name_th?: boolean
    category?: boolean
    description_en?: boolean
    description_th?: boolean
    coverage_amount?: boolean
    employer_contribution?: boolean
    employee_contribution?: boolean
    is_active?: boolean
    effective_date?: boolean
    end_date?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type BenefitPlanOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "code" | "name_en" | "name_th" | "category" | "description_en" | "description_th" | "coverage_amount" | "employer_contribution" | "employee_contribution" | "is_active" | "effective_date" | "end_date" | "created_at" | "updated_at", ExtArgs["result"]["benefitPlan"]>
  export type BenefitPlanInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    enrollments?: boolean | BenefitPlan$enrollmentsArgs<ExtArgs>
    _count?: boolean | BenefitPlanCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type BenefitPlanIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type BenefitPlanIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $BenefitPlanPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "BenefitPlan"
    objects: {
      enrollments: Prisma.$BenefitEnrollmentPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      code: string
      name_en: string
      name_th: string | null
      category: string
      description_en: string | null
      description_th: string | null
      coverage_amount: number | null
      employer_contribution: number
      employee_contribution: number
      is_active: boolean
      effective_date: Date
      end_date: Date | null
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["benefitPlan"]>
    composites: {}
  }

  type BenefitPlanGetPayload<S extends boolean | null | undefined | BenefitPlanDefaultArgs> = $Result.GetResult<Prisma.$BenefitPlanPayload, S>

  type BenefitPlanCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<BenefitPlanFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: BenefitPlanCountAggregateInputType | true
    }

  export interface BenefitPlanDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['BenefitPlan'], meta: { name: 'BenefitPlan' } }
    /**
     * Find zero or one BenefitPlan that matches the filter.
     * @param {BenefitPlanFindUniqueArgs} args - Arguments to find a BenefitPlan
     * @example
     * // Get one BenefitPlan
     * const benefitPlan = await prisma.benefitPlan.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BenefitPlanFindUniqueArgs>(args: SelectSubset<T, BenefitPlanFindUniqueArgs<ExtArgs>>): Prisma__BenefitPlanClient<$Result.GetResult<Prisma.$BenefitPlanPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one BenefitPlan that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {BenefitPlanFindUniqueOrThrowArgs} args - Arguments to find a BenefitPlan
     * @example
     * // Get one BenefitPlan
     * const benefitPlan = await prisma.benefitPlan.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BenefitPlanFindUniqueOrThrowArgs>(args: SelectSubset<T, BenefitPlanFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BenefitPlanClient<$Result.GetResult<Prisma.$BenefitPlanPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first BenefitPlan that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BenefitPlanFindFirstArgs} args - Arguments to find a BenefitPlan
     * @example
     * // Get one BenefitPlan
     * const benefitPlan = await prisma.benefitPlan.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BenefitPlanFindFirstArgs>(args?: SelectSubset<T, BenefitPlanFindFirstArgs<ExtArgs>>): Prisma__BenefitPlanClient<$Result.GetResult<Prisma.$BenefitPlanPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first BenefitPlan that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BenefitPlanFindFirstOrThrowArgs} args - Arguments to find a BenefitPlan
     * @example
     * // Get one BenefitPlan
     * const benefitPlan = await prisma.benefitPlan.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BenefitPlanFindFirstOrThrowArgs>(args?: SelectSubset<T, BenefitPlanFindFirstOrThrowArgs<ExtArgs>>): Prisma__BenefitPlanClient<$Result.GetResult<Prisma.$BenefitPlanPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more BenefitPlans that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BenefitPlanFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all BenefitPlans
     * const benefitPlans = await prisma.benefitPlan.findMany()
     * 
     * // Get first 10 BenefitPlans
     * const benefitPlans = await prisma.benefitPlan.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const benefitPlanWithIdOnly = await prisma.benefitPlan.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends BenefitPlanFindManyArgs>(args?: SelectSubset<T, BenefitPlanFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BenefitPlanPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a BenefitPlan.
     * @param {BenefitPlanCreateArgs} args - Arguments to create a BenefitPlan.
     * @example
     * // Create one BenefitPlan
     * const BenefitPlan = await prisma.benefitPlan.create({
     *   data: {
     *     // ... data to create a BenefitPlan
     *   }
     * })
     * 
     */
    create<T extends BenefitPlanCreateArgs>(args: SelectSubset<T, BenefitPlanCreateArgs<ExtArgs>>): Prisma__BenefitPlanClient<$Result.GetResult<Prisma.$BenefitPlanPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many BenefitPlans.
     * @param {BenefitPlanCreateManyArgs} args - Arguments to create many BenefitPlans.
     * @example
     * // Create many BenefitPlans
     * const benefitPlan = await prisma.benefitPlan.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BenefitPlanCreateManyArgs>(args?: SelectSubset<T, BenefitPlanCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many BenefitPlans and returns the data saved in the database.
     * @param {BenefitPlanCreateManyAndReturnArgs} args - Arguments to create many BenefitPlans.
     * @example
     * // Create many BenefitPlans
     * const benefitPlan = await prisma.benefitPlan.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many BenefitPlans and only return the `id`
     * const benefitPlanWithIdOnly = await prisma.benefitPlan.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends BenefitPlanCreateManyAndReturnArgs>(args?: SelectSubset<T, BenefitPlanCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BenefitPlanPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a BenefitPlan.
     * @param {BenefitPlanDeleteArgs} args - Arguments to delete one BenefitPlan.
     * @example
     * // Delete one BenefitPlan
     * const BenefitPlan = await prisma.benefitPlan.delete({
     *   where: {
     *     // ... filter to delete one BenefitPlan
     *   }
     * })
     * 
     */
    delete<T extends BenefitPlanDeleteArgs>(args: SelectSubset<T, BenefitPlanDeleteArgs<ExtArgs>>): Prisma__BenefitPlanClient<$Result.GetResult<Prisma.$BenefitPlanPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one BenefitPlan.
     * @param {BenefitPlanUpdateArgs} args - Arguments to update one BenefitPlan.
     * @example
     * // Update one BenefitPlan
     * const benefitPlan = await prisma.benefitPlan.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BenefitPlanUpdateArgs>(args: SelectSubset<T, BenefitPlanUpdateArgs<ExtArgs>>): Prisma__BenefitPlanClient<$Result.GetResult<Prisma.$BenefitPlanPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more BenefitPlans.
     * @param {BenefitPlanDeleteManyArgs} args - Arguments to filter BenefitPlans to delete.
     * @example
     * // Delete a few BenefitPlans
     * const { count } = await prisma.benefitPlan.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BenefitPlanDeleteManyArgs>(args?: SelectSubset<T, BenefitPlanDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more BenefitPlans.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BenefitPlanUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many BenefitPlans
     * const benefitPlan = await prisma.benefitPlan.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BenefitPlanUpdateManyArgs>(args: SelectSubset<T, BenefitPlanUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more BenefitPlans and returns the data updated in the database.
     * @param {BenefitPlanUpdateManyAndReturnArgs} args - Arguments to update many BenefitPlans.
     * @example
     * // Update many BenefitPlans
     * const benefitPlan = await prisma.benefitPlan.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more BenefitPlans and only return the `id`
     * const benefitPlanWithIdOnly = await prisma.benefitPlan.updateManyAndReturn({
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
    updateManyAndReturn<T extends BenefitPlanUpdateManyAndReturnArgs>(args: SelectSubset<T, BenefitPlanUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BenefitPlanPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one BenefitPlan.
     * @param {BenefitPlanUpsertArgs} args - Arguments to update or create a BenefitPlan.
     * @example
     * // Update or create a BenefitPlan
     * const benefitPlan = await prisma.benefitPlan.upsert({
     *   create: {
     *     // ... data to create a BenefitPlan
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the BenefitPlan we want to update
     *   }
     * })
     */
    upsert<T extends BenefitPlanUpsertArgs>(args: SelectSubset<T, BenefitPlanUpsertArgs<ExtArgs>>): Prisma__BenefitPlanClient<$Result.GetResult<Prisma.$BenefitPlanPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of BenefitPlans.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BenefitPlanCountArgs} args - Arguments to filter BenefitPlans to count.
     * @example
     * // Count the number of BenefitPlans
     * const count = await prisma.benefitPlan.count({
     *   where: {
     *     // ... the filter for the BenefitPlans we want to count
     *   }
     * })
    **/
    count<T extends BenefitPlanCountArgs>(
      args?: Subset<T, BenefitPlanCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BenefitPlanCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a BenefitPlan.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BenefitPlanAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends BenefitPlanAggregateArgs>(args: Subset<T, BenefitPlanAggregateArgs>): Prisma.PrismaPromise<GetBenefitPlanAggregateType<T>>

    /**
     * Group by BenefitPlan.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BenefitPlanGroupByArgs} args - Group by arguments.
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
      T extends BenefitPlanGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BenefitPlanGroupByArgs['orderBy'] }
        : { orderBy?: BenefitPlanGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, BenefitPlanGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBenefitPlanGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the BenefitPlan model
   */
  readonly fields: BenefitPlanFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for BenefitPlan.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BenefitPlanClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    enrollments<T extends BenefitPlan$enrollmentsArgs<ExtArgs> = {}>(args?: Subset<T, BenefitPlan$enrollmentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BenefitEnrollmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the BenefitPlan model
   */
  interface BenefitPlanFieldRefs {
    readonly id: FieldRef<"BenefitPlan", 'String'>
    readonly code: FieldRef<"BenefitPlan", 'String'>
    readonly name_en: FieldRef<"BenefitPlan", 'String'>
    readonly name_th: FieldRef<"BenefitPlan", 'String'>
    readonly category: FieldRef<"BenefitPlan", 'String'>
    readonly description_en: FieldRef<"BenefitPlan", 'String'>
    readonly description_th: FieldRef<"BenefitPlan", 'String'>
    readonly coverage_amount: FieldRef<"BenefitPlan", 'Float'>
    readonly employer_contribution: FieldRef<"BenefitPlan", 'Float'>
    readonly employee_contribution: FieldRef<"BenefitPlan", 'Float'>
    readonly is_active: FieldRef<"BenefitPlan", 'Boolean'>
    readonly effective_date: FieldRef<"BenefitPlan", 'DateTime'>
    readonly end_date: FieldRef<"BenefitPlan", 'DateTime'>
    readonly created_at: FieldRef<"BenefitPlan", 'DateTime'>
    readonly updated_at: FieldRef<"BenefitPlan", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * BenefitPlan findUnique
   */
  export type BenefitPlanFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BenefitPlan
     */
    select?: BenefitPlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BenefitPlan
     */
    omit?: BenefitPlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BenefitPlanInclude<ExtArgs> | null
    /**
     * Filter, which BenefitPlan to fetch.
     */
    where: BenefitPlanWhereUniqueInput
  }

  /**
   * BenefitPlan findUniqueOrThrow
   */
  export type BenefitPlanFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BenefitPlan
     */
    select?: BenefitPlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BenefitPlan
     */
    omit?: BenefitPlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BenefitPlanInclude<ExtArgs> | null
    /**
     * Filter, which BenefitPlan to fetch.
     */
    where: BenefitPlanWhereUniqueInput
  }

  /**
   * BenefitPlan findFirst
   */
  export type BenefitPlanFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BenefitPlan
     */
    select?: BenefitPlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BenefitPlan
     */
    omit?: BenefitPlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BenefitPlanInclude<ExtArgs> | null
    /**
     * Filter, which BenefitPlan to fetch.
     */
    where?: BenefitPlanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BenefitPlans to fetch.
     */
    orderBy?: BenefitPlanOrderByWithRelationInput | BenefitPlanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BenefitPlans.
     */
    cursor?: BenefitPlanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BenefitPlans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BenefitPlans.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BenefitPlans.
     */
    distinct?: BenefitPlanScalarFieldEnum | BenefitPlanScalarFieldEnum[]
  }

  /**
   * BenefitPlan findFirstOrThrow
   */
  export type BenefitPlanFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BenefitPlan
     */
    select?: BenefitPlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BenefitPlan
     */
    omit?: BenefitPlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BenefitPlanInclude<ExtArgs> | null
    /**
     * Filter, which BenefitPlan to fetch.
     */
    where?: BenefitPlanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BenefitPlans to fetch.
     */
    orderBy?: BenefitPlanOrderByWithRelationInput | BenefitPlanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BenefitPlans.
     */
    cursor?: BenefitPlanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BenefitPlans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BenefitPlans.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BenefitPlans.
     */
    distinct?: BenefitPlanScalarFieldEnum | BenefitPlanScalarFieldEnum[]
  }

  /**
   * BenefitPlan findMany
   */
  export type BenefitPlanFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BenefitPlan
     */
    select?: BenefitPlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BenefitPlan
     */
    omit?: BenefitPlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BenefitPlanInclude<ExtArgs> | null
    /**
     * Filter, which BenefitPlans to fetch.
     */
    where?: BenefitPlanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BenefitPlans to fetch.
     */
    orderBy?: BenefitPlanOrderByWithRelationInput | BenefitPlanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing BenefitPlans.
     */
    cursor?: BenefitPlanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BenefitPlans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BenefitPlans.
     */
    skip?: number
    distinct?: BenefitPlanScalarFieldEnum | BenefitPlanScalarFieldEnum[]
  }

  /**
   * BenefitPlan create
   */
  export type BenefitPlanCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BenefitPlan
     */
    select?: BenefitPlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BenefitPlan
     */
    omit?: BenefitPlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BenefitPlanInclude<ExtArgs> | null
    /**
     * The data needed to create a BenefitPlan.
     */
    data: XOR<BenefitPlanCreateInput, BenefitPlanUncheckedCreateInput>
  }

  /**
   * BenefitPlan createMany
   */
  export type BenefitPlanCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many BenefitPlans.
     */
    data: BenefitPlanCreateManyInput | BenefitPlanCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * BenefitPlan createManyAndReturn
   */
  export type BenefitPlanCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BenefitPlan
     */
    select?: BenefitPlanSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the BenefitPlan
     */
    omit?: BenefitPlanOmit<ExtArgs> | null
    /**
     * The data used to create many BenefitPlans.
     */
    data: BenefitPlanCreateManyInput | BenefitPlanCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * BenefitPlan update
   */
  export type BenefitPlanUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BenefitPlan
     */
    select?: BenefitPlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BenefitPlan
     */
    omit?: BenefitPlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BenefitPlanInclude<ExtArgs> | null
    /**
     * The data needed to update a BenefitPlan.
     */
    data: XOR<BenefitPlanUpdateInput, BenefitPlanUncheckedUpdateInput>
    /**
     * Choose, which BenefitPlan to update.
     */
    where: BenefitPlanWhereUniqueInput
  }

  /**
   * BenefitPlan updateMany
   */
  export type BenefitPlanUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update BenefitPlans.
     */
    data: XOR<BenefitPlanUpdateManyMutationInput, BenefitPlanUncheckedUpdateManyInput>
    /**
     * Filter which BenefitPlans to update
     */
    where?: BenefitPlanWhereInput
    /**
     * Limit how many BenefitPlans to update.
     */
    limit?: number
  }

  /**
   * BenefitPlan updateManyAndReturn
   */
  export type BenefitPlanUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BenefitPlan
     */
    select?: BenefitPlanSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the BenefitPlan
     */
    omit?: BenefitPlanOmit<ExtArgs> | null
    /**
     * The data used to update BenefitPlans.
     */
    data: XOR<BenefitPlanUpdateManyMutationInput, BenefitPlanUncheckedUpdateManyInput>
    /**
     * Filter which BenefitPlans to update
     */
    where?: BenefitPlanWhereInput
    /**
     * Limit how many BenefitPlans to update.
     */
    limit?: number
  }

  /**
   * BenefitPlan upsert
   */
  export type BenefitPlanUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BenefitPlan
     */
    select?: BenefitPlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BenefitPlan
     */
    omit?: BenefitPlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BenefitPlanInclude<ExtArgs> | null
    /**
     * The filter to search for the BenefitPlan to update in case it exists.
     */
    where: BenefitPlanWhereUniqueInput
    /**
     * In case the BenefitPlan found by the `where` argument doesn't exist, create a new BenefitPlan with this data.
     */
    create: XOR<BenefitPlanCreateInput, BenefitPlanUncheckedCreateInput>
    /**
     * In case the BenefitPlan was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BenefitPlanUpdateInput, BenefitPlanUncheckedUpdateInput>
  }

  /**
   * BenefitPlan delete
   */
  export type BenefitPlanDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BenefitPlan
     */
    select?: BenefitPlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BenefitPlan
     */
    omit?: BenefitPlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BenefitPlanInclude<ExtArgs> | null
    /**
     * Filter which BenefitPlan to delete.
     */
    where: BenefitPlanWhereUniqueInput
  }

  /**
   * BenefitPlan deleteMany
   */
  export type BenefitPlanDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BenefitPlans to delete
     */
    where?: BenefitPlanWhereInput
    /**
     * Limit how many BenefitPlans to delete.
     */
    limit?: number
  }

  /**
   * BenefitPlan.enrollments
   */
  export type BenefitPlan$enrollmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BenefitEnrollment
     */
    select?: BenefitEnrollmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BenefitEnrollment
     */
    omit?: BenefitEnrollmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BenefitEnrollmentInclude<ExtArgs> | null
    where?: BenefitEnrollmentWhereInput
    orderBy?: BenefitEnrollmentOrderByWithRelationInput | BenefitEnrollmentOrderByWithRelationInput[]
    cursor?: BenefitEnrollmentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BenefitEnrollmentScalarFieldEnum | BenefitEnrollmentScalarFieldEnum[]
  }

  /**
   * BenefitPlan without action
   */
  export type BenefitPlanDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BenefitPlan
     */
    select?: BenefitPlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BenefitPlan
     */
    omit?: BenefitPlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BenefitPlanInclude<ExtArgs> | null
  }


  /**
   * Model BenefitEnrollment
   */

  export type AggregateBenefitEnrollment = {
    _count: BenefitEnrollmentCountAggregateOutputType | null
    _min: BenefitEnrollmentMinAggregateOutputType | null
    _max: BenefitEnrollmentMaxAggregateOutputType | null
  }

  export type BenefitEnrollmentMinAggregateOutputType = {
    id: string | null
    employee_id: string | null
    plan_id: string | null
    coverage_level: string | null
    status: string | null
    enrolled_at: Date | null
    effective_date: Date | null
    end_date: Date | null
    cancelled_at: Date | null
    cancellation_reason: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type BenefitEnrollmentMaxAggregateOutputType = {
    id: string | null
    employee_id: string | null
    plan_id: string | null
    coverage_level: string | null
    status: string | null
    enrolled_at: Date | null
    effective_date: Date | null
    end_date: Date | null
    cancelled_at: Date | null
    cancellation_reason: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type BenefitEnrollmentCountAggregateOutputType = {
    id: number
    employee_id: number
    plan_id: number
    coverage_level: number
    status: number
    enrolled_at: number
    effective_date: number
    end_date: number
    cancelled_at: number
    cancellation_reason: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type BenefitEnrollmentMinAggregateInputType = {
    id?: true
    employee_id?: true
    plan_id?: true
    coverage_level?: true
    status?: true
    enrolled_at?: true
    effective_date?: true
    end_date?: true
    cancelled_at?: true
    cancellation_reason?: true
    created_at?: true
    updated_at?: true
  }

  export type BenefitEnrollmentMaxAggregateInputType = {
    id?: true
    employee_id?: true
    plan_id?: true
    coverage_level?: true
    status?: true
    enrolled_at?: true
    effective_date?: true
    end_date?: true
    cancelled_at?: true
    cancellation_reason?: true
    created_at?: true
    updated_at?: true
  }

  export type BenefitEnrollmentCountAggregateInputType = {
    id?: true
    employee_id?: true
    plan_id?: true
    coverage_level?: true
    status?: true
    enrolled_at?: true
    effective_date?: true
    end_date?: true
    cancelled_at?: true
    cancellation_reason?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type BenefitEnrollmentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BenefitEnrollment to aggregate.
     */
    where?: BenefitEnrollmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BenefitEnrollments to fetch.
     */
    orderBy?: BenefitEnrollmentOrderByWithRelationInput | BenefitEnrollmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BenefitEnrollmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BenefitEnrollments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BenefitEnrollments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned BenefitEnrollments
    **/
    _count?: true | BenefitEnrollmentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BenefitEnrollmentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BenefitEnrollmentMaxAggregateInputType
  }

  export type GetBenefitEnrollmentAggregateType<T extends BenefitEnrollmentAggregateArgs> = {
        [P in keyof T & keyof AggregateBenefitEnrollment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBenefitEnrollment[P]>
      : GetScalarType<T[P], AggregateBenefitEnrollment[P]>
  }




  export type BenefitEnrollmentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BenefitEnrollmentWhereInput
    orderBy?: BenefitEnrollmentOrderByWithAggregationInput | BenefitEnrollmentOrderByWithAggregationInput[]
    by: BenefitEnrollmentScalarFieldEnum[] | BenefitEnrollmentScalarFieldEnum
    having?: BenefitEnrollmentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BenefitEnrollmentCountAggregateInputType | true
    _min?: BenefitEnrollmentMinAggregateInputType
    _max?: BenefitEnrollmentMaxAggregateInputType
  }

  export type BenefitEnrollmentGroupByOutputType = {
    id: string
    employee_id: string
    plan_id: string
    coverage_level: string
    status: string
    enrolled_at: Date
    effective_date: Date
    end_date: Date | null
    cancelled_at: Date | null
    cancellation_reason: string | null
    created_at: Date
    updated_at: Date
    _count: BenefitEnrollmentCountAggregateOutputType | null
    _min: BenefitEnrollmentMinAggregateOutputType | null
    _max: BenefitEnrollmentMaxAggregateOutputType | null
  }

  type GetBenefitEnrollmentGroupByPayload<T extends BenefitEnrollmentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BenefitEnrollmentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BenefitEnrollmentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BenefitEnrollmentGroupByOutputType[P]>
            : GetScalarType<T[P], BenefitEnrollmentGroupByOutputType[P]>
        }
      >
    >


  export type BenefitEnrollmentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    employee_id?: boolean
    plan_id?: boolean
    coverage_level?: boolean
    status?: boolean
    enrolled_at?: boolean
    effective_date?: boolean
    end_date?: boolean
    cancelled_at?: boolean
    cancellation_reason?: boolean
    created_at?: boolean
    updated_at?: boolean
    plan?: boolean | BenefitPlanDefaultArgs<ExtArgs>
    dependents?: boolean | BenefitEnrollment$dependentsArgs<ExtArgs>
    _count?: boolean | BenefitEnrollmentCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["benefitEnrollment"]>

  export type BenefitEnrollmentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    employee_id?: boolean
    plan_id?: boolean
    coverage_level?: boolean
    status?: boolean
    enrolled_at?: boolean
    effective_date?: boolean
    end_date?: boolean
    cancelled_at?: boolean
    cancellation_reason?: boolean
    created_at?: boolean
    updated_at?: boolean
    plan?: boolean | BenefitPlanDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["benefitEnrollment"]>

  export type BenefitEnrollmentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    employee_id?: boolean
    plan_id?: boolean
    coverage_level?: boolean
    status?: boolean
    enrolled_at?: boolean
    effective_date?: boolean
    end_date?: boolean
    cancelled_at?: boolean
    cancellation_reason?: boolean
    created_at?: boolean
    updated_at?: boolean
    plan?: boolean | BenefitPlanDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["benefitEnrollment"]>

  export type BenefitEnrollmentSelectScalar = {
    id?: boolean
    employee_id?: boolean
    plan_id?: boolean
    coverage_level?: boolean
    status?: boolean
    enrolled_at?: boolean
    effective_date?: boolean
    end_date?: boolean
    cancelled_at?: boolean
    cancellation_reason?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type BenefitEnrollmentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "employee_id" | "plan_id" | "coverage_level" | "status" | "enrolled_at" | "effective_date" | "end_date" | "cancelled_at" | "cancellation_reason" | "created_at" | "updated_at", ExtArgs["result"]["benefitEnrollment"]>
  export type BenefitEnrollmentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    plan?: boolean | BenefitPlanDefaultArgs<ExtArgs>
    dependents?: boolean | BenefitEnrollment$dependentsArgs<ExtArgs>
    _count?: boolean | BenefitEnrollmentCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type BenefitEnrollmentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    plan?: boolean | BenefitPlanDefaultArgs<ExtArgs>
  }
  export type BenefitEnrollmentIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    plan?: boolean | BenefitPlanDefaultArgs<ExtArgs>
  }

  export type $BenefitEnrollmentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "BenefitEnrollment"
    objects: {
      plan: Prisma.$BenefitPlanPayload<ExtArgs>
      dependents: Prisma.$BenefitDependentPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      employee_id: string
      plan_id: string
      coverage_level: string
      status: string
      enrolled_at: Date
      effective_date: Date
      end_date: Date | null
      cancelled_at: Date | null
      cancellation_reason: string | null
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["benefitEnrollment"]>
    composites: {}
  }

  type BenefitEnrollmentGetPayload<S extends boolean | null | undefined | BenefitEnrollmentDefaultArgs> = $Result.GetResult<Prisma.$BenefitEnrollmentPayload, S>

  type BenefitEnrollmentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<BenefitEnrollmentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: BenefitEnrollmentCountAggregateInputType | true
    }

  export interface BenefitEnrollmentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['BenefitEnrollment'], meta: { name: 'BenefitEnrollment' } }
    /**
     * Find zero or one BenefitEnrollment that matches the filter.
     * @param {BenefitEnrollmentFindUniqueArgs} args - Arguments to find a BenefitEnrollment
     * @example
     * // Get one BenefitEnrollment
     * const benefitEnrollment = await prisma.benefitEnrollment.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BenefitEnrollmentFindUniqueArgs>(args: SelectSubset<T, BenefitEnrollmentFindUniqueArgs<ExtArgs>>): Prisma__BenefitEnrollmentClient<$Result.GetResult<Prisma.$BenefitEnrollmentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one BenefitEnrollment that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {BenefitEnrollmentFindUniqueOrThrowArgs} args - Arguments to find a BenefitEnrollment
     * @example
     * // Get one BenefitEnrollment
     * const benefitEnrollment = await prisma.benefitEnrollment.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BenefitEnrollmentFindUniqueOrThrowArgs>(args: SelectSubset<T, BenefitEnrollmentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BenefitEnrollmentClient<$Result.GetResult<Prisma.$BenefitEnrollmentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first BenefitEnrollment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BenefitEnrollmentFindFirstArgs} args - Arguments to find a BenefitEnrollment
     * @example
     * // Get one BenefitEnrollment
     * const benefitEnrollment = await prisma.benefitEnrollment.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BenefitEnrollmentFindFirstArgs>(args?: SelectSubset<T, BenefitEnrollmentFindFirstArgs<ExtArgs>>): Prisma__BenefitEnrollmentClient<$Result.GetResult<Prisma.$BenefitEnrollmentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first BenefitEnrollment that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BenefitEnrollmentFindFirstOrThrowArgs} args - Arguments to find a BenefitEnrollment
     * @example
     * // Get one BenefitEnrollment
     * const benefitEnrollment = await prisma.benefitEnrollment.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BenefitEnrollmentFindFirstOrThrowArgs>(args?: SelectSubset<T, BenefitEnrollmentFindFirstOrThrowArgs<ExtArgs>>): Prisma__BenefitEnrollmentClient<$Result.GetResult<Prisma.$BenefitEnrollmentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more BenefitEnrollments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BenefitEnrollmentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all BenefitEnrollments
     * const benefitEnrollments = await prisma.benefitEnrollment.findMany()
     * 
     * // Get first 10 BenefitEnrollments
     * const benefitEnrollments = await prisma.benefitEnrollment.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const benefitEnrollmentWithIdOnly = await prisma.benefitEnrollment.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends BenefitEnrollmentFindManyArgs>(args?: SelectSubset<T, BenefitEnrollmentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BenefitEnrollmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a BenefitEnrollment.
     * @param {BenefitEnrollmentCreateArgs} args - Arguments to create a BenefitEnrollment.
     * @example
     * // Create one BenefitEnrollment
     * const BenefitEnrollment = await prisma.benefitEnrollment.create({
     *   data: {
     *     // ... data to create a BenefitEnrollment
     *   }
     * })
     * 
     */
    create<T extends BenefitEnrollmentCreateArgs>(args: SelectSubset<T, BenefitEnrollmentCreateArgs<ExtArgs>>): Prisma__BenefitEnrollmentClient<$Result.GetResult<Prisma.$BenefitEnrollmentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many BenefitEnrollments.
     * @param {BenefitEnrollmentCreateManyArgs} args - Arguments to create many BenefitEnrollments.
     * @example
     * // Create many BenefitEnrollments
     * const benefitEnrollment = await prisma.benefitEnrollment.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BenefitEnrollmentCreateManyArgs>(args?: SelectSubset<T, BenefitEnrollmentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many BenefitEnrollments and returns the data saved in the database.
     * @param {BenefitEnrollmentCreateManyAndReturnArgs} args - Arguments to create many BenefitEnrollments.
     * @example
     * // Create many BenefitEnrollments
     * const benefitEnrollment = await prisma.benefitEnrollment.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many BenefitEnrollments and only return the `id`
     * const benefitEnrollmentWithIdOnly = await prisma.benefitEnrollment.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends BenefitEnrollmentCreateManyAndReturnArgs>(args?: SelectSubset<T, BenefitEnrollmentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BenefitEnrollmentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a BenefitEnrollment.
     * @param {BenefitEnrollmentDeleteArgs} args - Arguments to delete one BenefitEnrollment.
     * @example
     * // Delete one BenefitEnrollment
     * const BenefitEnrollment = await prisma.benefitEnrollment.delete({
     *   where: {
     *     // ... filter to delete one BenefitEnrollment
     *   }
     * })
     * 
     */
    delete<T extends BenefitEnrollmentDeleteArgs>(args: SelectSubset<T, BenefitEnrollmentDeleteArgs<ExtArgs>>): Prisma__BenefitEnrollmentClient<$Result.GetResult<Prisma.$BenefitEnrollmentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one BenefitEnrollment.
     * @param {BenefitEnrollmentUpdateArgs} args - Arguments to update one BenefitEnrollment.
     * @example
     * // Update one BenefitEnrollment
     * const benefitEnrollment = await prisma.benefitEnrollment.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BenefitEnrollmentUpdateArgs>(args: SelectSubset<T, BenefitEnrollmentUpdateArgs<ExtArgs>>): Prisma__BenefitEnrollmentClient<$Result.GetResult<Prisma.$BenefitEnrollmentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more BenefitEnrollments.
     * @param {BenefitEnrollmentDeleteManyArgs} args - Arguments to filter BenefitEnrollments to delete.
     * @example
     * // Delete a few BenefitEnrollments
     * const { count } = await prisma.benefitEnrollment.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BenefitEnrollmentDeleteManyArgs>(args?: SelectSubset<T, BenefitEnrollmentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more BenefitEnrollments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BenefitEnrollmentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many BenefitEnrollments
     * const benefitEnrollment = await prisma.benefitEnrollment.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BenefitEnrollmentUpdateManyArgs>(args: SelectSubset<T, BenefitEnrollmentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more BenefitEnrollments and returns the data updated in the database.
     * @param {BenefitEnrollmentUpdateManyAndReturnArgs} args - Arguments to update many BenefitEnrollments.
     * @example
     * // Update many BenefitEnrollments
     * const benefitEnrollment = await prisma.benefitEnrollment.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more BenefitEnrollments and only return the `id`
     * const benefitEnrollmentWithIdOnly = await prisma.benefitEnrollment.updateManyAndReturn({
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
    updateManyAndReturn<T extends BenefitEnrollmentUpdateManyAndReturnArgs>(args: SelectSubset<T, BenefitEnrollmentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BenefitEnrollmentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one BenefitEnrollment.
     * @param {BenefitEnrollmentUpsertArgs} args - Arguments to update or create a BenefitEnrollment.
     * @example
     * // Update or create a BenefitEnrollment
     * const benefitEnrollment = await prisma.benefitEnrollment.upsert({
     *   create: {
     *     // ... data to create a BenefitEnrollment
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the BenefitEnrollment we want to update
     *   }
     * })
     */
    upsert<T extends BenefitEnrollmentUpsertArgs>(args: SelectSubset<T, BenefitEnrollmentUpsertArgs<ExtArgs>>): Prisma__BenefitEnrollmentClient<$Result.GetResult<Prisma.$BenefitEnrollmentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of BenefitEnrollments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BenefitEnrollmentCountArgs} args - Arguments to filter BenefitEnrollments to count.
     * @example
     * // Count the number of BenefitEnrollments
     * const count = await prisma.benefitEnrollment.count({
     *   where: {
     *     // ... the filter for the BenefitEnrollments we want to count
     *   }
     * })
    **/
    count<T extends BenefitEnrollmentCountArgs>(
      args?: Subset<T, BenefitEnrollmentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BenefitEnrollmentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a BenefitEnrollment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BenefitEnrollmentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends BenefitEnrollmentAggregateArgs>(args: Subset<T, BenefitEnrollmentAggregateArgs>): Prisma.PrismaPromise<GetBenefitEnrollmentAggregateType<T>>

    /**
     * Group by BenefitEnrollment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BenefitEnrollmentGroupByArgs} args - Group by arguments.
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
      T extends BenefitEnrollmentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BenefitEnrollmentGroupByArgs['orderBy'] }
        : { orderBy?: BenefitEnrollmentGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, BenefitEnrollmentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBenefitEnrollmentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the BenefitEnrollment model
   */
  readonly fields: BenefitEnrollmentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for BenefitEnrollment.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BenefitEnrollmentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    plan<T extends BenefitPlanDefaultArgs<ExtArgs> = {}>(args?: Subset<T, BenefitPlanDefaultArgs<ExtArgs>>): Prisma__BenefitPlanClient<$Result.GetResult<Prisma.$BenefitPlanPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    dependents<T extends BenefitEnrollment$dependentsArgs<ExtArgs> = {}>(args?: Subset<T, BenefitEnrollment$dependentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BenefitDependentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the BenefitEnrollment model
   */
  interface BenefitEnrollmentFieldRefs {
    readonly id: FieldRef<"BenefitEnrollment", 'String'>
    readonly employee_id: FieldRef<"BenefitEnrollment", 'String'>
    readonly plan_id: FieldRef<"BenefitEnrollment", 'String'>
    readonly coverage_level: FieldRef<"BenefitEnrollment", 'String'>
    readonly status: FieldRef<"BenefitEnrollment", 'String'>
    readonly enrolled_at: FieldRef<"BenefitEnrollment", 'DateTime'>
    readonly effective_date: FieldRef<"BenefitEnrollment", 'DateTime'>
    readonly end_date: FieldRef<"BenefitEnrollment", 'DateTime'>
    readonly cancelled_at: FieldRef<"BenefitEnrollment", 'DateTime'>
    readonly cancellation_reason: FieldRef<"BenefitEnrollment", 'String'>
    readonly created_at: FieldRef<"BenefitEnrollment", 'DateTime'>
    readonly updated_at: FieldRef<"BenefitEnrollment", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * BenefitEnrollment findUnique
   */
  export type BenefitEnrollmentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BenefitEnrollment
     */
    select?: BenefitEnrollmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BenefitEnrollment
     */
    omit?: BenefitEnrollmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BenefitEnrollmentInclude<ExtArgs> | null
    /**
     * Filter, which BenefitEnrollment to fetch.
     */
    where: BenefitEnrollmentWhereUniqueInput
  }

  /**
   * BenefitEnrollment findUniqueOrThrow
   */
  export type BenefitEnrollmentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BenefitEnrollment
     */
    select?: BenefitEnrollmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BenefitEnrollment
     */
    omit?: BenefitEnrollmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BenefitEnrollmentInclude<ExtArgs> | null
    /**
     * Filter, which BenefitEnrollment to fetch.
     */
    where: BenefitEnrollmentWhereUniqueInput
  }

  /**
   * BenefitEnrollment findFirst
   */
  export type BenefitEnrollmentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BenefitEnrollment
     */
    select?: BenefitEnrollmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BenefitEnrollment
     */
    omit?: BenefitEnrollmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BenefitEnrollmentInclude<ExtArgs> | null
    /**
     * Filter, which BenefitEnrollment to fetch.
     */
    where?: BenefitEnrollmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BenefitEnrollments to fetch.
     */
    orderBy?: BenefitEnrollmentOrderByWithRelationInput | BenefitEnrollmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BenefitEnrollments.
     */
    cursor?: BenefitEnrollmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BenefitEnrollments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BenefitEnrollments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BenefitEnrollments.
     */
    distinct?: BenefitEnrollmentScalarFieldEnum | BenefitEnrollmentScalarFieldEnum[]
  }

  /**
   * BenefitEnrollment findFirstOrThrow
   */
  export type BenefitEnrollmentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BenefitEnrollment
     */
    select?: BenefitEnrollmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BenefitEnrollment
     */
    omit?: BenefitEnrollmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BenefitEnrollmentInclude<ExtArgs> | null
    /**
     * Filter, which BenefitEnrollment to fetch.
     */
    where?: BenefitEnrollmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BenefitEnrollments to fetch.
     */
    orderBy?: BenefitEnrollmentOrderByWithRelationInput | BenefitEnrollmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BenefitEnrollments.
     */
    cursor?: BenefitEnrollmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BenefitEnrollments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BenefitEnrollments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BenefitEnrollments.
     */
    distinct?: BenefitEnrollmentScalarFieldEnum | BenefitEnrollmentScalarFieldEnum[]
  }

  /**
   * BenefitEnrollment findMany
   */
  export type BenefitEnrollmentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BenefitEnrollment
     */
    select?: BenefitEnrollmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BenefitEnrollment
     */
    omit?: BenefitEnrollmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BenefitEnrollmentInclude<ExtArgs> | null
    /**
     * Filter, which BenefitEnrollments to fetch.
     */
    where?: BenefitEnrollmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BenefitEnrollments to fetch.
     */
    orderBy?: BenefitEnrollmentOrderByWithRelationInput | BenefitEnrollmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing BenefitEnrollments.
     */
    cursor?: BenefitEnrollmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BenefitEnrollments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BenefitEnrollments.
     */
    skip?: number
    distinct?: BenefitEnrollmentScalarFieldEnum | BenefitEnrollmentScalarFieldEnum[]
  }

  /**
   * BenefitEnrollment create
   */
  export type BenefitEnrollmentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BenefitEnrollment
     */
    select?: BenefitEnrollmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BenefitEnrollment
     */
    omit?: BenefitEnrollmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BenefitEnrollmentInclude<ExtArgs> | null
    /**
     * The data needed to create a BenefitEnrollment.
     */
    data: XOR<BenefitEnrollmentCreateInput, BenefitEnrollmentUncheckedCreateInput>
  }

  /**
   * BenefitEnrollment createMany
   */
  export type BenefitEnrollmentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many BenefitEnrollments.
     */
    data: BenefitEnrollmentCreateManyInput | BenefitEnrollmentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * BenefitEnrollment createManyAndReturn
   */
  export type BenefitEnrollmentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BenefitEnrollment
     */
    select?: BenefitEnrollmentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the BenefitEnrollment
     */
    omit?: BenefitEnrollmentOmit<ExtArgs> | null
    /**
     * The data used to create many BenefitEnrollments.
     */
    data: BenefitEnrollmentCreateManyInput | BenefitEnrollmentCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BenefitEnrollmentIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * BenefitEnrollment update
   */
  export type BenefitEnrollmentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BenefitEnrollment
     */
    select?: BenefitEnrollmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BenefitEnrollment
     */
    omit?: BenefitEnrollmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BenefitEnrollmentInclude<ExtArgs> | null
    /**
     * The data needed to update a BenefitEnrollment.
     */
    data: XOR<BenefitEnrollmentUpdateInput, BenefitEnrollmentUncheckedUpdateInput>
    /**
     * Choose, which BenefitEnrollment to update.
     */
    where: BenefitEnrollmentWhereUniqueInput
  }

  /**
   * BenefitEnrollment updateMany
   */
  export type BenefitEnrollmentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update BenefitEnrollments.
     */
    data: XOR<BenefitEnrollmentUpdateManyMutationInput, BenefitEnrollmentUncheckedUpdateManyInput>
    /**
     * Filter which BenefitEnrollments to update
     */
    where?: BenefitEnrollmentWhereInput
    /**
     * Limit how many BenefitEnrollments to update.
     */
    limit?: number
  }

  /**
   * BenefitEnrollment updateManyAndReturn
   */
  export type BenefitEnrollmentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BenefitEnrollment
     */
    select?: BenefitEnrollmentSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the BenefitEnrollment
     */
    omit?: BenefitEnrollmentOmit<ExtArgs> | null
    /**
     * The data used to update BenefitEnrollments.
     */
    data: XOR<BenefitEnrollmentUpdateManyMutationInput, BenefitEnrollmentUncheckedUpdateManyInput>
    /**
     * Filter which BenefitEnrollments to update
     */
    where?: BenefitEnrollmentWhereInput
    /**
     * Limit how many BenefitEnrollments to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BenefitEnrollmentIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * BenefitEnrollment upsert
   */
  export type BenefitEnrollmentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BenefitEnrollment
     */
    select?: BenefitEnrollmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BenefitEnrollment
     */
    omit?: BenefitEnrollmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BenefitEnrollmentInclude<ExtArgs> | null
    /**
     * The filter to search for the BenefitEnrollment to update in case it exists.
     */
    where: BenefitEnrollmentWhereUniqueInput
    /**
     * In case the BenefitEnrollment found by the `where` argument doesn't exist, create a new BenefitEnrollment with this data.
     */
    create: XOR<BenefitEnrollmentCreateInput, BenefitEnrollmentUncheckedCreateInput>
    /**
     * In case the BenefitEnrollment was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BenefitEnrollmentUpdateInput, BenefitEnrollmentUncheckedUpdateInput>
  }

  /**
   * BenefitEnrollment delete
   */
  export type BenefitEnrollmentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BenefitEnrollment
     */
    select?: BenefitEnrollmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BenefitEnrollment
     */
    omit?: BenefitEnrollmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BenefitEnrollmentInclude<ExtArgs> | null
    /**
     * Filter which BenefitEnrollment to delete.
     */
    where: BenefitEnrollmentWhereUniqueInput
  }

  /**
   * BenefitEnrollment deleteMany
   */
  export type BenefitEnrollmentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BenefitEnrollments to delete
     */
    where?: BenefitEnrollmentWhereInput
    /**
     * Limit how many BenefitEnrollments to delete.
     */
    limit?: number
  }

  /**
   * BenefitEnrollment.dependents
   */
  export type BenefitEnrollment$dependentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BenefitDependent
     */
    select?: BenefitDependentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BenefitDependent
     */
    omit?: BenefitDependentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BenefitDependentInclude<ExtArgs> | null
    where?: BenefitDependentWhereInput
    orderBy?: BenefitDependentOrderByWithRelationInput | BenefitDependentOrderByWithRelationInput[]
    cursor?: BenefitDependentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BenefitDependentScalarFieldEnum | BenefitDependentScalarFieldEnum[]
  }

  /**
   * BenefitEnrollment without action
   */
  export type BenefitEnrollmentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BenefitEnrollment
     */
    select?: BenefitEnrollmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BenefitEnrollment
     */
    omit?: BenefitEnrollmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BenefitEnrollmentInclude<ExtArgs> | null
  }


  /**
   * Model BenefitDependent
   */

  export type AggregateBenefitDependent = {
    _count: BenefitDependentCountAggregateOutputType | null
    _min: BenefitDependentMinAggregateOutputType | null
    _max: BenefitDependentMaxAggregateOutputType | null
  }

  export type BenefitDependentMinAggregateOutputType = {
    id: string | null
    enrollment_id: string | null
    name: string | null
    relationship: string | null
    date_of_birth: Date | null
    national_id: string | null
    is_active: boolean | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type BenefitDependentMaxAggregateOutputType = {
    id: string | null
    enrollment_id: string | null
    name: string | null
    relationship: string | null
    date_of_birth: Date | null
    national_id: string | null
    is_active: boolean | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type BenefitDependentCountAggregateOutputType = {
    id: number
    enrollment_id: number
    name: number
    relationship: number
    date_of_birth: number
    national_id: number
    is_active: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type BenefitDependentMinAggregateInputType = {
    id?: true
    enrollment_id?: true
    name?: true
    relationship?: true
    date_of_birth?: true
    national_id?: true
    is_active?: true
    created_at?: true
    updated_at?: true
  }

  export type BenefitDependentMaxAggregateInputType = {
    id?: true
    enrollment_id?: true
    name?: true
    relationship?: true
    date_of_birth?: true
    national_id?: true
    is_active?: true
    created_at?: true
    updated_at?: true
  }

  export type BenefitDependentCountAggregateInputType = {
    id?: true
    enrollment_id?: true
    name?: true
    relationship?: true
    date_of_birth?: true
    national_id?: true
    is_active?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type BenefitDependentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BenefitDependent to aggregate.
     */
    where?: BenefitDependentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BenefitDependents to fetch.
     */
    orderBy?: BenefitDependentOrderByWithRelationInput | BenefitDependentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BenefitDependentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BenefitDependents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BenefitDependents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned BenefitDependents
    **/
    _count?: true | BenefitDependentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BenefitDependentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BenefitDependentMaxAggregateInputType
  }

  export type GetBenefitDependentAggregateType<T extends BenefitDependentAggregateArgs> = {
        [P in keyof T & keyof AggregateBenefitDependent]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBenefitDependent[P]>
      : GetScalarType<T[P], AggregateBenefitDependent[P]>
  }




  export type BenefitDependentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BenefitDependentWhereInput
    orderBy?: BenefitDependentOrderByWithAggregationInput | BenefitDependentOrderByWithAggregationInput[]
    by: BenefitDependentScalarFieldEnum[] | BenefitDependentScalarFieldEnum
    having?: BenefitDependentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BenefitDependentCountAggregateInputType | true
    _min?: BenefitDependentMinAggregateInputType
    _max?: BenefitDependentMaxAggregateInputType
  }

  export type BenefitDependentGroupByOutputType = {
    id: string
    enrollment_id: string
    name: string
    relationship: string
    date_of_birth: Date | null
    national_id: string | null
    is_active: boolean
    created_at: Date
    updated_at: Date
    _count: BenefitDependentCountAggregateOutputType | null
    _min: BenefitDependentMinAggregateOutputType | null
    _max: BenefitDependentMaxAggregateOutputType | null
  }

  type GetBenefitDependentGroupByPayload<T extends BenefitDependentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BenefitDependentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BenefitDependentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BenefitDependentGroupByOutputType[P]>
            : GetScalarType<T[P], BenefitDependentGroupByOutputType[P]>
        }
      >
    >


  export type BenefitDependentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    enrollment_id?: boolean
    name?: boolean
    relationship?: boolean
    date_of_birth?: boolean
    national_id?: boolean
    is_active?: boolean
    created_at?: boolean
    updated_at?: boolean
    enrollment?: boolean | BenefitEnrollmentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["benefitDependent"]>

  export type BenefitDependentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    enrollment_id?: boolean
    name?: boolean
    relationship?: boolean
    date_of_birth?: boolean
    national_id?: boolean
    is_active?: boolean
    created_at?: boolean
    updated_at?: boolean
    enrollment?: boolean | BenefitEnrollmentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["benefitDependent"]>

  export type BenefitDependentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    enrollment_id?: boolean
    name?: boolean
    relationship?: boolean
    date_of_birth?: boolean
    national_id?: boolean
    is_active?: boolean
    created_at?: boolean
    updated_at?: boolean
    enrollment?: boolean | BenefitEnrollmentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["benefitDependent"]>

  export type BenefitDependentSelectScalar = {
    id?: boolean
    enrollment_id?: boolean
    name?: boolean
    relationship?: boolean
    date_of_birth?: boolean
    national_id?: boolean
    is_active?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type BenefitDependentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "enrollment_id" | "name" | "relationship" | "date_of_birth" | "national_id" | "is_active" | "created_at" | "updated_at", ExtArgs["result"]["benefitDependent"]>
  export type BenefitDependentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    enrollment?: boolean | BenefitEnrollmentDefaultArgs<ExtArgs>
  }
  export type BenefitDependentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    enrollment?: boolean | BenefitEnrollmentDefaultArgs<ExtArgs>
  }
  export type BenefitDependentIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    enrollment?: boolean | BenefitEnrollmentDefaultArgs<ExtArgs>
  }

  export type $BenefitDependentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "BenefitDependent"
    objects: {
      enrollment: Prisma.$BenefitEnrollmentPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      enrollment_id: string
      name: string
      relationship: string
      date_of_birth: Date | null
      national_id: string | null
      is_active: boolean
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["benefitDependent"]>
    composites: {}
  }

  type BenefitDependentGetPayload<S extends boolean | null | undefined | BenefitDependentDefaultArgs> = $Result.GetResult<Prisma.$BenefitDependentPayload, S>

  type BenefitDependentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<BenefitDependentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: BenefitDependentCountAggregateInputType | true
    }

  export interface BenefitDependentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['BenefitDependent'], meta: { name: 'BenefitDependent' } }
    /**
     * Find zero or one BenefitDependent that matches the filter.
     * @param {BenefitDependentFindUniqueArgs} args - Arguments to find a BenefitDependent
     * @example
     * // Get one BenefitDependent
     * const benefitDependent = await prisma.benefitDependent.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BenefitDependentFindUniqueArgs>(args: SelectSubset<T, BenefitDependentFindUniqueArgs<ExtArgs>>): Prisma__BenefitDependentClient<$Result.GetResult<Prisma.$BenefitDependentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one BenefitDependent that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {BenefitDependentFindUniqueOrThrowArgs} args - Arguments to find a BenefitDependent
     * @example
     * // Get one BenefitDependent
     * const benefitDependent = await prisma.benefitDependent.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BenefitDependentFindUniqueOrThrowArgs>(args: SelectSubset<T, BenefitDependentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BenefitDependentClient<$Result.GetResult<Prisma.$BenefitDependentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first BenefitDependent that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BenefitDependentFindFirstArgs} args - Arguments to find a BenefitDependent
     * @example
     * // Get one BenefitDependent
     * const benefitDependent = await prisma.benefitDependent.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BenefitDependentFindFirstArgs>(args?: SelectSubset<T, BenefitDependentFindFirstArgs<ExtArgs>>): Prisma__BenefitDependentClient<$Result.GetResult<Prisma.$BenefitDependentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first BenefitDependent that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BenefitDependentFindFirstOrThrowArgs} args - Arguments to find a BenefitDependent
     * @example
     * // Get one BenefitDependent
     * const benefitDependent = await prisma.benefitDependent.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BenefitDependentFindFirstOrThrowArgs>(args?: SelectSubset<T, BenefitDependentFindFirstOrThrowArgs<ExtArgs>>): Prisma__BenefitDependentClient<$Result.GetResult<Prisma.$BenefitDependentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more BenefitDependents that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BenefitDependentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all BenefitDependents
     * const benefitDependents = await prisma.benefitDependent.findMany()
     * 
     * // Get first 10 BenefitDependents
     * const benefitDependents = await prisma.benefitDependent.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const benefitDependentWithIdOnly = await prisma.benefitDependent.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends BenefitDependentFindManyArgs>(args?: SelectSubset<T, BenefitDependentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BenefitDependentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a BenefitDependent.
     * @param {BenefitDependentCreateArgs} args - Arguments to create a BenefitDependent.
     * @example
     * // Create one BenefitDependent
     * const BenefitDependent = await prisma.benefitDependent.create({
     *   data: {
     *     // ... data to create a BenefitDependent
     *   }
     * })
     * 
     */
    create<T extends BenefitDependentCreateArgs>(args: SelectSubset<T, BenefitDependentCreateArgs<ExtArgs>>): Prisma__BenefitDependentClient<$Result.GetResult<Prisma.$BenefitDependentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many BenefitDependents.
     * @param {BenefitDependentCreateManyArgs} args - Arguments to create many BenefitDependents.
     * @example
     * // Create many BenefitDependents
     * const benefitDependent = await prisma.benefitDependent.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BenefitDependentCreateManyArgs>(args?: SelectSubset<T, BenefitDependentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many BenefitDependents and returns the data saved in the database.
     * @param {BenefitDependentCreateManyAndReturnArgs} args - Arguments to create many BenefitDependents.
     * @example
     * // Create many BenefitDependents
     * const benefitDependent = await prisma.benefitDependent.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many BenefitDependents and only return the `id`
     * const benefitDependentWithIdOnly = await prisma.benefitDependent.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends BenefitDependentCreateManyAndReturnArgs>(args?: SelectSubset<T, BenefitDependentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BenefitDependentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a BenefitDependent.
     * @param {BenefitDependentDeleteArgs} args - Arguments to delete one BenefitDependent.
     * @example
     * // Delete one BenefitDependent
     * const BenefitDependent = await prisma.benefitDependent.delete({
     *   where: {
     *     // ... filter to delete one BenefitDependent
     *   }
     * })
     * 
     */
    delete<T extends BenefitDependentDeleteArgs>(args: SelectSubset<T, BenefitDependentDeleteArgs<ExtArgs>>): Prisma__BenefitDependentClient<$Result.GetResult<Prisma.$BenefitDependentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one BenefitDependent.
     * @param {BenefitDependentUpdateArgs} args - Arguments to update one BenefitDependent.
     * @example
     * // Update one BenefitDependent
     * const benefitDependent = await prisma.benefitDependent.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BenefitDependentUpdateArgs>(args: SelectSubset<T, BenefitDependentUpdateArgs<ExtArgs>>): Prisma__BenefitDependentClient<$Result.GetResult<Prisma.$BenefitDependentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more BenefitDependents.
     * @param {BenefitDependentDeleteManyArgs} args - Arguments to filter BenefitDependents to delete.
     * @example
     * // Delete a few BenefitDependents
     * const { count } = await prisma.benefitDependent.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BenefitDependentDeleteManyArgs>(args?: SelectSubset<T, BenefitDependentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more BenefitDependents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BenefitDependentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many BenefitDependents
     * const benefitDependent = await prisma.benefitDependent.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BenefitDependentUpdateManyArgs>(args: SelectSubset<T, BenefitDependentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more BenefitDependents and returns the data updated in the database.
     * @param {BenefitDependentUpdateManyAndReturnArgs} args - Arguments to update many BenefitDependents.
     * @example
     * // Update many BenefitDependents
     * const benefitDependent = await prisma.benefitDependent.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more BenefitDependents and only return the `id`
     * const benefitDependentWithIdOnly = await prisma.benefitDependent.updateManyAndReturn({
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
    updateManyAndReturn<T extends BenefitDependentUpdateManyAndReturnArgs>(args: SelectSubset<T, BenefitDependentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BenefitDependentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one BenefitDependent.
     * @param {BenefitDependentUpsertArgs} args - Arguments to update or create a BenefitDependent.
     * @example
     * // Update or create a BenefitDependent
     * const benefitDependent = await prisma.benefitDependent.upsert({
     *   create: {
     *     // ... data to create a BenefitDependent
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the BenefitDependent we want to update
     *   }
     * })
     */
    upsert<T extends BenefitDependentUpsertArgs>(args: SelectSubset<T, BenefitDependentUpsertArgs<ExtArgs>>): Prisma__BenefitDependentClient<$Result.GetResult<Prisma.$BenefitDependentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of BenefitDependents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BenefitDependentCountArgs} args - Arguments to filter BenefitDependents to count.
     * @example
     * // Count the number of BenefitDependents
     * const count = await prisma.benefitDependent.count({
     *   where: {
     *     // ... the filter for the BenefitDependents we want to count
     *   }
     * })
    **/
    count<T extends BenefitDependentCountArgs>(
      args?: Subset<T, BenefitDependentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BenefitDependentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a BenefitDependent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BenefitDependentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends BenefitDependentAggregateArgs>(args: Subset<T, BenefitDependentAggregateArgs>): Prisma.PrismaPromise<GetBenefitDependentAggregateType<T>>

    /**
     * Group by BenefitDependent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BenefitDependentGroupByArgs} args - Group by arguments.
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
      T extends BenefitDependentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BenefitDependentGroupByArgs['orderBy'] }
        : { orderBy?: BenefitDependentGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, BenefitDependentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBenefitDependentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the BenefitDependent model
   */
  readonly fields: BenefitDependentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for BenefitDependent.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BenefitDependentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    enrollment<T extends BenefitEnrollmentDefaultArgs<ExtArgs> = {}>(args?: Subset<T, BenefitEnrollmentDefaultArgs<ExtArgs>>): Prisma__BenefitEnrollmentClient<$Result.GetResult<Prisma.$BenefitEnrollmentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the BenefitDependent model
   */
  interface BenefitDependentFieldRefs {
    readonly id: FieldRef<"BenefitDependent", 'String'>
    readonly enrollment_id: FieldRef<"BenefitDependent", 'String'>
    readonly name: FieldRef<"BenefitDependent", 'String'>
    readonly relationship: FieldRef<"BenefitDependent", 'String'>
    readonly date_of_birth: FieldRef<"BenefitDependent", 'DateTime'>
    readonly national_id: FieldRef<"BenefitDependent", 'String'>
    readonly is_active: FieldRef<"BenefitDependent", 'Boolean'>
    readonly created_at: FieldRef<"BenefitDependent", 'DateTime'>
    readonly updated_at: FieldRef<"BenefitDependent", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * BenefitDependent findUnique
   */
  export type BenefitDependentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BenefitDependent
     */
    select?: BenefitDependentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BenefitDependent
     */
    omit?: BenefitDependentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BenefitDependentInclude<ExtArgs> | null
    /**
     * Filter, which BenefitDependent to fetch.
     */
    where: BenefitDependentWhereUniqueInput
  }

  /**
   * BenefitDependent findUniqueOrThrow
   */
  export type BenefitDependentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BenefitDependent
     */
    select?: BenefitDependentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BenefitDependent
     */
    omit?: BenefitDependentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BenefitDependentInclude<ExtArgs> | null
    /**
     * Filter, which BenefitDependent to fetch.
     */
    where: BenefitDependentWhereUniqueInput
  }

  /**
   * BenefitDependent findFirst
   */
  export type BenefitDependentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BenefitDependent
     */
    select?: BenefitDependentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BenefitDependent
     */
    omit?: BenefitDependentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BenefitDependentInclude<ExtArgs> | null
    /**
     * Filter, which BenefitDependent to fetch.
     */
    where?: BenefitDependentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BenefitDependents to fetch.
     */
    orderBy?: BenefitDependentOrderByWithRelationInput | BenefitDependentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BenefitDependents.
     */
    cursor?: BenefitDependentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BenefitDependents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BenefitDependents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BenefitDependents.
     */
    distinct?: BenefitDependentScalarFieldEnum | BenefitDependentScalarFieldEnum[]
  }

  /**
   * BenefitDependent findFirstOrThrow
   */
  export type BenefitDependentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BenefitDependent
     */
    select?: BenefitDependentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BenefitDependent
     */
    omit?: BenefitDependentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BenefitDependentInclude<ExtArgs> | null
    /**
     * Filter, which BenefitDependent to fetch.
     */
    where?: BenefitDependentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BenefitDependents to fetch.
     */
    orderBy?: BenefitDependentOrderByWithRelationInput | BenefitDependentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BenefitDependents.
     */
    cursor?: BenefitDependentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BenefitDependents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BenefitDependents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BenefitDependents.
     */
    distinct?: BenefitDependentScalarFieldEnum | BenefitDependentScalarFieldEnum[]
  }

  /**
   * BenefitDependent findMany
   */
  export type BenefitDependentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BenefitDependent
     */
    select?: BenefitDependentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BenefitDependent
     */
    omit?: BenefitDependentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BenefitDependentInclude<ExtArgs> | null
    /**
     * Filter, which BenefitDependents to fetch.
     */
    where?: BenefitDependentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BenefitDependents to fetch.
     */
    orderBy?: BenefitDependentOrderByWithRelationInput | BenefitDependentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing BenefitDependents.
     */
    cursor?: BenefitDependentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BenefitDependents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BenefitDependents.
     */
    skip?: number
    distinct?: BenefitDependentScalarFieldEnum | BenefitDependentScalarFieldEnum[]
  }

  /**
   * BenefitDependent create
   */
  export type BenefitDependentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BenefitDependent
     */
    select?: BenefitDependentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BenefitDependent
     */
    omit?: BenefitDependentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BenefitDependentInclude<ExtArgs> | null
    /**
     * The data needed to create a BenefitDependent.
     */
    data: XOR<BenefitDependentCreateInput, BenefitDependentUncheckedCreateInput>
  }

  /**
   * BenefitDependent createMany
   */
  export type BenefitDependentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many BenefitDependents.
     */
    data: BenefitDependentCreateManyInput | BenefitDependentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * BenefitDependent createManyAndReturn
   */
  export type BenefitDependentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BenefitDependent
     */
    select?: BenefitDependentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the BenefitDependent
     */
    omit?: BenefitDependentOmit<ExtArgs> | null
    /**
     * The data used to create many BenefitDependents.
     */
    data: BenefitDependentCreateManyInput | BenefitDependentCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BenefitDependentIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * BenefitDependent update
   */
  export type BenefitDependentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BenefitDependent
     */
    select?: BenefitDependentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BenefitDependent
     */
    omit?: BenefitDependentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BenefitDependentInclude<ExtArgs> | null
    /**
     * The data needed to update a BenefitDependent.
     */
    data: XOR<BenefitDependentUpdateInput, BenefitDependentUncheckedUpdateInput>
    /**
     * Choose, which BenefitDependent to update.
     */
    where: BenefitDependentWhereUniqueInput
  }

  /**
   * BenefitDependent updateMany
   */
  export type BenefitDependentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update BenefitDependents.
     */
    data: XOR<BenefitDependentUpdateManyMutationInput, BenefitDependentUncheckedUpdateManyInput>
    /**
     * Filter which BenefitDependents to update
     */
    where?: BenefitDependentWhereInput
    /**
     * Limit how many BenefitDependents to update.
     */
    limit?: number
  }

  /**
   * BenefitDependent updateManyAndReturn
   */
  export type BenefitDependentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BenefitDependent
     */
    select?: BenefitDependentSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the BenefitDependent
     */
    omit?: BenefitDependentOmit<ExtArgs> | null
    /**
     * The data used to update BenefitDependents.
     */
    data: XOR<BenefitDependentUpdateManyMutationInput, BenefitDependentUncheckedUpdateManyInput>
    /**
     * Filter which BenefitDependents to update
     */
    where?: BenefitDependentWhereInput
    /**
     * Limit how many BenefitDependents to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BenefitDependentIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * BenefitDependent upsert
   */
  export type BenefitDependentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BenefitDependent
     */
    select?: BenefitDependentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BenefitDependent
     */
    omit?: BenefitDependentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BenefitDependentInclude<ExtArgs> | null
    /**
     * The filter to search for the BenefitDependent to update in case it exists.
     */
    where: BenefitDependentWhereUniqueInput
    /**
     * In case the BenefitDependent found by the `where` argument doesn't exist, create a new BenefitDependent with this data.
     */
    create: XOR<BenefitDependentCreateInput, BenefitDependentUncheckedCreateInput>
    /**
     * In case the BenefitDependent was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BenefitDependentUpdateInput, BenefitDependentUncheckedUpdateInput>
  }

  /**
   * BenefitDependent delete
   */
  export type BenefitDependentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BenefitDependent
     */
    select?: BenefitDependentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BenefitDependent
     */
    omit?: BenefitDependentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BenefitDependentInclude<ExtArgs> | null
    /**
     * Filter which BenefitDependent to delete.
     */
    where: BenefitDependentWhereUniqueInput
  }

  /**
   * BenefitDependent deleteMany
   */
  export type BenefitDependentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BenefitDependents to delete
     */
    where?: BenefitDependentWhereInput
    /**
     * Limit how many BenefitDependents to delete.
     */
    limit?: number
  }

  /**
   * BenefitDependent without action
   */
  export type BenefitDependentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BenefitDependent
     */
    select?: BenefitDependentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BenefitDependent
     */
    omit?: BenefitDependentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BenefitDependentInclude<ExtArgs> | null
  }


  /**
   * Model BenefitClaim
   */

  export type AggregateBenefitClaim = {
    _count: BenefitClaimCountAggregateOutputType | null
    _avg: BenefitClaimAvgAggregateOutputType | null
    _sum: BenefitClaimSumAggregateOutputType | null
    _min: BenefitClaimMinAggregateOutputType | null
    _max: BenefitClaimMaxAggregateOutputType | null
  }

  export type BenefitClaimAvgAggregateOutputType = {
    amount: number | null
    paid_amount: number | null
  }

  export type BenefitClaimSumAggregateOutputType = {
    amount: number | null
    paid_amount: number | null
  }

  export type BenefitClaimMinAggregateOutputType = {
    id: string | null
    employee_id: string | null
    plan_id: string | null
    claim_type: string | null
    amount: number | null
    description: string | null
    receipt_date: Date | null
    status: string | null
    submitted_at: Date | null
    reviewed_at: Date | null
    reviewed_by: string | null
    rejection_reason: string | null
    paid_at: Date | null
    paid_amount: number | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type BenefitClaimMaxAggregateOutputType = {
    id: string | null
    employee_id: string | null
    plan_id: string | null
    claim_type: string | null
    amount: number | null
    description: string | null
    receipt_date: Date | null
    status: string | null
    submitted_at: Date | null
    reviewed_at: Date | null
    reviewed_by: string | null
    rejection_reason: string | null
    paid_at: Date | null
    paid_amount: number | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type BenefitClaimCountAggregateOutputType = {
    id: number
    employee_id: number
    plan_id: number
    claim_type: number
    amount: number
    description: number
    receipt_date: number
    status: number
    submitted_at: number
    reviewed_at: number
    reviewed_by: number
    rejection_reason: number
    paid_at: number
    paid_amount: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type BenefitClaimAvgAggregateInputType = {
    amount?: true
    paid_amount?: true
  }

  export type BenefitClaimSumAggregateInputType = {
    amount?: true
    paid_amount?: true
  }

  export type BenefitClaimMinAggregateInputType = {
    id?: true
    employee_id?: true
    plan_id?: true
    claim_type?: true
    amount?: true
    description?: true
    receipt_date?: true
    status?: true
    submitted_at?: true
    reviewed_at?: true
    reviewed_by?: true
    rejection_reason?: true
    paid_at?: true
    paid_amount?: true
    created_at?: true
    updated_at?: true
  }

  export type BenefitClaimMaxAggregateInputType = {
    id?: true
    employee_id?: true
    plan_id?: true
    claim_type?: true
    amount?: true
    description?: true
    receipt_date?: true
    status?: true
    submitted_at?: true
    reviewed_at?: true
    reviewed_by?: true
    rejection_reason?: true
    paid_at?: true
    paid_amount?: true
    created_at?: true
    updated_at?: true
  }

  export type BenefitClaimCountAggregateInputType = {
    id?: true
    employee_id?: true
    plan_id?: true
    claim_type?: true
    amount?: true
    description?: true
    receipt_date?: true
    status?: true
    submitted_at?: true
    reviewed_at?: true
    reviewed_by?: true
    rejection_reason?: true
    paid_at?: true
    paid_amount?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type BenefitClaimAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BenefitClaim to aggregate.
     */
    where?: BenefitClaimWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BenefitClaims to fetch.
     */
    orderBy?: BenefitClaimOrderByWithRelationInput | BenefitClaimOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BenefitClaimWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BenefitClaims from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BenefitClaims.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned BenefitClaims
    **/
    _count?: true | BenefitClaimCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: BenefitClaimAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: BenefitClaimSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BenefitClaimMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BenefitClaimMaxAggregateInputType
  }

  export type GetBenefitClaimAggregateType<T extends BenefitClaimAggregateArgs> = {
        [P in keyof T & keyof AggregateBenefitClaim]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBenefitClaim[P]>
      : GetScalarType<T[P], AggregateBenefitClaim[P]>
  }




  export type BenefitClaimGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BenefitClaimWhereInput
    orderBy?: BenefitClaimOrderByWithAggregationInput | BenefitClaimOrderByWithAggregationInput[]
    by: BenefitClaimScalarFieldEnum[] | BenefitClaimScalarFieldEnum
    having?: BenefitClaimScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BenefitClaimCountAggregateInputType | true
    _avg?: BenefitClaimAvgAggregateInputType
    _sum?: BenefitClaimSumAggregateInputType
    _min?: BenefitClaimMinAggregateInputType
    _max?: BenefitClaimMaxAggregateInputType
  }

  export type BenefitClaimGroupByOutputType = {
    id: string
    employee_id: string
    plan_id: string
    claim_type: string
    amount: number
    description: string | null
    receipt_date: Date
    status: string
    submitted_at: Date
    reviewed_at: Date | null
    reviewed_by: string | null
    rejection_reason: string | null
    paid_at: Date | null
    paid_amount: number | null
    created_at: Date
    updated_at: Date
    _count: BenefitClaimCountAggregateOutputType | null
    _avg: BenefitClaimAvgAggregateOutputType | null
    _sum: BenefitClaimSumAggregateOutputType | null
    _min: BenefitClaimMinAggregateOutputType | null
    _max: BenefitClaimMaxAggregateOutputType | null
  }

  type GetBenefitClaimGroupByPayload<T extends BenefitClaimGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BenefitClaimGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BenefitClaimGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BenefitClaimGroupByOutputType[P]>
            : GetScalarType<T[P], BenefitClaimGroupByOutputType[P]>
        }
      >
    >


  export type BenefitClaimSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    employee_id?: boolean
    plan_id?: boolean
    claim_type?: boolean
    amount?: boolean
    description?: boolean
    receipt_date?: boolean
    status?: boolean
    submitted_at?: boolean
    reviewed_at?: boolean
    reviewed_by?: boolean
    rejection_reason?: boolean
    paid_at?: boolean
    paid_amount?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["benefitClaim"]>

  export type BenefitClaimSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    employee_id?: boolean
    plan_id?: boolean
    claim_type?: boolean
    amount?: boolean
    description?: boolean
    receipt_date?: boolean
    status?: boolean
    submitted_at?: boolean
    reviewed_at?: boolean
    reviewed_by?: boolean
    rejection_reason?: boolean
    paid_at?: boolean
    paid_amount?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["benefitClaim"]>

  export type BenefitClaimSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    employee_id?: boolean
    plan_id?: boolean
    claim_type?: boolean
    amount?: boolean
    description?: boolean
    receipt_date?: boolean
    status?: boolean
    submitted_at?: boolean
    reviewed_at?: boolean
    reviewed_by?: boolean
    rejection_reason?: boolean
    paid_at?: boolean
    paid_amount?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["benefitClaim"]>

  export type BenefitClaimSelectScalar = {
    id?: boolean
    employee_id?: boolean
    plan_id?: boolean
    claim_type?: boolean
    amount?: boolean
    description?: boolean
    receipt_date?: boolean
    status?: boolean
    submitted_at?: boolean
    reviewed_at?: boolean
    reviewed_by?: boolean
    rejection_reason?: boolean
    paid_at?: boolean
    paid_amount?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type BenefitClaimOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "employee_id" | "plan_id" | "claim_type" | "amount" | "description" | "receipt_date" | "status" | "submitted_at" | "reviewed_at" | "reviewed_by" | "rejection_reason" | "paid_at" | "paid_amount" | "created_at" | "updated_at", ExtArgs["result"]["benefitClaim"]>

  export type $BenefitClaimPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "BenefitClaim"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      employee_id: string
      plan_id: string
      claim_type: string
      amount: number
      description: string | null
      receipt_date: Date
      status: string
      submitted_at: Date
      reviewed_at: Date | null
      reviewed_by: string | null
      rejection_reason: string | null
      paid_at: Date | null
      paid_amount: number | null
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["benefitClaim"]>
    composites: {}
  }

  type BenefitClaimGetPayload<S extends boolean | null | undefined | BenefitClaimDefaultArgs> = $Result.GetResult<Prisma.$BenefitClaimPayload, S>

  type BenefitClaimCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<BenefitClaimFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: BenefitClaimCountAggregateInputType | true
    }

  export interface BenefitClaimDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['BenefitClaim'], meta: { name: 'BenefitClaim' } }
    /**
     * Find zero or one BenefitClaim that matches the filter.
     * @param {BenefitClaimFindUniqueArgs} args - Arguments to find a BenefitClaim
     * @example
     * // Get one BenefitClaim
     * const benefitClaim = await prisma.benefitClaim.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BenefitClaimFindUniqueArgs>(args: SelectSubset<T, BenefitClaimFindUniqueArgs<ExtArgs>>): Prisma__BenefitClaimClient<$Result.GetResult<Prisma.$BenefitClaimPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one BenefitClaim that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {BenefitClaimFindUniqueOrThrowArgs} args - Arguments to find a BenefitClaim
     * @example
     * // Get one BenefitClaim
     * const benefitClaim = await prisma.benefitClaim.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BenefitClaimFindUniqueOrThrowArgs>(args: SelectSubset<T, BenefitClaimFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BenefitClaimClient<$Result.GetResult<Prisma.$BenefitClaimPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first BenefitClaim that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BenefitClaimFindFirstArgs} args - Arguments to find a BenefitClaim
     * @example
     * // Get one BenefitClaim
     * const benefitClaim = await prisma.benefitClaim.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BenefitClaimFindFirstArgs>(args?: SelectSubset<T, BenefitClaimFindFirstArgs<ExtArgs>>): Prisma__BenefitClaimClient<$Result.GetResult<Prisma.$BenefitClaimPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first BenefitClaim that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BenefitClaimFindFirstOrThrowArgs} args - Arguments to find a BenefitClaim
     * @example
     * // Get one BenefitClaim
     * const benefitClaim = await prisma.benefitClaim.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BenefitClaimFindFirstOrThrowArgs>(args?: SelectSubset<T, BenefitClaimFindFirstOrThrowArgs<ExtArgs>>): Prisma__BenefitClaimClient<$Result.GetResult<Prisma.$BenefitClaimPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more BenefitClaims that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BenefitClaimFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all BenefitClaims
     * const benefitClaims = await prisma.benefitClaim.findMany()
     * 
     * // Get first 10 BenefitClaims
     * const benefitClaims = await prisma.benefitClaim.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const benefitClaimWithIdOnly = await prisma.benefitClaim.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends BenefitClaimFindManyArgs>(args?: SelectSubset<T, BenefitClaimFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BenefitClaimPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a BenefitClaim.
     * @param {BenefitClaimCreateArgs} args - Arguments to create a BenefitClaim.
     * @example
     * // Create one BenefitClaim
     * const BenefitClaim = await prisma.benefitClaim.create({
     *   data: {
     *     // ... data to create a BenefitClaim
     *   }
     * })
     * 
     */
    create<T extends BenefitClaimCreateArgs>(args: SelectSubset<T, BenefitClaimCreateArgs<ExtArgs>>): Prisma__BenefitClaimClient<$Result.GetResult<Prisma.$BenefitClaimPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many BenefitClaims.
     * @param {BenefitClaimCreateManyArgs} args - Arguments to create many BenefitClaims.
     * @example
     * // Create many BenefitClaims
     * const benefitClaim = await prisma.benefitClaim.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BenefitClaimCreateManyArgs>(args?: SelectSubset<T, BenefitClaimCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many BenefitClaims and returns the data saved in the database.
     * @param {BenefitClaimCreateManyAndReturnArgs} args - Arguments to create many BenefitClaims.
     * @example
     * // Create many BenefitClaims
     * const benefitClaim = await prisma.benefitClaim.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many BenefitClaims and only return the `id`
     * const benefitClaimWithIdOnly = await prisma.benefitClaim.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends BenefitClaimCreateManyAndReturnArgs>(args?: SelectSubset<T, BenefitClaimCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BenefitClaimPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a BenefitClaim.
     * @param {BenefitClaimDeleteArgs} args - Arguments to delete one BenefitClaim.
     * @example
     * // Delete one BenefitClaim
     * const BenefitClaim = await prisma.benefitClaim.delete({
     *   where: {
     *     // ... filter to delete one BenefitClaim
     *   }
     * })
     * 
     */
    delete<T extends BenefitClaimDeleteArgs>(args: SelectSubset<T, BenefitClaimDeleteArgs<ExtArgs>>): Prisma__BenefitClaimClient<$Result.GetResult<Prisma.$BenefitClaimPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one BenefitClaim.
     * @param {BenefitClaimUpdateArgs} args - Arguments to update one BenefitClaim.
     * @example
     * // Update one BenefitClaim
     * const benefitClaim = await prisma.benefitClaim.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BenefitClaimUpdateArgs>(args: SelectSubset<T, BenefitClaimUpdateArgs<ExtArgs>>): Prisma__BenefitClaimClient<$Result.GetResult<Prisma.$BenefitClaimPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more BenefitClaims.
     * @param {BenefitClaimDeleteManyArgs} args - Arguments to filter BenefitClaims to delete.
     * @example
     * // Delete a few BenefitClaims
     * const { count } = await prisma.benefitClaim.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BenefitClaimDeleteManyArgs>(args?: SelectSubset<T, BenefitClaimDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more BenefitClaims.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BenefitClaimUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many BenefitClaims
     * const benefitClaim = await prisma.benefitClaim.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BenefitClaimUpdateManyArgs>(args: SelectSubset<T, BenefitClaimUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more BenefitClaims and returns the data updated in the database.
     * @param {BenefitClaimUpdateManyAndReturnArgs} args - Arguments to update many BenefitClaims.
     * @example
     * // Update many BenefitClaims
     * const benefitClaim = await prisma.benefitClaim.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more BenefitClaims and only return the `id`
     * const benefitClaimWithIdOnly = await prisma.benefitClaim.updateManyAndReturn({
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
    updateManyAndReturn<T extends BenefitClaimUpdateManyAndReturnArgs>(args: SelectSubset<T, BenefitClaimUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BenefitClaimPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one BenefitClaim.
     * @param {BenefitClaimUpsertArgs} args - Arguments to update or create a BenefitClaim.
     * @example
     * // Update or create a BenefitClaim
     * const benefitClaim = await prisma.benefitClaim.upsert({
     *   create: {
     *     // ... data to create a BenefitClaim
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the BenefitClaim we want to update
     *   }
     * })
     */
    upsert<T extends BenefitClaimUpsertArgs>(args: SelectSubset<T, BenefitClaimUpsertArgs<ExtArgs>>): Prisma__BenefitClaimClient<$Result.GetResult<Prisma.$BenefitClaimPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of BenefitClaims.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BenefitClaimCountArgs} args - Arguments to filter BenefitClaims to count.
     * @example
     * // Count the number of BenefitClaims
     * const count = await prisma.benefitClaim.count({
     *   where: {
     *     // ... the filter for the BenefitClaims we want to count
     *   }
     * })
    **/
    count<T extends BenefitClaimCountArgs>(
      args?: Subset<T, BenefitClaimCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BenefitClaimCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a BenefitClaim.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BenefitClaimAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends BenefitClaimAggregateArgs>(args: Subset<T, BenefitClaimAggregateArgs>): Prisma.PrismaPromise<GetBenefitClaimAggregateType<T>>

    /**
     * Group by BenefitClaim.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BenefitClaimGroupByArgs} args - Group by arguments.
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
      T extends BenefitClaimGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BenefitClaimGroupByArgs['orderBy'] }
        : { orderBy?: BenefitClaimGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, BenefitClaimGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBenefitClaimGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the BenefitClaim model
   */
  readonly fields: BenefitClaimFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for BenefitClaim.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BenefitClaimClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the BenefitClaim model
   */
  interface BenefitClaimFieldRefs {
    readonly id: FieldRef<"BenefitClaim", 'String'>
    readonly employee_id: FieldRef<"BenefitClaim", 'String'>
    readonly plan_id: FieldRef<"BenefitClaim", 'String'>
    readonly claim_type: FieldRef<"BenefitClaim", 'String'>
    readonly amount: FieldRef<"BenefitClaim", 'Float'>
    readonly description: FieldRef<"BenefitClaim", 'String'>
    readonly receipt_date: FieldRef<"BenefitClaim", 'DateTime'>
    readonly status: FieldRef<"BenefitClaim", 'String'>
    readonly submitted_at: FieldRef<"BenefitClaim", 'DateTime'>
    readonly reviewed_at: FieldRef<"BenefitClaim", 'DateTime'>
    readonly reviewed_by: FieldRef<"BenefitClaim", 'String'>
    readonly rejection_reason: FieldRef<"BenefitClaim", 'String'>
    readonly paid_at: FieldRef<"BenefitClaim", 'DateTime'>
    readonly paid_amount: FieldRef<"BenefitClaim", 'Float'>
    readonly created_at: FieldRef<"BenefitClaim", 'DateTime'>
    readonly updated_at: FieldRef<"BenefitClaim", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * BenefitClaim findUnique
   */
  export type BenefitClaimFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BenefitClaim
     */
    select?: BenefitClaimSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BenefitClaim
     */
    omit?: BenefitClaimOmit<ExtArgs> | null
    /**
     * Filter, which BenefitClaim to fetch.
     */
    where: BenefitClaimWhereUniqueInput
  }

  /**
   * BenefitClaim findUniqueOrThrow
   */
  export type BenefitClaimFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BenefitClaim
     */
    select?: BenefitClaimSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BenefitClaim
     */
    omit?: BenefitClaimOmit<ExtArgs> | null
    /**
     * Filter, which BenefitClaim to fetch.
     */
    where: BenefitClaimWhereUniqueInput
  }

  /**
   * BenefitClaim findFirst
   */
  export type BenefitClaimFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BenefitClaim
     */
    select?: BenefitClaimSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BenefitClaim
     */
    omit?: BenefitClaimOmit<ExtArgs> | null
    /**
     * Filter, which BenefitClaim to fetch.
     */
    where?: BenefitClaimWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BenefitClaims to fetch.
     */
    orderBy?: BenefitClaimOrderByWithRelationInput | BenefitClaimOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BenefitClaims.
     */
    cursor?: BenefitClaimWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BenefitClaims from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BenefitClaims.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BenefitClaims.
     */
    distinct?: BenefitClaimScalarFieldEnum | BenefitClaimScalarFieldEnum[]
  }

  /**
   * BenefitClaim findFirstOrThrow
   */
  export type BenefitClaimFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BenefitClaim
     */
    select?: BenefitClaimSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BenefitClaim
     */
    omit?: BenefitClaimOmit<ExtArgs> | null
    /**
     * Filter, which BenefitClaim to fetch.
     */
    where?: BenefitClaimWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BenefitClaims to fetch.
     */
    orderBy?: BenefitClaimOrderByWithRelationInput | BenefitClaimOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BenefitClaims.
     */
    cursor?: BenefitClaimWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BenefitClaims from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BenefitClaims.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BenefitClaims.
     */
    distinct?: BenefitClaimScalarFieldEnum | BenefitClaimScalarFieldEnum[]
  }

  /**
   * BenefitClaim findMany
   */
  export type BenefitClaimFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BenefitClaim
     */
    select?: BenefitClaimSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BenefitClaim
     */
    omit?: BenefitClaimOmit<ExtArgs> | null
    /**
     * Filter, which BenefitClaims to fetch.
     */
    where?: BenefitClaimWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BenefitClaims to fetch.
     */
    orderBy?: BenefitClaimOrderByWithRelationInput | BenefitClaimOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing BenefitClaims.
     */
    cursor?: BenefitClaimWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BenefitClaims from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BenefitClaims.
     */
    skip?: number
    distinct?: BenefitClaimScalarFieldEnum | BenefitClaimScalarFieldEnum[]
  }

  /**
   * BenefitClaim create
   */
  export type BenefitClaimCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BenefitClaim
     */
    select?: BenefitClaimSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BenefitClaim
     */
    omit?: BenefitClaimOmit<ExtArgs> | null
    /**
     * The data needed to create a BenefitClaim.
     */
    data: XOR<BenefitClaimCreateInput, BenefitClaimUncheckedCreateInput>
  }

  /**
   * BenefitClaim createMany
   */
  export type BenefitClaimCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many BenefitClaims.
     */
    data: BenefitClaimCreateManyInput | BenefitClaimCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * BenefitClaim createManyAndReturn
   */
  export type BenefitClaimCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BenefitClaim
     */
    select?: BenefitClaimSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the BenefitClaim
     */
    omit?: BenefitClaimOmit<ExtArgs> | null
    /**
     * The data used to create many BenefitClaims.
     */
    data: BenefitClaimCreateManyInput | BenefitClaimCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * BenefitClaim update
   */
  export type BenefitClaimUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BenefitClaim
     */
    select?: BenefitClaimSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BenefitClaim
     */
    omit?: BenefitClaimOmit<ExtArgs> | null
    /**
     * The data needed to update a BenefitClaim.
     */
    data: XOR<BenefitClaimUpdateInput, BenefitClaimUncheckedUpdateInput>
    /**
     * Choose, which BenefitClaim to update.
     */
    where: BenefitClaimWhereUniqueInput
  }

  /**
   * BenefitClaim updateMany
   */
  export type BenefitClaimUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update BenefitClaims.
     */
    data: XOR<BenefitClaimUpdateManyMutationInput, BenefitClaimUncheckedUpdateManyInput>
    /**
     * Filter which BenefitClaims to update
     */
    where?: BenefitClaimWhereInput
    /**
     * Limit how many BenefitClaims to update.
     */
    limit?: number
  }

  /**
   * BenefitClaim updateManyAndReturn
   */
  export type BenefitClaimUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BenefitClaim
     */
    select?: BenefitClaimSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the BenefitClaim
     */
    omit?: BenefitClaimOmit<ExtArgs> | null
    /**
     * The data used to update BenefitClaims.
     */
    data: XOR<BenefitClaimUpdateManyMutationInput, BenefitClaimUncheckedUpdateManyInput>
    /**
     * Filter which BenefitClaims to update
     */
    where?: BenefitClaimWhereInput
    /**
     * Limit how many BenefitClaims to update.
     */
    limit?: number
  }

  /**
   * BenefitClaim upsert
   */
  export type BenefitClaimUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BenefitClaim
     */
    select?: BenefitClaimSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BenefitClaim
     */
    omit?: BenefitClaimOmit<ExtArgs> | null
    /**
     * The filter to search for the BenefitClaim to update in case it exists.
     */
    where: BenefitClaimWhereUniqueInput
    /**
     * In case the BenefitClaim found by the `where` argument doesn't exist, create a new BenefitClaim with this data.
     */
    create: XOR<BenefitClaimCreateInput, BenefitClaimUncheckedCreateInput>
    /**
     * In case the BenefitClaim was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BenefitClaimUpdateInput, BenefitClaimUncheckedUpdateInput>
  }

  /**
   * BenefitClaim delete
   */
  export type BenefitClaimDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BenefitClaim
     */
    select?: BenefitClaimSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BenefitClaim
     */
    omit?: BenefitClaimOmit<ExtArgs> | null
    /**
     * Filter which BenefitClaim to delete.
     */
    where: BenefitClaimWhereUniqueInput
  }

  /**
   * BenefitClaim deleteMany
   */
  export type BenefitClaimDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BenefitClaims to delete
     */
    where?: BenefitClaimWhereInput
    /**
     * Limit how many BenefitClaims to delete.
     */
    limit?: number
  }

  /**
   * BenefitClaim without action
   */
  export type BenefitClaimDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BenefitClaim
     */
    select?: BenefitClaimSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BenefitClaim
     */
    omit?: BenefitClaimOmit<ExtArgs> | null
  }


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
  }

  export type ClaimRequestSumAggregateOutputType = {
    amount: Decimal | null
  }

  export type ClaimRequestMinAggregateOutputType = {
    id: string | null
    employee_id: string | null
    receipt_id: string | null
    category: string | null
    amount: Decimal | null
    currency: string | null
    description: string | null
    status: string | null
    auto_approved: boolean | null
    approved_by: string | null
    approved_at: Date | null
    rejected_by: string | null
    rejected_reason: string | null
    submitted_at: Date | null
    ocr_result_id: string | null
    requires_finance_approval: boolean | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type ClaimRequestMaxAggregateOutputType = {
    id: string | null
    employee_id: string | null
    receipt_id: string | null
    category: string | null
    amount: Decimal | null
    currency: string | null
    description: string | null
    status: string | null
    auto_approved: boolean | null
    approved_by: string | null
    approved_at: Date | null
    rejected_by: string | null
    rejected_reason: string | null
    submitted_at: Date | null
    ocr_result_id: string | null
    requires_finance_approval: boolean | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type ClaimRequestCountAggregateOutputType = {
    id: number
    employee_id: number
    receipt_id: number
    category: number
    amount: number
    currency: number
    description: number
    status: number
    auto_approved: number
    approved_by: number
    approved_at: number
    rejected_by: number
    rejected_reason: number
    submitted_at: number
    ocr_result_id: number
    requires_finance_approval: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type ClaimRequestAvgAggregateInputType = {
    amount?: true
  }

  export type ClaimRequestSumAggregateInputType = {
    amount?: true
  }

  export type ClaimRequestMinAggregateInputType = {
    id?: true
    employee_id?: true
    receipt_id?: true
    category?: true
    amount?: true
    currency?: true
    description?: true
    status?: true
    auto_approved?: true
    approved_by?: true
    approved_at?: true
    rejected_by?: true
    rejected_reason?: true
    submitted_at?: true
    ocr_result_id?: true
    requires_finance_approval?: true
    created_at?: true
    updated_at?: true
  }

  export type ClaimRequestMaxAggregateInputType = {
    id?: true
    employee_id?: true
    receipt_id?: true
    category?: true
    amount?: true
    currency?: true
    description?: true
    status?: true
    auto_approved?: true
    approved_by?: true
    approved_at?: true
    rejected_by?: true
    rejected_reason?: true
    submitted_at?: true
    ocr_result_id?: true
    requires_finance_approval?: true
    created_at?: true
    updated_at?: true
  }

  export type ClaimRequestCountAggregateInputType = {
    id?: true
    employee_id?: true
    receipt_id?: true
    category?: true
    amount?: true
    currency?: true
    description?: true
    status?: true
    auto_approved?: true
    approved_by?: true
    approved_at?: true
    rejected_by?: true
    rejected_reason?: true
    submitted_at?: true
    ocr_result_id?: true
    requires_finance_approval?: true
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
    receipt_id: string | null
    category: string
    amount: Decimal
    currency: string
    description: string | null
    status: string
    auto_approved: boolean
    approved_by: string | null
    approved_at: Date | null
    rejected_by: string | null
    rejected_reason: string | null
    submitted_at: Date | null
    ocr_result_id: string | null
    requires_finance_approval: boolean
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
    receipt_id?: boolean
    category?: boolean
    amount?: boolean
    currency?: boolean
    description?: boolean
    status?: boolean
    auto_approved?: boolean
    approved_by?: boolean
    approved_at?: boolean
    rejected_by?: boolean
    rejected_reason?: boolean
    submitted_at?: boolean
    ocr_result_id?: boolean
    requires_finance_approval?: boolean
    created_at?: boolean
    updated_at?: boolean
    ocr_result?: boolean | ClaimRequest$ocr_resultArgs<ExtArgs>
    policy_checks?: boolean | ClaimRequest$policy_checksArgs<ExtArgs>
    _count?: boolean | ClaimRequestCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["claimRequest"]>

  export type ClaimRequestSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    employee_id?: boolean
    receipt_id?: boolean
    category?: boolean
    amount?: boolean
    currency?: boolean
    description?: boolean
    status?: boolean
    auto_approved?: boolean
    approved_by?: boolean
    approved_at?: boolean
    rejected_by?: boolean
    rejected_reason?: boolean
    submitted_at?: boolean
    ocr_result_id?: boolean
    requires_finance_approval?: boolean
    created_at?: boolean
    updated_at?: boolean
    ocr_result?: boolean | ClaimRequest$ocr_resultArgs<ExtArgs>
  }, ExtArgs["result"]["claimRequest"]>

  export type ClaimRequestSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    employee_id?: boolean
    receipt_id?: boolean
    category?: boolean
    amount?: boolean
    currency?: boolean
    description?: boolean
    status?: boolean
    auto_approved?: boolean
    approved_by?: boolean
    approved_at?: boolean
    rejected_by?: boolean
    rejected_reason?: boolean
    submitted_at?: boolean
    ocr_result_id?: boolean
    requires_finance_approval?: boolean
    created_at?: boolean
    updated_at?: boolean
    ocr_result?: boolean | ClaimRequest$ocr_resultArgs<ExtArgs>
  }, ExtArgs["result"]["claimRequest"]>

  export type ClaimRequestSelectScalar = {
    id?: boolean
    employee_id?: boolean
    receipt_id?: boolean
    category?: boolean
    amount?: boolean
    currency?: boolean
    description?: boolean
    status?: boolean
    auto_approved?: boolean
    approved_by?: boolean
    approved_at?: boolean
    rejected_by?: boolean
    rejected_reason?: boolean
    submitted_at?: boolean
    ocr_result_id?: boolean
    requires_finance_approval?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type ClaimRequestOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "employee_id" | "receipt_id" | "category" | "amount" | "currency" | "description" | "status" | "auto_approved" | "approved_by" | "approved_at" | "rejected_by" | "rejected_reason" | "submitted_at" | "ocr_result_id" | "requires_finance_approval" | "created_at" | "updated_at", ExtArgs["result"]["claimRequest"]>
  export type ClaimRequestInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    ocr_result?: boolean | ClaimRequest$ocr_resultArgs<ExtArgs>
    policy_checks?: boolean | ClaimRequest$policy_checksArgs<ExtArgs>
    _count?: boolean | ClaimRequestCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ClaimRequestIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    ocr_result?: boolean | ClaimRequest$ocr_resultArgs<ExtArgs>
  }
  export type ClaimRequestIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    ocr_result?: boolean | ClaimRequest$ocr_resultArgs<ExtArgs>
  }

  export type $ClaimRequestPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ClaimRequest"
    objects: {
      ocr_result: Prisma.$OCRResultPayload<ExtArgs> | null
      policy_checks: Prisma.$PolicyCheckPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      employee_id: string
      receipt_id: string | null
      category: string
      amount: Prisma.Decimal
      currency: string
      description: string | null
      status: string
      auto_approved: boolean
      approved_by: string | null
      approved_at: Date | null
      rejected_by: string | null
      rejected_reason: string | null
      submitted_at: Date | null
      ocr_result_id: string | null
      requires_finance_approval: boolean
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
    policy_checks<T extends ClaimRequest$policy_checksArgs<ExtArgs> = {}>(args?: Subset<T, ClaimRequest$policy_checksArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PolicyCheckPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
    readonly receipt_id: FieldRef<"ClaimRequest", 'String'>
    readonly category: FieldRef<"ClaimRequest", 'String'>
    readonly amount: FieldRef<"ClaimRequest", 'Decimal'>
    readonly currency: FieldRef<"ClaimRequest", 'String'>
    readonly description: FieldRef<"ClaimRequest", 'String'>
    readonly status: FieldRef<"ClaimRequest", 'String'>
    readonly auto_approved: FieldRef<"ClaimRequest", 'Boolean'>
    readonly approved_by: FieldRef<"ClaimRequest", 'String'>
    readonly approved_at: FieldRef<"ClaimRequest", 'DateTime'>
    readonly rejected_by: FieldRef<"ClaimRequest", 'String'>
    readonly rejected_reason: FieldRef<"ClaimRequest", 'String'>
    readonly submitted_at: FieldRef<"ClaimRequest", 'DateTime'>
    readonly ocr_result_id: FieldRef<"ClaimRequest", 'String'>
    readonly requires_finance_approval: FieldRef<"ClaimRequest", 'Boolean'>
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
   * ClaimRequest.policy_checks
   */
  export type ClaimRequest$policy_checksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PolicyCheck
     */
    select?: PolicyCheckSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PolicyCheck
     */
    omit?: PolicyCheckOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PolicyCheckInclude<ExtArgs> | null
    where?: PolicyCheckWhereInput
    orderBy?: PolicyCheckOrderByWithRelationInput | PolicyCheckOrderByWithRelationInput[]
    cursor?: PolicyCheckWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PolicyCheckScalarFieldEnum | PolicyCheckScalarFieldEnum[]
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
    receipt_file_size: number | null
    amount: Decimal | null
    confidence_score: number | null
  }

  export type OCRResultSumAggregateOutputType = {
    receipt_file_size: number | null
    amount: Decimal | null
    confidence_score: number | null
  }

  export type OCRResultMinAggregateOutputType = {
    id: string | null
    receipt_file_name: string | null
    receipt_file_type: string | null
    receipt_file_size: number | null
    vendor_name: string | null
    amount: Decimal | null
    receipt_date: Date | null
    category: string | null
    confidence_score: number | null
    raw_text: string | null
    processed_at: Date | null
  }

  export type OCRResultMaxAggregateOutputType = {
    id: string | null
    receipt_file_name: string | null
    receipt_file_type: string | null
    receipt_file_size: number | null
    vendor_name: string | null
    amount: Decimal | null
    receipt_date: Date | null
    category: string | null
    confidence_score: number | null
    raw_text: string | null
    processed_at: Date | null
  }

  export type OCRResultCountAggregateOutputType = {
    id: number
    receipt_file_name: number
    receipt_file_type: number
    receipt_file_size: number
    vendor_name: number
    amount: number
    receipt_date: number
    category: number
    confidence_score: number
    raw_text: number
    processed_at: number
    _all: number
  }


  export type OCRResultAvgAggregateInputType = {
    receipt_file_size?: true
    amount?: true
    confidence_score?: true
  }

  export type OCRResultSumAggregateInputType = {
    receipt_file_size?: true
    amount?: true
    confidence_score?: true
  }

  export type OCRResultMinAggregateInputType = {
    id?: true
    receipt_file_name?: true
    receipt_file_type?: true
    receipt_file_size?: true
    vendor_name?: true
    amount?: true
    receipt_date?: true
    category?: true
    confidence_score?: true
    raw_text?: true
    processed_at?: true
  }

  export type OCRResultMaxAggregateInputType = {
    id?: true
    receipt_file_name?: true
    receipt_file_type?: true
    receipt_file_size?: true
    vendor_name?: true
    amount?: true
    receipt_date?: true
    category?: true
    confidence_score?: true
    raw_text?: true
    processed_at?: true
  }

  export type OCRResultCountAggregateInputType = {
    id?: true
    receipt_file_name?: true
    receipt_file_type?: true
    receipt_file_size?: true
    vendor_name?: true
    amount?: true
    receipt_date?: true
    category?: true
    confidence_score?: true
    raw_text?: true
    processed_at?: true
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
    receipt_file_name: string
    receipt_file_type: string
    receipt_file_size: number
    vendor_name: string | null
    amount: Decimal | null
    receipt_date: Date | null
    category: string | null
    confidence_score: number
    raw_text: string | null
    processed_at: Date
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
    receipt_file_name?: boolean
    receipt_file_type?: boolean
    receipt_file_size?: boolean
    vendor_name?: boolean
    amount?: boolean
    receipt_date?: boolean
    category?: boolean
    confidence_score?: boolean
    raw_text?: boolean
    processed_at?: boolean
    claims?: boolean | OCRResult$claimsArgs<ExtArgs>
    _count?: boolean | OCRResultCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["oCRResult"]>

  export type OCRResultSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    receipt_file_name?: boolean
    receipt_file_type?: boolean
    receipt_file_size?: boolean
    vendor_name?: boolean
    amount?: boolean
    receipt_date?: boolean
    category?: boolean
    confidence_score?: boolean
    raw_text?: boolean
    processed_at?: boolean
  }, ExtArgs["result"]["oCRResult"]>

  export type OCRResultSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    receipt_file_name?: boolean
    receipt_file_type?: boolean
    receipt_file_size?: boolean
    vendor_name?: boolean
    amount?: boolean
    receipt_date?: boolean
    category?: boolean
    confidence_score?: boolean
    raw_text?: boolean
    processed_at?: boolean
  }, ExtArgs["result"]["oCRResult"]>

  export type OCRResultSelectScalar = {
    id?: boolean
    receipt_file_name?: boolean
    receipt_file_type?: boolean
    receipt_file_size?: boolean
    vendor_name?: boolean
    amount?: boolean
    receipt_date?: boolean
    category?: boolean
    confidence_score?: boolean
    raw_text?: boolean
    processed_at?: boolean
  }

  export type OCRResultOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "receipt_file_name" | "receipt_file_type" | "receipt_file_size" | "vendor_name" | "amount" | "receipt_date" | "category" | "confidence_score" | "raw_text" | "processed_at", ExtArgs["result"]["oCRResult"]>
  export type OCRResultInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    claims?: boolean | OCRResult$claimsArgs<ExtArgs>
    _count?: boolean | OCRResultCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type OCRResultIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type OCRResultIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $OCRResultPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "OCRResult"
    objects: {
      claims: Prisma.$ClaimRequestPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      receipt_file_name: string
      receipt_file_type: string
      receipt_file_size: number
      vendor_name: string | null
      amount: Prisma.Decimal | null
      receipt_date: Date | null
      category: string | null
      confidence_score: number
      raw_text: string | null
      processed_at: Date
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
    claims<T extends OCRResult$claimsArgs<ExtArgs> = {}>(args?: Subset<T, OCRResult$claimsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClaimRequestPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
    readonly receipt_file_name: FieldRef<"OCRResult", 'String'>
    readonly receipt_file_type: FieldRef<"OCRResult", 'String'>
    readonly receipt_file_size: FieldRef<"OCRResult", 'Int'>
    readonly vendor_name: FieldRef<"OCRResult", 'String'>
    readonly amount: FieldRef<"OCRResult", 'Decimal'>
    readonly receipt_date: FieldRef<"OCRResult", 'DateTime'>
    readonly category: FieldRef<"OCRResult", 'String'>
    readonly confidence_score: FieldRef<"OCRResult", 'Float'>
    readonly raw_text: FieldRef<"OCRResult", 'String'>
    readonly processed_at: FieldRef<"OCRResult", 'DateTime'>
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
   * OCRResult.claims
   */
  export type OCRResult$claimsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
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
   * Model PolicyRule
   */

  export type AggregatePolicyRule = {
    _count: PolicyRuleCountAggregateOutputType | null
    _min: PolicyRuleMinAggregateOutputType | null
    _max: PolicyRuleMaxAggregateOutputType | null
  }

  export type PolicyRuleMinAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    rule_type: string | null
    category: string | null
    condition_field: string | null
    condition_value: string | null
    is_active: boolean | null
    created_by: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type PolicyRuleMaxAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    rule_type: string | null
    category: string | null
    condition_field: string | null
    condition_value: string | null
    is_active: boolean | null
    created_by: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type PolicyRuleCountAggregateOutputType = {
    id: number
    name: number
    description: number
    rule_type: number
    category: number
    condition_field: number
    condition_value: number
    is_active: number
    created_by: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type PolicyRuleMinAggregateInputType = {
    id?: true
    name?: true
    description?: true
    rule_type?: true
    category?: true
    condition_field?: true
    condition_value?: true
    is_active?: true
    created_by?: true
    created_at?: true
    updated_at?: true
  }

  export type PolicyRuleMaxAggregateInputType = {
    id?: true
    name?: true
    description?: true
    rule_type?: true
    category?: true
    condition_field?: true
    condition_value?: true
    is_active?: true
    created_by?: true
    created_at?: true
    updated_at?: true
  }

  export type PolicyRuleCountAggregateInputType = {
    id?: true
    name?: true
    description?: true
    rule_type?: true
    category?: true
    condition_field?: true
    condition_value?: true
    is_active?: true
    created_by?: true
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
    _min?: PolicyRuleMinAggregateInputType
    _max?: PolicyRuleMaxAggregateInputType
  }

  export type PolicyRuleGroupByOutputType = {
    id: string
    name: string
    description: string | null
    rule_type: string
    category: string | null
    condition_field: string
    condition_value: string
    is_active: boolean
    created_by: string
    created_at: Date
    updated_at: Date
    _count: PolicyRuleCountAggregateOutputType | null
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
    name?: boolean
    description?: boolean
    rule_type?: boolean
    category?: boolean
    condition_field?: boolean
    condition_value?: boolean
    is_active?: boolean
    created_by?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["policyRule"]>

  export type PolicyRuleSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    rule_type?: boolean
    category?: boolean
    condition_field?: boolean
    condition_value?: boolean
    is_active?: boolean
    created_by?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["policyRule"]>

  export type PolicyRuleSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    rule_type?: boolean
    category?: boolean
    condition_field?: boolean
    condition_value?: boolean
    is_active?: boolean
    created_by?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["policyRule"]>

  export type PolicyRuleSelectScalar = {
    id?: boolean
    name?: boolean
    description?: boolean
    rule_type?: boolean
    category?: boolean
    condition_field?: boolean
    condition_value?: boolean
    is_active?: boolean
    created_by?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type PolicyRuleOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "description" | "rule_type" | "category" | "condition_field" | "condition_value" | "is_active" | "created_by" | "created_at" | "updated_at", ExtArgs["result"]["policyRule"]>

  export type $PolicyRulePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PolicyRule"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      description: string | null
      rule_type: string
      category: string | null
      condition_field: string
      condition_value: string
      is_active: boolean
      created_by: string
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
    readonly name: FieldRef<"PolicyRule", 'String'>
    readonly description: FieldRef<"PolicyRule", 'String'>
    readonly rule_type: FieldRef<"PolicyRule", 'String'>
    readonly category: FieldRef<"PolicyRule", 'String'>
    readonly condition_field: FieldRef<"PolicyRule", 'String'>
    readonly condition_value: FieldRef<"PolicyRule", 'String'>
    readonly is_active: FieldRef<"PolicyRule", 'Boolean'>
    readonly created_by: FieldRef<"PolicyRule", 'String'>
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
  }


  /**
   * Model PolicyCheck
   */

  export type AggregatePolicyCheck = {
    _count: PolicyCheckCountAggregateOutputType | null
    _min: PolicyCheckMinAggregateOutputType | null
    _max: PolicyCheckMaxAggregateOutputType | null
  }

  export type PolicyCheckMinAggregateOutputType = {
    id: string | null
    claim_id: string | null
    rule_id: string | null
    rule_name: string | null
    passed: boolean | null
    message: string | null
    checked_at: Date | null
  }

  export type PolicyCheckMaxAggregateOutputType = {
    id: string | null
    claim_id: string | null
    rule_id: string | null
    rule_name: string | null
    passed: boolean | null
    message: string | null
    checked_at: Date | null
  }

  export type PolicyCheckCountAggregateOutputType = {
    id: number
    claim_id: number
    rule_id: number
    rule_name: number
    passed: number
    message: number
    checked_at: number
    _all: number
  }


  export type PolicyCheckMinAggregateInputType = {
    id?: true
    claim_id?: true
    rule_id?: true
    rule_name?: true
    passed?: true
    message?: true
    checked_at?: true
  }

  export type PolicyCheckMaxAggregateInputType = {
    id?: true
    claim_id?: true
    rule_id?: true
    rule_name?: true
    passed?: true
    message?: true
    checked_at?: true
  }

  export type PolicyCheckCountAggregateInputType = {
    id?: true
    claim_id?: true
    rule_id?: true
    rule_name?: true
    passed?: true
    message?: true
    checked_at?: true
    _all?: true
  }

  export type PolicyCheckAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PolicyCheck to aggregate.
     */
    where?: PolicyCheckWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PolicyChecks to fetch.
     */
    orderBy?: PolicyCheckOrderByWithRelationInput | PolicyCheckOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PolicyCheckWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PolicyChecks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PolicyChecks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PolicyChecks
    **/
    _count?: true | PolicyCheckCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PolicyCheckMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PolicyCheckMaxAggregateInputType
  }

  export type GetPolicyCheckAggregateType<T extends PolicyCheckAggregateArgs> = {
        [P in keyof T & keyof AggregatePolicyCheck]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePolicyCheck[P]>
      : GetScalarType<T[P], AggregatePolicyCheck[P]>
  }




  export type PolicyCheckGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PolicyCheckWhereInput
    orderBy?: PolicyCheckOrderByWithAggregationInput | PolicyCheckOrderByWithAggregationInput[]
    by: PolicyCheckScalarFieldEnum[] | PolicyCheckScalarFieldEnum
    having?: PolicyCheckScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PolicyCheckCountAggregateInputType | true
    _min?: PolicyCheckMinAggregateInputType
    _max?: PolicyCheckMaxAggregateInputType
  }

  export type PolicyCheckGroupByOutputType = {
    id: string
    claim_id: string
    rule_id: string
    rule_name: string
    passed: boolean
    message: string | null
    checked_at: Date
    _count: PolicyCheckCountAggregateOutputType | null
    _min: PolicyCheckMinAggregateOutputType | null
    _max: PolicyCheckMaxAggregateOutputType | null
  }

  type GetPolicyCheckGroupByPayload<T extends PolicyCheckGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PolicyCheckGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PolicyCheckGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PolicyCheckGroupByOutputType[P]>
            : GetScalarType<T[P], PolicyCheckGroupByOutputType[P]>
        }
      >
    >


  export type PolicyCheckSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    claim_id?: boolean
    rule_id?: boolean
    rule_name?: boolean
    passed?: boolean
    message?: boolean
    checked_at?: boolean
    claim?: boolean | ClaimRequestDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["policyCheck"]>

  export type PolicyCheckSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    claim_id?: boolean
    rule_id?: boolean
    rule_name?: boolean
    passed?: boolean
    message?: boolean
    checked_at?: boolean
    claim?: boolean | ClaimRequestDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["policyCheck"]>

  export type PolicyCheckSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    claim_id?: boolean
    rule_id?: boolean
    rule_name?: boolean
    passed?: boolean
    message?: boolean
    checked_at?: boolean
    claim?: boolean | ClaimRequestDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["policyCheck"]>

  export type PolicyCheckSelectScalar = {
    id?: boolean
    claim_id?: boolean
    rule_id?: boolean
    rule_name?: boolean
    passed?: boolean
    message?: boolean
    checked_at?: boolean
  }

  export type PolicyCheckOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "claim_id" | "rule_id" | "rule_name" | "passed" | "message" | "checked_at", ExtArgs["result"]["policyCheck"]>
  export type PolicyCheckInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    claim?: boolean | ClaimRequestDefaultArgs<ExtArgs>
  }
  export type PolicyCheckIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    claim?: boolean | ClaimRequestDefaultArgs<ExtArgs>
  }
  export type PolicyCheckIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    claim?: boolean | ClaimRequestDefaultArgs<ExtArgs>
  }

  export type $PolicyCheckPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PolicyCheck"
    objects: {
      claim: Prisma.$ClaimRequestPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      claim_id: string
      rule_id: string
      rule_name: string
      passed: boolean
      message: string | null
      checked_at: Date
    }, ExtArgs["result"]["policyCheck"]>
    composites: {}
  }

  type PolicyCheckGetPayload<S extends boolean | null | undefined | PolicyCheckDefaultArgs> = $Result.GetResult<Prisma.$PolicyCheckPayload, S>

  type PolicyCheckCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PolicyCheckFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PolicyCheckCountAggregateInputType | true
    }

  export interface PolicyCheckDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PolicyCheck'], meta: { name: 'PolicyCheck' } }
    /**
     * Find zero or one PolicyCheck that matches the filter.
     * @param {PolicyCheckFindUniqueArgs} args - Arguments to find a PolicyCheck
     * @example
     * // Get one PolicyCheck
     * const policyCheck = await prisma.policyCheck.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PolicyCheckFindUniqueArgs>(args: SelectSubset<T, PolicyCheckFindUniqueArgs<ExtArgs>>): Prisma__PolicyCheckClient<$Result.GetResult<Prisma.$PolicyCheckPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one PolicyCheck that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PolicyCheckFindUniqueOrThrowArgs} args - Arguments to find a PolicyCheck
     * @example
     * // Get one PolicyCheck
     * const policyCheck = await prisma.policyCheck.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PolicyCheckFindUniqueOrThrowArgs>(args: SelectSubset<T, PolicyCheckFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PolicyCheckClient<$Result.GetResult<Prisma.$PolicyCheckPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PolicyCheck that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PolicyCheckFindFirstArgs} args - Arguments to find a PolicyCheck
     * @example
     * // Get one PolicyCheck
     * const policyCheck = await prisma.policyCheck.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PolicyCheckFindFirstArgs>(args?: SelectSubset<T, PolicyCheckFindFirstArgs<ExtArgs>>): Prisma__PolicyCheckClient<$Result.GetResult<Prisma.$PolicyCheckPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PolicyCheck that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PolicyCheckFindFirstOrThrowArgs} args - Arguments to find a PolicyCheck
     * @example
     * // Get one PolicyCheck
     * const policyCheck = await prisma.policyCheck.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PolicyCheckFindFirstOrThrowArgs>(args?: SelectSubset<T, PolicyCheckFindFirstOrThrowArgs<ExtArgs>>): Prisma__PolicyCheckClient<$Result.GetResult<Prisma.$PolicyCheckPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more PolicyChecks that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PolicyCheckFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PolicyChecks
     * const policyChecks = await prisma.policyCheck.findMany()
     * 
     * // Get first 10 PolicyChecks
     * const policyChecks = await prisma.policyCheck.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const policyCheckWithIdOnly = await prisma.policyCheck.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PolicyCheckFindManyArgs>(args?: SelectSubset<T, PolicyCheckFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PolicyCheckPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a PolicyCheck.
     * @param {PolicyCheckCreateArgs} args - Arguments to create a PolicyCheck.
     * @example
     * // Create one PolicyCheck
     * const PolicyCheck = await prisma.policyCheck.create({
     *   data: {
     *     // ... data to create a PolicyCheck
     *   }
     * })
     * 
     */
    create<T extends PolicyCheckCreateArgs>(args: SelectSubset<T, PolicyCheckCreateArgs<ExtArgs>>): Prisma__PolicyCheckClient<$Result.GetResult<Prisma.$PolicyCheckPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many PolicyChecks.
     * @param {PolicyCheckCreateManyArgs} args - Arguments to create many PolicyChecks.
     * @example
     * // Create many PolicyChecks
     * const policyCheck = await prisma.policyCheck.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PolicyCheckCreateManyArgs>(args?: SelectSubset<T, PolicyCheckCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PolicyChecks and returns the data saved in the database.
     * @param {PolicyCheckCreateManyAndReturnArgs} args - Arguments to create many PolicyChecks.
     * @example
     * // Create many PolicyChecks
     * const policyCheck = await prisma.policyCheck.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PolicyChecks and only return the `id`
     * const policyCheckWithIdOnly = await prisma.policyCheck.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PolicyCheckCreateManyAndReturnArgs>(args?: SelectSubset<T, PolicyCheckCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PolicyCheckPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a PolicyCheck.
     * @param {PolicyCheckDeleteArgs} args - Arguments to delete one PolicyCheck.
     * @example
     * // Delete one PolicyCheck
     * const PolicyCheck = await prisma.policyCheck.delete({
     *   where: {
     *     // ... filter to delete one PolicyCheck
     *   }
     * })
     * 
     */
    delete<T extends PolicyCheckDeleteArgs>(args: SelectSubset<T, PolicyCheckDeleteArgs<ExtArgs>>): Prisma__PolicyCheckClient<$Result.GetResult<Prisma.$PolicyCheckPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one PolicyCheck.
     * @param {PolicyCheckUpdateArgs} args - Arguments to update one PolicyCheck.
     * @example
     * // Update one PolicyCheck
     * const policyCheck = await prisma.policyCheck.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PolicyCheckUpdateArgs>(args: SelectSubset<T, PolicyCheckUpdateArgs<ExtArgs>>): Prisma__PolicyCheckClient<$Result.GetResult<Prisma.$PolicyCheckPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more PolicyChecks.
     * @param {PolicyCheckDeleteManyArgs} args - Arguments to filter PolicyChecks to delete.
     * @example
     * // Delete a few PolicyChecks
     * const { count } = await prisma.policyCheck.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PolicyCheckDeleteManyArgs>(args?: SelectSubset<T, PolicyCheckDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PolicyChecks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PolicyCheckUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PolicyChecks
     * const policyCheck = await prisma.policyCheck.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PolicyCheckUpdateManyArgs>(args: SelectSubset<T, PolicyCheckUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PolicyChecks and returns the data updated in the database.
     * @param {PolicyCheckUpdateManyAndReturnArgs} args - Arguments to update many PolicyChecks.
     * @example
     * // Update many PolicyChecks
     * const policyCheck = await prisma.policyCheck.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more PolicyChecks and only return the `id`
     * const policyCheckWithIdOnly = await prisma.policyCheck.updateManyAndReturn({
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
    updateManyAndReturn<T extends PolicyCheckUpdateManyAndReturnArgs>(args: SelectSubset<T, PolicyCheckUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PolicyCheckPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one PolicyCheck.
     * @param {PolicyCheckUpsertArgs} args - Arguments to update or create a PolicyCheck.
     * @example
     * // Update or create a PolicyCheck
     * const policyCheck = await prisma.policyCheck.upsert({
     *   create: {
     *     // ... data to create a PolicyCheck
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PolicyCheck we want to update
     *   }
     * })
     */
    upsert<T extends PolicyCheckUpsertArgs>(args: SelectSubset<T, PolicyCheckUpsertArgs<ExtArgs>>): Prisma__PolicyCheckClient<$Result.GetResult<Prisma.$PolicyCheckPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of PolicyChecks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PolicyCheckCountArgs} args - Arguments to filter PolicyChecks to count.
     * @example
     * // Count the number of PolicyChecks
     * const count = await prisma.policyCheck.count({
     *   where: {
     *     // ... the filter for the PolicyChecks we want to count
     *   }
     * })
    **/
    count<T extends PolicyCheckCountArgs>(
      args?: Subset<T, PolicyCheckCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PolicyCheckCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PolicyCheck.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PolicyCheckAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends PolicyCheckAggregateArgs>(args: Subset<T, PolicyCheckAggregateArgs>): Prisma.PrismaPromise<GetPolicyCheckAggregateType<T>>

    /**
     * Group by PolicyCheck.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PolicyCheckGroupByArgs} args - Group by arguments.
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
      T extends PolicyCheckGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PolicyCheckGroupByArgs['orderBy'] }
        : { orderBy?: PolicyCheckGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, PolicyCheckGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPolicyCheckGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PolicyCheck model
   */
  readonly fields: PolicyCheckFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PolicyCheck.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PolicyCheckClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the PolicyCheck model
   */
  interface PolicyCheckFieldRefs {
    readonly id: FieldRef<"PolicyCheck", 'String'>
    readonly claim_id: FieldRef<"PolicyCheck", 'String'>
    readonly rule_id: FieldRef<"PolicyCheck", 'String'>
    readonly rule_name: FieldRef<"PolicyCheck", 'String'>
    readonly passed: FieldRef<"PolicyCheck", 'Boolean'>
    readonly message: FieldRef<"PolicyCheck", 'String'>
    readonly checked_at: FieldRef<"PolicyCheck", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * PolicyCheck findUnique
   */
  export type PolicyCheckFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PolicyCheck
     */
    select?: PolicyCheckSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PolicyCheck
     */
    omit?: PolicyCheckOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PolicyCheckInclude<ExtArgs> | null
    /**
     * Filter, which PolicyCheck to fetch.
     */
    where: PolicyCheckWhereUniqueInput
  }

  /**
   * PolicyCheck findUniqueOrThrow
   */
  export type PolicyCheckFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PolicyCheck
     */
    select?: PolicyCheckSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PolicyCheck
     */
    omit?: PolicyCheckOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PolicyCheckInclude<ExtArgs> | null
    /**
     * Filter, which PolicyCheck to fetch.
     */
    where: PolicyCheckWhereUniqueInput
  }

  /**
   * PolicyCheck findFirst
   */
  export type PolicyCheckFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PolicyCheck
     */
    select?: PolicyCheckSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PolicyCheck
     */
    omit?: PolicyCheckOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PolicyCheckInclude<ExtArgs> | null
    /**
     * Filter, which PolicyCheck to fetch.
     */
    where?: PolicyCheckWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PolicyChecks to fetch.
     */
    orderBy?: PolicyCheckOrderByWithRelationInput | PolicyCheckOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PolicyChecks.
     */
    cursor?: PolicyCheckWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PolicyChecks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PolicyChecks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PolicyChecks.
     */
    distinct?: PolicyCheckScalarFieldEnum | PolicyCheckScalarFieldEnum[]
  }

  /**
   * PolicyCheck findFirstOrThrow
   */
  export type PolicyCheckFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PolicyCheck
     */
    select?: PolicyCheckSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PolicyCheck
     */
    omit?: PolicyCheckOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PolicyCheckInclude<ExtArgs> | null
    /**
     * Filter, which PolicyCheck to fetch.
     */
    where?: PolicyCheckWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PolicyChecks to fetch.
     */
    orderBy?: PolicyCheckOrderByWithRelationInput | PolicyCheckOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PolicyChecks.
     */
    cursor?: PolicyCheckWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PolicyChecks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PolicyChecks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PolicyChecks.
     */
    distinct?: PolicyCheckScalarFieldEnum | PolicyCheckScalarFieldEnum[]
  }

  /**
   * PolicyCheck findMany
   */
  export type PolicyCheckFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PolicyCheck
     */
    select?: PolicyCheckSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PolicyCheck
     */
    omit?: PolicyCheckOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PolicyCheckInclude<ExtArgs> | null
    /**
     * Filter, which PolicyChecks to fetch.
     */
    where?: PolicyCheckWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PolicyChecks to fetch.
     */
    orderBy?: PolicyCheckOrderByWithRelationInput | PolicyCheckOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PolicyChecks.
     */
    cursor?: PolicyCheckWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PolicyChecks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PolicyChecks.
     */
    skip?: number
    distinct?: PolicyCheckScalarFieldEnum | PolicyCheckScalarFieldEnum[]
  }

  /**
   * PolicyCheck create
   */
  export type PolicyCheckCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PolicyCheck
     */
    select?: PolicyCheckSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PolicyCheck
     */
    omit?: PolicyCheckOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PolicyCheckInclude<ExtArgs> | null
    /**
     * The data needed to create a PolicyCheck.
     */
    data: XOR<PolicyCheckCreateInput, PolicyCheckUncheckedCreateInput>
  }

  /**
   * PolicyCheck createMany
   */
  export type PolicyCheckCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PolicyChecks.
     */
    data: PolicyCheckCreateManyInput | PolicyCheckCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PolicyCheck createManyAndReturn
   */
  export type PolicyCheckCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PolicyCheck
     */
    select?: PolicyCheckSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PolicyCheck
     */
    omit?: PolicyCheckOmit<ExtArgs> | null
    /**
     * The data used to create many PolicyChecks.
     */
    data: PolicyCheckCreateManyInput | PolicyCheckCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PolicyCheckIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * PolicyCheck update
   */
  export type PolicyCheckUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PolicyCheck
     */
    select?: PolicyCheckSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PolicyCheck
     */
    omit?: PolicyCheckOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PolicyCheckInclude<ExtArgs> | null
    /**
     * The data needed to update a PolicyCheck.
     */
    data: XOR<PolicyCheckUpdateInput, PolicyCheckUncheckedUpdateInput>
    /**
     * Choose, which PolicyCheck to update.
     */
    where: PolicyCheckWhereUniqueInput
  }

  /**
   * PolicyCheck updateMany
   */
  export type PolicyCheckUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PolicyChecks.
     */
    data: XOR<PolicyCheckUpdateManyMutationInput, PolicyCheckUncheckedUpdateManyInput>
    /**
     * Filter which PolicyChecks to update
     */
    where?: PolicyCheckWhereInput
    /**
     * Limit how many PolicyChecks to update.
     */
    limit?: number
  }

  /**
   * PolicyCheck updateManyAndReturn
   */
  export type PolicyCheckUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PolicyCheck
     */
    select?: PolicyCheckSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PolicyCheck
     */
    omit?: PolicyCheckOmit<ExtArgs> | null
    /**
     * The data used to update PolicyChecks.
     */
    data: XOR<PolicyCheckUpdateManyMutationInput, PolicyCheckUncheckedUpdateManyInput>
    /**
     * Filter which PolicyChecks to update
     */
    where?: PolicyCheckWhereInput
    /**
     * Limit how many PolicyChecks to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PolicyCheckIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * PolicyCheck upsert
   */
  export type PolicyCheckUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PolicyCheck
     */
    select?: PolicyCheckSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PolicyCheck
     */
    omit?: PolicyCheckOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PolicyCheckInclude<ExtArgs> | null
    /**
     * The filter to search for the PolicyCheck to update in case it exists.
     */
    where: PolicyCheckWhereUniqueInput
    /**
     * In case the PolicyCheck found by the `where` argument doesn't exist, create a new PolicyCheck with this data.
     */
    create: XOR<PolicyCheckCreateInput, PolicyCheckUncheckedCreateInput>
    /**
     * In case the PolicyCheck was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PolicyCheckUpdateInput, PolicyCheckUncheckedUpdateInput>
  }

  /**
   * PolicyCheck delete
   */
  export type PolicyCheckDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PolicyCheck
     */
    select?: PolicyCheckSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PolicyCheck
     */
    omit?: PolicyCheckOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PolicyCheckInclude<ExtArgs> | null
    /**
     * Filter which PolicyCheck to delete.
     */
    where: PolicyCheckWhereUniqueInput
  }

  /**
   * PolicyCheck deleteMany
   */
  export type PolicyCheckDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PolicyChecks to delete
     */
    where?: PolicyCheckWhereInput
    /**
     * Limit how many PolicyChecks to delete.
     */
    limit?: number
  }

  /**
   * PolicyCheck without action
   */
  export type PolicyCheckDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PolicyCheck
     */
    select?: PolicyCheckSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PolicyCheck
     */
    omit?: PolicyCheckOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PolicyCheckInclude<ExtArgs> | null
  }


  /**
   * Model HospitalReferral
   */

  export type AggregateHospitalReferral = {
    _count: HospitalReferralCountAggregateOutputType | null
    _min: HospitalReferralMinAggregateOutputType | null
    _max: HospitalReferralMaxAggregateOutputType | null
  }

  export type HospitalReferralMinAggregateOutputType = {
    id: string | null
    employee_id: string | null
    employee_name: string | null
    hospital_name: string | null
    hospital_branch: string | null
    reason: string | null
    preferred_date: Date | null
    valid_from: Date | null
    valid_until: Date | null
    status: string | null
    workflow_id: string | null
    referral_number: string | null
    approved_by: string | null
    approved_at: Date | null
    issued_by: string | null
    issued_at: Date | null
    rejected_by: string | null
    rejected_reason: string | null
    notes: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type HospitalReferralMaxAggregateOutputType = {
    id: string | null
    employee_id: string | null
    employee_name: string | null
    hospital_name: string | null
    hospital_branch: string | null
    reason: string | null
    preferred_date: Date | null
    valid_from: Date | null
    valid_until: Date | null
    status: string | null
    workflow_id: string | null
    referral_number: string | null
    approved_by: string | null
    approved_at: Date | null
    issued_by: string | null
    issued_at: Date | null
    rejected_by: string | null
    rejected_reason: string | null
    notes: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type HospitalReferralCountAggregateOutputType = {
    id: number
    employee_id: number
    employee_name: number
    hospital_name: number
    hospital_branch: number
    reason: number
    preferred_date: number
    valid_from: number
    valid_until: number
    status: number
    workflow_id: number
    referral_number: number
    approved_by: number
    approved_at: number
    issued_by: number
    issued_at: number
    rejected_by: number
    rejected_reason: number
    notes: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type HospitalReferralMinAggregateInputType = {
    id?: true
    employee_id?: true
    employee_name?: true
    hospital_name?: true
    hospital_branch?: true
    reason?: true
    preferred_date?: true
    valid_from?: true
    valid_until?: true
    status?: true
    workflow_id?: true
    referral_number?: true
    approved_by?: true
    approved_at?: true
    issued_by?: true
    issued_at?: true
    rejected_by?: true
    rejected_reason?: true
    notes?: true
    created_at?: true
    updated_at?: true
  }

  export type HospitalReferralMaxAggregateInputType = {
    id?: true
    employee_id?: true
    employee_name?: true
    hospital_name?: true
    hospital_branch?: true
    reason?: true
    preferred_date?: true
    valid_from?: true
    valid_until?: true
    status?: true
    workflow_id?: true
    referral_number?: true
    approved_by?: true
    approved_at?: true
    issued_by?: true
    issued_at?: true
    rejected_by?: true
    rejected_reason?: true
    notes?: true
    created_at?: true
    updated_at?: true
  }

  export type HospitalReferralCountAggregateInputType = {
    id?: true
    employee_id?: true
    employee_name?: true
    hospital_name?: true
    hospital_branch?: true
    reason?: true
    preferred_date?: true
    valid_from?: true
    valid_until?: true
    status?: true
    workflow_id?: true
    referral_number?: true
    approved_by?: true
    approved_at?: true
    issued_by?: true
    issued_at?: true
    rejected_by?: true
    rejected_reason?: true
    notes?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type HospitalReferralAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which HospitalReferral to aggregate.
     */
    where?: HospitalReferralWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of HospitalReferrals to fetch.
     */
    orderBy?: HospitalReferralOrderByWithRelationInput | HospitalReferralOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: HospitalReferralWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` HospitalReferrals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` HospitalReferrals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned HospitalReferrals
    **/
    _count?: true | HospitalReferralCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: HospitalReferralMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: HospitalReferralMaxAggregateInputType
  }

  export type GetHospitalReferralAggregateType<T extends HospitalReferralAggregateArgs> = {
        [P in keyof T & keyof AggregateHospitalReferral]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateHospitalReferral[P]>
      : GetScalarType<T[P], AggregateHospitalReferral[P]>
  }




  export type HospitalReferralGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: HospitalReferralWhereInput
    orderBy?: HospitalReferralOrderByWithAggregationInput | HospitalReferralOrderByWithAggregationInput[]
    by: HospitalReferralScalarFieldEnum[] | HospitalReferralScalarFieldEnum
    having?: HospitalReferralScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: HospitalReferralCountAggregateInputType | true
    _min?: HospitalReferralMinAggregateInputType
    _max?: HospitalReferralMaxAggregateInputType
  }

  export type HospitalReferralGroupByOutputType = {
    id: string
    employee_id: string
    employee_name: string
    hospital_name: string
    hospital_branch: string | null
    reason: string
    preferred_date: Date
    valid_from: Date | null
    valid_until: Date | null
    status: string
    workflow_id: string | null
    referral_number: string | null
    approved_by: string | null
    approved_at: Date | null
    issued_by: string | null
    issued_at: Date | null
    rejected_by: string | null
    rejected_reason: string | null
    notes: string | null
    created_at: Date
    updated_at: Date
    _count: HospitalReferralCountAggregateOutputType | null
    _min: HospitalReferralMinAggregateOutputType | null
    _max: HospitalReferralMaxAggregateOutputType | null
  }

  type GetHospitalReferralGroupByPayload<T extends HospitalReferralGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<HospitalReferralGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof HospitalReferralGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], HospitalReferralGroupByOutputType[P]>
            : GetScalarType<T[P], HospitalReferralGroupByOutputType[P]>
        }
      >
    >


  export type HospitalReferralSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    employee_id?: boolean
    employee_name?: boolean
    hospital_name?: boolean
    hospital_branch?: boolean
    reason?: boolean
    preferred_date?: boolean
    valid_from?: boolean
    valid_until?: boolean
    status?: boolean
    workflow_id?: boolean
    referral_number?: boolean
    approved_by?: boolean
    approved_at?: boolean
    issued_by?: boolean
    issued_at?: boolean
    rejected_by?: boolean
    rejected_reason?: boolean
    notes?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["hospitalReferral"]>

  export type HospitalReferralSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    employee_id?: boolean
    employee_name?: boolean
    hospital_name?: boolean
    hospital_branch?: boolean
    reason?: boolean
    preferred_date?: boolean
    valid_from?: boolean
    valid_until?: boolean
    status?: boolean
    workflow_id?: boolean
    referral_number?: boolean
    approved_by?: boolean
    approved_at?: boolean
    issued_by?: boolean
    issued_at?: boolean
    rejected_by?: boolean
    rejected_reason?: boolean
    notes?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["hospitalReferral"]>

  export type HospitalReferralSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    employee_id?: boolean
    employee_name?: boolean
    hospital_name?: boolean
    hospital_branch?: boolean
    reason?: boolean
    preferred_date?: boolean
    valid_from?: boolean
    valid_until?: boolean
    status?: boolean
    workflow_id?: boolean
    referral_number?: boolean
    approved_by?: boolean
    approved_at?: boolean
    issued_by?: boolean
    issued_at?: boolean
    rejected_by?: boolean
    rejected_reason?: boolean
    notes?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["hospitalReferral"]>

  export type HospitalReferralSelectScalar = {
    id?: boolean
    employee_id?: boolean
    employee_name?: boolean
    hospital_name?: boolean
    hospital_branch?: boolean
    reason?: boolean
    preferred_date?: boolean
    valid_from?: boolean
    valid_until?: boolean
    status?: boolean
    workflow_id?: boolean
    referral_number?: boolean
    approved_by?: boolean
    approved_at?: boolean
    issued_by?: boolean
    issued_at?: boolean
    rejected_by?: boolean
    rejected_reason?: boolean
    notes?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type HospitalReferralOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "employee_id" | "employee_name" | "hospital_name" | "hospital_branch" | "reason" | "preferred_date" | "valid_from" | "valid_until" | "status" | "workflow_id" | "referral_number" | "approved_by" | "approved_at" | "issued_by" | "issued_at" | "rejected_by" | "rejected_reason" | "notes" | "created_at" | "updated_at", ExtArgs["result"]["hospitalReferral"]>

  export type $HospitalReferralPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "HospitalReferral"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      employee_id: string
      employee_name: string
      hospital_name: string
      hospital_branch: string | null
      reason: string
      preferred_date: Date
      valid_from: Date | null
      valid_until: Date | null
      status: string
      workflow_id: string | null
      referral_number: string | null
      approved_by: string | null
      approved_at: Date | null
      issued_by: string | null
      issued_at: Date | null
      rejected_by: string | null
      rejected_reason: string | null
      notes: string | null
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["hospitalReferral"]>
    composites: {}
  }

  type HospitalReferralGetPayload<S extends boolean | null | undefined | HospitalReferralDefaultArgs> = $Result.GetResult<Prisma.$HospitalReferralPayload, S>

  type HospitalReferralCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<HospitalReferralFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: HospitalReferralCountAggregateInputType | true
    }

  export interface HospitalReferralDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['HospitalReferral'], meta: { name: 'HospitalReferral' } }
    /**
     * Find zero or one HospitalReferral that matches the filter.
     * @param {HospitalReferralFindUniqueArgs} args - Arguments to find a HospitalReferral
     * @example
     * // Get one HospitalReferral
     * const hospitalReferral = await prisma.hospitalReferral.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends HospitalReferralFindUniqueArgs>(args: SelectSubset<T, HospitalReferralFindUniqueArgs<ExtArgs>>): Prisma__HospitalReferralClient<$Result.GetResult<Prisma.$HospitalReferralPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one HospitalReferral that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {HospitalReferralFindUniqueOrThrowArgs} args - Arguments to find a HospitalReferral
     * @example
     * // Get one HospitalReferral
     * const hospitalReferral = await prisma.hospitalReferral.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends HospitalReferralFindUniqueOrThrowArgs>(args: SelectSubset<T, HospitalReferralFindUniqueOrThrowArgs<ExtArgs>>): Prisma__HospitalReferralClient<$Result.GetResult<Prisma.$HospitalReferralPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first HospitalReferral that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HospitalReferralFindFirstArgs} args - Arguments to find a HospitalReferral
     * @example
     * // Get one HospitalReferral
     * const hospitalReferral = await prisma.hospitalReferral.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends HospitalReferralFindFirstArgs>(args?: SelectSubset<T, HospitalReferralFindFirstArgs<ExtArgs>>): Prisma__HospitalReferralClient<$Result.GetResult<Prisma.$HospitalReferralPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first HospitalReferral that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HospitalReferralFindFirstOrThrowArgs} args - Arguments to find a HospitalReferral
     * @example
     * // Get one HospitalReferral
     * const hospitalReferral = await prisma.hospitalReferral.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends HospitalReferralFindFirstOrThrowArgs>(args?: SelectSubset<T, HospitalReferralFindFirstOrThrowArgs<ExtArgs>>): Prisma__HospitalReferralClient<$Result.GetResult<Prisma.$HospitalReferralPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more HospitalReferrals that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HospitalReferralFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all HospitalReferrals
     * const hospitalReferrals = await prisma.hospitalReferral.findMany()
     * 
     * // Get first 10 HospitalReferrals
     * const hospitalReferrals = await prisma.hospitalReferral.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const hospitalReferralWithIdOnly = await prisma.hospitalReferral.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends HospitalReferralFindManyArgs>(args?: SelectSubset<T, HospitalReferralFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HospitalReferralPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a HospitalReferral.
     * @param {HospitalReferralCreateArgs} args - Arguments to create a HospitalReferral.
     * @example
     * // Create one HospitalReferral
     * const HospitalReferral = await prisma.hospitalReferral.create({
     *   data: {
     *     // ... data to create a HospitalReferral
     *   }
     * })
     * 
     */
    create<T extends HospitalReferralCreateArgs>(args: SelectSubset<T, HospitalReferralCreateArgs<ExtArgs>>): Prisma__HospitalReferralClient<$Result.GetResult<Prisma.$HospitalReferralPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many HospitalReferrals.
     * @param {HospitalReferralCreateManyArgs} args - Arguments to create many HospitalReferrals.
     * @example
     * // Create many HospitalReferrals
     * const hospitalReferral = await prisma.hospitalReferral.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends HospitalReferralCreateManyArgs>(args?: SelectSubset<T, HospitalReferralCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many HospitalReferrals and returns the data saved in the database.
     * @param {HospitalReferralCreateManyAndReturnArgs} args - Arguments to create many HospitalReferrals.
     * @example
     * // Create many HospitalReferrals
     * const hospitalReferral = await prisma.hospitalReferral.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many HospitalReferrals and only return the `id`
     * const hospitalReferralWithIdOnly = await prisma.hospitalReferral.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends HospitalReferralCreateManyAndReturnArgs>(args?: SelectSubset<T, HospitalReferralCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HospitalReferralPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a HospitalReferral.
     * @param {HospitalReferralDeleteArgs} args - Arguments to delete one HospitalReferral.
     * @example
     * // Delete one HospitalReferral
     * const HospitalReferral = await prisma.hospitalReferral.delete({
     *   where: {
     *     // ... filter to delete one HospitalReferral
     *   }
     * })
     * 
     */
    delete<T extends HospitalReferralDeleteArgs>(args: SelectSubset<T, HospitalReferralDeleteArgs<ExtArgs>>): Prisma__HospitalReferralClient<$Result.GetResult<Prisma.$HospitalReferralPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one HospitalReferral.
     * @param {HospitalReferralUpdateArgs} args - Arguments to update one HospitalReferral.
     * @example
     * // Update one HospitalReferral
     * const hospitalReferral = await prisma.hospitalReferral.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends HospitalReferralUpdateArgs>(args: SelectSubset<T, HospitalReferralUpdateArgs<ExtArgs>>): Prisma__HospitalReferralClient<$Result.GetResult<Prisma.$HospitalReferralPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more HospitalReferrals.
     * @param {HospitalReferralDeleteManyArgs} args - Arguments to filter HospitalReferrals to delete.
     * @example
     * // Delete a few HospitalReferrals
     * const { count } = await prisma.hospitalReferral.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends HospitalReferralDeleteManyArgs>(args?: SelectSubset<T, HospitalReferralDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more HospitalReferrals.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HospitalReferralUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many HospitalReferrals
     * const hospitalReferral = await prisma.hospitalReferral.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends HospitalReferralUpdateManyArgs>(args: SelectSubset<T, HospitalReferralUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more HospitalReferrals and returns the data updated in the database.
     * @param {HospitalReferralUpdateManyAndReturnArgs} args - Arguments to update many HospitalReferrals.
     * @example
     * // Update many HospitalReferrals
     * const hospitalReferral = await prisma.hospitalReferral.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more HospitalReferrals and only return the `id`
     * const hospitalReferralWithIdOnly = await prisma.hospitalReferral.updateManyAndReturn({
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
    updateManyAndReturn<T extends HospitalReferralUpdateManyAndReturnArgs>(args: SelectSubset<T, HospitalReferralUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HospitalReferralPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one HospitalReferral.
     * @param {HospitalReferralUpsertArgs} args - Arguments to update or create a HospitalReferral.
     * @example
     * // Update or create a HospitalReferral
     * const hospitalReferral = await prisma.hospitalReferral.upsert({
     *   create: {
     *     // ... data to create a HospitalReferral
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the HospitalReferral we want to update
     *   }
     * })
     */
    upsert<T extends HospitalReferralUpsertArgs>(args: SelectSubset<T, HospitalReferralUpsertArgs<ExtArgs>>): Prisma__HospitalReferralClient<$Result.GetResult<Prisma.$HospitalReferralPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of HospitalReferrals.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HospitalReferralCountArgs} args - Arguments to filter HospitalReferrals to count.
     * @example
     * // Count the number of HospitalReferrals
     * const count = await prisma.hospitalReferral.count({
     *   where: {
     *     // ... the filter for the HospitalReferrals we want to count
     *   }
     * })
    **/
    count<T extends HospitalReferralCountArgs>(
      args?: Subset<T, HospitalReferralCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], HospitalReferralCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a HospitalReferral.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HospitalReferralAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends HospitalReferralAggregateArgs>(args: Subset<T, HospitalReferralAggregateArgs>): Prisma.PrismaPromise<GetHospitalReferralAggregateType<T>>

    /**
     * Group by HospitalReferral.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HospitalReferralGroupByArgs} args - Group by arguments.
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
      T extends HospitalReferralGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: HospitalReferralGroupByArgs['orderBy'] }
        : { orderBy?: HospitalReferralGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, HospitalReferralGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetHospitalReferralGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the HospitalReferral model
   */
  readonly fields: HospitalReferralFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for HospitalReferral.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__HospitalReferralClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the HospitalReferral model
   */
  interface HospitalReferralFieldRefs {
    readonly id: FieldRef<"HospitalReferral", 'String'>
    readonly employee_id: FieldRef<"HospitalReferral", 'String'>
    readonly employee_name: FieldRef<"HospitalReferral", 'String'>
    readonly hospital_name: FieldRef<"HospitalReferral", 'String'>
    readonly hospital_branch: FieldRef<"HospitalReferral", 'String'>
    readonly reason: FieldRef<"HospitalReferral", 'String'>
    readonly preferred_date: FieldRef<"HospitalReferral", 'DateTime'>
    readonly valid_from: FieldRef<"HospitalReferral", 'DateTime'>
    readonly valid_until: FieldRef<"HospitalReferral", 'DateTime'>
    readonly status: FieldRef<"HospitalReferral", 'String'>
    readonly workflow_id: FieldRef<"HospitalReferral", 'String'>
    readonly referral_number: FieldRef<"HospitalReferral", 'String'>
    readonly approved_by: FieldRef<"HospitalReferral", 'String'>
    readonly approved_at: FieldRef<"HospitalReferral", 'DateTime'>
    readonly issued_by: FieldRef<"HospitalReferral", 'String'>
    readonly issued_at: FieldRef<"HospitalReferral", 'DateTime'>
    readonly rejected_by: FieldRef<"HospitalReferral", 'String'>
    readonly rejected_reason: FieldRef<"HospitalReferral", 'String'>
    readonly notes: FieldRef<"HospitalReferral", 'String'>
    readonly created_at: FieldRef<"HospitalReferral", 'DateTime'>
    readonly updated_at: FieldRef<"HospitalReferral", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * HospitalReferral findUnique
   */
  export type HospitalReferralFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HospitalReferral
     */
    select?: HospitalReferralSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HospitalReferral
     */
    omit?: HospitalReferralOmit<ExtArgs> | null
    /**
     * Filter, which HospitalReferral to fetch.
     */
    where: HospitalReferralWhereUniqueInput
  }

  /**
   * HospitalReferral findUniqueOrThrow
   */
  export type HospitalReferralFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HospitalReferral
     */
    select?: HospitalReferralSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HospitalReferral
     */
    omit?: HospitalReferralOmit<ExtArgs> | null
    /**
     * Filter, which HospitalReferral to fetch.
     */
    where: HospitalReferralWhereUniqueInput
  }

  /**
   * HospitalReferral findFirst
   */
  export type HospitalReferralFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HospitalReferral
     */
    select?: HospitalReferralSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HospitalReferral
     */
    omit?: HospitalReferralOmit<ExtArgs> | null
    /**
     * Filter, which HospitalReferral to fetch.
     */
    where?: HospitalReferralWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of HospitalReferrals to fetch.
     */
    orderBy?: HospitalReferralOrderByWithRelationInput | HospitalReferralOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for HospitalReferrals.
     */
    cursor?: HospitalReferralWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` HospitalReferrals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` HospitalReferrals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of HospitalReferrals.
     */
    distinct?: HospitalReferralScalarFieldEnum | HospitalReferralScalarFieldEnum[]
  }

  /**
   * HospitalReferral findFirstOrThrow
   */
  export type HospitalReferralFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HospitalReferral
     */
    select?: HospitalReferralSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HospitalReferral
     */
    omit?: HospitalReferralOmit<ExtArgs> | null
    /**
     * Filter, which HospitalReferral to fetch.
     */
    where?: HospitalReferralWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of HospitalReferrals to fetch.
     */
    orderBy?: HospitalReferralOrderByWithRelationInput | HospitalReferralOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for HospitalReferrals.
     */
    cursor?: HospitalReferralWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` HospitalReferrals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` HospitalReferrals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of HospitalReferrals.
     */
    distinct?: HospitalReferralScalarFieldEnum | HospitalReferralScalarFieldEnum[]
  }

  /**
   * HospitalReferral findMany
   */
  export type HospitalReferralFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HospitalReferral
     */
    select?: HospitalReferralSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HospitalReferral
     */
    omit?: HospitalReferralOmit<ExtArgs> | null
    /**
     * Filter, which HospitalReferrals to fetch.
     */
    where?: HospitalReferralWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of HospitalReferrals to fetch.
     */
    orderBy?: HospitalReferralOrderByWithRelationInput | HospitalReferralOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing HospitalReferrals.
     */
    cursor?: HospitalReferralWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` HospitalReferrals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` HospitalReferrals.
     */
    skip?: number
    distinct?: HospitalReferralScalarFieldEnum | HospitalReferralScalarFieldEnum[]
  }

  /**
   * HospitalReferral create
   */
  export type HospitalReferralCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HospitalReferral
     */
    select?: HospitalReferralSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HospitalReferral
     */
    omit?: HospitalReferralOmit<ExtArgs> | null
    /**
     * The data needed to create a HospitalReferral.
     */
    data: XOR<HospitalReferralCreateInput, HospitalReferralUncheckedCreateInput>
  }

  /**
   * HospitalReferral createMany
   */
  export type HospitalReferralCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many HospitalReferrals.
     */
    data: HospitalReferralCreateManyInput | HospitalReferralCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * HospitalReferral createManyAndReturn
   */
  export type HospitalReferralCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HospitalReferral
     */
    select?: HospitalReferralSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the HospitalReferral
     */
    omit?: HospitalReferralOmit<ExtArgs> | null
    /**
     * The data used to create many HospitalReferrals.
     */
    data: HospitalReferralCreateManyInput | HospitalReferralCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * HospitalReferral update
   */
  export type HospitalReferralUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HospitalReferral
     */
    select?: HospitalReferralSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HospitalReferral
     */
    omit?: HospitalReferralOmit<ExtArgs> | null
    /**
     * The data needed to update a HospitalReferral.
     */
    data: XOR<HospitalReferralUpdateInput, HospitalReferralUncheckedUpdateInput>
    /**
     * Choose, which HospitalReferral to update.
     */
    where: HospitalReferralWhereUniqueInput
  }

  /**
   * HospitalReferral updateMany
   */
  export type HospitalReferralUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update HospitalReferrals.
     */
    data: XOR<HospitalReferralUpdateManyMutationInput, HospitalReferralUncheckedUpdateManyInput>
    /**
     * Filter which HospitalReferrals to update
     */
    where?: HospitalReferralWhereInput
    /**
     * Limit how many HospitalReferrals to update.
     */
    limit?: number
  }

  /**
   * HospitalReferral updateManyAndReturn
   */
  export type HospitalReferralUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HospitalReferral
     */
    select?: HospitalReferralSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the HospitalReferral
     */
    omit?: HospitalReferralOmit<ExtArgs> | null
    /**
     * The data used to update HospitalReferrals.
     */
    data: XOR<HospitalReferralUpdateManyMutationInput, HospitalReferralUncheckedUpdateManyInput>
    /**
     * Filter which HospitalReferrals to update
     */
    where?: HospitalReferralWhereInput
    /**
     * Limit how many HospitalReferrals to update.
     */
    limit?: number
  }

  /**
   * HospitalReferral upsert
   */
  export type HospitalReferralUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HospitalReferral
     */
    select?: HospitalReferralSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HospitalReferral
     */
    omit?: HospitalReferralOmit<ExtArgs> | null
    /**
     * The filter to search for the HospitalReferral to update in case it exists.
     */
    where: HospitalReferralWhereUniqueInput
    /**
     * In case the HospitalReferral found by the `where` argument doesn't exist, create a new HospitalReferral with this data.
     */
    create: XOR<HospitalReferralCreateInput, HospitalReferralUncheckedCreateInput>
    /**
     * In case the HospitalReferral was found with the provided `where` argument, update it with this data.
     */
    update: XOR<HospitalReferralUpdateInput, HospitalReferralUncheckedUpdateInput>
  }

  /**
   * HospitalReferral delete
   */
  export type HospitalReferralDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HospitalReferral
     */
    select?: HospitalReferralSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HospitalReferral
     */
    omit?: HospitalReferralOmit<ExtArgs> | null
    /**
     * Filter which HospitalReferral to delete.
     */
    where: HospitalReferralWhereUniqueInput
  }

  /**
   * HospitalReferral deleteMany
   */
  export type HospitalReferralDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which HospitalReferrals to delete
     */
    where?: HospitalReferralWhereInput
    /**
     * Limit how many HospitalReferrals to delete.
     */
    limit?: number
  }

  /**
   * HospitalReferral without action
   */
  export type HospitalReferralDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HospitalReferral
     */
    select?: HospitalReferralSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HospitalReferral
     */
    omit?: HospitalReferralOmit<ExtArgs> | null
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


  export const BenefitPlanScalarFieldEnum: {
    id: 'id',
    code: 'code',
    name_en: 'name_en',
    name_th: 'name_th',
    category: 'category',
    description_en: 'description_en',
    description_th: 'description_th',
    coverage_amount: 'coverage_amount',
    employer_contribution: 'employer_contribution',
    employee_contribution: 'employee_contribution',
    is_active: 'is_active',
    effective_date: 'effective_date',
    end_date: 'end_date',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type BenefitPlanScalarFieldEnum = (typeof BenefitPlanScalarFieldEnum)[keyof typeof BenefitPlanScalarFieldEnum]


  export const BenefitEnrollmentScalarFieldEnum: {
    id: 'id',
    employee_id: 'employee_id',
    plan_id: 'plan_id',
    coverage_level: 'coverage_level',
    status: 'status',
    enrolled_at: 'enrolled_at',
    effective_date: 'effective_date',
    end_date: 'end_date',
    cancelled_at: 'cancelled_at',
    cancellation_reason: 'cancellation_reason',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type BenefitEnrollmentScalarFieldEnum = (typeof BenefitEnrollmentScalarFieldEnum)[keyof typeof BenefitEnrollmentScalarFieldEnum]


  export const BenefitDependentScalarFieldEnum: {
    id: 'id',
    enrollment_id: 'enrollment_id',
    name: 'name',
    relationship: 'relationship',
    date_of_birth: 'date_of_birth',
    national_id: 'national_id',
    is_active: 'is_active',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type BenefitDependentScalarFieldEnum = (typeof BenefitDependentScalarFieldEnum)[keyof typeof BenefitDependentScalarFieldEnum]


  export const BenefitClaimScalarFieldEnum: {
    id: 'id',
    employee_id: 'employee_id',
    plan_id: 'plan_id',
    claim_type: 'claim_type',
    amount: 'amount',
    description: 'description',
    receipt_date: 'receipt_date',
    status: 'status',
    submitted_at: 'submitted_at',
    reviewed_at: 'reviewed_at',
    reviewed_by: 'reviewed_by',
    rejection_reason: 'rejection_reason',
    paid_at: 'paid_at',
    paid_amount: 'paid_amount',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type BenefitClaimScalarFieldEnum = (typeof BenefitClaimScalarFieldEnum)[keyof typeof BenefitClaimScalarFieldEnum]


  export const ClaimRequestScalarFieldEnum: {
    id: 'id',
    employee_id: 'employee_id',
    receipt_id: 'receipt_id',
    category: 'category',
    amount: 'amount',
    currency: 'currency',
    description: 'description',
    status: 'status',
    auto_approved: 'auto_approved',
    approved_by: 'approved_by',
    approved_at: 'approved_at',
    rejected_by: 'rejected_by',
    rejected_reason: 'rejected_reason',
    submitted_at: 'submitted_at',
    ocr_result_id: 'ocr_result_id',
    requires_finance_approval: 'requires_finance_approval',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type ClaimRequestScalarFieldEnum = (typeof ClaimRequestScalarFieldEnum)[keyof typeof ClaimRequestScalarFieldEnum]


  export const OCRResultScalarFieldEnum: {
    id: 'id',
    receipt_file_name: 'receipt_file_name',
    receipt_file_type: 'receipt_file_type',
    receipt_file_size: 'receipt_file_size',
    vendor_name: 'vendor_name',
    amount: 'amount',
    receipt_date: 'receipt_date',
    category: 'category',
    confidence_score: 'confidence_score',
    raw_text: 'raw_text',
    processed_at: 'processed_at'
  };

  export type OCRResultScalarFieldEnum = (typeof OCRResultScalarFieldEnum)[keyof typeof OCRResultScalarFieldEnum]


  export const PolicyRuleScalarFieldEnum: {
    id: 'id',
    name: 'name',
    description: 'description',
    rule_type: 'rule_type',
    category: 'category',
    condition_field: 'condition_field',
    condition_value: 'condition_value',
    is_active: 'is_active',
    created_by: 'created_by',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type PolicyRuleScalarFieldEnum = (typeof PolicyRuleScalarFieldEnum)[keyof typeof PolicyRuleScalarFieldEnum]


  export const PolicyCheckScalarFieldEnum: {
    id: 'id',
    claim_id: 'claim_id',
    rule_id: 'rule_id',
    rule_name: 'rule_name',
    passed: 'passed',
    message: 'message',
    checked_at: 'checked_at'
  };

  export type PolicyCheckScalarFieldEnum = (typeof PolicyCheckScalarFieldEnum)[keyof typeof PolicyCheckScalarFieldEnum]


  export const HospitalReferralScalarFieldEnum: {
    id: 'id',
    employee_id: 'employee_id',
    employee_name: 'employee_name',
    hospital_name: 'hospital_name',
    hospital_branch: 'hospital_branch',
    reason: 'reason',
    preferred_date: 'preferred_date',
    valid_from: 'valid_from',
    valid_until: 'valid_until',
    status: 'status',
    workflow_id: 'workflow_id',
    referral_number: 'referral_number',
    approved_by: 'approved_by',
    approved_at: 'approved_at',
    issued_by: 'issued_by',
    issued_at: 'issued_at',
    rejected_by: 'rejected_by',
    rejected_reason: 'rejected_reason',
    notes: 'notes',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type HospitalReferralScalarFieldEnum = (typeof HospitalReferralScalarFieldEnum)[keyof typeof HospitalReferralScalarFieldEnum]


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
   * Reference to a field of type 'Decimal'
   */
  export type DecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal'>
    


  /**
   * Reference to a field of type 'Decimal[]'
   */
  export type ListDecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal[]'>
    


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


  export type BenefitPlanWhereInput = {
    AND?: BenefitPlanWhereInput | BenefitPlanWhereInput[]
    OR?: BenefitPlanWhereInput[]
    NOT?: BenefitPlanWhereInput | BenefitPlanWhereInput[]
    id?: StringFilter<"BenefitPlan"> | string
    code?: StringFilter<"BenefitPlan"> | string
    name_en?: StringFilter<"BenefitPlan"> | string
    name_th?: StringNullableFilter<"BenefitPlan"> | string | null
    category?: StringFilter<"BenefitPlan"> | string
    description_en?: StringNullableFilter<"BenefitPlan"> | string | null
    description_th?: StringNullableFilter<"BenefitPlan"> | string | null
    coverage_amount?: FloatNullableFilter<"BenefitPlan"> | number | null
    employer_contribution?: FloatFilter<"BenefitPlan"> | number
    employee_contribution?: FloatFilter<"BenefitPlan"> | number
    is_active?: BoolFilter<"BenefitPlan"> | boolean
    effective_date?: DateTimeFilter<"BenefitPlan"> | Date | string
    end_date?: DateTimeNullableFilter<"BenefitPlan"> | Date | string | null
    created_at?: DateTimeFilter<"BenefitPlan"> | Date | string
    updated_at?: DateTimeFilter<"BenefitPlan"> | Date | string
    enrollments?: BenefitEnrollmentListRelationFilter
  }

  export type BenefitPlanOrderByWithRelationInput = {
    id?: SortOrder
    code?: SortOrder
    name_en?: SortOrder
    name_th?: SortOrderInput | SortOrder
    category?: SortOrder
    description_en?: SortOrderInput | SortOrder
    description_th?: SortOrderInput | SortOrder
    coverage_amount?: SortOrderInput | SortOrder
    employer_contribution?: SortOrder
    employee_contribution?: SortOrder
    is_active?: SortOrder
    effective_date?: SortOrder
    end_date?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    enrollments?: BenefitEnrollmentOrderByRelationAggregateInput
  }

  export type BenefitPlanWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    code?: string
    AND?: BenefitPlanWhereInput | BenefitPlanWhereInput[]
    OR?: BenefitPlanWhereInput[]
    NOT?: BenefitPlanWhereInput | BenefitPlanWhereInput[]
    name_en?: StringFilter<"BenefitPlan"> | string
    name_th?: StringNullableFilter<"BenefitPlan"> | string | null
    category?: StringFilter<"BenefitPlan"> | string
    description_en?: StringNullableFilter<"BenefitPlan"> | string | null
    description_th?: StringNullableFilter<"BenefitPlan"> | string | null
    coverage_amount?: FloatNullableFilter<"BenefitPlan"> | number | null
    employer_contribution?: FloatFilter<"BenefitPlan"> | number
    employee_contribution?: FloatFilter<"BenefitPlan"> | number
    is_active?: BoolFilter<"BenefitPlan"> | boolean
    effective_date?: DateTimeFilter<"BenefitPlan"> | Date | string
    end_date?: DateTimeNullableFilter<"BenefitPlan"> | Date | string | null
    created_at?: DateTimeFilter<"BenefitPlan"> | Date | string
    updated_at?: DateTimeFilter<"BenefitPlan"> | Date | string
    enrollments?: BenefitEnrollmentListRelationFilter
  }, "id" | "code">

  export type BenefitPlanOrderByWithAggregationInput = {
    id?: SortOrder
    code?: SortOrder
    name_en?: SortOrder
    name_th?: SortOrderInput | SortOrder
    category?: SortOrder
    description_en?: SortOrderInput | SortOrder
    description_th?: SortOrderInput | SortOrder
    coverage_amount?: SortOrderInput | SortOrder
    employer_contribution?: SortOrder
    employee_contribution?: SortOrder
    is_active?: SortOrder
    effective_date?: SortOrder
    end_date?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: BenefitPlanCountOrderByAggregateInput
    _avg?: BenefitPlanAvgOrderByAggregateInput
    _max?: BenefitPlanMaxOrderByAggregateInput
    _min?: BenefitPlanMinOrderByAggregateInput
    _sum?: BenefitPlanSumOrderByAggregateInput
  }

  export type BenefitPlanScalarWhereWithAggregatesInput = {
    AND?: BenefitPlanScalarWhereWithAggregatesInput | BenefitPlanScalarWhereWithAggregatesInput[]
    OR?: BenefitPlanScalarWhereWithAggregatesInput[]
    NOT?: BenefitPlanScalarWhereWithAggregatesInput | BenefitPlanScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"BenefitPlan"> | string
    code?: StringWithAggregatesFilter<"BenefitPlan"> | string
    name_en?: StringWithAggregatesFilter<"BenefitPlan"> | string
    name_th?: StringNullableWithAggregatesFilter<"BenefitPlan"> | string | null
    category?: StringWithAggregatesFilter<"BenefitPlan"> | string
    description_en?: StringNullableWithAggregatesFilter<"BenefitPlan"> | string | null
    description_th?: StringNullableWithAggregatesFilter<"BenefitPlan"> | string | null
    coverage_amount?: FloatNullableWithAggregatesFilter<"BenefitPlan"> | number | null
    employer_contribution?: FloatWithAggregatesFilter<"BenefitPlan"> | number
    employee_contribution?: FloatWithAggregatesFilter<"BenefitPlan"> | number
    is_active?: BoolWithAggregatesFilter<"BenefitPlan"> | boolean
    effective_date?: DateTimeWithAggregatesFilter<"BenefitPlan"> | Date | string
    end_date?: DateTimeNullableWithAggregatesFilter<"BenefitPlan"> | Date | string | null
    created_at?: DateTimeWithAggregatesFilter<"BenefitPlan"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"BenefitPlan"> | Date | string
  }

  export type BenefitEnrollmentWhereInput = {
    AND?: BenefitEnrollmentWhereInput | BenefitEnrollmentWhereInput[]
    OR?: BenefitEnrollmentWhereInput[]
    NOT?: BenefitEnrollmentWhereInput | BenefitEnrollmentWhereInput[]
    id?: StringFilter<"BenefitEnrollment"> | string
    employee_id?: StringFilter<"BenefitEnrollment"> | string
    plan_id?: StringFilter<"BenefitEnrollment"> | string
    coverage_level?: StringFilter<"BenefitEnrollment"> | string
    status?: StringFilter<"BenefitEnrollment"> | string
    enrolled_at?: DateTimeFilter<"BenefitEnrollment"> | Date | string
    effective_date?: DateTimeFilter<"BenefitEnrollment"> | Date | string
    end_date?: DateTimeNullableFilter<"BenefitEnrollment"> | Date | string | null
    cancelled_at?: DateTimeNullableFilter<"BenefitEnrollment"> | Date | string | null
    cancellation_reason?: StringNullableFilter<"BenefitEnrollment"> | string | null
    created_at?: DateTimeFilter<"BenefitEnrollment"> | Date | string
    updated_at?: DateTimeFilter<"BenefitEnrollment"> | Date | string
    plan?: XOR<BenefitPlanScalarRelationFilter, BenefitPlanWhereInput>
    dependents?: BenefitDependentListRelationFilter
  }

  export type BenefitEnrollmentOrderByWithRelationInput = {
    id?: SortOrder
    employee_id?: SortOrder
    plan_id?: SortOrder
    coverage_level?: SortOrder
    status?: SortOrder
    enrolled_at?: SortOrder
    effective_date?: SortOrder
    end_date?: SortOrderInput | SortOrder
    cancelled_at?: SortOrderInput | SortOrder
    cancellation_reason?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    plan?: BenefitPlanOrderByWithRelationInput
    dependents?: BenefitDependentOrderByRelationAggregateInput
  }

  export type BenefitEnrollmentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    employee_id_plan_id?: BenefitEnrollmentEmployee_idPlan_idCompoundUniqueInput
    AND?: BenefitEnrollmentWhereInput | BenefitEnrollmentWhereInput[]
    OR?: BenefitEnrollmentWhereInput[]
    NOT?: BenefitEnrollmentWhereInput | BenefitEnrollmentWhereInput[]
    employee_id?: StringFilter<"BenefitEnrollment"> | string
    plan_id?: StringFilter<"BenefitEnrollment"> | string
    coverage_level?: StringFilter<"BenefitEnrollment"> | string
    status?: StringFilter<"BenefitEnrollment"> | string
    enrolled_at?: DateTimeFilter<"BenefitEnrollment"> | Date | string
    effective_date?: DateTimeFilter<"BenefitEnrollment"> | Date | string
    end_date?: DateTimeNullableFilter<"BenefitEnrollment"> | Date | string | null
    cancelled_at?: DateTimeNullableFilter<"BenefitEnrollment"> | Date | string | null
    cancellation_reason?: StringNullableFilter<"BenefitEnrollment"> | string | null
    created_at?: DateTimeFilter<"BenefitEnrollment"> | Date | string
    updated_at?: DateTimeFilter<"BenefitEnrollment"> | Date | string
    plan?: XOR<BenefitPlanScalarRelationFilter, BenefitPlanWhereInput>
    dependents?: BenefitDependentListRelationFilter
  }, "id" | "employee_id_plan_id">

  export type BenefitEnrollmentOrderByWithAggregationInput = {
    id?: SortOrder
    employee_id?: SortOrder
    plan_id?: SortOrder
    coverage_level?: SortOrder
    status?: SortOrder
    enrolled_at?: SortOrder
    effective_date?: SortOrder
    end_date?: SortOrderInput | SortOrder
    cancelled_at?: SortOrderInput | SortOrder
    cancellation_reason?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: BenefitEnrollmentCountOrderByAggregateInput
    _max?: BenefitEnrollmentMaxOrderByAggregateInput
    _min?: BenefitEnrollmentMinOrderByAggregateInput
  }

  export type BenefitEnrollmentScalarWhereWithAggregatesInput = {
    AND?: BenefitEnrollmentScalarWhereWithAggregatesInput | BenefitEnrollmentScalarWhereWithAggregatesInput[]
    OR?: BenefitEnrollmentScalarWhereWithAggregatesInput[]
    NOT?: BenefitEnrollmentScalarWhereWithAggregatesInput | BenefitEnrollmentScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"BenefitEnrollment"> | string
    employee_id?: StringWithAggregatesFilter<"BenefitEnrollment"> | string
    plan_id?: StringWithAggregatesFilter<"BenefitEnrollment"> | string
    coverage_level?: StringWithAggregatesFilter<"BenefitEnrollment"> | string
    status?: StringWithAggregatesFilter<"BenefitEnrollment"> | string
    enrolled_at?: DateTimeWithAggregatesFilter<"BenefitEnrollment"> | Date | string
    effective_date?: DateTimeWithAggregatesFilter<"BenefitEnrollment"> | Date | string
    end_date?: DateTimeNullableWithAggregatesFilter<"BenefitEnrollment"> | Date | string | null
    cancelled_at?: DateTimeNullableWithAggregatesFilter<"BenefitEnrollment"> | Date | string | null
    cancellation_reason?: StringNullableWithAggregatesFilter<"BenefitEnrollment"> | string | null
    created_at?: DateTimeWithAggregatesFilter<"BenefitEnrollment"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"BenefitEnrollment"> | Date | string
  }

  export type BenefitDependentWhereInput = {
    AND?: BenefitDependentWhereInput | BenefitDependentWhereInput[]
    OR?: BenefitDependentWhereInput[]
    NOT?: BenefitDependentWhereInput | BenefitDependentWhereInput[]
    id?: StringFilter<"BenefitDependent"> | string
    enrollment_id?: StringFilter<"BenefitDependent"> | string
    name?: StringFilter<"BenefitDependent"> | string
    relationship?: StringFilter<"BenefitDependent"> | string
    date_of_birth?: DateTimeNullableFilter<"BenefitDependent"> | Date | string | null
    national_id?: StringNullableFilter<"BenefitDependent"> | string | null
    is_active?: BoolFilter<"BenefitDependent"> | boolean
    created_at?: DateTimeFilter<"BenefitDependent"> | Date | string
    updated_at?: DateTimeFilter<"BenefitDependent"> | Date | string
    enrollment?: XOR<BenefitEnrollmentScalarRelationFilter, BenefitEnrollmentWhereInput>
  }

  export type BenefitDependentOrderByWithRelationInput = {
    id?: SortOrder
    enrollment_id?: SortOrder
    name?: SortOrder
    relationship?: SortOrder
    date_of_birth?: SortOrderInput | SortOrder
    national_id?: SortOrderInput | SortOrder
    is_active?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    enrollment?: BenefitEnrollmentOrderByWithRelationInput
  }

  export type BenefitDependentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: BenefitDependentWhereInput | BenefitDependentWhereInput[]
    OR?: BenefitDependentWhereInput[]
    NOT?: BenefitDependentWhereInput | BenefitDependentWhereInput[]
    enrollment_id?: StringFilter<"BenefitDependent"> | string
    name?: StringFilter<"BenefitDependent"> | string
    relationship?: StringFilter<"BenefitDependent"> | string
    date_of_birth?: DateTimeNullableFilter<"BenefitDependent"> | Date | string | null
    national_id?: StringNullableFilter<"BenefitDependent"> | string | null
    is_active?: BoolFilter<"BenefitDependent"> | boolean
    created_at?: DateTimeFilter<"BenefitDependent"> | Date | string
    updated_at?: DateTimeFilter<"BenefitDependent"> | Date | string
    enrollment?: XOR<BenefitEnrollmentScalarRelationFilter, BenefitEnrollmentWhereInput>
  }, "id">

  export type BenefitDependentOrderByWithAggregationInput = {
    id?: SortOrder
    enrollment_id?: SortOrder
    name?: SortOrder
    relationship?: SortOrder
    date_of_birth?: SortOrderInput | SortOrder
    national_id?: SortOrderInput | SortOrder
    is_active?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: BenefitDependentCountOrderByAggregateInput
    _max?: BenefitDependentMaxOrderByAggregateInput
    _min?: BenefitDependentMinOrderByAggregateInput
  }

  export type BenefitDependentScalarWhereWithAggregatesInput = {
    AND?: BenefitDependentScalarWhereWithAggregatesInput | BenefitDependentScalarWhereWithAggregatesInput[]
    OR?: BenefitDependentScalarWhereWithAggregatesInput[]
    NOT?: BenefitDependentScalarWhereWithAggregatesInput | BenefitDependentScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"BenefitDependent"> | string
    enrollment_id?: StringWithAggregatesFilter<"BenefitDependent"> | string
    name?: StringWithAggregatesFilter<"BenefitDependent"> | string
    relationship?: StringWithAggregatesFilter<"BenefitDependent"> | string
    date_of_birth?: DateTimeNullableWithAggregatesFilter<"BenefitDependent"> | Date | string | null
    national_id?: StringNullableWithAggregatesFilter<"BenefitDependent"> | string | null
    is_active?: BoolWithAggregatesFilter<"BenefitDependent"> | boolean
    created_at?: DateTimeWithAggregatesFilter<"BenefitDependent"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"BenefitDependent"> | Date | string
  }

  export type BenefitClaimWhereInput = {
    AND?: BenefitClaimWhereInput | BenefitClaimWhereInput[]
    OR?: BenefitClaimWhereInput[]
    NOT?: BenefitClaimWhereInput | BenefitClaimWhereInput[]
    id?: StringFilter<"BenefitClaim"> | string
    employee_id?: StringFilter<"BenefitClaim"> | string
    plan_id?: StringFilter<"BenefitClaim"> | string
    claim_type?: StringFilter<"BenefitClaim"> | string
    amount?: FloatFilter<"BenefitClaim"> | number
    description?: StringNullableFilter<"BenefitClaim"> | string | null
    receipt_date?: DateTimeFilter<"BenefitClaim"> | Date | string
    status?: StringFilter<"BenefitClaim"> | string
    submitted_at?: DateTimeFilter<"BenefitClaim"> | Date | string
    reviewed_at?: DateTimeNullableFilter<"BenefitClaim"> | Date | string | null
    reviewed_by?: StringNullableFilter<"BenefitClaim"> | string | null
    rejection_reason?: StringNullableFilter<"BenefitClaim"> | string | null
    paid_at?: DateTimeNullableFilter<"BenefitClaim"> | Date | string | null
    paid_amount?: FloatNullableFilter<"BenefitClaim"> | number | null
    created_at?: DateTimeFilter<"BenefitClaim"> | Date | string
    updated_at?: DateTimeFilter<"BenefitClaim"> | Date | string
  }

  export type BenefitClaimOrderByWithRelationInput = {
    id?: SortOrder
    employee_id?: SortOrder
    plan_id?: SortOrder
    claim_type?: SortOrder
    amount?: SortOrder
    description?: SortOrderInput | SortOrder
    receipt_date?: SortOrder
    status?: SortOrder
    submitted_at?: SortOrder
    reviewed_at?: SortOrderInput | SortOrder
    reviewed_by?: SortOrderInput | SortOrder
    rejection_reason?: SortOrderInput | SortOrder
    paid_at?: SortOrderInput | SortOrder
    paid_amount?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type BenefitClaimWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: BenefitClaimWhereInput | BenefitClaimWhereInput[]
    OR?: BenefitClaimWhereInput[]
    NOT?: BenefitClaimWhereInput | BenefitClaimWhereInput[]
    employee_id?: StringFilter<"BenefitClaim"> | string
    plan_id?: StringFilter<"BenefitClaim"> | string
    claim_type?: StringFilter<"BenefitClaim"> | string
    amount?: FloatFilter<"BenefitClaim"> | number
    description?: StringNullableFilter<"BenefitClaim"> | string | null
    receipt_date?: DateTimeFilter<"BenefitClaim"> | Date | string
    status?: StringFilter<"BenefitClaim"> | string
    submitted_at?: DateTimeFilter<"BenefitClaim"> | Date | string
    reviewed_at?: DateTimeNullableFilter<"BenefitClaim"> | Date | string | null
    reviewed_by?: StringNullableFilter<"BenefitClaim"> | string | null
    rejection_reason?: StringNullableFilter<"BenefitClaim"> | string | null
    paid_at?: DateTimeNullableFilter<"BenefitClaim"> | Date | string | null
    paid_amount?: FloatNullableFilter<"BenefitClaim"> | number | null
    created_at?: DateTimeFilter<"BenefitClaim"> | Date | string
    updated_at?: DateTimeFilter<"BenefitClaim"> | Date | string
  }, "id">

  export type BenefitClaimOrderByWithAggregationInput = {
    id?: SortOrder
    employee_id?: SortOrder
    plan_id?: SortOrder
    claim_type?: SortOrder
    amount?: SortOrder
    description?: SortOrderInput | SortOrder
    receipt_date?: SortOrder
    status?: SortOrder
    submitted_at?: SortOrder
    reviewed_at?: SortOrderInput | SortOrder
    reviewed_by?: SortOrderInput | SortOrder
    rejection_reason?: SortOrderInput | SortOrder
    paid_at?: SortOrderInput | SortOrder
    paid_amount?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: BenefitClaimCountOrderByAggregateInput
    _avg?: BenefitClaimAvgOrderByAggregateInput
    _max?: BenefitClaimMaxOrderByAggregateInput
    _min?: BenefitClaimMinOrderByAggregateInput
    _sum?: BenefitClaimSumOrderByAggregateInput
  }

  export type BenefitClaimScalarWhereWithAggregatesInput = {
    AND?: BenefitClaimScalarWhereWithAggregatesInput | BenefitClaimScalarWhereWithAggregatesInput[]
    OR?: BenefitClaimScalarWhereWithAggregatesInput[]
    NOT?: BenefitClaimScalarWhereWithAggregatesInput | BenefitClaimScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"BenefitClaim"> | string
    employee_id?: StringWithAggregatesFilter<"BenefitClaim"> | string
    plan_id?: StringWithAggregatesFilter<"BenefitClaim"> | string
    claim_type?: StringWithAggregatesFilter<"BenefitClaim"> | string
    amount?: FloatWithAggregatesFilter<"BenefitClaim"> | number
    description?: StringNullableWithAggregatesFilter<"BenefitClaim"> | string | null
    receipt_date?: DateTimeWithAggregatesFilter<"BenefitClaim"> | Date | string
    status?: StringWithAggregatesFilter<"BenefitClaim"> | string
    submitted_at?: DateTimeWithAggregatesFilter<"BenefitClaim"> | Date | string
    reviewed_at?: DateTimeNullableWithAggregatesFilter<"BenefitClaim"> | Date | string | null
    reviewed_by?: StringNullableWithAggregatesFilter<"BenefitClaim"> | string | null
    rejection_reason?: StringNullableWithAggregatesFilter<"BenefitClaim"> | string | null
    paid_at?: DateTimeNullableWithAggregatesFilter<"BenefitClaim"> | Date | string | null
    paid_amount?: FloatNullableWithAggregatesFilter<"BenefitClaim"> | number | null
    created_at?: DateTimeWithAggregatesFilter<"BenefitClaim"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"BenefitClaim"> | Date | string
  }

  export type ClaimRequestWhereInput = {
    AND?: ClaimRequestWhereInput | ClaimRequestWhereInput[]
    OR?: ClaimRequestWhereInput[]
    NOT?: ClaimRequestWhereInput | ClaimRequestWhereInput[]
    id?: StringFilter<"ClaimRequest"> | string
    employee_id?: StringFilter<"ClaimRequest"> | string
    receipt_id?: StringNullableFilter<"ClaimRequest"> | string | null
    category?: StringFilter<"ClaimRequest"> | string
    amount?: DecimalFilter<"ClaimRequest"> | Decimal | DecimalJsLike | number | string
    currency?: StringFilter<"ClaimRequest"> | string
    description?: StringNullableFilter<"ClaimRequest"> | string | null
    status?: StringFilter<"ClaimRequest"> | string
    auto_approved?: BoolFilter<"ClaimRequest"> | boolean
    approved_by?: StringNullableFilter<"ClaimRequest"> | string | null
    approved_at?: DateTimeNullableFilter<"ClaimRequest"> | Date | string | null
    rejected_by?: StringNullableFilter<"ClaimRequest"> | string | null
    rejected_reason?: StringNullableFilter<"ClaimRequest"> | string | null
    submitted_at?: DateTimeNullableFilter<"ClaimRequest"> | Date | string | null
    ocr_result_id?: StringNullableFilter<"ClaimRequest"> | string | null
    requires_finance_approval?: BoolFilter<"ClaimRequest"> | boolean
    created_at?: DateTimeFilter<"ClaimRequest"> | Date | string
    updated_at?: DateTimeFilter<"ClaimRequest"> | Date | string
    ocr_result?: XOR<OCRResultNullableScalarRelationFilter, OCRResultWhereInput> | null
    policy_checks?: PolicyCheckListRelationFilter
  }

  export type ClaimRequestOrderByWithRelationInput = {
    id?: SortOrder
    employee_id?: SortOrder
    receipt_id?: SortOrderInput | SortOrder
    category?: SortOrder
    amount?: SortOrder
    currency?: SortOrder
    description?: SortOrderInput | SortOrder
    status?: SortOrder
    auto_approved?: SortOrder
    approved_by?: SortOrderInput | SortOrder
    approved_at?: SortOrderInput | SortOrder
    rejected_by?: SortOrderInput | SortOrder
    rejected_reason?: SortOrderInput | SortOrder
    submitted_at?: SortOrderInput | SortOrder
    ocr_result_id?: SortOrderInput | SortOrder
    requires_finance_approval?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    ocr_result?: OCRResultOrderByWithRelationInput
    policy_checks?: PolicyCheckOrderByRelationAggregateInput
  }

  export type ClaimRequestWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ClaimRequestWhereInput | ClaimRequestWhereInput[]
    OR?: ClaimRequestWhereInput[]
    NOT?: ClaimRequestWhereInput | ClaimRequestWhereInput[]
    employee_id?: StringFilter<"ClaimRequest"> | string
    receipt_id?: StringNullableFilter<"ClaimRequest"> | string | null
    category?: StringFilter<"ClaimRequest"> | string
    amount?: DecimalFilter<"ClaimRequest"> | Decimal | DecimalJsLike | number | string
    currency?: StringFilter<"ClaimRequest"> | string
    description?: StringNullableFilter<"ClaimRequest"> | string | null
    status?: StringFilter<"ClaimRequest"> | string
    auto_approved?: BoolFilter<"ClaimRequest"> | boolean
    approved_by?: StringNullableFilter<"ClaimRequest"> | string | null
    approved_at?: DateTimeNullableFilter<"ClaimRequest"> | Date | string | null
    rejected_by?: StringNullableFilter<"ClaimRequest"> | string | null
    rejected_reason?: StringNullableFilter<"ClaimRequest"> | string | null
    submitted_at?: DateTimeNullableFilter<"ClaimRequest"> | Date | string | null
    ocr_result_id?: StringNullableFilter<"ClaimRequest"> | string | null
    requires_finance_approval?: BoolFilter<"ClaimRequest"> | boolean
    created_at?: DateTimeFilter<"ClaimRequest"> | Date | string
    updated_at?: DateTimeFilter<"ClaimRequest"> | Date | string
    ocr_result?: XOR<OCRResultNullableScalarRelationFilter, OCRResultWhereInput> | null
    policy_checks?: PolicyCheckListRelationFilter
  }, "id">

  export type ClaimRequestOrderByWithAggregationInput = {
    id?: SortOrder
    employee_id?: SortOrder
    receipt_id?: SortOrderInput | SortOrder
    category?: SortOrder
    amount?: SortOrder
    currency?: SortOrder
    description?: SortOrderInput | SortOrder
    status?: SortOrder
    auto_approved?: SortOrder
    approved_by?: SortOrderInput | SortOrder
    approved_at?: SortOrderInput | SortOrder
    rejected_by?: SortOrderInput | SortOrder
    rejected_reason?: SortOrderInput | SortOrder
    submitted_at?: SortOrderInput | SortOrder
    ocr_result_id?: SortOrderInput | SortOrder
    requires_finance_approval?: SortOrder
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
    receipt_id?: StringNullableWithAggregatesFilter<"ClaimRequest"> | string | null
    category?: StringWithAggregatesFilter<"ClaimRequest"> | string
    amount?: DecimalWithAggregatesFilter<"ClaimRequest"> | Decimal | DecimalJsLike | number | string
    currency?: StringWithAggregatesFilter<"ClaimRequest"> | string
    description?: StringNullableWithAggregatesFilter<"ClaimRequest"> | string | null
    status?: StringWithAggregatesFilter<"ClaimRequest"> | string
    auto_approved?: BoolWithAggregatesFilter<"ClaimRequest"> | boolean
    approved_by?: StringNullableWithAggregatesFilter<"ClaimRequest"> | string | null
    approved_at?: DateTimeNullableWithAggregatesFilter<"ClaimRequest"> | Date | string | null
    rejected_by?: StringNullableWithAggregatesFilter<"ClaimRequest"> | string | null
    rejected_reason?: StringNullableWithAggregatesFilter<"ClaimRequest"> | string | null
    submitted_at?: DateTimeNullableWithAggregatesFilter<"ClaimRequest"> | Date | string | null
    ocr_result_id?: StringNullableWithAggregatesFilter<"ClaimRequest"> | string | null
    requires_finance_approval?: BoolWithAggregatesFilter<"ClaimRequest"> | boolean
    created_at?: DateTimeWithAggregatesFilter<"ClaimRequest"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"ClaimRequest"> | Date | string
  }

  export type OCRResultWhereInput = {
    AND?: OCRResultWhereInput | OCRResultWhereInput[]
    OR?: OCRResultWhereInput[]
    NOT?: OCRResultWhereInput | OCRResultWhereInput[]
    id?: StringFilter<"OCRResult"> | string
    receipt_file_name?: StringFilter<"OCRResult"> | string
    receipt_file_type?: StringFilter<"OCRResult"> | string
    receipt_file_size?: IntFilter<"OCRResult"> | number
    vendor_name?: StringNullableFilter<"OCRResult"> | string | null
    amount?: DecimalNullableFilter<"OCRResult"> | Decimal | DecimalJsLike | number | string | null
    receipt_date?: DateTimeNullableFilter<"OCRResult"> | Date | string | null
    category?: StringNullableFilter<"OCRResult"> | string | null
    confidence_score?: FloatFilter<"OCRResult"> | number
    raw_text?: StringNullableFilter<"OCRResult"> | string | null
    processed_at?: DateTimeFilter<"OCRResult"> | Date | string
    claims?: ClaimRequestListRelationFilter
  }

  export type OCRResultOrderByWithRelationInput = {
    id?: SortOrder
    receipt_file_name?: SortOrder
    receipt_file_type?: SortOrder
    receipt_file_size?: SortOrder
    vendor_name?: SortOrderInput | SortOrder
    amount?: SortOrderInput | SortOrder
    receipt_date?: SortOrderInput | SortOrder
    category?: SortOrderInput | SortOrder
    confidence_score?: SortOrder
    raw_text?: SortOrderInput | SortOrder
    processed_at?: SortOrder
    claims?: ClaimRequestOrderByRelationAggregateInput
  }

  export type OCRResultWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: OCRResultWhereInput | OCRResultWhereInput[]
    OR?: OCRResultWhereInput[]
    NOT?: OCRResultWhereInput | OCRResultWhereInput[]
    receipt_file_name?: StringFilter<"OCRResult"> | string
    receipt_file_type?: StringFilter<"OCRResult"> | string
    receipt_file_size?: IntFilter<"OCRResult"> | number
    vendor_name?: StringNullableFilter<"OCRResult"> | string | null
    amount?: DecimalNullableFilter<"OCRResult"> | Decimal | DecimalJsLike | number | string | null
    receipt_date?: DateTimeNullableFilter<"OCRResult"> | Date | string | null
    category?: StringNullableFilter<"OCRResult"> | string | null
    confidence_score?: FloatFilter<"OCRResult"> | number
    raw_text?: StringNullableFilter<"OCRResult"> | string | null
    processed_at?: DateTimeFilter<"OCRResult"> | Date | string
    claims?: ClaimRequestListRelationFilter
  }, "id">

  export type OCRResultOrderByWithAggregationInput = {
    id?: SortOrder
    receipt_file_name?: SortOrder
    receipt_file_type?: SortOrder
    receipt_file_size?: SortOrder
    vendor_name?: SortOrderInput | SortOrder
    amount?: SortOrderInput | SortOrder
    receipt_date?: SortOrderInput | SortOrder
    category?: SortOrderInput | SortOrder
    confidence_score?: SortOrder
    raw_text?: SortOrderInput | SortOrder
    processed_at?: SortOrder
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
    receipt_file_name?: StringWithAggregatesFilter<"OCRResult"> | string
    receipt_file_type?: StringWithAggregatesFilter<"OCRResult"> | string
    receipt_file_size?: IntWithAggregatesFilter<"OCRResult"> | number
    vendor_name?: StringNullableWithAggregatesFilter<"OCRResult"> | string | null
    amount?: DecimalNullableWithAggregatesFilter<"OCRResult"> | Decimal | DecimalJsLike | number | string | null
    receipt_date?: DateTimeNullableWithAggregatesFilter<"OCRResult"> | Date | string | null
    category?: StringNullableWithAggregatesFilter<"OCRResult"> | string | null
    confidence_score?: FloatWithAggregatesFilter<"OCRResult"> | number
    raw_text?: StringNullableWithAggregatesFilter<"OCRResult"> | string | null
    processed_at?: DateTimeWithAggregatesFilter<"OCRResult"> | Date | string
  }

  export type PolicyRuleWhereInput = {
    AND?: PolicyRuleWhereInput | PolicyRuleWhereInput[]
    OR?: PolicyRuleWhereInput[]
    NOT?: PolicyRuleWhereInput | PolicyRuleWhereInput[]
    id?: StringFilter<"PolicyRule"> | string
    name?: StringFilter<"PolicyRule"> | string
    description?: StringNullableFilter<"PolicyRule"> | string | null
    rule_type?: StringFilter<"PolicyRule"> | string
    category?: StringNullableFilter<"PolicyRule"> | string | null
    condition_field?: StringFilter<"PolicyRule"> | string
    condition_value?: StringFilter<"PolicyRule"> | string
    is_active?: BoolFilter<"PolicyRule"> | boolean
    created_by?: StringFilter<"PolicyRule"> | string
    created_at?: DateTimeFilter<"PolicyRule"> | Date | string
    updated_at?: DateTimeFilter<"PolicyRule"> | Date | string
  }

  export type PolicyRuleOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    rule_type?: SortOrder
    category?: SortOrderInput | SortOrder
    condition_field?: SortOrder
    condition_value?: SortOrder
    is_active?: SortOrder
    created_by?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type PolicyRuleWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: PolicyRuleWhereInput | PolicyRuleWhereInput[]
    OR?: PolicyRuleWhereInput[]
    NOT?: PolicyRuleWhereInput | PolicyRuleWhereInput[]
    name?: StringFilter<"PolicyRule"> | string
    description?: StringNullableFilter<"PolicyRule"> | string | null
    rule_type?: StringFilter<"PolicyRule"> | string
    category?: StringNullableFilter<"PolicyRule"> | string | null
    condition_field?: StringFilter<"PolicyRule"> | string
    condition_value?: StringFilter<"PolicyRule"> | string
    is_active?: BoolFilter<"PolicyRule"> | boolean
    created_by?: StringFilter<"PolicyRule"> | string
    created_at?: DateTimeFilter<"PolicyRule"> | Date | string
    updated_at?: DateTimeFilter<"PolicyRule"> | Date | string
  }, "id">

  export type PolicyRuleOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    rule_type?: SortOrder
    category?: SortOrderInput | SortOrder
    condition_field?: SortOrder
    condition_value?: SortOrder
    is_active?: SortOrder
    created_by?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: PolicyRuleCountOrderByAggregateInput
    _max?: PolicyRuleMaxOrderByAggregateInput
    _min?: PolicyRuleMinOrderByAggregateInput
  }

  export type PolicyRuleScalarWhereWithAggregatesInput = {
    AND?: PolicyRuleScalarWhereWithAggregatesInput | PolicyRuleScalarWhereWithAggregatesInput[]
    OR?: PolicyRuleScalarWhereWithAggregatesInput[]
    NOT?: PolicyRuleScalarWhereWithAggregatesInput | PolicyRuleScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"PolicyRule"> | string
    name?: StringWithAggregatesFilter<"PolicyRule"> | string
    description?: StringNullableWithAggregatesFilter<"PolicyRule"> | string | null
    rule_type?: StringWithAggregatesFilter<"PolicyRule"> | string
    category?: StringNullableWithAggregatesFilter<"PolicyRule"> | string | null
    condition_field?: StringWithAggregatesFilter<"PolicyRule"> | string
    condition_value?: StringWithAggregatesFilter<"PolicyRule"> | string
    is_active?: BoolWithAggregatesFilter<"PolicyRule"> | boolean
    created_by?: StringWithAggregatesFilter<"PolicyRule"> | string
    created_at?: DateTimeWithAggregatesFilter<"PolicyRule"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"PolicyRule"> | Date | string
  }

  export type PolicyCheckWhereInput = {
    AND?: PolicyCheckWhereInput | PolicyCheckWhereInput[]
    OR?: PolicyCheckWhereInput[]
    NOT?: PolicyCheckWhereInput | PolicyCheckWhereInput[]
    id?: StringFilter<"PolicyCheck"> | string
    claim_id?: StringFilter<"PolicyCheck"> | string
    rule_id?: StringFilter<"PolicyCheck"> | string
    rule_name?: StringFilter<"PolicyCheck"> | string
    passed?: BoolFilter<"PolicyCheck"> | boolean
    message?: StringNullableFilter<"PolicyCheck"> | string | null
    checked_at?: DateTimeFilter<"PolicyCheck"> | Date | string
    claim?: XOR<ClaimRequestScalarRelationFilter, ClaimRequestWhereInput>
  }

  export type PolicyCheckOrderByWithRelationInput = {
    id?: SortOrder
    claim_id?: SortOrder
    rule_id?: SortOrder
    rule_name?: SortOrder
    passed?: SortOrder
    message?: SortOrderInput | SortOrder
    checked_at?: SortOrder
    claim?: ClaimRequestOrderByWithRelationInput
  }

  export type PolicyCheckWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: PolicyCheckWhereInput | PolicyCheckWhereInput[]
    OR?: PolicyCheckWhereInput[]
    NOT?: PolicyCheckWhereInput | PolicyCheckWhereInput[]
    claim_id?: StringFilter<"PolicyCheck"> | string
    rule_id?: StringFilter<"PolicyCheck"> | string
    rule_name?: StringFilter<"PolicyCheck"> | string
    passed?: BoolFilter<"PolicyCheck"> | boolean
    message?: StringNullableFilter<"PolicyCheck"> | string | null
    checked_at?: DateTimeFilter<"PolicyCheck"> | Date | string
    claim?: XOR<ClaimRequestScalarRelationFilter, ClaimRequestWhereInput>
  }, "id">

  export type PolicyCheckOrderByWithAggregationInput = {
    id?: SortOrder
    claim_id?: SortOrder
    rule_id?: SortOrder
    rule_name?: SortOrder
    passed?: SortOrder
    message?: SortOrderInput | SortOrder
    checked_at?: SortOrder
    _count?: PolicyCheckCountOrderByAggregateInput
    _max?: PolicyCheckMaxOrderByAggregateInput
    _min?: PolicyCheckMinOrderByAggregateInput
  }

  export type PolicyCheckScalarWhereWithAggregatesInput = {
    AND?: PolicyCheckScalarWhereWithAggregatesInput | PolicyCheckScalarWhereWithAggregatesInput[]
    OR?: PolicyCheckScalarWhereWithAggregatesInput[]
    NOT?: PolicyCheckScalarWhereWithAggregatesInput | PolicyCheckScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"PolicyCheck"> | string
    claim_id?: StringWithAggregatesFilter<"PolicyCheck"> | string
    rule_id?: StringWithAggregatesFilter<"PolicyCheck"> | string
    rule_name?: StringWithAggregatesFilter<"PolicyCheck"> | string
    passed?: BoolWithAggregatesFilter<"PolicyCheck"> | boolean
    message?: StringNullableWithAggregatesFilter<"PolicyCheck"> | string | null
    checked_at?: DateTimeWithAggregatesFilter<"PolicyCheck"> | Date | string
  }

  export type HospitalReferralWhereInput = {
    AND?: HospitalReferralWhereInput | HospitalReferralWhereInput[]
    OR?: HospitalReferralWhereInput[]
    NOT?: HospitalReferralWhereInput | HospitalReferralWhereInput[]
    id?: StringFilter<"HospitalReferral"> | string
    employee_id?: StringFilter<"HospitalReferral"> | string
    employee_name?: StringFilter<"HospitalReferral"> | string
    hospital_name?: StringFilter<"HospitalReferral"> | string
    hospital_branch?: StringNullableFilter<"HospitalReferral"> | string | null
    reason?: StringFilter<"HospitalReferral"> | string
    preferred_date?: DateTimeFilter<"HospitalReferral"> | Date | string
    valid_from?: DateTimeNullableFilter<"HospitalReferral"> | Date | string | null
    valid_until?: DateTimeNullableFilter<"HospitalReferral"> | Date | string | null
    status?: StringFilter<"HospitalReferral"> | string
    workflow_id?: StringNullableFilter<"HospitalReferral"> | string | null
    referral_number?: StringNullableFilter<"HospitalReferral"> | string | null
    approved_by?: StringNullableFilter<"HospitalReferral"> | string | null
    approved_at?: DateTimeNullableFilter<"HospitalReferral"> | Date | string | null
    issued_by?: StringNullableFilter<"HospitalReferral"> | string | null
    issued_at?: DateTimeNullableFilter<"HospitalReferral"> | Date | string | null
    rejected_by?: StringNullableFilter<"HospitalReferral"> | string | null
    rejected_reason?: StringNullableFilter<"HospitalReferral"> | string | null
    notes?: StringNullableFilter<"HospitalReferral"> | string | null
    created_at?: DateTimeFilter<"HospitalReferral"> | Date | string
    updated_at?: DateTimeFilter<"HospitalReferral"> | Date | string
  }

  export type HospitalReferralOrderByWithRelationInput = {
    id?: SortOrder
    employee_id?: SortOrder
    employee_name?: SortOrder
    hospital_name?: SortOrder
    hospital_branch?: SortOrderInput | SortOrder
    reason?: SortOrder
    preferred_date?: SortOrder
    valid_from?: SortOrderInput | SortOrder
    valid_until?: SortOrderInput | SortOrder
    status?: SortOrder
    workflow_id?: SortOrderInput | SortOrder
    referral_number?: SortOrderInput | SortOrder
    approved_by?: SortOrderInput | SortOrder
    approved_at?: SortOrderInput | SortOrder
    issued_by?: SortOrderInput | SortOrder
    issued_at?: SortOrderInput | SortOrder
    rejected_by?: SortOrderInput | SortOrder
    rejected_reason?: SortOrderInput | SortOrder
    notes?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type HospitalReferralWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    referral_number?: string
    AND?: HospitalReferralWhereInput | HospitalReferralWhereInput[]
    OR?: HospitalReferralWhereInput[]
    NOT?: HospitalReferralWhereInput | HospitalReferralWhereInput[]
    employee_id?: StringFilter<"HospitalReferral"> | string
    employee_name?: StringFilter<"HospitalReferral"> | string
    hospital_name?: StringFilter<"HospitalReferral"> | string
    hospital_branch?: StringNullableFilter<"HospitalReferral"> | string | null
    reason?: StringFilter<"HospitalReferral"> | string
    preferred_date?: DateTimeFilter<"HospitalReferral"> | Date | string
    valid_from?: DateTimeNullableFilter<"HospitalReferral"> | Date | string | null
    valid_until?: DateTimeNullableFilter<"HospitalReferral"> | Date | string | null
    status?: StringFilter<"HospitalReferral"> | string
    workflow_id?: StringNullableFilter<"HospitalReferral"> | string | null
    approved_by?: StringNullableFilter<"HospitalReferral"> | string | null
    approved_at?: DateTimeNullableFilter<"HospitalReferral"> | Date | string | null
    issued_by?: StringNullableFilter<"HospitalReferral"> | string | null
    issued_at?: DateTimeNullableFilter<"HospitalReferral"> | Date | string | null
    rejected_by?: StringNullableFilter<"HospitalReferral"> | string | null
    rejected_reason?: StringNullableFilter<"HospitalReferral"> | string | null
    notes?: StringNullableFilter<"HospitalReferral"> | string | null
    created_at?: DateTimeFilter<"HospitalReferral"> | Date | string
    updated_at?: DateTimeFilter<"HospitalReferral"> | Date | string
  }, "id" | "referral_number">

  export type HospitalReferralOrderByWithAggregationInput = {
    id?: SortOrder
    employee_id?: SortOrder
    employee_name?: SortOrder
    hospital_name?: SortOrder
    hospital_branch?: SortOrderInput | SortOrder
    reason?: SortOrder
    preferred_date?: SortOrder
    valid_from?: SortOrderInput | SortOrder
    valid_until?: SortOrderInput | SortOrder
    status?: SortOrder
    workflow_id?: SortOrderInput | SortOrder
    referral_number?: SortOrderInput | SortOrder
    approved_by?: SortOrderInput | SortOrder
    approved_at?: SortOrderInput | SortOrder
    issued_by?: SortOrderInput | SortOrder
    issued_at?: SortOrderInput | SortOrder
    rejected_by?: SortOrderInput | SortOrder
    rejected_reason?: SortOrderInput | SortOrder
    notes?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: HospitalReferralCountOrderByAggregateInput
    _max?: HospitalReferralMaxOrderByAggregateInput
    _min?: HospitalReferralMinOrderByAggregateInput
  }

  export type HospitalReferralScalarWhereWithAggregatesInput = {
    AND?: HospitalReferralScalarWhereWithAggregatesInput | HospitalReferralScalarWhereWithAggregatesInput[]
    OR?: HospitalReferralScalarWhereWithAggregatesInput[]
    NOT?: HospitalReferralScalarWhereWithAggregatesInput | HospitalReferralScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"HospitalReferral"> | string
    employee_id?: StringWithAggregatesFilter<"HospitalReferral"> | string
    employee_name?: StringWithAggregatesFilter<"HospitalReferral"> | string
    hospital_name?: StringWithAggregatesFilter<"HospitalReferral"> | string
    hospital_branch?: StringNullableWithAggregatesFilter<"HospitalReferral"> | string | null
    reason?: StringWithAggregatesFilter<"HospitalReferral"> | string
    preferred_date?: DateTimeWithAggregatesFilter<"HospitalReferral"> | Date | string
    valid_from?: DateTimeNullableWithAggregatesFilter<"HospitalReferral"> | Date | string | null
    valid_until?: DateTimeNullableWithAggregatesFilter<"HospitalReferral"> | Date | string | null
    status?: StringWithAggregatesFilter<"HospitalReferral"> | string
    workflow_id?: StringNullableWithAggregatesFilter<"HospitalReferral"> | string | null
    referral_number?: StringNullableWithAggregatesFilter<"HospitalReferral"> | string | null
    approved_by?: StringNullableWithAggregatesFilter<"HospitalReferral"> | string | null
    approved_at?: DateTimeNullableWithAggregatesFilter<"HospitalReferral"> | Date | string | null
    issued_by?: StringNullableWithAggregatesFilter<"HospitalReferral"> | string | null
    issued_at?: DateTimeNullableWithAggregatesFilter<"HospitalReferral"> | Date | string | null
    rejected_by?: StringNullableWithAggregatesFilter<"HospitalReferral"> | string | null
    rejected_reason?: StringNullableWithAggregatesFilter<"HospitalReferral"> | string | null
    notes?: StringNullableWithAggregatesFilter<"HospitalReferral"> | string | null
    created_at?: DateTimeWithAggregatesFilter<"HospitalReferral"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"HospitalReferral"> | Date | string
  }

  export type BenefitPlanCreateInput = {
    id?: string
    code: string
    name_en: string
    name_th?: string | null
    category: string
    description_en?: string | null
    description_th?: string | null
    coverage_amount?: number | null
    employer_contribution?: number
    employee_contribution?: number
    is_active?: boolean
    effective_date: Date | string
    end_date?: Date | string | null
    created_at?: Date | string
    updated_at?: Date | string
    enrollments?: BenefitEnrollmentCreateNestedManyWithoutPlanInput
  }

  export type BenefitPlanUncheckedCreateInput = {
    id?: string
    code: string
    name_en: string
    name_th?: string | null
    category: string
    description_en?: string | null
    description_th?: string | null
    coverage_amount?: number | null
    employer_contribution?: number
    employee_contribution?: number
    is_active?: boolean
    effective_date: Date | string
    end_date?: Date | string | null
    created_at?: Date | string
    updated_at?: Date | string
    enrollments?: BenefitEnrollmentUncheckedCreateNestedManyWithoutPlanInput
  }

  export type BenefitPlanUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    name_en?: StringFieldUpdateOperationsInput | string
    name_th?: NullableStringFieldUpdateOperationsInput | string | null
    category?: StringFieldUpdateOperationsInput | string
    description_en?: NullableStringFieldUpdateOperationsInput | string | null
    description_th?: NullableStringFieldUpdateOperationsInput | string | null
    coverage_amount?: NullableFloatFieldUpdateOperationsInput | number | null
    employer_contribution?: FloatFieldUpdateOperationsInput | number
    employee_contribution?: FloatFieldUpdateOperationsInput | number
    is_active?: BoolFieldUpdateOperationsInput | boolean
    effective_date?: DateTimeFieldUpdateOperationsInput | Date | string
    end_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    enrollments?: BenefitEnrollmentUpdateManyWithoutPlanNestedInput
  }

  export type BenefitPlanUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    name_en?: StringFieldUpdateOperationsInput | string
    name_th?: NullableStringFieldUpdateOperationsInput | string | null
    category?: StringFieldUpdateOperationsInput | string
    description_en?: NullableStringFieldUpdateOperationsInput | string | null
    description_th?: NullableStringFieldUpdateOperationsInput | string | null
    coverage_amount?: NullableFloatFieldUpdateOperationsInput | number | null
    employer_contribution?: FloatFieldUpdateOperationsInput | number
    employee_contribution?: FloatFieldUpdateOperationsInput | number
    is_active?: BoolFieldUpdateOperationsInput | boolean
    effective_date?: DateTimeFieldUpdateOperationsInput | Date | string
    end_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    enrollments?: BenefitEnrollmentUncheckedUpdateManyWithoutPlanNestedInput
  }

  export type BenefitPlanCreateManyInput = {
    id?: string
    code: string
    name_en: string
    name_th?: string | null
    category: string
    description_en?: string | null
    description_th?: string | null
    coverage_amount?: number | null
    employer_contribution?: number
    employee_contribution?: number
    is_active?: boolean
    effective_date: Date | string
    end_date?: Date | string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type BenefitPlanUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    name_en?: StringFieldUpdateOperationsInput | string
    name_th?: NullableStringFieldUpdateOperationsInput | string | null
    category?: StringFieldUpdateOperationsInput | string
    description_en?: NullableStringFieldUpdateOperationsInput | string | null
    description_th?: NullableStringFieldUpdateOperationsInput | string | null
    coverage_amount?: NullableFloatFieldUpdateOperationsInput | number | null
    employer_contribution?: FloatFieldUpdateOperationsInput | number
    employee_contribution?: FloatFieldUpdateOperationsInput | number
    is_active?: BoolFieldUpdateOperationsInput | boolean
    effective_date?: DateTimeFieldUpdateOperationsInput | Date | string
    end_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BenefitPlanUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    name_en?: StringFieldUpdateOperationsInput | string
    name_th?: NullableStringFieldUpdateOperationsInput | string | null
    category?: StringFieldUpdateOperationsInput | string
    description_en?: NullableStringFieldUpdateOperationsInput | string | null
    description_th?: NullableStringFieldUpdateOperationsInput | string | null
    coverage_amount?: NullableFloatFieldUpdateOperationsInput | number | null
    employer_contribution?: FloatFieldUpdateOperationsInput | number
    employee_contribution?: FloatFieldUpdateOperationsInput | number
    is_active?: BoolFieldUpdateOperationsInput | boolean
    effective_date?: DateTimeFieldUpdateOperationsInput | Date | string
    end_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BenefitEnrollmentCreateInput = {
    id?: string
    employee_id: string
    coverage_level: string
    status?: string
    enrolled_at?: Date | string
    effective_date: Date | string
    end_date?: Date | string | null
    cancelled_at?: Date | string | null
    cancellation_reason?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    plan: BenefitPlanCreateNestedOneWithoutEnrollmentsInput
    dependents?: BenefitDependentCreateNestedManyWithoutEnrollmentInput
  }

  export type BenefitEnrollmentUncheckedCreateInput = {
    id?: string
    employee_id: string
    plan_id: string
    coverage_level: string
    status?: string
    enrolled_at?: Date | string
    effective_date: Date | string
    end_date?: Date | string | null
    cancelled_at?: Date | string | null
    cancellation_reason?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    dependents?: BenefitDependentUncheckedCreateNestedManyWithoutEnrollmentInput
  }

  export type BenefitEnrollmentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    employee_id?: StringFieldUpdateOperationsInput | string
    coverage_level?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    enrolled_at?: DateTimeFieldUpdateOperationsInput | Date | string
    effective_date?: DateTimeFieldUpdateOperationsInput | Date | string
    end_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cancelled_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cancellation_reason?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    plan?: BenefitPlanUpdateOneRequiredWithoutEnrollmentsNestedInput
    dependents?: BenefitDependentUpdateManyWithoutEnrollmentNestedInput
  }

  export type BenefitEnrollmentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    employee_id?: StringFieldUpdateOperationsInput | string
    plan_id?: StringFieldUpdateOperationsInput | string
    coverage_level?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    enrolled_at?: DateTimeFieldUpdateOperationsInput | Date | string
    effective_date?: DateTimeFieldUpdateOperationsInput | Date | string
    end_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cancelled_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cancellation_reason?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    dependents?: BenefitDependentUncheckedUpdateManyWithoutEnrollmentNestedInput
  }

  export type BenefitEnrollmentCreateManyInput = {
    id?: string
    employee_id: string
    plan_id: string
    coverage_level: string
    status?: string
    enrolled_at?: Date | string
    effective_date: Date | string
    end_date?: Date | string | null
    cancelled_at?: Date | string | null
    cancellation_reason?: string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type BenefitEnrollmentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    employee_id?: StringFieldUpdateOperationsInput | string
    coverage_level?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    enrolled_at?: DateTimeFieldUpdateOperationsInput | Date | string
    effective_date?: DateTimeFieldUpdateOperationsInput | Date | string
    end_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cancelled_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cancellation_reason?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BenefitEnrollmentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    employee_id?: StringFieldUpdateOperationsInput | string
    plan_id?: StringFieldUpdateOperationsInput | string
    coverage_level?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    enrolled_at?: DateTimeFieldUpdateOperationsInput | Date | string
    effective_date?: DateTimeFieldUpdateOperationsInput | Date | string
    end_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cancelled_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cancellation_reason?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BenefitDependentCreateInput = {
    id?: string
    name: string
    relationship: string
    date_of_birth?: Date | string | null
    national_id?: string | null
    is_active?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    enrollment: BenefitEnrollmentCreateNestedOneWithoutDependentsInput
  }

  export type BenefitDependentUncheckedCreateInput = {
    id?: string
    enrollment_id: string
    name: string
    relationship: string
    date_of_birth?: Date | string | null
    national_id?: string | null
    is_active?: boolean
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type BenefitDependentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    relationship?: StringFieldUpdateOperationsInput | string
    date_of_birth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    national_id?: NullableStringFieldUpdateOperationsInput | string | null
    is_active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    enrollment?: BenefitEnrollmentUpdateOneRequiredWithoutDependentsNestedInput
  }

  export type BenefitDependentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    enrollment_id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    relationship?: StringFieldUpdateOperationsInput | string
    date_of_birth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    national_id?: NullableStringFieldUpdateOperationsInput | string | null
    is_active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BenefitDependentCreateManyInput = {
    id?: string
    enrollment_id: string
    name: string
    relationship: string
    date_of_birth?: Date | string | null
    national_id?: string | null
    is_active?: boolean
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type BenefitDependentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    relationship?: StringFieldUpdateOperationsInput | string
    date_of_birth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    national_id?: NullableStringFieldUpdateOperationsInput | string | null
    is_active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BenefitDependentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    enrollment_id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    relationship?: StringFieldUpdateOperationsInput | string
    date_of_birth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    national_id?: NullableStringFieldUpdateOperationsInput | string | null
    is_active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BenefitClaimCreateInput = {
    id?: string
    employee_id: string
    plan_id: string
    claim_type: string
    amount: number
    description?: string | null
    receipt_date: Date | string
    status?: string
    submitted_at?: Date | string
    reviewed_at?: Date | string | null
    reviewed_by?: string | null
    rejection_reason?: string | null
    paid_at?: Date | string | null
    paid_amount?: number | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type BenefitClaimUncheckedCreateInput = {
    id?: string
    employee_id: string
    plan_id: string
    claim_type: string
    amount: number
    description?: string | null
    receipt_date: Date | string
    status?: string
    submitted_at?: Date | string
    reviewed_at?: Date | string | null
    reviewed_by?: string | null
    rejection_reason?: string | null
    paid_at?: Date | string | null
    paid_amount?: number | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type BenefitClaimUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    employee_id?: StringFieldUpdateOperationsInput | string
    plan_id?: StringFieldUpdateOperationsInput | string
    claim_type?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    receipt_date?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    submitted_at?: DateTimeFieldUpdateOperationsInput | Date | string
    reviewed_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    reviewed_by?: NullableStringFieldUpdateOperationsInput | string | null
    rejection_reason?: NullableStringFieldUpdateOperationsInput | string | null
    paid_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    paid_amount?: NullableFloatFieldUpdateOperationsInput | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BenefitClaimUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    employee_id?: StringFieldUpdateOperationsInput | string
    plan_id?: StringFieldUpdateOperationsInput | string
    claim_type?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    receipt_date?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    submitted_at?: DateTimeFieldUpdateOperationsInput | Date | string
    reviewed_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    reviewed_by?: NullableStringFieldUpdateOperationsInput | string | null
    rejection_reason?: NullableStringFieldUpdateOperationsInput | string | null
    paid_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    paid_amount?: NullableFloatFieldUpdateOperationsInput | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BenefitClaimCreateManyInput = {
    id?: string
    employee_id: string
    plan_id: string
    claim_type: string
    amount: number
    description?: string | null
    receipt_date: Date | string
    status?: string
    submitted_at?: Date | string
    reviewed_at?: Date | string | null
    reviewed_by?: string | null
    rejection_reason?: string | null
    paid_at?: Date | string | null
    paid_amount?: number | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type BenefitClaimUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    employee_id?: StringFieldUpdateOperationsInput | string
    plan_id?: StringFieldUpdateOperationsInput | string
    claim_type?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    receipt_date?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    submitted_at?: DateTimeFieldUpdateOperationsInput | Date | string
    reviewed_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    reviewed_by?: NullableStringFieldUpdateOperationsInput | string | null
    rejection_reason?: NullableStringFieldUpdateOperationsInput | string | null
    paid_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    paid_amount?: NullableFloatFieldUpdateOperationsInput | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BenefitClaimUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    employee_id?: StringFieldUpdateOperationsInput | string
    plan_id?: StringFieldUpdateOperationsInput | string
    claim_type?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    receipt_date?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    submitted_at?: DateTimeFieldUpdateOperationsInput | Date | string
    reviewed_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    reviewed_by?: NullableStringFieldUpdateOperationsInput | string | null
    rejection_reason?: NullableStringFieldUpdateOperationsInput | string | null
    paid_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    paid_amount?: NullableFloatFieldUpdateOperationsInput | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClaimRequestCreateInput = {
    id?: string
    employee_id: string
    receipt_id?: string | null
    category: string
    amount: Decimal | DecimalJsLike | number | string
    currency?: string
    description?: string | null
    status?: string
    auto_approved?: boolean
    approved_by?: string | null
    approved_at?: Date | string | null
    rejected_by?: string | null
    rejected_reason?: string | null
    submitted_at?: Date | string | null
    requires_finance_approval?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    ocr_result?: OCRResultCreateNestedOneWithoutClaimsInput
    policy_checks?: PolicyCheckCreateNestedManyWithoutClaimInput
  }

  export type ClaimRequestUncheckedCreateInput = {
    id?: string
    employee_id: string
    receipt_id?: string | null
    category: string
    amount: Decimal | DecimalJsLike | number | string
    currency?: string
    description?: string | null
    status?: string
    auto_approved?: boolean
    approved_by?: string | null
    approved_at?: Date | string | null
    rejected_by?: string | null
    rejected_reason?: string | null
    submitted_at?: Date | string | null
    ocr_result_id?: string | null
    requires_finance_approval?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    policy_checks?: PolicyCheckUncheckedCreateNestedManyWithoutClaimInput
  }

  export type ClaimRequestUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    employee_id?: StringFieldUpdateOperationsInput | string
    receipt_id?: NullableStringFieldUpdateOperationsInput | string | null
    category?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    currency?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    auto_approved?: BoolFieldUpdateOperationsInput | boolean
    approved_by?: NullableStringFieldUpdateOperationsInput | string | null
    approved_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rejected_by?: NullableStringFieldUpdateOperationsInput | string | null
    rejected_reason?: NullableStringFieldUpdateOperationsInput | string | null
    submitted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    requires_finance_approval?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    ocr_result?: OCRResultUpdateOneWithoutClaimsNestedInput
    policy_checks?: PolicyCheckUpdateManyWithoutClaimNestedInput
  }

  export type ClaimRequestUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    employee_id?: StringFieldUpdateOperationsInput | string
    receipt_id?: NullableStringFieldUpdateOperationsInput | string | null
    category?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    currency?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    auto_approved?: BoolFieldUpdateOperationsInput | boolean
    approved_by?: NullableStringFieldUpdateOperationsInput | string | null
    approved_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rejected_by?: NullableStringFieldUpdateOperationsInput | string | null
    rejected_reason?: NullableStringFieldUpdateOperationsInput | string | null
    submitted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ocr_result_id?: NullableStringFieldUpdateOperationsInput | string | null
    requires_finance_approval?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    policy_checks?: PolicyCheckUncheckedUpdateManyWithoutClaimNestedInput
  }

  export type ClaimRequestCreateManyInput = {
    id?: string
    employee_id: string
    receipt_id?: string | null
    category: string
    amount: Decimal | DecimalJsLike | number | string
    currency?: string
    description?: string | null
    status?: string
    auto_approved?: boolean
    approved_by?: string | null
    approved_at?: Date | string | null
    rejected_by?: string | null
    rejected_reason?: string | null
    submitted_at?: Date | string | null
    ocr_result_id?: string | null
    requires_finance_approval?: boolean
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type ClaimRequestUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    employee_id?: StringFieldUpdateOperationsInput | string
    receipt_id?: NullableStringFieldUpdateOperationsInput | string | null
    category?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    currency?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    auto_approved?: BoolFieldUpdateOperationsInput | boolean
    approved_by?: NullableStringFieldUpdateOperationsInput | string | null
    approved_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rejected_by?: NullableStringFieldUpdateOperationsInput | string | null
    rejected_reason?: NullableStringFieldUpdateOperationsInput | string | null
    submitted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    requires_finance_approval?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClaimRequestUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    employee_id?: StringFieldUpdateOperationsInput | string
    receipt_id?: NullableStringFieldUpdateOperationsInput | string | null
    category?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    currency?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    auto_approved?: BoolFieldUpdateOperationsInput | boolean
    approved_by?: NullableStringFieldUpdateOperationsInput | string | null
    approved_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rejected_by?: NullableStringFieldUpdateOperationsInput | string | null
    rejected_reason?: NullableStringFieldUpdateOperationsInput | string | null
    submitted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ocr_result_id?: NullableStringFieldUpdateOperationsInput | string | null
    requires_finance_approval?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OCRResultCreateInput = {
    id?: string
    receipt_file_name: string
    receipt_file_type: string
    receipt_file_size: number
    vendor_name?: string | null
    amount?: Decimal | DecimalJsLike | number | string | null
    receipt_date?: Date | string | null
    category?: string | null
    confidence_score?: number
    raw_text?: string | null
    processed_at?: Date | string
    claims?: ClaimRequestCreateNestedManyWithoutOcr_resultInput
  }

  export type OCRResultUncheckedCreateInput = {
    id?: string
    receipt_file_name: string
    receipt_file_type: string
    receipt_file_size: number
    vendor_name?: string | null
    amount?: Decimal | DecimalJsLike | number | string | null
    receipt_date?: Date | string | null
    category?: string | null
    confidence_score?: number
    raw_text?: string | null
    processed_at?: Date | string
    claims?: ClaimRequestUncheckedCreateNestedManyWithoutOcr_resultInput
  }

  export type OCRResultUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    receipt_file_name?: StringFieldUpdateOperationsInput | string
    receipt_file_type?: StringFieldUpdateOperationsInput | string
    receipt_file_size?: IntFieldUpdateOperationsInput | number
    vendor_name?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    receipt_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    confidence_score?: FloatFieldUpdateOperationsInput | number
    raw_text?: NullableStringFieldUpdateOperationsInput | string | null
    processed_at?: DateTimeFieldUpdateOperationsInput | Date | string
    claims?: ClaimRequestUpdateManyWithoutOcr_resultNestedInput
  }

  export type OCRResultUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    receipt_file_name?: StringFieldUpdateOperationsInput | string
    receipt_file_type?: StringFieldUpdateOperationsInput | string
    receipt_file_size?: IntFieldUpdateOperationsInput | number
    vendor_name?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    receipt_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    confidence_score?: FloatFieldUpdateOperationsInput | number
    raw_text?: NullableStringFieldUpdateOperationsInput | string | null
    processed_at?: DateTimeFieldUpdateOperationsInput | Date | string
    claims?: ClaimRequestUncheckedUpdateManyWithoutOcr_resultNestedInput
  }

  export type OCRResultCreateManyInput = {
    id?: string
    receipt_file_name: string
    receipt_file_type: string
    receipt_file_size: number
    vendor_name?: string | null
    amount?: Decimal | DecimalJsLike | number | string | null
    receipt_date?: Date | string | null
    category?: string | null
    confidence_score?: number
    raw_text?: string | null
    processed_at?: Date | string
  }

  export type OCRResultUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    receipt_file_name?: StringFieldUpdateOperationsInput | string
    receipt_file_type?: StringFieldUpdateOperationsInput | string
    receipt_file_size?: IntFieldUpdateOperationsInput | number
    vendor_name?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    receipt_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    confidence_score?: FloatFieldUpdateOperationsInput | number
    raw_text?: NullableStringFieldUpdateOperationsInput | string | null
    processed_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OCRResultUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    receipt_file_name?: StringFieldUpdateOperationsInput | string
    receipt_file_type?: StringFieldUpdateOperationsInput | string
    receipt_file_size?: IntFieldUpdateOperationsInput | number
    vendor_name?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    receipt_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    confidence_score?: FloatFieldUpdateOperationsInput | number
    raw_text?: NullableStringFieldUpdateOperationsInput | string | null
    processed_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PolicyRuleCreateInput = {
    id?: string
    name: string
    description?: string | null
    rule_type: string
    category?: string | null
    condition_field: string
    condition_value: string
    is_active?: boolean
    created_by: string
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type PolicyRuleUncheckedCreateInput = {
    id?: string
    name: string
    description?: string | null
    rule_type: string
    category?: string | null
    condition_field: string
    condition_value: string
    is_active?: boolean
    created_by: string
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type PolicyRuleUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    rule_type?: StringFieldUpdateOperationsInput | string
    category?: NullableStringFieldUpdateOperationsInput | string | null
    condition_field?: StringFieldUpdateOperationsInput | string
    condition_value?: StringFieldUpdateOperationsInput | string
    is_active?: BoolFieldUpdateOperationsInput | boolean
    created_by?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PolicyRuleUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    rule_type?: StringFieldUpdateOperationsInput | string
    category?: NullableStringFieldUpdateOperationsInput | string | null
    condition_field?: StringFieldUpdateOperationsInput | string
    condition_value?: StringFieldUpdateOperationsInput | string
    is_active?: BoolFieldUpdateOperationsInput | boolean
    created_by?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PolicyRuleCreateManyInput = {
    id?: string
    name: string
    description?: string | null
    rule_type: string
    category?: string | null
    condition_field: string
    condition_value: string
    is_active?: boolean
    created_by: string
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type PolicyRuleUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    rule_type?: StringFieldUpdateOperationsInput | string
    category?: NullableStringFieldUpdateOperationsInput | string | null
    condition_field?: StringFieldUpdateOperationsInput | string
    condition_value?: StringFieldUpdateOperationsInput | string
    is_active?: BoolFieldUpdateOperationsInput | boolean
    created_by?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PolicyRuleUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    rule_type?: StringFieldUpdateOperationsInput | string
    category?: NullableStringFieldUpdateOperationsInput | string | null
    condition_field?: StringFieldUpdateOperationsInput | string
    condition_value?: StringFieldUpdateOperationsInput | string
    is_active?: BoolFieldUpdateOperationsInput | boolean
    created_by?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PolicyCheckCreateInput = {
    id?: string
    rule_id: string
    rule_name: string
    passed: boolean
    message?: string | null
    checked_at?: Date | string
    claim: ClaimRequestCreateNestedOneWithoutPolicy_checksInput
  }

  export type PolicyCheckUncheckedCreateInput = {
    id?: string
    claim_id: string
    rule_id: string
    rule_name: string
    passed: boolean
    message?: string | null
    checked_at?: Date | string
  }

  export type PolicyCheckUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    rule_id?: StringFieldUpdateOperationsInput | string
    rule_name?: StringFieldUpdateOperationsInput | string
    passed?: BoolFieldUpdateOperationsInput | boolean
    message?: NullableStringFieldUpdateOperationsInput | string | null
    checked_at?: DateTimeFieldUpdateOperationsInput | Date | string
    claim?: ClaimRequestUpdateOneRequiredWithoutPolicy_checksNestedInput
  }

  export type PolicyCheckUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    claim_id?: StringFieldUpdateOperationsInput | string
    rule_id?: StringFieldUpdateOperationsInput | string
    rule_name?: StringFieldUpdateOperationsInput | string
    passed?: BoolFieldUpdateOperationsInput | boolean
    message?: NullableStringFieldUpdateOperationsInput | string | null
    checked_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PolicyCheckCreateManyInput = {
    id?: string
    claim_id: string
    rule_id: string
    rule_name: string
    passed: boolean
    message?: string | null
    checked_at?: Date | string
  }

  export type PolicyCheckUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    rule_id?: StringFieldUpdateOperationsInput | string
    rule_name?: StringFieldUpdateOperationsInput | string
    passed?: BoolFieldUpdateOperationsInput | boolean
    message?: NullableStringFieldUpdateOperationsInput | string | null
    checked_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PolicyCheckUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    claim_id?: StringFieldUpdateOperationsInput | string
    rule_id?: StringFieldUpdateOperationsInput | string
    rule_name?: StringFieldUpdateOperationsInput | string
    passed?: BoolFieldUpdateOperationsInput | boolean
    message?: NullableStringFieldUpdateOperationsInput | string | null
    checked_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HospitalReferralCreateInput = {
    id?: string
    employee_id: string
    employee_name: string
    hospital_name: string
    hospital_branch?: string | null
    reason: string
    preferred_date: Date | string
    valid_from?: Date | string | null
    valid_until?: Date | string | null
    status?: string
    workflow_id?: string | null
    referral_number?: string | null
    approved_by?: string | null
    approved_at?: Date | string | null
    issued_by?: string | null
    issued_at?: Date | string | null
    rejected_by?: string | null
    rejected_reason?: string | null
    notes?: string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type HospitalReferralUncheckedCreateInput = {
    id?: string
    employee_id: string
    employee_name: string
    hospital_name: string
    hospital_branch?: string | null
    reason: string
    preferred_date: Date | string
    valid_from?: Date | string | null
    valid_until?: Date | string | null
    status?: string
    workflow_id?: string | null
    referral_number?: string | null
    approved_by?: string | null
    approved_at?: Date | string | null
    issued_by?: string | null
    issued_at?: Date | string | null
    rejected_by?: string | null
    rejected_reason?: string | null
    notes?: string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type HospitalReferralUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    employee_id?: StringFieldUpdateOperationsInput | string
    employee_name?: StringFieldUpdateOperationsInput | string
    hospital_name?: StringFieldUpdateOperationsInput | string
    hospital_branch?: NullableStringFieldUpdateOperationsInput | string | null
    reason?: StringFieldUpdateOperationsInput | string
    preferred_date?: DateTimeFieldUpdateOperationsInput | Date | string
    valid_from?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    valid_until?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    workflow_id?: NullableStringFieldUpdateOperationsInput | string | null
    referral_number?: NullableStringFieldUpdateOperationsInput | string | null
    approved_by?: NullableStringFieldUpdateOperationsInput | string | null
    approved_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    issued_by?: NullableStringFieldUpdateOperationsInput | string | null
    issued_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rejected_by?: NullableStringFieldUpdateOperationsInput | string | null
    rejected_reason?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HospitalReferralUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    employee_id?: StringFieldUpdateOperationsInput | string
    employee_name?: StringFieldUpdateOperationsInput | string
    hospital_name?: StringFieldUpdateOperationsInput | string
    hospital_branch?: NullableStringFieldUpdateOperationsInput | string | null
    reason?: StringFieldUpdateOperationsInput | string
    preferred_date?: DateTimeFieldUpdateOperationsInput | Date | string
    valid_from?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    valid_until?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    workflow_id?: NullableStringFieldUpdateOperationsInput | string | null
    referral_number?: NullableStringFieldUpdateOperationsInput | string | null
    approved_by?: NullableStringFieldUpdateOperationsInput | string | null
    approved_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    issued_by?: NullableStringFieldUpdateOperationsInput | string | null
    issued_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rejected_by?: NullableStringFieldUpdateOperationsInput | string | null
    rejected_reason?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HospitalReferralCreateManyInput = {
    id?: string
    employee_id: string
    employee_name: string
    hospital_name: string
    hospital_branch?: string | null
    reason: string
    preferred_date: Date | string
    valid_from?: Date | string | null
    valid_until?: Date | string | null
    status?: string
    workflow_id?: string | null
    referral_number?: string | null
    approved_by?: string | null
    approved_at?: Date | string | null
    issued_by?: string | null
    issued_at?: Date | string | null
    rejected_by?: string | null
    rejected_reason?: string | null
    notes?: string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type HospitalReferralUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    employee_id?: StringFieldUpdateOperationsInput | string
    employee_name?: StringFieldUpdateOperationsInput | string
    hospital_name?: StringFieldUpdateOperationsInput | string
    hospital_branch?: NullableStringFieldUpdateOperationsInput | string | null
    reason?: StringFieldUpdateOperationsInput | string
    preferred_date?: DateTimeFieldUpdateOperationsInput | Date | string
    valid_from?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    valid_until?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    workflow_id?: NullableStringFieldUpdateOperationsInput | string | null
    referral_number?: NullableStringFieldUpdateOperationsInput | string | null
    approved_by?: NullableStringFieldUpdateOperationsInput | string | null
    approved_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    issued_by?: NullableStringFieldUpdateOperationsInput | string | null
    issued_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rejected_by?: NullableStringFieldUpdateOperationsInput | string | null
    rejected_reason?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HospitalReferralUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    employee_id?: StringFieldUpdateOperationsInput | string
    employee_name?: StringFieldUpdateOperationsInput | string
    hospital_name?: StringFieldUpdateOperationsInput | string
    hospital_branch?: NullableStringFieldUpdateOperationsInput | string | null
    reason?: StringFieldUpdateOperationsInput | string
    preferred_date?: DateTimeFieldUpdateOperationsInput | Date | string
    valid_from?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    valid_until?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    workflow_id?: NullableStringFieldUpdateOperationsInput | string | null
    referral_number?: NullableStringFieldUpdateOperationsInput | string | null
    approved_by?: NullableStringFieldUpdateOperationsInput | string | null
    approved_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    issued_by?: NullableStringFieldUpdateOperationsInput | string | null
    issued_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rejected_by?: NullableStringFieldUpdateOperationsInput | string | null
    rejected_reason?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
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

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
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

  export type BenefitEnrollmentListRelationFilter = {
    every?: BenefitEnrollmentWhereInput
    some?: BenefitEnrollmentWhereInput
    none?: BenefitEnrollmentWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type BenefitEnrollmentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type BenefitPlanCountOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    name_en?: SortOrder
    name_th?: SortOrder
    category?: SortOrder
    description_en?: SortOrder
    description_th?: SortOrder
    coverage_amount?: SortOrder
    employer_contribution?: SortOrder
    employee_contribution?: SortOrder
    is_active?: SortOrder
    effective_date?: SortOrder
    end_date?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type BenefitPlanAvgOrderByAggregateInput = {
    coverage_amount?: SortOrder
    employer_contribution?: SortOrder
    employee_contribution?: SortOrder
  }

  export type BenefitPlanMaxOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    name_en?: SortOrder
    name_th?: SortOrder
    category?: SortOrder
    description_en?: SortOrder
    description_th?: SortOrder
    coverage_amount?: SortOrder
    employer_contribution?: SortOrder
    employee_contribution?: SortOrder
    is_active?: SortOrder
    effective_date?: SortOrder
    end_date?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type BenefitPlanMinOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    name_en?: SortOrder
    name_th?: SortOrder
    category?: SortOrder
    description_en?: SortOrder
    description_th?: SortOrder
    coverage_amount?: SortOrder
    employer_contribution?: SortOrder
    employee_contribution?: SortOrder
    is_active?: SortOrder
    effective_date?: SortOrder
    end_date?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type BenefitPlanSumOrderByAggregateInput = {
    coverage_amount?: SortOrder
    employer_contribution?: SortOrder
    employee_contribution?: SortOrder
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

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
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

  export type BenefitPlanScalarRelationFilter = {
    is?: BenefitPlanWhereInput
    isNot?: BenefitPlanWhereInput
  }

  export type BenefitDependentListRelationFilter = {
    every?: BenefitDependentWhereInput
    some?: BenefitDependentWhereInput
    none?: BenefitDependentWhereInput
  }

  export type BenefitDependentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type BenefitEnrollmentEmployee_idPlan_idCompoundUniqueInput = {
    employee_id: string
    plan_id: string
  }

  export type BenefitEnrollmentCountOrderByAggregateInput = {
    id?: SortOrder
    employee_id?: SortOrder
    plan_id?: SortOrder
    coverage_level?: SortOrder
    status?: SortOrder
    enrolled_at?: SortOrder
    effective_date?: SortOrder
    end_date?: SortOrder
    cancelled_at?: SortOrder
    cancellation_reason?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type BenefitEnrollmentMaxOrderByAggregateInput = {
    id?: SortOrder
    employee_id?: SortOrder
    plan_id?: SortOrder
    coverage_level?: SortOrder
    status?: SortOrder
    enrolled_at?: SortOrder
    effective_date?: SortOrder
    end_date?: SortOrder
    cancelled_at?: SortOrder
    cancellation_reason?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type BenefitEnrollmentMinOrderByAggregateInput = {
    id?: SortOrder
    employee_id?: SortOrder
    plan_id?: SortOrder
    coverage_level?: SortOrder
    status?: SortOrder
    enrolled_at?: SortOrder
    effective_date?: SortOrder
    end_date?: SortOrder
    cancelled_at?: SortOrder
    cancellation_reason?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type BenefitEnrollmentScalarRelationFilter = {
    is?: BenefitEnrollmentWhereInput
    isNot?: BenefitEnrollmentWhereInput
  }

  export type BenefitDependentCountOrderByAggregateInput = {
    id?: SortOrder
    enrollment_id?: SortOrder
    name?: SortOrder
    relationship?: SortOrder
    date_of_birth?: SortOrder
    national_id?: SortOrder
    is_active?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type BenefitDependentMaxOrderByAggregateInput = {
    id?: SortOrder
    enrollment_id?: SortOrder
    name?: SortOrder
    relationship?: SortOrder
    date_of_birth?: SortOrder
    national_id?: SortOrder
    is_active?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type BenefitDependentMinOrderByAggregateInput = {
    id?: SortOrder
    enrollment_id?: SortOrder
    name?: SortOrder
    relationship?: SortOrder
    date_of_birth?: SortOrder
    national_id?: SortOrder
    is_active?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type BenefitClaimCountOrderByAggregateInput = {
    id?: SortOrder
    employee_id?: SortOrder
    plan_id?: SortOrder
    claim_type?: SortOrder
    amount?: SortOrder
    description?: SortOrder
    receipt_date?: SortOrder
    status?: SortOrder
    submitted_at?: SortOrder
    reviewed_at?: SortOrder
    reviewed_by?: SortOrder
    rejection_reason?: SortOrder
    paid_at?: SortOrder
    paid_amount?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type BenefitClaimAvgOrderByAggregateInput = {
    amount?: SortOrder
    paid_amount?: SortOrder
  }

  export type BenefitClaimMaxOrderByAggregateInput = {
    id?: SortOrder
    employee_id?: SortOrder
    plan_id?: SortOrder
    claim_type?: SortOrder
    amount?: SortOrder
    description?: SortOrder
    receipt_date?: SortOrder
    status?: SortOrder
    submitted_at?: SortOrder
    reviewed_at?: SortOrder
    reviewed_by?: SortOrder
    rejection_reason?: SortOrder
    paid_at?: SortOrder
    paid_amount?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type BenefitClaimMinOrderByAggregateInput = {
    id?: SortOrder
    employee_id?: SortOrder
    plan_id?: SortOrder
    claim_type?: SortOrder
    amount?: SortOrder
    description?: SortOrder
    receipt_date?: SortOrder
    status?: SortOrder
    submitted_at?: SortOrder
    reviewed_at?: SortOrder
    reviewed_by?: SortOrder
    rejection_reason?: SortOrder
    paid_at?: SortOrder
    paid_amount?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type BenefitClaimSumOrderByAggregateInput = {
    amount?: SortOrder
    paid_amount?: SortOrder
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

  export type OCRResultNullableScalarRelationFilter = {
    is?: OCRResultWhereInput | null
    isNot?: OCRResultWhereInput | null
  }

  export type PolicyCheckListRelationFilter = {
    every?: PolicyCheckWhereInput
    some?: PolicyCheckWhereInput
    none?: PolicyCheckWhereInput
  }

  export type PolicyCheckOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ClaimRequestCountOrderByAggregateInput = {
    id?: SortOrder
    employee_id?: SortOrder
    receipt_id?: SortOrder
    category?: SortOrder
    amount?: SortOrder
    currency?: SortOrder
    description?: SortOrder
    status?: SortOrder
    auto_approved?: SortOrder
    approved_by?: SortOrder
    approved_at?: SortOrder
    rejected_by?: SortOrder
    rejected_reason?: SortOrder
    submitted_at?: SortOrder
    ocr_result_id?: SortOrder
    requires_finance_approval?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type ClaimRequestAvgOrderByAggregateInput = {
    amount?: SortOrder
  }

  export type ClaimRequestMaxOrderByAggregateInput = {
    id?: SortOrder
    employee_id?: SortOrder
    receipt_id?: SortOrder
    category?: SortOrder
    amount?: SortOrder
    currency?: SortOrder
    description?: SortOrder
    status?: SortOrder
    auto_approved?: SortOrder
    approved_by?: SortOrder
    approved_at?: SortOrder
    rejected_by?: SortOrder
    rejected_reason?: SortOrder
    submitted_at?: SortOrder
    ocr_result_id?: SortOrder
    requires_finance_approval?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type ClaimRequestMinOrderByAggregateInput = {
    id?: SortOrder
    employee_id?: SortOrder
    receipt_id?: SortOrder
    category?: SortOrder
    amount?: SortOrder
    currency?: SortOrder
    description?: SortOrder
    status?: SortOrder
    auto_approved?: SortOrder
    approved_by?: SortOrder
    approved_at?: SortOrder
    rejected_by?: SortOrder
    rejected_reason?: SortOrder
    submitted_at?: SortOrder
    ocr_result_id?: SortOrder
    requires_finance_approval?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type ClaimRequestSumOrderByAggregateInput = {
    amount?: SortOrder
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

  export type ClaimRequestListRelationFilter = {
    every?: ClaimRequestWhereInput
    some?: ClaimRequestWhereInput
    none?: ClaimRequestWhereInput
  }

  export type ClaimRequestOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type OCRResultCountOrderByAggregateInput = {
    id?: SortOrder
    receipt_file_name?: SortOrder
    receipt_file_type?: SortOrder
    receipt_file_size?: SortOrder
    vendor_name?: SortOrder
    amount?: SortOrder
    receipt_date?: SortOrder
    category?: SortOrder
    confidence_score?: SortOrder
    raw_text?: SortOrder
    processed_at?: SortOrder
  }

  export type OCRResultAvgOrderByAggregateInput = {
    receipt_file_size?: SortOrder
    amount?: SortOrder
    confidence_score?: SortOrder
  }

  export type OCRResultMaxOrderByAggregateInput = {
    id?: SortOrder
    receipt_file_name?: SortOrder
    receipt_file_type?: SortOrder
    receipt_file_size?: SortOrder
    vendor_name?: SortOrder
    amount?: SortOrder
    receipt_date?: SortOrder
    category?: SortOrder
    confidence_score?: SortOrder
    raw_text?: SortOrder
    processed_at?: SortOrder
  }

  export type OCRResultMinOrderByAggregateInput = {
    id?: SortOrder
    receipt_file_name?: SortOrder
    receipt_file_type?: SortOrder
    receipt_file_size?: SortOrder
    vendor_name?: SortOrder
    amount?: SortOrder
    receipt_date?: SortOrder
    category?: SortOrder
    confidence_score?: SortOrder
    raw_text?: SortOrder
    processed_at?: SortOrder
  }

  export type OCRResultSumOrderByAggregateInput = {
    receipt_file_size?: SortOrder
    amount?: SortOrder
    confidence_score?: SortOrder
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

  export type PolicyRuleCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    rule_type?: SortOrder
    category?: SortOrder
    condition_field?: SortOrder
    condition_value?: SortOrder
    is_active?: SortOrder
    created_by?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type PolicyRuleMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    rule_type?: SortOrder
    category?: SortOrder
    condition_field?: SortOrder
    condition_value?: SortOrder
    is_active?: SortOrder
    created_by?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type PolicyRuleMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    rule_type?: SortOrder
    category?: SortOrder
    condition_field?: SortOrder
    condition_value?: SortOrder
    is_active?: SortOrder
    created_by?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type ClaimRequestScalarRelationFilter = {
    is?: ClaimRequestWhereInput
    isNot?: ClaimRequestWhereInput
  }

  export type PolicyCheckCountOrderByAggregateInput = {
    id?: SortOrder
    claim_id?: SortOrder
    rule_id?: SortOrder
    rule_name?: SortOrder
    passed?: SortOrder
    message?: SortOrder
    checked_at?: SortOrder
  }

  export type PolicyCheckMaxOrderByAggregateInput = {
    id?: SortOrder
    claim_id?: SortOrder
    rule_id?: SortOrder
    rule_name?: SortOrder
    passed?: SortOrder
    message?: SortOrder
    checked_at?: SortOrder
  }

  export type PolicyCheckMinOrderByAggregateInput = {
    id?: SortOrder
    claim_id?: SortOrder
    rule_id?: SortOrder
    rule_name?: SortOrder
    passed?: SortOrder
    message?: SortOrder
    checked_at?: SortOrder
  }

  export type HospitalReferralCountOrderByAggregateInput = {
    id?: SortOrder
    employee_id?: SortOrder
    employee_name?: SortOrder
    hospital_name?: SortOrder
    hospital_branch?: SortOrder
    reason?: SortOrder
    preferred_date?: SortOrder
    valid_from?: SortOrder
    valid_until?: SortOrder
    status?: SortOrder
    workflow_id?: SortOrder
    referral_number?: SortOrder
    approved_by?: SortOrder
    approved_at?: SortOrder
    issued_by?: SortOrder
    issued_at?: SortOrder
    rejected_by?: SortOrder
    rejected_reason?: SortOrder
    notes?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type HospitalReferralMaxOrderByAggregateInput = {
    id?: SortOrder
    employee_id?: SortOrder
    employee_name?: SortOrder
    hospital_name?: SortOrder
    hospital_branch?: SortOrder
    reason?: SortOrder
    preferred_date?: SortOrder
    valid_from?: SortOrder
    valid_until?: SortOrder
    status?: SortOrder
    workflow_id?: SortOrder
    referral_number?: SortOrder
    approved_by?: SortOrder
    approved_at?: SortOrder
    issued_by?: SortOrder
    issued_at?: SortOrder
    rejected_by?: SortOrder
    rejected_reason?: SortOrder
    notes?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type HospitalReferralMinOrderByAggregateInput = {
    id?: SortOrder
    employee_id?: SortOrder
    employee_name?: SortOrder
    hospital_name?: SortOrder
    hospital_branch?: SortOrder
    reason?: SortOrder
    preferred_date?: SortOrder
    valid_from?: SortOrder
    valid_until?: SortOrder
    status?: SortOrder
    workflow_id?: SortOrder
    referral_number?: SortOrder
    approved_by?: SortOrder
    approved_at?: SortOrder
    issued_by?: SortOrder
    issued_at?: SortOrder
    rejected_by?: SortOrder
    rejected_reason?: SortOrder
    notes?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type BenefitEnrollmentCreateNestedManyWithoutPlanInput = {
    create?: XOR<BenefitEnrollmentCreateWithoutPlanInput, BenefitEnrollmentUncheckedCreateWithoutPlanInput> | BenefitEnrollmentCreateWithoutPlanInput[] | BenefitEnrollmentUncheckedCreateWithoutPlanInput[]
    connectOrCreate?: BenefitEnrollmentCreateOrConnectWithoutPlanInput | BenefitEnrollmentCreateOrConnectWithoutPlanInput[]
    createMany?: BenefitEnrollmentCreateManyPlanInputEnvelope
    connect?: BenefitEnrollmentWhereUniqueInput | BenefitEnrollmentWhereUniqueInput[]
  }

  export type BenefitEnrollmentUncheckedCreateNestedManyWithoutPlanInput = {
    create?: XOR<BenefitEnrollmentCreateWithoutPlanInput, BenefitEnrollmentUncheckedCreateWithoutPlanInput> | BenefitEnrollmentCreateWithoutPlanInput[] | BenefitEnrollmentUncheckedCreateWithoutPlanInput[]
    connectOrCreate?: BenefitEnrollmentCreateOrConnectWithoutPlanInput | BenefitEnrollmentCreateOrConnectWithoutPlanInput[]
    createMany?: BenefitEnrollmentCreateManyPlanInputEnvelope
    connect?: BenefitEnrollmentWhereUniqueInput | BenefitEnrollmentWhereUniqueInput[]
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

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type BenefitEnrollmentUpdateManyWithoutPlanNestedInput = {
    create?: XOR<BenefitEnrollmentCreateWithoutPlanInput, BenefitEnrollmentUncheckedCreateWithoutPlanInput> | BenefitEnrollmentCreateWithoutPlanInput[] | BenefitEnrollmentUncheckedCreateWithoutPlanInput[]
    connectOrCreate?: BenefitEnrollmentCreateOrConnectWithoutPlanInput | BenefitEnrollmentCreateOrConnectWithoutPlanInput[]
    upsert?: BenefitEnrollmentUpsertWithWhereUniqueWithoutPlanInput | BenefitEnrollmentUpsertWithWhereUniqueWithoutPlanInput[]
    createMany?: BenefitEnrollmentCreateManyPlanInputEnvelope
    set?: BenefitEnrollmentWhereUniqueInput | BenefitEnrollmentWhereUniqueInput[]
    disconnect?: BenefitEnrollmentWhereUniqueInput | BenefitEnrollmentWhereUniqueInput[]
    delete?: BenefitEnrollmentWhereUniqueInput | BenefitEnrollmentWhereUniqueInput[]
    connect?: BenefitEnrollmentWhereUniqueInput | BenefitEnrollmentWhereUniqueInput[]
    update?: BenefitEnrollmentUpdateWithWhereUniqueWithoutPlanInput | BenefitEnrollmentUpdateWithWhereUniqueWithoutPlanInput[]
    updateMany?: BenefitEnrollmentUpdateManyWithWhereWithoutPlanInput | BenefitEnrollmentUpdateManyWithWhereWithoutPlanInput[]
    deleteMany?: BenefitEnrollmentScalarWhereInput | BenefitEnrollmentScalarWhereInput[]
  }

  export type BenefitEnrollmentUncheckedUpdateManyWithoutPlanNestedInput = {
    create?: XOR<BenefitEnrollmentCreateWithoutPlanInput, BenefitEnrollmentUncheckedCreateWithoutPlanInput> | BenefitEnrollmentCreateWithoutPlanInput[] | BenefitEnrollmentUncheckedCreateWithoutPlanInput[]
    connectOrCreate?: BenefitEnrollmentCreateOrConnectWithoutPlanInput | BenefitEnrollmentCreateOrConnectWithoutPlanInput[]
    upsert?: BenefitEnrollmentUpsertWithWhereUniqueWithoutPlanInput | BenefitEnrollmentUpsertWithWhereUniqueWithoutPlanInput[]
    createMany?: BenefitEnrollmentCreateManyPlanInputEnvelope
    set?: BenefitEnrollmentWhereUniqueInput | BenefitEnrollmentWhereUniqueInput[]
    disconnect?: BenefitEnrollmentWhereUniqueInput | BenefitEnrollmentWhereUniqueInput[]
    delete?: BenefitEnrollmentWhereUniqueInput | BenefitEnrollmentWhereUniqueInput[]
    connect?: BenefitEnrollmentWhereUniqueInput | BenefitEnrollmentWhereUniqueInput[]
    update?: BenefitEnrollmentUpdateWithWhereUniqueWithoutPlanInput | BenefitEnrollmentUpdateWithWhereUniqueWithoutPlanInput[]
    updateMany?: BenefitEnrollmentUpdateManyWithWhereWithoutPlanInput | BenefitEnrollmentUpdateManyWithWhereWithoutPlanInput[]
    deleteMany?: BenefitEnrollmentScalarWhereInput | BenefitEnrollmentScalarWhereInput[]
  }

  export type BenefitPlanCreateNestedOneWithoutEnrollmentsInput = {
    create?: XOR<BenefitPlanCreateWithoutEnrollmentsInput, BenefitPlanUncheckedCreateWithoutEnrollmentsInput>
    connectOrCreate?: BenefitPlanCreateOrConnectWithoutEnrollmentsInput
    connect?: BenefitPlanWhereUniqueInput
  }

  export type BenefitDependentCreateNestedManyWithoutEnrollmentInput = {
    create?: XOR<BenefitDependentCreateWithoutEnrollmentInput, BenefitDependentUncheckedCreateWithoutEnrollmentInput> | BenefitDependentCreateWithoutEnrollmentInput[] | BenefitDependentUncheckedCreateWithoutEnrollmentInput[]
    connectOrCreate?: BenefitDependentCreateOrConnectWithoutEnrollmentInput | BenefitDependentCreateOrConnectWithoutEnrollmentInput[]
    createMany?: BenefitDependentCreateManyEnrollmentInputEnvelope
    connect?: BenefitDependentWhereUniqueInput | BenefitDependentWhereUniqueInput[]
  }

  export type BenefitDependentUncheckedCreateNestedManyWithoutEnrollmentInput = {
    create?: XOR<BenefitDependentCreateWithoutEnrollmentInput, BenefitDependentUncheckedCreateWithoutEnrollmentInput> | BenefitDependentCreateWithoutEnrollmentInput[] | BenefitDependentUncheckedCreateWithoutEnrollmentInput[]
    connectOrCreate?: BenefitDependentCreateOrConnectWithoutEnrollmentInput | BenefitDependentCreateOrConnectWithoutEnrollmentInput[]
    createMany?: BenefitDependentCreateManyEnrollmentInputEnvelope
    connect?: BenefitDependentWhereUniqueInput | BenefitDependentWhereUniqueInput[]
  }

  export type BenefitPlanUpdateOneRequiredWithoutEnrollmentsNestedInput = {
    create?: XOR<BenefitPlanCreateWithoutEnrollmentsInput, BenefitPlanUncheckedCreateWithoutEnrollmentsInput>
    connectOrCreate?: BenefitPlanCreateOrConnectWithoutEnrollmentsInput
    upsert?: BenefitPlanUpsertWithoutEnrollmentsInput
    connect?: BenefitPlanWhereUniqueInput
    update?: XOR<XOR<BenefitPlanUpdateToOneWithWhereWithoutEnrollmentsInput, BenefitPlanUpdateWithoutEnrollmentsInput>, BenefitPlanUncheckedUpdateWithoutEnrollmentsInput>
  }

  export type BenefitDependentUpdateManyWithoutEnrollmentNestedInput = {
    create?: XOR<BenefitDependentCreateWithoutEnrollmentInput, BenefitDependentUncheckedCreateWithoutEnrollmentInput> | BenefitDependentCreateWithoutEnrollmentInput[] | BenefitDependentUncheckedCreateWithoutEnrollmentInput[]
    connectOrCreate?: BenefitDependentCreateOrConnectWithoutEnrollmentInput | BenefitDependentCreateOrConnectWithoutEnrollmentInput[]
    upsert?: BenefitDependentUpsertWithWhereUniqueWithoutEnrollmentInput | BenefitDependentUpsertWithWhereUniqueWithoutEnrollmentInput[]
    createMany?: BenefitDependentCreateManyEnrollmentInputEnvelope
    set?: BenefitDependentWhereUniqueInput | BenefitDependentWhereUniqueInput[]
    disconnect?: BenefitDependentWhereUniqueInput | BenefitDependentWhereUniqueInput[]
    delete?: BenefitDependentWhereUniqueInput | BenefitDependentWhereUniqueInput[]
    connect?: BenefitDependentWhereUniqueInput | BenefitDependentWhereUniqueInput[]
    update?: BenefitDependentUpdateWithWhereUniqueWithoutEnrollmentInput | BenefitDependentUpdateWithWhereUniqueWithoutEnrollmentInput[]
    updateMany?: BenefitDependentUpdateManyWithWhereWithoutEnrollmentInput | BenefitDependentUpdateManyWithWhereWithoutEnrollmentInput[]
    deleteMany?: BenefitDependentScalarWhereInput | BenefitDependentScalarWhereInput[]
  }

  export type BenefitDependentUncheckedUpdateManyWithoutEnrollmentNestedInput = {
    create?: XOR<BenefitDependentCreateWithoutEnrollmentInput, BenefitDependentUncheckedCreateWithoutEnrollmentInput> | BenefitDependentCreateWithoutEnrollmentInput[] | BenefitDependentUncheckedCreateWithoutEnrollmentInput[]
    connectOrCreate?: BenefitDependentCreateOrConnectWithoutEnrollmentInput | BenefitDependentCreateOrConnectWithoutEnrollmentInput[]
    upsert?: BenefitDependentUpsertWithWhereUniqueWithoutEnrollmentInput | BenefitDependentUpsertWithWhereUniqueWithoutEnrollmentInput[]
    createMany?: BenefitDependentCreateManyEnrollmentInputEnvelope
    set?: BenefitDependentWhereUniqueInput | BenefitDependentWhereUniqueInput[]
    disconnect?: BenefitDependentWhereUniqueInput | BenefitDependentWhereUniqueInput[]
    delete?: BenefitDependentWhereUniqueInput | BenefitDependentWhereUniqueInput[]
    connect?: BenefitDependentWhereUniqueInput | BenefitDependentWhereUniqueInput[]
    update?: BenefitDependentUpdateWithWhereUniqueWithoutEnrollmentInput | BenefitDependentUpdateWithWhereUniqueWithoutEnrollmentInput[]
    updateMany?: BenefitDependentUpdateManyWithWhereWithoutEnrollmentInput | BenefitDependentUpdateManyWithWhereWithoutEnrollmentInput[]
    deleteMany?: BenefitDependentScalarWhereInput | BenefitDependentScalarWhereInput[]
  }

  export type BenefitEnrollmentCreateNestedOneWithoutDependentsInput = {
    create?: XOR<BenefitEnrollmentCreateWithoutDependentsInput, BenefitEnrollmentUncheckedCreateWithoutDependentsInput>
    connectOrCreate?: BenefitEnrollmentCreateOrConnectWithoutDependentsInput
    connect?: BenefitEnrollmentWhereUniqueInput
  }

  export type BenefitEnrollmentUpdateOneRequiredWithoutDependentsNestedInput = {
    create?: XOR<BenefitEnrollmentCreateWithoutDependentsInput, BenefitEnrollmentUncheckedCreateWithoutDependentsInput>
    connectOrCreate?: BenefitEnrollmentCreateOrConnectWithoutDependentsInput
    upsert?: BenefitEnrollmentUpsertWithoutDependentsInput
    connect?: BenefitEnrollmentWhereUniqueInput
    update?: XOR<XOR<BenefitEnrollmentUpdateToOneWithWhereWithoutDependentsInput, BenefitEnrollmentUpdateWithoutDependentsInput>, BenefitEnrollmentUncheckedUpdateWithoutDependentsInput>
  }

  export type OCRResultCreateNestedOneWithoutClaimsInput = {
    create?: XOR<OCRResultCreateWithoutClaimsInput, OCRResultUncheckedCreateWithoutClaimsInput>
    connectOrCreate?: OCRResultCreateOrConnectWithoutClaimsInput
    connect?: OCRResultWhereUniqueInput
  }

  export type PolicyCheckCreateNestedManyWithoutClaimInput = {
    create?: XOR<PolicyCheckCreateWithoutClaimInput, PolicyCheckUncheckedCreateWithoutClaimInput> | PolicyCheckCreateWithoutClaimInput[] | PolicyCheckUncheckedCreateWithoutClaimInput[]
    connectOrCreate?: PolicyCheckCreateOrConnectWithoutClaimInput | PolicyCheckCreateOrConnectWithoutClaimInput[]
    createMany?: PolicyCheckCreateManyClaimInputEnvelope
    connect?: PolicyCheckWhereUniqueInput | PolicyCheckWhereUniqueInput[]
  }

  export type PolicyCheckUncheckedCreateNestedManyWithoutClaimInput = {
    create?: XOR<PolicyCheckCreateWithoutClaimInput, PolicyCheckUncheckedCreateWithoutClaimInput> | PolicyCheckCreateWithoutClaimInput[] | PolicyCheckUncheckedCreateWithoutClaimInput[]
    connectOrCreate?: PolicyCheckCreateOrConnectWithoutClaimInput | PolicyCheckCreateOrConnectWithoutClaimInput[]
    createMany?: PolicyCheckCreateManyClaimInputEnvelope
    connect?: PolicyCheckWhereUniqueInput | PolicyCheckWhereUniqueInput[]
  }

  export type DecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type OCRResultUpdateOneWithoutClaimsNestedInput = {
    create?: XOR<OCRResultCreateWithoutClaimsInput, OCRResultUncheckedCreateWithoutClaimsInput>
    connectOrCreate?: OCRResultCreateOrConnectWithoutClaimsInput
    upsert?: OCRResultUpsertWithoutClaimsInput
    disconnect?: OCRResultWhereInput | boolean
    delete?: OCRResultWhereInput | boolean
    connect?: OCRResultWhereUniqueInput
    update?: XOR<XOR<OCRResultUpdateToOneWithWhereWithoutClaimsInput, OCRResultUpdateWithoutClaimsInput>, OCRResultUncheckedUpdateWithoutClaimsInput>
  }

  export type PolicyCheckUpdateManyWithoutClaimNestedInput = {
    create?: XOR<PolicyCheckCreateWithoutClaimInput, PolicyCheckUncheckedCreateWithoutClaimInput> | PolicyCheckCreateWithoutClaimInput[] | PolicyCheckUncheckedCreateWithoutClaimInput[]
    connectOrCreate?: PolicyCheckCreateOrConnectWithoutClaimInput | PolicyCheckCreateOrConnectWithoutClaimInput[]
    upsert?: PolicyCheckUpsertWithWhereUniqueWithoutClaimInput | PolicyCheckUpsertWithWhereUniqueWithoutClaimInput[]
    createMany?: PolicyCheckCreateManyClaimInputEnvelope
    set?: PolicyCheckWhereUniqueInput | PolicyCheckWhereUniqueInput[]
    disconnect?: PolicyCheckWhereUniqueInput | PolicyCheckWhereUniqueInput[]
    delete?: PolicyCheckWhereUniqueInput | PolicyCheckWhereUniqueInput[]
    connect?: PolicyCheckWhereUniqueInput | PolicyCheckWhereUniqueInput[]
    update?: PolicyCheckUpdateWithWhereUniqueWithoutClaimInput | PolicyCheckUpdateWithWhereUniqueWithoutClaimInput[]
    updateMany?: PolicyCheckUpdateManyWithWhereWithoutClaimInput | PolicyCheckUpdateManyWithWhereWithoutClaimInput[]
    deleteMany?: PolicyCheckScalarWhereInput | PolicyCheckScalarWhereInput[]
  }

  export type PolicyCheckUncheckedUpdateManyWithoutClaimNestedInput = {
    create?: XOR<PolicyCheckCreateWithoutClaimInput, PolicyCheckUncheckedCreateWithoutClaimInput> | PolicyCheckCreateWithoutClaimInput[] | PolicyCheckUncheckedCreateWithoutClaimInput[]
    connectOrCreate?: PolicyCheckCreateOrConnectWithoutClaimInput | PolicyCheckCreateOrConnectWithoutClaimInput[]
    upsert?: PolicyCheckUpsertWithWhereUniqueWithoutClaimInput | PolicyCheckUpsertWithWhereUniqueWithoutClaimInput[]
    createMany?: PolicyCheckCreateManyClaimInputEnvelope
    set?: PolicyCheckWhereUniqueInput | PolicyCheckWhereUniqueInput[]
    disconnect?: PolicyCheckWhereUniqueInput | PolicyCheckWhereUniqueInput[]
    delete?: PolicyCheckWhereUniqueInput | PolicyCheckWhereUniqueInput[]
    connect?: PolicyCheckWhereUniqueInput | PolicyCheckWhereUniqueInput[]
    update?: PolicyCheckUpdateWithWhereUniqueWithoutClaimInput | PolicyCheckUpdateWithWhereUniqueWithoutClaimInput[]
    updateMany?: PolicyCheckUpdateManyWithWhereWithoutClaimInput | PolicyCheckUpdateManyWithWhereWithoutClaimInput[]
    deleteMany?: PolicyCheckScalarWhereInput | PolicyCheckScalarWhereInput[]
  }

  export type ClaimRequestCreateNestedManyWithoutOcr_resultInput = {
    create?: XOR<ClaimRequestCreateWithoutOcr_resultInput, ClaimRequestUncheckedCreateWithoutOcr_resultInput> | ClaimRequestCreateWithoutOcr_resultInput[] | ClaimRequestUncheckedCreateWithoutOcr_resultInput[]
    connectOrCreate?: ClaimRequestCreateOrConnectWithoutOcr_resultInput | ClaimRequestCreateOrConnectWithoutOcr_resultInput[]
    createMany?: ClaimRequestCreateManyOcr_resultInputEnvelope
    connect?: ClaimRequestWhereUniqueInput | ClaimRequestWhereUniqueInput[]
  }

  export type ClaimRequestUncheckedCreateNestedManyWithoutOcr_resultInput = {
    create?: XOR<ClaimRequestCreateWithoutOcr_resultInput, ClaimRequestUncheckedCreateWithoutOcr_resultInput> | ClaimRequestCreateWithoutOcr_resultInput[] | ClaimRequestUncheckedCreateWithoutOcr_resultInput[]
    connectOrCreate?: ClaimRequestCreateOrConnectWithoutOcr_resultInput | ClaimRequestCreateOrConnectWithoutOcr_resultInput[]
    createMany?: ClaimRequestCreateManyOcr_resultInputEnvelope
    connect?: ClaimRequestWhereUniqueInput | ClaimRequestWhereUniqueInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableDecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string | null
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type ClaimRequestUpdateManyWithoutOcr_resultNestedInput = {
    create?: XOR<ClaimRequestCreateWithoutOcr_resultInput, ClaimRequestUncheckedCreateWithoutOcr_resultInput> | ClaimRequestCreateWithoutOcr_resultInput[] | ClaimRequestUncheckedCreateWithoutOcr_resultInput[]
    connectOrCreate?: ClaimRequestCreateOrConnectWithoutOcr_resultInput | ClaimRequestCreateOrConnectWithoutOcr_resultInput[]
    upsert?: ClaimRequestUpsertWithWhereUniqueWithoutOcr_resultInput | ClaimRequestUpsertWithWhereUniqueWithoutOcr_resultInput[]
    createMany?: ClaimRequestCreateManyOcr_resultInputEnvelope
    set?: ClaimRequestWhereUniqueInput | ClaimRequestWhereUniqueInput[]
    disconnect?: ClaimRequestWhereUniqueInput | ClaimRequestWhereUniqueInput[]
    delete?: ClaimRequestWhereUniqueInput | ClaimRequestWhereUniqueInput[]
    connect?: ClaimRequestWhereUniqueInput | ClaimRequestWhereUniqueInput[]
    update?: ClaimRequestUpdateWithWhereUniqueWithoutOcr_resultInput | ClaimRequestUpdateWithWhereUniqueWithoutOcr_resultInput[]
    updateMany?: ClaimRequestUpdateManyWithWhereWithoutOcr_resultInput | ClaimRequestUpdateManyWithWhereWithoutOcr_resultInput[]
    deleteMany?: ClaimRequestScalarWhereInput | ClaimRequestScalarWhereInput[]
  }

  export type ClaimRequestUncheckedUpdateManyWithoutOcr_resultNestedInput = {
    create?: XOR<ClaimRequestCreateWithoutOcr_resultInput, ClaimRequestUncheckedCreateWithoutOcr_resultInput> | ClaimRequestCreateWithoutOcr_resultInput[] | ClaimRequestUncheckedCreateWithoutOcr_resultInput[]
    connectOrCreate?: ClaimRequestCreateOrConnectWithoutOcr_resultInput | ClaimRequestCreateOrConnectWithoutOcr_resultInput[]
    upsert?: ClaimRequestUpsertWithWhereUniqueWithoutOcr_resultInput | ClaimRequestUpsertWithWhereUniqueWithoutOcr_resultInput[]
    createMany?: ClaimRequestCreateManyOcr_resultInputEnvelope
    set?: ClaimRequestWhereUniqueInput | ClaimRequestWhereUniqueInput[]
    disconnect?: ClaimRequestWhereUniqueInput | ClaimRequestWhereUniqueInput[]
    delete?: ClaimRequestWhereUniqueInput | ClaimRequestWhereUniqueInput[]
    connect?: ClaimRequestWhereUniqueInput | ClaimRequestWhereUniqueInput[]
    update?: ClaimRequestUpdateWithWhereUniqueWithoutOcr_resultInput | ClaimRequestUpdateWithWhereUniqueWithoutOcr_resultInput[]
    updateMany?: ClaimRequestUpdateManyWithWhereWithoutOcr_resultInput | ClaimRequestUpdateManyWithWhereWithoutOcr_resultInput[]
    deleteMany?: ClaimRequestScalarWhereInput | ClaimRequestScalarWhereInput[]
  }

  export type ClaimRequestCreateNestedOneWithoutPolicy_checksInput = {
    create?: XOR<ClaimRequestCreateWithoutPolicy_checksInput, ClaimRequestUncheckedCreateWithoutPolicy_checksInput>
    connectOrCreate?: ClaimRequestCreateOrConnectWithoutPolicy_checksInput
    connect?: ClaimRequestWhereUniqueInput
  }

  export type ClaimRequestUpdateOneRequiredWithoutPolicy_checksNestedInput = {
    create?: XOR<ClaimRequestCreateWithoutPolicy_checksInput, ClaimRequestUncheckedCreateWithoutPolicy_checksInput>
    connectOrCreate?: ClaimRequestCreateOrConnectWithoutPolicy_checksInput
    upsert?: ClaimRequestUpsertWithoutPolicy_checksInput
    connect?: ClaimRequestWhereUniqueInput
    update?: XOR<XOR<ClaimRequestUpdateToOneWithWhereWithoutPolicy_checksInput, ClaimRequestUpdateWithoutPolicy_checksInput>, ClaimRequestUncheckedUpdateWithoutPolicy_checksInput>
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

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
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

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
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

  export type BenefitEnrollmentCreateWithoutPlanInput = {
    id?: string
    employee_id: string
    coverage_level: string
    status?: string
    enrolled_at?: Date | string
    effective_date: Date | string
    end_date?: Date | string | null
    cancelled_at?: Date | string | null
    cancellation_reason?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    dependents?: BenefitDependentCreateNestedManyWithoutEnrollmentInput
  }

  export type BenefitEnrollmentUncheckedCreateWithoutPlanInput = {
    id?: string
    employee_id: string
    coverage_level: string
    status?: string
    enrolled_at?: Date | string
    effective_date: Date | string
    end_date?: Date | string | null
    cancelled_at?: Date | string | null
    cancellation_reason?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    dependents?: BenefitDependentUncheckedCreateNestedManyWithoutEnrollmentInput
  }

  export type BenefitEnrollmentCreateOrConnectWithoutPlanInput = {
    where: BenefitEnrollmentWhereUniqueInput
    create: XOR<BenefitEnrollmentCreateWithoutPlanInput, BenefitEnrollmentUncheckedCreateWithoutPlanInput>
  }

  export type BenefitEnrollmentCreateManyPlanInputEnvelope = {
    data: BenefitEnrollmentCreateManyPlanInput | BenefitEnrollmentCreateManyPlanInput[]
    skipDuplicates?: boolean
  }

  export type BenefitEnrollmentUpsertWithWhereUniqueWithoutPlanInput = {
    where: BenefitEnrollmentWhereUniqueInput
    update: XOR<BenefitEnrollmentUpdateWithoutPlanInput, BenefitEnrollmentUncheckedUpdateWithoutPlanInput>
    create: XOR<BenefitEnrollmentCreateWithoutPlanInput, BenefitEnrollmentUncheckedCreateWithoutPlanInput>
  }

  export type BenefitEnrollmentUpdateWithWhereUniqueWithoutPlanInput = {
    where: BenefitEnrollmentWhereUniqueInput
    data: XOR<BenefitEnrollmentUpdateWithoutPlanInput, BenefitEnrollmentUncheckedUpdateWithoutPlanInput>
  }

  export type BenefitEnrollmentUpdateManyWithWhereWithoutPlanInput = {
    where: BenefitEnrollmentScalarWhereInput
    data: XOR<BenefitEnrollmentUpdateManyMutationInput, BenefitEnrollmentUncheckedUpdateManyWithoutPlanInput>
  }

  export type BenefitEnrollmentScalarWhereInput = {
    AND?: BenefitEnrollmentScalarWhereInput | BenefitEnrollmentScalarWhereInput[]
    OR?: BenefitEnrollmentScalarWhereInput[]
    NOT?: BenefitEnrollmentScalarWhereInput | BenefitEnrollmentScalarWhereInput[]
    id?: StringFilter<"BenefitEnrollment"> | string
    employee_id?: StringFilter<"BenefitEnrollment"> | string
    plan_id?: StringFilter<"BenefitEnrollment"> | string
    coverage_level?: StringFilter<"BenefitEnrollment"> | string
    status?: StringFilter<"BenefitEnrollment"> | string
    enrolled_at?: DateTimeFilter<"BenefitEnrollment"> | Date | string
    effective_date?: DateTimeFilter<"BenefitEnrollment"> | Date | string
    end_date?: DateTimeNullableFilter<"BenefitEnrollment"> | Date | string | null
    cancelled_at?: DateTimeNullableFilter<"BenefitEnrollment"> | Date | string | null
    cancellation_reason?: StringNullableFilter<"BenefitEnrollment"> | string | null
    created_at?: DateTimeFilter<"BenefitEnrollment"> | Date | string
    updated_at?: DateTimeFilter<"BenefitEnrollment"> | Date | string
  }

  export type BenefitPlanCreateWithoutEnrollmentsInput = {
    id?: string
    code: string
    name_en: string
    name_th?: string | null
    category: string
    description_en?: string | null
    description_th?: string | null
    coverage_amount?: number | null
    employer_contribution?: number
    employee_contribution?: number
    is_active?: boolean
    effective_date: Date | string
    end_date?: Date | string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type BenefitPlanUncheckedCreateWithoutEnrollmentsInput = {
    id?: string
    code: string
    name_en: string
    name_th?: string | null
    category: string
    description_en?: string | null
    description_th?: string | null
    coverage_amount?: number | null
    employer_contribution?: number
    employee_contribution?: number
    is_active?: boolean
    effective_date: Date | string
    end_date?: Date | string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type BenefitPlanCreateOrConnectWithoutEnrollmentsInput = {
    where: BenefitPlanWhereUniqueInput
    create: XOR<BenefitPlanCreateWithoutEnrollmentsInput, BenefitPlanUncheckedCreateWithoutEnrollmentsInput>
  }

  export type BenefitDependentCreateWithoutEnrollmentInput = {
    id?: string
    name: string
    relationship: string
    date_of_birth?: Date | string | null
    national_id?: string | null
    is_active?: boolean
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type BenefitDependentUncheckedCreateWithoutEnrollmentInput = {
    id?: string
    name: string
    relationship: string
    date_of_birth?: Date | string | null
    national_id?: string | null
    is_active?: boolean
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type BenefitDependentCreateOrConnectWithoutEnrollmentInput = {
    where: BenefitDependentWhereUniqueInput
    create: XOR<BenefitDependentCreateWithoutEnrollmentInput, BenefitDependentUncheckedCreateWithoutEnrollmentInput>
  }

  export type BenefitDependentCreateManyEnrollmentInputEnvelope = {
    data: BenefitDependentCreateManyEnrollmentInput | BenefitDependentCreateManyEnrollmentInput[]
    skipDuplicates?: boolean
  }

  export type BenefitPlanUpsertWithoutEnrollmentsInput = {
    update: XOR<BenefitPlanUpdateWithoutEnrollmentsInput, BenefitPlanUncheckedUpdateWithoutEnrollmentsInput>
    create: XOR<BenefitPlanCreateWithoutEnrollmentsInput, BenefitPlanUncheckedCreateWithoutEnrollmentsInput>
    where?: BenefitPlanWhereInput
  }

  export type BenefitPlanUpdateToOneWithWhereWithoutEnrollmentsInput = {
    where?: BenefitPlanWhereInput
    data: XOR<BenefitPlanUpdateWithoutEnrollmentsInput, BenefitPlanUncheckedUpdateWithoutEnrollmentsInput>
  }

  export type BenefitPlanUpdateWithoutEnrollmentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    name_en?: StringFieldUpdateOperationsInput | string
    name_th?: NullableStringFieldUpdateOperationsInput | string | null
    category?: StringFieldUpdateOperationsInput | string
    description_en?: NullableStringFieldUpdateOperationsInput | string | null
    description_th?: NullableStringFieldUpdateOperationsInput | string | null
    coverage_amount?: NullableFloatFieldUpdateOperationsInput | number | null
    employer_contribution?: FloatFieldUpdateOperationsInput | number
    employee_contribution?: FloatFieldUpdateOperationsInput | number
    is_active?: BoolFieldUpdateOperationsInput | boolean
    effective_date?: DateTimeFieldUpdateOperationsInput | Date | string
    end_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BenefitPlanUncheckedUpdateWithoutEnrollmentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    name_en?: StringFieldUpdateOperationsInput | string
    name_th?: NullableStringFieldUpdateOperationsInput | string | null
    category?: StringFieldUpdateOperationsInput | string
    description_en?: NullableStringFieldUpdateOperationsInput | string | null
    description_th?: NullableStringFieldUpdateOperationsInput | string | null
    coverage_amount?: NullableFloatFieldUpdateOperationsInput | number | null
    employer_contribution?: FloatFieldUpdateOperationsInput | number
    employee_contribution?: FloatFieldUpdateOperationsInput | number
    is_active?: BoolFieldUpdateOperationsInput | boolean
    effective_date?: DateTimeFieldUpdateOperationsInput | Date | string
    end_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BenefitDependentUpsertWithWhereUniqueWithoutEnrollmentInput = {
    where: BenefitDependentWhereUniqueInput
    update: XOR<BenefitDependentUpdateWithoutEnrollmentInput, BenefitDependentUncheckedUpdateWithoutEnrollmentInput>
    create: XOR<BenefitDependentCreateWithoutEnrollmentInput, BenefitDependentUncheckedCreateWithoutEnrollmentInput>
  }

  export type BenefitDependentUpdateWithWhereUniqueWithoutEnrollmentInput = {
    where: BenefitDependentWhereUniqueInput
    data: XOR<BenefitDependentUpdateWithoutEnrollmentInput, BenefitDependentUncheckedUpdateWithoutEnrollmentInput>
  }

  export type BenefitDependentUpdateManyWithWhereWithoutEnrollmentInput = {
    where: BenefitDependentScalarWhereInput
    data: XOR<BenefitDependentUpdateManyMutationInput, BenefitDependentUncheckedUpdateManyWithoutEnrollmentInput>
  }

  export type BenefitDependentScalarWhereInput = {
    AND?: BenefitDependentScalarWhereInput | BenefitDependentScalarWhereInput[]
    OR?: BenefitDependentScalarWhereInput[]
    NOT?: BenefitDependentScalarWhereInput | BenefitDependentScalarWhereInput[]
    id?: StringFilter<"BenefitDependent"> | string
    enrollment_id?: StringFilter<"BenefitDependent"> | string
    name?: StringFilter<"BenefitDependent"> | string
    relationship?: StringFilter<"BenefitDependent"> | string
    date_of_birth?: DateTimeNullableFilter<"BenefitDependent"> | Date | string | null
    national_id?: StringNullableFilter<"BenefitDependent"> | string | null
    is_active?: BoolFilter<"BenefitDependent"> | boolean
    created_at?: DateTimeFilter<"BenefitDependent"> | Date | string
    updated_at?: DateTimeFilter<"BenefitDependent"> | Date | string
  }

  export type BenefitEnrollmentCreateWithoutDependentsInput = {
    id?: string
    employee_id: string
    coverage_level: string
    status?: string
    enrolled_at?: Date | string
    effective_date: Date | string
    end_date?: Date | string | null
    cancelled_at?: Date | string | null
    cancellation_reason?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    plan: BenefitPlanCreateNestedOneWithoutEnrollmentsInput
  }

  export type BenefitEnrollmentUncheckedCreateWithoutDependentsInput = {
    id?: string
    employee_id: string
    plan_id: string
    coverage_level: string
    status?: string
    enrolled_at?: Date | string
    effective_date: Date | string
    end_date?: Date | string | null
    cancelled_at?: Date | string | null
    cancellation_reason?: string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type BenefitEnrollmentCreateOrConnectWithoutDependentsInput = {
    where: BenefitEnrollmentWhereUniqueInput
    create: XOR<BenefitEnrollmentCreateWithoutDependentsInput, BenefitEnrollmentUncheckedCreateWithoutDependentsInput>
  }

  export type BenefitEnrollmentUpsertWithoutDependentsInput = {
    update: XOR<BenefitEnrollmentUpdateWithoutDependentsInput, BenefitEnrollmentUncheckedUpdateWithoutDependentsInput>
    create: XOR<BenefitEnrollmentCreateWithoutDependentsInput, BenefitEnrollmentUncheckedCreateWithoutDependentsInput>
    where?: BenefitEnrollmentWhereInput
  }

  export type BenefitEnrollmentUpdateToOneWithWhereWithoutDependentsInput = {
    where?: BenefitEnrollmentWhereInput
    data: XOR<BenefitEnrollmentUpdateWithoutDependentsInput, BenefitEnrollmentUncheckedUpdateWithoutDependentsInput>
  }

  export type BenefitEnrollmentUpdateWithoutDependentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    employee_id?: StringFieldUpdateOperationsInput | string
    coverage_level?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    enrolled_at?: DateTimeFieldUpdateOperationsInput | Date | string
    effective_date?: DateTimeFieldUpdateOperationsInput | Date | string
    end_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cancelled_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cancellation_reason?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    plan?: BenefitPlanUpdateOneRequiredWithoutEnrollmentsNestedInput
  }

  export type BenefitEnrollmentUncheckedUpdateWithoutDependentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    employee_id?: StringFieldUpdateOperationsInput | string
    plan_id?: StringFieldUpdateOperationsInput | string
    coverage_level?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    enrolled_at?: DateTimeFieldUpdateOperationsInput | Date | string
    effective_date?: DateTimeFieldUpdateOperationsInput | Date | string
    end_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cancelled_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cancellation_reason?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OCRResultCreateWithoutClaimsInput = {
    id?: string
    receipt_file_name: string
    receipt_file_type: string
    receipt_file_size: number
    vendor_name?: string | null
    amount?: Decimal | DecimalJsLike | number | string | null
    receipt_date?: Date | string | null
    category?: string | null
    confidence_score?: number
    raw_text?: string | null
    processed_at?: Date | string
  }

  export type OCRResultUncheckedCreateWithoutClaimsInput = {
    id?: string
    receipt_file_name: string
    receipt_file_type: string
    receipt_file_size: number
    vendor_name?: string | null
    amount?: Decimal | DecimalJsLike | number | string | null
    receipt_date?: Date | string | null
    category?: string | null
    confidence_score?: number
    raw_text?: string | null
    processed_at?: Date | string
  }

  export type OCRResultCreateOrConnectWithoutClaimsInput = {
    where: OCRResultWhereUniqueInput
    create: XOR<OCRResultCreateWithoutClaimsInput, OCRResultUncheckedCreateWithoutClaimsInput>
  }

  export type PolicyCheckCreateWithoutClaimInput = {
    id?: string
    rule_id: string
    rule_name: string
    passed: boolean
    message?: string | null
    checked_at?: Date | string
  }

  export type PolicyCheckUncheckedCreateWithoutClaimInput = {
    id?: string
    rule_id: string
    rule_name: string
    passed: boolean
    message?: string | null
    checked_at?: Date | string
  }

  export type PolicyCheckCreateOrConnectWithoutClaimInput = {
    where: PolicyCheckWhereUniqueInput
    create: XOR<PolicyCheckCreateWithoutClaimInput, PolicyCheckUncheckedCreateWithoutClaimInput>
  }

  export type PolicyCheckCreateManyClaimInputEnvelope = {
    data: PolicyCheckCreateManyClaimInput | PolicyCheckCreateManyClaimInput[]
    skipDuplicates?: boolean
  }

  export type OCRResultUpsertWithoutClaimsInput = {
    update: XOR<OCRResultUpdateWithoutClaimsInput, OCRResultUncheckedUpdateWithoutClaimsInput>
    create: XOR<OCRResultCreateWithoutClaimsInput, OCRResultUncheckedCreateWithoutClaimsInput>
    where?: OCRResultWhereInput
  }

  export type OCRResultUpdateToOneWithWhereWithoutClaimsInput = {
    where?: OCRResultWhereInput
    data: XOR<OCRResultUpdateWithoutClaimsInput, OCRResultUncheckedUpdateWithoutClaimsInput>
  }

  export type OCRResultUpdateWithoutClaimsInput = {
    id?: StringFieldUpdateOperationsInput | string
    receipt_file_name?: StringFieldUpdateOperationsInput | string
    receipt_file_type?: StringFieldUpdateOperationsInput | string
    receipt_file_size?: IntFieldUpdateOperationsInput | number
    vendor_name?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    receipt_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    confidence_score?: FloatFieldUpdateOperationsInput | number
    raw_text?: NullableStringFieldUpdateOperationsInput | string | null
    processed_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OCRResultUncheckedUpdateWithoutClaimsInput = {
    id?: StringFieldUpdateOperationsInput | string
    receipt_file_name?: StringFieldUpdateOperationsInput | string
    receipt_file_type?: StringFieldUpdateOperationsInput | string
    receipt_file_size?: IntFieldUpdateOperationsInput | number
    vendor_name?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    receipt_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    confidence_score?: FloatFieldUpdateOperationsInput | number
    raw_text?: NullableStringFieldUpdateOperationsInput | string | null
    processed_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PolicyCheckUpsertWithWhereUniqueWithoutClaimInput = {
    where: PolicyCheckWhereUniqueInput
    update: XOR<PolicyCheckUpdateWithoutClaimInput, PolicyCheckUncheckedUpdateWithoutClaimInput>
    create: XOR<PolicyCheckCreateWithoutClaimInput, PolicyCheckUncheckedCreateWithoutClaimInput>
  }

  export type PolicyCheckUpdateWithWhereUniqueWithoutClaimInput = {
    where: PolicyCheckWhereUniqueInput
    data: XOR<PolicyCheckUpdateWithoutClaimInput, PolicyCheckUncheckedUpdateWithoutClaimInput>
  }

  export type PolicyCheckUpdateManyWithWhereWithoutClaimInput = {
    where: PolicyCheckScalarWhereInput
    data: XOR<PolicyCheckUpdateManyMutationInput, PolicyCheckUncheckedUpdateManyWithoutClaimInput>
  }

  export type PolicyCheckScalarWhereInput = {
    AND?: PolicyCheckScalarWhereInput | PolicyCheckScalarWhereInput[]
    OR?: PolicyCheckScalarWhereInput[]
    NOT?: PolicyCheckScalarWhereInput | PolicyCheckScalarWhereInput[]
    id?: StringFilter<"PolicyCheck"> | string
    claim_id?: StringFilter<"PolicyCheck"> | string
    rule_id?: StringFilter<"PolicyCheck"> | string
    rule_name?: StringFilter<"PolicyCheck"> | string
    passed?: BoolFilter<"PolicyCheck"> | boolean
    message?: StringNullableFilter<"PolicyCheck"> | string | null
    checked_at?: DateTimeFilter<"PolicyCheck"> | Date | string
  }

  export type ClaimRequestCreateWithoutOcr_resultInput = {
    id?: string
    employee_id: string
    receipt_id?: string | null
    category: string
    amount: Decimal | DecimalJsLike | number | string
    currency?: string
    description?: string | null
    status?: string
    auto_approved?: boolean
    approved_by?: string | null
    approved_at?: Date | string | null
    rejected_by?: string | null
    rejected_reason?: string | null
    submitted_at?: Date | string | null
    requires_finance_approval?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    policy_checks?: PolicyCheckCreateNestedManyWithoutClaimInput
  }

  export type ClaimRequestUncheckedCreateWithoutOcr_resultInput = {
    id?: string
    employee_id: string
    receipt_id?: string | null
    category: string
    amount: Decimal | DecimalJsLike | number | string
    currency?: string
    description?: string | null
    status?: string
    auto_approved?: boolean
    approved_by?: string | null
    approved_at?: Date | string | null
    rejected_by?: string | null
    rejected_reason?: string | null
    submitted_at?: Date | string | null
    requires_finance_approval?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    policy_checks?: PolicyCheckUncheckedCreateNestedManyWithoutClaimInput
  }

  export type ClaimRequestCreateOrConnectWithoutOcr_resultInput = {
    where: ClaimRequestWhereUniqueInput
    create: XOR<ClaimRequestCreateWithoutOcr_resultInput, ClaimRequestUncheckedCreateWithoutOcr_resultInput>
  }

  export type ClaimRequestCreateManyOcr_resultInputEnvelope = {
    data: ClaimRequestCreateManyOcr_resultInput | ClaimRequestCreateManyOcr_resultInput[]
    skipDuplicates?: boolean
  }

  export type ClaimRequestUpsertWithWhereUniqueWithoutOcr_resultInput = {
    where: ClaimRequestWhereUniqueInput
    update: XOR<ClaimRequestUpdateWithoutOcr_resultInput, ClaimRequestUncheckedUpdateWithoutOcr_resultInput>
    create: XOR<ClaimRequestCreateWithoutOcr_resultInput, ClaimRequestUncheckedCreateWithoutOcr_resultInput>
  }

  export type ClaimRequestUpdateWithWhereUniqueWithoutOcr_resultInput = {
    where: ClaimRequestWhereUniqueInput
    data: XOR<ClaimRequestUpdateWithoutOcr_resultInput, ClaimRequestUncheckedUpdateWithoutOcr_resultInput>
  }

  export type ClaimRequestUpdateManyWithWhereWithoutOcr_resultInput = {
    where: ClaimRequestScalarWhereInput
    data: XOR<ClaimRequestUpdateManyMutationInput, ClaimRequestUncheckedUpdateManyWithoutOcr_resultInput>
  }

  export type ClaimRequestScalarWhereInput = {
    AND?: ClaimRequestScalarWhereInput | ClaimRequestScalarWhereInput[]
    OR?: ClaimRequestScalarWhereInput[]
    NOT?: ClaimRequestScalarWhereInput | ClaimRequestScalarWhereInput[]
    id?: StringFilter<"ClaimRequest"> | string
    employee_id?: StringFilter<"ClaimRequest"> | string
    receipt_id?: StringNullableFilter<"ClaimRequest"> | string | null
    category?: StringFilter<"ClaimRequest"> | string
    amount?: DecimalFilter<"ClaimRequest"> | Decimal | DecimalJsLike | number | string
    currency?: StringFilter<"ClaimRequest"> | string
    description?: StringNullableFilter<"ClaimRequest"> | string | null
    status?: StringFilter<"ClaimRequest"> | string
    auto_approved?: BoolFilter<"ClaimRequest"> | boolean
    approved_by?: StringNullableFilter<"ClaimRequest"> | string | null
    approved_at?: DateTimeNullableFilter<"ClaimRequest"> | Date | string | null
    rejected_by?: StringNullableFilter<"ClaimRequest"> | string | null
    rejected_reason?: StringNullableFilter<"ClaimRequest"> | string | null
    submitted_at?: DateTimeNullableFilter<"ClaimRequest"> | Date | string | null
    ocr_result_id?: StringNullableFilter<"ClaimRequest"> | string | null
    requires_finance_approval?: BoolFilter<"ClaimRequest"> | boolean
    created_at?: DateTimeFilter<"ClaimRequest"> | Date | string
    updated_at?: DateTimeFilter<"ClaimRequest"> | Date | string
  }

  export type ClaimRequestCreateWithoutPolicy_checksInput = {
    id?: string
    employee_id: string
    receipt_id?: string | null
    category: string
    amount: Decimal | DecimalJsLike | number | string
    currency?: string
    description?: string | null
    status?: string
    auto_approved?: boolean
    approved_by?: string | null
    approved_at?: Date | string | null
    rejected_by?: string | null
    rejected_reason?: string | null
    submitted_at?: Date | string | null
    requires_finance_approval?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    ocr_result?: OCRResultCreateNestedOneWithoutClaimsInput
  }

  export type ClaimRequestUncheckedCreateWithoutPolicy_checksInput = {
    id?: string
    employee_id: string
    receipt_id?: string | null
    category: string
    amount: Decimal | DecimalJsLike | number | string
    currency?: string
    description?: string | null
    status?: string
    auto_approved?: boolean
    approved_by?: string | null
    approved_at?: Date | string | null
    rejected_by?: string | null
    rejected_reason?: string | null
    submitted_at?: Date | string | null
    ocr_result_id?: string | null
    requires_finance_approval?: boolean
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type ClaimRequestCreateOrConnectWithoutPolicy_checksInput = {
    where: ClaimRequestWhereUniqueInput
    create: XOR<ClaimRequestCreateWithoutPolicy_checksInput, ClaimRequestUncheckedCreateWithoutPolicy_checksInput>
  }

  export type ClaimRequestUpsertWithoutPolicy_checksInput = {
    update: XOR<ClaimRequestUpdateWithoutPolicy_checksInput, ClaimRequestUncheckedUpdateWithoutPolicy_checksInput>
    create: XOR<ClaimRequestCreateWithoutPolicy_checksInput, ClaimRequestUncheckedCreateWithoutPolicy_checksInput>
    where?: ClaimRequestWhereInput
  }

  export type ClaimRequestUpdateToOneWithWhereWithoutPolicy_checksInput = {
    where?: ClaimRequestWhereInput
    data: XOR<ClaimRequestUpdateWithoutPolicy_checksInput, ClaimRequestUncheckedUpdateWithoutPolicy_checksInput>
  }

  export type ClaimRequestUpdateWithoutPolicy_checksInput = {
    id?: StringFieldUpdateOperationsInput | string
    employee_id?: StringFieldUpdateOperationsInput | string
    receipt_id?: NullableStringFieldUpdateOperationsInput | string | null
    category?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    currency?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    auto_approved?: BoolFieldUpdateOperationsInput | boolean
    approved_by?: NullableStringFieldUpdateOperationsInput | string | null
    approved_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rejected_by?: NullableStringFieldUpdateOperationsInput | string | null
    rejected_reason?: NullableStringFieldUpdateOperationsInput | string | null
    submitted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    requires_finance_approval?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    ocr_result?: OCRResultUpdateOneWithoutClaimsNestedInput
  }

  export type ClaimRequestUncheckedUpdateWithoutPolicy_checksInput = {
    id?: StringFieldUpdateOperationsInput | string
    employee_id?: StringFieldUpdateOperationsInput | string
    receipt_id?: NullableStringFieldUpdateOperationsInput | string | null
    category?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    currency?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    auto_approved?: BoolFieldUpdateOperationsInput | boolean
    approved_by?: NullableStringFieldUpdateOperationsInput | string | null
    approved_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rejected_by?: NullableStringFieldUpdateOperationsInput | string | null
    rejected_reason?: NullableStringFieldUpdateOperationsInput | string | null
    submitted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ocr_result_id?: NullableStringFieldUpdateOperationsInput | string | null
    requires_finance_approval?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BenefitEnrollmentCreateManyPlanInput = {
    id?: string
    employee_id: string
    coverage_level: string
    status?: string
    enrolled_at?: Date | string
    effective_date: Date | string
    end_date?: Date | string | null
    cancelled_at?: Date | string | null
    cancellation_reason?: string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type BenefitEnrollmentUpdateWithoutPlanInput = {
    id?: StringFieldUpdateOperationsInput | string
    employee_id?: StringFieldUpdateOperationsInput | string
    coverage_level?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    enrolled_at?: DateTimeFieldUpdateOperationsInput | Date | string
    effective_date?: DateTimeFieldUpdateOperationsInput | Date | string
    end_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cancelled_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cancellation_reason?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    dependents?: BenefitDependentUpdateManyWithoutEnrollmentNestedInput
  }

  export type BenefitEnrollmentUncheckedUpdateWithoutPlanInput = {
    id?: StringFieldUpdateOperationsInput | string
    employee_id?: StringFieldUpdateOperationsInput | string
    coverage_level?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    enrolled_at?: DateTimeFieldUpdateOperationsInput | Date | string
    effective_date?: DateTimeFieldUpdateOperationsInput | Date | string
    end_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cancelled_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cancellation_reason?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    dependents?: BenefitDependentUncheckedUpdateManyWithoutEnrollmentNestedInput
  }

  export type BenefitEnrollmentUncheckedUpdateManyWithoutPlanInput = {
    id?: StringFieldUpdateOperationsInput | string
    employee_id?: StringFieldUpdateOperationsInput | string
    coverage_level?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    enrolled_at?: DateTimeFieldUpdateOperationsInput | Date | string
    effective_date?: DateTimeFieldUpdateOperationsInput | Date | string
    end_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cancelled_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cancellation_reason?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BenefitDependentCreateManyEnrollmentInput = {
    id?: string
    name: string
    relationship: string
    date_of_birth?: Date | string | null
    national_id?: string | null
    is_active?: boolean
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type BenefitDependentUpdateWithoutEnrollmentInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    relationship?: StringFieldUpdateOperationsInput | string
    date_of_birth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    national_id?: NullableStringFieldUpdateOperationsInput | string | null
    is_active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BenefitDependentUncheckedUpdateWithoutEnrollmentInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    relationship?: StringFieldUpdateOperationsInput | string
    date_of_birth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    national_id?: NullableStringFieldUpdateOperationsInput | string | null
    is_active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BenefitDependentUncheckedUpdateManyWithoutEnrollmentInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    relationship?: StringFieldUpdateOperationsInput | string
    date_of_birth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    national_id?: NullableStringFieldUpdateOperationsInput | string | null
    is_active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PolicyCheckCreateManyClaimInput = {
    id?: string
    rule_id: string
    rule_name: string
    passed: boolean
    message?: string | null
    checked_at?: Date | string
  }

  export type PolicyCheckUpdateWithoutClaimInput = {
    id?: StringFieldUpdateOperationsInput | string
    rule_id?: StringFieldUpdateOperationsInput | string
    rule_name?: StringFieldUpdateOperationsInput | string
    passed?: BoolFieldUpdateOperationsInput | boolean
    message?: NullableStringFieldUpdateOperationsInput | string | null
    checked_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PolicyCheckUncheckedUpdateWithoutClaimInput = {
    id?: StringFieldUpdateOperationsInput | string
    rule_id?: StringFieldUpdateOperationsInput | string
    rule_name?: StringFieldUpdateOperationsInput | string
    passed?: BoolFieldUpdateOperationsInput | boolean
    message?: NullableStringFieldUpdateOperationsInput | string | null
    checked_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PolicyCheckUncheckedUpdateManyWithoutClaimInput = {
    id?: StringFieldUpdateOperationsInput | string
    rule_id?: StringFieldUpdateOperationsInput | string
    rule_name?: StringFieldUpdateOperationsInput | string
    passed?: BoolFieldUpdateOperationsInput | boolean
    message?: NullableStringFieldUpdateOperationsInput | string | null
    checked_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClaimRequestCreateManyOcr_resultInput = {
    id?: string
    employee_id: string
    receipt_id?: string | null
    category: string
    amount: Decimal | DecimalJsLike | number | string
    currency?: string
    description?: string | null
    status?: string
    auto_approved?: boolean
    approved_by?: string | null
    approved_at?: Date | string | null
    rejected_by?: string | null
    rejected_reason?: string | null
    submitted_at?: Date | string | null
    requires_finance_approval?: boolean
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type ClaimRequestUpdateWithoutOcr_resultInput = {
    id?: StringFieldUpdateOperationsInput | string
    employee_id?: StringFieldUpdateOperationsInput | string
    receipt_id?: NullableStringFieldUpdateOperationsInput | string | null
    category?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    currency?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    auto_approved?: BoolFieldUpdateOperationsInput | boolean
    approved_by?: NullableStringFieldUpdateOperationsInput | string | null
    approved_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rejected_by?: NullableStringFieldUpdateOperationsInput | string | null
    rejected_reason?: NullableStringFieldUpdateOperationsInput | string | null
    submitted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    requires_finance_approval?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    policy_checks?: PolicyCheckUpdateManyWithoutClaimNestedInput
  }

  export type ClaimRequestUncheckedUpdateWithoutOcr_resultInput = {
    id?: StringFieldUpdateOperationsInput | string
    employee_id?: StringFieldUpdateOperationsInput | string
    receipt_id?: NullableStringFieldUpdateOperationsInput | string | null
    category?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    currency?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    auto_approved?: BoolFieldUpdateOperationsInput | boolean
    approved_by?: NullableStringFieldUpdateOperationsInput | string | null
    approved_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rejected_by?: NullableStringFieldUpdateOperationsInput | string | null
    rejected_reason?: NullableStringFieldUpdateOperationsInput | string | null
    submitted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    requires_finance_approval?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    policy_checks?: PolicyCheckUncheckedUpdateManyWithoutClaimNestedInput
  }

  export type ClaimRequestUncheckedUpdateManyWithoutOcr_resultInput = {
    id?: StringFieldUpdateOperationsInput | string
    employee_id?: StringFieldUpdateOperationsInput | string
    receipt_id?: NullableStringFieldUpdateOperationsInput | string | null
    category?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    currency?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    auto_approved?: BoolFieldUpdateOperationsInput | boolean
    approved_by?: NullableStringFieldUpdateOperationsInput | string | null
    approved_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rejected_by?: NullableStringFieldUpdateOperationsInput | string | null
    rejected_reason?: NullableStringFieldUpdateOperationsInput | string | null
    submitted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    requires_finance_approval?: BoolFieldUpdateOperationsInput | boolean
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