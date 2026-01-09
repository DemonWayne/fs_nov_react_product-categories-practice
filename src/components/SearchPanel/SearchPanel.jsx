export function SearchPanel({ searchQuery, onSearchChange, onClear }) {
  return (
    <div className="panel-block">
      <p className="control has-icons-left has-icons-right">
        <input
          data-cy="SearchField"
          type="text"
          className="input"
          placeholder="Search"
          value={searchQuery}
          onChange={onSearchChange}
        />

        <span className="icon is-left">
          <i className="fas fa-search" aria-hidden="true" />
        </span>

        {searchQuery.length > 0 && (
          <span className="icon is-right">
            <button
              data-cy="ClearButton"
              type="button"
              className="delete"
              onClick={onClear}
            />
          </span>
        )}
      </p>
    </div>
  );
}
