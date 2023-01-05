import { nanoid } from 'nanoid';

export function getUserId(): string {
  const USER_ID_KEY = 'userId';
  const storedUserId = localStorage.getItem(USER_ID_KEY);
  const userId = localStorage.getItem(USER_ID_KEY) || nanoid();

  if (!storedUserId) {
    localStorage.setItem(USER_ID_KEY, userId);
  }

  return userId;
}
