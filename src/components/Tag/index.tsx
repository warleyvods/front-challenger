import React from 'react';
import { keyframes } from '@emotion/react';
import { Box, Circle, HStack, Text } from '@chakra-ui/react';

type TagProps = {
  variant: string;
  label: string;
  animation?: boolean;
}

const fadeOut = keyframes`
    from {
        opacity: 1;
    }
    to {
        opacity: 0;
    }
`;


export const Tag = ({variant, label, animation}: TagProps) => {
  let bgColor, borderColor, textColor;

  switch (variant) {
    case 'green':
      bgColor = 'lime.400';
      borderColor = 'lime.500';
      textColor = 'lime.600';
      break;
    case 'red':
      bgColor = 'littlePink.400';
      borderColor = 'littlePink.500';
      textColor = 'littlePink.600';
      break;
    case 'orange':
      bgColor = 'orange.400';
      borderColor = 'orange.500';
      textColor = 'orange.600';
      break;
    case 'gray':
      bgColor = 'littleGray.400';
      borderColor = 'littleGray.500';
      textColor = 'littleGray.600';
      break;
    default:
      bgColor = 'lime.400';
      borderColor = 'lime.500';
      textColor = 'lime.600';
      break;
  }

  return (
    <Box
      borderRadius="0.375rem"
      border="1px"
      background={bgColor}
      borderColor={borderColor}
      pl="8px"
      pr="8px"
      fontSize="12px"
      fontWeight="medium"
      display="inline-block"
    >
      <HStack>
        <Text color={textColor}>{label}</Text>
        {animation && (
          <Circle size={"6px"} bg={textColor}>
            <Circle size={"15px"} animation={`${fadeOut} 1.5s linear infinite`} bg={borderColor}>
              <Circle size={"6px"} bg={textColor} />
            </Circle>
          </Circle>)
        }
      </HStack>
    </Box>
  );
};

export default Tag;
