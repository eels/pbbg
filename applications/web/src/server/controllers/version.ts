import type { AsyncHandler } from '@/web/types/http';

export class Version {
  public static handle: AsyncHandler = async (_, response) => {
    response.respond({
      data: {
        version: 'v1.0.0',
      },
      status: 'SUCCESS',
    });
  };
}
