const defaultState = {
  screen: 'addMesh',
  currentMesh: null,
  dialogs: {
    delete: {
      mesh: null
    }
  },
  meshes: {}
}

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'MESH_USERS':
      var mesh = state.meshes[action.addr]
      return {
        ...state,
        meshes: {
          ...state.meshes,
          [action.addr]: {
            ...mesh,
            users: action.users
          }
        }
      }
    case 'SHOW_ADD_MESH':
      return {
        ...state,
        screen: 'addMesh'
      }
    case 'HIDE_ADD_MESH':
      return {
        ...state,
        screen: 'main'
      }
    case 'VIEW_MESH':
      return {
        ...state,
        currentMesh: action.addr
      }
    case 'ADD_MESH':
      return {
        ...state,
        meshes: {
          ...state.meshes,
          [action.addr]: {
            addr: action.addr,
            username: action.username,
            messages: {},
            users: {}
          }
        }
      }
    case 'ADD_LINE':
      var mesh = state.meshes[action.addr]
      if (!mesh.messages) mesh.messages = {}
      return {
        ...state,
        meshes: {
          ...state.meshes,
          [action.addr]: {
            ...mesh,
            messages: {
              ...mesh.messages,
              [action.row.key]: {
                utcDate: action.utcDate,
                username: action.row.value.username,
                message: action.row.value.message
              }
            }
          }
        }
      }
    case 'DELETE_MESH':
      const { [action.addr]: del, ...meshes } = state.meshes
      return {...state, meshes}
    case 'DIALOGS_DELETE_CLOSE':
      return {
        ...state,
        dialogs: {
          ...state.dialogs,
          delete: {
            mesh: null
          }
        }
      }
    case 'DIALOGS_DELETE_OPEN':
      return {
        ...state,
        dialogs: {
          ...state.dialogs,
          delete: {
            mesh: action.addr
          }
        }
      }
    default:
      return defaultState
  }
}

export default reducer
