import { Children } from "react";
import { Button, ButtonProps } from "../ui/button";

export function Submit({ children, ...others}: ButtonProps){
    return (
        <Button {...others} type="submit">{children}</Button>
    );
}