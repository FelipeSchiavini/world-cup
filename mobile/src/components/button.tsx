import { Button as NativeBaseButton, Text, IButtonProps } from "native-base"

interface ButtonProps extends IButtonProps {
    title: string;
    type?: 'PRIMARY' | 'SECONDARY';
}

export const Button: React.FC<ButtonProps> = ({title, type, ...props}) => {
    return(
        <NativeBaseButton 
        w="full"
        h={14}
        rounded='sm'
        fontSize='md'
        
        bg={type === 'SECONDARY' ? 'red.500' : 'yellow.500'}
        _pressed={{
            bg: type === 'SECONDARY' ? 'red.600' : 'yellow.600'
        }}
        _loading={{
            _spinner: type === 'SECONDARY' ? {color: 'white'} : {color: 'black'},
            bg: type === 'SECONDARY' ? 'red.400' : 'yellow.400'
        }}
        {...props}>
            <Text fontSize='sm' fontFamily='heading' color={type === 'SECONDARY' ? 'white' : 'black'} textTransform="uppercase">
                {title}
            </Text>
        </NativeBaseButton>
    )
}