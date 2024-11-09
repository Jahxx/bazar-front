import {Box, ClientOnly, Heading, HStack, Skeleton, VStack} from "@chakra-ui/react";
import ColorModeToggle from "@/components/color-mode-toggle.tsx";
import SearchBar from "@/components/search-bar.tsx";
import {useState} from "react";
import {Button} from "@/components/ui/button.tsx";
import {Link, Outlet, useLocation, useNavigate, useSearchParams} from "react-router-dom";

import ("./App.css")

const App = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [searchParams] = useSearchParams();
    const [hasOtherElements, setHasOtherElements] = useState(location.pathname !== '/');
    const [searchText, setSearchText] = useState(searchParams.get('search') || '');

    const handleSearch = () => {
        setHasOtherElements(true)
        if (searchText) {
            const queryParams = new URLSearchParams();
            queryParams.append('search', searchText);
            navigate(`items?${queryParams.toString()}`);
        } else {
            navigate('items');
        }
    }

    return (
        <Box className={`main-container ${hasOtherElements ? 'with-elements' : 'without-elements'}`} textAlign="center"
             fontSize="xl">
            <VStack gap="8">
                <HStack>
                    <Link to="/" onClick={() => setHasOtherElements(false)}>
                        <img alt="Bazar Logo" src="/logo.svg" width="40" height="40" style={{cursor: 'pointer'}}/>
                    </Link>
                    <Heading size="2xl" letterSpacing="tight">
                        <SearchBar onSearch={handleSearch} searchText={searchText} setSearchText={setSearchText}/>
                    </Heading>
                </HStack>

                {!hasOtherElements && (
                    <Button
                        size={'md'}
                        rounded={'md'}
                        colorPalette={'orange'}
                        px={'12'} py={'5'}
                        variant={'subtle'}
                        onClick={handleSearch}>
                        Buscar
                    </Button>
                )}

                <Outlet/>
            </VStack>

            <Box pos="absolute" bottom="4" right="4">
                <ClientOnly fallback={<Skeleton w="10" h="10" rounded="md"/>}>
                    <ColorModeToggle/>
                </ClientOnly>
            </Box>
        </Box>)
}
export default App;
