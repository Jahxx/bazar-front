import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import {ChakraProvider, defaultSystem} from "@chakra-ui/react";
import {ThemeProvider} from "next-themes";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import App from "@/App.tsx";
import ErrorPage from "@/error-page.tsx";
import Items from "@/components/items.tsx";
import ItemDetail from "@/components/item-detail.tsx";
import {Toaster} from "@/components/ui/toaster.tsx";
import Sales from "@/components/sales.tsx";

const router = createBrowserRouter([{
    path: "/", element: <App/>, errorElement: <ErrorPage/>, children: [{
        path: 'items', element: <Items/>
    }, {
        path: 'items/:id', element: <ItemDetail/>,
    }, {
        path: "sales", element: <Sales />
    },]
}], {
    future: {
        v7_relativeSplatPath: true,
        v7_fetcherPersist: true,
        v7_normalizeFormMethod: true,
        v7_partialHydration: true,
        v7_skipActionErrorRevalidation: true,
    }
});

createRoot(document.getElementById('root')!).render(<StrictMode>
    <ChakraProvider value={defaultSystem}>
        <ThemeProvider attribute='class' disableTransitionOnChange>
            <Toaster />
            <RouterProvider future={{v7_startTransition: true}} router={router}/>
        </ThemeProvider>
    </ChakraProvider>
</StrictMode>)
