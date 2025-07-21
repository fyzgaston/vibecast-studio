import React, { createContext, useContext, useState } from 'react';

type SearchContextType = {
  searchValue: string;
  setSearchValue: (value: string) => void;
};

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const useSearchContext = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearchContext должен использоватсья внутри SearchProvider');
  }
  return context;
};

export const SearchProvider = ({ children }: { children: React.ReactNode }) => {
  const [searchValue, setSearchValue] = useState('');

  return (
    <SearchContext.Provider value={{ searchValue, setSearchValue }}>
      {children}
    </SearchContext.Provider>
  );
};
