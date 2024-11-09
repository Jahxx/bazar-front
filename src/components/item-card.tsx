import {Badge, Box, Flex, Image, Stack, Text} from "@chakra-ui/react";
import {Product} from "@/types/product.ts";
import React from "react";
import {Rating} from "@/components/ui/rating.tsx";
import {Link} from "react-router-dom";


interface ItemCardProps {
    product: Product;
}

const ItemCard: React.FC<ItemCardProps> = ({product}) => {
    return (<Link to={`/items/${product.id}`}>
        <Box borderWidth={"1px"} borderRadius={"lg"} overflow={"hidden"} p={4} shadow={"sm"}>
            <Image
                src={product.thumbnail}
                alt={product.title}
                borderRadius={"md"}
                objectFit={"cover"}
                w={"full"}
                h={"200px"}
                mb={4}
            />
            <Text fontWeight="bold" fontSize="xl" mb={2}>
                {product.title}
            </Text>
            <Text fontSize="sm" color="gray.600" mb={2}>
                {product.description}
            </Text>
            <Flex justifyContent="space-between" alignItems="center" mb={2}>
                <Text fontSize="lg" fontWeight="bold" color="green.500">
                    ${product.price}
                </Text>
                <Badge colorScheme="blue" fontSize="0.8em">
                    {product.category}
                </Badge>
            </Flex>
            <Stack direction={'row'} alignItems={'center'} mt={2}>
                <Rating defaultValue={product.rating} size={'md'}/>
                <Text fontSize="sm" color="gray.500">
                    {product.rating}
                </Text>
            </Stack>
        </Box>
    </Link>);
}

export default ItemCard;