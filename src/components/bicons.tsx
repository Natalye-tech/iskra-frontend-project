// Иконки приложения
import React, { useState, useEffect } from 'react';
import {
  AppstoreOutlined, // left menu
  ScheduleOutlined,
  DesktopOutlined,
  DoubleRightOutlined,
  DoubleLeftOutlined,
  StarOutlined,
  UnorderedListOutlined,
  ReadOutlined,
  ProfileOutlined,
  GroupOutlined,
  TableOutlined,
  BuildOutlined,
  FileAddOutlined, // Buttons
  SettingOutlined,
  EyeOutlined,
  FormOutlined,
  DeleteOutlined,
  ImportOutlined,
  ExportOutlined,
  ClearOutlined,
  CopyOutlined,
  CodeOutlined,
  VerticalAlignBottomOutlined,
  VerticalAlignTopOutlined,
  QuestionCircleOutlined, // Top buttons
  UserOutlined,
  MailOutlined,
  HomeOutlined
} from '@ant-design/icons';

interface BIconProps {
  id?: string
};

interface BIconItem {
  id?: string,
  item?: React.ReactNode
};

export const BIcon: React.FC<BIconProps> = ({ id }) => {

  const BIcons: BIconItem[] = [
    { id:'AppstoreOutlined', item: <AppstoreOutlined /> },
    { id:'ScheduleOutlined', item: <ScheduleOutlined /> },
    { id:'DesktopOutlined', item: <DesktopOutlined /> },
    { id:'DoubleRightOutlined', item: <DoubleRightOutlined /> },
    { id:'DoubleLeftOutlined', item: <DoubleRightOutlined /> },
    { id:'StarOutlined', item: <StarOutlined /> },
    { id:'UnorderedListOutlined', item: <UnorderedListOutlined /> },
    { id:'ReadOutlined', item: <ReadOutlined /> },
    { id:'ProfileOutlined', item: <ProfileOutlined /> },
    { id:'GroupOutlined', item: <GroupOutlined /> },
    { id:'TableOutlined', item: <TableOutlined /> },
    { id:'BuildOutlined', item: <BuildOutlined /> },
  ];

  const Item: BIconItem | undefined = BIcons.find(it => it.id == id);
  let bicon: any = <StarOutlined />;
  if (Item != undefined && Item?.item) bicon = Item?.item;

  return (bicon)

};
