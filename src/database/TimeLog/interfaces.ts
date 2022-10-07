export interface ILogGroup {
  id: string;
  name: string;
}

export interface ILog {
  id?: string;
  time: number;
  date: Date;
  note: string;
  userEmail: string;
  groupId: string;
}
