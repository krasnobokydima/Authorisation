
export interface ICurrentUser {
  first_name: string;
  last_name: string;
  role: string;
  token: string;
}

export interface IChart {
  data: {
    [key: string]: number;
  };
  type: string;
}

export interface ILoginForm {
  email: string;
  password: string;
}

interface IChartData {
  data: number[];
  label: string;
}

export interface IPreparedChart {
  labels: string[];
  datasets: IChartData[];
}
export interface IReport {
  id: number;
  name: string;
  active: boolean;
  image_url: string;
}

export interface IUser {
  email: string;
  first_name: string;
  groups: string[];
  last_name: string;
  position?: number;
}

export interface IAuthState {
  currentUser: Partial<ICurrentUser>;
  users: IUser[];
  reports: IReport[],
  charts: IPreparedChart[];
  error?: string;
}
