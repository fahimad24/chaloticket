import React from "react";

const SearchPage = async ({ searchParams }) => {
  const query = await searchParams;
  console.log("Search Query:", query);
  return (
    <div>
      <h1>SearchPage Results</h1>
      {/* Add your search results content here */}
    </div>
  );
};

export default SearchPage;
