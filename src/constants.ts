interface IRoute {
  path: string;
  name: string;
}

const ROUTES: { [key: string]: IRoute } = {
  HOME: { name: "HOME", path: "/" },
  CALENDAR: { name: "CALENDAR", path: "/calendar" },
  TIME_LOG: { name: "TIME_LOG", path: "/time-log" },
  LOGIN: { name: "LOGIN", path: "/login" },
  PROJECTS: { name: "PROJECTS", path: "/projects" },
};

export { ROUTES };
