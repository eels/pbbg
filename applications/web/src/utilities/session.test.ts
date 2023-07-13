/** @jest-environment node */

import httpMock from 'node-mocks-http';
import { getCurrentUser } from '@/web/utilities/session';
import { getServerSession } from 'next-auth';
import { mockSessionObject } from '@/web/__mocks__/session';
import { noTryAsync } from 'no-try';

jest.mock('next-auth');

describe('getCurrentUser', () => {
  const mockGetServerSession = getServerSession as jest.Mock;
  const mockReq = httpMock.createRequest();
  const mockRes = httpMock.createResponse();

  beforeEach(() => {
    mockGetServerSession.mockResolvedValueOnce(mockSessionObject);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('returns the current user', async () => {
    const result = await getCurrentUser();

    expect(getServerSession).toHaveBeenCalledWith(expect.any(Object));
    expect(result).toEqual(mockSessionObject.user);
  });

  it('returns the current user from the http request + response', async () => {
    const result = await getCurrentUser(mockReq, mockRes);

    expect(getServerSession).toHaveBeenCalledWith(mockReq, mockRes, expect.any(Object));
    expect(result).toEqual(mockSessionObject.user);
  });

  it('throws an error when partial arguments are provided', async () => {
    await noTryAsync(async () => expect(await getCurrentUser(mockReq)).toThrow());
    await noTryAsync(async () => expect(await getCurrentUser(undefined, mockRes)).toThrow());
  });
});
