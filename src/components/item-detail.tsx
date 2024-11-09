import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {Product} from "@/types/product.ts";
import {Badge, Box, Button, Flex, Image, Input, Spinner, Stack, Text, VStack} from "@chakra-ui/react";
import {toaster} from "@/components/ui/toaster.tsx";
import {Rating} from "@/components/ui/rating.tsx";

const ItemDetail = () => {
    const {id} = useParams();
    const [product, setProduct] = useState<Product>();
    const [quantity, setQuantity] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const response = await fetch(`https://api-bazar-yphp.onrender.com/api/items/${id}`);
                const data = await response.json();

                console.log(data);

                const imagesArray = typeof data.images === "string" ? data.images.replace(/[\[\]]/g, "").split(",") : data.images;

                setProduct({...data, images: imagesArray});
            } catch (error) {
                console.error('Error fetching product details:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProductDetails();
    }, [id]);

    const handlePurchase = async () => {
        if (!product) return;

        const totalPrice = product.price * quantity;
        const purchaseDate = new Date().toISOString();

        toaster.create({
            title: 'Registrando compra...', description: `Compra de ${product.title} en proceso`, duration: 2000,
        });

        try {
            const response = await fetch("https://api-bazar-yphp.onrender.com/api/addSale", {
                method: "POST", headers: {
                    "Content-Type": "application/json",
                }, body: JSON.stringify({
                    productId: product.id, quantity, totalPrice, purchaseDate,
                }),
            });

            if (!response.ok) {
                throw new Error("Error en el registro de la venta");
            }

            toaster.success({
                title: 'Compra exitosa',
                description: `Compra de ${product.title} realizada correctamente.`,
                type: 'success',
            });

            setProduct(prevProduct => prevProduct ? {
                ...prevProduct, stock: prevProduct.stock - quantity
            } : prevProduct);
        } catch (error) {
            toaster.error({
                title: 'Error al registrar la compra',
                description: `Ocurrió un error al registrar la compra: ${error}.`,
                type: 'error',
            });

            console.error("Error al realizar la compra:", error);
        }
    };

    const isButtonDisabled = quantity < 1 || (product && quantity > product.stock);

    if (loading) return <Spinner size={'lg'}/>;
    if (!product) return <Text>No se encontró el producto</Text>;

    return (<Box p={6} maxW="lg" mx="auto" borderWidth="1px" borderRadius="lg" overflow="hidden">
            <Text fontSize="2xl" fontWeight="bold" mb={4}>{product.title}</Text>
            <Text fontSize="lg" color="gray.600" mb={4}>{product.description}</Text>

            <VStack gap={4} mb={4}>
                {product.images.map((imageUrl, index) => (<Image
                        key={index}
                        src={imageUrl}
                        alt={`${product.title} - imagen ${index + 1}`}
                        borderRadius="md"
                        w="full"
                        h="auto"
                    />))}
            </VStack>

            <Flex justify="space-between" mb={4}>
                <Text fontSize="xl" color="green.500" fontWeight="bold">${product.price}</Text>
                <Badge colorScheme="blue">{product.category}</Badge>
            </Flex>
            <Text color="gray.500">Marca: {product.brand}</Text>
            <Text color="gray.500">Stock: {product.stock}</Text>
            <Text color="gray.500">Descuento: {product.discountPercentage}%</Text>

            <Stack direction="row" align="center" mb={4}>
                <Rating defaultValue={product.rating} size="md"/>
                <Text>({product.rating})</Text>
            </Stack>

            <Flex direction="row" align="center" mt={4}>
                <Text mr={2}>Cantidad:</Text>
                <Input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    min={1}
                    max={product.stock}
                    width="60px"
                />
            </Flex>

            <Button colorScheme="teal" size="lg" mt={6} onClick={handlePurchase} disabled={isButtonDisabled}>
                Realizar compra
            </Button>
        </Box>);
};

export default ItemDetail;
