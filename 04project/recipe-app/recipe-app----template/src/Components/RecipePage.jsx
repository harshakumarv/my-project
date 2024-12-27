import { useParams } from "react-router-dom";
import { useEffect } from "react";
import useFetchRecipe from "../hooks/useFetchRecipe";

export default function RecipePage() {
    const { id } = useParams();
    const [fetchRecipe, { data, loading, error }] = useFetchRecipe();
    useEffect(() => {
        fetchRecipe(id);
    }, []);
    // console.log({ data, loading, error });
    return(
        <div></div>
    );
}