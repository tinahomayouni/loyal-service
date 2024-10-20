import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger'; // Import Swagger decorators
import { NotificationsService } from './notification.service';
import { Notification } from '../entity/notification.entity';

@ApiTags('notifications') // This will make the controller show up in Swagger
@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @ApiOperation({ summary: 'Create a new notification' }) // Optional: describe the operation
  @Post()
  async create(@Body() body: { userId: number; message: string }): Promise<Notification> {
    return this.notificationsService.createNotification(body.userId, body.message);
  }

  @ApiOperation({ summary: 'Get all notifications for a user' }) // Optional
  @Get(':userId')
  async findByUser(@Param('userId') userId: number): Promise<Notification[]> {
    return this.notificationsService.getNotifications(userId);
  }

  @ApiOperation({ summary: 'Mark a notification as read' }) // Optional
  @Post('read/:id')
  async markAsRead(@Param('id') id: number): Promise<Notification> {
    return this.notificationsService.markAsRead(id);
  }


 
}
