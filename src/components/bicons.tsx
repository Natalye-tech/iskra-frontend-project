// Иконки приложения
import React, { useState, useEffect } from 'react';
import { AppColors } from './CssSettings';
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
  HomeOutlined,
  EditOutlined,
  CheckOutlined,
  CloseOutlined,
  ClusterOutlined,
  HddOutlined,
  ContactsOutlined,
  ApartmentOutlined,
  SolutionOutlined,
  CheckCircleTwoTone,
  CloseCircleTwoTone,
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
    { id:'FileAddOutlined', item: <FileAddOutlined /> },
    { id:'SettingOutlined', item: <SettingOutlined /> },
    { id:'EyeOutlined', item: <EyeOutlined /> },
    { id:'FormOutlined', item: <FormOutlined /> },
    { id:'DeleteOutlined', item: <DeleteOutlined /> },
    { id:'ImportOutlined', item: <ImportOutlined /> },
    { id:'ExportOutlined', item: <ExportOutlined /> },
    { id:'ClearOutlined', item: <ClearOutlined /> },
    { id:'CopyOutlined', item: <CopyOutlined /> },
    { id:'CodeOutlined', item: <CodeOutlined /> },
    { id:'VerticalAlignBottomOutlined', item: <VerticalAlignBottomOutlined /> },
    { id:'QuestionCircleOutlined', item: <QuestionCircleOutlined /> },
    { id:'UserOutlined', item: <UserOutlined /> },
    { id:'MailOutlined', item: <MailOutlined /> },
    { id:'HomeOutlined', item: <HomeOutlined /> },
    { id:'EyeOutlined', item: <EyeOutlined /> },
    { id:'EditOutlined', item: <EditOutlined /> },
    { id:'ClusterOutlined', item: <ClusterOutlined /> },
    { id:'HddOutlined', item: <HddOutlined /> },
    { id:'ContactsOutlined', item: <ContactsOutlined /> },
    { id:'ApartmentOutlined', item: <ApartmentOutlined /> },
    { id:'SolutionOutlined', item: <SolutionOutlined /> },
    { id:'EyeOutlined', item: <EyeOutlined /> },
    { id:'1', item: <CheckCircleTwoTone twoToneColor="#52c41a" /> },
    { id:'0', item: <CloseCircleTwoTone twoToneColor="#ff5b35" /> }
  ];

  const Item: BIconItem | undefined = BIcons.find(it => it.id == id);
  let bicon: any | Element = <StarOutlined />;
  if (Item != undefined && Item?.item) bicon = Item?.item;

  return (bicon)

};
