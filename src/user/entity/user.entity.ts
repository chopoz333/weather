import { WeatherLog } from 'src/weather/entity/weatherLog.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: false,
    unique: true,
  })
  public login: string;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: false,
    select: false,
  })
  public password: string;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: false,
  })
  public fio: string;

  @OneToMany(() => WeatherLog, weather => weather.user)
  weatherLog: WeatherLog;

  @Column({ type: 'varchar', nullable: true })
  public refresh_token: string;
}
