import {Product} from "@/types/product.ts";
import {useEffect, useState} from "react";

interface UseProductsReturn {
    products: Product[];
    isLoading: boolean;
    error: Error | null;
}

export const useProducts = (url: string): UseProductsReturn => {
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setIsLoading(true);
                const response = await fetch(url);

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                setProducts(data);
            } catch (err) {
                setError(err instanceof Error ? err : new Error('An error ocurred'));
            } finally {
                setIsLoading(false);
            }
        };

        fetchProducts();
    }, [url]);

    return {products, isLoading, error};
};