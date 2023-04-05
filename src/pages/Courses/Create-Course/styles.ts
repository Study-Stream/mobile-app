import { getStatusBarHeight } from 'react-native-status-bar-height';

import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import styled from 'styled-components/native';

export const GradientBackground = styled(LinearGradient).attrs({
  colors: ['#0000FF', '#4B0082', '#8B008B'],
  start: { x: 0, y: 0 },
  end: { x: 0, y: 1 },
})`
  flex: 1;
`;

export const Container = styled.View.attrs({
  paddingTop: getStatusBarHeight(),
})`
  flex: 1;
  background-color: transparent;
`;

export const Header = styled.View`
  padding: 10px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-bottom-width: 0.5px;
  border-bottom-color: #dadada;
`;

export const Title = styled.Text`
  font-size: 32px;
  font-weight: bold;
  padding: 20px;
  color: #000;
`;

export const Content = styled.View`
  padding: 10px;
  align-items: center;
`;
export const FieldContainer = styled.View`
  margin: 20px;
`;
export const Stats = styled.View`
  flex-direction: row;
  padding: 10px;
  align-items: center;
`;

export const StatsColumn = styled.View`
  align-items: center;
`;

export const StatsNumber = styled.Text`
  font-size: 18px;
  padding: 10px;
  font-weight: bold;
`;

export const Separator = styled.Text`
  color: #000;
  font-size: 20px;
  opacity: 0.1;
  padding: 0 10px;
`;

export const SmallText = styled.Text`
  font-size: 12px;
  color: #8f8f91;
  margin-bottom: 20px;
`;
export const LinkText = styled.Text`
  font-size: 12px;
  color: #579aff;
`;

export const CreateCourseColumn = styled.View`
  align-items: start;
  flex-direction: row;
  padding: 10px;
`;

export const CreateCourseColumnText = styled.Text`
  font-weight: bold;
`;

export const CreateCourseButton = styled.TouchableOpacity.attrs({
  activityOpacity: 1,
})`
  border-width: 1.5px;
  padding: 10px 30px;
  border-color: #e6e6e6;
  border-radius: 15px;
  font-size: 12px;
  background-color: #fff;
  text-align: left;
`;

export const Bookmark = styled(Feather)`
  border-width: 1.5px;
  padding: 5px;
  margin-left: 5px;
  border-color: #e6e6e6;
  border-radius: 2px;
`;
