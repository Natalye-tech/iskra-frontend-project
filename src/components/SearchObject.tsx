// Форма поиска по объектам
import React, { useState } from 'react';
import { Input } from 'antd';
import { AppColors } from './CssSettings';
import { useAppSelector } from './../hooks/hook';
import { useDispatch } from 'react-redux';
import { changeSearchSubstring } from './../store/objectSlice';

export const SearchObject: React.FC = () => {
  const dispatch = useDispatch();
  const current = useAppSelector(state => state.objects.search_substring);

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      dispatch(changeSearchSubstring(e.target.value));
  };

  return (
     <Input placeholder="Поиск..." onChange={onChange} style={{ width: 200 }} />
  );
};

export default SearchObject;
