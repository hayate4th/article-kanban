import React, { useState } from "react";
import styled from "styled-components";
import IconButton from "@material-ui/core/IconButton";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { Menu, MenuItem } from "@material-ui/core";
import kanbanModule from "../../modules/kanbanModule";
import { useDispatch } from "react-redux";

interface DropDownMenuProps {
  size: "small" | "medium" | undefined;
  fontSize: "small" | "inherit" | "default" | "large" | undefined;
}

const DropDownMenu: React.FC<DropDownMenuProps> = ({
  children,
  fontSize,
  size
}) => {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState<
    EventTarget & HTMLButtonElement | null
  >(null);
  const isOpen = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    dispatch(kanbanModule.actions.handleIsMenuOpen(true));
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (): void => {
    dispatch(kanbanModule.actions.handleIsMenuOpen(false));
    setAnchorEl(null);
  };

  return (
    <StyledDiv>
      <IconButton
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        size={size}
        onClick={handleClick}
      >
        <MoreHorizIcon fontSize={fontSize} />
      </IconButton>
      <Menu open={isOpen} anchorEl={anchorEl}>
        {children}
        <MenuItem key="close" onClick={handleClose}>
          Close Menu
        </MenuItem>
      </Menu>
    </StyledDiv>
  );
};

// TODO: !important を消したい
const StyledDiv = styled.div`
  font-size: 50%;
  position: absolute !important;
  right: 4px;
  top: 4px;
  z-index: 100;
`;

export default DropDownMenu;
