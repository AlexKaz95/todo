/// <reference types="react-scripts" />
declare module "*.module.css";

interface ITodoItem {
    title: string,
    description: string,
    status: string,
    done: boolean,
    id: number,
    order?: number,
    category?: string
}

type TOption = {
  label: string,
  color: string,
  id: string
}
  
type THeader = {
label: string
}