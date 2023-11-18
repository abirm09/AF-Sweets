import { Breadcrumbs } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const CustomBreadcrumbs = ({ className }: { className?: string }) => {
  const [urls, setUrls] = useState<{ name: string; path: string }[]>([]);
  const url = new URL(window.location.href);
  const path = url.pathname;
  useEffect(() => {
    const length: number = path.split("/").length;
    const routes: { name: string; path: string }[] = [];
    for (let i = 2; i < length + 1; i++) {
      const a = path.split("/");
      const data = {
        path: a.slice(1, i).join("/"),
        name: a[i - 1],
      };
      routes.push(data);
    }
    setUrls(routes);
  }, [path]);
  return (
    <Breadcrumbs className={`bread-crumbs-last mt-5  ${className}`}>
      <Link to="/">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
        </svg>
      </Link>
      {urls.map((url, index) => (
        <Link to={`/${url?.path}`} key={index} className="capitalize">
          {url?.name.split("-").join(" ")}
        </Link>
      ))}
    </Breadcrumbs>
  );
};

export default CustomBreadcrumbs;
