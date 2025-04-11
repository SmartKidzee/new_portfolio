import React from 'react';

interface TableRow {
  [key: string]: string;
}

interface BlogTableProps {
  headers: string[];
  rows: TableRow[];
  alternateRowColors?: boolean;
}

const BlogTable: React.FC<BlogTableProps> = ({ 
  headers, 
  rows, 
  alternateRowColors = true 
}) => {
  return (
    <div className="w-full overflow-x-auto my-8 -mx-4 px-4 sm:mx-0 sm:px-0">
      <div className="backdrop-blur-md bg-white/5 p-1 rounded-xl shadow-xl border border-white/10 min-w-[280px]">
        <div className="w-full overflow-x-auto">
          <table className="w-full border-collapse overflow-hidden rounded-lg">
            <thead className="bg-indigo-900/50">
              <tr>
                {headers.map((header, index) => (
                  <th 
                    key={`header-${index}`}
                    className={`border-b border-x border-indigo-700/40 p-2.5 sm:p-3.5 text-left text-white font-semibold text-sm sm:text-base ${
                      index === 0 ? 'rounded-tl-lg' : ''
                    } ${index === headers.length - 1 ? 'rounded-tr-lg' : ''}`}
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, rowIndex) => (
                <tr 
                  key={`row-${rowIndex}`}
                  className={alternateRowColors && rowIndex % 2 === 0 ? "bg-indigo-900/10 backdrop-blur-sm" : "backdrop-blur-sm"}
                >
                  {headers.map((header, colIndex) => (
                    <td 
                      key={`cell-${rowIndex}-${colIndex}`}
                      className={`border-x border-indigo-700/40 p-2 sm:p-3.5 text-gray-200 text-sm sm:text-base break-words ${
                        rowIndex === rows.length - 1 ? 'border-b' : ''
                      } ${
                        rowIndex === rows.length - 1 && colIndex === 0 ? 'rounded-bl-lg' : ''
                      } ${
                        rowIndex === rows.length - 1 && colIndex === headers.length - 1 ? 'rounded-br-lg' : ''
                      }`}
                    >
                      {row[header]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BlogTable; 