import styled from '@emotion/styled';
import tw from 'twin.macro';

const TestButton = styled.button(
  tw`rounded-sm px-8 py-2 bg-deepBlue-500 bg-opacity-20`
);

const Button = () => <TestButton>hi</TestButton>;

export default Button;
