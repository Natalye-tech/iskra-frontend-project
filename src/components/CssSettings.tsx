// Основные стилевые компоненты приложения
import React from 'react'

// Основные цвета приложения
export const AppColors = {
    mainBg: '#ffffff', // Основной - фон
    mainBlue: '#096dd9', // Основной синий
    lightBlue: '#e6f7ff', // Светлый синий - фон
    buttonBlue: '#a7dfff', // Светлый синий - фон кнопок
    mainTextBlue: '#096dd9', // Основной синий - текст кнопок
    lightTextBlue: '#003eb3', // Светлый синий - текст кнопок
    lightGrey: '#fafafa', // Светлый серый - фон
    darkGrey: '#262626', // Темно-серый - текст контента
    borderColor: '#d4e5f8', // Светло-голубой - границы, где нужны
};

// ************************************* MAIN & CENTER LAYOUT ******************
// Стиль главного лейаута
export const MainLayoutStyle: React.CSSProperties = {
    minHeight: "100vh",
    padding: 4,
    paddingBottom: 8,
    paddingRight: 5,
    backgroundColor: AppColors.mainBg
};

// Стиль лейаута с контентом (изменяемая часть)
export const ContentLayoutStyle: React.CSSProperties = {
    minHeight:'calc(100% - 72px)',
    boxShadow: '1px 1px 1px 0px rgba(122,122,122,0.2)',
    padding: 2,
    backgroundColor: AppColors.mainBg
};

// ************************************* LEFT LAYOUT ***************************
// Стили кнопки открыть / свернуть левое меню
export const ButtonStyle: React.CSSProperties = {
  marginRight: '10px',
  paddingBottom: '28px',
  width: 34,
};

// Стили картинки логотипа (открытое левое меню)
export const ImgLogoOpenStyle: React.CSSProperties = {
  marginLeft: 22,
  marginTop: 5,
};

// Стили картинки логотипа (свернутое левое меню)
export const ImgLogoCloseStyle: React.CSSProperties = {
  marginLeft: -5,
  marginTop: 5,
};

// Стили основного div левой колонки
export const MainLeftDiv: React.CSSProperties = {
  background: AppColors.lightGrey,
  boxShadow: '2px 1px 2px 0px rgba(122,122,122,0.3)',
  paddingBottom: 10,
};

// Стили основного Slyder левой колонки
export const LeftSlyderStyle: React.CSSProperties = {
  minHeight:'calc(100% - 30px)',
  background: AppColors.lightGrey,
  width: '100%',
};

// Стили Space логотипа левой колонки
export const LeftSpaceStyle: React.CSSProperties = {
  minHeight:'calc(100% - 30px)',
  background: AppColors.mainBlue,
  height: 52,
  width: '100%',
  border: '1px',
  borderStyle: 'solid',
  borderColor: AppColors.borderColor,
};

// Стили Menu левой колонки
export const LeftMenuStyle: React.CSSProperties = {
  //borderRadius: '0px',
};

// ************************************* TOP LAYOUT ***********************************
// Стили правой части header
export const TopRightSpaceStyle: React.CSSProperties = {
  marginLeft: '0px',
  marginRight: '0px',
  border: '1px',
  borderStyle: 'solid',
  borderColor: AppColors.borderColor,
  paddingLeft: '15px',
  background: AppColors.lightGrey,
  height: 50,
  width: '208px'
};

// Стили левой части header
export const TopLeftSpaceStyle: React.CSSProperties = {
  marginLeft: '0px',
  margin: '0px',
  border: '1px',
  borderStyle: 'solid',
  borderColor: AppColors.borderColor,
  paddingLeft: '15px',
  paddingTop: '25px',
  background: AppColors.lightBlue,
  height: 50,
  width: '100%'
};

// Стили левой части header
export const TopBreadcrumbSpaceStyle: React.CSSProperties = {
  marginLeft: '0px',
  margin: '0px',
  borderTop: '1px',
  borderBottom: '1px',
  borderRight: '0px',
  borderLeft: '0px',
  borderStyle: 'solid',
  borderColor: AppColors.borderColor,
  paddingLeft: '25px',
  borderRadius: '0px',
  paddingTop: '12px',
  background: AppColors.lightBlue,
  height: 50,
  width: '100%',
  color: '#096dd9',
};

// Стили кнопки "Войти"
export const TopRightButtonStyle: React.CSSProperties = {
  marginLeft: '15px'
};

// ************************************* TOP LAYOUT BUTTONS ***********************************
// Стили левой части header - второй уровень с кнопками
export const HeaderButtonStyle: React.CSSProperties = {
  textAlign: 'left',
  color: '#096dd9',
  height: 45,
  backgroundColor: AppColors.lightBlue,
  borderTop: '1px',
  borderBottom: '1px',
  borderLeft: '1px',
  borderRight: '0px',
  borderStyle: 'solid',
  borderColor: AppColors.borderColor,
  marginLeft: '0px',
  marginRight: '0px',
  marginBottom: '7px',
  padding: '6px',
};

// Стили левой части header - второй уровень с кнопками правая часть с панелью поиска по объектам
export const HeaderButtonStyleRight: React.CSSProperties = {
  textAlign: 'left',
  color: AppColors.mainTextBlue,
  height: 45,
  backgroundColor: AppColors.lightBlue,
  borderRadius: '0px 0px 0px 0px',
  borderTop: '1px',
  borderRight: '1px',
  borderBottom: '1px',
  borderLeft: '0px',
  borderStyle: 'solid',
  borderColor: AppColors.borderColor,
  marginLeft: '0px',
  marginRight: '0px',
  marginBottom: '7px',
  padding: '6px',
};
