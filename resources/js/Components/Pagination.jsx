import React from 'react';
import { Inertia } from '@inertiajs/inertia';

const Pagination = ({ links, filters }) => {
  const handleClick = (url) => {
    Inertia.get(url, filters, { preserveState: true });
  };

  return (
    <nav className="mt-4 flex justify-center">
      <ul className="inline-flex items-center -space-x-px">
        {links.map((link, index) => (
          <li key={index}>
            <button
              className={`px-4 py-2 border ${
                link.active ? 'bg-blue-500 text-white' : 'bg-white text-blue-500 border-blue-500'
              } hover:bg-blue-700 hover:text-white`}
              onClick={() => handleClick(link.url)}
              disabled={!link.url}
              dangerouslySetInnerHTML={{ __html: link.label }}
            />
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
