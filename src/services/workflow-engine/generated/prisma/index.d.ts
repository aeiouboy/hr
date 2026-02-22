
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
 * Model Workflow
 * 
 */
export type Workflow = $Result.DefaultSelection<Prisma.$WorkflowPayload>
/**
 * Model WorkflowStep
 * 
 */
export type WorkflowStep = $Result.DefaultSelection<Prisma.$WorkflowStepPayload>
/**
 * Model ApprovalAction
 * 
 */
export type ApprovalAction = $Result.DefaultSelection<Prisma.$ApprovalActionPayload>
/**
 * Model Delegation
 * 
 */
export type Delegation = $Result.DefaultSelection<Prisma.$DelegationPayload>
/**
 * Model ApprovalDelegation
 * 
 */
export type ApprovalDelegation = $Result.DefaultSelection<Prisma.$ApprovalDelegationPayload>
/**
 * Model AuditLog
 * 
 */
export type AuditLog = $Result.DefaultSelection<Prisma.$AuditLogPayload>
/**
 * Model PolicyRule
 * 
 */
export type PolicyRule = $Result.DefaultSelection<Prisma.$PolicyRulePayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Workflows
 * const workflows = await prisma.workflow.findMany()
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
   * // Fetch zero or more Workflows
   * const workflows = await prisma.workflow.findMany()
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
   * `prisma.workflow`: Exposes CRUD operations for the **Workflow** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Workflows
    * const workflows = await prisma.workflow.findMany()
    * ```
    */
  get workflow(): Prisma.WorkflowDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.workflowStep`: Exposes CRUD operations for the **WorkflowStep** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more WorkflowSteps
    * const workflowSteps = await prisma.workflowStep.findMany()
    * ```
    */
  get workflowStep(): Prisma.WorkflowStepDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.approvalAction`: Exposes CRUD operations for the **ApprovalAction** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ApprovalActions
    * const approvalActions = await prisma.approvalAction.findMany()
    * ```
    */
  get approvalAction(): Prisma.ApprovalActionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.delegation`: Exposes CRUD operations for the **Delegation** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Delegations
    * const delegations = await prisma.delegation.findMany()
    * ```
    */
  get delegation(): Prisma.DelegationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.approvalDelegation`: Exposes CRUD operations for the **ApprovalDelegation** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ApprovalDelegations
    * const approvalDelegations = await prisma.approvalDelegation.findMany()
    * ```
    */
  get approvalDelegation(): Prisma.ApprovalDelegationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.auditLog`: Exposes CRUD operations for the **AuditLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AuditLogs
    * const auditLogs = await prisma.auditLog.findMany()
    * ```
    */
  get auditLog(): Prisma.AuditLogDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.policyRule`: Exposes CRUD operations for the **PolicyRule** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PolicyRules
    * const policyRules = await prisma.policyRule.findMany()
    * ```
    */
  get policyRule(): Prisma.PolicyRuleDelegate<ExtArgs, ClientOptions>;
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
    Workflow: 'Workflow',
    WorkflowStep: 'WorkflowStep',
    ApprovalAction: 'ApprovalAction',
    Delegation: 'Delegation',
    ApprovalDelegation: 'ApprovalDelegation',
    AuditLog: 'AuditLog',
    PolicyRule: 'PolicyRule'
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
      modelProps: "workflow" | "workflowStep" | "approvalAction" | "delegation" | "approvalDelegation" | "auditLog" | "policyRule"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Workflow: {
        payload: Prisma.$WorkflowPayload<ExtArgs>
        fields: Prisma.WorkflowFieldRefs
        operations: {
          findUnique: {
            args: Prisma.WorkflowFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkflowPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.WorkflowFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkflowPayload>
          }
          findFirst: {
            args: Prisma.WorkflowFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkflowPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.WorkflowFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkflowPayload>
          }
          findMany: {
            args: Prisma.WorkflowFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkflowPayload>[]
          }
          create: {
            args: Prisma.WorkflowCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkflowPayload>
          }
          createMany: {
            args: Prisma.WorkflowCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.WorkflowCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkflowPayload>[]
          }
          delete: {
            args: Prisma.WorkflowDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkflowPayload>
          }
          update: {
            args: Prisma.WorkflowUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkflowPayload>
          }
          deleteMany: {
            args: Prisma.WorkflowDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.WorkflowUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.WorkflowUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkflowPayload>[]
          }
          upsert: {
            args: Prisma.WorkflowUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkflowPayload>
          }
          aggregate: {
            args: Prisma.WorkflowAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateWorkflow>
          }
          groupBy: {
            args: Prisma.WorkflowGroupByArgs<ExtArgs>
            result: $Utils.Optional<WorkflowGroupByOutputType>[]
          }
          count: {
            args: Prisma.WorkflowCountArgs<ExtArgs>
            result: $Utils.Optional<WorkflowCountAggregateOutputType> | number
          }
        }
      }
      WorkflowStep: {
        payload: Prisma.$WorkflowStepPayload<ExtArgs>
        fields: Prisma.WorkflowStepFieldRefs
        operations: {
          findUnique: {
            args: Prisma.WorkflowStepFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkflowStepPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.WorkflowStepFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkflowStepPayload>
          }
          findFirst: {
            args: Prisma.WorkflowStepFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkflowStepPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.WorkflowStepFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkflowStepPayload>
          }
          findMany: {
            args: Prisma.WorkflowStepFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkflowStepPayload>[]
          }
          create: {
            args: Prisma.WorkflowStepCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkflowStepPayload>
          }
          createMany: {
            args: Prisma.WorkflowStepCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.WorkflowStepCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkflowStepPayload>[]
          }
          delete: {
            args: Prisma.WorkflowStepDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkflowStepPayload>
          }
          update: {
            args: Prisma.WorkflowStepUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkflowStepPayload>
          }
          deleteMany: {
            args: Prisma.WorkflowStepDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.WorkflowStepUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.WorkflowStepUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkflowStepPayload>[]
          }
          upsert: {
            args: Prisma.WorkflowStepUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkflowStepPayload>
          }
          aggregate: {
            args: Prisma.WorkflowStepAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateWorkflowStep>
          }
          groupBy: {
            args: Prisma.WorkflowStepGroupByArgs<ExtArgs>
            result: $Utils.Optional<WorkflowStepGroupByOutputType>[]
          }
          count: {
            args: Prisma.WorkflowStepCountArgs<ExtArgs>
            result: $Utils.Optional<WorkflowStepCountAggregateOutputType> | number
          }
        }
      }
      ApprovalAction: {
        payload: Prisma.$ApprovalActionPayload<ExtArgs>
        fields: Prisma.ApprovalActionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ApprovalActionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApprovalActionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ApprovalActionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApprovalActionPayload>
          }
          findFirst: {
            args: Prisma.ApprovalActionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApprovalActionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ApprovalActionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApprovalActionPayload>
          }
          findMany: {
            args: Prisma.ApprovalActionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApprovalActionPayload>[]
          }
          create: {
            args: Prisma.ApprovalActionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApprovalActionPayload>
          }
          createMany: {
            args: Prisma.ApprovalActionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ApprovalActionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApprovalActionPayload>[]
          }
          delete: {
            args: Prisma.ApprovalActionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApprovalActionPayload>
          }
          update: {
            args: Prisma.ApprovalActionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApprovalActionPayload>
          }
          deleteMany: {
            args: Prisma.ApprovalActionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ApprovalActionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ApprovalActionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApprovalActionPayload>[]
          }
          upsert: {
            args: Prisma.ApprovalActionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApprovalActionPayload>
          }
          aggregate: {
            args: Prisma.ApprovalActionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateApprovalAction>
          }
          groupBy: {
            args: Prisma.ApprovalActionGroupByArgs<ExtArgs>
            result: $Utils.Optional<ApprovalActionGroupByOutputType>[]
          }
          count: {
            args: Prisma.ApprovalActionCountArgs<ExtArgs>
            result: $Utils.Optional<ApprovalActionCountAggregateOutputType> | number
          }
        }
      }
      Delegation: {
        payload: Prisma.$DelegationPayload<ExtArgs>
        fields: Prisma.DelegationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DelegationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DelegationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DelegationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DelegationPayload>
          }
          findFirst: {
            args: Prisma.DelegationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DelegationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DelegationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DelegationPayload>
          }
          findMany: {
            args: Prisma.DelegationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DelegationPayload>[]
          }
          create: {
            args: Prisma.DelegationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DelegationPayload>
          }
          createMany: {
            args: Prisma.DelegationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DelegationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DelegationPayload>[]
          }
          delete: {
            args: Prisma.DelegationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DelegationPayload>
          }
          update: {
            args: Prisma.DelegationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DelegationPayload>
          }
          deleteMany: {
            args: Prisma.DelegationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DelegationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.DelegationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DelegationPayload>[]
          }
          upsert: {
            args: Prisma.DelegationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DelegationPayload>
          }
          aggregate: {
            args: Prisma.DelegationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDelegation>
          }
          groupBy: {
            args: Prisma.DelegationGroupByArgs<ExtArgs>
            result: $Utils.Optional<DelegationGroupByOutputType>[]
          }
          count: {
            args: Prisma.DelegationCountArgs<ExtArgs>
            result: $Utils.Optional<DelegationCountAggregateOutputType> | number
          }
        }
      }
      ApprovalDelegation: {
        payload: Prisma.$ApprovalDelegationPayload<ExtArgs>
        fields: Prisma.ApprovalDelegationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ApprovalDelegationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApprovalDelegationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ApprovalDelegationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApprovalDelegationPayload>
          }
          findFirst: {
            args: Prisma.ApprovalDelegationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApprovalDelegationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ApprovalDelegationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApprovalDelegationPayload>
          }
          findMany: {
            args: Prisma.ApprovalDelegationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApprovalDelegationPayload>[]
          }
          create: {
            args: Prisma.ApprovalDelegationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApprovalDelegationPayload>
          }
          createMany: {
            args: Prisma.ApprovalDelegationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ApprovalDelegationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApprovalDelegationPayload>[]
          }
          delete: {
            args: Prisma.ApprovalDelegationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApprovalDelegationPayload>
          }
          update: {
            args: Prisma.ApprovalDelegationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApprovalDelegationPayload>
          }
          deleteMany: {
            args: Prisma.ApprovalDelegationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ApprovalDelegationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ApprovalDelegationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApprovalDelegationPayload>[]
          }
          upsert: {
            args: Prisma.ApprovalDelegationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApprovalDelegationPayload>
          }
          aggregate: {
            args: Prisma.ApprovalDelegationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateApprovalDelegation>
          }
          groupBy: {
            args: Prisma.ApprovalDelegationGroupByArgs<ExtArgs>
            result: $Utils.Optional<ApprovalDelegationGroupByOutputType>[]
          }
          count: {
            args: Prisma.ApprovalDelegationCountArgs<ExtArgs>
            result: $Utils.Optional<ApprovalDelegationCountAggregateOutputType> | number
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
    workflow?: WorkflowOmit
    workflowStep?: WorkflowStepOmit
    approvalAction?: ApprovalActionOmit
    delegation?: DelegationOmit
    approvalDelegation?: ApprovalDelegationOmit
    auditLog?: AuditLogOmit
    policyRule?: PolicyRuleOmit
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
   * Count Type WorkflowCountOutputType
   */

  export type WorkflowCountOutputType = {
    steps: number
  }

  export type WorkflowCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    steps?: boolean | WorkflowCountOutputTypeCountStepsArgs
  }

  // Custom InputTypes
  /**
   * WorkflowCountOutputType without action
   */
  export type WorkflowCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkflowCountOutputType
     */
    select?: WorkflowCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * WorkflowCountOutputType without action
   */
  export type WorkflowCountOutputTypeCountStepsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WorkflowStepWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Workflow
   */

  export type AggregateWorkflow = {
    _count: WorkflowCountAggregateOutputType | null
    _avg: WorkflowAvgAggregateOutputType | null
    _sum: WorkflowSumAggregateOutputType | null
    _min: WorkflowMinAggregateOutputType | null
    _max: WorkflowMaxAggregateOutputType | null
  }

  export type WorkflowAvgAggregateOutputType = {
    current_step: number | null
    total_steps: number | null
  }

  export type WorkflowSumAggregateOutputType = {
    current_step: number | null
    total_steps: number | null
  }

  export type WorkflowMinAggregateOutputType = {
    id: string | null
    change_type: string | null
    section: string | null
    status: string | null
    requested_by: string | null
    requester_name: string | null
    effective_date: Date | null
    current_step: number | null
    total_steps: number | null
    old_values: string | null
    new_values: string | null
    created_at: Date | null
    updated_at: Date | null
    completed_at: Date | null
  }

  export type WorkflowMaxAggregateOutputType = {
    id: string | null
    change_type: string | null
    section: string | null
    status: string | null
    requested_by: string | null
    requester_name: string | null
    effective_date: Date | null
    current_step: number | null
    total_steps: number | null
    old_values: string | null
    new_values: string | null
    created_at: Date | null
    updated_at: Date | null
    completed_at: Date | null
  }

  export type WorkflowCountAggregateOutputType = {
    id: number
    change_type: number
    section: number
    status: number
    requested_by: number
    requester_name: number
    effective_date: number
    current_step: number
    total_steps: number
    old_values: number
    new_values: number
    created_at: number
    updated_at: number
    completed_at: number
    _all: number
  }


  export type WorkflowAvgAggregateInputType = {
    current_step?: true
    total_steps?: true
  }

  export type WorkflowSumAggregateInputType = {
    current_step?: true
    total_steps?: true
  }

  export type WorkflowMinAggregateInputType = {
    id?: true
    change_type?: true
    section?: true
    status?: true
    requested_by?: true
    requester_name?: true
    effective_date?: true
    current_step?: true
    total_steps?: true
    old_values?: true
    new_values?: true
    created_at?: true
    updated_at?: true
    completed_at?: true
  }

  export type WorkflowMaxAggregateInputType = {
    id?: true
    change_type?: true
    section?: true
    status?: true
    requested_by?: true
    requester_name?: true
    effective_date?: true
    current_step?: true
    total_steps?: true
    old_values?: true
    new_values?: true
    created_at?: true
    updated_at?: true
    completed_at?: true
  }

  export type WorkflowCountAggregateInputType = {
    id?: true
    change_type?: true
    section?: true
    status?: true
    requested_by?: true
    requester_name?: true
    effective_date?: true
    current_step?: true
    total_steps?: true
    old_values?: true
    new_values?: true
    created_at?: true
    updated_at?: true
    completed_at?: true
    _all?: true
  }

  export type WorkflowAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Workflow to aggregate.
     */
    where?: WorkflowWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Workflows to fetch.
     */
    orderBy?: WorkflowOrderByWithRelationInput | WorkflowOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: WorkflowWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Workflows from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Workflows.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Workflows
    **/
    _count?: true | WorkflowCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: WorkflowAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: WorkflowSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: WorkflowMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: WorkflowMaxAggregateInputType
  }

  export type GetWorkflowAggregateType<T extends WorkflowAggregateArgs> = {
        [P in keyof T & keyof AggregateWorkflow]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateWorkflow[P]>
      : GetScalarType<T[P], AggregateWorkflow[P]>
  }




  export type WorkflowGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WorkflowWhereInput
    orderBy?: WorkflowOrderByWithAggregationInput | WorkflowOrderByWithAggregationInput[]
    by: WorkflowScalarFieldEnum[] | WorkflowScalarFieldEnum
    having?: WorkflowScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: WorkflowCountAggregateInputType | true
    _avg?: WorkflowAvgAggregateInputType
    _sum?: WorkflowSumAggregateInputType
    _min?: WorkflowMinAggregateInputType
    _max?: WorkflowMaxAggregateInputType
  }

  export type WorkflowGroupByOutputType = {
    id: string
    change_type: string
    section: string | null
    status: string
    requested_by: string
    requester_name: string | null
    effective_date: Date | null
    current_step: number
    total_steps: number
    old_values: string | null
    new_values: string | null
    created_at: Date
    updated_at: Date
    completed_at: Date | null
    _count: WorkflowCountAggregateOutputType | null
    _avg: WorkflowAvgAggregateOutputType | null
    _sum: WorkflowSumAggregateOutputType | null
    _min: WorkflowMinAggregateOutputType | null
    _max: WorkflowMaxAggregateOutputType | null
  }

  type GetWorkflowGroupByPayload<T extends WorkflowGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<WorkflowGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof WorkflowGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], WorkflowGroupByOutputType[P]>
            : GetScalarType<T[P], WorkflowGroupByOutputType[P]>
        }
      >
    >


  export type WorkflowSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    change_type?: boolean
    section?: boolean
    status?: boolean
    requested_by?: boolean
    requester_name?: boolean
    effective_date?: boolean
    current_step?: boolean
    total_steps?: boolean
    old_values?: boolean
    new_values?: boolean
    created_at?: boolean
    updated_at?: boolean
    completed_at?: boolean
    steps?: boolean | Workflow$stepsArgs<ExtArgs>
    _count?: boolean | WorkflowCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["workflow"]>

  export type WorkflowSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    change_type?: boolean
    section?: boolean
    status?: boolean
    requested_by?: boolean
    requester_name?: boolean
    effective_date?: boolean
    current_step?: boolean
    total_steps?: boolean
    old_values?: boolean
    new_values?: boolean
    created_at?: boolean
    updated_at?: boolean
    completed_at?: boolean
  }, ExtArgs["result"]["workflow"]>

  export type WorkflowSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    change_type?: boolean
    section?: boolean
    status?: boolean
    requested_by?: boolean
    requester_name?: boolean
    effective_date?: boolean
    current_step?: boolean
    total_steps?: boolean
    old_values?: boolean
    new_values?: boolean
    created_at?: boolean
    updated_at?: boolean
    completed_at?: boolean
  }, ExtArgs["result"]["workflow"]>

  export type WorkflowSelectScalar = {
    id?: boolean
    change_type?: boolean
    section?: boolean
    status?: boolean
    requested_by?: boolean
    requester_name?: boolean
    effective_date?: boolean
    current_step?: boolean
    total_steps?: boolean
    old_values?: boolean
    new_values?: boolean
    created_at?: boolean
    updated_at?: boolean
    completed_at?: boolean
  }

  export type WorkflowOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "change_type" | "section" | "status" | "requested_by" | "requester_name" | "effective_date" | "current_step" | "total_steps" | "old_values" | "new_values" | "created_at" | "updated_at" | "completed_at", ExtArgs["result"]["workflow"]>
  export type WorkflowInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    steps?: boolean | Workflow$stepsArgs<ExtArgs>
    _count?: boolean | WorkflowCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type WorkflowIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type WorkflowIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $WorkflowPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Workflow"
    objects: {
      steps: Prisma.$WorkflowStepPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      change_type: string
      section: string | null
      status: string
      requested_by: string
      requester_name: string | null
      effective_date: Date | null
      current_step: number
      total_steps: number
      old_values: string | null
      new_values: string | null
      created_at: Date
      updated_at: Date
      completed_at: Date | null
    }, ExtArgs["result"]["workflow"]>
    composites: {}
  }

  type WorkflowGetPayload<S extends boolean | null | undefined | WorkflowDefaultArgs> = $Result.GetResult<Prisma.$WorkflowPayload, S>

  type WorkflowCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<WorkflowFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: WorkflowCountAggregateInputType | true
    }

  export interface WorkflowDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Workflow'], meta: { name: 'Workflow' } }
    /**
     * Find zero or one Workflow that matches the filter.
     * @param {WorkflowFindUniqueArgs} args - Arguments to find a Workflow
     * @example
     * // Get one Workflow
     * const workflow = await prisma.workflow.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends WorkflowFindUniqueArgs>(args: SelectSubset<T, WorkflowFindUniqueArgs<ExtArgs>>): Prisma__WorkflowClient<$Result.GetResult<Prisma.$WorkflowPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Workflow that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {WorkflowFindUniqueOrThrowArgs} args - Arguments to find a Workflow
     * @example
     * // Get one Workflow
     * const workflow = await prisma.workflow.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends WorkflowFindUniqueOrThrowArgs>(args: SelectSubset<T, WorkflowFindUniqueOrThrowArgs<ExtArgs>>): Prisma__WorkflowClient<$Result.GetResult<Prisma.$WorkflowPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Workflow that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkflowFindFirstArgs} args - Arguments to find a Workflow
     * @example
     * // Get one Workflow
     * const workflow = await prisma.workflow.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends WorkflowFindFirstArgs>(args?: SelectSubset<T, WorkflowFindFirstArgs<ExtArgs>>): Prisma__WorkflowClient<$Result.GetResult<Prisma.$WorkflowPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Workflow that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkflowFindFirstOrThrowArgs} args - Arguments to find a Workflow
     * @example
     * // Get one Workflow
     * const workflow = await prisma.workflow.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends WorkflowFindFirstOrThrowArgs>(args?: SelectSubset<T, WorkflowFindFirstOrThrowArgs<ExtArgs>>): Prisma__WorkflowClient<$Result.GetResult<Prisma.$WorkflowPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Workflows that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkflowFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Workflows
     * const workflows = await prisma.workflow.findMany()
     * 
     * // Get first 10 Workflows
     * const workflows = await prisma.workflow.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const workflowWithIdOnly = await prisma.workflow.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends WorkflowFindManyArgs>(args?: SelectSubset<T, WorkflowFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WorkflowPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Workflow.
     * @param {WorkflowCreateArgs} args - Arguments to create a Workflow.
     * @example
     * // Create one Workflow
     * const Workflow = await prisma.workflow.create({
     *   data: {
     *     // ... data to create a Workflow
     *   }
     * })
     * 
     */
    create<T extends WorkflowCreateArgs>(args: SelectSubset<T, WorkflowCreateArgs<ExtArgs>>): Prisma__WorkflowClient<$Result.GetResult<Prisma.$WorkflowPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Workflows.
     * @param {WorkflowCreateManyArgs} args - Arguments to create many Workflows.
     * @example
     * // Create many Workflows
     * const workflow = await prisma.workflow.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends WorkflowCreateManyArgs>(args?: SelectSubset<T, WorkflowCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Workflows and returns the data saved in the database.
     * @param {WorkflowCreateManyAndReturnArgs} args - Arguments to create many Workflows.
     * @example
     * // Create many Workflows
     * const workflow = await prisma.workflow.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Workflows and only return the `id`
     * const workflowWithIdOnly = await prisma.workflow.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends WorkflowCreateManyAndReturnArgs>(args?: SelectSubset<T, WorkflowCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WorkflowPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Workflow.
     * @param {WorkflowDeleteArgs} args - Arguments to delete one Workflow.
     * @example
     * // Delete one Workflow
     * const Workflow = await prisma.workflow.delete({
     *   where: {
     *     // ... filter to delete one Workflow
     *   }
     * })
     * 
     */
    delete<T extends WorkflowDeleteArgs>(args: SelectSubset<T, WorkflowDeleteArgs<ExtArgs>>): Prisma__WorkflowClient<$Result.GetResult<Prisma.$WorkflowPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Workflow.
     * @param {WorkflowUpdateArgs} args - Arguments to update one Workflow.
     * @example
     * // Update one Workflow
     * const workflow = await prisma.workflow.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends WorkflowUpdateArgs>(args: SelectSubset<T, WorkflowUpdateArgs<ExtArgs>>): Prisma__WorkflowClient<$Result.GetResult<Prisma.$WorkflowPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Workflows.
     * @param {WorkflowDeleteManyArgs} args - Arguments to filter Workflows to delete.
     * @example
     * // Delete a few Workflows
     * const { count } = await prisma.workflow.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends WorkflowDeleteManyArgs>(args?: SelectSubset<T, WorkflowDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Workflows.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkflowUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Workflows
     * const workflow = await prisma.workflow.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends WorkflowUpdateManyArgs>(args: SelectSubset<T, WorkflowUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Workflows and returns the data updated in the database.
     * @param {WorkflowUpdateManyAndReturnArgs} args - Arguments to update many Workflows.
     * @example
     * // Update many Workflows
     * const workflow = await prisma.workflow.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Workflows and only return the `id`
     * const workflowWithIdOnly = await prisma.workflow.updateManyAndReturn({
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
    updateManyAndReturn<T extends WorkflowUpdateManyAndReturnArgs>(args: SelectSubset<T, WorkflowUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WorkflowPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Workflow.
     * @param {WorkflowUpsertArgs} args - Arguments to update or create a Workflow.
     * @example
     * // Update or create a Workflow
     * const workflow = await prisma.workflow.upsert({
     *   create: {
     *     // ... data to create a Workflow
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Workflow we want to update
     *   }
     * })
     */
    upsert<T extends WorkflowUpsertArgs>(args: SelectSubset<T, WorkflowUpsertArgs<ExtArgs>>): Prisma__WorkflowClient<$Result.GetResult<Prisma.$WorkflowPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Workflows.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkflowCountArgs} args - Arguments to filter Workflows to count.
     * @example
     * // Count the number of Workflows
     * const count = await prisma.workflow.count({
     *   where: {
     *     // ... the filter for the Workflows we want to count
     *   }
     * })
    **/
    count<T extends WorkflowCountArgs>(
      args?: Subset<T, WorkflowCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], WorkflowCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Workflow.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkflowAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends WorkflowAggregateArgs>(args: Subset<T, WorkflowAggregateArgs>): Prisma.PrismaPromise<GetWorkflowAggregateType<T>>

    /**
     * Group by Workflow.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkflowGroupByArgs} args - Group by arguments.
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
      T extends WorkflowGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: WorkflowGroupByArgs['orderBy'] }
        : { orderBy?: WorkflowGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, WorkflowGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetWorkflowGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Workflow model
   */
  readonly fields: WorkflowFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Workflow.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__WorkflowClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    steps<T extends Workflow$stepsArgs<ExtArgs> = {}>(args?: Subset<T, Workflow$stepsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WorkflowStepPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Workflow model
   */
  interface WorkflowFieldRefs {
    readonly id: FieldRef<"Workflow", 'String'>
    readonly change_type: FieldRef<"Workflow", 'String'>
    readonly section: FieldRef<"Workflow", 'String'>
    readonly status: FieldRef<"Workflow", 'String'>
    readonly requested_by: FieldRef<"Workflow", 'String'>
    readonly requester_name: FieldRef<"Workflow", 'String'>
    readonly effective_date: FieldRef<"Workflow", 'DateTime'>
    readonly current_step: FieldRef<"Workflow", 'Int'>
    readonly total_steps: FieldRef<"Workflow", 'Int'>
    readonly old_values: FieldRef<"Workflow", 'String'>
    readonly new_values: FieldRef<"Workflow", 'String'>
    readonly created_at: FieldRef<"Workflow", 'DateTime'>
    readonly updated_at: FieldRef<"Workflow", 'DateTime'>
    readonly completed_at: FieldRef<"Workflow", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Workflow findUnique
   */
  export type WorkflowFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Workflow
     */
    select?: WorkflowSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Workflow
     */
    omit?: WorkflowOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkflowInclude<ExtArgs> | null
    /**
     * Filter, which Workflow to fetch.
     */
    where: WorkflowWhereUniqueInput
  }

  /**
   * Workflow findUniqueOrThrow
   */
  export type WorkflowFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Workflow
     */
    select?: WorkflowSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Workflow
     */
    omit?: WorkflowOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkflowInclude<ExtArgs> | null
    /**
     * Filter, which Workflow to fetch.
     */
    where: WorkflowWhereUniqueInput
  }

  /**
   * Workflow findFirst
   */
  export type WorkflowFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Workflow
     */
    select?: WorkflowSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Workflow
     */
    omit?: WorkflowOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkflowInclude<ExtArgs> | null
    /**
     * Filter, which Workflow to fetch.
     */
    where?: WorkflowWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Workflows to fetch.
     */
    orderBy?: WorkflowOrderByWithRelationInput | WorkflowOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Workflows.
     */
    cursor?: WorkflowWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Workflows from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Workflows.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Workflows.
     */
    distinct?: WorkflowScalarFieldEnum | WorkflowScalarFieldEnum[]
  }

  /**
   * Workflow findFirstOrThrow
   */
  export type WorkflowFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Workflow
     */
    select?: WorkflowSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Workflow
     */
    omit?: WorkflowOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkflowInclude<ExtArgs> | null
    /**
     * Filter, which Workflow to fetch.
     */
    where?: WorkflowWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Workflows to fetch.
     */
    orderBy?: WorkflowOrderByWithRelationInput | WorkflowOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Workflows.
     */
    cursor?: WorkflowWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Workflows from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Workflows.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Workflows.
     */
    distinct?: WorkflowScalarFieldEnum | WorkflowScalarFieldEnum[]
  }

  /**
   * Workflow findMany
   */
  export type WorkflowFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Workflow
     */
    select?: WorkflowSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Workflow
     */
    omit?: WorkflowOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkflowInclude<ExtArgs> | null
    /**
     * Filter, which Workflows to fetch.
     */
    where?: WorkflowWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Workflows to fetch.
     */
    orderBy?: WorkflowOrderByWithRelationInput | WorkflowOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Workflows.
     */
    cursor?: WorkflowWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Workflows from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Workflows.
     */
    skip?: number
    distinct?: WorkflowScalarFieldEnum | WorkflowScalarFieldEnum[]
  }

  /**
   * Workflow create
   */
  export type WorkflowCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Workflow
     */
    select?: WorkflowSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Workflow
     */
    omit?: WorkflowOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkflowInclude<ExtArgs> | null
    /**
     * The data needed to create a Workflow.
     */
    data: XOR<WorkflowCreateInput, WorkflowUncheckedCreateInput>
  }

  /**
   * Workflow createMany
   */
  export type WorkflowCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Workflows.
     */
    data: WorkflowCreateManyInput | WorkflowCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Workflow createManyAndReturn
   */
  export type WorkflowCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Workflow
     */
    select?: WorkflowSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Workflow
     */
    omit?: WorkflowOmit<ExtArgs> | null
    /**
     * The data used to create many Workflows.
     */
    data: WorkflowCreateManyInput | WorkflowCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Workflow update
   */
  export type WorkflowUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Workflow
     */
    select?: WorkflowSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Workflow
     */
    omit?: WorkflowOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkflowInclude<ExtArgs> | null
    /**
     * The data needed to update a Workflow.
     */
    data: XOR<WorkflowUpdateInput, WorkflowUncheckedUpdateInput>
    /**
     * Choose, which Workflow to update.
     */
    where: WorkflowWhereUniqueInput
  }

  /**
   * Workflow updateMany
   */
  export type WorkflowUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Workflows.
     */
    data: XOR<WorkflowUpdateManyMutationInput, WorkflowUncheckedUpdateManyInput>
    /**
     * Filter which Workflows to update
     */
    where?: WorkflowWhereInput
    /**
     * Limit how many Workflows to update.
     */
    limit?: number
  }

  /**
   * Workflow updateManyAndReturn
   */
  export type WorkflowUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Workflow
     */
    select?: WorkflowSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Workflow
     */
    omit?: WorkflowOmit<ExtArgs> | null
    /**
     * The data used to update Workflows.
     */
    data: XOR<WorkflowUpdateManyMutationInput, WorkflowUncheckedUpdateManyInput>
    /**
     * Filter which Workflows to update
     */
    where?: WorkflowWhereInput
    /**
     * Limit how many Workflows to update.
     */
    limit?: number
  }

  /**
   * Workflow upsert
   */
  export type WorkflowUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Workflow
     */
    select?: WorkflowSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Workflow
     */
    omit?: WorkflowOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkflowInclude<ExtArgs> | null
    /**
     * The filter to search for the Workflow to update in case it exists.
     */
    where: WorkflowWhereUniqueInput
    /**
     * In case the Workflow found by the `where` argument doesn't exist, create a new Workflow with this data.
     */
    create: XOR<WorkflowCreateInput, WorkflowUncheckedCreateInput>
    /**
     * In case the Workflow was found with the provided `where` argument, update it with this data.
     */
    update: XOR<WorkflowUpdateInput, WorkflowUncheckedUpdateInput>
  }

  /**
   * Workflow delete
   */
  export type WorkflowDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Workflow
     */
    select?: WorkflowSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Workflow
     */
    omit?: WorkflowOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkflowInclude<ExtArgs> | null
    /**
     * Filter which Workflow to delete.
     */
    where: WorkflowWhereUniqueInput
  }

  /**
   * Workflow deleteMany
   */
  export type WorkflowDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Workflows to delete
     */
    where?: WorkflowWhereInput
    /**
     * Limit how many Workflows to delete.
     */
    limit?: number
  }

  /**
   * Workflow.steps
   */
  export type Workflow$stepsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkflowStep
     */
    select?: WorkflowStepSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkflowStep
     */
    omit?: WorkflowStepOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkflowStepInclude<ExtArgs> | null
    where?: WorkflowStepWhereInput
    orderBy?: WorkflowStepOrderByWithRelationInput | WorkflowStepOrderByWithRelationInput[]
    cursor?: WorkflowStepWhereUniqueInput
    take?: number
    skip?: number
    distinct?: WorkflowStepScalarFieldEnum | WorkflowStepScalarFieldEnum[]
  }

  /**
   * Workflow without action
   */
  export type WorkflowDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Workflow
     */
    select?: WorkflowSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Workflow
     */
    omit?: WorkflowOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkflowInclude<ExtArgs> | null
  }


  /**
   * Model WorkflowStep
   */

  export type AggregateWorkflowStep = {
    _count: WorkflowStepCountAggregateOutputType | null
    _avg: WorkflowStepAvgAggregateOutputType | null
    _sum: WorkflowStepSumAggregateOutputType | null
    _min: WorkflowStepMinAggregateOutputType | null
    _max: WorkflowStepMaxAggregateOutputType | null
  }

  export type WorkflowStepAvgAggregateOutputType = {
    step_number: number | null
  }

  export type WorkflowStepSumAggregateOutputType = {
    step_number: number | null
  }

  export type WorkflowStepMinAggregateOutputType = {
    id: string | null
    workflow_id: string | null
    step_number: number | null
    role: string | null
    role_name: string | null
    approver_id: string | null
    approver_name: string | null
    status: string | null
    action_date: Date | null
    comments: string | null
  }

  export type WorkflowStepMaxAggregateOutputType = {
    id: string | null
    workflow_id: string | null
    step_number: number | null
    role: string | null
    role_name: string | null
    approver_id: string | null
    approver_name: string | null
    status: string | null
    action_date: Date | null
    comments: string | null
  }

  export type WorkflowStepCountAggregateOutputType = {
    id: number
    workflow_id: number
    step_number: number
    role: number
    role_name: number
    approver_id: number
    approver_name: number
    status: number
    action_date: number
    comments: number
    _all: number
  }


  export type WorkflowStepAvgAggregateInputType = {
    step_number?: true
  }

  export type WorkflowStepSumAggregateInputType = {
    step_number?: true
  }

  export type WorkflowStepMinAggregateInputType = {
    id?: true
    workflow_id?: true
    step_number?: true
    role?: true
    role_name?: true
    approver_id?: true
    approver_name?: true
    status?: true
    action_date?: true
    comments?: true
  }

  export type WorkflowStepMaxAggregateInputType = {
    id?: true
    workflow_id?: true
    step_number?: true
    role?: true
    role_name?: true
    approver_id?: true
    approver_name?: true
    status?: true
    action_date?: true
    comments?: true
  }

  export type WorkflowStepCountAggregateInputType = {
    id?: true
    workflow_id?: true
    step_number?: true
    role?: true
    role_name?: true
    approver_id?: true
    approver_name?: true
    status?: true
    action_date?: true
    comments?: true
    _all?: true
  }

  export type WorkflowStepAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which WorkflowStep to aggregate.
     */
    where?: WorkflowStepWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WorkflowSteps to fetch.
     */
    orderBy?: WorkflowStepOrderByWithRelationInput | WorkflowStepOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: WorkflowStepWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WorkflowSteps from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WorkflowSteps.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned WorkflowSteps
    **/
    _count?: true | WorkflowStepCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: WorkflowStepAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: WorkflowStepSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: WorkflowStepMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: WorkflowStepMaxAggregateInputType
  }

  export type GetWorkflowStepAggregateType<T extends WorkflowStepAggregateArgs> = {
        [P in keyof T & keyof AggregateWorkflowStep]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateWorkflowStep[P]>
      : GetScalarType<T[P], AggregateWorkflowStep[P]>
  }




  export type WorkflowStepGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WorkflowStepWhereInput
    orderBy?: WorkflowStepOrderByWithAggregationInput | WorkflowStepOrderByWithAggregationInput[]
    by: WorkflowStepScalarFieldEnum[] | WorkflowStepScalarFieldEnum
    having?: WorkflowStepScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: WorkflowStepCountAggregateInputType | true
    _avg?: WorkflowStepAvgAggregateInputType
    _sum?: WorkflowStepSumAggregateInputType
    _min?: WorkflowStepMinAggregateInputType
    _max?: WorkflowStepMaxAggregateInputType
  }

  export type WorkflowStepGroupByOutputType = {
    id: string
    workflow_id: string
    step_number: number
    role: string
    role_name: string | null
    approver_id: string | null
    approver_name: string | null
    status: string
    action_date: Date | null
    comments: string | null
    _count: WorkflowStepCountAggregateOutputType | null
    _avg: WorkflowStepAvgAggregateOutputType | null
    _sum: WorkflowStepSumAggregateOutputType | null
    _min: WorkflowStepMinAggregateOutputType | null
    _max: WorkflowStepMaxAggregateOutputType | null
  }

  type GetWorkflowStepGroupByPayload<T extends WorkflowStepGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<WorkflowStepGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof WorkflowStepGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], WorkflowStepGroupByOutputType[P]>
            : GetScalarType<T[P], WorkflowStepGroupByOutputType[P]>
        }
      >
    >


  export type WorkflowStepSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    workflow_id?: boolean
    step_number?: boolean
    role?: boolean
    role_name?: boolean
    approver_id?: boolean
    approver_name?: boolean
    status?: boolean
    action_date?: boolean
    comments?: boolean
    workflow?: boolean | WorkflowDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["workflowStep"]>

  export type WorkflowStepSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    workflow_id?: boolean
    step_number?: boolean
    role?: boolean
    role_name?: boolean
    approver_id?: boolean
    approver_name?: boolean
    status?: boolean
    action_date?: boolean
    comments?: boolean
    workflow?: boolean | WorkflowDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["workflowStep"]>

  export type WorkflowStepSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    workflow_id?: boolean
    step_number?: boolean
    role?: boolean
    role_name?: boolean
    approver_id?: boolean
    approver_name?: boolean
    status?: boolean
    action_date?: boolean
    comments?: boolean
    workflow?: boolean | WorkflowDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["workflowStep"]>

  export type WorkflowStepSelectScalar = {
    id?: boolean
    workflow_id?: boolean
    step_number?: boolean
    role?: boolean
    role_name?: boolean
    approver_id?: boolean
    approver_name?: boolean
    status?: boolean
    action_date?: boolean
    comments?: boolean
  }

  export type WorkflowStepOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "workflow_id" | "step_number" | "role" | "role_name" | "approver_id" | "approver_name" | "status" | "action_date" | "comments", ExtArgs["result"]["workflowStep"]>
  export type WorkflowStepInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    workflow?: boolean | WorkflowDefaultArgs<ExtArgs>
  }
  export type WorkflowStepIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    workflow?: boolean | WorkflowDefaultArgs<ExtArgs>
  }
  export type WorkflowStepIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    workflow?: boolean | WorkflowDefaultArgs<ExtArgs>
  }

  export type $WorkflowStepPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "WorkflowStep"
    objects: {
      workflow: Prisma.$WorkflowPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      workflow_id: string
      step_number: number
      role: string
      role_name: string | null
      approver_id: string | null
      approver_name: string | null
      status: string
      action_date: Date | null
      comments: string | null
    }, ExtArgs["result"]["workflowStep"]>
    composites: {}
  }

  type WorkflowStepGetPayload<S extends boolean | null | undefined | WorkflowStepDefaultArgs> = $Result.GetResult<Prisma.$WorkflowStepPayload, S>

  type WorkflowStepCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<WorkflowStepFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: WorkflowStepCountAggregateInputType | true
    }

  export interface WorkflowStepDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['WorkflowStep'], meta: { name: 'WorkflowStep' } }
    /**
     * Find zero or one WorkflowStep that matches the filter.
     * @param {WorkflowStepFindUniqueArgs} args - Arguments to find a WorkflowStep
     * @example
     * // Get one WorkflowStep
     * const workflowStep = await prisma.workflowStep.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends WorkflowStepFindUniqueArgs>(args: SelectSubset<T, WorkflowStepFindUniqueArgs<ExtArgs>>): Prisma__WorkflowStepClient<$Result.GetResult<Prisma.$WorkflowStepPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one WorkflowStep that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {WorkflowStepFindUniqueOrThrowArgs} args - Arguments to find a WorkflowStep
     * @example
     * // Get one WorkflowStep
     * const workflowStep = await prisma.workflowStep.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends WorkflowStepFindUniqueOrThrowArgs>(args: SelectSubset<T, WorkflowStepFindUniqueOrThrowArgs<ExtArgs>>): Prisma__WorkflowStepClient<$Result.GetResult<Prisma.$WorkflowStepPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first WorkflowStep that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkflowStepFindFirstArgs} args - Arguments to find a WorkflowStep
     * @example
     * // Get one WorkflowStep
     * const workflowStep = await prisma.workflowStep.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends WorkflowStepFindFirstArgs>(args?: SelectSubset<T, WorkflowStepFindFirstArgs<ExtArgs>>): Prisma__WorkflowStepClient<$Result.GetResult<Prisma.$WorkflowStepPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first WorkflowStep that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkflowStepFindFirstOrThrowArgs} args - Arguments to find a WorkflowStep
     * @example
     * // Get one WorkflowStep
     * const workflowStep = await prisma.workflowStep.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends WorkflowStepFindFirstOrThrowArgs>(args?: SelectSubset<T, WorkflowStepFindFirstOrThrowArgs<ExtArgs>>): Prisma__WorkflowStepClient<$Result.GetResult<Prisma.$WorkflowStepPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more WorkflowSteps that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkflowStepFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all WorkflowSteps
     * const workflowSteps = await prisma.workflowStep.findMany()
     * 
     * // Get first 10 WorkflowSteps
     * const workflowSteps = await prisma.workflowStep.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const workflowStepWithIdOnly = await prisma.workflowStep.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends WorkflowStepFindManyArgs>(args?: SelectSubset<T, WorkflowStepFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WorkflowStepPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a WorkflowStep.
     * @param {WorkflowStepCreateArgs} args - Arguments to create a WorkflowStep.
     * @example
     * // Create one WorkflowStep
     * const WorkflowStep = await prisma.workflowStep.create({
     *   data: {
     *     // ... data to create a WorkflowStep
     *   }
     * })
     * 
     */
    create<T extends WorkflowStepCreateArgs>(args: SelectSubset<T, WorkflowStepCreateArgs<ExtArgs>>): Prisma__WorkflowStepClient<$Result.GetResult<Prisma.$WorkflowStepPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many WorkflowSteps.
     * @param {WorkflowStepCreateManyArgs} args - Arguments to create many WorkflowSteps.
     * @example
     * // Create many WorkflowSteps
     * const workflowStep = await prisma.workflowStep.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends WorkflowStepCreateManyArgs>(args?: SelectSubset<T, WorkflowStepCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many WorkflowSteps and returns the data saved in the database.
     * @param {WorkflowStepCreateManyAndReturnArgs} args - Arguments to create many WorkflowSteps.
     * @example
     * // Create many WorkflowSteps
     * const workflowStep = await prisma.workflowStep.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many WorkflowSteps and only return the `id`
     * const workflowStepWithIdOnly = await prisma.workflowStep.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends WorkflowStepCreateManyAndReturnArgs>(args?: SelectSubset<T, WorkflowStepCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WorkflowStepPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a WorkflowStep.
     * @param {WorkflowStepDeleteArgs} args - Arguments to delete one WorkflowStep.
     * @example
     * // Delete one WorkflowStep
     * const WorkflowStep = await prisma.workflowStep.delete({
     *   where: {
     *     // ... filter to delete one WorkflowStep
     *   }
     * })
     * 
     */
    delete<T extends WorkflowStepDeleteArgs>(args: SelectSubset<T, WorkflowStepDeleteArgs<ExtArgs>>): Prisma__WorkflowStepClient<$Result.GetResult<Prisma.$WorkflowStepPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one WorkflowStep.
     * @param {WorkflowStepUpdateArgs} args - Arguments to update one WorkflowStep.
     * @example
     * // Update one WorkflowStep
     * const workflowStep = await prisma.workflowStep.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends WorkflowStepUpdateArgs>(args: SelectSubset<T, WorkflowStepUpdateArgs<ExtArgs>>): Prisma__WorkflowStepClient<$Result.GetResult<Prisma.$WorkflowStepPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more WorkflowSteps.
     * @param {WorkflowStepDeleteManyArgs} args - Arguments to filter WorkflowSteps to delete.
     * @example
     * // Delete a few WorkflowSteps
     * const { count } = await prisma.workflowStep.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends WorkflowStepDeleteManyArgs>(args?: SelectSubset<T, WorkflowStepDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more WorkflowSteps.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkflowStepUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many WorkflowSteps
     * const workflowStep = await prisma.workflowStep.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends WorkflowStepUpdateManyArgs>(args: SelectSubset<T, WorkflowStepUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more WorkflowSteps and returns the data updated in the database.
     * @param {WorkflowStepUpdateManyAndReturnArgs} args - Arguments to update many WorkflowSteps.
     * @example
     * // Update many WorkflowSteps
     * const workflowStep = await prisma.workflowStep.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more WorkflowSteps and only return the `id`
     * const workflowStepWithIdOnly = await prisma.workflowStep.updateManyAndReturn({
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
    updateManyAndReturn<T extends WorkflowStepUpdateManyAndReturnArgs>(args: SelectSubset<T, WorkflowStepUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WorkflowStepPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one WorkflowStep.
     * @param {WorkflowStepUpsertArgs} args - Arguments to update or create a WorkflowStep.
     * @example
     * // Update or create a WorkflowStep
     * const workflowStep = await prisma.workflowStep.upsert({
     *   create: {
     *     // ... data to create a WorkflowStep
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the WorkflowStep we want to update
     *   }
     * })
     */
    upsert<T extends WorkflowStepUpsertArgs>(args: SelectSubset<T, WorkflowStepUpsertArgs<ExtArgs>>): Prisma__WorkflowStepClient<$Result.GetResult<Prisma.$WorkflowStepPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of WorkflowSteps.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkflowStepCountArgs} args - Arguments to filter WorkflowSteps to count.
     * @example
     * // Count the number of WorkflowSteps
     * const count = await prisma.workflowStep.count({
     *   where: {
     *     // ... the filter for the WorkflowSteps we want to count
     *   }
     * })
    **/
    count<T extends WorkflowStepCountArgs>(
      args?: Subset<T, WorkflowStepCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], WorkflowStepCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a WorkflowStep.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkflowStepAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends WorkflowStepAggregateArgs>(args: Subset<T, WorkflowStepAggregateArgs>): Prisma.PrismaPromise<GetWorkflowStepAggregateType<T>>

    /**
     * Group by WorkflowStep.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkflowStepGroupByArgs} args - Group by arguments.
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
      T extends WorkflowStepGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: WorkflowStepGroupByArgs['orderBy'] }
        : { orderBy?: WorkflowStepGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, WorkflowStepGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetWorkflowStepGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the WorkflowStep model
   */
  readonly fields: WorkflowStepFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for WorkflowStep.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__WorkflowStepClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    workflow<T extends WorkflowDefaultArgs<ExtArgs> = {}>(args?: Subset<T, WorkflowDefaultArgs<ExtArgs>>): Prisma__WorkflowClient<$Result.GetResult<Prisma.$WorkflowPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the WorkflowStep model
   */
  interface WorkflowStepFieldRefs {
    readonly id: FieldRef<"WorkflowStep", 'String'>
    readonly workflow_id: FieldRef<"WorkflowStep", 'String'>
    readonly step_number: FieldRef<"WorkflowStep", 'Int'>
    readonly role: FieldRef<"WorkflowStep", 'String'>
    readonly role_name: FieldRef<"WorkflowStep", 'String'>
    readonly approver_id: FieldRef<"WorkflowStep", 'String'>
    readonly approver_name: FieldRef<"WorkflowStep", 'String'>
    readonly status: FieldRef<"WorkflowStep", 'String'>
    readonly action_date: FieldRef<"WorkflowStep", 'DateTime'>
    readonly comments: FieldRef<"WorkflowStep", 'String'>
  }
    

  // Custom InputTypes
  /**
   * WorkflowStep findUnique
   */
  export type WorkflowStepFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkflowStep
     */
    select?: WorkflowStepSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkflowStep
     */
    omit?: WorkflowStepOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkflowStepInclude<ExtArgs> | null
    /**
     * Filter, which WorkflowStep to fetch.
     */
    where: WorkflowStepWhereUniqueInput
  }

  /**
   * WorkflowStep findUniqueOrThrow
   */
  export type WorkflowStepFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkflowStep
     */
    select?: WorkflowStepSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkflowStep
     */
    omit?: WorkflowStepOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkflowStepInclude<ExtArgs> | null
    /**
     * Filter, which WorkflowStep to fetch.
     */
    where: WorkflowStepWhereUniqueInput
  }

  /**
   * WorkflowStep findFirst
   */
  export type WorkflowStepFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkflowStep
     */
    select?: WorkflowStepSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkflowStep
     */
    omit?: WorkflowStepOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkflowStepInclude<ExtArgs> | null
    /**
     * Filter, which WorkflowStep to fetch.
     */
    where?: WorkflowStepWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WorkflowSteps to fetch.
     */
    orderBy?: WorkflowStepOrderByWithRelationInput | WorkflowStepOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WorkflowSteps.
     */
    cursor?: WorkflowStepWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WorkflowSteps from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WorkflowSteps.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WorkflowSteps.
     */
    distinct?: WorkflowStepScalarFieldEnum | WorkflowStepScalarFieldEnum[]
  }

  /**
   * WorkflowStep findFirstOrThrow
   */
  export type WorkflowStepFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkflowStep
     */
    select?: WorkflowStepSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkflowStep
     */
    omit?: WorkflowStepOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkflowStepInclude<ExtArgs> | null
    /**
     * Filter, which WorkflowStep to fetch.
     */
    where?: WorkflowStepWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WorkflowSteps to fetch.
     */
    orderBy?: WorkflowStepOrderByWithRelationInput | WorkflowStepOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WorkflowSteps.
     */
    cursor?: WorkflowStepWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WorkflowSteps from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WorkflowSteps.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WorkflowSteps.
     */
    distinct?: WorkflowStepScalarFieldEnum | WorkflowStepScalarFieldEnum[]
  }

  /**
   * WorkflowStep findMany
   */
  export type WorkflowStepFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkflowStep
     */
    select?: WorkflowStepSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkflowStep
     */
    omit?: WorkflowStepOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkflowStepInclude<ExtArgs> | null
    /**
     * Filter, which WorkflowSteps to fetch.
     */
    where?: WorkflowStepWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WorkflowSteps to fetch.
     */
    orderBy?: WorkflowStepOrderByWithRelationInput | WorkflowStepOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing WorkflowSteps.
     */
    cursor?: WorkflowStepWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WorkflowSteps from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WorkflowSteps.
     */
    skip?: number
    distinct?: WorkflowStepScalarFieldEnum | WorkflowStepScalarFieldEnum[]
  }

  /**
   * WorkflowStep create
   */
  export type WorkflowStepCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkflowStep
     */
    select?: WorkflowStepSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkflowStep
     */
    omit?: WorkflowStepOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkflowStepInclude<ExtArgs> | null
    /**
     * The data needed to create a WorkflowStep.
     */
    data: XOR<WorkflowStepCreateInput, WorkflowStepUncheckedCreateInput>
  }

  /**
   * WorkflowStep createMany
   */
  export type WorkflowStepCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many WorkflowSteps.
     */
    data: WorkflowStepCreateManyInput | WorkflowStepCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * WorkflowStep createManyAndReturn
   */
  export type WorkflowStepCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkflowStep
     */
    select?: WorkflowStepSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the WorkflowStep
     */
    omit?: WorkflowStepOmit<ExtArgs> | null
    /**
     * The data used to create many WorkflowSteps.
     */
    data: WorkflowStepCreateManyInput | WorkflowStepCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkflowStepIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * WorkflowStep update
   */
  export type WorkflowStepUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkflowStep
     */
    select?: WorkflowStepSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkflowStep
     */
    omit?: WorkflowStepOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkflowStepInclude<ExtArgs> | null
    /**
     * The data needed to update a WorkflowStep.
     */
    data: XOR<WorkflowStepUpdateInput, WorkflowStepUncheckedUpdateInput>
    /**
     * Choose, which WorkflowStep to update.
     */
    where: WorkflowStepWhereUniqueInput
  }

  /**
   * WorkflowStep updateMany
   */
  export type WorkflowStepUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update WorkflowSteps.
     */
    data: XOR<WorkflowStepUpdateManyMutationInput, WorkflowStepUncheckedUpdateManyInput>
    /**
     * Filter which WorkflowSteps to update
     */
    where?: WorkflowStepWhereInput
    /**
     * Limit how many WorkflowSteps to update.
     */
    limit?: number
  }

  /**
   * WorkflowStep updateManyAndReturn
   */
  export type WorkflowStepUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkflowStep
     */
    select?: WorkflowStepSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the WorkflowStep
     */
    omit?: WorkflowStepOmit<ExtArgs> | null
    /**
     * The data used to update WorkflowSteps.
     */
    data: XOR<WorkflowStepUpdateManyMutationInput, WorkflowStepUncheckedUpdateManyInput>
    /**
     * Filter which WorkflowSteps to update
     */
    where?: WorkflowStepWhereInput
    /**
     * Limit how many WorkflowSteps to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkflowStepIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * WorkflowStep upsert
   */
  export type WorkflowStepUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkflowStep
     */
    select?: WorkflowStepSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkflowStep
     */
    omit?: WorkflowStepOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkflowStepInclude<ExtArgs> | null
    /**
     * The filter to search for the WorkflowStep to update in case it exists.
     */
    where: WorkflowStepWhereUniqueInput
    /**
     * In case the WorkflowStep found by the `where` argument doesn't exist, create a new WorkflowStep with this data.
     */
    create: XOR<WorkflowStepCreateInput, WorkflowStepUncheckedCreateInput>
    /**
     * In case the WorkflowStep was found with the provided `where` argument, update it with this data.
     */
    update: XOR<WorkflowStepUpdateInput, WorkflowStepUncheckedUpdateInput>
  }

  /**
   * WorkflowStep delete
   */
  export type WorkflowStepDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkflowStep
     */
    select?: WorkflowStepSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkflowStep
     */
    omit?: WorkflowStepOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkflowStepInclude<ExtArgs> | null
    /**
     * Filter which WorkflowStep to delete.
     */
    where: WorkflowStepWhereUniqueInput
  }

  /**
   * WorkflowStep deleteMany
   */
  export type WorkflowStepDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which WorkflowSteps to delete
     */
    where?: WorkflowStepWhereInput
    /**
     * Limit how many WorkflowSteps to delete.
     */
    limit?: number
  }

  /**
   * WorkflowStep without action
   */
  export type WorkflowStepDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkflowStep
     */
    select?: WorkflowStepSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkflowStep
     */
    omit?: WorkflowStepOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkflowStepInclude<ExtArgs> | null
  }


  /**
   * Model ApprovalAction
   */

  export type AggregateApprovalAction = {
    _count: ApprovalActionCountAggregateOutputType | null
    _avg: ApprovalActionAvgAggregateOutputType | null
    _sum: ApprovalActionSumAggregateOutputType | null
    _min: ApprovalActionMinAggregateOutputType | null
    _max: ApprovalActionMaxAggregateOutputType | null
  }

  export type ApprovalActionAvgAggregateOutputType = {
    step_number: number | null
  }

  export type ApprovalActionSumAggregateOutputType = {
    step_number: number | null
  }

  export type ApprovalActionMinAggregateOutputType = {
    id: string | null
    workflow_id: string | null
    step_number: number | null
    action: string | null
    performed_by: string | null
    comments: string | null
    performed_at: Date | null
    details: string | null
  }

  export type ApprovalActionMaxAggregateOutputType = {
    id: string | null
    workflow_id: string | null
    step_number: number | null
    action: string | null
    performed_by: string | null
    comments: string | null
    performed_at: Date | null
    details: string | null
  }

  export type ApprovalActionCountAggregateOutputType = {
    id: number
    workflow_id: number
    step_number: number
    action: number
    performed_by: number
    comments: number
    performed_at: number
    details: number
    _all: number
  }


  export type ApprovalActionAvgAggregateInputType = {
    step_number?: true
  }

  export type ApprovalActionSumAggregateInputType = {
    step_number?: true
  }

  export type ApprovalActionMinAggregateInputType = {
    id?: true
    workflow_id?: true
    step_number?: true
    action?: true
    performed_by?: true
    comments?: true
    performed_at?: true
    details?: true
  }

  export type ApprovalActionMaxAggregateInputType = {
    id?: true
    workflow_id?: true
    step_number?: true
    action?: true
    performed_by?: true
    comments?: true
    performed_at?: true
    details?: true
  }

  export type ApprovalActionCountAggregateInputType = {
    id?: true
    workflow_id?: true
    step_number?: true
    action?: true
    performed_by?: true
    comments?: true
    performed_at?: true
    details?: true
    _all?: true
  }

  export type ApprovalActionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ApprovalAction to aggregate.
     */
    where?: ApprovalActionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ApprovalActions to fetch.
     */
    orderBy?: ApprovalActionOrderByWithRelationInput | ApprovalActionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ApprovalActionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ApprovalActions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ApprovalActions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ApprovalActions
    **/
    _count?: true | ApprovalActionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ApprovalActionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ApprovalActionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ApprovalActionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ApprovalActionMaxAggregateInputType
  }

  export type GetApprovalActionAggregateType<T extends ApprovalActionAggregateArgs> = {
        [P in keyof T & keyof AggregateApprovalAction]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateApprovalAction[P]>
      : GetScalarType<T[P], AggregateApprovalAction[P]>
  }




  export type ApprovalActionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ApprovalActionWhereInput
    orderBy?: ApprovalActionOrderByWithAggregationInput | ApprovalActionOrderByWithAggregationInput[]
    by: ApprovalActionScalarFieldEnum[] | ApprovalActionScalarFieldEnum
    having?: ApprovalActionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ApprovalActionCountAggregateInputType | true
    _avg?: ApprovalActionAvgAggregateInputType
    _sum?: ApprovalActionSumAggregateInputType
    _min?: ApprovalActionMinAggregateInputType
    _max?: ApprovalActionMaxAggregateInputType
  }

  export type ApprovalActionGroupByOutputType = {
    id: string
    workflow_id: string
    step_number: number | null
    action: string
    performed_by: string
    comments: string | null
    performed_at: Date
    details: string | null
    _count: ApprovalActionCountAggregateOutputType | null
    _avg: ApprovalActionAvgAggregateOutputType | null
    _sum: ApprovalActionSumAggregateOutputType | null
    _min: ApprovalActionMinAggregateOutputType | null
    _max: ApprovalActionMaxAggregateOutputType | null
  }

  type GetApprovalActionGroupByPayload<T extends ApprovalActionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ApprovalActionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ApprovalActionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ApprovalActionGroupByOutputType[P]>
            : GetScalarType<T[P], ApprovalActionGroupByOutputType[P]>
        }
      >
    >


  export type ApprovalActionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    workflow_id?: boolean
    step_number?: boolean
    action?: boolean
    performed_by?: boolean
    comments?: boolean
    performed_at?: boolean
    details?: boolean
  }, ExtArgs["result"]["approvalAction"]>

  export type ApprovalActionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    workflow_id?: boolean
    step_number?: boolean
    action?: boolean
    performed_by?: boolean
    comments?: boolean
    performed_at?: boolean
    details?: boolean
  }, ExtArgs["result"]["approvalAction"]>

  export type ApprovalActionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    workflow_id?: boolean
    step_number?: boolean
    action?: boolean
    performed_by?: boolean
    comments?: boolean
    performed_at?: boolean
    details?: boolean
  }, ExtArgs["result"]["approvalAction"]>

  export type ApprovalActionSelectScalar = {
    id?: boolean
    workflow_id?: boolean
    step_number?: boolean
    action?: boolean
    performed_by?: boolean
    comments?: boolean
    performed_at?: boolean
    details?: boolean
  }

  export type ApprovalActionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "workflow_id" | "step_number" | "action" | "performed_by" | "comments" | "performed_at" | "details", ExtArgs["result"]["approvalAction"]>

  export type $ApprovalActionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ApprovalAction"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      workflow_id: string
      step_number: number | null
      action: string
      performed_by: string
      comments: string | null
      performed_at: Date
      details: string | null
    }, ExtArgs["result"]["approvalAction"]>
    composites: {}
  }

  type ApprovalActionGetPayload<S extends boolean | null | undefined | ApprovalActionDefaultArgs> = $Result.GetResult<Prisma.$ApprovalActionPayload, S>

  type ApprovalActionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ApprovalActionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ApprovalActionCountAggregateInputType | true
    }

  export interface ApprovalActionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ApprovalAction'], meta: { name: 'ApprovalAction' } }
    /**
     * Find zero or one ApprovalAction that matches the filter.
     * @param {ApprovalActionFindUniqueArgs} args - Arguments to find a ApprovalAction
     * @example
     * // Get one ApprovalAction
     * const approvalAction = await prisma.approvalAction.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ApprovalActionFindUniqueArgs>(args: SelectSubset<T, ApprovalActionFindUniqueArgs<ExtArgs>>): Prisma__ApprovalActionClient<$Result.GetResult<Prisma.$ApprovalActionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ApprovalAction that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ApprovalActionFindUniqueOrThrowArgs} args - Arguments to find a ApprovalAction
     * @example
     * // Get one ApprovalAction
     * const approvalAction = await prisma.approvalAction.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ApprovalActionFindUniqueOrThrowArgs>(args: SelectSubset<T, ApprovalActionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ApprovalActionClient<$Result.GetResult<Prisma.$ApprovalActionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ApprovalAction that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApprovalActionFindFirstArgs} args - Arguments to find a ApprovalAction
     * @example
     * // Get one ApprovalAction
     * const approvalAction = await prisma.approvalAction.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ApprovalActionFindFirstArgs>(args?: SelectSubset<T, ApprovalActionFindFirstArgs<ExtArgs>>): Prisma__ApprovalActionClient<$Result.GetResult<Prisma.$ApprovalActionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ApprovalAction that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApprovalActionFindFirstOrThrowArgs} args - Arguments to find a ApprovalAction
     * @example
     * // Get one ApprovalAction
     * const approvalAction = await prisma.approvalAction.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ApprovalActionFindFirstOrThrowArgs>(args?: SelectSubset<T, ApprovalActionFindFirstOrThrowArgs<ExtArgs>>): Prisma__ApprovalActionClient<$Result.GetResult<Prisma.$ApprovalActionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ApprovalActions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApprovalActionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ApprovalActions
     * const approvalActions = await prisma.approvalAction.findMany()
     * 
     * // Get first 10 ApprovalActions
     * const approvalActions = await prisma.approvalAction.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const approvalActionWithIdOnly = await prisma.approvalAction.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ApprovalActionFindManyArgs>(args?: SelectSubset<T, ApprovalActionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ApprovalActionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ApprovalAction.
     * @param {ApprovalActionCreateArgs} args - Arguments to create a ApprovalAction.
     * @example
     * // Create one ApprovalAction
     * const ApprovalAction = await prisma.approvalAction.create({
     *   data: {
     *     // ... data to create a ApprovalAction
     *   }
     * })
     * 
     */
    create<T extends ApprovalActionCreateArgs>(args: SelectSubset<T, ApprovalActionCreateArgs<ExtArgs>>): Prisma__ApprovalActionClient<$Result.GetResult<Prisma.$ApprovalActionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ApprovalActions.
     * @param {ApprovalActionCreateManyArgs} args - Arguments to create many ApprovalActions.
     * @example
     * // Create many ApprovalActions
     * const approvalAction = await prisma.approvalAction.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ApprovalActionCreateManyArgs>(args?: SelectSubset<T, ApprovalActionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ApprovalActions and returns the data saved in the database.
     * @param {ApprovalActionCreateManyAndReturnArgs} args - Arguments to create many ApprovalActions.
     * @example
     * // Create many ApprovalActions
     * const approvalAction = await prisma.approvalAction.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ApprovalActions and only return the `id`
     * const approvalActionWithIdOnly = await prisma.approvalAction.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ApprovalActionCreateManyAndReturnArgs>(args?: SelectSubset<T, ApprovalActionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ApprovalActionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ApprovalAction.
     * @param {ApprovalActionDeleteArgs} args - Arguments to delete one ApprovalAction.
     * @example
     * // Delete one ApprovalAction
     * const ApprovalAction = await prisma.approvalAction.delete({
     *   where: {
     *     // ... filter to delete one ApprovalAction
     *   }
     * })
     * 
     */
    delete<T extends ApprovalActionDeleteArgs>(args: SelectSubset<T, ApprovalActionDeleteArgs<ExtArgs>>): Prisma__ApprovalActionClient<$Result.GetResult<Prisma.$ApprovalActionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ApprovalAction.
     * @param {ApprovalActionUpdateArgs} args - Arguments to update one ApprovalAction.
     * @example
     * // Update one ApprovalAction
     * const approvalAction = await prisma.approvalAction.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ApprovalActionUpdateArgs>(args: SelectSubset<T, ApprovalActionUpdateArgs<ExtArgs>>): Prisma__ApprovalActionClient<$Result.GetResult<Prisma.$ApprovalActionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ApprovalActions.
     * @param {ApprovalActionDeleteManyArgs} args - Arguments to filter ApprovalActions to delete.
     * @example
     * // Delete a few ApprovalActions
     * const { count } = await prisma.approvalAction.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ApprovalActionDeleteManyArgs>(args?: SelectSubset<T, ApprovalActionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ApprovalActions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApprovalActionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ApprovalActions
     * const approvalAction = await prisma.approvalAction.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ApprovalActionUpdateManyArgs>(args: SelectSubset<T, ApprovalActionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ApprovalActions and returns the data updated in the database.
     * @param {ApprovalActionUpdateManyAndReturnArgs} args - Arguments to update many ApprovalActions.
     * @example
     * // Update many ApprovalActions
     * const approvalAction = await prisma.approvalAction.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ApprovalActions and only return the `id`
     * const approvalActionWithIdOnly = await prisma.approvalAction.updateManyAndReturn({
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
    updateManyAndReturn<T extends ApprovalActionUpdateManyAndReturnArgs>(args: SelectSubset<T, ApprovalActionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ApprovalActionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ApprovalAction.
     * @param {ApprovalActionUpsertArgs} args - Arguments to update or create a ApprovalAction.
     * @example
     * // Update or create a ApprovalAction
     * const approvalAction = await prisma.approvalAction.upsert({
     *   create: {
     *     // ... data to create a ApprovalAction
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ApprovalAction we want to update
     *   }
     * })
     */
    upsert<T extends ApprovalActionUpsertArgs>(args: SelectSubset<T, ApprovalActionUpsertArgs<ExtArgs>>): Prisma__ApprovalActionClient<$Result.GetResult<Prisma.$ApprovalActionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ApprovalActions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApprovalActionCountArgs} args - Arguments to filter ApprovalActions to count.
     * @example
     * // Count the number of ApprovalActions
     * const count = await prisma.approvalAction.count({
     *   where: {
     *     // ... the filter for the ApprovalActions we want to count
     *   }
     * })
    **/
    count<T extends ApprovalActionCountArgs>(
      args?: Subset<T, ApprovalActionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ApprovalActionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ApprovalAction.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApprovalActionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ApprovalActionAggregateArgs>(args: Subset<T, ApprovalActionAggregateArgs>): Prisma.PrismaPromise<GetApprovalActionAggregateType<T>>

    /**
     * Group by ApprovalAction.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApprovalActionGroupByArgs} args - Group by arguments.
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
      T extends ApprovalActionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ApprovalActionGroupByArgs['orderBy'] }
        : { orderBy?: ApprovalActionGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ApprovalActionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetApprovalActionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ApprovalAction model
   */
  readonly fields: ApprovalActionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ApprovalAction.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ApprovalActionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the ApprovalAction model
   */
  interface ApprovalActionFieldRefs {
    readonly id: FieldRef<"ApprovalAction", 'String'>
    readonly workflow_id: FieldRef<"ApprovalAction", 'String'>
    readonly step_number: FieldRef<"ApprovalAction", 'Int'>
    readonly action: FieldRef<"ApprovalAction", 'String'>
    readonly performed_by: FieldRef<"ApprovalAction", 'String'>
    readonly comments: FieldRef<"ApprovalAction", 'String'>
    readonly performed_at: FieldRef<"ApprovalAction", 'DateTime'>
    readonly details: FieldRef<"ApprovalAction", 'String'>
  }
    

  // Custom InputTypes
  /**
   * ApprovalAction findUnique
   */
  export type ApprovalActionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApprovalAction
     */
    select?: ApprovalActionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApprovalAction
     */
    omit?: ApprovalActionOmit<ExtArgs> | null
    /**
     * Filter, which ApprovalAction to fetch.
     */
    where: ApprovalActionWhereUniqueInput
  }

  /**
   * ApprovalAction findUniqueOrThrow
   */
  export type ApprovalActionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApprovalAction
     */
    select?: ApprovalActionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApprovalAction
     */
    omit?: ApprovalActionOmit<ExtArgs> | null
    /**
     * Filter, which ApprovalAction to fetch.
     */
    where: ApprovalActionWhereUniqueInput
  }

  /**
   * ApprovalAction findFirst
   */
  export type ApprovalActionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApprovalAction
     */
    select?: ApprovalActionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApprovalAction
     */
    omit?: ApprovalActionOmit<ExtArgs> | null
    /**
     * Filter, which ApprovalAction to fetch.
     */
    where?: ApprovalActionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ApprovalActions to fetch.
     */
    orderBy?: ApprovalActionOrderByWithRelationInput | ApprovalActionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ApprovalActions.
     */
    cursor?: ApprovalActionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ApprovalActions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ApprovalActions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ApprovalActions.
     */
    distinct?: ApprovalActionScalarFieldEnum | ApprovalActionScalarFieldEnum[]
  }

  /**
   * ApprovalAction findFirstOrThrow
   */
  export type ApprovalActionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApprovalAction
     */
    select?: ApprovalActionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApprovalAction
     */
    omit?: ApprovalActionOmit<ExtArgs> | null
    /**
     * Filter, which ApprovalAction to fetch.
     */
    where?: ApprovalActionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ApprovalActions to fetch.
     */
    orderBy?: ApprovalActionOrderByWithRelationInput | ApprovalActionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ApprovalActions.
     */
    cursor?: ApprovalActionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ApprovalActions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ApprovalActions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ApprovalActions.
     */
    distinct?: ApprovalActionScalarFieldEnum | ApprovalActionScalarFieldEnum[]
  }

  /**
   * ApprovalAction findMany
   */
  export type ApprovalActionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApprovalAction
     */
    select?: ApprovalActionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApprovalAction
     */
    omit?: ApprovalActionOmit<ExtArgs> | null
    /**
     * Filter, which ApprovalActions to fetch.
     */
    where?: ApprovalActionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ApprovalActions to fetch.
     */
    orderBy?: ApprovalActionOrderByWithRelationInput | ApprovalActionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ApprovalActions.
     */
    cursor?: ApprovalActionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ApprovalActions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ApprovalActions.
     */
    skip?: number
    distinct?: ApprovalActionScalarFieldEnum | ApprovalActionScalarFieldEnum[]
  }

  /**
   * ApprovalAction create
   */
  export type ApprovalActionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApprovalAction
     */
    select?: ApprovalActionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApprovalAction
     */
    omit?: ApprovalActionOmit<ExtArgs> | null
    /**
     * The data needed to create a ApprovalAction.
     */
    data: XOR<ApprovalActionCreateInput, ApprovalActionUncheckedCreateInput>
  }

  /**
   * ApprovalAction createMany
   */
  export type ApprovalActionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ApprovalActions.
     */
    data: ApprovalActionCreateManyInput | ApprovalActionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ApprovalAction createManyAndReturn
   */
  export type ApprovalActionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApprovalAction
     */
    select?: ApprovalActionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ApprovalAction
     */
    omit?: ApprovalActionOmit<ExtArgs> | null
    /**
     * The data used to create many ApprovalActions.
     */
    data: ApprovalActionCreateManyInput | ApprovalActionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ApprovalAction update
   */
  export type ApprovalActionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApprovalAction
     */
    select?: ApprovalActionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApprovalAction
     */
    omit?: ApprovalActionOmit<ExtArgs> | null
    /**
     * The data needed to update a ApprovalAction.
     */
    data: XOR<ApprovalActionUpdateInput, ApprovalActionUncheckedUpdateInput>
    /**
     * Choose, which ApprovalAction to update.
     */
    where: ApprovalActionWhereUniqueInput
  }

  /**
   * ApprovalAction updateMany
   */
  export type ApprovalActionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ApprovalActions.
     */
    data: XOR<ApprovalActionUpdateManyMutationInput, ApprovalActionUncheckedUpdateManyInput>
    /**
     * Filter which ApprovalActions to update
     */
    where?: ApprovalActionWhereInput
    /**
     * Limit how many ApprovalActions to update.
     */
    limit?: number
  }

  /**
   * ApprovalAction updateManyAndReturn
   */
  export type ApprovalActionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApprovalAction
     */
    select?: ApprovalActionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ApprovalAction
     */
    omit?: ApprovalActionOmit<ExtArgs> | null
    /**
     * The data used to update ApprovalActions.
     */
    data: XOR<ApprovalActionUpdateManyMutationInput, ApprovalActionUncheckedUpdateManyInput>
    /**
     * Filter which ApprovalActions to update
     */
    where?: ApprovalActionWhereInput
    /**
     * Limit how many ApprovalActions to update.
     */
    limit?: number
  }

  /**
   * ApprovalAction upsert
   */
  export type ApprovalActionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApprovalAction
     */
    select?: ApprovalActionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApprovalAction
     */
    omit?: ApprovalActionOmit<ExtArgs> | null
    /**
     * The filter to search for the ApprovalAction to update in case it exists.
     */
    where: ApprovalActionWhereUniqueInput
    /**
     * In case the ApprovalAction found by the `where` argument doesn't exist, create a new ApprovalAction with this data.
     */
    create: XOR<ApprovalActionCreateInput, ApprovalActionUncheckedCreateInput>
    /**
     * In case the ApprovalAction was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ApprovalActionUpdateInput, ApprovalActionUncheckedUpdateInput>
  }

  /**
   * ApprovalAction delete
   */
  export type ApprovalActionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApprovalAction
     */
    select?: ApprovalActionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApprovalAction
     */
    omit?: ApprovalActionOmit<ExtArgs> | null
    /**
     * Filter which ApprovalAction to delete.
     */
    where: ApprovalActionWhereUniqueInput
  }

  /**
   * ApprovalAction deleteMany
   */
  export type ApprovalActionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ApprovalActions to delete
     */
    where?: ApprovalActionWhereInput
    /**
     * Limit how many ApprovalActions to delete.
     */
    limit?: number
  }

  /**
   * ApprovalAction without action
   */
  export type ApprovalActionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApprovalAction
     */
    select?: ApprovalActionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApprovalAction
     */
    omit?: ApprovalActionOmit<ExtArgs> | null
  }


  /**
   * Model Delegation
   */

  export type AggregateDelegation = {
    _count: DelegationCountAggregateOutputType | null
    _min: DelegationMinAggregateOutputType | null
    _max: DelegationMaxAggregateOutputType | null
  }

  export type DelegationMinAggregateOutputType = {
    id: string | null
    delegator_id: string | null
    delegate_id: string | null
    start_date: Date | null
    end_date: Date | null
    status: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type DelegationMaxAggregateOutputType = {
    id: string | null
    delegator_id: string | null
    delegate_id: string | null
    start_date: Date | null
    end_date: Date | null
    status: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type DelegationCountAggregateOutputType = {
    id: number
    delegator_id: number
    delegate_id: number
    start_date: number
    end_date: number
    change_types: number
    status: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type DelegationMinAggregateInputType = {
    id?: true
    delegator_id?: true
    delegate_id?: true
    start_date?: true
    end_date?: true
    status?: true
    created_at?: true
    updated_at?: true
  }

  export type DelegationMaxAggregateInputType = {
    id?: true
    delegator_id?: true
    delegate_id?: true
    start_date?: true
    end_date?: true
    status?: true
    created_at?: true
    updated_at?: true
  }

  export type DelegationCountAggregateInputType = {
    id?: true
    delegator_id?: true
    delegate_id?: true
    start_date?: true
    end_date?: true
    change_types?: true
    status?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type DelegationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Delegation to aggregate.
     */
    where?: DelegationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Delegations to fetch.
     */
    orderBy?: DelegationOrderByWithRelationInput | DelegationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DelegationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Delegations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Delegations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Delegations
    **/
    _count?: true | DelegationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DelegationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DelegationMaxAggregateInputType
  }

  export type GetDelegationAggregateType<T extends DelegationAggregateArgs> = {
        [P in keyof T & keyof AggregateDelegation]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDelegation[P]>
      : GetScalarType<T[P], AggregateDelegation[P]>
  }




  export type DelegationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DelegationWhereInput
    orderBy?: DelegationOrderByWithAggregationInput | DelegationOrderByWithAggregationInput[]
    by: DelegationScalarFieldEnum[] | DelegationScalarFieldEnum
    having?: DelegationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DelegationCountAggregateInputType | true
    _min?: DelegationMinAggregateInputType
    _max?: DelegationMaxAggregateInputType
  }

  export type DelegationGroupByOutputType = {
    id: string
    delegator_id: string
    delegate_id: string
    start_date: Date
    end_date: Date
    change_types: JsonValue | null
    status: string
    created_at: Date
    updated_at: Date
    _count: DelegationCountAggregateOutputType | null
    _min: DelegationMinAggregateOutputType | null
    _max: DelegationMaxAggregateOutputType | null
  }

  type GetDelegationGroupByPayload<T extends DelegationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DelegationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DelegationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DelegationGroupByOutputType[P]>
            : GetScalarType<T[P], DelegationGroupByOutputType[P]>
        }
      >
    >


  export type DelegationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    delegator_id?: boolean
    delegate_id?: boolean
    start_date?: boolean
    end_date?: boolean
    change_types?: boolean
    status?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["delegation"]>

  export type DelegationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    delegator_id?: boolean
    delegate_id?: boolean
    start_date?: boolean
    end_date?: boolean
    change_types?: boolean
    status?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["delegation"]>

  export type DelegationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    delegator_id?: boolean
    delegate_id?: boolean
    start_date?: boolean
    end_date?: boolean
    change_types?: boolean
    status?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["delegation"]>

  export type DelegationSelectScalar = {
    id?: boolean
    delegator_id?: boolean
    delegate_id?: boolean
    start_date?: boolean
    end_date?: boolean
    change_types?: boolean
    status?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type DelegationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "delegator_id" | "delegate_id" | "start_date" | "end_date" | "change_types" | "status" | "created_at" | "updated_at", ExtArgs["result"]["delegation"]>

  export type $DelegationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Delegation"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      delegator_id: string
      delegate_id: string
      start_date: Date
      end_date: Date
      change_types: Prisma.JsonValue | null
      status: string
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["delegation"]>
    composites: {}
  }

  type DelegationGetPayload<S extends boolean | null | undefined | DelegationDefaultArgs> = $Result.GetResult<Prisma.$DelegationPayload, S>

  type DelegationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<DelegationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: DelegationCountAggregateInputType | true
    }

  export interface DelegationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Delegation'], meta: { name: 'Delegation' } }
    /**
     * Find zero or one Delegation that matches the filter.
     * @param {DelegationFindUniqueArgs} args - Arguments to find a Delegation
     * @example
     * // Get one Delegation
     * const delegation = await prisma.delegation.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DelegationFindUniqueArgs>(args: SelectSubset<T, DelegationFindUniqueArgs<ExtArgs>>): Prisma__DelegationClient<$Result.GetResult<Prisma.$DelegationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Delegation that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {DelegationFindUniqueOrThrowArgs} args - Arguments to find a Delegation
     * @example
     * // Get one Delegation
     * const delegation = await prisma.delegation.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DelegationFindUniqueOrThrowArgs>(args: SelectSubset<T, DelegationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DelegationClient<$Result.GetResult<Prisma.$DelegationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Delegation that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DelegationFindFirstArgs} args - Arguments to find a Delegation
     * @example
     * // Get one Delegation
     * const delegation = await prisma.delegation.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DelegationFindFirstArgs>(args?: SelectSubset<T, DelegationFindFirstArgs<ExtArgs>>): Prisma__DelegationClient<$Result.GetResult<Prisma.$DelegationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Delegation that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DelegationFindFirstOrThrowArgs} args - Arguments to find a Delegation
     * @example
     * // Get one Delegation
     * const delegation = await prisma.delegation.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DelegationFindFirstOrThrowArgs>(args?: SelectSubset<T, DelegationFindFirstOrThrowArgs<ExtArgs>>): Prisma__DelegationClient<$Result.GetResult<Prisma.$DelegationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Delegations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DelegationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Delegations
     * const delegations = await prisma.delegation.findMany()
     * 
     * // Get first 10 Delegations
     * const delegations = await prisma.delegation.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const delegationWithIdOnly = await prisma.delegation.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DelegationFindManyArgs>(args?: SelectSubset<T, DelegationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DelegationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Delegation.
     * @param {DelegationCreateArgs} args - Arguments to create a Delegation.
     * @example
     * // Create one Delegation
     * const Delegation = await prisma.delegation.create({
     *   data: {
     *     // ... data to create a Delegation
     *   }
     * })
     * 
     */
    create<T extends DelegationCreateArgs>(args: SelectSubset<T, DelegationCreateArgs<ExtArgs>>): Prisma__DelegationClient<$Result.GetResult<Prisma.$DelegationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Delegations.
     * @param {DelegationCreateManyArgs} args - Arguments to create many Delegations.
     * @example
     * // Create many Delegations
     * const delegation = await prisma.delegation.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DelegationCreateManyArgs>(args?: SelectSubset<T, DelegationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Delegations and returns the data saved in the database.
     * @param {DelegationCreateManyAndReturnArgs} args - Arguments to create many Delegations.
     * @example
     * // Create many Delegations
     * const delegation = await prisma.delegation.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Delegations and only return the `id`
     * const delegationWithIdOnly = await prisma.delegation.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DelegationCreateManyAndReturnArgs>(args?: SelectSubset<T, DelegationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DelegationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Delegation.
     * @param {DelegationDeleteArgs} args - Arguments to delete one Delegation.
     * @example
     * // Delete one Delegation
     * const Delegation = await prisma.delegation.delete({
     *   where: {
     *     // ... filter to delete one Delegation
     *   }
     * })
     * 
     */
    delete<T extends DelegationDeleteArgs>(args: SelectSubset<T, DelegationDeleteArgs<ExtArgs>>): Prisma__DelegationClient<$Result.GetResult<Prisma.$DelegationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Delegation.
     * @param {DelegationUpdateArgs} args - Arguments to update one Delegation.
     * @example
     * // Update one Delegation
     * const delegation = await prisma.delegation.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DelegationUpdateArgs>(args: SelectSubset<T, DelegationUpdateArgs<ExtArgs>>): Prisma__DelegationClient<$Result.GetResult<Prisma.$DelegationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Delegations.
     * @param {DelegationDeleteManyArgs} args - Arguments to filter Delegations to delete.
     * @example
     * // Delete a few Delegations
     * const { count } = await prisma.delegation.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DelegationDeleteManyArgs>(args?: SelectSubset<T, DelegationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Delegations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DelegationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Delegations
     * const delegation = await prisma.delegation.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DelegationUpdateManyArgs>(args: SelectSubset<T, DelegationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Delegations and returns the data updated in the database.
     * @param {DelegationUpdateManyAndReturnArgs} args - Arguments to update many Delegations.
     * @example
     * // Update many Delegations
     * const delegation = await prisma.delegation.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Delegations and only return the `id`
     * const delegationWithIdOnly = await prisma.delegation.updateManyAndReturn({
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
    updateManyAndReturn<T extends DelegationUpdateManyAndReturnArgs>(args: SelectSubset<T, DelegationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DelegationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Delegation.
     * @param {DelegationUpsertArgs} args - Arguments to update or create a Delegation.
     * @example
     * // Update or create a Delegation
     * const delegation = await prisma.delegation.upsert({
     *   create: {
     *     // ... data to create a Delegation
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Delegation we want to update
     *   }
     * })
     */
    upsert<T extends DelegationUpsertArgs>(args: SelectSubset<T, DelegationUpsertArgs<ExtArgs>>): Prisma__DelegationClient<$Result.GetResult<Prisma.$DelegationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Delegations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DelegationCountArgs} args - Arguments to filter Delegations to count.
     * @example
     * // Count the number of Delegations
     * const count = await prisma.delegation.count({
     *   where: {
     *     // ... the filter for the Delegations we want to count
     *   }
     * })
    **/
    count<T extends DelegationCountArgs>(
      args?: Subset<T, DelegationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DelegationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Delegation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DelegationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends DelegationAggregateArgs>(args: Subset<T, DelegationAggregateArgs>): Prisma.PrismaPromise<GetDelegationAggregateType<T>>

    /**
     * Group by Delegation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DelegationGroupByArgs} args - Group by arguments.
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
      T extends DelegationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DelegationGroupByArgs['orderBy'] }
        : { orderBy?: DelegationGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, DelegationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDelegationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Delegation model
   */
  readonly fields: DelegationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Delegation.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DelegationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the Delegation model
   */
  interface DelegationFieldRefs {
    readonly id: FieldRef<"Delegation", 'String'>
    readonly delegator_id: FieldRef<"Delegation", 'String'>
    readonly delegate_id: FieldRef<"Delegation", 'String'>
    readonly start_date: FieldRef<"Delegation", 'DateTime'>
    readonly end_date: FieldRef<"Delegation", 'DateTime'>
    readonly change_types: FieldRef<"Delegation", 'Json'>
    readonly status: FieldRef<"Delegation", 'String'>
    readonly created_at: FieldRef<"Delegation", 'DateTime'>
    readonly updated_at: FieldRef<"Delegation", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Delegation findUnique
   */
  export type DelegationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Delegation
     */
    select?: DelegationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Delegation
     */
    omit?: DelegationOmit<ExtArgs> | null
    /**
     * Filter, which Delegation to fetch.
     */
    where: DelegationWhereUniqueInput
  }

  /**
   * Delegation findUniqueOrThrow
   */
  export type DelegationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Delegation
     */
    select?: DelegationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Delegation
     */
    omit?: DelegationOmit<ExtArgs> | null
    /**
     * Filter, which Delegation to fetch.
     */
    where: DelegationWhereUniqueInput
  }

  /**
   * Delegation findFirst
   */
  export type DelegationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Delegation
     */
    select?: DelegationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Delegation
     */
    omit?: DelegationOmit<ExtArgs> | null
    /**
     * Filter, which Delegation to fetch.
     */
    where?: DelegationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Delegations to fetch.
     */
    orderBy?: DelegationOrderByWithRelationInput | DelegationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Delegations.
     */
    cursor?: DelegationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Delegations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Delegations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Delegations.
     */
    distinct?: DelegationScalarFieldEnum | DelegationScalarFieldEnum[]
  }

  /**
   * Delegation findFirstOrThrow
   */
  export type DelegationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Delegation
     */
    select?: DelegationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Delegation
     */
    omit?: DelegationOmit<ExtArgs> | null
    /**
     * Filter, which Delegation to fetch.
     */
    where?: DelegationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Delegations to fetch.
     */
    orderBy?: DelegationOrderByWithRelationInput | DelegationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Delegations.
     */
    cursor?: DelegationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Delegations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Delegations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Delegations.
     */
    distinct?: DelegationScalarFieldEnum | DelegationScalarFieldEnum[]
  }

  /**
   * Delegation findMany
   */
  export type DelegationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Delegation
     */
    select?: DelegationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Delegation
     */
    omit?: DelegationOmit<ExtArgs> | null
    /**
     * Filter, which Delegations to fetch.
     */
    where?: DelegationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Delegations to fetch.
     */
    orderBy?: DelegationOrderByWithRelationInput | DelegationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Delegations.
     */
    cursor?: DelegationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Delegations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Delegations.
     */
    skip?: number
    distinct?: DelegationScalarFieldEnum | DelegationScalarFieldEnum[]
  }

  /**
   * Delegation create
   */
  export type DelegationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Delegation
     */
    select?: DelegationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Delegation
     */
    omit?: DelegationOmit<ExtArgs> | null
    /**
     * The data needed to create a Delegation.
     */
    data: XOR<DelegationCreateInput, DelegationUncheckedCreateInput>
  }

  /**
   * Delegation createMany
   */
  export type DelegationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Delegations.
     */
    data: DelegationCreateManyInput | DelegationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Delegation createManyAndReturn
   */
  export type DelegationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Delegation
     */
    select?: DelegationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Delegation
     */
    omit?: DelegationOmit<ExtArgs> | null
    /**
     * The data used to create many Delegations.
     */
    data: DelegationCreateManyInput | DelegationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Delegation update
   */
  export type DelegationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Delegation
     */
    select?: DelegationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Delegation
     */
    omit?: DelegationOmit<ExtArgs> | null
    /**
     * The data needed to update a Delegation.
     */
    data: XOR<DelegationUpdateInput, DelegationUncheckedUpdateInput>
    /**
     * Choose, which Delegation to update.
     */
    where: DelegationWhereUniqueInput
  }

  /**
   * Delegation updateMany
   */
  export type DelegationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Delegations.
     */
    data: XOR<DelegationUpdateManyMutationInput, DelegationUncheckedUpdateManyInput>
    /**
     * Filter which Delegations to update
     */
    where?: DelegationWhereInput
    /**
     * Limit how many Delegations to update.
     */
    limit?: number
  }

  /**
   * Delegation updateManyAndReturn
   */
  export type DelegationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Delegation
     */
    select?: DelegationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Delegation
     */
    omit?: DelegationOmit<ExtArgs> | null
    /**
     * The data used to update Delegations.
     */
    data: XOR<DelegationUpdateManyMutationInput, DelegationUncheckedUpdateManyInput>
    /**
     * Filter which Delegations to update
     */
    where?: DelegationWhereInput
    /**
     * Limit how many Delegations to update.
     */
    limit?: number
  }

  /**
   * Delegation upsert
   */
  export type DelegationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Delegation
     */
    select?: DelegationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Delegation
     */
    omit?: DelegationOmit<ExtArgs> | null
    /**
     * The filter to search for the Delegation to update in case it exists.
     */
    where: DelegationWhereUniqueInput
    /**
     * In case the Delegation found by the `where` argument doesn't exist, create a new Delegation with this data.
     */
    create: XOR<DelegationCreateInput, DelegationUncheckedCreateInput>
    /**
     * In case the Delegation was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DelegationUpdateInput, DelegationUncheckedUpdateInput>
  }

  /**
   * Delegation delete
   */
  export type DelegationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Delegation
     */
    select?: DelegationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Delegation
     */
    omit?: DelegationOmit<ExtArgs> | null
    /**
     * Filter which Delegation to delete.
     */
    where: DelegationWhereUniqueInput
  }

  /**
   * Delegation deleteMany
   */
  export type DelegationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Delegations to delete
     */
    where?: DelegationWhereInput
    /**
     * Limit how many Delegations to delete.
     */
    limit?: number
  }

  /**
   * Delegation without action
   */
  export type DelegationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Delegation
     */
    select?: DelegationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Delegation
     */
    omit?: DelegationOmit<ExtArgs> | null
  }


  /**
   * Model ApprovalDelegation
   */

  export type AggregateApprovalDelegation = {
    _count: ApprovalDelegationCountAggregateOutputType | null
    _min: ApprovalDelegationMinAggregateOutputType | null
    _max: ApprovalDelegationMaxAggregateOutputType | null
  }

  export type ApprovalDelegationMinAggregateOutputType = {
    id: string | null
    delegator_id: string | null
    delegate_id: string | null
    start_date: Date | null
    end_date: Date | null
    is_active: boolean | null
    revoked_at: Date | null
    revoked_by: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type ApprovalDelegationMaxAggregateOutputType = {
    id: string | null
    delegator_id: string | null
    delegate_id: string | null
    start_date: Date | null
    end_date: Date | null
    is_active: boolean | null
    revoked_at: Date | null
    revoked_by: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type ApprovalDelegationCountAggregateOutputType = {
    id: number
    delegator_id: number
    delegate_id: number
    start_date: number
    end_date: number
    workflow_types: number
    is_active: number
    revoked_at: number
    revoked_by: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type ApprovalDelegationMinAggregateInputType = {
    id?: true
    delegator_id?: true
    delegate_id?: true
    start_date?: true
    end_date?: true
    is_active?: true
    revoked_at?: true
    revoked_by?: true
    created_at?: true
    updated_at?: true
  }

  export type ApprovalDelegationMaxAggregateInputType = {
    id?: true
    delegator_id?: true
    delegate_id?: true
    start_date?: true
    end_date?: true
    is_active?: true
    revoked_at?: true
    revoked_by?: true
    created_at?: true
    updated_at?: true
  }

  export type ApprovalDelegationCountAggregateInputType = {
    id?: true
    delegator_id?: true
    delegate_id?: true
    start_date?: true
    end_date?: true
    workflow_types?: true
    is_active?: true
    revoked_at?: true
    revoked_by?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type ApprovalDelegationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ApprovalDelegation to aggregate.
     */
    where?: ApprovalDelegationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ApprovalDelegations to fetch.
     */
    orderBy?: ApprovalDelegationOrderByWithRelationInput | ApprovalDelegationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ApprovalDelegationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ApprovalDelegations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ApprovalDelegations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ApprovalDelegations
    **/
    _count?: true | ApprovalDelegationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ApprovalDelegationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ApprovalDelegationMaxAggregateInputType
  }

  export type GetApprovalDelegationAggregateType<T extends ApprovalDelegationAggregateArgs> = {
        [P in keyof T & keyof AggregateApprovalDelegation]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateApprovalDelegation[P]>
      : GetScalarType<T[P], AggregateApprovalDelegation[P]>
  }




  export type ApprovalDelegationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ApprovalDelegationWhereInput
    orderBy?: ApprovalDelegationOrderByWithAggregationInput | ApprovalDelegationOrderByWithAggregationInput[]
    by: ApprovalDelegationScalarFieldEnum[] | ApprovalDelegationScalarFieldEnum
    having?: ApprovalDelegationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ApprovalDelegationCountAggregateInputType | true
    _min?: ApprovalDelegationMinAggregateInputType
    _max?: ApprovalDelegationMaxAggregateInputType
  }

  export type ApprovalDelegationGroupByOutputType = {
    id: string
    delegator_id: string
    delegate_id: string
    start_date: Date
    end_date: Date
    workflow_types: string[]
    is_active: boolean
    revoked_at: Date | null
    revoked_by: string | null
    created_at: Date
    updated_at: Date
    _count: ApprovalDelegationCountAggregateOutputType | null
    _min: ApprovalDelegationMinAggregateOutputType | null
    _max: ApprovalDelegationMaxAggregateOutputType | null
  }

  type GetApprovalDelegationGroupByPayload<T extends ApprovalDelegationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ApprovalDelegationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ApprovalDelegationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ApprovalDelegationGroupByOutputType[P]>
            : GetScalarType<T[P], ApprovalDelegationGroupByOutputType[P]>
        }
      >
    >


  export type ApprovalDelegationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    delegator_id?: boolean
    delegate_id?: boolean
    start_date?: boolean
    end_date?: boolean
    workflow_types?: boolean
    is_active?: boolean
    revoked_at?: boolean
    revoked_by?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["approvalDelegation"]>

  export type ApprovalDelegationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    delegator_id?: boolean
    delegate_id?: boolean
    start_date?: boolean
    end_date?: boolean
    workflow_types?: boolean
    is_active?: boolean
    revoked_at?: boolean
    revoked_by?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["approvalDelegation"]>

  export type ApprovalDelegationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    delegator_id?: boolean
    delegate_id?: boolean
    start_date?: boolean
    end_date?: boolean
    workflow_types?: boolean
    is_active?: boolean
    revoked_at?: boolean
    revoked_by?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["approvalDelegation"]>

  export type ApprovalDelegationSelectScalar = {
    id?: boolean
    delegator_id?: boolean
    delegate_id?: boolean
    start_date?: boolean
    end_date?: boolean
    workflow_types?: boolean
    is_active?: boolean
    revoked_at?: boolean
    revoked_by?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type ApprovalDelegationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "delegator_id" | "delegate_id" | "start_date" | "end_date" | "workflow_types" | "is_active" | "revoked_at" | "revoked_by" | "created_at" | "updated_at", ExtArgs["result"]["approvalDelegation"]>

  export type $ApprovalDelegationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ApprovalDelegation"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      delegator_id: string
      delegate_id: string
      start_date: Date
      end_date: Date
      workflow_types: string[]
      is_active: boolean
      revoked_at: Date | null
      revoked_by: string | null
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["approvalDelegation"]>
    composites: {}
  }

  type ApprovalDelegationGetPayload<S extends boolean | null | undefined | ApprovalDelegationDefaultArgs> = $Result.GetResult<Prisma.$ApprovalDelegationPayload, S>

  type ApprovalDelegationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ApprovalDelegationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ApprovalDelegationCountAggregateInputType | true
    }

  export interface ApprovalDelegationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ApprovalDelegation'], meta: { name: 'ApprovalDelegation' } }
    /**
     * Find zero or one ApprovalDelegation that matches the filter.
     * @param {ApprovalDelegationFindUniqueArgs} args - Arguments to find a ApprovalDelegation
     * @example
     * // Get one ApprovalDelegation
     * const approvalDelegation = await prisma.approvalDelegation.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ApprovalDelegationFindUniqueArgs>(args: SelectSubset<T, ApprovalDelegationFindUniqueArgs<ExtArgs>>): Prisma__ApprovalDelegationClient<$Result.GetResult<Prisma.$ApprovalDelegationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ApprovalDelegation that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ApprovalDelegationFindUniqueOrThrowArgs} args - Arguments to find a ApprovalDelegation
     * @example
     * // Get one ApprovalDelegation
     * const approvalDelegation = await prisma.approvalDelegation.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ApprovalDelegationFindUniqueOrThrowArgs>(args: SelectSubset<T, ApprovalDelegationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ApprovalDelegationClient<$Result.GetResult<Prisma.$ApprovalDelegationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ApprovalDelegation that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApprovalDelegationFindFirstArgs} args - Arguments to find a ApprovalDelegation
     * @example
     * // Get one ApprovalDelegation
     * const approvalDelegation = await prisma.approvalDelegation.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ApprovalDelegationFindFirstArgs>(args?: SelectSubset<T, ApprovalDelegationFindFirstArgs<ExtArgs>>): Prisma__ApprovalDelegationClient<$Result.GetResult<Prisma.$ApprovalDelegationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ApprovalDelegation that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApprovalDelegationFindFirstOrThrowArgs} args - Arguments to find a ApprovalDelegation
     * @example
     * // Get one ApprovalDelegation
     * const approvalDelegation = await prisma.approvalDelegation.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ApprovalDelegationFindFirstOrThrowArgs>(args?: SelectSubset<T, ApprovalDelegationFindFirstOrThrowArgs<ExtArgs>>): Prisma__ApprovalDelegationClient<$Result.GetResult<Prisma.$ApprovalDelegationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ApprovalDelegations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApprovalDelegationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ApprovalDelegations
     * const approvalDelegations = await prisma.approvalDelegation.findMany()
     * 
     * // Get first 10 ApprovalDelegations
     * const approvalDelegations = await prisma.approvalDelegation.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const approvalDelegationWithIdOnly = await prisma.approvalDelegation.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ApprovalDelegationFindManyArgs>(args?: SelectSubset<T, ApprovalDelegationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ApprovalDelegationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ApprovalDelegation.
     * @param {ApprovalDelegationCreateArgs} args - Arguments to create a ApprovalDelegation.
     * @example
     * // Create one ApprovalDelegation
     * const ApprovalDelegation = await prisma.approvalDelegation.create({
     *   data: {
     *     // ... data to create a ApprovalDelegation
     *   }
     * })
     * 
     */
    create<T extends ApprovalDelegationCreateArgs>(args: SelectSubset<T, ApprovalDelegationCreateArgs<ExtArgs>>): Prisma__ApprovalDelegationClient<$Result.GetResult<Prisma.$ApprovalDelegationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ApprovalDelegations.
     * @param {ApprovalDelegationCreateManyArgs} args - Arguments to create many ApprovalDelegations.
     * @example
     * // Create many ApprovalDelegations
     * const approvalDelegation = await prisma.approvalDelegation.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ApprovalDelegationCreateManyArgs>(args?: SelectSubset<T, ApprovalDelegationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ApprovalDelegations and returns the data saved in the database.
     * @param {ApprovalDelegationCreateManyAndReturnArgs} args - Arguments to create many ApprovalDelegations.
     * @example
     * // Create many ApprovalDelegations
     * const approvalDelegation = await prisma.approvalDelegation.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ApprovalDelegations and only return the `id`
     * const approvalDelegationWithIdOnly = await prisma.approvalDelegation.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ApprovalDelegationCreateManyAndReturnArgs>(args?: SelectSubset<T, ApprovalDelegationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ApprovalDelegationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ApprovalDelegation.
     * @param {ApprovalDelegationDeleteArgs} args - Arguments to delete one ApprovalDelegation.
     * @example
     * // Delete one ApprovalDelegation
     * const ApprovalDelegation = await prisma.approvalDelegation.delete({
     *   where: {
     *     // ... filter to delete one ApprovalDelegation
     *   }
     * })
     * 
     */
    delete<T extends ApprovalDelegationDeleteArgs>(args: SelectSubset<T, ApprovalDelegationDeleteArgs<ExtArgs>>): Prisma__ApprovalDelegationClient<$Result.GetResult<Prisma.$ApprovalDelegationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ApprovalDelegation.
     * @param {ApprovalDelegationUpdateArgs} args - Arguments to update one ApprovalDelegation.
     * @example
     * // Update one ApprovalDelegation
     * const approvalDelegation = await prisma.approvalDelegation.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ApprovalDelegationUpdateArgs>(args: SelectSubset<T, ApprovalDelegationUpdateArgs<ExtArgs>>): Prisma__ApprovalDelegationClient<$Result.GetResult<Prisma.$ApprovalDelegationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ApprovalDelegations.
     * @param {ApprovalDelegationDeleteManyArgs} args - Arguments to filter ApprovalDelegations to delete.
     * @example
     * // Delete a few ApprovalDelegations
     * const { count } = await prisma.approvalDelegation.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ApprovalDelegationDeleteManyArgs>(args?: SelectSubset<T, ApprovalDelegationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ApprovalDelegations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApprovalDelegationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ApprovalDelegations
     * const approvalDelegation = await prisma.approvalDelegation.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ApprovalDelegationUpdateManyArgs>(args: SelectSubset<T, ApprovalDelegationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ApprovalDelegations and returns the data updated in the database.
     * @param {ApprovalDelegationUpdateManyAndReturnArgs} args - Arguments to update many ApprovalDelegations.
     * @example
     * // Update many ApprovalDelegations
     * const approvalDelegation = await prisma.approvalDelegation.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ApprovalDelegations and only return the `id`
     * const approvalDelegationWithIdOnly = await prisma.approvalDelegation.updateManyAndReturn({
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
    updateManyAndReturn<T extends ApprovalDelegationUpdateManyAndReturnArgs>(args: SelectSubset<T, ApprovalDelegationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ApprovalDelegationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ApprovalDelegation.
     * @param {ApprovalDelegationUpsertArgs} args - Arguments to update or create a ApprovalDelegation.
     * @example
     * // Update or create a ApprovalDelegation
     * const approvalDelegation = await prisma.approvalDelegation.upsert({
     *   create: {
     *     // ... data to create a ApprovalDelegation
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ApprovalDelegation we want to update
     *   }
     * })
     */
    upsert<T extends ApprovalDelegationUpsertArgs>(args: SelectSubset<T, ApprovalDelegationUpsertArgs<ExtArgs>>): Prisma__ApprovalDelegationClient<$Result.GetResult<Prisma.$ApprovalDelegationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ApprovalDelegations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApprovalDelegationCountArgs} args - Arguments to filter ApprovalDelegations to count.
     * @example
     * // Count the number of ApprovalDelegations
     * const count = await prisma.approvalDelegation.count({
     *   where: {
     *     // ... the filter for the ApprovalDelegations we want to count
     *   }
     * })
    **/
    count<T extends ApprovalDelegationCountArgs>(
      args?: Subset<T, ApprovalDelegationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ApprovalDelegationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ApprovalDelegation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApprovalDelegationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ApprovalDelegationAggregateArgs>(args: Subset<T, ApprovalDelegationAggregateArgs>): Prisma.PrismaPromise<GetApprovalDelegationAggregateType<T>>

    /**
     * Group by ApprovalDelegation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApprovalDelegationGroupByArgs} args - Group by arguments.
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
      T extends ApprovalDelegationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ApprovalDelegationGroupByArgs['orderBy'] }
        : { orderBy?: ApprovalDelegationGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ApprovalDelegationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetApprovalDelegationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ApprovalDelegation model
   */
  readonly fields: ApprovalDelegationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ApprovalDelegation.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ApprovalDelegationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the ApprovalDelegation model
   */
  interface ApprovalDelegationFieldRefs {
    readonly id: FieldRef<"ApprovalDelegation", 'String'>
    readonly delegator_id: FieldRef<"ApprovalDelegation", 'String'>
    readonly delegate_id: FieldRef<"ApprovalDelegation", 'String'>
    readonly start_date: FieldRef<"ApprovalDelegation", 'DateTime'>
    readonly end_date: FieldRef<"ApprovalDelegation", 'DateTime'>
    readonly workflow_types: FieldRef<"ApprovalDelegation", 'String[]'>
    readonly is_active: FieldRef<"ApprovalDelegation", 'Boolean'>
    readonly revoked_at: FieldRef<"ApprovalDelegation", 'DateTime'>
    readonly revoked_by: FieldRef<"ApprovalDelegation", 'String'>
    readonly created_at: FieldRef<"ApprovalDelegation", 'DateTime'>
    readonly updated_at: FieldRef<"ApprovalDelegation", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ApprovalDelegation findUnique
   */
  export type ApprovalDelegationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApprovalDelegation
     */
    select?: ApprovalDelegationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApprovalDelegation
     */
    omit?: ApprovalDelegationOmit<ExtArgs> | null
    /**
     * Filter, which ApprovalDelegation to fetch.
     */
    where: ApprovalDelegationWhereUniqueInput
  }

  /**
   * ApprovalDelegation findUniqueOrThrow
   */
  export type ApprovalDelegationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApprovalDelegation
     */
    select?: ApprovalDelegationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApprovalDelegation
     */
    omit?: ApprovalDelegationOmit<ExtArgs> | null
    /**
     * Filter, which ApprovalDelegation to fetch.
     */
    where: ApprovalDelegationWhereUniqueInput
  }

  /**
   * ApprovalDelegation findFirst
   */
  export type ApprovalDelegationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApprovalDelegation
     */
    select?: ApprovalDelegationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApprovalDelegation
     */
    omit?: ApprovalDelegationOmit<ExtArgs> | null
    /**
     * Filter, which ApprovalDelegation to fetch.
     */
    where?: ApprovalDelegationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ApprovalDelegations to fetch.
     */
    orderBy?: ApprovalDelegationOrderByWithRelationInput | ApprovalDelegationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ApprovalDelegations.
     */
    cursor?: ApprovalDelegationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ApprovalDelegations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ApprovalDelegations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ApprovalDelegations.
     */
    distinct?: ApprovalDelegationScalarFieldEnum | ApprovalDelegationScalarFieldEnum[]
  }

  /**
   * ApprovalDelegation findFirstOrThrow
   */
  export type ApprovalDelegationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApprovalDelegation
     */
    select?: ApprovalDelegationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApprovalDelegation
     */
    omit?: ApprovalDelegationOmit<ExtArgs> | null
    /**
     * Filter, which ApprovalDelegation to fetch.
     */
    where?: ApprovalDelegationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ApprovalDelegations to fetch.
     */
    orderBy?: ApprovalDelegationOrderByWithRelationInput | ApprovalDelegationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ApprovalDelegations.
     */
    cursor?: ApprovalDelegationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ApprovalDelegations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ApprovalDelegations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ApprovalDelegations.
     */
    distinct?: ApprovalDelegationScalarFieldEnum | ApprovalDelegationScalarFieldEnum[]
  }

  /**
   * ApprovalDelegation findMany
   */
  export type ApprovalDelegationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApprovalDelegation
     */
    select?: ApprovalDelegationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApprovalDelegation
     */
    omit?: ApprovalDelegationOmit<ExtArgs> | null
    /**
     * Filter, which ApprovalDelegations to fetch.
     */
    where?: ApprovalDelegationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ApprovalDelegations to fetch.
     */
    orderBy?: ApprovalDelegationOrderByWithRelationInput | ApprovalDelegationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ApprovalDelegations.
     */
    cursor?: ApprovalDelegationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ApprovalDelegations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ApprovalDelegations.
     */
    skip?: number
    distinct?: ApprovalDelegationScalarFieldEnum | ApprovalDelegationScalarFieldEnum[]
  }

  /**
   * ApprovalDelegation create
   */
  export type ApprovalDelegationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApprovalDelegation
     */
    select?: ApprovalDelegationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApprovalDelegation
     */
    omit?: ApprovalDelegationOmit<ExtArgs> | null
    /**
     * The data needed to create a ApprovalDelegation.
     */
    data: XOR<ApprovalDelegationCreateInput, ApprovalDelegationUncheckedCreateInput>
  }

  /**
   * ApprovalDelegation createMany
   */
  export type ApprovalDelegationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ApprovalDelegations.
     */
    data: ApprovalDelegationCreateManyInput | ApprovalDelegationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ApprovalDelegation createManyAndReturn
   */
  export type ApprovalDelegationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApprovalDelegation
     */
    select?: ApprovalDelegationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ApprovalDelegation
     */
    omit?: ApprovalDelegationOmit<ExtArgs> | null
    /**
     * The data used to create many ApprovalDelegations.
     */
    data: ApprovalDelegationCreateManyInput | ApprovalDelegationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ApprovalDelegation update
   */
  export type ApprovalDelegationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApprovalDelegation
     */
    select?: ApprovalDelegationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApprovalDelegation
     */
    omit?: ApprovalDelegationOmit<ExtArgs> | null
    /**
     * The data needed to update a ApprovalDelegation.
     */
    data: XOR<ApprovalDelegationUpdateInput, ApprovalDelegationUncheckedUpdateInput>
    /**
     * Choose, which ApprovalDelegation to update.
     */
    where: ApprovalDelegationWhereUniqueInput
  }

  /**
   * ApprovalDelegation updateMany
   */
  export type ApprovalDelegationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ApprovalDelegations.
     */
    data: XOR<ApprovalDelegationUpdateManyMutationInput, ApprovalDelegationUncheckedUpdateManyInput>
    /**
     * Filter which ApprovalDelegations to update
     */
    where?: ApprovalDelegationWhereInput
    /**
     * Limit how many ApprovalDelegations to update.
     */
    limit?: number
  }

  /**
   * ApprovalDelegation updateManyAndReturn
   */
  export type ApprovalDelegationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApprovalDelegation
     */
    select?: ApprovalDelegationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ApprovalDelegation
     */
    omit?: ApprovalDelegationOmit<ExtArgs> | null
    /**
     * The data used to update ApprovalDelegations.
     */
    data: XOR<ApprovalDelegationUpdateManyMutationInput, ApprovalDelegationUncheckedUpdateManyInput>
    /**
     * Filter which ApprovalDelegations to update
     */
    where?: ApprovalDelegationWhereInput
    /**
     * Limit how many ApprovalDelegations to update.
     */
    limit?: number
  }

  /**
   * ApprovalDelegation upsert
   */
  export type ApprovalDelegationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApprovalDelegation
     */
    select?: ApprovalDelegationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApprovalDelegation
     */
    omit?: ApprovalDelegationOmit<ExtArgs> | null
    /**
     * The filter to search for the ApprovalDelegation to update in case it exists.
     */
    where: ApprovalDelegationWhereUniqueInput
    /**
     * In case the ApprovalDelegation found by the `where` argument doesn't exist, create a new ApprovalDelegation with this data.
     */
    create: XOR<ApprovalDelegationCreateInput, ApprovalDelegationUncheckedCreateInput>
    /**
     * In case the ApprovalDelegation was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ApprovalDelegationUpdateInput, ApprovalDelegationUncheckedUpdateInput>
  }

  /**
   * ApprovalDelegation delete
   */
  export type ApprovalDelegationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApprovalDelegation
     */
    select?: ApprovalDelegationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApprovalDelegation
     */
    omit?: ApprovalDelegationOmit<ExtArgs> | null
    /**
     * Filter which ApprovalDelegation to delete.
     */
    where: ApprovalDelegationWhereUniqueInput
  }

  /**
   * ApprovalDelegation deleteMany
   */
  export type ApprovalDelegationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ApprovalDelegations to delete
     */
    where?: ApprovalDelegationWhereInput
    /**
     * Limit how many ApprovalDelegations to delete.
     */
    limit?: number
  }

  /**
   * ApprovalDelegation without action
   */
  export type ApprovalDelegationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApprovalDelegation
     */
    select?: ApprovalDelegationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApprovalDelegation
     */
    omit?: ApprovalDelegationOmit<ExtArgs> | null
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
    category: string | null
    rule_type: string | null
    condition_field: string | null
    condition_op: string | null
    condition_value: string | null
    message: string | null
    is_active: boolean | null
    created_by: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type PolicyRuleMaxAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    category: string | null
    rule_type: string | null
    condition_field: string | null
    condition_op: string | null
    condition_value: string | null
    message: string | null
    is_active: boolean | null
    created_by: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type PolicyRuleCountAggregateOutputType = {
    id: number
    name: number
    description: number
    category: number
    rule_type: number
    condition_field: number
    condition_op: number
    condition_value: number
    message: number
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
    category?: true
    rule_type?: true
    condition_field?: true
    condition_op?: true
    condition_value?: true
    message?: true
    is_active?: true
    created_by?: true
    created_at?: true
    updated_at?: true
  }

  export type PolicyRuleMaxAggregateInputType = {
    id?: true
    name?: true
    description?: true
    category?: true
    rule_type?: true
    condition_field?: true
    condition_op?: true
    condition_value?: true
    message?: true
    is_active?: true
    created_by?: true
    created_at?: true
    updated_at?: true
  }

  export type PolicyRuleCountAggregateInputType = {
    id?: true
    name?: true
    description?: true
    category?: true
    rule_type?: true
    condition_field?: true
    condition_op?: true
    condition_value?: true
    message?: true
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
    category: string
    rule_type: string
    condition_field: string
    condition_op: string
    condition_value: string
    message: string | null
    is_active: boolean
    created_by: string | null
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
    category?: boolean
    rule_type?: boolean
    condition_field?: boolean
    condition_op?: boolean
    condition_value?: boolean
    message?: boolean
    is_active?: boolean
    created_by?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["policyRule"]>

  export type PolicyRuleSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    category?: boolean
    rule_type?: boolean
    condition_field?: boolean
    condition_op?: boolean
    condition_value?: boolean
    message?: boolean
    is_active?: boolean
    created_by?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["policyRule"]>

  export type PolicyRuleSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    category?: boolean
    rule_type?: boolean
    condition_field?: boolean
    condition_op?: boolean
    condition_value?: boolean
    message?: boolean
    is_active?: boolean
    created_by?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["policyRule"]>

  export type PolicyRuleSelectScalar = {
    id?: boolean
    name?: boolean
    description?: boolean
    category?: boolean
    rule_type?: boolean
    condition_field?: boolean
    condition_op?: boolean
    condition_value?: boolean
    message?: boolean
    is_active?: boolean
    created_by?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type PolicyRuleOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "description" | "category" | "rule_type" | "condition_field" | "condition_op" | "condition_value" | "message" | "is_active" | "created_by" | "created_at" | "updated_at", ExtArgs["result"]["policyRule"]>

  export type $PolicyRulePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PolicyRule"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      description: string | null
      category: string
      rule_type: string
      condition_field: string
      condition_op: string
      condition_value: string
      message: string | null
      is_active: boolean
      created_by: string | null
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
    readonly category: FieldRef<"PolicyRule", 'String'>
    readonly rule_type: FieldRef<"PolicyRule", 'String'>
    readonly condition_field: FieldRef<"PolicyRule", 'String'>
    readonly condition_op: FieldRef<"PolicyRule", 'String'>
    readonly condition_value: FieldRef<"PolicyRule", 'String'>
    readonly message: FieldRef<"PolicyRule", 'String'>
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
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const WorkflowScalarFieldEnum: {
    id: 'id',
    change_type: 'change_type',
    section: 'section',
    status: 'status',
    requested_by: 'requested_by',
    requester_name: 'requester_name',
    effective_date: 'effective_date',
    current_step: 'current_step',
    total_steps: 'total_steps',
    old_values: 'old_values',
    new_values: 'new_values',
    created_at: 'created_at',
    updated_at: 'updated_at',
    completed_at: 'completed_at'
  };

  export type WorkflowScalarFieldEnum = (typeof WorkflowScalarFieldEnum)[keyof typeof WorkflowScalarFieldEnum]


  export const WorkflowStepScalarFieldEnum: {
    id: 'id',
    workflow_id: 'workflow_id',
    step_number: 'step_number',
    role: 'role',
    role_name: 'role_name',
    approver_id: 'approver_id',
    approver_name: 'approver_name',
    status: 'status',
    action_date: 'action_date',
    comments: 'comments'
  };

  export type WorkflowStepScalarFieldEnum = (typeof WorkflowStepScalarFieldEnum)[keyof typeof WorkflowStepScalarFieldEnum]


  export const ApprovalActionScalarFieldEnum: {
    id: 'id',
    workflow_id: 'workflow_id',
    step_number: 'step_number',
    action: 'action',
    performed_by: 'performed_by',
    comments: 'comments',
    performed_at: 'performed_at',
    details: 'details'
  };

  export type ApprovalActionScalarFieldEnum = (typeof ApprovalActionScalarFieldEnum)[keyof typeof ApprovalActionScalarFieldEnum]


  export const DelegationScalarFieldEnum: {
    id: 'id',
    delegator_id: 'delegator_id',
    delegate_id: 'delegate_id',
    start_date: 'start_date',
    end_date: 'end_date',
    change_types: 'change_types',
    status: 'status',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type DelegationScalarFieldEnum = (typeof DelegationScalarFieldEnum)[keyof typeof DelegationScalarFieldEnum]


  export const ApprovalDelegationScalarFieldEnum: {
    id: 'id',
    delegator_id: 'delegator_id',
    delegate_id: 'delegate_id',
    start_date: 'start_date',
    end_date: 'end_date',
    workflow_types: 'workflow_types',
    is_active: 'is_active',
    revoked_at: 'revoked_at',
    revoked_by: 'revoked_by',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type ApprovalDelegationScalarFieldEnum = (typeof ApprovalDelegationScalarFieldEnum)[keyof typeof ApprovalDelegationScalarFieldEnum]


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


  export const PolicyRuleScalarFieldEnum: {
    id: 'id',
    name: 'name',
    description: 'description',
    category: 'category',
    rule_type: 'rule_type',
    condition_field: 'condition_field',
    condition_op: 'condition_op',
    condition_value: 'condition_value',
    message: 'message',
    is_active: 'is_active',
    created_by: 'created_by',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type PolicyRuleScalarFieldEnum = (typeof PolicyRuleScalarFieldEnum)[keyof typeof PolicyRuleScalarFieldEnum]


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


  export type WorkflowWhereInput = {
    AND?: WorkflowWhereInput | WorkflowWhereInput[]
    OR?: WorkflowWhereInput[]
    NOT?: WorkflowWhereInput | WorkflowWhereInput[]
    id?: StringFilter<"Workflow"> | string
    change_type?: StringFilter<"Workflow"> | string
    section?: StringNullableFilter<"Workflow"> | string | null
    status?: StringFilter<"Workflow"> | string
    requested_by?: StringFilter<"Workflow"> | string
    requester_name?: StringNullableFilter<"Workflow"> | string | null
    effective_date?: DateTimeNullableFilter<"Workflow"> | Date | string | null
    current_step?: IntFilter<"Workflow"> | number
    total_steps?: IntFilter<"Workflow"> | number
    old_values?: StringNullableFilter<"Workflow"> | string | null
    new_values?: StringNullableFilter<"Workflow"> | string | null
    created_at?: DateTimeFilter<"Workflow"> | Date | string
    updated_at?: DateTimeFilter<"Workflow"> | Date | string
    completed_at?: DateTimeNullableFilter<"Workflow"> | Date | string | null
    steps?: WorkflowStepListRelationFilter
  }

  export type WorkflowOrderByWithRelationInput = {
    id?: SortOrder
    change_type?: SortOrder
    section?: SortOrderInput | SortOrder
    status?: SortOrder
    requested_by?: SortOrder
    requester_name?: SortOrderInput | SortOrder
    effective_date?: SortOrderInput | SortOrder
    current_step?: SortOrder
    total_steps?: SortOrder
    old_values?: SortOrderInput | SortOrder
    new_values?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    completed_at?: SortOrderInput | SortOrder
    steps?: WorkflowStepOrderByRelationAggregateInput
  }

  export type WorkflowWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: WorkflowWhereInput | WorkflowWhereInput[]
    OR?: WorkflowWhereInput[]
    NOT?: WorkflowWhereInput | WorkflowWhereInput[]
    change_type?: StringFilter<"Workflow"> | string
    section?: StringNullableFilter<"Workflow"> | string | null
    status?: StringFilter<"Workflow"> | string
    requested_by?: StringFilter<"Workflow"> | string
    requester_name?: StringNullableFilter<"Workflow"> | string | null
    effective_date?: DateTimeNullableFilter<"Workflow"> | Date | string | null
    current_step?: IntFilter<"Workflow"> | number
    total_steps?: IntFilter<"Workflow"> | number
    old_values?: StringNullableFilter<"Workflow"> | string | null
    new_values?: StringNullableFilter<"Workflow"> | string | null
    created_at?: DateTimeFilter<"Workflow"> | Date | string
    updated_at?: DateTimeFilter<"Workflow"> | Date | string
    completed_at?: DateTimeNullableFilter<"Workflow"> | Date | string | null
    steps?: WorkflowStepListRelationFilter
  }, "id">

  export type WorkflowOrderByWithAggregationInput = {
    id?: SortOrder
    change_type?: SortOrder
    section?: SortOrderInput | SortOrder
    status?: SortOrder
    requested_by?: SortOrder
    requester_name?: SortOrderInput | SortOrder
    effective_date?: SortOrderInput | SortOrder
    current_step?: SortOrder
    total_steps?: SortOrder
    old_values?: SortOrderInput | SortOrder
    new_values?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    completed_at?: SortOrderInput | SortOrder
    _count?: WorkflowCountOrderByAggregateInput
    _avg?: WorkflowAvgOrderByAggregateInput
    _max?: WorkflowMaxOrderByAggregateInput
    _min?: WorkflowMinOrderByAggregateInput
    _sum?: WorkflowSumOrderByAggregateInput
  }

  export type WorkflowScalarWhereWithAggregatesInput = {
    AND?: WorkflowScalarWhereWithAggregatesInput | WorkflowScalarWhereWithAggregatesInput[]
    OR?: WorkflowScalarWhereWithAggregatesInput[]
    NOT?: WorkflowScalarWhereWithAggregatesInput | WorkflowScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Workflow"> | string
    change_type?: StringWithAggregatesFilter<"Workflow"> | string
    section?: StringNullableWithAggregatesFilter<"Workflow"> | string | null
    status?: StringWithAggregatesFilter<"Workflow"> | string
    requested_by?: StringWithAggregatesFilter<"Workflow"> | string
    requester_name?: StringNullableWithAggregatesFilter<"Workflow"> | string | null
    effective_date?: DateTimeNullableWithAggregatesFilter<"Workflow"> | Date | string | null
    current_step?: IntWithAggregatesFilter<"Workflow"> | number
    total_steps?: IntWithAggregatesFilter<"Workflow"> | number
    old_values?: StringNullableWithAggregatesFilter<"Workflow"> | string | null
    new_values?: StringNullableWithAggregatesFilter<"Workflow"> | string | null
    created_at?: DateTimeWithAggregatesFilter<"Workflow"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"Workflow"> | Date | string
    completed_at?: DateTimeNullableWithAggregatesFilter<"Workflow"> | Date | string | null
  }

  export type WorkflowStepWhereInput = {
    AND?: WorkflowStepWhereInput | WorkflowStepWhereInput[]
    OR?: WorkflowStepWhereInput[]
    NOT?: WorkflowStepWhereInput | WorkflowStepWhereInput[]
    id?: StringFilter<"WorkflowStep"> | string
    workflow_id?: StringFilter<"WorkflowStep"> | string
    step_number?: IntFilter<"WorkflowStep"> | number
    role?: StringFilter<"WorkflowStep"> | string
    role_name?: StringNullableFilter<"WorkflowStep"> | string | null
    approver_id?: StringNullableFilter<"WorkflowStep"> | string | null
    approver_name?: StringNullableFilter<"WorkflowStep"> | string | null
    status?: StringFilter<"WorkflowStep"> | string
    action_date?: DateTimeNullableFilter<"WorkflowStep"> | Date | string | null
    comments?: StringNullableFilter<"WorkflowStep"> | string | null
    workflow?: XOR<WorkflowScalarRelationFilter, WorkflowWhereInput>
  }

  export type WorkflowStepOrderByWithRelationInput = {
    id?: SortOrder
    workflow_id?: SortOrder
    step_number?: SortOrder
    role?: SortOrder
    role_name?: SortOrderInput | SortOrder
    approver_id?: SortOrderInput | SortOrder
    approver_name?: SortOrderInput | SortOrder
    status?: SortOrder
    action_date?: SortOrderInput | SortOrder
    comments?: SortOrderInput | SortOrder
    workflow?: WorkflowOrderByWithRelationInput
  }

  export type WorkflowStepWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: WorkflowStepWhereInput | WorkflowStepWhereInput[]
    OR?: WorkflowStepWhereInput[]
    NOT?: WorkflowStepWhereInput | WorkflowStepWhereInput[]
    workflow_id?: StringFilter<"WorkflowStep"> | string
    step_number?: IntFilter<"WorkflowStep"> | number
    role?: StringFilter<"WorkflowStep"> | string
    role_name?: StringNullableFilter<"WorkflowStep"> | string | null
    approver_id?: StringNullableFilter<"WorkflowStep"> | string | null
    approver_name?: StringNullableFilter<"WorkflowStep"> | string | null
    status?: StringFilter<"WorkflowStep"> | string
    action_date?: DateTimeNullableFilter<"WorkflowStep"> | Date | string | null
    comments?: StringNullableFilter<"WorkflowStep"> | string | null
    workflow?: XOR<WorkflowScalarRelationFilter, WorkflowWhereInput>
  }, "id">

  export type WorkflowStepOrderByWithAggregationInput = {
    id?: SortOrder
    workflow_id?: SortOrder
    step_number?: SortOrder
    role?: SortOrder
    role_name?: SortOrderInput | SortOrder
    approver_id?: SortOrderInput | SortOrder
    approver_name?: SortOrderInput | SortOrder
    status?: SortOrder
    action_date?: SortOrderInput | SortOrder
    comments?: SortOrderInput | SortOrder
    _count?: WorkflowStepCountOrderByAggregateInput
    _avg?: WorkflowStepAvgOrderByAggregateInput
    _max?: WorkflowStepMaxOrderByAggregateInput
    _min?: WorkflowStepMinOrderByAggregateInput
    _sum?: WorkflowStepSumOrderByAggregateInput
  }

  export type WorkflowStepScalarWhereWithAggregatesInput = {
    AND?: WorkflowStepScalarWhereWithAggregatesInput | WorkflowStepScalarWhereWithAggregatesInput[]
    OR?: WorkflowStepScalarWhereWithAggregatesInput[]
    NOT?: WorkflowStepScalarWhereWithAggregatesInput | WorkflowStepScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"WorkflowStep"> | string
    workflow_id?: StringWithAggregatesFilter<"WorkflowStep"> | string
    step_number?: IntWithAggregatesFilter<"WorkflowStep"> | number
    role?: StringWithAggregatesFilter<"WorkflowStep"> | string
    role_name?: StringNullableWithAggregatesFilter<"WorkflowStep"> | string | null
    approver_id?: StringNullableWithAggregatesFilter<"WorkflowStep"> | string | null
    approver_name?: StringNullableWithAggregatesFilter<"WorkflowStep"> | string | null
    status?: StringWithAggregatesFilter<"WorkflowStep"> | string
    action_date?: DateTimeNullableWithAggregatesFilter<"WorkflowStep"> | Date | string | null
    comments?: StringNullableWithAggregatesFilter<"WorkflowStep"> | string | null
  }

  export type ApprovalActionWhereInput = {
    AND?: ApprovalActionWhereInput | ApprovalActionWhereInput[]
    OR?: ApprovalActionWhereInput[]
    NOT?: ApprovalActionWhereInput | ApprovalActionWhereInput[]
    id?: StringFilter<"ApprovalAction"> | string
    workflow_id?: StringFilter<"ApprovalAction"> | string
    step_number?: IntNullableFilter<"ApprovalAction"> | number | null
    action?: StringFilter<"ApprovalAction"> | string
    performed_by?: StringFilter<"ApprovalAction"> | string
    comments?: StringNullableFilter<"ApprovalAction"> | string | null
    performed_at?: DateTimeFilter<"ApprovalAction"> | Date | string
    details?: StringNullableFilter<"ApprovalAction"> | string | null
  }

  export type ApprovalActionOrderByWithRelationInput = {
    id?: SortOrder
    workflow_id?: SortOrder
    step_number?: SortOrderInput | SortOrder
    action?: SortOrder
    performed_by?: SortOrder
    comments?: SortOrderInput | SortOrder
    performed_at?: SortOrder
    details?: SortOrderInput | SortOrder
  }

  export type ApprovalActionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ApprovalActionWhereInput | ApprovalActionWhereInput[]
    OR?: ApprovalActionWhereInput[]
    NOT?: ApprovalActionWhereInput | ApprovalActionWhereInput[]
    workflow_id?: StringFilter<"ApprovalAction"> | string
    step_number?: IntNullableFilter<"ApprovalAction"> | number | null
    action?: StringFilter<"ApprovalAction"> | string
    performed_by?: StringFilter<"ApprovalAction"> | string
    comments?: StringNullableFilter<"ApprovalAction"> | string | null
    performed_at?: DateTimeFilter<"ApprovalAction"> | Date | string
    details?: StringNullableFilter<"ApprovalAction"> | string | null
  }, "id">

  export type ApprovalActionOrderByWithAggregationInput = {
    id?: SortOrder
    workflow_id?: SortOrder
    step_number?: SortOrderInput | SortOrder
    action?: SortOrder
    performed_by?: SortOrder
    comments?: SortOrderInput | SortOrder
    performed_at?: SortOrder
    details?: SortOrderInput | SortOrder
    _count?: ApprovalActionCountOrderByAggregateInput
    _avg?: ApprovalActionAvgOrderByAggregateInput
    _max?: ApprovalActionMaxOrderByAggregateInput
    _min?: ApprovalActionMinOrderByAggregateInput
    _sum?: ApprovalActionSumOrderByAggregateInput
  }

  export type ApprovalActionScalarWhereWithAggregatesInput = {
    AND?: ApprovalActionScalarWhereWithAggregatesInput | ApprovalActionScalarWhereWithAggregatesInput[]
    OR?: ApprovalActionScalarWhereWithAggregatesInput[]
    NOT?: ApprovalActionScalarWhereWithAggregatesInput | ApprovalActionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ApprovalAction"> | string
    workflow_id?: StringWithAggregatesFilter<"ApprovalAction"> | string
    step_number?: IntNullableWithAggregatesFilter<"ApprovalAction"> | number | null
    action?: StringWithAggregatesFilter<"ApprovalAction"> | string
    performed_by?: StringWithAggregatesFilter<"ApprovalAction"> | string
    comments?: StringNullableWithAggregatesFilter<"ApprovalAction"> | string | null
    performed_at?: DateTimeWithAggregatesFilter<"ApprovalAction"> | Date | string
    details?: StringNullableWithAggregatesFilter<"ApprovalAction"> | string | null
  }

  export type DelegationWhereInput = {
    AND?: DelegationWhereInput | DelegationWhereInput[]
    OR?: DelegationWhereInput[]
    NOT?: DelegationWhereInput | DelegationWhereInput[]
    id?: StringFilter<"Delegation"> | string
    delegator_id?: StringFilter<"Delegation"> | string
    delegate_id?: StringFilter<"Delegation"> | string
    start_date?: DateTimeFilter<"Delegation"> | Date | string
    end_date?: DateTimeFilter<"Delegation"> | Date | string
    change_types?: JsonNullableFilter<"Delegation">
    status?: StringFilter<"Delegation"> | string
    created_at?: DateTimeFilter<"Delegation"> | Date | string
    updated_at?: DateTimeFilter<"Delegation"> | Date | string
  }

  export type DelegationOrderByWithRelationInput = {
    id?: SortOrder
    delegator_id?: SortOrder
    delegate_id?: SortOrder
    start_date?: SortOrder
    end_date?: SortOrder
    change_types?: SortOrderInput | SortOrder
    status?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type DelegationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: DelegationWhereInput | DelegationWhereInput[]
    OR?: DelegationWhereInput[]
    NOT?: DelegationWhereInput | DelegationWhereInput[]
    delegator_id?: StringFilter<"Delegation"> | string
    delegate_id?: StringFilter<"Delegation"> | string
    start_date?: DateTimeFilter<"Delegation"> | Date | string
    end_date?: DateTimeFilter<"Delegation"> | Date | string
    change_types?: JsonNullableFilter<"Delegation">
    status?: StringFilter<"Delegation"> | string
    created_at?: DateTimeFilter<"Delegation"> | Date | string
    updated_at?: DateTimeFilter<"Delegation"> | Date | string
  }, "id">

  export type DelegationOrderByWithAggregationInput = {
    id?: SortOrder
    delegator_id?: SortOrder
    delegate_id?: SortOrder
    start_date?: SortOrder
    end_date?: SortOrder
    change_types?: SortOrderInput | SortOrder
    status?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: DelegationCountOrderByAggregateInput
    _max?: DelegationMaxOrderByAggregateInput
    _min?: DelegationMinOrderByAggregateInput
  }

  export type DelegationScalarWhereWithAggregatesInput = {
    AND?: DelegationScalarWhereWithAggregatesInput | DelegationScalarWhereWithAggregatesInput[]
    OR?: DelegationScalarWhereWithAggregatesInput[]
    NOT?: DelegationScalarWhereWithAggregatesInput | DelegationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Delegation"> | string
    delegator_id?: StringWithAggregatesFilter<"Delegation"> | string
    delegate_id?: StringWithAggregatesFilter<"Delegation"> | string
    start_date?: DateTimeWithAggregatesFilter<"Delegation"> | Date | string
    end_date?: DateTimeWithAggregatesFilter<"Delegation"> | Date | string
    change_types?: JsonNullableWithAggregatesFilter<"Delegation">
    status?: StringWithAggregatesFilter<"Delegation"> | string
    created_at?: DateTimeWithAggregatesFilter<"Delegation"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"Delegation"> | Date | string
  }

  export type ApprovalDelegationWhereInput = {
    AND?: ApprovalDelegationWhereInput | ApprovalDelegationWhereInput[]
    OR?: ApprovalDelegationWhereInput[]
    NOT?: ApprovalDelegationWhereInput | ApprovalDelegationWhereInput[]
    id?: StringFilter<"ApprovalDelegation"> | string
    delegator_id?: StringFilter<"ApprovalDelegation"> | string
    delegate_id?: StringFilter<"ApprovalDelegation"> | string
    start_date?: DateTimeFilter<"ApprovalDelegation"> | Date | string
    end_date?: DateTimeFilter<"ApprovalDelegation"> | Date | string
    workflow_types?: StringNullableListFilter<"ApprovalDelegation">
    is_active?: BoolFilter<"ApprovalDelegation"> | boolean
    revoked_at?: DateTimeNullableFilter<"ApprovalDelegation"> | Date | string | null
    revoked_by?: StringNullableFilter<"ApprovalDelegation"> | string | null
    created_at?: DateTimeFilter<"ApprovalDelegation"> | Date | string
    updated_at?: DateTimeFilter<"ApprovalDelegation"> | Date | string
  }

  export type ApprovalDelegationOrderByWithRelationInput = {
    id?: SortOrder
    delegator_id?: SortOrder
    delegate_id?: SortOrder
    start_date?: SortOrder
    end_date?: SortOrder
    workflow_types?: SortOrder
    is_active?: SortOrder
    revoked_at?: SortOrderInput | SortOrder
    revoked_by?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type ApprovalDelegationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ApprovalDelegationWhereInput | ApprovalDelegationWhereInput[]
    OR?: ApprovalDelegationWhereInput[]
    NOT?: ApprovalDelegationWhereInput | ApprovalDelegationWhereInput[]
    delegator_id?: StringFilter<"ApprovalDelegation"> | string
    delegate_id?: StringFilter<"ApprovalDelegation"> | string
    start_date?: DateTimeFilter<"ApprovalDelegation"> | Date | string
    end_date?: DateTimeFilter<"ApprovalDelegation"> | Date | string
    workflow_types?: StringNullableListFilter<"ApprovalDelegation">
    is_active?: BoolFilter<"ApprovalDelegation"> | boolean
    revoked_at?: DateTimeNullableFilter<"ApprovalDelegation"> | Date | string | null
    revoked_by?: StringNullableFilter<"ApprovalDelegation"> | string | null
    created_at?: DateTimeFilter<"ApprovalDelegation"> | Date | string
    updated_at?: DateTimeFilter<"ApprovalDelegation"> | Date | string
  }, "id">

  export type ApprovalDelegationOrderByWithAggregationInput = {
    id?: SortOrder
    delegator_id?: SortOrder
    delegate_id?: SortOrder
    start_date?: SortOrder
    end_date?: SortOrder
    workflow_types?: SortOrder
    is_active?: SortOrder
    revoked_at?: SortOrderInput | SortOrder
    revoked_by?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: ApprovalDelegationCountOrderByAggregateInput
    _max?: ApprovalDelegationMaxOrderByAggregateInput
    _min?: ApprovalDelegationMinOrderByAggregateInput
  }

  export type ApprovalDelegationScalarWhereWithAggregatesInput = {
    AND?: ApprovalDelegationScalarWhereWithAggregatesInput | ApprovalDelegationScalarWhereWithAggregatesInput[]
    OR?: ApprovalDelegationScalarWhereWithAggregatesInput[]
    NOT?: ApprovalDelegationScalarWhereWithAggregatesInput | ApprovalDelegationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ApprovalDelegation"> | string
    delegator_id?: StringWithAggregatesFilter<"ApprovalDelegation"> | string
    delegate_id?: StringWithAggregatesFilter<"ApprovalDelegation"> | string
    start_date?: DateTimeWithAggregatesFilter<"ApprovalDelegation"> | Date | string
    end_date?: DateTimeWithAggregatesFilter<"ApprovalDelegation"> | Date | string
    workflow_types?: StringNullableListFilter<"ApprovalDelegation">
    is_active?: BoolWithAggregatesFilter<"ApprovalDelegation"> | boolean
    revoked_at?: DateTimeNullableWithAggregatesFilter<"ApprovalDelegation"> | Date | string | null
    revoked_by?: StringNullableWithAggregatesFilter<"ApprovalDelegation"> | string | null
    created_at?: DateTimeWithAggregatesFilter<"ApprovalDelegation"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"ApprovalDelegation"> | Date | string
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

  export type PolicyRuleWhereInput = {
    AND?: PolicyRuleWhereInput | PolicyRuleWhereInput[]
    OR?: PolicyRuleWhereInput[]
    NOT?: PolicyRuleWhereInput | PolicyRuleWhereInput[]
    id?: StringFilter<"PolicyRule"> | string
    name?: StringFilter<"PolicyRule"> | string
    description?: StringNullableFilter<"PolicyRule"> | string | null
    category?: StringFilter<"PolicyRule"> | string
    rule_type?: StringFilter<"PolicyRule"> | string
    condition_field?: StringFilter<"PolicyRule"> | string
    condition_op?: StringFilter<"PolicyRule"> | string
    condition_value?: StringFilter<"PolicyRule"> | string
    message?: StringNullableFilter<"PolicyRule"> | string | null
    is_active?: BoolFilter<"PolicyRule"> | boolean
    created_by?: StringNullableFilter<"PolicyRule"> | string | null
    created_at?: DateTimeFilter<"PolicyRule"> | Date | string
    updated_at?: DateTimeFilter<"PolicyRule"> | Date | string
  }

  export type PolicyRuleOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    category?: SortOrder
    rule_type?: SortOrder
    condition_field?: SortOrder
    condition_op?: SortOrder
    condition_value?: SortOrder
    message?: SortOrderInput | SortOrder
    is_active?: SortOrder
    created_by?: SortOrderInput | SortOrder
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
    category?: StringFilter<"PolicyRule"> | string
    rule_type?: StringFilter<"PolicyRule"> | string
    condition_field?: StringFilter<"PolicyRule"> | string
    condition_op?: StringFilter<"PolicyRule"> | string
    condition_value?: StringFilter<"PolicyRule"> | string
    message?: StringNullableFilter<"PolicyRule"> | string | null
    is_active?: BoolFilter<"PolicyRule"> | boolean
    created_by?: StringNullableFilter<"PolicyRule"> | string | null
    created_at?: DateTimeFilter<"PolicyRule"> | Date | string
    updated_at?: DateTimeFilter<"PolicyRule"> | Date | string
  }, "id">

  export type PolicyRuleOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    category?: SortOrder
    rule_type?: SortOrder
    condition_field?: SortOrder
    condition_op?: SortOrder
    condition_value?: SortOrder
    message?: SortOrderInput | SortOrder
    is_active?: SortOrder
    created_by?: SortOrderInput | SortOrder
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
    category?: StringWithAggregatesFilter<"PolicyRule"> | string
    rule_type?: StringWithAggregatesFilter<"PolicyRule"> | string
    condition_field?: StringWithAggregatesFilter<"PolicyRule"> | string
    condition_op?: StringWithAggregatesFilter<"PolicyRule"> | string
    condition_value?: StringWithAggregatesFilter<"PolicyRule"> | string
    message?: StringNullableWithAggregatesFilter<"PolicyRule"> | string | null
    is_active?: BoolWithAggregatesFilter<"PolicyRule"> | boolean
    created_by?: StringNullableWithAggregatesFilter<"PolicyRule"> | string | null
    created_at?: DateTimeWithAggregatesFilter<"PolicyRule"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"PolicyRule"> | Date | string
  }

  export type WorkflowCreateInput = {
    id?: string
    change_type: string
    section?: string | null
    status?: string
    requested_by: string
    requester_name?: string | null
    effective_date?: Date | string | null
    current_step?: number
    total_steps?: number
    old_values?: string | null
    new_values?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    completed_at?: Date | string | null
    steps?: WorkflowStepCreateNestedManyWithoutWorkflowInput
  }

  export type WorkflowUncheckedCreateInput = {
    id?: string
    change_type: string
    section?: string | null
    status?: string
    requested_by: string
    requester_name?: string | null
    effective_date?: Date | string | null
    current_step?: number
    total_steps?: number
    old_values?: string | null
    new_values?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    completed_at?: Date | string | null
    steps?: WorkflowStepUncheckedCreateNestedManyWithoutWorkflowInput
  }

  export type WorkflowUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    change_type?: StringFieldUpdateOperationsInput | string
    section?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    requested_by?: StringFieldUpdateOperationsInput | string
    requester_name?: NullableStringFieldUpdateOperationsInput | string | null
    effective_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    current_step?: IntFieldUpdateOperationsInput | number
    total_steps?: IntFieldUpdateOperationsInput | number
    old_values?: NullableStringFieldUpdateOperationsInput | string | null
    new_values?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    completed_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    steps?: WorkflowStepUpdateManyWithoutWorkflowNestedInput
  }

  export type WorkflowUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    change_type?: StringFieldUpdateOperationsInput | string
    section?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    requested_by?: StringFieldUpdateOperationsInput | string
    requester_name?: NullableStringFieldUpdateOperationsInput | string | null
    effective_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    current_step?: IntFieldUpdateOperationsInput | number
    total_steps?: IntFieldUpdateOperationsInput | number
    old_values?: NullableStringFieldUpdateOperationsInput | string | null
    new_values?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    completed_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    steps?: WorkflowStepUncheckedUpdateManyWithoutWorkflowNestedInput
  }

  export type WorkflowCreateManyInput = {
    id?: string
    change_type: string
    section?: string | null
    status?: string
    requested_by: string
    requester_name?: string | null
    effective_date?: Date | string | null
    current_step?: number
    total_steps?: number
    old_values?: string | null
    new_values?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    completed_at?: Date | string | null
  }

  export type WorkflowUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    change_type?: StringFieldUpdateOperationsInput | string
    section?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    requested_by?: StringFieldUpdateOperationsInput | string
    requester_name?: NullableStringFieldUpdateOperationsInput | string | null
    effective_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    current_step?: IntFieldUpdateOperationsInput | number
    total_steps?: IntFieldUpdateOperationsInput | number
    old_values?: NullableStringFieldUpdateOperationsInput | string | null
    new_values?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    completed_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type WorkflowUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    change_type?: StringFieldUpdateOperationsInput | string
    section?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    requested_by?: StringFieldUpdateOperationsInput | string
    requester_name?: NullableStringFieldUpdateOperationsInput | string | null
    effective_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    current_step?: IntFieldUpdateOperationsInput | number
    total_steps?: IntFieldUpdateOperationsInput | number
    old_values?: NullableStringFieldUpdateOperationsInput | string | null
    new_values?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    completed_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type WorkflowStepCreateInput = {
    id?: string
    step_number: number
    role: string
    role_name?: string | null
    approver_id?: string | null
    approver_name?: string | null
    status?: string
    action_date?: Date | string | null
    comments?: string | null
    workflow: WorkflowCreateNestedOneWithoutStepsInput
  }

  export type WorkflowStepUncheckedCreateInput = {
    id?: string
    workflow_id: string
    step_number: number
    role: string
    role_name?: string | null
    approver_id?: string | null
    approver_name?: string | null
    status?: string
    action_date?: Date | string | null
    comments?: string | null
  }

  export type WorkflowStepUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    step_number?: IntFieldUpdateOperationsInput | number
    role?: StringFieldUpdateOperationsInput | string
    role_name?: NullableStringFieldUpdateOperationsInput | string | null
    approver_id?: NullableStringFieldUpdateOperationsInput | string | null
    approver_name?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    action_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    comments?: NullableStringFieldUpdateOperationsInput | string | null
    workflow?: WorkflowUpdateOneRequiredWithoutStepsNestedInput
  }

  export type WorkflowStepUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    workflow_id?: StringFieldUpdateOperationsInput | string
    step_number?: IntFieldUpdateOperationsInput | number
    role?: StringFieldUpdateOperationsInput | string
    role_name?: NullableStringFieldUpdateOperationsInput | string | null
    approver_id?: NullableStringFieldUpdateOperationsInput | string | null
    approver_name?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    action_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    comments?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type WorkflowStepCreateManyInput = {
    id?: string
    workflow_id: string
    step_number: number
    role: string
    role_name?: string | null
    approver_id?: string | null
    approver_name?: string | null
    status?: string
    action_date?: Date | string | null
    comments?: string | null
  }

  export type WorkflowStepUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    step_number?: IntFieldUpdateOperationsInput | number
    role?: StringFieldUpdateOperationsInput | string
    role_name?: NullableStringFieldUpdateOperationsInput | string | null
    approver_id?: NullableStringFieldUpdateOperationsInput | string | null
    approver_name?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    action_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    comments?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type WorkflowStepUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    workflow_id?: StringFieldUpdateOperationsInput | string
    step_number?: IntFieldUpdateOperationsInput | number
    role?: StringFieldUpdateOperationsInput | string
    role_name?: NullableStringFieldUpdateOperationsInput | string | null
    approver_id?: NullableStringFieldUpdateOperationsInput | string | null
    approver_name?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    action_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    comments?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ApprovalActionCreateInput = {
    id?: string
    workflow_id: string
    step_number?: number | null
    action: string
    performed_by: string
    comments?: string | null
    performed_at?: Date | string
    details?: string | null
  }

  export type ApprovalActionUncheckedCreateInput = {
    id?: string
    workflow_id: string
    step_number?: number | null
    action: string
    performed_by: string
    comments?: string | null
    performed_at?: Date | string
    details?: string | null
  }

  export type ApprovalActionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    workflow_id?: StringFieldUpdateOperationsInput | string
    step_number?: NullableIntFieldUpdateOperationsInput | number | null
    action?: StringFieldUpdateOperationsInput | string
    performed_by?: StringFieldUpdateOperationsInput | string
    comments?: NullableStringFieldUpdateOperationsInput | string | null
    performed_at?: DateTimeFieldUpdateOperationsInput | Date | string
    details?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ApprovalActionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    workflow_id?: StringFieldUpdateOperationsInput | string
    step_number?: NullableIntFieldUpdateOperationsInput | number | null
    action?: StringFieldUpdateOperationsInput | string
    performed_by?: StringFieldUpdateOperationsInput | string
    comments?: NullableStringFieldUpdateOperationsInput | string | null
    performed_at?: DateTimeFieldUpdateOperationsInput | Date | string
    details?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ApprovalActionCreateManyInput = {
    id?: string
    workflow_id: string
    step_number?: number | null
    action: string
    performed_by: string
    comments?: string | null
    performed_at?: Date | string
    details?: string | null
  }

  export type ApprovalActionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    workflow_id?: StringFieldUpdateOperationsInput | string
    step_number?: NullableIntFieldUpdateOperationsInput | number | null
    action?: StringFieldUpdateOperationsInput | string
    performed_by?: StringFieldUpdateOperationsInput | string
    comments?: NullableStringFieldUpdateOperationsInput | string | null
    performed_at?: DateTimeFieldUpdateOperationsInput | Date | string
    details?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ApprovalActionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    workflow_id?: StringFieldUpdateOperationsInput | string
    step_number?: NullableIntFieldUpdateOperationsInput | number | null
    action?: StringFieldUpdateOperationsInput | string
    performed_by?: StringFieldUpdateOperationsInput | string
    comments?: NullableStringFieldUpdateOperationsInput | string | null
    performed_at?: DateTimeFieldUpdateOperationsInput | Date | string
    details?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type DelegationCreateInput = {
    id?: string
    delegator_id: string
    delegate_id: string
    start_date: Date | string
    end_date: Date | string
    change_types?: NullableJsonNullValueInput | InputJsonValue
    status?: string
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type DelegationUncheckedCreateInput = {
    id?: string
    delegator_id: string
    delegate_id: string
    start_date: Date | string
    end_date: Date | string
    change_types?: NullableJsonNullValueInput | InputJsonValue
    status?: string
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type DelegationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    delegator_id?: StringFieldUpdateOperationsInput | string
    delegate_id?: StringFieldUpdateOperationsInput | string
    start_date?: DateTimeFieldUpdateOperationsInput | Date | string
    end_date?: DateTimeFieldUpdateOperationsInput | Date | string
    change_types?: NullableJsonNullValueInput | InputJsonValue
    status?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DelegationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    delegator_id?: StringFieldUpdateOperationsInput | string
    delegate_id?: StringFieldUpdateOperationsInput | string
    start_date?: DateTimeFieldUpdateOperationsInput | Date | string
    end_date?: DateTimeFieldUpdateOperationsInput | Date | string
    change_types?: NullableJsonNullValueInput | InputJsonValue
    status?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DelegationCreateManyInput = {
    id?: string
    delegator_id: string
    delegate_id: string
    start_date: Date | string
    end_date: Date | string
    change_types?: NullableJsonNullValueInput | InputJsonValue
    status?: string
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type DelegationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    delegator_id?: StringFieldUpdateOperationsInput | string
    delegate_id?: StringFieldUpdateOperationsInput | string
    start_date?: DateTimeFieldUpdateOperationsInput | Date | string
    end_date?: DateTimeFieldUpdateOperationsInput | Date | string
    change_types?: NullableJsonNullValueInput | InputJsonValue
    status?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DelegationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    delegator_id?: StringFieldUpdateOperationsInput | string
    delegate_id?: StringFieldUpdateOperationsInput | string
    start_date?: DateTimeFieldUpdateOperationsInput | Date | string
    end_date?: DateTimeFieldUpdateOperationsInput | Date | string
    change_types?: NullableJsonNullValueInput | InputJsonValue
    status?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ApprovalDelegationCreateInput = {
    id?: string
    delegator_id: string
    delegate_id: string
    start_date: Date | string
    end_date: Date | string
    workflow_types?: ApprovalDelegationCreateworkflow_typesInput | string[]
    is_active?: boolean
    revoked_at?: Date | string | null
    revoked_by?: string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type ApprovalDelegationUncheckedCreateInput = {
    id?: string
    delegator_id: string
    delegate_id: string
    start_date: Date | string
    end_date: Date | string
    workflow_types?: ApprovalDelegationCreateworkflow_typesInput | string[]
    is_active?: boolean
    revoked_at?: Date | string | null
    revoked_by?: string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type ApprovalDelegationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    delegator_id?: StringFieldUpdateOperationsInput | string
    delegate_id?: StringFieldUpdateOperationsInput | string
    start_date?: DateTimeFieldUpdateOperationsInput | Date | string
    end_date?: DateTimeFieldUpdateOperationsInput | Date | string
    workflow_types?: ApprovalDelegationUpdateworkflow_typesInput | string[]
    is_active?: BoolFieldUpdateOperationsInput | boolean
    revoked_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    revoked_by?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ApprovalDelegationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    delegator_id?: StringFieldUpdateOperationsInput | string
    delegate_id?: StringFieldUpdateOperationsInput | string
    start_date?: DateTimeFieldUpdateOperationsInput | Date | string
    end_date?: DateTimeFieldUpdateOperationsInput | Date | string
    workflow_types?: ApprovalDelegationUpdateworkflow_typesInput | string[]
    is_active?: BoolFieldUpdateOperationsInput | boolean
    revoked_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    revoked_by?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ApprovalDelegationCreateManyInput = {
    id?: string
    delegator_id: string
    delegate_id: string
    start_date: Date | string
    end_date: Date | string
    workflow_types?: ApprovalDelegationCreateworkflow_typesInput | string[]
    is_active?: boolean
    revoked_at?: Date | string | null
    revoked_by?: string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type ApprovalDelegationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    delegator_id?: StringFieldUpdateOperationsInput | string
    delegate_id?: StringFieldUpdateOperationsInput | string
    start_date?: DateTimeFieldUpdateOperationsInput | Date | string
    end_date?: DateTimeFieldUpdateOperationsInput | Date | string
    workflow_types?: ApprovalDelegationUpdateworkflow_typesInput | string[]
    is_active?: BoolFieldUpdateOperationsInput | boolean
    revoked_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    revoked_by?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ApprovalDelegationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    delegator_id?: StringFieldUpdateOperationsInput | string
    delegate_id?: StringFieldUpdateOperationsInput | string
    start_date?: DateTimeFieldUpdateOperationsInput | Date | string
    end_date?: DateTimeFieldUpdateOperationsInput | Date | string
    workflow_types?: ApprovalDelegationUpdateworkflow_typesInput | string[]
    is_active?: BoolFieldUpdateOperationsInput | boolean
    revoked_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    revoked_by?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
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

  export type PolicyRuleCreateInput = {
    id?: string
    name: string
    description?: string | null
    category: string
    rule_type: string
    condition_field: string
    condition_op: string
    condition_value: string
    message?: string | null
    is_active?: boolean
    created_by?: string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type PolicyRuleUncheckedCreateInput = {
    id?: string
    name: string
    description?: string | null
    category: string
    rule_type: string
    condition_field: string
    condition_op: string
    condition_value: string
    message?: string | null
    is_active?: boolean
    created_by?: string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type PolicyRuleUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    category?: StringFieldUpdateOperationsInput | string
    rule_type?: StringFieldUpdateOperationsInput | string
    condition_field?: StringFieldUpdateOperationsInput | string
    condition_op?: StringFieldUpdateOperationsInput | string
    condition_value?: StringFieldUpdateOperationsInput | string
    message?: NullableStringFieldUpdateOperationsInput | string | null
    is_active?: BoolFieldUpdateOperationsInput | boolean
    created_by?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PolicyRuleUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    category?: StringFieldUpdateOperationsInput | string
    rule_type?: StringFieldUpdateOperationsInput | string
    condition_field?: StringFieldUpdateOperationsInput | string
    condition_op?: StringFieldUpdateOperationsInput | string
    condition_value?: StringFieldUpdateOperationsInput | string
    message?: NullableStringFieldUpdateOperationsInput | string | null
    is_active?: BoolFieldUpdateOperationsInput | boolean
    created_by?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PolicyRuleCreateManyInput = {
    id?: string
    name: string
    description?: string | null
    category: string
    rule_type: string
    condition_field: string
    condition_op: string
    condition_value: string
    message?: string | null
    is_active?: boolean
    created_by?: string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type PolicyRuleUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    category?: StringFieldUpdateOperationsInput | string
    rule_type?: StringFieldUpdateOperationsInput | string
    condition_field?: StringFieldUpdateOperationsInput | string
    condition_op?: StringFieldUpdateOperationsInput | string
    condition_value?: StringFieldUpdateOperationsInput | string
    message?: NullableStringFieldUpdateOperationsInput | string | null
    is_active?: BoolFieldUpdateOperationsInput | boolean
    created_by?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PolicyRuleUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    category?: StringFieldUpdateOperationsInput | string
    rule_type?: StringFieldUpdateOperationsInput | string
    condition_field?: StringFieldUpdateOperationsInput | string
    condition_op?: StringFieldUpdateOperationsInput | string
    condition_value?: StringFieldUpdateOperationsInput | string
    message?: NullableStringFieldUpdateOperationsInput | string | null
    is_active?: BoolFieldUpdateOperationsInput | boolean
    created_by?: NullableStringFieldUpdateOperationsInput | string | null
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

  export type WorkflowStepListRelationFilter = {
    every?: WorkflowStepWhereInput
    some?: WorkflowStepWhereInput
    none?: WorkflowStepWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type WorkflowStepOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type WorkflowCountOrderByAggregateInput = {
    id?: SortOrder
    change_type?: SortOrder
    section?: SortOrder
    status?: SortOrder
    requested_by?: SortOrder
    requester_name?: SortOrder
    effective_date?: SortOrder
    current_step?: SortOrder
    total_steps?: SortOrder
    old_values?: SortOrder
    new_values?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    completed_at?: SortOrder
  }

  export type WorkflowAvgOrderByAggregateInput = {
    current_step?: SortOrder
    total_steps?: SortOrder
  }

  export type WorkflowMaxOrderByAggregateInput = {
    id?: SortOrder
    change_type?: SortOrder
    section?: SortOrder
    status?: SortOrder
    requested_by?: SortOrder
    requester_name?: SortOrder
    effective_date?: SortOrder
    current_step?: SortOrder
    total_steps?: SortOrder
    old_values?: SortOrder
    new_values?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    completed_at?: SortOrder
  }

  export type WorkflowMinOrderByAggregateInput = {
    id?: SortOrder
    change_type?: SortOrder
    section?: SortOrder
    status?: SortOrder
    requested_by?: SortOrder
    requester_name?: SortOrder
    effective_date?: SortOrder
    current_step?: SortOrder
    total_steps?: SortOrder
    old_values?: SortOrder
    new_values?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    completed_at?: SortOrder
  }

  export type WorkflowSumOrderByAggregateInput = {
    current_step?: SortOrder
    total_steps?: SortOrder
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

  export type WorkflowScalarRelationFilter = {
    is?: WorkflowWhereInput
    isNot?: WorkflowWhereInput
  }

  export type WorkflowStepCountOrderByAggregateInput = {
    id?: SortOrder
    workflow_id?: SortOrder
    step_number?: SortOrder
    role?: SortOrder
    role_name?: SortOrder
    approver_id?: SortOrder
    approver_name?: SortOrder
    status?: SortOrder
    action_date?: SortOrder
    comments?: SortOrder
  }

  export type WorkflowStepAvgOrderByAggregateInput = {
    step_number?: SortOrder
  }

  export type WorkflowStepMaxOrderByAggregateInput = {
    id?: SortOrder
    workflow_id?: SortOrder
    step_number?: SortOrder
    role?: SortOrder
    role_name?: SortOrder
    approver_id?: SortOrder
    approver_name?: SortOrder
    status?: SortOrder
    action_date?: SortOrder
    comments?: SortOrder
  }

  export type WorkflowStepMinOrderByAggregateInput = {
    id?: SortOrder
    workflow_id?: SortOrder
    step_number?: SortOrder
    role?: SortOrder
    role_name?: SortOrder
    approver_id?: SortOrder
    approver_name?: SortOrder
    status?: SortOrder
    action_date?: SortOrder
    comments?: SortOrder
  }

  export type WorkflowStepSumOrderByAggregateInput = {
    step_number?: SortOrder
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

  export type ApprovalActionCountOrderByAggregateInput = {
    id?: SortOrder
    workflow_id?: SortOrder
    step_number?: SortOrder
    action?: SortOrder
    performed_by?: SortOrder
    comments?: SortOrder
    performed_at?: SortOrder
    details?: SortOrder
  }

  export type ApprovalActionAvgOrderByAggregateInput = {
    step_number?: SortOrder
  }

  export type ApprovalActionMaxOrderByAggregateInput = {
    id?: SortOrder
    workflow_id?: SortOrder
    step_number?: SortOrder
    action?: SortOrder
    performed_by?: SortOrder
    comments?: SortOrder
    performed_at?: SortOrder
    details?: SortOrder
  }

  export type ApprovalActionMinOrderByAggregateInput = {
    id?: SortOrder
    workflow_id?: SortOrder
    step_number?: SortOrder
    action?: SortOrder
    performed_by?: SortOrder
    comments?: SortOrder
    performed_at?: SortOrder
    details?: SortOrder
  }

  export type ApprovalActionSumOrderByAggregateInput = {
    step_number?: SortOrder
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

  export type DelegationCountOrderByAggregateInput = {
    id?: SortOrder
    delegator_id?: SortOrder
    delegate_id?: SortOrder
    start_date?: SortOrder
    end_date?: SortOrder
    change_types?: SortOrder
    status?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type DelegationMaxOrderByAggregateInput = {
    id?: SortOrder
    delegator_id?: SortOrder
    delegate_id?: SortOrder
    start_date?: SortOrder
    end_date?: SortOrder
    status?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type DelegationMinOrderByAggregateInput = {
    id?: SortOrder
    delegator_id?: SortOrder
    delegate_id?: SortOrder
    start_date?: SortOrder
    end_date?: SortOrder
    status?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
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

  export type ApprovalDelegationCountOrderByAggregateInput = {
    id?: SortOrder
    delegator_id?: SortOrder
    delegate_id?: SortOrder
    start_date?: SortOrder
    end_date?: SortOrder
    workflow_types?: SortOrder
    is_active?: SortOrder
    revoked_at?: SortOrder
    revoked_by?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type ApprovalDelegationMaxOrderByAggregateInput = {
    id?: SortOrder
    delegator_id?: SortOrder
    delegate_id?: SortOrder
    start_date?: SortOrder
    end_date?: SortOrder
    is_active?: SortOrder
    revoked_at?: SortOrder
    revoked_by?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type ApprovalDelegationMinOrderByAggregateInput = {
    id?: SortOrder
    delegator_id?: SortOrder
    delegate_id?: SortOrder
    start_date?: SortOrder
    end_date?: SortOrder
    is_active?: SortOrder
    revoked_at?: SortOrder
    revoked_by?: SortOrder
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

  export type PolicyRuleCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    category?: SortOrder
    rule_type?: SortOrder
    condition_field?: SortOrder
    condition_op?: SortOrder
    condition_value?: SortOrder
    message?: SortOrder
    is_active?: SortOrder
    created_by?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type PolicyRuleMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    category?: SortOrder
    rule_type?: SortOrder
    condition_field?: SortOrder
    condition_op?: SortOrder
    condition_value?: SortOrder
    message?: SortOrder
    is_active?: SortOrder
    created_by?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type PolicyRuleMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    category?: SortOrder
    rule_type?: SortOrder
    condition_field?: SortOrder
    condition_op?: SortOrder
    condition_value?: SortOrder
    message?: SortOrder
    is_active?: SortOrder
    created_by?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type WorkflowStepCreateNestedManyWithoutWorkflowInput = {
    create?: XOR<WorkflowStepCreateWithoutWorkflowInput, WorkflowStepUncheckedCreateWithoutWorkflowInput> | WorkflowStepCreateWithoutWorkflowInput[] | WorkflowStepUncheckedCreateWithoutWorkflowInput[]
    connectOrCreate?: WorkflowStepCreateOrConnectWithoutWorkflowInput | WorkflowStepCreateOrConnectWithoutWorkflowInput[]
    createMany?: WorkflowStepCreateManyWorkflowInputEnvelope
    connect?: WorkflowStepWhereUniqueInput | WorkflowStepWhereUniqueInput[]
  }

  export type WorkflowStepUncheckedCreateNestedManyWithoutWorkflowInput = {
    create?: XOR<WorkflowStepCreateWithoutWorkflowInput, WorkflowStepUncheckedCreateWithoutWorkflowInput> | WorkflowStepCreateWithoutWorkflowInput[] | WorkflowStepUncheckedCreateWithoutWorkflowInput[]
    connectOrCreate?: WorkflowStepCreateOrConnectWithoutWorkflowInput | WorkflowStepCreateOrConnectWithoutWorkflowInput[]
    createMany?: WorkflowStepCreateManyWorkflowInputEnvelope
    connect?: WorkflowStepWhereUniqueInput | WorkflowStepWhereUniqueInput[]
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

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type WorkflowStepUpdateManyWithoutWorkflowNestedInput = {
    create?: XOR<WorkflowStepCreateWithoutWorkflowInput, WorkflowStepUncheckedCreateWithoutWorkflowInput> | WorkflowStepCreateWithoutWorkflowInput[] | WorkflowStepUncheckedCreateWithoutWorkflowInput[]
    connectOrCreate?: WorkflowStepCreateOrConnectWithoutWorkflowInput | WorkflowStepCreateOrConnectWithoutWorkflowInput[]
    upsert?: WorkflowStepUpsertWithWhereUniqueWithoutWorkflowInput | WorkflowStepUpsertWithWhereUniqueWithoutWorkflowInput[]
    createMany?: WorkflowStepCreateManyWorkflowInputEnvelope
    set?: WorkflowStepWhereUniqueInput | WorkflowStepWhereUniqueInput[]
    disconnect?: WorkflowStepWhereUniqueInput | WorkflowStepWhereUniqueInput[]
    delete?: WorkflowStepWhereUniqueInput | WorkflowStepWhereUniqueInput[]
    connect?: WorkflowStepWhereUniqueInput | WorkflowStepWhereUniqueInput[]
    update?: WorkflowStepUpdateWithWhereUniqueWithoutWorkflowInput | WorkflowStepUpdateWithWhereUniqueWithoutWorkflowInput[]
    updateMany?: WorkflowStepUpdateManyWithWhereWithoutWorkflowInput | WorkflowStepUpdateManyWithWhereWithoutWorkflowInput[]
    deleteMany?: WorkflowStepScalarWhereInput | WorkflowStepScalarWhereInput[]
  }

  export type WorkflowStepUncheckedUpdateManyWithoutWorkflowNestedInput = {
    create?: XOR<WorkflowStepCreateWithoutWorkflowInput, WorkflowStepUncheckedCreateWithoutWorkflowInput> | WorkflowStepCreateWithoutWorkflowInput[] | WorkflowStepUncheckedCreateWithoutWorkflowInput[]
    connectOrCreate?: WorkflowStepCreateOrConnectWithoutWorkflowInput | WorkflowStepCreateOrConnectWithoutWorkflowInput[]
    upsert?: WorkflowStepUpsertWithWhereUniqueWithoutWorkflowInput | WorkflowStepUpsertWithWhereUniqueWithoutWorkflowInput[]
    createMany?: WorkflowStepCreateManyWorkflowInputEnvelope
    set?: WorkflowStepWhereUniqueInput | WorkflowStepWhereUniqueInput[]
    disconnect?: WorkflowStepWhereUniqueInput | WorkflowStepWhereUniqueInput[]
    delete?: WorkflowStepWhereUniqueInput | WorkflowStepWhereUniqueInput[]
    connect?: WorkflowStepWhereUniqueInput | WorkflowStepWhereUniqueInput[]
    update?: WorkflowStepUpdateWithWhereUniqueWithoutWorkflowInput | WorkflowStepUpdateWithWhereUniqueWithoutWorkflowInput[]
    updateMany?: WorkflowStepUpdateManyWithWhereWithoutWorkflowInput | WorkflowStepUpdateManyWithWhereWithoutWorkflowInput[]
    deleteMany?: WorkflowStepScalarWhereInput | WorkflowStepScalarWhereInput[]
  }

  export type WorkflowCreateNestedOneWithoutStepsInput = {
    create?: XOR<WorkflowCreateWithoutStepsInput, WorkflowUncheckedCreateWithoutStepsInput>
    connectOrCreate?: WorkflowCreateOrConnectWithoutStepsInput
    connect?: WorkflowWhereUniqueInput
  }

  export type WorkflowUpdateOneRequiredWithoutStepsNestedInput = {
    create?: XOR<WorkflowCreateWithoutStepsInput, WorkflowUncheckedCreateWithoutStepsInput>
    connectOrCreate?: WorkflowCreateOrConnectWithoutStepsInput
    upsert?: WorkflowUpsertWithoutStepsInput
    connect?: WorkflowWhereUniqueInput
    update?: XOR<XOR<WorkflowUpdateToOneWithWhereWithoutStepsInput, WorkflowUpdateWithoutStepsInput>, WorkflowUncheckedUpdateWithoutStepsInput>
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type ApprovalDelegationCreateworkflow_typesInput = {
    set: string[]
  }

  export type ApprovalDelegationUpdateworkflow_typesInput = {
    set?: string[]
    push?: string | string[]
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
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

  export type WorkflowStepCreateWithoutWorkflowInput = {
    id?: string
    step_number: number
    role: string
    role_name?: string | null
    approver_id?: string | null
    approver_name?: string | null
    status?: string
    action_date?: Date | string | null
    comments?: string | null
  }

  export type WorkflowStepUncheckedCreateWithoutWorkflowInput = {
    id?: string
    step_number: number
    role: string
    role_name?: string | null
    approver_id?: string | null
    approver_name?: string | null
    status?: string
    action_date?: Date | string | null
    comments?: string | null
  }

  export type WorkflowStepCreateOrConnectWithoutWorkflowInput = {
    where: WorkflowStepWhereUniqueInput
    create: XOR<WorkflowStepCreateWithoutWorkflowInput, WorkflowStepUncheckedCreateWithoutWorkflowInput>
  }

  export type WorkflowStepCreateManyWorkflowInputEnvelope = {
    data: WorkflowStepCreateManyWorkflowInput | WorkflowStepCreateManyWorkflowInput[]
    skipDuplicates?: boolean
  }

  export type WorkflowStepUpsertWithWhereUniqueWithoutWorkflowInput = {
    where: WorkflowStepWhereUniqueInput
    update: XOR<WorkflowStepUpdateWithoutWorkflowInput, WorkflowStepUncheckedUpdateWithoutWorkflowInput>
    create: XOR<WorkflowStepCreateWithoutWorkflowInput, WorkflowStepUncheckedCreateWithoutWorkflowInput>
  }

  export type WorkflowStepUpdateWithWhereUniqueWithoutWorkflowInput = {
    where: WorkflowStepWhereUniqueInput
    data: XOR<WorkflowStepUpdateWithoutWorkflowInput, WorkflowStepUncheckedUpdateWithoutWorkflowInput>
  }

  export type WorkflowStepUpdateManyWithWhereWithoutWorkflowInput = {
    where: WorkflowStepScalarWhereInput
    data: XOR<WorkflowStepUpdateManyMutationInput, WorkflowStepUncheckedUpdateManyWithoutWorkflowInput>
  }

  export type WorkflowStepScalarWhereInput = {
    AND?: WorkflowStepScalarWhereInput | WorkflowStepScalarWhereInput[]
    OR?: WorkflowStepScalarWhereInput[]
    NOT?: WorkflowStepScalarWhereInput | WorkflowStepScalarWhereInput[]
    id?: StringFilter<"WorkflowStep"> | string
    workflow_id?: StringFilter<"WorkflowStep"> | string
    step_number?: IntFilter<"WorkflowStep"> | number
    role?: StringFilter<"WorkflowStep"> | string
    role_name?: StringNullableFilter<"WorkflowStep"> | string | null
    approver_id?: StringNullableFilter<"WorkflowStep"> | string | null
    approver_name?: StringNullableFilter<"WorkflowStep"> | string | null
    status?: StringFilter<"WorkflowStep"> | string
    action_date?: DateTimeNullableFilter<"WorkflowStep"> | Date | string | null
    comments?: StringNullableFilter<"WorkflowStep"> | string | null
  }

  export type WorkflowCreateWithoutStepsInput = {
    id?: string
    change_type: string
    section?: string | null
    status?: string
    requested_by: string
    requester_name?: string | null
    effective_date?: Date | string | null
    current_step?: number
    total_steps?: number
    old_values?: string | null
    new_values?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    completed_at?: Date | string | null
  }

  export type WorkflowUncheckedCreateWithoutStepsInput = {
    id?: string
    change_type: string
    section?: string | null
    status?: string
    requested_by: string
    requester_name?: string | null
    effective_date?: Date | string | null
    current_step?: number
    total_steps?: number
    old_values?: string | null
    new_values?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    completed_at?: Date | string | null
  }

  export type WorkflowCreateOrConnectWithoutStepsInput = {
    where: WorkflowWhereUniqueInput
    create: XOR<WorkflowCreateWithoutStepsInput, WorkflowUncheckedCreateWithoutStepsInput>
  }

  export type WorkflowUpsertWithoutStepsInput = {
    update: XOR<WorkflowUpdateWithoutStepsInput, WorkflowUncheckedUpdateWithoutStepsInput>
    create: XOR<WorkflowCreateWithoutStepsInput, WorkflowUncheckedCreateWithoutStepsInput>
    where?: WorkflowWhereInput
  }

  export type WorkflowUpdateToOneWithWhereWithoutStepsInput = {
    where?: WorkflowWhereInput
    data: XOR<WorkflowUpdateWithoutStepsInput, WorkflowUncheckedUpdateWithoutStepsInput>
  }

  export type WorkflowUpdateWithoutStepsInput = {
    id?: StringFieldUpdateOperationsInput | string
    change_type?: StringFieldUpdateOperationsInput | string
    section?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    requested_by?: StringFieldUpdateOperationsInput | string
    requester_name?: NullableStringFieldUpdateOperationsInput | string | null
    effective_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    current_step?: IntFieldUpdateOperationsInput | number
    total_steps?: IntFieldUpdateOperationsInput | number
    old_values?: NullableStringFieldUpdateOperationsInput | string | null
    new_values?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    completed_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type WorkflowUncheckedUpdateWithoutStepsInput = {
    id?: StringFieldUpdateOperationsInput | string
    change_type?: StringFieldUpdateOperationsInput | string
    section?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    requested_by?: StringFieldUpdateOperationsInput | string
    requester_name?: NullableStringFieldUpdateOperationsInput | string | null
    effective_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    current_step?: IntFieldUpdateOperationsInput | number
    total_steps?: IntFieldUpdateOperationsInput | number
    old_values?: NullableStringFieldUpdateOperationsInput | string | null
    new_values?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    completed_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type WorkflowStepCreateManyWorkflowInput = {
    id?: string
    step_number: number
    role: string
    role_name?: string | null
    approver_id?: string | null
    approver_name?: string | null
    status?: string
    action_date?: Date | string | null
    comments?: string | null
  }

  export type WorkflowStepUpdateWithoutWorkflowInput = {
    id?: StringFieldUpdateOperationsInput | string
    step_number?: IntFieldUpdateOperationsInput | number
    role?: StringFieldUpdateOperationsInput | string
    role_name?: NullableStringFieldUpdateOperationsInput | string | null
    approver_id?: NullableStringFieldUpdateOperationsInput | string | null
    approver_name?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    action_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    comments?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type WorkflowStepUncheckedUpdateWithoutWorkflowInput = {
    id?: StringFieldUpdateOperationsInput | string
    step_number?: IntFieldUpdateOperationsInput | number
    role?: StringFieldUpdateOperationsInput | string
    role_name?: NullableStringFieldUpdateOperationsInput | string | null
    approver_id?: NullableStringFieldUpdateOperationsInput | string | null
    approver_name?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    action_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    comments?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type WorkflowStepUncheckedUpdateManyWithoutWorkflowInput = {
    id?: StringFieldUpdateOperationsInput | string
    step_number?: IntFieldUpdateOperationsInput | number
    role?: StringFieldUpdateOperationsInput | string
    role_name?: NullableStringFieldUpdateOperationsInput | string | null
    approver_id?: NullableStringFieldUpdateOperationsInput | string | null
    approver_name?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    action_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    comments?: NullableStringFieldUpdateOperationsInput | string | null
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