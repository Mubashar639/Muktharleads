import * as actionTypes from "../actionTypes";

const Facility = (
  state = {
    isLoading: false,
    errMess: null,
    user: null,
    facilities:[]
  },
  action
) => {
  switch (action.type) {
    case actionTypes.FACILITY_LOADING:
      return { ...state, isLoading: true, errMess: null, user: null };
    case actionTypes.FACILITY_FAILED:
      return { ...state, isLoading: false, errMess: action.errMess, user: null };
    case actionTypes.FACILITY_SUCCESS:

    const facilityName = action.facility.map((facilit) =>facilit.name)

      return { ...state, isLoading: false, errMess: null, facilities: action.facility,facilityName};
    case actionTypes.FACILITY_ADD:
      {
        const facility = action.facility
        return {
          ...state, isLoading: false, errMess: null,
          facilities: [...state.facilities, facility]
        }
      }
    case actionTypes.FACILITY_REMOVE:
      {
        const facilities = state.facilities.filter((facility,index)=>facility._id !== action.facility)
        return {
          ...state, isLoading: false, errMess: null,
          facilities
        }
      }

      case actionTypes.FACILITY_UPDATE:
          {
            const facilities = state.facilities.map((facility,index)=>{
             if(facility._id === action.facility.id) return action.facility.updatedfacility
            else
             return facility
            })
            return {
              ...state, isLoading: false, errMess: null,
              facilities
            }
          }
    default:
      return state;
  }
};

export default Facility;
