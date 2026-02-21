function SearchBar({ setSearch }) {
  return (
    <input
      type="text"
      placeholder="Search by name or email"
      onChange={(e) => setSearch(e.target.value)}
      style={{ margin: "10px 0", padding: "5px" }}
    />
  );
}

export default SearchBar;