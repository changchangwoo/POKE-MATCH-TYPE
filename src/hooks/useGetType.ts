import React, { useEffect } from "react";
import { fetchDetailType } from "../api/api";


export const useGetType = (types: number[]) => {
    useEffect(()=> {
         const getDetailType = async (no : string) => {
            const response = await fetchDetailType(no);
            console.log(response)
        }
        types.map((type : number) => {
            getDetailType(type.toString())
        })
    })
};

