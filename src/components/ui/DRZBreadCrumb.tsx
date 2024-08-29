
import Link from "next/link";
interface BreadcrumbProps {
  pageName: string;
  lastName?: string;
  link?: string;
}
const Breadcrumb = ({ pageName, link, lastName }: BreadcrumbProps) => {
  return (
    <nav
      style={{
        background: "linear-gradient(45deg, #d9f7be, transparent)",
        color: "#444 ",
      }}
      className="flex px-5 bg-white shadow-sm py-3 text-gray-700  rounded-md  dark:bg-gray-800 dark:border-gray-700"
      aria-label="Breadcrumb"
    >
      <ol
        style={{
          listStyle: "none",
        }}
        className="inline-flex items-center space-x-2 md:space-x-3"
      >
      

        <li aria-current="page">
          <div className="flex items-center">
            <svg
              className="w-3 h-3 mx-1 text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 9 4-4-4-4"
              />
            </svg>
            {link ? ( 
               <Link
               href={link}
               className="ml-1 text-sm font-medium text-gray-500 md:ml-2 dark:text-gray-400"
             >
               {pageName}
             </Link>
              ):(
                <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2 dark:text-gray-400">
               
                    {pageName}
                
                </span>
              )}
            
          </div>
        </li>

        {lastName && (
          <li aria-current="page">
            <div className="flex items-center">
              <svg
                className="w-3 h-3 mx-1 text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m1 9 4-4-4-4"
                />
              </svg>
              <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2 dark:text-gray-400">
                {lastName}
              </span>
            </div>
          </li>
        )}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
