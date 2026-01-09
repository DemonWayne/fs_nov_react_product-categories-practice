import classNames from 'classnames';

export function UserPanel({ users, selectedUserId, onUserSelect }) {
  return (
    <p className="panel-tabs has-text-weight-bold">
      <a
        data-cy="FilterAllUsers"
        href="#/"
        className={classNames({
          'is-active': selectedUserId === null,
        })}
        onClick={e => {
          e.preventDefault();

          onUserSelect(null);
        }}
      >
        All
      </a>

      {users.map(user => (
        <a
          key={user.id}
          data-cy="FilterUser"
          href="#/"
          className={classNames({ 'is-active': selectedUserId === user.id })}
          onClick={e => {
            e.preventDefault();

            onUserSelect(user.id);
          }}
        >
          {user.name}
        </a>
      ))}
    </p>
  );
}
