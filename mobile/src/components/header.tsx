import { Text, HStack, Box } from 'native-base';
import { CaretLeft, Export } from 'phosphor-react-native';
import { useNavigation,StackActions } from '@react-navigation/native';
import { ButtonIcon } from './button-icon';

interface Props {
  title: string;
  showBackButton?: boolean;
  showShareButton?: boolean;
  onShare?: () => void;
}

export function Header({ title, showBackButton = false, showShareButton = false, onShare}: Props) {
  const navigation = useNavigation();
  const popAction = StackActions.pop(1);

  const EmptyBoxSpace = () => (<Box w={6} h={6} />);

  return (
    <HStack w="full" h={24} bgColor="gray.800" alignItems="flex-end" pb={5} px={5}>
      <HStack w="full" alignItems="center" justifyContent="space-between">
        {
          showBackButton
            ? <ButtonIcon icon={CaretLeft} onPress={()=>{navigation.dispatch(popAction)}} />
            : <EmptyBoxSpace />
        }

        <Text color="white" fontFamily="heading" fontSize="md" textAlign="center">
          {title}
        </Text>

        {
          showShareButton
            ?
            <ButtonIcon icon={Export} onPress={onShare}/>
            :
            <EmptyBoxSpace />
        }
      </HStack>
    </HStack>
  );
}