import Header from "../components/Header";
import { BrowserRouter } from "react-router-dom";
export default {
    title: "Header",
    component: Header
}

export const Default = () => (<BrowserRouter>
    <Header />
</BrowserRouter>);