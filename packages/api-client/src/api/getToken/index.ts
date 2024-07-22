import { Endpoints } from '../../types';

export const getToken: Endpoints['getToken'] = async (
  context,
  params
) => {
  console.log('getToken has been called');

  return { data: 'Hello from getToken endpoint!' };
};
