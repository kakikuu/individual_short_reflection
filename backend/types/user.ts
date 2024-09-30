export interface getUser {
  user_id: string;
  user_name: string;
  password: string;
}

export interface inputUser {
  user_name: string;
  password: string;
}

export interface checkUserName {
  existingUser: boolean;
  data: getUser | null;
}
