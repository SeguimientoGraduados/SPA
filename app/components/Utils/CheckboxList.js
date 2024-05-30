import React from "react";
import {
  Checkbox,
  List,
  ListItem,
  ListItemPrefix,
} from "@material-tailwind/react";

const CheckboxList = ({ direction, items }) => {
  return (
    <List className={`flex flex-${direction}`}>
      {items.map((item, index) => (
        <ListItem key={index}>
          <ListItemPrefix>
            <Checkbox
              color="blue"
              ripple={false}
              label={item}
              className="h-8 w-8 rounded-full hover:scale-105 hover:before:opacity-0"
            />
          </ListItemPrefix>
        </ListItem>
      ))}
    </List>
  );
};

export default CheckboxList;
