import { useEffect, useState } from 'react';
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
  data: { [key: string]: { [key: string]: string[] } };
}

const Sidebar = ({ isOpen, onToggle, data }: SidebarProps) => {
  const [menuStates, setMenuStates] = useState<boolean[]>([]);
  const categories = Object.keys(data);

  useEffect(() => {
    setMenuStates(Array(categories.length).fill(false)); // 메뉴 상태 초기화
  }, [categories.length]);

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
        {categories.map((category, index) => (
          <div key={category}>
            <MenuItem onClick={() => toggleMenu(index)}>
              {menuStates[index] ? <SVGMenuOpened /> : <SVGMenuClosed />}
              <MenuItemText>{category}</MenuItemText>
            </MenuItem>
            <SubMenu isSubMenuOpen={menuStates[index]}>
              {Object.keys(data[category]).map((subCategory) =>
                data[category][subCategory].map((item) => (
                  <SubMenuItem key={item}>
                    <SVGSunContainer>
                      <SVGSun />
                    </SVGSunContainer>
                    <SubMenuItemText>{item}</SubMenuItemText>
                  </SubMenuItem>
                ))
              )}
            </SubMenu>
          </div>
        ))}
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
