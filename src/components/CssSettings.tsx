// Основные стилевые компоненты приложения
import React from 'react'

// Основные цвета приложения
export const AppColors = {
    mainBg: '#ffffff', // Основной - фон
    mainBlue: '#0049b0', // Основной синий
    darkBlue: '#05357b', // Темный синий для текста
    lightGrey: '#f5f5f5', // Светлый серый
    darkGrey: '#42516e', // Темно-серый - текст контента
    mediumGrey: '#e5e5e5', // Серый
    menuHoverButton: '#0065ff', // Цвет фона при наведении на кнопку
};

// ************************************* MAIN & CENTER LAYOUT ******************
// Стиль главного лейаута
export const MainLayoutStyle: React.CSSProperties = {
    minHeight: "100vh",
    padding: 0,
    backgroundColor: AppColors.mainBg
};

// Стиль главного лейаута
export const MainLayoutStyle_: React.CSSProperties = {
    padding: 0,
    backgroundColor: AppColors.mainBg
};

// Стиль лейаута с контентом (изменяемая часть)
export const ContentLayoutStyle: React.CSSProperties = {
    minHeight:'calc(100% - 100px)',
    boxShadow: '1px 1px 1px 0px rgba(122,122,122,0.2)',
    padding: 0,
    backgroundColor: AppColors.mainBg
};

// ************************************* LEFT LAYOUT ***************************
// Стили кнопки открыть / свернуть левое меню
export const ButtonStyle: React.CSSProperties = {
  marginRight: '6px',
  paddingBottom: '28px',
  color: AppColors.mainBlue,
  width: 34,
};

// Стили картинки логотипа (открытое левое меню)
export const ImgLogoOpenStyle: React.CSSProperties = {
  marginLeft: 22,
  marginTop: 5,
};

// Стили картинки логотипа (свернутое левое меню)
export const ImgLogoCloseStyle: React.CSSProperties = {
  marginLeft: 0,
  marginTop: 5,
};

// Стили основного div левой колонки
export const MainLeftDiv: React.CSSProperties = {
  background: AppColors.lightGrey,
  paddingBottom: 5,
};

// Стили основного Slyder левой колонки
export const LeftSlyderStyle: React.CSSProperties = {
  minHeight:'calc(100% - 50px)',
  background: AppColors.lightGrey,
  width: '100%',
};

// Стили Space логотипа левой колонки
export const LeftSpaceStyle: React.CSSProperties = {
  minHeight:'calc(100% - 40px)',
  background: AppColors.mainBlue,
  height: 45,
  width: '100%',
};

// Стили Menu левой колонки
export const LeftMenuStyle: React.CSSProperties = {
  //borderRadius: '0px',
};

// Стили Item Menu левой колонки
export const LeftMenuItemStyle: React.CSSProperties = {
  textAlign: 'left',
  marginLeft: '-10px',
  marginRight: '0px',
  padding: '-16px',
};

// ************************************* TOP LAYOUT ***********************************
// Стили правой части header
export const TopRightSpaceStyle: React.CSSProperties = {
  marginLeft: '0px',
  marginRight: '0px',
  paddingLeft: '8px',
  background: AppColors.mainBlue,
  height: 45,
  width: '185px'
};

// Стили левой части header
export const TopLeftSpaceStyle: React.CSSProperties = {
  marginLeft: '0px',
  margin: '0px',
  paddingLeft: '2px',
  paddingTop: '25px',
  background: AppColors.mainBlue,
  height: 45,
  width: '100%'
};

// Стили левой части header
export const TopBreadcrumbSpaceStyle: React.CSSProperties = {
  marginLeft: '0px',
  margin: '0px',
  paddingLeft: '25px',
  paddingTop: '12px',
  background: AppColors.mainBlue,
  height: 45,
  width: '100%',
  color: AppColors.mainBg,
};

// Стили кнопки "Войти"
export const TopRightButtonStyle: React.CSSProperties = {
  marginLeft: '15px'
};

// ************************************* TOP LAYOUT BUTTONS ***********************************
// Стили левой части header - второй уровень с кнопками
export const HeaderButtonStyle: React.CSSProperties = {
  textAlign: 'left',
  color: AppColors.mainBlue,
  height: 45,
  backgroundColor: AppColors.mainBg,
  marginLeft: '0px',
  marginRight: '0px',
  marginBottom: '0px',
  padding: '6px',
};

// Стили левой части header - второй уровень с кнопками правая часть с панелью поиска по объектам
export const HeaderButtonStyleRight: React.CSSProperties = {
  textAlign: 'left',
  color: AppColors.darkBlue,
  height: 45,
  backgroundColor: AppColors.mainBg,
  borderRadius: '0px 0px 0px 0px',
  padding: '6px',
};
