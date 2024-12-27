import CardList from "../Components/CardList";
import { useEffect } from "react";
import Header from "../Components/Header";
import Loading from "../Components/Loading";
import useFetchRecipes from "../hooks/useFetchRecipes";
export default function HomePage() {

    const [fetchRecipes, { data, loading, error }] = useFetchRecipes();
    useEffect(() => {
        fetchRecipes();
    }, []);
    const handleSearch = (searchTerm) => {
        if (searchTerm) {
            fetchRecipes(searchTerm);
        }
    };
    return (
        <>
            <Header handleSearch={handleSearch} />
            {loading && <Loading />}
            {data && <CardList recipes={data} />}
            {error && <p>{error}</p>}
        </>
    );
}
