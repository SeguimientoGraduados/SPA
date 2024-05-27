import React from 'react';
import {
    Checkbox,
    Card,
    List,
    ListItem,
    ListItemPrefix,
    Typography,
} from "@material-tailwind/react";

const CheckboxVertical = ({ items }) => {
    return (
        <Card className="bg-transparent shadow-none">
            <List className="bg-transparent">
                {items.map((item, index) => (
                    <ListItem className="p-0 bg-transparent" key={index}>
                        <label
                            htmlFor={`vertical-list-${item.toLowerCase()}`}
                            className="flex w-full cursor-pointer items-center py-2 bg-transparent"
                        >
                            <ListItemPrefix className="mr-3">
                                <Checkbox
                                    id={`vertical-list-${item.toLowerCase()}`}
                                    ripple={false}
                                    className="hover:before:opacity-0 bg-transparent"
                                    containerProps={{
                                        className: "p-0 bg-transparent",
                                    }}
                                />
                            </ListItemPrefix>
                            <Typography color="blue-gray" className="font-medium whitespace-nowrap">
                                {item}
                            </Typography>
                        </label>
                    </ListItem>
                ))}
            </List>
        </Card>
    );
};

export default CheckboxVertical;
