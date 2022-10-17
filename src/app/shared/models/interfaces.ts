export interface ICurrentUser {
  first_name: string;
  last_name: string;
  role: string;
  token: string;
}

export interface IGraph {
  data: {
    [key: string]: number;
  };
  type: string;
}

export interface ILoginForm {
  email: string;
  password: string;
}

export interface IPreparedGraph {
  name: string;
  chartKeys: string[];
  chartValues: number[];
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
}
