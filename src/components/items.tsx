import {useProducts} from "@/hooks/useProducts.ts";
import {Product} from "@/types/product.ts";
import {useSearchParams} from "react-router-dom";
import {useState} from "react";
import {Box, Grid, Text} from "@chakra-ui/react";
import ItemCard from "@/components/item-card.tsx";
import {Button} from "@/components/ui/button.tsx";

const Items = () => {
    const [searchParams] = useSearchParams();
    const [page, setPage] = useState<number>(1);
    const searchQuery = searchParams.get('search') || '';

    const baseUrl = 'https://api-bazar-yphp.onrender.com/api/items';
    const url = searchQuery
        ? `${baseUrl}?q=${searchQuery}&page=${page}&limit=8`
        : `${baseUrl}?page=${page}&limit=8`

    const {products, isLoading, error} = useProducts(url)

    const handlePageChange = (newPage: number) => {
        if (page < 1) return
        setPage(newPage);
    }

    if (isLoading) {
        return <Text>Cargando productos...</Text>;
    }

    if (error) {
        return <Text>Error: {error.message}</Text>
    }

    return (<Box>
        <Text mb={4} fontSize={'lg'} fontWeight={'bold'}>
            {`Resultados: ${products.length}`}
        </Text>

        <Grid templateColumns={{base: '1fr', md: 'repeat(2, 1f)', lg: 'repeat(3, 1fr)'}} gap={4}>
            {products.map((product: Product) => (
                <ItemCard key={product.id} product={product}/>
            ))}
        </Grid>

        <Box mt={6} display="flex" justifyContent="center" gap={2}>
            <Button onClick={() => handlePageChange(page - 1)} disabled={page <= 1}>
                Anterior
            </Button>
            <Button onClick={() => handlePageChange(page + 1)}>
                Siguiente
            </Button>
        </Box>
    </Box>);
}

export default Items