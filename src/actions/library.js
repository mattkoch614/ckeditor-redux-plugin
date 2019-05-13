export const searchLibrary = (searchQuery) => {
    console.log('searching via:', searchQuery);
    return {
        type: search,
        searchQuery
    };
  }