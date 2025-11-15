export default function Button({ children, variant = 'primary', ...props }) {
              const baseClasses = "px-4 py-2 rounded-md font-medium transition-colors";
              
              const variantClasses = {
                primary: "bg-blue-600 hover:bg-blue-700 text-white",
                secondary: "bg-gray-200 hover:bg-gray-300 text-gray-900 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white",
                outline: "border border-gray-300 hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-800 dark:text-white"
              };
              
              return (
                <button 
                  className={`${baseClasses} ${variantClasses[variant] || variantClasses.primary}`}
                  {...props}
                >
                  {children}
                </button>
              );
            }