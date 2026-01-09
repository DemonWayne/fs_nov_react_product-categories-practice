import classNames from 'classnames';
import { SearchPanel } from '../SearchPanel/SearchPanel';
import { UserPanel } from '../UserPanel';

export function ControlPanel({
  users,
  selectedUserId,
  onUserSelect,
  categories,
  selectedCategoryIds,
  onCategoryToggle,
  resetCategories,
  searchQuery,
  onSearchChange,
  onClear,
  onReset,
}) {
  return (
    <div className="block">
      <nav className="panel">
        <p className="panel-heading">Filters</p>

        <UserPanel
          users={users}
          selectedUserId={selectedUserId}
          onUserSelect={onUserSelect}
        />

        <SearchPanel
          searchQuery={searchQuery}
          onSearchChange={onSearchChange}
          onClear={onClear}
        />

        <div className="panel-block is-flex-wrap-wrap">
          <a
            href="#/"
            data-cy="AllCategories"
            className={classNames('button is-success mr-6', {
              'is-outlined': selectedCategoryIds.length === 0,
            })}
            onClick={() => resetCategories()}
          >
            All
          </a>

          {categories.map(category => (
            <a
              key={category.id}
              data-cy="Category"
              href="#/"
              className={classNames('button mr-2 my-1', {
                'is-info': selectedCategoryIds.includes(category.id),
              })}
              onClick={() => onCategoryToggle(category.id)}
            >
              {category.title}
            </a>
          ))}
        </div>

        <div className="panel-block">
          <a
            data-cy="ResetAllButton"
            href="#/"
            className="button is-link is-outlined is-fullwidth"
            onClick={onReset}
          >
            Reset all filters
          </a>
        </div>
      </nav>
    </div>
  );
}
