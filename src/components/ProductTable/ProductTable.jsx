import classNames from 'classnames';
import { ProductInfo } from '../ProductInfo/ProductInfo';

export function ProductTable({
  products,
  sortFields,
  sortBy,
  sortType,
  onSortChange,
}) {
  return (
    <table
      data-cy="ProductTable"
      className="table is-striped is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {Object.values(sortFields).map(field => (
            <th key={field}>
              <span className="is-flex is-flex-wrap-nowrap">
                {field}
                <a
                  href="#/"
                  onClick={() => {
                    let newSortField = field;
                    let newSortType = 'asc';

                    if (sortBy === field) {
                      if (sortType === 'asc') {
                        newSortType = 'desc';
                      } else if (sortType === 'desc') {
                        newSortField = '';
                        newSortType = 'asc';
                      }
                    }

                    onSortChange(newSortField, newSortType);
                  }}
                >
                  <span className="icon">
                    <i
                      data-cy="SortIcon"
                      className={classNames('fas', {
                        'fa-sort': sortBy !== field || sortType === '',
                        'fa-sort-up': sortBy === field && sortType === 'asc',
                        'fa-sort-down': sortBy === field && sortType === 'desc',
                      })}
                    />
                  </span>
                </a>
              </span>
            </th>
          ))}

          {/* <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Product
              <a href="#/">
                <span className="icon">
                  <i data-cy="SortIcon" className="fas fa-sort-down" />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Category
              <a href="#/">
                <span className="icon">
                  <i data-cy="SortIcon" className="fas fa-sort-up" />
                </span>
              </a>
            </span>
          </th> */}
        </tr>
      </thead>

      <tbody>
        {products.map(product => (
          <ProductInfo key={product.id} product={product} />
        ))}
      </tbody>
    </table>
  );
}
