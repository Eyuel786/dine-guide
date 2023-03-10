import { useLocation } from "react-router-dom";

import RestaurantForm from "../components/RestaurantForm";


function EditRestaurant() {
    const { state: restaurant } = useLocation();

    return (
        <RestaurantForm
            restaurant={restaurant}
            isEditing />
    );
}

export default EditRestaurant;