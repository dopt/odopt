import { nanoid } from 'nanoid';

export function getUserId(): string {
  const userId = nanoid();
  return userId;
}
