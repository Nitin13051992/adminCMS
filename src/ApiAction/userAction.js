import UserApi from "../ApiData/userApi";


export const addDelivery = (payload) => {
    return (dispatch, getState) => {
        dispatch();
        return UserApi.addDelivery(payload).then(delivery => {
            if (delivery.data) {
                // dispatch(statusIsSuccess('Delivery data added successfully'));
                dispatch()
            }
        }).catch(error => {
            dispatch(error);
            // dispatch(statusIsError(error));
            // dispatch(ajaxCallError());
        });
    };
};