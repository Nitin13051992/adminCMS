import React, { useState } from 'react';

const rolesInitialState = {
  allRoles: false,
  roles: {
    232323: {
      isActive: false,
      permissions: {
        editError: false,
        deleteError: false,
      },
    },
    dashboard: {
      isActive: false,
      permissions: {
        viewHome: false,
        viewSettings: false,
      },
    },
    // Add other roles similarly...
  },
};

const TstingDemo = () => {
  const [rolesState, setRolesState] = useState(rolesInitialState);

  // Handler to toggle all roles
  const handleAllRolesToggle = () => {
    const newAllRolesState = !rolesState.allRoles;
    const newRolesState = { ...rolesState.roles };

    Object.keys(newRolesState).forEach(role => {
      newRolesState[role].isActive = newAllRolesState;
      Object.keys(newRolesState[role].permissions).forEach(permission => {
        newRolesState[role].permissions[permission] = newAllRolesState;
      });
    });

    setRolesState({
      allRoles: newAllRolesState,
      roles: newRolesState,
    });
  };

  // Handler to toggle individual role
  const handleRoleToggle = (role) => {
    const newRolesState = { ...rolesState.roles };
    const newRoleState = !newRolesState[role].isActive;

    newRolesState[role].isActive = newRoleState;
    Object.keys(newRolesState[role].permissions).forEach(permission => {
      newRolesState[role].permissions[permission] = newRoleState;
    });

    setRolesState({
      ...rolesState,
      roles: newRolesState,
    });
  };

  // Handler to toggle individual permission
  const handlePermissionToggle = (role, permission) => {
    const newRolesState = { ...rolesState.roles };
    newRolesState[role].permissions[permission] = !newRolesState[role].permissions[permission];

    setRolesState({
      ...rolesState,
      roles: newRolesState,
    });
  };

  return (
    <div>
      <div>
        <h1>All Roles Permission</h1>
        <label>
          <input
            type="checkbox"
            checked={rolesState.allRoles}
            onChange={handleAllRolesToggle}
          />
          Toggle All Roles
        </label>
      </div>
      {Object.keys(rolesState.roles).map(role => (
        <div key={role} style={{ backgroundColor: rolesState.roles[role].isActive ? 'pink' : 'lightgrey' }}>
          <h2>{role}</h2>
          <label>
            <input
              type="checkbox"
              checked={rolesState.roles[role].isActive}
              onChange={() => handleRoleToggle(role)}
            />
            Toggle Role
          </label>
          <div>
            {Object.keys(rolesState.roles[role].permissions).map(permission => (
              <div key={permission}>
                <label>
                  {permission}
                  <input
                    type="checkbox"
                    checked={rolesState.roles[role].permissions[permission]}
                    onChange={() => handlePermissionToggle(role, permission)}
                  />
                </label>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TstingDemo;
