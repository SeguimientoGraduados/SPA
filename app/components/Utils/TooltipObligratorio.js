import { Tooltip, Typography } from "@material-tailwind/react";

const TooltipObligatorio=() => {
    return (
        <Tooltip content="Campo Obligatorio">
            <Typography color="red" className="font-normal text-center" variant="h4">
                *
            </Typography>
        </Tooltip>
    );
}
export default TooltipObligatorio;