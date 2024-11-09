import {useEffect, useState} from "react";
import {Sale} from "@/types/sale.ts";
import {Box, Spinner, Table} from "@chakra-ui/react";

const Sales = () => {
    const [sales, setSales] = useState<Sale[]>([])
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSales = async () => {
            try {
                const response = await fetch("https://api-bazar-yphp.onrender.com/api/sales");
                const data = await response.json();

                setSales(data);
            } catch (error) {
                console.error("Error fetching sales: ", error);
            } finally {
                setLoading(false)
            }
        };

        fetchSales();
    }, []);

    if (loading) {
        return <Spinner size={'xl'}/>
    }

    return (<Box p={4}>
        <Table.ScrollArea borderWidth="1px" maxW="xl">
            <Table.Root size="sm" variant="outline">
                <Table.Header>
                    <Table.Row>
                        <Table.ColumnHeader minW="200px">Sale ID</Table.ColumnHeader>
                        <Table.ColumnHeader minW="200px">Product ID</Table.ColumnHeader>
                        <Table.ColumnHeader minW="150px">Quantity</Table.ColumnHeader>
                        <Table.ColumnHeader minW="200px" textAlign="end">
                            Total Price
                        </Table.ColumnHeader>
                        <Table.ColumnHeader minW="200px">Purchase Date</Table.ColumnHeader>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {sales.map((sale) => (<Table.Row key={sale.id}>
                            <Table.Cell>{sale.id}</Table.Cell>
                            <Table.Cell>{sale.productId}</Table.Cell>
                            <Table.Cell>{sale.quantity}</Table.Cell>
                            <Table.Cell textAlign="end">{sale.totalPrice}</Table.Cell>
                            <Table.Cell>{new Date(sale.purchaseDate).toLocaleString()}</Table.Cell>
                        </Table.Row>))}
                </Table.Body>
            </Table.Root>
        </Table.ScrollArea>
    </Box>);
}

export default Sales;