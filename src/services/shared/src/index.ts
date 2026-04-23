// Guards
export { AuthGuard } from './guards/auth.guard';
export { RolesGuard } from './guards/roles.guard';

// Decorators
export { Roles, ROLES_KEY } from './decorators/roles.decorator';
export { CurrentUser } from './decorators/current-user.decorator';

// Filters
export { HttpExceptionFilter } from './filters/http-exception.filter';

// Interceptors
export { LoggingInterceptor } from './interceptors/logging.interceptor';
export { TransformInterceptor } from './interceptors/transform.interceptor';
export type { ApiResponse } from './interceptors/transform.interceptor';

// DTOs
export { PaginationQueryDto, paginate } from './dto/pagination.dto';
export type { PaginatedResult } from './dto/pagination.dto';

// Interfaces
export type { JwtPayload } from './interfaces/jwt-payload.interface';
export type { CurrentUser as CurrentUserInterface } from './interfaces/jwt-payload.interface';

// Utils
export { maskNationalId, maskBankAccount, maskEmail } from './utils/pii-mask.util';

// Validation
export * from './validation/toolkit';

// Timeline types (D1.3)
export type {
  TimelineEventKind,
  TimelineEventBase,
  TimelineEvent,
  HireEvent,
  ProbationEvent,
  TransferEvent,
  TerminateEvent,
  RehireEvent,
  ContractRenewalEvent,
  PromotionEvent,
} from './types/timeline';

// Picklists (D1.3)
export { PICKLIST_YES_NO } from './picklists/yes-no';
export type { YesNoId } from './picklists/yes-no';
