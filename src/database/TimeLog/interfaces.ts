export interface ILogGroup {
  id: string;
  name: string;
}

export interface ILog {
  id?: string;
  time: number;
  date: string;
  note: string;
  userEmail: string;
  groupId: string;
}
