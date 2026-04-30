"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthGuard = void 0;
const common_1 = require("@nestjs/common");
let AuthGuard = class AuthGuard {
    canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const authHeader = request.headers['authorization'];
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw new common_1.UnauthorizedException('Missing or invalid authorization header');
        }
        const token = authHeader.split(' ')[1];
        try {
            const payload = this.decodeToken(token);
            request.user = this.mapPayloadToUser(payload);
            return true;
        }
        catch {
            throw new common_1.UnauthorizedException('Invalid or expired token');
        }
    }
    decodeToken(token) {
        const parts = token.split('.');
        if (parts.length !== 3) {
            throw new Error('Invalid token format');
        }
        const payload = JSON.parse(Buffer.from(parts[1], 'base64url').toString('utf-8'));
        return payload;
    }
    mapPayloadToUser(payload) {
        return {
            id: payload.sub,
            email: payload.email,
            username: payload.preferred_username,
            firstName: payload.given_name,
            lastName: payload.family_name,
            roles: payload.realm_access?.roles ?? [],
        };
    }
};
exports.AuthGuard = AuthGuard;
exports.AuthGuard = AuthGuard = __decorate([
    (0, common_1.Injectable)()
], AuthGuard);
//# sourceMappingURL=auth.guard.js.map