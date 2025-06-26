import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from 'src/enum/role.enum';
import { ROLES_KEY } from '../decorator/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) return true;

    const { user } = context.switchToHttp().getRequest();

    const hasRole = requiredRoles.some((role) => user.roles?.includes(role));

    if (!hasRole) {
      // Lấy danh sách role bị thiếu để báo lỗi chi tiết
      const missingRoles = requiredRoles.filter(
        (role) => !user.roles?.includes(role),
      );

      const message = this.formatErrorMessage(missingRoles);
      throw new ForbiddenException(message);
    }

    return true;
  }

  private formatErrorMessage(missingRoles: string[]): string {
    if (missingRoles.includes(Role.Admin)) {
      return 'Bạn cần quyền quản trị viên (admin) để thực hiện hành động này.';
    }
    if (missingRoles.includes(Role.Seller)) {
      return 'Bạn cần quyền người bán (seller) để truy cập chức năng này.';
    }
    if (missingRoles.includes(Role.User)) {
      return 'Bạn cần là người dùng (user) hợp lệ để sử dụng tính năng này.';
    }
    return 'Bạn không có quyền truy cập chức năng này.';
  }
}
