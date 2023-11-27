import { ApiProperty } from '@nestjs/swagger';

export class SignInResponse {
  @ApiProperty({ example: 'Chopozov Ruslan Dmitrievich' })
  fio: string;

  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibG9naW4iOiJjaG9wb3ozMzIzIiwiZmlvIjoiYXNkYXNkYXNkYXNkc2FkIiwiaWF0IjoxNzAxMDE5OTkwLCJleHAiOjE3MDExMDYzOTB9.o36TSLUmwXD2eRzFbHcOQ8n_JPJYlcBBHSUIiVa6eFg',
  })
  access_token: string;

  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibG9naW4iOiJjaG9wb3ozMzIzIiwiZmlvIjoiYXNkYXNkYXNkYXNkc2FkIiwiaWF0IjoxNzAxMDE5OTkwLCJleHAiOjE3MDExMDYzOTB9.o36TSLUmwXD2eRzFbHcOQ8n_JPJYlcBBHSUIiVa6eFg',
  })
  refresh_token: string;
}
