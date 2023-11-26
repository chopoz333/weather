import { HttpStatus } from '@nestjs/common';
import { User } from 'src/user/entity/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class WeatherLog {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ type: 'int', nullable: false })
  user_id: number;

  @ManyToOne(() => User, user => user.weatherLog, { nullable: true })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ type: 'bigint', nullable: false })
  public action_time: number;

  @Column({ type: 'enum', enum: HttpStatus, default: HttpStatus.OK, nullable: false })
  public request_result: HttpStatus;

  @Column({ type: 'int', nullable: true })
  public temp_c: number;
}
