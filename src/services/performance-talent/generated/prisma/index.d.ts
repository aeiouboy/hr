
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
 * Model Goal
 * 
 */
export type Goal = $Result.DefaultSelection<Prisma.$GoalPayload>
/**
 * Model Evaluation
 * 
 */
export type Evaluation = $Result.DefaultSelection<Prisma.$EvaluationPayload>
/**
 * Model EvaluationScore
 * 
 */
export type EvaluationScore = $Result.DefaultSelection<Prisma.$EvaluationScorePayload>
/**
 * Model Competency
 * 
 */
export type Competency = $Result.DefaultSelection<Prisma.$CompetencyPayload>
/**
 * Model TalentProfile
 * 
 */
export type TalentProfile = $Result.DefaultSelection<Prisma.$TalentProfilePayload>
/**
 * Model SuccessionPlan
 * 
 */
export type SuccessionPlan = $Result.DefaultSelection<Prisma.$SuccessionPlanPayload>
/**
 * Model Successor
 * 
 */
export type Successor = $Result.DefaultSelection<Prisma.$SuccessorPayload>
/**
 * Model IDPPlan
 * 
 */
export type IDPPlan = $Result.DefaultSelection<Prisma.$IDPPlanPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Goals
 * const goals = await prisma.goal.findMany()
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
   * // Fetch zero or more Goals
   * const goals = await prisma.goal.findMany()
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
   * `prisma.goal`: Exposes CRUD operations for the **Goal** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Goals
    * const goals = await prisma.goal.findMany()
    * ```
    */
  get goal(): Prisma.GoalDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.evaluation`: Exposes CRUD operations for the **Evaluation** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Evaluations
    * const evaluations = await prisma.evaluation.findMany()
    * ```
    */
  get evaluation(): Prisma.EvaluationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.evaluationScore`: Exposes CRUD operations for the **EvaluationScore** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more EvaluationScores
    * const evaluationScores = await prisma.evaluationScore.findMany()
    * ```
    */
  get evaluationScore(): Prisma.EvaluationScoreDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.competency`: Exposes CRUD operations for the **Competency** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Competencies
    * const competencies = await prisma.competency.findMany()
    * ```
    */
  get competency(): Prisma.CompetencyDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.talentProfile`: Exposes CRUD operations for the **TalentProfile** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TalentProfiles
    * const talentProfiles = await prisma.talentProfile.findMany()
    * ```
    */
  get talentProfile(): Prisma.TalentProfileDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.successionPlan`: Exposes CRUD operations for the **SuccessionPlan** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SuccessionPlans
    * const successionPlans = await prisma.successionPlan.findMany()
    * ```
    */
  get successionPlan(): Prisma.SuccessionPlanDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.successor`: Exposes CRUD operations for the **Successor** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Successors
    * const successors = await prisma.successor.findMany()
    * ```
    */
  get successor(): Prisma.SuccessorDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.iDPPlan`: Exposes CRUD operations for the **IDPPlan** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more IDPPlans
    * const iDPPlans = await prisma.iDPPlan.findMany()
    * ```
    */
  get iDPPlan(): Prisma.IDPPlanDelegate<ExtArgs, ClientOptions>;
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
    Goal: 'Goal',
    Evaluation: 'Evaluation',
    EvaluationScore: 'EvaluationScore',
    Competency: 'Competency',
    TalentProfile: 'TalentProfile',
    SuccessionPlan: 'SuccessionPlan',
    Successor: 'Successor',
    IDPPlan: 'IDPPlan'
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
      modelProps: "goal" | "evaluation" | "evaluationScore" | "competency" | "talentProfile" | "successionPlan" | "successor" | "iDPPlan"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Goal: {
        payload: Prisma.$GoalPayload<ExtArgs>
        fields: Prisma.GoalFieldRefs
        operations: {
          findUnique: {
            args: Prisma.GoalFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GoalPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.GoalFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GoalPayload>
          }
          findFirst: {
            args: Prisma.GoalFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GoalPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.GoalFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GoalPayload>
          }
          findMany: {
            args: Prisma.GoalFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GoalPayload>[]
          }
          create: {
            args: Prisma.GoalCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GoalPayload>
          }
          createMany: {
            args: Prisma.GoalCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.GoalCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GoalPayload>[]
          }
          delete: {
            args: Prisma.GoalDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GoalPayload>
          }
          update: {
            args: Prisma.GoalUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GoalPayload>
          }
          deleteMany: {
            args: Prisma.GoalDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.GoalUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.GoalUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GoalPayload>[]
          }
          upsert: {
            args: Prisma.GoalUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GoalPayload>
          }
          aggregate: {
            args: Prisma.GoalAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateGoal>
          }
          groupBy: {
            args: Prisma.GoalGroupByArgs<ExtArgs>
            result: $Utils.Optional<GoalGroupByOutputType>[]
          }
          count: {
            args: Prisma.GoalCountArgs<ExtArgs>
            result: $Utils.Optional<GoalCountAggregateOutputType> | number
          }
        }
      }
      Evaluation: {
        payload: Prisma.$EvaluationPayload<ExtArgs>
        fields: Prisma.EvaluationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.EvaluationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EvaluationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.EvaluationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EvaluationPayload>
          }
          findFirst: {
            args: Prisma.EvaluationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EvaluationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.EvaluationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EvaluationPayload>
          }
          findMany: {
            args: Prisma.EvaluationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EvaluationPayload>[]
          }
          create: {
            args: Prisma.EvaluationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EvaluationPayload>
          }
          createMany: {
            args: Prisma.EvaluationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.EvaluationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EvaluationPayload>[]
          }
          delete: {
            args: Prisma.EvaluationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EvaluationPayload>
          }
          update: {
            args: Prisma.EvaluationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EvaluationPayload>
          }
          deleteMany: {
            args: Prisma.EvaluationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.EvaluationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.EvaluationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EvaluationPayload>[]
          }
          upsert: {
            args: Prisma.EvaluationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EvaluationPayload>
          }
          aggregate: {
            args: Prisma.EvaluationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateEvaluation>
          }
          groupBy: {
            args: Prisma.EvaluationGroupByArgs<ExtArgs>
            result: $Utils.Optional<EvaluationGroupByOutputType>[]
          }
          count: {
            args: Prisma.EvaluationCountArgs<ExtArgs>
            result: $Utils.Optional<EvaluationCountAggregateOutputType> | number
          }
        }
      }
      EvaluationScore: {
        payload: Prisma.$EvaluationScorePayload<ExtArgs>
        fields: Prisma.EvaluationScoreFieldRefs
        operations: {
          findUnique: {
            args: Prisma.EvaluationScoreFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EvaluationScorePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.EvaluationScoreFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EvaluationScorePayload>
          }
          findFirst: {
            args: Prisma.EvaluationScoreFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EvaluationScorePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.EvaluationScoreFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EvaluationScorePayload>
          }
          findMany: {
            args: Prisma.EvaluationScoreFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EvaluationScorePayload>[]
          }
          create: {
            args: Prisma.EvaluationScoreCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EvaluationScorePayload>
          }
          createMany: {
            args: Prisma.EvaluationScoreCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.EvaluationScoreCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EvaluationScorePayload>[]
          }
          delete: {
            args: Prisma.EvaluationScoreDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EvaluationScorePayload>
          }
          update: {
            args: Prisma.EvaluationScoreUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EvaluationScorePayload>
          }
          deleteMany: {
            args: Prisma.EvaluationScoreDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.EvaluationScoreUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.EvaluationScoreUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EvaluationScorePayload>[]
          }
          upsert: {
            args: Prisma.EvaluationScoreUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EvaluationScorePayload>
          }
          aggregate: {
            args: Prisma.EvaluationScoreAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateEvaluationScore>
          }
          groupBy: {
            args: Prisma.EvaluationScoreGroupByArgs<ExtArgs>
            result: $Utils.Optional<EvaluationScoreGroupByOutputType>[]
          }
          count: {
            args: Prisma.EvaluationScoreCountArgs<ExtArgs>
            result: $Utils.Optional<EvaluationScoreCountAggregateOutputType> | number
          }
        }
      }
      Competency: {
        payload: Prisma.$CompetencyPayload<ExtArgs>
        fields: Prisma.CompetencyFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CompetencyFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompetencyPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CompetencyFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompetencyPayload>
          }
          findFirst: {
            args: Prisma.CompetencyFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompetencyPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CompetencyFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompetencyPayload>
          }
          findMany: {
            args: Prisma.CompetencyFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompetencyPayload>[]
          }
          create: {
            args: Prisma.CompetencyCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompetencyPayload>
          }
          createMany: {
            args: Prisma.CompetencyCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CompetencyCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompetencyPayload>[]
          }
          delete: {
            args: Prisma.CompetencyDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompetencyPayload>
          }
          update: {
            args: Prisma.CompetencyUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompetencyPayload>
          }
          deleteMany: {
            args: Prisma.CompetencyDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CompetencyUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CompetencyUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompetencyPayload>[]
          }
          upsert: {
            args: Prisma.CompetencyUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompetencyPayload>
          }
          aggregate: {
            args: Prisma.CompetencyAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCompetency>
          }
          groupBy: {
            args: Prisma.CompetencyGroupByArgs<ExtArgs>
            result: $Utils.Optional<CompetencyGroupByOutputType>[]
          }
          count: {
            args: Prisma.CompetencyCountArgs<ExtArgs>
            result: $Utils.Optional<CompetencyCountAggregateOutputType> | number
          }
        }
      }
      TalentProfile: {
        payload: Prisma.$TalentProfilePayload<ExtArgs>
        fields: Prisma.TalentProfileFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TalentProfileFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TalentProfilePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TalentProfileFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TalentProfilePayload>
          }
          findFirst: {
            args: Prisma.TalentProfileFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TalentProfilePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TalentProfileFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TalentProfilePayload>
          }
          findMany: {
            args: Prisma.TalentProfileFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TalentProfilePayload>[]
          }
          create: {
            args: Prisma.TalentProfileCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TalentProfilePayload>
          }
          createMany: {
            args: Prisma.TalentProfileCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TalentProfileCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TalentProfilePayload>[]
          }
          delete: {
            args: Prisma.TalentProfileDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TalentProfilePayload>
          }
          update: {
            args: Prisma.TalentProfileUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TalentProfilePayload>
          }
          deleteMany: {
            args: Prisma.TalentProfileDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TalentProfileUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TalentProfileUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TalentProfilePayload>[]
          }
          upsert: {
            args: Prisma.TalentProfileUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TalentProfilePayload>
          }
          aggregate: {
            args: Prisma.TalentProfileAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTalentProfile>
          }
          groupBy: {
            args: Prisma.TalentProfileGroupByArgs<ExtArgs>
            result: $Utils.Optional<TalentProfileGroupByOutputType>[]
          }
          count: {
            args: Prisma.TalentProfileCountArgs<ExtArgs>
            result: $Utils.Optional<TalentProfileCountAggregateOutputType> | number
          }
        }
      }
      SuccessionPlan: {
        payload: Prisma.$SuccessionPlanPayload<ExtArgs>
        fields: Prisma.SuccessionPlanFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SuccessionPlanFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SuccessionPlanPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SuccessionPlanFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SuccessionPlanPayload>
          }
          findFirst: {
            args: Prisma.SuccessionPlanFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SuccessionPlanPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SuccessionPlanFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SuccessionPlanPayload>
          }
          findMany: {
            args: Prisma.SuccessionPlanFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SuccessionPlanPayload>[]
          }
          create: {
            args: Prisma.SuccessionPlanCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SuccessionPlanPayload>
          }
          createMany: {
            args: Prisma.SuccessionPlanCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SuccessionPlanCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SuccessionPlanPayload>[]
          }
          delete: {
            args: Prisma.SuccessionPlanDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SuccessionPlanPayload>
          }
          update: {
            args: Prisma.SuccessionPlanUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SuccessionPlanPayload>
          }
          deleteMany: {
            args: Prisma.SuccessionPlanDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SuccessionPlanUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SuccessionPlanUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SuccessionPlanPayload>[]
          }
          upsert: {
            args: Prisma.SuccessionPlanUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SuccessionPlanPayload>
          }
          aggregate: {
            args: Prisma.SuccessionPlanAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSuccessionPlan>
          }
          groupBy: {
            args: Prisma.SuccessionPlanGroupByArgs<ExtArgs>
            result: $Utils.Optional<SuccessionPlanGroupByOutputType>[]
          }
          count: {
            args: Prisma.SuccessionPlanCountArgs<ExtArgs>
            result: $Utils.Optional<SuccessionPlanCountAggregateOutputType> | number
          }
        }
      }
      Successor: {
        payload: Prisma.$SuccessorPayload<ExtArgs>
        fields: Prisma.SuccessorFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SuccessorFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SuccessorPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SuccessorFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SuccessorPayload>
          }
          findFirst: {
            args: Prisma.SuccessorFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SuccessorPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SuccessorFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SuccessorPayload>
          }
          findMany: {
            args: Prisma.SuccessorFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SuccessorPayload>[]
          }
          create: {
            args: Prisma.SuccessorCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SuccessorPayload>
          }
          createMany: {
            args: Prisma.SuccessorCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SuccessorCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SuccessorPayload>[]
          }
          delete: {
            args: Prisma.SuccessorDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SuccessorPayload>
          }
          update: {
            args: Prisma.SuccessorUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SuccessorPayload>
          }
          deleteMany: {
            args: Prisma.SuccessorDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SuccessorUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SuccessorUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SuccessorPayload>[]
          }
          upsert: {
            args: Prisma.SuccessorUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SuccessorPayload>
          }
          aggregate: {
            args: Prisma.SuccessorAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSuccessor>
          }
          groupBy: {
            args: Prisma.SuccessorGroupByArgs<ExtArgs>
            result: $Utils.Optional<SuccessorGroupByOutputType>[]
          }
          count: {
            args: Prisma.SuccessorCountArgs<ExtArgs>
            result: $Utils.Optional<SuccessorCountAggregateOutputType> | number
          }
        }
      }
      IDPPlan: {
        payload: Prisma.$IDPPlanPayload<ExtArgs>
        fields: Prisma.IDPPlanFieldRefs
        operations: {
          findUnique: {
            args: Prisma.IDPPlanFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IDPPlanPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.IDPPlanFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IDPPlanPayload>
          }
          findFirst: {
            args: Prisma.IDPPlanFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IDPPlanPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.IDPPlanFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IDPPlanPayload>
          }
          findMany: {
            args: Prisma.IDPPlanFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IDPPlanPayload>[]
          }
          create: {
            args: Prisma.IDPPlanCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IDPPlanPayload>
          }
          createMany: {
            args: Prisma.IDPPlanCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.IDPPlanCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IDPPlanPayload>[]
          }
          delete: {
            args: Prisma.IDPPlanDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IDPPlanPayload>
          }
          update: {
            args: Prisma.IDPPlanUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IDPPlanPayload>
          }
          deleteMany: {
            args: Prisma.IDPPlanDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.IDPPlanUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.IDPPlanUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IDPPlanPayload>[]
          }
          upsert: {
            args: Prisma.IDPPlanUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IDPPlanPayload>
          }
          aggregate: {
            args: Prisma.IDPPlanAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateIDPPlan>
          }
          groupBy: {
            args: Prisma.IDPPlanGroupByArgs<ExtArgs>
            result: $Utils.Optional<IDPPlanGroupByOutputType>[]
          }
          count: {
            args: Prisma.IDPPlanCountArgs<ExtArgs>
            result: $Utils.Optional<IDPPlanCountAggregateOutputType> | number
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
    goal?: GoalOmit
    evaluation?: EvaluationOmit
    evaluationScore?: EvaluationScoreOmit
    competency?: CompetencyOmit
    talentProfile?: TalentProfileOmit
    successionPlan?: SuccessionPlanOmit
    successor?: SuccessorOmit
    iDPPlan?: IDPPlanOmit
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
   * Count Type EvaluationCountOutputType
   */

  export type EvaluationCountOutputType = {
    scores: number
  }

  export type EvaluationCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    scores?: boolean | EvaluationCountOutputTypeCountScoresArgs
  }

  // Custom InputTypes
  /**
   * EvaluationCountOutputType without action
   */
  export type EvaluationCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EvaluationCountOutputType
     */
    select?: EvaluationCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * EvaluationCountOutputType without action
   */
  export type EvaluationCountOutputTypeCountScoresArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EvaluationScoreWhereInput
  }


  /**
   * Count Type SuccessionPlanCountOutputType
   */

  export type SuccessionPlanCountOutputType = {
    successors: number
  }

  export type SuccessionPlanCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    successors?: boolean | SuccessionPlanCountOutputTypeCountSuccessorsArgs
  }

  // Custom InputTypes
  /**
   * SuccessionPlanCountOutputType without action
   */
  export type SuccessionPlanCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SuccessionPlanCountOutputType
     */
    select?: SuccessionPlanCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * SuccessionPlanCountOutputType without action
   */
  export type SuccessionPlanCountOutputTypeCountSuccessorsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SuccessorWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Goal
   */

  export type AggregateGoal = {
    _count: GoalCountAggregateOutputType | null
    _avg: GoalAvgAggregateOutputType | null
    _sum: GoalSumAggregateOutputType | null
    _min: GoalMinAggregateOutputType | null
    _max: GoalMaxAggregateOutputType | null
  }

  export type GoalAvgAggregateOutputType = {
    weight: number | null
    target_value: number | null
    actual_value: number | null
    progress: number | null
  }

  export type GoalSumAggregateOutputType = {
    weight: number | null
    target_value: number | null
    actual_value: number | null
    progress: number | null
  }

  export type GoalMinAggregateOutputType = {
    id: string | null
    employee_id: string | null
    title: string | null
    description: string | null
    category: string | null
    weight: number | null
    target_value: number | null
    actual_value: number | null
    unit: string | null
    status: string | null
    progress: number | null
    start_date: Date | null
    due_date: Date | null
    completed_at: Date | null
    period: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type GoalMaxAggregateOutputType = {
    id: string | null
    employee_id: string | null
    title: string | null
    description: string | null
    category: string | null
    weight: number | null
    target_value: number | null
    actual_value: number | null
    unit: string | null
    status: string | null
    progress: number | null
    start_date: Date | null
    due_date: Date | null
    completed_at: Date | null
    period: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type GoalCountAggregateOutputType = {
    id: number
    employee_id: number
    title: number
    description: number
    category: number
    weight: number
    target_value: number
    actual_value: number
    unit: number
    status: number
    progress: number
    start_date: number
    due_date: number
    completed_at: number
    period: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type GoalAvgAggregateInputType = {
    weight?: true
    target_value?: true
    actual_value?: true
    progress?: true
  }

  export type GoalSumAggregateInputType = {
    weight?: true
    target_value?: true
    actual_value?: true
    progress?: true
  }

  export type GoalMinAggregateInputType = {
    id?: true
    employee_id?: true
    title?: true
    description?: true
    category?: true
    weight?: true
    target_value?: true
    actual_value?: true
    unit?: true
    status?: true
    progress?: true
    start_date?: true
    due_date?: true
    completed_at?: true
    period?: true
    created_at?: true
    updated_at?: true
  }

  export type GoalMaxAggregateInputType = {
    id?: true
    employee_id?: true
    title?: true
    description?: true
    category?: true
    weight?: true
    target_value?: true
    actual_value?: true
    unit?: true
    status?: true
    progress?: true
    start_date?: true
    due_date?: true
    completed_at?: true
    period?: true
    created_at?: true
    updated_at?: true
  }

  export type GoalCountAggregateInputType = {
    id?: true
    employee_id?: true
    title?: true
    description?: true
    category?: true
    weight?: true
    target_value?: true
    actual_value?: true
    unit?: true
    status?: true
    progress?: true
    start_date?: true
    due_date?: true
    completed_at?: true
    period?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type GoalAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Goal to aggregate.
     */
    where?: GoalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Goals to fetch.
     */
    orderBy?: GoalOrderByWithRelationInput | GoalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: GoalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Goals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Goals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Goals
    **/
    _count?: true | GoalCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: GoalAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: GoalSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: GoalMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: GoalMaxAggregateInputType
  }

  export type GetGoalAggregateType<T extends GoalAggregateArgs> = {
        [P in keyof T & keyof AggregateGoal]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateGoal[P]>
      : GetScalarType<T[P], AggregateGoal[P]>
  }




  export type GoalGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GoalWhereInput
    orderBy?: GoalOrderByWithAggregationInput | GoalOrderByWithAggregationInput[]
    by: GoalScalarFieldEnum[] | GoalScalarFieldEnum
    having?: GoalScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: GoalCountAggregateInputType | true
    _avg?: GoalAvgAggregateInputType
    _sum?: GoalSumAggregateInputType
    _min?: GoalMinAggregateInputType
    _max?: GoalMaxAggregateInputType
  }

  export type GoalGroupByOutputType = {
    id: string
    employee_id: string
    title: string
    description: string | null
    category: string
    weight: number
    target_value: number | null
    actual_value: number | null
    unit: string | null
    status: string
    progress: number
    start_date: Date | null
    due_date: Date | null
    completed_at: Date | null
    period: string
    created_at: Date
    updated_at: Date
    _count: GoalCountAggregateOutputType | null
    _avg: GoalAvgAggregateOutputType | null
    _sum: GoalSumAggregateOutputType | null
    _min: GoalMinAggregateOutputType | null
    _max: GoalMaxAggregateOutputType | null
  }

  type GetGoalGroupByPayload<T extends GoalGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<GoalGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof GoalGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], GoalGroupByOutputType[P]>
            : GetScalarType<T[P], GoalGroupByOutputType[P]>
        }
      >
    >


  export type GoalSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    employee_id?: boolean
    title?: boolean
    description?: boolean
    category?: boolean
    weight?: boolean
    target_value?: boolean
    actual_value?: boolean
    unit?: boolean
    status?: boolean
    progress?: boolean
    start_date?: boolean
    due_date?: boolean
    completed_at?: boolean
    period?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["goal"]>

  export type GoalSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    employee_id?: boolean
    title?: boolean
    description?: boolean
    category?: boolean
    weight?: boolean
    target_value?: boolean
    actual_value?: boolean
    unit?: boolean
    status?: boolean
    progress?: boolean
    start_date?: boolean
    due_date?: boolean
    completed_at?: boolean
    period?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["goal"]>

  export type GoalSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    employee_id?: boolean
    title?: boolean
    description?: boolean
    category?: boolean
    weight?: boolean
    target_value?: boolean
    actual_value?: boolean
    unit?: boolean
    status?: boolean
    progress?: boolean
    start_date?: boolean
    due_date?: boolean
    completed_at?: boolean
    period?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["goal"]>

  export type GoalSelectScalar = {
    id?: boolean
    employee_id?: boolean
    title?: boolean
    description?: boolean
    category?: boolean
    weight?: boolean
    target_value?: boolean
    actual_value?: boolean
    unit?: boolean
    status?: boolean
    progress?: boolean
    start_date?: boolean
    due_date?: boolean
    completed_at?: boolean
    period?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type GoalOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "employee_id" | "title" | "description" | "category" | "weight" | "target_value" | "actual_value" | "unit" | "status" | "progress" | "start_date" | "due_date" | "completed_at" | "period" | "created_at" | "updated_at", ExtArgs["result"]["goal"]>

  export type $GoalPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Goal"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      employee_id: string
      title: string
      description: string | null
      category: string
      weight: number
      target_value: number | null
      actual_value: number | null
      unit: string | null
      status: string
      progress: number
      start_date: Date | null
      due_date: Date | null
      completed_at: Date | null
      period: string
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["goal"]>
    composites: {}
  }

  type GoalGetPayload<S extends boolean | null | undefined | GoalDefaultArgs> = $Result.GetResult<Prisma.$GoalPayload, S>

  type GoalCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<GoalFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: GoalCountAggregateInputType | true
    }

  export interface GoalDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Goal'], meta: { name: 'Goal' } }
    /**
     * Find zero or one Goal that matches the filter.
     * @param {GoalFindUniqueArgs} args - Arguments to find a Goal
     * @example
     * // Get one Goal
     * const goal = await prisma.goal.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends GoalFindUniqueArgs>(args: SelectSubset<T, GoalFindUniqueArgs<ExtArgs>>): Prisma__GoalClient<$Result.GetResult<Prisma.$GoalPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Goal that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {GoalFindUniqueOrThrowArgs} args - Arguments to find a Goal
     * @example
     * // Get one Goal
     * const goal = await prisma.goal.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends GoalFindUniqueOrThrowArgs>(args: SelectSubset<T, GoalFindUniqueOrThrowArgs<ExtArgs>>): Prisma__GoalClient<$Result.GetResult<Prisma.$GoalPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Goal that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GoalFindFirstArgs} args - Arguments to find a Goal
     * @example
     * // Get one Goal
     * const goal = await prisma.goal.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends GoalFindFirstArgs>(args?: SelectSubset<T, GoalFindFirstArgs<ExtArgs>>): Prisma__GoalClient<$Result.GetResult<Prisma.$GoalPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Goal that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GoalFindFirstOrThrowArgs} args - Arguments to find a Goal
     * @example
     * // Get one Goal
     * const goal = await prisma.goal.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends GoalFindFirstOrThrowArgs>(args?: SelectSubset<T, GoalFindFirstOrThrowArgs<ExtArgs>>): Prisma__GoalClient<$Result.GetResult<Prisma.$GoalPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Goals that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GoalFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Goals
     * const goals = await prisma.goal.findMany()
     * 
     * // Get first 10 Goals
     * const goals = await prisma.goal.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const goalWithIdOnly = await prisma.goal.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends GoalFindManyArgs>(args?: SelectSubset<T, GoalFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GoalPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Goal.
     * @param {GoalCreateArgs} args - Arguments to create a Goal.
     * @example
     * // Create one Goal
     * const Goal = await prisma.goal.create({
     *   data: {
     *     // ... data to create a Goal
     *   }
     * })
     * 
     */
    create<T extends GoalCreateArgs>(args: SelectSubset<T, GoalCreateArgs<ExtArgs>>): Prisma__GoalClient<$Result.GetResult<Prisma.$GoalPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Goals.
     * @param {GoalCreateManyArgs} args - Arguments to create many Goals.
     * @example
     * // Create many Goals
     * const goal = await prisma.goal.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends GoalCreateManyArgs>(args?: SelectSubset<T, GoalCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Goals and returns the data saved in the database.
     * @param {GoalCreateManyAndReturnArgs} args - Arguments to create many Goals.
     * @example
     * // Create many Goals
     * const goal = await prisma.goal.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Goals and only return the `id`
     * const goalWithIdOnly = await prisma.goal.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends GoalCreateManyAndReturnArgs>(args?: SelectSubset<T, GoalCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GoalPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Goal.
     * @param {GoalDeleteArgs} args - Arguments to delete one Goal.
     * @example
     * // Delete one Goal
     * const Goal = await prisma.goal.delete({
     *   where: {
     *     // ... filter to delete one Goal
     *   }
     * })
     * 
     */
    delete<T extends GoalDeleteArgs>(args: SelectSubset<T, GoalDeleteArgs<ExtArgs>>): Prisma__GoalClient<$Result.GetResult<Prisma.$GoalPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Goal.
     * @param {GoalUpdateArgs} args - Arguments to update one Goal.
     * @example
     * // Update one Goal
     * const goal = await prisma.goal.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends GoalUpdateArgs>(args: SelectSubset<T, GoalUpdateArgs<ExtArgs>>): Prisma__GoalClient<$Result.GetResult<Prisma.$GoalPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Goals.
     * @param {GoalDeleteManyArgs} args - Arguments to filter Goals to delete.
     * @example
     * // Delete a few Goals
     * const { count } = await prisma.goal.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends GoalDeleteManyArgs>(args?: SelectSubset<T, GoalDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Goals.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GoalUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Goals
     * const goal = await prisma.goal.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends GoalUpdateManyArgs>(args: SelectSubset<T, GoalUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Goals and returns the data updated in the database.
     * @param {GoalUpdateManyAndReturnArgs} args - Arguments to update many Goals.
     * @example
     * // Update many Goals
     * const goal = await prisma.goal.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Goals and only return the `id`
     * const goalWithIdOnly = await prisma.goal.updateManyAndReturn({
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
    updateManyAndReturn<T extends GoalUpdateManyAndReturnArgs>(args: SelectSubset<T, GoalUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GoalPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Goal.
     * @param {GoalUpsertArgs} args - Arguments to update or create a Goal.
     * @example
     * // Update or create a Goal
     * const goal = await prisma.goal.upsert({
     *   create: {
     *     // ... data to create a Goal
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Goal we want to update
     *   }
     * })
     */
    upsert<T extends GoalUpsertArgs>(args: SelectSubset<T, GoalUpsertArgs<ExtArgs>>): Prisma__GoalClient<$Result.GetResult<Prisma.$GoalPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Goals.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GoalCountArgs} args - Arguments to filter Goals to count.
     * @example
     * // Count the number of Goals
     * const count = await prisma.goal.count({
     *   where: {
     *     // ... the filter for the Goals we want to count
     *   }
     * })
    **/
    count<T extends GoalCountArgs>(
      args?: Subset<T, GoalCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], GoalCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Goal.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GoalAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends GoalAggregateArgs>(args: Subset<T, GoalAggregateArgs>): Prisma.PrismaPromise<GetGoalAggregateType<T>>

    /**
     * Group by Goal.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GoalGroupByArgs} args - Group by arguments.
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
      T extends GoalGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: GoalGroupByArgs['orderBy'] }
        : { orderBy?: GoalGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, GoalGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetGoalGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Goal model
   */
  readonly fields: GoalFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Goal.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__GoalClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the Goal model
   */
  interface GoalFieldRefs {
    readonly id: FieldRef<"Goal", 'String'>
    readonly employee_id: FieldRef<"Goal", 'String'>
    readonly title: FieldRef<"Goal", 'String'>
    readonly description: FieldRef<"Goal", 'String'>
    readonly category: FieldRef<"Goal", 'String'>
    readonly weight: FieldRef<"Goal", 'Int'>
    readonly target_value: FieldRef<"Goal", 'Float'>
    readonly actual_value: FieldRef<"Goal", 'Float'>
    readonly unit: FieldRef<"Goal", 'String'>
    readonly status: FieldRef<"Goal", 'String'>
    readonly progress: FieldRef<"Goal", 'Int'>
    readonly start_date: FieldRef<"Goal", 'DateTime'>
    readonly due_date: FieldRef<"Goal", 'DateTime'>
    readonly completed_at: FieldRef<"Goal", 'DateTime'>
    readonly period: FieldRef<"Goal", 'String'>
    readonly created_at: FieldRef<"Goal", 'DateTime'>
    readonly updated_at: FieldRef<"Goal", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Goal findUnique
   */
  export type GoalFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Goal
     */
    select?: GoalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Goal
     */
    omit?: GoalOmit<ExtArgs> | null
    /**
     * Filter, which Goal to fetch.
     */
    where: GoalWhereUniqueInput
  }

  /**
   * Goal findUniqueOrThrow
   */
  export type GoalFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Goal
     */
    select?: GoalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Goal
     */
    omit?: GoalOmit<ExtArgs> | null
    /**
     * Filter, which Goal to fetch.
     */
    where: GoalWhereUniqueInput
  }

  /**
   * Goal findFirst
   */
  export type GoalFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Goal
     */
    select?: GoalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Goal
     */
    omit?: GoalOmit<ExtArgs> | null
    /**
     * Filter, which Goal to fetch.
     */
    where?: GoalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Goals to fetch.
     */
    orderBy?: GoalOrderByWithRelationInput | GoalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Goals.
     */
    cursor?: GoalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Goals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Goals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Goals.
     */
    distinct?: GoalScalarFieldEnum | GoalScalarFieldEnum[]
  }

  /**
   * Goal findFirstOrThrow
   */
  export type GoalFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Goal
     */
    select?: GoalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Goal
     */
    omit?: GoalOmit<ExtArgs> | null
    /**
     * Filter, which Goal to fetch.
     */
    where?: GoalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Goals to fetch.
     */
    orderBy?: GoalOrderByWithRelationInput | GoalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Goals.
     */
    cursor?: GoalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Goals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Goals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Goals.
     */
    distinct?: GoalScalarFieldEnum | GoalScalarFieldEnum[]
  }

  /**
   * Goal findMany
   */
  export type GoalFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Goal
     */
    select?: GoalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Goal
     */
    omit?: GoalOmit<ExtArgs> | null
    /**
     * Filter, which Goals to fetch.
     */
    where?: GoalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Goals to fetch.
     */
    orderBy?: GoalOrderByWithRelationInput | GoalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Goals.
     */
    cursor?: GoalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Goals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Goals.
     */
    skip?: number
    distinct?: GoalScalarFieldEnum | GoalScalarFieldEnum[]
  }

  /**
   * Goal create
   */
  export type GoalCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Goal
     */
    select?: GoalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Goal
     */
    omit?: GoalOmit<ExtArgs> | null
    /**
     * The data needed to create a Goal.
     */
    data: XOR<GoalCreateInput, GoalUncheckedCreateInput>
  }

  /**
   * Goal createMany
   */
  export type GoalCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Goals.
     */
    data: GoalCreateManyInput | GoalCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Goal createManyAndReturn
   */
  export type GoalCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Goal
     */
    select?: GoalSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Goal
     */
    omit?: GoalOmit<ExtArgs> | null
    /**
     * The data used to create many Goals.
     */
    data: GoalCreateManyInput | GoalCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Goal update
   */
  export type GoalUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Goal
     */
    select?: GoalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Goal
     */
    omit?: GoalOmit<ExtArgs> | null
    /**
     * The data needed to update a Goal.
     */
    data: XOR<GoalUpdateInput, GoalUncheckedUpdateInput>
    /**
     * Choose, which Goal to update.
     */
    where: GoalWhereUniqueInput
  }

  /**
   * Goal updateMany
   */
  export type GoalUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Goals.
     */
    data: XOR<GoalUpdateManyMutationInput, GoalUncheckedUpdateManyInput>
    /**
     * Filter which Goals to update
     */
    where?: GoalWhereInput
    /**
     * Limit how many Goals to update.
     */
    limit?: number
  }

  /**
   * Goal updateManyAndReturn
   */
  export type GoalUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Goal
     */
    select?: GoalSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Goal
     */
    omit?: GoalOmit<ExtArgs> | null
    /**
     * The data used to update Goals.
     */
    data: XOR<GoalUpdateManyMutationInput, GoalUncheckedUpdateManyInput>
    /**
     * Filter which Goals to update
     */
    where?: GoalWhereInput
    /**
     * Limit how many Goals to update.
     */
    limit?: number
  }

  /**
   * Goal upsert
   */
  export type GoalUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Goal
     */
    select?: GoalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Goal
     */
    omit?: GoalOmit<ExtArgs> | null
    /**
     * The filter to search for the Goal to update in case it exists.
     */
    where: GoalWhereUniqueInput
    /**
     * In case the Goal found by the `where` argument doesn't exist, create a new Goal with this data.
     */
    create: XOR<GoalCreateInput, GoalUncheckedCreateInput>
    /**
     * In case the Goal was found with the provided `where` argument, update it with this data.
     */
    update: XOR<GoalUpdateInput, GoalUncheckedUpdateInput>
  }

  /**
   * Goal delete
   */
  export type GoalDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Goal
     */
    select?: GoalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Goal
     */
    omit?: GoalOmit<ExtArgs> | null
    /**
     * Filter which Goal to delete.
     */
    where: GoalWhereUniqueInput
  }

  /**
   * Goal deleteMany
   */
  export type GoalDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Goals to delete
     */
    where?: GoalWhereInput
    /**
     * Limit how many Goals to delete.
     */
    limit?: number
  }

  /**
   * Goal without action
   */
  export type GoalDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Goal
     */
    select?: GoalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Goal
     */
    omit?: GoalOmit<ExtArgs> | null
  }


  /**
   * Model Evaluation
   */

  export type AggregateEvaluation = {
    _count: EvaluationCountAggregateOutputType | null
    _avg: EvaluationAvgAggregateOutputType | null
    _sum: EvaluationSumAggregateOutputType | null
    _min: EvaluationMinAggregateOutputType | null
    _max: EvaluationMaxAggregateOutputType | null
  }

  export type EvaluationAvgAggregateOutputType = {
    self_rating: number | null
    manager_rating: number | null
    final_rating: number | null
  }

  export type EvaluationSumAggregateOutputType = {
    self_rating: number | null
    manager_rating: number | null
    final_rating: number | null
  }

  export type EvaluationMinAggregateOutputType = {
    id: string | null
    employee_id: string | null
    evaluator_id: string | null
    period: string | null
    type: string | null
    status: string | null
    self_rating: number | null
    manager_rating: number | null
    final_rating: number | null
    self_comments: string | null
    manager_comments: string | null
    strengths: string | null
    improvements: string | null
    submitted_at: Date | null
    completed_at: Date | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type EvaluationMaxAggregateOutputType = {
    id: string | null
    employee_id: string | null
    evaluator_id: string | null
    period: string | null
    type: string | null
    status: string | null
    self_rating: number | null
    manager_rating: number | null
    final_rating: number | null
    self_comments: string | null
    manager_comments: string | null
    strengths: string | null
    improvements: string | null
    submitted_at: Date | null
    completed_at: Date | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type EvaluationCountAggregateOutputType = {
    id: number
    employee_id: number
    evaluator_id: number
    period: number
    type: number
    status: number
    self_rating: number
    manager_rating: number
    final_rating: number
    self_comments: number
    manager_comments: number
    strengths: number
    improvements: number
    submitted_at: number
    completed_at: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type EvaluationAvgAggregateInputType = {
    self_rating?: true
    manager_rating?: true
    final_rating?: true
  }

  export type EvaluationSumAggregateInputType = {
    self_rating?: true
    manager_rating?: true
    final_rating?: true
  }

  export type EvaluationMinAggregateInputType = {
    id?: true
    employee_id?: true
    evaluator_id?: true
    period?: true
    type?: true
    status?: true
    self_rating?: true
    manager_rating?: true
    final_rating?: true
    self_comments?: true
    manager_comments?: true
    strengths?: true
    improvements?: true
    submitted_at?: true
    completed_at?: true
    created_at?: true
    updated_at?: true
  }

  export type EvaluationMaxAggregateInputType = {
    id?: true
    employee_id?: true
    evaluator_id?: true
    period?: true
    type?: true
    status?: true
    self_rating?: true
    manager_rating?: true
    final_rating?: true
    self_comments?: true
    manager_comments?: true
    strengths?: true
    improvements?: true
    submitted_at?: true
    completed_at?: true
    created_at?: true
    updated_at?: true
  }

  export type EvaluationCountAggregateInputType = {
    id?: true
    employee_id?: true
    evaluator_id?: true
    period?: true
    type?: true
    status?: true
    self_rating?: true
    manager_rating?: true
    final_rating?: true
    self_comments?: true
    manager_comments?: true
    strengths?: true
    improvements?: true
    submitted_at?: true
    completed_at?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type EvaluationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Evaluation to aggregate.
     */
    where?: EvaluationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Evaluations to fetch.
     */
    orderBy?: EvaluationOrderByWithRelationInput | EvaluationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: EvaluationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Evaluations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Evaluations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Evaluations
    **/
    _count?: true | EvaluationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: EvaluationAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: EvaluationSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EvaluationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EvaluationMaxAggregateInputType
  }

  export type GetEvaluationAggregateType<T extends EvaluationAggregateArgs> = {
        [P in keyof T & keyof AggregateEvaluation]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEvaluation[P]>
      : GetScalarType<T[P], AggregateEvaluation[P]>
  }




  export type EvaluationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EvaluationWhereInput
    orderBy?: EvaluationOrderByWithAggregationInput | EvaluationOrderByWithAggregationInput[]
    by: EvaluationScalarFieldEnum[] | EvaluationScalarFieldEnum
    having?: EvaluationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EvaluationCountAggregateInputType | true
    _avg?: EvaluationAvgAggregateInputType
    _sum?: EvaluationSumAggregateInputType
    _min?: EvaluationMinAggregateInputType
    _max?: EvaluationMaxAggregateInputType
  }

  export type EvaluationGroupByOutputType = {
    id: string
    employee_id: string
    evaluator_id: string
    period: string
    type: string
    status: string
    self_rating: number | null
    manager_rating: number | null
    final_rating: number | null
    self_comments: string | null
    manager_comments: string | null
    strengths: string | null
    improvements: string | null
    submitted_at: Date | null
    completed_at: Date | null
    created_at: Date
    updated_at: Date
    _count: EvaluationCountAggregateOutputType | null
    _avg: EvaluationAvgAggregateOutputType | null
    _sum: EvaluationSumAggregateOutputType | null
    _min: EvaluationMinAggregateOutputType | null
    _max: EvaluationMaxAggregateOutputType | null
  }

  type GetEvaluationGroupByPayload<T extends EvaluationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EvaluationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EvaluationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EvaluationGroupByOutputType[P]>
            : GetScalarType<T[P], EvaluationGroupByOutputType[P]>
        }
      >
    >


  export type EvaluationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    employee_id?: boolean
    evaluator_id?: boolean
    period?: boolean
    type?: boolean
    status?: boolean
    self_rating?: boolean
    manager_rating?: boolean
    final_rating?: boolean
    self_comments?: boolean
    manager_comments?: boolean
    strengths?: boolean
    improvements?: boolean
    submitted_at?: boolean
    completed_at?: boolean
    created_at?: boolean
    updated_at?: boolean
    scores?: boolean | Evaluation$scoresArgs<ExtArgs>
    _count?: boolean | EvaluationCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["evaluation"]>

  export type EvaluationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    employee_id?: boolean
    evaluator_id?: boolean
    period?: boolean
    type?: boolean
    status?: boolean
    self_rating?: boolean
    manager_rating?: boolean
    final_rating?: boolean
    self_comments?: boolean
    manager_comments?: boolean
    strengths?: boolean
    improvements?: boolean
    submitted_at?: boolean
    completed_at?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["evaluation"]>

  export type EvaluationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    employee_id?: boolean
    evaluator_id?: boolean
    period?: boolean
    type?: boolean
    status?: boolean
    self_rating?: boolean
    manager_rating?: boolean
    final_rating?: boolean
    self_comments?: boolean
    manager_comments?: boolean
    strengths?: boolean
    improvements?: boolean
    submitted_at?: boolean
    completed_at?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["evaluation"]>

  export type EvaluationSelectScalar = {
    id?: boolean
    employee_id?: boolean
    evaluator_id?: boolean
    period?: boolean
    type?: boolean
    status?: boolean
    self_rating?: boolean
    manager_rating?: boolean
    final_rating?: boolean
    self_comments?: boolean
    manager_comments?: boolean
    strengths?: boolean
    improvements?: boolean
    submitted_at?: boolean
    completed_at?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type EvaluationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "employee_id" | "evaluator_id" | "period" | "type" | "status" | "self_rating" | "manager_rating" | "final_rating" | "self_comments" | "manager_comments" | "strengths" | "improvements" | "submitted_at" | "completed_at" | "created_at" | "updated_at", ExtArgs["result"]["evaluation"]>
  export type EvaluationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    scores?: boolean | Evaluation$scoresArgs<ExtArgs>
    _count?: boolean | EvaluationCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type EvaluationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type EvaluationIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $EvaluationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Evaluation"
    objects: {
      scores: Prisma.$EvaluationScorePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      employee_id: string
      evaluator_id: string
      period: string
      type: string
      status: string
      self_rating: number | null
      manager_rating: number | null
      final_rating: number | null
      self_comments: string | null
      manager_comments: string | null
      strengths: string | null
      improvements: string | null
      submitted_at: Date | null
      completed_at: Date | null
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["evaluation"]>
    composites: {}
  }

  type EvaluationGetPayload<S extends boolean | null | undefined | EvaluationDefaultArgs> = $Result.GetResult<Prisma.$EvaluationPayload, S>

  type EvaluationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<EvaluationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: EvaluationCountAggregateInputType | true
    }

  export interface EvaluationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Evaluation'], meta: { name: 'Evaluation' } }
    /**
     * Find zero or one Evaluation that matches the filter.
     * @param {EvaluationFindUniqueArgs} args - Arguments to find a Evaluation
     * @example
     * // Get one Evaluation
     * const evaluation = await prisma.evaluation.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends EvaluationFindUniqueArgs>(args: SelectSubset<T, EvaluationFindUniqueArgs<ExtArgs>>): Prisma__EvaluationClient<$Result.GetResult<Prisma.$EvaluationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Evaluation that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {EvaluationFindUniqueOrThrowArgs} args - Arguments to find a Evaluation
     * @example
     * // Get one Evaluation
     * const evaluation = await prisma.evaluation.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends EvaluationFindUniqueOrThrowArgs>(args: SelectSubset<T, EvaluationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__EvaluationClient<$Result.GetResult<Prisma.$EvaluationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Evaluation that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EvaluationFindFirstArgs} args - Arguments to find a Evaluation
     * @example
     * // Get one Evaluation
     * const evaluation = await prisma.evaluation.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends EvaluationFindFirstArgs>(args?: SelectSubset<T, EvaluationFindFirstArgs<ExtArgs>>): Prisma__EvaluationClient<$Result.GetResult<Prisma.$EvaluationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Evaluation that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EvaluationFindFirstOrThrowArgs} args - Arguments to find a Evaluation
     * @example
     * // Get one Evaluation
     * const evaluation = await prisma.evaluation.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends EvaluationFindFirstOrThrowArgs>(args?: SelectSubset<T, EvaluationFindFirstOrThrowArgs<ExtArgs>>): Prisma__EvaluationClient<$Result.GetResult<Prisma.$EvaluationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Evaluations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EvaluationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Evaluations
     * const evaluations = await prisma.evaluation.findMany()
     * 
     * // Get first 10 Evaluations
     * const evaluations = await prisma.evaluation.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const evaluationWithIdOnly = await prisma.evaluation.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends EvaluationFindManyArgs>(args?: SelectSubset<T, EvaluationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EvaluationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Evaluation.
     * @param {EvaluationCreateArgs} args - Arguments to create a Evaluation.
     * @example
     * // Create one Evaluation
     * const Evaluation = await prisma.evaluation.create({
     *   data: {
     *     // ... data to create a Evaluation
     *   }
     * })
     * 
     */
    create<T extends EvaluationCreateArgs>(args: SelectSubset<T, EvaluationCreateArgs<ExtArgs>>): Prisma__EvaluationClient<$Result.GetResult<Prisma.$EvaluationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Evaluations.
     * @param {EvaluationCreateManyArgs} args - Arguments to create many Evaluations.
     * @example
     * // Create many Evaluations
     * const evaluation = await prisma.evaluation.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends EvaluationCreateManyArgs>(args?: SelectSubset<T, EvaluationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Evaluations and returns the data saved in the database.
     * @param {EvaluationCreateManyAndReturnArgs} args - Arguments to create many Evaluations.
     * @example
     * // Create many Evaluations
     * const evaluation = await prisma.evaluation.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Evaluations and only return the `id`
     * const evaluationWithIdOnly = await prisma.evaluation.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends EvaluationCreateManyAndReturnArgs>(args?: SelectSubset<T, EvaluationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EvaluationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Evaluation.
     * @param {EvaluationDeleteArgs} args - Arguments to delete one Evaluation.
     * @example
     * // Delete one Evaluation
     * const Evaluation = await prisma.evaluation.delete({
     *   where: {
     *     // ... filter to delete one Evaluation
     *   }
     * })
     * 
     */
    delete<T extends EvaluationDeleteArgs>(args: SelectSubset<T, EvaluationDeleteArgs<ExtArgs>>): Prisma__EvaluationClient<$Result.GetResult<Prisma.$EvaluationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Evaluation.
     * @param {EvaluationUpdateArgs} args - Arguments to update one Evaluation.
     * @example
     * // Update one Evaluation
     * const evaluation = await prisma.evaluation.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends EvaluationUpdateArgs>(args: SelectSubset<T, EvaluationUpdateArgs<ExtArgs>>): Prisma__EvaluationClient<$Result.GetResult<Prisma.$EvaluationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Evaluations.
     * @param {EvaluationDeleteManyArgs} args - Arguments to filter Evaluations to delete.
     * @example
     * // Delete a few Evaluations
     * const { count } = await prisma.evaluation.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends EvaluationDeleteManyArgs>(args?: SelectSubset<T, EvaluationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Evaluations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EvaluationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Evaluations
     * const evaluation = await prisma.evaluation.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends EvaluationUpdateManyArgs>(args: SelectSubset<T, EvaluationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Evaluations and returns the data updated in the database.
     * @param {EvaluationUpdateManyAndReturnArgs} args - Arguments to update many Evaluations.
     * @example
     * // Update many Evaluations
     * const evaluation = await prisma.evaluation.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Evaluations and only return the `id`
     * const evaluationWithIdOnly = await prisma.evaluation.updateManyAndReturn({
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
    updateManyAndReturn<T extends EvaluationUpdateManyAndReturnArgs>(args: SelectSubset<T, EvaluationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EvaluationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Evaluation.
     * @param {EvaluationUpsertArgs} args - Arguments to update or create a Evaluation.
     * @example
     * // Update or create a Evaluation
     * const evaluation = await prisma.evaluation.upsert({
     *   create: {
     *     // ... data to create a Evaluation
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Evaluation we want to update
     *   }
     * })
     */
    upsert<T extends EvaluationUpsertArgs>(args: SelectSubset<T, EvaluationUpsertArgs<ExtArgs>>): Prisma__EvaluationClient<$Result.GetResult<Prisma.$EvaluationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Evaluations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EvaluationCountArgs} args - Arguments to filter Evaluations to count.
     * @example
     * // Count the number of Evaluations
     * const count = await prisma.evaluation.count({
     *   where: {
     *     // ... the filter for the Evaluations we want to count
     *   }
     * })
    **/
    count<T extends EvaluationCountArgs>(
      args?: Subset<T, EvaluationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EvaluationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Evaluation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EvaluationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends EvaluationAggregateArgs>(args: Subset<T, EvaluationAggregateArgs>): Prisma.PrismaPromise<GetEvaluationAggregateType<T>>

    /**
     * Group by Evaluation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EvaluationGroupByArgs} args - Group by arguments.
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
      T extends EvaluationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EvaluationGroupByArgs['orderBy'] }
        : { orderBy?: EvaluationGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, EvaluationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEvaluationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Evaluation model
   */
  readonly fields: EvaluationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Evaluation.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__EvaluationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    scores<T extends Evaluation$scoresArgs<ExtArgs> = {}>(args?: Subset<T, Evaluation$scoresArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EvaluationScorePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Evaluation model
   */
  interface EvaluationFieldRefs {
    readonly id: FieldRef<"Evaluation", 'String'>
    readonly employee_id: FieldRef<"Evaluation", 'String'>
    readonly evaluator_id: FieldRef<"Evaluation", 'String'>
    readonly period: FieldRef<"Evaluation", 'String'>
    readonly type: FieldRef<"Evaluation", 'String'>
    readonly status: FieldRef<"Evaluation", 'String'>
    readonly self_rating: FieldRef<"Evaluation", 'Float'>
    readonly manager_rating: FieldRef<"Evaluation", 'Float'>
    readonly final_rating: FieldRef<"Evaluation", 'Float'>
    readonly self_comments: FieldRef<"Evaluation", 'String'>
    readonly manager_comments: FieldRef<"Evaluation", 'String'>
    readonly strengths: FieldRef<"Evaluation", 'String'>
    readonly improvements: FieldRef<"Evaluation", 'String'>
    readonly submitted_at: FieldRef<"Evaluation", 'DateTime'>
    readonly completed_at: FieldRef<"Evaluation", 'DateTime'>
    readonly created_at: FieldRef<"Evaluation", 'DateTime'>
    readonly updated_at: FieldRef<"Evaluation", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Evaluation findUnique
   */
  export type EvaluationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Evaluation
     */
    select?: EvaluationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Evaluation
     */
    omit?: EvaluationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EvaluationInclude<ExtArgs> | null
    /**
     * Filter, which Evaluation to fetch.
     */
    where: EvaluationWhereUniqueInput
  }

  /**
   * Evaluation findUniqueOrThrow
   */
  export type EvaluationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Evaluation
     */
    select?: EvaluationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Evaluation
     */
    omit?: EvaluationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EvaluationInclude<ExtArgs> | null
    /**
     * Filter, which Evaluation to fetch.
     */
    where: EvaluationWhereUniqueInput
  }

  /**
   * Evaluation findFirst
   */
  export type EvaluationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Evaluation
     */
    select?: EvaluationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Evaluation
     */
    omit?: EvaluationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EvaluationInclude<ExtArgs> | null
    /**
     * Filter, which Evaluation to fetch.
     */
    where?: EvaluationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Evaluations to fetch.
     */
    orderBy?: EvaluationOrderByWithRelationInput | EvaluationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Evaluations.
     */
    cursor?: EvaluationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Evaluations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Evaluations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Evaluations.
     */
    distinct?: EvaluationScalarFieldEnum | EvaluationScalarFieldEnum[]
  }

  /**
   * Evaluation findFirstOrThrow
   */
  export type EvaluationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Evaluation
     */
    select?: EvaluationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Evaluation
     */
    omit?: EvaluationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EvaluationInclude<ExtArgs> | null
    /**
     * Filter, which Evaluation to fetch.
     */
    where?: EvaluationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Evaluations to fetch.
     */
    orderBy?: EvaluationOrderByWithRelationInput | EvaluationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Evaluations.
     */
    cursor?: EvaluationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Evaluations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Evaluations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Evaluations.
     */
    distinct?: EvaluationScalarFieldEnum | EvaluationScalarFieldEnum[]
  }

  /**
   * Evaluation findMany
   */
  export type EvaluationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Evaluation
     */
    select?: EvaluationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Evaluation
     */
    omit?: EvaluationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EvaluationInclude<ExtArgs> | null
    /**
     * Filter, which Evaluations to fetch.
     */
    where?: EvaluationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Evaluations to fetch.
     */
    orderBy?: EvaluationOrderByWithRelationInput | EvaluationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Evaluations.
     */
    cursor?: EvaluationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Evaluations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Evaluations.
     */
    skip?: number
    distinct?: EvaluationScalarFieldEnum | EvaluationScalarFieldEnum[]
  }

  /**
   * Evaluation create
   */
  export type EvaluationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Evaluation
     */
    select?: EvaluationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Evaluation
     */
    omit?: EvaluationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EvaluationInclude<ExtArgs> | null
    /**
     * The data needed to create a Evaluation.
     */
    data: XOR<EvaluationCreateInput, EvaluationUncheckedCreateInput>
  }

  /**
   * Evaluation createMany
   */
  export type EvaluationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Evaluations.
     */
    data: EvaluationCreateManyInput | EvaluationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Evaluation createManyAndReturn
   */
  export type EvaluationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Evaluation
     */
    select?: EvaluationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Evaluation
     */
    omit?: EvaluationOmit<ExtArgs> | null
    /**
     * The data used to create many Evaluations.
     */
    data: EvaluationCreateManyInput | EvaluationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Evaluation update
   */
  export type EvaluationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Evaluation
     */
    select?: EvaluationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Evaluation
     */
    omit?: EvaluationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EvaluationInclude<ExtArgs> | null
    /**
     * The data needed to update a Evaluation.
     */
    data: XOR<EvaluationUpdateInput, EvaluationUncheckedUpdateInput>
    /**
     * Choose, which Evaluation to update.
     */
    where: EvaluationWhereUniqueInput
  }

  /**
   * Evaluation updateMany
   */
  export type EvaluationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Evaluations.
     */
    data: XOR<EvaluationUpdateManyMutationInput, EvaluationUncheckedUpdateManyInput>
    /**
     * Filter which Evaluations to update
     */
    where?: EvaluationWhereInput
    /**
     * Limit how many Evaluations to update.
     */
    limit?: number
  }

  /**
   * Evaluation updateManyAndReturn
   */
  export type EvaluationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Evaluation
     */
    select?: EvaluationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Evaluation
     */
    omit?: EvaluationOmit<ExtArgs> | null
    /**
     * The data used to update Evaluations.
     */
    data: XOR<EvaluationUpdateManyMutationInput, EvaluationUncheckedUpdateManyInput>
    /**
     * Filter which Evaluations to update
     */
    where?: EvaluationWhereInput
    /**
     * Limit how many Evaluations to update.
     */
    limit?: number
  }

  /**
   * Evaluation upsert
   */
  export type EvaluationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Evaluation
     */
    select?: EvaluationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Evaluation
     */
    omit?: EvaluationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EvaluationInclude<ExtArgs> | null
    /**
     * The filter to search for the Evaluation to update in case it exists.
     */
    where: EvaluationWhereUniqueInput
    /**
     * In case the Evaluation found by the `where` argument doesn't exist, create a new Evaluation with this data.
     */
    create: XOR<EvaluationCreateInput, EvaluationUncheckedCreateInput>
    /**
     * In case the Evaluation was found with the provided `where` argument, update it with this data.
     */
    update: XOR<EvaluationUpdateInput, EvaluationUncheckedUpdateInput>
  }

  /**
   * Evaluation delete
   */
  export type EvaluationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Evaluation
     */
    select?: EvaluationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Evaluation
     */
    omit?: EvaluationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EvaluationInclude<ExtArgs> | null
    /**
     * Filter which Evaluation to delete.
     */
    where: EvaluationWhereUniqueInput
  }

  /**
   * Evaluation deleteMany
   */
  export type EvaluationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Evaluations to delete
     */
    where?: EvaluationWhereInput
    /**
     * Limit how many Evaluations to delete.
     */
    limit?: number
  }

  /**
   * Evaluation.scores
   */
  export type Evaluation$scoresArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EvaluationScore
     */
    select?: EvaluationScoreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EvaluationScore
     */
    omit?: EvaluationScoreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EvaluationScoreInclude<ExtArgs> | null
    where?: EvaluationScoreWhereInput
    orderBy?: EvaluationScoreOrderByWithRelationInput | EvaluationScoreOrderByWithRelationInput[]
    cursor?: EvaluationScoreWhereUniqueInput
    take?: number
    skip?: number
    distinct?: EvaluationScoreScalarFieldEnum | EvaluationScoreScalarFieldEnum[]
  }

  /**
   * Evaluation without action
   */
  export type EvaluationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Evaluation
     */
    select?: EvaluationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Evaluation
     */
    omit?: EvaluationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EvaluationInclude<ExtArgs> | null
  }


  /**
   * Model EvaluationScore
   */

  export type AggregateEvaluationScore = {
    _count: EvaluationScoreCountAggregateOutputType | null
    _avg: EvaluationScoreAvgAggregateOutputType | null
    _sum: EvaluationScoreSumAggregateOutputType | null
    _min: EvaluationScoreMinAggregateOutputType | null
    _max: EvaluationScoreMaxAggregateOutputType | null
  }

  export type EvaluationScoreAvgAggregateOutputType = {
    self_score: number | null
    manager_score: number | null
    final_score: number | null
  }

  export type EvaluationScoreSumAggregateOutputType = {
    self_score: number | null
    manager_score: number | null
    final_score: number | null
  }

  export type EvaluationScoreMinAggregateOutputType = {
    id: string | null
    evaluation_id: string | null
    competency_id: string | null
    self_score: number | null
    manager_score: number | null
    final_score: number | null
    comments: string | null
  }

  export type EvaluationScoreMaxAggregateOutputType = {
    id: string | null
    evaluation_id: string | null
    competency_id: string | null
    self_score: number | null
    manager_score: number | null
    final_score: number | null
    comments: string | null
  }

  export type EvaluationScoreCountAggregateOutputType = {
    id: number
    evaluation_id: number
    competency_id: number
    self_score: number
    manager_score: number
    final_score: number
    comments: number
    _all: number
  }


  export type EvaluationScoreAvgAggregateInputType = {
    self_score?: true
    manager_score?: true
    final_score?: true
  }

  export type EvaluationScoreSumAggregateInputType = {
    self_score?: true
    manager_score?: true
    final_score?: true
  }

  export type EvaluationScoreMinAggregateInputType = {
    id?: true
    evaluation_id?: true
    competency_id?: true
    self_score?: true
    manager_score?: true
    final_score?: true
    comments?: true
  }

  export type EvaluationScoreMaxAggregateInputType = {
    id?: true
    evaluation_id?: true
    competency_id?: true
    self_score?: true
    manager_score?: true
    final_score?: true
    comments?: true
  }

  export type EvaluationScoreCountAggregateInputType = {
    id?: true
    evaluation_id?: true
    competency_id?: true
    self_score?: true
    manager_score?: true
    final_score?: true
    comments?: true
    _all?: true
  }

  export type EvaluationScoreAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which EvaluationScore to aggregate.
     */
    where?: EvaluationScoreWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EvaluationScores to fetch.
     */
    orderBy?: EvaluationScoreOrderByWithRelationInput | EvaluationScoreOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: EvaluationScoreWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EvaluationScores from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EvaluationScores.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned EvaluationScores
    **/
    _count?: true | EvaluationScoreCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: EvaluationScoreAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: EvaluationScoreSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EvaluationScoreMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EvaluationScoreMaxAggregateInputType
  }

  export type GetEvaluationScoreAggregateType<T extends EvaluationScoreAggregateArgs> = {
        [P in keyof T & keyof AggregateEvaluationScore]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEvaluationScore[P]>
      : GetScalarType<T[P], AggregateEvaluationScore[P]>
  }




  export type EvaluationScoreGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EvaluationScoreWhereInput
    orderBy?: EvaluationScoreOrderByWithAggregationInput | EvaluationScoreOrderByWithAggregationInput[]
    by: EvaluationScoreScalarFieldEnum[] | EvaluationScoreScalarFieldEnum
    having?: EvaluationScoreScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EvaluationScoreCountAggregateInputType | true
    _avg?: EvaluationScoreAvgAggregateInputType
    _sum?: EvaluationScoreSumAggregateInputType
    _min?: EvaluationScoreMinAggregateInputType
    _max?: EvaluationScoreMaxAggregateInputType
  }

  export type EvaluationScoreGroupByOutputType = {
    id: string
    evaluation_id: string
    competency_id: string
    self_score: number | null
    manager_score: number | null
    final_score: number | null
    comments: string | null
    _count: EvaluationScoreCountAggregateOutputType | null
    _avg: EvaluationScoreAvgAggregateOutputType | null
    _sum: EvaluationScoreSumAggregateOutputType | null
    _min: EvaluationScoreMinAggregateOutputType | null
    _max: EvaluationScoreMaxAggregateOutputType | null
  }

  type GetEvaluationScoreGroupByPayload<T extends EvaluationScoreGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EvaluationScoreGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EvaluationScoreGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EvaluationScoreGroupByOutputType[P]>
            : GetScalarType<T[P], EvaluationScoreGroupByOutputType[P]>
        }
      >
    >


  export type EvaluationScoreSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    evaluation_id?: boolean
    competency_id?: boolean
    self_score?: boolean
    manager_score?: boolean
    final_score?: boolean
    comments?: boolean
    evaluation?: boolean | EvaluationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["evaluationScore"]>

  export type EvaluationScoreSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    evaluation_id?: boolean
    competency_id?: boolean
    self_score?: boolean
    manager_score?: boolean
    final_score?: boolean
    comments?: boolean
    evaluation?: boolean | EvaluationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["evaluationScore"]>

  export type EvaluationScoreSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    evaluation_id?: boolean
    competency_id?: boolean
    self_score?: boolean
    manager_score?: boolean
    final_score?: boolean
    comments?: boolean
    evaluation?: boolean | EvaluationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["evaluationScore"]>

  export type EvaluationScoreSelectScalar = {
    id?: boolean
    evaluation_id?: boolean
    competency_id?: boolean
    self_score?: boolean
    manager_score?: boolean
    final_score?: boolean
    comments?: boolean
  }

  export type EvaluationScoreOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "evaluation_id" | "competency_id" | "self_score" | "manager_score" | "final_score" | "comments", ExtArgs["result"]["evaluationScore"]>
  export type EvaluationScoreInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    evaluation?: boolean | EvaluationDefaultArgs<ExtArgs>
  }
  export type EvaluationScoreIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    evaluation?: boolean | EvaluationDefaultArgs<ExtArgs>
  }
  export type EvaluationScoreIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    evaluation?: boolean | EvaluationDefaultArgs<ExtArgs>
  }

  export type $EvaluationScorePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "EvaluationScore"
    objects: {
      evaluation: Prisma.$EvaluationPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      evaluation_id: string
      competency_id: string
      self_score: number | null
      manager_score: number | null
      final_score: number | null
      comments: string | null
    }, ExtArgs["result"]["evaluationScore"]>
    composites: {}
  }

  type EvaluationScoreGetPayload<S extends boolean | null | undefined | EvaluationScoreDefaultArgs> = $Result.GetResult<Prisma.$EvaluationScorePayload, S>

  type EvaluationScoreCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<EvaluationScoreFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: EvaluationScoreCountAggregateInputType | true
    }

  export interface EvaluationScoreDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['EvaluationScore'], meta: { name: 'EvaluationScore' } }
    /**
     * Find zero or one EvaluationScore that matches the filter.
     * @param {EvaluationScoreFindUniqueArgs} args - Arguments to find a EvaluationScore
     * @example
     * // Get one EvaluationScore
     * const evaluationScore = await prisma.evaluationScore.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends EvaluationScoreFindUniqueArgs>(args: SelectSubset<T, EvaluationScoreFindUniqueArgs<ExtArgs>>): Prisma__EvaluationScoreClient<$Result.GetResult<Prisma.$EvaluationScorePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one EvaluationScore that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {EvaluationScoreFindUniqueOrThrowArgs} args - Arguments to find a EvaluationScore
     * @example
     * // Get one EvaluationScore
     * const evaluationScore = await prisma.evaluationScore.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends EvaluationScoreFindUniqueOrThrowArgs>(args: SelectSubset<T, EvaluationScoreFindUniqueOrThrowArgs<ExtArgs>>): Prisma__EvaluationScoreClient<$Result.GetResult<Prisma.$EvaluationScorePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first EvaluationScore that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EvaluationScoreFindFirstArgs} args - Arguments to find a EvaluationScore
     * @example
     * // Get one EvaluationScore
     * const evaluationScore = await prisma.evaluationScore.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends EvaluationScoreFindFirstArgs>(args?: SelectSubset<T, EvaluationScoreFindFirstArgs<ExtArgs>>): Prisma__EvaluationScoreClient<$Result.GetResult<Prisma.$EvaluationScorePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first EvaluationScore that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EvaluationScoreFindFirstOrThrowArgs} args - Arguments to find a EvaluationScore
     * @example
     * // Get one EvaluationScore
     * const evaluationScore = await prisma.evaluationScore.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends EvaluationScoreFindFirstOrThrowArgs>(args?: SelectSubset<T, EvaluationScoreFindFirstOrThrowArgs<ExtArgs>>): Prisma__EvaluationScoreClient<$Result.GetResult<Prisma.$EvaluationScorePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more EvaluationScores that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EvaluationScoreFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all EvaluationScores
     * const evaluationScores = await prisma.evaluationScore.findMany()
     * 
     * // Get first 10 EvaluationScores
     * const evaluationScores = await prisma.evaluationScore.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const evaluationScoreWithIdOnly = await prisma.evaluationScore.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends EvaluationScoreFindManyArgs>(args?: SelectSubset<T, EvaluationScoreFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EvaluationScorePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a EvaluationScore.
     * @param {EvaluationScoreCreateArgs} args - Arguments to create a EvaluationScore.
     * @example
     * // Create one EvaluationScore
     * const EvaluationScore = await prisma.evaluationScore.create({
     *   data: {
     *     // ... data to create a EvaluationScore
     *   }
     * })
     * 
     */
    create<T extends EvaluationScoreCreateArgs>(args: SelectSubset<T, EvaluationScoreCreateArgs<ExtArgs>>): Prisma__EvaluationScoreClient<$Result.GetResult<Prisma.$EvaluationScorePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many EvaluationScores.
     * @param {EvaluationScoreCreateManyArgs} args - Arguments to create many EvaluationScores.
     * @example
     * // Create many EvaluationScores
     * const evaluationScore = await prisma.evaluationScore.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends EvaluationScoreCreateManyArgs>(args?: SelectSubset<T, EvaluationScoreCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many EvaluationScores and returns the data saved in the database.
     * @param {EvaluationScoreCreateManyAndReturnArgs} args - Arguments to create many EvaluationScores.
     * @example
     * // Create many EvaluationScores
     * const evaluationScore = await prisma.evaluationScore.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many EvaluationScores and only return the `id`
     * const evaluationScoreWithIdOnly = await prisma.evaluationScore.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends EvaluationScoreCreateManyAndReturnArgs>(args?: SelectSubset<T, EvaluationScoreCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EvaluationScorePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a EvaluationScore.
     * @param {EvaluationScoreDeleteArgs} args - Arguments to delete one EvaluationScore.
     * @example
     * // Delete one EvaluationScore
     * const EvaluationScore = await prisma.evaluationScore.delete({
     *   where: {
     *     // ... filter to delete one EvaluationScore
     *   }
     * })
     * 
     */
    delete<T extends EvaluationScoreDeleteArgs>(args: SelectSubset<T, EvaluationScoreDeleteArgs<ExtArgs>>): Prisma__EvaluationScoreClient<$Result.GetResult<Prisma.$EvaluationScorePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one EvaluationScore.
     * @param {EvaluationScoreUpdateArgs} args - Arguments to update one EvaluationScore.
     * @example
     * // Update one EvaluationScore
     * const evaluationScore = await prisma.evaluationScore.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends EvaluationScoreUpdateArgs>(args: SelectSubset<T, EvaluationScoreUpdateArgs<ExtArgs>>): Prisma__EvaluationScoreClient<$Result.GetResult<Prisma.$EvaluationScorePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more EvaluationScores.
     * @param {EvaluationScoreDeleteManyArgs} args - Arguments to filter EvaluationScores to delete.
     * @example
     * // Delete a few EvaluationScores
     * const { count } = await prisma.evaluationScore.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends EvaluationScoreDeleteManyArgs>(args?: SelectSubset<T, EvaluationScoreDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more EvaluationScores.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EvaluationScoreUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many EvaluationScores
     * const evaluationScore = await prisma.evaluationScore.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends EvaluationScoreUpdateManyArgs>(args: SelectSubset<T, EvaluationScoreUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more EvaluationScores and returns the data updated in the database.
     * @param {EvaluationScoreUpdateManyAndReturnArgs} args - Arguments to update many EvaluationScores.
     * @example
     * // Update many EvaluationScores
     * const evaluationScore = await prisma.evaluationScore.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more EvaluationScores and only return the `id`
     * const evaluationScoreWithIdOnly = await prisma.evaluationScore.updateManyAndReturn({
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
    updateManyAndReturn<T extends EvaluationScoreUpdateManyAndReturnArgs>(args: SelectSubset<T, EvaluationScoreUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EvaluationScorePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one EvaluationScore.
     * @param {EvaluationScoreUpsertArgs} args - Arguments to update or create a EvaluationScore.
     * @example
     * // Update or create a EvaluationScore
     * const evaluationScore = await prisma.evaluationScore.upsert({
     *   create: {
     *     // ... data to create a EvaluationScore
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the EvaluationScore we want to update
     *   }
     * })
     */
    upsert<T extends EvaluationScoreUpsertArgs>(args: SelectSubset<T, EvaluationScoreUpsertArgs<ExtArgs>>): Prisma__EvaluationScoreClient<$Result.GetResult<Prisma.$EvaluationScorePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of EvaluationScores.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EvaluationScoreCountArgs} args - Arguments to filter EvaluationScores to count.
     * @example
     * // Count the number of EvaluationScores
     * const count = await prisma.evaluationScore.count({
     *   where: {
     *     // ... the filter for the EvaluationScores we want to count
     *   }
     * })
    **/
    count<T extends EvaluationScoreCountArgs>(
      args?: Subset<T, EvaluationScoreCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EvaluationScoreCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a EvaluationScore.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EvaluationScoreAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends EvaluationScoreAggregateArgs>(args: Subset<T, EvaluationScoreAggregateArgs>): Prisma.PrismaPromise<GetEvaluationScoreAggregateType<T>>

    /**
     * Group by EvaluationScore.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EvaluationScoreGroupByArgs} args - Group by arguments.
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
      T extends EvaluationScoreGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EvaluationScoreGroupByArgs['orderBy'] }
        : { orderBy?: EvaluationScoreGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, EvaluationScoreGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEvaluationScoreGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the EvaluationScore model
   */
  readonly fields: EvaluationScoreFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for EvaluationScore.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__EvaluationScoreClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    evaluation<T extends EvaluationDefaultArgs<ExtArgs> = {}>(args?: Subset<T, EvaluationDefaultArgs<ExtArgs>>): Prisma__EvaluationClient<$Result.GetResult<Prisma.$EvaluationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the EvaluationScore model
   */
  interface EvaluationScoreFieldRefs {
    readonly id: FieldRef<"EvaluationScore", 'String'>
    readonly evaluation_id: FieldRef<"EvaluationScore", 'String'>
    readonly competency_id: FieldRef<"EvaluationScore", 'String'>
    readonly self_score: FieldRef<"EvaluationScore", 'Float'>
    readonly manager_score: FieldRef<"EvaluationScore", 'Float'>
    readonly final_score: FieldRef<"EvaluationScore", 'Float'>
    readonly comments: FieldRef<"EvaluationScore", 'String'>
  }
    

  // Custom InputTypes
  /**
   * EvaluationScore findUnique
   */
  export type EvaluationScoreFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EvaluationScore
     */
    select?: EvaluationScoreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EvaluationScore
     */
    omit?: EvaluationScoreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EvaluationScoreInclude<ExtArgs> | null
    /**
     * Filter, which EvaluationScore to fetch.
     */
    where: EvaluationScoreWhereUniqueInput
  }

  /**
   * EvaluationScore findUniqueOrThrow
   */
  export type EvaluationScoreFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EvaluationScore
     */
    select?: EvaluationScoreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EvaluationScore
     */
    omit?: EvaluationScoreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EvaluationScoreInclude<ExtArgs> | null
    /**
     * Filter, which EvaluationScore to fetch.
     */
    where: EvaluationScoreWhereUniqueInput
  }

  /**
   * EvaluationScore findFirst
   */
  export type EvaluationScoreFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EvaluationScore
     */
    select?: EvaluationScoreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EvaluationScore
     */
    omit?: EvaluationScoreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EvaluationScoreInclude<ExtArgs> | null
    /**
     * Filter, which EvaluationScore to fetch.
     */
    where?: EvaluationScoreWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EvaluationScores to fetch.
     */
    orderBy?: EvaluationScoreOrderByWithRelationInput | EvaluationScoreOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for EvaluationScores.
     */
    cursor?: EvaluationScoreWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EvaluationScores from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EvaluationScores.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EvaluationScores.
     */
    distinct?: EvaluationScoreScalarFieldEnum | EvaluationScoreScalarFieldEnum[]
  }

  /**
   * EvaluationScore findFirstOrThrow
   */
  export type EvaluationScoreFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EvaluationScore
     */
    select?: EvaluationScoreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EvaluationScore
     */
    omit?: EvaluationScoreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EvaluationScoreInclude<ExtArgs> | null
    /**
     * Filter, which EvaluationScore to fetch.
     */
    where?: EvaluationScoreWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EvaluationScores to fetch.
     */
    orderBy?: EvaluationScoreOrderByWithRelationInput | EvaluationScoreOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for EvaluationScores.
     */
    cursor?: EvaluationScoreWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EvaluationScores from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EvaluationScores.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EvaluationScores.
     */
    distinct?: EvaluationScoreScalarFieldEnum | EvaluationScoreScalarFieldEnum[]
  }

  /**
   * EvaluationScore findMany
   */
  export type EvaluationScoreFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EvaluationScore
     */
    select?: EvaluationScoreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EvaluationScore
     */
    omit?: EvaluationScoreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EvaluationScoreInclude<ExtArgs> | null
    /**
     * Filter, which EvaluationScores to fetch.
     */
    where?: EvaluationScoreWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EvaluationScores to fetch.
     */
    orderBy?: EvaluationScoreOrderByWithRelationInput | EvaluationScoreOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing EvaluationScores.
     */
    cursor?: EvaluationScoreWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EvaluationScores from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EvaluationScores.
     */
    skip?: number
    distinct?: EvaluationScoreScalarFieldEnum | EvaluationScoreScalarFieldEnum[]
  }

  /**
   * EvaluationScore create
   */
  export type EvaluationScoreCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EvaluationScore
     */
    select?: EvaluationScoreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EvaluationScore
     */
    omit?: EvaluationScoreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EvaluationScoreInclude<ExtArgs> | null
    /**
     * The data needed to create a EvaluationScore.
     */
    data: XOR<EvaluationScoreCreateInput, EvaluationScoreUncheckedCreateInput>
  }

  /**
   * EvaluationScore createMany
   */
  export type EvaluationScoreCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many EvaluationScores.
     */
    data: EvaluationScoreCreateManyInput | EvaluationScoreCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * EvaluationScore createManyAndReturn
   */
  export type EvaluationScoreCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EvaluationScore
     */
    select?: EvaluationScoreSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the EvaluationScore
     */
    omit?: EvaluationScoreOmit<ExtArgs> | null
    /**
     * The data used to create many EvaluationScores.
     */
    data: EvaluationScoreCreateManyInput | EvaluationScoreCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EvaluationScoreIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * EvaluationScore update
   */
  export type EvaluationScoreUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EvaluationScore
     */
    select?: EvaluationScoreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EvaluationScore
     */
    omit?: EvaluationScoreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EvaluationScoreInclude<ExtArgs> | null
    /**
     * The data needed to update a EvaluationScore.
     */
    data: XOR<EvaluationScoreUpdateInput, EvaluationScoreUncheckedUpdateInput>
    /**
     * Choose, which EvaluationScore to update.
     */
    where: EvaluationScoreWhereUniqueInput
  }

  /**
   * EvaluationScore updateMany
   */
  export type EvaluationScoreUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update EvaluationScores.
     */
    data: XOR<EvaluationScoreUpdateManyMutationInput, EvaluationScoreUncheckedUpdateManyInput>
    /**
     * Filter which EvaluationScores to update
     */
    where?: EvaluationScoreWhereInput
    /**
     * Limit how many EvaluationScores to update.
     */
    limit?: number
  }

  /**
   * EvaluationScore updateManyAndReturn
   */
  export type EvaluationScoreUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EvaluationScore
     */
    select?: EvaluationScoreSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the EvaluationScore
     */
    omit?: EvaluationScoreOmit<ExtArgs> | null
    /**
     * The data used to update EvaluationScores.
     */
    data: XOR<EvaluationScoreUpdateManyMutationInput, EvaluationScoreUncheckedUpdateManyInput>
    /**
     * Filter which EvaluationScores to update
     */
    where?: EvaluationScoreWhereInput
    /**
     * Limit how many EvaluationScores to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EvaluationScoreIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * EvaluationScore upsert
   */
  export type EvaluationScoreUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EvaluationScore
     */
    select?: EvaluationScoreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EvaluationScore
     */
    omit?: EvaluationScoreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EvaluationScoreInclude<ExtArgs> | null
    /**
     * The filter to search for the EvaluationScore to update in case it exists.
     */
    where: EvaluationScoreWhereUniqueInput
    /**
     * In case the EvaluationScore found by the `where` argument doesn't exist, create a new EvaluationScore with this data.
     */
    create: XOR<EvaluationScoreCreateInput, EvaluationScoreUncheckedCreateInput>
    /**
     * In case the EvaluationScore was found with the provided `where` argument, update it with this data.
     */
    update: XOR<EvaluationScoreUpdateInput, EvaluationScoreUncheckedUpdateInput>
  }

  /**
   * EvaluationScore delete
   */
  export type EvaluationScoreDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EvaluationScore
     */
    select?: EvaluationScoreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EvaluationScore
     */
    omit?: EvaluationScoreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EvaluationScoreInclude<ExtArgs> | null
    /**
     * Filter which EvaluationScore to delete.
     */
    where: EvaluationScoreWhereUniqueInput
  }

  /**
   * EvaluationScore deleteMany
   */
  export type EvaluationScoreDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which EvaluationScores to delete
     */
    where?: EvaluationScoreWhereInput
    /**
     * Limit how many EvaluationScores to delete.
     */
    limit?: number
  }

  /**
   * EvaluationScore without action
   */
  export type EvaluationScoreDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EvaluationScore
     */
    select?: EvaluationScoreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EvaluationScore
     */
    omit?: EvaluationScoreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EvaluationScoreInclude<ExtArgs> | null
  }


  /**
   * Model Competency
   */

  export type AggregateCompetency = {
    _count: CompetencyCountAggregateOutputType | null
    _min: CompetencyMinAggregateOutputType | null
    _max: CompetencyMaxAggregateOutputType | null
  }

  export type CompetencyMinAggregateOutputType = {
    id: string | null
    name: string | null
    category: string | null
    description: string | null
    is_active: boolean | null
    created_at: Date | null
  }

  export type CompetencyMaxAggregateOutputType = {
    id: string | null
    name: string | null
    category: string | null
    description: string | null
    is_active: boolean | null
    created_at: Date | null
  }

  export type CompetencyCountAggregateOutputType = {
    id: number
    name: number
    category: number
    description: number
    levels: number
    is_active: number
    created_at: number
    _all: number
  }


  export type CompetencyMinAggregateInputType = {
    id?: true
    name?: true
    category?: true
    description?: true
    is_active?: true
    created_at?: true
  }

  export type CompetencyMaxAggregateInputType = {
    id?: true
    name?: true
    category?: true
    description?: true
    is_active?: true
    created_at?: true
  }

  export type CompetencyCountAggregateInputType = {
    id?: true
    name?: true
    category?: true
    description?: true
    levels?: true
    is_active?: true
    created_at?: true
    _all?: true
  }

  export type CompetencyAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Competency to aggregate.
     */
    where?: CompetencyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Competencies to fetch.
     */
    orderBy?: CompetencyOrderByWithRelationInput | CompetencyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CompetencyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Competencies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Competencies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Competencies
    **/
    _count?: true | CompetencyCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CompetencyMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CompetencyMaxAggregateInputType
  }

  export type GetCompetencyAggregateType<T extends CompetencyAggregateArgs> = {
        [P in keyof T & keyof AggregateCompetency]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCompetency[P]>
      : GetScalarType<T[P], AggregateCompetency[P]>
  }




  export type CompetencyGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CompetencyWhereInput
    orderBy?: CompetencyOrderByWithAggregationInput | CompetencyOrderByWithAggregationInput[]
    by: CompetencyScalarFieldEnum[] | CompetencyScalarFieldEnum
    having?: CompetencyScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CompetencyCountAggregateInputType | true
    _min?: CompetencyMinAggregateInputType
    _max?: CompetencyMaxAggregateInputType
  }

  export type CompetencyGroupByOutputType = {
    id: string
    name: string
    category: string
    description: string | null
    levels: JsonValue | null
    is_active: boolean
    created_at: Date
    _count: CompetencyCountAggregateOutputType | null
    _min: CompetencyMinAggregateOutputType | null
    _max: CompetencyMaxAggregateOutputType | null
  }

  type GetCompetencyGroupByPayload<T extends CompetencyGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CompetencyGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CompetencyGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CompetencyGroupByOutputType[P]>
            : GetScalarType<T[P], CompetencyGroupByOutputType[P]>
        }
      >
    >


  export type CompetencySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    category?: boolean
    description?: boolean
    levels?: boolean
    is_active?: boolean
    created_at?: boolean
  }, ExtArgs["result"]["competency"]>

  export type CompetencySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    category?: boolean
    description?: boolean
    levels?: boolean
    is_active?: boolean
    created_at?: boolean
  }, ExtArgs["result"]["competency"]>

  export type CompetencySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    category?: boolean
    description?: boolean
    levels?: boolean
    is_active?: boolean
    created_at?: boolean
  }, ExtArgs["result"]["competency"]>

  export type CompetencySelectScalar = {
    id?: boolean
    name?: boolean
    category?: boolean
    description?: boolean
    levels?: boolean
    is_active?: boolean
    created_at?: boolean
  }

  export type CompetencyOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "category" | "description" | "levels" | "is_active" | "created_at", ExtArgs["result"]["competency"]>

  export type $CompetencyPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Competency"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      category: string
      description: string | null
      levels: Prisma.JsonValue | null
      is_active: boolean
      created_at: Date
    }, ExtArgs["result"]["competency"]>
    composites: {}
  }

  type CompetencyGetPayload<S extends boolean | null | undefined | CompetencyDefaultArgs> = $Result.GetResult<Prisma.$CompetencyPayload, S>

  type CompetencyCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CompetencyFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CompetencyCountAggregateInputType | true
    }

  export interface CompetencyDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Competency'], meta: { name: 'Competency' } }
    /**
     * Find zero or one Competency that matches the filter.
     * @param {CompetencyFindUniqueArgs} args - Arguments to find a Competency
     * @example
     * // Get one Competency
     * const competency = await prisma.competency.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CompetencyFindUniqueArgs>(args: SelectSubset<T, CompetencyFindUniqueArgs<ExtArgs>>): Prisma__CompetencyClient<$Result.GetResult<Prisma.$CompetencyPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Competency that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CompetencyFindUniqueOrThrowArgs} args - Arguments to find a Competency
     * @example
     * // Get one Competency
     * const competency = await prisma.competency.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CompetencyFindUniqueOrThrowArgs>(args: SelectSubset<T, CompetencyFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CompetencyClient<$Result.GetResult<Prisma.$CompetencyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Competency that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompetencyFindFirstArgs} args - Arguments to find a Competency
     * @example
     * // Get one Competency
     * const competency = await prisma.competency.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CompetencyFindFirstArgs>(args?: SelectSubset<T, CompetencyFindFirstArgs<ExtArgs>>): Prisma__CompetencyClient<$Result.GetResult<Prisma.$CompetencyPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Competency that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompetencyFindFirstOrThrowArgs} args - Arguments to find a Competency
     * @example
     * // Get one Competency
     * const competency = await prisma.competency.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CompetencyFindFirstOrThrowArgs>(args?: SelectSubset<T, CompetencyFindFirstOrThrowArgs<ExtArgs>>): Prisma__CompetencyClient<$Result.GetResult<Prisma.$CompetencyPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Competencies that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompetencyFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Competencies
     * const competencies = await prisma.competency.findMany()
     * 
     * // Get first 10 Competencies
     * const competencies = await prisma.competency.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const competencyWithIdOnly = await prisma.competency.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CompetencyFindManyArgs>(args?: SelectSubset<T, CompetencyFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CompetencyPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Competency.
     * @param {CompetencyCreateArgs} args - Arguments to create a Competency.
     * @example
     * // Create one Competency
     * const Competency = await prisma.competency.create({
     *   data: {
     *     // ... data to create a Competency
     *   }
     * })
     * 
     */
    create<T extends CompetencyCreateArgs>(args: SelectSubset<T, CompetencyCreateArgs<ExtArgs>>): Prisma__CompetencyClient<$Result.GetResult<Prisma.$CompetencyPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Competencies.
     * @param {CompetencyCreateManyArgs} args - Arguments to create many Competencies.
     * @example
     * // Create many Competencies
     * const competency = await prisma.competency.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CompetencyCreateManyArgs>(args?: SelectSubset<T, CompetencyCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Competencies and returns the data saved in the database.
     * @param {CompetencyCreateManyAndReturnArgs} args - Arguments to create many Competencies.
     * @example
     * // Create many Competencies
     * const competency = await prisma.competency.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Competencies and only return the `id`
     * const competencyWithIdOnly = await prisma.competency.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CompetencyCreateManyAndReturnArgs>(args?: SelectSubset<T, CompetencyCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CompetencyPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Competency.
     * @param {CompetencyDeleteArgs} args - Arguments to delete one Competency.
     * @example
     * // Delete one Competency
     * const Competency = await prisma.competency.delete({
     *   where: {
     *     // ... filter to delete one Competency
     *   }
     * })
     * 
     */
    delete<T extends CompetencyDeleteArgs>(args: SelectSubset<T, CompetencyDeleteArgs<ExtArgs>>): Prisma__CompetencyClient<$Result.GetResult<Prisma.$CompetencyPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Competency.
     * @param {CompetencyUpdateArgs} args - Arguments to update one Competency.
     * @example
     * // Update one Competency
     * const competency = await prisma.competency.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CompetencyUpdateArgs>(args: SelectSubset<T, CompetencyUpdateArgs<ExtArgs>>): Prisma__CompetencyClient<$Result.GetResult<Prisma.$CompetencyPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Competencies.
     * @param {CompetencyDeleteManyArgs} args - Arguments to filter Competencies to delete.
     * @example
     * // Delete a few Competencies
     * const { count } = await prisma.competency.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CompetencyDeleteManyArgs>(args?: SelectSubset<T, CompetencyDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Competencies.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompetencyUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Competencies
     * const competency = await prisma.competency.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CompetencyUpdateManyArgs>(args: SelectSubset<T, CompetencyUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Competencies and returns the data updated in the database.
     * @param {CompetencyUpdateManyAndReturnArgs} args - Arguments to update many Competencies.
     * @example
     * // Update many Competencies
     * const competency = await prisma.competency.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Competencies and only return the `id`
     * const competencyWithIdOnly = await prisma.competency.updateManyAndReturn({
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
    updateManyAndReturn<T extends CompetencyUpdateManyAndReturnArgs>(args: SelectSubset<T, CompetencyUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CompetencyPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Competency.
     * @param {CompetencyUpsertArgs} args - Arguments to update or create a Competency.
     * @example
     * // Update or create a Competency
     * const competency = await prisma.competency.upsert({
     *   create: {
     *     // ... data to create a Competency
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Competency we want to update
     *   }
     * })
     */
    upsert<T extends CompetencyUpsertArgs>(args: SelectSubset<T, CompetencyUpsertArgs<ExtArgs>>): Prisma__CompetencyClient<$Result.GetResult<Prisma.$CompetencyPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Competencies.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompetencyCountArgs} args - Arguments to filter Competencies to count.
     * @example
     * // Count the number of Competencies
     * const count = await prisma.competency.count({
     *   where: {
     *     // ... the filter for the Competencies we want to count
     *   }
     * })
    **/
    count<T extends CompetencyCountArgs>(
      args?: Subset<T, CompetencyCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CompetencyCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Competency.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompetencyAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends CompetencyAggregateArgs>(args: Subset<T, CompetencyAggregateArgs>): Prisma.PrismaPromise<GetCompetencyAggregateType<T>>

    /**
     * Group by Competency.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompetencyGroupByArgs} args - Group by arguments.
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
      T extends CompetencyGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CompetencyGroupByArgs['orderBy'] }
        : { orderBy?: CompetencyGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, CompetencyGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCompetencyGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Competency model
   */
  readonly fields: CompetencyFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Competency.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CompetencyClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the Competency model
   */
  interface CompetencyFieldRefs {
    readonly id: FieldRef<"Competency", 'String'>
    readonly name: FieldRef<"Competency", 'String'>
    readonly category: FieldRef<"Competency", 'String'>
    readonly description: FieldRef<"Competency", 'String'>
    readonly levels: FieldRef<"Competency", 'Json'>
    readonly is_active: FieldRef<"Competency", 'Boolean'>
    readonly created_at: FieldRef<"Competency", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Competency findUnique
   */
  export type CompetencyFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Competency
     */
    select?: CompetencySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Competency
     */
    omit?: CompetencyOmit<ExtArgs> | null
    /**
     * Filter, which Competency to fetch.
     */
    where: CompetencyWhereUniqueInput
  }

  /**
   * Competency findUniqueOrThrow
   */
  export type CompetencyFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Competency
     */
    select?: CompetencySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Competency
     */
    omit?: CompetencyOmit<ExtArgs> | null
    /**
     * Filter, which Competency to fetch.
     */
    where: CompetencyWhereUniqueInput
  }

  /**
   * Competency findFirst
   */
  export type CompetencyFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Competency
     */
    select?: CompetencySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Competency
     */
    omit?: CompetencyOmit<ExtArgs> | null
    /**
     * Filter, which Competency to fetch.
     */
    where?: CompetencyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Competencies to fetch.
     */
    orderBy?: CompetencyOrderByWithRelationInput | CompetencyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Competencies.
     */
    cursor?: CompetencyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Competencies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Competencies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Competencies.
     */
    distinct?: CompetencyScalarFieldEnum | CompetencyScalarFieldEnum[]
  }

  /**
   * Competency findFirstOrThrow
   */
  export type CompetencyFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Competency
     */
    select?: CompetencySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Competency
     */
    omit?: CompetencyOmit<ExtArgs> | null
    /**
     * Filter, which Competency to fetch.
     */
    where?: CompetencyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Competencies to fetch.
     */
    orderBy?: CompetencyOrderByWithRelationInput | CompetencyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Competencies.
     */
    cursor?: CompetencyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Competencies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Competencies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Competencies.
     */
    distinct?: CompetencyScalarFieldEnum | CompetencyScalarFieldEnum[]
  }

  /**
   * Competency findMany
   */
  export type CompetencyFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Competency
     */
    select?: CompetencySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Competency
     */
    omit?: CompetencyOmit<ExtArgs> | null
    /**
     * Filter, which Competencies to fetch.
     */
    where?: CompetencyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Competencies to fetch.
     */
    orderBy?: CompetencyOrderByWithRelationInput | CompetencyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Competencies.
     */
    cursor?: CompetencyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Competencies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Competencies.
     */
    skip?: number
    distinct?: CompetencyScalarFieldEnum | CompetencyScalarFieldEnum[]
  }

  /**
   * Competency create
   */
  export type CompetencyCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Competency
     */
    select?: CompetencySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Competency
     */
    omit?: CompetencyOmit<ExtArgs> | null
    /**
     * The data needed to create a Competency.
     */
    data: XOR<CompetencyCreateInput, CompetencyUncheckedCreateInput>
  }

  /**
   * Competency createMany
   */
  export type CompetencyCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Competencies.
     */
    data: CompetencyCreateManyInput | CompetencyCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Competency createManyAndReturn
   */
  export type CompetencyCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Competency
     */
    select?: CompetencySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Competency
     */
    omit?: CompetencyOmit<ExtArgs> | null
    /**
     * The data used to create many Competencies.
     */
    data: CompetencyCreateManyInput | CompetencyCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Competency update
   */
  export type CompetencyUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Competency
     */
    select?: CompetencySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Competency
     */
    omit?: CompetencyOmit<ExtArgs> | null
    /**
     * The data needed to update a Competency.
     */
    data: XOR<CompetencyUpdateInput, CompetencyUncheckedUpdateInput>
    /**
     * Choose, which Competency to update.
     */
    where: CompetencyWhereUniqueInput
  }

  /**
   * Competency updateMany
   */
  export type CompetencyUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Competencies.
     */
    data: XOR<CompetencyUpdateManyMutationInput, CompetencyUncheckedUpdateManyInput>
    /**
     * Filter which Competencies to update
     */
    where?: CompetencyWhereInput
    /**
     * Limit how many Competencies to update.
     */
    limit?: number
  }

  /**
   * Competency updateManyAndReturn
   */
  export type CompetencyUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Competency
     */
    select?: CompetencySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Competency
     */
    omit?: CompetencyOmit<ExtArgs> | null
    /**
     * The data used to update Competencies.
     */
    data: XOR<CompetencyUpdateManyMutationInput, CompetencyUncheckedUpdateManyInput>
    /**
     * Filter which Competencies to update
     */
    where?: CompetencyWhereInput
    /**
     * Limit how many Competencies to update.
     */
    limit?: number
  }

  /**
   * Competency upsert
   */
  export type CompetencyUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Competency
     */
    select?: CompetencySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Competency
     */
    omit?: CompetencyOmit<ExtArgs> | null
    /**
     * The filter to search for the Competency to update in case it exists.
     */
    where: CompetencyWhereUniqueInput
    /**
     * In case the Competency found by the `where` argument doesn't exist, create a new Competency with this data.
     */
    create: XOR<CompetencyCreateInput, CompetencyUncheckedCreateInput>
    /**
     * In case the Competency was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CompetencyUpdateInput, CompetencyUncheckedUpdateInput>
  }

  /**
   * Competency delete
   */
  export type CompetencyDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Competency
     */
    select?: CompetencySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Competency
     */
    omit?: CompetencyOmit<ExtArgs> | null
    /**
     * Filter which Competency to delete.
     */
    where: CompetencyWhereUniqueInput
  }

  /**
   * Competency deleteMany
   */
  export type CompetencyDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Competencies to delete
     */
    where?: CompetencyWhereInput
    /**
     * Limit how many Competencies to delete.
     */
    limit?: number
  }

  /**
   * Competency without action
   */
  export type CompetencyDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Competency
     */
    select?: CompetencySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Competency
     */
    omit?: CompetencyOmit<ExtArgs> | null
  }


  /**
   * Model TalentProfile
   */

  export type AggregateTalentProfile = {
    _count: TalentProfileCountAggregateOutputType | null
    _avg: TalentProfileAvgAggregateOutputType | null
    _sum: TalentProfileSumAggregateOutputType | null
    _min: TalentProfileMinAggregateOutputType | null
    _max: TalentProfileMaxAggregateOutputType | null
  }

  export type TalentProfileAvgAggregateOutputType = {
    performance_rating: number | null
    potential_rating: number | null
  }

  export type TalentProfileSumAggregateOutputType = {
    performance_rating: number | null
    potential_rating: number | null
  }

  export type TalentProfileMinAggregateOutputType = {
    id: string | null
    employee_id: string | null
    performance_rating: number | null
    potential_rating: number | null
    nine_box_position: string | null
    risk_of_leaving: string | null
    impact_of_leaving: string | null
    career_aspiration: string | null
    mobility: string | null
    last_calibration: Date | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type TalentProfileMaxAggregateOutputType = {
    id: string | null
    employee_id: string | null
    performance_rating: number | null
    potential_rating: number | null
    nine_box_position: string | null
    risk_of_leaving: string | null
    impact_of_leaving: string | null
    career_aspiration: string | null
    mobility: string | null
    last_calibration: Date | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type TalentProfileCountAggregateOutputType = {
    id: number
    employee_id: number
    performance_rating: number
    potential_rating: number
    nine_box_position: number
    risk_of_leaving: number
    impact_of_leaving: number
    career_aspiration: number
    mobility: number
    key_strengths: number
    development_areas: number
    last_calibration: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type TalentProfileAvgAggregateInputType = {
    performance_rating?: true
    potential_rating?: true
  }

  export type TalentProfileSumAggregateInputType = {
    performance_rating?: true
    potential_rating?: true
  }

  export type TalentProfileMinAggregateInputType = {
    id?: true
    employee_id?: true
    performance_rating?: true
    potential_rating?: true
    nine_box_position?: true
    risk_of_leaving?: true
    impact_of_leaving?: true
    career_aspiration?: true
    mobility?: true
    last_calibration?: true
    created_at?: true
    updated_at?: true
  }

  export type TalentProfileMaxAggregateInputType = {
    id?: true
    employee_id?: true
    performance_rating?: true
    potential_rating?: true
    nine_box_position?: true
    risk_of_leaving?: true
    impact_of_leaving?: true
    career_aspiration?: true
    mobility?: true
    last_calibration?: true
    created_at?: true
    updated_at?: true
  }

  export type TalentProfileCountAggregateInputType = {
    id?: true
    employee_id?: true
    performance_rating?: true
    potential_rating?: true
    nine_box_position?: true
    risk_of_leaving?: true
    impact_of_leaving?: true
    career_aspiration?: true
    mobility?: true
    key_strengths?: true
    development_areas?: true
    last_calibration?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type TalentProfileAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TalentProfile to aggregate.
     */
    where?: TalentProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TalentProfiles to fetch.
     */
    orderBy?: TalentProfileOrderByWithRelationInput | TalentProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TalentProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TalentProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TalentProfiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TalentProfiles
    **/
    _count?: true | TalentProfileCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TalentProfileAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TalentProfileSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TalentProfileMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TalentProfileMaxAggregateInputType
  }

  export type GetTalentProfileAggregateType<T extends TalentProfileAggregateArgs> = {
        [P in keyof T & keyof AggregateTalentProfile]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTalentProfile[P]>
      : GetScalarType<T[P], AggregateTalentProfile[P]>
  }




  export type TalentProfileGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TalentProfileWhereInput
    orderBy?: TalentProfileOrderByWithAggregationInput | TalentProfileOrderByWithAggregationInput[]
    by: TalentProfileScalarFieldEnum[] | TalentProfileScalarFieldEnum
    having?: TalentProfileScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TalentProfileCountAggregateInputType | true
    _avg?: TalentProfileAvgAggregateInputType
    _sum?: TalentProfileSumAggregateInputType
    _min?: TalentProfileMinAggregateInputType
    _max?: TalentProfileMaxAggregateInputType
  }

  export type TalentProfileGroupByOutputType = {
    id: string
    employee_id: string
    performance_rating: number | null
    potential_rating: number | null
    nine_box_position: string | null
    risk_of_leaving: string | null
    impact_of_leaving: string | null
    career_aspiration: string | null
    mobility: string | null
    key_strengths: JsonValue | null
    development_areas: JsonValue | null
    last_calibration: Date | null
    created_at: Date
    updated_at: Date
    _count: TalentProfileCountAggregateOutputType | null
    _avg: TalentProfileAvgAggregateOutputType | null
    _sum: TalentProfileSumAggregateOutputType | null
    _min: TalentProfileMinAggregateOutputType | null
    _max: TalentProfileMaxAggregateOutputType | null
  }

  type GetTalentProfileGroupByPayload<T extends TalentProfileGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TalentProfileGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TalentProfileGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TalentProfileGroupByOutputType[P]>
            : GetScalarType<T[P], TalentProfileGroupByOutputType[P]>
        }
      >
    >


  export type TalentProfileSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    employee_id?: boolean
    performance_rating?: boolean
    potential_rating?: boolean
    nine_box_position?: boolean
    risk_of_leaving?: boolean
    impact_of_leaving?: boolean
    career_aspiration?: boolean
    mobility?: boolean
    key_strengths?: boolean
    development_areas?: boolean
    last_calibration?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["talentProfile"]>

  export type TalentProfileSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    employee_id?: boolean
    performance_rating?: boolean
    potential_rating?: boolean
    nine_box_position?: boolean
    risk_of_leaving?: boolean
    impact_of_leaving?: boolean
    career_aspiration?: boolean
    mobility?: boolean
    key_strengths?: boolean
    development_areas?: boolean
    last_calibration?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["talentProfile"]>

  export type TalentProfileSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    employee_id?: boolean
    performance_rating?: boolean
    potential_rating?: boolean
    nine_box_position?: boolean
    risk_of_leaving?: boolean
    impact_of_leaving?: boolean
    career_aspiration?: boolean
    mobility?: boolean
    key_strengths?: boolean
    development_areas?: boolean
    last_calibration?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["talentProfile"]>

  export type TalentProfileSelectScalar = {
    id?: boolean
    employee_id?: boolean
    performance_rating?: boolean
    potential_rating?: boolean
    nine_box_position?: boolean
    risk_of_leaving?: boolean
    impact_of_leaving?: boolean
    career_aspiration?: boolean
    mobility?: boolean
    key_strengths?: boolean
    development_areas?: boolean
    last_calibration?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type TalentProfileOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "employee_id" | "performance_rating" | "potential_rating" | "nine_box_position" | "risk_of_leaving" | "impact_of_leaving" | "career_aspiration" | "mobility" | "key_strengths" | "development_areas" | "last_calibration" | "created_at" | "updated_at", ExtArgs["result"]["talentProfile"]>

  export type $TalentProfilePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "TalentProfile"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      employee_id: string
      performance_rating: number | null
      potential_rating: number | null
      nine_box_position: string | null
      risk_of_leaving: string | null
      impact_of_leaving: string | null
      career_aspiration: string | null
      mobility: string | null
      key_strengths: Prisma.JsonValue | null
      development_areas: Prisma.JsonValue | null
      last_calibration: Date | null
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["talentProfile"]>
    composites: {}
  }

  type TalentProfileGetPayload<S extends boolean | null | undefined | TalentProfileDefaultArgs> = $Result.GetResult<Prisma.$TalentProfilePayload, S>

  type TalentProfileCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TalentProfileFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TalentProfileCountAggregateInputType | true
    }

  export interface TalentProfileDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['TalentProfile'], meta: { name: 'TalentProfile' } }
    /**
     * Find zero or one TalentProfile that matches the filter.
     * @param {TalentProfileFindUniqueArgs} args - Arguments to find a TalentProfile
     * @example
     * // Get one TalentProfile
     * const talentProfile = await prisma.talentProfile.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TalentProfileFindUniqueArgs>(args: SelectSubset<T, TalentProfileFindUniqueArgs<ExtArgs>>): Prisma__TalentProfileClient<$Result.GetResult<Prisma.$TalentProfilePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one TalentProfile that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TalentProfileFindUniqueOrThrowArgs} args - Arguments to find a TalentProfile
     * @example
     * // Get one TalentProfile
     * const talentProfile = await prisma.talentProfile.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TalentProfileFindUniqueOrThrowArgs>(args: SelectSubset<T, TalentProfileFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TalentProfileClient<$Result.GetResult<Prisma.$TalentProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TalentProfile that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TalentProfileFindFirstArgs} args - Arguments to find a TalentProfile
     * @example
     * // Get one TalentProfile
     * const talentProfile = await prisma.talentProfile.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TalentProfileFindFirstArgs>(args?: SelectSubset<T, TalentProfileFindFirstArgs<ExtArgs>>): Prisma__TalentProfileClient<$Result.GetResult<Prisma.$TalentProfilePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TalentProfile that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TalentProfileFindFirstOrThrowArgs} args - Arguments to find a TalentProfile
     * @example
     * // Get one TalentProfile
     * const talentProfile = await prisma.talentProfile.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TalentProfileFindFirstOrThrowArgs>(args?: SelectSubset<T, TalentProfileFindFirstOrThrowArgs<ExtArgs>>): Prisma__TalentProfileClient<$Result.GetResult<Prisma.$TalentProfilePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more TalentProfiles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TalentProfileFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TalentProfiles
     * const talentProfiles = await prisma.talentProfile.findMany()
     * 
     * // Get first 10 TalentProfiles
     * const talentProfiles = await prisma.talentProfile.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const talentProfileWithIdOnly = await prisma.talentProfile.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TalentProfileFindManyArgs>(args?: SelectSubset<T, TalentProfileFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TalentProfilePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a TalentProfile.
     * @param {TalentProfileCreateArgs} args - Arguments to create a TalentProfile.
     * @example
     * // Create one TalentProfile
     * const TalentProfile = await prisma.talentProfile.create({
     *   data: {
     *     // ... data to create a TalentProfile
     *   }
     * })
     * 
     */
    create<T extends TalentProfileCreateArgs>(args: SelectSubset<T, TalentProfileCreateArgs<ExtArgs>>): Prisma__TalentProfileClient<$Result.GetResult<Prisma.$TalentProfilePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many TalentProfiles.
     * @param {TalentProfileCreateManyArgs} args - Arguments to create many TalentProfiles.
     * @example
     * // Create many TalentProfiles
     * const talentProfile = await prisma.talentProfile.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TalentProfileCreateManyArgs>(args?: SelectSubset<T, TalentProfileCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many TalentProfiles and returns the data saved in the database.
     * @param {TalentProfileCreateManyAndReturnArgs} args - Arguments to create many TalentProfiles.
     * @example
     * // Create many TalentProfiles
     * const talentProfile = await prisma.talentProfile.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many TalentProfiles and only return the `id`
     * const talentProfileWithIdOnly = await prisma.talentProfile.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TalentProfileCreateManyAndReturnArgs>(args?: SelectSubset<T, TalentProfileCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TalentProfilePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a TalentProfile.
     * @param {TalentProfileDeleteArgs} args - Arguments to delete one TalentProfile.
     * @example
     * // Delete one TalentProfile
     * const TalentProfile = await prisma.talentProfile.delete({
     *   where: {
     *     // ... filter to delete one TalentProfile
     *   }
     * })
     * 
     */
    delete<T extends TalentProfileDeleteArgs>(args: SelectSubset<T, TalentProfileDeleteArgs<ExtArgs>>): Prisma__TalentProfileClient<$Result.GetResult<Prisma.$TalentProfilePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one TalentProfile.
     * @param {TalentProfileUpdateArgs} args - Arguments to update one TalentProfile.
     * @example
     * // Update one TalentProfile
     * const talentProfile = await prisma.talentProfile.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TalentProfileUpdateArgs>(args: SelectSubset<T, TalentProfileUpdateArgs<ExtArgs>>): Prisma__TalentProfileClient<$Result.GetResult<Prisma.$TalentProfilePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more TalentProfiles.
     * @param {TalentProfileDeleteManyArgs} args - Arguments to filter TalentProfiles to delete.
     * @example
     * // Delete a few TalentProfiles
     * const { count } = await prisma.talentProfile.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TalentProfileDeleteManyArgs>(args?: SelectSubset<T, TalentProfileDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TalentProfiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TalentProfileUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TalentProfiles
     * const talentProfile = await prisma.talentProfile.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TalentProfileUpdateManyArgs>(args: SelectSubset<T, TalentProfileUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TalentProfiles and returns the data updated in the database.
     * @param {TalentProfileUpdateManyAndReturnArgs} args - Arguments to update many TalentProfiles.
     * @example
     * // Update many TalentProfiles
     * const talentProfile = await prisma.talentProfile.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more TalentProfiles and only return the `id`
     * const talentProfileWithIdOnly = await prisma.talentProfile.updateManyAndReturn({
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
    updateManyAndReturn<T extends TalentProfileUpdateManyAndReturnArgs>(args: SelectSubset<T, TalentProfileUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TalentProfilePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one TalentProfile.
     * @param {TalentProfileUpsertArgs} args - Arguments to update or create a TalentProfile.
     * @example
     * // Update or create a TalentProfile
     * const talentProfile = await prisma.talentProfile.upsert({
     *   create: {
     *     // ... data to create a TalentProfile
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TalentProfile we want to update
     *   }
     * })
     */
    upsert<T extends TalentProfileUpsertArgs>(args: SelectSubset<T, TalentProfileUpsertArgs<ExtArgs>>): Prisma__TalentProfileClient<$Result.GetResult<Prisma.$TalentProfilePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of TalentProfiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TalentProfileCountArgs} args - Arguments to filter TalentProfiles to count.
     * @example
     * // Count the number of TalentProfiles
     * const count = await prisma.talentProfile.count({
     *   where: {
     *     // ... the filter for the TalentProfiles we want to count
     *   }
     * })
    **/
    count<T extends TalentProfileCountArgs>(
      args?: Subset<T, TalentProfileCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TalentProfileCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TalentProfile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TalentProfileAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends TalentProfileAggregateArgs>(args: Subset<T, TalentProfileAggregateArgs>): Prisma.PrismaPromise<GetTalentProfileAggregateType<T>>

    /**
     * Group by TalentProfile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TalentProfileGroupByArgs} args - Group by arguments.
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
      T extends TalentProfileGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TalentProfileGroupByArgs['orderBy'] }
        : { orderBy?: TalentProfileGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, TalentProfileGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTalentProfileGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the TalentProfile model
   */
  readonly fields: TalentProfileFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for TalentProfile.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TalentProfileClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the TalentProfile model
   */
  interface TalentProfileFieldRefs {
    readonly id: FieldRef<"TalentProfile", 'String'>
    readonly employee_id: FieldRef<"TalentProfile", 'String'>
    readonly performance_rating: FieldRef<"TalentProfile", 'Float'>
    readonly potential_rating: FieldRef<"TalentProfile", 'Float'>
    readonly nine_box_position: FieldRef<"TalentProfile", 'String'>
    readonly risk_of_leaving: FieldRef<"TalentProfile", 'String'>
    readonly impact_of_leaving: FieldRef<"TalentProfile", 'String'>
    readonly career_aspiration: FieldRef<"TalentProfile", 'String'>
    readonly mobility: FieldRef<"TalentProfile", 'String'>
    readonly key_strengths: FieldRef<"TalentProfile", 'Json'>
    readonly development_areas: FieldRef<"TalentProfile", 'Json'>
    readonly last_calibration: FieldRef<"TalentProfile", 'DateTime'>
    readonly created_at: FieldRef<"TalentProfile", 'DateTime'>
    readonly updated_at: FieldRef<"TalentProfile", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * TalentProfile findUnique
   */
  export type TalentProfileFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TalentProfile
     */
    select?: TalentProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TalentProfile
     */
    omit?: TalentProfileOmit<ExtArgs> | null
    /**
     * Filter, which TalentProfile to fetch.
     */
    where: TalentProfileWhereUniqueInput
  }

  /**
   * TalentProfile findUniqueOrThrow
   */
  export type TalentProfileFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TalentProfile
     */
    select?: TalentProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TalentProfile
     */
    omit?: TalentProfileOmit<ExtArgs> | null
    /**
     * Filter, which TalentProfile to fetch.
     */
    where: TalentProfileWhereUniqueInput
  }

  /**
   * TalentProfile findFirst
   */
  export type TalentProfileFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TalentProfile
     */
    select?: TalentProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TalentProfile
     */
    omit?: TalentProfileOmit<ExtArgs> | null
    /**
     * Filter, which TalentProfile to fetch.
     */
    where?: TalentProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TalentProfiles to fetch.
     */
    orderBy?: TalentProfileOrderByWithRelationInput | TalentProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TalentProfiles.
     */
    cursor?: TalentProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TalentProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TalentProfiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TalentProfiles.
     */
    distinct?: TalentProfileScalarFieldEnum | TalentProfileScalarFieldEnum[]
  }

  /**
   * TalentProfile findFirstOrThrow
   */
  export type TalentProfileFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TalentProfile
     */
    select?: TalentProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TalentProfile
     */
    omit?: TalentProfileOmit<ExtArgs> | null
    /**
     * Filter, which TalentProfile to fetch.
     */
    where?: TalentProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TalentProfiles to fetch.
     */
    orderBy?: TalentProfileOrderByWithRelationInput | TalentProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TalentProfiles.
     */
    cursor?: TalentProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TalentProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TalentProfiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TalentProfiles.
     */
    distinct?: TalentProfileScalarFieldEnum | TalentProfileScalarFieldEnum[]
  }

  /**
   * TalentProfile findMany
   */
  export type TalentProfileFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TalentProfile
     */
    select?: TalentProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TalentProfile
     */
    omit?: TalentProfileOmit<ExtArgs> | null
    /**
     * Filter, which TalentProfiles to fetch.
     */
    where?: TalentProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TalentProfiles to fetch.
     */
    orderBy?: TalentProfileOrderByWithRelationInput | TalentProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TalentProfiles.
     */
    cursor?: TalentProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TalentProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TalentProfiles.
     */
    skip?: number
    distinct?: TalentProfileScalarFieldEnum | TalentProfileScalarFieldEnum[]
  }

  /**
   * TalentProfile create
   */
  export type TalentProfileCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TalentProfile
     */
    select?: TalentProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TalentProfile
     */
    omit?: TalentProfileOmit<ExtArgs> | null
    /**
     * The data needed to create a TalentProfile.
     */
    data: XOR<TalentProfileCreateInput, TalentProfileUncheckedCreateInput>
  }

  /**
   * TalentProfile createMany
   */
  export type TalentProfileCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many TalentProfiles.
     */
    data: TalentProfileCreateManyInput | TalentProfileCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * TalentProfile createManyAndReturn
   */
  export type TalentProfileCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TalentProfile
     */
    select?: TalentProfileSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TalentProfile
     */
    omit?: TalentProfileOmit<ExtArgs> | null
    /**
     * The data used to create many TalentProfiles.
     */
    data: TalentProfileCreateManyInput | TalentProfileCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * TalentProfile update
   */
  export type TalentProfileUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TalentProfile
     */
    select?: TalentProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TalentProfile
     */
    omit?: TalentProfileOmit<ExtArgs> | null
    /**
     * The data needed to update a TalentProfile.
     */
    data: XOR<TalentProfileUpdateInput, TalentProfileUncheckedUpdateInput>
    /**
     * Choose, which TalentProfile to update.
     */
    where: TalentProfileWhereUniqueInput
  }

  /**
   * TalentProfile updateMany
   */
  export type TalentProfileUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update TalentProfiles.
     */
    data: XOR<TalentProfileUpdateManyMutationInput, TalentProfileUncheckedUpdateManyInput>
    /**
     * Filter which TalentProfiles to update
     */
    where?: TalentProfileWhereInput
    /**
     * Limit how many TalentProfiles to update.
     */
    limit?: number
  }

  /**
   * TalentProfile updateManyAndReturn
   */
  export type TalentProfileUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TalentProfile
     */
    select?: TalentProfileSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TalentProfile
     */
    omit?: TalentProfileOmit<ExtArgs> | null
    /**
     * The data used to update TalentProfiles.
     */
    data: XOR<TalentProfileUpdateManyMutationInput, TalentProfileUncheckedUpdateManyInput>
    /**
     * Filter which TalentProfiles to update
     */
    where?: TalentProfileWhereInput
    /**
     * Limit how many TalentProfiles to update.
     */
    limit?: number
  }

  /**
   * TalentProfile upsert
   */
  export type TalentProfileUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TalentProfile
     */
    select?: TalentProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TalentProfile
     */
    omit?: TalentProfileOmit<ExtArgs> | null
    /**
     * The filter to search for the TalentProfile to update in case it exists.
     */
    where: TalentProfileWhereUniqueInput
    /**
     * In case the TalentProfile found by the `where` argument doesn't exist, create a new TalentProfile with this data.
     */
    create: XOR<TalentProfileCreateInput, TalentProfileUncheckedCreateInput>
    /**
     * In case the TalentProfile was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TalentProfileUpdateInput, TalentProfileUncheckedUpdateInput>
  }

  /**
   * TalentProfile delete
   */
  export type TalentProfileDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TalentProfile
     */
    select?: TalentProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TalentProfile
     */
    omit?: TalentProfileOmit<ExtArgs> | null
    /**
     * Filter which TalentProfile to delete.
     */
    where: TalentProfileWhereUniqueInput
  }

  /**
   * TalentProfile deleteMany
   */
  export type TalentProfileDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TalentProfiles to delete
     */
    where?: TalentProfileWhereInput
    /**
     * Limit how many TalentProfiles to delete.
     */
    limit?: number
  }

  /**
   * TalentProfile without action
   */
  export type TalentProfileDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TalentProfile
     */
    select?: TalentProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TalentProfile
     */
    omit?: TalentProfileOmit<ExtArgs> | null
  }


  /**
   * Model SuccessionPlan
   */

  export type AggregateSuccessionPlan = {
    _count: SuccessionPlanCountAggregateOutputType | null
    _min: SuccessionPlanMinAggregateOutputType | null
    _max: SuccessionPlanMaxAggregateOutputType | null
  }

  export type SuccessionPlanMinAggregateOutputType = {
    id: string | null
    position_id: string | null
    position_title: string | null
    department: string | null
    incumbent_id: string | null
    criticality: string | null
    status: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type SuccessionPlanMaxAggregateOutputType = {
    id: string | null
    position_id: string | null
    position_title: string | null
    department: string | null
    incumbent_id: string | null
    criticality: string | null
    status: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type SuccessionPlanCountAggregateOutputType = {
    id: number
    position_id: number
    position_title: number
    department: number
    incumbent_id: number
    criticality: number
    status: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type SuccessionPlanMinAggregateInputType = {
    id?: true
    position_id?: true
    position_title?: true
    department?: true
    incumbent_id?: true
    criticality?: true
    status?: true
    created_at?: true
    updated_at?: true
  }

  export type SuccessionPlanMaxAggregateInputType = {
    id?: true
    position_id?: true
    position_title?: true
    department?: true
    incumbent_id?: true
    criticality?: true
    status?: true
    created_at?: true
    updated_at?: true
  }

  export type SuccessionPlanCountAggregateInputType = {
    id?: true
    position_id?: true
    position_title?: true
    department?: true
    incumbent_id?: true
    criticality?: true
    status?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type SuccessionPlanAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SuccessionPlan to aggregate.
     */
    where?: SuccessionPlanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SuccessionPlans to fetch.
     */
    orderBy?: SuccessionPlanOrderByWithRelationInput | SuccessionPlanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SuccessionPlanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SuccessionPlans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SuccessionPlans.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SuccessionPlans
    **/
    _count?: true | SuccessionPlanCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SuccessionPlanMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SuccessionPlanMaxAggregateInputType
  }

  export type GetSuccessionPlanAggregateType<T extends SuccessionPlanAggregateArgs> = {
        [P in keyof T & keyof AggregateSuccessionPlan]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSuccessionPlan[P]>
      : GetScalarType<T[P], AggregateSuccessionPlan[P]>
  }




  export type SuccessionPlanGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SuccessionPlanWhereInput
    orderBy?: SuccessionPlanOrderByWithAggregationInput | SuccessionPlanOrderByWithAggregationInput[]
    by: SuccessionPlanScalarFieldEnum[] | SuccessionPlanScalarFieldEnum
    having?: SuccessionPlanScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SuccessionPlanCountAggregateInputType | true
    _min?: SuccessionPlanMinAggregateInputType
    _max?: SuccessionPlanMaxAggregateInputType
  }

  export type SuccessionPlanGroupByOutputType = {
    id: string
    position_id: string
    position_title: string
    department: string | null
    incumbent_id: string | null
    criticality: string
    status: string
    created_at: Date
    updated_at: Date
    _count: SuccessionPlanCountAggregateOutputType | null
    _min: SuccessionPlanMinAggregateOutputType | null
    _max: SuccessionPlanMaxAggregateOutputType | null
  }

  type GetSuccessionPlanGroupByPayload<T extends SuccessionPlanGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SuccessionPlanGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SuccessionPlanGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SuccessionPlanGroupByOutputType[P]>
            : GetScalarType<T[P], SuccessionPlanGroupByOutputType[P]>
        }
      >
    >


  export type SuccessionPlanSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    position_id?: boolean
    position_title?: boolean
    department?: boolean
    incumbent_id?: boolean
    criticality?: boolean
    status?: boolean
    created_at?: boolean
    updated_at?: boolean
    successors?: boolean | SuccessionPlan$successorsArgs<ExtArgs>
    _count?: boolean | SuccessionPlanCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["successionPlan"]>

  export type SuccessionPlanSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    position_id?: boolean
    position_title?: boolean
    department?: boolean
    incumbent_id?: boolean
    criticality?: boolean
    status?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["successionPlan"]>

  export type SuccessionPlanSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    position_id?: boolean
    position_title?: boolean
    department?: boolean
    incumbent_id?: boolean
    criticality?: boolean
    status?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["successionPlan"]>

  export type SuccessionPlanSelectScalar = {
    id?: boolean
    position_id?: boolean
    position_title?: boolean
    department?: boolean
    incumbent_id?: boolean
    criticality?: boolean
    status?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type SuccessionPlanOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "position_id" | "position_title" | "department" | "incumbent_id" | "criticality" | "status" | "created_at" | "updated_at", ExtArgs["result"]["successionPlan"]>
  export type SuccessionPlanInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    successors?: boolean | SuccessionPlan$successorsArgs<ExtArgs>
    _count?: boolean | SuccessionPlanCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type SuccessionPlanIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type SuccessionPlanIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $SuccessionPlanPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SuccessionPlan"
    objects: {
      successors: Prisma.$SuccessorPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      position_id: string
      position_title: string
      department: string | null
      incumbent_id: string | null
      criticality: string
      status: string
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["successionPlan"]>
    composites: {}
  }

  type SuccessionPlanGetPayload<S extends boolean | null | undefined | SuccessionPlanDefaultArgs> = $Result.GetResult<Prisma.$SuccessionPlanPayload, S>

  type SuccessionPlanCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SuccessionPlanFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SuccessionPlanCountAggregateInputType | true
    }

  export interface SuccessionPlanDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SuccessionPlan'], meta: { name: 'SuccessionPlan' } }
    /**
     * Find zero or one SuccessionPlan that matches the filter.
     * @param {SuccessionPlanFindUniqueArgs} args - Arguments to find a SuccessionPlan
     * @example
     * // Get one SuccessionPlan
     * const successionPlan = await prisma.successionPlan.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SuccessionPlanFindUniqueArgs>(args: SelectSubset<T, SuccessionPlanFindUniqueArgs<ExtArgs>>): Prisma__SuccessionPlanClient<$Result.GetResult<Prisma.$SuccessionPlanPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one SuccessionPlan that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SuccessionPlanFindUniqueOrThrowArgs} args - Arguments to find a SuccessionPlan
     * @example
     * // Get one SuccessionPlan
     * const successionPlan = await prisma.successionPlan.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SuccessionPlanFindUniqueOrThrowArgs>(args: SelectSubset<T, SuccessionPlanFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SuccessionPlanClient<$Result.GetResult<Prisma.$SuccessionPlanPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SuccessionPlan that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SuccessionPlanFindFirstArgs} args - Arguments to find a SuccessionPlan
     * @example
     * // Get one SuccessionPlan
     * const successionPlan = await prisma.successionPlan.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SuccessionPlanFindFirstArgs>(args?: SelectSubset<T, SuccessionPlanFindFirstArgs<ExtArgs>>): Prisma__SuccessionPlanClient<$Result.GetResult<Prisma.$SuccessionPlanPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SuccessionPlan that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SuccessionPlanFindFirstOrThrowArgs} args - Arguments to find a SuccessionPlan
     * @example
     * // Get one SuccessionPlan
     * const successionPlan = await prisma.successionPlan.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SuccessionPlanFindFirstOrThrowArgs>(args?: SelectSubset<T, SuccessionPlanFindFirstOrThrowArgs<ExtArgs>>): Prisma__SuccessionPlanClient<$Result.GetResult<Prisma.$SuccessionPlanPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more SuccessionPlans that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SuccessionPlanFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SuccessionPlans
     * const successionPlans = await prisma.successionPlan.findMany()
     * 
     * // Get first 10 SuccessionPlans
     * const successionPlans = await prisma.successionPlan.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const successionPlanWithIdOnly = await prisma.successionPlan.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SuccessionPlanFindManyArgs>(args?: SelectSubset<T, SuccessionPlanFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SuccessionPlanPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a SuccessionPlan.
     * @param {SuccessionPlanCreateArgs} args - Arguments to create a SuccessionPlan.
     * @example
     * // Create one SuccessionPlan
     * const SuccessionPlan = await prisma.successionPlan.create({
     *   data: {
     *     // ... data to create a SuccessionPlan
     *   }
     * })
     * 
     */
    create<T extends SuccessionPlanCreateArgs>(args: SelectSubset<T, SuccessionPlanCreateArgs<ExtArgs>>): Prisma__SuccessionPlanClient<$Result.GetResult<Prisma.$SuccessionPlanPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many SuccessionPlans.
     * @param {SuccessionPlanCreateManyArgs} args - Arguments to create many SuccessionPlans.
     * @example
     * // Create many SuccessionPlans
     * const successionPlan = await prisma.successionPlan.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SuccessionPlanCreateManyArgs>(args?: SelectSubset<T, SuccessionPlanCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many SuccessionPlans and returns the data saved in the database.
     * @param {SuccessionPlanCreateManyAndReturnArgs} args - Arguments to create many SuccessionPlans.
     * @example
     * // Create many SuccessionPlans
     * const successionPlan = await prisma.successionPlan.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many SuccessionPlans and only return the `id`
     * const successionPlanWithIdOnly = await prisma.successionPlan.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SuccessionPlanCreateManyAndReturnArgs>(args?: SelectSubset<T, SuccessionPlanCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SuccessionPlanPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a SuccessionPlan.
     * @param {SuccessionPlanDeleteArgs} args - Arguments to delete one SuccessionPlan.
     * @example
     * // Delete one SuccessionPlan
     * const SuccessionPlan = await prisma.successionPlan.delete({
     *   where: {
     *     // ... filter to delete one SuccessionPlan
     *   }
     * })
     * 
     */
    delete<T extends SuccessionPlanDeleteArgs>(args: SelectSubset<T, SuccessionPlanDeleteArgs<ExtArgs>>): Prisma__SuccessionPlanClient<$Result.GetResult<Prisma.$SuccessionPlanPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one SuccessionPlan.
     * @param {SuccessionPlanUpdateArgs} args - Arguments to update one SuccessionPlan.
     * @example
     * // Update one SuccessionPlan
     * const successionPlan = await prisma.successionPlan.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SuccessionPlanUpdateArgs>(args: SelectSubset<T, SuccessionPlanUpdateArgs<ExtArgs>>): Prisma__SuccessionPlanClient<$Result.GetResult<Prisma.$SuccessionPlanPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more SuccessionPlans.
     * @param {SuccessionPlanDeleteManyArgs} args - Arguments to filter SuccessionPlans to delete.
     * @example
     * // Delete a few SuccessionPlans
     * const { count } = await prisma.successionPlan.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SuccessionPlanDeleteManyArgs>(args?: SelectSubset<T, SuccessionPlanDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SuccessionPlans.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SuccessionPlanUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SuccessionPlans
     * const successionPlan = await prisma.successionPlan.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SuccessionPlanUpdateManyArgs>(args: SelectSubset<T, SuccessionPlanUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SuccessionPlans and returns the data updated in the database.
     * @param {SuccessionPlanUpdateManyAndReturnArgs} args - Arguments to update many SuccessionPlans.
     * @example
     * // Update many SuccessionPlans
     * const successionPlan = await prisma.successionPlan.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more SuccessionPlans and only return the `id`
     * const successionPlanWithIdOnly = await prisma.successionPlan.updateManyAndReturn({
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
    updateManyAndReturn<T extends SuccessionPlanUpdateManyAndReturnArgs>(args: SelectSubset<T, SuccessionPlanUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SuccessionPlanPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one SuccessionPlan.
     * @param {SuccessionPlanUpsertArgs} args - Arguments to update or create a SuccessionPlan.
     * @example
     * // Update or create a SuccessionPlan
     * const successionPlan = await prisma.successionPlan.upsert({
     *   create: {
     *     // ... data to create a SuccessionPlan
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SuccessionPlan we want to update
     *   }
     * })
     */
    upsert<T extends SuccessionPlanUpsertArgs>(args: SelectSubset<T, SuccessionPlanUpsertArgs<ExtArgs>>): Prisma__SuccessionPlanClient<$Result.GetResult<Prisma.$SuccessionPlanPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of SuccessionPlans.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SuccessionPlanCountArgs} args - Arguments to filter SuccessionPlans to count.
     * @example
     * // Count the number of SuccessionPlans
     * const count = await prisma.successionPlan.count({
     *   where: {
     *     // ... the filter for the SuccessionPlans we want to count
     *   }
     * })
    **/
    count<T extends SuccessionPlanCountArgs>(
      args?: Subset<T, SuccessionPlanCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SuccessionPlanCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SuccessionPlan.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SuccessionPlanAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends SuccessionPlanAggregateArgs>(args: Subset<T, SuccessionPlanAggregateArgs>): Prisma.PrismaPromise<GetSuccessionPlanAggregateType<T>>

    /**
     * Group by SuccessionPlan.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SuccessionPlanGroupByArgs} args - Group by arguments.
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
      T extends SuccessionPlanGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SuccessionPlanGroupByArgs['orderBy'] }
        : { orderBy?: SuccessionPlanGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, SuccessionPlanGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSuccessionPlanGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SuccessionPlan model
   */
  readonly fields: SuccessionPlanFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SuccessionPlan.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SuccessionPlanClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    successors<T extends SuccessionPlan$successorsArgs<ExtArgs> = {}>(args?: Subset<T, SuccessionPlan$successorsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SuccessorPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the SuccessionPlan model
   */
  interface SuccessionPlanFieldRefs {
    readonly id: FieldRef<"SuccessionPlan", 'String'>
    readonly position_id: FieldRef<"SuccessionPlan", 'String'>
    readonly position_title: FieldRef<"SuccessionPlan", 'String'>
    readonly department: FieldRef<"SuccessionPlan", 'String'>
    readonly incumbent_id: FieldRef<"SuccessionPlan", 'String'>
    readonly criticality: FieldRef<"SuccessionPlan", 'String'>
    readonly status: FieldRef<"SuccessionPlan", 'String'>
    readonly created_at: FieldRef<"SuccessionPlan", 'DateTime'>
    readonly updated_at: FieldRef<"SuccessionPlan", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * SuccessionPlan findUnique
   */
  export type SuccessionPlanFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SuccessionPlan
     */
    select?: SuccessionPlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SuccessionPlan
     */
    omit?: SuccessionPlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SuccessionPlanInclude<ExtArgs> | null
    /**
     * Filter, which SuccessionPlan to fetch.
     */
    where: SuccessionPlanWhereUniqueInput
  }

  /**
   * SuccessionPlan findUniqueOrThrow
   */
  export type SuccessionPlanFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SuccessionPlan
     */
    select?: SuccessionPlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SuccessionPlan
     */
    omit?: SuccessionPlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SuccessionPlanInclude<ExtArgs> | null
    /**
     * Filter, which SuccessionPlan to fetch.
     */
    where: SuccessionPlanWhereUniqueInput
  }

  /**
   * SuccessionPlan findFirst
   */
  export type SuccessionPlanFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SuccessionPlan
     */
    select?: SuccessionPlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SuccessionPlan
     */
    omit?: SuccessionPlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SuccessionPlanInclude<ExtArgs> | null
    /**
     * Filter, which SuccessionPlan to fetch.
     */
    where?: SuccessionPlanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SuccessionPlans to fetch.
     */
    orderBy?: SuccessionPlanOrderByWithRelationInput | SuccessionPlanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SuccessionPlans.
     */
    cursor?: SuccessionPlanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SuccessionPlans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SuccessionPlans.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SuccessionPlans.
     */
    distinct?: SuccessionPlanScalarFieldEnum | SuccessionPlanScalarFieldEnum[]
  }

  /**
   * SuccessionPlan findFirstOrThrow
   */
  export type SuccessionPlanFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SuccessionPlan
     */
    select?: SuccessionPlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SuccessionPlan
     */
    omit?: SuccessionPlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SuccessionPlanInclude<ExtArgs> | null
    /**
     * Filter, which SuccessionPlan to fetch.
     */
    where?: SuccessionPlanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SuccessionPlans to fetch.
     */
    orderBy?: SuccessionPlanOrderByWithRelationInput | SuccessionPlanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SuccessionPlans.
     */
    cursor?: SuccessionPlanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SuccessionPlans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SuccessionPlans.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SuccessionPlans.
     */
    distinct?: SuccessionPlanScalarFieldEnum | SuccessionPlanScalarFieldEnum[]
  }

  /**
   * SuccessionPlan findMany
   */
  export type SuccessionPlanFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SuccessionPlan
     */
    select?: SuccessionPlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SuccessionPlan
     */
    omit?: SuccessionPlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SuccessionPlanInclude<ExtArgs> | null
    /**
     * Filter, which SuccessionPlans to fetch.
     */
    where?: SuccessionPlanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SuccessionPlans to fetch.
     */
    orderBy?: SuccessionPlanOrderByWithRelationInput | SuccessionPlanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SuccessionPlans.
     */
    cursor?: SuccessionPlanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SuccessionPlans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SuccessionPlans.
     */
    skip?: number
    distinct?: SuccessionPlanScalarFieldEnum | SuccessionPlanScalarFieldEnum[]
  }

  /**
   * SuccessionPlan create
   */
  export type SuccessionPlanCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SuccessionPlan
     */
    select?: SuccessionPlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SuccessionPlan
     */
    omit?: SuccessionPlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SuccessionPlanInclude<ExtArgs> | null
    /**
     * The data needed to create a SuccessionPlan.
     */
    data: XOR<SuccessionPlanCreateInput, SuccessionPlanUncheckedCreateInput>
  }

  /**
   * SuccessionPlan createMany
   */
  export type SuccessionPlanCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SuccessionPlans.
     */
    data: SuccessionPlanCreateManyInput | SuccessionPlanCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SuccessionPlan createManyAndReturn
   */
  export type SuccessionPlanCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SuccessionPlan
     */
    select?: SuccessionPlanSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SuccessionPlan
     */
    omit?: SuccessionPlanOmit<ExtArgs> | null
    /**
     * The data used to create many SuccessionPlans.
     */
    data: SuccessionPlanCreateManyInput | SuccessionPlanCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SuccessionPlan update
   */
  export type SuccessionPlanUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SuccessionPlan
     */
    select?: SuccessionPlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SuccessionPlan
     */
    omit?: SuccessionPlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SuccessionPlanInclude<ExtArgs> | null
    /**
     * The data needed to update a SuccessionPlan.
     */
    data: XOR<SuccessionPlanUpdateInput, SuccessionPlanUncheckedUpdateInput>
    /**
     * Choose, which SuccessionPlan to update.
     */
    where: SuccessionPlanWhereUniqueInput
  }

  /**
   * SuccessionPlan updateMany
   */
  export type SuccessionPlanUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SuccessionPlans.
     */
    data: XOR<SuccessionPlanUpdateManyMutationInput, SuccessionPlanUncheckedUpdateManyInput>
    /**
     * Filter which SuccessionPlans to update
     */
    where?: SuccessionPlanWhereInput
    /**
     * Limit how many SuccessionPlans to update.
     */
    limit?: number
  }

  /**
   * SuccessionPlan updateManyAndReturn
   */
  export type SuccessionPlanUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SuccessionPlan
     */
    select?: SuccessionPlanSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SuccessionPlan
     */
    omit?: SuccessionPlanOmit<ExtArgs> | null
    /**
     * The data used to update SuccessionPlans.
     */
    data: XOR<SuccessionPlanUpdateManyMutationInput, SuccessionPlanUncheckedUpdateManyInput>
    /**
     * Filter which SuccessionPlans to update
     */
    where?: SuccessionPlanWhereInput
    /**
     * Limit how many SuccessionPlans to update.
     */
    limit?: number
  }

  /**
   * SuccessionPlan upsert
   */
  export type SuccessionPlanUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SuccessionPlan
     */
    select?: SuccessionPlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SuccessionPlan
     */
    omit?: SuccessionPlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SuccessionPlanInclude<ExtArgs> | null
    /**
     * The filter to search for the SuccessionPlan to update in case it exists.
     */
    where: SuccessionPlanWhereUniqueInput
    /**
     * In case the SuccessionPlan found by the `where` argument doesn't exist, create a new SuccessionPlan with this data.
     */
    create: XOR<SuccessionPlanCreateInput, SuccessionPlanUncheckedCreateInput>
    /**
     * In case the SuccessionPlan was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SuccessionPlanUpdateInput, SuccessionPlanUncheckedUpdateInput>
  }

  /**
   * SuccessionPlan delete
   */
  export type SuccessionPlanDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SuccessionPlan
     */
    select?: SuccessionPlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SuccessionPlan
     */
    omit?: SuccessionPlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SuccessionPlanInclude<ExtArgs> | null
    /**
     * Filter which SuccessionPlan to delete.
     */
    where: SuccessionPlanWhereUniqueInput
  }

  /**
   * SuccessionPlan deleteMany
   */
  export type SuccessionPlanDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SuccessionPlans to delete
     */
    where?: SuccessionPlanWhereInput
    /**
     * Limit how many SuccessionPlans to delete.
     */
    limit?: number
  }

  /**
   * SuccessionPlan.successors
   */
  export type SuccessionPlan$successorsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Successor
     */
    select?: SuccessorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Successor
     */
    omit?: SuccessorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SuccessorInclude<ExtArgs> | null
    where?: SuccessorWhereInput
    orderBy?: SuccessorOrderByWithRelationInput | SuccessorOrderByWithRelationInput[]
    cursor?: SuccessorWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SuccessorScalarFieldEnum | SuccessorScalarFieldEnum[]
  }

  /**
   * SuccessionPlan without action
   */
  export type SuccessionPlanDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SuccessionPlan
     */
    select?: SuccessionPlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SuccessionPlan
     */
    omit?: SuccessionPlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SuccessionPlanInclude<ExtArgs> | null
  }


  /**
   * Model Successor
   */

  export type AggregateSuccessor = {
    _count: SuccessorCountAggregateOutputType | null
    _min: SuccessorMinAggregateOutputType | null
    _max: SuccessorMaxAggregateOutputType | null
  }

  export type SuccessorMinAggregateOutputType = {
    id: string | null
    succession_plan_id: string | null
    employee_id: string | null
    readiness: string | null
  }

  export type SuccessorMaxAggregateOutputType = {
    id: string | null
    succession_plan_id: string | null
    employee_id: string | null
    readiness: string | null
  }

  export type SuccessorCountAggregateOutputType = {
    id: number
    succession_plan_id: number
    employee_id: number
    readiness: number
    development_gaps: number
    development_actions: number
    _all: number
  }


  export type SuccessorMinAggregateInputType = {
    id?: true
    succession_plan_id?: true
    employee_id?: true
    readiness?: true
  }

  export type SuccessorMaxAggregateInputType = {
    id?: true
    succession_plan_id?: true
    employee_id?: true
    readiness?: true
  }

  export type SuccessorCountAggregateInputType = {
    id?: true
    succession_plan_id?: true
    employee_id?: true
    readiness?: true
    development_gaps?: true
    development_actions?: true
    _all?: true
  }

  export type SuccessorAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Successor to aggregate.
     */
    where?: SuccessorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Successors to fetch.
     */
    orderBy?: SuccessorOrderByWithRelationInput | SuccessorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SuccessorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Successors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Successors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Successors
    **/
    _count?: true | SuccessorCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SuccessorMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SuccessorMaxAggregateInputType
  }

  export type GetSuccessorAggregateType<T extends SuccessorAggregateArgs> = {
        [P in keyof T & keyof AggregateSuccessor]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSuccessor[P]>
      : GetScalarType<T[P], AggregateSuccessor[P]>
  }




  export type SuccessorGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SuccessorWhereInput
    orderBy?: SuccessorOrderByWithAggregationInput | SuccessorOrderByWithAggregationInput[]
    by: SuccessorScalarFieldEnum[] | SuccessorScalarFieldEnum
    having?: SuccessorScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SuccessorCountAggregateInputType | true
    _min?: SuccessorMinAggregateInputType
    _max?: SuccessorMaxAggregateInputType
  }

  export type SuccessorGroupByOutputType = {
    id: string
    succession_plan_id: string
    employee_id: string
    readiness: string
    development_gaps: JsonValue | null
    development_actions: JsonValue | null
    _count: SuccessorCountAggregateOutputType | null
    _min: SuccessorMinAggregateOutputType | null
    _max: SuccessorMaxAggregateOutputType | null
  }

  type GetSuccessorGroupByPayload<T extends SuccessorGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SuccessorGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SuccessorGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SuccessorGroupByOutputType[P]>
            : GetScalarType<T[P], SuccessorGroupByOutputType[P]>
        }
      >
    >


  export type SuccessorSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    succession_plan_id?: boolean
    employee_id?: boolean
    readiness?: boolean
    development_gaps?: boolean
    development_actions?: boolean
    succession_plan?: boolean | SuccessionPlanDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["successor"]>

  export type SuccessorSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    succession_plan_id?: boolean
    employee_id?: boolean
    readiness?: boolean
    development_gaps?: boolean
    development_actions?: boolean
    succession_plan?: boolean | SuccessionPlanDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["successor"]>

  export type SuccessorSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    succession_plan_id?: boolean
    employee_id?: boolean
    readiness?: boolean
    development_gaps?: boolean
    development_actions?: boolean
    succession_plan?: boolean | SuccessionPlanDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["successor"]>

  export type SuccessorSelectScalar = {
    id?: boolean
    succession_plan_id?: boolean
    employee_id?: boolean
    readiness?: boolean
    development_gaps?: boolean
    development_actions?: boolean
  }

  export type SuccessorOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "succession_plan_id" | "employee_id" | "readiness" | "development_gaps" | "development_actions", ExtArgs["result"]["successor"]>
  export type SuccessorInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    succession_plan?: boolean | SuccessionPlanDefaultArgs<ExtArgs>
  }
  export type SuccessorIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    succession_plan?: boolean | SuccessionPlanDefaultArgs<ExtArgs>
  }
  export type SuccessorIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    succession_plan?: boolean | SuccessionPlanDefaultArgs<ExtArgs>
  }

  export type $SuccessorPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Successor"
    objects: {
      succession_plan: Prisma.$SuccessionPlanPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      succession_plan_id: string
      employee_id: string
      readiness: string
      development_gaps: Prisma.JsonValue | null
      development_actions: Prisma.JsonValue | null
    }, ExtArgs["result"]["successor"]>
    composites: {}
  }

  type SuccessorGetPayload<S extends boolean | null | undefined | SuccessorDefaultArgs> = $Result.GetResult<Prisma.$SuccessorPayload, S>

  type SuccessorCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SuccessorFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SuccessorCountAggregateInputType | true
    }

  export interface SuccessorDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Successor'], meta: { name: 'Successor' } }
    /**
     * Find zero or one Successor that matches the filter.
     * @param {SuccessorFindUniqueArgs} args - Arguments to find a Successor
     * @example
     * // Get one Successor
     * const successor = await prisma.successor.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SuccessorFindUniqueArgs>(args: SelectSubset<T, SuccessorFindUniqueArgs<ExtArgs>>): Prisma__SuccessorClient<$Result.GetResult<Prisma.$SuccessorPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Successor that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SuccessorFindUniqueOrThrowArgs} args - Arguments to find a Successor
     * @example
     * // Get one Successor
     * const successor = await prisma.successor.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SuccessorFindUniqueOrThrowArgs>(args: SelectSubset<T, SuccessorFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SuccessorClient<$Result.GetResult<Prisma.$SuccessorPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Successor that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SuccessorFindFirstArgs} args - Arguments to find a Successor
     * @example
     * // Get one Successor
     * const successor = await prisma.successor.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SuccessorFindFirstArgs>(args?: SelectSubset<T, SuccessorFindFirstArgs<ExtArgs>>): Prisma__SuccessorClient<$Result.GetResult<Prisma.$SuccessorPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Successor that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SuccessorFindFirstOrThrowArgs} args - Arguments to find a Successor
     * @example
     * // Get one Successor
     * const successor = await prisma.successor.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SuccessorFindFirstOrThrowArgs>(args?: SelectSubset<T, SuccessorFindFirstOrThrowArgs<ExtArgs>>): Prisma__SuccessorClient<$Result.GetResult<Prisma.$SuccessorPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Successors that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SuccessorFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Successors
     * const successors = await prisma.successor.findMany()
     * 
     * // Get first 10 Successors
     * const successors = await prisma.successor.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const successorWithIdOnly = await prisma.successor.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SuccessorFindManyArgs>(args?: SelectSubset<T, SuccessorFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SuccessorPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Successor.
     * @param {SuccessorCreateArgs} args - Arguments to create a Successor.
     * @example
     * // Create one Successor
     * const Successor = await prisma.successor.create({
     *   data: {
     *     // ... data to create a Successor
     *   }
     * })
     * 
     */
    create<T extends SuccessorCreateArgs>(args: SelectSubset<T, SuccessorCreateArgs<ExtArgs>>): Prisma__SuccessorClient<$Result.GetResult<Prisma.$SuccessorPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Successors.
     * @param {SuccessorCreateManyArgs} args - Arguments to create many Successors.
     * @example
     * // Create many Successors
     * const successor = await prisma.successor.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SuccessorCreateManyArgs>(args?: SelectSubset<T, SuccessorCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Successors and returns the data saved in the database.
     * @param {SuccessorCreateManyAndReturnArgs} args - Arguments to create many Successors.
     * @example
     * // Create many Successors
     * const successor = await prisma.successor.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Successors and only return the `id`
     * const successorWithIdOnly = await prisma.successor.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SuccessorCreateManyAndReturnArgs>(args?: SelectSubset<T, SuccessorCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SuccessorPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Successor.
     * @param {SuccessorDeleteArgs} args - Arguments to delete one Successor.
     * @example
     * // Delete one Successor
     * const Successor = await prisma.successor.delete({
     *   where: {
     *     // ... filter to delete one Successor
     *   }
     * })
     * 
     */
    delete<T extends SuccessorDeleteArgs>(args: SelectSubset<T, SuccessorDeleteArgs<ExtArgs>>): Prisma__SuccessorClient<$Result.GetResult<Prisma.$SuccessorPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Successor.
     * @param {SuccessorUpdateArgs} args - Arguments to update one Successor.
     * @example
     * // Update one Successor
     * const successor = await prisma.successor.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SuccessorUpdateArgs>(args: SelectSubset<T, SuccessorUpdateArgs<ExtArgs>>): Prisma__SuccessorClient<$Result.GetResult<Prisma.$SuccessorPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Successors.
     * @param {SuccessorDeleteManyArgs} args - Arguments to filter Successors to delete.
     * @example
     * // Delete a few Successors
     * const { count } = await prisma.successor.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SuccessorDeleteManyArgs>(args?: SelectSubset<T, SuccessorDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Successors.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SuccessorUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Successors
     * const successor = await prisma.successor.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SuccessorUpdateManyArgs>(args: SelectSubset<T, SuccessorUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Successors and returns the data updated in the database.
     * @param {SuccessorUpdateManyAndReturnArgs} args - Arguments to update many Successors.
     * @example
     * // Update many Successors
     * const successor = await prisma.successor.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Successors and only return the `id`
     * const successorWithIdOnly = await prisma.successor.updateManyAndReturn({
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
    updateManyAndReturn<T extends SuccessorUpdateManyAndReturnArgs>(args: SelectSubset<T, SuccessorUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SuccessorPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Successor.
     * @param {SuccessorUpsertArgs} args - Arguments to update or create a Successor.
     * @example
     * // Update or create a Successor
     * const successor = await prisma.successor.upsert({
     *   create: {
     *     // ... data to create a Successor
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Successor we want to update
     *   }
     * })
     */
    upsert<T extends SuccessorUpsertArgs>(args: SelectSubset<T, SuccessorUpsertArgs<ExtArgs>>): Prisma__SuccessorClient<$Result.GetResult<Prisma.$SuccessorPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Successors.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SuccessorCountArgs} args - Arguments to filter Successors to count.
     * @example
     * // Count the number of Successors
     * const count = await prisma.successor.count({
     *   where: {
     *     // ... the filter for the Successors we want to count
     *   }
     * })
    **/
    count<T extends SuccessorCountArgs>(
      args?: Subset<T, SuccessorCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SuccessorCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Successor.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SuccessorAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends SuccessorAggregateArgs>(args: Subset<T, SuccessorAggregateArgs>): Prisma.PrismaPromise<GetSuccessorAggregateType<T>>

    /**
     * Group by Successor.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SuccessorGroupByArgs} args - Group by arguments.
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
      T extends SuccessorGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SuccessorGroupByArgs['orderBy'] }
        : { orderBy?: SuccessorGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, SuccessorGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSuccessorGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Successor model
   */
  readonly fields: SuccessorFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Successor.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SuccessorClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    succession_plan<T extends SuccessionPlanDefaultArgs<ExtArgs> = {}>(args?: Subset<T, SuccessionPlanDefaultArgs<ExtArgs>>): Prisma__SuccessionPlanClient<$Result.GetResult<Prisma.$SuccessionPlanPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the Successor model
   */
  interface SuccessorFieldRefs {
    readonly id: FieldRef<"Successor", 'String'>
    readonly succession_plan_id: FieldRef<"Successor", 'String'>
    readonly employee_id: FieldRef<"Successor", 'String'>
    readonly readiness: FieldRef<"Successor", 'String'>
    readonly development_gaps: FieldRef<"Successor", 'Json'>
    readonly development_actions: FieldRef<"Successor", 'Json'>
  }
    

  // Custom InputTypes
  /**
   * Successor findUnique
   */
  export type SuccessorFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Successor
     */
    select?: SuccessorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Successor
     */
    omit?: SuccessorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SuccessorInclude<ExtArgs> | null
    /**
     * Filter, which Successor to fetch.
     */
    where: SuccessorWhereUniqueInput
  }

  /**
   * Successor findUniqueOrThrow
   */
  export type SuccessorFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Successor
     */
    select?: SuccessorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Successor
     */
    omit?: SuccessorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SuccessorInclude<ExtArgs> | null
    /**
     * Filter, which Successor to fetch.
     */
    where: SuccessorWhereUniqueInput
  }

  /**
   * Successor findFirst
   */
  export type SuccessorFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Successor
     */
    select?: SuccessorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Successor
     */
    omit?: SuccessorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SuccessorInclude<ExtArgs> | null
    /**
     * Filter, which Successor to fetch.
     */
    where?: SuccessorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Successors to fetch.
     */
    orderBy?: SuccessorOrderByWithRelationInput | SuccessorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Successors.
     */
    cursor?: SuccessorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Successors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Successors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Successors.
     */
    distinct?: SuccessorScalarFieldEnum | SuccessorScalarFieldEnum[]
  }

  /**
   * Successor findFirstOrThrow
   */
  export type SuccessorFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Successor
     */
    select?: SuccessorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Successor
     */
    omit?: SuccessorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SuccessorInclude<ExtArgs> | null
    /**
     * Filter, which Successor to fetch.
     */
    where?: SuccessorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Successors to fetch.
     */
    orderBy?: SuccessorOrderByWithRelationInput | SuccessorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Successors.
     */
    cursor?: SuccessorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Successors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Successors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Successors.
     */
    distinct?: SuccessorScalarFieldEnum | SuccessorScalarFieldEnum[]
  }

  /**
   * Successor findMany
   */
  export type SuccessorFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Successor
     */
    select?: SuccessorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Successor
     */
    omit?: SuccessorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SuccessorInclude<ExtArgs> | null
    /**
     * Filter, which Successors to fetch.
     */
    where?: SuccessorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Successors to fetch.
     */
    orderBy?: SuccessorOrderByWithRelationInput | SuccessorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Successors.
     */
    cursor?: SuccessorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Successors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Successors.
     */
    skip?: number
    distinct?: SuccessorScalarFieldEnum | SuccessorScalarFieldEnum[]
  }

  /**
   * Successor create
   */
  export type SuccessorCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Successor
     */
    select?: SuccessorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Successor
     */
    omit?: SuccessorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SuccessorInclude<ExtArgs> | null
    /**
     * The data needed to create a Successor.
     */
    data: XOR<SuccessorCreateInput, SuccessorUncheckedCreateInput>
  }

  /**
   * Successor createMany
   */
  export type SuccessorCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Successors.
     */
    data: SuccessorCreateManyInput | SuccessorCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Successor createManyAndReturn
   */
  export type SuccessorCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Successor
     */
    select?: SuccessorSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Successor
     */
    omit?: SuccessorOmit<ExtArgs> | null
    /**
     * The data used to create many Successors.
     */
    data: SuccessorCreateManyInput | SuccessorCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SuccessorIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Successor update
   */
  export type SuccessorUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Successor
     */
    select?: SuccessorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Successor
     */
    omit?: SuccessorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SuccessorInclude<ExtArgs> | null
    /**
     * The data needed to update a Successor.
     */
    data: XOR<SuccessorUpdateInput, SuccessorUncheckedUpdateInput>
    /**
     * Choose, which Successor to update.
     */
    where: SuccessorWhereUniqueInput
  }

  /**
   * Successor updateMany
   */
  export type SuccessorUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Successors.
     */
    data: XOR<SuccessorUpdateManyMutationInput, SuccessorUncheckedUpdateManyInput>
    /**
     * Filter which Successors to update
     */
    where?: SuccessorWhereInput
    /**
     * Limit how many Successors to update.
     */
    limit?: number
  }

  /**
   * Successor updateManyAndReturn
   */
  export type SuccessorUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Successor
     */
    select?: SuccessorSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Successor
     */
    omit?: SuccessorOmit<ExtArgs> | null
    /**
     * The data used to update Successors.
     */
    data: XOR<SuccessorUpdateManyMutationInput, SuccessorUncheckedUpdateManyInput>
    /**
     * Filter which Successors to update
     */
    where?: SuccessorWhereInput
    /**
     * Limit how many Successors to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SuccessorIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Successor upsert
   */
  export type SuccessorUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Successor
     */
    select?: SuccessorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Successor
     */
    omit?: SuccessorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SuccessorInclude<ExtArgs> | null
    /**
     * The filter to search for the Successor to update in case it exists.
     */
    where: SuccessorWhereUniqueInput
    /**
     * In case the Successor found by the `where` argument doesn't exist, create a new Successor with this data.
     */
    create: XOR<SuccessorCreateInput, SuccessorUncheckedCreateInput>
    /**
     * In case the Successor was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SuccessorUpdateInput, SuccessorUncheckedUpdateInput>
  }

  /**
   * Successor delete
   */
  export type SuccessorDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Successor
     */
    select?: SuccessorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Successor
     */
    omit?: SuccessorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SuccessorInclude<ExtArgs> | null
    /**
     * Filter which Successor to delete.
     */
    where: SuccessorWhereUniqueInput
  }

  /**
   * Successor deleteMany
   */
  export type SuccessorDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Successors to delete
     */
    where?: SuccessorWhereInput
    /**
     * Limit how many Successors to delete.
     */
    limit?: number
  }

  /**
   * Successor without action
   */
  export type SuccessorDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Successor
     */
    select?: SuccessorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Successor
     */
    omit?: SuccessorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SuccessorInclude<ExtArgs> | null
  }


  /**
   * Model IDPPlan
   */

  export type AggregateIDPPlan = {
    _count: IDPPlanCountAggregateOutputType | null
    _min: IDPPlanMinAggregateOutputType | null
    _max: IDPPlanMaxAggregateOutputType | null
  }

  export type IDPPlanMinAggregateOutputType = {
    id: string | null
    employee_id: string | null
    title: string | null
    status: string | null
    period: string | null
    mentor_id: string | null
    approved_by: string | null
    approved_at: Date | null
    signed_by_employee: boolean | null
    signed_by_manager: boolean | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type IDPPlanMaxAggregateOutputType = {
    id: string | null
    employee_id: string | null
    title: string | null
    status: string | null
    period: string | null
    mentor_id: string | null
    approved_by: string | null
    approved_at: Date | null
    signed_by_employee: boolean | null
    signed_by_manager: boolean | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type IDPPlanCountAggregateOutputType = {
    id: number
    employee_id: number
    title: number
    status: number
    period: number
    development_areas: number
    action_items: number
    milestones: number
    mentor_id: number
    approved_by: number
    approved_at: number
    signed_by_employee: number
    signed_by_manager: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type IDPPlanMinAggregateInputType = {
    id?: true
    employee_id?: true
    title?: true
    status?: true
    period?: true
    mentor_id?: true
    approved_by?: true
    approved_at?: true
    signed_by_employee?: true
    signed_by_manager?: true
    created_at?: true
    updated_at?: true
  }

  export type IDPPlanMaxAggregateInputType = {
    id?: true
    employee_id?: true
    title?: true
    status?: true
    period?: true
    mentor_id?: true
    approved_by?: true
    approved_at?: true
    signed_by_employee?: true
    signed_by_manager?: true
    created_at?: true
    updated_at?: true
  }

  export type IDPPlanCountAggregateInputType = {
    id?: true
    employee_id?: true
    title?: true
    status?: true
    period?: true
    development_areas?: true
    action_items?: true
    milestones?: true
    mentor_id?: true
    approved_by?: true
    approved_at?: true
    signed_by_employee?: true
    signed_by_manager?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type IDPPlanAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which IDPPlan to aggregate.
     */
    where?: IDPPlanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of IDPPlans to fetch.
     */
    orderBy?: IDPPlanOrderByWithRelationInput | IDPPlanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: IDPPlanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` IDPPlans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` IDPPlans.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned IDPPlans
    **/
    _count?: true | IDPPlanCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: IDPPlanMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: IDPPlanMaxAggregateInputType
  }

  export type GetIDPPlanAggregateType<T extends IDPPlanAggregateArgs> = {
        [P in keyof T & keyof AggregateIDPPlan]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateIDPPlan[P]>
      : GetScalarType<T[P], AggregateIDPPlan[P]>
  }




  export type IDPPlanGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: IDPPlanWhereInput
    orderBy?: IDPPlanOrderByWithAggregationInput | IDPPlanOrderByWithAggregationInput[]
    by: IDPPlanScalarFieldEnum[] | IDPPlanScalarFieldEnum
    having?: IDPPlanScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: IDPPlanCountAggregateInputType | true
    _min?: IDPPlanMinAggregateInputType
    _max?: IDPPlanMaxAggregateInputType
  }

  export type IDPPlanGroupByOutputType = {
    id: string
    employee_id: string
    title: string
    status: string
    period: string
    development_areas: JsonValue | null
    action_items: JsonValue | null
    milestones: JsonValue | null
    mentor_id: string | null
    approved_by: string | null
    approved_at: Date | null
    signed_by_employee: boolean
    signed_by_manager: boolean
    created_at: Date
    updated_at: Date
    _count: IDPPlanCountAggregateOutputType | null
    _min: IDPPlanMinAggregateOutputType | null
    _max: IDPPlanMaxAggregateOutputType | null
  }

  type GetIDPPlanGroupByPayload<T extends IDPPlanGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<IDPPlanGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof IDPPlanGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], IDPPlanGroupByOutputType[P]>
            : GetScalarType<T[P], IDPPlanGroupByOutputType[P]>
        }
      >
    >


  export type IDPPlanSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    employee_id?: boolean
    title?: boolean
    status?: boolean
    period?: boolean
    development_areas?: boolean
    action_items?: boolean
    milestones?: boolean
    mentor_id?: boolean
    approved_by?: boolean
    approved_at?: boolean
    signed_by_employee?: boolean
    signed_by_manager?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["iDPPlan"]>

  export type IDPPlanSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    employee_id?: boolean
    title?: boolean
    status?: boolean
    period?: boolean
    development_areas?: boolean
    action_items?: boolean
    milestones?: boolean
    mentor_id?: boolean
    approved_by?: boolean
    approved_at?: boolean
    signed_by_employee?: boolean
    signed_by_manager?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["iDPPlan"]>

  export type IDPPlanSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    employee_id?: boolean
    title?: boolean
    status?: boolean
    period?: boolean
    development_areas?: boolean
    action_items?: boolean
    milestones?: boolean
    mentor_id?: boolean
    approved_by?: boolean
    approved_at?: boolean
    signed_by_employee?: boolean
    signed_by_manager?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["iDPPlan"]>

  export type IDPPlanSelectScalar = {
    id?: boolean
    employee_id?: boolean
    title?: boolean
    status?: boolean
    period?: boolean
    development_areas?: boolean
    action_items?: boolean
    milestones?: boolean
    mentor_id?: boolean
    approved_by?: boolean
    approved_at?: boolean
    signed_by_employee?: boolean
    signed_by_manager?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type IDPPlanOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "employee_id" | "title" | "status" | "period" | "development_areas" | "action_items" | "milestones" | "mentor_id" | "approved_by" | "approved_at" | "signed_by_employee" | "signed_by_manager" | "created_at" | "updated_at", ExtArgs["result"]["iDPPlan"]>

  export type $IDPPlanPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "IDPPlan"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      employee_id: string
      title: string
      status: string
      period: string
      development_areas: Prisma.JsonValue | null
      action_items: Prisma.JsonValue | null
      milestones: Prisma.JsonValue | null
      mentor_id: string | null
      approved_by: string | null
      approved_at: Date | null
      signed_by_employee: boolean
      signed_by_manager: boolean
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["iDPPlan"]>
    composites: {}
  }

  type IDPPlanGetPayload<S extends boolean | null | undefined | IDPPlanDefaultArgs> = $Result.GetResult<Prisma.$IDPPlanPayload, S>

  type IDPPlanCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<IDPPlanFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: IDPPlanCountAggregateInputType | true
    }

  export interface IDPPlanDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['IDPPlan'], meta: { name: 'IDPPlan' } }
    /**
     * Find zero or one IDPPlan that matches the filter.
     * @param {IDPPlanFindUniqueArgs} args - Arguments to find a IDPPlan
     * @example
     * // Get one IDPPlan
     * const iDPPlan = await prisma.iDPPlan.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends IDPPlanFindUniqueArgs>(args: SelectSubset<T, IDPPlanFindUniqueArgs<ExtArgs>>): Prisma__IDPPlanClient<$Result.GetResult<Prisma.$IDPPlanPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one IDPPlan that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {IDPPlanFindUniqueOrThrowArgs} args - Arguments to find a IDPPlan
     * @example
     * // Get one IDPPlan
     * const iDPPlan = await prisma.iDPPlan.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends IDPPlanFindUniqueOrThrowArgs>(args: SelectSubset<T, IDPPlanFindUniqueOrThrowArgs<ExtArgs>>): Prisma__IDPPlanClient<$Result.GetResult<Prisma.$IDPPlanPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first IDPPlan that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IDPPlanFindFirstArgs} args - Arguments to find a IDPPlan
     * @example
     * // Get one IDPPlan
     * const iDPPlan = await prisma.iDPPlan.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends IDPPlanFindFirstArgs>(args?: SelectSubset<T, IDPPlanFindFirstArgs<ExtArgs>>): Prisma__IDPPlanClient<$Result.GetResult<Prisma.$IDPPlanPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first IDPPlan that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IDPPlanFindFirstOrThrowArgs} args - Arguments to find a IDPPlan
     * @example
     * // Get one IDPPlan
     * const iDPPlan = await prisma.iDPPlan.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends IDPPlanFindFirstOrThrowArgs>(args?: SelectSubset<T, IDPPlanFindFirstOrThrowArgs<ExtArgs>>): Prisma__IDPPlanClient<$Result.GetResult<Prisma.$IDPPlanPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more IDPPlans that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IDPPlanFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all IDPPlans
     * const iDPPlans = await prisma.iDPPlan.findMany()
     * 
     * // Get first 10 IDPPlans
     * const iDPPlans = await prisma.iDPPlan.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const iDPPlanWithIdOnly = await prisma.iDPPlan.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends IDPPlanFindManyArgs>(args?: SelectSubset<T, IDPPlanFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$IDPPlanPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a IDPPlan.
     * @param {IDPPlanCreateArgs} args - Arguments to create a IDPPlan.
     * @example
     * // Create one IDPPlan
     * const IDPPlan = await prisma.iDPPlan.create({
     *   data: {
     *     // ... data to create a IDPPlan
     *   }
     * })
     * 
     */
    create<T extends IDPPlanCreateArgs>(args: SelectSubset<T, IDPPlanCreateArgs<ExtArgs>>): Prisma__IDPPlanClient<$Result.GetResult<Prisma.$IDPPlanPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many IDPPlans.
     * @param {IDPPlanCreateManyArgs} args - Arguments to create many IDPPlans.
     * @example
     * // Create many IDPPlans
     * const iDPPlan = await prisma.iDPPlan.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends IDPPlanCreateManyArgs>(args?: SelectSubset<T, IDPPlanCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many IDPPlans and returns the data saved in the database.
     * @param {IDPPlanCreateManyAndReturnArgs} args - Arguments to create many IDPPlans.
     * @example
     * // Create many IDPPlans
     * const iDPPlan = await prisma.iDPPlan.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many IDPPlans and only return the `id`
     * const iDPPlanWithIdOnly = await prisma.iDPPlan.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends IDPPlanCreateManyAndReturnArgs>(args?: SelectSubset<T, IDPPlanCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$IDPPlanPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a IDPPlan.
     * @param {IDPPlanDeleteArgs} args - Arguments to delete one IDPPlan.
     * @example
     * // Delete one IDPPlan
     * const IDPPlan = await prisma.iDPPlan.delete({
     *   where: {
     *     // ... filter to delete one IDPPlan
     *   }
     * })
     * 
     */
    delete<T extends IDPPlanDeleteArgs>(args: SelectSubset<T, IDPPlanDeleteArgs<ExtArgs>>): Prisma__IDPPlanClient<$Result.GetResult<Prisma.$IDPPlanPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one IDPPlan.
     * @param {IDPPlanUpdateArgs} args - Arguments to update one IDPPlan.
     * @example
     * // Update one IDPPlan
     * const iDPPlan = await prisma.iDPPlan.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends IDPPlanUpdateArgs>(args: SelectSubset<T, IDPPlanUpdateArgs<ExtArgs>>): Prisma__IDPPlanClient<$Result.GetResult<Prisma.$IDPPlanPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more IDPPlans.
     * @param {IDPPlanDeleteManyArgs} args - Arguments to filter IDPPlans to delete.
     * @example
     * // Delete a few IDPPlans
     * const { count } = await prisma.iDPPlan.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends IDPPlanDeleteManyArgs>(args?: SelectSubset<T, IDPPlanDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more IDPPlans.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IDPPlanUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many IDPPlans
     * const iDPPlan = await prisma.iDPPlan.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends IDPPlanUpdateManyArgs>(args: SelectSubset<T, IDPPlanUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more IDPPlans and returns the data updated in the database.
     * @param {IDPPlanUpdateManyAndReturnArgs} args - Arguments to update many IDPPlans.
     * @example
     * // Update many IDPPlans
     * const iDPPlan = await prisma.iDPPlan.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more IDPPlans and only return the `id`
     * const iDPPlanWithIdOnly = await prisma.iDPPlan.updateManyAndReturn({
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
    updateManyAndReturn<T extends IDPPlanUpdateManyAndReturnArgs>(args: SelectSubset<T, IDPPlanUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$IDPPlanPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one IDPPlan.
     * @param {IDPPlanUpsertArgs} args - Arguments to update or create a IDPPlan.
     * @example
     * // Update or create a IDPPlan
     * const iDPPlan = await prisma.iDPPlan.upsert({
     *   create: {
     *     // ... data to create a IDPPlan
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the IDPPlan we want to update
     *   }
     * })
     */
    upsert<T extends IDPPlanUpsertArgs>(args: SelectSubset<T, IDPPlanUpsertArgs<ExtArgs>>): Prisma__IDPPlanClient<$Result.GetResult<Prisma.$IDPPlanPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of IDPPlans.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IDPPlanCountArgs} args - Arguments to filter IDPPlans to count.
     * @example
     * // Count the number of IDPPlans
     * const count = await prisma.iDPPlan.count({
     *   where: {
     *     // ... the filter for the IDPPlans we want to count
     *   }
     * })
    **/
    count<T extends IDPPlanCountArgs>(
      args?: Subset<T, IDPPlanCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], IDPPlanCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a IDPPlan.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IDPPlanAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends IDPPlanAggregateArgs>(args: Subset<T, IDPPlanAggregateArgs>): Prisma.PrismaPromise<GetIDPPlanAggregateType<T>>

    /**
     * Group by IDPPlan.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IDPPlanGroupByArgs} args - Group by arguments.
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
      T extends IDPPlanGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: IDPPlanGroupByArgs['orderBy'] }
        : { orderBy?: IDPPlanGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, IDPPlanGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetIDPPlanGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the IDPPlan model
   */
  readonly fields: IDPPlanFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for IDPPlan.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__IDPPlanClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the IDPPlan model
   */
  interface IDPPlanFieldRefs {
    readonly id: FieldRef<"IDPPlan", 'String'>
    readonly employee_id: FieldRef<"IDPPlan", 'String'>
    readonly title: FieldRef<"IDPPlan", 'String'>
    readonly status: FieldRef<"IDPPlan", 'String'>
    readonly period: FieldRef<"IDPPlan", 'String'>
    readonly development_areas: FieldRef<"IDPPlan", 'Json'>
    readonly action_items: FieldRef<"IDPPlan", 'Json'>
    readonly milestones: FieldRef<"IDPPlan", 'Json'>
    readonly mentor_id: FieldRef<"IDPPlan", 'String'>
    readonly approved_by: FieldRef<"IDPPlan", 'String'>
    readonly approved_at: FieldRef<"IDPPlan", 'DateTime'>
    readonly signed_by_employee: FieldRef<"IDPPlan", 'Boolean'>
    readonly signed_by_manager: FieldRef<"IDPPlan", 'Boolean'>
    readonly created_at: FieldRef<"IDPPlan", 'DateTime'>
    readonly updated_at: FieldRef<"IDPPlan", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * IDPPlan findUnique
   */
  export type IDPPlanFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IDPPlan
     */
    select?: IDPPlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the IDPPlan
     */
    omit?: IDPPlanOmit<ExtArgs> | null
    /**
     * Filter, which IDPPlan to fetch.
     */
    where: IDPPlanWhereUniqueInput
  }

  /**
   * IDPPlan findUniqueOrThrow
   */
  export type IDPPlanFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IDPPlan
     */
    select?: IDPPlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the IDPPlan
     */
    omit?: IDPPlanOmit<ExtArgs> | null
    /**
     * Filter, which IDPPlan to fetch.
     */
    where: IDPPlanWhereUniqueInput
  }

  /**
   * IDPPlan findFirst
   */
  export type IDPPlanFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IDPPlan
     */
    select?: IDPPlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the IDPPlan
     */
    omit?: IDPPlanOmit<ExtArgs> | null
    /**
     * Filter, which IDPPlan to fetch.
     */
    where?: IDPPlanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of IDPPlans to fetch.
     */
    orderBy?: IDPPlanOrderByWithRelationInput | IDPPlanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for IDPPlans.
     */
    cursor?: IDPPlanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` IDPPlans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` IDPPlans.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of IDPPlans.
     */
    distinct?: IDPPlanScalarFieldEnum | IDPPlanScalarFieldEnum[]
  }

  /**
   * IDPPlan findFirstOrThrow
   */
  export type IDPPlanFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IDPPlan
     */
    select?: IDPPlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the IDPPlan
     */
    omit?: IDPPlanOmit<ExtArgs> | null
    /**
     * Filter, which IDPPlan to fetch.
     */
    where?: IDPPlanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of IDPPlans to fetch.
     */
    orderBy?: IDPPlanOrderByWithRelationInput | IDPPlanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for IDPPlans.
     */
    cursor?: IDPPlanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` IDPPlans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` IDPPlans.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of IDPPlans.
     */
    distinct?: IDPPlanScalarFieldEnum | IDPPlanScalarFieldEnum[]
  }

  /**
   * IDPPlan findMany
   */
  export type IDPPlanFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IDPPlan
     */
    select?: IDPPlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the IDPPlan
     */
    omit?: IDPPlanOmit<ExtArgs> | null
    /**
     * Filter, which IDPPlans to fetch.
     */
    where?: IDPPlanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of IDPPlans to fetch.
     */
    orderBy?: IDPPlanOrderByWithRelationInput | IDPPlanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing IDPPlans.
     */
    cursor?: IDPPlanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` IDPPlans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` IDPPlans.
     */
    skip?: number
    distinct?: IDPPlanScalarFieldEnum | IDPPlanScalarFieldEnum[]
  }

  /**
   * IDPPlan create
   */
  export type IDPPlanCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IDPPlan
     */
    select?: IDPPlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the IDPPlan
     */
    omit?: IDPPlanOmit<ExtArgs> | null
    /**
     * The data needed to create a IDPPlan.
     */
    data: XOR<IDPPlanCreateInput, IDPPlanUncheckedCreateInput>
  }

  /**
   * IDPPlan createMany
   */
  export type IDPPlanCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many IDPPlans.
     */
    data: IDPPlanCreateManyInput | IDPPlanCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * IDPPlan createManyAndReturn
   */
  export type IDPPlanCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IDPPlan
     */
    select?: IDPPlanSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the IDPPlan
     */
    omit?: IDPPlanOmit<ExtArgs> | null
    /**
     * The data used to create many IDPPlans.
     */
    data: IDPPlanCreateManyInput | IDPPlanCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * IDPPlan update
   */
  export type IDPPlanUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IDPPlan
     */
    select?: IDPPlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the IDPPlan
     */
    omit?: IDPPlanOmit<ExtArgs> | null
    /**
     * The data needed to update a IDPPlan.
     */
    data: XOR<IDPPlanUpdateInput, IDPPlanUncheckedUpdateInput>
    /**
     * Choose, which IDPPlan to update.
     */
    where: IDPPlanWhereUniqueInput
  }

  /**
   * IDPPlan updateMany
   */
  export type IDPPlanUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update IDPPlans.
     */
    data: XOR<IDPPlanUpdateManyMutationInput, IDPPlanUncheckedUpdateManyInput>
    /**
     * Filter which IDPPlans to update
     */
    where?: IDPPlanWhereInput
    /**
     * Limit how many IDPPlans to update.
     */
    limit?: number
  }

  /**
   * IDPPlan updateManyAndReturn
   */
  export type IDPPlanUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IDPPlan
     */
    select?: IDPPlanSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the IDPPlan
     */
    omit?: IDPPlanOmit<ExtArgs> | null
    /**
     * The data used to update IDPPlans.
     */
    data: XOR<IDPPlanUpdateManyMutationInput, IDPPlanUncheckedUpdateManyInput>
    /**
     * Filter which IDPPlans to update
     */
    where?: IDPPlanWhereInput
    /**
     * Limit how many IDPPlans to update.
     */
    limit?: number
  }

  /**
   * IDPPlan upsert
   */
  export type IDPPlanUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IDPPlan
     */
    select?: IDPPlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the IDPPlan
     */
    omit?: IDPPlanOmit<ExtArgs> | null
    /**
     * The filter to search for the IDPPlan to update in case it exists.
     */
    where: IDPPlanWhereUniqueInput
    /**
     * In case the IDPPlan found by the `where` argument doesn't exist, create a new IDPPlan with this data.
     */
    create: XOR<IDPPlanCreateInput, IDPPlanUncheckedCreateInput>
    /**
     * In case the IDPPlan was found with the provided `where` argument, update it with this data.
     */
    update: XOR<IDPPlanUpdateInput, IDPPlanUncheckedUpdateInput>
  }

  /**
   * IDPPlan delete
   */
  export type IDPPlanDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IDPPlan
     */
    select?: IDPPlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the IDPPlan
     */
    omit?: IDPPlanOmit<ExtArgs> | null
    /**
     * Filter which IDPPlan to delete.
     */
    where: IDPPlanWhereUniqueInput
  }

  /**
   * IDPPlan deleteMany
   */
  export type IDPPlanDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which IDPPlans to delete
     */
    where?: IDPPlanWhereInput
    /**
     * Limit how many IDPPlans to delete.
     */
    limit?: number
  }

  /**
   * IDPPlan without action
   */
  export type IDPPlanDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IDPPlan
     */
    select?: IDPPlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the IDPPlan
     */
    omit?: IDPPlanOmit<ExtArgs> | null
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


  export const GoalScalarFieldEnum: {
    id: 'id',
    employee_id: 'employee_id',
    title: 'title',
    description: 'description',
    category: 'category',
    weight: 'weight',
    target_value: 'target_value',
    actual_value: 'actual_value',
    unit: 'unit',
    status: 'status',
    progress: 'progress',
    start_date: 'start_date',
    due_date: 'due_date',
    completed_at: 'completed_at',
    period: 'period',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type GoalScalarFieldEnum = (typeof GoalScalarFieldEnum)[keyof typeof GoalScalarFieldEnum]


  export const EvaluationScalarFieldEnum: {
    id: 'id',
    employee_id: 'employee_id',
    evaluator_id: 'evaluator_id',
    period: 'period',
    type: 'type',
    status: 'status',
    self_rating: 'self_rating',
    manager_rating: 'manager_rating',
    final_rating: 'final_rating',
    self_comments: 'self_comments',
    manager_comments: 'manager_comments',
    strengths: 'strengths',
    improvements: 'improvements',
    submitted_at: 'submitted_at',
    completed_at: 'completed_at',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type EvaluationScalarFieldEnum = (typeof EvaluationScalarFieldEnum)[keyof typeof EvaluationScalarFieldEnum]


  export const EvaluationScoreScalarFieldEnum: {
    id: 'id',
    evaluation_id: 'evaluation_id',
    competency_id: 'competency_id',
    self_score: 'self_score',
    manager_score: 'manager_score',
    final_score: 'final_score',
    comments: 'comments'
  };

  export type EvaluationScoreScalarFieldEnum = (typeof EvaluationScoreScalarFieldEnum)[keyof typeof EvaluationScoreScalarFieldEnum]


  export const CompetencyScalarFieldEnum: {
    id: 'id',
    name: 'name',
    category: 'category',
    description: 'description',
    levels: 'levels',
    is_active: 'is_active',
    created_at: 'created_at'
  };

  export type CompetencyScalarFieldEnum = (typeof CompetencyScalarFieldEnum)[keyof typeof CompetencyScalarFieldEnum]


  export const TalentProfileScalarFieldEnum: {
    id: 'id',
    employee_id: 'employee_id',
    performance_rating: 'performance_rating',
    potential_rating: 'potential_rating',
    nine_box_position: 'nine_box_position',
    risk_of_leaving: 'risk_of_leaving',
    impact_of_leaving: 'impact_of_leaving',
    career_aspiration: 'career_aspiration',
    mobility: 'mobility',
    key_strengths: 'key_strengths',
    development_areas: 'development_areas',
    last_calibration: 'last_calibration',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type TalentProfileScalarFieldEnum = (typeof TalentProfileScalarFieldEnum)[keyof typeof TalentProfileScalarFieldEnum]


  export const SuccessionPlanScalarFieldEnum: {
    id: 'id',
    position_id: 'position_id',
    position_title: 'position_title',
    department: 'department',
    incumbent_id: 'incumbent_id',
    criticality: 'criticality',
    status: 'status',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type SuccessionPlanScalarFieldEnum = (typeof SuccessionPlanScalarFieldEnum)[keyof typeof SuccessionPlanScalarFieldEnum]


  export const SuccessorScalarFieldEnum: {
    id: 'id',
    succession_plan_id: 'succession_plan_id',
    employee_id: 'employee_id',
    readiness: 'readiness',
    development_gaps: 'development_gaps',
    development_actions: 'development_actions'
  };

  export type SuccessorScalarFieldEnum = (typeof SuccessorScalarFieldEnum)[keyof typeof SuccessorScalarFieldEnum]


  export const IDPPlanScalarFieldEnum: {
    id: 'id',
    employee_id: 'employee_id',
    title: 'title',
    status: 'status',
    period: 'period',
    development_areas: 'development_areas',
    action_items: 'action_items',
    milestones: 'milestones',
    mentor_id: 'mentor_id',
    approved_by: 'approved_by',
    approved_at: 'approved_at',
    signed_by_employee: 'signed_by_employee',
    signed_by_manager: 'signed_by_manager',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type IDPPlanScalarFieldEnum = (typeof IDPPlanScalarFieldEnum)[keyof typeof IDPPlanScalarFieldEnum]


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
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    
  /**
   * Deep Input Types
   */


  export type GoalWhereInput = {
    AND?: GoalWhereInput | GoalWhereInput[]
    OR?: GoalWhereInput[]
    NOT?: GoalWhereInput | GoalWhereInput[]
    id?: StringFilter<"Goal"> | string
    employee_id?: StringFilter<"Goal"> | string
    title?: StringFilter<"Goal"> | string
    description?: StringNullableFilter<"Goal"> | string | null
    category?: StringFilter<"Goal"> | string
    weight?: IntFilter<"Goal"> | number
    target_value?: FloatNullableFilter<"Goal"> | number | null
    actual_value?: FloatNullableFilter<"Goal"> | number | null
    unit?: StringNullableFilter<"Goal"> | string | null
    status?: StringFilter<"Goal"> | string
    progress?: IntFilter<"Goal"> | number
    start_date?: DateTimeNullableFilter<"Goal"> | Date | string | null
    due_date?: DateTimeNullableFilter<"Goal"> | Date | string | null
    completed_at?: DateTimeNullableFilter<"Goal"> | Date | string | null
    period?: StringFilter<"Goal"> | string
    created_at?: DateTimeFilter<"Goal"> | Date | string
    updated_at?: DateTimeFilter<"Goal"> | Date | string
  }

  export type GoalOrderByWithRelationInput = {
    id?: SortOrder
    employee_id?: SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    category?: SortOrder
    weight?: SortOrder
    target_value?: SortOrderInput | SortOrder
    actual_value?: SortOrderInput | SortOrder
    unit?: SortOrderInput | SortOrder
    status?: SortOrder
    progress?: SortOrder
    start_date?: SortOrderInput | SortOrder
    due_date?: SortOrderInput | SortOrder
    completed_at?: SortOrderInput | SortOrder
    period?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type GoalWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: GoalWhereInput | GoalWhereInput[]
    OR?: GoalWhereInput[]
    NOT?: GoalWhereInput | GoalWhereInput[]
    employee_id?: StringFilter<"Goal"> | string
    title?: StringFilter<"Goal"> | string
    description?: StringNullableFilter<"Goal"> | string | null
    category?: StringFilter<"Goal"> | string
    weight?: IntFilter<"Goal"> | number
    target_value?: FloatNullableFilter<"Goal"> | number | null
    actual_value?: FloatNullableFilter<"Goal"> | number | null
    unit?: StringNullableFilter<"Goal"> | string | null
    status?: StringFilter<"Goal"> | string
    progress?: IntFilter<"Goal"> | number
    start_date?: DateTimeNullableFilter<"Goal"> | Date | string | null
    due_date?: DateTimeNullableFilter<"Goal"> | Date | string | null
    completed_at?: DateTimeNullableFilter<"Goal"> | Date | string | null
    period?: StringFilter<"Goal"> | string
    created_at?: DateTimeFilter<"Goal"> | Date | string
    updated_at?: DateTimeFilter<"Goal"> | Date | string
  }, "id">

  export type GoalOrderByWithAggregationInput = {
    id?: SortOrder
    employee_id?: SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    category?: SortOrder
    weight?: SortOrder
    target_value?: SortOrderInput | SortOrder
    actual_value?: SortOrderInput | SortOrder
    unit?: SortOrderInput | SortOrder
    status?: SortOrder
    progress?: SortOrder
    start_date?: SortOrderInput | SortOrder
    due_date?: SortOrderInput | SortOrder
    completed_at?: SortOrderInput | SortOrder
    period?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: GoalCountOrderByAggregateInput
    _avg?: GoalAvgOrderByAggregateInput
    _max?: GoalMaxOrderByAggregateInput
    _min?: GoalMinOrderByAggregateInput
    _sum?: GoalSumOrderByAggregateInput
  }

  export type GoalScalarWhereWithAggregatesInput = {
    AND?: GoalScalarWhereWithAggregatesInput | GoalScalarWhereWithAggregatesInput[]
    OR?: GoalScalarWhereWithAggregatesInput[]
    NOT?: GoalScalarWhereWithAggregatesInput | GoalScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Goal"> | string
    employee_id?: StringWithAggregatesFilter<"Goal"> | string
    title?: StringWithAggregatesFilter<"Goal"> | string
    description?: StringNullableWithAggregatesFilter<"Goal"> | string | null
    category?: StringWithAggregatesFilter<"Goal"> | string
    weight?: IntWithAggregatesFilter<"Goal"> | number
    target_value?: FloatNullableWithAggregatesFilter<"Goal"> | number | null
    actual_value?: FloatNullableWithAggregatesFilter<"Goal"> | number | null
    unit?: StringNullableWithAggregatesFilter<"Goal"> | string | null
    status?: StringWithAggregatesFilter<"Goal"> | string
    progress?: IntWithAggregatesFilter<"Goal"> | number
    start_date?: DateTimeNullableWithAggregatesFilter<"Goal"> | Date | string | null
    due_date?: DateTimeNullableWithAggregatesFilter<"Goal"> | Date | string | null
    completed_at?: DateTimeNullableWithAggregatesFilter<"Goal"> | Date | string | null
    period?: StringWithAggregatesFilter<"Goal"> | string
    created_at?: DateTimeWithAggregatesFilter<"Goal"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"Goal"> | Date | string
  }

  export type EvaluationWhereInput = {
    AND?: EvaluationWhereInput | EvaluationWhereInput[]
    OR?: EvaluationWhereInput[]
    NOT?: EvaluationWhereInput | EvaluationWhereInput[]
    id?: StringFilter<"Evaluation"> | string
    employee_id?: StringFilter<"Evaluation"> | string
    evaluator_id?: StringFilter<"Evaluation"> | string
    period?: StringFilter<"Evaluation"> | string
    type?: StringFilter<"Evaluation"> | string
    status?: StringFilter<"Evaluation"> | string
    self_rating?: FloatNullableFilter<"Evaluation"> | number | null
    manager_rating?: FloatNullableFilter<"Evaluation"> | number | null
    final_rating?: FloatNullableFilter<"Evaluation"> | number | null
    self_comments?: StringNullableFilter<"Evaluation"> | string | null
    manager_comments?: StringNullableFilter<"Evaluation"> | string | null
    strengths?: StringNullableFilter<"Evaluation"> | string | null
    improvements?: StringNullableFilter<"Evaluation"> | string | null
    submitted_at?: DateTimeNullableFilter<"Evaluation"> | Date | string | null
    completed_at?: DateTimeNullableFilter<"Evaluation"> | Date | string | null
    created_at?: DateTimeFilter<"Evaluation"> | Date | string
    updated_at?: DateTimeFilter<"Evaluation"> | Date | string
    scores?: EvaluationScoreListRelationFilter
  }

  export type EvaluationOrderByWithRelationInput = {
    id?: SortOrder
    employee_id?: SortOrder
    evaluator_id?: SortOrder
    period?: SortOrder
    type?: SortOrder
    status?: SortOrder
    self_rating?: SortOrderInput | SortOrder
    manager_rating?: SortOrderInput | SortOrder
    final_rating?: SortOrderInput | SortOrder
    self_comments?: SortOrderInput | SortOrder
    manager_comments?: SortOrderInput | SortOrder
    strengths?: SortOrderInput | SortOrder
    improvements?: SortOrderInput | SortOrder
    submitted_at?: SortOrderInput | SortOrder
    completed_at?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    scores?: EvaluationScoreOrderByRelationAggregateInput
  }

  export type EvaluationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: EvaluationWhereInput | EvaluationWhereInput[]
    OR?: EvaluationWhereInput[]
    NOT?: EvaluationWhereInput | EvaluationWhereInput[]
    employee_id?: StringFilter<"Evaluation"> | string
    evaluator_id?: StringFilter<"Evaluation"> | string
    period?: StringFilter<"Evaluation"> | string
    type?: StringFilter<"Evaluation"> | string
    status?: StringFilter<"Evaluation"> | string
    self_rating?: FloatNullableFilter<"Evaluation"> | number | null
    manager_rating?: FloatNullableFilter<"Evaluation"> | number | null
    final_rating?: FloatNullableFilter<"Evaluation"> | number | null
    self_comments?: StringNullableFilter<"Evaluation"> | string | null
    manager_comments?: StringNullableFilter<"Evaluation"> | string | null
    strengths?: StringNullableFilter<"Evaluation"> | string | null
    improvements?: StringNullableFilter<"Evaluation"> | string | null
    submitted_at?: DateTimeNullableFilter<"Evaluation"> | Date | string | null
    completed_at?: DateTimeNullableFilter<"Evaluation"> | Date | string | null
    created_at?: DateTimeFilter<"Evaluation"> | Date | string
    updated_at?: DateTimeFilter<"Evaluation"> | Date | string
    scores?: EvaluationScoreListRelationFilter
  }, "id">

  export type EvaluationOrderByWithAggregationInput = {
    id?: SortOrder
    employee_id?: SortOrder
    evaluator_id?: SortOrder
    period?: SortOrder
    type?: SortOrder
    status?: SortOrder
    self_rating?: SortOrderInput | SortOrder
    manager_rating?: SortOrderInput | SortOrder
    final_rating?: SortOrderInput | SortOrder
    self_comments?: SortOrderInput | SortOrder
    manager_comments?: SortOrderInput | SortOrder
    strengths?: SortOrderInput | SortOrder
    improvements?: SortOrderInput | SortOrder
    submitted_at?: SortOrderInput | SortOrder
    completed_at?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: EvaluationCountOrderByAggregateInput
    _avg?: EvaluationAvgOrderByAggregateInput
    _max?: EvaluationMaxOrderByAggregateInput
    _min?: EvaluationMinOrderByAggregateInput
    _sum?: EvaluationSumOrderByAggregateInput
  }

  export type EvaluationScalarWhereWithAggregatesInput = {
    AND?: EvaluationScalarWhereWithAggregatesInput | EvaluationScalarWhereWithAggregatesInput[]
    OR?: EvaluationScalarWhereWithAggregatesInput[]
    NOT?: EvaluationScalarWhereWithAggregatesInput | EvaluationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Evaluation"> | string
    employee_id?: StringWithAggregatesFilter<"Evaluation"> | string
    evaluator_id?: StringWithAggregatesFilter<"Evaluation"> | string
    period?: StringWithAggregatesFilter<"Evaluation"> | string
    type?: StringWithAggregatesFilter<"Evaluation"> | string
    status?: StringWithAggregatesFilter<"Evaluation"> | string
    self_rating?: FloatNullableWithAggregatesFilter<"Evaluation"> | number | null
    manager_rating?: FloatNullableWithAggregatesFilter<"Evaluation"> | number | null
    final_rating?: FloatNullableWithAggregatesFilter<"Evaluation"> | number | null
    self_comments?: StringNullableWithAggregatesFilter<"Evaluation"> | string | null
    manager_comments?: StringNullableWithAggregatesFilter<"Evaluation"> | string | null
    strengths?: StringNullableWithAggregatesFilter<"Evaluation"> | string | null
    improvements?: StringNullableWithAggregatesFilter<"Evaluation"> | string | null
    submitted_at?: DateTimeNullableWithAggregatesFilter<"Evaluation"> | Date | string | null
    completed_at?: DateTimeNullableWithAggregatesFilter<"Evaluation"> | Date | string | null
    created_at?: DateTimeWithAggregatesFilter<"Evaluation"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"Evaluation"> | Date | string
  }

  export type EvaluationScoreWhereInput = {
    AND?: EvaluationScoreWhereInput | EvaluationScoreWhereInput[]
    OR?: EvaluationScoreWhereInput[]
    NOT?: EvaluationScoreWhereInput | EvaluationScoreWhereInput[]
    id?: StringFilter<"EvaluationScore"> | string
    evaluation_id?: StringFilter<"EvaluationScore"> | string
    competency_id?: StringFilter<"EvaluationScore"> | string
    self_score?: FloatNullableFilter<"EvaluationScore"> | number | null
    manager_score?: FloatNullableFilter<"EvaluationScore"> | number | null
    final_score?: FloatNullableFilter<"EvaluationScore"> | number | null
    comments?: StringNullableFilter<"EvaluationScore"> | string | null
    evaluation?: XOR<EvaluationScalarRelationFilter, EvaluationWhereInput>
  }

  export type EvaluationScoreOrderByWithRelationInput = {
    id?: SortOrder
    evaluation_id?: SortOrder
    competency_id?: SortOrder
    self_score?: SortOrderInput | SortOrder
    manager_score?: SortOrderInput | SortOrder
    final_score?: SortOrderInput | SortOrder
    comments?: SortOrderInput | SortOrder
    evaluation?: EvaluationOrderByWithRelationInput
  }

  export type EvaluationScoreWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: EvaluationScoreWhereInput | EvaluationScoreWhereInput[]
    OR?: EvaluationScoreWhereInput[]
    NOT?: EvaluationScoreWhereInput | EvaluationScoreWhereInput[]
    evaluation_id?: StringFilter<"EvaluationScore"> | string
    competency_id?: StringFilter<"EvaluationScore"> | string
    self_score?: FloatNullableFilter<"EvaluationScore"> | number | null
    manager_score?: FloatNullableFilter<"EvaluationScore"> | number | null
    final_score?: FloatNullableFilter<"EvaluationScore"> | number | null
    comments?: StringNullableFilter<"EvaluationScore"> | string | null
    evaluation?: XOR<EvaluationScalarRelationFilter, EvaluationWhereInput>
  }, "id">

  export type EvaluationScoreOrderByWithAggregationInput = {
    id?: SortOrder
    evaluation_id?: SortOrder
    competency_id?: SortOrder
    self_score?: SortOrderInput | SortOrder
    manager_score?: SortOrderInput | SortOrder
    final_score?: SortOrderInput | SortOrder
    comments?: SortOrderInput | SortOrder
    _count?: EvaluationScoreCountOrderByAggregateInput
    _avg?: EvaluationScoreAvgOrderByAggregateInput
    _max?: EvaluationScoreMaxOrderByAggregateInput
    _min?: EvaluationScoreMinOrderByAggregateInput
    _sum?: EvaluationScoreSumOrderByAggregateInput
  }

  export type EvaluationScoreScalarWhereWithAggregatesInput = {
    AND?: EvaluationScoreScalarWhereWithAggregatesInput | EvaluationScoreScalarWhereWithAggregatesInput[]
    OR?: EvaluationScoreScalarWhereWithAggregatesInput[]
    NOT?: EvaluationScoreScalarWhereWithAggregatesInput | EvaluationScoreScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"EvaluationScore"> | string
    evaluation_id?: StringWithAggregatesFilter<"EvaluationScore"> | string
    competency_id?: StringWithAggregatesFilter<"EvaluationScore"> | string
    self_score?: FloatNullableWithAggregatesFilter<"EvaluationScore"> | number | null
    manager_score?: FloatNullableWithAggregatesFilter<"EvaluationScore"> | number | null
    final_score?: FloatNullableWithAggregatesFilter<"EvaluationScore"> | number | null
    comments?: StringNullableWithAggregatesFilter<"EvaluationScore"> | string | null
  }

  export type CompetencyWhereInput = {
    AND?: CompetencyWhereInput | CompetencyWhereInput[]
    OR?: CompetencyWhereInput[]
    NOT?: CompetencyWhereInput | CompetencyWhereInput[]
    id?: StringFilter<"Competency"> | string
    name?: StringFilter<"Competency"> | string
    category?: StringFilter<"Competency"> | string
    description?: StringNullableFilter<"Competency"> | string | null
    levels?: JsonNullableFilter<"Competency">
    is_active?: BoolFilter<"Competency"> | boolean
    created_at?: DateTimeFilter<"Competency"> | Date | string
  }

  export type CompetencyOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    category?: SortOrder
    description?: SortOrderInput | SortOrder
    levels?: SortOrderInput | SortOrder
    is_active?: SortOrder
    created_at?: SortOrder
  }

  export type CompetencyWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: CompetencyWhereInput | CompetencyWhereInput[]
    OR?: CompetencyWhereInput[]
    NOT?: CompetencyWhereInput | CompetencyWhereInput[]
    name?: StringFilter<"Competency"> | string
    category?: StringFilter<"Competency"> | string
    description?: StringNullableFilter<"Competency"> | string | null
    levels?: JsonNullableFilter<"Competency">
    is_active?: BoolFilter<"Competency"> | boolean
    created_at?: DateTimeFilter<"Competency"> | Date | string
  }, "id">

  export type CompetencyOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    category?: SortOrder
    description?: SortOrderInput | SortOrder
    levels?: SortOrderInput | SortOrder
    is_active?: SortOrder
    created_at?: SortOrder
    _count?: CompetencyCountOrderByAggregateInput
    _max?: CompetencyMaxOrderByAggregateInput
    _min?: CompetencyMinOrderByAggregateInput
  }

  export type CompetencyScalarWhereWithAggregatesInput = {
    AND?: CompetencyScalarWhereWithAggregatesInput | CompetencyScalarWhereWithAggregatesInput[]
    OR?: CompetencyScalarWhereWithAggregatesInput[]
    NOT?: CompetencyScalarWhereWithAggregatesInput | CompetencyScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Competency"> | string
    name?: StringWithAggregatesFilter<"Competency"> | string
    category?: StringWithAggregatesFilter<"Competency"> | string
    description?: StringNullableWithAggregatesFilter<"Competency"> | string | null
    levels?: JsonNullableWithAggregatesFilter<"Competency">
    is_active?: BoolWithAggregatesFilter<"Competency"> | boolean
    created_at?: DateTimeWithAggregatesFilter<"Competency"> | Date | string
  }

  export type TalentProfileWhereInput = {
    AND?: TalentProfileWhereInput | TalentProfileWhereInput[]
    OR?: TalentProfileWhereInput[]
    NOT?: TalentProfileWhereInput | TalentProfileWhereInput[]
    id?: StringFilter<"TalentProfile"> | string
    employee_id?: StringFilter<"TalentProfile"> | string
    performance_rating?: FloatNullableFilter<"TalentProfile"> | number | null
    potential_rating?: FloatNullableFilter<"TalentProfile"> | number | null
    nine_box_position?: StringNullableFilter<"TalentProfile"> | string | null
    risk_of_leaving?: StringNullableFilter<"TalentProfile"> | string | null
    impact_of_leaving?: StringNullableFilter<"TalentProfile"> | string | null
    career_aspiration?: StringNullableFilter<"TalentProfile"> | string | null
    mobility?: StringNullableFilter<"TalentProfile"> | string | null
    key_strengths?: JsonNullableFilter<"TalentProfile">
    development_areas?: JsonNullableFilter<"TalentProfile">
    last_calibration?: DateTimeNullableFilter<"TalentProfile"> | Date | string | null
    created_at?: DateTimeFilter<"TalentProfile"> | Date | string
    updated_at?: DateTimeFilter<"TalentProfile"> | Date | string
  }

  export type TalentProfileOrderByWithRelationInput = {
    id?: SortOrder
    employee_id?: SortOrder
    performance_rating?: SortOrderInput | SortOrder
    potential_rating?: SortOrderInput | SortOrder
    nine_box_position?: SortOrderInput | SortOrder
    risk_of_leaving?: SortOrderInput | SortOrder
    impact_of_leaving?: SortOrderInput | SortOrder
    career_aspiration?: SortOrderInput | SortOrder
    mobility?: SortOrderInput | SortOrder
    key_strengths?: SortOrderInput | SortOrder
    development_areas?: SortOrderInput | SortOrder
    last_calibration?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type TalentProfileWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    employee_id?: string
    AND?: TalentProfileWhereInput | TalentProfileWhereInput[]
    OR?: TalentProfileWhereInput[]
    NOT?: TalentProfileWhereInput | TalentProfileWhereInput[]
    performance_rating?: FloatNullableFilter<"TalentProfile"> | number | null
    potential_rating?: FloatNullableFilter<"TalentProfile"> | number | null
    nine_box_position?: StringNullableFilter<"TalentProfile"> | string | null
    risk_of_leaving?: StringNullableFilter<"TalentProfile"> | string | null
    impact_of_leaving?: StringNullableFilter<"TalentProfile"> | string | null
    career_aspiration?: StringNullableFilter<"TalentProfile"> | string | null
    mobility?: StringNullableFilter<"TalentProfile"> | string | null
    key_strengths?: JsonNullableFilter<"TalentProfile">
    development_areas?: JsonNullableFilter<"TalentProfile">
    last_calibration?: DateTimeNullableFilter<"TalentProfile"> | Date | string | null
    created_at?: DateTimeFilter<"TalentProfile"> | Date | string
    updated_at?: DateTimeFilter<"TalentProfile"> | Date | string
  }, "id" | "employee_id">

  export type TalentProfileOrderByWithAggregationInput = {
    id?: SortOrder
    employee_id?: SortOrder
    performance_rating?: SortOrderInput | SortOrder
    potential_rating?: SortOrderInput | SortOrder
    nine_box_position?: SortOrderInput | SortOrder
    risk_of_leaving?: SortOrderInput | SortOrder
    impact_of_leaving?: SortOrderInput | SortOrder
    career_aspiration?: SortOrderInput | SortOrder
    mobility?: SortOrderInput | SortOrder
    key_strengths?: SortOrderInput | SortOrder
    development_areas?: SortOrderInput | SortOrder
    last_calibration?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: TalentProfileCountOrderByAggregateInput
    _avg?: TalentProfileAvgOrderByAggregateInput
    _max?: TalentProfileMaxOrderByAggregateInput
    _min?: TalentProfileMinOrderByAggregateInput
    _sum?: TalentProfileSumOrderByAggregateInput
  }

  export type TalentProfileScalarWhereWithAggregatesInput = {
    AND?: TalentProfileScalarWhereWithAggregatesInput | TalentProfileScalarWhereWithAggregatesInput[]
    OR?: TalentProfileScalarWhereWithAggregatesInput[]
    NOT?: TalentProfileScalarWhereWithAggregatesInput | TalentProfileScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"TalentProfile"> | string
    employee_id?: StringWithAggregatesFilter<"TalentProfile"> | string
    performance_rating?: FloatNullableWithAggregatesFilter<"TalentProfile"> | number | null
    potential_rating?: FloatNullableWithAggregatesFilter<"TalentProfile"> | number | null
    nine_box_position?: StringNullableWithAggregatesFilter<"TalentProfile"> | string | null
    risk_of_leaving?: StringNullableWithAggregatesFilter<"TalentProfile"> | string | null
    impact_of_leaving?: StringNullableWithAggregatesFilter<"TalentProfile"> | string | null
    career_aspiration?: StringNullableWithAggregatesFilter<"TalentProfile"> | string | null
    mobility?: StringNullableWithAggregatesFilter<"TalentProfile"> | string | null
    key_strengths?: JsonNullableWithAggregatesFilter<"TalentProfile">
    development_areas?: JsonNullableWithAggregatesFilter<"TalentProfile">
    last_calibration?: DateTimeNullableWithAggregatesFilter<"TalentProfile"> | Date | string | null
    created_at?: DateTimeWithAggregatesFilter<"TalentProfile"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"TalentProfile"> | Date | string
  }

  export type SuccessionPlanWhereInput = {
    AND?: SuccessionPlanWhereInput | SuccessionPlanWhereInput[]
    OR?: SuccessionPlanWhereInput[]
    NOT?: SuccessionPlanWhereInput | SuccessionPlanWhereInput[]
    id?: StringFilter<"SuccessionPlan"> | string
    position_id?: StringFilter<"SuccessionPlan"> | string
    position_title?: StringFilter<"SuccessionPlan"> | string
    department?: StringNullableFilter<"SuccessionPlan"> | string | null
    incumbent_id?: StringNullableFilter<"SuccessionPlan"> | string | null
    criticality?: StringFilter<"SuccessionPlan"> | string
    status?: StringFilter<"SuccessionPlan"> | string
    created_at?: DateTimeFilter<"SuccessionPlan"> | Date | string
    updated_at?: DateTimeFilter<"SuccessionPlan"> | Date | string
    successors?: SuccessorListRelationFilter
  }

  export type SuccessionPlanOrderByWithRelationInput = {
    id?: SortOrder
    position_id?: SortOrder
    position_title?: SortOrder
    department?: SortOrderInput | SortOrder
    incumbent_id?: SortOrderInput | SortOrder
    criticality?: SortOrder
    status?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    successors?: SuccessorOrderByRelationAggregateInput
  }

  export type SuccessionPlanWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: SuccessionPlanWhereInput | SuccessionPlanWhereInput[]
    OR?: SuccessionPlanWhereInput[]
    NOT?: SuccessionPlanWhereInput | SuccessionPlanWhereInput[]
    position_id?: StringFilter<"SuccessionPlan"> | string
    position_title?: StringFilter<"SuccessionPlan"> | string
    department?: StringNullableFilter<"SuccessionPlan"> | string | null
    incumbent_id?: StringNullableFilter<"SuccessionPlan"> | string | null
    criticality?: StringFilter<"SuccessionPlan"> | string
    status?: StringFilter<"SuccessionPlan"> | string
    created_at?: DateTimeFilter<"SuccessionPlan"> | Date | string
    updated_at?: DateTimeFilter<"SuccessionPlan"> | Date | string
    successors?: SuccessorListRelationFilter
  }, "id">

  export type SuccessionPlanOrderByWithAggregationInput = {
    id?: SortOrder
    position_id?: SortOrder
    position_title?: SortOrder
    department?: SortOrderInput | SortOrder
    incumbent_id?: SortOrderInput | SortOrder
    criticality?: SortOrder
    status?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: SuccessionPlanCountOrderByAggregateInput
    _max?: SuccessionPlanMaxOrderByAggregateInput
    _min?: SuccessionPlanMinOrderByAggregateInput
  }

  export type SuccessionPlanScalarWhereWithAggregatesInput = {
    AND?: SuccessionPlanScalarWhereWithAggregatesInput | SuccessionPlanScalarWhereWithAggregatesInput[]
    OR?: SuccessionPlanScalarWhereWithAggregatesInput[]
    NOT?: SuccessionPlanScalarWhereWithAggregatesInput | SuccessionPlanScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"SuccessionPlan"> | string
    position_id?: StringWithAggregatesFilter<"SuccessionPlan"> | string
    position_title?: StringWithAggregatesFilter<"SuccessionPlan"> | string
    department?: StringNullableWithAggregatesFilter<"SuccessionPlan"> | string | null
    incumbent_id?: StringNullableWithAggregatesFilter<"SuccessionPlan"> | string | null
    criticality?: StringWithAggregatesFilter<"SuccessionPlan"> | string
    status?: StringWithAggregatesFilter<"SuccessionPlan"> | string
    created_at?: DateTimeWithAggregatesFilter<"SuccessionPlan"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"SuccessionPlan"> | Date | string
  }

  export type SuccessorWhereInput = {
    AND?: SuccessorWhereInput | SuccessorWhereInput[]
    OR?: SuccessorWhereInput[]
    NOT?: SuccessorWhereInput | SuccessorWhereInput[]
    id?: StringFilter<"Successor"> | string
    succession_plan_id?: StringFilter<"Successor"> | string
    employee_id?: StringFilter<"Successor"> | string
    readiness?: StringFilter<"Successor"> | string
    development_gaps?: JsonNullableFilter<"Successor">
    development_actions?: JsonNullableFilter<"Successor">
    succession_plan?: XOR<SuccessionPlanScalarRelationFilter, SuccessionPlanWhereInput>
  }

  export type SuccessorOrderByWithRelationInput = {
    id?: SortOrder
    succession_plan_id?: SortOrder
    employee_id?: SortOrder
    readiness?: SortOrder
    development_gaps?: SortOrderInput | SortOrder
    development_actions?: SortOrderInput | SortOrder
    succession_plan?: SuccessionPlanOrderByWithRelationInput
  }

  export type SuccessorWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: SuccessorWhereInput | SuccessorWhereInput[]
    OR?: SuccessorWhereInput[]
    NOT?: SuccessorWhereInput | SuccessorWhereInput[]
    succession_plan_id?: StringFilter<"Successor"> | string
    employee_id?: StringFilter<"Successor"> | string
    readiness?: StringFilter<"Successor"> | string
    development_gaps?: JsonNullableFilter<"Successor">
    development_actions?: JsonNullableFilter<"Successor">
    succession_plan?: XOR<SuccessionPlanScalarRelationFilter, SuccessionPlanWhereInput>
  }, "id">

  export type SuccessorOrderByWithAggregationInput = {
    id?: SortOrder
    succession_plan_id?: SortOrder
    employee_id?: SortOrder
    readiness?: SortOrder
    development_gaps?: SortOrderInput | SortOrder
    development_actions?: SortOrderInput | SortOrder
    _count?: SuccessorCountOrderByAggregateInput
    _max?: SuccessorMaxOrderByAggregateInput
    _min?: SuccessorMinOrderByAggregateInput
  }

  export type SuccessorScalarWhereWithAggregatesInput = {
    AND?: SuccessorScalarWhereWithAggregatesInput | SuccessorScalarWhereWithAggregatesInput[]
    OR?: SuccessorScalarWhereWithAggregatesInput[]
    NOT?: SuccessorScalarWhereWithAggregatesInput | SuccessorScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Successor"> | string
    succession_plan_id?: StringWithAggregatesFilter<"Successor"> | string
    employee_id?: StringWithAggregatesFilter<"Successor"> | string
    readiness?: StringWithAggregatesFilter<"Successor"> | string
    development_gaps?: JsonNullableWithAggregatesFilter<"Successor">
    development_actions?: JsonNullableWithAggregatesFilter<"Successor">
  }

  export type IDPPlanWhereInput = {
    AND?: IDPPlanWhereInput | IDPPlanWhereInput[]
    OR?: IDPPlanWhereInput[]
    NOT?: IDPPlanWhereInput | IDPPlanWhereInput[]
    id?: StringFilter<"IDPPlan"> | string
    employee_id?: StringFilter<"IDPPlan"> | string
    title?: StringFilter<"IDPPlan"> | string
    status?: StringFilter<"IDPPlan"> | string
    period?: StringFilter<"IDPPlan"> | string
    development_areas?: JsonNullableFilter<"IDPPlan">
    action_items?: JsonNullableFilter<"IDPPlan">
    milestones?: JsonNullableFilter<"IDPPlan">
    mentor_id?: StringNullableFilter<"IDPPlan"> | string | null
    approved_by?: StringNullableFilter<"IDPPlan"> | string | null
    approved_at?: DateTimeNullableFilter<"IDPPlan"> | Date | string | null
    signed_by_employee?: BoolFilter<"IDPPlan"> | boolean
    signed_by_manager?: BoolFilter<"IDPPlan"> | boolean
    created_at?: DateTimeFilter<"IDPPlan"> | Date | string
    updated_at?: DateTimeFilter<"IDPPlan"> | Date | string
  }

  export type IDPPlanOrderByWithRelationInput = {
    id?: SortOrder
    employee_id?: SortOrder
    title?: SortOrder
    status?: SortOrder
    period?: SortOrder
    development_areas?: SortOrderInput | SortOrder
    action_items?: SortOrderInput | SortOrder
    milestones?: SortOrderInput | SortOrder
    mentor_id?: SortOrderInput | SortOrder
    approved_by?: SortOrderInput | SortOrder
    approved_at?: SortOrderInput | SortOrder
    signed_by_employee?: SortOrder
    signed_by_manager?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type IDPPlanWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: IDPPlanWhereInput | IDPPlanWhereInput[]
    OR?: IDPPlanWhereInput[]
    NOT?: IDPPlanWhereInput | IDPPlanWhereInput[]
    employee_id?: StringFilter<"IDPPlan"> | string
    title?: StringFilter<"IDPPlan"> | string
    status?: StringFilter<"IDPPlan"> | string
    period?: StringFilter<"IDPPlan"> | string
    development_areas?: JsonNullableFilter<"IDPPlan">
    action_items?: JsonNullableFilter<"IDPPlan">
    milestones?: JsonNullableFilter<"IDPPlan">
    mentor_id?: StringNullableFilter<"IDPPlan"> | string | null
    approved_by?: StringNullableFilter<"IDPPlan"> | string | null
    approved_at?: DateTimeNullableFilter<"IDPPlan"> | Date | string | null
    signed_by_employee?: BoolFilter<"IDPPlan"> | boolean
    signed_by_manager?: BoolFilter<"IDPPlan"> | boolean
    created_at?: DateTimeFilter<"IDPPlan"> | Date | string
    updated_at?: DateTimeFilter<"IDPPlan"> | Date | string
  }, "id">

  export type IDPPlanOrderByWithAggregationInput = {
    id?: SortOrder
    employee_id?: SortOrder
    title?: SortOrder
    status?: SortOrder
    period?: SortOrder
    development_areas?: SortOrderInput | SortOrder
    action_items?: SortOrderInput | SortOrder
    milestones?: SortOrderInput | SortOrder
    mentor_id?: SortOrderInput | SortOrder
    approved_by?: SortOrderInput | SortOrder
    approved_at?: SortOrderInput | SortOrder
    signed_by_employee?: SortOrder
    signed_by_manager?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: IDPPlanCountOrderByAggregateInput
    _max?: IDPPlanMaxOrderByAggregateInput
    _min?: IDPPlanMinOrderByAggregateInput
  }

  export type IDPPlanScalarWhereWithAggregatesInput = {
    AND?: IDPPlanScalarWhereWithAggregatesInput | IDPPlanScalarWhereWithAggregatesInput[]
    OR?: IDPPlanScalarWhereWithAggregatesInput[]
    NOT?: IDPPlanScalarWhereWithAggregatesInput | IDPPlanScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"IDPPlan"> | string
    employee_id?: StringWithAggregatesFilter<"IDPPlan"> | string
    title?: StringWithAggregatesFilter<"IDPPlan"> | string
    status?: StringWithAggregatesFilter<"IDPPlan"> | string
    period?: StringWithAggregatesFilter<"IDPPlan"> | string
    development_areas?: JsonNullableWithAggregatesFilter<"IDPPlan">
    action_items?: JsonNullableWithAggregatesFilter<"IDPPlan">
    milestones?: JsonNullableWithAggregatesFilter<"IDPPlan">
    mentor_id?: StringNullableWithAggregatesFilter<"IDPPlan"> | string | null
    approved_by?: StringNullableWithAggregatesFilter<"IDPPlan"> | string | null
    approved_at?: DateTimeNullableWithAggregatesFilter<"IDPPlan"> | Date | string | null
    signed_by_employee?: BoolWithAggregatesFilter<"IDPPlan"> | boolean
    signed_by_manager?: BoolWithAggregatesFilter<"IDPPlan"> | boolean
    created_at?: DateTimeWithAggregatesFilter<"IDPPlan"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"IDPPlan"> | Date | string
  }

  export type GoalCreateInput = {
    id?: string
    employee_id: string
    title: string
    description?: string | null
    category: string
    weight?: number
    target_value?: number | null
    actual_value?: number | null
    unit?: string | null
    status?: string
    progress?: number
    start_date?: Date | string | null
    due_date?: Date | string | null
    completed_at?: Date | string | null
    period: string
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type GoalUncheckedCreateInput = {
    id?: string
    employee_id: string
    title: string
    description?: string | null
    category: string
    weight?: number
    target_value?: number | null
    actual_value?: number | null
    unit?: string | null
    status?: string
    progress?: number
    start_date?: Date | string | null
    due_date?: Date | string | null
    completed_at?: Date | string | null
    period: string
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type GoalUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    employee_id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    category?: StringFieldUpdateOperationsInput | string
    weight?: IntFieldUpdateOperationsInput | number
    target_value?: NullableFloatFieldUpdateOperationsInput | number | null
    actual_value?: NullableFloatFieldUpdateOperationsInput | number | null
    unit?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    progress?: IntFieldUpdateOperationsInput | number
    start_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    due_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completed_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    period?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GoalUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    employee_id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    category?: StringFieldUpdateOperationsInput | string
    weight?: IntFieldUpdateOperationsInput | number
    target_value?: NullableFloatFieldUpdateOperationsInput | number | null
    actual_value?: NullableFloatFieldUpdateOperationsInput | number | null
    unit?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    progress?: IntFieldUpdateOperationsInput | number
    start_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    due_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completed_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    period?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GoalCreateManyInput = {
    id?: string
    employee_id: string
    title: string
    description?: string | null
    category: string
    weight?: number
    target_value?: number | null
    actual_value?: number | null
    unit?: string | null
    status?: string
    progress?: number
    start_date?: Date | string | null
    due_date?: Date | string | null
    completed_at?: Date | string | null
    period: string
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type GoalUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    employee_id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    category?: StringFieldUpdateOperationsInput | string
    weight?: IntFieldUpdateOperationsInput | number
    target_value?: NullableFloatFieldUpdateOperationsInput | number | null
    actual_value?: NullableFloatFieldUpdateOperationsInput | number | null
    unit?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    progress?: IntFieldUpdateOperationsInput | number
    start_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    due_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completed_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    period?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GoalUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    employee_id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    category?: StringFieldUpdateOperationsInput | string
    weight?: IntFieldUpdateOperationsInput | number
    target_value?: NullableFloatFieldUpdateOperationsInput | number | null
    actual_value?: NullableFloatFieldUpdateOperationsInput | number | null
    unit?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    progress?: IntFieldUpdateOperationsInput | number
    start_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    due_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completed_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    period?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EvaluationCreateInput = {
    id?: string
    employee_id: string
    evaluator_id: string
    period: string
    type: string
    status?: string
    self_rating?: number | null
    manager_rating?: number | null
    final_rating?: number | null
    self_comments?: string | null
    manager_comments?: string | null
    strengths?: string | null
    improvements?: string | null
    submitted_at?: Date | string | null
    completed_at?: Date | string | null
    created_at?: Date | string
    updated_at?: Date | string
    scores?: EvaluationScoreCreateNestedManyWithoutEvaluationInput
  }

  export type EvaluationUncheckedCreateInput = {
    id?: string
    employee_id: string
    evaluator_id: string
    period: string
    type: string
    status?: string
    self_rating?: number | null
    manager_rating?: number | null
    final_rating?: number | null
    self_comments?: string | null
    manager_comments?: string | null
    strengths?: string | null
    improvements?: string | null
    submitted_at?: Date | string | null
    completed_at?: Date | string | null
    created_at?: Date | string
    updated_at?: Date | string
    scores?: EvaluationScoreUncheckedCreateNestedManyWithoutEvaluationInput
  }

  export type EvaluationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    employee_id?: StringFieldUpdateOperationsInput | string
    evaluator_id?: StringFieldUpdateOperationsInput | string
    period?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    self_rating?: NullableFloatFieldUpdateOperationsInput | number | null
    manager_rating?: NullableFloatFieldUpdateOperationsInput | number | null
    final_rating?: NullableFloatFieldUpdateOperationsInput | number | null
    self_comments?: NullableStringFieldUpdateOperationsInput | string | null
    manager_comments?: NullableStringFieldUpdateOperationsInput | string | null
    strengths?: NullableStringFieldUpdateOperationsInput | string | null
    improvements?: NullableStringFieldUpdateOperationsInput | string | null
    submitted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completed_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    scores?: EvaluationScoreUpdateManyWithoutEvaluationNestedInput
  }

  export type EvaluationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    employee_id?: StringFieldUpdateOperationsInput | string
    evaluator_id?: StringFieldUpdateOperationsInput | string
    period?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    self_rating?: NullableFloatFieldUpdateOperationsInput | number | null
    manager_rating?: NullableFloatFieldUpdateOperationsInput | number | null
    final_rating?: NullableFloatFieldUpdateOperationsInput | number | null
    self_comments?: NullableStringFieldUpdateOperationsInput | string | null
    manager_comments?: NullableStringFieldUpdateOperationsInput | string | null
    strengths?: NullableStringFieldUpdateOperationsInput | string | null
    improvements?: NullableStringFieldUpdateOperationsInput | string | null
    submitted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completed_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    scores?: EvaluationScoreUncheckedUpdateManyWithoutEvaluationNestedInput
  }

  export type EvaluationCreateManyInput = {
    id?: string
    employee_id: string
    evaluator_id: string
    period: string
    type: string
    status?: string
    self_rating?: number | null
    manager_rating?: number | null
    final_rating?: number | null
    self_comments?: string | null
    manager_comments?: string | null
    strengths?: string | null
    improvements?: string | null
    submitted_at?: Date | string | null
    completed_at?: Date | string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type EvaluationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    employee_id?: StringFieldUpdateOperationsInput | string
    evaluator_id?: StringFieldUpdateOperationsInput | string
    period?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    self_rating?: NullableFloatFieldUpdateOperationsInput | number | null
    manager_rating?: NullableFloatFieldUpdateOperationsInput | number | null
    final_rating?: NullableFloatFieldUpdateOperationsInput | number | null
    self_comments?: NullableStringFieldUpdateOperationsInput | string | null
    manager_comments?: NullableStringFieldUpdateOperationsInput | string | null
    strengths?: NullableStringFieldUpdateOperationsInput | string | null
    improvements?: NullableStringFieldUpdateOperationsInput | string | null
    submitted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completed_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EvaluationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    employee_id?: StringFieldUpdateOperationsInput | string
    evaluator_id?: StringFieldUpdateOperationsInput | string
    period?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    self_rating?: NullableFloatFieldUpdateOperationsInput | number | null
    manager_rating?: NullableFloatFieldUpdateOperationsInput | number | null
    final_rating?: NullableFloatFieldUpdateOperationsInput | number | null
    self_comments?: NullableStringFieldUpdateOperationsInput | string | null
    manager_comments?: NullableStringFieldUpdateOperationsInput | string | null
    strengths?: NullableStringFieldUpdateOperationsInput | string | null
    improvements?: NullableStringFieldUpdateOperationsInput | string | null
    submitted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completed_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EvaluationScoreCreateInput = {
    id?: string
    competency_id: string
    self_score?: number | null
    manager_score?: number | null
    final_score?: number | null
    comments?: string | null
    evaluation: EvaluationCreateNestedOneWithoutScoresInput
  }

  export type EvaluationScoreUncheckedCreateInput = {
    id?: string
    evaluation_id: string
    competency_id: string
    self_score?: number | null
    manager_score?: number | null
    final_score?: number | null
    comments?: string | null
  }

  export type EvaluationScoreUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    competency_id?: StringFieldUpdateOperationsInput | string
    self_score?: NullableFloatFieldUpdateOperationsInput | number | null
    manager_score?: NullableFloatFieldUpdateOperationsInput | number | null
    final_score?: NullableFloatFieldUpdateOperationsInput | number | null
    comments?: NullableStringFieldUpdateOperationsInput | string | null
    evaluation?: EvaluationUpdateOneRequiredWithoutScoresNestedInput
  }

  export type EvaluationScoreUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    evaluation_id?: StringFieldUpdateOperationsInput | string
    competency_id?: StringFieldUpdateOperationsInput | string
    self_score?: NullableFloatFieldUpdateOperationsInput | number | null
    manager_score?: NullableFloatFieldUpdateOperationsInput | number | null
    final_score?: NullableFloatFieldUpdateOperationsInput | number | null
    comments?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type EvaluationScoreCreateManyInput = {
    id?: string
    evaluation_id: string
    competency_id: string
    self_score?: number | null
    manager_score?: number | null
    final_score?: number | null
    comments?: string | null
  }

  export type EvaluationScoreUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    competency_id?: StringFieldUpdateOperationsInput | string
    self_score?: NullableFloatFieldUpdateOperationsInput | number | null
    manager_score?: NullableFloatFieldUpdateOperationsInput | number | null
    final_score?: NullableFloatFieldUpdateOperationsInput | number | null
    comments?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type EvaluationScoreUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    evaluation_id?: StringFieldUpdateOperationsInput | string
    competency_id?: StringFieldUpdateOperationsInput | string
    self_score?: NullableFloatFieldUpdateOperationsInput | number | null
    manager_score?: NullableFloatFieldUpdateOperationsInput | number | null
    final_score?: NullableFloatFieldUpdateOperationsInput | number | null
    comments?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type CompetencyCreateInput = {
    id?: string
    name: string
    category: string
    description?: string | null
    levels?: NullableJsonNullValueInput | InputJsonValue
    is_active?: boolean
    created_at?: Date | string
  }

  export type CompetencyUncheckedCreateInput = {
    id?: string
    name: string
    category: string
    description?: string | null
    levels?: NullableJsonNullValueInput | InputJsonValue
    is_active?: boolean
    created_at?: Date | string
  }

  export type CompetencyUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    levels?: NullableJsonNullValueInput | InputJsonValue
    is_active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CompetencyUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    levels?: NullableJsonNullValueInput | InputJsonValue
    is_active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CompetencyCreateManyInput = {
    id?: string
    name: string
    category: string
    description?: string | null
    levels?: NullableJsonNullValueInput | InputJsonValue
    is_active?: boolean
    created_at?: Date | string
  }

  export type CompetencyUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    levels?: NullableJsonNullValueInput | InputJsonValue
    is_active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CompetencyUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    levels?: NullableJsonNullValueInput | InputJsonValue
    is_active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TalentProfileCreateInput = {
    id?: string
    employee_id: string
    performance_rating?: number | null
    potential_rating?: number | null
    nine_box_position?: string | null
    risk_of_leaving?: string | null
    impact_of_leaving?: string | null
    career_aspiration?: string | null
    mobility?: string | null
    key_strengths?: NullableJsonNullValueInput | InputJsonValue
    development_areas?: NullableJsonNullValueInput | InputJsonValue
    last_calibration?: Date | string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type TalentProfileUncheckedCreateInput = {
    id?: string
    employee_id: string
    performance_rating?: number | null
    potential_rating?: number | null
    nine_box_position?: string | null
    risk_of_leaving?: string | null
    impact_of_leaving?: string | null
    career_aspiration?: string | null
    mobility?: string | null
    key_strengths?: NullableJsonNullValueInput | InputJsonValue
    development_areas?: NullableJsonNullValueInput | InputJsonValue
    last_calibration?: Date | string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type TalentProfileUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    employee_id?: StringFieldUpdateOperationsInput | string
    performance_rating?: NullableFloatFieldUpdateOperationsInput | number | null
    potential_rating?: NullableFloatFieldUpdateOperationsInput | number | null
    nine_box_position?: NullableStringFieldUpdateOperationsInput | string | null
    risk_of_leaving?: NullableStringFieldUpdateOperationsInput | string | null
    impact_of_leaving?: NullableStringFieldUpdateOperationsInput | string | null
    career_aspiration?: NullableStringFieldUpdateOperationsInput | string | null
    mobility?: NullableStringFieldUpdateOperationsInput | string | null
    key_strengths?: NullableJsonNullValueInput | InputJsonValue
    development_areas?: NullableJsonNullValueInput | InputJsonValue
    last_calibration?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TalentProfileUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    employee_id?: StringFieldUpdateOperationsInput | string
    performance_rating?: NullableFloatFieldUpdateOperationsInput | number | null
    potential_rating?: NullableFloatFieldUpdateOperationsInput | number | null
    nine_box_position?: NullableStringFieldUpdateOperationsInput | string | null
    risk_of_leaving?: NullableStringFieldUpdateOperationsInput | string | null
    impact_of_leaving?: NullableStringFieldUpdateOperationsInput | string | null
    career_aspiration?: NullableStringFieldUpdateOperationsInput | string | null
    mobility?: NullableStringFieldUpdateOperationsInput | string | null
    key_strengths?: NullableJsonNullValueInput | InputJsonValue
    development_areas?: NullableJsonNullValueInput | InputJsonValue
    last_calibration?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TalentProfileCreateManyInput = {
    id?: string
    employee_id: string
    performance_rating?: number | null
    potential_rating?: number | null
    nine_box_position?: string | null
    risk_of_leaving?: string | null
    impact_of_leaving?: string | null
    career_aspiration?: string | null
    mobility?: string | null
    key_strengths?: NullableJsonNullValueInput | InputJsonValue
    development_areas?: NullableJsonNullValueInput | InputJsonValue
    last_calibration?: Date | string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type TalentProfileUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    employee_id?: StringFieldUpdateOperationsInput | string
    performance_rating?: NullableFloatFieldUpdateOperationsInput | number | null
    potential_rating?: NullableFloatFieldUpdateOperationsInput | number | null
    nine_box_position?: NullableStringFieldUpdateOperationsInput | string | null
    risk_of_leaving?: NullableStringFieldUpdateOperationsInput | string | null
    impact_of_leaving?: NullableStringFieldUpdateOperationsInput | string | null
    career_aspiration?: NullableStringFieldUpdateOperationsInput | string | null
    mobility?: NullableStringFieldUpdateOperationsInput | string | null
    key_strengths?: NullableJsonNullValueInput | InputJsonValue
    development_areas?: NullableJsonNullValueInput | InputJsonValue
    last_calibration?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TalentProfileUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    employee_id?: StringFieldUpdateOperationsInput | string
    performance_rating?: NullableFloatFieldUpdateOperationsInput | number | null
    potential_rating?: NullableFloatFieldUpdateOperationsInput | number | null
    nine_box_position?: NullableStringFieldUpdateOperationsInput | string | null
    risk_of_leaving?: NullableStringFieldUpdateOperationsInput | string | null
    impact_of_leaving?: NullableStringFieldUpdateOperationsInput | string | null
    career_aspiration?: NullableStringFieldUpdateOperationsInput | string | null
    mobility?: NullableStringFieldUpdateOperationsInput | string | null
    key_strengths?: NullableJsonNullValueInput | InputJsonValue
    development_areas?: NullableJsonNullValueInput | InputJsonValue
    last_calibration?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SuccessionPlanCreateInput = {
    id?: string
    position_id: string
    position_title: string
    department?: string | null
    incumbent_id?: string | null
    criticality?: string
    status?: string
    created_at?: Date | string
    updated_at?: Date | string
    successors?: SuccessorCreateNestedManyWithoutSuccession_planInput
  }

  export type SuccessionPlanUncheckedCreateInput = {
    id?: string
    position_id: string
    position_title: string
    department?: string | null
    incumbent_id?: string | null
    criticality?: string
    status?: string
    created_at?: Date | string
    updated_at?: Date | string
    successors?: SuccessorUncheckedCreateNestedManyWithoutSuccession_planInput
  }

  export type SuccessionPlanUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    position_id?: StringFieldUpdateOperationsInput | string
    position_title?: StringFieldUpdateOperationsInput | string
    department?: NullableStringFieldUpdateOperationsInput | string | null
    incumbent_id?: NullableStringFieldUpdateOperationsInput | string | null
    criticality?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    successors?: SuccessorUpdateManyWithoutSuccession_planNestedInput
  }

  export type SuccessionPlanUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    position_id?: StringFieldUpdateOperationsInput | string
    position_title?: StringFieldUpdateOperationsInput | string
    department?: NullableStringFieldUpdateOperationsInput | string | null
    incumbent_id?: NullableStringFieldUpdateOperationsInput | string | null
    criticality?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    successors?: SuccessorUncheckedUpdateManyWithoutSuccession_planNestedInput
  }

  export type SuccessionPlanCreateManyInput = {
    id?: string
    position_id: string
    position_title: string
    department?: string | null
    incumbent_id?: string | null
    criticality?: string
    status?: string
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type SuccessionPlanUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    position_id?: StringFieldUpdateOperationsInput | string
    position_title?: StringFieldUpdateOperationsInput | string
    department?: NullableStringFieldUpdateOperationsInput | string | null
    incumbent_id?: NullableStringFieldUpdateOperationsInput | string | null
    criticality?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SuccessionPlanUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    position_id?: StringFieldUpdateOperationsInput | string
    position_title?: StringFieldUpdateOperationsInput | string
    department?: NullableStringFieldUpdateOperationsInput | string | null
    incumbent_id?: NullableStringFieldUpdateOperationsInput | string | null
    criticality?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SuccessorCreateInput = {
    id?: string
    employee_id: string
    readiness: string
    development_gaps?: NullableJsonNullValueInput | InputJsonValue
    development_actions?: NullableJsonNullValueInput | InputJsonValue
    succession_plan: SuccessionPlanCreateNestedOneWithoutSuccessorsInput
  }

  export type SuccessorUncheckedCreateInput = {
    id?: string
    succession_plan_id: string
    employee_id: string
    readiness: string
    development_gaps?: NullableJsonNullValueInput | InputJsonValue
    development_actions?: NullableJsonNullValueInput | InputJsonValue
  }

  export type SuccessorUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    employee_id?: StringFieldUpdateOperationsInput | string
    readiness?: StringFieldUpdateOperationsInput | string
    development_gaps?: NullableJsonNullValueInput | InputJsonValue
    development_actions?: NullableJsonNullValueInput | InputJsonValue
    succession_plan?: SuccessionPlanUpdateOneRequiredWithoutSuccessorsNestedInput
  }

  export type SuccessorUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    succession_plan_id?: StringFieldUpdateOperationsInput | string
    employee_id?: StringFieldUpdateOperationsInput | string
    readiness?: StringFieldUpdateOperationsInput | string
    development_gaps?: NullableJsonNullValueInput | InputJsonValue
    development_actions?: NullableJsonNullValueInput | InputJsonValue
  }

  export type SuccessorCreateManyInput = {
    id?: string
    succession_plan_id: string
    employee_id: string
    readiness: string
    development_gaps?: NullableJsonNullValueInput | InputJsonValue
    development_actions?: NullableJsonNullValueInput | InputJsonValue
  }

  export type SuccessorUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    employee_id?: StringFieldUpdateOperationsInput | string
    readiness?: StringFieldUpdateOperationsInput | string
    development_gaps?: NullableJsonNullValueInput | InputJsonValue
    development_actions?: NullableJsonNullValueInput | InputJsonValue
  }

  export type SuccessorUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    succession_plan_id?: StringFieldUpdateOperationsInput | string
    employee_id?: StringFieldUpdateOperationsInput | string
    readiness?: StringFieldUpdateOperationsInput | string
    development_gaps?: NullableJsonNullValueInput | InputJsonValue
    development_actions?: NullableJsonNullValueInput | InputJsonValue
  }

  export type IDPPlanCreateInput = {
    id?: string
    employee_id: string
    title: string
    status?: string
    period: string
    development_areas?: NullableJsonNullValueInput | InputJsonValue
    action_items?: NullableJsonNullValueInput | InputJsonValue
    milestones?: NullableJsonNullValueInput | InputJsonValue
    mentor_id?: string | null
    approved_by?: string | null
    approved_at?: Date | string | null
    signed_by_employee?: boolean
    signed_by_manager?: boolean
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type IDPPlanUncheckedCreateInput = {
    id?: string
    employee_id: string
    title: string
    status?: string
    period: string
    development_areas?: NullableJsonNullValueInput | InputJsonValue
    action_items?: NullableJsonNullValueInput | InputJsonValue
    milestones?: NullableJsonNullValueInput | InputJsonValue
    mentor_id?: string | null
    approved_by?: string | null
    approved_at?: Date | string | null
    signed_by_employee?: boolean
    signed_by_manager?: boolean
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type IDPPlanUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    employee_id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    period?: StringFieldUpdateOperationsInput | string
    development_areas?: NullableJsonNullValueInput | InputJsonValue
    action_items?: NullableJsonNullValueInput | InputJsonValue
    milestones?: NullableJsonNullValueInput | InputJsonValue
    mentor_id?: NullableStringFieldUpdateOperationsInput | string | null
    approved_by?: NullableStringFieldUpdateOperationsInput | string | null
    approved_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    signed_by_employee?: BoolFieldUpdateOperationsInput | boolean
    signed_by_manager?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IDPPlanUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    employee_id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    period?: StringFieldUpdateOperationsInput | string
    development_areas?: NullableJsonNullValueInput | InputJsonValue
    action_items?: NullableJsonNullValueInput | InputJsonValue
    milestones?: NullableJsonNullValueInput | InputJsonValue
    mentor_id?: NullableStringFieldUpdateOperationsInput | string | null
    approved_by?: NullableStringFieldUpdateOperationsInput | string | null
    approved_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    signed_by_employee?: BoolFieldUpdateOperationsInput | boolean
    signed_by_manager?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IDPPlanCreateManyInput = {
    id?: string
    employee_id: string
    title: string
    status?: string
    period: string
    development_areas?: NullableJsonNullValueInput | InputJsonValue
    action_items?: NullableJsonNullValueInput | InputJsonValue
    milestones?: NullableJsonNullValueInput | InputJsonValue
    mentor_id?: string | null
    approved_by?: string | null
    approved_at?: Date | string | null
    signed_by_employee?: boolean
    signed_by_manager?: boolean
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type IDPPlanUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    employee_id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    period?: StringFieldUpdateOperationsInput | string
    development_areas?: NullableJsonNullValueInput | InputJsonValue
    action_items?: NullableJsonNullValueInput | InputJsonValue
    milestones?: NullableJsonNullValueInput | InputJsonValue
    mentor_id?: NullableStringFieldUpdateOperationsInput | string | null
    approved_by?: NullableStringFieldUpdateOperationsInput | string | null
    approved_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    signed_by_employee?: BoolFieldUpdateOperationsInput | boolean
    signed_by_manager?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IDPPlanUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    employee_id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    period?: StringFieldUpdateOperationsInput | string
    development_areas?: NullableJsonNullValueInput | InputJsonValue
    action_items?: NullableJsonNullValueInput | InputJsonValue
    milestones?: NullableJsonNullValueInput | InputJsonValue
    mentor_id?: NullableStringFieldUpdateOperationsInput | string | null
    approved_by?: NullableStringFieldUpdateOperationsInput | string | null
    approved_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    signed_by_employee?: BoolFieldUpdateOperationsInput | boolean
    signed_by_manager?: BoolFieldUpdateOperationsInput | boolean
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

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type GoalCountOrderByAggregateInput = {
    id?: SortOrder
    employee_id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    category?: SortOrder
    weight?: SortOrder
    target_value?: SortOrder
    actual_value?: SortOrder
    unit?: SortOrder
    status?: SortOrder
    progress?: SortOrder
    start_date?: SortOrder
    due_date?: SortOrder
    completed_at?: SortOrder
    period?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type GoalAvgOrderByAggregateInput = {
    weight?: SortOrder
    target_value?: SortOrder
    actual_value?: SortOrder
    progress?: SortOrder
  }

  export type GoalMaxOrderByAggregateInput = {
    id?: SortOrder
    employee_id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    category?: SortOrder
    weight?: SortOrder
    target_value?: SortOrder
    actual_value?: SortOrder
    unit?: SortOrder
    status?: SortOrder
    progress?: SortOrder
    start_date?: SortOrder
    due_date?: SortOrder
    completed_at?: SortOrder
    period?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type GoalMinOrderByAggregateInput = {
    id?: SortOrder
    employee_id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    category?: SortOrder
    weight?: SortOrder
    target_value?: SortOrder
    actual_value?: SortOrder
    unit?: SortOrder
    status?: SortOrder
    progress?: SortOrder
    start_date?: SortOrder
    due_date?: SortOrder
    completed_at?: SortOrder
    period?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type GoalSumOrderByAggregateInput = {
    weight?: SortOrder
    target_value?: SortOrder
    actual_value?: SortOrder
    progress?: SortOrder
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

  export type EvaluationScoreListRelationFilter = {
    every?: EvaluationScoreWhereInput
    some?: EvaluationScoreWhereInput
    none?: EvaluationScoreWhereInput
  }

  export type EvaluationScoreOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type EvaluationCountOrderByAggregateInput = {
    id?: SortOrder
    employee_id?: SortOrder
    evaluator_id?: SortOrder
    period?: SortOrder
    type?: SortOrder
    status?: SortOrder
    self_rating?: SortOrder
    manager_rating?: SortOrder
    final_rating?: SortOrder
    self_comments?: SortOrder
    manager_comments?: SortOrder
    strengths?: SortOrder
    improvements?: SortOrder
    submitted_at?: SortOrder
    completed_at?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type EvaluationAvgOrderByAggregateInput = {
    self_rating?: SortOrder
    manager_rating?: SortOrder
    final_rating?: SortOrder
  }

  export type EvaluationMaxOrderByAggregateInput = {
    id?: SortOrder
    employee_id?: SortOrder
    evaluator_id?: SortOrder
    period?: SortOrder
    type?: SortOrder
    status?: SortOrder
    self_rating?: SortOrder
    manager_rating?: SortOrder
    final_rating?: SortOrder
    self_comments?: SortOrder
    manager_comments?: SortOrder
    strengths?: SortOrder
    improvements?: SortOrder
    submitted_at?: SortOrder
    completed_at?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type EvaluationMinOrderByAggregateInput = {
    id?: SortOrder
    employee_id?: SortOrder
    evaluator_id?: SortOrder
    period?: SortOrder
    type?: SortOrder
    status?: SortOrder
    self_rating?: SortOrder
    manager_rating?: SortOrder
    final_rating?: SortOrder
    self_comments?: SortOrder
    manager_comments?: SortOrder
    strengths?: SortOrder
    improvements?: SortOrder
    submitted_at?: SortOrder
    completed_at?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type EvaluationSumOrderByAggregateInput = {
    self_rating?: SortOrder
    manager_rating?: SortOrder
    final_rating?: SortOrder
  }

  export type EvaluationScalarRelationFilter = {
    is?: EvaluationWhereInput
    isNot?: EvaluationWhereInput
  }

  export type EvaluationScoreCountOrderByAggregateInput = {
    id?: SortOrder
    evaluation_id?: SortOrder
    competency_id?: SortOrder
    self_score?: SortOrder
    manager_score?: SortOrder
    final_score?: SortOrder
    comments?: SortOrder
  }

  export type EvaluationScoreAvgOrderByAggregateInput = {
    self_score?: SortOrder
    manager_score?: SortOrder
    final_score?: SortOrder
  }

  export type EvaluationScoreMaxOrderByAggregateInput = {
    id?: SortOrder
    evaluation_id?: SortOrder
    competency_id?: SortOrder
    self_score?: SortOrder
    manager_score?: SortOrder
    final_score?: SortOrder
    comments?: SortOrder
  }

  export type EvaluationScoreMinOrderByAggregateInput = {
    id?: SortOrder
    evaluation_id?: SortOrder
    competency_id?: SortOrder
    self_score?: SortOrder
    manager_score?: SortOrder
    final_score?: SortOrder
    comments?: SortOrder
  }

  export type EvaluationScoreSumOrderByAggregateInput = {
    self_score?: SortOrder
    manager_score?: SortOrder
    final_score?: SortOrder
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

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type CompetencyCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    category?: SortOrder
    description?: SortOrder
    levels?: SortOrder
    is_active?: SortOrder
    created_at?: SortOrder
  }

  export type CompetencyMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    category?: SortOrder
    description?: SortOrder
    is_active?: SortOrder
    created_at?: SortOrder
  }

  export type CompetencyMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    category?: SortOrder
    description?: SortOrder
    is_active?: SortOrder
    created_at?: SortOrder
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

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type TalentProfileCountOrderByAggregateInput = {
    id?: SortOrder
    employee_id?: SortOrder
    performance_rating?: SortOrder
    potential_rating?: SortOrder
    nine_box_position?: SortOrder
    risk_of_leaving?: SortOrder
    impact_of_leaving?: SortOrder
    career_aspiration?: SortOrder
    mobility?: SortOrder
    key_strengths?: SortOrder
    development_areas?: SortOrder
    last_calibration?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type TalentProfileAvgOrderByAggregateInput = {
    performance_rating?: SortOrder
    potential_rating?: SortOrder
  }

  export type TalentProfileMaxOrderByAggregateInput = {
    id?: SortOrder
    employee_id?: SortOrder
    performance_rating?: SortOrder
    potential_rating?: SortOrder
    nine_box_position?: SortOrder
    risk_of_leaving?: SortOrder
    impact_of_leaving?: SortOrder
    career_aspiration?: SortOrder
    mobility?: SortOrder
    last_calibration?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type TalentProfileMinOrderByAggregateInput = {
    id?: SortOrder
    employee_id?: SortOrder
    performance_rating?: SortOrder
    potential_rating?: SortOrder
    nine_box_position?: SortOrder
    risk_of_leaving?: SortOrder
    impact_of_leaving?: SortOrder
    career_aspiration?: SortOrder
    mobility?: SortOrder
    last_calibration?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type TalentProfileSumOrderByAggregateInput = {
    performance_rating?: SortOrder
    potential_rating?: SortOrder
  }

  export type SuccessorListRelationFilter = {
    every?: SuccessorWhereInput
    some?: SuccessorWhereInput
    none?: SuccessorWhereInput
  }

  export type SuccessorOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SuccessionPlanCountOrderByAggregateInput = {
    id?: SortOrder
    position_id?: SortOrder
    position_title?: SortOrder
    department?: SortOrder
    incumbent_id?: SortOrder
    criticality?: SortOrder
    status?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type SuccessionPlanMaxOrderByAggregateInput = {
    id?: SortOrder
    position_id?: SortOrder
    position_title?: SortOrder
    department?: SortOrder
    incumbent_id?: SortOrder
    criticality?: SortOrder
    status?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type SuccessionPlanMinOrderByAggregateInput = {
    id?: SortOrder
    position_id?: SortOrder
    position_title?: SortOrder
    department?: SortOrder
    incumbent_id?: SortOrder
    criticality?: SortOrder
    status?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type SuccessionPlanScalarRelationFilter = {
    is?: SuccessionPlanWhereInput
    isNot?: SuccessionPlanWhereInput
  }

  export type SuccessorCountOrderByAggregateInput = {
    id?: SortOrder
    succession_plan_id?: SortOrder
    employee_id?: SortOrder
    readiness?: SortOrder
    development_gaps?: SortOrder
    development_actions?: SortOrder
  }

  export type SuccessorMaxOrderByAggregateInput = {
    id?: SortOrder
    succession_plan_id?: SortOrder
    employee_id?: SortOrder
    readiness?: SortOrder
  }

  export type SuccessorMinOrderByAggregateInput = {
    id?: SortOrder
    succession_plan_id?: SortOrder
    employee_id?: SortOrder
    readiness?: SortOrder
  }

  export type IDPPlanCountOrderByAggregateInput = {
    id?: SortOrder
    employee_id?: SortOrder
    title?: SortOrder
    status?: SortOrder
    period?: SortOrder
    development_areas?: SortOrder
    action_items?: SortOrder
    milestones?: SortOrder
    mentor_id?: SortOrder
    approved_by?: SortOrder
    approved_at?: SortOrder
    signed_by_employee?: SortOrder
    signed_by_manager?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type IDPPlanMaxOrderByAggregateInput = {
    id?: SortOrder
    employee_id?: SortOrder
    title?: SortOrder
    status?: SortOrder
    period?: SortOrder
    mentor_id?: SortOrder
    approved_by?: SortOrder
    approved_at?: SortOrder
    signed_by_employee?: SortOrder
    signed_by_manager?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type IDPPlanMinOrderByAggregateInput = {
    id?: SortOrder
    employee_id?: SortOrder
    title?: SortOrder
    status?: SortOrder
    period?: SortOrder
    mentor_id?: SortOrder
    approved_by?: SortOrder
    approved_at?: SortOrder
    signed_by_employee?: SortOrder
    signed_by_manager?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
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

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type EvaluationScoreCreateNestedManyWithoutEvaluationInput = {
    create?: XOR<EvaluationScoreCreateWithoutEvaluationInput, EvaluationScoreUncheckedCreateWithoutEvaluationInput> | EvaluationScoreCreateWithoutEvaluationInput[] | EvaluationScoreUncheckedCreateWithoutEvaluationInput[]
    connectOrCreate?: EvaluationScoreCreateOrConnectWithoutEvaluationInput | EvaluationScoreCreateOrConnectWithoutEvaluationInput[]
    createMany?: EvaluationScoreCreateManyEvaluationInputEnvelope
    connect?: EvaluationScoreWhereUniqueInput | EvaluationScoreWhereUniqueInput[]
  }

  export type EvaluationScoreUncheckedCreateNestedManyWithoutEvaluationInput = {
    create?: XOR<EvaluationScoreCreateWithoutEvaluationInput, EvaluationScoreUncheckedCreateWithoutEvaluationInput> | EvaluationScoreCreateWithoutEvaluationInput[] | EvaluationScoreUncheckedCreateWithoutEvaluationInput[]
    connectOrCreate?: EvaluationScoreCreateOrConnectWithoutEvaluationInput | EvaluationScoreCreateOrConnectWithoutEvaluationInput[]
    createMany?: EvaluationScoreCreateManyEvaluationInputEnvelope
    connect?: EvaluationScoreWhereUniqueInput | EvaluationScoreWhereUniqueInput[]
  }

  export type EvaluationScoreUpdateManyWithoutEvaluationNestedInput = {
    create?: XOR<EvaluationScoreCreateWithoutEvaluationInput, EvaluationScoreUncheckedCreateWithoutEvaluationInput> | EvaluationScoreCreateWithoutEvaluationInput[] | EvaluationScoreUncheckedCreateWithoutEvaluationInput[]
    connectOrCreate?: EvaluationScoreCreateOrConnectWithoutEvaluationInput | EvaluationScoreCreateOrConnectWithoutEvaluationInput[]
    upsert?: EvaluationScoreUpsertWithWhereUniqueWithoutEvaluationInput | EvaluationScoreUpsertWithWhereUniqueWithoutEvaluationInput[]
    createMany?: EvaluationScoreCreateManyEvaluationInputEnvelope
    set?: EvaluationScoreWhereUniqueInput | EvaluationScoreWhereUniqueInput[]
    disconnect?: EvaluationScoreWhereUniqueInput | EvaluationScoreWhereUniqueInput[]
    delete?: EvaluationScoreWhereUniqueInput | EvaluationScoreWhereUniqueInput[]
    connect?: EvaluationScoreWhereUniqueInput | EvaluationScoreWhereUniqueInput[]
    update?: EvaluationScoreUpdateWithWhereUniqueWithoutEvaluationInput | EvaluationScoreUpdateWithWhereUniqueWithoutEvaluationInput[]
    updateMany?: EvaluationScoreUpdateManyWithWhereWithoutEvaluationInput | EvaluationScoreUpdateManyWithWhereWithoutEvaluationInput[]
    deleteMany?: EvaluationScoreScalarWhereInput | EvaluationScoreScalarWhereInput[]
  }

  export type EvaluationScoreUncheckedUpdateManyWithoutEvaluationNestedInput = {
    create?: XOR<EvaluationScoreCreateWithoutEvaluationInput, EvaluationScoreUncheckedCreateWithoutEvaluationInput> | EvaluationScoreCreateWithoutEvaluationInput[] | EvaluationScoreUncheckedCreateWithoutEvaluationInput[]
    connectOrCreate?: EvaluationScoreCreateOrConnectWithoutEvaluationInput | EvaluationScoreCreateOrConnectWithoutEvaluationInput[]
    upsert?: EvaluationScoreUpsertWithWhereUniqueWithoutEvaluationInput | EvaluationScoreUpsertWithWhereUniqueWithoutEvaluationInput[]
    createMany?: EvaluationScoreCreateManyEvaluationInputEnvelope
    set?: EvaluationScoreWhereUniqueInput | EvaluationScoreWhereUniqueInput[]
    disconnect?: EvaluationScoreWhereUniqueInput | EvaluationScoreWhereUniqueInput[]
    delete?: EvaluationScoreWhereUniqueInput | EvaluationScoreWhereUniqueInput[]
    connect?: EvaluationScoreWhereUniqueInput | EvaluationScoreWhereUniqueInput[]
    update?: EvaluationScoreUpdateWithWhereUniqueWithoutEvaluationInput | EvaluationScoreUpdateWithWhereUniqueWithoutEvaluationInput[]
    updateMany?: EvaluationScoreUpdateManyWithWhereWithoutEvaluationInput | EvaluationScoreUpdateManyWithWhereWithoutEvaluationInput[]
    deleteMany?: EvaluationScoreScalarWhereInput | EvaluationScoreScalarWhereInput[]
  }

  export type EvaluationCreateNestedOneWithoutScoresInput = {
    create?: XOR<EvaluationCreateWithoutScoresInput, EvaluationUncheckedCreateWithoutScoresInput>
    connectOrCreate?: EvaluationCreateOrConnectWithoutScoresInput
    connect?: EvaluationWhereUniqueInput
  }

  export type EvaluationUpdateOneRequiredWithoutScoresNestedInput = {
    create?: XOR<EvaluationCreateWithoutScoresInput, EvaluationUncheckedCreateWithoutScoresInput>
    connectOrCreate?: EvaluationCreateOrConnectWithoutScoresInput
    upsert?: EvaluationUpsertWithoutScoresInput
    connect?: EvaluationWhereUniqueInput
    update?: XOR<XOR<EvaluationUpdateToOneWithWhereWithoutScoresInput, EvaluationUpdateWithoutScoresInput>, EvaluationUncheckedUpdateWithoutScoresInput>
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type SuccessorCreateNestedManyWithoutSuccession_planInput = {
    create?: XOR<SuccessorCreateWithoutSuccession_planInput, SuccessorUncheckedCreateWithoutSuccession_planInput> | SuccessorCreateWithoutSuccession_planInput[] | SuccessorUncheckedCreateWithoutSuccession_planInput[]
    connectOrCreate?: SuccessorCreateOrConnectWithoutSuccession_planInput | SuccessorCreateOrConnectWithoutSuccession_planInput[]
    createMany?: SuccessorCreateManySuccession_planInputEnvelope
    connect?: SuccessorWhereUniqueInput | SuccessorWhereUniqueInput[]
  }

  export type SuccessorUncheckedCreateNestedManyWithoutSuccession_planInput = {
    create?: XOR<SuccessorCreateWithoutSuccession_planInput, SuccessorUncheckedCreateWithoutSuccession_planInput> | SuccessorCreateWithoutSuccession_planInput[] | SuccessorUncheckedCreateWithoutSuccession_planInput[]
    connectOrCreate?: SuccessorCreateOrConnectWithoutSuccession_planInput | SuccessorCreateOrConnectWithoutSuccession_planInput[]
    createMany?: SuccessorCreateManySuccession_planInputEnvelope
    connect?: SuccessorWhereUniqueInput | SuccessorWhereUniqueInput[]
  }

  export type SuccessorUpdateManyWithoutSuccession_planNestedInput = {
    create?: XOR<SuccessorCreateWithoutSuccession_planInput, SuccessorUncheckedCreateWithoutSuccession_planInput> | SuccessorCreateWithoutSuccession_planInput[] | SuccessorUncheckedCreateWithoutSuccession_planInput[]
    connectOrCreate?: SuccessorCreateOrConnectWithoutSuccession_planInput | SuccessorCreateOrConnectWithoutSuccession_planInput[]
    upsert?: SuccessorUpsertWithWhereUniqueWithoutSuccession_planInput | SuccessorUpsertWithWhereUniqueWithoutSuccession_planInput[]
    createMany?: SuccessorCreateManySuccession_planInputEnvelope
    set?: SuccessorWhereUniqueInput | SuccessorWhereUniqueInput[]
    disconnect?: SuccessorWhereUniqueInput | SuccessorWhereUniqueInput[]
    delete?: SuccessorWhereUniqueInput | SuccessorWhereUniqueInput[]
    connect?: SuccessorWhereUniqueInput | SuccessorWhereUniqueInput[]
    update?: SuccessorUpdateWithWhereUniqueWithoutSuccession_planInput | SuccessorUpdateWithWhereUniqueWithoutSuccession_planInput[]
    updateMany?: SuccessorUpdateManyWithWhereWithoutSuccession_planInput | SuccessorUpdateManyWithWhereWithoutSuccession_planInput[]
    deleteMany?: SuccessorScalarWhereInput | SuccessorScalarWhereInput[]
  }

  export type SuccessorUncheckedUpdateManyWithoutSuccession_planNestedInput = {
    create?: XOR<SuccessorCreateWithoutSuccession_planInput, SuccessorUncheckedCreateWithoutSuccession_planInput> | SuccessorCreateWithoutSuccession_planInput[] | SuccessorUncheckedCreateWithoutSuccession_planInput[]
    connectOrCreate?: SuccessorCreateOrConnectWithoutSuccession_planInput | SuccessorCreateOrConnectWithoutSuccession_planInput[]
    upsert?: SuccessorUpsertWithWhereUniqueWithoutSuccession_planInput | SuccessorUpsertWithWhereUniqueWithoutSuccession_planInput[]
    createMany?: SuccessorCreateManySuccession_planInputEnvelope
    set?: SuccessorWhereUniqueInput | SuccessorWhereUniqueInput[]
    disconnect?: SuccessorWhereUniqueInput | SuccessorWhereUniqueInput[]
    delete?: SuccessorWhereUniqueInput | SuccessorWhereUniqueInput[]
    connect?: SuccessorWhereUniqueInput | SuccessorWhereUniqueInput[]
    update?: SuccessorUpdateWithWhereUniqueWithoutSuccession_planInput | SuccessorUpdateWithWhereUniqueWithoutSuccession_planInput[]
    updateMany?: SuccessorUpdateManyWithWhereWithoutSuccession_planInput | SuccessorUpdateManyWithWhereWithoutSuccession_planInput[]
    deleteMany?: SuccessorScalarWhereInput | SuccessorScalarWhereInput[]
  }

  export type SuccessionPlanCreateNestedOneWithoutSuccessorsInput = {
    create?: XOR<SuccessionPlanCreateWithoutSuccessorsInput, SuccessionPlanUncheckedCreateWithoutSuccessorsInput>
    connectOrCreate?: SuccessionPlanCreateOrConnectWithoutSuccessorsInput
    connect?: SuccessionPlanWhereUniqueInput
  }

  export type SuccessionPlanUpdateOneRequiredWithoutSuccessorsNestedInput = {
    create?: XOR<SuccessionPlanCreateWithoutSuccessorsInput, SuccessionPlanUncheckedCreateWithoutSuccessorsInput>
    connectOrCreate?: SuccessionPlanCreateOrConnectWithoutSuccessorsInput
    upsert?: SuccessionPlanUpsertWithoutSuccessorsInput
    connect?: SuccessionPlanWhereUniqueInput
    update?: XOR<XOR<SuccessionPlanUpdateToOneWithWhereWithoutSuccessorsInput, SuccessionPlanUpdateWithoutSuccessorsInput>, SuccessionPlanUncheckedUpdateWithoutSuccessorsInput>
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

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type EvaluationScoreCreateWithoutEvaluationInput = {
    id?: string
    competency_id: string
    self_score?: number | null
    manager_score?: number | null
    final_score?: number | null
    comments?: string | null
  }

  export type EvaluationScoreUncheckedCreateWithoutEvaluationInput = {
    id?: string
    competency_id: string
    self_score?: number | null
    manager_score?: number | null
    final_score?: number | null
    comments?: string | null
  }

  export type EvaluationScoreCreateOrConnectWithoutEvaluationInput = {
    where: EvaluationScoreWhereUniqueInput
    create: XOR<EvaluationScoreCreateWithoutEvaluationInput, EvaluationScoreUncheckedCreateWithoutEvaluationInput>
  }

  export type EvaluationScoreCreateManyEvaluationInputEnvelope = {
    data: EvaluationScoreCreateManyEvaluationInput | EvaluationScoreCreateManyEvaluationInput[]
    skipDuplicates?: boolean
  }

  export type EvaluationScoreUpsertWithWhereUniqueWithoutEvaluationInput = {
    where: EvaluationScoreWhereUniqueInput
    update: XOR<EvaluationScoreUpdateWithoutEvaluationInput, EvaluationScoreUncheckedUpdateWithoutEvaluationInput>
    create: XOR<EvaluationScoreCreateWithoutEvaluationInput, EvaluationScoreUncheckedCreateWithoutEvaluationInput>
  }

  export type EvaluationScoreUpdateWithWhereUniqueWithoutEvaluationInput = {
    where: EvaluationScoreWhereUniqueInput
    data: XOR<EvaluationScoreUpdateWithoutEvaluationInput, EvaluationScoreUncheckedUpdateWithoutEvaluationInput>
  }

  export type EvaluationScoreUpdateManyWithWhereWithoutEvaluationInput = {
    where: EvaluationScoreScalarWhereInput
    data: XOR<EvaluationScoreUpdateManyMutationInput, EvaluationScoreUncheckedUpdateManyWithoutEvaluationInput>
  }

  export type EvaluationScoreScalarWhereInput = {
    AND?: EvaluationScoreScalarWhereInput | EvaluationScoreScalarWhereInput[]
    OR?: EvaluationScoreScalarWhereInput[]
    NOT?: EvaluationScoreScalarWhereInput | EvaluationScoreScalarWhereInput[]
    id?: StringFilter<"EvaluationScore"> | string
    evaluation_id?: StringFilter<"EvaluationScore"> | string
    competency_id?: StringFilter<"EvaluationScore"> | string
    self_score?: FloatNullableFilter<"EvaluationScore"> | number | null
    manager_score?: FloatNullableFilter<"EvaluationScore"> | number | null
    final_score?: FloatNullableFilter<"EvaluationScore"> | number | null
    comments?: StringNullableFilter<"EvaluationScore"> | string | null
  }

  export type EvaluationCreateWithoutScoresInput = {
    id?: string
    employee_id: string
    evaluator_id: string
    period: string
    type: string
    status?: string
    self_rating?: number | null
    manager_rating?: number | null
    final_rating?: number | null
    self_comments?: string | null
    manager_comments?: string | null
    strengths?: string | null
    improvements?: string | null
    submitted_at?: Date | string | null
    completed_at?: Date | string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type EvaluationUncheckedCreateWithoutScoresInput = {
    id?: string
    employee_id: string
    evaluator_id: string
    period: string
    type: string
    status?: string
    self_rating?: number | null
    manager_rating?: number | null
    final_rating?: number | null
    self_comments?: string | null
    manager_comments?: string | null
    strengths?: string | null
    improvements?: string | null
    submitted_at?: Date | string | null
    completed_at?: Date | string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type EvaluationCreateOrConnectWithoutScoresInput = {
    where: EvaluationWhereUniqueInput
    create: XOR<EvaluationCreateWithoutScoresInput, EvaluationUncheckedCreateWithoutScoresInput>
  }

  export type EvaluationUpsertWithoutScoresInput = {
    update: XOR<EvaluationUpdateWithoutScoresInput, EvaluationUncheckedUpdateWithoutScoresInput>
    create: XOR<EvaluationCreateWithoutScoresInput, EvaluationUncheckedCreateWithoutScoresInput>
    where?: EvaluationWhereInput
  }

  export type EvaluationUpdateToOneWithWhereWithoutScoresInput = {
    where?: EvaluationWhereInput
    data: XOR<EvaluationUpdateWithoutScoresInput, EvaluationUncheckedUpdateWithoutScoresInput>
  }

  export type EvaluationUpdateWithoutScoresInput = {
    id?: StringFieldUpdateOperationsInput | string
    employee_id?: StringFieldUpdateOperationsInput | string
    evaluator_id?: StringFieldUpdateOperationsInput | string
    period?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    self_rating?: NullableFloatFieldUpdateOperationsInput | number | null
    manager_rating?: NullableFloatFieldUpdateOperationsInput | number | null
    final_rating?: NullableFloatFieldUpdateOperationsInput | number | null
    self_comments?: NullableStringFieldUpdateOperationsInput | string | null
    manager_comments?: NullableStringFieldUpdateOperationsInput | string | null
    strengths?: NullableStringFieldUpdateOperationsInput | string | null
    improvements?: NullableStringFieldUpdateOperationsInput | string | null
    submitted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completed_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EvaluationUncheckedUpdateWithoutScoresInput = {
    id?: StringFieldUpdateOperationsInput | string
    employee_id?: StringFieldUpdateOperationsInput | string
    evaluator_id?: StringFieldUpdateOperationsInput | string
    period?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    self_rating?: NullableFloatFieldUpdateOperationsInput | number | null
    manager_rating?: NullableFloatFieldUpdateOperationsInput | number | null
    final_rating?: NullableFloatFieldUpdateOperationsInput | number | null
    self_comments?: NullableStringFieldUpdateOperationsInput | string | null
    manager_comments?: NullableStringFieldUpdateOperationsInput | string | null
    strengths?: NullableStringFieldUpdateOperationsInput | string | null
    improvements?: NullableStringFieldUpdateOperationsInput | string | null
    submitted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completed_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SuccessorCreateWithoutSuccession_planInput = {
    id?: string
    employee_id: string
    readiness: string
    development_gaps?: NullableJsonNullValueInput | InputJsonValue
    development_actions?: NullableJsonNullValueInput | InputJsonValue
  }

  export type SuccessorUncheckedCreateWithoutSuccession_planInput = {
    id?: string
    employee_id: string
    readiness: string
    development_gaps?: NullableJsonNullValueInput | InputJsonValue
    development_actions?: NullableJsonNullValueInput | InputJsonValue
  }

  export type SuccessorCreateOrConnectWithoutSuccession_planInput = {
    where: SuccessorWhereUniqueInput
    create: XOR<SuccessorCreateWithoutSuccession_planInput, SuccessorUncheckedCreateWithoutSuccession_planInput>
  }

  export type SuccessorCreateManySuccession_planInputEnvelope = {
    data: SuccessorCreateManySuccession_planInput | SuccessorCreateManySuccession_planInput[]
    skipDuplicates?: boolean
  }

  export type SuccessorUpsertWithWhereUniqueWithoutSuccession_planInput = {
    where: SuccessorWhereUniqueInput
    update: XOR<SuccessorUpdateWithoutSuccession_planInput, SuccessorUncheckedUpdateWithoutSuccession_planInput>
    create: XOR<SuccessorCreateWithoutSuccession_planInput, SuccessorUncheckedCreateWithoutSuccession_planInput>
  }

  export type SuccessorUpdateWithWhereUniqueWithoutSuccession_planInput = {
    where: SuccessorWhereUniqueInput
    data: XOR<SuccessorUpdateWithoutSuccession_planInput, SuccessorUncheckedUpdateWithoutSuccession_planInput>
  }

  export type SuccessorUpdateManyWithWhereWithoutSuccession_planInput = {
    where: SuccessorScalarWhereInput
    data: XOR<SuccessorUpdateManyMutationInput, SuccessorUncheckedUpdateManyWithoutSuccession_planInput>
  }

  export type SuccessorScalarWhereInput = {
    AND?: SuccessorScalarWhereInput | SuccessorScalarWhereInput[]
    OR?: SuccessorScalarWhereInput[]
    NOT?: SuccessorScalarWhereInput | SuccessorScalarWhereInput[]
    id?: StringFilter<"Successor"> | string
    succession_plan_id?: StringFilter<"Successor"> | string
    employee_id?: StringFilter<"Successor"> | string
    readiness?: StringFilter<"Successor"> | string
    development_gaps?: JsonNullableFilter<"Successor">
    development_actions?: JsonNullableFilter<"Successor">
  }

  export type SuccessionPlanCreateWithoutSuccessorsInput = {
    id?: string
    position_id: string
    position_title: string
    department?: string | null
    incumbent_id?: string | null
    criticality?: string
    status?: string
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type SuccessionPlanUncheckedCreateWithoutSuccessorsInput = {
    id?: string
    position_id: string
    position_title: string
    department?: string | null
    incumbent_id?: string | null
    criticality?: string
    status?: string
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type SuccessionPlanCreateOrConnectWithoutSuccessorsInput = {
    where: SuccessionPlanWhereUniqueInput
    create: XOR<SuccessionPlanCreateWithoutSuccessorsInput, SuccessionPlanUncheckedCreateWithoutSuccessorsInput>
  }

  export type SuccessionPlanUpsertWithoutSuccessorsInput = {
    update: XOR<SuccessionPlanUpdateWithoutSuccessorsInput, SuccessionPlanUncheckedUpdateWithoutSuccessorsInput>
    create: XOR<SuccessionPlanCreateWithoutSuccessorsInput, SuccessionPlanUncheckedCreateWithoutSuccessorsInput>
    where?: SuccessionPlanWhereInput
  }

  export type SuccessionPlanUpdateToOneWithWhereWithoutSuccessorsInput = {
    where?: SuccessionPlanWhereInput
    data: XOR<SuccessionPlanUpdateWithoutSuccessorsInput, SuccessionPlanUncheckedUpdateWithoutSuccessorsInput>
  }

  export type SuccessionPlanUpdateWithoutSuccessorsInput = {
    id?: StringFieldUpdateOperationsInput | string
    position_id?: StringFieldUpdateOperationsInput | string
    position_title?: StringFieldUpdateOperationsInput | string
    department?: NullableStringFieldUpdateOperationsInput | string | null
    incumbent_id?: NullableStringFieldUpdateOperationsInput | string | null
    criticality?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SuccessionPlanUncheckedUpdateWithoutSuccessorsInput = {
    id?: StringFieldUpdateOperationsInput | string
    position_id?: StringFieldUpdateOperationsInput | string
    position_title?: StringFieldUpdateOperationsInput | string
    department?: NullableStringFieldUpdateOperationsInput | string | null
    incumbent_id?: NullableStringFieldUpdateOperationsInput | string | null
    criticality?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EvaluationScoreCreateManyEvaluationInput = {
    id?: string
    competency_id: string
    self_score?: number | null
    manager_score?: number | null
    final_score?: number | null
    comments?: string | null
  }

  export type EvaluationScoreUpdateWithoutEvaluationInput = {
    id?: StringFieldUpdateOperationsInput | string
    competency_id?: StringFieldUpdateOperationsInput | string
    self_score?: NullableFloatFieldUpdateOperationsInput | number | null
    manager_score?: NullableFloatFieldUpdateOperationsInput | number | null
    final_score?: NullableFloatFieldUpdateOperationsInput | number | null
    comments?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type EvaluationScoreUncheckedUpdateWithoutEvaluationInput = {
    id?: StringFieldUpdateOperationsInput | string
    competency_id?: StringFieldUpdateOperationsInput | string
    self_score?: NullableFloatFieldUpdateOperationsInput | number | null
    manager_score?: NullableFloatFieldUpdateOperationsInput | number | null
    final_score?: NullableFloatFieldUpdateOperationsInput | number | null
    comments?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type EvaluationScoreUncheckedUpdateManyWithoutEvaluationInput = {
    id?: StringFieldUpdateOperationsInput | string
    competency_id?: StringFieldUpdateOperationsInput | string
    self_score?: NullableFloatFieldUpdateOperationsInput | number | null
    manager_score?: NullableFloatFieldUpdateOperationsInput | number | null
    final_score?: NullableFloatFieldUpdateOperationsInput | number | null
    comments?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type SuccessorCreateManySuccession_planInput = {
    id?: string
    employee_id: string
    readiness: string
    development_gaps?: NullableJsonNullValueInput | InputJsonValue
    development_actions?: NullableJsonNullValueInput | InputJsonValue
  }

  export type SuccessorUpdateWithoutSuccession_planInput = {
    id?: StringFieldUpdateOperationsInput | string
    employee_id?: StringFieldUpdateOperationsInput | string
    readiness?: StringFieldUpdateOperationsInput | string
    development_gaps?: NullableJsonNullValueInput | InputJsonValue
    development_actions?: NullableJsonNullValueInput | InputJsonValue
  }

  export type SuccessorUncheckedUpdateWithoutSuccession_planInput = {
    id?: StringFieldUpdateOperationsInput | string
    employee_id?: StringFieldUpdateOperationsInput | string
    readiness?: StringFieldUpdateOperationsInput | string
    development_gaps?: NullableJsonNullValueInput | InputJsonValue
    development_actions?: NullableJsonNullValueInput | InputJsonValue
  }

  export type SuccessorUncheckedUpdateManyWithoutSuccession_planInput = {
    id?: StringFieldUpdateOperationsInput | string
    employee_id?: StringFieldUpdateOperationsInput | string
    readiness?: StringFieldUpdateOperationsInput | string
    development_gaps?: NullableJsonNullValueInput | InputJsonValue
    development_actions?: NullableJsonNullValueInput | InputJsonValue
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