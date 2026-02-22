
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
 * Model Course
 * 
 */
export type Course = $Result.DefaultSelection<Prisma.$CoursePayload>
/**
 * Model Enrollment
 * 
 */
export type Enrollment = $Result.DefaultSelection<Prisma.$EnrollmentPayload>
/**
 * Model TrainingRecord
 * 
 */
export type TrainingRecord = $Result.DefaultSelection<Prisma.$TrainingRecordPayload>
/**
 * Model KirkpatrickEvaluation
 * 
 */
export type KirkpatrickEvaluation = $Result.DefaultSelection<Prisma.$KirkpatrickEvaluationPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Courses
 * const courses = await prisma.course.findMany()
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
   * // Fetch zero or more Courses
   * const courses = await prisma.course.findMany()
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
   * `prisma.course`: Exposes CRUD operations for the **Course** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Courses
    * const courses = await prisma.course.findMany()
    * ```
    */
  get course(): Prisma.CourseDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.enrollment`: Exposes CRUD operations for the **Enrollment** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Enrollments
    * const enrollments = await prisma.enrollment.findMany()
    * ```
    */
  get enrollment(): Prisma.EnrollmentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.trainingRecord`: Exposes CRUD operations for the **TrainingRecord** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TrainingRecords
    * const trainingRecords = await prisma.trainingRecord.findMany()
    * ```
    */
  get trainingRecord(): Prisma.TrainingRecordDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.kirkpatrickEvaluation`: Exposes CRUD operations for the **KirkpatrickEvaluation** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more KirkpatrickEvaluations
    * const kirkpatrickEvaluations = await prisma.kirkpatrickEvaluation.findMany()
    * ```
    */
  get kirkpatrickEvaluation(): Prisma.KirkpatrickEvaluationDelegate<ExtArgs, ClientOptions>;
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
    Course: 'Course',
    Enrollment: 'Enrollment',
    TrainingRecord: 'TrainingRecord',
    KirkpatrickEvaluation: 'KirkpatrickEvaluation'
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
      modelProps: "course" | "enrollment" | "trainingRecord" | "kirkpatrickEvaluation"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Course: {
        payload: Prisma.$CoursePayload<ExtArgs>
        fields: Prisma.CourseFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CourseFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoursePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CourseFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoursePayload>
          }
          findFirst: {
            args: Prisma.CourseFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoursePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CourseFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoursePayload>
          }
          findMany: {
            args: Prisma.CourseFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoursePayload>[]
          }
          create: {
            args: Prisma.CourseCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoursePayload>
          }
          createMany: {
            args: Prisma.CourseCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CourseCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoursePayload>[]
          }
          delete: {
            args: Prisma.CourseDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoursePayload>
          }
          update: {
            args: Prisma.CourseUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoursePayload>
          }
          deleteMany: {
            args: Prisma.CourseDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CourseUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CourseUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoursePayload>[]
          }
          upsert: {
            args: Prisma.CourseUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoursePayload>
          }
          aggregate: {
            args: Prisma.CourseAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCourse>
          }
          groupBy: {
            args: Prisma.CourseGroupByArgs<ExtArgs>
            result: $Utils.Optional<CourseGroupByOutputType>[]
          }
          count: {
            args: Prisma.CourseCountArgs<ExtArgs>
            result: $Utils.Optional<CourseCountAggregateOutputType> | number
          }
        }
      }
      Enrollment: {
        payload: Prisma.$EnrollmentPayload<ExtArgs>
        fields: Prisma.EnrollmentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.EnrollmentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EnrollmentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.EnrollmentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EnrollmentPayload>
          }
          findFirst: {
            args: Prisma.EnrollmentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EnrollmentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.EnrollmentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EnrollmentPayload>
          }
          findMany: {
            args: Prisma.EnrollmentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EnrollmentPayload>[]
          }
          create: {
            args: Prisma.EnrollmentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EnrollmentPayload>
          }
          createMany: {
            args: Prisma.EnrollmentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.EnrollmentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EnrollmentPayload>[]
          }
          delete: {
            args: Prisma.EnrollmentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EnrollmentPayload>
          }
          update: {
            args: Prisma.EnrollmentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EnrollmentPayload>
          }
          deleteMany: {
            args: Prisma.EnrollmentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.EnrollmentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.EnrollmentUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EnrollmentPayload>[]
          }
          upsert: {
            args: Prisma.EnrollmentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EnrollmentPayload>
          }
          aggregate: {
            args: Prisma.EnrollmentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateEnrollment>
          }
          groupBy: {
            args: Prisma.EnrollmentGroupByArgs<ExtArgs>
            result: $Utils.Optional<EnrollmentGroupByOutputType>[]
          }
          count: {
            args: Prisma.EnrollmentCountArgs<ExtArgs>
            result: $Utils.Optional<EnrollmentCountAggregateOutputType> | number
          }
        }
      }
      TrainingRecord: {
        payload: Prisma.$TrainingRecordPayload<ExtArgs>
        fields: Prisma.TrainingRecordFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TrainingRecordFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrainingRecordPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TrainingRecordFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrainingRecordPayload>
          }
          findFirst: {
            args: Prisma.TrainingRecordFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrainingRecordPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TrainingRecordFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrainingRecordPayload>
          }
          findMany: {
            args: Prisma.TrainingRecordFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrainingRecordPayload>[]
          }
          create: {
            args: Prisma.TrainingRecordCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrainingRecordPayload>
          }
          createMany: {
            args: Prisma.TrainingRecordCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TrainingRecordCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrainingRecordPayload>[]
          }
          delete: {
            args: Prisma.TrainingRecordDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrainingRecordPayload>
          }
          update: {
            args: Prisma.TrainingRecordUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrainingRecordPayload>
          }
          deleteMany: {
            args: Prisma.TrainingRecordDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TrainingRecordUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TrainingRecordUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrainingRecordPayload>[]
          }
          upsert: {
            args: Prisma.TrainingRecordUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrainingRecordPayload>
          }
          aggregate: {
            args: Prisma.TrainingRecordAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTrainingRecord>
          }
          groupBy: {
            args: Prisma.TrainingRecordGroupByArgs<ExtArgs>
            result: $Utils.Optional<TrainingRecordGroupByOutputType>[]
          }
          count: {
            args: Prisma.TrainingRecordCountArgs<ExtArgs>
            result: $Utils.Optional<TrainingRecordCountAggregateOutputType> | number
          }
        }
      }
      KirkpatrickEvaluation: {
        payload: Prisma.$KirkpatrickEvaluationPayload<ExtArgs>
        fields: Prisma.KirkpatrickEvaluationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.KirkpatrickEvaluationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KirkpatrickEvaluationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.KirkpatrickEvaluationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KirkpatrickEvaluationPayload>
          }
          findFirst: {
            args: Prisma.KirkpatrickEvaluationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KirkpatrickEvaluationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.KirkpatrickEvaluationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KirkpatrickEvaluationPayload>
          }
          findMany: {
            args: Prisma.KirkpatrickEvaluationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KirkpatrickEvaluationPayload>[]
          }
          create: {
            args: Prisma.KirkpatrickEvaluationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KirkpatrickEvaluationPayload>
          }
          createMany: {
            args: Prisma.KirkpatrickEvaluationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.KirkpatrickEvaluationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KirkpatrickEvaluationPayload>[]
          }
          delete: {
            args: Prisma.KirkpatrickEvaluationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KirkpatrickEvaluationPayload>
          }
          update: {
            args: Prisma.KirkpatrickEvaluationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KirkpatrickEvaluationPayload>
          }
          deleteMany: {
            args: Prisma.KirkpatrickEvaluationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.KirkpatrickEvaluationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.KirkpatrickEvaluationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KirkpatrickEvaluationPayload>[]
          }
          upsert: {
            args: Prisma.KirkpatrickEvaluationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KirkpatrickEvaluationPayload>
          }
          aggregate: {
            args: Prisma.KirkpatrickEvaluationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateKirkpatrickEvaluation>
          }
          groupBy: {
            args: Prisma.KirkpatrickEvaluationGroupByArgs<ExtArgs>
            result: $Utils.Optional<KirkpatrickEvaluationGroupByOutputType>[]
          }
          count: {
            args: Prisma.KirkpatrickEvaluationCountArgs<ExtArgs>
            result: $Utils.Optional<KirkpatrickEvaluationCountAggregateOutputType> | number
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
    course?: CourseOmit
    enrollment?: EnrollmentOmit
    trainingRecord?: TrainingRecordOmit
    kirkpatrickEvaluation?: KirkpatrickEvaluationOmit
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
   * Count Type CourseCountOutputType
   */

  export type CourseCountOutputType = {
    enrollments: number
    training_records: number
  }

  export type CourseCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    enrollments?: boolean | CourseCountOutputTypeCountEnrollmentsArgs
    training_records?: boolean | CourseCountOutputTypeCountTraining_recordsArgs
  }

  // Custom InputTypes
  /**
   * CourseCountOutputType without action
   */
  export type CourseCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CourseCountOutputType
     */
    select?: CourseCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CourseCountOutputType without action
   */
  export type CourseCountOutputTypeCountEnrollmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EnrollmentWhereInput
  }

  /**
   * CourseCountOutputType without action
   */
  export type CourseCountOutputTypeCountTraining_recordsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TrainingRecordWhereInput
  }


  /**
   * Count Type TrainingRecordCountOutputType
   */

  export type TrainingRecordCountOutputType = {
    evaluations: number
  }

  export type TrainingRecordCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    evaluations?: boolean | TrainingRecordCountOutputTypeCountEvaluationsArgs
  }

  // Custom InputTypes
  /**
   * TrainingRecordCountOutputType without action
   */
  export type TrainingRecordCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrainingRecordCountOutputType
     */
    select?: TrainingRecordCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * TrainingRecordCountOutputType without action
   */
  export type TrainingRecordCountOutputTypeCountEvaluationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: KirkpatrickEvaluationWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Course
   */

  export type AggregateCourse = {
    _count: CourseCountAggregateOutputType | null
    _avg: CourseAvgAggregateOutputType | null
    _sum: CourseSumAggregateOutputType | null
    _min: CourseMinAggregateOutputType | null
    _max: CourseMaxAggregateOutputType | null
  }

  export type CourseAvgAggregateOutputType = {
    duration_hours: number | null
    credits: number | null
    max_participants: number | null
    rating: number | null
    review_count: number | null
  }

  export type CourseSumAggregateOutputType = {
    duration_hours: number | null
    credits: number | null
    max_participants: number | null
    rating: number | null
    review_count: number | null
  }

  export type CourseMinAggregateOutputType = {
    id: string | null
    code: string | null
    name_en: string | null
    name_th: string | null
    description_en: string | null
    description_th: string | null
    category: string | null
    delivery_method: string | null
    duration_hours: number | null
    credits: number | null
    level: string | null
    mandatory: boolean | null
    max_participants: number | null
    status: string | null
    rating: number | null
    review_count: number | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type CourseMaxAggregateOutputType = {
    id: string | null
    code: string | null
    name_en: string | null
    name_th: string | null
    description_en: string | null
    description_th: string | null
    category: string | null
    delivery_method: string | null
    duration_hours: number | null
    credits: number | null
    level: string | null
    mandatory: boolean | null
    max_participants: number | null
    status: string | null
    rating: number | null
    review_count: number | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type CourseCountAggregateOutputType = {
    id: number
    code: number
    name_en: number
    name_th: number
    description_en: number
    description_th: number
    category: number
    delivery_method: number
    duration_hours: number
    credits: number
    level: number
    mandatory: number
    max_participants: number
    prerequisites: number
    status: number
    rating: number
    review_count: number
    instructor_ids: number
    target_audience: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type CourseAvgAggregateInputType = {
    duration_hours?: true
    credits?: true
    max_participants?: true
    rating?: true
    review_count?: true
  }

  export type CourseSumAggregateInputType = {
    duration_hours?: true
    credits?: true
    max_participants?: true
    rating?: true
    review_count?: true
  }

  export type CourseMinAggregateInputType = {
    id?: true
    code?: true
    name_en?: true
    name_th?: true
    description_en?: true
    description_th?: true
    category?: true
    delivery_method?: true
    duration_hours?: true
    credits?: true
    level?: true
    mandatory?: true
    max_participants?: true
    status?: true
    rating?: true
    review_count?: true
    created_at?: true
    updated_at?: true
  }

  export type CourseMaxAggregateInputType = {
    id?: true
    code?: true
    name_en?: true
    name_th?: true
    description_en?: true
    description_th?: true
    category?: true
    delivery_method?: true
    duration_hours?: true
    credits?: true
    level?: true
    mandatory?: true
    max_participants?: true
    status?: true
    rating?: true
    review_count?: true
    created_at?: true
    updated_at?: true
  }

  export type CourseCountAggregateInputType = {
    id?: true
    code?: true
    name_en?: true
    name_th?: true
    description_en?: true
    description_th?: true
    category?: true
    delivery_method?: true
    duration_hours?: true
    credits?: true
    level?: true
    mandatory?: true
    max_participants?: true
    prerequisites?: true
    status?: true
    rating?: true
    review_count?: true
    instructor_ids?: true
    target_audience?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type CourseAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Course to aggregate.
     */
    where?: CourseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Courses to fetch.
     */
    orderBy?: CourseOrderByWithRelationInput | CourseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CourseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Courses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Courses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Courses
    **/
    _count?: true | CourseCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CourseAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CourseSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CourseMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CourseMaxAggregateInputType
  }

  export type GetCourseAggregateType<T extends CourseAggregateArgs> = {
        [P in keyof T & keyof AggregateCourse]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCourse[P]>
      : GetScalarType<T[P], AggregateCourse[P]>
  }




  export type CourseGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CourseWhereInput
    orderBy?: CourseOrderByWithAggregationInput | CourseOrderByWithAggregationInput[]
    by: CourseScalarFieldEnum[] | CourseScalarFieldEnum
    having?: CourseScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CourseCountAggregateInputType | true
    _avg?: CourseAvgAggregateInputType
    _sum?: CourseSumAggregateInputType
    _min?: CourseMinAggregateInputType
    _max?: CourseMaxAggregateInputType
  }

  export type CourseGroupByOutputType = {
    id: string
    code: string
    name_en: string
    name_th: string | null
    description_en: string | null
    description_th: string | null
    category: string
    delivery_method: string
    duration_hours: number
    credits: number
    level: string
    mandatory: boolean
    max_participants: number
    prerequisites: string[]
    status: string
    rating: number | null
    review_count: number
    instructor_ids: string[]
    target_audience: string[]
    created_at: Date
    updated_at: Date
    _count: CourseCountAggregateOutputType | null
    _avg: CourseAvgAggregateOutputType | null
    _sum: CourseSumAggregateOutputType | null
    _min: CourseMinAggregateOutputType | null
    _max: CourseMaxAggregateOutputType | null
  }

  type GetCourseGroupByPayload<T extends CourseGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CourseGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CourseGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CourseGroupByOutputType[P]>
            : GetScalarType<T[P], CourseGroupByOutputType[P]>
        }
      >
    >


  export type CourseSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    code?: boolean
    name_en?: boolean
    name_th?: boolean
    description_en?: boolean
    description_th?: boolean
    category?: boolean
    delivery_method?: boolean
    duration_hours?: boolean
    credits?: boolean
    level?: boolean
    mandatory?: boolean
    max_participants?: boolean
    prerequisites?: boolean
    status?: boolean
    rating?: boolean
    review_count?: boolean
    instructor_ids?: boolean
    target_audience?: boolean
    created_at?: boolean
    updated_at?: boolean
    enrollments?: boolean | Course$enrollmentsArgs<ExtArgs>
    training_records?: boolean | Course$training_recordsArgs<ExtArgs>
    _count?: boolean | CourseCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["course"]>

  export type CourseSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    code?: boolean
    name_en?: boolean
    name_th?: boolean
    description_en?: boolean
    description_th?: boolean
    category?: boolean
    delivery_method?: boolean
    duration_hours?: boolean
    credits?: boolean
    level?: boolean
    mandatory?: boolean
    max_participants?: boolean
    prerequisites?: boolean
    status?: boolean
    rating?: boolean
    review_count?: boolean
    instructor_ids?: boolean
    target_audience?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["course"]>

  export type CourseSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    code?: boolean
    name_en?: boolean
    name_th?: boolean
    description_en?: boolean
    description_th?: boolean
    category?: boolean
    delivery_method?: boolean
    duration_hours?: boolean
    credits?: boolean
    level?: boolean
    mandatory?: boolean
    max_participants?: boolean
    prerequisites?: boolean
    status?: boolean
    rating?: boolean
    review_count?: boolean
    instructor_ids?: boolean
    target_audience?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["course"]>

  export type CourseSelectScalar = {
    id?: boolean
    code?: boolean
    name_en?: boolean
    name_th?: boolean
    description_en?: boolean
    description_th?: boolean
    category?: boolean
    delivery_method?: boolean
    duration_hours?: boolean
    credits?: boolean
    level?: boolean
    mandatory?: boolean
    max_participants?: boolean
    prerequisites?: boolean
    status?: boolean
    rating?: boolean
    review_count?: boolean
    instructor_ids?: boolean
    target_audience?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type CourseOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "code" | "name_en" | "name_th" | "description_en" | "description_th" | "category" | "delivery_method" | "duration_hours" | "credits" | "level" | "mandatory" | "max_participants" | "prerequisites" | "status" | "rating" | "review_count" | "instructor_ids" | "target_audience" | "created_at" | "updated_at", ExtArgs["result"]["course"]>
  export type CourseInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    enrollments?: boolean | Course$enrollmentsArgs<ExtArgs>
    training_records?: boolean | Course$training_recordsArgs<ExtArgs>
    _count?: boolean | CourseCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type CourseIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type CourseIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $CoursePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Course"
    objects: {
      enrollments: Prisma.$EnrollmentPayload<ExtArgs>[]
      training_records: Prisma.$TrainingRecordPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      code: string
      name_en: string
      name_th: string | null
      description_en: string | null
      description_th: string | null
      category: string
      delivery_method: string
      duration_hours: number
      credits: number
      level: string
      mandatory: boolean
      max_participants: number
      prerequisites: string[]
      status: string
      rating: number | null
      review_count: number
      instructor_ids: string[]
      target_audience: string[]
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["course"]>
    composites: {}
  }

  type CourseGetPayload<S extends boolean | null | undefined | CourseDefaultArgs> = $Result.GetResult<Prisma.$CoursePayload, S>

  type CourseCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CourseFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CourseCountAggregateInputType | true
    }

  export interface CourseDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Course'], meta: { name: 'Course' } }
    /**
     * Find zero or one Course that matches the filter.
     * @param {CourseFindUniqueArgs} args - Arguments to find a Course
     * @example
     * // Get one Course
     * const course = await prisma.course.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CourseFindUniqueArgs>(args: SelectSubset<T, CourseFindUniqueArgs<ExtArgs>>): Prisma__CourseClient<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Course that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CourseFindUniqueOrThrowArgs} args - Arguments to find a Course
     * @example
     * // Get one Course
     * const course = await prisma.course.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CourseFindUniqueOrThrowArgs>(args: SelectSubset<T, CourseFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CourseClient<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Course that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CourseFindFirstArgs} args - Arguments to find a Course
     * @example
     * // Get one Course
     * const course = await prisma.course.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CourseFindFirstArgs>(args?: SelectSubset<T, CourseFindFirstArgs<ExtArgs>>): Prisma__CourseClient<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Course that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CourseFindFirstOrThrowArgs} args - Arguments to find a Course
     * @example
     * // Get one Course
     * const course = await prisma.course.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CourseFindFirstOrThrowArgs>(args?: SelectSubset<T, CourseFindFirstOrThrowArgs<ExtArgs>>): Prisma__CourseClient<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Courses that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CourseFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Courses
     * const courses = await prisma.course.findMany()
     * 
     * // Get first 10 Courses
     * const courses = await prisma.course.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const courseWithIdOnly = await prisma.course.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CourseFindManyArgs>(args?: SelectSubset<T, CourseFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Course.
     * @param {CourseCreateArgs} args - Arguments to create a Course.
     * @example
     * // Create one Course
     * const Course = await prisma.course.create({
     *   data: {
     *     // ... data to create a Course
     *   }
     * })
     * 
     */
    create<T extends CourseCreateArgs>(args: SelectSubset<T, CourseCreateArgs<ExtArgs>>): Prisma__CourseClient<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Courses.
     * @param {CourseCreateManyArgs} args - Arguments to create many Courses.
     * @example
     * // Create many Courses
     * const course = await prisma.course.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CourseCreateManyArgs>(args?: SelectSubset<T, CourseCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Courses and returns the data saved in the database.
     * @param {CourseCreateManyAndReturnArgs} args - Arguments to create many Courses.
     * @example
     * // Create many Courses
     * const course = await prisma.course.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Courses and only return the `id`
     * const courseWithIdOnly = await prisma.course.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CourseCreateManyAndReturnArgs>(args?: SelectSubset<T, CourseCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Course.
     * @param {CourseDeleteArgs} args - Arguments to delete one Course.
     * @example
     * // Delete one Course
     * const Course = await prisma.course.delete({
     *   where: {
     *     // ... filter to delete one Course
     *   }
     * })
     * 
     */
    delete<T extends CourseDeleteArgs>(args: SelectSubset<T, CourseDeleteArgs<ExtArgs>>): Prisma__CourseClient<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Course.
     * @param {CourseUpdateArgs} args - Arguments to update one Course.
     * @example
     * // Update one Course
     * const course = await prisma.course.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CourseUpdateArgs>(args: SelectSubset<T, CourseUpdateArgs<ExtArgs>>): Prisma__CourseClient<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Courses.
     * @param {CourseDeleteManyArgs} args - Arguments to filter Courses to delete.
     * @example
     * // Delete a few Courses
     * const { count } = await prisma.course.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CourseDeleteManyArgs>(args?: SelectSubset<T, CourseDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Courses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CourseUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Courses
     * const course = await prisma.course.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CourseUpdateManyArgs>(args: SelectSubset<T, CourseUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Courses and returns the data updated in the database.
     * @param {CourseUpdateManyAndReturnArgs} args - Arguments to update many Courses.
     * @example
     * // Update many Courses
     * const course = await prisma.course.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Courses and only return the `id`
     * const courseWithIdOnly = await prisma.course.updateManyAndReturn({
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
    updateManyAndReturn<T extends CourseUpdateManyAndReturnArgs>(args: SelectSubset<T, CourseUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Course.
     * @param {CourseUpsertArgs} args - Arguments to update or create a Course.
     * @example
     * // Update or create a Course
     * const course = await prisma.course.upsert({
     *   create: {
     *     // ... data to create a Course
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Course we want to update
     *   }
     * })
     */
    upsert<T extends CourseUpsertArgs>(args: SelectSubset<T, CourseUpsertArgs<ExtArgs>>): Prisma__CourseClient<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Courses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CourseCountArgs} args - Arguments to filter Courses to count.
     * @example
     * // Count the number of Courses
     * const count = await prisma.course.count({
     *   where: {
     *     // ... the filter for the Courses we want to count
     *   }
     * })
    **/
    count<T extends CourseCountArgs>(
      args?: Subset<T, CourseCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CourseCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Course.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CourseAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends CourseAggregateArgs>(args: Subset<T, CourseAggregateArgs>): Prisma.PrismaPromise<GetCourseAggregateType<T>>

    /**
     * Group by Course.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CourseGroupByArgs} args - Group by arguments.
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
      T extends CourseGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CourseGroupByArgs['orderBy'] }
        : { orderBy?: CourseGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, CourseGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCourseGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Course model
   */
  readonly fields: CourseFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Course.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CourseClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    enrollments<T extends Course$enrollmentsArgs<ExtArgs> = {}>(args?: Subset<T, Course$enrollmentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EnrollmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    training_records<T extends Course$training_recordsArgs<ExtArgs> = {}>(args?: Subset<T, Course$training_recordsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TrainingRecordPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Course model
   */
  interface CourseFieldRefs {
    readonly id: FieldRef<"Course", 'String'>
    readonly code: FieldRef<"Course", 'String'>
    readonly name_en: FieldRef<"Course", 'String'>
    readonly name_th: FieldRef<"Course", 'String'>
    readonly description_en: FieldRef<"Course", 'String'>
    readonly description_th: FieldRef<"Course", 'String'>
    readonly category: FieldRef<"Course", 'String'>
    readonly delivery_method: FieldRef<"Course", 'String'>
    readonly duration_hours: FieldRef<"Course", 'Int'>
    readonly credits: FieldRef<"Course", 'Int'>
    readonly level: FieldRef<"Course", 'String'>
    readonly mandatory: FieldRef<"Course", 'Boolean'>
    readonly max_participants: FieldRef<"Course", 'Int'>
    readonly prerequisites: FieldRef<"Course", 'String[]'>
    readonly status: FieldRef<"Course", 'String'>
    readonly rating: FieldRef<"Course", 'Float'>
    readonly review_count: FieldRef<"Course", 'Int'>
    readonly instructor_ids: FieldRef<"Course", 'String[]'>
    readonly target_audience: FieldRef<"Course", 'String[]'>
    readonly created_at: FieldRef<"Course", 'DateTime'>
    readonly updated_at: FieldRef<"Course", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Course findUnique
   */
  export type CourseFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Course
     */
    omit?: CourseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseInclude<ExtArgs> | null
    /**
     * Filter, which Course to fetch.
     */
    where: CourseWhereUniqueInput
  }

  /**
   * Course findUniqueOrThrow
   */
  export type CourseFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Course
     */
    omit?: CourseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseInclude<ExtArgs> | null
    /**
     * Filter, which Course to fetch.
     */
    where: CourseWhereUniqueInput
  }

  /**
   * Course findFirst
   */
  export type CourseFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Course
     */
    omit?: CourseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseInclude<ExtArgs> | null
    /**
     * Filter, which Course to fetch.
     */
    where?: CourseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Courses to fetch.
     */
    orderBy?: CourseOrderByWithRelationInput | CourseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Courses.
     */
    cursor?: CourseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Courses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Courses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Courses.
     */
    distinct?: CourseScalarFieldEnum | CourseScalarFieldEnum[]
  }

  /**
   * Course findFirstOrThrow
   */
  export type CourseFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Course
     */
    omit?: CourseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseInclude<ExtArgs> | null
    /**
     * Filter, which Course to fetch.
     */
    where?: CourseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Courses to fetch.
     */
    orderBy?: CourseOrderByWithRelationInput | CourseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Courses.
     */
    cursor?: CourseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Courses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Courses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Courses.
     */
    distinct?: CourseScalarFieldEnum | CourseScalarFieldEnum[]
  }

  /**
   * Course findMany
   */
  export type CourseFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Course
     */
    omit?: CourseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseInclude<ExtArgs> | null
    /**
     * Filter, which Courses to fetch.
     */
    where?: CourseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Courses to fetch.
     */
    orderBy?: CourseOrderByWithRelationInput | CourseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Courses.
     */
    cursor?: CourseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Courses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Courses.
     */
    skip?: number
    distinct?: CourseScalarFieldEnum | CourseScalarFieldEnum[]
  }

  /**
   * Course create
   */
  export type CourseCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Course
     */
    omit?: CourseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseInclude<ExtArgs> | null
    /**
     * The data needed to create a Course.
     */
    data: XOR<CourseCreateInput, CourseUncheckedCreateInput>
  }

  /**
   * Course createMany
   */
  export type CourseCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Courses.
     */
    data: CourseCreateManyInput | CourseCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Course createManyAndReturn
   */
  export type CourseCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Course
     */
    omit?: CourseOmit<ExtArgs> | null
    /**
     * The data used to create many Courses.
     */
    data: CourseCreateManyInput | CourseCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Course update
   */
  export type CourseUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Course
     */
    omit?: CourseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseInclude<ExtArgs> | null
    /**
     * The data needed to update a Course.
     */
    data: XOR<CourseUpdateInput, CourseUncheckedUpdateInput>
    /**
     * Choose, which Course to update.
     */
    where: CourseWhereUniqueInput
  }

  /**
   * Course updateMany
   */
  export type CourseUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Courses.
     */
    data: XOR<CourseUpdateManyMutationInput, CourseUncheckedUpdateManyInput>
    /**
     * Filter which Courses to update
     */
    where?: CourseWhereInput
    /**
     * Limit how many Courses to update.
     */
    limit?: number
  }

  /**
   * Course updateManyAndReturn
   */
  export type CourseUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Course
     */
    omit?: CourseOmit<ExtArgs> | null
    /**
     * The data used to update Courses.
     */
    data: XOR<CourseUpdateManyMutationInput, CourseUncheckedUpdateManyInput>
    /**
     * Filter which Courses to update
     */
    where?: CourseWhereInput
    /**
     * Limit how many Courses to update.
     */
    limit?: number
  }

  /**
   * Course upsert
   */
  export type CourseUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Course
     */
    omit?: CourseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseInclude<ExtArgs> | null
    /**
     * The filter to search for the Course to update in case it exists.
     */
    where: CourseWhereUniqueInput
    /**
     * In case the Course found by the `where` argument doesn't exist, create a new Course with this data.
     */
    create: XOR<CourseCreateInput, CourseUncheckedCreateInput>
    /**
     * In case the Course was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CourseUpdateInput, CourseUncheckedUpdateInput>
  }

  /**
   * Course delete
   */
  export type CourseDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Course
     */
    omit?: CourseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseInclude<ExtArgs> | null
    /**
     * Filter which Course to delete.
     */
    where: CourseWhereUniqueInput
  }

  /**
   * Course deleteMany
   */
  export type CourseDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Courses to delete
     */
    where?: CourseWhereInput
    /**
     * Limit how many Courses to delete.
     */
    limit?: number
  }

  /**
   * Course.enrollments
   */
  export type Course$enrollmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Enrollment
     */
    select?: EnrollmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Enrollment
     */
    omit?: EnrollmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EnrollmentInclude<ExtArgs> | null
    where?: EnrollmentWhereInput
    orderBy?: EnrollmentOrderByWithRelationInput | EnrollmentOrderByWithRelationInput[]
    cursor?: EnrollmentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: EnrollmentScalarFieldEnum | EnrollmentScalarFieldEnum[]
  }

  /**
   * Course.training_records
   */
  export type Course$training_recordsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrainingRecord
     */
    select?: TrainingRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrainingRecord
     */
    omit?: TrainingRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrainingRecordInclude<ExtArgs> | null
    where?: TrainingRecordWhereInput
    orderBy?: TrainingRecordOrderByWithRelationInput | TrainingRecordOrderByWithRelationInput[]
    cursor?: TrainingRecordWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TrainingRecordScalarFieldEnum | TrainingRecordScalarFieldEnum[]
  }

  /**
   * Course without action
   */
  export type CourseDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Course
     */
    omit?: CourseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseInclude<ExtArgs> | null
  }


  /**
   * Model Enrollment
   */

  export type AggregateEnrollment = {
    _count: EnrollmentCountAggregateOutputType | null
    _avg: EnrollmentAvgAggregateOutputType | null
    _sum: EnrollmentSumAggregateOutputType | null
    _min: EnrollmentMinAggregateOutputType | null
    _max: EnrollmentMaxAggregateOutputType | null
  }

  export type EnrollmentAvgAggregateOutputType = {
    score: number | null
    progress: number | null
    attendance_rate: number | null
  }

  export type EnrollmentSumAggregateOutputType = {
    score: number | null
    progress: number | null
    attendance_rate: number | null
  }

  export type EnrollmentMinAggregateOutputType = {
    id: string | null
    course_id: string | null
    employee_id: string | null
    schedule_id: string | null
    status: string | null
    enrollment_date: Date | null
    completion_date: Date | null
    score: number | null
    progress: number | null
    certificate_id: string | null
    attendance_rate: number | null
    feedback: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type EnrollmentMaxAggregateOutputType = {
    id: string | null
    course_id: string | null
    employee_id: string | null
    schedule_id: string | null
    status: string | null
    enrollment_date: Date | null
    completion_date: Date | null
    score: number | null
    progress: number | null
    certificate_id: string | null
    attendance_rate: number | null
    feedback: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type EnrollmentCountAggregateOutputType = {
    id: number
    course_id: number
    employee_id: number
    schedule_id: number
    status: number
    enrollment_date: number
    completion_date: number
    score: number
    progress: number
    certificate_id: number
    attendance_rate: number
    feedback: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type EnrollmentAvgAggregateInputType = {
    score?: true
    progress?: true
    attendance_rate?: true
  }

  export type EnrollmentSumAggregateInputType = {
    score?: true
    progress?: true
    attendance_rate?: true
  }

  export type EnrollmentMinAggregateInputType = {
    id?: true
    course_id?: true
    employee_id?: true
    schedule_id?: true
    status?: true
    enrollment_date?: true
    completion_date?: true
    score?: true
    progress?: true
    certificate_id?: true
    attendance_rate?: true
    feedback?: true
    created_at?: true
    updated_at?: true
  }

  export type EnrollmentMaxAggregateInputType = {
    id?: true
    course_id?: true
    employee_id?: true
    schedule_id?: true
    status?: true
    enrollment_date?: true
    completion_date?: true
    score?: true
    progress?: true
    certificate_id?: true
    attendance_rate?: true
    feedback?: true
    created_at?: true
    updated_at?: true
  }

  export type EnrollmentCountAggregateInputType = {
    id?: true
    course_id?: true
    employee_id?: true
    schedule_id?: true
    status?: true
    enrollment_date?: true
    completion_date?: true
    score?: true
    progress?: true
    certificate_id?: true
    attendance_rate?: true
    feedback?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type EnrollmentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Enrollment to aggregate.
     */
    where?: EnrollmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Enrollments to fetch.
     */
    orderBy?: EnrollmentOrderByWithRelationInput | EnrollmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: EnrollmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Enrollments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Enrollments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Enrollments
    **/
    _count?: true | EnrollmentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: EnrollmentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: EnrollmentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EnrollmentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EnrollmentMaxAggregateInputType
  }

  export type GetEnrollmentAggregateType<T extends EnrollmentAggregateArgs> = {
        [P in keyof T & keyof AggregateEnrollment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEnrollment[P]>
      : GetScalarType<T[P], AggregateEnrollment[P]>
  }




  export type EnrollmentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EnrollmentWhereInput
    orderBy?: EnrollmentOrderByWithAggregationInput | EnrollmentOrderByWithAggregationInput[]
    by: EnrollmentScalarFieldEnum[] | EnrollmentScalarFieldEnum
    having?: EnrollmentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EnrollmentCountAggregateInputType | true
    _avg?: EnrollmentAvgAggregateInputType
    _sum?: EnrollmentSumAggregateInputType
    _min?: EnrollmentMinAggregateInputType
    _max?: EnrollmentMaxAggregateInputType
  }

  export type EnrollmentGroupByOutputType = {
    id: string
    course_id: string
    employee_id: string
    schedule_id: string | null
    status: string
    enrollment_date: Date
    completion_date: Date | null
    score: number | null
    progress: number
    certificate_id: string | null
    attendance_rate: number | null
    feedback: string | null
    created_at: Date
    updated_at: Date
    _count: EnrollmentCountAggregateOutputType | null
    _avg: EnrollmentAvgAggregateOutputType | null
    _sum: EnrollmentSumAggregateOutputType | null
    _min: EnrollmentMinAggregateOutputType | null
    _max: EnrollmentMaxAggregateOutputType | null
  }

  type GetEnrollmentGroupByPayload<T extends EnrollmentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EnrollmentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EnrollmentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EnrollmentGroupByOutputType[P]>
            : GetScalarType<T[P], EnrollmentGroupByOutputType[P]>
        }
      >
    >


  export type EnrollmentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    course_id?: boolean
    employee_id?: boolean
    schedule_id?: boolean
    status?: boolean
    enrollment_date?: boolean
    completion_date?: boolean
    score?: boolean
    progress?: boolean
    certificate_id?: boolean
    attendance_rate?: boolean
    feedback?: boolean
    created_at?: boolean
    updated_at?: boolean
    course?: boolean | CourseDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["enrollment"]>

  export type EnrollmentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    course_id?: boolean
    employee_id?: boolean
    schedule_id?: boolean
    status?: boolean
    enrollment_date?: boolean
    completion_date?: boolean
    score?: boolean
    progress?: boolean
    certificate_id?: boolean
    attendance_rate?: boolean
    feedback?: boolean
    created_at?: boolean
    updated_at?: boolean
    course?: boolean | CourseDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["enrollment"]>

  export type EnrollmentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    course_id?: boolean
    employee_id?: boolean
    schedule_id?: boolean
    status?: boolean
    enrollment_date?: boolean
    completion_date?: boolean
    score?: boolean
    progress?: boolean
    certificate_id?: boolean
    attendance_rate?: boolean
    feedback?: boolean
    created_at?: boolean
    updated_at?: boolean
    course?: boolean | CourseDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["enrollment"]>

  export type EnrollmentSelectScalar = {
    id?: boolean
    course_id?: boolean
    employee_id?: boolean
    schedule_id?: boolean
    status?: boolean
    enrollment_date?: boolean
    completion_date?: boolean
    score?: boolean
    progress?: boolean
    certificate_id?: boolean
    attendance_rate?: boolean
    feedback?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type EnrollmentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "course_id" | "employee_id" | "schedule_id" | "status" | "enrollment_date" | "completion_date" | "score" | "progress" | "certificate_id" | "attendance_rate" | "feedback" | "created_at" | "updated_at", ExtArgs["result"]["enrollment"]>
  export type EnrollmentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    course?: boolean | CourseDefaultArgs<ExtArgs>
  }
  export type EnrollmentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    course?: boolean | CourseDefaultArgs<ExtArgs>
  }
  export type EnrollmentIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    course?: boolean | CourseDefaultArgs<ExtArgs>
  }

  export type $EnrollmentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Enrollment"
    objects: {
      course: Prisma.$CoursePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      course_id: string
      employee_id: string
      schedule_id: string | null
      status: string
      enrollment_date: Date
      completion_date: Date | null
      score: number | null
      progress: number
      certificate_id: string | null
      attendance_rate: number | null
      feedback: string | null
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["enrollment"]>
    composites: {}
  }

  type EnrollmentGetPayload<S extends boolean | null | undefined | EnrollmentDefaultArgs> = $Result.GetResult<Prisma.$EnrollmentPayload, S>

  type EnrollmentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<EnrollmentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: EnrollmentCountAggregateInputType | true
    }

  export interface EnrollmentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Enrollment'], meta: { name: 'Enrollment' } }
    /**
     * Find zero or one Enrollment that matches the filter.
     * @param {EnrollmentFindUniqueArgs} args - Arguments to find a Enrollment
     * @example
     * // Get one Enrollment
     * const enrollment = await prisma.enrollment.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends EnrollmentFindUniqueArgs>(args: SelectSubset<T, EnrollmentFindUniqueArgs<ExtArgs>>): Prisma__EnrollmentClient<$Result.GetResult<Prisma.$EnrollmentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Enrollment that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {EnrollmentFindUniqueOrThrowArgs} args - Arguments to find a Enrollment
     * @example
     * // Get one Enrollment
     * const enrollment = await prisma.enrollment.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends EnrollmentFindUniqueOrThrowArgs>(args: SelectSubset<T, EnrollmentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__EnrollmentClient<$Result.GetResult<Prisma.$EnrollmentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Enrollment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EnrollmentFindFirstArgs} args - Arguments to find a Enrollment
     * @example
     * // Get one Enrollment
     * const enrollment = await prisma.enrollment.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends EnrollmentFindFirstArgs>(args?: SelectSubset<T, EnrollmentFindFirstArgs<ExtArgs>>): Prisma__EnrollmentClient<$Result.GetResult<Prisma.$EnrollmentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Enrollment that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EnrollmentFindFirstOrThrowArgs} args - Arguments to find a Enrollment
     * @example
     * // Get one Enrollment
     * const enrollment = await prisma.enrollment.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends EnrollmentFindFirstOrThrowArgs>(args?: SelectSubset<T, EnrollmentFindFirstOrThrowArgs<ExtArgs>>): Prisma__EnrollmentClient<$Result.GetResult<Prisma.$EnrollmentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Enrollments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EnrollmentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Enrollments
     * const enrollments = await prisma.enrollment.findMany()
     * 
     * // Get first 10 Enrollments
     * const enrollments = await prisma.enrollment.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const enrollmentWithIdOnly = await prisma.enrollment.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends EnrollmentFindManyArgs>(args?: SelectSubset<T, EnrollmentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EnrollmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Enrollment.
     * @param {EnrollmentCreateArgs} args - Arguments to create a Enrollment.
     * @example
     * // Create one Enrollment
     * const Enrollment = await prisma.enrollment.create({
     *   data: {
     *     // ... data to create a Enrollment
     *   }
     * })
     * 
     */
    create<T extends EnrollmentCreateArgs>(args: SelectSubset<T, EnrollmentCreateArgs<ExtArgs>>): Prisma__EnrollmentClient<$Result.GetResult<Prisma.$EnrollmentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Enrollments.
     * @param {EnrollmentCreateManyArgs} args - Arguments to create many Enrollments.
     * @example
     * // Create many Enrollments
     * const enrollment = await prisma.enrollment.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends EnrollmentCreateManyArgs>(args?: SelectSubset<T, EnrollmentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Enrollments and returns the data saved in the database.
     * @param {EnrollmentCreateManyAndReturnArgs} args - Arguments to create many Enrollments.
     * @example
     * // Create many Enrollments
     * const enrollment = await prisma.enrollment.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Enrollments and only return the `id`
     * const enrollmentWithIdOnly = await prisma.enrollment.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends EnrollmentCreateManyAndReturnArgs>(args?: SelectSubset<T, EnrollmentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EnrollmentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Enrollment.
     * @param {EnrollmentDeleteArgs} args - Arguments to delete one Enrollment.
     * @example
     * // Delete one Enrollment
     * const Enrollment = await prisma.enrollment.delete({
     *   where: {
     *     // ... filter to delete one Enrollment
     *   }
     * })
     * 
     */
    delete<T extends EnrollmentDeleteArgs>(args: SelectSubset<T, EnrollmentDeleteArgs<ExtArgs>>): Prisma__EnrollmentClient<$Result.GetResult<Prisma.$EnrollmentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Enrollment.
     * @param {EnrollmentUpdateArgs} args - Arguments to update one Enrollment.
     * @example
     * // Update one Enrollment
     * const enrollment = await prisma.enrollment.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends EnrollmentUpdateArgs>(args: SelectSubset<T, EnrollmentUpdateArgs<ExtArgs>>): Prisma__EnrollmentClient<$Result.GetResult<Prisma.$EnrollmentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Enrollments.
     * @param {EnrollmentDeleteManyArgs} args - Arguments to filter Enrollments to delete.
     * @example
     * // Delete a few Enrollments
     * const { count } = await prisma.enrollment.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends EnrollmentDeleteManyArgs>(args?: SelectSubset<T, EnrollmentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Enrollments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EnrollmentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Enrollments
     * const enrollment = await prisma.enrollment.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends EnrollmentUpdateManyArgs>(args: SelectSubset<T, EnrollmentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Enrollments and returns the data updated in the database.
     * @param {EnrollmentUpdateManyAndReturnArgs} args - Arguments to update many Enrollments.
     * @example
     * // Update many Enrollments
     * const enrollment = await prisma.enrollment.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Enrollments and only return the `id`
     * const enrollmentWithIdOnly = await prisma.enrollment.updateManyAndReturn({
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
    updateManyAndReturn<T extends EnrollmentUpdateManyAndReturnArgs>(args: SelectSubset<T, EnrollmentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EnrollmentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Enrollment.
     * @param {EnrollmentUpsertArgs} args - Arguments to update or create a Enrollment.
     * @example
     * // Update or create a Enrollment
     * const enrollment = await prisma.enrollment.upsert({
     *   create: {
     *     // ... data to create a Enrollment
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Enrollment we want to update
     *   }
     * })
     */
    upsert<T extends EnrollmentUpsertArgs>(args: SelectSubset<T, EnrollmentUpsertArgs<ExtArgs>>): Prisma__EnrollmentClient<$Result.GetResult<Prisma.$EnrollmentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Enrollments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EnrollmentCountArgs} args - Arguments to filter Enrollments to count.
     * @example
     * // Count the number of Enrollments
     * const count = await prisma.enrollment.count({
     *   where: {
     *     // ... the filter for the Enrollments we want to count
     *   }
     * })
    **/
    count<T extends EnrollmentCountArgs>(
      args?: Subset<T, EnrollmentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EnrollmentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Enrollment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EnrollmentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends EnrollmentAggregateArgs>(args: Subset<T, EnrollmentAggregateArgs>): Prisma.PrismaPromise<GetEnrollmentAggregateType<T>>

    /**
     * Group by Enrollment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EnrollmentGroupByArgs} args - Group by arguments.
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
      T extends EnrollmentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EnrollmentGroupByArgs['orderBy'] }
        : { orderBy?: EnrollmentGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, EnrollmentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEnrollmentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Enrollment model
   */
  readonly fields: EnrollmentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Enrollment.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__EnrollmentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    course<T extends CourseDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CourseDefaultArgs<ExtArgs>>): Prisma__CourseClient<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the Enrollment model
   */
  interface EnrollmentFieldRefs {
    readonly id: FieldRef<"Enrollment", 'String'>
    readonly course_id: FieldRef<"Enrollment", 'String'>
    readonly employee_id: FieldRef<"Enrollment", 'String'>
    readonly schedule_id: FieldRef<"Enrollment", 'String'>
    readonly status: FieldRef<"Enrollment", 'String'>
    readonly enrollment_date: FieldRef<"Enrollment", 'DateTime'>
    readonly completion_date: FieldRef<"Enrollment", 'DateTime'>
    readonly score: FieldRef<"Enrollment", 'Float'>
    readonly progress: FieldRef<"Enrollment", 'Int'>
    readonly certificate_id: FieldRef<"Enrollment", 'String'>
    readonly attendance_rate: FieldRef<"Enrollment", 'Float'>
    readonly feedback: FieldRef<"Enrollment", 'String'>
    readonly created_at: FieldRef<"Enrollment", 'DateTime'>
    readonly updated_at: FieldRef<"Enrollment", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Enrollment findUnique
   */
  export type EnrollmentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Enrollment
     */
    select?: EnrollmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Enrollment
     */
    omit?: EnrollmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EnrollmentInclude<ExtArgs> | null
    /**
     * Filter, which Enrollment to fetch.
     */
    where: EnrollmentWhereUniqueInput
  }

  /**
   * Enrollment findUniqueOrThrow
   */
  export type EnrollmentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Enrollment
     */
    select?: EnrollmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Enrollment
     */
    omit?: EnrollmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EnrollmentInclude<ExtArgs> | null
    /**
     * Filter, which Enrollment to fetch.
     */
    where: EnrollmentWhereUniqueInput
  }

  /**
   * Enrollment findFirst
   */
  export type EnrollmentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Enrollment
     */
    select?: EnrollmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Enrollment
     */
    omit?: EnrollmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EnrollmentInclude<ExtArgs> | null
    /**
     * Filter, which Enrollment to fetch.
     */
    where?: EnrollmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Enrollments to fetch.
     */
    orderBy?: EnrollmentOrderByWithRelationInput | EnrollmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Enrollments.
     */
    cursor?: EnrollmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Enrollments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Enrollments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Enrollments.
     */
    distinct?: EnrollmentScalarFieldEnum | EnrollmentScalarFieldEnum[]
  }

  /**
   * Enrollment findFirstOrThrow
   */
  export type EnrollmentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Enrollment
     */
    select?: EnrollmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Enrollment
     */
    omit?: EnrollmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EnrollmentInclude<ExtArgs> | null
    /**
     * Filter, which Enrollment to fetch.
     */
    where?: EnrollmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Enrollments to fetch.
     */
    orderBy?: EnrollmentOrderByWithRelationInput | EnrollmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Enrollments.
     */
    cursor?: EnrollmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Enrollments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Enrollments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Enrollments.
     */
    distinct?: EnrollmentScalarFieldEnum | EnrollmentScalarFieldEnum[]
  }

  /**
   * Enrollment findMany
   */
  export type EnrollmentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Enrollment
     */
    select?: EnrollmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Enrollment
     */
    omit?: EnrollmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EnrollmentInclude<ExtArgs> | null
    /**
     * Filter, which Enrollments to fetch.
     */
    where?: EnrollmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Enrollments to fetch.
     */
    orderBy?: EnrollmentOrderByWithRelationInput | EnrollmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Enrollments.
     */
    cursor?: EnrollmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Enrollments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Enrollments.
     */
    skip?: number
    distinct?: EnrollmentScalarFieldEnum | EnrollmentScalarFieldEnum[]
  }

  /**
   * Enrollment create
   */
  export type EnrollmentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Enrollment
     */
    select?: EnrollmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Enrollment
     */
    omit?: EnrollmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EnrollmentInclude<ExtArgs> | null
    /**
     * The data needed to create a Enrollment.
     */
    data: XOR<EnrollmentCreateInput, EnrollmentUncheckedCreateInput>
  }

  /**
   * Enrollment createMany
   */
  export type EnrollmentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Enrollments.
     */
    data: EnrollmentCreateManyInput | EnrollmentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Enrollment createManyAndReturn
   */
  export type EnrollmentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Enrollment
     */
    select?: EnrollmentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Enrollment
     */
    omit?: EnrollmentOmit<ExtArgs> | null
    /**
     * The data used to create many Enrollments.
     */
    data: EnrollmentCreateManyInput | EnrollmentCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EnrollmentIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Enrollment update
   */
  export type EnrollmentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Enrollment
     */
    select?: EnrollmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Enrollment
     */
    omit?: EnrollmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EnrollmentInclude<ExtArgs> | null
    /**
     * The data needed to update a Enrollment.
     */
    data: XOR<EnrollmentUpdateInput, EnrollmentUncheckedUpdateInput>
    /**
     * Choose, which Enrollment to update.
     */
    where: EnrollmentWhereUniqueInput
  }

  /**
   * Enrollment updateMany
   */
  export type EnrollmentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Enrollments.
     */
    data: XOR<EnrollmentUpdateManyMutationInput, EnrollmentUncheckedUpdateManyInput>
    /**
     * Filter which Enrollments to update
     */
    where?: EnrollmentWhereInput
    /**
     * Limit how many Enrollments to update.
     */
    limit?: number
  }

  /**
   * Enrollment updateManyAndReturn
   */
  export type EnrollmentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Enrollment
     */
    select?: EnrollmentSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Enrollment
     */
    omit?: EnrollmentOmit<ExtArgs> | null
    /**
     * The data used to update Enrollments.
     */
    data: XOR<EnrollmentUpdateManyMutationInput, EnrollmentUncheckedUpdateManyInput>
    /**
     * Filter which Enrollments to update
     */
    where?: EnrollmentWhereInput
    /**
     * Limit how many Enrollments to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EnrollmentIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Enrollment upsert
   */
  export type EnrollmentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Enrollment
     */
    select?: EnrollmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Enrollment
     */
    omit?: EnrollmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EnrollmentInclude<ExtArgs> | null
    /**
     * The filter to search for the Enrollment to update in case it exists.
     */
    where: EnrollmentWhereUniqueInput
    /**
     * In case the Enrollment found by the `where` argument doesn't exist, create a new Enrollment with this data.
     */
    create: XOR<EnrollmentCreateInput, EnrollmentUncheckedCreateInput>
    /**
     * In case the Enrollment was found with the provided `where` argument, update it with this data.
     */
    update: XOR<EnrollmentUpdateInput, EnrollmentUncheckedUpdateInput>
  }

  /**
   * Enrollment delete
   */
  export type EnrollmentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Enrollment
     */
    select?: EnrollmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Enrollment
     */
    omit?: EnrollmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EnrollmentInclude<ExtArgs> | null
    /**
     * Filter which Enrollment to delete.
     */
    where: EnrollmentWhereUniqueInput
  }

  /**
   * Enrollment deleteMany
   */
  export type EnrollmentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Enrollments to delete
     */
    where?: EnrollmentWhereInput
    /**
     * Limit how many Enrollments to delete.
     */
    limit?: number
  }

  /**
   * Enrollment without action
   */
  export type EnrollmentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Enrollment
     */
    select?: EnrollmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Enrollment
     */
    omit?: EnrollmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EnrollmentInclude<ExtArgs> | null
  }


  /**
   * Model TrainingRecord
   */

  export type AggregateTrainingRecord = {
    _count: TrainingRecordCountAggregateOutputType | null
    _avg: TrainingRecordAvgAggregateOutputType | null
    _sum: TrainingRecordSumAggregateOutputType | null
    _min: TrainingRecordMinAggregateOutputType | null
    _max: TrainingRecordMaxAggregateOutputType | null
  }

  export type TrainingRecordAvgAggregateOutputType = {
    duration_hours: number | null
    cost: number | null
    pre_assessment_score: number | null
    post_assessment_score: number | null
    instructor_rating: number | null
    course_rating: number | null
  }

  export type TrainingRecordSumAggregateOutputType = {
    duration_hours: number | null
    cost: number | null
    pre_assessment_score: number | null
    post_assessment_score: number | null
    instructor_rating: number | null
    course_rating: number | null
  }

  export type TrainingRecordMinAggregateOutputType = {
    id: string | null
    course_id: string | null
    employee_id: string | null
    course_code: string | null
    course_name_en: string | null
    course_name_th: string | null
    training_type: string | null
    category: string | null
    provider: string | null
    instructor_name: string | null
    start_date: Date | null
    end_date: Date | null
    duration_hours: number | null
    location: string | null
    status: string | null
    completion_date: Date | null
    certificate_id: string | null
    cost: number | null
    currency: string | null
    paid_by: string | null
    pre_assessment_score: number | null
    post_assessment_score: number | null
    instructor_rating: number | null
    course_rating: number | null
    feedback: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type TrainingRecordMaxAggregateOutputType = {
    id: string | null
    course_id: string | null
    employee_id: string | null
    course_code: string | null
    course_name_en: string | null
    course_name_th: string | null
    training_type: string | null
    category: string | null
    provider: string | null
    instructor_name: string | null
    start_date: Date | null
    end_date: Date | null
    duration_hours: number | null
    location: string | null
    status: string | null
    completion_date: Date | null
    certificate_id: string | null
    cost: number | null
    currency: string | null
    paid_by: string | null
    pre_assessment_score: number | null
    post_assessment_score: number | null
    instructor_rating: number | null
    course_rating: number | null
    feedback: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type TrainingRecordCountAggregateOutputType = {
    id: number
    course_id: number
    employee_id: number
    course_code: number
    course_name_en: number
    course_name_th: number
    training_type: number
    category: number
    provider: number
    instructor_name: number
    start_date: number
    end_date: number
    duration_hours: number
    location: number
    status: number
    completion_date: number
    certificate_id: number
    cost: number
    currency: number
    paid_by: number
    pre_assessment_score: number
    post_assessment_score: number
    instructor_rating: number
    course_rating: number
    feedback: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type TrainingRecordAvgAggregateInputType = {
    duration_hours?: true
    cost?: true
    pre_assessment_score?: true
    post_assessment_score?: true
    instructor_rating?: true
    course_rating?: true
  }

  export type TrainingRecordSumAggregateInputType = {
    duration_hours?: true
    cost?: true
    pre_assessment_score?: true
    post_assessment_score?: true
    instructor_rating?: true
    course_rating?: true
  }

  export type TrainingRecordMinAggregateInputType = {
    id?: true
    course_id?: true
    employee_id?: true
    course_code?: true
    course_name_en?: true
    course_name_th?: true
    training_type?: true
    category?: true
    provider?: true
    instructor_name?: true
    start_date?: true
    end_date?: true
    duration_hours?: true
    location?: true
    status?: true
    completion_date?: true
    certificate_id?: true
    cost?: true
    currency?: true
    paid_by?: true
    pre_assessment_score?: true
    post_assessment_score?: true
    instructor_rating?: true
    course_rating?: true
    feedback?: true
    created_at?: true
    updated_at?: true
  }

  export type TrainingRecordMaxAggregateInputType = {
    id?: true
    course_id?: true
    employee_id?: true
    course_code?: true
    course_name_en?: true
    course_name_th?: true
    training_type?: true
    category?: true
    provider?: true
    instructor_name?: true
    start_date?: true
    end_date?: true
    duration_hours?: true
    location?: true
    status?: true
    completion_date?: true
    certificate_id?: true
    cost?: true
    currency?: true
    paid_by?: true
    pre_assessment_score?: true
    post_assessment_score?: true
    instructor_rating?: true
    course_rating?: true
    feedback?: true
    created_at?: true
    updated_at?: true
  }

  export type TrainingRecordCountAggregateInputType = {
    id?: true
    course_id?: true
    employee_id?: true
    course_code?: true
    course_name_en?: true
    course_name_th?: true
    training_type?: true
    category?: true
    provider?: true
    instructor_name?: true
    start_date?: true
    end_date?: true
    duration_hours?: true
    location?: true
    status?: true
    completion_date?: true
    certificate_id?: true
    cost?: true
    currency?: true
    paid_by?: true
    pre_assessment_score?: true
    post_assessment_score?: true
    instructor_rating?: true
    course_rating?: true
    feedback?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type TrainingRecordAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TrainingRecord to aggregate.
     */
    where?: TrainingRecordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TrainingRecords to fetch.
     */
    orderBy?: TrainingRecordOrderByWithRelationInput | TrainingRecordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TrainingRecordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TrainingRecords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TrainingRecords.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TrainingRecords
    **/
    _count?: true | TrainingRecordCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TrainingRecordAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TrainingRecordSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TrainingRecordMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TrainingRecordMaxAggregateInputType
  }

  export type GetTrainingRecordAggregateType<T extends TrainingRecordAggregateArgs> = {
        [P in keyof T & keyof AggregateTrainingRecord]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTrainingRecord[P]>
      : GetScalarType<T[P], AggregateTrainingRecord[P]>
  }




  export type TrainingRecordGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TrainingRecordWhereInput
    orderBy?: TrainingRecordOrderByWithAggregationInput | TrainingRecordOrderByWithAggregationInput[]
    by: TrainingRecordScalarFieldEnum[] | TrainingRecordScalarFieldEnum
    having?: TrainingRecordScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TrainingRecordCountAggregateInputType | true
    _avg?: TrainingRecordAvgAggregateInputType
    _sum?: TrainingRecordSumAggregateInputType
    _min?: TrainingRecordMinAggregateInputType
    _max?: TrainingRecordMaxAggregateInputType
  }

  export type TrainingRecordGroupByOutputType = {
    id: string
    course_id: string | null
    employee_id: string
    course_code: string
    course_name_en: string
    course_name_th: string | null
    training_type: string
    category: string
    provider: string | null
    instructor_name: string | null
    start_date: Date
    end_date: Date
    duration_hours: number
    location: string | null
    status: string
    completion_date: Date | null
    certificate_id: string | null
    cost: number | null
    currency: string
    paid_by: string | null
    pre_assessment_score: number | null
    post_assessment_score: number | null
    instructor_rating: number | null
    course_rating: number | null
    feedback: string | null
    created_at: Date
    updated_at: Date
    _count: TrainingRecordCountAggregateOutputType | null
    _avg: TrainingRecordAvgAggregateOutputType | null
    _sum: TrainingRecordSumAggregateOutputType | null
    _min: TrainingRecordMinAggregateOutputType | null
    _max: TrainingRecordMaxAggregateOutputType | null
  }

  type GetTrainingRecordGroupByPayload<T extends TrainingRecordGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TrainingRecordGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TrainingRecordGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TrainingRecordGroupByOutputType[P]>
            : GetScalarType<T[P], TrainingRecordGroupByOutputType[P]>
        }
      >
    >


  export type TrainingRecordSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    course_id?: boolean
    employee_id?: boolean
    course_code?: boolean
    course_name_en?: boolean
    course_name_th?: boolean
    training_type?: boolean
    category?: boolean
    provider?: boolean
    instructor_name?: boolean
    start_date?: boolean
    end_date?: boolean
    duration_hours?: boolean
    location?: boolean
    status?: boolean
    completion_date?: boolean
    certificate_id?: boolean
    cost?: boolean
    currency?: boolean
    paid_by?: boolean
    pre_assessment_score?: boolean
    post_assessment_score?: boolean
    instructor_rating?: boolean
    course_rating?: boolean
    feedback?: boolean
    created_at?: boolean
    updated_at?: boolean
    course?: boolean | TrainingRecord$courseArgs<ExtArgs>
    evaluations?: boolean | TrainingRecord$evaluationsArgs<ExtArgs>
    _count?: boolean | TrainingRecordCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["trainingRecord"]>

  export type TrainingRecordSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    course_id?: boolean
    employee_id?: boolean
    course_code?: boolean
    course_name_en?: boolean
    course_name_th?: boolean
    training_type?: boolean
    category?: boolean
    provider?: boolean
    instructor_name?: boolean
    start_date?: boolean
    end_date?: boolean
    duration_hours?: boolean
    location?: boolean
    status?: boolean
    completion_date?: boolean
    certificate_id?: boolean
    cost?: boolean
    currency?: boolean
    paid_by?: boolean
    pre_assessment_score?: boolean
    post_assessment_score?: boolean
    instructor_rating?: boolean
    course_rating?: boolean
    feedback?: boolean
    created_at?: boolean
    updated_at?: boolean
    course?: boolean | TrainingRecord$courseArgs<ExtArgs>
  }, ExtArgs["result"]["trainingRecord"]>

  export type TrainingRecordSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    course_id?: boolean
    employee_id?: boolean
    course_code?: boolean
    course_name_en?: boolean
    course_name_th?: boolean
    training_type?: boolean
    category?: boolean
    provider?: boolean
    instructor_name?: boolean
    start_date?: boolean
    end_date?: boolean
    duration_hours?: boolean
    location?: boolean
    status?: boolean
    completion_date?: boolean
    certificate_id?: boolean
    cost?: boolean
    currency?: boolean
    paid_by?: boolean
    pre_assessment_score?: boolean
    post_assessment_score?: boolean
    instructor_rating?: boolean
    course_rating?: boolean
    feedback?: boolean
    created_at?: boolean
    updated_at?: boolean
    course?: boolean | TrainingRecord$courseArgs<ExtArgs>
  }, ExtArgs["result"]["trainingRecord"]>

  export type TrainingRecordSelectScalar = {
    id?: boolean
    course_id?: boolean
    employee_id?: boolean
    course_code?: boolean
    course_name_en?: boolean
    course_name_th?: boolean
    training_type?: boolean
    category?: boolean
    provider?: boolean
    instructor_name?: boolean
    start_date?: boolean
    end_date?: boolean
    duration_hours?: boolean
    location?: boolean
    status?: boolean
    completion_date?: boolean
    certificate_id?: boolean
    cost?: boolean
    currency?: boolean
    paid_by?: boolean
    pre_assessment_score?: boolean
    post_assessment_score?: boolean
    instructor_rating?: boolean
    course_rating?: boolean
    feedback?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type TrainingRecordOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "course_id" | "employee_id" | "course_code" | "course_name_en" | "course_name_th" | "training_type" | "category" | "provider" | "instructor_name" | "start_date" | "end_date" | "duration_hours" | "location" | "status" | "completion_date" | "certificate_id" | "cost" | "currency" | "paid_by" | "pre_assessment_score" | "post_assessment_score" | "instructor_rating" | "course_rating" | "feedback" | "created_at" | "updated_at", ExtArgs["result"]["trainingRecord"]>
  export type TrainingRecordInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    course?: boolean | TrainingRecord$courseArgs<ExtArgs>
    evaluations?: boolean | TrainingRecord$evaluationsArgs<ExtArgs>
    _count?: boolean | TrainingRecordCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type TrainingRecordIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    course?: boolean | TrainingRecord$courseArgs<ExtArgs>
  }
  export type TrainingRecordIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    course?: boolean | TrainingRecord$courseArgs<ExtArgs>
  }

  export type $TrainingRecordPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "TrainingRecord"
    objects: {
      course: Prisma.$CoursePayload<ExtArgs> | null
      evaluations: Prisma.$KirkpatrickEvaluationPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      course_id: string | null
      employee_id: string
      course_code: string
      course_name_en: string
      course_name_th: string | null
      training_type: string
      category: string
      provider: string | null
      instructor_name: string | null
      start_date: Date
      end_date: Date
      duration_hours: number
      location: string | null
      status: string
      completion_date: Date | null
      certificate_id: string | null
      cost: number | null
      currency: string
      paid_by: string | null
      pre_assessment_score: number | null
      post_assessment_score: number | null
      instructor_rating: number | null
      course_rating: number | null
      feedback: string | null
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["trainingRecord"]>
    composites: {}
  }

  type TrainingRecordGetPayload<S extends boolean | null | undefined | TrainingRecordDefaultArgs> = $Result.GetResult<Prisma.$TrainingRecordPayload, S>

  type TrainingRecordCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TrainingRecordFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TrainingRecordCountAggregateInputType | true
    }

  export interface TrainingRecordDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['TrainingRecord'], meta: { name: 'TrainingRecord' } }
    /**
     * Find zero or one TrainingRecord that matches the filter.
     * @param {TrainingRecordFindUniqueArgs} args - Arguments to find a TrainingRecord
     * @example
     * // Get one TrainingRecord
     * const trainingRecord = await prisma.trainingRecord.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TrainingRecordFindUniqueArgs>(args: SelectSubset<T, TrainingRecordFindUniqueArgs<ExtArgs>>): Prisma__TrainingRecordClient<$Result.GetResult<Prisma.$TrainingRecordPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one TrainingRecord that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TrainingRecordFindUniqueOrThrowArgs} args - Arguments to find a TrainingRecord
     * @example
     * // Get one TrainingRecord
     * const trainingRecord = await prisma.trainingRecord.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TrainingRecordFindUniqueOrThrowArgs>(args: SelectSubset<T, TrainingRecordFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TrainingRecordClient<$Result.GetResult<Prisma.$TrainingRecordPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TrainingRecord that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrainingRecordFindFirstArgs} args - Arguments to find a TrainingRecord
     * @example
     * // Get one TrainingRecord
     * const trainingRecord = await prisma.trainingRecord.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TrainingRecordFindFirstArgs>(args?: SelectSubset<T, TrainingRecordFindFirstArgs<ExtArgs>>): Prisma__TrainingRecordClient<$Result.GetResult<Prisma.$TrainingRecordPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TrainingRecord that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrainingRecordFindFirstOrThrowArgs} args - Arguments to find a TrainingRecord
     * @example
     * // Get one TrainingRecord
     * const trainingRecord = await prisma.trainingRecord.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TrainingRecordFindFirstOrThrowArgs>(args?: SelectSubset<T, TrainingRecordFindFirstOrThrowArgs<ExtArgs>>): Prisma__TrainingRecordClient<$Result.GetResult<Prisma.$TrainingRecordPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more TrainingRecords that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrainingRecordFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TrainingRecords
     * const trainingRecords = await prisma.trainingRecord.findMany()
     * 
     * // Get first 10 TrainingRecords
     * const trainingRecords = await prisma.trainingRecord.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const trainingRecordWithIdOnly = await prisma.trainingRecord.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TrainingRecordFindManyArgs>(args?: SelectSubset<T, TrainingRecordFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TrainingRecordPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a TrainingRecord.
     * @param {TrainingRecordCreateArgs} args - Arguments to create a TrainingRecord.
     * @example
     * // Create one TrainingRecord
     * const TrainingRecord = await prisma.trainingRecord.create({
     *   data: {
     *     // ... data to create a TrainingRecord
     *   }
     * })
     * 
     */
    create<T extends TrainingRecordCreateArgs>(args: SelectSubset<T, TrainingRecordCreateArgs<ExtArgs>>): Prisma__TrainingRecordClient<$Result.GetResult<Prisma.$TrainingRecordPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many TrainingRecords.
     * @param {TrainingRecordCreateManyArgs} args - Arguments to create many TrainingRecords.
     * @example
     * // Create many TrainingRecords
     * const trainingRecord = await prisma.trainingRecord.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TrainingRecordCreateManyArgs>(args?: SelectSubset<T, TrainingRecordCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many TrainingRecords and returns the data saved in the database.
     * @param {TrainingRecordCreateManyAndReturnArgs} args - Arguments to create many TrainingRecords.
     * @example
     * // Create many TrainingRecords
     * const trainingRecord = await prisma.trainingRecord.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many TrainingRecords and only return the `id`
     * const trainingRecordWithIdOnly = await prisma.trainingRecord.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TrainingRecordCreateManyAndReturnArgs>(args?: SelectSubset<T, TrainingRecordCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TrainingRecordPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a TrainingRecord.
     * @param {TrainingRecordDeleteArgs} args - Arguments to delete one TrainingRecord.
     * @example
     * // Delete one TrainingRecord
     * const TrainingRecord = await prisma.trainingRecord.delete({
     *   where: {
     *     // ... filter to delete one TrainingRecord
     *   }
     * })
     * 
     */
    delete<T extends TrainingRecordDeleteArgs>(args: SelectSubset<T, TrainingRecordDeleteArgs<ExtArgs>>): Prisma__TrainingRecordClient<$Result.GetResult<Prisma.$TrainingRecordPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one TrainingRecord.
     * @param {TrainingRecordUpdateArgs} args - Arguments to update one TrainingRecord.
     * @example
     * // Update one TrainingRecord
     * const trainingRecord = await prisma.trainingRecord.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TrainingRecordUpdateArgs>(args: SelectSubset<T, TrainingRecordUpdateArgs<ExtArgs>>): Prisma__TrainingRecordClient<$Result.GetResult<Prisma.$TrainingRecordPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more TrainingRecords.
     * @param {TrainingRecordDeleteManyArgs} args - Arguments to filter TrainingRecords to delete.
     * @example
     * // Delete a few TrainingRecords
     * const { count } = await prisma.trainingRecord.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TrainingRecordDeleteManyArgs>(args?: SelectSubset<T, TrainingRecordDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TrainingRecords.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrainingRecordUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TrainingRecords
     * const trainingRecord = await prisma.trainingRecord.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TrainingRecordUpdateManyArgs>(args: SelectSubset<T, TrainingRecordUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TrainingRecords and returns the data updated in the database.
     * @param {TrainingRecordUpdateManyAndReturnArgs} args - Arguments to update many TrainingRecords.
     * @example
     * // Update many TrainingRecords
     * const trainingRecord = await prisma.trainingRecord.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more TrainingRecords and only return the `id`
     * const trainingRecordWithIdOnly = await prisma.trainingRecord.updateManyAndReturn({
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
    updateManyAndReturn<T extends TrainingRecordUpdateManyAndReturnArgs>(args: SelectSubset<T, TrainingRecordUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TrainingRecordPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one TrainingRecord.
     * @param {TrainingRecordUpsertArgs} args - Arguments to update or create a TrainingRecord.
     * @example
     * // Update or create a TrainingRecord
     * const trainingRecord = await prisma.trainingRecord.upsert({
     *   create: {
     *     // ... data to create a TrainingRecord
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TrainingRecord we want to update
     *   }
     * })
     */
    upsert<T extends TrainingRecordUpsertArgs>(args: SelectSubset<T, TrainingRecordUpsertArgs<ExtArgs>>): Prisma__TrainingRecordClient<$Result.GetResult<Prisma.$TrainingRecordPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of TrainingRecords.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrainingRecordCountArgs} args - Arguments to filter TrainingRecords to count.
     * @example
     * // Count the number of TrainingRecords
     * const count = await prisma.trainingRecord.count({
     *   where: {
     *     // ... the filter for the TrainingRecords we want to count
     *   }
     * })
    **/
    count<T extends TrainingRecordCountArgs>(
      args?: Subset<T, TrainingRecordCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TrainingRecordCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TrainingRecord.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrainingRecordAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends TrainingRecordAggregateArgs>(args: Subset<T, TrainingRecordAggregateArgs>): Prisma.PrismaPromise<GetTrainingRecordAggregateType<T>>

    /**
     * Group by TrainingRecord.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrainingRecordGroupByArgs} args - Group by arguments.
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
      T extends TrainingRecordGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TrainingRecordGroupByArgs['orderBy'] }
        : { orderBy?: TrainingRecordGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, TrainingRecordGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTrainingRecordGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the TrainingRecord model
   */
  readonly fields: TrainingRecordFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for TrainingRecord.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TrainingRecordClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    course<T extends TrainingRecord$courseArgs<ExtArgs> = {}>(args?: Subset<T, TrainingRecord$courseArgs<ExtArgs>>): Prisma__CourseClient<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    evaluations<T extends TrainingRecord$evaluationsArgs<ExtArgs> = {}>(args?: Subset<T, TrainingRecord$evaluationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$KirkpatrickEvaluationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the TrainingRecord model
   */
  interface TrainingRecordFieldRefs {
    readonly id: FieldRef<"TrainingRecord", 'String'>
    readonly course_id: FieldRef<"TrainingRecord", 'String'>
    readonly employee_id: FieldRef<"TrainingRecord", 'String'>
    readonly course_code: FieldRef<"TrainingRecord", 'String'>
    readonly course_name_en: FieldRef<"TrainingRecord", 'String'>
    readonly course_name_th: FieldRef<"TrainingRecord", 'String'>
    readonly training_type: FieldRef<"TrainingRecord", 'String'>
    readonly category: FieldRef<"TrainingRecord", 'String'>
    readonly provider: FieldRef<"TrainingRecord", 'String'>
    readonly instructor_name: FieldRef<"TrainingRecord", 'String'>
    readonly start_date: FieldRef<"TrainingRecord", 'DateTime'>
    readonly end_date: FieldRef<"TrainingRecord", 'DateTime'>
    readonly duration_hours: FieldRef<"TrainingRecord", 'Int'>
    readonly location: FieldRef<"TrainingRecord", 'String'>
    readonly status: FieldRef<"TrainingRecord", 'String'>
    readonly completion_date: FieldRef<"TrainingRecord", 'DateTime'>
    readonly certificate_id: FieldRef<"TrainingRecord", 'String'>
    readonly cost: FieldRef<"TrainingRecord", 'Float'>
    readonly currency: FieldRef<"TrainingRecord", 'String'>
    readonly paid_by: FieldRef<"TrainingRecord", 'String'>
    readonly pre_assessment_score: FieldRef<"TrainingRecord", 'Float'>
    readonly post_assessment_score: FieldRef<"TrainingRecord", 'Float'>
    readonly instructor_rating: FieldRef<"TrainingRecord", 'Float'>
    readonly course_rating: FieldRef<"TrainingRecord", 'Float'>
    readonly feedback: FieldRef<"TrainingRecord", 'String'>
    readonly created_at: FieldRef<"TrainingRecord", 'DateTime'>
    readonly updated_at: FieldRef<"TrainingRecord", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * TrainingRecord findUnique
   */
  export type TrainingRecordFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrainingRecord
     */
    select?: TrainingRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrainingRecord
     */
    omit?: TrainingRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrainingRecordInclude<ExtArgs> | null
    /**
     * Filter, which TrainingRecord to fetch.
     */
    where: TrainingRecordWhereUniqueInput
  }

  /**
   * TrainingRecord findUniqueOrThrow
   */
  export type TrainingRecordFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrainingRecord
     */
    select?: TrainingRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrainingRecord
     */
    omit?: TrainingRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrainingRecordInclude<ExtArgs> | null
    /**
     * Filter, which TrainingRecord to fetch.
     */
    where: TrainingRecordWhereUniqueInput
  }

  /**
   * TrainingRecord findFirst
   */
  export type TrainingRecordFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrainingRecord
     */
    select?: TrainingRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrainingRecord
     */
    omit?: TrainingRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrainingRecordInclude<ExtArgs> | null
    /**
     * Filter, which TrainingRecord to fetch.
     */
    where?: TrainingRecordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TrainingRecords to fetch.
     */
    orderBy?: TrainingRecordOrderByWithRelationInput | TrainingRecordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TrainingRecords.
     */
    cursor?: TrainingRecordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TrainingRecords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TrainingRecords.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TrainingRecords.
     */
    distinct?: TrainingRecordScalarFieldEnum | TrainingRecordScalarFieldEnum[]
  }

  /**
   * TrainingRecord findFirstOrThrow
   */
  export type TrainingRecordFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrainingRecord
     */
    select?: TrainingRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrainingRecord
     */
    omit?: TrainingRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrainingRecordInclude<ExtArgs> | null
    /**
     * Filter, which TrainingRecord to fetch.
     */
    where?: TrainingRecordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TrainingRecords to fetch.
     */
    orderBy?: TrainingRecordOrderByWithRelationInput | TrainingRecordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TrainingRecords.
     */
    cursor?: TrainingRecordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TrainingRecords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TrainingRecords.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TrainingRecords.
     */
    distinct?: TrainingRecordScalarFieldEnum | TrainingRecordScalarFieldEnum[]
  }

  /**
   * TrainingRecord findMany
   */
  export type TrainingRecordFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrainingRecord
     */
    select?: TrainingRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrainingRecord
     */
    omit?: TrainingRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrainingRecordInclude<ExtArgs> | null
    /**
     * Filter, which TrainingRecords to fetch.
     */
    where?: TrainingRecordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TrainingRecords to fetch.
     */
    orderBy?: TrainingRecordOrderByWithRelationInput | TrainingRecordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TrainingRecords.
     */
    cursor?: TrainingRecordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TrainingRecords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TrainingRecords.
     */
    skip?: number
    distinct?: TrainingRecordScalarFieldEnum | TrainingRecordScalarFieldEnum[]
  }

  /**
   * TrainingRecord create
   */
  export type TrainingRecordCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrainingRecord
     */
    select?: TrainingRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrainingRecord
     */
    omit?: TrainingRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrainingRecordInclude<ExtArgs> | null
    /**
     * The data needed to create a TrainingRecord.
     */
    data: XOR<TrainingRecordCreateInput, TrainingRecordUncheckedCreateInput>
  }

  /**
   * TrainingRecord createMany
   */
  export type TrainingRecordCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many TrainingRecords.
     */
    data: TrainingRecordCreateManyInput | TrainingRecordCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * TrainingRecord createManyAndReturn
   */
  export type TrainingRecordCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrainingRecord
     */
    select?: TrainingRecordSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TrainingRecord
     */
    omit?: TrainingRecordOmit<ExtArgs> | null
    /**
     * The data used to create many TrainingRecords.
     */
    data: TrainingRecordCreateManyInput | TrainingRecordCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrainingRecordIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * TrainingRecord update
   */
  export type TrainingRecordUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrainingRecord
     */
    select?: TrainingRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrainingRecord
     */
    omit?: TrainingRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrainingRecordInclude<ExtArgs> | null
    /**
     * The data needed to update a TrainingRecord.
     */
    data: XOR<TrainingRecordUpdateInput, TrainingRecordUncheckedUpdateInput>
    /**
     * Choose, which TrainingRecord to update.
     */
    where: TrainingRecordWhereUniqueInput
  }

  /**
   * TrainingRecord updateMany
   */
  export type TrainingRecordUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update TrainingRecords.
     */
    data: XOR<TrainingRecordUpdateManyMutationInput, TrainingRecordUncheckedUpdateManyInput>
    /**
     * Filter which TrainingRecords to update
     */
    where?: TrainingRecordWhereInput
    /**
     * Limit how many TrainingRecords to update.
     */
    limit?: number
  }

  /**
   * TrainingRecord updateManyAndReturn
   */
  export type TrainingRecordUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrainingRecord
     */
    select?: TrainingRecordSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TrainingRecord
     */
    omit?: TrainingRecordOmit<ExtArgs> | null
    /**
     * The data used to update TrainingRecords.
     */
    data: XOR<TrainingRecordUpdateManyMutationInput, TrainingRecordUncheckedUpdateManyInput>
    /**
     * Filter which TrainingRecords to update
     */
    where?: TrainingRecordWhereInput
    /**
     * Limit how many TrainingRecords to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrainingRecordIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * TrainingRecord upsert
   */
  export type TrainingRecordUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrainingRecord
     */
    select?: TrainingRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrainingRecord
     */
    omit?: TrainingRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrainingRecordInclude<ExtArgs> | null
    /**
     * The filter to search for the TrainingRecord to update in case it exists.
     */
    where: TrainingRecordWhereUniqueInput
    /**
     * In case the TrainingRecord found by the `where` argument doesn't exist, create a new TrainingRecord with this data.
     */
    create: XOR<TrainingRecordCreateInput, TrainingRecordUncheckedCreateInput>
    /**
     * In case the TrainingRecord was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TrainingRecordUpdateInput, TrainingRecordUncheckedUpdateInput>
  }

  /**
   * TrainingRecord delete
   */
  export type TrainingRecordDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrainingRecord
     */
    select?: TrainingRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrainingRecord
     */
    omit?: TrainingRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrainingRecordInclude<ExtArgs> | null
    /**
     * Filter which TrainingRecord to delete.
     */
    where: TrainingRecordWhereUniqueInput
  }

  /**
   * TrainingRecord deleteMany
   */
  export type TrainingRecordDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TrainingRecords to delete
     */
    where?: TrainingRecordWhereInput
    /**
     * Limit how many TrainingRecords to delete.
     */
    limit?: number
  }

  /**
   * TrainingRecord.course
   */
  export type TrainingRecord$courseArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Course
     */
    omit?: CourseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseInclude<ExtArgs> | null
    where?: CourseWhereInput
  }

  /**
   * TrainingRecord.evaluations
   */
  export type TrainingRecord$evaluationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KirkpatrickEvaluation
     */
    select?: KirkpatrickEvaluationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the KirkpatrickEvaluation
     */
    omit?: KirkpatrickEvaluationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KirkpatrickEvaluationInclude<ExtArgs> | null
    where?: KirkpatrickEvaluationWhereInput
    orderBy?: KirkpatrickEvaluationOrderByWithRelationInput | KirkpatrickEvaluationOrderByWithRelationInput[]
    cursor?: KirkpatrickEvaluationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: KirkpatrickEvaluationScalarFieldEnum | KirkpatrickEvaluationScalarFieldEnum[]
  }

  /**
   * TrainingRecord without action
   */
  export type TrainingRecordDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrainingRecord
     */
    select?: TrainingRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrainingRecord
     */
    omit?: TrainingRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrainingRecordInclude<ExtArgs> | null
  }


  /**
   * Model KirkpatrickEvaluation
   */

  export type AggregateKirkpatrickEvaluation = {
    _count: KirkpatrickEvaluationCountAggregateOutputType | null
    _avg: KirkpatrickEvaluationAvgAggregateOutputType | null
    _sum: KirkpatrickEvaluationSumAggregateOutputType | null
    _min: KirkpatrickEvaluationMinAggregateOutputType | null
    _max: KirkpatrickEvaluationMaxAggregateOutputType | null
  }

  export type KirkpatrickEvaluationAvgAggregateOutputType = {
    level: number | null
    score: number | null
  }

  export type KirkpatrickEvaluationSumAggregateOutputType = {
    level: number | null
    score: number | null
  }

  export type KirkpatrickEvaluationMinAggregateOutputType = {
    id: string | null
    training_record_id: string | null
    level: number | null
    level_name: string | null
    score: number | null
    evaluator_id: string | null
    evaluation_date: Date | null
    comments: string | null
    evidence: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type KirkpatrickEvaluationMaxAggregateOutputType = {
    id: string | null
    training_record_id: string | null
    level: number | null
    level_name: string | null
    score: number | null
    evaluator_id: string | null
    evaluation_date: Date | null
    comments: string | null
    evidence: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type KirkpatrickEvaluationCountAggregateOutputType = {
    id: number
    training_record_id: number
    level: number
    level_name: number
    score: number
    evaluator_id: number
    evaluation_date: number
    comments: number
    evidence: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type KirkpatrickEvaluationAvgAggregateInputType = {
    level?: true
    score?: true
  }

  export type KirkpatrickEvaluationSumAggregateInputType = {
    level?: true
    score?: true
  }

  export type KirkpatrickEvaluationMinAggregateInputType = {
    id?: true
    training_record_id?: true
    level?: true
    level_name?: true
    score?: true
    evaluator_id?: true
    evaluation_date?: true
    comments?: true
    evidence?: true
    created_at?: true
    updated_at?: true
  }

  export type KirkpatrickEvaluationMaxAggregateInputType = {
    id?: true
    training_record_id?: true
    level?: true
    level_name?: true
    score?: true
    evaluator_id?: true
    evaluation_date?: true
    comments?: true
    evidence?: true
    created_at?: true
    updated_at?: true
  }

  export type KirkpatrickEvaluationCountAggregateInputType = {
    id?: true
    training_record_id?: true
    level?: true
    level_name?: true
    score?: true
    evaluator_id?: true
    evaluation_date?: true
    comments?: true
    evidence?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type KirkpatrickEvaluationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which KirkpatrickEvaluation to aggregate.
     */
    where?: KirkpatrickEvaluationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of KirkpatrickEvaluations to fetch.
     */
    orderBy?: KirkpatrickEvaluationOrderByWithRelationInput | KirkpatrickEvaluationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: KirkpatrickEvaluationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` KirkpatrickEvaluations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` KirkpatrickEvaluations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned KirkpatrickEvaluations
    **/
    _count?: true | KirkpatrickEvaluationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: KirkpatrickEvaluationAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: KirkpatrickEvaluationSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: KirkpatrickEvaluationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: KirkpatrickEvaluationMaxAggregateInputType
  }

  export type GetKirkpatrickEvaluationAggregateType<T extends KirkpatrickEvaluationAggregateArgs> = {
        [P in keyof T & keyof AggregateKirkpatrickEvaluation]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateKirkpatrickEvaluation[P]>
      : GetScalarType<T[P], AggregateKirkpatrickEvaluation[P]>
  }




  export type KirkpatrickEvaluationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: KirkpatrickEvaluationWhereInput
    orderBy?: KirkpatrickEvaluationOrderByWithAggregationInput | KirkpatrickEvaluationOrderByWithAggregationInput[]
    by: KirkpatrickEvaluationScalarFieldEnum[] | KirkpatrickEvaluationScalarFieldEnum
    having?: KirkpatrickEvaluationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: KirkpatrickEvaluationCountAggregateInputType | true
    _avg?: KirkpatrickEvaluationAvgAggregateInputType
    _sum?: KirkpatrickEvaluationSumAggregateInputType
    _min?: KirkpatrickEvaluationMinAggregateInputType
    _max?: KirkpatrickEvaluationMaxAggregateInputType
  }

  export type KirkpatrickEvaluationGroupByOutputType = {
    id: string
    training_record_id: string
    level: number
    level_name: string
    score: number | null
    evaluator_id: string | null
    evaluation_date: Date | null
    comments: string | null
    evidence: string | null
    created_at: Date
    updated_at: Date
    _count: KirkpatrickEvaluationCountAggregateOutputType | null
    _avg: KirkpatrickEvaluationAvgAggregateOutputType | null
    _sum: KirkpatrickEvaluationSumAggregateOutputType | null
    _min: KirkpatrickEvaluationMinAggregateOutputType | null
    _max: KirkpatrickEvaluationMaxAggregateOutputType | null
  }

  type GetKirkpatrickEvaluationGroupByPayload<T extends KirkpatrickEvaluationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<KirkpatrickEvaluationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof KirkpatrickEvaluationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], KirkpatrickEvaluationGroupByOutputType[P]>
            : GetScalarType<T[P], KirkpatrickEvaluationGroupByOutputType[P]>
        }
      >
    >


  export type KirkpatrickEvaluationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    training_record_id?: boolean
    level?: boolean
    level_name?: boolean
    score?: boolean
    evaluator_id?: boolean
    evaluation_date?: boolean
    comments?: boolean
    evidence?: boolean
    created_at?: boolean
    updated_at?: boolean
    training_record?: boolean | TrainingRecordDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["kirkpatrickEvaluation"]>

  export type KirkpatrickEvaluationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    training_record_id?: boolean
    level?: boolean
    level_name?: boolean
    score?: boolean
    evaluator_id?: boolean
    evaluation_date?: boolean
    comments?: boolean
    evidence?: boolean
    created_at?: boolean
    updated_at?: boolean
    training_record?: boolean | TrainingRecordDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["kirkpatrickEvaluation"]>

  export type KirkpatrickEvaluationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    training_record_id?: boolean
    level?: boolean
    level_name?: boolean
    score?: boolean
    evaluator_id?: boolean
    evaluation_date?: boolean
    comments?: boolean
    evidence?: boolean
    created_at?: boolean
    updated_at?: boolean
    training_record?: boolean | TrainingRecordDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["kirkpatrickEvaluation"]>

  export type KirkpatrickEvaluationSelectScalar = {
    id?: boolean
    training_record_id?: boolean
    level?: boolean
    level_name?: boolean
    score?: boolean
    evaluator_id?: boolean
    evaluation_date?: boolean
    comments?: boolean
    evidence?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type KirkpatrickEvaluationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "training_record_id" | "level" | "level_name" | "score" | "evaluator_id" | "evaluation_date" | "comments" | "evidence" | "created_at" | "updated_at", ExtArgs["result"]["kirkpatrickEvaluation"]>
  export type KirkpatrickEvaluationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    training_record?: boolean | TrainingRecordDefaultArgs<ExtArgs>
  }
  export type KirkpatrickEvaluationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    training_record?: boolean | TrainingRecordDefaultArgs<ExtArgs>
  }
  export type KirkpatrickEvaluationIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    training_record?: boolean | TrainingRecordDefaultArgs<ExtArgs>
  }

  export type $KirkpatrickEvaluationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "KirkpatrickEvaluation"
    objects: {
      training_record: Prisma.$TrainingRecordPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      training_record_id: string
      level: number
      level_name: string
      score: number | null
      evaluator_id: string | null
      evaluation_date: Date | null
      comments: string | null
      evidence: string | null
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["kirkpatrickEvaluation"]>
    composites: {}
  }

  type KirkpatrickEvaluationGetPayload<S extends boolean | null | undefined | KirkpatrickEvaluationDefaultArgs> = $Result.GetResult<Prisma.$KirkpatrickEvaluationPayload, S>

  type KirkpatrickEvaluationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<KirkpatrickEvaluationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: KirkpatrickEvaluationCountAggregateInputType | true
    }

  export interface KirkpatrickEvaluationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['KirkpatrickEvaluation'], meta: { name: 'KirkpatrickEvaluation' } }
    /**
     * Find zero or one KirkpatrickEvaluation that matches the filter.
     * @param {KirkpatrickEvaluationFindUniqueArgs} args - Arguments to find a KirkpatrickEvaluation
     * @example
     * // Get one KirkpatrickEvaluation
     * const kirkpatrickEvaluation = await prisma.kirkpatrickEvaluation.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends KirkpatrickEvaluationFindUniqueArgs>(args: SelectSubset<T, KirkpatrickEvaluationFindUniqueArgs<ExtArgs>>): Prisma__KirkpatrickEvaluationClient<$Result.GetResult<Prisma.$KirkpatrickEvaluationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one KirkpatrickEvaluation that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {KirkpatrickEvaluationFindUniqueOrThrowArgs} args - Arguments to find a KirkpatrickEvaluation
     * @example
     * // Get one KirkpatrickEvaluation
     * const kirkpatrickEvaluation = await prisma.kirkpatrickEvaluation.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends KirkpatrickEvaluationFindUniqueOrThrowArgs>(args: SelectSubset<T, KirkpatrickEvaluationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__KirkpatrickEvaluationClient<$Result.GetResult<Prisma.$KirkpatrickEvaluationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first KirkpatrickEvaluation that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KirkpatrickEvaluationFindFirstArgs} args - Arguments to find a KirkpatrickEvaluation
     * @example
     * // Get one KirkpatrickEvaluation
     * const kirkpatrickEvaluation = await prisma.kirkpatrickEvaluation.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends KirkpatrickEvaluationFindFirstArgs>(args?: SelectSubset<T, KirkpatrickEvaluationFindFirstArgs<ExtArgs>>): Prisma__KirkpatrickEvaluationClient<$Result.GetResult<Prisma.$KirkpatrickEvaluationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first KirkpatrickEvaluation that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KirkpatrickEvaluationFindFirstOrThrowArgs} args - Arguments to find a KirkpatrickEvaluation
     * @example
     * // Get one KirkpatrickEvaluation
     * const kirkpatrickEvaluation = await prisma.kirkpatrickEvaluation.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends KirkpatrickEvaluationFindFirstOrThrowArgs>(args?: SelectSubset<T, KirkpatrickEvaluationFindFirstOrThrowArgs<ExtArgs>>): Prisma__KirkpatrickEvaluationClient<$Result.GetResult<Prisma.$KirkpatrickEvaluationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more KirkpatrickEvaluations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KirkpatrickEvaluationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all KirkpatrickEvaluations
     * const kirkpatrickEvaluations = await prisma.kirkpatrickEvaluation.findMany()
     * 
     * // Get first 10 KirkpatrickEvaluations
     * const kirkpatrickEvaluations = await prisma.kirkpatrickEvaluation.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const kirkpatrickEvaluationWithIdOnly = await prisma.kirkpatrickEvaluation.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends KirkpatrickEvaluationFindManyArgs>(args?: SelectSubset<T, KirkpatrickEvaluationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$KirkpatrickEvaluationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a KirkpatrickEvaluation.
     * @param {KirkpatrickEvaluationCreateArgs} args - Arguments to create a KirkpatrickEvaluation.
     * @example
     * // Create one KirkpatrickEvaluation
     * const KirkpatrickEvaluation = await prisma.kirkpatrickEvaluation.create({
     *   data: {
     *     // ... data to create a KirkpatrickEvaluation
     *   }
     * })
     * 
     */
    create<T extends KirkpatrickEvaluationCreateArgs>(args: SelectSubset<T, KirkpatrickEvaluationCreateArgs<ExtArgs>>): Prisma__KirkpatrickEvaluationClient<$Result.GetResult<Prisma.$KirkpatrickEvaluationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many KirkpatrickEvaluations.
     * @param {KirkpatrickEvaluationCreateManyArgs} args - Arguments to create many KirkpatrickEvaluations.
     * @example
     * // Create many KirkpatrickEvaluations
     * const kirkpatrickEvaluation = await prisma.kirkpatrickEvaluation.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends KirkpatrickEvaluationCreateManyArgs>(args?: SelectSubset<T, KirkpatrickEvaluationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many KirkpatrickEvaluations and returns the data saved in the database.
     * @param {KirkpatrickEvaluationCreateManyAndReturnArgs} args - Arguments to create many KirkpatrickEvaluations.
     * @example
     * // Create many KirkpatrickEvaluations
     * const kirkpatrickEvaluation = await prisma.kirkpatrickEvaluation.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many KirkpatrickEvaluations and only return the `id`
     * const kirkpatrickEvaluationWithIdOnly = await prisma.kirkpatrickEvaluation.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends KirkpatrickEvaluationCreateManyAndReturnArgs>(args?: SelectSubset<T, KirkpatrickEvaluationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$KirkpatrickEvaluationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a KirkpatrickEvaluation.
     * @param {KirkpatrickEvaluationDeleteArgs} args - Arguments to delete one KirkpatrickEvaluation.
     * @example
     * // Delete one KirkpatrickEvaluation
     * const KirkpatrickEvaluation = await prisma.kirkpatrickEvaluation.delete({
     *   where: {
     *     // ... filter to delete one KirkpatrickEvaluation
     *   }
     * })
     * 
     */
    delete<T extends KirkpatrickEvaluationDeleteArgs>(args: SelectSubset<T, KirkpatrickEvaluationDeleteArgs<ExtArgs>>): Prisma__KirkpatrickEvaluationClient<$Result.GetResult<Prisma.$KirkpatrickEvaluationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one KirkpatrickEvaluation.
     * @param {KirkpatrickEvaluationUpdateArgs} args - Arguments to update one KirkpatrickEvaluation.
     * @example
     * // Update one KirkpatrickEvaluation
     * const kirkpatrickEvaluation = await prisma.kirkpatrickEvaluation.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends KirkpatrickEvaluationUpdateArgs>(args: SelectSubset<T, KirkpatrickEvaluationUpdateArgs<ExtArgs>>): Prisma__KirkpatrickEvaluationClient<$Result.GetResult<Prisma.$KirkpatrickEvaluationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more KirkpatrickEvaluations.
     * @param {KirkpatrickEvaluationDeleteManyArgs} args - Arguments to filter KirkpatrickEvaluations to delete.
     * @example
     * // Delete a few KirkpatrickEvaluations
     * const { count } = await prisma.kirkpatrickEvaluation.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends KirkpatrickEvaluationDeleteManyArgs>(args?: SelectSubset<T, KirkpatrickEvaluationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more KirkpatrickEvaluations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KirkpatrickEvaluationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many KirkpatrickEvaluations
     * const kirkpatrickEvaluation = await prisma.kirkpatrickEvaluation.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends KirkpatrickEvaluationUpdateManyArgs>(args: SelectSubset<T, KirkpatrickEvaluationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more KirkpatrickEvaluations and returns the data updated in the database.
     * @param {KirkpatrickEvaluationUpdateManyAndReturnArgs} args - Arguments to update many KirkpatrickEvaluations.
     * @example
     * // Update many KirkpatrickEvaluations
     * const kirkpatrickEvaluation = await prisma.kirkpatrickEvaluation.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more KirkpatrickEvaluations and only return the `id`
     * const kirkpatrickEvaluationWithIdOnly = await prisma.kirkpatrickEvaluation.updateManyAndReturn({
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
    updateManyAndReturn<T extends KirkpatrickEvaluationUpdateManyAndReturnArgs>(args: SelectSubset<T, KirkpatrickEvaluationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$KirkpatrickEvaluationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one KirkpatrickEvaluation.
     * @param {KirkpatrickEvaluationUpsertArgs} args - Arguments to update or create a KirkpatrickEvaluation.
     * @example
     * // Update or create a KirkpatrickEvaluation
     * const kirkpatrickEvaluation = await prisma.kirkpatrickEvaluation.upsert({
     *   create: {
     *     // ... data to create a KirkpatrickEvaluation
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the KirkpatrickEvaluation we want to update
     *   }
     * })
     */
    upsert<T extends KirkpatrickEvaluationUpsertArgs>(args: SelectSubset<T, KirkpatrickEvaluationUpsertArgs<ExtArgs>>): Prisma__KirkpatrickEvaluationClient<$Result.GetResult<Prisma.$KirkpatrickEvaluationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of KirkpatrickEvaluations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KirkpatrickEvaluationCountArgs} args - Arguments to filter KirkpatrickEvaluations to count.
     * @example
     * // Count the number of KirkpatrickEvaluations
     * const count = await prisma.kirkpatrickEvaluation.count({
     *   where: {
     *     // ... the filter for the KirkpatrickEvaluations we want to count
     *   }
     * })
    **/
    count<T extends KirkpatrickEvaluationCountArgs>(
      args?: Subset<T, KirkpatrickEvaluationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], KirkpatrickEvaluationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a KirkpatrickEvaluation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KirkpatrickEvaluationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends KirkpatrickEvaluationAggregateArgs>(args: Subset<T, KirkpatrickEvaluationAggregateArgs>): Prisma.PrismaPromise<GetKirkpatrickEvaluationAggregateType<T>>

    /**
     * Group by KirkpatrickEvaluation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KirkpatrickEvaluationGroupByArgs} args - Group by arguments.
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
      T extends KirkpatrickEvaluationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: KirkpatrickEvaluationGroupByArgs['orderBy'] }
        : { orderBy?: KirkpatrickEvaluationGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, KirkpatrickEvaluationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetKirkpatrickEvaluationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the KirkpatrickEvaluation model
   */
  readonly fields: KirkpatrickEvaluationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for KirkpatrickEvaluation.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__KirkpatrickEvaluationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    training_record<T extends TrainingRecordDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TrainingRecordDefaultArgs<ExtArgs>>): Prisma__TrainingRecordClient<$Result.GetResult<Prisma.$TrainingRecordPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the KirkpatrickEvaluation model
   */
  interface KirkpatrickEvaluationFieldRefs {
    readonly id: FieldRef<"KirkpatrickEvaluation", 'String'>
    readonly training_record_id: FieldRef<"KirkpatrickEvaluation", 'String'>
    readonly level: FieldRef<"KirkpatrickEvaluation", 'Int'>
    readonly level_name: FieldRef<"KirkpatrickEvaluation", 'String'>
    readonly score: FieldRef<"KirkpatrickEvaluation", 'Float'>
    readonly evaluator_id: FieldRef<"KirkpatrickEvaluation", 'String'>
    readonly evaluation_date: FieldRef<"KirkpatrickEvaluation", 'DateTime'>
    readonly comments: FieldRef<"KirkpatrickEvaluation", 'String'>
    readonly evidence: FieldRef<"KirkpatrickEvaluation", 'String'>
    readonly created_at: FieldRef<"KirkpatrickEvaluation", 'DateTime'>
    readonly updated_at: FieldRef<"KirkpatrickEvaluation", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * KirkpatrickEvaluation findUnique
   */
  export type KirkpatrickEvaluationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KirkpatrickEvaluation
     */
    select?: KirkpatrickEvaluationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the KirkpatrickEvaluation
     */
    omit?: KirkpatrickEvaluationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KirkpatrickEvaluationInclude<ExtArgs> | null
    /**
     * Filter, which KirkpatrickEvaluation to fetch.
     */
    where: KirkpatrickEvaluationWhereUniqueInput
  }

  /**
   * KirkpatrickEvaluation findUniqueOrThrow
   */
  export type KirkpatrickEvaluationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KirkpatrickEvaluation
     */
    select?: KirkpatrickEvaluationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the KirkpatrickEvaluation
     */
    omit?: KirkpatrickEvaluationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KirkpatrickEvaluationInclude<ExtArgs> | null
    /**
     * Filter, which KirkpatrickEvaluation to fetch.
     */
    where: KirkpatrickEvaluationWhereUniqueInput
  }

  /**
   * KirkpatrickEvaluation findFirst
   */
  export type KirkpatrickEvaluationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KirkpatrickEvaluation
     */
    select?: KirkpatrickEvaluationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the KirkpatrickEvaluation
     */
    omit?: KirkpatrickEvaluationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KirkpatrickEvaluationInclude<ExtArgs> | null
    /**
     * Filter, which KirkpatrickEvaluation to fetch.
     */
    where?: KirkpatrickEvaluationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of KirkpatrickEvaluations to fetch.
     */
    orderBy?: KirkpatrickEvaluationOrderByWithRelationInput | KirkpatrickEvaluationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for KirkpatrickEvaluations.
     */
    cursor?: KirkpatrickEvaluationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` KirkpatrickEvaluations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` KirkpatrickEvaluations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of KirkpatrickEvaluations.
     */
    distinct?: KirkpatrickEvaluationScalarFieldEnum | KirkpatrickEvaluationScalarFieldEnum[]
  }

  /**
   * KirkpatrickEvaluation findFirstOrThrow
   */
  export type KirkpatrickEvaluationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KirkpatrickEvaluation
     */
    select?: KirkpatrickEvaluationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the KirkpatrickEvaluation
     */
    omit?: KirkpatrickEvaluationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KirkpatrickEvaluationInclude<ExtArgs> | null
    /**
     * Filter, which KirkpatrickEvaluation to fetch.
     */
    where?: KirkpatrickEvaluationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of KirkpatrickEvaluations to fetch.
     */
    orderBy?: KirkpatrickEvaluationOrderByWithRelationInput | KirkpatrickEvaluationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for KirkpatrickEvaluations.
     */
    cursor?: KirkpatrickEvaluationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` KirkpatrickEvaluations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` KirkpatrickEvaluations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of KirkpatrickEvaluations.
     */
    distinct?: KirkpatrickEvaluationScalarFieldEnum | KirkpatrickEvaluationScalarFieldEnum[]
  }

  /**
   * KirkpatrickEvaluation findMany
   */
  export type KirkpatrickEvaluationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KirkpatrickEvaluation
     */
    select?: KirkpatrickEvaluationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the KirkpatrickEvaluation
     */
    omit?: KirkpatrickEvaluationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KirkpatrickEvaluationInclude<ExtArgs> | null
    /**
     * Filter, which KirkpatrickEvaluations to fetch.
     */
    where?: KirkpatrickEvaluationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of KirkpatrickEvaluations to fetch.
     */
    orderBy?: KirkpatrickEvaluationOrderByWithRelationInput | KirkpatrickEvaluationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing KirkpatrickEvaluations.
     */
    cursor?: KirkpatrickEvaluationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` KirkpatrickEvaluations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` KirkpatrickEvaluations.
     */
    skip?: number
    distinct?: KirkpatrickEvaluationScalarFieldEnum | KirkpatrickEvaluationScalarFieldEnum[]
  }

  /**
   * KirkpatrickEvaluation create
   */
  export type KirkpatrickEvaluationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KirkpatrickEvaluation
     */
    select?: KirkpatrickEvaluationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the KirkpatrickEvaluation
     */
    omit?: KirkpatrickEvaluationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KirkpatrickEvaluationInclude<ExtArgs> | null
    /**
     * The data needed to create a KirkpatrickEvaluation.
     */
    data: XOR<KirkpatrickEvaluationCreateInput, KirkpatrickEvaluationUncheckedCreateInput>
  }

  /**
   * KirkpatrickEvaluation createMany
   */
  export type KirkpatrickEvaluationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many KirkpatrickEvaluations.
     */
    data: KirkpatrickEvaluationCreateManyInput | KirkpatrickEvaluationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * KirkpatrickEvaluation createManyAndReturn
   */
  export type KirkpatrickEvaluationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KirkpatrickEvaluation
     */
    select?: KirkpatrickEvaluationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the KirkpatrickEvaluation
     */
    omit?: KirkpatrickEvaluationOmit<ExtArgs> | null
    /**
     * The data used to create many KirkpatrickEvaluations.
     */
    data: KirkpatrickEvaluationCreateManyInput | KirkpatrickEvaluationCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KirkpatrickEvaluationIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * KirkpatrickEvaluation update
   */
  export type KirkpatrickEvaluationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KirkpatrickEvaluation
     */
    select?: KirkpatrickEvaluationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the KirkpatrickEvaluation
     */
    omit?: KirkpatrickEvaluationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KirkpatrickEvaluationInclude<ExtArgs> | null
    /**
     * The data needed to update a KirkpatrickEvaluation.
     */
    data: XOR<KirkpatrickEvaluationUpdateInput, KirkpatrickEvaluationUncheckedUpdateInput>
    /**
     * Choose, which KirkpatrickEvaluation to update.
     */
    where: KirkpatrickEvaluationWhereUniqueInput
  }

  /**
   * KirkpatrickEvaluation updateMany
   */
  export type KirkpatrickEvaluationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update KirkpatrickEvaluations.
     */
    data: XOR<KirkpatrickEvaluationUpdateManyMutationInput, KirkpatrickEvaluationUncheckedUpdateManyInput>
    /**
     * Filter which KirkpatrickEvaluations to update
     */
    where?: KirkpatrickEvaluationWhereInput
    /**
     * Limit how many KirkpatrickEvaluations to update.
     */
    limit?: number
  }

  /**
   * KirkpatrickEvaluation updateManyAndReturn
   */
  export type KirkpatrickEvaluationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KirkpatrickEvaluation
     */
    select?: KirkpatrickEvaluationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the KirkpatrickEvaluation
     */
    omit?: KirkpatrickEvaluationOmit<ExtArgs> | null
    /**
     * The data used to update KirkpatrickEvaluations.
     */
    data: XOR<KirkpatrickEvaluationUpdateManyMutationInput, KirkpatrickEvaluationUncheckedUpdateManyInput>
    /**
     * Filter which KirkpatrickEvaluations to update
     */
    where?: KirkpatrickEvaluationWhereInput
    /**
     * Limit how many KirkpatrickEvaluations to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KirkpatrickEvaluationIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * KirkpatrickEvaluation upsert
   */
  export type KirkpatrickEvaluationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KirkpatrickEvaluation
     */
    select?: KirkpatrickEvaluationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the KirkpatrickEvaluation
     */
    omit?: KirkpatrickEvaluationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KirkpatrickEvaluationInclude<ExtArgs> | null
    /**
     * The filter to search for the KirkpatrickEvaluation to update in case it exists.
     */
    where: KirkpatrickEvaluationWhereUniqueInput
    /**
     * In case the KirkpatrickEvaluation found by the `where` argument doesn't exist, create a new KirkpatrickEvaluation with this data.
     */
    create: XOR<KirkpatrickEvaluationCreateInput, KirkpatrickEvaluationUncheckedCreateInput>
    /**
     * In case the KirkpatrickEvaluation was found with the provided `where` argument, update it with this data.
     */
    update: XOR<KirkpatrickEvaluationUpdateInput, KirkpatrickEvaluationUncheckedUpdateInput>
  }

  /**
   * KirkpatrickEvaluation delete
   */
  export type KirkpatrickEvaluationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KirkpatrickEvaluation
     */
    select?: KirkpatrickEvaluationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the KirkpatrickEvaluation
     */
    omit?: KirkpatrickEvaluationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KirkpatrickEvaluationInclude<ExtArgs> | null
    /**
     * Filter which KirkpatrickEvaluation to delete.
     */
    where: KirkpatrickEvaluationWhereUniqueInput
  }

  /**
   * KirkpatrickEvaluation deleteMany
   */
  export type KirkpatrickEvaluationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which KirkpatrickEvaluations to delete
     */
    where?: KirkpatrickEvaluationWhereInput
    /**
     * Limit how many KirkpatrickEvaluations to delete.
     */
    limit?: number
  }

  /**
   * KirkpatrickEvaluation without action
   */
  export type KirkpatrickEvaluationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KirkpatrickEvaluation
     */
    select?: KirkpatrickEvaluationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the KirkpatrickEvaluation
     */
    omit?: KirkpatrickEvaluationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KirkpatrickEvaluationInclude<ExtArgs> | null
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


  export const CourseScalarFieldEnum: {
    id: 'id',
    code: 'code',
    name_en: 'name_en',
    name_th: 'name_th',
    description_en: 'description_en',
    description_th: 'description_th',
    category: 'category',
    delivery_method: 'delivery_method',
    duration_hours: 'duration_hours',
    credits: 'credits',
    level: 'level',
    mandatory: 'mandatory',
    max_participants: 'max_participants',
    prerequisites: 'prerequisites',
    status: 'status',
    rating: 'rating',
    review_count: 'review_count',
    instructor_ids: 'instructor_ids',
    target_audience: 'target_audience',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type CourseScalarFieldEnum = (typeof CourseScalarFieldEnum)[keyof typeof CourseScalarFieldEnum]


  export const EnrollmentScalarFieldEnum: {
    id: 'id',
    course_id: 'course_id',
    employee_id: 'employee_id',
    schedule_id: 'schedule_id',
    status: 'status',
    enrollment_date: 'enrollment_date',
    completion_date: 'completion_date',
    score: 'score',
    progress: 'progress',
    certificate_id: 'certificate_id',
    attendance_rate: 'attendance_rate',
    feedback: 'feedback',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type EnrollmentScalarFieldEnum = (typeof EnrollmentScalarFieldEnum)[keyof typeof EnrollmentScalarFieldEnum]


  export const TrainingRecordScalarFieldEnum: {
    id: 'id',
    course_id: 'course_id',
    employee_id: 'employee_id',
    course_code: 'course_code',
    course_name_en: 'course_name_en',
    course_name_th: 'course_name_th',
    training_type: 'training_type',
    category: 'category',
    provider: 'provider',
    instructor_name: 'instructor_name',
    start_date: 'start_date',
    end_date: 'end_date',
    duration_hours: 'duration_hours',
    location: 'location',
    status: 'status',
    completion_date: 'completion_date',
    certificate_id: 'certificate_id',
    cost: 'cost',
    currency: 'currency',
    paid_by: 'paid_by',
    pre_assessment_score: 'pre_assessment_score',
    post_assessment_score: 'post_assessment_score',
    instructor_rating: 'instructor_rating',
    course_rating: 'course_rating',
    feedback: 'feedback',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type TrainingRecordScalarFieldEnum = (typeof TrainingRecordScalarFieldEnum)[keyof typeof TrainingRecordScalarFieldEnum]


  export const KirkpatrickEvaluationScalarFieldEnum: {
    id: 'id',
    training_record_id: 'training_record_id',
    level: 'level',
    level_name: 'level_name',
    score: 'score',
    evaluator_id: 'evaluator_id',
    evaluation_date: 'evaluation_date',
    comments: 'comments',
    evidence: 'evidence',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type KirkpatrickEvaluationScalarFieldEnum = (typeof KirkpatrickEvaluationScalarFieldEnum)[keyof typeof KirkpatrickEvaluationScalarFieldEnum]


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
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    
  /**
   * Deep Input Types
   */


  export type CourseWhereInput = {
    AND?: CourseWhereInput | CourseWhereInput[]
    OR?: CourseWhereInput[]
    NOT?: CourseWhereInput | CourseWhereInput[]
    id?: StringFilter<"Course"> | string
    code?: StringFilter<"Course"> | string
    name_en?: StringFilter<"Course"> | string
    name_th?: StringNullableFilter<"Course"> | string | null
    description_en?: StringNullableFilter<"Course"> | string | null
    description_th?: StringNullableFilter<"Course"> | string | null
    category?: StringFilter<"Course"> | string
    delivery_method?: StringFilter<"Course"> | string
    duration_hours?: IntFilter<"Course"> | number
    credits?: IntFilter<"Course"> | number
    level?: StringFilter<"Course"> | string
    mandatory?: BoolFilter<"Course"> | boolean
    max_participants?: IntFilter<"Course"> | number
    prerequisites?: StringNullableListFilter<"Course">
    status?: StringFilter<"Course"> | string
    rating?: FloatNullableFilter<"Course"> | number | null
    review_count?: IntFilter<"Course"> | number
    instructor_ids?: StringNullableListFilter<"Course">
    target_audience?: StringNullableListFilter<"Course">
    created_at?: DateTimeFilter<"Course"> | Date | string
    updated_at?: DateTimeFilter<"Course"> | Date | string
    enrollments?: EnrollmentListRelationFilter
    training_records?: TrainingRecordListRelationFilter
  }

  export type CourseOrderByWithRelationInput = {
    id?: SortOrder
    code?: SortOrder
    name_en?: SortOrder
    name_th?: SortOrderInput | SortOrder
    description_en?: SortOrderInput | SortOrder
    description_th?: SortOrderInput | SortOrder
    category?: SortOrder
    delivery_method?: SortOrder
    duration_hours?: SortOrder
    credits?: SortOrder
    level?: SortOrder
    mandatory?: SortOrder
    max_participants?: SortOrder
    prerequisites?: SortOrder
    status?: SortOrder
    rating?: SortOrderInput | SortOrder
    review_count?: SortOrder
    instructor_ids?: SortOrder
    target_audience?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    enrollments?: EnrollmentOrderByRelationAggregateInput
    training_records?: TrainingRecordOrderByRelationAggregateInput
  }

  export type CourseWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    code?: string
    AND?: CourseWhereInput | CourseWhereInput[]
    OR?: CourseWhereInput[]
    NOT?: CourseWhereInput | CourseWhereInput[]
    name_en?: StringFilter<"Course"> | string
    name_th?: StringNullableFilter<"Course"> | string | null
    description_en?: StringNullableFilter<"Course"> | string | null
    description_th?: StringNullableFilter<"Course"> | string | null
    category?: StringFilter<"Course"> | string
    delivery_method?: StringFilter<"Course"> | string
    duration_hours?: IntFilter<"Course"> | number
    credits?: IntFilter<"Course"> | number
    level?: StringFilter<"Course"> | string
    mandatory?: BoolFilter<"Course"> | boolean
    max_participants?: IntFilter<"Course"> | number
    prerequisites?: StringNullableListFilter<"Course">
    status?: StringFilter<"Course"> | string
    rating?: FloatNullableFilter<"Course"> | number | null
    review_count?: IntFilter<"Course"> | number
    instructor_ids?: StringNullableListFilter<"Course">
    target_audience?: StringNullableListFilter<"Course">
    created_at?: DateTimeFilter<"Course"> | Date | string
    updated_at?: DateTimeFilter<"Course"> | Date | string
    enrollments?: EnrollmentListRelationFilter
    training_records?: TrainingRecordListRelationFilter
  }, "id" | "code">

  export type CourseOrderByWithAggregationInput = {
    id?: SortOrder
    code?: SortOrder
    name_en?: SortOrder
    name_th?: SortOrderInput | SortOrder
    description_en?: SortOrderInput | SortOrder
    description_th?: SortOrderInput | SortOrder
    category?: SortOrder
    delivery_method?: SortOrder
    duration_hours?: SortOrder
    credits?: SortOrder
    level?: SortOrder
    mandatory?: SortOrder
    max_participants?: SortOrder
    prerequisites?: SortOrder
    status?: SortOrder
    rating?: SortOrderInput | SortOrder
    review_count?: SortOrder
    instructor_ids?: SortOrder
    target_audience?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: CourseCountOrderByAggregateInput
    _avg?: CourseAvgOrderByAggregateInput
    _max?: CourseMaxOrderByAggregateInput
    _min?: CourseMinOrderByAggregateInput
    _sum?: CourseSumOrderByAggregateInput
  }

  export type CourseScalarWhereWithAggregatesInput = {
    AND?: CourseScalarWhereWithAggregatesInput | CourseScalarWhereWithAggregatesInput[]
    OR?: CourseScalarWhereWithAggregatesInput[]
    NOT?: CourseScalarWhereWithAggregatesInput | CourseScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Course"> | string
    code?: StringWithAggregatesFilter<"Course"> | string
    name_en?: StringWithAggregatesFilter<"Course"> | string
    name_th?: StringNullableWithAggregatesFilter<"Course"> | string | null
    description_en?: StringNullableWithAggregatesFilter<"Course"> | string | null
    description_th?: StringNullableWithAggregatesFilter<"Course"> | string | null
    category?: StringWithAggregatesFilter<"Course"> | string
    delivery_method?: StringWithAggregatesFilter<"Course"> | string
    duration_hours?: IntWithAggregatesFilter<"Course"> | number
    credits?: IntWithAggregatesFilter<"Course"> | number
    level?: StringWithAggregatesFilter<"Course"> | string
    mandatory?: BoolWithAggregatesFilter<"Course"> | boolean
    max_participants?: IntWithAggregatesFilter<"Course"> | number
    prerequisites?: StringNullableListFilter<"Course">
    status?: StringWithAggregatesFilter<"Course"> | string
    rating?: FloatNullableWithAggregatesFilter<"Course"> | number | null
    review_count?: IntWithAggregatesFilter<"Course"> | number
    instructor_ids?: StringNullableListFilter<"Course">
    target_audience?: StringNullableListFilter<"Course">
    created_at?: DateTimeWithAggregatesFilter<"Course"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"Course"> | Date | string
  }

  export type EnrollmentWhereInput = {
    AND?: EnrollmentWhereInput | EnrollmentWhereInput[]
    OR?: EnrollmentWhereInput[]
    NOT?: EnrollmentWhereInput | EnrollmentWhereInput[]
    id?: StringFilter<"Enrollment"> | string
    course_id?: StringFilter<"Enrollment"> | string
    employee_id?: StringFilter<"Enrollment"> | string
    schedule_id?: StringNullableFilter<"Enrollment"> | string | null
    status?: StringFilter<"Enrollment"> | string
    enrollment_date?: DateTimeFilter<"Enrollment"> | Date | string
    completion_date?: DateTimeNullableFilter<"Enrollment"> | Date | string | null
    score?: FloatNullableFilter<"Enrollment"> | number | null
    progress?: IntFilter<"Enrollment"> | number
    certificate_id?: StringNullableFilter<"Enrollment"> | string | null
    attendance_rate?: FloatNullableFilter<"Enrollment"> | number | null
    feedback?: StringNullableFilter<"Enrollment"> | string | null
    created_at?: DateTimeFilter<"Enrollment"> | Date | string
    updated_at?: DateTimeFilter<"Enrollment"> | Date | string
    course?: XOR<CourseScalarRelationFilter, CourseWhereInput>
  }

  export type EnrollmentOrderByWithRelationInput = {
    id?: SortOrder
    course_id?: SortOrder
    employee_id?: SortOrder
    schedule_id?: SortOrderInput | SortOrder
    status?: SortOrder
    enrollment_date?: SortOrder
    completion_date?: SortOrderInput | SortOrder
    score?: SortOrderInput | SortOrder
    progress?: SortOrder
    certificate_id?: SortOrderInput | SortOrder
    attendance_rate?: SortOrderInput | SortOrder
    feedback?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    course?: CourseOrderByWithRelationInput
  }

  export type EnrollmentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    course_id_employee_id?: EnrollmentCourse_idEmployee_idCompoundUniqueInput
    AND?: EnrollmentWhereInput | EnrollmentWhereInput[]
    OR?: EnrollmentWhereInput[]
    NOT?: EnrollmentWhereInput | EnrollmentWhereInput[]
    course_id?: StringFilter<"Enrollment"> | string
    employee_id?: StringFilter<"Enrollment"> | string
    schedule_id?: StringNullableFilter<"Enrollment"> | string | null
    status?: StringFilter<"Enrollment"> | string
    enrollment_date?: DateTimeFilter<"Enrollment"> | Date | string
    completion_date?: DateTimeNullableFilter<"Enrollment"> | Date | string | null
    score?: FloatNullableFilter<"Enrollment"> | number | null
    progress?: IntFilter<"Enrollment"> | number
    certificate_id?: StringNullableFilter<"Enrollment"> | string | null
    attendance_rate?: FloatNullableFilter<"Enrollment"> | number | null
    feedback?: StringNullableFilter<"Enrollment"> | string | null
    created_at?: DateTimeFilter<"Enrollment"> | Date | string
    updated_at?: DateTimeFilter<"Enrollment"> | Date | string
    course?: XOR<CourseScalarRelationFilter, CourseWhereInput>
  }, "id" | "course_id_employee_id">

  export type EnrollmentOrderByWithAggregationInput = {
    id?: SortOrder
    course_id?: SortOrder
    employee_id?: SortOrder
    schedule_id?: SortOrderInput | SortOrder
    status?: SortOrder
    enrollment_date?: SortOrder
    completion_date?: SortOrderInput | SortOrder
    score?: SortOrderInput | SortOrder
    progress?: SortOrder
    certificate_id?: SortOrderInput | SortOrder
    attendance_rate?: SortOrderInput | SortOrder
    feedback?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: EnrollmentCountOrderByAggregateInput
    _avg?: EnrollmentAvgOrderByAggregateInput
    _max?: EnrollmentMaxOrderByAggregateInput
    _min?: EnrollmentMinOrderByAggregateInput
    _sum?: EnrollmentSumOrderByAggregateInput
  }

  export type EnrollmentScalarWhereWithAggregatesInput = {
    AND?: EnrollmentScalarWhereWithAggregatesInput | EnrollmentScalarWhereWithAggregatesInput[]
    OR?: EnrollmentScalarWhereWithAggregatesInput[]
    NOT?: EnrollmentScalarWhereWithAggregatesInput | EnrollmentScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Enrollment"> | string
    course_id?: StringWithAggregatesFilter<"Enrollment"> | string
    employee_id?: StringWithAggregatesFilter<"Enrollment"> | string
    schedule_id?: StringNullableWithAggregatesFilter<"Enrollment"> | string | null
    status?: StringWithAggregatesFilter<"Enrollment"> | string
    enrollment_date?: DateTimeWithAggregatesFilter<"Enrollment"> | Date | string
    completion_date?: DateTimeNullableWithAggregatesFilter<"Enrollment"> | Date | string | null
    score?: FloatNullableWithAggregatesFilter<"Enrollment"> | number | null
    progress?: IntWithAggregatesFilter<"Enrollment"> | number
    certificate_id?: StringNullableWithAggregatesFilter<"Enrollment"> | string | null
    attendance_rate?: FloatNullableWithAggregatesFilter<"Enrollment"> | number | null
    feedback?: StringNullableWithAggregatesFilter<"Enrollment"> | string | null
    created_at?: DateTimeWithAggregatesFilter<"Enrollment"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"Enrollment"> | Date | string
  }

  export type TrainingRecordWhereInput = {
    AND?: TrainingRecordWhereInput | TrainingRecordWhereInput[]
    OR?: TrainingRecordWhereInput[]
    NOT?: TrainingRecordWhereInput | TrainingRecordWhereInput[]
    id?: StringFilter<"TrainingRecord"> | string
    course_id?: StringNullableFilter<"TrainingRecord"> | string | null
    employee_id?: StringFilter<"TrainingRecord"> | string
    course_code?: StringFilter<"TrainingRecord"> | string
    course_name_en?: StringFilter<"TrainingRecord"> | string
    course_name_th?: StringNullableFilter<"TrainingRecord"> | string | null
    training_type?: StringFilter<"TrainingRecord"> | string
    category?: StringFilter<"TrainingRecord"> | string
    provider?: StringNullableFilter<"TrainingRecord"> | string | null
    instructor_name?: StringNullableFilter<"TrainingRecord"> | string | null
    start_date?: DateTimeFilter<"TrainingRecord"> | Date | string
    end_date?: DateTimeFilter<"TrainingRecord"> | Date | string
    duration_hours?: IntFilter<"TrainingRecord"> | number
    location?: StringNullableFilter<"TrainingRecord"> | string | null
    status?: StringFilter<"TrainingRecord"> | string
    completion_date?: DateTimeNullableFilter<"TrainingRecord"> | Date | string | null
    certificate_id?: StringNullableFilter<"TrainingRecord"> | string | null
    cost?: FloatNullableFilter<"TrainingRecord"> | number | null
    currency?: StringFilter<"TrainingRecord"> | string
    paid_by?: StringNullableFilter<"TrainingRecord"> | string | null
    pre_assessment_score?: FloatNullableFilter<"TrainingRecord"> | number | null
    post_assessment_score?: FloatNullableFilter<"TrainingRecord"> | number | null
    instructor_rating?: FloatNullableFilter<"TrainingRecord"> | number | null
    course_rating?: FloatNullableFilter<"TrainingRecord"> | number | null
    feedback?: StringNullableFilter<"TrainingRecord"> | string | null
    created_at?: DateTimeFilter<"TrainingRecord"> | Date | string
    updated_at?: DateTimeFilter<"TrainingRecord"> | Date | string
    course?: XOR<CourseNullableScalarRelationFilter, CourseWhereInput> | null
    evaluations?: KirkpatrickEvaluationListRelationFilter
  }

  export type TrainingRecordOrderByWithRelationInput = {
    id?: SortOrder
    course_id?: SortOrderInput | SortOrder
    employee_id?: SortOrder
    course_code?: SortOrder
    course_name_en?: SortOrder
    course_name_th?: SortOrderInput | SortOrder
    training_type?: SortOrder
    category?: SortOrder
    provider?: SortOrderInput | SortOrder
    instructor_name?: SortOrderInput | SortOrder
    start_date?: SortOrder
    end_date?: SortOrder
    duration_hours?: SortOrder
    location?: SortOrderInput | SortOrder
    status?: SortOrder
    completion_date?: SortOrderInput | SortOrder
    certificate_id?: SortOrderInput | SortOrder
    cost?: SortOrderInput | SortOrder
    currency?: SortOrder
    paid_by?: SortOrderInput | SortOrder
    pre_assessment_score?: SortOrderInput | SortOrder
    post_assessment_score?: SortOrderInput | SortOrder
    instructor_rating?: SortOrderInput | SortOrder
    course_rating?: SortOrderInput | SortOrder
    feedback?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    course?: CourseOrderByWithRelationInput
    evaluations?: KirkpatrickEvaluationOrderByRelationAggregateInput
  }

  export type TrainingRecordWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: TrainingRecordWhereInput | TrainingRecordWhereInput[]
    OR?: TrainingRecordWhereInput[]
    NOT?: TrainingRecordWhereInput | TrainingRecordWhereInput[]
    course_id?: StringNullableFilter<"TrainingRecord"> | string | null
    employee_id?: StringFilter<"TrainingRecord"> | string
    course_code?: StringFilter<"TrainingRecord"> | string
    course_name_en?: StringFilter<"TrainingRecord"> | string
    course_name_th?: StringNullableFilter<"TrainingRecord"> | string | null
    training_type?: StringFilter<"TrainingRecord"> | string
    category?: StringFilter<"TrainingRecord"> | string
    provider?: StringNullableFilter<"TrainingRecord"> | string | null
    instructor_name?: StringNullableFilter<"TrainingRecord"> | string | null
    start_date?: DateTimeFilter<"TrainingRecord"> | Date | string
    end_date?: DateTimeFilter<"TrainingRecord"> | Date | string
    duration_hours?: IntFilter<"TrainingRecord"> | number
    location?: StringNullableFilter<"TrainingRecord"> | string | null
    status?: StringFilter<"TrainingRecord"> | string
    completion_date?: DateTimeNullableFilter<"TrainingRecord"> | Date | string | null
    certificate_id?: StringNullableFilter<"TrainingRecord"> | string | null
    cost?: FloatNullableFilter<"TrainingRecord"> | number | null
    currency?: StringFilter<"TrainingRecord"> | string
    paid_by?: StringNullableFilter<"TrainingRecord"> | string | null
    pre_assessment_score?: FloatNullableFilter<"TrainingRecord"> | number | null
    post_assessment_score?: FloatNullableFilter<"TrainingRecord"> | number | null
    instructor_rating?: FloatNullableFilter<"TrainingRecord"> | number | null
    course_rating?: FloatNullableFilter<"TrainingRecord"> | number | null
    feedback?: StringNullableFilter<"TrainingRecord"> | string | null
    created_at?: DateTimeFilter<"TrainingRecord"> | Date | string
    updated_at?: DateTimeFilter<"TrainingRecord"> | Date | string
    course?: XOR<CourseNullableScalarRelationFilter, CourseWhereInput> | null
    evaluations?: KirkpatrickEvaluationListRelationFilter
  }, "id">

  export type TrainingRecordOrderByWithAggregationInput = {
    id?: SortOrder
    course_id?: SortOrderInput | SortOrder
    employee_id?: SortOrder
    course_code?: SortOrder
    course_name_en?: SortOrder
    course_name_th?: SortOrderInput | SortOrder
    training_type?: SortOrder
    category?: SortOrder
    provider?: SortOrderInput | SortOrder
    instructor_name?: SortOrderInput | SortOrder
    start_date?: SortOrder
    end_date?: SortOrder
    duration_hours?: SortOrder
    location?: SortOrderInput | SortOrder
    status?: SortOrder
    completion_date?: SortOrderInput | SortOrder
    certificate_id?: SortOrderInput | SortOrder
    cost?: SortOrderInput | SortOrder
    currency?: SortOrder
    paid_by?: SortOrderInput | SortOrder
    pre_assessment_score?: SortOrderInput | SortOrder
    post_assessment_score?: SortOrderInput | SortOrder
    instructor_rating?: SortOrderInput | SortOrder
    course_rating?: SortOrderInput | SortOrder
    feedback?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: TrainingRecordCountOrderByAggregateInput
    _avg?: TrainingRecordAvgOrderByAggregateInput
    _max?: TrainingRecordMaxOrderByAggregateInput
    _min?: TrainingRecordMinOrderByAggregateInput
    _sum?: TrainingRecordSumOrderByAggregateInput
  }

  export type TrainingRecordScalarWhereWithAggregatesInput = {
    AND?: TrainingRecordScalarWhereWithAggregatesInput | TrainingRecordScalarWhereWithAggregatesInput[]
    OR?: TrainingRecordScalarWhereWithAggregatesInput[]
    NOT?: TrainingRecordScalarWhereWithAggregatesInput | TrainingRecordScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"TrainingRecord"> | string
    course_id?: StringNullableWithAggregatesFilter<"TrainingRecord"> | string | null
    employee_id?: StringWithAggregatesFilter<"TrainingRecord"> | string
    course_code?: StringWithAggregatesFilter<"TrainingRecord"> | string
    course_name_en?: StringWithAggregatesFilter<"TrainingRecord"> | string
    course_name_th?: StringNullableWithAggregatesFilter<"TrainingRecord"> | string | null
    training_type?: StringWithAggregatesFilter<"TrainingRecord"> | string
    category?: StringWithAggregatesFilter<"TrainingRecord"> | string
    provider?: StringNullableWithAggregatesFilter<"TrainingRecord"> | string | null
    instructor_name?: StringNullableWithAggregatesFilter<"TrainingRecord"> | string | null
    start_date?: DateTimeWithAggregatesFilter<"TrainingRecord"> | Date | string
    end_date?: DateTimeWithAggregatesFilter<"TrainingRecord"> | Date | string
    duration_hours?: IntWithAggregatesFilter<"TrainingRecord"> | number
    location?: StringNullableWithAggregatesFilter<"TrainingRecord"> | string | null
    status?: StringWithAggregatesFilter<"TrainingRecord"> | string
    completion_date?: DateTimeNullableWithAggregatesFilter<"TrainingRecord"> | Date | string | null
    certificate_id?: StringNullableWithAggregatesFilter<"TrainingRecord"> | string | null
    cost?: FloatNullableWithAggregatesFilter<"TrainingRecord"> | number | null
    currency?: StringWithAggregatesFilter<"TrainingRecord"> | string
    paid_by?: StringNullableWithAggregatesFilter<"TrainingRecord"> | string | null
    pre_assessment_score?: FloatNullableWithAggregatesFilter<"TrainingRecord"> | number | null
    post_assessment_score?: FloatNullableWithAggregatesFilter<"TrainingRecord"> | number | null
    instructor_rating?: FloatNullableWithAggregatesFilter<"TrainingRecord"> | number | null
    course_rating?: FloatNullableWithAggregatesFilter<"TrainingRecord"> | number | null
    feedback?: StringNullableWithAggregatesFilter<"TrainingRecord"> | string | null
    created_at?: DateTimeWithAggregatesFilter<"TrainingRecord"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"TrainingRecord"> | Date | string
  }

  export type KirkpatrickEvaluationWhereInput = {
    AND?: KirkpatrickEvaluationWhereInput | KirkpatrickEvaluationWhereInput[]
    OR?: KirkpatrickEvaluationWhereInput[]
    NOT?: KirkpatrickEvaluationWhereInput | KirkpatrickEvaluationWhereInput[]
    id?: StringFilter<"KirkpatrickEvaluation"> | string
    training_record_id?: StringFilter<"KirkpatrickEvaluation"> | string
    level?: IntFilter<"KirkpatrickEvaluation"> | number
    level_name?: StringFilter<"KirkpatrickEvaluation"> | string
    score?: FloatNullableFilter<"KirkpatrickEvaluation"> | number | null
    evaluator_id?: StringNullableFilter<"KirkpatrickEvaluation"> | string | null
    evaluation_date?: DateTimeNullableFilter<"KirkpatrickEvaluation"> | Date | string | null
    comments?: StringNullableFilter<"KirkpatrickEvaluation"> | string | null
    evidence?: StringNullableFilter<"KirkpatrickEvaluation"> | string | null
    created_at?: DateTimeFilter<"KirkpatrickEvaluation"> | Date | string
    updated_at?: DateTimeFilter<"KirkpatrickEvaluation"> | Date | string
    training_record?: XOR<TrainingRecordScalarRelationFilter, TrainingRecordWhereInput>
  }

  export type KirkpatrickEvaluationOrderByWithRelationInput = {
    id?: SortOrder
    training_record_id?: SortOrder
    level?: SortOrder
    level_name?: SortOrder
    score?: SortOrderInput | SortOrder
    evaluator_id?: SortOrderInput | SortOrder
    evaluation_date?: SortOrderInput | SortOrder
    comments?: SortOrderInput | SortOrder
    evidence?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    training_record?: TrainingRecordOrderByWithRelationInput
  }

  export type KirkpatrickEvaluationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    training_record_id_level?: KirkpatrickEvaluationTraining_record_idLevelCompoundUniqueInput
    AND?: KirkpatrickEvaluationWhereInput | KirkpatrickEvaluationWhereInput[]
    OR?: KirkpatrickEvaluationWhereInput[]
    NOT?: KirkpatrickEvaluationWhereInput | KirkpatrickEvaluationWhereInput[]
    training_record_id?: StringFilter<"KirkpatrickEvaluation"> | string
    level?: IntFilter<"KirkpatrickEvaluation"> | number
    level_name?: StringFilter<"KirkpatrickEvaluation"> | string
    score?: FloatNullableFilter<"KirkpatrickEvaluation"> | number | null
    evaluator_id?: StringNullableFilter<"KirkpatrickEvaluation"> | string | null
    evaluation_date?: DateTimeNullableFilter<"KirkpatrickEvaluation"> | Date | string | null
    comments?: StringNullableFilter<"KirkpatrickEvaluation"> | string | null
    evidence?: StringNullableFilter<"KirkpatrickEvaluation"> | string | null
    created_at?: DateTimeFilter<"KirkpatrickEvaluation"> | Date | string
    updated_at?: DateTimeFilter<"KirkpatrickEvaluation"> | Date | string
    training_record?: XOR<TrainingRecordScalarRelationFilter, TrainingRecordWhereInput>
  }, "id" | "training_record_id_level">

  export type KirkpatrickEvaluationOrderByWithAggregationInput = {
    id?: SortOrder
    training_record_id?: SortOrder
    level?: SortOrder
    level_name?: SortOrder
    score?: SortOrderInput | SortOrder
    evaluator_id?: SortOrderInput | SortOrder
    evaluation_date?: SortOrderInput | SortOrder
    comments?: SortOrderInput | SortOrder
    evidence?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: KirkpatrickEvaluationCountOrderByAggregateInput
    _avg?: KirkpatrickEvaluationAvgOrderByAggregateInput
    _max?: KirkpatrickEvaluationMaxOrderByAggregateInput
    _min?: KirkpatrickEvaluationMinOrderByAggregateInput
    _sum?: KirkpatrickEvaluationSumOrderByAggregateInput
  }

  export type KirkpatrickEvaluationScalarWhereWithAggregatesInput = {
    AND?: KirkpatrickEvaluationScalarWhereWithAggregatesInput | KirkpatrickEvaluationScalarWhereWithAggregatesInput[]
    OR?: KirkpatrickEvaluationScalarWhereWithAggregatesInput[]
    NOT?: KirkpatrickEvaluationScalarWhereWithAggregatesInput | KirkpatrickEvaluationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"KirkpatrickEvaluation"> | string
    training_record_id?: StringWithAggregatesFilter<"KirkpatrickEvaluation"> | string
    level?: IntWithAggregatesFilter<"KirkpatrickEvaluation"> | number
    level_name?: StringWithAggregatesFilter<"KirkpatrickEvaluation"> | string
    score?: FloatNullableWithAggregatesFilter<"KirkpatrickEvaluation"> | number | null
    evaluator_id?: StringNullableWithAggregatesFilter<"KirkpatrickEvaluation"> | string | null
    evaluation_date?: DateTimeNullableWithAggregatesFilter<"KirkpatrickEvaluation"> | Date | string | null
    comments?: StringNullableWithAggregatesFilter<"KirkpatrickEvaluation"> | string | null
    evidence?: StringNullableWithAggregatesFilter<"KirkpatrickEvaluation"> | string | null
    created_at?: DateTimeWithAggregatesFilter<"KirkpatrickEvaluation"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"KirkpatrickEvaluation"> | Date | string
  }

  export type CourseCreateInput = {
    id?: string
    code: string
    name_en: string
    name_th?: string | null
    description_en?: string | null
    description_th?: string | null
    category: string
    delivery_method: string
    duration_hours: number
    credits?: number
    level?: string
    mandatory?: boolean
    max_participants?: number
    prerequisites?: CourseCreateprerequisitesInput | string[]
    status?: string
    rating?: number | null
    review_count?: number
    instructor_ids?: CourseCreateinstructor_idsInput | string[]
    target_audience?: CourseCreatetarget_audienceInput | string[]
    created_at?: Date | string
    updated_at?: Date | string
    enrollments?: EnrollmentCreateNestedManyWithoutCourseInput
    training_records?: TrainingRecordCreateNestedManyWithoutCourseInput
  }

  export type CourseUncheckedCreateInput = {
    id?: string
    code: string
    name_en: string
    name_th?: string | null
    description_en?: string | null
    description_th?: string | null
    category: string
    delivery_method: string
    duration_hours: number
    credits?: number
    level?: string
    mandatory?: boolean
    max_participants?: number
    prerequisites?: CourseCreateprerequisitesInput | string[]
    status?: string
    rating?: number | null
    review_count?: number
    instructor_ids?: CourseCreateinstructor_idsInput | string[]
    target_audience?: CourseCreatetarget_audienceInput | string[]
    created_at?: Date | string
    updated_at?: Date | string
    enrollments?: EnrollmentUncheckedCreateNestedManyWithoutCourseInput
    training_records?: TrainingRecordUncheckedCreateNestedManyWithoutCourseInput
  }

  export type CourseUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    name_en?: StringFieldUpdateOperationsInput | string
    name_th?: NullableStringFieldUpdateOperationsInput | string | null
    description_en?: NullableStringFieldUpdateOperationsInput | string | null
    description_th?: NullableStringFieldUpdateOperationsInput | string | null
    category?: StringFieldUpdateOperationsInput | string
    delivery_method?: StringFieldUpdateOperationsInput | string
    duration_hours?: IntFieldUpdateOperationsInput | number
    credits?: IntFieldUpdateOperationsInput | number
    level?: StringFieldUpdateOperationsInput | string
    mandatory?: BoolFieldUpdateOperationsInput | boolean
    max_participants?: IntFieldUpdateOperationsInput | number
    prerequisites?: CourseUpdateprerequisitesInput | string[]
    status?: StringFieldUpdateOperationsInput | string
    rating?: NullableFloatFieldUpdateOperationsInput | number | null
    review_count?: IntFieldUpdateOperationsInput | number
    instructor_ids?: CourseUpdateinstructor_idsInput | string[]
    target_audience?: CourseUpdatetarget_audienceInput | string[]
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    enrollments?: EnrollmentUpdateManyWithoutCourseNestedInput
    training_records?: TrainingRecordUpdateManyWithoutCourseNestedInput
  }

  export type CourseUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    name_en?: StringFieldUpdateOperationsInput | string
    name_th?: NullableStringFieldUpdateOperationsInput | string | null
    description_en?: NullableStringFieldUpdateOperationsInput | string | null
    description_th?: NullableStringFieldUpdateOperationsInput | string | null
    category?: StringFieldUpdateOperationsInput | string
    delivery_method?: StringFieldUpdateOperationsInput | string
    duration_hours?: IntFieldUpdateOperationsInput | number
    credits?: IntFieldUpdateOperationsInput | number
    level?: StringFieldUpdateOperationsInput | string
    mandatory?: BoolFieldUpdateOperationsInput | boolean
    max_participants?: IntFieldUpdateOperationsInput | number
    prerequisites?: CourseUpdateprerequisitesInput | string[]
    status?: StringFieldUpdateOperationsInput | string
    rating?: NullableFloatFieldUpdateOperationsInput | number | null
    review_count?: IntFieldUpdateOperationsInput | number
    instructor_ids?: CourseUpdateinstructor_idsInput | string[]
    target_audience?: CourseUpdatetarget_audienceInput | string[]
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    enrollments?: EnrollmentUncheckedUpdateManyWithoutCourseNestedInput
    training_records?: TrainingRecordUncheckedUpdateManyWithoutCourseNestedInput
  }

  export type CourseCreateManyInput = {
    id?: string
    code: string
    name_en: string
    name_th?: string | null
    description_en?: string | null
    description_th?: string | null
    category: string
    delivery_method: string
    duration_hours: number
    credits?: number
    level?: string
    mandatory?: boolean
    max_participants?: number
    prerequisites?: CourseCreateprerequisitesInput | string[]
    status?: string
    rating?: number | null
    review_count?: number
    instructor_ids?: CourseCreateinstructor_idsInput | string[]
    target_audience?: CourseCreatetarget_audienceInput | string[]
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type CourseUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    name_en?: StringFieldUpdateOperationsInput | string
    name_th?: NullableStringFieldUpdateOperationsInput | string | null
    description_en?: NullableStringFieldUpdateOperationsInput | string | null
    description_th?: NullableStringFieldUpdateOperationsInput | string | null
    category?: StringFieldUpdateOperationsInput | string
    delivery_method?: StringFieldUpdateOperationsInput | string
    duration_hours?: IntFieldUpdateOperationsInput | number
    credits?: IntFieldUpdateOperationsInput | number
    level?: StringFieldUpdateOperationsInput | string
    mandatory?: BoolFieldUpdateOperationsInput | boolean
    max_participants?: IntFieldUpdateOperationsInput | number
    prerequisites?: CourseUpdateprerequisitesInput | string[]
    status?: StringFieldUpdateOperationsInput | string
    rating?: NullableFloatFieldUpdateOperationsInput | number | null
    review_count?: IntFieldUpdateOperationsInput | number
    instructor_ids?: CourseUpdateinstructor_idsInput | string[]
    target_audience?: CourseUpdatetarget_audienceInput | string[]
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CourseUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    name_en?: StringFieldUpdateOperationsInput | string
    name_th?: NullableStringFieldUpdateOperationsInput | string | null
    description_en?: NullableStringFieldUpdateOperationsInput | string | null
    description_th?: NullableStringFieldUpdateOperationsInput | string | null
    category?: StringFieldUpdateOperationsInput | string
    delivery_method?: StringFieldUpdateOperationsInput | string
    duration_hours?: IntFieldUpdateOperationsInput | number
    credits?: IntFieldUpdateOperationsInput | number
    level?: StringFieldUpdateOperationsInput | string
    mandatory?: BoolFieldUpdateOperationsInput | boolean
    max_participants?: IntFieldUpdateOperationsInput | number
    prerequisites?: CourseUpdateprerequisitesInput | string[]
    status?: StringFieldUpdateOperationsInput | string
    rating?: NullableFloatFieldUpdateOperationsInput | number | null
    review_count?: IntFieldUpdateOperationsInput | number
    instructor_ids?: CourseUpdateinstructor_idsInput | string[]
    target_audience?: CourseUpdatetarget_audienceInput | string[]
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EnrollmentCreateInput = {
    id?: string
    employee_id: string
    schedule_id?: string | null
    status?: string
    enrollment_date?: Date | string
    completion_date?: Date | string | null
    score?: number | null
    progress?: number
    certificate_id?: string | null
    attendance_rate?: number | null
    feedback?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    course: CourseCreateNestedOneWithoutEnrollmentsInput
  }

  export type EnrollmentUncheckedCreateInput = {
    id?: string
    course_id: string
    employee_id: string
    schedule_id?: string | null
    status?: string
    enrollment_date?: Date | string
    completion_date?: Date | string | null
    score?: number | null
    progress?: number
    certificate_id?: string | null
    attendance_rate?: number | null
    feedback?: string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type EnrollmentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    employee_id?: StringFieldUpdateOperationsInput | string
    schedule_id?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    enrollment_date?: DateTimeFieldUpdateOperationsInput | Date | string
    completion_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    score?: NullableFloatFieldUpdateOperationsInput | number | null
    progress?: IntFieldUpdateOperationsInput | number
    certificate_id?: NullableStringFieldUpdateOperationsInput | string | null
    attendance_rate?: NullableFloatFieldUpdateOperationsInput | number | null
    feedback?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    course?: CourseUpdateOneRequiredWithoutEnrollmentsNestedInput
  }

  export type EnrollmentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    course_id?: StringFieldUpdateOperationsInput | string
    employee_id?: StringFieldUpdateOperationsInput | string
    schedule_id?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    enrollment_date?: DateTimeFieldUpdateOperationsInput | Date | string
    completion_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    score?: NullableFloatFieldUpdateOperationsInput | number | null
    progress?: IntFieldUpdateOperationsInput | number
    certificate_id?: NullableStringFieldUpdateOperationsInput | string | null
    attendance_rate?: NullableFloatFieldUpdateOperationsInput | number | null
    feedback?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EnrollmentCreateManyInput = {
    id?: string
    course_id: string
    employee_id: string
    schedule_id?: string | null
    status?: string
    enrollment_date?: Date | string
    completion_date?: Date | string | null
    score?: number | null
    progress?: number
    certificate_id?: string | null
    attendance_rate?: number | null
    feedback?: string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type EnrollmentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    employee_id?: StringFieldUpdateOperationsInput | string
    schedule_id?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    enrollment_date?: DateTimeFieldUpdateOperationsInput | Date | string
    completion_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    score?: NullableFloatFieldUpdateOperationsInput | number | null
    progress?: IntFieldUpdateOperationsInput | number
    certificate_id?: NullableStringFieldUpdateOperationsInput | string | null
    attendance_rate?: NullableFloatFieldUpdateOperationsInput | number | null
    feedback?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EnrollmentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    course_id?: StringFieldUpdateOperationsInput | string
    employee_id?: StringFieldUpdateOperationsInput | string
    schedule_id?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    enrollment_date?: DateTimeFieldUpdateOperationsInput | Date | string
    completion_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    score?: NullableFloatFieldUpdateOperationsInput | number | null
    progress?: IntFieldUpdateOperationsInput | number
    certificate_id?: NullableStringFieldUpdateOperationsInput | string | null
    attendance_rate?: NullableFloatFieldUpdateOperationsInput | number | null
    feedback?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TrainingRecordCreateInput = {
    id?: string
    employee_id: string
    course_code: string
    course_name_en: string
    course_name_th?: string | null
    training_type: string
    category: string
    provider?: string | null
    instructor_name?: string | null
    start_date: Date | string
    end_date: Date | string
    duration_hours: number
    location?: string | null
    status?: string
    completion_date?: Date | string | null
    certificate_id?: string | null
    cost?: number | null
    currency?: string
    paid_by?: string | null
    pre_assessment_score?: number | null
    post_assessment_score?: number | null
    instructor_rating?: number | null
    course_rating?: number | null
    feedback?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    course?: CourseCreateNestedOneWithoutTraining_recordsInput
    evaluations?: KirkpatrickEvaluationCreateNestedManyWithoutTraining_recordInput
  }

  export type TrainingRecordUncheckedCreateInput = {
    id?: string
    course_id?: string | null
    employee_id: string
    course_code: string
    course_name_en: string
    course_name_th?: string | null
    training_type: string
    category: string
    provider?: string | null
    instructor_name?: string | null
    start_date: Date | string
    end_date: Date | string
    duration_hours: number
    location?: string | null
    status?: string
    completion_date?: Date | string | null
    certificate_id?: string | null
    cost?: number | null
    currency?: string
    paid_by?: string | null
    pre_assessment_score?: number | null
    post_assessment_score?: number | null
    instructor_rating?: number | null
    course_rating?: number | null
    feedback?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    evaluations?: KirkpatrickEvaluationUncheckedCreateNestedManyWithoutTraining_recordInput
  }

  export type TrainingRecordUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    employee_id?: StringFieldUpdateOperationsInput | string
    course_code?: StringFieldUpdateOperationsInput | string
    course_name_en?: StringFieldUpdateOperationsInput | string
    course_name_th?: NullableStringFieldUpdateOperationsInput | string | null
    training_type?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    provider?: NullableStringFieldUpdateOperationsInput | string | null
    instructor_name?: NullableStringFieldUpdateOperationsInput | string | null
    start_date?: DateTimeFieldUpdateOperationsInput | Date | string
    end_date?: DateTimeFieldUpdateOperationsInput | Date | string
    duration_hours?: IntFieldUpdateOperationsInput | number
    location?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    completion_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    certificate_id?: NullableStringFieldUpdateOperationsInput | string | null
    cost?: NullableFloatFieldUpdateOperationsInput | number | null
    currency?: StringFieldUpdateOperationsInput | string
    paid_by?: NullableStringFieldUpdateOperationsInput | string | null
    pre_assessment_score?: NullableFloatFieldUpdateOperationsInput | number | null
    post_assessment_score?: NullableFloatFieldUpdateOperationsInput | number | null
    instructor_rating?: NullableFloatFieldUpdateOperationsInput | number | null
    course_rating?: NullableFloatFieldUpdateOperationsInput | number | null
    feedback?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    course?: CourseUpdateOneWithoutTraining_recordsNestedInput
    evaluations?: KirkpatrickEvaluationUpdateManyWithoutTraining_recordNestedInput
  }

  export type TrainingRecordUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    course_id?: NullableStringFieldUpdateOperationsInput | string | null
    employee_id?: StringFieldUpdateOperationsInput | string
    course_code?: StringFieldUpdateOperationsInput | string
    course_name_en?: StringFieldUpdateOperationsInput | string
    course_name_th?: NullableStringFieldUpdateOperationsInput | string | null
    training_type?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    provider?: NullableStringFieldUpdateOperationsInput | string | null
    instructor_name?: NullableStringFieldUpdateOperationsInput | string | null
    start_date?: DateTimeFieldUpdateOperationsInput | Date | string
    end_date?: DateTimeFieldUpdateOperationsInput | Date | string
    duration_hours?: IntFieldUpdateOperationsInput | number
    location?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    completion_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    certificate_id?: NullableStringFieldUpdateOperationsInput | string | null
    cost?: NullableFloatFieldUpdateOperationsInput | number | null
    currency?: StringFieldUpdateOperationsInput | string
    paid_by?: NullableStringFieldUpdateOperationsInput | string | null
    pre_assessment_score?: NullableFloatFieldUpdateOperationsInput | number | null
    post_assessment_score?: NullableFloatFieldUpdateOperationsInput | number | null
    instructor_rating?: NullableFloatFieldUpdateOperationsInput | number | null
    course_rating?: NullableFloatFieldUpdateOperationsInput | number | null
    feedback?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    evaluations?: KirkpatrickEvaluationUncheckedUpdateManyWithoutTraining_recordNestedInput
  }

  export type TrainingRecordCreateManyInput = {
    id?: string
    course_id?: string | null
    employee_id: string
    course_code: string
    course_name_en: string
    course_name_th?: string | null
    training_type: string
    category: string
    provider?: string | null
    instructor_name?: string | null
    start_date: Date | string
    end_date: Date | string
    duration_hours: number
    location?: string | null
    status?: string
    completion_date?: Date | string | null
    certificate_id?: string | null
    cost?: number | null
    currency?: string
    paid_by?: string | null
    pre_assessment_score?: number | null
    post_assessment_score?: number | null
    instructor_rating?: number | null
    course_rating?: number | null
    feedback?: string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type TrainingRecordUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    employee_id?: StringFieldUpdateOperationsInput | string
    course_code?: StringFieldUpdateOperationsInput | string
    course_name_en?: StringFieldUpdateOperationsInput | string
    course_name_th?: NullableStringFieldUpdateOperationsInput | string | null
    training_type?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    provider?: NullableStringFieldUpdateOperationsInput | string | null
    instructor_name?: NullableStringFieldUpdateOperationsInput | string | null
    start_date?: DateTimeFieldUpdateOperationsInput | Date | string
    end_date?: DateTimeFieldUpdateOperationsInput | Date | string
    duration_hours?: IntFieldUpdateOperationsInput | number
    location?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    completion_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    certificate_id?: NullableStringFieldUpdateOperationsInput | string | null
    cost?: NullableFloatFieldUpdateOperationsInput | number | null
    currency?: StringFieldUpdateOperationsInput | string
    paid_by?: NullableStringFieldUpdateOperationsInput | string | null
    pre_assessment_score?: NullableFloatFieldUpdateOperationsInput | number | null
    post_assessment_score?: NullableFloatFieldUpdateOperationsInput | number | null
    instructor_rating?: NullableFloatFieldUpdateOperationsInput | number | null
    course_rating?: NullableFloatFieldUpdateOperationsInput | number | null
    feedback?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TrainingRecordUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    course_id?: NullableStringFieldUpdateOperationsInput | string | null
    employee_id?: StringFieldUpdateOperationsInput | string
    course_code?: StringFieldUpdateOperationsInput | string
    course_name_en?: StringFieldUpdateOperationsInput | string
    course_name_th?: NullableStringFieldUpdateOperationsInput | string | null
    training_type?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    provider?: NullableStringFieldUpdateOperationsInput | string | null
    instructor_name?: NullableStringFieldUpdateOperationsInput | string | null
    start_date?: DateTimeFieldUpdateOperationsInput | Date | string
    end_date?: DateTimeFieldUpdateOperationsInput | Date | string
    duration_hours?: IntFieldUpdateOperationsInput | number
    location?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    completion_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    certificate_id?: NullableStringFieldUpdateOperationsInput | string | null
    cost?: NullableFloatFieldUpdateOperationsInput | number | null
    currency?: StringFieldUpdateOperationsInput | string
    paid_by?: NullableStringFieldUpdateOperationsInput | string | null
    pre_assessment_score?: NullableFloatFieldUpdateOperationsInput | number | null
    post_assessment_score?: NullableFloatFieldUpdateOperationsInput | number | null
    instructor_rating?: NullableFloatFieldUpdateOperationsInput | number | null
    course_rating?: NullableFloatFieldUpdateOperationsInput | number | null
    feedback?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type KirkpatrickEvaluationCreateInput = {
    id?: string
    level: number
    level_name: string
    score?: number | null
    evaluator_id?: string | null
    evaluation_date?: Date | string | null
    comments?: string | null
    evidence?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    training_record: TrainingRecordCreateNestedOneWithoutEvaluationsInput
  }

  export type KirkpatrickEvaluationUncheckedCreateInput = {
    id?: string
    training_record_id: string
    level: number
    level_name: string
    score?: number | null
    evaluator_id?: string | null
    evaluation_date?: Date | string | null
    comments?: string | null
    evidence?: string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type KirkpatrickEvaluationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    level?: IntFieldUpdateOperationsInput | number
    level_name?: StringFieldUpdateOperationsInput | string
    score?: NullableFloatFieldUpdateOperationsInput | number | null
    evaluator_id?: NullableStringFieldUpdateOperationsInput | string | null
    evaluation_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    comments?: NullableStringFieldUpdateOperationsInput | string | null
    evidence?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    training_record?: TrainingRecordUpdateOneRequiredWithoutEvaluationsNestedInput
  }

  export type KirkpatrickEvaluationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    training_record_id?: StringFieldUpdateOperationsInput | string
    level?: IntFieldUpdateOperationsInput | number
    level_name?: StringFieldUpdateOperationsInput | string
    score?: NullableFloatFieldUpdateOperationsInput | number | null
    evaluator_id?: NullableStringFieldUpdateOperationsInput | string | null
    evaluation_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    comments?: NullableStringFieldUpdateOperationsInput | string | null
    evidence?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type KirkpatrickEvaluationCreateManyInput = {
    id?: string
    training_record_id: string
    level: number
    level_name: string
    score?: number | null
    evaluator_id?: string | null
    evaluation_date?: Date | string | null
    comments?: string | null
    evidence?: string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type KirkpatrickEvaluationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    level?: IntFieldUpdateOperationsInput | number
    level_name?: StringFieldUpdateOperationsInput | string
    score?: NullableFloatFieldUpdateOperationsInput | number | null
    evaluator_id?: NullableStringFieldUpdateOperationsInput | string | null
    evaluation_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    comments?: NullableStringFieldUpdateOperationsInput | string | null
    evidence?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type KirkpatrickEvaluationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    training_record_id?: StringFieldUpdateOperationsInput | string
    level?: IntFieldUpdateOperationsInput | number
    level_name?: StringFieldUpdateOperationsInput | string
    score?: NullableFloatFieldUpdateOperationsInput | number | null
    evaluator_id?: NullableStringFieldUpdateOperationsInput | string | null
    evaluation_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    comments?: NullableStringFieldUpdateOperationsInput | string | null
    evidence?: NullableStringFieldUpdateOperationsInput | string | null
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

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
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

  export type EnrollmentListRelationFilter = {
    every?: EnrollmentWhereInput
    some?: EnrollmentWhereInput
    none?: EnrollmentWhereInput
  }

  export type TrainingRecordListRelationFilter = {
    every?: TrainingRecordWhereInput
    some?: TrainingRecordWhereInput
    none?: TrainingRecordWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type EnrollmentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TrainingRecordOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CourseCountOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    name_en?: SortOrder
    name_th?: SortOrder
    description_en?: SortOrder
    description_th?: SortOrder
    category?: SortOrder
    delivery_method?: SortOrder
    duration_hours?: SortOrder
    credits?: SortOrder
    level?: SortOrder
    mandatory?: SortOrder
    max_participants?: SortOrder
    prerequisites?: SortOrder
    status?: SortOrder
    rating?: SortOrder
    review_count?: SortOrder
    instructor_ids?: SortOrder
    target_audience?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type CourseAvgOrderByAggregateInput = {
    duration_hours?: SortOrder
    credits?: SortOrder
    max_participants?: SortOrder
    rating?: SortOrder
    review_count?: SortOrder
  }

  export type CourseMaxOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    name_en?: SortOrder
    name_th?: SortOrder
    description_en?: SortOrder
    description_th?: SortOrder
    category?: SortOrder
    delivery_method?: SortOrder
    duration_hours?: SortOrder
    credits?: SortOrder
    level?: SortOrder
    mandatory?: SortOrder
    max_participants?: SortOrder
    status?: SortOrder
    rating?: SortOrder
    review_count?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type CourseMinOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    name_en?: SortOrder
    name_th?: SortOrder
    description_en?: SortOrder
    description_th?: SortOrder
    category?: SortOrder
    delivery_method?: SortOrder
    duration_hours?: SortOrder
    credits?: SortOrder
    level?: SortOrder
    mandatory?: SortOrder
    max_participants?: SortOrder
    status?: SortOrder
    rating?: SortOrder
    review_count?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type CourseSumOrderByAggregateInput = {
    duration_hours?: SortOrder
    credits?: SortOrder
    max_participants?: SortOrder
    rating?: SortOrder
    review_count?: SortOrder
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

  export type CourseScalarRelationFilter = {
    is?: CourseWhereInput
    isNot?: CourseWhereInput
  }

  export type EnrollmentCourse_idEmployee_idCompoundUniqueInput = {
    course_id: string
    employee_id: string
  }

  export type EnrollmentCountOrderByAggregateInput = {
    id?: SortOrder
    course_id?: SortOrder
    employee_id?: SortOrder
    schedule_id?: SortOrder
    status?: SortOrder
    enrollment_date?: SortOrder
    completion_date?: SortOrder
    score?: SortOrder
    progress?: SortOrder
    certificate_id?: SortOrder
    attendance_rate?: SortOrder
    feedback?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type EnrollmentAvgOrderByAggregateInput = {
    score?: SortOrder
    progress?: SortOrder
    attendance_rate?: SortOrder
  }

  export type EnrollmentMaxOrderByAggregateInput = {
    id?: SortOrder
    course_id?: SortOrder
    employee_id?: SortOrder
    schedule_id?: SortOrder
    status?: SortOrder
    enrollment_date?: SortOrder
    completion_date?: SortOrder
    score?: SortOrder
    progress?: SortOrder
    certificate_id?: SortOrder
    attendance_rate?: SortOrder
    feedback?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type EnrollmentMinOrderByAggregateInput = {
    id?: SortOrder
    course_id?: SortOrder
    employee_id?: SortOrder
    schedule_id?: SortOrder
    status?: SortOrder
    enrollment_date?: SortOrder
    completion_date?: SortOrder
    score?: SortOrder
    progress?: SortOrder
    certificate_id?: SortOrder
    attendance_rate?: SortOrder
    feedback?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type EnrollmentSumOrderByAggregateInput = {
    score?: SortOrder
    progress?: SortOrder
    attendance_rate?: SortOrder
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

  export type CourseNullableScalarRelationFilter = {
    is?: CourseWhereInput | null
    isNot?: CourseWhereInput | null
  }

  export type KirkpatrickEvaluationListRelationFilter = {
    every?: KirkpatrickEvaluationWhereInput
    some?: KirkpatrickEvaluationWhereInput
    none?: KirkpatrickEvaluationWhereInput
  }

  export type KirkpatrickEvaluationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TrainingRecordCountOrderByAggregateInput = {
    id?: SortOrder
    course_id?: SortOrder
    employee_id?: SortOrder
    course_code?: SortOrder
    course_name_en?: SortOrder
    course_name_th?: SortOrder
    training_type?: SortOrder
    category?: SortOrder
    provider?: SortOrder
    instructor_name?: SortOrder
    start_date?: SortOrder
    end_date?: SortOrder
    duration_hours?: SortOrder
    location?: SortOrder
    status?: SortOrder
    completion_date?: SortOrder
    certificate_id?: SortOrder
    cost?: SortOrder
    currency?: SortOrder
    paid_by?: SortOrder
    pre_assessment_score?: SortOrder
    post_assessment_score?: SortOrder
    instructor_rating?: SortOrder
    course_rating?: SortOrder
    feedback?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type TrainingRecordAvgOrderByAggregateInput = {
    duration_hours?: SortOrder
    cost?: SortOrder
    pre_assessment_score?: SortOrder
    post_assessment_score?: SortOrder
    instructor_rating?: SortOrder
    course_rating?: SortOrder
  }

  export type TrainingRecordMaxOrderByAggregateInput = {
    id?: SortOrder
    course_id?: SortOrder
    employee_id?: SortOrder
    course_code?: SortOrder
    course_name_en?: SortOrder
    course_name_th?: SortOrder
    training_type?: SortOrder
    category?: SortOrder
    provider?: SortOrder
    instructor_name?: SortOrder
    start_date?: SortOrder
    end_date?: SortOrder
    duration_hours?: SortOrder
    location?: SortOrder
    status?: SortOrder
    completion_date?: SortOrder
    certificate_id?: SortOrder
    cost?: SortOrder
    currency?: SortOrder
    paid_by?: SortOrder
    pre_assessment_score?: SortOrder
    post_assessment_score?: SortOrder
    instructor_rating?: SortOrder
    course_rating?: SortOrder
    feedback?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type TrainingRecordMinOrderByAggregateInput = {
    id?: SortOrder
    course_id?: SortOrder
    employee_id?: SortOrder
    course_code?: SortOrder
    course_name_en?: SortOrder
    course_name_th?: SortOrder
    training_type?: SortOrder
    category?: SortOrder
    provider?: SortOrder
    instructor_name?: SortOrder
    start_date?: SortOrder
    end_date?: SortOrder
    duration_hours?: SortOrder
    location?: SortOrder
    status?: SortOrder
    completion_date?: SortOrder
    certificate_id?: SortOrder
    cost?: SortOrder
    currency?: SortOrder
    paid_by?: SortOrder
    pre_assessment_score?: SortOrder
    post_assessment_score?: SortOrder
    instructor_rating?: SortOrder
    course_rating?: SortOrder
    feedback?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type TrainingRecordSumOrderByAggregateInput = {
    duration_hours?: SortOrder
    cost?: SortOrder
    pre_assessment_score?: SortOrder
    post_assessment_score?: SortOrder
    instructor_rating?: SortOrder
    course_rating?: SortOrder
  }

  export type TrainingRecordScalarRelationFilter = {
    is?: TrainingRecordWhereInput
    isNot?: TrainingRecordWhereInput
  }

  export type KirkpatrickEvaluationTraining_record_idLevelCompoundUniqueInput = {
    training_record_id: string
    level: number
  }

  export type KirkpatrickEvaluationCountOrderByAggregateInput = {
    id?: SortOrder
    training_record_id?: SortOrder
    level?: SortOrder
    level_name?: SortOrder
    score?: SortOrder
    evaluator_id?: SortOrder
    evaluation_date?: SortOrder
    comments?: SortOrder
    evidence?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type KirkpatrickEvaluationAvgOrderByAggregateInput = {
    level?: SortOrder
    score?: SortOrder
  }

  export type KirkpatrickEvaluationMaxOrderByAggregateInput = {
    id?: SortOrder
    training_record_id?: SortOrder
    level?: SortOrder
    level_name?: SortOrder
    score?: SortOrder
    evaluator_id?: SortOrder
    evaluation_date?: SortOrder
    comments?: SortOrder
    evidence?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type KirkpatrickEvaluationMinOrderByAggregateInput = {
    id?: SortOrder
    training_record_id?: SortOrder
    level?: SortOrder
    level_name?: SortOrder
    score?: SortOrder
    evaluator_id?: SortOrder
    evaluation_date?: SortOrder
    comments?: SortOrder
    evidence?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type KirkpatrickEvaluationSumOrderByAggregateInput = {
    level?: SortOrder
    score?: SortOrder
  }

  export type CourseCreateprerequisitesInput = {
    set: string[]
  }

  export type CourseCreateinstructor_idsInput = {
    set: string[]
  }

  export type CourseCreatetarget_audienceInput = {
    set: string[]
  }

  export type EnrollmentCreateNestedManyWithoutCourseInput = {
    create?: XOR<EnrollmentCreateWithoutCourseInput, EnrollmentUncheckedCreateWithoutCourseInput> | EnrollmentCreateWithoutCourseInput[] | EnrollmentUncheckedCreateWithoutCourseInput[]
    connectOrCreate?: EnrollmentCreateOrConnectWithoutCourseInput | EnrollmentCreateOrConnectWithoutCourseInput[]
    createMany?: EnrollmentCreateManyCourseInputEnvelope
    connect?: EnrollmentWhereUniqueInput | EnrollmentWhereUniqueInput[]
  }

  export type TrainingRecordCreateNestedManyWithoutCourseInput = {
    create?: XOR<TrainingRecordCreateWithoutCourseInput, TrainingRecordUncheckedCreateWithoutCourseInput> | TrainingRecordCreateWithoutCourseInput[] | TrainingRecordUncheckedCreateWithoutCourseInput[]
    connectOrCreate?: TrainingRecordCreateOrConnectWithoutCourseInput | TrainingRecordCreateOrConnectWithoutCourseInput[]
    createMany?: TrainingRecordCreateManyCourseInputEnvelope
    connect?: TrainingRecordWhereUniqueInput | TrainingRecordWhereUniqueInput[]
  }

  export type EnrollmentUncheckedCreateNestedManyWithoutCourseInput = {
    create?: XOR<EnrollmentCreateWithoutCourseInput, EnrollmentUncheckedCreateWithoutCourseInput> | EnrollmentCreateWithoutCourseInput[] | EnrollmentUncheckedCreateWithoutCourseInput[]
    connectOrCreate?: EnrollmentCreateOrConnectWithoutCourseInput | EnrollmentCreateOrConnectWithoutCourseInput[]
    createMany?: EnrollmentCreateManyCourseInputEnvelope
    connect?: EnrollmentWhereUniqueInput | EnrollmentWhereUniqueInput[]
  }

  export type TrainingRecordUncheckedCreateNestedManyWithoutCourseInput = {
    create?: XOR<TrainingRecordCreateWithoutCourseInput, TrainingRecordUncheckedCreateWithoutCourseInput> | TrainingRecordCreateWithoutCourseInput[] | TrainingRecordUncheckedCreateWithoutCourseInput[]
    connectOrCreate?: TrainingRecordCreateOrConnectWithoutCourseInput | TrainingRecordCreateOrConnectWithoutCourseInput[]
    createMany?: TrainingRecordCreateManyCourseInputEnvelope
    connect?: TrainingRecordWhereUniqueInput | TrainingRecordWhereUniqueInput[]
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

  export type CourseUpdateprerequisitesInput = {
    set?: string[]
    push?: string | string[]
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type CourseUpdateinstructor_idsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type CourseUpdatetarget_audienceInput = {
    set?: string[]
    push?: string | string[]
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type EnrollmentUpdateManyWithoutCourseNestedInput = {
    create?: XOR<EnrollmentCreateWithoutCourseInput, EnrollmentUncheckedCreateWithoutCourseInput> | EnrollmentCreateWithoutCourseInput[] | EnrollmentUncheckedCreateWithoutCourseInput[]
    connectOrCreate?: EnrollmentCreateOrConnectWithoutCourseInput | EnrollmentCreateOrConnectWithoutCourseInput[]
    upsert?: EnrollmentUpsertWithWhereUniqueWithoutCourseInput | EnrollmentUpsertWithWhereUniqueWithoutCourseInput[]
    createMany?: EnrollmentCreateManyCourseInputEnvelope
    set?: EnrollmentWhereUniqueInput | EnrollmentWhereUniqueInput[]
    disconnect?: EnrollmentWhereUniqueInput | EnrollmentWhereUniqueInput[]
    delete?: EnrollmentWhereUniqueInput | EnrollmentWhereUniqueInput[]
    connect?: EnrollmentWhereUniqueInput | EnrollmentWhereUniqueInput[]
    update?: EnrollmentUpdateWithWhereUniqueWithoutCourseInput | EnrollmentUpdateWithWhereUniqueWithoutCourseInput[]
    updateMany?: EnrollmentUpdateManyWithWhereWithoutCourseInput | EnrollmentUpdateManyWithWhereWithoutCourseInput[]
    deleteMany?: EnrollmentScalarWhereInput | EnrollmentScalarWhereInput[]
  }

  export type TrainingRecordUpdateManyWithoutCourseNestedInput = {
    create?: XOR<TrainingRecordCreateWithoutCourseInput, TrainingRecordUncheckedCreateWithoutCourseInput> | TrainingRecordCreateWithoutCourseInput[] | TrainingRecordUncheckedCreateWithoutCourseInput[]
    connectOrCreate?: TrainingRecordCreateOrConnectWithoutCourseInput | TrainingRecordCreateOrConnectWithoutCourseInput[]
    upsert?: TrainingRecordUpsertWithWhereUniqueWithoutCourseInput | TrainingRecordUpsertWithWhereUniqueWithoutCourseInput[]
    createMany?: TrainingRecordCreateManyCourseInputEnvelope
    set?: TrainingRecordWhereUniqueInput | TrainingRecordWhereUniqueInput[]
    disconnect?: TrainingRecordWhereUniqueInput | TrainingRecordWhereUniqueInput[]
    delete?: TrainingRecordWhereUniqueInput | TrainingRecordWhereUniqueInput[]
    connect?: TrainingRecordWhereUniqueInput | TrainingRecordWhereUniqueInput[]
    update?: TrainingRecordUpdateWithWhereUniqueWithoutCourseInput | TrainingRecordUpdateWithWhereUniqueWithoutCourseInput[]
    updateMany?: TrainingRecordUpdateManyWithWhereWithoutCourseInput | TrainingRecordUpdateManyWithWhereWithoutCourseInput[]
    deleteMany?: TrainingRecordScalarWhereInput | TrainingRecordScalarWhereInput[]
  }

  export type EnrollmentUncheckedUpdateManyWithoutCourseNestedInput = {
    create?: XOR<EnrollmentCreateWithoutCourseInput, EnrollmentUncheckedCreateWithoutCourseInput> | EnrollmentCreateWithoutCourseInput[] | EnrollmentUncheckedCreateWithoutCourseInput[]
    connectOrCreate?: EnrollmentCreateOrConnectWithoutCourseInput | EnrollmentCreateOrConnectWithoutCourseInput[]
    upsert?: EnrollmentUpsertWithWhereUniqueWithoutCourseInput | EnrollmentUpsertWithWhereUniqueWithoutCourseInput[]
    createMany?: EnrollmentCreateManyCourseInputEnvelope
    set?: EnrollmentWhereUniqueInput | EnrollmentWhereUniqueInput[]
    disconnect?: EnrollmentWhereUniqueInput | EnrollmentWhereUniqueInput[]
    delete?: EnrollmentWhereUniqueInput | EnrollmentWhereUniqueInput[]
    connect?: EnrollmentWhereUniqueInput | EnrollmentWhereUniqueInput[]
    update?: EnrollmentUpdateWithWhereUniqueWithoutCourseInput | EnrollmentUpdateWithWhereUniqueWithoutCourseInput[]
    updateMany?: EnrollmentUpdateManyWithWhereWithoutCourseInput | EnrollmentUpdateManyWithWhereWithoutCourseInput[]
    deleteMany?: EnrollmentScalarWhereInput | EnrollmentScalarWhereInput[]
  }

  export type TrainingRecordUncheckedUpdateManyWithoutCourseNestedInput = {
    create?: XOR<TrainingRecordCreateWithoutCourseInput, TrainingRecordUncheckedCreateWithoutCourseInput> | TrainingRecordCreateWithoutCourseInput[] | TrainingRecordUncheckedCreateWithoutCourseInput[]
    connectOrCreate?: TrainingRecordCreateOrConnectWithoutCourseInput | TrainingRecordCreateOrConnectWithoutCourseInput[]
    upsert?: TrainingRecordUpsertWithWhereUniqueWithoutCourseInput | TrainingRecordUpsertWithWhereUniqueWithoutCourseInput[]
    createMany?: TrainingRecordCreateManyCourseInputEnvelope
    set?: TrainingRecordWhereUniqueInput | TrainingRecordWhereUniqueInput[]
    disconnect?: TrainingRecordWhereUniqueInput | TrainingRecordWhereUniqueInput[]
    delete?: TrainingRecordWhereUniqueInput | TrainingRecordWhereUniqueInput[]
    connect?: TrainingRecordWhereUniqueInput | TrainingRecordWhereUniqueInput[]
    update?: TrainingRecordUpdateWithWhereUniqueWithoutCourseInput | TrainingRecordUpdateWithWhereUniqueWithoutCourseInput[]
    updateMany?: TrainingRecordUpdateManyWithWhereWithoutCourseInput | TrainingRecordUpdateManyWithWhereWithoutCourseInput[]
    deleteMany?: TrainingRecordScalarWhereInput | TrainingRecordScalarWhereInput[]
  }

  export type CourseCreateNestedOneWithoutEnrollmentsInput = {
    create?: XOR<CourseCreateWithoutEnrollmentsInput, CourseUncheckedCreateWithoutEnrollmentsInput>
    connectOrCreate?: CourseCreateOrConnectWithoutEnrollmentsInput
    connect?: CourseWhereUniqueInput
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type CourseUpdateOneRequiredWithoutEnrollmentsNestedInput = {
    create?: XOR<CourseCreateWithoutEnrollmentsInput, CourseUncheckedCreateWithoutEnrollmentsInput>
    connectOrCreate?: CourseCreateOrConnectWithoutEnrollmentsInput
    upsert?: CourseUpsertWithoutEnrollmentsInput
    connect?: CourseWhereUniqueInput
    update?: XOR<XOR<CourseUpdateToOneWithWhereWithoutEnrollmentsInput, CourseUpdateWithoutEnrollmentsInput>, CourseUncheckedUpdateWithoutEnrollmentsInput>
  }

  export type CourseCreateNestedOneWithoutTraining_recordsInput = {
    create?: XOR<CourseCreateWithoutTraining_recordsInput, CourseUncheckedCreateWithoutTraining_recordsInput>
    connectOrCreate?: CourseCreateOrConnectWithoutTraining_recordsInput
    connect?: CourseWhereUniqueInput
  }

  export type KirkpatrickEvaluationCreateNestedManyWithoutTraining_recordInput = {
    create?: XOR<KirkpatrickEvaluationCreateWithoutTraining_recordInput, KirkpatrickEvaluationUncheckedCreateWithoutTraining_recordInput> | KirkpatrickEvaluationCreateWithoutTraining_recordInput[] | KirkpatrickEvaluationUncheckedCreateWithoutTraining_recordInput[]
    connectOrCreate?: KirkpatrickEvaluationCreateOrConnectWithoutTraining_recordInput | KirkpatrickEvaluationCreateOrConnectWithoutTraining_recordInput[]
    createMany?: KirkpatrickEvaluationCreateManyTraining_recordInputEnvelope
    connect?: KirkpatrickEvaluationWhereUniqueInput | KirkpatrickEvaluationWhereUniqueInput[]
  }

  export type KirkpatrickEvaluationUncheckedCreateNestedManyWithoutTraining_recordInput = {
    create?: XOR<KirkpatrickEvaluationCreateWithoutTraining_recordInput, KirkpatrickEvaluationUncheckedCreateWithoutTraining_recordInput> | KirkpatrickEvaluationCreateWithoutTraining_recordInput[] | KirkpatrickEvaluationUncheckedCreateWithoutTraining_recordInput[]
    connectOrCreate?: KirkpatrickEvaluationCreateOrConnectWithoutTraining_recordInput | KirkpatrickEvaluationCreateOrConnectWithoutTraining_recordInput[]
    createMany?: KirkpatrickEvaluationCreateManyTraining_recordInputEnvelope
    connect?: KirkpatrickEvaluationWhereUniqueInput | KirkpatrickEvaluationWhereUniqueInput[]
  }

  export type CourseUpdateOneWithoutTraining_recordsNestedInput = {
    create?: XOR<CourseCreateWithoutTraining_recordsInput, CourseUncheckedCreateWithoutTraining_recordsInput>
    connectOrCreate?: CourseCreateOrConnectWithoutTraining_recordsInput
    upsert?: CourseUpsertWithoutTraining_recordsInput
    disconnect?: CourseWhereInput | boolean
    delete?: CourseWhereInput | boolean
    connect?: CourseWhereUniqueInput
    update?: XOR<XOR<CourseUpdateToOneWithWhereWithoutTraining_recordsInput, CourseUpdateWithoutTraining_recordsInput>, CourseUncheckedUpdateWithoutTraining_recordsInput>
  }

  export type KirkpatrickEvaluationUpdateManyWithoutTraining_recordNestedInput = {
    create?: XOR<KirkpatrickEvaluationCreateWithoutTraining_recordInput, KirkpatrickEvaluationUncheckedCreateWithoutTraining_recordInput> | KirkpatrickEvaluationCreateWithoutTraining_recordInput[] | KirkpatrickEvaluationUncheckedCreateWithoutTraining_recordInput[]
    connectOrCreate?: KirkpatrickEvaluationCreateOrConnectWithoutTraining_recordInput | KirkpatrickEvaluationCreateOrConnectWithoutTraining_recordInput[]
    upsert?: KirkpatrickEvaluationUpsertWithWhereUniqueWithoutTraining_recordInput | KirkpatrickEvaluationUpsertWithWhereUniqueWithoutTraining_recordInput[]
    createMany?: KirkpatrickEvaluationCreateManyTraining_recordInputEnvelope
    set?: KirkpatrickEvaluationWhereUniqueInput | KirkpatrickEvaluationWhereUniqueInput[]
    disconnect?: KirkpatrickEvaluationWhereUniqueInput | KirkpatrickEvaluationWhereUniqueInput[]
    delete?: KirkpatrickEvaluationWhereUniqueInput | KirkpatrickEvaluationWhereUniqueInput[]
    connect?: KirkpatrickEvaluationWhereUniqueInput | KirkpatrickEvaluationWhereUniqueInput[]
    update?: KirkpatrickEvaluationUpdateWithWhereUniqueWithoutTraining_recordInput | KirkpatrickEvaluationUpdateWithWhereUniqueWithoutTraining_recordInput[]
    updateMany?: KirkpatrickEvaluationUpdateManyWithWhereWithoutTraining_recordInput | KirkpatrickEvaluationUpdateManyWithWhereWithoutTraining_recordInput[]
    deleteMany?: KirkpatrickEvaluationScalarWhereInput | KirkpatrickEvaluationScalarWhereInput[]
  }

  export type KirkpatrickEvaluationUncheckedUpdateManyWithoutTraining_recordNestedInput = {
    create?: XOR<KirkpatrickEvaluationCreateWithoutTraining_recordInput, KirkpatrickEvaluationUncheckedCreateWithoutTraining_recordInput> | KirkpatrickEvaluationCreateWithoutTraining_recordInput[] | KirkpatrickEvaluationUncheckedCreateWithoutTraining_recordInput[]
    connectOrCreate?: KirkpatrickEvaluationCreateOrConnectWithoutTraining_recordInput | KirkpatrickEvaluationCreateOrConnectWithoutTraining_recordInput[]
    upsert?: KirkpatrickEvaluationUpsertWithWhereUniqueWithoutTraining_recordInput | KirkpatrickEvaluationUpsertWithWhereUniqueWithoutTraining_recordInput[]
    createMany?: KirkpatrickEvaluationCreateManyTraining_recordInputEnvelope
    set?: KirkpatrickEvaluationWhereUniqueInput | KirkpatrickEvaluationWhereUniqueInput[]
    disconnect?: KirkpatrickEvaluationWhereUniqueInput | KirkpatrickEvaluationWhereUniqueInput[]
    delete?: KirkpatrickEvaluationWhereUniqueInput | KirkpatrickEvaluationWhereUniqueInput[]
    connect?: KirkpatrickEvaluationWhereUniqueInput | KirkpatrickEvaluationWhereUniqueInput[]
    update?: KirkpatrickEvaluationUpdateWithWhereUniqueWithoutTraining_recordInput | KirkpatrickEvaluationUpdateWithWhereUniqueWithoutTraining_recordInput[]
    updateMany?: KirkpatrickEvaluationUpdateManyWithWhereWithoutTraining_recordInput | KirkpatrickEvaluationUpdateManyWithWhereWithoutTraining_recordInput[]
    deleteMany?: KirkpatrickEvaluationScalarWhereInput | KirkpatrickEvaluationScalarWhereInput[]
  }

  export type TrainingRecordCreateNestedOneWithoutEvaluationsInput = {
    create?: XOR<TrainingRecordCreateWithoutEvaluationsInput, TrainingRecordUncheckedCreateWithoutEvaluationsInput>
    connectOrCreate?: TrainingRecordCreateOrConnectWithoutEvaluationsInput
    connect?: TrainingRecordWhereUniqueInput
  }

  export type TrainingRecordUpdateOneRequiredWithoutEvaluationsNestedInput = {
    create?: XOR<TrainingRecordCreateWithoutEvaluationsInput, TrainingRecordUncheckedCreateWithoutEvaluationsInput>
    connectOrCreate?: TrainingRecordCreateOrConnectWithoutEvaluationsInput
    upsert?: TrainingRecordUpsertWithoutEvaluationsInput
    connect?: TrainingRecordWhereUniqueInput
    update?: XOR<XOR<TrainingRecordUpdateToOneWithWhereWithoutEvaluationsInput, TrainingRecordUpdateWithoutEvaluationsInput>, TrainingRecordUncheckedUpdateWithoutEvaluationsInput>
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

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
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

  export type EnrollmentCreateWithoutCourseInput = {
    id?: string
    employee_id: string
    schedule_id?: string | null
    status?: string
    enrollment_date?: Date | string
    completion_date?: Date | string | null
    score?: number | null
    progress?: number
    certificate_id?: string | null
    attendance_rate?: number | null
    feedback?: string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type EnrollmentUncheckedCreateWithoutCourseInput = {
    id?: string
    employee_id: string
    schedule_id?: string | null
    status?: string
    enrollment_date?: Date | string
    completion_date?: Date | string | null
    score?: number | null
    progress?: number
    certificate_id?: string | null
    attendance_rate?: number | null
    feedback?: string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type EnrollmentCreateOrConnectWithoutCourseInput = {
    where: EnrollmentWhereUniqueInput
    create: XOR<EnrollmentCreateWithoutCourseInput, EnrollmentUncheckedCreateWithoutCourseInput>
  }

  export type EnrollmentCreateManyCourseInputEnvelope = {
    data: EnrollmentCreateManyCourseInput | EnrollmentCreateManyCourseInput[]
    skipDuplicates?: boolean
  }

  export type TrainingRecordCreateWithoutCourseInput = {
    id?: string
    employee_id: string
    course_code: string
    course_name_en: string
    course_name_th?: string | null
    training_type: string
    category: string
    provider?: string | null
    instructor_name?: string | null
    start_date: Date | string
    end_date: Date | string
    duration_hours: number
    location?: string | null
    status?: string
    completion_date?: Date | string | null
    certificate_id?: string | null
    cost?: number | null
    currency?: string
    paid_by?: string | null
    pre_assessment_score?: number | null
    post_assessment_score?: number | null
    instructor_rating?: number | null
    course_rating?: number | null
    feedback?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    evaluations?: KirkpatrickEvaluationCreateNestedManyWithoutTraining_recordInput
  }

  export type TrainingRecordUncheckedCreateWithoutCourseInput = {
    id?: string
    employee_id: string
    course_code: string
    course_name_en: string
    course_name_th?: string | null
    training_type: string
    category: string
    provider?: string | null
    instructor_name?: string | null
    start_date: Date | string
    end_date: Date | string
    duration_hours: number
    location?: string | null
    status?: string
    completion_date?: Date | string | null
    certificate_id?: string | null
    cost?: number | null
    currency?: string
    paid_by?: string | null
    pre_assessment_score?: number | null
    post_assessment_score?: number | null
    instructor_rating?: number | null
    course_rating?: number | null
    feedback?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    evaluations?: KirkpatrickEvaluationUncheckedCreateNestedManyWithoutTraining_recordInput
  }

  export type TrainingRecordCreateOrConnectWithoutCourseInput = {
    where: TrainingRecordWhereUniqueInput
    create: XOR<TrainingRecordCreateWithoutCourseInput, TrainingRecordUncheckedCreateWithoutCourseInput>
  }

  export type TrainingRecordCreateManyCourseInputEnvelope = {
    data: TrainingRecordCreateManyCourseInput | TrainingRecordCreateManyCourseInput[]
    skipDuplicates?: boolean
  }

  export type EnrollmentUpsertWithWhereUniqueWithoutCourseInput = {
    where: EnrollmentWhereUniqueInput
    update: XOR<EnrollmentUpdateWithoutCourseInput, EnrollmentUncheckedUpdateWithoutCourseInput>
    create: XOR<EnrollmentCreateWithoutCourseInput, EnrollmentUncheckedCreateWithoutCourseInput>
  }

  export type EnrollmentUpdateWithWhereUniqueWithoutCourseInput = {
    where: EnrollmentWhereUniqueInput
    data: XOR<EnrollmentUpdateWithoutCourseInput, EnrollmentUncheckedUpdateWithoutCourseInput>
  }

  export type EnrollmentUpdateManyWithWhereWithoutCourseInput = {
    where: EnrollmentScalarWhereInput
    data: XOR<EnrollmentUpdateManyMutationInput, EnrollmentUncheckedUpdateManyWithoutCourseInput>
  }

  export type EnrollmentScalarWhereInput = {
    AND?: EnrollmentScalarWhereInput | EnrollmentScalarWhereInput[]
    OR?: EnrollmentScalarWhereInput[]
    NOT?: EnrollmentScalarWhereInput | EnrollmentScalarWhereInput[]
    id?: StringFilter<"Enrollment"> | string
    course_id?: StringFilter<"Enrollment"> | string
    employee_id?: StringFilter<"Enrollment"> | string
    schedule_id?: StringNullableFilter<"Enrollment"> | string | null
    status?: StringFilter<"Enrollment"> | string
    enrollment_date?: DateTimeFilter<"Enrollment"> | Date | string
    completion_date?: DateTimeNullableFilter<"Enrollment"> | Date | string | null
    score?: FloatNullableFilter<"Enrollment"> | number | null
    progress?: IntFilter<"Enrollment"> | number
    certificate_id?: StringNullableFilter<"Enrollment"> | string | null
    attendance_rate?: FloatNullableFilter<"Enrollment"> | number | null
    feedback?: StringNullableFilter<"Enrollment"> | string | null
    created_at?: DateTimeFilter<"Enrollment"> | Date | string
    updated_at?: DateTimeFilter<"Enrollment"> | Date | string
  }

  export type TrainingRecordUpsertWithWhereUniqueWithoutCourseInput = {
    where: TrainingRecordWhereUniqueInput
    update: XOR<TrainingRecordUpdateWithoutCourseInput, TrainingRecordUncheckedUpdateWithoutCourseInput>
    create: XOR<TrainingRecordCreateWithoutCourseInput, TrainingRecordUncheckedCreateWithoutCourseInput>
  }

  export type TrainingRecordUpdateWithWhereUniqueWithoutCourseInput = {
    where: TrainingRecordWhereUniqueInput
    data: XOR<TrainingRecordUpdateWithoutCourseInput, TrainingRecordUncheckedUpdateWithoutCourseInput>
  }

  export type TrainingRecordUpdateManyWithWhereWithoutCourseInput = {
    where: TrainingRecordScalarWhereInput
    data: XOR<TrainingRecordUpdateManyMutationInput, TrainingRecordUncheckedUpdateManyWithoutCourseInput>
  }

  export type TrainingRecordScalarWhereInput = {
    AND?: TrainingRecordScalarWhereInput | TrainingRecordScalarWhereInput[]
    OR?: TrainingRecordScalarWhereInput[]
    NOT?: TrainingRecordScalarWhereInput | TrainingRecordScalarWhereInput[]
    id?: StringFilter<"TrainingRecord"> | string
    course_id?: StringNullableFilter<"TrainingRecord"> | string | null
    employee_id?: StringFilter<"TrainingRecord"> | string
    course_code?: StringFilter<"TrainingRecord"> | string
    course_name_en?: StringFilter<"TrainingRecord"> | string
    course_name_th?: StringNullableFilter<"TrainingRecord"> | string | null
    training_type?: StringFilter<"TrainingRecord"> | string
    category?: StringFilter<"TrainingRecord"> | string
    provider?: StringNullableFilter<"TrainingRecord"> | string | null
    instructor_name?: StringNullableFilter<"TrainingRecord"> | string | null
    start_date?: DateTimeFilter<"TrainingRecord"> | Date | string
    end_date?: DateTimeFilter<"TrainingRecord"> | Date | string
    duration_hours?: IntFilter<"TrainingRecord"> | number
    location?: StringNullableFilter<"TrainingRecord"> | string | null
    status?: StringFilter<"TrainingRecord"> | string
    completion_date?: DateTimeNullableFilter<"TrainingRecord"> | Date | string | null
    certificate_id?: StringNullableFilter<"TrainingRecord"> | string | null
    cost?: FloatNullableFilter<"TrainingRecord"> | number | null
    currency?: StringFilter<"TrainingRecord"> | string
    paid_by?: StringNullableFilter<"TrainingRecord"> | string | null
    pre_assessment_score?: FloatNullableFilter<"TrainingRecord"> | number | null
    post_assessment_score?: FloatNullableFilter<"TrainingRecord"> | number | null
    instructor_rating?: FloatNullableFilter<"TrainingRecord"> | number | null
    course_rating?: FloatNullableFilter<"TrainingRecord"> | number | null
    feedback?: StringNullableFilter<"TrainingRecord"> | string | null
    created_at?: DateTimeFilter<"TrainingRecord"> | Date | string
    updated_at?: DateTimeFilter<"TrainingRecord"> | Date | string
  }

  export type CourseCreateWithoutEnrollmentsInput = {
    id?: string
    code: string
    name_en: string
    name_th?: string | null
    description_en?: string | null
    description_th?: string | null
    category: string
    delivery_method: string
    duration_hours: number
    credits?: number
    level?: string
    mandatory?: boolean
    max_participants?: number
    prerequisites?: CourseCreateprerequisitesInput | string[]
    status?: string
    rating?: number | null
    review_count?: number
    instructor_ids?: CourseCreateinstructor_idsInput | string[]
    target_audience?: CourseCreatetarget_audienceInput | string[]
    created_at?: Date | string
    updated_at?: Date | string
    training_records?: TrainingRecordCreateNestedManyWithoutCourseInput
  }

  export type CourseUncheckedCreateWithoutEnrollmentsInput = {
    id?: string
    code: string
    name_en: string
    name_th?: string | null
    description_en?: string | null
    description_th?: string | null
    category: string
    delivery_method: string
    duration_hours: number
    credits?: number
    level?: string
    mandatory?: boolean
    max_participants?: number
    prerequisites?: CourseCreateprerequisitesInput | string[]
    status?: string
    rating?: number | null
    review_count?: number
    instructor_ids?: CourseCreateinstructor_idsInput | string[]
    target_audience?: CourseCreatetarget_audienceInput | string[]
    created_at?: Date | string
    updated_at?: Date | string
    training_records?: TrainingRecordUncheckedCreateNestedManyWithoutCourseInput
  }

  export type CourseCreateOrConnectWithoutEnrollmentsInput = {
    where: CourseWhereUniqueInput
    create: XOR<CourseCreateWithoutEnrollmentsInput, CourseUncheckedCreateWithoutEnrollmentsInput>
  }

  export type CourseUpsertWithoutEnrollmentsInput = {
    update: XOR<CourseUpdateWithoutEnrollmentsInput, CourseUncheckedUpdateWithoutEnrollmentsInput>
    create: XOR<CourseCreateWithoutEnrollmentsInput, CourseUncheckedCreateWithoutEnrollmentsInput>
    where?: CourseWhereInput
  }

  export type CourseUpdateToOneWithWhereWithoutEnrollmentsInput = {
    where?: CourseWhereInput
    data: XOR<CourseUpdateWithoutEnrollmentsInput, CourseUncheckedUpdateWithoutEnrollmentsInput>
  }

  export type CourseUpdateWithoutEnrollmentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    name_en?: StringFieldUpdateOperationsInput | string
    name_th?: NullableStringFieldUpdateOperationsInput | string | null
    description_en?: NullableStringFieldUpdateOperationsInput | string | null
    description_th?: NullableStringFieldUpdateOperationsInput | string | null
    category?: StringFieldUpdateOperationsInput | string
    delivery_method?: StringFieldUpdateOperationsInput | string
    duration_hours?: IntFieldUpdateOperationsInput | number
    credits?: IntFieldUpdateOperationsInput | number
    level?: StringFieldUpdateOperationsInput | string
    mandatory?: BoolFieldUpdateOperationsInput | boolean
    max_participants?: IntFieldUpdateOperationsInput | number
    prerequisites?: CourseUpdateprerequisitesInput | string[]
    status?: StringFieldUpdateOperationsInput | string
    rating?: NullableFloatFieldUpdateOperationsInput | number | null
    review_count?: IntFieldUpdateOperationsInput | number
    instructor_ids?: CourseUpdateinstructor_idsInput | string[]
    target_audience?: CourseUpdatetarget_audienceInput | string[]
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    training_records?: TrainingRecordUpdateManyWithoutCourseNestedInput
  }

  export type CourseUncheckedUpdateWithoutEnrollmentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    name_en?: StringFieldUpdateOperationsInput | string
    name_th?: NullableStringFieldUpdateOperationsInput | string | null
    description_en?: NullableStringFieldUpdateOperationsInput | string | null
    description_th?: NullableStringFieldUpdateOperationsInput | string | null
    category?: StringFieldUpdateOperationsInput | string
    delivery_method?: StringFieldUpdateOperationsInput | string
    duration_hours?: IntFieldUpdateOperationsInput | number
    credits?: IntFieldUpdateOperationsInput | number
    level?: StringFieldUpdateOperationsInput | string
    mandatory?: BoolFieldUpdateOperationsInput | boolean
    max_participants?: IntFieldUpdateOperationsInput | number
    prerequisites?: CourseUpdateprerequisitesInput | string[]
    status?: StringFieldUpdateOperationsInput | string
    rating?: NullableFloatFieldUpdateOperationsInput | number | null
    review_count?: IntFieldUpdateOperationsInput | number
    instructor_ids?: CourseUpdateinstructor_idsInput | string[]
    target_audience?: CourseUpdatetarget_audienceInput | string[]
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    training_records?: TrainingRecordUncheckedUpdateManyWithoutCourseNestedInput
  }

  export type CourseCreateWithoutTraining_recordsInput = {
    id?: string
    code: string
    name_en: string
    name_th?: string | null
    description_en?: string | null
    description_th?: string | null
    category: string
    delivery_method: string
    duration_hours: number
    credits?: number
    level?: string
    mandatory?: boolean
    max_participants?: number
    prerequisites?: CourseCreateprerequisitesInput | string[]
    status?: string
    rating?: number | null
    review_count?: number
    instructor_ids?: CourseCreateinstructor_idsInput | string[]
    target_audience?: CourseCreatetarget_audienceInput | string[]
    created_at?: Date | string
    updated_at?: Date | string
    enrollments?: EnrollmentCreateNestedManyWithoutCourseInput
  }

  export type CourseUncheckedCreateWithoutTraining_recordsInput = {
    id?: string
    code: string
    name_en: string
    name_th?: string | null
    description_en?: string | null
    description_th?: string | null
    category: string
    delivery_method: string
    duration_hours: number
    credits?: number
    level?: string
    mandatory?: boolean
    max_participants?: number
    prerequisites?: CourseCreateprerequisitesInput | string[]
    status?: string
    rating?: number | null
    review_count?: number
    instructor_ids?: CourseCreateinstructor_idsInput | string[]
    target_audience?: CourseCreatetarget_audienceInput | string[]
    created_at?: Date | string
    updated_at?: Date | string
    enrollments?: EnrollmentUncheckedCreateNestedManyWithoutCourseInput
  }

  export type CourseCreateOrConnectWithoutTraining_recordsInput = {
    where: CourseWhereUniqueInput
    create: XOR<CourseCreateWithoutTraining_recordsInput, CourseUncheckedCreateWithoutTraining_recordsInput>
  }

  export type KirkpatrickEvaluationCreateWithoutTraining_recordInput = {
    id?: string
    level: number
    level_name: string
    score?: number | null
    evaluator_id?: string | null
    evaluation_date?: Date | string | null
    comments?: string | null
    evidence?: string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type KirkpatrickEvaluationUncheckedCreateWithoutTraining_recordInput = {
    id?: string
    level: number
    level_name: string
    score?: number | null
    evaluator_id?: string | null
    evaluation_date?: Date | string | null
    comments?: string | null
    evidence?: string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type KirkpatrickEvaluationCreateOrConnectWithoutTraining_recordInput = {
    where: KirkpatrickEvaluationWhereUniqueInput
    create: XOR<KirkpatrickEvaluationCreateWithoutTraining_recordInput, KirkpatrickEvaluationUncheckedCreateWithoutTraining_recordInput>
  }

  export type KirkpatrickEvaluationCreateManyTraining_recordInputEnvelope = {
    data: KirkpatrickEvaluationCreateManyTraining_recordInput | KirkpatrickEvaluationCreateManyTraining_recordInput[]
    skipDuplicates?: boolean
  }

  export type CourseUpsertWithoutTraining_recordsInput = {
    update: XOR<CourseUpdateWithoutTraining_recordsInput, CourseUncheckedUpdateWithoutTraining_recordsInput>
    create: XOR<CourseCreateWithoutTraining_recordsInput, CourseUncheckedCreateWithoutTraining_recordsInput>
    where?: CourseWhereInput
  }

  export type CourseUpdateToOneWithWhereWithoutTraining_recordsInput = {
    where?: CourseWhereInput
    data: XOR<CourseUpdateWithoutTraining_recordsInput, CourseUncheckedUpdateWithoutTraining_recordsInput>
  }

  export type CourseUpdateWithoutTraining_recordsInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    name_en?: StringFieldUpdateOperationsInput | string
    name_th?: NullableStringFieldUpdateOperationsInput | string | null
    description_en?: NullableStringFieldUpdateOperationsInput | string | null
    description_th?: NullableStringFieldUpdateOperationsInput | string | null
    category?: StringFieldUpdateOperationsInput | string
    delivery_method?: StringFieldUpdateOperationsInput | string
    duration_hours?: IntFieldUpdateOperationsInput | number
    credits?: IntFieldUpdateOperationsInput | number
    level?: StringFieldUpdateOperationsInput | string
    mandatory?: BoolFieldUpdateOperationsInput | boolean
    max_participants?: IntFieldUpdateOperationsInput | number
    prerequisites?: CourseUpdateprerequisitesInput | string[]
    status?: StringFieldUpdateOperationsInput | string
    rating?: NullableFloatFieldUpdateOperationsInput | number | null
    review_count?: IntFieldUpdateOperationsInput | number
    instructor_ids?: CourseUpdateinstructor_idsInput | string[]
    target_audience?: CourseUpdatetarget_audienceInput | string[]
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    enrollments?: EnrollmentUpdateManyWithoutCourseNestedInput
  }

  export type CourseUncheckedUpdateWithoutTraining_recordsInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    name_en?: StringFieldUpdateOperationsInput | string
    name_th?: NullableStringFieldUpdateOperationsInput | string | null
    description_en?: NullableStringFieldUpdateOperationsInput | string | null
    description_th?: NullableStringFieldUpdateOperationsInput | string | null
    category?: StringFieldUpdateOperationsInput | string
    delivery_method?: StringFieldUpdateOperationsInput | string
    duration_hours?: IntFieldUpdateOperationsInput | number
    credits?: IntFieldUpdateOperationsInput | number
    level?: StringFieldUpdateOperationsInput | string
    mandatory?: BoolFieldUpdateOperationsInput | boolean
    max_participants?: IntFieldUpdateOperationsInput | number
    prerequisites?: CourseUpdateprerequisitesInput | string[]
    status?: StringFieldUpdateOperationsInput | string
    rating?: NullableFloatFieldUpdateOperationsInput | number | null
    review_count?: IntFieldUpdateOperationsInput | number
    instructor_ids?: CourseUpdateinstructor_idsInput | string[]
    target_audience?: CourseUpdatetarget_audienceInput | string[]
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    enrollments?: EnrollmentUncheckedUpdateManyWithoutCourseNestedInput
  }

  export type KirkpatrickEvaluationUpsertWithWhereUniqueWithoutTraining_recordInput = {
    where: KirkpatrickEvaluationWhereUniqueInput
    update: XOR<KirkpatrickEvaluationUpdateWithoutTraining_recordInput, KirkpatrickEvaluationUncheckedUpdateWithoutTraining_recordInput>
    create: XOR<KirkpatrickEvaluationCreateWithoutTraining_recordInput, KirkpatrickEvaluationUncheckedCreateWithoutTraining_recordInput>
  }

  export type KirkpatrickEvaluationUpdateWithWhereUniqueWithoutTraining_recordInput = {
    where: KirkpatrickEvaluationWhereUniqueInput
    data: XOR<KirkpatrickEvaluationUpdateWithoutTraining_recordInput, KirkpatrickEvaluationUncheckedUpdateWithoutTraining_recordInput>
  }

  export type KirkpatrickEvaluationUpdateManyWithWhereWithoutTraining_recordInput = {
    where: KirkpatrickEvaluationScalarWhereInput
    data: XOR<KirkpatrickEvaluationUpdateManyMutationInput, KirkpatrickEvaluationUncheckedUpdateManyWithoutTraining_recordInput>
  }

  export type KirkpatrickEvaluationScalarWhereInput = {
    AND?: KirkpatrickEvaluationScalarWhereInput | KirkpatrickEvaluationScalarWhereInput[]
    OR?: KirkpatrickEvaluationScalarWhereInput[]
    NOT?: KirkpatrickEvaluationScalarWhereInput | KirkpatrickEvaluationScalarWhereInput[]
    id?: StringFilter<"KirkpatrickEvaluation"> | string
    training_record_id?: StringFilter<"KirkpatrickEvaluation"> | string
    level?: IntFilter<"KirkpatrickEvaluation"> | number
    level_name?: StringFilter<"KirkpatrickEvaluation"> | string
    score?: FloatNullableFilter<"KirkpatrickEvaluation"> | number | null
    evaluator_id?: StringNullableFilter<"KirkpatrickEvaluation"> | string | null
    evaluation_date?: DateTimeNullableFilter<"KirkpatrickEvaluation"> | Date | string | null
    comments?: StringNullableFilter<"KirkpatrickEvaluation"> | string | null
    evidence?: StringNullableFilter<"KirkpatrickEvaluation"> | string | null
    created_at?: DateTimeFilter<"KirkpatrickEvaluation"> | Date | string
    updated_at?: DateTimeFilter<"KirkpatrickEvaluation"> | Date | string
  }

  export type TrainingRecordCreateWithoutEvaluationsInput = {
    id?: string
    employee_id: string
    course_code: string
    course_name_en: string
    course_name_th?: string | null
    training_type: string
    category: string
    provider?: string | null
    instructor_name?: string | null
    start_date: Date | string
    end_date: Date | string
    duration_hours: number
    location?: string | null
    status?: string
    completion_date?: Date | string | null
    certificate_id?: string | null
    cost?: number | null
    currency?: string
    paid_by?: string | null
    pre_assessment_score?: number | null
    post_assessment_score?: number | null
    instructor_rating?: number | null
    course_rating?: number | null
    feedback?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    course?: CourseCreateNestedOneWithoutTraining_recordsInput
  }

  export type TrainingRecordUncheckedCreateWithoutEvaluationsInput = {
    id?: string
    course_id?: string | null
    employee_id: string
    course_code: string
    course_name_en: string
    course_name_th?: string | null
    training_type: string
    category: string
    provider?: string | null
    instructor_name?: string | null
    start_date: Date | string
    end_date: Date | string
    duration_hours: number
    location?: string | null
    status?: string
    completion_date?: Date | string | null
    certificate_id?: string | null
    cost?: number | null
    currency?: string
    paid_by?: string | null
    pre_assessment_score?: number | null
    post_assessment_score?: number | null
    instructor_rating?: number | null
    course_rating?: number | null
    feedback?: string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type TrainingRecordCreateOrConnectWithoutEvaluationsInput = {
    where: TrainingRecordWhereUniqueInput
    create: XOR<TrainingRecordCreateWithoutEvaluationsInput, TrainingRecordUncheckedCreateWithoutEvaluationsInput>
  }

  export type TrainingRecordUpsertWithoutEvaluationsInput = {
    update: XOR<TrainingRecordUpdateWithoutEvaluationsInput, TrainingRecordUncheckedUpdateWithoutEvaluationsInput>
    create: XOR<TrainingRecordCreateWithoutEvaluationsInput, TrainingRecordUncheckedCreateWithoutEvaluationsInput>
    where?: TrainingRecordWhereInput
  }

  export type TrainingRecordUpdateToOneWithWhereWithoutEvaluationsInput = {
    where?: TrainingRecordWhereInput
    data: XOR<TrainingRecordUpdateWithoutEvaluationsInput, TrainingRecordUncheckedUpdateWithoutEvaluationsInput>
  }

  export type TrainingRecordUpdateWithoutEvaluationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    employee_id?: StringFieldUpdateOperationsInput | string
    course_code?: StringFieldUpdateOperationsInput | string
    course_name_en?: StringFieldUpdateOperationsInput | string
    course_name_th?: NullableStringFieldUpdateOperationsInput | string | null
    training_type?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    provider?: NullableStringFieldUpdateOperationsInput | string | null
    instructor_name?: NullableStringFieldUpdateOperationsInput | string | null
    start_date?: DateTimeFieldUpdateOperationsInput | Date | string
    end_date?: DateTimeFieldUpdateOperationsInput | Date | string
    duration_hours?: IntFieldUpdateOperationsInput | number
    location?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    completion_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    certificate_id?: NullableStringFieldUpdateOperationsInput | string | null
    cost?: NullableFloatFieldUpdateOperationsInput | number | null
    currency?: StringFieldUpdateOperationsInput | string
    paid_by?: NullableStringFieldUpdateOperationsInput | string | null
    pre_assessment_score?: NullableFloatFieldUpdateOperationsInput | number | null
    post_assessment_score?: NullableFloatFieldUpdateOperationsInput | number | null
    instructor_rating?: NullableFloatFieldUpdateOperationsInput | number | null
    course_rating?: NullableFloatFieldUpdateOperationsInput | number | null
    feedback?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    course?: CourseUpdateOneWithoutTraining_recordsNestedInput
  }

  export type TrainingRecordUncheckedUpdateWithoutEvaluationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    course_id?: NullableStringFieldUpdateOperationsInput | string | null
    employee_id?: StringFieldUpdateOperationsInput | string
    course_code?: StringFieldUpdateOperationsInput | string
    course_name_en?: StringFieldUpdateOperationsInput | string
    course_name_th?: NullableStringFieldUpdateOperationsInput | string | null
    training_type?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    provider?: NullableStringFieldUpdateOperationsInput | string | null
    instructor_name?: NullableStringFieldUpdateOperationsInput | string | null
    start_date?: DateTimeFieldUpdateOperationsInput | Date | string
    end_date?: DateTimeFieldUpdateOperationsInput | Date | string
    duration_hours?: IntFieldUpdateOperationsInput | number
    location?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    completion_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    certificate_id?: NullableStringFieldUpdateOperationsInput | string | null
    cost?: NullableFloatFieldUpdateOperationsInput | number | null
    currency?: StringFieldUpdateOperationsInput | string
    paid_by?: NullableStringFieldUpdateOperationsInput | string | null
    pre_assessment_score?: NullableFloatFieldUpdateOperationsInput | number | null
    post_assessment_score?: NullableFloatFieldUpdateOperationsInput | number | null
    instructor_rating?: NullableFloatFieldUpdateOperationsInput | number | null
    course_rating?: NullableFloatFieldUpdateOperationsInput | number | null
    feedback?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EnrollmentCreateManyCourseInput = {
    id?: string
    employee_id: string
    schedule_id?: string | null
    status?: string
    enrollment_date?: Date | string
    completion_date?: Date | string | null
    score?: number | null
    progress?: number
    certificate_id?: string | null
    attendance_rate?: number | null
    feedback?: string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type TrainingRecordCreateManyCourseInput = {
    id?: string
    employee_id: string
    course_code: string
    course_name_en: string
    course_name_th?: string | null
    training_type: string
    category: string
    provider?: string | null
    instructor_name?: string | null
    start_date: Date | string
    end_date: Date | string
    duration_hours: number
    location?: string | null
    status?: string
    completion_date?: Date | string | null
    certificate_id?: string | null
    cost?: number | null
    currency?: string
    paid_by?: string | null
    pre_assessment_score?: number | null
    post_assessment_score?: number | null
    instructor_rating?: number | null
    course_rating?: number | null
    feedback?: string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type EnrollmentUpdateWithoutCourseInput = {
    id?: StringFieldUpdateOperationsInput | string
    employee_id?: StringFieldUpdateOperationsInput | string
    schedule_id?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    enrollment_date?: DateTimeFieldUpdateOperationsInput | Date | string
    completion_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    score?: NullableFloatFieldUpdateOperationsInput | number | null
    progress?: IntFieldUpdateOperationsInput | number
    certificate_id?: NullableStringFieldUpdateOperationsInput | string | null
    attendance_rate?: NullableFloatFieldUpdateOperationsInput | number | null
    feedback?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EnrollmentUncheckedUpdateWithoutCourseInput = {
    id?: StringFieldUpdateOperationsInput | string
    employee_id?: StringFieldUpdateOperationsInput | string
    schedule_id?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    enrollment_date?: DateTimeFieldUpdateOperationsInput | Date | string
    completion_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    score?: NullableFloatFieldUpdateOperationsInput | number | null
    progress?: IntFieldUpdateOperationsInput | number
    certificate_id?: NullableStringFieldUpdateOperationsInput | string | null
    attendance_rate?: NullableFloatFieldUpdateOperationsInput | number | null
    feedback?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EnrollmentUncheckedUpdateManyWithoutCourseInput = {
    id?: StringFieldUpdateOperationsInput | string
    employee_id?: StringFieldUpdateOperationsInput | string
    schedule_id?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    enrollment_date?: DateTimeFieldUpdateOperationsInput | Date | string
    completion_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    score?: NullableFloatFieldUpdateOperationsInput | number | null
    progress?: IntFieldUpdateOperationsInput | number
    certificate_id?: NullableStringFieldUpdateOperationsInput | string | null
    attendance_rate?: NullableFloatFieldUpdateOperationsInput | number | null
    feedback?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TrainingRecordUpdateWithoutCourseInput = {
    id?: StringFieldUpdateOperationsInput | string
    employee_id?: StringFieldUpdateOperationsInput | string
    course_code?: StringFieldUpdateOperationsInput | string
    course_name_en?: StringFieldUpdateOperationsInput | string
    course_name_th?: NullableStringFieldUpdateOperationsInput | string | null
    training_type?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    provider?: NullableStringFieldUpdateOperationsInput | string | null
    instructor_name?: NullableStringFieldUpdateOperationsInput | string | null
    start_date?: DateTimeFieldUpdateOperationsInput | Date | string
    end_date?: DateTimeFieldUpdateOperationsInput | Date | string
    duration_hours?: IntFieldUpdateOperationsInput | number
    location?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    completion_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    certificate_id?: NullableStringFieldUpdateOperationsInput | string | null
    cost?: NullableFloatFieldUpdateOperationsInput | number | null
    currency?: StringFieldUpdateOperationsInput | string
    paid_by?: NullableStringFieldUpdateOperationsInput | string | null
    pre_assessment_score?: NullableFloatFieldUpdateOperationsInput | number | null
    post_assessment_score?: NullableFloatFieldUpdateOperationsInput | number | null
    instructor_rating?: NullableFloatFieldUpdateOperationsInput | number | null
    course_rating?: NullableFloatFieldUpdateOperationsInput | number | null
    feedback?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    evaluations?: KirkpatrickEvaluationUpdateManyWithoutTraining_recordNestedInput
  }

  export type TrainingRecordUncheckedUpdateWithoutCourseInput = {
    id?: StringFieldUpdateOperationsInput | string
    employee_id?: StringFieldUpdateOperationsInput | string
    course_code?: StringFieldUpdateOperationsInput | string
    course_name_en?: StringFieldUpdateOperationsInput | string
    course_name_th?: NullableStringFieldUpdateOperationsInput | string | null
    training_type?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    provider?: NullableStringFieldUpdateOperationsInput | string | null
    instructor_name?: NullableStringFieldUpdateOperationsInput | string | null
    start_date?: DateTimeFieldUpdateOperationsInput | Date | string
    end_date?: DateTimeFieldUpdateOperationsInput | Date | string
    duration_hours?: IntFieldUpdateOperationsInput | number
    location?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    completion_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    certificate_id?: NullableStringFieldUpdateOperationsInput | string | null
    cost?: NullableFloatFieldUpdateOperationsInput | number | null
    currency?: StringFieldUpdateOperationsInput | string
    paid_by?: NullableStringFieldUpdateOperationsInput | string | null
    pre_assessment_score?: NullableFloatFieldUpdateOperationsInput | number | null
    post_assessment_score?: NullableFloatFieldUpdateOperationsInput | number | null
    instructor_rating?: NullableFloatFieldUpdateOperationsInput | number | null
    course_rating?: NullableFloatFieldUpdateOperationsInput | number | null
    feedback?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    evaluations?: KirkpatrickEvaluationUncheckedUpdateManyWithoutTraining_recordNestedInput
  }

  export type TrainingRecordUncheckedUpdateManyWithoutCourseInput = {
    id?: StringFieldUpdateOperationsInput | string
    employee_id?: StringFieldUpdateOperationsInput | string
    course_code?: StringFieldUpdateOperationsInput | string
    course_name_en?: StringFieldUpdateOperationsInput | string
    course_name_th?: NullableStringFieldUpdateOperationsInput | string | null
    training_type?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    provider?: NullableStringFieldUpdateOperationsInput | string | null
    instructor_name?: NullableStringFieldUpdateOperationsInput | string | null
    start_date?: DateTimeFieldUpdateOperationsInput | Date | string
    end_date?: DateTimeFieldUpdateOperationsInput | Date | string
    duration_hours?: IntFieldUpdateOperationsInput | number
    location?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    completion_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    certificate_id?: NullableStringFieldUpdateOperationsInput | string | null
    cost?: NullableFloatFieldUpdateOperationsInput | number | null
    currency?: StringFieldUpdateOperationsInput | string
    paid_by?: NullableStringFieldUpdateOperationsInput | string | null
    pre_assessment_score?: NullableFloatFieldUpdateOperationsInput | number | null
    post_assessment_score?: NullableFloatFieldUpdateOperationsInput | number | null
    instructor_rating?: NullableFloatFieldUpdateOperationsInput | number | null
    course_rating?: NullableFloatFieldUpdateOperationsInput | number | null
    feedback?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type KirkpatrickEvaluationCreateManyTraining_recordInput = {
    id?: string
    level: number
    level_name: string
    score?: number | null
    evaluator_id?: string | null
    evaluation_date?: Date | string | null
    comments?: string | null
    evidence?: string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type KirkpatrickEvaluationUpdateWithoutTraining_recordInput = {
    id?: StringFieldUpdateOperationsInput | string
    level?: IntFieldUpdateOperationsInput | number
    level_name?: StringFieldUpdateOperationsInput | string
    score?: NullableFloatFieldUpdateOperationsInput | number | null
    evaluator_id?: NullableStringFieldUpdateOperationsInput | string | null
    evaluation_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    comments?: NullableStringFieldUpdateOperationsInput | string | null
    evidence?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type KirkpatrickEvaluationUncheckedUpdateWithoutTraining_recordInput = {
    id?: StringFieldUpdateOperationsInput | string
    level?: IntFieldUpdateOperationsInput | number
    level_name?: StringFieldUpdateOperationsInput | string
    score?: NullableFloatFieldUpdateOperationsInput | number | null
    evaluator_id?: NullableStringFieldUpdateOperationsInput | string | null
    evaluation_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    comments?: NullableStringFieldUpdateOperationsInput | string | null
    evidence?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type KirkpatrickEvaluationUncheckedUpdateManyWithoutTraining_recordInput = {
    id?: StringFieldUpdateOperationsInput | string
    level?: IntFieldUpdateOperationsInput | number
    level_name?: StringFieldUpdateOperationsInput | string
    score?: NullableFloatFieldUpdateOperationsInput | number | null
    evaluator_id?: NullableStringFieldUpdateOperationsInput | string | null
    evaluation_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    comments?: NullableStringFieldUpdateOperationsInput | string | null
    evidence?: NullableStringFieldUpdateOperationsInput | string | null
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