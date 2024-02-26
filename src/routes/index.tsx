import { Button } from "@mui/material"
import { Navigate, Routes, Route } from "react-router-dom"


export const AppRoutes = () =>{

    return(
        <Routes>
            <Route path="/pagina-inicial" element={<Button variant="contained" color="primary">teste</Button> }/>

            <Route path="*" element={<Navigate to="/pagina-inicial"/>}/>
        </Routes>
    )
}