import {InputGroup} from "@/components/ui/input-group.tsx";
import {Input} from "@chakra-ui/react";
import {LuSearch} from "react-icons/lu";

interface SearchBarProps {
    onSearch: () => void;
    searchText: string;
    setSearchText: (text: string) => void;
}

const SearchBar = ({onSearch, searchText, setSearchText}: SearchBarProps) => {

    return (<InputGroup width={"full"} flex={1} startElement={<LuSearch size={"1.5em"}/>}>
        <Input
            size={"xl"}
            width={"full"}
            placeholder={"search"}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onKeyPress={(e) => {
                if (e.key === 'Enter') {
                    onSearch()
                }
            }}/>
    </InputGroup>);
}

export default SearchBar;