import { useState } from 'react';
import styled from '@emotion/styled';

import SVGBlueCloud from '../assets/BlueCloud.svg?react';
import SVGMenuClosed from '../assets/MenuClosed.svg?react';
import SVGMenuOpened from '../assets/MenuOpened.svg?react';
import SVGSidebarClosed from '../assets/SidebarClosed.svg?react';
import SVGSun from '../assets/Sun.svg?react';

interface SubMenuProps {
  isSubMenuOpen: boolean;
}
interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

const Sidebar = ({ isOpen, onToggle }: SidebarProps) => {
  const [menuStates, setMenuStates] = useState(Array(8).fill(false));

  const toggleMenu = (index: number) => {
    setMenuStates((prev) => {
      const newStates = [...prev];
      newStates[index] = !newStates[index];
      return newStates;
    });
  };

  return (
    <SidebarContainer isOpen={isOpen}>
      <SVGSideMenuContainer onClick={onToggle}>
        <SVGSidebarClosed style={{ width: '25px', height: '25px' }} />
      </SVGSideMenuContainer>
      <SVGBlueCloudContainer>
        <SVGBlueCloud style={{ width: '50px', height: '50px' }} />
      </SVGBlueCloudContainer>
      <SectionTitle>연합해커톤</SectionTitle>
      <Menu>
        <MenuItem onClick={() => toggleMenu(0)}>
          {menuStates[0] ? <SVGMenuOpened /> : <SVGMenuClosed />} <MenuItemText>기획</MenuItemText>
        </MenuItem>
        <SubMenu isSubMenuOpen={menuStates[0]}>
          <SubMenuItem>
            <SVGSunContainer>
              <SVGSun />
            </SVGSunContainer>
            <SubMenuItemText>구름이랑 어쩌구</SubMenuItemText>
          </SubMenuItem>
          <SubMenuItem>
            <SVGSunContainer>
              <SVGSun />
            </SVGSunContainer>
            <SubMenuItemText>구름이랑 어쩌구</SubMenuItemText>
          </SubMenuItem>
          <SubMenuItem>
            <SVGSunContainer>
              <SVGSun />
            </SVGSunContainer>
            <SubMenuItemText>구름이랑 어쩌구</SubMenuItemText>
          </SubMenuItem>
          <SubMenuItem>
            <SVGSunContainer>
              <SVGSun />
            </SVGSunContainer>
            <SubMenuItemText>구름이랑 어쩌구</SubMenuItemText>
          </SubMenuItem>
        </SubMenu>
        <MenuItem onClick={() => toggleMenu(1)}>
          {menuStates[1] ? <SVGMenuOpened /> : <SVGMenuClosed />}
          <MenuItemText>프론트엔드</MenuItemText>
        </MenuItem>
        <SubMenu isSubMenuOpen={menuStates[1]}>
          <SubMenuItem>
            <SVGSunContainer>
              <SVGSun />
            </SVGSunContainer>
            <SubMenuItemText>구름이랑 어쩌구</SubMenuItemText>
          </SubMenuItem>
          <SubMenuItem>
            <SVGSunContainer>
              <SVGSun />
            </SVGSunContainer>
            <SubMenuItemText>구름이랑 어쩌구</SubMenuItemText>
          </SubMenuItem>
          <SubMenuItem>
            <SVGSunContainer>
              <SVGSun />
            </SVGSunContainer>
            <SubMenuItemText>구름이랑 어쩌구</SubMenuItemText>
          </SubMenuItem>
          <SubMenuItem>
            <SVGSunContainer>
              <SVGSun />
            </SVGSunContainer>
            <SubMenuItemText>구름이랑 어쩌구</SubMenuItemText>
          </SubMenuItem>
        </SubMenu>
        <MenuItem onClick={() => toggleMenu(2)}>
          {menuStates[2] ? <SVGMenuOpened /> : <SVGMenuClosed />}
          <MenuItemText>디자인</MenuItemText>
        </MenuItem>
        <SubMenu isSubMenuOpen={menuStates[2]}>
          <SubMenuItem>
            <SVGSunContainer>
              <SVGSun />
            </SVGSunContainer>
            <SubMenuItemText>구름이랑 어쩌구</SubMenuItemText>
          </SubMenuItem>
          <SubMenuItem>
            <SVGSunContainer>
              <SVGSun />
            </SVGSunContainer>
            <SubMenuItemText>구름이랑 어쩌구</SubMenuItemText>
          </SubMenuItem>
          <SubMenuItem>
            <SVGSunContainer>
              <SVGSun />
            </SVGSunContainer>
            <SubMenuItemText>구름이랑 어쩌구</SubMenuItemText>
          </SubMenuItem>
          <SubMenuItem>
            <SVGSunContainer>
              <SVGSun />
            </SVGSunContainer>
            <SubMenuItemText>구름이랑 어쩌구</SubMenuItemText>
          </SubMenuItem>
        </SubMenu>
        <MenuItem onClick={() => toggleMenu(3)}>
          {menuStates[3] ? <SVGMenuOpened /> : <SVGMenuClosed />}
          <MenuItemText>백엔드</MenuItemText>
        </MenuItem>
        <SubMenu isSubMenuOpen={menuStates[3]}>
          <SubMenuItem>
            <SVGSunContainer>
              <SVGSun />
            </SVGSunContainer>
            <SubMenuItemText>구름이랑 어쩌구</SubMenuItemText>
          </SubMenuItem>
          <SubMenuItem>
            <SVGSunContainer>
              <SVGSun />
            </SVGSunContainer>
            <SubMenuItemText>구름이랑 어쩌구</SubMenuItemText>
          </SubMenuItem>
          <SubMenuItem>
            <SVGSunContainer>
              <SVGSun />
            </SVGSunContainer>
            <SubMenuItemText>구름이랑 어쩌구</SubMenuItemText>
          </SubMenuItem>
          <SubMenuItem>
            <SVGSunContainer>
              <SVGSun />
            </SVGSunContainer>
            <SubMenuItemText>구름이랑 어쩌구</SubMenuItemText>
          </SubMenuItem>
        </SubMenu>
      </Menu>

      <SectionTitle>단풍톤</SectionTitle>
      <Menu>
        <MenuItem onClick={() => toggleMenu(4)}>
          {menuStates[4] ? <SVGMenuOpened /> : <SVGMenuClosed />} <MenuItemText>기획</MenuItemText>
        </MenuItem>
        <SubMenu isSubMenuOpen={menuStates[4]}>
          <SubMenuItem>
            <SVGSunContainer>
              <SVGSun />
            </SVGSunContainer>
            <SubMenuItemText>구름이랑 어쩌구</SubMenuItemText>
          </SubMenuItem>
          <SubMenuItem>
            <SVGSunContainer>
              <SVGSun />
            </SVGSunContainer>
            <SubMenuItemText>구름이랑 어쩌구</SubMenuItemText>
          </SubMenuItem>
          <SubMenuItem>
            <SVGSunContainer>
              <SVGSun />
            </SVGSunContainer>
            <SubMenuItemText>구름이랑 어쩌구</SubMenuItemText>
          </SubMenuItem>
          <SubMenuItem>
            <SVGSunContainer>
              <SVGSun />
            </SVGSunContainer>
            <SubMenuItemText>구름이랑 어쩌구</SubMenuItemText>
          </SubMenuItem>
        </SubMenu>
        <MenuItem onClick={() => toggleMenu(5)}>
          {menuStates[5] ? <SVGMenuOpened /> : <SVGMenuClosed />} <MenuItemText>프론트엔드</MenuItemText>
        </MenuItem>
        <SubMenu isSubMenuOpen={menuStates[5]}>
          <SubMenuItem>
            <SVGSunContainer>
              <SVGSun />
            </SVGSunContainer>
            <SubMenuItemText>구름이랑 어쩌구</SubMenuItemText>
          </SubMenuItem>
          <SubMenuItem>
            <SVGSunContainer>
              <SVGSun />
            </SVGSunContainer>
            <SubMenuItemText>구름이랑 어쩌구</SubMenuItemText>
          </SubMenuItem>
          <SubMenuItem>
            <SVGSunContainer>
              <SVGSun />
            </SVGSunContainer>
            <SubMenuItemText>구름이랑 어쩌구</SubMenuItemText>
          </SubMenuItem>
          <SubMenuItem>
            <SVGSunContainer>
              <SVGSun />
            </SVGSunContainer>
            <SubMenuItemText>구름이랑 어쩌구</SubMenuItemText>
          </SubMenuItem>
        </SubMenu>
        <MenuItem onClick={() => toggleMenu(6)}>
          {menuStates[6] ? <SVGMenuOpened /> : <SVGMenuClosed />} <MenuItemText>디자인</MenuItemText>
        </MenuItem>
        <SubMenu isSubMenuOpen={menuStates[6]}>
          <SubMenuItem>
            <SVGSunContainer>
              <SVGSun />
            </SVGSunContainer>
            <SubMenuItemText>구름이랑 어쩌구</SubMenuItemText>
          </SubMenuItem>
          <SubMenuItem>
            <SVGSunContainer>
              <SVGSun />
            </SVGSunContainer>
            <SubMenuItemText>구름이랑 어쩌구</SubMenuItemText>
          </SubMenuItem>
          <SubMenuItem>
            <SVGSunContainer>
              <SVGSun />
            </SVGSunContainer>
            <SubMenuItemText>구름이랑 어쩌구</SubMenuItemText>
          </SubMenuItem>
          <SubMenuItem>
            <SVGSunContainer>
              <SVGSun />
            </SVGSunContainer>
            <SubMenuItemText>구름이랑 어쩌구</SubMenuItemText>
          </SubMenuItem>
        </SubMenu>
        <MenuItem onClick={() => toggleMenu(7)}>
          {menuStates[7] ? <SVGMenuOpened /> : <SVGMenuClosed />} <MenuItemText>백엔드</MenuItemText>
        </MenuItem>
        <SubMenu isSubMenuOpen={menuStates[7]}>
          <SubMenuItem>
            <SVGSunContainer>
              <SVGSun />
            </SVGSunContainer>
            <SubMenuItemText>구름이랑 어쩌구</SubMenuItemText>
          </SubMenuItem>
          <SubMenuItem>
            <SVGSunContainer>
              <SVGSun />
            </SVGSunContainer>
            <SubMenuItemText>구름이랑 어쩌구</SubMenuItemText>
          </SubMenuItem>
          <SubMenuItem>
            <SVGSunContainer>
              <SVGSun />
            </SVGSunContainer>
            <SubMenuItemText>구름이랑 어쩌구</SubMenuItemText>
          </SubMenuItem>
          <SubMenuItem>
            <SVGSunContainer>
              <SVGSun />
            </SVGSunContainer>
            <SubMenuItemText>구름이랑 어쩌구</SubMenuItemText>
          </SubMenuItem>
        </SubMenu>
      </Menu>
    </SidebarContainer>
  );
};

const SidebarContainer = styled.div<{ isOpen: boolean }>`
  z-index: 100;
  width: 150px;
  min-height: 100dvh;
  padding: 20px;
  background-color: #fff;
  position: absolute;
  left: 0;
  transition: transform 0.3s ease;
  transform: ${(props) => (props.isOpen ? 'translateX(0)' : 'translateX(-100%)')};
`;

const SVGSideMenuContainer = styled.div`
  text-align: right;
  cursor: pointer;
`;

const SVGBlueCloudContainer = styled.div`
  height: 50px;
  margin-left: -5px;
`;

const SectionTitle = styled.h2`
  margin: 10px 0 0 0;
  padding-bottom: 5px;
  border-bottom: 1px solid #82afff;
  font-size: 1.5rem;
  color: #4d4d4d;
`;

const Menu = styled.div`
  padding-left: 0.5rem;
`;

const MenuItem = styled.div`
  display: flex;
  margin: 5px 0;
  color: #4d4d4d;
  cursor: pointer;
`;

const MenuItemText = styled.div`
  padding-left: 0.25rem;
  font-size: 1rem;
  color: #4d4d4d;
`;

const SubMenu = styled.div<SubMenuProps>`
  padding-left: 0.5rem;
  display: ${(props) => (props.isSubMenuOpen ? 'block' : 'none')};
`;

const SubMenuItem = styled.div`
  display: flex;
  cursor: pointer;
`;

const SVGSunContainer = styled.div`
  height: 20px;
  margin-right: -0.25rem;
`;

const SubMenuItemText = styled.span`
  font-size: 0.75rem;
  color: #4d4d4d;
`;

export default Sidebar;
