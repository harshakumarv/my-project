import { useParams } from "react-router-dom";
import { useEffect } from "react";
import useFetchRecipe from "../hooks/useFetchRecipe";
import Loading from "../Components/Loading";
import RecipeHeader from "../Components/RecipeHeader";
import RecipeInfo from "../Components/RecipeInfo";
// import {recipe} from "../Components/CardList";

export default function RecipePage() {
    const { id } = useParams();
    const [fetchRecipe, { data, loading, error }] = useFetchRecipe();
    useEffect(() => {
        fetchRecipe(id);
    }, []);
    console.log({ data, loading, error });
    if (loading) return <Loading />;
    if (error) return <h1>{error}</h1>;

    return (
        <div>
            {data && (
                <>
                    <RecipeHeader nutritionalFacts={data.nutrition} name={data.name} />
                    <RecipeInfo instructions={data.instructions} image={data.thumbnail_url} />
                </>
            )}
        </div>
    );
}