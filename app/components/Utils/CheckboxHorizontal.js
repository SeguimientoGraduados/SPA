import React from 'react';
import {
    Checkbox,
    Card,
    List,
    ListItem,
    ListItemPrefix,
    Typography,
} from "@material-tailwind/react";

const CheckboxHorizontal = ({ items }) => {
    return (
        <Card className="bg-transparent shadow-none">
            <List className="flex-row bg-transparent">
                {items.map((item, index) => (
                    <ListItem className="p-0 bg-transparent" key={index}>
                        <label
                            htmlFor={`horizontal-list-${item.toLowerCase()}`}
                            className="flex flex-col items-center w-full cursor-pointer px-1 py-1 bg-transparent"
                        >
                            <ListItemPrefix>
                                <Checkbox
                                    color="blue"
                                    id={`horizontal-list-${item.toLowerCase()}`}
                                    ripple={false}
                                    className="hover:before:opacity-0 bg-transparent"
                                    containerProps={{
                                        className: "p-0 bg-transparent",
                                    }}
                                />
                            </ListItemPrefix>
                            <Typography color="blue-gray" variant="small" className="whitespace-nowrap">
                                {item}
                            </Typography>
                        </label>
                    </ListItem>
                ))}
            </List>
        </Card>
    );
};

export default CheckboxHorizontal;
