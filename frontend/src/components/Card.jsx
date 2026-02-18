import api from "../services/api";
api.get(`/projects/${selectedProjectId}`).then((res) => setProject(res.data));

export const Card = ({ children, className = "", hoverable, interactive, onClick }) => {
  return (
    <div className={className} onClick={onClick}>
      {children}
    </div>
  );
};

export const CardHeader = ({ children, className = "" }) => (
  <div className={["px-6 pt-6", className].join(" ")}>{children}</div>
);

export const CardTitle = ({ children, className = "" }) => (
  <h3 className={["text-lg font-semibold text-gray-900 dark:text-white", className].join(" ")}>
    {children}
  </h3>
);

export const CardContent = ({ children, className = "" }) => (
  <div className={["px-6 pb-6", className].join(" ")}>{children}</div>
);


