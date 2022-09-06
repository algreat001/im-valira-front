export interface Messages {
  title: string;
  body: string;
  isReadied: boolean;
  sender: User;
}

export interface Notification {
  title: string;
  body: string;
  isReadied: boolean;
}

export interface Token {
  token: string;
}

export interface Social {
  icon: string;
  name: string;
  api: string;
}
