/* eslint-disable jsx-a11y/accessible-emoji */
import React from 'react';
import './App.scss';
import { ProductTable } from './components/ProductTable';

import usersFromServer from './api/users';
import categoriesFromServer from './api/categories';
import productsFromServer from './api/products';
import { ControlPanel } from './components/ControlPanel';

const SORT_FIELDS = {
  ID: 'ID',
  PRODUCT: 'Product',
  CATEGORY: 'Category',
  USER: 'User',
};

const servedProducts = productsFromServer.map(product => {
  const category = categoriesFromServer.find(
    productCategory => productCategory.id === product.categoryId,
  );

  const user = usersFromServer.find(
    ownerUser => ownerUser.id === category.ownerId,
  );

  return { ...product, category, user };
});

export const App = () => {
  const [selectedUserId, setSelectedUserId] = React.useState(null);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedCategoryIds, setSelectedCategoryIds] = React.useState([]);
  const [sortBy, setSortBy] = React.useState('');
  const [sortType, setSortType] = React.useState('asc');

  const handleUserSelect = userId => {
    setSelectedUserId(userId);
  };

  const handleSearchChange = query => {
    setSearchQuery(query);
  };

  const handleSearchClear = () => {
    setSearchQuery('');
  };

  const handleCategoryToggle = categoryId => {
    setSelectedCategoryIds(prevIds => {
      if (prevIds.includes(categoryId)) {
        return prevIds.filter(id => id !== categoryId);
      }

      return [...prevIds, categoryId];
    });
  };

  const handleSortChange = (field, type) => {
    setSortBy(field);
    setSortType(type);
  };

  const resetCategories = () => {
    setSelectedCategoryIds([]);
  };

  const handleFilterReset = () => {
    setSelectedUserId(null);
    setSearchQuery('');
    setSelectedCategoryIds([]);
  };

  const visibleProducts = React.useMemo(() => {
    let filtered = servedProducts;

    if (selectedUserId !== null) {
      filtered = filtered.filter(product => product.user.id === selectedUserId);
    }

    if (selectedCategoryIds.length > 0) {
      filtered = filtered.filter(product => {
        return selectedCategoryIds.includes(product.category.id);
      });
    }

    if (searchQuery) {
      filtered = filtered.filter(product => {
        return product.name.toLowerCase().includes(searchQuery.toLowerCase());
      });
    }

    if (sortBy) {
      filtered = [...filtered].sort((product1, product2) => {
        switch (sortBy) {
          case SORT_FIELDS.ID: {
            if (sortType === 'asc') {
              return product1.id - product2.id;
            }

            return product2.id - product1.id;
          }

          case SORT_FIELDS.PRODUCT: {
            if (sortType === 'asc') {
              return product1.name.localeCompare(product2.name);
            }

            return product2.name.localeCompare(product1.name);
          }

          case SORT_FIELDS.CATEGORY: {
            const firstCategoryTitle = product1.category?.title || '';
            const secondCategoryTitle = product2.category?.title || '';

            if (sortType === 'asc') {
              return firstCategoryTitle.localeCompare(secondCategoryTitle);
            }

            return secondCategoryTitle.localeCompare(firstCategoryTitle);
          }

          case SORT_FIELDS.USER: {
            const firstUserName = product1.user.name || '';
            const secondUserName = product2.user.name || '';

            if (sortType === 'asc') {
              return firstUserName.localeCompare(secondUserName);
            }

            return secondUserName.localeCompare(firstUserName);
          }

          default:
            return 0;
        }
      });
    }

    return filtered;
  }, [selectedUserId, searchQuery, selectedCategoryIds, sortBy, sortType]);

  return (
    <div className="section">
      <div className="container">
        <h1 className="title">Product Categories</h1>

        <ControlPanel
          users={usersFromServer}
          selectedUserId={selectedUserId}
          onUserSelect={user => handleUserSelect(user)}
          categories={categoriesFromServer}
          selectedCategoryIds={selectedCategoryIds}
          resetCategories={() => resetCategories()}
          onCategoryToggle={categoryId => handleCategoryToggle(categoryId)}
          searchQuery={searchQuery}
          onSearchChange={inputEvent =>
            handleSearchChange(inputEvent.target.value)
          }
          onClear={() => handleSearchClear()}
          onReset={() => handleFilterReset()}
        />

        <div className="box table-container">
          {visibleProducts.length > 0 ? (
            <ProductTable
              products={visibleProducts}
              sortFields={SORT_FIELDS}
              sortBy={sortBy}
              sortType={sortType}
              onSortChange={handleSortChange}
            />
          ) : (
            <p data-cy="NoMatchingMessage">
              No products matching selected criteria
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
