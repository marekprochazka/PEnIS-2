export interface ILogGroup {
  id: string;
  name: string;
}

export interface ILog {
  id: string;
  time: number;
  note: string;
  userId: string;
  groupId: string;
}
